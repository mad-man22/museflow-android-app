const __jsExtractorGlobal = typeof globalThis !== 'undefined' ? globalThis :
  typeof self !== 'undefined' ? self :
  typeof window !== 'undefined' ? window :
  typeof global !== 'undefined' ? global : {};

const exportedVars = (function(g) {
  const window = typeof __jsExtractorGlobal.window !== 'undefined' ? __jsExtractorGlobal.window : Object.create(null);
  const document = typeof __jsExtractorGlobal.document !== 'undefined' ? __jsExtractorGlobal.document : {};
  const self = typeof __jsExtractorGlobal.self !== 'undefined' ? __jsExtractorGlobal.self : window;

  var Zs, pM, CM, TP, wh, nc, qFt, pd9, Hi, WiE, MQ, VG, fZ, x$E, a2, Cv1, Ec, Uc, Oc, U$2, E52, fxY, VvS, xS2, c9m, $bE, X6, xw, qr, D9, ZBw, YA, gK, TC, iVS, xp9, ll, eu, Oy, Q8, pf, b9, BJ, Se, F6, aK, Up, b_, L6m, LS, xR, Fl, MI, GA, kS, hS, EgR, aNE, wF, TX, QM, bZ, DF1, Ch, fP, jc, pP, ql, FM, w$, mo, Mr, LiI, nSQ, wE7, qW, aQ, gF, m0m, qL9, Lt, $4, ZJ, ZT2, Jd, lRa, Aui, Ju1, eU, e3q, koq, hd, cG, R3R, Ii, XZ1, zX, sS, fRS, mh, Gom, bT9, TAw, WG, wZa, Bo, Nh, fy, xk, Cy, zy, swt, gLE, WUE, BG, td, M1, hl, vo, hK, co, Zh, uE, zY, $0, o0, t6a, h3w, vLi, FT, ph, jM, z3S, Ri, cu1, YLw, z9, TqK, rF, Qwt, GO, SLw, yua, ELY, IiR, Cpm, MSm, pZ9, ABR, GX, VSY, x0a, Uj, y1, O7w, bj, UR, GC, yE, dpw, OR, fNS, NM2, t1, Ms, Vz, Dg, Zg, F82, e_9, h0, oA, cBt, g5, C7, at, zu, NT, DA, MA, va, Bat, i0, rW, i9, MS, $t, uoE, Y8, Pa, Kz, AD, gD, ZL, JD, Ha, ca, nz, Ba, $FS, JR, HB9, M62, F3R, V6q, zha, JBS, FUw, m2, jq, UIE, lD, Ra, Jm1, ZVa, XQ, o59, cmR, B9R, liE, eht, R2, kw9, xAa, In, q2, jv, aIE, FU, Ela, Vk, DP, Vc, feR, YZ, WV, RA, tYa, ARm, Rj, J0, JRw, uuR, BOq, $AS, OG, rH, P11, dH, Mq, Z6w, vi, MYm, DAw, t0, da, IA, VY1, C91, NWY, e3, qyw, qF, s5, Ck, iet, hf, kbS, B0, R4, rDE, IK, Syq, F3, mC, KRa, gUq, G1, kAq, rE, dE, lei, A3w, tr, r3E, XQ1, i7a, Ar, erw, bS, n4, WS, H7w, kN, BS, c3Y, u8R, Z6, eq, $Im, cS, BWw, Z72, J3a, X3, QL, wE, hrS, RQ, T1, Ve9, jU, x4, Ct, BF, tVm, dSS, ZV, WN, Yw, ZMw, KY, sr, nY, wJ, TD, cSS, BvS, rJ, yk, bT, iT, Sa, an, JZ, lj, Anw, INi, nK, aim, Il, bB1, VE, HG, EZw, yBw, Gw2, OBm, UFY, SDi, Jni, wUm, L5, sn, bN, Tw, FRt, qDi, VVY, fi1, U0E, nLa, LUq, OTR, uj, nZY, MO, DK, QjE, wVE, Ta1, xF1, CN1, eqw, pVm, F1, H3, zia, z6, GR, Aw, Zy, Vy, Ma, Jw, hiq, hw, B3, u4, $B, oE, CHY, Bs, jU2, ul, vs, D$q, mpw, Xz, ZA, hD, tR, xU, pJR, rD, dD, uz, SMi, G0w, Ok, iE, tl, KE, OnS, Hs, bnS, fx, al, Sk, K89, W8q, YM1, w6S, ngY, NO, Cx, px, IRw, L8S, sUi, jW, $A, NW, KXE, SX, EJ, KB, az, xTq, aE9, ERi, UT9, wQ, GS, bw, ya, C_w, fEi, jR, $E, lS, Ie9, qI, oo, rv, je, qb;

  //#region --- start [nsigFunction] ---
  var z = "toString;reverse;length;X;local;cE;;call;/api/manifest;splice;match;1;Gt;url;sp;N;path;BN;fallback_count;set;indexOf;split;{,{(/(;push;fromCharCode;W;/videoplayback;scheme;get;://;FV;mn;n;slice;\\.googlevideo\\.com$;cmo=td;file;1969-12-31T14:45:03.000-09:15;pop;s;join;/initplayback;rr;www.youtube.com;index.m3u8;dOVz2-u;startsWith;xV;cmo;PU;undefined;fvip;redirector.googlevideo.com;clone;,;1970-01-01T07:45:31.000+07:45;signatureCipher;Z;r;unshift;Y;forEach;replace;https://local;//;\\.a1\\.googlevideo\\.com$;=;Rq1HPFG-KMgmKEB597-_w8_;L3;cmo=pf;http://local;&;Untrusted URL;/file/index.m3u8;/;playerfallback;assign;youtube.player.web_20260628_05_RC00;a1.googlevideo.com;%3D;rr?[1-9].*\\.c\\.youtube\\.com$".split(";");
  var IM = {xV:function(M,D){M[z[9]](0,D)},
PU:function(M,D){var V=M[0];M[0]=M[D%M[z[2]]];M[D%M[z[2]]]=V},
cE:function(M){M[z[1]]()}};
  g.SM = class extends Error{constructor(M,...D){super(M);this.args=[...D];Object.setPrototypeOf(this,new.target.prototype)}};
  var Biq = RegExp("^((http(s)?):)?\\/\\/((((lh[3-6](-tt|-d[a-g,z])?\\.((ggpht)|(googleusercontent)|(google)|(sandbox\\.google)))|(lh7\\-(eu|us|qw|rt|xx)\\.((googleusercontent)|(google)))|((photos|testonly|work)\\.fife\\.usercontent\\.google)|([\\w\\-]+\\.fife\\.usercontent\\.google)|(([1-4]\\.bp\\.blogspot)|(bp[0-3]\\.blogger))|(ccp-lh\\.googleusercontent)|((((cp|ci|gp)[3-6])|(ap[1-2]))\\.(ggpht|googleusercontent))|(gm[1-4]\\.ggpht)|(play-(ti-)?lh\\.googleusercontent)|(gz[0-1]\\.googleusercontent)|(lh3\\-gm\\.google)|(((yt[3-4])|(sp[1-3]))\\.(ggpht|googleusercontent)))\\.com)|(drive\\.google\\.com\\/drive\\-(usercontent|viewer))|(dp[3-6]\\.googleusercontent\\.cn)|(dp4\\.googleusercontent\\.com)|((photos|drive|contribution)\\-image\\-(dev|qa)(-us|-eu)?(-auth|-cookie)?\\.corp\\.google\\.com)|(photos\\-image\\-dev\\-dl\\-(auth|eu|us)\\.corp\\.google\\.com)|((dev|dev2|dev3|qa|qa2|qa3|qa-red|qa-blue|canary)[-.]lighthouse\\.sandbox\\.google\\.com\\/image)|(image\\-(dev|qa)\\-lighthouse(-auth)?\\.sandbox\\.google\\.com(\\/image)?)|(drive\\-qa\\.corp\\.google\\.com\\/drive\\-(usercontent|viewer))|(docs(\\-(dev|qa)\\.corp)?\\.google\\.com\\/(u\\/[0-9]+\\/)?(docs|sheets|slides|drawings|forms|videos|pictures)\\-images\\-(rt|qw))|(docs\\.sandbox\\.google\\.com\\/(u\\/[0-9]+\\/)?(docs|sheets|slides|drawings|forms|videos|pictures)\\-images)|(sites\\.google\\.com\\/(u\\/[0-9]+\\/)?sites(v)?\\-images\\-(rt|qw))|(atari-green-test\\.corp\\.google\\.com\\/(u\\/[0-9]+\\/)?sites(v)?\\-images\\-(rt|qw))|(sites\\.sandbox\\.google\\.com\\/(u\\/[0-9]+\\/)?sites(v)?\\-images))\\/|^https://([A-Za-z0-9-]{1,63}\\.)+demos\\.corp\\.google\\.com(/(?!url\\b)|$)|^https://([A-Za-z0-9-]{1,63}\\.)+sslproxy\\.corp\\.google\\.com(/|$)|^https?://(([A-Za-z0-9-]{1,63}\\.)*(corp\\.google\\.com|proxy\\.googleprod\\.com|c\\.googlers\\.com|proxy\\.googlers\\.com|borg\\.google\\.com|docs\\.google\\.com|drive\\.google\\.com|googleplex\\.com|googlevideo\\.com|prod\\.google\\.com|lh3\\.photos\\.google\\.com|mail\\.google\\.com|youtube\\.com|yt\\.akamaized\\.net|chat\\.google\\.com)[.]?(:[0-9]+)?/|([A-Za-z0-9-]{1,63}\\.)*(sandbox\\.google\\.com)(:[0-9]+)?(/(?!url\\b)|$)|([A-Za-z0-9-]{1,63}\\.)*c\\.lh3(-d[a-gyz]|-testonly)?\\.(googleusercontent|photos\\.google)\\.com/.*$)");
  var uj1 = RegExp("^https?://([A-Za-z0-9-]{1,63}\\.)*(currents\\.google\\.com)[.]?(:[0-9]+)?/");
  var J0a = !1;
  wh = function(M,D,V){return D&&D.test(M)||J0a&&V&&V.test(M)?!0:!1};
  g.HE = {};
  var oSW = {};
  var Ek = {};
  g.f4 = function(M,D){return M in Ek?Ek[M]:D};
  pd9 = function(M,D={}){if(M=M.FI){let V=M.hgo;M=[["componentStack",M.UT],["wizTagName",M.tagName],["wizOwnerTrace",M.j_W?.join(" > ")],["errorSeverity",M.FD?.toString()],["wizFeatureFlags",V?Object.entries(V).join("\n"):void 0]];for(let [I,t]of M)M=t,M!==void 0&&(D[I]=M)}return D};
  Hi = function(M,D){M=g.f4("EXPERIMENT_FLAGS",{})[M];return M!==void 0?M:D};
  g.O = function(M,D){M=Hi(M,D);return typeof M==="string"&&M==="false"?!1:!!M};
  var FXS = [];
  var m$i = [];
  g.vE = function(M,D){M=M.split(".");D=D||g.HE;for(var V=0;V<M.length;V++)if(D=D[M[V]],D==null)return null;return D};
  VG = function(M){var D="";typeof M.toString==="function"&&(D=""+M);return D+M.stack};
  MQ = function(M,D){D||(D={});D[VG(M)]=!0;var V=M.stack||"",I=M.cause;I&&!D[VG(I)]&&(V+="\nCaused by: ",I.stack&&I.stack.indexOf(I.toString())==0||(V+=typeof I==="string"?I:I.message+"\n"),V+=MQ(I,D));M=M.errors;if(Array.isArray(M)){I=1;let t;for(t=0;t<M.length&&!(I>4);t++)D[VG(M[t])]||(V+="\nInner error "+I++ +": ",M[t].stack&&M[t].stack.indexOf(M[t].toString())==0||(V+=typeof M[t]==="string"?M[t]:M[t].message+"\n"),V+=MQ(M[t],D));t<M.length&&(V+="\n... "+(M.length-t)+" more inner errors")}return V};
  var DI = {};
  WiE = function(M){var D=g.vE("window.location.href");M==null&&(M='Unknown Error of type "null/undefined"');if(typeof M==="string")return{message:M,name:"Unknown error",lineNumber:"Not available",fileName:D,stack:"Not available"};var V=!1;try{var I=M.lineNumber||M.line||"Not available"}catch(A){I="Not available",V=!0}try{var t=M.fileName||M.filename||M.sourceURL||g.HE.$googDebugFname||D}catch(A){t="Not available",V=!0}D=MQ(M);if(!(!V&&M.lineNumber&&M.fileName&&M.stack&&M.message&&M.name)){V=M.message;
if(V==null){if(M.constructor&&M.constructor instanceof Function){if(M.constructor.name)V=M.constructor.name;else if(V=M.constructor,DI[V])V=DI[V];else{V=String(V);if(!DI[V]){let A=/function\s+([^\(]+)/m.exec(V);DI[V]=A?A[1]:"[Anonymous]"}V=DI[V]}V='Unknown Error of type "'+V+'"'}else V="Unknown Error of unknown type";typeof M.toString==="function"&&Object.prototype.toString!==M.toString&&(V+=": "+M.toString())}return{message:V,name:M.name||"UnknownError",lineNumber:I,fileName:t,stack:D||"Not available"}}return{message:M.message,
name:M.name,lineNumber:M.lineNumber,fileName:M.fileName,stack:D}};
  fZ = function(M){try{return(typeof M==="string"?M:String(JSON.stringify(M))).substr(0,500)}catch(D){return`unable to serialize ${typeof M} (${D.message})`}};
  a2 = function(M,D,V,I){V+=`.${M}`;M=fZ(D);I[V]=M;return V.length+M.length};
  Ec = function(M){var D=M(),V=D&127;if(D<128)return V;D=M();V|=(D&127)<<7;if(D<128)return V;D=M();V|=(D&127)<<14;if(D<128)return V;D=M();return D<128?V|(D&127)<<21:Infinity};
  Cv1 = function(M){var D=M.length,V=0,I=()=>M.charCodeAt(V++);
do{var t=Ec(I);if(t===Infinity)break;let A=t>>3;switch(t&7){case 0:t=Ec(I);if(A===2)return t;break;case 1:if(A===2)return;V+=8;break;case 2:t=Ec(I);if(A===2)return M.substr(V,t);V+=t;break;case 5:if(A===2)return;V+=4;break;default:return}}while(V<D)};
  x$E = function(M,D,V,I){if(M)if(Array.isArray(M)){var t=I;for(I=0;I<M.length&&!(M[I]&&(t+=a2(I,M[I],D,V),t>500));I++);I=t}else if(typeof M==="object")for(t in M){if(M[t]){a:{var A=t;var l=M[t],e=D,J=V;if(typeof l!=="string"||A!=="clickTrackingParams"&&A!=="trackingParams"){A=0;break a}A=(l=Cv1(atob(l.replace(/-/g,"+").replace(/_/g,"/"))))?a2(`${A}.ve`,l,e,J):0}I+=A;I+=a2(t,M[t],D,V);if(I>500)break}}else V[D]=fZ(M),I+=V[D].length;else V[D]=fZ(M),I+=V[D].length;return I};
  var axw = class{constructor(){this.ez=[];this.dE=[]}};
  Oc = undefined;
  U$2 = function(M){if(M.name==="JavaException")return!0;M=M.stack;return M.includes("chrome://")||M.includes("-extension://")||M.includes("webkit-masked-url://")};
  E52 = function(M){if(!M.stack)return!0;var D=!M.stack.includes("\n");return D&&M.stack.includes("ErrorType: ")||D&&M.stack.includes("Anonymous function (Unknown script")||M.stack.toLowerCase()==="not available"||M.fileName==="user-script"||M.fileName.startsWith("user-script:")?!0:!1};
  var N9a = {};
  fxY = function(M,D){D.dE&&M.dE.unshift.apply(M.dE,D.dE);D.ez&&M.ez.unshift.apply(M.ez,D.ez)};
  Uc = function(){if(!Oc){var M=Oc=new axw;M.dE.length=0;M.ez.length=0;fxY(M,N9a)}return Oc};
  var Mvi = [];
  var qs = {};
  var pZ = class{constructor(M,D){this.W=M===qs&&D||""}toString(){return this.W}};
  g.v6 = function(){this.XE=this.XE;this.d0=this.d0};
  g.UB = function(M){g.v6.call(this);this.G=1;this.N=[];this.Z=0;this.W=[];this.X={};this.j=!!M};
  g.K = g.UB.prototype;
  g.K.subscribe = function(M,D,V){var I=this.X[M];I||(I=this.X[M]=[]);var t=this.G;this.W[t]=M;this.W[t+1]=D;this.W[t+2]=V;this.G=t+3;I.push(t);return t};
  g.K.unsubscribe = function(M,D,V){if(M=this.X[M]){let I=this.W;if(M=M.find(function(t){return I[t+1]==D&&I[t+2]==V}))return this.s0(M)}return!1};
  g.Db = function(M,D){return Array.prototype.splice.call(M,D,1).length==1};
  g.VT = function(M,D){D=Array.prototype.indexOf.call(M,D,void 0);var V;(V=D>=0)&&g.Db(M,D);return V};
  g.K.s0 = function(M){var D=this.W[M];if(D){let V=this.X[D];this.Z!=0?(this.N.push(M),this.W[M+1]=()=>{}):(V&&g.VT(V,M),delete this.W[M],delete this.W[M+1],delete this.W[M+2])}return!!D};
  X6 = function(M){g.HE.setTimeout(()=>{throw M;},0)};
  var ZoY = class{constructor(){this.next=this.scope=this.W=null}set(M,D){this.W=M;
this.scope=D;this.next=null}reset(){this.next=this.scope=this.W=null}};
  var ecw = class{constructor(M,D){this.N=M;this.Z=D;this.X=0;this.W=null}get(){if(this.X>0){this.X--;var M=this.W;this.W=M.next;M.next=null}else M=this.N();return M}put(M){this.Z(M);this.X<100&&(this.X++,M.next=this.W,this.W=M)}};
  var pY = {};
  var J9R = class{constructor(){this.X=this.W=null}add(M,D){var V=pY.get();V.set(M,D);this.X?this.X.next=V:this.W=V;this.X=V}remove(){var M=null;this.W&&(M=this.W,this.W=this.W.next,this.W||(this.X=null),M.next=null);return M}};
  xw = {};
  qr = !1;
  $bE = function(){for(var M;M=xw.remove();){try{M.W.call(M.scope)}catch(D){X6(D)}pY.put(M)}qr=!1};
  D9 = undefined;
  c9m = ()=>{var M=Promise.resolve(void 0);D9=()=>{M.then($bE)}};
  g.l4 = (M,D)=>{D9||c9m();qr||(D9(),qr=!0);xw.add(M,D)};
  xS2 = function(M,D,V){g.l4(function(){M.apply(D,V)})};
  g.K.publish = function(M,D){var V=this.X[M];if(V){let t=Array(arguments.length-1);var I=arguments.length;let A;for(A=1;A<I;A++)t[A-1]=arguments[A];if(this.j)for(A=0;A<V.length;A++)I=V[A],xS2(this.W[I+1],this.W[I+2],t);else{this.Z++;try{for(A=0,I=V.length;A<I&&!this.On();A++){let l=V[A];this.W[l+1].apply(this.W[l+2],t)}}finally{if(this.Z--,this.N.length>0&&this.Z==0)for(;V=this.N.pop();)this.s0(V)}}return A!=0}return!1};
  g.K.clear = function(M){if(M){let D=this.X[M];D&&(D.forEach(this.s0,this),delete this.X[M])}else this.W.length=0,this.X={}};
  g.K.Nc = function(){g.UB.o_.Nc.call(this);this.clear();this.N.length=0};
  var ju = {};
  var Iqw = 0;
  g.SU = function(){return{innertubeApiKey:g.f4("INNERTUBE_API_KEY"),innertubeApiVersion:g.f4("INNERTUBE_API_VERSION"),gp:g.f4("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),ao:g.f4("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),zO:g.f4("INNERTUBE_CONTEXT_CLIENT_NAME",1),innertubeContextClientVersion:g.f4("INNERTUBE_CONTEXT_CLIENT_VERSION"),dL:g.f4("INNERTUBE_CONTEXT_HL"),ll:g.f4("INNERTUBE_CONTEXT_GL"),wg:g.f4("INNERTUBE_HOST_OVERRIDE")||"",Dw:!!g.f4("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),VF:!!g.f4("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:g.f4("SERIALIZED_CLIENT_CONFIG_DATA")}};
  ZBw = function(){return"INNERTUBE_API_KEY"in Ek&&"INNERTUBE_API_VERSION"in Ek};
  g.sc = class{constructor(M){this.config_=null;M?this.config_=M:ZBw()&&(this.config_=g.SU())}isReady(){!this.config_&&ZBw()&&(this.config_=g.SU());return!!this.config_}};
  gK = window;
  g.f = undefined;
  TC = function(){var M=g.vE("_lact",window);return M==null?-1:Math.max(Date.now()-M,0)};
  var gT = {};
  iVS = function(M){gT[M]=M in gT?gT[M]+1:0;return gT[M]};
  var Ws = [];
  g.oa = function(M,D,V){M=M.split(".");V=V||g.HE;for(var I;M.length&&(I=M.shift());)M.length||D===void 0?V[I]&&V[I]!==Object.prototype[I]?V=V[I]:V=V[I]={}:V[I]=D};
  ll = function(M,D){var V=g.vE("yt.logging.transport.enableScrapingForTest"),I=Hi("il_payload_scraping");I=(I!==void 0?String(I):"")==="enable_il_payload_scraping";if(!V)if(I)Ws=[],g.oa("yt.logging.transport.enableScrapingForTest",!0),g.oa("yt.logging.transport.scrapedPayloadsForTesting",Ws),g.oa("yt.logging.transport.payloadToScrape","visualElementShown visualElementHidden visualElementAttached screenCreated visualElementGestured visualElementStateChanged".split(" ")),g.oa("yt.logging.transport.getScrapedPayloadFromClientEventsFunction"),
g.oa("yt.logging.transport.scrapeClientEvent",!0);else return;V=g.vE("yt.logging.transport.scrapedPayloadsForTesting");I=g.vE("yt.logging.transport.payloadToScrape");D&&(D=D.payload,(D=g.vE("yt.logging.transport.getScrapedPayloadFromClientEventsFunction").bind(D)())&&V.push(D));D=g.vE("yt.logging.transport.scrapeClientEvent");if(I&&I.length>=1)for(let t=0;t<I.length;t++)M&&M.payload[I[t]]&&(D?V.push(M.payload):V.push((M?.payload)[I[t]]));g.oa("yt.logging.transport.scrapedPayloadsForTesting",V)};
  var o2 = {};
  var z5 = [1,2];
  pf = function(M,D=!1){return D&&Symbol.for&&M?Symbol.for(M):M!=null?Symbol(M):Symbol()};
  var Uy = undefined;
  Q8 = function(M){return M[Uy]??(M[Uy]=new Map)};
  var jN = undefined;
  var Rt = function(M,D,V,I,t){var A=V+(t?0:-1),l=M.length-1;
if(l>=1+(t?0:-1)&&A>=l){let e=M[l];if(e!=null&&typeof e==="object"&&e.constructor===Object)return e[V]=I,D}if(A<=l)return M[A]=I,D;I!==void 0&&(l=(D??(D=M[jN]|0))>>14&1023||536870912,V>=l?I!=null&&(M[l+(t?0:-1)]={[V]:I}):M[A]=I);return D};
  var vQ = function(M,D,V,I){if(D===-1)return null;
var t=D+(V?0:-1),A=M.length-1;if(!(A<1+(V?0:-1))){if(t>=A){var l=M[A];if(l!=null&&typeof l==="object"&&l.constructor===Object){V=l[D];var e=!0}else if(t===A)V=l;else return}else V=M[t];if(I&&V!=null){I=I(V);if(I==null)return I;if(!Object.is(I,V))return e?l[D]=I:M[t]=I,I}return V}};
  b9 = function(M,D,V,I,t){var A=M.get(I);if(A!=null)return A;A=0;for(let l=0;l<I.length;l++){let e=I[l];vQ(D,e,t)!=null&&(A!==0&&(V=Rt(D,V,A,void 0,t)),A=e)}M.set(I,A);return A};
  Oy = function(M,D,V){M=M.sy;return b9(Q8(M),M,void 0,D)===V?V:-1};
  var cJ = {};
  var qT = {};
  var kU = function(M,D,V,I,t){Object.isExtensible(M);
D=vQ(M.sy,D,V,t);if(D!==null||I&&M.Z!==qT)return D};
  var SF = function(M){return M==null||typeof M==="string"?M:void 0};
  BJ = function(M,D){return SF(kU(M,D,void 0,cJ))};
  var Gc = function(M){if(M!=null&&typeof M!=="string")throw Error();
return M};
  F6 = function(M,D){return D===void 0?M.W!==qT&&!!(2&(M.sy[jN]|0)):!!(2&D)&&M.W!==qT};
  var $U = function(M,D,V){M=new M.constructor(D);
V&&(M.W=qT);M.Z=qT;return M};
  var u9 = function(M,D,V){return V&2?!0:V&32&&!(V&4096)?(D[jN]=V|2,M.W=qT,!0):!1};
  var U3 = {};
  var O3 = undefined;
  var yV = {};
  Up = function(M){if(M!==yV)throw Error("illegal external caller");};
  var QV = /[-_.]/g;
  var s$S = {"-":"+",_:"/",".":"="};
  L6m = function(M){return s$S[M]||""};
  b_ = function(M){M=QV.test(M)?M.replace(QV,L6m):M;M=atob(M);var D=new Uint8Array(M.length);for(let V=0;V<M.length;V++)D[V]=M.charCodeAt(V);return D};
  aK = function(M){Up(yV);var D=M.W;D=D==null||D!=null&&D instanceof Uint8Array?D:typeof D==="string"?b_(D):null;return D==null?D:M.W=D};
  var SN = class{isEmpty(){return this.W==null}sizeBytes(){var M=aK(this);return M?M.length:0}constructor(M,D){Up(D);this.W=M;if(M!=null&&M.length===0)throw Error("ByteString should be constructed with non-empty values");}};
  var CGR = function(M,D){if(typeof M!=="object")return M;
if(Array.isArray(M)){var V=M[jN]|0;M.length===0&&V&1?M=void 0:V&2||(!D||4096&V||16&V?M=BQ(M,V,!1,D&&!(V&16)):(M[jN]|=34,V&4&&Object.freeze(M)));return M}if(M!=null&&M[O3]===U3)return D=M.sy,V=D[jN]|0,F6(M,V)?M:u9(M,D,V)?$U(M,D):BQ(D,V);if(M instanceof SN)return M};
  var fz = undefined;
  LS = function(M){return M};
  var ycS = undefined;
  var Cf = void 0;
  Fl = function(M,D){M.__closure__error__context__984382||(M.__closure__error__context__984382={});M.__closure__error__context__984382.severity=D};
  xR = function(M,D){if(M!=null){var V=Cf??(Cf={});var I=V[M]||0;I>=D||(V[M]=I+1,M=Error(),Fl(M,"incident"),X6(M))}};
  var Oet = function(M,D){D<100||xR(ycS,1)};
  var Cz = function(M,D){for(let V in M)!isNaN(V)&&D(M,+V,M[V])};
  var aT = function(M){return M};
  MI = undefined;
  var x8 = class{};
  var beq = function(M){var D=new x8;
Cz(M,(V,I,t)=>{D[I]=[...t]});
D.M_=M.M_;return D};
  var NS = function(M){var D=LS(fz);
return D?M[D]:void 0};
  var De = function(M,D,V,I){var t=I!==void 0;
I=!!I;var A=LS(fz),l;!t&&A&&(l=M[A])&&Cz(l,Oet);A=[];var e=M.length;l=4294967295;var J=!1,Z=!!(D&64),c=Z?D&128?0:-1:void 0;if(!(D&1)){var B=e&&M[e-1];B!=null&&typeof B==="object"&&B.constructor===Object?(e--,l=e):B=void 0;!Z||D&128||t||(J=!0,l=(MI??aT)(l-c,c,M,B,void 0)+c)}D=void 0;for(var u=0;u<e;u++){let H=M[u];if(H!=null&&(H=V(H,I))!=null)if(Z&&u>=l){let R=u-c;(D??(D={}))[R]=H}else A[u]=H}if(B)for(let H in B){e=B[H];if(e==null||(e=V(e,I))==null)continue;u=+H;let R;Z&&!Number.isNaN(u)&&(R=u+c)<
l?A[R]=e:(D??(D={}))[H]=e}D&&(J?A.push(D):A[l]=D);t&&LS(fz)&&(M=NS(M))&&M instanceof x8&&(A[fz]=beq(M));return A};
  var BQ = function(M,D,V,I){I??(I=!!(34&D));
M=De(M,D,CGR,I);I=32;V&&(I|=2);D=D&16769217|I;M[jN]=D;return M};
  var zA = function(M){if(M.W!==qT)return!1;
var D=M.sy;D=BQ(D,D[jN]|0);D[jN]|=2048;M.sy=D;M.W=void 0;M.Z=void 0;return!0};
  var h3 = function(M){if(!zA(M)&&F6(M,M.sy[jN]|0))throw Error();
};
  GA = function(M,D,V,I,t){I===0||V.includes(I);var A=Q8(M),l=b9(A,M,D,V,t);l!==I&&(l&&(D=Rt(M,D,l,void 0,t)),A.set(V,I));return D};
  Se = function(M,D,V,I){h3(M);var t=M.sy,A=t[jN]|0;if(I==null){let l=Q8(t);if(b9(l,t,A,V)===D)l.set(V,0);else return M}else A=GA(t,A,V,D);Rt(t,A,D,I);return M};
  kS = function(M,D){var V=g.vE("CLOSURE_FLAGS");M=V&&V[M];return M!=null?M:D};
  var cQ = undefined;
  var NQa = undefined;
  var fb9 = function(){if(cQ)throw Error("carr");
xR(NQa,5)};
  var J3 = function(M,D,V,I=0){if(M==null){var t=32;
V?(M=[V],t|=128):M=[];D&&(t=t&-16760833|(D&1023)<<14)}else{if(!Array.isArray(M))throw Error("narr");t=M[jN]|0;if(cQ&&1&t)throw Error("rfarr");2048&t&&!(2&t)&&fb9();if(t&256)throw Error("farr");if(t&64)return(t|I)!==t&&(M[jN]=t|I),M;if(V&&(t|=128,V!==M[0]))throw Error("mid");a:{V=M;t|=64;var A=V.length;if(A){var l=A-1;let J=V[l];if(J!=null&&typeof J==="object"&&J.constructor===Object){D=t&128?0:-1;l-=D;if(l>=1024)throw Error("pvtlmt");for(var e in J)if(A=+e,A<l)V[A+D]=J[e],delete J[e];else break;t=
t&-16760833|(l&1023)<<14;break a}}if(D){e=Math.max(D,A-(t&128?0:-1));if(e>1024)throw Error("spvt");t=t&-16760833|(e&1023)<<14}}}M[jN]=t|64|I;return M};
  var EGa = {};
  var UVa = undefined;
  var q0R = undefined;
  var ptS = undefined;
  hS = function(M){M.SQ5=!0;return M};
  var V8 = undefined;
  var It = function(M){switch(typeof M){case "number":return Number.isFinite(M)?M:""+M;
case "bigint":return V8(M)?Number(M):""+M;case "boolean":return M?1:0;case "object":if(Array.isArray(M)){var D=M[jN]|0;return M.length===0&&D&1?void 0:De(M,D,It)}if(M!=null&&M[O3]===U3)return t3(M);if(M instanceof SN){D=M.W;if(D==null)M="";else if(typeof D==="string")M=D;else{let V="",I=0,t=D.length-10240;for(;I<t;)V+=String.fromCharCode.apply(null,D.subarray(I,I+=10240));V+=String.fromCharCode.apply(null,I?D.subarray(I):D);M=M.W=btoa(V)}return M}return}return M};
  var t3 = function(M){M=M.sy;
return De(M,M[jN]|0,It)};
  var A3 = function(M,D){if(D){MI=D==null||
D===aT||D[UVa]!==EGa?aT:D;
try{return t3(M)}finally{MI=void 0}}return t3(M)};
  var YL = class{constructor(M,D,V){this.sy=J3(M,D,V,2048)}toJSON(){return A3(this)}iP(M){return JSON.stringify(A3(this,M))}clone(){var M=this.sy,D=M[jN]|0;return u9(this,M,D)?$U(this,M,!0):new this.constructor(BQ(M,D,!1))}};
  var MlY = class extends YL{constructor(M){super(M)}ZI(){return BJ(this,Oy(this,z5,1))}setVideoId(M){return Se(this,1,z5,Gc(M))}getPlaylistId(){return BJ(this,Oy(this,z5,2))}};
  var h1 = {};
  eu = function(M,D=!1){var V="";if(M.dangerousLogToVisitorSession)V="visitorOnlyApprovedKey";else if(M.cttAuthInfo){if(D){D=M.cttAuthInfo.token;V=M.cttAuthInfo;let I=new MlY;V.videoId?I.setVideoId(V.videoId):V.playlistId&&Se(I,2,z5,Gc(V.playlistId));h1[D]=I}else D=M.cttAuthInfo,V={},D.videoId?V.videoId=D.videoId:D.playlistId&&(V.playlistId=D.playlistId),o2[M.cttAuthInfo.token]=V;V=M.cttAuthInfo.token}return V};
  var XdS = {accountStateChangeSignedIn:23,accountStateChangeSignedOut:24,delayedEventMetricCaptured:11,latencyActionBaselined:6,latencyActionInfo:7,latencyActionTicked:5,offlineTransferStatusChanged:2,offlineImageDownload:335,playbackStartStateChanged:9,systemHealthCaptured:3,mangoOnboardingCompleted:10,mangoPushNotificationReceived:230,mangoUnforkDbMigrationError:121,mangoUnforkDbMigrationSummary:122,mangoUnforkDbMigrationPreunforkDbVersionNumber:133,mangoUnforkDbMigrationPhoneMetadata:134,mangoUnforkDbMigrationPhoneStorage:135,
mangoUnforkDbMigrationStep:142,mangoAsyncApiMigrationEvent:223,mangoDownloadVideoResult:224,mangoHomepageVideoCount:279,mangoHomeV3State:295,mangoImageClientCacheHitEvent:273,sdCardStatusChanged:98,framesDropped:12,thumbnailHovered:13,deviceRetentionInfoCaptured:14,thumbnailLoaded:15,backToAppEvent:318,streamingStatsCaptured:17,offlineVideoShared:19,appCrashed:20,youThere:21,offlineStateSnapshot:22,mdxSessionStarted:25,mdxSessionConnected:26,mdxSessionDisconnected:27,bedrockResourceConsumptionSnapshot:28,
nextGenWatchWatchSwiped:29,kidsAccountsSnapshot:30,zeroStepChannelCreated:31,tvhtml5SearchCompleted:32,offlineSharePairing:34,offlineShareUnlock:35,mdxRouteDistributionSnapshot:36,bedrockRepetitiveActionTimed:37,unpluggedDegradationInfo:229,uploadMp4HeaderMoved:38,uploadVideoTranscoded:39,uploadProcessorStarted:46,uploadProcessorEnded:47,uploadProcessorReady:94,uploadProcessorRequirementPending:95,uploadProcessorInterrupted:96,uploadFrontendEvent:241,assetPackDownloadStarted:41,assetPackDownloaded:42,
assetPackApplied:43,assetPackDeleted:44,appInstallAttributionEvent:459,playbackSessionStopped:45,adBlockerMessagingShown:48,distributionChannelCaptured:49,dataPlanCpidRequested:51,detailedNetworkTypeCaptured:52,sendStateUpdated:53,receiveStateUpdated:54,sendDebugStateUpdated:55,receiveDebugStateUpdated:56,kidsErrored:57,mdxMsnSessionStatsFinished:58,appSettingsCaptured:59,mdxWebSocketServerHttpError:60,mdxWebSocketServer:61,startupCrashesDetected:62,coldStartInfo:435,offlinePlaybackStarted:63,liveChatMessageSent:225,
liveChatUserPresent:434,liveChatBeingModerated:457,liveChatGiftButtonImpressed:558,liveCreationCameraUpdated:64,liveCreationEncodingCaptured:65,liveCreationError:66,liveCreationHealthUpdated:67,liveCreationVideoEffectsCaptured:68,liveCreationStageOccured:75,offlineSystemFailure:546,liveCreationBroadcastScheduled:123,liveCreationArchiveReplacement:149,liveCreationCostreamingConnection:421,liveCreationPlayablesMetrics:533,liveCreationStreamWebrtcStats:288,liveCreationWebrtcError:526,mdxSessionRecoveryStarted:69,
mdxSessionRecoveryCompleted:70,mdxSessionRecoveryStopped:71,visualElementShown:72,visualElementHidden:73,visualElementGestured:78,visualElementStateChanged:208,screenCreated:156,playbackAssociated:202,visualElementAttached:215,playbackContextEvent:214,cloudCastingPlaybackStarted:74,webPlayerApiCalled:76,tvhtml5AccountDialogOpened:79,foregroundHeartbeat:80,foregroundHeartbeatScreenAssociated:111,kidsOfflineSnapshot:81,mdxEncryptionSessionStatsFinished:82,playerRequestCompleted:83,liteSchedulerStatistics:84,
mdxSignIn:85,spacecastMetadataLookupRequested:86,spacecastBatchLookupRequested:87,spacecastSummaryRequested:88,spacecastPlayback:89,spacecastDiscovery:90,tvhtml5LaunchUrlComponentChanged:91,mdxBackgroundPlaybackRequestCompleted:92,mdxBrokenAdditionalDataDeviceDetected:93,tvhtml5LocalStorage:97,tvhtml5DeviceStorageStatus:147,autoCaptionsAvailable:99,playbackScrubbingEvent:339,flexyState:100,interfaceOrientationCaptured:101,mainAppBrowseFragmentCache:102,offlineCacheVerificationFailure:103,offlinePlaybackExceptionDigest:217,
vrCopresenceStats:104,vrCopresenceSyncStats:130,vrCopresenceCommsStats:137,vrCopresencePartyStats:153,vrCopresenceEmojiStats:213,vrCopresenceEvent:141,vrCopresenceFlowTransitEvent:160,vrCowatchPartyEvent:492,vrCowatchUserStartOrJoinEvent:504,vrPlaybackEvent:345,kidsAgeGateTracking:105,offlineDelayAllowedTracking:106,mainAppAutoOfflineState:107,videoAsThumbnailDownload:108,videoAsThumbnailPlayback:109,liteShowMore:110,renderingError:118,kidsProfilePinGateTracking:119,abrTrajectory:124,scrollEvent:125,
streamzIncremented:126,kidsProfileSwitcherTracking:127,kidsProfileCreationTracking:129,buyFlowStarted:136,integrationAttributionEvent:556,mbsConnectionInitiated:138,mbsPlaybackInitiated:139,mbsLoadChildren:140,liteProfileFetcher:144,mdxRemoteTransaction:146,reelPlaybackError:148,reachabilityDetectionEvent:150,mobilePlaybackEvent:151,courtsidePlayerStateChanged:152,musicPersistentCacheChecked:154,musicPersistentCacheCleared:155,playbackInterrupted:157,playbackInterruptionResolved:158,fixFopFlow:159,
anrDetection:161,backstagePostCreationFlowEnded:162,clientError:163,gamingAccountLinkStatusChanged:164,liteHousewarming:165,buyFlowEvent:167,kidsParentalGateTracking:168,kidsSignedOutSettingsStatus:437,kidsSignedOutPauseHistoryFixStatus:438,tvhtml5WatchdogViolation:444,ypcUpgradeFlow:169,yongleStudy:170,ypcUpdateFlowStarted:171,ypcUpdateFlowCancelled:172,ypcUpdateFlowSucceeded:173,ypcUpdateFlowFailed:174,liteGrowthkitPromo:175,paymentFlowStarted:341,transactionFlowShowPaymentDialog:405,transactionFlowStarted:176,
transactionFlowSecondaryDeviceStarted:222,transactionFlowSecondaryDeviceSignedOutStarted:383,transactionFlowCancelled:177,transactionFlowPaymentCallBackReceived:387,transactionFlowPaymentSubmitted:460,transactionFlowPaymentSucceeded:329,transactionFlowSucceeded:178,transactionFlowFailed:179,transactionFlowPlayBillingConnectionStartEvent:428,transactionFlowSecondaryDeviceSuccess:458,transactionFlowErrorEvent:411,liteVideoQualityChanged:180,watchBreakEnablementSettingEvent:181,watchBreakFrequencySettingEvent:182,
videoEffectsCameraPerformanceMetrics:183,adNotify:184,startupTelemetry:185,playbackOfflineFallbackUsed:186,outOfMemory:187,ypcPauseFlowStarted:188,ypcPauseFlowCancelled:189,ypcPauseFlowSucceeded:190,ypcPauseFlowFailed:191,uploadFileSelected:192,ypcResumeFlowStarted:193,ypcResumeFlowCancelled:194,ypcResumeFlowSucceeded:195,ypcResumeFlowFailed:196,adsClientStateChange:197,ypcCancelFlowStarted:198,ypcCancelFlowCancelled:199,ypcCancelFlowSucceeded:200,ypcCancelFlowFailed:201,ypcCancelFlowGoToPaymentProcessor:402,
ypcDeactivateFlowStarted:320,ypcRedeemFlowStarted:203,ypcRedeemFlowCancelled:204,ypcRedeemFlowSucceeded:205,ypcRedeemFlowFailed:206,ypcFamilyCreateFlowStarted:258,ypcFamilyCreateFlowCancelled:259,ypcFamilyCreateFlowSucceeded:260,ypcFamilyCreateFlowFailed:261,ypcFamilyManageFlowStarted:262,ypcFamilyManageFlowCancelled:263,ypcFamilyManageFlowSucceeded:264,ypcFamilyManageFlowFailed:265,restoreContextEvent:207,embedsAdEvent:327,autoplayTriggered:209,clientDataErrorEvent:210,experimentalVssValidation:211,
tvhtml5TriggeredEvent:212,tvhtml5FrameworksFieldTrialResult:216,tvhtml5FrameworksFieldTrialStart:220,musicOfflinePreferences:218,watchTimeSegment:219,appWidthLayoutError:221,accountRegistryChange:226,userMentionAutoCompleteBoxEvent:227,downloadRecommendationEnablementSettingEvent:228,musicPlaybackContentModeChangeEvent:231,offlineDbOpenCompleted:232,kidsFlowEvent:233,kidsFlowCorpusSelectedEvent:234,videoEffectsEvent:235,unpluggedOpsEogAnalyticsEvent:236,playbackAudioRouteEvent:237,interactionLoggingDebugModeError:238,
offlineYtbRefreshed:239,kidsFlowError:240,musicAutoplayOnLaunchAttempted:242,deviceContextActivityEvent:243,deviceContextEvent:244,templateResolutionException:245,musicSideloadedPlaylistServiceCalled:246,embedsStorageAccessNotChecked:247,embedsHasStorageAccessResult:248,embedsItpPlayedOnReload:249,embedsRequestStorageAccessResult:250,embedsShouldRequestStorageAccessResult:251,embedsRequestStorageAccessState:256,embedsRequestStorageAccessFailedState:257,embedsItpWatchLaterResult:266,searchSuggestDecodingPayloadFailure:252,
siriShortcutActivated:253,tvhtml5KeyboardPerformance:254,latencyActionSpan:255,elementsLog:267,ytbFileOpened:268,tfliteModelError:269,apiTest:270,yongleUsbSetup:271,touStrikeInterstitialEvent:272,liteStreamToSave:274,appBundleClientEvent:275,ytbFileCreationFailed:276,adNotifyFailure:278,ytbTransferFailed:280,blockingRequestFailed:281,liteAccountSelector:282,liteAccountUiCallbacks:283,dummyPayload:284,browseResponseValidationEvent:285,entitiesError:286,musicIosBackgroundFetch:287,mdxNotificationEvent:289,
layersValidationError:290,musicPwaInstalled:291,liteAccountCleanup:292,html5PlayerHealthEvent:293,watchRestoreAttempt:294,liteAccountSignIn:296,notaireEvent:298,kidsVoiceSearchEvent:299,adNotifyFilled:300,delayedEventDropped:301,analyticsSearchEvent:302,systemDarkThemeOptOutEvent:303,flowEvent:304,networkConnectivityBaselineEvent:305,ytbFileImported:306,downloadStreamUrlExpired:307,directSignInEvent:308,lyricImpressionEvent:309,accessibilityStateEvent:310,tokenRefreshEvent:311,genericAttestationExecution:312,
tvhtml5VideoSeek:313,unpluggedAutoPause:314,scrubbingEvent:315,bedtimeReminderEvent:317,tvhtml5UnexpectedRestart:319,tvhtml5DeviceStorageStats:535,tvhtml5StabilityTraceEvent:478,tvhtml5OperationHealth:467,tvhtml5WatchKeyEvent:321,voiceLanguageChanged:322,tvhtml5LiveChatStatus:323,parentToolsCorpusSelectedEvent:324,offerAdsEnrollmentInitiated:325,networkQualityIntervalEvent:326,deviceStartupMetrics:328,heartbeatActionPlayerTransitioned:330,tvhtml5Lifecycle:331,heartbeatActionPlayerHalted:332,adaptiveInlineMutedSettingEvent:333,
mainAppLibraryLoadingState:334,thirdPartyLogMonitoringEvent:336,appShellAssetLoadReport:337,tvhtml5AndroidAttestation:338,tvhtml5StartupSoundEvent:340,iosBackgroundRefreshTask:342,iosBackgroundProcessingTask:343,sliEventBatch:344,postImpressionEvent:346,musicSideloadedPlaylistExport:347,idbUnexpectedlyClosed:348,voiceSearchEvent:349,mdxSessionCastEvent:350,idbQuotaExceeded:351,idbTransactionEnded:352,idbTransactionAborted:353,tvhtml5KeyboardLogging:354,idbIsSupportedCompleted:355,creatorStudioMobileEvent:356,
idbDataCorrupted:357,parentToolsAppChosenEvent:358,webViewBottomSheetResized:359,activeStateControllerScrollPerformanceSummary:360,navigatorValidation:361,mdxSessionHeartbeat:362,clientHintsPolyfillDiagnostics:363,clientHintsPolyfillEvent:364,proofOfOriginTokenError:365,kidsAddedAccountSummary:366,musicWearableDevice:367,ypcRefundFlowEvent:368,tvhtml5PlaybackMeasurementEvent:369,tvhtml5WatermarkMeasurementEvent:370,clientExpGcfPropagationEvent:371,mainAppReferrerIntent:372,leaderLockEnded:373,leaderLockAcquired:374,
googleHatsEvent:375,persistentLensLaunchEvent:376,parentToolsChildWelcomeChosenEvent:378,browseThumbnailPreloadEvent:379,finalPayload:380,mdxDialAdditionalDataUpdateEvent:381,webOrchestrationTaskLifecycleRecord:382,startupSignalEvent:384,accountError:385,gmsDeviceCheckEvent:386,accountSelectorEvent:388,accountUiCallbacks:389,mdxDialAdditionalDataProbeEvent:390,downloadsSearchIcingApiStats:391,downloadsSearchIndexUpdatedEvent:397,downloadsSearchIndexSnapshot:398,dataPushClientEvent:392,kidsCategorySelectedEvent:393,
mdxDeviceManagementSnapshotEvent:394,prefetchRequested:395,prefetchableCommandExecuted:396,gelDebuggingEvent:399,webLinkTtsPlayEnd:400,clipViewInvalid:401,persistentStorageStateChecked:403,cacheWipeoutEvent:404,playerEvent:410,sfvEffectPipelineStartedEvent:412,sfvEffectPipelinePausedEvent:429,sfvEffectPipelineEndedEvent:413,sfvEffectChosenEvent:414,sfvEffectLoadedEvent:415,sfvEffectUserInteractionEvent:465,sfvEffectFirstFrameProcessedLatencyEvent:416,sfvEffectAggregatedFramesProcessedLatencyEvent:417,
sfvEffectAggregatedFramesDroppedEvent:418,sfvEffectPipelineErrorEvent:430,sfvEffectGraphFrozenEvent:419,sfvEffectGlThreadBlockedEvent:420,mdeQosEvent:510,mdeVideoChangedEvent:442,mdePlayerPerformanceMetrics:472,mdeExporterEvent:497,genericClientExperimentEvent:423,homePreloadTaskScheduled:424,homePreloadTaskExecuted:425,homePreloadCacheHit:426,polymerPropertyChangedInObserver:427,applicationStarted:431,networkCronetRttBatch:432,networkCronetRttSummary:433,repeatChapterLoopEvent:436,seekCancellationEvent:462,
lockModeTimeoutEvent:483,externalVideoShareToYoutubeAttempt:501,parentCodeEvent:502,offlineTransferStarted:4,musicOfflineMixtapePreferencesChanged:16,mangoDailyNewVideosNotificationAttempt:40,mangoDailyNewVideosNotificationError:77,dtwsPlaybackStarted:112,dtwsTileFetchStarted:113,dtwsTileFetchCompleted:114,dtwsTileFetchStatusChanged:145,dtwsKeyframeDecoderBufferSent:115,dtwsTileUnderflowedOnNonkeyframe:116,dtwsBackfillFetchStatusChanged:143,dtwsBackfillUnderflowed:117,dtwsAdaptiveLevelChanged:128,
blockingVisitorIdTimeout:277,liteSocial:18,mobileJsInvocation:297,biscottiBasedDetection:439,coWatchStateChange:440,embedsVideoDataDidChange:441,shortsFirst:443,cruiseControlEvent:445,qoeClientLoggingContext:446,atvRecommendationJobExecuted:447,tvhtml5UserFeedback:448,producerProjectCreated:449,producerProjectOpened:450,producerProjectDeleted:451,producerProjectElementAdded:453,producerProjectElementRemoved:454,producerAppStateChange:509,producerProjectDiskInsufficientExportFailure:516,producerMediaServicesResetDetails:522,
tvhtml5ShowClockEvent:455,deviceCapabilityCheckMetrics:456,youtubeClearcutEvent:461,offlineBrowseFallbackEvent:463,getCtvTokenEvent:464,startupDroppedFramesSummary:466,screenshotEvent:468,miniAppPlayEvent:469,elementsDebugCounters:470,fontLoadEvent:471,webKillswitchReceived:473,webKillswitchExecuted:474,cameraOpenEvent:475,manualSmoothnessMeasurement:476,tvhtml5AppQualityEvent:477,polymerPropertyAccessEvent:479,miniAppSdkUsage:480,cobaltTelemetryEvent:481,crossDevicePlayback:482,channelCreatedWithObakeImage:484,
channelEditedWithObakeImage:485,offlineDeleteEvent:486,crossDeviceNotificationTransfer:487,androidIntentEvent:488,unpluggedAmbientInterludesCounterfactualEvent:489,keyPlaysPlayback:490,shortsCreationFallbackEvent:493,vssData:491,castMatch:494,miniAppPerformanceMetrics:495,userFeedbackEvent:496,kidsGuestSessionMismatch:498,musicSideloadedPlaylistMigrationEvent:499,sleepTimerSessionFinishEvent:500,watchEpPromoConflict:503,innertubeResponseCacheMetrics:505,miniAppAdEvent:506,dataPlanUpsellEvent:507,
producerProjectRenamed:508,producerMediaSelectionEvent:511,embedsAutoplayStatusChanged:512,remoteConnectEvent:513,connectedSessionMisattributionEvent:514,producerProjectElementModified:515,adsSeenClientLogging:517,producerEvent:518,tvhtml5CleanStart:519,deviceAccountMetricsEvent:520,derpLogEvent:521,playablesPortalEvent:523,ipValidationStarted:524,ipValidationReceived:525,reelsSequenceMutationEvent:527,watchZoomStateChange:528,metadataEditorEvent:529,kidsPrismaDeeplinksEvent:530,creationOrchestrationEvent:531,
coordinatedSamplingTriggered:532,recapScreenshotEvent:534,mdxLocalNetworkPermissionRequestEvent:536,mdxLocalNetworkPermissionResponseEvent:537,sessionReplayEvent:538,sessionReplayStatusEvent:539,loggingReliabilityProbe:540,keyValueStoreStatsEvent:541,deviceLocationPermissionEvent:542,remoteControlStarted:543,remoteControlCompleted:544,reelsAdsEvents:545,ytlrLoaderTestHarnessEvent:547,biometricAuthenticationEvent:548,mainAppLifecycleEvent:549,musicDownloadBackgroundContinuedProcessingTask:550,musicMetadataMismatchEvent:551,
scrollToComponentCompleted:552,entityStoreTelemetry:553,streamingDarkLaunchEvent:554,childAccountsDisplayEvent:555,tvfasPlaybackContext:557};
  EgR = function(M){M=Object.keys(M);for(let D of M)if(XdS[D])return D};
  var GR$ = class extends g.v6{constructor(){super();this.X=[];this.W=[];var M=g.vE("yt.gcf.config.hotUpdateCallbacks");M?(this.X=[...M],this.W=M):(this.W=[],g.oa("yt.gcf.config.hotUpdateCallbacks",this.W))}Nc(){for(let D of this.X){var M=this.W;let V=M.indexOf(D);V>=0&&M.splice(V,1)}this.X.length=0;super.Nc()}};
  wF = function(M,D){M.X=D;g.oa("yt.gcf.config.hotConfigGroup",M.X||null)};
  TX = function(M,D){M.W=D;g.oa("yt.gcf.config.coldConfigGroup",M.W||null)};
  QM = function(){return g.vE("yt.gcf.config.coldConfigGroup")};
  bZ = function(){return g.vE("yt.gcf.config.hotConfigGroup")};
  fP = function(M){this.fo=M};
  pP = function(M){this.W=M;this.X=null};
  g.K = pP.prototype;
  g.K.isAvailable = function(){if(this.X===null){var M=this.W;if(M)try{M.setItem("__sak","1");M.removeItem("__sak");var D=!0}catch(V){D=V instanceof DOMException&&(V.name==="QuotaExceededError"||V.code===22||V.code===1014||V.name==="NS_ERROR_DOM_QUOTA_REACHED")&&M&&M.length!==0}else D=!1;this.X=D}return this.X};
  ql = function(M){if(M.W==null)throw Error("Storage mechanism: Storage unavailable");M.isAvailable()||X6(Error("Storage mechanism: Storage unavailable"))};
  g.K.set = function(M,D){ql(this);try{this.W.setItem(M,D)}catch(V){if(this.W.length==0)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
  g.K.get = function(M){ql(this);M=this.W.getItem(M);if(typeof M!=="string"&&M!==null)throw"Storage mechanism: Invalid value was encountered";return M};
  g.K.remove = function(M){ql(this);this.W.removeItem(M)};
  g.bH = function(){};
  g.b6 = {};
  g.G0 = function(M){return{value:M,done:!1}};
  g.K.Fg = function(M){ql(this);var D=0,V=this.W,I=new g.bH;I.next=function(){if(D>=V.length)return g.b6;var t=V.key(D++);if(M)return g.G0(t);t=V.getItem(t);if(typeof t!=="string")throw"Storage mechanism: Invalid value was encountered";return g.G0(t)};
return I};
  g.K.clear = function(){ql(this);this.W.clear()};
  g.K.key = function(M){ql(this);return this.W.key(M)};
  jc = function(){var M=null;try{M=g.HE.localStorage||null}catch(D){}pP.call(this,M)};
  FM = function(M,D){this.X=M;this.W=D+"::"};
  g.mP = function(M){var D=new jc;return D.isAvailable()?M?new FM(D,M):D:null};
  w$ = function(){};
  g.T6 = function(M){return(new w$).iP(M)};
  mo = function(M){this.W=M||{cookie:""}};
  g.K = mo.prototype;
  g.K.isEnabled = function(){if(!g.HE.navigator.cookieEnabled)return!1;if(!this.isEmpty())return!0;this.set("TESTCOOKIESENABLED","1",{GP:60});if(this.get("TESTCOOKIESENABLED")!=="1")return!1;this.remove("TESTCOOKIESENABLED");return!0};
  g.K.set = function(M,D,V){var I=!1;if(typeof V==="object"){var t=V.sameSite;I=V.secure||!1;var A=V.domain||void 0;var l=V.path||void 0;var e=V.GP}if(/[;=\s]/.test(M))throw Error('Invalid cookie name "'+M+'"');if(/[;\r\n]/.test(D))throw Error('Invalid cookie value "'+D+'"');e===void 0&&(e=-1);V=A?";domain="+A:"";l=l?";path="+l:"";I=I?";secure":"";e=e<0?"":e==0?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+e*1E3)).toUTCString();this.W.cookie=M+"="+D+V+l+e+I+(t!=null?
";samesite="+t:"")};
  g.K.get = function(M,D){var V=M+"=",I=(this.W.cookie||"").split(";");for(let t=0,A;t<I.length;t++){A=I[t].trim();if(A.lastIndexOf(V,0)==0)return A.slice(V.length);if(A==M)return""}return D};
  g.K.remove = function(M,D,V){var I=this.get(M)!==void 0;this.set(M,"",{GP:0,path:D,domain:V});return I};
  Mr = function(M){M=(M.W.cookie||"").split(";");var D=[],V=[];for(let A=0;A<M.length;A++){var I=M[A].trim();var t=I.indexOf("=");t==-1?(D.push(""),V.push(I)):(D.push(I.substring(0,t)),V.push(I.substring(t+1)))}return{keys:D,values:V}};
  g.K.TK = function(){return Mr(this).keys};
  g.K.Zv = function(){return Mr(this).values};
  g.K.isEmpty = function(){return!this.W.cookie};
  g.K.clear = function(){var M=Mr(this).keys;for(let D=M.length-1;D>=0;D--)this.remove(M[D])};
  var gi = {};
  var Wi = !1;
  g.Yk = function(M,D,V,I="youtube.com",t=!1){Wi||gi.set(""+M,D,{GP:V,path:"/",domain:I,secure:t})};
  g.s6 = function(M,D){if(!Wi)return gi.get(""+M,D)};
  g.Ly = function(M,D="/",V="youtube.com"){Wi||gi.remove(""+M,D,V)};
  var eW = class{constructor(M){this.W=(M=g.mP(M))?new fP(M):null;this.N=document.domain||window.location.hostname}X(){return!!this.W}set(M,D,V,I){V=V||31104E3;this.remove(M);if(this.X())try{this.W.set(M,D,Date.now()+V*1E3);return}catch(A){}var t="";if(I)try{t=escape(g.T6(D))}catch(A){return}else t=escape(D);g.Yk(M,t,V,this.N)}get(M,D){var V=void 0,I=!this.X();if(!I)try{V=this.W.get(M)}catch(t){I=!0}if(I&&(V=g.s6(M))&&(V=unescape(V),D))try{V=JSON.parse(V)}catch(t){this.remove(M),V=void 0}return V}remove(M){this.X()&&
this.W.remove(M);g.Ly(M,"/",this.N)}getCreationTime(M){return this.X()&&(M=(this.W.Yb(M)||{}).creation,typeof M==="number")?M:null}};
  var Ng = undefined;
  Ch = function(){return Ng()?.get("LAST_RESULT_ENTRY_KEY",!0)};
  LiI = {AUTH_INVALID:"No user identifier specified.",EXPLICIT_ABORT:"Transaction was explicitly aborted.",IDB_NOT_SUPPORTED:"IndexedDB is not supported.",MISSING_INDEX:"Index not created.",MISSING_OBJECT_STORES:"Object stores not created.",DB_DELETED_BY_MISSING_OBJECT_STORES:"Database is deleted because expected object stores were not created.",DB_REOPENED_BY_MISSING_OBJECT_STORES:"Database is reopened because expected object stores were not created.",UNKNOWN_ABORT:"Transaction was aborted for unknown reasons.",QUOTA_EXCEEDED:"The current transaction exceeded its quota limitations.",
QUOTA_MAYBE_EXCEEDED:"The current transaction may have failed because of exceeding quota limitations.",EXECUTE_TRANSACTION_ON_CLOSED_DB:"Can't start a transaction on a closed database",INCOMPATIBLE_DB_VERSION:"The binary is incompatible with the database version"};
  nSQ = {AUTH_INVALID:"ERROR",EXECUTE_TRANSACTION_ON_CLOSED_DB:"WARNING",EXPLICIT_ABORT:"IGNORED",IDB_NOT_SUPPORTED:"ERROR",MISSING_INDEX:"WARNING",MISSING_OBJECT_STORES:"ERROR",DB_DELETED_BY_MISSING_OBJECT_STORES:"WARNING",DB_REOPENED_BY_MISSING_OBJECT_STORES:"WARNING",QUOTA_EXCEEDED:"WARNING",QUOTA_MAYBE_EXCEEDED:"WARNING",UNKNOWN_ABORT:"WARNING",INCOMPATIBLE_DB_VERSION:"WARNING"};
  wE7 = {};
  g.DJ = class extends g.SM{constructor(M,D={},V=LiI[M],I=nSQ[M],t=wE7[M]){super(V,{name:"YtIdbKnownError",isSw:self.document===void 0,isIframe:self!==self.top,type:M,...D});this.type=M;this.message=V;this.level=I;this.W=t;Object.setPrototypeOf(this,g.DJ.prototype)}};
  g.Ad = function(M,D,V){var I=Ch();return new g.DJ("IDB_NOT_SUPPORTED",{context:{caller:M,publicName:D,version:V,hasSucceededOnce:I?.hasSucceededOnce}})};
  aQ = function(...M){M=arguments;var D=Ek;M.length>1?D[M[0]]=M[1]:M.length===1&&Object.assign(D,M[0])};
  qW = function(M,D,V,I,t){var A=g.vE("yt.logging.errors.log");A?A(M,"WARNING",D,V,I,void 0,t):(A=g.f4("ERRORS",[]),A.push([M,"WARNING",D,V,I,void 0,t]),aQ("ERRORS",A))};
  gF = function(){return g.vE("ytglobal.idbToken_")||void 0};
  ZT2 = function(M,D,V){var I=()=>{try{M.removeEventListener("success",t),M.removeEventListener("error",A)}catch{}},t=()=>{D(M.result);
I()},A=()=>{V(M.error);
I()};
M.addEventListener("success",t);M.addEventListener("error",A)};
  Jd = class{constructor(M){this.W=M}};
  lRa = function(M){return M};
  Aui = function(M){if(!M)throw Error();throw M;};
  eU = function(M,D,V,I,t){D===V?t(new TypeError("Circular promise chain detected.")):V.then(A=>{A instanceof g.lZ?eU(M,D,A,I,t):I(A)},A=>{t(A)})};
  Ju1 = function(M,D,V,I,t){try{if(M.state.status!=="REJECTED")throw Error("calling handleReject before the promise is rejected.");let A=V(M.state.reason);A instanceof g.lZ?eU(M,D,A,I,t):I(A)}catch(A){t(A)}};
  e3q = function(M,D,V,I,t){try{if(M.state.status!=="FULFILLED")throw Error("calling handleResolve before the promise is fulfilled.");let A=V(M.state.value);A instanceof g.lZ?eU(M,D,A,I,t):I(A)}catch(A){t(A)}};
  g.lZ = class{constructor(M){this.state={status:"PENDING"};this.W=[];this.X=[];M=M.W;var D=I=>{if(this.state.status==="PENDING"){this.state={status:"FULFILLED",value:I};for(let t of this.W)t()}},V=I=>{if(this.state.status==="PENDING"){this.state={status:"REJECTED",
reason:I};for(let t of this.X)t()}};
try{M(D,V)}catch(I){V(I)}}static all(M){return new g.lZ(new Jd((D,V)=>{var I=[],t=M.length;t===0&&D(I);for(let A=0;A<M.length;++A)g.lZ.resolve(M[A]).then(l=>{I[A]=l;t--;t===0&&D(I)}).catch(l=>{V(l)})}))}static resolve(M){return new g.lZ(new Jd((D,V)=>{M instanceof g.lZ?M.then(D,V):D(M)}))}static reject(M){return new g.lZ(new Jd((D,V)=>{V(M)}))}then(M,D){var V=M??lRa,I=D??Aui;
return new g.lZ(new Jd((t,A)=>{this.state.status==="PENDING"?(this.W.push(()=>{e3q(this,this,V,t,A)}),this.X.push(()=>{Ju1(this,this,I,t,A)})):this.state.status==="FULFILLED"?e3q(this,this,V,t,A):this.state.status==="REJECTED"&&Ju1(this,this,I,t,A)}))}catch(M){return this.then(void 0,M)}};
  ZJ = function(M){return new g.lZ(new Jd((D,V)=>{ZT2(M,D,V)}))};
  var iT1 = class{constructor(M,D){this.request=M;
this.cursor=D}delete(){return ZJ(this.cursor.delete()).then(()=>{})}getValue(){return this.cursor.value}update(M){return ZJ(this.cursor.update(M))}};
  hd = function(M){return ZJ(M).then(D=>D?new iT1(M,D):null)};
  g.vG = function(M){M.cursor.continue(void 0);return hd(M.request)};
  cG = function(M,D){return new g.lZ(new Jd((V,I)=>{var t=()=>{var A=M?D(M):null;A?A.then(l=>{M=l;t()},I):V()};
t()}))};
  g.oi = function(M,D,V){M=M.W.openCursor(D.query,D.direction);return hd(M).then(I=>cG(I,V))};
  koq = function(M,D){return g.oi(M,{query:D},V=>V.delete().then(()=>g.vG(V))).then(()=>{})};
  R3R = function(M,D,V){var I=[];return g.oi(M,{query:D},t=>{if(!(V!==void 0&&I.length>=V))return I.push(t.getValue()),g.vG(t)}).then(()=>I)};
  Ii = class extends Error{constructor(M,D){super();this.index=M;this.objectStore=D;Object.setPrototypeOf(this,Ii.prototype)}};
  g.k4 = function(M,D,V){var {query:I=null,direction:t="next"}=D;M=M.W.openCursor(I,t);return hd(M).then(A=>cG(A,V))};
  XZ1 = function(M,D,V){var I=[];return g.k4(M,{query:D},t=>{if(!(V!==void 0&&I.length>=V))return I.push(t.getValue()),g.vG(t)}).then(()=>I)};
  var QaG = class{constructor(M){this.W=M}count(M){return ZJ(this.W.count(M))}delete(M){return g.k4(this,{query:M},D=>D.delete().then(()=>g.vG(D)))}get(M){return ZJ(this.W.get(M))}getAll(M,D){return"getAll"in IDBIndex.prototype?ZJ(this.W.getAll(M,D)):XZ1(this,M,D)}keyPath(){return this.W.keyPath}unique(){return this.W.unique}};
  var oLa = class{constructor(M){this.W=M}add(M,D){return ZJ(this.W.add(M,D))}autoIncrement(){return this.W.autoIncrement}clear(){return ZJ(this.W.clear()).then(()=>{})}count(M){return ZJ(this.W.count(M))}delete(M){return M instanceof IDBKeyRange?koq(this,M):ZJ(this.W.delete(M))}get(M){return ZJ(this.W.get(M))}getAll(M,D){return"getAll"in IDBObjectStore.prototype?ZJ(this.W.getAll(M,
D)):R3R(this,M,D)}index(M){try{return new QaG(this.W.index(M))}catch(D){if(D instanceof Error&&D.name==="NotFoundError")throw new Ii(M,this.W.name);
throw D;}}getName(){return this.W.name}keyPath(){return this.W.keyPath}put(M,D){return ZJ(this.W.put(M,D))}};
  $4 = function(M,D,V){M=M.W.createObjectStore(D,V);return new oLa(M)};
  zX = function(M,D,V){M.W.createIndex(D,V,{unique:!1})};
  mh = function(M){if(M.indexOf(":")>=0)throw Error("Database name cannot contain ':'");};
  var Kt = {};
  WG = undefined;
  var x1 = !1;
  g.lE = function(){var M=g.HE.navigator;return M&&(M=M.userAgent)?M:""};
  g.VR = function(M,D){return M.indexOf(D)!=-1};
  Bo = function(M){return g.VR(g.lE(),M)};
  g.iZ = undefined;
  Nh = function(){var M=/WebKit\/([0-9]+)/.exec(g.lE());return!!(M&&parseInt(M[1],10)>=602)};
  fy = function(){var M=/WebKit\/([0-9]+)/.exec(g.lE());return!!(M&&parseInt(M[1],10)>=600)};
  xk = undefined;
  zy = function(){return Bo("iPhone")&&!Bo("iPod")&&!Bo("iPad")};
  Cy = {};
  g.Xf = Cy||xk;
  BG = function(){return g.O("idb_immediate_commit")};
  M1 = function(M){return M.substr(0,M.indexOf(":"))||M};
  hl = function(){return zy()||Bo("iPad")||Bo("iPod")};
  hK = function(){return Bo("Firefox")||Bo("FxiOS")};
  var bCt = {};
  Zh = undefined;
  var JK = undefined;
  var ek = undefined;
  co = function(M){if(!ek&&!JK||!Zh)return!1;for(let D=0;D<Zh.brands.length;D++){let {brand:V}=Zh.brands[D];if(V&&g.VR(V,M))return!0}return!1};
  uE = function(){return ek||JK?!!Zh&&Zh.brands.length>0:!1};
  zY = function(){return uE()?co("Microsoft Edge"):Bo("Edg/")};
  $0 = function(){return uE()?!1:Bo("Opera")};
  o0 = function(){return uE()?co("Chromium"):(Bo("Chrome")||Bo("CriOS"))&&!(uE()?0:Bo("Edge"))||Bo("Silk")};
  vo = function(){return Bo("Safari")&&!(o0()||(uE()?0:Bo("Coast"))||$0()||(uE()?0:Bo("Edge"))||zY()||(uE()?co("Opera"):Bo("OPR"))||hK()||Bo("Silk")||Bo("Android"))};
  g.VM = {};
  t6a = ["The database connection is closing","Can't start a transaction on a closed database","A mutation operation was attempted on a database that did not allow mutations"];
  td = function(M,D,V,I){D=M1(D);var t=M instanceof Error?M:Error(`Unexpected error: ${M}`);if(t instanceof g.DJ)return t;M={objectStoreNames:V,dbName:D,dbVersion:I};if(t.name==="QuotaExceededError")return new g.DJ("QUOTA_EXCEEDED",M);if(g.VM&&t.name==="UnknownError")return new g.DJ("QUOTA_MAYBE_EXCEEDED",M);if(t instanceof Ii)return new g.DJ("MISSING_INDEX",{...M,objectStore:t.objectStore,index:t.index});if(t.name==="InvalidStateError"&&t6a.some(A=>t.message.includes(A)))return new g.DJ("EXECUTE_TRANSACTION_ON_CLOSED_DB",
M);
if(t.name==="AbortError")return new g.DJ("UNKNOWN_ABORT",M,t.message);t.args=[{...M,name:"IdbError",ZP:t.name}];t.level="WARNING";return t};
  var qg = [];
  ph = undefined;
  FT = function(M,D){x1||(ph?ph.logEvent(M,D):(qg.push({type:"EVENT",eventType:M,payload:D}),qg.length>10&&qg.shift()))};
  vLi = function(M,D,V,I,t,A="IDB_TRANSACTION_TAG_UNKNOWN"){FT("TRANSACTION_ENDED",{objectStoreNames:I,connectionHasUnknownAbortedTransaction:M.X,duration:t,isSuccessful:D,tryCount:V,tag:A})};
  jM = function(M){x1||(ph?ph.O6(M):(qg.push({type:"ERROR",payload:M}),qg.length>10&&qg.shift()))};
  h3w = function(M,D,V,I,t,A,l){D=V-D;t?(t instanceof g.DJ&&(t.type==="QUOTA_EXCEEDED"||t.type==="QUOTA_MAYBE_EXCEEDED")&&FT("QUOTA_EXCEEDED",{dbName:M1(M.W.name),objectStoreNames:A,transactionCount:M.transactionCount,transactionMode:l.mode}),t instanceof g.DJ&&t.type==="UNKNOWN_ABORT"&&(V-=M.N,V<0&&V>=2147483648&&(V=0),FT("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:A,transactionDuration:D,transactionCount:M.transactionCount,dbDuration:V}),M.X=!0),vLi(M,!1,I,A,D,l.tag),jM(t)):vLi(M,!0,I,A,D,
l.tag)};
  var HTE = class{constructor(M){this.W=M;this.X=new Map;this.aborted=!1;this.done=new Promise((D,V)=>{this.W.addEventListener("complete",()=>{D()});
this.W.addEventListener("error",I=>{I.currentTarget===I.target&&V(this.W.error)});
this.W.addEventListener("abort",()=>{var I=this.W.error;if(I)V(I);else if(!this.aborted){I=g.DJ;var t=this.W.objectStoreNames;let A=[];for(let l=0;l<t.length;l++){let e=t.item(l);if(e===null)throw Error("Invariant: item in DOMStringList is null");A.push(e)}I=new I("UNKNOWN_ABORT",{objectStoreNames:A.join(),dbName:this.W.db.name,mode:this.W.mode});V(I)}})})}abort(){this.W.abort();
this.aborted=!0;throw new g.DJ("EXPLICIT_ABORT");}commit(){this.aborted||this.W.commit?.()}objectStore(M){M=this.W.objectStore(M);var D=this.X.get(M);D||(D=new oLa(M),this.X.set(M,D));return D}};
  z3S = function(M,D,V){var I=new Promise((t,A)=>{try{let l=D(M);V&&M.commit();l.then(e=>{t(e)}).catch(A)}catch(l){A(l),M.abort()}});
return Promise.all([I,M.done]).then(([t])=>t)};
  g.uZ = async function(M,D,V,I){var t={mode:"readonly",EN:!1,tag:"IDB_TRANSACTION_TAG_UNKNOWN"};typeof V==="string"?t.mode=V:Object.assign(t,V);M.transactionCount++;V=t.EN?3:1;for(var A=0,l;!l;){A++;let c=Math.round((0,g.f)());try{var e=M.W.transaction(D,t.mode),J=I,Z=!!t.commit;let B=new HTE(e),u=await z3S(B,J,Z),H=Math.round((0,g.f)());h3w(M,c,H,A,void 0,D.join(),t);return u}catch(B){J=Math.round((0,g.f)());let u=td(B,M.W.name,D.join(),M.W.version);if(u instanceof g.DJ&&!u.W||A>=V)h3w(M,c,J,A,u,D.join(),
t),l=u}}return Promise.reject(l)};
  var KUa = class{constructor(M,D){this.W=M;this.options=D;this.transactionCount=0;this.N=Math.round((0,g.f)());this.X=!1}add(M,D,V){return g.uZ(this,[M],{mode:"readwrite",EN:!0,commit:BG()},I=>I.objectStore(M).add(D,V))}clear(M){return g.uZ(this,[M],{mode:"readwrite",
EN:!0},D=>D.objectStore(M).clear())}close(){this.W.close();
this.options?.closed&&this.options.closed()}count(M,D){return g.uZ(this,[M],{mode:"readonly",EN:!0,commit:BG()},V=>V.objectStore(M).count(D))}delete(M,D){return g.uZ(this,[M],{mode:"readwrite",
EN:!0,commit:BG()&&!(D instanceof IDBKeyRange)},V=>V.objectStore(M).delete(D))}get(M,D){return g.uZ(this,[M],{mode:"readonly",
EN:!0,commit:BG()},V=>V.objectStore(M).get(D))}getAll(M,D,V){return g.uZ(this,[M],{mode:"readonly",
EN:!0},I=>I.objectStore(M).getAll(D,V))}put(M,D,V){return g.uZ(this,[M],{mode:"readwrite",
EN:!0,commit:BG()},I=>I.objectStore(M).put(D,V))}objectStoreNames(){return Array.from(this.W.objectStoreNames)}getName(){return this.W.name}};
  WUE = function(M,D,V){return new Promise((I,t)=>{var A=D!==void 0?self.indexedDB.open(M,D):self.indexedDB.open(M);var l=V.blocked,e=V.blocking,J=V.eU,Z=V.upgrade,c=V.closed,B,u=()=>{B||(B=new KUa(A.result,{closed:c}));return B};
A.addEventListener("upgradeneeded",H=>{try{if(H.newVersion===null)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(A.transaction===null)throw Error("Invariant: transaction on IDbOpenDbRequest is null");H.dataLoss&&H.dataLoss!=="none"&&FT("IDB_DATA_CORRUPTED",{reason:H.dataLossMessage||"unknown reason",dbName:M1(M)});let R=u(),W=new HTE(A.transaction);Z&&Z(R,b=>H.oldVersion<b&&H.newVersion>=b,W);
W.done.catch(b=>{t(b)})}catch(R){t(R)}});
A.addEventListener("success",()=>{var H=A.result;e&&H.addEventListener("versionchange",()=>{e(u())});
H.addEventListener("close",()=>{FT("IDB_UNEXPECTEDLY_CLOSED",{dbName:M1(M),dbVersion:H.version});J&&J()});
I(u())});
A.addEventListener("error",()=>{t(A.error)});
l&&A.addEventListener("blocked",()=>{l()})})};
  gLE = function(M,D,V={}){return WUE(M,D,V)};
  cu1 = function(M){return new Promise((D,V)=>{ZT2(M,D,V)})};
  Ri = async function(M,D={}){try{let V=self.indexedDB.deleteDatabase(M),I=D.blocked;I&&V.addEventListener("blocked",()=>{I()});
await cu1(V)}catch(V){throw td(V,M,"",-1);}};
  YLw = function(M,D){return new g.DJ("INCOMPATIBLE_DB_VERSION",{dbName:M.name,oldVersion:M.options.version,newVersion:D})};
  z9 = function(M,D){return Number(Hi(M,D)||0)};
  TqK = class extends g.DJ{constructor(M,D){super("MISSING_OBJECT_STORES",{expectedObjectStores:D,foundObjectStores:M},LiI.MISSING_OBJECT_STORES);Object.setPrototypeOf(this,TqK.prototype)}};
  var bS6 = class{constructor(M,D){this.name=M;this.options=D;this.N=!0;this.Y=this.Z=0}X(M,D,V={}){return gLE(M,D,V)}delete(M={}){return Ri(this.name,M)}open(){if(!this.N)throw YLw(this);if(this.W)return this.W;var M,D=()=>{this.W===M&&(this.W=void 0)},V={blocking:t=>{t.close()},
closed:D,eU:D,upgrade:this.options.upgrade},I=async()=>{var t=Error().stack??"";try{let e=await this.X(this.name,this.options.version,V);var A=e,l=this.options;let J=[];for(let Z of Object.keys(l.Pv)){let {MR:c,etP:B=Number.MAX_VALUE}=l.Pv[Z];!(A.W.version>=c)||A.W.version>=B||A.W.objectStoreNames.contains(Z)||J.push(Z)}if(J.length!==0){let Z=Object.keys(this.options.Pv),c=e.objectStoreNames();if(this.Y<z9("ytidb_reopen_db_retries",0))return this.Y++,e.close(),jM(new g.DJ("DB_REOPENED_BY_MISSING_OBJECT_STORES",
{dbName:this.name,expectedObjectStores:Z,foundObjectStores:c})),I();if(this.Z<z9("ytidb_remake_db_retries",1))return this.Z++,await this.delete(),jM(new g.DJ("DB_DELETED_BY_MISSING_OBJECT_STORES",{dbName:this.name,expectedObjectStores:Z,foundObjectStores:c})),I();throw new TqK(c,Z);}return e}catch(e){if(e instanceof DOMException?e.name==="VersionError":"DOMError"in self&&e instanceof DOMError?e.name==="VersionError":e instanceof Object&&"message"in e&&e.message==="An attempt was made to open a database using a lower version than the existing version."){t=
await this.X(this.name,void 0,{...V,upgrade:void 0});A=t.W.version;if(this.options.version!==void 0&&A>this.options.version+1)throw t.close(),this.N=!1,YLw(this,A);return t}D();e instanceof Error&&!g.O("ytidb_async_stack_killswitch")&&(e.stack=`${e.stack}\n${t.substring(t.indexOf("\n")+1)}`);throw td(e,this.name,"",this.options.version??-1);}};
return this.W=M=I()}};
  var dF = {};
  g.PG = function(M,D){if(!D)throw g.Ad("openWithToken",M1(M.name));return M.open()};
  swt = async function(M,D){return g.uZ(await g.PG(dF,D),["databases"],{EN:!0,mode:"readwrite"},V=>{var I=V.objectStore("databases");return I.get(M.actualName).then(t=>{if(t?M.actualName!==t.actualName||M.publicName!==t.publicName||M.userIdentifier!==t.userIdentifier:1)return I.put(M).then(()=>{})})})};
  rF = async function(M,D){return M?(await g.PG(dF,D)).delete("databases",M):void 0};
  wZa = async function(){if(Ch()?.hasSucceededOnce)return!0;var M;if(!(M=g.Xf&&fy()&&!Nh()||g.iZ)){try{M=self;var D=!!(M.indexedDB&&M.IDBIndex&&M.IDBKeyRange&&M.IDBObjectStore)}catch(V){D=!1}M=!D}if(M||!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return!1;try{return await swt({actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0},Kt),await rF("yt-idb-test-do-not-use",Kt),!0}catch(V){return!1}};
  TAw = function(){if(WG!==void 0)return WG;x1=!0;return WG=wZa().then(M=>{x1=!1;if(Ng()?.X()){var D={hasSucceededOnce:Ch()?.hasSucceededOnce||M};Ng()?.set("LAST_RESULT_ENTRY_KEY",D,2592E3,!0)}return M})};
  g.Y4 = function(){var M=gF();return M?Promise.resolve(M):TAw().then(D=>{D?(g.oa("ytglobal.idbToken_",Kt),D=Kt):D=void 0;return D})};
  g.b2 = function(M="unknown"){if(g.f4("DATASYNC_ID")!==void 0)return g.f4("DATASYNC_ID");throw new g.SM("Datasync ID not set",M);};
  GO = function(){try{return g.b2(),!0}catch(M){return!1}};
  Qwt = function(M){if(!GO())throw M=new g.DJ("AUTH_INVALID",{dbName:M}),jM(M),M;var D=g.b2();return{actualName:`${M}:${D}`,publicName:M,userIdentifier:D}};
  bT9 = async function(M,D,V,I){var t=Error().stack??"",A=await g.Y4();if(!A)throw D=g.Ad("openDbImpl",M,D),g.O("ytidb_async_stack_killswitch")||(D.stack=`${D.stack}\n${t.substring(t.indexOf("\n")+1)}`),jM(D),D;mh(M);t=V?{actualName:M,publicName:M,userIdentifier:void 0}:Qwt(M);try{return await swt(t,A),await gLE(t.actualName,D,I)}catch(l){try{await rF(t.actualName,A)}catch{}throw l;}};
  Gom = function(M,D,V={}){return bT9(M,D,!1,V)};
  SLw = function(M,D,V={}){return bT9(M,D,!0,V)};
  yua = async function(M,D={}){var V=await g.Y4();V&&(mh(M),M=Qwt(M),await Ri(M.actualName,D),await rF(M.actualName,V))};
  ELY = async function(M,D={}){var V=await g.Y4();V&&(mh(M),await Ri(M,D),await rF(M,V))};
  var aRi = class extends bS6{constructor(M,D){super(M,D);this.options=D;mh(M)}X(M,D,V={}){return(this.options.shared?SLw:Gom)(M,D,{...V})}delete(M={}){return(this.options.shared?ELY:yua)(this.name,M)}};
  fRS = function(M,D){var V;return()=>{V||(V=new aRi(M,D));return V}};
  sS = function(M,D){return fRS(M,D)};
  var NAS = undefined;
  Lt = function(M){return g.PG(NAS(),M)};
  qL9 = async function(M){M=await Lt(M);var D=void 0;await g.uZ(M,["hotConfigStore"],{mode:"readwrite",EN:!0},V=>g.k4(V.objectStore("hotConfigStore").index("hotTimestampIndex"),{direction:"prev"},I=>{D=I.getValue()}));
return D};
  IiR = function(M){wF(M,g.f4("RAW_HOT_CONFIG_GROUP"));M.Mt(g.f4("SERIALIZED_HOT_HASH_DATA"))};
  Cpm = async function(M,D,V,I){M={config:M,hashData:D,timestamp:I!==void 0?I:(0,g.f)()};V=await Lt(V);await V.clear("hotConfigStore");return await V.put("hotConfigStore",M)};
  m0m = async function(M){if(M.X)return bZ();if(!M.Y)return M=g.Ad("getHotConfig IDB not initialized"),qW(M),Promise.reject(M);var D=gF(),V=g.f4("TIME_CREATED_MS");if(D){var I=await qL9(D);if(I&&I.timestamp>V)return wF(M,I.config),M.Mt(I.hashData),bZ()}else I=g.Ad("getHotConfig token error"),qW(I);IiR(M);D&&M.X&&M.hotHashData&&await Cpm(M.X,M.hotHashData,D,V);return M.X?bZ():(M=new g.SM("Config not available in ytConfig"),qW(M),Promise.reject(M))};
  pZ9 = async function(M){M=await Lt(M);var D=void 0;await g.uZ(M,["coldConfigStore"],{mode:"readwrite",EN:!0},V=>g.k4(V.objectStore("coldConfigStore").index("coldTimestampIndex"),{direction:"prev"},I=>{D=I.getValue()}));
return D};
  ABR = function(M,D){M.configData=D;g.oa("yt.gcf.config.coldConfigData",M.configData||null)};
  GX = function(M,D){M.coldHashData=D;g.oa("yt.gcf.config.coldHashData",M.coldHashData||null)};
  VSY = function(M){TX(M,g.f4("RAW_COLD_CONFIG_GROUP"));GX(M,g.f4("SERIALIZED_COLD_HASH_DATA"));ABR(M,M.W?.configData)};
  x0a = async function(M,D,V,I,t){M={config:M,hashData:D,configData:V,timestamp:t!==void 0?t:(0,g.f)()};I=await Lt(I);await I.clear("coldConfigStore");return await I.put("coldConfigStore",M)};
  MSm = async function(M){if(M.W)return QM();if(!M.Y)return M=g.Ad("getColdConfig IDB not initialized"),qW(M),Promise.reject(M);var D=gF(),V=g.f4("TIME_CREATED_MS");if(D){var I=await pZ9(D);if(I&&I.timestamp>V)return TX(M,I.config),ABR(M,I.configData),GX(M,I.hashData),QM()}else I=g.Ad("getColdConfig"),qW(I);VSY(M);D&&M.W&&M.coldHashData&&M.configData&&await x0a(M.W,M.coldHashData,M.configData,D,V);return M.W?QM():(M=new g.SM("Config not available in ytConfig"),qW(M),Promise.reject(M))};
  g.us = function(M){window.clearTimeout(M)};
  var C4 = [];
  O7w = function(M){C4.forEach(D=>D(M))};
  g.xN = function(M){var D=g.vE("yt.logging.errors.log");D?D(M,"ERROR",void 0,void 0,void 0,void 0,void 0):(D=g.f4("ERRORS",[]),D.push([M,"ERROR",void 0,void 0,void 0,void 0,void 0]),aQ("ERRORS",D));O7w(M)};
  g.p4 = function(M){return M&&window.yterr?function(){try{return M.apply(this,arguments)}catch(D){g.xN(D)}}:M};
  g.ci = function(M,D){typeof M==="function"&&(M=g.p4(M));return window.setTimeout(M,D)};
  y1 = function(M,D,V,I){I!==void 0&&Number.isNaN(Number(I))&&(I=void 0);return(M=g.vE("yt.scheduler.instance.addJob"))?M(D,V,I):I===void 0?(D(),NaN):g.ci(D,I||0)};
  var sac = class{constructor(){this.W=new WeakMap}WS(M,D){return y1(0,M,1,D)}Iw(M){(M=this.W.get(M))&&M()}};
  Uj = class extends sac{ZQ(M){if(M===void 0||!Number.isNaN(Number(M))){var D=g.vE("yt.scheduler.instance.cancelJob");D?D(M):g.us(M)}}start(){var M=g.vE("yt.scheduler.instance.start");M&&M()}pause(){var M=g.vE("yt.scheduler.instance.pause");M&&M()}};
  g.Ej = function(){Uj.instance||(Uj.instance=new Uj);return Uj.instance};
  g.ec = undefined;
  DF1 = function(M){if(!M.X||!M.W){if(!gF()){let D=g.Ad("scheduleGetConfigs");qW(D)}M.Z||(M.Z=g.ec.WS(async()=>{try{await m0m(M)}catch{}try{await MSm(M)}catch{}M.Z&&(M.Z=0)},100))}};
  var nt = class{constructor(){this.Y=!1;this.N=this.Z=0;this.G=new GR$;this.HP={piQ:()=>{this.Y=!0},
lRU:()=>this.W,
tjW:M=>{wF(this,M)},
Mt:M=>{this.Mt(M)},
rWo:M=>{TX(this,M)},
o8:()=>this.coldHashData,
TU:()=>this.hotHashData,
Cg0:()=>this.X,
K$H:()=>QM(),
EM5:()=>bZ(),
vMo:()=>g.vE("yt.gcf.config.coldHashData"),
L$P:()=>g.vE("yt.gcf.config.hotHashData"),
n_H:()=>{DF1(this)},
p5n:()=>{this.Mt(void 0);GX(this);delete nt.instance},
iOJ:M=>{this.N=M},
fRP:()=>this.N}}zb(){return bZ()??g.f4("RAW_HOT_CONFIG_GROUP")}Mt(M){this.hotHashData=M;
g.oa("yt.gcf.config.hotHashData",this.hotHashData||null)}};
  var QE = class{constructor(M){this.key=M}};
  bj = function(M){return new QE(M)};
  GC = function(M,D){M.X.set(D.RT,D);var V=M.N.get(D.RT);if(V)try{V.kR(M.resolve(D.RT))}catch(I){V.vz(I)}};
  var SW = Symbol("injectionDeps");
  dpw = function(M,D,V){return D?D.map(I=>I instanceof QE?yE(M,I.key,V,!0):yE(M,I,V)):[]};
  yE = function(M,D,V,I=!1){if(V.indexOf(D)>-1)throw Error(`Deps cycle for: ${D}`);if(M.W.has(D))return M.W.get(D);if(!M.X.has(D)){if(I)return;throw Error(`No provider for: ${D}`);}I=M.X.get(D);V.push(D);if(I.GA!==void 0)var t=I.GA;else if(I.Ys)t=I[SW]?dpw(M,I[SW],V):[],t=I.Ys(...t);else if(I.TH){t=I.TH;let A=t[SW]?dpw(M,t[SW],V):[];t=new t(...A)}else throw Error(`Could not resolve providers for: ${D}`);V.pop();I.PH||M.W.set(D,t);return t};
  var rn9 = class{constructor(){this.X=new Map;this.N=new Map;this.W=new Map;this.HP={UFH:()=>new Map(this.X),
uYX:M=>{var D=this.X.get(M.RT),V=this.W.get(M.RT);this.W.delete(M.RT);GC(this,M);return()=>{this.X.delete(M.RT);this.W.delete(M.RT);D&&GC(this,D);V&&this.W.set(M.RT,V)}}}}resolve(M){return M instanceof QE?yE(this,M.key,[],!0):yE(this,M,[])}};
  OR = undefined;
  UR = function(){OR||(OR=new rn9);return OR};
  aNE = function(M){if(g.O("enable_web_tiered_gel")){M=XdS[M||""];var D=UR().resolve(bj(nt))?.zb()?.loggingHotConfig?.eventLoggingConfig?.payloadPolicies;if(D)for(let V=0;V<D.length;V++)if(D[V].payloadNumber===M)return D[V]}};
  fNS = function(M){switch(M){case "DELAYED_EVENT_TIER_UNSPECIFIED":return 0;case "DELAYED_EVENT_TIER_DEFAULT":return 100;case "DELAYED_EVENT_TIER_DISPATCH_TO_EMPTY":return 200;case "DELAYED_EVENT_TIER_FAST":return 300;case "DELAYED_EVENT_TIER_IMMEDIATE":return 400;default:return 200}};
  Ms = function(M){return[M.auth===void 0?"undefined":M.auth,M.isJspb===void 0?"undefined":M.isJspb,M.cttAuthInfo===void 0?"undefined":M.cttAuthInfo,M.tier===void 0?"undefined":M.tier].join("/")};
  Dg = function(M,D){return M===void 0||M==="undefined"?!0:M===D};
  Vz = function(M,D){var V=Ms(D);if(M.X[V])return M.X[V];var I=Object.keys(M.store)||[];if(I.length<=1&&Ms(D)===I[0])return I;var t=[];for(let l=0;l<I.length;l++){let e=I[l].split("/");if(Dg(D.auth,e[0])){var A=D.isJspb;Dg(A===void 0?"undefined":A?"true":"false",e[1])&&Dg(D.cttAuthInfo,e[2])&&(A=D.tier,A=A===void 0?"undefined":JSON.stringify(A),Dg(A,e[3])&&t.push(I[l]))}}return M.X[V]=t};
  var I2 = class{constructor(){this.store={};this.W=0;this.X={};this.HP={bs0:()=>this.W}}storePayload(M,D){M=Ms(M);
this.store[M]?this.store[M].push(D):(this.X={},this.store[M]=[D]);this.W++;g.O("more_accurate_gel_parser")&&(D=new CustomEvent("TRANSPORTING_NEW_EVENT"),window.dispatchEvent(D));return M}smartExtractMatchingEntries(M){if(!M.keys.length)return[];var D=Vz(this,M.keys.splice(0,1)[0]),V=[];for(let I=0;I<D.length;I++)this.store[D[I]]&&M.sizeLimit&&(this.store[D[I]].length<=M.sizeLimit?(V.push(...this.store[D[I]]),delete this.store[D[I]]):V.push(...this.store[D[I]].splice(0,M.sizeLimit)));this.W-=V.length;
M?.sizeLimit&&V.length<M?.sizeLimit&&(M.sizeLimit-=V.length,V.push(...this.smartExtractMatchingEntries(M)));return V}extractMatchingEntries(M){M=Vz(this,M);var D=[];for(let V=0;V<M.length;V++)this.store[M[V]]&&(D.push(...this.store[M[V]]),delete this.store[M[V]]);this.W-=D.length;return D}getSequenceCount(M){M=Vz(this,M);var D=0;for(let V=0;V<M.length;V++)D+=this.store[M[V]]?.length||0;return D}};
  t1 = function(){var M=g.vE("yt.logging.ims");M||(M=new I2,g.oa("yt.logging.ims",M));return M};
  var cs = void 0;
  Zg = function(M){return M==="gelDebuggingEvent"||M==="watchTimeSegment"};
  e_9 = function(M=!1){return M&&g.O("vss_through_gel_video_stats")?"video_stats":"log_event"};
  h0 = function(){return g.f4("EXPERIMENTS_TOKEN","")};
  oA = function(){var M=[],D=g.f4("EXPERIMENTS_FORCED_FLAGS",{});for(var V of Object.keys(D))M.push({key:V,value:String(D[V])});V=g.f4("EXPERIMENT_FLAGS",{});for(let I of Object.keys(V))I.startsWith("force_")&&D[I]===void 0&&M.push({key:I,value:String(V[I])});return M};
  g5 = function(){if(!g.HE.matchMedia)return"WEB_DISPLAY_MODE_UNKNOWN";try{return g.HE.matchMedia("(display-mode: standalone)").matches?"WEB_DISPLAY_MODE_STANDALONE":g.HE.matchMedia("(display-mode: minimal-ui)").matches?"WEB_DISPLAY_MODE_MINIMAL_UI":g.HE.matchMedia("(display-mode: fullscreen)").matches?"WEB_DISPLAY_MODE_FULLSCREEN":g.HE.matchMedia("(display-mode: browser)").matches?"WEB_DISPLAY_MODE_BROWSER":"WEB_DISPLAY_MODE_UNKNOWN"}catch(M){return"WEB_DISPLAY_MODE_UNKNOWN"}};
  var OS = class extends YL{constructor(M){super(M)}};
  var E3 = function(M,D,V){if(M!=null&&M[O3]===U3)return M;
if(Array.isArray(M)){var I=M[jN]|0;V=I|V&32|V&2;V!==I&&(M[jN]=V);return new D(M)}};
  var ot = function(M,D){D===void 0&&(D=M[jN]|0);
D&32&&!(D&4096)&&(M[jN]=D|4096)};
  at = function(M,D,V,I,t){var A=!1;I=vQ(M,I,t,l=>{var e=E3(l,V,D);A=e!==l&&e!=null;return e});
if(I!=null)return A&&!F6(I)&&ot(M,D),I};
  var HQ = function(M){var D=M.sy,V=D[jN]|0;
return F6(M,V)?u9(M,D,V)?$U(M,D,!0):new M.constructor(BQ(D,V,!1)):M};
  C7 = function(M,D,V,I){var t=M.sy,A=t[jN]|0;D=at(t,A,D,V,I);if(D==null)return D;A=t[jN]|0;if(!F6(M,A)){let l=HQ(D);l!==D&&(zA(M)&&(t=M.sy,A=t[jN]|0),D=l,A=Rt(t,A,V,D,I),ot(t,A))}return D};
  var hhR = {Pe5:"WEB_DISPLAY_MODE_UNKNOWN",OZH:"WEB_DISPLAY_MODE_BROWSER",f4P:"WEB_DISPLAY_MODE_MINIMAL_UI",kXQ:"WEB_DISPLAY_MODE_STANDALONE",xnH:"WEB_DISPLAY_MODE_FULLSCREEN"};
  NT = function(M){M=Error(M);Fl(M,"warning");return M};
  var RT = {};
  var PQ = function(M,D,V,I){h3(M);
var t=M.sy;Rt(t,t[jN]|0,D,V,I);return M};
  zu = function(M,D,V){if(V!=null){if(!RT(V))throw NT("enum");V|=0}return PQ(M,D,V)};
  va = function(M){return M.displayName||M.name||"unknown type name"};
  var y0 = function(M,D){if(!(M instanceof D))throw Error(`Expected instanceof ${va(D)} but got ${M&&va(M.constructor)}`);
return M};
  MA = function(M,D){M!=null?y0(M,D):M=void 0;return M};
  DA = function(M,D,V,I,t){I=MA(I,D);PQ(M,V,I,t);I&&!F6(I)&&ot(M.sy);return M};
  cBt = function(M,D,V){M=M.ao;if(M==="WEB"||M==="MWEB"||M===1||M===2)D?(V=C7(D,OS,96)||new OS,M=g5(),M=Object.keys(hhR).indexOf(M),M=M===-1?null:M,M!==null&&zu(V,3,M),DA(D,OS,96,V)):V&&(V.client.mainAppWebInfo=V.client.mainAppWebInfo??{},V.client.mainAppWebInfo.webDisplayMode=g5())};
  i0 = function(M){if(M==null)return M;if(typeof M==="string"&&M)M=+M;else if(typeof M!=="number")return;return RT(M)?M>>>0:void 0};
  var x8w = [];
  rW = undefined;
  var dW = function(M,D,V){M=vQ(M,D,V);
return Array.isArray(M)?M:rW};
  var X8 = function(M,D){2&D&&(M|=2);
return M|1};
  i9 = function(M,D){return M=(2&D?M|2:M&-3)&-273};
  var gW = function(M){return!!(2&M)&&!!(4&M)||!!(256&M)};
  var K7 = function(M,D,V,I,t,A,l,e,J){var Z=D;
l===1||(l!==4?0:2&D||!(16&D)&&32&I)?gW(D)||(D|=!M.length||e&&!(4096&D)||32&I&&!(4096&D||16&D)?2:256,D!==Z&&(M[jN]=D),Object.freeze(M)):(l===2&&gW(D)&&(M=[...M],Z=0,D=i9(D,I),I=Rt(V,I,t,M,A)),gW(D)||(J||(D|=16),D!==Z&&(M[jN]=D)));2&D||!(4096&D||16&D)||ot(V,I);return M};
  var WQ = function(M,D,V,I,t){var A=M.sy,l=A[jN]|0;
I=F6(M,l)?1:I;t=!!t||I===3;I===2&&zA(M)&&(A=M.sy,l=A[jN]|0);M=dW(A,D);var e=M===rW?7:M[jN]|0,J=X8(e,l);var Z=4&J?!1:!0;if(Z){4&J&&(M=[...M],e=0,J=i9(J,l),l=Rt(A,l,D,M));let c=0,B=0;for(;c<M.length;c++){let u=V(M[c]);u!=null&&(M[B++]=u)}B<c&&(M.length=B);V=(J|4)&-513;J=V&=-1025;J&=-4097}J!==e&&(M[jN]=J,2&J&&Object.freeze(M));return M=K7(M,J,A,l,D,void 0,I,Z,t)};
  MS = function(M,D){if(typeof D!=="number"||D<0||D>=M.length)throw Error();};
  var US = class extends YL{constructor(M){super(M)}sc(M){var D=WQ(this,5,i0,3,!0);MS(D,M);return D[M]}};
  $t = function(M,D,V){return PQ(M,D,Gc(V))};
  Bat = function(M,D){var V=g.vE("yt.embedded_player.embed_url");V&&(M?(D=C7(M,US,7)||new US,$t(D,4,V),DA(M,US,7,D)):D&&(D.thirdParty={embedUrl:V}))};
  var nGi = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  Pa = function(M){switch(typeof M){case "bigint":return!0;case "number":return RT(M);case "string":return nGi.test(M);default:return!1}};
  var s3 = {};
  var tD = undefined;
  var zW = undefined;
  AD = function(M){if(zW(M)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(M))throw Error(String(M));}else if(tD(M)&&!Number.isSafeInteger(M))throw Error(String(M));return BigInt(M)};
  var Lz = {};
  var Wa = undefined;
  Kz = function(M){var D=s3(Number(M));if(Lz(D))return AD(D);D=M.indexOf(".");D!==-1&&(M=M.substring(0,D));return AD(Wa(64,BigInt(M)))};
  var l0 = 0;
  var eF = 0;
  JD = function(M){var D=M>>>0;l0=D;eF=(M-D)/4294967296>>>0};
  ZL = function(M){if(M<0){JD(0-M);M=l0;var D=eF;D=~D;M?M=~M+1:D+=1;let [V,I]=[M,D];l0=V>>>0;eF=I>>>0}else JD(M)};
  ca = function(M,D){D>>>=0;M>>>=0;var V;D<=2097151?V=""+(4294967296*D+M):V=""+(BigInt(D)<<BigInt(32)|BigInt(M));return V};
  Ha = function(){var M=l0,D=eF,V;D&2147483648?V=""+(BigInt(D|0)<<BigInt(32)|BigInt(M>>>0)):V=ca(M,D);return V};
  Ba = function(M,D){var V=D*4294967296+(M>>>0);return Number.isSafeInteger(V)?V:ca(M,D)};
  nz = function(M){Pa(M);M=s3(M);if(!Lz(M)){ZL(M);var D=l0,V=eF;if(M=V&2147483648)D=~D+1>>>0,V=~V>>>0,D==0&&(V=V+1>>>0);D=Ba(D,V);M=typeof D==="number"?M?-D:D:M?"-"+D:D}return M};
  gD = function(M){Lz(M)?M=AD(nz(M)):(Pa(M),M=s3(M),Lz(M)?M=String(M):(ZL(M),M=Ha()),M=AD(M));return M};
  Y8 = function(M){if(M!=null)a:{if(!Pa(M))throw NT("int64");switch(typeof M){case "string":M=Kz(M);break a;case "bigint":M=AD(Wa(64,M));break a;default:M=gD(M)}}return M};
  uoE = function(M,D){if(g.O("web_log_memory_total_kbytes")&&g.HE.navigator?.deviceMemory){let V=g.HE.navigator?.deviceMemory;M?PQ(M,95,Y8(V*1E6)):D&&(D.client.memoryTotalKbytes=`${V*1E6}`)}};
  JR = function(M,D,V="",I){return SF(kU(M,D,I))??V};
  var ES = class extends YL{constructor(M){super(M)}o8(){return JR(this,3)}TU(){return JR(this,5)}Mt(M){return $t(this,5,M)}};
  $FS = function(M,D,V){M.appInstallData&&(D?(V=C7(D,ES,62)??new ES,$t(V,6,M.appInstallData),DA(D,ES,62,V)):V&&(V.client.configInfo=V.client.configInfo||{},V.client.configInfo.appInstallData=M.appInstallData))};
  F3R = function(){var M=g.HE.navigator;return M?M.connection:void 0};
  var mAi = {bluetooth:"CONN_DISCO",cellular:"CONN_CELLULAR_UNKNOWN",ethernet:"CONN_WIFI",none:"CONN_NONE",wifi:"CONN_WIFI",wimax:"CONN_CELLULAR_4G",other:"CONN_UNKNOWN",unknown:"CONN_UNKNOWN","slow-2g":"CONN_CELLULAR_2G","2g":"CONN_CELLULAR_2G","3g":"CONN_CELLULAR_3G","4g":"CONN_CELLULAR_4G"};
  M62 = function(){var M=F3R();if(M){var D=mAi[M.type||"unknown"]||"CONN_UNKNOWN";M=mAi[M.effectiveType||"unknown"]||"CONN_UNKNOWN";D==="CONN_CELLULAR_UNKNOWN"&&M!=="CONN_UNKNOWN"&&(D=M);if(D!=="CONN_UNKNOWN")return D;if(M!=="CONN_UNKNOWN")return M}};
  var oZY = {CONN_DEFAULT:0,CONN_UNKNOWN:1,CONN_NONE:2,CONN_WIFI:3,CONN_CELLULAR_2G:4,CONN_CELLULAR_3G:5,CONN_CELLULAR_4G:6,CONN_CELLULAR_UNKNOWN:7,CONN_DISCO:8,CONN_CELLULAR_5G:9,CONN_WIFI_METERED:10,CONN_CELLULAR_5G_SA:11,
CONN_CELLULAR_5G_NSA:12,CONN_WIRED:30,CONN_INVALID:31};
  var vZm = {EFFECTIVE_CONNECTION_TYPE_UNKNOWN:0,EFFECTIVE_CONNECTION_TYPE_OFFLINE:1,EFFECTIVE_CONNECTION_TYPE_SLOW_2G:2,EFFECTIVE_CONNECTION_TYPE_2G:3,EFFECTIVE_CONNECTION_TYPE_3G:4,EFFECTIVE_CONNECTION_TYPE_4G:5};
  var D0q = {"slow-2g":"EFFECTIVE_CONNECTION_TYPE_SLOW_2G","2g":"EFFECTIVE_CONNECTION_TYPE_2G","3g":"EFFECTIVE_CONNECTION_TYPE_3G","4g":"EFFECTIVE_CONNECTION_TYPE_4G"};
  V6q = function(){var M=F3R();if(M?.effectiveType)return D0q.hasOwnProperty(M.effectiveType)?D0q[M.effectiveType]:"EFFECTIVE_CONNECTION_TYPE_UNKNOWN"};
  HB9 = function(M,D){var V=M62();V&&(M?zu(M,61,oZY[V]):D&&(D.client.connectionType=V));g.O("web_log_effective_connection_type")&&(V=V6q())&&(M?zu(M,94,vZm[V]):D&&(D.client.effectiveConnectionType=V))};
  FUw = function(){if(!nt.instance){let M=new nt;nt.instance=M}return nt.instance};
  JBS = function(){var M=FUw(),D=(0,g.f)()-M.N;if(!(M.N!==0&&D<z9("send_config_hash_timer"))){D=g.vE("yt.gcf.config.coldConfigData");var V=g.vE("yt.gcf.config.hotHashData"),I=g.vE("yt.gcf.config.coldHashData");D&&V&&I&&(M.N=(0,g.f)());return{coldConfigData:D,hotHashData:V,coldHashData:I}}};
  zha = function(M,D){var V=JBS();if(V){var I=V.coldConfigData,t=V.coldHashData;V=V.hotHashData;M?(D=C7(M,ES,62)??new ES,I=$t(D,1,I),$t(I,3,t).Mt(V),DA(M,ES,62,D)):D&&(D.client.configInfo=D.client.configInfo||{},I&&(D.client.configInfo.coldConfigData=I),t&&(D.client.configInfo.coldHashData=t),V&&(D.client.configInfo.hotHashData=V))}};
  var EUi = String(jq);
  var aeY = {};
  lD = function(M){return decodeURIComponent(M.replace(/\+/g," "))};
  var xIE = /^[\w.]*$/;
  UIE = function(M){return M&&M.match(xIE)?M:lD(M)};
  Ra = function(M){var D=typeof M;return D!="object"?D:M?Array.isArray(M)?"array":D:"null"};
  g.PE = function(M){var D=Ra(M);return D=="array"||D=="object"&&typeof M.length=="number"};
  g.Jc = function(M,D){for(let V=1;V<arguments.length;V++){let I=arguments[V];if(g.PE(I)){let t=M.length||0,A=I.length||0;M.length=t+A;for(let l=0;l<A;l++)M[t+l]=I[l]}else M.push(I)}};
  jq = function(M,D){D=M.split(D);var V={};for(let A=0,l=D.length;A<l;A++){let e=D[A].split("=");if(e.length===1&&e[0]||e.length===2)try{let J=UIE(e[0]||""),Z=UIE(e[1]||"");if(J in V){let c=V[J];Array.isArray(c)?g.Jc(c,Z):V[J]=[c,Z]}else V[J]=Z}catch(J){var I=J,t=e[0];let Z=String(jq);I.args=[{key:t,value:e[1],query:M,method:EUi===Z?"unchanged":Z}];aeY.hasOwnProperty(t)||qW(I)}}return V};
  m2 = function(M){M.charAt(0)==="?"&&(M=M.substring(1));return jq(M,"&")};
  g.yM = function(M){var D={client:{hl:M.dL,gl:M.ll,clientName:M.ao,clientVersion:M.innertubeContextClientVersion,configInfo:M.gp}};navigator.userAgent&&(D.client.userAgent=String(navigator.userAgent));var V=g.HE.devicePixelRatio;V&&V!=1&&(D.client.screenDensityFloat=String(V));V=h0();V!==""&&(D.client.experimentsToken=V);V=oA();V.length>0&&(D.request={internalExperimentFlags:V});cBt(M,void 0,D);Bat(void 0,D);uoE(void 0,D);$FS(M,void 0,D);HB9(void 0,D);g.O("start_client_gcf")&&zha(void 0,D);g.f4("DELEGATED_SESSION_ID")&&
!g.O("pageid_as_header_web")&&(D.user={onBehalfOfUser:g.f4("DELEGATED_SESSION_ID")});!g.O("fill_delegate_context_in_gel_killswitch")&&(M=g.f4("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT"))&&(D.user={...D.user,serializedDelegationContext:M});M=g.f4("INNERTUBE_CONTEXT");g.O("enable_persistent_device_token")&&M?.client?.rolloutToken&&(D.client.rolloutToken=M?.client?.rolloutToken);M=Object;V=M.assign;var I=D.client,t=g.f4("DEVICE",""),A={};for(let [l,e]of Object.entries(m2(t)))t=l,t==="cbrand"?
A.deviceMake=e:t==="cmodel"?A.deviceModel=e:t==="cbr"?A.browserName=e:t==="cbrver"?A.browserVersion=e:t==="cos"?A.osName=e:t==="cosver"?A.osVersion=e:t==="cplatform"&&(A.platform=e);D.client=V.call(M,I,A);g.O("web_attention_logging_enabled")&&(D.client.windowWidthPoints=window.innerWidth,D.client.windowHeightPoints=window.innerHeight);return D};
  g.NV = function(M){if(!M||typeof M!=="object")return M;if(typeof M.clone==="function")return M.clone();if(typeof Map!=="undefined"&&M instanceof Map)return new Map(M);if(typeof Set!=="undefined"&&M instanceof Set)return new Set(M);if(M instanceof Date)return new Date(M.getTime());var D=Array.isArray(M)?[]:typeof ArrayBuffer!=="function"||typeof ArrayBuffer.isView!=="function"||!ArrayBuffer.isView(M)||M instanceof DataView?{}:new M.constructor(M.length);for(let V in M)D[V]=g.NV(M[V]);return D};
  Jm1 = function(M,D,V){if(V.videoId)var I="VIDEO";else if(V.playlistId)I="PLAYLIST";else return;M.credentialTransferTokenTargetId=V;M.context=M.context||{};M.context.user=M.context.user||{};M.context.user.credentialTransferTokens=[{token:D,scope:I}]};
  XQ = function(){return g.O("use_request_time_ms_header")||g.O("lr_use_request_time_ms_header")};
  o59 = function(){var M=g.f4("BATCH_CLIENT_COUNTER")||0;M||(M=Math.floor(Math.random()*65535/2));M++;M>65535&&(M=1);aQ("BATCH_CLIENT_COUNTER",M);return M};
  ZVa = function(M,D,V){XQ()||(M.requestTimeMs=String(D));g.O("unsplit_gel_payloads_in_logs")&&(M.unsplitGelPayloadsInLogs=!0);!V&&(D=g.f4("EVENT_ID"))&&(V=o59(),M.serializedClientEventId={serializedEventId:D,clientCounter:String(V)})};
  cmR = function(M){g.O("always_send_and_write")&&(M.writeThenSend=!1)};
  g.m = class{constructor(M){this.name=M}};
  var kNw = {};
  g.a = function(M,D){if(M)return M[D.name]};
  var R_m = {};
  liE = async function(M,D,V){if(g.O("start_client_gcf")){V&&wF(M,V);M.Mt(D);let I=gF();I&&(V||(V=(await qL9(I))?.config),await Cpm(V,D,I));if(V){M=M.G;for(let t of M.W)t(V)}}};
  eht = async function(M,D,V){g.O("start_client_gcf")&&(GX(M,D),M=gF())&&(V||(V=(await pZ9(M))?.config),V&&await x0a(V,D,V.configData,M))};
  var Tf = class{constructor(M){this.name=M}toString(){return`InjectionToken(${this.name})`}};
  var Pvm = {};
  B9R = async function(M){M=M?.responseContext?.globalConfigGroup;var D=g.a(M,kNw),V=M?.hotHashData,I=g.a(M,R_m),t=M?.coldHashData,A=UR().resolve(bj(nt));A&&(V&&(D?await liE(A,V,D):await liE(A,V)),t&&(I?await eht(A,t,I):await eht(A,t)));D=M?.rawFinchStaticConfigGroup;(M=M?.finchStaticHashData)?(V=UR().resolve(bj(Pvm)))?await V.voH({config:D||{},u_0:M||""}):(D||M)&&qW(new g.SM("FinchConfigManagerService is not present, but Finch config data is present.")):D&&qW(new g.SM("Finch config data is present, but hash is missing."))};
  R2 = function(M,D,V,I,t){M={retry:!0,onSuccess:V,onError:I,networklessOptions:M,dangerousLogToVisitorSession:D,YbP:!!t,headers:{},postBodyFormat:"",postBody:"",compress:g.O("compress_gel")||g.O("compress_gel_lr")};XQ()&&(M.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round((0,g.f)())));return M};
  var ai = {identityType:"UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"};
  q2 = function(M){if(!M)return"";if(/^about:(?:blank|srcdoc)$/.test(M))return window.origin||"";M.indexOf("blob:")===0&&(M=M.substring(5));M=M.split("#")[0].split("?")[0];M=M.toLowerCase();M.indexOf("//")==0&&(M=window.location.protocol+M);/^[\w\-]*:\/\//.test(M)||(M=window.location.href);var D=M.substring(M.indexOf("://")+3),V=D.indexOf("/");V!=-1&&(D=D.substring(0,V));V=M.substring(0,M.indexOf("://"));if(!V)throw Error("URI is missing protocol: "+M);if(V!=="http"&&V!=="https"&&V!=="chrome-extension"&&
V!=="moz-extension"&&V!=="file"&&V!=="android-app"&&V!=="chrome-search"&&V!=="chrome-untrusted"&&V!=="chrome"&&V!=="app"&&V!=="devtools")throw Error("Invalid URI scheme in origin: "+V);M="";var I=D.indexOf(":");if(I!=-1){var t=D.substring(I+1);D=D.substring(0,I);if(V==="http"&&t!=="80"||V==="https"&&t!=="443")M=":"+t}return V+"://"+D+M};
  g.O9 = function(M,D,V){Array.prototype.forEach.call(M,D,V)};
  Ela = function(){function M(){t[0]=1732584193;t[1]=4023233417;t[2]=2562383102;t[3]=271733878;t[4]=3285377520;c=Z=0}
function D(B){for(var u=l,H=0;H<64;H+=4)u[H/4]=B[H]<<24|B[H+1]<<16|B[H+2]<<8|B[H+3];for(H=16;H<80;H++)B=u[H-3]^u[H-8]^u[H-14]^u[H-16],u[H]=(B<<1|B>>>31)&4294967295;B=t[0];var R=t[1],W=t[2],b=t[3],y=t[4];for(H=0;H<80;H++){if(H<40)if(H<20){var U=b^R&(W^b);var E=1518500249}else U=R^W^b,E=1859775393;else H<60?(U=R&W|b&(R|W),E=2400959708):(U=R^W^b,E=3395469782);U=((B<<5|B>>>27)&4294967295)+U+y+E+u[H]&4294967295;y=b;b=W;W=(R<<30|R>>>2)&4294967295;R=B;B=U}t[0]=t[0]+B&4294967295;t[1]=t[1]+R&4294967295;t[2]=
t[2]+W&4294967295;t[3]=t[3]+b&4294967295;t[4]=t[4]+y&4294967295}
function V(B,u){if(typeof B==="string"){B=unescape(encodeURIComponent(B));for(var H=[],R=0,W=B.length;R<W;++R)H.push(B.charCodeAt(R));B=H}u||(u=B.length);H=0;if(Z==0)for(;H+64<u;)D(B.slice(H,H+64)),H+=64,c+=64;for(;H<u;)if(A[Z++]=B[H++],c++,Z==64)for(Z=0,D(A);H+64<u;)D(B.slice(H,H+64)),H+=64,c+=64}
function I(){var B=[],u=c*8;Z<56?V(e,56-Z):V(e,64-(Z-56));for(var H=63;H>=56;H--)A[H]=u&255,u>>>=8;D(A);for(H=u=0;H<5;H++)for(var R=24;R>=0;R-=8)B[u++]=t[H]>>R&255;return B}
for(var t=[],A=[],l=[],e=[128],J=1;J<64;++J)e[J]=0;var Z,c;M();return{reset:M,update:V,digest:I,AO:function(){for(var B=I(),u="",H=0;H<B.length;H++)u+="0123456789ABCDEF".charAt(Math.floor(B[H]/16))+"0123456789ABCDEF".charAt(B[H]%16);return u}}};
  FU = function(M){var D=Ela();D.update(M);return D.AO().toLowerCase()};
  aIE = function(M,D,V){var I=[],t=[];if((Array.isArray(V)?2:1)==1)return t=[D,M],g.O9(I,function(e){t.push(e)}),FU(t.join(" "));
var A=[],l=[];g.O9(V,function(e){l.push(e.key);A.push(e.value)});
V=Math.floor((new Date).getTime()/1E3);t=A.length==0?[V,D,M]:[A.join(":"),V,D,M];g.O9(I,function(e){t.push(e)});
M=FU(t.join(" "));M=[V,M];l.length==0||M.push(l.join(""));return M.join("_")};
  jv = function(M,D,V){var I=String(g.HE.location.href);return I&&M&&D?[D,aIE(q2(I),M,V||null)].join(" "):null};
  Vk = function(M,D,V,I){(M=g.HE[M])||typeof document==="undefined"||(M=(new mo(document)).get(D));return M?jv(M,V,I):null};
  DP = function(){var M=g.HE.__SAPISID||g.HE.__APISID||g.HE.__3PSAPISID||g.HE.__1PSAPISID||g.HE.__OVERRIDE_SID;if(M)return!0;typeof document!=="undefined"&&(M=new mo(document),M=M.get("SAPISID")||M.get("APISID")||M.get("__Secure-3PAPISID")||M.get("__Secure-1PAPISID"));return!!M};
  In = function(M){var D=q2(g.HE?.location.href),V=[];if(DP()){D=D.indexOf("https:")==0||D.indexOf("chrome-extension:")==0||D.indexOf("chrome-untrusted://new-tab-page")==0||D.indexOf("moz-extension:")==0;var I,t=(I=D)?g.HE.__SAPISID:g.HE.__APISID;t||typeof document==="undefined"||(t=new mo(document),t=t.get(I?"SAPISID":"APISID")||t.get("__Secure-3PAPISID"));(I=t?jv(t,I?"SAPISIDHASH":"APISIDHASH",M):null)&&V.push(I);D&&((D=Vk("__1PSAPISID","__Secure-1PAPISID","SAPISID1PHASH",M))&&V.push(D),(M=Vk("__3PSAPISID",
"__Secure-3PAPISID","SAPISID3PHASH",M))&&V.push(M))}return V.length==0?null:V.join(" ")};
  var Y1 = class{constructor(){this.qp=!0}Xa(M,D){M={};var V=[];"USER_SESSION_ID"in Ek&&V.push({key:"u",value:g.f4("USER_SESSION_ID")});if(V=In(V))M.Authorization=V,V=D=D?.sessionIndex,V===void 0&&(V=Number(g.f4("SESSION_INDEX",0)),V=isNaN(V)?0:V),g.O("voice_search_auth_header_removal")||(M["X-Goog-AuthUser"]=V.toString()),"INNERTUBE_HOST_OVERRIDE"in Ek||(M["X-Origin"]=window.location.origin),D===void 0&&"DELEGATED_SESSION_ID"in Ek&&(M["X-Goog-PageId"]=g.f4("DELEGATED_SESSION_ID"));return M}};
  xAa = function(){Y1.instance||(Y1.instance=new Y1);return Y1.instance};
  kw9 = function(M,D,V={}){var I={};g.f4("EOM_VISITOR_DATA")?I={"X-Goog-EOM-Visitor-Id":g.f4("EOM_VISITOR_DATA")}:I={"X-Goog-Visitor-Id":V.visitorData||g.f4("VISITOR_DATA","")};if(D&&D.includes("www.youtube-nocookie.com"))return I;D=V.H_||g.f4("AUTHORIZATION");D||(M?D=`Bearer ${g.vE("gapi.auth.getToken")().access_token}`:(M=xAa().Xa(ai),g.O("pageid_as_header_web")||delete M["X-Goog-PageId"],I={...I,...M}));D&&(I.Authorization=D);return I};
  g.QT = function(M,D){return M!==null&&D in M};
  g.Al = function(M){return encodeURIComponent(String(M))};
  YZ = function(M,D,V){if(Array.isArray(D))for(let I=0;I<D.length;I++)YZ(M,String(D[I]),V);else D!=null&&V.push(M+(D===""?"":"="+g.Al(D)))};
  g.LB = function(M){var D=[];for(let V in M)YZ(V,M[V],D);return D.join("&")};
  WV = function(M,D){if(!D)return M;var V=M.indexOf("#");V<0&&(V=M.length);var I=M.indexOf("?");if(I<0||I>V){I=V;var t=""}else t=M.substring(I+1,V);M=[M.slice(0,I),t,M.slice(V)];V=M[1];M[1]=D?V?V+"&"+D:D:V;return M[0]+(M[1]?"?"+M[1]:"")+M[2]};
  g.nB = function(M,D){D=g.LB(D);return WV(M,D)};
  feR = function(M,D,V){var I=M.split("#",2);M=I[0];I=I.length>1?"#"+I[1]:"";var t=M.split("?",2);M=t[0];t=m2(t[1]||"");for(let A in D)if(V||!g.QT(t,A))t[A]=D[A];return g.nB(M,t)+I};
  Vc = function(M,D){return feR(M,D||{},!0)};
  tYa = function(M,D){D.includeDomain&&(M=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+M);var V=g.f4("XSRF_FIELD_NAME");if(D=D.urlParams)D[V]&&delete D[V],M=Vc(M,D);return M};
  var AKq = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
  g.kZ = function(M){return M.match(AKq)};
  Rj = function(M){return M?decodeURI(M):M};
  g.PV = function(M){return Rj(g.kZ(M)[3]||null)};
  var Ce = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
  g.xG = function(M,D){for(let t=1;t<arguments.length;t++){var V=arguments[t];for(I in V)M[I]=V[I];for(let A=0;A<Ce.length;A++){var I=Ce[A];Object.prototype.hasOwnProperty.call(V,I)&&(M[I]=V[I])}}};
  g.yT = function(M){for(let D in M)return!1;return!0};
  var cRR = !1;
  ARm = function(M,D){var V=g.f4("XSRF_FIELD_NAME"),I=g.f4("XSRF_TOKEN"),t=D.postBody||"",A=D.postParams,l=g.f4("XSRF_FIELD_NAME"),e;D.headers&&(e=D.headers["Content-Type"]);D.excludeXsrf||g.PV(M)&&!D.withCredentials&&g.PV(M)!==document.location.hostname||D.method!=="POST"||e&&e!=="application/x-www-form-urlencoded"||D.postParams&&D.postParams[l]||(A||(A={}),A[V]=I);A&&typeof t==="string"&&(t=m2(t),g.xG(t,A),t=D.postBodyFormat&&D.postBodyFormat==="JSON"?JSON.stringify(t):g.LB(t));A=t||A&&!g.yT(A);!cRR&&
A&&D.method!=="POST"&&(cRR=!0,g.xN(Error("AJAX request with postData should use POST")));return t};
  J0 = function(M){return M&&"status"in M?M.status:-1};
  g.Z2 = function(M){switch(J0(M)){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}};
  uuR = function(M){var D="";g.O9(M.childNodes,V=>{D+=V.nodeValue});
return D};
  BOq = function(M){return M?(M=("responseXML"in M?M.responseXML:M).getElementsByTagName("root"))&&M.length>0?M[0]:null:null};
  var Po = {};
  P11 = function(){var M=null;if(!Po)return M;try{let D=V=>V;
M=Po.createPolicy("goog#html",{createHTML:D,createScript:D,createScriptURL:D})}catch(D){}return M};
  dH = undefined;
  rH = function(){dH===void 0&&(dH=P11());return dH};
  var yR = class{constructor(M){this.W=M}toString(){return this.W+""}};
  OG = function(M){var D=rH();M=D?D.createHTML(M):M;return new yR(M)};
  Mq = function(M,D){var V=M.length-D.length;return V>=0&&M.indexOf(D,V)==V};
  g.dq = function(M){var D=typeof M;return D=="object"&&M!=null||D=="function"};
  $AS = function(M){if(g.dq(M))for(let D in M)D==="html_content"||Mq(D,"_html")?M[D]=OG(M[D]):$AS(M[D])};
  JRw = function(M,D,V,I){var t=null;switch(D){case "JSON":let A;try{A=V.responseText}catch(l){throw I=Error("Error reading responseText"),I.params=M,qW(I),l;}M=V.getResponseHeader("Content-Type")||"";if(A&&M.indexOf("json")>=0){A.substring(0,5)===")]}'\n"&&(A=A.substring(5));try{t=JSON.parse(A)}catch(l){}}break;case "XML":if(M=(M=V.responseXML)?BOq(M):null)t={},g.O9(M.getElementsByTagName("*"),l=>{t[l.tagName]=uuR(l)})}I&&$AS(t);
return t};
  Z6w = function(M,D,V){if(D&&D.status===204)return!0;switch(M){case "JSON":return!!V;case "XML":return Number(V&&V.return_code)===0;case "RAW":return!0;default:return!!V}};
  var mIR = undefined;
  MYm = function(){if(!mIR)return null;var M=mIR();return"open"in M?M:null};
  t0 = function(M){if(!D)var D=window.location.href;var V=g.kZ(M)[1]||null,I=g.PV(M);V&&I?(M=g.kZ(M),D=g.kZ(D),M=M[3]==D[3]&&M[1]==D[1]&&M[4]==D[4]):M=I?g.PV(D)===I&&(Number(g.kZ(D)[4]||null)||null)===(Number(g.kZ(M)[4]||null)||null):!0;return M};
  da = function(M){return Rj(g.kZ(M)[5]||null)};
  var vSe = "absolute_experiments client_dev_domain client_dev_expflag client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods theme".split(" ");
  var H6S = [];
  IA = function(M,D){return feR(M,D||{},!1)};
  DAw = function(M){var D=window.location.search,V=g.PV(M);g.O("debug_handle_relative_url_for_query_forward_killswitch")||!V&&t0(M)&&(V=document.location.hostname);var I=da(M);I=(V=V&&(V.endsWith("youtube.com")||V.endsWith("youtube-nocookie.com")))&&I&&I.startsWith("/api/");if(!V||I)return M;var t=m2(D),A={};g.O9(H6S,l=>{t[l]&&(A[l]=t[l])});
return IA(M,A)};
  var IAY = {Authorization:"AUTHORIZATION","X-Goog-EOM-Visitor-Id":"EOM_VISITOR_DATA","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-Youtube-Domain-Admin-State":"DOMAIN_ADMIN_STATE","X-Youtube-Chrome-Connected":"CHROME_CONNECTED_HEADER","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL",
"X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-Goog-AuthUser":"SESSION_INDEX","X-Goog-PageId":"DELEGATED_SESSION_ID"};
  NWY = function(M){M=g.PV(M);return M!==null?M.split(".").reverse():null};
  C91 = function(M){M=NWY(M);return M===null?!1:M[1]==="google"?!0:M[2]==="google"?M[0]==="au"&&M[1]==="com"?!0:M[0]==="uk"&&M[1]==="co"?!0:!1:!1};
  var jtt = {};
  var pQw = undefined;
  var H$ = window;
  qyw = function(M){a:{let V;try{V=M.W.top.location.href}catch(I){M=2;break a}M=V?V===M.X.location.href?0:1:2}M={dt:pQw,flash:"0",frm:M};try{M.u_tz=-(new Date).getTimezoneOffset();try{var D=H$.history.length}catch(V){D=0}M.u_his=D;M.u_h=H$.screen?.height;M.u_w=H$.screen?.width;M.u_ah=H$.screen?.availHeight;M.u_aw=H$.screen?.availWidth;M.u_cd=H$.screen?.colorDepth}catch(V){}return M};
  g.gy = function(M,D){this.width=M;this.height=D};
  g.K = g.gy.prototype;
  g.K.clone = function(){return new g.gy(this.width,this.height)};
  g.K.aspectRatio = function(){return this.width/this.height};
  s5 = function(M){return M.width*M.height};
  g.K.isEmpty = function(){return!s5(this)};
  g.K.ceil = function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
  g.K.floor = function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
  g.K.round = function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
  g.K.scale = function(M,D){this.width*=M;this.height*=typeof D==="number"?D:M;return this};
  Ck = function(M){M=M.document;M=M.compatMode=="CSS1Compat"?M.documentElement:M.body;return new g.gy(M.clientWidth,M.clientHeight)};
  qF = function(M,D,V=!1){if(M&&D!==null&&D!=D.top){if(!D.top)return new g.gy(-12245933,-12245933);D=D.top}try{return V?(new g.gy(D.innerWidth,D.innerHeight)).round():Ck(D||window).round()}catch(I){return new g.gy(-12245933,-12245933)}};
  var Fum = class{constructor(){this.data=[];this.W=-1}set(M,D=!0){0<=M&&M<52&&Number.isInteger(M)&&this.data[M]!==D&&(this.data[M]=D,this.W=-1)}get(M){return!!this.data[M]}};
  hf = function(M,D=document){return D.createElement(String(M).toLowerCase())};
  var vG2 = {JX:"allow-forms",Ra:"allow-modals",hX:"allow-orientation-lock",gf:"allow-pointer-lock",rf:"allow-popups",Wa:"allow-popups-to-escape-sandbox",oN:"allow-presentation",iU:"allow-same-origin",sh:"allow-scripts",X7:"allow-top-navigation",tb:"allow-top-navigation-by-user-activation"};
  B0 = function(M,D){if(M)for(let V in M)Object.prototype.hasOwnProperty.call(M,V)&&D(M[V],V,M)};
  kbS = function(){var M=[];B0(vG2,D=>{M.push(D)});
return M};
  R4 = function(M){var D=!1,V;return function(){D||(V=M(),D=!0);return V}};
  var XKS = undefined;
  iet = function(){var M=hf("IFRAME"),D={};g.O9(XKS(),V=>{M.sandbox&&M.sandbox.supports&&M.sandbox.supports(V)&&(D[V]=!0)});
return D};
  rDE = function(M){M.W===-1&&(M.W=M.data.reduce((D,V,I)=>D+(V?2**I:0),0));
return M.W};
  IK = function(M){return M.prerendering?3:{visible:1,hidden:2,prerender:3,preview:4,unloaded:5,"":0}[M.visibilityState||M.webkitVisibilityState||M.mozVisibilityState||""]??0};
  Syq = function(){return g.vE("yt.ads.biscotti.lastId_")||""};
  e3 = function(M=Syq()){var D=jtt,V=Object,I=V.assign,t=qyw(D);var A=D.W;try{var l=A.screenX;var e=A.screenY}catch(b){}try{var J=A.outerWidth;var Z=A.outerHeight}catch(b){}try{var c=A.innerWidth;var B=A.innerHeight}catch(b){}try{var u=A.screenLeft;var H=A.screenTop}catch(b){}try{c=A.innerWidth,B=A.innerHeight}catch(b){}try{var R=A.screen.availWidth;var W=A.screen.availTop}catch(b){}A=[u,H,l,e,R,W,J,Z,c,B];l=qF(!1,D.W.top);e=new Fum;"SVGElement"in g.HE&&"createElementNS"in g.HE.document&&e.set(0);J=iet();
J["allow-top-navigation-by-user-activation"]&&e.set(1);J["allow-popups-to-escape-sandbox"]&&e.set(2);g.HE.crypto&&g.HE.crypto.subtle&&e.set(3);"TextDecoder"in g.HE&&"TextEncoder"in g.HE&&e.set(4);e=rDE(e);D=I.call(V,t,{bc:e,bih:l.height,biw:l.width,brdim:A.join(),vis:IK(D.X),wgl:!!H$.WebGLRenderingContext});D.ca_type="image";M&&(D.bid=M);return D};
  g.iG = function(M,D,V){for(let I in M)D.call(V,M[I],I,M)};
  F3 = function(M){var D=[];g.iG(M,(V,I)=>{var t=g.Al(I);g.O9(Array.isArray(V)?V:[V],A=>{A==""?D.push(t):D.push(`${t}=${g.Al(A)}`)})});
return D.join("&")};
  VY1 = function(M,D={}){var V=t0(M),I=g.f4("INNERTUBE_CLIENT_NAME"),t=g.O("web_ajax_ignore_global_headers_if_set");for(let e in IAY){let J=g.f4(IAY[e]),Z=e==="X-Goog-AuthUser"||e==="X-Goog-PageId";e!=="X-Goog-Visitor-Id"||J||(J=g.f4("VISITOR_DATA"));var A;if(!(A=!J)){if(!(A=V||(g.PV(M)?!1:!0))){A=M;var l;if(l=g.O("add_auth_headers_to_remarketing_google_dot_com_ping")&&e==="Authorization"&&(I==="TVHTML5"||I==="TVHTML5_UNPLUGGED"||I==="TVHTML5_SIMPLY")&&C91(A))A=da(A)||"",A=A.split("/"),A="/"+(A.length>
1?A[1]:""),l=A==="/pagead";A=l?!0:!1}A=!A}A||t&&D[e]!==void 0||I==="TVHTML5_UNPLUGGED"&&Z||(D[e]=J)}"X-Goog-EOM-Visitor-Id"in D&&"X-Goog-Visitor-Id"in D&&delete D["X-Goog-Visitor-Id"];if(V||!g.PV(M))D["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());if(V||!g.PV(M)){let e;try{e=(new Intl.DateTimeFormat).resolvedOptions().timeZone}catch{}e&&(D["X-YouTube-Time-Zone"]=e)}document.location.hostname.endsWith("youtubeeducation.com")||!V&&g.PV(M)||(D["X-YouTube-Ad-Signals"]=F3(e3()));return D};
  vi = function(M,D,V="GET",I="",t,A,l,e=!1,J){var Z=MYm();if(!Z)return null;var c=()=>{(Z&&"readyState"in Z?Z.readyState:0)===4&&D&&g.p4(D)(Z)};
"onloadend"in Z?Z.addEventListener("loadend",c,!1):Z.onreadystatechange=c;g.O("debug_forward_web_query_parameters")&&(M=DAw(M));Z.open(V,M,!0);A&&(Z.responseType=A);l&&(Z.withCredentials=!0);V=V==="POST"&&(window.FormData===void 0||!(I instanceof FormData));if(t=VY1(M,t))for(let B in t)Z.setRequestHeader(B,t[B]),"content-type"===B.toLowerCase()&&(V=!1);V&&Z.setRequestHeader("Content-Type","application/x-www-form-urlencoded");J&&"onprogress"in Z&&(Z.onprogress=()=>{J(Z.responseText)});
if(e&&"setAttributionReporting"in XMLHttpRequest.prototype){M={eventSourceEligible:!0,triggerEligible:!1};try{Z.setAttributionReporting(M)}catch(B){qW(B)}}Z.send(I);return Z};
  var eW9 = vi;
  g.kk = function(M,D){var V=D.format||"JSON";M=tYa(M,D);var I=ARm(M,D),t=!1,A=eW9(M,e=>{if(!t){t=!0;l&&g.us(l);var J=g.Z2(e),Z=null,c=400<=e.status&&e.status<500,B=500<=e.status&&e.status<600;if(J||c||B)Z=JRw(M,V,e,D.convertToSafeHtml);J&&(J=Z6w(V,e,Z));Z=Z||{};c=D.context||g.HE;J?D.onSuccess&&D.onSuccess.call(c,e,Z):D.onError&&D.onError.call(c,e,Z);D.onFinish&&D.onFinish.call(c,e,Z)}},D.method,I,D.headers,D.responseType,D.withCredentials,!1,D.onProgress);
I=D.timeout||0;if(D.onTimeout&&I>0){let e=D.onTimeout;var l=g.ci(()=>{t||(t=!0,A.abort(),g.us(l),e.call(D.context||g.HE,A))},I)}return A};
  RA = function(M,D){D.method="POST";D.postParams||(D.postParams={});return g.kk(M,D)};
  KRa = function(M){try{return(new Blob(M.split(""))).size}catch(D){return qW(D),null}};
  g.Kf = function(M){var D=[],V=0;for(let I=0;I<M.length;I++){let t=M.charCodeAt(I);t<128?D[V++]=t:(t<2048?D[V++]=t>>6|192:((t&64512)==55296&&I+1<M.length&&(M.charCodeAt(I+1)&64512)==56320?(t=65536+((t&1023)<<10)+(M.charCodeAt(++I)&1023),D[V++]=t>>18|240,D[V++]=t>>12&63|128):D[V++]=t>>12|224,D[V++]=t>>6&63|128),D[V++]=t&63|128)}return D};
  var S9b = undefined;
  var YDE = undefined;
  var VL = {};
  var P92 = function(){this.input=null;this.UF=this.qg=this.Hs=0;this.output=null;this.Vl=this.ih=this.Xm=0;this.msg="";this.state=null;this.Sr=2;this.lg=0};
  rE = function(M){for(var D=M.length;--D>=0;)M[D]=0};
  kAq = function(){this.By=null;this.status=0;this.yG=null;this.wrap=this.pending=this.IM=this.xZ=0;this.YM=null;this.Ni=0;this.method=8;this.eL=-1;this.OC=this.rK=this.PS=0;this.window=null;this.Sk=0;this.head=this.Ml=null;this.aQ=this.n3=this.strategy=this.level=this.s5=this.Jt=this.xF=this.gr=this.He=this.Qp=this.eh=this.Wp=this.Yc=this.No=this.XF=this.sK=this.tf=this.U9=this.Ju=0;this.a9=new VL.Qm(1146);this.rq=new VL.Qm(122);this.tk=new VL.Qm(78);rE(this.a9);rE(this.rq);rE(this.tk);this.Xu=this.Bh=
this.wh=null;this.Vm=new VL.Qm(16);this.gM=new VL.Qm(573);rE(this.gM);this.yM=this.tR=0;this.depth=new VL.Qm(573);rE(this.depth);this.vH=this.KF=this.BR=this.matches=this.ii=this.EK=this.vg=this.l$=this.sE=this.e_=0};
  var PS = {2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};
  dE = function(M,D){M.msg=PS[D];return D};
  var $N = Array(256);
  var HS = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
  var z1 = Array(29);
  var hr = Array(512);
  var oQ = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
  var vS = Array(30);
  var iS = Array(576);
  A3w = function(M,D){var V=0;do V|=M&1,M>>>=1,V<<=1;while(--D>0);return V>>>1};
  lei = function(M,D,V){var I=Array(16),t=0,A;for(A=1;A<=15;A++)I[A]=t=t+V[A-1]<<1;for(V=0;V<=D;V++)t=M[V*2+1],t!==0&&(M[V*2]=A3w(I[t]++,t))};
  var K4 = Array(60);
  tr = function(M,D,V,I,t){this.S2=M;this.CI=D;this.pI=V;this.uT=I;this.GR=t;this.Hd=M&&M.length};
  r3E = undefined;
  XQ1 = undefined;
  var Kuw = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];
  i7a = undefined;
  var dI1 = !1;
  Ar = function(M,D){this.ew=M;this.R7=0;this.N5=D};
  erw = function(M){var D;for(D=0;D<286;D++)M.a9[D*2]=0;for(D=0;D<30;D++)M.rq[D*2]=0;for(D=0;D<19;D++)M.tk[D*2]=0;M.a9[512]=1;M.EK=M.ii=0;M.l$=M.matches=0};
  var sk = function(M,D,V,I){var t=M&65535|0;M=M>>>16&65535|0;for(var A;V!==0;){A=V>2E3?2E3:V;V-=A;do t=t+D[I++]|0,M=M+t|0;while(--A);t%=65521;M%=65521}return t|M<<16|0};
  n4 = function(M){var D=M.PS,V;do{var I=M.Sk-M.gr-M.Qp;if(M.Qp>=D+(D-262)){VL.d8(M.window,M.window,D,D,0);M.He-=D;M.Qp-=D;M.No-=D;var t=V=M.U9;do{var A=M.head[--t];M.head[t]=A>=D?A-D:0}while(--V);t=V=D;do A=M.Ml[--t],M.Ml[t]=A>=D?A-D:0;while(--V);I+=D}if(M.By.qg===0)break;t=M.By;V=M.window;A=M.Qp+M.gr;var l=t.qg;l>I&&(l=I);l===0?V=0:(t.qg-=l,VL.d8(V,t.input,t.Hs,l,A),t.state.wrap===1?t.lg=sk(t.lg,V,l,A):t.state.wrap===2&&(t.lg=L4(t.lg,V,l,A)),t.Hs+=l,t.UF+=l,V=l);M.gr+=V;if(M.gr+M.BR>=3)for(I=M.Qp-M.BR,
M.Ju=M.window[I],M.Ju=(M.Ju<<M.XF^M.window[I+1])&M.sK;M.BR&&!(M.Ju=(M.Ju<<M.XF^M.window[I+3-1])&M.sK,M.Ml[I&M.OC]=M.head[M.Ju],M.head[M.Ju]=I,I++,M.BR--,M.gr+M.BR<3););}while(M.gr<262&&M.By.qg!==0)};
  H7w = function(M){var D=4093624447,V;for(V=0;V<=31;V++,D>>>=1)if(D&1&&M.a9[V*2]!==0)return 0;if(M.a9[18]!==0||M.a9[20]!==0||M.a9[26]!==0)return 1;for(V=32;V<256;V++)if(M.a9[V*2]!==0)return 1;return 0};
  c3Y = function(M,D,V,I){var t=D*2,A=V*2;return M[t]<M[A]||M[t]===M[A]&&I[D]<=I[V]};
  BS = function(M,D,V){for(var I=M.gM[V],t=V<<1;t<=M.tR;){t<M.tR&&c3Y(D,M.gM[t+1],M.gM[t],M.depth)&&t++;if(c3Y(D,I,M.gM[t],M.depth))break;M.gM[V]=M.gM[t];V=t;t<<=1}M.gM[V]=I};
  kN = function(M,D){var V=D.ew,I=D.N5.S2,t=D.N5.Hd,A=D.N5.uT,l,e=-1;M.tR=0;M.yM=573;for(l=0;l<A;l++)V[l*2]!==0?(M.gM[++M.tR]=e=l,M.depth[l]=0):V[l*2+1]=0;for(;M.tR<2;){var J=M.gM[++M.tR]=e<2?++e:0;V[J*2]=1;M.depth[J]=0;M.EK--;t&&(M.ii-=I[J*2+1])}D.R7=e;for(l=M.tR>>1;l>=1;l--)BS(M,V,l);J=A;do l=M.gM[1],M.gM[1]=M.gM[M.tR--],BS(M,V,1),I=M.gM[1],M.gM[--M.yM]=l,M.gM[--M.yM]=I,V[J*2]=V[l*2]+V[I*2],M.depth[J]=(M.depth[l]>=M.depth[I]?M.depth[l]:M.depth[I])+1,V[l*2+1]=V[I*2+1]=J,M.gM[1]=J++,BS(M,V,1);while(M.tR>=
2);M.gM[--M.yM]=M.gM[1];l=D.ew;J=D.R7;I=D.N5.S2;t=D.N5.Hd;A=D.N5.CI;var Z=D.N5.pI,c=D.N5.GR,B,u=0;for(B=0;B<=15;B++)M.Vm[B]=0;l[M.gM[M.yM]*2+1]=0;for(D=M.yM+1;D<573;D++){var H=M.gM[D];B=l[l[H*2+1]*2+1]+1;B>c&&(B=c,u++);l[H*2+1]=B;if(!(H>J)){M.Vm[B]++;var R=0;H>=Z&&(R=A[H-Z]);var W=l[H*2];M.EK+=W*(B+R);t&&(M.ii+=W*(I[H*2+1]+R))}}if(u!==0){do{for(B=c-1;M.Vm[B]===0;)B--;M.Vm[B]--;M.Vm[B+1]+=2;M.Vm[c]--;u-=2}while(u>0);for(B=c;B!==0;B--)for(H=M.Vm[B];H!==0;)I=M.gM[--D],I>J||(l[I*2+1]!==B&&(M.EK+=(B-l[I*
2+1])*l[I*2],l[I*2+1]=B),H--)}lei(V,e,M.Vm)};
  u8R = function(M,D,V){var I,t=-1,A=D[1],l=0,e=7,J=4;A===0&&(e=138,J=3);D[(V+1)*2+1]=65535;for(I=0;I<=V;I++){var Z=A;A=D[(I+1)*2+1];++l<e&&Z===A||(l<J?M.tk[Z*2]+=l:Z!==0?(Z!==t&&M.tk[Z*2]++,M.tk[32]++):l<=10?M.tk[34]++:M.tk[36]++,l=0,t=Z,A===0?(e=138,J=3):Z===A?(e=6,J=3):(e=7,J=4))}};
  var zrY = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
  eq = function(M,D){M.yG[M.pending++]=D&255;M.yG[M.pending++]=D>>>8&255};
  Z6 = function(M,D,V){M.vH>16-V?(M.KF|=D<<M.vH&65535,eq(M,M.KF),M.KF=D>>16-M.vH,M.vH+=V-16):(M.KF|=D<<M.vH&65535,M.vH+=V)};
  cS = function(M,D,V){Z6(M,V[D*2],V[D*2+1])};
  $Im = function(M,D,V){var I,t=-1,A=D[1],l=0,e=7,J=4;A===0&&(e=138,J=3);for(I=0;I<=V;I++){var Z=A;A=D[(I+1)*2+1];if(!(++l<e&&Z===A)){if(l<J){do cS(M,Z,M.tk);while(--l!==0)}else Z!==0?(Z!==t&&(cS(M,Z,M.tk),l--),cS(M,16,M.tk),Z6(M,l-3,2)):l<=10?(cS(M,17,M.tk),Z6(M,l-3,3)):(cS(M,18,M.tk),Z6(M,l-11,7));l=0;t=Z;A===0?(e=138,J=3):Z===A?(e=6,J=3):(e=7,J=4)}}};
  BWw = function(M,D,V){var I=0;if(M.l$!==0){do{var t=M.yG[M.vg+I*2]<<8|M.yG[M.vg+I*2+1];var A=M.yG[M.e_+I];I++;if(t===0)cS(M,A,D);else{var l=$N[A];cS(M,l+256+1,D);var e=HS[l];e!==0&&(A-=z1[l],Z6(M,A,e));t--;l=t<256?hr[t]:hr[256+(t>>>7)];cS(M,l,V);e=oQ[l];e!==0&&(t-=vS[l],Z6(M,t,e))}}while(I<M.l$)}cS(M,256,D)};
  J3a = function(M){M.vH>8?eq(M,M.KF):M.vH>0&&(M.yG[M.pending++]=M.KF);M.KF=0;M.vH=0};
  Z72 = function(M,D,V){J3a(M);eq(M,V);eq(M,~V);VL.d8(M.yG,M.window,D,V,M.pending);M.pending+=V};
  X3 = function(M){var D=M.state,V=D.pending;V>M.ih&&(V=M.ih);V!==0&&(VL.d8(M.output,D.yG,D.IM,V,M.Xm),M.Xm+=V,D.IM+=V,M.Vl+=V,M.ih-=V,D.pending-=V,D.pending===0&&(D.IM=0))};
  WS = function(M,D){var V=M.No>=0?M.No:-1,I=M.Qp-M.No,t=0;if(M.level>0){M.By.Sr===2&&(M.By.Sr=H7w(M));kN(M,M.wh);kN(M,M.Bh);u8R(M,M.a9,M.wh.R7);u8R(M,M.rq,M.Bh.R7);kN(M,M.Xu);for(t=18;t>=3&&M.tk[zrY[t]*2+1]===0;t--);M.EK+=3*(t+1)+5+5+4;var A=M.EK+3+7>>>3;var l=M.ii+3+7>>>3;l<=A&&(A=l)}else A=l=I+5;if(I+4<=A&&V!==-1)Z6(M,D?1:0,3),Z72(M,V,I);else if(M.strategy===4||l===A)Z6(M,2+(D?1:0),3),BWw(M,iS,K4);else{Z6(M,4+(D?1:0),3);V=M.wh.R7+1;I=M.Bh.R7+1;t+=1;Z6(M,V-257,5);Z6(M,I-1,5);Z6(M,t-4,4);for(A=0;A<t;A++)Z6(M,
M.tk[zrY[A]*2+1],3);$Im(M,M.a9,V-1);$Im(M,M.rq,I-1);BWw(M,M.a9,M.rq)}erw(M);D&&J3a(M);M.No=M.Qp;X3(M.By)};
  QL = function(M,D,V,I,t){this.yF=M;this.d7=D;this.E3=V;this.lm=I;this.func=t};
  hrS = function(M,D){var V=M.Jt,I=M.Qp,t=M.xF,A=M.aQ,l=M.Qp>M.PS-262?M.Qp-(M.PS-262):0,e=M.window,J=M.OC,Z=M.Ml,c=M.Qp+258,B=e[I+t-1],u=e[I+t];M.xF>=M.n3&&(V>>=2);A>M.gr&&(A=M.gr);do{var H=D;if(e[H+t]===u&&e[H+t-1]===B&&e[H]===e[I]&&e[++H]===e[I+1]){I+=2;for(H++;e[++I]===e[++H]&&e[++I]===e[++H]&&e[++I]===e[++H]&&e[++I]===e[++H]&&e[++I]===e[++H]&&e[++I]===e[++H]&&e[++I]===e[++H]&&e[++I]===e[++H]&&I<c;);H=258-(c-I);I=c-258;if(H>t){M.He=D;t=H;if(H>=A)break;B=e[I+t-1];u=e[I+t]}}}while((D=Z[D&J])>l&&--V!==
0);return t<=M.gr?t:M.gr};
  RQ = function(M,D,V){M.yG[M.vg+M.l$*2]=D>>>8&255;M.yG[M.vg+M.l$*2+1]=D&255;M.yG[M.e_+M.l$]=V&255;M.l$++;D===0?M.a9[V*2]++:(M.matches++,D--,M.a9[($N[V]+256+1)*2]++,M.rq[(D<256?hr[D]:hr[256+(D>>>7)])*2]++);return M.l$===M.sE-1};
  wE = function(M,D){for(var V;;){if(M.gr<262){n4(M);if(M.gr<262&&D===0)return 1;if(M.gr===0)break}V=0;M.gr>=3&&(M.Ju=(M.Ju<<M.XF^M.window[M.Qp+3-1])&M.sK,V=M.Ml[M.Qp&M.OC]=M.head[M.Ju],M.head[M.Ju]=M.Qp);V!==0&&M.Qp-V<=M.PS-262&&(M.Yc=hrS(M,V));if(M.Yc>=3)if(V=RQ(M,M.Qp-M.He,M.Yc-3),M.gr-=M.Yc,M.Yc<=M.s5&&M.gr>=3){M.Yc--;do M.Qp++,M.Ju=(M.Ju<<M.XF^M.window[M.Qp+3-1])&M.sK,M.Ml[M.Qp&M.OC]=M.head[M.Ju],M.head[M.Ju]=M.Qp;while(--M.Yc!==0);M.Qp++}else M.Qp+=M.Yc,M.Yc=0,M.Ju=M.window[M.Qp],M.Ju=(M.Ju<<M.XF^
M.window[M.Qp+1])&M.sK;else V=RQ(M,0,M.window[M.Qp]),M.gr--,M.Qp++;if(V&&(WS(M,!1),M.By.ih===0))return 1}M.BR=M.Qp<2?M.Qp:2;return D===4?(WS(M,!0),M.By.ih===0?3:4):M.l$&&(WS(M,!1),M.By.ih===0)?1:2};
  T1 = function(M,D){for(var V,I;;){if(M.gr<262){n4(M);if(M.gr<262&&D===0)return 1;if(M.gr===0)break}V=0;M.gr>=3&&(M.Ju=(M.Ju<<M.XF^M.window[M.Qp+3-1])&M.sK,V=M.Ml[M.Qp&M.OC]=M.head[M.Ju],M.head[M.Ju]=M.Qp);M.xF=M.Yc;M.Wp=M.He;M.Yc=2;V!==0&&M.xF<M.s5&&M.Qp-V<=M.PS-262&&(M.Yc=hrS(M,V),M.Yc<=5&&(M.strategy===1||M.Yc===3&&M.Qp-M.He>4096)&&(M.Yc=2));if(M.xF>=3&&M.Yc<=M.xF){I=M.Qp+M.gr-3;V=RQ(M,M.Qp-1-M.Wp,M.xF-3);M.gr-=M.xF-1;M.xF-=2;do++M.Qp<=I&&(M.Ju=(M.Ju<<M.XF^M.window[M.Qp+3-1])&M.sK,M.Ml[M.Qp&M.OC]=
M.head[M.Ju],M.head[M.Ju]=M.Qp);while(--M.xF!==0);M.eh=0;M.Yc=2;M.Qp++;if(V&&(WS(M,!1),M.By.ih===0))return 1}else if(M.eh){if((V=RQ(M,0,M.window[M.Qp-1]))&&WS(M,!1),M.Qp++,M.gr--,M.By.ih===0)return 1}else M.eh=1,M.Qp++,M.gr--}M.eh&&(RQ(M,0,M.window[M.Qp-1]),M.eh=0);M.BR=M.Qp<2?M.Qp:2;return D===4?(WS(M,!0),M.By.ih===0?3:4):M.l$&&(WS(M,!1),M.By.ih===0)?1:2};
  bS = [];
  var WuE = {};
  Ve9 = function(M){var D,V,I=M.length,t=0;for(D=0;D<I;D++){var A=M.charCodeAt(D);if((A&64512)===55296&&D+1<I){var l=M.charCodeAt(D+1);(l&64512)===56320&&(A=65536+(A-55296<<10)+(l-56320),D++)}t+=A<128?1:A<2048?2:A<65536?3:4}var e=new VL.Wf(t);for(D=V=0;V<t;D++)A=M.charCodeAt(D),(A&64512)===55296&&D+1<I&&(l=M.charCodeAt(D+1),(l&64512)===56320&&(A=65536+(A-55296<<10)+(l-56320),D++)),A<128?e[V++]=A:(A<2048?e[V++]=192|A>>>6:(A<65536?e[V++]=224|A>>>12:(e[V++]=240|A>>>18,e[V++]=128|A>>>12&63),e[V++]=128|A>>>
6&63),e[V++]=128|A&63);return e};
  G1 = function(M){if(!(this instanceof G1))return new G1(M);M=this.options=VL.assign({level:-1,method:8,chunkSize:16384,fj:15,fi:8,strategy:0,to:""},M||{});M.raw&&M.fj>0?M.fj=-M.fj:M.a8&&M.fj>0&&M.fj<16&&(M.fj+=16);this.err=0;this.msg="";this.ended=!1;this.chunks=[];this.By=new P92;this.By.ih=0;var D=this.By;var V=M.level,I=M.method,t=M.fj,A=M.fi,l=M.strategy;if(D){var e=1;V===-1&&(V=6);t<0?(e=0,t=-t):t>15&&(e=2,t-=16);if(A<1||A>9||I!==8||t<8||t>15||V<0||V>9||l<0||l>4)D=dE(D,-2);else{t===8&&(t=9);var J=
new kAq;D.state=J;J.By=D;J.wrap=e;J.YM=null;J.rK=t;J.PS=1<<J.rK;J.OC=J.PS-1;J.tf=A+7;J.U9=1<<J.tf;J.sK=J.U9-1;J.XF=~~((J.tf+3-1)/3);J.window=new VL.Wf(J.PS*2);J.head=new VL.Qm(J.U9);J.Ml=new VL.Qm(J.PS);J.sE=1<<A+6;J.xZ=J.sE*4;J.yG=new VL.Wf(J.xZ);J.vg=1*J.sE;J.e_=3*J.sE;J.level=V;J.strategy=l;J.method=I;if(D&&D.state){D.UF=D.Vl=0;D.Sr=2;V=D.state;V.pending=0;V.IM=0;V.wrap<0&&(V.wrap=-V.wrap);V.status=V.wrap?42:113;D.lg=V.wrap===2?0:1;V.eL=0;if(!dI1){I=Array(16);for(A=l=0;A<28;A++)for(z1[A]=l,t=0;t<
1<<HS[A];t++)$N[l++]=A;$N[l-1]=A;for(A=l=0;A<16;A++)for(vS[A]=l,t=0;t<1<<oQ[A];t++)hr[l++]=A;for(l>>=7;A<30;A++)for(vS[A]=l<<7,t=0;t<1<<oQ[A]-7;t++)hr[256+l++]=A;for(t=0;t<=15;t++)I[t]=0;for(t=0;t<=143;)iS[t*2+1]=8,t++,I[8]++;for(;t<=255;)iS[t*2+1]=9,t++,I[9]++;for(;t<=279;)iS[t*2+1]=7,t++,I[7]++;for(;t<=287;)iS[t*2+1]=8,t++,I[8]++;lei(iS,287,I);for(t=0;t<30;t++)K4[t*2+1]=5,K4[t*2]=A3w(t,5);r3E=new tr(iS,HS,257,286,15);XQ1=new tr(K4,oQ,0,30,15);i7a=new tr([],Kuw,0,19,7);dI1=!0}V.wh=new Ar(V.a9,r3E);
V.Bh=new Ar(V.rq,XQ1);V.Xu=new Ar(V.tk,i7a);V.KF=0;V.vH=0;erw(V);V=0}else V=dE(D,-2);V===0&&(D=D.state,D.Sk=2*D.PS,rE(D.head),D.s5=bS[D.level].d7,D.n3=bS[D.level].yF,D.aQ=bS[D.level].E3,D.Jt=bS[D.level].lm,D.Qp=0,D.No=0,D.gr=0,D.BR=0,D.Yc=D.xF=2,D.eh=0,D.Ju=0);D=V}}else D=-2;if(D!==0)throw Error(PS[D]);M.header&&(D=this.By)&&D.state&&D.state.wrap===2&&(D.state.YM=M.header);if(M.E8){var Z;typeof M.E8==="string"?Z=Ve9(M.E8):WuE.call(M.E8)==="[object ArrayBuffer]"?Z=new Uint8Array(M.E8):Z=M.E8;M=this.By;
A=Z;l=A.length;if(M&&M.state)if(Z=M.state,D=Z.wrap,D===2||D===1&&Z.status!==42||Z.gr)D=-2;else{D===1&&(M.lg=sk(M.lg,A,l,0));Z.wrap=0;l>=Z.PS&&(D===0&&(rE(Z.head),Z.Qp=0,Z.No=0,Z.BR=0),V=new VL.Wf(Z.PS),VL.d8(V,A,l-Z.PS,Z.PS,0),A=V,l=Z.PS);V=M.qg;I=M.Hs;t=M.input;M.qg=l;M.Hs=0;M.input=A;for(n4(Z);Z.gr>=3;){A=Z.Qp;l=Z.gr-2;do Z.Ju=(Z.Ju<<Z.XF^Z.window[A+3-1])&Z.sK,Z.Ml[A&Z.OC]=Z.head[Z.Ju],Z.head[Z.Ju]=A,A++;while(--l);Z.Qp=A;Z.gr=2;n4(Z)}Z.Qp+=Z.gr;Z.No=Z.Qp;Z.BR=Z.gr;Z.gr=0;Z.Yc=Z.xF=2;Z.eh=0;M.Hs=
I;M.input=t;M.qg=V;Z.wrap=D;D=0}else D=-2;if(D!==0)throw Error(PS[D]);this.X9W=!0}};
  gUq = function(M){var D=D||{};D.a8=!0;D=new G1(D);D.push(M,!0);if(D.err)throw D.msg||PS[D.err];return D.result};
  var sji = 0;
  Ct = function(){return g.vE("ytPubsub2Pubsub2Instance")};
  x4 = function(M,D){var V=Ct();V&&V.publish.call(V,M.toString(),M,D)};
  jU = function(M,D,V={sampleRate:.1}){Math.random()<Math.min(.02,V.sampleRate/100)&&x4("meta_logging_csi_event",{timerName:M,timelineData:D})};
  var gZq = undefined;
  var WR1 = undefined;
  mC = function(M,D,V,I){var t={startTime:(0,g.f)(),ticks:{},infos:{}};try{let l=KRa(D);if(l==null||!(l>WR1||l<gZq)){var A=gUq(YDE(D));let e=(0,g.f)();t.ticks.gelc=e;sji++;g.O("gel_compression_csi_killswitch")||!g.O("log_gel_compression_latency")&&!g.O("log_gel_compression_latency_lr")||jU("gel_compression",t,{sampleRate:.1});V.headers||(V.headers={});V.headers["Content-Encoding"]="gzip";V.postBody=A;V.postParams=void 0}I(M,V)}catch(l){qW(l),I(M,V)}};
  ZV = function(M,D){return M.N?M.N:M.N=new Promise(async V=>{var I=window.AbortController?new window.AbortController:void 0,t=I?.signal,A=!1;try{I&&(M.W=M.A6.WS(()=>{I.abort()},D||2E4)),await fetch("/generate_204",{method:"HEAD",
signal:t}),A=!0}catch{A=!1}finally{M.N=void 0,M.W&&(M.A6.ZQ(M.W),M.W=0),A!==M.isOnline&&(M.isOnline=A,M.isOnline?M.dispatchEvent("networkstatus-online"):M.dispatchEvent("networkstatus-offline")),V(A)}})};
  WN = function(M){this.src=M;this.listeners={};this.W=0};
  g.K = WN.prototype;
  Yw = function(M,D,V,I){for(let t=0;t<M.length;++t){let A=M[t];if(!A.removed&&A.listener==D&&A.capture==!!V&&A.handler==I)return t}return-1};
  var JSq = 0;
  ZMw = function(M,D,V,I,t){this.listener=M;this.proxy=null;this.src=D;this.type=V;this.capture=!!I;this.handler=t;this.key=++JSq;this.removed=this.yW=!1};
  g.K.add = function(M,D,V,I,t){var A=M.toString();M=this.listeners[A];M||(M=this.listeners[A]=[],this.W++);var l=Yw(M,D,I,t);l>-1?(D=M[l],V||(D.yW=!1)):(D=new ZMw(D,this.src,A,!!I,t),D.yW=V,M.push(D));return D};
  KY = function(M){M.removed=!0;M.listener=null;M.proxy=null;M.src=null;M.handler=null};
  g.K.remove = function(M,D,V,I){M=M.toString();if(!(M in this.listeners))return!1;var t=this.listeners[M];D=Yw(t,D,V,I);return D>-1?(KY(t[D]),g.Db(t,D),t.length==0&&(delete this.listeners[M],this.W--),!0):!1};
  g.K.removeAll = function(M){M=M&&M.toString();var D=0;for(let V in this.listeners)if(!M||V==M){let I=this.listeners[V];for(let t=0;t<I.length;t++)++D,KY(I[t]);delete this.listeners[V];this.W--}return D};
  g.K.wS = function(M,D,V,I){M=this.listeners[M.toString()];var t=-1;M&&(t=Yw(M,D,V,I));return t>-1?M[t]:null};
  g.gQ = function(M,D,V){for(let I in M)if(D.call(V,M[I],I,M))return!0;return!1};
  g.K.hasListener = function(M,D){var V=M!==void 0,I=V?M.toString():"",t=D!==void 0;return g.gQ(this.listeners,function(A){for(let l=0;l<A.length;++l)if(!(V&&A[l].type!=I||t&&A[l].capture!=D))return!0;return!1})};
  g.Er = function(){g.v6.call(this);this.WX=new WN(this);this.AS=this;this.TQ=null};
  g.K = g.Er.prototype;
  var Ur = undefined;
  nY = function(M){if(typeof M==="function")return M;M[Ur]||(M[Ur]=function(D){return M.handleEvent(D)});
return M[Ur]};
  var Qk = undefined;
  TD = function(M){M=M[Qk];return M instanceof WN?M:null};
  g.dJ = function(M,D){this.type=M;this.currentTarget=this.target=D;this.defaultPrevented=this.X=!1};
  rJ = function(M,D){g.dJ.call(this,M?M.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.W=null;M&&this.init(M,D)};
  var Or = {};
  bT = function(M){return M in Or?Or[M]:Or[M]="on"+M};
  var GD = 0;
  g.gJ = function(M,D){var V=D.type;V in M.listeners&&g.VT(M.listeners[V],D)&&(KY(D),M.listeners[V].length==0&&(delete M.listeners[V],M.W--))};
  var X1 = undefined;
  iT = function(M){return!(!M||!M[X1])};
  yk = function(M){if(typeof M!=="number"&&M&&!M.removed){var D=M.src;if(iT(D))g.gJ(D.WX,M);else{var V=M.type,I=M.proxy;D.removeEventListener?D.removeEventListener(V,I,M.capture):D.detachEvent?D.detachEvent(bT(V),I):D.addListener&&D.removeListener&&D.removeListener(I);GD--;(V=TD(D))?(g.gJ(V,M),V.W==0&&(V.src=null,D[Qk]=null)):KY(M)}}};
  BvS = function(M,D){if(M.removed)M=!0;else{D=new rJ(D,this);let V=M.listener,I=M.handler||M.src;M.yW&&yk(M);M=V.call(I,D)}return M};
  cSS = function(){function M(V){return D.call(M.src,M.listener,V)}
var D=BvS;return M};
  wJ = function(M,D,V,I,t,A){if(!D)throw Error("Invalid event type");var l=g.dq(t)?!!t.capture:!!t,e=TD(M);e||(M[Qk]=e=new WN(M));V=e.add(D,V,I,l,A);if(V.proxy)return V;I=cSS();V.proxy=I;I.src=M;I.listener=V;if(M.addEventListener)t===void 0&&(t=!1),M.addEventListener(D.toString(),I,t);else if(M.attachEvent)M.attachEvent(bT(D.toString()),I);else if(M.addListener&&M.removeListener)M.addListener(I);else throw Error("addEventListener and attachEvent are unavailable.");GD++;return V};
  sr = function(M,D,V,I,t){if(Array.isArray(D)){for(let A=0;A<D.length;A++)sr(M,D[A],V,I,t);return null}V=nY(V);return iT(M)?M.iM(D,V,g.dq(I)?!!I.capture:!!I,t):wJ(M,D,V,!0,I,t)};
  g.LY = function(M,D,V,I,t){if(I&&I.once)return sr(M,D,V,I,t);if(Array.isArray(D)){for(let A=0;A<D.length;A++)g.LY(M,D[A],V,I,t);return null}V=nY(V);return iT(M)?M.listen(D,V,g.dq(I)?!!I.capture:!!I,t):wJ(M,D,V,!1,I,t)};
  g.K.addEventListener = function(M,D,V,I){g.LY(this,M,D,V,I)};
  Sa = function(M,D,V,I,t){if(Array.isArray(D))for(let A=0;A<D.length;A++)Sa(M,D[A],V,I,t);else I=g.dq(I)?!!I.capture:!!I,V=nY(V),iT(M)?M.P9(D,V,I,t):M&&(M=TD(M))&&(D=M.wS(D,V,I,t))&&yk(D)};
  g.K.removeEventListener = function(M,D,V,I){Sa(this,M,D,V,I)};
  an = function(M,D,V,I){D=M.WX.listeners[String(D)];if(!D)return!0;D=D.concat();var t=!0;for(let A=0;A<D.length;++A){let l=D[A];if(l&&!l.removed&&l.capture==V){let e=l.listener,J=l.handler||l.src;l.yW&&g.gJ(M.WX,l);t=e.call(J,I)!==!1&&t}}return t&&!I.defaultPrevented};
  g.K.dispatchEvent = function(M){var D=this.TQ;if(D){var V=[];for(var I=1;D;D=D.TQ)V.push(D),++I}D=this.AS;I=M.type||M;if(typeof M==="string")M=new g.dJ(M,D);else if(M instanceof g.dJ)M.target=M.target||D;else{var t=M;M=new g.dJ(I,D);g.xG(M,t)}t=!0;var A;if(V)for(A=V.length-1;!M.X&&A>=0;A--){var l=M.currentTarget=V[A];t=an(l,I,!0,M)&&t}M.X||(l=M.currentTarget=D,t=an(l,I,!0,M)&&t,M.X||(t=an(l,I,!1,M)&&t));if(V)for(A=0;!M.X&&A<V.length;A++)l=M.currentTarget=V[A],t=an(l,I,!1,M)&&t;return t};
  g.K.Nc = function(){g.Er.o_.Nc.call(this);this.WX&&this.WX.removeAll(void 0);this.TQ=null};
  g.K.listen = function(M,D,V,I){return this.WX.add(String(M),D,!1,V,I)};
  g.K.iM = function(M,D,V,I){return this.WX.add(String(M),D,!0,V,I)};
  g.K.P9 = function(M,D,V,I){this.WX.remove(String(M),D,V,I)};
  g.K.wS = function(M,D,V,I){return this.WX.wS(String(M),D,V,I)};
  g.K.hasListener = function(M,D){return this.WX.hasListener(M!==void 0?String(M):void 0,D)};
  var Jz = class extends g.Er{constructor(M){super();this.Z=this.W=0;this.A6=M??{WS:(D,V)=>setTimeout(D,V),
ZQ:D=>{clearTimeout(D)}};
this.isOnline=window.navigator?.onLine??!0;this.X=async()=>{await ZV(this)};
window.addEventListener("offline",this.X);window.addEventListener("online",this.X);this.Z||this.jv()}dispose(){window.removeEventListener("offline",this.X);window.removeEventListener("online",this.X);this.A6.ZQ(this.Z);delete Jz.instance}jj(){return this.isOnline}jv(){this.Z=this.A6.WS(async()=>{this.isOnline?window.navigator?.onLine||await ZV(this):await ZV(this);this.jv()},3E4)}};
  dSS = function(){var M=g.ec;Jz.instance||(Jz.instance=new Jz(M));return Jz.instance};
  lj = undefined;
  JZ = function(){lj||(lj=new eW("yt.offline"));return lj};
  var cF = class extends g.Er{constructor(){super();this.X=!1;this.W=dSS();this.W.listen("networkstatus-online",()=>{if(this.X&&g.O("offline_error_handling")){var M=JZ().get("errors",!0);if(M){for(let D in M)if(M[D]){let V=new g.SM(D,"sent via offline_errors");V.name=M[D].name;V.stack=M[D].stack;V.level=M[D].level;g.xN(V)}JZ().set("errors",{},2592E3,!0)}}})}jj(){return this.W.jj()}Sh(M){this.W.isOnline=M}QF(){var M=window.navigator.onLine;
return M===void 0?!0:M}Ok(){this.X=!0}listen(M,D){return this.W.listen(M,D)}Q9(M){return ZV(this.W,M)}};
  tVm = function(){if(!cF.instance){let M=g.vE("yt.networkStatusManager.instance")||new cF;g.oa("yt.networkStatusManager.instance",M);cF.instance=M}return cF.instance};
  Anw = function(M,D){M.rateLimit?M.W?(g.ec.ZQ(M.Z),M.Z=g.ec.WS(()=>{M.N!==D&&(M.dispatchEvent(D),M.N=D,M.W=(0,g.f)())},M.rateLimit-((0,g.f)()-M.W))):(M.dispatchEvent(D),M.N=D,M.W=(0,g.f)()):M.dispatchEvent(D)};
  var ZK = class{constructor(){this.W=new Map;this.X=!1}requestComplete(M,D){D&&(this.X=!0);M=this.removeParams(M);this.W.get(M)||this.W.set(M,D)}isEndpointCFR(M){M=this.removeParams(M);return(M=this.W.get(M))?!1:M===!1&&this.X?!0:null}removeParams(M){return M.split("?")[0]}};
  INi = function(){if(!ZK.instance){let M=g.vE("yt.networkRequestMonitor.instance")||new ZK;g.oa("yt.networkRequestMonitor.instance",M);ZK.instance=M}return ZK.instance};
  g.LK = class extends g.Er{constructor(M={}){super();this.W=this.Z=0;this.X=tVm();var D=g.vE("yt.networkStatusManager.instance.listen").bind(this.X);D&&(M.rateLimit?(this.rateLimit=M.rateLimit,D("networkstatus-online",()=>{Anw(this,"publicytnetworkstatus-online")}),D("networkstatus-offline",()=>{Anw(this,"publicytnetworkstatus-offline")})):(D("networkstatus-online",()=>{this.dispatchEvent("publicytnetworkstatus-online")}),D("networkstatus-offline",()=>{this.dispatchEvent("publicytnetworkstatus-offline")})))}jj(){var M=
g.vE("yt.networkStatusManager.instance.isNetworkAvailable");
return M?M.bind(this.X)():!0}Sh(M){var D=g.vE("yt.networkStatusManager.instance.networkStatusHint").bind(this.X);D&&D(M)}async Q9(M){var D=g.vE("yt.networkStatusManager.instance.sendNetworkCheckRequest").bind(this.X);return g.O("skip_network_check_if_cfr")&&INi().isEndpointCFR("generate_204")?new Promise(V=>{this.Sh(window.navigator?.onLine||!0);V(this.jj())}):D?D(M):!0}};
  nK = undefined;
  VE = undefined;
  HG = function(M,D){M.W.objectStoreNames.contains(D)&&M.W.deleteObjectStore(D)};
  bB1 = function(){if(VE)return VE();VE=sS("LogsDatabaseV2",{Pv:{LogsRequestsStore:{MR:2}},shared:!1,upgrade(M,D,V){D(2)&&$4(M,"LogsRequestsStore",{keyPath:"id",autoIncrement:!0});D(3);D(5)&&(V=V.objectStore("LogsRequestsStore"),V.W.indexNames.contains("newRequest")&&V.W.deleteIndex("newRequest"),zX(V,"newRequestV2",["status","interface","timestamp"]));D(7)&&HG(M,"sapisid");D(9)&&HG(M,"SWHealthLog")},version:9});return VE()};
  Il = function(M){return g.PG(bB1(),M)};
  aim = async function(M){M=await Il(M);var D=(0,g.f)()-2592E6;await g.uZ(M,["LogsRequestsStore"],{mode:"readwrite",EN:!0},V=>g.oi(V.objectStore("LogsRequestsStore"),{},I=>{if(I.getValue().timestamp<=D)return I.delete().then(()=>g.vG(I))}))};
  EZw = async function(M,D){return(await Il(D)).delete("LogsRequestsStore",M)};
  Gw2 = function(M){g.O("nwl_csi_killswitch")||jU("networkless_performance",M,{sampleRate:1})};
  yBw = async function(M,D){var V={startTime:(0,g.f)(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_READ"},ticks:{}};D=await Il(D);var I=g.f4("INNERTUBE_CONTEXT_CLIENT_NAME",0),t=[M,I,0];I=[M,I,(0,g.f)()];var A=IDBKeyRange.bound(t,I),l="prev";g.O("use_fifo_for_networkless")&&(l="next");var e=void 0;t=M==="NEW"?"readwrite":"readonly";g.O("use_readonly_for_get_most_recent_by_status_killswitch")&&(t="readwrite");await g.uZ(D,["LogsRequestsStore"],{mode:t,EN:!0},J=>g.k4(J.objectStore("LogsRequestsStore").index("newRequestV2"),
{query:A,direction:l},Z=>{Z.getValue()&&(e=Z.getValue(),M==="NEW"&&(e.status="QUEUED",Z.update(e)))}));
V.ticks.tc=(0,g.f)();Gw2(V);return e};
  OBm = async function(M,D){return g.uZ(await Il(D),["LogsRequestsStore"],{mode:"readwrite",EN:!0},V=>{var I=V.objectStore("LogsRequestsStore");return I.get(M).then(t=>{if(t)return t.status="QUEUED",I.put(t).then(()=>t)})})};
  UFY = async function(M,D,V=!0,I){return g.uZ(await Il(D),["LogsRequestsStore"],{mode:"readwrite",EN:!0},t=>{var A=t.objectStore("LogsRequestsStore");return A.get(M).then(l=>l?(l.status="NEW",V&&(l.sendCount+=1),I!==void 0&&(l.options.compress=I),A.put(l).then(()=>l)):g.lZ.resolve(void 0))})};
  SDi = async function(M,D){var V={startTime:(0,g.f)(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_WRITE"},ticks:{}};D=await Il(D);M={...M,options:JSON.parse(JSON.stringify(M.options)),interface:g.f4("INNERTUBE_CONTEXT_CLIENT_NAME",0)};M=await D.put("LogsRequestsStore",M);V.ticks.tc=(0,g.f)();Gw2(V);return M};
  var jj1 = class{constructor({url:M,q6X:D}){this.X=M;this.Z=D;this.N=(new Date).getTime()-17040672E5;this.W={};for(var V=/[?&]([^&=]+)=([^&]*)/g;D=V.exec(M);)this.W[D[1]]=D[2]}};
  L5 = function(M,D){return D?"&"+M+"="+encodeURIComponent(D):""};
  wUm = function(M){M=M.Z;if(!M)return"";var D=L5("uap",M.platform)+L5("uapv",M.platformVersion)+L5("uafv",M.uaFullVersion)+L5("uaa",M.architecture)+L5("uam",M.model)+L5("uab",M.bitness);M.fullVersionList&&(D+="&uafvl="+encodeURIComponent(M.fullVersionList.map(V=>encodeURIComponent(V.brand)+";"+encodeURIComponent(V.version)).join("|")));
M.wow64!=null&&(D+="&uaw="+Number(M.wow64));return D.slice(1)};
  sn = function(M,...D){D=D.filter(Boolean).join("&");if(!D)return M;var V=M.match(/[?&]adurl=/);return V?M.slice(0,V.index+1)+D+"&"+M.slice(V.index+1):M+(M.indexOf("?")<0?"?":"&")+D};
  var Ql = /#|$/;
  Tw = function(M,D,V,I){for(var t=V.length;(D=M.indexOf(V,D))>=0&&D<I;){var A=M.charCodeAt(D-1);if(A==38||A==63)if(A=M.charCodeAt(D+t),!A||A==61||A==38||A==35)return D;D+=t+1}return-1};
  bN = function(M,D){var V=M.search(Ql),I=Tw(M,0,D,V);if(I<0)return null;var t=M.indexOf("&",I);if(t<0||t>V)t=V;I+=D.length+1;return lD(M.slice(I,t!==-1?t:0))};
  FRt = function(M,D=""){try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(M,D))return!0}catch(V){}return!1};
  var MVY = 0;
  var AZ = {};
  qDi = function(M,D,V={}){var I=new Image,t=""+MVY++;AZ[t]=I;I.onload=I.onerror=()=>{D&&AZ[t]&&D();delete AZ[t]};
V.scrubReferrer&&(I.referrerPolicy="no-referrer");I.src=M};
  g.yc = function(M){var D=g.lE();return D?D.toLowerCase().indexOf(M)>=0:!1};
  g.U6 = function(){return g.yc("cobalt")};
  g.tZ = function(M,D,V,I,t="",A=!1,l=!1){if(M)if(V&&!g.U6())qW(new g.SM("Legacy referrer-scrubbed ping detected")),M&&qDi(M,void 0,{scrubReferrer:!0});else if(t)vi(M,D,"POST",t,I);else if(g.f4("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)||I||l)vi(M,D,"GET","",I,void 0,A,l);else{b:{try{c:{var e=new jj1({url:M});if(e.W.dsh==="1")var J=null;else{var Z=e.W.ae;if(Z==="1"){let B=e.W.adurl;if(B)try{J={version:3,QE:decodeURIComponent(B),fP:sn(e.X,"act=1","ri=1",wUm(e))};break c}catch(u){}}J=Z==="2"?{version:4,QE:sn(e.X,
"dct=1","suid="+e.N,"ri=1"),fP:sn(e.X,"act=1","ri=1","suid="+e.N)}:null}}if(J){let B=da(M);var c=!(!B||!B.endsWith("/aclk")||bN(M,"ri")!=="1");break b}}catch(B){}c=!1}c?FRt(M)?(D&&D(),V=!0):V=!1:V=!1;V||qDi(M,D)}};
  Jni = function(M,D,V){D=g.O("web_fp_via_jspb")?Object.assign({},D):D;g.O("use_request_time_ms_header")?D.headers&&t0(M)&&(D.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round((0,g.f)()))):D.postParams?.requestTimeMs&&(D.postParams.requestTimeMs=Math.round((0,g.f)()));V&&Object.keys(D).length===0?g.tZ(M):D.compress?D.postBody?(typeof D.postBody!=="string"&&(D.postBody=JSON.stringify(D.postBody)),mC(M,D.postBody,D,g.kk)):mC(M,JSON.stringify(D.postParams),D,RA):g.kk(M,D)};
  VVY = function(M){if(g.O("offline_error_handling")){var D=JZ().get("errors",!0)||{};D[M.message]={name:M.name,stack:M.stack};M.level&&(D[M.message].level=M.level);JZ().set("errors",D,2592E3,!0)}};
  g.Bm = class{constructor(){this.promise=new Promise((M,D)=>{this.resolve=M;this.reject=D})}};
  LUq = async function(M,D){var V=[];D=await g.PG(dF,D);await g.uZ(D,["databases"],{EN:!0,mode:"readonly"},I=>{V.length=0;return g.oi(I.objectStore("databases"),{},t=>{M(t.getValue())&&V.push(t.getValue());return g.vG(t)})});
return V};
  nLa = function(M,D){return LUq(V=>V.publicName===M&&V.userIdentifier!==void 0,D)};
  OTR = function(M,D,V){M=M.map(async I=>{await Ri(I.actualName,D);await rF(I.actualName,V)});
return Promise.all(M).then(()=>{})};
  U0E = async function(M){var D={},V=await g.Y4();V&&(mh(M),M=await nLa(M,V),await OTR(M,D,V))};
  fi1 = async function(){await U0E("LogsDatabaseV2")};
  uj = function(M,D){g.O("use_event_time_ms_header")&&t0(M)&&(D.headers||(D.headers={}),D.headers["X-Goog-Event-Time"]=JSON.stringify(Math.round((0,g.f)())));return D};
  MO = function(M){return!!M.hL||M.Y8};
  nZY = function(M){MO(M)&&!M.cg&&(M.W=!0,M.FX&&Math.random()<=M.u0&&M.pO.eH(M.hL),M.TD(),M.c5.jj()&&M.N(),M.c5.listen(M.ge,M.N.bind(M)),M.c5.listen(M.lE,M.Z.bind(M)))};
  DK = function(M,D){M.Hu&&!M.c5.jj()?M.Hu(D):M.handleError(D)};
  wVE = function(M){return(M=M?.error?.code)&&M>=400&&M<=599?!1:!0};
  Ta1 = function(M){M=M?.error?.code;return!(M!==400&&M!==415)};
  QjE = function(M,D){if(!MO(M))throw Error("IndexedDB is not supported: updateRequestHandlers");var V=D.options.onError?D.options.onError:()=>{};
D.options.onError=async(t,A)=>{var l=wVE(A),e=Ta1(A);e&&M.C0&&M.C0("web_enable_error_204")&&M.handleError(Error("Request failed due to compression"),D.url,A);if(M.C0&&M.C0("nwl_consider_error_code")&&l||M.C0&&!M.C0("nwl_consider_error_code")&&M.potentialEsfErrorCounter<=M.PL)if(M.c5.Q9&&await M.c5.Q9(),!M.c5.jj()){V(t,A);M.C0&&M.C0("nwl_consider_error_code")&&D?.id!==void 0&&await M.pO.Bz(D.id,M.hL,!1);return}M.C0&&M.C0("nwl_consider_error_code")&&!l&&M.potentialEsfErrorCounter>M.PL||(M.potentialEsfErrorCounter++,
D?.id!==void 0&&(D.sendCount<M.yL?(await M.pO.Bz(D.id,M.hL,!0,e?!1:void 0),M.A6.WS(()=>{M.c5.jj()&&M.N()},M.QL)):await M.pO.Cy(D.id,M.hL)),V(t,A))};
var I=D.options.onSuccess?D.options.onSuccess:()=>{};
D.options.onSuccess=async(t,A)=>{D?.id!==void 0&&await M.pO.Cy(D.id,M.hL);M.c5.Sh&&M.C0&&M.C0("vss_network_hint")&&M.c5.Sh(!0);I(t,A)};
return D};
  var OS7 = class{constructor(M){this.Y8=this.W=!1;this.potentialEsfErrorCounter=this.X=0;this.handleError=()=>{};
this.AU=()=>{};
this.now=Date.now;this.cg=!1;this.HP={o_H:D=>{this.hL=D},
bOU:()=>{this.N()},
Iw:()=>{this.Z()},
Kt:async D=>{await this.Kt(D)},
X3:(D,V)=>this.X3(D,V),
TD:()=>{this.TD()}};
this.o6=M.o6??100;this.yL=M.yL??1;this.T4=M.T4??2592E6;this.X6=M.X6??12E4;this.QL=M.QL??5E3;this.hL=M.hL??void 0;this.FX=!!M.FX;this.u0=M.u0??.1;this.PL=M.PL??10;M.handleError&&(this.handleError=M.handleError);M.AU&&(this.AU=M.AU);M.cg&&(this.cg=M.cg);M.Y8&&(this.Y8=M.Y8);this.C0=M.C0;this.A6=M.A6;this.pO=M.pO;this.c5=M.c5;this.Cx=M.Cx;this.ge=M.ge;this.lE=M.lE;MO(this)&&(!this.C0||this.C0("networkless_logging"))&&nZY(this)}writeThenSend(M,D={}){if(MO(this)&&this.W){let V={url:M,options:D,timestamp:this.now(),
status:"NEW",sendCount:0};this.pO.set(V,this.hL).then(I=>{V.id=I;this.c5.jj()&&this.Kt(V)}).catch(I=>{this.Kt(V);
DK(this,I)})}else this.Cx(M,D)}sendThenWrite(M,D={},V){if(MO(this)&&this.W){let I={url:M,
options:D,timestamp:this.now(),status:"NEW",sendCount:0};this.C0&&this.C0("nwl_skip_retry")&&(I.skipRetry=V);if(this.c5.jj()||this.C0&&this.C0("nwl_aggressive_send_then_write")&&!I.skipRetry){if(!I.skipRetry){let t=D.onError?D.onError:()=>{};
D.onError=async(A,l)=>{await this.pO.set(I,this.hL).catch(e=>{DK(this,e)});
t(A,l)}}this.Cx(M,D,I.skipRetry)}else this.pO.set(I,this.hL).catch(t=>{this.Cx(M,D,I.skipRetry);
DK(this,t)})}else V=this.C0&&this.C0("nwl_skip_retry")&&V,this.Cx(M,D,V)}sendAndWrite(M,D={}){if(MO(this)&&this.W){let V={url:M,
options:D,timestamp:this.now(),status:"NEW",sendCount:0},I=!1,t=D.onSuccess?D.onSuccess:()=>{};
V.options.onSuccess=(A,l)=>{V.id!==void 0?this.pO.Cy(V.id,this.hL):I=!0;this.c5.Sh&&this.C0&&this.C0("vss_network_hint")&&this.c5.Sh(!0);t(A,l)};
this.Cx(V.url,V.options,void 0,!0);this.pO.set(V,this.hL).then(A=>{V.id=A;I&&this.pO.Cy(V.id,this.hL)}).catch(A=>{DK(this,A)})}else this.Cx(M,D,void 0,!0)}N(){if(!MO(this))throw Error("IndexedDB is not supported: throttleSend");
this.X||(this.X=this.A6.WS(async()=>{var M=await this.pO.u2("NEW",this.hL);M?(await this.Kt(M),this.X&&(this.X=0,this.N())):this.Z()},this.o6))}Z(){this.A6.ZQ(this.X);
this.X=0}async Kt(M){if(!MO(this))throw Error("IndexedDB is not supported: immediateSend");M.id!==void 0&&(await this.pO.Qs(M.id,this.hL)||this.AU(Error("The request cannot be found in the database.")));this.X3(M,this.T4)?(M.skipRetry||(M=QjE(this,M)),M&&(M.skipRetry&&M.id!==void 0&&await this.pO.Cy(M.id,this.hL),this.Cx(M.url,M.options,!!M.skipRetry))):(this.AU(Error("Networkless Logging: Stored logs request expired age limit")),M.id!==void 0&&await this.pO.Cy(M.id,this.hL))}X3(M,D){M=M.timestamp;
return this.now()-M>=D?!1:!0}TD(){if(!MO(this))throw Error("IndexedDB is not supported: retryQueuedRequests");this.pO.u2("QUEUED",this.hL).then(M=>{M&&!this.X3(M,this.X6)?this.A6.WS(async()=>{M.id!==void 0&&await this.pO.Bz(M.id,this.hL);this.TD()}):this.c5.jj()&&this.N()})}};
  var lN1 = class extends OS7{constructor(){nK||(nK=new g.LK({ooX:!0,ENX:!0}));super({pO:{eH:aim,Cy:EZw,u2:yBw,Qs:OBm,Bz:UFY,set:SDi},c5:nK,handleError:(M,D,V)=>{var I=V?.error?.code;I===400||I===415?(M=new g.SM(M.message,D,V?.error?.code),qW(M,void 0,void 0,void 0,!0)):g.xN(M)},
AU:qW,Cx:Jni,now:g.f,Hu:VVY,A6:g.Ej(),ge:"publicytnetworkstatus-online",lE:"publicytnetworkstatus-offline",FX:!0,u0:.1,PL:z9("potential_esf_error_limit",10),C0:g.O,cg:!(GO()&&g.PV(document.location.toString())!=="www.youtube-nocookie.com")});this.Y=new g.Bm;g.O("networkless_immediately_drop_all_requests")&&fi1();ELY("LogsDatabaseV2")}writeThenSend(M,D){D||(D={});D=uj(M,D);GO()||(this.W=!1);super.writeThenSend(M,D)}sendThenWrite(M,D,V){D||(D={});D=uj(M,D);GO()||(this.W=!1);super.sendThenWrite(M,D,
V)}sendAndWrite(M,D){D||(D={});D=uj(M,D);GO()||(this.W=!1);super.sendAndWrite(M,D)}awaitInitialization(){return this.Y.promise}};
  var NaR = undefined;
  CN1 = function(M){return g.PG(NaR(),M)};
  xF1 = async function(M){M=await CN1(M);var D=(0,g.f)()-2592E6;await g.uZ(M,["SWHealthLog"],{mode:"readwrite",EN:!0},V=>g.oi(V.objectStore("SWHealthLog"),{},I=>{if(I.getValue().timestamp<=D)return I.delete().then(()=>g.vG(I))}))};
  pVm = async function(M){await (await CN1(M)).clear("SWHealthLog")};
  eqw = async function(M){if(!M.hL)throw g.Ad("clearSWHealthLogsDb");pVm(M.hL).catch(D=>{M.handleError(D)})};
  BF = function(){var M=g.vE("yt.networklessRequestController.instance");M||(M=new lN1,g.oa("yt.networklessRequestController.instance",M),g.O("networkless_logging")&&g.Y4().then(D=>{M.hL=D;nZY(M);M.Y.resolve();M.FX&&Math.random()<=M.u0&&M.hL&&xF1(M.hL);g.O("networkless_immediately_drop_sw_health_store")&&eqw(M)}));
return M};
  var Znt = {};
  g.$W = function(M,D,V,I){!g.f4("VISITOR_DATA")&&D!=="visitor_id"&&Math.random()<.01&&qW(new g.SM("Missing VISITOR_DATA when sending innertube request.",D,V,I));if(!M.isReady())throw M=new g.SM("innertube xhrclient not ready",D,V,I),g.xN(M),M;var t={headers:I.headers||{},method:"POST",postParams:V,postBody:I.postBody,postBodyFormat:I.postBodyFormat||"JSON",onTimeout:()=>{I.onTimeout()},
onFetchTimeout:I.onTimeout,onSuccess:(Z,c)=>{if(I.onSuccess)I.onSuccess(c)},
onFetchSuccess:Z=>{if(I.onSuccess)I.onSuccess(Z)},
onProgress:Z=>{if(I.onProgress)I.onProgress(Z)},
onError:(Z,c)=>{if(I.onError)I.onError(c)},
onFetchError:Z=>{if(I.onError)I.onError(Z)},
timeout:I.timeout,withCredentials:!0,compress:I.compress};t.headers["Content-Type"]||(t.headers["Content-Type"]="application/json");V="";var A=M.config_.wg;A&&(V=A);A=M.config_.Dw||!1;var l=kw9(A,V,I);Object.assign(t.headers,l);t.headers.Authorization&&!V&&A&&(t.headers["x-origin"]=window.location.origin);var e=Vc(`${V}${`/youtubei/${M.config_.innertubeApiVersion}/${D}`}`,{alt:"json"}),J=(Z=!1)=>{try{if(Z&&I.retry&&!I.networklessOptions.bypassNetworkless)t.method="POST",I.networklessOptions.writeThenSend?
BF().writeThenSend(e,t):BF().sendAndWrite(e,t);else if(I.compress)if(t.postBody){let c=t.postBody;typeof c!=="string"&&(c=JSON.stringify(t.postBody));mC(e,c,t,g.kk)}else mC(e,JSON.stringify(t.postParams),t,RA);else RA(e,t)}catch(c){if(c.name==="InvalidAccessError")qW(Error("An extension is blocking network request."));else throw c;}};
g.vE("ytNetworklessLoggingInitializationOptions")&&Znt.isNwlInitialized?TAw().then(Z=>{J(Z)}):J(!1)};
  var kA = !0;
  F82 = function(M,D,V,I,t={},A,l){var e=Math.round((0,g.f)()),J=M.size,Z=e_9(l);for(let [c,B]of M){M=c;l=B;let u=g.NV({context:g.yM(D.config_||g.SU())});if(!g.PE(l)&&!g.O("throw_err_when_logevent_malformed_killswitch")){I();break}u.events=l;(l=o2[M])&&Jm1(u,M,l);delete o2[M];let H=M==="visitorOnlyApprovedKey";ZVa(u,e,H);cmR(t);let R=y=>{g.O("start_client_gcf")&&g.ec.WS(async()=>{await B9R(y)});
J--;J||V()},W=0,b=()=>{W++;
if(t.bypassNetworkless&&W===1)try{g.$W(D,Z,u,R2({writeThenSend:!0},H,R,b,A)),kA=!1}catch(y){g.xN(y),I()}J--;J||V()};
try{g.$W(D,Z,u,R2(t,H,R,b,A)),kA=!1}catch(y){g.xN(y),I()}}};
  H3 = function(M){M.G||(M.G=!0,g.l4(M.Bt,M))};
  var v3 = X6;
  zia = function(M,D){M.Y=!0;g.l4(function(){M.Y&&v3.call(null,D)})};
  GR = function(M,D){if(Error.captureStackTrace)Error.captureStackTrace(this,GR);else{let V=Error().stack;V&&(this.stack=V)}M&&(this.message=String(M));D!==void 0&&(this.cause=D)};
  z6 = function(M){GR.call(this,M)};
  g.kE = function(){};
  Ma = function(){this.next=this.context=this.X=this.N=this.W=null;this.Z=!1};
  var Dy = {};
  Vy = function(M,D,V){var I=Dy.get();I.N=M;I.X=D;I.context=V;return I};
  Jw = function(M,D){M.X||M.W!=2&&M.W!=3||H3(M);M.Z?M.Z.next=D:M.X=D;M.Z=D};
  Zy = function(M,D,V,I){Jw(M,Vy(D||g.kE,V||null,I))};
  hiq = function(M,D,V,I,t){function A(J){e||(e=!0,I.call(t,J))}
function l(J){e||(e=!0,V.call(t,J))}
var e=!1;try{D.call(M,l,A)}catch(J){A(J)}};
  Aw = function(M,D,V,I){if(M instanceof g.mv)return Zy(M,D,V,I),!0;if(M)try{var t=!!M.$goog_Thenable}catch(A){t=!1}else t=!1;if(t)return M.then(D,V,I),!0;if(g.dq(M))try{let A=M.then;if(typeof A==="function")return hiq(M,A,D,V,I),!0}catch(A){return V.call(I,A),!0}return!1};
  F1 = function(M,D,V){M.W==0&&(M===V&&(D=3,V=new TypeError("Promise cannot resolve to itself")),M.W=1,Aw(V,M.iR,M.XA,M)||(M.j=V,M.W=D,M.N=null,H3(M),D!=3||V instanceof z6||zia(M,V)))};
  g.mv = function(M,D){this.W=0;this.j=void 0;this.Z=this.X=this.N=null;this.Y=this.G=!1;if(M!=g.kE)try{let V=this;M.call(D,function(I){F1(V,2,I)},function(I){F1(V,3,I)})}catch(V){F1(this,3,V)}};
  g.K = g.mv.prototype;
  var fY = undefined;
  g.K.finally = function(M){M=fY(M);return new g.mv((D,V)=>{Zy(this,I=>{M();D(I)},I=>{M();
V(I)})})};
  hw = function(M,D,V,I){var t=Vy(null,null,null);t.W=new g.mv(function(A,l){t.N=D?function(e){try{let J=D.call(I,e);A(J)}catch(J){l(J)}}:A;
t.X=V?function(e){try{let J=V.call(I,e);J===void 0&&e instanceof z6?l(e):A(J)}catch(J){l(J)}}:l});
t.W.N=M;Jw(M,t);return t.W};
  g.K.TM = function(M,D){return hw(this,null,fY(M),D)};
  g.K.catch = {};
  u4 = function(M){var D=null;M.X&&(D=M.X,M.X=D.next,D.next=null);M.X||(M.Z=null);return D};
  oE = function(M,D,V){D==2?M.N.call(M.context,V):M.X&&M.X.call(M.context,V)};
  $B = function(M,D,V,I){if(V==3&&D.X&&!D.Z)for(;M&&M.Y;M=M.N)M.Y=!1;if(D.W)D.W.N=null,oE(D,V,I);else try{D.Z?D.N.call(D.context):oE(D,V,I)}catch(t){v3.call(null,t)}Dy.put(D)};
  B3 = function(M,D){if(M.W==0)if(M.N){var V=M.N;if(V.X){var I=0,t=null,A=null;for(let l=V.X;l&&(l.Z||(I++,l.W==M&&(t=l),!(t&&I>1)));l=l.next)t||(A=l);t&&(V.W==0&&I==1?B3(V,D):(A?(I=A,I.next==V.Z&&(V.Z=I),I.next=I.next.next):u4(V),$B(V,t,3,D)))}M.N=null}else F1(M,3,D)};
  g.K.cancel = function(M){if(this.W==0){let D=new z6(M);g.l4(function(){B3(this,D)},this)}};
  g.K.iR = function(M){this.W=0;F1(this,2,M)};
  g.K.XA = function(M){this.W=0;F1(this,3,M)};
  g.K.Bt = function(){for(var M;M=u4(this);)$B(this,M,this.W,this.j);this.G=!1};
  NM2 = function(M,D){if(M.endpoint==="log_event"){g.O("more_accurate_gel_parser")&&t1().storePayload({isJspb:!1},M.payload);ll(M);var V=eu(M),I=new Map;I.set(V,[M.payload]);var t=EgR(M.payload)||"";D&&(cs=new D);return new g.mv((A,l)=>{cs&&cs.isReady()?F82(I,cs,A,l,{bypassNetworkless:!0},!0,Zg(t)):A()})}};
  var J1 = {};
  var Q_ = class{constructor(){this.Z=this.X=this.N=0;this.W=!1}};
  var rmm = {};
  var IxS = {};
  var d$i = {};
  var Vl2 = {};
  Bs = function(M,D=200){return M?D===300?Vl2:d$i:D===300?IxS:rmm};
  vs = function(M){g.O("transport_use_scheduler")?g.ec.ZQ(M):g.us(M)};
  g.Ps = class extends YL{constructor(M){super(M)}};
  Xz = function(M){if(M==null)return M;if(typeof M==="string"&&M)M=+M;else if(typeof M!=="number")return;return RT(M)?M|0:void 0};
  ZA = function(M,D){M=kU(M,D);return(M==null?M:RT(M)?M|0:void 0)??0};
  var bU2 = class extends YL{constructor(M){super(M)}};
  var uJq = class extends YL{constructor(M){super(M)}getDeviceId(){return JR(this,6)}sc(M){var D=WQ(this,9,Xz,3,!0);MS(D,M);return D[M]}getPlayerType(){return ZA(this,36)}setHomeGroupInfo(M){return DA(this,bU2,81,M)}clearLocationPlayabilityToken(){return PQ(this,89)}};
  var dT = class extends YL{constructor(M){super(M)}N(M){return DA(this,uJq,1,M)}};
  hD = function(M){if(M!=null&&typeof M!=="number")throw Error(`Value of float/double field must be a number, found ${typeof M}: ${M}`);return M};
  var $$S = class extends YL{constructor(M){super(M)}};
  var z_S = [2,3,4,5,6];
  var HV1 = class extends YL{constructor(M){super(M)}getValue(){return JR(this,Oy(this,z_S,2))}};
  xU = function(M,D,V,I,t,A,l,e,J){var Z=F6(M,V);A=Z?1:A;e=!!e||A===3;Z=J&&!Z;(A===2||Z)&&zA(M)&&(D=M.sy,V=D[jN]|0);M=dW(D,t,l);var c=M===rW?7:M[jN]|0,B=X8(c,V);if(J=!(4&B)){var u=M,H=V;let R=!!(2&B);R&&(H|=2);let W=!R,b=!0,y=0,U=0;for(;y<u.length;y++){let E=E3(u[y],I,H);if(E instanceof I){if(!R){let N=F6(E);W&&(W=!N);b&&(b=N)}u[U++]=E}}U<y&&(u.length=U);B|=4;B=b?B&-4097:B|4096;B=W?B|8:B&-9}B!==c&&(M[jN]=B,2&B&&Object.freeze(M));if(Z&&!(8&B||!M.length&&(A===1||(A!==4?0:2&B||!(16&B)&&32&V)))){gW(B)&&(M=
[...M],B=i9(B,V),V=Rt(D,V,t,M,l));I=M;Z=B;for(c=0;c<I.length;c++)u=I[c],B=HQ(u),u!==B&&(I[c]=B);Z|=8;B=Z=I.length?Z|4096:Z&-4097;M[jN]=B}return M=K7(M,B,D,V,t,l,A,J,e)};
  tR = function(M,D,V,I){var t=I;h3(M);I=M.sy;M=xU(M,I,I[jN]|0,V,D,2,void 0,!0);t=t!=null?y0(t,V):new V;M.push(t);D=V=M===rW?7:M[jN]|0;(t=F6(t))?(V&=-9,M.length===1&&(V&=-4097)):V|=4096;V!==D&&(M[jN]=V);t||ot(I)};
  var rT = class extends YL{constructor(M){super(M)}setSafetyMode(M){return zu(this,5,M)}};
  pJR = function(M){switch(M){case "DESKTOP":return 1;case "UNKNOWN_PLATFORM":return 0;case "TV":return 2;case "GAME_CONSOLE":return 3;case "MOBILE":return 4;case "TABLET":return 5}};
  dD = function(M){if(typeof M!=="number")throw NT("int32");if(!RT(M))throw NT("int32");return M|0};
  rD = function(M){return M==null?M:dD(M)};
  var h_1 = class extends YL{constructor(M){super(M)}getToken(){return BJ(this,2)}setToken(M){return $t(this,2,M)}};
  uz = function(M,D,V){return PQ(M,D,Y8(V))};
  var v5t = class extends YL{constructor(M){super(M)}};
  var il = 1;
  var A1 = new Map;
  var Xl = class{constructor(M){this.W=M}toString(){return this.W+""}};
  iE = function(M){var D=rH();M=D?D.createScriptURL(M):M;return new Xl(M)};
  Ok = function(M){return M?(M=M.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue)?iE(M):null:null};
  var Fe = void 0;
  G0w = function(){Fe||(Fe=Ok(g.f4("WORKER_SERIALIZATION_URL")));return Fe||void 0};
  KE = function(M){if(M instanceof Xl)return M.W;throw Error("");};
  tl = function(M,D){return new Worker(KE(M),D)};
  var mm = void 0;
  SMi = function(){var M=G0w();mm||M===void 0||(mm=tl(M));return mm};
  var KZ = class extends YL{constructor(M){super(M,500)}};
  OnS = function(M,D,V,I={},t,A,l,e={value:0}){A=e_9(A);I=R2(I,l,J=>{g.O("start_client_gcf")&&g.ec.WS(async()=>{await B9R(J)});
e.value--;e.value||V()},()=>{e.value--;
e.value||V()},t);
I.headers["Content-Type"]="application/json+protobuf";I.postBodyFormat="JSPB";I.postBody=M;g.$W(D,A,"",I);kA=!1};
  mpw = function(M,D,V,I={},t,A){var l=Math.round((0,g.f)()),e={value:M.size},J=new Map([...M]);for(let [b]of J){var Z=b,c=M.get(Z);J=new g.Ps;var B=D.config_||g.SU(),u=new dT,H=new uJq;$t(H,1,B.dL);$t(H,2,B.ll);zu(H,16,B.zO);$t(H,17,B.innertubeContextClientVersion);if(B.gp){var R=B.gp,W=new ES;R.coldConfigData&&$t(W,1,R.coldConfigData);R.appInstallData&&$t(W,6,R.appInstallData);R.coldHashData&&$t(W,3,R.coldHashData);R.hotHashData&&W.Mt(R.hotHashData);DA(H,ES,62,W)}(R=g.HE.devicePixelRatio)&&R!=1&&PQ(H,
65,hD(R));R=h0();R!==""&&$t(H,54,R);R=oA();if(R.length>0){W=new $$S;for(let y=0;y<R.length;y++){let U=new HV1;$t(U,1,R[y].key);Se(U,2,z_S,Gc(R[y].value));tR(W,15,HV1,U)}DA(u,$$S,5,W)}cBt(B,H);Bat(u);uoE(H);$FS(B,H);HB9(H);g.O("start_client_gcf")&&zha(H);g.f4("DELEGATED_SESSION_ID")&&!g.O("pageid_as_header_web")&&(B=new rT,$t(B,3,g.f4("DELEGATED_SESSION_ID")));!g.O("fill_delegate_context_in_gel_killswitch")&&(R=g.f4("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT"))&&(W=C7(u,rT,3)||new rT,B=u,R=$t(W,
18,R),DA(B,rT,3,R));B=H;R=g.f4("DEVICE","");for(let [y,U]of Object.entries(m2(R)))R=y,R==="cbrand"?$t(B,12,U):R==="cmodel"?$t(B,13,U):R==="cbr"?$t(B,87,U):R==="cbrver"?$t(B,88,U):R==="cos"?$t(B,18,U):R==="cosver"?$t(B,19,U):R==="cplatform"&&zu(B,42,pJR(U));g.O("web_attention_logging_enabled")&&(PQ(H,55,rD(window.innerWidth)),PQ(H,56,rD(window.innerHeight)));u.N(H);DA(J,dT,1,u);if(H=h1[Z])a:{if(H.ZI())u=1;else if(H.getPlaylistId())u=2;else break a;DA(J,MlY,4,H);H=C7(J,dT,1)||new dT;B=C7(H,rT,3)||new rT;
R=new h_1;R.setToken(Z);zu(R,1,u);tR(B,12,h_1,R);DA(H,rT,3,B)}delete h1[Z];Z=Z==="visitorOnlyApprovedKey";XQ()||uz(J,2,l);!Z&&(u=g.f4("EVENT_ID"))&&(H=o59(),B=new v5t,$t(B,1,u),uz(B,2,H),DA(J,v5t,5,B));cmR(I);if(g.O("jspb_serialize_with_worker")&&(u=SMi())&&I.writeThenSend){A1.set(il,{client:D,resolve:V,networklessOptions:I,isIsolated:t,useVSSEndpoint:A,dangerousLogToVisitorSession:Z,requestsOutstanding:e});u.postMessage({op:"gelBatchToSerialize",batchRequest:A3(J),clientEvents:c,key:il});il++;break}if(c){u=
[];for(H=0;H<c.length;H++)try{u.push(new KZ(c[H]))}catch{g.xN(new g.SM("Transport failed to deserialize "+String(c[H])))}c=u}else c=[];for(let y of c)tR(J,3,KZ,y);c={startTime:(0,g.f)(),ticks:{},infos:{}};J=J.iP();c.ticks.geljspc=(0,g.f)();g.O("log_jspb_serialize_latency")&&jU("gel_jspb_serialize",c,{sampleRate:.1});OnS(J,D,V,I,t,A,Z,e)}};
  D$q = function(M,D,V={},I=!1,t=200,A=!1){var l=cs,e=new Map,J=new Map,Z={isJspb:I,cttAuthInfo:void 0,tier:t},c={isJspb:I,cttAuthInfo:void 0};if(I){for(let B of Object.keys(J1))D=g.O("enable_web_tiered_gel")?t1().smartExtractMatchingEntries({keys:[Z,c],sizeLimit:1E3}):t1().extractMatchingEntries({isJspb:!0,cttAuthInfo:B}),D.length>0&&e.set(B,D),(g.O("web_fp_via_jspb_and_json")&&V.writeThenSend||!g.O("web_fp_via_jspb_and_json"))&&delete J1[B];mpw(e,l,M,V,!1,A)}else{for(let B of Object.keys(J1))e=g.O("enable_web_tiered_gel")?
t1().smartExtractMatchingEntries({keys:[{isJspb:!1,cttAuthInfo:B,tier:t},{isJspb:!1,cttAuthInfo:B}],sizeLimit:1E3}):t1().extractMatchingEntries({isJspb:!1,cttAuthInfo:B}),e.length>0&&J.set(B,e),(g.O("web_fp_via_jspb_and_json")&&V.writeThenSend||!g.O("web_fp_via_jspb_and_json"))&&delete J1[B];F82(J,l,M,D,V,!1,A)}};
  ul = function(M={},D=!1,V){new g.mv((I,t)=>{var A=Bs(D,V),l=A.W;A.W=!1;if(g.O("enable_web_tiered_gel")&&g.O("web_vss_routing_check_all_tier_policies")){let e=Bs(D,300),J=Bs(D,200);l=l||e.W||J.W;e.W=!1;J.W=!1}vs(A.N);vs(A.X);A.X=0;cs&&cs.isReady()?V===void 0&&g.O("enable_web_tiered_gel")?D$q(I,t,M,D,300,l):D$q(I,t,M,D,V,l):(jU2(D,V),I())})};
  var tlw = undefined;
  g.Oj = function(M,D,V){return y1(0,D,0,V)};
  var ER = window;
  al = function(){return"h5vcc"in ER&&ER.h5vcc.traceEvent?.traceBegin&&ER.h5vcc.traceEvent?.traceEnd?1:"performance"in ER&&ER.performance.mark&&ER.performance.measure?2:0};
  Sk = function(M,D=`unexpected value ${M}!`){throw Error(D);};
  fx = function(M){var D=al();switch(D){case 1:ER.h5vcc.traceEvent.traceBegin("YTLR",M);break;case 2:ER.performance.mark(`${M}-start`);break;case 0:break;default:Sk(D,"unknown trace type")}};
  var qO = {};
  K89 = function(M){var D=al();switch(D){case 1:ER.h5vcc.traceEvent.traceEnd("YTLR",M);break;case 2:D=`${M}-start`;let V=`${M}-end`;ER.performance.mark(V);ER.performance.measure(M,D,V);break;case 0:break;default:Sk(D,"unknown trace type")}};
  W8q = function(M){var D=Array.from(M.W.keys()).sort((V,I)=>(M.W[I].priority??0)-(M.W[V].priority??0));
for(let V of D)D=M.W[V],D.jobId===void 0||D.E1||(M.scheduler.ZQ(D.jobId),y1(0,D.BF,10))};
  var ggw = undefined;
  YM1 = function(M,D,V){ggw&&console.groupCollapsed&&console.groupEnd&&(console.groupCollapsed(`[${M.constructor.name}] '${M.state}' to '${D}'`),console.log("with message: ",V),console.groupEnd())};
  NO = function(M){qO&&M&&fx(M)};
  Cx = function(M){if(g.O("web_lifecycle_error_handling_killswitch"))return M();try{return M()}catch(D){window.onerror?.(D.message,"",0,0,D)}};
  px = function(M){qO&&M&&K89(M)};
  IRw = function(M){var D=g.vE("yt.scheduler.instance.addImmediateJob");D?D(M):M()};
  ngY = function(M,...D){g.Ej();for(let V of M)IRw(()=>{NO(V.name);Cx(()=>V.callback(...D));
px(V.name)})};
  var TMa = class{constructor(M){this.scheduler=g.Ej();this.X=new g.Bm;this.W=M;for(let D=0;D<this.W.length;D++){let V=this.W[D];M=()=>{V.BF();this.W[D].E1=!0;this.W.every(t=>t.E1===!0)&&this.X.resolve()};
let I=y1(0,M,V.priority??0);this.W[D]={...V,BF:M,jobId:I}}}cancel(){for(let M of this.W)M.jobId===void 0||M.E1||this.scheduler.ZQ(M.jobId),M.E1=!0;this.X.resolve()}};
  L8S = function(M,D,...V){D=D.map(I=>({BF:()=>{NO(I.name);Cx(()=>I.callback(...V));
px(I.name)},
priority:M.X??I.priority??0}));
D.length&&(M.N=new TMa(D))};
  var xW = undefined;
  sUi = async function(M,...D){g.Ej();for(let V of M){let I;IRw(()=>{NO(V.name);var t=Cx(()=>V.callback(...D));
xW(t)?I=g.O("web_lifecycle_error_handling_killswitch")?t.then(()=>{px(V.name)}):t.then(()=>{px(V.name)},A=>{window.onerror?.(A.message,"",0,0,A);
px(V.name)}):px(V.name)});
I&&await I}};
  w6S = function(M,D){var V=D.filter(t=>(M.X??t.priority??0)===10),I=D.filter(t=>(M.X??t.priority??0)!==10);
return M.Z.AHo?async(...t)=>{await sUi(V,...t);L8S(M,I,...t)}:(...t)=>{ngY(V,...t);
L8S(M,I,...t)}};
  var fwT = class{constructor(){this.state="none";this.plugins=[];this.X=void 0;this.Z={};qO&&fx(this.state)}get currentState(){return this.state}install(M){this.plugins.push(M);return this}uninstall(...M){M.forEach(D=>{D=this.plugins.indexOf(D);D>-1&&this.plugins.splice(D,1)})}transition(M,D){qO&&K89(this.state);
var V=this.transitions.find(I=>Array.isArray(I.from)?I.from.find(t=>t===this.state&&I.to===M):I.from===this.state&&I.to===M);
if(V){this.N&&(W8q(this.N),this.N=void 0);YM1(this,M,D);this.state=M;qO&&fx(this.state);V=V.action.bind(this);let I=this.plugins.filter(t=>t[M]).map(t=>t[M]);
V(w6S(this,I),D)}else throw Error(`no transition specified from ${this.state} to ${M}`);}};
  var QUE = class extends fwT{constructor(){super();this.W=null;this.X=10;this.transitions=[{from:"none",to:"application_navigating",action:this.Y},{from:"application_navigating",to:"none",action:this.G},{from:"application_navigating",to:"application_navigating",action:()=>{}},
{from:"none",to:"none",action:()=>{}}]}Y(M,D){this.W=g.Oj(0,()=>{this.currentState==="application_navigating"&&this.transition("none")},5E3);
M(D?.event)}G(M,D){this.W&&(g.ec.ZQ(this.W),this.W=null);M(D?.event)}};
  jW = undefined;
  bnS = function(){jW||(jW=new QUE);return jW};
  Hs = function(M,D){return g.O("transport_use_scheduler")===!1?g.ci(M,D):g.O("logging_avoid_blocking_during_navigation")||g.O("lr_logging_avoid_blocking_during_navigation")?g.Oj(0,()=>{bnS().currentState==="none"?M():bnS().install({none:{callback:M}})},D):g.Oj(0,M,D)};
  var AmS = undefined;
  var lxw = undefined;
  jU2 = function(M=!1,D=200){var V=()=>{ul({writeThenSend:!0},M,D)},I=Bs(M,D),t=I===Vl2||I===IxS?5E3:tlw;
g.O("web_gel_timeout_cap")&&!I.X&&(t=Hs(()=>{V()},t),I.X=t);
vs(I.N);t=g.f4("LOGGING_BATCH_TIMEOUT",z9("web_gel_debounce_ms",1E4));g.O("shorten_initial_gel_batch_timeout")&&kA&&(t=AmS);t=Hs(()=>{z9("gel_min_batch_size")>0?t1().getSequenceCount({cttAuthInfo:void 0,isJspb:M,tier:D})>=lxw&&V():V()},t);
I.N=t};
  $A = undefined;
  CHY = function(M,D=!1,V,I=!1){M&&(cs=new M);M=z9("tvhtml5_logging_max_batch_ads_fork")||z9("tvhtml5_logging_max_batch")||z9("web_logging_max_batch")||100;var t=(0,g.f)(),A=Bs(D,V.tier),l=A.Z;I&&(A.W=!0);I=0;V&&(I=t1().getSequenceCount(V));I>=1E3?ul({writeThenSend:!0},D,V.tier):I>=M?$A||($A=Hs(()=>{ul({writeThenSend:!0},D,V.tier);$A=void 0},0)):t-l>=10&&(jU2(D,V.tier),A.Z=t)};
  xp9 = function(M,D){if(M.endpoint==="log_event"){ll(M);var V=eu(M),I=EgR(M.payload)||"",t=aNE(I),A=200;if(t){if(t.enabled===!1&&!g.O("web_payload_policy_disabled_killswitch"))return;A=fNS(t.tier);if(A===400){NM2(M,D);return}}J1[V]=!0;V={cttAuthInfo:V,isJspb:!1,tier:A};t1().storePayload(V,M.payload);CHY(D,!1,V,Zg(I))}};
  YA = function(M,D,V,I={}){var t={},A=Math.round(I.timestamp||(0,g.f)());t.eventTimeMs=A<Number.MAX_SAFE_INTEGER?A:0;t[M]=D;M=TC();t.context={lastActivityMs:String(I.timestamp||!isFinite(M)?-1:M)};I.sequenceGroup&&!g.O("web_gel_sequence_info_killswitch")&&(M=t.context,D=I.sequenceGroup,D={index:iVS(D),groupKey:D},M.sequence=D,I.endOfSequence&&delete gT[I.sequenceGroup]);g.O("web_tag_automated_log_events")&&(t.context.automatedLogEventSource=I.automatedLogEventSource);(I.sendIsolatedPayload?NM2:xp9)({endpoint:"log_event",
payload:t,cttAuthInfo:I.cttAuthInfo,dangerousLogToVisitorSession:I.dangerousLogToVisitorSession},V)};
  g.LZ = function(M,D,V={}){var I=g.sc;g.f4("ytLoggingEventsDefaultDisabled",!1)&&g.sc===g.sc&&(I=null);YA(M,D,I,V)};
  var tva = 0;
  var A41 = ["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];
  NW = function(M){var D=Ek.EXPERIMENT_FLAGS;return D?D[M]:void 0};
  var lqS = [];
  KXE = function(M=!1){ul(void 0,M)};
  var D2E = {};
  var j7w = 0;
  VvS = function(M,D="ERROR"){if(D==="ERROR"){ju.publish("handleError",M);if(g.O("record_app_crashed_web")&&Iqw===0&&M.sampleWeight===1){Iqw++;var V={appCrashType:"APP_CRASH_TYPE_BREAKPAD"};g.O("report_client_error_with_app_crash_ks")||(V.systemHealth={crashData:{clientError:{logMessage:{message:M.message}}}});g.LZ("appCrashed",V)}tva++}else D==="WARNING"&&ju.publish("handleWarning",M);if(g.O("kevlar_gel_error_routing")){V={};b:{for(I of A41)if(g.yc(I.toLowerCase())){var I=!0;break b}I=!1}if(I)V=void 0;
else{var t={stackTrace:M.stack};M.fileName&&(t.filename=M.fileName);I=M.lineNumber&&M.lineNumber.split?M.lineNumber.split(":"):[];I.length!==0&&(I.length!==1||isNaN(Number(I[0]))?I.length!==2||isNaN(Number(I[0]))||isNaN(Number(I[1]))||(t.lineNumber=Number(I[0]),t.columnNumber=Number(I[1])):t.lineNumber=Number(I[0]));I={level:"ERROR_LEVEL_UNKNOWN",message:M.message,errorClassName:M.name,sampleWeight:M.sampleWeight};D==="ERROR"?I.level="ERROR_LEVEL_ERROR":D==="WARNING"&&(I.level="ERROR_LEVEL_WARNNING");
t={isObfuscated:!0,browserStackInfo:t};V.pageUrl=window.location.href;V.kvPairs=[];g.f4("FEXP_EXPERIMENTS")&&(V.experimentIds=g.f4("FEXP_EXPERIMENTS"));var A=g.f4("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS");if(!NW("web_disable_gel_stp_ecatcher_killswitch")&&A)for(var l of Object.keys(A))V.kvPairs.push({key:l,value:String(A[l])});if(l=M.params)for(var e of Object.keys(l))V.kvPairs.push({key:`client.${e}`,value:String(l[e])});if(e=M.params?.sessionReplayId)V.sessionReplayId=String(e);e=g.f4("SERVER_NAME");
l=g.f4("SERVER_VERSION");e&&l&&(V.kvPairs.push({key:"server.name",value:e}),V.kvPairs.push({key:"server.version",value:l}));(e=g.f4("PLAYER_CLIENT_VERSION"))&&V.kvPairs.push({key:"client.player.version",value:e});V={errorMetadata:V,stackTrace:t,logMessage:I}}if(V&&(g.LZ("clientError",V),D==="ERROR"||g.O("errors_flush_gel_always_killswitch")))a:{if(g.O("web_fp_via_jspb")){V=lqS;lqS=[];if(V)for(var J of V)YA(J.payloadName,J.payload,g.sc,J.options);KXE(!0);if(!g.O("web_fp_via_jspb_and_json"))break a}KXE()}}if(!g.O("suppress_error_204_logging")){J=
M.params||{};D={urlParams:{a:"logerror",t:"jserror",type:M.name,msg:M.message.substr(0,250),line:M.lineNumber,level:D,"client.name":J.name},postParams:{url:g.f4("PAGE_NAME",window.location.href),file:M.fileName},method:"POST"};J.version&&(D["client.version"]=J.version);if(D.postParams){M.stack&&(D.postParams.stack=M.stack);for(var Z of Object.keys(J))D.postParams[`client.${Z}`]=J[Z];if(Z=g.f4("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS"))for(var c of Object.keys(Z))D.postParams[c]=Z[c];(c=g.f4("LAVA_VERSION"))&&
(D.postParams["lava.version"]=c);c=g.f4("SERVER_NAME");Z=g.f4("SERVER_VERSION");c&&Z&&(D.postParams["server.name"]=c,D.postParams["server.version"]=Z);(c=g.f4("PLAYER_CLIENT_VERSION"))&&(D.postParams["client.player.version"]=c)}g.kk(`${g.f4("ECATCHER_REPORT_HOST","")}/error_204`,D)}try{D2E.add(M.message)}catch(B){}j7w++};
  qFt = function(M,D,V="ERROR"){if(M){M.hasOwnProperty("level")&&M.level&&(V=M.level);if(g.O("wiz_enable_metadata_extraction_killswitch")){var I=D;if(!I?.componentStack){var t=M.FI?.UT;t&&(I||(I={}),I.componentStack=t)}D=I||D}else D=pd9(M,D),I=M.FI?.FD,I!==void 0&&V!=="IGNORED"&&(V=I>=3?"ERROR":"WARNING");if(g.O("console_log_js_exceptions")||["test","dev","autopush","staging"].includes(g.f4("SERVER_VERSION")))I=[],I.push(`Name: ${M.name}`),I.push(`Message: ${M.message}`),M.hasOwnProperty("params")&&I.push(`Error Params: ${JSON.stringify(M.params)}`),
M.hasOwnProperty("args")&&I.push(`Error args: ${JSON.stringify(M.args)}`),I.push(`File name: ${M.fileName}`),I.push(`Stacktrace: ${M.stack}`),window.console.log(I.join("\n"),M);if(!(j7w>=5)){I=[];for(A of FXS)try{A()&&I.push(A())}catch(R){}var A=I;A=[...m$i,...A];var l=WiE(M);I=l.message||"Unknown Error";t=l.name||"UnknownError";var e=l.stack||M.GH0||"Not available";if(e.startsWith(`${t}: ${I}`)){var J=e.split("\n");J.shift();e=J.join("\n")}J=l.lineNumber||"Not available";l=l.fileName||"Not available";
let H=0;if(M.hasOwnProperty("args")&&M.args&&M.args.length)for(var Z=0;Z<M.args.length&&!(H=x$E(M.args[Z],`params.${Z}`,D,H),H>=500);Z++);else if(M.hasOwnProperty("params")&&M.params){let R=M.params;if(typeof M.params==="object")for(Z in R){if(!R[Z])continue;let W=`params.${Z}`,b=fZ(R[Z]);D[W]=b;H+=W.length+b.length;if(H>500)break}else D.params=fZ(R)}if(A.length)for(Z=0;Z<A.length&&!(H=x$E(A[Z],`params.context.${Z}`,D,H),H>=500);Z++);navigator.vendor&&!D.hasOwnProperty("vendor")&&(D["device.vendor"]=
navigator.vendor);Z={message:I,name:t,lineNumber:J,fileName:l,stack:e,params:D,sampleWeight:1};D=Number(M.columnNumber);isNaN(D)||(Z.lineNumber=`${Z.lineNumber}:${D}`);if(M.level==="IGNORED")var c=0;else a:{M=Uc();for(c of M.dE)if(Z.message&&Z.message.match(c.Pc)){c=c.weight;break a}for(var B of M.ez)if(B.callback(Z)){c=B.weight;break a}c=1}Z.sampleWeight=c;c=Z;for(var u of Mvi){if(!u.ak[c.name])continue;B=u.ak[c.name];for(let R of B){B=c.message.match(R.o9);if(!B)continue;c.params["params.error.original"]=
B[0];M=R.groups;Z={};for(D=0;D<M.length;D++)Z[M[D]]=B[D+1],c.params[`params.error.${M[D]}`]=B[D+1];c.message=u.m4(Z);break}}c.params||(c.params={});u=Uc();c.params["params.errorServiceSignature"]=`msg=${u.dE.length}&cb=${u.ez.length}`;c.params["params.serviceWorker"]="false";g.HE.document&&g.HE.document.querySelectorAll&&(c.params["params.fscripts"]=String(document.querySelectorAll("script:not([nonce])").length));(new pZ(qs,"sample")).constructor!==pZ&&(c.params["params.fconst"]="true");window.yterr&&
typeof window.yterr==="function"&&window.yterr(c);c.sampleWeight===0||D2E.has(c.message)||VvS(c,V)}}};
  g.Ns = function(M,D="ERROR"){var V={};V.name=g.f4("INNERTUBE_CONTEXT_CLIENT_NAME",1);V.version=g.f4("INNERTUBE_CONTEXT_CLIENT_VERSION");qFt(M,V,D)};
  g.xA = function(M){g.Ns(M,"WARNING")};
  nc = function(M,D,V=!1,I=""){!M&&V&&g.xA(Error(`Player URL validator detects invalid url. ${I}: ${D}`));return M};
  TP = function(M){return nc(wh(M,Biq,uj1),M,!1,"Trusted Stream URL")};
  SX = function(M,D){this.X=this.W=null;this.N=M||null;this.Z=!!D};
  g.K = SX.prototype;
  KB = function(M,D){if(M){M=M.split("&");for(let V=0;V<M.length;V++){let I=M[V].indexOf("="),t,A=null;I>=0?(t=M[V].substring(0,I),A=M[V].substring(I+1)):t=M[V];D(t,A?lD(A):"")}}};
  EJ = function(M){M.W||(M.W=new Map,M.X=0,M.N&&KB(M.N,function(D,V){M.add(lD(D),V)}))};
  az = function(M,D){D=String(D);M.Z&&(D=D.toLowerCase());return D};
  g.K.add = function(M,D){EJ(this);this.N=null;M=az(this,M);var V=this.W.get(M);V||this.W.set(M,V=[]);V.push(D);this.X=this.X+1;return this};
  g.K.remove = function(M){EJ(this);M=az(this,M);return this.W.has(M)?(this.N=null,this.X=this.X-this.W.get(M).length,this.W.delete(M)):!1};
  g.K.clear = function(){this.W=this.N=null;this.X=0};
  g.K.isEmpty = function(){EJ(this);return this.X==0};
  g.K.forEach = function(M,D){EJ(this);this.W.forEach(function(V,I){V.forEach(function(t){M.call(D,t,I,this)},this)},this)};
  g.K.TK = function(){EJ(this);var M=Array.from(this.W.values()),D=Array.from(this.W.keys()),V=[];for(let I=0;I<D.length;I++){let t=M[I];for(let A=0;A<t.length;A++)V.push(D[I])}return V};
  xTq = function(M,D){EJ(M);D=az(M,D);return M.W.has(D)};
  g.K.Zv = function(M){EJ(this);var D=[];if(typeof M==="string")xTq(this,M)&&(D=D.concat(this.W.get(az(this,M))));else{M=Array.from(this.W.values());for(let V=0;V<M.length;V++)D=D.concat(M[V])}return D};
  g.K.set = function(M,D){EJ(this);this.N=null;M=az(this,M);xTq(this,M)&&(this.X=this.X-this.W.get(M).length);this.W.set(M,[D]);this.X=this.X+1;return this};
  g.K.get = function(M,D){if(!M)return D;M=this.Zv(M);return M.length>0?String(M[0]):D};
  g.K.toString = function(){if(this.N)return this.N;if(!this.W)return"";var M=[],D=Array.from(this.W.keys());for(let I=0;I<D.length;I++){var V=D[I];let t=g.Al(V);V=this.Zv(V);for(let A=0;A<V.length;A++){let l=t;V[A]!==""&&(l+="="+g.Al(V[A]));M.push(l)}}return this.N=M.join("&")};
  g.K.clone = function(){var M=new SX;M.N=this.N;this.W&&(M.W=new Map(this.W),M.X=this.X);return M};
  g.Tb = function(M){var D=[],V=0;for(let I in M)D[V++]=I;return D};
  ERi = function(M){if(M.TK&&typeof M.TK=="function")return M.TK();if(!M.Zv||typeof M.Zv!="function"){if(typeof Map!=="undefined"&&M instanceof Map)return Array.from(M.keys());if(!(typeof Set!=="undefined"&&M instanceof Set)){if(g.PE(M)||typeof M==="string"){let D=[];M=M.length;for(let V=0;V<M;V++)D.push(V);return D}return g.Tb(M)}}};
  wQ = function(M){var D=[],V=0;for(let I in M)D[V++]=M[I];return D};
  UT9 = function(M){if(M.Zv&&typeof M.Zv=="function")return M.Zv();if(typeof Map!=="undefined"&&M instanceof Map||typeof Set!=="undefined"&&M instanceof Set)return Array.from(M.values());if(typeof M==="string")return M.split("");if(g.PE(M)){let D=[],V=M.length;for(let I=0;I<V;I++)D.push(M[I]);return D}return wQ(M)};
  aE9 = function(M,D,V){if(M.forEach&&typeof M.forEach=="function")M.forEach(D,V);else if(g.PE(M)||typeof M==="string")Array.prototype.forEach.call(M,D,V);else{let I=ERi(M),t=UT9(M),A=t.length;for(let l=0;l<A;l++)D.call(V,t[l],I&&I[l],M)}};
  g.K.extend = function(M){for(let D=0;D<arguments.length;D++)aE9(arguments[D],function(V,I){this.add(I,V)},this)};
  GS = function(M,D){return M?D?decodeURI(M.replace(/%25/g,"%2525")):decodeURIComponent(M):""};
  g.wr = function(M,D,V){M.Y=V?GS(D,!0):D;M.Y&&(M.Y=M.Y.replace(/:$/,""))};
  g.TS = function(M,D,V){M.W=V?GS(D,!0):D};
  g.Qa = function(M,D){if(D){D=Number(D);if(isNaN(D)||D<0)throw Error("Bad port number "+D);M.N=D}else M.N=null};
  var NG9 = /[#\?@]/g;
  C_w = function(M){M=M.charCodeAt(0);return"%"+(M>>4&15).toString(16)+(M&15).toString(16)};
  ya = function(M,D,V){return typeof M==="string"?(M=encodeURI(M).replace(D,C_w),V&&(M=M.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),M):null};
  g.eI = function(M){var D=M.length;if(D>0){let V=Array(D);for(let I=0;I<D;I++)V[I]=M[I];return V}return[]};
  g.p0R = function(M,D,V){M.remove(D);V.length>0&&(M.N=null,M.W.set(az(M,D),g.eI(V)),M.X=M.X+V.length)};
  fEi = function(M,D){D&&!M.Z&&(EJ(M),M.N=null,M.W.forEach(function(V,I){var t=I.toLowerCase();I!=t&&(this.remove(I),g.p0R(this,t,V))},M));
M.Z=D};
  bw = function(M,D,V){D instanceof SX?(M.Z=D,fEi(M.Z,M.j)):(V||(D=ya(D,NG9)),M.Z=new SX(D,M.j))};
  g.nH = function(M){this.W=this.L=this.Y="";this.N=null;this.G=this.X="";this.j=!1;var D;M instanceof g.nH?(this.j=M.j,g.wr(this,M.Y),this.L=M.L,g.TS(this,M.W),g.Qa(this,M.N),this.X=M.X,bw(this,M.Z.clone()),this.G=M.G):M&&(D=g.kZ(String(M)))?(this.j=!1,g.wr(this,D[1]||"",!0),this.L=GS(D[2]||""),g.TS(this,D[3]||"",!0),g.Qa(this,D[4]),this.X=GS(D[5]||"",!0),bw(this,D[6]||"",!0),this.G=GS(D[7]||"")):(this.j=!1,this.Z=new SX(null,this.j))};
  g.UJ = function(M){return M instanceof g.nH?M.clone():new g.nH(M)};
  var Fiw = function(){return jR[z[7]](this,76,5648)};
  var HRq = {};
  oo = function(M,D,V,I){var t=D^M;if(M+5>>1>=M&&(M+1&41)<M)a:{var A=g.a(V,HRq)||V[z[t^7059]],l={L3:!1,Gt:z[6],BN:z[6],s:z[6]};if(!A){var e=l;break a}A=m2(A);l[z[t^7151]]=!0;l[z[t^7079]]=A[z[t^7078]];l[z[t^7098]]=A[z[t^7077]];l[z[t^7052]]=A[z[t^7052]];e=l}(M^1)>>4==4&&(e=V[z[3]]?V[z[3]][z[46]](z[4]):V[z[27]]===z[4]);(M|1)>>3==1&&(pM(t^7401,t^374,V),e=V[z[t^7382]]);(M+5^30)<M&&(M+6&58)>=M&&(V=(V%I[z[2]]+I[z[2]])%I[z[2]],l=I[0],I[0]=I[V],I[V]=l,e=[V]);(M|56)==M&&(I=(I%V[z[2]]+V[z[2]])%V[z[2]],V[z[t^8441]](I,
1));return e};
  qI = function(M,D,V,I,t){var A=D^M;var l;if((M+2&43)>=M&&(M+5^10)<M){if(I===z[A^2950]){var e;(e=t[z[A^2978]](z[A^3060]))>=0?(I=`cmo=${t[z[A^2967]](0,e)}`,t=t[z[A^2967]](e+1)):(e=t[z[A^2978]](z[A^3065]))>=0&&(I=`cmo=${t[z[A^2967]](0,e)}`,t=t[z[A^2967]](e+3))}V[I]=t}if((M<<1&14)==2)for(e=V[z[2]];e;)V[z[A^2688]](V[z[A^2718]](--e,1)[0]);(M|5)>>3==2&&V[z[1]]();(M>>1&11)==1&&V[z[2]]!=0&&(e=oo(16,4455,I,V),I=e[0]);return l};
  Ie9 = function(M,D,V,I,t,A,l,e){var J=D^M;var Z;(M&126)==M&&(Z=I(A,l,e));if(((M|8)&3)==1){let c=V[I],B=c[z[J^6299]](z[J^6349]);B>0?qI(6,J^4927,t,c[z[J^6318]](0,B),c[z[J^6318]](B+1)):c&&(t[c]=z[6]);Z=[]}return Z};
  var teE = function(M){return lS[z[7]](this,4,1284,M)};
  lS = function(M,D,V){var I=D^M;if((M|16)==M){let l=V[z[I^8586]](z[I^8664]),e={};for(let J=0;J<l[z[2]];J++)var t=Ie9(1,I^14609,l,J,e);var A=e}M<<1&11||(pM(I^3585,I^5022,V),A=g.gQ(V[z[I^3640]],teE));((M^31)&4)<1&&(M>>2&3)>=1&&(A=V!==null);return A};
  $E = function(M,D,V,I,t,A,l){var e=D^M;if((M^26)>=-84&&M+7>>4<1)throw V;M<<1&13||I[z[23]](V);if((M&108)==M){pM(e^4623,e^3984,V);let Z=V[z[e^4636]]+(V[z[e^4636]]?z[e^4634]:z[e^4679])+V[z[e^4616]]+V[z[e^4631]];if(lS(e^4623,e^7214,V)){let c=[];g.iG(V[z[e^4638]],(B,u)=>{B!==null&&c[z[e^4624]](`${u}=${B}`)});
Z+=`?${c[z[e^4655]](z[e^4672])}`}var J=Z}(M|16)==M&&(J=I(t,A,l));return J};
  var mt1 = function(M,D){return $E[z[7]](this,9,5209,M,D)};
  rv = function(M,D,V,I,t,A,l,e,J){var Z=D^M;var c;M-7>>4||(c=V(l,e,J));if((M^68)>>4>=1&&M+3<19){for(var B=Z^171,u=[];++B-u[z[2]]-(Z^203);){switch(B){case Z^176:B=Z^199;continue;case Z^144:B=Z^170;break;case Z^170:B-=Z^249;continue;case Z^209:B=Z^139;continue;case Z^197:B=Z^180}u[z[Z^252]](String[z[Z^243]](B))}c=u}(M|88)==M&&(c=encodeURIComponent(V));if((M-5^9)<M&&(M+6^8)>=M){B=Z^6308;for(u=[];++B-u[z[2]]-(Z^6340);)switch(B){case Z^6346:B=Z^6331;default:u[z[Z^6387]](String[z[Z^6396]](B));case Z^6330:case Z^
6331:case Z^6276:break;case Z^6303:B-=Z^6312;case Z^6328:case Z^6329:continue;case Z^6366:B=Z^6344;case Z^6335:}c=u}if((M|32)==M){var H=t[z[2]];V[z[Z^2013]](function(R,W,b){this[z[Z^2039]](b[W]=t[(t[z[Z^2036]](R)-t[z[Z^2036]](this[W])+W+H--)%t[z[2]]])},I[z[Z^2037]](z[6]))}return c};
  var MI1 = function(M,D,V){return rv[z[7]](this,34,1986,M,D,V)};
  var DVt = function(M,D,V,I,t,A){return Ie9[z[7]](this,2,1792,M,D,V,I,t,A)};
  var pEa = function(){return rv[z[7]](this,29,6393)};
  var VIw = function(M,D){return qI[z[7]](this,2,8341,M,D)};
  var IbS = function(M){return qI[z[7]](this,1,2710,M)};
  var tIS = function(M,D){return oo[z[7]](this,58,8394,M,D)};
  je = function(M,D,V,I){var t=D^M;if(M+8<19&&(M<<1&3)>=1){let l=V[z[t^7616]](z[t^7583]),e=0;l[0]||e++;let J={};for(;e<l[z[2]];e+=2)l[e]&&qI(t^7634,t^5732,J,l[e],l[e+1]);var A=J}(M|4)&3||(V=(V%I[z[2]]+I[z[2]])%I[z[2]],I[z[t^2398]](-V)[z[1]]()[z[t^2410]](function(l){I[z[t^2412]](l)}));
return A};
  var AcE = function(M,D){return je[z[7]](this,4,2387,M,D)};
  var lbi = function(M,D){return CM[z[7]](this,3,8281,M,D)};
  var e7R = function(M,D,V,I,t,A,l){return rv[z[7]](this,18,7930,M,D,V,I,t,A,l)};
  var C1E = function(M){return $E[z[7]](this,2,1435,M)};
  qb = function(M,D,V,I){var t=D^M;if((M|8)==M){var A=jR(t^4369,t^2623,V);I[z[t^4376]](z[t^4395],A);var l=[]}M>>1<11&&(M<<1&7)>=3&&(l=decodeURIComponent(V));(M^53)<6&&(M^57)>>4>=0&&I[z[2]]!=0&&(V=(V%I[z[2]]+I[z[2]])%I[z[2]],I[z[9]](0,1,I[z[9]](V,1,I[0])[0]));return l};
  var JcR = function(M,D){return qb[z[7]](this,48,5486,M,D)};
  var Ze9 = function(){return rv[z[7]](this,2,233)};
  var ccE = function(M){return qI[z[7]](this,16,282,M)};
  var BQ9 = function(M,D){return jR[z[7]](this,83,6821,M,D)};
  var uWq = function(M,D,V,I,t){return $E[z[7]](this,18,4277,M,D,V,I,t)};
  var $Vm = -741312019;
  jR = function(M,D,V,I){var t=D^M;if((M+3&12)>=M&&M-5<<1<M){var A=V[z[t^1697]](z[t^1791],t^1721),l=V[z[t^1697]](z[t^1791],A+1);A>0&&l>0?(I[z[t^1701]]=V[z[t^1684]](0,l),V=V[z[t^1684]](l+1)):(I[z[t^1701]]=V,V=z[6]);var e=[V]}if(M-5>=21&&(M|9)>>4<3)a:{A=V[z[t^6971]](z[6]);l=[Fiw,-(t^1363635207),t^37827365,t^304657771,mt1,t^84781971,t^1563719117,null,t^776021534,t^495435277,null,MI1,t^1761782116,t^1813723463,t^487396525,t^952111102,-(t^548920342),-(t^1037008779),-(t^998669059),A,t^886813108,A,DVt,pEa,-(t^
998669059),t^1836087975,VIw,IbS,-(t^1031989545),-(t^2052511516),tIS,-(t^1232980217),-(t^1730561289),-(t^1970310463),-(t^457461202),-(t^849031467),-(t^1775433316),-(t^1681515978),AcE,-(t^675729322),-(t^215306692),t^1560751518,lbi,z[t^6970],-(t^1016562848),e7R,C1E,-(t^59216922),-(t^656458108),t^776021534,JcR,t^808159891,Ze9,-(t^409593157),-(t^1995647728),-(t^1060522551),-(t^1207245952),z[t^6968],t^943991303,t^957553467,t^626626134,-(t^59216922),ccE,z[t^6915],-(t^2130016193),t^977995555,-(t^77521597),
t^1279742458,-(t^1513199678),null,-(t^305108374),A,BQ9,t^696692716,uWq,t^1526002422,-(t^2010822649)];l[t^6953]=l;l[t^6948]=l;l[t^7019]=l;if(typeof $Vm===z[t^6940]){e=V;break a}try{try{var J=CM(t^6966,t^6390,l)}catch(Z){l[t^6924]!=3&&(0,l[t^7014])(((0,l[t^6927])(l[t^6939],l[2]),l[t^6965])(l[t^6974],l[t^6920]),l[t^7021],l[t^6941],l[t^6974]),l[t^6923]<-2&&((0,l[t^7012])((0,l[t^7021])(l[t^6922],l[t^7020]),l[t^6921],l[t^6968],l[t^6953]),{})||(0,l[t^7022])((0,l[t^7013])(l[t^6950],l[t^6940],(0,l[t^6948])()),
l[t^7013],l[t^6950],l[t^6960],(0,l[(t^7021)+5**(new Date(z[t^6923])/(t^6342))-(t^7095)])())}finally{(l[t^6937]>=-2||(((0,l[t^7022])((0,l[t^7018])(l[t^6974],l[t^7017]),l[t^6963],l[t^6970],l[t^7012]),(((0,l[t^6914])(l[t^6951],l[t^7021]),l[t^6946])(l[t^7014],l[t^6951]),l[t^6948])(l[t^6912],l[t^6949]),(0,l[t^6934])(l[t^7017],l[t^6923]),l[t^6975])(((((0,l[t^6914])(l[t^6951],l[t^6963]),l[t^6948])(l[t^6939],l[t^6949]),l[t^6934])(l[t^7020],l[t^6921]),l[2])(l[t^6923]),l[t^6914],l[t^6966],l[t^6968]),null))&&
(0,l[t^6929])(l[t^6948],(0,l[t^6975])((0,l[t^6942])(l[t^6966],l[1]),l[t^6942],l[t^6949],l[t^6943]),(((0,l[t^6934])(l[6],l[t^6921]),l[t^6942])(l[t^6923],l[t^6937]),l[t^6962])(l[t^6923],l[t^6931],(0,l[t^6919])()),((0,l[t^6975])(((0,l[t^6942])(l[t^6966],l[t^6925]),l[t^6942])(l[t^6923],l[t^6961]),l[t^6930],l[t^6969],l[t^6949]),(0,l[2])(l[t^6965]),l[t^6930])(l[t^6953],l[t^6949]),l[4],l[t^6951])}try{l[t^6932]>-6&&(((((((0,l[t^6975])((0,l[t^6930])(l[t^6973],l[t^6966]),l[t^6922],l[t^7015]),l[t^6941])((0,l[t^
6945])(l[t^6947],l[t^7017]),l[t^7008],l[t^6915],l[t^6940]),l[t^6941])((0,l[t^6949])(l[t^6966],l[t^6917]),l[t^6925],l[t^6942],l[t^6929]),(0,l[t^6927])(l[t^6917],l[t^6930]),l[t^6929])((0,l[t^6918])((0,l[t^6941])(l[t^6930],l[t^6969],(0,l[t^6944])()),l[4],l[t^6922],l[t^6926]),l[t^6938],(0,l[t^6939])(l[t^6975]),l[t^6933],l[t^7014]),l[t^6939])((0,l[t^6964])(l[t^6931],l[t^6923]),l[t^7018],l[t^6961]),(0,l[t^6930])(l[t^6969],l[new Date(z[t^6937])/(t^6342)]),l[t^6948])(l[t^6914],l[t^6961]),l[t^6948])(l[t^6974],
l[t^6933]),(0,l[t^6939])((0,l[6])(l[t^6912]),l[t^7018],l[t^6927])}catch(Z){}}catch(Z){e=z[t^7021]+V;break a}e=A[z[t^6918]](z[6])}(M+7&31)>=M&&(M-4^24)<M&&(pM(t^3772,t^4899,V),A=qb(6,t^4446,V[z[t^3768]](z[t^3771])||z[6])[z[t^3761]](z[t^3730]),e=V[z[t^3764]]===z[t^3774]&&A[z[2]]>1&&!!A[1]);(M^24)>>4==4&&I[z[9]](I[z[2]],0,V);if(M-2<<1>=M&&(M-3|75)<M){A=t^5660;for(l=[];++A-l[z[2]]-(t^5756);)switch(A){case t^5734:A=t^5692;continue;case t^5639:A=t^5744;break;case t^5661:A=t^5747;continue;case t^5746:A=
t^5829;case t^5671:A-=t^5734;default:l[z[t^5707]](String[z[t^5700]](A))}e=l}return e};
  CM = function(M,D,V,I){var t=D^M;if(((M^10)&7)==1)for(V=(V%I[z[2]]+I[z[2]])%I[z[2]];V--;)I[z[t^8289]](I[z[t^8316]]());if((M|24)==M){V[t^902]!==-(t^968)&&(V[t^1015]===-1||((0,V[t^1010])(V[t^907],V[t^970]),null))&&(0,V[t^990])(V[t^979],V[t^992]);V[t^969]!=(t^968)?((0,V[t^998])(V[5],V[t^970])<(0,V[t^981])(V[t^995],V[t^898]))*(0,V[t^993])(V[t^986],V[0]):((0,V[t^997])(V[t^986],V[t^991]),V[t^967])((0,V[t^901])(V[t^977]),V[t^901],V[t^974]);(V[t^999]<=-(t^969)||((((((0,V[t^997])(V[1],V[t^904]),V[t^978])(V[t^
986],V[t^1010],(0,V[t^1019])()),V[t^901])(V[t^986]),V[t^967])((0,V[t^997])(V[t^908],V[t^1001]),V[t^978],V[t^986],V[t^902],(0,V[4])()),V[t^993])(V[t^977],V[t^983]),NaN))&&(((0,V[t^1005])(V[t^907],V[t^988]),V[t^1017])(V[t^1011],V[t^988]),(((0,V[t^1017])(V[t^981],V[t^908]),V[t^1017])(V[t^987],V[t^908]),V[t^978])(V[t^986],V[t^1010],(0,V[t^1019])()),V[t^1005])(V[t^968],V[t^977]);(0,V[t^904])((0,V[t^1001])(V[5]),V[6],V[t^974],V[t^1018],(0,V[t^1007])());var A=[]}if((M&86)==M){if(!(TP(V[z[3]])||V[z[3]][z[t^
2588]](z[4])||V[z[3]][z[t^2588]](z[t^2573])||V[z[3]][z[t^2588]](z[t^2676])))throw new g.SM(z[t^2682],V[z[3]]);var l=g.UJ(V[z[3]]);V[z[t^2601]]=l[z[t^2574]];V[z[t^2621]]=l[z[t^2603]]+(l[z[t^2621]]!=null?`:${l[z[t^2621]]}`:z[6]);var e=l[z[3]];e[z[t^2588]](z[t^2600])?(V[z[t^2594]]=z[t^2600],e=e[z[t^2579]](t^2620)):e[z[t^2588]](z[t^2587])?(V[z[t^2594]]=z[t^2587],e=e[z[t^2579]](t^2623)):e[z[t^2588]](z[t^2618])?(e=jR(4,t^3203,e,V),e=e[0]):(V[z[t^2594]]=e,e=z[6]);var J=V[z[t^2603]];V[z[t^2603]]=je(1,t^6118,
e);Object[z[t^2686]](V[z[t^2603]],lS(t^2595,t^11196,l[z[t^2571]][z[0]]()));Object[z[t^2686]](V[z[t^2603]],J);V[z[t^2603]][z[t^2582]]===z[t^2590]&&(delete V[z[t^2603]][z[t^2582]],V[z[t^2594]]+=z[t^2683]);V[z[3]]=z[6];V[z[t^2623]]=z[6];V[z[t^2571]]&&(l=pM(6,t^7185,V));A=[]}return A};
  pM = function(M,D,V){var I=D^M;if((M-6&11)>=8&&M-8<10){var t=V[z[I^1209]](z[6]);IM[z[5]](t,I^1170);IM[z[I^1155]](t,1);IM[z[I^1181]](t,I^1179);IM[z[I^1155]](t,1);IM[z[I^1181]](t,I^1177);IM[z[I^1181]](t,I^1189);IM[z[I^1155]](t,3);var A=t[z[I^1156]](z[6])}M<<1&14||V[z[3]]&&(t=CM(2,2608,V));(M+1&61)<M&&(M-5|55)>=M&&(pM(I^5677,I^2994,V),(t=V[z[I^5692]][z[I^5637]]||null)&&(t=qb(I^5677,I^1830,t,V)),A=[]);return A};
  g.fe = function(M){var D={};for(let V in M)D[V]=M[V];return D};
  g.Je = class{constructor(M,D=!1){this[z[3]]=M;this[z[57]]=D;this[z[15]]=this[z[16]]=this[z[27]]=z[6];this[z[25]]={};this[z[13]]=z[6]}set(M,D){this[z[25]][M]!==D&&(this[z[25]][M]=D,this[z[13]]=z[6])}get(M){pM(40,7607,this);return this[z[25]][M]||null}FV(){this[z[13]]||(this[z[13]]=$E(12,4619,this));return this[z[13]]}clone(){var M=new g.Je(this[z[3]],this[z[57]]);M[z[27]]=this[z[27]];M[z[16]]=this[z[16]];M[z[15]]=this[z[15]];M[z[25]]=g.fe(this[z[25]]);M[z[13]]=this[z[13]];return M}};
  Zs = function(M,D="",V=""){M=new g.Je(M,!0);M.set("alr","yes");V&&(V=pM(1,1197,qb(3,8191,V)),M[z[19]](D,rv(88,8522,V)));return M};
  //#endregion --- end [nsigFunction] ---

  function nsigFunction(M, D, V) {
    return Zs(M, D, V);
  }

  const rawValues = {
    "nsigFunction": "Zs",
    "signatureTimestampVar": "20632"
  };

  return { nsigFunction, rawValues };
})({});
