import{$a as K,Ba as W,Ga as me,Ib as m,Jb as f,U as he,V as fe,X as w,Y as De,Za as F,_ as L,aa as _,ba as B,db as X,ga as ge,ha as T,ia as Z,ib as q,oc as Ce,rc as Fe,ya as pe}from"./chunk-TUM6ZO74.js";var Ie=null;function J(){return Ie}function tn(e){Ie??=e}var Ee=class{};var ue=new L(""),ae=(()=>{let t=class t{historyGo(n){throw new Error("")}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=w({token:t,factory:()=>B(Pe),providedIn:"platform"});let e=t;return e})(),nn=new L(""),Pe=(()=>{let t=class t extends ae{constructor(){super(),this._doc=B(ue),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return J().getBaseHref(this._doc)}onPopState(n){let i=J().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",n,!1),()=>i.removeEventListener("popstate",n)}onHashChange(n){let i=J().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",n,!1),()=>i.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,i,r){this._history.pushState(n,i,r)}replaceState(n,i,r){this._history.replaceState(n,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=w({token:t,factory:()=>new t,providedIn:"platform"});let e=t;return e})();function ce(e,t){if(e.length==0)return t;if(t.length==0)return e;let s=0;return e.endsWith("/")&&s++,t.startsWith("/")&&s++,s==2?e+t.substring(1):s==1?e+t:e+"/"+t}function ye(e){let t=e.match(/#|\?|$/),s=t&&t.index||e.length,n=s-(e[s-1]==="/"?1:0);return e.slice(0,n)+e.slice(s)}function S(e){return e&&e[0]!=="?"?"?"+e:e}var G=(()=>{let t=class t{historyGo(n){throw new Error("")}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=w({token:t,factory:()=>B(ke),providedIn:"root"});let e=t;return e})(),Me=new L(""),ke=(()=>{let t=class t extends G{constructor(n,i){super(),this._platformLocation=n,this._removeListenerFns=[],this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??B(ue).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return ce(this._baseHref,n)}path(n=!1){let i=this._platformLocation.pathname+S(this._platformLocation.search),r=this._platformLocation.hash;return r&&n?`${i}${r}`:i}pushState(n,i,r,o){let u=this.prepareExternalUrl(r+S(o));this._platformLocation.pushState(n,i,u)}replaceState(n,i,r,o){let u=this.prepareExternalUrl(r+S(o));this._platformLocation.replaceState(n,i,u)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}};t.\u0275fac=function(i){return new(i||t)(_(ae),_(Me,8))},t.\u0275prov=w({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),rn=(()=>{let t=class t extends G{constructor(n,i){super(),this._platformLocation=n,this._baseHref="",this._removeListenerFns=[],i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}path(n=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(n){let i=ce(this._baseHref,n);return i.length>0?"#"+i:i}pushState(n,i,r,o){let u=this.prepareExternalUrl(r+S(o));u.length==0&&(u=this._platformLocation.pathname),this._platformLocation.pushState(n,i,u)}replaceState(n,i,r,o){let u=this.prepareExternalUrl(r+S(o));u.length==0&&(u=this._platformLocation.pathname),this._platformLocation.replaceState(n,i,u)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}};t.\u0275fac=function(i){return new(i||t)(_(ae),_(Me,8))},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Ne=(()=>{let t=class t{constructor(n){this._subject=new pe,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=n;let i=this._locationStrategy.getBaseHref();this._basePath=Ue(ye(we(i))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,i=""){return this.path()==this.normalize(n+S(i))}normalize(n){return t.stripTrailingSlash(xe(this._basePath,we(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,i="",r=null){this._locationStrategy.pushState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+S(i)),r)}replaceState(n,i="",r=null){this._locationStrategy.replaceState(r,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+S(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",i){this._urlChangeListeners.forEach(r=>r(n,i))}subscribe(n,i,r){return this._subject.subscribe({next:n,error:i,complete:r})}};t.normalizeQueryParams=S,t.joinWithSlash=ce,t.stripTrailingSlash=ye,t.\u0275fac=function(i){return new(i||t)(_(G))},t.\u0275prov=w({token:t,factory:()=>$e(),providedIn:"root"});let e=t;return e})();function $e(){return new Ne(_(G))}function xe(e,t){if(!e||!t.startsWith(e))return t;let s=t.substring(e.length);return s===""||["/",";","?","#"].includes(s[0])?s:t}function we(e){return e.replace(/\/index.html$/,"")}function Ue(e){if(new RegExp("^(https?:)?//").test(e)){let[,s]=e.split(/\/\/[^\/]+/);return s}return e}var g=function(e){return e[e.Format=0]="Format",e[e.Standalone=1]="Standalone",e}(g||{}),d=function(e){return e[e.Narrow=0]="Narrow",e[e.Abbreviated=1]="Abbreviated",e[e.Wide=2]="Wide",e[e.Short=3]="Short",e}(d||{}),p=function(e){return e[e.Short=0]="Short",e[e.Medium=1]="Medium",e[e.Long=2]="Long",e[e.Full=3]="Full",e}(p||{}),I={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function ze(e){return m(e)[f.LocaleId]}function Ve(e,t,s){let n=m(e),i=[n[f.DayPeriodsFormat],n[f.DayPeriodsStandalone]],r=C(i,t);return C(r,s)}function je(e,t,s){let n=m(e),i=[n[f.DaysFormat],n[f.DaysStandalone]],r=C(i,t);return C(r,s)}function Ge(e,t,s){let n=m(e),i=[n[f.MonthsFormat],n[f.MonthsStandalone]],r=C(i,t);return C(r,s)}function He(e,t){let n=m(e)[f.Eras];return C(n,t)}function P(e,t){let s=m(e);return C(s[f.DateFormat],t)}function k(e,t){let s=m(e);return C(s[f.TimeFormat],t)}function N(e,t){let n=m(e)[f.DateTimeFormat];return C(n,t)}function H(e,t){let s=m(e),n=s[f.NumberSymbols][t];if(typeof n>"u"){if(t===I.CurrencyDecimal)return s[f.NumberSymbols][I.Decimal];if(t===I.CurrencyGroup)return s[f.NumberSymbols][I.Group]}return n}function Be(e){if(!e[f.ExtraData])throw new Error(`Missing extra locale data for the locale "${e[f.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)}function Ye(e){let t=m(e);return Be(t),(t[f.ExtraData][2]||[]).map(n=>typeof n=="string"?Q(n):[Q(n[0]),Q(n[1])])}function Ze(e,t,s){let n=m(e);Be(n);let i=[n[f.ExtraData][0],n[f.ExtraData][1]],r=C(i,t)||[];return C(r,s)||[]}function C(e,t){for(let s=t;s>-1;s--)if(typeof e[s]<"u")return e[s];throw new Error("Locale data API: locale data undefined")}function Q(e){let[t,s]=e.split(":");return{hours:+t,minutes:+s}}var We=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,$={},Ke=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,b=function(e){return e[e.Short=0]="Short",e[e.ShortGMT=1]="ShortGMT",e[e.Long=2]="Long",e[e.Extended=3]="Extended",e}(b||{}),c=function(e){return e[e.FullYear=0]="FullYear",e[e.Month=1]="Month",e[e.Date=2]="Date",e[e.Hours=3]="Hours",e[e.Minutes=4]="Minutes",e[e.Seconds=5]="Seconds",e[e.FractionalSeconds=6]="FractionalSeconds",e[e.Day=7]="Day",e}(c||{}),a=function(e){return e[e.DayPeriods=0]="DayPeriods",e[e.Days=1]="Days",e[e.Months=2]="Months",e[e.Eras=3]="Eras",e}(a||{});function Xe(e,t,s,n){let i=st(e);t=A(s,t)||t;let o=[],u;for(;t;)if(u=Ke.exec(t),u){o=o.concat(u.slice(1));let y=o.pop();if(!y)break;t=y}else{o.push(t);break}let h=i.getTimezoneOffset();n&&(h=Re(n,h),i=rt(i,n,!0));let v="";return o.forEach(y=>{let M=nt(y);v+=M?M(i,s,h):y==="''"?"'":y.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),v}function j(e,t,s){let n=new Date(0);return n.setFullYear(e,t,s),n.setHours(0,0,0),n}function A(e,t){let s=ze(e);if($[s]??={},$[s][t])return $[s][t];let n="";switch(t){case"shortDate":n=P(e,p.Short);break;case"mediumDate":n=P(e,p.Medium);break;case"longDate":n=P(e,p.Long);break;case"fullDate":n=P(e,p.Full);break;case"shortTime":n=k(e,p.Short);break;case"mediumTime":n=k(e,p.Medium);break;case"longTime":n=k(e,p.Long);break;case"fullTime":n=k(e,p.Full);break;case"short":let i=A(e,"shortTime"),r=A(e,"shortDate");n=x(N(e,p.Short),[i,r]);break;case"medium":let o=A(e,"mediumTime"),u=A(e,"mediumDate");n=x(N(e,p.Medium),[o,u]);break;case"long":let h=A(e,"longTime"),v=A(e,"longDate");n=x(N(e,p.Long),[h,v]);break;case"full":let y=A(e,"fullTime"),M=A(e,"fullDate");n=x(N(e,p.Full),[y,M]);break}return n&&($[s][t]=n),n}function x(e,t){return t&&(e=e.replace(/\{([^}]+)}/g,function(s,n){return t!=null&&n in t?t[n]:s})),e}function E(e,t,s="-",n,i){let r="";(e<0||i&&e<=0)&&(i?e=-e+1:(e=-e,r=s));let o=String(e);for(;o.length<t;)o="0"+o;return n&&(o=o.slice(o.length-t)),r+o}function qe(e,t){return E(e,3).substring(0,t)}function D(e,t,s=0,n=!1,i=!1){return function(r,o){let u=Je(e,r);if((s>0||u>-s)&&(u+=s),e===c.Hours)u===0&&s===-12&&(u=12);else if(e===c.FractionalSeconds)return qe(u,t);let h=H(o,I.MinusSign);return E(u,t,h,n,i)}}function Je(e,t){switch(e){case c.FullYear:return t.getFullYear();case c.Month:return t.getMonth();case c.Date:return t.getDate();case c.Hours:return t.getHours();case c.Minutes:return t.getMinutes();case c.Seconds:return t.getSeconds();case c.FractionalSeconds:return t.getMilliseconds();case c.Day:return t.getDay();default:throw new Error(`Unknown DateType value "${e}".`)}}function l(e,t,s=g.Format,n=!1){return function(i,r){return Qe(i,r,e,t,s,n)}}function Qe(e,t,s,n,i,r){switch(s){case a.Months:return Ge(t,i,n)[e.getMonth()];case a.Days:return je(t,i,n)[e.getDay()];case a.DayPeriods:let o=e.getHours(),u=e.getMinutes();if(r){let v=Ye(t),y=Ze(t,i,n),M=v.findIndex(R=>{if(Array.isArray(R)){let[Y,O]=R,de=o>=Y.hours&&u>=Y.minutes,le=o<O.hours||o===O.hours&&u<O.minutes;if(Y.hours<O.hours){if(de&&le)return!0}else if(de||le)return!0}else if(R.hours===o&&R.minutes===u)return!0;return!1});if(M!==-1)return y[M]}return Ve(t,i,n)[o<12?0:1];case a.Eras:return He(t,n)[e.getFullYear()<=0?0:1];default:let h=s;throw new Error(`unexpected translation type ${h}`)}}function U(e){return function(t,s,n){let i=-1*n,r=H(s,I.MinusSign),o=i>0?Math.floor(i/60):Math.ceil(i/60);switch(e){case b.Short:return(i>=0?"+":"")+E(o,2,r)+E(Math.abs(i%60),2,r);case b.ShortGMT:return"GMT"+(i>=0?"+":"")+E(o,1,r);case b.Long:return"GMT"+(i>=0?"+":"")+E(o,2,r)+":"+E(Math.abs(i%60),2,r);case b.Extended:return n===0?"Z":(i>=0?"+":"")+E(o,2,r)+":"+E(Math.abs(i%60),2,r);default:throw new Error(`Unknown zone width "${e}"`)}}}var et=0,V=4;function tt(e){let t=j(e,et,1).getDay();return j(e,0,1+(t<=V?V:V+7)-t)}function Le(e){let t=e.getDay(),s=t===0?-3:V-t;return j(e.getFullYear(),e.getMonth(),e.getDate()+s)}function ee(e,t=!1){return function(s,n){let i;if(t){let r=new Date(s.getFullYear(),s.getMonth(),1).getDay()-1,o=s.getDate();i=1+Math.floor((o+r)/7)}else{let r=Le(s),o=tt(r.getFullYear()),u=r.getTime()-o.getTime();i=1+Math.round(u/6048e5)}return E(i,e,H(n,I.MinusSign))}}function z(e,t=!1){return function(s,n){let r=Le(s).getFullYear();return E(r,e,H(n,I.MinusSign),t)}}var te={};function nt(e){if(te[e])return te[e];let t;switch(e){case"G":case"GG":case"GGG":t=l(a.Eras,d.Abbreviated);break;case"GGGG":t=l(a.Eras,d.Wide);break;case"GGGGG":t=l(a.Eras,d.Narrow);break;case"y":t=D(c.FullYear,1,0,!1,!0);break;case"yy":t=D(c.FullYear,2,0,!0,!0);break;case"yyy":t=D(c.FullYear,3,0,!1,!0);break;case"yyyy":t=D(c.FullYear,4,0,!1,!0);break;case"Y":t=z(1);break;case"YY":t=z(2,!0);break;case"YYY":t=z(3);break;case"YYYY":t=z(4);break;case"M":case"L":t=D(c.Month,1,1);break;case"MM":case"LL":t=D(c.Month,2,1);break;case"MMM":t=l(a.Months,d.Abbreviated);break;case"MMMM":t=l(a.Months,d.Wide);break;case"MMMMM":t=l(a.Months,d.Narrow);break;case"LLL":t=l(a.Months,d.Abbreviated,g.Standalone);break;case"LLLL":t=l(a.Months,d.Wide,g.Standalone);break;case"LLLLL":t=l(a.Months,d.Narrow,g.Standalone);break;case"w":t=ee(1);break;case"ww":t=ee(2);break;case"W":t=ee(1,!0);break;case"d":t=D(c.Date,1);break;case"dd":t=D(c.Date,2);break;case"c":case"cc":t=D(c.Day,1);break;case"ccc":t=l(a.Days,d.Abbreviated,g.Standalone);break;case"cccc":t=l(a.Days,d.Wide,g.Standalone);break;case"ccccc":t=l(a.Days,d.Narrow,g.Standalone);break;case"cccccc":t=l(a.Days,d.Short,g.Standalone);break;case"E":case"EE":case"EEE":t=l(a.Days,d.Abbreviated);break;case"EEEE":t=l(a.Days,d.Wide);break;case"EEEEE":t=l(a.Days,d.Narrow);break;case"EEEEEE":t=l(a.Days,d.Short);break;case"a":case"aa":case"aaa":t=l(a.DayPeriods,d.Abbreviated);break;case"aaaa":t=l(a.DayPeriods,d.Wide);break;case"aaaaa":t=l(a.DayPeriods,d.Narrow);break;case"b":case"bb":case"bbb":t=l(a.DayPeriods,d.Abbreviated,g.Standalone,!0);break;case"bbbb":t=l(a.DayPeriods,d.Wide,g.Standalone,!0);break;case"bbbbb":t=l(a.DayPeriods,d.Narrow,g.Standalone,!0);break;case"B":case"BB":case"BBB":t=l(a.DayPeriods,d.Abbreviated,g.Format,!0);break;case"BBBB":t=l(a.DayPeriods,d.Wide,g.Format,!0);break;case"BBBBB":t=l(a.DayPeriods,d.Narrow,g.Format,!0);break;case"h":t=D(c.Hours,1,-12);break;case"hh":t=D(c.Hours,2,-12);break;case"H":t=D(c.Hours,1);break;case"HH":t=D(c.Hours,2);break;case"m":t=D(c.Minutes,1);break;case"mm":t=D(c.Minutes,2);break;case"s":t=D(c.Seconds,1);break;case"ss":t=D(c.Seconds,2);break;case"S":t=D(c.FractionalSeconds,1);break;case"SS":t=D(c.FractionalSeconds,2);break;case"SSS":t=D(c.FractionalSeconds,3);break;case"Z":case"ZZ":case"ZZZ":t=U(b.Short);break;case"ZZZZZ":t=U(b.Extended);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":t=U(b.ShortGMT);break;case"OOOO":case"ZZZZ":case"zzzz":t=U(b.Long);break;default:return null}return te[e]=t,t}function Re(e,t){e=e.replace(/:/g,"");let s=Date.parse("Jan 01, 1970 00:00:00 "+e)/6e4;return isNaN(s)?t:s}function it(e,t){return e=new Date(e.getTime()),e.setMinutes(e.getMinutes()+t),e}function rt(e,t,s){let n=s?-1:1,i=e.getTimezoneOffset(),r=Re(t,i);return it(e,n*(r-i))}function st(e){if(Ae(e))return e;if(typeof e=="number"&&!isNaN(e))return new Date(e);if(typeof e=="string"){if(e=e.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)){let[i,r=1,o=1]=e.split("-").map(u=>+u);return j(i,r-1,o)}let s=parseFloat(e);if(!isNaN(e-s))return new Date(s);let n;if(n=e.match(We))return ot(n)}let t=new Date(e);if(!Ae(t))throw new Error(`Unable to convert "${e}" into a date`);return t}function ot(e){let t=new Date(0),s=0,n=0,i=e[8]?t.setUTCFullYear:t.setFullYear,r=e[8]?t.setUTCHours:t.setHours;e[9]&&(s=Number(e[9]+e[10]),n=Number(e[9]+e[11])),i.call(t,Number(e[1]),Number(e[2])-1,Number(e[3]));let o=Number(e[4]||0)-s,u=Number(e[5]||0)-n,h=Number(e[6]||0),v=Math.floor(parseFloat("0."+(e[7]||0))*1e3);return r.call(t,o,u,h,v),t}function Ae(e){return e instanceof Date&&!isNaN(e.valueOf())}function sn(e,t){t=encodeURIComponent(t);for(let s of e.split(";")){let n=s.indexOf("="),[i,r]=n==-1?[s,""]:[s.slice(0,n),s.slice(n+1)];if(i.trim()===t)return decodeURIComponent(r)}return null}var ne=/\s+/,Se=[],on=(()=>{let t=class t{constructor(n,i){this._ngEl=n,this._renderer=i,this.initialClasses=Se,this.stateMap=new Map}set klass(n){this.initialClasses=n!=null?n.trim().split(ne):Se}set ngClass(n){this.rawClass=typeof n=="string"?n.trim().split(ne):n}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let n=this.rawClass;if(Array.isArray(n)||n instanceof Set)for(let i of n)this._updateState(i,!0);else if(n!=null)for(let i of Object.keys(n))this._updateState(i,!!n[i]);this._applyStateDiff()}_updateState(n,i){let r=this.stateMap.get(n);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(n,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let n of this.stateMap){let i=n[0],r=n[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(n,i){n=n.trim(),n.length>0&&n.split(ne).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}};t.\u0275fac=function(i){return new(i||t)(F(W),F(X))},t.\u0275dir=T({type:t,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"},standalone:!0});let e=t;return e})();var ie=class{constructor(t,s,n,i){this.$implicit=t,this.ngForOf=s,this.index=n,this.count=i}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},un=(()=>{let t=class t{set ngForOf(n){this._ngForOf=n,this._ngForOfDirty=!0}set ngForTrackBy(n){this._trackByFn=n}get ngForTrackBy(){return this._trackByFn}constructor(n,i,r){this._viewContainer=n,this._template=i,this._differs=r,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForTemplate(n){n&&(this._template=n)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let n=this._ngForOf;if(!this._differ&&n)if(0)try{}catch{}else this._differ=this._differs.find(n).create(this.ngForTrackBy)}if(this._differ){let n=this._differ.diff(this._ngForOf);n&&this._applyChanges(n)}}_applyChanges(n){let i=this._viewContainer;n.forEachOperation((r,o,u)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new ie(r.item,this._ngForOf,-1,-1),u===null?void 0:u);else if(u==null)i.remove(o===null?void 0:o);else if(o!==null){let h=i.get(o);i.move(h,u),be(h,r)}});for(let r=0,o=i.length;r<o;r++){let h=i.get(r).context;h.index=r,h.count=o,h.ngForOf=this._ngForOf}n.forEachIdentityChange(r=>{let o=i.get(r.currentIndex);be(o,r)})}static ngTemplateContextGuard(n,i){return!0}};t.\u0275fac=function(i){return new(i||t)(F(q),F(K),F(Fe))},t.\u0275dir=T({type:t,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"},standalone:!0});let e=t;return e})();function be(e,t){e.context.$implicit=t.item}var an=(()=>{let t=class t{constructor(n,i){this._viewContainer=n,this._context=new re,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=i}set ngIf(n){this._context.$implicit=this._context.ngIf=n,this._updateView()}set ngIfThen(n){ve("ngIfThen",n),this._thenTemplateRef=n,this._thenViewRef=null,this._updateView()}set ngIfElse(n){ve("ngIfElse",n),this._elseTemplateRef=n,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(n,i){return!0}};t.\u0275fac=function(i){return new(i||t)(F(q),F(K))},t.\u0275dir=T({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"},standalone:!0});let e=t;return e})(),re=class{constructor(){this.$implicit=null,this.ngIf=null}};function ve(e,t){if(!!!(!t||t.createEmbeddedView))throw new Error(`${e} must be a TemplateRef, but received '${fe(t)}'.`)}function Oe(e,t){return new he(2100,!1)}var cn=(()=>{let t=class t{transform(n){if(n==null)return null;if(typeof n!="string")throw Oe(t,n);return n.toUpperCase()}};t.\u0275fac=function(i){return new(i||t)},t.\u0275pipe=Z({name:"uppercase",type:t,pure:!0,standalone:!0});let e=t;return e})(),ut="mediumDate",at=new L(""),ct=new L(""),dn=(()=>{let t=class t{constructor(n,i,r){this.locale=n,this.defaultTimezone=i,this.defaultOptions=r}transform(n,i,r,o){if(n==null||n===""||n!==n)return null;try{let u=i??this.defaultOptions?.dateFormat??ut,h=r??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return Xe(n,u,o||this.locale,h)}catch(u){throw Oe(t,u.message)}}};t.\u0275fac=function(i){return new(i||t)(F(Ce,16),F(at,24),F(ct,24))},t.\u0275pipe=Z({name:"date",type:t,pure:!0,standalone:!0});let e=t;return e})();var ln=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=ge({type:t}),t.\u0275inj=De({});let e=t;return e})(),dt="browser",lt="server";function ht(e){return e===dt}function hn(e){return e===lt}var fn=(()=>{let t=class t{};t.\u0275prov=w({token:t,providedIn:"root",factory:()=>ht(B(me))?new se(B(ue),window):new oe});let e=t;return e})(),se=class{constructor(t,s){this.document=t,this.window=s,this.offset=()=>[0,0]}setOffset(t){Array.isArray(t)?this.offset=()=>t:this.offset=t}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(t){this.window.scrollTo(t[0],t[1])}scrollToAnchor(t){let s=ft(this.document,t);s&&(this.scrollToElement(s),s.focus())}setHistoryScrollRestoration(t){this.window.history.scrollRestoration=t}scrollToElement(t){let s=t.getBoundingClientRect(),n=s.left+this.window.pageXOffset,i=s.top+this.window.pageYOffset,r=this.offset();this.window.scrollTo(n-r[0],i-r[1])}};function ft(e,t){let s=e.getElementById(t)||e.getElementsByName(t)[0];if(s)return s;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let n=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),i=n.currentNode;for(;i;){let r=i.shadowRoot;if(r){let o=r.getElementById(t)||r.querySelector(`[name="${t}"]`);if(o)return o}i=n.nextNode()}}return null}var oe=class{setOffset(t){}getScrollPosition(){return[0,0]}scrollToPosition(t){}scrollToAnchor(t){}setHistoryScrollRestoration(t){}},_e=class{};export{J as a,tn as b,Ee as c,ue as d,nn as e,G as f,ke as g,rn as h,Ne as i,sn as j,on as k,un as l,an as m,cn as n,dn as o,ln as p,dt as q,ht as r,hn as s,fn as t,_e as u};
