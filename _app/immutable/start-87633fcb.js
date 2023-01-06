import{S as nt,i as at,s as rt,a as ot,e as B,c as st,b as M,g as fe,t as V,d as ue,f as F,h as G,j as it,o as Re,k as lt,l as ct,m as ft,n as we,p as C,q as ut,r as dt,u as ht,v as H,w as Ae,x as W,y as Y,z as ie}from"./chunks/index-5e89f3b4.js";import{S as et,I as q,g as Ke,f as Me,a as be,b as le,s as K,i as ze,c as ce,P as He,d as pt,e as mt,h as _t}from"./chunks/singletons-191605f8.js";function gt(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function yt(a){return a.split("%25").map(decodeURI).join("%25")}function wt(a){for(const e in a)a[e]=decodeURIComponent(a[e]);return a}const bt=["href","pathname","search","searchParams","toString","toJSON"];function vt(a,e){const n=new URL(a);for(const i of bt){let s=n[i];Object.defineProperty(n,i,{get(){return e(),s},enumerable:!0,configurable:!0})}return kt(n),n}function kt(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Et="/__data.json";function St(a){return a.replace(/\/$/,"")+Et}function Rt(a){let e=5381;if(typeof a=="string"){let n=a.length;for(;n;)e=e*33^a.charCodeAt(--n)}else if(ArrayBuffer.isView(a)){const n=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);let i=n.length;for(;i;)e=e*33^n[--i]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const de=window.fetch;window.fetch=(a,e)=>((a instanceof Request?a.method:(e==null?void 0:e.method)||"GET")!=="GET"&&x.delete(Pe(a)),de(a,e));const x=new Map;function Lt(a,e){const n=Pe(a,e),i=document.querySelector(n);if(i!=null&&i.textContent){const{body:s,...u}=JSON.parse(i.textContent),t=i.getAttribute("data-ttl");return t&&x.set(n,{body:s,init:u,ttl:1e3*Number(t)}),Promise.resolve(new Response(s,u))}return de(a,e)}function Ot(a,e,n){if(x.size>0){const i=Pe(a,n),s=x.get(i);if(s){if(performance.now()<s.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(s.body,s.init);x.delete(i)}}return de(e,n)}function Pe(a,e){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(a instanceof Request?a.url:a)}]`;return e!=null&&e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(i+=`[data-hash="${Rt(e.body)}"]`),i}const It=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function At(a){const e=[];return{pattern:a==="/"?/^\/$/:new RegExp(`^${Nt(a).map(i=>{const s=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(i);if(s)return e.push({name:s[1],matcher:s[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const u=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(i);if(u)return e.push({name:u[1],matcher:u[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!i)return;const t=i.split(/\[(.+?)\](?!\])/);return"/"+t.map((_,d)=>{if(d%2){if(_.startsWith("x+"))return ve(String.fromCharCode(parseInt(_.slice(2),16)));if(_.startsWith("u+"))return ve(String.fromCharCode(..._.slice(2).split("-").map(P=>parseInt(P,16))));const g=It.exec(_);if(!g)throw new Error(`Invalid param: ${_}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,w,S,j,T]=g;return e.push({name:j,matcher:T,optional:!!w,rest:!!S,chained:S?d===1&&t[0]==="":!1}),S?"(.*?)":w?"([^/]*)?":"([^/]+?)"}return ve(_)}).join("")}).join("")}/?$`),params:e}}function Pt(a){return!/^\([^)]+\)$/.test(a)}function Nt(a){return a.slice(1).split("/").filter(Pt)}function Ut(a,e,n){const i={},s=a.slice(1);let u="";for(let t=0;t<e.length;t+=1){const f=e[t];let _=s[t];if(f.chained&&f.rest&&u&&(_=_?u+"/"+_:u),u="",_===void 0)f.rest&&(i[f.name]="");else{if(f.matcher&&!n[f.matcher](_)){if(f.optional&&f.chained){let d=s.indexOf(void 0,t);if(d===-1){const g=e[t+1];if(g!=null&&g.rest&&g.chained)u=_;else return}for(;d>=t;)s[d]=s[d-1],d-=1;continue}return}i[f.name]=_}}if(!u)return i}function ve(a){return a.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function $t(a,e,n,i){const s=new Set(e);return Object.entries(n).map(([f,[_,d,g]])=>{const{pattern:w,params:S}=At(f),j={id:f,exec:T=>{const P=w.exec(T);if(P)return Ut(P,S,i)},errors:[1,...g||[]].map(T=>a[T]),layouts:[0,...d||[]].map(t),leaf:u(_)};return j.errors.length=j.layouts.length=Math.max(j.errors.length,j.layouts.length),j});function u(f){const _=f<0;return _&&(f=~f),[_,a[f]]}function t(f){return f===void 0?f:[s.has(f),a[f]]}}function jt(a){let e,n,i;var s=a[0][0];function u(t){return{props:{data:t[2],form:t[1]}}}return s&&(e=new s(u(a))),{c(){e&&H(e.$$.fragment),n=B()},l(t){e&&Ae(e.$$.fragment,t),n=B()},m(t,f){e&&W(e,t,f),M(t,n,f),i=!0},p(t,f){const _={};if(f&4&&(_.data=t[2]),f&2&&(_.form=t[1]),s!==(s=t[0][0])){if(e){fe();const d=e;V(d.$$.fragment,1,0,()=>{Y(d,1)}),ue()}s?(e=new s(u(t)),H(e.$$.fragment),F(e.$$.fragment,1),W(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&F(e.$$.fragment,t),i=!0)},o(t){e&&V(e.$$.fragment,t),i=!1},d(t){t&&G(n),e&&Y(e,t)}}}function Tt(a){let e,n,i;var s=a[0][0];function u(t){return{props:{data:t[2],$$slots:{default:[Dt]},$$scope:{ctx:t}}}}return s&&(e=new s(u(a))),{c(){e&&H(e.$$.fragment),n=B()},l(t){e&&Ae(e.$$.fragment,t),n=B()},m(t,f){e&&W(e,t,f),M(t,n,f),i=!0},p(t,f){const _={};if(f&4&&(_.data=t[2]),f&523&&(_.$$scope={dirty:f,ctx:t}),s!==(s=t[0][0])){if(e){fe();const d=e;V(d.$$.fragment,1,0,()=>{Y(d,1)}),ue()}s?(e=new s(u(t)),H(e.$$.fragment),F(e.$$.fragment,1),W(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&F(e.$$.fragment,t),i=!0)},o(t){e&&V(e.$$.fragment,t),i=!1},d(t){t&&G(n),e&&Y(e,t)}}}function Dt(a){let e,n,i;var s=a[0][1];function u(t){return{props:{data:t[3],form:t[1]}}}return s&&(e=new s(u(a))),{c(){e&&H(e.$$.fragment),n=B()},l(t){e&&Ae(e.$$.fragment,t),n=B()},m(t,f){e&&W(e,t,f),M(t,n,f),i=!0},p(t,f){const _={};if(f&8&&(_.data=t[3]),f&2&&(_.form=t[1]),s!==(s=t[0][1])){if(e){fe();const d=e;V(d.$$.fragment,1,0,()=>{Y(d,1)}),ue()}s?(e=new s(u(t)),H(e.$$.fragment),F(e.$$.fragment,1),W(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&F(e.$$.fragment,t),i=!0)},o(t){e&&V(e.$$.fragment,t),i=!1},d(t){t&&G(n),e&&Y(e,t)}}}function We(a){let e,n=a[5]&&Ye(a);return{c(){e=lt("div"),n&&n.c(),this.h()},l(i){e=ct(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var s=ft(e);n&&n.l(s),s.forEach(G),this.h()},h(){we(e,"id","svelte-announcer"),we(e,"aria-live","assertive"),we(e,"aria-atomic","true"),C(e,"position","absolute"),C(e,"left","0"),C(e,"top","0"),C(e,"clip","rect(0 0 0 0)"),C(e,"clip-path","inset(50%)"),C(e,"overflow","hidden"),C(e,"white-space","nowrap"),C(e,"width","1px"),C(e,"height","1px")},m(i,s){M(i,e,s),n&&n.m(e,null)},p(i,s){i[5]?n?n.p(i,s):(n=Ye(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&G(e),n&&n.d()}}}function Ye(a){let e;return{c(){e=ut(a[6])},l(n){e=dt(n,a[6])},m(n,i){M(n,e,i)},p(n,i){i&64&&ht(e,n[6])},d(n){n&&G(e)}}}function Ct(a){let e,n,i,s,u;const t=[Tt,jt],f=[];function _(g,w){return g[0][1]?0:1}e=_(a),n=f[e]=t[e](a);let d=a[4]&&We(a);return{c(){n.c(),i=ot(),d&&d.c(),s=B()},l(g){n.l(g),i=st(g),d&&d.l(g),s=B()},m(g,w){f[e].m(g,w),M(g,i,w),d&&d.m(g,w),M(g,s,w),u=!0},p(g,[w]){let S=e;e=_(g),e===S?f[e].p(g,w):(fe(),V(f[S],1,1,()=>{f[S]=null}),ue(),n=f[e],n?n.p(g,w):(n=f[e]=t[e](g),n.c()),F(n,1),n.m(i.parentNode,i)),g[4]?d?d.p(g,w):(d=We(g),d.c(),d.m(s.parentNode,s)):d&&(d.d(1),d=null)},i(g){u||(F(n),u=!0)},o(g){V(n),u=!1},d(g){f[e].d(g),g&&G(i),d&&d.d(g),g&&G(s)}}}function qt(a,e,n){let{stores:i}=e,{page:s}=e,{components:u}=e,{form:t}=e,{data_0:f=null}=e,{data_1:_=null}=e;it(i.page.notify);let d=!1,g=!1,w=null;return Re(()=>{const S=i.page.subscribe(()=>{d&&(n(5,g=!0),n(6,w=document.title||"untitled page"))});return n(4,d=!0),S}),a.$$set=S=>{"stores"in S&&n(7,i=S.stores),"page"in S&&n(8,s=S.page),"components"in S&&n(0,u=S.components),"form"in S&&n(1,t=S.form),"data_0"in S&&n(2,f=S.data_0),"data_1"in S&&n(3,_=S.data_1)},a.$$.update=()=>{a.$$.dirty&384&&i.page.set(s)},[u,t,f,_,d,g,w,i,s]}class Bt extends nt{constructor(e){super(),at(this,e,qt,Ct,rt,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Vt="modulepreload",Ft=function(a,e){return new URL(a,e).href},Xe={},Ze=function(e,n,i){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(u=>{if(u=Ft(u,i),u in Xe)return;Xe[u]=!0;const t=u.endsWith(".css"),f=t?'[rel="stylesheet"]':"";if(!!i)for(let g=s.length-1;g>=0;g--){const w=s[g];if(w.href===u&&(!t||w.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const d=document.createElement("link");if(d.rel=t?"stylesheet":Vt,t||(d.as="script",d.crossOrigin=""),d.href=u,document.head.appendChild(d),t)return new Promise((g,w)=>{d.addEventListener("load",g),d.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})})).then(()=>e())},Gt={},he=[()=>Ze(()=>import("./chunks/0-bc3bb11f.js"),["./chunks\\0-bc3bb11f.js","./components\\layout.svelte-d72cce68.js","./chunks\\index-5e89f3b4.js"],import.meta.url),()=>Ze(()=>import("./chunks/1-d37405ea.js"),["./chunks\\1-d37405ea.js","./components\\error.svelte-b8e37c9f.js","./chunks\\index-5e89f3b4.js","./chunks\\singletons-191605f8.js"],import.meta.url)],Jt=[],Kt={},Mt={handleError:({error:a})=>{console.error(a)}};class Le{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Qe{constructor(e,n){this.status=e,this.location=n}}async function zt(a){var e;for(const n in a)if(typeof((e=a[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(a).map(async([i,s])=>[i,await s])));return a}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Ht=-1,Wt=-2,Yt=-3,Xt=-4,Zt=-5,Qt=-6;function xt(a){if(typeof a=="number")return i(a,!0);if(!Array.isArray(a)||a.length===0)throw new Error("Invalid input");const e=a,n=Array(e.length);function i(s,u=!1){if(s===Ht)return;if(s===Yt)return NaN;if(s===Xt)return 1/0;if(s===Zt)return-1/0;if(s===Qt)return-0;if(u)throw new Error("Invalid input");if(s in n)return n[s];const t=e[s];if(!t||typeof t!="object")n[s]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":n[s]=new Date(t[1]);break;case"Set":const _=new Set;n[s]=_;for(let w=1;w<t.length;w+=1)_.add(i(t[w]));break;case"Map":const d=new Map;n[s]=d;for(let w=1;w<t.length;w+=2)d.set(i(t[w]),i(t[w+1]));break;case"RegExp":n[s]=new RegExp(t[1],t[2]);break;case"Object":n[s]=Object(t[1]);break;case"BigInt":n[s]=BigInt(t[1]);break;case"null":const g=Object.create(null);n[s]=g;for(let w=1;w<t.length;w+=2)g[t[w]]=i(t[w+1]);break}else{const f=new Array(t.length);n[s]=f;for(let _=0;_<t.length;_+=1){const d=t[_];d!==Wt&&(f[_]=i(d))}}else{const f={};n[s]=f;for(const _ in t){const d=t[_];f[_]=i(d)}}return n[s]}return i(0)}const ke=$t(he,Jt,Kt,Gt),Oe=he[0],Ie=he[1];Oe();Ie();let ee={};try{ee=JSON.parse(sessionStorage[et])}catch{}function Ee(a){ee[a]=ce()}function en({target:a,base:e}){var Fe;const n=document.documentElement,i=[];let s=null;const u={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},f=!1,_=!1,d=!0,g=!1,w=!1,S=!1,j=!1,T,P=(Fe=history.state)==null?void 0:Fe[q];P||(P=Date.now(),history.replaceState({...history.state,[q]:P},"",location.href));const pe=ee[P];pe&&(history.scrollRestoration="manual",scrollTo(pe.x,pe.y));let J,Ne,te;async function Ue(){te=te||Promise.resolve(),await te,te=null;const r=new URL(location.href),o=re(r,!0);s=null,await je(o,r,[])}async function me(r,{noScroll:o=!1,replaceState:c=!1,keepFocus:l=!1,state:h={},invalidateAll:p=!1},m,v){return typeof r=="string"&&(r=new URL(r,Ke(document))),oe({url:r,scroll:o?ce():null,keepfocus:l,redirect_chain:m,details:{state:h,replaceState:c},nav_token:v,accepted:()=>{p&&(j=!0)},blocked:()=>{},type:"goto"})}async function $e(r){const o=re(r,!1);if(!o)throw new Error(`Attempted to preload a URL that does not belong to this app: ${r}`);return s={id:o.id,promise:Ce(o).then(c=>(c.type==="loaded"&&c.state.error&&(s=null),c))},s.promise}async function ne(...r){const c=ke.filter(l=>r.some(h=>l.exec(h))).map(l=>Promise.all([...l.layouts,l.leaf].map(h=>h==null?void 0:h[1]())));await Promise.all(c)}async function je(r,o,c,l,h={},p){var v,b;Ne=h;let m=r&&await Ce(r);if(m||(m=await Ve(o,{id:null},await Q(new Error(`Not found: ${o.pathname}`),{url:o,params:{},route:{id:null}}),404)),o=(r==null?void 0:r.url)||o,Ne!==h)return!1;if(m.type==="redirect")if(c.length>10||c.includes(o.pathname))m=await ae({status:500,error:await Q(new Error("Redirect loop"),{url:o,params:{},route:{id:null}}),url:o,route:{id:null}});else return me(new URL(m.location,o).href,{},[...c,o.pathname],h),!1;else((b=(v=m.props)==null?void 0:v.page)==null?void 0:b.status)>=400&&await K.updated.check()&&await se(o);if(i.length=0,j=!1,g=!0,l&&l.details){const{details:y}=l,R=y.replaceState?0:1;y.state[q]=P+=R,history[y.replaceState?"replaceState":"pushState"](y.state,"",o)}if(s=null,_?(t=m.state,m.props.page&&(m.props.page.url=o),T.$set(m.props)):Te(m),l){const{scroll:y,keepfocus:R}=l;if(R||Se(),await ie(),d){const L=o.hash&&document.getElementById(o.hash.slice(1));y?scrollTo(y.x,y.y):L?L.scrollIntoView():scrollTo(0,0)}}else await ie();d=!0,m.props.page&&(J=m.props.page),p&&p(),g=!1}function Te(r){var l;t=r.state;const o=document.querySelector("style[data-sveltekit]");o&&o.remove(),J=r.props.page,T=new Bt({target:a,props:{...r.props,stores:K},hydrate:!0});const c={from:null,to:{params:t.params,route:{id:((l=t.route)==null?void 0:l.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};u.after_navigate.forEach(h=>h(c)),_=!0}async function X({url:r,params:o,branch:c,status:l,error:h,route:p,form:m}){const v=c.filter(Boolean);let b="never";for(const O of c)(O==null?void 0:O.slash)!==void 0&&(b=O.slash);r.pathname=gt(r.pathname,b),r.search=r.search;const y={type:"loaded",state:{url:r,params:o,branch:c,error:h,route:p},props:{components:v.map(O=>O.node.component)}};m!==void 0&&(y.props.form=m);let R={},L=!J;for(let O=0;O<v.length;O+=1){const k=v[O];R={...R,...k.data},(L||!t.branch.some(U=>U===k))&&(y.props[`data_${O}`]=R,L=L||Object.keys(k.data??{}).length>0)}return L||(L=Object.keys(J.data).length!==Object.keys(R).length),(!t.url||r.href!==t.url.href||t.error!==h||m!==void 0||L)&&(y.props.page={error:h,params:o,route:p,status:l,url:new URL(r),form:m??null,data:L?R:J.data}),y}async function _e({loader:r,parent:o,url:c,params:l,route:h,server_data_node:p}){var y,R,L;let m=null;const v={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},b=await r();if((y=b.universal)!=null&&y.load){let D=function(...k){for(const U of k){const{href:$}=new URL(U,c);v.dependencies.add($)}};const O={route:{get id(){return v.route=!0,h.id}},params:new Proxy(l,{get:(k,U)=>(v.params.add(U),k[U])}),data:(p==null?void 0:p.data)??null,url:vt(c,()=>{v.url=!0}),async fetch(k,U){let $;k instanceof Request?($=k.url,U={body:k.method==="GET"||k.method==="HEAD"?void 0:await k.blob(),cache:k.cache,credentials:k.credentials,headers:k.headers,integrity:k.integrity,keepalive:k.keepalive,method:k.method,mode:k.mode,redirect:k.redirect,referrer:k.referrer,referrerPolicy:k.referrerPolicy,signal:k.signal,...U}):$=k;const E=new URL($,c).href;return D(E),_?Ot($,E,U):Lt($,U)},setHeaders:()=>{},depends:D,parent(){return v.parent=!0,o()}};m=await b.universal.load.call(null,O)??null,m=m?await zt(m):null}return{node:b,loader:r,server:p,universal:(R=b.universal)!=null&&R.load?{type:"data",data:m,uses:v}:null,data:m??(p==null?void 0:p.data)??null,slash:((L=b.universal)==null?void 0:L.trailingSlash)??(p==null?void 0:p.slash)}}function De(r,o,c,l,h){if(j)return!0;if(!l)return!1;if(l.parent&&r||l.route&&o||l.url&&c)return!0;for(const p of l.params)if(h[p]!==t.params[p])return!0;for(const p of l.dependencies)if(i.some(m=>m(new URL(p))))return!0;return!1}function ge(r,o){return(r==null?void 0:r.type)==="data"?{type:"data",data:r.data,uses:{dependencies:new Set(r.uses.dependencies??[]),params:new Set(r.uses.params??[]),parent:!!r.uses.parent,route:!!r.uses.route,url:!!r.uses.url},slash:r.slash}:(r==null?void 0:r.type)==="skip"?o??null:null}async function Ce({id:r,invalidating:o,url:c,params:l,route:h}){if((s==null?void 0:s.id)===r)return s.promise;const{errors:p,layouts:m,leaf:v}=h,b=[...m,v];p.forEach(E=>E==null?void 0:E().catch(()=>{})),b.forEach(E=>E==null?void 0:E[1]().catch(()=>{}));let y=null;const R=t.url?r!==t.url.pathname+t.url.search:!1,L=t.route?r!==t.route.id:!1,D=b.reduce((E,A,N)=>{var Z;const I=t.branch[N],z=!!(A!=null&&A[0])&&((I==null?void 0:I.loader)!==A[1]||De(E.some(Boolean),L,R,(Z=I.server)==null?void 0:Z.uses,l));return E.push(z),E},[]);if(D.some(Boolean)){try{y=await xe(c,D)}catch(E){return ae({status:500,error:await Q(E,{url:c,params:l,route:{id:h.id}}),url:c,route:h})}if(y.type==="redirect")return y}const O=y==null?void 0:y.nodes;let k=!1;const U=b.map(async(E,A)=>{var Z;if(!E)return;const N=t.branch[A],I=O==null?void 0:O[A];if((!I||I.type==="skip")&&E[1]===(N==null?void 0:N.loader)&&!De(k,L,R,(Z=N.universal)==null?void 0:Z.uses,l))return N;if(k=!0,(I==null?void 0:I.type)==="error")throw I;return _e({loader:E[1],url:c,params:l,route:h,parent:async()=>{var Je;const Ge={};for(let ye=0;ye<A;ye+=1)Object.assign(Ge,(Je=await U[ye])==null?void 0:Je.data);return Ge},server_data_node:ge(I===void 0&&E[0]?{type:"skip"}:I??null,N==null?void 0:N.server)})});for(const E of U)E.catch(()=>{});const $=[];for(let E=0;E<b.length;E+=1)if(b[E])try{$.push(await U[E])}catch(A){if(A instanceof Qe)return{type:"redirect",location:A.location};let N=500,I;O!=null&&O.includes(A)?(N=A.status??N,I=A.error):A instanceof Le?(N=A.status,I=A.body):I=await Q(A,{params:l,url:c,route:{id:h.id}});const z=await qe(E,$,p);return z?await X({url:c,params:l,branch:$.slice(0,z.idx).concat(z.node),status:N,error:I,route:h}):await Ve(c,{id:h.id},I,N)}else $.push(void 0);return await X({url:c,params:l,branch:$,status:200,error:null,route:h,form:o?void 0:null})}async function qe(r,o,c){for(;r--;)if(c[r]){let l=r;for(;!o[l];)l-=1;try{return{idx:l+1,node:{node:await c[r](),loader:c[r],data:{},server:null,universal:null}}}catch{continue}}}async function ae({status:r,error:o,url:c,route:l}){const h={},p=await Oe();let m=null;if(p.server)try{const y=await xe(c,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;m=y.nodes[0]??null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||f)&&await se(c)}const v=await _e({loader:Oe,url:c,params:h,route:l,parent:()=>Promise.resolve({}),server_data_node:ge(m)}),b={node:await Ie(),loader:Ie,universal:null,server:null,data:null};return await X({url:c,params:h,branch:[v,b],status:r,error:o,route:null})}function re(r,o){if(ze(r,e))return;const c=yt(r.pathname.slice(e.length)||"/");for(const l of ke){const h=l.exec(c);if(h)return{id:r.pathname+r.search,invalidating:o,route:l,params:wt(h),url:r}}}function Be({url:r,type:o,intent:c,delta:l}){var v,b;let h=!1;const p={from:{params:t.params,route:{id:((v=t.route)==null?void 0:v.id)??null},url:t.url},to:{params:(c==null?void 0:c.params)??null,route:{id:((b=c==null?void 0:c.route)==null?void 0:b.id)??null},url:r},willUnload:!c,type:o};l!==void 0&&(p.delta=l);const m={...p,cancel:()=>{h=!0}};return w||u.before_navigate.forEach(y=>y(m)),h?null:p}async function oe({url:r,scroll:o,keepfocus:c,redirect_chain:l,details:h,type:p,delta:m,nav_token:v,accepted:b,blocked:y}){const R=re(r,!1),L=Be({url:r,type:p,delta:m,intent:R});if(!L){y();return}Ee(P),b(),w=!0,_&&K.navigating.set(L),await je(R,r,l,{scroll:o,keepfocus:c,details:h},v,()=>{w=!1,u.after_navigate.forEach(D=>D(L)),K.navigating.set(null)})}async function Ve(r,o,c,l){return r.origin===location.origin&&r.pathname===location.pathname&&!f?await ae({status:l,error:c,url:r,route:o}):await se(r)}function se(r){return location.href=r.href,new Promise(()=>{})}function tt(){let r;n.addEventListener("mousemove",p=>{const m=p.target;clearTimeout(r),r=setTimeout(()=>{l(m,2)},20)});function o(p){l(p.composedPath()[0],1)}n.addEventListener("mousedown",o),n.addEventListener("touchstart",o,{passive:!0});const c=new IntersectionObserver(p=>{for(const m of p)m.isIntersecting&&(ne(new URL(m.target.href).pathname),c.unobserve(m.target))},{threshold:0});function l(p,m){const v=Me(p,n);if(!v)return;const{url:b,external:y}=be(v,e);if(y)return;const R=le(v);R.reload||(m<=R.preload_data?$e(b):m<=R.preload_code&&ne(b.pathname))}function h(){c.disconnect();for(const p of n.querySelectorAll("a")){const{url:m,external:v}=be(p,e);if(v)continue;const b=le(p);b.reload||(b.preload_code===He.viewport&&c.observe(p),b.preload_code===He.eager&&ne(m.pathname))}}u.after_navigate.push(h),h()}return{after_navigate:r=>{Re(()=>(u.after_navigate.push(r),()=>{const o=u.after_navigate.indexOf(r);u.after_navigate.splice(o,1)}))},before_navigate:r=>{Re(()=>(u.before_navigate.push(r),()=>{const o=u.before_navigate.indexOf(r);u.before_navigate.splice(o,1)}))},disable_scroll_handling:()=>{(g||!_)&&(d=!1)},goto:(r,o={})=>me(r,o,[]),invalidate:r=>{if(typeof r=="function")i.push(r);else{const{href:o}=new URL(r,location.href);i.push(c=>c.href===o)}return Ue()},invalidateAll:()=>(j=!0,Ue()),preload_data:async r=>{const o=new URL(r,Ke(document));await $e(o)},preload_code:ne,apply_action:async r=>{if(r.type==="error"){const o=new URL(location.href),{branch:c,route:l}=t;if(!l)return;const h=await qe(t.branch.length,c,l.errors);if(h){const p=await X({url:o,params:t.params,branch:c.slice(0,h.idx).concat(h.node),status:r.status??500,error:r.error,route:l});t=p.state,T.$set(p.props),ie().then(Se)}}else if(r.type==="redirect")me(r.location,{invalidateAll:!0},[]);else{const o={form:r.data,page:{...J,form:r.data,status:r.status}};T.$set(o),r.type==="success"&&ie().then(Se)}},_start_router:()=>{var r;history.scrollRestoration="manual",addEventListener("beforeunload",o=>{var l;let c=!1;if(!w){const h={from:{params:t.params,route:{id:((l=t.route)==null?void 0:l.id)??null},url:t.url},to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};u.before_navigate.forEach(p=>p(h))}c?(o.preventDefault(),o.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Ee(P);try{sessionStorage[et]=JSON.stringify(ee)}catch{}}}),(r=navigator.connection)!=null&&r.saveData||tt(),n.addEventListener("click",o=>{if(o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const c=Me(o.composedPath()[0],n);if(!c)return;const{url:l,external:h,has:p}=be(c,e),m=le(c);if(!l||!(c instanceof SVGAElement)&&l.protocol!==location.protocol&&!(l.protocol==="https:"||l.protocol==="http:")||p.download)return;if(h||m.reload){Be({url:l,type:"link"})||o.preventDefault(),w=!0;return}const[b,y]=l.href.split("#");if(y!==void 0&&b===location.href.split("#")[0]){S=!0,Ee(P),t.url=l,K.page.set({...J,url:l}),K.page.notify();return}oe({url:l,scroll:m.noscroll?ce():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:l.href===location.href},accepted:()=>o.preventDefault(),blocked:()=>o.preventDefault(),type:"link"})}),n.addEventListener("submit",o=>{var b;if(o.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(o.target),l=o.submitter;if(((l==null?void 0:l.formMethod)||c.method)!=="get")return;const p=new URL(((b=o.submitter)==null?void 0:b.hasAttribute("formaction"))&&(l==null?void 0:l.formAction)||c.action);if(ze(p,e))return;const{noscroll:m,reload:v}=le(o.target);v||(o.preventDefault(),o.stopPropagation(),p.search=new URLSearchParams(new FormData(o.target)).toString(),oe({url:p,scroll:m?ce():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"}))}),addEventListener("popstate",o=>{var c;if((c=o.state)!=null&&c[q]){if(o.state[q]===P)return;const l=o.state[q]-P;oe({url:new URL(location.href),scroll:ee[o.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{P=o.state[q]},blocked:()=>{history.go(-l)},type:"popstate",delta:l})}}),addEventListener("hashchange",()=>{S&&(S=!1,history.replaceState({...history.state,[q]:++P},"",location.href))});for(const o of document.querySelectorAll("link"))o.rel==="icon"&&(o.href=o.href);addEventListener("pageshow",o=>{o.persisted&&K.navigating.set(null)})},_hydrate:async({status:r=200,error:o,node_ids:c,params:l,route:h,data:p,form:m})=>{f=!0;const v=new URL(location.href);({params:l={},route:h={id:null}}=re(v,!1)||{});let b;try{const y=c.map(async(R,L)=>{const D=p[L];return _e({loader:he[R],url:v,params:l,route:h,parent:async()=>{const O={};for(let k=0;k<L;k+=1)Object.assign(O,(await y[k]).data);return O},server_data_node:ge(D)})});b=await X({url:v,params:l,branch:await Promise.all(y),status:r,error:o,form:m,route:ke.find(({id:R})=>R===h.id)??null})}catch(y){if(y instanceof Qe){await se(new URL(y.location,location.href));return}b=await ae({status:y instanceof Le?y.status:500,error:await Q(y,{url:v,params:l,route:h}),url:v,route:h})}Te(b)}}}async function xe(a,e){var u;const n=new URL(a);n.pathname=St(a.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const i=await de(n.href),s=await i.json();if(!i.ok)throw new Error(s);return(u=s.nodes)==null||u.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=xt(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),s}function Q(a,e){return a instanceof Le?a.body:Mt.handleError({error:a,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Se(){const a=document.querySelector("[autofocus]");if(a)a.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var i;(i=getSelection())==null||i.removeAllRanges()}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex")}}async function an({env:a,hydrate:e,paths:n,target:i,version:s}){pt(n),_t(s);const u=en({target:i,base:n.base});mt({client:u}),e?await u._hydrate(e):u.goto(location.href,{replaceState:!0}),u._start_router()}export{an as start};