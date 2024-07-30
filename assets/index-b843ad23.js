import{j as L,c as pe,a as he,b as ge,d as _e,_ as fe,m as U,e as P,i as B,f as ye,r as m,C as be,u as R,s as T,g as Ie,h as M,k as A,M as Pe,l as z,T as K,$ as ve,n as ke,N as we,Y as Oe,U as G,L as H,o as J,B as W,p as Se,V as Y,w as Z,S as Ee,q as V,t as Re,O as Te,v as xe,P as Ce,x as Ne,y as Le}from"./vendor-063d83cd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const Me=L.Fragment,r=L.jsx,b=L.jsxs;var _=(n=>(n.LOGIN="LOGIN",n.SET_USERINFO="SET_USERINFO",n.SET_PERMISSION="SET_PERMISSION",n))(_||{});const Ae={userInfo:null,permission:[]},Ve=(n=Ae,t)=>{const{type:e,payload:o}=t;switch(e){case _.LOGIN:return{...n,...o};case _.SET_USERINFO:return{...n,userInfo:o};case _.SET_PERMISSION:return{...n,permission:o};default:return n}},je=pe({user:Ve}),Ue=he(je,ge(_e(fe)));function Be(n,t){return U(P(n),t,(e,o)=>{if(B(e)&&B(o))return U(P(e),o,(s,a)=>ye(s)?s.concat(a):void 0)})}const Q=n=>n.replace(/^\//,"").replace(/\/:[^/]+/g,""),w=getComputedStyle(document.documentElement),$e=n=>n.replace(/([A-Z])/g,"-$1").toLowerCase(),Fe={borderRadius:0},X={token:{...Fe,colorPrimary:w.getPropertyValue("--color-primary"),colorLink:w.getPropertyValue("--color-link"),menuColor:w.getPropertyValue("--menu-color"),menuHoverBg:w.getPropertyValue("--menu-hover-bg")}},De=m.createContext({theme:P(X),updateTheme:()=>{}}),qe=({children:n})=>{const[t,e]=m.useState(P(X)),o=a=>{Object.keys(a).forEach(l=>{Object.prototype.toString.call(a[l])==="[object Object]"?o(a[l]):document.documentElement.style.setProperty(`--${$e(l)}`,a[l])})},s=(a={})=>{e(l=>({...Be(l,a)})),o(a)};return r(De.Provider,{value:{theme:t,updateTheme:s},children:r(be,{theme:t,children:n})})},ze="modulepreload",Ke=function(n){return"/beacon_console/"+n},$={},h=function(t,e,o){if(!e||e.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(e.map(a=>{if(a=Ke(a),a in $)return;$[a]=!0;const l=a.endsWith(".css"),i=l?'[rel="stylesheet"]':"";if(!!o)for(let p=s.length-1;p>=0;p--){const d=s[p];if(d.href===a&&(!l||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${i}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":ze,l||(u.as="script",u.crossOrigin=""),u.href=a,document.head.appendChild(u),l)return new Promise((p,d)=>{u.addEventListener("load",p),u.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>t())},O={"app-container":"_app-container_113qc_1","app-container__header":"_app-container__header_113qc_10","app-container__tabs":"_app-container__tabs_113qc_14","app-container__main":"_app-container__main_113qc_18"},S={"header-container":"_header-container_8s36g_1","header-container-logo":"_header-container-logo_8s36g_7","header-container-menu":"_header-container-menu_8s36g_11","header-container-setting":"_header-container-setting_8s36g_16"},Ge=(n,t,e)=>{const{idKey:o,parentIdKey:s,formatNode:a=i=>i}=e,l=(i,c)=>{const u=[];for(let p=0,d=c.length;p<d;p++){const g=c[p],f=g[s],I=g[o];if(f===i){const x={id:I,data:g,children:l(I,c)};u.push(a(x))}}return u};return l(n,t)},He=({data:n,children:t})=>({...n,children:t}),ee=(n,t=null,e)=>n.map(o=>{const s={...o,url:t?`${t.url+o.permissionCode}`:o.permissionCode};return s.children=ee(o.children,s,e),e?e(s):s});function ne({formatNode:n,includeButton:t=!1,filterUnShowRoute:e=!0}){const{permission:o}=R(i=>({permission:i.user.permission}),T),s=i=>{let c=!0;return t||(c=c&&i.type==="ROUTE"),e&&(c=c&&i.show===!0),c},a=P(o.filter(i=>s(i)));return{menu:ee(Ge(null,a,{idKey:"permissionId",parentIdKey:"parentPermissionId",formatNode:i=>He(i)}),null,n)}}const te=m.createContext({routes:[],routerMetas:[]}),Je=({routerMetas:n,routes:t})=>{const e=Ie(t);return r(te.Provider,{value:{routerMetas:n,routes:t},children:e})},j=()=>m.useContext(te),We=()=>{const n=M(),t=A(),{routerMetas:e}=j(),{menu:o}=ne({formatNode:({permissionId:l,url:i,permissionName:c,children:u})=>({key:i,label:c,url:i,children:u.length?u:void 0})}),s=()=>e.find(i=>z(i.url,t.pathname)),a=l=>{const{props:{url:i}}=l.item;n(i)};return r(Pe,{id:"menu",selectedKeys:[s().url],onSelect:a,mode:"horizontal",items:o})},Ye=()=>b("div",{className:S["header-container"],children:[r("div",{className:S["header-container-logo"]}),r("div",{className:S["header-container-menu"],children:r(We,{})}),r("div",{className:S["header-container-setting"]})]}),Ze=({aliveRef:n})=>{const t=M(),e=Symbol("tab"),o=A(),{routerMetas:s}=j(),{permission:a}=R(d=>({permission:d.user.permission}),T);let l=`${e.description}/home`;const i=m.useRef(new Map([[`${e.description}/home`,{url:"/home",meta:{title:"首页",closable:!1},children:[]}]])),c=()=>{if(a.length){const d=s.find(f=>z(f.url,o.pathname)),g=`${e.description}${o.pathname}`;i.current.set(g,d),l=g}},u=d=>{t(d.split(`${e.description}`)[1])},p=(d,g)=>{var f;if(g==="remove"){i.current.delete(d),(f=n.current)==null||f.removeCache(d.split(`${e.description}`)[1]);const I=Array.from(i.current),x=I[I.length-1][0];t(x.split(`${e.description}`)[1])}};return c(),m.useEffect(()=>()=>{i.current.clear()},[]),r(K,{activeKey:l,type:"editable-card",hideAdd:!0,items:Array.from(i.current).map(d=>({key:d[0],label:d[1].meta.title,closable:d[1].meta.closable,children:null})),onChange:u,onEdit:p})},Qe=({children:n})=>n,C=()=>{console.log("layout");const{routes:n}=j(),{pathname:t}=A(),e=ve(),[o,s]=m.useState(0),a=ke();m.useEffect(()=>{s(o+1)},[n]);const l=m.useMemo(()=>o===0?1:o,[o]);return b("div",{className:O["app-container"],children:[r("div",{className:O["app-container__header"],children:r(Ye,{})}),r("div",{className:O["app-container__tabs"],children:r(Ze,{aliveRef:e})}),r("div",{className:O["app-container__main"],children:r(Qe,{children:r(we,{aliveRef:e,activeName:t,cache:!0,children:a},l)})})]})},oe=()=>{const n={table:{rowSelection:{type:"checkbox"},fullHeight:!0,columns:[{title:"姓名",dataIndex:"name",key:"name",cellFunc:[{component:"link",componentProps:{url:"https://www.taobao.com"}}]},{title:"地址",dataIndex:"address",key:"address"},{title:"年龄",dataIndex:"age",key:"age",cellFunc:({record:e})=>[{component:"link",componentProps:{url:"https://www.baidu.com"}},{component:"link",componentProps:{onClick:()=>{window.open("https://www.jd.com/")}}}]},{title:"操作",dataIndex:"actions",cellFunc:({record:e})=>[{component:"actions",componentProps:{type:"dashed",max:1,items:[{key:"add",component:"Button",componentProps:{children:"我是按钮",onClick:o=>{console.log(o)}}},{key:"more",component:"Dropdown",componentProps:{children:"我是下拉",dropDownItems:[{key:"1",label:"我是下拉1"},{key:"2",label:"我是下拉2"}],onClick:o=>{console.log(o)}}},{key:"render",render:r("div",{children:"我是自定义render"})}]}}]}],autoPagination:!0,api:async e=>(console.log(e),new Promise(o=>{setTimeout(()=>{o([{key:"1",name:"胡彦斌",age:32,address:"西湖区湖底公园1号"},{key:"2",name:"李雷",age:28,address:"东城区东华门大街2号"},{key:"3",name:"韩梅梅",age:30,address:"南山区南山路3号"},{key:"4",name:"王小明",age:25,address:"北城区北门大街4号"},{key:"5",name:"赵丽颖",age:29,address:"中城区中山路5号"},{key:"6",name:"陈晓",age:31,address:"西湖区湖底公园6号"},{key:"7",name:"刘亦菲",age:27,address:"东城区东华门大街7号"},{key:"8",name:"张三",age:33,address:"南山区南山路8号"},{key:"9",name:"李四",age:26,address:"北城区北门大街9号"},{key:"10",name:"王五",age:35,address:"中城区中山路10号"},{key:"11",name:"赵六",age:34,address:"西湖区湖底公园11号"},{key:"12",name:"孙七",age:28,address:"东城区东华门大街12号"},{key:"13",name:"周八",age:29,address:"南山区南山路13号"},{key:"14",name:"吴九",age:31,address:"北城区北门大街14号"},{key:"15",name:"郑十",age:27,address:"中城区中山路15号"},{key:"16",name:"何十一",age:30,address:"西湖区湖底公园16号"},{key:"17",name:"冯十二",age:33,address:"东城区东华门大街17号"},{key:"18",name:"褚十三",age:32,address:"南山区南山路18号"},{key:"19",name:"卫十四",age:29,address:"北城区北门大街19号"},{key:"20",name:"蒋十五",age:28,address:"中城区中山路20号"},{key:"21",name:"沈十六",age:31,address:"西湖区湖底公园21号"},{key:"22",name:"韩十七",age:34,address:"东城区东华门大街22号"},{key:"23",name:"杨十八",age:27,address:"南山区南山路23号"},{key:"24",name:"朱十九",age:30,address:"北城区北门大街24号"},{key:"25",name:"秦二十",age:33,address:"中城区中山路25号"},{key:"26",name:"尤二一",age:32,address:"西湖区湖底公园26号"},{key:"27",name:"许二二",age:29,address:"东城区东华门大街27号"},{key:"28",name:"何二三",age:28,address:"南山区南山路28号"},{key:"29",name:"吕二四",age:31,address:"北城区北门大街29号"},{key:"30",name:"施二五",age:34,address:"中城区中山路30号"}])},2e3)})),toolbar:{type:"primary",max:2,items:[{key:"add",component:"Button",componentProps:{children:"我是按钮",onClick:e=>{console.log(e)}}},{key:"more",component:"Dropdown",componentProps:{children:"我是下拉",dropDownItems:[{key:"1",label:"我是下拉1"},{key:"2",label:"我是下拉2"}],onClick:e=>{console.log(e)}}},{key:"render",render:r("div",{children:"我是自定义render"})}]}},searchForm:{colProps:{span:6},collapsible:!0,items:[{name:"Button",label:"弹窗",component:"Button",componentProps:{children:"点击打开表格弹窗",onClick:e=>{var o;console.log(t.current),(o=t.current)==null||o.open()}}},{name:"Input",label:"Input",component:"Input",required:!0,initialValue:"Input",componentProps:{onChange:e=>{console.log(e)}},ifShow:({model:e})=>e.Input2==="Input1"},{name:"Input2",label:"Input",component:"Input",required:!0,initialValue:"Input",componentProps:{onChange:e=>{console.log(e)}}},{name:"Input3",label:"Input",component:"Input",required:!0,initialValue:"Input",componentProps:{onChange:e=>{console.log(e)}}},{name:"Input4",label:"Input",component:"Input",required:!0,initialValue:"Input",componentProps:{onChange:e=>{console.log(e)}}},{name:"Input5",label:"Input",component:"Input",required:!0,initialValue:"Input",componentProps:{onChange:e=>{console.log(e)}}},{name:"Input6",label:"Input",component:"Input",required:!0,initialValue:"Input",componentProps:{onChange:e=>{console.log(e)}}}]},crudFormDialog:{title:"弹窗",mask:!0,formProps:{items:[{name:"Input",label:"Input",component:"Input",required:!0,initialValue:"Input",componentProps:{onChange:e=>{console.log(e)}},colProps:{span:12}},{name:"Select",label:"Select",component:"Select",required:!0,componentProps:{options:[{label:"Option1",value:"Option1"},{label:"Option2",value:"Option2"}],onChange:e=>{console.log(e)}},colProps:{span:12}}]},onOk:()=>{var e;console.log("onOk"),(e=t.current)==null||e.validator()},onCancel:()=>{var e;console.log("onCancel"),(e=t.current)==null||e.close()}}},t=m.useRef(null);return r(Oe,{ref:t,...n,onRowSelectionChange:(e,o)=>{console.log(e,o)}})},Xe=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"})),en="_page_1x1ij_1",nn="_login_1x1ij_6",tn="_login__header_1x1ij_10",on="_login__body_1x1ij_22",y={page:en,login:nn,login__header:tn,"login__header-title":"_login__header-title_1x1ij_13","login__header-description":"_login__header-description_1x1ij_17",login__body:on},re=({methods:n,loading:t,onClickLoginBtn:e})=>({items:[{name:"username",label:"",component:"Input",required:!0,componentProps:{prefix:r(G,{}),placeholder:"用户名"}},{name:"password",label:"",component:"InputPassword",required:!0,componentProps:{prefix:r(H,{}),placeholder:"密码"}},{name:"remember",label:"",initialValue:!1,valuePropName:"checked",render:({model:o})=>b("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r(J,{checked:o.remember,onChange:s=>{n.setFieldsValue({remember:s.target.checked})},children:"记住账号"}),r(W,{type:"link",children:"忘记密码"})]})},{name:"submit",label:"",component:"Button",componentProps:{type:"primary",children:"登录",style:{width:"100%"},loading:t,onClick:e}}]}),se=({methods:n,loading:t,onClickRegisterBtn:e})=>({items:[{name:"username",label:"",component:"Input",required:!0,componentProps:{prefix:r(G,{}),placeholder:"用户名"}},{name:"password",label:"",component:"InputPassword",required:!0,componentProps:{prefix:r(H,{}),placeholder:"密码"}},{name:"remember",label:"",initialValue:!1,valuePropName:"checked",render:({model:o})=>b("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r(J,{checked:o.remember,onChange:s=>{n.setFieldsValue({remember:s.target.checked})},children:"记住账号"}),r(W,{type:"link",children:"忘记密码"})]})},{name:"submit",label:"",component:"Button",componentProps:{type:"primary",children:"注册",style:{width:"100%"},loading:t,onClick:e}}]}),rn=Object.freeze(Object.defineProperty({__proto__:null,getLoginFormProps:re,getRegisterFormProps:se},Symbol.toStringTag,{value:"Module"})),F=new Map([["JSON",{get:n=>JSON.parse(n),set:n=>JSON.stringify(n)}]]);function sn(n){return function(t,e){return{get(){let o=n.getItem(t);if(typeof e<"u"){const s=F.get(e);s&&(o=s.get(o))}return o},set(o){if(typeof e<"u"){const s=F.get(e);s&&(o=s.set(o))}return n.setItem(t,o)},remove:()=>n.removeItem(t)}}}const D=sn(localStorage),v={token:D("token"),user:D("user","JSON")},ae=[{permissionId:"1",permissionName:"首页",permissionCode:"/home",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!1},{permissionId:"1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"1",closable:!0},{permissionId:"2",permissionName:"系统",permissionCode:"/system",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!0},{permissionId:"2-1",permissionName:"角色管理",permissionCode:"/role/:id/:name",description:"string",type:"ROUTE",show:!1,parentPermissionId:"2",closable:!0},{permissionId:"2-2",permissionName:"组织架构",permissionCode:"/organizationalStructure",description:"string",type:"ROUTE",show:!0,parentPermissionId:"2",closable:!0},{permissionId:"2-2-1",permissionName:"部门管理",permissionCode:"/department",description:"string",type:"ROUTE",show:!0,parentPermissionId:"2-2",closable:!0},{permissionId:"2-2-1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-2-1",closable:!0},{permissionId:"2-1-1",permissionName:"查看",permissionCode:"view",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-1",closable:!0},{permissionId:"2-1-2",permissionName:"编辑",permissionCode:"edit",description:"string",type:"BUTTON",show:!0,parentPermissionId:"2-1",closable:!0},{permissionId:"3",permissionName:"用户",permissionCode:"/user",description:"string",type:"ROUTE",show:!0,parentPermissionId:null,closable:!0},{permissionId:"3-1",permissionName:"用户管理",permissionCode:"/userManage",description:"string",type:"ROUTE",show:!0,parentPermissionId:"3",closable:!0}],an=()=>new Promise(n=>{setTimeout(()=>{n(!0)},300)}),q=()=>new Promise(n=>{setTimeout(()=>{n({data:{user:{name:"xxx",password:"xxx"},token:"token"}})},300)}),ln=()=>new Promise(n=>{setTimeout(()=>{n({data:{user:{name:"xxx",password:"xxx"}}})},300)}),cn=()=>new Promise(n=>{q().then(async()=>{const{data:t}=await q();console.log(t),v.token.set(t.token),v.user.set(t.user),n({type:_.LOGIN,payload:{userInfo:t.user,permission:ae}})})}),un=async()=>{const{data:n}=await ln();return console.log(n),v.user.set(n.user),{type:_.SET_USERINFO,payload:n.user}},dn=async()=>{const n=await an();return console.log(n),{type:_.SET_PERMISSION,payload:ae}},mn=n=>{const t=M(),[e,o]=m.useState(!1),s=()=>{l.validator().then(u=>{console.log(u),o(!0),n.login().then(()=>{t("/home")}).finally(()=>{o(!1)})})};console.log("=======================================parent render");const[a,l]=Y(),i=re({methods:l,loading:e,onClickLoginBtn:s}),c=m.useRef(null);return r(Z,{register:a,ref:c,...i})},ie=Se(n=>({user:n.user}),{login:cn})(mn),pn=Object.freeze(Object.defineProperty({__proto__:null,default:ie},Symbol.toStringTag,{value:"Module"}));function le(){const[n,t]=m.useState(!1),[e,o]=Y(),a=se({methods:o,loading:n,onClickRegisterBtn:()=>{t(!0),t(!1)}});return r(Z,{register:e,...a})}const hn=Object.freeze(Object.defineProperty({__proto__:null,default:le},Symbol.toStringTag,{value:"Module"}));function ce(){let n="1";return{tabsActiveKey:n,tabsList:[{key:"1",label:"登录",children:r(ie,{})},{key:"2",label:"注册",children:r(le,{})}],onChangeTabs:o=>{n=o}}}const gn=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"})),ue=()=>{const{tabsActiveKey:n,tabsList:t,onChangeTabs:e}=ce();return r("div",{className:y.page,children:b("div",{className:y.login,children:[b("div",{className:y.login__header,children:[r("div",{className:y["login__header-title"],children:"项目管理系统"}),r("div",{className:y["login__header-description"],children:"项目成功，系统成就"})]}),r("div",{className:y.login__body,children:r(K,{defaultActiveKey:n,items:t,onChange:e})})]})})},_n=Object.freeze(Object.defineProperty({__proto__:null,default:ue},Symbol.toStringTag,{value:"Module"})),fn={"loading-container":"_loading-container_u84nk_1"},de=()=>r("div",{className:fn["loading-container"],children:r(Ee,{tip:"玩命加载中",children:r(Me,{})})}),yn=Object.assign({"../views/error/index.tsx":()=>h(()=>import("./index-f62971e8.js"),["assets/index-f62971e8.js","assets/vendor-063d83cd.js"]),"../views/home/index.tsx":()=>h(()=>Promise.resolve().then(()=>Xe),void 0),"../views/login/components/signin-form.tsx":()=>h(()=>Promise.resolve().then(()=>pn),void 0),"../views/login/components/signup-form.tsx":()=>h(()=>Promise.resolve().then(()=>hn),void 0),"../views/login/hooks/use-tags.tsx":()=>h(()=>Promise.resolve().then(()=>gn),void 0),"../views/login/index.tsx":()=>h(()=>Promise.resolve().then(()=>_n),void 0),"../views/login/indexConfig.tsx":()=>h(()=>Promise.resolve().then(()=>rn),void 0),"../views/system/organizationalStructure/department/index.tsx":()=>h(()=>import("./index-2e578a75.js"),["assets/index-2e578a75.js","assets/vendor-063d83cd.js"]),"../views/system/role/index.tsx":()=>h(()=>import("./index-bda84d81.js"),["assets/index-bda84d81.js","assets/vendor-063d83cd.js"]),"../views/user/userManage/index.tsx":()=>h(()=>import("./index-d2de7b25.js"),["assets/index-d2de7b25.js","assets/vendor-063d83cd.js"])}),k=(n,t)=>{const e=m.lazy(yn[`../views/${n}/index.tsx`]);return r(m.Suspense,{fallback:r(de,{}),children:r(e,{...t})})},E=({children:n})=>{const t=v.token.get(),{userInfo:e}=R(a=>({userInfo:a.user.userInfo}),T),o=Re(),s=m.lazy(async()=>(t&&!e&&await Promise.all([un(),dn()]).then(([a,l])=>{o(a),o(l)}).catch(()=>({default:()=>k("error",{type:500})})),{default:t?()=>n:()=>r(V,{to:"/login"})}));return r(m.Suspense,{fallback:r(de,{}),children:r(s,{})})},bn=()=>[{path:"/login",element:v.token.get()?r(V,{replace:!0,to:"/home"}):r(ue,{})}],In=n=>[{path:"/",element:r(V,{to:"/home"})},...n,{path:"/home",element:r(C,{}),children:[{path:"",element:r(E,{children:r(oe,{})}),meta:{title:"首页",closable:!1}}]},{path:"*",element:r(C,{}),children:[{path:"*",element:r(E,{children:k("error",{type:404})}),meta:{title:"错误页",closable:!0}}]}],me=({children:n,url:t,id:e})=>{const{permission:o}=R(i=>({permission:i.user.permission}),T),s=o.find(i=>i.permissionId===e);return o.filter(i=>i.parentPermissionId===(s==null?void 0:s.permissionId)&&i.type==="BUTTON").findIndex(i=>i.permissionCode==="view")!==-1?n:k("error",{type:403})},Pn=(n,t)=>{switch(!!n){case!0:return t.permissionCode.replace(/^\//,"");case!1:return t.permissionCode}},vn=(n,t)=>{const e=!!n,{url:o}=t;switch(e){case!0:return t.children.length?r(Te,{}):r(E,{children:r(me,{url:o,id:t.permissionId,children:k(Q(o))})});case!1:return r(C,{})}},kn=(n,t)=>{const e=!!n,{url:o}=t;switch(e){case!0:return N(t.children,t);case!1:return t.children.length?N(t.children,t):[{path:"",element:r(E,{children:r(me,{url:o,id:t.permissionId,children:k(Q(o))})}),meta:{title:t.permissionName,closable:t.closable}}]}},N=(n,t=null)=>n.map(e=>(e.url=((t==null?void 0:t.url)||"")+e.permissionCode,{path:Pn(t,e),element:vn(t,e),children:kn(t,e),meta:{title:e.permissionName,closable:e.closable}}));function wn(){const{menu:n}=ne({filterUnShowRoute:!1}),t=N(n),e=[...bn(),...In(t)],o=(l,i=null)=>l.map(c=>{if(c.path.includes("*"))return{url:c.children[0].path,children:[],meta:c.children[0].meta||{}};const u=i?`${i.path+(c.path?"/"+c.path:"")}`:c.path,p=o(c.children||[],{...c,path:u});return{url:u,children:p,meta:c.meta||{}}}),s=l=>{const i=[];return l.forEach(c=>{c.children&&c.children.length?i.push(...s(c.children)):i.push({meta:c.meta,url:c.url,children:[]})}),i},a=s(o(e));return{routes:e,routerMetas:a}}const On=()=>{const{routes:n,routerMetas:t}=wn();return r(Je,{routerMetas:t,routes:n})},{VITE_ROUTER_BASENAME:Sn}={VITE_BASE_API_URL:"",VITE_BASE:"/beacon_console/",VITE_ROUTER_BASENAME:"/beacon_console",BASE_URL:"/beacon_console/",MODE:"gh-pages",DEV:!1,PROD:!0,SSR:!1};xe.createRoot(document.getElementById("root")).render(r(qe,{children:r(Ce,{store:Ue,children:r(Ne,{basename:Sn,children:r(Le,{value:{extendProps:{dialog:{getPopperContainer:()=>document.getElementsByClassName("cache-component")[0]}}},children:r(On,{})})})})}));export{b as a,r as j};
