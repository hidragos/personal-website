import"./chunk-V6DPKTP6.js";import{a as K,b as ee,c as y,d as te,e as ne,f as w,g as ce,h as ue,i as fe,j as he,k as ge,l as ve}from"./chunk-X33QNLVP.js";import{A as ie,E as re,G as ae,N as se,O as le,P as pe,R as me,Y as de,a as W,b as X,c as Y,d as $,e as G,h as J,z as oe}from"./chunk-ATSRTZ4F.js";import{d as Z,o as C}from"./chunk-XHYEGTVW.js";import{Cb as f,Fa as A,Gb as a,Hb as m,Ib as s,Lb as E,Na as T,Ob as k,Qb as j,Vb as B,Wb as L,Xb as H,Zb as Q,_,ac as z,ba as g,bc as c,cb as u,db as P,eb as F,gb as I,ha as l,ib as D,kb as N,kc as V,la as d,pa as x,pc as U,qc as q,va as S,wa as R,wb as v,yb as O}from"./chunk-UY55UTXD.js";var Ce=(()=>{class o{static \u0275fac=function(n){return new(n||o)};static \u0275cmp=d({type:o,selectors:[["app-qt-aliens"]],standalone:!0,features:[c],decls:2,vars:2,consts:[["matRipple","","tabindex","-1","href","https://www.youtube.com/watch?v=diCf5Sep5Fo","target","_blank",1,"aliens-container",3,"matRippleUnbounded","matRippleCentered"],["src","assets/images/aliens.png",1,"aliens"]],template:function(n,i){n&1&&(a(0,"a",0),s(1,"img",1),m()),n&2&&O("matRippleUnbounded",!0)("matRippleCentered",!0)},dependencies:[ie,oe],styles:[".aliens-container[_ngcontent-%COMP%]{left:0;right:0}.aliens[_ngcontent-%COMP%]{width:40px;height:40px;animation:_ngcontent-%COMP%_aliens 30s linear infinite}.aliens-container[_ngcontent-%COMP%]{position:absolute;top:4px;margin-inline:auto;width:fit-content}@keyframes _ngcontent-%COMP%_aliens{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"]})}return o})();function Ae(o,e){if(o&1){let t=E();a(0,"button",3),k("click",function(){S(t);let i=j();return R(i.toggleDrawer())}),a(1,"mat-icon",4),Q(2,"menu"),m()()}}function Te(o,e){o&1&&s(0,"app-sections-navigator")}var ye=(()=>{class o{router=l(y);sidenavContainerService=l(w);toggleDrawer(){this.sidenavContainerService.toggleDrawer()}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=d({type:o,selectors:[["app-navbar"]],standalone:!0,features:[c],decls:7,vars:2,consts:[[1,"flex","mx-2","py-1","flex-row","flex-wrap","items-center","justify-between","relative"],["mat-icon-button",""],[1,"flex","flex-row","items-center"],["mat-icon-button","",3,"click"],["color","primary"]],template:function(n,i){n&1&&(a(0,"nav",0),v(1,Ae,3,0,"button",1)(2,Te,1,0,"app-sections-navigator"),a(3,"div",2),s(4,"language-picker")(5,"theme-picker"),m()(),s(6,"app-qt-aliens")),n&2&&(u(),f(i.sidenavContainerService.isHandheld?1:-1),u(),f(i.sidenavContainerService.isHandheld?-1:2))},dependencies:[C,ue,ge,le,se,ae,re,ne,Ce,fe]})}return o})();var Pe=["container"];function Fe(o,e){o&1&&s(0,"app-footer")}var we=(()=>{class o{router;container;sidenavContainerService=l(w);constructor(t){this.router=t}ngOnInit(){this.router.events.subscribe(t=>{t instanceof K&&(this.container.nativeElement.scrollTop=0)})}static \u0275fac=function(n){return new(n||o)(P(y))};static \u0275cmp=d({type:o,selectors:[["app-root"]],viewQuery:function(n,i){if(n&1&&B(Pe,5),n&2){let r;L(r=H())&&(i.container=r.first)}},standalone:!0,features:[z([]),c],decls:7,vars:1,consts:[["container",""],[1,"app-container","overflow-hidden","flex","flex-col","h-screen-dvh"],[1,"overflow-y-auto","overflow-x-hidden","flex","flex-col","justify-between","flex-auto"]],template:function(n,i){n&1&&(a(0,"app-sidenav-container")(1,"div",1),s(2,"app-navbar"),a(3,"div",2,0),s(5,"router-outlet"),v(6,Fe,1,0,"app-footer"),m()()()),n&2&&(u(6),f(i.sidenavContainerService.isHandheld?-1:6))},dependencies:[ee,ye,de,ve,C],styles:[".app-container[_ngcontent-%COMP%]{display:flex;height:100vh;width:100vw;flex-direction:column;overflow:hidden;font-size:large;height:100dvh}@media (min-width: 650px){.app-container[_ngcontent-%COMP%]{font-size:large}}@media (max-width: 650px){.app-container[_ngcontent-%COMP%]{font-size:medium}}#container[_ngcontent-%COMP%]{scroll-behavior:smooth}"]})}return o})();var Ie="@",De=(()=>{let e=class e{constructor(n,i,r,p,h){this.doc=n,this.delegate=i,this.zone=r,this.animationType=p,this.moduleImpl=h,this._rendererFactoryPromise=null,this.scheduler=l(I,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-VOJPNFTD.js").then(i=>i)).catch(i=>{throw new _(5300,!1)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:r})=>{this._engine=i(this.animationType,this.doc);let p=new r(this.delegate,this._engine,this.zone);return this.delegate=p,p})}createRenderer(n,i){let r=this.delegate.createRenderer(n,i);if(r.\u0275type===0)return r;typeof r.throwOnSyntheticProps=="boolean"&&(r.throwOnSyntheticProps=!1);let p=new M(r);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(h=>{let Re=h.createRenderer(n,i);p.use(Re),this.scheduler?.notify(9)}).catch(h=>{p.use(r)}),p}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(i){F()},e.\u0275prov=g({token:e,factory:e.\u0275fac});let o=e;return o})(),M=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,n,i){this.delegate.insertBefore(e,t,n,i)}removeChild(e,t,n){this.delegate.removeChild(e,t,n)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,n,i){this.delegate.setAttribute(e,t,n,i)}removeAttribute(e,t,n){this.delegate.removeAttribute(e,t,n)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,n,i){this.delegate.setStyle(e,t,n,i)}removeStyle(e,t,n){this.delegate.removeStyle(e,t,n)}setProperty(e,t,n){this.shouldReplay(t)&&this.replay.push(i=>i.setProperty(e,t,n)),this.delegate.setProperty(e,t,n)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,n){return this.shouldReplay(t)&&this.replay.push(i=>i.listen(e,t,n)),this.delegate.listen(e,t,n)}shouldReplay(e){return this.replay!==null&&e.startsWith(Ie)}};function be(o="animations"){return N("NgAsyncAnimations"),x([{provide:D,useFactory:(e,t,n)=>new De(e,t,n,o),deps:[Z,$,A]},{provide:T,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Me=[{path:"",redirectTo:"about",pathMatch:"full"},{path:"resume",loadComponent:()=>import("./chunk-WB3FUYSF.js").then(o=>o.ResumeComponent),pathMatch:"full"},{path:"about",loadComponent:()=>import("./chunk-N5EW4UTO.js").then(o=>o.AboutComponent),pathMatch:"full"},{path:"heart-love",loadComponent:()=>import("./chunk-UZRJPIXE.js").then(o=>o.HeartLoveComponent),pathMatch:"full"},{path:"**",redirectTo:"about",pathMatch:"full"}];var _e=(()=>{class o{http=l(W);getTranslation(t){return this.http.get(`/assets/i18n/${t}.json`)}static \u0275fac=function(n){return new(n||o)};static \u0275prov=g({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var xe=["en","es"],Se={providers:[me({config:{availableLangs:xe,defaultLang:"en",reRenderOnLangChange:!0,prodMode:!q()},loader:_e}),U({eventCoalescing:!0}),te(Me),J(),X(Y()),be(),{provide:V,useFactory:(o,e,t)=>()=>{xe.forEach(n=>t.load(n).subscribe()),o.initializeTranslation(),e.initializeTheme()},deps:[ce,he,pe],multi:!0}]};G(we,Se).catch(o=>console.error(o));