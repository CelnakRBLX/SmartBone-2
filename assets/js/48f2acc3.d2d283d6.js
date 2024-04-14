"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[551],{75414:e=>{e.exports=JSON.parse('{"functions":[{"name":"new","desc":"","params":[{"name":"ColliderTable","desc":"","lua_type":"{[number]: {Type: string, ScaleX: number, ScaleY: number, ScaleZ: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotationX: number, RotationY: number, RotationZ: number}}"},{"name":"Object","desc":"","lua_type":"BasePart"}],"returns":[{"desc":"","lua_type":"ColliderObject"}],"function_type":"static","source":{"line":57,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"m_LoadCollider","desc":"","params":[{"name":"Collider","desc":"","lua_type":"{Type: string, ScaleX: number, ScaleY: number, ScaleZ: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotationX: number, RotationY: number, RotationZ: number}"}],"returns":[],"function_type":"method","private":true,"source":{"line":80,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"m_LoadColliderTable","desc":"","params":[{"name":"ColliderTable","desc":"","lua_type":"{[number]: {Type: string, ScaleX: number, ScaleY: number, ScaleZ: number, OffsetX: number, OffsetY: number, OffsetZ: number, RotationX: number, RotationY: number, RotationZ: number}}"}],"returns":[],"function_type":"method","private":true,"source":{"line":98,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"GetObject","desc":"","params":[],"returns":[{"desc":"","lua_type":"BasePart"}],"function_type":"method","source":{"line":108,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"GetCollisions","desc":"","params":[{"name":"Point","desc":"","lua_type":"Vector3"},{"name":"Radius","desc":"Radius of bone","lua_type":"number"}],"returns":[{"desc":"","lua_type":"{[number]: {ClosestPoint: Vector3, Normal: Vector3}}"}],"function_type":"method","source":{"line":116,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"Step","desc":"","params":[],"returns":[],"function_type":"method","source":{"line":164,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"DrawDebug","desc":"","params":[{"name":"FILL_COLLIDERS","desc":"","lua_type":"boolean"},{"name":"SHOW_INFLUENCE","desc":"","lua_type":"boolean"},{"name":"SHOW_AWAKE","desc":"","lua_type":"boolean"},{"name":"SHOW_BROADPHASE","desc":"","lua_type":"boolean"}],"returns":[],"function_type":"method","source":{"line":177,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"Destroy","desc":"","params":[],"returns":[],"function_type":"method","source":{"line":185,"path":"src/Components/Collision/ColliderObject.lua"}}],"properties":[{"name":"m_Object","desc":"","lua_type":"BasePart","private":true,"readonly":true,"source":{"line":41,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"Destroyed","desc":"","lua_type":"boolean","readonly":true,"source":{"line":45,"path":"src/Components/Collision/ColliderObject.lua"}},{"name":"Colliders","desc":"","lua_type":"{}","readonly":true,"source":{"line":49,"path":"src/Components/Collision/ColliderObject.lua"}}],"types":[],"name":"ColliderObject","desc":"Internal class for collider\\n:::caution Caution:\\nChanges to the syntax in this class will not count to the major version in semver.\\n:::\\r","source":{"line":36,"path":"src/Components/Collision/ColliderObject.lua"}}')}}]);