import{Ca as _,Fa as D,Ka as I,aa as a,ab as g,ba as S,da as h,fa as d,ga as l,gb as p,la as b,ma as v}from"./chunk-ADXWCN4S.js";var T=null;function m(){return T}function je(i){T??=i}var M=class{};var y=new h(""),w=(()=>{let t=class t{historyGo(e){throw new Error("")}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:()=>l(N),providedIn:"platform"});let i=t;return i})(),Ge=new h(""),N=(()=>{let t=class t extends w{constructor(){super(),this._doc=l(y),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return m().getBaseHref(this._doc)}onPopState(e){let n=m().getGlobalEventTarget(this._doc,"window");return n.addEventListener("popstate",e,!1),()=>n.removeEventListener("popstate",e)}onHashChange(e){let n=m().getGlobalEventTarget(this._doc,"window");return n.addEventListener("hashchange",e,!1),()=>n.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,n,r){this._history.pushState(e,n,r)}replaceState(e,n,r){this._history.replaceState(e,n,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:()=>new t,providedIn:"platform"});let i=t;return i})();function A(i,t){if(i.length==0)return t;if(t.length==0)return i;let s=0;return i.endsWith("/")&&s++,t.startsWith("/")&&s++,s==2?i+t.substring(1):s==1?i+t:i+"/"+t}function B(i){let t=i.match(/#|\?|$/),s=t&&t.index||i.length,e=s-(i[s-1]==="/"?1:0);return i.slice(0,e)+i.slice(s)}function c(i){return i&&i[0]!=="?"?"?"+i:i}var f=(()=>{let t=class t{historyGo(e){throw new Error("")}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:()=>l($),providedIn:"root"});let i=t;return i})(),P=new h(""),$=(()=>{let t=class t extends f{constructor(e,n){super(),this._platformLocation=e,this._removeListenerFns=[],this._baseHref=n??this._platformLocation.getBaseHrefFromDOM()??l(y).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return A(this._baseHref,e)}path(e=!1){let n=this._platformLocation.pathname+c(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${n}${r}`:n}pushState(e,n,r,u){let o=this.prepareExternalUrl(r+c(u));this._platformLocation.pushState(e,n,o)}replaceState(e,n,r,u){let o=this.prepareExternalUrl(r+c(u));this._platformLocation.replaceState(e,n,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}};t.\u0275fac=function(n){return new(n||t)(d(w),d(P,8))},t.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})(),He=(()=>{let t=class t extends f{constructor(e,n){super(),this._platformLocation=e,this._baseHref="",this._removeListenerFns=[],n!=null&&(this._baseHref=n)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let n=this._platformLocation.hash??"#";return n.length>0?n.substring(1):n}prepareExternalUrl(e){let n=A(this._baseHref,e);return n.length>0?"#"+n:n}pushState(e,n,r,u){let o=this.prepareExternalUrl(r+c(u));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.pushState(e,n,o)}replaceState(e,n,r,u){let o=this.prepareExternalUrl(r+c(u));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.replaceState(e,n,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}};t.\u0275fac=function(n){return new(n||t)(d(w),d(P,8))},t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),x=(()=>{let t=class t{constructor(e){this._subject=new _,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=e;let n=this._locationStrategy.getBaseHref();this._basePath=V(B(L(n))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,n=""){return this.path()==this.normalize(e+c(n))}normalize(e){return t.stripTrailingSlash(z(this._basePath,L(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,n="",r=null){this._locationStrategy.pushState(r,"",e,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+c(n)),r)}replaceState(e,n="",r=null){this._locationStrategy.replaceState(r,"",e,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+c(n)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(n=>{this._notifyUrlChangeListeners(n.url,n.state)}),()=>{let n=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(n,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",n){this._urlChangeListeners.forEach(r=>r(e,n))}subscribe(e,n,r){return this._subject.subscribe({next:e,error:n,complete:r})}};t.normalizeQueryParams=c,t.joinWithSlash=A,t.stripTrailingSlash=B,t.\u0275fac=function(n){return new(n||t)(d(f))},t.\u0275prov=a({token:t,factory:()=>U(),providedIn:"root"});let i=t;return i})();function U(){return new x(d(f))}function z(i,t){if(!i||!t.startsWith(i))return t;let s=t.substring(i.length);return s===""||["/",";","?","#"].includes(s[0])?s:t}function L(i){return i.replace(/\/index.html$/,"")}function V(i){if(new RegExp("^(https?:)?//").test(i)){let[,s]=i.split(/\/\/[^\/]+/);return s}return i}function Ye(i,t){t=encodeURIComponent(t);for(let s of i.split(";")){let e=s.indexOf("="),[n,r]=e==-1?[s,""]:[s.slice(0,e),s.slice(e+1)];if(n.trim()===t)return decodeURIComponent(r)}return null}var C=/\s+/,R=[],Ze=(()=>{let t=class t{constructor(e,n){this._ngEl=e,this._renderer=n,this.initialClasses=R,this.stateMap=new Map}set klass(e){this.initialClasses=e!=null?e.trim().split(C):R}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(C):e}ngDoCheck(){for(let n of this.initialClasses)this._updateState(n,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let n of e)this._updateState(n,!0);else if(e!=null)for(let n of Object.keys(e))this._updateState(n,!!e[n]);this._applyStateDiff()}_updateState(e,n){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==n&&(r.changed=!0,r.enabled=n),r.touched=!0):this.stateMap.set(e,{enabled:n,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let n=e[0],r=e[1];r.changed?(this._toggleClass(n,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(n,!1),this.stateMap.delete(n)),r.touched=!1}}_toggleClass(e,n){e=e.trim(),e.length>0&&e.split(C).forEach(r=>{n?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}};t.\u0275fac=function(n){return new(n||t)(g(D),g(p))},t.\u0275dir=v({type:t,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"},standalone:!0});let i=t;return i})();var We=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=b({type:t}),t.\u0275inj=S({});let i=t;return i})(),j="browser",G="server";function H(i){return i===j}function Ke(i){return i===G}var Xe=(()=>{let t=class t{};t.\u0275prov=a({token:t,providedIn:"root",factory:()=>H(l(I))?new F(l(y),window):new E});let i=t;return i})(),F=class{constructor(t,s){this.document=t,this.window=s,this.offset=()=>[0,0]}setOffset(t){Array.isArray(t)?this.offset=()=>t:this.offset=t}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(t){this.window.scrollTo(t[0],t[1])}scrollToAnchor(t){let s=Y(this.document,t);s&&(this.scrollToElement(s),s.focus())}setHistoryScrollRestoration(t){this.window.history.scrollRestoration=t}scrollToElement(t){let s=t.getBoundingClientRect(),e=s.left+this.window.pageXOffset,n=s.top+this.window.pageYOffset,r=this.offset();this.window.scrollTo(e-r[0],n-r[1])}};function Y(i,t){let s=i.getElementById(t)||i.getElementsByName(t)[0];if(s)return s;if(typeof i.createTreeWalker=="function"&&i.body&&typeof i.body.attachShadow=="function"){let e=i.createTreeWalker(i.body,NodeFilter.SHOW_ELEMENT),n=e.currentNode;for(;n;){let r=n.shadowRoot;if(r){let u=r.getElementById(t)||r.querySelector(`[name="${t}"]`);if(u)return u}n=e.nextNode()}}return null}var E=class{setOffset(t){}getScrollPosition(){return[0,0]}scrollToPosition(t){}scrollToAnchor(t){}setHistoryScrollRestoration(t){}},O=class{};export{m as a,je as b,M as c,y as d,Ge as e,f,$ as g,He as h,x as i,Ye as j,Ze as k,We as l,j as m,H as n,Ke as o,Xe as p,O as q};
