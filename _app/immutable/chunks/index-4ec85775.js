function p(){}function G(t,e){for(const n in e)t[n]=e[n];return t}function J(t){return t&&typeof t=="object"&&typeof t.then=="function"}function O(t){return t()}function q(){return Object.create(null)}function g(t){t.forEach(O)}function j(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let b;function dt(t,e){return b||(b=document.createElement("a")),b.href=e,t===b.href}function K(t){return Object.keys(t).length===0}function Q(t,...e){if(t==null)return p;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t,e,n){t.$$.on_destroy.push(Q(e,n))}function ht(t,e,n,r){if(t){const c=P(t,e,n,r);return t[0](c)}}function P(t,e,n,r){return t[1]&&r?G(n.ctx.slice(),t[1](r(e))):n.ctx}function mt(t,e,n,r){if(t[2]&&r){const c=t[2](r(n));if(e.dirty===void 0)return c;if(typeof c=="object"){const o=[],u=Math.max(e.dirty.length,c.length);for(let s=0;s<u;s+=1)o[s]=e.dirty[s]|c[s];return o}return e.dirty|c}return e.dirty}function pt(t,e,n,r,c,o){if(c){const u=P(e,n,r,o);t.p(u,c)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function gt(t){return t&&j(t.destroy)?t.destroy:p}let k=!1;function R(){k=!0}function U(){k=!1}function V(t,e,n,r){for(;t<e;){const c=t+(e-t>>1);n(c)<=r?t=c+1:e=c}return t}function W(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&i.push(f)}e=i}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let c=0;for(let i=0;i<e.length;i++){const l=e[i].claim_order,f=(c>0&&e[n[c]].claim_order<=l?c+1:V(1,c,_=>e[n[_]].claim_order,l))-1;r[i]=n[f]+1;const a=f+1;n[a]=i,c=Math.max(a,c)}const o=[],u=[];let s=e.length-1;for(let i=n[c]+1;i!=0;i=r[i-1]){for(o.push(e[i-1]);s>=i;s--)u.push(e[s]);s--}for(;s>=0;s--)u.push(e[s]);o.reverse(),u.sort((i,l)=>i.claim_order-l.claim_order);for(let i=0,l=0;i<u.length;i++){for(;l<o.length&&u[i].claim_order>=o[l].claim_order;)l++;const f=l<o.length?o[l]:null;t.insertBefore(u[i],f)}}function X(t,e){if(k){for(W(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function bt(t,e,n){k&&!n?X(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Y(t){t.parentNode&&t.parentNode.removeChild(t)}function xt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Z(t){return document.createElement(t)}function tt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function $t(){return S(" ")}function wt(){return S("")}function kt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function vt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function et(t){return Array.from(t.childNodes)}function nt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function z(t,e,n,r,c=!1){nt(t);const o=(()=>{for(let u=t.claim_info.last_index;u<t.length;u++){const s=t[u];if(e(s)){const i=n(s);return i===void 0?t.splice(u,1):t[u]=i,c||(t.claim_info.last_index=u),s}}for(let u=t.claim_info.last_index-1;u>=0;u--){const s=t[u];if(e(s)){const i=n(s);return i===void 0?t.splice(u,1):t[u]=i,c?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=u,s}}return r()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function D(t,e,n,r){return z(t,c=>c.nodeName===e,c=>{const o=[];for(let u=0;u<c.attributes.length;u++){const s=c.attributes[u];n[s.name]||o.push(s.name)}o.forEach(u=>c.removeAttribute(u))},()=>r(e))}function Et(t,e,n){return D(t,e,n,Z)}function Nt(t,e,n){return D(t,e,n,tt)}function rt(t,e){return z(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>S(e),!0)}function jt(t){return rt(t," ")}function St(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function At(t,e){t.value=e??""}function Ct(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function Mt(t,e){return new t(e)}let y;function d(t){y=t}function A(){if(!y)throw new Error("Function called outside component initialization");return y}function Tt(t){A().$$.on_mount.push(t)}function qt(t){A().$$.after_update.push(t)}const m=[],B=[],$=[],L=[],F=Promise.resolve();let E=!1;function H(){E||(E=!0,F.then(C))}function Bt(){return H(),F}function N(t){$.push(t)}const v=new Set;let x=0;function C(){const t=y;do{for(;x<m.length;){const e=m[x];x++,d(e),ct(e.$$)}for(d(null),m.length=0,x=0;B.length;)B.pop()();for(let e=0;e<$.length;e+=1){const n=$[e];v.has(n)||(v.add(n),n())}$.length=0}while(m.length);for(;L.length;)L.pop()();E=!1,v.clear(),d(t)}function ct(t){if(t.fragment!==null){t.update(),g(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const w=new Set;let h;function it(){h={r:0,c:[],p:h}}function ut(){h.r||g(h.c),h=h.p}function I(t,e){t&&t.i&&(w.delete(t),t.i(e))}function lt(t,e,n,r){if(t&&t.o){if(w.has(t))return;w.add(t),h.c.push(()=>{w.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function Lt(t,e){const n=e.token={};function r(c,o,u,s){if(e.token!==n)return;e.resolved=s;let i=e.ctx;u!==void 0&&(i=i.slice(),i[u]=s);const l=c&&(e.current=c)(i);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,_)=>{_!==o&&a&&(it(),lt(a,1,1,()=>{e.blocks[_]===a&&(e.blocks[_]=null)}),ut())}):e.block.d(1),l.c(),I(l,1),l.m(e.mount(),e.anchor),f=!0),e.block=l,e.blocks&&(e.blocks[o]=l),f&&C()}if(J(t)){const c=A();if(t.then(o=>{d(c),r(e.then,1,e.value,o),d(null)},o=>{if(d(c),r(e.catch,2,e.error,o),d(null),!e.hasCatch)throw o}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function Ot(t,e,n){const r=e.slice(),{resolved:c}=t;t.current===t.then&&(r[t.value]=c),t.current===t.catch&&(r[t.error]=c),t.block.p(r,n)}function Pt(t,e){const n={},r={},c={$$scope:1};let o=t.length;for(;o--;){const u=t[o],s=e[o];if(s){for(const i in u)i in s||(r[i]=1);for(const i in s)c[i]||(n[i]=s[i],c[i]=1);t[o]=s}else for(const i in u)c[i]=1}for(const u in r)u in n||(n[u]=void 0);return n}function zt(t){return typeof t=="object"&&t!==null?t:{}}function Dt(t){t&&t.c()}function Ft(t,e){t&&t.l(e)}function st(t,e,n,r){const{fragment:c,after_update:o}=t.$$;c&&c.m(e,n),r||N(()=>{const u=t.$$.on_mount.map(O).filter(j);t.$$.on_destroy?t.$$.on_destroy.push(...u):g(u),t.$$.on_mount=[]}),o.forEach(N)}function ot(t,e){const n=t.$$;n.fragment!==null&&(g(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e){t.$$.dirty[0]===-1&&(m.push(t),H(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ht(t,e,n,r,c,o,u,s=[-1]){const i=y;d(t);const l=t.$$={fragment:null,ctx:[],props:o,update:p,not_equal:c,bound:q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:q(),dirty:s,skip_bound:!1,root:e.target||i.$$.root};u&&u(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(a,_,...M)=>{const T=M.length?M[0]:_;return l.ctx&&c(l.ctx[a],l.ctx[a]=T)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](T),f&&at(t,a)),_}):[],l.update(),f=!0,g(l.before_update),l.fragment=r?r(l.ctx):!1,e.target){if(e.hydrate){R();const a=et(e.target);l.fragment&&l.fragment.l(a),a.forEach(Y)}else l.fragment&&l.fragment.c();e.intro&&I(t.$$.fragment),st(t,e.target,e.anchor,e.customElement),U(),C()}d(i)}class It{$destroy(){ot(this,1),this.$destroy=p}$on(e,n){if(!j(n))return p;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const c=r.indexOf(n);c!==-1&&r.splice(c,1)}}$set(e){this.$$set&&!K(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Bt as A,p as B,X as C,At as D,kt as E,g as F,xt as G,ht as H,gt as I,pt as J,yt as K,mt as L,_t as M,tt as N,Nt as O,dt as P,G as Q,Pt as R,It as S,zt as T,Lt as U,Ot as V,$t as a,bt as b,jt as c,ut as d,wt as e,I as f,it as g,Y as h,Ht as i,qt as j,Z as k,Et as l,et as m,vt as n,Tt as o,Ct as p,S as q,rt as r,ft as s,lt as t,St as u,Mt as v,Dt as w,Ft as x,st as y,ot as z};