import{A as ot,D as I,S as ct,X as lt,d as at,ka as P,la as mt,ma as ht,na as F,oa as pt,pa as ut,q as st,r as rt,sa as ft,ta as _t}from"./chunk-3ZVAZC7S.js";import{c as dt,d as T,g as y,h as O,i as j}from"./chunk-2J4O7ELU.js";import{d as nt}from"./chunk-F6VEFF7R.js";import{Ba as U,Bb as X,Cc as it,Da as Z,Fb as g,Gb as v,Hb as Y,Kb as G,Mb as J,Pb as tt,Qb as et,Rb as w,T as L,Xb as C,Yb as B,Z as z,Zb as D,_ as N,aa as A,ab as _,bb as c,bc as R,ca as m,da as V,db as $,dc as E,f as d,ha as x,ia as q,ja as k,jc as M,qb as W,ra as H,sa as Q,vb as S,wb as K,xa as f}from"./chunk-TLNYMMAR.js";import{a as h}from"./chunk-ODN5LVDJ.js";function yt(s,i){if(s&1){let u=G();g(0,"div",1)(1,"button",2),tt("click",function(){H(u);let t=w();return Q(t.action())}),R(2),v()()}if(s&2){let u=w();_(2),E(" ",u.data.action," ")}}var At=["label"];function xt(s,i){}var St=Math.pow(2,31)-1,b=class{constructor(i,u){this._overlayRef=u,this._afterDismissed=new d,this._afterOpened=new d,this._onAction=new d,this._dismissedByAction=!1,this.containerInstance=i,i._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(i){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(i,St))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},vt=new A("MatSnackBarData"),p=class{constructor(){this.politeness="assertive",this.announcementMessage="",this.duration=0,this.data=null,this.horizontalPosition="center",this.verticalPosition="bottom"}},wt=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275dir=k({type:i,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"],standalone:!0});let s=i;return s})(),Ct=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275dir=k({type:i,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"],standalone:!0});let s=i;return s})(),Bt=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275dir=k({type:i,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"],standalone:!0});let s=i;return s})(),bt=(()=>{let i=class i{constructor(e,t){this.snackBarRef=e,this.data=t}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}};i.\u0275fac=function(t){return new(t||i)(c(b),c(vt))},i.\u0275cmp=x({type:i,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],standalone:!0,features:[M],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["mat-button","","matSnackBarAction","",3,"click"]],template:function(t,n){t&1&&(g(0,"div",0),R(1),v(),S(2,yt,3,1,"div",1)),t&2&&(_(),E(" ",n.data.message,`
`),_(),X(n.hasAction?2:-1))},dependencies:[ct,wt,Ct,Bt],styles:[".mat-mdc-simple-snack-bar{display:flex}"],encapsulation:2,changeDetection:0});let s=i;return s})(),Dt={snackBarState:dt("state",[O("void, hidden",y({transform:"scale(0.8)",opacity:0})),O("visible",y({transform:"scale(1)",opacity:1})),j("* => visible",T("150ms cubic-bezier(0, 0, 0.2, 1)")),j("* => void, * => hidden",T("75ms cubic-bezier(0.4, 0.0, 1, 1)",y({opacity:0})))])},Rt=0,Et=(()=>{let i=class i extends ht{constructor(e,t,n,a,r){super(),this._ngZone=e,this._elementRef=t,this._changeDetectorRef=n,this._platform=a,this.snackBarConfig=r,this._document=V(nt),this._trackedModals=new Set,this._announceDelay=150,this._destroyed=!1,this._onAnnounce=new d,this._onExit=new d,this._onEnter=new d,this._animationState="void",this._liveElementId=`mat-snack-bar-container-live-${Rt++}`,this.attachDomPortal=o=>{this._assertNotAttached();let l=this._portalOutlet.attachDomPortal(o);return this._afterPortalAttached(),l},r.politeness==="assertive"&&!r.announcementMessage?this._live="assertive":r.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}onAnimationEnd(e){let{fromState:t,toState:n}=e;if((n==="void"&&t!=="void"||n==="hidden")&&this._completeExit(),n==="visible"){let a=this._onEnter;this._ngZone.run(()=>{a.next(),a.complete()})}}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce())}exit(){return this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId)}),this._onExit}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(r=>e.classList.add(r)):e.classList.add(t)),this._exposeToModals();let n=this._label.nativeElement,a="mdc-snackbar__label";n.classList.toggle(a,!n.querySelector(`.${a}`))}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let n=0;n<t.length;n++){let a=t[n],r=a.getAttribute("aria-owns");this._trackedModals.add(a),r?r.indexOf(e)===-1&&a.setAttribute("aria-owns",r+" "+e):a.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute("aria-owns");if(t){let n=t.replace(this._liveElementId,"").trim();n.length>0?e.setAttribute("aria-owns",n):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{let e=this._elementRef.nativeElement.querySelector("[aria-hidden]"),t=this._elementRef.nativeElement.querySelector("[aria-live]");if(e&&t){let n=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&e.contains(document.activeElement)&&(n=document.activeElement),e.removeAttribute("aria-hidden"),t.appendChild(e),n?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}};i.\u0275fac=function(t){return new(t||i)(c(U),c(Z),c(it),c(at),c(p))},i.\u0275cmp=x({type:i,selectors:[["mat-snack-bar-container"]],viewQuery:function(t,n){if(t&1&&(C(F,7),C(At,7)),t&2){let a;B(a=D())&&(n._portalOutlet=a.first),B(a=D())&&(n._label=a.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:1,hostBindings:function(t,n){t&1&&et("@state.done",function(r){return n.onAnimationEnd(r)}),t&2&&J("@state",n._animationState)},standalone:!0,features:[W,M],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(t,n){t&1&&(g(0,"div",1)(1,"div",2,0)(3,"div",3),S(4,xt,0,0,"ng-template",4),v(),Y(5,"div"),v()()),t&2&&(_(5),K("aria-live",n._live)("role",n._role)("id",n._liveElementId))},dependencies:[F],styles:[".mat-mdc-snack-bar-container{display:flex;align-items:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);margin:8px}.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container{width:100vw}.mat-mdc-snackbar-surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;padding-left:0;padding-right:8px}[dir=rtl] .mat-mdc-snackbar-surface{padding-right:0;padding-left:8px}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{min-width:344px;max-width:672px}.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface{width:100%;min-width:0}.cdk-high-contrast-active .mat-mdc-snackbar-surface{outline:solid 1px}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{color:var(--mdc-snackbar-supporting-text-color, var(--mat-app-inverse-on-surface));border-radius:var(--mdc-snackbar-container-shape, var(--mat-app-corner-extra-small));background-color:var(--mdc-snackbar-container-color, var(--mat-app-inverse-surface))}.mdc-snackbar__label{width:100%;flex-grow:1;box-sizing:border-box;margin:0;padding:14px 8px 14px 16px}[dir=rtl] .mdc-snackbar__label{padding-left:8px;padding-right:16px}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-family:var(--mdc-snackbar-supporting-text-font, var(--mat-app-body-medium-font));font-size:var(--mdc-snackbar-supporting-text-size, var(--mat-app-body-medium-size));font-weight:var(--mdc-snackbar-supporting-text-weight, var(--mat-app-body-medium-weight));line-height:var(--mdc-snackbar-supporting-text-line-height, var(--mat-app-body-medium-line-height))}.mat-mdc-snack-bar-actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-snack-bar-button-color, var(--mat-app-inverse-primary));--mat-text-button-state-layer-color:currentColor;--mat-text-button-ripple-color:currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{opacity:.1}"],encapsulation:2,data:{animation:[Dt.snackBarState]}});let s=i;return s})();function Mt(){return new p}var It=new A("mat-snack-bar-default-options",{providedIn:"root",factory:Mt}),Tt=(()=>{let i=class i{get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(e,t,n,a,r,o){this._overlay=e,this._live=t,this._injector=n,this._breakpointObserver=a,this._parentSnackBar=r,this._defaultConfig=o,this._snackBarRefAtThisLevel=null,this.simpleSnackBarComponent=bt,this.snackBarContainerComponent=Et,this.handsetCssClass="mat-mdc-snack-bar-handset"}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t="",n){let a=h(h({},this._defaultConfig),n);return a.data={message:e,action:t},a.announcementMessage===e&&(a.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,a)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,t){let n=t&&t.viewContainerRef&&t.viewContainerRef.injector,a=f.create({parent:n||this._injector,providers:[{provide:p,useValue:t}]}),r=new P(this.snackBarContainerComponent,t.viewContainerRef,a),o=e.attach(r);return o.instance.snackBarConfig=t,o.instance}_attach(e,t){let n=h(h(h({},new p),this._defaultConfig),t),a=this._createOverlay(n),r=this._attachSnackBarContainer(a,n),o=new b(r,a);if(e instanceof $){let l=new mt(e,null,{$implicit:n.data,snackBarRef:o});o.instance=r.attachTemplatePortal(l)}else{let l=this._createInjector(n,o),kt=new P(e,void 0,l),gt=r.attachComponentPortal(kt);o.instance=gt.instance}return this._breakpointObserver.observe(rt.HandsetPortrait).pipe(L(a.detachments())).subscribe(l=>{a.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),n.announcementMessage&&r._onAnnounce.subscribe(()=>{this._live.announce(n.announcementMessage,n.politeness)}),this._animateSnackBar(o,n),this._openedSnackBarRef=o,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear()}),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter(),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration))}_createOverlay(e){let t=new ut;t.direction=e.direction;let n=this._overlay.position().global(),a=e.direction==="rtl",r=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!a||e.horizontalPosition==="end"&&a,o=!r&&e.horizontalPosition!=="center";return r?n.left("0"):o?n.right("0"):n.centerHorizontally(),e.verticalPosition==="top"?n.top("0"):n.bottom("0"),t.positionStrategy=n,this._overlay.create(t)}_createInjector(e,t){let n=e&&e.viewContainerRef&&e.viewContainerRef.injector;return f.create({parent:n||this._injector,providers:[{provide:b,useValue:t},{provide:vt,useValue:e.data}]})}};i.\u0275fac=function(t){return new(t||i)(m(ft),m(ot),m(f),m(st),m(i,12),m(It))},i.\u0275prov=z({token:i,factory:i.\u0275fac,providedIn:"root"});let s=i;return s})();var se=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=q({type:i}),i.\u0275inj=N({providers:[Tt],imports:[_t,pt,lt,I,bt,I]});let s=i;return s})();export{It as a,Tt as b,se as c};
