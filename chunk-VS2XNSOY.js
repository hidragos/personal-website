import{d as X}from"./chunk-BTTUQB4U.js";import{e as q,g as J,i as K}from"./chunk-KUTPWMWX.js";import{$ as I,H as U,I as $,W as z,X as c,Y as R,_ as V,ba as M,ea as N,fa as G,ga as L,ia as W,ja as v,ua as Q,va as S}from"./chunk-3ZVAZC7S.js";import"./chunk-2J4O7ELU.js";import"./chunk-LUYJJVFE.js";import{m as P,r as d}from"./chunk-F6VEFF7R.js";import{Cb as E,Db as h,Eb as x,Fb as n,Gb as i,Hb as s,Ib as f,Jb as g,Kb as j,Pb as H,Rb as _,Ub as D,Xa as k,ab as m,bc as C,cc as O,da as w,dc as y,ha as a,jc as l,kc as B,ra as A,sa as F,vb as p,xb as b}from"./chunk-TLNYMMAR.js";import"./chunk-ODN5LVDJ.js";var ot=()=>({returnObjects:!0});function nt(t,r){if(t&1&&(n(0,"p"),C(1),i()),t&2){let e=r.$implicit;m(),O(e)}}function it(t,r){if(t&1&&(f(0),n(1,"div",1),h(2,nt,2,1,"p",null,E),i(),g()),t&2){let e=r.$implicit;m(2),x(e("about.sections.intro.lines",B(0,ot)))}}var Y=(()=>{class t{tldrMode=!1;toggleTldrMode(){this.tldrMode=!this.tldrMode}static \u0275fac=function(o){return new(o||t)};static \u0275cmp=a({type:t,selectors:[["app-about-content"]],standalone:!0,features:[l],decls:1,vars:0,consts:[[4,"transloco"],[1,"content-text"]],template:function(o,u){o&1&&p(0,it,4,1,"ng-container",0)},dependencies:[v,c,M,d]})}return t})();var rt=(t,r)=>r.name;function at(t,r){if(t&1&&s(0,"mat-icon",4),t&2){let e=_().$implicit;b("svgIcon",e.svgIcon)}}function mt(t,r){if(t&1&&(n(0,"mat-icon"),C(1),i()),t&2){let e=_().$implicit;m(),y(" ",e.materialIcon," ")}}function lt(t,r){if(t&1&&(n(0,"a",1),p(1,at,1,1,"mat-icon",2)(2,mt,2,1,"mat-icon",3),i()),t&2){let e=r.$implicit;D("matTooltip",e.name),D("href",e.url,k),m(),b("ngIf",e.svgIcon),m(),b("ngIf",e.materialIcon)}}var Z=(()=>{class t{socials=[{name:"GitHub",url:"https://github.com/hidragos",svgIcon:"github"},{name:"LinkedIn",url:"https://www.linkedin.com/in/dragos-andrei-iliescu-b3005117b/",svgIcon:"linkedin"},{name:"Stack Overflow",url:"https://stackoverflow.com/users/11674485/dragos-andrei",svgIcon:"stackoverflow"},{name:"Mail",url:'mailto:hi.dragos.andrei@gmail.com"',materialIcon:"email"}];static \u0275fac=function(o){return new(o||t)};static \u0275cmp=a({type:t,selectors:[["app-about-socials"]],standalone:!0,features:[l],decls:3,vars:0,consts:[[1,"flex","flex-row","gap-6","justify-center"],["mat-icon-button","","color","primary","target","_blank",3,"matTooltip","href"],[3,"svgIcon",4,"ngIf"],[4,"ngIf"],[3,"svgIcon"]],template:function(o,u){o&1&&(n(0,"div",0),h(1,lt,3,4,"a",1,rt),i()),o&2&&(m(),x(u.socials))},dependencies:[I,V,c,z,d,P,S,Q]})}return t})();var tt=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275cmp=a({type:t,selectors:[["app-image-dialog"]],standalone:!0,features:[l],decls:2,vars:0,consts:[["src","assets/images/profile.jpeg"]],template:function(o,u){o&1&&(n(0,"mat-dialog-content"),s(1,"img",0),i())},dependencies:[K,J,c],styles:["mat-dialog-content[_ngcontent-%COMP%]{overflow:hidden;height:100%;width:100%;max-width:100%;max-height:100%;padding:16px}mat-dialog-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain;border-radius:16px}"]})}return t})();function ct(t,r){if(t&1){let e=j();f(0),n(1,"div",1)(2,"img",2),H("click",function(){A(e);let u=_();return F(u.profilePictureClicked())}),i()(),g()}}var et=(()=>{class t{dialog=w(q);skills=[{name:"Angular",imageUrl:"https://cdn.svgporn.com/logos/angular-icon.svg"},{name:".NET Core",imageUrl:"https://cdn.svgporn.com/logos/dotnet.svg"},{name:"Azure DevOps",imageUrl:"https://cdn.svgporn.com/logos/microsoft-azure.svg"},{name:"Flutter",imageUrl:"https://cdn.svgporn.com/logos/flutter.svg"},{name:"Docker",imageUrl:"https://cdn.svgporn.com/logos/docker-icon.svg"},{name:"Firebase",imageUrl:"https://cdn.svgporn.com/logos/firebase.svg"}];profilePictureClicked(){this.dialog.open(tt,{maxWidth:"100%",maxHeight:"100%",width:"fit-content",height:"60%"})}static \u0275fac=function(o){return new(o||t)};static \u0275cmp=a({type:t,selectors:[["app-about-header"]],standalone:!0,features:[l],decls:1,vars:0,consts:[[4,"transloco"],[1,"flex","justify-center","items-center","w-full"],["matRipple","","src","assets/images/profile.jpeg",1,"rounded-full","w-[250px]","mat-elevation-z4","cursor-pointer",3,"click"]],template:function(o,u){o&1&&p(0,ct,3,0,"ng-container",0)},dependencies:[v,X,d,M,R,c,$,U],styles:[".button-logo[_ngcontent-%COMP%]{margin:.5rem;width:24px;height:24px}"]})}return t})();function pt(t,r){if(t&1&&(f(0),n(1,"div",1),s(2,"app-about-header"),n(3,"mat-card",2)(4,"mat-card-header")(5,"mat-card-title",3)(6,"h2",4),C(7),i(),s(8,"app-about-socials"),i()(),n(9,"mat-card-content"),s(10,"app-about-content"),i()()(),g()),t&2){let e=r.$implicit;m(7),y(" ",e("about.greeting")," \u{1F44B} ")}}var oe=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275cmp=a({type:t,selectors:[["app-about"]],standalone:!0,features:[l],decls:1,vars:0,consts:[[4,"transloco"],[1,"page-container","pt-4"],["appearance","outlined",1,"mt-4"],[1,"flex","flex-col","items-center","justify-center","w-full","mb-8","mt-4","gap-4"],[1,"text-center","mb-2","emoji-color-primary"]],template:function(o,u){o&1&&p(0,pt,11,1,"ng-container",0)},dependencies:[d,M,v,N,L,W,G,et,Y,c,I,S,Z],styles:["mat-card-header[_ngcontent-%COMP%]{padding-right:0;border:0}"]})}return t})();export{oe as AboutComponent};