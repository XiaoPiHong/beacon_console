import{j as C,c as he,a as ge,b as _e,d as fe,_ as ye,m as j,e as v,i as U,f as be,r as m,C as ve,u as x,s as w,g as L,h as V,M as Pe,k as D,T as q,O as z,U as K,L as G,l as H,B as J,n as Ie,o as W,F as Z,S as Oe,N as M,p as Te,q as Se,t as xe,P as we,v as Re}from"./vendor-3a73ee21.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Ee=C.Fragment,r=C.jsx,y=C.jsxs;var _=(e=>(e.LOGIN="LOGIN",e.SET_USERINFO="SET_USERINFO",e.SET_PERMISSION="SET_PERMISSION",e))(_||{});const Ne={userInfo:null,permission:[]},Ce=(e=Ne,t)=>{const{type:n,payload:s}=t;switch(n){case _.LOGIN:return{...e,...s};case _.SET_USERINFO:return{...e,userInfo:s};case _.SET_PERMISSION:return{...e,permission:s};default:return e}},Le=he({user:Ce}),Me=ge(Le,_e(fe(ye)));function ke(e,t){return j(v(e),t,(n,s)=>{if(U(n)&&U(s))return j(v(n),s,(o,i)=>be(o)?o.concat(i):void 0)})}const Q=e=>e.replace(/^\//,"").replace(/\/:[^/]+/g,""),E=getComputedStyle(document.documentElement),je=e=>e.replace(/([A-Z])/g,"-$1").toLowerCase(),Ue={borderRadius:0},X={token:{...Ue,colorPrimary:E.getPropertyValue("--color-primary"),menuColor:E.getPropertyValue("--menu-color"),menuHoverBg:E.getPropertyValue("--menu-hover-bg")}},Ae=m.createContext({theme:v(X),updateTheme:()=>{}}),$e=({children:e})=>{const[t,n]=m.useState(v(X)),s=i=>{Object.keys(i).forEach(c=>{Object.prototype.toString.call(i[c])==="[object Object]"?s(i[c]):document.documentElement.style.setProperty(`--${je(c)}`,i[c])})},o=(i={})=>{n(c=>({...ke(c,i)})),s(i)};return r(Ae.Provider,{value:{theme:t,updateTheme:o},children:r(ve,{theme:t,children:e})})},Fe="modulepreload",Be=function(e){return"/"+e},A={},h=function(t,n,s){if(!n||n.length===0)return t();const o=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=Be(i),i in A)return;A[i]=!0;const c=i.endsWith(".css"),a=c?'[rel="stylesheet"]':"";if(!!s)for(let u=o.length-1;u>=0;u--){const p=o[u];if(p.href===i&&(!c||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${a}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":Fe,c||(d.as="script",d.crossOrigin=""),d.href=i,document.head.appendChild(d),c)return new Promise((u,p)=>{d.addEventListener("load",u),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())},O={"app-container":"_app-container_113qc_1","app-container__header":"_app-container__header_113qc_10","app-container__tabs":"_app-container__tabs_113qc_14","app-container__main":"_app-container__main_113qc_18"},T={"header-container":"_header-container_roc25_1","header-container-logo":"_header-container-logo_roc25_7","header-container-menu":"_header-container-menu_roc25_11","header-container-setting":"_header-container-setting_roc25_15"},Ve=(e,t,n)=>{const{idKey:s,parentIdKey:o,formatNode:i=a=>a}=n,c=(a,l)=>{const d=[];for(let u=0,p=l.length;u<p;u++){const g=l[u],R=g[o],k=g[s];if(R===a){const pe={id:k,data:g,children:c(k,l)};d.push(i(pe))}}return d};return c(e,t)},De=({data:e,children:t})=>({...e,children:t}),Y=(e,t=null,n)=>e.map(s=>{const o={...s,url:t?`${t.url+s.permissionCode}`:s.permissionCode};return o.children=Y(s.children,o,n),n?n(o):o});function ee({formatNode:e,includeButton:t=!1,filterUnShowRoute:n=!0}){const{permission:s}=x(a=>({permission:a.user.permission}),w),o=a=>{let l=!0;return t||(l=l&&a.type==="ROUTE"),n&&(l=l&&a.show===!0),l},i=v(s.filter(a=>o(a)));return{menu:Y(Ve(null,i,{idKey:"permissionId",parentIdKey:"parentPermissionId",formatNode:a=>De(a)}),null,e)}}const te=m.createContext({pageMetas:[]}),qe=({children:e,pageMetas:t})=>r(te.Provider,{value:{pageMetas:t},children:e}),ne=()=>m.useContext(te),ze=()=>{const e=L(),t=V(),{pageMetas:n}=ne(),{menu:s}=ee({formatNode:({permissionId:c,url:a,permissionName:l,children:d})=>({key:a,label:l,url:a,children:d.length?d:void 0})}),o=()=>n.find(a=>D(a.url,t.pathname)),i=c=>{const{props:{url:a}}=c.item;e(a)};return r(Pe,{id:"menu",selectedKeys:[o().url],onSelect:i,mode:"horizontal",items:s})},Ke=()=>y("div",{className:T["header-container"],children:[r("div",{className:T["header-container-logo"]}),r("div",{className:T["header-container-menu"],children:r(ze,{})}),r("div",{className:T["header-container-setting"]})]}),Ge=()=>{const e=L(),t=Symbol("tab"),n=V(),{pageMetas:s}=ne(),{permission:o}=x(u=>({permission:u.user.permission}),w);let i=`${t.description}/home`;const c=m.useRef(new Map([[`${t.description}/home`,{url:"/home",meta:{title:"首页",closable:!1},children:[]}]])),a=()=>{if(o.length){const u=s.find(g=>D(g.url,n.pathname)),p=`${t.description}${n.pathname}`;c.current.set(p,u),i=p}},l=u=>{e(u.split(`${t.description}`)[1])},d=(u,p)=>{if(p==="remove"){c.current.delete(u);const g=Array.from(c.current),R=g[g.length-1][0];e(R.split(`${t.description}`)[1])}};return a(),m.useEffect(()=>()=>{c.current.clear()},[]),r(q,{activeKey:i,type:"editable-card",hideAdd:!0,items:Array.from(c.current).map(u=>({key:u[0],label:u[1].meta.title,closable:u[1].meta.closable,children:null})),onChange:l,onEdit:d})},He=({children:e})=>e,S=()=>y("div",{className:O["app-container"],children:[r("div",{className:O["app-container__header"],children:r(Ke,{})}),r("div",{className:O["app-container__tabs"],children:r(Ge,{})}),r("div",{className:O["app-container__main"],children:r(He,{children:r(z,{})})})]}),re=()=>r("section",{children:"主页"}),Je=Object.freeze(Object.defineProperty({__proto__:null,default:re},Symbol.toStringTag,{value:"Module"})),We="_page_1x1ij_1",Ze="_login_1x1ij_6",Qe="_login__header_1x1ij_10",Xe="_login__body_1x1ij_22",f={page:We,login:Ze,login__header:Qe,"login__header-title":"_login__header-title_1x1ij_13","login__header-description":"_login__header-description_1x1ij_17",login__body:Xe},se=({methods:e,loading:t,onClickLoginBtn:n})=>({items:[{name:"username",label:"",component:"Input",required:!0,componentProps:{prefix:r(K,{}),placeholder:"用户名"}},{name:"password",label:"",component:"InputPassword",required:!0,componentProps:{prefix:r(G,{}),placeholder:"密码"}},{name:"remember",label:"",initialValue:!1,valuePropName:"checked",render:({model:s})=>y("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r(H,{checked:s.remember,onChange:o=>{e.setFieldsValue({remember:o.target.checked})},children:"记住账号"}),r(J,{type:"link",children:"忘记密码"})]})},{name:"submit",label:"",component:"Button",componentProps:{type:"primary",children:"登录",style:{width:"100%"},loading:t,onClick:n}}]}),oe=({methods:e,loading:t,onClickRegisterBtn:n})=>({items:[{name:"username",label:"",component:"Input",required:!0,componentProps:{prefix:r(K,{}),placeholder:"用户名"}},{name:"password",label:"",component:"InputPassword",required:!0,componentProps:{prefix:r(G,{}),placeholder:"密码"}},{name:"remember",label:"",initialValue:!1,valuePropName:"checked",render:({model:s})=>y("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r(H,{checked:s.remember,onChange:o=>{e.setFieldsValue({remember:o.target.checked})},children:"记住账号"}),r(J,{type:"link",children:"忘记密码"})]})},{name:"submit",label:"",component:"Button",componentProps:{type:"primary",children:"注册",style:{width:"100%"},loading:t,onClick:n}}]}),Ye=Object.freeze(Object.defineProperty({__proto__:null,getLoginFormProps:se,getRegisterFormProps:oe},Symbol.toStringTag,{value:"Module"})),$=new Map([["JSON",{get:e=>JSON.parse(e),set:e=>JSON.stringify(e)}]]);function et(e){return function(t,n){return{get(){let s=e.getItem(t);if(typeof n<"u"){const o=$.get(n);o&&(s=o.get(s))}return s},set(s){if(typeof n<"u"){const o=$.get(n);o&&(s=o.set(s))}return e.setItem(t,s)},remove:()=>e.removeItem(t)}}}const F=et(localStorage),P={token:F("token"),user:F("user","JSON")},ie=[{permissionId:"1",permissionName:"首页",permissionCode:"/home",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!1},{permissionId:"1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"1",closable:!0},{permissionId:"2",permissionName:"系统",permissionCode:"/system",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!0},{permissionId:"2-1",permissionName:"角色管理",permissionCode:"/role/:id/:name",description:"string",type:"ROUTE",show:!1,parentPermissionId:"2",closable:!0},{permissionId:"2-2",permissionName:"组织架构",permissionCode:"/organizationalStructure",description:"string",type:"ROUTE",show:!0,parentPermissionId:"2",closable:!0},{permissionId:"2-2-1",permissionName:"部门管理",permissionCode:"/department",description:"string",type:"ROUTE",show:!0,parentPermissionId:"2-2",closable:!0},{permissionId:"2-2-1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-2-1",closable:!0},{permissionId:"2-1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-1",closable:!0},{permissionId:"2-1-2",permissionName:"编辑",permissionCode:"edit",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-1",closable:!0},{permissionId:"3",permissionName:"用户",permissionCode:"/user",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!0},{permissionId:"3-1",permissionName:"用户管理",permissionCode:"/userManage",description:"string",type:"ROUTE",show:!0,parentPermissionId:"3",closable:!0}],tt=()=>new Promise(e=>{setTimeout(()=>{e(!0)},300)}),B=()=>new Promise(e=>{setTimeout(()=>{e({data:{user:{name:"xxx",password:"xxx"},token:"token"}})},300)}),nt=()=>new Promise(e=>{setTimeout(()=>{e({data:{user:{name:"xxx",password:"xxx"}}})},300)}),rt=()=>new Promise(e=>{B().then(async()=>{const{data:t}=await B();console.log(t),P.token.set(t.token),P.user.set(t.user),e({type:_.LOGIN,payload:{userInfo:t.user,permission:ie}})})}),st=async()=>{const{data:e}=await nt();return console.log(e),P.user.set(e.user),{type:_.SET_USERINFO,payload:e.user}},ot=async()=>{const e=await tt();return console.log(e),{type:_.SET_PERMISSION,payload:ie}},it=e=>{const t=L(),[n,s]=m.useState(!1),o=()=>{c.validator().then(d=>{console.log(d),s(!0),e.login().then(()=>{t("/home")}).finally(()=>{s(!1)})})};console.log("=======================================parent render");const[i,c]=W(),a=se({methods:c,loading:n,onClickLoginBtn:o}),l=m.useRef();return r(Z,{register:i,ref:l,...a})},ae=Ie(e=>({user:e.user}),{login:rt})(it),at=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));function ce(){const[e,t]=m.useState(!1),[n,s]=W(),i=oe({methods:s,loading:e,onClickRegisterBtn:()=>{t(!0),t(!1)}});return r(Z,{register:n,...i})}const ct=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"}));function le(){let e="1";return{tabsActiveKey:e,tabsList:[{key:"1",label:"登录",children:r(ae,{})},{key:"2",label:"注册",children:r(ce,{})}],onChangeTabs:s=>{e=s}}}const lt=Object.freeze(Object.defineProperty({__proto__:null,default:le},Symbol.toStringTag,{value:"Module"})),ue=()=>{const{tabsActiveKey:e,tabsList:t,onChangeTabs:n}=le();return r("div",{className:f.page,children:y("div",{className:f.login,children:[y("div",{className:f.login__header,children:[r("div",{className:f["login__header-title"],children:"项目管理系统"}),r("div",{className:f["login__header-description"],children:"项目成功，系统成就"})]}),r("div",{className:f.login__body,children:r(q,{defaultActiveKey:e,items:t,onChange:n})})]})})},ut=Object.freeze(Object.defineProperty({__proto__:null,default:ue},Symbol.toStringTag,{value:"Module"})),dt={"loading-container":"_loading-container_u84nk_1"},de=()=>r("div",{className:dt["loading-container"],children:r(Oe,{tip:"玩命加载中",children:r(Ee,{})})}),mt=Object.assign({"../views/error/index.tsx":()=>h(()=>import("./index-d51b7fbd.js"),["assets/index-d51b7fbd.js","assets/vendor-3a73ee21.js","assets/vendor-c2f31cdc.css"]),"../views/home/index.tsx":()=>h(()=>Promise.resolve().then(()=>Je),void 0),"../views/login/components/signin-form.tsx":()=>h(()=>Promise.resolve().then(()=>at),void 0),"../views/login/components/signup-form.tsx":()=>h(()=>Promise.resolve().then(()=>ct),void 0),"../views/login/hooks/use-tags.tsx":()=>h(()=>Promise.resolve().then(()=>lt),void 0),"../views/login/index.tsx":()=>h(()=>Promise.resolve().then(()=>ut),void 0),"../views/login/indexConfig.tsx":()=>h(()=>Promise.resolve().then(()=>Ye),void 0),"../views/system/organizationalStructure/department/index.tsx":()=>h(()=>import("./index-b8679b7b.js"),["assets/index-b8679b7b.js","assets/vendor-3a73ee21.js","assets/vendor-c2f31cdc.css"]),"../views/system/role/index.tsx":()=>h(()=>import("./index-4a1ceb06.js"),["assets/index-4a1ceb06.js","assets/vendor-3a73ee21.js","assets/vendor-c2f31cdc.css"]),"../views/user/userManage/index.tsx":()=>h(()=>import("./index-23b08b08.js"),["assets/index-23b08b08.js","assets/vendor-3a73ee21.js","assets/vendor-c2f31cdc.css"])}),b=(e,t)=>{const n=m.lazy(mt[`../views/${e}/index.tsx`]);return r(m.Suspense,{fallback:r(de,{}),children:r(n,{...t})})},I=({children:e})=>{const t=P.token.get(),{userInfo:n}=x(i=>({userInfo:i.user.userInfo}),w),s=Te(),o=m.lazy(async()=>(t&&!n&&await Promise.all([st(),ot()]).then(([i,c])=>{s(i),s(c)}).catch(()=>({default:()=>b("error",{type:500})})),{default:t?()=>e:()=>r(M,{to:"/login"})}));return r(m.Suspense,{fallback:r(de,{}),children:r(o,{})})},pt=()=>[{path:"/login",element:P.token.get()?r(M,{replace:!0,to:"/home"}):r(ue,{})},{path:"/user",element:r(S,{}),children:[{path:"userManage",element:r(I,{children:b("user/userManage")}),meta:{title:"用户管理",closable:!0}}]}],ht=e=>[{path:"/",element:r(M,{to:"/home"})},...e,{path:"/home",element:r(S,{}),children:[{path:"",element:r(I,{children:r(re,{})}),meta:{title:"首页",closable:!1}}]},{path:"*",element:r(S,{}),children:[{path:"*",element:r(I,{children:b("error",{type:404})}),meta:{title:"错误页",closable:!0}}]}],me=({children:e,url:t,id:n})=>{const{permission:s}=x(a=>({permission:a.user.permission}),w),o=s.find(a=>a.permissionId===n);return s.filter(a=>a.parentPermissionId===(o==null?void 0:o.permissionId)&&a.type==="BUTTON").findIndex(a=>a.permissionCode==="view")!==-1?e:b("error",{type:403})},gt=(e,t)=>{switch(!!e){case!0:return t.permissionCode.replace(/^\//,"");case!1:return t.permissionCode}},_t=(e,t)=>{const n=!!e,{url:s}=t;switch(n){case!0:return t.children.length?r(z,{}):r(I,{children:r(me,{url:s,id:t.permissionId,children:b(Q(s))})});case!1:return r(S,{})}},ft=(e,t)=>{const n=!!e,{url:s}=t;switch(n){case!0:return N(t.children,t);case!1:return t.children.length?N(t.children,t):[{path:"",element:r(I,{children:r(me,{url:s,id:t.permissionId,children:b(Q(s))})}),meta:{title:t.permissionName,closable:t.closable}}]}},N=(e,t=null)=>e.map(n=>(n.url=((t==null?void 0:t.url)||"")+n.permissionCode,{path:gt(t,n),element:_t(t,n),children:ft(t,n),meta:{title:n.permissionName,closable:n.closable}}));function yt(){const{menu:e}=ee({filterUnShowRoute:!1}),t=N(e),n=[...pt(),...ht(t)],s=(c,a=null)=>c.map(l=>{if(l.path.includes("*"))return{url:l.children[0].path,children:[],meta:l.children[0].meta||{}};const d=a?`${a.path+(l.path?"/"+l.path:"")}`:l.path,u=s(l.children||[],{...l,path:d});return{url:d,children:u,meta:l.meta||{}}}),o=c=>{const a=[];return c.forEach(l=>{l.children&&l.children.length?a.push(...o(l.children)):a.push({meta:l.meta,url:l.url,children:[]})}),a},i=o(s(n));return{routes:n,pageMetas:i}}const bt=()=>{const{routes:e,pageMetas:t}=yt(),n=Se(e);return r(qe,{pageMetas:t,children:n})};xe.createRoot(document.getElementById("root")).render(r($e,{children:r(we,{store:Me,children:r(Re,{children:r(bt,{})})})}));export{y as a,r as j};