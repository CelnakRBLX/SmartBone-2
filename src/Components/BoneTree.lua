--!nocheck
--!native

local WIND_SEED = 1029410295159813
local WIND_RNG = Random.new(WIND_SEED)
local Lighting = game:GetService("Lighting")
local Dependencies = script.Parent.Parent:WaitForChild("Dependencies")
local BoneClass = require(script.Parent:WaitForChild("Bone"))
local DefaultObjectSettings = require(Dependencies:WaitForChild("DefaultObjectSettings"))
local Gizmo = require(Dependencies:WaitForChild("Gizmo"))
local Utilities = require(Dependencies:WaitForChild("Utilities"))
local MaxVector = Vector3.new(math.huge, math.huge, math.huge)
local IsStudio = game:GetService("RunService"):IsStudio()

if IsStudio then
	Gizmo.Init()
end

local SB_VERBOSE_LOG = Utilities.SB_VERBOSE_LOG

export type IBoneTree = {
	WindOffset: number,
	Root: Bone,
	RootPart: BasePart,
	Bones: { [number]: BoneClass.IBone },
	Settings: { [string]: any },
	UpdateRate: number,
	InView: boolean,
	AccumulatedDelta: number,

	Destroyed: boolean,

	LocalGravity: Vector3,
	Force: Vector3,
	RestGravity: Vector3,
	ObjectMove: Vector3,
	ObjectPreviousPosition: Vector3,
}

local function SafeUnit(v3)
	if v3.Magnitude == 0 then
		return Vector3.zero
	end

	return v3.Unit
end

local function map(n, start, stop, newStart, newStop, withinBounds)
	local value = ((n - start) / (stop - start)) * (newStop - newStart) + newStart

	--// Returns basic value
	if not withinBounds then
		return value
	end

	--// Returns values constrained to exact range
	if newStart < newStop then
		return (value < newStop and value or newStop) > newStart and (value < newStop and value or newStop) or newStart
	else
		return (value < newStart and value or newStart) > newStop and (value < newStart and value or newStart) or newStop
	end
end

--- @class BoneTree
--- Internal class for all bone trees
--- :::caution Caution:
--- Changes to the syntax in this class will not count to the major version in semver.
--- :::

--- @within BoneTree
--- @readonly
--- @prop WindOffset number
--- Used in wind calculations so each bone tree has a different solution.

--- @within BoneTree
--- @readonly
--- @prop Root Bone
--- Root bone of the bone tree

--- @within BoneTree
--- @readonly
--- @prop RootPart BasePart

--- @within BoneTree
--- @readonly
--- @prop RootPartSize Vector3
--- Constant value of the root parts size at the start of the simulation

--- @within BoneTree
--- @prop Bones table

--- @within BoneTree
--- @prop Settings {}

--- @within BoneTree
--- @readonly
--- @prop UpdateRate number
--- Throttled update rate

--- @within BoneTree
--- @readonly
--- @prop InView boolean

--- @within BoneTree
--- @readonly
--- @prop AccumulatedDelta number
--- Used in the runtime

--- @within BoneTree
--- @readonly
--- @prop Destroyed boolean
--- True if the root part has been destroyed

--- @within BoneTree
--- @readonly
--- @prop FirstSkipUpdate boolean
--- False if the bone tree hasn't skipped an update this frame. True if it has

--- @within BoneTree
--- @readonly
--- @prop LocalGravity CFrame

--- @within BoneTree
--- @readonly
--- @prop Force Vector3

--- @within BoneTree
--- @readonly
--- @prop RestGravity Vector3

--- @within BoneTree
--- @prop ObjectMove Vector3
--- Difference between root parts last position and current position

--- @within BoneTree
--- @prop ObjectPreviousPosition Vector3
--- Root parts previous position

local Class = {}
Class.__index = Class

