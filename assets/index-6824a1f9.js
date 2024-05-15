import{j as C,c as pe,a as he,b as _e,d as ge,_ as fe,m as j,e as v,i as U,f as ye,r as m,C as be,u as S,s as T,g as ve,h as L,k as M,M as Pe,l as D,T as q,n as Ie,N as Ee,I as Oe,U as z,L as K,o as G,B as H,p as Re,q as J,F as W,S as Se,t as k,v as Te,O as xe,w as we,P as Ne,x as Ce}from"./vendor-0cd3085b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Le=C.Fragment,r=C.jsx,f=C.jsxs;var g=(e=>(e.LOGIN="LOGIN",e.SET_USERINFO="SET_USERINFO",e.SET_PERMISSION="SET_PERMISSION",e))(g||{});const Me={userInfo:null,permission:[]},ke=(e=Me,t)=>{const{type:n,payload:s}=t;switch(n){case g.LOGIN:return{...e,...s};case g.SET_USERINFO:return{...e,userInfo:s};case g.SET_PERMISSION:return{...e,permission:s};default:return e}},Ae=pe({user:ke}),je=he(Ae,_e(ge(fe)));function Ue(e,t){return j(v(e),t,(n,s)=>{if(U(n)&&U(s))return j(v(n),s,(o,i)=>ye(o)?o.concat(i):void 0)})}const Z=e=>e.replace(/^\//,"").replace(/\/:[^/]+/g,""),w=getComputedStyle(document.documentElement),Be=e=>e.replace(/([A-Z])/g,"-$1").toLowerCase(),$e={borderRadius:0},Q={token:{...$e,colorPrimary:w.getPropertyValue("--color-primary"),menuColor:w.getPropertyValue("--menu-color"),menuHoverBg:w.getPropertyValue("--menu-hover-bg")}},Fe=m.createContext({theme:v(Q),updateTheme:()=>{}}),Ve=({children:e})=>{const[t,n]=m.useState(v(Q)),s=i=>{Object.keys(i).forEach(c=>{Object.prototype.toString.call(i[c])==="[object Object]"?s(i[c]):document.documentElement.style.setProperty(`--${Be(c)}`,i[c])})},o=(i={})=>{n(c=>({...Ue(c,i)})),s(i)};return r(Fe.Provider,{value:{theme:t,updateTheme:o},children:r(be,{theme:t,children:e})})},De="modulepreload",qe=function(e){return"/beacon_console/"+e},B={},h=function(t,n,s){if(!n||n.length===0)return t();const o=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=qe(i),i in B)return;B[i]=!0;const c=i.endsWith(".css"),a=c?'[rel="stylesheet"]':"";if(!!s)for(let u=o.length-1;u>=0;u--){const p=o[u];if(p.href===i&&(!c||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${a}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":De,c||(d.as="script",d.crossOrigin=""),d.href=i,document.head.appendChild(d),c)return new Promise((u,p)=>{d.addEventListener("load",u),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())},E={"app-container":"_app-container_113qc_1","app-container__header":"_app-container__header_113qc_10","app-container__tabs":"_app-container__tabs_113qc_14","app-container__main":"_app-container__main_113qc_18"},O={"header-container":"_header-container_roc25_1","header-container-logo":"_header-container-logo_roc25_7","header-container-menu":"_header-container-menu_roc25_11","header-container-setting":"_header-container-setting_roc25_15"},ze=(e,t,n)=>{const{idKey:s,parentIdKey:o,formatNode:i=a=>a}=n,c=(a,l)=>{const d=[];for(let u=0,p=l.length;u<p;u++){const _=l[u],x=_[o],A=_[s];if(x===a){const me={id:A,data:_,children:c(A,l)};d.push(i(me))}}return d};return c(e,t)},Ke=({data:e,children:t})=>({...e,children:t}),X=(e,t=null,n)=>e.map(s=>{const o={...s,url:t?`${t.url+s.permissionCode}`:s.permissionCode};return o.children=X(s.children,o,n),n?n(o):o});function Y({formatNode:e,includeButton:t=!1,filterUnShowRoute:n=!0}){const{permission:s}=S(a=>({permission:a.user.permission}),T),o=a=>{let l=!0;return t||(l=l&&a.type==="ROUTE"),n&&(l=l&&a.show===!0),l},i=v(s.filter(a=>o(a)));return{menu:X(ze(null,i,{idKey:"permissionId",parentIdKey:"parentPermissionId",formatNode:a=>Ke(a)}),null,e)}}const ee=m.createContext({routerMetas:[]}),Ge=({routerMetas:e,routes:t})=>{const n=ve(t);return r(ee.Provider,{value:{routerMetas:e},children:n})},te=()=>m.useContext(ee),He=()=>{const e=L(),t=M(),{routerMetas:n}=te(),{menu:s}=Y({formatNode:({permissionId:c,url:a,permissionName:l,children:d})=>({key:a,label:l,url:a,children:d.length?d:void 0})}),o=()=>n.find(a=>D(a.url,t.pathname)),i=c=>{const{props:{url:a}}=c.item;e(a)};return r(Pe,{id:"menu",selectedKeys:[o().url],onSelect:i,mode:"horizontal",items:s})},Je=()=>f("div",{className:O["header-container"],children:[r("div",{className:O["header-container-logo"]}),r("div",{className:O["header-container-menu"],children:r(He,{})}),r("div",{className:O["header-container-setting"]})]}),We=()=>{const e=L(),t=Symbol("tab"),n=M(),{routerMetas:s}=te(),{permission:o}=S(u=>({permission:u.user.permission}),T);let i=`${t.description}/home`;const c=m.useRef(new Map([[`${t.description}/home`,{url:"/home",meta:{title:"首页",closable:!1},children:[]}]])),a=()=>{if(o.length){const u=s.find(_=>D(_.url,n.pathname)),p=`${t.description}${n.pathname}`;c.current.set(p,u),i=p}},l=u=>{e(u.split(`${t.description}`)[1])},d=(u,p)=>{if(p==="remove"){c.current.delete(u);const _=Array.from(c.current),x=_[_.length-1][0];e(x.split(`${t.description}`)[1])}};return a(),m.useEffect(()=>()=>{c.current.clear()},[]),r(q,{activeKey:i,type:"editable-card",hideAdd:!0,items:Array.from(c.current).map(u=>({key:u[0],label:u[1].meta.title,closable:u[1].meta.closable,children:null})),onChange:l,onEdit:d})},Ze=({children:e})=>e,R=()=>{console.log("layout");let e=Ie();const t=m.useRef(null),{pathname:n}=M();return f("div",{className:E["app-container"],children:[r("div",{className:E["app-container__header"],children:r(Je,{})}),r("div",{className:E["app-container__tabs"],children:r(We,{})}),r("div",{className:E["app-container__main"],children:r(Ze,{children:r(Ee,{aliveRef:t,activeName:n,cache:!0,children:e})})})]})},ne=()=>(console.log("渲染主页"),f("section",{children:[r(Oe,{}),"主页"]})),Qe=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"})),Xe="_page_1x1ij_1",Ye="_login_1x1ij_6",et="_login__header_1x1ij_10",tt="_login__body_1x1ij_22",y={page:Xe,login:Ye,login__header:et,"login__header-title":"_login__header-title_1x1ij_13","login__header-description":"_login__header-description_1x1ij_17",login__body:tt},re=({methods:e,loading:t,onClickLoginBtn:n})=>({items:[{name:"username",label:"",component:"Input",required:!0,componentProps:{prefix:r(z,{}),placeholder:"用户名"}},{name:"password",label:"",component:"InputPassword",required:!0,componentProps:{prefix:r(K,{}),placeholder:"密码"}},{name:"remember",label:"",initialValue:!1,valuePropName:"checked",render:({model:s})=>f("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r(G,{checked:s.remember,onChange:o=>{e.setFieldsValue({remember:o.target.checked})},children:"记住账号"}),r(H,{type:"link",children:"忘记密码"})]})},{name:"submit",label:"",component:"Button",componentProps:{type:"primary",children:"登录",style:{width:"100%"},loading:t,onClick:n}}]}),se=({methods:e,loading:t,onClickRegisterBtn:n})=>({items:[{name:"username",label:"",component:"Input",required:!0,componentProps:{prefix:r(z,{}),placeholder:"用户名"}},{name:"password",label:"",component:"InputPassword",required:!0,componentProps:{prefix:r(K,{}),placeholder:"密码"}},{name:"remember",label:"",initialValue:!1,valuePropName:"checked",render:({model:s})=>f("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r(G,{checked:s.remember,onChange:o=>{e.setFieldsValue({remember:o.target.checked})},children:"记住账号"}),r(H,{type:"link",children:"忘记密码"})]})},{name:"submit",label:"",component:"Button",componentProps:{type:"primary",children:"注册",style:{width:"100%"},loading:t,onClick:n}}]}),nt=Object.freeze(Object.defineProperty({__proto__:null,getLoginFormProps:re,getRegisterFormProps:se},Symbol.toStringTag,{value:"Module"})),$=new Map([["JSON",{get:e=>JSON.parse(e),set:e=>JSON.stringify(e)}]]);function rt(e){return function(t,n){return{get(){let s=e.getItem(t);if(typeof n<"u"){const o=$.get(n);o&&(s=o.get(s))}return s},set(s){if(typeof n<"u"){const o=$.get(n);o&&(s=o.set(s))}return e.setItem(t,s)},remove:()=>e.removeItem(t)}}}const F=rt(localStorage),P={token:F("token"),user:F("user","JSON")},oe=[{permissionId:"1",permissionName:"首页",permissionCode:"/home",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!1},{permissionId:"1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"1",closable:!0},{permissionId:"2",permissionName:"系统",permissionCode:"/system",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!0},{permissionId:"2-1",permissionName:"角色管理",permissionCode:"/role/:id/:name",description:"string",type:"ROUTE",show:!1,parentPermissionId:"2",closable:!0},{permissionId:"2-2",permissionName:"组织架构",permissionCode:"/organizationalStructure",description:"string",type:"ROUTE",show:!0,parentPermissionId:"2",closable:!0},{permissionId:"2-2-1",permissionName:"部门管理",permissionCode:"/department",description:"string",type:"ROUTE",show:!0,parentPermissionId:"2-2",closable:!0},{permissionId:"2-2-1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-2-1",closable:!0},{permissionId:"2-1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-1",closable:!0},{permissionId:"2-1-2",permissionName:"编辑",permissionCode:"edit",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-1",closable:!0},{permissionId:"3",permissionName:"用户",permissionCode:"/user",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!0},{permissionId:"3-1",permissionName:"用户管理",permissionCode:"/userManage",description:"string",type:"ROUTE",show:!0,parentPermissionId:"3",closable:!0}],st=()=>new Promise(e=>{setTimeout(()=>{e(!0)},300)}),V=()=>new Promise(e=>{setTimeout(()=>{e({data:{user:{name:"xxx",password:"xxx"},token:"token"}})},300)}),ot=()=>new Promise(e=>{setTimeout(()=>{e({data:{user:{name:"xxx",password:"xxx"}}})},300)}),it=()=>new Promise(e=>{V().then(async()=>{const{data:t}=await V();console.log(t),P.token.set(t.token),P.user.set(t.user),e({type:g.LOGIN,payload:{userInfo:t.user,permission:oe}})})}),at=async()=>{const{data:e}=await ot();return console.log(e),P.user.set(e.user),{type:g.SET_USERINFO,payload:e.user}},ct=async()=>{const e=await st();return console.log(e),{type:g.SET_PERMISSION,payload:oe}},lt=e=>{const t=L(),[n,s]=m.useState(!1),o=()=>{c.validator().then(d=>{console.log(d),s(!0),e.login().then(()=>{t("/home")}).finally(()=>{s(!1)})})};console.log("=======================================parent render");const[i,c]=J(),a=re({methods:c,loading:n,onClickLoginBtn:o}),l=m.useRef();return r(W,{register:i,ref:l,...a})},ie=Re(e=>({user:e.user}),{login:it})(lt),ut=Object.freeze(Object.defineProperty({__proto__:null,default:ie},Symbol.toStringTag,{value:"Module"}));function ae(){const[e,t]=m.useState(!1),[n,s]=J(),i=se({methods:s,loading:e,onClickRegisterBtn:()=>{t(!0),t(!1)}});return r(W,{register:n,...i})}const dt=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));function ce(){let e="1";return{tabsActiveKey:e,tabsList:[{key:"1",label:"登录",children:r(ie,{})},{key:"2",label:"注册",children:r(ae,{})}],onChangeTabs:s=>{e=s}}}const mt=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"})),le=()=>{const{tabsActiveKey:e,tabsList:t,onChangeTabs:n}=ce();return r("div",{className:y.page,children:f("div",{className:y.login,children:[f("div",{className:y.login__header,children:[r("div",{className:y["login__header-title"],children:"项目管理系统"}),r("div",{className:y["login__header-description"],children:"项目成功，系统成就"})]}),r("div",{className:y.login__body,children:r(q,{defaultActiveKey:e,items:t,onChange:n})})]})})},pt=Object.freeze(Object.defineProperty({__proto__:null,default:le},Symbol.toStringTag,{value:"Module"})),ht={"loading-container":"_loading-container_u84nk_1"},ue=()=>r("div",{className:ht["loading-container"],children:r(Se,{tip:"玩命加载中",children:r(Le,{})})}),_t=Object.assign({"../views/error/index.tsx":()=>h(()=>import("./index-a33410c1.js"),["assets/index-a33410c1.js","assets/vendor-0cd3085b.js","assets/vendor-c2f31cdc.css"]),"../views/home/index.tsx":()=>h(()=>Promise.resolve().then(()=>Qe),void 0),"../views/login/components/signin-form.tsx":()=>h(()=>Promise.resolve().then(()=>ut),void 0),"../views/login/components/signup-form.tsx":()=>h(()=>Promise.resolve().then(()=>dt),void 0),"../views/login/hooks/use-tags.tsx":()=>h(()=>Promise.resolve().then(()=>mt),void 0),"../views/login/index.tsx":()=>h(()=>Promise.resolve().then(()=>pt),void 0),"../views/login/indexConfig.tsx":()=>h(()=>Promise.resolve().then(()=>nt),void 0),"../views/system/organizationalStructure/department/index.tsx":()=>h(()=>import("./index-6138cb30.js"),["assets/index-6138cb30.js","assets/vendor-0cd3085b.js","assets/vendor-c2f31cdc.css"]),"../views/system/role/index.tsx":()=>h(()=>import("./index-d7f677c3.js"),["assets/index-d7f677c3.js","assets/vendor-0cd3085b.js","assets/vendor-c2f31cdc.css"]),"../views/user/userManage/index.tsx":()=>h(()=>import("./index-5976bbcb.js"),["assets/index-5976bbcb.js","assets/vendor-0cd3085b.js","assets/vendor-c2f31cdc.css"])}),b=(e,t)=>{const n=m.lazy(_t[`../views/${e}/index.tsx`]);return r(m.Suspense,{fallback:r(ue,{}),children:r(n,{...t})})},I=({children:e})=>{const t=P.token.get(),{userInfo:n}=S(i=>({userInfo:i.user.userInfo}),T),s=Te(),o=m.lazy(async()=>(t&&!n&&await Promise.all([at(),ct()]).then(([i,c])=>{s(i),s(c)}).catch(()=>({default:()=>b("error",{type:500})})),{default:t?()=>e:()=>r(k,{to:"/login"})}));return r(m.Suspense,{fallback:r(ue,{}),children:r(o,{})})},gt=()=>[{path:"/login",element:P.token.get()?r(k,{replace:!0,to:"/home"}):r(le,{})},{path:"/user",element:r(R,{}),children:[{path:"userManage",element:r(I,{children:b("user/userManage")}),meta:{title:"用户管理",closable:!0}}]}],ft=e=>[{path:"/",element:r(k,{to:"/home"})},...e,{path:"/home",element:r(R,{}),children:[{path:"",element:r(I,{children:r(ne,{})}),meta:{title:"首页",closable:!1}}]},{path:"*",element:r(R,{}),children:[{path:"*",element:r(I,{children:b("error",{type:404})}),meta:{title:"错误页",closable:!0}}]}],de=({children:e,url:t,id:n})=>{const{permission:s}=S(a=>({permission:a.user.permission}),T),o=s.find(a=>a.permissionId===n);return s.filter(a=>a.parentPermissionId===(o==null?void 0:o.permissionId)&&a.type==="BUTTON").findIndex(a=>a.permissionCode==="view")!==-1?e:b("error",{type:403})},yt=(e,t)=>{switch(!!e){case!0:return t.permissionCode.replace(/^\//,"");case!1:return t.permissionCode}},bt=(e,t)=>{const n=!!e,{url:s}=t;switch(n){case!0:return t.children.length?r(xe,{}):r(I,{children:r(de,{url:s,id:t.permissionId,children:b(Z(s))})});case!1:return r(R,{})}},vt=(e,t)=>{const n=!!e,{url:s}=t;switch(n){case!0:return N(t.children,t);case!1:return t.children.length?N(t.children,t):[{path:"",element:r(I,{children:r(de,{url:s,id:t.permissionId,children:b(Z(s))})}),meta:{title:t.permissionName,closable:t.closable}}]}},N=(e,t=null)=>e.map(n=>(n.url=((t==null?void 0:t.url)||"")+n.permissionCode,{path:yt(t,n),element:bt(t,n),children:vt(t,n),meta:{title:n.permissionName,closable:n.closable}}));function Pt(){const{menu:e}=Y({filterUnShowRoute:!1}),t=N(e),n=[...gt(),...ft(t)],s=(c,a=null)=>c.map(l=>{if(l.path.includes("*"))return{url:l.children[0].path,children:[],meta:l.children[0].meta||{}};const d=a?`${a.path+(l.path?"/"+l.path:"")}`:l.path,u=s(l.children||[],{...l,path:d});return{url:d,children:u,meta:l.meta||{}}}),o=c=>{const a=[];return c.forEach(l=>{l.children&&l.children.length?a.push(...o(l.children)):a.push({meta:l.meta,url:l.url,children:[]})}),a},i=o(s(n));return{routes:n,routerMetas:i}}const It=()=>{const{routes:e,routerMetas:t}=Pt();return r(Ge,{routerMetas:t,routes:e})},{VITE_ROUTER_BASENAME:Et}={VITE_BASE_API_URL:"",VITE_BASE:"/beacon_console/",VITE_ROUTER_BASENAME:"/beacon_console",BASE_URL:"/beacon_console/",MODE:"gh-pages",DEV:!1,PROD:!0,SSR:!1};we.createRoot(document.getElementById("root")).render(r(Ve,{children:r(Ne,{store:je,children:r(Ce,{basename:Et,children:r(It,{})})})}));export{f as a,r as j};