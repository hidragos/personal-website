import{b as N}from"./chunk-6K227B3A.js";import{a as J}from"./chunk-4JM77DEA.js";import{b as G}from"./chunk-ASZLFFAX.js";import{a as Q,b as u,c as U,e as Y}from"./chunk-S2EGJNVF.js";import"./chunk-X5YLR3NI.js";import{e as O,m as g,u as V,v as q,w as L,z as K}from"./chunk-UTXEXKJQ.js";import{C as z,I as T,M as P,O as E,Q as j}from"./chunk-DNSHJFD5.js";import"./chunk-WXI33M2S.js";import{b as R,d as H,h as I}from"./chunk-FPD7F3TA.js";import{g as k}from"./chunk-IIQSA42B.js";import{o as x,p as _}from"./chunk-YYXHG7V6.js";import{Cb as l,Db as s,Eb as f,Tb as M,Ub as F,Vb as C,Wa as y,Xa as S,Xb as d,Yb as A,Zb as h,_a as n,ac as w,da as r,fc as b,ha as v,hc as B,sc as D,ub as m}from"./chunk-5BPRXVO3.js";import{a as p,i as a}from"./chunk-ODN5LVDJ.js";var W=["editor"],St=(()=>{class c{editor;articleService=r(J);route=r(R);formBuilder=r(V);matDialog=r(O);router=r(H);snackBar=r(G);sanitizer=r(k);cdRef=r(D);supabaseAuthService=r(Y);get article(){return this._article}set article(t){this.sanitizeHtml(t),this._article=t}_article={};editorInitialized=!1;articleForm;init={plugins:"lists link image table code wordcount",navbar:!1,statusbar:!1,setup:t=>{t.on("init",()=>{setTimeout(()=>{this.editorInitialized=!0,this.cdRef.detectChanges()},250)})}};editorApiKey=U.tinyMicApiKeys;errorMessages=[];id=+this.route.snapshot.params.id;get content(){return this.articleForm.get("content")}get title(){return this.articleForm.get("title")}ngOnInit(){this.id=+this.route.snapshot.params.id,this.getArticle(!0)}initializeData(){return a(this,null,function*(){})}back(t=!1){return a(this,null,function*(){this.articleForm.dirty&&!t&&!(yield this.matDialog.open(u,{data:{title:"Unsaved changes",text:"Are you sure you want to leave this page?",confirmText:"Leave"}}).afterClosed().toPromise())||this.router.navigate(["/blog"])})}createForm(t={}){this.articleForm=this.formBuilder.group({title:[t?.title,g.required],content:[t?.content,g.required]})}getArticle(t=!1){return a(this,null,function*(){if(!this.id){this.createForm();return}let e=(yield this.articleService.get(this.id)).data?.[0];e&&(this.article=e??{},t&&this.createForm(e))})}sanitizeHtml(t){t.contentSafeHtml=this.sanitizer.bypassSecurityTrustHtml(t.content||"")}onDelete(){return a(this,null,function*(){(yield this.matDialog.open(u).afterClosed().toPromise())&&(yield this.articleService.delete(this.id),this.openSnackBar("Article deleted"),this.back(!0))})}onRestore(){return a(this,null,function*(){(yield this.matDialog.open(u,{data:{title:"Restore article",text:"Are you sure you want to restore this article?",confirmText:"Restore"}}).afterClosed().toPromise())&&(yield this.getArticle(!0),this.openSnackBar("Article restored"))})}openSnackBar(t){this.snackBar.open(t,"")}onSubmit(){return a(this,null,function*(){this.errorMessages=[],this.articleForm.get("title")?.patchValue(this.title?.value?.trim()),this.articleForm.get("content")?.patchValue(this.content?.value?.trim());let t=this.articleForm.errors;if(t&&(this.errorMessages=Object.keys(t).map(e=>t[e])),!this.articleForm.invalid){if(this.article.title=this.title?.value,this.article.content=this.content?.value,this.id)yield this.articleService.put(this.id,this.articleForm.value),this.openSnackBar("Article saved");else{let e=yield this.articleService.post(this.articleForm.value);e&&(this.id=e.data?.[0].id),this.router.navigate(["/blog/"+this.id+"/edit"]),this.openSnackBar("Article created")}this.articleForm.reset(this.articleForm.value)}})}toggleEdit(){this.articleForm.dirty&&(this.article=p(p({},this.articleForm.value),this.article))}static \u0275fac=function(e){return new(e||c)};static \u0275cmp=v({type:c,selectors:[["app-blog-article"]],viewQuery:function(e,i){if(e&1&&M(W,5),e&2){let o;F(o=C())&&(i.editor=o.first)}},standalone:!0,features:[w],decls:14,vars:9,consts:[[1,"h-full",3,"appearance"],[1,"flex","flex-col","justify-start","gap-4","mb-16","w-full"],[1,"flex","page-title","justify-start"],[1,"flex","flex-row","items","gap-2","items-center","text-ellipsis"],[1,"rounded-full","w-16","mat-elevation-z2",3,"src"],[1,"flex","flex-col"],[1,"font-light","text-sm"],[1,"content-text",3,"innerHTML"]],template:function(e,i){if(e&1&&(l(0,"mat-card",0)(1,"mat-card-content")(2,"div",1)(3,"h1",2),d(4),s(),l(5,"div",3),f(6,"img",4),l(7,"div",5)(8,"span"),d(9),s(),l(10,"span",6),d(11),b(12,"date"),s()()()(),f(13,"div",7),s()()),e&2){let o;m("appearance","outlined"),n(4),h(" ",i.article.title," "),n(2),m("src",i.article.profiles==null?null:i.article.profiles.avatar_url,S),n(3),A((o=i.article.profiles==null?null:i.article.profiles.full_name)!==null&&o!==void 0?o:i.article.profiles==null?null:i.article.profiles.email),n(2),h(" ",B(12,6,i.article.inserted_at,"longDate")," "),n(2),m("innerHTML",i.article.contentSafeHtml,y)}},dependencies:[K,q,T,z,N,L,_,x,j,P,E,Q,I],styles:["mat-card-content[_ngcontent-%COMP%]{padding-bottom:0!important}mat-card-header[_ngcontent-%COMP%]{border:0px!important}"]})}return c})();export{St as BlogArticleComponent};
