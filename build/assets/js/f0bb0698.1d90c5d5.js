"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[922],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>b});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=c(n),f=a,b=s["".concat(p,".").concat(f)]||s[f]||m[f]||o;return n?r.createElement(b,i(i({ref:t},u),{},{components:n})):r.createElement(b,i({ref:t},u))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},42837:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const o={},i="Bone",l={unversionedId:"bone",id:"bone",title:"Bone",description:"Attributes",source:"@site/docs/bone.md",sourceDirName:".",slug:"/bone",permalink:"/SmartBone-2/docs/bone",draft:!1,editUrl:"https://github.com/CelnakRBLX/SmartBone-2/edit/jakey/docs/bone.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",next:{title:"Intro",permalink:"/SmartBone-2/docs/intro"}},p={},c=[{value:"Attributes",id:"attributes",level:3}],u={toc:c},s="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"bone"},"Bone"),(0,a.kt)("h3",{id:"attributes"},"Attributes"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Attributes which can be set per bone, these aren't required.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"Boolean"),"]"," XAxisLocked - If this is true then the bone cannot move on the x axis relative to the root part.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"Boolean"),"]"," YAxisLocked - If this is true then the bone cannot move on the y axis relative to the root part.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"Boolean"),"]"," ZAxisLocked - If this is true then the bone cannot move on the z axis relative to the root part.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"NumberRange"),"]"," XAxisLimits - The limit on which the bone can travel on the x axis relative to the root part, default is -inf, inf.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"NumberRange"),"]"," YAxisLimits - The limit on which the bone can travel on the y axis relative to the root part, default is -inf, inf.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"NumberRange"),"]"," ZAxisLimits - The limit on which the bone can travel on the z axis relative to the root part, default is -inf, inf.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"Number"),"]"," Radius - The radius of the bone, default is 0.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"[",(0,a.kt)("em",{parentName:"p"},"Number"),"]"," Restitution - How bouncy the bone will be when it contacts with a surface, default is 0,"))))}m.isMDXComponent=!0}}]);