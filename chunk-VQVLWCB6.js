import{c as St,d as si,e as li,f as $,g as K,j as di,m as hi,n as ht,o as N,p as k,q as pt,s as pi,t as mt}from"./chunk-Q6K2OGDX.js";import{A as rt,D as st,E as Jt,F as At,H as P,I as ti,J as ii,K as lt,P as ei,Q as C,R as ai,T as oi,V as B,W as ni,X as ci,Y as dt,_ as z,aa as ri,g as Zt,i as Xt,n as ot,q as nt,s as kt,z as ct}from"./chunk-6G4JBFDC.js";import"./chunk-WXI33M2S.js";import{d as at,i as Kt,l as Wt,m as Yt,o as D}from"./chunk-VKPMNGKO.js";import{$a as Ht,$b as L,Ab as bt,Ba as x,C as Bt,D as V,Ea as vt,Eb as Qt,Fa as G,Fb as qt,Gb as d,Ha as Q,Hb as h,Ib as y,J as X,Jb as R,Kb as O,Lb as Ut,Mb as yt,Na as it,Ob as et,Qb as j,Tb as Ct,Vb as wt,W as J,Wb as It,Xb as xt,Zb as S,a as w,b as Lt,ba as tt,bc as u,ca as M,cb as v,cc as $t,db as l,ea as f,fb as Vt,ga as p,ha as b,l as I,la as m,ma as F,na as _t,nb as ft,q as Pt,rb as q,rc as Dt,sb as Gt,va as zt,wa as Nt,wb as g,xb as U,yb as A,z as Z}from"./chunk-UY55UTXD.js";var Ai=()=>({returnObjects:!0});function Si(a,e){if(a&1&&(d(0,"p"),S(1),h()),a&2){let n=e.$implicit;v(),L(" ",n," ")}}function Ei(a,e){if(a&1&&(R(0),d(1,"div",1),g(2,Si,2,1,"p",2),h(),O()),a&2){let n=e.$implicit;v(2),A("ngForOf",n("about.sections.intro.lines",$t(1,Ai)))}}var ui=(()=>{class a{tldrMode=!1;toggleTldrMode(){this.tldrMode=!this.tldrMode}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=m({type:a,selectors:[["app-about-content"]],standalone:!0,features:[u],decls:1,vars:0,consts:[[4,"transloco"],[1,"content-text"],[4,"ngFor","ngForOf"]],template:function(t,i){t&1&&g(0,Ei,3,2,"ng-container",0)},dependencies:[B,C,z,D,Wt]})}return a})();var Ri=new f("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})});var gi=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=F({type:e}),e.\u0275inj=M({providers:[ti,{provide:Ri,useValue:{separatorKeyCodes:[13]}}],imports:[P,lt,P]});let a=e;return a})();function Li(a,e){}var T=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.closeOnNavigation=!0,this.closeOnDestroy=!0,this.closeOnOverlayDetachments=!0}};var Mt=(()=>{let e=class e extends li{constructor(t,i,o,c,s,r,_,H){super(),this._elementRef=t,this._focusTrapFactory=i,this._config=c,this._interactivityChecker=s,this._ngZone=r,this._overlayRef=_,this._focusMonitor=H,this._platform=b(Xt),this._focusTrap=null,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this._ariaLabelledByQueue=[],this._changeDetectorRef=b(Dt),this._injector=b(x),this._isDestroyed=!1,this.attachDomPortal=gt=>{this._portalOutlet.hasAttached();let ki=this._portalOutlet.attachDomPortal(gt);return this._contentAttached(),ki},this._document=o,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(t){this._ariaLabelledByQueue.push(t),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(t){let i=this._ariaLabelledByQueue.indexOf(t);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(t){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(t);return this._contentAttached(),i}attachTemplatePortal(t){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(t);return this._contentAttached(),i}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(t,i){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let o=()=>{t.removeEventListener("blur",o),t.removeEventListener("mousedown",o),t.removeAttribute("tabindex")};t.addEventListener("blur",o),t.addEventListener("mousedown",o)})),t.focus(i)}_focusByCssSelector(t,i){let o=this._elementRef.nativeElement.querySelector(t);o&&this._forceFocus(o,i)}_trapFocus(){this._isDestroyed||ft(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||t.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement()||this._focusDialogContainer();break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}},{injector:this._injector})}_restoreFocus(){let t=this._config.restoreFocus,i=null;if(typeof t=="string"?i=this._document.querySelector(t):typeof t=="boolean"?i=t?this._elementFocusedBeforeDialogWasOpened:null:t&&(i=t),this._config.restoreFocus&&i&&typeof i.focus=="function"){let o=ot(),c=this._elementRef.nativeElement;(!o||o===this._document.body||o===c||c.contains(o))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){let t=this._elementRef.nativeElement,i=ot();return t===i||t.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=ot()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}};e.\u0275fac=function(i){return new(i||e)(l(Q),l(rt),l(at,8),l(T),l(ct),l(G),l(N),l(st))},e.\u0275cmp=m({type:e,selectors:[["cdk-dialog-container"]],viewQuery:function(i,o){if(i&1&&wt($,7),i&2){let c;It(c=xt())&&(o._portalOutlet=c.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(i,o){i&2&&U("id",o._config.id||null)("role",o._config.role)("aria-modal",o._config.ariaModal)("aria-labelledby",o._config.ariaLabel?null:o._ariaLabelledByQueue[0])("aria-label",o._config.ariaLabel)("aria-describedby",o._config.ariaDescribedBy||null)},standalone:!0,features:[q,u],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(i,o){i&1&&g(0,Li,0,0,"ng-template",0)},dependencies:[$],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2});let a=e;return a})(),W=class{constructor(e,n){this.overlayRef=e,this.config=n,this.closed=new I,this.disableClose=n.disableClose,this.backdropClick=e.backdropClick(),this.keydownEvents=e.keydownEvents(),this.outsidePointerEvents=e.outsidePointerEvents(),this.id=n.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!nt(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=e.detachments().subscribe(()=>{n.closeOnOverlayDetachments!==!1&&this.close()})}close(e,n){if(this.containerInstance){let t=this.closed;this.containerInstance._closeInteractionType=n?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(e),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(e="",n=""){return this.overlayRef.updateSize({width:e,height:n}),this}addPanelClass(e){return this.overlayRef.addPanelClass(e),this}removePanelClass(e){return this.overlayRef.removePanelClass(e),this}},Pi=new f("DialogScrollStrategy",{providedIn:"root",factory:()=>{let a=b(k);return()=>a.scrollStrategies.block()}}),Bi=new f("DialogData"),zi=new f("DefaultDialogConfig");var Ni=0,Ft=(()=>{let e=class e{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}constructor(t,i,o,c,s,r){this._overlay=t,this._injector=i,this._defaultOptions=o,this._parentDialog=c,this._overlayContainer=s,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new I,this._afterOpenedAtThisLevel=new I,this._ariaHiddenElements=new Map,this.afterAllClosed=Z(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(J(void 0))),this._scrollStrategy=r}open(t,i){let o=this._defaultOptions||new T;i=w(w({},o),i),i.id=i.id||`cdk-dialog-${Ni++}`,i.id&&this.getDialogById(i.id);let c=this._getOverlayConfig(i),s=this._overlay.create(c),r=new W(s,i),_=this._attachContainer(s,r,i);return r.containerInstance=_,this._attachDialogContent(t,r,_,i),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(r),r.closed.subscribe(()=>this._removeOpenDialog(r,!0)),this.afterOpened.next(r),r}closeAll(){Et(this.openDialogs,t=>t.close())}getDialogById(t){return this.openDialogs.find(i=>i.id===t)}ngOnDestroy(){Et(this._openDialogsAtThisLevel,t=>{t.config.closeOnDestroy===!1&&this._removeOpenDialog(t,!1)}),Et(this._openDialogsAtThisLevel,t=>t.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(t){let i=new hi({positionStrategy:t.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,width:t.width,height:t.height,disposeOnNavigation:t.closeOnNavigation});return t.backdropClass&&(i.backdropClass=t.backdropClass),i}_attachContainer(t,i,o){let c=o.injector||o.viewContainerRef?.injector,s=[{provide:T,useValue:o},{provide:W,useValue:i},{provide:N,useValue:t}],r;o.container?typeof o.container=="function"?r=o.container:(r=o.container.type,s.push(...o.container.providers(o))):r=Mt;let _=new St(r,o.viewContainerRef,x.create({parent:c||this._injector,providers:s}),o.componentFactoryResolver);return t.attach(_).instance}_attachDialogContent(t,i,o,c){if(t instanceof Vt){let s=this._createInjector(c,i,o,void 0),r={$implicit:c.data,dialogRef:i};c.templateContext&&(r=w(w({},r),typeof c.templateContext=="function"?c.templateContext():c.templateContext)),o.attachTemplatePortal(new si(t,null,r,s))}else{let s=this._createInjector(c,i,o,this._injector),r=o.attachComponentPortal(new St(t,c.viewContainerRef,s,c.componentFactoryResolver));i.componentRef=r,i.componentInstance=r.instance}}_createInjector(t,i,o,c){let s=t.injector||t.viewContainerRef?.injector,r=[{provide:Bi,useValue:t.data},{provide:W,useValue:i}];return t.providers&&(typeof t.providers=="function"?r.push(...t.providers(i,t,o)):r.push(...t.providers)),t.direction&&(!s||!s.get(At,null,{optional:!0}))&&r.push({provide:At,useValue:{value:t.direction,change:Pt()}}),x.create({parent:s||c,providers:r})}_removeOpenDialog(t,i){let o=this.openDialogs.indexOf(t);o>-1&&(this.openDialogs.splice(o,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((c,s)=>{c?s.setAttribute("aria-hidden",c):s.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){let t=this._overlayContainer.getContainerElement();if(t.parentElement){let i=t.parentElement.children;for(let o=i.length-1;o>-1;o--){let c=i[o];c!==t&&c.nodeName!=="SCRIPT"&&c.nodeName!=="STYLE"&&!c.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(c,c.getAttribute("aria-hidden")),c.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}};e.\u0275fac=function(i){return new(i||e)(p(k),p(x),p(zi,8),p(e,12),p(ht),p(Pi))},e.\u0275prov=tt({token:e,factory:e.\u0275fac,providedIn:"root"});let a=e;return a})();function Et(a,e){let n=a.length;for(;n--;)e(a[n])}var _i=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=F({type:e}),e.\u0275inj=M({providers:[Ft],imports:[pt,K,Jt,K]});let a=e;return a})();function Hi(a,e){}var Y=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.delayFocusTrap=!0,this.closeOnNavigation=!0}},Rt="mdc-dialog--open",vi="mdc-dialog--opening",fi="mdc-dialog--closing",Vi=150,Gi=75,Qi=(()=>{let e=class e extends Mt{constructor(t,i,o,c,s,r,_,H,gt){super(t,i,o,c,s,r,_,gt),this._animationMode=H,this._animationStateChanged=new vt,this._animationsEnabled=this._animationMode!=="NoopAnimations",this._actionSectionCount=0,this._hostElement=this._elementRef.nativeElement,this._enterAnimationDuration=this._animationsEnabled?yi(this._config.enterAnimationDuration)??Vi:0,this._exitAnimationDuration=this._animationsEnabled?yi(this._config.exitAnimationDuration)??Gi:0,this._animationTimer=null,this._finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)},this._finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})}}_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(bi,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(vi,Rt)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(Rt),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(Rt),this._animationsEnabled?(this._hostElement.style.setProperty(bi,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(fi)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(t){this._actionSectionCount+=t,this._changeDetectorRef.markForCheck()}_clearAnimationClasses(){this._hostElement.classList.remove(vi,fi)}_waitForAnimationToComplete(t,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,t)}_requestAnimationFrame(t){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(t):t()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:t})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(t){let i=super.attachComponentPortal(t);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}};e.\u0275fac=function(i){return new(i||e)(l(Q),l(rt),l(at,8),l(Y),l(ct),l(G),l(N),l(it,8),l(st))},e.\u0275cmp=m({type:e,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,o){i&2&&(yt("id",o._config.id),U("aria-modal",o._config.ariaModal)("role",o._config.role)("aria-labelledby",o._config.ariaLabel?null:o._ariaLabelledByQueue[0])("aria-label",o._config.ariaLabel)("aria-describedby",o._config.ariaDescribedBy||null),bt("_mat-animation-noopable",!o._animationsEnabled)("mat-mdc-dialog-container-with-actions",o._actionSectionCount>0))},standalone:!0,features:[q,u],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,o){i&1&&(d(0,"div",0)(1,"div",1),g(2,Hi,0,0,"ng-template",2),h()())},dependencies:[$],styles:['.mat-mdc-dialog-container{width:100%;height:100%;display:block;box-sizing:border-box;max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;outline:0}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 80vw);min-width:var(--mat-dialog-container-min-width, 0)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, 80vw)}}.mat-mdc-dialog-inner-container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;transition:opacity linear var(--mat-dialog-transition-duration, 0ms);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mdc-dialog--closing .mat-mdc-dialog-inner-container{transition:opacity 75ms linear;transform:none}.mdc-dialog--open .mat-mdc-dialog-inner-container{opacity:1}._mat-animation-noopable .mat-mdc-dialog-inner-container{transition:none}.mat-mdc-dialog-surface{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;width:100%;height:100%;position:relative;overflow-y:auto;outline:0;transform:scale(0.8);transition:transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;box-shadow:var(--mat-dialog-container-elevation-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12));border-radius:var(--mdc-dialog-container-shape, var(--mat-app-corner-extra-large, 4px));background-color:var(--mdc-dialog-container-color, var(--mat-app-surface, white))}[dir=rtl] .mat-mdc-dialog-surface{text-align:right}.mdc-dialog--open .mat-mdc-dialog-surface,.mdc-dialog--closing .mat-mdc-dialog-surface{transform:none}._mat-animation-noopable .mat-mdc-dialog-surface{transition:none}.mat-mdc-dialog-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-dialog-title{display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:var(--mat-dialog-headline-padding, 0 24px 9px)}.mat-mdc-dialog-title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mat-mdc-dialog-title{text-align:right}.mat-mdc-dialog-container .mat-mdc-dialog-title{color:var(--mdc-dialog-subhead-color, var(--mat-app-on-surface, rgba(0, 0, 0, 0.87)));font-family:var(--mdc-dialog-subhead-font, var(--mat-app-headline-small-font, inherit));line-height:var(--mdc-dialog-subhead-line-height, var(--mat-app-headline-small-line-height, 1.5rem));font-size:var(--mdc-dialog-subhead-size, var(--mat-app-headline-small-size, 1rem));font-weight:var(--mdc-dialog-subhead-weight, var(--mat-app-headline-small-weight, 400));letter-spacing:var(--mdc-dialog-subhead-tracking, var(--mat-app-headline-small-tracking, 0.03125em))}.mat-mdc-dialog-content{display:block;flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;max-height:65vh}.mat-mdc-dialog-content>:first-child{margin-top:0}.mat-mdc-dialog-content>:last-child{margin-bottom:0}.mat-mdc-dialog-container .mat-mdc-dialog-content{color:var(--mdc-dialog-supporting-text-color, var(--mat-app-on-surface-variant, rgba(0, 0, 0, 0.6)));font-family:var(--mdc-dialog-supporting-text-font, var(--mat-app-body-medium-font, inherit));line-height:var(--mdc-dialog-supporting-text-line-height, var(--mat-app-body-medium-line-height, 1.5rem));font-size:var(--mdc-dialog-supporting-text-size, var(--mat-app-body-medium-size, 1rem));font-weight:var(--mdc-dialog-supporting-text-weight, var(--mat-app-body-medium-weight, 400));letter-spacing:var(--mdc-dialog-supporting-text-tracking, var(--mat-app-body-medium-tracking, 0.03125em))}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0);padding:var(--mat-dialog-actions-padding, 8px);justify-content:var(--mat-dialog-actions-alignment, start)}.cdk-high-contrast-active .mat-mdc-dialog-actions{border-top-color:CanvasText}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-component-host{display:contents}'],encapsulation:2});let a=e;return a})(),bi="--mat-dialog-transition-duration";function yi(a){return a==null?null:typeof a=="number"?a:a.endsWith("ms")?kt(a.substring(0,a.length-2)):a.endsWith("s")?kt(a.substring(0,a.length-1))*1e3:a==="0"?0:null}var ut=function(a){return a[a.OPEN=0]="OPEN",a[a.CLOSING=1]="CLOSING",a[a.CLOSED=2]="CLOSED",a}(ut||{}),Ot=class{constructor(e,n,t){this._ref=e,this._containerInstance=t,this._afterOpened=new I,this._beforeClosed=new I,this._state=ut.OPEN,this.disableClose=n.disableClose,this.id=e.id,e.addPanelClass("mat-mdc-dialog-panel"),t._animationStateChanged.pipe(V(i=>i.state==="opened"),X(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(V(i=>i.state==="closed"),X(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),e.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Bt(this.backdropClick(),this.keydownEvents().pipe(V(i=>i.keyCode===27&&!this.disableClose&&!nt(i)))).subscribe(i=>{this.disableClose||(i.preventDefault(),qi(this,i.type==="keydown"?"keyboard":"mouse"))})}close(e){this._result=e,this._containerInstance._animationStateChanged.pipe(V(n=>n.state==="closing"),X(1)).subscribe(n=>{this._beforeClosed.next(e),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),n.totalTime+100)}),this._state=ut.CLOSING,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(e){let n=this._ref.config.positionStrategy;return e&&(e.left||e.right)?e.left?n.left(e.left):n.right(e.right):n.centerHorizontally(),e&&(e.top||e.bottom)?e.top?n.top(e.top):n.bottom(e.bottom):n.centerVertically(),this._ref.updatePosition(),this}updateSize(e="",n=""){return this._ref.updateSize(e,n),this}addPanelClass(e){return this._ref.addPanelClass(e),this}removePanelClass(e){return this._ref.removePanelClass(e),this}getState(){return this._state}_finishDialogClose(){this._state=ut.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function qi(a,e,n){return a._closeInteractionType=e,a.close(n)}var Ui=new f("MatMdcDialogData"),$i=new f("mat-mdc-dialog-default-options"),Ki=new f("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let a=b(k);return()=>a.scrollStrategies.block()}});var Wi=0,jt=(()=>{let e=class e{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}constructor(t,i,o,c,s,r,_,H){this._overlay=t,this._defaultOptions=c,this._scrollStrategy=s,this._parentDialog=r,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new I,this._afterOpenedAtThisLevel=new I,this.dialogConfigClass=Y,this.afterAllClosed=Z(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(J(void 0))),this._dialog=i.get(Ft),this._dialogRefConstructor=Ot,this._dialogContainerType=Qi,this._dialogDataToken=Ui}open(t,i){let o;i=w(w({},this._defaultOptions||new Y),i),i.id=i.id||`mat-mdc-dialog-${Wi++}`,i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let c=this._dialog.open(t,Lt(w({},i),{positionStrategy:this._overlay.position().global().centerHorizontally().centerVertically(),disableClose:!0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:T,useValue:i}]},templateContext:()=>({dialogRef:o}),providers:(s,r,_)=>(o=new this._dialogRefConstructor(s,i,_),o.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:_},{provide:this._dialogDataToken,useValue:r.data},{provide:this._dialogRefConstructor,useValue:o}])}));return o.componentRef=c.componentRef,o.componentInstance=c.componentInstance,this.openDialogs.push(o),this.afterOpened.next(o),o.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(o);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next())}),o}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(i=>i.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(t){let i=t.length;for(;i--;)t[i].close()}};e.\u0275fac=function(i){return new(i||e)(p(k),p(x),p(Kt,8),p($i,8),p(Ki),p(e,12),p(ht),p(it,8))},e.\u0275prov=tt({token:e,factory:e.\u0275fac,providedIn:"root"});let a=e;return a})();var Ci=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275dir=_t({type:e,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],standalone:!0,features:[Gt([di])]});let a=e;return a})();var wi=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=F({type:e}),e.\u0275inj=M({providers:[jt],imports:[_i,pt,K,P,P]});let a=e;return a})();var Ii=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275cmp=m({type:a,selectors:[["app-image-dialog"]],standalone:!0,features:[u],decls:2,vars:0,consts:[["src","assets/images/profile.jpeg"]],template:function(t,i){t&1&&(d(0,"mat-dialog-content"),y(1,"img",0),h())},dependencies:[wi,Ci,C],styles:["mat-dialog-content[_ngcontent-%COMP%]{overflow:hidden;height:100%;width:100%;max-width:100%;max-height:100%;padding:16px}mat-dialog-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain;border-radius:16px}"]})}return a})();function Zi(a,e){if(a&1){let n=Ut();R(0),d(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),et("click",function(){zt(n);let i=j();return Nt(i.profilePictureClicked())}),y(6,"img",6),h()()()(),d(7,"h2",7),S(8),h()(),O()}if(a&2){let n=e.$implicit;v(8),L(" \u{1F44B} ",n("about.greeting")," ")}}var xi=(()=>{class a{dialog=b(jt);skills=[{name:"Angular",imageUrl:"https://cdn.svgporn.com/logos/angular-icon.svg"},{name:".NET Core",imageUrl:"https://cdn.svgporn.com/logos/dotnet.svg"},{name:"Azure DevOps",imageUrl:"https://cdn.svgporn.com/logos/microsoft-azure.svg"},{name:"Flutter",imageUrl:"https://cdn.svgporn.com/logos/flutter.svg"},{name:"Docker",imageUrl:"https://cdn.svgporn.com/logos/docker-icon.svg"},{name:"Firebase",imageUrl:"https://cdn.svgporn.com/logos/firebase.svg"}];profilePictureClicked(){this.dialog.open(Ii,{maxWidth:"100%",maxHeight:"100%",width:"fit-content",height:"60%"})}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=m({type:a,selectors:[["app-about-header"]],standalone:!0,features:[u],decls:1,vars:0,consts:[[4,"transloco"],[1,"flex","flex-col","gap-4","flex-wrap","items-center"],[1,"flex","flex-row","justify-between","items-center","w-full"],[1,"frame-container"],[1,"img-frame"],["matRipple","",1,"img-container",3,"click"],["src","assets/images/profile.jpeg"],[1,"text-center","font-bold","emoji-color-primary"]],template:function(t,i){t&1&&g(0,Zi,9,1,"ng-container",0)},dependencies:[B,gi,D,z,ri,C,lt,ii],styles:[".img-frame[_ngcontent-%COMP%]{display:block;width:250px}.img-frame[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]{border:4px solid;border-radius:50%;width:100%;height:100%;object-fit:cover;cursor:pointer}.button-logo[_ngcontent-%COMP%]{margin:.5rem;width:24px;height:24px}.frame-container[_ngcontent-%COMP%]{margin:0 auto}"]})}return a})();var Xi=(a,e)=>e.name;function Ji(a,e){if(a&1&&y(0,"mat-icon",4),a&2){let n=j().$implicit;A("svgIcon",n.svgIcon)}}function te(a,e){if(a&1&&(d(0,"mat-icon"),S(1),h()),a&2){let n=j().$implicit;v(),L(" ",n.materialIcon," ")}}function ie(a,e){if(a&1&&(d(0,"a",1),g(1,Ji,1,1,"mat-icon",2)(2,te,2,1,"mat-icon",3),h()),a&2){let n=e.$implicit;Ct("matTooltip",n.name),Ct("href",n.url,Ht),v(),A("ngIf",n.svgIcon),v(),A("ngIf",n.materialIcon)}}var Di=(()=>{class a{matIconRegistry;domSanitizer;socials=[{name:"GitHub",url:"https://github.com/hidragos",svgIcon:"github"},{name:"LinkedIn",url:"https://www.linkedin.com/in/dragos-andrei-iliescu-b3005117b/",svgIcon:"linkedin"},{name:"Stack Overflow",url:"https://stackoverflow.com/users/11674485/dragos-andrei",svgIcon:"stackoverflow"},{name:"Mail",url:'mailto:hi.dragos.andrei@gmail.com"',materialIcon:"email"}];constructor(n,t){this.matIconRegistry=n,this.domSanitizer=t,this.matIconRegistry.addSvgIcon("github",this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/github.svg")),this.matIconRegistry.addSvgIcon("linkedin",this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/linkedin.svg")),this.matIconRegistry.addSvgIcon("stackoverflow",this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/stackoverflow.svg"))}static \u0275fac=function(t){return new(t||a)(l(ni),l(Zt))};static \u0275cmp=m({type:a,selectors:[["app-about-socials"]],standalone:!0,features:[u],decls:3,vars:0,consts:[[1,"flex","flex-row","gap-4","justify-end","pr-4"],["mat-icon-button","","color","primary","target","_blank",3,"matTooltip","href"],[3,"svgIcon",4,"ngIf"],[4,"ngIf"],[3,"svgIcon"]],template:function(t,i){t&1&&(d(0,"div",0),Qt(1,ie,3,4,"a",1,Xi),h()),t&2&&(v(),qt(i.socials))},dependencies:[dt,ci,C,ei,D,Yt,mt,pi]})}return a})();function ee(a,e){a&1&&(R(0),d(1,"div",1),y(2,"app-about-header",2),d(3,"mat-card",3)(4,"mat-card-content")(5,"div",4),y(6,"app-about-socials",5)(7,"app-about-content"),h()()()(),O())}var vo=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275cmp=m({type:a,selectors:[["app-about"]],standalone:!0,features:[u],decls:1,vars:0,consts:[[4,"transloco"],[1,"page-container"],[1,"header"],["appearance","outlined",1,"mt-4"],[1,"flex","flex-col"],[1,"mb-2"]],template:function(t,i){t&1&&g(0,ee,8,0,"ng-container",0)},dependencies:[D,z,B,ai,oi,xi,ui,C,dt,mt,Di]})}return a})();export{vo as AboutComponent};
