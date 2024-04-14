"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[331],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),s=u(r),d=a,f=s["".concat(p,".").concat(d)]||s[d]||m[d]||o;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},24948:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=r(87462),a=(r(67294),r(3905));const o={},i="SmartBone 2",l={type:"mdx",permalink:"/",source:"@site/pages/index.md",title:"SmartBone 2",description:"You can find out more info in the documentation",frontMatter:{}},p=[{value:"Contributing",id:"contributing",level:2},{value:"Issues",id:"issues",level:2}],u={toc:p},c="wrapper";function s(e){let{components:t,...r}=e;return(0,a.kt)(c,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"smartbone-2"},"SmartBone 2"),(0,a.kt)("p",null,"You can find out more info in the ",(0,a.kt)("a",{parentName:"p",href:"https://celnakrblx.github.io/SmartBone-2/docs/intro"},"documentation")),(0,a.kt)("p",null,"The wally package can be found ",(0,a.kt)("a",{parentName:"p",href:"https://wally.run/package/jakeywastaken/smartbone-2"},"here")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Current Features")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Support for animating bones"),(0,a.kt)("li",{parentName:"ul"},"A more realistic and customizable wind solution"),(0,a.kt)("li",{parentName:"ul"},"Support for global wind (MatchWorkspaceWind Attribute)"),(0,a.kt)("li",{parentName:"ul"},"More accurate and faster frustum culling (Large root parts now have correct culling)"),(0,a.kt)("li",{parentName:"ul"},"Detailed documentation and API"),(0,a.kt)("li",{parentName:"ul"},"Runtime debug ui (Debug Attribute)"),(0,a.kt)("li",{parentName:"ul"},"Cleaner code base"),(0,a.kt)("li",{parentName:"ul"},"Collision support"),(0,a.kt)("li",{parentName:"ul"},"Rotational constraint to limit the rotation between a bone and its parent"),(0,a.kt)("li",{parentName:"ul"},"More constraints (Distance, Rope and Spring)")),(0,a.kt)("p",null,"There is a ",(0,a.kt)("a",{parentName:"p",href:"https://www.roblox.com/games/14405998010/Smartbone-2"},"demo place")," which has colliders and over 170 SmartBone objects setup."),(0,a.kt)("p",null,"You can find the plugins here:\n",(0,a.kt)("a",{parentName:"p",href:"https://create.roblox.com/marketplace/asset/15539103407/Collider-Creator%3Fkeyword=&pageNumber=&pagePosition="},"Collider Creator")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://create.roblox.com/marketplace/asset/15539148341/SmartBone-Editor%3Fkeyword=&pageNumber=&pagePosition="},"SmartBone Editor")),(0,a.kt)("h2",{id:"contributing"},"Contributing"),(0,a.kt)("p",null,"Preferably you follow this ",(0,a.kt)("a",{parentName:"p",href:"https://www.conventionalcommits.org/en/v1.0.0/"},"Commit Convention"),"\nAnd detail your thought process and reasoning in pr's.\nYou can also find out what is being worked on in the ",(0,a.kt)("a",{parentName:"p",href:"https://trello.com/b/BN2jeG8L/smartbone-v2"},"trello")),(0,a.kt)("h2",{id:"issues"},"Issues"),(0,a.kt)("p",null,"When creating an issue if you can provide a reproduction file or reproduction steps it would be greatly appreciated.\nFeature requests via issues are also helpful, a good example of a well structured feature request is ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/CelnakRBLX/SmartBone-2/issues/16"},"this")))}s.isMDXComponent=!0}}]);