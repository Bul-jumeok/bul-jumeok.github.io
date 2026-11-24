var Sh=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Nm=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Rh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,m=s>>2,v=(s&3)<<4|c>>4,b=(c&15)<<2|d>>6,R=d&63;l||(R=64,a||(b=64)),r.push(t[m],t[v],t[b],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Sh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Nm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let d=i<n.length?t[n.charAt(i)]:64;++i;let v=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||v==null)throw new Zo;let b=s<<2|c>>4;if(r.push(b),d!==64){let R=c<<4&240|d>>2;if(r.push(R),v!==64){let D=d<<6&192|v;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Zo=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Om=function(n){let e=Sh(n);return Rh.encodeByteArray(e,!0)},Ir=function(n){return Om(n).replace(/\./g,"")},ta=function(n){try{return Rh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Vm(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Lm=()=>Vm().__FIREBASE_DEFAULTS__,Mm=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fm=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&ta(n[1]);return e&&JSON.parse(e)},Li=()=>{try{return Lm()||Mm()||Fm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},na=n=>{var e,t;return(t=(e=Li())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Ph=n=>{let e=na(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ra=()=>{var n;return(n=Li())===null||n===void 0?void 0:n.config},ia=n=>{var e;return(e=Li())===null||e===void 0?void 0:e[`_${n}`]};var Vi=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Ch(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ir(JSON.stringify(t)),Ir(JSON.stringify(a)),""].join(".")}function de(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function kh(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(de())}function Um(){var n;let e=(n=Li())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function xh(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Dh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Nh(){let n=de();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Oh(){return!Um()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function sa(){try{return typeof indexedDB=="object"}catch{return!1}}function Vh(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Bm="FirebaseError",Le=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Bm,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ht.prototype.create)}},ht=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?qm(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Le(i,c,r)}};function qm(n,e){return n.replace(jm,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var jm=/\{\$([^}]+)}/g;function Lh(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function dt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(Ah(s)&&Ah(a)){if(!dt(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Ah(n){return n!==null&&typeof n=="object"}function An(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Sn(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Rn(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Mh(n,e){let t=new ea(n,e);return t.subscribe.bind(t)}var ea=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");zm(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Xo),i.error===void 0&&(i.error=Xo),i.complete===void 0&&(i.complete=Xo);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function zm(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Xo(){}var SI=4*60*60*1e3;function se(n){return n&&n._delegate?n._delegate:n}var qe=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var $t="[DEFAULT]";var oa=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Vi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Km(e))try{this.getOrInitializeService({instanceIdentifier:$t})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=$t){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$t){return this.instances.has(e)}getOptions(e=$t){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Gm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$t){return this.component?this.component.multipleInstances?e:$t:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Gm(n){return n===$t?void 0:n}function Km(n){return n.instantiationMode==="EAGER"}var Mi=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new oa(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Wm=[],K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));var Hm={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},Qm=K.INFO,Ym={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},Jm=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=Ym[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},bt=class{constructor(e){this.name=e,this._logLevel=Qm,this._logHandler=Jm,this._userLogHandler=null,Wm.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Hm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}};var $m=(n,e)=>e.some(t=>n instanceof t),Fh,Uh;function Xm(){return Fh||(Fh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zm(){return Uh||(Uh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Bh=new WeakMap,ca=new WeakMap,qh=new WeakMap,aa=new WeakMap,la=new WeakMap;function eg(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Xe(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Bh.set(t,n)}).catch(()=>{}),la.set(e,n),e}function tg(n){if(ca.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});ca.set(n,e)}var ua={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ca.get(n);if(e==="objectStoreNames")return n.objectStoreNames||qh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Xe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jh(n){ua=n(ua)}function ng(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Fi(this),e,...t);return qh.set(r,e.sort?e.sort():[e]),Xe(r)}:Zm().includes(n)?function(...e){return n.apply(Fi(this),e),Xe(Bh.get(this))}:function(...e){return Xe(n.apply(Fi(this),e))}}function rg(n){return typeof n=="function"?ng(n):(n instanceof IDBTransaction&&tg(n),$m(n,Xm())?new Proxy(n,ua):n)}function Xe(n){if(n instanceof IDBRequest)return eg(n);if(aa.has(n))return aa.get(n);let e=rg(n);return e!==n&&(aa.set(n,e),la.set(e,n)),e}var Fi=n=>la.get(n);function Gh(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),c=Xe(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Xe(a.result),l.oldVersion,l.newVersion,Xe(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}var ig=["get","getKey","getAll","getAllKeys","count"],sg=["put","add","delete","clear"],ha=new Map;function zh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ha.get(e))return ha.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=sg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ig.includes(t)))return;let s=async function(a,...c){let l=this.transaction(a,i?"readwrite":"readonly"),d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return ha.set(e,s),s}jh(n=>({...n,get:(e,t,r)=>zh(e,t)||n.get(e,t,r),has:(e,t)=>!!zh(e,t)||n.has(e,t)}));var fa=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(og(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function og(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var pa="@firebase/app",Kh="0.10.5";var Xt=new bt("@firebase/app"),ag="@firebase/app-compat",cg="@firebase/analytics-compat",ug="@firebase/analytics",lg="@firebase/app-check-compat",hg="@firebase/app-check",dg="@firebase/auth",fg="@firebase/auth-compat",pg="@firebase/database",mg="@firebase/database-compat",gg="@firebase/functions",yg="@firebase/functions-compat",_g="@firebase/installations",vg="@firebase/installations-compat",wg="@firebase/messaging",Ig="@firebase/messaging-compat",Eg="@firebase/performance",Tg="@firebase/performance-compat",bg="@firebase/remote-config",Ag="@firebase/remote-config-compat",Sg="@firebase/storage",Rg="@firebase/storage-compat",Pg="@firebase/firestore",Cg="@firebase/vertexai-preview",kg="@firebase/firestore-compat",xg="firebase",Dg="10.12.2";var ma="[DEFAULT]",Ng={[pa]:"fire-core",[ag]:"fire-core-compat",[ug]:"fire-analytics",[cg]:"fire-analytics-compat",[hg]:"fire-app-check",[lg]:"fire-app-check-compat",[dg]:"fire-auth",[fg]:"fire-auth-compat",[pg]:"fire-rtdb",[mg]:"fire-rtdb-compat",[gg]:"fire-fn",[yg]:"fire-fn-compat",[_g]:"fire-iid",[vg]:"fire-iid-compat",[wg]:"fire-fcm",[Ig]:"fire-fcm-compat",[Eg]:"fire-perf",[Tg]:"fire-perf-compat",[bg]:"fire-rc",[Ag]:"fire-rc-compat",[Sg]:"fire-gcs",[Rg]:"fire-gcs-compat",[Pg]:"fire-fst",[kg]:"fire-fst-compat",[Cg]:"fire-vertex","fire-js":"fire-js",[xg]:"fire-js-all"};var Ui=new Map,Og=new Map,ga=new Map;function Wh(n,e){try{n.container.addComponent(e)}catch(t){Xt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function St(n){let e=n.name;if(ga.has(e))return Xt.debug(`There were multiple attempts to register component ${e}.`),!1;ga.set(e,n);for(let t of Ui.values())Wh(t,n);for(let t of Og.values())Wh(t,n);return!0}function Tr(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n.settings!==void 0}var Vg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},At=new ht("app","Firebase",Vg);var ya=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw At.create("app-deleted",{appName:this._name})}};var Rt=Dg;function wa(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:ma,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw At.create("bad-app-name",{appName:String(i)});if(t||(t=ra()),!t)throw At.create("no-options");let s=Ui.get(i);if(s){if(dt(t,s.options)&&dt(r,s.config))return s;throw At.create("duplicate-app",{appName:i})}let a=new Mi(i);for(let l of ga.values())a.addComponent(l);let c=new ya(t,r,a);return Ui.set(i,c),c}function Bi(n=ma){let e=Ui.get(n);if(!e&&n===ma&&ra())return wa();if(!e)throw At.create("no-app",{appName:n});return e}function He(n,e,t){var r;let i=(r=Ng[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xt.warn(c.join(" "));return}St(new qe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var Lg="firebase-heartbeat-database",Mg=1,Er="firebase-heartbeat-store",da=null;function Jh(){return da||(da=Gh(Lg,Mg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Er)}catch(t){console.warn(t)}}}}).catch(n=>{throw At.create("idb-open",{originalErrorMessage:n.message})})),da}async function Fg(n){try{let t=(await Jh()).transaction(Er),r=await t.objectStore(Er).get($h(n));return await t.done,r}catch(e){if(e instanceof Le)Xt.warn(e.message);else{let t=At.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xt.warn(t.message)}}}async function Hh(n,e){try{let r=(await Jh()).transaction(Er,"readwrite");await r.objectStore(Er).put(e,$h(n)),await r.done}catch(t){if(t instanceof Le)Xt.warn(t.message);else{let r=At.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Xt.warn(r.message)}}}function $h(n){return`${n.name}!${n.options.appId}`}var Ug=1024,Bg=30*24*60*60*1e3,_a=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new va(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Qh();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{let c=new Date(a.date).valueOf();return Date.now()-c<=Bg}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Qh(),{heartbeatsToSend:r,unsentEntries:i}=qg(this._heartbeatsCache.heartbeats),s=Ir(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function Qh(){return new Date().toISOString().substring(0,10)}function qg(n,e=Ug){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Yh(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Yh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var va=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return sa()?Vh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Fg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Hh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Hh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Yh(n){return Ir(JSON.stringify({version:2,heartbeats:n})).length}function jg(n){St(new qe("platform-logger",e=>new fa(e),"PRIVATE")),St(new qe("heartbeat",e=>new _a(e),"PRIVATE")),He(pa,Kh,n),He(pa,Kh,"esm2017"),He("fire-js","")}jg("");var zg="firebase",Gg="10.12.2";He(zg,Gg,"app");function qi(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function md(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var gd=md,yd=new ht("auth","Firebase",md());var Hi=new bt("@firebase/auth");function Kg(n,...e){Hi.logLevel<=K.WARN&&Hi.warn(`Auth (${Rt}): ${n}`,...e)}function zi(n,...e){Hi.logLevel<=K.ERROR&&Hi.error(`Auth (${Rt}): ${n}`,...e)}function je(n,...e){throw qa(n,...e)}function Ye(n,...e){return qa(n,...e)}function Ba(n,e,t){let r=Object.assign(Object.assign({},gd()),{[e]:t});return new ht("auth","Firebase",r).create(e,{appName:n.name})}function Ct(n){return Ba(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Wg(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&je(n,"argument-error"),Ba(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function qa(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return yd.create(n,...e)}function M(n,e,...t){if(!n)throw qa(e,...t)}function Ze(n){let e="INTERNAL ASSERTION FAILED: "+n;throw zi(e),new Error(e)}function pt(n,e){n||Ze(e)}function Ta(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Hg(){return Xh()==="http:"||Xh()==="https:"}function Xh(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Qg(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Hg()||xh()||"connection"in navigator)?navigator.onLine:!0}function Yg(){if(typeof navigator=="undefined")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Zt=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,pt(t>e,"Short delay should be less than long delay!"),this.isMobile=kh()||Dh()}get(){return Qg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function ja(n,e){pt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Qi=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;Ze("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;Ze("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;Ze("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Jg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var $g=new Zt(3e4,6e4);function fe(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Te(n,e,t,r,i={}){return _d(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let c=An(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode),Qi.fetch()(vd(n,n.config.apiHost,t,c),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},s))})}async function _d(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Jg),e);try{let i=new ba(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw br(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw br(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw br(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw br(n,"user-disabled",a);let m=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ba(n,m,d);je(n,m)}}catch(i){if(i instanceof Le)throw i;je(n,"network-request-failed",{message:String(i)})}}async function xt(n,e,t,r,i={}){let s=await Te(n,e,t,r,i);return"mfaPendingCredential"in s&&je(n,"multi-factor-auth-required",{_serverResponse:s}),s}function vd(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?ja(n.config,i):`${n.config.apiScheme}://${i}`}function Xg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var ba=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ye(this.auth,"network-request-failed")),$g.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function br(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Ye(n,e,r);return i.customData._tokenResponse=t,i}function Zh(n){return n!==void 0&&n.enterprise!==void 0}var Aa=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Xg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Zg(n,e){return Te(n,"GET","/v2/recaptchaConfig",fe(n,e))}async function ey(n,e){return Te(n,"POST","/v1/accounts:delete",e)}async function wd(n,e){return Te(n,"POST","/v1/accounts:lookup",e)}function Ar(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Id(n,e=!1){let t=se(n),r=await t.getIdToken(e),i=za(r);M(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ar(Ia(i.auth_time)),issuedAtTime:Ar(Ia(i.iat)),expirationTime:Ar(Ia(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ia(n){return Number(n)*1e3}function za(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return zi("JWT malformed, contained fewer than 3 sections"),null;try{let i=ta(t);return i?JSON.parse(i):(zi("Failed to decode base64 JWT payload"),null)}catch(i){return zi("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function ed(n){let e=za(n);return M(e,"internal-error"),M(typeof e.exp!="undefined","internal-error"),M(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function Rr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Le&&ty(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ty({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Sa=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Pr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ar(this.lastLoginAt),this.creationTime=Ar(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Yi(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Rr(n,wd(t,{idToken:r}));M(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Td(s.providerUserInfo):[],c=ny(n.providerData,a),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),m=l?d:!1,v={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Pr(s.createdAt,s.lastLoginAt),isAnonymous:m};Object.assign(n,v)}async function Ed(n){let e=se(n);await Yi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ny(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Td(n){return n.map(e=>{var{providerId:t}=e,r=qi(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function ry(n,e){let t=await _d(n,{},async()=>{let r=An({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=vd(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Qi.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function iy(n,e){return Te(n,"POST","/v2/accounts:revokeToken",fe(n,e))}var Sr=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken!="undefined","internal-error"),M(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):ed(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");let t=ed(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await ry(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(M(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(M(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(M(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Ze("not implemented")}};function Pt(n,e){M(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}var Cn=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=qi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Sa(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Pr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Rr(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Id(this,e)}reload(){return Ed(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Yi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(Ct(this.auth));let e=await this.getIdToken();return await Rr(this,ey(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,l,d,m;let v=(r=t.displayName)!==null&&r!==void 0?r:void 0,b=(i=t.email)!==null&&i!==void 0?i:void 0,R=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,D=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,j=(d=t.createdAt)!==null&&d!==void 0?d:void 0,G=(m=t.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:z,emailVerified:te,isAnonymous:Pe,providerData:Z,stsTokenManager:I}=t;M(z&&I,e,"internal-error");let g=Sr.fromJSON(this.name,I);M(typeof z=="string",e,"internal-error"),Pt(v,e.name),Pt(b,e.name),M(typeof te=="boolean",e,"internal-error"),M(typeof Pe=="boolean",e,"internal-error"),Pt(R,e.name),Pt(D,e.name),Pt(V,e.name),Pt(k,e.name),Pt(j,e.name),Pt(G,e.name);let _=new n({uid:z,auth:e,email:b,emailVerified:te,displayName:v,isAnonymous:Pe,photoURL:D,phoneNumber:R,tenantId:V,stsTokenManager:g,createdAt:j,lastLoginAt:G});return Z&&Array.isArray(Z)&&(_.providerData=Z.map(w=>Object.assign({},w))),k&&(_._redirectEventId=k),_}static async _fromIdTokenResponse(e,t,r=!1){let i=new Sr;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Yi(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];M(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?Td(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Sr;c.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Pr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,d),l}};var td=new Map;function ft(n){pt(n instanceof Function,"Expected a class definition");let e=td.get(n);return e?(pt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,td.set(n,e),e)}var Ji=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Ji.type="NONE";var Ra=Ji;function Gi(n,e,t){return`firebase:${n}:${e}:${t}`}var $i=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=Gi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Gi("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Cn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(ft(Ra),e,r);let i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d),s=i[0]||ft(Ra),a=Gi(r,e.config.apiKey,e.name),c=null;for(let d of t)try{let m=await d._get(a);if(m){let v=Cn._fromJSON(e,m);d!==s&&(c=v),s=d;break}}catch{}let l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new n(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new n(s,e,r))}};function nd(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Sd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(bd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pd(e))return"Blackberry";if(Cd(e))return"Webos";if(Ga(e))return"Safari";if((e.includes("chrome/")||Ad(e))&&!e.includes("edge/"))return"Chrome";if(Rd(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function bd(n=de()){return/firefox\//i.test(n)}function Ga(n=de()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ad(n=de()){return/crios\//i.test(n)}function Sd(n=de()){return/iemobile/i.test(n)}function Rd(n=de()){return/android/i.test(n)}function Pd(n=de()){return/blackberry/i.test(n)}function Cd(n=de()){return/webos/i.test(n)}function ms(n=de()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function sy(n=de()){var e;return ms(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function oy(){return Nh()&&document.documentMode===10}function kd(n=de()){return ms(n)||Rd(n)||Cd(n)||Pd(n)||/windows phone/i.test(n)||Sd(n)}function ay(){try{return!!(window&&window!==window.top)}catch{return!1}}function xd(n,e=[]){let t;switch(n){case"Browser":t=nd(de());break;case"Worker":t=`${nd(de())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Rt}/${r}`}var Pa=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,c)=>{try{let l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function cy(n,e={}){return Te(n,"GET","/v2/passwordPolicy",fe(n,e))}var uy=6,Ca=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:uy,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;let l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var ka=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Xi(this),this.idTokenSubscription=new Xi(this),this.beforeStateQueue=new Pa(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ft(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await $i.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await wd(this,{idToken:e}),r=await Cn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Qe(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Yi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Yg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(Ct(this));let t=e?se(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(Ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(Ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ft(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await cy(this),t=new Ca(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ht("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await iy(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ft(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await $i.create(this,[ft(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{let l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=xd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Kg(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function Dt(n){return se(n)}var Xi=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Mh(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var gs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ly(n){gs=n}function Dd(n){return gs.loadJS(n)}function hy(){return gs.recaptchaEnterpriseScript}function dy(){return gs.gapiScript}function Nd(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var fy="recaptcha-enterprise",py="NO_RECAPTCHA",xa=class{constructor(e){this.type=fy,this.auth=Dt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{Zg(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let d=new Aa(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,a,c){let l=window.grecaptcha;Zh(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(py)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&Zh(window.grecaptcha))i(c,s,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=hy();l.length!==0&&(l+=c),Dd(l).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}};async function rd(n,e,t,r=!1){let i=new xa(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let a=Object.assign({},e);return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function id(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await rd(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await rd(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(s)})}function Od(n,e){let t=Tr(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(dt(s,e!=null?e:{}))return i;je(i,"already-initialized")}return t.initialize({options:e})}function my(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ft);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function ys(n,e,t){let r=Dt(n);M(r._canInitEmulator,r,"emulator-config-failed"),M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=Vd(e),{host:a,port:c}=gy(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${a}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||yy()}function Vd(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function gy(n){let e=Vd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:sd(r.substr(s.length+1))}}else{let[s,a]=r.split(":");return{host:s,port:sd(a)}}}function sd(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function yy(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var en=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ze("not implemented")}_getIdTokenResponse(e){return Ze("not implemented")}_linkToIdToken(e,t){return Ze("not implemented")}_getReauthenticationResolver(e){return Ze("not implemented")}};async function _y(n,e){return Te(n,"POST","/v1/accounts:signUp",e)}async function vy(n,e){return xt(n,"POST","/v1/accounts:signInWithPassword",fe(n,e))}async function wy(n,e){return xt(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}async function Iy(n,e){return xt(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}var Cr=class n extends en{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return id(e,t,"signInWithPassword",vy);case"emailLink":return wy(e,{email:this._email,oobCode:this._password});default:je(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return id(e,r,"signUpPassword",_y);case"emailLink":return Iy(e,{idToken:t,email:this._email,oobCode:this._password});default:je(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Pn(n,e){return xt(n,"POST","/v1/accounts:signInWithIdp",fe(n,e))}var Ey="http://localhost",tn=class n extends en{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=qi(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return Pn(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Pn(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Pn(e,t)}buildRequest(){let e={requestUri:Ey,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=An(t)}return e}};async function Ty(n,e){return Te(n,"POST","/v1/accounts:sendVerificationCode",fe(n,e))}async function by(n,e){return xt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e))}async function Ay(n,e){let t=await xt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e));if(t.temporaryProof)throw br(n,"account-exists-with-different-credential",t);return t}var Sy={USER_NOT_FOUND:"user-not-found"};async function Ry(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return xt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,t),Sy)}var kr=class n extends en{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return by(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Ay(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Ry(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Py(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Cy(n){let e=Sn(Rn(n)).link,t=e?Sn(Rn(e)).deep_link_id:null,r=Sn(Rn(n)).deep_link_id;return(r?Sn(Rn(r)).link:null)||r||t||e||n}var Zi=class n{constructor(e){var t,r,i,s,a,c;let l=Sn(Rn(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,m=(r=l.oobCode)!==null&&r!==void 0?r:null,v=Py((i=l.mode)!==null&&i!==void 0?i:null);M(d&&m&&v,"argument-error"),this.apiKey=d,this.operation=v,this.code=m,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=Cy(e);try{return new n(t)}catch{return null}}};var kn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Cr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Zi.parseLink(t);return M(r,"argument-error"),Cr._fromEmailAndCode(e,r.code,r.tenantId)}};kn.PROVIDER_ID="password";kn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";kn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var xr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var nn=class extends xr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Dr=class n extends nn{constructor(){super("facebook.com")}static credential(e){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Dr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dr.PROVIDER_ID="facebook.com";var kt=class n extends nn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};kt.GOOGLE_SIGN_IN_METHOD="google.com";kt.PROVIDER_ID="google.com";var Nr=class n extends nn{constructor(){super("github.com")}static credential(e){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Nr.GITHUB_SIGN_IN_METHOD="github.com";Nr.PROVIDER_ID="github.com";var Or=class n extends nn{constructor(){super("twitter.com")}static credential(e,t){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Or.TWITTER_SIGN_IN_METHOD="twitter.com";Or.PROVIDER_ID="twitter.com";async function ky(n,e){return xt(n,"POST","/v1/accounts:signUp",fe(n,e))}var rn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Cn._fromIdTokenResponse(e,r,i),a=od(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=od(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function od(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}async function Ka(n){var e;if(Qe(n.app))return Promise.reject(Ct(n));let t=Dt(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new rn({user:t.currentUser,providerId:null,operationType:"signIn"});let r=await ky(t,{returnSecureToken:!0}),i=await rn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}var Da=class n extends Le{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Ld(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Da._fromErrorAndOperation(n,s,e,r):s})}async function xy(n,e,t=!1){let r=await Rr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return rn._forOperation(n,"link",r)}async function Dy(n,e,t=!1){let{auth:r}=n;if(Qe(r.app))return Promise.reject(Ct(r));let i="reauthenticate";try{let s=await Rr(n,Ld(r,i,e,n),t);M(s.idToken,r,"internal-error");let a=za(s.idToken);M(a,r,"internal-error");let{sub:c}=a;return M(n.uid===c,r,"user-mismatch"),rn._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&je(r,"user-mismatch"),s}}async function Md(n,e,t=!1){if(Qe(n.app))return Promise.reject(Ct(n));let r="signIn",i=await Ld(n,r,e),s=await rn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Wa(n,e){return Md(Dt(n),e)}function Fd(n,e,t,r){return se(n).onIdTokenChanged(e,t,r)}function Ud(n,e,t){return se(n).beforeAuthStateChanged(e,t)}function Ha(n,e,t,r){return se(n).onAuthStateChanged(e,t,r)}function Qa(n){return se(n).signOut()}function Ny(n,e){return Te(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function Oy(n,e){return Te(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}function Vy(n,e){return Te(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function Ly(n,e){return Te(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}var es="__sak";var ts=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(es,"1"),this.storage.removeItem(es),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function My(){let n=de();return Ga(n)||ms(n)}var Fy=1e3,Uy=10,ns=class extends ts{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=My()&&ay(),this.fallbackToPolling=kd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let a=this.storage.getItem(r);if(e.newValue!==a)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);oy()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Uy):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Fy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ns.type="LOCAL";var Bd=ns;var rs=class extends ts{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};rs.type="SESSION";var Ya=rs;function By(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var is=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(a).map(async d=>d(t.origin,s)),l=await By(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};is.receivers=[];function Ja(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Na=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{let d=Ja("",20);i.port1.start();let m=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(v){let b=v;if(b.data.eventId===d)switch(b.data.status){case"ack":clearTimeout(m),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(b.data.response);break;default:clearTimeout(m),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function et(){return window}function qy(n){et().location.href=n}function qd(){return typeof et().WorkerGlobalScope!="undefined"&&typeof et().importScripts=="function"}async function jy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function zy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Gy(){return qd()?self:null}var jd="firebaseLocalStorageDb",Ky=1,ss="firebaseLocalStorage",zd="fbase_key",sn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function _s(n,e){return n.transaction([ss],e?"readwrite":"readonly").objectStore(ss)}function Wy(){let n=indexedDB.deleteDatabase(jd);return new sn(n).toPromise()}function Oa(){let n=indexedDB.open(jd,Ky);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(ss,{keyPath:zd})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(ss)?e(r):(r.close(),await Wy(),e(await Oa()))})})}async function ad(n,e,t){let r=_s(n,!0).put({[zd]:e,value:t});return new sn(r).toPromise()}async function Hy(n,e){let t=_s(n,!1).get(e),r=await new sn(t).toPromise();return r===void 0?null:r.value}function cd(n,e){let t=_s(n,!0).delete(e);return new sn(t).toPromise()}var Qy=800,Yy=3,os=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Oa(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>Yy)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return qd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=is._getInstance(Gy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await jy(),!this.activeServiceWorker)return;this.sender=new Na(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||zy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Oa();return await ad(e,es,"1"),await cd(e,es),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ad(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>Hy(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>cd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=_s(i,!1).getAll();return new sn(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Qy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};os.type="LOCAL";var Gd=os;function Jy(n,e){return Te(n,"POST","/v2/accounts/mfaSignIn:start",fe(n,e))}function $y(n,e){return Te(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}function Xy(n,e){return Te(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}var ZI=Nd("rcb"),eE=new Zt(3e4,6e4);var Zy="recaptcha";async function e_(n,e,t){var r;let i=await t.verify();try{M(typeof i=="string",n,"argument-error"),M(t.type===Zy,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let a=s.session;if("phoneNumber"in s)return M(a.type==="enroll",n,"internal-error"),(await Ny(n,{idToken:a.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{M(a.type==="signin",n,"internal-error");let c=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return M(c,n,"missing-multi-factor-info"),(await Jy(n,{mfaPendingCredential:a.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:a}=await Ty(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return a}}finally{t._reset()}}var Vr=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Dt(e)}verifyPhoneNumber(e,t){return e_(this.auth,e,se(t))}static credential(e,t){return kr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?kr._fromTokenResponse(t,r):null}};Vr.PROVIDER_ID="phone";Vr.PHONE_SIGN_IN_METHOD="phone";function Kd(n,e){return e?ft(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Lr=class extends en{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Pn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Pn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Pn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function t_(n){return Md(n.auth,new Lr(n),n.bypassAuthState)}function n_(n){let{auth:e,user:t}=n;return M(t,e,"internal-error"),Dy(t,new Lr(n),n.bypassAuthState)}async function r_(n){let{auth:e,user:t}=n;return M(t,e,"internal-error"),xy(t,new Lr(n),n.bypassAuthState)}var as=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return t_;case"linkViaPopup":case"linkViaRedirect":return r_;case"reauthViaPopup":case"reauthViaRedirect":return n_;default:je(this.auth,"internal-error")}}resolve(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var i_=new Zt(2e3,1e4);async function $a(n,e,t){if(Qe(n.app))return Promise.reject(Ye(n,"operation-not-supported-in-this-environment"));let r=Dt(n);Wg(n,e,xr);let i=Kd(r,t);return new cs(r,"signInViaPopup",e,i).executeNotNull()}var cs=class n extends as{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){pt(this.filter.length===1,"Popup operations only handle one event");let e=Ja();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,i_.get())};e()}};cs.currentPopupAction=null;var s_="pendingRedirect",Ki=new Map,Va=class extends as{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ki.get(this.auth._key());if(!e){try{let r=await o_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ki.set(this.auth._key(),e)}return this.bypassAuthState||Ki.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function o_(n,e){let t=u_(e),r=c_(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function a_(n,e){Ki.set(n._key(),e)}function c_(n){return ft(n._redirectPersistence)}function u_(n){return Gi(s_,n.config.apiKey,n.name)}async function l_(n,e,t=!1){if(Qe(n.app))return Promise.reject(Ct(n));let r=Dt(n),i=Kd(r,e),a=await new Va(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var h_=10*60*1e3,La=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!d_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Wd(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ye(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=h_&&this.cachedEventUids.clear(),this.cachedEventUids.has(ud(e))}saveEventToCache(e){this.cachedEventUids.add(ud(e)),this.lastProcessedEventTime=Date.now()}};function ud(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Wd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function d_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wd(n);default:return!1}}async function f_(n,e={}){return Te(n,"GET","/v1/projects",e)}var p_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,m_=/^https?/;async function g_(n){if(n.config.emulator)return;let{authorizedDomains:e}=await f_(n);for(let t of e)try{if(y_(t))return}catch{}je(n,"unauthorized-domain")}function y_(n){let e=Ta(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!m_.test(t))return!1;if(p_.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var __=new Zt(3e4,6e4);function ld(){let n=et().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function v_(n){return new Promise((e,t)=>{var r,i,s;function a(){ld(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ld(),t(Ye(n,"network-request-failed"))},timeout:__.get()})}if(!((i=(r=et().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=et().gapi)===null||s===void 0)&&s.load)a();else{let c=Nd("iframefcb");return et()[c]=()=>{gapi.load?a():t(Ye(n,"network-request-failed"))},Dd(`${dy()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Wi=null,e})}var Wi=null;function w_(n){return Wi=Wi||v_(n),Wi}var I_=new Zt(5e3,15e3),E_="__/auth/iframe",T_="emulator/auth/iframe",b_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},A_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function S_(n){let e=n.config;M(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?ja(e,T_):`https://${n.config.authDomain}/${E_}`,r={apiKey:e.apiKey,appName:n.name,v:Rt},i=A_.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${An(r).slice(1)}`}async function R_(n){let e=await w_(n),t=et().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:S_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:b_,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=Ye(n,"network-request-failed"),c=et().setTimeout(()=>{s(a)},I_.get());function l(){et().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}var P_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},C_=500,k_=600,x_="_blank",D_="http://localhost",us=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function N_(n,e,t,r=C_,i=k_){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",l=Object.assign(Object.assign({},P_),{width:r.toString(),height:i.toString(),top:s,left:a}),d=de().toLowerCase();t&&(c=Ad(d)?x_:t),bd(d)&&(e=e||D_,l.scrollbars="yes");let m=Object.entries(l).reduce((b,[R,D])=>`${b}${R}=${D},`,"");if(sy(d)&&c!=="_self")return O_(e||"",c),new us(null);let v=window.open(e||"",c,m);M(v,n,"popup-blocked");try{v.focus()}catch{}return new us(v)}function O_(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var V_="__/auth/handler",L_="emulator/auth/handler",M_=encodeURIComponent("fac");async function hd(n,e,t,r,i,s){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Rt,eventId:i};if(e instanceof xr){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Lh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[m,v]of Object.entries(s||{}))a[m]=v}if(e instanceof nn){let m=e.getScopes().filter(v=>v!=="");m.length>0&&(a.scopes=m.join(","))}n.tenantId&&(a.tid=n.tenantId);let c=a;for(let m of Object.keys(c))c[m]===void 0&&delete c[m];let l=await n._getAppCheckToken(),d=l?`#${M_}=${encodeURIComponent(l)}`:"";return`${F_(n)}?${An(c).slice(1)}${d}`}function F_({config:n}){return n.emulator?ja(n,L_):`https://${n.authDomain}/${V_}`}var Ea="webStorageSupport",Ma=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ya,this._completeRedirectFn=l_,this._overrideRedirectResult=a_}async _openPopup(e,t,r,i){var s;pt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await hd(e,t,r,Ta(),i);return N_(e,a,Ja())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await hd(e,t,r,Ta(),i);return qy(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(pt(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await R_(e),r=new La(e);return t.register("authEvent",i=>(M(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ea,{type:Ea},i=>{var s;let a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Ea];a!==void 0&&t(!!a),je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=g_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return kd()||Ga()||ms()}},Hd=Ma,ls=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Ze("unexpected MultiFactorSessionType")}}},Fa=class n extends ls{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Oy(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return $y(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},hs=class{constructor(){}static assertion(e){return Fa._fromCredential(e)}};hs.FACTOR_ID="phone";var ds=class{static assertionForEnrollment(e,t){return fs._fromSecret(e,t)}static assertionForSignIn(e,t){return fs._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;M(typeof((t=r.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await Vy(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return ps._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};ds.FACTOR_ID="totp";var fs=class n extends ls{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return M(typeof this.secret!="undefined",e,"argument-error"),Ly(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){M(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return Xy(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ps=class n{constructor(e,t,r,i,s,a,c){this.sessionInfo=a,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(ji(e)||ji(t))&&(i=!0),i&&(ji(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),ji(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function ji(n){return typeof n=="undefined"||(n==null?void 0:n.length)===0}var dd="@firebase/auth",fd="1.7.4";var Ua=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function U_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function B_(n){St(new qe("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;M(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xd(n)},d=new ka(r,i,s,l);return my(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),St(new qe("auth-internal",e=>{let t=Dt(e.getProvider("auth").getImmediate());return(r=>new Ua(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),He(dd,fd,U_(n)),He(dd,fd,"esm2017")}var q_=5*60,j_=ia("authIdTokenMaxAge")||q_,pd=null,z_=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>j_)return;let i=t==null?void 0:t.token;pd!==i&&(pd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Xa(n=Bi()){let e=Tr(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Od(n,{popupRedirectResolver:Hd,persistence:[Gd,Bd,Ya]}),r=ia("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let a=z_(s.toString());Ud(t,a,()=>a(t.currentUser)),Fd(t,c=>a(c))}}let i=na("auth");return i&&ys(t,`http://${i}`),t}function G_(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}ly({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Ye("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",G_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});B_("Browser");var Qd=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Yd={};var Nt,Za;(function(){var n;function e(I,g){function _(){}_.prototype=g.prototype,I.D=g.prototype,I.prototype=new _,I.prototype.constructor=I,I.C=function(w,E,A){for(var y=Array(arguments.length-2),ct=2;ct<arguments.length;ct++)y[ct-2]=arguments[ct];return g.prototype[E].apply(w,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,_){_||(_=0);var w=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)w[E]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(E=0;16>E;++E)w[E]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=I.g[0],_=I.g[1],E=I.g[2];var A=I.g[3],y=g+(A^_&(E^A))+w[0]+3614090360&4294967295;g=_+(y<<7&4294967295|y>>>25),y=A+(E^g&(_^E))+w[1]+3905402710&4294967295,A=g+(y<<12&4294967295|y>>>20),y=E+(_^A&(g^_))+w[2]+606105819&4294967295,E=A+(y<<17&4294967295|y>>>15),y=_+(g^E&(A^g))+w[3]+3250441966&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(A^_&(E^A))+w[4]+4118548399&4294967295,g=_+(y<<7&4294967295|y>>>25),y=A+(E^g&(_^E))+w[5]+1200080426&4294967295,A=g+(y<<12&4294967295|y>>>20),y=E+(_^A&(g^_))+w[6]+2821735955&4294967295,E=A+(y<<17&4294967295|y>>>15),y=_+(g^E&(A^g))+w[7]+4249261313&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(A^_&(E^A))+w[8]+1770035416&4294967295,g=_+(y<<7&4294967295|y>>>25),y=A+(E^g&(_^E))+w[9]+2336552879&4294967295,A=g+(y<<12&4294967295|y>>>20),y=E+(_^A&(g^_))+w[10]+4294925233&4294967295,E=A+(y<<17&4294967295|y>>>15),y=_+(g^E&(A^g))+w[11]+2304563134&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(A^_&(E^A))+w[12]+1804603682&4294967295,g=_+(y<<7&4294967295|y>>>25),y=A+(E^g&(_^E))+w[13]+4254626195&4294967295,A=g+(y<<12&4294967295|y>>>20),y=E+(_^A&(g^_))+w[14]+2792965006&4294967295,E=A+(y<<17&4294967295|y>>>15),y=_+(g^E&(A^g))+w[15]+1236535329&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(E^A&(_^E))+w[1]+4129170786&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^E&(g^_))+w[6]+3225465664&4294967295,A=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(A^g))+w[11]+643717713&4294967295,E=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(E^A))+w[0]+3921069994&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^A&(_^E))+w[5]+3593408605&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^E&(g^_))+w[10]+38016083&4294967295,A=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(A^g))+w[15]+3634488961&4294967295,E=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(E^A))+w[4]+3889429448&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^A&(_^E))+w[9]+568446438&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^E&(g^_))+w[14]+3275163606&4294967295,A=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(A^g))+w[3]+4107603335&4294967295,E=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(E^A))+w[8]+1163531501&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^A&(_^E))+w[13]+2850285829&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^E&(g^_))+w[2]+4243563512&4294967295,A=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(A^g))+w[7]+1735328473&4294967295,E=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(E^A))+w[12]+2368359562&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(_^E^A)+w[5]+4294588738&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^E)+w[8]+2272392833&4294967295,A=g+(y<<11&4294967295|y>>>21),y=E+(A^g^_)+w[11]+1839030562&4294967295,E=A+(y<<16&4294967295|y>>>16),y=_+(E^A^g)+w[14]+4259657740&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^A)+w[1]+2763975236&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^E)+w[4]+1272893353&4294967295,A=g+(y<<11&4294967295|y>>>21),y=E+(A^g^_)+w[7]+4139469664&4294967295,E=A+(y<<16&4294967295|y>>>16),y=_+(E^A^g)+w[10]+3200236656&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^A)+w[13]+681279174&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^E)+w[0]+3936430074&4294967295,A=g+(y<<11&4294967295|y>>>21),y=E+(A^g^_)+w[3]+3572445317&4294967295,E=A+(y<<16&4294967295|y>>>16),y=_+(E^A^g)+w[6]+76029189&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^A)+w[9]+3654602809&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^E)+w[12]+3873151461&4294967295,A=g+(y<<11&4294967295|y>>>21),y=E+(A^g^_)+w[15]+530742520&4294967295,E=A+(y<<16&4294967295|y>>>16),y=_+(E^A^g)+w[2]+3299628645&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(E^(_|~A))+w[0]+4096336452&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~E))+w[7]+1126891415&4294967295,A=g+(y<<10&4294967295|y>>>22),y=E+(g^(A|~_))+w[14]+2878612391&4294967295,E=A+(y<<15&4294967295|y>>>17),y=_+(A^(E|~g))+w[5]+4237533241&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~A))+w[12]+1700485571&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~E))+w[3]+2399980690&4294967295,A=g+(y<<10&4294967295|y>>>22),y=E+(g^(A|~_))+w[10]+4293915773&4294967295,E=A+(y<<15&4294967295|y>>>17),y=_+(A^(E|~g))+w[1]+2240044497&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~A))+w[8]+1873313359&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~E))+w[15]+4264355552&4294967295,A=g+(y<<10&4294967295|y>>>22),y=E+(g^(A|~_))+w[6]+2734768916&4294967295,E=A+(y<<15&4294967295|y>>>17),y=_+(A^(E|~g))+w[13]+1309151649&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~A))+w[4]+4149444226&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~E))+w[11]+3174756917&4294967295,A=g+(y<<10&4294967295|y>>>22),y=E+(g^(A|~_))+w[2]+718787259&4294967295,E=A+(y<<15&4294967295|y>>>17),y=_+(A^(E|~g))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+A&4294967295}r.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var _=g-this.blockSize,w=this.B,E=this.h,A=0;A<g;){if(E==0)for(;A<=_;)i(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<g;)if(w[E++]=I.charCodeAt(A++),E==this.blockSize){i(this,w),E=0;break}}else for(;A<g;)if(w[E++]=I[A++],E==this.blockSize){i(this,w),E=0;break}}this.h=E,this.o+=g},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var _=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=_&255,_/=256;for(this.u(I),I=Array(16),g=_=0;4>g;++g)for(var w=0;32>w;w+=8)I[_++]=this.g[g]>>>w&255;return I};function s(I,g){var _=c;return Object.prototype.hasOwnProperty.call(_,I)?_[I]:_[I]=g(I)}function a(I,g){this.h=g;for(var _=[],w=!0,E=I.length-1;0<=E;E--){var A=I[E]|0;w&&A==g||(_[E]=A,w=!1)}this.g=_}var c={};function l(I){return-128<=I&&128>I?s(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return v;if(0>I)return k(d(-I));for(var g=[],_=1,w=0;I>=_;w++)g[w]=I/_|0,_*=4294967296;return new a(g,0)}function m(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return k(m(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(g,8)),w=v,E=0;E<I.length;E+=8){var A=Math.min(8,I.length-E),y=parseInt(I.substring(E,E+A),g);8>A?(A=d(Math.pow(g,A)),w=w.j(A).add(d(y))):(w=w.j(_),w=w.add(d(y)))}return w}var v=l(0),b=l(1),R=l(16777216);n=a.prototype,n.m=function(){if(V(this))return-k(this).m();for(var I=0,g=1,_=0;_<this.g.length;_++){var w=this.i(_);I+=(0<=w?w:4294967296+w)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(V(this))return"-"+k(this).toString(I);for(var g=d(Math.pow(I,6)),_=this,w="";;){var E=te(_,g).g;_=j(_,E.j(g));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(I);if(_=E,D(_))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function V(I){return I.h==-1}n.l=function(I){return I=j(this,I),V(I)?-1:D(I)?0:1};function k(I){for(var g=I.g.length,_=[],w=0;w<g;w++)_[w]=~I.g[w];return new a(_,~I.h).add(b)}n.abs=function(){return V(this)?k(this):this},n.add=function(I){for(var g=Math.max(this.g.length,I.g.length),_=[],w=0,E=0;E<=g;E++){var A=w+(this.i(E)&65535)+(I.i(E)&65535),y=(A>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=y>>>16,A&=65535,y&=65535,_[E]=y<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function j(I,g){return I.add(k(g))}n.j=function(I){if(D(this)||D(I))return v;if(V(this))return V(I)?k(this).j(k(I)):k(k(this).j(I));if(V(I))return k(this.j(k(I)));if(0>this.l(R)&&0>I.l(R))return d(this.m()*I.m());for(var g=this.g.length+I.g.length,_=[],w=0;w<2*g;w++)_[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<I.g.length;E++){var A=this.i(w)>>>16,y=this.i(w)&65535,ct=I.i(E)>>>16,nr=I.i(E)&65535;_[2*w+2*E]+=y*nr,G(_,2*w+2*E),_[2*w+2*E+1]+=A*nr,G(_,2*w+2*E+1),_[2*w+2*E+1]+=y*ct,G(_,2*w+2*E+1),_[2*w+2*E+2]+=A*ct,G(_,2*w+2*E+2)}for(w=0;w<g;w++)_[w]=_[2*w+1]<<16|_[2*w];for(w=g;w<2*g;w++)_[w]=0;return new a(_,0)};function G(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function z(I,g){this.g=I,this.h=g}function te(I,g){if(D(g))throw Error("division by zero");if(D(I))return new z(v,v);if(V(I))return g=te(k(I),g),new z(k(g.g),k(g.h));if(V(g))return g=te(I,k(g)),new z(k(g.g),g.h);if(30<I.g.length){if(V(I)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var _=b,w=g;0>=w.l(I);)_=Pe(_),w=Pe(w);var E=Z(_,1),A=Z(w,1);for(w=Z(w,2),_=Z(_,2);!D(w);){var y=A.add(w);0>=y.l(I)&&(E=E.add(_),A=y),w=Z(w,1),_=Z(_,1)}return g=j(I,E.j(g)),new z(E,g)}for(E=v;0<=I.l(g);){for(_=Math.max(1,Math.floor(I.m()/g.m())),w=Math.ceil(Math.log(_)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=d(_),y=A.j(g);V(y)||0<y.l(I);)_-=w,A=d(_),y=A.j(g);D(A)&&(A=b),E=E.add(A),I=j(I,y)}return new z(E,I)}n.A=function(I){return te(this,I).h},n.and=function(I){for(var g=Math.max(this.g.length,I.g.length),_=[],w=0;w<g;w++)_[w]=this.i(w)&I.i(w);return new a(_,this.h&I.h)},n.or=function(I){for(var g=Math.max(this.g.length,I.g.length),_=[],w=0;w<g;w++)_[w]=this.i(w)|I.i(w);return new a(_,this.h|I.h)},n.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),_=[],w=0;w<g;w++)_[w]=this.i(w)^I.i(w);return new a(_,this.h^I.h)};function Pe(I){for(var g=I.g.length+1,_=[],w=0;w<g;w++)_[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(_,I.h)}function Z(I,g){var _=g>>5;g%=32;for(var w=I.g.length-_,E=[],A=0;A<w;A++)E[A]=0<g?I.i(A+_)>>>g|I.i(A+_+1)<<32-g:I.i(A+_);return new a(E,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Za=Yd.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,Nt=Yd.Integer=a}).apply(typeof Qd!="undefined"?Qd:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var vs=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},mt={};var ec,tc,xn,nc,Mr,ws,rc,ic,sc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof vs=="object"&&vs];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var T=o[p];if(!(T in h))break e;h=h[T]}o=o[o.length-1],p=h[o],u=u(p),u!=p&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var h=0,p=!1,T={next:function(){if(!p&&h<o.length){var S=h++;return{value:u(S,o[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,h){return h})}});var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function m(o,u,h){return o.call.apply(o.bind,arguments)}function v(o,u,h){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),o.apply(u,T)}}return function(){return o.apply(u,arguments)}}function b(o,u,h){return b=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:v,b.apply(null,arguments)}function R(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function D(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(p,T,S){for(var N=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)N[ne-2]=arguments[ne];return u.prototype[T].apply(p,N)}}function V(o){let u=o.length;if(0<u){let h=Array(u);for(let p=0;p<u;p++)h[p]=o[p];return h}return[]}function k(o,u){for(let h=1;h<arguments.length;h++){let p=arguments[h];if(l(p)){let T=o.length||0,S=p.length||0;o.length=T+S;for(let N=0;N<S;N++)o[T+N]=p[N]}else o.push(p)}}class j{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function G(o){return/^[\s\xa0]*$/.test(o)}function z(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function te(o){return te[" "](o),o}te[" "]=function(){};var Pe=z().indexOf("Gecko")!=-1&&!(z().toLowerCase().indexOf("webkit")!=-1&&z().indexOf("Edge")==-1)&&!(z().indexOf("Trident")!=-1||z().indexOf("MSIE")!=-1)&&z().indexOf("Edge")==-1;function Z(o,u,h){for(let p in o)u.call(h,o[p],p,o)}function I(o,u){for(let h in o)u.call(void 0,o[h],h,o)}function g(o){let u={};for(let h in o)u[h]=o[h];return u}let _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,u){let h,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(h in p)o[h]=p[h];for(let S=0;S<_.length;S++)h=_[S],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function E(o){var u=1;o=o.split(":");let h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function A(o){c.setTimeout(()=>{throw o},0)}function y(){var o=Ro;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class ct{constructor(){this.h=this.g=null}add(u,h){let p=nr.get();p.set(u,h),this.h?this.h.next=p:this.g=p,this.h=p}}var nr=new j(()=>new Zp,o=>o.reset());class Zp{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let rr,ir=!1,Ro=new ct,bl=()=>{let o=c.Promise.resolve(void 0);rr=()=>{o.then(em)}};var em=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){A(h)}var u=nr;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}ir=!1};function wt(){this.s=this.s,this.C=this.C}wt.prototype.s=!1,wt.prototype.ma=function(){this.s||(this.s=!0,this.N())},wt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ve(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}ve.prototype.h=function(){this.defaultPrevented=!0};var tm=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return o}();function sr(o,u){if(ve.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(Pe){e:{try{te(u.nodeName);var T=!0;break e}catch{}T=!1}T||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:nm[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&sr.aa.h.call(this)}}D(sr,ve);var nm={2:"touch",3:"pen",4:"mouse"};sr.prototype.h=function(){sr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var or="closure_listenable_"+(1e6*Math.random()|0),rm=0;function im(o,u,h,p,T){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!p,this.ha=T,this.key=++rm,this.da=this.fa=!1}function _i(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function vi(o){this.src=o,this.g={},this.h=0}vi.prototype.add=function(o,u,h,p,T){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var N=Co(o,u,p,T);return-1<N?(u=o[N],h||(u.fa=!1)):(u=new im(u,this.src,S,!!p,T),u.fa=h,o.push(u)),u};function Po(o,u){var h=u.type;if(h in o.g){var p=o.g[h],T=Array.prototype.indexOf.call(p,u,void 0),S;(S=0<=T)&&Array.prototype.splice.call(p,T,1),S&&(_i(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Co(o,u,h,p){for(var T=0;T<o.length;++T){var S=o[T];if(!S.da&&S.listener==u&&S.capture==!!h&&S.ha==p)return T}return-1}var ko="closure_lm_"+(1e6*Math.random()|0),xo={};function Al(o,u,h,p,T){if(p&&p.once)return Rl(o,u,h,p,T);if(Array.isArray(u)){for(var S=0;S<u.length;S++)Al(o,u[S],h,p,T);return null}return h=Vo(h),o&&o[or]?o.K(u,h,d(p)?!!p.capture:!!p,T):Sl(o,u,h,!1,p,T)}function Sl(o,u,h,p,T,S){if(!u)throw Error("Invalid event type");var N=d(T)?!!T.capture:!!T,ne=No(o);if(ne||(o[ko]=ne=new vi(o)),h=ne.add(u,h,p,N,S),h.proxy)return h;if(p=sm(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)tm||(T=N),T===void 0&&(T=!1),o.addEventListener(u.toString(),p,T);else if(o.attachEvent)o.attachEvent(Cl(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function sm(){function o(h){return u.call(o.src,o.listener,h)}let u=om;return o}function Rl(o,u,h,p,T){if(Array.isArray(u)){for(var S=0;S<u.length;S++)Rl(o,u[S],h,p,T);return null}return h=Vo(h),o&&o[or]?o.L(u,h,d(p)?!!p.capture:!!p,T):Sl(o,u,h,!0,p,T)}function Pl(o,u,h,p,T){if(Array.isArray(u))for(var S=0;S<u.length;S++)Pl(o,u[S],h,p,T);else p=d(p)?!!p.capture:!!p,h=Vo(h),o&&o[or]?(o=o.i,u=String(u).toString(),u in o.g&&(S=o.g[u],h=Co(S,h,p,T),-1<h&&(_i(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete o.g[u],o.h--)))):o&&(o=No(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Co(u,h,p,T)),(h=-1<o?u[o]:null)&&Do(h))}function Do(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[or])Po(u.i,o);else{var h=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(h,p,o.capture):u.detachEvent?u.detachEvent(Cl(h),p):u.addListener&&u.removeListener&&u.removeListener(p),(h=No(u))?(Po(h,o),h.h==0&&(h.src=null,u[ko]=null)):_i(o)}}}function Cl(o){return o in xo?xo[o]:xo[o]="on"+o}function om(o,u){if(o.da)o=!0;else{u=new sr(u,this);var h=o.listener,p=o.ha||o.src;o.fa&&Do(o),o=h.call(p,u)}return o}function No(o){return o=o[ko],o instanceof vi?o:null}var Oo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Vo(o){return typeof o=="function"?o:(o[Oo]||(o[Oo]=function(u){return o.handleEvent(u)}),o[Oo])}function we(){wt.call(this),this.i=new vi(this),this.M=this,this.F=null}D(we,wt),we.prototype[or]=!0,we.prototype.removeEventListener=function(o,u,h,p){Pl(this,o,u,h,p)};function Ce(o,u){var h,p=o.F;if(p)for(h=[];p;p=p.F)h.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new ve(u,o);else if(u instanceof ve)u.target=u.target||o;else{var T=u;u=new ve(p,o),w(u,T)}if(T=!0,h)for(var S=h.length-1;0<=S;S--){var N=u.g=h[S];T=wi(N,p,!0,u)&&T}if(N=u.g=o,T=wi(N,p,!0,u)&&T,T=wi(N,p,!1,u)&&T,h)for(S=0;S<h.length;S++)N=u.g=h[S],T=wi(N,p,!1,u)&&T}we.prototype.N=function(){if(we.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],p=0;p<h.length;p++)_i(h[p]);delete o.g[u],o.h--}}this.F=null},we.prototype.K=function(o,u,h,p){return this.i.add(String(o),u,!1,h,p)},we.prototype.L=function(o,u,h,p){return this.i.add(String(o),u,!0,h,p)};function wi(o,u,h,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var T=!0,S=0;S<u.length;++S){var N=u[S];if(N&&!N.da&&N.capture==h){var ne=N.listener,ye=N.ha||N.src;N.fa&&Po(o.i,N),T=ne.call(ye,p)!==!1&&T}}return T&&!p.defaultPrevented}function kl(o,u,h){if(typeof o=="function")h&&(o=b(o,h));else if(o&&typeof o.handleEvent=="function")o=b(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function xl(o){o.g=kl(()=>{o.g=null,o.i&&(o.i=!1,xl(o))},o.l);let u=o.h;o.h=null,o.m.apply(null,u)}class am extends wt{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:xl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ar(o){wt.call(this),this.h=o,this.g={}}D(ar,wt);var Dl=[];function Nl(o){Z(o.g,function(u,h){this.g.hasOwnProperty(h)&&Do(u)},o),o.g={}}ar.prototype.N=function(){ar.aa.N.call(this),Nl(this)},ar.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Lo=c.JSON.stringify,cm=c.JSON.parse,um=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Mo(){}Mo.prototype.h=null;function Ol(o){return o.h||(o.h=o.i())}function Vl(){}var cr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Fo(){ve.call(this,"d")}D(Fo,ve);function Uo(){ve.call(this,"c")}D(Uo,ve);var Ht={},Ll=null;function Ii(){return Ll=Ll||new we}Ht.La="serverreachability";function Ml(o){ve.call(this,Ht.La,o)}D(Ml,ve);function ur(o){let u=Ii();Ce(u,new Ml(u))}Ht.STAT_EVENT="statevent";function Fl(o,u){ve.call(this,Ht.STAT_EVENT,o),this.stat=u}D(Fl,ve);function ke(o){let u=Ii();Ce(u,new Fl(u,o))}Ht.Ma="timingevent";function Ul(o,u){ve.call(this,Ht.Ma,o),this.size=u}D(Ul,ve);function lr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function hr(){this.g=!0}hr.prototype.xa=function(){this.g=!1};function lm(o,u,h,p,T,S){o.info(function(){if(o.g)if(S)for(var N="",ne=S.split("&"),ye=0;ye<ne.length;ye++){var Q=ne[ye].split("=");if(1<Q.length){var Ie=Q[0];Q=Q[1];var Ee=Ie.split("_");N=2<=Ee.length&&Ee[1]=="type"?N+(Ie+"="+Q+"&"):N+(Ie+"=redacted&")}}else N=null;else N=S;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+u+`
`+h+`
`+N})}function hm(o,u,h,p,T,S,N){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+u+`
`+h+`
`+S+" "+N})}function In(o,u,h,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+fm(o,h)+(p?" "+p:"")})}function dm(o,u){o.info(function(){return"TIMEOUT: "+u})}hr.prototype.info=function(){};function fm(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var p=h[o];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var S=T[0];if(S!="noop"&&S!="stop"&&S!="close")for(var N=1;N<T.length;N++)T[N]=""}}}}return Lo(h)}catch{return u}}var Ei={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Bl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Bo;function Ti(){}D(Ti,Mo),Ti.prototype.g=function(){return new XMLHttpRequest},Ti.prototype.i=function(){return{}},Bo=new Ti;function It(o,u,h,p){this.j=o,this.i=u,this.l=h,this.R=p||1,this.U=new ar(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ql}function ql(){this.i=null,this.g="",this.h=!1}var jl={},qo={};function jo(o,u,h){o.L=1,o.v=Ri(ut(u)),o.m=h,o.P=!0,zl(o,null)}function zl(o,u){o.F=Date.now(),bi(o),o.A=ut(o.v);var h=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),rh(h.i,"t",p),o.C=0,h=o.j.J,o.h=new ql,o.g=Ih(o.j,h?u:null,!o.m),0<o.O&&(o.M=new am(b(o.Y,o,o.g),o.O)),u=o.U,h=o.g,p=o.ca;var T="readystatechange";Array.isArray(T)||(T&&(Dl[0]=T.toString()),T=Dl);for(var S=0;S<T.length;S++){var N=Al(h,T[S],p||u.handleEvent,!1,u.h||u);if(!N)break;u.g[N.key]=N}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),ur(),lm(o.i,o.u,o.A,o.l,o.R,o.m)}It.prototype.ca=function(o){o=o.target;let u=this.M;u&&lt(o)==3?u.j():this.Y(o)},It.prototype.Y=function(o){try{if(o==this.g)e:{let Ee=lt(this.g);var u=this.g.Ba();let bn=this.g.Z();if(!(3>Ee)&&(Ee!=3||this.g&&(this.h.h||this.g.oa()||lh(this.g)))){this.J||Ee!=4||u==7||(u==8||0>=bn?ur(3):ur(2)),zo(this);var h=this.g.Z();this.X=h;t:if(Gl(this)){var p=lh(this.g);o="";var T=p.length,S=lt(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Qt(this),dr(this);var N="";break t}this.h.i=new c.TextDecoder}for(u=0;u<T;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(S&&u==T-1)});p.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=h==200,hm(this.i,this.u,this.A,this.l,this.R,Ee,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,ye=this.g;if((ne=ye.g?ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(ne)){var Q=ne;break t}}Q=null}if(h=Q)In(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Go(this,h);else{this.o=!1,this.s=3,ke(12),Qt(this),dr(this);break e}}if(this.P){h=!0;let We;for(;!this.J&&this.C<N.length;)if(We=pm(this,N),We==qo){Ee==4&&(this.s=4,ke(14),h=!1),In(this.i,this.l,null,"[Incomplete Response]");break}else if(We==jl){this.s=4,ke(15),In(this.i,this.l,N,"[Invalid Chunk]"),h=!1;break}else In(this.i,this.l,We,null),Go(this,We);if(Gl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ee!=4||N.length!=0||this.h.h||(this.s=1,ke(16),h=!1),this.o=this.o&&h,!h)In(this.i,this.l,N,"[Invalid Chunked Response]"),Qt(this),dr(this);else if(0<N.length&&!this.W){this.W=!0;var Ie=this.j;Ie.g==this&&Ie.ba&&!Ie.M&&(Ie.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),Jo(Ie),Ie.M=!0,ke(11))}}else In(this.i,this.l,N,null),Go(this,N);Ee==4&&Qt(this),this.o&&!this.J&&(Ee==4?yh(this.j,this):(this.o=!1,bi(this)))}else xm(this.g),h==400&&0<N.indexOf("Unknown SID")?(this.s=3,ke(12)):(this.s=0,ke(13)),Qt(this),dr(this)}}}catch{}finally{}};function Gl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function pm(o,u){var h=o.C,p=u.indexOf(`
`,h);return p==-1?qo:(h=Number(u.substring(h,p)),isNaN(h)?jl:(p+=1,p+h>u.length?qo:(u=u.slice(p,p+h),o.C=p+h,u)))}It.prototype.cancel=function(){this.J=!0,Qt(this)};function bi(o){o.S=Date.now()+o.I,Kl(o,o.I)}function Kl(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=lr(b(o.ba,o),u)}function zo(o){o.B&&(c.clearTimeout(o.B),o.B=null)}It.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(dm(this.i,this.A),this.L!=2&&(ur(),ke(17)),Qt(this),this.s=2,dr(this)):Kl(this,this.S-o)};function dr(o){o.j.G==0||o.J||yh(o.j,o)}function Qt(o){zo(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Nl(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Go(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||Ko(h.h,o))){if(!o.K&&Ko(h.h,o)&&h.G==3){try{var p=h.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Di(h),ki(h);else break e;Yo(h),ke(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=lr(b(h.Za,h),6e3));if(1>=Ql(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Jt(h,11)}else if((o.K||h.g==o)&&Di(h),!G(u))for(T=h.Da.g.parse(u),u=0;u<T.length;u++){let Q=T[u];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];let Ie=Q[3];Ie!=null&&(h.la=Ie,h.j.info("VER="+h.la));let Ee=Q[4];Ee!=null&&(h.Aa=Ee,h.j.info("SVER="+h.Aa));let bn=Q[5];bn!=null&&typeof bn=="number"&&0<bn&&(p=1.5*bn,h.L=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;let We=o.g;if(We){let Oi=We.g?We.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Oi){var S=p.h;S.g||Oi.indexOf("spdy")==-1&&Oi.indexOf("quic")==-1&&Oi.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Wo(S,S.h),S.h=null))}if(p.D){let $o=We.g?We.g.getResponseHeader("X-HTTP-Session-Id"):null;$o&&(p.ya=$o,re(p.I,p.D,$o))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),p=h;var N=o;if(p.qa=wh(p,p.J?p.ia:null,p.W),N.K){Yl(p.h,N);var ne=N,ye=p.L;ye&&(ne.I=ye),ne.B&&(zo(ne),bi(ne)),p.g=N}else mh(p);0<h.i.length&&xi(h)}else Q[0]!="stop"&&Q[0]!="close"||Jt(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Jt(h,7):Qo(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}ur(4)}catch{}}var mm=class{constructor(o,u){this.g=o,this.map=u}};function Wl(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Hl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ql(o){return o.h?1:o.g?o.g.size:0}function Ko(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Wo(o,u){o.g?o.g.add(u):o.h=u}function Yl(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Wl.prototype.cancel=function(){if(this.i=Jl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Jl(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(let h of o.g.values())u=u.concat(h.D);return u}return V(o.i)}function gm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map!="undefined"&&o instanceof Map||typeof Set!="undefined"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],h=o.length,p=0;p<h;p++)u.push(o[p]);return u}u=[],h=0;for(p in o)u[h++]=o[p];return u}function ym(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map!="undefined"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set!="undefined"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(let p in o)u[h++]=p;return u}}}function $l(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=ym(o),p=gm(o),T=p.length,S=0;S<T;S++)u.call(void 0,p[S],h&&h[S],o)}var Xl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _m(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var p=o[h].indexOf("="),T=null;if(0<=p){var S=o[h].substring(0,p);T=o[h].substring(p+1)}else S=o[h];u(S,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Yt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Yt){this.h=o.h,Ai(this,o.j),this.o=o.o,this.g=o.g,Si(this,o.s),this.l=o.l;var u=o.i,h=new mr;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),Zl(this,h),this.m=o.m}else o&&(u=String(o).match(Xl))?(this.h=!1,Ai(this,u[1]||"",!0),this.o=fr(u[2]||""),this.g=fr(u[3]||"",!0),Si(this,u[4]),this.l=fr(u[5]||"",!0),Zl(this,u[6]||"",!0),this.m=fr(u[7]||"")):(this.h=!1,this.i=new mr(null,this.h))}Yt.prototype.toString=function(){var o=[],u=this.j;u&&o.push(pr(u,eh,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(pr(u,eh,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(pr(h,h.charAt(0)=="/"?Im:wm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",pr(h,Tm)),o.join("")};function ut(o){return new Yt(o)}function Ai(o,u,h){o.j=h?fr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Si(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Zl(o,u,h){u instanceof mr?(o.i=u,bm(o.i,o.h)):(h||(u=pr(u,Em)),o.i=new mr(u,o.h))}function re(o,u,h){o.i.set(u,h)}function Ri(o){return re(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function fr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function pr(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,vm),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function vm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var eh=/[#\/\?@]/g,wm=/[#\?:]/g,Im=/[#\?]/g,Em=/[#\?@]/g,Tm=/#/g;function mr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Et(o){o.g||(o.g=new Map,o.h=0,o.i&&_m(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=mr.prototype,n.add=function(o,u){Et(this),this.i=null,o=En(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function th(o,u){Et(o),u=En(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function nh(o,u){return Et(o),u=En(o,u),o.g.has(u)}n.forEach=function(o,u){Et(this),this.g.forEach(function(h,p){h.forEach(function(T){o.call(u,T,p,this)},this)},this)},n.na=function(){Et(this);let o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let p=0;p<u.length;p++){let T=o[p];for(let S=0;S<T.length;S++)h.push(u[p])}return h},n.V=function(o){Et(this);let u=[];if(typeof o=="string")nh(this,o)&&(u=u.concat(this.g.get(En(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},n.set=function(o,u){return Et(this),this.i=null,o=En(this,o),nh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function rh(o,u,h){th(o,u),0<h.length&&(o.i=null,o.g.set(En(o,u),V(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var p=u[h];let S=encodeURIComponent(String(p)),N=this.V(p);for(p=0;p<N.length;p++){var T=S;N[p]!==""&&(T+="="+encodeURIComponent(String(N[p]))),o.push(T)}}return this.i=o.join("&")};function En(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function bm(o,u){u&&!o.j&&(Et(o),o.i=null,o.g.forEach(function(h,p){var T=p.toLowerCase();p!=T&&(th(this,p),rh(this,T,h))},o)),o.j=u}function Am(o,u){let h=new hr;if(c.Image){let p=new Image;p.onload=R(Tt,h,"TestLoadImage: loaded",!0,u,p),p.onerror=R(Tt,h,"TestLoadImage: error",!1,u,p),p.onabort=R(Tt,h,"TestLoadImage: abort",!1,u,p),p.ontimeout=R(Tt,h,"TestLoadImage: timeout",!1,u,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function Sm(o,u){let h=new hr,p=new AbortController,T=setTimeout(()=>{p.abort(),Tt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(S=>{clearTimeout(T),S.ok?Tt(h,"TestPingServer: ok",!0,u):Tt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(T),Tt(h,"TestPingServer: error",!1,u)})}function Tt(o,u,h,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(h)}catch{}}function Rm(){this.g=new um}function Pm(o,u,h){let p=h||"";try{$l(o,function(T,S){let N=T;d(T)&&(N=Lo(T)),u.push(p+S+"="+encodeURIComponent(N))})}catch(T){throw u.push(p+"type="+encodeURIComponent("_badmap")),T}}function gr(o){this.l=o.Ub||null,this.j=o.eb||!1}D(gr,Mo),gr.prototype.g=function(){return new Pi(this.l,this.j)},gr.prototype.i=function(o){return function(){return o}}({});function Pi(o,u){we.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(Pi,we),n=Pi.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,_r(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,yr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,_r(this)),this.g&&(this.readyState=3,_r(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ih(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function ih(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?yr(this):_r(this),this.readyState==3&&ih(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,yr(this))},n.Qa=function(o){this.g&&(this.response=o,yr(this))},n.ga=function(){this.g&&yr(this)};function yr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,_r(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function _r(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Pi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function sh(o){let u="";return Z(o,function(h,p){u+=p,u+=":",u+=h,u+=`\r
`}),u}function Ho(o,u,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=sh(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):re(o,u,h))}function oe(o){we.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(oe,we);var Cm=/^https?$/i,km=["POST","PUT"];n=oe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Bo.g(),this.v=this.o?Ol(this.o):Ol(Bo),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(S){oh(this,S);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)h.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let S of p.keys())h.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),T=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(km,u,void 0))||p||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[S,N]of h)this.g.setRequestHeader(S,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{uh(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){oh(this,S)}};function oh(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,ah(o),Ci(o)}function ah(o){o.A||(o.A=!0,Ce(o,"complete"),Ce(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ce(this,"complete"),Ce(this,"abort"),Ci(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ci(this,!0)),oe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ch(this):this.bb())},n.bb=function(){ch(this)};function ch(o){if(o.h&&typeof a!="undefined"&&(!o.v[1]||lt(o)!=4||o.Z()!=2)){if(o.u&&lt(o)==4)kl(o.Ea,0,o);else if(Ce(o,"readystatechange"),lt(o)==4){o.h=!1;try{let N=o.Z();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var p;if(p=N===0){var T=String(o.D).match(Xl)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),p=!Cm.test(T?T.toLowerCase():"")}h=p}if(h)Ce(o,"complete"),Ce(o,"success");else{o.m=6;try{var S=2<lt(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",ah(o)}}finally{Ci(o)}}}}function Ci(o,u){if(o.g){uh(o);let h=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||Ce(o,"ready");try{h.onreadystatechange=p}catch{}}}function uh(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function lt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<lt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),cm(u)}};function lh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function xm(o){let u={};o=(o.g&&2<=lt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(G(o[p]))continue;var h=E(o[p]);let T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let S=u[T]||[];u[T]=S,S.push(h)}I(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function vr(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function hh(o){this.Aa=0,this.i=[],this.j=new hr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=vr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=vr("baseRetryDelayMs",5e3,o),this.cb=vr("retryDelaySeedMs",1e4,o),this.Wa=vr("forwardChannelMaxRetries",2,o),this.wa=vr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Wl(o&&o.concurrentRequestLimit),this.Da=new Rm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=hh.prototype,n.la=8,n.G=1,n.connect=function(o,u,h,p){ke(0),this.W=o,this.H=u||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.I=wh(this,null,this.W),xi(this)};function Qo(o){if(dh(o),o.G==3){var u=o.U++,h=ut(o.I);if(re(h,"SID",o.K),re(h,"RID",u),re(h,"TYPE","terminate"),wr(o,h),u=new It(o,o.j,u),u.L=2,u.v=Ri(ut(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=Ih(u.j,null),u.g.ea(u.v)),u.F=Date.now(),bi(u)}vh(o)}function ki(o){o.g&&(Jo(o),o.g.cancel(),o.g=null)}function dh(o){ki(o),o.u&&(c.clearTimeout(o.u),o.u=null),Di(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function xi(o){if(!Hl(o.h)&&!o.s){o.s=!0;var u=o.Ga;rr||bl(),ir||(rr(),ir=!0),Ro.add(u,o),o.B=0}}function Dm(o,u){return Ql(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=lr(b(o.Ga,o,u),_h(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let T=new It(this,this.j,o),S=this.o;if(this.S&&(S?(S=g(S),w(S,this.S)):S=this.S),this.m!==null||this.O||(T.H=S,S=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=ph(this,T,u),h=ut(this.I),re(h,"RID",o),re(h,"CVER",22),this.D&&re(h,"X-HTTP-Session-Id",this.D),wr(this,h),S&&(this.O?u="headers="+encodeURIComponent(String(sh(S)))+"&"+u:this.m&&Ho(h,this.m,S)),Wo(this.h,T),this.Ua&&re(h,"TYPE","init"),this.P?(re(h,"$req",u),re(h,"SID","null"),T.T=!0,jo(T,h,null)):jo(T,h,u),this.G=2}}else this.G==3&&(o?fh(this,o):this.i.length==0||Hl(this.h)||fh(this))};function fh(o,u){var h;u?h=u.l:h=o.U++;let p=ut(o.I);re(p,"SID",o.K),re(p,"RID",h),re(p,"AID",o.T),wr(o,p),o.m&&o.o&&Ho(p,o.m,o.o),h=new It(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=ph(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Wo(o.h,h),jo(h,p,u)}function wr(o,u){o.H&&Z(o.H,function(h,p){re(u,p,h)}),o.l&&$l({},function(h,p){re(u,p,h)})}function ph(o,u,h){h=Math.min(o.i.length,h);var p=o.l?b(o.l.Na,o.l,o):null;e:{var T=o.i;let S=-1;for(;;){let N=["count="+h];S==-1?0<h?(S=T[0].g,N.push("ofs="+S)):S=0:N.push("ofs="+S);let ne=!0;for(let ye=0;ye<h;ye++){let Q=T[ye].g,Ie=T[ye].map;if(Q-=S,0>Q)S=Math.max(0,T[ye].g-100),ne=!1;else try{Pm(Ie,N,"req"+Q+"_")}catch{p&&p(Ie)}}if(ne){p=N.join("&");break e}}}return o=o.i.splice(0,h),u.D=o,p}function mh(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;rr||bl(),ir||(rr(),ir=!0),Ro.add(u,o),o.v=0}}function Yo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=lr(b(o.Fa,o),_h(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,gh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=lr(b(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ke(10),ki(this),gh(this))};function Jo(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function gh(o){o.g=new It(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=ut(o.qa);re(u,"RID","rpc"),re(u,"SID",o.K),re(u,"AID",o.T),re(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&re(u,"TO",o.ja),re(u,"TYPE","xmlhttp"),wr(o,u),o.m&&o.o&&Ho(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Ri(ut(u)),h.m=null,h.P=!0,zl(h,o)}n.Za=function(){this.C!=null&&(this.C=null,ki(this),Yo(this),ke(19))};function Di(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function yh(o,u){var h=null;if(o.g==u){Di(o),Jo(o),o.g=null;var p=2}else if(Ko(o.h,u))h=u.D,Yl(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var T=o.B;p=Ii(),Ce(p,new Ul(p,h)),xi(o)}else mh(o);else if(T=u.s,T==3||T==0&&0<u.X||!(p==1&&Dm(o,u)||p==2&&Yo(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),T){case 1:Jt(o,5);break;case 4:Jt(o,10);break;case 3:Jt(o,6);break;default:Jt(o,2)}}}function _h(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function Jt(o,u){if(o.j.info("Error code "+u),u==2){var h=b(o.fb,o),p=o.Xa;let T=!p;p=new Yt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ai(p,"https"),Ri(p),T?Am(p.toString(),h):Sm(p.toString(),h)}else ke(2);o.G=0,o.l&&o.l.sa(u),vh(o),dh(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),ke(2)):(this.j.info("Failed to ping google.com"),ke(1))};function vh(o){if(o.G=0,o.ka=[],o.l){let u=Jl(o.h);(u.length!=0||o.i.length!=0)&&(k(o.ka,u),k(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function wh(o,u,h){var p=h instanceof Yt?ut(h):new Yt(h);if(p.g!="")u&&(p.g=u+"."+p.g),Si(p,p.s);else{var T=c.location;p=T.protocol,u=u?u+"."+T.hostname:T.hostname,T=+T.port;var S=new Yt(null);p&&Ai(S,p),u&&(S.g=u),T&&Si(S,T),h&&(S.l=h),p=S}return h=o.D,u=o.ya,h&&u&&re(p,h,u),re(p,"VER",o.la),wr(o,p),p}function Ih(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new oe(new gr({eb:h})):new oe(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Eh(){}n=Eh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ni(){}Ni.prototype.g=function(o,u){return new Ve(o,u)};function Ve(o,u){we.call(this),this.g=new hh(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!G(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!G(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Tn(this)}D(Ve,we),Ve.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ve.prototype.close=function(){Qo(this.g)},Ve.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Lo(o),o=h);u.i.push(new mm(u.Ya++,o)),u.G==3&&xi(u)},Ve.prototype.N=function(){this.g.l=null,delete this.j,Qo(this.g),delete this.g,Ve.aa.N.call(this)};function Th(o){Fo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(let h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}D(Th,Fo);function bh(){Uo.call(this),this.status=1}D(bh,Uo);function Tn(o){this.g=o}D(Tn,Eh),Tn.prototype.ua=function(){Ce(this.g,"a")},Tn.prototype.ta=function(o){Ce(this.g,new Th(o))},Tn.prototype.sa=function(o){Ce(this.g,new bh)},Tn.prototype.ra=function(){Ce(this.g,"b")},Ni.prototype.createWebChannel=Ni.prototype.g,Ve.prototype.send=Ve.prototype.o,Ve.prototype.open=Ve.prototype.m,Ve.prototype.close=Ve.prototype.close,sc=mt.createWebChannelTransport=function(){return new Ni},ic=mt.getStatEventTarget=function(){return Ii()},rc=mt.Event=Ht,ws=mt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ei.NO_ERROR=0,Ei.TIMEOUT=8,Ei.HTTP_ERROR=6,Mr=mt.ErrorCode=Ei,Bl.COMPLETE="complete",nc=mt.EventType=Bl,Vl.EventType=cr,cr.OPEN="a",cr.CLOSE="b",cr.ERROR="c",cr.MESSAGE="d",we.prototype.listen=we.prototype.K,xn=mt.WebChannel=Vl,tc=mt.FetchXmlHttpFactory=gr,oe.prototype.listenOnce=oe.prototype.L,oe.prototype.getLastError=oe.prototype.Ka,oe.prototype.getLastErrorCode=oe.prototype.Ba,oe.prototype.getStatus=oe.prototype.Z,oe.prototype.getResponseJson=oe.prototype.Oa,oe.prototype.getResponseText=oe.prototype.oa,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Ha,ec=mt.XhrIo=oe}).apply(typeof vs!="undefined"?vs:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Jd="@firebase/firestore";var me=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};me.UNAUTHENTICATED=new me(null),me.GOOGLE_CREDENTIALS=new me("google-credentials-uid"),me.FIRST_PARTY=new me("first-party-uid"),me.MOCK_USER=new me("mock-user");var Jn="10.12.1";var cn=new bt("@firebase/firestore");function Fr(){return cn.logLevel}function L(n,...e){if(cn.logLevel<=K.DEBUG){let t=e.map(Qu);cn.debug(`Firestore (${Jn}): ${n}`,...t)}}function gt(n,...e){if(cn.logLevel<=K.ERROR){let t=e.map(Qu);cn.error(`Firestore (${Jn}): ${n}`,...t)}}function Fn(n,...e){if(cn.logLevel<=K.WARN){let t=e.map(Qu);cn.warn(`Firestore (${Jn}): ${n}`,...t)}}function Qu(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function U(n="Unexpected state"){let e=`FIRESTORE (${Jn}) INTERNAL ASSERTION FAILED: `+n;throw gt(e),new Error(e)}function $(n,e){n||U()}function q(n,e){return n}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},O=class extends Le{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var nt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var As=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},uc=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(me.UNAUTHENTICATED))}shutdown(){}},lc=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},hc=class{constructor(e){this.t=e,this.currentUser=me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),s=new nt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new nt,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),a()};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?c(l):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new nt)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?($(typeof r.accessToken=="string"),new As(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return $(e===null||typeof e=="string"),new me(e)}},dc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=me.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},fc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new dc(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(me.FIRST_PARTY))}shutdown(){}invalidateToken(){}},pc=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},mc=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let a=s.token!==this.R;return this.R=s.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?($(typeof t.token=="string"),this.R=t.token,new pc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function K_(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Ss=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=K_(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function J(n,e){return n<e?-1:n>e?1:0}function Un(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var pe=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var B=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new pe(0,0))}static max(){return new n(new pe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Rs=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(),r===void 0?r=e.length-t:r>e.length-t&&U(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),a=t.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},ie=class n extends Rs{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new O(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},W_=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Me=class n extends Rs{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return W_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new O(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new O(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new O(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var F=class n{constructor(e){this.path=e}static fromPath(e){return new n(ie.fromString(e))}static fromName(e){return new n(ie.fromString(e).popFirst(5))}static empty(){return new n(ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new ie(e.slice()))}};var gc=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};gc.UNKNOWN_ID=-1;function H_(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=B.fromTimestamp(r===1e9?new pe(t+1,0):new pe(t,r));return new un(i,F.empty(),e)}function Q_(n){return new un(n.readTime,n.key,-1)}var un=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(B.min(),F.empty(),-1)}static max(){return new n(B.max(),F.empty(),-1)}};function Y_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}var J_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",yc=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function oi(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==J_)throw n;L("LocalStore","Unexpectedly lost primary lease")}var x=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),c=0;for(let l=0;l<s;l++){let d=l;t(e[d]).next(m=>{a[d]=m,++c,c===s&&r(a)},m=>i(m))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function $_(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ai(n){return n.name==="IndexedDbTransactionError"}var Kr=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};Kr.oe=-1;function ci(n){return n==null}function Wr(n){return n===0&&1/n==-1/0}function X_(n){return typeof n=="number"&&Number.isInteger(n)&&!Wr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var Z_=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],vT=[...Z_,"documentOverlays"],ev=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],tv=ev,wT=[...tv,"indexConfiguration","indexState","indexEntries"];function $d(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function mn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function kf(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var ce=class n{constructor(e,t){this.comparator=e,this.root=t||rt.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,rt.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,rt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vn(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vn(this.root,e,this.comparator,!0)}},Vn=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},rt=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw U();let e=this.left.check();if(e!==this.right.check())throw U();return e+(this.isRed()?0:1)}};rt.EMPTY=null,rt.RED=!0,rt.BLACK=!1;rt.EMPTY=new class{constructor(){this.size=0}get key(){throw U()}get value(){throw U()}get color(){throw U()}get left(){throw U()}get right(){throw U()}copy(e,t,r,i,s){return this}insert(e,t,r){return new rt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Ae=class n{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ps(this.data.getIterator())}getIteratorFrom(e){return new Ps(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Ps=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var ze=class n{constructor(e){this.fields=e,e.sort(Me.comparator)}static empty(){return new n([])}unionWith(e){let t=new Ae(Me.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Un(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Cs=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var xe=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new Cs("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};xe.EMPTY_BYTE_STRING=new xe("");var nv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yt(n){if($(!!n),typeof n=="string"){let e=0,t=nv.exec(n);if($(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ae(n.seconds),nanos:ae(n.nanos)}}function ae(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Mt(n){return typeof n=="string"?xe.fromBase64String(n):xe.fromUint8Array(n)}function Yu(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ju(n){let e=n.mapValue.fields.__previous_value__;return Yu(e)?Ju(e):e}function Hr(n){let e=yt(n.mapValue.fields.__local_write_time__.timestampValue);return new pe(e.seconds,e.nanos)}var _c=class{constructor(e,t,r,i,s,a,c,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d}},ks=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Is={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function ln(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Yu(n)?4:xf(n)?9007199254740991:10:U()}function st(n,e){if(n===e)return!0;let t=ln(n);if(t!==ln(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Hr(n).isEqual(Hr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=yt(i.timestampValue),c=yt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Mt(i.bytesValue).isEqual(Mt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ae(i.geoPointValue.latitude)===ae(s.geoPointValue.latitude)&&ae(i.geoPointValue.longitude)===ae(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ae(i.integerValue)===ae(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=ae(i.doubleValue),c=ae(s.doubleValue);return a===c?Wr(a)===Wr(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Un(n.arrayValue.values||[],e.arrayValue.values||[],st);case 10:return function(i,s){let a=i.mapValue.fields||{},c=s.mapValue.fields||{};if($d(a)!==$d(c))return!1;for(let l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!st(a[l],c[l])))return!1;return!0}(n,e);default:return U()}}function Qr(n,e){return(n.values||[]).find(t=>st(t,e))!==void 0}function Bn(n,e){if(n===e)return 0;let t=ln(n),r=ln(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(s,a){let c=ae(s.integerValue||s.doubleValue),l=ae(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Xd(n.timestampValue,e.timestampValue);case 4:return Xd(Hr(n),Hr(e));case 5:return J(n.stringValue,e.stringValue);case 6:return function(s,a){let c=Mt(s),l=Mt(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let c=s.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){let m=J(c[d],l[d]);if(m!==0)return m}return J(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let c=J(ae(s.latitude),ae(a.latitude));return c!==0?c:J(ae(s.longitude),ae(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,a){let c=s.values||[],l=a.values||[];for(let d=0;d<c.length&&d<l.length;++d){let m=Bn(c[d],l[d]);if(m)return m}return J(c.length,l.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,a){if(s===Is.mapValue&&a===Is.mapValue)return 0;if(s===Is.mapValue)return 1;if(a===Is.mapValue)return-1;let c=s.fields||{},l=Object.keys(c),d=a.fields||{},m=Object.keys(d);l.sort(),m.sort();for(let v=0;v<l.length&&v<m.length;++v){let b=J(l[v],m[v]);if(b!==0)return b;let R=Bn(c[l[v]],d[m[v]]);if(R!==0)return R}return J(l.length,m.length)}(n.mapValue,e.mapValue);default:throw U()}}function Xd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);let t=yt(n),r=yt(e),i=J(t.seconds,r.seconds);return i!==0?i:J(t.nanos,r.nanos)}function qn(n){return vc(n)}function vc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=yt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Mt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=vc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+=`${a}:${vc(t.fields[a])}`;return i+"}"}(n.mapValue):U()}function Zd(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function wc(n){return!!n&&"integerValue"in n}function $u(n){return!!n&&"arrayValue"in n}function ef(n){return!!n&&"nullValue"in n}function tf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ts(n){return!!n&&"mapValue"in n}function Br(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return mn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Br(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Br(n.arrayValue.values[t]);return e}return Object.assign({},n)}function xf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var Ne=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ts(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Br(t)}setAll(e){let t=Me.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=Br(a):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Ts(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return st(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Ts(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){mn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(Br(this.value))}};function Df(n){let e=[];return mn(n.fields,(t,r)=>{let i=new Me([t]);if(Ts(r)){let s=Df(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new ze(e)}var Ue=class n{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new n(e,0,B.min(),B.min(),B.min(),Ne.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,B.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,B.min(),B.min(),Ne.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,B.min(),B.min(),Ne.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ne.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ne.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var jn=class{constructor(e,t){this.position=e,this.inclusive=t}};function nf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=Bn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function rf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!st(n.position[t],e.position[t]))return!1;return!0}var hn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function rv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var xs=class{},he=class n extends xs{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ec(e,t,r):t==="array-contains"?new Ac(e,r):t==="in"?new Sc(e,r):t==="not-in"?new Rc(e,r):t==="array-contains-any"?new Pc(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Tc(e,r):new bc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Bn(t,this.value)):t!==null&&ln(this.value)===ln(t)&&this.matchesComparison(Bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Je=class n extends xs{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return Nf(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function Nf(n){return n.op==="and"}function Of(n){return iv(n)&&Nf(n)}function iv(n){for(let e of n.filters)if(e instanceof Je)return!1;return!0}function Ic(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+qn(n.value);if(Of(n))return n.filters.map(e=>Ic(e)).join(",");{let e=n.filters.map(t=>Ic(t)).join(",");return`${n.op}(${e})`}}function Vf(n,e){return n instanceof he?function(r,i){return i instanceof he&&r.op===i.op&&r.field.isEqual(i.field)&&st(r.value,i.value)}(n,e):n instanceof Je?function(r,i){return i instanceof Je&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&Vf(a,i.filters[c]),!0):!1}(n,e):void U()}function Lf(n){return n instanceof he?function(t){return`${t.field.canonicalString()} ${t.op} ${qn(t.value)}`}(n):n instanceof Je?function(t){return t.op.toString()+" {"+t.getFilters().map(Lf).join(" ,")+"}"}(n):"Filter"}var Ec=class extends he{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){let t=F.comparator(e.key,this.key);return this.matchesComparison(t)}},Tc=class extends he{constructor(e,t){super(e,"in",t),this.keys=Mf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},bc=class extends he{constructor(e,t){super(e,"not-in",t),this.keys=Mf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Mf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>F.fromName(r.referenceValue))}var Ac=class extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return $u(t)&&Qr(t.arrayValue,this.value)}},Sc=class extends he{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Qr(this.value.arrayValue,t)}},Rc=class extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if(Qr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!Qr(this.value.arrayValue,t)}},Pc=class extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!$u(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Qr(this.value.arrayValue,r))}};var Cc=class{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.ue=null}};function sf(n,e=null,t=[],r=[],i=null,s=null,a=null){return new Cc(n,e,t,r,i,s,a)}function Xu(n){let e=q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ic(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ci(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>qn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>qn(r)).join(",")),e.ue=t}return e.ue}function Zu(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!rv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Vf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!rf(n.startAt,e.startAt)&&rf(n.endAt,e.endAt)}function kc(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var Ft=class{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function sv(n,e,t,r,i,s,a,c){return new Ft(n,e,t,r,i,s,a,c)}function el(n){return new Ft(n)}function of(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ff(n){return n.collectionGroup!==null}function qr(n){let e=q(n);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ae(Me.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new hn(s,r))}),t.has(Me.keyField().canonicalString())||e.ce.push(new hn(Me.keyField(),r))}return e.ce}function it(n){let e=q(n);return e.le||(e.le=ov(e,qr(n))),e.le}function ov(n,e){if(n.limitType==="F")return sf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new hn(i.field,s)});let t=n.endAt?new jn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new jn(n.startAt.position,n.startAt.inclusive):null;return sf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function xc(n,e){let t=n.filters.concat([e]);return new Ft(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ds(n,e,t){return new Ft(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ro(n,e){return Zu(it(n),it(e))&&n.limitType===e.limitType}function Uf(n){return`${Xu(it(n))}|lt:${n.limitType}`}function Dn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Lf(i)).join(", ")}]`),ci(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>qn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>qn(i)).join(",")),`Target(${r})`}(it(n))}; limitType=${n.limitType})`}function io(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):F.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of qr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,l){let d=nf(a,c,l);return a.inclusive?d<=0:d<0}(r.startAt,qr(r),i)||r.endAt&&!function(a,c,l){let d=nf(a,c,l);return a.inclusive?d>=0:d>0}(r.endAt,qr(r),i))}(n,e)}function av(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Bf(n){return(e,t)=>{let r=!1;for(let i of qr(n)){let s=cv(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function cv(n,e,t){let r=n.field.isKeyField()?F.comparator(e.key,t.key):function(s,a,c){let l=a.data.field(s),d=c.data.field(s);return l!==null&&d!==null?Bn(l,d):U()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U()}}var Ut=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){mn(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return kf(this.inner)}size(){return this.innerSize}};var uv=new ce(F.comparator);function _t(){return uv}var qf=new ce(F.comparator);function Ur(...n){let e=qf;for(let t of n)e=e.insert(t.key,t);return e}function jf(n){let e=qf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function on(){return jr()}function zf(){return jr()}function jr(){return new Ut(n=>n.toString(),(n,e)=>n.isEqual(e))}var lv=new ce(F.comparator),hv=new Ae(F.comparator);function W(...n){let e=hv;for(let t of n)e=e.add(t);return e}var dv=new Ae(J);function fv(){return dv}function Gf(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Wr(e)?"-0":e}}function Kf(n){return{integerValue:""+n}}function pv(n,e){return X_(e)?Kf(e):Gf(n,e)}var zn=class{constructor(){this._=void 0}};function mv(n,e,t){return n instanceof dn?function(i,s){let a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Yu(s)&&(s=Ju(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(t,e):n instanceof Bt?Hf(n,e):n instanceof qt?Qf(n,e):function(i,s){let a=Wf(i,s),c=af(a)+af(i.Pe);return wc(a)&&wc(i.Pe)?Kf(c):Gf(i.serializer,c)}(n,e)}function gv(n,e,t){return n instanceof Bt?Hf(n,e):n instanceof qt?Qf(n,e):t}function Wf(n,e){return n instanceof Gn?function(r){return wc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var dn=class extends zn{},Bt=class extends zn{constructor(e){super(),this.elements=e}};function Hf(n,e){let t=Yf(e);for(let r of n.elements)t.some(i=>st(i,r))||t.push(r);return{arrayValue:{values:t}}}var qt=class extends zn{constructor(e){super(),this.elements=e}};function Qf(n,e){let t=Yf(e);for(let r of n.elements)t=t.filter(i=>!st(i,r));return{arrayValue:{values:t}}}var Gn=class extends zn{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function af(n){return ae(n.integerValue||n.doubleValue)}function Yf(n){return $u(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var Yr=class{constructor(e,t){this.field=e,this.transform=t}};function yv(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Bt&&i instanceof Bt||r instanceof qt&&i instanceof qt?Un(r.elements,i.elements,st):r instanceof Gn&&i instanceof Gn?st(r.Pe,i.Pe):r instanceof dn&&i instanceof dn}(n.transform,e.transform)}var Dc=class{constructor(e,t){this.version=e,this.transformResults=t}},ge=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function bs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Kn=class{};function Jf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new pn(n.key,ge.none()):new fn(n.key,n.data,ge.none());{let t=n.data,r=Ne.empty(),i=new Ae(Me.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new ot(n.key,r,new ze(i.toArray()),ge.none())}}function _v(n,e,t){n instanceof fn?function(i,s,a){let c=i.value.clone(),l=uf(i.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof ot?function(i,s,a){if(!bs(i.precondition,s))return void s.convertToUnknownDocument(a.version);let c=uf(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll($f(i)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function zr(n,e,t,r){return n instanceof fn?function(s,a,c,l){if(!bs(s.precondition,a))return c;let d=s.value.clone(),m=lf(s.fieldTransforms,l,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof ot?function(s,a,c,l){if(!bs(s.precondition,a))return c;let d=lf(s.fieldTransforms,l,a),m=a.data;return m.setAll($f(s)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(v=>v.field))}(n,e,t,r):function(s,a,c){return bs(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function vv(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=Wf(r.transform,i||null);s!=null&&(t===null&&(t=Ne.empty()),t.set(r.field,s))}return t||null}function cf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Un(r,i,(s,a)=>yv(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var fn=class extends Kn{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},ot=class extends Kn{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function $f(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function uf(n,e,t){let r=new Map;$(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,gv(a,c,t[i]))}return r}function lf(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,mv(s,a,e))}return r}var pn=class extends Kn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Ns=class extends Kn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var Nc=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&_v(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=zr(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=zr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=zf();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;let l=Jf(a,c);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&Un(this.mutations,e.mutations,(t,r)=>cf(t,r))&&Un(this.baseMutations,e.baseMutations,(t,r)=>cf(t,r))}},Oc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){$(e.mutations.length===r.length);let i=function(){return lv}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var Vc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Lc=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var ue,H;function Xf(n){switch(n){default:return U();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function Zf(n){if(n===void 0)return gt("GRPC error has no .code"),P.UNKNOWN;switch(n){case ue.OK:return P.OK;case ue.CANCELLED:return P.CANCELLED;case ue.UNKNOWN:return P.UNKNOWN;case ue.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ue.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ue.INTERNAL:return P.INTERNAL;case ue.UNAVAILABLE:return P.UNAVAILABLE;case ue.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ue.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ue.NOT_FOUND:return P.NOT_FOUND;case ue.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ue.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ue.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ue.ABORTED:return P.ABORTED;case ue.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ue.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ue.DATA_LOSS:return P.DATA_LOSS;default:return U()}}(H=ue||(ue={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";var hf=null;function wv(){return new TextEncoder}var Iv=new Nt([4294967295,4294967295],0);function df(n){let e=wv().encode(n),t=new Za;return t.update(e),new Uint8Array(t.digest())}function ff(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Nt([t,r],0),new Nt([i,s],0)]}var Mc=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new an(`Invalid padding: ${t}`);if(r<0)throw new an(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new an(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new an(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Nt.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Nt.fromNumber(r)));return i.compare(Iv)===1&&(i=new Nt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;let t=df(e),[r,i]=ff(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;let t=df(e),[r,i]=ff(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},an=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Os=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,Jr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(B.min(),i,new ce(J),_t(),W())}},Jr=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,W(),W(),W())}};var Ln=class{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}},Vs=class{constructor(e,t){this.targetId=e,this.me=t}},Ls=class{constructor(e,t,r=xe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Ms=class{constructor(){this.fe=0,this.ge=mf(),this.pe=xe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=W(),t=W(),r=W();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:U()}}),new Jr(this.pe,this.ye,e,t,r)}ve(){this.we=!1,this.ge=mf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,$(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},Fc=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=_t(),this.qe=pf(),this.Qe=new ce(J)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:U()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){let t=e.targetId,r=e.me.count,i=this.Je(t);if(i){let s=i.target;if(kc(s))if(r===0){let a=new F(s.path);this.Ue(t,a,Ue.newNoDocument(a,B.min()))}else $(r===1);else{let a=this.Ye(t);if(a!==r){let c=this.Ze(e),l=c?this.Xe(c,e,a):1;if(l!==0){this.je(t);let d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}hf==null||hf.et(function(m,v,b,R,D){var V,k,j,G,z,te;let Pe={localCacheCount:m,existenceFilterCount:v.count,databaseId:b.database,projectId:b.projectId},Z=v.unchangedNames;return Z&&(Pe.bloomFilter={applied:D===0,hashCount:(V=Z==null?void 0:Z.hashCount)!==null&&V!==void 0?V:0,bitmapLength:(G=(j=(k=Z==null?void 0:Z.bits)===null||k===void 0?void 0:k.bitmap)===null||j===void 0?void 0:j.length)!==null&&G!==void 0?G:0,padding:(te=(z=Z==null?void 0:Z.bits)===null||z===void 0?void 0:z.padding)!==null&&te!==void 0?te:0,mightContain:I=>{var g;return(g=R==null?void 0:R.mightContain(I))!==null&&g!==void 0&&g}}),Pe}(a,e.me,this.Le.tt(),c,l))}}}}Ze(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,c;try{a=Mt(r).toUint8Array()}catch(l){if(l instanceof Cs)return Fn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Mc(a,i,s)}catch(l){return Fn(l instanceof an?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){let r=this.Le.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){let t=new Map;this.Be.forEach((s,a)=>{let c=this.Je(a);if(c){if(s.current&&kc(c.target)){let l=new F(c.target.path);this.ke.get(l)!==null||this.it(a,l)||this.Ue(a,l,Ue.newNoDocument(l,e))}s.be&&(t.set(a,s.Ce()),s.ve())}});let r=W();this.qe.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{let d=this.Je(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));let i=new Os(e,t,this.Qe,this.ke,r);return this.ke=_t(),this.qe=pf(),this.Qe=new ce(J),i}$e(e,t){if(!this.ze(e))return;let r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;let i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Ms,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ae(J),this.qe=this.qe.insert(e,t)),t}ze(e){let t=this.Je(e)!==null;return t||L("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Ms),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function pf(){return new ce(F.comparator)}function mf(){return new ce(F.comparator)}var Ev={asc:"ASCENDING",desc:"DESCENDING"},Tv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},bv={and:"AND",or:"OR"},Uc=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Bc(n,e){return n.useProto3Json||ci(e)?e:{value:e}}function Fs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ep(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Av(n,e){return Fs(n,e.toTimestamp())}function Fe(n){return $(!!n),B.fromTimestamp(function(t){let r=yt(t);return new pe(r.seconds,r.nanos)}(n))}function tl(n,e){return qc(n,e).canonicalString()}function qc(n,e){let t=function(i){return new ie(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function tp(n){let e=ie.fromString(n);return $(ap(e)),e}function Us(n,e){return tl(n.databaseId,e.path)}function Gr(n,e){let t=tp(e);if(t.get(1)!==n.databaseId.projectId)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(rp(t))}function np(n,e){return tl(n.databaseId,e)}function Sv(n){let e=tp(n);return e.length===4?ie.emptyPath():rp(e)}function jc(n){return new ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function rp(n){return $(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function gf(n,e,t){return{name:Us(n,e),fields:t.value.mapValue.fields}}function Rv(n,e){return"found"in e?function(r,i){$(!!i.found),i.found.name,i.found.updateTime;let s=Gr(r,i.found.name),a=Fe(i.found.updateTime),c=i.found.createTime?Fe(i.found.createTime):B.min(),l=new Ne({mapValue:{fields:i.found.fields}});return Ue.newFoundDocument(s,a,c,l)}(n,e):"missing"in e?function(r,i){$(!!i.missing),$(!!i.readTime);let s=Gr(r,i.missing),a=Fe(i.readTime);return Ue.newNoDocument(s,a)}(n,e):U()}function Pv(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:U()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,m){return d.useProto3Json?($(m===void 0||typeof m=="string"),xe.fromBase64String(m||"")):($(m===void 0||m instanceof Buffer||m instanceof Uint8Array),xe.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){let m=d.code===void 0?P.UNKNOWN:Zf(d.code);return new O(m,d.message||"")}(a);t=new Ls(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=Gr(n,r.document.name),s=Fe(r.document.updateTime),a=r.document.createTime?Fe(r.document.createTime):B.min(),c=new Ne({mapValue:{fields:r.document.fields}}),l=Ue.newFoundDocument(i,s,a,c),d=r.targetIds||[],m=r.removedTargetIds||[];t=new Ln(d,m,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=Gr(n,r.document),s=r.readTime?Fe(r.readTime):B.min(),a=Ue.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Ln([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=Gr(n,r.document),s=r.removedTargetIds||[];t=new Ln([],s,i,null)}else{if(!("filter"in e))return U();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new Lc(i,s),c=r.targetId;t=new Vs(c,a)}}return t}function ip(n,e){let t;if(e instanceof fn)t={update:gf(n,e.key,e.value)};else if(e instanceof pn)t={delete:Us(n,e.key)};else if(e instanceof ot)t={update:gf(n,e.key,e.data),updateMask:Mv(e.fieldMask)};else{if(!(e instanceof Ns))return U();t={verify:Us(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let c=a.transform;if(c instanceof dn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Bt)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof qt)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Gn)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw U()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Av(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:U()}(n,e.precondition)),t}function Cv(n,e){return n&&n.length>0?($(e!==void 0),n.map(t=>function(i,s){let a=i.updateTime?Fe(i.updateTime):Fe(s);return a.isEqual(B.min())&&(a=Fe(s)),new Dc(a,i.transformResults||[])}(t,e))):[]}function kv(n,e){return{documents:[np(n,e.path)]}}function xv(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=np(n,i);let s=function(d){if(d.length!==0)return op(Je.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(d){if(d.length!==0)return d.map(m=>function(b){return{field:Nn(b.field),direction:Ov(b.dir)}}(m))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let c=Bc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:i}}function Dv(n){let e=Sv(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){$(r===1);let m=t.from[0];m.allDescendants?i=m.collectionId:e=e.child(m.collectionId)}let s=[];t.where&&(s=function(v){let b=sp(v);return b instanceof Je&&Of(b)?b.getFilters():[b]}(t.where));let a=[];t.orderBy&&(a=function(v){return v.map(b=>function(D){return new hn(On(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(b))}(t.orderBy));let c=null;t.limit&&(c=function(v){let b;return b=typeof v=="object"?v.value:v,ci(b)?null:b}(t.limit));let l=null;t.startAt&&(l=function(v){let b=!!v.before,R=v.values||[];return new jn(R,b)}(t.startAt));let d=null;return t.endAt&&(d=function(v){let b=!v.before,R=v.values||[];return new jn(R,b)}(t.endAt)),sv(e,i,a,s,c,"F",l,d)}function Nv(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function sp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=On(t.unaryFilter.field);return he.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=On(t.unaryFilter.field);return he.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=On(t.unaryFilter.field);return he.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=On(t.unaryFilter.field);return he.create(a,"!=",{nullValue:"NULL_VALUE"});default:return U()}}(n):n.fieldFilter!==void 0?function(t){return he.create(On(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return U()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Je.create(t.compositeFilter.filters.map(r=>sp(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return U()}}(t.compositeFilter.op))}(n):U()}function Ov(n){return Ev[n]}function Vv(n){return Tv[n]}function Lv(n){return bv[n]}function Nn(n){return{fieldPath:n.canonicalString()}}function On(n){return Me.fromServerFormat(n.fieldPath)}function op(n){return n instanceof he?function(t){if(t.op==="=="){if(tf(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NAN"}};if(ef(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(tf(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NOT_NAN"}};if(ef(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Nn(t.field),op:Vv(t.op),value:t.value}}}(n):n instanceof Je?function(t){let r=t.getFilters().map(i=>op(i));return r.length===1?r[0]:{compositeFilter:{op:Lv(t.op),filters:r}}}(n):U()}function Mv(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ap(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var $r=class n{constructor(e,t,r,i,s=B.min(),a=B.min(),c=xe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var zc=class{constructor(e){this.ct=e}};function Fv(n){let e=Dv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ds(e,e.limit,"L"):e}var Bs=class{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(ae(e.integerValue));else if("doubleValue"in e){let r=ae(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),Wr(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),typeof r=="string"&&(r=yt(r)),t.At(`${r.seconds||""}`),t.dt(r.nanos||0)}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(Mt(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?xf(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):U()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};this.Et(t,55);for(let i of Object.keys(r))this.Rt(i,t),this.It(r[i],t)}wt(e,t){let r=e.values||[];this.Et(t,50);for(let i of r)this.It(i,t)}gt(e,t){this.Et(t,37),F.fromName(e).path.forEach(r=>{this.Et(t,60),this.St(r,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}};Bs.bt=new Bs;var Gc=class{constructor(){this._n=new Kc}addToCollectionParentIndex(e,t){return this._n.add(t),x.resolve()}getCollectionParents(e,t){return x.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return x.resolve()}deleteFieldIndex(e,t){return x.resolve()}deleteAllFieldIndexes(e){return x.resolve()}createTargetIndexes(e,t){return x.resolve()}getDocumentsMatchingTarget(e,t){return x.resolve(null)}getIndexType(e,t){return x.resolve(0)}getFieldIndexes(e,t){return x.resolve([])}getNextCollectionGroupToUpdate(e){return x.resolve(null)}getMinOffset(e,t){return x.resolve(un.min())}getMinOffsetFromCollectionGroup(e,t){return x.resolve(un.min())}updateCollectionGroup(e,t,r){return x.resolve()}updateIndexEntries(e,t){return x.resolve()}},Kc=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ae(ie.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ae(ie.comparator)).toArray()}};var ET=new Uint8Array(0);var tt=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};tt.DEFAULT_COLLECTION_PERCENTILE=10,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,tt.DEFAULT=new tt(41943040,tt.DEFAULT_COLLECTION_PERCENTILE,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),tt.DISABLED=new tt(-1,0,0);var Xr=class n{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new n(0)}static Ln(){return new n(-1)}};var Wc=class{constructor(){this.changes=new Ut(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ue.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?x.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Hc=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Qc=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&zr(r.mutation,i,ze.empty(),pe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,W()).next(()=>r))}getLocalViewOfDocuments(e,t,r=W()){let i=on();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Ur();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=on();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,W()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=_t(),a=jr(),c=function(){return jr()}();return t.forEach((l,d)=>{let m=r.get(d.key);i.has(d.key)&&(m===void 0||m.mutation instanceof ot)?s=s.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),zr(m.mutation,d,m.mutation.getFieldMask(),pe.now())):a.set(d.key,ze.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,m)=>a.set(d,m)),t.forEach((d,m)=>{var v;return c.set(d,new Hc(m,(v=a.get(d))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,t){let r=jr(),i=new ce((a,c)=>a-c),s=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let c of a)c.keys().forEach(l=>{let d=t.get(l);if(d===null)return;let m=r.get(l)||ze.empty();m=c.applyToLocalView(d,m),r.set(l,m);let v=(i.get(c.batchId)||W()).add(l);i=i.insert(c.batchId,v)})}).next(()=>{let a=[],c=i.getReverseIterator();for(;c.hasNext();){let l=c.getNext(),d=l.key,m=l.value,v=zf();m.forEach(b=>{if(!s.has(b)){let R=Jf(t.get(b),r.get(b));R!==null&&v.set(b,R),s=s.add(b)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,v))}return x.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return F.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ff(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):x.resolve(on()),c=-1,l=s;return a.next(d=>x.forEach(d,(m,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),s.get(m)?x.resolve():this.remoteDocumentCache.getEntry(e,m).next(b=>{l=l.insert(m,b)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,W())).next(m=>({batchId:c,changes:jf(m)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let i=Ur();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=Ur();return this.indexManager.getCollectionParents(e,s).next(c=>x.forEach(c,l=>{let d=function(v,b){return new Ft(b,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(m=>{m.forEach((v,b)=>{a=a.insert(v,b)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,d)=>{let m=d.getKey();a.get(m)===null&&(a=a.insert(m,Ue.newInvalidDocument(m)))});let c=Ur();return a.forEach((l,d)=>{let m=s.get(l);m!==void 0&&zr(m.mutation,d,ze.empty(),pe.now()),io(t,d)&&(c=c.insert(l,d))}),c})}};var Yc=class{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return x.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Fe(i.createTime)}}(t)),x.resolve()}getNamedQuery(e,t){return x.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,function(i){return{name:i.name,query:Fv(i.bundledQuery),readTime:Fe(i.readTime)}}(t)),x.resolve()}};var Jc=class{constructor(){this.overlays=new ce(F.comparator),this.hr=new Map}getOverlay(e,t){return x.resolve(this.overlays.get(t))}getOverlays(e,t){let r=on();return x.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),x.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.hr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.hr.delete(r)),x.resolve()}getOverlaysForCollection(e,t,r){let i=on(),s=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){let l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return x.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ce((d,m)=>d-m),a=this.overlays.getIterator();for(;a.hasNext();){let d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let m=s.get(d.largestBatchId);m===null&&(m=on(),s=s.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}let c=on(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,m)=>c.set(d,m)),!(c.size()>=i)););return x.resolve(c)}ht(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.hr.get(i.largestBatchId).delete(r.key);this.hr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Vc(t,r));let s=this.hr.get(t);s===void 0&&(s=W(),this.hr.set(t,s)),this.hr.set(t,s.add(r.key))}};var Zr=class{constructor(){this.Pr=new Ae(le.Ir),this.Tr=new Ae(le.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new le(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ar(new le(e,t))}Rr(e,t){e.forEach(r=>this.removeReference(r,t))}Vr(e){let t=new F(new ie([])),r=new le(t,e),i=new le(t,e+1),s=[];return this.Tr.forEachInRange([r,i],a=>{this.Ar(a),s.push(a.key)}),s}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new F(new ie([])),r=new le(t,e),i=new le(t,e+1),s=W();return this.Tr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new le(e,0),r=this.Pr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},le=class{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return F.comparator(e.key,t.key)||J(e.pr,t.pr)}static Er(e,t){return J(e.pr,t.pr)||F.comparator(e.key,t.key)}};var $c=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new Ae(le.Ir)}checkEmpty(e){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new Nc(s,t,r,i);this.mutationQueue.push(a);for(let c of i)this.wr=this.wr.add(new le(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return x.resolve(a)}lookupMutationBatch(e,t){return x.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.br(r),s=i<0?0:i;return x.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?-1:this.yr-1)}getAllMutationBatches(e){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new le(t,0),i=new le(t,Number.POSITIVE_INFINITY),s=[];return this.wr.forEachInRange([r,i],a=>{let c=this.Sr(a.pr);s.push(c)}),x.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ae(J);return t.forEach(i=>{let s=new le(i,0),a=new le(i,Number.POSITIVE_INFINITY);this.wr.forEachInRange([s,a],c=>{r=r.add(c.pr)})}),x.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;F.isDocumentKey(s)||(s=s.child(""));let a=new le(new F(s),0),c=new Ae(J);return this.wr.forEachWhile(l=>{let d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.pr)),!0)},a),x.resolve(this.Dr(c))}Dr(e){let t=[];return e.forEach(r=>{let i=this.Sr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){$(this.Cr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.wr;return x.forEach(t.mutations,i=>{let s=new le(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new le(t,0),i=this.wr.firstAfterOrEqual(r);return x.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,x.resolve()}Cr(e,t){return this.br(e)}br(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Xc=class{constructor(e){this.vr=e,this.docs=function(){return new ce(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return x.resolve(r?r.document.mutableCopy():Ue.newInvalidDocument(t))}getEntries(e,t){let r=_t();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ue.newInvalidDocument(i))}),x.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=_t(),a=t.path,c=new F(a.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:d,value:{document:m}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Y_(Q_(m),r)<=0||(i.has(m.key)||io(t,m))&&(s=s.insert(m.key,m.mutableCopy()))}return x.resolve(s)}getAllFromCollectionGroup(e,t,r,i){U()}Fr(e,t){return x.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Zc(this)}getSize(e){return x.resolve(this.size)}},Zc=class extends Wc{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ar.addEntry(e,i)):this.ar.removeEntry(r)}),x.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}};var eu=class{constructor(e){this.persistence=e,this.Mr=new Ut(t=>Xu(t),Zu),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.Or=0,this.Nr=new Zr,this.targetCount=0,this.Lr=Xr.Nn()}forEachTarget(e,t){return this.Mr.forEach((r,i)=>t(i)),x.resolve()}getLastRemoteSnapshotVersion(e){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return x.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),x.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new Xr(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,x.resolve()}updateTargetData(e,t){return this.qn(t),x.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,x.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Mr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Mr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),x.waitFor(s).next(()=>i)}getTargetCount(e){return x.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return x.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),x.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),x.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),x.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return x.resolve(r)}containsKey(e,t){return x.resolve(this.Nr.containsKey(t))}};var tu=class{constructor(e,t){this.Br={},this.overlays={},this.kr=new Kr(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new eu(this),this.indexManager=new Gc,this.remoteDocumentCache=function(i){return new Xc(i)}(r=>this.referenceDelegate.Kr(r)),this.serializer=new zc(t),this.$r=new Yc(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Jc,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Br[e.toKey()];return r||(r=new $c(t,this.referenceDelegate),this.Br[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);let i=new nu(this.kr.next());return this.referenceDelegate.Ur(),r(i).next(s=>this.referenceDelegate.Wr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Gr(e,t){return x.or(Object.values(this.Br).map(r=>()=>r.containsKey(e,t)))}},nu=class extends yc{constructor(e){super(),this.currentSequenceNumber=e}},ru=class n{constructor(e){this.persistence=e,this.zr=new Zr,this.jr=null}static Hr(e){return new n(e)}get Jr(){if(this.jr)return this.jr;throw U()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),x.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),x.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),x.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(i=>this.Jr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Jr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.Jr,r=>{let i=F.fromPath(r);return this.Yr(e,i).next(s=>{s||t.removeEntry(i,B.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(r=>{r?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return x.or([()=>x.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}};var iu=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=i}static Ki(e,t){let r=W(),i=W();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var su=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var ou=class{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=function(){return Oh()?8:$_(de())>0?6:4}()}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ji(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Hi(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new su;return this.Ji(e,t,a).next(c=>{if(s.result=c,this.Ui)return this.Yi(e,t,a,c.size)})}).next(()=>s.result)}Yi(e,t,r,i){return r.documentReadCount<this.Wi?(Fr()<=K.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Dn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),x.resolve()):(Fr()<=K.DEBUG&&L("QueryEngine","Query:",Dn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Gi*i?(Fr()<=K.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Dn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,it(t))):x.resolve())}ji(e,t){if(of(t))return x.resolve(null);let r=it(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Ds(t,null,"F"),r=it(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=W(...s);return this.zi.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{let d=this.Zi(t,c);return this.Xi(t,d,a,l.readTime)?this.ji(e,Ds(t,null,"F")):this.es(e,d,t,l)}))})))}Hi(e,t,r,i){return of(t)||i.isEqual(B.min())?x.resolve(null):this.zi.getDocuments(e,r).next(s=>{let a=this.Zi(t,s);return this.Xi(t,a,r,i)?x.resolve(null):(Fr()<=K.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Dn(t)),this.es(e,a,t,H_(i,-1)).next(c=>c))})}Zi(e,t){let r=new Ae(Bf(e));return t.forEach((i,s)=>{io(e,s)&&(r=r.add(s))}),r}Xi(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ji(e,t,r){return Fr()<=K.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Dn(t)),this.zi.getDocumentsMatchingQuery(e,t,un.min(),r)}es(e,t,r,i){return this.zi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var au=class{constructor(e,t,r,i){this.persistence=e,this.ts=t,this.serializer=i,this.ns=new ce(J),this.rs=new Ut(s=>Xu(s),Zu),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Qc(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}};function Uv(n,e,t,r){return new au(n,e,t,r)}async function cp(n,e){let t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t._s(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],c=[],l=W();for(let d of i){a.push(d.batchId);for(let m of d.mutations)l=l.add(m.key)}for(let d of s){c.push(d.batchId);for(let m of d.mutations)l=l.add(m.key)}return t.localDocuments.getDocuments(r,l).next(d=>({us:d,removedBatchIds:a,addedBatchIds:c}))})})}function Bv(n,e){let t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.os.newChangeBuffer({trackRemovals:!0});return function(c,l,d,m){let v=d.batch,b=v.keys(),R=x.resolve();return b.forEach(D=>{R=R.next(()=>m.getEntry(l,D)).next(V=>{let k=d.docVersions.get(D);$(k!==null),V.version.compareTo(k)<0&&(v.applyToRemoteDocument(V,d),V.isValidDocument()&&(V.setReadTime(d.commitVersion),m.addEntry(V)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(l,v))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=W();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function up(n){let e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}function qv(n,e){let t=q(n),r=e.snapshotVersion,i=t.ns;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.os.newChangeBuffer({trackRemovals:!0});i=t.ns;let c=[];e.targetChanges.forEach((m,v)=>{let b=i.get(v);if(!b)return;c.push(t.Qr.removeMatchingKeys(s,m.removedDocuments,v).next(()=>t.Qr.addMatchingKeys(s,m.addedDocuments,v)));let R=b.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(v)!==null?R=R.withResumeToken(xe.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):m.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(m.resumeToken,r)),i=i.insert(v,R),function(V,k,j){return V.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(b,R,m)&&c.push(t.Qr.updateTargetData(s,R))});let l=_t(),d=W();if(e.documentUpdates.forEach(m=>{e.resolvedLimboDocuments.has(m)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,m))}),c.push(jv(s,a,e.documentUpdates).next(m=>{l=m.cs,d=m.ls})),!r.isEqual(B.min())){let m=t.Qr.getLastRemoteSnapshotVersion(s).next(v=>t.Qr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(m)}return x.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.ns=i,s))}function jv(n,e,t){let r=W(),i=W();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=_t();return t.forEach((c,l)=>{let d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(B.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):L("LocalStore","Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{cs:a,ls:i}})}function zv(n,e){let t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Gv(n,e){let t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Qr.getTargetData(r,e).next(s=>s?(i=s,x.resolve(i)):t.Qr.allocateTargetId(r).next(a=>(i=new $r(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Qr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.ns.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ns=t.ns.insert(r.targetId,r),t.rs.set(e,r.targetId)),r})}async function cu(n,e,t){let r=q(n),i=r.ns.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!ai(a))throw a;L("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.ns=r.ns.remove(e),r.rs.delete(i.target)}function yf(n,e,t){let r=q(n),i=B.min(),s=W();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,m){let v=q(l),b=v.rs.get(m);return b!==void 0?x.resolve(v.ns.get(b)):v.Qr.getTargetData(d,m)}(r,a,it(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Qr.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>r.ts.getDocumentsMatchingQuery(a,e,t?i:B.min(),t?s:W())).next(c=>(Kv(r,av(e),c),{documents:c,hs:s})))}function Kv(n,e,t){let r=n.ss.get(e)||B.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.ss.set(e,r)}var qs=class{constructor(){this.activeTargetIds=fv()}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var uu=class{constructor(){this.no=new qs,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new qs,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var lu=class{io(e){}shutdown(){}};var js=class{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){L("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.uo)e(0)}ao(){L("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.uo)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Es=null;function oc(){return Es===null?Es=function(){return 268435456+Math.round(2147483648*Math.random())}():Es++,"0x"+Es.toString(16)}var Wv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var hu=class{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}Ao(e){this.Ro=e}onMessage(e){this.Vo=e}close(){this.ho()}send(e){this.lo(e)}mo(){this.Io()}fo(){this.Eo()}po(e){this.Ro(e)}yo(e){this.Vo(e)}};var be="WebChannelConnection",du=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.wo=r+"://"+t.host,this.So=`projects/${i}/databases/${s}`,this.bo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Do(){return!1}Co(t,r,i,s,a){let c=oc(),l=this.vo(t,r.toUriEncodedString());L("RestConnection",`Sending RPC '${t}' ${c}:`,l,i);let d={"google-cloud-resource-prefix":this.So,"x-goog-request-params":this.bo};return this.Fo(d,s,a),this.Mo(t,l,d,i).then(m=>(L("RestConnection",`Received RPC '${t}' ${c}: `,m),m),m=>{throw Fn("RestConnection",`RPC '${t}' ${c} failed with error: `,m,"url: ",l,"request:",i),m})}xo(t,r,i,s,a,c){return this.Co(t,r,i,s,a)}Fo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Jn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>t[a]=s),i&&i.headers.forEach((s,a)=>t[a]=s)}vo(t,r){let i=Wv[t];return`${this.wo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Mo(e,t,r,i){let s=oc();return new Promise((a,c)=>{let l=new ec;l.setWithCredentials(!0),l.listenOnce(nc.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Mr.NO_ERROR:let m=l.getResponseJson();L(be,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(m)),a(m);break;case Mr.TIMEOUT:L(be,`RPC '${e}' ${s} timed out`),c(new O(P.DEADLINE_EXCEEDED,"Request time out"));break;case Mr.HTTP_ERROR:let v=l.getStatus();if(L(be,`RPC '${e}' ${s} failed with status:`,v,"response text:",l.getResponseText()),v>0){let b=l.getResponseJson();Array.isArray(b)&&(b=b[0]);let R=b==null?void 0:b.error;if(R&&R.status&&R.message){let D=function(k){let j=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(j)>=0?j:P.UNKNOWN}(R.status);c(new O(D,R.message))}else c(new O(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new O(P.UNAVAILABLE,"Connection failed."));break;default:U()}}finally{L(be,`RPC '${e}' ${s} completed.`)}});let d=JSON.stringify(i);L(be,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",d,r,15)})}Oo(e,t,r){let i=oc(),s=[this.wo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=sc(),c=ic(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.xmlHttpFactory=new tc({})),this.Fo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let m=s.join("");L(be,`Creating RPC '${e}' stream ${i}: ${m}`,l);let v=a.createWebChannel(m,l),b=!1,R=!1,D=new hu({lo:k=>{R?L(be,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(b||(L(be,`Opening RPC '${e}' stream ${i} transport.`),v.open(),b=!0),L(be,`RPC '${e}' stream ${i} sending:`,k),v.send(k))},ho:()=>v.close()}),V=(k,j,G)=>{k.listen(j,z=>{try{G(z)}catch(te){setTimeout(()=>{throw te},0)}})};return V(v,xn.EventType.OPEN,()=>{R||(L(be,`RPC '${e}' stream ${i} transport opened.`),D.mo())}),V(v,xn.EventType.CLOSE,()=>{R||(R=!0,L(be,`RPC '${e}' stream ${i} transport closed`),D.po())}),V(v,xn.EventType.ERROR,k=>{R||(R=!0,Fn(be,`RPC '${e}' stream ${i} transport errored:`,k),D.po(new O(P.UNAVAILABLE,"The operation could not be completed")))}),V(v,xn.EventType.MESSAGE,k=>{var j;if(!R){let G=k.data[0];$(!!G);let z=G,te=z.error||((j=z[0])===null||j===void 0?void 0:j.error);if(te){L(be,`RPC '${e}' stream ${i} received error:`,te);let Pe=te.status,Z=function(_){let w=ue[_];if(w!==void 0)return Zf(w)}(Pe),I=te.message;Z===void 0&&(Z=P.INTERNAL,I="Unknown error status: "+Pe+" with message "+te.message),R=!0,D.po(new O(Z,I)),v.close()}else L(be,`RPC '${e}' stream ${i} received:`,G),D.yo(G)}}),V(c,rc.STAT_EVENT,k=>{k.stat===ws.PROXY?L(be,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===ws.NOPROXY&&L(be,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.fo()},0),D}};function ac(){return typeof document!="undefined"?document:null}function so(n){return new Uc(n,!0)}var ei=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.oi=e,this.timerId=t,this.No=r,this.Lo=i,this.Bo=s,this.ko=0,this.qo=null,this.Qo=Date.now(),this.reset()}reset(){this.ko=0}Ko(){this.ko=this.Bo}$o(e){this.cancel();let t=Math.floor(this.ko+this.Uo()),r=Math.max(0,Date.now()-this.Qo),i=Math.max(0,t-r);i>0&&L("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.qo=this.oi.enqueueAfterDelay(this.timerId,i,()=>(this.Qo=Date.now(),e())),this.ko*=this.Lo,this.ko<this.No&&(this.ko=this.No),this.ko>this.Bo&&(this.ko=this.Bo)}Wo(){this.qo!==null&&(this.qo.skipDelay(),this.qo=null)}cancel(){this.qo!==null&&(this.qo.cancel(),this.qo=null)}Uo(){return(Math.random()-.5)*this.ko}};var zs=class{constructor(e,t,r,i,s,a,c,l){this.oi=e,this.Go=r,this.zo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.jo=0,this.Ho=null,this.Jo=null,this.stream=null,this.Yo=new ei(e,t)}Zo(){return this.state===1||this.state===5||this.Xo()}Xo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.e_()}async stop(){this.Zo()&&await this.close(0)}t_(){this.state=0,this.Yo.reset()}n_(){this.Xo()&&this.Ho===null&&(this.Ho=this.oi.enqueueAfterDelay(this.Go,6e4,()=>this.r_()))}i_(e){this.s_(),this.stream.send(e)}async r_(){if(this.Xo())return this.close(0)}s_(){this.Ho&&(this.Ho.cancel(),this.Ho=null)}o_(){this.Jo&&(this.Jo.cancel(),this.Jo=null)}async close(e,t){this.s_(),this.o_(),this.Yo.cancel(),this.jo++,e!==4?this.Yo.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(gt(t.toString()),gt("Using maximum backoff delay to prevent overloading the backend."),this.Yo.Ko()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.__(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ao(t)}__(){}auth(){this.state=1;let e=this.a_(this.jo),t=this.jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.jo===t&&this.u_(r,i)},r=>{e(()=>{let i=new O(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.c_(i)})})}u_(e,t){let r=this.a_(this.jo);this.stream=this.l_(e,t),this.stream.Po(()=>{r(()=>this.listener.Po())}),this.stream.To(()=>{r(()=>(this.state=2,this.Jo=this.oi.enqueueAfterDelay(this.zo,1e4,()=>(this.Xo()&&(this.state=3),Promise.resolve())),this.listener.To()))}),this.stream.Ao(i=>{r(()=>this.c_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}e_(){this.state=5,this.Yo.$o(async()=>{this.state=0,this.start()})}c_(e){return L("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}a_(e){return t=>{this.oi.enqueueAndForget(()=>this.jo===e?t():(L("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},fu=class extends zs{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}l_(e,t){return this.connection.Oo("Listen",e,t)}onMessage(e){this.Yo.reset();let t=Pv(this.serializer,e),r=function(s){if(!("targetChange"in s))return B.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?Fe(a.readTime):B.min()}(e);return this.listener.h_(t,r)}P_(e){let t={};t.database=jc(this.serializer),t.addTarget=function(s,a){let c,l=a.target;if(c=kc(l)?{documents:kv(s,l)}:{query:xv(s,l)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=ep(s,a.resumeToken);let d=Bc(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(B.min())>0){c.readTime=Fs(s,a.snapshotVersion.toTimestamp());let d=Bc(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);let r=Nv(this.serializer,e);r&&(t.labels=r),this.i_(t)}I_(e){let t={};t.database=jc(this.serializer),t.removeTarget=e,this.i_(t)}},pu=class extends zs{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s,this.T_=!1}get E_(){return this.T_}start(){this.T_=!1,this.lastStreamToken=void 0,super.start()}__(){this.T_&&this.d_([])}l_(e,t){return this.connection.Oo("Write",e,t)}onMessage(e){if($(!!e.streamToken),this.lastStreamToken=e.streamToken,this.T_){this.Yo.reset();let t=Cv(e.writeResults,e.commitTime),r=Fe(e.commitTime);return this.listener.A_(r,t)}return $(!e.writeResults||e.writeResults.length===0),this.T_=!0,this.listener.R_()}V_(){let e={};e.database=jc(this.serializer),this.i_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>ip(this.serializer,r))};this.i_(t)}};var mu=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.m_=!1}f_(){if(this.m_)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}Co(e,t,r,i){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Co(e,qc(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new O(P.UNKNOWN,s.toString())})}xo(e,t,r,i,s){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.xo(e,qc(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(P.UNKNOWN,a.toString())})}terminate(){this.m_=!0,this.connection.terminate()}},gu=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.g_=0,this.p_=null,this.y_=!0}w_(){this.g_===0&&(this.S_("Unknown"),this.p_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.p_=null,this.b_("Backend didn't respond within 10 seconds."),this.S_("Offline"),Promise.resolve())))}D_(e){this.state==="Online"?this.S_("Unknown"):(this.g_++,this.g_>=1&&(this.C_(),this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.S_("Offline")))}set(e){this.C_(),this.g_=0,e==="Online"&&(this.y_=!1),this.S_(e)}S_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}b_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.y_?(gt(t),this.y_=!1):L("OnlineStateTracker",t)}C_(){this.p_!==null&&(this.p_.cancel(),this.p_=null)}};var yu=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.v_=[],this.F_=new Map,this.M_=new Set,this.x_=[],this.O_=s,this.O_.io(a=>{r.enqueueAndForget(async()=>{gn(this)&&(L("RemoteStore","Restarting streams for network reachability change."),await async function(l){let d=q(l);d.M_.add(4),await ui(d),d.N_.set("Unknown"),d.M_.delete(4),await oo(d)}(this))})}),this.N_=new gu(r,i)}};async function oo(n){if(gn(n))for(let e of n.x_)await e(!0)}async function ui(n){for(let e of n.x_)await e(!1)}function lp(n,e){let t=q(n);t.F_.has(e.targetId)||(t.F_.set(e.targetId,e),sl(t)?il(t):$n(t).Xo()&&rl(t,e))}function nl(n,e){let t=q(n),r=$n(t);t.F_.delete(e),r.Xo()&&hp(t,e),t.F_.size===0&&(r.Xo()?r.n_():gn(t)&&t.N_.set("Unknown"))}function rl(n,e){if(n.L_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}$n(n).P_(e)}function hp(n,e){n.L_.xe(e),$n(n).I_(e)}function il(n){n.L_=new Fc({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.F_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),$n(n).start(),n.N_.w_()}function sl(n){return gn(n)&&!$n(n).Zo()&&n.F_.size>0}function gn(n){return q(n).M_.size===0}function dp(n){n.L_=void 0}async function Hv(n){n.N_.set("Online")}async function Qv(n){n.F_.forEach((e,t)=>{rl(n,e)})}async function Yv(n,e){dp(n),sl(n)?(n.N_.D_(e),il(n)):n.N_.set("Unknown")}async function Jv(n,e,t){if(n.N_.set("Online"),e instanceof Ls&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let c of s.targetIds)i.F_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.F_.delete(c),i.L_.removeTarget(c))}(n,e)}catch(r){L("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Gs(n,r)}else if(e instanceof Ln?n.L_.Ke(e):e instanceof Vs?n.L_.He(e):n.L_.We(e),!t.isEqual(B.min()))try{let r=await up(n.localStore);t.compareTo(r)>=0&&await function(s,a){let c=s.L_.rt(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){let m=s.F_.get(d);m&&s.F_.set(d,m.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{let m=s.F_.get(l);if(!m)return;s.F_.set(l,m.withResumeToken(xe.EMPTY_BYTE_STRING,m.snapshotVersion)),hp(s,l);let v=new $r(m.target,l,d,m.sequenceNumber);rl(s,v)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){L("RemoteStore","Failed to raise snapshot:",r),await Gs(n,r)}}async function Gs(n,e,t){if(!ai(e))throw e;n.M_.add(1),await ui(n),n.N_.set("Offline"),t||(t=()=>up(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L("RemoteStore","Retrying IndexedDB access"),await t(),n.M_.delete(1),await oo(n)})}function fp(n,e){return e().catch(t=>Gs(n,t,e))}async function ao(n){let e=q(n),t=jt(e),r=e.v_.length>0?e.v_[e.v_.length-1].batchId:-1;for(;$v(e);)try{let i=await zv(e.localStore,r);if(i===null){e.v_.length===0&&t.n_();break}r=i.batchId,Xv(e,i)}catch(i){await Gs(e,i)}pp(e)&&mp(e)}function $v(n){return gn(n)&&n.v_.length<10}function Xv(n,e){n.v_.push(e);let t=jt(n);t.Xo()&&t.E_&&t.d_(e.mutations)}function pp(n){return gn(n)&&!jt(n).Zo()&&n.v_.length>0}function mp(n){jt(n).start()}async function Zv(n){jt(n).V_()}async function ew(n){let e=jt(n);for(let t of n.v_)e.d_(t.mutations)}async function tw(n,e,t){let r=n.v_.shift(),i=Oc.from(r,e,t);await fp(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await ao(n)}async function nw(n,e){e&&jt(n).E_&&await async function(r,i){if(function(a){return Xf(a)&&a!==P.ABORTED}(i.code)){let s=r.v_.shift();jt(r).t_(),await fp(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await ao(r)}}(n,e),pp(n)&&mp(n)}async function _f(n,e){let t=q(n);t.asyncQueue.verifyOperationInProgress(),L("RemoteStore","RemoteStore received new credentials");let r=gn(t);t.M_.add(3),await ui(t),r&&t.N_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.M_.delete(3),await oo(t)}async function rw(n,e){let t=q(n);e?(t.M_.delete(2),await oo(t)):e||(t.M_.add(2),await ui(t),t.N_.set("Unknown"))}function $n(n){return n.B_||(n.B_=function(t,r,i){let s=q(t);return s.f_(),new fu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:Hv.bind(null,n),To:Qv.bind(null,n),Ao:Yv.bind(null,n),h_:Jv.bind(null,n)}),n.x_.push(async e=>{e?(n.B_.t_(),sl(n)?il(n):n.N_.set("Unknown")):(await n.B_.stop(),dp(n))})),n.B_}function jt(n){return n.k_||(n.k_=function(t,r,i){let s=q(t);return s.f_(),new pu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:()=>Promise.resolve(),To:Zv.bind(null,n),Ao:nw.bind(null,n),R_:ew.bind(null,n),A_:tw.bind(null,n)}),n.x_.push(async e=>{e?(n.k_.t_(),await ao(n)):(await n.k_.stop(),n.v_.length>0&&(L("RemoteStore",`Stopping write stream with ${n.v_.length} pending writes`),n.v_=[]))})),n.k_}var _u=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new nt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,c=new n(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function ol(n,e){if(gt("AsyncQueue",`${e}: ${n}`),ai(n))return new O(P.UNAVAILABLE,`${e}: ${n}`);throw n}var Ks=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=Ur(),this.sortedSet=new ce(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Ws=class{constructor(){this.q_=new ce(F.comparator)}track(e){let t=e.doc.key,r=this.q_.get(t);r?e.type!==0&&r.type===3?this.q_=this.q_.insert(t,e):e.type===3&&r.type!==1?this.q_=this.q_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.q_=this.q_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.q_=this.q_.remove(t):e.type===1&&r.type===2?this.q_=this.q_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):U():this.q_=this.q_.insert(t,e)}Q_(){let e=[];return this.q_.inorderTraversal((t,r)=>{e.push(r)}),e}},Wn=class n{constructor(e,t,r,i,s,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new n(e,t,Ks.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ro(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var vu=class{constructor(){this.K_=void 0,this.U_=[]}W_(){return this.U_.some(e=>e.G_())}},wu=class{constructor(){this.queries=new Ut(e=>Uf(e),ro),this.onlineState="Unknown",this.z_=new Set}};async function iw(n,e){let t=q(n),r=3,i=e.query,s=t.queries.get(i);s?!s.W_()&&e.G_()&&(r=2):(s=new vu,r=e.G_()?0:1);try{switch(r){case 0:s.K_=await t.onListen(i,!0);break;case 1:s.K_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let c=ol(a,`Initialization of query '${Dn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.U_.push(e),e.j_(t.onlineState),s.K_&&e.H_(s.K_)&&al(t)}async function sw(n,e){let t=q(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.U_.indexOf(e);a>=0&&(s.U_.splice(a,1),s.U_.length===0?i=e.G_()?0:1:!s.W_()&&e.G_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function ow(n,e){let t=q(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let c of a.U_)c.H_(i)&&(r=!0);a.K_=i}}r&&al(t)}function aw(n,e,t){let r=q(n),i=r.queries.get(e);if(i)for(let s of i.U_)s.onError(t);r.queries.delete(e)}function al(n){n.z_.forEach(e=>{e.next()})}var Iu,vf;(vf=Iu||(Iu={})).J_="default",vf.Cache="cache";var Eu=class{constructor(e,t,r){this.query=e,this.Y_=t,this.Z_=!1,this.X_=null,this.onlineState="Unknown",this.options=r||{}}H_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Wn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Z_?this.ea(e)&&(this.Y_.next(e),t=!0):this.ta(e,this.onlineState)&&(this.na(e),t=!0),this.X_=e,t}onError(e){this.Y_.error(e)}j_(e){this.onlineState=e;let t=!1;return this.X_&&!this.Z_&&this.ta(this.X_,e)&&(this.na(this.X_),t=!0),t}ta(e,t){if(!e.fromCache||!this.G_())return!0;let r=t!=="Offline";return(!this.options.ra||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ea(e){if(e.docChanges.length>0)return!0;let t=this.X_&&this.X_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}na(e){e=Wn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Z_=!0,this.Y_.next(e)}G_(){return this.options.source!==Iu.Cache}};var Hs=class{constructor(e){this.key=e}},Qs=class{constructor(e){this.key=e}},Tu=class{constructor(e,t){this.query=e,this.la=t,this.ha=null,this.hasCachedResults=!1,this.current=!1,this.Pa=W(),this.mutatedKeys=W(),this.Ia=Bf(e),this.Ta=new Ks(this.Ia)}get Ea(){return this.la}da(e,t){let r=t?t.Aa:new Ws,i=t?t.Ta:this.Ta,s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((m,v)=>{let b=i.get(m),R=io(this.query,v)?v:null,D=!!b&&this.mutatedKeys.has(b.key),V=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations),k=!1;b&&R?b.data.isEqual(R.data)?D!==V&&(r.track({type:3,doc:R}),k=!0):this.Ra(b,R)||(r.track({type:2,doc:R}),k=!0,(l&&this.Ia(R,l)>0||d&&this.Ia(R,d)<0)&&(c=!0)):!b&&R?(r.track({type:0,doc:R}),k=!0):b&&!R&&(r.track({type:1,doc:b}),k=!0,(l||d)&&(c=!0)),k&&(R?(a=a.add(R),s=V?s.add(m):s.delete(m)):(a=a.delete(m),s=s.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),s=s.delete(m.key),r.track({type:1,doc:m})}return{Ta:a,Aa:r,Xi:c,mutatedKeys:s}}Ra(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.Ta;this.Ta=e.Ta,this.mutatedKeys=e.mutatedKeys;let a=e.Aa.Q_();a.sort((m,v)=>function(R,D){let V=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U()}};return V(R)-V(D)}(m.type,v.type)||this.Ia(m.doc,v.doc)),this.Va(r),i=i!=null&&i;let c=t&&!i?this.ma():[],l=this.Pa.size===0&&this.current&&!i?1:0,d=l!==this.ha;return this.ha=l,a.length!==0||d?{snapshot:new Wn(this.query,e.Ta,s,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),fa:c}:{fa:c}}j_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ta:this.Ta,Aa:new Ws,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{fa:[]}}ga(e){return!this.la.has(e)&&!!this.Ta.has(e)&&!this.Ta.get(e).hasLocalMutations}Va(e){e&&(e.addedDocuments.forEach(t=>this.la=this.la.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.la=this.la.delete(t)),this.current=e.current)}ma(){if(!this.current)return[];let e=this.Pa;this.Pa=W(),this.Ta.forEach(r=>{this.ga(r.key)&&(this.Pa=this.Pa.add(r.key))});let t=[];return e.forEach(r=>{this.Pa.has(r)||t.push(new Qs(r))}),this.Pa.forEach(r=>{e.has(r)||t.push(new Hs(r))}),t}pa(e){this.la=e.hs,this.Pa=W();let t=this.da(e.documents);return this.applyChanges(t,!0)}ya(){return Wn.fromInitialDocuments(this.query,this.Ta,this.mutatedKeys,this.ha===0,this.hasCachedResults)}},bu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Au=class{constructor(e){this.key=e,this.wa=!1}},Su=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Sa={},this.ba=new Ut(c=>Uf(c),ro),this.Da=new Map,this.Ca=new Set,this.va=new ce(F.comparator),this.Fa=new Map,this.Ma=new Zr,this.xa={},this.Oa=new Map,this.Na=Xr.Ln(),this.onlineState="Unknown",this.La=void 0}get isPrimaryClient(){return this.La===!0}};async function cw(n,e,t=!0){let r=Ip(n),i,s=r.ba.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.ya()):i=await gp(r,e,t,!0),i}async function uw(n,e){let t=Ip(n);await gp(t,e,!0,!1)}async function gp(n,e,t,r){let i=await Gv(n.localStore,it(e)),s=i.targetId,a=t?n.sharedClientState.addLocalQueryTarget(s):"not-current",c;return r&&(c=await lw(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&lp(n.remoteStore,i),c}async function lw(n,e,t,r,i){n.Ba=(v,b,R)=>async function(V,k,j,G){let z=k.view.da(j);z.Xi&&(z=await yf(V.localStore,k.query,!1).then(({documents:I})=>k.view.da(I,z)));let te=G&&G.targetChanges.get(k.targetId),Pe=G&&G.targetMismatches.get(k.targetId)!=null,Z=k.view.applyChanges(z,V.isPrimaryClient,te,Pe);return If(V,k.targetId,Z.fa),Z.snapshot}(n,v,b,R);let s=await yf(n.localStore,e,!0),a=new Tu(e,s.hs),c=a.da(s.documents),l=Jr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,l);If(n,t,d.fa);let m=new bu(e,t,a);return n.ba.set(e,m),n.Da.has(t)?n.Da.get(t).push(e):n.Da.set(t,[e]),d.snapshot}async function hw(n,e,t){let r=q(n),i=r.ba.get(e),s=r.Da.get(i.targetId);if(s.length>1)return r.Da.set(i.targetId,s.filter(a=>!ro(a,e))),void r.ba.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await cu(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&nl(r.remoteStore,i.targetId),Ru(r,i.targetId)}).catch(oi)):(Ru(r,i.targetId),await cu(r.localStore,i.targetId,!0))}async function dw(n,e){let t=q(n),r=t.ba.get(e),i=t.Da.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),nl(t.remoteStore,r.targetId))}async function fw(n,e,t){let r=ww(n);try{let i=await function(a,c){let l=q(a),d=pe.now(),m=c.reduce((R,D)=>R.add(D.key),W()),v,b;return l.persistence.runTransaction("Locally write mutations","readwrite",R=>{let D=_t(),V=W();return l.os.getEntries(R,m).next(k=>{D=k,D.forEach((j,G)=>{G.isValidDocument()||(V=V.add(j))})}).next(()=>l.localDocuments.getOverlayedDocuments(R,D)).next(k=>{v=k;let j=[];for(let G of c){let z=vv(G,v.get(G.key).overlayedDocument);z!=null&&j.push(new ot(G.key,z,Df(z.value.mapValue),ge.exists(!0)))}return l.mutationQueue.addMutationBatch(R,d,j,c)}).next(k=>{b=k;let j=k.applyToLocalDocumentSet(v,V);return l.documentOverlayCache.saveOverlays(R,k.batchId,j)})}).then(()=>({batchId:b.batchId,changes:jf(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,l){let d=a.xa[a.currentUser.toKey()];d||(d=new ce(J)),d=d.insert(c,l),a.xa[a.currentUser.toKey()]=d}(r,i.batchId,t),await li(r,i.changes),await ao(r.remoteStore)}catch(i){let s=ol(i,"Failed to persist write");t.reject(s)}}async function yp(n,e){let t=q(n);try{let r=await qv(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Fa.get(s);a&&($(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.wa=!0:i.modifiedDocuments.size>0?$(a.wa):i.removedDocuments.size>0&&($(a.wa),a.wa=!1))}),await li(t,r,e)}catch(r){await oi(r)}}function wf(n,e,t){let r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.ba.forEach((s,a)=>{let c=a.view.j_(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){let l=q(a);l.onlineState=c;let d=!1;l.queries.forEach((m,v)=>{for(let b of v.U_)b.j_(c)&&(d=!0)}),d&&al(l)}(r.eventManager,e),i.length&&r.Sa.h_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function pw(n,e,t){let r=q(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Fa.get(e),s=i&&i.key;if(s){let a=new ce(F.comparator);a=a.insert(s,Ue.newNoDocument(s,B.min()));let c=W().add(s),l=new Os(B.min(),new Map,new ce(J),a,c);await yp(r,l),r.va=r.va.remove(s),r.Fa.delete(e),cl(r)}else await cu(r.localStore,e,!1).then(()=>Ru(r,e,t)).catch(oi)}async function mw(n,e){let t=q(n),r=e.batch.batchId;try{let i=await Bv(t.localStore,e);vp(t,r,null),_p(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await li(t,i)}catch(i){await oi(i)}}async function gw(n,e,t){let r=q(n);try{let i=await function(a,c){let l=q(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return l.mutationQueue.lookupMutationBatch(d,c).next(v=>($(v!==null),m=v.keys(),l.mutationQueue.removeMutationBatch(d,v))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,m,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>l.localDocuments.getDocuments(d,m))})}(r.localStore,e);vp(r,e,t),_p(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await li(r,i)}catch(i){await oi(i)}}function _p(n,e){(n.Oa.get(e)||[]).forEach(t=>{t.resolve()}),n.Oa.delete(e)}function vp(n,e,t){let r=q(n),i=r.xa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.xa[r.currentUser.toKey()]=i}}function Ru(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Da.get(e))n.ba.delete(r),t&&n.Sa.ka(r,t);n.Da.delete(e),n.isPrimaryClient&&n.Ma.Vr(e).forEach(r=>{n.Ma.containsKey(r)||wp(n,r)})}function wp(n,e){n.Ca.delete(e.path.canonicalString());let t=n.va.get(e);t!==null&&(nl(n.remoteStore,t),n.va=n.va.remove(e),n.Fa.delete(t),cl(n))}function If(n,e,t){for(let r of t)r instanceof Hs?(n.Ma.addReference(r.key,e),yw(n,r)):r instanceof Qs?(L("SyncEngine","Document no longer in limbo: "+r.key),n.Ma.removeReference(r.key,e),n.Ma.containsKey(r.key)||wp(n,r.key)):U()}function yw(n,e){let t=e.key,r=t.path.canonicalString();n.va.get(t)||n.Ca.has(r)||(L("SyncEngine","New document in limbo: "+t),n.Ca.add(r),cl(n))}function cl(n){for(;n.Ca.size>0&&n.va.size<n.maxConcurrentLimboResolutions;){let e=n.Ca.values().next().value;n.Ca.delete(e);let t=new F(ie.fromString(e)),r=n.Na.next();n.Fa.set(r,new Au(t)),n.va=n.va.insert(t,r),lp(n.remoteStore,new $r(it(el(t.path)),r,"TargetPurposeLimboResolution",Kr.oe))}}async function li(n,e,t){let r=q(n),i=[],s=[],a=[];r.ba.isEmpty()||(r.ba.forEach((c,l)=>{a.push(r.Ba(l,e,t).then(d=>{if((d||t)&&r.isPrimaryClient){let m=d&&!d.fromCache;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(d){i.push(d);let m=iu.Ki(l.targetId,d);s.push(m)}}))}),await Promise.all(a),r.Sa.h_(i),await async function(l,d){let m=q(l);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>x.forEach(d,b=>x.forEach(b.qi,R=>m.persistence.referenceDelegate.addReference(v,b.targetId,R)).next(()=>x.forEach(b.Qi,R=>m.persistence.referenceDelegate.removeReference(v,b.targetId,R)))))}catch(v){if(!ai(v))throw v;L("LocalStore","Failed to update sequence numbers: "+v)}for(let v of d){let b=v.targetId;if(!v.fromCache){let R=m.ns.get(b),D=R.snapshotVersion,V=R.withLastLimboFreeSnapshotVersion(D);m.ns=m.ns.insert(b,V)}}}(r.localStore,s))}async function _w(n,e){let t=q(n);if(!t.currentUser.isEqual(e)){L("SyncEngine","User change. New user:",e.toKey());let r=await cp(t.localStore,e);t.currentUser=e,function(s,a){s.Oa.forEach(c=>{c.forEach(l=>{l.reject(new O(P.CANCELLED,a))})}),s.Oa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await li(t,r.us)}}function vw(n,e){let t=q(n),r=t.Fa.get(e);if(r&&r.wa)return W().add(r.key);{let i=W(),s=t.Da.get(e);if(!s)return i;for(let a of s){let c=t.ba.get(a);i=i.unionWith(c.view.Ea)}return i}}function Ip(n){let e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=yp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=vw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=pw.bind(null,e),e.Sa.h_=ow.bind(null,e.eventManager),e.Sa.ka=aw.bind(null,e.eventManager),e}function ww(n){let e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=mw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=gw.bind(null,e),e}var Ys=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=so(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return Uv(this.persistence,new ou,e.initialUser,this.serializer)}createPersistence(e){return new tu(ru.Hr,this.serializer)}createSharedClientState(e){return new uu}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var Pu=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>wf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=_w.bind(null,this.syncEngine),await rw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new wu}()}createDatastore(e){let t=so(e.databaseInfo.databaseId),r=function(s){return new du(s)}(e.databaseInfo);return function(s,a,c,l){return new mu(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new yu(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>wf(this.syncEngine,t,0),function(){return js.D()?new js:new lu}())}createSyncEngine(e,t){return function(i,s,a,c,l,d,m){let v=new Su(i,s,a,c,l,d);return m&&(v.La=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(r){let i=q(r);L("RemoteStore","RemoteStore shutting down."),i.M_.add(5),await ui(i),i.O_.shutdown(),i.N_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate()}};var Cu=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ka(this.observer.next,e)}error(e){this.observer.error?this.Ka(this.observer.error,e):gt("Uncaught Error in snapshot listener:",e.toString())}$a(){this.muted=!0}Ka(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var ku=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new O(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(i,s){let a=q(i),c={documents:s.map(v=>Us(a.serializer,v))},l=await a.xo("BatchGetDocuments",a.serializer.databaseId,ie.emptyPath(),c,s.length),d=new Map;l.forEach(v=>{let b=Rv(a.serializer,v);d.set(b.key.toString(),b)});let m=[];return s.forEach(v=>{let b=d.get(v.toString());$(!!b),m.push(b)}),m}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new pn(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{let i=F.fromPath(r);this.mutations.push(new Ns(i,this.precondition(i)))}),await async function(r,i){let s=q(r),a={writes:i.map(c=>ip(s.serializer,c))};await s.Co("Commit",s.serializer.databaseId,ie.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw U();t=B.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new O(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(B.min())?ge.exists(!1):ge.updateTime(t):ge.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(B.min()))throw new O(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ge.updateTime(t)}return ge.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};var xu=class{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.Za=r.maxAttempts,this.Yo=new ei(this.asyncQueue,"transaction_retry")}Xa(){this.Za-=1,this.eu()}eu(){this.Yo.$o(async()=>{let e=new ku(this.datastore),t=this.tu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.nu(i)}))}).catch(r=>{this.nu(r)})})}tu(e){try{let t=this.updateFunction(e);return!ci(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}nu(e){this.Za>0&&this.ru(e)?(this.Za-=1,this.asyncQueue.enqueueAndForget(()=>(this.eu(),Promise.resolve()))):this.deferred.reject(e)}ru(e){if(e.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Xf(t)}return!1}};var Du=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=me.UNAUTHENTICATED,this.clientId=Ss.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{L("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(L("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new nt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=ol(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function cc(n,e){n.asyncQueue.verifyOperationInProgress(),L("FirestoreClient","Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await cp(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Ef(n,e){n.asyncQueue.verifyOperationInProgress();let t=await Ew(n);L("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>_f(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>_f(e.remoteStore,i)),n._onlineComponents=e}function Iw(n){return n.name==="FirebaseError"?n.code===P.FAILED_PRECONDITION||n.code===P.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function Ew(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L("FirestoreClient","Using user provided OfflineComponentProvider");try{await cc(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!Iw(t))throw t;Fn("Error using user provided cache. Falling back to memory cache: "+t),await cc(n,new Ys)}}else L("FirestoreClient","Using default OfflineComponentProvider"),await cc(n,new Ys);return n._offlineComponents}async function ul(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L("FirestoreClient","Using user provided OnlineComponentProvider"),await Ef(n,n._uninitializedComponentsProvider._online)):(L("FirestoreClient","Using default OnlineComponentProvider"),await Ef(n,new Pu))),n._onlineComponents}function Tw(n){return ul(n).then(e=>e.syncEngine)}function bw(n){return ul(n).then(e=>e.datastore)}async function Tf(n){let e=await ul(n),t=e.eventManager;return t.onListen=cw.bind(null,e.syncEngine),t.onUnlisten=hw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=uw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=dw.bind(null,e.syncEngine),t}function Ep(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var bf=new Map;function Tp(n,e,t){if(!t)throw new O(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Aw(n,e,t,r){if(e===!0&&r===!0)throw new O(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Af(n){if(!F.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Sf(n){if(F.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function co(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U()}function Ge(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=co(n);throw new O(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Sw(n,e){if(e<=0)throw new O(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}var Js=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new O(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Aw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ep((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Hn=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Js({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new O(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new O(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Js(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new uc;switch(r.type){case"firstParty":return new fc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=bf.get(t);r&&(L("ComponentProvider","Removing Datastore"),bf.delete(t),r.terminate())}(this),Promise.resolve()}};function ll(n,e,t,r={}){var i;let s=(n=Ge(n,Hn))._getSettings(),a=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&Fn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=me.MOCK_USER;else{c=Ch(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new O(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new me(d)}n._authCredentials=new lc(new As(c,l))}}var zt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Se=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},Lt=class n extends zt{constructor(e,t,r){super(e,t,el(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Se(this.firestore,null,new F(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Ke(n,e,...t){if(n=se(n),Tp("collection","path",e),n instanceof Hn){let r=ie.fromString(e,...t);return Sf(r),new Lt(n,null,r)}{if(!(n instanceof Se||n instanceof Lt))throw new O(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ie.fromString(e,...t));return Sf(r),new Lt(n.firestore,null,r)}}function Re(n,e,...t){if(n=se(n),arguments.length===1&&(e=Ss.newId()),Tp("doc","path",e),n instanceof Hn){let r=ie.fromString(e,...t);return Af(r),new Se(n,null,new F(r))}{if(!(n instanceof Se||n instanceof Lt))throw new O(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ie.fromString(e,...t));return Af(r),new Se(n.firestore,n instanceof Lt?n.converter:null,new F(r))}}var Nu=class{constructor(){this.iu=Promise.resolve(),this.su=[],this.ou=!1,this._u=[],this.au=null,this.uu=!1,this.cu=!1,this.lu=[],this.Yo=new ei(this,"async_queue_retry"),this.hu=()=>{let t=ac();t&&L("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Yo.Wo()};let e=ac();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.hu)}get isShuttingDown(){return this.ou}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.ou){this.ou=!0,this.cu=e||!1;let t=ac();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hu)}}enqueue(e){if(this.Pu(),this.ou)return new Promise(()=>{});let t=new nt;return this.Iu(()=>this.ou&&this.cu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.su.push(e),this.Tu()))}async Tu(){if(this.su.length!==0){try{await this.su[0](),this.su.shift(),this.Yo.reset()}catch(e){if(!ai(e))throw e;L("AsyncQueue","Operation failed with retryable error: "+e)}this.su.length>0&&this.Yo.$o(()=>this.Tu())}}Iu(e){let t=this.iu.then(()=>(this.uu=!0,e().catch(r=>{this.au=r,this.uu=!1;let i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw gt("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.uu=!1,r))));return this.iu=t,t}enqueueAfterDelay(e,t,r){this.Pu(),this.lu.indexOf(e)>-1&&(t=0);let i=_u.createAndSchedule(this,e,t,r,s=>this.Eu(s));return this._u.push(i),i}Pu(){this.au&&U()}verifyOperationInProgress(){}async du(){let e;do e=this.iu,await e;while(e!==this.iu)}Au(e){for(let t of this._u)if(t.timerId===e)return!0;return!1}Ru(e){return this.du().then(()=>{this._u.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this._u)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.du()})}Vu(e){this.lu.push(e)}Eu(e){let t=this._u.indexOf(e);this._u.splice(t,1)}};function Rf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var $e=class extends Hn{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new Nu}(),this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Ap(this),this._firestoreClient.terminate()}};function bp(n,e){let t=typeof n=="object"?n:Bi(),r=typeof n=="string"?n:e||"(default)",i=Tr(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=Ph("firestore");s&&ll(i,...s)}return i}function uo(n){return n._firestoreClient||Ap(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Ap(n){var e,t,r;let i=n._freezeSettings(),s=function(c,l,d,m){return new _c(c,l,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Ep(m.experimentalLongPollingOptions),m.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new Du(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var Qn=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(xe.fromBase64String(e))}catch(t){throw new O(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Gt=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Kt=class{constructor(e){this._methodName=e}};var ti=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}};var Rw=/^__.*__$/,Ou=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new ot(e,this.data,this.fieldMask,t,this.fieldTransforms):new fn(e,this.data,t,this.fieldTransforms)}},$s=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new ot(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Sp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U()}}var Xs=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.mu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get fu(){return this.settings.fu}gu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}pu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.wu(e),i}Su(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.mu(),i}bu(e){return this.gu({path:void 0,yu:!0})}Du(e){return eo(e,this.settings.methodName,this.settings.Cu||!1,this.path,this.settings.vu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}mu(){if(this.path)for(let e=0;e<this.path.length;e++)this.wu(this.path.get(e))}wu(e){if(e.length===0)throw this.Du("Document fields must not be empty");if(Sp(this.fu)&&Rw.test(e))throw this.Du('Document fields cannot begin and end with "__"')}},Vu=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||so(e)}Fu(e,t,r,i=!1){return new Xs({fu:e,methodName:t,vu:r,path:Me.emptyPath(),yu:!1,Cu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Xn(n){let e=n._freezeSettings(),t=so(n._databaseId);return new Vu(n._databaseId,!!e.ignoreUndefinedProperties,t)}function lo(n,e,t,r,i,s={}){let a=n.Fu(s.merge||s.mergeFields?2:0,e,t,i);fl("Data must be an object, but it was:",a,r);let c=Pp(r,a),l,d;if(s.merge)l=new ze(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){let m=[];for(let v of s.mergeFields){let b=Uu(e,v,t);if(!a.contains(b))throw new O(P.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);kp(m,b)||m.push(b)}l=new ze(m),d=a.fieldTransforms.filter(v=>l.covers(v.field))}else l=null,d=a.fieldTransforms;return new Ou(new Ne(c),l,d)}var Zs=class n extends Kt{_toFieldTransform(e){if(e.fu!==2)throw e.fu===1?e.Du(`${this._methodName}() can only appear at the top level of your update data`):e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function Rp(n,e,t){return new Xs({fu:3,vu:e.settings.vu,methodName:n._methodName,yu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}var Lu=class n extends Kt{_toFieldTransform(e){return new Yr(e.path,new dn)}isEqual(e){return e instanceof n}},Mu=class n extends Kt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=Rp(this,e,!0),r=this.Mu.map(s=>yn(s,t)),i=new Bt(r);return new Yr(e.path,i)}isEqual(e){return e instanceof n&&dt(this.Mu,e.Mu)}},Fu=class n extends Kt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=Rp(this,e,!0),r=this.Mu.map(s=>yn(s,t)),i=new qt(r);return new Yr(e.path,i)}isEqual(e){return e instanceof n&&dt(this.Mu,e.Mu)}};function hl(n,e,t,r){let i=n.Fu(1,e,t);fl("Data must be an object, but it was:",i,r);let s=[],a=Ne.empty();mn(r,(l,d)=>{let m=pl(e,l,t);d=se(d);let v=i.Su(m);if(d instanceof Zs)s.push(m);else{let b=yn(d,v);b!=null&&(s.push(m),a.set(m,b))}});let c=new ze(s);return new $s(a,c,i.fieldTransforms)}function dl(n,e,t,r,i,s){let a=n.Fu(1,e,t),c=[Uu(e,r,t)],l=[i];if(s.length%2!=0)throw new O(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let b=0;b<s.length;b+=2)c.push(Uu(e,s[b])),l.push(s[b+1]);let d=[],m=Ne.empty();for(let b=c.length-1;b>=0;--b)if(!kp(d,c[b])){let R=c[b],D=l[b];D=se(D);let V=a.Su(R);if(D instanceof Zs)d.push(R);else{let k=yn(D,V);k!=null&&(d.push(R),m.set(R,k))}}let v=new ze(d);return new $s(m,v,a.fieldTransforms)}function Pw(n,e,t,r=!1){return yn(t,n.Fu(r?4:3,e))}function yn(n,e){if(Cp(n=se(n)))return fl("Unsupported field value:",e,n),Pp(n,e);if(n instanceof Kt)return function(r,i){if(!Sp(i.fu))throw i.Du(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Du(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.yu&&e.fu!==4)throw e.Du("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let c of r){let l=yn(c,i.bu(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return pv(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=pe.fromDate(r);return{timestampValue:Fs(i.serializer,s)}}if(r instanceof pe){let s=new pe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Fs(i.serializer,s)}}if(r instanceof ti)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Qn)return{bytesValue:ep(i.serializer,r._byteString)};if(r instanceof Se){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Du(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:tl(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Du(`Unsupported field value: ${co(r)}`)}(n,e)}function Pp(n,e){let t={};return kf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):mn(n,(r,i)=>{let s=yn(i,e.pu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Cp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof pe||n instanceof ti||n instanceof Qn||n instanceof Se||n instanceof Kt)}function fl(n,e,t){if(!Cp(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=co(t);throw r==="an object"?e.Du(n+" a custom object"):e.Du(n+" "+r)}}function Uu(n,e,t){if((e=se(e))instanceof Gt)return e._internalPath;if(typeof e=="string")return pl(n,e);throw eo("Field path arguments must be of type string or ",n,!1,void 0,t)}var Cw=new RegExp("[~\\*/\\[\\]]");function pl(n,e,t){if(e.search(Cw)>=0)throw eo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Gt(...e.split("."))._internalPath}catch{throw eo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function eo(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new O(P.INVALID_ARGUMENT,c+n+l)}function kp(n,e){return n.some(t=>t.isEqual(e))}var Yn=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Bu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(ho("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Bu=class extends Yn{data(){return super.data()}};function ho(n,e){return typeof e=="string"?pl(n,e):e instanceof Gt?e._internalPath:e._delegate._internalPath}function kw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var ni=class{},ri=class extends ni{};function fo(n,e,...t){let r=[];e instanceof ni&&r.push(e),r=r.concat(t),function(s){let a=s.filter(l=>l instanceof qu).length,c=s.filter(l=>l instanceof to).length;if(a>1||a>0&&c>0)throw new O(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var to=class n extends ri{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return Dp(e._query,t),new zt(e.firestore,e.converter,xc(e._query,t))}_parse(e){let t=Xn(e.firestore);return function(s,a,c,l,d,m,v){let b;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new O(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Cf(v,m);let R=[];for(let D of v)R.push(Pf(l,s,D));b={arrayValue:{values:R}}}else b=Pf(l,s,v)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Cf(v,m),b=Pw(c,a,v,m==="in"||m==="not-in");return he.create(d,m,b)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function xp(n,e,t){let r=e,i=ho("where",n);return to._create(i,r,t)}var qu=class n extends ni{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Je.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i,c=s.getFlattenedFilters();for(let l of c)Dp(a,l),a=xc(a,l)}(e._query,t),new zt(e.firestore,e.converter,xc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var ju=class n extends ri{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,a){if(i.startAt!==null)throw new O(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new O(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new hn(s,a)}(e._query,this._field,this._direction);return new zt(e.firestore,e.converter,function(i,s){let a=i.explicitOrderBy.concat([s]);return new Ft(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function po(n,e="asc"){let t=e,r=ho("orderBy",n);return ju._create(r,t)}var zu=class n extends ri{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new zt(e.firestore,e.converter,Ds(e._query,this._limit,this._limitType))}};function mo(n){return Sw("limit",n),zu._create("limit",n,"F")}function Pf(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new O(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ff(e)&&t.indexOf("/")!==-1)throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(ie.fromString(t));if(!F.isDocumentKey(r))throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Zd(n,new F(r))}if(t instanceof Se)return Zd(n,t._key);throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${co(t)}.`)}function Cf(n,e){if(!Array.isArray(n)||n.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Dp(n,e){let t=function(i,s){for(let a of i)for(let c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new O(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new O(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var no=class{convertValue(e,t="none"){switch(ln(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Mt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw U()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return mn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new ti(ae(e.latitude),ae(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Ju(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Hr(e));default:return null}}convertTimestamp(e){let t=yt(e);return new pe(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=ie.fromString(e);$(ap(r));let i=new ks(r.get(1),r.get(3)),s=new F(r.popFirst(5));return i.isEqual(t)||gt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function go(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Gu=class extends no{constructor(e){super(),this.firestore=e}convertBytes(e){return new Qn(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}};var Vt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},ii=class extends Yn{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Mn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(ho("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},Mn=class extends ii{data(e={}){return super.data(e)}},Ku=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Vt(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Mn(this._firestore,this._userDataWriter,r.key,r,new Vt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{let l=new Mn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Vt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let l=new Mn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Vt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),d=-1,m=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),m=a.indexOf(c.doc.key)),{type:xw(c.type),doc:l,oldIndex:d,newIndex:m}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function xw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U()}}var si=class extends no{constructor(e){super(),this.firestore=e}convertBytes(e){return new Qn(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}};function hi(n,e,t){n=Ge(n,Se);let r=Ge(n.firestore,$e),i=go(n.converter,e,t);return pi(r,[lo(Xn(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,ge.none())])}function ml(n,e,t,...r){n=Ge(n,Se);let i=Ge(n.firestore,$e),s=Xn(i),a;return a=typeof(e=se(e))=="string"||e instanceof Gt?dl(s,"updateDoc",n._key,e,t,r):hl(s,"updateDoc",n._key,e),pi(i,[a.toMutation(n._key,ge.exists(!0))])}function di(n){return pi(Ge(n.firestore,$e),[new pn(n._key,ge.none())])}function fi(n,e){let t=Ge(n.firestore,$e),r=Re(n),i=go(n.converter,e);return pi(t,[lo(Xn(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,ge.exists(!1))]).then(()=>r)}function Wt(n,...e){var t,r,i;n=se(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Rf(e[a])||(s=e[a],a++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Rf(e[a])){let v=e[a];e[a]=(t=v.next)===null||t===void 0?void 0:t.bind(v),e[a+1]=(r=v.error)===null||r===void 0?void 0:r.bind(v),e[a+2]=(i=v.complete)===null||i===void 0?void 0:i.bind(v)}let l,d,m;if(n instanceof Se)d=Ge(n.firestore,$e),m=el(n._key.path),l={next:v=>{e[a]&&e[a](Dw(d,n,v))},error:e[a+1],complete:e[a+2]};else{let v=Ge(n,zt);d=Ge(v.firestore,$e),m=v._query;let b=new si(d);l={next:R=>{e[a]&&e[a](new Ku(d,b,v,R))},error:e[a+1],complete:e[a+2]},kw(n._query)}return function(b,R,D,V){let k=new Cu(V),j=new Eu(R,k,D);return b.asyncQueue.enqueueAndForget(async()=>iw(await Tf(b),j)),()=>{k.$a(),b.asyncQueue.enqueueAndForget(async()=>sw(await Tf(b),j))}}(uo(d),m,c,l)}function pi(n,e){return function(r,i){let s=new nt;return r.asyncQueue.enqueueAndForget(async()=>fw(await Tw(r),i,s)),s.promise}(uo(n),e)}function Dw(n,e,t){let r=t.docs.get(e._key),i=new si(n);return new ii(n,i,e._key,r,new Vt(t.hasPendingWrites,t.fromCache),e.converter)}var Nw={maxAttempts:5};var Wu=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Xn(e)}set(e,t,r){this._verifyNotCommitted();let i=Ot(e,this._firestore),s=go(i.converter,t,r),a=lo(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,ge.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=Ot(e,this._firestore),a;return a=typeof(t=se(t))=="string"||t instanceof Gt?dl(this._dataReader,"WriteBatch.update",s._key,t,r,i):hl(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,ge.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=Ot(e,this._firestore);return this._mutations=this._mutations.concat(new pn(t._key,ge.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new O(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Ot(n,e){if((n=se(n)).firestore!==e)throw new O(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}var Hu=class extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=Xn(t)}get(t){let r=Ot(t,this._firestore),i=new Gu(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return U();let a=s[0];if(a.isFoundDocument())return new Yn(this._firestore,i,a.key,a,r.converter);if(a.isNoDocument())return new Yn(this._firestore,i,r._key,null,r.converter);throw U()})}set(t,r,i){let s=Ot(t,this._firestore),a=go(s.converter,r,i),c=lo(this._dataReader,"Transaction.set",s._key,a,s.converter!==null,i);return this._transaction.set(s._key,c),this}update(t,r,i,...s){let a=Ot(t,this._firestore),c;return c=typeof(r=se(r))=="string"||r instanceof Gt?dl(this._dataReader,"Transaction.update",a._key,r,i,s):hl(this._dataReader,"Transaction.update",a._key,r),this._transaction.update(a._key,c),this}delete(t){let r=Ot(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=Ot(e,this._firestore),r=new si(this._firestore);return super.get(e).then(i=>new ii(this._firestore,r,t._key,i._document,new Vt(!1,!1),t.converter))}};function mi(n,e,t){n=Ge(n,$e);let r=Object.assign(Object.assign({},Nw),t);return function(s){if(s.maxAttempts<1)throw new O(P.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,a,c){let l=new nt;return s.asyncQueue.enqueueAndForget(async()=>{let d=await bw(s);new xu(s.asyncQueue,d,c,a,l).Xa()}),l.promise}(uo(n),i=>e(new Hu(n,i)),r)}function _n(){return new Lu("serverTimestamp")}function Np(...n){return new Mu("arrayUnion",n)}function gl(...n){return new Fu("arrayRemove",n)}function Op(n){return uo(n=Ge(n,$e)),new Wu(n,e=>pi(n,e))}(function(e,t=!0){(function(i){Jn=i})(Rt),St(new qe("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),c=new $e(new hc(r.getProvider("auth-internal")),new mc(r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new O(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ks(d.options.projectId,m)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),He(Jd,"4.6.3",e),He(Jd,"4.6.3","esm2017")})();var Vp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAxKklEQVR42u29eZwk11Xn+z33RmTWXt3Vm3qRWmqpu6XWjlZbki0ZvGGbwQJ9eGMNjGEYHp8ZzLA9PAOPbRjMzMAMho/x8Hk8GBt7ZPDKYjAw2DzbYLABC0tq2fIiWWvbaqlbXeqqysyIuOf9cW9k3IjMrKrurqq2ZzrqE5+KzIyMjLjn3HN+53fOvRfObee2c9u57dx2bju3ndvObf/bbfK/6W9/LW76v7IQBJAXgwH4KBRn64G/ljvji8GG9nGhffTrXQHMi8F8FPLmBy+G5EuQzmzbZntFYfofHAPm/OFc/eXX3XYseobmswG0rHXzR48WF0M2qo2CMrivNwUoBVreuL2i1drvWq3bjHOXO5GLUb1QRGZQnQTS/g0JGAkmQ8Lr+FikMimAMdX3hOHHp/OgZddTrV4PO3au3lWdKqr+cxfOU/WfO62+F7YMkQVVnUfky0b1S86Yw6bX+/gDvd4X8JZyWHt+zSpAKRcHcNnk5OWi+m0i8q3A5UakJf0GrLdEKWAhKEBD8CLiXzfObf7fSAUY+F8KOjxfUxFc49z68wtl2zjVHnBYVX9fRd732YWFw5EirKlrWEsFsKXGXj41dYs694Mq8tpEJFXVUnULBZVKUYSoJ/eFH732iiA1a0DTSoT34gs2j5d7YIkF3lQCjVp82HHUu2n0eodWn7vICkSvaehUuF1rglLkqpmofkCM+bXDJ0/+dbOtvxYUoN/rLxsb24u1PyvweiPizSHkZWce9nsiYBu9v9xB+se1nh9r0BBLAIPHNCxCvLno5lSHW4Hm8cD/2ApESuGCtpTHsRUohliChkI4gSRqy7dRFD/72U7n0bWyBrIGwleAQ5OTdwv8khHZWfinKqgEP/SLpam3pfCM/4IJJj92A2YZs7+iG2g8qTSEPwX0wi6RCJRTMP+N/24ABwQlADT0/lIBnC4rxdKrWOsV4YjCjz24sHDPEAN2Wmb7TICeXgfppomJXzUi/xGYLirBDwi/vNO41xvxgrelsI1gSuGHz8r/It41mPh/tA98p3+eeAxR/jf+PyK0RbizgC9ZoSeCRYLySWVBZIirkeF4hNjt1NyPP1HUn6cNBVUJbTMoTSlBoINCYEbg27am6da9WfYXR6r21o1UAAO4fTCrk5O/Z435Z84r9MrXDMI3DSUoe30s2KYFsA03UCpCUzGqz7zQkbrSlArYEXiBKi9x8PdWWBBIIqmUCjNK0LFSNMMfRuCRJijpS05WJUFTehJrzM29NL12Jsv+5Dh0TlcJ7Oma/UtgJp2Y+KAVeWmhmgskK7kUCQ1sqHqpDejeiEc+NsIBNqChWPil8hiq75bWw8T/I0xh49fhfCcwA3x7DrMCTwo8bqA1xOUMRCU0QajWXE4tetG6EkjUxb0iqe/5GklQV2x/41RzK3KpSZIXbsrz9x/zSiDrrQByl7/P1IyPvzsx5psi4bOS8G3UaDb0SCvSb+Ak6tk2shC2dBMmUgAjAxZkwB2YumsorUMi0BN4iYMrA/TOBB604R5GKcEQvNHHK7GApRKmaQDPYe9LhAFkdZYAAeMgT4y5SJLkyu15/r7bgQfXUQHkLjDvgWJuYuJXE2PuzlUzgVRXQIh9gZc93wTzjPSF0he2qXpyiQ2qnl/58r5rMA08YAbNvTTwQi5wHvCtzl9PRZhEOGy9Ygzr/UP9fi3i8JIvlaFm8bUPAfp+vjxBtRHWaOUOdAWEF5QgS4y5LE/TuY9l2R/fBfbBU3AFp6IA5kFwl46N/VNrzH/KV2n2iYUfCykIP3YHMqz39n281AUyBARaM6Tnx4oQzikEXumEixSy0MDTwLMGHrPQpiHghkLE/j/GAP2GMDIABgcyPkGyKnVJx5+vUoqmgMKK3LzF2s9/LM/vC3LV1frzVSP+g+PjO4H7jMicVpZs2YvbSIiVr66EXxMWdXAoMTiMwsQaTTyCExgmJAN0gYsU/nkmnpwKD9IWeFiUt6fhYYcxgENif6dDWEBXsYHx50WJ4KJQ0YVznfM0sovCQw3IehWSdALiVI8BVz20tHQkZmRXw9mvjh015k2JMVtcFXqs6PdLIVQIXrxCNLh+I40eH0y+QWrArw8WY3cRuwJTP8dEoaARoSXCiwshDaFX6ZJ6AheqYT9CLkJqIixihv/G0HuJgSfBXQ2zWs3IwlTch20o+Wo6qIMiMWaLGPMLpxINrCjEnwkh3/7x8RtF9TtzVQdYjWioYXv/5k308DGz1/D1g4xfwAemooZjU25MXSFqEUAk8DIUTAR6Bq5W2K9Ct4z5wx/4c24qhLT/+1JdZ4gS9l+bIaFphHdKwUpD0fukV00xpN8JiK67UnsDNld1qH7XgfHxGwD3M6uQ76otgBH5sQjcyorccMP3S8nnmyoUiwVsY0LISBTqRd8x0feGIH4bogq/R71TQA1sAW4vBBf9dklZWeMVZD9wKZAbSGs9PFzXDJJQ/d8vFYM6uVWLWkyD+TR1gBy3Vf/5ZVW+uuSTjIj8X2tFBfve32pdJknyGeMR/4oKYCPwZUOs3wzXbJMFbPYAAikzhOkzA2ljGYjT49jbCHQFXtUTri+EJdGhmq94HuBJgXe2tObry0QPpT8PoCDGAS4+1ipBlJfXcT5BVH5WBD/vYnwQ0ciFavV+xLQt56YFxEGmeX71F3q9z5YyPC0LcFfZlklylxVJg++X5S1Fw7wxKMQyVo5Bmgd30gdrRurET40EillE4013YWBfoex0irNVz08MZAYOKFyrQs+UCjm4GxEyES5AuNYJmfFKGN/DjT1lokYxj7ivJtPZV0qpZcZqbREnwmKXEbnJlTq08xFBKkny7bEMT0sB3uMFblF9bZm/X8EPDfZAI7WHbCqC6SvEIP+P1EkjqZlKwRqpWYare7Cz8GFe+R0EJoE7cqldc7k9F7i58MU7GpSgsHCBg5u7IfYt3UPIK/QjlMgdSGTB4lC39qxD2qV/jyH0pRHdrCQD9WHHnYB9zwppY7PSZwdarf2IXOFWoTCmYXZLUsQ0mDTT6FV9kCSDXH8/fo8Ani0BYpk4N17IewrY5aAVzistwy2FsAtDFvWuUbsRr0BbxPACZ/p4oQXc0lEmgB3qFSOuXbBRHsMy/Bnquwxvi7jXB/fWbNdVRAQgcsXBVuuSleQ88oOygJMkudV4pV/W/MsAQpdBxNukZoUKsMU79dcSYYkSkcfnYmBOoSXC+bkwS8X4XaxwgzOB4QsZuWV2wm90Ba51wj5gwcKNXTg/9+fsLCpK2dZcQAVAZYVnqp5nkK5uRkYxY7qK0FAAZyDRJLmtJsvTiQIcXIkILvAhw0wOQ0q1kNFVOjGbZlZhkk1kNmvFI5FCzYQ066zCwcwj+imBl+QGu0rTH+8q3pLcUhgOZnBjx1sTZ+DCAsZLbGPqUU9p4lf7XKUwzTIVTQxJPdcqRxq7AxdkduVK8h2ZxAml24hz+9QYRFVGVSv0b17LBxIExWgV5tX4cSqzBlrL1FUPKfXKn5BxM1GDla4FEaZC1OAEruzCA2PwgsKwEzMS9a/EkWfALgyv6SoGxRkPp3cobHNwxCqJq3P4rmyHuFMoiKh/Rq3arNCqQ/hjrZVYSSD7+/gKrV3b6UgT4NMPzu2LZXkqClA+UqIiewMAlOXqwWo+jMHSrX7s38wLNEvBGPy85AD679ewhFeUKSAVYVFgk4NXdeAi602/7TftqZc6CTDesnSLAnHeMoypjziOJIKVSmglQyYmqjPTSiISONsydDQRqDNxcB3F2v021YpgK6nqZRJFoqqoyN4g43xUXmnZjrHHcyEzy3IGjWyZGWL+auxYHLM3enJMAZe1ATG5EgM/G1UOtQSmXXUvGLhUrOcRgkbJKe40jtO26T+PE7i4gIngx4zx99t3SxFpVdU0yACXMWj5ZCjrGbdLLd8hy/M7AjN7V0jVL6sAM2BVdYrlwr44lh3i+4dV7ppmOjXq3QwhdUoGsTkOoPS5LWAznuETgbQtFOmyYH90efmI3aaCTT0IzA2c5wx7C48LypRqTAHXOgUN5B/OYUhSixH3Q6ONYyywTDg4NbmCAiz7YQ+MiozM99NImTIsFx49Ra3OjsEHNyL+hoZajjhxUvUEDEwqbFXxMbsVkpZp1FuNtvHqQOwKBHd4P21btFOgCInClbnwcKpegVVQ549FQ4WPKRFZRcclCHmJB8r6AI05FAk1QvWCkapN/RloFA3oiLJikbS3Uuh+xvXgjXIrGRIDmwgHDKv3syFe3+3gYud5+Jr/j/5bI96sBtOqArucMKEeoaetRrWlGbEDkkI6J5WERu0l8LSQpF7JMwN7nbDbVcSTDXx/fM8ScQuTwO1ZlQsYhofithqIkqi7zlXmCFhfBegfS63nDpjUhv9qPlQhvjEPBqBlGopk48igkWu4uPB0sE0Em0i9PnDYboBMae9OmHnhOBRaZRdH7WXZWstgrK8iaotweWHq9HWUvi6Vu2yEV/Tg2nzQlw+4orjEjCZjGtp61ECLtVaAkZSjRFUrMrz6hQbXHd+xNFLGFjhu4WABm9VbBBPX2EWMWCn8QmBOhb2FkJWmf1SRYDN952Dy6nHGD41jUinzaCt+T4z/HSPeCux3wtbofk2fcAqWLdz/t3ThmsLnJqZD1qbpy2m01QDh08BZTTksx9OsuQWohX+MGJgR+35G1NOFJ2oDjyegRnhhJn44kdQb1MRVReEmrs2ECUBC71+R5AnOON2SMH7lBMn2Fq2dKRRagbcVdpsK1goqMKVwKFDGcc9PxCeeZhS+Y0m4Phc6RhgTYbtCEbgQGDXiSWrkFQyCwxp5tNEuoD70qg7uBnxZ44bNEFeRCCwJPJDCLTnsdb6HWQbp0hIz7HJwqRNyI6SpWR3bZ4DMMXHVOHZrG1opE9dPglu9ApigBEaEwgiXFobZEOOX99cV2FsIr1sS9jvohjKf8VCQqo2KaCODQm1ip/qoJ6kn3zbSBQywAjIUFAwUVcIQFxBhBwt8LlHUCK/qCZPqTahhuBBuyA1tBEkEY0Nlz0rSc4IZt0zeOOOhZGGZuHYauzkNP7Y6rtimgrFeEeeA/c54NxBKzq/J4K5FYTNCx4bMpRXUCuchtCJiRxrtOGAhR7Rvs/03zgVIw8c3B7yMGo05pJI2roVPBY4KPJXA+Sq8pmf69G7MAmYCFzthn1oygWQ1pl9CuJcp45dPku6b9OGGGuz2MaZumIbMrdoKiAhJ4skhNXCFM6TB57+4I7yi48mh3NTHO+QCu0UYk7JKQ0a2S7PtaFYhrzTseb0UQIaVTTdTwo0kBtIAdUNYQRtKsY4ZyI2w3wmv6lb1BGXmb0zghtz6923o/Q0zP1RogKTC1C2bwSQgif+fG6bu2EK6owX5CFcw5D2T+J6di7AD4YrC8LJF4ebMuyUNZWRxwYmKsFmE7YG4qhWLNI6bpI8ZNvL5DMNBcyYAsO//GTI0u7GbmAkcdiwVWd01Hi0vWTjkhJd3DeX4iQKPvHfhGbnEeiq2aealIS2xgnaVscumaB2cJpgOsAk4i9k6ztQ3bQv1znVpS8n/Ur+uCcpnxHMQd2SGg7nQsd7a9Kuco12DAl9AVFoddQIaY+ml2d618PrMw8GVMYBqbe8nhePk8ND3IhQx8HlUaIf6LFc4ToBZqt7TMcJVhfDyjj/DClypSd9XGysD4K+10yBpfVAnCmbMMP3yHZCkngSVICmbQFeYuHkr7QNT0C0QK7WoIdliaJ1noKhHOD7yCD08NbhEwoQWPmQcthsj7BEhQdGQ4VttW63U/gPyWnMLIKePGZqa3DylEJgFLhDxHHvYuxaudIaXdA0H1LATISvDrtj/A6YlTN0+gaQRL58IdAombt5Cun/WozQbKYAEbrGdMv3NOzGpp1v7vTZXpm8fp72/hWYOSaLfsx4MlsqSpLJskskYDxwvMIbxslpzSPucSTtvDBM4Cr02Ad8QoDJqho8cuA7DJhGcxDX5QtcIlzrDN+YWSqrYhoyg8fkBFMyUoX1wgtau1PdWK5ArdmubyW/a5W21TcCGnl/uSQI9aB3azPiNW6HjkMRAD9oXpozdMIWdS+uWJfyusab/XpI2xxMM7k6EOSNsM1LNTiLDAbYMiZxGgcINwQB1fyMDPophfqs5TKthBUwovtgthpvFDtTulS5ejdBKTN8vGyt1J6qQbE5gssX49VOVYmSOydt3YndOhQlrGr2/3I3HA5MvPx+7uQW5Q1rC9Cs3QZLSumgCO2WrgD88jbEEl+GVwSSybM2hBj7gfDHkVNnEoYTaiu17ZjjglHmAsvicIccDcakMXgsZPpoB4BuNZcoKrkT2YccGCjYVL6sIXNVGAjsl3d4GSWkfmqJ1URt9Pie9cIrx23b7OWBsGgSeDO42gUywu6aZ/Mbd6ImMyRfMkB6YgkWD3TFOa28byV19eFgchZiAC0x1/9J4FqxnEncHAKlRT9chhf6jzPswOawLD6Ajjuupx9HfqY+OrQ+lNeIHbB4yhiusoTNk5pC+kG2DjLF11kkSIdkz7oXZajP1ym2IhYkX7UY2jTXM/5DdWO8KMhh74S7Gb9nG+K2bwKVgUmi1GLtutjGa1T+EierAbSJDp7CJxw7kAhdYYSwataEjJjIaphR6GnI65XqA1WCNAdMjjDRJw1yDCzdxa5L4GnsdXXtWcv0VlpBabl8mLeneKdAECiXZN8X0XRfQOrTdh302XdlOlpecSJj5zv3QOxEGB1jIoH3ZLOme58if6iKtPpvjFSDUaSmB9XPLl5ttt5ZNJuOr+XBTPxQY6vD2XVceYOQPyTI3ICujVBHoqXLAGvanvm7fjkLP/Xi/rMaVWtmW9gpa+6cw5036URw2hdwydtsezKaJqvcP8/0DexKighmw4x4b2MQr1vQYYzfM+dzBkDi/vDfvBkZHA87AuIXzrSUPhbGrbrdVyEDWygIo9YFlK41KaZ439JoNf3Vdy5IaIdMRGqneQmNAwpf7I45KTW5bxm/d4QVviqrcxk56035aAY/A2Cx05/1xAuRC++qtdP7qGdx8HkaeehflYvbOCrLMSIpyToLzreETy7XVMm277OigVbqBhDPYZBWYYbn3c4Vt1nBZavtx/agvlnQvUR2hBKCgSznt67aSHJiDbuHNtaonfJIxVjGedfSWTkLR9bVjiO/5W9u0rtlK58NPIWniS3xFMEb7z2is4Kwua3pVYE/qC0viCSlOpU3PtCDkjBTgVG9KGg3QUeXSNGGzNSwpGJYpdC+nfItjZIMXyHjC2O17ArdfxloK6YQ333oGk2maxF8nXwq+SEEtYzfsoPfJo5C7qGQs8vsCrryPEW2XC+xMLGMCi271bbcaGbCWLmCUSRpm/svyuuZ5LsS7cbm8BQ60bBDs8r3UGBnMQhqDdjLa1+/AXrg56v2hkjIZP3MFEIFkElxRsVu5YvZsIj24md69TyMTabACEPG6GCO4FYDgtIU5K8wX2ucD3Ig2HuWKR8liXVyALqMYpZD71LUM3lCYGo8cmLTCxW1LZrQ/LcpIOTSmsxLja/80NbRu2B18f6O4zrbPvGJC8W6k6FYicAppQuuaHeT3Ha1i+AbMMCs8lAJjCDut5QuakSBD5yqOUytuRNufrjVIzsj0a70YofnegMWIpkvLUbYnllkrK8421R+42XiPvMCeN0ly8RafR7ZpFCMl1eszsZOlOUvaUGT+PeuLEpKDO7DbHsYdX4LE+Gk8YzdlawZhuAIYYUcqERewDIgbhhP0zB5xZQVQXdYv6NB51r2BG/zM+0RRyFXZlRjGrNBRP45wOSs8UCBpgV5BcmArzEzCUlahSFVIWiGc0zUonRVwYyHOl74VkE1tkn1z9D75GNKy/dCwcgEjmNLYr4uwLTHYakr92jRk9RG5WrP1OuL9dccA5fx2sW+SIe+V4900+qycIq1Q2JoIbSt0iuWHPA8qQCCMUou9cGsw/1ofSSEt7//XZJENA7YFLlrVRRRabezF25C/e6JPXYrWx0yLWd64FAa2pn72Mqf1qejKBnfNUG/Ie7W1DNYVA2gV7zZ9fVMJm4AwzIrrsYLAbBhQZ2QlBfDc+kBoOJ5gz5/zrIpJo9GWGpTCDjrm091sC1zWyF8b7MXbMZO+qtiZQdAjRlfsYNtTSxoiAR0B/IZyLlo/73Sw7qljgHgEq9SVoPqvaJCoDpsNM0x6MJUYNIC5FWecbNJcuUMmxzBbZ/1jJLahHcmZRwDN/lqkDQ5VMFtnkakx9LkFjDF+HEDkOXSZKT1K4c2khmlreL5wPhLQwTUKBoiCxgRWTap4/RSgJnhvdgfclAwqiMauQOtp3pV8tFDnABBB1SEzk9AaC4hfBxVgJRR2Ss9dgszG9cYsZvs07thJ1EptCheFZX/fhARQS5QtifB4V2szho9anqZuBXRQEdYbA0jDpxvqfn4oLgiuw8SKEY34MauxPPF87DiYbEPaGjJTglYFn2u59J5LG2vKKIy3MDs24Q4/Ae36576Qc2UE2hJhxhpy52shm8vQDMMASuN9HUQ760YFN8FHHxME4TqNZrcs36MaIWuA3Kln/+yQyqFRbGBjzIFJQtJH3GBsZGw07HeNNpvUlc05aLWRTVPB39cxpwBqV27L1BgmrPh5AGOBN+ckbgif0wf/a8ADDMMAUaxfcw9RNFA2TE/x7Jfx2iGyCgMQ1UKLCfO1EPL4TZXvDwRYw01CtBHznpJgJicwSSCyB/iKFS6p5ZRzUpaI1iLBONbWhpdruoiNywXUfLq/aV2FJXBhdQ0XNOcrvYKccir4FZbJMNKfHKI/t+xCJyiADJ+7vDQvWsdJp8ULKOBsY00YF4pP0tqcyH310FUoQCj4L3SZ2cibZl+rqKqvKLoOCnAMPxvWsGu7qKMrQbgxNiiF3/w8fGaBLy4VdAl+b9VLZVQr6+mJBeg4mJmAopl79TdTaFmy7TOELisCSWOGhLiKulBOLWDEROGn8+5GGwpgW5VUGrSzoCtO7GfCkIPnC9dXmqErjjYxgQ7HAsNkuD4YIBZsBPhc1A6qiitHBkdYwKmSGOGxTsET3YJLJixdV03/siockBh0YYniyWPYbXOw1A3Um/ZX7TTWYGenISvoHj+JTSzJ3AzkDl3o9C1LKXTTbiFjLUg9q8dSD+30op6aDnYDk8DJDuJclYWs8QDLt6NRyFQ50i0qMK3VgsFazkfcsAaOQUXYOBfQAIGD/j+qE2xEAuWxBeZz5RMnMg5Oe/QsZuUHkbIKyxiSThd58BHc9YdAM4zxBfvSSpDE4J7v8NHf/QSf+ugD/OPffI7J6Qmuv+0Qt7zsWq687RD0Mlwvx7RSZLzN8S8/zeF7H+bxL36F2bkprrzhEs6/bI8nrxYWELF9HOKf36EZFE88g6S2njtgeQ6g3FKBJzuOJ7sFiZ/bb2j4h7I8DlgvBdBlPigHbTrVfsNI5PdMNMO2iZBrUTKpIvzFsx1evWOMzamh0OXn8ysfdiz1Dnex3YZPHmbi1S+CPdvh+AJZlvHON/8+l169j9//nb/kI3/6WSZbsHn7FAvPP8fbf+3DvOs3Psy3f+8dfN9P/R+05zax9OwJ7vmld/NH7/wIR57qsIhfzXrLNNzy0mv5nn/7bVxwaA90e2hWoE79WIBNE3DkKPaRJ8jHWuH+faOo0xWndS3U1zn+3XyP4z1l3AiZq882Hvd2VzvWAUyw8RZAq5EtZTFn3w0E9wCKqNTO88uiKKkRnug43v2VRf71RdPk+Wg+QANWsAiferbH3xxd4t5nO+SdHtc+95vc/F0v45ZXfAPk8Ifv/Bjv+62PMH+ix11338G3fOdrueCC3eRZxuH7H+KeX38nb3/rX7J0ssNrvu+b+Z03/R7/808e4IpD5/Gtd9/B+OQ4WhR8+m//kQ+9/14+95lHeOOvfC+7925n++4tyMQY+fHnefQzj/HwOz7EJUdPsmd2jLZV8jwQ3kZWXA40NbBYKB98utMf91ibch4duvC0a0xNfyYWYLkCFJ2DmbFW63H8XIEDFRvxVOn9CZIay7XYaCIEa+pLwpVTvWeq/Pgl07x05wTdzA0stabqr38yd7zloXn+5EvzqIVtm6cRa3jmqyfIOvDyO6/l+3/qdbzx7v/Mlz9/lNf/4F18z0/+K8gL6AUef2KchWeO8dPf/9P8/SceYNNsm2PHurzyztv4gZ/9N8ycty2AEYXFJT7w2+/hLb/4/9Jqp1xx/SX8wtt/lA++4yP84Ts+zKNf+CqLHZiagH1zbf7JhbO8etcYBYpbJrQtO0iaCm/9wkne8fgiEwayMKNY0V9DQKNjGsdarTmgQ/VLgPlOr3f+MZgfRRSfkQJAU9j1iZwroVcTP5po1Q+DH90bMB0/sG+aV5w3AapkhfZ/0PjRXfz8fcf4s0dOcsetV/Ad//I7OHjoEkSELz38GO//7+/jT//gk1x94wUceewoO3fv4K3v/lVMkqBZ5nkDoMhzkk2zfPHv7+eHXv9Guks5+y/by5vf+cu0piYpFhYDfldsYpHZGX793/0y9/zmB7nsmt3s2LWFP//gfezZNckNt13H5rlZjj59jE994l6ePrbInftn+eHLZvr+XBom2oaBJCi87csn+e1HF/wcCKWAw6IMRVhEqib0cqGJSPiFG2lgVqUAp48BGtosUpFktaFNWic8+lOnOp/EKwL9mTv4r198nodOZnzb7gn2TIQRmIVCKvzxIwv82SMnec0rb+In3vyTJBMT0PFI/qqbr+GqG69idvN/5Q9/988pCnjt627Azk5RHJvHRomiJLHoyZNcfOlFXHLwIv7245/jpa9+Ca0tm8ifOU6SVkjf5QUsLfHqu17Jn37gL/jK40/z0H1P8i2vfQH/5098P9t3nxdmq3I8/qVH+fWfewvv/dj9bGkb/uWlM9iCgZkpi9xx34ke9zy2yF8/06VlIuFHpt1pw+dTX33crbzo9PpigAEFCLBVkOq9ki+QQP5QCb8wPn9TBDSZhDV6/uDIEp94tsuNW9pcNZuyfyplprD88WPz7Ngyxb/68e8laaXkx5/DJv72XaeLHW/zfT/8eu7/9GE++8CTTEyMByLCDVRllIUYU9OTJBbmtm1G89wD2Wg0h4ggvYwdO7exafMMjz/2NDfedgX/7pf/LUm7hVtY6F/v/P0X8lNv/kme+c4f571ffIIX7Rxn90TCydxxPHN8pVPw+GLOp49nPDifsVQoY1bInVariFP1ckUHlp/xx/Wl6DnbCkDEWPVXwY4Iisoy+EhBQ88vwaAvj1aKIKRJKywUyoeOLPE/v7rETMvQMoannuly60uuZOue89DFRZK04vltYnCdDpPbNnPpFfv5h/uepChyBsbZlzdrDdlSl8e//CRJOdRbqzkKauBDDC7rcfL5kwjwrf/0m0mmx8mPnSBJk/7p+Yl5Js/bwmtf98380k//Bj91/3O02kKvULqFslQonUKxCKmRgPi1vsy8K9tSaz1ddcjS9GuX5F6DJFmNtdLaTdaqXFxj0cTyHFe9zkMYNJkIY9Y34GLucA5mN8+iRjxT51y1h5ZTlFtuv4mZCcOWrZshD0rQOFezjGRqjJtuvY7WmGHvRbuh1/MKEJ+L4vKcdHqSA4cuYcu2Ka676Sr05CLWmui3HcYI2umw/+A+pqZSFrsZz+eOpdz38JYIM4mhbSU8p9ZNeUMJhrVhGfrpGvX+VSmArnKPzVcczhTla+fNfQ3QUH1eRKtmFuoRcd5M8qG+5KrWLTTU4imy1OWmW7+BndsmmZmdhrxApHGuKuocYgwve83tTE2NMzE53hd4fJ6gaJaRzkxy+8tuYWJykvHxNuKKgXsQ5/cktX3AGVvHXKHnyufT8MzUntkFl9gHghEOKKL2dKcglw1xAaUV6PMBqrgAA21wqy5EVkK1nnopm5IBLFxwE/ED1MKpmPluaqp/P+v1fEMVQQ21GY+VOdeCXrcXwF7pLlyduy3dR5GT9Xo+/VIUIT+gQ7Ij2scQ2kDuVU/XailZR43m7fv3yBIU0fdikLhWW8Iabup84cwon9/PY0tFDhmqlTPCEmX9GYPKMMpJMwnhhoxH9+9Xq26U5ykDw3TLXitxfVW5KI4bqlg1JeyfO/j7RKur4eomXsM6gETxe98lUl9neBQmUMeabmurAM0sYNTzmzlwV6ZvpaJFKzl7JbBB+HX+ewT91RBA0+wPU4CBFaJHlcCXkumXOC9zzejGitrC0Tqa3nX10K62yLQbzApuqAKc6g8W0cL3imJ1cGyzaJnLllou29R+M1QQ17KE2gddwy1AHMbF566kLBGYbHJd5TWIzlVZ1gIIdUGWPV8b8X3lHnQAR1X4SfuuoFhr6a+1BYgrpcpVQFww9+WwunI5VWOq9KEJc+5rhEwdFa9QaKMUafQ8JUNSaCsNsCYy/ctdF1Y3IL5S3/6S8JHwi2hJ2b7fp1pGvoYJ0Noy8+uxrYsC1HgBF3x4xAjGbkFQP3M2g3XwZV19tWBZFKYxxAI4iVoqPncIYi1jz+a5TQI/jlH7Uo0yXiOvSV+wRRzWaXysNYugrkL7A+dylhTgdH+4qHEvVSFALtUKWNUAEu2v7FWuplUu+yoDMa9b0QJIOQJVl+mt5WcSrqnLWJYSCDa/u4wFaNK75bFSJXp0SJTgomxpHElwthTgTAZWFAHomahAro9kw+xYWi7vHk2gpNCfR1UEColMdd8eDrcAqo6iULRwlW8fiFa8UNU5Xw0Un9uciM95u6TqcCUBZc2KFkAVcucov1JEoWGMC6qVwuurhvdxgGNdt4R13opofJiI+jHzsWL0/X5YCMmILySJasidqxaZVC0oigIRU83bS/W5NTA21qLVSiprIIN1eKC0WglJmpAGWrm0HC6UiNn+qk+OJLG02qk/x40apO1qYWTRX8azYkGd08GETxwJOK1ZjfXeEjZgi0PDEtX3wXQoiiyXa3VB6H1A7qp59FQVSSzp7CRkGfSyelysjjRN+Pn//IPs2r0dXVjyzF9RDOa6Ox32Xngeb/rlH2Lz5mm0l4WyNMFMtH0vX1jyjmlhkdtefB2HLt/nSSBX+CkydXhoKY16vSKCD3UM0CjubIR8G7GtGwaoNbaW69B6ltBHbBXjZzVeUVMxzheRaMAA/RKyVsL8V5/lz//o4xy+7wscP3aCYkg3abVT8izHrdCKIkKrldINjCBA2krZuXsbN950Jbfdfh1mvI1b7DK9aYrpLTNVYQkjwkCqJT3zKCApYjInapO4xKv8vFBWnDPo68YCxJNDaEQNazlGTCozX64RSMgQmsK7hLxwTIwZPvvAw/zA63+WBx96hrkZYWJqYnDUcPDxssqZQfxaf9WJRV7w6b/7PO/93b/mxpsu4off+F3sO7QPt7hUuZ1RWCkiiMqciEZJn5oliAKMkv9vCv9rwgKsqTKERjH9moBA9oRxAhLMfoFfNLm0pQXKWDvhoc8+xszsBD/x77+bF95xE5s2zSKytvdYOMeTT3yVD733z3j3O/6MN/7Qr/Bf3vJjXHDJHlynN1oBhmCAPsEzJKwrnVKBVvhgg4W/4QpAwx2YYAlsmFqlzw5Ho3w0kEFZL2fr9ln+w5vfyIEXXA0nF9fJUVr2H7qQ/b/wBvZdvJs3/cxv89Y338ObfuVHQsSoy+fEnfaFX4QkhosTP3FeIAKHhW6AvT8bGGDURYtw7bKnO1GM88u/mtDzXQCGYwJFVvD677uTAzdcSvbUERJrWfPuX97ekkMRXn33K7jvHx7gT/7oUzz46Ye44uZDuJMdPy3ssIdyFV+geAxAzP2XkaLoAC2sZ0H4Mf3OWbEEccq08IRQ4XxvKd8XFWzue/9tt1yFPvMsiRZI0UPy7rrspsih10F7Hb7xm24kz+Ezn3kIrEXVDYnhGjtVxq8IYLB8Lofiivqzny3hnxUXMMxyoj6NrOrTwYVHgd5NWMAVzM3NMN4WJOsMzdms9SZOkaUFts5NMj4Ozxx9DrJssGxsFBNIxUG5IHgi5F+a/rO9Jct7Q5zz82yvrxKUfj8ogoRZKETFm1FjWFxcwnWXUGnVc8frqJnqYOn5k2SZMD7eBuvHEXq0yogw0PXVodAKxxTNsriNsLKQ2RX0bFkFaEOxpHpSRbZshEtwRPM8G88O5jlkY5anv3qcz3/uEa64/gD50qLHAOsp/6wgmUq4997P0cuUgwfO9yOQy6qXoTkDrSUYi/C63+N1g3u96skJPyfn6SnAE5BtgflovOd697tqpLUrRxMr884wUeT89tv+nP+4fwetsRba6ZzRuPjR5FBomJkJHrn3Id7zvr9h/yWbue76g7DUwRqGl+UEC6AaWQBXDxA20NWXHNr8oysowHJD8cKsuDy6ngHByIi6jJ0dnMwcY+Mp937my/zcz93DEw8/hVBgrPrZ4dZwF6vgcv7hY/fxf//8u3j2mUW+91+8iqmtM7gsZ8UyzEAFNzN9G4zzyr7xKF4BRs4fliwPAchV9eHmSoDrCr6iJ4iraPJc2bZ1io9/8kv8wz/+Bt9w9UVs2zLlJ5FewzvL8oJHn3iWex84QrsFP/qj38IdL78RPbnkJ3waVZlRUntRQUjhqlm/ZGN7kQOsqj4cy/L0ogBj7g9ximyY6g5ga8PiUo8Xv+gAt95yBe9538e594HH6PbyNeWCynUGZ6cneMXLr+bOO1/EoWsuwS11g6nUZdytLzLNe1m/8tdFE4RssAUwfdk1EmGnogB+HoYs+ytNkjycqxulCLFPzsK0f0ePPsetL72eW2+9kmPPnuDEiQWcW8uYUEnTlLm5Kabm/OJQuhB6vsiyCE6dQ43h6aefo9vNyEnRsxPolfm13GTZx2NZnpYCPAtfmFN9AJFrqGaE3zgFAHqFIx9L+PIjR3jy84+z68IdzG2dZW7H5rVnA0PBvna6ftqYcgzAsmyNIOoQHPff/zCdrrKYCGdp8zJSfeBZ+OKZKEDpOwpEPgBcczYIK8FbgHk1tE8s8eG//DTf9f2vITv2vB/1u8Y0Wn+mk7BE/Gqur84hLctzTxzlr/7qfkzbcnypwMrZIXvC4Nf3Uw61qHJPp0wFK0DPmPeoX9xzjWdeXKU9E/hqR5FWwh/84d/w6OEvk05PoHkxcm2+0937C1lrXFY+elfncOqQVsrb/8dfcPTpExxT62dAP3vmP+sZ897V4E67iguaXlEcHTPmSgOXUw3q3VBE03O+NmA863Hf4Ue5+Yb9TG2bxXWyfuwd5+PXnSh0inMOk1rM5Bjve+eH+d3f+yhFK+XzC2eN3C9n433/fJb9N+IK+9NUgLIttWXMowL/gvq6jxunBALzGYy3E7JjJ/jbTz3EBTvn2HXBdmQs7ZtsMRLicFdVB6/ZTn9xSBlLMeMt5o+f5Lf+nw9xz7s+AmnK5xaVTrHMCmjrH0Cpg+/pOvcUq5g/XE6hE7rZJHmbgX8elvw5K4kkp3DxpGG7ZBgr3HTjZdzywss4sO88ZmYmEBHG2int8ban4k5jCvWVNLHICg5//gn+8TOP8Jf/32d44vFn0bEWn1twzGeQyFlJ7ecCicLbnsvz715N7z9VBdBx2NlOkvuAOVhxqZ912wqFrW3hgjaYXkbLwMTUGEliyQrHptlJfvFn7ua8PVv9PIBmbbqjqiLtlLe+9YO85/1/68vbEsMJEh5ddPRcVNa+8chfgGPdPL9qCY5QTdBy2jxA8wfMEjyVOvcGa8w9Za0mZwHrJALPdJXjPdjcajEr0FrIsWRMWlhc7HL0mROcd8G2aGjSWmmf49izzwNwvDXGEwsFS4Wrj2nYeNPvBJLCuTcswVMrIf/TUYA+wpx37l2zIrcYkX8dUsXpRj10bM3Lxn6m6zjaLQeXCAfHYc9EytRUG1y+4iTUp2wBDExNtnEKX+k4FgulDPk3OuQri48NpE711+ede9epCP90FMAB9kRR/MhMklxo4FUbiQeGLVBm43WIo3o7V8RzA8haaQCoC+yjt0RrDTFOsT1ygbSAD84XxY9Qrc15ipzxqStBL8nz1znVj5dLKnP2GmG4AFTXb49+4ixuuUDiVD+W5PndQI/TqDVJTrPNzTGY31wUrymMeacReXWECQxfC1tM5KyxBait6bbxWuDw+f7EqX4wce7uMBGk4TS8kDmDmzDH4cS8c3eqc28J5sdoVOG8kfugNVjvX9v4Z9T+kFmsOveWeefuPBPhc4a9texa2QnVN6jqP1M4IhW5VJxF90g0A8Pa72zQuK3qV8qhFFbhiKrefUL1DXh6XjgD/GnW4OYEMPPO/Q9TFC9QeFswUeXSyTkbVwcZc7Wr4vJPb1/3otQSa+WEObmDA3qbLYqb5527h2qGpTNq12SNblYB+xw8SlF893SS/Kaq/huB1zbCxCJSmnWllLVM1qjzI3nXKAxE3VprctODSXCnEnj9zMH7Efm15/P8E2Xwcyqh3norQCxcASTc6Ccm4XJrzJ0Kr0XkkEAb1s96xpqVhinLjZU1qxmwYakTK/USrzN8loF1rBS6qD4IfKBw7v0LcDhmZNdK+GutAHF7GIAFOIxzh4E3TcMlzpgXoXo5IhcL7FWYQWQKv0DH2tjNMPFSp5tBXuCyYlWLN67Kq6hirNDNimCj9UwVIEP1pMC8g0dR/SIiD4pzH3veF3MUDVe95lzTehE4LrpxA+TPw0M491AUQCdAsg2SYo1Cx+fxq8Z384Lnjh6HfVs5bmCtBjUYAXo9lp7u0RmDzrGcsTOxKOCOej+f97mUelhZLn++biTjRvH40uAIznKE8DW5lb4fll8J7utSATb8t9eTn1mvQcnn+sC57dx2bju3ndvObee2c9u5bUO2/x+sNkU6oXguqQAAAABJRU5ErkJggg==";var Lp={apiKey:"AIzaSyDvjnOLzYEHGV7ae_VWZ-LUeAJ8i4WTY9Q",authDomain:"bul-jumeok-e910b.firebaseapp.com",projectId:"bul-jumeok-e910b",storageBucket:"bul-jumeok-e910b.firebasestorage.app",messagingSenderId:"727813238723",appId:"1:727813238723:web:b308d312c3d34e7fb61776"},qp=new URLSearchParams(location.search).has("emu")&&/^(localhost|127\.0\.0\.1)$/.test(location.hostname),jp=wa(qp?Object.assign({},Lp,{projectId:"demo-bulfist"}):Lp),er=Xa(jp),ee=bp(jp);qp&&(ys(er,"http://127.0.0.1:9099",{disableWarnings:!0}),ll(ee,"127.0.0.1",8080),window.__bfTest={signInGoogle:function(n){return Wa(er,kt.credential(JSON.stringify({sub:n,email:n+"@example.com",email_verified:!0})))},tryWriteMember:function(){return hi(Re(ee,"members","hack"),{nick:"hack",no:99})},tryDeleteGuest:function(n){return di(Re(ee,"guestbook",n))},state:function(){return C}});var Vw="\uBD88\uC740 \uBB3C\uB85C \uB044\uBA74 \uB418\uC9C0\uB9CC, \uC6B0\uB9B0 \uBABB \uAEBC.",C={user:null,bossUid:null,bossKnown:!1,members:[],membersReady:!1,topics:[],guest:[],guestReady:!1,rooms:[],roomsReady:!1,roomId:null,room:null,roomMissing:!1,msgs:[],drafts:{},pick:null,confirmDelete:!1,gbConfirm:null,flipped:{},importing:!1};function tr(){return!!(C.user&&!C.user.isAnonymous&&C.bossUid&&C.bossUid===C.user.uid)}function Eo(){return C.user?C.user.uid:null}function f(n,e){let t=document.createElement(n);if(e)for(let r in e){let i=e[r];i==null||i===!1||(r==="class"?t.className=i:r==="text"?t.textContent=i:r.slice(0,2)==="on"?t.addEventListener(r.slice(2),i):t.setAttribute(r,i===!0?"":i))}for(let r=2;r<arguments.length;r++)vo(t,arguments[r]);return t}function vo(n,e){if(!(e==null||e===!1)){if(Array.isArray(e)){e.forEach(function(t){vo(n,t)});return}n.appendChild(typeof e=="string"?document.createTextNode(e):e)}}function To(n,e,t){let r=f(n,Object.assign({id:e},t||{}));return r.value=C.drafts[e]||"",r.addEventListener("input",function(){C.drafts[e]=r.value}),r}function zp(n){return typeof n=="string"&&(/^data:image\/(jpeg|png|webp);base64,/.test(n)||/^https:\/\//.test(n))?n:""}function Lw(n,e){return(n.no||0)-(e.no||0)}function bo(n){return"BF-26-"+String(n.no||0).padStart(3,"0")}function vt(n){return C.members.find(function(e){return e.id===n})||null}function Oe(n){let e=vt(n);return e?e.nick:"\uD0C8\uD1F4\uD55C \uC870\uC9C1\uC6D0"}function Tl(n){return f("img",{class:n,src:Vp,alt:"","aria-hidden":"true"})}function Y(n){let e=f("div",{class:"toast",role:"status",text:n});document.body.appendChild(e),setTimeout(function(){e.remove()},2800)}function _e(n){let e=n&&n.code||"";return e.indexOf("permission-denied")>=0?"\uAD8C\uD55C\uC774 \uC5C6\uC5B4\uC694. \uB450\uBAA9 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uB294\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694.":e.indexOf("unavailable")>=0?"\uC778\uD130\uB137 \uC5F0\uACB0\uC774 \uBD88\uC548\uC815\uD574\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.":"\uCC98\uB9AC\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694."}function Mw(n){if(!n||!n.toDate)return"\uBC29\uAE08";let e=n.toDate(),t=(Date.now()-e.getTime())/1e3;return t<60?"\uBC29\uAE08":t<3600?Math.floor(t/60)+"\uBD84 \uC804":t<86400?Math.floor(t/3600)+"\uC2DC\uAC04 \uC804":e.getMonth()+1+"\uC6D4 "+e.getDate()+"\uC77C"}function De(n){location.hash.slice(1)===n?X():location.hash=n}function Fw(){return location.hash.slice(1)||"hq"}var Uw=1.1;function Bw(n){function e(){let r=n.naturalWidth,i=n.naturalHeight;if(!r||!i)return;let s=n.parentNode,a=s?s.clientWidth:0,c=s?s.clientHeight:0,l=a&&c?a/c:.8,d=r/i,m=Uw;m*d/l<1&&(m=l/d),n.style.height=m*100+"%",n.classList.add("fit")}function t(){requestAnimationFrame(e)}n.complete&&n.naturalWidth?t():n.addEventListener("load",t)}function wn(n,e){let t=zp(n&&n.photo);if(t){let r=f("img",{class:"photo",src:t,alt:(n.nick||"")+" \uC0AC\uC9C4"});return Bw(r),f("div",{class:"ph"},r)}return f("div",{class:"nophoto",role:"img","aria-label":"\uC0AC\uC9C4 \uC5C6\uC74C \xB7 \uC218\uBC30\uC911"},f("span",{class:"np-stamp",text:"\uC218\uBC30\uC911"}),f("em",{text:e||"\uC0AC\uC9C4 \uBBF8\uD655\uBCF4"}))}var Il="bf-me",Gp=null;function Ao(){try{let n=localStorage.getItem(Il);if(n)return n}catch{}return Gp}function El(n){Gp=n;try{n?localStorage.setItem(Il,n):localStorage.removeItem(Il)}catch{}}function at(){let n=Ao();return n&&n!=="guest"?vt(n):null}function Mp(){if(!C.members.length)return!1;let n=Ao();return n==="guest"?!1:!n||!vt(n)}function qw(){if(Ao()==="guest")return"\uC190\uB2D8 (\uBA85\uBD80 \uBBF8\uB4F1\uB85D)";let e=at();return e?e.nick+" \xB7 "+bo(e):"\uBBF8\uD655\uC778"}function jw(n){let e={hq:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',members:'<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M18 14.8c1.8.7 3 2.5 3 5.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',games:'<rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.4" fill="currentColor"/>',guestbook:'<path d="M5 4h11l3 3v13H5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'},t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t.innerHTML=e[n],t}var wo=[{name:"\uC74C\uC2DD",words:["\uAE40\uCE58\uCC0C\uAC1C","\uB5A1\uBCF6\uC774","\uC0BC\uACB9\uC0B4","\uCE58\uD0A8","\uD53C\uC790","\uC9DC\uC7A5\uBA74","\uB77C\uBA74","\uCD08\uBC25","\uBE44\uBE54\uBC25","\uD584\uBC84\uAC70","\uB0C9\uBA74","\uC21C\uB300","\uB9C8\uB77C\uD0D5","\uD0D5\uD6C4\uB8E8","\uAE40\uBC25"]},{name:"\uB3D9\uBB3C",words:["\uACE0\uC591\uC774","\uAC15\uC544\uC9C0","\uD638\uB791\uC774","\uD3AD\uADC4","\uAE30\uB9B0","\uCF54\uB07C\uB9AC","\uD584\uC2A4\uD130","\uD310\uB2E4","\uD1A0\uB07C","\uC0C1\uC5B4","\uBD80\uC5C9\uC774","\uB108\uAD6C\uB9AC","\uB099\uD0C0","\uBB38\uC5B4"]},{name:"\uC7A5\uC18C",words:["\uD559\uAD50","\uBCD1\uC6D0","\uACF5\uD56D","\uCC1C\uC9C8\uBC29","\uB180\uC774\uACF5\uC6D0","\uD3B8\uC758\uC810","\uB3C4\uC11C\uAD00","\uC601\uD654\uAD00","\uB178\uB798\uBC29","\uC218\uC601\uC7A5","\uCEA0\uD551\uC7A5","PC\uBC29","\uACB0\uD63C\uC2DD\uC7A5","\uC9C0\uD558\uCCA0"]},{name:"\uC9C1\uC5C5",words:["\uC758\uC0AC","\uC18C\uBC29\uAD00","\uACBD\uCC30","\uC694\uB9AC\uC0AC","\uC120\uC0DD\uB2D8","\uC720\uD29C\uBC84","\uBBF8\uC6A9\uC0AC","\uD30C\uC77C\uB7FF","\uD0DD\uBC30\uAE30\uC0AC","\uBCC0\uD638\uC0AC","\uC544\uC774\uB3CC","\uB9C8\uC220\uC0AC","\uD504\uB85C\uAC8C\uC774\uBA38","\uBC14\uB9AC\uC2A4\uD0C0"]},{name:"\uBB3C\uAC74",words:["\uC6B0\uC0B0","\uB0C9\uC7A5\uACE0","\uCE6B\uC194","\uC548\uACBD","\uB9AC\uBAA8\uCEE8","\uD734\uB300\uD3F0","\uBCA0\uAC1C","\uAC00\uC704","\uAC70\uC6B8","\uC9C0\uAC11","\uC774\uC5B4\uD3F0","\uC120\uD48D\uAE30","\uC190\uD1B1\uAE4E\uC774","\uB4DC\uB77C\uC774\uAE30"]},{name:"\uC2A4\uD3EC\uCE20",words:["\uCD95\uAD6C","\uC57C\uAD6C","\uB18D\uAD6C","\uBC30\uB4DC\uBBFC\uD134","\uBCFC\uB9C1","\uC218\uC601","\uD0DC\uAD8C\uB3C4","\uC2A4\uD0A4","\uD0C1\uAD6C","\uACE8\uD504","\uB9C8\uB77C\uD1A4","\uD074\uB77C\uC774\uBC0D","\uBCF5\uC2F1","\uB2F9\uAD6C"]},{name:"\uB098\uB77C\xB7\uB3C4\uC2DC",words:["\uC77C\uBCF8","\uBBF8\uAD6D","\uD504\uB791\uC2A4","\uC774\uD0C8\uB9AC\uC544","\uBCA0\uD2B8\uB0A8","\uD638\uC8FC","\uC774\uC9D1\uD2B8","\uBE0C\uB77C\uC9C8","\uC2A4\uC704\uC2A4","\uC81C\uC8FC\uB3C4","\uBD80\uC0B0","\uB274\uC695","\uD30C\uB9AC","\uD558\uC640\uC774"]},{name:"\uC601\uD654\xB7\uB4DC\uB77C\uB9C8",words:["\uAE30\uC0DD\uCDA9","\uC624\uC9D5\uC5B4 \uAC8C\uC784","\uD0C0\uC774\uD0C0\uB2C9","\uACA8\uC6B8\uC655\uAD6D","\uD574\uB9AC\uD3EC\uD130","\uC5B4\uBCA4\uC838\uC2A4","\uBC94\uC8C4\uB3C4\uC2DC","\uC778\uC0AC\uC774\uB4DC \uC544\uC6C3","\uB354 \uAE00\uB85C\uB9AC","\uC751\uB2F5\uD558\uB77C 1988","\uC774\uC0C1\uD55C \uBCC0\uD638\uC0AC \uC6B0\uC601\uC6B0","\uC544\uBC14\uD0C0","\uBD80\uC0B0\uD589","\uADF9\uD55C\uC9C1\uC5C5"]}];function zw(){return wo.concat(C.topics.filter(function(n){return n.name&&Array.isArray(n.words)&&n.words.length>=2}).map(function(n){return{name:n.name,words:n.words}}))}function Gw(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function So(n,e,t){let r=Gw(e),i=n[Math.floor(r()*n.length)],s=Math.floor(r()*t.length),a=Math.floor(r()*(t.length-1));a>=s&&a++;let c=n.slice();for(let l=c.length-1;l>0;l--){let d=Math.floor(r()*(l+1)),m=c[l];c[l]=c[d],c[d]=m}return c[0]===i&&c.push(c.shift()),{liar:i,word:t[s],fool:t[a],order:c}}function Kw(n){return!n||!n.topic||!Array.isArray(n.lineup)||!n.lineup.length?null:So(n.lineup,n.seed,n.topic.words)}function Io(n){return String(n||"").replace(/\s+/g,"").toLowerCase()}function Ww(){Wt(Re(ee,"config","boss"),function(e){C.bossUid=e.exists()?e.data().uid:null,C.bossKnown=!0,X()},function(){C.bossKnown=!0,X()}),Wt(Ke(ee,"members"),function(e){C.members=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(Lw),C.membersReady=!0,X()},function(){C.membersReady=!0,X()}),Wt(Ke(ee,"liarTopics"),function(e){C.topics=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(function(t,r){return(t.order||0)-(r.order||0)}),X()}),Wt(fo(Ke(ee,"guestbook"),po("createdAt","desc"),mo(150)),function(e){C.guest=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),C.guestReady=!0,X()},function(){C.guestReady=!0,X()});let n=pe.fromMillis(Date.now()-12*3600*1e3);Wt(fo(Ke(ee,"rooms"),xp("createdAt",">",n),po("createdAt","desc"),mo(20)),function(e){C.rooms=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}),C.roomsReady=!0,X()},function(){C.roomsReady=!0,X()})}var yo=[];function Kp(n){C.roomId!==n&&(yo.forEach(function(e){e()}),yo=[],C.roomId=n,C.room=null,C.roomMissing=!1,C.msgs=[],n&&(yo.push(Wt(Re(ee,"rooms",n),function(e){C.room=e.exists()?Object.assign({id:e.id},e.data()):null,C.roomMissing=!e.exists(),X()})),yo.push(Wt(fo(Ke(ee,"rooms",n,"msgs"),po("createdAt"),mo(400)),function(e){C.msgs=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),X()}))))}Ha(er,function(n){C.user=n,n||Ka(er).catch(function(){Y("\uBCF8\uBD80\uC5D0 \uC5F0\uACB0\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694.")}),X()});async function Hw(){try{await $a(er,new kt),Y("\uAD6C\uAE00 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uC5B4\uC694.")}catch(n){let e=n&&n.code||"";if(e.indexOf("popup-closed")>=0||e.indexOf("cancelled")>=0)return;e.indexOf("popup-blocked")>=0?Y("\uD31D\uC5C5\uC774 \uB9C9\uD614\uC5B4\uC694. \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uD31D\uC5C5\uC744 \uD5C8\uC6A9\uD574 \uC8FC\uC138\uC694."):e.indexOf("unauthorized-domain")>=0?Y("\uC774 \uC8FC\uC18C\uAC00 Firebase \uC2B9\uC778\uB41C \uB3C4\uBA54\uC778\uC5D0 \uC5C6\uC5B4\uC694."):Y("\uB85C\uADF8\uC778\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.")}}async function yl(){await Qa(er),Y("\uB85C\uADF8\uC544\uC6C3\uD588\uC5B4\uC694.")}async function Qw(){try{await hi(Re(ee,"config","boss"),{uid:Eo(),since:_n()}),Y("\uC774 \uACC4\uC815\uC774 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uB410\uC5B4\uC694.")}catch(n){Y(_e(n))}}async function Yw(){if(!C.importing){C.importing=!0,X();try{let e=await(await fetch("seed.json",{cache:"no-store"})).json(),t=Op(ee);(e.members||[]).forEach(function(r){let i=Object.assign({},r);delete i.id,t.set(Re(ee,"members",r.id),i)}),(e.liarTopics||[]).forEach(function(r,i){t.set(Re(Ke(ee,"liarTopics")),{name:r.name,words:r.words,order:i+1})}),await t.commit(),Y("\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D\uC744 \uBAA8\uB450 \uAC00\uC838\uC654\uC5B4\uC694.")}catch(n){Y(_e(n))}C.importing=!1,X()}}function Jw(){let n=C.members.length,e=C.rooms.filter(function(t){return t.status&&t.status!=="closed"}).length;return f("section",{class:"screen"},n?f("div",{class:"whoami"},f("div",null,f("span",{class:"eyebrow",text:"\uD604\uC7AC \uC2E0\uC6D0"}),f("b",{text:qw()})),f("button",{class:"ghost",type:"button",onclick:function(){El(null),X()},text:"\uC2E0\uC6D0 \uBCC0\uACBD"})):null,f("div",{class:"cover"},f("div",{class:"cover-meta"},f("span",{class:"eyebrow",text:"\uBB38\uC11C\uBC88\uD638 BF-HQ-001"}),f("span",{class:"eyebrow",text:"\uC5F4\uB78C \uC81C\uD55C \xB7 \uC870\uC9C1\uC6D0 \uC804\uC6A9"})),f("div",{class:"stamp","aria-hidden":"true",text:"\uADF9\uBE44"}),f("div",{class:"cover-title"},Tl("logo-l"),f("h1",null,f("span",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"}),"\uBE44\uBC00\uBCF8\uBD80")),f("p",{class:"motto"},f("q",{text:Vw}),f("small",{text:"\uC870\uC9C1 \uAC15\uB839 \uC81C1\uC870"}))),f("div",{class:"actions"},f("button",{class:"btn primary",type:"button",onclick:function(){De("members")}},f("span",null,f("small",{text:"\uBA85\uBD80 \uC5F4\uB78C"}),"\uC870\uC9C1\uC6D0 \uBCF4\uAE30"),f("span",{class:"arr",text:"\u2192"})),f("button",{class:"btn",type:"button",onclick:function(){De("games")}},f("span",null,f("small",{text:"\uD734\uAC8C \uAD6C\uC5ED"}),"\uAC8C\uC784\uBC29"),f("span",{class:"arr",text:"\u2192"}))),f("div",{class:"ledger"},f("div",null,f("b",{text:String(n)}),f("span",{text:"\uB4F1\uB85D \uC870\uC9C1\uC6D0"})),f("div",null,f("b",{text:String(e)}),f("span",{text:"\uC5F4\uB9B0 \uAC8C\uC784\uBC29"})),f("div",null,f("b",{text:String(C.guest.length)}),f("span",{text:"\uBC29\uBA85\uB85D"}))),f("details",{class:"guide"},f("summary",{text:"\uBCF8\uBD80\uB97C \uD648 \uD654\uBA74\uC5D0 \uB450\uB294 \uBC95"}),f("div",{class:"guide-body"},f("div",null,f("h3",{text:"\uC544\uC774\uD3F0 (Safari)"}),f("ol",null,f("li",{text:"\uC774 \uC8FC\uC18C\uB97C Safari\uB85C \uC5FD\uB2C8\uB2E4."}),f("li",{text:"\uC544\uB798\uCABD \uACF5\uC720 \uBC84\uD2BC(\uB124\uBAA8\uC5D0 \uD654\uC0B4\uD45C)\uC744 \uB204\uB985\uB2C8\uB2E4."}),f("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))),f("div",null,f("h3",{text:"\uC548\uB4DC\uB85C\uC774\uB4DC (Chrome)"}),f("ol",null,f("li",{text:"\uC774 \uC8FC\uC18C\uB97C Chrome\uC73C\uB85C \uC5FD\uB2C8\uB2E4."}),f("li",{text:"\uC624\uB978\uCABD \uC704 \u22EE \uBA54\uB274\uB97C \uB204\uB985\uB2C8\uB2E4."}),f("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019 \uB610\uB294 \u2018\uC571 \uC124\uCE58\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))))),$w())}function $w(){let n=C.user;return!n||n.isAnonymous?f("div",{class:"boss-row"},f("button",{type:"button",class:"link-btn",onclick:Hw,text:"\uB450\uBAA9 \uB85C\uADF8\uC778"})):C.bossKnown&&!C.bossUid?f("div",{class:"panel"},f("div",{class:"field-label",text:"\uB450\uBAA9 \uB4F1\uB85D"}),f("p",{class:"note",text:"\uC544\uC9C1 \uB450\uBAA9\uC774 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC558\uC5B4\uC694. \uC9C0\uAE08 \uB85C\uADF8\uC778\uD55C \uAD6C\uAE00 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uD560\uAE4C\uC694? \uD55C \uBC88 \uB4F1\uB85D\uD558\uBA74 \uC774 \uACC4\uC815\uB9CC \uC870\uC9C1\uC6D0\uACFC \uC8FC\uC81C\uB97C \uACE0\uCE60 \uC218 \uC788\uC5B4\uC694."}),f("button",{type:"button",class:"save",onclick:Qw,text:"\uC774 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D"}),f("button",{type:"button",class:"link-btn",onclick:yl,text:"\uB85C\uADF8\uC544\uC6C3"})):tr()?f("div",{class:"boss-row"},C.members.length===0&&C.membersReady?f("button",{type:"button",class:"save",disabled:C.importing,onclick:Yw,text:C.importing?"\uAC00\uC838\uC624\uB294 \uC911\u2026":"\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D \uAC00\uC838\uC624\uAE30"}):null,f("span",{class:"note",text:"\uB450\uBAA9\uC73C\uB85C \uB85C\uADF8\uC778\uB428"}),f("button",{type:"button",class:"link-btn",onclick:yl,text:"\uB85C\uADF8\uC544\uC6C3"})):f("div",{class:"boss-row"},f("span",{class:"note",text:"\uC774 \uAD6C\uAE00 \uACC4\uC815\uC740 \uB450\uBAA9\uC774 \uC544\uB2C8\uC5D0\uC694."}),f("button",{type:"button",class:"link-btn",onclick:yl,text:"\uB85C\uADF8\uC544\uC6C3"}))}function Xw(){let n=C.pick&&vt(C.pick);return f("section",{class:"gate"},Tl("logo-g"),f("div",null,f("span",{class:"eyebrow",text:"\uCD9C\uC785 \uD1B5\uC81C \xB7 \uC2E0\uC6D0 \uD655\uC778"}),f("h1",null,"\uBCF8\uBD80\uC5D0 \uB4E4\uC5B4\uC624\uB824\uBA74",f("br"),f("em",{text:"\uC2E0\uC6D0"}),"\uC744 \uBC1D\uD600\uB77C."),f("p",{text:"\uC790\uAE30 \uCE74\uB4DC\uB97C \uD55C \uBC88\uB9CC \uACE0\uB974\uBA74 \uC774 \uD3F0\uC774 \uAE30\uC5B5\uD574\uC694. \uAC8C\uC784\uACFC \uBC29\uBA85\uB85D\uC5D0\uC11C \uC774 \uC774\uB984\uC744 \uC368\uC694."})),f("div",{class:"pick",role:"group","aria-label":"\uC870\uC9C1\uC6D0 \uC120\uD0DD"},C.members.map(function(e){return f("button",{type:"button","aria-pressed":C.pick===e.id?"true":"false",onclick:function(){C.pick=e.id,X()}},f("div",{class:"pp"},wn(e)),f("span",{class:"pn",text:e.nick}))})),f("button",{class:"save",type:"button",disabled:!n,onclick:function(){n&&(El(n.id),C.pick=null,X(),Y("\u2018"+n.nick+"\u2019 \uC2E0\uC6D0\uC73C\uB85C \uC785\uC7A5\uD588\uC5B4\uC694."))}},n?"\u2018"+n.nick+"\u2019 \uC2E0\uBD84\uC73C\uB85C \uC785\uC7A5":"\uC704\uC5D0\uC11C \uC790\uAE30 \uCE74\uB4DC\uB97C \uACE0\uB974\uC138\uC694"),f("button",{class:"guest-btn",type:"button",onclick:function(){El("guest"),C.pick=null,X()},text:"\uBA85\uBD80\uC5D0 \uC544\uC9C1 \uC5C6\uC5B4\uC694 \xB7 \uC190\uB2D8\uC73C\uB85C \uC785\uC7A5"}))}function Zw(){let n=C.members,e=n.length?f("div",{class:"roster"},n.map(function(t){return f("button",{class:"card",type:"button","aria-label":t.nick+" \uC218\uBC30\uC11C \uC5F4\uAE30",onclick:function(){De("m-"+t.id)}},f("div",{class:"card-photo"},wn(t),f("span",{class:"tag"+(t.rank?" boss":""),text:t.rank||"\uC218\uBC30\uC911"}),Ao()===t.id?f("span",{class:"me-tag",text:"\uBCF8\uC778"}):null),f("div",{class:"card-body"},f("span",{class:"card-no",text:bo(t)}),f("span",{class:"card-name",text:t.nick}),t.alias?f("span",{class:"card-alias",text:"\uC77C\uBA85 "+t.alias}):null))})):f("div",{class:"empty",text:C.membersReady?"\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC870\uC9C1\uC6D0\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.":"\uBA85\uBD80\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return f("section",{class:"screen"},f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"\uC870\uC9C1\uC6D0 \uBA85\uBD80"}),f("h2",{text:"\uC218\uBC30 \uB300\uC0C1 "+n.length+"\uBA85"}),f("p",{text:"\uCE74\uB4DC\uB97C \uB204\uB974\uBA74 \uC218\uBC30\uC11C\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4."})),tr()?f("button",{class:"add-btn",type:"button",onclick:function(){Jp(null)},text:"\uC870\uC9C1\uC6D0 \uB4F1\uB85D"}):null),e)}function eI(n){let e=vt(n);if(!e)return f("section",{class:"screen"},f("button",{class:"back",type:"button",onclick:function(){De("members")},text:"\uBA85\uBD80\uB85C"}),f("div",{class:"empty",text:C.membersReady?"\uC774 \uC218\uBC30\uC11C\uB294 \uD3D0\uAE30\uB418\uC5C8\uAC70\uB098 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.":"\uC218\uBC30\uC11C\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"}));let t=(e.charges||[]).filter(function(a){return a&&String(a).trim()}),r=f("div",{class:"ruler","aria-hidden":"true"},["190","180","170","160","150","140","130","120","110","100"].map(function(a){return f("span",{text:a})})),i=f("article",{class:"poster","aria-label":e.nick+" \uC218\uBC30\uC11C"},f("header",{class:"poster-top"},f("div",{class:"w",text:"\uC218\uBC30"}),f("div",{class:"sub",text:e.rank==="\uB450\uBAA9"?"WANTED \xB7 1\uAE09 \uC218\uBC30 \xB7 \uC870\uC9C1 \uB450\uBAA9":"WANTED \xB7 \uBD88\uC8FC\uBA39\uC870\uC9C1 \uB0B4\uBD80 \uC218\uBC30\uC11C"})),f("div",{class:"case"},f("span",null,"\uC0AC\uAC74\uBC88\uD638 ",f("b",{text:bo(e)})),f("span",null,"\uC9C1\uC704 ",f("b",{text:e.rank||"\uC870\uC9C1\uC6D0"}))),f("div",{class:"mug"},wn(e),r,f("i",{class:"corner tl"}),f("i",{class:"corner tr"}),f("i",{class:"corner bl"}),f("i",{class:"corner br"})),f("div",{class:"ident"},f("div",{class:"eyebrow",text:"\uB2C9\uB124\uC784"}),f("div",{class:"nick",text:e.nick}),e.alias?f("div",{class:"alias"},"\uC77C\uBA85 ",f("b",{text:"\u2018"+e.alias+"\u2019"})):null),f("div",{class:"field"},f("div",{class:"field-label",text:"\uBCF8\uC778 \uC9C4\uC220"}),f("p",{class:"statement",text:e.intro?"\u201C"+e.intro+"\u201D":"\uC9C4\uC220\uC744 \uAC70\uBD80\uD558\uACE0 \uC788\uC74C."})),f("div",{class:"field"},f("div",{class:"field-label",text:"\uD610\uC758 "+t.length+"\uAC74"}),t.length?f("ol",{class:"charges"},t.map(function(a){return f("li",{text:a})})):f("p",{class:"statement",text:"\uC544\uC9C1 \uB4DC\uB7EC\uB09C \uD610\uC758 \uC5C6\uC74C. \uC218\uC0AC \uC911."})),e.sample?f("div",{class:"draft-note",text:"\uC784\uC2DC \uAE30\uB85D \xB7 \uB450\uBAA9\uC774 \uACE7 \uCC44\uC6B8 \uC608\uC815"}):null,f("div",{class:"stamp","aria-hidden":"true",text:"\uD655\uC778"}),f("footer",{class:"poster-foot"},f("span",{text:"\uC81C\uBCF4\uCC98: \uBD88\uC8FC\uBA39\uC870\uC9C1 \uBE44\uBC00\uBCF8\uBD80"}),f("span",{text:"\uBCF8 \uBB38\uC11C\uB294 \uC870\uC9C1\uC6D0 \uC678 \uC5F4\uB78C\uC744 \uAE08\uD568"}))),s=null;return tr()&&(s=C.confirmDelete?f("div",{class:"confirm"},f("p",{text:"\u2018"+e.nick+"\u2019 \uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD560\uAE4C\uC694? \uBAA8\uB4E0 \uC870\uC9C1\uC6D0 \uD654\uBA74\uC5D0\uC11C \uC0AC\uB77C\uC9D1\uB2C8\uB2E4."}),f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){C.confirmDelete=!1,X()},text:"\uCDE8\uC18C"}),f("button",{type:"button",class:"danger",onclick:async function(){try{await di(Re(ee,"members",e.id)),C.confirmDelete=!1,De("members"),Y("\uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD588\uC5B4\uC694.")}catch(a){Y(_e(a))}},text:"\uD3D0\uAE30\uD558\uAE30"}))):f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){Jp(e)},text:"\uC218\uBC30\uC11C \uC218\uC815"}),f("button",{type:"button",class:"danger",onclick:function(){C.confirmDelete=!0,X()},text:"\uD3D0\uAE30"}))),f("section",{class:"screen"},f("button",{class:"back",type:"button",onclick:function(){De("members")},text:"\uBA85\uBD80\uB85C"}),i,s)}var tI=[{id:"assoc",code:"G-01",name:"\uC5F0\uC0C1\uD034\uC988",desc:"\uB2E8\uC5B4 \uD558\uB098\uB85C \uB5A0\uC62C\uB9AC\uB294 \uC870\uC9C1\uC6D0\uB4E4\uC758 \uBA38\uB9BF\uC18D.",ready:!1},{id:"mafia",code:"G-02",name:"\uB9C8\uD53C\uC544",desc:"\uC870\uC9C1 \uC548\uC5D0 \uC870\uC9C1\uC774 \uC788\uB2E4. \uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC529.",ready:!1},{id:"yut",code:"G-03",name:"\uC737\uB180\uC774",desc:"\uB3C4\xB7\uAC1C\xB7\uAC78\xB7\uC737\xB7\uBAA8\uB85C \uAC00\uB9AC\uB294 \uBCF8\uBD80 \uC11C\uC5F4.",ready:!1},{id:"liar",code:"G-04",name:"\uB77C\uC774\uC5B4",desc:"\uD63C\uC790\uB9CC \uC81C\uC2DC\uC5B4\uB97C \uBAA8\uB974\uB294 \uC0AC\uB78C\uC744 \uCC3E\uC544\uB77C.",ready:!0}];function nI(){return f("section",{class:"screen"},f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"\uD734\uAC8C \uAD6C\uC5ED"}),f("h2",{text:"\uAC8C\uC784\uBC29"}),f("p",{text:"\uAC8C\uC784\uC740 \uD558\uB098\uC529 \uC21C\uC11C\uB300\uB85C \uC5F4\uB9BD\uB2C8\uB2E4."}))),f("div",{class:"games"},tI.map(function(n){return f("button",{class:"game"+(n.ready?" ready":""),type:"button",disabled:!n.ready,"aria-label":n.name+(n.ready?" \uC5F4\uAE30":" \uC900\uBE44 \uC911"),onclick:n.ready?function(){De("game-"+n.id)}:null},f("span",{class:"code",text:n.code}),f("h3",{text:n.name}),f("p",{text:n.desc}),f("span",{class:"status",text:n.ready?"\uC785\uC7A5 \uAC00\uB2A5":"\uC900\uBE44 \uC911"}))})))}var Wp={lobby:"\uB300\uAE30 \uC911",hint:"\uC124\uBA85 \uC911",vote:"\uD22C\uD45C \uC911",guess:"\uB77C\uC774\uC5B4 \uBC18\uACA9",result:"\uACB0\uACFC \uBC1C\uD45C"};function rI(){let n=at(),e=C.rooms.filter(function(r){return r.status&&r.status!=="closed"}),t=e.length?f("ul",{class:"room-list"},e.map(function(r){let i=n&&(r.players||[]).indexOf(n.id)>=0;return f("li",null,f("button",{type:"button",class:"room-item",onclick:function(){De("room-"+r.id)}},f("span",{class:"ri-main"},f("b",{text:Oe(r.createdBy)+"\uC758 \uBC29"}),f("span",{class:"ri-sub",text:(r.players||[]).map(Oe).join(", ")||"\uC544\uC9C1 \uC544\uBB34\uB3C4 \uC5C6\uC5B4\uC694"})),f("span",{class:"ri-side"},f("span",{class:"status-chip"+(r.status==="lobby"?" open":""),text:Wp[r.status]||r.status}),f("span",{class:"ri-sub",text:(r.players||[]).length+"\uBA85"+(i?" \xB7 \uCC38\uAC00 \uC911":"")}))))})):f("div",{class:"empty",text:C.roomsReady?"\uC5F4\uB9B0 \uBC29\uC774 \uC5C6\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC870\uC9C1\uC6D0\uC744 \uBD88\uB7EC \uBAA8\uC73C\uC138\uC694.":"\uBC29 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return f("section",{class:"screen"},f("button",{class:"back",type:"button",onclick:function(){De("games")},text:"\uAC8C\uC784\uBC29\uC73C\uB85C"}),f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"G-04"}),f("h2",{text:"\uB77C\uC774\uC5B4"}),f("p",{text:"\uBC29\uC744 \uB9CC\uB4E4\uAC70\uB098 \uC5F4\uB9B0 \uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uC138\uC694. \uC124\uBA85\uACFC \uD22C\uD45C\uB294 \uBAA8\uB450 \uAC8C\uC784 \uC548\uC5D0\uC11C \uD574\uC694."}))),f("button",{type:"button",class:"save",disabled:!n||!C.user,onclick:sI},n?"\uC0C8 \uBC29 \uB9CC\uB4E4\uAE30":"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uBC29\uC744 \uB9CC\uB4E4 \uC218 \uC788\uC5B4\uC694"),f("div",{class:"field"},f("div",{class:"field-label",text:"\uC5F4\uB9B0 \uBC29"}),t),iI(),tr()?vI():null)}function iI(){return f("details",{class:"guide"},f("summary",{text:"\uB77C\uC774\uC5B4 \uAC8C\uC784 \uADDC\uCE59"}),f("div",{class:"guide-body"},f("ol",null,f("li",{text:"\uBC29\uC744 \uB9CC\uB4E4\uACE0 \uB2E8\uD1A1\uBC29\uC5D0 \uC54C\uB824\uC694. \uB2E4\uB4E4 \uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0\uC11C \uADF8 \uBC29\uC744 \uB20C\uB7EC \uCC38\uAC00\uD574\uC694."}),f("li",{text:"3\uBA85 \uC774\uC0C1 \uBAA8\uC774\uBA74 \uC544\uBB34\uB098 \u2018\uAC8C\uC784 \uC2DC\uC791\u2019\uC744 \uB20C\uB7EC\uC694. \uB9CC\uB4E0 \uC0AC\uB78C\uB3C4 \uB77C\uC774\uC5B4\uAC00 \uB204\uAD70\uC9C0 \uBAB0\uB77C\uC694."}),f("li",{text:"\uAC01\uC790 \uCE74\uB4DC\uB97C \uBAB0\uB798 \uD655\uC778\uD574\uC694. \uB77C\uC774\uC5B4\uC5D0\uAC8C\uB294 \uC8FC\uC81C\uB9CC \uBCF4\uC5EC\uC694."}),f("li",{text:"\uC790\uAE30 \uCC28\uB840\uAC00 \uC624\uBA74 \uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD574\uC694. \uB2E8\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uBA74 \uC548 \uB3FC\uC694."}),f("li",{text:"\uC124\uBA85\uC774 \uB05D\uB098\uBA74 \uB77C\uC774\uC5B4\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC5D0\uAC8C \uD22C\uD45C\uD574\uC694."}),f("li",{text:"\uB77C\uC774\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4\uC5D0\uAC8C \uB9C8\uC9C0\uB9C9 \uAE30\uD68C\uAC00 \uC788\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC, \uBABB \uB9DE\uD788\uBA74 \uC870\uC9C1\uC6D0 \uC2B9\uB9AC. \uB3D9\uC810\uC774\uAC70\uB098 \uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD558\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC\uC608\uC694."})),f("p",{class:"note",text:"\uBC14\uBCF4 \uBAA8\uB4DC\uC5D0\uC11C\uB294 \uB77C\uC774\uC5B4\uB3C4 \uAC19\uC740 \uC8FC\uC81C\uC758 \uB2E4\uB978 \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC11C, \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778\uC9C0 \uBAA8\uB978 \uCC44 \uC124\uBA85\uD574\uC694."})))}async function sI(){let n=at();if(!(!n||!C.user))try{let e=await fi(Ke(ee,"rooms"),{status:"lobby",createdAt:_n(),createdBy:n.id,players:[n.id],mode:0,topicChoice:-1,rounds:1,game:0,votes:{},turn:0});De("room-"+e.id)}catch(e){Y(_e(e))}}function Be(){return Re(ee,"rooms",C.roomId)}async function yi(n){try{await ml(Be(),n)}catch(e){Y(_e(e))}}async function oI(){let n=at();n&&await yi({players:Np(n.id)})}async function aI(){let n=at(),e=C.room;if(!n||!e)return;let t=(e.players||[]).filter(function(r){return r!==n.id});await yi(t.length?{players:gl(n.id)}:{players:gl(n.id),status:"closed"}),De("game-liar")}async function cI(){let n=zw();try{await mi(ee,async function(e){let r=(await e.get(Be())).data();if(!r||r.status!=="lobby")throw{code:"phase"};let i=(r.players||[]).filter(function(l){return!!vt(l)}).slice().sort();if(i.length<3)throw{code:"few"};let s=r.topicChoice>=0&&wo[r.topicChoice]?wo[r.topicChoice]:n[Math.floor(Math.random()*n.length)],a=Math.floor(Math.random()*2147483647),c=So(i,a,s.words);e.update(Be(),{status:"hint",lineup:i,seed:a,topic:{name:s.name,words:s.words},order:c.order,turn:0,votes:{},accused:null,guess:null,winner:null,reason:null,game:(r.game||0)+1,startedAt:_n()})}),C.flipped={}}catch(e){e&&e.code==="few"?Y("3\uBA85 \uC774\uC0C1 \uBAA8\uC5EC\uC57C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."):e&&e.code==="phase"?Y("\uC774\uBBF8 \uAC8C\uC784\uC774 \uC2DC\uC791\uB410\uC5B4\uC694."):Y(_e(e))}}async function uI(n,e){let t=at(),r=C.room,i=t?t.nick:"\uC190\uB2D8";return fi(Ke(ee,"rooms",C.roomId,"msgs"),{uid:Eo(),memberId:t?t.id:null,nick:i,text:e,kind:n,game:r&&r.game||0,createdAt:_n()})}async function Fp(n,e){let t=at();await mi(ee,async function(r){let s=(await r.get(Be())).data();if(!s||s.status!=="hint")throw{code:"phase"};let a=s.order.length,c=s.order[s.turn%a];if(n==="hint"&&c!==(t&&t.id))throw{code:"turn"};let l=Re(Ke(ee,"rooms",C.roomId,"msgs"));r.set(l,{uid:Eo(),memberId:t?t.id:null,nick:t?t.nick:"\uC190\uB2D8",text:n==="hint"?e:Oe(c)+" \uCC28\uB840\uB97C \uB118\uACBC\uC5B4\uC694.",kind:n,game:s.game||0,round:Math.floor(s.turn/a)+1,speaker:c,createdAt:_n()});let d=s.turn+1;r.update(Be(),d>=a*(s.rounds||1)?{turn:d,status:"vote"}:{turn:d})})}async function lI(n){let e=at();if(e)try{await ml(Be(),{["votes."+e.id]:n}),await Hp(!1)}catch(t){Y(_e(t))}}async function Hp(n){try{await mi(ee,async function(e){let r=(await e.get(Be())).data();if(!r||r.status!=="vote")return;let i=r.votes||{},s=r.lineup||[],a=s.filter(function(v){return i[v]});if(!n&&a.length<s.length)return;let c=So(s,r.seed,r.topic.words),l={};a.forEach(function(v){l[i[v]]=(l[i[v]]||0)+1});let d=0;Object.keys(l).forEach(function(v){l[v]>d&&(d=l[v])});let m=Object.keys(l).filter(function(v){return l[v]===d});a.length?m.length>1?e.update(Be(),{status:"result",winner:"liar",accused:null,reason:"\uD45C\uAC00 \uB611\uAC19\uC774 \uAC08\uB824\uC11C \uB77C\uC774\uC5B4\uB97C \uC7A1\uC9C0 \uBABB\uD588\uC5B4\uC694."}):m[0]!==c.liar?e.update(Be(),{status:"result",winner:"liar",accused:m[0],reason:"\uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD588\uC5B4\uC694."}):e.update(Be(),{status:"guess",accused:m[0]}):e.update(Be(),{status:"result",winner:"liar",accused:null,reason:"\uC544\uBB34\uB3C4 \uD22C\uD45C\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694."})})}catch(e){Y(_e(e))}}async function _l(n){await mi(ee,async function(e){let r=(await e.get(Be())).data();if(!r||r.status!=="guess")return;let i=So(r.lineup,r.seed,r.topic.words),s=n&&Io(n)===Io(i.word);e.update(Be(),{status:"result",guess:n||"",winner:s?"liar":"team",reason:s?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD614\uC5B4\uC694.":n?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uC9C0 \uBABB\uD588\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uAC00 \uB9DE\uD788\uAE30\uB97C \uD3EC\uAE30\uD588\uC5B4\uC694."})})}async function Qp(){await yi({status:"lobby",votes:{},accused:null,guess:null,winner:null,reason:null,turn:0,order:[],lineup:[],topic:null})}function hI(n){Kp(n);let e=f("button",{class:"back",type:"button",onclick:function(){De("game-liar")},text:"\uB77C\uC774\uC5B4 \uBC29 \uBAA9\uB85D"});if(C.roomMissing)return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uAC70\uB098 \uC5C6\uC5B4\uC694."}));let t=C.room;if(!t)return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uB294 \uC911\u2026"}));if(t.status==="closed")return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC8FC\uC138\uC694."}));let r=at(),i=t.players||[],s=r&&i.indexOf(r.id)>=0,a=t.status!=="lobby",c=a?t.lineup||[]:i,l=r&&c.indexOf(r.id)>=0,d=a?Kw(t):null;if(a&&!d)return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uAC8C\uC784 \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694. \u2018\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354\u2019\uB85C \uB2E4\uC2DC \uC2DC\uC791\uD574 \uC8FC\uC138\uC694."}),f("button",{type:"button",class:"ghost wide",onclick:Qp,text:"\uB300\uAE30\uC2E4\uB85C \uB3CC\uB9AC\uAE30"}));let m=f("div",{class:"room-head"},f("div",null,f("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4 \xB7 "+Oe(t.createdBy)+"\uC758 \uBC29"}),f("h2",{text:Wp[t.status]||""})),f("span",{class:"mode-chip",text:(t.mode===1?"\uBC14\uBCF4 \uBAA8\uB4DC":"\uC77C\uBC18 \uBAA8\uB4DC")+" \xB7 "+(t.rounds||1)+"\uBC14\uD034"})),v=f("div",{class:"chips"},c.map(function(V){let k=t.status==="vote"&&t.votes&&t.votes[V];return f("span",{class:"chip static"+(r&&V===r.id?" me":"")+(k?" done":"")},Oe(V)+(k?" \u2713":""))})),b;t.status==="lobby"?b=dI(t,r,s,i):t.status==="hint"?b=pI(t,r,l,d):t.status==="vote"?b=mI(t,r,l):t.status==="guess"?b=gI(t,r,d):b=yI(t,d,r,l);let R=a&&l&&t.status!=="result"?fI(t,r,d):null,D=a||C.msgs.length;return f("section",{class:"screen room"},e,m,f("div",{class:"field"},f("div",{class:"field-label",text:(a?"\uCC38\uAC00\uC790 ":"\uBAA8\uC778 \uC0AC\uB78C ")+c.length+"\uBA85"}),v),R,b,D?_I(t,r):null)}function dI(n,e,t,r){function i(c,l,d,m){return f("button",{type:"button","aria-pressed":(n[c]||(c==="rounds"?1:0))===l?"true":"false",onclick:function(){let v={};v[c]=l,yi(v)}},d,m?f("small",{text:m}):null)}let s=f("select",{id:"room-topic",class:"select"},f("option",{value:"-1",text:"\uB79C\uB364 (\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C \uD3EC\uD568)"}),wo.map(function(c,l){return f("option",{value:String(l),text:c.name})}));s.value=String(n.topicChoice==null?-1:n.topicChoice),s.addEventListener("change",function(){yi({topicChoice:parseInt(s.value,10)})});let a=r.length>=3;return f("div",{class:"panel"},f("div",{class:"field-label",text:"\uAC8C\uC784 \uC124\uC815 \xB7 \uCC38\uAC00\uC790 \uB204\uAD6C\uB098 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694"}),f("div",{class:"seg"},i("mode",0,"\uC77C\uBC18","\uB77C\uC774\uC5B4\uB294 \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778 \uAC78 \uC54C\uC544\uC694"),i("mode",1,"\uBC14\uBCF4","\uB77C\uC774\uC5B4\uB3C4 \uBE44\uC2B7\uD55C \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC694")),f("div",{class:"seg"},i("rounds",1,"\uC124\uBA85 1\uBC14\uD034"),i("rounds",2,"\uC124\uBA85 2\uBC14\uD034")),f("label",{class:"sub-label",for:"room-topic",text:"\uC8FC\uC81C"}),s,e?t?f("div",{class:"op-row"},f("button",{type:"button",onclick:aI,text:"\uBC29 \uB098\uAC00\uAE30"}),f("button",{type:"button",class:"go",disabled:!a,onclick:cI,text:a?"\uAC8C\uC784 \uC2DC\uC791":"3\uBA85\uBD80\uD130 \uC2DC\uC791"})):f("button",{type:"button",class:"save",onclick:oI,text:"\uC774 \uBC29\uC5D0 \uCC38\uAC00\uD558\uAE30"}):f("p",{class:"note",text:"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uCC38\uAC00\uD560 \uC218 \uC788\uC5B4\uC694. \uC190\uB2D8\uC740 \uAD6C\uACBD\uACFC \uCC44\uD305\uB9CC \uD560 \uC218 \uC788\uC5B4\uC694."}),f("p",{class:"hint",text:"\uB2E8\uD1A1\uBC29\uC5D0 \u2018\uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0 \uBC29 \uC5F4\uC5C8\uC5B4\uC694\u2019\uB77C\uACE0 \uC54C\uB824\uC8FC\uC138\uC694."}))}function fI(n,e,t){let r=n.id+":"+n.game;if(!C.flipped[r])return f("button",{type:"button",class:"secret-card face-down",onclick:function(){C.flipped[r]=!0,X()}},f("span",{class:"sc-eyebrow",text:"\uADF9\uBE44 \xB7 "+e.nick+" \uC804\uC6A9"}),f("span",{class:"sc-big",text:"\uCE74\uB4DC \uB4A4\uC9D1\uAE30"}),f("span",{class:"sc-hint",text:"\uB0B4 \uC81C\uC2DC\uC5B4\uB97C \uD655\uC778\uD558\uC138\uC694."}));let i=t.liar===e.id,s=i&&n.mode===0;return f("div",{class:"secret-card front compact"+(s?" liar":"")},f("span",{class:"sc-eyebrow",text:"\uC8FC\uC81C \xB7 "+n.topic.name}),f("span",{class:"sc-big",text:s?"\uB2F9\uC2E0\uC740 \uB77C\uC774\uC5B4":i?t.fool:t.word}),f("span",{class:"sc-hint",text:s?"\uC81C\uC2DC\uC5B4\uB97C \uBAB0\uB77C\uC694. \uB4E4\uD0A4\uC9C0 \uC54A\uAC8C \uB458\uB7EC\uB300\uC138\uC694.":"\uB2E8\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uC9C0 \uB9D0\uACE0 \uC124\uBA85\uD558\uC138\uC694."}),f("button",{type:"button",class:"ghost",onclick:function(){C.flipped[r]=!1,X()},text:"\uB2E4\uC2DC \uAC00\uB9AC\uAE30"}))}function pI(n,e,t,r){let i=n.order.length,s=n.order[n.turn%i],a=Math.floor(n.turn/i)+1,c=e&&s===e.id,l=i*(n.rounds||1),d=f("div",{class:"panel turn"+(c?" mine":"")},f("div",{class:"field-label",text:a+"\uBC14\uD034 \xB7 "+(n.turn+1)+" / "+l+"\uBC88\uC9F8 \uC124\uBA85"}),f("div",{class:"turn-now"},f("span",{class:"eyebrow",text:"\uC9C0\uAE08 \uCC28\uB840"}),f("b",{text:c?"\uB0B4 \uCC28\uB840\uC608\uC694!":Oe(s)})),f("ol",{class:"order mini"},n.order.map(function(m,v){return f("li",{class:(v===n.turn%i?"now":"")+(e&&m===e.id?" me":"")},f("span",{text:Oe(m)}))})));if(c){let m=To("input","hint-text",{type:"text",class:"text-in",maxlength:"60",placeholder:"\uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD558\uC138\uC694",autocomplete:"off"}),v=f("form",{class:"send-row",novalidate:!0},m,f("button",{type:"submit",class:"btn-sm go",text:"\uC124\uBA85 \uC62C\uB9AC\uAE30"}));v.addEventListener("submit",async function(b){b.preventDefault();let R=m.value.trim();if(R){if(r&&Io(R).indexOf(Io(r.word))>=0&&r.liar!==e.id){Y("\uC81C\uC2DC\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uBA74 \uC548 \uB3FC\uC694.");return}try{await Fp("hint",R),C.drafts["hint-text"]="",X()}catch(D){Y(D&&D.code==="turn"?"\uC9C0\uAE08\uC740 \uB0B4 \uCC28\uB840\uAC00 \uC544\uB2C8\uC5D0\uC694.":_e(D))}}}),vo(d,v)}else vo(d,f("button",{type:"button",class:"link-btn",onclick:async function(){try{await Fp("skip")}catch(m){Y(_e(m))}},text:Oe(s)+" \uCC28\uB840 \uB118\uAE30\uAE30 (\uC790\uB9AC \uBE44\uC6E0\uC744 \uB54C)"}));return d}function mI(n,e,t){let r=n.votes||{},i=n.lineup||[],s=i.filter(function(c){return r[c]}).length,a=e?r[e.id]:null;return f("div",{class:"panel"},f("div",{class:"field-label",text:"\uD22C\uD45C \xB7 "+s+" / "+i.length+"\uBA85 \uC644\uB8CC"}),t?f("div",{class:"vote-grid"},i.filter(function(c){return c!==e.id}).map(function(c){return f("button",{type:"button",class:"vote-btn","aria-pressed":a===c?"true":"false",onclick:function(){lI(c)}},f("div",{class:"vp"},wn(vt(c)||{})),f("span",{text:Oe(c)}))})):f("p",{class:"note",text:"\uCC38\uAC00\uC790\uB4E4\uC774 \uD22C\uD45C\uD558\uACE0 \uC788\uC5B4\uC694."}),t?f("p",{class:"hint",text:a?"\u2018"+Oe(a)+"\u2019\uC5D0\uAC8C \uD22C\uD45C\uD588\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uB77C\uACE0 \uC0DD\uAC01\uD558\uB294 \uC0AC\uB78C\uC744 \uB204\uB974\uC138\uC694."}):null,f("button",{type:"button",class:"link-btn",onclick:function(){Hp(!0)},text:"\uD22C\uD45C \uB9C8\uAC10\uD558\uAE30 (\uC548 \uC628 \uC0AC\uB78C\uC774 \uC788\uC744 \uB54C)"}))}function gI(n,e,t){let r=n.accused;if(e&&e.id===r){let i=To("input","guess-text",{type:"text",class:"text-in",maxlength:"30",placeholder:"\uC81C\uC2DC\uC5B4\uB294 \uBB34\uC5C7\uC77C\uAE4C\uC694?",autocomplete:"off"}),s=f("form",{class:"send-row",novalidate:!0},i,f("button",{type:"submit",class:"btn-sm go",text:"\uC815\uB2F5 \uC81C\uCD9C"}));return s.addEventListener("submit",async function(a){a.preventDefault();try{await _l(i.value.trim()),C.drafts["guess-text"]=""}catch(c){Y(_e(c))}}),f("div",{class:"panel turn mine"},f("div",{class:"field-label",text:"\uB77C\uC774\uC5B4\uC758 \uB9C8\uC9C0\uB9C9 \uAE30\uD68C"}),f("p",{text:n.mode===1?"\uB4E4\uCF30\uC5B4\uC694! \uB2F9\uC2E0\uC774 \uB77C\uC774\uC5B4\uC600\uC5B4\uC694. \uC9C4\uC9DC \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694.":"\uB4E4\uCF30\uC5B4\uC694! \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694."}),f("p",{class:"note",text:"\uC8FC\uC81C: "+n.topic.name}),s,f("button",{type:"button",class:"link-btn",onclick:function(){_l("")},text:"\uD3EC\uAE30\uD558\uAE30"}))}return f("div",{class:"panel turn"},f("div",{class:"field-label",text:"\uB77C\uC774\uC5B4 \uAC80\uAC70"}),f("p",null,f("b",{text:Oe(r)}),"\uB2D8\uC774 \uB77C\uC774\uC5B4\uB85C \uC9C0\uBAA9\uB410\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uB294 \uC911\uC774\uC5D0\uC694\u2026"),f("button",{type:"button",class:"link-btn",onclick:function(){_l("")},text:"\uB77C\uC774\uC5B4\uAC00 \uC790\uB9AC\uB97C \uBE44\uC6E0\uC73C\uBA74 \uACB0\uACFC \uBCF4\uAE30"}))}function yI(n,e,t,r){let i=n.winner==="team",s=vt(e.liar)||{nick:Oe(e.liar)},a=n.votes||{};return f("div",{class:"answer"+(i?" team":"")},f("div",{class:"result-title",text:i?"\uC870\uC9C1\uC6D0 \uC2B9\uB9AC":"\uB77C\uC774\uC5B4 \uC2B9\uB9AC"}),f("p",{class:"note",text:n.reason||""}),f("div",{class:"ans-liar"},f("div",{class:"ans-photo"},wn(s)),f("div",null,f("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4"}),f("b",{text:s.nick}))),f("p",null,"\uC81C\uC2DC\uC5B4: ",f("b",{text:e.word}),"  \xB7  \uC8FC\uC81C: "+n.topic.name),n.mode===1?f("p",null,"\uB77C\uC774\uC5B4\uAC00 \uBC1B\uC740 \uB2E8\uC5B4: ",f("b",{text:e.fool})):null,n.guess?f("p",null,"\uB77C\uC774\uC5B4\uC758 \uB2F5: ",f("b",{text:n.guess})):null,Object.keys(a).length?f("ul",{class:"vote-list"},(n.lineup||[]).filter(function(c){return a[c]}).map(function(c){return f("li",{text:Oe(c)+" \u2192 "+Oe(a[c])})})):null,f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){De("game-liar")},text:"\uBC29 \uBAA9\uB85D"}),f("button",{type:"button",class:"go",onclick:Qp,text:"\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354"})))}function _I(n,e){let t=n.game||0,r=C.msgs.filter(function(c){return(c.game||0)===t}),i=f("div",{class:"log",role:"log","aria-live":"polite"},r.length?r.map(function(c){if(c.kind==="skip")return f("div",{class:"msg-sys",text:c.text});let l=e&&c.memberId===e.id;return f("div",{class:"bubble "+(c.kind==="hint"?"hint":"chat")+(l?" mine":"")},f("div",{class:"b-meta"},f("b",{text:c.nick||"\uC190\uB2D8"}),c.kind==="hint"?f("span",{class:"b-tag",text:(c.round||1)+"\uBC14\uD034 \uC124\uBA85"}):null),f("div",{class:"b-text",text:c.text}))}):f("div",{class:"msg-sys",text:"\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694."})),s=To("input","chat-text",{type:"text",class:"text-in",maxlength:"120",placeholder:"\uC7A1\uB2F4 \uBCF4\uB0B4\uAE30",autocomplete:"off"}),a=f("form",{class:"send-row",novalidate:!0},s,f("button",{type:"submit",class:"btn-sm",text:"\uBCF4\uB0B4\uAE30"}));return a.addEventListener("submit",async function(c){c.preventDefault();let l=s.value.trim();if(!(!l||!C.user))try{await uI("chat",l),C.drafts["chat-text"]="",X()}catch(d){Y(_e(d))}}),f("div",{class:"field"},f("div",{class:"field-label",text:"\uB300\uD654"}),i,a)}function vI(){return f("div",{class:"panel"},f("div",{class:"field-label",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C \xB7 \uB450\uBAA9 \uC804\uC6A9"}),C.topics.length?f("ul",{class:"topic-list"},C.topics.map(function(n){return f("li",null,f("span",null,f("b",{text:n.name})," \xB7 "+(n.words||[]).length+"\uAC1C"),f("button",{type:"button",class:"btn-sm",onclick:function(){Up(n)},text:"\uC218\uC815"}))})):f("p",{class:"note",text:"\uC544\uC9C1 \uC5C6\uC5B4\uC694. \uC6B0\uB9AC\uB07C\uB9AC\uB9CC \uC544\uB294 \uB2E8\uC5B4\uB85C \uC8FC\uC81C\uB97C \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694."}),f("button",{type:"button",class:"add-btn",onclick:function(){Up(null)},text:"\uC8FC\uC81C \uCD94\uAC00"}),f("p",{class:"hint",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C\uB294 \uBC29 \uC124\uC815\uC5D0\uC11C \u2018\uB79C\uB364\u2019\uC77C \uB54C \uB2E4\uB978 \uC8FC\uC81C\uB4E4 \uC0AC\uC774\uC5D0 \uC11E\uC5EC \uB098\uC640\uC694."}))}function wI(){let n=at(),e=n?n.nick:"\uC190\uB2D8",t=To("textarea","gb-text",{class:"gb-in",maxlength:"300",placeholder:"\uBCF8\uBD80\uC5D0 \uD55C\uB9C8\uB514 \uB0A8\uAE30\uAE30"}),r=f("form",{class:"panel",novalidate:!0},f("div",{class:"field-label",text:e+"(\uC73C)\uB85C \uB0A8\uAE30\uAE30"}),t,f("button",{type:"submit",class:"save",disabled:!C.user,text:"\uB0A8\uAE30\uAE30"}));r.addEventListener("submit",async function(s){s.preventDefault();let a=t.value.trim();if(!a){Y("\uB0B4\uC6A9\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}try{await fi(Ke(ee,"guestbook"),{uid:Eo(),memberId:n?n.id:null,nick:e,text:a,createdAt:_n()}),C.drafts["gb-text"]="",X(),Y("\uBC29\uBA85\uB85D\uC5D0 \uB0A8\uACBC\uC5B4\uC694.")}catch(c){Y(_e(c))}});let i=C.guest.length?f("ul",{class:"gb-list"},C.guest.map(function(s){let a=s.memberId?vt(s.memberId):null,c=tr()||C.user&&s.uid===C.user.uid;return f("li",{class:"gb-item"},f("div",{class:"gb-photo"},wn(a||{nick:s.nick})),f("div",{class:"gb-body"},f("div",{class:"gb-meta"},f("b",{text:a?a.nick:s.nick||"\uC190\uB2D8"}),a&&a.rank?f("span",{class:"gb-rank",text:a.rank}):null,f("span",{class:"gb-time",text:Mw(s.createdAt)})),f("p",{class:"gb-text",text:s.text}),c?C.gbConfirm===s.id?f("div",{class:"gb-del"},f("span",{text:"\uC9C0\uC6B8\uAE4C\uC694?"}),f("button",{type:"button",class:"link-btn",onclick:function(){C.gbConfirm=null,X()},text:"\uCDE8\uC18C"}),f("button",{type:"button",class:"link-btn danger",onclick:async function(){try{await di(Re(ee,"guestbook",s.id)),C.gbConfirm=null}catch(l){Y(_e(l))}},text:"\uC9C0\uC6B0\uAE30"})):f("button",{type:"button",class:"link-btn quiet",onclick:function(){C.gbConfirm=s.id,X()},text:"\uC9C0\uC6B0\uAE30"}):null))})):f("div",{class:"empty",text:C.guestReady?"\uCCAB \uBC29\uBA85\uB85D\uC744 \uB0A8\uACA8 \uC8FC\uC138\uC694.":"\uBC29\uBA85\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return f("section",{class:"screen"},f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"\uBCF8\uBD80 \uCD9C\uC785 \uAE30\uB85D"}),f("h2",{text:"\uBC29\uBA85\uB85D"}),f("p",{text:"\uC870\uC9C1\uC6D0 \uB204\uAD6C\uB098 \uB0A8\uAE38 \uC218 \uC788\uC5B4\uC694. \uB0B4\uAC00 \uC4F4 \uAE00\uC740 \uB0B4\uAC00 \uC9C0\uC6B8 \uC218 \uC788\uC5B4\uC694."}))),r,i)}function II(n){return new Promise(function(e,t){let r=URL.createObjectURL(n),i=new Image;i.onload=function(){let a=i.naturalWidth,c=i.naturalHeight,l=Math.min(1,640/Math.max(a,c)),d=document.createElement("canvas");d.width=Math.round(a*l),d.height=Math.round(c*l);let m=d.getContext("2d");m.fillStyle="#1c1d20",m.fillRect(0,0,d.width,d.height),m.drawImage(i,0,0,d.width,d.height),URL.revokeObjectURL(r),e(d.toDataURL("image/jpeg",.8))},i.onerror=function(){URL.revokeObjectURL(r),t(new Error("bad image"))},i.src=r})}var Zn=null;function vn(){Zn&&(Zn.remove(),Zn=null,document.body.style.overflow="")}function Yp(n,e,t){vn(),Zn=f("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e,onclick:function(r){r.target===Zn&&vn()}},f("div",{class:"sheet-panel"},f("div",{class:"sheet-head"},f("div",null,f("span",{class:"eyebrow",text:n}),f("h2",{text:e})),f("button",{type:"button",class:"x","aria-label":"\uB2EB\uAE30",onclick:vn,text:"\u2715"})),t)),document.body.appendChild(Zn),document.body.style.overflow="hidden"}function Jp(n){let e=!n,t={photo:n?zp(n.photo):""},r=f("input",{type:"text",id:"f-nick",maxlength:"20",value:n?n.nick:"",autocomplete:"off"}),i=f("input",{type:"text",id:"f-rank",maxlength:"10",value:n&&n.rank||"",autocomplete:"off",placeholder:"\uBE44\uC6CC\uB450\uBA74 \uC77C\uBC18 \uC870\uC9C1\uC6D0 (\uC608: \uB450\uBAA9, \uBD80\uB450\uBAA9)"}),s=f("input",{type:"text",id:"f-alias",maxlength:"30",value:n&&n.alias||"",autocomplete:"off",placeholder:"\uC608: \uBCFC\uC8FC\uBA38\uB2C8 \uAE08\uACE0"}),a=f("input",{type:"text",id:"f-intro",maxlength:"80",value:n&&n.intro||"",autocomplete:"off",placeholder:"\uBCF8\uC778 \uC9C4\uC220 \uD55C \uC904"}),c=f("textarea",{id:"f-charges",placeholder:`\uD55C \uC904\uC5D0 \uD610\uC758 \uD558\uB098\uC529
\uC608: \uD68C\uC758 \uC911 \uBAB0\uB798 \uAC04\uC2DD \uBA39\uC740 \uD610\uC758`});c.value=n?(n.charges||[]).join(`
`):"";let l=f("div",{class:"thumb"}),d=f("p",{class:"msg",role:"status"}),m=f("button",{type:"button",class:"ghost",onclick:function(){t.photo="",v()},text:"\uC0AC\uC9C4 \uBE7C\uAE30"});function v(){l.replaceChildren(wn({nick:r.value||"?",photo:t.photo})),m.hidden=!t.photo}let b=f("input",{type:"file",id:"f-photo",accept:"image/*"});b.addEventListener("change",function(){let V=b.files&&b.files[0];V&&(d.className="msg",d.textContent="\uC0AC\uC9C4 \uC815\uB9AC \uC911\u2026",II(V).then(function(k){t.photo=k,v(),d.textContent="\uC0AC\uC9C4\uC744 \uBD99\uC600\uC5B4\uC694. \uC800\uC7A5\uD558\uBA74 \uBAA8\uB450\uC5D0\uAC8C \uBCF4\uC785\uB2C8\uB2E4."},function(){d.className="msg err",d.textContent="\uC774 \uC0AC\uC9C4\uC740 \uC5F4 \uC218 \uC5C6\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uC9C4(JPG, PNG)\uC744 \uACE8\uB77C\uC8FC\uC138\uC694."}),b.value="")});let R=f("button",{type:"submit",class:"save",text:e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5"}),D=f("form",{class:"form",novalidate:!0},f("div",{class:"photo-edit"},l,f("div",{class:"photo-btns"},f("label",{class:"file-btn"},"\uC0AC\uC9C4 \uACE0\uB974\uAE30",b),m,f("span",{class:"hint",text:"\uC790\uB3D9\uC73C\uB85C \uC791\uAC8C \uC904\uC5EC\uC11C \uC800\uC7A5\uB3FC\uC694."}))),f("label",null,f("b",{text:"\uB2C9\uB124\uC784 (\uD544\uC218)"}),r),f("label",null,f("b",{text:"\uC9C1\uC704"}),i),f("label",null,f("b",{text:"\uBCC4\uBA85"}),s),f("label",null,f("b",{text:"\uD55C \uC904 \uC18C\uAC1C"}),a),f("label",null,f("b",{text:"\uD610\uC758"}),c),d,R);D.addEventListener("submit",async function(V){V.preventDefault();let k=r.value.trim();if(!k){d.className="msg err",d.textContent="\uB2C9\uB124\uC784\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.",r.focus();return}let j={nick:k,rank:i.value.trim(),alias:s.value.trim(),intro:a.value.trim(),charges:c.value.split(`
`).map(function(z){return z.trim()}).filter(Boolean).slice(0,8),photo:t.photo,sample:!1},G=e?"m"+Date.now().toString(36)+Math.random().toString(36).slice(2,6):n.id;j.no=e?C.members.reduce(function(z,te){return Math.max(z,te.no||0)},0)+1:n.no,R.disabled=!0,R.textContent="\uC800\uC7A5 \uC911\u2026";try{await hi(Re(ee,"members",G),j),vn(),De("m-"+G),Y(e?"\uC0C8 \uC218\uBC30\uC11C\uB97C \uB4F1\uB85D\uD588\uC5B4\uC694.":"\uC218\uBC30\uC11C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.")}catch(z){R.disabled=!1,R.textContent=e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5",d.className="msg err",d.textContent=_e(z)}}),r.addEventListener("input",function(){t.photo||v()}),Yp(e?"\uC2E0\uADDC \uB4F1\uB85D":bo(n),e?"\uC870\uC9C1\uC6D0 \uB4F1\uB85D":"\uC218\uBC30\uC11C \uC218\uC815",D),v()}function Up(n){let e=f("input",{type:"text",id:"t-name",maxlength:"16",value:n?n.name:"",autocomplete:"off",placeholder:"\uC608: \uAC8C\uC784 \uC544\uC774\uD15C"}),t=f("textarea",{id:"t-words",placeholder:`\uD55C \uC904\uC5D0 \uD558\uB098\uC529, \uB610\uB294 \uC27C\uD45C\uB85C \uAD6C\uBD84
\uC608: \uBE68\uAC04 \uD3EC\uC158, \uADC0\uD658 \uC8FC\uBB38\uC11C, \uC5D8\uB9AD\uC11C, \uC21C\uAC04\uC774\uB3D9 \uC2A4\uD06C\uB864`});t.value=n?(n.words||[]).join(`
`):"";let r=f("p",{class:"msg",role:"status"}),i=f("button",{type:"submit",class:"save",text:n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00"}),s=f("div");function a(d){i.disabled=!1,i.textContent=n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00",r.className="msg err",r.textContent=d}function c(d){n&&s.replaceChildren(d?f("div",{class:"confirm"},f("p",{text:"\u2018"+n.name+"\u2019 \uC8FC\uC81C\uB97C \uC9C0\uC6B8\uAE4C\uC694?"}),f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){c(!1)},text:"\uCDE8\uC18C"}),f("button",{type:"button",class:"danger",onclick:async function(){try{await di(Re(ee,"liarTopics",n.id)),vn(),Y("\uC8FC\uC81C\uB97C \uC9C0\uC6E0\uC5B4\uC694.")}catch(m){a(_e(m))}},text:"\uC9C0\uC6B0\uAE30"}))):f("button",{type:"button",class:"ghost",onclick:function(){c(!0)},text:"\uC774 \uC8FC\uC81C \uC9C0\uC6B0\uAE30"}))}let l=f("form",{class:"form",novalidate:!0},f("label",null,f("b",{text:"\uC8FC\uC81C \uC774\uB984"}),e),f("label",null,f("b",{text:"\uB2E8\uC5B4 (4\uAC1C \uC774\uC0C1)"}),t),r,i,s);l.addEventListener("submit",async function(d){d.preventDefault();let m=e.value.trim(),v={},b=t.value.split(/[\n,]/).map(function(R){return R.trim()}).filter(function(R){return!R||v[R]?!1:(v[R]=!0,!0)}).slice(0,60);if(!m){a("\uC8FC\uC81C \uC774\uB984\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}if(b.length<4){a("\uB2E8\uC5B4\uB97C 4\uAC1C \uC774\uC0C1 \uC801\uC5B4\uC8FC\uC138\uC694. \uC9C0\uAE08 "+b.length+"\uAC1C\uC608\uC694.");return}i.disabled=!0,i.textContent="\uC800\uC7A5 \uC911\u2026";try{n?await hi(Re(ee,"liarTopics",n.id),{name:m,words:b,order:n.order||0}):await fi(Ke(ee,"liarTopics"),{name:m,words:b,order:Date.now()}),vn(),Y(n?"\uC8FC\uC81C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.":"\uC8FC\uC81C\uB97C \uCD94\uAC00\uD588\uC5B4\uC694.")}catch(R){a(_e(R))}}),Yp("\uB77C\uC774\uC5B4 \xB7 \uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C",n?"\uC8FC\uC81C \uC218\uC815":"\uC8FC\uC81C \uCD94\uAC00",l),c(!1)}document.addEventListener("keydown",function(n){n.key==="Escape"&&vn()});var EI=document.getElementById("bf-root"),gi=f("main",{class:"wrap"}),$p=f("span",{class:"op-chip",text:"\uB450\uBAA9",hidden:!0}),TI=f("div",{class:"filebar wrap"},f("span",{class:"brand"},Tl("logo-s"),f("span",null,f("b",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"})," \xB7 \uBE44\uBC00\uBCF8\uBD80")),f("span",{class:"fb-right"},$p,f("span",{class:"lvl",text:"\uAE30\uBC00 \uB4F1\uAE09 A"}))),bI=[["hq","\uBCF8\uBD80"],["members","\uC870\uC9C1\uC6D0"],["games","\uAC8C\uC784\uBC29"],["guestbook","\uBC29\uBA85\uB85D"]],_o={},Xp=f("nav",{class:"tabbar","aria-label":"\uC8FC \uBA54\uB274"},f("div",{class:"tabbar-in"},bI.map(function(n){let e=f("button",{class:"tab",type:"button",onclick:function(){De(n[0])}},jw(n[0]),f("span",{text:n[1]}));return _o[n[0]]=e,e})));EI.replaceChildren(TI,gi,Xp);var vl=null,wl=!1,Bp=0;function X(){wl||(wl=!0,requestAnimationFrame(function(){wl=!1,AI()}))}function AI(){let n=document.activeElement,e=n&&n.id&&gi.contains(n)?n.id:null,t=e&&typeof n.selectionStart=="number"?[n.selectionStart,n.selectionEnd]:null,r=gi.querySelector(".log"),i=r?{top:r.scrollTop,pinned:r.scrollHeight-r.scrollTop-r.clientHeight<60}:null,s=Fw(),a="hq",c;C.membersReady?Mp()?c=Xw():s==="members"?(a="members",c=Zw()):s.indexOf("m-")===0?(a="members",c=eI(s.slice(2))):s==="games"?(a="games",c=nI()):s==="game-liar"?(a="games",c=rI()):s.indexOf("room-")===0?(a="games",c=hI(s.slice(5))):s==="guestbook"?(a="guestbook",c=wI()):c=Jw():c=f("section",{class:"screen"},f("div",{class:"empty",text:"\uBCF8\uBD80 \uBB38\uC744 \uC5EC\uB294 \uC911\u2026"})),s.indexOf("room-")!==0&&Kp(null),s!==vl&&(C.confirmDelete=!1);let l=C.membersReady&&Mp();if(Xp.hidden=l,gi.replaceChildren(c),Object.keys(_o).forEach(function(m){m===a&&!l?_o[m].setAttribute("aria-current","page"):_o[m].removeAttribute("aria-current")}),$p.hidden=!tr(),e){let m=document.getElementById(e);if(m&&(m.focus({preventScroll:!0}),t&&m.setSelectionRange))try{m.setSelectionRange(t[0],t[1])}catch{}}let d=gi.querySelector(".log");if(d){let m=C.msgs.length!==Bp;!i||i.pinned||m?d.scrollTop=d.scrollHeight:d.scrollTop=i.top}Bp=C.msgs.length,s!==vl&&window.scrollTo(0,0),vl=s}window.addEventListener("hashchange",X);Ww();X();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
