import{a as re}from"./chunk-ASZLFFAX.js";import{d as $,f as G,g as J,h as ee,i as te,j as oe,k as ne}from"./chunk-S2EGJNVF.js";import"./chunk-X5YLR3NI.js";import"./chunk-TLNRUKVV.js";import"./chunk-S57EST46.js";import{b as Y}from"./chunk-UTXEXKJQ.js";import{A as Q,J as W,L as X}from"./chunk-DNSHJFD5.js";import"./chunk-WXI33M2S.js";import{a as U,c as Z,d as q,g as K}from"./chunk-FPD7F3TA.js";import{a as B,b as j,c as H,d as V,e as k,h as z}from"./chunk-IIQSA42B.js";import{d as x,p as L}from"./chunk-YYXHG7V6.js";import{$b as E,Ba as y,Cb as m,Db as c,Eb as d,Ja as C,Tb as M,Ub as F,Vb as _,W as f,Z as p,_a as b,ab as A,ac as P,cb as S,da as a,eb as T,gb as R,ha as g,kc as N,la as v,pc as D,rc as O,sb as w,yb as I}from"./chunk-5BPRXVO3.js";import{i as u}from"./chunk-ODN5LVDJ.js";var he=["container"];function ue(o,e){o&1&&d(0,"app-footer")}var ae=(()=>{class o{container;sidenavContainerService=a(J);router=a(q);navbarService=a(G);matIconRegistry=a(Q);ngOnInit(){this.router.events.subscribe(t=>{t instanceof U&&this.container&&(this.container.nativeElement.scrollTop=0)}),this.matIconRegistry.setDefaultFontSetClass("material-symbols-outlined")}ngAfterViewInit(){this.container.nativeElement.addEventListener("scroll",()=>{this.navbarService.setScrollTop(this.container.nativeElement.scrollTop)})}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=g({type:o,selectors:[["app-root"]],viewQuery:function(n,r){if(n&1&&M(he,5),n&2){let i;F(i=_())&&(r.container=i.first)}},standalone:!0,features:[E([]),P],decls:7,vars:1,consts:[["container",""],[1,"app-container","overflow-y-scroll","overflow-x-hidden","h-screen-dvh","flex","flex-col"],[1,"grow"]],template:function(n,r){n&1&&(m(0,"app-sidenav-container")(1,"div",1,0),d(3,"app-navbar"),m(4,"div",2),d(5,"router-outlet"),c(),w(6,ue,1,0,"app-footer"),c()()),n&2&&(b(6),I(r.sidenavContainerService.isHandheld?-1:6))},dependencies:[Z,ne,Y,ee,L],styles:[".app-container[_ngcontent-%COMP%]{height:100dvh}#container[_ngcontent-%COMP%]{scroll-behavior:smooth}"]})}return o})();var fe="@",ge=(()=>{let e=class e{constructor(n,r,i,s,l){this.doc=n,this.delegate=r,this.zone=i,this.animationType=s,this.moduleImpl=l,this._rendererFactoryPromise=null,this.scheduler=a(S,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-LCQLHIVJ.js").then(r=>r)).catch(r=>{throw new f(5300,!1)}).then(({\u0275createEngine:r,\u0275AnimationRendererFactory:i})=>{this._engine=r(this.animationType,this.doc);let s=new i(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(n,r){let i=this.delegate.createRenderer(n,r);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=!1);let s=new h(i);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(l=>{let ce=l.createRenderer(n,r);s.use(ce),this.scheduler?.notify(9)}).catch(l=>{s.use(i)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(r){A()},e.\u0275prov=p({token:e,factory:e.\u0275fac});let o=e;return o})(),h=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,n,r){this.delegate.insertBefore(e,t,n,r)}removeChild(e,t,n){this.delegate.removeChild(e,t,n)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,n,r){this.delegate.setAttribute(e,t,n,r)}removeAttribute(e,t,n){this.delegate.removeAttribute(e,t,n)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,n,r){this.delegate.setStyle(e,t,n,r)}removeStyle(e,t,n){this.delegate.removeStyle(e,t,n)}setProperty(e,t,n){this.shouldReplay(t)&&this.replay.push(r=>r.setProperty(e,t,n)),this.delegate.setProperty(e,t,n)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,n){return this.shouldReplay(t)&&this.replay.push(r=>r.listen(e,t,n)),this.delegate.listen(e,t,n)}shouldReplay(e){return this.replay!==null&&e.startsWith(fe)}};function se(o="animations"){return R("NgAsyncAnimations"),v([{provide:T,useFactory:(e,t,n)=>new ge(e,t,n,o),deps:[x,V,y]},{provide:C,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var le=[{path:"",redirectTo:"about",pathMatch:"full"},{path:"resume",loadComponent:()=>import("./chunk-MDUAZLS5.js").then(o=>o.ResumeComponent),pathMatch:"full"},{path:"about",loadComponent:()=>import("./chunk-EGZ2DUXI.js").then(o=>o.AboutComponent),pathMatch:"full"},{path:"blog",loadComponent:()=>import("./chunk-O7VUWHHB.js").then(o=>o.BlogComponent),children:[{path:"",loadComponent:()=>import("./chunk-OJW65ZVO.js").then(o=>o.BlogArticleListComponent)},{path:"new",loadComponent:()=>import("./chunk-6XHO7FES.js").then(o=>o.BlogArticleEditComponent)},{path:":id/edit",loadComponent:()=>import("./chunk-6XHO7FES.js").then(o=>o.BlogArticleEditComponent)},{path:":id",loadComponent:()=>import("./chunk-S7BHIXXP.js").then(o=>o.BlogArticleComponent)},{path:"**",redirectTo:"",pathMatch:"full"}]},{path:"heart-love",loadComponent:()=>import("./chunk-QI3JRQOE.js").then(o=>o.HeartLoveComponent),pathMatch:"full"},{path:"**",redirectTo:"about",pathMatch:"full"}];var pe=(()=>{class o{http=a(B);getTranslation(t){return this.http.get(`/assets/i18n/${t}.json`)}static \u0275fac=function(n){return new(n||o)};static \u0275prov=p({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var de=["en","es"],me={providers:[X({config:{availableLangs:de,defaultLang:"en",reRenderOnLangChange:!0,prodMode:!O()},loader:pe}),D({eventCoalescing:!0}),K(le),z(),j(H()),se(),{provide:N,useFactory:(o,e,t,n)=>()=>u(void 0,null,function*(){n.initializeSupabase(),de.forEach(r=>t.load(r).subscribe()),o.initializeTranslation(),e.initializeTheme()}),deps:[oe,te,W,$],multi:!0},{provide:re,useValue:{duration:2e3}}]};k(ae,me).catch(o=>console.error(o));