--- @within BoneTree
--- @param RootBone Bone
--- @param RootPart BasePart
--- @param Gravity Vector3
--- @return BoneTree
function Class.new(RootBone: Bone, RootPart: BasePart, Gravity: Vector3): IBoneTree
	local self = setmetatable({
		WindOffset = WIND_RNG:NextNumber(0, 1000000),
		Root = RootBone:IsA("Bone") and RootBone or nil,
		RootPart = RootPart,
		RootPartSize = RootPart.Size,
		Bones = {},
		Settings = {},
		UpdateRate = 0,
		InView = true,
		AccumulatedDelta = 0,
		BoundingBoxCFrame = RootPart.CFrame,
		BoundingBoxSize = RootPart.Size,

		Destroyed = false,
		FirstSkipUpdate = false,

		LocalGravity = RootBone.CFrame:PointToWorldSpace(Gravity).Unit * Gravity.Magnitude,
		Force = Vector3.zero,
		RestGravity = Vector3.zero,
		ObjectMove = Vector3.zero,
		ObjectPreviousPosition = RootPart.Position,
	}, Class)

	self.DestroyConnection = RootPart.AncestryChanged:Connect(function()
		if not RootPart:IsDescendantOf(game) then
			self.Destroyed = true
		end
	end)

	self.AttributeConnection = RootPart.AttributeChanged:Connect(function(Attribute)
		-- No need validating
		self.Settings[Attribute] = RootPart:GetAttribute(Attribute)
	end)

	return self
end

--- @within BoneTree
--- Called in BoneTree:PreUpdate(),
--- Computes the bounding box of all the bones
function Class:UpdateBoundingBox()
	debug.profilebegin("BoneTree::UpdateBoundingBox")

	if not self.InView then
		self.BoundingBoxCFrame = self.RootPart.CFrame
		self.BoundingBoxSize = self.RootPart.Size

		debug.profileend()
		return
	end

	local BottomCorner = MaxVector
	local TopCorner = -MaxVector

	debug.profilebegin("Max Min Bones")
	for _, Bone in self.Bones do
		debug.profilebegin("Max Min Bone")
		local Position = Bone.Position

		BottomCorner = BottomCorner:Min(Position)
		TopCorner = TopCorner:Max(Position)
		debug.profileend()
	end
	debug.profileend()

	local CenterOfMass = (BottomCorner + TopCorner) / 2

	self.BoundingBoxCFrame = CFrame.new(CenterOfMass)
	self.BoundingBoxSize = self.RootPartSize:Max(TopCorner - BottomCorner)

	debug.profileend()
end

--- @within BoneTree
--- @param RootPosition Vector3 -- Position of the root part (Micro Optimization)
--- Called in BoneTree:PreUpdate()
function Class:UpdateThrottling(RootPosition)
	debug.profilebegin("BoneTree::UpdateThrottling")
	local Settings = self.Settings

	local Camera = workspace.CurrentCamera
	local Distance = (RootPosition - Camera.CFrame.Position).Magnitude

	if Distance > Settings.ActivationDistance then
		self.UpdateRate = 0
		debug.profileend()
		return
	end

	local UpdateRate = 1 - map(Distance, Settings.ThrottleDistance, Settings.ActivationDistance, 0, 1, true)
	self.UpdateRate = Settings.UpdateRate * UpdateRate
	debug.profileend()
end

--- @within BoneTree
--- Calculates object move, gravity and throttled update rate. Also calls Bone:PreUpdate()
function Class:PreUpdate()
	debug.profilebegin("BoneTree::PreUpdate")
	local RootPartCFrame = self.RootPart.CFrame
	local RootPartPosition = RootPartCFrame.Position

	self.ObjectMove = (RootPartPosition - self.ObjectPreviousPosition)
	self.ObjectPreviousPosition = RootPartPosition

	self.RestGravity = RootPartCFrame * self.LocalGravity
	self:UpdateThrottling(RootPartPosition)
	self:UpdateBoundingBox()

	for _, Bone in self.Bones do
		Bone:PreUpdate(self)
	end
	debug.profileend()
end

--- @within BoneTree
--- @param Delta number -- Δt
--- Calculates forces and updates wind. Also calls Bone:StepPhysics()
function Class:StepPhysics(Delta)
	debug.profilebegin("BoneTree::StepPhysics")
	local Settings = self.Settings
	local Force = Settings.Gravity
	local ForceDirection = Settings.Gravity.Unit

	local DGrav = self.RestGravity:Dot(ForceDirection)
	local ProjectedForce = ForceDirection * (DGrav < 0 and 0 or DGrav)

	Force -= ProjectedForce
	Force = (Force + Settings.Force) * Delta -- Dont really want delta here but everything breaks if i remove it and i cant be bothered to fix it

	if Settings.MatchWorkspaceWind == true then
		local GW = workspace.GlobalWind
		Settings.WindDirection = SafeUnit(GW)
		Settings.WindSpeed = GW.Magnitude
	else
		local WindDirection = Lighting:GetAttribute("WindDirection") or DefaultObjectSettings.WindDirection
		local WindSpeed = Lighting:GetAttribute("WindSpeed") or DefaultObjectSettings.WindSpeed

		Settings.WindDirection = SafeUnit(WindDirection)
		Settings.WindSpeed = WindSpeed
	end

	local WindStrength = Lighting:GetAttribute("WindStrength") or DefaultObjectSettings.WindStrength

	Settings.WindStrength = WindStrength

	for _, Bone in self.Bones do
		Bone:StepPhysics(self, Force)
	end
	debug.profileend()
