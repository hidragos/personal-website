import{e as ei,h as ai,j as oi}from"./chunk-KZNPNA3H.js";import{E as W,F as l,H as b,J as Z,K as X,L as M,M as Y,N as J,O as ii,Q as ti,R as y,ea as ci,fa as ni,ga as D,u as T,w as U,x as $,y as S}from"./chunk-FW6BN3G3.js";import"./chunk-WXI33M2S.js";import{g as K}from"./chunk-TWIRXNXJ.js";import{k as q,m as G,p as m}from"./chunk-I6G442OA.js";import{$b as N,Ab as o,Bb as c,Cb as p,Db as g,Eb as _,Fb as V,Kb as F,Mb as f,Pb as A,Va as H,Vb as v,Wb as R,Xb as k,Y as j,Ya as d,Za as w,_ as B,_b as s,ac as Q,ba as E,fa as r,ga as P,pa as O,qa as z,qb as h,sb as u,xb as L,yb as I,zb as x}from"./chunk-PDAAT5QO.js";import"./chunk-ODN5LVDJ.js";var mi=()=>({returnObjects:!0}),ui=i=>({"sm:mb-8 mb-4":i});function vi(i,a){if(i&1&&(o(0,"p",2),v(1),c()),i&2){let t=a.$implicit,e=a.$index,n=a.$count;u("ngClass",Q(2,ui,e!==n-1)),d(),R(t)}}function gi(i,a){if(i&1&&(g(0),o(1,"div",1),I(2,vi,2,4,"p",2,L),c(),_()),i&2){let t=a.$implicit;d(2),x(t("about.sections.intro.lines",N(0,mi)))}}var ri=(()=>{class i{tldrMode=!1;toggleTldrMode(){this.tldrMode=!this.tldrMode}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=r({type:i,selectors:[["app-about-content"]],standalone:!0,features:[s],decls:1,vars:0,consts:[[4,"transloco"],[1,"content-text"],[3,"ngClass"]],template:function(e,n){e&1&&h(0,gi,4,1,"ng-container",0)},dependencies:[y,l,b,m,q]})}return i})();var fi=new B("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})});var di=(()=>{let a=class a{};a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=P({type:a}),a.\u0275inj=j({providers:[U,{provide:fi,useValue:{separatorKeyCodes:[13]}}],imports:[T,S,T]});let i=a;return i})();var bi=(i,a)=>a.name;function yi(i,a){if(i&1&&p(0,"mat-icon",4),i&2){let t=f().$implicit;u("svgIcon",t.svgIcon)}}function Ci(i,a){if(i&1&&(o(0,"mat-icon"),v(1),c()),i&2){let t=f().$implicit;d(),k(" ",t.materialIcon," ")}}function wi(i,a){if(i&1&&(o(0,"a",1),h(1,yi,1,1,"mat-icon",2)(2,Ci,2,1,"mat-icon",3),c()),i&2){let t=a.$implicit;A("matTooltip",t.name),A("href",t.url,H),d(),u("ngIf",t.svgIcon),d(),u("ngIf",t.materialIcon)}}var si=(()=>{class i{matIconRegistry;domSanitizer;socials=[{name:"GitHub",url:"https://github.com/hidragos",svgIcon:"github"},{name:"LinkedIn",url:"https://www.linkedin.com/in/dragos-andrei-iliescu-b3005117b/",svgIcon:"linkedin"},{name:"Stack Overflow",url:"https://stackoverflow.com/users/11674485/dragos-andrei",svgIcon:"stackoverflow"},{name:"Mail",url:'mailto:hi.dragos.andrei@gmail.com"',materialIcon:"email"}];constructor(t,e){this.matIconRegistry=t,this.domSanitizer=e,this.matIconRegistry.addSvgIcon("github",this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/github.svg")),this.matIconRegistry.addSvgIcon("linkedin",this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/linkedin.svg")),this.matIconRegistry.addSvgIcon("stackoverflow",this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/stackoverflow.svg"))}static \u0275fac=function(e){return new(e||i)(w(Z),w(K))};static \u0275cmp=r({type:i,selectors:[["app-about-socials"]],standalone:!0,features:[s],decls:3,vars:0,consts:[[1,"flex","flex-row","gap-6","justify-center"],["mat-icon-button","","color","primary","target","_blank",3,"matTooltip","href"],[3,"svgIcon",4,"ngIf"],[4,"ngIf"],[3,"svgIcon"]],template:function(e,n){e&1&&(o(0,"div",0),I(1,wi,3,4,"a",1,bi),c()),e&2&&(d(),x(n.socials))},dependencies:[M,X,l,W,m,G,D,ni]})}return i})();var li=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=r({type:i,selectors:[["app-image-dialog"]],standalone:!0,features:[s],decls:2,vars:0,consts:[["src","assets/images/profile.jpeg"]],template:function(e,n){e&1&&(o(0,"mat-dialog-content"),p(1,"img",0),c())},dependencies:[oi,ai,l],styles:["mat-dialog-content[_ngcontent-%COMP%]{overflow:hidden;height:100%;width:100%;max-width:100%;max-height:100%;padding:16px}mat-dialog-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain;border-radius:16px}"]})}return i})();function Ii(i,a){if(i&1){let t=V();g(0),o(1,"div",1)(2,"img",2),F("click",function(){O(t);let n=f();return z(n.profilePictureClicked())}),c()(),_()}}var hi=(()=>{class i{dialog=E(ei);skills=[{name:"Angular",imageUrl:"https://cdn.svgporn.com/logos/angular-icon.svg"},{name:".NET Core",imageUrl:"https://cdn.svgporn.com/logos/dotnet.svg"},{name:"Azure DevOps",imageUrl:"https://cdn.svgporn.com/logos/microsoft-azure.svg"},{name:"Flutter",imageUrl:"https://cdn.svgporn.com/logos/flutter.svg"},{name:"Docker",imageUrl:"https://cdn.svgporn.com/logos/docker-icon.svg"},{name:"Firebase",imageUrl:"https://cdn.svgporn.com/logos/firebase.svg"}];profilePictureClicked(){this.dialog.open(li,{maxWidth:"100%",maxHeight:"100%",width:"fit-content",height:"60%"})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=r({type:i,selectors:[["app-about-header"]],standalone:!0,features:[s],decls:1,vars:0,consts:[[4,"transloco"],[1,"flex","justify-center","items-center","w-full"],["matRipple","","src","assets/images/profile.jpeg",1,"rounded-full","w-[250px]","mat-elevation-z4","cursor-pointer",3,"click"]],template:function(e,n){e&1&&h(0,Ii,3,0,"ng-container",0)},dependencies:[y,di,m,b,ci,l,S,$],styles:[".button-logo[_ngcontent-%COMP%]{margin:.5rem;width:24px;height:24px}"]})}return i})();function xi(i,a){if(i&1&&(g(0),o(1,"div",1),p(2,"app-about-header"),o(3,"mat-card",2)(4,"mat-card-header")(5,"mat-card-title",3)(6,"h2",4),v(7),c(),p(8,"app-about-socials"),c()(),o(9,"mat-card-content"),p(10,"app-about-content"),c()()(),_()),i&2){let t=a.$implicit;d(7),k(" ",t("about.greeting")," \u{1F44B} ")}}var pe=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=r({type:i,selectors:[["app-about"]],standalone:!0,features:[s],decls:1,vars:0,consts:[[4,"transloco"],[1,"page-container","mt-4"],["appearance","outlined",1,"mt-4"],[1,"flex","flex-col","items-center","justify-center","w-full","mb-8","mt-4","gap-4"],[1,"text-center","emoji-color-primary","mb-2"]],template:function(e,n){e&1&&h(0,xi,11,1,"ng-container",0)},dependencies:[m,b,y,Y,ii,ti,J,hi,ri,l,M,D,si],styles:["mat-card-header[_ngcontent-%COMP%]{padding-right:0;border:0}"]})}return i})();export{pe as AboutComponent};
