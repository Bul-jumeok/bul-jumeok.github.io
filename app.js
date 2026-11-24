var Dh=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Bm=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Nh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,m=s>>2,v=(s&3)<<4|c>>4,I=(c&15)<<2|d>>6,R=d&63;l||(R=64,a||(I=64)),r.push(t[m],t[v],t[I],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Dh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Bm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let d=i<n.length?t[n.charAt(i)]:64;++i;let v=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||v==null)throw new ra;let I=s<<2|c>>4;if(r.push(I),d!==64){let R=c<<4&240|d>>2;if(r.push(R),v!==64){let D=d<<6&192|v;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},ra=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},qm=function(n){let e=Dh(n);return Nh.encodeByteArray(e,!0)},br=function(n){return qm(n).replace(/\./g,"")},sa=function(n){try{return Nh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function jm(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var zm=()=>jm().__FIREBASE_DEFAULTS__,Gm=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Km=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&sa(n[1]);return e&&JSON.parse(e)},Ui=()=>{try{return zm()||Gm()||Km()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},oa=n=>{var e,t;return(t=(e=Ui())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Oh=n=>{let e=oa(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},aa=()=>{var n;return(n=Ui())===null||n===void 0?void 0:n.config},ca=n=>{var e;return(e=Ui())===null||e===void 0?void 0:e[`_${n}`]};var Fi=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Vh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[br(JSON.stringify(t)),br(JSON.stringify(a)),""].join(".")}function de(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Mh(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(de())}function Wm(){var n;let e=(n=Ui())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Lh(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Fh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Uh(){let n=de();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Bh(){return!Wm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ua(){try{return typeof indexedDB=="object"}catch{return!1}}function qh(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Hm="FirebaseError",Le=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Hm,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ht.prototype.create)}},ht=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Qm(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Le(i,c,r)}};function Qm(n,e){return n.replace(Ym,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var Ym=/\{\$([^}]+)}/g;function jh(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function dt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(xh(s)&&xh(a)){if(!dt(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function xh(n){return n!==null&&typeof n=="object"}function Pn(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Cn(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function kn(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function zh(n,e){let t=new ia(n,e);return t.subscribe.bind(t)}var ia=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Jm(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=na),i.error===void 0&&(i.error=na),i.complete===void 0&&(i.complete=na);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Jm(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function na(){}var FI=4*60*60*1e3;function se(n){return n&&n._delegate?n._delegate:n}var qe=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Zt="[DEFAULT]";var la=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Fi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xm(e))try{this.getOrInitializeService({instanceIdentifier:Zt})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Zt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zt){return this.instances.has(e)}getOptions(e=Zt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:$m(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Zt){return this.component?this.component.multipleInstances?e:Zt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function $m(n){return n===Zt?void 0:n}function Xm(n){return n.instantiationMode==="EAGER"}var Bi=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new la(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Zm=[],K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));var eg={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},tg=K.INFO,ng={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},rg=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=ng[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},At=class{constructor(e){this.name=e,this._logLevel=tg,this._logHandler=rg,this._userLogHandler=null,Zm.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?eg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}};var ig=(n,e)=>e.some(t=>n instanceof t),Gh,Kh;function sg(){return Gh||(Gh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function og(){return Kh||(Kh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Wh=new WeakMap,da=new WeakMap,Hh=new WeakMap,ha=new WeakMap,pa=new WeakMap;function ag(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Ze(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Wh.set(t,n)}).catch(()=>{}),pa.set(e,n),e}function cg(n){if(da.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});da.set(n,e)}var fa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return da.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Hh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ze(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Qh(n){fa=n(fa)}function ug(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(qi(this),e,...t);return Hh.set(r,e.sort?e.sort():[e]),Ze(r)}:og().includes(n)?function(...e){return n.apply(qi(this),e),Ze(Wh.get(this))}:function(...e){return Ze(n.apply(qi(this),e))}}function lg(n){return typeof n=="function"?ug(n):(n instanceof IDBTransaction&&cg(n),ig(n,sg())?new Proxy(n,fa):n)}function Ze(n){if(n instanceof IDBRequest)return ag(n);if(ha.has(n))return ha.get(n);let e=lg(n);return e!==n&&(ha.set(n,e),pa.set(e,n)),e}var qi=n=>pa.get(n);function Jh(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),c=Ze(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Ze(a.result),l.oldVersion,l.newVersion,Ze(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}var hg=["get","getKey","getAll","getAllKeys","count"],dg=["put","add","delete","clear"],ma=new Map;function Yh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ma.get(e))return ma.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=dg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||hg.includes(t)))return;let s=async function(a,...c){let l=this.transaction(a,i?"readwrite":"readonly"),d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return ma.set(e,s),s}Qh(n=>({...n,get:(e,t,r)=>Yh(e,t)||n.get(e,t,r),has:(e,t)=>!!Yh(e,t)||n.has(e,t)}));var ya=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(fg(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function fg(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var _a="@firebase/app",$h="0.10.5";var en=new At("@firebase/app"),pg="@firebase/app-compat",mg="@firebase/analytics-compat",gg="@firebase/analytics",yg="@firebase/app-check-compat",_g="@firebase/app-check",vg="@firebase/auth",wg="@firebase/auth-compat",Ig="@firebase/database",Eg="@firebase/database-compat",Tg="@firebase/functions",bg="@firebase/functions-compat",Ag="@firebase/installations",Sg="@firebase/installations-compat",Rg="@firebase/messaging",Pg="@firebase/messaging-compat",Cg="@firebase/performance",kg="@firebase/performance-compat",xg="@firebase/remote-config",Dg="@firebase/remote-config-compat",Ng="@firebase/storage",Og="@firebase/storage-compat",Vg="@firebase/firestore",Mg="@firebase/vertexai-preview",Lg="@firebase/firestore-compat",Fg="firebase",Ug="10.12.2";var va="[DEFAULT]",Bg={[_a]:"fire-core",[pg]:"fire-core-compat",[gg]:"fire-analytics",[mg]:"fire-analytics-compat",[_g]:"fire-app-check",[yg]:"fire-app-check-compat",[vg]:"fire-auth",[wg]:"fire-auth-compat",[Ig]:"fire-rtdb",[Eg]:"fire-rtdb-compat",[Tg]:"fire-fn",[bg]:"fire-fn-compat",[Ag]:"fire-iid",[Sg]:"fire-iid-compat",[Rg]:"fire-fcm",[Pg]:"fire-fcm-compat",[Cg]:"fire-perf",[kg]:"fire-perf-compat",[xg]:"fire-rc",[Dg]:"fire-rc-compat",[Ng]:"fire-gcs",[Og]:"fire-gcs-compat",[Vg]:"fire-fst",[Lg]:"fire-fst-compat",[Mg]:"fire-vertex","fire-js":"fire-js",[Fg]:"fire-js-all"};var ji=new Map,qg=new Map,wa=new Map;function Xh(n,e){try{n.container.addComponent(e)}catch(t){en.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Rt(n){let e=n.name;if(wa.has(e))return en.debug(`There were multiple attempts to register component ${e}.`),!1;wa.set(e,n);for(let t of ji.values())Xh(t,n);for(let t of qg.values())Xh(t,n);return!0}function Sr(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n.settings!==void 0}var jg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},St=new ht("app","Firebase",jg);var Ia=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw St.create("app-deleted",{appName:this._name})}};var Pt=Ug;function ba(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:va,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw St.create("bad-app-name",{appName:String(i)});if(t||(t=aa()),!t)throw St.create("no-options");let s=ji.get(i);if(s){if(dt(t,s.options)&&dt(r,s.config))return s;throw St.create("duplicate-app",{appName:i})}let a=new Bi(i);for(let l of wa.values())a.addComponent(l);let c=new Ia(t,r,a);return ji.set(i,c),c}function zi(n=va){let e=ji.get(n);if(!e&&n===va&&aa())return ba();if(!e)throw St.create("no-app",{appName:n});return e}function He(n,e,t){var r;let i=(r=Bg[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),en.warn(c.join(" "));return}Rt(new qe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var zg="firebase-heartbeat-database",Gg=1,Ar="firebase-heartbeat-store",ga=null;function nd(){return ga||(ga=Jh(zg,Gg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ar)}catch(t){console.warn(t)}}}}).catch(n=>{throw St.create("idb-open",{originalErrorMessage:n.message})})),ga}async function Kg(n){try{let t=(await nd()).transaction(Ar),r=await t.objectStore(Ar).get(rd(n));return await t.done,r}catch(e){if(e instanceof Le)en.warn(e.message);else{let t=St.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});en.warn(t.message)}}}async function Zh(n,e){try{let r=(await nd()).transaction(Ar,"readwrite");await r.objectStore(Ar).put(e,rd(n)),await r.done}catch(t){if(t instanceof Le)en.warn(t.message);else{let r=St.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});en.warn(r.message)}}}function rd(n){return`${n.name}!${n.options.appId}`}var Wg=1024,Hg=30*24*60*60*1e3,Ea=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Ta(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ed();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{let c=new Date(a.date).valueOf();return Date.now()-c<=Hg}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=ed(),{heartbeatsToSend:r,unsentEntries:i}=Qg(this._heartbeatsCache.heartbeats),s=br(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function ed(){return new Date().toISOString().substring(0,10)}function Qg(n,e=Wg){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),td(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),td(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Ta=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ua()?qh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Kg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Zh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Zh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function td(n){return br(JSON.stringify({version:2,heartbeats:n})).length}function Yg(n){Rt(new qe("platform-logger",e=>new ya(e),"PRIVATE")),Rt(new qe("heartbeat",e=>new Ea(e),"PRIVATE")),He(_a,$h,n),He(_a,$h,"esm2017"),He("fire-js","")}Yg("");var Jg="firebase",$g="10.12.2";He(Jg,$g,"app");function Gi(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Id(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Ed=Id,Td=new ht("auth","Firebase",Id());var Ji=new At("@firebase/auth");function Xg(n,...e){Ji.logLevel<=K.WARN&&Ji.warn(`Auth (${Pt}): ${n}`,...e)}function Wi(n,...e){Ji.logLevel<=K.ERROR&&Ji.error(`Auth (${Pt}): ${n}`,...e)}function je(n,...e){throw Ka(n,...e)}function Ye(n,...e){return Ka(n,...e)}function Ga(n,e,t){let r=Object.assign(Object.assign({},Ed()),{[e]:t});return new ht("auth","Firebase",r).create(e,{appName:n.name})}function kt(n){return Ga(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Zg(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&je(n,"argument-error"),Ga(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ka(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Td.create(n,...e)}function L(n,e,...t){if(!n)throw Ka(e,...t)}function et(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Wi(e),new Error(e)}function pt(n,e){n||et(e)}function Ra(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function ey(){return id()==="http:"||id()==="https:"}function id(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function ty(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ey()||Lh()||"connection"in navigator)?navigator.onLine:!0}function ny(){if(typeof navigator=="undefined")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var tn=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,pt(t>e,"Short delay should be less than long delay!"),this.isMobile=Mh()||Fh()}get(){return ty()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Wa(n,e){pt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var $i=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;et("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;et("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;et("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var ry={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var iy=new tn(3e4,6e4);function fe(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function be(n,e,t,r,i={}){return bd(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let c=Pn(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode),$i.fetch()(Ad(n,n.config.apiHost,t,c),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},s))})}async function bd(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},ry),e);try{let i=new Pa(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw Rr(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Rr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Rr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Rr(n,"user-disabled",a);let m=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ga(n,m,d);je(n,m)}}catch(i){if(i instanceof Le)throw i;je(n,"network-request-failed",{message:String(i)})}}async function Dt(n,e,t,r,i={}){let s=await be(n,e,t,r,i);return"mfaPendingCredential"in s&&je(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Ad(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?Wa(n.config,i):`${n.config.apiScheme}://${i}`}function sy(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Pa=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ye(this.auth,"network-request-failed")),iy.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Rr(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Ye(n,e,r);return i.customData._tokenResponse=t,i}function sd(n){return n!==void 0&&n.enterprise!==void 0}var Ca=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return sy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function oy(n,e){return be(n,"GET","/v2/recaptchaConfig",fe(n,e))}async function ay(n,e){return be(n,"POST","/v1/accounts:delete",e)}async function Sd(n,e){return be(n,"POST","/v1/accounts:lookup",e)}function Pr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Rd(n,e=!1){let t=se(n),r=await t.getIdToken(e),i=Ha(r);L(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Pr(Aa(i.auth_time)),issuedAtTime:Pr(Aa(i.iat)),expirationTime:Pr(Aa(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Aa(n){return Number(n)*1e3}function Ha(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Wi("JWT malformed, contained fewer than 3 sections"),null;try{let i=sa(t);return i?JSON.parse(i):(Wi("Failed to decode base64 JWT payload"),null)}catch(i){return Wi("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function od(n){let e=Ha(n);return L(e,"internal-error"),L(typeof e.exp!="undefined","internal-error"),L(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function kr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Le&&cy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function cy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var ka=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var xr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pr(this.lastLoginAt),this.creationTime=Pr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Xi(n){var e;let t=n.auth,r=await n.getIdToken(),i=await kr(n,Sd(t,{idToken:r}));L(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Cd(s.providerUserInfo):[],c=uy(n.providerData,a),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),m=l?d:!1,v={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new xr(s.createdAt,s.lastLoginAt),isAnonymous:m};Object.assign(n,v)}async function Pd(n){let e=se(n);await Xi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function uy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Cd(n){return n.map(e=>{var{providerId:t}=e,r=Gi(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function ly(n,e){let t=await bd(n,{},async()=>{let r=Pn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=Ad(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",$i.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function hy(n,e){return be(n,"POST","/v2/accounts:revokeToken",fe(n,e))}var Cr=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken!="undefined","internal-error"),L(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):od(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");let t=od(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await ly(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(L(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(L(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(L(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return et("not implemented")}};function Ct(n,e){L(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}var Dn=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Gi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ka(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new xr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await kr(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Rd(this,e)}reload(){return Pd(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Xi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(kt(this.auth));let e=await this.getIdToken();return await kr(this,ay(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,l,d,m;let v=(r=t.displayName)!==null&&r!==void 0?r:void 0,I=(i=t.email)!==null&&i!==void 0?i:void 0,R=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,D=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,j=(d=t.createdAt)!==null&&d!==void 0?d:void 0,G=(m=t.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:z,emailVerified:te,isAnonymous:ke,providerData:Z,stsTokenManager:E}=t;L(z&&E,e,"internal-error");let g=Cr.fromJSON(this.name,E);L(typeof z=="string",e,"internal-error"),Ct(v,e.name),Ct(I,e.name),L(typeof te=="boolean",e,"internal-error"),L(typeof ke=="boolean",e,"internal-error"),Ct(R,e.name),Ct(D,e.name),Ct(V,e.name),Ct(k,e.name),Ct(j,e.name),Ct(G,e.name);let _=new n({uid:z,auth:e,email:I,emailVerified:te,displayName:v,isAnonymous:ke,photoURL:D,phoneNumber:R,tenantId:V,stsTokenManager:g,createdAt:j,lastLoginAt:G});return Z&&Array.isArray(Z)&&(_.providerData=Z.map(w=>Object.assign({},w))),k&&(_._redirectEventId=k),_}static async _fromIdTokenResponse(e,t,r=!1){let i=new Cr;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Xi(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];L(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?Cd(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Cr;c.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new xr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,d),l}};var ad=new Map;function ft(n){pt(n instanceof Function,"Expected a class definition");let e=ad.get(n);return e?(pt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ad.set(n,e),e)}var Zi=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Zi.type="NONE";var xa=Zi;function Hi(n,e,t){return`firebase:${n}:${e}:${t}`}var es=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=Hi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Hi("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Dn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(ft(xa),e,r);let i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d),s=i[0]||ft(xa),a=Hi(r,e.config.apiKey,e.name),c=null;for(let d of t)try{let m=await d._get(a);if(m){let v=Dn._fromJSON(e,m);d!==s&&(c=v),s=d;break}}catch{}let l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new n(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new n(s,e,r))}};function cd(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Dd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(kd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Od(e))return"Blackberry";if(Vd(e))return"Webos";if(Qa(e))return"Safari";if((e.includes("chrome/")||xd(e))&&!e.includes("edge/"))return"Chrome";if(Nd(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function kd(n=de()){return/firefox\//i.test(n)}function Qa(n=de()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xd(n=de()){return/crios\//i.test(n)}function Dd(n=de()){return/iemobile/i.test(n)}function Nd(n=de()){return/android/i.test(n)}function Od(n=de()){return/blackberry/i.test(n)}function Vd(n=de()){return/webos/i.test(n)}function _s(n=de()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function dy(n=de()){var e;return _s(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function fy(){return Uh()&&document.documentMode===10}function Md(n=de()){return _s(n)||Nd(n)||Vd(n)||Od(n)||/windows phone/i.test(n)||Dd(n)}function py(){try{return!!(window&&window!==window.top)}catch{return!1}}function Ld(n,e=[]){let t;switch(n){case"Browser":t=cd(de());break;case"Worker":t=`${cd(de())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Pt}/${r}`}var Da=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,c)=>{try{let l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function my(n,e={}){return be(n,"GET","/v2/passwordPolicy",fe(n,e))}var gy=6,Na=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:gy,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;let l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Oa=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ts(this),this.idTokenSubscription=new ts(this),this.beforeStateQueue=new Da(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Td,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ft(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await es.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Sd(this,{idToken:e}),r=await Dn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Qe(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ny()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(kt(this));let t=e?se(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(kt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(kt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ft(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await my(this),t=new Na(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ht("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await hy(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ft(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await es.create(this,[ft(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{let l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ld(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Xg(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function Nt(n){return se(n)}var ts=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=zh(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var vs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function yy(n){vs=n}function Fd(n){return vs.loadJS(n)}function _y(){return vs.recaptchaEnterpriseScript}function vy(){return vs.gapiScript}function Ud(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var wy="recaptcha-enterprise",Iy="NO_RECAPTCHA",Va=class{constructor(e){this.type=wy,this.auth=Nt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{oy(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let d=new Ca(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,a,c){let l=window.grecaptcha;sd(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(Iy)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&sd(window.grecaptcha))i(c,s,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=_y();l.length!==0&&(l+=c),Fd(l).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}};async function ud(n,e,t,r=!1){let i=new Va(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let a=Object.assign({},e);return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ld(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await ud(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await ud(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(s)})}function Bd(n,e){let t=Sr(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(dt(s,e!=null?e:{}))return i;je(i,"already-initialized")}return t.initialize({options:e})}function Ey(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ft);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function ws(n,e,t){let r=Nt(n);L(r._canInitEmulator,r,"emulator-config-failed"),L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=qd(e),{host:a,port:c}=Ty(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${a}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||by()}function qd(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Ty(n){let e=qd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:hd(r.substr(s.length+1))}}else{let[s,a]=r.split(":");return{host:s,port:hd(a)}}}function hd(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function by(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var nn=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return et("not implemented")}_getIdTokenResponse(e){return et("not implemented")}_linkToIdToken(e,t){return et("not implemented")}_getReauthenticationResolver(e){return et("not implemented")}};async function Ay(n,e){return be(n,"POST","/v1/accounts:signUp",e)}async function Sy(n,e){return Dt(n,"POST","/v1/accounts:signInWithPassword",fe(n,e))}async function Ry(n,e){return Dt(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}async function Py(n,e){return Dt(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}var Dr=class n extends nn{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ld(e,t,"signInWithPassword",Sy);case"emailLink":return Ry(e,{email:this._email,oobCode:this._password});default:je(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ld(e,r,"signUpPassword",Ay);case"emailLink":return Py(e,{idToken:t,email:this._email,oobCode:this._password});default:je(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function xn(n,e){return Dt(n,"POST","/v1/accounts:signInWithIdp",fe(n,e))}var Cy="http://localhost",rn=class n extends nn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Gi(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return xn(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,xn(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,xn(e,t)}buildRequest(){let e={requestUri:Cy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Pn(t)}return e}};async function ky(n,e){return be(n,"POST","/v1/accounts:sendVerificationCode",fe(n,e))}async function xy(n,e){return Dt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e))}async function Dy(n,e){let t=await Dt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e));if(t.temporaryProof)throw Rr(n,"account-exists-with-different-credential",t);return t}var Ny={USER_NOT_FOUND:"user-not-found"};async function Oy(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Dt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,t),Ny)}var Nr=class n extends nn{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return xy(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Dy(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Oy(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Vy(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function My(n){let e=Cn(kn(n)).link,t=e?Cn(kn(e)).deep_link_id:null,r=Cn(kn(n)).deep_link_id;return(r?Cn(kn(r)).link:null)||r||t||e||n}var ns=class n{constructor(e){var t,r,i,s,a,c;let l=Cn(kn(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,m=(r=l.oobCode)!==null&&r!==void 0?r:null,v=Vy((i=l.mode)!==null&&i!==void 0?i:null);L(d&&m&&v,"argument-error"),this.apiKey=d,this.operation=v,this.code=m,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=My(e);try{return new n(t)}catch{return null}}};var Nn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Dr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=ns.parseLink(t);return L(r,"argument-error"),Dr._fromEmailAndCode(e,r.code,r.tenantId)}};Nn.PROVIDER_ID="password";Nn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Nn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Or=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var sn=class extends Or{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Vr=class n extends sn{constructor(){super("facebook.com")}static credential(e){return rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Vr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Vr.PROVIDER_ID="facebook.com";var xt=class n extends sn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};xt.GOOGLE_SIGN_IN_METHOD="google.com";xt.PROVIDER_ID="google.com";var Mr=class n extends sn{constructor(){super("github.com")}static credential(e){return rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Mr.GITHUB_SIGN_IN_METHOD="github.com";Mr.PROVIDER_ID="github.com";var Lr=class n extends sn{constructor(){super("twitter.com")}static credential(e,t){return rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Lr.TWITTER_SIGN_IN_METHOD="twitter.com";Lr.PROVIDER_ID="twitter.com";async function Ly(n,e){return Dt(n,"POST","/v1/accounts:signUp",fe(n,e))}var on=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Dn._fromIdTokenResponse(e,r,i),a=dd(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=dd(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function dd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}async function Ya(n){var e;if(Qe(n.app))return Promise.reject(kt(n));let t=Nt(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new on({user:t.currentUser,providerId:null,operationType:"signIn"});let r=await Ly(t,{returnSecureToken:!0}),i=await on._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}var Ma=class n extends Le{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function jd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ma._fromErrorAndOperation(n,s,e,r):s})}async function Fy(n,e,t=!1){let r=await kr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return on._forOperation(n,"link",r)}async function Uy(n,e,t=!1){let{auth:r}=n;if(Qe(r.app))return Promise.reject(kt(r));let i="reauthenticate";try{let s=await kr(n,jd(r,i,e,n),t);L(s.idToken,r,"internal-error");let a=Ha(s.idToken);L(a,r,"internal-error");let{sub:c}=a;return L(n.uid===c,r,"user-mismatch"),on._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&je(r,"user-mismatch"),s}}async function zd(n,e,t=!1){if(Qe(n.app))return Promise.reject(kt(n));let r="signIn",i=await jd(n,r,e),s=await on._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Ja(n,e){return zd(Nt(n),e)}function Gd(n,e,t,r){return se(n).onIdTokenChanged(e,t,r)}function Kd(n,e,t){return se(n).beforeAuthStateChanged(e,t)}function $a(n,e,t,r){return se(n).onAuthStateChanged(e,t,r)}function Xa(n){return se(n).signOut()}function By(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function qy(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}function jy(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function zy(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}var rs="__sak";var is=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(rs,"1"),this.storage.removeItem(rs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function Gy(){let n=de();return Qa(n)||_s(n)}var Ky=1e3,Wy=10,ss=class extends is{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Gy()&&py(),this.fallbackToPolling=Md(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let a=this.storage.getItem(r);if(e.newValue!==a)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);fy()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Wy):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Ky)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ss.type="LOCAL";var Wd=ss;var os=class extends is{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};os.type="SESSION";var Za=os;function Hy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var as=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(a).map(async d=>d(t.origin,s)),l=await Hy(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};as.receivers=[];function ec(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var La=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{let d=ec("",20);i.port1.start();let m=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(v){let I=v;if(I.data.eventId===d)switch(I.data.status){case"ack":clearTimeout(m),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(I.data.response);break;default:clearTimeout(m),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function tt(){return window}function Qy(n){tt().location.href=n}function Hd(){return typeof tt().WorkerGlobalScope!="undefined"&&typeof tt().importScripts=="function"}async function Yy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Jy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function $y(){return Hd()?self:null}var Qd="firebaseLocalStorageDb",Xy=1,cs="firebaseLocalStorage",Yd="fbase_key",an=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Is(n,e){return n.transaction([cs],e?"readwrite":"readonly").objectStore(cs)}function Zy(){let n=indexedDB.deleteDatabase(Qd);return new an(n).toPromise()}function Fa(){let n=indexedDB.open(Qd,Xy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(cs,{keyPath:Yd})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(cs)?e(r):(r.close(),await Zy(),e(await Fa()))})})}async function fd(n,e,t){let r=Is(n,!0).put({[Yd]:e,value:t});return new an(r).toPromise()}async function e_(n,e){let t=Is(n,!1).get(e),r=await new an(t).toPromise();return r===void 0?null:r.value}function pd(n,e){let t=Is(n,!0).delete(e);return new an(t).toPromise()}var t_=800,n_=3,us=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Fa(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>n_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Hd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=as._getInstance($y()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Yy(),!this.activeServiceWorker)return;this.sender=new La(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Jy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Fa();return await fd(e,rs,"1"),await pd(e,rs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>fd(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>e_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>pd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Is(i,!1).getAll();return new an(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),t_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};us.type="LOCAL";var Jd=us;function r_(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:start",fe(n,e))}function i_(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}function s_(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}var hE=Ud("rcb"),dE=new tn(3e4,6e4);var o_="recaptcha";async function a_(n,e,t){var r;let i=await t.verify();try{L(typeof i=="string",n,"argument-error"),L(t.type===o_,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let a=s.session;if("phoneNumber"in s)return L(a.type==="enroll",n,"internal-error"),(await By(n,{idToken:a.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{L(a.type==="signin",n,"internal-error");let c=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return L(c,n,"missing-multi-factor-info"),(await r_(n,{mfaPendingCredential:a.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:a}=await ky(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return a}}finally{t._reset()}}var Fr=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Nt(e)}verifyPhoneNumber(e,t){return a_(this.auth,e,se(t))}static credential(e,t){return Nr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Nr._fromTokenResponse(t,r):null}};Fr.PROVIDER_ID="phone";Fr.PHONE_SIGN_IN_METHOD="phone";function $d(n,e){return e?ft(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Ur=class extends nn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return xn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return xn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return xn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function c_(n){return zd(n.auth,new Ur(n),n.bypassAuthState)}function u_(n){let{auth:e,user:t}=n;return L(t,e,"internal-error"),Uy(t,new Ur(n),n.bypassAuthState)}async function l_(n){let{auth:e,user:t}=n;return L(t,e,"internal-error"),Fy(t,new Ur(n),n.bypassAuthState)}var ls=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return c_;case"linkViaPopup":case"linkViaRedirect":return l_;case"reauthViaPopup":case"reauthViaRedirect":return u_;default:je(this.auth,"internal-error")}}resolve(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var h_=new tn(2e3,1e4);async function tc(n,e,t){if(Qe(n.app))return Promise.reject(Ye(n,"operation-not-supported-in-this-environment"));let r=Nt(n);Zg(n,e,Or);let i=$d(r,t);return new hs(r,"signInViaPopup",e,i).executeNotNull()}var hs=class n extends ls{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){pt(this.filter.length===1,"Popup operations only handle one event");let e=ec();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,h_.get())};e()}};hs.currentPopupAction=null;var d_="pendingRedirect",Qi=new Map,Ua=class extends ls{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Qi.get(this.auth._key());if(!e){try{let r=await f_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Qi.set(this.auth._key(),e)}return this.bypassAuthState||Qi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function f_(n,e){let t=g_(e),r=m_(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function p_(n,e){Qi.set(n._key(),e)}function m_(n){return ft(n._redirectPersistence)}function g_(n){return Hi(d_,n.config.apiKey,n.name)}async function y_(n,e,t=!1){if(Qe(n.app))return Promise.reject(kt(n));let r=Nt(n),i=$d(r,e),a=await new Ua(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var __=10*60*1e3,Ba=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!v_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Xd(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ye(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=__&&this.cachedEventUids.clear(),this.cachedEventUids.has(md(e))}saveEventToCache(e){this.cachedEventUids.add(md(e)),this.lastProcessedEventTime=Date.now()}};function md(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Xd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function v_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Xd(n);default:return!1}}async function w_(n,e={}){return be(n,"GET","/v1/projects",e)}var I_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,E_=/^https?/;async function T_(n){if(n.config.emulator)return;let{authorizedDomains:e}=await w_(n);for(let t of e)try{if(b_(t))return}catch{}je(n,"unauthorized-domain")}function b_(n){let e=Ra(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!E_.test(t))return!1;if(I_.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var A_=new tn(3e4,6e4);function gd(){let n=tt().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function S_(n){return new Promise((e,t)=>{var r,i,s;function a(){gd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{gd(),t(Ye(n,"network-request-failed"))},timeout:A_.get()})}if(!((i=(r=tt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=tt().gapi)===null||s===void 0)&&s.load)a();else{let c=Ud("iframefcb");return tt()[c]=()=>{gapi.load?a():t(Ye(n,"network-request-failed"))},Fd(`${vy()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Yi=null,e})}var Yi=null;function R_(n){return Yi=Yi||S_(n),Yi}var P_=new tn(5e3,15e3),C_="__/auth/iframe",k_="emulator/auth/iframe",x_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},D_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function N_(n){let e=n.config;L(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Wa(e,k_):`https://${n.config.authDomain}/${C_}`,r={apiKey:e.apiKey,appName:n.name,v:Pt},i=D_.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Pn(r).slice(1)}`}async function O_(n){let e=await R_(n),t=tt().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:N_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:x_,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=Ye(n,"network-request-failed"),c=tt().setTimeout(()=>{s(a)},P_.get());function l(){tt().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}var V_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},M_=500,L_=600,F_="_blank",U_="http://localhost",ds=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function B_(n,e,t,r=M_,i=L_){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",l=Object.assign(Object.assign({},V_),{width:r.toString(),height:i.toString(),top:s,left:a}),d=de().toLowerCase();t&&(c=xd(d)?F_:t),kd(d)&&(e=e||U_,l.scrollbars="yes");let m=Object.entries(l).reduce((I,[R,D])=>`${I}${R}=${D},`,"");if(dy(d)&&c!=="_self")return q_(e||"",c),new ds(null);let v=window.open(e||"",c,m);L(v,n,"popup-blocked");try{v.focus()}catch{}return new ds(v)}function q_(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var j_="__/auth/handler",z_="emulator/auth/handler",G_=encodeURIComponent("fac");async function yd(n,e,t,r,i,s){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Pt,eventId:i};if(e instanceof Or){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",jh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[m,v]of Object.entries(s||{}))a[m]=v}if(e instanceof sn){let m=e.getScopes().filter(v=>v!=="");m.length>0&&(a.scopes=m.join(","))}n.tenantId&&(a.tid=n.tenantId);let c=a;for(let m of Object.keys(c))c[m]===void 0&&delete c[m];let l=await n._getAppCheckToken(),d=l?`#${G_}=${encodeURIComponent(l)}`:"";return`${K_(n)}?${Pn(c).slice(1)}${d}`}function K_({config:n}){return n.emulator?Wa(n,z_):`https://${n.authDomain}/${j_}`}var Sa="webStorageSupport",qa=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Za,this._completeRedirectFn=y_,this._overrideRedirectResult=p_}async _openPopup(e,t,r,i){var s;pt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await yd(e,t,r,Ra(),i);return B_(e,a,ec())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await yd(e,t,r,Ra(),i);return Qy(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(pt(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await O_(e),r=new Ba(e);return t.register("authEvent",i=>(L(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Sa,{type:Sa},i=>{var s;let a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Sa];a!==void 0&&t(!!a),je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=T_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Md()||Qa()||_s()}},Zd=qa,fs=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return et("unexpected MultiFactorSessionType")}}},ja=class n extends fs{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return qy(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return i_(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},ps=class{constructor(){}static assertion(e){return ja._fromCredential(e)}};ps.FACTOR_ID="phone";var ms=class{static assertionForEnrollment(e,t){return gs._fromSecret(e,t)}static assertionForSignIn(e,t){return gs._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;L(typeof((t=r.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await jy(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return ys._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};ms.FACTOR_ID="totp";var gs=class n extends fs{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return L(typeof this.secret!="undefined",e,"argument-error"),zy(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){L(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return s_(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ys=class n{constructor(e,t,r,i,s,a,c){this.sessionInfo=a,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Ki(e)||Ki(t))&&(i=!0),i&&(Ki(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Ki(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Ki(n){return typeof n=="undefined"||(n==null?void 0:n.length)===0}var _d="@firebase/auth",vd="1.7.4";var za=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function W_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function H_(n){Rt(new qe("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;L(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ld(n)},d=new Oa(r,i,s,l);return Ey(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Rt(new qe("auth-internal",e=>{let t=Nt(e.getProvider("auth").getImmediate());return(r=>new za(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),He(_d,vd,W_(n)),He(_d,vd,"esm2017")}var Q_=5*60,Y_=ca("authIdTokenMaxAge")||Q_,wd=null,J_=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Y_)return;let i=t==null?void 0:t.token;wd!==i&&(wd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function nc(n=zi()){let e=Sr(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Bd(n,{popupRedirectResolver:Zd,persistence:[Jd,Wd,Za]}),r=ca("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let a=J_(s.toString());Kd(t,a,()=>a(t.currentUser)),Gd(t,c=>a(c))}}let i=oa("auth");return i&&ws(t,`http://${i}`),t}function $_(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}yy({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Ye("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",$_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});H_("Browser");var ef=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},tf={};var Ot,rc;(function(){var n;function e(E,g){function _(){}_.prototype=g.prototype,E.D=g.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(w,T,A){for(var y=Array(arguments.length-2),ct=2;ct<arguments.length;ct++)y[ct-2]=arguments[ct];return g.prototype[T].apply(w,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,g,_){_||(_=0);var w=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)w[T]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(T=0;16>T;++T)w[T]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=E.g[0],_=E.g[1],T=E.g[2];var A=E.g[3],y=g+(A^_&(T^A))+w[0]+3614090360&4294967295;g=_+(y<<7&4294967295|y>>>25),y=A+(T^g&(_^T))+w[1]+3905402710&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(_^A&(g^_))+w[2]+606105819&4294967295,T=A+(y<<17&4294967295|y>>>15),y=_+(g^T&(A^g))+w[3]+3250441966&4294967295,_=T+(y<<22&4294967295|y>>>10),y=g+(A^_&(T^A))+w[4]+4118548399&4294967295,g=_+(y<<7&4294967295|y>>>25),y=A+(T^g&(_^T))+w[5]+1200080426&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(_^A&(g^_))+w[6]+2821735955&4294967295,T=A+(y<<17&4294967295|y>>>15),y=_+(g^T&(A^g))+w[7]+4249261313&4294967295,_=T+(y<<22&4294967295|y>>>10),y=g+(A^_&(T^A))+w[8]+1770035416&4294967295,g=_+(y<<7&4294967295|y>>>25),y=A+(T^g&(_^T))+w[9]+2336552879&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(_^A&(g^_))+w[10]+4294925233&4294967295,T=A+(y<<17&4294967295|y>>>15),y=_+(g^T&(A^g))+w[11]+2304563134&4294967295,_=T+(y<<22&4294967295|y>>>10),y=g+(A^_&(T^A))+w[12]+1804603682&4294967295,g=_+(y<<7&4294967295|y>>>25),y=A+(T^g&(_^T))+w[13]+4254626195&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(_^A&(g^_))+w[14]+2792965006&4294967295,T=A+(y<<17&4294967295|y>>>15),y=_+(g^T&(A^g))+w[15]+1236535329&4294967295,_=T+(y<<22&4294967295|y>>>10),y=g+(T^A&(_^T))+w[1]+4129170786&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^T&(g^_))+w[6]+3225465664&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^_&(A^g))+w[11]+643717713&4294967295,T=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(T^A))+w[0]+3921069994&4294967295,_=T+(y<<20&4294967295|y>>>12),y=g+(T^A&(_^T))+w[5]+3593408605&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^T&(g^_))+w[10]+38016083&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^_&(A^g))+w[15]+3634488961&4294967295,T=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(T^A))+w[4]+3889429448&4294967295,_=T+(y<<20&4294967295|y>>>12),y=g+(T^A&(_^T))+w[9]+568446438&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^T&(g^_))+w[14]+3275163606&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^_&(A^g))+w[3]+4107603335&4294967295,T=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(T^A))+w[8]+1163531501&4294967295,_=T+(y<<20&4294967295|y>>>12),y=g+(T^A&(_^T))+w[13]+2850285829&4294967295,g=_+(y<<5&4294967295|y>>>27),y=A+(_^T&(g^_))+w[2]+4243563512&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^_&(A^g))+w[7]+1735328473&4294967295,T=A+(y<<14&4294967295|y>>>18),y=_+(A^g&(T^A))+w[12]+2368359562&4294967295,_=T+(y<<20&4294967295|y>>>12),y=g+(_^T^A)+w[5]+4294588738&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^T)+w[8]+2272392833&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^_)+w[11]+1839030562&4294967295,T=A+(y<<16&4294967295|y>>>16),y=_+(T^A^g)+w[14]+4259657740&4294967295,_=T+(y<<23&4294967295|y>>>9),y=g+(_^T^A)+w[1]+2763975236&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^T)+w[4]+1272893353&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^_)+w[7]+4139469664&4294967295,T=A+(y<<16&4294967295|y>>>16),y=_+(T^A^g)+w[10]+3200236656&4294967295,_=T+(y<<23&4294967295|y>>>9),y=g+(_^T^A)+w[13]+681279174&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^T)+w[0]+3936430074&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^_)+w[3]+3572445317&4294967295,T=A+(y<<16&4294967295|y>>>16),y=_+(T^A^g)+w[6]+76029189&4294967295,_=T+(y<<23&4294967295|y>>>9),y=g+(_^T^A)+w[9]+3654602809&4294967295,g=_+(y<<4&4294967295|y>>>28),y=A+(g^_^T)+w[12]+3873151461&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^_)+w[15]+530742520&4294967295,T=A+(y<<16&4294967295|y>>>16),y=_+(T^A^g)+w[2]+3299628645&4294967295,_=T+(y<<23&4294967295|y>>>9),y=g+(T^(_|~A))+w[0]+4096336452&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~T))+w[7]+1126891415&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~_))+w[14]+2878612391&4294967295,T=A+(y<<15&4294967295|y>>>17),y=_+(A^(T|~g))+w[5]+4237533241&4294967295,_=T+(y<<21&4294967295|y>>>11),y=g+(T^(_|~A))+w[12]+1700485571&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~T))+w[3]+2399980690&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~_))+w[10]+4293915773&4294967295,T=A+(y<<15&4294967295|y>>>17),y=_+(A^(T|~g))+w[1]+2240044497&4294967295,_=T+(y<<21&4294967295|y>>>11),y=g+(T^(_|~A))+w[8]+1873313359&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~T))+w[15]+4264355552&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~_))+w[6]+2734768916&4294967295,T=A+(y<<15&4294967295|y>>>17),y=_+(A^(T|~g))+w[13]+1309151649&4294967295,_=T+(y<<21&4294967295|y>>>11),y=g+(T^(_|~A))+w[4]+4149444226&4294967295,g=_+(y<<6&4294967295|y>>>26),y=A+(_^(g|~T))+w[11]+3174756917&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~_))+w[2]+718787259&4294967295,T=A+(y<<15&4294967295|y>>>17),y=_+(A^(T|~g))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,g){g===void 0&&(g=E.length);for(var _=g-this.blockSize,w=this.B,T=this.h,A=0;A<g;){if(T==0)for(;A<=_;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<g;)if(w[T++]=E.charCodeAt(A++),T==this.blockSize){i(this,w),T=0;break}}else for(;A<g;)if(w[T++]=E[A++],T==this.blockSize){i(this,w),T=0;break}}this.h=T,this.o+=g},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;var _=8*this.o;for(g=E.length-8;g<E.length;++g)E[g]=_&255,_/=256;for(this.u(E),E=Array(16),g=_=0;4>g;++g)for(var w=0;32>w;w+=8)E[_++]=this.g[g]>>>w&255;return E};function s(E,g){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=g(E)}function a(E,g){this.h=g;for(var _=[],w=!0,T=E.length-1;0<=T;T--){var A=E[T]|0;w&&A==g||(_[T]=A,w=!1)}this.g=_}var c={};function l(E){return-128<=E&&128>E?s(E,function(g){return new a([g|0],0>g?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return v;if(0>E)return k(d(-E));for(var g=[],_=1,w=0;E>=_;w++)g[w]=E/_|0,_*=4294967296;return new a(g,0)}function m(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return k(m(E.substring(1),g));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(g,8)),w=v,T=0;T<E.length;T+=8){var A=Math.min(8,E.length-T),y=parseInt(E.substring(T,T+A),g);8>A?(A=d(Math.pow(g,A)),w=w.j(A).add(d(y))):(w=w.j(_),w=w.add(d(y)))}return w}var v=l(0),I=l(1),R=l(16777216);n=a.prototype,n.m=function(){if(V(this))return-k(this).m();for(var E=0,g=1,_=0;_<this.g.length;_++){var w=this.i(_);E+=(0<=w?w:4294967296+w)*g,g*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(V(this))return"-"+k(this).toString(E);for(var g=d(Math.pow(E,6)),_=this,w="";;){var T=te(_,g).g;_=j(_,T.j(g));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=T,D(_))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(var g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function V(E){return E.h==-1}n.l=function(E){return E=j(this,E),V(E)?-1:D(E)?0:1};function k(E){for(var g=E.g.length,_=[],w=0;w<g;w++)_[w]=~E.g[w];return new a(_,~E.h).add(I)}n.abs=function(){return V(this)?k(this):this},n.add=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],w=0,T=0;T<=g;T++){var A=w+(this.i(T)&65535)+(E.i(T)&65535),y=(A>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=y>>>16,A&=65535,y&=65535,_[T]=y<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function j(E,g){return E.add(k(g))}n.j=function(E){if(D(this)||D(E))return v;if(V(this))return V(E)?k(this).j(k(E)):k(k(this).j(E));if(V(E))return k(this.j(k(E)));if(0>this.l(R)&&0>E.l(R))return d(this.m()*E.m());for(var g=this.g.length+E.g.length,_=[],w=0;w<2*g;w++)_[w]=0;for(w=0;w<this.g.length;w++)for(var T=0;T<E.g.length;T++){var A=this.i(w)>>>16,y=this.i(w)&65535,ct=E.i(T)>>>16,sr=E.i(T)&65535;_[2*w+2*T]+=y*sr,G(_,2*w+2*T),_[2*w+2*T+1]+=A*sr,G(_,2*w+2*T+1),_[2*w+2*T+1]+=y*ct,G(_,2*w+2*T+1),_[2*w+2*T+2]+=A*ct,G(_,2*w+2*T+2)}for(w=0;w<g;w++)_[w]=_[2*w+1]<<16|_[2*w];for(w=g;w<2*g;w++)_[w]=0;return new a(_,0)};function G(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function z(E,g){this.g=E,this.h=g}function te(E,g){if(D(g))throw Error("division by zero");if(D(E))return new z(v,v);if(V(E))return g=te(k(E),g),new z(k(g.g),k(g.h));if(V(g))return g=te(E,k(g)),new z(k(g.g),g.h);if(30<E.g.length){if(V(E)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var _=I,w=g;0>=w.l(E);)_=ke(_),w=ke(w);var T=Z(_,1),A=Z(w,1);for(w=Z(w,2),_=Z(_,2);!D(w);){var y=A.add(w);0>=y.l(E)&&(T=T.add(_),A=y),w=Z(w,1),_=Z(_,1)}return g=j(E,T.j(g)),new z(T,g)}for(T=v;0<=E.l(g);){for(_=Math.max(1,Math.floor(E.m()/g.m())),w=Math.ceil(Math.log(_)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=d(_),y=A.j(g);V(y)||0<y.l(E);)_-=w,A=d(_),y=A.j(g);D(A)&&(A=I),T=T.add(A),E=j(E,y)}return new z(T,E)}n.A=function(E){return te(this,E).h},n.and=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],w=0;w<g;w++)_[w]=this.i(w)&E.i(w);return new a(_,this.h&E.h)},n.or=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],w=0;w<g;w++)_[w]=this.i(w)|E.i(w);return new a(_,this.h|E.h)},n.xor=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],w=0;w<g;w++)_[w]=this.i(w)^E.i(w);return new a(_,this.h^E.h)};function ke(E){for(var g=E.g.length+1,_=[],w=0;w<g;w++)_[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(_,E.h)}function Z(E,g){var _=g>>5;g%=32;for(var w=E.g.length-_,T=[],A=0;A<w;A++)T[A]=0<g?E.i(A+_)>>>g|E.i(A+_+1)<<32-g:E.i(A+_);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,rc=tf.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,Ot=tf.Integer=a}).apply(typeof ef!="undefined"?ef:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Es=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},mt={};var ic,sc,On,oc,Br,Ts,ac,cc,uc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Es=="object"&&Es];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var b=o[p];if(!(b in h))break e;h=h[b]}o=o[o.length-1],p=h[o],u=u(p),u!=p&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var h=0,p=!1,b={next:function(){if(!p&&h<o.length){var S=h++;return{value:u(S,o[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,h){return h})}});var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function m(o,u,h){return o.call.apply(o.bind,arguments)}function v(o,u,h){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,p),o.apply(u,b)}}return function(){return o.apply(u,arguments)}}function I(o,u,h){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:v,I.apply(null,arguments)}function R(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function D(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(p,b,S){for(var N=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)N[ne-2]=arguments[ne];return u.prototype[b].apply(p,N)}}function V(o){let u=o.length;if(0<u){let h=Array(u);for(let p=0;p<u;p++)h[p]=o[p];return h}return[]}function k(o,u){for(let h=1;h<arguments.length;h++){let p=arguments[h];if(l(p)){let b=o.length||0,S=p.length||0;o.length=b+S;for(let N=0;N<S;N++)o[b+N]=p[N]}else o.push(p)}}class j{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function G(o){return/^[\s\xa0]*$/.test(o)}function z(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function te(o){return te[" "](o),o}te[" "]=function(){};var ke=z().indexOf("Gecko")!=-1&&!(z().toLowerCase().indexOf("webkit")!=-1&&z().indexOf("Edge")==-1)&&!(z().indexOf("Trident")!=-1||z().indexOf("MSIE")!=-1)&&z().indexOf("Edge")==-1;function Z(o,u,h){for(let p in o)u.call(h,o[p],p,o)}function E(o,u){for(let h in o)u.call(void 0,o[h],h,o)}function g(o){let u={};for(let h in o)u[h]=o[h];return u}let _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,u){let h,p;for(let b=1;b<arguments.length;b++){p=arguments[b];for(h in p)o[h]=p[h];for(let S=0;S<_.length;S++)h=_[S],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function T(o){var u=1;o=o.split(":");let h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function A(o){c.setTimeout(()=>{throw o},0)}function y(){var o=xo;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class ct{constructor(){this.h=this.g=null}add(u,h){let p=sr.get();p.set(u,h),this.h?this.h.next=p:this.g=p,this.h=p}}var sr=new j(()=>new om,o=>o.reset());class om{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let or,ar=!1,xo=new ct,kl=()=>{let o=c.Promise.resolve(void 0);or=()=>{o.then(am)}};var am=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){A(h)}var u=sr;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}ar=!1};function It(){this.s=this.s,this.C=this.C}It.prototype.s=!1,It.prototype.ma=function(){this.s||(this.s=!0,this.N())},It.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var cm=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return o}();function cr(o,u){if(we.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(ke){e:{try{te(u.nodeName);var b=!0;break e}catch{}b=!1}b||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:um[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&cr.aa.h.call(this)}}D(cr,we);var um={2:"touch",3:"pen",4:"mouse"};cr.prototype.h=function(){cr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ur="closure_listenable_"+(1e6*Math.random()|0),lm=0;function hm(o,u,h,p,b){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!p,this.ha=b,this.key=++lm,this.da=this.fa=!1}function Ii(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ei(o){this.src=o,this.g={},this.h=0}Ei.prototype.add=function(o,u,h,p,b){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var N=No(o,u,p,b);return-1<N?(u=o[N],h||(u.fa=!1)):(u=new hm(u,this.src,S,!!p,b),u.fa=h,o.push(u)),u};function Do(o,u){var h=u.type;if(h in o.g){var p=o.g[h],b=Array.prototype.indexOf.call(p,u,void 0),S;(S=0<=b)&&Array.prototype.splice.call(p,b,1),S&&(Ii(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function No(o,u,h,p){for(var b=0;b<o.length;++b){var S=o[b];if(!S.da&&S.listener==u&&S.capture==!!h&&S.ha==p)return b}return-1}var Oo="closure_lm_"+(1e6*Math.random()|0),Vo={};function xl(o,u,h,p,b){if(p&&p.once)return Nl(o,u,h,p,b);if(Array.isArray(u)){for(var S=0;S<u.length;S++)xl(o,u[S],h,p,b);return null}return h=Uo(h),o&&o[ur]?o.K(u,h,d(p)?!!p.capture:!!p,b):Dl(o,u,h,!1,p,b)}function Dl(o,u,h,p,b,S){if(!u)throw Error("Invalid event type");var N=d(b)?!!b.capture:!!b,ne=Lo(o);if(ne||(o[Oo]=ne=new Ei(o)),h=ne.add(u,h,p,N,S),h.proxy)return h;if(p=dm(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)cm||(b=N),b===void 0&&(b=!1),o.addEventListener(u.toString(),p,b);else if(o.attachEvent)o.attachEvent(Vl(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function dm(){function o(h){return u.call(o.src,o.listener,h)}let u=fm;return o}function Nl(o,u,h,p,b){if(Array.isArray(u)){for(var S=0;S<u.length;S++)Nl(o,u[S],h,p,b);return null}return h=Uo(h),o&&o[ur]?o.L(u,h,d(p)?!!p.capture:!!p,b):Dl(o,u,h,!0,p,b)}function Ol(o,u,h,p,b){if(Array.isArray(u))for(var S=0;S<u.length;S++)Ol(o,u[S],h,p,b);else p=d(p)?!!p.capture:!!p,h=Uo(h),o&&o[ur]?(o=o.i,u=String(u).toString(),u in o.g&&(S=o.g[u],h=No(S,h,p,b),-1<h&&(Ii(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete o.g[u],o.h--)))):o&&(o=Lo(o))&&(u=o.g[u.toString()],o=-1,u&&(o=No(u,h,p,b)),(h=-1<o?u[o]:null)&&Mo(h))}function Mo(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[ur])Do(u.i,o);else{var h=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(h,p,o.capture):u.detachEvent?u.detachEvent(Vl(h),p):u.addListener&&u.removeListener&&u.removeListener(p),(h=Lo(u))?(Do(h,o),h.h==0&&(h.src=null,u[Oo]=null)):Ii(o)}}}function Vl(o){return o in Vo?Vo[o]:Vo[o]="on"+o}function fm(o,u){if(o.da)o=!0;else{u=new cr(u,this);var h=o.listener,p=o.ha||o.src;o.fa&&Mo(o),o=h.call(p,u)}return o}function Lo(o){return o=o[Oo],o instanceof Ei?o:null}var Fo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Uo(o){return typeof o=="function"?o:(o[Fo]||(o[Fo]=function(u){return o.handleEvent(u)}),o[Fo])}function Ie(){It.call(this),this.i=new Ei(this),this.M=this,this.F=null}D(Ie,It),Ie.prototype[ur]=!0,Ie.prototype.removeEventListener=function(o,u,h,p){Ol(this,o,u,h,p)};function xe(o,u){var h,p=o.F;if(p)for(h=[];p;p=p.F)h.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new we(u,o);else if(u instanceof we)u.target=u.target||o;else{var b=u;u=new we(p,o),w(u,b)}if(b=!0,h)for(var S=h.length-1;0<=S;S--){var N=u.g=h[S];b=Ti(N,p,!0,u)&&b}if(N=u.g=o,b=Ti(N,p,!0,u)&&b,b=Ti(N,p,!1,u)&&b,h)for(S=0;S<h.length;S++)N=u.g=h[S],b=Ti(N,p,!1,u)&&b}Ie.prototype.N=function(){if(Ie.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],p=0;p<h.length;p++)Ii(h[p]);delete o.g[u],o.h--}}this.F=null},Ie.prototype.K=function(o,u,h,p){return this.i.add(String(o),u,!1,h,p)},Ie.prototype.L=function(o,u,h,p){return this.i.add(String(o),u,!0,h,p)};function Ti(o,u,h,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var b=!0,S=0;S<u.length;++S){var N=u[S];if(N&&!N.da&&N.capture==h){var ne=N.listener,ve=N.ha||N.src;N.fa&&Do(o.i,N),b=ne.call(ve,p)!==!1&&b}}return b&&!p.defaultPrevented}function Ml(o,u,h){if(typeof o=="function")h&&(o=I(o,h));else if(o&&typeof o.handleEvent=="function")o=I(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Ll(o){o.g=Ml(()=>{o.g=null,o.i&&(o.i=!1,Ll(o))},o.l);let u=o.h;o.h=null,o.m.apply(null,u)}class pm extends It{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ll(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lr(o){It.call(this),this.h=o,this.g={}}D(lr,It);var Fl=[];function Ul(o){Z(o.g,function(u,h){this.g.hasOwnProperty(h)&&Mo(u)},o),o.g={}}lr.prototype.N=function(){lr.aa.N.call(this),Ul(this)},lr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Bo=c.JSON.stringify,mm=c.JSON.parse,gm=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function qo(){}qo.prototype.h=null;function Bl(o){return o.h||(o.h=o.i())}function ql(){}var hr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function jo(){we.call(this,"d")}D(jo,we);function zo(){we.call(this,"c")}D(zo,we);var Yt={},jl=null;function bi(){return jl=jl||new Ie}Yt.La="serverreachability";function zl(o){we.call(this,Yt.La,o)}D(zl,we);function dr(o){let u=bi();xe(u,new zl(u))}Yt.STAT_EVENT="statevent";function Gl(o,u){we.call(this,Yt.STAT_EVENT,o),this.stat=u}D(Gl,we);function De(o){let u=bi();xe(u,new Gl(u,o))}Yt.Ma="timingevent";function Kl(o,u){we.call(this,Yt.Ma,o),this.size=u}D(Kl,we);function fr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function pr(){this.g=!0}pr.prototype.xa=function(){this.g=!1};function ym(o,u,h,p,b,S){o.info(function(){if(o.g)if(S)for(var N="",ne=S.split("&"),ve=0;ve<ne.length;ve++){var Y=ne[ve].split("=");if(1<Y.length){var Ee=Y[0];Y=Y[1];var Te=Ee.split("_");N=2<=Te.length&&Te[1]=="type"?N+(Ee+"="+Y+"&"):N+(Ee+"=redacted&")}}else N=null;else N=S;return"XMLHTTP REQ ("+p+") [attempt "+b+"]: "+u+`
`+h+`
`+N})}function _m(o,u,h,p,b,S,N){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+b+"]: "+u+`
`+h+`
`+S+" "+N})}function bn(o,u,h,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+wm(o,h)+(p?" "+p:"")})}function vm(o,u){o.info(function(){return"TIMEOUT: "+u})}pr.prototype.info=function(){};function wm(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var p=h[o];if(!(2>p.length)){var b=p[1];if(Array.isArray(b)&&!(1>b.length)){var S=b[0];if(S!="noop"&&S!="stop"&&S!="close")for(var N=1;N<b.length;N++)b[N]=""}}}}return Bo(h)}catch{return u}}var Ai={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Wl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Go;function Si(){}D(Si,qo),Si.prototype.g=function(){return new XMLHttpRequest},Si.prototype.i=function(){return{}},Go=new Si;function Et(o,u,h,p){this.j=o,this.i=u,this.l=h,this.R=p||1,this.U=new lr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Hl}function Hl(){this.i=null,this.g="",this.h=!1}var Ql={},Ko={};function Wo(o,u,h){o.L=1,o.v=ki(ut(u)),o.m=h,o.P=!0,Yl(o,null)}function Yl(o,u){o.F=Date.now(),Ri(o),o.A=ut(o.v);var h=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),uh(h.i,"t",p),o.C=0,h=o.j.J,o.h=new Hl,o.g=Rh(o.j,h?u:null,!o.m),0<o.O&&(o.M=new pm(I(o.Y,o,o.g),o.O)),u=o.U,h=o.g,p=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Fl[0]=b.toString()),b=Fl);for(var S=0;S<b.length;S++){var N=xl(h,b[S],p||u.handleEvent,!1,u.h||u);if(!N)break;u.g[N.key]=N}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),dr(),ym(o.i,o.u,o.A,o.l,o.R,o.m)}Et.prototype.ca=function(o){o=o.target;let u=this.M;u&&lt(o)==3?u.j():this.Y(o)},Et.prototype.Y=function(o){try{if(o==this.g)e:{let Te=lt(this.g);var u=this.g.Ba();let Rn=this.g.Z();if(!(3>Te)&&(Te!=3||this.g&&(this.h.h||this.g.oa()||gh(this.g)))){this.J||Te!=4||u==7||(u==8||0>=Rn?dr(3):dr(2)),Ho(this);var h=this.g.Z();this.X=h;t:if(Jl(this)){var p=gh(this.g);o="";var b=p.length,S=lt(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Jt(this),mr(this);var N="";break t}this.h.i=new c.TextDecoder}for(u=0;u<b;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(S&&u==b-1)});p.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=h==200,_m(this.i,this.u,this.A,this.l,this.R,Te,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,ve=this.g;if((ne=ve.g?ve.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(ne)){var Y=ne;break t}}Y=null}if(h=Y)bn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Qo(this,h);else{this.o=!1,this.s=3,De(12),Jt(this),mr(this);break e}}if(this.P){h=!0;let We;for(;!this.J&&this.C<N.length;)if(We=Im(this,N),We==Ko){Te==4&&(this.s=4,De(14),h=!1),bn(this.i,this.l,null,"[Incomplete Response]");break}else if(We==Ql){this.s=4,De(15),bn(this.i,this.l,N,"[Invalid Chunk]"),h=!1;break}else bn(this.i,this.l,We,null),Qo(this,We);if(Jl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Te!=4||N.length!=0||this.h.h||(this.s=1,De(16),h=!1),this.o=this.o&&h,!h)bn(this.i,this.l,N,"[Invalid Chunked Response]"),Jt(this),mr(this);else if(0<N.length&&!this.W){this.W=!0;var Ee=this.j;Ee.g==this&&Ee.ba&&!Ee.M&&(Ee.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),ea(Ee),Ee.M=!0,De(11))}}else bn(this.i,this.l,N,null),Qo(this,N);Te==4&&Jt(this),this.o&&!this.J&&(Te==4?Th(this.j,this):(this.o=!1,Ri(this)))}else Fm(this.g),h==400&&0<N.indexOf("Unknown SID")?(this.s=3,De(12)):(this.s=0,De(13)),Jt(this),mr(this)}}}catch{}finally{}};function Jl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Im(o,u){var h=o.C,p=u.indexOf(`
`,h);return p==-1?Ko:(h=Number(u.substring(h,p)),isNaN(h)?Ql:(p+=1,p+h>u.length?Ko:(u=u.slice(p,p+h),o.C=p+h,u)))}Et.prototype.cancel=function(){this.J=!0,Jt(this)};function Ri(o){o.S=Date.now()+o.I,$l(o,o.I)}function $l(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=fr(I(o.ba,o),u)}function Ho(o){o.B&&(c.clearTimeout(o.B),o.B=null)}Et.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(vm(this.i,this.A),this.L!=2&&(dr(),De(17)),Jt(this),this.s=2,mr(this)):$l(this,this.S-o)};function mr(o){o.j.G==0||o.J||Th(o.j,o)}function Jt(o){Ho(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Ul(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Qo(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||Yo(h.h,o))){if(!o.K&&Yo(h.h,o)&&h.G==3){try{var p=h.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var b=p;if(b[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Vi(h),Ni(h);else break e;Zo(h),De(18)}}else h.za=b[1],0<h.za-h.T&&37500>b[2]&&h.F&&h.v==0&&!h.C&&(h.C=fr(I(h.Za,h),6e3));if(1>=eh(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Xt(h,11)}else if((o.K||h.g==o)&&Vi(h),!G(u))for(b=h.Da.g.parse(u),u=0;u<b.length;u++){let Y=b[u];if(h.T=Y[0],Y=Y[1],h.G==2)if(Y[0]=="c"){h.K=Y[1],h.ia=Y[2];let Ee=Y[3];Ee!=null&&(h.la=Ee,h.j.info("VER="+h.la));let Te=Y[4];Te!=null&&(h.Aa=Te,h.j.info("SVER="+h.Aa));let Rn=Y[5];Rn!=null&&typeof Rn=="number"&&0<Rn&&(p=1.5*Rn,h.L=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;let We=o.g;if(We){let Li=We.g?We.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Li){var S=p.h;S.g||Li.indexOf("spdy")==-1&&Li.indexOf("quic")==-1&&Li.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Jo(S,S.h),S.h=null))}if(p.D){let ta=We.g?We.g.getResponseHeader("X-HTTP-Session-Id"):null;ta&&(p.ya=ta,re(p.I,p.D,ta))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),p=h;var N=o;if(p.qa=Sh(p,p.J?p.ia:null,p.W),N.K){th(p.h,N);var ne=N,ve=p.L;ve&&(ne.I=ve),ne.B&&(Ho(ne),Ri(ne)),p.g=N}else Ih(p);0<h.i.length&&Oi(h)}else Y[0]!="stop"&&Y[0]!="close"||Xt(h,7);else h.G==3&&(Y[0]=="stop"||Y[0]=="close"?Y[0]=="stop"?Xt(h,7):Xo(h):Y[0]!="noop"&&h.l&&h.l.ta(Y),h.v=0)}}dr(4)}catch{}}var Em=class{constructor(o,u){this.g=o,this.map=u}};function Xl(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Zl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function eh(o){return o.h?1:o.g?o.g.size:0}function Yo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Jo(o,u){o.g?o.g.add(u):o.h=u}function th(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Xl.prototype.cancel=function(){if(this.i=nh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function nh(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(let h of o.g.values())u=u.concat(h.D);return u}return V(o.i)}function Tm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map!="undefined"&&o instanceof Map||typeof Set!="undefined"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],h=o.length,p=0;p<h;p++)u.push(o[p]);return u}u=[],h=0;for(p in o)u[h++]=o[p];return u}function bm(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map!="undefined"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set!="undefined"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(let p in o)u[h++]=p;return u}}}function rh(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=bm(o),p=Tm(o),b=p.length,S=0;S<b;S++)u.call(void 0,p[S],h&&h[S],o)}var ih=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Am(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var p=o[h].indexOf("="),b=null;if(0<=p){var S=o[h].substring(0,p);b=o[h].substring(p+1)}else S=o[h];u(S,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function $t(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof $t){this.h=o.h,Pi(this,o.j),this.o=o.o,this.g=o.g,Ci(this,o.s),this.l=o.l;var u=o.i,h=new _r;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),sh(this,h),this.m=o.m}else o&&(u=String(o).match(ih))?(this.h=!1,Pi(this,u[1]||"",!0),this.o=gr(u[2]||""),this.g=gr(u[3]||"",!0),Ci(this,u[4]),this.l=gr(u[5]||"",!0),sh(this,u[6]||"",!0),this.m=gr(u[7]||"")):(this.h=!1,this.i=new _r(null,this.h))}$t.prototype.toString=function(){var o=[],u=this.j;u&&o.push(yr(u,oh,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(yr(u,oh,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(yr(h,h.charAt(0)=="/"?Pm:Rm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",yr(h,km)),o.join("")};function ut(o){return new $t(o)}function Pi(o,u,h){o.j=h?gr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Ci(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function sh(o,u,h){u instanceof _r?(o.i=u,xm(o.i,o.h)):(h||(u=yr(u,Cm)),o.i=new _r(u,o.h))}function re(o,u,h){o.i.set(u,h)}function ki(o){return re(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function gr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function yr(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,Sm),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Sm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var oh=/[#\/\?@]/g,Rm=/[#\?:]/g,Pm=/[#\?]/g,Cm=/[#\?@]/g,km=/#/g;function _r(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Tt(o){o.g||(o.g=new Map,o.h=0,o.i&&Am(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=_r.prototype,n.add=function(o,u){Tt(this),this.i=null,o=An(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function ah(o,u){Tt(o),u=An(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function ch(o,u){return Tt(o),u=An(o,u),o.g.has(u)}n.forEach=function(o,u){Tt(this),this.g.forEach(function(h,p){h.forEach(function(b){o.call(u,b,p,this)},this)},this)},n.na=function(){Tt(this);let o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let p=0;p<u.length;p++){let b=o[p];for(let S=0;S<b.length;S++)h.push(u[p])}return h},n.V=function(o){Tt(this);let u=[];if(typeof o=="string")ch(this,o)&&(u=u.concat(this.g.get(An(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},n.set=function(o,u){return Tt(this),this.i=null,o=An(this,o),ch(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function uh(o,u,h){ah(o,u),0<h.length&&(o.i=null,o.g.set(An(o,u),V(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var p=u[h];let S=encodeURIComponent(String(p)),N=this.V(p);for(p=0;p<N.length;p++){var b=S;N[p]!==""&&(b+="="+encodeURIComponent(String(N[p]))),o.push(b)}}return this.i=o.join("&")};function An(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function xm(o,u){u&&!o.j&&(Tt(o),o.i=null,o.g.forEach(function(h,p){var b=p.toLowerCase();p!=b&&(ah(this,p),uh(this,b,h))},o)),o.j=u}function Dm(o,u){let h=new pr;if(c.Image){let p=new Image;p.onload=R(bt,h,"TestLoadImage: loaded",!0,u,p),p.onerror=R(bt,h,"TestLoadImage: error",!1,u,p),p.onabort=R(bt,h,"TestLoadImage: abort",!1,u,p),p.ontimeout=R(bt,h,"TestLoadImage: timeout",!1,u,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function Nm(o,u){let h=new pr,p=new AbortController,b=setTimeout(()=>{p.abort(),bt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(S=>{clearTimeout(b),S.ok?bt(h,"TestPingServer: ok",!0,u):bt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(b),bt(h,"TestPingServer: error",!1,u)})}function bt(o,u,h,p,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),p(h)}catch{}}function Om(){this.g=new gm}function Vm(o,u,h){let p=h||"";try{rh(o,function(b,S){let N=b;d(b)&&(N=Bo(b)),u.push(p+S+"="+encodeURIComponent(N))})}catch(b){throw u.push(p+"type="+encodeURIComponent("_badmap")),b}}function vr(o){this.l=o.Ub||null,this.j=o.eb||!1}D(vr,qo),vr.prototype.g=function(){return new xi(this.l,this.j)},vr.prototype.i=function(o){return function(){return o}}({});function xi(o,u){Ie.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(xi,Ie),n=xi.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Ir(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,wr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ir(this)),this.g&&(this.readyState=3,Ir(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;lh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function lh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?wr(this):Ir(this),this.readyState==3&&lh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,wr(this))},n.Qa=function(o){this.g&&(this.response=o,wr(this))},n.ga=function(){this.g&&wr(this)};function wr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Ir(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function Ir(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(xi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function hh(o){let u="";return Z(o,function(h,p){u+=p,u+=":",u+=h,u+=`\r
`}),u}function $o(o,u,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=hh(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):re(o,u,h))}function oe(o){Ie.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(oe,Ie);var Mm=/^https?$/i,Lm=["POST","PUT"];n=oe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Go.g(),this.v=this.o?Bl(this.o):Bl(Go),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(S){dh(this,S);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var b in p)h.set(b,p[b]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let S of p.keys())h.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),b=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Lm,u,void 0))||p||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[S,N]of h)this.g.setRequestHeader(S,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{mh(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){dh(this,S)}};function dh(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,fh(o),Di(o)}function fh(o){o.A||(o.A=!0,xe(o,"complete"),xe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,xe(this,"complete"),xe(this,"abort"),Di(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Di(this,!0)),oe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ph(this):this.bb())},n.bb=function(){ph(this)};function ph(o){if(o.h&&typeof a!="undefined"&&(!o.v[1]||lt(o)!=4||o.Z()!=2)){if(o.u&&lt(o)==4)Ml(o.Ea,0,o);else if(xe(o,"readystatechange"),lt(o)==4){o.h=!1;try{let N=o.Z();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var p;if(p=N===0){var b=String(o.D).match(ih)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),p=!Mm.test(b?b.toLowerCase():"")}h=p}if(h)xe(o,"complete"),xe(o,"success");else{o.m=6;try{var S=2<lt(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",fh(o)}}finally{Di(o)}}}}function Di(o,u){if(o.g){mh(o);let h=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||xe(o,"ready");try{h.onreadystatechange=p}catch{}}}function mh(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function lt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<lt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),mm(u)}};function gh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Fm(o){let u={};o=(o.g&&2<=lt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(G(o[p]))continue;var h=T(o[p]);let b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let S=u[b]||[];u[b]=S,S.push(h)}E(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Er(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function yh(o){this.Aa=0,this.i=[],this.j=new pr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Er("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Er("baseRetryDelayMs",5e3,o),this.cb=Er("retryDelaySeedMs",1e4,o),this.Wa=Er("forwardChannelMaxRetries",2,o),this.wa=Er("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Xl(o&&o.concurrentRequestLimit),this.Da=new Om,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=yh.prototype,n.la=8,n.G=1,n.connect=function(o,u,h,p){De(0),this.W=o,this.H=u||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.I=Sh(this,null,this.W),Oi(this)};function Xo(o){if(_h(o),o.G==3){var u=o.U++,h=ut(o.I);if(re(h,"SID",o.K),re(h,"RID",u),re(h,"TYPE","terminate"),Tr(o,h),u=new Et(o,o.j,u),u.L=2,u.v=ki(ut(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=Rh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ri(u)}Ah(o)}function Ni(o){o.g&&(ea(o),o.g.cancel(),o.g=null)}function _h(o){Ni(o),o.u&&(c.clearTimeout(o.u),o.u=null),Vi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Oi(o){if(!Zl(o.h)&&!o.s){o.s=!0;var u=o.Ga;or||kl(),ar||(or(),ar=!0),xo.add(u,o),o.B=0}}function Um(o,u){return eh(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=fr(I(o.Ga,o,u),bh(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let b=new Et(this,this.j,o),S=this.o;if(this.S&&(S?(S=g(S),w(S,this.S)):S=this.S),this.m!==null||this.O||(b.H=S,S=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=wh(this,b,u),h=ut(this.I),re(h,"RID",o),re(h,"CVER",22),this.D&&re(h,"X-HTTP-Session-Id",this.D),Tr(this,h),S&&(this.O?u="headers="+encodeURIComponent(String(hh(S)))+"&"+u:this.m&&$o(h,this.m,S)),Jo(this.h,b),this.Ua&&re(h,"TYPE","init"),this.P?(re(h,"$req",u),re(h,"SID","null"),b.T=!0,Wo(b,h,null)):Wo(b,h,u),this.G=2}}else this.G==3&&(o?vh(this,o):this.i.length==0||Zl(this.h)||vh(this))};function vh(o,u){var h;u?h=u.l:h=o.U++;let p=ut(o.I);re(p,"SID",o.K),re(p,"RID",h),re(p,"AID",o.T),Tr(o,p),o.m&&o.o&&$o(p,o.m,o.o),h=new Et(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=wh(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Jo(o.h,h),Wo(h,p,u)}function Tr(o,u){o.H&&Z(o.H,function(h,p){re(u,p,h)}),o.l&&rh({},function(h,p){re(u,p,h)})}function wh(o,u,h){h=Math.min(o.i.length,h);var p=o.l?I(o.l.Na,o.l,o):null;e:{var b=o.i;let S=-1;for(;;){let N=["count="+h];S==-1?0<h?(S=b[0].g,N.push("ofs="+S)):S=0:N.push("ofs="+S);let ne=!0;for(let ve=0;ve<h;ve++){let Y=b[ve].g,Ee=b[ve].map;if(Y-=S,0>Y)S=Math.max(0,b[ve].g-100),ne=!1;else try{Vm(Ee,N,"req"+Y+"_")}catch{p&&p(Ee)}}if(ne){p=N.join("&");break e}}}return o=o.i.splice(0,h),u.D=o,p}function Ih(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;or||kl(),ar||(or(),ar=!0),xo.add(u,o),o.v=0}}function Zo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=fr(I(o.Fa,o),bh(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Eh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=fr(I(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,De(10),Ni(this),Eh(this))};function ea(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Eh(o){o.g=new Et(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=ut(o.qa);re(u,"RID","rpc"),re(u,"SID",o.K),re(u,"AID",o.T),re(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&re(u,"TO",o.ja),re(u,"TYPE","xmlhttp"),Tr(o,u),o.m&&o.o&&$o(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=ki(ut(u)),h.m=null,h.P=!0,Yl(h,o)}n.Za=function(){this.C!=null&&(this.C=null,Ni(this),Zo(this),De(19))};function Vi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Th(o,u){var h=null;if(o.g==u){Vi(o),ea(o),o.g=null;var p=2}else if(Yo(o.h,u))h=u.D,th(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var b=o.B;p=bi(),xe(p,new Kl(p,h)),Oi(o)}else Ih(o);else if(b=u.s,b==3||b==0&&0<u.X||!(p==1&&Um(o,u)||p==2&&Zo(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),b){case 1:Xt(o,5);break;case 4:Xt(o,10);break;case 3:Xt(o,6);break;default:Xt(o,2)}}}function bh(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function Xt(o,u){if(o.j.info("Error code "+u),u==2){var h=I(o.fb,o),p=o.Xa;let b=!p;p=new $t(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Pi(p,"https"),ki(p),b?Dm(p.toString(),h):Nm(p.toString(),h)}else De(2);o.G=0,o.l&&o.l.sa(u),Ah(o),_h(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),De(2)):(this.j.info("Failed to ping google.com"),De(1))};function Ah(o){if(o.G=0,o.ka=[],o.l){let u=nh(o.h);(u.length!=0||o.i.length!=0)&&(k(o.ka,u),k(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function Sh(o,u,h){var p=h instanceof $t?ut(h):new $t(h);if(p.g!="")u&&(p.g=u+"."+p.g),Ci(p,p.s);else{var b=c.location;p=b.protocol,u=u?u+"."+b.hostname:b.hostname,b=+b.port;var S=new $t(null);p&&Pi(S,p),u&&(S.g=u),b&&Ci(S,b),h&&(S.l=h),p=S}return h=o.D,u=o.ya,h&&u&&re(p,h,u),re(p,"VER",o.la),Tr(o,p),p}function Rh(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new oe(new vr({eb:h})):new oe(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ph(){}n=Ph.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Mi(){}Mi.prototype.g=function(o,u){return new Me(o,u)};function Me(o,u){Ie.call(this),this.g=new yh(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!G(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!G(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Sn(this)}D(Me,Ie),Me.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Me.prototype.close=function(){Xo(this.g)},Me.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Bo(o),o=h);u.i.push(new Em(u.Ya++,o)),u.G==3&&Oi(u)},Me.prototype.N=function(){this.g.l=null,delete this.j,Xo(this.g),delete this.g,Me.aa.N.call(this)};function Ch(o){jo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(let h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}D(Ch,jo);function kh(){zo.call(this),this.status=1}D(kh,zo);function Sn(o){this.g=o}D(Sn,Ph),Sn.prototype.ua=function(){xe(this.g,"a")},Sn.prototype.ta=function(o){xe(this.g,new Ch(o))},Sn.prototype.sa=function(o){xe(this.g,new kh)},Sn.prototype.ra=function(){xe(this.g,"b")},Mi.prototype.createWebChannel=Mi.prototype.g,Me.prototype.send=Me.prototype.o,Me.prototype.open=Me.prototype.m,Me.prototype.close=Me.prototype.close,uc=mt.createWebChannelTransport=function(){return new Mi},cc=mt.getStatEventTarget=function(){return bi()},ac=mt.Event=Yt,Ts=mt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ai.NO_ERROR=0,Ai.TIMEOUT=8,Ai.HTTP_ERROR=6,Br=mt.ErrorCode=Ai,Wl.COMPLETE="complete",oc=mt.EventType=Wl,ql.EventType=hr,hr.OPEN="a",hr.CLOSE="b",hr.ERROR="c",hr.MESSAGE="d",Ie.prototype.listen=Ie.prototype.K,On=mt.WebChannel=ql,sc=mt.FetchXmlHttpFactory=vr,oe.prototype.listenOnce=oe.prototype.L,oe.prototype.getLastError=oe.prototype.Ka,oe.prototype.getLastErrorCode=oe.prototype.Ba,oe.prototype.getStatus=oe.prototype.Z,oe.prototype.getResponseJson=oe.prototype.Oa,oe.prototype.getResponseText=oe.prototype.oa,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Ha,ic=mt.XhrIo=oe}).apply(typeof Es!="undefined"?Es:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var nf="@firebase/firestore";var me=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};me.UNAUTHENTICATED=new me(null),me.GOOGLE_CREDENTIALS=new me("google-credentials-uid"),me.FIRST_PARTY=new me("first-party-uid"),me.MOCK_USER=new me("mock-user");var Zn="10.12.1";var ln=new At("@firebase/firestore");function qr(){return ln.logLevel}function M(n,...e){if(ln.logLevel<=K.DEBUG){let t=e.map(Xu);ln.debug(`Firestore (${Zn}): ${n}`,...t)}}function gt(n,...e){if(ln.logLevel<=K.ERROR){let t=e.map(Xu);ln.error(`Firestore (${Zn}): ${n}`,...t)}}function qn(n,...e){if(ln.logLevel<=K.WARN){let t=e.map(Xu);ln.warn(`Firestore (${Zn}): ${n}`,...t)}}function Xu(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function U(n="Unexpected state"){let e=`FIRESTORE (${Zn}) INTERNAL ASSERTION FAILED: `+n;throw gt(e),new Error(e)}function X(n,e){n||U()}function q(n,e){return n}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},O=class extends Le{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var rt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Ps=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},fc=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(me.UNAUTHENTICATED))}shutdown(){}},pc=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},mc=class{constructor(e){this.t=e,this.currentUser=me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),s=new rt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new rt,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),a()};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?c(l):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new rt)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string"),new Ps(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string"),new me(e)}},gc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=me.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},yc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new gc(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(me.FIRST_PARTY))}shutdown(){}invalidateToken(){}},_c=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},vc=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let a=s.token!==this.R;return this.R=s.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(X(typeof t.token=="string"),this.R=t.token,new _c(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function X_(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Cs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=X_(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function J(n,e){return n<e?-1:n>e?1:0}function jn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var pe=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var B=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new pe(0,0))}static max(){return new n(new pe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var ks=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(),r===void 0?r=e.length-t:r>e.length-t&&U(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),a=t.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},ie=class n extends ks{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new O(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},Z_=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Fe=class n extends ks{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return Z_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new O(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new O(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new O(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var F=class n{constructor(e){this.path=e}static fromPath(e){return new n(ie.fromString(e))}static fromName(e){return new n(ie.fromString(e).popFirst(5))}static empty(){return new n(ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new ie(e.slice()))}};var wc=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};wc.UNKNOWN_ID=-1;function ev(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=B.fromTimestamp(r===1e9?new pe(t+1,0):new pe(t,r));return new hn(i,F.empty(),e)}function tv(n){return new hn(n.readTime,n.key,-1)}var hn=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(B.min(),F.empty(),-1)}static max(){return new n(B.max(),F.empty(),-1)}};function nv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}var rv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Ic=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function ui(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==rv)throw n;M("LocalStore","Unexpectedly lost primary lease")}var x=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),c=0;for(let l=0;l<s;l++){let d=l;t(e[d]).next(m=>{a[d]=m,++c,c===s&&r(a)},m=>i(m))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function iv(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function li(n){return n.name==="IndexedDbTransactionError"}var Qr=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};Qr.oe=-1;function hi(n){return n==null}function Yr(n){return n===0&&1/n==-1/0}function sv(n){return typeof n=="number"&&Number.isInteger(n)&&!Yr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var ov=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],xT=[...ov,"documentOverlays"],av=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],cv=av,DT=[...cv,"indexConfiguration","indexState","indexEntries"];function rf(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function yn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Mf(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var ce=class n{constructor(e,t){this.comparator=e,this.root=t||it.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,it.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,it.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Fn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Fn(this.root,e,this.comparator,!1)}getReverseIterator(){return new Fn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Fn(this.root,e,this.comparator,!0)}},Fn=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},it=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw U();let e=this.left.check();if(e!==this.right.check())throw U();return e+(this.isRed()?0:1)}};it.EMPTY=null,it.RED=!0,it.BLACK=!1;it.EMPTY=new class{constructor(){this.size=0}get key(){throw U()}get value(){throw U()}get color(){throw U()}get left(){throw U()}get right(){throw U()}copy(e,t,r,i,s){return this}insert(e,t,r){return new it(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Se=class n{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xs(this.data.getIterator())}getIteratorFrom(e){return new xs(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},xs=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var ze=class n{constructor(e){this.fields=e,e.sort(Fe.comparator)}static empty(){return new n([])}unionWith(e){let t=new Se(Fe.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return jn(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Ds=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Ne=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new Ds("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ne.EMPTY_BYTE_STRING=new Ne("");var uv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yt(n){if(X(!!n),typeof n=="string"){let e=0,t=uv.exec(n);if(X(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ae(n.seconds),nanos:ae(n.nanos)}}function ae(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ft(n){return typeof n=="string"?Ne.fromBase64String(n):Ne.fromUint8Array(n)}function Zu(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function el(n){let e=n.mapValue.fields.__previous_value__;return Zu(e)?el(e):e}function Jr(n){let e=yt(n.mapValue.fields.__local_write_time__.timestampValue);return new pe(e.seconds,e.nanos)}var Ec=class{constructor(e,t,r,i,s,a,c,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d}},Ns=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var bs={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function dn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Zu(n)?4:Lf(n)?9007199254740991:10:U()}function ot(n,e){if(n===e)return!0;let t=dn(n);if(t!==dn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Jr(n).isEqual(Jr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=yt(i.timestampValue),c=yt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Ft(i.bytesValue).isEqual(Ft(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ae(i.geoPointValue.latitude)===ae(s.geoPointValue.latitude)&&ae(i.geoPointValue.longitude)===ae(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ae(i.integerValue)===ae(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=ae(i.doubleValue),c=ae(s.doubleValue);return a===c?Yr(a)===Yr(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return jn(n.arrayValue.values||[],e.arrayValue.values||[],ot);case 10:return function(i,s){let a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(rf(a)!==rf(c))return!1;for(let l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!ot(a[l],c[l])))return!1;return!0}(n,e);default:return U()}}function $r(n,e){return(n.values||[]).find(t=>ot(t,e))!==void 0}function zn(n,e){if(n===e)return 0;let t=dn(n),r=dn(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(s,a){let c=ae(s.integerValue||s.doubleValue),l=ae(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return sf(n.timestampValue,e.timestampValue);case 4:return sf(Jr(n),Jr(e));case 5:return J(n.stringValue,e.stringValue);case 6:return function(s,a){let c=Ft(s),l=Ft(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let c=s.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){let m=J(c[d],l[d]);if(m!==0)return m}return J(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let c=J(ae(s.latitude),ae(a.latitude));return c!==0?c:J(ae(s.longitude),ae(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,a){let c=s.values||[],l=a.values||[];for(let d=0;d<c.length&&d<l.length;++d){let m=zn(c[d],l[d]);if(m)return m}return J(c.length,l.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,a){if(s===bs.mapValue&&a===bs.mapValue)return 0;if(s===bs.mapValue)return 1;if(a===bs.mapValue)return-1;let c=s.fields||{},l=Object.keys(c),d=a.fields||{},m=Object.keys(d);l.sort(),m.sort();for(let v=0;v<l.length&&v<m.length;++v){let I=J(l[v],m[v]);if(I!==0)return I;let R=zn(c[l[v]],d[m[v]]);if(R!==0)return R}return J(l.length,m.length)}(n.mapValue,e.mapValue);default:throw U()}}function sf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);let t=yt(n),r=yt(e),i=J(t.seconds,r.seconds);return i!==0?i:J(t.nanos,r.nanos)}function Gn(n){return Tc(n)}function Tc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=yt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ft(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Tc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+=`${a}:${Tc(t.fields[a])}`;return i+"}"}(n.mapValue):U()}function of(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function bc(n){return!!n&&"integerValue"in n}function tl(n){return!!n&&"arrayValue"in n}function af(n){return!!n&&"nullValue"in n}function cf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ss(n){return!!n&&"mapValue"in n}function zr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return yn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=zr(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=zr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Lf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var Ve=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ss(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=zr(t)}setAll(e){let t=Fe.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=zr(a):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Ss(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ot(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Ss(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){yn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(zr(this.value))}};function Ff(n){let e=[];return yn(n.fields,(t,r)=>{let i=new Fe([t]);if(Ss(r)){let s=Ff(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new ze(e)}var Be=class n{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new n(e,0,B.min(),B.min(),B.min(),Ve.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,B.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,B.min(),B.min(),Ve.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,B.min(),B.min(),Ve.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ve.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ve.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Kn=class{constructor(e,t){this.position=e,this.inclusive=t}};function uf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=zn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function lf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ot(n.position[t],e.position[t]))return!1;return!0}var fn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function lv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Os=class{},he=class n extends Os{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Sc(e,t,r):t==="array-contains"?new Cc(e,r):t==="in"?new kc(e,r):t==="not-in"?new xc(e,r):t==="array-contains-any"?new Dc(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Rc(e,r):new Pc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(zn(t,this.value)):t!==null&&dn(this.value)===dn(t)&&this.matchesComparison(zn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Je=class n extends Os{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return Uf(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function Uf(n){return n.op==="and"}function Bf(n){return hv(n)&&Uf(n)}function hv(n){for(let e of n.filters)if(e instanceof Je)return!1;return!0}function Ac(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+Gn(n.value);if(Bf(n))return n.filters.map(e=>Ac(e)).join(",");{let e=n.filters.map(t=>Ac(t)).join(",");return`${n.op}(${e})`}}function qf(n,e){return n instanceof he?function(r,i){return i instanceof he&&r.op===i.op&&r.field.isEqual(i.field)&&ot(r.value,i.value)}(n,e):n instanceof Je?function(r,i){return i instanceof Je&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&qf(a,i.filters[c]),!0):!1}(n,e):void U()}function jf(n){return n instanceof he?function(t){return`${t.field.canonicalString()} ${t.op} ${Gn(t.value)}`}(n):n instanceof Je?function(t){return t.op.toString()+" {"+t.getFilters().map(jf).join(" ,")+"}"}(n):"Filter"}var Sc=class extends he{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){let t=F.comparator(e.key,this.key);return this.matchesComparison(t)}},Rc=class extends he{constructor(e,t){super(e,"in",t),this.keys=zf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Pc=class extends he{constructor(e,t){super(e,"not-in",t),this.keys=zf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function zf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>F.fromName(r.referenceValue))}var Cc=class extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return tl(t)&&$r(t.arrayValue,this.value)}},kc=class extends he{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&$r(this.value.arrayValue,t)}},xc=class extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if($r(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!$r(this.value.arrayValue,t)}},Dc=class extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!tl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>$r(this.value.arrayValue,r))}};var Nc=class{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.ue=null}};function hf(n,e=null,t=[],r=[],i=null,s=null,a=null){return new Nc(n,e,t,r,i,s,a)}function nl(n){let e=q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ac(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),hi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Gn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Gn(r)).join(",")),e.ue=t}return e.ue}function rl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!lv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!qf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!lf(n.startAt,e.startAt)&&lf(n.endAt,e.endAt)}function Oc(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var Ut=class{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function dv(n,e,t,r,i,s,a,c){return new Ut(n,e,t,r,i,s,a,c)}function il(n){return new Ut(n)}function df(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Gf(n){return n.collectionGroup!==null}function Gr(n){let e=q(n);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Se(Fe.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new fn(s,r))}),t.has(Fe.keyField().canonicalString())||e.ce.push(new fn(Fe.keyField(),r))}return e.ce}function st(n){let e=q(n);return e.le||(e.le=fv(e,Gr(n))),e.le}function fv(n,e){if(n.limitType==="F")return hf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new fn(i.field,s)});let t=n.endAt?new Kn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Kn(n.startAt.position,n.startAt.inclusive):null;return hf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Vc(n,e){let t=n.filters.concat([e]);return new Ut(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Vs(n,e,t){return new Ut(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function oo(n,e){return rl(st(n),st(e))&&n.limitType===e.limitType}function Kf(n){return`${nl(st(n))}|lt:${n.limitType}`}function Vn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>jf(i)).join(", ")}]`),hi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Gn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Gn(i)).join(",")),`Target(${r})`}(st(n))}; limitType=${n.limitType})`}function ao(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):F.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of Gr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,l){let d=uf(a,c,l);return a.inclusive?d<=0:d<0}(r.startAt,Gr(r),i)||r.endAt&&!function(a,c,l){let d=uf(a,c,l);return a.inclusive?d>=0:d>0}(r.endAt,Gr(r),i))}(n,e)}function pv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Wf(n){return(e,t)=>{let r=!1;for(let i of Gr(n)){let s=mv(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function mv(n,e,t){let r=n.field.isKeyField()?F.comparator(e.key,t.key):function(s,a,c){let l=a.data.field(s),d=c.data.field(s);return l!==null&&d!==null?zn(l,d):U()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U()}}var Bt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){yn(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return Mf(this.inner)}size(){return this.innerSize}};var gv=new ce(F.comparator);function _t(){return gv}var Hf=new ce(F.comparator);function jr(...n){let e=Hf;for(let t of n)e=e.insert(t.key,t);return e}function Qf(n){let e=Hf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function cn(){return Kr()}function Yf(){return Kr()}function Kr(){return new Bt(n=>n.toString(),(n,e)=>n.isEqual(e))}var yv=new ce(F.comparator),_v=new Se(F.comparator);function W(...n){let e=_v;for(let t of n)e=e.add(t);return e}var vv=new Se(J);function wv(){return vv}function Jf(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Yr(e)?"-0":e}}function $f(n){return{integerValue:""+n}}function Iv(n,e){return sv(e)?$f(e):Jf(n,e)}var Wn=class{constructor(){this._=void 0}};function Ev(n,e,t){return n instanceof pn?function(i,s){let a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Zu(s)&&(s=el(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(t,e):n instanceof qt?Zf(n,e):n instanceof jt?ep(n,e):function(i,s){let a=Xf(i,s),c=ff(a)+ff(i.Pe);return bc(a)&&bc(i.Pe)?$f(c):Jf(i.serializer,c)}(n,e)}function Tv(n,e,t){return n instanceof qt?Zf(n,e):n instanceof jt?ep(n,e):t}function Xf(n,e){return n instanceof Hn?function(r){return bc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var pn=class extends Wn{},qt=class extends Wn{constructor(e){super(),this.elements=e}};function Zf(n,e){let t=tp(e);for(let r of n.elements)t.some(i=>ot(i,r))||t.push(r);return{arrayValue:{values:t}}}var jt=class extends Wn{constructor(e){super(),this.elements=e}};function ep(n,e){let t=tp(e);for(let r of n.elements)t=t.filter(i=>!ot(i,r));return{arrayValue:{values:t}}}var Hn=class extends Wn{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function ff(n){return ae(n.integerValue||n.doubleValue)}function tp(n){return tl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var Xr=class{constructor(e,t){this.field=e,this.transform=t}};function bv(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof qt&&i instanceof qt||r instanceof jt&&i instanceof jt?jn(r.elements,i.elements,ot):r instanceof Hn&&i instanceof Hn?ot(r.Pe,i.Pe):r instanceof pn&&i instanceof pn}(n.transform,e.transform)}var Mc=class{constructor(e,t){this.version=e,this.transformResults=t}},ge=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Rs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Qn=class{};function np(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new gn(n.key,ge.none()):new mn(n.key,n.data,ge.none());{let t=n.data,r=Ve.empty(),i=new Se(Fe.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new at(n.key,r,new ze(i.toArray()),ge.none())}}function Av(n,e,t){n instanceof mn?function(i,s,a){let c=i.value.clone(),l=mf(i.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof at?function(i,s,a){if(!Rs(i.precondition,s))return void s.convertToUnknownDocument(a.version);let c=mf(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(rp(i)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Wr(n,e,t,r){return n instanceof mn?function(s,a,c,l){if(!Rs(s.precondition,a))return c;let d=s.value.clone(),m=gf(s.fieldTransforms,l,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof at?function(s,a,c,l){if(!Rs(s.precondition,a))return c;let d=gf(s.fieldTransforms,l,a),m=a.data;return m.setAll(rp(s)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(v=>v.field))}(n,e,t,r):function(s,a,c){return Rs(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Sv(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=Xf(r.transform,i||null);s!=null&&(t===null&&(t=Ve.empty()),t.set(r.field,s))}return t||null}function pf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&jn(r,i,(s,a)=>bv(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var mn=class extends Qn{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},at=class extends Qn{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function rp(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function mf(n,e,t){let r=new Map;X(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,Tv(a,c,t[i]))}return r}function gf(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,Ev(s,a,e))}return r}var gn=class extends Qn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Ms=class extends Qn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var Lc=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&Av(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Wr(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Wr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Yf();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;let l=np(a,c);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&jn(this.mutations,e.mutations,(t,r)=>pf(t,r))&&jn(this.baseMutations,e.baseMutations,(t,r)=>pf(t,r))}},Fc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){X(e.mutations.length===r.length);let i=function(){return yv}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var Uc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Bc=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var ue,H;function ip(n){switch(n){default:return U();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function sp(n){if(n===void 0)return gt("GRPC error has no .code"),P.UNKNOWN;switch(n){case ue.OK:return P.OK;case ue.CANCELLED:return P.CANCELLED;case ue.UNKNOWN:return P.UNKNOWN;case ue.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ue.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ue.INTERNAL:return P.INTERNAL;case ue.UNAVAILABLE:return P.UNAVAILABLE;case ue.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ue.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ue.NOT_FOUND:return P.NOT_FOUND;case ue.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ue.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ue.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ue.ABORTED:return P.ABORTED;case ue.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ue.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ue.DATA_LOSS:return P.DATA_LOSS;default:return U()}}(H=ue||(ue={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";var yf=null;function Rv(){return new TextEncoder}var Pv=new Ot([4294967295,4294967295],0);function _f(n){let e=Rv().encode(n),t=new rc;return t.update(e),new Uint8Array(t.digest())}function vf(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ot([t,r],0),new Ot([i,s],0)]}var qc=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new un(`Invalid padding: ${t}`);if(r<0)throw new un(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new un(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new un(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Ot.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Ot.fromNumber(r)));return i.compare(Pv)===1&&(i=new Ot([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;let t=_f(e),[r,i]=vf(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;let t=_f(e),[r,i]=vf(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},un=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Ls=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,Zr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(B.min(),i,new ce(J),_t(),W())}},Zr=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,W(),W(),W())}};var Un=class{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}},Fs=class{constructor(e,t){this.targetId=e,this.me=t}},Us=class{constructor(e,t,r=Ne.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Bs=class{constructor(){this.fe=0,this.ge=If(),this.pe=Ne.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=W(),t=W(),r=W();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:U()}}),new Zr(this.pe,this.ye,e,t,r)}ve(){this.we=!1,this.ge=If()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,X(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},jc=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=_t(),this.qe=wf(),this.Qe=new ce(J)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:U()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){let t=e.targetId,r=e.me.count,i=this.Je(t);if(i){let s=i.target;if(Oc(s))if(r===0){let a=new F(s.path);this.Ue(t,a,Be.newNoDocument(a,B.min()))}else X(r===1);else{let a=this.Ye(t);if(a!==r){let c=this.Ze(e),l=c?this.Xe(c,e,a):1;if(l!==0){this.je(t);let d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}yf==null||yf.et(function(m,v,I,R,D){var V,k,j,G,z,te;let ke={localCacheCount:m,existenceFilterCount:v.count,databaseId:I.database,projectId:I.projectId},Z=v.unchangedNames;return Z&&(ke.bloomFilter={applied:D===0,hashCount:(V=Z==null?void 0:Z.hashCount)!==null&&V!==void 0?V:0,bitmapLength:(G=(j=(k=Z==null?void 0:Z.bits)===null||k===void 0?void 0:k.bitmap)===null||j===void 0?void 0:j.length)!==null&&G!==void 0?G:0,padding:(te=(z=Z==null?void 0:Z.bits)===null||z===void 0?void 0:z.padding)!==null&&te!==void 0?te:0,mightContain:E=>{var g;return(g=R==null?void 0:R.mightContain(E))!==null&&g!==void 0&&g}}),ke}(a,e.me,this.Le.tt(),c,l))}}}}Ze(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,c;try{a=Ft(r).toUint8Array()}catch(l){if(l instanceof Ds)return qn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new qc(a,i,s)}catch(l){return qn(l instanceof un?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){let r=this.Le.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){let t=new Map;this.Be.forEach((s,a)=>{let c=this.Je(a);if(c){if(s.current&&Oc(c.target)){let l=new F(c.target.path);this.ke.get(l)!==null||this.it(a,l)||this.Ue(a,l,Be.newNoDocument(l,e))}s.be&&(t.set(a,s.Ce()),s.ve())}});let r=W();this.qe.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{let d=this.Je(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));let i=new Ls(e,t,this.Qe,this.ke,r);return this.ke=_t(),this.qe=wf(),this.Qe=new ce(J),i}$e(e,t){if(!this.ze(e))return;let r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;let i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Bs,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Se(J),this.qe=this.qe.insert(e,t)),t}ze(e){let t=this.Je(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Bs),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function wf(){return new ce(F.comparator)}function If(){return new ce(F.comparator)}var Cv={asc:"ASCENDING",desc:"DESCENDING"},kv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},xv={and:"AND",or:"OR"},zc=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Gc(n,e){return n.useProto3Json||hi(e)?e:{value:e}}function qs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function op(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Dv(n,e){return qs(n,e.toTimestamp())}function Ue(n){return X(!!n),B.fromTimestamp(function(t){let r=yt(t);return new pe(r.seconds,r.nanos)}(n))}function sl(n,e){return Kc(n,e).canonicalString()}function Kc(n,e){let t=function(i){return new ie(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function ap(n){let e=ie.fromString(n);return X(fp(e)),e}function js(n,e){return sl(n.databaseId,e.path)}function Hr(n,e){let t=ap(e);if(t.get(1)!==n.databaseId.projectId)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(up(t))}function cp(n,e){return sl(n.databaseId,e)}function Nv(n){let e=ap(n);return e.length===4?ie.emptyPath():up(e)}function Wc(n){return new ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function up(n){return X(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Ef(n,e,t){return{name:js(n,e),fields:t.value.mapValue.fields}}function Ov(n,e){return"found"in e?function(r,i){X(!!i.found),i.found.name,i.found.updateTime;let s=Hr(r,i.found.name),a=Ue(i.found.updateTime),c=i.found.createTime?Ue(i.found.createTime):B.min(),l=new Ve({mapValue:{fields:i.found.fields}});return Be.newFoundDocument(s,a,c,l)}(n,e):"missing"in e?function(r,i){X(!!i.missing),X(!!i.readTime);let s=Hr(r,i.missing),a=Ue(i.readTime);return Be.newNoDocument(s,a)}(n,e):U()}function Vv(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:U()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,m){return d.useProto3Json?(X(m===void 0||typeof m=="string"),Ne.fromBase64String(m||"")):(X(m===void 0||m instanceof Buffer||m instanceof Uint8Array),Ne.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){let m=d.code===void 0?P.UNKNOWN:sp(d.code);return new O(m,d.message||"")}(a);t=new Us(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=Hr(n,r.document.name),s=Ue(r.document.updateTime),a=r.document.createTime?Ue(r.document.createTime):B.min(),c=new Ve({mapValue:{fields:r.document.fields}}),l=Be.newFoundDocument(i,s,a,c),d=r.targetIds||[],m=r.removedTargetIds||[];t=new Un(d,m,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=Hr(n,r.document),s=r.readTime?Ue(r.readTime):B.min(),a=Be.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Un([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=Hr(n,r.document),s=r.removedTargetIds||[];t=new Un([],s,i,null)}else{if(!("filter"in e))return U();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new Bc(i,s),c=r.targetId;t=new Fs(c,a)}}return t}function lp(n,e){let t;if(e instanceof mn)t={update:Ef(n,e.key,e.value)};else if(e instanceof gn)t={delete:js(n,e.key)};else if(e instanceof at)t={update:Ef(n,e.key,e.data),updateMask:Gv(e.fieldMask)};else{if(!(e instanceof Ms))return U();t={verify:js(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let c=a.transform;if(c instanceof pn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof qt)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof jt)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Hn)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw U()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Dv(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:U()}(n,e.precondition)),t}function Mv(n,e){return n&&n.length>0?(X(e!==void 0),n.map(t=>function(i,s){let a=i.updateTime?Ue(i.updateTime):Ue(s);return a.isEqual(B.min())&&(a=Ue(s)),new Mc(a,i.transformResults||[])}(t,e))):[]}function Lv(n,e){return{documents:[cp(n,e.path)]}}function Fv(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=cp(n,i);let s=function(d){if(d.length!==0)return dp(Je.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(d){if(d.length!==0)return d.map(m=>function(I){return{field:Mn(I.field),direction:qv(I.dir)}}(m))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let c=Gc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:i}}function Uv(n){let e=Nv(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){X(r===1);let m=t.from[0];m.allDescendants?i=m.collectionId:e=e.child(m.collectionId)}let s=[];t.where&&(s=function(v){let I=hp(v);return I instanceof Je&&Bf(I)?I.getFilters():[I]}(t.where));let a=[];t.orderBy&&(a=function(v){return v.map(I=>function(D){return new fn(Ln(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(I))}(t.orderBy));let c=null;t.limit&&(c=function(v){let I;return I=typeof v=="object"?v.value:v,hi(I)?null:I}(t.limit));let l=null;t.startAt&&(l=function(v){let I=!!v.before,R=v.values||[];return new Kn(R,I)}(t.startAt));let d=null;return t.endAt&&(d=function(v){let I=!v.before,R=v.values||[];return new Kn(R,I)}(t.endAt)),dv(e,i,a,s,c,"F",l,d)}function Bv(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function hp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Ln(t.unaryFilter.field);return he.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Ln(t.unaryFilter.field);return he.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Ln(t.unaryFilter.field);return he.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=Ln(t.unaryFilter.field);return he.create(a,"!=",{nullValue:"NULL_VALUE"});default:return U()}}(n):n.fieldFilter!==void 0?function(t){return he.create(Ln(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return U()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Je.create(t.compositeFilter.filters.map(r=>hp(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return U()}}(t.compositeFilter.op))}(n):U()}function qv(n){return Cv[n]}function jv(n){return kv[n]}function zv(n){return xv[n]}function Mn(n){return{fieldPath:n.canonicalString()}}function Ln(n){return Fe.fromServerFormat(n.fieldPath)}function dp(n){return n instanceof he?function(t){if(t.op==="=="){if(cf(t.value))return{unaryFilter:{field:Mn(t.field),op:"IS_NAN"}};if(af(t.value))return{unaryFilter:{field:Mn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(cf(t.value))return{unaryFilter:{field:Mn(t.field),op:"IS_NOT_NAN"}};if(af(t.value))return{unaryFilter:{field:Mn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Mn(t.field),op:jv(t.op),value:t.value}}}(n):n instanceof Je?function(t){let r=t.getFilters().map(i=>dp(i));return r.length===1?r[0]:{compositeFilter:{op:zv(t.op),filters:r}}}(n):U()}function Gv(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function fp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var ei=class n{constructor(e,t,r,i,s=B.min(),a=B.min(),c=Ne.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var Hc=class{constructor(e){this.ct=e}};function Kv(n){let e=Uv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Vs(e,e.limit,"L"):e}var zs=class{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(ae(e.integerValue));else if("doubleValue"in e){let r=ae(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),Yr(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),typeof r=="string"&&(r=yt(r)),t.At(`${r.seconds||""}`),t.dt(r.nanos||0)}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(Ft(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?Lf(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):U()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};this.Et(t,55);for(let i of Object.keys(r))this.Rt(i,t),this.It(r[i],t)}wt(e,t){let r=e.values||[];this.Et(t,50);for(let i of r)this.It(i,t)}gt(e,t){this.Et(t,37),F.fromName(e).path.forEach(r=>{this.Et(t,60),this.St(r,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}};zs.bt=new zs;var Qc=class{constructor(){this._n=new Yc}addToCollectionParentIndex(e,t){return this._n.add(t),x.resolve()}getCollectionParents(e,t){return x.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return x.resolve()}deleteFieldIndex(e,t){return x.resolve()}deleteAllFieldIndexes(e){return x.resolve()}createTargetIndexes(e,t){return x.resolve()}getDocumentsMatchingTarget(e,t){return x.resolve(null)}getIndexType(e,t){return x.resolve(0)}getFieldIndexes(e,t){return x.resolve([])}getNextCollectionGroupToUpdate(e){return x.resolve(null)}getMinOffset(e,t){return x.resolve(hn.min())}getMinOffsetFromCollectionGroup(e,t){return x.resolve(hn.min())}updateCollectionGroup(e,t,r){return x.resolve()}updateIndexEntries(e,t){return x.resolve()}},Yc=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Se(ie.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Se(ie.comparator)).toArray()}};var OT=new Uint8Array(0);var nt=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};nt.DEFAULT_COLLECTION_PERCENTILE=10,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nt.DEFAULT=new nt(41943040,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nt.DISABLED=new nt(-1,0,0);var ti=class n{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new n(0)}static Ln(){return new n(-1)}};var Jc=class{constructor(){this.changes=new Bt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?x.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var $c=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Xc=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Wr(r.mutation,i,ze.empty(),pe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,W()).next(()=>r))}getLocalViewOfDocuments(e,t,r=W()){let i=cn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=jr();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=cn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,W()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=_t(),a=Kr(),c=function(){return Kr()}();return t.forEach((l,d)=>{let m=r.get(d.key);i.has(d.key)&&(m===void 0||m.mutation instanceof at)?s=s.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),Wr(m.mutation,d,m.mutation.getFieldMask(),pe.now())):a.set(d.key,ze.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,m)=>a.set(d,m)),t.forEach((d,m)=>{var v;return c.set(d,new $c(m,(v=a.get(d))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,t){let r=Kr(),i=new ce((a,c)=>a-c),s=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let c of a)c.keys().forEach(l=>{let d=t.get(l);if(d===null)return;let m=r.get(l)||ze.empty();m=c.applyToLocalView(d,m),r.set(l,m);let v=(i.get(c.batchId)||W()).add(l);i=i.insert(c.batchId,v)})}).next(()=>{let a=[],c=i.getReverseIterator();for(;c.hasNext();){let l=c.getNext(),d=l.key,m=l.value,v=Yf();m.forEach(I=>{if(!s.has(I)){let R=np(t.get(I),r.get(I));R!==null&&v.set(I,R),s=s.add(I)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,v))}return x.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return F.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Gf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):x.resolve(cn()),c=-1,l=s;return a.next(d=>x.forEach(d,(m,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),s.get(m)?x.resolve():this.remoteDocumentCache.getEntry(e,m).next(I=>{l=l.insert(m,I)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,W())).next(m=>({batchId:c,changes:Qf(m)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let i=jr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=jr();return this.indexManager.getCollectionParents(e,s).next(c=>x.forEach(c,l=>{let d=function(v,I){return new Ut(I,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(m=>{m.forEach((v,I)=>{a=a.insert(v,I)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,d)=>{let m=d.getKey();a.get(m)===null&&(a=a.insert(m,Be.newInvalidDocument(m)))});let c=jr();return a.forEach((l,d)=>{let m=s.get(l);m!==void 0&&Wr(m.mutation,d,ze.empty(),pe.now()),ao(t,d)&&(c=c.insert(l,d))}),c})}};var Zc=class{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return x.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ue(i.createTime)}}(t)),x.resolve()}getNamedQuery(e,t){return x.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,function(i){return{name:i.name,query:Kv(i.bundledQuery),readTime:Ue(i.readTime)}}(t)),x.resolve()}};var eu=class{constructor(){this.overlays=new ce(F.comparator),this.hr=new Map}getOverlay(e,t){return x.resolve(this.overlays.get(t))}getOverlays(e,t){let r=cn();return x.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),x.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.hr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.hr.delete(r)),x.resolve()}getOverlaysForCollection(e,t,r){let i=cn(),s=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){let l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return x.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ce((d,m)=>d-m),a=this.overlays.getIterator();for(;a.hasNext();){let d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let m=s.get(d.largestBatchId);m===null&&(m=cn(),s=s.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}let c=cn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,m)=>c.set(d,m)),!(c.size()>=i)););return x.resolve(c)}ht(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.hr.get(i.largestBatchId).delete(r.key);this.hr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Uc(t,r));let s=this.hr.get(t);s===void 0&&(s=W(),this.hr.set(t,s)),this.hr.set(t,s.add(r.key))}};var ni=class{constructor(){this.Pr=new Se(le.Ir),this.Tr=new Se(le.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new le(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ar(new le(e,t))}Rr(e,t){e.forEach(r=>this.removeReference(r,t))}Vr(e){let t=new F(new ie([])),r=new le(t,e),i=new le(t,e+1),s=[];return this.Tr.forEachInRange([r,i],a=>{this.Ar(a),s.push(a.key)}),s}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new F(new ie([])),r=new le(t,e),i=new le(t,e+1),s=W();return this.Tr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new le(e,0),r=this.Pr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},le=class{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return F.comparator(e.key,t.key)||J(e.pr,t.pr)}static Er(e,t){return J(e.pr,t.pr)||F.comparator(e.key,t.key)}};var tu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new Se(le.Ir)}checkEmpty(e){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new Lc(s,t,r,i);this.mutationQueue.push(a);for(let c of i)this.wr=this.wr.add(new le(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return x.resolve(a)}lookupMutationBatch(e,t){return x.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.br(r),s=i<0?0:i;return x.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?-1:this.yr-1)}getAllMutationBatches(e){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new le(t,0),i=new le(t,Number.POSITIVE_INFINITY),s=[];return this.wr.forEachInRange([r,i],a=>{let c=this.Sr(a.pr);s.push(c)}),x.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Se(J);return t.forEach(i=>{let s=new le(i,0),a=new le(i,Number.POSITIVE_INFINITY);this.wr.forEachInRange([s,a],c=>{r=r.add(c.pr)})}),x.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;F.isDocumentKey(s)||(s=s.child(""));let a=new le(new F(s),0),c=new Se(J);return this.wr.forEachWhile(l=>{let d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.pr)),!0)},a),x.resolve(this.Dr(c))}Dr(e){let t=[];return e.forEach(r=>{let i=this.Sr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){X(this.Cr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.wr;return x.forEach(t.mutations,i=>{let s=new le(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new le(t,0),i=this.wr.firstAfterOrEqual(r);return x.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,x.resolve()}Cr(e,t){return this.br(e)}br(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var nu=class{constructor(e){this.vr=e,this.docs=function(){return new ce(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return x.resolve(r?r.document.mutableCopy():Be.newInvalidDocument(t))}getEntries(e,t){let r=_t();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Be.newInvalidDocument(i))}),x.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=_t(),a=t.path,c=new F(a.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:d,value:{document:m}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||nv(tv(m),r)<=0||(i.has(m.key)||ao(t,m))&&(s=s.insert(m.key,m.mutableCopy()))}return x.resolve(s)}getAllFromCollectionGroup(e,t,r,i){U()}Fr(e,t){return x.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new ru(this)}getSize(e){return x.resolve(this.size)}},ru=class extends Jc{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ar.addEntry(e,i)):this.ar.removeEntry(r)}),x.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}};var iu=class{constructor(e){this.persistence=e,this.Mr=new Bt(t=>nl(t),rl),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.Or=0,this.Nr=new ni,this.targetCount=0,this.Lr=ti.Nn()}forEachTarget(e,t){return this.Mr.forEach((r,i)=>t(i)),x.resolve()}getLastRemoteSnapshotVersion(e){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return x.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),x.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new ti(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,x.resolve()}updateTargetData(e,t){return this.qn(t),x.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,x.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Mr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Mr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),x.waitFor(s).next(()=>i)}getTargetCount(e){return x.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return x.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),x.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),x.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),x.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return x.resolve(r)}containsKey(e,t){return x.resolve(this.Nr.containsKey(t))}};var su=class{constructor(e,t){this.Br={},this.overlays={},this.kr=new Qr(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new iu(this),this.indexManager=new Qc,this.remoteDocumentCache=function(i){return new nu(i)}(r=>this.referenceDelegate.Kr(r)),this.serializer=new Hc(t),this.$r=new Zc(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new eu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Br[e.toKey()];return r||(r=new tu(t,this.referenceDelegate),this.Br[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);let i=new ou(this.kr.next());return this.referenceDelegate.Ur(),r(i).next(s=>this.referenceDelegate.Wr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Gr(e,t){return x.or(Object.values(this.Br).map(r=>()=>r.containsKey(e,t)))}},ou=class extends Ic{constructor(e){super(),this.currentSequenceNumber=e}},au=class n{constructor(e){this.persistence=e,this.zr=new ni,this.jr=null}static Hr(e){return new n(e)}get Jr(){if(this.jr)return this.jr;throw U()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),x.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),x.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),x.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(i=>this.Jr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Jr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.Jr,r=>{let i=F.fromPath(r);return this.Yr(e,i).next(s=>{s||t.removeEntry(i,B.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(r=>{r?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return x.or([()=>x.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}};var cu=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=i}static Ki(e,t){let r=W(),i=W();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var uu=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var lu=class{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=function(){return Bh()?8:iv(de())>0?6:4}()}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ji(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Hi(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new uu;return this.Ji(e,t,a).next(c=>{if(s.result=c,this.Ui)return this.Yi(e,t,a,c.size)})}).next(()=>s.result)}Yi(e,t,r,i){return r.documentReadCount<this.Wi?(qr()<=K.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Vn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),x.resolve()):(qr()<=K.DEBUG&&M("QueryEngine","Query:",Vn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Gi*i?(qr()<=K.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Vn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,st(t))):x.resolve())}ji(e,t){if(df(t))return x.resolve(null);let r=st(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Vs(t,null,"F"),r=st(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=W(...s);return this.zi.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{let d=this.Zi(t,c);return this.Xi(t,d,a,l.readTime)?this.ji(e,Vs(t,null,"F")):this.es(e,d,t,l)}))})))}Hi(e,t,r,i){return df(t)||i.isEqual(B.min())?x.resolve(null):this.zi.getDocuments(e,r).next(s=>{let a=this.Zi(t,s);return this.Xi(t,a,r,i)?x.resolve(null):(qr()<=K.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Vn(t)),this.es(e,a,t,ev(i,-1)).next(c=>c))})}Zi(e,t){let r=new Se(Wf(e));return t.forEach((i,s)=>{ao(e,s)&&(r=r.add(s))}),r}Xi(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ji(e,t,r){return qr()<=K.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Vn(t)),this.zi.getDocumentsMatchingQuery(e,t,hn.min(),r)}es(e,t,r,i){return this.zi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var hu=class{constructor(e,t,r,i){this.persistence=e,this.ts=t,this.serializer=i,this.ns=new ce(J),this.rs=new Bt(s=>nl(s),rl),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Xc(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}};function Wv(n,e,t,r){return new hu(n,e,t,r)}async function pp(n,e){let t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t._s(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],c=[],l=W();for(let d of i){a.push(d.batchId);for(let m of d.mutations)l=l.add(m.key)}for(let d of s){c.push(d.batchId);for(let m of d.mutations)l=l.add(m.key)}return t.localDocuments.getDocuments(r,l).next(d=>({us:d,removedBatchIds:a,addedBatchIds:c}))})})}function Hv(n,e){let t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.os.newChangeBuffer({trackRemovals:!0});return function(c,l,d,m){let v=d.batch,I=v.keys(),R=x.resolve();return I.forEach(D=>{R=R.next(()=>m.getEntry(l,D)).next(V=>{let k=d.docVersions.get(D);X(k!==null),V.version.compareTo(k)<0&&(v.applyToRemoteDocument(V,d),V.isValidDocument()&&(V.setReadTime(d.commitVersion),m.addEntry(V)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(l,v))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=W();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function mp(n){let e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}function Qv(n,e){let t=q(n),r=e.snapshotVersion,i=t.ns;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.os.newChangeBuffer({trackRemovals:!0});i=t.ns;let c=[];e.targetChanges.forEach((m,v)=>{let I=i.get(v);if(!I)return;c.push(t.Qr.removeMatchingKeys(s,m.removedDocuments,v).next(()=>t.Qr.addMatchingKeys(s,m.addedDocuments,v)));let R=I.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(v)!==null?R=R.withResumeToken(Ne.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):m.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(m.resumeToken,r)),i=i.insert(v,R),function(V,k,j){return V.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(I,R,m)&&c.push(t.Qr.updateTargetData(s,R))});let l=_t(),d=W();if(e.documentUpdates.forEach(m=>{e.resolvedLimboDocuments.has(m)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,m))}),c.push(Yv(s,a,e.documentUpdates).next(m=>{l=m.cs,d=m.ls})),!r.isEqual(B.min())){let m=t.Qr.getLastRemoteSnapshotVersion(s).next(v=>t.Qr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(m)}return x.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.ns=i,s))}function Yv(n,e,t){let r=W(),i=W();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=_t();return t.forEach((c,l)=>{let d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(B.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):M("LocalStore","Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{cs:a,ls:i}})}function Jv(n,e){let t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function $v(n,e){let t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Qr.getTargetData(r,e).next(s=>s?(i=s,x.resolve(i)):t.Qr.allocateTargetId(r).next(a=>(i=new ei(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Qr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.ns.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ns=t.ns.insert(r.targetId,r),t.rs.set(e,r.targetId)),r})}async function du(n,e,t){let r=q(n),i=r.ns.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!li(a))throw a;M("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.ns=r.ns.remove(e),r.rs.delete(i.target)}function Tf(n,e,t){let r=q(n),i=B.min(),s=W();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,m){let v=q(l),I=v.rs.get(m);return I!==void 0?x.resolve(v.ns.get(I)):v.Qr.getTargetData(d,m)}(r,a,st(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Qr.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>r.ts.getDocumentsMatchingQuery(a,e,t?i:B.min(),t?s:W())).next(c=>(Xv(r,pv(e),c),{documents:c,hs:s})))}function Xv(n,e,t){let r=n.ss.get(e)||B.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.ss.set(e,r)}var Gs=class{constructor(){this.activeTargetIds=wv()}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var fu=class{constructor(){this.no=new Gs,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new Gs,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var pu=class{io(e){}shutdown(){}};var Ks=class{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){M("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.uo)e(0)}ao(){M("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.uo)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var As=null;function lc(){return As===null?As=function(){return 268435456+Math.round(2147483648*Math.random())}():As++,"0x"+As.toString(16)}var Zv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var mu=class{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}Ao(e){this.Ro=e}onMessage(e){this.Vo=e}close(){this.ho()}send(e){this.lo(e)}mo(){this.Io()}fo(){this.Eo()}po(e){this.Ro(e)}yo(e){this.Vo(e)}};var Ae="WebChannelConnection",gu=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.wo=r+"://"+t.host,this.So=`projects/${i}/databases/${s}`,this.bo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Do(){return!1}Co(t,r,i,s,a){let c=lc(),l=this.vo(t,r.toUriEncodedString());M("RestConnection",`Sending RPC '${t}' ${c}:`,l,i);let d={"google-cloud-resource-prefix":this.So,"x-goog-request-params":this.bo};return this.Fo(d,s,a),this.Mo(t,l,d,i).then(m=>(M("RestConnection",`Received RPC '${t}' ${c}: `,m),m),m=>{throw qn("RestConnection",`RPC '${t}' ${c} failed with error: `,m,"url: ",l,"request:",i),m})}xo(t,r,i,s,a,c){return this.Co(t,r,i,s,a)}Fo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Zn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>t[a]=s),i&&i.headers.forEach((s,a)=>t[a]=s)}vo(t,r){let i=Zv[t];return`${this.wo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Mo(e,t,r,i){let s=lc();return new Promise((a,c)=>{let l=new ic;l.setWithCredentials(!0),l.listenOnce(oc.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Br.NO_ERROR:let m=l.getResponseJson();M(Ae,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(m)),a(m);break;case Br.TIMEOUT:M(Ae,`RPC '${e}' ${s} timed out`),c(new O(P.DEADLINE_EXCEEDED,"Request time out"));break;case Br.HTTP_ERROR:let v=l.getStatus();if(M(Ae,`RPC '${e}' ${s} failed with status:`,v,"response text:",l.getResponseText()),v>0){let I=l.getResponseJson();Array.isArray(I)&&(I=I[0]);let R=I==null?void 0:I.error;if(R&&R.status&&R.message){let D=function(k){let j=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(j)>=0?j:P.UNKNOWN}(R.status);c(new O(D,R.message))}else c(new O(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new O(P.UNAVAILABLE,"Connection failed."));break;default:U()}}finally{M(Ae,`RPC '${e}' ${s} completed.`)}});let d=JSON.stringify(i);M(Ae,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",d,r,15)})}Oo(e,t,r){let i=lc(),s=[this.wo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=uc(),c=cc(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.xmlHttpFactory=new sc({})),this.Fo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let m=s.join("");M(Ae,`Creating RPC '${e}' stream ${i}: ${m}`,l);let v=a.createWebChannel(m,l),I=!1,R=!1,D=new mu({lo:k=>{R?M(Ae,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(I||(M(Ae,`Opening RPC '${e}' stream ${i} transport.`),v.open(),I=!0),M(Ae,`RPC '${e}' stream ${i} sending:`,k),v.send(k))},ho:()=>v.close()}),V=(k,j,G)=>{k.listen(j,z=>{try{G(z)}catch(te){setTimeout(()=>{throw te},0)}})};return V(v,On.EventType.OPEN,()=>{R||(M(Ae,`RPC '${e}' stream ${i} transport opened.`),D.mo())}),V(v,On.EventType.CLOSE,()=>{R||(R=!0,M(Ae,`RPC '${e}' stream ${i} transport closed`),D.po())}),V(v,On.EventType.ERROR,k=>{R||(R=!0,qn(Ae,`RPC '${e}' stream ${i} transport errored:`,k),D.po(new O(P.UNAVAILABLE,"The operation could not be completed")))}),V(v,On.EventType.MESSAGE,k=>{var j;if(!R){let G=k.data[0];X(!!G);let z=G,te=z.error||((j=z[0])===null||j===void 0?void 0:j.error);if(te){M(Ae,`RPC '${e}' stream ${i} received error:`,te);let ke=te.status,Z=function(_){let w=ue[_];if(w!==void 0)return sp(w)}(ke),E=te.message;Z===void 0&&(Z=P.INTERNAL,E="Unknown error status: "+ke+" with message "+te.message),R=!0,D.po(new O(Z,E)),v.close()}else M(Ae,`RPC '${e}' stream ${i} received:`,G),D.yo(G)}}),V(c,ac.STAT_EVENT,k=>{k.stat===Ts.PROXY?M(Ae,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===Ts.NOPROXY&&M(Ae,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.fo()},0),D}};function hc(){return typeof document!="undefined"?document:null}function co(n){return new zc(n,!0)}var ri=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.oi=e,this.timerId=t,this.No=r,this.Lo=i,this.Bo=s,this.ko=0,this.qo=null,this.Qo=Date.now(),this.reset()}reset(){this.ko=0}Ko(){this.ko=this.Bo}$o(e){this.cancel();let t=Math.floor(this.ko+this.Uo()),r=Math.max(0,Date.now()-this.Qo),i=Math.max(0,t-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.qo=this.oi.enqueueAfterDelay(this.timerId,i,()=>(this.Qo=Date.now(),e())),this.ko*=this.Lo,this.ko<this.No&&(this.ko=this.No),this.ko>this.Bo&&(this.ko=this.Bo)}Wo(){this.qo!==null&&(this.qo.skipDelay(),this.qo=null)}cancel(){this.qo!==null&&(this.qo.cancel(),this.qo=null)}Uo(){return(Math.random()-.5)*this.ko}};var Ws=class{constructor(e,t,r,i,s,a,c,l){this.oi=e,this.Go=r,this.zo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.jo=0,this.Ho=null,this.Jo=null,this.stream=null,this.Yo=new ri(e,t)}Zo(){return this.state===1||this.state===5||this.Xo()}Xo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.e_()}async stop(){this.Zo()&&await this.close(0)}t_(){this.state=0,this.Yo.reset()}n_(){this.Xo()&&this.Ho===null&&(this.Ho=this.oi.enqueueAfterDelay(this.Go,6e4,()=>this.r_()))}i_(e){this.s_(),this.stream.send(e)}async r_(){if(this.Xo())return this.close(0)}s_(){this.Ho&&(this.Ho.cancel(),this.Ho=null)}o_(){this.Jo&&(this.Jo.cancel(),this.Jo=null)}async close(e,t){this.s_(),this.o_(),this.Yo.cancel(),this.jo++,e!==4?this.Yo.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(gt(t.toString()),gt("Using maximum backoff delay to prevent overloading the backend."),this.Yo.Ko()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.__(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ao(t)}__(){}auth(){this.state=1;let e=this.a_(this.jo),t=this.jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.jo===t&&this.u_(r,i)},r=>{e(()=>{let i=new O(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.c_(i)})})}u_(e,t){let r=this.a_(this.jo);this.stream=this.l_(e,t),this.stream.Po(()=>{r(()=>this.listener.Po())}),this.stream.To(()=>{r(()=>(this.state=2,this.Jo=this.oi.enqueueAfterDelay(this.zo,1e4,()=>(this.Xo()&&(this.state=3),Promise.resolve())),this.listener.To()))}),this.stream.Ao(i=>{r(()=>this.c_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}e_(){this.state=5,this.Yo.$o(async()=>{this.state=0,this.start()})}c_(e){return M("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}a_(e){return t=>{this.oi.enqueueAndForget(()=>this.jo===e?t():(M("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},yu=class extends Ws{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}l_(e,t){return this.connection.Oo("Listen",e,t)}onMessage(e){this.Yo.reset();let t=Vv(this.serializer,e),r=function(s){if(!("targetChange"in s))return B.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?Ue(a.readTime):B.min()}(e);return this.listener.h_(t,r)}P_(e){let t={};t.database=Wc(this.serializer),t.addTarget=function(s,a){let c,l=a.target;if(c=Oc(l)?{documents:Lv(s,l)}:{query:Fv(s,l)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=op(s,a.resumeToken);let d=Gc(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(B.min())>0){c.readTime=qs(s,a.snapshotVersion.toTimestamp());let d=Gc(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);let r=Bv(this.serializer,e);r&&(t.labels=r),this.i_(t)}I_(e){let t={};t.database=Wc(this.serializer),t.removeTarget=e,this.i_(t)}},_u=class extends Ws{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s,this.T_=!1}get E_(){return this.T_}start(){this.T_=!1,this.lastStreamToken=void 0,super.start()}__(){this.T_&&this.d_([])}l_(e,t){return this.connection.Oo("Write",e,t)}onMessage(e){if(X(!!e.streamToken),this.lastStreamToken=e.streamToken,this.T_){this.Yo.reset();let t=Mv(e.writeResults,e.commitTime),r=Ue(e.commitTime);return this.listener.A_(r,t)}return X(!e.writeResults||e.writeResults.length===0),this.T_=!0,this.listener.R_()}V_(){let e={};e.database=Wc(this.serializer),this.i_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>lp(this.serializer,r))};this.i_(t)}};var vu=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.m_=!1}f_(){if(this.m_)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}Co(e,t,r,i){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Co(e,Kc(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new O(P.UNKNOWN,s.toString())})}xo(e,t,r,i,s){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.xo(e,Kc(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(P.UNKNOWN,a.toString())})}terminate(){this.m_=!0,this.connection.terminate()}},wu=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.g_=0,this.p_=null,this.y_=!0}w_(){this.g_===0&&(this.S_("Unknown"),this.p_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.p_=null,this.b_("Backend didn't respond within 10 seconds."),this.S_("Offline"),Promise.resolve())))}D_(e){this.state==="Online"?this.S_("Unknown"):(this.g_++,this.g_>=1&&(this.C_(),this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.S_("Offline")))}set(e){this.C_(),this.g_=0,e==="Online"&&(this.y_=!1),this.S_(e)}S_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}b_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.y_?(gt(t),this.y_=!1):M("OnlineStateTracker",t)}C_(){this.p_!==null&&(this.p_.cancel(),this.p_=null)}};var Iu=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.v_=[],this.F_=new Map,this.M_=new Set,this.x_=[],this.O_=s,this.O_.io(a=>{r.enqueueAndForget(async()=>{_n(this)&&(M("RemoteStore","Restarting streams for network reachability change."),await async function(l){let d=q(l);d.M_.add(4),await di(d),d.N_.set("Unknown"),d.M_.delete(4),await uo(d)}(this))})}),this.N_=new wu(r,i)}};async function uo(n){if(_n(n))for(let e of n.x_)await e(!0)}async function di(n){for(let e of n.x_)await e(!1)}function gp(n,e){let t=q(n);t.F_.has(e.targetId)||(t.F_.set(e.targetId,e),ul(t)?cl(t):er(t).Xo()&&al(t,e))}function ol(n,e){let t=q(n),r=er(t);t.F_.delete(e),r.Xo()&&yp(t,e),t.F_.size===0&&(r.Xo()?r.n_():_n(t)&&t.N_.set("Unknown"))}function al(n,e){if(n.L_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}er(n).P_(e)}function yp(n,e){n.L_.xe(e),er(n).I_(e)}function cl(n){n.L_=new jc({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.F_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),er(n).start(),n.N_.w_()}function ul(n){return _n(n)&&!er(n).Zo()&&n.F_.size>0}function _n(n){return q(n).M_.size===0}function _p(n){n.L_=void 0}async function ew(n){n.N_.set("Online")}async function tw(n){n.F_.forEach((e,t)=>{al(n,e)})}async function nw(n,e){_p(n),ul(n)?(n.N_.D_(e),cl(n)):n.N_.set("Unknown")}async function rw(n,e,t){if(n.N_.set("Online"),e instanceof Us&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let c of s.targetIds)i.F_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.F_.delete(c),i.L_.removeTarget(c))}(n,e)}catch(r){M("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Hs(n,r)}else if(e instanceof Un?n.L_.Ke(e):e instanceof Fs?n.L_.He(e):n.L_.We(e),!t.isEqual(B.min()))try{let r=await mp(n.localStore);t.compareTo(r)>=0&&await function(s,a){let c=s.L_.rt(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){let m=s.F_.get(d);m&&s.F_.set(d,m.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{let m=s.F_.get(l);if(!m)return;s.F_.set(l,m.withResumeToken(Ne.EMPTY_BYTE_STRING,m.snapshotVersion)),yp(s,l);let v=new ei(m.target,l,d,m.sequenceNumber);al(s,v)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){M("RemoteStore","Failed to raise snapshot:",r),await Hs(n,r)}}async function Hs(n,e,t){if(!li(e))throw e;n.M_.add(1),await di(n),n.N_.set("Offline"),t||(t=()=>mp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M("RemoteStore","Retrying IndexedDB access"),await t(),n.M_.delete(1),await uo(n)})}function vp(n,e){return e().catch(t=>Hs(n,t,e))}async function lo(n){let e=q(n),t=zt(e),r=e.v_.length>0?e.v_[e.v_.length-1].batchId:-1;for(;iw(e);)try{let i=await Jv(e.localStore,r);if(i===null){e.v_.length===0&&t.n_();break}r=i.batchId,sw(e,i)}catch(i){await Hs(e,i)}wp(e)&&Ip(e)}function iw(n){return _n(n)&&n.v_.length<10}function sw(n,e){n.v_.push(e);let t=zt(n);t.Xo()&&t.E_&&t.d_(e.mutations)}function wp(n){return _n(n)&&!zt(n).Zo()&&n.v_.length>0}function Ip(n){zt(n).start()}async function ow(n){zt(n).V_()}async function aw(n){let e=zt(n);for(let t of n.v_)e.d_(t.mutations)}async function cw(n,e,t){let r=n.v_.shift(),i=Fc.from(r,e,t);await vp(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await lo(n)}async function uw(n,e){e&&zt(n).E_&&await async function(r,i){if(function(a){return ip(a)&&a!==P.ABORTED}(i.code)){let s=r.v_.shift();zt(r).t_(),await vp(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await lo(r)}}(n,e),wp(n)&&Ip(n)}async function bf(n,e){let t=q(n);t.asyncQueue.verifyOperationInProgress(),M("RemoteStore","RemoteStore received new credentials");let r=_n(t);t.M_.add(3),await di(t),r&&t.N_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.M_.delete(3),await uo(t)}async function lw(n,e){let t=q(n);e?(t.M_.delete(2),await uo(t)):e||(t.M_.add(2),await di(t),t.N_.set("Unknown"))}function er(n){return n.B_||(n.B_=function(t,r,i){let s=q(t);return s.f_(),new yu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:ew.bind(null,n),To:tw.bind(null,n),Ao:nw.bind(null,n),h_:rw.bind(null,n)}),n.x_.push(async e=>{e?(n.B_.t_(),ul(n)?cl(n):n.N_.set("Unknown")):(await n.B_.stop(),_p(n))})),n.B_}function zt(n){return n.k_||(n.k_=function(t,r,i){let s=q(t);return s.f_(),new _u(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:()=>Promise.resolve(),To:ow.bind(null,n),Ao:uw.bind(null,n),R_:aw.bind(null,n),A_:cw.bind(null,n)}),n.x_.push(async e=>{e?(n.k_.t_(),await lo(n)):(await n.k_.stop(),n.v_.length>0&&(M("RemoteStore",`Stopping write stream with ${n.v_.length} pending writes`),n.v_=[]))})),n.k_}var Eu=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,c=new n(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function ll(n,e){if(gt("AsyncQueue",`${e}: ${n}`),li(n))return new O(P.UNAVAILABLE,`${e}: ${n}`);throw n}var Qs=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=jr(),this.sortedSet=new ce(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Ys=class{constructor(){this.q_=new ce(F.comparator)}track(e){let t=e.doc.key,r=this.q_.get(t);r?e.type!==0&&r.type===3?this.q_=this.q_.insert(t,e):e.type===3&&r.type!==1?this.q_=this.q_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.q_=this.q_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.q_=this.q_.remove(t):e.type===1&&r.type===2?this.q_=this.q_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):U():this.q_=this.q_.insert(t,e)}Q_(){let e=[];return this.q_.inorderTraversal((t,r)=>{e.push(r)}),e}},Yn=class n{constructor(e,t,r,i,s,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new n(e,t,Qs.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&oo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Tu=class{constructor(){this.K_=void 0,this.U_=[]}W_(){return this.U_.some(e=>e.G_())}},bu=class{constructor(){this.queries=new Bt(e=>Kf(e),oo),this.onlineState="Unknown",this.z_=new Set}};async function hw(n,e){let t=q(n),r=3,i=e.query,s=t.queries.get(i);s?!s.W_()&&e.G_()&&(r=2):(s=new Tu,r=e.G_()?0:1);try{switch(r){case 0:s.K_=await t.onListen(i,!0);break;case 1:s.K_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let c=ll(a,`Initialization of query '${Vn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.U_.push(e),e.j_(t.onlineState),s.K_&&e.H_(s.K_)&&hl(t)}async function dw(n,e){let t=q(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.U_.indexOf(e);a>=0&&(s.U_.splice(a,1),s.U_.length===0?i=e.G_()?0:1:!s.W_()&&e.G_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function fw(n,e){let t=q(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let c of a.U_)c.H_(i)&&(r=!0);a.K_=i}}r&&hl(t)}function pw(n,e,t){let r=q(n),i=r.queries.get(e);if(i)for(let s of i.U_)s.onError(t);r.queries.delete(e)}function hl(n){n.z_.forEach(e=>{e.next()})}var Au,Af;(Af=Au||(Au={})).J_="default",Af.Cache="cache";var Su=class{constructor(e,t,r){this.query=e,this.Y_=t,this.Z_=!1,this.X_=null,this.onlineState="Unknown",this.options=r||{}}H_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Yn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Z_?this.ea(e)&&(this.Y_.next(e),t=!0):this.ta(e,this.onlineState)&&(this.na(e),t=!0),this.X_=e,t}onError(e){this.Y_.error(e)}j_(e){this.onlineState=e;let t=!1;return this.X_&&!this.Z_&&this.ta(this.X_,e)&&(this.na(this.X_),t=!0),t}ta(e,t){if(!e.fromCache||!this.G_())return!0;let r=t!=="Offline";return(!this.options.ra||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ea(e){if(e.docChanges.length>0)return!0;let t=this.X_&&this.X_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}na(e){e=Yn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Z_=!0,this.Y_.next(e)}G_(){return this.options.source!==Au.Cache}};var Js=class{constructor(e){this.key=e}},$s=class{constructor(e){this.key=e}},Ru=class{constructor(e,t){this.query=e,this.la=t,this.ha=null,this.hasCachedResults=!1,this.current=!1,this.Pa=W(),this.mutatedKeys=W(),this.Ia=Wf(e),this.Ta=new Qs(this.Ia)}get Ea(){return this.la}da(e,t){let r=t?t.Aa:new Ys,i=t?t.Ta:this.Ta,s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((m,v)=>{let I=i.get(m),R=ao(this.query,v)?v:null,D=!!I&&this.mutatedKeys.has(I.key),V=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations),k=!1;I&&R?I.data.isEqual(R.data)?D!==V&&(r.track({type:3,doc:R}),k=!0):this.Ra(I,R)||(r.track({type:2,doc:R}),k=!0,(l&&this.Ia(R,l)>0||d&&this.Ia(R,d)<0)&&(c=!0)):!I&&R?(r.track({type:0,doc:R}),k=!0):I&&!R&&(r.track({type:1,doc:I}),k=!0,(l||d)&&(c=!0)),k&&(R?(a=a.add(R),s=V?s.add(m):s.delete(m)):(a=a.delete(m),s=s.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),s=s.delete(m.key),r.track({type:1,doc:m})}return{Ta:a,Aa:r,Xi:c,mutatedKeys:s}}Ra(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.Ta;this.Ta=e.Ta,this.mutatedKeys=e.mutatedKeys;let a=e.Aa.Q_();a.sort((m,v)=>function(R,D){let V=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U()}};return V(R)-V(D)}(m.type,v.type)||this.Ia(m.doc,v.doc)),this.Va(r),i=i!=null&&i;let c=t&&!i?this.ma():[],l=this.Pa.size===0&&this.current&&!i?1:0,d=l!==this.ha;return this.ha=l,a.length!==0||d?{snapshot:new Yn(this.query,e.Ta,s,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),fa:c}:{fa:c}}j_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ta:this.Ta,Aa:new Ys,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{fa:[]}}ga(e){return!this.la.has(e)&&!!this.Ta.has(e)&&!this.Ta.get(e).hasLocalMutations}Va(e){e&&(e.addedDocuments.forEach(t=>this.la=this.la.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.la=this.la.delete(t)),this.current=e.current)}ma(){if(!this.current)return[];let e=this.Pa;this.Pa=W(),this.Ta.forEach(r=>{this.ga(r.key)&&(this.Pa=this.Pa.add(r.key))});let t=[];return e.forEach(r=>{this.Pa.has(r)||t.push(new $s(r))}),this.Pa.forEach(r=>{e.has(r)||t.push(new Js(r))}),t}pa(e){this.la=e.hs,this.Pa=W();let t=this.da(e.documents);return this.applyChanges(t,!0)}ya(){return Yn.fromInitialDocuments(this.query,this.Ta,this.mutatedKeys,this.ha===0,this.hasCachedResults)}},Pu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Cu=class{constructor(e){this.key=e,this.wa=!1}},ku=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Sa={},this.ba=new Bt(c=>Kf(c),oo),this.Da=new Map,this.Ca=new Set,this.va=new ce(F.comparator),this.Fa=new Map,this.Ma=new ni,this.xa={},this.Oa=new Map,this.Na=ti.Ln(),this.onlineState="Unknown",this.La=void 0}get isPrimaryClient(){return this.La===!0}};async function mw(n,e,t=!0){let r=Rp(n),i,s=r.ba.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.ya()):i=await Ep(r,e,t,!0),i}async function gw(n,e){let t=Rp(n);await Ep(t,e,!0,!1)}async function Ep(n,e,t,r){let i=await $v(n.localStore,st(e)),s=i.targetId,a=t?n.sharedClientState.addLocalQueryTarget(s):"not-current",c;return r&&(c=await yw(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&gp(n.remoteStore,i),c}async function yw(n,e,t,r,i){n.Ba=(v,I,R)=>async function(V,k,j,G){let z=k.view.da(j);z.Xi&&(z=await Tf(V.localStore,k.query,!1).then(({documents:E})=>k.view.da(E,z)));let te=G&&G.targetChanges.get(k.targetId),ke=G&&G.targetMismatches.get(k.targetId)!=null,Z=k.view.applyChanges(z,V.isPrimaryClient,te,ke);return Rf(V,k.targetId,Z.fa),Z.snapshot}(n,v,I,R);let s=await Tf(n.localStore,e,!0),a=new Ru(e,s.hs),c=a.da(s.documents),l=Zr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,l);Rf(n,t,d.fa);let m=new Pu(e,t,a);return n.ba.set(e,m),n.Da.has(t)?n.Da.get(t).push(e):n.Da.set(t,[e]),d.snapshot}async function _w(n,e,t){let r=q(n),i=r.ba.get(e),s=r.Da.get(i.targetId);if(s.length>1)return r.Da.set(i.targetId,s.filter(a=>!oo(a,e))),void r.ba.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await du(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&ol(r.remoteStore,i.targetId),xu(r,i.targetId)}).catch(ui)):(xu(r,i.targetId),await du(r.localStore,i.targetId,!0))}async function vw(n,e){let t=q(n),r=t.ba.get(e),i=t.Da.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ol(t.remoteStore,r.targetId))}async function ww(n,e,t){let r=Rw(n);try{let i=await function(a,c){let l=q(a),d=pe.now(),m=c.reduce((R,D)=>R.add(D.key),W()),v,I;return l.persistence.runTransaction("Locally write mutations","readwrite",R=>{let D=_t(),V=W();return l.os.getEntries(R,m).next(k=>{D=k,D.forEach((j,G)=>{G.isValidDocument()||(V=V.add(j))})}).next(()=>l.localDocuments.getOverlayedDocuments(R,D)).next(k=>{v=k;let j=[];for(let G of c){let z=Sv(G,v.get(G.key).overlayedDocument);z!=null&&j.push(new at(G.key,z,Ff(z.value.mapValue),ge.exists(!0)))}return l.mutationQueue.addMutationBatch(R,d,j,c)}).next(k=>{I=k;let j=k.applyToLocalDocumentSet(v,V);return l.documentOverlayCache.saveOverlays(R,k.batchId,j)})}).then(()=>({batchId:I.batchId,changes:Qf(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,l){let d=a.xa[a.currentUser.toKey()];d||(d=new ce(J)),d=d.insert(c,l),a.xa[a.currentUser.toKey()]=d}(r,i.batchId,t),await fi(r,i.changes),await lo(r.remoteStore)}catch(i){let s=ll(i,"Failed to persist write");t.reject(s)}}async function Tp(n,e){let t=q(n);try{let r=await Qv(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Fa.get(s);a&&(X(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.wa=!0:i.modifiedDocuments.size>0?X(a.wa):i.removedDocuments.size>0&&(X(a.wa),a.wa=!1))}),await fi(t,r,e)}catch(r){await ui(r)}}function Sf(n,e,t){let r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.ba.forEach((s,a)=>{let c=a.view.j_(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){let l=q(a);l.onlineState=c;let d=!1;l.queries.forEach((m,v)=>{for(let I of v.U_)I.j_(c)&&(d=!0)}),d&&hl(l)}(r.eventManager,e),i.length&&r.Sa.h_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Iw(n,e,t){let r=q(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Fa.get(e),s=i&&i.key;if(s){let a=new ce(F.comparator);a=a.insert(s,Be.newNoDocument(s,B.min()));let c=W().add(s),l=new Ls(B.min(),new Map,new ce(J),a,c);await Tp(r,l),r.va=r.va.remove(s),r.Fa.delete(e),dl(r)}else await du(r.localStore,e,!1).then(()=>xu(r,e,t)).catch(ui)}async function Ew(n,e){let t=q(n),r=e.batch.batchId;try{let i=await Hv(t.localStore,e);Ap(t,r,null),bp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await fi(t,i)}catch(i){await ui(i)}}async function Tw(n,e,t){let r=q(n);try{let i=await function(a,c){let l=q(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return l.mutationQueue.lookupMutationBatch(d,c).next(v=>(X(v!==null),m=v.keys(),l.mutationQueue.removeMutationBatch(d,v))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,m,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>l.localDocuments.getDocuments(d,m))})}(r.localStore,e);Ap(r,e,t),bp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await fi(r,i)}catch(i){await ui(i)}}function bp(n,e){(n.Oa.get(e)||[]).forEach(t=>{t.resolve()}),n.Oa.delete(e)}function Ap(n,e,t){let r=q(n),i=r.xa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.xa[r.currentUser.toKey()]=i}}function xu(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Da.get(e))n.ba.delete(r),t&&n.Sa.ka(r,t);n.Da.delete(e),n.isPrimaryClient&&n.Ma.Vr(e).forEach(r=>{n.Ma.containsKey(r)||Sp(n,r)})}function Sp(n,e){n.Ca.delete(e.path.canonicalString());let t=n.va.get(e);t!==null&&(ol(n.remoteStore,t),n.va=n.va.remove(e),n.Fa.delete(t),dl(n))}function Rf(n,e,t){for(let r of t)r instanceof Js?(n.Ma.addReference(r.key,e),bw(n,r)):r instanceof $s?(M("SyncEngine","Document no longer in limbo: "+r.key),n.Ma.removeReference(r.key,e),n.Ma.containsKey(r.key)||Sp(n,r.key)):U()}function bw(n,e){let t=e.key,r=t.path.canonicalString();n.va.get(t)||n.Ca.has(r)||(M("SyncEngine","New document in limbo: "+t),n.Ca.add(r),dl(n))}function dl(n){for(;n.Ca.size>0&&n.va.size<n.maxConcurrentLimboResolutions;){let e=n.Ca.values().next().value;n.Ca.delete(e);let t=new F(ie.fromString(e)),r=n.Na.next();n.Fa.set(r,new Cu(t)),n.va=n.va.insert(t,r),gp(n.remoteStore,new ei(st(il(t.path)),r,"TargetPurposeLimboResolution",Qr.oe))}}async function fi(n,e,t){let r=q(n),i=[],s=[],a=[];r.ba.isEmpty()||(r.ba.forEach((c,l)=>{a.push(r.Ba(l,e,t).then(d=>{if((d||t)&&r.isPrimaryClient){let m=d&&!d.fromCache;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(d){i.push(d);let m=cu.Ki(l.targetId,d);s.push(m)}}))}),await Promise.all(a),r.Sa.h_(i),await async function(l,d){let m=q(l);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>x.forEach(d,I=>x.forEach(I.qi,R=>m.persistence.referenceDelegate.addReference(v,I.targetId,R)).next(()=>x.forEach(I.Qi,R=>m.persistence.referenceDelegate.removeReference(v,I.targetId,R)))))}catch(v){if(!li(v))throw v;M("LocalStore","Failed to update sequence numbers: "+v)}for(let v of d){let I=v.targetId;if(!v.fromCache){let R=m.ns.get(I),D=R.snapshotVersion,V=R.withLastLimboFreeSnapshotVersion(D);m.ns=m.ns.insert(I,V)}}}(r.localStore,s))}async function Aw(n,e){let t=q(n);if(!t.currentUser.isEqual(e)){M("SyncEngine","User change. New user:",e.toKey());let r=await pp(t.localStore,e);t.currentUser=e,function(s,a){s.Oa.forEach(c=>{c.forEach(l=>{l.reject(new O(P.CANCELLED,a))})}),s.Oa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await fi(t,r.us)}}function Sw(n,e){let t=q(n),r=t.Fa.get(e);if(r&&r.wa)return W().add(r.key);{let i=W(),s=t.Da.get(e);if(!s)return i;for(let a of s){let c=t.ba.get(a);i=i.unionWith(c.view.Ea)}return i}}function Rp(n){let e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Tp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Sw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Iw.bind(null,e),e.Sa.h_=fw.bind(null,e.eventManager),e.Sa.ka=pw.bind(null,e.eventManager),e}function Rw(n){let e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Ew.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Tw.bind(null,e),e}var Xs=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=co(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return Wv(this.persistence,new lu,e.initialUser,this.serializer)}createPersistence(e){return new su(au.Hr,this.serializer)}createSharedClientState(e){return new fu}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var Du=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Sf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Aw.bind(null,this.syncEngine),await lw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new bu}()}createDatastore(e){let t=co(e.databaseInfo.databaseId),r=function(s){return new gu(s)}(e.databaseInfo);return function(s,a,c,l){return new vu(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new Iu(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Sf(this.syncEngine,t,0),function(){return Ks.D()?new Ks:new pu}())}createSyncEngine(e,t){return function(i,s,a,c,l,d,m){let v=new ku(i,s,a,c,l,d);return m&&(v.La=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(r){let i=q(r);M("RemoteStore","RemoteStore shutting down."),i.M_.add(5),await di(i),i.O_.shutdown(),i.N_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate()}};var Nu=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ka(this.observer.next,e)}error(e){this.observer.error?this.Ka(this.observer.error,e):gt("Uncaught Error in snapshot listener:",e.toString())}$a(){this.muted=!0}Ka(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var Ou=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new O(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(i,s){let a=q(i),c={documents:s.map(v=>js(a.serializer,v))},l=await a.xo("BatchGetDocuments",a.serializer.databaseId,ie.emptyPath(),c,s.length),d=new Map;l.forEach(v=>{let I=Ov(a.serializer,v);d.set(I.key.toString(),I)});let m=[];return s.forEach(v=>{let I=d.get(v.toString());X(!!I),m.push(I)}),m}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new gn(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{let i=F.fromPath(r);this.mutations.push(new Ms(i,this.precondition(i)))}),await async function(r,i){let s=q(r),a={writes:i.map(c=>lp(s.serializer,c))};await s.Co("Commit",s.serializer.databaseId,ie.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw U();t=B.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new O(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(B.min())?ge.exists(!1):ge.updateTime(t):ge.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(B.min()))throw new O(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ge.updateTime(t)}return ge.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};var Vu=class{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.Za=r.maxAttempts,this.Yo=new ri(this.asyncQueue,"transaction_retry")}Xa(){this.Za-=1,this.eu()}eu(){this.Yo.$o(async()=>{let e=new Ou(this.datastore),t=this.tu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.nu(i)}))}).catch(r=>{this.nu(r)})})}tu(e){try{let t=this.updateFunction(e);return!hi(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}nu(e){this.Za>0&&this.ru(e)?(this.Za-=1,this.asyncQueue.enqueueAndForget(()=>(this.eu(),Promise.resolve()))):this.deferred.reject(e)}ru(e){if(e.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!ip(t)}return!1}};var Mu=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=me.UNAUTHENTICATED,this.clientId=Cs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{M("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(M("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=ll(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function dc(n,e){n.asyncQueue.verifyOperationInProgress(),M("FirestoreClient","Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await pp(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Pf(n,e){n.asyncQueue.verifyOperationInProgress();let t=await Cw(n);M("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>bf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>bf(e.remoteStore,i)),n._onlineComponents=e}function Pw(n){return n.name==="FirebaseError"?n.code===P.FAILED_PRECONDITION||n.code===P.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function Cw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M("FirestoreClient","Using user provided OfflineComponentProvider");try{await dc(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!Pw(t))throw t;qn("Error using user provided cache. Falling back to memory cache: "+t),await dc(n,new Xs)}}else M("FirestoreClient","Using default OfflineComponentProvider"),await dc(n,new Xs);return n._offlineComponents}async function fl(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M("FirestoreClient","Using user provided OnlineComponentProvider"),await Pf(n,n._uninitializedComponentsProvider._online)):(M("FirestoreClient","Using default OnlineComponentProvider"),await Pf(n,new Du))),n._onlineComponents}function kw(n){return fl(n).then(e=>e.syncEngine)}function xw(n){return fl(n).then(e=>e.datastore)}async function Cf(n){let e=await fl(n),t=e.eventManager;return t.onListen=mw.bind(null,e.syncEngine),t.onUnlisten=_w.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=gw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=vw.bind(null,e.syncEngine),t}function Pp(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var kf=new Map;function Cp(n,e,t){if(!t)throw new O(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Dw(n,e,t,r){if(e===!0&&r===!0)throw new O(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function xf(n){if(!F.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Df(n){if(F.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ho(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U()}function Ge(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=ho(n);throw new O(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Nw(n,e){if(e<=0)throw new O(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}var Zs=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new O(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Dw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Pp((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Jn=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zs({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new O(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new O(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zs(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new fc;switch(r.type){case"firstParty":return new yc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=kf.get(t);r&&(M("ComponentProvider","Removing Datastore"),kf.delete(t),r.terminate())}(this),Promise.resolve()}};function pl(n,e,t,r={}){var i;let s=(n=Ge(n,Jn))._getSettings(),a=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&qn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=me.MOCK_USER;else{c=Vh(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new O(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new me(d)}n._authCredentials=new pc(new Ps(c,l))}}var Gt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Re=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},Lt=class n extends Gt{constructor(e,t,r){super(e,t,il(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new F(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Ke(n,e,...t){if(n=se(n),Cp("collection","path",e),n instanceof Jn){let r=ie.fromString(e,...t);return Df(r),new Lt(n,null,r)}{if(!(n instanceof Re||n instanceof Lt))throw new O(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ie.fromString(e,...t));return Df(r),new Lt(n.firestore,null,r)}}function Pe(n,e,...t){if(n=se(n),arguments.length===1&&(e=Cs.newId()),Cp("doc","path",e),n instanceof Jn){let r=ie.fromString(e,...t);return xf(r),new Re(n,null,new F(r))}{if(!(n instanceof Re||n instanceof Lt))throw new O(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ie.fromString(e,...t));return xf(r),new Re(n.firestore,n instanceof Lt?n.converter:null,new F(r))}}var Lu=class{constructor(){this.iu=Promise.resolve(),this.su=[],this.ou=!1,this._u=[],this.au=null,this.uu=!1,this.cu=!1,this.lu=[],this.Yo=new ri(this,"async_queue_retry"),this.hu=()=>{let t=hc();t&&M("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Yo.Wo()};let e=hc();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.hu)}get isShuttingDown(){return this.ou}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.ou){this.ou=!0,this.cu=e||!1;let t=hc();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hu)}}enqueue(e){if(this.Pu(),this.ou)return new Promise(()=>{});let t=new rt;return this.Iu(()=>this.ou&&this.cu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.su.push(e),this.Tu()))}async Tu(){if(this.su.length!==0){try{await this.su[0](),this.su.shift(),this.Yo.reset()}catch(e){if(!li(e))throw e;M("AsyncQueue","Operation failed with retryable error: "+e)}this.su.length>0&&this.Yo.$o(()=>this.Tu())}}Iu(e){let t=this.iu.then(()=>(this.uu=!0,e().catch(r=>{this.au=r,this.uu=!1;let i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw gt("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.uu=!1,r))));return this.iu=t,t}enqueueAfterDelay(e,t,r){this.Pu(),this.lu.indexOf(e)>-1&&(t=0);let i=Eu.createAndSchedule(this,e,t,r,s=>this.Eu(s));return this._u.push(i),i}Pu(){this.au&&U()}verifyOperationInProgress(){}async du(){let e;do e=this.iu,await e;while(e!==this.iu)}Au(e){for(let t of this._u)if(t.timerId===e)return!0;return!1}Ru(e){return this.du().then(()=>{this._u.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this._u)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.du()})}Vu(e){this.lu.push(e)}Eu(e){let t=this._u.indexOf(e);this._u.splice(t,1)}};function Nf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var $e=class extends Jn{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new Lu}(),this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||xp(this),this._firestoreClient.terminate()}};function kp(n,e){let t=typeof n=="object"?n:zi(),r=typeof n=="string"?n:e||"(default)",i=Sr(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=Oh("firestore");s&&pl(i,...s)}return i}function fo(n){return n._firestoreClient||xp(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function xp(n){var e,t,r;let i=n._freezeSettings(),s=function(c,l,d,m){return new Ec(c,l,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Pp(m.experimentalLongPollingOptions),m.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new Mu(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var $n=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Ne.fromBase64String(e))}catch(t){throw new O(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Ne.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Kt=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Wt=class{constructor(e){this._methodName=e}};var ii=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}};var Ow=/^__.*__$/,Fu=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new at(e,this.data,this.fieldMask,t,this.fieldTransforms):new mn(e,this.data,t,this.fieldTransforms)}},eo=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new at(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Dp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U()}}var to=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.mu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get fu(){return this.settings.fu}gu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}pu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.wu(e),i}Su(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.mu(),i}bu(e){return this.gu({path:void 0,yu:!0})}Du(e){return ro(e,this.settings.methodName,this.settings.Cu||!1,this.path,this.settings.vu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}mu(){if(this.path)for(let e=0;e<this.path.length;e++)this.wu(this.path.get(e))}wu(e){if(e.length===0)throw this.Du("Document fields must not be empty");if(Dp(this.fu)&&Ow.test(e))throw this.Du('Document fields cannot begin and end with "__"')}},Uu=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||co(e)}Fu(e,t,r,i=!1){return new to({fu:e,methodName:t,vu:r,path:Fe.emptyPath(),yu:!1,Cu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function tr(n){let e=n._freezeSettings(),t=co(n._databaseId);return new Uu(n._databaseId,!!e.ignoreUndefinedProperties,t)}function po(n,e,t,r,i,s={}){let a=n.Fu(s.merge||s.mergeFields?2:0,e,t,i);yl("Data must be an object, but it was:",a,r);let c=Op(r,a),l,d;if(s.merge)l=new ze(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){let m=[];for(let v of s.mergeFields){let I=zu(e,v,t);if(!a.contains(I))throw new O(P.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Mp(m,I)||m.push(I)}l=new ze(m),d=a.fieldTransforms.filter(v=>l.covers(v.field))}else l=null,d=a.fieldTransforms;return new Fu(new Ve(c),l,d)}var no=class n extends Wt{_toFieldTransform(e){if(e.fu!==2)throw e.fu===1?e.Du(`${this._methodName}() can only appear at the top level of your update data`):e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function Np(n,e,t){return new to({fu:3,vu:e.settings.vu,methodName:n._methodName,yu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}var Bu=class n extends Wt{_toFieldTransform(e){return new Xr(e.path,new pn)}isEqual(e){return e instanceof n}},qu=class n extends Wt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=Np(this,e,!0),r=this.Mu.map(s=>vn(s,t)),i=new qt(r);return new Xr(e.path,i)}isEqual(e){return e instanceof n&&dt(this.Mu,e.Mu)}},ju=class n extends Wt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=Np(this,e,!0),r=this.Mu.map(s=>vn(s,t)),i=new jt(r);return new Xr(e.path,i)}isEqual(e){return e instanceof n&&dt(this.Mu,e.Mu)}};function ml(n,e,t,r){let i=n.Fu(1,e,t);yl("Data must be an object, but it was:",i,r);let s=[],a=Ve.empty();yn(r,(l,d)=>{let m=_l(e,l,t);d=se(d);let v=i.Su(m);if(d instanceof no)s.push(m);else{let I=vn(d,v);I!=null&&(s.push(m),a.set(m,I))}});let c=new ze(s);return new eo(a,c,i.fieldTransforms)}function gl(n,e,t,r,i,s){let a=n.Fu(1,e,t),c=[zu(e,r,t)],l=[i];if(s.length%2!=0)throw new O(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<s.length;I+=2)c.push(zu(e,s[I])),l.push(s[I+1]);let d=[],m=Ve.empty();for(let I=c.length-1;I>=0;--I)if(!Mp(d,c[I])){let R=c[I],D=l[I];D=se(D);let V=a.Su(R);if(D instanceof no)d.push(R);else{let k=vn(D,V);k!=null&&(d.push(R),m.set(R,k))}}let v=new ze(d);return new eo(m,v,a.fieldTransforms)}function Vw(n,e,t,r=!1){return vn(t,n.Fu(r?4:3,e))}function vn(n,e){if(Vp(n=se(n)))return yl("Unsupported field value:",e,n),Op(n,e);if(n instanceof Wt)return function(r,i){if(!Dp(i.fu))throw i.Du(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Du(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.yu&&e.fu!==4)throw e.Du("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let c of r){let l=vn(c,i.bu(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Iv(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=pe.fromDate(r);return{timestampValue:qs(i.serializer,s)}}if(r instanceof pe){let s=new pe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:qs(i.serializer,s)}}if(r instanceof ii)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof $n)return{bytesValue:op(i.serializer,r._byteString)};if(r instanceof Re){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Du(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:sl(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Du(`Unsupported field value: ${ho(r)}`)}(n,e)}function Op(n,e){let t={};return Mf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):yn(n,(r,i)=>{let s=vn(i,e.pu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Vp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof pe||n instanceof ii||n instanceof $n||n instanceof Re||n instanceof Wt)}function yl(n,e,t){if(!Vp(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=ho(t);throw r==="an object"?e.Du(n+" a custom object"):e.Du(n+" "+r)}}function zu(n,e,t){if((e=se(e))instanceof Kt)return e._internalPath;if(typeof e=="string")return _l(n,e);throw ro("Field path arguments must be of type string or ",n,!1,void 0,t)}var Mw=new RegExp("[~\\*/\\[\\]]");function _l(n,e,t){if(e.search(Mw)>=0)throw ro(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Kt(...e.split("."))._internalPath}catch{throw ro(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ro(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new O(P.INVALID_ARGUMENT,c+n+l)}function Mp(n,e){return n.some(t=>t.isEqual(e))}var Xn=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Gu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(mo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Gu=class extends Xn{data(){return super.data()}};function mo(n,e){return typeof e=="string"?_l(n,e):e instanceof Kt?e._internalPath:e._delegate._internalPath}function Lw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var si=class{},oi=class extends si{};function go(n,e,...t){let r=[];e instanceof si&&r.push(e),r=r.concat(t),function(s){let a=s.filter(l=>l instanceof Ku).length,c=s.filter(l=>l instanceof io).length;if(a>1||a>0&&c>0)throw new O(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var io=class n extends oi{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return Fp(e._query,t),new Gt(e.firestore,e.converter,Vc(e._query,t))}_parse(e){let t=tr(e.firestore);return function(s,a,c,l,d,m,v){let I;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new O(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Vf(v,m);let R=[];for(let D of v)R.push(Of(l,s,D));I={arrayValue:{values:R}}}else I=Of(l,s,v)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Vf(v,m),I=Vw(c,a,v,m==="in"||m==="not-in");return he.create(d,m,I)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function Lp(n,e,t){let r=e,i=mo("where",n);return io._create(i,r,t)}var Ku=class n extends si{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Je.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i,c=s.getFlattenedFilters();for(let l of c)Fp(a,l),a=Vc(a,l)}(e._query,t),new Gt(e.firestore,e.converter,Vc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var Wu=class n extends oi{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,a){if(i.startAt!==null)throw new O(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new O(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new fn(s,a)}(e._query,this._field,this._direction);return new Gt(e.firestore,e.converter,function(i,s){let a=i.explicitOrderBy.concat([s]);return new Ut(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function yo(n,e="asc"){let t=e,r=mo("orderBy",n);return Wu._create(r,t)}var Hu=class n extends oi{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new Gt(e.firestore,e.converter,Vs(e._query,this._limit,this._limitType))}};function _o(n){return Nw("limit",n),Hu._create("limit",n,"F")}function Of(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new O(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Gf(e)&&t.indexOf("/")!==-1)throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(ie.fromString(t));if(!F.isDocumentKey(r))throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return of(n,new F(r))}if(t instanceof Re)return of(n,t._key);throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ho(t)}.`)}function Vf(n,e){if(!Array.isArray(n)||n.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Fp(n,e){let t=function(i,s){for(let a of i)for(let c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new O(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new O(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var so=class{convertValue(e,t="none"){switch(dn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ft(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw U()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return yn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new ii(ae(e.latitude),ae(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=el(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Jr(e));default:return null}}convertTimestamp(e){let t=yt(e);return new pe(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=ie.fromString(e);X(fp(r));let i=new Ns(r.get(1),r.get(3)),s=new F(r.popFirst(5));return i.isEqual(t)||gt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function vo(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Qu=class extends so{constructor(e){super(),this.firestore=e}convertBytes(e){return new $n(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}};var Mt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},ai=class extends Xn{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Bn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(mo("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},Bn=class extends ai{data(e={}){return super.data(e)}},Yu=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Mt(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Bn(this._firestore,this._userDataWriter,r.key,r,new Mt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{let l=new Bn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Mt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let l=new Bn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Mt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),d=-1,m=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),m=a.indexOf(c.doc.key)),{type:Fw(c.type),doc:l,oldIndex:d,newIndex:m}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function Fw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U()}}var ci=class extends so{constructor(e){super(),this.firestore=e}convertBytes(e){return new $n(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}};function pi(n,e,t){n=Ge(n,Re);let r=Ge(n.firestore,$e),i=vo(n.converter,e,t);return yi(r,[po(tr(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,ge.none())])}function wo(n,e,t,...r){n=Ge(n,Re);let i=Ge(n.firestore,$e),s=tr(i),a;return a=typeof(e=se(e))=="string"||e instanceof Kt?gl(s,"updateDoc",n._key,e,t,r):ml(s,"updateDoc",n._key,e),yi(i,[a.toMutation(n._key,ge.exists(!0))])}function mi(n){return yi(Ge(n.firestore,$e),[new gn(n._key,ge.none())])}function gi(n,e){let t=Ge(n.firestore,$e),r=Pe(n),i=vo(n.converter,e);return yi(t,[po(tr(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,ge.exists(!1))]).then(()=>r)}function Ht(n,...e){var t,r,i;n=se(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Nf(e[a])||(s=e[a],a++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Nf(e[a])){let v=e[a];e[a]=(t=v.next)===null||t===void 0?void 0:t.bind(v),e[a+1]=(r=v.error)===null||r===void 0?void 0:r.bind(v),e[a+2]=(i=v.complete)===null||i===void 0?void 0:i.bind(v)}let l,d,m;if(n instanceof Re)d=Ge(n.firestore,$e),m=il(n._key.path),l={next:v=>{e[a]&&e[a](Uw(d,n,v))},error:e[a+1],complete:e[a+2]};else{let v=Ge(n,Gt);d=Ge(v.firestore,$e),m=v._query;let I=new ci(d);l={next:R=>{e[a]&&e[a](new Yu(d,I,v,R))},error:e[a+1],complete:e[a+2]},Lw(n._query)}return function(I,R,D,V){let k=new Nu(V),j=new Su(R,k,D);return I.asyncQueue.enqueueAndForget(async()=>hw(await Cf(I),j)),()=>{k.$a(),I.asyncQueue.enqueueAndForget(async()=>dw(await Cf(I),j))}}(fo(d),m,c,l)}function yi(n,e){return function(r,i){let s=new rt;return r.asyncQueue.enqueueAndForget(async()=>ww(await kw(r),i,s)),s.promise}(fo(n),e)}function Uw(n,e,t){let r=t.docs.get(e._key),i=new ci(n);return new ai(n,i,e._key,r,new Mt(t.hasPendingWrites,t.fromCache),e.converter)}var Bw={maxAttempts:5};var Ju=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=tr(e)}set(e,t,r){this._verifyNotCommitted();let i=Vt(e,this._firestore),s=vo(i.converter,t,r),a=po(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,ge.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=Vt(e,this._firestore),a;return a=typeof(t=se(t))=="string"||t instanceof Kt?gl(this._dataReader,"WriteBatch.update",s._key,t,r,i):ml(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,ge.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=Vt(e,this._firestore);return this._mutations=this._mutations.concat(new gn(t._key,ge.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new O(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Vt(n,e){if((n=se(n)).firestore!==e)throw new O(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}var $u=class extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=tr(t)}get(t){let r=Vt(t,this._firestore),i=new Qu(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return U();let a=s[0];if(a.isFoundDocument())return new Xn(this._firestore,i,a.key,a,r.converter);if(a.isNoDocument())return new Xn(this._firestore,i,r._key,null,r.converter);throw U()})}set(t,r,i){let s=Vt(t,this._firestore),a=vo(s.converter,r,i),c=po(this._dataReader,"Transaction.set",s._key,a,s.converter!==null,i);return this._transaction.set(s._key,c),this}update(t,r,i,...s){let a=Vt(t,this._firestore),c;return c=typeof(r=se(r))=="string"||r instanceof Kt?gl(this._dataReader,"Transaction.update",a._key,r,i,s):ml(this._dataReader,"Transaction.update",a._key,r),this._transaction.update(a._key,c),this}delete(t){let r=Vt(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=Vt(e,this._firestore),r=new ci(this._firestore);return super.get(e).then(i=>new ai(this._firestore,r,t._key,i._document,new Mt(!1,!1),t.converter))}};function wn(n,e,t){n=Ge(n,$e);let r=Object.assign(Object.assign({},Bw),t);return function(s){if(s.maxAttempts<1)throw new O(P.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,a,c){let l=new rt;return s.asyncQueue.enqueueAndForget(async()=>{let d=await xw(s);new Vu(s.asyncQueue,d,c,a,l).Xa()}),l.promise}(fo(n),i=>e(new $u(n,i)),r)}function vt(){return new Bu("serverTimestamp")}function vl(...n){return new qu("arrayUnion",n)}function wl(...n){return new ju("arrayRemove",n)}function Up(n){return fo(n=Ge(n,$e)),new Ju(n,e=>yi(n,e))}(function(e,t=!0){(function(i){Zn=i})(Pt),Rt(new qe("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),c=new $e(new mc(r.getProvider("auth-internal")),new vc(r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new O(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ns(d.options.projectId,m)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),He(nf,"4.6.3",e),He(nf,"4.6.3","esm2017")})();var Bp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAxKklEQVR42u29eZwk11Xn+z33RmTWXt3Vm3qRWmqpu6XWjlZbki0ZvGGbwQJ9eGMNjGEYHp8ZzLA9PAOPbRjMzMAMho/x8Hk8GBt7ZPDKYjAw2DzbYLABC0tq2fIiWWvbaqlbXeqqysyIuOf9cW9k3IjMrKrurqq2ZzrqE5+KzIyMjLjn3HN+53fOvRfObee2c9u57dx2bju3ndvObf/bbfK/6W9/LW76v7IQBJAXgwH4KBRn64G/ljvji8GG9nGhffTrXQHMi8F8FPLmBy+G5EuQzmzbZntFYfofHAPm/OFc/eXX3XYseobmswG0rHXzR48WF0M2qo2CMrivNwUoBVreuL2i1drvWq3bjHOXO5GLUb1QRGZQnQTS/g0JGAkmQ8Lr+FikMimAMdX3hOHHp/OgZddTrV4PO3au3lWdKqr+cxfOU/WfO62+F7YMkQVVnUfky0b1S86Yw6bX+/gDvd4X8JZyWHt+zSpAKRcHcNnk5OWi+m0i8q3A5UakJf0GrLdEKWAhKEBD8CLiXzfObf7fSAUY+F8KOjxfUxFc49z68wtl2zjVHnBYVX9fRd732YWFw5EirKlrWEsFsKXGXj41dYs694Mq8tpEJFXVUnULBZVKUYSoJ/eFH732iiA1a0DTSoT34gs2j5d7YIkF3lQCjVp82HHUu2n0eodWn7vICkSvaehUuF1rglLkqpmofkCM+bXDJ0/+dbOtvxYUoN/rLxsb24u1PyvweiPizSHkZWce9nsiYBu9v9xB+se1nh9r0BBLAIPHNCxCvLno5lSHW4Hm8cD/2ApESuGCtpTHsRUohliChkI4gSRqy7dRFD/72U7n0bWyBrIGwleAQ5OTdwv8khHZWfinKqgEP/SLpam3pfCM/4IJJj92A2YZs7+iG2g8qTSEPwX0wi6RCJRTMP+N/24ABwQlADT0/lIBnC4rxdKrWOsV4YjCjz24sHDPEAN2Wmb7TICeXgfppomJXzUi/xGYLirBDwi/vNO41xvxgrelsI1gSuGHz8r/It41mPh/tA98p3+eeAxR/jf+PyK0RbizgC9ZoSeCRYLySWVBZIirkeF4hNjt1NyPP1HUn6cNBVUJbTMoTSlBoINCYEbg27am6da9WfYXR6r21o1UAAO4fTCrk5O/Z435Z84r9MrXDMI3DSUoe30s2KYFsA03UCpCUzGqz7zQkbrSlArYEXiBKi9x8PdWWBBIIqmUCjNK0LFSNMMfRuCRJijpS05WJUFTehJrzM29NL12Jsv+5Dh0TlcJ7Oma/UtgJp2Y+KAVeWmhmgskK7kUCQ1sqHqpDejeiEc+NsIBNqChWPil8hiq75bWw8T/I0xh49fhfCcwA3x7DrMCTwo8bqA1xOUMRCU0QajWXE4tetG6EkjUxb0iqe/5GklQV2x/41RzK3KpSZIXbsrz9x/zSiDrrQByl7/P1IyPvzsx5psi4bOS8G3UaDb0SCvSb+Ak6tk2shC2dBMmUgAjAxZkwB2YumsorUMi0BN4iYMrA/TOBB604R5GKcEQvNHHK7GApRKmaQDPYe9LhAFkdZYAAeMgT4y5SJLkyu15/r7bgQfXUQHkLjDvgWJuYuJXE2PuzlUzgVRXQIh9gZc93wTzjPSF0he2qXpyiQ2qnl/58r5rMA08YAbNvTTwQi5wHvCtzl9PRZhEOGy9Ygzr/UP9fi3i8JIvlaFm8bUPAfp+vjxBtRHWaOUOdAWEF5QgS4y5LE/TuY9l2R/fBfbBU3AFp6IA5kFwl46N/VNrzH/KV2n2iYUfCykIP3YHMqz39n281AUyBARaM6Tnx4oQzikEXumEixSy0MDTwLMGHrPQpiHghkLE/j/GAP2GMDIABgcyPkGyKnVJx5+vUoqmgMKK3LzF2s9/LM/vC3LV1frzVSP+g+PjO4H7jMicVpZs2YvbSIiVr66EXxMWdXAoMTiMwsQaTTyCExgmJAN0gYsU/nkmnpwKD9IWeFiUt6fhYYcxgENif6dDWEBXsYHx50WJ4KJQ0YVznfM0sovCQw3IehWSdALiVI8BVz20tHQkZmRXw9mvjh015k2JMVtcFXqs6PdLIVQIXrxCNLh+I40eH0y+QWrArw8WY3cRuwJTP8dEoaARoSXCiwshDaFX6ZJ6AheqYT9CLkJqIixihv/G0HuJgSfBXQ2zWs3IwlTch20o+Wo6qIMiMWaLGPMLpxINrCjEnwkh3/7x8RtF9TtzVQdYjWioYXv/5k308DGz1/D1g4xfwAemooZjU25MXSFqEUAk8DIUTAR6Bq5W2K9Ct4z5wx/4c24qhLT/+1JdZ4gS9l+bIaFphHdKwUpD0fukV00xpN8JiK67UnsDNld1qH7XgfHxGwD3M6uQ76otgBH5sQjcyorccMP3S8nnmyoUiwVsY0LISBTqRd8x0feGIH4bogq/R71TQA1sAW4vBBf9dklZWeMVZD9wKZAbSGs9PFzXDJJQ/d8vFYM6uVWLWkyD+TR1gBy3Vf/5ZVW+uuSTjIj8X2tFBfve32pdJknyGeMR/4oKYCPwZUOs3wzXbJMFbPYAAikzhOkzA2ljGYjT49jbCHQFXtUTri+EJdGhmq94HuBJgXe2tObry0QPpT8PoCDGAS4+1ipBlJfXcT5BVH5WBD/vYnwQ0ciFavV+xLQt56YFxEGmeX71F3q9z5YyPC0LcFfZlklylxVJg++X5S1Fw7wxKMQyVo5Bmgd30gdrRurET40EillE4013YWBfoex0irNVz08MZAYOKFyrQs+UCjm4GxEyES5AuNYJmfFKGN/DjT1lokYxj7ivJtPZV0qpZcZqbREnwmKXEbnJlTq08xFBKkny7bEMT0sB3uMFblF9bZm/X8EPDfZAI7WHbCqC6SvEIP+P1EkjqZlKwRqpWYare7Cz8GFe+R0EJoE7cqldc7k9F7i58MU7GpSgsHCBg5u7IfYt3UPIK/QjlMgdSGTB4lC39qxD2qV/jyH0pRHdrCQD9WHHnYB9zwppY7PSZwdarf2IXOFWoTCmYXZLUsQ0mDTT6FV9kCSDXH8/fo8Ani0BYpk4N17IewrY5aAVzistwy2FsAtDFvWuUbsRr0BbxPACZ/p4oQXc0lEmgB3qFSOuXbBRHsMy/Bnquwxvi7jXB/fWbNdVRAQgcsXBVuuSleQ88oOygJMkudV4pV/W/MsAQpdBxNukZoUKsMU79dcSYYkSkcfnYmBOoSXC+bkwS8X4XaxwgzOB4QsZuWV2wm90Ba51wj5gwcKNXTg/9+fsLCpK2dZcQAVAZYVnqp5nkK5uRkYxY7qK0FAAZyDRJLmtJsvTiQIcXIkILvAhw0wOQ0q1kNFVOjGbZlZhkk1kNmvFI5FCzYQ066zCwcwj+imBl+QGu0rTH+8q3pLcUhgOZnBjx1sTZ+DCAsZLbGPqUU9p4lf7XKUwzTIVTQxJPdcqRxq7AxdkduVK8h2ZxAml24hz+9QYRFVGVSv0b17LBxIExWgV5tX4cSqzBlrL1FUPKfXKn5BxM1GDla4FEaZC1OAEruzCA2PwgsKwEzMS9a/EkWfALgyv6SoGxRkPp3cobHNwxCqJq3P4rmyHuFMoiKh/Rq3arNCqQ/hjrZVYSSD7+/gKrV3b6UgT4NMPzu2LZXkqClA+UqIiewMAlOXqwWo+jMHSrX7s38wLNEvBGPy85AD679ewhFeUKSAVYVFgk4NXdeAi602/7TftqZc6CTDesnSLAnHeMoypjziOJIKVSmglQyYmqjPTSiISONsydDQRqDNxcB3F2v021YpgK6nqZRJFoqqoyN4g43xUXmnZjrHHcyEzy3IGjWyZGWL+auxYHLM3enJMAZe1ATG5EgM/G1UOtQSmXXUvGLhUrOcRgkbJKe40jtO26T+PE7i4gIngx4zx99t3SxFpVdU0yACXMWj5ZCjrGbdLLd8hy/M7AjN7V0jVL6sAM2BVdYrlwr44lh3i+4dV7ppmOjXq3QwhdUoGsTkOoPS5LWAznuETgbQtFOmyYH90efmI3aaCTT0IzA2c5wx7C48LypRqTAHXOgUN5B/OYUhSixH3Q6ONYyywTDg4NbmCAiz7YQ+MiozM99NImTIsFx49Ra3OjsEHNyL+hoZajjhxUvUEDEwqbFXxMbsVkpZp1FuNtvHqQOwKBHd4P21btFOgCInClbnwcKpegVVQ549FQ4WPKRFZRcclCHmJB8r6AI05FAk1QvWCkapN/RloFA3oiLJikbS3Uuh+xvXgjXIrGRIDmwgHDKv3syFe3+3gYud5+Jr/j/5bI96sBtOqArucMKEeoaetRrWlGbEDkkI6J5WERu0l8LSQpF7JMwN7nbDbVcSTDXx/fM8ScQuTwO1ZlQsYhofithqIkqi7zlXmCFhfBegfS63nDpjUhv9qPlQhvjEPBqBlGopk48igkWu4uPB0sE0Em0i9PnDYboBMae9OmHnhOBRaZRdH7WXZWstgrK8iaotweWHq9HWUvi6Vu2yEV/Tg2nzQlw+4orjEjCZjGtp61ECLtVaAkZSjRFUrMrz6hQbXHd+xNFLGFjhu4WABm9VbBBPX2EWMWCn8QmBOhb2FkJWmf1SRYDN952Dy6nHGD41jUinzaCt+T4z/HSPeCux3wtbofk2fcAqWLdz/t3ThmsLnJqZD1qbpy2m01QDh08BZTTksx9OsuQWohX+MGJgR+35G1NOFJ2oDjyegRnhhJn44kdQb1MRVReEmrs2ECUBC71+R5AnOON2SMH7lBMn2Fq2dKRRagbcVdpsK1goqMKVwKFDGcc9PxCeeZhS+Y0m4Phc6RhgTYbtCEbgQGDXiSWrkFQyCwxp5tNEuoD70qg7uBnxZ44bNEFeRCCwJPJDCLTnsdb6HWQbp0hIz7HJwqRNyI6SpWR3bZ4DMMXHVOHZrG1opE9dPglu9ApigBEaEwgiXFobZEOOX99cV2FsIr1sS9jvohjKf8VCQqo2KaCODQm1ip/qoJ6kn3zbSBQywAjIUFAwUVcIQFxBhBwt8LlHUCK/qCZPqTahhuBBuyA1tBEkEY0Nlz0rSc4IZt0zeOOOhZGGZuHYauzkNP7Y6rtimgrFeEeeA/c54NxBKzq/J4K5FYTNCx4bMpRXUCuchtCJiRxrtOGAhR7Rvs/03zgVIw8c3B7yMGo05pJI2roVPBY4KPJXA+Sq8pmf69G7MAmYCFzthn1oygWQ1pl9CuJcp45dPku6b9OGGGuz2MaZumIbMrdoKiAhJ4skhNXCFM6TB57+4I7yi48mh3NTHO+QCu0UYk7JKQ0a2S7PtaFYhrzTseb0UQIaVTTdTwo0kBtIAdUNYQRtKsY4ZyI2w3wmv6lb1BGXmb0zghtz6923o/Q0zP1RogKTC1C2bwSQgif+fG6bu2EK6owX5CFcw5D2T+J6di7AD4YrC8LJF4ebMuyUNZWRxwYmKsFmE7YG4qhWLNI6bpI8ZNvL5DMNBcyYAsO//GTI0u7GbmAkcdiwVWd01Hi0vWTjkhJd3DeX4iQKPvHfhGbnEeiq2aealIS2xgnaVscumaB2cJpgOsAk4i9k6ztQ3bQv1znVpS8n/Ur+uCcpnxHMQd2SGg7nQsd7a9Kuco12DAl9AVFoddQIaY+ml2d618PrMw8GVMYBqbe8nhePk8ND3IhQx8HlUaIf6LFc4ToBZqt7TMcJVhfDyjj/DClypSd9XGysD4K+10yBpfVAnCmbMMP3yHZCkngSVICmbQFeYuHkr7QNT0C0QK7WoIdliaJ1noKhHOD7yCD08NbhEwoQWPmQcthsj7BEhQdGQ4VttW63U/gPyWnMLIKePGZqa3DylEJgFLhDxHHvYuxaudIaXdA0H1LATISvDrtj/A6YlTN0+gaQRL58IdAombt5Cun/WozQbKYAEbrGdMv3NOzGpp1v7vTZXpm8fp72/hWYOSaLfsx4MlsqSpLJskskYDxwvMIbxslpzSPucSTtvDBM4Cr02Ad8QoDJqho8cuA7DJhGcxDX5QtcIlzrDN+YWSqrYhoyg8fkBFMyUoX1wgtau1PdWK5ArdmubyW/a5W21TcCGnl/uSQI9aB3azPiNW6HjkMRAD9oXpozdMIWdS+uWJfyusab/XpI2xxMM7k6EOSNsM1LNTiLDAbYMiZxGgcINwQB1fyMDPophfqs5TKthBUwovtgthpvFDtTulS5ejdBKTN8vGyt1J6qQbE5gssX49VOVYmSOydt3YndOhQlrGr2/3I3HA5MvPx+7uQW5Q1rC9Cs3QZLSumgCO2WrgD88jbEEl+GVwSSybM2hBj7gfDHkVNnEoYTaiu17ZjjglHmAsvicIccDcakMXgsZPpoB4BuNZcoKrkT2YccGCjYVL6sIXNVGAjsl3d4GSWkfmqJ1URt9Pie9cIrx23b7OWBsGgSeDO42gUywu6aZ/Mbd6ImMyRfMkB6YgkWD3TFOa28byV19eFgchZiAC0x1/9J4FqxnEncHAKlRT9chhf6jzPswOawLD6Ajjuupx9HfqY+OrQ+lNeIHbB4yhiusoTNk5pC+kG2DjLF11kkSIdkz7oXZajP1ym2IhYkX7UY2jTXM/5DdWO8KMhh74S7Gb9nG+K2bwKVgUmi1GLtutjGa1T+EierAbSJDp7CJxw7kAhdYYSwataEjJjIaphR6GnI65XqA1WCNAdMjjDRJw1yDCzdxa5L4GnsdXXtWcv0VlpBabl8mLeneKdAECiXZN8X0XRfQOrTdh302XdlOlpecSJj5zv3QOxEGB1jIoH3ZLOme58if6iKtPpvjFSDUaSmB9XPLl5ttt5ZNJuOr+XBTPxQY6vD2XVceYOQPyTI3ICujVBHoqXLAGvanvm7fjkLP/Xi/rMaVWtmW9gpa+6cw5036URw2hdwydtsezKaJqvcP8/0DexKighmw4x4b2MQr1vQYYzfM+dzBkDi/vDfvBkZHA87AuIXzrSUPhbGrbrdVyEDWygIo9YFlK41KaZ439JoNf3Vdy5IaIdMRGqneQmNAwpf7I45KTW5bxm/d4QVviqrcxk56035aAY/A2Cx05/1xAuRC++qtdP7qGdx8HkaeehflYvbOCrLMSIpyToLzreETy7XVMm277OigVbqBhDPYZBWYYbn3c4Vt1nBZavtx/agvlnQvUR2hBKCgSznt67aSHJiDbuHNtaonfJIxVjGedfSWTkLR9bVjiO/5W9u0rtlK58NPIWniS3xFMEb7z2is4Kwua3pVYE/qC0viCSlOpU3PtCDkjBTgVG9KGg3QUeXSNGGzNSwpGJYpdC+nfItjZIMXyHjC2O17ArdfxloK6YQ333oGk2maxF8nXwq+SEEtYzfsoPfJo5C7qGQs8vsCrryPEW2XC+xMLGMCi271bbcaGbCWLmCUSRpm/svyuuZ5LsS7cbm8BQ60bBDs8r3UGBnMQhqDdjLa1+/AXrg56v2hkjIZP3MFEIFkElxRsVu5YvZsIj24md69TyMTabACEPG6GCO4FYDgtIU5K8wX2ucD3Ig2HuWKR8liXVyALqMYpZD71LUM3lCYGo8cmLTCxW1LZrQ/LcpIOTSmsxLja/80NbRu2B18f6O4zrbPvGJC8W6k6FYicAppQuuaHeT3Ha1i+AbMMCs8lAJjCDut5QuakSBD5yqOUytuRNufrjVIzsj0a70YofnegMWIpkvLUbYnllkrK8421R+42XiPvMCeN0ly8RafR7ZpFCMl1eszsZOlOUvaUGT+PeuLEpKDO7DbHsYdX4LE+Gk8YzdlawZhuAIYYUcqERewDIgbhhP0zB5xZQVQXdYv6NB51r2BG/zM+0RRyFXZlRjGrNBRP45wOSs8UCBpgV5BcmArzEzCUlahSFVIWiGc0zUonRVwYyHOl74VkE1tkn1z9D75GNKy/dCwcgEjmNLYr4uwLTHYakr92jRk9RG5WrP1OuL9dccA5fx2sW+SIe+V4900+qycIq1Q2JoIbSt0iuWHPA8qQCCMUou9cGsw/1ofSSEt7//XZJENA7YFLlrVRRRabezF25C/e6JPXYrWx0yLWd64FAa2pn72Mqf1qejKBnfNUG/Ie7W1DNYVA2gV7zZ9fVMJm4AwzIrrsYLAbBhQZ2QlBfDc+kBoOJ5gz5/zrIpJo9GWGpTCDjrm091sC1zWyF8b7MXbMZO+qtiZQdAjRlfsYNtTSxoiAR0B/IZyLlo/73Sw7qljgHgEq9SVoPqvaJCoDpsNM0x6MJUYNIC5FWecbNJcuUMmxzBbZ/1jJLahHcmZRwDN/lqkDQ5VMFtnkakx9LkFjDF+HEDkOXSZKT1K4c2khmlreL5wPhLQwTUKBoiCxgRWTap4/RSgJnhvdgfclAwqiMauQOtp3pV8tFDnABBB1SEzk9AaC4hfBxVgJRR2Ss9dgszG9cYsZvs07thJ1EptCheFZX/fhARQS5QtifB4V2szho9anqZuBXRQEdYbA0jDpxvqfn4oLgiuw8SKEY34MauxPPF87DiYbEPaGjJTglYFn2u59J5LG2vKKIy3MDs24Q4/Ae36576Qc2UE2hJhxhpy52shm8vQDMMASuN9HUQ760YFN8FHHxME4TqNZrcs36MaIWuA3Kln/+yQyqFRbGBjzIFJQtJH3GBsZGw07HeNNpvUlc05aLWRTVPB39cxpwBqV27L1BgmrPh5AGOBN+ckbgif0wf/a8ADDMMAUaxfcw9RNFA2TE/x7Jfx2iGyCgMQ1UKLCfO1EPL4TZXvDwRYw01CtBHznpJgJicwSSCyB/iKFS6p5ZRzUpaI1iLBONbWhpdruoiNywXUfLq/aV2FJXBhdQ0XNOcrvYKccir4FZbJMNKfHKI/t+xCJyiADJ+7vDQvWsdJp8ULKOBsY00YF4pP0tqcyH310FUoQCj4L3SZ2cibZl+rqKqvKLoOCnAMPxvWsGu7qKMrQbgxNiiF3/w8fGaBLy4VdAl+b9VLZVQr6+mJBeg4mJmAopl79TdTaFmy7TOELisCSWOGhLiKulBOLWDEROGn8+5GGwpgW5VUGrSzoCtO7GfCkIPnC9dXmqErjjYxgQ7HAsNkuD4YIBZsBPhc1A6qiitHBkdYwKmSGOGxTsET3YJLJixdV03/siockBh0YYniyWPYbXOw1A3Um/ZX7TTWYGenISvoHj+JTSzJ3AzkDl3o9C1LKXTTbiFjLUg9q8dSD+30op6aDnYDk8DJDuJclYWs8QDLt6NRyFQ50i0qMK3VgsFazkfcsAaOQUXYOBfQAIGD/j+qE2xEAuWxBeZz5RMnMg5Oe/QsZuUHkbIKyxiSThd58BHc9YdAM4zxBfvSSpDE4J7v8NHf/QSf+ugD/OPffI7J6Qmuv+0Qt7zsWq687RD0Mlwvx7RSZLzN8S8/zeF7H+bxL36F2bkprrzhEs6/bI8nrxYWELF9HOKf36EZFE88g6S2njtgeQ6g3FKBJzuOJ7sFiZ/bb2j4h7I8DlgvBdBlPigHbTrVfsNI5PdMNMO2iZBrUTKpIvzFsx1evWOMzamh0OXn8ysfdiz1Dnex3YZPHmbi1S+CPdvh+AJZlvHON/8+l169j9//nb/kI3/6WSZbsHn7FAvPP8fbf+3DvOs3Psy3f+8dfN9P/R+05zax9OwJ7vmld/NH7/wIR57qsIhfzXrLNNzy0mv5nn/7bVxwaA90e2hWoE79WIBNE3DkKPaRJ8jHWuH+faOo0xWndS3U1zn+3XyP4z1l3AiZq882Hvd2VzvWAUyw8RZAq5EtZTFn3w0E9wCKqNTO88uiKKkRnug43v2VRf71RdPk+Wg+QANWsAiferbH3xxd4t5nO+SdHtc+95vc/F0v45ZXfAPk8Ifv/Bjv+62PMH+ix11338G3fOdrueCC3eRZxuH7H+KeX38nb3/rX7J0ssNrvu+b+Z03/R7/808e4IpD5/Gtd9/B+OQ4WhR8+m//kQ+9/14+95lHeOOvfC+7925n++4tyMQY+fHnefQzj/HwOz7EJUdPsmd2jLZV8jwQ3kZWXA40NbBYKB98utMf91ibch4duvC0a0xNfyYWYLkCFJ2DmbFW63H8XIEDFRvxVOn9CZIay7XYaCIEa+pLwpVTvWeq/Pgl07x05wTdzA0stabqr38yd7zloXn+5EvzqIVtm6cRa3jmqyfIOvDyO6/l+3/qdbzx7v/Mlz9/lNf/4F18z0/+K8gL6AUef2KchWeO8dPf/9P8/SceYNNsm2PHurzyztv4gZ/9N8ycty2AEYXFJT7w2+/hLb/4/9Jqp1xx/SX8wtt/lA++4yP84Ts+zKNf+CqLHZiagH1zbf7JhbO8etcYBYpbJrQtO0iaCm/9wkne8fgiEwayMKNY0V9DQKNjGsdarTmgQ/VLgPlOr3f+MZgfRRSfkQJAU9j1iZwroVcTP5po1Q+DH90bMB0/sG+aV5w3AapkhfZ/0PjRXfz8fcf4s0dOcsetV/Ad//I7OHjoEkSELz38GO//7+/jT//gk1x94wUceewoO3fv4K3v/lVMkqBZ5nkDoMhzkk2zfPHv7+eHXv9Guks5+y/by5vf+cu0piYpFhYDfldsYpHZGX793/0y9/zmB7nsmt3s2LWFP//gfezZNckNt13H5rlZjj59jE994l6ePrbInftn+eHLZvr+XBom2oaBJCi87csn+e1HF/wcCKWAw6IMRVhEqib0cqGJSPiFG2lgVqUAp48BGtosUpFktaFNWic8+lOnOp/EKwL9mTv4r198nodOZnzb7gn2TIQRmIVCKvzxIwv82SMnec0rb+In3vyTJBMT0PFI/qqbr+GqG69idvN/5Q9/988pCnjt627Azk5RHJvHRomiJLHoyZNcfOlFXHLwIv7245/jpa9+Ca0tm8ifOU6SVkjf5QUsLfHqu17Jn37gL/jK40/z0H1P8i2vfQH/5098P9t3nxdmq3I8/qVH+fWfewvv/dj9bGkb/uWlM9iCgZkpi9xx34ke9zy2yF8/06VlIuFHpt1pw+dTX33crbzo9PpigAEFCLBVkOq9ki+QQP5QCb8wPn9TBDSZhDV6/uDIEp94tsuNW9pcNZuyfyplprD88WPz7Ngyxb/68e8laaXkx5/DJv72XaeLHW/zfT/8eu7/9GE++8CTTEyMByLCDVRllIUYU9OTJBbmtm1G89wD2Wg0h4ggvYwdO7exafMMjz/2NDfedgX/7pf/LUm7hVtY6F/v/P0X8lNv/kme+c4f571ffIIX7Rxn90TCydxxPHN8pVPw+GLOp49nPDifsVQoY1bInVariFP1ckUHlp/xx/Wl6DnbCkDEWPVXwY4Iisoy+EhBQ88vwaAvj1aKIKRJKywUyoeOLPE/v7rETMvQMoannuly60uuZOue89DFRZK04vltYnCdDpPbNnPpFfv5h/uepChyBsbZlzdrDdlSl8e//CRJOdRbqzkKauBDDC7rcfL5kwjwrf/0m0mmx8mPnSBJk/7p+Yl5Js/bwmtf98380k//Bj91/3O02kKvULqFslQonUKxCKmRgPi1vsy8K9tSaz1ddcjS9GuX5F6DJFmNtdLaTdaqXFxj0cTyHFe9zkMYNJkIY9Y34GLucA5mN8+iRjxT51y1h5ZTlFtuv4mZCcOWrZshD0rQOFezjGRqjJtuvY7WmGHvRbuh1/MKEJ+L4vKcdHqSA4cuYcu2Ka676Sr05CLWmui3HcYI2umw/+A+pqZSFrsZz+eOpdz38JYIM4mhbSU8p9ZNeUMJhrVhGfrpGvX+VSmArnKPzVcczhTla+fNfQ3QUH1eRKtmFuoRcd5M8qG+5KrWLTTU4imy1OWmW7+BndsmmZmdhrxApHGuKuocYgwve83tTE2NMzE53hd4fJ6gaJaRzkxy+8tuYWJykvHxNuKKgXsQ5/cktX3AGVvHXKHnyufT8MzUntkFl9gHghEOKKL2dKcglw1xAaUV6PMBqrgAA21wqy5EVkK1nnopm5IBLFxwE/ED1MKpmPluaqp/P+v1fEMVQQ21GY+VOdeCXrcXwF7pLlyduy3dR5GT9Xo+/VIUIT+gQ7Ij2scQ2kDuVU/XailZR43m7fv3yBIU0fdikLhWW8Iabup84cwon9/PY0tFDhmqlTPCEmX9GYPKMMpJMwnhhoxH9+9Xq26U5ykDw3TLXitxfVW5KI4bqlg1JeyfO/j7RKur4eomXsM6gETxe98lUl9neBQmUMeabmurAM0sYNTzmzlwV6ZvpaJFKzl7JbBB+HX+ewT91RBA0+wPU4CBFaJHlcCXkumXOC9zzejGitrC0Tqa3nX10K62yLQbzApuqAKc6g8W0cL3imJ1cGyzaJnLllou29R+M1QQ17KE2gddwy1AHMbF566kLBGYbHJd5TWIzlVZ1gIIdUGWPV8b8X3lHnQAR1X4SfuuoFhr6a+1BYgrpcpVQFww9+WwunI5VWOq9KEJc+5rhEwdFa9QaKMUafQ8JUNSaCsNsCYy/ctdF1Y3IL5S3/6S8JHwi2hJ2b7fp1pGvoYJ0Noy8+uxrYsC1HgBF3x4xAjGbkFQP3M2g3XwZV19tWBZFKYxxAI4iVoqPncIYi1jz+a5TQI/jlH7Uo0yXiOvSV+wRRzWaXysNYugrkL7A+dylhTgdH+4qHEvVSFALtUKWNUAEu2v7FWuplUu+yoDMa9b0QJIOQJVl+mt5WcSrqnLWJYSCDa/u4wFaNK75bFSJXp0SJTgomxpHElwthTgTAZWFAHomahAro9kw+xYWi7vHk2gpNCfR1UEColMdd8eDrcAqo6iULRwlW8fiFa8UNU5Xw0Un9uciM95u6TqcCUBZc2KFkAVcucov1JEoWGMC6qVwuurhvdxgGNdt4R13opofJiI+jHzsWL0/X5YCMmILySJasidqxaZVC0oigIRU83bS/W5NTA21qLVSiprIIN1eKC0WglJmpAGWrm0HC6UiNn+qk+OJLG02qk/x40apO1qYWTRX8azYkGd08GETxwJOK1ZjfXeEjZgi0PDEtX3wXQoiiyXa3VB6H1A7qp59FQVSSzp7CRkGfSyelysjjRN+Pn//IPs2r0dXVjyzF9RDOa6Ox32Xngeb/rlH2Lz5mm0l4WyNMFMtH0vX1jyjmlhkdtefB2HLt/nSSBX+CkydXhoKY16vSKCD3UM0CjubIR8G7GtGwaoNbaW69B6ltBHbBXjZzVeUVMxzheRaMAA/RKyVsL8V5/lz//o4xy+7wscP3aCYkg3abVT8izHrdCKIkKrldINjCBA2krZuXsbN950Jbfdfh1mvI1b7DK9aYrpLTNVYQkjwkCqJT3zKCApYjInapO4xKv8vFBWnDPo68YCxJNDaEQNazlGTCozX64RSMgQmsK7hLxwTIwZPvvAw/zA63+WBx96hrkZYWJqYnDUcPDxssqZQfxaf9WJRV7w6b/7PO/93b/mxpsu4off+F3sO7QPt7hUuZ1RWCkiiMqciEZJn5oliAKMkv9vCv9rwgKsqTKERjH9moBA9oRxAhLMfoFfNLm0pQXKWDvhoc8+xszsBD/x77+bF95xE5s2zSKytvdYOMeTT3yVD733z3j3O/6MN/7Qr/Bf3vJjXHDJHlynN1oBhmCAPsEzJKwrnVKBVvhgg4W/4QpAwx2YYAlsmFqlzw5Ho3w0kEFZL2fr9ln+w5vfyIEXXA0nF9fJUVr2H7qQ/b/wBvZdvJs3/cxv89Y338ObfuVHQsSoy+fEnfaFX4QkhosTP3FeIAKHhW6AvT8bGGDURYtw7bKnO1GM88u/mtDzXQCGYwJFVvD677uTAzdcSvbUERJrWfPuX97ekkMRXn33K7jvHx7gT/7oUzz46Ye44uZDuJMdPy3ssIdyFV+geAxAzP2XkaLoAC2sZ0H4Mf3OWbEEccq08IRQ4XxvKd8XFWzue/9tt1yFPvMsiRZI0UPy7rrspsih10F7Hb7xm24kz+Ezn3kIrEXVDYnhGjtVxq8IYLB8Lofiivqzny3hnxUXMMxyoj6NrOrTwYVHgd5NWMAVzM3NMN4WJOsMzdms9SZOkaUFts5NMj4Ozxx9DrJssGxsFBNIxUG5IHgi5F+a/rO9Jct7Q5zz82yvrxKUfj8ogoRZKETFm1FjWFxcwnWXUGnVc8frqJnqYOn5k2SZMD7eBuvHEXq0yogw0PXVodAKxxTNsriNsLKQ2RX0bFkFaEOxpHpSRbZshEtwRPM8G88O5jlkY5anv3qcz3/uEa64/gD50qLHAOsp/6wgmUq4997P0cuUgwfO9yOQy6qXoTkDrSUYi/C63+N1g3u96skJPyfn6SnAE5BtgflovOd697tqpLUrRxMr884wUeT89tv+nP+4fwetsRba6ZzRuPjR5FBomJkJHrn3Id7zvr9h/yWbue76g7DUwRqGl+UEC6AaWQBXDxA20NWXHNr8oysowHJD8cKsuDy6ngHByIi6jJ0dnMwcY+Mp937my/zcz93DEw8/hVBgrPrZ4dZwF6vgcv7hY/fxf//8u3j2mUW+91+8iqmtM7gsZ8UyzEAFNzN9G4zzyr7xKF4BRs4fliwPAchV9eHmSoDrCr6iJ4iraPJc2bZ1io9/8kv8wz/+Bt9w9UVs2zLlJ5FewzvL8oJHn3iWex84QrsFP/qj38IdL78RPbnkJ3waVZlRUntRQUjhqlm/ZGN7kQOsqj4cy/L0ogBj7g9ximyY6g5ga8PiUo8Xv+gAt95yBe9538e594HH6PbyNeWCynUGZ6cneMXLr+bOO1/EoWsuwS11g6nUZdytLzLNe1m/8tdFE4RssAUwfdk1EmGnogB+HoYs+ytNkjycqxulCLFPzsK0f0ePPsetL72eW2+9kmPPnuDEiQWcW8uYUEnTlLm5Kabm/OJQuhB6vsiyCE6dQ43h6aefo9vNyEnRsxPolfm13GTZx2NZnpYCPAtfmFN9AJFrqGaE3zgFAHqFIx9L+PIjR3jy84+z68IdzG2dZW7H5rVnA0PBvna6ftqYcgzAsmyNIOoQHPff/zCdrrKYCGdp8zJSfeBZ+OKZKEDpOwpEPgBcczYIK8FbgHk1tE8s8eG//DTf9f2vITv2vB/1u8Y0Wn+mk7BE/Gqur84hLctzTxzlr/7qfkzbcnypwMrZIXvC4Nf3Uw61qHJPp0wFK0DPmPeoX9xzjWdeXKU9E/hqR5FWwh/84d/w6OEvk05PoHkxcm2+0937C1lrXFY+elfncOqQVsrb/8dfcPTpExxT62dAP3vmP+sZ897V4E67iguaXlEcHTPmSgOXUw3q3VBE03O+NmA863Hf4Ue5+Yb9TG2bxXWyfuwd5+PXnSh0inMOk1rM5Bjve+eH+d3f+yhFK+XzC2eN3C9n433/fJb9N+IK+9NUgLIttWXMowL/gvq6jxunBALzGYy3E7JjJ/jbTz3EBTvn2HXBdmQs7ZtsMRLicFdVB6/ZTn9xSBlLMeMt5o+f5Lf+nw9xz7s+AmnK5xaVTrHMCmjrH0Cpg+/pOvcUq5g/XE6hE7rZJHmbgX8elvw5K4kkp3DxpGG7ZBgr3HTjZdzywss4sO88ZmYmEBHG2int8ban4k5jCvWVNLHICg5//gn+8TOP8Jf/32d44vFn0bEWn1twzGeQyFlJ7ecCicLbnsvz715N7z9VBdBx2NlOkvuAOVhxqZ912wqFrW3hgjaYXkbLwMTUGEliyQrHptlJfvFn7ua8PVv9PIBmbbqjqiLtlLe+9YO85/1/68vbEsMJEh5ddPRcVNa+8chfgGPdPL9qCY5QTdBy2jxA8wfMEjyVOvcGa8w9Za0mZwHrJALPdJXjPdjcajEr0FrIsWRMWlhc7HL0mROcd8G2aGjSWmmf49izzwNwvDXGEwsFS4Wrj2nYeNPvBJLCuTcswVMrIf/TUYA+wpx37l2zIrcYkX8dUsXpRj10bM3Lxn6m6zjaLQeXCAfHYc9EytRUG1y+4iTUp2wBDExNtnEKX+k4FgulDPk3OuQri48NpE711+ede9epCP90FMAB9kRR/MhMklxo4FUbiQeGLVBm43WIo3o7V8RzA8haaQCoC+yjt0RrDTFOsT1ygbSAD84XxY9Qrc15ipzxqStBL8nz1znVj5dLKnP2GmG4AFTXb49+4ixuuUDiVD+W5PndQI/TqDVJTrPNzTGY31wUrymMeacReXWECQxfC1tM5KyxBait6bbxWuDw+f7EqX4wce7uMBGk4TS8kDmDmzDH4cS8c3eqc28J5sdoVOG8kfugNVjvX9v4Z9T+kFmsOveWeefuPBPhc4a9texa2QnVN6jqP1M4IhW5VJxF90g0A8Pa72zQuK3qV8qhFFbhiKrefUL1DXh6XjgD/GnW4OYEMPPO/Q9TFC9QeFswUeXSyTkbVwcZc7Wr4vJPb1/3otQSa+WEObmDA3qbLYqb5527h2qGpTNq12SNblYB+xw8SlF893SS/Kaq/huB1zbCxCJSmnWllLVM1qjzI3nXKAxE3VprctODSXCnEnj9zMH7Efm15/P8E2Xwcyqh3norQCxcASTc6Ccm4XJrzJ0Kr0XkkEAb1s96xpqVhinLjZU1qxmwYakTK/USrzN8loF1rBS6qD4IfKBw7v0LcDhmZNdK+GutAHF7GIAFOIxzh4E3TcMlzpgXoXo5IhcL7FWYQWQKv0DH2tjNMPFSp5tBXuCyYlWLN67Kq6hirNDNimCj9UwVIEP1pMC8g0dR/SIiD4pzH3veF3MUDVe95lzTehE4LrpxA+TPw0M491AUQCdAsg2SYo1Cx+fxq8Z384Lnjh6HfVs5bmCtBjUYAXo9lp7u0RmDzrGcsTOxKOCOej+f97mUelhZLn++biTjRvH40uAIznKE8DW5lb4fll8J7utSATb8t9eTn1mvQcnn+sC57dx2bju3ndvObee2c9u5bUO2/x+sNkU6oXguqQAAAABJRU5ErkJggg==";var qp={apiKey:"AIzaSyDvjnOLzYEHGV7ae_VWZ-LUeAJ8i4WTY9Q",authDomain:"bul-jumeok-e910b.firebaseapp.com",projectId:"bul-jumeok-e910b",storageBucket:"bul-jumeok-e910b.firebasestorage.app",messagingSenderId:"727813238723",appId:"1:727813238723:web:b308d312c3d34e7fb61776"},Pl=new URLSearchParams(location.search).has("emu")&&/^(localhost|127\.0\.0\.1)$/.test(location.hostname),Wp=ba(Pl?Object.assign({},qp,{projectId:"demo-bulfist"}):qp),rr=nc(Wp),$=kp(Wp);Pl&&(ws(rr,"http://127.0.0.1:9099",{disableWarnings:!0}),pl($,"127.0.0.1",8080),window.__bfTest={signInGoogle:function(n){return Ja(rr,xt.credential(JSON.stringify({sub:n,email:n+"@example.com",email_verified:!0})))},tryWriteMember:function(){return pi(Pe($,"members","hack"),{nick:"hack",no:99})},tryDeleteGuest:function(n){return mi(Pe($,"guestbook",n))},state:function(){return C}});var jw="\uBD88\uC740 \uBB3C\uB85C \uB044\uBA74 \uB418\uC9C0\uB9CC, \uC6B0\uB9B0 \uBABB \uAEBC.",C={user:null,bossUid:null,bossKnown:!1,members:[],membersReady:!1,topics:[],guest:[],guestReady:!1,rooms:[],roomsReady:!1,roomId:null,room:null,roomMissing:!1,msgs:[],drafts:{},pick:null,confirmDelete:!1,gbConfirm:null,flipped:{},importing:!1};function ir(){return!!(C.user&&!C.user.isAnonymous&&C.bossUid&&C.bossUid===C.user.uid)}function So(){return C.user?C.user.uid:null}function f(n,e){let t=document.createElement(n);if(e)for(let r in e){let i=e[r];i==null||i===!1||(r==="class"?t.className=i:r==="text"?t.textContent=i:r.slice(0,2)==="on"?t.addEventListener(r.slice(2),i):t.setAttribute(r,i===!0?"":i))}for(let r=2;r<arguments.length;r++)To(t,arguments[r]);return t}function To(n,e){if(!(e==null||e===!1)){if(Array.isArray(e)){e.forEach(function(t){To(n,t)});return}n.appendChild(typeof e=="string"?document.createTextNode(e):e)}}function Ro(n,e,t){let r=f(n,Object.assign({id:e},t||{}));return r.value=C.drafts[e]||"",r.addEventListener("input",function(){C.drafts[e]=r.value}),r}function Hp(n){return typeof n=="string"&&(/^data:image\/(jpeg|png|webp);base64,/.test(n)||/^https:\/\//.test(n))?n:""}function zw(n,e){return(n.no||0)-(e.no||0)}function Po(n){return"BF-26-"+String(n.no||0).padStart(3,"0")}function wt(n){return C.members.find(function(e){return e.id===n})||null}function Ce(n){let e=wt(n);return e?e.nick:"\uD0C8\uD1F4\uD55C \uC870\uC9C1\uC6D0"}function Cl(n){return f("img",{class:n,src:Bp,alt:"","aria-hidden":"true"})}function Q(n){let e=f("div",{class:"toast",role:"status",text:n});document.body.appendChild(e),setTimeout(function(){e.remove()},2800)}function _e(n){let e=n&&n.code||"";return e.indexOf("permission-denied")>=0?"\uAD8C\uD55C\uC774 \uC5C6\uC5B4\uC694. \uB450\uBAA9 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uB294\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694.":e.indexOf("unavailable")>=0?"\uC778\uD130\uB137 \uC5F0\uACB0\uC774 \uBD88\uC548\uC815\uD574\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.":"\uCC98\uB9AC\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694."}function Gw(n){if(!n||!n.toDate)return"\uBC29\uAE08";let e=n.toDate(),t=(Date.now()-e.getTime())/1e3;return t<60?"\uBC29\uAE08":t<3600?Math.floor(t/60)+"\uBD84 \uC804":t<86400?Math.floor(t/3600)+"\uC2DC\uAC04 \uC804":e.getMonth()+1+"\uC6D4 "+e.getDate()+"\uC77C"}function Oe(n){location.hash.slice(1)===n?ee():location.hash=n}function Qp(){return location.hash.slice(1)||"hq"}var Kw=1.1;function Ww(n){function e(){let r=n.naturalWidth,i=n.naturalHeight;if(!r||!i)return;let s=n.parentNode,a=s?s.clientWidth:0,c=s?s.clientHeight:0,l=a&&c?a/c:.8,d=r/i,m=Kw;m*d/l<1&&(m=l/d),n.style.height=m*100+"%",n.classList.add("fit")}function t(){requestAnimationFrame(e)}n.complete&&n.naturalWidth?t():n.addEventListener("load",t)}function Tn(n,e){let t=Hp(n&&n.photo);if(t){let r=f("img",{class:"photo",src:t,alt:(n.nick||"")+" \uC0AC\uC9C4"});return Ww(r),f("div",{class:"ph"},r)}return f("div",{class:"nophoto",role:"img","aria-label":"\uC0AC\uC9C4 \uC5C6\uC74C \xB7 \uC218\uBC30\uC911"},f("span",{class:"np-stamp",text:"\uC218\uBC30\uC911"}),f("em",{text:e||"\uC0AC\uC9C4 \uBBF8\uD655\uBCF4"}))}var bl="bf-me",Yp=null;function Co(){try{let n=localStorage.getItem(bl);if(n)return n}catch{}return Yp}function Al(n){Yp=n;try{n?localStorage.setItem(bl,n):localStorage.removeItem(bl)}catch{}}function Xe(){let n=Co();return n&&n!=="guest"?wt(n):null}function jp(){if(!C.members.length)return!1;let n=Co();return n==="guest"?!1:!n||!wt(n)}function Hw(){if(Co()==="guest")return"\uC190\uB2D8 (\uBA85\uBD80 \uBBF8\uB4F1\uB85D)";let e=Xe();return e?e.nick+" \xB7 "+Po(e):"\uBBF8\uD655\uC778"}function Qw(n){let e={hq:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',members:'<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M18 14.8c1.8.7 3 2.5 3 5.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',games:'<rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.4" fill="currentColor"/>',guestbook:'<path d="M5 4h11l3 3v13H5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'},t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t.innerHTML=e[n],t}var bo=[{name:"\uC74C\uC2DD",words:["\uAE40\uCE58\uCC0C\uAC1C","\uB5A1\uBCF6\uC774","\uC0BC\uACB9\uC0B4","\uCE58\uD0A8","\uD53C\uC790","\uC9DC\uC7A5\uBA74","\uB77C\uBA74","\uCD08\uBC25","\uBE44\uBE54\uBC25","\uD584\uBC84\uAC70","\uB0C9\uBA74","\uC21C\uB300","\uB9C8\uB77C\uD0D5","\uD0D5\uD6C4\uB8E8","\uAE40\uBC25"]},{name:"\uB3D9\uBB3C",words:["\uACE0\uC591\uC774","\uAC15\uC544\uC9C0","\uD638\uB791\uC774","\uD3AD\uADC4","\uAE30\uB9B0","\uCF54\uB07C\uB9AC","\uD584\uC2A4\uD130","\uD310\uB2E4","\uD1A0\uB07C","\uC0C1\uC5B4","\uBD80\uC5C9\uC774","\uB108\uAD6C\uB9AC","\uB099\uD0C0","\uBB38\uC5B4"]},{name:"\uC7A5\uC18C",words:["\uD559\uAD50","\uBCD1\uC6D0","\uACF5\uD56D","\uCC1C\uC9C8\uBC29","\uB180\uC774\uACF5\uC6D0","\uD3B8\uC758\uC810","\uB3C4\uC11C\uAD00","\uC601\uD654\uAD00","\uB178\uB798\uBC29","\uC218\uC601\uC7A5","\uCEA0\uD551\uC7A5","PC\uBC29","\uACB0\uD63C\uC2DD\uC7A5","\uC9C0\uD558\uCCA0"]},{name:"\uC9C1\uC5C5",words:["\uC758\uC0AC","\uC18C\uBC29\uAD00","\uACBD\uCC30","\uC694\uB9AC\uC0AC","\uC120\uC0DD\uB2D8","\uC720\uD29C\uBC84","\uBBF8\uC6A9\uC0AC","\uD30C\uC77C\uB7FF","\uD0DD\uBC30\uAE30\uC0AC","\uBCC0\uD638\uC0AC","\uC544\uC774\uB3CC","\uB9C8\uC220\uC0AC","\uD504\uB85C\uAC8C\uC774\uBA38","\uBC14\uB9AC\uC2A4\uD0C0"]},{name:"\uBB3C\uAC74",words:["\uC6B0\uC0B0","\uB0C9\uC7A5\uACE0","\uCE6B\uC194","\uC548\uACBD","\uB9AC\uBAA8\uCEE8","\uD734\uB300\uD3F0","\uBCA0\uAC1C","\uAC00\uC704","\uAC70\uC6B8","\uC9C0\uAC11","\uC774\uC5B4\uD3F0","\uC120\uD48D\uAE30","\uC190\uD1B1\uAE4E\uC774","\uB4DC\uB77C\uC774\uAE30"]},{name:"\uC2A4\uD3EC\uCE20",words:["\uCD95\uAD6C","\uC57C\uAD6C","\uB18D\uAD6C","\uBC30\uB4DC\uBBFC\uD134","\uBCFC\uB9C1","\uC218\uC601","\uD0DC\uAD8C\uB3C4","\uC2A4\uD0A4","\uD0C1\uAD6C","\uACE8\uD504","\uB9C8\uB77C\uD1A4","\uD074\uB77C\uC774\uBC0D","\uBCF5\uC2F1","\uB2F9\uAD6C"]},{name:"\uB098\uB77C\xB7\uB3C4\uC2DC",words:["\uC77C\uBCF8","\uBBF8\uAD6D","\uD504\uB791\uC2A4","\uC774\uD0C8\uB9AC\uC544","\uBCA0\uD2B8\uB0A8","\uD638\uC8FC","\uC774\uC9D1\uD2B8","\uBE0C\uB77C\uC9C8","\uC2A4\uC704\uC2A4","\uC81C\uC8FC\uB3C4","\uBD80\uC0B0","\uB274\uC695","\uD30C\uB9AC","\uD558\uC640\uC774"]},{name:"\uC601\uD654\xB7\uB4DC\uB77C\uB9C8",words:["\uAE30\uC0DD\uCDA9","\uC624\uC9D5\uC5B4 \uAC8C\uC784","\uD0C0\uC774\uD0C0\uB2C9","\uACA8\uC6B8\uC655\uAD6D","\uD574\uB9AC\uD3EC\uD130","\uC5B4\uBCA4\uC838\uC2A4","\uBC94\uC8C4\uB3C4\uC2DC","\uC778\uC0AC\uC774\uB4DC \uC544\uC6C3","\uB354 \uAE00\uB85C\uB9AC","\uC751\uB2F5\uD558\uB77C 1988","\uC774\uC0C1\uD55C \uBCC0\uD638\uC0AC \uC6B0\uC601\uC6B0","\uC544\uBC14\uD0C0","\uBD80\uC0B0\uD589","\uADF9\uD55C\uC9C1\uC5C5"]}];function Yw(){return bo.concat(C.topics.filter(function(n){return n.name&&Array.isArray(n.words)&&n.words.length>=2}).map(function(n){return{name:n.name,words:n.words}}))}function Jw(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ko(n,e,t){let r=Jw(e),i=n[Math.floor(r()*n.length)],s=Math.floor(r()*t.length),a=Math.floor(r()*(t.length-1));a>=s&&a++;let c=n.slice();for(let l=c.length-1;l>0;l--){let d=Math.floor(r()*(l+1)),m=c[l];c[l]=c[d],c[d]=m}return c[0]===i&&c.push(c.shift()),{liar:i,word:t[s],fool:t[a],order:c}}function $w(n){return!n||!n.topic||!Array.isArray(n.lineup)||!n.lineup.length?null:ko(n.lineup,n.seed,n.topic.words)}function Ao(n){return String(n||"").replace(/\s+/g,"").toLowerCase()}function Xw(){Ht(Pe($,"config","boss"),function(e){C.bossUid=e.exists()?e.data().uid:null,C.bossKnown=!0,ee()},function(){C.bossKnown=!0,ee()}),Ht(Ke($,"members"),function(e){C.members=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(zw),C.membersReady=!0,ee()},function(){C.membersReady=!0,ee()}),Ht(Ke($,"liarTopics"),function(e){C.topics=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(function(t,r){return(t.order||0)-(r.order||0)}),ee()}),Ht(go(Ke($,"guestbook"),yo("createdAt","desc"),_o(150)),function(e){C.guest=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),C.guestReady=!0,ee()},function(){C.guestReady=!0,ee()});let n=pe.fromMillis(Date.now()-12*3600*1e3);Ht(go(Ke($,"rooms"),Lp("createdAt",">",n),yo("createdAt","desc"),_o(20)),function(e){C.rooms=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}),C.roomsReady=!0,ee()},function(){C.roomsReady=!0,ee()})}var Io=[];function Jp(n){C.roomId!==n&&(Io.forEach(function(e){e()}),Io=[],C.roomId=n,C.room=null,C.roomMissing=!1,C.msgs=[],n&&(Io.push(Ht(Pe($,"rooms",n),function(e){C.room=e.exists()?Object.assign({id:e.id},e.data()):null,C.roomMissing=!e.exists(),ee()})),Io.push(Ht(go(Ke($,"rooms",n,"msgs"),yo("createdAt"),_o(400)),function(e){C.msgs=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),ee()}))))}$a(rr,function(n){C.user=n,n||Ya(rr).catch(function(){Q("\uBCF8\uBD80\uC5D0 \uC5F0\uACB0\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694.")}),ee()});async function Zw(){try{await tc(rr,new xt),Q("\uAD6C\uAE00 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uC5B4\uC694.")}catch(n){let e=n&&n.code||"";if(e.indexOf("popup-closed")>=0||e.indexOf("cancelled")>=0)return;e.indexOf("popup-blocked")>=0?Q("\uD31D\uC5C5\uC774 \uB9C9\uD614\uC5B4\uC694. \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uD31D\uC5C5\uC744 \uD5C8\uC6A9\uD574 \uC8FC\uC138\uC694."):e.indexOf("unauthorized-domain")>=0?Q("\uC774 \uC8FC\uC18C\uAC00 Firebase \uC2B9\uC778\uB41C \uB3C4\uBA54\uC778\uC5D0 \uC5C6\uC5B4\uC694."):Q("\uB85C\uADF8\uC778\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.")}}async function Il(){await Xa(rr),Q("\uB85C\uADF8\uC544\uC6C3\uD588\uC5B4\uC694.")}async function eI(){try{await pi(Pe($,"config","boss"),{uid:So(),since:vt()}),Q("\uC774 \uACC4\uC815\uC774 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uB410\uC5B4\uC694.")}catch(n){Q(_e(n))}}async function tI(){if(!C.importing){C.importing=!0,ee();try{let e=await(await fetch("seed.json",{cache:"no-store"})).json(),t=Up($);(e.members||[]).forEach(function(r){let i=Object.assign({},r);delete i.id,t.set(Pe($,"members",r.id),i)}),(e.liarTopics||[]).forEach(function(r,i){t.set(Pe(Ke($,"liarTopics")),{name:r.name,words:r.words,order:i+1})}),await t.commit(),Q("\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D\uC744 \uBAA8\uB450 \uAC00\uC838\uC654\uC5B4\uC694.")}catch(n){Q(_e(n))}C.importing=!1,ee()}}function nI(){let n=C.members.length,e=C.rooms.filter(function(t){return t.status&&t.status!=="closed"}).length;return f("section",{class:"screen"},n?f("div",{class:"whoami"},f("div",null,f("span",{class:"eyebrow",text:"\uD604\uC7AC \uC2E0\uC6D0"}),f("b",{text:Hw()})),f("button",{class:"ghost",type:"button",onclick:function(){Al(null),ee()},text:"\uC2E0\uC6D0 \uBCC0\uACBD"})):null,f("div",{class:"cover"},f("div",{class:"cover-meta"},f("span",{class:"eyebrow",text:"\uBB38\uC11C\uBC88\uD638 BF-HQ-001"}),f("span",{class:"eyebrow",text:"\uC5F4\uB78C \uC81C\uD55C \xB7 \uC870\uC9C1\uC6D0 \uC804\uC6A9"})),f("div",{class:"stamp","aria-hidden":"true",text:"\uADF9\uBE44"}),f("div",{class:"cover-title"},Cl("logo-l"),f("h1",null,f("span",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"}),"\uBE44\uBC00\uBCF8\uBD80")),f("p",{class:"motto"},f("q",{text:jw}),f("small",{text:"\uC870\uC9C1 \uAC15\uB839 \uC81C1\uC870"}))),f("div",{class:"actions"},f("button",{class:"btn primary",type:"button",onclick:function(){Oe("members")}},f("span",null,f("small",{text:"\uBA85\uBD80 \uC5F4\uB78C"}),"\uC870\uC9C1\uC6D0 \uBCF4\uAE30"),f("span",{class:"arr",text:"\u2192"})),f("button",{class:"btn",type:"button",onclick:function(){Oe("games")}},f("span",null,f("small",{text:"\uD734\uAC8C \uAD6C\uC5ED"}),"\uAC8C\uC784\uBC29"),f("span",{class:"arr",text:"\u2192"}))),f("div",{class:"ledger"},f("div",null,f("b",{text:String(n)}),f("span",{text:"\uB4F1\uB85D \uC870\uC9C1\uC6D0"})),f("div",null,f("b",{text:String(e)}),f("span",{text:"\uC5F4\uB9B0 \uAC8C\uC784\uBC29"})),f("div",null,f("b",{text:String(C.guest.length)}),f("span",{text:"\uBC29\uBA85\uB85D"}))),f("details",{class:"guide"},f("summary",{text:"\uBCF8\uBD80\uB97C \uD648 \uD654\uBA74\uC5D0 \uB450\uB294 \uBC95"}),f("div",{class:"guide-body"},f("div",null,f("h3",{text:"\uC544\uC774\uD3F0 (Safari)"}),f("ol",null,f("li",{text:"\uC774 \uC8FC\uC18C\uB97C Safari\uB85C \uC5FD\uB2C8\uB2E4."}),f("li",{text:"\uC544\uB798\uCABD \uACF5\uC720 \uBC84\uD2BC(\uB124\uBAA8\uC5D0 \uD654\uC0B4\uD45C)\uC744 \uB204\uB985\uB2C8\uB2E4."}),f("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))),f("div",null,f("h3",{text:"\uC548\uB4DC\uB85C\uC774\uB4DC (Chrome)"}),f("ol",null,f("li",{text:"\uC774 \uC8FC\uC18C\uB97C Chrome\uC73C\uB85C \uC5FD\uB2C8\uB2E4."}),f("li",{text:"\uC624\uB978\uCABD \uC704 \u22EE \uBA54\uB274\uB97C \uB204\uB985\uB2C8\uB2E4."}),f("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019 \uB610\uB294 \u2018\uC571 \uC124\uCE58\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))))),rI())}function rI(){let n=C.user;return!n||n.isAnonymous?f("div",{class:"boss-row"},f("button",{type:"button",class:"link-btn",onclick:Zw,text:"\uB450\uBAA9 \uB85C\uADF8\uC778"})):C.bossKnown&&!C.bossUid?f("div",{class:"panel"},f("div",{class:"field-label",text:"\uB450\uBAA9 \uB4F1\uB85D"}),f("p",{class:"note",text:"\uC544\uC9C1 \uB450\uBAA9\uC774 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC558\uC5B4\uC694. \uC9C0\uAE08 \uB85C\uADF8\uC778\uD55C \uAD6C\uAE00 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uD560\uAE4C\uC694? \uD55C \uBC88 \uB4F1\uB85D\uD558\uBA74 \uC774 \uACC4\uC815\uB9CC \uC870\uC9C1\uC6D0\uACFC \uC8FC\uC81C\uB97C \uACE0\uCE60 \uC218 \uC788\uC5B4\uC694."}),f("button",{type:"button",class:"save",onclick:eI,text:"\uC774 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D"}),f("button",{type:"button",class:"link-btn",onclick:Il,text:"\uB85C\uADF8\uC544\uC6C3"})):ir()?f("div",{class:"boss-row"},C.members.length===0&&C.membersReady?f("button",{type:"button",class:"save",disabled:C.importing,onclick:tI,text:C.importing?"\uAC00\uC838\uC624\uB294 \uC911\u2026":"\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D \uAC00\uC838\uC624\uAE30"}):null,f("span",{class:"note",text:"\uB450\uBAA9\uC73C\uB85C \uB85C\uADF8\uC778\uB428"}),f("button",{type:"button",class:"link-btn",onclick:Il,text:"\uB85C\uADF8\uC544\uC6C3"})):f("div",{class:"boss-row"},f("span",{class:"note",text:"\uC774 \uAD6C\uAE00 \uACC4\uC815\uC740 \uB450\uBAA9\uC774 \uC544\uB2C8\uC5D0\uC694."}),f("button",{type:"button",class:"link-btn",onclick:Il,text:"\uB85C\uADF8\uC544\uC6C3"}))}function iI(){let n=C.pick&&wt(C.pick);return f("section",{class:"gate"},Cl("logo-g"),f("div",null,f("span",{class:"eyebrow",text:"\uCD9C\uC785 \uD1B5\uC81C \xB7 \uC2E0\uC6D0 \uD655\uC778"}),f("h1",null,"\uBCF8\uBD80\uC5D0 \uB4E4\uC5B4\uC624\uB824\uBA74",f("br"),f("em",{text:"\uC2E0\uC6D0"}),"\uC744 \uBC1D\uD600\uB77C."),f("p",{text:"\uC790\uAE30 \uCE74\uB4DC\uB97C \uD55C \uBC88\uB9CC \uACE0\uB974\uBA74 \uC774 \uD3F0\uC774 \uAE30\uC5B5\uD574\uC694. \uAC8C\uC784\uACFC \uBC29\uBA85\uB85D\uC5D0\uC11C \uC774 \uC774\uB984\uC744 \uC368\uC694."})),f("div",{class:"pick",role:"group","aria-label":"\uC870\uC9C1\uC6D0 \uC120\uD0DD"},C.members.map(function(e){return f("button",{type:"button","aria-pressed":C.pick===e.id?"true":"false",onclick:function(){C.pick=e.id,ee()}},f("div",{class:"pp"},Tn(e)),f("span",{class:"pn",text:e.nick}))})),f("button",{class:"save",type:"button",disabled:!n,onclick:function(){n&&(Al(n.id),C.pick=null,ee(),Q("\u2018"+n.nick+"\u2019 \uC2E0\uC6D0\uC73C\uB85C \uC785\uC7A5\uD588\uC5B4\uC694."))}},n?"\u2018"+n.nick+"\u2019 \uC2E0\uBD84\uC73C\uB85C \uC785\uC7A5":"\uC704\uC5D0\uC11C \uC790\uAE30 \uCE74\uB4DC\uB97C \uACE0\uB974\uC138\uC694"),f("button",{class:"guest-btn",type:"button",onclick:function(){Al("guest"),C.pick=null,ee()},text:"\uBA85\uBD80\uC5D0 \uC544\uC9C1 \uC5C6\uC5B4\uC694 \xB7 \uC190\uB2D8\uC73C\uB85C \uC785\uC7A5"}))}function sI(){let n=C.members,e=n.length?f("div",{class:"roster"},n.map(function(t){return f("button",{class:"card",type:"button","aria-label":t.nick+" \uC218\uBC30\uC11C \uC5F4\uAE30",onclick:function(){Oe("m-"+t.id)}},f("div",{class:"card-photo"},Tn(t),f("span",{class:"tag"+(t.rank?" boss":""),text:t.rank||"\uC218\uBC30\uC911"}),Co()===t.id?f("span",{class:"me-tag",text:"\uBCF8\uC778"}):null),f("div",{class:"card-body"},f("span",{class:"card-no",text:Po(t)}),f("span",{class:"card-name",text:t.nick}),t.alias?f("span",{class:"card-alias",text:"\uC77C\uBA85 "+t.alias}):null))})):f("div",{class:"empty",text:C.membersReady?"\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC870\uC9C1\uC6D0\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.":"\uBA85\uBD80\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return f("section",{class:"screen"},f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"\uC870\uC9C1\uC6D0 \uBA85\uBD80"}),f("h2",{text:"\uC218\uBC30 \uB300\uC0C1 "+n.length+"\uBA85"}),f("p",{text:"\uCE74\uB4DC\uB97C \uB204\uB974\uBA74 \uC218\uBC30\uC11C\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4."})),ir()?f("button",{class:"add-btn",type:"button",onclick:function(){rm(null)},text:"\uC870\uC9C1\uC6D0 \uB4F1\uB85D"}):null),e)}function oI(n){let e=wt(n);if(!e)return f("section",{class:"screen"},f("button",{class:"back",type:"button",onclick:function(){Oe("members")},text:"\uBA85\uBD80\uB85C"}),f("div",{class:"empty",text:C.membersReady?"\uC774 \uC218\uBC30\uC11C\uB294 \uD3D0\uAE30\uB418\uC5C8\uAC70\uB098 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.":"\uC218\uBC30\uC11C\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"}));let t=(e.charges||[]).filter(function(a){return a&&String(a).trim()}),r=f("div",{class:"ruler","aria-hidden":"true"},["190","180","170","160","150","140","130","120","110","100"].map(function(a){return f("span",{text:a})})),i=f("article",{class:"poster","aria-label":e.nick+" \uC218\uBC30\uC11C"},f("header",{class:"poster-top"},f("div",{class:"w",text:"\uC218\uBC30"}),f("div",{class:"sub",text:e.rank==="\uB450\uBAA9"?"WANTED \xB7 1\uAE09 \uC218\uBC30 \xB7 \uC870\uC9C1 \uB450\uBAA9":"WANTED \xB7 \uBD88\uC8FC\uBA39\uC870\uC9C1 \uB0B4\uBD80 \uC218\uBC30\uC11C"})),f("div",{class:"case"},f("span",null,"\uC0AC\uAC74\uBC88\uD638 ",f("b",{text:Po(e)})),f("span",null,"\uC9C1\uC704 ",f("b",{text:e.rank||"\uC870\uC9C1\uC6D0"}))),f("div",{class:"mug"},Tn(e),r,f("i",{class:"corner tl"}),f("i",{class:"corner tr"}),f("i",{class:"corner bl"}),f("i",{class:"corner br"})),f("div",{class:"ident"},f("div",{class:"eyebrow",text:"\uB2C9\uB124\uC784"}),f("div",{class:"nick",text:e.nick}),e.alias?f("div",{class:"alias"},"\uC77C\uBA85 ",f("b",{text:"\u2018"+e.alias+"\u2019"})):null),f("div",{class:"field"},f("div",{class:"field-label",text:"\uBCF8\uC778 \uC9C4\uC220"}),f("p",{class:"statement",text:e.intro?"\u201C"+e.intro+"\u201D":"\uC9C4\uC220\uC744 \uAC70\uBD80\uD558\uACE0 \uC788\uC74C."})),f("div",{class:"field"},f("div",{class:"field-label",text:"\uD610\uC758 "+t.length+"\uAC74"}),t.length?f("ol",{class:"charges"},t.map(function(a){return f("li",{text:a})})):f("p",{class:"statement",text:"\uC544\uC9C1 \uB4DC\uB7EC\uB09C \uD610\uC758 \uC5C6\uC74C. \uC218\uC0AC \uC911."})),e.sample?f("div",{class:"draft-note",text:"\uC784\uC2DC \uAE30\uB85D \xB7 \uB450\uBAA9\uC774 \uACE7 \uCC44\uC6B8 \uC608\uC815"}):null,f("div",{class:"stamp","aria-hidden":"true",text:"\uD655\uC778"}),f("footer",{class:"poster-foot"},f("span",{text:"\uC81C\uBCF4\uCC98: \uBD88\uC8FC\uBA39\uC870\uC9C1 \uBE44\uBC00\uBCF8\uBD80"}),f("span",{text:"\uBCF8 \uBB38\uC11C\uB294 \uC870\uC9C1\uC6D0 \uC678 \uC5F4\uB78C\uC744 \uAE08\uD568"}))),s=null;return ir()&&(s=C.confirmDelete?f("div",{class:"confirm"},f("p",{text:"\u2018"+e.nick+"\u2019 \uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD560\uAE4C\uC694? \uBAA8\uB4E0 \uC870\uC9C1\uC6D0 \uD654\uBA74\uC5D0\uC11C \uC0AC\uB77C\uC9D1\uB2C8\uB2E4."}),f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){C.confirmDelete=!1,ee()},text:"\uCDE8\uC18C"}),f("button",{type:"button",class:"danger",onclick:async function(){try{await mi(Pe($,"members",e.id)),C.confirmDelete=!1,Oe("members"),Q("\uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD588\uC5B4\uC694.")}catch(a){Q(_e(a))}},text:"\uD3D0\uAE30\uD558\uAE30"}))):f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){rm(e)},text:"\uC218\uBC30\uC11C \uC218\uC815"}),f("button",{type:"button",class:"danger",onclick:function(){C.confirmDelete=!0,ee()},text:"\uD3D0\uAE30"}))),f("section",{class:"screen"},f("button",{class:"back",type:"button",onclick:function(){Oe("members")},text:"\uBA85\uBD80\uB85C"}),i,s)}var aI=[{id:"assoc",code:"G-01",name:"\uC5F0\uC0C1\uD034\uC988",desc:"\uB2E8\uC5B4 \uD558\uB098\uB85C \uB5A0\uC62C\uB9AC\uB294 \uC870\uC9C1\uC6D0\uB4E4\uC758 \uBA38\uB9BF\uC18D.",ready:!1},{id:"mafia",code:"G-02",name:"\uB9C8\uD53C\uC544",desc:"\uC870\uC9C1 \uC548\uC5D0 \uC870\uC9C1\uC774 \uC788\uB2E4. \uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC529.",ready:!1},{id:"yut",code:"G-03",name:"\uC737\uB180\uC774",desc:"\uB3C4\xB7\uAC1C\xB7\uAC78\xB7\uC737\xB7\uBAA8\uB85C \uAC00\uB9AC\uB294 \uBCF8\uBD80 \uC11C\uC5F4.",ready:!1},{id:"liar",code:"G-04",name:"\uB77C\uC774\uC5B4",desc:"\uD63C\uC790\uB9CC \uC81C\uC2DC\uC5B4\uB97C \uBAA8\uB974\uB294 \uC0AC\uB78C\uC744 \uCC3E\uC544\uB77C.",ready:!0}];function cI(){return f("section",{class:"screen"},f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"\uD734\uAC8C \uAD6C\uC5ED"}),f("h2",{text:"\uAC8C\uC784\uBC29"}),f("p",{text:"\uAC8C\uC784\uC740 \uD558\uB098\uC529 \uC21C\uC11C\uB300\uB85C \uC5F4\uB9BD\uB2C8\uB2E4."}))),f("div",{class:"games"},aI.map(function(n){return f("button",{class:"game"+(n.ready?" ready":""),type:"button",disabled:!n.ready,"aria-label":n.name+(n.ready?" \uC5F4\uAE30":" \uC900\uBE44 \uC911"),onclick:n.ready?function(){Oe("game-"+n.id)}:null},f("span",{class:"code",text:n.code}),f("h3",{text:n.name}),f("p",{text:n.desc}),f("span",{class:"status",text:n.ready?"\uC785\uC7A5 \uAC00\uB2A5":"\uC900\uBE44 \uC911"}))})))}var $p={lobby:"\uB300\uAE30 \uC911",hint:"\uC124\uBA85 \uC911",discuss:"\uD1A0\uB860 \uC911",vote:"\uD22C\uD45C \uC911",guess:"\uB77C\uC774\uC5B4 \uBC18\uACA9",result:"\uACB0\uACFC \uBC1C\uD45C"},uI=Pl&&new URLSearchParams(location.search).has("fast"),In={hint:20,discuss:120,vote:20,guess:20};uI&&Object.keys(In).forEach(function(n){In[n]=Math.max(2,Math.round(In[n]/10))});function lI(){let n=Xe(),e=C.rooms.filter(function(r){return r.status&&r.status!=="closed"}),t=e.length?f("ul",{class:"room-list"},e.map(function(r){let i=n&&(r.players||[]).indexOf(n.id)>=0;return f("li",null,f("button",{type:"button",class:"room-item",onclick:function(){Oe("room-"+r.id)}},f("span",{class:"ri-main"},f("b",{text:Ce(r.createdBy)+"\uC758 \uBC29"}),f("span",{class:"ri-sub",text:(r.players||[]).map(Ce).join(", ")||"\uC544\uC9C1 \uC544\uBB34\uB3C4 \uC5C6\uC5B4\uC694"})),f("span",{class:"ri-side"},f("span",{class:"status-chip"+(r.status==="lobby"?" open":""),text:$p[r.status]||r.status}),f("span",{class:"ri-sub",text:(r.players||[]).length+"\uBA85"+(i?" \xB7 \uCC38\uAC00 \uC911":"")}))))})):f("div",{class:"empty",text:C.roomsReady?"\uC5F4\uB9B0 \uBC29\uC774 \uC5C6\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC870\uC9C1\uC6D0\uC744 \uBD88\uB7EC \uBAA8\uC73C\uC138\uC694.":"\uBC29 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return f("section",{class:"screen"},f("button",{class:"back",type:"button",onclick:function(){Oe("games")},text:"\uAC8C\uC784\uBC29\uC73C\uB85C"}),f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"G-04"}),f("h2",{text:"\uB77C\uC774\uC5B4"}),f("p",{text:"\uBC29\uC744 \uB9CC\uB4E4\uAC70\uB098 \uC5F4\uB9B0 \uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uC138\uC694. \uC124\uBA85\uACFC \uD22C\uD45C\uB294 \uBAA8\uB450 \uAC8C\uC784 \uC548\uC5D0\uC11C \uD574\uC694."}))),f("button",{type:"button",class:"save",disabled:!n||!C.user,onclick:dI},n?"\uC0C8 \uBC29 \uB9CC\uB4E4\uAE30":"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uBC29\uC744 \uB9CC\uB4E4 \uC218 \uC788\uC5B4\uC694"),f("div",{class:"field"},f("div",{class:"field-label",text:"\uC5F4\uB9B0 \uBC29"}),t),hI(),ir()?xI():null)}function hI(){return f("details",{class:"guide"},f("summary",{text:"\uB77C\uC774\uC5B4 \uAC8C\uC784 \uADDC\uCE59"}),f("div",{class:"guide-body"},f("ol",null,f("li",{text:"\uBC29\uC744 \uB9CC\uB4E4\uACE0 \uB2E8\uD1A1\uBC29\uC5D0 \uC54C\uB824\uC694. \uB2E4\uB4E4 \uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0\uC11C \uADF8 \uBC29\uC744 \uB20C\uB7EC \uCC38\uAC00\uD574\uC694."}),f("li",{text:"3\uBA85 \uC774\uC0C1 \uBAA8\uC774\uBA74 \uC544\uBB34\uB098 \u2018\uAC8C\uC784 \uC2DC\uC791\u2019\uC744 \uB20C\uB7EC\uC694. \uB9CC\uB4E0 \uC0AC\uB78C\uB3C4 \uB77C\uC774\uC5B4\uAC00 \uB204\uAD70\uC9C0 \uBAB0\uB77C\uC694."}),f("li",{text:"\uAC01\uC790 \uCE74\uB4DC\uB97C \uBAB0\uB798 \uD655\uC778\uD574\uC694. \uB77C\uC774\uC5B4\uC5D0\uAC8C\uB294 \uC8FC\uC81C\uB9CC \uBCF4\uC5EC\uC694."}),f("li",{text:"\uB79C\uB364 \uC21C\uC11C\uB85C \uD55C \uBA85\uC529 \uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD574\uC694. \uD55C \uC0AC\uB78C\uB2F9 20\uCD08, \uC2DC\uAC04\uC774 \uC9C0\uB098\uBA74 \uB2E4\uC74C \uC0AC\uB78C\uC73C\uB85C \uB118\uC5B4\uAC00\uC694."}),f("li",{text:"\uC124\uBA85\uC774 \uB05D\uB098\uBA74 2\uBD84 \uB3D9\uC548 \uB300\uD654\uCC3D\uC5D0\uC11C \uD1A0\uB860\uD574\uC694. \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uC77C\uCC0D \uB05D\uB098\uC694."}),f("li",{text:"20\uCD08 \uC548\uC5D0 \uB77C\uC774\uC5B4\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC5D0\uAC8C \uD22C\uD45C\uD574\uC694."}),f("li",{text:"\uB77C\uC774\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4\uC5D0\uAC8C 20\uCD08\uC758 \uB9C8\uC9C0\uB9C9 \uAE30\uD68C\uAC00 \uC788\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC, \uBABB \uB9DE\uD788\uBA74 \uC870\uC9C1\uC6D0 \uC2B9\uB9AC. \uB3D9\uC810\uC774\uAC70\uB098 \uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD558\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC\uC608\uC694."})),f("p",{class:"note",text:"\uBC14\uBCF4 \uBAA8\uB4DC\uC5D0\uC11C\uB294 \uB77C\uC774\uC5B4\uB3C4 \uAC19\uC740 \uC8FC\uC81C\uC758 \uB2E4\uB978 \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC11C, \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778\uC9C0 \uBAA8\uB978 \uCC44 \uC124\uBA85\uD574\uC694."})))}async function dI(){let n=Xe();if(!(!n||!C.user))try{let e=await gi(Ke($,"rooms"),{status:"lobby",createdAt:vt(),createdBy:n.id,players:[n.id],mode:0,topicChoice:-1,rounds:1,game:0,votes:{},turn:0});Oe("room-"+e.id)}catch(e){Q(_e(e))}}function ye(){return Pe($,"rooms",C.roomId)}async function vi(n){try{await wo(ye(),n)}catch(e){Q(_e(e))}}async function fI(){let n=Xe();n&&await vi({players:vl(n.id)})}async function pI(){let n=Xe(),e=C.room;if(!n||!e)return;let t=(e.players||[]).filter(function(r){return r!==n.id});await vi(t.length?{players:wl(n.id)}:{players:wl(n.id),status:"closed"}),Oe("game-liar")}async function mI(){let n=Yw();try{await wn($,async function(e){let r=(await e.get(ye())).data();if(!r||r.status!=="lobby")throw{code:"phase"};let i=(r.players||[]).filter(function(l){return!!wt(l)}).slice().sort();if(i.length<3)throw{code:"few"};let s=r.topicChoice>=0&&bo[r.topicChoice]?bo[r.topicChoice]:n[Math.floor(Math.random()*n.length)],a=Math.floor(Math.random()*2147483647),c=ko(i,a,s.words);e.update(ye(),{status:"hint",lineup:i,seed:a,topic:{name:s.name,words:s.words},order:c.order,turn:0,votes:{},accused:null,guess:null,winner:null,reason:null,game:(r.game||0)+1,startedAt:vt(),phase:(r.phase||0)+1,phaseAt:vt(),readyVote:[]})}),C.flipped={}}catch(e){e&&e.code==="few"?Q("3\uBA85 \uC774\uC0C1 \uBAA8\uC5EC\uC57C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."):e&&e.code==="phase"?Q("\uC774\uBBF8 \uAC8C\uC784\uC774 \uC2DC\uC791\uB410\uC5B4\uC694."):Q(_e(e))}}async function gI(n,e){let t=Xe(),r=C.room,i=t?t.nick:"\uC190\uB2D8";return gi(Ke($,"rooms",C.roomId,"msgs"),{uid:So(),memberId:t?t.id:null,nick:i,text:e,kind:n,game:r&&r.game||0,createdAt:vt()})}function Qt(n,e){return Object.assign({phase:(n.phase||0)+1,phaseAt:vt()},e)}async function Sl(n,e,t){let r=Xe();await wn($,async function(i){let a=(await i.get(ye())).data();if(!a||a.status!=="hint")throw{code:"phase"};if(t!=null&&a.phase!==t)throw{code:"phase"};let c=a.order.length,l=a.order[a.turn%c];if(n==="hint"&&l!==(r&&r.id))throw{code:"turn"};let d=Pe(Ke($,"rooms",C.roomId,"msgs"));i.set(d,{uid:So(),memberId:r?r.id:null,nick:r?r.nick:"\uC190\uB2D8",text:n==="hint"?e:n==="timeout"?Ce(l)+" \uC2DC\uAC04 \uCD08\uACFC! \uB2E4\uC74C \uC0AC\uB78C \uCC28\uB840\uC608\uC694.":Ce(l)+" \uCC28\uB840\uB97C \uB118\uACBC\uC5B4\uC694.",kind:n==="hint"?"hint":"skip",game:a.game||0,round:Math.floor(a.turn/c)+1,speaker:l,createdAt:vt()});let m=a.turn+1;i.update(ye(),Qt(a,m>=c*(a.rounds||1)?{turn:m,status:"discuss",readyVote:[]}:{turn:m}))})}async function yI(n){await wn($,async function(e){let r=(await e.get(ye())).data();!r||r.status!=="discuss"||n!=null&&r.phase!==n||e.update(ye(),Qt(r,{status:"vote"}))})}async function _I(){let n=Xe();if(n)try{await wo(ye(),{readyVote:vl(n.id)}),await wn($,async function(e){let r=(await e.get(ye())).data();if(!r||r.status!=="discuss")return;let i=Math.ceil((r.lineup||[]).length/2);(r.readyVote||[]).length>=i&&e.update(ye(),Qt(r,{status:"vote"}))})}catch(e){Q(_e(e))}}async function vI(n){let e=Xe();if(e)try{await wo(ye(),{["votes."+e.id]:n}),await Xp(!1)}catch(t){Q(_e(t))}}async function Xp(n,e){try{await wn($,async function(t){let i=(await t.get(ye())).data();if(!i||i.status!=="vote"||e!=null&&i.phase!==e)return;let s=i.votes||{},a=i.lineup||[],c=a.filter(function(I){return s[I]});if(!n&&c.length<a.length)return;let l=ko(a,i.seed,i.topic.words),d={};c.forEach(function(I){d[s[I]]=(d[s[I]]||0)+1});let m=0;Object.keys(d).forEach(function(I){d[I]>m&&(m=d[I])});let v=Object.keys(d).filter(function(I){return d[I]===m});c.length?v.length>1?t.update(ye(),Qt(i,{status:"result",winner:"liar",accused:null,reason:"\uD45C\uAC00 \uB611\uAC19\uC774 \uAC08\uB824\uC11C \uB77C\uC774\uC5B4\uB97C \uC7A1\uC9C0 \uBABB\uD588\uC5B4\uC694."})):v[0]!==l.liar?t.update(ye(),Qt(i,{status:"result",winner:"liar",accused:v[0],reason:"\uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD588\uC5B4\uC694."})):t.update(ye(),Qt(i,{status:"guess",accused:v[0]})):t.update(ye(),Qt(i,{status:"result",winner:"liar",accused:null,reason:"\uC544\uBB34\uB3C4 \uD22C\uD45C\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694."}))})}catch(t){Q(_e(t))}}async function Rl(n,e,t){await wn($,async function(r){let s=(await r.get(ye())).data();if(!s||s.status!=="guess"||t!=null&&s.phase!==t)return;let a=ko(s.lineup,s.seed,s.topic.words),c=n&&Ao(n)===Ao(a.word);r.update(ye(),Qt(s,{status:"result",guess:n||"",winner:c?"liar":"team",reason:c?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD614\uC5B4\uC694.":e?"\uB77C\uC774\uC5B4\uAC00 20\uCD08 \uC548\uC5D0 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uC9C0 \uBABB\uD588\uC5B4\uC694.":n?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uC9C0 \uBABB\uD588\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uAC00 \uB9DE\uD788\uAE30\uB97C \uD3EC\uAE30\uD588\uC5B4\uC694."}))})}var wI=1500,zp="";function Zp(n){return!n||!In[n.status]||!n.phaseAt||!n.phaseAt.toMillis?null:n.phaseAt.toMillis()+In[n.status]*1e3}function em(n){return Math.floor(n/60)+":"+String(n%60).padStart(2,"0")}function wi(n,e){let t=Zp(n),r=(In[n.status]||1)*1e3,i=t==null?r:t-Date.now(),s=Math.max(0,Math.ceil(i/1e3)),a=f("i");return a.style.width=Math.max(0,Math.min(100,i/r*100))+"%",f("div",{class:"timer"+(s<=10?" low":""),role:"timer"},f("span",{class:"t-label",text:e}),f("b",{class:"t-num",text:em(s)}),f("span",{class:"t-bar"},a))}async function II(n){if(n.status==="hint")return Sl("timeout",null,n.phase);if(n.status==="discuss")return yI(n.phase);if(n.status==="vote")return Xp(!0,n.phase);if(n.status==="guess")return Rl("",!0,n.phase)}setInterval(function(){let n=C.room;if(!n||Qp().indexOf("room-")!==0)return;let e=Zp(n);if(e==null)return;let t=e-Date.now(),r=In[n.status]*1e3,i=Math.max(0,Math.ceil(t/1e3));document.querySelectorAll(".timer").forEach(function(a){a.querySelector(".t-num").textContent=em(i),a.querySelector(".t-bar i").style.width=Math.max(0,Math.min(100,t/r*100))+"%",a.classList.toggle("low",i<=10)});let s=n.id+":"+n.phase;t<-wI&&zp!==s&&C.user&&(zp=s,II(n).catch(function(){}))},500);async function tm(){await vi({status:"lobby",votes:{},accused:null,guess:null,winner:null,reason:null,turn:0,order:[],lineup:[],topic:null,readyVote:[],phaseAt:null})}function EI(n){Jp(n);let e=f("button",{class:"back",type:"button",onclick:function(){Oe("game-liar")},text:"\uB77C\uC774\uC5B4 \uBC29 \uBAA9\uB85D"});if(C.roomMissing)return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uAC70\uB098 \uC5C6\uC5B4\uC694."}));let t=C.room;if(!t)return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uB294 \uC911\u2026"}));if(t.status==="closed")return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC8FC\uC138\uC694."}));let r=Xe(),i=t.players||[],s=r&&i.indexOf(r.id)>=0,a=t.status!=="lobby",c=a?t.lineup||[]:i,l=r&&c.indexOf(r.id)>=0,d=a?$w(t):null;if(a&&!d)return f("section",{class:"screen"},e,f("div",{class:"empty",text:"\uAC8C\uC784 \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694. \u2018\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354\u2019\uB85C \uB2E4\uC2DC \uC2DC\uC791\uD574 \uC8FC\uC138\uC694."}),f("button",{type:"button",class:"ghost wide",onclick:tm,text:"\uB300\uAE30\uC2E4\uB85C \uB3CC\uB9AC\uAE30"}));let m=f("div",{class:"room-head"},f("div",null,f("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4 \xB7 "+Ce(t.createdBy)+"\uC758 \uBC29"}),f("h2",{text:$p[t.status]||""})),f("span",{class:"mode-chip",text:(t.mode===1?"\uBC14\uBCF4 \uBAA8\uB4DC":"\uC77C\uBC18 \uBAA8\uB4DC")+" \xB7 "+(t.rounds||1)+"\uBC14\uD034"})),v=f("div",{class:"chips"},c.map(function(V){let k=t.status==="vote"&&t.votes&&t.votes[V];return f("span",{class:"chip static"+(r&&V===r.id?" me":"")+(k?" done":"")},Ce(V)+(k?" \u2713":""))})),I;t.status==="lobby"?I=TI(t,r,s,i):t.status==="hint"?I=AI(t,r,l,d):t.status==="discuss"?I=SI(t,r,l):t.status==="vote"?I=RI(t,r,l):t.status==="guess"?I=PI(t,r,d):I=CI(t,d,r,l);let R=a&&l&&t.status!=="result"?bI(t,r,d):null,D=a||C.msgs.length;return f("section",{class:"screen room"},e,m,f("div",{class:"field"},f("div",{class:"field-label",text:(a?"\uCC38\uAC00\uC790 ":"\uBAA8\uC778 \uC0AC\uB78C ")+c.length+"\uBA85"}),v),R,I,D?kI(t,r):null)}function TI(n,e,t,r){function i(c,l,d,m){return f("button",{type:"button","aria-pressed":(n[c]||(c==="rounds"?1:0))===l?"true":"false",onclick:function(){let v={};v[c]=l,vi(v)}},d,m?f("small",{text:m}):null)}let s=f("select",{id:"room-topic",class:"select"},f("option",{value:"-1",text:"\uB79C\uB364 (\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C \uD3EC\uD568)"}),bo.map(function(c,l){return f("option",{value:String(l),text:c.name})}));s.value=String(n.topicChoice==null?-1:n.topicChoice),s.addEventListener("change",function(){vi({topicChoice:parseInt(s.value,10)})});let a=r.length>=3;return f("div",{class:"panel"},f("div",{class:"field-label",text:"\uAC8C\uC784 \uC124\uC815 \xB7 \uCC38\uAC00\uC790 \uB204\uAD6C\uB098 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694"}),f("div",{class:"seg"},i("mode",0,"\uC77C\uBC18","\uB77C\uC774\uC5B4\uB294 \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778 \uAC78 \uC54C\uC544\uC694"),i("mode",1,"\uBC14\uBCF4","\uB77C\uC774\uC5B4\uB3C4 \uBE44\uC2B7\uD55C \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC694")),f("div",{class:"seg"},i("rounds",1,"\uC124\uBA85 1\uBC14\uD034"),i("rounds",2,"\uC124\uBA85 2\uBC14\uD034")),f("label",{class:"sub-label",for:"room-topic",text:"\uC8FC\uC81C"}),s,e?t?f("div",{class:"op-row"},f("button",{type:"button",onclick:pI,text:"\uBC29 \uB098\uAC00\uAE30"}),f("button",{type:"button",class:"go",disabled:!a,onclick:mI,text:a?"\uAC8C\uC784 \uC2DC\uC791":"3\uBA85\uBD80\uD130 \uC2DC\uC791"})):f("button",{type:"button",class:"save",onclick:fI,text:"\uC774 \uBC29\uC5D0 \uCC38\uAC00\uD558\uAE30"}):f("p",{class:"note",text:"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uCC38\uAC00\uD560 \uC218 \uC788\uC5B4\uC694. \uC190\uB2D8\uC740 \uAD6C\uACBD\uACFC \uCC44\uD305\uB9CC \uD560 \uC218 \uC788\uC5B4\uC694."}),f("p",{class:"hint",text:"\uB2E8\uD1A1\uBC29\uC5D0 \u2018\uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0 \uBC29 \uC5F4\uC5C8\uC5B4\uC694\u2019\uB77C\uACE0 \uC54C\uB824\uC8FC\uC138\uC694."}))}function bI(n,e,t){let r=t.liar===e.id,i=r&&n.mode===0;return f("div",{class:"secret-card front compact"+(i?" liar":"")},f("span",{class:"sc-eyebrow",text:"\uB0B4 \uCE74\uB4DC \xB7 \uC8FC\uC81C "+n.topic.name}),f("span",{class:"sc-big",text:i?"\uB2F9\uC2E0\uC740 \uB77C\uC774\uC5B4":r?t.fool:t.word}),f("span",{class:"sc-hint",text:i?"\uC81C\uC2DC\uC5B4\uB97C \uBAB0\uB77C\uC694. \uB2E4\uB978 \uC0AC\uB78C \uC124\uBA85\uC744 \uB4E3\uACE0 \uB4E4\uD0A4\uC9C0 \uC54A\uAC8C \uB458\uB7EC\uB300\uC138\uC694.":"\uB2E8\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uC9C0 \uB9D0\uACE0 \uC124\uBA85\uD558\uC138\uC694."}))}function AI(n,e,t,r){let i=n.order.length,s=n.order[n.turn%i],a=Math.floor(n.turn/i)+1,c=e&&s===e.id,l=i*(n.rounds||1),d=f("div",{class:"panel turn"+(c?" mine":"")},f("div",{class:"field-label",text:a+"\uBC14\uD034 \xB7 "+(n.turn+1)+" / "+l+"\uBC88\uC9F8 \uC124\uBA85"}),f("div",{class:"turn-now"},f("span",{class:"eyebrow",text:"\uC9C0\uAE08 \uCC28\uB840"}),f("b",{text:c?"\uB0B4 \uCC28\uB840\uC608\uC694!":Ce(s)})),wi(n,c?"\uB0B4 \uC124\uBA85 \uB0A8\uC740 \uC2DC\uAC04":Ce(s)+" \uB0A8\uC740 \uC2DC\uAC04"),f("ol",{class:"order mini"},n.order.map(function(m,v){return f("li",{class:(v===n.turn%i?"now":"")+(e&&m===e.id?" me":"")},f("span",{text:Ce(m)}))})));if(c){let m=Ro("input","hint-text",{type:"text",class:"text-in",maxlength:"60",placeholder:"\uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD558\uC138\uC694",autocomplete:"off"}),v=f("form",{class:"send-row",novalidate:!0},m,f("button",{type:"submit",class:"btn-sm go",text:"\uC124\uBA85 \uC62C\uB9AC\uAE30"}));v.addEventListener("submit",async function(I){I.preventDefault();let R=m.value.trim();if(R){if(r&&Ao(R).indexOf(Ao(r.word))>=0&&r.liar!==e.id){Q("\uC81C\uC2DC\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uBA74 \uC548 \uB3FC\uC694.");return}try{await Sl("hint",R),C.drafts["hint-text"]="",ee()}catch(D){Q(D&&(D.code==="turn"||D.code==="phase")?"\uC2DC\uAC04\uC774 \uC9C0\uB098\uC11C \uCC28\uB840\uAC00 \uB118\uC5B4\uAC14\uC5B4\uC694.":_e(D))}}}),To(d,v)}else To(d,f("button",{type:"button",class:"link-btn",onclick:async function(){try{await Sl("skip")}catch(m){Q(_e(m))}},text:Ce(s)+" \uCC28\uB840 \uB118\uAE30\uAE30 (\uC790\uB9AC \uBE44\uC6E0\uC744 \uB54C)"}));return d}function SI(n,e,t){let r=Math.ceil((n.lineup||[]).length/2),i=n.readyVote||[],s=e&&i.indexOf(e.id)>=0;return f("div",{class:"panel turn"},f("div",{class:"field-label",text:"\uD1A0\uB860 \uC2DC\uAC04"}),wi(n,"\uD1A0\uB860 \uB0A8\uC740 \uC2DC\uAC04"),f("p",{text:"\uC124\uBA85\uC774 \uB05D\uB0AC\uC5B4\uC694. \uC544\uB798 \uB300\uD654\uCC3D\uC5D0\uC11C \uB204\uAC00 \uB77C\uC774\uC5B4\uC778\uC9C0 \uC774\uC57C\uAE30\uD574 \uBCF4\uC138\uC694."}),t?f("button",{type:"button",class:s?"ghost wide":"save",disabled:s,onclick:_I},(s?"\uBC14\uB85C \uD22C\uD45C\uC5D0 \uCC2C\uC131\uD588\uC5B4\uC694 ":"\uBC14\uB85C \uD22C\uD45C\uD558\uAE30 ")+"("+i.length+"/"+r+")"):null,f("p",{class:"hint",text:"\uCC38\uAC00\uC790 \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 2\uBD84\uC774 \uC9C0\uB098\uAE30 \uC804\uC5D0 \uD22C\uD45C\uB85C \uB118\uC5B4\uAC00\uC694."}))}function RI(n,e,t){let r=n.votes||{},i=n.lineup||[],s=i.filter(function(c){return r[c]}).length,a=e?r[e.id]:null;return f("div",{class:"panel"},f("div",{class:"field-label",text:"\uD22C\uD45C \xB7 "+s+" / "+i.length+"\uBA85 \uC644\uB8CC"}),wi(n,"\uD22C\uD45C \uB0A8\uC740 \uC2DC\uAC04"),t?f("div",{class:"vote-grid"},i.filter(function(c){return c!==e.id}).map(function(c){return f("button",{type:"button",class:"vote-btn","aria-pressed":a===c?"true":"false",onclick:function(){vI(c)}},f("div",{class:"vp"},Tn(wt(c)||{})),f("span",{text:Ce(c)}))})):f("p",{class:"note",text:"\uCC38\uAC00\uC790\uB4E4\uC774 \uD22C\uD45C\uD558\uACE0 \uC788\uC5B4\uC694."}),t?f("p",{class:"hint",text:a?"\u2018"+Ce(a)+"\u2019\uC5D0\uAC8C \uD22C\uD45C\uD588\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uB77C\uACE0 \uC0DD\uAC01\uD558\uB294 \uC0AC\uB78C\uC744 \uB204\uB974\uC138\uC694. \uC2DC\uAC04\uC774 \uB05D\uB098\uBA74 \uADF8\uB54C\uAE4C\uC9C0 \uBC1B\uC740 \uD45C\uB85C \uC9D1\uACC4\uD574\uC694."}):null)}function PI(n,e,t){let r=n.accused;if(e&&e.id===r){let i=Ro("input","guess-text",{type:"text",class:"text-in",maxlength:"30",placeholder:"\uC81C\uC2DC\uC5B4\uB294 \uBB34\uC5C7\uC77C\uAE4C\uC694?",autocomplete:"off"}),s=f("form",{class:"send-row",novalidate:!0},i,f("button",{type:"submit",class:"btn-sm go",text:"\uC815\uB2F5 \uC81C\uCD9C"}));return s.addEventListener("submit",async function(a){a.preventDefault();try{await Rl(i.value.trim()),C.drafts["guess-text"]=""}catch(c){Q(_e(c))}}),f("div",{class:"panel turn mine"},f("div",{class:"field-label",text:"\uB77C\uC774\uC5B4\uC758 \uB9C8\uC9C0\uB9C9 \uAE30\uD68C"}),wi(n,"\uC815\uB2F5 \uB0A8\uC740 \uC2DC\uAC04"),f("p",{text:n.mode===1?"\uB4E4\uCF30\uC5B4\uC694! \uB2F9\uC2E0\uC774 \uB77C\uC774\uC5B4\uC600\uC5B4\uC694. \uC9C4\uC9DC \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694.":"\uB4E4\uCF30\uC5B4\uC694! \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694."}),f("p",{class:"note",text:"\uC8FC\uC81C: "+n.topic.name}),s,f("button",{type:"button",class:"link-btn",onclick:function(){Rl("")},text:"\uD3EC\uAE30\uD558\uAE30"}))}return f("div",{class:"panel turn"},f("div",{class:"field-label",text:"\uB77C\uC774\uC5B4 \uAC80\uAC70"}),wi(n,"\uB77C\uC774\uC5B4 \uB0A8\uC740 \uC2DC\uAC04"),f("p",null,f("b",{text:Ce(r)}),"\uB2D8\uC774 \uB77C\uC774\uC5B4\uB85C \uC9C0\uBAA9\uB410\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uB294 \uC911\uC774\uC5D0\uC694\u2026"))}function CI(n,e,t,r){let i=n.winner==="team",s=wt(e.liar)||{nick:Ce(e.liar)},a=n.votes||{};return f("div",{class:"answer"+(i?" team":"")},f("div",{class:"result-title",text:i?"\uC870\uC9C1\uC6D0 \uC2B9\uB9AC":"\uB77C\uC774\uC5B4 \uC2B9\uB9AC"}),f("p",{class:"note",text:n.reason||""}),f("div",{class:"ans-liar"},f("div",{class:"ans-photo"},Tn(s)),f("div",null,f("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4"}),f("b",{text:s.nick}))),f("p",null,"\uC81C\uC2DC\uC5B4: ",f("b",{text:e.word}),"  \xB7  \uC8FC\uC81C: "+n.topic.name),n.mode===1?f("p",null,"\uB77C\uC774\uC5B4\uAC00 \uBC1B\uC740 \uB2E8\uC5B4: ",f("b",{text:e.fool})):null,n.guess?f("p",null,"\uB77C\uC774\uC5B4\uC758 \uB2F5: ",f("b",{text:n.guess})):null,Object.keys(a).length?f("ul",{class:"vote-list"},(n.lineup||[]).filter(function(c){return a[c]}).map(function(c){return f("li",{text:Ce(c)+" \u2192 "+Ce(a[c])})})):null,f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){Oe("game-liar")},text:"\uBC29 \uBAA9\uB85D"}),f("button",{type:"button",class:"go",onclick:tm,text:"\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354"})))}function kI(n,e){let t=n.game||0,r=C.msgs.filter(function(c){return(c.game||0)===t}),i=f("div",{class:"log",role:"log","aria-live":"polite"},r.length?r.map(function(c){if(c.kind==="skip")return f("div",{class:"msg-sys",text:c.text});let l=e&&c.memberId===e.id;return f("div",{class:"bubble "+(c.kind==="hint"?"hint":"chat")+(l?" mine":"")},f("div",{class:"b-meta"},f("b",{text:c.nick||"\uC190\uB2D8"}),c.kind==="hint"?f("span",{class:"b-tag",text:(c.round||1)+"\uBC14\uD034 \uC124\uBA85"}):null),f("div",{class:"b-text",text:c.text}))}):f("div",{class:"msg-sys",text:"\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694."})),s=Ro("input","chat-text",{type:"text",class:"text-in",maxlength:"120",placeholder:n.status==="discuss"?"\uD1A0\uB860 \uBA54\uC2DC\uC9C0 \uBCF4\uB0B4\uAE30":"\uC7A1\uB2F4 \uBCF4\uB0B4\uAE30",autocomplete:"off"}),a=f("form",{class:"send-row",novalidate:!0},s,f("button",{type:"submit",class:"btn-sm",text:"\uBCF4\uB0B4\uAE30"}));return a.addEventListener("submit",async function(c){c.preventDefault();let l=s.value.trim();if(!(!l||!C.user))try{await gI("chat",l),C.drafts["chat-text"]="",ee()}catch(d){Q(_e(d))}}),f("div",{class:"field"},f("div",{class:"field-label",text:"\uB300\uD654"}),i,a)}function xI(){return f("div",{class:"panel"},f("div",{class:"field-label",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C \xB7 \uB450\uBAA9 \uC804\uC6A9"}),C.topics.length?f("ul",{class:"topic-list"},C.topics.map(function(n){return f("li",null,f("span",null,f("b",{text:n.name})," \xB7 "+(n.words||[]).length+"\uAC1C"),f("button",{type:"button",class:"btn-sm",onclick:function(){Gp(n)},text:"\uC218\uC815"}))})):f("p",{class:"note",text:"\uC544\uC9C1 \uC5C6\uC5B4\uC694. \uC6B0\uB9AC\uB07C\uB9AC\uB9CC \uC544\uB294 \uB2E8\uC5B4\uB85C \uC8FC\uC81C\uB97C \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694."}),f("button",{type:"button",class:"add-btn",onclick:function(){Gp(null)},text:"\uC8FC\uC81C \uCD94\uAC00"}),f("p",{class:"hint",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C\uB294 \uBC29 \uC124\uC815\uC5D0\uC11C \u2018\uB79C\uB364\u2019\uC77C \uB54C \uB2E4\uB978 \uC8FC\uC81C\uB4E4 \uC0AC\uC774\uC5D0 \uC11E\uC5EC \uB098\uC640\uC694."}))}function DI(){let n=Xe(),e=n?n.nick:"\uC190\uB2D8",t=Ro("textarea","gb-text",{class:"gb-in",maxlength:"300",placeholder:"\uBCF8\uBD80\uC5D0 \uD55C\uB9C8\uB514 \uB0A8\uAE30\uAE30"}),r=f("form",{class:"panel",novalidate:!0},f("div",{class:"field-label",text:e+"(\uC73C)\uB85C \uB0A8\uAE30\uAE30"}),t,f("button",{type:"submit",class:"save",disabled:!C.user,text:"\uB0A8\uAE30\uAE30"}));r.addEventListener("submit",async function(s){s.preventDefault();let a=t.value.trim();if(!a){Q("\uB0B4\uC6A9\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}try{await gi(Ke($,"guestbook"),{uid:So(),memberId:n?n.id:null,nick:e,text:a,createdAt:vt()}),C.drafts["gb-text"]="",ee(),Q("\uBC29\uBA85\uB85D\uC5D0 \uB0A8\uACBC\uC5B4\uC694.")}catch(c){Q(_e(c))}});let i=C.guest.length?f("ul",{class:"gb-list"},C.guest.map(function(s){let a=s.memberId?wt(s.memberId):null,c=ir()||C.user&&s.uid===C.user.uid;return f("li",{class:"gb-item"},f("div",{class:"gb-photo"},Tn(a||{nick:s.nick})),f("div",{class:"gb-body"},f("div",{class:"gb-meta"},f("b",{text:a?a.nick:s.nick||"\uC190\uB2D8"}),a&&a.rank?f("span",{class:"gb-rank",text:a.rank}):null,f("span",{class:"gb-time",text:Gw(s.createdAt)})),f("p",{class:"gb-text",text:s.text}),c?C.gbConfirm===s.id?f("div",{class:"gb-del"},f("span",{text:"\uC9C0\uC6B8\uAE4C\uC694?"}),f("button",{type:"button",class:"link-btn",onclick:function(){C.gbConfirm=null,ee()},text:"\uCDE8\uC18C"}),f("button",{type:"button",class:"link-btn danger",onclick:async function(){try{await mi(Pe($,"guestbook",s.id)),C.gbConfirm=null}catch(l){Q(_e(l))}},text:"\uC9C0\uC6B0\uAE30"})):f("button",{type:"button",class:"link-btn quiet",onclick:function(){C.gbConfirm=s.id,ee()},text:"\uC9C0\uC6B0\uAE30"}):null))})):f("div",{class:"empty",text:C.guestReady?"\uCCAB \uBC29\uBA85\uB85D\uC744 \uB0A8\uACA8 \uC8FC\uC138\uC694.":"\uBC29\uBA85\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return f("section",{class:"screen"},f("div",{class:"sec-head"},f("div",null,f("span",{class:"eyebrow",text:"\uBCF8\uBD80 \uCD9C\uC785 \uAE30\uB85D"}),f("h2",{text:"\uBC29\uBA85\uB85D"}),f("p",{text:"\uC870\uC9C1\uC6D0 \uB204\uAD6C\uB098 \uB0A8\uAE38 \uC218 \uC788\uC5B4\uC694. \uB0B4\uAC00 \uC4F4 \uAE00\uC740 \uB0B4\uAC00 \uC9C0\uC6B8 \uC218 \uC788\uC5B4\uC694."}))),r,i)}function NI(n){return new Promise(function(e,t){let r=URL.createObjectURL(n),i=new Image;i.onload=function(){let a=i.naturalWidth,c=i.naturalHeight,l=Math.min(1,640/Math.max(a,c)),d=document.createElement("canvas");d.width=Math.round(a*l),d.height=Math.round(c*l);let m=d.getContext("2d");m.fillStyle="#1c1d20",m.fillRect(0,0,d.width,d.height),m.drawImage(i,0,0,d.width,d.height),URL.revokeObjectURL(r),e(d.toDataURL("image/jpeg",.8))},i.onerror=function(){URL.revokeObjectURL(r),t(new Error("bad image"))},i.src=r})}var nr=null;function En(){nr&&(nr.remove(),nr=null,document.body.style.overflow="")}function nm(n,e,t){En(),nr=f("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e,onclick:function(r){r.target===nr&&En()}},f("div",{class:"sheet-panel"},f("div",{class:"sheet-head"},f("div",null,f("span",{class:"eyebrow",text:n}),f("h2",{text:e})),f("button",{type:"button",class:"x","aria-label":"\uB2EB\uAE30",onclick:En,text:"\u2715"})),t)),document.body.appendChild(nr),document.body.style.overflow="hidden"}function rm(n){let e=!n,t={photo:n?Hp(n.photo):""},r=f("input",{type:"text",id:"f-nick",maxlength:"20",value:n?n.nick:"",autocomplete:"off"}),i=f("input",{type:"text",id:"f-rank",maxlength:"10",value:n&&n.rank||"",autocomplete:"off",placeholder:"\uBE44\uC6CC\uB450\uBA74 \uC77C\uBC18 \uC870\uC9C1\uC6D0 (\uC608: \uB450\uBAA9, \uBD80\uB450\uBAA9)"}),s=f("input",{type:"text",id:"f-alias",maxlength:"30",value:n&&n.alias||"",autocomplete:"off",placeholder:"\uC608: \uBCFC\uC8FC\uBA38\uB2C8 \uAE08\uACE0"}),a=f("input",{type:"text",id:"f-intro",maxlength:"80",value:n&&n.intro||"",autocomplete:"off",placeholder:"\uBCF8\uC778 \uC9C4\uC220 \uD55C \uC904"}),c=f("textarea",{id:"f-charges",placeholder:`\uD55C \uC904\uC5D0 \uD610\uC758 \uD558\uB098\uC529
\uC608: \uD68C\uC758 \uC911 \uBAB0\uB798 \uAC04\uC2DD \uBA39\uC740 \uD610\uC758`});c.value=n?(n.charges||[]).join(`
`):"";let l=f("div",{class:"thumb"}),d=f("p",{class:"msg",role:"status"}),m=f("button",{type:"button",class:"ghost",onclick:function(){t.photo="",v()},text:"\uC0AC\uC9C4 \uBE7C\uAE30"});function v(){l.replaceChildren(Tn({nick:r.value||"?",photo:t.photo})),m.hidden=!t.photo}let I=f("input",{type:"file",id:"f-photo",accept:"image/*"});I.addEventListener("change",function(){let V=I.files&&I.files[0];V&&(d.className="msg",d.textContent="\uC0AC\uC9C4 \uC815\uB9AC \uC911\u2026",NI(V).then(function(k){t.photo=k,v(),d.textContent="\uC0AC\uC9C4\uC744 \uBD99\uC600\uC5B4\uC694. \uC800\uC7A5\uD558\uBA74 \uBAA8\uB450\uC5D0\uAC8C \uBCF4\uC785\uB2C8\uB2E4."},function(){d.className="msg err",d.textContent="\uC774 \uC0AC\uC9C4\uC740 \uC5F4 \uC218 \uC5C6\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uC9C4(JPG, PNG)\uC744 \uACE8\uB77C\uC8FC\uC138\uC694."}),I.value="")});let R=f("button",{type:"submit",class:"save",text:e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5"}),D=f("form",{class:"form",novalidate:!0},f("div",{class:"photo-edit"},l,f("div",{class:"photo-btns"},f("label",{class:"file-btn"},"\uC0AC\uC9C4 \uACE0\uB974\uAE30",I),m,f("span",{class:"hint",text:"\uC790\uB3D9\uC73C\uB85C \uC791\uAC8C \uC904\uC5EC\uC11C \uC800\uC7A5\uB3FC\uC694."}))),f("label",null,f("b",{text:"\uB2C9\uB124\uC784 (\uD544\uC218)"}),r),f("label",null,f("b",{text:"\uC9C1\uC704"}),i),f("label",null,f("b",{text:"\uBCC4\uBA85"}),s),f("label",null,f("b",{text:"\uD55C \uC904 \uC18C\uAC1C"}),a),f("label",null,f("b",{text:"\uD610\uC758"}),c),d,R);D.addEventListener("submit",async function(V){V.preventDefault();let k=r.value.trim();if(!k){d.className="msg err",d.textContent="\uB2C9\uB124\uC784\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.",r.focus();return}let j={nick:k,rank:i.value.trim(),alias:s.value.trim(),intro:a.value.trim(),charges:c.value.split(`
`).map(function(z){return z.trim()}).filter(Boolean).slice(0,8),photo:t.photo,sample:!1},G=e?"m"+Date.now().toString(36)+Math.random().toString(36).slice(2,6):n.id;j.no=e?C.members.reduce(function(z,te){return Math.max(z,te.no||0)},0)+1:n.no,R.disabled=!0,R.textContent="\uC800\uC7A5 \uC911\u2026";try{await pi(Pe($,"members",G),j),En(),Oe("m-"+G),Q(e?"\uC0C8 \uC218\uBC30\uC11C\uB97C \uB4F1\uB85D\uD588\uC5B4\uC694.":"\uC218\uBC30\uC11C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.")}catch(z){R.disabled=!1,R.textContent=e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5",d.className="msg err",d.textContent=_e(z)}}),r.addEventListener("input",function(){t.photo||v()}),nm(e?"\uC2E0\uADDC \uB4F1\uB85D":Po(n),e?"\uC870\uC9C1\uC6D0 \uB4F1\uB85D":"\uC218\uBC30\uC11C \uC218\uC815",D),v()}function Gp(n){let e=f("input",{type:"text",id:"t-name",maxlength:"16",value:n?n.name:"",autocomplete:"off",placeholder:"\uC608: \uAC8C\uC784 \uC544\uC774\uD15C"}),t=f("textarea",{id:"t-words",placeholder:`\uD55C \uC904\uC5D0 \uD558\uB098\uC529, \uB610\uB294 \uC27C\uD45C\uB85C \uAD6C\uBD84
\uC608: \uBE68\uAC04 \uD3EC\uC158, \uADC0\uD658 \uC8FC\uBB38\uC11C, \uC5D8\uB9AD\uC11C, \uC21C\uAC04\uC774\uB3D9 \uC2A4\uD06C\uB864`});t.value=n?(n.words||[]).join(`
`):"";let r=f("p",{class:"msg",role:"status"}),i=f("button",{type:"submit",class:"save",text:n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00"}),s=f("div");function a(d){i.disabled=!1,i.textContent=n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00",r.className="msg err",r.textContent=d}function c(d){n&&s.replaceChildren(d?f("div",{class:"confirm"},f("p",{text:"\u2018"+n.name+"\u2019 \uC8FC\uC81C\uB97C \uC9C0\uC6B8\uAE4C\uC694?"}),f("div",{class:"op-row"},f("button",{type:"button",onclick:function(){c(!1)},text:"\uCDE8\uC18C"}),f("button",{type:"button",class:"danger",onclick:async function(){try{await mi(Pe($,"liarTopics",n.id)),En(),Q("\uC8FC\uC81C\uB97C \uC9C0\uC6E0\uC5B4\uC694.")}catch(m){a(_e(m))}},text:"\uC9C0\uC6B0\uAE30"}))):f("button",{type:"button",class:"ghost",onclick:function(){c(!0)},text:"\uC774 \uC8FC\uC81C \uC9C0\uC6B0\uAE30"}))}let l=f("form",{class:"form",novalidate:!0},f("label",null,f("b",{text:"\uC8FC\uC81C \uC774\uB984"}),e),f("label",null,f("b",{text:"\uB2E8\uC5B4 (4\uAC1C \uC774\uC0C1)"}),t),r,i,s);l.addEventListener("submit",async function(d){d.preventDefault();let m=e.value.trim(),v={},I=t.value.split(/[\n,]/).map(function(R){return R.trim()}).filter(function(R){return!R||v[R]?!1:(v[R]=!0,!0)}).slice(0,60);if(!m){a("\uC8FC\uC81C \uC774\uB984\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}if(I.length<4){a("\uB2E8\uC5B4\uB97C 4\uAC1C \uC774\uC0C1 \uC801\uC5B4\uC8FC\uC138\uC694. \uC9C0\uAE08 "+I.length+"\uAC1C\uC608\uC694.");return}i.disabled=!0,i.textContent="\uC800\uC7A5 \uC911\u2026";try{n?await pi(Pe($,"liarTopics",n.id),{name:m,words:I,order:n.order||0}):await gi(Ke($,"liarTopics"),{name:m,words:I,order:Date.now()}),En(),Q(n?"\uC8FC\uC81C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.":"\uC8FC\uC81C\uB97C \uCD94\uAC00\uD588\uC5B4\uC694.")}catch(R){a(_e(R))}}),nm("\uB77C\uC774\uC5B4 \xB7 \uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C",n?"\uC8FC\uC81C \uC218\uC815":"\uC8FC\uC81C \uCD94\uAC00",l),c(!1)}document.addEventListener("keydown",function(n){n.key==="Escape"&&En()});var OI=document.getElementById("bf-root"),_i=f("main",{class:"wrap"}),im=f("span",{class:"op-chip",text:"\uB450\uBAA9",hidden:!0}),VI=f("div",{class:"filebar wrap"},f("span",{class:"brand"},Cl("logo-s"),f("span",null,f("b",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"})," \xB7 \uBE44\uBC00\uBCF8\uBD80")),f("span",{class:"fb-right"},im,f("span",{class:"lvl",text:"\uAE30\uBC00 \uB4F1\uAE09 A"}))),MI=[["hq","\uBCF8\uBD80"],["members","\uC870\uC9C1\uC6D0"],["games","\uAC8C\uC784\uBC29"],["guestbook","\uBC29\uBA85\uB85D"]],Eo={},sm=f("nav",{class:"tabbar","aria-label":"\uC8FC \uBA54\uB274"},f("div",{class:"tabbar-in"},MI.map(function(n){let e=f("button",{class:"tab",type:"button",onclick:function(){Oe(n[0])}},Qw(n[0]),f("span",{text:n[1]}));return Eo[n[0]]=e,e})));OI.replaceChildren(VI,_i,sm);var El=null,Tl=!1,Kp=0;function ee(){Tl||(Tl=!0,requestAnimationFrame(function(){Tl=!1,LI()}))}function LI(){let n=document.activeElement,e=n&&n.id&&_i.contains(n)?n.id:null,t=e&&typeof n.selectionStart=="number"?[n.selectionStart,n.selectionEnd]:null,r=_i.querySelector(".log"),i=r?{top:r.scrollTop,pinned:r.scrollHeight-r.scrollTop-r.clientHeight<60}:null,s=Qp(),a="hq",c;C.membersReady?jp()?c=iI():s==="members"?(a="members",c=sI()):s.indexOf("m-")===0?(a="members",c=oI(s.slice(2))):s==="games"?(a="games",c=cI()):s==="game-liar"?(a="games",c=lI()):s.indexOf("room-")===0?(a="games",c=EI(s.slice(5))):s==="guestbook"?(a="guestbook",c=DI()):c=nI():c=f("section",{class:"screen"},f("div",{class:"empty",text:"\uBCF8\uBD80 \uBB38\uC744 \uC5EC\uB294 \uC911\u2026"})),s.indexOf("room-")!==0&&Jp(null),s!==El&&(C.confirmDelete=!1);let l=C.membersReady&&jp();if(sm.hidden=l,_i.replaceChildren(c),Object.keys(Eo).forEach(function(m){m===a&&!l?Eo[m].setAttribute("aria-current","page"):Eo[m].removeAttribute("aria-current")}),im.hidden=!ir(),e){let m=document.getElementById(e);if(m&&(m.focus({preventScroll:!0}),t&&m.setSelectionRange))try{m.setSelectionRange(t[0],t[1])}catch{}}let d=_i.querySelector(".log");if(d){let m=C.msgs.length!==Kp;!i||i.pinned||m?d.scrollTop=d.scrollHeight:d.scrollTop=i.top}Kp=C.msgs.length,s!==El&&window.scrollTo(0,0),El=s}window.addEventListener("hashchange",ee);Xw();ee();
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
