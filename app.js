var Gh=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},cg=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Kh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,f=l?n[i+2]:0,p=s>>2,y=(s&3)<<4|c>>4,v=(c&15)<<2|f>>6,S=f&63;l||(S=64,a||(v=64)),r.push(t[p],t[y],t[v],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Gh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):cg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let f=i<n.length?t[n.charAt(i)]:64;++i;let y=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||f==null||y==null)throw new da;let v=s<<2|c>>4;if(r.push(v),f!==64){let S=c<<4&240|f>>2;if(r.push(S),y!==64){let k=f<<6&192|y;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},da=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},ug=function(n){let e=Gh(n);return Kh.encodeByteArray(e,!0)},Rr=function(n){return ug(n).replace(/\./g,"")},pa=function(n){try{return Kh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function lg(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var hg=()=>lg().__FIREBASE_DEFAULTS__,dg=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fg=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&pa(n[1]);return e&&JSON.parse(e)},Gi=()=>{try{return hg()||dg()||fg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ma=n=>{var e,t;return(t=(e=Gi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Wh=n=>{let e=ma(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ga=()=>{var n;return(n=Gi())===null||n===void 0?void 0:n.config},ya=n=>{var e;return(e=Gi())===null||e===void 0?void 0:e[`_${n}`]};var zi=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Hh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Rr(JSON.stringify(t)),Rr(JSON.stringify(a)),""].join(".")}function me(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qh(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function pg(){var n;let e=(n=Gi())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Yh(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Jh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $h(){let n=me();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Xh(){return!pg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function _a(){try{return typeof indexedDB=="object"}catch{return!1}}function Zh(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var mg="FirebaseError",Be=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=mg,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,yt.prototype.create)}},yt=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?gg(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Be(i,c,r)}};function gg(n,e){return n.replace(yg,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var yg=/\{\$([^}]+)}/g;function ed(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function _t(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(zh(s)&&zh(a)){if(!_t(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function zh(n){return n!==null&&typeof n=="object"}function xn(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Dn(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Nn(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function td(n,e){let t=new fa(n,e);return t.subscribe.bind(t)}var fa=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");_g(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ha),i.error===void 0&&(i.error=ha),i.complete===void 0&&(i.complete=ha);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function _g(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ha(){}var _E=4*60*60*1e3;function ae(n){return n&&n._delegate?n._delegate:n}var We=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var sn="[DEFAULT]";var va=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new zi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wg(e))try{this.getOrInitializeService({instanceIdentifier:sn})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=sn){return this.instances.has(e)}getOptions(e=sn){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:vg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=sn){return this.component?this.component.multipleInstances?e:sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function vg(n){return n===sn?void 0:n}function wg(n){return n.instantiationMode==="EAGER"}var Ki=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new va(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Ig=[],H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));var Eg={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},Tg=H.INFO,bg={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},Ag=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=bg[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Ct=class{constructor(e){this.name=e,this._logLevel=Tg,this._logHandler=Ag,this._userLogHandler=null,Ig.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Eg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}};var Sg=(n,e)=>e.some(t=>n instanceof t),nd,rd;function Rg(){return nd||(nd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pg(){return rd||(rd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var id=new WeakMap,Ia=new WeakMap,sd=new WeakMap,wa=new WeakMap,Ta=new WeakMap;function Cg(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(it(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&id.set(t,n)}).catch(()=>{}),Ta.set(e,n),e}function kg(n){if(Ia.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});Ia.set(n,e)}var Ea={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ia.get(n);if(e==="objectStoreNames")return n.objectStoreNames||sd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return it(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function od(n){Ea=n(Ea)}function xg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Wi(this),e,...t);return sd.set(r,e.sort?e.sort():[e]),it(r)}:Pg().includes(n)?function(...e){return n.apply(Wi(this),e),it(id.get(this))}:function(...e){return it(n.apply(Wi(this),e))}}function Dg(n){return typeof n=="function"?xg(n):(n instanceof IDBTransaction&&kg(n),Sg(n,Rg())?new Proxy(n,Ea):n)}function it(n){if(n instanceof IDBRequest)return Cg(n);if(wa.has(n))return wa.get(n);let e=Dg(n);return e!==n&&(wa.set(n,e),Ta.set(e,n)),e}var Wi=n=>Ta.get(n);function cd(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),c=it(a);return r&&a.addEventListener("upgradeneeded",l=>{r(it(a.result),l.oldVersion,l.newVersion,it(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}var Ng=["get","getKey","getAll","getAllKeys","count"],Og=["put","add","delete","clear"],ba=new Map;function ad(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ba.get(e))return ba.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Og.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Ng.includes(t)))return;let s=async function(a,...c){let l=this.transaction(a,i?"readwrite":"readonly"),f=l.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[t](...c),i&&l.done]))[0]};return ba.set(e,s),s}od(n=>({...n,get:(e,t,r)=>ad(e,t)||n.get(e,t,r),has:(e,t)=>!!ad(e,t)||n.has(e,t)}));var Sa=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Vg(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Vg(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var Ra="@firebase/app",ud="0.10.5";var on=new Ct("@firebase/app"),Mg="@firebase/app-compat",Lg="@firebase/analytics-compat",Fg="@firebase/analytics",Ug="@firebase/app-check-compat",Bg="@firebase/app-check",qg="@firebase/auth",jg="@firebase/auth-compat",zg="@firebase/database",Gg="@firebase/database-compat",Kg="@firebase/functions",Wg="@firebase/functions-compat",Hg="@firebase/installations",Qg="@firebase/installations-compat",Yg="@firebase/messaging",Jg="@firebase/messaging-compat",$g="@firebase/performance",Xg="@firebase/performance-compat",Zg="@firebase/remote-config",ey="@firebase/remote-config-compat",ty="@firebase/storage",ny="@firebase/storage-compat",ry="@firebase/firestore",iy="@firebase/vertexai-preview",sy="@firebase/firestore-compat",oy="firebase",ay="10.12.2";var Pa="[DEFAULT]",cy={[Ra]:"fire-core",[Mg]:"fire-core-compat",[Fg]:"fire-analytics",[Lg]:"fire-analytics-compat",[Bg]:"fire-app-check",[Ug]:"fire-app-check-compat",[qg]:"fire-auth",[jg]:"fire-auth-compat",[zg]:"fire-rtdb",[Gg]:"fire-rtdb-compat",[Kg]:"fire-fn",[Wg]:"fire-fn-compat",[Hg]:"fire-iid",[Qg]:"fire-iid-compat",[Yg]:"fire-fcm",[Jg]:"fire-fcm-compat",[$g]:"fire-perf",[Xg]:"fire-perf-compat",[Zg]:"fire-rc",[ey]:"fire-rc-compat",[ty]:"fire-gcs",[ny]:"fire-gcs-compat",[ry]:"fire-fst",[sy]:"fire-fst-compat",[iy]:"fire-vertex","fire-js":"fire-js",[oy]:"fire-js-all"};var Hi=new Map,uy=new Map,Ca=new Map;function ld(n,e){try{n.container.addComponent(e)}catch(t){on.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function xt(n){let e=n.name;if(Ca.has(e))return on.debug(`There were multiple attempts to register component ${e}.`),!1;Ca.set(e,n);for(let t of Hi.values())ld(t,n);for(let t of uy.values())ld(t,n);return!0}function Cr(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Xe(n){return n.settings!==void 0}var ly={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},kt=new yt("app","Firebase",ly);var ka=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new We("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw kt.create("app-deleted",{appName:this._name})}};var Dt=ay;function Na(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Pa,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw kt.create("bad-app-name",{appName:String(i)});if(t||(t=ga()),!t)throw kt.create("no-options");let s=Hi.get(i);if(s){if(_t(t,s.options)&&_t(r,s.config))return s;throw kt.create("duplicate-app",{appName:i})}let a=new Ki(i);for(let l of Ca.values())a.addComponent(l);let c=new ka(t,r,a);return Hi.set(i,c),c}function Qi(n=Pa){let e=Hi.get(n);if(!e&&n===Pa&&ga())return Na();if(!e)throw kt.create("no-app",{appName:n});return e}function $e(n,e,t){var r;let i=(r=cy[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),on.warn(c.join(" "));return}xt(new We(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var hy="firebase-heartbeat-database",dy=1,Pr="firebase-heartbeat-store",Aa=null;function pd(){return Aa||(Aa=cd(hy,dy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Pr)}catch(t){console.warn(t)}}}}).catch(n=>{throw kt.create("idb-open",{originalErrorMessage:n.message})})),Aa}async function fy(n){try{let t=(await pd()).transaction(Pr),r=await t.objectStore(Pr).get(md(n));return await t.done,r}catch(e){if(e instanceof Be)on.warn(e.message);else{let t=kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});on.warn(t.message)}}}async function hd(n,e){try{let r=(await pd()).transaction(Pr,"readwrite");await r.objectStore(Pr).put(e,md(n)),await r.done}catch(t){if(t instanceof Be)on.warn(t.message);else{let r=kt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});on.warn(r.message)}}}function md(n){return`${n.name}!${n.options.appId}`}var py=1024,my=30*24*60*60*1e3,xa=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Da(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=dd();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{let c=new Date(a.date).valueOf();return Date.now()-c<=my}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=dd(),{heartbeatsToSend:r,unsentEntries:i}=gy(this._heartbeatsCache.heartbeats),s=Rr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function dd(){return new Date().toISOString().substring(0,10)}function gy(n,e=py){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),fd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),fd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Da=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _a()?Zh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await fy(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return hd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return hd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function fd(n){return Rr(JSON.stringify({version:2,heartbeats:n})).length}function yy(n){xt(new We("platform-logger",e=>new Sa(e),"PRIVATE")),xt(new We("heartbeat",e=>new xa(e),"PRIVATE")),$e(Ra,ud,n),$e(Ra,ud,"esm2017"),$e("fire-js","")}yy("");var _y="firebase",vy="10.12.2";$e(_y,vy,"app");function Yi(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Nd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Od=Nd,Vd=new yt("auth","Firebase",Nd());var ts=new Ct("@firebase/auth");function wy(n,...e){ts.logLevel<=H.WARN&&ts.warn(`Auth (${Dt}): ${n}`,...e)}function $i(n,...e){ts.logLevel<=H.ERROR&&ts.error(`Auth (${Dt}): ${n}`,...e)}function He(n,...e){throw ec(n,...e)}function Ze(n,...e){return ec(n,...e)}function Za(n,e,t){let r=Object.assign(Object.assign({},Od()),{[e]:t});return new yt("auth","Firebase",r).create(e,{appName:n.name})}function Ot(n){return Za(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Iy(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&He(n,"argument-error"),Za(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ec(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Vd.create(n,...e)}function L(n,e,...t){if(!n)throw ec(e,...t)}function st(n){let e="INTERNAL ASSERTION FAILED: "+n;throw $i(e),new Error(e)}function wt(n,e){n||st(e)}function Ma(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Ey(){return gd()==="http:"||gd()==="https:"}function gd(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Ty(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ey()||Yh()||"connection"in navigator)?navigator.onLine:!0}function by(){if(typeof navigator=="undefined")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var an=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,wt(t>e,"Short delay should be less than long delay!"),this.isMobile=Qh()||Jh()}get(){return Ty()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function tc(n,e){wt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var ns=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;st("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;st("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;st("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Ay={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Sy=new an(3e4,6e4);function ge(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ce(n,e,t,r,i={}){return Md(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let c=xn(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode),ns.fetch()(Ld(n,n.config.apiHost,t,c),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},s))})}async function Md(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Ay),e);try{let i=new La(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw kr(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let c=s.ok?a.errorMessage:a.error.message,[l,f]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw kr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw kr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw kr(n,"user-disabled",a);let p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Za(n,p,f);He(n,p)}}catch(i){if(i instanceof Be)throw i;He(n,"network-request-failed",{message:String(i)})}}async function Mt(n,e,t,r,i={}){let s=await Ce(n,e,t,r,i);return"mfaPendingCredential"in s&&He(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Ld(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?tc(n.config,i):`${n.config.apiScheme}://${i}`}function Ry(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var La=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ze(this.auth,"network-request-failed")),Sy.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function kr(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Ze(n,e,r);return i.customData._tokenResponse=t,i}function yd(n){return n!==void 0&&n.enterprise!==void 0}var Fa=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Ry(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Py(n,e){return Ce(n,"GET","/v2/recaptchaConfig",ge(n,e))}async function Cy(n,e){return Ce(n,"POST","/v1/accounts:delete",e)}async function Fd(n,e){return Ce(n,"POST","/v1/accounts:lookup",e)}function xr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ud(n,e=!1){let t=ae(n),r=await t.getIdToken(e),i=nc(r);L(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:xr(Oa(i.auth_time)),issuedAtTime:xr(Oa(i.iat)),expirationTime:xr(Oa(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Oa(n){return Number(n)*1e3}function nc(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return $i("JWT malformed, contained fewer than 3 sections"),null;try{let i=pa(t);return i?JSON.parse(i):($i("Failed to decode base64 JWT payload"),null)}catch(i){return $i("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function _d(n){let e=nc(n);return L(e,"internal-error"),L(typeof e.exp!="undefined","internal-error"),L(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function Nr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Be&&ky(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ky({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Ua=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Or=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=xr(this.lastLoginAt),this.creationTime=xr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function rs(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Nr(n,Fd(t,{idToken:r}));L(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?qd(s.providerUserInfo):[],c=xy(n.providerData,a),l=n.isAnonymous,f=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),p=l?f:!1,y={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Or(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function Bd(n){let e=ae(n);await rs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function xy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function qd(n){return n.map(e=>{var{providerId:t}=e,r=Yi(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function Dy(n,e){let t=await Md(n,{},async()=>{let r=xn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=Ld(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",ns.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ny(n,e){return Ce(n,"POST","/v2/accounts:revokeToken",ge(n,e))}var Dr=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken!="undefined","internal-error"),L(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):_d(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");let t=_d(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Dy(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(L(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(L(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(L(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return st("not implemented")}};function Nt(n,e){L(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}var Vn=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Yi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ua(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Or(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Nr(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ud(this,e)}reload(){return Bd(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await rs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Xe(this.auth.app))return Promise.reject(Ot(this.auth));let e=await this.getIdToken();return await Nr(this,Cy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,l,f,p;let y=(r=t.displayName)!==null&&r!==void 0?r:void 0,v=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(c=t.tenantId)!==null&&c!==void 0?c:void 0,x=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,G=(f=t.createdAt)!==null&&f!==void 0?f:void 0,q=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:B,emailVerified:te,isAnonymous:ve,providerData:$,stsTokenManager:E}=t;L(B&&E,e,"internal-error");let g=Dr.fromJSON(this.name,E);L(typeof B=="string",e,"internal-error"),Nt(y,e.name),Nt(v,e.name),L(typeof te=="boolean",e,"internal-error"),L(typeof ve=="boolean",e,"internal-error"),Nt(S,e.name),Nt(k,e.name),Nt(V,e.name),Nt(x,e.name),Nt(G,e.name),Nt(q,e.name);let w=new n({uid:B,auth:e,email:v,emailVerified:te,displayName:y,isAnonymous:ve,photoURL:k,phoneNumber:S,tenantId:V,stsTokenManager:g,createdAt:G,lastLoginAt:q});return $&&Array.isArray($)&&(w.providerData=$.map(I=>Object.assign({},I))),x&&(w._redirectEventId=x),w}static async _fromIdTokenResponse(e,t,r=!1){let i=new Dr;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await rs(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];L(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?qd(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Dr;c.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Or(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,f),l}};var vd=new Map;function vt(n){wt(n instanceof Function,"Expected a class definition");let e=vd.get(n);return e?(wt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,vd.set(n,e),e)}var is=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};is.type="NONE";var Ba=is;function Xi(n,e,t){return`firebase:${n}:${e}:${t}`}var ss=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=Xi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Xi("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Vn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(vt(Ba),e,r);let i=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f),s=i[0]||vt(Ba),a=Xi(r,e.config.apiKey,e.name),c=null;for(let f of t)try{let p=await f._get(a);if(p){let y=Vn._fromJSON(e,p);f!==s&&(c=y),s=f;break}}catch{}let l=i.filter(f=>f._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new n(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async f=>{if(f!==s)try{await f._remove(a)}catch{}})),new n(s,e,r))}};function wd(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(jd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Wd(e))return"Blackberry";if(Hd(e))return"Webos";if(rc(e))return"Safari";if((e.includes("chrome/")||zd(e))&&!e.includes("edge/"))return"Chrome";if(Kd(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function jd(n=me()){return/firefox\//i.test(n)}function rc(n=me()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zd(n=me()){return/crios\//i.test(n)}function Gd(n=me()){return/iemobile/i.test(n)}function Kd(n=me()){return/android/i.test(n)}function Wd(n=me()){return/blackberry/i.test(n)}function Hd(n=me()){return/webos/i.test(n)}function Ts(n=me()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Oy(n=me()){var e;return Ts(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Vy(){return $h()&&document.documentMode===10}function Qd(n=me()){return Ts(n)||Kd(n)||Hd(n)||Wd(n)||/windows phone/i.test(n)||Gd(n)}function My(){try{return!!(window&&window!==window.top)}catch{return!1}}function Yd(n,e=[]){let t;switch(n){case"Browser":t=wd(me());break;case"Worker":t=`${wd(me())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Dt}/${r}`}var qa=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,c)=>{try{let l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function Ly(n,e={}){return Ce(n,"GET","/v2/passwordPolicy",ge(n,e))}var Fy=6,ja=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Fy,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;let l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var za=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new os(this),this.idTokenSubscription=new os(this),this.beforeStateQueue=new qa(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=vt(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await ss.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Fd(this,{idToken:e}),r=await Vn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Xe(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await rs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=by()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Xe(this.app))return Promise.reject(Ot(this));let t=e?ae(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Xe(this.app)?Promise.reject(Ot(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Xe(this.app)?Promise.reject(Ot(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(vt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Ly(this),t=new ja(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new yt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ny(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&vt(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await ss.create(this,[vt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{let l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Yd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&wy(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function Lt(n){return ae(n)}var os=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=td(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var bs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Uy(n){bs=n}function Jd(n){return bs.loadJS(n)}function By(){return bs.recaptchaEnterpriseScript}function qy(){return bs.gapiScript}function $d(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var jy="recaptcha-enterprise",zy="NO_RECAPTCHA",Ga=class{constructor(e){this.type=jy,this.auth=Lt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{Py(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let f=new Fa(l);return s.tenantId==null?s._agentRecaptchaConfig=f:s._tenantRecaptchaConfigs[s.tenantId]=f,a(f.siteKey)}}).catch(l=>{c(l)})})}function i(s,a,c){let l=window.grecaptcha;yd(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(f=>{a(f)}).catch(()=>{a(zy)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&yd(window.grecaptcha))i(c,s,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=By();l.length!==0&&(l+=c),Jd(l).then(()=>{i(c,s,a)}).catch(f=>{a(f)})}}).catch(c=>{a(c)})})}};async function Id(n,e,t,r=!1){let i=new Ga(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let a=Object.assign({},e);return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ed(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await Id(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await Id(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(s)})}function Xd(n,e){let t=Cr(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(_t(s,e!=null?e:{}))return i;He(i,"already-initialized")}return t.initialize({options:e})}function Gy(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(vt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function As(n,e,t){let r=Lt(n);L(r._canInitEmulator,r,"emulator-config-failed"),L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=Zd(e),{host:a,port:c}=Ky(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${a}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Wy()}function Zd(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Ky(n){let e=Zd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Td(r.substr(s.length+1))}}else{let[s,a]=r.split(":");return{host:s,port:Td(a)}}}function Td(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Wy(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var cn=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return st("not implemented")}_getIdTokenResponse(e){return st("not implemented")}_linkToIdToken(e,t){return st("not implemented")}_getReauthenticationResolver(e){return st("not implemented")}};async function Hy(n,e){return Ce(n,"POST","/v1/accounts:signUp",e)}async function Qy(n,e){return Mt(n,"POST","/v1/accounts:signInWithPassword",ge(n,e))}async function Yy(n,e){return Mt(n,"POST","/v1/accounts:signInWithEmailLink",ge(n,e))}async function Jy(n,e){return Mt(n,"POST","/v1/accounts:signInWithEmailLink",ge(n,e))}var Vr=class n extends cn{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ed(e,t,"signInWithPassword",Qy);case"emailLink":return Yy(e,{email:this._email,oobCode:this._password});default:He(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ed(e,r,"signUpPassword",Hy);case"emailLink":return Jy(e,{idToken:t,email:this._email,oobCode:this._password});default:He(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function On(n,e){return Mt(n,"POST","/v1/accounts:signInWithIdp",ge(n,e))}var $y="http://localhost",un=class n extends cn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):He("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Yi(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return On(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,On(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,On(e,t)}buildRequest(){let e={requestUri:$y,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=xn(t)}return e}};async function Xy(n,e){return Ce(n,"POST","/v1/accounts:sendVerificationCode",ge(n,e))}async function Zy(n,e){return Mt(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,e))}async function e_(n,e){let t=await Mt(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,e));if(t.temporaryProof)throw kr(n,"account-exists-with-different-credential",t);return t}var t_={USER_NOT_FOUND:"user-not-found"};async function n_(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Mt(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,t),t_)}var Mr=class n extends cn{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Zy(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return e_(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return n_(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function r_(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function i_(n){let e=Dn(Nn(n)).link,t=e?Dn(Nn(e)).deep_link_id:null,r=Dn(Nn(n)).deep_link_id;return(r?Dn(Nn(r)).link:null)||r||t||e||n}var as=class n{constructor(e){var t,r,i,s,a,c;let l=Dn(Nn(e)),f=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,y=r_((i=l.mode)!==null&&i!==void 0?i:null);L(f&&p&&y,"argument-error"),this.apiKey=f,this.operation=y,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=i_(e);try{return new n(t)}catch{return null}}};var Mn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Vr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=as.parseLink(t);return L(r,"argument-error"),Vr._fromEmailAndCode(e,r.code,r.tenantId)}};Mn.PROVIDER_ID="password";Mn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Mn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Lr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var ln=class extends Lr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Fr=class n extends ln{constructor(){super("facebook.com")}static credential(e){return un._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Fr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Fr.PROVIDER_ID="facebook.com";var Vt=class n extends ln{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return un._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Vt.GOOGLE_SIGN_IN_METHOD="google.com";Vt.PROVIDER_ID="google.com";var Ur=class n extends ln{constructor(){super("github.com")}static credential(e){return un._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Ur.GITHUB_SIGN_IN_METHOD="github.com";Ur.PROVIDER_ID="github.com";var Br=class n extends ln{constructor(){super("twitter.com")}static credential(e,t){return un._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Br.TWITTER_SIGN_IN_METHOD="twitter.com";Br.PROVIDER_ID="twitter.com";async function s_(n,e){return Mt(n,"POST","/v1/accounts:signUp",ge(n,e))}var hn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Vn._fromIdTokenResponse(e,r,i),a=bd(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=bd(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function bd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}async function ic(n){var e;if(Xe(n.app))return Promise.reject(Ot(n));let t=Lt(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new hn({user:t.currentUser,providerId:null,operationType:"signIn"});let r=await s_(t,{returnSecureToken:!0}),i=await hn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}var Ka=class n extends Be{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function ef(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ka._fromErrorAndOperation(n,s,e,r):s})}async function o_(n,e,t=!1){let r=await Nr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return hn._forOperation(n,"link",r)}async function a_(n,e,t=!1){let{auth:r}=n;if(Xe(r.app))return Promise.reject(Ot(r));let i="reauthenticate";try{let s=await Nr(n,ef(r,i,e,n),t);L(s.idToken,r,"internal-error");let a=nc(s.idToken);L(a,r,"internal-error");let{sub:c}=a;return L(n.uid===c,r,"user-mismatch"),hn._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&He(r,"user-mismatch"),s}}async function tf(n,e,t=!1){if(Xe(n.app))return Promise.reject(Ot(n));let r="signIn",i=await ef(n,r,e),s=await hn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function sc(n,e){return tf(Lt(n),e)}function nf(n,e,t,r){return ae(n).onIdTokenChanged(e,t,r)}function rf(n,e,t){return ae(n).beforeAuthStateChanged(e,t)}function oc(n,e,t,r){return ae(n).onAuthStateChanged(e,t,r)}function ac(n){return ae(n).signOut()}function c_(n,e){return Ce(n,"POST","/v2/accounts/mfaEnrollment:start",ge(n,e))}function u_(n,e){return Ce(n,"POST","/v2/accounts/mfaEnrollment:finalize",ge(n,e))}function l_(n,e){return Ce(n,"POST","/v2/accounts/mfaEnrollment:start",ge(n,e))}function h_(n,e){return Ce(n,"POST","/v2/accounts/mfaEnrollment:finalize",ge(n,e))}var cs="__sak";var us=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(cs,"1"),this.storage.removeItem(cs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function d_(){let n=me();return rc(n)||Ts(n)}var f_=1e3,p_=10,ls=class extends us{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=d_()&&My(),this.fallbackToPolling=Qd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let a=this.storage.getItem(r);if(e.newValue!==a)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Vy()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,p_):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},f_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ls.type="LOCAL";var sf=ls;var hs=class extends us{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};hs.type="SESSION";var cc=hs;function m_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var ds=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(a).map(async f=>f(t.origin,s)),l=await m_(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};ds.receivers=[];function uc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Wa=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{let f=uc("",20);i.port1.start();let p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(y){let v=y;if(v.data.eventId===f)switch(v.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(v.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function ot(){return window}function g_(n){ot().location.href=n}function of(){return typeof ot().WorkerGlobalScope!="undefined"&&typeof ot().importScripts=="function"}async function y_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function __(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function v_(){return of()?self:null}var af="firebaseLocalStorageDb",w_=1,fs="firebaseLocalStorage",cf="fbase_key",dn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Ss(n,e){return n.transaction([fs],e?"readwrite":"readonly").objectStore(fs)}function I_(){let n=indexedDB.deleteDatabase(af);return new dn(n).toPromise()}function Ha(){let n=indexedDB.open(af,w_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(fs,{keyPath:cf})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(fs)?e(r):(r.close(),await I_(),e(await Ha()))})})}async function Ad(n,e,t){let r=Ss(n,!0).put({[cf]:e,value:t});return new dn(r).toPromise()}async function E_(n,e){let t=Ss(n,!1).get(e),r=await new dn(t).toPromise();return r===void 0?null:r.value}function Sd(n,e){let t=Ss(n,!0).delete(e);return new dn(t).toPromise()}var T_=800,b_=3,ps=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ha(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>b_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return of()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ds._getInstance(v_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await y_(),!this.activeServiceWorker)return;this.sender=new Wa(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||__()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Ha();return await Ad(e,cs,"1"),await Sd(e,cs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ad(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>E_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Sd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Ss(i,!1).getAll();return new dn(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),T_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};ps.type="LOCAL";var uf=ps;function A_(n,e){return Ce(n,"POST","/v2/accounts/mfaSignIn:start",ge(n,e))}function S_(n,e){return Ce(n,"POST","/v2/accounts/mfaSignIn:finalize",ge(n,e))}function R_(n,e){return Ce(n,"POST","/v2/accounts/mfaSignIn:finalize",ge(n,e))}var KE=$d("rcb"),WE=new an(3e4,6e4);var P_="recaptcha";async function C_(n,e,t){var r;let i=await t.verify();try{L(typeof i=="string",n,"argument-error"),L(t.type===P_,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let a=s.session;if("phoneNumber"in s)return L(a.type==="enroll",n,"internal-error"),(await c_(n,{idToken:a.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{L(a.type==="signin",n,"internal-error");let c=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return L(c,n,"missing-multi-factor-info"),(await A_(n,{mfaPendingCredential:a.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:a}=await Xy(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return a}}finally{t._reset()}}var qr=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Lt(e)}verifyPhoneNumber(e,t){return C_(this.auth,e,ae(t))}static credential(e,t){return Mr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Mr._fromTokenResponse(t,r):null}};qr.PROVIDER_ID="phone";qr.PHONE_SIGN_IN_METHOD="phone";function lf(n,e){return e?vt(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var jr=class extends cn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return On(e,this._buildIdpRequest())}_linkToIdToken(e,t){return On(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return On(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function k_(n){return tf(n.auth,new jr(n),n.bypassAuthState)}function x_(n){let{auth:e,user:t}=n;return L(t,e,"internal-error"),a_(t,new jr(n),n.bypassAuthState)}async function D_(n){let{auth:e,user:t}=n;return L(t,e,"internal-error"),o_(t,new jr(n),n.bypassAuthState)}var ms=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return k_;case"linkViaPopup":case"linkViaRedirect":return D_;case"reauthViaPopup":case"reauthViaRedirect":return x_;default:He(this.auth,"internal-error")}}resolve(e){wt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){wt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var N_=new an(2e3,1e4);async function lc(n,e,t){if(Xe(n.app))return Promise.reject(Ze(n,"operation-not-supported-in-this-environment"));let r=Lt(n);Iy(n,e,Lr);let i=lf(r,t);return new gs(r,"signInViaPopup",e,i).executeNotNull()}var gs=class n extends ms{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){wt(this.filter.length===1,"Popup operations only handle one event");let e=uc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,N_.get())};e()}};gs.currentPopupAction=null;var O_="pendingRedirect",Zi=new Map,Qa=class extends ms{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Zi.get(this.auth._key());if(!e){try{let r=await V_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Zi.set(this.auth._key(),e)}return this.bypassAuthState||Zi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function V_(n,e){let t=F_(e),r=L_(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function M_(n,e){Zi.set(n._key(),e)}function L_(n){return vt(n._redirectPersistence)}function F_(n){return Xi(O_,n.config.apiKey,n.name)}async function U_(n,e,t=!1){if(Xe(n.app))return Promise.reject(Ot(n));let r=Lt(n),i=lf(r,e),a=await new Qa(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var B_=10*60*1e3,Ya=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!q_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!hf(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ze(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=B_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rd(e))}saveEventToCache(e){this.cachedEventUids.add(Rd(e)),this.lastProcessedEventTime=Date.now()}};function Rd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function hf({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function q_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hf(n);default:return!1}}async function j_(n,e={}){return Ce(n,"GET","/v1/projects",e)}var z_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,G_=/^https?/;async function K_(n){if(n.config.emulator)return;let{authorizedDomains:e}=await j_(n);for(let t of e)try{if(W_(t))return}catch{}He(n,"unauthorized-domain")}function W_(n){let e=Ma(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!G_.test(t))return!1;if(z_.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var H_=new an(3e4,6e4);function Pd(){let n=ot().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Q_(n){return new Promise((e,t)=>{var r,i,s;function a(){Pd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Pd(),t(Ze(n,"network-request-failed"))},timeout:H_.get()})}if(!((i=(r=ot().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=ot().gapi)===null||s===void 0)&&s.load)a();else{let c=$d("iframefcb");return ot()[c]=()=>{gapi.load?a():t(Ze(n,"network-request-failed"))},Jd(`${qy()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw es=null,e})}var es=null;function Y_(n){return es=es||Q_(n),es}var J_=new an(5e3,15e3),$_="__/auth/iframe",X_="emulator/auth/iframe",Z_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ev=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function tv(n){let e=n.config;L(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?tc(e,X_):`https://${n.config.authDomain}/${$_}`,r={apiKey:e.apiKey,appName:n.name,v:Dt},i=ev.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${xn(r).slice(1)}`}async function nv(n){let e=await Y_(n),t=ot().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:tv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Z_,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=Ze(n,"network-request-failed"),c=ot().setTimeout(()=>{s(a)},J_.get());function l(){ot().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}var rv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},iv=500,sv=600,ov="_blank",av="http://localhost",ys=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function cv(n,e,t,r=iv,i=sv){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",l=Object.assign(Object.assign({},rv),{width:r.toString(),height:i.toString(),top:s,left:a}),f=me().toLowerCase();t&&(c=zd(f)?ov:t),jd(f)&&(e=e||av,l.scrollbars="yes");let p=Object.entries(l).reduce((v,[S,k])=>`${v}${S}=${k},`,"");if(Oy(f)&&c!=="_self")return uv(e||"",c),new ys(null);let y=window.open(e||"",c,p);L(y,n,"popup-blocked");try{y.focus()}catch{}return new ys(y)}function uv(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var lv="__/auth/handler",hv="emulator/auth/handler",dv=encodeURIComponent("fac");async function Cd(n,e,t,r,i,s){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Dt,eventId:i};if(e instanceof Lr){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",ed(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[p,y]of Object.entries(s||{}))a[p]=y}if(e instanceof ln){let p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);let c=a;for(let p of Object.keys(c))c[p]===void 0&&delete c[p];let l=await n._getAppCheckToken(),f=l?`#${dv}=${encodeURIComponent(l)}`:"";return`${fv(n)}?${xn(c).slice(1)}${f}`}function fv({config:n}){return n.emulator?tc(n,hv):`https://${n.authDomain}/${lv}`}var Va="webStorageSupport",Ja=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cc,this._completeRedirectFn=U_,this._overrideRedirectResult=M_}async _openPopup(e,t,r,i){var s;wt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await Cd(e,t,r,Ma(),i);return cv(e,a,uc())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await Cd(e,t,r,Ma(),i);return g_(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(wt(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await nv(e),r=new Ya(e);return t.register("authEvent",i=>(L(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Va,{type:Va},i=>{var s;let a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Va];a!==void 0&&t(!!a),He(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=K_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Qd()||rc()||Ts()}},df=Ja,_s=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return st("unexpected MultiFactorSessionType")}}},$a=class n extends _s{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return u_(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return S_(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},vs=class{constructor(){}static assertion(e){return $a._fromCredential(e)}};vs.FACTOR_ID="phone";var ws=class{static assertionForEnrollment(e,t){return Is._fromSecret(e,t)}static assertionForSignIn(e,t){return Is._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;L(typeof((t=r.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await l_(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Es._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};ws.FACTOR_ID="totp";var Is=class n extends _s{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return L(typeof this.secret!="undefined",e,"argument-error"),h_(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){L(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return R_(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Es=class n{constructor(e,t,r,i,s,a,c){this.sessionInfo=a,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Ji(e)||Ji(t))&&(i=!0),i&&(Ji(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Ji(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Ji(n){return typeof n=="undefined"||(n==null?void 0:n.length)===0}var kd="@firebase/auth",xd="1.7.4";var Xa=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function pv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function mv(n){xt(new We("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;L(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yd(n)},f=new za(r,i,s,l);return Gy(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),xt(new We("auth-internal",e=>{let t=Lt(e.getProvider("auth").getImmediate());return(r=>new Xa(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),$e(kd,xd,pv(n)),$e(kd,xd,"esm2017")}var gv=5*60,yv=ya("authIdTokenMaxAge")||gv,Dd=null,_v=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>yv)return;let i=t==null?void 0:t.token;Dd!==i&&(Dd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function hc(n=Qi()){let e=Cr(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Xd(n,{popupRedirectResolver:df,persistence:[uf,sf,cc]}),r=ya("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let a=_v(s.toString());rf(t,a,()=>a(t.currentUser)),nf(t,c=>a(c))}}let i=ma("auth");return i&&As(t,`http://${i}`),t}function vv(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Uy({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Ze("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",vv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});mv("Browser");var ff=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},pf={};var Ft,dc;(function(){var n;function e(E,g){function w(){}w.prototype=g.prototype,E.D=g.prototype,E.prototype=new w,E.prototype.constructor=E,E.C=function(I,T,A){for(var _=Array(arguments.length-2),pt=2;pt<arguments.length;pt++)_[pt-2]=arguments[pt];return g.prototype[T].apply(I,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,g,w){w||(w=0);var I=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)I[T]=g.charCodeAt(w++)|g.charCodeAt(w++)<<8|g.charCodeAt(w++)<<16|g.charCodeAt(w++)<<24;else for(T=0;16>T;++T)I[T]=g[w++]|g[w++]<<8|g[w++]<<16|g[w++]<<24;g=E.g[0],w=E.g[1],T=E.g[2];var A=E.g[3],_=g+(A^w&(T^A))+I[0]+3614090360&4294967295;g=w+(_<<7&4294967295|_>>>25),_=A+(T^g&(w^T))+I[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(w^A&(g^w))+I[2]+606105819&4294967295,T=A+(_<<17&4294967295|_>>>15),_=w+(g^T&(A^g))+I[3]+3250441966&4294967295,w=T+(_<<22&4294967295|_>>>10),_=g+(A^w&(T^A))+I[4]+4118548399&4294967295,g=w+(_<<7&4294967295|_>>>25),_=A+(T^g&(w^T))+I[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(w^A&(g^w))+I[6]+2821735955&4294967295,T=A+(_<<17&4294967295|_>>>15),_=w+(g^T&(A^g))+I[7]+4249261313&4294967295,w=T+(_<<22&4294967295|_>>>10),_=g+(A^w&(T^A))+I[8]+1770035416&4294967295,g=w+(_<<7&4294967295|_>>>25),_=A+(T^g&(w^T))+I[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(w^A&(g^w))+I[10]+4294925233&4294967295,T=A+(_<<17&4294967295|_>>>15),_=w+(g^T&(A^g))+I[11]+2304563134&4294967295,w=T+(_<<22&4294967295|_>>>10),_=g+(A^w&(T^A))+I[12]+1804603682&4294967295,g=w+(_<<7&4294967295|_>>>25),_=A+(T^g&(w^T))+I[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(w^A&(g^w))+I[14]+2792965006&4294967295,T=A+(_<<17&4294967295|_>>>15),_=w+(g^T&(A^g))+I[15]+1236535329&4294967295,w=T+(_<<22&4294967295|_>>>10),_=g+(T^A&(w^T))+I[1]+4129170786&4294967295,g=w+(_<<5&4294967295|_>>>27),_=A+(w^T&(g^w))+I[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^w&(A^g))+I[11]+643717713&4294967295,T=A+(_<<14&4294967295|_>>>18),_=w+(A^g&(T^A))+I[0]+3921069994&4294967295,w=T+(_<<20&4294967295|_>>>12),_=g+(T^A&(w^T))+I[5]+3593408605&4294967295,g=w+(_<<5&4294967295|_>>>27),_=A+(w^T&(g^w))+I[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^w&(A^g))+I[15]+3634488961&4294967295,T=A+(_<<14&4294967295|_>>>18),_=w+(A^g&(T^A))+I[4]+3889429448&4294967295,w=T+(_<<20&4294967295|_>>>12),_=g+(T^A&(w^T))+I[9]+568446438&4294967295,g=w+(_<<5&4294967295|_>>>27),_=A+(w^T&(g^w))+I[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^w&(A^g))+I[3]+4107603335&4294967295,T=A+(_<<14&4294967295|_>>>18),_=w+(A^g&(T^A))+I[8]+1163531501&4294967295,w=T+(_<<20&4294967295|_>>>12),_=g+(T^A&(w^T))+I[13]+2850285829&4294967295,g=w+(_<<5&4294967295|_>>>27),_=A+(w^T&(g^w))+I[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^w&(A^g))+I[7]+1735328473&4294967295,T=A+(_<<14&4294967295|_>>>18),_=w+(A^g&(T^A))+I[12]+2368359562&4294967295,w=T+(_<<20&4294967295|_>>>12),_=g+(w^T^A)+I[5]+4294588738&4294967295,g=w+(_<<4&4294967295|_>>>28),_=A+(g^w^T)+I[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^w)+I[11]+1839030562&4294967295,T=A+(_<<16&4294967295|_>>>16),_=w+(T^A^g)+I[14]+4259657740&4294967295,w=T+(_<<23&4294967295|_>>>9),_=g+(w^T^A)+I[1]+2763975236&4294967295,g=w+(_<<4&4294967295|_>>>28),_=A+(g^w^T)+I[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^w)+I[7]+4139469664&4294967295,T=A+(_<<16&4294967295|_>>>16),_=w+(T^A^g)+I[10]+3200236656&4294967295,w=T+(_<<23&4294967295|_>>>9),_=g+(w^T^A)+I[13]+681279174&4294967295,g=w+(_<<4&4294967295|_>>>28),_=A+(g^w^T)+I[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^w)+I[3]+3572445317&4294967295,T=A+(_<<16&4294967295|_>>>16),_=w+(T^A^g)+I[6]+76029189&4294967295,w=T+(_<<23&4294967295|_>>>9),_=g+(w^T^A)+I[9]+3654602809&4294967295,g=w+(_<<4&4294967295|_>>>28),_=A+(g^w^T)+I[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^w)+I[15]+530742520&4294967295,T=A+(_<<16&4294967295|_>>>16),_=w+(T^A^g)+I[2]+3299628645&4294967295,w=T+(_<<23&4294967295|_>>>9),_=g+(T^(w|~A))+I[0]+4096336452&4294967295,g=w+(_<<6&4294967295|_>>>26),_=A+(w^(g|~T))+I[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~w))+I[14]+2878612391&4294967295,T=A+(_<<15&4294967295|_>>>17),_=w+(A^(T|~g))+I[5]+4237533241&4294967295,w=T+(_<<21&4294967295|_>>>11),_=g+(T^(w|~A))+I[12]+1700485571&4294967295,g=w+(_<<6&4294967295|_>>>26),_=A+(w^(g|~T))+I[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~w))+I[10]+4293915773&4294967295,T=A+(_<<15&4294967295|_>>>17),_=w+(A^(T|~g))+I[1]+2240044497&4294967295,w=T+(_<<21&4294967295|_>>>11),_=g+(T^(w|~A))+I[8]+1873313359&4294967295,g=w+(_<<6&4294967295|_>>>26),_=A+(w^(g|~T))+I[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~w))+I[6]+2734768916&4294967295,T=A+(_<<15&4294967295|_>>>17),_=w+(A^(T|~g))+I[13]+1309151649&4294967295,w=T+(_<<21&4294967295|_>>>11),_=g+(T^(w|~A))+I[4]+4149444226&4294967295,g=w+(_<<6&4294967295|_>>>26),_=A+(w^(g|~T))+I[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~w))+I[2]+718787259&4294967295,T=A+(_<<15&4294967295|_>>>17),_=w+(A^(T|~g))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,g){g===void 0&&(g=E.length);for(var w=g-this.blockSize,I=this.B,T=this.h,A=0;A<g;){if(T==0)for(;A<=w;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<g;)if(I[T++]=E.charCodeAt(A++),T==this.blockSize){i(this,I),T=0;break}}else for(;A<g;)if(I[T++]=E[A++],T==this.blockSize){i(this,I),T=0;break}}this.h=T,this.o+=g},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;var w=8*this.o;for(g=E.length-8;g<E.length;++g)E[g]=w&255,w/=256;for(this.u(E),E=Array(16),g=w=0;4>g;++g)for(var I=0;32>I;I+=8)E[w++]=this.g[g]>>>I&255;return E};function s(E,g){var w=c;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=g(E)}function a(E,g){this.h=g;for(var w=[],I=!0,T=E.length-1;0<=T;T--){var A=E[T]|0;I&&A==g||(w[T]=A,I=!1)}this.g=w}var c={};function l(E){return-128<=E&&128>E?s(E,function(g){return new a([g|0],0>g?-1:0)}):new a([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return y;if(0>E)return x(f(-E));for(var g=[],w=1,I=0;E>=w;I++)g[I]=E/w|0,w*=4294967296;return new a(g,0)}function p(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return x(p(E.substring(1),g));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=f(Math.pow(g,8)),I=y,T=0;T<E.length;T+=8){var A=Math.min(8,E.length-T),_=parseInt(E.substring(T,T+A),g);8>A?(A=f(Math.pow(g,A)),I=I.j(A).add(f(_))):(I=I.j(w),I=I.add(f(_)))}return I}var y=l(0),v=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(V(this))return-x(this).m();for(var E=0,g=1,w=0;w<this.g.length;w++){var I=this.i(w);E+=(0<=I?I:4294967296+I)*g,g*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(V(this))return"-"+x(this).toString(E);for(var g=f(Math.pow(E,6)),w=this,I="";;){var T=te(w,g).g;w=G(w,T.j(g));var A=((0<w.g.length?w.g[0]:w.h)>>>0).toString(E);if(w=T,k(w))return A+I;for(;6>A.length;)A="0"+A;I=A+I}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function V(E){return E.h==-1}n.l=function(E){return E=G(this,E),V(E)?-1:k(E)?0:1};function x(E){for(var g=E.g.length,w=[],I=0;I<g;I++)w[I]=~E.g[I];return new a(w,~E.h).add(v)}n.abs=function(){return V(this)?x(this):this},n.add=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0,T=0;T<=g;T++){var A=I+(this.i(T)&65535)+(E.i(T)&65535),_=(A>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);I=_>>>16,A&=65535,_&=65535,w[T]=_<<16|A}return new a(w,w[w.length-1]&-2147483648?-1:0)};function G(E,g){return E.add(x(g))}n.j=function(E){if(k(this)||k(E))return y;if(V(this))return V(E)?x(this).j(x(E)):x(x(this).j(E));if(V(E))return x(this.j(x(E)));if(0>this.l(S)&&0>E.l(S))return f(this.m()*E.m());for(var g=this.g.length+E.g.length,w=[],I=0;I<2*g;I++)w[I]=0;for(I=0;I<this.g.length;I++)for(var T=0;T<E.g.length;T++){var A=this.i(I)>>>16,_=this.i(I)&65535,pt=E.i(T)>>>16,cr=E.i(T)&65535;w[2*I+2*T]+=_*cr,q(w,2*I+2*T),w[2*I+2*T+1]+=A*cr,q(w,2*I+2*T+1),w[2*I+2*T+1]+=_*pt,q(w,2*I+2*T+1),w[2*I+2*T+2]+=A*pt,q(w,2*I+2*T+2)}for(I=0;I<g;I++)w[I]=w[2*I+1]<<16|w[2*I];for(I=g;I<2*g;I++)w[I]=0;return new a(w,0)};function q(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function B(E,g){this.g=E,this.h=g}function te(E,g){if(k(g))throw Error("division by zero");if(k(E))return new B(y,y);if(V(E))return g=te(x(E),g),new B(x(g.g),x(g.h));if(V(g))return g=te(E,x(g)),new B(x(g.g),g.h);if(30<E.g.length){if(V(E)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var w=v,I=g;0>=I.l(E);)w=ve(w),I=ve(I);var T=$(w,1),A=$(I,1);for(I=$(I,2),w=$(w,2);!k(I);){var _=A.add(I);0>=_.l(E)&&(T=T.add(w),A=_),I=$(I,1),w=$(w,1)}return g=G(E,T.j(g)),new B(T,g)}for(T=y;0<=E.l(g);){for(w=Math.max(1,Math.floor(E.m()/g.m())),I=Math.ceil(Math.log(w)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),A=f(w),_=A.j(g);V(_)||0<_.l(E);)w-=I,A=f(w),_=A.j(g);k(A)&&(A=v),T=T.add(A),E=G(E,_)}return new B(T,E)}n.A=function(E){return te(this,E).h},n.and=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0;I<g;I++)w[I]=this.i(I)&E.i(I);return new a(w,this.h&E.h)},n.or=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0;I<g;I++)w[I]=this.i(I)|E.i(I);return new a(w,this.h|E.h)},n.xor=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0;I<g;I++)w[I]=this.i(I)^E.i(I);return new a(w,this.h^E.h)};function ve(E){for(var g=E.g.length+1,w=[],I=0;I<g;I++)w[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(w,E.h)}function $(E,g){var w=g>>5;g%=32;for(var I=E.g.length-w,T=[],A=0;A<I;A++)T[A]=0<g?E.i(A+w)>>>g|E.i(A+w+1)<<32-g:E.i(A+w);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,dc=pf.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,Ft=pf.Integer=a}).apply(typeof ff!="undefined"?ff:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Rs=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},It={};var fc,pc,Ln,mc,zr,Ps,gc,yc,_c;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Rs=="object"&&Rs];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var b=o[m];if(!(b in d))break e;d=d[b]}o=o[o.length-1],m=d[o],u=u(m),u!=m&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var d=0,m=!1,b={next:function(){if(!m&&d<o.length){var R=d++;return{value:u(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,d){return d})}});var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function f(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function p(o,u,d){return o.call.apply(o.bind,arguments)}function y(o,u,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,m),o.apply(u,b)}}return function(){return o.apply(u,arguments)}}function v(o,u,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,v.apply(null,arguments)}function S(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function k(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,b,R){for(var N=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)N[ie-2]=arguments[ie];return u.prototype[b].apply(m,N)}}function V(o){let u=o.length;if(0<u){let d=Array(u);for(let m=0;m<u;m++)d[m]=o[m];return d}return[]}function x(o,u){for(let d=1;d<arguments.length;d++){let m=arguments[d];if(l(m)){let b=o.length||0,R=m.length||0;o.length=b+R;for(let N=0;N<R;N++)o[b+N]=m[N]}else o.push(m)}}class G{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function q(o){return/^[\s\xa0]*$/.test(o)}function B(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function te(o){return te[" "](o),o}te[" "]=function(){};var ve=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function $(o,u,d){for(let m in o)u.call(d,o[m],m,o)}function E(o,u){for(let d in o)u.call(void 0,o[d],d,o)}function g(o){let u={};for(let d in o)u[d]=o[d];return u}let w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,u){let d,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(d in m)o[d]=m[d];for(let R=0;R<w.length;R++)d=w[R],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function T(o){var u=1;o=o.split(":");let d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function A(o){c.setTimeout(()=>{throw o},0)}function _(){var o=Bo;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class pt{constructor(){this.h=this.g=null}add(u,d){let m=cr.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var cr=new G(()=>new Pm,o=>o.reset());class Pm{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ur,lr=!1,Bo=new pt,jl=()=>{let o=c.Promise.resolve(void 0);ur=()=>{o.then(Cm)}};var Cm=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(d){A(d)}var u=cr;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}lr=!1};function At(){this.s=this.s,this.C=this.C}At.prototype.s=!1,At.prototype.ma=function(){this.s||(this.s=!0,this.N())},At.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ae(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}Ae.prototype.h=function(){this.defaultPrevented=!0};var km=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return o}();function hr(o,u){if(Ae.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(ve){e:{try{te(u.nodeName);var b=!0;break e}catch{}b=!1}b||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:xm[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&hr.aa.h.call(this)}}k(hr,Ae);var xm={2:"touch",3:"pen",4:"mouse"};hr.prototype.h=function(){hr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var dr="closure_listenable_"+(1e6*Math.random()|0),Dm=0;function Nm(o,u,d,m,b){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=b,this.key=++Dm,this.da=this.fa=!1}function Si(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ri(o){this.src=o,this.g={},this.h=0}Ri.prototype.add=function(o,u,d,m,b){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var N=jo(o,u,m,b);return-1<N?(u=o[N],d||(u.fa=!1)):(u=new Nm(u,this.src,R,!!m,b),u.fa=d,o.push(u)),u};function qo(o,u){var d=u.type;if(d in o.g){var m=o.g[d],b=Array.prototype.indexOf.call(m,u,void 0),R;(R=0<=b)&&Array.prototype.splice.call(m,b,1),R&&(Si(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function jo(o,u,d,m){for(var b=0;b<o.length;++b){var R=o[b];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==m)return b}return-1}var zo="closure_lm_"+(1e6*Math.random()|0),Go={};function zl(o,u,d,m,b){if(m&&m.once)return Kl(o,u,d,m,b);if(Array.isArray(u)){for(var R=0;R<u.length;R++)zl(o,u[R],d,m,b);return null}return d=Qo(d),o&&o[dr]?o.K(u,d,f(m)?!!m.capture:!!m,b):Gl(o,u,d,!1,m,b)}function Gl(o,u,d,m,b,R){if(!u)throw Error("Invalid event type");var N=f(b)?!!b.capture:!!b,ie=Wo(o);if(ie||(o[zo]=ie=new Ri(o)),d=ie.add(u,d,m,N,R),d.proxy)return d;if(m=Om(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)km||(b=N),b===void 0&&(b=!1),o.addEventListener(u.toString(),m,b);else if(o.attachEvent)o.attachEvent(Hl(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Om(){function o(d){return u.call(o.src,o.listener,d)}let u=Vm;return o}function Kl(o,u,d,m,b){if(Array.isArray(u)){for(var R=0;R<u.length;R++)Kl(o,u[R],d,m,b);return null}return d=Qo(d),o&&o[dr]?o.L(u,d,f(m)?!!m.capture:!!m,b):Gl(o,u,d,!0,m,b)}function Wl(o,u,d,m,b){if(Array.isArray(u))for(var R=0;R<u.length;R++)Wl(o,u[R],d,m,b);else m=f(m)?!!m.capture:!!m,d=Qo(d),o&&o[dr]?(o=o.i,u=String(u).toString(),u in o.g&&(R=o.g[u],d=jo(R,d,m,b),-1<d&&(Si(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[u],o.h--)))):o&&(o=Wo(o))&&(u=o.g[u.toString()],o=-1,u&&(o=jo(u,d,m,b)),(d=-1<o?u[o]:null)&&Ko(d))}function Ko(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[dr])qo(u.i,o);else{var d=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(d,m,o.capture):u.detachEvent?u.detachEvent(Hl(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=Wo(u))?(qo(d,o),d.h==0&&(d.src=null,u[zo]=null)):Si(o)}}}function Hl(o){return o in Go?Go[o]:Go[o]="on"+o}function Vm(o,u){if(o.da)o=!0;else{u=new hr(u,this);var d=o.listener,m=o.ha||o.src;o.fa&&Ko(o),o=d.call(m,u)}return o}function Wo(o){return o=o[zo],o instanceof Ri?o:null}var Ho="__closure_events_fn_"+(1e9*Math.random()>>>0);function Qo(o){return typeof o=="function"?o:(o[Ho]||(o[Ho]=function(u){return o.handleEvent(u)}),o[Ho])}function Se(){At.call(this),this.i=new Ri(this),this.M=this,this.F=null}k(Se,At),Se.prototype[dr]=!0,Se.prototype.removeEventListener=function(o,u,d,m){Wl(this,o,u,d,m)};function Ne(o,u){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new Ae(u,o);else if(u instanceof Ae)u.target=u.target||o;else{var b=u;u=new Ae(m,o),I(u,b)}if(b=!0,d)for(var R=d.length-1;0<=R;R--){var N=u.g=d[R];b=Pi(N,m,!0,u)&&b}if(N=u.g=o,b=Pi(N,m,!0,u)&&b,b=Pi(N,m,!1,u)&&b,d)for(R=0;R<d.length;R++)N=u.g=d[R],b=Pi(N,m,!1,u)&&b}Se.prototype.N=function(){if(Se.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],m=0;m<d.length;m++)Si(d[m]);delete o.g[u],o.h--}}this.F=null},Se.prototype.K=function(o,u,d,m){return this.i.add(String(o),u,!1,d,m)},Se.prototype.L=function(o,u,d,m){return this.i.add(String(o),u,!0,d,m)};function Pi(o,u,d,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var b=!0,R=0;R<u.length;++R){var N=u[R];if(N&&!N.da&&N.capture==d){var ie=N.listener,Ee=N.ha||N.src;N.fa&&qo(o.i,N),b=ie.call(Ee,m)!==!1&&b}}return b&&!m.defaultPrevented}function Ql(o,u,d){if(typeof o=="function")d&&(o=v(o,d));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Yl(o){o.g=Ql(()=>{o.g=null,o.i&&(o.i=!1,Yl(o))},o.l);let u=o.h;o.h=null,o.m.apply(null,u)}class Mm extends At{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Yl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fr(o){At.call(this),this.h=o,this.g={}}k(fr,At);var Jl=[];function $l(o){$(o.g,function(u,d){this.g.hasOwnProperty(d)&&Ko(u)},o),o.g={}}fr.prototype.N=function(){fr.aa.N.call(this),$l(this)},fr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Yo=c.JSON.stringify,Lm=c.JSON.parse,Fm=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Jo(){}Jo.prototype.h=null;function Xl(o){return o.h||(o.h=o.i())}function Zl(){}var pr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function $o(){Ae.call(this,"d")}k($o,Ae);function Xo(){Ae.call(this,"c")}k(Xo,Ae);var en={},eh=null;function Ci(){return eh=eh||new Se}en.La="serverreachability";function th(o){Ae.call(this,en.La,o)}k(th,Ae);function mr(o){let u=Ci();Ne(u,new th(u))}en.STAT_EVENT="statevent";function nh(o,u){Ae.call(this,en.STAT_EVENT,o),this.stat=u}k(nh,Ae);function Oe(o){let u=Ci();Ne(u,new nh(u,o))}en.Ma="timingevent";function rh(o,u){Ae.call(this,en.Ma,o),this.size=u}k(rh,Ae);function gr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function yr(){this.g=!0}yr.prototype.xa=function(){this.g=!1};function Um(o,u,d,m,b,R){o.info(function(){if(o.g)if(R)for(var N="",ie=R.split("&"),Ee=0;Ee<ie.length;Ee++){var Z=ie[Ee].split("=");if(1<Z.length){var Re=Z[0];Z=Z[1];var Pe=Re.split("_");N=2<=Pe.length&&Pe[1]=="type"?N+(Re+"="+Z+"&"):N+(Re+"=redacted&")}}else N=null;else N=R;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+u+`
`+d+`
`+N})}function Bm(o,u,d,m,b,R,N){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+u+`
`+d+`
`+R+" "+N})}function Rn(o,u,d,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+jm(o,d)+(m?" "+m:"")})}function qm(o,u){o.info(function(){return"TIMEOUT: "+u})}yr.prototype.info=function(){};function jm(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var b=m[1];if(Array.isArray(b)&&!(1>b.length)){var R=b[0];if(R!="noop"&&R!="stop"&&R!="close")for(var N=1;N<b.length;N++)b[N]=""}}}}return Yo(d)}catch{return u}}var ki={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ih={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Zo;function xi(){}k(xi,Jo),xi.prototype.g=function(){return new XMLHttpRequest},xi.prototype.i=function(){return{}},Zo=new xi;function St(o,u,d,m){this.j=o,this.i=u,this.l=d,this.R=m||1,this.U=new fr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new sh}function sh(){this.i=null,this.g="",this.h=!1}var oh={},ea={};function ta(o,u,d){o.L=1,o.v=Vi(mt(u)),o.m=d,o.P=!0,ah(o,null)}function ah(o,u){o.F=Date.now(),Di(o),o.A=mt(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),Ih(d.i,"t",m),o.C=0,d=o.j.J,o.h=new sh,o.g=Uh(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Mm(v(o.Y,o,o.g),o.O)),u=o.U,d=o.g,m=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Jl[0]=b.toString()),b=Jl);for(var R=0;R<b.length;R++){var N=zl(d,b[R],m||u.handleEvent,!1,u.h||u);if(!N)break;u.g[N.key]=N}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),mr(),Um(o.i,o.u,o.A,o.l,o.R,o.m)}St.prototype.ca=function(o){o=o.target;let u=this.M;u&&gt(o)==3?u.j():this.Y(o)},St.prototype.Y=function(o){try{if(o==this.g)e:{let Pe=gt(this.g);var u=this.g.Ba();let kn=this.g.Z();if(!(3>Pe)&&(Pe!=3||this.g&&(this.h.h||this.g.oa()||Ph(this.g)))){this.J||Pe!=4||u==7||(u==8||0>=kn?mr(3):mr(2)),na(this);var d=this.g.Z();this.X=d;t:if(ch(this)){var m=Ph(this.g);o="";var b=m.length,R=gt(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){tn(this),_r(this);var N="";break t}this.h.i=new c.TextDecoder}for(u=0;u<b;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(R&&u==b-1)});m.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=d==200,Bm(this.i,this.u,this.A,this.l,this.R,Pe,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Ee=this.g;if((ie=Ee.g?Ee.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(ie)){var Z=ie;break t}}Z=null}if(d=Z)Rn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ra(this,d);else{this.o=!1,this.s=3,Oe(12),tn(this),_r(this);break e}}if(this.P){d=!0;let Je;for(;!this.J&&this.C<N.length;)if(Je=zm(this,N),Je==ea){Pe==4&&(this.s=4,Oe(14),d=!1),Rn(this.i,this.l,null,"[Incomplete Response]");break}else if(Je==oh){this.s=4,Oe(15),Rn(this.i,this.l,N,"[Invalid Chunk]"),d=!1;break}else Rn(this.i,this.l,Je,null),ra(this,Je);if(ch(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Pe!=4||N.length!=0||this.h.h||(this.s=1,Oe(16),d=!1),this.o=this.o&&d,!d)Rn(this.i,this.l,N,"[Invalid Chunked Response]"),tn(this),_r(this);else if(0<N.length&&!this.W){this.W=!0;var Re=this.j;Re.g==this&&Re.ba&&!Re.M&&(Re.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),ua(Re),Re.M=!0,Oe(11))}}else Rn(this.i,this.l,N,null),ra(this,N);Pe==4&&tn(this),this.o&&!this.J&&(Pe==4?Vh(this.j,this):(this.o=!1,Di(this)))}else og(this.g),d==400&&0<N.indexOf("Unknown SID")?(this.s=3,Oe(12)):(this.s=0,Oe(13)),tn(this),_r(this)}}}catch{}finally{}};function ch(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function zm(o,u){var d=o.C,m=u.indexOf(`
`,d);return m==-1?ea:(d=Number(u.substring(d,m)),isNaN(d)?oh:(m+=1,m+d>u.length?ea:(u=u.slice(m,m+d),o.C=m+d,u)))}St.prototype.cancel=function(){this.J=!0,tn(this)};function Di(o){o.S=Date.now()+o.I,uh(o,o.I)}function uh(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=gr(v(o.ba,o),u)}function na(o){o.B&&(c.clearTimeout(o.B),o.B=null)}St.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(qm(this.i,this.A),this.L!=2&&(mr(),Oe(17)),tn(this),this.s=2,_r(this)):uh(this,this.S-o)};function _r(o){o.j.G==0||o.J||Vh(o.j,o)}function tn(o){na(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,$l(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function ra(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||ia(d.h,o))){if(!o.K&&ia(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Bi(d),Fi(d);else break e;ca(d),Oe(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=gr(v(d.Za,d),6e3));if(1>=dh(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else rn(d,11)}else if((o.K||d.g==o)&&Bi(d),!q(u))for(b=d.Da.g.parse(u),u=0;u<b.length;u++){let Z=b[u];if(d.T=Z[0],Z=Z[1],d.G==2)if(Z[0]=="c"){d.K=Z[1],d.ia=Z[2];let Re=Z[3];Re!=null&&(d.la=Re,d.j.info("VER="+d.la));let Pe=Z[4];Pe!=null&&(d.Aa=Pe,d.j.info("SVER="+d.Aa));let kn=Z[5];kn!=null&&typeof kn=="number"&&0<kn&&(m=1.5*kn,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;let Je=o.g;if(Je){let ji=Je.g?Je.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ji){var R=m.h;R.g||ji.indexOf("spdy")==-1&&ji.indexOf("quic")==-1&&ji.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(sa(R,R.h),R.h=null))}if(m.D){let la=Je.g?Je.g.getResponseHeader("X-HTTP-Session-Id"):null;la&&(m.ya=la,se(m.I,m.D,la))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var N=o;if(m.qa=Fh(m,m.J?m.ia:null,m.W),N.K){fh(m.h,N);var ie=N,Ee=m.L;Ee&&(ie.I=Ee),ie.B&&(na(ie),Di(ie)),m.g=N}else Nh(m);0<d.i.length&&Ui(d)}else Z[0]!="stop"&&Z[0]!="close"||rn(d,7);else d.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?rn(d,7):aa(d):Z[0]!="noop"&&d.l&&d.l.ta(Z),d.v=0)}}mr(4)}catch{}}var Gm=class{constructor(o,u){this.g=o,this.map=u}};function lh(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function hh(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function dh(o){return o.h?1:o.g?o.g.size:0}function ia(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function sa(o,u){o.g?o.g.add(u):o.h=u}function fh(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}lh.prototype.cancel=function(){if(this.i=ph(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function ph(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(let d of o.g.values())u=u.concat(d.D);return u}return V(o.i)}function Km(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map!="undefined"&&o instanceof Map||typeof Set!="undefined"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],d=o.length,m=0;m<d;m++)u.push(o[m]);return u}u=[],d=0;for(m in o)u[d++]=o[m];return u}function Wm(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map!="undefined"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set!="undefined"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(let m in o)u[d++]=m;return u}}}function mh(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=Wm(o),m=Km(o),b=m.length,R=0;R<b;R++)u.call(void 0,m[R],d&&d[R],o)}var gh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Hm(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),b=null;if(0<=m){var R=o[d].substring(0,m);b=o[d].substring(m+1)}else R=o[d];u(R,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function nn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof nn){this.h=o.h,Ni(this,o.j),this.o=o.o,this.g=o.g,Oi(this,o.s),this.l=o.l;var u=o.i,d=new Ir;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),yh(this,d),this.m=o.m}else o&&(u=String(o).match(gh))?(this.h=!1,Ni(this,u[1]||"",!0),this.o=vr(u[2]||""),this.g=vr(u[3]||"",!0),Oi(this,u[4]),this.l=vr(u[5]||"",!0),yh(this,u[6]||"",!0),this.m=vr(u[7]||"")):(this.h=!1,this.i=new Ir(null,this.h))}nn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(wr(u,_h,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(wr(u,_h,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(wr(d,d.charAt(0)=="/"?Jm:Ym,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",wr(d,Xm)),o.join("")};function mt(o){return new nn(o)}function Ni(o,u,d){o.j=d?vr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Oi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function yh(o,u,d){u instanceof Ir?(o.i=u,Zm(o.i,o.h)):(d||(u=wr(u,$m)),o.i=new Ir(u,o.h))}function se(o,u,d){o.i.set(u,d)}function Vi(o){return se(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function vr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function wr(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Qm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Qm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var _h=/[#\/\?@]/g,Ym=/[#\?:]/g,Jm=/[#\?]/g,$m=/[#\?@]/g,Xm=/#/g;function Ir(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Rt(o){o.g||(o.g=new Map,o.h=0,o.i&&Hm(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Ir.prototype,n.add=function(o,u){Rt(this),this.i=null,o=Pn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function vh(o,u){Rt(o),u=Pn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function wh(o,u){return Rt(o),u=Pn(o,u),o.g.has(u)}n.forEach=function(o,u){Rt(this),this.g.forEach(function(d,m){d.forEach(function(b){o.call(u,b,m,this)},this)},this)},n.na=function(){Rt(this);let o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let m=0;m<u.length;m++){let b=o[m];for(let R=0;R<b.length;R++)d.push(u[m])}return d},n.V=function(o){Rt(this);let u=[];if(typeof o=="string")wh(this,o)&&(u=u.concat(this.g.get(Pn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},n.set=function(o,u){return Rt(this),this.i=null,o=Pn(this,o),wh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Ih(o,u,d){vh(o,u),0<d.length&&(o.i=null,o.g.set(Pn(o,u),V(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var m=u[d];let R=encodeURIComponent(String(m)),N=this.V(m);for(m=0;m<N.length;m++){var b=R;N[m]!==""&&(b+="="+encodeURIComponent(String(N[m]))),o.push(b)}}return this.i=o.join("&")};function Pn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Zm(o,u){u&&!o.j&&(Rt(o),o.i=null,o.g.forEach(function(d,m){var b=m.toLowerCase();m!=b&&(vh(this,m),Ih(this,b,d))},o)),o.j=u}function eg(o,u){let d=new yr;if(c.Image){let m=new Image;m.onload=S(Pt,d,"TestLoadImage: loaded",!0,u,m),m.onerror=S(Pt,d,"TestLoadImage: error",!1,u,m),m.onabort=S(Pt,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=S(Pt,d,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function tg(o,u){let d=new yr,m=new AbortController,b=setTimeout(()=>{m.abort(),Pt(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(b),R.ok?Pt(d,"TestPingServer: ok",!0,u):Pt(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(b),Pt(d,"TestPingServer: error",!1,u)})}function Pt(o,u,d,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(d)}catch{}}function ng(){this.g=new Fm}function rg(o,u,d){let m=d||"";try{mh(o,function(b,R){let N=b;f(b)&&(N=Yo(b)),u.push(m+R+"="+encodeURIComponent(N))})}catch(b){throw u.push(m+"type="+encodeURIComponent("_badmap")),b}}function Er(o){this.l=o.Ub||null,this.j=o.eb||!1}k(Er,Jo),Er.prototype.g=function(){return new Mi(this.l,this.j)},Er.prototype.i=function(o){return function(){return o}}({});function Mi(o,u){Se.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Mi,Se),n=Mi.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,br(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Tr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,br(this)),this.g&&(this.readyState=3,br(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Eh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Eh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Tr(this):br(this),this.readyState==3&&Eh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Tr(this))},n.Qa=function(o){this.g&&(this.response=o,Tr(this))},n.ga=function(){this.g&&Tr(this)};function Tr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,br(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function br(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Mi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Th(o){let u="";return $(o,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function oa(o,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Th(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):se(o,u,d))}function ue(o){Se.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(ue,Se);var ig=/^https?$/i,sg=["POST","PUT"];n=ue.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Zo.g(),this.v=this.o?Xl(this.o):Xl(Zo),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(R){bh(this,R);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)d.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(let R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(sg,u,void 0))||m||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[R,N]of d)this.g.setRequestHeader(R,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Rh(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){bh(this,R)}};function bh(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Ah(o),Li(o)}function Ah(o){o.A||(o.A=!0,Ne(o,"complete"),Ne(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ne(this,"complete"),Ne(this,"abort"),Li(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Li(this,!0)),ue.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Sh(this):this.bb())},n.bb=function(){Sh(this)};function Sh(o){if(o.h&&typeof a!="undefined"&&(!o.v[1]||gt(o)!=4||o.Z()!=2)){if(o.u&&gt(o)==4)Ql(o.Ea,0,o);else if(Ne(o,"readystatechange"),gt(o)==4){o.h=!1;try{let N=o.Z();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=N===0){var b=String(o.D).match(gh)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),m=!ig.test(b?b.toLowerCase():"")}d=m}if(d)Ne(o,"complete"),Ne(o,"success");else{o.m=6;try{var R=2<gt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Ah(o)}}finally{Li(o)}}}}function Li(o,u){if(o.g){Rh(o);let d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||Ne(o,"ready");try{d.onreadystatechange=m}catch{}}}function Rh(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function gt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<gt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Lm(u)}};function Ph(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function og(o){let u={};o=(o.g&&2<=gt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(q(o[m]))continue;var d=T(o[m]);let b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let R=u[b]||[];u[b]=R,R.push(d)}E(u,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ar(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Ch(o){this.Aa=0,this.i=[],this.j=new yr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ar("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ar("baseRetryDelayMs",5e3,o),this.cb=Ar("retryDelaySeedMs",1e4,o),this.Wa=Ar("forwardChannelMaxRetries",2,o),this.wa=Ar("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new lh(o&&o.concurrentRequestLimit),this.Da=new ng,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ch.prototype,n.la=8,n.G=1,n.connect=function(o,u,d,m){Oe(0),this.W=o,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Fh(this,null,this.W),Ui(this)};function aa(o){if(kh(o),o.G==3){var u=o.U++,d=mt(o.I);if(se(d,"SID",o.K),se(d,"RID",u),se(d,"TYPE","terminate"),Sr(o,d),u=new St(o,o.j,u),u.L=2,u.v=Vi(mt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=Uh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Di(u)}Lh(o)}function Fi(o){o.g&&(ua(o),o.g.cancel(),o.g=null)}function kh(o){Fi(o),o.u&&(c.clearTimeout(o.u),o.u=null),Bi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Ui(o){if(!hh(o.h)&&!o.s){o.s=!0;var u=o.Ga;ur||jl(),lr||(ur(),lr=!0),Bo.add(u,o),o.B=0}}function ag(o,u){return dh(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=gr(v(o.Ga,o,u),Mh(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let b=new St(this,this.j,o),R=this.o;if(this.S&&(R?(R=g(R),I(R,this.S)):R=this.S),this.m!==null||this.O||(b.H=R,R=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Dh(this,b,u),d=mt(this.I),se(d,"RID",o),se(d,"CVER",22),this.D&&se(d,"X-HTTP-Session-Id",this.D),Sr(this,d),R&&(this.O?u="headers="+encodeURIComponent(String(Th(R)))+"&"+u:this.m&&oa(d,this.m,R)),sa(this.h,b),this.Ua&&se(d,"TYPE","init"),this.P?(se(d,"$req",u),se(d,"SID","null"),b.T=!0,ta(b,d,null)):ta(b,d,u),this.G=2}}else this.G==3&&(o?xh(this,o):this.i.length==0||hh(this.h)||xh(this))};function xh(o,u){var d;u?d=u.l:d=o.U++;let m=mt(o.I);se(m,"SID",o.K),se(m,"RID",d),se(m,"AID",o.T),Sr(o,m),o.m&&o.o&&oa(m,o.m,o.o),d=new St(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Dh(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),sa(o.h,d),ta(d,m,u)}function Sr(o,u){o.H&&$(o.H,function(d,m){se(u,m,d)}),o.l&&mh({},function(d,m){se(u,m,d)})}function Dh(o,u,d){d=Math.min(o.i.length,d);var m=o.l?v(o.l.Na,o.l,o):null;e:{var b=o.i;let R=-1;for(;;){let N=["count="+d];R==-1?0<d?(R=b[0].g,N.push("ofs="+R)):R=0:N.push("ofs="+R);let ie=!0;for(let Ee=0;Ee<d;Ee++){let Z=b[Ee].g,Re=b[Ee].map;if(Z-=R,0>Z)R=Math.max(0,b[Ee].g-100),ie=!1;else try{rg(Re,N,"req"+Z+"_")}catch{m&&m(Re)}}if(ie){m=N.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,m}function Nh(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;ur||jl(),lr||(ur(),lr=!0),Bo.add(u,o),o.v=0}}function ca(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=gr(v(o.Fa,o),Mh(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Oh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=gr(v(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Oe(10),Fi(this),Oh(this))};function ua(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Oh(o){o.g=new St(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=mt(o.qa);se(u,"RID","rpc"),se(u,"SID",o.K),se(u,"AID",o.T),se(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&se(u,"TO",o.ja),se(u,"TYPE","xmlhttp"),Sr(o,u),o.m&&o.o&&oa(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Vi(mt(u)),d.m=null,d.P=!0,ah(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Fi(this),ca(this),Oe(19))};function Bi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Vh(o,u){var d=null;if(o.g==u){Bi(o),ua(o),o.g=null;var m=2}else if(ia(o.h,u))d=u.D,fh(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var b=o.B;m=Ci(),Ne(m,new rh(m,d)),Ui(o)}else Nh(o);else if(b=u.s,b==3||b==0&&0<u.X||!(m==1&&ag(o,u)||m==2&&ca(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),b){case 1:rn(o,5);break;case 4:rn(o,10);break;case 3:rn(o,6);break;default:rn(o,2)}}}function Mh(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function rn(o,u){if(o.j.info("Error code "+u),u==2){var d=v(o.fb,o),m=o.Xa;let b=!m;m=new nn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ni(m,"https"),Vi(m),b?eg(m.toString(),d):tg(m.toString(),d)}else Oe(2);o.G=0,o.l&&o.l.sa(u),Lh(o),kh(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Oe(2)):(this.j.info("Failed to ping google.com"),Oe(1))};function Lh(o){if(o.G=0,o.ka=[],o.l){let u=ph(o.h);(u.length!=0||o.i.length!=0)&&(x(o.ka,u),x(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function Fh(o,u,d){var m=d instanceof nn?mt(d):new nn(d);if(m.g!="")u&&(m.g=u+"."+m.g),Oi(m,m.s);else{var b=c.location;m=b.protocol,u=u?u+"."+b.hostname:b.hostname,b=+b.port;var R=new nn(null);m&&Ni(R,m),u&&(R.g=u),b&&Oi(R,b),d&&(R.l=d),m=R}return d=o.D,u=o.ya,d&&u&&se(m,d,u),se(m,"VER",o.la),Sr(o,m),m}function Uh(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new ue(new Er({eb:d})):new ue(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bh(){}n=Bh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function qi(){}qi.prototype.g=function(o,u){return new Ue(o,u)};function Ue(o,u){Se.call(this),this.g=new Ch(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!q(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!q(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Cn(this)}k(Ue,Se),Ue.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ue.prototype.close=function(){aa(this.g)},Ue.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Yo(o),o=d);u.i.push(new Gm(u.Ya++,o)),u.G==3&&Ui(u)},Ue.prototype.N=function(){this.g.l=null,delete this.j,aa(this.g),delete this.g,Ue.aa.N.call(this)};function qh(o){$o.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(let d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}k(qh,$o);function jh(){Xo.call(this),this.status=1}k(jh,Xo);function Cn(o){this.g=o}k(Cn,Bh),Cn.prototype.ua=function(){Ne(this.g,"a")},Cn.prototype.ta=function(o){Ne(this.g,new qh(o))},Cn.prototype.sa=function(o){Ne(this.g,new jh)},Cn.prototype.ra=function(){Ne(this.g,"b")},qi.prototype.createWebChannel=qi.prototype.g,Ue.prototype.send=Ue.prototype.o,Ue.prototype.open=Ue.prototype.m,Ue.prototype.close=Ue.prototype.close,_c=It.createWebChannelTransport=function(){return new qi},yc=It.getStatEventTarget=function(){return Ci()},gc=It.Event=en,Ps=It.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ki.NO_ERROR=0,ki.TIMEOUT=8,ki.HTTP_ERROR=6,zr=It.ErrorCode=ki,ih.COMPLETE="complete",mc=It.EventType=ih,Zl.EventType=pr,pr.OPEN="a",pr.CLOSE="b",pr.ERROR="c",pr.MESSAGE="d",Se.prototype.listen=Se.prototype.K,Ln=It.WebChannel=Zl,pc=It.FetchXmlHttpFactory=Er,ue.prototype.listenOnce=ue.prototype.L,ue.prototype.getLastError=ue.prototype.Ka,ue.prototype.getLastErrorCode=ue.prototype.Ba,ue.prototype.getStatus=ue.prototype.Z,ue.prototype.getResponseJson=ue.prototype.Oa,ue.prototype.getResponseText=ue.prototype.oa,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Ha,fc=It.XhrIo=ue}).apply(typeof Rs!="undefined"?Rs:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var mf="@firebase/firestore";var we=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};we.UNAUTHENTICATED=new we(null),we.GOOGLE_CREDENTIALS=new we("google-credentials-uid"),we.FIRST_PARTY=new we("first-party-uid"),we.MOCK_USER=new we("mock-user");var nr="10.12.1";var mn=new Ct("@firebase/firestore");function Gr(){return mn.logLevel}function M(n,...e){if(mn.logLevel<=H.DEBUG){let t=e.map(al);mn.debug(`Firestore (${nr}): ${n}`,...t)}}function Et(n,...e){if(mn.logLevel<=H.ERROR){let t=e.map(al);mn.error(`Firestore (${nr}): ${n}`,...t)}}function Gn(n,...e){if(mn.logLevel<=H.WARN){let t=e.map(al);mn.warn(`Firestore (${nr}): ${n}`,...t)}}function al(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function U(n="Unexpected state"){let e=`FIRESTORE (${nr}) INTERNAL ASSERTION FAILED: `+n;throw Et(e),new Error(e)}function ne(n,e){n||U()}function z(n,e){return n}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},O=class extends Be{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var ct=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Ns=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Ec=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(we.UNAUTHENTICATED))}shutdown(){}},Tc=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},bc=class{constructor(e){this.t=e,this.currentUser=we.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),s=new ct;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ct,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),a()};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?c(l):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ct)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ne(typeof r.accessToken=="string"),new Ns(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string"),new we(e)}},Ac=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=we.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},Sc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Ac(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(we.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Rc=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Pc=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let a=s.token!==this.R;return this.R=s.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string"),this.R=t.token,new Rc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function wv(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Os=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=wv(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function ee(n,e){return n<e?-1:n>e?1:0}function Kn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var ye=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var j=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new ye(0,0))}static max(){return new n(new ye(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Vs=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(),r===void 0?r=e.length-t:r>e.length-t&&U(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),a=t.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},oe=class n extends Vs{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new O(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},Iv=/^[_a-zA-Z][_a-zA-Z0-9]*$/,qe=class n extends Vs{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return Iv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new O(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new O(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new O(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var F=class n{constructor(e){this.path=e}static fromPath(e){return new n(oe.fromString(e))}static fromName(e){return new n(oe.fromString(e).popFirst(5))}static empty(){return new n(oe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&oe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return oe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new oe(e.slice()))}};var Cc=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};Cc.UNKNOWN_ID=-1;function Ev(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=j.fromTimestamp(r===1e9?new ye(t+1,0):new ye(t,r));return new gn(i,F.empty(),e)}function Tv(n){return new gn(n.readTime,n.key,-1)}var gn=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(j.min(),F.empty(),-1)}static max(){return new n(j.max(),F.empty(),-1)}};function bv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}var Av="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",kc=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function di(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Av)throw n;M("LocalStore","Unexpectedly lost primary lease")}var D=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),c=0;for(let l=0;l<s;l++){let f=l;t(e[f]).next(p=>{a[f]=p,++c,c===s&&r(a)},p=>i(p))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function Sv(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function fi(n){return n.name==="IndexedDbTransactionError"}var $r=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};$r.oe=-1;function pi(n){return n==null}function Xr(n){return n===0&&1/n==-1/0}function Rv(n){return typeof n=="number"&&Number.isInteger(n)&&!Xr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var Pv=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],hb=[...Pv,"documentOverlays"],Cv=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],kv=Cv,db=[...kv,"indexConfiguration","indexState","indexEntries"];function gf(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function En(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Qf(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var he=class n{constructor(e,t){this.comparator=e,this.root=t||ut.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ut.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new qn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new qn(this.root,e,this.comparator,!1)}getReverseIterator(){return new qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new qn(this.root,e,this.comparator,!0)}},qn=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},ut=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw U();let e=this.left.check();if(e!==this.right.check())throw U();return e+(this.isRed()?0:1)}};ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw U()}get value(){throw U()}get color(){throw U()}get left(){throw U()}get right(){throw U()}copy(e,t,r,i,s){return this}insert(e,t,r){return new ut(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var xe=class n{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ms(this.data.getIterator())}getIteratorFrom(e){return new Ms(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Ms=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Qe=class n{constructor(e){this.fields=e,e.sort(qe.comparator)}static empty(){return new n([])}unionWith(e){let t=new xe(qe.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Kn(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Ls=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Ve=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new Ls("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ve.EMPTY_BYTE_STRING=new Ve("");var xv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Tt(n){if(ne(!!n),typeof n=="string"){let e=0,t=xv.exec(n);if(ne(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:le(n.seconds),nanos:le(n.nanos)}}function le(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function jt(n){return typeof n=="string"?Ve.fromBase64String(n):Ve.fromUint8Array(n)}function cl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function ul(n){let e=n.mapValue.fields.__previous_value__;return cl(e)?ul(e):e}function Zr(n){let e=Tt(n.mapValue.fields.__local_write_time__.timestampValue);return new ye(e.seconds,e.nanos)}var xc=class{constructor(e,t,r,i,s,a,c,l,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=f}},Fs=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Cs={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function yn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?cl(n)?4:Yf(n)?9007199254740991:10:U()}function ht(n,e){if(n===e)return!0;let t=yn(n);if(t!==yn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Zr(n).isEqual(Zr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=Tt(i.timestampValue),c=Tt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return jt(i.bytesValue).isEqual(jt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return le(i.geoPointValue.latitude)===le(s.geoPointValue.latitude)&&le(i.geoPointValue.longitude)===le(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return le(i.integerValue)===le(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=le(i.doubleValue),c=le(s.doubleValue);return a===c?Xr(a)===Xr(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Kn(n.arrayValue.values||[],e.arrayValue.values||[],ht);case 10:return function(i,s){let a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(gf(a)!==gf(c))return!1;for(let l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!ht(a[l],c[l])))return!1;return!0}(n,e);default:return U()}}function ei(n,e){return(n.values||[]).find(t=>ht(t,e))!==void 0}function Wn(n,e){if(n===e)return 0;let t=yn(n),r=yn(e);if(t!==r)return ee(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(s,a){let c=le(s.integerValue||s.doubleValue),l=le(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return yf(n.timestampValue,e.timestampValue);case 4:return yf(Zr(n),Zr(e));case 5:return ee(n.stringValue,e.stringValue);case 6:return function(s,a){let c=jt(s),l=jt(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let c=s.split("/"),l=a.split("/");for(let f=0;f<c.length&&f<l.length;f++){let p=ee(c[f],l[f]);if(p!==0)return p}return ee(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let c=ee(le(s.latitude),le(a.latitude));return c!==0?c:ee(le(s.longitude),le(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,a){let c=s.values||[],l=a.values||[];for(let f=0;f<c.length&&f<l.length;++f){let p=Wn(c[f],l[f]);if(p)return p}return ee(c.length,l.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,a){if(s===Cs.mapValue&&a===Cs.mapValue)return 0;if(s===Cs.mapValue)return 1;if(a===Cs.mapValue)return-1;let c=s.fields||{},l=Object.keys(c),f=a.fields||{},p=Object.keys(f);l.sort(),p.sort();for(let y=0;y<l.length&&y<p.length;++y){let v=ee(l[y],p[y]);if(v!==0)return v;let S=Wn(c[l[y]],f[p[y]]);if(S!==0)return S}return ee(l.length,p.length)}(n.mapValue,e.mapValue);default:throw U()}}function yf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);let t=Tt(n),r=Tt(e),i=ee(t.seconds,r.seconds);return i!==0?i:ee(t.nanos,r.nanos)}function Hn(n){return Dc(n)}function Dc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=Tt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return jt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Dc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+=`${a}:${Dc(t.fields[a])}`;return i+"}"}(n.mapValue):U()}function _f(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Nc(n){return!!n&&"integerValue"in n}function ll(n){return!!n&&"arrayValue"in n}function vf(n){return!!n&&"nullValue"in n}function wf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function xs(n){return!!n&&"mapValue"in n}function Wr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return En(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Wr(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Wr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Yf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var Fe=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!xs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Wr(t)}setAll(e){let t=qe.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=Wr(a):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());xs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ht(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];xs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){En(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(Wr(this.value))}};function Jf(n){let e=[];return En(n.fields,(t,r)=>{let i=new qe([t]);if(xs(r)){let s=Jf(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new Qe(e)}var ze=class n{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new n(e,0,j.min(),j.min(),j.min(),Fe.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,j.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,j.min(),j.min(),Fe.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,j.min(),j.min(),Fe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Fe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Fe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Qn=class{constructor(e,t){this.position=e,this.inclusive=t}};function If(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=Wn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ef(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ht(n.position[t],e.position[t]))return!1;return!0}var _n=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Dv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Us=class{},pe=class n extends Us{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Vc(e,t,r):t==="array-contains"?new Fc(e,r):t==="in"?new Uc(e,r):t==="not-in"?new Bc(e,r):t==="array-contains-any"?new qc(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Mc(e,r):new Lc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Wn(t,this.value)):t!==null&&yn(this.value)===yn(t)&&this.matchesComparison(Wn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},et=class n extends Us{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return $f(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function $f(n){return n.op==="and"}function Xf(n){return Nv(n)&&$f(n)}function Nv(n){for(let e of n.filters)if(e instanceof et)return!1;return!0}function Oc(n){if(n instanceof pe)return n.field.canonicalString()+n.op.toString()+Hn(n.value);if(Xf(n))return n.filters.map(e=>Oc(e)).join(",");{let e=n.filters.map(t=>Oc(t)).join(",");return`${n.op}(${e})`}}function Zf(n,e){return n instanceof pe?function(r,i){return i instanceof pe&&r.op===i.op&&r.field.isEqual(i.field)&&ht(r.value,i.value)}(n,e):n instanceof et?function(r,i){return i instanceof et&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&Zf(a,i.filters[c]),!0):!1}(n,e):void U()}function ep(n){return n instanceof pe?function(t){return`${t.field.canonicalString()} ${t.op} ${Hn(t.value)}`}(n):n instanceof et?function(t){return t.op.toString()+" {"+t.getFilters().map(ep).join(" ,")+"}"}(n):"Filter"}var Vc=class extends pe{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){let t=F.comparator(e.key,this.key);return this.matchesComparison(t)}},Mc=class extends pe{constructor(e,t){super(e,"in",t),this.keys=tp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Lc=class extends pe{constructor(e,t){super(e,"not-in",t),this.keys=tp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function tp(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>F.fromName(r.referenceValue))}var Fc=class extends pe{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ll(t)&&ei(t.arrayValue,this.value)}},Uc=class extends pe{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&ei(this.value.arrayValue,t)}},Bc=class extends pe{constructor(e,t){super(e,"not-in",t)}matches(e){if(ei(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!ei(this.value.arrayValue,t)}},qc=class extends pe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ll(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ei(this.value.arrayValue,r))}};var jc=class{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.ue=null}};function Tf(n,e=null,t=[],r=[],i=null,s=null,a=null){return new jc(n,e,t,r,i,s,a)}function hl(n){let e=z(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Oc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),pi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Hn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Hn(r)).join(",")),e.ue=t}return e.ue}function dl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Dv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Zf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ef(n.startAt,e.startAt)&&Ef(n.endAt,e.endAt)}function zc(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var zt=class{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function Ov(n,e,t,r,i,s,a,c){return new zt(n,e,t,r,i,s,a,c)}function fl(n){return new zt(n)}function bf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function np(n){return n.collectionGroup!==null}function Hr(n){let e=z(n);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new xe(qe.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new _n(s,r))}),t.has(qe.keyField().canonicalString())||e.ce.push(new _n(qe.keyField(),r))}return e.ce}function lt(n){let e=z(n);return e.le||(e.le=Vv(e,Hr(n))),e.le}function Vv(n,e){if(n.limitType==="F")return Tf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new _n(i.field,s)});let t=n.endAt?new Qn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Qn(n.startAt.position,n.startAt.inclusive):null;return Tf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Gc(n,e){let t=n.filters.concat([e]);return new zt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Bs(n,e,t){return new zt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ho(n,e){return dl(lt(n),lt(e))&&n.limitType===e.limitType}function rp(n){return`${hl(lt(n))}|lt:${n.limitType}`}function Fn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>ep(i)).join(", ")}]`),pi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Hn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Hn(i)).join(",")),`Target(${r})`}(lt(n))}; limitType=${n.limitType})`}function fo(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):F.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of Hr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,l){let f=If(a,c,l);return a.inclusive?f<=0:f<0}(r.startAt,Hr(r),i)||r.endAt&&!function(a,c,l){let f=If(a,c,l);return a.inclusive?f>=0:f>0}(r.endAt,Hr(r),i))}(n,e)}function Mv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ip(n){return(e,t)=>{let r=!1;for(let i of Hr(n)){let s=Lv(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Lv(n,e,t){let r=n.field.isKeyField()?F.comparator(e.key,t.key):function(s,a,c){let l=a.data.field(s),f=c.data.field(s);return l!==null&&f!==null?Wn(l,f):U()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U()}}var Gt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){En(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return Qf(this.inner)}size(){return this.innerSize}};var Fv=new he(F.comparator);function bt(){return Fv}var sp=new he(F.comparator);function Kr(...n){let e=sp;for(let t of n)e=e.insert(t.key,t);return e}function op(n){let e=sp;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function fn(){return Qr()}function ap(){return Qr()}function Qr(){return new Gt(n=>n.toString(),(n,e)=>n.isEqual(e))}var Uv=new he(F.comparator),Bv=new xe(F.comparator);function Y(...n){let e=Bv;for(let t of n)e=e.add(t);return e}var qv=new xe(ee);function jv(){return qv}function cp(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Xr(e)?"-0":e}}function up(n){return{integerValue:""+n}}function zv(n,e){return Rv(e)?up(e):cp(n,e)}var Yn=class{constructor(){this._=void 0}};function Gv(n,e,t){return n instanceof vn?function(i,s){let a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&cl(s)&&(s=ul(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(t,e):n instanceof Kt?hp(n,e):n instanceof Wt?dp(n,e):function(i,s){let a=lp(i,s),c=Af(a)+Af(i.Pe);return Nc(a)&&Nc(i.Pe)?up(c):cp(i.serializer,c)}(n,e)}function Kv(n,e,t){return n instanceof Kt?hp(n,e):n instanceof Wt?dp(n,e):t}function lp(n,e){return n instanceof Jn?function(r){return Nc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var vn=class extends Yn{},Kt=class extends Yn{constructor(e){super(),this.elements=e}};function hp(n,e){let t=fp(e);for(let r of n.elements)t.some(i=>ht(i,r))||t.push(r);return{arrayValue:{values:t}}}var Wt=class extends Yn{constructor(e){super(),this.elements=e}};function dp(n,e){let t=fp(e);for(let r of n.elements)t=t.filter(i=>!ht(i,r));return{arrayValue:{values:t}}}var Jn=class extends Yn{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function Af(n){return le(n.integerValue||n.doubleValue)}function fp(n){return ll(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var ti=class{constructor(e,t){this.field=e,this.transform=t}};function Wv(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Kt&&i instanceof Kt||r instanceof Wt&&i instanceof Wt?Kn(r.elements,i.elements,ht):r instanceof Jn&&i instanceof Jn?ht(r.Pe,i.Pe):r instanceof vn&&i instanceof vn}(n.transform,e.transform)}var Kc=class{constructor(e,t){this.version=e,this.transformResults=t}},Ie=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Ds(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var $n=class{};function pp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new In(n.key,Ie.none()):new wn(n.key,n.data,Ie.none());{let t=n.data,r=Fe.empty(),i=new xe(qe.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new dt(n.key,r,new Qe(i.toArray()),Ie.none())}}function Hv(n,e,t){n instanceof wn?function(i,s,a){let c=i.value.clone(),l=Rf(i.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof dt?function(i,s,a){if(!Ds(i.precondition,s))return void s.convertToUnknownDocument(a.version);let c=Rf(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(mp(i)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Yr(n,e,t,r){return n instanceof wn?function(s,a,c,l){if(!Ds(s.precondition,a))return c;let f=s.value.clone(),p=Pf(s.fieldTransforms,l,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof dt?function(s,a,c,l){if(!Ds(s.precondition,a))return c;let f=Pf(s.fieldTransforms,l,a),p=a.data;return p.setAll(mp(s)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(s,a,c){return Ds(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Qv(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=lp(r.transform,i||null);s!=null&&(t===null&&(t=Fe.empty()),t.set(r.field,s))}return t||null}function Sf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Kn(r,i,(s,a)=>Wv(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var wn=class extends $n{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},dt=class extends $n{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function mp(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Rf(n,e,t){let r=new Map;ne(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,Kv(a,c,t[i]))}return r}function Pf(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,Gv(s,a,e))}return r}var In=class extends $n{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},qs=class extends $n{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var Wc=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&Hv(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Yr(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Yr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=ap();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;let l=pp(a,c);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(j.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&Kn(this.mutations,e.mutations,(t,r)=>Sf(t,r))&&Kn(this.baseMutations,e.baseMutations,(t,r)=>Sf(t,r))}},Hc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ne(e.mutations.length===r.length);let i=function(){return Uv}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var Qc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Yc=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var de,X;function gp(n){switch(n){default:return U();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function yp(n){if(n===void 0)return Et("GRPC error has no .code"),P.UNKNOWN;switch(n){case de.OK:return P.OK;case de.CANCELLED:return P.CANCELLED;case de.UNKNOWN:return P.UNKNOWN;case de.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case de.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case de.INTERNAL:return P.INTERNAL;case de.UNAVAILABLE:return P.UNAVAILABLE;case de.UNAUTHENTICATED:return P.UNAUTHENTICATED;case de.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case de.NOT_FOUND:return P.NOT_FOUND;case de.ALREADY_EXISTS:return P.ALREADY_EXISTS;case de.PERMISSION_DENIED:return P.PERMISSION_DENIED;case de.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case de.ABORTED:return P.ABORTED;case de.OUT_OF_RANGE:return P.OUT_OF_RANGE;case de.UNIMPLEMENTED:return P.UNIMPLEMENTED;case de.DATA_LOSS:return P.DATA_LOSS;default:return U()}}(X=de||(de={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";var Cf=null;function Yv(){return new TextEncoder}var Jv=new Ft([4294967295,4294967295],0);function kf(n){let e=Yv().encode(n),t=new dc;return t.update(e),new Uint8Array(t.digest())}function xf(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ft([t,r],0),new Ft([i,s],0)]}var Jc=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new pn(`Invalid padding: ${t}`);if(r<0)throw new pn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new pn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new pn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Ft.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Ft.fromNumber(r)));return i.compare(Jv)===1&&(i=new Ft([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;let t=kf(e),[r,i]=xf(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;let t=kf(e),[r,i]=xf(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},pn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var js=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,ni.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(j.min(),i,new he(ee),bt(),Y())}},ni=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,Y(),Y(),Y())}};var jn=class{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}},zs=class{constructor(e,t){this.targetId=e,this.me=t}},Gs=class{constructor(e,t,r=Ve.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Ks=class{constructor(){this.fe=0,this.ge=Nf(),this.pe=Ve.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=Y(),t=Y(),r=Y();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:U()}}),new ni(this.pe,this.ye,e,t,r)}ve(){this.we=!1,this.ge=Nf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ne(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},$c=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=bt(),this.qe=Df(),this.Qe=new he(ee)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:U()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){let t=e.targetId,r=e.me.count,i=this.Je(t);if(i){let s=i.target;if(zc(s))if(r===0){let a=new F(s.path);this.Ue(t,a,ze.newNoDocument(a,j.min()))}else ne(r===1);else{let a=this.Ye(t);if(a!==r){let c=this.Ze(e),l=c?this.Xe(c,e,a):1;if(l!==0){this.je(t);let f=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,f)}Cf==null||Cf.et(function(p,y,v,S,k){var V,x,G,q,B,te;let ve={localCacheCount:p,existenceFilterCount:y.count,databaseId:v.database,projectId:v.projectId},$=y.unchangedNames;return $&&(ve.bloomFilter={applied:k===0,hashCount:(V=$==null?void 0:$.hashCount)!==null&&V!==void 0?V:0,bitmapLength:(q=(G=(x=$==null?void 0:$.bits)===null||x===void 0?void 0:x.bitmap)===null||G===void 0?void 0:G.length)!==null&&q!==void 0?q:0,padding:(te=(B=$==null?void 0:$.bits)===null||B===void 0?void 0:B.padding)!==null&&te!==void 0?te:0,mightContain:E=>{var g;return(g=S==null?void 0:S.mightContain(E))!==null&&g!==void 0&&g}}),ve}(a,e.me,this.Le.tt(),c,l))}}}}Ze(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,c;try{a=jt(r).toUint8Array()}catch(l){if(l instanceof Ls)return Gn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Jc(a,i,s)}catch(l){return Gn(l instanceof pn?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){let r=this.Le.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){let t=new Map;this.Be.forEach((s,a)=>{let c=this.Je(a);if(c){if(s.current&&zc(c.target)){let l=new F(c.target.path);this.ke.get(l)!==null||this.it(a,l)||this.Ue(a,l,ze.newNoDocument(l,e))}s.be&&(t.set(a,s.Ce()),s.ve())}});let r=Y();this.qe.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{let f=this.Je(l);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));let i=new js(e,t,this.Qe,this.ke,r);return this.ke=bt(),this.qe=Df(),this.Qe=new he(ee),i}$e(e,t){if(!this.ze(e))return;let r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;let i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Ks,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new xe(ee),this.qe=this.qe.insert(e,t)),t}ze(e){let t=this.Je(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Ks),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function Df(){return new he(F.comparator)}function Nf(){return new he(F.comparator)}var $v={asc:"ASCENDING",desc:"DESCENDING"},Xv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Zv={and:"AND",or:"OR"},Xc=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Zc(n,e){return n.useProto3Json||pi(e)?e:{value:e}}function Ws(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function _p(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ew(n,e){return Ws(n,e.toTimestamp())}function je(n){return ne(!!n),j.fromTimestamp(function(t){let r=Tt(t);return new ye(r.seconds,r.nanos)}(n))}function pl(n,e){return eu(n,e).canonicalString()}function eu(n,e){let t=function(i){return new oe(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function vp(n){let e=oe.fromString(n);return ne(Ap(e)),e}function Hs(n,e){return pl(n.databaseId,e.path)}function Jr(n,e){let t=vp(e);if(t.get(1)!==n.databaseId.projectId)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(Ip(t))}function wp(n,e){return pl(n.databaseId,e)}function tw(n){let e=vp(n);return e.length===4?oe.emptyPath():Ip(e)}function tu(n){return new oe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ip(n){return ne(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Of(n,e,t){return{name:Hs(n,e),fields:t.value.mapValue.fields}}function nw(n,e){return"found"in e?function(r,i){ne(!!i.found),i.found.name,i.found.updateTime;let s=Jr(r,i.found.name),a=je(i.found.updateTime),c=i.found.createTime?je(i.found.createTime):j.min(),l=new Fe({mapValue:{fields:i.found.fields}});return ze.newFoundDocument(s,a,c,l)}(n,e):"missing"in e?function(r,i){ne(!!i.missing),ne(!!i.readTime);let s=Jr(r,i.missing),a=je(i.readTime);return ze.newNoDocument(s,a)}(n,e):U()}function rw(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:U()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(f,p){return f.useProto3Json?(ne(p===void 0||typeof p=="string"),Ve.fromBase64String(p||"")):(ne(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Ve.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(f){let p=f.code===void 0?P.UNKNOWN:yp(f.code);return new O(p,f.message||"")}(a);t=new Gs(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=Jr(n,r.document.name),s=je(r.document.updateTime),a=r.document.createTime?je(r.document.createTime):j.min(),c=new Fe({mapValue:{fields:r.document.fields}}),l=ze.newFoundDocument(i,s,a,c),f=r.targetIds||[],p=r.removedTargetIds||[];t=new jn(f,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=Jr(n,r.document),s=r.readTime?je(r.readTime):j.min(),a=ze.newNoDocument(i,s),c=r.removedTargetIds||[];t=new jn([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=Jr(n,r.document),s=r.removedTargetIds||[];t=new jn([],s,i,null)}else{if(!("filter"in e))return U();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new Yc(i,s),c=r.targetId;t=new zs(c,a)}}return t}function Ep(n,e){let t;if(e instanceof wn)t={update:Of(n,e.key,e.value)};else if(e instanceof In)t={delete:Hs(n,e.key)};else if(e instanceof dt)t={update:Of(n,e.key,e.data),updateMask:dw(e.fieldMask)};else{if(!(e instanceof qs))return U();t={verify:Hs(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let c=a.transform;if(c instanceof vn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Kt)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Wt)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Jn)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw U()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:ew(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:U()}(n,e.precondition)),t}function iw(n,e){return n&&n.length>0?(ne(e!==void 0),n.map(t=>function(i,s){let a=i.updateTime?je(i.updateTime):je(s);return a.isEqual(j.min())&&(a=je(s)),new Kc(a,i.transformResults||[])}(t,e))):[]}function sw(n,e){return{documents:[wp(n,e.path)]}}function ow(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=wp(n,i);let s=function(f){if(f.length!==0)return bp(et.create(f,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(f){if(f.length!==0)return f.map(p=>function(v){return{field:Un(v.field),direction:uw(v.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let c=Zc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{_t:t,parent:i}}function aw(n){let e=tw(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){ne(r===1);let p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(y){let v=Tp(y);return v instanceof et&&Xf(v)?v.getFilters():[v]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(v=>function(k){return new _n(Bn(k.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(v))}(t.orderBy));let c=null;t.limit&&(c=function(y){let v;return v=typeof y=="object"?y.value:y,pi(v)?null:v}(t.limit));let l=null;t.startAt&&(l=function(y){let v=!!y.before,S=y.values||[];return new Qn(S,v)}(t.startAt));let f=null;return t.endAt&&(f=function(y){let v=!y.before,S=y.values||[];return new Qn(S,v)}(t.endAt)),Ov(e,i,a,s,c,"F",l,f)}function cw(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Tp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Bn(t.unaryFilter.field);return pe.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Bn(t.unaryFilter.field);return pe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Bn(t.unaryFilter.field);return pe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=Bn(t.unaryFilter.field);return pe.create(a,"!=",{nullValue:"NULL_VALUE"});default:return U()}}(n):n.fieldFilter!==void 0?function(t){return pe.create(Bn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return U()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return et.create(t.compositeFilter.filters.map(r=>Tp(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return U()}}(t.compositeFilter.op))}(n):U()}function uw(n){return $v[n]}function lw(n){return Xv[n]}function hw(n){return Zv[n]}function Un(n){return{fieldPath:n.canonicalString()}}function Bn(n){return qe.fromServerFormat(n.fieldPath)}function bp(n){return n instanceof pe?function(t){if(t.op==="=="){if(wf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NAN"}};if(vf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NOT_NAN"}};if(vf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Un(t.field),op:lw(t.op),value:t.value}}}(n):n instanceof et?function(t){let r=t.getFilters().map(i=>bp(i));return r.length===1?r[0]:{compositeFilter:{op:hw(t.op),filters:r}}}(n):U()}function dw(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ap(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var ri=class n{constructor(e,t,r,i,s=j.min(),a=j.min(),c=Ve.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var nu=class{constructor(e){this.ct=e}};function fw(n){let e=aw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Bs(e,e.limit,"L"):e}var Qs=class{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(le(e.integerValue));else if("doubleValue"in e){let r=le(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),Xr(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),typeof r=="string"&&(r=Tt(r)),t.At(`${r.seconds||""}`),t.dt(r.nanos||0)}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(jt(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?Yf(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):U()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};this.Et(t,55);for(let i of Object.keys(r))this.Rt(i,t),this.It(r[i],t)}wt(e,t){let r=e.values||[];this.Et(t,50);for(let i of r)this.It(i,t)}gt(e,t){this.Et(t,37),F.fromName(e).path.forEach(r=>{this.Et(t,60),this.St(r,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}};Qs.bt=new Qs;var ru=class{constructor(){this._n=new iu}addToCollectionParentIndex(e,t){return this._n.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(gn.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(gn.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}},iu=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new xe(oe.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new xe(oe.comparator)).toArray()}};var pb=new Uint8Array(0);var at=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};at.DEFAULT_COLLECTION_PERCENTILE=10,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,at.DEFAULT=new at(41943040,at.DEFAULT_COLLECTION_PERCENTILE,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),at.DISABLED=new at(-1,0,0);var ii=class n{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new n(0)}static Ln(){return new n(-1)}};var su=class{constructor(){this.changes=new Gt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ze.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var ou=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var au=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Yr(r.mutation,i,Qe.empty(),ye.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Y()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Y()){let i=fn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Kr();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=fn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Y()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=bt(),a=Qr(),c=function(){return Qr()}();return t.forEach((l,f)=>{let p=r.get(f.key);i.has(f.key)&&(p===void 0||p.mutation instanceof dt)?s=s.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),Yr(p.mutation,f,p.mutation.getFieldMask(),ye.now())):a.set(f.key,Qe.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((f,p)=>a.set(f,p)),t.forEach((f,p)=>{var y;return c.set(f,new ou(p,(y=a.get(f))!==null&&y!==void 0?y:null))}),c))}recalculateAndSaveOverlays(e,t){let r=Qr(),i=new he((a,c)=>a-c),s=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let c of a)c.keys().forEach(l=>{let f=t.get(l);if(f===null)return;let p=r.get(l)||Qe.empty();p=c.applyToLocalView(f,p),r.set(l,p);let y=(i.get(c.batchId)||Y()).add(l);i=i.insert(c.batchId,y)})}).next(()=>{let a=[],c=i.getReverseIterator();for(;c.hasNext();){let l=c.getNext(),f=l.key,p=l.value,y=ap();p.forEach(v=>{if(!s.has(v)){let S=pp(t.get(v),r.get(v));S!==null&&y.set(v,S),s=s.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,y))}return D.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return F.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):np(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):D.resolve(fn()),c=-1,l=s;return a.next(f=>D.forEach(f,(p,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),s.get(p)?D.resolve():this.remoteDocumentCache.getEntry(e,p).next(v=>{l=l.insert(p,v)}))).next(()=>this.populateOverlays(e,f,s)).next(()=>this.computeViews(e,l,f,Y())).next(p=>({batchId:c,changes:op(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let i=Kr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=Kr();return this.indexManager.getCollectionParents(e,s).next(c=>D.forEach(c,l=>{let f=function(y,v){return new zt(v,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,f,r,i).next(p=>{p.forEach((y,v)=>{a=a.insert(y,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,f)=>{let p=f.getKey();a.get(p)===null&&(a=a.insert(p,ze.newInvalidDocument(p)))});let c=Kr();return a.forEach((l,f)=>{let p=s.get(l);p!==void 0&&Yr(p.mutation,f,Qe.empty(),ye.now()),fo(t,f)&&(c=c.insert(l,f))}),c})}};var cu=class{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return D.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:je(i.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,function(i){return{name:i.name,query:fw(i.bundledQuery),readTime:je(i.readTime)}}(t)),D.resolve()}};var uu=class{constructor(){this.overlays=new he(F.comparator),this.hr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){let r=fn();return D.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),D.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.hr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.hr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){let i=fn(),s=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){let l=c.getNext().value,f=l.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return D.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new he((f,p)=>f-p),a=this.overlays.getIterator();for(;a.hasNext();){let f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let p=s.get(f.largestBatchId);p===null&&(p=fn(),s=s.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}let c=fn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((f,p)=>c.set(f,p)),!(c.size()>=i)););return D.resolve(c)}ht(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.hr.get(i.largestBatchId).delete(r.key);this.hr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Qc(t,r));let s=this.hr.get(t);s===void 0&&(s=Y(),this.hr.set(t,s)),this.hr.set(t,s.add(r.key))}};var si=class{constructor(){this.Pr=new xe(fe.Ir),this.Tr=new xe(fe.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new fe(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ar(new fe(e,t))}Rr(e,t){e.forEach(r=>this.removeReference(r,t))}Vr(e){let t=new F(new oe([])),r=new fe(t,e),i=new fe(t,e+1),s=[];return this.Tr.forEachInRange([r,i],a=>{this.Ar(a),s.push(a.key)}),s}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new F(new oe([])),r=new fe(t,e),i=new fe(t,e+1),s=Y();return this.Tr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new fe(e,0),r=this.Pr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},fe=class{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return F.comparator(e.key,t.key)||ee(e.pr,t.pr)}static Er(e,t){return ee(e.pr,t.pr)||F.comparator(e.key,t.key)}};var lu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new xe(fe.Ir)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new Wc(s,t,r,i);this.mutationQueue.push(a);for(let c of i)this.wr=this.wr.add(new fe(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.br(r),s=i<0?0:i;return D.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?-1:this.yr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new fe(t,0),i=new fe(t,Number.POSITIVE_INFINITY),s=[];return this.wr.forEachInRange([r,i],a=>{let c=this.Sr(a.pr);s.push(c)}),D.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new xe(ee);return t.forEach(i=>{let s=new fe(i,0),a=new fe(i,Number.POSITIVE_INFINITY);this.wr.forEachInRange([s,a],c=>{r=r.add(c.pr)})}),D.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;F.isDocumentKey(s)||(s=s.child(""));let a=new fe(new F(s),0),c=new xe(ee);return this.wr.forEachWhile(l=>{let f=l.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(c=c.add(l.pr)),!0)},a),D.resolve(this.Dr(c))}Dr(e){let t=[];return e.forEach(r=>{let i=this.Sr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ne(this.Cr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.wr;return D.forEach(t.mutations,i=>{let s=new fe(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new fe(t,0),i=this.wr.firstAfterOrEqual(r);return D.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Cr(e,t){return this.br(e)}br(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var hu=class{constructor(e){this.vr=e,this.docs=function(){return new he(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():ze.newInvalidDocument(t))}getEntries(e,t){let r=bt();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ze.newInvalidDocument(i))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=bt(),a=t.path,c=new F(a.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:f,value:{document:p}}=l.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||bv(Tv(p),r)<=0||(i.has(p.key)||fo(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return D.resolve(s)}getAllFromCollectionGroup(e,t,r,i){U()}Fr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new du(this)}getSize(e){return D.resolve(this.size)}},du=class extends su{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ar.addEntry(e,i)):this.ar.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}};var fu=class{constructor(e){this.persistence=e,this.Mr=new Gt(t=>hl(t),dl),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.Or=0,this.Nr=new si,this.targetCount=0,this.Lr=ii.Nn()}forEachTarget(e,t){return this.Mr.forEach((r,i)=>t(i)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),D.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new ii(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.qn(t),D.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Mr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Mr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),D.waitFor(s).next(()=>i)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),D.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),D.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Nr.containsKey(t))}};var pu=class{constructor(e,t){this.Br={},this.overlays={},this.kr=new $r(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new fu(this),this.indexManager=new ru,this.remoteDocumentCache=function(i){return new hu(i)}(r=>this.referenceDelegate.Kr(r)),this.serializer=new nu(t),this.$r=new cu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new uu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Br[e.toKey()];return r||(r=new lu(t,this.referenceDelegate),this.Br[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);let i=new mu(this.kr.next());return this.referenceDelegate.Ur(),r(i).next(s=>this.referenceDelegate.Wr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Gr(e,t){return D.or(Object.values(this.Br).map(r=>()=>r.containsKey(e,t)))}},mu=class extends kc{constructor(e){super(),this.currentSequenceNumber=e}},gu=class n{constructor(e){this.persistence=e,this.zr=new si,this.jr=null}static Hr(e){return new n(e)}get Jr(){if(this.jr)return this.jr;throw U()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),D.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(i=>this.Jr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Jr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.Jr,r=>{let i=F.fromPath(r);return this.Yr(e,i).next(s=>{s||t.removeEntry(i,j.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(r=>{r?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return D.or([()=>D.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}};var yu=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=i}static Ki(e,t){let r=Y(),i=Y();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var _u=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var vu=class{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=function(){return Xh()?8:Sv(me())>0?6:4}()}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ji(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Hi(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new _u;return this.Ji(e,t,a).next(c=>{if(s.result=c,this.Ui)return this.Yi(e,t,a,c.size)})}).next(()=>s.result)}Yi(e,t,r,i){return r.documentReadCount<this.Wi?(Gr()<=H.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Fn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),D.resolve()):(Gr()<=H.DEBUG&&M("QueryEngine","Query:",Fn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Gi*i?(Gr()<=H.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Fn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,lt(t))):D.resolve())}ji(e,t){if(bf(t))return D.resolve(null);let r=lt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Bs(t,null,"F"),r=lt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=Y(...s);return this.zi.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{let f=this.Zi(t,c);return this.Xi(t,f,a,l.readTime)?this.ji(e,Bs(t,null,"F")):this.es(e,f,t,l)}))})))}Hi(e,t,r,i){return bf(t)||i.isEqual(j.min())?D.resolve(null):this.zi.getDocuments(e,r).next(s=>{let a=this.Zi(t,s);return this.Xi(t,a,r,i)?D.resolve(null):(Gr()<=H.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Fn(t)),this.es(e,a,t,Ev(i,-1)).next(c=>c))})}Zi(e,t){let r=new xe(ip(e));return t.forEach((i,s)=>{fo(e,s)&&(r=r.add(s))}),r}Xi(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ji(e,t,r){return Gr()<=H.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Fn(t)),this.zi.getDocumentsMatchingQuery(e,t,gn.min(),r)}es(e,t,r,i){return this.zi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var wu=class{constructor(e,t,r,i){this.persistence=e,this.ts=t,this.serializer=i,this.ns=new he(ee),this.rs=new Gt(s=>hl(s),dl),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new au(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}};function pw(n,e,t,r){return new wu(n,e,t,r)}async function Sp(n,e){let t=z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t._s(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],c=[],l=Y();for(let f of i){a.push(f.batchId);for(let p of f.mutations)l=l.add(p.key)}for(let f of s){c.push(f.batchId);for(let p of f.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(f=>({us:f,removedBatchIds:a,addedBatchIds:c}))})})}function mw(n,e){let t=z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.os.newChangeBuffer({trackRemovals:!0});return function(c,l,f,p){let y=f.batch,v=y.keys(),S=D.resolve();return v.forEach(k=>{S=S.next(()=>p.getEntry(l,k)).next(V=>{let x=f.docVersions.get(k);ne(x!==null),V.version.compareTo(x)<0&&(y.applyToRemoteDocument(V,f),V.isValidDocument()&&(V.setReadTime(f.commitVersion),p.addEntry(V)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(l,y))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=Y();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(l=l.add(c.batch.mutations[f].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Rp(n){let e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}function gw(n,e){let t=z(n),r=e.snapshotVersion,i=t.ns;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.os.newChangeBuffer({trackRemovals:!0});i=t.ns;let c=[];e.targetChanges.forEach((p,y)=>{let v=i.get(y);if(!v)return;c.push(t.Qr.removeMatchingKeys(s,p.removedDocuments,y).next(()=>t.Qr.addMatchingKeys(s,p.addedDocuments,y)));let S=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(y)!==null?S=S.withResumeToken(Ve.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(y,S),function(V,x,G){return V.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(v,S,p)&&c.push(t.Qr.updateTargetData(s,S))});let l=bt(),f=Y();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(yw(s,a,e.documentUpdates).next(p=>{l=p.cs,f=p.ls})),!r.isEqual(j.min())){let p=t.Qr.getLastRemoteSnapshotVersion(s).next(y=>t.Qr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return D.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,f)).next(()=>l)}).then(s=>(t.ns=i,s))}function yw(n,e,t){let r=Y(),i=Y();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=bt();return t.forEach((c,l)=>{let f=s.get(c);l.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(j.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!f.isValidDocument()||l.version.compareTo(f.version)>0||l.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):M("LocalStore","Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",l.version)}),{cs:a,ls:i}})}function _w(n,e){let t=z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function vw(n,e){let t=z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Qr.getTargetData(r,e).next(s=>s?(i=s,D.resolve(i)):t.Qr.allocateTargetId(r).next(a=>(i=new ri(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Qr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.ns.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ns=t.ns.insert(r.targetId,r),t.rs.set(e,r.targetId)),r})}async function Iu(n,e,t){let r=z(n),i=r.ns.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!fi(a))throw a;M("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.ns=r.ns.remove(e),r.rs.delete(i.target)}function Vf(n,e,t){let r=z(n),i=j.min(),s=Y();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,f,p){let y=z(l),v=y.rs.get(p);return v!==void 0?D.resolve(y.ns.get(v)):y.Qr.getTargetData(f,p)}(r,a,lt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Qr.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>r.ts.getDocumentsMatchingQuery(a,e,t?i:j.min(),t?s:Y())).next(c=>(ww(r,Mv(e),c),{documents:c,hs:s})))}function ww(n,e,t){let r=n.ss.get(e)||j.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.ss.set(e,r)}var Ys=class{constructor(){this.activeTargetIds=jv()}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Eu=class{constructor(){this.no=new Ys,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new Ys,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Tu=class{io(e){}shutdown(){}};var Js=class{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){M("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.uo)e(0)}ao(){M("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.uo)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var ks=null;function vc(){return ks===null?ks=function(){return 268435456+Math.round(2147483648*Math.random())}():ks++,"0x"+ks.toString(16)}var Iw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var bu=class{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}Ao(e){this.Ro=e}onMessage(e){this.Vo=e}close(){this.ho()}send(e){this.lo(e)}mo(){this.Io()}fo(){this.Eo()}po(e){this.Ro(e)}yo(e){this.Vo(e)}};var ke="WebChannelConnection",Au=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.wo=r+"://"+t.host,this.So=`projects/${i}/databases/${s}`,this.bo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Do(){return!1}Co(t,r,i,s,a){let c=vc(),l=this.vo(t,r.toUriEncodedString());M("RestConnection",`Sending RPC '${t}' ${c}:`,l,i);let f={"google-cloud-resource-prefix":this.So,"x-goog-request-params":this.bo};return this.Fo(f,s,a),this.Mo(t,l,f,i).then(p=>(M("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw Gn("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",l,"request:",i),p})}xo(t,r,i,s,a,c){return this.Co(t,r,i,s,a)}Fo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+nr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>t[a]=s),i&&i.headers.forEach((s,a)=>t[a]=s)}vo(t,r){let i=Iw[t];return`${this.wo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Mo(e,t,r,i){let s=vc();return new Promise((a,c)=>{let l=new fc;l.setWithCredentials(!0),l.listenOnce(mc.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case zr.NO_ERROR:let p=l.getResponseJson();M(ke,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),a(p);break;case zr.TIMEOUT:M(ke,`RPC '${e}' ${s} timed out`),c(new O(P.DEADLINE_EXCEEDED,"Request time out"));break;case zr.HTTP_ERROR:let y=l.getStatus();if(M(ke,`RPC '${e}' ${s} failed with status:`,y,"response text:",l.getResponseText()),y>0){let v=l.getResponseJson();Array.isArray(v)&&(v=v[0]);let S=v==null?void 0:v.error;if(S&&S.status&&S.message){let k=function(x){let G=x.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(G)>=0?G:P.UNKNOWN}(S.status);c(new O(k,S.message))}else c(new O(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new O(P.UNAVAILABLE,"Connection failed."));break;default:U()}}finally{M(ke,`RPC '${e}' ${s} completed.`)}});let f=JSON.stringify(i);M(ke,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",f,r,15)})}Oo(e,t,r){let i=vc(),s=[this.wo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=_c(),c=yc(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(l.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(l.xmlHttpFactory=new pc({})),this.Fo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let p=s.join("");M(ke,`Creating RPC '${e}' stream ${i}: ${p}`,l);let y=a.createWebChannel(p,l),v=!1,S=!1,k=new bu({lo:x=>{S?M(ke,`Not sending because RPC '${e}' stream ${i} is closed:`,x):(v||(M(ke,`Opening RPC '${e}' stream ${i} transport.`),y.open(),v=!0),M(ke,`RPC '${e}' stream ${i} sending:`,x),y.send(x))},ho:()=>y.close()}),V=(x,G,q)=>{x.listen(G,B=>{try{q(B)}catch(te){setTimeout(()=>{throw te},0)}})};return V(y,Ln.EventType.OPEN,()=>{S||(M(ke,`RPC '${e}' stream ${i} transport opened.`),k.mo())}),V(y,Ln.EventType.CLOSE,()=>{S||(S=!0,M(ke,`RPC '${e}' stream ${i} transport closed`),k.po())}),V(y,Ln.EventType.ERROR,x=>{S||(S=!0,Gn(ke,`RPC '${e}' stream ${i} transport errored:`,x),k.po(new O(P.UNAVAILABLE,"The operation could not be completed")))}),V(y,Ln.EventType.MESSAGE,x=>{var G;if(!S){let q=x.data[0];ne(!!q);let B=q,te=B.error||((G=B[0])===null||G===void 0?void 0:G.error);if(te){M(ke,`RPC '${e}' stream ${i} received error:`,te);let ve=te.status,$=function(w){let I=de[w];if(I!==void 0)return yp(I)}(ve),E=te.message;$===void 0&&($=P.INTERNAL,E="Unknown error status: "+ve+" with message "+te.message),S=!0,k.po(new O($,E)),y.close()}else M(ke,`RPC '${e}' stream ${i} received:`,q),k.yo(q)}}),V(c,gc.STAT_EVENT,x=>{x.stat===Ps.PROXY?M(ke,`RPC '${e}' stream ${i} detected buffering proxy`):x.stat===Ps.NOPROXY&&M(ke,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.fo()},0),k}};function wc(){return typeof document!="undefined"?document:null}function po(n){return new Xc(n,!0)}var oi=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.oi=e,this.timerId=t,this.No=r,this.Lo=i,this.Bo=s,this.ko=0,this.qo=null,this.Qo=Date.now(),this.reset()}reset(){this.ko=0}Ko(){this.ko=this.Bo}$o(e){this.cancel();let t=Math.floor(this.ko+this.Uo()),r=Math.max(0,Date.now()-this.Qo),i=Math.max(0,t-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.qo=this.oi.enqueueAfterDelay(this.timerId,i,()=>(this.Qo=Date.now(),e())),this.ko*=this.Lo,this.ko<this.No&&(this.ko=this.No),this.ko>this.Bo&&(this.ko=this.Bo)}Wo(){this.qo!==null&&(this.qo.skipDelay(),this.qo=null)}cancel(){this.qo!==null&&(this.qo.cancel(),this.qo=null)}Uo(){return(Math.random()-.5)*this.ko}};var $s=class{constructor(e,t,r,i,s,a,c,l){this.oi=e,this.Go=r,this.zo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.jo=0,this.Ho=null,this.Jo=null,this.stream=null,this.Yo=new oi(e,t)}Zo(){return this.state===1||this.state===5||this.Xo()}Xo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.e_()}async stop(){this.Zo()&&await this.close(0)}t_(){this.state=0,this.Yo.reset()}n_(){this.Xo()&&this.Ho===null&&(this.Ho=this.oi.enqueueAfterDelay(this.Go,6e4,()=>this.r_()))}i_(e){this.s_(),this.stream.send(e)}async r_(){if(this.Xo())return this.close(0)}s_(){this.Ho&&(this.Ho.cancel(),this.Ho=null)}o_(){this.Jo&&(this.Jo.cancel(),this.Jo=null)}async close(e,t){this.s_(),this.o_(),this.Yo.cancel(),this.jo++,e!==4?this.Yo.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Et(t.toString()),Et("Using maximum backoff delay to prevent overloading the backend."),this.Yo.Ko()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.__(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ao(t)}__(){}auth(){this.state=1;let e=this.a_(this.jo),t=this.jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.jo===t&&this.u_(r,i)},r=>{e(()=>{let i=new O(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.c_(i)})})}u_(e,t){let r=this.a_(this.jo);this.stream=this.l_(e,t),this.stream.Po(()=>{r(()=>this.listener.Po())}),this.stream.To(()=>{r(()=>(this.state=2,this.Jo=this.oi.enqueueAfterDelay(this.zo,1e4,()=>(this.Xo()&&(this.state=3),Promise.resolve())),this.listener.To()))}),this.stream.Ao(i=>{r(()=>this.c_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}e_(){this.state=5,this.Yo.$o(async()=>{this.state=0,this.start()})}c_(e){return M("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}a_(e){return t=>{this.oi.enqueueAndForget(()=>this.jo===e?t():(M("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Su=class extends $s{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}l_(e,t){return this.connection.Oo("Listen",e,t)}onMessage(e){this.Yo.reset();let t=rw(this.serializer,e),r=function(s){if(!("targetChange"in s))return j.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?j.min():a.readTime?je(a.readTime):j.min()}(e);return this.listener.h_(t,r)}P_(e){let t={};t.database=tu(this.serializer),t.addTarget=function(s,a){let c,l=a.target;if(c=zc(l)?{documents:sw(s,l)}:{query:ow(s,l)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=_p(s,a.resumeToken);let f=Zc(s,a.expectedCount);f!==null&&(c.expectedCount=f)}else if(a.snapshotVersion.compareTo(j.min())>0){c.readTime=Ws(s,a.snapshotVersion.toTimestamp());let f=Zc(s,a.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,e);let r=cw(this.serializer,e);r&&(t.labels=r),this.i_(t)}I_(e){let t={};t.database=tu(this.serializer),t.removeTarget=e,this.i_(t)}},Ru=class extends $s{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s,this.T_=!1}get E_(){return this.T_}start(){this.T_=!1,this.lastStreamToken=void 0,super.start()}__(){this.T_&&this.d_([])}l_(e,t){return this.connection.Oo("Write",e,t)}onMessage(e){if(ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.T_){this.Yo.reset();let t=iw(e.writeResults,e.commitTime),r=je(e.commitTime);return this.listener.A_(r,t)}return ne(!e.writeResults||e.writeResults.length===0),this.T_=!0,this.listener.R_()}V_(){let e={};e.database=tu(this.serializer),this.i_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Ep(this.serializer,r))};this.i_(t)}};var Pu=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.m_=!1}f_(){if(this.m_)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}Co(e,t,r,i){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Co(e,eu(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new O(P.UNKNOWN,s.toString())})}xo(e,t,r,i,s){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.xo(e,eu(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(P.UNKNOWN,a.toString())})}terminate(){this.m_=!0,this.connection.terminate()}},Cu=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.g_=0,this.p_=null,this.y_=!0}w_(){this.g_===0&&(this.S_("Unknown"),this.p_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.p_=null,this.b_("Backend didn't respond within 10 seconds."),this.S_("Offline"),Promise.resolve())))}D_(e){this.state==="Online"?this.S_("Unknown"):(this.g_++,this.g_>=1&&(this.C_(),this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.S_("Offline")))}set(e){this.C_(),this.g_=0,e==="Online"&&(this.y_=!1),this.S_(e)}S_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}b_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.y_?(Et(t),this.y_=!1):M("OnlineStateTracker",t)}C_(){this.p_!==null&&(this.p_.cancel(),this.p_=null)}};var ku=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.v_=[],this.F_=new Map,this.M_=new Set,this.x_=[],this.O_=s,this.O_.io(a=>{r.enqueueAndForget(async()=>{Tn(this)&&(M("RemoteStore","Restarting streams for network reachability change."),await async function(l){let f=z(l);f.M_.add(4),await mi(f),f.N_.set("Unknown"),f.M_.delete(4),await mo(f)}(this))})}),this.N_=new Cu(r,i)}};async function mo(n){if(Tn(n))for(let e of n.x_)await e(!0)}async function mi(n){for(let e of n.x_)await e(!1)}function Pp(n,e){let t=z(n);t.F_.has(e.targetId)||(t.F_.set(e.targetId,e),_l(t)?yl(t):rr(t).Xo()&&gl(t,e))}function ml(n,e){let t=z(n),r=rr(t);t.F_.delete(e),r.Xo()&&Cp(t,e),t.F_.size===0&&(r.Xo()?r.n_():Tn(t)&&t.N_.set("Unknown"))}function gl(n,e){if(n.L_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}rr(n).P_(e)}function Cp(n,e){n.L_.xe(e),rr(n).I_(e)}function yl(n){n.L_=new $c({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.F_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),rr(n).start(),n.N_.w_()}function _l(n){return Tn(n)&&!rr(n).Zo()&&n.F_.size>0}function Tn(n){return z(n).M_.size===0}function kp(n){n.L_=void 0}async function Ew(n){n.N_.set("Online")}async function Tw(n){n.F_.forEach((e,t)=>{gl(n,e)})}async function bw(n,e){kp(n),_l(n)?(n.N_.D_(e),yl(n)):n.N_.set("Unknown")}async function Aw(n,e,t){if(n.N_.set("Online"),e instanceof Gs&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let c of s.targetIds)i.F_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.F_.delete(c),i.L_.removeTarget(c))}(n,e)}catch(r){M("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Xs(n,r)}else if(e instanceof jn?n.L_.Ke(e):e instanceof zs?n.L_.He(e):n.L_.We(e),!t.isEqual(j.min()))try{let r=await Rp(n.localStore);t.compareTo(r)>=0&&await function(s,a){let c=s.L_.rt(a);return c.targetChanges.forEach((l,f)=>{if(l.resumeToken.approximateByteSize()>0){let p=s.F_.get(f);p&&s.F_.set(f,p.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,f)=>{let p=s.F_.get(l);if(!p)return;s.F_.set(l,p.withResumeToken(Ve.EMPTY_BYTE_STRING,p.snapshotVersion)),Cp(s,l);let y=new ri(p.target,l,f,p.sequenceNumber);gl(s,y)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){M("RemoteStore","Failed to raise snapshot:",r),await Xs(n,r)}}async function Xs(n,e,t){if(!fi(e))throw e;n.M_.add(1),await mi(n),n.N_.set("Offline"),t||(t=()=>Rp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M("RemoteStore","Retrying IndexedDB access"),await t(),n.M_.delete(1),await mo(n)})}function xp(n,e){return e().catch(t=>Xs(n,t,e))}async function go(n){let e=z(n),t=Ht(e),r=e.v_.length>0?e.v_[e.v_.length-1].batchId:-1;for(;Sw(e);)try{let i=await _w(e.localStore,r);if(i===null){e.v_.length===0&&t.n_();break}r=i.batchId,Rw(e,i)}catch(i){await Xs(e,i)}Dp(e)&&Np(e)}function Sw(n){return Tn(n)&&n.v_.length<10}function Rw(n,e){n.v_.push(e);let t=Ht(n);t.Xo()&&t.E_&&t.d_(e.mutations)}function Dp(n){return Tn(n)&&!Ht(n).Zo()&&n.v_.length>0}function Np(n){Ht(n).start()}async function Pw(n){Ht(n).V_()}async function Cw(n){let e=Ht(n);for(let t of n.v_)e.d_(t.mutations)}async function kw(n,e,t){let r=n.v_.shift(),i=Hc.from(r,e,t);await xp(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await go(n)}async function xw(n,e){e&&Ht(n).E_&&await async function(r,i){if(function(a){return gp(a)&&a!==P.ABORTED}(i.code)){let s=r.v_.shift();Ht(r).t_(),await xp(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await go(r)}}(n,e),Dp(n)&&Np(n)}async function Mf(n,e){let t=z(n);t.asyncQueue.verifyOperationInProgress(),M("RemoteStore","RemoteStore received new credentials");let r=Tn(t);t.M_.add(3),await mi(t),r&&t.N_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.M_.delete(3),await mo(t)}async function Dw(n,e){let t=z(n);e?(t.M_.delete(2),await mo(t)):e||(t.M_.add(2),await mi(t),t.N_.set("Unknown"))}function rr(n){return n.B_||(n.B_=function(t,r,i){let s=z(t);return s.f_(),new Su(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:Ew.bind(null,n),To:Tw.bind(null,n),Ao:bw.bind(null,n),h_:Aw.bind(null,n)}),n.x_.push(async e=>{e?(n.B_.t_(),_l(n)?yl(n):n.N_.set("Unknown")):(await n.B_.stop(),kp(n))})),n.B_}function Ht(n){return n.k_||(n.k_=function(t,r,i){let s=z(t);return s.f_(),new Ru(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:()=>Promise.resolve(),To:Pw.bind(null,n),Ao:xw.bind(null,n),R_:Cw.bind(null,n),A_:kw.bind(null,n)}),n.x_.push(async e=>{e?(n.k_.t_(),await go(n)):(await n.k_.stop(),n.v_.length>0&&(M("RemoteStore",`Stopping write stream with ${n.v_.length} pending writes`),n.v_=[]))})),n.k_}var xu=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,c=new n(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function vl(n,e){if(Et("AsyncQueue",`${e}: ${n}`),fi(n))return new O(P.UNAVAILABLE,`${e}: ${n}`);throw n}var Zs=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=Kr(),this.sortedSet=new he(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var eo=class{constructor(){this.q_=new he(F.comparator)}track(e){let t=e.doc.key,r=this.q_.get(t);r?e.type!==0&&r.type===3?this.q_=this.q_.insert(t,e):e.type===3&&r.type!==1?this.q_=this.q_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.q_=this.q_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.q_=this.q_.remove(t):e.type===1&&r.type===2?this.q_=this.q_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):U():this.q_=this.q_.insert(t,e)}Q_(){let e=[];return this.q_.inorderTraversal((t,r)=>{e.push(r)}),e}},Xn=class n{constructor(e,t,r,i,s,a,c,l,f){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=f}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new n(e,t,Zs.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ho(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Du=class{constructor(){this.K_=void 0,this.U_=[]}W_(){return this.U_.some(e=>e.G_())}},Nu=class{constructor(){this.queries=new Gt(e=>rp(e),ho),this.onlineState="Unknown",this.z_=new Set}};async function Nw(n,e){let t=z(n),r=3,i=e.query,s=t.queries.get(i);s?!s.W_()&&e.G_()&&(r=2):(s=new Du,r=e.G_()?0:1);try{switch(r){case 0:s.K_=await t.onListen(i,!0);break;case 1:s.K_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let c=vl(a,`Initialization of query '${Fn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.U_.push(e),e.j_(t.onlineState),s.K_&&e.H_(s.K_)&&wl(t)}async function Ow(n,e){let t=z(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.U_.indexOf(e);a>=0&&(s.U_.splice(a,1),s.U_.length===0?i=e.G_()?0:1:!s.W_()&&e.G_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Vw(n,e){let t=z(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let c of a.U_)c.H_(i)&&(r=!0);a.K_=i}}r&&wl(t)}function Mw(n,e,t){let r=z(n),i=r.queries.get(e);if(i)for(let s of i.U_)s.onError(t);r.queries.delete(e)}function wl(n){n.z_.forEach(e=>{e.next()})}var Ou,Lf;(Lf=Ou||(Ou={})).J_="default",Lf.Cache="cache";var Vu=class{constructor(e,t,r){this.query=e,this.Y_=t,this.Z_=!1,this.X_=null,this.onlineState="Unknown",this.options=r||{}}H_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Xn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Z_?this.ea(e)&&(this.Y_.next(e),t=!0):this.ta(e,this.onlineState)&&(this.na(e),t=!0),this.X_=e,t}onError(e){this.Y_.error(e)}j_(e){this.onlineState=e;let t=!1;return this.X_&&!this.Z_&&this.ta(this.X_,e)&&(this.na(this.X_),t=!0),t}ta(e,t){if(!e.fromCache||!this.G_())return!0;let r=t!=="Offline";return(!this.options.ra||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ea(e){if(e.docChanges.length>0)return!0;let t=this.X_&&this.X_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}na(e){e=Xn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Z_=!0,this.Y_.next(e)}G_(){return this.options.source!==Ou.Cache}};var to=class{constructor(e){this.key=e}},no=class{constructor(e){this.key=e}},Mu=class{constructor(e,t){this.query=e,this.la=t,this.ha=null,this.hasCachedResults=!1,this.current=!1,this.Pa=Y(),this.mutatedKeys=Y(),this.Ia=ip(e),this.Ta=new Zs(this.Ia)}get Ea(){return this.la}da(e,t){let r=t?t.Aa:new eo,i=t?t.Ta:this.Ta,s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,y)=>{let v=i.get(p),S=fo(this.query,y)?y:null,k=!!v&&this.mutatedKeys.has(v.key),V=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),x=!1;v&&S?v.data.isEqual(S.data)?k!==V&&(r.track({type:3,doc:S}),x=!0):this.Ra(v,S)||(r.track({type:2,doc:S}),x=!0,(l&&this.Ia(S,l)>0||f&&this.Ia(S,f)<0)&&(c=!0)):!v&&S?(r.track({type:0,doc:S}),x=!0):v&&!S&&(r.track({type:1,doc:v}),x=!0,(l||f)&&(c=!0)),x&&(S?(a=a.add(S),s=V?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{Ta:a,Aa:r,Xi:c,mutatedKeys:s}}Ra(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.Ta;this.Ta=e.Ta,this.mutatedKeys=e.mutatedKeys;let a=e.Aa.Q_();a.sort((p,y)=>function(S,k){let V=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U()}};return V(S)-V(k)}(p.type,y.type)||this.Ia(p.doc,y.doc)),this.Va(r),i=i!=null&&i;let c=t&&!i?this.ma():[],l=this.Pa.size===0&&this.current&&!i?1:0,f=l!==this.ha;return this.ha=l,a.length!==0||f?{snapshot:new Xn(this.query,e.Ta,s,a,e.mutatedKeys,l===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),fa:c}:{fa:c}}j_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ta:this.Ta,Aa:new eo,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{fa:[]}}ga(e){return!this.la.has(e)&&!!this.Ta.has(e)&&!this.Ta.get(e).hasLocalMutations}Va(e){e&&(e.addedDocuments.forEach(t=>this.la=this.la.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.la=this.la.delete(t)),this.current=e.current)}ma(){if(!this.current)return[];let e=this.Pa;this.Pa=Y(),this.Ta.forEach(r=>{this.ga(r.key)&&(this.Pa=this.Pa.add(r.key))});let t=[];return e.forEach(r=>{this.Pa.has(r)||t.push(new no(r))}),this.Pa.forEach(r=>{e.has(r)||t.push(new to(r))}),t}pa(e){this.la=e.hs,this.Pa=Y();let t=this.da(e.documents);return this.applyChanges(t,!0)}ya(){return Xn.fromInitialDocuments(this.query,this.Ta,this.mutatedKeys,this.ha===0,this.hasCachedResults)}},Lu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Fu=class{constructor(e){this.key=e,this.wa=!1}},Uu=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Sa={},this.ba=new Gt(c=>rp(c),ho),this.Da=new Map,this.Ca=new Set,this.va=new he(F.comparator),this.Fa=new Map,this.Ma=new si,this.xa={},this.Oa=new Map,this.Na=ii.Ln(),this.onlineState="Unknown",this.La=void 0}get isPrimaryClient(){return this.La===!0}};async function Lw(n,e,t=!0){let r=Up(n),i,s=r.ba.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.ya()):i=await Op(r,e,t,!0),i}async function Fw(n,e){let t=Up(n);await Op(t,e,!0,!1)}async function Op(n,e,t,r){let i=await vw(n.localStore,lt(e)),s=i.targetId,a=t?n.sharedClientState.addLocalQueryTarget(s):"not-current",c;return r&&(c=await Uw(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Pp(n.remoteStore,i),c}async function Uw(n,e,t,r,i){n.Ba=(y,v,S)=>async function(V,x,G,q){let B=x.view.da(G);B.Xi&&(B=await Vf(V.localStore,x.query,!1).then(({documents:E})=>x.view.da(E,B)));let te=q&&q.targetChanges.get(x.targetId),ve=q&&q.targetMismatches.get(x.targetId)!=null,$=x.view.applyChanges(B,V.isPrimaryClient,te,ve);return Uf(V,x.targetId,$.fa),$.snapshot}(n,y,v,S);let s=await Vf(n.localStore,e,!0),a=new Mu(e,s.hs),c=a.da(s.documents),l=ni.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),f=a.applyChanges(c,n.isPrimaryClient,l);Uf(n,t,f.fa);let p=new Lu(e,t,a);return n.ba.set(e,p),n.Da.has(t)?n.Da.get(t).push(e):n.Da.set(t,[e]),f.snapshot}async function Bw(n,e,t){let r=z(n),i=r.ba.get(e),s=r.Da.get(i.targetId);if(s.length>1)return r.Da.set(i.targetId,s.filter(a=>!ho(a,e))),void r.ba.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Iu(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&ml(r.remoteStore,i.targetId),Bu(r,i.targetId)}).catch(di)):(Bu(r,i.targetId),await Iu(r.localStore,i.targetId,!0))}async function qw(n,e){let t=z(n),r=t.ba.get(e),i=t.Da.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ml(t.remoteStore,r.targetId))}async function jw(n,e,t){let r=Yw(n);try{let i=await function(a,c){let l=z(a),f=ye.now(),p=c.reduce((S,k)=>S.add(k.key),Y()),y,v;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let k=bt(),V=Y();return l.os.getEntries(S,p).next(x=>{k=x,k.forEach((G,q)=>{q.isValidDocument()||(V=V.add(G))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,k)).next(x=>{y=x;let G=[];for(let q of c){let B=Qv(q,y.get(q.key).overlayedDocument);B!=null&&G.push(new dt(q.key,B,Jf(B.value.mapValue),Ie.exists(!0)))}return l.mutationQueue.addMutationBatch(S,f,G,c)}).next(x=>{v=x;let G=x.applyToLocalDocumentSet(y,V);return l.documentOverlayCache.saveOverlays(S,x.batchId,G)})}).then(()=>({batchId:v.batchId,changes:op(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,l){let f=a.xa[a.currentUser.toKey()];f||(f=new he(ee)),f=f.insert(c,l),a.xa[a.currentUser.toKey()]=f}(r,i.batchId,t),await gi(r,i.changes),await go(r.remoteStore)}catch(i){let s=vl(i,"Failed to persist write");t.reject(s)}}async function Vp(n,e){let t=z(n);try{let r=await gw(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Fa.get(s);a&&(ne(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.wa=!0:i.modifiedDocuments.size>0?ne(a.wa):i.removedDocuments.size>0&&(ne(a.wa),a.wa=!1))}),await gi(t,r,e)}catch(r){await di(r)}}function Ff(n,e,t){let r=z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.ba.forEach((s,a)=>{let c=a.view.j_(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){let l=z(a);l.onlineState=c;let f=!1;l.queries.forEach((p,y)=>{for(let v of y.U_)v.j_(c)&&(f=!0)}),f&&wl(l)}(r.eventManager,e),i.length&&r.Sa.h_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function zw(n,e,t){let r=z(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Fa.get(e),s=i&&i.key;if(s){let a=new he(F.comparator);a=a.insert(s,ze.newNoDocument(s,j.min()));let c=Y().add(s),l=new js(j.min(),new Map,new he(ee),a,c);await Vp(r,l),r.va=r.va.remove(s),r.Fa.delete(e),Il(r)}else await Iu(r.localStore,e,!1).then(()=>Bu(r,e,t)).catch(di)}async function Gw(n,e){let t=z(n),r=e.batch.batchId;try{let i=await mw(t.localStore,e);Lp(t,r,null),Mp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await gi(t,i)}catch(i){await di(i)}}async function Kw(n,e,t){let r=z(n);try{let i=await function(a,c){let l=z(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return l.mutationQueue.lookupMutationBatch(f,c).next(y=>(ne(y!==null),p=y.keys(),l.mutationQueue.removeMutationBatch(f,y))).next(()=>l.mutationQueue.performConsistencyCheck(f)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(f,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>l.localDocuments.getDocuments(f,p))})}(r.localStore,e);Lp(r,e,t),Mp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await gi(r,i)}catch(i){await di(i)}}function Mp(n,e){(n.Oa.get(e)||[]).forEach(t=>{t.resolve()}),n.Oa.delete(e)}function Lp(n,e,t){let r=z(n),i=r.xa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.xa[r.currentUser.toKey()]=i}}function Bu(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Da.get(e))n.ba.delete(r),t&&n.Sa.ka(r,t);n.Da.delete(e),n.isPrimaryClient&&n.Ma.Vr(e).forEach(r=>{n.Ma.containsKey(r)||Fp(n,r)})}function Fp(n,e){n.Ca.delete(e.path.canonicalString());let t=n.va.get(e);t!==null&&(ml(n.remoteStore,t),n.va=n.va.remove(e),n.Fa.delete(t),Il(n))}function Uf(n,e,t){for(let r of t)r instanceof to?(n.Ma.addReference(r.key,e),Ww(n,r)):r instanceof no?(M("SyncEngine","Document no longer in limbo: "+r.key),n.Ma.removeReference(r.key,e),n.Ma.containsKey(r.key)||Fp(n,r.key)):U()}function Ww(n,e){let t=e.key,r=t.path.canonicalString();n.va.get(t)||n.Ca.has(r)||(M("SyncEngine","New document in limbo: "+t),n.Ca.add(r),Il(n))}function Il(n){for(;n.Ca.size>0&&n.va.size<n.maxConcurrentLimboResolutions;){let e=n.Ca.values().next().value;n.Ca.delete(e);let t=new F(oe.fromString(e)),r=n.Na.next();n.Fa.set(r,new Fu(t)),n.va=n.va.insert(t,r),Pp(n.remoteStore,new ri(lt(fl(t.path)),r,"TargetPurposeLimboResolution",$r.oe))}}async function gi(n,e,t){let r=z(n),i=[],s=[],a=[];r.ba.isEmpty()||(r.ba.forEach((c,l)=>{a.push(r.Ba(l,e,t).then(f=>{if((f||t)&&r.isPrimaryClient){let p=f&&!f.fromCache;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(f){i.push(f);let p=yu.Ki(l.targetId,f);s.push(p)}}))}),await Promise.all(a),r.Sa.h_(i),await async function(l,f){let p=z(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>D.forEach(f,v=>D.forEach(v.qi,S=>p.persistence.referenceDelegate.addReference(y,v.targetId,S)).next(()=>D.forEach(v.Qi,S=>p.persistence.referenceDelegate.removeReference(y,v.targetId,S)))))}catch(y){if(!fi(y))throw y;M("LocalStore","Failed to update sequence numbers: "+y)}for(let y of f){let v=y.targetId;if(!y.fromCache){let S=p.ns.get(v),k=S.snapshotVersion,V=S.withLastLimboFreeSnapshotVersion(k);p.ns=p.ns.insert(v,V)}}}(r.localStore,s))}async function Hw(n,e){let t=z(n);if(!t.currentUser.isEqual(e)){M("SyncEngine","User change. New user:",e.toKey());let r=await Sp(t.localStore,e);t.currentUser=e,function(s,a){s.Oa.forEach(c=>{c.forEach(l=>{l.reject(new O(P.CANCELLED,a))})}),s.Oa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await gi(t,r.us)}}function Qw(n,e){let t=z(n),r=t.Fa.get(e);if(r&&r.wa)return Y().add(r.key);{let i=Y(),s=t.Da.get(e);if(!s)return i;for(let a of s){let c=t.ba.get(a);i=i.unionWith(c.view.Ea)}return i}}function Up(n){let e=z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Vp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Qw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=zw.bind(null,e),e.Sa.h_=Vw.bind(null,e.eventManager),e.Sa.ka=Mw.bind(null,e.eventManager),e}function Yw(n){let e=z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Gw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Kw.bind(null,e),e}var ro=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=po(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return pw(this.persistence,new vu,e.initialUser,this.serializer)}createPersistence(e){return new pu(gu.Hr,this.serializer)}createSharedClientState(e){return new Eu}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var qu=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ff(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Hw.bind(null,this.syncEngine),await Dw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Nu}()}createDatastore(e){let t=po(e.databaseInfo.databaseId),r=function(s){return new Au(s)}(e.databaseInfo);return function(s,a,c,l){return new Pu(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new ku(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Ff(this.syncEngine,t,0),function(){return Js.D()?new Js:new Tu}())}createSyncEngine(e,t){return function(i,s,a,c,l,f,p){let y=new Uu(i,s,a,c,l,f);return p&&(y.La=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(r){let i=z(r);M("RemoteStore","RemoteStore shutting down."),i.M_.add(5),await mi(i),i.O_.shutdown(),i.N_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate()}};var ju=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ka(this.observer.next,e)}error(e){this.observer.error?this.Ka(this.observer.error,e):Et("Uncaught Error in snapshot listener:",e.toString())}$a(){this.muted=!0}Ka(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var zu=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new O(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(i,s){let a=z(i),c={documents:s.map(y=>Hs(a.serializer,y))},l=await a.xo("BatchGetDocuments",a.serializer.databaseId,oe.emptyPath(),c,s.length),f=new Map;l.forEach(y=>{let v=nw(a.serializer,y);f.set(v.key.toString(),v)});let p=[];return s.forEach(y=>{let v=f.get(y.toString());ne(!!v),p.push(v)}),p}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new In(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{let i=F.fromPath(r);this.mutations.push(new qs(i,this.precondition(i)))}),await async function(r,i){let s=z(r),a={writes:i.map(c=>Ep(s.serializer,c))};await s.Co("Commit",s.serializer.databaseId,oe.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw U();t=j.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new O(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(j.min())?Ie.exists(!1):Ie.updateTime(t):Ie.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(j.min()))throw new O(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ie.updateTime(t)}return Ie.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};var Gu=class{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.Za=r.maxAttempts,this.Yo=new oi(this.asyncQueue,"transaction_retry")}Xa(){this.Za-=1,this.eu()}eu(){this.Yo.$o(async()=>{let e=new zu(this.datastore),t=this.tu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.nu(i)}))}).catch(r=>{this.nu(r)})})}tu(e){try{let t=this.updateFunction(e);return!pi(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}nu(e){this.Za>0&&this.ru(e)?(this.Za-=1,this.asyncQueue.enqueueAndForget(()=>(this.eu(),Promise.resolve()))):this.deferred.reject(e)}ru(e){if(e.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!gp(t)}return!1}};var Ku=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=we.UNAUTHENTICATED,this.clientId=Os.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{M("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(M("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new ct;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=vl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Ic(n,e){n.asyncQueue.verifyOperationInProgress(),M("FirestoreClient","Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Sp(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Bf(n,e){n.asyncQueue.verifyOperationInProgress();let t=await $w(n);M("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Mf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Mf(e.remoteStore,i)),n._onlineComponents=e}function Jw(n){return n.name==="FirebaseError"?n.code===P.FAILED_PRECONDITION||n.code===P.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function $w(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M("FirestoreClient","Using user provided OfflineComponentProvider");try{await Ic(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!Jw(t))throw t;Gn("Error using user provided cache. Falling back to memory cache: "+t),await Ic(n,new ro)}}else M("FirestoreClient","Using default OfflineComponentProvider"),await Ic(n,new ro);return n._offlineComponents}async function El(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M("FirestoreClient","Using user provided OnlineComponentProvider"),await Bf(n,n._uninitializedComponentsProvider._online)):(M("FirestoreClient","Using default OnlineComponentProvider"),await Bf(n,new qu))),n._onlineComponents}function Xw(n){return El(n).then(e=>e.syncEngine)}function Zw(n){return El(n).then(e=>e.datastore)}async function qf(n){let e=await El(n),t=e.eventManager;return t.onListen=Lw.bind(null,e.syncEngine),t.onUnlisten=Bw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Fw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=qw.bind(null,e.syncEngine),t}function Bp(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var jf=new Map;function qp(n,e,t){if(!t)throw new O(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function eI(n,e,t,r){if(e===!0&&r===!0)throw new O(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function zf(n){if(!F.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Gf(n){if(F.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function yo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U()}function Ye(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=yo(n);throw new O(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function tI(n,e){if(e<=0)throw new O(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}var io=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new O(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}eI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Bp((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Zn=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new io({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new O(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new O(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new io(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ec;switch(r.type){case"firstParty":return new Sc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=jf.get(t);r&&(M("ComponentProvider","Removing Datastore"),jf.delete(t),r.terminate())}(this),Promise.resolve()}};function Tl(n,e,t,r={}){var i;let s=(n=Ye(n,Zn))._getSettings(),a=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&Gn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=we.MOCK_USER;else{c=Hh(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new O(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new we(f)}n._authCredentials=new Tc(new Ns(c,l))}}var Qt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},De=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},qt=class n extends Qt{constructor(e,t,r){super(e,t,fl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new De(this.firestore,null,new F(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Ge(n,e,...t){if(n=ae(n),qp("collection","path",e),n instanceof Zn){let r=oe.fromString(e,...t);return Gf(r),new qt(n,null,r)}{if(!(n instanceof De||n instanceof qt))throw new O(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(oe.fromString(e,...t));return Gf(r),new qt(n.firestore,null,r)}}function Te(n,e,...t){if(n=ae(n),arguments.length===1&&(e=Os.newId()),qp("doc","path",e),n instanceof Zn){let r=oe.fromString(e,...t);return zf(r),new De(n,null,new F(r))}{if(!(n instanceof De||n instanceof qt))throw new O(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(oe.fromString(e,...t));return zf(r),new De(n.firestore,n instanceof qt?n.converter:null,new F(r))}}var Wu=class{constructor(){this.iu=Promise.resolve(),this.su=[],this.ou=!1,this._u=[],this.au=null,this.uu=!1,this.cu=!1,this.lu=[],this.Yo=new oi(this,"async_queue_retry"),this.hu=()=>{let t=wc();t&&M("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Yo.Wo()};let e=wc();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.hu)}get isShuttingDown(){return this.ou}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.ou){this.ou=!0,this.cu=e||!1;let t=wc();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hu)}}enqueue(e){if(this.Pu(),this.ou)return new Promise(()=>{});let t=new ct;return this.Iu(()=>this.ou&&this.cu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.su.push(e),this.Tu()))}async Tu(){if(this.su.length!==0){try{await this.su[0](),this.su.shift(),this.Yo.reset()}catch(e){if(!fi(e))throw e;M("AsyncQueue","Operation failed with retryable error: "+e)}this.su.length>0&&this.Yo.$o(()=>this.Tu())}}Iu(e){let t=this.iu.then(()=>(this.uu=!0,e().catch(r=>{this.au=r,this.uu=!1;let i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw Et("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.uu=!1,r))));return this.iu=t,t}enqueueAfterDelay(e,t,r){this.Pu(),this.lu.indexOf(e)>-1&&(t=0);let i=xu.createAndSchedule(this,e,t,r,s=>this.Eu(s));return this._u.push(i),i}Pu(){this.au&&U()}verifyOperationInProgress(){}async du(){let e;do e=this.iu,await e;while(e!==this.iu)}Au(e){for(let t of this._u)if(t.timerId===e)return!0;return!1}Ru(e){return this.du().then(()=>{this._u.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this._u)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.du()})}Vu(e){this.lu.push(e)}Eu(e){let t=this._u.indexOf(e);this._u.splice(t,1)}};function Kf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var tt=class extends Zn{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new Wu}(),this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||zp(this),this._firestoreClient.terminate()}};function jp(n,e){let t=typeof n=="object"?n:Qi(),r=typeof n=="string"?n:e||"(default)",i=Cr(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=Wh("firestore");s&&Tl(i,...s)}return i}function _o(n){return n._firestoreClient||zp(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function zp(n){var e,t,r;let i=n._freezeSettings(),s=function(c,l,f,p){return new xc(c,l,f,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Bp(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new Ku(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var er=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Ve.fromBase64String(e))}catch(t){throw new O(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Yt=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Jt=class{constructor(e){this._methodName=e}};var ai=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}};var nI=/^__.*__$/,Hu=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new dt(e,this.data,this.fieldMask,t,this.fieldTransforms):new wn(e,this.data,t,this.fieldTransforms)}},so=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new dt(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Gp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U()}}var oo=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.mu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get fu(){return this.settings.fu}gu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}pu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.wu(e),i}Su(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.mu(),i}bu(e){return this.gu({path:void 0,yu:!0})}Du(e){return co(e,this.settings.methodName,this.settings.Cu||!1,this.path,this.settings.vu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}mu(){if(this.path)for(let e=0;e<this.path.length;e++)this.wu(this.path.get(e))}wu(e){if(e.length===0)throw this.Du("Document fields must not be empty");if(Gp(this.fu)&&nI.test(e))throw this.Du('Document fields cannot begin and end with "__"')}},Qu=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||po(e)}Fu(e,t,r,i=!1){return new oo({fu:e,methodName:t,vu:r,path:qe.emptyPath(),yu:!1,Cu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function ir(n){let e=n._freezeSettings(),t=po(n._databaseId);return new Qu(n._databaseId,!!e.ignoreUndefinedProperties,t)}function vo(n,e,t,r,i,s={}){let a=n.Fu(s.merge||s.mergeFields?2:0,e,t,i);Sl("Data must be an object, but it was:",a,r);let c=Wp(r,a),l,f;if(s.merge)l=new Qe(a.fieldMask),f=a.fieldTransforms;else if(s.mergeFields){let p=[];for(let y of s.mergeFields){let v=Xu(e,y,t);if(!a.contains(v))throw new O(P.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Qp(p,v)||p.push(v)}l=new Qe(p),f=a.fieldTransforms.filter(y=>l.covers(y.field))}else l=null,f=a.fieldTransforms;return new Hu(new Fe(c),l,f)}var ao=class n extends Jt{_toFieldTransform(e){if(e.fu!==2)throw e.fu===1?e.Du(`${this._methodName}() can only appear at the top level of your update data`):e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function Kp(n,e,t){return new oo({fu:3,vu:e.settings.vu,methodName:n._methodName,yu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}var Yu=class n extends Jt{_toFieldTransform(e){return new ti(e.path,new vn)}isEqual(e){return e instanceof n}},Ju=class n extends Jt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=Kp(this,e,!0),r=this.Mu.map(s=>bn(s,t)),i=new Kt(r);return new ti(e.path,i)}isEqual(e){return e instanceof n&&_t(this.Mu,e.Mu)}},$u=class n extends Jt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=Kp(this,e,!0),r=this.Mu.map(s=>bn(s,t)),i=new Wt(r);return new ti(e.path,i)}isEqual(e){return e instanceof n&&_t(this.Mu,e.Mu)}};function bl(n,e,t,r){let i=n.Fu(1,e,t);Sl("Data must be an object, but it was:",i,r);let s=[],a=Fe.empty();En(r,(l,f)=>{let p=Rl(e,l,t);f=ae(f);let y=i.Su(p);if(f instanceof ao)s.push(p);else{let v=bn(f,y);v!=null&&(s.push(p),a.set(p,v))}});let c=new Qe(s);return new so(a,c,i.fieldTransforms)}function Al(n,e,t,r,i,s){let a=n.Fu(1,e,t),c=[Xu(e,r,t)],l=[i];if(s.length%2!=0)throw new O(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)c.push(Xu(e,s[v])),l.push(s[v+1]);let f=[],p=Fe.empty();for(let v=c.length-1;v>=0;--v)if(!Qp(f,c[v])){let S=c[v],k=l[v];k=ae(k);let V=a.Su(S);if(k instanceof ao)f.push(S);else{let x=bn(k,V);x!=null&&(f.push(S),p.set(S,x))}}let y=new Qe(f);return new so(p,y,a.fieldTransforms)}function rI(n,e,t,r=!1){return bn(t,n.Fu(r?4:3,e))}function bn(n,e){if(Hp(n=ae(n)))return Sl("Unsupported field value:",e,n),Wp(n,e);if(n instanceof Jt)return function(r,i){if(!Gp(i.fu))throw i.Du(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Du(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.yu&&e.fu!==4)throw e.Du("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let c of r){let l=bn(c,i.bu(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ae(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return zv(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=ye.fromDate(r);return{timestampValue:Ws(i.serializer,s)}}if(r instanceof ye){let s=new ye(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ws(i.serializer,s)}}if(r instanceof ai)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof er)return{bytesValue:_p(i.serializer,r._byteString)};if(r instanceof De){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Du(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:pl(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Du(`Unsupported field value: ${yo(r)}`)}(n,e)}function Wp(n,e){let t={};return Qf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):En(n,(r,i)=>{let s=bn(i,e.pu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Hp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ye||n instanceof ai||n instanceof er||n instanceof De||n instanceof Jt)}function Sl(n,e,t){if(!Hp(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=yo(t);throw r==="an object"?e.Du(n+" a custom object"):e.Du(n+" "+r)}}function Xu(n,e,t){if((e=ae(e))instanceof Yt)return e._internalPath;if(typeof e=="string")return Rl(n,e);throw co("Field path arguments must be of type string or ",n,!1,void 0,t)}var iI=new RegExp("[~\\*/\\[\\]]");function Rl(n,e,t){if(e.search(iI)>=0)throw co(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Yt(...e.split("."))._internalPath}catch{throw co(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function co(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new O(P.INVALID_ARGUMENT,c+n+l)}function Qp(n,e){return n.some(t=>t.isEqual(e))}var tr=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new De(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Zu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(wo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Zu=class extends tr{data(){return super.data()}};function wo(n,e){return typeof e=="string"?Rl(n,e):e instanceof Yt?e._internalPath:e._delegate._internalPath}function sI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var ci=class{},ui=class extends ci{};function Io(n,e,...t){let r=[];e instanceof ci&&r.push(e),r=r.concat(t),function(s){let a=s.filter(l=>l instanceof el).length,c=s.filter(l=>l instanceof uo).length;if(a>1||a>0&&c>0)throw new O(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var uo=class n extends ui{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return Jp(e._query,t),new Qt(e.firestore,e.converter,Gc(e._query,t))}_parse(e){let t=ir(e.firestore);return function(s,a,c,l,f,p,y){let v;if(f.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new O(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Hf(y,p);let S=[];for(let k of y)S.push(Wf(l,s,k));v={arrayValue:{values:S}}}else v=Wf(l,s,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Hf(y,p),v=rI(c,a,y,p==="in"||p==="not-in");return pe.create(f,p,v)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function Yp(n,e,t){let r=e,i=wo("where",n);return uo._create(i,r,t)}var el=class n extends ci{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:et.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i,c=s.getFlattenedFilters();for(let l of c)Jp(a,l),a=Gc(a,l)}(e._query,t),new Qt(e.firestore,e.converter,Gc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var tl=class n extends ui{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,a){if(i.startAt!==null)throw new O(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new O(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new _n(s,a)}(e._query,this._field,this._direction);return new Qt(e.firestore,e.converter,function(i,s){let a=i.explicitOrderBy.concat([s]);return new zt(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function Eo(n,e="asc"){let t=e,r=wo("orderBy",n);return tl._create(r,t)}var nl=class n extends ui{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new Qt(e.firestore,e.converter,Bs(e._query,this._limit,this._limitType))}};function To(n){return tI("limit",n),nl._create("limit",n,"F")}function Wf(n,e,t){if(typeof(t=ae(t))=="string"){if(t==="")throw new O(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!np(e)&&t.indexOf("/")!==-1)throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(oe.fromString(t));if(!F.isDocumentKey(r))throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return _f(n,new F(r))}if(t instanceof De)return _f(n,t._key);throw new O(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${yo(t)}.`)}function Hf(n,e){if(!Array.isArray(n)||n.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Jp(n,e){let t=function(i,s){for(let a of i)for(let c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new O(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new O(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var lo=class{convertValue(e,t="none"){switch(yn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(jt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw U()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return En(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new ai(le(e.latitude),le(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=ul(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Zr(e));default:return null}}convertTimestamp(e){let t=Tt(e);return new ye(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=oe.fromString(e);ne(Ap(r));let i=new Fs(r.get(1),r.get(3)),s=new F(r.popFirst(5));return i.isEqual(t)||Et(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function bo(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var rl=class extends lo{constructor(e){super(),this.firestore=e}convertBytes(e){return new er(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new De(this.firestore,null,t)}};var Bt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},li=class extends tr{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new zn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(wo("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},zn=class extends li{data(e={}){return super.data(e)}},il=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Bt(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new zn(this._firestore,this._userDataWriter,r.key,r,new Bt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{let l=new zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Bt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let l=new zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Bt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),f=-1,p=-1;return c.type!==0&&(f=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:oI(c.type),doc:l,oldIndex:f,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function oI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U()}}var hi=class extends lo{constructor(e){super(),this.firestore=e}convertBytes(e){return new er(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new De(this.firestore,null,t)}};function yi(n,e,t){n=Ye(n,De);let r=Ye(n.firestore,tt),i=bo(n.converter,e,t);return wi(r,[vo(ir(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ie.none())])}function An(n,e,t,...r){n=Ye(n,De);let i=Ye(n.firestore,tt),s=ir(i),a;return a=typeof(e=ae(e))=="string"||e instanceof Yt?Al(s,"updateDoc",n._key,e,t,r):bl(s,"updateDoc",n._key,e),wi(i,[a.toMutation(n._key,Ie.exists(!0))])}function _i(n){return wi(Ye(n.firestore,tt),[new In(n._key,Ie.none())])}function vi(n,e){let t=Ye(n.firestore,tt),r=Te(n),i=bo(n.converter,e);return wi(t,[vo(ir(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Ie.exists(!1))]).then(()=>r)}function $t(n,...e){var t,r,i;n=ae(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Kf(e[a])||(s=e[a],a++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Kf(e[a])){let y=e[a];e[a]=(t=y.next)===null||t===void 0?void 0:t.bind(y),e[a+1]=(r=y.error)===null||r===void 0?void 0:r.bind(y),e[a+2]=(i=y.complete)===null||i===void 0?void 0:i.bind(y)}let l,f,p;if(n instanceof De)f=Ye(n.firestore,tt),p=fl(n._key.path),l={next:y=>{e[a]&&e[a](aI(f,n,y))},error:e[a+1],complete:e[a+2]};else{let y=Ye(n,Qt);f=Ye(y.firestore,tt),p=y._query;let v=new hi(f);l={next:S=>{e[a]&&e[a](new il(f,v,y,S))},error:e[a+1],complete:e[a+2]},sI(n._query)}return function(v,S,k,V){let x=new ju(V),G=new Vu(S,x,k);return v.asyncQueue.enqueueAndForget(async()=>Nw(await qf(v),G)),()=>{x.$a(),v.asyncQueue.enqueueAndForget(async()=>Ow(await qf(v),G))}}(_o(f),p,c,l)}function wi(n,e){return function(r,i){let s=new ct;return r.asyncQueue.enqueueAndForget(async()=>jw(await Xw(r),i,s)),s.promise}(_o(n),e)}function aI(n,e,t){let r=t.docs.get(e._key),i=new hi(n);return new li(n,i,e._key,r,new Bt(t.hasPendingWrites,t.fromCache),e.converter)}var cI={maxAttempts:5};var sl=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=ir(e)}set(e,t,r){this._verifyNotCommitted();let i=Ut(e,this._firestore),s=bo(i.converter,t,r),a=vo(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Ie.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=Ut(e,this._firestore),a;return a=typeof(t=ae(t))=="string"||t instanceof Yt?Al(this._dataReader,"WriteBatch.update",s._key,t,r,i):bl(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,Ie.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=Ut(e,this._firestore);return this._mutations=this._mutations.concat(new In(t._key,Ie.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new O(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Ut(n,e){if((n=ae(n)).firestore!==e)throw new O(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}var ol=class extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=ir(t)}get(t){let r=Ut(t,this._firestore),i=new rl(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return U();let a=s[0];if(a.isFoundDocument())return new tr(this._firestore,i,a.key,a,r.converter);if(a.isNoDocument())return new tr(this._firestore,i,r._key,null,r.converter);throw U()})}set(t,r,i){let s=Ut(t,this._firestore),a=bo(s.converter,r,i),c=vo(this._dataReader,"Transaction.set",s._key,a,s.converter!==null,i);return this._transaction.set(s._key,c),this}update(t,r,i,...s){let a=Ut(t,this._firestore),c;return c=typeof(r=ae(r))=="string"||r instanceof Yt?Al(this._dataReader,"Transaction.update",a._key,r,i,s):bl(this._dataReader,"Transaction.update",a._key,r),this._transaction.update(a._key,c),this}delete(t){let r=Ut(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=Ut(e,this._firestore),r=new hi(this._firestore);return super.get(e).then(i=>new li(this._firestore,r,t._key,i._document,new Bt(!1,!1),t.converter))}};function Me(n,e,t){n=Ye(n,tt);let r=Object.assign(Object.assign({},cI),t);return function(s){if(s.maxAttempts<1)throw new O(P.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,a,c){let l=new ct;return s.asyncQueue.enqueueAndForget(async()=>{let f=await Zw(s);new Gu(s.asyncQueue,f,c,a,l).Xa()}),l.promise}(_o(n),i=>e(new ol(n,i)),r)}function nt(){return new Yu("serverTimestamp")}function Ao(...n){return new Ju("arrayUnion",n)}function Pl(...n){return new $u("arrayRemove",n)}function $p(n){return _o(n=Ye(n,tt)),new sl(n,e=>wi(n,e))}(function(e,t=!0){(function(i){nr=i})(Dt),xt(new We("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),c=new tt(new bc(r.getProvider("auth-internal")),new Pc(r.getProvider("app-check-internal")),function(f,p){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new O(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fs(f.options.projectId,p)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),$e(mf,"4.6.3",e),$e(mf,"4.6.3","esm2017")})();var Xp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAxKklEQVR42u29eZwk11Xn+z33RmTWXt3Vm3qRWmqpu6XWjlZbki0ZvGGbwQJ9eGMNjGEYHp8ZzLA9PAOPbRjMzMAMho/x8Hk8GBt7ZPDKYjAw2DzbYLABC0tq2fIiWWvbaqlbXeqqysyIuOf9cW9k3IjMrKrurqq2ZzrqE5+KzIyMjLjn3HN+53fOvRfObee2c9u57dx2bju3ndvObf/bbfK/6W9/LW76v7IQBJAXgwH4KBRn64G/ljvji8GG9nGhffTrXQHMi8F8FPLmBy+G5EuQzmzbZntFYfofHAPm/OFc/eXX3XYseobmswG0rHXzR48WF0M2qo2CMrivNwUoBVreuL2i1drvWq3bjHOXO5GLUb1QRGZQnQTS/g0JGAkmQ8Lr+FikMimAMdX3hOHHp/OgZddTrV4PO3au3lWdKqr+cxfOU/WfO62+F7YMkQVVnUfky0b1S86Yw6bX+/gDvd4X8JZyWHt+zSpAKRcHcNnk5OWi+m0i8q3A5UakJf0GrLdEKWAhKEBD8CLiXzfObf7fSAUY+F8KOjxfUxFc49z68wtl2zjVHnBYVX9fRd732YWFw5EirKlrWEsFsKXGXj41dYs694Mq8tpEJFXVUnULBZVKUYSoJ/eFH732iiA1a0DTSoT34gs2j5d7YIkF3lQCjVp82HHUu2n0eodWn7vICkSvaehUuF1rglLkqpmofkCM+bXDJ0/+dbOtvxYUoN/rLxsb24u1PyvweiPizSHkZWce9nsiYBu9v9xB+se1nh9r0BBLAIPHNCxCvLno5lSHW4Hm8cD/2ApESuGCtpTHsRUohliChkI4gSRqy7dRFD/72U7n0bWyBrIGwleAQ5OTdwv8khHZWfinKqgEP/SLpam3pfCM/4IJJj92A2YZs7+iG2g8qTSEPwX0wi6RCJRTMP+N/24ABwQlADT0/lIBnC4rxdKrWOsV4YjCjz24sHDPEAN2Wmb7TICeXgfppomJXzUi/xGYLirBDwi/vNO41xvxgrelsI1gSuGHz8r/It41mPh/tA98p3+eeAxR/jf+PyK0RbizgC9ZoSeCRYLySWVBZIirkeF4hNjt1NyPP1HUn6cNBVUJbTMoTSlBoINCYEbg27am6da9WfYXR6r21o1UAAO4fTCrk5O/Z435Z84r9MrXDMI3DSUoe30s2KYFsA03UCpCUzGqz7zQkbrSlArYEXiBKi9x8PdWWBBIIqmUCjNK0LFSNMMfRuCRJijpS05WJUFTehJrzM29NL12Jsv+5Dh0TlcJ7Oma/UtgJp2Y+KAVeWmhmgskK7kUCQ1sqHqpDejeiEc+NsIBNqChWPil8hiq75bWw8T/I0xh49fhfCcwA3x7DrMCTwo8bqA1xOUMRCU0QajWXE4tetG6EkjUxb0iqe/5GklQV2x/41RzK3KpSZIXbsrz9x/zSiDrrQByl7/P1IyPvzsx5psi4bOS8G3UaDb0SCvSb+Ak6tk2shC2dBMmUgAjAxZkwB2YumsorUMi0BN4iYMrA/TOBB604R5GKcEQvNHHK7GApRKmaQDPYe9LhAFkdZYAAeMgT4y5SJLkyu15/r7bgQfXUQHkLjDvgWJuYuJXE2PuzlUzgVRXQIh9gZc93wTzjPSF0he2qXpyiQ2qnl/58r5rMA08YAbNvTTwQi5wHvCtzl9PRZhEOGy9Ygzr/UP9fi3i8JIvlaFm8bUPAfp+vjxBtRHWaOUOdAWEF5QgS4y5LE/TuY9l2R/fBfbBU3AFp6IA5kFwl46N/VNrzH/KV2n2iYUfCykIP3YHMqz39n281AUyBARaM6Tnx4oQzikEXumEixSy0MDTwLMGHrPQpiHghkLE/j/GAP2GMDIABgcyPkGyKnVJx5+vUoqmgMKK3LzF2s9/LM/vC3LV1frzVSP+g+PjO4H7jMicVpZs2YvbSIiVr66EXxMWdXAoMTiMwsQaTTyCExgmJAN0gYsU/nkmnpwKD9IWeFiUt6fhYYcxgENif6dDWEBXsYHx50WJ4KJQ0YVznfM0sovCQw3IehWSdALiVI8BVz20tHQkZmRXw9mvjh015k2JMVtcFXqs6PdLIVQIXrxCNLh+I40eH0y+QWrArw8WY3cRuwJTP8dEoaARoSXCiwshDaFX6ZJ6AheqYT9CLkJqIixihv/G0HuJgSfBXQ2zWs3IwlTch20o+Wo6qIMiMWaLGPMLpxINrCjEnwkh3/7x8RtF9TtzVQdYjWioYXv/5k308DGz1/D1g4xfwAemooZjU25MXSFqEUAk8DIUTAR6Bq5W2K9Ct4z5wx/4c24qhLT/+1JdZ4gS9l+bIaFphHdKwUpD0fukV00xpN8JiK67UnsDNld1qH7XgfHxGwD3M6uQ76otgBH5sQjcyorccMP3S8nnmyoUiwVsY0LISBTqRd8x0feGIH4bogq/R71TQA1sAW4vBBf9dklZWeMVZD9wKZAbSGs9PFzXDJJQ/d8vFYM6uVWLWkyD+TR1gBy3Vf/5ZVW+uuSTjIj8X2tFBfve32pdJknyGeMR/4oKYCPwZUOs3wzXbJMFbPYAAikzhOkzA2ljGYjT49jbCHQFXtUTri+EJdGhmq94HuBJgXe2tObry0QPpT8PoCDGAS4+1ipBlJfXcT5BVH5WBD/vYnwQ0ciFavV+xLQt56YFxEGmeX71F3q9z5YyPC0LcFfZlklylxVJg++X5S1Fw7wxKMQyVo5Bmgd30gdrRurET40EillE4013YWBfoex0irNVz08MZAYOKFyrQs+UCjm4GxEyES5AuNYJmfFKGN/DjT1lokYxj7ivJtPZV0qpZcZqbREnwmKXEbnJlTq08xFBKkny7bEMT0sB3uMFblF9bZm/X8EPDfZAI7WHbCqC6SvEIP+P1EkjqZlKwRqpWYare7Cz8GFe+R0EJoE7cqldc7k9F7i58MU7GpSgsHCBg5u7IfYt3UPIK/QjlMgdSGTB4lC39qxD2qV/jyH0pRHdrCQD9WHHnYB9zwppY7PSZwdarf2IXOFWoTCmYXZLUsQ0mDTT6FV9kCSDXH8/fo8Ani0BYpk4N17IewrY5aAVzistwy2FsAtDFvWuUbsRr0BbxPACZ/p4oQXc0lEmgB3qFSOuXbBRHsMy/Bnquwxvi7jXB/fWbNdVRAQgcsXBVuuSleQ88oOygJMkudV4pV/W/MsAQpdBxNukZoUKsMU79dcSYYkSkcfnYmBOoSXC+bkwS8X4XaxwgzOB4QsZuWV2wm90Ba51wj5gwcKNXTg/9+fsLCpK2dZcQAVAZYVnqp5nkK5uRkYxY7qK0FAAZyDRJLmtJsvTiQIcXIkILvAhw0wOQ0q1kNFVOjGbZlZhkk1kNmvFI5FCzYQ066zCwcwj+imBl+QGu0rTH+8q3pLcUhgOZnBjx1sTZ+DCAsZLbGPqUU9p4lf7XKUwzTIVTQxJPdcqRxq7AxdkduVK8h2ZxAml24hz+9QYRFVGVSv0b17LBxIExWgV5tX4cSqzBlrL1FUPKfXKn5BxM1GDla4FEaZC1OAEruzCA2PwgsKwEzMS9a/EkWfALgyv6SoGxRkPp3cobHNwxCqJq3P4rmyHuFMoiKh/Rq3arNCqQ/hjrZVYSSD7+/gKrV3b6UgT4NMPzu2LZXkqClA+UqIiewMAlOXqwWo+jMHSrX7s38wLNEvBGPy85AD679ewhFeUKSAVYVFgk4NXdeAi602/7TftqZc6CTDesnSLAnHeMoypjziOJIKVSmglQyYmqjPTSiISONsydDQRqDNxcB3F2v021YpgK6nqZRJFoqqoyN4g43xUXmnZjrHHcyEzy3IGjWyZGWL+auxYHLM3enJMAZe1ATG5EgM/G1UOtQSmXXUvGLhUrOcRgkbJKe40jtO26T+PE7i4gIngx4zx99t3SxFpVdU0yACXMWj5ZCjrGbdLLd8hy/M7AjN7V0jVL6sAM2BVdYrlwr44lh3i+4dV7ppmOjXq3QwhdUoGsTkOoPS5LWAznuETgbQtFOmyYH90efmI3aaCTT0IzA2c5wx7C48LypRqTAHXOgUN5B/OYUhSixH3Q6ONYyywTDg4NbmCAiz7YQ+MiozM99NImTIsFx49Ra3OjsEHNyL+hoZajjhxUvUEDEwqbFXxMbsVkpZp1FuNtvHqQOwKBHd4P21btFOgCInClbnwcKpegVVQ549FQ4WPKRFZRcclCHmJB8r6AI05FAk1QvWCkapN/RloFA3oiLJikbS3Uuh+xvXgjXIrGRIDmwgHDKv3syFe3+3gYud5+Jr/j/5bI96sBtOqArucMKEeoaetRrWlGbEDkkI6J5WERu0l8LSQpF7JMwN7nbDbVcSTDXx/fM8ScQuTwO1ZlQsYhofithqIkqi7zlXmCFhfBegfS63nDpjUhv9qPlQhvjEPBqBlGopk48igkWu4uPB0sE0Em0i9PnDYboBMae9OmHnhOBRaZRdH7WXZWstgrK8iaotweWHq9HWUvi6Vu2yEV/Tg2nzQlw+4orjEjCZjGtp61ECLtVaAkZSjRFUrMrz6hQbXHd+xNFLGFjhu4WABm9VbBBPX2EWMWCn8QmBOhb2FkJWmf1SRYDN952Dy6nHGD41jUinzaCt+T4z/HSPeCux3wtbofk2fcAqWLdz/t3ThmsLnJqZD1qbpy2m01QDh08BZTTksx9OsuQWohX+MGJgR+35G1NOFJ2oDjyegRnhhJn44kdQb1MRVReEmrs2ECUBC71+R5AnOON2SMH7lBMn2Fq2dKRRagbcVdpsK1goqMKVwKFDGcc9PxCeeZhS+Y0m4Phc6RhgTYbtCEbgQGDXiSWrkFQyCwxp5tNEuoD70qg7uBnxZ44bNEFeRCCwJPJDCLTnsdb6HWQbp0hIz7HJwqRNyI6SpWR3bZ4DMMXHVOHZrG1opE9dPglu9ApigBEaEwgiXFobZEOOX99cV2FsIr1sS9jvohjKf8VCQqo2KaCODQm1ip/qoJ6kn3zbSBQywAjIUFAwUVcIQFxBhBwt8LlHUCK/qCZPqTahhuBBuyA1tBEkEY0Nlz0rSc4IZt0zeOOOhZGGZuHYauzkNP7Y6rtimgrFeEeeA/c54NxBKzq/J4K5FYTNCx4bMpRXUCuchtCJiRxrtOGAhR7Rvs/03zgVIw8c3B7yMGo05pJI2roVPBY4KPJXA+Sq8pmf69G7MAmYCFzthn1oygWQ1pl9CuJcp45dPku6b9OGGGuz2MaZumIbMrdoKiAhJ4skhNXCFM6TB57+4I7yi48mh3NTHO+QCu0UYk7JKQ0a2S7PtaFYhrzTseb0UQIaVTTdTwo0kBtIAdUNYQRtKsY4ZyI2w3wmv6lb1BGXmb0zghtz6923o/Q0zP1RogKTC1C2bwSQgif+fG6bu2EK6owX5CFcw5D2T+J6di7AD4YrC8LJF4ebMuyUNZWRxwYmKsFmE7YG4qhWLNI6bpI8ZNvL5DMNBcyYAsO//GTI0u7GbmAkcdiwVWd01Hi0vWTjkhJd3DeX4iQKPvHfhGbnEeiq2aealIS2xgnaVscumaB2cJpgOsAk4i9k6ztQ3bQv1znVpS8n/Ur+uCcpnxHMQd2SGg7nQsd7a9Kuco12DAl9AVFoddQIaY+ml2d618PrMw8GVMYBqbe8nhePk8ND3IhQx8HlUaIf6LFc4ToBZqt7TMcJVhfDyjj/DClypSd9XGysD4K+10yBpfVAnCmbMMP3yHZCkngSVICmbQFeYuHkr7QNT0C0QK7WoIdliaJ1noKhHOD7yCD08NbhEwoQWPmQcthsj7BEhQdGQ4VttW63U/gPyWnMLIKePGZqa3DylEJgFLhDxHHvYuxaudIaXdA0H1LATISvDrtj/A6YlTN0+gaQRL58IdAombt5Cun/WozQbKYAEbrGdMv3NOzGpp1v7vTZXpm8fp72/hWYOSaLfsx4MlsqSpLJskskYDxwvMIbxslpzSPucSTtvDBM4Cr02Ad8QoDJqho8cuA7DJhGcxDX5QtcIlzrDN+YWSqrYhoyg8fkBFMyUoX1wgtau1PdWK5ArdmubyW/a5W21TcCGnl/uSQI9aB3azPiNW6HjkMRAD9oXpozdMIWdS+uWJfyusab/XpI2xxMM7k6EOSNsM1LNTiLDAbYMiZxGgcINwQB1fyMDPophfqs5TKthBUwovtgthpvFDtTulS5ejdBKTN8vGyt1J6qQbE5gssX49VOVYmSOydt3YndOhQlrGr2/3I3HA5MvPx+7uQW5Q1rC9Cs3QZLSumgCO2WrgD88jbEEl+GVwSSybM2hBj7gfDHkVNnEoYTaiu17ZjjglHmAsvicIccDcakMXgsZPpoB4BuNZcoKrkT2YccGCjYVL6sIXNVGAjsl3d4GSWkfmqJ1URt9Pie9cIrx23b7OWBsGgSeDO42gUywu6aZ/Mbd6ImMyRfMkB6YgkWD3TFOa28byV19eFgchZiAC0x1/9J4FqxnEncHAKlRT9chhf6jzPswOawLD6Ajjuupx9HfqY+OrQ+lNeIHbB4yhiusoTNk5pC+kG2DjLF11kkSIdkz7oXZajP1ym2IhYkX7UY2jTXM/5DdWO8KMhh74S7Gb9nG+K2bwKVgUmi1GLtutjGa1T+EierAbSJDp7CJxw7kAhdYYSwataEjJjIaphR6GnI65XqA1WCNAdMjjDRJw1yDCzdxa5L4GnsdXXtWcv0VlpBabl8mLeneKdAECiXZN8X0XRfQOrTdh302XdlOlpecSJj5zv3QOxEGB1jIoH3ZLOme58if6iKtPpvjFSDUaSmB9XPLl5ttt5ZNJuOr+XBTPxQY6vD2XVceYOQPyTI3ICujVBHoqXLAGvanvm7fjkLP/Xi/rMaVWtmW9gpa+6cw5036URw2hdwydtsezKaJqvcP8/0DexKighmw4x4b2MQr1vQYYzfM+dzBkDi/vDfvBkZHA87AuIXzrSUPhbGrbrdVyEDWygIo9YFlK41KaZ439JoNf3Vdy5IaIdMRGqneQmNAwpf7I45KTW5bxm/d4QVviqrcxk56035aAY/A2Cx05/1xAuRC++qtdP7qGdx8HkaeehflYvbOCrLMSIpyToLzreETy7XVMm277OigVbqBhDPYZBWYYbn3c4Vt1nBZavtx/agvlnQvUR2hBKCgSznt67aSHJiDbuHNtaonfJIxVjGedfSWTkLR9bVjiO/5W9u0rtlK58NPIWniS3xFMEb7z2is4Kwua3pVYE/qC0viCSlOpU3PtCDkjBTgVG9KGg3QUeXSNGGzNSwpGJYpdC+nfItjZIMXyHjC2O17ArdfxloK6YQ333oGk2maxF8nXwq+SEEtYzfsoPfJo5C7qGQs8vsCrryPEW2XC+xMLGMCi271bbcaGbCWLmCUSRpm/svyuuZ5LsS7cbm8BQ60bBDs8r3UGBnMQhqDdjLa1+/AXrg56v2hkjIZP3MFEIFkElxRsVu5YvZsIj24md69TyMTabACEPG6GCO4FYDgtIU5K8wX2ucD3Ig2HuWKR8liXVyALqMYpZD71LUM3lCYGo8cmLTCxW1LZrQ/LcpIOTSmsxLja/80NbRu2B18f6O4zrbPvGJC8W6k6FYicAppQuuaHeT3Ha1i+AbMMCs8lAJjCDut5QuakSBD5yqOUytuRNufrjVIzsj0a70YofnegMWIpkvLUbYnllkrK8421R+42XiPvMCeN0ly8RafR7ZpFCMl1eszsZOlOUvaUGT+PeuLEpKDO7DbHsYdX4LE+Gk8YzdlawZhuAIYYUcqERewDIgbhhP0zB5xZQVQXdYv6NB51r2BG/zM+0RRyFXZlRjGrNBRP45wOSs8UCBpgV5BcmArzEzCUlahSFVIWiGc0zUonRVwYyHOl74VkE1tkn1z9D75GNKy/dCwcgEjmNLYr4uwLTHYakr92jRk9RG5WrP1OuL9dccA5fx2sW+SIe+V4900+qycIq1Q2JoIbSt0iuWHPA8qQCCMUou9cGsw/1ofSSEt7//XZJENA7YFLlrVRRRabezF25C/e6JPXYrWx0yLWd64FAa2pn72Mqf1qejKBnfNUG/Ie7W1DNYVA2gV7zZ9fVMJm4AwzIrrsYLAbBhQZ2QlBfDc+kBoOJ5gz5/zrIpJo9GWGpTCDjrm091sC1zWyF8b7MXbMZO+qtiZQdAjRlfsYNtTSxoiAR0B/IZyLlo/73Sw7qljgHgEq9SVoPqvaJCoDpsNM0x6MJUYNIC5FWecbNJcuUMmxzBbZ/1jJLahHcmZRwDN/lqkDQ5VMFtnkakx9LkFjDF+HEDkOXSZKT1K4c2khmlreL5wPhLQwTUKBoiCxgRWTap4/RSgJnhvdgfclAwqiMauQOtp3pV8tFDnABBB1SEzk9AaC4hfBxVgJRR2Ss9dgszG9cYsZvs07thJ1EptCheFZX/fhARQS5QtifB4V2szho9anqZuBXRQEdYbA0jDpxvqfn4oLgiuw8SKEY34MauxPPF87DiYbEPaGjJTglYFn2u59J5LG2vKKIy3MDs24Q4/Ae36576Qc2UE2hJhxhpy52shm8vQDMMASuN9HUQ760YFN8FHHxME4TqNZrcs36MaIWuA3Kln/+yQyqFRbGBjzIFJQtJH3GBsZGw07HeNNpvUlc05aLWRTVPB39cxpwBqV27L1BgmrPh5AGOBN+ckbgif0wf/a8ADDMMAUaxfcw9RNFA2TE/x7Jfx2iGyCgMQ1UKLCfO1EPL4TZXvDwRYw01CtBHznpJgJicwSSCyB/iKFS6p5ZRzUpaI1iLBONbWhpdruoiNywXUfLq/aV2FJXBhdQ0XNOcrvYKccir4FZbJMNKfHKI/t+xCJyiADJ+7vDQvWsdJp8ULKOBsY00YF4pP0tqcyH310FUoQCj4L3SZ2cibZl+rqKqvKLoOCnAMPxvWsGu7qKMrQbgxNiiF3/w8fGaBLy4VdAl+b9VLZVQr6+mJBeg4mJmAopl79TdTaFmy7TOELisCSWOGhLiKulBOLWDEROGn8+5GGwpgW5VUGrSzoCtO7GfCkIPnC9dXmqErjjYxgQ7HAsNkuD4YIBZsBPhc1A6qiitHBkdYwKmSGOGxTsET3YJLJixdV03/siockBh0YYniyWPYbXOw1A3Um/ZX7TTWYGenISvoHj+JTSzJ3AzkDl3o9C1LKXTTbiFjLUg9q8dSD+30op6aDnYDk8DJDuJclYWs8QDLt6NRyFQ50i0qMK3VgsFazkfcsAaOQUXYOBfQAIGD/j+qE2xEAuWxBeZz5RMnMg5Oe/QsZuUHkbIKyxiSThd58BHc9YdAM4zxBfvSSpDE4J7v8NHf/QSf+ugD/OPffI7J6Qmuv+0Qt7zsWq687RD0Mlwvx7RSZLzN8S8/zeF7H+bxL36F2bkprrzhEs6/bI8nrxYWELF9HOKf36EZFE88g6S2njtgeQ6g3FKBJzuOJ7sFiZ/bb2j4h7I8DlgvBdBlPigHbTrVfsNI5PdMNMO2iZBrUTKpIvzFsx1evWOMzamh0OXn8ysfdiz1Dnex3YZPHmbi1S+CPdvh+AJZlvHON/8+l169j9//nb/kI3/6WSZbsHn7FAvPP8fbf+3DvOs3Psy3f+8dfN9P/R+05zax9OwJ7vmld/NH7/wIR57qsIhfzXrLNNzy0mv5nn/7bVxwaA90e2hWoE79WIBNE3DkKPaRJ8jHWuH+faOo0xWndS3U1zn+3XyP4z1l3AiZq882Hvd2VzvWAUyw8RZAq5EtZTFn3w0E9wCKqNTO88uiKKkRnug43v2VRf71RdPk+Wg+QANWsAiferbH3xxd4t5nO+SdHtc+95vc/F0v45ZXfAPk8Ifv/Bjv+62PMH+ix11338G3fOdrueCC3eRZxuH7H+KeX38nb3/rX7J0ssNrvu+b+Z03/R7/808e4IpD5/Gtd9/B+OQ4WhR8+m//kQ+9/14+95lHeOOvfC+7925n++4tyMQY+fHnefQzj/HwOz7EJUdPsmd2jLZV8jwQ3kZWXA40NbBYKB98utMf91ibch4duvC0a0xNfyYWYLkCFJ2DmbFW63H8XIEDFRvxVOn9CZIay7XYaCIEa+pLwpVTvWeq/Pgl07x05wTdzA0stabqr38yd7zloXn+5EvzqIVtm6cRa3jmqyfIOvDyO6/l+3/qdbzx7v/Mlz9/lNf/4F18z0/+K8gL6AUef2KchWeO8dPf/9P8/SceYNNsm2PHurzyztv4gZ/9N8ycty2AEYXFJT7w2+/hLb/4/9Jqp1xx/SX8wtt/lA++4yP84Ts+zKNf+CqLHZiagH1zbf7JhbO8etcYBYpbJrQtO0iaCm/9wkne8fgiEwayMKNY0V9DQKNjGsdarTmgQ/VLgPlOr3f+MZgfRRSfkQJAU9j1iZwroVcTP5po1Q+DH90bMB0/sG+aV5w3AapkhfZ/0PjRXfz8fcf4s0dOcsetV/Ad//I7OHjoEkSELz38GO//7+/jT//gk1x94wUceewoO3fv4K3v/lVMkqBZ5nkDoMhzkk2zfPHv7+eHXv9Guks5+y/by5vf+cu0piYpFhYDfldsYpHZGX793/0y9/zmB7nsmt3s2LWFP//gfezZNckNt13H5rlZjj59jE994l6ePrbInftn+eHLZvr+XBom2oaBJCi87csn+e1HF/wcCKWAw6IMRVhEqib0cqGJSPiFG2lgVqUAp48BGtosUpFktaFNWic8+lOnOp/EKwL9mTv4r198nodOZnzb7gn2TIQRmIVCKvzxIwv82SMnec0rb+In3vyTJBMT0PFI/qqbr+GqG69idvN/5Q9/988pCnjt627Azk5RHJvHRomiJLHoyZNcfOlFXHLwIv7245/jpa9+Ca0tm8ifOU6SVkjf5QUsLfHqu17Jn37gL/jK40/z0H1P8i2vfQH/5098P9t3nxdmq3I8/qVH+fWfewvv/dj9bGkb/uWlM9iCgZkpi9xx34ke9zy2yF8/06VlIuFHpt1pw+dTX33crbzo9PpigAEFCLBVkOq9ki+QQP5QCb8wPn9TBDSZhDV6/uDIEp94tsuNW9pcNZuyfyplprD88WPz7Ngyxb/68e8laaXkx5/DJv72XaeLHW/zfT/8eu7/9GE++8CTTEyMByLCDVRllIUYU9OTJBbmtm1G89wD2Wg0h4ggvYwdO7exafMMjz/2NDfedgX/7pf/LUm7hVtY6F/v/P0X8lNv/kme+c4f571ffIIX7Rxn90TCydxxPHN8pVPw+GLOp49nPDifsVQoY1bInVariFP1ckUHlp/xx/Wl6DnbCkDEWPVXwY4Iisoy+EhBQ88vwaAvj1aKIKRJKywUyoeOLPE/v7rETMvQMoannuly60uuZOue89DFRZK04vltYnCdDpPbNnPpFfv5h/uepChyBsbZlzdrDdlSl8e//CRJOdRbqzkKauBDDC7rcfL5kwjwrf/0m0mmx8mPnSBJk/7p+Yl5Js/bwmtf98380k//Bj91/3O02kKvULqFslQonUKxCKmRgPi1vsy8K9tSaz1ddcjS9GuX5F6DJFmNtdLaTdaqXFxj0cTyHFe9zkMYNJkIY9Y34GLucA5mN8+iRjxT51y1h5ZTlFtuv4mZCcOWrZshD0rQOFezjGRqjJtuvY7WmGHvRbuh1/MKEJ+L4vKcdHqSA4cuYcu2Ka676Sr05CLWmui3HcYI2umw/+A+pqZSFrsZz+eOpdz38JYIM4mhbSU8p9ZNeUMJhrVhGfrpGvX+VSmArnKPzVcczhTla+fNfQ3QUH1eRKtmFuoRcd5M8qG+5KrWLTTU4imy1OWmW7+BndsmmZmdhrxApHGuKuocYgwve83tTE2NMzE53hd4fJ6gaJaRzkxy+8tuYWJykvHxNuKKgXsQ5/cktX3AGVvHXKHnyufT8MzUntkFl9gHghEOKKL2dKcglw1xAaUV6PMBqrgAA21wqy5EVkK1nnopm5IBLFxwE/ED1MKpmPluaqp/P+v1fEMVQQ21GY+VOdeCXrcXwF7pLlyduy3dR5GT9Xo+/VIUIT+gQ7Ij2scQ2kDuVU/XailZR43m7fv3yBIU0fdikLhWW8Iabup84cwon9/PY0tFDhmqlTPCEmX9GYPKMMpJMwnhhoxH9+9Xq26U5ykDw3TLXitxfVW5KI4bqlg1JeyfO/j7RKur4eomXsM6gETxe98lUl9neBQmUMeabmurAM0sYNTzmzlwV6ZvpaJFKzl7JbBB+HX+ewT91RBA0+wPU4CBFaJHlcCXkumXOC9zzejGitrC0Tqa3nX10K62yLQbzApuqAKc6g8W0cL3imJ1cGyzaJnLllou29R+M1QQ17KE2gddwy1AHMbF566kLBGYbHJd5TWIzlVZ1gIIdUGWPV8b8X3lHnQAR1X4SfuuoFhr6a+1BYgrpcpVQFww9+WwunI5VWOq9KEJc+5rhEwdFa9QaKMUafQ8JUNSaCsNsCYy/ctdF1Y3IL5S3/6S8JHwi2hJ2b7fp1pGvoYJ0Noy8+uxrYsC1HgBF3x4xAjGbkFQP3M2g3XwZV19tWBZFKYxxAI4iVoqPncIYi1jz+a5TQI/jlH7Uo0yXiOvSV+wRRzWaXysNYugrkL7A+dylhTgdH+4qHEvVSFALtUKWNUAEu2v7FWuplUu+yoDMa9b0QJIOQJVl+mt5WcSrqnLWJYSCDa/u4wFaNK75bFSJXp0SJTgomxpHElwthTgTAZWFAHomahAro9kw+xYWi7vHk2gpNCfR1UEColMdd8eDrcAqo6iULRwlW8fiFa8UNU5Xw0Un9uciM95u6TqcCUBZc2KFkAVcucov1JEoWGMC6qVwuurhvdxgGNdt4R13opofJiI+jHzsWL0/X5YCMmILySJasidqxaZVC0oigIRU83bS/W5NTA21qLVSiprIIN1eKC0WglJmpAGWrm0HC6UiNn+qk+OJLG02qk/x40apO1qYWTRX8azYkGd08GETxwJOK1ZjfXeEjZgi0PDEtX3wXQoiiyXa3VB6H1A7qp59FQVSSzp7CRkGfSyelysjjRN+Pn//IPs2r0dXVjyzF9RDOa6Ox32Xngeb/rlH2Lz5mm0l4WyNMFMtH0vX1jyjmlhkdtefB2HLt/nSSBX+CkydXhoKY16vSKCD3UM0CjubIR8G7GtGwaoNbaW69B6ltBHbBXjZzVeUVMxzheRaMAA/RKyVsL8V5/lz//o4xy+7wscP3aCYkg3abVT8izHrdCKIkKrldINjCBA2krZuXsbN950Jbfdfh1mvI1b7DK9aYrpLTNVYQkjwkCqJT3zKCApYjInapO4xKv8vFBWnDPo68YCxJNDaEQNazlGTCozX64RSMgQmsK7hLxwTIwZPvvAw/zA63+WBx96hrkZYWJqYnDUcPDxssqZQfxaf9WJRV7w6b/7PO/93b/mxpsu4off+F3sO7QPt7hUuZ1RWCkiiMqciEZJn5oliAKMkv9vCv9rwgKsqTKERjH9moBA9oRxAhLMfoFfNLm0pQXKWDvhoc8+xszsBD/x77+bF95xE5s2zSKytvdYOMeTT3yVD733z3j3O/6MN/7Qr/Bf3vJjXHDJHlynN1oBhmCAPsEzJKwrnVKBVvhgg4W/4QpAwx2YYAlsmFqlzw5Ho3w0kEFZL2fr9ln+w5vfyIEXXA0nF9fJUVr2H7qQ/b/wBvZdvJs3/cxv89Y338ObfuVHQsSoy+fEnfaFX4QkhosTP3FeIAKHhW6AvT8bGGDURYtw7bKnO1GM88u/mtDzXQCGYwJFVvD677uTAzdcSvbUERJrWfPuX97ekkMRXn33K7jvHx7gT/7oUzz46Ye44uZDuJMdPy3ssIdyFV+geAxAzP2XkaLoAC2sZ0H4Mf3OWbEEccq08IRQ4XxvKd8XFWzue/9tt1yFPvMsiRZI0UPy7rrspsih10F7Hb7xm24kz+Ezn3kIrEXVDYnhGjtVxq8IYLB8Lofiivqzny3hnxUXMMxyoj6NrOrTwYVHgd5NWMAVzM3NMN4WJOsMzdms9SZOkaUFts5NMj4Ozxx9DrJssGxsFBNIxUG5IHgi5F+a/rO9Jct7Q5zz82yvrxKUfj8ogoRZKETFm1FjWFxcwnWXUGnVc8frqJnqYOn5k2SZMD7eBuvHEXq0yogw0PXVodAKxxTNsriNsLKQ2RX0bFkFaEOxpHpSRbZshEtwRPM8G88O5jlkY5anv3qcz3/uEa64/gD50qLHAOsp/6wgmUq4997P0cuUgwfO9yOQy6qXoTkDrSUYi/C63+N1g3u96skJPyfn6SnAE5BtgflovOd697tqpLUrRxMr884wUeT89tv+nP+4fwetsRba6ZzRuPjR5FBomJkJHrn3Id7zvr9h/yWbue76g7DUwRqGl+UEC6AaWQBXDxA20NWXHNr8oysowHJD8cKsuDy6ngHByIi6jJ0dnMwcY+Mp937my/zcz93DEw8/hVBgrPrZ4dZwF6vgcv7hY/fxf//8u3j2mUW+91+8iqmtM7gsZ8UyzEAFNzN9G4zzyr7xKF4BRs4fliwPAchV9eHmSoDrCr6iJ4iraPJc2bZ1io9/8kv8wz/+Bt9w9UVs2zLlJ5FewzvL8oJHn3iWex84QrsFP/qj38IdL78RPbnkJ3waVZlRUntRQUjhqlm/ZGN7kQOsqj4cy/L0ogBj7g9ximyY6g5ga8PiUo8Xv+gAt95yBe9538e594HH6PbyNeWCynUGZ6cneMXLr+bOO1/EoWsuwS11g6nUZdytLzLNe1m/8tdFE4RssAUwfdk1EmGnogB+HoYs+ytNkjycqxulCLFPzsK0f0ePPsetL72eW2+9kmPPnuDEiQWcW8uYUEnTlLm5Kabm/OJQuhB6vsiyCE6dQ43h6aefo9vNyEnRsxPolfm13GTZx2NZnpYCPAtfmFN9AJFrqGaE3zgFAHqFIx9L+PIjR3jy84+z68IdzG2dZW7H5rVnA0PBvna6ftqYcgzAsmyNIOoQHPff/zCdrrKYCGdp8zJSfeBZ+OKZKEDpOwpEPgBcczYIK8FbgHk1tE8s8eG//DTf9f2vITv2vB/1u8Y0Wn+mk7BE/Gqur84hLctzTxzlr/7qfkzbcnypwMrZIXvC4Nf3Uw61qHJPp0wFK0DPmPeoX9xzjWdeXKU9E/hqR5FWwh/84d/w6OEvk05PoHkxcm2+0937C1lrXFY+elfncOqQVsrb/8dfcPTpExxT62dAP3vmP+sZ897V4E67iguaXlEcHTPmSgOXUw3q3VBE03O+NmA863Hf4Ue5+Yb9TG2bxXWyfuwd5+PXnSh0inMOk1rM5Bjve+eH+d3f+yhFK+XzC2eN3C9n433/fJb9N+IK+9NUgLIttWXMowL/gvq6jxunBALzGYy3E7JjJ/jbTz3EBTvn2HXBdmQs7ZtsMRLicFdVB6/ZTn9xSBlLMeMt5o+f5Lf+nw9xz7s+AmnK5xaVTrHMCmjrH0Cpg+/pOvcUq5g/XE6hE7rZJHmbgX8elvw5K4kkp3DxpGG7ZBgr3HTjZdzywss4sO88ZmYmEBHG2int8ban4k5jCvWVNLHICg5//gn+8TOP8Jf/32d44vFn0bEWn1twzGeQyFlJ7ecCicLbnsvz715N7z9VBdBx2NlOkvuAOVhxqZ912wqFrW3hgjaYXkbLwMTUGEliyQrHptlJfvFn7ua8PVv9PIBmbbqjqiLtlLe+9YO85/1/68vbEsMJEh5ddPRcVNa+8chfgGPdPL9qCY5QTdBy2jxA8wfMEjyVOvcGa8w9Za0mZwHrJALPdJXjPdjcajEr0FrIsWRMWlhc7HL0mROcd8G2aGjSWmmf49izzwNwvDXGEwsFS4Wrj2nYeNPvBJLCuTcswVMrIf/TUYA+wpx37l2zIrcYkX8dUsXpRj10bM3Lxn6m6zjaLQeXCAfHYc9EytRUG1y+4iTUp2wBDExNtnEKX+k4FgulDPk3OuQri48NpE711+ede9epCP90FMAB9kRR/MhMklxo4FUbiQeGLVBm43WIo3o7V8RzA8haaQCoC+yjt0RrDTFOsT1ygbSAD84XxY9Qrc15ipzxqStBL8nz1znVj5dLKnP2GmG4AFTXb49+4ixuuUDiVD+W5PndQI/TqDVJTrPNzTGY31wUrymMeacReXWECQxfC1tM5KyxBait6bbxWuDw+f7EqX4wce7uMBGk4TS8kDmDmzDH4cS8c3eqc28J5sdoVOG8kfugNVjvX9v4Z9T+kFmsOveWeefuPBPhc4a9texa2QnVN6jqP1M4IhW5VJxF90g0A8Pa72zQuK3qV8qhFFbhiKrefUL1DXh6XjgD/GnW4OYEMPPO/Q9TFC9QeFswUeXSyTkbVwcZc7Wr4vJPb1/3otQSa+WEObmDA3qbLYqb5527h2qGpTNq12SNblYB+xw8SlF893SS/Kaq/huB1zbCxCJSmnWllLVM1qjzI3nXKAxE3VprctODSXCnEnj9zMH7Efm15/P8E2Xwcyqh3norQCxcASTc6Ccm4XJrzJ0Kr0XkkEAb1s96xpqVhinLjZU1qxmwYakTK/USrzN8loF1rBS6qD4IfKBw7v0LcDhmZNdK+GutAHF7GIAFOIxzh4E3TcMlzpgXoXo5IhcL7FWYQWQKv0DH2tjNMPFSp5tBXuCyYlWLN67Kq6hirNDNimCj9UwVIEP1pMC8g0dR/SIiD4pzH3veF3MUDVe95lzTehE4LrpxA+TPw0M491AUQCdAsg2SYo1Cx+fxq8Z384Lnjh6HfVs5bmCtBjUYAXo9lp7u0RmDzrGcsTOxKOCOej+f97mUelhZLn++biTjRvH40uAIznKE8DW5lb4fll8J7utSATb8t9eTn1mvQcnn+sC57dx2bju3ndvObee2c9u5bUO2/x+sNkU6oXguqQAAAABJRU5ErkJggg==";var Zp={apiKey:"AIzaSyDvjnOLzYEHGV7ae_VWZ-LUeAJ8i4WTY9Q",authDomain:"bul-jumeok-e910b.firebaseapp.com",projectId:"bul-jumeok-e910b",storageBucket:"bul-jumeok-e910b.firebasestorage.app",messagingSenderId:"727813238723",appId:"1:727813238723:web:b308d312c3d34e7fb61776"},Fl=new URLSearchParams(location.search).has("emu")&&/^(localhost|127\.0\.0\.1)$/.test(location.hostname),om=Na(Fl?Object.assign({},Zp,{projectId:"demo-bulfist"}):Zp),or=hc(om),W=jp(om);Fl&&(As(or,"http://127.0.0.1:9099",{disableWarnings:!0}),Tl(W,"127.0.0.1",8080),window.__bfTest={signInGoogle:function(n){return sc(or,Vt.credential(JSON.stringify({sub:n,email:n+"@example.com",email_verified:!0})))},tryWriteMember:function(){return yi(Te(W,"members","hack"),{nick:"hack",no:99})},tryDeleteGuest:function(n){return _i(Te(W,"guestbook",n))},state:function(){return C}});var lI="\uBD88\uC740 \uBB3C\uB85C \uB044\uBA74 \uB418\uC9C0\uB9CC, \uC6B0\uB9B0 \uBABB \uAEBC.",C={user:null,bossUid:null,bossKnown:!1,members:[],membersReady:!1,topics:[],guest:[],guestReady:!1,rooms:[],roomsReady:!1,roomId:null,room:null,roomMissing:!1,msgs:[],drafts:{},pick:null,confirmDelete:!1,gbConfirm:null,flipped:{},importing:!1};function ar(){return!!(C.user&&!C.user.isAnonymous&&C.bossUid&&C.bossUid===C.user.uid)}function Ti(){return C.user?C.user.uid:null}function h(n,e){let t=document.createElement(n);if(e)for(let r in e){let i=e[r];i==null||i===!1||(r==="class"?t.className=i:r==="text"?t.textContent=i:r.slice(0,2)==="on"?t.addEventListener(r.slice(2),i):t.setAttribute(r,i===!0?"":i))}for(let r=2;r<arguments.length;r++)Ke(t,arguments[r]);return t}function Ke(n){for(let e=1;e<arguments.length;e++){let t=arguments[e];t==null||t===!1||(Array.isArray(t)?t.forEach(function(r){Ke(n,r)}):n.appendChild(typeof t=="string"?document.createTextNode(t):t))}}function bi(n,e,t){let r=h(n,Object.assign({id:e},t||{}));return r.value=C.drafts[e]||"",r.addEventListener("input",function(){C.drafts[e]=r.value}),r}function am(n){return typeof n=="string"&&(/^data:image\/(jpeg|png|webp);base64,/.test(n)||/^https:\/\//.test(n))?n:""}function hI(n,e){return(n.no||0)-(e.no||0)}function Mo(n){return"BF-26-"+String(n.no||0).padStart(3,"0")}function rt(n){return C.members.find(function(e){return e.id===n})||null}function J(n){let e=rt(n);return e?e.nick:"\uD0C8\uD1F4\uD55C \uC870\uC9C1\uC6D0"}function Ul(n){return h("img",{class:n,src:Xp,alt:"","aria-hidden":"true"})}function K(n){let e=h("div",{class:"toast",role:"status",text:n});document.body.appendChild(e),setTimeout(function(){e.remove()},2800)}function ce(n){let e=n&&n.code||"";return e.indexOf("permission-denied")>=0?"\uAD8C\uD55C\uC774 \uC5C6\uC5B4\uC694. \uB450\uBAA9 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uB294\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694.":e.indexOf("unavailable")>=0?"\uC778\uD130\uB137 \uC5F0\uACB0\uC774 \uBD88\uC548\uC815\uD574\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.":"\uCC98\uB9AC\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694."}function dI(n){if(!n||!n.toDate)return"\uBC29\uAE08";let e=n.toDate(),t=(Date.now()-e.getTime())/1e3;return t<60?"\uBC29\uAE08":t<3600?Math.floor(t/60)+"\uBD84 \uC804":t<86400?Math.floor(t/3600)+"\uC2DC\uAC04 \uC804":e.getMonth()+1+"\uC6D4 "+e.getDate()+"\uC77C"}function _e(n){location.hash.slice(1)===n?re():location.hash=n}function cm(){return location.hash.slice(1)||"hq"}var fI=1.1;function pI(n){function e(){let r=n.naturalWidth,i=n.naturalHeight;if(!r||!i)return;let s=n.parentNode,a=s?s.clientWidth:0,c=s?s.clientHeight:0,l=a&&c?a/c:.8,f=r/i,p=fI;p*f/l<1&&(p=l/f),n.style.height=p*100+"%",n.classList.add("fit")}function t(){requestAnimationFrame(e)}n.complete&&n.naturalWidth?t():n.addEventListener("load",t)}function Zt(n,e){let t=am(n&&n.photo);if(t){let r=h("img",{class:"photo",src:t,alt:(n.nick||"")+" \uC0AC\uC9C4"});return pI(r),h("div",{class:"ph"},r)}return h("div",{class:"nophoto",role:"img","aria-label":"\uC0AC\uC9C4 \uC5C6\uC74C \xB7 \uC218\uBC30\uC911"},h("span",{class:"np-stamp",text:"\uC218\uBC30\uC911"}),h("em",{text:e||"\uC0AC\uC9C4 \uBBF8\uD655\uBCF4"}))}var Nl="bf-me",um=null;function Lo(){try{let n=localStorage.getItem(Nl);if(n)return n}catch{}return um}function Ol(n){um=n;try{n?localStorage.setItem(Nl,n):localStorage.removeItem(Nl)}catch{}}function be(){let n=Lo();return n&&n!=="guest"?rt(n):null}function em(){if(!C.members.length)return!1;let n=Lo();return n==="guest"?!1:!n||!rt(n)}function mI(){if(Lo()==="guest")return"\uC190\uB2D8 (\uBA85\uBD80 \uBBF8\uB4F1\uB85D)";let e=be();return e?e.nick+" \xB7 "+Mo(e):"\uBBF8\uD655\uC778"}function gI(n){let e={hq:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',members:'<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M18 14.8c1.8.7 3 2.5 3 5.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',games:'<rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.4" fill="currentColor"/>',guestbook:'<path d="M5 4h11l3 3v13H5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'},t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t.innerHTML=e[n],t}var xo=[{name:"\uC74C\uC2DD",words:["\uAE40\uCE58\uCC0C\uAC1C","\uB5A1\uBCF6\uC774","\uC0BC\uACB9\uC0B4","\uCE58\uD0A8","\uD53C\uC790","\uC9DC\uC7A5\uBA74","\uB77C\uBA74","\uCD08\uBC25","\uBE44\uBE54\uBC25","\uD584\uBC84\uAC70","\uB0C9\uBA74","\uC21C\uB300","\uB9C8\uB77C\uD0D5","\uD0D5\uD6C4\uB8E8","\uAE40\uBC25"]},{name:"\uB3D9\uBB3C",words:["\uACE0\uC591\uC774","\uAC15\uC544\uC9C0","\uD638\uB791\uC774","\uD3AD\uADC4","\uAE30\uB9B0","\uCF54\uB07C\uB9AC","\uD584\uC2A4\uD130","\uD310\uB2E4","\uD1A0\uB07C","\uC0C1\uC5B4","\uBD80\uC5C9\uC774","\uB108\uAD6C\uB9AC","\uB099\uD0C0","\uBB38\uC5B4"]},{name:"\uC7A5\uC18C",words:["\uD559\uAD50","\uBCD1\uC6D0","\uACF5\uD56D","\uCC1C\uC9C8\uBC29","\uB180\uC774\uACF5\uC6D0","\uD3B8\uC758\uC810","\uB3C4\uC11C\uAD00","\uC601\uD654\uAD00","\uB178\uB798\uBC29","\uC218\uC601\uC7A5","\uCEA0\uD551\uC7A5","PC\uBC29","\uACB0\uD63C\uC2DD\uC7A5","\uC9C0\uD558\uCCA0"]},{name:"\uC9C1\uC5C5",words:["\uC758\uC0AC","\uC18C\uBC29\uAD00","\uACBD\uCC30","\uC694\uB9AC\uC0AC","\uC120\uC0DD\uB2D8","\uC720\uD29C\uBC84","\uBBF8\uC6A9\uC0AC","\uD30C\uC77C\uB7FF","\uD0DD\uBC30\uAE30\uC0AC","\uBCC0\uD638\uC0AC","\uC544\uC774\uB3CC","\uB9C8\uC220\uC0AC","\uD504\uB85C\uAC8C\uC774\uBA38","\uBC14\uB9AC\uC2A4\uD0C0"]},{name:"\uBB3C\uAC74",words:["\uC6B0\uC0B0","\uB0C9\uC7A5\uACE0","\uCE6B\uC194","\uC548\uACBD","\uB9AC\uBAA8\uCEE8","\uD734\uB300\uD3F0","\uBCA0\uAC1C","\uAC00\uC704","\uAC70\uC6B8","\uC9C0\uAC11","\uC774\uC5B4\uD3F0","\uC120\uD48D\uAE30","\uC190\uD1B1\uAE4E\uC774","\uB4DC\uB77C\uC774\uAE30"]},{name:"\uC2A4\uD3EC\uCE20",words:["\uCD95\uAD6C","\uC57C\uAD6C","\uB18D\uAD6C","\uBC30\uB4DC\uBBFC\uD134","\uBCFC\uB9C1","\uC218\uC601","\uD0DC\uAD8C\uB3C4","\uC2A4\uD0A4","\uD0C1\uAD6C","\uACE8\uD504","\uB9C8\uB77C\uD1A4","\uD074\uB77C\uC774\uBC0D","\uBCF5\uC2F1","\uB2F9\uAD6C"]},{name:"\uB098\uB77C\xB7\uB3C4\uC2DC",words:["\uC77C\uBCF8","\uBBF8\uAD6D","\uD504\uB791\uC2A4","\uC774\uD0C8\uB9AC\uC544","\uBCA0\uD2B8\uB0A8","\uD638\uC8FC","\uC774\uC9D1\uD2B8","\uBE0C\uB77C\uC9C8","\uC2A4\uC704\uC2A4","\uC81C\uC8FC\uB3C4","\uBD80\uC0B0","\uB274\uC695","\uD30C\uB9AC","\uD558\uC640\uC774"]},{name:"\uC601\uD654\xB7\uB4DC\uB77C\uB9C8",words:["\uAE30\uC0DD\uCDA9","\uC624\uC9D5\uC5B4 \uAC8C\uC784","\uD0C0\uC774\uD0C0\uB2C9","\uACA8\uC6B8\uC655\uAD6D","\uD574\uB9AC\uD3EC\uD130","\uC5B4\uBCA4\uC838\uC2A4","\uBC94\uC8C4\uB3C4\uC2DC","\uC778\uC0AC\uC774\uB4DC \uC544\uC6C3","\uB354 \uAE00\uB85C\uB9AC","\uC751\uB2F5\uD558\uB77C 1988","\uC774\uC0C1\uD55C \uBCC0\uD638\uC0AC \uC6B0\uC601\uC6B0","\uC544\uBC14\uD0C0","\uBD80\uC0B0\uD589","\uADF9\uD55C\uC9C1\uC5C5"]}];function yI(){return xo.concat(C.topics.filter(function(n){return n.name&&Array.isArray(n.words)&&n.words.length>=2}).map(function(n){return{name:n.name,words:n.words}}))}function lm(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Fo(n,e,t){let r=lm(e),i=n[Math.floor(r()*n.length)],s=Math.floor(r()*t.length),a=Math.floor(r()*(t.length-1));a>=s&&a++;let c=n.slice();for(let l=c.length-1;l>0;l--){let f=Math.floor(r()*(l+1)),p=c[l];c[l]=c[f],c[f]=p}return c[0]===i&&c.push(c.shift()),{liar:i,word:t[s],fool:t[a],order:c}}function _I(n){return!n||!n.topic||!Array.isArray(n.lineup)||!n.lineup.length?null:Fo(n.lineup,n.seed,n.topic.words)}function Do(n){return String(n||"").replace(/\s+/g,"").toLowerCase()}function vI(){$t(Te(W,"config","boss"),function(e){C.bossUid=e.exists()?e.data().uid:null,C.bossKnown=!0,re()},function(){C.bossKnown=!0,re()}),$t(Ge(W,"members"),function(e){C.members=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(hI),C.membersReady=!0,re()},function(){C.membersReady=!0,re()}),$t(Ge(W,"liarTopics"),function(e){C.topics=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(function(t,r){return(t.order||0)-(r.order||0)}),re()}),$t(Io(Ge(W,"guestbook"),Eo("createdAt","desc"),To(150)),function(e){C.guest=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),C.guestReady=!0,re()},function(){C.guestReady=!0,re()});let n=ye.fromMillis(Date.now()-12*3600*1e3);$t(Io(Ge(W,"rooms"),Yp("createdAt",">",n),Eo("createdAt","desc"),To(20)),function(e){C.rooms=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}),C.roomsReady=!0,re()},function(){C.roomsReady=!0,re()})}var So=[];function hm(n){C.roomId!==n&&(So.forEach(function(e){e()}),So=[],C.roomId=n,C.room=null,C.roomMissing=!1,C.msgs=[],n&&(So.push($t(Te(W,"rooms",n),function(e){C.room=e.exists()?Object.assign({id:e.id},e.data()):null,C.roomMissing=!e.exists(),re()})),So.push($t(Io(Ge(W,"rooms",n,"msgs"),Eo("createdAt"),To(400)),function(e){C.msgs=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),re()}))))}oc(or,function(n){C.user=n,n||ic(or).catch(function(){K("\uBCF8\uBD80\uC5D0 \uC5F0\uACB0\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694.")}),re()});async function wI(){try{await lc(or,new Vt),K("\uAD6C\uAE00 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uC5B4\uC694.")}catch(n){let e=n&&n.code||"";if(e.indexOf("popup-closed")>=0||e.indexOf("cancelled")>=0)return;e.indexOf("popup-blocked")>=0?K("\uD31D\uC5C5\uC774 \uB9C9\uD614\uC5B4\uC694. \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uD31D\uC5C5\uC744 \uD5C8\uC6A9\uD574 \uC8FC\uC138\uC694."):e.indexOf("unauthorized-domain")>=0?K("\uC774 \uC8FC\uC18C\uAC00 Firebase \uC2B9\uC778\uB41C \uB3C4\uBA54\uC778\uC5D0 \uC5C6\uC5B4\uC694."):K("\uB85C\uADF8\uC778\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.")}}async function Cl(){await ac(or),K("\uB85C\uADF8\uC544\uC6C3\uD588\uC5B4\uC694.")}async function II(){try{await yi(Te(W,"config","boss"),{uid:Ti(),since:nt()}),K("\uC774 \uACC4\uC815\uC774 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uB410\uC5B4\uC694.")}catch(n){K(ce(n))}}async function EI(){if(!C.importing){C.importing=!0,re();try{let e=await(await fetch("seed.json",{cache:"no-store"})).json(),t=$p(W);(e.members||[]).forEach(function(r){let i=Object.assign({},r);delete i.id,t.set(Te(W,"members",r.id),i)}),(e.liarTopics||[]).forEach(function(r,i){t.set(Te(Ge(W,"liarTopics")),{name:r.name,words:r.words,order:i+1})}),await t.commit(),K("\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D\uC744 \uBAA8\uB450 \uAC00\uC838\uC654\uC5B4\uC694.")}catch(n){K(ce(n))}C.importing=!1,re()}}function TI(){let n=C.members.length,e=C.rooms.filter(function(t){return t.status&&t.status!=="closed"}).length;return h("section",{class:"screen"},n?h("div",{class:"whoami"},h("div",null,h("span",{class:"eyebrow",text:"\uD604\uC7AC \uC2E0\uC6D0"}),h("b",{text:mI()})),h("button",{class:"ghost",type:"button",onclick:function(){Ol(null),re()},text:"\uC2E0\uC6D0 \uBCC0\uACBD"})):null,h("div",{class:"cover"},h("div",{class:"cover-meta"},h("span",{class:"eyebrow",text:"\uBB38\uC11C\uBC88\uD638 BF-HQ-001"}),h("span",{class:"eyebrow",text:"\uC5F4\uB78C \uC81C\uD55C \xB7 \uC870\uC9C1\uC6D0 \uC804\uC6A9"})),h("div",{class:"stamp","aria-hidden":"true",text:"\uADF9\uBE44"}),h("div",{class:"cover-title"},Ul("logo-l"),h("h1",null,h("span",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"}),"\uBE44\uBC00\uBCF8\uBD80")),h("p",{class:"motto"},h("q",{text:lI}),h("small",{text:"\uC870\uC9C1 \uAC15\uB839 \uC81C1\uC870"}))),h("div",{class:"actions"},h("button",{class:"btn primary",type:"button",onclick:function(){_e("members")}},h("span",null,h("small",{text:"\uBA85\uBD80 \uC5F4\uB78C"}),"\uC870\uC9C1\uC6D0 \uBCF4\uAE30"),h("span",{class:"arr",text:"\u2192"})),h("button",{class:"btn",type:"button",onclick:function(){_e("games")}},h("span",null,h("small",{text:"\uD734\uAC8C \uAD6C\uC5ED"}),"\uAC8C\uC784\uBC29"),h("span",{class:"arr",text:"\u2192"}))),h("div",{class:"ledger"},h("div",null,h("b",{text:String(n)}),h("span",{text:"\uB4F1\uB85D \uC870\uC9C1\uC6D0"})),h("div",null,h("b",{text:String(e)}),h("span",{text:"\uC5F4\uB9B0 \uAC8C\uC784\uBC29"})),h("div",null,h("b",{text:String(C.guest.length)}),h("span",{text:"\uBC29\uBA85\uB85D"}))),h("details",{class:"guide"},h("summary",{text:"\uBCF8\uBD80\uB97C \uD648 \uD654\uBA74\uC5D0 \uB450\uB294 \uBC95"}),h("div",{class:"guide-body"},h("div",null,h("h3",{text:"\uC544\uC774\uD3F0 (Safari)"}),h("ol",null,h("li",{text:"\uC774 \uC8FC\uC18C\uB97C Safari\uB85C \uC5FD\uB2C8\uB2E4."}),h("li",{text:"\uC544\uB798\uCABD \uACF5\uC720 \uBC84\uD2BC(\uB124\uBAA8\uC5D0 \uD654\uC0B4\uD45C)\uC744 \uB204\uB985\uB2C8\uB2E4."}),h("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))),h("div",null,h("h3",{text:"\uC548\uB4DC\uB85C\uC774\uB4DC (Chrome)"}),h("ol",null,h("li",{text:"\uC774 \uC8FC\uC18C\uB97C Chrome\uC73C\uB85C \uC5FD\uB2C8\uB2E4."}),h("li",{text:"\uC624\uB978\uCABD \uC704 \u22EE \uBA54\uB274\uB97C \uB204\uB985\uB2C8\uB2E4."}),h("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019 \uB610\uB294 \u2018\uC571 \uC124\uCE58\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))))),bI())}function bI(){let n=C.user;return!n||n.isAnonymous?h("div",{class:"boss-row"},h("button",{type:"button",class:"link-btn",onclick:wI,text:"\uB450\uBAA9 \uB85C\uADF8\uC778"})):C.bossKnown&&!C.bossUid?h("div",{class:"panel"},h("div",{class:"field-label",text:"\uB450\uBAA9 \uB4F1\uB85D"}),h("p",{class:"note",text:"\uC544\uC9C1 \uB450\uBAA9\uC774 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC558\uC5B4\uC694. \uC9C0\uAE08 \uB85C\uADF8\uC778\uD55C \uAD6C\uAE00 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uD560\uAE4C\uC694? \uD55C \uBC88 \uB4F1\uB85D\uD558\uBA74 \uC774 \uACC4\uC815\uB9CC \uC870\uC9C1\uC6D0\uACFC \uC8FC\uC81C\uB97C \uACE0\uCE60 \uC218 \uC788\uC5B4\uC694."}),h("button",{type:"button",class:"save",onclick:II,text:"\uC774 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D"}),h("button",{type:"button",class:"link-btn",onclick:Cl,text:"\uB85C\uADF8\uC544\uC6C3"})):ar()?h("div",{class:"boss-row"},C.members.length===0&&C.membersReady?h("button",{type:"button",class:"save",disabled:C.importing,onclick:EI,text:C.importing?"\uAC00\uC838\uC624\uB294 \uC911\u2026":"\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D \uAC00\uC838\uC624\uAE30"}):null,h("span",{class:"note",text:"\uB450\uBAA9\uC73C\uB85C \uB85C\uADF8\uC778\uB428"}),h("button",{type:"button",class:"link-btn",onclick:Cl,text:"\uB85C\uADF8\uC544\uC6C3"})):h("div",{class:"boss-row"},h("span",{class:"note",text:"\uC774 \uAD6C\uAE00 \uACC4\uC815\uC740 \uB450\uBAA9\uC774 \uC544\uB2C8\uC5D0\uC694."}),h("button",{type:"button",class:"link-btn",onclick:Cl,text:"\uB85C\uADF8\uC544\uC6C3"}))}function AI(){let n=C.pick&&rt(C.pick);return h("section",{class:"gate"},Ul("logo-g"),h("div",null,h("span",{class:"eyebrow",text:"\uCD9C\uC785 \uD1B5\uC81C \xB7 \uC2E0\uC6D0 \uD655\uC778"}),h("h1",null,"\uBCF8\uBD80\uC5D0 \uB4E4\uC5B4\uC624\uB824\uBA74",h("br"),h("em",{text:"\uC2E0\uC6D0"}),"\uC744 \uBC1D\uD600\uB77C."),h("p",{text:"\uC790\uAE30 \uCE74\uB4DC\uB97C \uD55C \uBC88\uB9CC \uACE0\uB974\uBA74 \uC774 \uD3F0\uC774 \uAE30\uC5B5\uD574\uC694. \uAC8C\uC784\uACFC \uBC29\uBA85\uB85D\uC5D0\uC11C \uC774 \uC774\uB984\uC744 \uC368\uC694."})),h("div",{class:"pick",role:"group","aria-label":"\uC870\uC9C1\uC6D0 \uC120\uD0DD"},C.members.map(function(e){return h("button",{type:"button","aria-pressed":C.pick===e.id?"true":"false",onclick:function(){C.pick=e.id,re()}},h("div",{class:"pp"},Zt(e)),h("span",{class:"pn",text:e.nick}))})),h("button",{class:"save",type:"button",disabled:!n,onclick:function(){n&&(Ol(n.id),C.pick=null,re(),K("\u2018"+n.nick+"\u2019 \uC2E0\uC6D0\uC73C\uB85C \uC785\uC7A5\uD588\uC5B4\uC694."))}},n?"\u2018"+n.nick+"\u2019 \uC2E0\uBD84\uC73C\uB85C \uC785\uC7A5":"\uC704\uC5D0\uC11C \uC790\uAE30 \uCE74\uB4DC\uB97C \uACE0\uB974\uC138\uC694"),h("button",{class:"guest-btn",type:"button",onclick:function(){Ol("guest"),C.pick=null,re()},text:"\uBA85\uBD80\uC5D0 \uC544\uC9C1 \uC5C6\uC5B4\uC694 \xB7 \uC190\uB2D8\uC73C\uB85C \uC785\uC7A5"}))}function SI(){let n=C.members,e=n.length?h("div",{class:"roster"},n.map(function(t){return h("button",{class:"card",type:"button","aria-label":t.nick+" \uC218\uBC30\uC11C \uC5F4\uAE30",onclick:function(){_e("m-"+t.id)}},h("div",{class:"card-photo"},Zt(t),h("span",{class:"tag"+(t.rank?" boss":""),text:t.rank||"\uC218\uBC30\uC911"}),Lo()===t.id?h("span",{class:"me-tag",text:"\uBCF8\uC778"}):null),h("div",{class:"card-body"},h("span",{class:"card-no",text:Mo(t)}),h("span",{class:"card-name",text:t.nick}),t.alias?h("span",{class:"card-alias",text:"\uC77C\uBA85 "+t.alias}):null))})):h("div",{class:"empty",text:C.membersReady?"\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC870\uC9C1\uC6D0\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.":"\uBA85\uBD80\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return h("section",{class:"screen"},h("div",{class:"sec-head"},h("div",null,h("span",{class:"eyebrow",text:"\uC870\uC9C1\uC6D0 \uBA85\uBD80"}),h("h2",{text:"\uC218\uBC30 \uB300\uC0C1 "+n.length+"\uBA85"}),h("p",{text:"\uCE74\uB4DC\uB97C \uB204\uB974\uBA74 \uC218\uBC30\uC11C\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4."})),ar()?h("button",{class:"add-btn",type:"button",onclick:function(){Am(null)},text:"\uC870\uC9C1\uC6D0 \uB4F1\uB85D"}):null),e)}function RI(n){let e=rt(n);if(!e)return h("section",{class:"screen"},h("button",{class:"back",type:"button",onclick:function(){_e("members")},text:"\uBA85\uBD80\uB85C"}),h("div",{class:"empty",text:C.membersReady?"\uC774 \uC218\uBC30\uC11C\uB294 \uD3D0\uAE30\uB418\uC5C8\uAC70\uB098 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.":"\uC218\uBC30\uC11C\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"}));let t=(e.charges||[]).filter(function(a){return a&&String(a).trim()}),r=h("div",{class:"ruler","aria-hidden":"true"},["190","180","170","160","150","140","130","120","110","100"].map(function(a){return h("span",{text:a})})),i=h("article",{class:"poster","aria-label":e.nick+" \uC218\uBC30\uC11C"},h("header",{class:"poster-top"},h("div",{class:"w",text:"\uC218\uBC30"}),h("div",{class:"sub",text:e.rank==="\uB450\uBAA9"?"WANTED \xB7 1\uAE09 \uC218\uBC30 \xB7 \uC870\uC9C1 \uB450\uBAA9":"WANTED \xB7 \uBD88\uC8FC\uBA39\uC870\uC9C1 \uB0B4\uBD80 \uC218\uBC30\uC11C"})),h("div",{class:"case"},h("span",null,"\uC0AC\uAC74\uBC88\uD638 ",h("b",{text:Mo(e)})),h("span",null,"\uC9C1\uC704 ",h("b",{text:e.rank||"\uC870\uC9C1\uC6D0"}))),h("div",{class:"mug"},Zt(e),r,h("i",{class:"corner tl"}),h("i",{class:"corner tr"}),h("i",{class:"corner bl"}),h("i",{class:"corner br"})),h("div",{class:"ident"},h("div",{class:"eyebrow",text:"\uB2C9\uB124\uC784"}),h("div",{class:"nick",text:e.nick}),e.alias?h("div",{class:"alias"},"\uC77C\uBA85 ",h("b",{text:"\u2018"+e.alias+"\u2019"})):null),h("div",{class:"field"},h("div",{class:"field-label",text:"\uBCF8\uC778 \uC9C4\uC220"}),h("p",{class:"statement",text:e.intro?"\u201C"+e.intro+"\u201D":"\uC9C4\uC220\uC744 \uAC70\uBD80\uD558\uACE0 \uC788\uC74C."})),h("div",{class:"field"},h("div",{class:"field-label",text:"\uD610\uC758 "+t.length+"\uAC74"}),t.length?h("ol",{class:"charges"},t.map(function(a){return h("li",{text:a})})):h("p",{class:"statement",text:"\uC544\uC9C1 \uB4DC\uB7EC\uB09C \uD610\uC758 \uC5C6\uC74C. \uC218\uC0AC \uC911."})),e.sample?h("div",{class:"draft-note",text:"\uC784\uC2DC \uAE30\uB85D \xB7 \uB450\uBAA9\uC774 \uACE7 \uCC44\uC6B8 \uC608\uC815"}):null,h("div",{class:"stamp","aria-hidden":"true",text:"\uD655\uC778"}),h("footer",{class:"poster-foot"},h("span",{text:"\uC81C\uBCF4\uCC98: \uBD88\uC8FC\uBA39\uC870\uC9C1 \uBE44\uBC00\uBCF8\uBD80"}),h("span",{text:"\uBCF8 \uBB38\uC11C\uB294 \uC870\uC9C1\uC6D0 \uC678 \uC5F4\uB78C\uC744 \uAE08\uD568"}))),s=null;return ar()&&(s=C.confirmDelete?h("div",{class:"confirm"},h("p",{text:"\u2018"+e.nick+"\u2019 \uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD560\uAE4C\uC694? \uBAA8\uB4E0 \uC870\uC9C1\uC6D0 \uD654\uBA74\uC5D0\uC11C \uC0AC\uB77C\uC9D1\uB2C8\uB2E4."}),h("div",{class:"op-row"},h("button",{type:"button",onclick:function(){C.confirmDelete=!1,re()},text:"\uCDE8\uC18C"}),h("button",{type:"button",class:"danger",onclick:async function(){try{await _i(Te(W,"members",e.id)),C.confirmDelete=!1,_e("members"),K("\uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD588\uC5B4\uC694.")}catch(a){K(ce(a))}},text:"\uD3D0\uAE30\uD558\uAE30"}))):h("div",{class:"op-row"},h("button",{type:"button",onclick:function(){Am(e)},text:"\uC218\uBC30\uC11C \uC218\uC815"}),h("button",{type:"button",class:"danger",onclick:function(){C.confirmDelete=!0,re()},text:"\uD3D0\uAE30"}))),h("section",{class:"screen"},h("button",{class:"back",type:"button",onclick:function(){_e("members")},text:"\uBA85\uBD80\uB85C"}),i,s)}var PI=[{id:"assoc",code:"G-01",name:"\uC5F0\uC0C1\uD034\uC988",desc:"\uB2E8\uC5B4 \uD558\uB098\uB85C \uB5A0\uC62C\uB9AC\uB294 \uC870\uC9C1\uC6D0\uB4E4\uC758 \uBA38\uB9BF\uC18D.",ready:!1},{id:"mafia",code:"G-02",name:"\uB9C8\uD53C\uC544",desc:"\uC870\uC9C1 \uC548\uC5D0 \uC870\uC9C1\uC774 \uC788\uB2E4. \uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC529.",ready:!0},{id:"yut",code:"G-03",name:"\uC737\uB180\uC774",desc:"\uB3C4\xB7\uAC1C\xB7\uAC78\xB7\uC737\xB7\uBAA8\uB85C \uAC00\uB9AC\uB294 \uBCF8\uBD80 \uC11C\uC5F4.",ready:!1},{id:"liar",code:"G-04",name:"\uB77C\uC774\uC5B4",desc:"\uD63C\uC790\uB9CC \uC81C\uC2DC\uC5B4\uB97C \uBAA8\uB974\uB294 \uC0AC\uB78C\uC744 \uCC3E\uC544\uB77C.",ready:!0}];function CI(){return h("section",{class:"screen"},h("div",{class:"sec-head"},h("div",null,h("span",{class:"eyebrow",text:"\uD734\uAC8C \uAD6C\uC5ED"}),h("h2",{text:"\uAC8C\uC784\uBC29"}),h("p",{text:"\uAC8C\uC784\uC740 \uD558\uB098\uC529 \uC21C\uC11C\uB300\uB85C \uC5F4\uB9BD\uB2C8\uB2E4."}))),h("div",{class:"games"},PI.map(function(n){return h("button",{class:"game"+(n.ready?" ready":""),type:"button",disabled:!n.ready,"aria-label":n.name+(n.ready?" \uC5F4\uAE30":" \uC900\uBE44 \uC911"),onclick:n.ready?function(){_e("game-"+n.id)}:null},h("span",{class:"code",text:n.code}),h("h3",{text:n.name}),h("p",{text:n.desc}),h("span",{class:"status",text:n.ready?"\uC785\uC7A5 \uAC00\uB2A5":"\uC900\uBE44 \uC911"}))})))}var dm={lobby:"\uB300\uAE30 \uC911",hint:"\uC124\uBA85 \uC911",discuss:"\uD1A0\uB860 \uC911",vote:"\uD22C\uD45C \uC911",guess:"\uB77C\uC774\uC5B4 \uBC18\uACA9",result:"\uACB0\uACFC \uBC1C\uD45C"},No=Fl&&new URLSearchParams(location.search).has("fast")?parseFloat(new URLSearchParams(location.search).get("fast"))||10:0,Ro={hint:20,discuss:120,vote:20,guess:20};No&&Object.keys(Ro).forEach(function(n){Ro[n]=Math.max(2,Math.round(Ro[n]/No))});function kI(){let n=be(),e=C.rooms.filter(function(r){return r.status&&r.status!=="closed"&&r.type!=="mafia"}),t=e.length?h("ul",{class:"room-list"},e.map(function(r){let i=n&&(r.players||[]).indexOf(n.id)>=0;return h("li",null,h("button",{type:"button",class:"room-item",onclick:function(){_e("room-"+r.id)}},h("span",{class:"ri-main"},h("b",{text:J(r.createdBy)+"\uC758 \uBC29"}),h("span",{class:"ri-sub",text:(r.players||[]).map(J).join(", ")||"\uC544\uC9C1 \uC544\uBB34\uB3C4 \uC5C6\uC5B4\uC694"})),h("span",{class:"ri-side"},h("span",{class:"status-chip"+(r.status==="lobby"?" open":""),text:dm[r.status]||r.status}),h("span",{class:"ri-sub",text:(r.players||[]).length+"\uBA85"+(i?" \xB7 \uCC38\uAC00 \uC911":"")}))))})):h("div",{class:"empty",text:C.roomsReady?"\uC5F4\uB9B0 \uBC29\uC774 \uC5C6\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC870\uC9C1\uC6D0\uC744 \uBD88\uB7EC \uBAA8\uC73C\uC138\uC694.":"\uBC29 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return h("section",{class:"screen"},h("button",{class:"back",type:"button",onclick:function(){_e("games")},text:"\uAC8C\uC784\uBC29\uC73C\uB85C"}),h("div",{class:"sec-head"},h("div",null,h("span",{class:"eyebrow",text:"G-04"}),h("h2",{text:"\uB77C\uC774\uC5B4"}),h("p",{text:"\uBC29\uC744 \uB9CC\uB4E4\uAC70\uB098 \uC5F4\uB9B0 \uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uC138\uC694. \uC124\uBA85\uACFC \uD22C\uD45C\uB294 \uBAA8\uB450 \uAC8C\uC784 \uC548\uC5D0\uC11C \uD574\uC694."}))),h("button",{type:"button",class:"save",disabled:!n||!C.user,onclick:function(){fm("liar")}},n?"\uC0C8 \uBC29 \uB9CC\uB4E4\uAE30":"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uBC29\uC744 \uB9CC\uB4E4 \uC218 \uC788\uC5B4\uC694"),h("div",{class:"field"},h("div",{class:"field-label",text:"\uC5F4\uB9B0 \uBC29"}),t),xI(),ar()?hE():null)}function xI(){return h("details",{class:"guide"},h("summary",{text:"\uB77C\uC774\uC5B4 \uAC8C\uC784 \uADDC\uCE59"}),h("div",{class:"guide-body"},h("ol",null,h("li",{text:"\uBC29\uC744 \uB9CC\uB4E4\uACE0 \uB2E8\uD1A1\uBC29\uC5D0 \uC54C\uB824\uC694. \uB2E4\uB4E4 \uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0\uC11C \uADF8 \uBC29\uC744 \uB20C\uB7EC \uCC38\uAC00\uD574\uC694."}),h("li",{text:"3\uBA85 \uC774\uC0C1 \uBAA8\uC774\uBA74 \uC544\uBB34\uB098 \u2018\uAC8C\uC784 \uC2DC\uC791\u2019\uC744 \uB20C\uB7EC\uC694. \uB9CC\uB4E0 \uC0AC\uB78C\uB3C4 \uB77C\uC774\uC5B4\uAC00 \uB204\uAD70\uC9C0 \uBAB0\uB77C\uC694."}),h("li",{text:"\uAC01\uC790 \uCE74\uB4DC\uB97C \uBAB0\uB798 \uD655\uC778\uD574\uC694. \uB77C\uC774\uC5B4\uC5D0\uAC8C\uB294 \uC8FC\uC81C\uB9CC \uBCF4\uC5EC\uC694."}),h("li",{text:"\uB79C\uB364 \uC21C\uC11C\uB85C \uD55C \uBA85\uC529 \uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD574\uC694. \uD55C \uC0AC\uB78C\uB2F9 20\uCD08, \uC2DC\uAC04\uC774 \uC9C0\uB098\uBA74 \uB2E4\uC74C \uC0AC\uB78C\uC73C\uB85C \uB118\uC5B4\uAC00\uC694."}),h("li",{text:"\uC124\uBA85\uC774 \uB05D\uB098\uBA74 2\uBD84 \uB3D9\uC548 \uB300\uD654\uCC3D\uC5D0\uC11C \uD1A0\uB860\uD574\uC694. \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uC77C\uCC0D \uB05D\uB098\uC694."}),h("li",{text:"20\uCD08 \uC548\uC5D0 \uB77C\uC774\uC5B4\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC5D0\uAC8C \uD22C\uD45C\uD574\uC694."}),h("li",{text:"\uB77C\uC774\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4\uC5D0\uAC8C 20\uCD08\uC758 \uB9C8\uC9C0\uB9C9 \uAE30\uD68C\uAC00 \uC788\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC, \uBABB \uB9DE\uD788\uBA74 \uC870\uC9C1\uC6D0 \uC2B9\uB9AC. \uB3D9\uC810\uC774\uAC70\uB098 \uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD558\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC\uC608\uC694."})),h("p",{class:"note",text:"\uBC14\uBCF4 \uBAA8\uB4DC\uC5D0\uC11C\uB294 \uB77C\uC774\uC5B4\uB3C4 \uAC19\uC740 \uC8FC\uC81C\uC758 \uB2E4\uB978 \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC11C, \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778\uC9C0 \uBAA8\uB978 \uCC44 \uC124\uBA85\uD574\uC694."})))}async function fm(n){let e=be();if(!(!e||!C.user))try{let t=await vi(Ge(W,"rooms"),{type:n==="mafia"?"mafia":"liar",status:"lobby",createdAt:nt(),createdBy:e.id,players:[e.id],mode:0,topicChoice:-1,rounds:1,game:0,votes:{},turn:0});_e("room-"+t.id)}catch(t){K(ce(t))}}function Q(){return Te(W,"rooms",C.roomId)}async function Ei(n){try{await An(Q(),n)}catch(e){K(ce(e))}}async function pm(){let n=be();n&&await Ei({players:Ao(n.id)})}async function mm(){let n=be(),e=C.room;if(!n||!e)return;let t=(e.players||[]).filter(function(r){return r!==n.id});await Ei(t.length?{players:Pl(n.id)}:{players:Pl(n.id),status:"closed"}),_e("game-liar")}async function DI(){let n=yI();try{await Me(W,async function(e){let r=(await e.get(Q())).data();if(!r||r.status!=="lobby")throw{code:"phase"};let i=(r.players||[]).filter(function(l){return!!rt(l)}).slice().sort();if(i.length<3)throw{code:"few"};let s=r.topicChoice>=0&&xo[r.topicChoice]?xo[r.topicChoice]:n[Math.floor(Math.random()*n.length)],a=Math.floor(Math.random()*2147483647),c=Fo(i,a,s.words);e.update(Q(),{status:"hint",lineup:i,seed:a,topic:{name:s.name,words:s.words},order:c.order,turn:0,votes:{},accused:null,guess:null,winner:null,reason:null,game:(r.game||0)+1,startedAt:nt(),phase:(r.phase||0)+1,phaseAt:nt(),readyVote:[]})}),C.flipped={}}catch(e){e&&e.code==="few"?K("3\uBA85 \uC774\uC0C1 \uBAA8\uC5EC\uC57C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."):e&&e.code==="phase"?K("\uC774\uBBF8 \uAC8C\uC784\uC774 \uC2DC\uC791\uB410\uC5B4\uC694."):K(ce(e))}}async function gm(n,e){let t=be(),r=C.room,i=t?t.nick:"\uC190\uB2D8";return vi(Ge(W,"rooms",C.roomId,"msgs"),{uid:Ti(),memberId:t?t.id:null,nick:i,text:e,kind:n,game:r&&r.game||0,createdAt:nt()})}function Le(n,e){return Object.assign({phase:(n.phase||0)+1,phaseAt:nt()},e)}async function Vl(n,e,t){let r=be();await Me(W,async function(i){let a=(await i.get(Q())).data();if(!a||a.status!=="hint")throw{code:"phase"};if(t!=null&&a.phase!==t)throw{code:"phase"};let c=a.order.length,l=a.order[a.turn%c];if(n==="hint"&&l!==(r&&r.id))throw{code:"turn"};let f=Te(Ge(W,"rooms",C.roomId,"msgs"));i.set(f,{uid:Ti(),memberId:r?r.id:null,nick:r?r.nick:"\uC190\uB2D8",text:n==="hint"?e:n==="timeout"?J(l)+" \uC2DC\uAC04 \uCD08\uACFC! \uB2E4\uC74C \uC0AC\uB78C \uCC28\uB840\uC608\uC694.":J(l)+" \uCC28\uB840\uB97C \uB118\uACBC\uC5B4\uC694.",kind:n==="hint"?"hint":"skip",game:a.game||0,round:Math.floor(a.turn/c)+1,speaker:l,createdAt:nt()});let p=a.turn+1;i.update(Q(),Le(a,p>=c*(a.rounds||1)?{turn:p,status:"discuss",readyVote:[]}:{turn:p}))})}async function NI(n){await Me(W,async function(e){let r=(await e.get(Q())).data();!r||r.status!=="discuss"||n!=null&&r.phase!==n||e.update(Q(),Le(r,{status:"vote"}))})}async function OI(){let n=be();if(n)try{await An(Q(),{readyVote:Ao(n.id)}),await Me(W,async function(e){let r=(await e.get(Q())).data();if(!r||r.status!=="discuss")return;let i=Math.ceil((r.lineup||[]).length/2);(r.readyVote||[]).length>=i&&e.update(Q(),Le(r,{status:"vote"}))})}catch(e){K(ce(e))}}async function VI(n){let e=be();if(e)try{await An(Q(),{["votes."+e.id]:n}),await ym(!1)}catch(t){K(ce(t))}}async function ym(n,e){try{await Me(W,async function(t){let i=(await t.get(Q())).data();if(!i||i.status!=="vote"||e!=null&&i.phase!==e)return;let s=i.votes||{},a=i.lineup||[],c=a.filter(function(v){return s[v]});if(!n&&c.length<a.length)return;let l=Fo(a,i.seed,i.topic.words),f={};c.forEach(function(v){f[s[v]]=(f[s[v]]||0)+1});let p=0;Object.keys(f).forEach(function(v){f[v]>p&&(p=f[v])});let y=Object.keys(f).filter(function(v){return f[v]===p});c.length?y.length>1?t.update(Q(),Le(i,{status:"result",winner:"liar",accused:null,reason:"\uD45C\uAC00 \uB611\uAC19\uC774 \uAC08\uB824\uC11C \uB77C\uC774\uC5B4\uB97C \uC7A1\uC9C0 \uBABB\uD588\uC5B4\uC694."})):y[0]!==l.liar?t.update(Q(),Le(i,{status:"result",winner:"liar",accused:y[0],reason:"\uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD588\uC5B4\uC694."})):t.update(Q(),Le(i,{status:"guess",accused:y[0]})):t.update(Q(),Le(i,{status:"result",winner:"liar",accused:null,reason:"\uC544\uBB34\uB3C4 \uD22C\uD45C\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694."}))})}catch(t){K(ce(t))}}async function Ml(n,e,t){await Me(W,async function(r){let s=(await r.get(Q())).data();if(!s||s.status!=="guess"||t!=null&&s.phase!==t)return;let a=Fo(s.lineup,s.seed,s.topic.words),c=n&&Do(n)===Do(a.word);r.update(Q(),Le(s,{status:"result",guess:n||"",winner:c?"liar":"team",reason:c?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD614\uC5B4\uC694.":e?"\uB77C\uC774\uC5B4\uAC00 20\uCD08 \uC548\uC5D0 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uC9C0 \uBABB\uD588\uC5B4\uC694.":n?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uC9C0 \uBABB\uD588\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uAC00 \uB9DE\uD788\uAE30\uB97C \uD3EC\uAE30\uD588\uC5B4\uC694."}))})}var MI=1500,tm="";function Oo(n){return(n&&n.type==="mafia"?Po:Ro)[n&&n.status]}function _m(n){return!n||!Oo(n)||!n.phaseAt||!n.phaseAt.toMillis?null:n.phaseAt.toMillis()+Oo(n)*1e3}function vm(n){return Math.floor(n/60)+":"+String(n%60).padStart(2,"0")}function ft(n,e){let t=_m(n),r=(Oo(n)||1)*1e3,i=t==null?r:t-Date.now(),s=Math.max(0,Math.ceil(i/1e3)),a=h("i");return a.style.width=Math.max(0,Math.min(100,i/r*100))+"%",h("div",{class:"timer"+(s<=10?" low":""),role:"timer"},h("span",{class:"t-label",text:e}),h("b",{class:"t-num",text:vm(s)}),h("span",{class:"t-bar"},a))}async function LI(n){if(n.type==="mafia")return XI(n);if(n.status==="hint")return Vl("timeout",null,n.phase);if(n.status==="discuss")return NI(n.phase);if(n.status==="vote")return ym(!0,n.phase);if(n.status==="guess")return Ml("",!0,n.phase)}setInterval(function(){let n=C.room;if(!n||cm().indexOf("room-")!==0)return;let e=_m(n);if(e==null)return;let t=e-Date.now(),r=Oo(n)*1e3,i=Math.max(0,Math.ceil(t/1e3));document.querySelectorAll(".timer").forEach(function(a){a.querySelector(".t-num").textContent=vm(i),a.querySelector(".t-bar i").style.width=Math.max(0,Math.min(100,t/r*100))+"%",a.classList.toggle("low",i<=10)});let s=n.id+":"+n.phase;t<-MI&&tm!==s&&C.user&&(tm=s,LI(n).catch(function(){}))},500);async function Uo(){await Ei({status:"lobby",votes:{},accused:null,guess:null,winner:null,reason:null,turn:0,order:[],lineup:[],topic:null,readyVote:[],phaseAt:null,alive:[],night:{},checks:[],verdict:{},day:0})}function FI(n){hm(n);let e=h("button",{class:"back",type:"button",onclick:function(){_e("game-liar")},text:"\uB77C\uC774\uC5B4 \uBC29 \uBAA9\uB85D"});if(C.roomMissing)return h("section",{class:"screen"},e,h("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uAC70\uB098 \uC5C6\uC5B4\uC694."}));let t=C.room;if(!t)return h("section",{class:"screen"},e,h("div",{class:"empty",text:"\uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uB294 \uC911\u2026"}));if(t.status==="closed")return h("section",{class:"screen"},e,h("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC8FC\uC138\uC694."}));if(t.type==="mafia")return tE(t);let r=be(),i=t.players||[],s=r&&i.indexOf(r.id)>=0,a=t.status!=="lobby",c=a?t.lineup||[]:i,l=r&&c.indexOf(r.id)>=0,f=a?_I(t):null;if(a&&!f)return h("section",{class:"screen"},e,h("div",{class:"empty",text:"\uAC8C\uC784 \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694. \u2018\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354\u2019\uB85C \uB2E4\uC2DC \uC2DC\uC791\uD574 \uC8FC\uC138\uC694."}),h("button",{type:"button",class:"ghost wide",onclick:Uo,text:"\uB300\uAE30\uC2E4\uB85C \uB3CC\uB9AC\uAE30"}));let p=h("div",{class:"room-head"},h("div",null,h("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4 \xB7 "+J(t.createdBy)+"\uC758 \uBC29"}),h("h2",{text:dm[t.status]||""})),h("span",{class:"mode-chip",text:(t.mode===1?"\uBC14\uBCF4 \uBAA8\uB4DC":"\uC77C\uBC18 \uBAA8\uB4DC")+" \xB7 "+(t.rounds||1)+"\uBC14\uD034"})),y=h("div",{class:"chips"},c.map(function(V){let x=t.status==="vote"&&t.votes&&t.votes[V];return h("span",{class:"chip static"+(r&&V===r.id?" me":"")+(x?" done":"")},J(V)+(x?" \u2713":""))})),v;t.status==="lobby"?v=UI(t,r,s,i):t.status==="hint"?v=qI(t,r,l,f):t.status==="discuss"?v=jI(t,r,l):t.status==="vote"?v=zI(t,r,l):t.status==="guess"?v=GI(t,r,f):v=KI(t,f,r,l);let S=a&&l&&t.status!=="result"?BI(t,r,f):null,k=a||C.msgs.length;return h("section",{class:"screen room"},e,p,h("div",{class:"field"},h("div",{class:"field-label",text:(a?"\uCC38\uAC00\uC790 ":"\uBAA8\uC778 \uC0AC\uB78C ")+c.length+"\uBA85"}),y),S,v,k?WI(t,r):null)}function UI(n,e,t,r){function i(c,l,f,p){return h("button",{type:"button","aria-pressed":(n[c]||(c==="rounds"?1:0))===l?"true":"false",onclick:function(){let y={};y[c]=l,Ei(y)}},f,p?h("small",{text:p}):null)}let s=h("select",{id:"room-topic",class:"select"},h("option",{value:"-1",text:"\uB79C\uB364 (\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C \uD3EC\uD568)"}),xo.map(function(c,l){return h("option",{value:String(l),text:c.name})}));s.value=String(n.topicChoice==null?-1:n.topicChoice),s.addEventListener("change",function(){Ei({topicChoice:parseInt(s.value,10)})});let a=r.length>=3;return h("div",{class:"panel"},h("div",{class:"field-label",text:"\uAC8C\uC784 \uC124\uC815 \xB7 \uCC38\uAC00\uC790 \uB204\uAD6C\uB098 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694"}),h("div",{class:"seg"},i("mode",0,"\uC77C\uBC18","\uB77C\uC774\uC5B4\uB294 \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778 \uAC78 \uC54C\uC544\uC694"),i("mode",1,"\uBC14\uBCF4","\uB77C\uC774\uC5B4\uB3C4 \uBE44\uC2B7\uD55C \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC694")),h("div",{class:"seg"},i("rounds",1,"\uC124\uBA85 1\uBC14\uD034"),i("rounds",2,"\uC124\uBA85 2\uBC14\uD034")),h("label",{class:"sub-label",for:"room-topic",text:"\uC8FC\uC81C"}),s,e?t?h("div",{class:"op-row"},h("button",{type:"button",onclick:mm,text:"\uBC29 \uB098\uAC00\uAE30"}),h("button",{type:"button",class:"go",disabled:!a,onclick:DI,text:a?"\uAC8C\uC784 \uC2DC\uC791":"3\uBA85\uBD80\uD130 \uC2DC\uC791"})):h("button",{type:"button",class:"save",onclick:pm,text:"\uC774 \uBC29\uC5D0 \uCC38\uAC00\uD558\uAE30"}):h("p",{class:"note",text:"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uCC38\uAC00\uD560 \uC218 \uC788\uC5B4\uC694. \uC190\uB2D8\uC740 \uAD6C\uACBD\uACFC \uCC44\uD305\uB9CC \uD560 \uC218 \uC788\uC5B4\uC694."}),h("p",{class:"hint",text:"\uB2E8\uD1A1\uBC29\uC5D0 \u2018\uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0 \uBC29 \uC5F4\uC5C8\uC5B4\uC694\u2019\uB77C\uACE0 \uC54C\uB824\uC8FC\uC138\uC694."}))}function BI(n,e,t){let r=t.liar===e.id,i=r&&n.mode===0;return h("div",{class:"secret-card front compact"+(i?" liar":"")},h("span",{class:"sc-eyebrow",text:"\uB0B4 \uCE74\uB4DC \xB7 \uC8FC\uC81C "+n.topic.name}),h("span",{class:"sc-big",text:i?"\uB2F9\uC2E0\uC740 \uB77C\uC774\uC5B4":r?t.fool:t.word}),h("span",{class:"sc-hint",text:i?"\uC81C\uC2DC\uC5B4\uB97C \uBAB0\uB77C\uC694. \uB2E4\uB978 \uC0AC\uB78C \uC124\uBA85\uC744 \uB4E3\uACE0 \uB4E4\uD0A4\uC9C0 \uC54A\uAC8C \uB458\uB7EC\uB300\uC138\uC694.":"\uB2E8\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uC9C0 \uB9D0\uACE0 \uC124\uBA85\uD558\uC138\uC694."}))}function qI(n,e,t,r){let i=n.order.length,s=n.order[n.turn%i],a=Math.floor(n.turn/i)+1,c=e&&s===e.id,l=i*(n.rounds||1),f=h("div",{class:"panel turn"+(c?" mine":"")},h("div",{class:"field-label",text:a+"\uBC14\uD034 \xB7 "+(n.turn+1)+" / "+l+"\uBC88\uC9F8 \uC124\uBA85"}),h("div",{class:"turn-now"},h("span",{class:"eyebrow",text:"\uC9C0\uAE08 \uCC28\uB840"}),h("b",{text:c?"\uB0B4 \uCC28\uB840\uC608\uC694!":J(s)})),ft(n,c?"\uB0B4 \uC124\uBA85 \uB0A8\uC740 \uC2DC\uAC04":J(s)+" \uB0A8\uC740 \uC2DC\uAC04"),h("ol",{class:"order mini"},n.order.map(function(p,y){return h("li",{class:(y===n.turn%i?"now":"")+(e&&p===e.id?" me":"")},h("span",{text:J(p)}))})));if(c){let p=bi("input","hint-text",{type:"text",class:"text-in",maxlength:"60",placeholder:"\uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD558\uC138\uC694",autocomplete:"off"}),y=h("form",{class:"send-row",novalidate:!0},p,h("button",{type:"submit",class:"btn-sm go",text:"\uC124\uBA85 \uC62C\uB9AC\uAE30"}));y.addEventListener("submit",async function(v){v.preventDefault();let S=p.value.trim();if(S){if(r&&Do(S).indexOf(Do(r.word))>=0&&r.liar!==e.id){K("\uC81C\uC2DC\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uBA74 \uC548 \uB3FC\uC694.");return}try{await Vl("hint",S),C.drafts["hint-text"]="",re()}catch(k){K(k&&(k.code==="turn"||k.code==="phase")?"\uC2DC\uAC04\uC774 \uC9C0\uB098\uC11C \uCC28\uB840\uAC00 \uB118\uC5B4\uAC14\uC5B4\uC694.":ce(k))}}}),Ke(f,y)}else Ke(f,h("button",{type:"button",class:"link-btn",onclick:async function(){try{await Vl("skip")}catch(p){K(ce(p))}},text:J(s)+" \uCC28\uB840 \uB118\uAE30\uAE30 (\uC790\uB9AC \uBE44\uC6E0\uC744 \uB54C)"}));return f}function jI(n,e,t){let r=Math.ceil((n.lineup||[]).length/2),i=n.readyVote||[],s=e&&i.indexOf(e.id)>=0;return h("div",{class:"panel turn"},h("div",{class:"field-label",text:"\uD1A0\uB860 \uC2DC\uAC04"}),ft(n,"\uD1A0\uB860 \uB0A8\uC740 \uC2DC\uAC04"),h("p",{text:"\uC124\uBA85\uC774 \uB05D\uB0AC\uC5B4\uC694. \uC544\uB798 \uB300\uD654\uCC3D\uC5D0\uC11C \uB204\uAC00 \uB77C\uC774\uC5B4\uC778\uC9C0 \uC774\uC57C\uAE30\uD574 \uBCF4\uC138\uC694."}),t?h("button",{type:"button",class:s?"ghost wide":"save",disabled:s,onclick:OI},(s?"\uBC14\uB85C \uD22C\uD45C\uC5D0 \uCC2C\uC131\uD588\uC5B4\uC694 ":"\uBC14\uB85C \uD22C\uD45C\uD558\uAE30 ")+"("+i.length+"/"+r+")"):null,h("p",{class:"hint",text:"\uCC38\uAC00\uC790 \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 2\uBD84\uC774 \uC9C0\uB098\uAE30 \uC804\uC5D0 \uD22C\uD45C\uB85C \uB118\uC5B4\uAC00\uC694."}))}function zI(n,e,t){let r=n.votes||{},i=n.lineup||[],s=i.filter(function(c){return r[c]}).length,a=e?r[e.id]:null;return h("div",{class:"panel"},h("div",{class:"field-label",text:"\uD22C\uD45C \xB7 "+s+" / "+i.length+"\uBA85 \uC644\uB8CC"}),ft(n,"\uD22C\uD45C \uB0A8\uC740 \uC2DC\uAC04"),t?h("div",{class:"vote-grid"},i.filter(function(c){return c!==e.id}).map(function(c){return h("button",{type:"button",class:"vote-btn","aria-pressed":a===c?"true":"false",onclick:function(){VI(c)}},h("div",{class:"vp"},Zt(rt(c)||{})),h("span",{text:J(c)}))})):h("p",{class:"note",text:"\uCC38\uAC00\uC790\uB4E4\uC774 \uD22C\uD45C\uD558\uACE0 \uC788\uC5B4\uC694."}),t?h("p",{class:"hint",text:a?"\u2018"+J(a)+"\u2019\uC5D0\uAC8C \uD22C\uD45C\uD588\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uB77C\uACE0 \uC0DD\uAC01\uD558\uB294 \uC0AC\uB78C\uC744 \uB204\uB974\uC138\uC694. \uC2DC\uAC04\uC774 \uB05D\uB098\uBA74 \uADF8\uB54C\uAE4C\uC9C0 \uBC1B\uC740 \uD45C\uB85C \uC9D1\uACC4\uD574\uC694."}):null)}function GI(n,e,t){let r=n.accused;if(e&&e.id===r){let i=bi("input","guess-text",{type:"text",class:"text-in",maxlength:"30",placeholder:"\uC81C\uC2DC\uC5B4\uB294 \uBB34\uC5C7\uC77C\uAE4C\uC694?",autocomplete:"off"}),s=h("form",{class:"send-row",novalidate:!0},i,h("button",{type:"submit",class:"btn-sm go",text:"\uC815\uB2F5 \uC81C\uCD9C"}));return s.addEventListener("submit",async function(a){a.preventDefault();try{await Ml(i.value.trim()),C.drafts["guess-text"]=""}catch(c){K(ce(c))}}),h("div",{class:"panel turn mine"},h("div",{class:"field-label",text:"\uB77C\uC774\uC5B4\uC758 \uB9C8\uC9C0\uB9C9 \uAE30\uD68C"}),ft(n,"\uC815\uB2F5 \uB0A8\uC740 \uC2DC\uAC04"),h("p",{text:n.mode===1?"\uB4E4\uCF30\uC5B4\uC694! \uB2F9\uC2E0\uC774 \uB77C\uC774\uC5B4\uC600\uC5B4\uC694. \uC9C4\uC9DC \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694.":"\uB4E4\uCF30\uC5B4\uC694! \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694."}),h("p",{class:"note",text:"\uC8FC\uC81C: "+n.topic.name}),s,h("button",{type:"button",class:"link-btn",onclick:function(){Ml("")},text:"\uD3EC\uAE30\uD558\uAE30"}))}return h("div",{class:"panel turn"},h("div",{class:"field-label",text:"\uB77C\uC774\uC5B4 \uAC80\uAC70"}),ft(n,"\uB77C\uC774\uC5B4 \uB0A8\uC740 \uC2DC\uAC04"),h("p",null,h("b",{text:J(r)}),"\uB2D8\uC774 \uB77C\uC774\uC5B4\uB85C \uC9C0\uBAA9\uB410\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uB294 \uC911\uC774\uC5D0\uC694\u2026"))}function KI(n,e,t,r){let i=n.winner==="team",s=rt(e.liar)||{nick:J(e.liar)},a=n.votes||{};return h("div",{class:"answer"+(i?" team":"")},h("div",{class:"result-title",text:i?"\uC870\uC9C1\uC6D0 \uC2B9\uB9AC":"\uB77C\uC774\uC5B4 \uC2B9\uB9AC"}),h("p",{class:"note",text:n.reason||""}),h("div",{class:"ans-liar"},h("div",{class:"ans-photo"},Zt(s)),h("div",null,h("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4"}),h("b",{text:s.nick}))),h("p",null,"\uC81C\uC2DC\uC5B4: ",h("b",{text:e.word}),"  \xB7  \uC8FC\uC81C: "+n.topic.name),n.mode===1?h("p",null,"\uB77C\uC774\uC5B4\uAC00 \uBC1B\uC740 \uB2E8\uC5B4: ",h("b",{text:e.fool})):null,n.guess?h("p",null,"\uB77C\uC774\uC5B4\uC758 \uB2F5: ",h("b",{text:n.guess})):null,Object.keys(a).length?h("ul",{class:"vote-list"},(n.lineup||[]).filter(function(c){return a[c]}).map(function(c){return h("li",{text:J(c)+" \u2192 "+J(a[c])})})):null,h("div",{class:"op-row"},h("button",{type:"button",onclick:function(){_e("game-liar")},text:"\uBC29 \uBAA9\uB85D"}),h("button",{type:"button",class:"go",onclick:Uo,text:"\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354"})))}function WI(n,e){let t=n.game||0,r=C.msgs.filter(function(c){return(c.game||0)===t}),i=h("div",{class:"log",role:"log","aria-live":"polite"},r.length?r.map(function(c){if(c.kind==="skip")return h("div",{class:"msg-sys",text:c.text});let l=e&&c.memberId===e.id;return h("div",{class:"bubble "+(c.kind==="hint"?"hint":"chat")+(l?" mine":"")},h("div",{class:"b-meta"},h("b",{text:c.nick||"\uC190\uB2D8"}),c.kind==="hint"?h("span",{class:"b-tag",text:(c.round||1)+"\uBC14\uD034 \uC124\uBA85"}):null),h("div",{class:"b-text",text:c.text}))}):h("div",{class:"msg-sys",text:"\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694."})),s=bi("input","chat-text",{type:"text",class:"text-in",maxlength:"120",placeholder:n.status==="discuss"?"\uD1A0\uB860 \uBA54\uC2DC\uC9C0 \uBCF4\uB0B4\uAE30":"\uC7A1\uB2F4 \uBCF4\uB0B4\uAE30",autocomplete:"off"}),a=h("form",{class:"send-row",novalidate:!0},s,h("button",{type:"submit",class:"btn-sm",text:"\uBCF4\uB0B4\uAE30"}));return a.addEventListener("submit",async function(c){c.preventDefault();let l=s.value.trim();if(!(!l||!C.user))try{await gm("chat",l),C.drafts["chat-text"]="",re()}catch(f){K(ce(f))}}),h("div",{class:"field"},h("div",{class:"field-label",text:"\uB300\uD654"}),i,a)}var Po={night:30,day:120,vote:20,defense:20,verdict:15};No&&Object.keys(Po).forEach(function(n){Po[n]=Math.max(2,Math.round(Po[n]/No))});var HI={lobby:"\uB300\uAE30 \uC911",night:"\uBC24",day:"\uB0AE \uD1A0\uB860",vote:"\uCC98\uD615 \uD22C\uD45C",defense:"\uCD5C\uD6C4\uC758 \uBCC0\uB860",verdict:"\uCC2C\uBC18 \uD22C\uD45C",result:"\uAC8C\uC784 \uB05D"},Bl={mafia:{name:"\uB9C8\uD53C\uC544",desc:"\uBC24\uB9C8\uB2E4 \uB3D9\uB8CC\uC640 \uD568\uAED8 \uD55C \uBA85\uC744 \uC81C\uAC70\uD574\uC694. \uC0B4\uC544\uB0A8\uC740 \uC2DC\uBBFC \uC218\uB9CC\uD07C \uB0A8\uC73C\uBA74 \uC2B9\uB9AC\uC608\uC694."},doctor:{name:"\uC758\uC0AC",desc:"\uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC744 \uACE8\uB77C \uB9C8\uD53C\uC544\uC758 \uACF5\uACA9\uC5D0\uC11C \uC0B4\uB824\uC694. \uC790\uAE30 \uC790\uC2E0\uB3C4 \uACE0\uB97C \uC218 \uC788\uC5B4\uC694."},police:{name:"\uACBD\uCC30",desc:"\uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC744 \uC870\uC0AC\uD574\uC11C \uB9C8\uD53C\uC544\uC778\uC9C0 \uC54C\uC544\uB0B4\uC694. \uACB0\uACFC\uB294 \uB098\uB9CC \uBD10\uC694."},citizen:{name:"\uC2DC\uBBFC",desc:"\uB0AE \uD1A0\uB860\uACFC \uD22C\uD45C\uB85C \uB9C8\uD53C\uC544\uB97C \uBAA8\uB450 \uCC3E\uC544\uB0B4\uBA74 \uC2B9\uB9AC\uC608\uC694."}};function ql(n){return n>=9?3:n>=6?2:1}function Ai(n,e){let t=lm((e^1540483477)>>>0),r=n.slice();for(let a=r.length-1;a>0;a--){let c=Math.floor(t()*(a+1)),l=r[a];r[a]=r[c],r[c]=l}let i=ql(r.length),s={};return r.forEach(function(a,c){s[a]=c<i?"mafia":c===i?"doctor":c===i+1?"police":"citizen"}),s}function QI(n,e){let t=e.filter(function(r){return n[r]==="mafia"}).length;return t?t>=e.length-t?"mafia":null:"citizen"}function Xt(n,e,t){n.set(Te(Ge(W,"rooms",C.roomId,"msgs")),{uid:Ti(),memberId:null,nick:"\uBCF8\uBD80",text:t,kind:"sys",game:e.game||0,createdAt:nt()})}function Vo(n,e,t,r,i,s){let a=QI(t,r);a?(Xt(n,e,a==="citizen"?"\u{1F389} \uB9C8\uD53C\uC544\uAC00 \uBAA8\uB450 \uC7A1\uD614\uC5B4\uC694. \uC2DC\uBBFC \uC2B9\uB9AC!":"\u{1FA78} \uB9C8\uD53C\uC544\uAC00 \uC2DC\uBBFC \uC218\uB9CC\uD07C \uB0A8\uC558\uC5B4\uC694. \uB9C8\uD53C\uC544 \uC2B9\uB9AC!"),n.update(Q(),Le(e,{status:"result",alive:r,winner:a}))):(s&&Xt(n,e,s),n.update(Q(),Le(e,Object.assign({alive:r},i))))}function Ll(n){return{status:"night",day:(n.day||1)+1,night:{},votes:{},verdict:{},accused:null,readyVote:[]}}async function YI(){try{await Me(W,async function(n){let t=(await n.get(Q())).data();if(!t||t.status!=="lobby")throw{code:"phase"};let r=(t.players||[]).filter(function(s){return!!rt(s)}).slice().sort();if(r.length<4)throw{code:"few"};let i=(t.game||0)+1;Xt(n,{game:i},"\u{1F319} \uCCAB \uBC88\uC9F8 \uBC24\uC774 \uB418\uC5C8\uC5B4\uC694. \uB9C8\uD53C\uC544\uB294 \uC870\uC6A9\uD788 \uC6C0\uC9C1\uC774\uC138\uC694."),n.update(Q(),Le(t,{status:"night",lineup:r,seed:Math.floor(Math.random()*2147483647),alive:r,day:1,night:{},checks:[],votes:{},verdict:{},accused:null,winner:null,readyVote:[],game:i,startedAt:nt()}))})}catch(n){n&&n.code==="few"?K("4\uBA85 \uC774\uC0C1 \uBAA8\uC5EC\uC57C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."):n&&n.code==="phase"?K("\uC774\uBBF8 \uAC8C\uC784\uC774 \uC2DC\uC791\uB410\uC5B4\uC694."):K(ce(n))}}async function kl(n,e){let t=be();if(t)try{await Me(W,async function(r){let s=(await r.get(Q())).data();if(!s||s.status!=="night")throw{code:"phase"};let a=Ai(s.lineup,s.seed),c=s.alive||[];if(a[t.id]!==n||c.indexOf(t.id)<0||c.indexOf(e)<0)throw{code:"role"};let l=Object.assign({},s.night||{}),f={};if(n==="police"){if(l.police)throw{code:"done"};f.checks=(s.checks||[]).concat([{day:s.day||1,target:e}])}l[n]=e,f.night=l,r.update(Q(),f)}),await wm(!1)}catch(r){K(r&&r.code==="done"?"\uC624\uB298 \uBC24 \uC870\uC0AC\uB294 \uC774\uBBF8 \uD588\uC5B4\uC694.":r&&r.code==="phase"?"\uBC24\uC774 \uB05D\uB0AC\uC5B4\uC694.":ce(r))}}async function wm(n,e){await Me(W,async function(t){let i=(await t.get(Q())).data();if(!i||i.status!=="night"||e!=null&&i.phase!==e)return;let s=Ai(i.lineup,i.seed),a=i.alive||[],c=i.night||{},l=function(y){return a.some(function(v){return s[v]===y})};if(!n&&(l("mafia")&&!c.mafia||l("doctor")&&!c.doctor||l("police")&&!c.police))return;let f=a.slice(),p;c.mafia&&c.mafia!==c.doctor?(f=f.filter(function(y){return y!==c.mafia}),p="\u2600\uFE0F "+(i.day||1)+"\uC77C\uCC28 \uC544\uCE68. \uC9C0\uB09C \uBC24 "+J(c.mafia)+"\uB2D8\uC774 \uB9C8\uD53C\uC544\uC5D0\uAC8C \uB2F9\uD588\uC5B4\uC694."):c.mafia?p="\u2600\uFE0F "+(i.day||1)+"\uC77C\uCC28 \uC544\uCE68. \uB9C8\uD53C\uC544\uAC00 \uB204\uAD70\uAC00\uB97C \uB178\uB838\uC9C0\uB9CC \uC758\uC0AC\uAC00 \uC0B4\uB824\uB0C8\uC5B4\uC694!":p="\u2600\uFE0F "+(i.day||1)+"\uC77C\uCC28 \uC544\uCE68. \uC870\uC6A9\uD55C \uBC24\uC774\uC5C8\uC5B4\uC694.",Xt(t,i,p),Vo(t,i,s,f,{status:"day",readyVote:[]})})}async function JI(n){await Me(W,async function(e){let r=(await e.get(Q())).data();!r||r.status!=="day"||n!=null&&r.phase!==n||e.update(Q(),Le(r,{status:"vote",votes:{}}))})}async function $I(){let n=be();if(n)try{await An(Q(),{readyVote:Ao(n.id)}),await Me(W,async function(e){let r=(await e.get(Q())).data();if(!r||r.status!=="day")return;let i=r.alive||[];(r.readyVote||[]).filter(function(a){return i.indexOf(a)>=0}).length>=Math.ceil(i.length/2)&&e.update(Q(),Le(r,{status:"vote",votes:{}}))})}catch(e){K(ce(e))}}async function nm(n){let e=be();if(e)try{await An(Q(),{["votes."+e.id]:n}),await Im(!1)}catch(t){K(ce(t))}}async function Im(n,e){await Me(W,async function(t){let i=(await t.get(Q())).data();if(!i||i.status!=="vote"||e!=null&&i.phase!==e)return;let s=i.alive||[],a=i.votes||{},c=s.filter(function(v){return a[v]});if(!n&&c.length<s.length)return;let l={};c.forEach(function(v){let S=a[v];S!=="skip"&&s.indexOf(S)>=0&&(l[S]=(l[S]||0)+1)});let f=0;Object.keys(l).forEach(function(v){l[v]>f&&(f=l[v])});let p=Object.keys(l).filter(function(v){return l[v]===f}),y=Ai(i.lineup,i.seed);p.length!==1?(Xt(t,i,p.length?"\uD45C\uAC00 \uB611\uAC19\uC774 \uAC08\uB824\uC11C \uC544\uBB34\uB3C4 \uCC98\uD615\uB418\uC9C0 \uC54A\uC558\uC5B4\uC694.":"\uC544\uBB34\uB3C4 \uC9C0\uBAA9\uB418\uC9C0 \uC54A\uC558\uC5B4\uC694."),Vo(t,i,y,s,Ll(i),"\u{1F319} "+((i.day||1)+1)+"\uBC88\uC9F8 \uBC24\uC774 \uB418\uC5C8\uC5B4\uC694.")):(Xt(t,i,J(p[0])+"\uB2D8\uC774 "+f+"\uD45C\uB85C \uCD5C\uB2E4 \uB4DD\uD45C! \uCD5C\uD6C4\uC758 \uBCC0\uB860\uC744 \uB4E4\uC5B4\uBCF4\uC138\uC694."),t.update(Q(),Le(i,{status:"defense",accused:p[0]})))})}async function Em(n){await Me(W,async function(e){let r=(await e.get(Q())).data();!r||r.status!=="defense"||n!=null&&r.phase!==n||e.update(Q(),Le(r,{status:"verdict",verdict:{}}))})}async function rm(n){let e=be();if(e)try{await An(Q(),{["verdict."+e.id]:n?"yes":"no"}),await Tm(!1)}catch(t){K(ce(t))}}async function Tm(n,e){await Me(W,async function(t){let i=(await t.get(Q())).data();if(!i||i.status!=="verdict"||e!=null&&i.phase!==e)return;let s=i.alive||[],a=i.verdict||{},c=s.filter(function(S){return S!==i.accused}),l=c.filter(function(S){return a[S]});if(!n&&l.length<c.length)return;let f=l.filter(function(S){return a[S]==="yes"}).length,p=l.length-f,y=Ai(i.lineup,i.seed),v="\u{1F319} "+((i.day||1)+1)+"\uBC88\uC9F8 \uBC24\uC774 \uB418\uC5C8\uC5B4\uC694.";f>p?(Xt(t,i,"\u2696\uFE0F "+J(i.accused)+"\uB2D8\uC774 \uCC98\uD615\uB410\uC5B4\uC694. (\uCC2C\uC131 "+f+" \xB7 \uBC18\uB300 "+p+")"),Vo(t,i,y,s.filter(function(S){return S!==i.accused}),Ll(i),v)):(Xt(t,i,"\u2696\uFE0F "+J(i.accused)+"\uB2D8\uC774 \uC0B4\uC544\uB0A8\uC558\uC5B4\uC694. (\uCC2C\uC131 "+f+" \xB7 \uBC18\uB300 "+p+")"),Vo(t,i,y,s,Ll(i),v))})}function XI(n){if(n.status==="night")return wm(!0,n.phase);if(n.status==="day")return JI(n.phase);if(n.status==="vote")return Im(!0,n.phase);if(n.status==="defense")return Em(n.phase);if(n.status==="verdict")return Tm(!0,n.phase)}function ZI(){let n=be(),e=C.rooms.filter(function(r){return r.status&&r.status!=="closed"&&r.type==="mafia"}),t=e.length?h("ul",{class:"room-list"},e.map(function(r){let i=n&&(r.players||[]).indexOf(n.id)>=0,s=r.status==="lobby"?"\uB300\uAE30 \uC911":r.status==="result"?"\uAC8C\uC784 \uB05D":"\uAC8C\uC784 \uC911";return h("li",null,h("button",{type:"button",class:"room-item",onclick:function(){_e("room-"+r.id)}},h("span",{class:"ri-main"},h("b",{text:J(r.createdBy)+"\uC758 \uBC29"}),h("span",{class:"ri-sub",text:(r.players||[]).map(J).join(", ")||"\uC544\uC9C1 \uC544\uBB34\uB3C4 \uC5C6\uC5B4\uC694"})),h("span",{class:"ri-side"},h("span",{class:"status-chip"+(r.status==="lobby"?" open":""),text:s}),h("span",{class:"ri-sub",text:(r.players||[]).length+"\uBA85"+(i?" \xB7 \uCC38\uAC00 \uC911":"")}))))})):h("div",{class:"empty",text:C.roomsReady?"\uC5F4\uB9B0 \uBC29\uC774 \uC5C6\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC870\uC9C1\uC6D0\uC744 \uBD88\uB7EC \uBAA8\uC73C\uC138\uC694.":"\uBC29 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return h("section",{class:"screen"},h("button",{class:"back",type:"button",onclick:function(){_e("games")},text:"\uAC8C\uC784\uBC29\uC73C\uB85C"}),h("div",{class:"sec-head"},h("div",null,h("span",{class:"eyebrow",text:"G-02"}),h("h2",{text:"\uB9C8\uD53C\uC544"}),h("p",{text:"\uC870\uC9C1 \uC548\uC5D0 \uC228\uC740 \uB9C8\uD53C\uC544\uB97C \uCC3E\uC544\uB77C. 4\uBA85\uBD80\uD130 \uD560 \uC218 \uC788\uC5B4\uC694."}))),h("button",{type:"button",class:"save",disabled:!n||!C.user,onclick:function(){fm("mafia")}},n?"\uC0C8 \uBC29 \uB9CC\uB4E4\uAE30":"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uBC29\uC744 \uB9CC\uB4E4 \uC218 \uC788\uC5B4\uC694"),h("div",{class:"field"},h("div",{class:"field-label",text:"\uC5F4\uB9B0 \uBC29"}),t),eE())}function eE(){return h("details",{class:"guide"},h("summary",{text:"\uB9C8\uD53C\uC544 \uAC8C\uC784 \uADDC\uCE59"}),h("div",{class:"guide-body"},h("p",{class:"note",text:"\uC9C1\uC5C5: \uB9C8\uD53C\uC544, \uC758\uC0AC, \uACBD\uCC30, \uC2DC\uBBFC. \uB9C8\uD53C\uC544\uB294 4~5\uBA85\uC774\uBA74 1\uBA85, 6~8\uBA85\uC774\uBA74 2\uBA85, 9\uBA85 \uC774\uC0C1\uC774\uBA74 3\uBA85\uC774\uC5D0\uC694."}),h("ol",null,h("li",{text:"\uBC24 (30\uCD08): \uB9C8\uD53C\uC544\uB294 \uC81C\uAC70\uD560 \uC0AC\uB78C\uC744, \uC758\uC0AC\uB294 \uC0B4\uB9B4 \uC0AC\uB78C\uC744, \uACBD\uCC30\uC740 \uC870\uC0AC\uD560 \uC0AC\uB78C\uC744 \uACE8\uB77C\uC694. \uBC24\uC5D0\uB294 \uB9C8\uD53C\uC544\uB07C\uB9AC\uB9CC \uB300\uD654\uD560 \uC218 \uC788\uC5B4\uC694."}),h("li",{text:"\uC544\uCE68: \uC9C0\uB09C \uBC24 \uACB0\uACFC\uAC00 \uBC1C\uD45C\uB3FC\uC694. \uC758\uC0AC\uAC00 \uB9C8\uD53C\uC544\uAC00 \uB178\uB9B0 \uC0AC\uB78C\uC744 \uACE0\uB974\uBA74 \uC0B4\uC544\uB098\uC694."}),h("li",{text:"\uB0AE \uD1A0\uB860 (2\uBD84): \uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C \uBAA8\uB450 \uB300\uD654\uD574\uC694. \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uC77C\uCC0D \uB05D\uB098\uC694."}),h("li",{text:"\uCC98\uD615 \uD22C\uD45C (20\uCD08): \uB9C8\uD53C\uC544\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC5D0\uAC8C \uD22C\uD45C\uD574\uC694. \uAE30\uAD8C\uB3C4 \uD560 \uC218 \uC788\uC5B4\uC694."}),h("li",{text:"\uCD5C\uD6C4\uC758 \uBCC0\uB860 (20\uCD08): \uCD5C\uB2E4 \uB4DD\uD45C\uC790\uAC00 \uBCC0\uB860\uD574\uC694. \uB3D9\uC810\uC774\uBA74 \uC544\uBB34\uB3C4 \uCC98\uD615\uB418\uC9C0 \uC54A\uACE0 \uBC24\uC774 \uB3FC\uC694."}),h("li",{text:"\uCC2C\uBC18 \uD22C\uD45C (15\uCD08): \uCC2C\uC131\uC774 \uB354 \uB9CE\uC73C\uBA74 \uCC98\uD615\uB3FC\uC694. \uCC98\uD615\uB41C \uC0AC\uB78C\uC758 \uC9C1\uC5C5\uC740 \uAC8C\uC784\uC774 \uB05D\uB0A0 \uB54C \uACF5\uAC1C\uB3FC\uC694."})),h("p",{class:"note",text:"\uB9C8\uD53C\uC544\uB97C \uBAA8\uB450 \uC7A1\uC73C\uBA74 \uC2DC\uBBFC \uC2B9\uB9AC, \uB9C8\uD53C\uC544\uAC00 \uB098\uBA38\uC9C0 \uC0AC\uB78C \uC218\uB9CC\uD07C \uB0A8\uC73C\uBA74 \uB9C8\uD53C\uC544 \uC2B9\uB9AC\uC608\uC694. \uC8FD\uC740 \uC0AC\uB78C\uC740 \uAD00\uC804\uD558\uBA74\uC11C \uC8FD\uC740 \uC0AC\uB78C\uB07C\uB9AC\uB9CC \uBCF4\uC774\uB294 \uC800\uC2B9 \uCC44\uD305\uC744 \uD560 \uC218 \uC788\uC5B4\uC694."})))}function tE(n){let e=h("button",{class:"back",type:"button",onclick:function(){_e("game-mafia")},text:"\uB9C8\uD53C\uC544 \uBC29 \uBAA9\uB85D"}),t=be(),r=n.players||[],i=t&&r.indexOf(t.id)>=0,s=n.status!=="lobby",a=s?n.lineup||[]:r,c=s&&n.lineup&&n.lineup.length?Ai(n.lineup,n.seed):null;if(s&&!c)return h("section",{class:"screen"},e,h("div",{class:"empty",text:"\uAC8C\uC784 \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694."}),h("button",{type:"button",class:"ghost wide",onclick:Uo,text:"\uB300\uAE30\uC2E4\uB85C \uB3CC\uB9AC\uAE30"}));let l=n.alive||[],f=!!(t&&a.indexOf(t.id)>=0),p=f&&c?c[t.id]:null,y=f&&l.indexOf(t.id)>=0,v=n.status==="result",S=v||f&&s&&!y,k={me:t,roles:c,isPlayer:f,iAlive:y,myRole:p,over:v,seeAll:S},V=n.status==="night"?(n.day||1)+"\uBC88\uC9F8 \uBC24":n.status==="day"?(n.day||1)+"\uC77C\uCC28 \uB0AE":HI[n.status]||"",x=h("div",{class:"room-head"},h("div",null,h("span",{class:"eyebrow",text:"\uB9C8\uD53C\uC544 \xB7 "+J(n.createdBy)+"\uC758 \uBC29"}),h("h2",{text:V})),h("span",{class:"mode-chip",text:"\uB9C8\uD53C\uC544 "+ql(a.length||4)+"\uBA85"})),G=h("div",{class:"chips"},a.map(function(B){let te=s&&l.indexOf(B)<0,ve="";c&&(S||p==="mafia"&&c[B]==="mafia")&&(ve=" \xB7 "+Bl[c[B]].name);let $="";return n.status==="vote"&&n.votes&&n.votes[B]&&($=" \u2713"),n.status==="verdict"&&n.verdict&&n.verdict[B]&&($=" \u2713"),h("span",{class:"chip static"+(t&&B===t.id?" me":"")+(te?" dead":"")+($?" done":"")},(te?"\u2620 ":"")+J(B)+ve+$)})),q;return n.status==="lobby"?q=rE(n,t,i,r):n.status==="night"?q=iE(n,k):n.status==="day"?q=sE(n,k):n.status==="vote"?q=oE(n,k):n.status==="defense"?q=aE(n,k):n.status==="verdict"?q=cE(n,k):q=uE(n,k),h("section",{class:"screen room"+(n.status==="night"?" is-night":"")},e,x,h("div",{class:"field"},h("div",{class:"field-label",text:s?"\uCC38\uAC00\uC790 "+l.length+"/"+a.length+"\uBA85 \uC0DD\uC874":"\uBAA8\uC778 \uC0AC\uB78C "+a.length+"\uBA85"}),G),s&&f&&!v?nE(n,k):null,q,lE(n,k))}function nE(n,e){let t=e.myRole,r=Bl[t],i=t==="mafia"?n.lineup.filter(function(a){return a!==e.me.id&&e.roles[a]==="mafia"}).map(J):[],s=t==="police"?(n.checks||[]).map(function(a){return a.day+"\uC77C\uCC28 \uBC24 \xB7 "+J(a.target)+(e.roles[a.target]==="mafia"?" \u2192 \uB9C8\uD53C\uC544!":" \u2192 \uB9C8\uD53C\uC544 \uC544\uB2D8")}):[];return h("div",{class:"role-card "+t+(e.iAlive?"":" dead")},h("span",{class:"sc-eyebrow",text:e.iAlive?"\uB0B4 \uC9C1\uC5C5 \xB7 \uB098\uB9CC \uBCF4\uC5EC\uC694":"\u2620 \uC0AC\uB9DD \xB7 \uAD00\uC804 \uC911"}),h("span",{class:"sc-big",text:r.name}),h("span",{class:"sc-hint",text:r.desc}),i.length?h("p",{class:"rc-extra",text:"\uB3D9\uB8CC \uB9C8\uD53C\uC544: "+i.join(", ")}):null,s.length?h("ul",{class:"rc-checks"},s.map(function(a){return h("li",{text:a})})):null)}function Co(n,e,t){return h("div",{class:"vote-grid"},n.map(function(r){return h("button",{type:"button",class:"vote-btn","aria-pressed":e===r?"true":"false",onclick:function(){t(r)}},h("div",{class:"vp"},Zt(rt(r)||{})),h("span",{text:J(r)}))}))}function rE(n,e,t,r){let i=r.length,s=i>=4,a=ql(Math.max(i,4));return h("div",{class:"panel"},h("div",{class:"field-label",text:"\uC9C1\uC5C5 \uAD6C\uC131"}),h("p",{text:s?"\uB9C8\uD53C\uC544 "+a+" \xB7 \uC758\uC0AC 1 \xB7 \uACBD\uCC30 1 \xB7 \uC2DC\uBBFC "+(i-a-2):"4\uBA85\uBD80\uD130 \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694. \uC9C0\uAE08 "+i+"\uBA85\uC774\uC5D0\uC694."}),e?t?h("div",{class:"op-row"},h("button",{type:"button",onclick:mm,text:"\uBC29 \uB098\uAC00\uAE30"}),h("button",{type:"button",class:"go",disabled:!s,onclick:YI,text:s?"\uAC8C\uC784 \uC2DC\uC791":"4\uBA85\uBD80\uD130 \uC2DC\uC791"})):h("button",{type:"button",class:"save",onclick:pm,text:"\uC774 \uBC29\uC5D0 \uCC38\uAC00\uD558\uAE30"}):h("p",{class:"note",text:"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uCC38\uAC00\uD560 \uC218 \uC788\uC5B4\uC694."}),h("p",{class:"hint",text:"\uB2E8\uD1A1\uBC29\uC5D0 \u2018\uAC8C\uC784\uBC29 \u2192 \uB9C8\uD53C\uC544\uC5D0 \uBC29 \uC5F4\uC5C8\uC5B4\u2019\uB77C\uACE0 \uC54C\uB824\uC8FC\uC138\uC694."}))}function iE(n,e){let t=n.night||{},r=n.alive||[],i=e.myRole,s=h("div",{class:"panel turn night"},h("div",{class:"field-label",text:(n.day||1)+"\uBC88\uC9F8 \uBC24"}),ft(n,"\uBC24 \uB0A8\uC740 \uC2DC\uAC04"));if(!e.isPlayer)return Ke(s,h("p",{text:"\uBC24\uC774\uC5D0\uC694. \uAD6C\uACBD\uD558\uBA70 \uC544\uCE68\uC744 \uAE30\uB2E4\uB824 \uC8FC\uC138\uC694."})),s;if(!e.iAlive)return Ke(s,h("p",{text:"\uAD00\uC804 \uC911\uC774\uC5D0\uC694. \uC544\uB798 \uC800\uC2B9 \uCC44\uD305\uC73C\uB85C \uC8FD\uC740 \uC0AC\uB78C\uB07C\uB9AC \uC774\uC57C\uAE30\uD560 \uC218 \uC788\uC5B4\uC694."})),s;if(i==="citizen")return Ke(s,h("p",{text:"\uBC24\uC774\uC5D0\uC694. \uC2DC\uBBFC\uC740 \uC544\uCE68\uC774 \uC62C \uB54C\uAE4C\uC9C0 \uC870\uC6A9\uD788 \uAE30\uB2E4\uB824\uC694."})),s;if(i==="mafia")Ke(s,h("p",{text:"\uC81C\uAC70\uD560 \uC0AC\uB78C\uC744 \uACE0\uB974\uC138\uC694. \uB3D9\uB8CC \uB9C8\uD53C\uC544\uC640 \uB300\uD654\uCC3D\uC5D0\uC11C \uC758\uB17C\uD574\uC694."}),Co(r.filter(function(a){return e.roles[a]!=="mafia"}),t.mafia,function(a){kl("mafia",a)}),t.mafia?h("p",{class:"hint",text:"\uC9C0\uAE08 \uC9C0\uBAA9: "+J(t.mafia)+" \xB7 \uB3D9\uB8CC\uAC00 \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uB00C\uC5B4\uC694."}):null);else if(i==="doctor")Ke(s,h("p",{text:"\uC624\uB298 \uBC24 \uC0B4\uB9B4 \uC0AC\uB78C\uC744 \uACE0\uB974\uC138\uC694."}),Co(r,t.doctor,function(a){kl("doctor",a)}),t.doctor?h("p",{class:"hint",text:J(t.doctor)+"\uB2D8\uC744 \uC9C0\uD0A4\uAE30\uB85C \uD588\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uB00C\uC5B4\uC694."}):null);else if(i==="police")if(t.police){let a=e.roles[t.police]==="mafia";Ke(s,h("div",{class:"check-result"+(a?" bad":"")},J(t.police)+"\uB2D8\uC740 ",h("b",{text:a?"\uB9C8\uD53C\uC544\uC608\uC694!":"\uB9C8\uD53C\uC544\uAC00 \uC544\uB2C8\uC5D0\uC694."})))}else Ke(s,h("p",{text:"\uC870\uC0AC\uD560 \uC0AC\uB78C\uC744 \uACE0\uB974\uC138\uC694. \uD55C \uBC88 \uACE0\uB974\uBA74 \uBC14\uAFC0 \uC218 \uC5C6\uC5B4\uC694."}),Co(r.filter(function(a){return a!==e.me.id}),null,function(a){kl("police",a)}));return s}function sE(n,e){let t=n.alive||[],r=Math.ceil(t.length/2),i=(n.readyVote||[]).filter(function(a){return t.indexOf(a)>=0}),s=e.me&&i.indexOf(e.me.id)>=0;return h("div",{class:"panel turn"},h("div",{class:"field-label",text:(n.day||1)+"\uC77C\uCC28 \uB0AE \uD1A0\uB860"}),ft(n,"\uD1A0\uB860 \uB0A8\uC740 \uC2DC\uAC04"),h("p",{text:"\uB204\uAC00 \uB9C8\uD53C\uC544\uC778\uC9C0 \uB300\uD654\uCC3D\uC5D0\uC11C \uC774\uC57C\uAE30\uD574\uC694."}),e.iAlive?h("button",{type:"button",class:s?"ghost wide":"save",disabled:s,onclick:$I},(s?"\uBC14\uB85C \uD22C\uD45C\uC5D0 \uCC2C\uC131\uD588\uC5B4\uC694 ":"\uBC14\uB85C \uD22C\uD45C\uD558\uAE30 ")+"("+i.length+"/"+r+")"):null,h("p",{class:"hint",text:"\uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uD1A0\uB860\uC774 \uC77C\uCC0D \uB05D\uB098\uC694."}))}function oE(n,e){let t=n.alive||[],r=n.votes||{},i=t.filter(function(c){return r[c]}).length,s=e.me?r[e.me.id]:null,a=h("div",{class:"panel"},h("div",{class:"field-label",text:"\uCC98\uD615 \uD22C\uD45C \xB7 "+i+" / "+t.length+"\uBA85 \uC644\uB8CC"}),ft(n,"\uD22C\uD45C \uB0A8\uC740 \uC2DC\uAC04"));return e.iAlive?Ke(a,Co(t.filter(function(c){return c!==e.me.id}),s,nm),h("button",{type:"button",class:"ghost wide","aria-pressed":s==="skip"?"true":"false",onclick:function(){nm("skip")}},s==="skip"?"\uAE30\uAD8C\uD588\uC5B4\uC694":"\uAE30\uAD8C\uD558\uAE30"),h("p",{class:"hint",text:s?(s==="skip"?"\uAE30\uAD8C\uD588\uC5B4\uC694.":"\u2018"+J(s)+"\u2019\uC5D0\uAC8C \uD22C\uD45C\uD588\uC5B4\uC694.")+" \uB2E4\uB978 \uAC78 \uB204\uB974\uBA74 \uBC14\uB00C\uC5B4\uC694.":"\uB9C8\uD53C\uC544\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC744 \uB204\uB974\uC138\uC694."})):Ke(a,h("p",{class:"note",text:"\uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C\uB4E4\uC774 \uD22C\uD45C\uD558\uACE0 \uC788\uC5B4\uC694."})),a}function aE(n,e){let t=e.me&&e.me.id===n.accused;return h("div",{class:"panel turn"+(t?" mine":"")},h("div",{class:"field-label",text:"\uCD5C\uD6C4\uC758 \uBCC0\uB860"}),ft(n,J(n.accused)+" \uBCC0\uB860 \uB0A8\uC740 \uC2DC\uAC04"),h("p",{text:t?"\uB2F9\uC2E0\uC774 \uCD5C\uB2E4 \uB4DD\uD45C\uC790\uC608\uC694! \uC544\uB798 \uB300\uD654\uCC3D\uC5D0 \uBCC0\uB860\uC744 \uB0A8\uAE30\uC138\uC694.":J(n.accused)+"\uB2D8\uC758 \uCD5C\uD6C4\uC758 \uBCC0\uB860\uC744 \uB4E4\uC5B4\uBCF4\uC138\uC694."}),t?h("button",{type:"button",class:"ghost wide",onclick:function(){Em(null)},text:"\uBCC0\uB860 \uB9C8\uCE58\uAE30"}):null)}function cE(n,e){let t=n.alive||[],r=n.verdict||{},i=t.filter(function(l){return l!==n.accused}),s=i.filter(function(l){return r[l]}).length,a=e.iAlive&&e.me.id!==n.accused,c=e.me?r[e.me.id]:null;return h("div",{class:"panel"},h("div",{class:"field-label",text:"\uCC2C\uBC18 \uD22C\uD45C \xB7 "+s+" / "+i.length+"\uBA85 \uC644\uB8CC"}),ft(n,"\uCC2C\uBC18 \uB0A8\uC740 \uC2DC\uAC04"),h("p",null,h("b",{text:J(n.accused)}),"\uB2D8\uC744 \uCC98\uD615\uD560\uAE4C\uC694?"),a?h("div",{class:"op-row"},h("button",{type:"button",class:c==="yes"?"go":"","aria-pressed":c==="yes"?"true":"false",onclick:function(){rm(!0)},text:"\uCC2C\uC131 (\uCC98\uD615)"}),h("button",{type:"button",class:c==="no"?"go":"","aria-pressed":c==="no"?"true":"false",onclick:function(){rm(!1)},text:"\uBC18\uB300 (\uC0B4\uB9AC\uAE30)"})):h("p",{class:"note",text:e.me&&e.me.id===n.accused?"\uB2E4\uB978 \uC0AC\uB78C\uB4E4\uC774 \uCC2C\uBC18 \uD22C\uD45C\uB97C \uD558\uACE0 \uC788\uC5B4\uC694.":"\uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C\uB4E4\uC774 \uCC2C\uBC18 \uD22C\uD45C\uB97C \uD558\uACE0 \uC788\uC5B4\uC694."}),a?h("p",{class:"hint",text:"\uCC2C\uC131\uC774 \uBC18\uB300\uBCF4\uB2E4 \uB9CE\uC73C\uBA74 \uCC98\uD615\uB3FC\uC694. \uC2DC\uAC04\uC774 \uB05D\uB098\uBA74 \uADF8\uB54C\uAE4C\uC9C0\uC758 \uD45C\uB85C \uC815\uD574\uC694."}):null)}function uE(n,e){let t=n.winner==="citizen",r=n.alive||[];return h("div",{class:"answer"+(t?" team":"")},h("div",{class:"result-title",text:t?"\uC2DC\uBBFC \uC2B9\uB9AC":"\uB9C8\uD53C\uC544 \uC2B9\uB9AC"}),h("ul",{class:"role-list"},(n.lineup||[]).map(function(i){return h("li",{class:r.indexOf(i)<0?"dead":""},h("span",{text:(r.indexOf(i)<0?"\u2620 ":"")+J(i)}),h("b",{text:Bl[e.roles[i]].name}))})),h("div",{class:"op-row"},h("button",{type:"button",onclick:function(){_e("game-mafia")},text:"\uBC29 \uBAA9\uB85D"}),h("button",{type:"button",class:"go",onclick:Uo,text:"\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354"})))}function lE(n,e){let t=n.game||0,r=e.over||e.myRole==="mafia"||e.isPlayer&&!e.iAlive,i=e.over||e.isPlayer&&!e.iAlive&&n.status!=="lobby",s=C.msgs.filter(function(v){return(v.game||0)!==t?!1:v.kind==="mafia"?r:v.kind==="dead"?i:!0}),a=null,c;n.status==="lobby"||e.over?(a="chat",c="\uB300\uD654 \uBCF4\uB0B4\uAE30"):e.isPlayer?e.iAlive?n.status==="night"?e.myRole==="mafia"?(a="mafia",c="\uB9C8\uD53C\uC544\uB07C\uB9AC \uB300\uD654"):c="\uBC24\uC5D0\uB294 \uB9C8\uD53C\uC544\uB9CC \uB300\uD654\uD560 \uC218 \uC788\uC5B4\uC694":n.status==="defense"?e.me.id===n.accused?(a="defense",c="\uCD5C\uD6C4\uC758 \uBCC0\uB860 \uC4F0\uAE30"):c="\uCD5C\uD6C4\uC758 \uBCC0\uB860\uC744 \uB4E3\uB294 \uC911\uC774\uC5D0\uC694":(a="chat",c="\uB300\uD654 \uBCF4\uB0B4\uAE30"):(a="dead",c="\uC800\uC2B9 \uCC44\uD305 (\uC8FD\uC740 \uC0AC\uB78C\uB07C\uB9AC\uB9CC \uBCF4\uC5EC\uC694)"):c="\uAC8C\uC784 \uC911\uC5D0\uB294 \uCC38\uAC00\uC790\uB9CC \uB300\uD654\uD560 \uC218 \uC788\uC5B4\uC694";let l={mafia:"\uB9C8\uD53C\uC544 \uB300\uD654",dead:"\uC800\uC2B9",defense:"\uCD5C\uD6C4\uC758 \uBCC0\uB860"},f=h("div",{class:"log",role:"log","aria-live":"polite"},s.length?s.map(function(v){if(v.kind==="sys"||v.kind==="skip")return h("div",{class:"msg-sys strong",text:v.text});let S=e.me&&v.memberId===e.me.id;return h("div",{class:"bubble "+(v.kind||"chat")+(S?" mine":"")},h("div",{class:"b-meta"},h("b",{text:v.nick||"\uC190\uB2D8"}),l[v.kind]?h("span",{class:"b-tag",text:l[v.kind]}):null),h("div",{class:"b-text",text:v.text}))}):h("div",{class:"msg-sys",text:"\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694."})),p=bi("input","chat-text",{type:"text",class:"text-in",maxlength:"120",placeholder:c,autocomplete:"off",disabled:!a}),y=h("form",{class:"send-row",novalidate:!0},p,h("button",{type:"submit",class:"btn-sm",disabled:!a,text:"\uBCF4\uB0B4\uAE30"}));return y.addEventListener("submit",async function(v){v.preventDefault();let S=p.value.trim();if(!(!S||!C.user||!a))try{await gm(a,S),C.drafts["chat-text"]="",re()}catch(k){K(ce(k))}}),h("div",{class:"field"},h("div",{class:"field-label",text:e.myRole==="mafia"&&n.status==="night"&&e.iAlive?"\uB300\uD654 \xB7 \uC9C0\uAE08\uC740 \uB9C8\uD53C\uC544\uB07C\uB9AC\uB9CC \uBCF4\uC5EC\uC694":"\uB300\uD654"}),f,y)}function hE(){return h("div",{class:"panel"},h("div",{class:"field-label",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C \xB7 \uB450\uBAA9 \uC804\uC6A9"}),C.topics.length?h("ul",{class:"topic-list"},C.topics.map(function(n){return h("li",null,h("span",null,h("b",{text:n.name})," \xB7 "+(n.words||[]).length+"\uAC1C"),h("button",{type:"button",class:"btn-sm",onclick:function(){im(n)},text:"\uC218\uC815"}))})):h("p",{class:"note",text:"\uC544\uC9C1 \uC5C6\uC5B4\uC694. \uC6B0\uB9AC\uB07C\uB9AC\uB9CC \uC544\uB294 \uB2E8\uC5B4\uB85C \uC8FC\uC81C\uB97C \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694."}),h("button",{type:"button",class:"add-btn",onclick:function(){im(null)},text:"\uC8FC\uC81C \uCD94\uAC00"}),h("p",{class:"hint",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C\uB294 \uBC29 \uC124\uC815\uC5D0\uC11C \u2018\uB79C\uB364\u2019\uC77C \uB54C \uB2E4\uB978 \uC8FC\uC81C\uB4E4 \uC0AC\uC774\uC5D0 \uC11E\uC5EC \uB098\uC640\uC694."}))}function dE(){let n=be(),e=n?n.nick:"\uC190\uB2D8",t=bi("textarea","gb-text",{class:"gb-in",maxlength:"300",placeholder:"\uBCF8\uBD80\uC5D0 \uD55C\uB9C8\uB514 \uB0A8\uAE30\uAE30"}),r=h("form",{class:"panel",novalidate:!0},h("div",{class:"field-label",text:e+"(\uC73C)\uB85C \uB0A8\uAE30\uAE30"}),t,h("button",{type:"submit",class:"save",disabled:!C.user,text:"\uB0A8\uAE30\uAE30"}));r.addEventListener("submit",async function(s){s.preventDefault();let a=t.value.trim();if(!a){K("\uB0B4\uC6A9\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}try{await vi(Ge(W,"guestbook"),{uid:Ti(),memberId:n?n.id:null,nick:e,text:a,createdAt:nt()}),C.drafts["gb-text"]="",re(),K("\uBC29\uBA85\uB85D\uC5D0 \uB0A8\uACBC\uC5B4\uC694.")}catch(c){K(ce(c))}});let i=C.guest.length?h("ul",{class:"gb-list"},C.guest.map(function(s){let a=s.memberId?rt(s.memberId):null,c=ar()||C.user&&s.uid===C.user.uid;return h("li",{class:"gb-item"},h("div",{class:"gb-photo"},Zt(a||{nick:s.nick})),h("div",{class:"gb-body"},h("div",{class:"gb-meta"},h("b",{text:a?a.nick:s.nick||"\uC190\uB2D8"}),a&&a.rank?h("span",{class:"gb-rank",text:a.rank}):null,h("span",{class:"gb-time",text:dI(s.createdAt)})),h("p",{class:"gb-text",text:s.text}),c?C.gbConfirm===s.id?h("div",{class:"gb-del"},h("span",{text:"\uC9C0\uC6B8\uAE4C\uC694?"}),h("button",{type:"button",class:"link-btn",onclick:function(){C.gbConfirm=null,re()},text:"\uCDE8\uC18C"}),h("button",{type:"button",class:"link-btn danger",onclick:async function(){try{await _i(Te(W,"guestbook",s.id)),C.gbConfirm=null}catch(l){K(ce(l))}},text:"\uC9C0\uC6B0\uAE30"})):h("button",{type:"button",class:"link-btn quiet",onclick:function(){C.gbConfirm=s.id,re()},text:"\uC9C0\uC6B0\uAE30"}):null))})):h("div",{class:"empty",text:C.guestReady?"\uCCAB \uBC29\uBA85\uB85D\uC744 \uB0A8\uACA8 \uC8FC\uC138\uC694.":"\uBC29\uBA85\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return h("section",{class:"screen"},h("div",{class:"sec-head"},h("div",null,h("span",{class:"eyebrow",text:"\uBCF8\uBD80 \uCD9C\uC785 \uAE30\uB85D"}),h("h2",{text:"\uBC29\uBA85\uB85D"}),h("p",{text:"\uC870\uC9C1\uC6D0 \uB204\uAD6C\uB098 \uB0A8\uAE38 \uC218 \uC788\uC5B4\uC694. \uB0B4\uAC00 \uC4F4 \uAE00\uC740 \uB0B4\uAC00 \uC9C0\uC6B8 \uC218 \uC788\uC5B4\uC694."}))),r,i)}function fE(n){return new Promise(function(e,t){let r=URL.createObjectURL(n),i=new Image;i.onload=function(){let a=i.naturalWidth,c=i.naturalHeight,l=Math.min(1,640/Math.max(a,c)),f=document.createElement("canvas");f.width=Math.round(a*l),f.height=Math.round(c*l);let p=f.getContext("2d");p.fillStyle="#1c1d20",p.fillRect(0,0,f.width,f.height),p.drawImage(i,0,0,f.width,f.height),URL.revokeObjectURL(r),e(f.toDataURL("image/jpeg",.8))},i.onerror=function(){URL.revokeObjectURL(r),t(new Error("bad image"))},i.src=r})}var sr=null;function Sn(){sr&&(sr.remove(),sr=null,document.body.style.overflow="")}function bm(n,e,t){Sn(),sr=h("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e,onclick:function(r){r.target===sr&&Sn()}},h("div",{class:"sheet-panel"},h("div",{class:"sheet-head"},h("div",null,h("span",{class:"eyebrow",text:n}),h("h2",{text:e})),h("button",{type:"button",class:"x","aria-label":"\uB2EB\uAE30",onclick:Sn,text:"\u2715"})),t)),document.body.appendChild(sr),document.body.style.overflow="hidden"}function Am(n){let e=!n,t={photo:n?am(n.photo):""},r=h("input",{type:"text",id:"f-nick",maxlength:"20",value:n?n.nick:"",autocomplete:"off"}),i=h("input",{type:"text",id:"f-rank",maxlength:"10",value:n&&n.rank||"",autocomplete:"off",placeholder:"\uBE44\uC6CC\uB450\uBA74 \uC77C\uBC18 \uC870\uC9C1\uC6D0 (\uC608: \uB450\uBAA9, \uBD80\uB450\uBAA9)"}),s=h("input",{type:"text",id:"f-alias",maxlength:"30",value:n&&n.alias||"",autocomplete:"off",placeholder:"\uC608: \uBCFC\uC8FC\uBA38\uB2C8 \uAE08\uACE0"}),a=h("input",{type:"text",id:"f-intro",maxlength:"80",value:n&&n.intro||"",autocomplete:"off",placeholder:"\uBCF8\uC778 \uC9C4\uC220 \uD55C \uC904"}),c=h("textarea",{id:"f-charges",placeholder:`\uD55C \uC904\uC5D0 \uD610\uC758 \uD558\uB098\uC529
\uC608: \uD68C\uC758 \uC911 \uBAB0\uB798 \uAC04\uC2DD \uBA39\uC740 \uD610\uC758`});c.value=n?(n.charges||[]).join(`
`):"";let l=h("div",{class:"thumb"}),f=h("p",{class:"msg",role:"status"}),p=h("button",{type:"button",class:"ghost",onclick:function(){t.photo="",y()},text:"\uC0AC\uC9C4 \uBE7C\uAE30"});function y(){l.replaceChildren(Zt({nick:r.value||"?",photo:t.photo})),p.hidden=!t.photo}let v=h("input",{type:"file",id:"f-photo",accept:"image/*"});v.addEventListener("change",function(){let V=v.files&&v.files[0];V&&(f.className="msg",f.textContent="\uC0AC\uC9C4 \uC815\uB9AC \uC911\u2026",fE(V).then(function(x){t.photo=x,y(),f.textContent="\uC0AC\uC9C4\uC744 \uBD99\uC600\uC5B4\uC694. \uC800\uC7A5\uD558\uBA74 \uBAA8\uB450\uC5D0\uAC8C \uBCF4\uC785\uB2C8\uB2E4."},function(){f.className="msg err",f.textContent="\uC774 \uC0AC\uC9C4\uC740 \uC5F4 \uC218 \uC5C6\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uC9C4(JPG, PNG)\uC744 \uACE8\uB77C\uC8FC\uC138\uC694."}),v.value="")});let S=h("button",{type:"submit",class:"save",text:e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5"}),k=h("form",{class:"form",novalidate:!0},h("div",{class:"photo-edit"},l,h("div",{class:"photo-btns"},h("label",{class:"file-btn"},"\uC0AC\uC9C4 \uACE0\uB974\uAE30",v),p,h("span",{class:"hint",text:"\uC790\uB3D9\uC73C\uB85C \uC791\uAC8C \uC904\uC5EC\uC11C \uC800\uC7A5\uB3FC\uC694."}))),h("label",null,h("b",{text:"\uB2C9\uB124\uC784 (\uD544\uC218)"}),r),h("label",null,h("b",{text:"\uC9C1\uC704"}),i),h("label",null,h("b",{text:"\uBCC4\uBA85"}),s),h("label",null,h("b",{text:"\uD55C \uC904 \uC18C\uAC1C"}),a),h("label",null,h("b",{text:"\uD610\uC758"}),c),f,S);k.addEventListener("submit",async function(V){V.preventDefault();let x=r.value.trim();if(!x){f.className="msg err",f.textContent="\uB2C9\uB124\uC784\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.",r.focus();return}let G={nick:x,rank:i.value.trim(),alias:s.value.trim(),intro:a.value.trim(),charges:c.value.split(`
`).map(function(B){return B.trim()}).filter(Boolean).slice(0,8),photo:t.photo,sample:!1},q=e?"m"+Date.now().toString(36)+Math.random().toString(36).slice(2,6):n.id;G.no=e?C.members.reduce(function(B,te){return Math.max(B,te.no||0)},0)+1:n.no,S.disabled=!0,S.textContent="\uC800\uC7A5 \uC911\u2026";try{await yi(Te(W,"members",q),G),Sn(),_e("m-"+q),K(e?"\uC0C8 \uC218\uBC30\uC11C\uB97C \uB4F1\uB85D\uD588\uC5B4\uC694.":"\uC218\uBC30\uC11C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.")}catch(B){S.disabled=!1,S.textContent=e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5",f.className="msg err",f.textContent=ce(B)}}),r.addEventListener("input",function(){t.photo||y()}),bm(e?"\uC2E0\uADDC \uB4F1\uB85D":Mo(n),e?"\uC870\uC9C1\uC6D0 \uB4F1\uB85D":"\uC218\uBC30\uC11C \uC218\uC815",k),y()}function im(n){let e=h("input",{type:"text",id:"t-name",maxlength:"16",value:n?n.name:"",autocomplete:"off",placeholder:"\uC608: \uAC8C\uC784 \uC544\uC774\uD15C"}),t=h("textarea",{id:"t-words",placeholder:`\uD55C \uC904\uC5D0 \uD558\uB098\uC529, \uB610\uB294 \uC27C\uD45C\uB85C \uAD6C\uBD84
\uC608: \uBE68\uAC04 \uD3EC\uC158, \uADC0\uD658 \uC8FC\uBB38\uC11C, \uC5D8\uB9AD\uC11C, \uC21C\uAC04\uC774\uB3D9 \uC2A4\uD06C\uB864`});t.value=n?(n.words||[]).join(`
`):"";let r=h("p",{class:"msg",role:"status"}),i=h("button",{type:"submit",class:"save",text:n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00"}),s=h("div");function a(f){i.disabled=!1,i.textContent=n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00",r.className="msg err",r.textContent=f}function c(f){n&&s.replaceChildren(f?h("div",{class:"confirm"},h("p",{text:"\u2018"+n.name+"\u2019 \uC8FC\uC81C\uB97C \uC9C0\uC6B8\uAE4C\uC694?"}),h("div",{class:"op-row"},h("button",{type:"button",onclick:function(){c(!1)},text:"\uCDE8\uC18C"}),h("button",{type:"button",class:"danger",onclick:async function(){try{await _i(Te(W,"liarTopics",n.id)),Sn(),K("\uC8FC\uC81C\uB97C \uC9C0\uC6E0\uC5B4\uC694.")}catch(p){a(ce(p))}},text:"\uC9C0\uC6B0\uAE30"}))):h("button",{type:"button",class:"ghost",onclick:function(){c(!0)},text:"\uC774 \uC8FC\uC81C \uC9C0\uC6B0\uAE30"}))}let l=h("form",{class:"form",novalidate:!0},h("label",null,h("b",{text:"\uC8FC\uC81C \uC774\uB984"}),e),h("label",null,h("b",{text:"\uB2E8\uC5B4 (4\uAC1C \uC774\uC0C1)"}),t),r,i,s);l.addEventListener("submit",async function(f){f.preventDefault();let p=e.value.trim(),y={},v=t.value.split(/[\n,]/).map(function(S){return S.trim()}).filter(function(S){return!S||y[S]?!1:(y[S]=!0,!0)}).slice(0,60);if(!p){a("\uC8FC\uC81C \uC774\uB984\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}if(v.length<4){a("\uB2E8\uC5B4\uB97C 4\uAC1C \uC774\uC0C1 \uC801\uC5B4\uC8FC\uC138\uC694. \uC9C0\uAE08 "+v.length+"\uAC1C\uC608\uC694.");return}i.disabled=!0,i.textContent="\uC800\uC7A5 \uC911\u2026";try{n?await yi(Te(W,"liarTopics",n.id),{name:p,words:v,order:n.order||0}):await vi(Ge(W,"liarTopics"),{name:p,words:v,order:Date.now()}),Sn(),K(n?"\uC8FC\uC81C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.":"\uC8FC\uC81C\uB97C \uCD94\uAC00\uD588\uC5B4\uC694.")}catch(S){a(ce(S))}}),bm("\uB77C\uC774\uC5B4 \xB7 \uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C",n?"\uC8FC\uC81C \uC218\uC815":"\uC8FC\uC81C \uCD94\uAC00",l),c(!1)}document.addEventListener("keydown",function(n){n.key==="Escape"&&Sn()});var pE=document.getElementById("bf-root"),Ii=h("main",{class:"wrap"}),Sm=h("span",{class:"op-chip",text:"\uB450\uBAA9",hidden:!0}),mE=h("div",{class:"filebar wrap"},h("span",{class:"brand"},Ul("logo-s"),h("span",null,h("b",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"})," \xB7 \uBE44\uBC00\uBCF8\uBD80")),h("span",{class:"fb-right"},Sm,h("span",{class:"lvl",text:"\uAE30\uBC00 \uB4F1\uAE09 A"}))),gE=[["hq","\uBCF8\uBD80"],["members","\uC870\uC9C1\uC6D0"],["games","\uAC8C\uC784\uBC29"],["guestbook","\uBC29\uBA85\uB85D"]],ko={},Rm=h("nav",{class:"tabbar","aria-label":"\uC8FC \uBA54\uB274"},h("div",{class:"tabbar-in"},gE.map(function(n){let e=h("button",{class:"tab",type:"button",onclick:function(){_e(n[0])}},gI(n[0]),h("span",{text:n[1]}));return ko[n[0]]=e,e})));pE.replaceChildren(mE,Ii,Rm);var xl=null,Dl=!1,sm=0;function re(){Dl||(Dl=!0,requestAnimationFrame(function(){Dl=!1,yE()}))}function yE(){let n=document.activeElement,e=n&&n.id&&Ii.contains(n)?n.id:null,t=e&&typeof n.selectionStart=="number"?[n.selectionStart,n.selectionEnd]:null,r=Ii.querySelector(".log"),i=r?{top:r.scrollTop,pinned:r.scrollHeight-r.scrollTop-r.clientHeight<60}:null,s=cm(),a="hq",c;C.membersReady?em()?c=AI():s==="members"?(a="members",c=SI()):s.indexOf("m-")===0?(a="members",c=RI(s.slice(2))):s==="games"?(a="games",c=CI()):s==="game-liar"?(a="games",c=kI()):s==="game-mafia"?(a="games",c=ZI()):s.indexOf("room-")===0?(a="games",c=FI(s.slice(5))):s==="guestbook"?(a="guestbook",c=dE()):c=TI():c=h("section",{class:"screen"},h("div",{class:"empty",text:"\uBCF8\uBD80 \uBB38\uC744 \uC5EC\uB294 \uC911\u2026"})),s.indexOf("room-")!==0&&hm(null),s!==xl&&(C.confirmDelete=!1);let l=C.membersReady&&em();if(Rm.hidden=l,Ii.replaceChildren(c),Object.keys(ko).forEach(function(p){p===a&&!l?ko[p].setAttribute("aria-current","page"):ko[p].removeAttribute("aria-current")}),Sm.hidden=!ar(),e){let p=document.getElementById(e);if(p&&(p.focus({preventScroll:!0}),t&&p.setSelectionRange))try{p.setSelectionRange(t[0],t[1])}catch{}}let f=Ii.querySelector(".log");if(f){let p=C.msgs.length!==sm;!i||i.pinned||p?f.scrollTop=f.scrollHeight:f.scrollTop=i.top}sm=C.msgs.length,s!==xl&&window.scrollTo(0,0),xl=s}window.addEventListener("hashchange",re);vI();re();
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