end

--- @within BoneTree
--- @param ColliderObjects table
--- @param Delta number -- Δt
function Class:Constrain(ColliderObjects, Delta)
	debug.profilebegin("BoneTree::Constrain")
	for _, Bone in self.Bones do
		Bone:Constrain(self, ColliderObjects, Delta)
	end
	debug.profileend()
end

--- @within BoneTree
--- Resets all bones to their rest positions.
function Class:SkipUpdate()
	debug.profilebegin("BoneTree::SkipUpdate")
	for _, Bone in self.Bones do
		Bone:SkipUpdate()
	end

	self.FirstSkipUpdate = true
	debug.profileend()
end

--- @within BoneTree
--- @param Delta number -- Δt
function Class:SolveTransform(Delta)
	debug.profilebegin("BoneTree::SolveTransform")
	for _, Bone in self.Bones do
		Bone:SolveTransform(self, Delta)
	end

	self.FirstSkipUpdate = false
	debug.profileend()
end

--- @within BoneTree
--- Applys all the transforms to bones in serial context.
function Class:ApplyTransform()
	debug.profilebegin("BoneTree::ApplyTransform")
	for _, Bone in self.Bones do
		Bone:ApplyTransform(self)
	end
	debug.profileend()
end

--- @within BoneTree
--- @param DRAW_CONTACTS boolean
--- @param DRAW_PHYSICAL_BONE boolean
--- @param DRAW_BONE boolean
--- @param DRAW_AXIS_LIMITS boolean
--- @param DRAW_ROOT_PART boolean
--- @param DRAW_BOUNDING_BOX boolean
function Class:DrawDebug(DRAW_CONTACTS, DRAW_PHYSICAL_BONE, DRAW_BONE, DRAW_AXIS_LIMITS, DRAW_ROOT_PART, DRAW_BOUNDING_BOX)
	debug.profilebegin("BoneTree::DrawDebug")
	local LINE_CONNECTING_COLOR = Color3.fromRGB(248, 168, 20)
	local ROOT_PART_BOUNDING_BOX_COLOR = Color3.fromRGB(76, 208, 223)
	local ROOT_PART_FILL_COLOR = Color3.fromRGB(255, 89, 89)

	Gizmo.PushProperty("AlwaysOnTop", false)

	if DRAW_BOUNDING_BOX then
		Gizmo.PushProperty("Color3", ROOT_PART_BOUNDING_BOX_COLOR)
		Gizmo.Box:Draw(self.BoundingBoxCFrame, self.BoundingBoxSize, true)
	end

	if DRAW_ROOT_PART then
		Gizmo.PushProperty("Color3", ROOT_PART_BOUNDING_BOX_COLOR)
		Gizmo.Box:Draw(self.RootPart.CFrame, self.RootPart.Size, true)

		Gizmo.SetStyle(ROOT_PART_FILL_COLOR, 0.75, false)
		Gizmo.VolumeBox:Draw(self.RootPart.CFrame, self.RootPart.Size)

		Gizmo.PushProperty("Transparency", 0)
	end

	for i, Bone in self.Bones do
		local BonePosition = Bone.Bone.TransformedWorldCFrame.Position
		local ParentBone = self.Bones[Bone.ParentIndex]

		Bone:DrawDebug(DRAW_CONTACTS, DRAW_PHYSICAL_BONE, DRAW_BONE, DRAW_AXIS_LIMITS)

		if DRAW_PHYSICAL_BONE and i ~= 1 then
			Gizmo.PushProperty("Color3", LINE_CONNECTING_COLOR)
			Gizmo.Ray:Draw(ParentBone.Bone.TransformedWorldCFrame.Position, BonePosition)
		end
	end
	debug.profileend()
end

function Class:Destroy()
	SB_VERBOSE_LOG("Destroy BoneTree")

	task.synchronize()
	self.DestroyConnection:Disconnect()
	self.AttributeConnection:Disconnect()

	for _, Bone in self.Bones do
		Bone:Destroy()
	end

	setmetatable(self, nil)
	task.desynchronize()
end

return Class
