var nd=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Sg=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],c=n[t++],h=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},rd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,c=a?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,p=s>>2,y=(s&3)<<4|c>>4,_=(c&15)<<2|f>>6,S=f&63;h||(S=64,a||(_=64)),r.push(t[p],t[y],t[_],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(nd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Sg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let f=i<n.length?t[n.charAt(i)]:64;++i;let y=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||f==null||y==null)throw new ya;let _=s<<2|c>>4;if(r.push(_),f!==64){let S=c<<4&240|f>>2;if(r.push(S),y!==64){let C=f<<6&192|y;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},ya=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Rg=function(n){let e=nd(n);return rd.encodeByteArray(e,!0)},Lr=function(n){return Rg(n).replace(/\./g,"")},va=function(n){try{return rd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Pg(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var kg=()=>Pg().__FIREBASE_DEFAULTS__,Cg=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},xg=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&va(n[1]);return e&&JSON.parse(e)},$i=()=>{try{return kg()||Cg()||xg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},wa=n=>{var e,t;return(t=(e=$i())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},id=n=>{let e=wa(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ia=()=>{var n;return(n=$i())===null||n===void 0?void 0:n.config},Ea=n=>{var e;return(e=$i())===null||e===void 0?void 0:e[`_${n}`]};var Ji=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function sd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Lr(JSON.stringify(t)),Lr(JSON.stringify(a)),""].join(".")}function Ie(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function od(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ie())}function Dg(){var n;let e=(n=$i())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ad(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function cd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ud(){let n=Ie();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ld(){return!Dg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ba(){try{return typeof indexedDB=="object"}catch{return!1}}function hd(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Ng="FirebaseError",Ge=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ng,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,wt.prototype.create)}},wt=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Og(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Ge(i,c,r)}};function Og(n,e){return n.replace(Vg,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var Vg=/\{\$([^}]+)}/g;function dd(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function It(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(td(s)&&td(a)){if(!It(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function td(n){return n!==null&&typeof n=="object"}function Ln(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Fn(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Un(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function fd(n,e){let t=new _a(n,e);return t.subscribe.bind(t)}var _a=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Mg(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ga),i.error===void 0&&(i.error=ga),i.complete===void 0&&(i.complete=ga);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Mg(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ga(){}var cb=4*60*60*1e3;function ue(n){return n&&n._delegate?n._delegate:n}var Je=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var an="[DEFAULT]";var Ta=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Ji;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fg(e))try{this.getOrInitializeService({instanceIdentifier:an})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=an){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=an){return this.instances.has(e)}getOptions(e=an){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Lg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=an){return this.component?this.component.multipleInstances?e:an:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Lg(n){return n===an?void 0:n}function Fg(n){return n.instantiationMode==="EAGER"}var Xi=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Ta(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Ug=[],J;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(J||(J={}));var Bg={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},qg=J.INFO,jg={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},zg=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=jg[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Dt=class{constructor(e){this.name=e,this._logLevel=qg,this._logHandler=zg,this._userLogHandler=null,Ug.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Bg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}};var Gg=(n,e)=>e.some(t=>n instanceof t),pd,md;function Kg(){return pd||(pd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wg(){return md||(md=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var gd=new WeakMap,Sa=new WeakMap,yd=new WeakMap,Aa=new WeakMap,Pa=new WeakMap;function Hg(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(at(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&gd.set(t,n)}).catch(()=>{}),Pa.set(e,n),e}function Qg(n){if(Sa.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});Sa.set(n,e)}var Ra={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Sa.get(n);if(e==="objectStoreNames")return n.objectStoreNames||yd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return at(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function _d(n){Ra=n(Ra)}function Yg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Zi(this),e,...t);return yd.set(r,e.sort?e.sort():[e]),at(r)}:Wg().includes(n)?function(...e){return n.apply(Zi(this),e),at(gd.get(this))}:function(...e){return at(n.apply(Zi(this),e))}}function Jg(n){return typeof n=="function"?Yg(n):(n instanceof IDBTransaction&&Qg(n),Gg(n,Kg())?new Proxy(n,Ra):n)}function at(n){if(n instanceof IDBRequest)return Hg(n);if(Aa.has(n))return Aa.get(n);let e=Jg(n);return e!==n&&(Aa.set(n,e),Pa.set(e,n)),e}var Zi=n=>Pa.get(n);function wd(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),c=at(a);return r&&a.addEventListener("upgradeneeded",h=>{r(at(a.result),h.oldVersion,h.newVersion,at(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),c.then(h=>{s&&h.addEventListener("close",()=>s()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}var $g=["get","getKey","getAll","getAllKeys","count"],Xg=["put","add","delete","clear"],ka=new Map;function vd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ka.get(e))return ka.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Xg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||$g.includes(t)))return;let s=async function(a,...c){let h=this.transaction(a,i?"readwrite":"readonly"),f=h.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[t](...c),i&&h.done]))[0]};return ka.set(e,s),s}_d(n=>({...n,get:(e,t,r)=>vd(e,t)||n.get(e,t,r),has:(e,t)=>!!vd(e,t)||n.has(e,t)}));var xa=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Zg(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Zg(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var Da="@firebase/app",Id="0.10.5";var cn=new Dt("@firebase/app"),ey="@firebase/app-compat",ty="@firebase/analytics-compat",ny="@firebase/analytics",ry="@firebase/app-check-compat",iy="@firebase/app-check",sy="@firebase/auth",oy="@firebase/auth-compat",ay="@firebase/database",cy="@firebase/database-compat",uy="@firebase/functions",ly="@firebase/functions-compat",hy="@firebase/installations",dy="@firebase/installations-compat",fy="@firebase/messaging",py="@firebase/messaging-compat",my="@firebase/performance",gy="@firebase/performance-compat",yy="@firebase/remote-config",_y="@firebase/remote-config-compat",vy="@firebase/storage",wy="@firebase/storage-compat",Iy="@firebase/firestore",Ey="@firebase/vertexai-preview",by="@firebase/firestore-compat",Ty="firebase",Ay="10.12.2";var Na="[DEFAULT]",Sy={[Da]:"fire-core",[ey]:"fire-core-compat",[ny]:"fire-analytics",[ty]:"fire-analytics-compat",[iy]:"fire-app-check",[ry]:"fire-app-check-compat",[sy]:"fire-auth",[oy]:"fire-auth-compat",[ay]:"fire-rtdb",[cy]:"fire-rtdb-compat",[uy]:"fire-fn",[ly]:"fire-fn-compat",[hy]:"fire-iid",[dy]:"fire-iid-compat",[fy]:"fire-fcm",[py]:"fire-fcm-compat",[my]:"fire-perf",[gy]:"fire-perf-compat",[yy]:"fire-rc",[_y]:"fire-rc-compat",[vy]:"fire-gcs",[wy]:"fire-gcs-compat",[Iy]:"fire-fst",[by]:"fire-fst-compat",[Ey]:"fire-vertex","fire-js":"fire-js",[Ty]:"fire-js-all"};var es=new Map,Ry=new Map,Oa=new Map;function Ed(n,e){try{n.container.addComponent(e)}catch(t){cn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ot(n){let e=n.name;if(Oa.has(e))return cn.debug(`There were multiple attempts to register component ${e}.`),!1;Oa.set(e,n);for(let t of es.values())Ed(t,n);for(let t of Ry.values())Ed(t,n);return!0}function Ur(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function rt(n){return n.settings!==void 0}var Py={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Nt=new wt("app","Firebase",Py);var Va=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Je("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Nt.create("app-deleted",{appName:this._name})}};var Vt=Ay;function Fa(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Na,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Nt.create("bad-app-name",{appName:String(i)});if(t||(t=Ia()),!t)throw Nt.create("no-options");let s=es.get(i);if(s){if(It(t,s.options)&&It(r,s.config))return s;throw Nt.create("duplicate-app",{appName:i})}let a=new Xi(i);for(let h of Oa.values())a.addComponent(h);let c=new Va(t,r,a);return es.set(i,c),c}function ts(n=Na){let e=es.get(n);if(!e&&n===Na&&Ia())return Fa();if(!e)throw Nt.create("no-app",{appName:n});return e}function nt(n,e,t){var r;let i=(r=Sy[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),cn.warn(c.join(" "));return}Ot(new Je(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var ky="firebase-heartbeat-database",Cy=1,Fr="firebase-heartbeat-store",Ca=null;function Sd(){return Ca||(Ca=wd(ky,Cy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Fr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Nt.create("idb-open",{originalErrorMessage:n.message})})),Ca}async function xy(n){try{let t=(await Sd()).transaction(Fr),r=await t.objectStore(Fr).get(Rd(n));return await t.done,r}catch(e){if(e instanceof Ge)cn.warn(e.message);else{let t=Nt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});cn.warn(t.message)}}}async function bd(n,e){try{let r=(await Sd()).transaction(Fr,"readwrite");await r.objectStore(Fr).put(e,Rd(n)),await r.done}catch(t){if(t instanceof Ge)cn.warn(t.message);else{let r=Nt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});cn.warn(r.message)}}}function Rd(n){return`${n.name}!${n.options.appId}`}var Dy=1024,Ny=30*24*60*60*1e3,Ma=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new La(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Td();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{let c=new Date(a.date).valueOf();return Date.now()-c<=Ny}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Td(),{heartbeatsToSend:r,unsentEntries:i}=Oy(this._heartbeatsCache.heartbeats),s=Lr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function Td(){return new Date().toISOString().substring(0,10)}function Oy(n,e=Dy){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Ad(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Ad(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var La=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ba()?hd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await xy(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return bd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return bd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Ad(n){return Lr(JSON.stringify({version:2,heartbeats:n})).length}function Vy(n){Ot(new Je("platform-logger",e=>new xa(e),"PRIVATE")),Ot(new Je("heartbeat",e=>new Ma(e),"PRIVATE")),nt(Da,Id,n),nt(Da,Id,"esm2017"),nt("fire-js","")}Vy("");var My="firebase",Ly="10.12.2";nt(My,Ly,"app");function ns(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Kd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Wd=Kd,Hd=new wt("auth","Firebase",Kd());var cs=new Dt("@firebase/auth");function Fy(n,...e){cs.logLevel<=J.WARN&&cs.warn(`Auth (${Vt}): ${n}`,...e)}function is(n,...e){cs.logLevel<=J.ERROR&&cs.error(`Auth (${Vt}): ${n}`,...e)}function $e(n,...e){throw sc(n,...e)}function it(n,...e){return sc(n,...e)}function ic(n,e,t){let r=Object.assign(Object.assign({},Wd()),{[e]:t});return new wt("auth","Firebase",r).create(e,{appName:n.name})}function Lt(n){return ic(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Uy(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&$e(n,"argument-error"),ic(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function sc(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Hd.create(n,...e)}function F(n,e,...t){if(!n)throw sc(e,...t)}function ct(n){let e="INTERNAL ASSERTION FAILED: "+n;throw is(e),new Error(e)}function bt(n,e){n||ct(e)}function qa(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function By(){return Pd()==="http:"||Pd()==="https:"}function Pd(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function qy(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(By()||ad()||"connection"in navigator)?navigator.onLine:!0}function jy(){if(typeof navigator=="undefined")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var un=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,bt(t>e,"Short delay should be less than long delay!"),this.isMobile=od()||cd()}get(){return qy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function oc(n,e){bt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var us=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var zy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Gy=new un(3e4,6e4);function Ee(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function De(n,e,t,r,i={}){return Qd(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let c=Ln(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();return h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode),us.fetch()(Yd(n,n.config.apiHost,t,c),Object.assign({method:e,headers:h,referrerPolicy:"no-referrer"},s))})}async function Qd(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},zy),e);try{let i=new ja(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw Br(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let c=s.ok?a.errorMessage:a.error.message,[h,f]=c.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Br(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw Br(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw Br(n,"user-disabled",a);let p=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw ic(n,p,f);$e(n,p)}}catch(i){if(i instanceof Ge)throw i;$e(n,"network-request-failed",{message:String(i)})}}async function Ut(n,e,t,r,i={}){let s=await De(n,e,t,r,i);return"mfaPendingCredential"in s&&$e(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Yd(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?oc(n.config,i):`${n.config.apiScheme}://${i}`}function Ky(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var ja=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(it(this.auth,"network-request-failed")),Gy.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Br(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=it(n,e,r);return i.customData._tokenResponse=t,i}function kd(n){return n!==void 0&&n.enterprise!==void 0}var za=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Ky(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Wy(n,e){return De(n,"GET","/v2/recaptchaConfig",Ee(n,e))}async function Hy(n,e){return De(n,"POST","/v1/accounts:delete",e)}async function Jd(n,e){return De(n,"POST","/v1/accounts:lookup",e)}function qr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function $d(n,e=!1){let t=ue(n),r=await t.getIdToken(e),i=ac(r);F(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:qr(Ua(i.auth_time)),issuedAtTime:qr(Ua(i.iat)),expirationTime:qr(Ua(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ua(n){return Number(n)*1e3}function ac(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return is("JWT malformed, contained fewer than 3 sections"),null;try{let i=va(t);return i?JSON.parse(i):(is("Failed to decode base64 JWT payload"),null)}catch(i){return is("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Cd(n){let e=ac(n);return F(e,"internal-error"),F(typeof e.exp!="undefined","internal-error"),F(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function zr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ge&&Qy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Qy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Ga=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Gr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qr(this.lastLoginAt),this.creationTime=qr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function ls(n){var e;let t=n.auth,r=await n.getIdToken(),i=await zr(n,Jd(t,{idToken:r}));F(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Zd(s.providerUserInfo):[],c=Yy(n.providerData,a),h=n.isAnonymous,f=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),p=h?f:!1,y={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Gr(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function Xd(n){let e=ue(n);await ls(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Yy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Zd(n){return n.map(e=>{var{providerId:t}=e,r=ns(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function Jy(n,e){let t=await Qd(n,{},async()=>{let r=Ln({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=Yd(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",us.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function $y(n,e){return De(n,"POST","/v2/accounts:revokeToken",Ee(n,e))}var jr=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken!="undefined","internal-error"),F(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Cd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");let t=Cd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Jy(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(F(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(F(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(F(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return ct("not implemented")}};function Mt(n,e){F(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}var qn=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=ns(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ga(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Gr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await zr(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return $d(this,e)}reload(){return Xd(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ls(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(rt(this.auth.app))return Promise.reject(Lt(this.auth));let e=await this.getIdToken();return await zr(this,Hy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,h,f,p;let y=(r=t.displayName)!==null&&r!==void 0?r:void 0,_=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(a=t.photoURL)!==null&&a!==void 0?a:void 0,O=(c=t.tenantId)!==null&&c!==void 0?c:void 0,x=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,z=(f=t.createdAt)!==null&&f!==void 0?f:void 0,W=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:K,emailVerified:re,isAnonymous:Te,providerData:Z,stsTokenManager:E}=t;F(K&&E,e,"internal-error");let g=jr.fromJSON(this.name,E);F(typeof K=="string",e,"internal-error"),Mt(y,e.name),Mt(_,e.name),F(typeof re=="boolean",e,"internal-error"),F(typeof Te=="boolean",e,"internal-error"),Mt(S,e.name),Mt(C,e.name),Mt(O,e.name),Mt(x,e.name),Mt(z,e.name),Mt(W,e.name);let w=new n({uid:K,auth:e,email:_,emailVerified:re,displayName:y,isAnonymous:Te,photoURL:C,phoneNumber:S,tenantId:O,stsTokenManager:g,createdAt:z,lastLoginAt:W});return Z&&Array.isArray(Z)&&(w.providerData=Z.map(I=>Object.assign({},I))),x&&(w._redirectEventId=x),w}static async _fromIdTokenResponse(e,t,r=!1){let i=new jr;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ls(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];F(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?Zd(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new jr;c.updateFromIdToken(r);let h=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Gr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(h,f),h}};var xd=new Map;function Et(n){bt(n instanceof Function,"Expected a class definition");let e=xd.get(n);return e?(bt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xd.set(n,e),e)}var hs=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};hs.type="NONE";var Ka=hs;function ss(n,e,t){return`firebase:${n}:${e}:${t}`}var ds=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=ss(this.userKey,i.apiKey,s),this.fullPersistenceKey=ss("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?qn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(Et(Ka),e,r);let i=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f),s=i[0]||Et(Ka),a=ss(r,e.config.apiKey,e.name),c=null;for(let f of t)try{let p=await f._get(a);if(p){let y=qn._fromJSON(e,p);f!==s&&(c=y),s=f;break}}catch{}let h=i.filter(f=>f._shouldAllowMigration);return!s._shouldAllowMigration||!h.length?new n(s,e,r):(s=h[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async f=>{if(f!==s)try{await f._remove(a)}catch{}})),new n(s,e,r))}};function Dd(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(nf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ef(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(sf(e))return"Blackberry";if(of(e))return"Webos";if(cc(e))return"Safari";if((e.includes("chrome/")||tf(e))&&!e.includes("edge/"))return"Chrome";if(rf(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ef(n=Ie()){return/firefox\//i.test(n)}function cc(n=Ie()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function tf(n=Ie()){return/crios\//i.test(n)}function nf(n=Ie()){return/iemobile/i.test(n)}function rf(n=Ie()){return/android/i.test(n)}function sf(n=Ie()){return/blackberry/i.test(n)}function of(n=Ie()){return/webos/i.test(n)}function Cs(n=Ie()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Xy(n=Ie()){var e;return Cs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Zy(){return ud()&&document.documentMode===10}function af(n=Ie()){return Cs(n)||rf(n)||of(n)||sf(n)||/windows phone/i.test(n)||nf(n)}function e_(){try{return!!(window&&window!==window.top)}catch{return!1}}function cf(n,e=[]){let t;switch(n){case"Browser":t=Dd(Ie());break;case"Worker":t=`${Dd(Ie())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Vt}/${r}`}var Wa=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,c)=>{try{let h=e(s);a(h)}catch(h){c(h)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function t_(n,e={}){return De(n,"GET","/v2/passwordPolicy",Ee(n,e))}var n_=6,Ha=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:n_,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;let h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(i=h.containsLowercaseLetter)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(s=h.containsUppercaseLetter)!==null&&s!==void 0?s:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(c=h.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),h}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Qa=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fs(this),this.idTokenSubscription=new fs(this),this.beforeStateQueue=new Wa(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Hd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Et(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await ds.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Jd(this,{idToken:e}),r=await qn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(rt(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===c)&&(h!=null&&h.user)&&(i=h.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ls(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=jy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(rt(this.app))return Promise.reject(Lt(this));let t=e?ue(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return rt(this.app)?Promise.reject(Lt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return rt(this.app)?Promise.reject(Lt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Et(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await t_(this),t=new Ha(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new wt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await $y(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Et(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=await ds.create(this,[Et(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let h=e.addObserver(t,r,i);return()=>{a=!0,h()}}else{let h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Fy(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function Bt(n){return ue(n)}var fs=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=fd(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var xs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function r_(n){xs=n}function uf(n){return xs.loadJS(n)}function i_(){return xs.recaptchaEnterpriseScript}function s_(){return xs.gapiScript}function lf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var o_="recaptcha-enterprise",a_="NO_RECAPTCHA",Ya=class{constructor(e){this.type=o_,this.auth=Bt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{Wy(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let f=new za(h);return s.tenantId==null?s._agentRecaptchaConfig=f:s._tenantRecaptchaConfigs[s.tenantId]=f,a(f.siteKey)}}).catch(h=>{c(h)})})}function i(s,a,c){let h=window.grecaptcha;kd(h)?h.enterprise.ready(()=>{h.enterprise.execute(s,{action:e}).then(f=>{a(f)}).catch(()=>{a(a_)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&kd(window.grecaptcha))i(c,s,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let h=i_();h.length!==0&&(h+=c),uf(h).then(()=>{i(c,s,a)}).catch(f=>{a(f)})}}).catch(c=>{a(c)})})}};async function Nd(n,e,t,r=!1){let i=new Ya(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let a=Object.assign({},e);return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Od(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await Nd(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await Nd(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(s)})}function hf(n,e){let t=Ur(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(It(s,e!=null?e:{}))return i;$e(i,"already-initialized")}return t.initialize({options:e})}function c_(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Et);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ds(n,e,t){let r=Bt(n);F(r._canInitEmulator,r,"emulator-config-failed"),F(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=df(e),{host:a,port:c}=u_(e),h=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${a}${h}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||l_()}function df(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function u_(n){let e=df(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Vd(r.substr(s.length+1))}}else{let[s,a]=r.split(":");return{host:s,port:Vd(a)}}}function Vd(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function l_(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var ln=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ct("not implemented")}_getIdTokenResponse(e){return ct("not implemented")}_linkToIdToken(e,t){return ct("not implemented")}_getReauthenticationResolver(e){return ct("not implemented")}};async function h_(n,e){return De(n,"POST","/v1/accounts:signUp",e)}async function d_(n,e){return Ut(n,"POST","/v1/accounts:signInWithPassword",Ee(n,e))}async function f_(n,e){return Ut(n,"POST","/v1/accounts:signInWithEmailLink",Ee(n,e))}async function p_(n,e){return Ut(n,"POST","/v1/accounts:signInWithEmailLink",Ee(n,e))}var Kr=class n extends ln{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Od(e,t,"signInWithPassword",d_);case"emailLink":return f_(e,{email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Od(e,r,"signUpPassword",h_);case"emailLink":return p_(e,{idToken:t,email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Bn(n,e){return Ut(n,"POST","/v1/accounts:signInWithIdp",Ee(n,e))}var m_="http://localhost",hn=class n extends ln{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):$e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=ns(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return Bn(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Bn(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Bn(e,t)}buildRequest(){let e={requestUri:m_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ln(t)}return e}};async function g_(n,e){return De(n,"POST","/v1/accounts:sendVerificationCode",Ee(n,e))}async function y_(n,e){return Ut(n,"POST","/v1/accounts:signInWithPhoneNumber",Ee(n,e))}async function __(n,e){let t=await Ut(n,"POST","/v1/accounts:signInWithPhoneNumber",Ee(n,e));if(t.temporaryProof)throw Br(n,"account-exists-with-different-credential",t);return t}var v_={USER_NOT_FOUND:"user-not-found"};async function w_(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Ut(n,"POST","/v1/accounts:signInWithPhoneNumber",Ee(n,t),v_)}var Wr=class n extends ln{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return y_(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return __(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return w_(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function I_(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function E_(n){let e=Fn(Un(n)).link,t=e?Fn(Un(e)).deep_link_id:null,r=Fn(Un(n)).deep_link_id;return(r?Fn(Un(r)).link:null)||r||t||e||n}var ps=class n{constructor(e){var t,r,i,s,a,c;let h=Fn(Un(e)),f=(t=h.apiKey)!==null&&t!==void 0?t:null,p=(r=h.oobCode)!==null&&r!==void 0?r:null,y=I_((i=h.mode)!==null&&i!==void 0?i:null);F(f&&p&&y,"argument-error"),this.apiKey=f,this.operation=y,this.code=p,this.continueUrl=(s=h.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=h.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=h.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=E_(e);try{return new n(t)}catch{return null}}};var jn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Kr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=ps.parseLink(t);return F(r,"argument-error"),Kr._fromEmailAndCode(e,r.code,r.tenantId)}};jn.PROVIDER_ID="password";jn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";jn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Hr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var dn=class extends Hr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Qr=class n extends dn{constructor(){super("facebook.com")}static credential(e){return hn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Qr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qr.PROVIDER_ID="facebook.com";var Ft=class n extends dn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return hn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Ft.GOOGLE_SIGN_IN_METHOD="google.com";Ft.PROVIDER_ID="google.com";var Yr=class n extends dn{constructor(){super("github.com")}static credential(e){return hn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Yr.GITHUB_SIGN_IN_METHOD="github.com";Yr.PROVIDER_ID="github.com";var Jr=class n extends dn{constructor(){super("twitter.com")}static credential(e,t){return hn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Jr.TWITTER_SIGN_IN_METHOD="twitter.com";Jr.PROVIDER_ID="twitter.com";async function b_(n,e){return Ut(n,"POST","/v1/accounts:signUp",Ee(n,e))}var fn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await qn._fromIdTokenResponse(e,r,i),a=Md(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=Md(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function Md(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}async function uc(n){var e;if(rt(n.app))return Promise.reject(Lt(n));let t=Bt(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new fn({user:t.currentUser,providerId:null,operationType:"signIn"});let r=await b_(t,{returnSecureToken:!0}),i=await fn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}var Ja=class n extends Ge{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function ff(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ja._fromErrorAndOperation(n,s,e,r):s})}async function T_(n,e,t=!1){let r=await zr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return fn._forOperation(n,"link",r)}async function A_(n,e,t=!1){let{auth:r}=n;if(rt(r.app))return Promise.reject(Lt(r));let i="reauthenticate";try{let s=await zr(n,ff(r,i,e,n),t);F(s.idToken,r,"internal-error");let a=ac(s.idToken);F(a,r,"internal-error");let{sub:c}=a;return F(n.uid===c,r,"user-mismatch"),fn._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&$e(r,"user-mismatch"),s}}async function pf(n,e,t=!1){if(rt(n.app))return Promise.reject(Lt(n));let r="signIn",i=await ff(n,r,e),s=await fn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function lc(n,e){return pf(Bt(n),e)}function mf(n,e,t,r){return ue(n).onIdTokenChanged(e,t,r)}function gf(n,e,t){return ue(n).beforeAuthStateChanged(e,t)}function hc(n,e,t,r){return ue(n).onAuthStateChanged(e,t,r)}function dc(n){return ue(n).signOut()}function S_(n,e){return De(n,"POST","/v2/accounts/mfaEnrollment:start",Ee(n,e))}function R_(n,e){return De(n,"POST","/v2/accounts/mfaEnrollment:finalize",Ee(n,e))}function P_(n,e){return De(n,"POST","/v2/accounts/mfaEnrollment:start",Ee(n,e))}function k_(n,e){return De(n,"POST","/v2/accounts/mfaEnrollment:finalize",Ee(n,e))}var ms="__sak";var gs=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ms,"1"),this.storage.removeItem(ms),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function C_(){let n=Ie();return cc(n)||Cs(n)}var x_=1e3,D_=10,ys=class extends gs{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=C_()&&e_(),this.fallbackToPolling=af(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,h)=>{this.notifyListeners(a,h)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let a=this.storage.getItem(r);if(e.newValue!==a)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Zy()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,D_):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},x_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ys.type="LOCAL";var yf=ys;var _s=class extends gs{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};_s.type="SESSION";var fc=_s;function N_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var vs=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(a).map(async f=>f(t.origin,s)),h=await N_(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};vs.receivers=[];function pc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var $a=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,h)=>{let f=pc("",20);i.port1.start();let p=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(y){let _=y;if(_.data.eventId===f)switch(_.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(_.data.response);break;default:clearTimeout(p),clearTimeout(s),h(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function ut(){return window}function O_(n){ut().location.href=n}function _f(){return typeof ut().WorkerGlobalScope!="undefined"&&typeof ut().importScripts=="function"}async function V_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function M_(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function L_(){return _f()?self:null}var vf="firebaseLocalStorageDb",F_=1,ws="firebaseLocalStorage",wf="fbase_key",pn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Ns(n,e){return n.transaction([ws],e?"readwrite":"readonly").objectStore(ws)}function U_(){let n=indexedDB.deleteDatabase(vf);return new pn(n).toPromise()}function Xa(){let n=indexedDB.open(vf,F_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(ws,{keyPath:wf})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(ws)?e(r):(r.close(),await U_(),e(await Xa()))})})}async function Ld(n,e,t){let r=Ns(n,!0).put({[wf]:e,value:t});return new pn(r).toPromise()}async function B_(n,e){let t=Ns(n,!1).get(e),r=await new pn(t).toPromise();return r===void 0?null:r.value}function Fd(n,e){let t=Ns(n,!0).delete(e);return new pn(t).toPromise()}var q_=800,j_=3,Is=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Xa(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>j_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _f()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=vs._getInstance(L_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await V_(),!this.activeServiceWorker)return;this.sender=new $a(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||M_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Xa();return await Ld(e,ms,"1"),await Fd(e,ms),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ld(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>B_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Fd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Ns(i,!1).getAll();return new pn(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),q_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Is.type="LOCAL";var If=Is;function z_(n,e){return De(n,"POST","/v2/accounts/mfaSignIn:start",Ee(n,e))}function G_(n,e){return De(n,"POST","/v2/accounts/mfaSignIn:finalize",Ee(n,e))}function K_(n,e){return De(n,"POST","/v2/accounts/mfaSignIn:finalize",Ee(n,e))}var Vb=lf("rcb"),Mb=new un(3e4,6e4);var W_="recaptcha";async function H_(n,e,t){var r;let i=await t.verify();try{F(typeof i=="string",n,"argument-error"),F(t.type===W_,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let a=s.session;if("phoneNumber"in s)return F(a.type==="enroll",n,"internal-error"),(await S_(n,{idToken:a.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{F(a.type==="signin",n,"internal-error");let c=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return F(c,n,"missing-multi-factor-info"),(await z_(n,{mfaPendingCredential:a.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:a}=await g_(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return a}}finally{t._reset()}}var $r=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Bt(e)}verifyPhoneNumber(e,t){return H_(this.auth,e,ue(t))}static credential(e,t){return Wr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Wr._fromTokenResponse(t,r):null}};$r.PROVIDER_ID="phone";$r.PHONE_SIGN_IN_METHOD="phone";function Ef(n,e){return e?Et(e):(F(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Xr=class extends ln{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Bn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Bn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Bn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Q_(n){return pf(n.auth,new Xr(n),n.bypassAuthState)}function Y_(n){let{auth:e,user:t}=n;return F(t,e,"internal-error"),A_(t,new Xr(n),n.bypassAuthState)}async function J_(n){let{auth:e,user:t}=n;return F(t,e,"internal-error"),T_(t,new Xr(n),n.bypassAuthState)}var Es=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}let h={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Q_;case"linkViaPopup":case"linkViaRedirect":return J_;case"reauthViaPopup":case"reauthViaRedirect":return Y_;default:$e(this.auth,"internal-error")}}resolve(e){bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var $_=new un(2e3,1e4);async function mc(n,e,t){if(rt(n.app))return Promise.reject(it(n,"operation-not-supported-in-this-environment"));let r=Bt(n);Uy(n,e,Hr);let i=Ef(r,t);return new bs(r,"signInViaPopup",e,i).executeNotNull()}var bs=class n extends Es{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){bt(this.filter.length===1,"Popup operations only handle one event");let e=pc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(it(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(it(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(it(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,$_.get())};e()}};bs.currentPopupAction=null;var X_="pendingRedirect",os=new Map,Za=class extends Es{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=os.get(this.auth._key());if(!e){try{let r=await Z_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}os.set(this.auth._key(),e)}return this.bypassAuthState||os.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Z_(n,e){let t=nv(e),r=tv(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function ev(n,e){os.set(n._key(),e)}function tv(n){return Et(n._redirectPersistence)}function nv(n){return ss(X_,n.config.apiKey,n.name)}async function rv(n,e,t=!1){if(rt(n.app))return Promise.reject(Lt(n));let r=Bt(n),i=Ef(r,e),a=await new Za(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var iv=10*60*1e3,ec=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!sv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!bf(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(it(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=iv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ud(e))}saveEventToCache(e){this.cachedEventUids.add(Ud(e)),this.lastProcessedEventTime=Date.now()}};function Ud(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function bf({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function sv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return bf(n);default:return!1}}async function ov(n,e={}){return De(n,"GET","/v1/projects",e)}var av=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,cv=/^https?/;async function uv(n){if(n.config.emulator)return;let{authorizedDomains:e}=await ov(n);for(let t of e)try{if(lv(t))return}catch{}$e(n,"unauthorized-domain")}function lv(n){let e=qa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!cv.test(t))return!1;if(av.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var hv=new un(3e4,6e4);function Bd(){let n=ut().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function dv(n){return new Promise((e,t)=>{var r,i,s;function a(){Bd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Bd(),t(it(n,"network-request-failed"))},timeout:hv.get()})}if(!((i=(r=ut().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=ut().gapi)===null||s===void 0)&&s.load)a();else{let c=lf("iframefcb");return ut()[c]=()=>{gapi.load?a():t(it(n,"network-request-failed"))},uf(`${s_()}?onload=${c}`).catch(h=>t(h))}}).catch(e=>{throw as=null,e})}var as=null;function fv(n){return as=as||dv(n),as}var pv=new un(5e3,15e3),mv="__/auth/iframe",gv="emulator/auth/iframe",yv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},_v=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vv(n){let e=n.config;F(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?oc(e,gv):`https://${n.config.authDomain}/${mv}`,r={apiKey:e.apiKey,appName:n.name,v:Vt},i=_v.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ln(r).slice(1)}`}async function wv(n){let e=await fv(n),t=ut().gapi;return F(t,n,"internal-error"),e.open({where:document.body,url:vv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:yv,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=it(n,"network-request-failed"),c=ut().setTimeout(()=>{s(a)},pv.get());function h(){ut().clearTimeout(c),i(r)}r.ping(h).then(h,()=>{s(a)})}))}var Iv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ev=500,bv=600,Tv="_blank",Av="http://localhost",Ts=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Sv(n,e,t,r=Ev,i=bv){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",h=Object.assign(Object.assign({},Iv),{width:r.toString(),height:i.toString(),top:s,left:a}),f=Ie().toLowerCase();t&&(c=tf(f)?Tv:t),ef(f)&&(e=e||Av,h.scrollbars="yes");let p=Object.entries(h).reduce((_,[S,C])=>`${_}${S}=${C},`,"");if(Xy(f)&&c!=="_self")return Rv(e||"",c),new Ts(null);let y=window.open(e||"",c,p);F(y,n,"popup-blocked");try{y.focus()}catch{}return new Ts(y)}function Rv(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var Pv="__/auth/handler",kv="emulator/auth/handler",Cv=encodeURIComponent("fac");async function qd(n,e,t,r,i,s){F(n.config.authDomain,n,"auth-domain-config-required"),F(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Vt,eventId:i};if(e instanceof Hr){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",dd(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[p,y]of Object.entries(s||{}))a[p]=y}if(e instanceof dn){let p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);let c=a;for(let p of Object.keys(c))c[p]===void 0&&delete c[p];let h=await n._getAppCheckToken(),f=h?`#${Cv}=${encodeURIComponent(h)}`:"";return`${xv(n)}?${Ln(c).slice(1)}${f}`}function xv({config:n}){return n.emulator?oc(n,kv):`https://${n.authDomain}/${Pv}`}var Ba="webStorageSupport",tc=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=fc,this._completeRedirectFn=rv,this._overrideRedirectResult=ev}async _openPopup(e,t,r,i){var s;bt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await qd(e,t,r,qa(),i);return Sv(e,a,pc())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await qd(e,t,r,qa(),i);return O_(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(bt(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await wv(e),r=new ec(e);return t.register("authEvent",i=>(F(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ba,{type:Ba},i=>{var s;let a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Ba];a!==void 0&&t(!!a),$e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=uv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return af()||cc()||Cs()}},Tf=tc,As=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return ct("unexpected MultiFactorSessionType")}}},nc=class n extends As{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return R_(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return G_(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Ss=class{constructor(){}static assertion(e){return nc._fromCredential(e)}};Ss.FACTOR_ID="phone";var Rs=class{static assertionForEnrollment(e,t){return Ps._fromSecret(e,t)}static assertionForSignIn(e,t){return Ps._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;F(typeof((t=r.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await P_(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return ks._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};Rs.FACTOR_ID="totp";var Ps=class n extends As{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return F(typeof this.secret!="undefined",e,"argument-error"),k_(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){F(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return K_(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ks=class n{constructor(e,t,r,i,s,a,c){this.sessionInfo=a,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(rs(e)||rs(t))&&(i=!0),i&&(rs(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),rs(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function rs(n){return typeof n=="undefined"||(n==null?void 0:n.length)===0}var jd="@firebase/auth",zd="1.7.4";var rc=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Dv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Nv(n){Ot(new Je("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;F(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let h={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cf(n)},f=new Qa(r,i,s,h);return c_(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ot(new Je("auth-internal",e=>{let t=Bt(e.getProvider("auth").getImmediate());return(r=>new rc(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),nt(jd,zd,Dv(n)),nt(jd,zd,"esm2017")}var Ov=5*60,Vv=Ea("authIdTokenMaxAge")||Ov,Gd=null,Mv=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Vv)return;let i=t==null?void 0:t.token;Gd!==i&&(Gd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function gc(n=ts()){let e=Ur(n,"auth");if(e.isInitialized())return e.getImmediate();let t=hf(n,{popupRedirectResolver:Tf,persistence:[If,yf,fc]}),r=Ea("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let a=Mv(s.toString());gf(t,a,()=>a(t.currentUser)),mf(t,c=>a(c))}}let i=wa("auth");return i&&Ds(t,`http://${i}`),t}function Lv(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}r_({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=it("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Lv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Nv("Browser");var Af=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Sf={};var qt,yc;(function(){var n;function e(E,g){function w(){}w.prototype=g.prototype,E.D=g.prototype,E.prototype=new w,E.prototype.constructor=E,E.C=function(I,b,A){for(var v=Array(arguments.length-2),yt=2;yt<arguments.length;yt++)v[yt-2]=arguments[yt];return g.prototype[b].apply(I,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,g,w){w||(w=0);var I=Array(16);if(typeof g=="string")for(var b=0;16>b;++b)I[b]=g.charCodeAt(w++)|g.charCodeAt(w++)<<8|g.charCodeAt(w++)<<16|g.charCodeAt(w++)<<24;else for(b=0;16>b;++b)I[b]=g[w++]|g[w++]<<8|g[w++]<<16|g[w++]<<24;g=E.g[0],w=E.g[1],b=E.g[2];var A=E.g[3],v=g+(A^w&(b^A))+I[0]+3614090360&4294967295;g=w+(v<<7&4294967295|v>>>25),v=A+(b^g&(w^b))+I[1]+3905402710&4294967295,A=g+(v<<12&4294967295|v>>>20),v=b+(w^A&(g^w))+I[2]+606105819&4294967295,b=A+(v<<17&4294967295|v>>>15),v=w+(g^b&(A^g))+I[3]+3250441966&4294967295,w=b+(v<<22&4294967295|v>>>10),v=g+(A^w&(b^A))+I[4]+4118548399&4294967295,g=w+(v<<7&4294967295|v>>>25),v=A+(b^g&(w^b))+I[5]+1200080426&4294967295,A=g+(v<<12&4294967295|v>>>20),v=b+(w^A&(g^w))+I[6]+2821735955&4294967295,b=A+(v<<17&4294967295|v>>>15),v=w+(g^b&(A^g))+I[7]+4249261313&4294967295,w=b+(v<<22&4294967295|v>>>10),v=g+(A^w&(b^A))+I[8]+1770035416&4294967295,g=w+(v<<7&4294967295|v>>>25),v=A+(b^g&(w^b))+I[9]+2336552879&4294967295,A=g+(v<<12&4294967295|v>>>20),v=b+(w^A&(g^w))+I[10]+4294925233&4294967295,b=A+(v<<17&4294967295|v>>>15),v=w+(g^b&(A^g))+I[11]+2304563134&4294967295,w=b+(v<<22&4294967295|v>>>10),v=g+(A^w&(b^A))+I[12]+1804603682&4294967295,g=w+(v<<7&4294967295|v>>>25),v=A+(b^g&(w^b))+I[13]+4254626195&4294967295,A=g+(v<<12&4294967295|v>>>20),v=b+(w^A&(g^w))+I[14]+2792965006&4294967295,b=A+(v<<17&4294967295|v>>>15),v=w+(g^b&(A^g))+I[15]+1236535329&4294967295,w=b+(v<<22&4294967295|v>>>10),v=g+(b^A&(w^b))+I[1]+4129170786&4294967295,g=w+(v<<5&4294967295|v>>>27),v=A+(w^b&(g^w))+I[6]+3225465664&4294967295,A=g+(v<<9&4294967295|v>>>23),v=b+(g^w&(A^g))+I[11]+643717713&4294967295,b=A+(v<<14&4294967295|v>>>18),v=w+(A^g&(b^A))+I[0]+3921069994&4294967295,w=b+(v<<20&4294967295|v>>>12),v=g+(b^A&(w^b))+I[5]+3593408605&4294967295,g=w+(v<<5&4294967295|v>>>27),v=A+(w^b&(g^w))+I[10]+38016083&4294967295,A=g+(v<<9&4294967295|v>>>23),v=b+(g^w&(A^g))+I[15]+3634488961&4294967295,b=A+(v<<14&4294967295|v>>>18),v=w+(A^g&(b^A))+I[4]+3889429448&4294967295,w=b+(v<<20&4294967295|v>>>12),v=g+(b^A&(w^b))+I[9]+568446438&4294967295,g=w+(v<<5&4294967295|v>>>27),v=A+(w^b&(g^w))+I[14]+3275163606&4294967295,A=g+(v<<9&4294967295|v>>>23),v=b+(g^w&(A^g))+I[3]+4107603335&4294967295,b=A+(v<<14&4294967295|v>>>18),v=w+(A^g&(b^A))+I[8]+1163531501&4294967295,w=b+(v<<20&4294967295|v>>>12),v=g+(b^A&(w^b))+I[13]+2850285829&4294967295,g=w+(v<<5&4294967295|v>>>27),v=A+(w^b&(g^w))+I[2]+4243563512&4294967295,A=g+(v<<9&4294967295|v>>>23),v=b+(g^w&(A^g))+I[7]+1735328473&4294967295,b=A+(v<<14&4294967295|v>>>18),v=w+(A^g&(b^A))+I[12]+2368359562&4294967295,w=b+(v<<20&4294967295|v>>>12),v=g+(w^b^A)+I[5]+4294588738&4294967295,g=w+(v<<4&4294967295|v>>>28),v=A+(g^w^b)+I[8]+2272392833&4294967295,A=g+(v<<11&4294967295|v>>>21),v=b+(A^g^w)+I[11]+1839030562&4294967295,b=A+(v<<16&4294967295|v>>>16),v=w+(b^A^g)+I[14]+4259657740&4294967295,w=b+(v<<23&4294967295|v>>>9),v=g+(w^b^A)+I[1]+2763975236&4294967295,g=w+(v<<4&4294967295|v>>>28),v=A+(g^w^b)+I[4]+1272893353&4294967295,A=g+(v<<11&4294967295|v>>>21),v=b+(A^g^w)+I[7]+4139469664&4294967295,b=A+(v<<16&4294967295|v>>>16),v=w+(b^A^g)+I[10]+3200236656&4294967295,w=b+(v<<23&4294967295|v>>>9),v=g+(w^b^A)+I[13]+681279174&4294967295,g=w+(v<<4&4294967295|v>>>28),v=A+(g^w^b)+I[0]+3936430074&4294967295,A=g+(v<<11&4294967295|v>>>21),v=b+(A^g^w)+I[3]+3572445317&4294967295,b=A+(v<<16&4294967295|v>>>16),v=w+(b^A^g)+I[6]+76029189&4294967295,w=b+(v<<23&4294967295|v>>>9),v=g+(w^b^A)+I[9]+3654602809&4294967295,g=w+(v<<4&4294967295|v>>>28),v=A+(g^w^b)+I[12]+3873151461&4294967295,A=g+(v<<11&4294967295|v>>>21),v=b+(A^g^w)+I[15]+530742520&4294967295,b=A+(v<<16&4294967295|v>>>16),v=w+(b^A^g)+I[2]+3299628645&4294967295,w=b+(v<<23&4294967295|v>>>9),v=g+(b^(w|~A))+I[0]+4096336452&4294967295,g=w+(v<<6&4294967295|v>>>26),v=A+(w^(g|~b))+I[7]+1126891415&4294967295,A=g+(v<<10&4294967295|v>>>22),v=b+(g^(A|~w))+I[14]+2878612391&4294967295,b=A+(v<<15&4294967295|v>>>17),v=w+(A^(b|~g))+I[5]+4237533241&4294967295,w=b+(v<<21&4294967295|v>>>11),v=g+(b^(w|~A))+I[12]+1700485571&4294967295,g=w+(v<<6&4294967295|v>>>26),v=A+(w^(g|~b))+I[3]+2399980690&4294967295,A=g+(v<<10&4294967295|v>>>22),v=b+(g^(A|~w))+I[10]+4293915773&4294967295,b=A+(v<<15&4294967295|v>>>17),v=w+(A^(b|~g))+I[1]+2240044497&4294967295,w=b+(v<<21&4294967295|v>>>11),v=g+(b^(w|~A))+I[8]+1873313359&4294967295,g=w+(v<<6&4294967295|v>>>26),v=A+(w^(g|~b))+I[15]+4264355552&4294967295,A=g+(v<<10&4294967295|v>>>22),v=b+(g^(A|~w))+I[6]+2734768916&4294967295,b=A+(v<<15&4294967295|v>>>17),v=w+(A^(b|~g))+I[13]+1309151649&4294967295,w=b+(v<<21&4294967295|v>>>11),v=g+(b^(w|~A))+I[4]+4149444226&4294967295,g=w+(v<<6&4294967295|v>>>26),v=A+(w^(g|~b))+I[11]+3174756917&4294967295,A=g+(v<<10&4294967295|v>>>22),v=b+(g^(A|~w))+I[2]+718787259&4294967295,b=A+(v<<15&4294967295|v>>>17),v=w+(A^(b|~g))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(b+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+b&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,g){g===void 0&&(g=E.length);for(var w=g-this.blockSize,I=this.B,b=this.h,A=0;A<g;){if(b==0)for(;A<=w;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<g;)if(I[b++]=E.charCodeAt(A++),b==this.blockSize){i(this,I),b=0;break}}else for(;A<g;)if(I[b++]=E[A++],b==this.blockSize){i(this,I),b=0;break}}this.h=b,this.o+=g},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;var w=8*this.o;for(g=E.length-8;g<E.length;++g)E[g]=w&255,w/=256;for(this.u(E),E=Array(16),g=w=0;4>g;++g)for(var I=0;32>I;I+=8)E[w++]=this.g[g]>>>I&255;return E};function s(E,g){var w=c;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=g(E)}function a(E,g){this.h=g;for(var w=[],I=!0,b=E.length-1;0<=b;b--){var A=E[b]|0;I&&A==g||(w[b]=A,I=!1)}this.g=w}var c={};function h(E){return-128<=E&&128>E?s(E,function(g){return new a([g|0],0>g?-1:0)}):new a([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return y;if(0>E)return x(f(-E));for(var g=[],w=1,I=0;E>=w;I++)g[I]=E/w|0,w*=4294967296;return new a(g,0)}function p(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return x(p(E.substring(1),g));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=f(Math.pow(g,8)),I=y,b=0;b<E.length;b+=8){var A=Math.min(8,E.length-b),v=parseInt(E.substring(b,b+A),g);8>A?(A=f(Math.pow(g,A)),I=I.j(A).add(f(v))):(I=I.j(w),I=I.add(f(v)))}return I}var y=h(0),_=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-x(this).m();for(var E=0,g=1,w=0;w<this.g.length;w++){var I=this.i(w);E+=(0<=I?I:4294967296+I)*g,g*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(O(this))return"-"+x(this).toString(E);for(var g=f(Math.pow(E,6)),w=this,I="";;){var b=re(w,g).g;w=z(w,b.j(g));var A=((0<w.g.length?w.g[0]:w.h)>>>0).toString(E);if(w=b,C(w))return A+I;for(;6>A.length;)A="0"+A;I=A+I}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(var g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function O(E){return E.h==-1}n.l=function(E){return E=z(this,E),O(E)?-1:C(E)?0:1};function x(E){for(var g=E.g.length,w=[],I=0;I<g;I++)w[I]=~E.g[I];return new a(w,~E.h).add(_)}n.abs=function(){return O(this)?x(this):this},n.add=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0,b=0;b<=g;b++){var A=I+(this.i(b)&65535)+(E.i(b)&65535),v=(A>>>16)+(this.i(b)>>>16)+(E.i(b)>>>16);I=v>>>16,A&=65535,v&=65535,w[b]=v<<16|A}return new a(w,w[w.length-1]&-2147483648?-1:0)};function z(E,g){return E.add(x(g))}n.j=function(E){if(C(this)||C(E))return y;if(O(this))return O(E)?x(this).j(x(E)):x(x(this).j(E));if(O(E))return x(this.j(x(E)));if(0>this.l(S)&&0>E.l(S))return f(this.m()*E.m());for(var g=this.g.length+E.g.length,w=[],I=0;I<2*g;I++)w[I]=0;for(I=0;I<this.g.length;I++)for(var b=0;b<E.g.length;b++){var A=this.i(I)>>>16,v=this.i(I)&65535,yt=E.i(b)>>>16,_r=E.i(b)&65535;w[2*I+2*b]+=v*_r,W(w,2*I+2*b),w[2*I+2*b+1]+=A*_r,W(w,2*I+2*b+1),w[2*I+2*b+1]+=v*yt,W(w,2*I+2*b+1),w[2*I+2*b+2]+=A*yt,W(w,2*I+2*b+2)}for(I=0;I<g;I++)w[I]=w[2*I+1]<<16|w[2*I];for(I=g;I<2*g;I++)w[I]=0;return new a(w,0)};function W(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function K(E,g){this.g=E,this.h=g}function re(E,g){if(C(g))throw Error("division by zero");if(C(E))return new K(y,y);if(O(E))return g=re(x(E),g),new K(x(g.g),x(g.h));if(O(g))return g=re(E,x(g)),new K(x(g.g),g.h);if(30<E.g.length){if(O(E)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var w=_,I=g;0>=I.l(E);)w=Te(w),I=Te(I);var b=Z(w,1),A=Z(I,1);for(I=Z(I,2),w=Z(w,2);!C(I);){var v=A.add(I);0>=v.l(E)&&(b=b.add(w),A=v),I=Z(I,1),w=Z(w,1)}return g=z(E,b.j(g)),new K(b,g)}for(b=y;0<=E.l(g);){for(w=Math.max(1,Math.floor(E.m()/g.m())),I=Math.ceil(Math.log(w)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),A=f(w),v=A.j(g);O(v)||0<v.l(E);)w-=I,A=f(w),v=A.j(g);C(A)&&(A=_),b=b.add(A),E=z(E,v)}return new K(b,E)}n.A=function(E){return re(this,E).h},n.and=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0;I<g;I++)w[I]=this.i(I)&E.i(I);return new a(w,this.h&E.h)},n.or=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0;I<g;I++)w[I]=this.i(I)|E.i(I);return new a(w,this.h|E.h)},n.xor=function(E){for(var g=Math.max(this.g.length,E.g.length),w=[],I=0;I<g;I++)w[I]=this.i(I)^E.i(I);return new a(w,this.h^E.h)};function Te(E){for(var g=E.g.length+1,w=[],I=0;I<g;I++)w[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(w,E.h)}function Z(E,g){var w=g>>5;g%=32;for(var I=E.g.length-w,b=[],A=0;A<I;A++)b[A]=0<g?E.i(A+w)>>>g|E.i(A+w+1)<<32-g:E.i(A+w);return new a(b,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,yc=Sf.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,qt=Sf.Integer=a}).apply(typeof Af!="undefined"?Af:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Os=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Tt={};var _c,vc,zn,wc,Zr,Vs,Ic,Ec,bc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Os=="object"&&Os];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(o,l){if(l)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var T=o[m];if(!(T in d))break e;d=d[T]}o=o[o.length-1],m=d[o],l=l(m),l!=m&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}function s(o,l){o instanceof String&&(o+="");var d=0,m=!1,T={next:function(){if(!m&&d<o.length){var R=d++;return{value:l(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(o){return o||function(){return s(this,function(l,d){return d})}});var a=a||{},c=this||self;function h(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function f(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function p(o,l,d){return o.call.apply(o.bind,arguments)}function y(o,l,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,m),o.apply(l,T)}}return function(){return o.apply(l,arguments)}}function _(o,l,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,_.apply(null,arguments)}function S(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function C(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,T,R){for(var N=Array(arguments.length-2),oe=2;oe<arguments.length;oe++)N[oe-2]=arguments[oe];return l.prototype[T].apply(m,N)}}function O(o){let l=o.length;if(0<l){let d=Array(l);for(let m=0;m<l;m++)d[m]=o[m];return d}return[]}function x(o,l){for(let d=1;d<arguments.length;d++){let m=arguments[d];if(h(m)){let T=o.length||0,R=m.length||0;o.length=T+R;for(let N=0;N<R;N++)o[T+N]=m[N]}else o.push(m)}}class z{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function W(o){return/^[\s\xa0]*$/.test(o)}function K(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function re(o){return re[" "](o),o}re[" "]=function(){};var Te=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function Z(o,l,d){for(let m in o)l.call(d,o[m],m,o)}function E(o,l){for(let d in o)l.call(void 0,o[d],d,o)}function g(o){let l={};for(let d in o)l[d]=o[d];return l}let w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,l){let d,m;for(let T=1;T<arguments.length;T++){m=arguments[T];for(d in m)o[d]=m[d];for(let R=0;R<w.length;R++)d=w[R],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function b(o){var l=1;o=o.split(":");let d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function A(o){c.setTimeout(()=>{throw o},0)}function v(){var o=Ko;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class yt{constructor(){this.h=this.g=null}add(l,d){let m=_r.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var _r=new z(()=>new Wm,o=>o.reset());class Wm{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let vr,wr=!1,Ko=new yt,eh=()=>{let o=c.Promise.resolve(void 0);vr=()=>{o.then(Hm)}};var Hm=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(d){A(d)}var l=_r;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}wr=!1};function Pt(){this.s=this.s,this.C=this.C}Pt.prototype.s=!1,Pt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Pt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Pe(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}Pe.prototype.h=function(){this.defaultPrevented=!0};var Qm=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return o}();function Ir(o,l){if(Pe.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(Te){e:{try{re(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Ym[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Ir.aa.h.call(this)}}C(Ir,Pe);var Ym={2:"touch",3:"pen",4:"mouse"};Ir.prototype.h=function(){Ir.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Er="closure_listenable_"+(1e6*Math.random()|0),Jm=0;function $m(o,l,d,m,T){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=T,this.key=++Jm,this.da=this.fa=!1}function Ni(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Oi(o){this.src=o,this.g={},this.h=0}Oi.prototype.add=function(o,l,d,m,T){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var N=Ho(o,l,m,T);return-1<N?(l=o[N],d||(l.fa=!1)):(l=new $m(l,this.src,R,!!m,T),l.fa=d,o.push(l)),l};function Wo(o,l){var d=l.type;if(d in o.g){var m=o.g[d],T=Array.prototype.indexOf.call(m,l,void 0),R;(R=0<=T)&&Array.prototype.splice.call(m,T,1),R&&(Ni(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Ho(o,l,d,m){for(var T=0;T<o.length;++T){var R=o[T];if(!R.da&&R.listener==l&&R.capture==!!d&&R.ha==m)return T}return-1}var Qo="closure_lm_"+(1e6*Math.random()|0),Yo={};function th(o,l,d,m,T){if(m&&m.once)return rh(o,l,d,m,T);if(Array.isArray(l)){for(var R=0;R<l.length;R++)th(o,l[R],d,m,T);return null}return d=Zo(d),o&&o[Er]?o.K(l,d,f(m)?!!m.capture:!!m,T):nh(o,l,d,!1,m,T)}function nh(o,l,d,m,T,R){if(!l)throw Error("Invalid event type");var N=f(T)?!!T.capture:!!T,oe=$o(o);if(oe||(o[Qo]=oe=new Oi(o)),d=oe.add(l,d,m,N,R),d.proxy)return d;if(m=Xm(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)Qm||(T=N),T===void 0&&(T=!1),o.addEventListener(l.toString(),m,T);else if(o.attachEvent)o.attachEvent(sh(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Xm(){function o(d){return l.call(o.src,o.listener,d)}let l=Zm;return o}function rh(o,l,d,m,T){if(Array.isArray(l)){for(var R=0;R<l.length;R++)rh(o,l[R],d,m,T);return null}return d=Zo(d),o&&o[Er]?o.L(l,d,f(m)?!!m.capture:!!m,T):nh(o,l,d,!0,m,T)}function ih(o,l,d,m,T){if(Array.isArray(l))for(var R=0;R<l.length;R++)ih(o,l[R],d,m,T);else m=f(m)?!!m.capture:!!m,d=Zo(d),o&&o[Er]?(o=o.i,l=String(l).toString(),l in o.g&&(R=o.g[l],d=Ho(R,d,m,T),-1<d&&(Ni(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[l],o.h--)))):o&&(o=$o(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Ho(l,d,m,T)),(d=-1<o?l[o]:null)&&Jo(d))}function Jo(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Er])Wo(l.i,o);else{var d=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(d,m,o.capture):l.detachEvent?l.detachEvent(sh(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=$o(l))?(Wo(d,o),d.h==0&&(d.src=null,l[Qo]=null)):Ni(o)}}}function sh(o){return o in Yo?Yo[o]:Yo[o]="on"+o}function Zm(o,l){if(o.da)o=!0;else{l=new Ir(l,this);var d=o.listener,m=o.ha||o.src;o.fa&&Jo(o),o=d.call(m,l)}return o}function $o(o){return o=o[Qo],o instanceof Oi?o:null}var Xo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Zo(o){return typeof o=="function"?o:(o[Xo]||(o[Xo]=function(l){return o.handleEvent(l)}),o[Xo])}function ke(){Pt.call(this),this.i=new Oi(this),this.M=this,this.F=null}C(ke,Pt),ke.prototype[Er]=!0,ke.prototype.removeEventListener=function(o,l,d,m){ih(this,o,l,d,m)};function Le(o,l){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new Pe(l,o);else if(l instanceof Pe)l.target=l.target||o;else{var T=l;l=new Pe(m,o),I(l,T)}if(T=!0,d)for(var R=d.length-1;0<=R;R--){var N=l.g=d[R];T=Vi(N,m,!0,l)&&T}if(N=l.g=o,T=Vi(N,m,!0,l)&&T,T=Vi(N,m,!1,l)&&T,d)for(R=0;R<d.length;R++)N=l.g=d[R],T=Vi(N,m,!1,l)&&T}ke.prototype.N=function(){if(ke.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],m=0;m<d.length;m++)Ni(d[m]);delete o.g[l],o.h--}}this.F=null},ke.prototype.K=function(o,l,d,m){return this.i.add(String(o),l,!1,d,m)},ke.prototype.L=function(o,l,d,m){return this.i.add(String(o),l,!0,d,m)};function Vi(o,l,d,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,R=0;R<l.length;++R){var N=l[R];if(N&&!N.da&&N.capture==d){var oe=N.listener,Re=N.ha||N.src;N.fa&&Wo(o.i,N),T=oe.call(Re,m)!==!1&&T}}return T&&!m.defaultPrevented}function oh(o,l,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function ah(o){o.g=oh(()=>{o.g=null,o.i&&(o.i=!1,ah(o))},o.l);let l=o.h;o.h=null,o.m.apply(null,l)}class eg extends Pt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ah(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function br(o){Pt.call(this),this.h=o,this.g={}}C(br,Pt);var ch=[];function uh(o){Z(o.g,function(l,d){this.g.hasOwnProperty(d)&&Jo(l)},o),o.g={}}br.prototype.N=function(){br.aa.N.call(this),uh(this)},br.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ea=c.JSON.stringify,tg=c.JSON.parse,ng=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function ta(){}ta.prototype.h=null;function lh(o){return o.h||(o.h=o.i())}function hh(){}var Tr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function na(){Pe.call(this,"d")}C(na,Pe);function ra(){Pe.call(this,"c")}C(ra,Pe);var nn={},dh=null;function Mi(){return dh=dh||new ke}nn.La="serverreachability";function fh(o){Pe.call(this,nn.La,o)}C(fh,Pe);function Ar(o){let l=Mi();Le(l,new fh(l))}nn.STAT_EVENT="statevent";function ph(o,l){Pe.call(this,nn.STAT_EVENT,o),this.stat=l}C(ph,Pe);function Fe(o){let l=Mi();Le(l,new ph(l,o))}nn.Ma="timingevent";function mh(o,l){Pe.call(this,nn.Ma,o),this.size=l}C(mh,Pe);function Sr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function Rr(){this.g=!0}Rr.prototype.xa=function(){this.g=!1};function rg(o,l,d,m,T,R){o.info(function(){if(o.g)if(R)for(var N="",oe=R.split("&"),Re=0;Re<oe.length;Re++){var te=oe[Re].split("=");if(1<te.length){var Ce=te[0];te=te[1];var xe=Ce.split("_");N=2<=xe.length&&xe[1]=="type"?N+(Ce+"="+te+"&"):N+(Ce+"=redacted&")}}else N=null;else N=R;return"XMLHTTP REQ ("+m+") [attempt "+T+"]: "+l+`
`+d+`
`+N})}function ig(o,l,d,m,T,R,N){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+T+"]: "+l+`
`+d+`
`+R+" "+N})}function Nn(o,l,d,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+og(o,d)+(m?" "+m:"")})}function sg(o,l){o.info(function(){return"TIMEOUT: "+l})}Rr.prototype.info=function(){};function og(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var T=m[1];if(Array.isArray(T)&&!(1>T.length)){var R=T[0];if(R!="noop"&&R!="stop"&&R!="close")for(var N=1;N<T.length;N++)T[N]=""}}}}return ea(d)}catch{return l}}var Li={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},gh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ia;function Fi(){}C(Fi,ta),Fi.prototype.g=function(){return new XMLHttpRequest},Fi.prototype.i=function(){return{}},ia=new Fi;function kt(o,l,d,m){this.j=o,this.i=l,this.l=d,this.R=m||1,this.U=new br(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new yh}function yh(){this.i=null,this.g="",this.h=!1}var _h={},sa={};function oa(o,l,d){o.L=1,o.v=ji(_t(l)),o.m=d,o.P=!0,vh(o,null)}function vh(o,l){o.F=Date.now(),Ui(o),o.A=_t(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),Nh(d.i,"t",m),o.C=0,d=o.j.J,o.h=new yh,o.g=$h(o.j,d?l:null,!o.m),0<o.O&&(o.M=new eg(_(o.Y,o,o.g),o.O)),l=o.U,d=o.g,m=o.ca;var T="readystatechange";Array.isArray(T)||(T&&(ch[0]=T.toString()),T=ch);for(var R=0;R<T.length;R++){var N=th(d,T[R],m||l.handleEvent,!1,l.h||l);if(!N)break;l.g[N.key]=N}l=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),Ar(),rg(o.i,o.u,o.A,o.l,o.R,o.m)}kt.prototype.ca=function(o){o=o.target;let l=this.M;l&&vt(o)==3?l.j():this.Y(o)},kt.prototype.Y=function(o){try{if(o==this.g)e:{let xe=vt(this.g);var l=this.g.Ba();let Mn=this.g.Z();if(!(3>xe)&&(xe!=3||this.g&&(this.h.h||this.g.oa()||Bh(this.g)))){this.J||xe!=4||l==7||(l==8||0>=Mn?Ar(3):Ar(2)),aa(this);var d=this.g.Z();this.X=d;t:if(wh(this)){var m=Bh(this.g);o="";var T=m.length,R=vt(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){rn(this),Pr(this);var N="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,o+=this.h.i.decode(m[l],{stream:!(R&&l==T-1)});m.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=d==200,ig(this.i,this.u,this.A,this.l,this.R,xe,d),this.o){if(this.T&&!this.K){t:{if(this.g){var oe,Re=this.g;if((oe=Re.g?Re.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!W(oe)){var te=oe;break t}}te=null}if(d=te)Nn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ca(this,d);else{this.o=!1,this.s=3,Fe(12),rn(this),Pr(this);break e}}if(this.P){d=!0;let tt;for(;!this.J&&this.C<N.length;)if(tt=ag(this,N),tt==sa){xe==4&&(this.s=4,Fe(14),d=!1),Nn(this.i,this.l,null,"[Incomplete Response]");break}else if(tt==_h){this.s=4,Fe(15),Nn(this.i,this.l,N,"[Invalid Chunk]"),d=!1;break}else Nn(this.i,this.l,tt,null),ca(this,tt);if(wh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),xe!=4||N.length!=0||this.h.h||(this.s=1,Fe(16),d=!1),this.o=this.o&&d,!d)Nn(this.i,this.l,N,"[Invalid Chunked Response]"),rn(this),Pr(this);else if(0<N.length&&!this.W){this.W=!0;var Ce=this.j;Ce.g==this&&Ce.ba&&!Ce.M&&(Ce.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),pa(Ce),Ce.M=!0,Fe(11))}}else Nn(this.i,this.l,N,null),ca(this,N);xe==4&&rn(this),this.o&&!this.J&&(xe==4?Hh(this.j,this):(this.o=!1,Ui(this)))}else Tg(this.g),d==400&&0<N.indexOf("Unknown SID")?(this.s=3,Fe(12)):(this.s=0,Fe(13)),rn(this),Pr(this)}}}catch{}finally{}};function wh(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function ag(o,l){var d=o.C,m=l.indexOf(`
`,d);return m==-1?sa:(d=Number(l.substring(d,m)),isNaN(d)?_h:(m+=1,m+d>l.length?sa:(l=l.slice(m,m+d),o.C=m+d,l)))}kt.prototype.cancel=function(){this.J=!0,rn(this)};function Ui(o){o.S=Date.now()+o.I,Ih(o,o.I)}function Ih(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Sr(_(o.ba,o),l)}function aa(o){o.B&&(c.clearTimeout(o.B),o.B=null)}kt.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(sg(this.i,this.A),this.L!=2&&(Ar(),Fe(17)),rn(this),this.s=2,Pr(this)):Ih(this,this.S-o)};function Pr(o){o.j.G==0||o.J||Hh(o.j,o)}function rn(o){aa(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,uh(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function ca(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||ua(d.h,o))){if(!o.K&&ua(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var T=m;if(T[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Hi(d),Ki(d);else break e;fa(d),Fe(18)}}else d.za=T[1],0<d.za-d.T&&37500>T[2]&&d.F&&d.v==0&&!d.C&&(d.C=Sr(_(d.Za,d),6e3));if(1>=Th(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else on(d,11)}else if((o.K||d.g==o)&&Hi(d),!W(l))for(T=d.Da.g.parse(l),l=0;l<T.length;l++){let te=T[l];if(d.T=te[0],te=te[1],d.G==2)if(te[0]=="c"){d.K=te[1],d.ia=te[2];let Ce=te[3];Ce!=null&&(d.la=Ce,d.j.info("VER="+d.la));let xe=te[4];xe!=null&&(d.Aa=xe,d.j.info("SVER="+d.Aa));let Mn=te[5];Mn!=null&&typeof Mn=="number"&&0<Mn&&(m=1.5*Mn,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;let tt=o.g;if(tt){let Yi=tt.g?tt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Yi){var R=m.h;R.g||Yi.indexOf("spdy")==-1&&Yi.indexOf("quic")==-1&&Yi.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(la(R,R.h),R.h=null))}if(m.D){let ma=tt.g?tt.g.getResponseHeader("X-HTTP-Session-Id"):null;ma&&(m.ya=ma,ae(m.I,m.D,ma))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var N=o;if(m.qa=Jh(m,m.J?m.ia:null,m.W),N.K){Ah(m.h,N);var oe=N,Re=m.L;Re&&(oe.I=Re),oe.B&&(aa(oe),Ui(oe)),m.g=N}else Kh(m);0<d.i.length&&Wi(d)}else te[0]!="stop"&&te[0]!="close"||on(d,7);else d.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?on(d,7):da(d):te[0]!="noop"&&d.l&&d.l.ta(te),d.v=0)}}Ar(4)}catch{}}var cg=class{constructor(o,l){this.g=o,this.map=l}};function Eh(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function bh(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Th(o){return o.h?1:o.g?o.g.size:0}function ua(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function la(o,l){o.g?o.g.add(l):o.h=l}function Ah(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Eh.prototype.cancel=function(){if(this.i=Sh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Sh(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(let d of o.g.values())l=l.concat(d.D);return l}return O(o.i)}function ug(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map!="undefined"&&o instanceof Map||typeof Set!="undefined"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(h(o)){for(var l=[],d=o.length,m=0;m<d;m++)l.push(o[m]);return l}l=[],d=0;for(m in o)l[d++]=o[m];return l}function lg(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map!="undefined"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set!="undefined"&&o instanceof Set)){if(h(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(let m in o)l[d++]=m;return l}}}function Rh(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(h(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=lg(o),m=ug(o),T=m.length,R=0;R<T;R++)l.call(void 0,m[R],d&&d[R],o)}var Ph=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function hg(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),T=null;if(0<=m){var R=o[d].substring(0,m);T=o[d].substring(m+1)}else R=o[d];l(R,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function sn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof sn){this.h=o.h,Bi(this,o.j),this.o=o.o,this.g=o.g,qi(this,o.s),this.l=o.l;var l=o.i,d=new xr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),kh(this,d),this.m=o.m}else o&&(l=String(o).match(Ph))?(this.h=!1,Bi(this,l[1]||"",!0),this.o=kr(l[2]||""),this.g=kr(l[3]||"",!0),qi(this,l[4]),this.l=kr(l[5]||"",!0),kh(this,l[6]||"",!0),this.m=kr(l[7]||"")):(this.h=!1,this.i=new xr(null,this.h))}sn.prototype.toString=function(){var o=[],l=this.j;l&&o.push(Cr(l,Ch,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Cr(l,Ch,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Cr(d,d.charAt(0)=="/"?pg:fg,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Cr(d,gg)),o.join("")};function _t(o){return new sn(o)}function Bi(o,l,d){o.j=d?kr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function qi(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function kh(o,l,d){l instanceof xr?(o.i=l,yg(o.i,o.h)):(d||(l=Cr(l,mg)),o.i=new xr(l,o.h))}function ae(o,l,d){o.i.set(l,d)}function ji(o){return ae(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function kr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Cr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,dg),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function dg(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ch=/[#\/\?@]/g,fg=/[#\?:]/g,pg=/[#\?]/g,mg=/[#\?@]/g,gg=/#/g;function xr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Ct(o){o.g||(o.g=new Map,o.h=0,o.i&&hg(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=xr.prototype,n.add=function(o,l){Ct(this),this.i=null,o=On(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function xh(o,l){Ct(o),l=On(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Dh(o,l){return Ct(o),l=On(o,l),o.g.has(l)}n.forEach=function(o,l){Ct(this),this.g.forEach(function(d,m){d.forEach(function(T){o.call(l,T,m,this)},this)},this)},n.na=function(){Ct(this);let o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let m=0;m<l.length;m++){let T=o[m];for(let R=0;R<T.length;R++)d.push(l[m])}return d},n.V=function(o){Ct(this);let l=[];if(typeof o=="string")Dh(this,o)&&(l=l.concat(this.g.get(On(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},n.set=function(o,l){return Ct(this),this.i=null,o=On(this,o),Dh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function Nh(o,l,d){xh(o,l),0<d.length&&(o.i=null,o.g.set(On(o,l),O(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var m=l[d];let R=encodeURIComponent(String(m)),N=this.V(m);for(m=0;m<N.length;m++){var T=R;N[m]!==""&&(T+="="+encodeURIComponent(String(N[m]))),o.push(T)}}return this.i=o.join("&")};function On(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function yg(o,l){l&&!o.j&&(Ct(o),o.i=null,o.g.forEach(function(d,m){var T=m.toLowerCase();m!=T&&(xh(this,m),Nh(this,T,d))},o)),o.j=l}function _g(o,l){let d=new Rr;if(c.Image){let m=new Image;m.onload=S(xt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=S(xt,d,"TestLoadImage: error",!1,l,m),m.onabort=S(xt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=S(xt,d,"TestLoadImage: timeout",!1,l,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function vg(o,l){let d=new Rr,m=new AbortController,T=setTimeout(()=>{m.abort(),xt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(T),R.ok?xt(d,"TestPingServer: ok",!0,l):xt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),xt(d,"TestPingServer: error",!1,l)})}function xt(o,l,d,m,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),m(d)}catch{}}function wg(){this.g=new ng}function Ig(o,l,d){let m=d||"";try{Rh(o,function(T,R){let N=T;f(T)&&(N=ea(T)),l.push(m+R+"="+encodeURIComponent(N))})}catch(T){throw l.push(m+"type="+encodeURIComponent("_badmap")),T}}function Dr(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Dr,ta),Dr.prototype.g=function(){return new zi(this.l,this.j)},Dr.prototype.i=function(o){return function(){return o}}({});function zi(o,l){ke.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(zi,ke),n=zi.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Or(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Or(this)),this.g&&(this.readyState=3,Or(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Oh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Oh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Nr(this):Or(this),this.readyState==3&&Oh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Nr(this))},n.Qa=function(o){this.g&&(this.response=o,Nr(this))},n.ga=function(){this.g&&Nr(this)};function Nr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Or(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Or(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(zi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Vh(o){let l="";return Z(o,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function ha(o,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Vh(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ae(o,l,d))}function he(o){ke.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(he,ke);var Eg=/^https?$/i,bg=["POST","PUT"];n=he.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ia.g(),this.v=this.o?lh(this.o):lh(ia),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(R){Mh(this,R);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var T in m)d.set(T,m[T]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(let R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),T=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(bg,l,void 0))||m||T||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[R,N]of d)this.g.setRequestHeader(R,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Uh(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Mh(this,R)}};function Mh(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,Lh(o),Gi(o)}function Lh(o){o.A||(o.A=!0,Le(o,"complete"),Le(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Le(this,"complete"),Le(this,"abort"),Gi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gi(this,!0)),he.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Fh(this):this.bb())},n.bb=function(){Fh(this)};function Fh(o){if(o.h&&typeof a!="undefined"&&(!o.v[1]||vt(o)!=4||o.Z()!=2)){if(o.u&&vt(o)==4)oh(o.Ea,0,o);else if(Le(o,"readystatechange"),vt(o)==4){o.h=!1;try{let N=o.Z();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=N===0){var T=String(o.D).match(Ph)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),m=!Eg.test(T?T.toLowerCase():"")}d=m}if(d)Le(o,"complete"),Le(o,"success");else{o.m=6;try{var R=2<vt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Lh(o)}}finally{Gi(o)}}}}function Gi(o,l){if(o.g){Uh(o);let d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Le(o,"ready");try{d.onreadystatechange=m}catch{}}}function Uh(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function vt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<vt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),tg(l)}};function Bh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Tg(o){let l={};o=(o.g&&2<=vt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(W(o[m]))continue;var d=b(o[m]);let T=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let R=l[T]||[];l[T]=R,R.push(d)}E(l,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function qh(o){this.Aa=0,this.i=[],this.j=new Rr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vr("baseRetryDelayMs",5e3,o),this.cb=Vr("retryDelaySeedMs",1e4,o),this.Wa=Vr("forwardChannelMaxRetries",2,o),this.wa=Vr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Eh(o&&o.concurrentRequestLimit),this.Da=new wg,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=qh.prototype,n.la=8,n.G=1,n.connect=function(o,l,d,m){Fe(0),this.W=o,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Jh(this,null,this.W),Wi(this)};function da(o){if(jh(o),o.G==3){var l=o.U++,d=_t(o.I);if(ae(d,"SID",o.K),ae(d,"RID",l),ae(d,"TYPE","terminate"),Mr(o,d),l=new kt(o,o.j,l),l.L=2,l.v=ji(_t(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=$h(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Ui(l)}Yh(o)}function Ki(o){o.g&&(pa(o),o.g.cancel(),o.g=null)}function jh(o){Ki(o),o.u&&(c.clearTimeout(o.u),o.u=null),Hi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Wi(o){if(!bh(o.h)&&!o.s){o.s=!0;var l=o.Ga;vr||eh(),wr||(vr(),wr=!0),Ko.add(l,o),o.B=0}}function Ag(o,l){return Th(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Sr(_(o.Ga,o,l),Qh(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let T=new kt(this,this.j,o),R=this.o;if(this.S&&(R?(R=g(R),I(R,this.S)):R=this.S),this.m!==null||this.O||(T.H=R,R=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Gh(this,T,l),d=_t(this.I),ae(d,"RID",o),ae(d,"CVER",22),this.D&&ae(d,"X-HTTP-Session-Id",this.D),Mr(this,d),R&&(this.O?l="headers="+encodeURIComponent(String(Vh(R)))+"&"+l:this.m&&ha(d,this.m,R)),la(this.h,T),this.Ua&&ae(d,"TYPE","init"),this.P?(ae(d,"$req",l),ae(d,"SID","null"),T.T=!0,oa(T,d,null)):oa(T,d,l),this.G=2}}else this.G==3&&(o?zh(this,o):this.i.length==0||bh(this.h)||zh(this))};function zh(o,l){var d;l?d=l.l:d=o.U++;let m=_t(o.I);ae(m,"SID",o.K),ae(m,"RID",d),ae(m,"AID",o.T),Mr(o,m),o.m&&o.o&&ha(m,o.m,o.o),d=new kt(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Gh(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),la(o.h,d),oa(d,m,l)}function Mr(o,l){o.H&&Z(o.H,function(d,m){ae(l,m,d)}),o.l&&Rh({},function(d,m){ae(l,m,d)})}function Gh(o,l,d){d=Math.min(o.i.length,d);var m=o.l?_(o.l.Na,o.l,o):null;e:{var T=o.i;let R=-1;for(;;){let N=["count="+d];R==-1?0<d?(R=T[0].g,N.push("ofs="+R)):R=0:N.push("ofs="+R);let oe=!0;for(let Re=0;Re<d;Re++){let te=T[Re].g,Ce=T[Re].map;if(te-=R,0>te)R=Math.max(0,T[Re].g-100),oe=!1;else try{Ig(Ce,N,"req"+te+"_")}catch{m&&m(Ce)}}if(oe){m=N.join("&");break e}}}return o=o.i.splice(0,d),l.D=o,m}function Kh(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;vr||eh(),wr||(vr(),wr=!0),Ko.add(l,o),o.v=0}}function fa(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Sr(_(o.Fa,o),Qh(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Wh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Sr(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Fe(10),Ki(this),Wh(this))};function pa(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Wh(o){o.g=new kt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=_t(o.qa);ae(l,"RID","rpc"),ae(l,"SID",o.K),ae(l,"AID",o.T),ae(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&ae(l,"TO",o.ja),ae(l,"TYPE","xmlhttp"),Mr(o,l),o.m&&o.o&&ha(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=ji(_t(l)),d.m=null,d.P=!0,vh(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Ki(this),fa(this),Fe(19))};function Hi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Hh(o,l){var d=null;if(o.g==l){Hi(o),pa(o),o.g=null;var m=2}else if(ua(o.h,l))d=l.D,Ah(o.h,l),m=1;else return;if(o.G!=0){if(l.o)if(m==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var T=o.B;m=Mi(),Le(m,new mh(m,d)),Wi(o)}else Kh(o);else if(T=l.s,T==3||T==0&&0<l.X||!(m==1&&Ag(o,l)||m==2&&fa(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),T){case 1:on(o,5);break;case 4:on(o,10);break;case 3:on(o,6);break;default:on(o,2)}}}function Qh(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function on(o,l){if(o.j.info("Error code "+l),l==2){var d=_(o.fb,o),m=o.Xa;let T=!m;m=new sn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Bi(m,"https"),ji(m),T?_g(m.toString(),d):vg(m.toString(),d)}else Fe(2);o.G=0,o.l&&o.l.sa(l),Yh(o),jh(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Fe(2)):(this.j.info("Failed to ping google.com"),Fe(1))};function Yh(o){if(o.G=0,o.ka=[],o.l){let l=Sh(o.h);(l.length!=0||o.i.length!=0)&&(x(o.ka,l),x(o.ka,o.i),o.h.i.length=0,O(o.i),o.i.length=0),o.l.ra()}}function Jh(o,l,d){var m=d instanceof sn?_t(d):new sn(d);if(m.g!="")l&&(m.g=l+"."+m.g),qi(m,m.s);else{var T=c.location;m=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var R=new sn(null);m&&Bi(R,m),l&&(R.g=l),T&&qi(R,T),d&&(R.l=d),m=R}return d=o.D,l=o.ya,d&&l&&ae(m,d,l),ae(m,"VER",o.la),Mr(o,m),m}function $h(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new he(new Dr({eb:d})):new he(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Xh(){}n=Xh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Qi(){}Qi.prototype.g=function(o,l){return new ze(o,l)};function ze(o,l){ke.call(this),this.g=new qh(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!W(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!W(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Vn(this)}C(ze,ke),ze.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ze.prototype.close=function(){da(this.g)},ze.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=ea(o),o=d);l.i.push(new cg(l.Ya++,o)),l.G==3&&Wi(l)},ze.prototype.N=function(){this.g.l=null,delete this.j,da(this.g),delete this.g,ze.aa.N.call(this)};function Zh(o){na.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(let d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(Zh,na);function ed(){ra.call(this),this.status=1}C(ed,ra);function Vn(o){this.g=o}C(Vn,Xh),Vn.prototype.ua=function(){Le(this.g,"a")},Vn.prototype.ta=function(o){Le(this.g,new Zh(o))},Vn.prototype.sa=function(o){Le(this.g,new ed)},Vn.prototype.ra=function(){Le(this.g,"b")},Qi.prototype.createWebChannel=Qi.prototype.g,ze.prototype.send=ze.prototype.o,ze.prototype.open=ze.prototype.m,ze.prototype.close=ze.prototype.close,bc=Tt.createWebChannelTransport=function(){return new Qi},Ec=Tt.getStatEventTarget=function(){return Mi()},Ic=Tt.Event=nn,Vs=Tt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Li.NO_ERROR=0,Li.TIMEOUT=8,Li.HTTP_ERROR=6,Zr=Tt.ErrorCode=Li,gh.COMPLETE="complete",wc=Tt.EventType=gh,hh.EventType=Tr,Tr.OPEN="a",Tr.CLOSE="b",Tr.ERROR="c",Tr.MESSAGE="d",ke.prototype.listen=ke.prototype.K,zn=Tt.WebChannel=hh,vc=Tt.FetchXmlHttpFactory=Dr,he.prototype.listenOnce=he.prototype.L,he.prototype.getLastError=he.prototype.Ka,he.prototype.getLastErrorCode=he.prototype.Ba,he.prototype.getStatus=he.prototype.Z,he.prototype.getResponseJson=he.prototype.Oa,he.prototype.getResponseText=he.prototype.oa,he.prototype.send=he.prototype.ea,he.prototype.setWithCredentials=he.prototype.Ha,_c=Tt.XhrIo=he}).apply(typeof Os!="undefined"?Os:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Rf="@firebase/firestore";var Ae=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Ae.UNAUTHENTICATED=new Ae(null),Ae.GOOGLE_CREDENTIALS=new Ae("google-credentials-uid"),Ae.FIRST_PARTY=new Ae("first-party-uid"),Ae.MOCK_USER=new Ae("mock-user");var cr="10.12.1";var yn=new Dt("@firebase/firestore");function ei(){return yn.logLevel}function M(n,...e){if(yn.logLevel<=J.DEBUG){let t=e.map(hl);yn.debug(`Firestore (${cr}): ${n}`,...t)}}function At(n,...e){if(yn.logLevel<=J.ERROR){let t=e.map(hl);yn.error(`Firestore (${cr}): ${n}`,...t)}}function Jn(n,...e){if(yn.logLevel<=J.WARN){let t=e.map(hl);yn.warn(`Firestore (${cr}): ${n}`,...t)}}function hl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function q(n="Unexpected state"){let e=`FIRESTORE (${cr}) INTERNAL ASSERTION FAILED: `+n;throw At(e),new Error(e)}function ie(n,e){n||q()}function Q(n,e){return n}var k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},V=class extends Ge{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var ht=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Bs=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Rc=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ae.UNAUTHENTICATED))}shutdown(){}},Pc=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},kc=class{constructor(e){this.t=e,this.currentUser=Ae.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve(),s=new ht;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ht,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let h=s;e.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},c=h=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.auth.addAuthTokenListener(this.o),a()};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){let h=this.t.getImmediate({optional:!0});h?c(h):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ht)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ie(typeof r.accessToken=="string"),new Bs(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return ie(e===null||typeof e=="string"),new Ae(e)}},Cc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Ae.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},xc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Cc(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ae.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Dc=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Nc=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let a=s.token!==this.R;return this.R=s.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ie(typeof t.token=="string"),this.R=t.token,new Dc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function Fv(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var qs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=Fv(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function ne(n,e){return n<e?-1:n>e?1:0}function $n(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var be=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ne(this.nanoseconds,e.nanoseconds):ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var H=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new be(0,0))}static max(){return new n(new be(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var js=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&q(),r===void 0?r=e.length-t:r>e.length-t&&q(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),a=t.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},ce=class n extends js{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new V(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},Uv=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Ke=class n extends js{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return Uv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new V(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new V(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let h=e[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new V(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var U=class n{constructor(e){this.path=e}static fromPath(e){return new n(ce.fromString(e))}static fromName(e){return new n(ce.fromString(e).popFirst(5))}static empty(){return new n(ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new ce(e.slice()))}};var Oc=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};Oc.UNKNOWN_ID=-1;function Bv(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=H.fromTimestamp(r===1e9?new be(t+1,0):new be(t,r));return new _n(i,U.empty(),e)}function qv(n){return new _n(n.readTime,n.key,-1)}var _n=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(H.min(),U.empty(),-1)}static max(){return new n(H.max(),U.empty(),-1)}};function jv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:ne(n.largestBatchId,e.largestBatchId))}var zv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Vc=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Ei(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==zv)throw n;M("LocalStore","Unexpectedly lost primary lease")}var D=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&q(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},h=>r(h))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),c=0;for(let h=0;h<s;h++){let f=h;t(e[f]).next(p=>{a[f]=p,++c,c===s&&r(a)},p=>i(p))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function Gv(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function bi(n){return n.name==="IndexedDbTransactionError"}var ai=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};ai.oe=-1;function Ti(n){return n==null}function ci(n){return n===0&&1/n==-1/0}function Kv(n){return typeof n=="number"&&Number.isInteger(n)&&!ci(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var Wv=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],tA=[...Wv,"documentOverlays"],Hv=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Qv=Hv,nA=[...Qv,"indexConfiguration","indexState","indexEntries"];function Pf(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Tn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function op(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var fe=class n{constructor(e,t){this.comparator=e,this.root=t||dt.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,dt.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,dt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Hn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Hn(this.root,e,this.comparator,!1)}getReverseIterator(){return new Hn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Hn(this.root,e,this.comparator,!0)}},Hn=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},dt=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw q();let e=this.left.check();if(e!==this.right.check())throw q();return e+(this.isRed()?0:1)}};dt.EMPTY=null,dt.RED=!0,dt.BLACK=!1;dt.EMPTY=new class{constructor(){this.size=0}get key(){throw q()}get value(){throw q()}get color(){throw q()}get left(){throw q()}get right(){throw q()}copy(e,t,r,i,s){return this}insert(e,t,r){return new dt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Oe=class n{constructor(e){this.comparator=e,this.data=new fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new zs(this.data.getIterator())}getIteratorFrom(e){return new zs(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},zs=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Xe=class n{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new n([])}unionWith(e){let t=new Oe(Ke.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $n(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Gs=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Ue=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new Gs("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ue.EMPTY_BYTE_STRING=new Ue("");var Yv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function St(n){if(ie(!!n),typeof n=="string"){let e=0,t=Yv.exec(n);if(ie(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:de(n.seconds),nanos:de(n.nanos)}}function de(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Kt(n){return typeof n=="string"?Ue.fromBase64String(n):Ue.fromUint8Array(n)}function dl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function fl(n){let e=n.mapValue.fields.__previous_value__;return dl(e)?fl(e):e}function ui(n){let e=St(n.mapValue.fields.__local_write_time__.timestampValue);return new be(e.seconds,e.nanos)}var Mc=class{constructor(e,t,r,i,s,a,c,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=f}},Ks=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Ms={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function vn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?dl(n)?4:ap(n)?9007199254740991:10:q()}function pt(n,e){if(n===e)return!0;let t=vn(n);if(t!==vn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ui(n).isEqual(ui(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=St(i.timestampValue),c=St(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Kt(i.bytesValue).isEqual(Kt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return de(i.geoPointValue.latitude)===de(s.geoPointValue.latitude)&&de(i.geoPointValue.longitude)===de(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return de(i.integerValue)===de(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=de(i.doubleValue),c=de(s.doubleValue);return a===c?ci(a)===ci(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return $n(n.arrayValue.values||[],e.arrayValue.values||[],pt);case 10:return function(i,s){let a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Pf(a)!==Pf(c))return!1;for(let h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!pt(a[h],c[h])))return!1;return!0}(n,e);default:return q()}}function li(n,e){return(n.values||[]).find(t=>pt(t,e))!==void 0}function Xn(n,e){if(n===e)return 0;let t=vn(n),r=vn(e);if(t!==r)return ne(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ne(n.booleanValue,e.booleanValue);case 2:return function(s,a){let c=de(s.integerValue||s.doubleValue),h=de(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,e);case 3:return kf(n.timestampValue,e.timestampValue);case 4:return kf(ui(n),ui(e));case 5:return ne(n.stringValue,e.stringValue);case 6:return function(s,a){let c=Kt(s),h=Kt(a);return c.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let c=s.split("/"),h=a.split("/");for(let f=0;f<c.length&&f<h.length;f++){let p=ne(c[f],h[f]);if(p!==0)return p}return ne(c.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let c=ne(de(s.latitude),de(a.latitude));return c!==0?c:ne(de(s.longitude),de(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,a){let c=s.values||[],h=a.values||[];for(let f=0;f<c.length&&f<h.length;++f){let p=Xn(c[f],h[f]);if(p)return p}return ne(c.length,h.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,a){if(s===Ms.mapValue&&a===Ms.mapValue)return 0;if(s===Ms.mapValue)return 1;if(a===Ms.mapValue)return-1;let c=s.fields||{},h=Object.keys(c),f=a.fields||{},p=Object.keys(f);h.sort(),p.sort();for(let y=0;y<h.length&&y<p.length;++y){let _=ne(h[y],p[y]);if(_!==0)return _;let S=Xn(c[h[y]],f[p[y]]);if(S!==0)return S}return ne(h.length,p.length)}(n.mapValue,e.mapValue);default:throw q()}}function kf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ne(n,e);let t=St(n),r=St(e),i=ne(t.seconds,r.seconds);return i!==0?i:ne(t.nanos,r.nanos)}function Zn(n){return Lc(n)}function Lc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=St(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Kt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return U.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Lc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+=`${a}:${Lc(t.fields[a])}`;return i+"}"}(n.mapValue):q()}function Cf(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Fc(n){return!!n&&"integerValue"in n}function pl(n){return!!n&&"arrayValue"in n}function xf(n){return!!n&&"nullValue"in n}function Df(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Fs(n){return!!n&&"mapValue"in n}function ni(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return Tn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ni(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ni(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ap(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var Be=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Fs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ni(t)}setAll(e){let t=Ke.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){let h=this.getFieldsMap(t);this.applyChanges(h,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=ni(a):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Fs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return pt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Fs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Tn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(ni(this.value))}};function cp(n){let e=[];return Tn(n.fields,(t,r)=>{let i=new Ke([t]);if(Fs(r)){let s=cp(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new Xe(e)}var He=class n{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new n(e,0,H.min(),H.min(),H.min(),Be.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,H.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,H.min(),H.min(),Be.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,H.min(),H.min(),Be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var er=class{constructor(e,t){this.position=e,this.inclusive=t}};function Nf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=U.comparator(U.fromName(a.referenceValue),t.key):r=Xn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Of(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!pt(n.position[t],e.position[t]))return!1;return!0}var wn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Jv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Ws=class{},_e=class n extends Ws{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Bc(e,t,r):t==="array-contains"?new zc(e,r):t==="in"?new Gc(e,r):t==="not-in"?new Kc(e,r):t==="array-contains-any"?new Wc(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new qc(e,r):new jc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Xn(t,this.value)):t!==null&&vn(this.value)===vn(t)&&this.matchesComparison(Xn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},st=class n extends Ws{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return up(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function up(n){return n.op==="and"}function lp(n){return $v(n)&&up(n)}function $v(n){for(let e of n.filters)if(e instanceof st)return!1;return!0}function Uc(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+Zn(n.value);if(lp(n))return n.filters.map(e=>Uc(e)).join(",");{let e=n.filters.map(t=>Uc(t)).join(",");return`${n.op}(${e})`}}function hp(n,e){return n instanceof _e?function(r,i){return i instanceof _e&&r.op===i.op&&r.field.isEqual(i.field)&&pt(r.value,i.value)}(n,e):n instanceof st?function(r,i){return i instanceof st&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&hp(a,i.filters[c]),!0):!1}(n,e):void q()}function dp(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${Zn(t.value)}`}(n):n instanceof st?function(t){return t.op.toString()+" {"+t.getFilters().map(dp).join(" ,")+"}"}(n):"Filter"}var Bc=class extends _e{constructor(e,t,r){super(e,t,r),this.key=U.fromName(r.referenceValue)}matches(e){let t=U.comparator(e.key,this.key);return this.matchesComparison(t)}},qc=class extends _e{constructor(e,t){super(e,"in",t),this.keys=fp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},jc=class extends _e{constructor(e,t){super(e,"not-in",t),this.keys=fp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function fp(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>U.fromName(r.referenceValue))}var zc=class extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return pl(t)&&li(t.arrayValue,this.value)}},Gc=class extends _e{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&li(this.value.arrayValue,t)}},Kc=class extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(li(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!li(this.value.arrayValue,t)}},Wc=class extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!pl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>li(this.value.arrayValue,r))}};var Hc=class{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.ue=null}};function Vf(n,e=null,t=[],r=[],i=null,s=null,a=null){return new Hc(n,e,t,r,i,s,a)}function ml(n){let e=Q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Uc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Ti(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Zn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Zn(r)).join(",")),e.ue=t}return e.ue}function gl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Jv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!hp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Of(n.startAt,e.startAt)&&Of(n.endAt,e.endAt)}function Qc(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var Wt=class{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function Xv(n,e,t,r,i,s,a,c){return new Wt(n,e,t,r,i,s,a,c)}function yl(n){return new Wt(n)}function Mf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function pp(n){return n.collectionGroup!==null}function ri(n){let e=Q(n);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Oe(Ke.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new wn(s,r))}),t.has(Ke.keyField().canonicalString())||e.ce.push(new wn(Ke.keyField(),r))}return e.ce}function ft(n){let e=Q(n);return e.le||(e.le=Zv(e,ri(n))),e.le}function Zv(n,e){if(n.limitType==="F")return Vf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new wn(i.field,s)});let t=n.endAt?new er(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new er(n.startAt.position,n.startAt.inclusive):null;return Vf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Yc(n,e){let t=n.filters.concat([e]);return new Wt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Hs(n,e,t){return new Wt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function wo(n,e){return gl(ft(n),ft(e))&&n.limitType===e.limitType}function mp(n){return`${ml(ft(n))}|lt:${n.limitType}`}function Gn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>dp(i)).join(", ")}]`),Ti(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Zn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Zn(i)).join(",")),`Target(${r})`}(ft(n))}; limitType=${n.limitType})`}function Io(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):U.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of ri(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,h){let f=Nf(a,c,h);return a.inclusive?f<=0:f<0}(r.startAt,ri(r),i)||r.endAt&&!function(a,c,h){let f=Nf(a,c,h);return a.inclusive?f>=0:f>0}(r.endAt,ri(r),i))}(n,e)}function ew(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function gp(n){return(e,t)=>{let r=!1;for(let i of ri(n)){let s=tw(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function tw(n,e,t){let r=n.field.isKeyField()?U.comparator(e.key,t.key):function(s,a,c){let h=a.data.field(s),f=c.data.field(s);return h!==null&&f!==null?Xn(h,f):q()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return q()}}var Ht=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Tn(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return op(this.inner)}size(){return this.innerSize}};var nw=new fe(U.comparator);function Rt(){return nw}var yp=new fe(U.comparator);function ti(...n){let e=yp;for(let t of n)e=e.insert(t.key,t);return e}function _p(n){let e=yp;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function mn(){return ii()}function vp(){return ii()}function ii(){return new Ht(n=>n.toString(),(n,e)=>n.isEqual(e))}var rw=new fe(U.comparator),iw=new Oe(U.comparator);function $(...n){let e=iw;for(let t of n)e=e.add(t);return e}var sw=new Oe(ne);function ow(){return sw}function wp(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ci(e)?"-0":e}}function Ip(n){return{integerValue:""+n}}function aw(n,e){return Kv(e)?Ip(e):wp(n,e)}var tr=class{constructor(){this._=void 0}};function cw(n,e,t){return n instanceof In?function(i,s){let a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&dl(s)&&(s=fl(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(t,e):n instanceof Qt?bp(n,e):n instanceof Yt?Tp(n,e):function(i,s){let a=Ep(i,s),c=Lf(a)+Lf(i.Pe);return Fc(a)&&Fc(i.Pe)?Ip(c):wp(i.serializer,c)}(n,e)}function uw(n,e,t){return n instanceof Qt?bp(n,e):n instanceof Yt?Tp(n,e):t}function Ep(n,e){return n instanceof nr?function(r){return Fc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var In=class extends tr{},Qt=class extends tr{constructor(e){super(),this.elements=e}};function bp(n,e){let t=Ap(e);for(let r of n.elements)t.some(i=>pt(i,r))||t.push(r);return{arrayValue:{values:t}}}var Yt=class extends tr{constructor(e){super(),this.elements=e}};function Tp(n,e){let t=Ap(e);for(let r of n.elements)t=t.filter(i=>!pt(i,r));return{arrayValue:{values:t}}}var nr=class extends tr{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function Lf(n){return de(n.integerValue||n.doubleValue)}function Ap(n){return pl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var hi=class{constructor(e,t){this.field=e,this.transform=t}};function lw(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Qt&&i instanceof Qt||r instanceof Yt&&i instanceof Yt?$n(r.elements,i.elements,pt):r instanceof nr&&i instanceof nr?pt(r.Pe,i.Pe):r instanceof In&&i instanceof In}(n.transform,e.transform)}var Jc=class{constructor(e,t){this.version=e,this.transformResults=t}},Se=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Us(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var rr=class{};function Sp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new bn(n.key,Se.none()):new En(n.key,n.data,Se.none());{let t=n.data,r=Be.empty(),i=new Oe(Ke.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new mt(n.key,r,new Xe(i.toArray()),Se.none())}}function hw(n,e,t){n instanceof En?function(i,s,a){let c=i.value.clone(),h=Uf(i.fieldTransforms,s,a.transformResults);c.setAll(h),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof mt?function(i,s,a){if(!Us(i.precondition,s))return void s.convertToUnknownDocument(a.version);let c=Uf(i.fieldTransforms,s,a.transformResults),h=s.data;h.setAll(Rp(i)),h.setAll(c),s.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function si(n,e,t,r){return n instanceof En?function(s,a,c,h){if(!Us(s.precondition,a))return c;let f=s.value.clone(),p=Bf(s.fieldTransforms,h,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof mt?function(s,a,c,h){if(!Us(s.precondition,a))return c;let f=Bf(s.fieldTransforms,h,a),p=a.data;return p.setAll(Rp(s)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(s,a,c){return Us(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function dw(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=Ep(r.transform,i||null);s!=null&&(t===null&&(t=Be.empty()),t.set(r.field,s))}return t||null}function Ff(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&$n(r,i,(s,a)=>lw(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var En=class extends rr{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},mt=class extends rr{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function Rp(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Uf(n,e,t){let r=new Map;ie(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,uw(a,c,t[i]))}return r}function Bf(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,cw(s,a,e))}return r}var bn=class extends rr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Qs=class extends rr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var $c=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&hw(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=si(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=si(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=vp();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;let h=Sp(a,c);h!==null&&r.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(H.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),$())}isEqual(e){return this.batchId===e.batchId&&$n(this.mutations,e.mutations,(t,r)=>Ff(t,r))&&$n(this.baseMutations,e.baseMutations,(t,r)=>Ff(t,r))}},Xc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ie(e.mutations.length===r.length);let i=function(){return rw}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var Zc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var eu=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var ge,ee;function Pp(n){switch(n){default:return q();case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0}}function kp(n){if(n===void 0)return At("GRPC error has no .code"),k.UNKNOWN;switch(n){case ge.OK:return k.OK;case ge.CANCELLED:return k.CANCELLED;case ge.UNKNOWN:return k.UNKNOWN;case ge.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case ge.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case ge.INTERNAL:return k.INTERNAL;case ge.UNAVAILABLE:return k.UNAVAILABLE;case ge.UNAUTHENTICATED:return k.UNAUTHENTICATED;case ge.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case ge.NOT_FOUND:return k.NOT_FOUND;case ge.ALREADY_EXISTS:return k.ALREADY_EXISTS;case ge.PERMISSION_DENIED:return k.PERMISSION_DENIED;case ge.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case ge.ABORTED:return k.ABORTED;case ge.OUT_OF_RANGE:return k.OUT_OF_RANGE;case ge.UNIMPLEMENTED:return k.UNIMPLEMENTED;case ge.DATA_LOSS:return k.DATA_LOSS;default:return q()}}(ee=ge||(ge={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";var qf=null;function fw(){return new TextEncoder}var pw=new qt([4294967295,4294967295],0);function jf(n){let e=fw().encode(n),t=new yc;return t.update(e),new Uint8Array(t.digest())}function zf(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new qt([t,r],0),new qt([i,s],0)]}var tu=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new gn(`Invalid padding: ${t}`);if(r<0)throw new gn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new gn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new gn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=qt.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(qt.fromNumber(r)));return i.compare(pw)===1&&(i=new qt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;let t=jf(e),[r,i]=zf(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;let t=jf(e),[r,i]=zf(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},gn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Ys=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,di.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(H.min(),i,new fe(ne),Rt(),$())}},di=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,$(),$(),$())}};var Qn=class{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}},Js=class{constructor(e,t){this.targetId=e,this.me=t}},$s=class{constructor(e,t,r=Ue.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Xs=class{constructor(){this.fe=0,this.ge=Kf(),this.pe=Ue.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=$(),t=$(),r=$();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:q()}}),new di(this.pe,this.ye,e,t,r)}ve(){this.we=!1,this.ge=Kf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ie(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},nu=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=Rt(),this.qe=Gf(),this.Qe=new fe(ne)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:q()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){let t=e.targetId,r=e.me.count,i=this.Je(t);if(i){let s=i.target;if(Qc(s))if(r===0){let a=new U(s.path);this.Ue(t,a,He.newNoDocument(a,H.min()))}else ie(r===1);else{let a=this.Ye(t);if(a!==r){let c=this.Ze(e),h=c?this.Xe(c,e,a):1;if(h!==0){this.je(t);let f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,f)}qf==null||qf.et(function(p,y,_,S,C){var O,x,z,W,K,re;let Te={localCacheCount:p,existenceFilterCount:y.count,databaseId:_.database,projectId:_.projectId},Z=y.unchangedNames;return Z&&(Te.bloomFilter={applied:C===0,hashCount:(O=Z==null?void 0:Z.hashCount)!==null&&O!==void 0?O:0,bitmapLength:(W=(z=(x=Z==null?void 0:Z.bits)===null||x===void 0?void 0:x.bitmap)===null||z===void 0?void 0:z.length)!==null&&W!==void 0?W:0,padding:(re=(K=Z==null?void 0:Z.bits)===null||K===void 0?void 0:K.padding)!==null&&re!==void 0?re:0,mightContain:E=>{var g;return(g=S==null?void 0:S.mightContain(E))!==null&&g!==void 0&&g}}),Te}(a,e.me,this.Le.tt(),c,h))}}}}Ze(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,c;try{a=Kt(r).toUint8Array()}catch(h){if(h instanceof Gs)return Jn("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new tu(a,i,s)}catch(h){return Jn(h instanceof gn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){let r=this.Le.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){let t=new Map;this.Be.forEach((s,a)=>{let c=this.Je(a);if(c){if(s.current&&Qc(c.target)){let h=new U(c.target.path);this.ke.get(h)!==null||this.it(a,h)||this.Ue(a,h,He.newNoDocument(h,e))}s.be&&(t.set(a,s.Ce()),s.ve())}});let r=$();this.qe.forEach((s,a)=>{let c=!0;a.forEachWhile(h=>{let f=this.Je(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));let i=new Ys(e,t,this.Qe,this.ke,r);return this.ke=Rt(),this.qe=Gf(),this.Qe=new fe(ne),i}$e(e,t){if(!this.ze(e))return;let r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;let i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Xs,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Oe(ne),this.qe=this.qe.insert(e,t)),t}ze(e){let t=this.Je(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Xs),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function Gf(){return new fe(U.comparator)}function Kf(){return new fe(U.comparator)}var mw={asc:"ASCENDING",desc:"DESCENDING"},gw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},yw={and:"AND",or:"OR"},ru=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function iu(n,e){return n.useProto3Json||Ti(e)?e:{value:e}}function Zs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Cp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function _w(n,e){return Zs(n,e.toTimestamp())}function We(n){return ie(!!n),H.fromTimestamp(function(t){let r=St(t);return new be(r.seconds,r.nanos)}(n))}function _l(n,e){return su(n,e).canonicalString()}function su(n,e){let t=function(i){return new ce(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function xp(n){let e=ce.fromString(n);return ie(Lp(e)),e}function eo(n,e){return _l(n.databaseId,e.path)}function oi(n,e){let t=xp(e);if(t.get(1)!==n.databaseId.projectId)throw new V(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new U(Np(t))}function Dp(n,e){return _l(n.databaseId,e)}function vw(n){let e=xp(n);return e.length===4?ce.emptyPath():Np(e)}function ou(n){return new ce(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Np(n){return ie(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Wf(n,e,t){return{name:eo(n,e),fields:t.value.mapValue.fields}}function ww(n,e){return"found"in e?function(r,i){ie(!!i.found),i.found.name,i.found.updateTime;let s=oi(r,i.found.name),a=We(i.found.updateTime),c=i.found.createTime?We(i.found.createTime):H.min(),h=new Be({mapValue:{fields:i.found.fields}});return He.newFoundDocument(s,a,c,h)}(n,e):"missing"in e?function(r,i){ie(!!i.missing),ie(!!i.readTime);let s=oi(r,i.missing),a=We(i.readTime);return He.newNoDocument(s,a)}(n,e):q()}function Iw(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:q()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(f,p){return f.useProto3Json?(ie(p===void 0||typeof p=="string"),Ue.fromBase64String(p||"")):(ie(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Ue.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(f){let p=f.code===void 0?k.UNKNOWN:kp(f.code);return new V(p,f.message||"")}(a);t=new $s(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=oi(n,r.document.name),s=We(r.document.updateTime),a=r.document.createTime?We(r.document.createTime):H.min(),c=new Be({mapValue:{fields:r.document.fields}}),h=He.newFoundDocument(i,s,a,c),f=r.targetIds||[],p=r.removedTargetIds||[];t=new Qn(f,p,h.key,h)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=oi(n,r.document),s=r.readTime?We(r.readTime):H.min(),a=He.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Qn([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=oi(n,r.document),s=r.removedTargetIds||[];t=new Qn([],s,i,null)}else{if(!("filter"in e))return q();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new eu(i,s),c=r.targetId;t=new Js(c,a)}}return t}function Op(n,e){let t;if(e instanceof En)t={update:Wf(n,e.key,e.value)};else if(e instanceof bn)t={delete:eo(n,e.key)};else if(e instanceof mt)t={update:Wf(n,e.key,e.data),updateMask:Cw(e.fieldMask)};else{if(!(e instanceof Qs))return q();t={verify:eo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let c=a.transform;if(c instanceof In)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Qt)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Yt)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof nr)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw q()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:_w(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:q()}(n,e.precondition)),t}function Ew(n,e){return n&&n.length>0?(ie(e!==void 0),n.map(t=>function(i,s){let a=i.updateTime?We(i.updateTime):We(s);return a.isEqual(H.min())&&(a=We(s)),new Jc(a,i.transformResults||[])}(t,e))):[]}function bw(n,e){return{documents:[Dp(n,e.path)]}}function Tw(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Dp(n,i);let s=function(f){if(f.length!==0)return Mp(st.create(f,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(f){if(f.length!==0)return f.map(p=>function(_){return{field:Kn(_.field),direction:Rw(_.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let c=iu(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{_t:t,parent:i}}function Aw(n){let e=vw(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){ie(r===1);let p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(y){let _=Vp(y);return _ instanceof st&&lp(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(_=>function(C){return new wn(Wn(C.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(_))}(t.orderBy));let c=null;t.limit&&(c=function(y){let _;return _=typeof y=="object"?y.value:y,Ti(_)?null:_}(t.limit));let h=null;t.startAt&&(h=function(y){let _=!!y.before,S=y.values||[];return new er(S,_)}(t.startAt));let f=null;return t.endAt&&(f=function(y){let _=!y.before,S=y.values||[];return new er(S,_)}(t.endAt)),Xv(e,i,a,s,c,"F",h,f)}function Sw(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Wn(t.unaryFilter.field);return _e.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Wn(t.unaryFilter.field);return _e.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Wn(t.unaryFilter.field);return _e.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=Wn(t.unaryFilter.field);return _e.create(a,"!=",{nullValue:"NULL_VALUE"});default:return q()}}(n):n.fieldFilter!==void 0?function(t){return _e.create(Wn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return q()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return st.create(t.compositeFilter.filters.map(r=>Vp(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return q()}}(t.compositeFilter.op))}(n):q()}function Rw(n){return mw[n]}function Pw(n){return gw[n]}function kw(n){return yw[n]}function Kn(n){return{fieldPath:n.canonicalString()}}function Wn(n){return Ke.fromServerFormat(n.fieldPath)}function Mp(n){return n instanceof _e?function(t){if(t.op==="=="){if(Df(t.value))return{unaryFilter:{field:Kn(t.field),op:"IS_NAN"}};if(xf(t.value))return{unaryFilter:{field:Kn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Df(t.value))return{unaryFilter:{field:Kn(t.field),op:"IS_NOT_NAN"}};if(xf(t.value))return{unaryFilter:{field:Kn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kn(t.field),op:Pw(t.op),value:t.value}}}(n):n instanceof st?function(t){let r=t.getFilters().map(i=>Mp(i));return r.length===1?r[0]:{compositeFilter:{op:kw(t.op),filters:r}}}(n):q()}function Cw(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Lp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var fi=class n{constructor(e,t,r,i,s=H.min(),a=H.min(),c=Ue.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var au=class{constructor(e){this.ct=e}};function xw(n){let e=Aw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Hs(e,e.limit,"L"):e}var to=class{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(de(e.integerValue));else if("doubleValue"in e){let r=de(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),ci(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),typeof r=="string"&&(r=St(r)),t.At(`${r.seconds||""}`),t.dt(r.nanos||0)}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(Kt(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?ap(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):q()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};this.Et(t,55);for(let i of Object.keys(r))this.Rt(i,t),this.It(r[i],t)}wt(e,t){let r=e.values||[];this.Et(t,50);for(let i of r)this.It(i,t)}gt(e,t){this.Et(t,37),U.fromName(e).path.forEach(r=>{this.Et(t,60),this.St(r,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}};to.bt=new to;var cu=class{constructor(){this._n=new uu}addToCollectionParentIndex(e,t){return this._n.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(_n.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(_n.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}},uu=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Oe(ce.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Oe(ce.comparator)).toArray()}};var iA=new Uint8Array(0);var lt=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};lt.DEFAULT_COLLECTION_PERCENTILE=10,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lt.DEFAULT=new lt(41943040,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lt.DISABLED=new lt(-1,0,0);var pi=class n{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new n(0)}static Ln(){return new n(-1)}};var lu=class{constructor(){this.changes=new Ht(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,He.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var hu=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var du=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&si(r.mutation,i,Xe.empty(),be.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,$()).next(()=>r))}getLocalViewOfDocuments(e,t,r=$()){let i=mn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=ti();return s.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=mn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,$()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=Rt(),a=ii(),c=function(){return ii()}();return t.forEach((h,f)=>{let p=r.get(f.key);i.has(f.key)&&(p===void 0||p.mutation instanceof mt)?s=s.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),si(p.mutation,f,p.mutation.getFieldMask(),be.now())):a.set(f.key,Xe.empty())}),this.recalculateAndSaveOverlays(e,s).next(h=>(h.forEach((f,p)=>a.set(f,p)),t.forEach((f,p)=>{var y;return c.set(f,new hu(p,(y=a.get(f))!==null&&y!==void 0?y:null))}),c))}recalculateAndSaveOverlays(e,t){let r=ii(),i=new fe((a,c)=>a-c),s=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let c of a)c.keys().forEach(h=>{let f=t.get(h);if(f===null)return;let p=r.get(h)||Xe.empty();p=c.applyToLocalView(f,p),r.set(h,p);let y=(i.get(c.batchId)||$()).add(h);i=i.insert(c.batchId,y)})}).next(()=>{let a=[],c=i.getReverseIterator();for(;c.hasNext();){let h=c.getNext(),f=h.key,p=h.value,y=vp();p.forEach(_=>{if(!s.has(_)){let S=Sp(t.get(_),r.get(_));S!==null&&y.set(_,S),s=s.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,y))}return D.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return U.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):pp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):D.resolve(mn()),c=-1,h=s;return a.next(f=>D.forEach(f,(p,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),s.get(p)?D.resolve():this.remoteDocumentCache.getEntry(e,p).next(_=>{h=h.insert(p,_)}))).next(()=>this.populateOverlays(e,f,s)).next(()=>this.computeViews(e,h,f,$())).next(p=>({batchId:c,changes:_p(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next(r=>{let i=ti();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=ti();return this.indexManager.getCollectionParents(e,s).next(c=>D.forEach(c,h=>{let f=function(y,_){return new Wt(_,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,h.child(s));return this.getDocumentsMatchingCollectionQuery(e,f,r,i).next(p=>{p.forEach((y,_)=>{a=a.insert(y,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((h,f)=>{let p=f.getKey();a.get(p)===null&&(a=a.insert(p,He.newInvalidDocument(p)))});let c=ti();return a.forEach((h,f)=>{let p=s.get(h);p!==void 0&&si(p.mutation,f,Xe.empty(),be.now()),Io(t,f)&&(c=c.insert(h,f))}),c})}};var fu=class{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return D.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:We(i.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,function(i){return{name:i.name,query:xw(i.bundledQuery),readTime:We(i.readTime)}}(t)),D.resolve()}};var pu=class{constructor(){this.overlays=new fe(U.comparator),this.hr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){let r=mn();return D.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),D.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.hr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.hr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){let i=mn(),s=t.length+1,a=new U(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){let h=c.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===s&&h.largestBatchId>r&&i.set(h.getKey(),h)}return D.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new fe((f,p)=>f-p),a=this.overlays.getIterator();for(;a.hasNext();){let f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let p=s.get(f.largestBatchId);p===null&&(p=mn(),s=s.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}let c=mn(),h=s.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,p)=>c.set(f,p)),!(c.size()>=i)););return D.resolve(c)}ht(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.hr.get(i.largestBatchId).delete(r.key);this.hr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Zc(t,r));let s=this.hr.get(t);s===void 0&&(s=$(),this.hr.set(t,s)),this.hr.set(t,s.add(r.key))}};var mi=class{constructor(){this.Pr=new Oe(ye.Ir),this.Tr=new Oe(ye.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new ye(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ar(new ye(e,t))}Rr(e,t){e.forEach(r=>this.removeReference(r,t))}Vr(e){let t=new U(new ce([])),r=new ye(t,e),i=new ye(t,e+1),s=[];return this.Tr.forEachInRange([r,i],a=>{this.Ar(a),s.push(a.key)}),s}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new U(new ce([])),r=new ye(t,e),i=new ye(t,e+1),s=$();return this.Tr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new ye(e,0),r=this.Pr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},ye=class{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return U.comparator(e.key,t.key)||ne(e.pr,t.pr)}static Er(e,t){return ne(e.pr,t.pr)||U.comparator(e.key,t.key)}};var mu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new Oe(ye.Ir)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new $c(s,t,r,i);this.mutationQueue.push(a);for(let c of i)this.wr=this.wr.add(new ye(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.br(r),s=i<0?0:i;return D.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?-1:this.yr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new ye(t,0),i=new ye(t,Number.POSITIVE_INFINITY),s=[];return this.wr.forEachInRange([r,i],a=>{let c=this.Sr(a.pr);s.push(c)}),D.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Oe(ne);return t.forEach(i=>{let s=new ye(i,0),a=new ye(i,Number.POSITIVE_INFINITY);this.wr.forEachInRange([s,a],c=>{r=r.add(c.pr)})}),D.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;U.isDocumentKey(s)||(s=s.child(""));let a=new ye(new U(s),0),c=new Oe(ne);return this.wr.forEachWhile(h=>{let f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(c=c.add(h.pr)),!0)},a),D.resolve(this.Dr(c))}Dr(e){let t=[];return e.forEach(r=>{let i=this.Sr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ie(this.Cr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.wr;return D.forEach(t.mutations,i=>{let s=new ye(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new ye(t,0),i=this.wr.firstAfterOrEqual(r);return D.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Cr(e,t){return this.br(e)}br(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var gu=class{constructor(e){this.vr=e,this.docs=function(){return new fe(U.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():He.newInvalidDocument(t))}getEntries(e,t){let r=Rt();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():He.newInvalidDocument(i))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Rt(),a=t.path,c=new U(a.child("")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){let{key:f,value:{document:p}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||jv(qv(p),r)<=0||(i.has(p.key)||Io(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return D.resolve(s)}getAllFromCollectionGroup(e,t,r,i){q()}Fr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new yu(this)}getSize(e){return D.resolve(this.size)}},yu=class extends lu{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ar.addEntry(e,i)):this.ar.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}};var _u=class{constructor(e){this.persistence=e,this.Mr=new Ht(t=>ml(t),gl),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.Or=0,this.Nr=new mi,this.targetCount=0,this.Lr=pi.Nn()}forEachTarget(e,t){return this.Mr.forEach((r,i)=>t(i)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),D.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new pi(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.qn(t),D.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Mr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Mr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),D.waitFor(s).next(()=>i)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),D.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),D.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Nr.containsKey(t))}};var vu=class{constructor(e,t){this.Br={},this.overlays={},this.kr=new ai(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new _u(this),this.indexManager=new cu,this.remoteDocumentCache=function(i){return new gu(i)}(r=>this.referenceDelegate.Kr(r)),this.serializer=new au(t),this.$r=new fu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Br[e.toKey()];return r||(r=new mu(t,this.referenceDelegate),this.Br[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);let i=new wu(this.kr.next());return this.referenceDelegate.Ur(),r(i).next(s=>this.referenceDelegate.Wr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Gr(e,t){return D.or(Object.values(this.Br).map(r=>()=>r.containsKey(e,t)))}},wu=class extends Vc{constructor(e){super(),this.currentSequenceNumber=e}},Iu=class n{constructor(e){this.persistence=e,this.zr=new mi,this.jr=null}static Hr(e){return new n(e)}get Jr(){if(this.jr)return this.jr;throw q()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),D.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(i=>this.Jr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Jr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.Jr,r=>{let i=U.fromPath(r);return this.Yr(e,i).next(s=>{s||t.removeEntry(i,H.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(r=>{r?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return D.or([()=>D.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}};var Eu=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=i}static Ki(e,t){let r=$(),i=$();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var bu=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Tu=class{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=function(){return ld()?8:Gv(Ie())>0?6:4}()}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ji(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Hi(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new bu;return this.Ji(e,t,a).next(c=>{if(s.result=c,this.Ui)return this.Yi(e,t,a,c.size)})}).next(()=>s.result)}Yi(e,t,r,i){return r.documentReadCount<this.Wi?(ei()<=J.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Gn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),D.resolve()):(ei()<=J.DEBUG&&M("QueryEngine","Query:",Gn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Gi*i?(ei()<=J.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Gn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):D.resolve())}ji(e,t){if(Mf(t))return D.resolve(null);let r=ft(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Hs(t,null,"F"),r=ft(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=$(...s);return this.zi.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(h=>{let f=this.Zi(t,c);return this.Xi(t,f,a,h.readTime)?this.ji(e,Hs(t,null,"F")):this.es(e,f,t,h)}))})))}Hi(e,t,r,i){return Mf(t)||i.isEqual(H.min())?D.resolve(null):this.zi.getDocuments(e,r).next(s=>{let a=this.Zi(t,s);return this.Xi(t,a,r,i)?D.resolve(null):(ei()<=J.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Gn(t)),this.es(e,a,t,Bv(i,-1)).next(c=>c))})}Zi(e,t){let r=new Oe(gp(e));return t.forEach((i,s)=>{Io(e,s)&&(r=r.add(s))}),r}Xi(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ji(e,t,r){return ei()<=J.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Gn(t)),this.zi.getDocumentsMatchingQuery(e,t,_n.min(),r)}es(e,t,r,i){return this.zi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var Au=class{constructor(e,t,r,i){this.persistence=e,this.ts=t,this.serializer=i,this.ns=new fe(ne),this.rs=new Ht(s=>ml(s),gl),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new du(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}};function Dw(n,e,t,r){return new Au(n,e,t,r)}async function Fp(n,e){let t=Q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t._s(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],c=[],h=$();for(let f of i){a.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}for(let f of s){c.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(r,h).next(f=>({us:f,removedBatchIds:a,addedBatchIds:c}))})})}function Nw(n,e){let t=Q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.os.newChangeBuffer({trackRemovals:!0});return function(c,h,f,p){let y=f.batch,_=y.keys(),S=D.resolve();return _.forEach(C=>{S=S.next(()=>p.getEntry(h,C)).next(O=>{let x=f.docVersions.get(C);ie(x!==null),O.version.compareTo(x)<0&&(y.applyToRemoteDocument(O,f),O.isValidDocument()&&(O.setReadTime(f.commitVersion),p.addEntry(O)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(h,y))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let h=$();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(h=h.add(c.batch.mutations[f].key));return h}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Up(n){let e=Q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}function Ow(n,e){let t=Q(n),r=e.snapshotVersion,i=t.ns;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.os.newChangeBuffer({trackRemovals:!0});i=t.ns;let c=[];e.targetChanges.forEach((p,y)=>{let _=i.get(y);if(!_)return;c.push(t.Qr.removeMatchingKeys(s,p.removedDocuments,y).next(()=>t.Qr.addMatchingKeys(s,p.addedDocuments,y)));let S=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(y)!==null?S=S.withResumeToken(Ue.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(y,S),function(O,x,z){return O.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(_,S,p)&&c.push(t.Qr.updateTargetData(s,S))});let h=Rt(),f=$();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(Vw(s,a,e.documentUpdates).next(p=>{h=p.cs,f=p.ls})),!r.isEqual(H.min())){let p=t.Qr.getLastRemoteSnapshotVersion(s).next(y=>t.Qr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return D.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,h,f)).next(()=>h)}).then(s=>(t.ns=i,s))}function Vw(n,e,t){let r=$(),i=$();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=Rt();return t.forEach((c,h)=>{let f=s.get(c);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(c)),h.isNoDocument()&&h.version.isEqual(H.min())?(e.removeEntry(c,h.readTime),a=a.insert(c,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(h),a=a.insert(c,h)):M("LocalStore","Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",h.version)}),{cs:a,ls:i}})}function Mw(n,e){let t=Q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Lw(n,e){let t=Q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Qr.getTargetData(r,e).next(s=>s?(i=s,D.resolve(i)):t.Qr.allocateTargetId(r).next(a=>(i=new fi(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Qr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.ns.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ns=t.ns.insert(r.targetId,r),t.rs.set(e,r.targetId)),r})}async function Su(n,e,t){let r=Q(n),i=r.ns.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!bi(a))throw a;M("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.ns=r.ns.remove(e),r.rs.delete(i.target)}function Hf(n,e,t){let r=Q(n),i=H.min(),s=$();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,p){let y=Q(h),_=y.rs.get(p);return _!==void 0?D.resolve(y.ns.get(_)):y.Qr.getTargetData(f,p)}(r,a,ft(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Qr.getMatchingKeysForTargetId(a,c.targetId).next(h=>{s=h})}).next(()=>r.ts.getDocumentsMatchingQuery(a,e,t?i:H.min(),t?s:$())).next(c=>(Fw(r,ew(e),c),{documents:c,hs:s})))}function Fw(n,e,t){let r=n.ss.get(e)||H.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.ss.set(e,r)}var no=class{constructor(){this.activeTargetIds=ow()}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Ru=class{constructor(){this.no=new no,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new no,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Pu=class{io(e){}shutdown(){}};var ro=class{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){M("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.uo)e(0)}ao(){M("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.uo)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Ls=null;function Tc(){return Ls===null?Ls=function(){return 268435456+Math.round(2147483648*Math.random())}():Ls++,"0x"+Ls.toString(16)}var Uw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var ku=class{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}Ao(e){this.Ro=e}onMessage(e){this.Vo=e}close(){this.ho()}send(e){this.lo(e)}mo(){this.Io()}fo(){this.Eo()}po(e){this.Ro(e)}yo(e){this.Vo(e)}};var Ne="WebChannelConnection",Cu=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.wo=r+"://"+t.host,this.So=`projects/${i}/databases/${s}`,this.bo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Do(){return!1}Co(t,r,i,s,a){let c=Tc(),h=this.vo(t,r.toUriEncodedString());M("RestConnection",`Sending RPC '${t}' ${c}:`,h,i);let f={"google-cloud-resource-prefix":this.So,"x-goog-request-params":this.bo};return this.Fo(f,s,a),this.Mo(t,h,f,i).then(p=>(M("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw Jn("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",h,"request:",i),p})}xo(t,r,i,s,a,c){return this.Co(t,r,i,s,a)}Fo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>t[a]=s),i&&i.headers.forEach((s,a)=>t[a]=s)}vo(t,r){let i=Uw[t];return`${this.wo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Mo(e,t,r,i){let s=Tc();return new Promise((a,c)=>{let h=new _c;h.setWithCredentials(!0),h.listenOnce(wc.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Zr.NO_ERROR:let p=h.getResponseJson();M(Ne,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),a(p);break;case Zr.TIMEOUT:M(Ne,`RPC '${e}' ${s} timed out`),c(new V(k.DEADLINE_EXCEEDED,"Request time out"));break;case Zr.HTTP_ERROR:let y=h.getStatus();if(M(Ne,`RPC '${e}' ${s} failed with status:`,y,"response text:",h.getResponseText()),y>0){let _=h.getResponseJson();Array.isArray(_)&&(_=_[0]);let S=_==null?void 0:_.error;if(S&&S.status&&S.message){let C=function(x){let z=x.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(z)>=0?z:k.UNKNOWN}(S.status);c(new V(C,S.message))}else c(new V(k.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new V(k.UNAVAILABLE,"Connection failed."));break;default:q()}}finally{M(Ne,`RPC '${e}' ${s} completed.`)}});let f=JSON.stringify(i);M(Ne,`RPC '${e}' ${s} sending request:`,i),h.send(t,"POST",f,r,15)})}Oo(e,t,r){let i=Tc(),s=[this.wo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=bc(),c=Ec(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.xmlHttpFactory=new vc({})),this.Fo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;let p=s.join("");M(Ne,`Creating RPC '${e}' stream ${i}: ${p}`,h);let y=a.createWebChannel(p,h),_=!1,S=!1,C=new ku({lo:x=>{S?M(Ne,`Not sending because RPC '${e}' stream ${i} is closed:`,x):(_||(M(Ne,`Opening RPC '${e}' stream ${i} transport.`),y.open(),_=!0),M(Ne,`RPC '${e}' stream ${i} sending:`,x),y.send(x))},ho:()=>y.close()}),O=(x,z,W)=>{x.listen(z,K=>{try{W(K)}catch(re){setTimeout(()=>{throw re},0)}})};return O(y,zn.EventType.OPEN,()=>{S||(M(Ne,`RPC '${e}' stream ${i} transport opened.`),C.mo())}),O(y,zn.EventType.CLOSE,()=>{S||(S=!0,M(Ne,`RPC '${e}' stream ${i} transport closed`),C.po())}),O(y,zn.EventType.ERROR,x=>{S||(S=!0,Jn(Ne,`RPC '${e}' stream ${i} transport errored:`,x),C.po(new V(k.UNAVAILABLE,"The operation could not be completed")))}),O(y,zn.EventType.MESSAGE,x=>{var z;if(!S){let W=x.data[0];ie(!!W);let K=W,re=K.error||((z=K[0])===null||z===void 0?void 0:z.error);if(re){M(Ne,`RPC '${e}' stream ${i} received error:`,re);let Te=re.status,Z=function(w){let I=ge[w];if(I!==void 0)return kp(I)}(Te),E=re.message;Z===void 0&&(Z=k.INTERNAL,E="Unknown error status: "+Te+" with message "+re.message),S=!0,C.po(new V(Z,E)),y.close()}else M(Ne,`RPC '${e}' stream ${i} received:`,W),C.yo(W)}}),O(c,Ic.STAT_EVENT,x=>{x.stat===Vs.PROXY?M(Ne,`RPC '${e}' stream ${i} detected buffering proxy`):x.stat===Vs.NOPROXY&&M(Ne,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.fo()},0),C}};function Ac(){return typeof document!="undefined"?document:null}function Eo(n){return new ru(n,!0)}var gi=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.oi=e,this.timerId=t,this.No=r,this.Lo=i,this.Bo=s,this.ko=0,this.qo=null,this.Qo=Date.now(),this.reset()}reset(){this.ko=0}Ko(){this.ko=this.Bo}$o(e){this.cancel();let t=Math.floor(this.ko+this.Uo()),r=Math.max(0,Date.now()-this.Qo),i=Math.max(0,t-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.qo=this.oi.enqueueAfterDelay(this.timerId,i,()=>(this.Qo=Date.now(),e())),this.ko*=this.Lo,this.ko<this.No&&(this.ko=this.No),this.ko>this.Bo&&(this.ko=this.Bo)}Wo(){this.qo!==null&&(this.qo.skipDelay(),this.qo=null)}cancel(){this.qo!==null&&(this.qo.cancel(),this.qo=null)}Uo(){return(Math.random()-.5)*this.ko}};var io=class{constructor(e,t,r,i,s,a,c,h){this.oi=e,this.Go=r,this.zo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.jo=0,this.Ho=null,this.Jo=null,this.stream=null,this.Yo=new gi(e,t)}Zo(){return this.state===1||this.state===5||this.Xo()}Xo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.e_()}async stop(){this.Zo()&&await this.close(0)}t_(){this.state=0,this.Yo.reset()}n_(){this.Xo()&&this.Ho===null&&(this.Ho=this.oi.enqueueAfterDelay(this.Go,6e4,()=>this.r_()))}i_(e){this.s_(),this.stream.send(e)}async r_(){if(this.Xo())return this.close(0)}s_(){this.Ho&&(this.Ho.cancel(),this.Ho=null)}o_(){this.Jo&&(this.Jo.cancel(),this.Jo=null)}async close(e,t){this.s_(),this.o_(),this.Yo.cancel(),this.jo++,e!==4?this.Yo.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(At(t.toString()),At("Using maximum backoff delay to prevent overloading the backend."),this.Yo.Ko()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.__(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ao(t)}__(){}auth(){this.state=1;let e=this.a_(this.jo),t=this.jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.jo===t&&this.u_(r,i)},r=>{e(()=>{let i=new V(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.c_(i)})})}u_(e,t){let r=this.a_(this.jo);this.stream=this.l_(e,t),this.stream.Po(()=>{r(()=>this.listener.Po())}),this.stream.To(()=>{r(()=>(this.state=2,this.Jo=this.oi.enqueueAfterDelay(this.zo,1e4,()=>(this.Xo()&&(this.state=3),Promise.resolve())),this.listener.To()))}),this.stream.Ao(i=>{r(()=>this.c_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}e_(){this.state=5,this.Yo.$o(async()=>{this.state=0,this.start()})}c_(e){return M("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}a_(e){return t=>{this.oi.enqueueAndForget(()=>this.jo===e?t():(M("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},xu=class extends io{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}l_(e,t){return this.connection.Oo("Listen",e,t)}onMessage(e){this.Yo.reset();let t=Iw(this.serializer,e),r=function(s){if(!("targetChange"in s))return H.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?H.min():a.readTime?We(a.readTime):H.min()}(e);return this.listener.h_(t,r)}P_(e){let t={};t.database=ou(this.serializer),t.addTarget=function(s,a){let c,h=a.target;if(c=Qc(h)?{documents:bw(s,h)}:{query:Tw(s,h)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Cp(s,a.resumeToken);let f=iu(s,a.expectedCount);f!==null&&(c.expectedCount=f)}else if(a.snapshotVersion.compareTo(H.min())>0){c.readTime=Zs(s,a.snapshotVersion.toTimestamp());let f=iu(s,a.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,e);let r=Sw(this.serializer,e);r&&(t.labels=r),this.i_(t)}I_(e){let t={};t.database=ou(this.serializer),t.removeTarget=e,this.i_(t)}},Du=class extends io{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s,this.T_=!1}get E_(){return this.T_}start(){this.T_=!1,this.lastStreamToken=void 0,super.start()}__(){this.T_&&this.d_([])}l_(e,t){return this.connection.Oo("Write",e,t)}onMessage(e){if(ie(!!e.streamToken),this.lastStreamToken=e.streamToken,this.T_){this.Yo.reset();let t=Ew(e.writeResults,e.commitTime),r=We(e.commitTime);return this.listener.A_(r,t)}return ie(!e.writeResults||e.writeResults.length===0),this.T_=!0,this.listener.R_()}V_(){let e={};e.database=ou(this.serializer),this.i_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Op(this.serializer,r))};this.i_(t)}};var Nu=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.m_=!1}f_(){if(this.m_)throw new V(k.FAILED_PRECONDITION,"The client has already been terminated.")}Co(e,t,r,i){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Co(e,su(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(k.UNKNOWN,s.toString())})}xo(e,t,r,i,s){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.xo(e,su(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(k.UNKNOWN,a.toString())})}terminate(){this.m_=!0,this.connection.terminate()}},Ou=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.g_=0,this.p_=null,this.y_=!0}w_(){this.g_===0&&(this.S_("Unknown"),this.p_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.p_=null,this.b_("Backend didn't respond within 10 seconds."),this.S_("Offline"),Promise.resolve())))}D_(e){this.state==="Online"?this.S_("Unknown"):(this.g_++,this.g_>=1&&(this.C_(),this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.S_("Offline")))}set(e){this.C_(),this.g_=0,e==="Online"&&(this.y_=!1),this.S_(e)}S_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}b_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.y_?(At(t),this.y_=!1):M("OnlineStateTracker",t)}C_(){this.p_!==null&&(this.p_.cancel(),this.p_=null)}};var Vu=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.v_=[],this.F_=new Map,this.M_=new Set,this.x_=[],this.O_=s,this.O_.io(a=>{r.enqueueAndForget(async()=>{An(this)&&(M("RemoteStore","Restarting streams for network reachability change."),await async function(h){let f=Q(h);f.M_.add(4),await Ai(f),f.N_.set("Unknown"),f.M_.delete(4),await bo(f)}(this))})}),this.N_=new Ou(r,i)}};async function bo(n){if(An(n))for(let e of n.x_)await e(!0)}async function Ai(n){for(let e of n.x_)await e(!1)}function Bp(n,e){let t=Q(n);t.F_.has(e.targetId)||(t.F_.set(e.targetId,e),El(t)?Il(t):ur(t).Xo()&&wl(t,e))}function vl(n,e){let t=Q(n),r=ur(t);t.F_.delete(e),r.Xo()&&qp(t,e),t.F_.size===0&&(r.Xo()?r.n_():An(t)&&t.N_.set("Unknown"))}function wl(n,e){if(n.L_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ur(n).P_(e)}function qp(n,e){n.L_.xe(e),ur(n).I_(e)}function Il(n){n.L_=new nu({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.F_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),ur(n).start(),n.N_.w_()}function El(n){return An(n)&&!ur(n).Zo()&&n.F_.size>0}function An(n){return Q(n).M_.size===0}function jp(n){n.L_=void 0}async function Bw(n){n.N_.set("Online")}async function qw(n){n.F_.forEach((e,t)=>{wl(n,e)})}async function jw(n,e){jp(n),El(n)?(n.N_.D_(e),Il(n)):n.N_.set("Unknown")}async function zw(n,e,t){if(n.N_.set("Online"),e instanceof $s&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let c of s.targetIds)i.F_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.F_.delete(c),i.L_.removeTarget(c))}(n,e)}catch(r){M("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await so(n,r)}else if(e instanceof Qn?n.L_.Ke(e):e instanceof Js?n.L_.He(e):n.L_.We(e),!t.isEqual(H.min()))try{let r=await Up(n.localStore);t.compareTo(r)>=0&&await function(s,a){let c=s.L_.rt(a);return c.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){let p=s.F_.get(f);p&&s.F_.set(f,p.withResumeToken(h.resumeToken,a))}}),c.targetMismatches.forEach((h,f)=>{let p=s.F_.get(h);if(!p)return;s.F_.set(h,p.withResumeToken(Ue.EMPTY_BYTE_STRING,p.snapshotVersion)),qp(s,h);let y=new fi(p.target,h,f,p.sequenceNumber);wl(s,y)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){M("RemoteStore","Failed to raise snapshot:",r),await so(n,r)}}async function so(n,e,t){if(!bi(e))throw e;n.M_.add(1),await Ai(n),n.N_.set("Offline"),t||(t=()=>Up(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M("RemoteStore","Retrying IndexedDB access"),await t(),n.M_.delete(1),await bo(n)})}function zp(n,e){return e().catch(t=>so(n,t,e))}async function To(n){let e=Q(n),t=Jt(e),r=e.v_.length>0?e.v_[e.v_.length-1].batchId:-1;for(;Gw(e);)try{let i=await Mw(e.localStore,r);if(i===null){e.v_.length===0&&t.n_();break}r=i.batchId,Kw(e,i)}catch(i){await so(e,i)}Gp(e)&&Kp(e)}function Gw(n){return An(n)&&n.v_.length<10}function Kw(n,e){n.v_.push(e);let t=Jt(n);t.Xo()&&t.E_&&t.d_(e.mutations)}function Gp(n){return An(n)&&!Jt(n).Zo()&&n.v_.length>0}function Kp(n){Jt(n).start()}async function Ww(n){Jt(n).V_()}async function Hw(n){let e=Jt(n);for(let t of n.v_)e.d_(t.mutations)}async function Qw(n,e,t){let r=n.v_.shift(),i=Xc.from(r,e,t);await zp(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await To(n)}async function Yw(n,e){e&&Jt(n).E_&&await async function(r,i){if(function(a){return Pp(a)&&a!==k.ABORTED}(i.code)){let s=r.v_.shift();Jt(r).t_(),await zp(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await To(r)}}(n,e),Gp(n)&&Kp(n)}async function Qf(n,e){let t=Q(n);t.asyncQueue.verifyOperationInProgress(),M("RemoteStore","RemoteStore received new credentials");let r=An(t);t.M_.add(3),await Ai(t),r&&t.N_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.M_.delete(3),await bo(t)}async function Jw(n,e){let t=Q(n);e?(t.M_.delete(2),await bo(t)):e||(t.M_.add(2),await Ai(t),t.N_.set("Unknown"))}function ur(n){return n.B_||(n.B_=function(t,r,i){let s=Q(t);return s.f_(),new xu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:Bw.bind(null,n),To:qw.bind(null,n),Ao:jw.bind(null,n),h_:zw.bind(null,n)}),n.x_.push(async e=>{e?(n.B_.t_(),El(n)?Il(n):n.N_.set("Unknown")):(await n.B_.stop(),jp(n))})),n.B_}function Jt(n){return n.k_||(n.k_=function(t,r,i){let s=Q(t);return s.f_(),new Du(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:()=>Promise.resolve(),To:Ww.bind(null,n),Ao:Yw.bind(null,n),R_:Hw.bind(null,n),A_:Qw.bind(null,n)}),n.x_.push(async e=>{e?(n.k_.t_(),await To(n)):(await n.k_.stop(),n.v_.length>0&&(M("RemoteStore",`Stopping write stream with ${n.v_.length} pending writes`),n.v_=[]))})),n.k_}var Mu=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new ht,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,c=new n(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function bl(n,e){if(At("AsyncQueue",`${e}: ${n}`),bi(n))return new V(k.UNAVAILABLE,`${e}: ${n}`);throw n}var oo=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||U.comparator(t.key,r.key):(t,r)=>U.comparator(t.key,r.key),this.keyedMap=ti(),this.sortedSet=new fe(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var ao=class{constructor(){this.q_=new fe(U.comparator)}track(e){let t=e.doc.key,r=this.q_.get(t);r?e.type!==0&&r.type===3?this.q_=this.q_.insert(t,e):e.type===3&&r.type!==1?this.q_=this.q_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.q_=this.q_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.q_=this.q_.remove(t):e.type===1&&r.type===2?this.q_=this.q_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):q():this.q_=this.q_.insert(t,e)}Q_(){let e=[];return this.q_.inorderTraversal((t,r)=>{e.push(r)}),e}},ir=class n{constructor(e,t,r,i,s,a,c,h,f){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new n(e,t,oo.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&wo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Lu=class{constructor(){this.K_=void 0,this.U_=[]}W_(){return this.U_.some(e=>e.G_())}},Fu=class{constructor(){this.queries=new Ht(e=>mp(e),wo),this.onlineState="Unknown",this.z_=new Set}};async function $w(n,e){let t=Q(n),r=3,i=e.query,s=t.queries.get(i);s?!s.W_()&&e.G_()&&(r=2):(s=new Lu,r=e.G_()?0:1);try{switch(r){case 0:s.K_=await t.onListen(i,!0);break;case 1:s.K_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let c=bl(a,`Initialization of query '${Gn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.U_.push(e),e.j_(t.onlineState),s.K_&&e.H_(s.K_)&&Tl(t)}async function Xw(n,e){let t=Q(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.U_.indexOf(e);a>=0&&(s.U_.splice(a,1),s.U_.length===0?i=e.G_()?0:1:!s.W_()&&e.G_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Zw(n,e){let t=Q(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let c of a.U_)c.H_(i)&&(r=!0);a.K_=i}}r&&Tl(t)}function eI(n,e,t){let r=Q(n),i=r.queries.get(e);if(i)for(let s of i.U_)s.onError(t);r.queries.delete(e)}function Tl(n){n.z_.forEach(e=>{e.next()})}var Uu,Yf;(Yf=Uu||(Uu={})).J_="default",Yf.Cache="cache";var Bu=class{constructor(e,t,r){this.query=e,this.Y_=t,this.Z_=!1,this.X_=null,this.onlineState="Unknown",this.options=r||{}}H_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new ir(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Z_?this.ea(e)&&(this.Y_.next(e),t=!0):this.ta(e,this.onlineState)&&(this.na(e),t=!0),this.X_=e,t}onError(e){this.Y_.error(e)}j_(e){this.onlineState=e;let t=!1;return this.X_&&!this.Z_&&this.ta(this.X_,e)&&(this.na(this.X_),t=!0),t}ta(e,t){if(!e.fromCache||!this.G_())return!0;let r=t!=="Offline";return(!this.options.ra||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ea(e){if(e.docChanges.length>0)return!0;let t=this.X_&&this.X_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}na(e){e=ir.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Z_=!0,this.Y_.next(e)}G_(){return this.options.source!==Uu.Cache}};var co=class{constructor(e){this.key=e}},uo=class{constructor(e){this.key=e}},qu=class{constructor(e,t){this.query=e,this.la=t,this.ha=null,this.hasCachedResults=!1,this.current=!1,this.Pa=$(),this.mutatedKeys=$(),this.Ia=gp(e),this.Ta=new oo(this.Ia)}get Ea(){return this.la}da(e,t){let r=t?t.Aa:new ao,i=t?t.Ta:this.Ta,s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1,h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,y)=>{let _=i.get(p),S=Io(this.query,y)?y:null,C=!!_&&this.mutatedKeys.has(_.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),x=!1;_&&S?_.data.isEqual(S.data)?C!==O&&(r.track({type:3,doc:S}),x=!0):this.Ra(_,S)||(r.track({type:2,doc:S}),x=!0,(h&&this.Ia(S,h)>0||f&&this.Ia(S,f)<0)&&(c=!0)):!_&&S?(r.track({type:0,doc:S}),x=!0):_&&!S&&(r.track({type:1,doc:_}),x=!0,(h||f)&&(c=!0)),x&&(S?(a=a.add(S),s=O?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{Ta:a,Aa:r,Xi:c,mutatedKeys:s}}Ra(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.Ta;this.Ta=e.Ta,this.mutatedKeys=e.mutatedKeys;let a=e.Aa.Q_();a.sort((p,y)=>function(S,C){let O=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q()}};return O(S)-O(C)}(p.type,y.type)||this.Ia(p.doc,y.doc)),this.Va(r),i=i!=null&&i;let c=t&&!i?this.ma():[],h=this.Pa.size===0&&this.current&&!i?1:0,f=h!==this.ha;return this.ha=h,a.length!==0||f?{snapshot:new ir(this.query,e.Ta,s,a,e.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),fa:c}:{fa:c}}j_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ta:this.Ta,Aa:new ao,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{fa:[]}}ga(e){return!this.la.has(e)&&!!this.Ta.has(e)&&!this.Ta.get(e).hasLocalMutations}Va(e){e&&(e.addedDocuments.forEach(t=>this.la=this.la.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.la=this.la.delete(t)),this.current=e.current)}ma(){if(!this.current)return[];let e=this.Pa;this.Pa=$(),this.Ta.forEach(r=>{this.ga(r.key)&&(this.Pa=this.Pa.add(r.key))});let t=[];return e.forEach(r=>{this.Pa.has(r)||t.push(new uo(r))}),this.Pa.forEach(r=>{e.has(r)||t.push(new co(r))}),t}pa(e){this.la=e.hs,this.Pa=$();let t=this.da(e.documents);return this.applyChanges(t,!0)}ya(){return ir.fromInitialDocuments(this.query,this.Ta,this.mutatedKeys,this.ha===0,this.hasCachedResults)}},ju=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},zu=class{constructor(e){this.key=e,this.wa=!1}},Gu=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Sa={},this.ba=new Ht(c=>mp(c),wo),this.Da=new Map,this.Ca=new Set,this.va=new fe(U.comparator),this.Fa=new Map,this.Ma=new mi,this.xa={},this.Oa=new Map,this.Na=pi.Ln(),this.onlineState="Unknown",this.La=void 0}get isPrimaryClient(){return this.La===!0}};async function tI(n,e,t=!0){let r=$p(n),i,s=r.ba.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.ya()):i=await Wp(r,e,t,!0),i}async function nI(n,e){let t=$p(n);await Wp(t,e,!0,!1)}async function Wp(n,e,t,r){let i=await Lw(n.localStore,ft(e)),s=i.targetId,a=t?n.sharedClientState.addLocalQueryTarget(s):"not-current",c;return r&&(c=await rI(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Bp(n.remoteStore,i),c}async function rI(n,e,t,r,i){n.Ba=(y,_,S)=>async function(O,x,z,W){let K=x.view.da(z);K.Xi&&(K=await Hf(O.localStore,x.query,!1).then(({documents:E})=>x.view.da(E,K)));let re=W&&W.targetChanges.get(x.targetId),Te=W&&W.targetMismatches.get(x.targetId)!=null,Z=x.view.applyChanges(K,O.isPrimaryClient,re,Te);return $f(O,x.targetId,Z.fa),Z.snapshot}(n,y,_,S);let s=await Hf(n.localStore,e,!0),a=new qu(e,s.hs),c=a.da(s.documents),h=di.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),f=a.applyChanges(c,n.isPrimaryClient,h);$f(n,t,f.fa);let p=new ju(e,t,a);return n.ba.set(e,p),n.Da.has(t)?n.Da.get(t).push(e):n.Da.set(t,[e]),f.snapshot}async function iI(n,e,t){let r=Q(n),i=r.ba.get(e),s=r.Da.get(i.targetId);if(s.length>1)return r.Da.set(i.targetId,s.filter(a=>!wo(a,e))),void r.ba.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Su(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&vl(r.remoteStore,i.targetId),Ku(r,i.targetId)}).catch(Ei)):(Ku(r,i.targetId),await Su(r.localStore,i.targetId,!0))}async function sI(n,e){let t=Q(n),r=t.ba.get(e),i=t.Da.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),vl(t.remoteStore,r.targetId))}async function oI(n,e,t){let r=fI(n);try{let i=await function(a,c){let h=Q(a),f=be.now(),p=c.reduce((S,C)=>S.add(C.key),$()),y,_;return h.persistence.runTransaction("Locally write mutations","readwrite",S=>{let C=Rt(),O=$();return h.os.getEntries(S,p).next(x=>{C=x,C.forEach((z,W)=>{W.isValidDocument()||(O=O.add(z))})}).next(()=>h.localDocuments.getOverlayedDocuments(S,C)).next(x=>{y=x;let z=[];for(let W of c){let K=dw(W,y.get(W.key).overlayedDocument);K!=null&&z.push(new mt(W.key,K,cp(K.value.mapValue),Se.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,z,c)}).next(x=>{_=x;let z=x.applyToLocalDocumentSet(y,O);return h.documentOverlayCache.saveOverlays(S,x.batchId,z)})}).then(()=>({batchId:_.batchId,changes:_p(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,h){let f=a.xa[a.currentUser.toKey()];f||(f=new fe(ne)),f=f.insert(c,h),a.xa[a.currentUser.toKey()]=f}(r,i.batchId,t),await Si(r,i.changes),await To(r.remoteStore)}catch(i){let s=bl(i,"Failed to persist write");t.reject(s)}}async function Hp(n,e){let t=Q(n);try{let r=await Ow(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Fa.get(s);a&&(ie(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.wa=!0:i.modifiedDocuments.size>0?ie(a.wa):i.removedDocuments.size>0&&(ie(a.wa),a.wa=!1))}),await Si(t,r,e)}catch(r){await Ei(r)}}function Jf(n,e,t){let r=Q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.ba.forEach((s,a)=>{let c=a.view.j_(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){let h=Q(a);h.onlineState=c;let f=!1;h.queries.forEach((p,y)=>{for(let _ of y.U_)_.j_(c)&&(f=!0)}),f&&Tl(h)}(r.eventManager,e),i.length&&r.Sa.h_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function aI(n,e,t){let r=Q(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Fa.get(e),s=i&&i.key;if(s){let a=new fe(U.comparator);a=a.insert(s,He.newNoDocument(s,H.min()));let c=$().add(s),h=new Ys(H.min(),new Map,new fe(ne),a,c);await Hp(r,h),r.va=r.va.remove(s),r.Fa.delete(e),Al(r)}else await Su(r.localStore,e,!1).then(()=>Ku(r,e,t)).catch(Ei)}async function cI(n,e){let t=Q(n),r=e.batch.batchId;try{let i=await Nw(t.localStore,e);Yp(t,r,null),Qp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Si(t,i)}catch(i){await Ei(i)}}async function uI(n,e,t){let r=Q(n);try{let i=await function(a,c){let h=Q(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return h.mutationQueue.lookupMutationBatch(f,c).next(y=>(ie(y!==null),p=y.keys(),h.mutationQueue.removeMutationBatch(f,y))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,p,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>h.localDocuments.getDocuments(f,p))})}(r.localStore,e);Yp(r,e,t),Qp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Si(r,i)}catch(i){await Ei(i)}}function Qp(n,e){(n.Oa.get(e)||[]).forEach(t=>{t.resolve()}),n.Oa.delete(e)}function Yp(n,e,t){let r=Q(n),i=r.xa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.xa[r.currentUser.toKey()]=i}}function Ku(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Da.get(e))n.ba.delete(r),t&&n.Sa.ka(r,t);n.Da.delete(e),n.isPrimaryClient&&n.Ma.Vr(e).forEach(r=>{n.Ma.containsKey(r)||Jp(n,r)})}function Jp(n,e){n.Ca.delete(e.path.canonicalString());let t=n.va.get(e);t!==null&&(vl(n.remoteStore,t),n.va=n.va.remove(e),n.Fa.delete(t),Al(n))}function $f(n,e,t){for(let r of t)r instanceof co?(n.Ma.addReference(r.key,e),lI(n,r)):r instanceof uo?(M("SyncEngine","Document no longer in limbo: "+r.key),n.Ma.removeReference(r.key,e),n.Ma.containsKey(r.key)||Jp(n,r.key)):q()}function lI(n,e){let t=e.key,r=t.path.canonicalString();n.va.get(t)||n.Ca.has(r)||(M("SyncEngine","New document in limbo: "+t),n.Ca.add(r),Al(n))}function Al(n){for(;n.Ca.size>0&&n.va.size<n.maxConcurrentLimboResolutions;){let e=n.Ca.values().next().value;n.Ca.delete(e);let t=new U(ce.fromString(e)),r=n.Na.next();n.Fa.set(r,new zu(t)),n.va=n.va.insert(t,r),Bp(n.remoteStore,new fi(ft(yl(t.path)),r,"TargetPurposeLimboResolution",ai.oe))}}async function Si(n,e,t){let r=Q(n),i=[],s=[],a=[];r.ba.isEmpty()||(r.ba.forEach((c,h)=>{a.push(r.Ba(h,e,t).then(f=>{if((f||t)&&r.isPrimaryClient){let p=f&&!f.fromCache;r.sharedClientState.updateQueryState(h.targetId,p?"current":"not-current")}if(f){i.push(f);let p=Eu.Ki(h.targetId,f);s.push(p)}}))}),await Promise.all(a),r.Sa.h_(i),await async function(h,f){let p=Q(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>D.forEach(f,_=>D.forEach(_.qi,S=>p.persistence.referenceDelegate.addReference(y,_.targetId,S)).next(()=>D.forEach(_.Qi,S=>p.persistence.referenceDelegate.removeReference(y,_.targetId,S)))))}catch(y){if(!bi(y))throw y;M("LocalStore","Failed to update sequence numbers: "+y)}for(let y of f){let _=y.targetId;if(!y.fromCache){let S=p.ns.get(_),C=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(C);p.ns=p.ns.insert(_,O)}}}(r.localStore,s))}async function hI(n,e){let t=Q(n);if(!t.currentUser.isEqual(e)){M("SyncEngine","User change. New user:",e.toKey());let r=await Fp(t.localStore,e);t.currentUser=e,function(s,a){s.Oa.forEach(c=>{c.forEach(h=>{h.reject(new V(k.CANCELLED,a))})}),s.Oa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Si(t,r.us)}}function dI(n,e){let t=Q(n),r=t.Fa.get(e);if(r&&r.wa)return $().add(r.key);{let i=$(),s=t.Da.get(e);if(!s)return i;for(let a of s){let c=t.ba.get(a);i=i.unionWith(c.view.Ea)}return i}}function $p(n){let e=Q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Hp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=dI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=aI.bind(null,e),e.Sa.h_=Zw.bind(null,e.eventManager),e.Sa.ka=eI.bind(null,e.eventManager),e}function fI(n){let e=Q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=uI.bind(null,e),e}var lo=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Eo(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return Dw(this.persistence,new Tu,e.initialUser,this.serializer)}createPersistence(e){return new vu(Iu.Hr,this.serializer)}createSharedClientState(e){return new Ru}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var Wu=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Jf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=hI.bind(null,this.syncEngine),await Jw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Fu}()}createDatastore(e){let t=Eo(e.databaseInfo.databaseId),r=function(s){return new Cu(s)}(e.databaseInfo);return function(s,a,c,h){return new Nu(s,a,c,h)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new Vu(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Jf(this.syncEngine,t,0),function(){return ro.D()?new ro:new Pu}())}createSyncEngine(e,t){return function(i,s,a,c,h,f,p){let y=new Gu(i,s,a,c,h,f);return p&&(y.La=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(r){let i=Q(r);M("RemoteStore","RemoteStore shutting down."),i.M_.add(5),await Ai(i),i.O_.shutdown(),i.N_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate()}};var Hu=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ka(this.observer.next,e)}error(e){this.observer.error?this.Ka(this.observer.error,e):At("Uncaught Error in snapshot listener:",e.toString())}$a(){this.muted=!0}Ka(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var Qu=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new V(k.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(i,s){let a=Q(i),c={documents:s.map(y=>eo(a.serializer,y))},h=await a.xo("BatchGetDocuments",a.serializer.databaseId,ce.emptyPath(),c,s.length),f=new Map;h.forEach(y=>{let _=ww(a.serializer,y);f.set(_.key.toString(),_)});let p=[];return s.forEach(y=>{let _=f.get(y.toString());ie(!!_),p.push(_)}),p}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new bn(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{let i=U.fromPath(r);this.mutations.push(new Qs(i,this.precondition(i)))}),await async function(r,i){let s=Q(r),a={writes:i.map(c=>Op(s.serializer,c))};await s.Co("Commit",s.serializer.databaseId,ce.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw q();t=H.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new V(k.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(H.min())?Se.exists(!1):Se.updateTime(t):Se.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(H.min()))throw new V(k.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Se.updateTime(t)}return Se.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};var Yu=class{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.Za=r.maxAttempts,this.Yo=new gi(this.asyncQueue,"transaction_retry")}Xa(){this.Za-=1,this.eu()}eu(){this.Yo.$o(async()=>{let e=new Qu(this.datastore),t=this.tu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.nu(i)}))}).catch(r=>{this.nu(r)})})}tu(e){try{let t=this.updateFunction(e);return!Ti(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}nu(e){this.Za>0&&this.ru(e)?(this.Za-=1,this.asyncQueue.enqueueAndForget(()=>(this.eu(),Promise.resolve()))):this.deferred.reject(e)}ru(e){if(e.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Pp(t)}return!1}};var Ju=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=Ae.UNAUTHENTICATED,this.clientId=qs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{M("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(M("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new V(k.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new ht;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=bl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Sc(n,e){n.asyncQueue.verifyOperationInProgress(),M("FirestoreClient","Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Fp(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Xf(n,e){n.asyncQueue.verifyOperationInProgress();let t=await mI(n);M("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Qf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Qf(e.remoteStore,i)),n._onlineComponents=e}function pI(n){return n.name==="FirebaseError"?n.code===k.FAILED_PRECONDITION||n.code===k.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function mI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M("FirestoreClient","Using user provided OfflineComponentProvider");try{await Sc(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!pI(t))throw t;Jn("Error using user provided cache. Falling back to memory cache: "+t),await Sc(n,new lo)}}else M("FirestoreClient","Using default OfflineComponentProvider"),await Sc(n,new lo);return n._offlineComponents}async function Sl(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M("FirestoreClient","Using user provided OnlineComponentProvider"),await Xf(n,n._uninitializedComponentsProvider._online)):(M("FirestoreClient","Using default OnlineComponentProvider"),await Xf(n,new Wu))),n._onlineComponents}function gI(n){return Sl(n).then(e=>e.syncEngine)}function yI(n){return Sl(n).then(e=>e.datastore)}async function Zf(n){let e=await Sl(n),t=e.eventManager;return t.onListen=tI.bind(null,e.syncEngine),t.onUnlisten=iI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=nI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=sI.bind(null,e.syncEngine),t}function Xp(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var ep=new Map;function Zp(n,e,t){if(!t)throw new V(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function _I(n,e,t,r){if(e===!0&&r===!0)throw new V(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function tp(n){if(!U.isDocumentKey(n))throw new V(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function np(n){if(U.isDocumentKey(n))throw new V(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ao(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":q()}function Ze(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Ao(n);throw new V(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function em(n,e){if(e<=0)throw new V(k.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}var ho=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}_I("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Xp((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new V(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new V(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new V(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},sr=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ho({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new V(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new V(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ho(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Rc;switch(r.type){case"firstParty":return new xc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=ep.get(t);r&&(M("ComponentProvider","Removing Datastore"),ep.delete(t),r.terminate())}(this),Promise.resolve()}};function Rl(n,e,t,r={}){var i;let s=(n=Ze(n,sr))._getSettings(),a=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&Jn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let c,h;if(typeof r.mockUserToken=="string")c=r.mockUserToken,h=Ae.MOCK_USER;else{c=sd(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new V(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new Ae(f)}n._authCredentials=new Pc(new Bs(c,h))}}var $t=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Ve=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Gt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},Gt=class n extends $t{constructor(e,t,r){super(e,t,yl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Ve(this.firestore,null,new U(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Me(n,e,...t){if(n=ue(n),Zp("collection","path",e),n instanceof sr){let r=ce.fromString(e,...t);return np(r),new Gt(n,null,r)}{if(!(n instanceof Ve||n instanceof Gt))throw new V(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ce.fromString(e,...t));return np(r),new Gt(n.firestore,null,r)}}function me(n,e,...t){if(n=ue(n),arguments.length===1&&(e=qs.newId()),Zp("doc","path",e),n instanceof sr){let r=ce.fromString(e,...t);return tp(r),new Ve(n,null,new U(r))}{if(!(n instanceof Ve||n instanceof Gt))throw new V(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ce.fromString(e,...t));return tp(r),new Ve(n.firestore,n instanceof Gt?n.converter:null,new U(r))}}var $u=class{constructor(){this.iu=Promise.resolve(),this.su=[],this.ou=!1,this._u=[],this.au=null,this.uu=!1,this.cu=!1,this.lu=[],this.Yo=new gi(this,"async_queue_retry"),this.hu=()=>{let t=Ac();t&&M("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Yo.Wo()};let e=Ac();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.hu)}get isShuttingDown(){return this.ou}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.ou){this.ou=!0,this.cu=e||!1;let t=Ac();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hu)}}enqueue(e){if(this.Pu(),this.ou)return new Promise(()=>{});let t=new ht;return this.Iu(()=>this.ou&&this.cu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.su.push(e),this.Tu()))}async Tu(){if(this.su.length!==0){try{await this.su[0](),this.su.shift(),this.Yo.reset()}catch(e){if(!bi(e))throw e;M("AsyncQueue","Operation failed with retryable error: "+e)}this.su.length>0&&this.Yo.$o(()=>this.Tu())}}Iu(e){let t=this.iu.then(()=>(this.uu=!0,e().catch(r=>{this.au=r,this.uu=!1;let i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw At("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.uu=!1,r))));return this.iu=t,t}enqueueAfterDelay(e,t,r){this.Pu(),this.lu.indexOf(e)>-1&&(t=0);let i=Mu.createAndSchedule(this,e,t,r,s=>this.Eu(s));return this._u.push(i),i}Pu(){this.au&&q()}verifyOperationInProgress(){}async du(){let e;do e=this.iu,await e;while(e!==this.iu)}Au(e){for(let t of this._u)if(t.timerId===e)return!0;return!1}Ru(e){return this.du().then(()=>{this._u.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this._u)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.du()})}Vu(e){this.lu.push(e)}Eu(e){let t=this._u.indexOf(e);this._u.splice(t,1)}};function rp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var ot=class extends sr{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new $u}(),this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||nm(this),this._firestoreClient.terminate()}};function tm(n,e){let t=typeof n=="object"?n:ts(),r=typeof n=="string"?n:e||"(default)",i=Ur(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=id("firestore");s&&Rl(i,...s)}return i}function So(n){return n._firestoreClient||nm(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function nm(n){var e,t,r;let i=n._freezeSettings(),s=function(c,h,f,p){return new Mc(c,h,f,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Xp(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new Ju(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var or=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Ue.fromBase64String(e))}catch(t){throw new V(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Ue.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Xt=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Zt=class{constructor(e){this._methodName=e}};var yi=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ne(this._lat,e._lat)||ne(this._long,e._long)}};var vI=/^__.*__$/,Xu=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new mt(e,this.data,this.fieldMask,t,this.fieldTransforms):new En(e,this.data,t,this.fieldTransforms)}},fo=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new mt(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function rm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q()}}var po=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.mu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get fu(){return this.settings.fu}gu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}pu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.wu(e),i}Su(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.mu(),i}bu(e){return this.gu({path:void 0,yu:!0})}Du(e){return go(e,this.settings.methodName,this.settings.Cu||!1,this.path,this.settings.vu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}mu(){if(this.path)for(let e=0;e<this.path.length;e++)this.wu(this.path.get(e))}wu(e){if(e.length===0)throw this.Du("Document fields must not be empty");if(rm(this.fu)&&vI.test(e))throw this.Du('Document fields cannot begin and end with "__"')}},Zu=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Eo(e)}Fu(e,t,r,i=!1){return new po({fu:e,methodName:t,vu:r,path:Ke.emptyPath(),yu:!1,Cu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function lr(n){let e=n._freezeSettings(),t=Eo(n._databaseId);return new Zu(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ro(n,e,t,r,i,s={}){let a=n.Fu(s.merge||s.mergeFields?2:0,e,t,i);Cl("Data must be an object, but it was:",a,r);let c=sm(r,a),h,f;if(s.merge)h=new Xe(a.fieldMask),f=a.fieldTransforms;else if(s.mergeFields){let p=[];for(let y of s.mergeFields){let _=rl(e,y,t);if(!a.contains(_))throw new V(k.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);am(p,_)||p.push(_)}h=new Xe(p),f=a.fieldTransforms.filter(y=>h.covers(y.field))}else h=null,f=a.fieldTransforms;return new Xu(new Be(c),h,f)}var mo=class n extends Zt{_toFieldTransform(e){if(e.fu!==2)throw e.fu===1?e.Du(`${this._methodName}() can only appear at the top level of your update data`):e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function im(n,e,t){return new po({fu:3,vu:e.settings.vu,methodName:n._methodName,yu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}var el=class n extends Zt{_toFieldTransform(e){return new hi(e.path,new In)}isEqual(e){return e instanceof n}},tl=class n extends Zt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=im(this,e,!0),r=this.Mu.map(s=>Sn(s,t)),i=new Qt(r);return new hi(e.path,i)}isEqual(e){return e instanceof n&&It(this.Mu,e.Mu)}},nl=class n extends Zt{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=im(this,e,!0),r=this.Mu.map(s=>Sn(s,t)),i=new Yt(r);return new hi(e.path,i)}isEqual(e){return e instanceof n&&It(this.Mu,e.Mu)}};function Pl(n,e,t,r){let i=n.Fu(1,e,t);Cl("Data must be an object, but it was:",i,r);let s=[],a=Be.empty();Tn(r,(h,f)=>{let p=xl(e,h,t);f=ue(f);let y=i.Su(p);if(f instanceof mo)s.push(p);else{let _=Sn(f,y);_!=null&&(s.push(p),a.set(p,_))}});let c=new Xe(s);return new fo(a,c,i.fieldTransforms)}function kl(n,e,t,r,i,s){let a=n.Fu(1,e,t),c=[rl(e,r,t)],h=[i];if(s.length%2!=0)throw new V(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)c.push(rl(e,s[_])),h.push(s[_+1]);let f=[],p=Be.empty();for(let _=c.length-1;_>=0;--_)if(!am(f,c[_])){let S=c[_],C=h[_];C=ue(C);let O=a.Su(S);if(C instanceof mo)f.push(S);else{let x=Sn(C,O);x!=null&&(f.push(S),p.set(S,x))}}let y=new Xe(f);return new fo(p,y,a.fieldTransforms)}function wI(n,e,t,r=!1){return Sn(t,n.Fu(r?4:3,e))}function Sn(n,e){if(om(n=ue(n)))return Cl("Unsupported field value:",e,n),sm(n,e);if(n instanceof Zt)return function(r,i){if(!rm(i.fu))throw i.Du(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Du(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.yu&&e.fu!==4)throw e.Du("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let c of r){let h=Sn(c,i.bu(a));h==null&&(h={nullValue:"NULL_VALUE"}),s.push(h),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ue(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return aw(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=be.fromDate(r);return{timestampValue:Zs(i.serializer,s)}}if(r instanceof be){let s=new be(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zs(i.serializer,s)}}if(r instanceof yi)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof or)return{bytesValue:Cp(i.serializer,r._byteString)};if(r instanceof Ve){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Du(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:_l(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Du(`Unsupported field value: ${Ao(r)}`)}(n,e)}function sm(n,e){let t={};return op(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Tn(n,(r,i)=>{let s=Sn(i,e.pu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function om(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof be||n instanceof yi||n instanceof or||n instanceof Ve||n instanceof Zt)}function Cl(n,e,t){if(!om(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=Ao(t);throw r==="an object"?e.Du(n+" a custom object"):e.Du(n+" "+r)}}function rl(n,e,t){if((e=ue(e))instanceof Xt)return e._internalPath;if(typeof e=="string")return xl(n,e);throw go("Field path arguments must be of type string or ",n,!1,void 0,t)}var II=new RegExp("[~\\*/\\[\\]]");function xl(n,e,t){if(e.search(II)>=0)throw go(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Xt(...e.split("."))._internalPath}catch{throw go(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function go(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(s||a)&&(h+=" (found",s&&(h+=` in field ${r}`),a&&(h+=` in document ${i}`),h+=")"),new V(k.INVALID_ARGUMENT,c+n+h)}function am(n,e){return n.some(t=>t.isEqual(e))}var ar=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ve(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new il(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Po("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},il=class extends ar{data(){return super.data()}};function Po(n,e){return typeof e=="string"?xl(n,e):e instanceof Xt?e._internalPath:e._delegate._internalPath}function EI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var _i=class{},vi=class extends _i{};function Ri(n,e,...t){let r=[];e instanceof _i&&r.push(e),r=r.concat(t),function(s){let a=s.filter(h=>h instanceof sl).length,c=s.filter(h=>h instanceof yo).length;if(a>1||a>0&&c>0)throw new V(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var yo=class n extends vi{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return um(e._query,t),new $t(e.firestore,e.converter,Yc(e._query,t))}_parse(e){let t=lr(e.firestore);return function(s,a,c,h,f,p,y){let _;if(f.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new V(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){sp(y,p);let S=[];for(let C of y)S.push(ip(h,s,C));_={arrayValue:{values:S}}}else _=ip(h,s,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||sp(y,p),_=wI(c,a,y,p==="in"||p==="not-in");return _e.create(f,p,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function Dl(n,e,t){let r=e,i=Po("where",n);return yo._create(i,r,t)}var sl=class n extends _i{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:st.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i,c=s.getFlattenedFilters();for(let h of c)um(a,h),a=Yc(a,h)}(e._query,t),new $t(e.firestore,e.converter,Yc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var ol=class n extends vi{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,a){if(i.startAt!==null)throw new V(k.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new V(k.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new wn(s,a)}(e._query,this._field,this._direction);return new $t(e.firestore,e.converter,function(i,s){let a=i.explicitOrderBy.concat([s]);return new Wt(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function ko(n,e="asc"){let t=e,r=Po("orderBy",n);return ol._create(r,t)}var _o=class n extends vi{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new $t(e.firestore,e.converter,Hs(e._query,this._limit,this._limitType))}};function Nl(n){return em("limit",n),_o._create("limit",n,"F")}function cm(n){return em("limitToLast",n),_o._create("limitToLast",n,"L")}function ip(n,e,t){if(typeof(t=ue(t))=="string"){if(t==="")throw new V(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!pp(e)&&t.indexOf("/")!==-1)throw new V(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(ce.fromString(t));if(!U.isDocumentKey(r))throw new V(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Cf(n,new U(r))}if(t instanceof Ve)return Cf(n,t._key);throw new V(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ao(t)}.`)}function sp(n,e){if(!Array.isArray(n)||n.length===0)throw new V(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function um(n,e){let t=function(i,s){for(let a of i)for(let c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var vo=class{convertValue(e,t="none"){switch(vn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return de(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Kt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw q()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return Tn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new yi(de(e.latitude),de(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=fl(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ui(e));default:return null}}convertTimestamp(e){let t=St(e);return new be(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=ce.fromString(e);ie(Lp(r));let i=new Ks(r.get(1),r.get(3)),s=new U(r.popFirst(5));return i.isEqual(t)||At(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function Co(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var al=class extends vo{constructor(e){super(),this.firestore=e}convertBytes(e){return new or(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ve(this.firestore,null,t)}};var zt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},wi=class extends ar{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Yn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Po("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},Yn=class extends wi{data(e={}){return super.data(e)}},cl=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new zt(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Yn(this._firestore,this._userDataWriter,r.key,r,new zt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{let h=new Yn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new zt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let h=new Yn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new zt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),f=-1,p=-1;return c.type!==0&&(f=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:bI(c.type),doc:h,oldIndex:f,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function bI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q()}}var Ii=class extends vo{constructor(e){super(),this.firestore=e}convertBytes(e){return new or(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ve(this.firestore,null,t)}};function Rn(n,e,t){n=Ze(n,Ve);let r=Ze(n.firestore,ot),i=Co(n.converter,e,t);return Pi(r,[Ro(lr(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Se.none())])}function Pn(n,e,t,...r){n=Ze(n,Ve);let i=Ze(n.firestore,ot),s=lr(i),a;return a=typeof(e=ue(e))=="string"||e instanceof Xt?kl(s,"updateDoc",n._key,e,t,r):Pl(s,"updateDoc",n._key,e),Pi(i,[a.toMutation(n._key,Se.exists(!0))])}function hr(n){return Pi(Ze(n.firestore,ot),[new bn(n._key,Se.none())])}function kn(n,e){let t=Ze(n.firestore,ot),r=me(n),i=Co(n.converter,e);return Pi(t,[Ro(lr(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Se.exists(!1))]).then(()=>r)}function gt(n,...e){var t,r,i;n=ue(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||rp(e[a])||(s=e[a],a++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(rp(e[a])){let y=e[a];e[a]=(t=y.next)===null||t===void 0?void 0:t.bind(y),e[a+1]=(r=y.error)===null||r===void 0?void 0:r.bind(y),e[a+2]=(i=y.complete)===null||i===void 0?void 0:i.bind(y)}let h,f,p;if(n instanceof Ve)f=Ze(n.firestore,ot),p=yl(n._key.path),h={next:y=>{e[a]&&e[a](TI(f,n,y))},error:e[a+1],complete:e[a+2]};else{let y=Ze(n,$t);f=Ze(y.firestore,ot),p=y._query;let _=new Ii(f);h={next:S=>{e[a]&&e[a](new cl(f,_,y,S))},error:e[a+1],complete:e[a+2]},EI(n._query)}return function(_,S,C,O){let x=new Hu(O),z=new Bu(S,x,C);return _.asyncQueue.enqueueAndForget(async()=>$w(await Zf(_),z)),()=>{x.$a(),_.asyncQueue.enqueueAndForget(async()=>Xw(await Zf(_),z))}}(So(f),p,c,h)}function Pi(n,e){return function(r,i){let s=new ht;return r.asyncQueue.enqueueAndForget(async()=>oI(await gI(r),i,s)),s.promise}(So(n),e)}function TI(n,e,t){let r=t.docs.get(e._key),i=new Ii(n);return new wi(n,i,e._key,r,new zt(t.hasPendingWrites,t.fromCache),e.converter)}var AI={maxAttempts:5};var ul=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=lr(e)}set(e,t,r){this._verifyNotCommitted();let i=jt(e,this._firestore),s=Co(i.converter,t,r),a=Ro(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Se.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=jt(e,this._firestore),a;return a=typeof(t=ue(t))=="string"||t instanceof Xt?kl(this._dataReader,"WriteBatch.update",s._key,t,r,i):Pl(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,Se.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=jt(e,this._firestore);return this._mutations=this._mutations.concat(new bn(t._key,Se.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(k.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function jt(n,e){if((n=ue(n)).firestore!==e)throw new V(k.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}var ll=class extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=lr(t)}get(t){let r=jt(t,this._firestore),i=new al(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return q();let a=s[0];if(a.isFoundDocument())return new ar(this._firestore,i,a.key,a,r.converter);if(a.isNoDocument())return new ar(this._firestore,i,r._key,null,r.converter);throw q()})}set(t,r,i){let s=jt(t,this._firestore),a=Co(s.converter,r,i),c=Ro(this._dataReader,"Transaction.set",s._key,a,s.converter!==null,i);return this._transaction.set(s._key,c),this}update(t,r,i,...s){let a=jt(t,this._firestore),c;return c=typeof(r=ue(r))=="string"||r instanceof Xt?kl(this._dataReader,"Transaction.update",a._key,r,i,s):Pl(this._dataReader,"Transaction.update",a._key,r),this._transaction.update(a._key,c),this}delete(t){let r=jt(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=jt(e,this._firestore),r=new Ii(this._firestore);return super.get(e).then(i=>new wi(this._firestore,r,t._key,i._document,new zt(!1,!1),t.converter))}};function ve(n,e,t){n=Ze(n,ot);let r=Object.assign(Object.assign({},AI),t);return function(s){if(s.maxAttempts<1)throw new V(k.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,a,c){let h=new ht;return s.asyncQueue.enqueueAndForget(async()=>{let f=await yI(s);new Yu(s.asyncQueue,f,c,a,h).Xa()}),h.promise}(So(n),i=>e(new ll(n,i)),r)}function qe(){return new el("serverTimestamp")}function xo(...n){return new tl("arrayUnion",n)}function Ol(...n){return new nl("arrayRemove",n)}function lm(n){return So(n=Ze(n,ot)),new ul(n,e=>Pi(n,e))}(function(e,t=!0){(function(i){cr=i})(Vt),Ot(new Je("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),c=new ot(new kc(r.getProvider("auth-internal")),new Nc(r.getProvider("app-check-internal")),function(f,p){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new V(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ks(f.options.projectId,p)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),nt(Rf,"4.6.3",e),nt(Rf,"4.6.3","esm2017")})();var hm="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAxKklEQVR42u29eZwk11Xn+z33RmTWXt3Vm3qRWmqpu6XWjlZbki0ZvGGbwQJ9eGMNjGEYHp8ZzLA9PAOPbRjMzMAMho/x8Hk8GBt7ZPDKYjAw2DzbYLABC0tq2fIiWWvbaqlbXeqqysyIuOf9cW9k3IjMrKrurqq2ZzrqE5+KzIyMjLjn3HN+53fOvRfObee2c9u57dx2bju3ndvObf/bbfK/6W9/LW76v7IQBJAXgwH4KBRn64G/ljvji8GG9nGhffTrXQHMi8F8FPLmBy+G5EuQzmzbZntFYfofHAPm/OFc/eXX3XYseobmswG0rHXzR48WF0M2qo2CMrivNwUoBVreuL2i1drvWq3bjHOXO5GLUb1QRGZQnQTS/g0JGAkmQ8Lr+FikMimAMdX3hOHHp/OgZddTrV4PO3au3lWdKqr+cxfOU/WfO62+F7YMkQVVnUfky0b1S86Yw6bX+/gDvd4X8JZyWHt+zSpAKRcHcNnk5OWi+m0i8q3A5UakJf0GrLdEKWAhKEBD8CLiXzfObf7fSAUY+F8KOjxfUxFc49z68wtl2zjVHnBYVX9fRd732YWFw5EirKlrWEsFsKXGXj41dYs694Mq8tpEJFXVUnULBZVKUYSoJ/eFH732iiA1a0DTSoT34gs2j5d7YIkF3lQCjVp82HHUu2n0eodWn7vICkSvaehUuF1rglLkqpmofkCM+bXDJ0/+dbOtvxYUoN/rLxsb24u1PyvweiPizSHkZWce9nsiYBu9v9xB+se1nh9r0BBLAIPHNCxCvLno5lSHW4Hm8cD/2ApESuGCtpTHsRUohliChkI4gSRqy7dRFD/72U7n0bWyBrIGwleAQ5OTdwv8khHZWfinKqgEP/SLpam3pfCM/4IJJj92A2YZs7+iG2g8qTSEPwX0wi6RCJRTMP+N/24ABwQlADT0/lIBnC4rxdKrWOsV4YjCjz24sHDPEAN2Wmb7TICeXgfppomJXzUi/xGYLirBDwi/vNO41xvxgrelsI1gSuGHz8r/It41mPh/tA98p3+eeAxR/jf+PyK0RbizgC9ZoSeCRYLySWVBZIirkeF4hNjt1NyPP1HUn6cNBVUJbTMoTSlBoINCYEbg27am6da9WfYXR6r21o1UAAO4fTCrk5O/Z435Z84r9MrXDMI3DSUoe30s2KYFsA03UCpCUzGqz7zQkbrSlArYEXiBKi9x8PdWWBBIIqmUCjNK0LFSNMMfRuCRJijpS05WJUFTehJrzM29NL12Jsv+5Dh0TlcJ7Oma/UtgJp2Y+KAVeWmhmgskK7kUCQ1sqHqpDejeiEc+NsIBNqChWPil8hiq75bWw8T/I0xh49fhfCcwA3x7DrMCTwo8bqA1xOUMRCU0QajWXE4tetG6EkjUxb0iqe/5GklQV2x/41RzK3KpSZIXbsrz9x/zSiDrrQByl7/P1IyPvzsx5psi4bOS8G3UaDb0SCvSb+Ak6tk2shC2dBMmUgAjAxZkwB2YumsorUMi0BN4iYMrA/TOBB604R5GKcEQvNHHK7GApRKmaQDPYe9LhAFkdZYAAeMgT4y5SJLkyu15/r7bgQfXUQHkLjDvgWJuYuJXE2PuzlUzgVRXQIh9gZc93wTzjPSF0he2qXpyiQ2qnl/58r5rMA08YAbNvTTwQi5wHvCtzl9PRZhEOGy9Ygzr/UP9fi3i8JIvlaFm8bUPAfp+vjxBtRHWaOUOdAWEF5QgS4y5LE/TuY9l2R/fBfbBU3AFp6IA5kFwl46N/VNrzH/KV2n2iYUfCykIP3YHMqz39n281AUyBARaM6Tnx4oQzikEXumEixSy0MDTwLMGHrPQpiHghkLE/j/GAP2GMDIABgcyPkGyKnVJx5+vUoqmgMKK3LzF2s9/LM/vC3LV1frzVSP+g+PjO4H7jMicVpZs2YvbSIiVr66EXxMWdXAoMTiMwsQaTTyCExgmJAN0gYsU/nkmnpwKD9IWeFiUt6fhYYcxgENif6dDWEBXsYHx50WJ4KJQ0YVznfM0sovCQw3IehWSdALiVI8BVz20tHQkZmRXw9mvjh015k2JMVtcFXqs6PdLIVQIXrxCNLh+I40eH0y+QWrArw8WY3cRuwJTP8dEoaARoSXCiwshDaFX6ZJ6AheqYT9CLkJqIixihv/G0HuJgSfBXQ2zWs3IwlTch20o+Wo6qIMiMWaLGPMLpxINrCjEnwkh3/7x8RtF9TtzVQdYjWioYXv/5k308DGz1/D1g4xfwAemooZjU25MXSFqEUAk8DIUTAR6Bq5W2K9Ct4z5wx/4c24qhLT/+1JdZ4gS9l+bIaFphHdKwUpD0fukV00xpN8JiK67UnsDNld1qH7XgfHxGwD3M6uQ76otgBH5sQjcyorccMP3S8nnmyoUiwVsY0LISBTqRd8x0feGIH4bogq/R71TQA1sAW4vBBf9dklZWeMVZD9wKZAbSGs9PFzXDJJQ/d8vFYM6uVWLWkyD+TR1gBy3Vf/5ZVW+uuSTjIj8X2tFBfve32pdJknyGeMR/4oKYCPwZUOs3wzXbJMFbPYAAikzhOkzA2ljGYjT49jbCHQFXtUTri+EJdGhmq94HuBJgXe2tObry0QPpT8PoCDGAS4+1ipBlJfXcT5BVH5WBD/vYnwQ0ciFavV+xLQt56YFxEGmeX71F3q9z5YyPC0LcFfZlklylxVJg++X5S1Fw7wxKMQyVo5Bmgd30gdrRurET40EillE4013YWBfoex0irNVz08MZAYOKFyrQs+UCjm4GxEyES5AuNYJmfFKGN/DjT1lokYxj7ivJtPZV0qpZcZqbREnwmKXEbnJlTq08xFBKkny7bEMT0sB3uMFblF9bZm/X8EPDfZAI7WHbCqC6SvEIP+P1EkjqZlKwRqpWYare7Cz8GFe+R0EJoE7cqldc7k9F7i58MU7GpSgsHCBg5u7IfYt3UPIK/QjlMgdSGTB4lC39qxD2qV/jyH0pRHdrCQD9WHHnYB9zwppY7PSZwdarf2IXOFWoTCmYXZLUsQ0mDTT6FV9kCSDXH8/fo8Ani0BYpk4N17IewrY5aAVzistwy2FsAtDFvWuUbsRr0BbxPACZ/p4oQXc0lEmgB3qFSOuXbBRHsMy/Bnquwxvi7jXB/fWbNdVRAQgcsXBVuuSleQ88oOygJMkudV4pV/W/MsAQpdBxNukZoUKsMU79dcSYYkSkcfnYmBOoSXC+bkwS8X4XaxwgzOB4QsZuWV2wm90Ba51wj5gwcKNXTg/9+fsLCpK2dZcQAVAZYVnqp5nkK5uRkYxY7qK0FAAZyDRJLmtJsvTiQIcXIkILvAhw0wOQ0q1kNFVOjGbZlZhkk1kNmvFI5FCzYQ066zCwcwj+imBl+QGu0rTH+8q3pLcUhgOZnBjx1sTZ+DCAsZLbGPqUU9p4lf7XKUwzTIVTQxJPdcqRxq7AxdkduVK8h2ZxAml24hz+9QYRFVGVSv0b17LBxIExWgV5tX4cSqzBlrL1FUPKfXKn5BxM1GDla4FEaZC1OAEruzCA2PwgsKwEzMS9a/EkWfALgyv6SoGxRkPp3cobHNwxCqJq3P4rmyHuFMoiKh/Rq3arNCqQ/hjrZVYSSD7+/gKrV3b6UgT4NMPzu2LZXkqClA+UqIiewMAlOXqwWo+jMHSrX7s38wLNEvBGPy85AD679ewhFeUKSAVYVFgk4NXdeAi602/7TftqZc6CTDesnSLAnHeMoypjziOJIKVSmglQyYmqjPTSiISONsydDQRqDNxcB3F2v021YpgK6nqZRJFoqqoyN4g43xUXmnZjrHHcyEzy3IGjWyZGWL+auxYHLM3enJMAZe1ATG5EgM/G1UOtQSmXXUvGLhUrOcRgkbJKe40jtO26T+PE7i4gIngx4zx99t3SxFpVdU0yACXMWj5ZCjrGbdLLd8hy/M7AjN7V0jVL6sAM2BVdYrlwr44lh3i+4dV7ppmOjXq3QwhdUoGsTkOoPS5LWAznuETgbQtFOmyYH90efmI3aaCTT0IzA2c5wx7C48LypRqTAHXOgUN5B/OYUhSixH3Q6ONYyywTDg4NbmCAiz7YQ+MiozM99NImTIsFx49Ra3OjsEHNyL+hoZajjhxUvUEDEwqbFXxMbsVkpZp1FuNtvHqQOwKBHd4P21btFOgCInClbnwcKpegVVQ549FQ4WPKRFZRcclCHmJB8r6AI05FAk1QvWCkapN/RloFA3oiLJikbS3Uuh+xvXgjXIrGRIDmwgHDKv3syFe3+3gYud5+Jr/j/5bI96sBtOqArucMKEeoaetRrWlGbEDkkI6J5WERu0l8LSQpF7JMwN7nbDbVcSTDXx/fM8ScQuTwO1ZlQsYhofithqIkqi7zlXmCFhfBegfS63nDpjUhv9qPlQhvjEPBqBlGopk48igkWu4uPB0sE0Em0i9PnDYboBMae9OmHnhOBRaZRdH7WXZWstgrK8iaotweWHq9HWUvi6Vu2yEV/Tg2nzQlw+4orjEjCZjGtp61ECLtVaAkZSjRFUrMrz6hQbXHd+xNFLGFjhu4WABm9VbBBPX2EWMWCn8QmBOhb2FkJWmf1SRYDN952Dy6nHGD41jUinzaCt+T4z/HSPeCux3wtbofk2fcAqWLdz/t3ThmsLnJqZD1qbpy2m01QDh08BZTTksx9OsuQWohX+MGJgR+35G1NOFJ2oDjyegRnhhJn44kdQb1MRVReEmrs2ECUBC71+R5AnOON2SMH7lBMn2Fq2dKRRagbcVdpsK1goqMKVwKFDGcc9PxCeeZhS+Y0m4Phc6RhgTYbtCEbgQGDXiSWrkFQyCwxp5tNEuoD70qg7uBnxZ44bNEFeRCCwJPJDCLTnsdb6HWQbp0hIz7HJwqRNyI6SpWR3bZ4DMMXHVOHZrG1opE9dPglu9ApigBEaEwgiXFobZEOOX99cV2FsIr1sS9jvohjKf8VCQqo2KaCODQm1ip/qoJ6kn3zbSBQywAjIUFAwUVcIQFxBhBwt8LlHUCK/qCZPqTahhuBBuyA1tBEkEY0Nlz0rSc4IZt0zeOOOhZGGZuHYauzkNP7Y6rtimgrFeEeeA/c54NxBKzq/J4K5FYTNCx4bMpRXUCuchtCJiRxrtOGAhR7Rvs/03zgVIw8c3B7yMGo05pJI2roVPBY4KPJXA+Sq8pmf69G7MAmYCFzthn1oygWQ1pl9CuJcp45dPku6b9OGGGuz2MaZumIbMrdoKiAhJ4skhNXCFM6TB57+4I7yi48mh3NTHO+QCu0UYk7JKQ0a2S7PtaFYhrzTseb0UQIaVTTdTwo0kBtIAdUNYQRtKsY4ZyI2w3wmv6lb1BGXmb0zghtz6923o/Q0zP1RogKTC1C2bwSQgif+fG6bu2EK6owX5CFcw5D2T+J6di7AD4YrC8LJF4ebMuyUNZWRxwYmKsFmE7YG4qhWLNI6bpI8ZNvL5DMNBcyYAsO//GTI0u7GbmAkcdiwVWd01Hi0vWTjkhJd3DeX4iQKPvHfhGbnEeiq2aealIS2xgnaVscumaB2cJpgOsAk4i9k6ztQ3bQv1znVpS8n/Ur+uCcpnxHMQd2SGg7nQsd7a9Kuco12DAl9AVFoddQIaY+ml2d618PrMw8GVMYBqbe8nhePk8ND3IhQx8HlUaIf6LFc4ToBZqt7TMcJVhfDyjj/DClypSd9XGysD4K+10yBpfVAnCmbMMP3yHZCkngSVICmbQFeYuHkr7QNT0C0QK7WoIdliaJ1noKhHOD7yCD08NbhEwoQWPmQcthsj7BEhQdGQ4VttW63U/gPyWnMLIKePGZqa3DylEJgFLhDxHHvYuxaudIaXdA0H1LATISvDrtj/A6YlTN0+gaQRL58IdAombt5Cun/WozQbKYAEbrGdMv3NOzGpp1v7vTZXpm8fp72/hWYOSaLfsx4MlsqSpLJskskYDxwvMIbxslpzSPucSTtvDBM4Cr02Ad8QoDJqho8cuA7DJhGcxDX5QtcIlzrDN+YWSqrYhoyg8fkBFMyUoX1wgtau1PdWK5ArdmubyW/a5W21TcCGnl/uSQI9aB3azPiNW6HjkMRAD9oXpozdMIWdS+uWJfyusab/XpI2xxMM7k6EOSNsM1LNTiLDAbYMiZxGgcINwQB1fyMDPophfqs5TKthBUwovtgthpvFDtTulS5ejdBKTN8vGyt1J6qQbE5gssX49VOVYmSOydt3YndOhQlrGr2/3I3HA5MvPx+7uQW5Q1rC9Cs3QZLSumgCO2WrgD88jbEEl+GVwSSybM2hBj7gfDHkVNnEoYTaiu17ZjjglHmAsvicIccDcakMXgsZPpoB4BuNZcoKrkT2YccGCjYVL6sIXNVGAjsl3d4GSWkfmqJ1URt9Pie9cIrx23b7OWBsGgSeDO42gUywu6aZ/Mbd6ImMyRfMkB6YgkWD3TFOa28byV19eFgchZiAC0x1/9J4FqxnEncHAKlRT9chhf6jzPswOawLD6Ajjuupx9HfqY+OrQ+lNeIHbB4yhiusoTNk5pC+kG2DjLF11kkSIdkz7oXZajP1ym2IhYkX7UY2jTXM/5DdWO8KMhh74S7Gb9nG+K2bwKVgUmi1GLtutjGa1T+EierAbSJDp7CJxw7kAhdYYSwataEjJjIaphR6GnI65XqA1WCNAdMjjDRJw1yDCzdxa5L4GnsdXXtWcv0VlpBabl8mLeneKdAECiXZN8X0XRfQOrTdh302XdlOlpecSJj5zv3QOxEGB1jIoH3ZLOme58if6iKtPpvjFSDUaSmB9XPLl5ttt5ZNJuOr+XBTPxQY6vD2XVceYOQPyTI3ICujVBHoqXLAGvanvm7fjkLP/Xi/rMaVWtmW9gpa+6cw5036URw2hdwydtsezKaJqvcP8/0DexKighmw4x4b2MQr1vQYYzfM+dzBkDi/vDfvBkZHA87AuIXzrSUPhbGrbrdVyEDWygIo9YFlK41KaZ439JoNf3Vdy5IaIdMRGqneQmNAwpf7I45KTW5bxm/d4QVviqrcxk56035aAY/A2Cx05/1xAuRC++qtdP7qGdx8HkaeehflYvbOCrLMSIpyToLzreETy7XVMm277OigVbqBhDPYZBWYYbn3c4Vt1nBZavtx/agvlnQvUR2hBKCgSznt67aSHJiDbuHNtaonfJIxVjGedfSWTkLR9bVjiO/5W9u0rtlK58NPIWniS3xFMEb7z2is4Kwua3pVYE/qC0viCSlOpU3PtCDkjBTgVG9KGg3QUeXSNGGzNSwpGJYpdC+nfItjZIMXyHjC2O17ArdfxloK6YQ333oGk2maxF8nXwq+SEEtYzfsoPfJo5C7qGQs8vsCrryPEW2XC+xMLGMCi271bbcaGbCWLmCUSRpm/svyuuZ5LsS7cbm8BQ60bBDs8r3UGBnMQhqDdjLa1+/AXrg56v2hkjIZP3MFEIFkElxRsVu5YvZsIj24md69TyMTabACEPG6GCO4FYDgtIU5K8wX2ucD3Ig2HuWKR8liXVyALqMYpZD71LUM3lCYGo8cmLTCxW1LZrQ/LcpIOTSmsxLja/80NbRu2B18f6O4zrbPvGJC8W6k6FYicAppQuuaHeT3Ha1i+AbMMCs8lAJjCDut5QuakSBD5yqOUytuRNufrjVIzsj0a70YofnegMWIpkvLUbYnllkrK8421R+42XiPvMCeN0ly8RafR7ZpFCMl1eszsZOlOUvaUGT+PeuLEpKDO7DbHsYdX4LE+Gk8YzdlawZhuAIYYUcqERewDIgbhhP0zB5xZQVQXdYv6NB51r2BG/zM+0RRyFXZlRjGrNBRP45wOSs8UCBpgV5BcmArzEzCUlahSFVIWiGc0zUonRVwYyHOl74VkE1tkn1z9D75GNKy/dCwcgEjmNLYr4uwLTHYakr92jRk9RG5WrP1OuL9dccA5fx2sW+SIe+V4900+qycIq1Q2JoIbSt0iuWHPA8qQCCMUou9cGsw/1ofSSEt7//XZJENA7YFLlrVRRRabezF25C/e6JPXYrWx0yLWd64FAa2pn72Mqf1qejKBnfNUG/Ie7W1DNYVA2gV7zZ9fVMJm4AwzIrrsYLAbBhQZ2QlBfDc+kBoOJ5gz5/zrIpJo9GWGpTCDjrm091sC1zWyF8b7MXbMZO+qtiZQdAjRlfsYNtTSxoiAR0B/IZyLlo/73Sw7qljgHgEq9SVoPqvaJCoDpsNM0x6MJUYNIC5FWecbNJcuUMmxzBbZ/1jJLahHcmZRwDN/lqkDQ5VMFtnkakx9LkFjDF+HEDkOXSZKT1K4c2khmlreL5wPhLQwTUKBoiCxgRWTap4/RSgJnhvdgfclAwqiMauQOtp3pV8tFDnABBB1SEzk9AaC4hfBxVgJRR2Ss9dgszG9cYsZvs07thJ1EptCheFZX/fhARQS5QtifB4V2szho9anqZuBXRQEdYbA0jDpxvqfn4oLgiuw8SKEY34MauxPPF87DiYbEPaGjJTglYFn2u59J5LG2vKKIy3MDs24Q4/Ae36576Qc2UE2hJhxhpy52shm8vQDMMASuN9HUQ760YFN8FHHxME4TqNZrcs36MaIWuA3Kln/+yQyqFRbGBjzIFJQtJH3GBsZGw07HeNNpvUlc05aLWRTVPB39cxpwBqV27L1BgmrPh5AGOBN+ckbgif0wf/a8ADDMMAUaxfcw9RNFA2TE/x7Jfx2iGyCgMQ1UKLCfO1EPL4TZXvDwRYw01CtBHznpJgJicwSSCyB/iKFS6p5ZRzUpaI1iLBONbWhpdruoiNywXUfLq/aV2FJXBhdQ0XNOcrvYKccir4FZbJMNKfHKI/t+xCJyiADJ+7vDQvWsdJp8ULKOBsY00YF4pP0tqcyH310FUoQCj4L3SZ2cibZl+rqKqvKLoOCnAMPxvWsGu7qKMrQbgxNiiF3/w8fGaBLy4VdAl+b9VLZVQr6+mJBeg4mJmAopl79TdTaFmy7TOELisCSWOGhLiKulBOLWDEROGn8+5GGwpgW5VUGrSzoCtO7GfCkIPnC9dXmqErjjYxgQ7HAsNkuD4YIBZsBPhc1A6qiitHBkdYwKmSGOGxTsET3YJLJixdV03/siockBh0YYniyWPYbXOw1A3Um/ZX7TTWYGenISvoHj+JTSzJ3AzkDl3o9C1LKXTTbiFjLUg9q8dSD+30op6aDnYDk8DJDuJclYWs8QDLt6NRyFQ50i0qMK3VgsFazkfcsAaOQUXYOBfQAIGD/j+qE2xEAuWxBeZz5RMnMg5Oe/QsZuUHkbIKyxiSThd58BHc9YdAM4zxBfvSSpDE4J7v8NHf/QSf+ugD/OPffI7J6Qmuv+0Qt7zsWq687RD0Mlwvx7RSZLzN8S8/zeF7H+bxL36F2bkprrzhEs6/bI8nrxYWELF9HOKf36EZFE88g6S2njtgeQ6g3FKBJzuOJ7sFiZ/bb2j4h7I8DlgvBdBlPigHbTrVfsNI5PdMNMO2iZBrUTKpIvzFsx1evWOMzamh0OXn8ysfdiz1Dnex3YZPHmbi1S+CPdvh+AJZlvHON/8+l169j9//nb/kI3/6WSZbsHn7FAvPP8fbf+3DvOs3Psy3f+8dfN9P/R+05zax9OwJ7vmld/NH7/wIR57qsIhfzXrLNNzy0mv5nn/7bVxwaA90e2hWoE79WIBNE3DkKPaRJ8jHWuH+faOo0xWndS3U1zn+3XyP4z1l3AiZq882Hvd2VzvWAUyw8RZAq5EtZTFn3w0E9wCKqNTO88uiKKkRnug43v2VRf71RdPk+Wg+QANWsAiferbH3xxd4t5nO+SdHtc+95vc/F0v45ZXfAPk8Ifv/Bjv+62PMH+ix11338G3fOdrueCC3eRZxuH7H+KeX38nb3/rX7J0ssNrvu+b+Z03/R7/808e4IpD5/Gtd9/B+OQ4WhR8+m//kQ+9/14+95lHeOOvfC+7925n++4tyMQY+fHnefQzj/HwOz7EJUdPsmd2jLZV8jwQ3kZWXA40NbBYKB98utMf91ibch4duvC0a0xNfyYWYLkCFJ2DmbFW63H8XIEDFRvxVOn9CZIay7XYaCIEa+pLwpVTvWeq/Pgl07x05wTdzA0stabqr38yd7zloXn+5EvzqIVtm6cRa3jmqyfIOvDyO6/l+3/qdbzx7v/Mlz9/lNf/4F18z0/+K8gL6AUef2KchWeO8dPf/9P8/SceYNNsm2PHurzyztv4gZ/9N8ycty2AEYXFJT7w2+/hLb/4/9Jqp1xx/SX8wtt/lA++4yP84Ts+zKNf+CqLHZiagH1zbf7JhbO8etcYBYpbJrQtO0iaCm/9wkne8fgiEwayMKNY0V9DQKNjGsdarTmgQ/VLgPlOr3f+MZgfRRSfkQJAU9j1iZwroVcTP5po1Q+DH90bMB0/sG+aV5w3AapkhfZ/0PjRXfz8fcf4s0dOcsetV/Ad//I7OHjoEkSELz38GO//7+/jT//gk1x94wUceewoO3fv4K3v/lVMkqBZ5nkDoMhzkk2zfPHv7+eHXv9Guks5+y/by5vf+cu0piYpFhYDfldsYpHZGX793/0y9/zmB7nsmt3s2LWFP//gfezZNckNt13H5rlZjj59jE994l6ePrbInftn+eHLZvr+XBom2oaBJCi87csn+e1HF/wcCKWAw6IMRVhEqib0cqGJSPiFG2lgVqUAp48BGtosUpFktaFNWic8+lOnOp/EKwL9mTv4r198nodOZnzb7gn2TIQRmIVCKvzxIwv82SMnec0rb+In3vyTJBMT0PFI/qqbr+GqG69idvN/5Q9/988pCnjt627Azk5RHJvHRomiJLHoyZNcfOlFXHLwIv7245/jpa9+Ca0tm8ifOU6SVkjf5QUsLfHqu17Jn37gL/jK40/z0H1P8i2vfQH/5098P9t3nxdmq3I8/qVH+fWfewvv/dj9bGkb/uWlM9iCgZkpi9xx34ke9zy2yF8/06VlIuFHpt1pw+dTX33crbzo9PpigAEFCLBVkOq9ki+QQP5QCb8wPn9TBDSZhDV6/uDIEp94tsuNW9pcNZuyfyplprD88WPz7Ngyxb/68e8laaXkx5/DJv72XaeLHW/zfT/8eu7/9GE++8CTTEyMByLCDVRllIUYU9OTJBbmtm1G89wD2Wg0h4ggvYwdO7exafMMjz/2NDfedgX/7pf/LUm7hVtY6F/v/P0X8lNv/kme+c4f571ffIIX7Rxn90TCydxxPHN8pVPw+GLOp49nPDifsVQoY1bInVariFP1ckUHlp/xx/Wl6DnbCkDEWPVXwY4Iisoy+EhBQ88vwaAvj1aKIKRJKywUyoeOLPE/v7rETMvQMoannuly60uuZOue89DFRZK04vltYnCdDpPbNnPpFfv5h/uepChyBsbZlzdrDdlSl8e//CRJOdRbqzkKauBDDC7rcfL5kwjwrf/0m0mmx8mPnSBJk/7p+Yl5Js/bwmtf98380k//Bj91/3O02kKvULqFslQonUKxCKmRgPi1vsy8K9tSaz1ddcjS9GuX5F6DJFmNtdLaTdaqXFxj0cTyHFe9zkMYNJkIY9Y34GLucA5mN8+iRjxT51y1h5ZTlFtuv4mZCcOWrZshD0rQOFezjGRqjJtuvY7WmGHvRbuh1/MKEJ+L4vKcdHqSA4cuYcu2Ka676Sr05CLWmui3HcYI2umw/+A+pqZSFrsZz+eOpdz38JYIM4mhbSU8p9ZNeUMJhrVhGfrpGvX+VSmArnKPzVcczhTla+fNfQ3QUH1eRKtmFuoRcd5M8qG+5KrWLTTU4imy1OWmW7+BndsmmZmdhrxApHGuKuocYgwve83tTE2NMzE53hd4fJ6gaJaRzkxy+8tuYWJykvHxNuKKgXsQ5/cktX3AGVvHXKHnyufT8MzUntkFl9gHghEOKKL2dKcglw1xAaUV6PMBqrgAA21wqy5EVkK1nnopm5IBLFxwE/ED1MKpmPluaqp/P+v1fEMVQQ21GY+VOdeCXrcXwF7pLlyduy3dR5GT9Xo+/VIUIT+gQ7Ij2scQ2kDuVU/XailZR43m7fv3yBIU0fdikLhWW8Iabup84cwon9/PY0tFDhmqlTPCEmX9GYPKMMpJMwnhhoxH9+9Xq26U5ykDw3TLXitxfVW5KI4bqlg1JeyfO/j7RKur4eomXsM6gETxe98lUl9neBQmUMeabmurAM0sYNTzmzlwV6ZvpaJFKzl7JbBB+HX+ewT91RBA0+wPU4CBFaJHlcCXkumXOC9zzejGitrC0Tqa3nX10K62yLQbzApuqAKc6g8W0cL3imJ1cGyzaJnLllou29R+M1QQ17KE2gddwy1AHMbF566kLBGYbHJd5TWIzlVZ1gIIdUGWPV8b8X3lHnQAR1X4SfuuoFhr6a+1BYgrpcpVQFww9+WwunI5VWOq9KEJc+5rhEwdFa9QaKMUafQ8JUNSaCsNsCYy/ctdF1Y3IL5S3/6S8JHwi2hJ2b7fp1pGvoYJ0Noy8+uxrYsC1HgBF3x4xAjGbkFQP3M2g3XwZV19tWBZFKYxxAI4iVoqPncIYi1jz+a5TQI/jlH7Uo0yXiOvSV+wRRzWaXysNYugrkL7A+dylhTgdH+4qHEvVSFALtUKWNUAEu2v7FWuplUu+yoDMa9b0QJIOQJVl+mt5WcSrqnLWJYSCDa/u4wFaNK75bFSJXp0SJTgomxpHElwthTgTAZWFAHomahAro9kw+xYWi7vHk2gpNCfR1UEColMdd8eDrcAqo6iULRwlW8fiFa8UNU5Xw0Un9uciM95u6TqcCUBZc2KFkAVcucov1JEoWGMC6qVwuurhvdxgGNdt4R13opofJiI+jHzsWL0/X5YCMmILySJasidqxaZVC0oigIRU83bS/W5NTA21qLVSiprIIN1eKC0WglJmpAGWrm0HC6UiNn+qk+OJLG02qk/x40apO1qYWTRX8azYkGd08GETxwJOK1ZjfXeEjZgi0PDEtX3wXQoiiyXa3VB6H1A7qp59FQVSSzp7CRkGfSyelysjjRN+Pn//IPs2r0dXVjyzF9RDOa6Ox32Xngeb/rlH2Lz5mm0l4WyNMFMtH0vX1jyjmlhkdtefB2HLt/nSSBX+CkydXhoKY16vSKCD3UM0CjubIR8G7GtGwaoNbaW69B6ltBHbBXjZzVeUVMxzheRaMAA/RKyVsL8V5/lz//o4xy+7wscP3aCYkg3abVT8izHrdCKIkKrldINjCBA2krZuXsbN950Jbfdfh1mvI1b7DK9aYrpLTNVYQkjwkCqJT3zKCApYjInapO4xKv8vFBWnDPo68YCxJNDaEQNazlGTCozX64RSMgQmsK7hLxwTIwZPvvAw/zA63+WBx96hrkZYWJqYnDUcPDxssqZQfxaf9WJRV7w6b/7PO/93b/mxpsu4off+F3sO7QPt7hUuZ1RWCkiiMqciEZJn5oliAKMkv9vCv9rwgKsqTKERjH9moBA9oRxAhLMfoFfNLm0pQXKWDvhoc8+xszsBD/x77+bF95xE5s2zSKytvdYOMeTT3yVD733z3j3O/6MN/7Qr/Bf3vJjXHDJHlynN1oBhmCAPsEzJKwrnVKBVvhgg4W/4QpAwx2YYAlsmFqlzw5Ho3w0kEFZL2fr9ln+w5vfyIEXXA0nF9fJUVr2H7qQ/b/wBvZdvJs3/cxv89Y338ObfuVHQsSoy+fEnfaFX4QkhosTP3FeIAKHhW6AvT8bGGDURYtw7bKnO1GM88u/mtDzXQCGYwJFVvD677uTAzdcSvbUERJrWfPuX97ekkMRXn33K7jvHx7gT/7oUzz46Ye44uZDuJMdPy3ssIdyFV+geAxAzP2XkaLoAC2sZ0H4Mf3OWbEEccq08IRQ4XxvKd8XFWzue/9tt1yFPvMsiRZI0UPy7rrspsih10F7Hb7xm24kz+Ezn3kIrEXVDYnhGjtVxq8IYLB8Lofiivqzny3hnxUXMMxyoj6NrOrTwYVHgd5NWMAVzM3NMN4WJOsMzdms9SZOkaUFts5NMj4Ozxx9DrJssGxsFBNIxUG5IHgi5F+a/rO9Jct7Q5zz82yvrxKUfj8ogoRZKETFm1FjWFxcwnWXUGnVc8frqJnqYOn5k2SZMD7eBuvHEXq0yogw0PXVodAKxxTNsriNsLKQ2RX0bFkFaEOxpHpSRbZshEtwRPM8G88O5jlkY5anv3qcz3/uEa64/gD50qLHAOsp/6wgmUq4997P0cuUgwfO9yOQy6qXoTkDrSUYi/C63+N1g3u96skJPyfn6SnAE5BtgflovOd697tqpLUrRxMr884wUeT89tv+nP+4fwetsRba6ZzRuPjR5FBomJkJHrn3Id7zvr9h/yWbue76g7DUwRqGl+UEC6AaWQBXDxA20NWXHNr8oysowHJD8cKsuDy6ngHByIi6jJ0dnMwcY+Mp937my/zcz93DEw8/hVBgrPrZ4dZwF6vgcv7hY/fxf//8u3j2mUW+91+8iqmtM7gsZ8UyzEAFNzN9G4zzyr7xKF4BRs4fliwPAchV9eHmSoDrCr6iJ4iraPJc2bZ1io9/8kv8wz/+Bt9w9UVs2zLlJ5FewzvL8oJHn3iWex84QrsFP/qj38IdL78RPbnkJ3waVZlRUntRQUjhqlm/ZGN7kQOsqj4cy/L0ogBj7g9ximyY6g5ga8PiUo8Xv+gAt95yBe9538e594HH6PbyNeWCynUGZ6cneMXLr+bOO1/EoWsuwS11g6nUZdytLzLNe1m/8tdFE4RssAUwfdk1EmGnogB+HoYs+ytNkjycqxulCLFPzsK0f0ePPsetL72eW2+9kmPPnuDEiQWcW8uYUEnTlLm5Kabm/OJQuhB6vsiyCE6dQ43h6aefo9vNyEnRsxPolfm13GTZx2NZnpYCPAtfmFN9AJFrqGaE3zgFAHqFIx9L+PIjR3jy84+z68IdzG2dZW7H5rVnA0PBvna6ftqYcgzAsmyNIOoQHPff/zCdrrKYCGdp8zJSfeBZ+OKZKEDpOwpEPgBcczYIK8FbgHk1tE8s8eG//DTf9f2vITv2vB/1u8Y0Wn+mk7BE/Gqur84hLctzTxzlr/7qfkzbcnypwMrZIXvC4Nf3Uw61qHJPp0wFK0DPmPeoX9xzjWdeXKU9E/hqR5FWwh/84d/w6OEvk05PoHkxcm2+0937C1lrXFY+elfncOqQVsrb/8dfcPTpExxT62dAP3vmP+sZ897V4E67iguaXlEcHTPmSgOXUw3q3VBE03O+NmA863Hf4Ue5+Yb9TG2bxXWyfuwd5+PXnSh0inMOk1rM5Bjve+eH+d3f+yhFK+XzC2eN3C9n433/fJb9N+IK+9NUgLIttWXMowL/gvq6jxunBALzGYy3E7JjJ/jbTz3EBTvn2HXBdmQs7ZtsMRLicFdVB6/ZTn9xSBlLMeMt5o+f5Lf+nw9xz7s+AmnK5xaVTrHMCmjrH0Cpg+/pOvcUq5g/XE6hE7rZJHmbgX8elvw5K4kkp3DxpGG7ZBgr3HTjZdzywss4sO88ZmYmEBHG2int8ban4k5jCvWVNLHICg5//gn+8TOP8Jf/32d44vFn0bEWn1twzGeQyFlJ7ecCicLbnsvz715N7z9VBdBx2NlOkvuAOVhxqZ912wqFrW3hgjaYXkbLwMTUGEliyQrHptlJfvFn7ua8PVv9PIBmbbqjqiLtlLe+9YO85/1/68vbEsMJEh5ddPRcVNa+8chfgGPdPL9qCY5QTdBy2jxA8wfMEjyVOvcGa8w9Za0mZwHrJALPdJXjPdjcajEr0FrIsWRMWlhc7HL0mROcd8G2aGjSWmmf49izzwNwvDXGEwsFS4Wrj2nYeNPvBJLCuTcswVMrIf/TUYA+wpx37l2zIrcYkX8dUsXpRj10bM3Lxn6m6zjaLQeXCAfHYc9EytRUG1y+4iTUp2wBDExNtnEKX+k4FgulDPk3OuQri48NpE711+ede9epCP90FMAB9kRR/MhMklxo4FUbiQeGLVBm43WIo3o7V8RzA8haaQCoC+yjt0RrDTFOsT1ygbSAD84XxY9Qrc15ipzxqStBL8nz1znVj5dLKnP2GmG4AFTXb49+4ixuuUDiVD+W5PndQI/TqDVJTrPNzTGY31wUrymMeacReXWECQxfC1tM5KyxBait6bbxWuDw+f7EqX4wce7uMBGk4TS8kDmDmzDH4cS8c3eqc28J5sdoVOG8kfugNVjvX9v4Z9T+kFmsOveWeefuPBPhc4a9texa2QnVN6jqP1M4IhW5VJxF90g0A8Pa72zQuK3qV8qhFFbhiKrefUL1DXh6XjgD/GnW4OYEMPPO/Q9TFC9QeFswUeXSyTkbVwcZc7Wr4vJPb1/3otQSa+WEObmDA3qbLYqb5527h2qGpTNq12SNblYB+xw8SlF893SS/Kaq/huB1zbCxCJSmnWllLVM1qjzI3nXKAxE3VprctODSXCnEnj9zMH7Efm15/P8E2Xwcyqh3norQCxcASTc6Ccm4XJrzJ0Kr0XkkEAb1s96xpqVhinLjZU1qxmwYakTK/USrzN8loF1rBS6qD4IfKBw7v0LcDhmZNdK+GutAHF7GIAFOIxzh4E3TcMlzpgXoXo5IhcL7FWYQWQKv0DH2tjNMPFSp5tBXuCyYlWLN67Kq6hirNDNimCj9UwVIEP1pMC8g0dR/SIiD4pzH3veF3MUDVe95lzTehE4LrpxA+TPw0M491AUQCdAsg2SYo1Cx+fxq8Z384Lnjh6HfVs5bmCtBjUYAXo9lp7u0RmDzrGcsTOxKOCOej+f97mUelhZLn++biTjRvH40uAIznKE8DW5lb4fll8J7utSATb8t9eTn1mvQcnn+sC57dx2bju3ndvObee2c9u5bUO2/x+sNkU6oXguqQAAAABJRU5ErkJggg==";var dm={apiKey:"AIzaSyDvjnOLzYEHGV7ae_VWZ-LUeAJ8i4WTY9Q",authDomain:"bul-jumeok-e910b.firebaseapp.com",projectId:"bul-jumeok-e910b",storageBucket:"bul-jumeok-e910b.firebasestorage.app",messagingSenderId:"727813238723",appId:"1:727813238723:web:b308d312c3d34e7fb61776"},Gl=new URLSearchParams(location.search).has("emu")&&/^(localhost|127\.0\.0\.1)$/.test(location.hostname),wm=Fa(Gl?Object.assign({},dm,{projectId:"demo-bulfist"}):dm),fr=gc(wm),B=tm(wm);Gl&&(Ds(fr,"http://127.0.0.1:9099",{disableWarnings:!0}),Rl(B,"127.0.0.1",8080),window.__bfTest={signInGoogle:function(n){return lc(fr,Ft.credential(JSON.stringify({sub:n,email:n+"@example.com",email_verified:!0})))},tryWriteMember:function(){return Rn(me(B,"members","hack"),{nick:"hack",no:99})},tryDeleteGuest:function(n){return hr(me(B,"guestbook",n))},state:function(){return P}});var RI="\uBD88\uC740 \uBB3C\uB85C \uB044\uBA74 \uB418\uC9C0\uB9CC, \uC6B0\uB9B0 \uBABB \uAEBC.",P={user:null,bossUid:null,bossKnown:!1,members:[],membersReady:!1,topics:[],guest:[],guestReady:!1,rooms:[],roomsReady:!1,roomId:null,room:null,roomMissing:!1,msgs:[],drafts:{},pick:null,confirmDelete:!1,gbConfirm:null,flipped:{},importing:!1,sketchNames:null,sketchKnown:!1,migrated:!1};function en(){return!!(P.user&&!P.user.isAnonymous&&P.bossUid&&P.bossUid===P.user.uid)}function xn(){return P.user?P.user.uid:null}function u(n,e){let t=document.createElement(n);if(e)for(let r in e){let i=e[r];i==null||i===!1||(r==="class"?t.className=i:r==="text"?t.textContent=i:r.slice(0,2)==="on"?t.addEventListener(r.slice(2),i):t.setAttribute(r,i===!0?"":i))}for(let r=2;r<arguments.length;r++)Qe(t,arguments[r]);return t}function Qe(n){for(let e=1;e<arguments.length;e++){let t=arguments[e];t==null||t===!1||(Array.isArray(t)?t.forEach(function(r){Qe(n,r)}):n.appendChild(typeof t=="string"?document.createTextNode(t):t))}}function Dn(n,e,t){let r=u(n,Object.assign({id:e},t||{}));return r.value=P.drafts[e]||"",r.addEventListener("input",function(){P.drafts[e]=r.value}),r}function Im(n){return typeof n=="string"&&(/^data:image\/(jpeg|png|webp);base64,/.test(n)||/^https:\/\//.test(n))?n:""}function PI(n,e){return(n.no||0)-(e.no||0)}function jo(n){return"BF-26-"+String(n.no||0).padStart(3,"0")}function et(n){return P.members.find(function(e){return e.id===n})||null}function Y(n){let e=et(n);return e?e.nick:"\uD0C8\uD1F4\uD55C \uC870\uC9C1\uC6D0"}function Kl(n){return u("img",{class:n,src:hm,alt:"","aria-hidden":"true"})}function j(n){let e=u("div",{class:"toast",role:"status",text:n});document.body.appendChild(e),setTimeout(function(){e.remove()},2800)}function se(n){let e=n&&n.code||"";return e.indexOf("permission-denied")>=0?"\uAD8C\uD55C\uC774 \uC5C6\uC5B4\uC694. \uB450\uBAA9 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uB294\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694.":e.indexOf("unavailable")>=0?"\uC778\uD130\uB137 \uC5F0\uACB0\uC774 \uBD88\uC548\uC815\uD574\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.":"\uCC98\uB9AC\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694."}function kI(n){if(!n||!n.toDate)return"\uBC29\uAE08";let e=n.toDate(),t=(Date.now()-e.getTime())/1e3;return t<60?"\uBC29\uAE08":t<3600?Math.floor(t/60)+"\uBD84 \uC804":t<86400?Math.floor(t/3600)+"\uC2DC\uAC04 \uC804":e.getMonth()+1+"\uC6D4 "+e.getDate()+"\uC77C"}function le(n){location.hash.slice(1)===n?X():location.hash=n}function Em(){return location.hash.slice(1)||"hq"}var CI=1.1;function xI(n){function e(){let r=n.naturalWidth,i=n.naturalHeight;if(!r||!i)return;let s=n.parentNode,a=s?s.clientWidth:0,c=s?s.clientHeight:0,h=a&&c?a/c:.8,f=r/i,p=CI;p*f/h<1&&(p=h/f),n.style.height=p*100+"%",n.classList.add("fit")}function t(){requestAnimationFrame(e)}n.complete&&n.naturalWidth?t():n.addEventListener("load",t)}function tn(n,e){let t=Im(n&&n.photo);if(t){let r=u("img",{class:"photo",src:t,alt:(n.nick||"")+" \uC0AC\uC9C4"});return xI(r),u("div",{class:"ph"},r)}return u("div",{class:"nophoto",role:"img","aria-label":"\uC0AC\uC9C4 \uC5C6\uC74C \xB7 \uC218\uBC30\uC911"},u("span",{class:"np-stamp",text:"\uC218\uBC30\uC911"}),u("em",{text:e||"\uC0AC\uC9C4 \uBBF8\uD655\uBCF4"}))}var Ul="bf-me",bm=null;function zo(){try{let n=localStorage.getItem(Ul);if(n)return n}catch{}return bm}function Bl(n){bm=n;try{n?localStorage.setItem(Ul,n):localStorage.removeItem(Ul)}catch{}}function pe(){let n=zo();return n&&n!=="guest"?et(n):null}function fm(){if(!P.members.length)return!1;let n=zo();return n==="guest"?!1:!n||!et(n)}function DI(){if(zo()==="guest")return"\uC190\uB2D8 (\uBA85\uBD80 \uBBF8\uB4F1\uB85D)";let e=pe();return e?e.nick+" \xB7 "+jo(e):"\uBBF8\uD655\uC778"}function NI(n){let e={hq:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',members:'<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M18 14.8c1.8.7 3 2.5 3 5.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',games:'<rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.4" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.4" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.4" fill="currentColor"/>',guestbook:'<path d="M5 4h11l3 3v13H5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'},t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true"),t.innerHTML=e[n],t}var Lo=[{name:"\uC74C\uC2DD",words:["\uAE40\uCE58\uCC0C\uAC1C","\uB5A1\uBCF6\uC774","\uC0BC\uACB9\uC0B4","\uCE58\uD0A8","\uD53C\uC790","\uC9DC\uC7A5\uBA74","\uB77C\uBA74","\uCD08\uBC25","\uBE44\uBE54\uBC25","\uD584\uBC84\uAC70","\uB0C9\uBA74","\uC21C\uB300","\uB9C8\uB77C\uD0D5","\uD0D5\uD6C4\uB8E8","\uAE40\uBC25"]},{name:"\uB3D9\uBB3C",words:["\uACE0\uC591\uC774","\uAC15\uC544\uC9C0","\uD638\uB791\uC774","\uD3AD\uADC4","\uAE30\uB9B0","\uCF54\uB07C\uB9AC","\uD584\uC2A4\uD130","\uD310\uB2E4","\uD1A0\uB07C","\uC0C1\uC5B4","\uBD80\uC5C9\uC774","\uB108\uAD6C\uB9AC","\uB099\uD0C0","\uBB38\uC5B4"]},{name:"\uC7A5\uC18C",words:["\uD559\uAD50","\uBCD1\uC6D0","\uACF5\uD56D","\uCC1C\uC9C8\uBC29","\uB180\uC774\uACF5\uC6D0","\uD3B8\uC758\uC810","\uB3C4\uC11C\uAD00","\uC601\uD654\uAD00","\uB178\uB798\uBC29","\uC218\uC601\uC7A5","\uCEA0\uD551\uC7A5","PC\uBC29","\uACB0\uD63C\uC2DD\uC7A5","\uC9C0\uD558\uCCA0"]},{name:"\uC9C1\uC5C5",words:["\uC758\uC0AC","\uC18C\uBC29\uAD00","\uACBD\uCC30","\uC694\uB9AC\uC0AC","\uC120\uC0DD\uB2D8","\uC720\uD29C\uBC84","\uBBF8\uC6A9\uC0AC","\uD30C\uC77C\uB7FF","\uD0DD\uBC30\uAE30\uC0AC","\uBCC0\uD638\uC0AC","\uC544\uC774\uB3CC","\uB9C8\uC220\uC0AC","\uD504\uB85C\uAC8C\uC774\uBA38","\uBC14\uB9AC\uC2A4\uD0C0"]},{name:"\uBB3C\uAC74",words:["\uC6B0\uC0B0","\uB0C9\uC7A5\uACE0","\uCE6B\uC194","\uC548\uACBD","\uB9AC\uBAA8\uCEE8","\uD734\uB300\uD3F0","\uBCA0\uAC1C","\uAC00\uC704","\uAC70\uC6B8","\uC9C0\uAC11","\uC774\uC5B4\uD3F0","\uC120\uD48D\uAE30","\uC190\uD1B1\uAE4E\uC774","\uB4DC\uB77C\uC774\uAE30"]},{name:"\uC2A4\uD3EC\uCE20",words:["\uCD95\uAD6C","\uC57C\uAD6C","\uB18D\uAD6C","\uBC30\uB4DC\uBBFC\uD134","\uBCFC\uB9C1","\uC218\uC601","\uD0DC\uAD8C\uB3C4","\uC2A4\uD0A4","\uD0C1\uAD6C","\uACE8\uD504","\uB9C8\uB77C\uD1A4","\uD074\uB77C\uC774\uBC0D","\uBCF5\uC2F1","\uB2F9\uAD6C"]},{name:"\uB098\uB77C\xB7\uB3C4\uC2DC",words:["\uC77C\uBCF8","\uBBF8\uAD6D","\uD504\uB791\uC2A4","\uC774\uD0C8\uB9AC\uC544","\uBCA0\uD2B8\uB0A8","\uD638\uC8FC","\uC774\uC9D1\uD2B8","\uBE0C\uB77C\uC9C8","\uC2A4\uC704\uC2A4","\uC81C\uC8FC\uB3C4","\uBD80\uC0B0","\uB274\uC695","\uD30C\uB9AC","\uD558\uC640\uC774"]},{name:"\uC601\uD654\xB7\uB4DC\uB77C\uB9C8",words:["\uAE30\uC0DD\uCDA9","\uC624\uC9D5\uC5B4 \uAC8C\uC784","\uD0C0\uC774\uD0C0\uB2C9","\uACA8\uC6B8\uC655\uAD6D","\uD574\uB9AC\uD3EC\uD130","\uC5B4\uBCA4\uC838\uC2A4","\uBC94\uC8C4\uB3C4\uC2DC","\uC778\uC0AC\uC774\uB4DC \uC544\uC6C3","\uB354 \uAE00\uB85C\uB9AC","\uC751\uB2F5\uD558\uB77C 1988","\uC774\uC0C1\uD55C \uBCC0\uD638\uC0AC \uC6B0\uC601\uC6B0","\uC544\uBC14\uD0C0","\uBD80\uC0B0\uD589","\uADF9\uD55C\uC9C1\uC5C5"]}];function OI(){return Lo.concat(P.topics.filter(function(n){return n.name&&Array.isArray(n.words)&&n.words.length>=2}).map(function(n){return{name:n.name,words:n.words}}))}function Tm(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Go(n,e,t){let r=Tm(e),i=n[Math.floor(r()*n.length)],s=Math.floor(r()*t.length),a=Math.floor(r()*(t.length-1));a>=s&&a++;let c=n.slice();for(let h=c.length-1;h>0;h--){let f=Math.floor(r()*(h+1)),p=c[h];c[h]=c[f],c[f]=p}return c[0]===i&&c.push(c.shift()),{liar:i,word:t[s],fool:t[a],order:c}}function VI(n){return!n||!n.topic||!Array.isArray(n.lineup)||!n.lineup.length?null:Go(n.lineup,n.seed,n.topic.words)}function pr(n){return String(n||"").replace(/\s+/g,"").toLowerCase()}function MI(){gt(me(B,"config","boss"),function(e){P.bossUid=e.exists()?e.data().uid:null,P.bossKnown=!0,X()},function(){P.bossKnown=!0,X()}),gt(Me(B,"members"),function(e){P.members=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(PI),P.membersReady=!0,X()},function(){P.membersReady=!0,X()}),gt(me(B,"config","sketch"),function(e){P.sketchNames=e.exists()&&Array.isArray(e.data().names)?e.data().names:null,P.sketchKnown=!0,X()},function(){P.sketchKnown=!0}),gt(Me(B,"liarTopics"),function(e){P.topics=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}).sort(function(t,r){return(t.order||0)-(r.order||0)}),X()}),gt(Ri(Me(B,"guestbook"),ko("createdAt","desc"),Nl(150)),function(e){P.guest=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),P.guestReady=!0,X()},function(){P.guestReady=!0,X()});let n=be.fromMillis(Date.now()-12*3600*1e3);gt(Ri(Me(B,"rooms"),Dl("createdAt",">",n),ko("createdAt","desc"),Nl(20)),function(e){P.rooms=e.docs.map(function(t){return Object.assign({id:t.id},t.data())}),P.roomsReady=!0,X()},function(){P.roomsReady=!0,X()})}var Do=[];function Am(n){P.roomId!==n&&(Do.forEach(function(e){e()}),Do=[],P.roomId=n,P.room=null,P.roomMissing=!1,P.msgs=[],n&&(Do.push(gt(me(B,"rooms",n),function(e){P.room=e.exists()?Object.assign({id:e.id},e.data()):null,P.roomMissing=!e.exists(),X()})),Do.push(gt(Ri(Me(B,"rooms",n,"msgs"),ko("createdAt"),cm(400)),function(e){P.msgs=e.docs.map(function(t){return Object.assign({id:t.id},t.data({serverTimestamps:"estimate"}))}),X()}))))}hc(fr,function(n){P.user=n,n||uc(fr).catch(function(){j("\uBCF8\uBD80\uC5D0 \uC5F0\uACB0\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694.")}),X()});async function LI(){try{await mc(fr,new Ft),j("\uAD6C\uAE00 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uC5B4\uC694.")}catch(n){let e=n&&n.code||"";if(e.indexOf("popup-closed")>=0||e.indexOf("cancelled")>=0)return;e.indexOf("popup-blocked")>=0?j("\uD31D\uC5C5\uC774 \uB9C9\uD614\uC5B4\uC694. \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uD31D\uC5C5\uC744 \uD5C8\uC6A9\uD574 \uC8FC\uC138\uC694."):e.indexOf("unauthorized-domain")>=0?j("\uC774 \uC8FC\uC18C\uAC00 Firebase \uC2B9\uC778\uB41C \uB3C4\uBA54\uC778\uC5D0 \uC5C6\uC5B4\uC694."):j("\uB85C\uADF8\uC778\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uD574 \uC8FC\uC138\uC694.")}}async function Vl(){await dc(fr),j("\uB85C\uADF8\uC544\uC6C3\uD588\uC5B4\uC694.")}async function FI(){try{await Rn(me(B,"config","boss"),{uid:xn(),since:qe()}),j("\uC774 \uACC4\uC815\uC774 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uB410\uC5B4\uC694.")}catch(n){j(se(n))}}async function UI(){if(!P.importing){P.importing=!0,X();try{let e=await(await fetch("seed.json",{cache:"no-store"})).json(),t=lm(B);(e.members||[]).forEach(function(r){let i=Object.assign({},r);delete i.id,t.set(me(B,"members",r.id),i)}),(e.liarTopics||[]).forEach(function(r,i){t.set(me(Me(B,"liarTopics")),{name:r.name,words:r.words,order:i+1})}),await t.commit(),j("\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D\uC744 \uBAA8\uB450 \uAC00\uC838\uC654\uC5B4\uC694.")}catch(n){j(se(n))}P.importing=!1,X()}}function BI(){let n=P.members.length,e=P.rooms.filter(function(t){return t.status&&t.status!=="closed"}).length;return u("section",{class:"screen"},n?u("div",{class:"whoami"},u("div",null,u("span",{class:"eyebrow",text:"\uD604\uC7AC \uC2E0\uC6D0"}),u("b",{text:DI()})),u("button",{class:"ghost",type:"button",onclick:function(){Bl(null),X()},text:"\uC2E0\uC6D0 \uBCC0\uACBD"})):null,u("div",{class:"cover"},u("div",{class:"cover-meta"},u("span",{class:"eyebrow",text:"\uBB38\uC11C\uBC88\uD638 BF-HQ-001"}),u("span",{class:"eyebrow",text:"\uC5F4\uB78C \uC81C\uD55C \xB7 \uC870\uC9C1\uC6D0 \uC804\uC6A9"})),u("div",{class:"stamp","aria-hidden":"true",text:"\uADF9\uBE44"}),u("div",{class:"cover-title"},Kl("logo-l"),u("h1",null,u("span",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"}),"\uBE44\uBC00\uBCF8\uBD80")),u("p",{class:"motto"},u("q",{text:RI}),u("small",{text:"\uC870\uC9C1 \uAC15\uB839 \uC81C1\uC870"}))),u("div",{class:"actions"},u("button",{class:"btn primary",type:"button",onclick:function(){le("members")}},u("span",null,u("small",{text:"\uBA85\uBD80 \uC5F4\uB78C"}),"\uC870\uC9C1\uC6D0 \uBCF4\uAE30"),u("span",{class:"arr",text:"\u2192"})),u("button",{class:"btn",type:"button",onclick:function(){le("games")}},u("span",null,u("small",{text:"\uD734\uAC8C \uAD6C\uC5ED"}),"\uAC8C\uC784\uBC29"),u("span",{class:"arr",text:"\u2192"}))),u("div",{class:"ledger"},u("div",null,u("b",{text:String(n)}),u("span",{text:"\uB4F1\uB85D \uC870\uC9C1\uC6D0"})),u("div",null,u("b",{text:String(e)}),u("span",{text:"\uC5F4\uB9B0 \uAC8C\uC784\uBC29"})),u("div",null,u("b",{text:String(P.guest.length)}),u("span",{text:"\uBC29\uBA85\uB85D"}))),u("details",{class:"guide"},u("summary",{text:"\uBCF8\uBD80\uB97C \uD648 \uD654\uBA74\uC5D0 \uB450\uB294 \uBC95"}),u("div",{class:"guide-body"},u("div",null,u("h3",{text:"\uC544\uC774\uD3F0 (Safari)"}),u("ol",null,u("li",{text:"\uC774 \uC8FC\uC18C\uB97C Safari\uB85C \uC5FD\uB2C8\uB2E4."}),u("li",{text:"\uC544\uB798\uCABD \uACF5\uC720 \uBC84\uD2BC(\uB124\uBAA8\uC5D0 \uD654\uC0B4\uD45C)\uC744 \uB204\uB985\uB2C8\uB2E4."}),u("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))),u("div",null,u("h3",{text:"\uC548\uB4DC\uB85C\uC774\uB4DC (Chrome)"}),u("ol",null,u("li",{text:"\uC774 \uC8FC\uC18C\uB97C Chrome\uC73C\uB85C \uC5FD\uB2C8\uB2E4."}),u("li",{text:"\uC624\uB978\uCABD \uC704 \u22EE \uBA54\uB274\uB97C \uB204\uB985\uB2C8\uB2E4."}),u("li",{text:"\u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019 \uB610\uB294 \u2018\uC571 \uC124\uCE58\u2019\uB97C \uB204\uB985\uB2C8\uB2E4."}))))),qI())}function qI(){let n=P.user;return!n||n.isAnonymous?u("div",{class:"boss-row"},u("button",{type:"button",class:"link-btn",onclick:LI,text:"\uB450\uBAA9 \uB85C\uADF8\uC778"})):P.bossKnown&&!P.bossUid?u("div",{class:"panel"},u("div",{class:"field-label",text:"\uB450\uBAA9 \uB4F1\uB85D"}),u("p",{class:"note",text:"\uC544\uC9C1 \uB450\uBAA9\uC774 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC558\uC5B4\uC694. \uC9C0\uAE08 \uB85C\uADF8\uC778\uD55C \uAD6C\uAE00 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D\uD560\uAE4C\uC694? \uD55C \uBC88 \uB4F1\uB85D\uD558\uBA74 \uC774 \uACC4\uC815\uB9CC \uC870\uC9C1\uC6D0\uACFC \uC8FC\uC81C\uB97C \uACE0\uCE60 \uC218 \uC788\uC5B4\uC694."}),u("button",{type:"button",class:"save",onclick:FI,text:"\uC774 \uACC4\uC815\uC744 \uB450\uBAA9\uC73C\uB85C \uB4F1\uB85D"}),u("button",{type:"button",class:"link-btn",onclick:Vl,text:"\uB85C\uADF8\uC544\uC6C3"})):en()?u("div",{class:"boss-row"},P.members.length===0&&P.membersReady?u("button",{type:"button",class:"save",disabled:P.importing,onclick:UI,text:P.importing?"\uAC00\uC838\uC624\uB294 \uC911\u2026":"\uAE30\uC874 \uBCF8\uBD80 \uAE30\uB85D \uAC00\uC838\uC624\uAE30"}):null,u("span",{class:"note",text:"\uB450\uBAA9\uC73C\uB85C \uB85C\uADF8\uC778\uB428"}),u("button",{type:"button",class:"link-btn",onclick:Vl,text:"\uB85C\uADF8\uC544\uC6C3"})):u("div",{class:"boss-row"},u("span",{class:"note",text:"\uC774 \uAD6C\uAE00 \uACC4\uC815\uC740 \uB450\uBAA9\uC774 \uC544\uB2C8\uC5D0\uC694."}),u("button",{type:"button",class:"link-btn",onclick:Vl,text:"\uB85C\uADF8\uC544\uC6C3"}))}function jI(){let n=P.pick&&et(P.pick);return u("section",{class:"gate"},Kl("logo-g"),u("div",null,u("span",{class:"eyebrow",text:"\uCD9C\uC785 \uD1B5\uC81C \xB7 \uC2E0\uC6D0 \uD655\uC778"}),u("h1",null,"\uBCF8\uBD80\uC5D0 \uB4E4\uC5B4\uC624\uB824\uBA74",u("br"),u("em",{text:"\uC2E0\uC6D0"}),"\uC744 \uBC1D\uD600\uB77C."),u("p",{text:"\uC790\uAE30 \uCE74\uB4DC\uB97C \uD55C \uBC88\uB9CC \uACE0\uB974\uBA74 \uC774 \uD3F0\uC774 \uAE30\uC5B5\uD574\uC694. \uAC8C\uC784\uACFC \uBC29\uBA85\uB85D\uC5D0\uC11C \uC774 \uC774\uB984\uC744 \uC368\uC694."})),u("div",{class:"pick",role:"group","aria-label":"\uC870\uC9C1\uC6D0 \uC120\uD0DD"},P.members.map(function(e){return u("button",{type:"button","aria-pressed":P.pick===e.id?"true":"false",onclick:function(){P.pick=e.id,X()}},u("div",{class:"pp"},tn(e)),u("span",{class:"pn",text:e.nick}))})),u("button",{class:"save",type:"button",disabled:!n,onclick:function(){n&&(Bl(n.id),P.pick=null,X(),j("\u2018"+n.nick+"\u2019 \uC2E0\uC6D0\uC73C\uB85C \uC785\uC7A5\uD588\uC5B4\uC694."))}},n?"\u2018"+n.nick+"\u2019 \uC2E0\uBD84\uC73C\uB85C \uC785\uC7A5":"\uC704\uC5D0\uC11C \uC790\uAE30 \uCE74\uB4DC\uB97C \uACE0\uB974\uC138\uC694"),u("button",{class:"guest-btn",type:"button",onclick:function(){Bl("guest"),P.pick=null,X()},text:"\uBA85\uBD80\uC5D0 \uC544\uC9C1 \uC5C6\uC5B4\uC694 \xB7 \uC190\uB2D8\uC73C\uB85C \uC785\uC7A5"}))}function zI(){let n=P.members,e=n.length?u("div",{class:"roster"},n.map(function(t){return u("button",{class:"card",type:"button","aria-label":t.nick+" \uC218\uBC30\uC11C \uC5F4\uAE30",onclick:function(){le("m-"+t.id)}},u("div",{class:"card-photo"},tn(t),u("span",{class:"tag"+(t.rank?" boss":""),text:t.rank||"\uC218\uBC30\uC911"}),zo()===t.id?u("span",{class:"me-tag",text:"\uBCF8\uC778"}):null),u("div",{class:"card-body"},u("span",{class:"card-no",text:jo(t)}),u("span",{class:"card-name",text:t.nick}),t.alias?u("span",{class:"card-alias",text:"\uC77C\uBA85 "+t.alias}):null))})):u("div",{class:"empty",text:P.membersReady?"\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC870\uC9C1\uC6D0\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.":"\uBA85\uBD80\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return u("section",{class:"screen"},u("div",{class:"sec-head"},u("div",null,u("span",{class:"eyebrow",text:"\uC870\uC9C1\uC6D0 \uBA85\uBD80"}),u("h2",{text:"\uC218\uBC30 \uB300\uC0C1 "+n.length+"\uBA85"}),u("p",{text:"\uCE74\uB4DC\uB97C \uB204\uB974\uBA74 \uC218\uBC30\uC11C\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4."})),en()?u("button",{class:"add-btn",type:"button",onclick:function(){zm(null)},text:"\uC870\uC9C1\uC6D0 \uB4F1\uB85D"}):null),e)}function GI(n){let e=et(n);if(!e)return u("section",{class:"screen"},u("button",{class:"back",type:"button",onclick:function(){le("members")},text:"\uBA85\uBD80\uB85C"}),u("div",{class:"empty",text:P.membersReady?"\uC774 \uC218\uBC30\uC11C\uB294 \uD3D0\uAE30\uB418\uC5C8\uAC70\uB098 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.":"\uC218\uBC30\uC11C\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026"}));let t=(e.charges||[]).filter(function(a){return a&&String(a).trim()}),r=u("div",{class:"ruler","aria-hidden":"true"},["190","180","170","160","150","140","130","120","110","100"].map(function(a){return u("span",{text:a})})),i=u("article",{class:"poster","aria-label":e.nick+" \uC218\uBC30\uC11C"},u("header",{class:"poster-top"},u("div",{class:"w",text:"\uC218\uBC30"}),u("div",{class:"sub",text:e.rank==="\uB450\uBAA9"?"WANTED \xB7 1\uAE09 \uC218\uBC30 \xB7 \uC870\uC9C1 \uB450\uBAA9":"WANTED \xB7 \uBD88\uC8FC\uBA39\uC870\uC9C1 \uB0B4\uBD80 \uC218\uBC30\uC11C"})),u("div",{class:"case"},u("span",null,"\uC0AC\uAC74\uBC88\uD638 ",u("b",{text:jo(e)})),u("span",null,"\uC9C1\uC704 ",u("b",{text:e.rank||"\uC870\uC9C1\uC6D0"}))),u("div",{class:"mug"},tn(e),r,u("i",{class:"corner tl"}),u("i",{class:"corner tr"}),u("i",{class:"corner bl"}),u("i",{class:"corner br"})),u("div",{class:"ident"},u("div",{class:"eyebrow",text:"\uB2C9\uB124\uC784"}),u("div",{class:"nick",text:e.nick}),e.alias?u("div",{class:"alias"},"\uC77C\uBA85 ",u("b",{text:"\u2018"+e.alias+"\u2019"})):null),u("div",{class:"field"},u("div",{class:"field-label",text:"\uBCF8\uC778 \uC9C4\uC220"}),u("p",{class:"statement",text:e.intro?"\u201C"+e.intro+"\u201D":"\uC9C4\uC220\uC744 \uAC70\uBD80\uD558\uACE0 \uC788\uC74C."})),u("div",{class:"field"},u("div",{class:"field-label",text:"\uD610\uC758 "+t.length+"\uAC74"}),t.length?u("ol",{class:"charges"},t.map(function(a){return u("li",{text:a})})):u("p",{class:"statement",text:"\uC544\uC9C1 \uB4DC\uB7EC\uB09C \uD610\uC758 \uC5C6\uC74C. \uC218\uC0AC \uC911."})),e.sample?u("div",{class:"draft-note",text:"\uC784\uC2DC \uAE30\uB85D \xB7 \uB450\uBAA9\uC774 \uACE7 \uCC44\uC6B8 \uC608\uC815"}):null,u("div",{class:"stamp","aria-hidden":"true",text:"\uD655\uC778"}),u("footer",{class:"poster-foot"},u("span",{text:"\uC81C\uBCF4\uCC98: \uBD88\uC8FC\uBA39\uC870\uC9C1 \uBE44\uBC00\uBCF8\uBD80"}),u("span",{text:"\uBCF8 \uBB38\uC11C\uB294 \uC870\uC9C1\uC6D0 \uC678 \uC5F4\uB78C\uC744 \uAE08\uD568"}))),s=null;return en()&&(s=P.confirmDelete?u("div",{class:"confirm"},u("p",{text:"\u2018"+e.nick+"\u2019 \uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD560\uAE4C\uC694? \uBAA8\uB4E0 \uC870\uC9C1\uC6D0 \uD654\uBA74\uC5D0\uC11C \uC0AC\uB77C\uC9D1\uB2C8\uB2E4."}),u("div",{class:"op-row"},u("button",{type:"button",onclick:function(){P.confirmDelete=!1,X()},text:"\uCDE8\uC18C"}),u("button",{type:"button",class:"danger",onclick:async function(){try{await hr(me(B,"members",e.id)),P.confirmDelete=!1,le("members"),j("\uC218\uBC30\uC11C\uB97C \uD3D0\uAE30\uD588\uC5B4\uC694.")}catch(a){j(se(a))}},text:"\uD3D0\uAE30\uD558\uAE30"}))):u("div",{class:"op-row"},u("button",{type:"button",onclick:function(){zm(e)},text:"\uC218\uBC30\uC11C \uC218\uC815"}),u("button",{type:"button",class:"danger",onclick:function(){P.confirmDelete=!0,X()},text:"\uD3D0\uAE30"}))),u("section",{class:"screen"},u("button",{class:"back",type:"button",onclick:function(){le("members")},text:"\uBA85\uBD80\uB85C"}),i,s)}var KI=[{id:"assoc",code:"G-01",name:"\uC5F0\uC0C1\uD034\uC988",desc:"\uB2E8\uC5B4 \uD558\uB098\uB85C \uB5A0\uC62C\uB9AC\uB294 \uC870\uC9C1\uC6D0\uB4E4\uC758 \uBA38\uB9BF\uC18D.",ready:!1},{id:"mafia",code:"G-02",name:"\uB9C8\uD53C\uC544",desc:"\uC870\uC9C1 \uC548\uC5D0 \uC870\uC9C1\uC774 \uC788\uB2E4. \uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC529.",ready:!0},{id:"yut",code:"G-03",name:"\uC737\uB180\uC774",desc:"\uB3C4\xB7\uAC1C\xB7\uAC78\xB7\uC737\xB7\uBAA8\uB85C \uAC00\uB9AC\uB294 \uBCF8\uBD80 \uC11C\uC5F4.",ready:!1},{id:"liar",code:"G-04",name:"\uB77C\uC774\uC5B4",desc:"\uD63C\uC790\uB9CC \uC81C\uC2DC\uC5B4\uB97C \uBAA8\uB974\uB294 \uC0AC\uB78C\uC744 \uCC3E\uC544\uB77C.",ready:!0},{id:"sketch",code:"G-05",name:"\uB4DC\uB85C\uC789\uD034\uC988",desc:"\uD55C \uBA85\uC740 \uADF8\uB9AC\uACE0, \uB098\uBA38\uC9C0\uB294 \uB9DE\uD600\uB77C.",ready:!0}];function WI(){return u("section",{class:"screen"},u("div",{class:"sec-head"},u("div",null,u("span",{class:"eyebrow",text:"\uD734\uAC8C \uAD6C\uC5ED"}),u("h2",{text:"\uAC8C\uC784\uBC29"}),u("p",{text:"\uAC8C\uC784\uC740 \uD558\uB098\uC529 \uC21C\uC11C\uB300\uB85C \uC5F4\uB9BD\uB2C8\uB2E4."}))),u("div",{class:"games"},KI.map(function(n){return u("button",{class:"game"+(n.ready?" ready":""),type:"button",disabled:!n.ready,"aria-label":n.name+(n.ready?" \uC5F4\uAE30":" \uC900\uBE44 \uC911"),onclick:n.ready?function(){le("game-"+n.id)}:null},u("span",{class:"code",text:n.code}),u("h3",{text:n.name}),u("p",{text:n.desc}),u("span",{class:"status",text:n.ready?"\uC785\uC7A5 \uAC00\uB2A5":"\uC900\uBE44 \uC911"}))})))}var Sm={lobby:"\uB300\uAE30 \uC911",hint:"\uC124\uBA85 \uC911",discuss:"\uD1A0\uB860 \uC911",vote:"\uD22C\uD45C \uC911",guess:"\uB77C\uC774\uC5B4 \uBC18\uACA9",result:"\uACB0\uACFC \uBC1C\uD45C"},mr=Gl&&new URLSearchParams(location.search).has("fast")?parseFloat(new URLSearchParams(location.search).get("fast"))||10:0,No={hint:20,discuss:120,vote:20,guess:20};mr&&Object.keys(No).forEach(function(n){No[n]=Math.max(2,Math.round(No[n]/mr))});function HI(){let n=pe(),e=P.rooms.filter(function(r){return r.status&&r.status!=="closed"&&(!r.type||r.type==="liar")}),t=e.length?u("ul",{class:"room-list"},e.map(function(r){let i=n&&(r.players||[]).indexOf(n.id)>=0;return u("li",null,u("button",{type:"button",class:"room-item",onclick:function(){le("room-"+r.id)}},u("span",{class:"ri-main"},u("b",{text:Y(r.createdBy)+"\uC758 \uBC29"}),u("span",{class:"ri-sub",text:(r.players||[]).map(Y).join(", ")||"\uC544\uC9C1 \uC544\uBB34\uB3C4 \uC5C6\uC5B4\uC694"})),u("span",{class:"ri-side"},u("span",{class:"status-chip"+(r.status==="lobby"?" open":""),text:Sm[r.status]||r.status}),u("span",{class:"ri-sub",text:(r.players||[]).length+"\uBA85"+(i?" \xB7 \uCC38\uAC00 \uC911":"")}))))})):u("div",{class:"empty",text:P.roomsReady?"\uC5F4\uB9B0 \uBC29\uC774 \uC5C6\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC870\uC9C1\uC6D0\uC744 \uBD88\uB7EC \uBAA8\uC73C\uC138\uC694.":"\uBC29 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return u("section",{class:"screen"},u("button",{class:"back",type:"button",onclick:function(){le("games")},text:"\uAC8C\uC784\uBC29\uC73C\uB85C"}),u("div",{class:"sec-head"},u("div",null,u("span",{class:"eyebrow",text:"G-04"}),u("h2",{text:"\uB77C\uC774\uC5B4"}),u("p",{text:"\uBC29\uC744 \uB9CC\uB4E4\uAC70\uB098 \uC5F4\uB9B0 \uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uC138\uC694. \uC124\uBA85\uACFC \uD22C\uD45C\uB294 \uBAA8\uB450 \uAC8C\uC784 \uC548\uC5D0\uC11C \uD574\uC694."}))),u("button",{type:"button",class:"save",disabled:!n||!P.user,onclick:function(){Wl("liar")}},n?"\uC0C8 \uBC29 \uB9CC\uB4E4\uAE30":"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uBC29\uC744 \uB9CC\uB4E4 \uC218 \uC788\uC5B4\uC694"),u("div",{class:"field"},u("div",{class:"field-label",text:"\uC5F4\uB9B0 \uBC29"}),t),QI(),en()?tb():null)}function QI(){return u("details",{class:"guide"},u("summary",{text:"\uB77C\uC774\uC5B4 \uAC8C\uC784 \uADDC\uCE59"}),u("div",{class:"guide-body"},u("ol",null,u("li",{text:"\uBC29\uC744 \uB9CC\uB4E4\uACE0 \uB2E8\uD1A1\uBC29\uC5D0 \uC54C\uB824\uC694. \uB2E4\uB4E4 \uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0\uC11C \uADF8 \uBC29\uC744 \uB20C\uB7EC \uCC38\uAC00\uD574\uC694."}),u("li",{text:"3\uBA85 \uC774\uC0C1 \uBAA8\uC774\uBA74 \uC544\uBB34\uB098 \u2018\uAC8C\uC784 \uC2DC\uC791\u2019\uC744 \uB20C\uB7EC\uC694. \uB9CC\uB4E0 \uC0AC\uB78C\uB3C4 \uB77C\uC774\uC5B4\uAC00 \uB204\uAD70\uC9C0 \uBAB0\uB77C\uC694."}),u("li",{text:"\uAC01\uC790 \uCE74\uB4DC\uB97C \uBAB0\uB798 \uD655\uC778\uD574\uC694. \uB77C\uC774\uC5B4\uC5D0\uAC8C\uB294 \uC8FC\uC81C\uB9CC \uBCF4\uC5EC\uC694."}),u("li",{text:"\uB79C\uB364 \uC21C\uC11C\uB85C \uD55C \uBA85\uC529 \uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD574\uC694. \uD55C \uC0AC\uB78C\uB2F9 20\uCD08, \uC2DC\uAC04\uC774 \uC9C0\uB098\uBA74 \uB2E4\uC74C \uC0AC\uB78C\uC73C\uB85C \uB118\uC5B4\uAC00\uC694."}),u("li",{text:"\uC124\uBA85\uC774 \uB05D\uB098\uBA74 2\uBD84 \uB3D9\uC548 \uB300\uD654\uCC3D\uC5D0\uC11C \uD1A0\uB860\uD574\uC694. \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uC77C\uCC0D \uB05D\uB098\uC694."}),u("li",{text:"20\uCD08 \uC548\uC5D0 \uB77C\uC774\uC5B4\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC5D0\uAC8C \uD22C\uD45C\uD574\uC694."}),u("li",{text:"\uB77C\uC774\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4\uC5D0\uAC8C 20\uCD08\uC758 \uB9C8\uC9C0\uB9C9 \uAE30\uD68C\uAC00 \uC788\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC, \uBABB \uB9DE\uD788\uBA74 \uC870\uC9C1\uC6D0 \uC2B9\uB9AC. \uB3D9\uC810\uC774\uAC70\uB098 \uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD558\uBA74 \uB77C\uC774\uC5B4 \uC2B9\uB9AC\uC608\uC694."})),u("p",{class:"note",text:"\uBC14\uBCF4 \uBAA8\uB4DC\uC5D0\uC11C\uB294 \uB77C\uC774\uC5B4\uB3C4 \uAC19\uC740 \uC8FC\uC81C\uC758 \uB2E4\uB978 \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC11C, \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778\uC9C0 \uBAA8\uB978 \uCC44 \uC124\uBA85\uD574\uC694."})))}async function Wl(n){let e=pe();if(!(!e||!P.user))try{let t=await kn(Me(B,"rooms"),{type:n==="mafia"||n==="sketch"?n:"liar",status:"lobby",createdAt:qe(),createdBy:e.id,players:[e.id],mode:0,topicChoice:-1,rounds:1,game:0,votes:{},turn:0});le("room-"+t.id)}catch(t){j(se(t))}}function G(){return me(B,"rooms",P.roomId)}async function gr(n){try{await Pn(G(),n)}catch(e){j(se(e))}}async function Hl(){let n=pe();n&&await gr({players:xo(n.id)})}async function Ql(){let n=pe(),e=P.room;if(!n||!e)return;let t=(e.players||[]).filter(function(r){return r!==n.id});await gr(t.length?{players:Ol(n.id)}:{players:Ol(n.id),status:"closed"}),le("game-liar")}async function YI(){let n=OI();try{await ve(B,async function(e){let r=(await e.get(G())).data();if(!r||r.status!=="lobby")throw{code:"phase"};let i=(r.players||[]).filter(function(h){return!!et(h)}).slice().sort();if(i.length<3)throw{code:"few"};let s=r.topicChoice>=0&&Lo[r.topicChoice]?Lo[r.topicChoice]:n[Math.floor(Math.random()*n.length)],a=Math.floor(Math.random()*2147483647),c=Go(i,a,s.words);e.update(G(),{status:"hint",lineup:i,seed:a,topic:{name:s.name,words:s.words},order:c.order,turn:0,votes:{},accused:null,guess:null,winner:null,reason:null,game:(r.game||0)+1,startedAt:qe(),phase:(r.phase||0)+1,phaseAt:qe(),readyVote:[]})}),P.flipped={}}catch(e){e&&e.code==="few"?j("3\uBA85 \uC774\uC0C1 \uBAA8\uC5EC\uC57C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."):e&&e.code==="phase"?j("\uC774\uBBF8 \uAC8C\uC784\uC774 \uC2DC\uC791\uB410\uC5B4\uC694."):j(se(e))}}async function Yl(n,e){let t=pe(),r=P.room,i=t?t.nick:"\uC190\uB2D8";return kn(Me(B,"rooms",P.roomId,"msgs"),{uid:xn(),memberId:t?t.id:null,nick:i,text:e,kind:n,game:r&&r.game||0,createdAt:qe()})}function we(n,e){return Object.assign({phase:(n.phase||0)+1,phaseAt:qe()},e)}async function ql(n,e,t){let r=pe();await ve(B,async function(i){let a=(await i.get(G())).data();if(!a||a.status!=="hint")throw{code:"phase"};if(t!=null&&a.phase!==t)throw{code:"phase"};let c=a.order.length,h=a.order[a.turn%c];if(n==="hint"&&h!==(r&&r.id))throw{code:"turn"};let f=me(Me(B,"rooms",P.roomId,"msgs"));i.set(f,{uid:xn(),memberId:r?r.id:null,nick:r?r.nick:"\uC190\uB2D8",text:n==="hint"?e:n==="timeout"?Y(h)+" \uC2DC\uAC04 \uCD08\uACFC! \uB2E4\uC74C \uC0AC\uB78C \uCC28\uB840\uC608\uC694.":Y(h)+" \uCC28\uB840\uB97C \uB118\uACBC\uC5B4\uC694.",kind:n==="hint"?"hint":"skip",game:a.game||0,round:Math.floor(a.turn/c)+1,speaker:h,createdAt:qe()});let p=a.turn+1;i.update(G(),we(a,p>=c*(a.rounds||1)?{turn:p,status:"discuss",readyVote:[]}:{turn:p}))})}async function JI(n){await ve(B,async function(e){let r=(await e.get(G())).data();!r||r.status!=="discuss"||n!=null&&r.phase!==n||e.update(G(),we(r,{status:"vote"}))})}async function $I(){let n=pe();if(n)try{await Pn(G(),{readyVote:xo(n.id)}),await ve(B,async function(e){let r=(await e.get(G())).data();if(!r||r.status!=="discuss")return;let i=Math.ceil((r.lineup||[]).length/2);(r.readyVote||[]).length>=i&&e.update(G(),we(r,{status:"vote"}))})}catch(e){j(se(e))}}async function XI(n){let e=pe();if(e)try{await Pn(G(),{["votes."+e.id]:n}),await Rm(!1)}catch(t){j(se(t))}}async function Rm(n,e){try{await ve(B,async function(t){let i=(await t.get(G())).data();if(!i||i.status!=="vote"||e!=null&&i.phase!==e)return;let s=i.votes||{},a=i.lineup||[],c=a.filter(function(_){return s[_]});if(!n&&c.length<a.length)return;let h=Go(a,i.seed,i.topic.words),f={};c.forEach(function(_){f[s[_]]=(f[s[_]]||0)+1});let p=0;Object.keys(f).forEach(function(_){f[_]>p&&(p=f[_])});let y=Object.keys(f).filter(function(_){return f[_]===p});c.length?y.length>1?t.update(G(),we(i,{status:"result",winner:"liar",accused:null,reason:"\uD45C\uAC00 \uB611\uAC19\uC774 \uAC08\uB824\uC11C \uB77C\uC774\uC5B4\uB97C \uC7A1\uC9C0 \uBABB\uD588\uC5B4\uC694."})):y[0]!==h.liar?t.update(G(),we(i,{status:"result",winner:"liar",accused:y[0],reason:"\uC5C9\uB6B1\uD55C \uC0AC\uB78C\uC744 \uC9C0\uBAA9\uD588\uC5B4\uC694."})):t.update(G(),we(i,{status:"guess",accused:y[0]})):t.update(G(),we(i,{status:"result",winner:"liar",accused:null,reason:"\uC544\uBB34\uB3C4 \uD22C\uD45C\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694."}))})}catch(t){j(se(t))}}async function jl(n,e,t){await ve(B,async function(r){let s=(await r.get(G())).data();if(!s||s.status!=="guess"||t!=null&&s.phase!==t)return;let a=Go(s.lineup,s.seed,s.topic.words),c=n&&pr(n)===pr(a.word);r.update(G(),we(s,{status:"result",guess:n||"",winner:c?"liar":"team",reason:c?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD614\uC5B4\uC694.":e?"\uB77C\uC774\uC5B4\uAC00 20\uCD08 \uC548\uC5D0 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uC9C0 \uBABB\uD588\uC5B4\uC694.":n?"\uB77C\uC774\uC5B4\uAC00 \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uC9C0 \uBABB\uD588\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uAC00 \uB9DE\uD788\uAE30\uB97C \uD3EC\uAE30\uD588\uC5B4\uC694."}))})}var ZI=1500,pm="";function Fo(n){return(n&&n.type==="mafia"?Oo:n&&n.type==="sketch"?Ci:No)[n&&n.status]}function Uo(n){return!n||!Fo(n)||!n.phaseAt||!n.phaseAt.toMillis?null:n.phaseAt.toMillis()+Fo(n)*1e3}function Pm(n){return Math.floor(n/60)+":"+String(n%60).padStart(2,"0")}function Ye(n,e){let t=Uo(n),r=(Fo(n)||1)*1e3,i=t==null?r:t-Date.now(),s=Math.max(0,Math.ceil(i/1e3)),a=u("i");return a.style.width=Math.max(0,Math.min(100,i/r*100))+"%",u("div",{class:"timer"+(s<=10?" low":""),role:"timer"},u("span",{class:"t-label",text:e}),u("b",{class:"t-num",text:Pm(s)}),u("span",{class:"t-bar"},a))}async function eE(n){if(n.type==="mafia")return mE(n);if(n.type==="sketch")return UE(n);if(n.status==="hint")return ql("timeout",null,n.phase);if(n.status==="discuss")return JI(n.phase);if(n.status==="vote")return Rm(!0,n.phase);if(n.status==="guess")return jl("",!0,n.phase)}setInterval(function(){let n=P.room;if(!n||Em().indexOf("room-")!==0)return;let e=Uo(n);if(e==null)return;let t=e-Date.now(),r=Fo(n)*1e3,i=Math.max(0,Math.ceil(t/1e3));document.querySelectorAll(".timer").forEach(function(a){a.querySelector(".t-num").textContent=Pm(i),a.querySelector(".t-bar i").style.width=Math.max(0,Math.min(100,t/r*100))+"%",a.classList.toggle("low",i<=10)});let s=n.id+":"+n.phase;t<-ZI&&pm!==s&&P.user&&(pm=s,eE(n).catch(function(){}))},500);async function yr(){await gr({status:"lobby",votes:{},accused:null,guess:null,winner:null,reason:null,turn:0,order:[],lineup:[],topic:null,readyVote:[],phaseAt:null,alive:[],night:{},checks:[],verdict:{},day:0,word:null,guessed:[],used:[],scores:{},skipUsed:!1})}function tE(n){Am(n);let e=u("button",{class:"back",type:"button",onclick:function(){le("game-liar")},text:"\uB77C\uC774\uC5B4 \uBC29 \uBAA9\uB85D"});if(P.roomMissing)return u("section",{class:"screen"},e,u("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uAC70\uB098 \uC5C6\uC5B4\uC694."}));let t=P.room;if(!t)return u("section",{class:"screen"},e,u("div",{class:"empty",text:"\uBC29\uC5D0 \uB4E4\uC5B4\uAC00\uB294 \uC911\u2026"}));if(t.status==="closed")return u("section",{class:"screen"},e,u("div",{class:"empty",text:"\uC774 \uBC29\uC740 \uB2EB\uD614\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC8FC\uC138\uC694."}));if(t.type==="mafia")return _E(t);if(t.type==="sketch")return $E(t);let r=pe(),i=t.players||[],s=r&&i.indexOf(r.id)>=0,a=t.status!=="lobby",c=a?t.lineup||[]:i,h=r&&c.indexOf(r.id)>=0,f=a?VI(t):null;if(a&&!f)return u("section",{class:"screen"},e,u("div",{class:"empty",text:"\uAC8C\uC784 \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694. \u2018\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354\u2019\uB85C \uB2E4\uC2DC \uC2DC\uC791\uD574 \uC8FC\uC138\uC694."}),u("button",{type:"button",class:"ghost wide",onclick:yr,text:"\uB300\uAE30\uC2E4\uB85C \uB3CC\uB9AC\uAE30"}));let p=u("div",{class:"room-head"},u("div",null,u("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4 \xB7 "+Y(t.createdBy)+"\uC758 \uBC29"}),u("h2",{text:Sm[t.status]||""})),u("span",{class:"mode-chip",text:(t.mode===1?"\uBC14\uBCF4 \uBAA8\uB4DC":"\uC77C\uBC18 \uBAA8\uB4DC")+" \xB7 "+(t.rounds||1)+"\uBC14\uD034"})),y=u("div",{class:"chips"},c.map(function(O){let x=t.status==="vote"&&t.votes&&t.votes[O];return u("span",{class:"chip static"+(r&&O===r.id?" me":"")+(x?" done":"")},Y(O)+(x?" \u2713":""))})),_;t.status==="lobby"?_=nE(t,r,s,i):t.status==="hint"?_=iE(t,r,h,f):t.status==="discuss"?_=sE(t,r,h):t.status==="vote"?_=oE(t,r,h):t.status==="guess"?_=aE(t,r,f):_=cE(t,f,r,h);let S=a&&h&&t.status!=="result"?rE(t,r,f):null,C=a||P.msgs.length;return u("section",{class:"screen room"},e,p,u("div",{class:"field"},u("div",{class:"field-label",text:(a?"\uCC38\uAC00\uC790 ":"\uBAA8\uC778 \uC0AC\uB78C ")+c.length+"\uBA85"}),y),S,_,C?uE(t,r):null)}function nE(n,e,t,r){function i(c,h,f,p){return u("button",{type:"button","aria-pressed":(n[c]||(c==="rounds"?1:0))===h?"true":"false",onclick:function(){let y={};y[c]=h,gr(y)}},f,p?u("small",{text:p}):null)}let s=u("select",{id:"room-topic",class:"select"},u("option",{value:"-1",text:"\uB79C\uB364"}),Lo.map(function(c,h){return u("option",{value:String(h),text:c.name})}));s.value=String(n.topicChoice==null?-1:n.topicChoice),s.addEventListener("change",function(){gr({topicChoice:parseInt(s.value,10)})});let a=r.length>=3;return u("div",{class:"panel"},u("div",{class:"field-label",text:"\uAC8C\uC784 \uC124\uC815 \xB7 \uCC38\uAC00\uC790 \uB204\uAD6C\uB098 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694"}),u("div",{class:"seg"},i("mode",0,"\uC77C\uBC18","\uB77C\uC774\uC5B4\uB294 \uC790\uAE30\uAC00 \uB77C\uC774\uC5B4\uC778 \uAC78 \uC54C\uC544\uC694"),i("mode",1,"\uBC14\uBCF4","\uB77C\uC774\uC5B4\uB3C4 \uBE44\uC2B7\uD55C \uB2E8\uC5B4\uB97C \uBC1B\uC544\uC694")),u("div",{class:"seg"},i("rounds",1,"\uC124\uBA85 1\uBC14\uD034"),i("rounds",2,"\uC124\uBA85 2\uBC14\uD034")),u("label",{class:"sub-label",for:"room-topic",text:"\uC8FC\uC81C"}),s,e?t?u("div",{class:"op-row"},u("button",{type:"button",onclick:Ql,text:"\uBC29 \uB098\uAC00\uAE30"}),u("button",{type:"button",class:"go",disabled:!a,onclick:YI,text:a?"\uAC8C\uC784 \uC2DC\uC791":"3\uBA85\uBD80\uD130 \uC2DC\uC791"})):u("button",{type:"button",class:"save",onclick:Hl,text:"\uC774 \uBC29\uC5D0 \uCC38\uAC00\uD558\uAE30"}):u("p",{class:"note",text:"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uCC38\uAC00\uD560 \uC218 \uC788\uC5B4\uC694. \uC190\uB2D8\uC740 \uAD6C\uACBD\uACFC \uCC44\uD305\uB9CC \uD560 \uC218 \uC788\uC5B4\uC694."}),u("p",{class:"hint",text:"\uB2E8\uD1A1\uBC29\uC5D0 \u2018\uAC8C\uC784\uBC29 \u2192 \uB77C\uC774\uC5B4\uC5D0 \uBC29 \uC5F4\uC5C8\uC5B4\uC694\u2019\uB77C\uACE0 \uC54C\uB824\uC8FC\uC138\uC694."}))}function rE(n,e,t){let r=t.liar===e.id,i=r&&n.mode===0;return u("div",{class:"secret-card front compact"+(i?" liar":"")},u("span",{class:"sc-eyebrow",text:"\uB0B4 \uCE74\uB4DC \xB7 \uC8FC\uC81C "+n.topic.name}),u("span",{class:"sc-big",text:i?"\uB2F9\uC2E0\uC740 \uB77C\uC774\uC5B4":r?t.fool:t.word}),u("span",{class:"sc-hint",text:i?"\uC81C\uC2DC\uC5B4\uB97C \uBAB0\uB77C\uC694. \uB2E4\uB978 \uC0AC\uB78C \uC124\uBA85\uC744 \uB4E3\uACE0 \uB4E4\uD0A4\uC9C0 \uC54A\uAC8C \uB458\uB7EC\uB300\uC138\uC694.":"\uB2E8\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uC9C0 \uB9D0\uACE0 \uC124\uBA85\uD558\uC138\uC694."}))}function iE(n,e,t,r){let i=n.order.length,s=n.order[n.turn%i],a=Math.floor(n.turn/i)+1,c=e&&s===e.id,h=i*(n.rounds||1),f=u("div",{class:"panel turn"+(c?" mine":"")},u("div",{class:"field-label",text:a+"\uBC14\uD034 \xB7 "+(n.turn+1)+" / "+h+"\uBC88\uC9F8 \uC124\uBA85"}),u("div",{class:"turn-now"},u("span",{class:"eyebrow",text:"\uC9C0\uAE08 \uCC28\uB840"}),u("b",{text:c?"\uB0B4 \uCC28\uB840\uC608\uC694!":Y(s)})),Ye(n,c?"\uB0B4 \uC124\uBA85 \uB0A8\uC740 \uC2DC\uAC04":Y(s)+" \uB0A8\uC740 \uC2DC\uAC04"),u("ol",{class:"order mini"},n.order.map(function(p,y){return u("li",{class:(y===n.turn%i?"now":"")+(e&&p===e.id?" me":"")},u("span",{text:Y(p)}))})));if(c){let p=Dn("input","hint-text",{type:"text",class:"text-in",maxlength:"60",placeholder:"\uC81C\uC2DC\uC5B4\uB97C \uD55C \uB9C8\uB514\uB85C \uC124\uBA85\uD558\uC138\uC694",autocomplete:"off"}),y=u("form",{class:"send-row",novalidate:!0},p,u("button",{type:"submit",class:"btn-sm go",text:"\uC124\uBA85 \uC62C\uB9AC\uAE30"}));y.addEventListener("submit",async function(_){_.preventDefault();let S=p.value.trim();if(S){if(r&&pr(S).indexOf(pr(r.word))>=0&&r.liar!==e.id){j("\uC81C\uC2DC\uC5B4\uB97C \uADF8\uB300\uB85C \uC4F0\uBA74 \uC548 \uB3FC\uC694.");return}try{await ql("hint",S),P.drafts["hint-text"]="",X()}catch(C){j(C&&(C.code==="turn"||C.code==="phase")?"\uC2DC\uAC04\uC774 \uC9C0\uB098\uC11C \uCC28\uB840\uAC00 \uB118\uC5B4\uAC14\uC5B4\uC694.":se(C))}}}),Qe(f,y)}else Qe(f,u("button",{type:"button",class:"link-btn",onclick:async function(){try{await ql("skip")}catch(p){j(se(p))}},text:Y(s)+" \uCC28\uB840 \uB118\uAE30\uAE30 (\uC790\uB9AC \uBE44\uC6E0\uC744 \uB54C)"}));return f}function sE(n,e,t){let r=Math.ceil((n.lineup||[]).length/2),i=n.readyVote||[],s=e&&i.indexOf(e.id)>=0;return u("div",{class:"panel turn"},u("div",{class:"field-label",text:"\uD1A0\uB860 \uC2DC\uAC04"}),Ye(n,"\uD1A0\uB860 \uB0A8\uC740 \uC2DC\uAC04"),u("p",{text:"\uC124\uBA85\uC774 \uB05D\uB0AC\uC5B4\uC694. \uC544\uB798 \uB300\uD654\uCC3D\uC5D0\uC11C \uB204\uAC00 \uB77C\uC774\uC5B4\uC778\uC9C0 \uC774\uC57C\uAE30\uD574 \uBCF4\uC138\uC694."}),t?u("button",{type:"button",class:s?"ghost wide":"save",disabled:s,onclick:$I},(s?"\uBC14\uB85C \uD22C\uD45C\uC5D0 \uCC2C\uC131\uD588\uC5B4\uC694 ":"\uBC14\uB85C \uD22C\uD45C\uD558\uAE30 ")+"("+i.length+"/"+r+")"):null,u("p",{class:"hint",text:"\uCC38\uAC00\uC790 \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 2\uBD84\uC774 \uC9C0\uB098\uAE30 \uC804\uC5D0 \uD22C\uD45C\uB85C \uB118\uC5B4\uAC00\uC694."}))}function oE(n,e,t){let r=n.votes||{},i=n.lineup||[],s=i.filter(function(c){return r[c]}).length,a=e?r[e.id]:null;return u("div",{class:"panel"},u("div",{class:"field-label",text:"\uD22C\uD45C \xB7 "+s+" / "+i.length+"\uBA85 \uC644\uB8CC"}),Ye(n,"\uD22C\uD45C \uB0A8\uC740 \uC2DC\uAC04"),t?u("div",{class:"vote-grid"},i.filter(function(c){return c!==e.id}).map(function(c){return u("button",{type:"button",class:"vote-btn","aria-pressed":a===c?"true":"false",onclick:function(){XI(c)}},u("div",{class:"vp"},tn(et(c)||{})),u("span",{text:Y(c)}))})):u("p",{class:"note",text:"\uCC38\uAC00\uC790\uB4E4\uC774 \uD22C\uD45C\uD558\uACE0 \uC788\uC5B4\uC694."}),t?u("p",{class:"hint",text:a?"\u2018"+Y(a)+"\u2019\uC5D0\uAC8C \uD22C\uD45C\uD588\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.":"\uB77C\uC774\uC5B4\uB77C\uACE0 \uC0DD\uAC01\uD558\uB294 \uC0AC\uB78C\uC744 \uB204\uB974\uC138\uC694. \uC2DC\uAC04\uC774 \uB05D\uB098\uBA74 \uADF8\uB54C\uAE4C\uC9C0 \uBC1B\uC740 \uD45C\uB85C \uC9D1\uACC4\uD574\uC694."}):null)}function aE(n,e,t){let r=n.accused;if(e&&e.id===r){let i=Dn("input","guess-text",{type:"text",class:"text-in",maxlength:"30",placeholder:"\uC81C\uC2DC\uC5B4\uB294 \uBB34\uC5C7\uC77C\uAE4C\uC694?",autocomplete:"off"}),s=u("form",{class:"send-row",novalidate:!0},i,u("button",{type:"submit",class:"btn-sm go",text:"\uC815\uB2F5 \uC81C\uCD9C"}));return s.addEventListener("submit",async function(a){a.preventDefault();try{await jl(i.value.trim()),P.drafts["guess-text"]=""}catch(c){j(se(c))}}),u("div",{class:"panel turn mine"},u("div",{class:"field-label",text:"\uB77C\uC774\uC5B4\uC758 \uB9C8\uC9C0\uB9C9 \uAE30\uD68C"}),Ye(n,"\uC815\uB2F5 \uB0A8\uC740 \uC2DC\uAC04"),u("p",{text:n.mode===1?"\uB4E4\uCF30\uC5B4\uC694! \uB2F9\uC2E0\uC774 \uB77C\uC774\uC5B4\uC600\uC5B4\uC694. \uC9C4\uC9DC \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694.":"\uB4E4\uCF30\uC5B4\uC694! \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uBA74 \uC5ED\uC804\uC2B9\uC774\uC5D0\uC694."}),u("p",{class:"note",text:"\uC8FC\uC81C: "+n.topic.name}),s,u("button",{type:"button",class:"link-btn",onclick:function(){jl("")},text:"\uD3EC\uAE30\uD558\uAE30"}))}return u("div",{class:"panel turn"},u("div",{class:"field-label",text:"\uB77C\uC774\uC5B4 \uAC80\uAC70"}),Ye(n,"\uB77C\uC774\uC5B4 \uB0A8\uC740 \uC2DC\uAC04"),u("p",null,u("b",{text:Y(r)}),"\uB2D8\uC774 \uB77C\uC774\uC5B4\uB85C \uC9C0\uBAA9\uB410\uC5B4\uC694. \uC81C\uC2DC\uC5B4\uB97C \uB9DE\uD788\uB294 \uC911\uC774\uC5D0\uC694\u2026"))}function cE(n,e,t,r){let i=n.winner==="team",s=et(e.liar)||{nick:Y(e.liar)},a=n.votes||{};return u("div",{class:"answer"+(i?" team":"")},u("div",{class:"result-title",text:i?"\uC870\uC9C1\uC6D0 \uC2B9\uB9AC":"\uB77C\uC774\uC5B4 \uC2B9\uB9AC"}),u("p",{class:"note",text:n.reason||""}),u("div",{class:"ans-liar"},u("div",{class:"ans-photo"},tn(s)),u("div",null,u("span",{class:"eyebrow",text:"\uB77C\uC774\uC5B4"}),u("b",{text:s.nick}))),u("p",null,"\uC81C\uC2DC\uC5B4: ",u("b",{text:e.word}),"  \xB7  \uC8FC\uC81C: "+n.topic.name),n.mode===1?u("p",null,"\uB77C\uC774\uC5B4\uAC00 \uBC1B\uC740 \uB2E8\uC5B4: ",u("b",{text:e.fool})):null,n.guess?u("p",null,"\uB77C\uC774\uC5B4\uC758 \uB2F5: ",u("b",{text:n.guess})):null,Object.keys(a).length?u("ul",{class:"vote-list"},(n.lineup||[]).filter(function(c){return a[c]}).map(function(c){return u("li",{text:Y(c)+" \u2192 "+Y(a[c])})})):null,u("div",{class:"op-row"},u("button",{type:"button",onclick:function(){le("game-liar")},text:"\uBC29 \uBAA9\uB85D"}),u("button",{type:"button",class:"go",onclick:yr,text:"\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354"})))}function uE(n,e){let t=n.game||0,r=P.msgs.filter(function(c){return(c.game||0)===t}),i=u("div",{class:"log",role:"log","aria-live":"polite"},r.length?r.map(function(c){if(c.kind==="skip")return u("div",{class:"msg-sys",text:c.text});let h=e&&c.memberId===e.id;return u("div",{class:"bubble "+(c.kind==="hint"?"hint":"chat")+(h?" mine":"")},u("div",{class:"b-meta"},u("b",{text:c.nick||"\uC190\uB2D8"}),c.kind==="hint"?u("span",{class:"b-tag",text:(c.round||1)+"\uBC14\uD034 \uC124\uBA85"}):null),u("div",{class:"b-text",text:c.text}))}):u("div",{class:"msg-sys",text:"\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694."})),s=Dn("input","chat-text",{type:"text",class:"text-in",maxlength:"120",placeholder:n.status==="discuss"?"\uD1A0\uB860 \uBA54\uC2DC\uC9C0 \uBCF4\uB0B4\uAE30":"\uC7A1\uB2F4 \uBCF4\uB0B4\uAE30",autocomplete:"off"}),a=u("form",{class:"send-row",novalidate:!0},s,u("button",{type:"submit",class:"btn-sm",text:"\uBCF4\uB0B4\uAE30"}));return a.addEventListener("submit",async function(c){c.preventDefault();let h=s.value.trim();if(!(!h||!P.user))try{await Yl("chat",h),P.drafts["chat-text"]="",X()}catch(f){j(se(f))}}),u("div",{class:"field"},u("div",{class:"field-label",text:"\uB300\uD654"}),i,a)}var Oo={night:30,day:120,vote:20,defense:20,verdict:15};mr&&Object.keys(Oo).forEach(function(n){Oo[n]=Math.max(2,Math.round(Oo[n]/mr))});var lE={lobby:"\uB300\uAE30 \uC911",night:"\uBC24",day:"\uB0AE \uD1A0\uB860",vote:"\uCC98\uD615 \uD22C\uD45C",defense:"\uCD5C\uD6C4\uC758 \uBCC0\uB860",verdict:"\uCC2C\uBC18 \uD22C\uD45C",result:"\uAC8C\uC784 \uB05D"},Jl={mafia:{name:"\uB9C8\uD53C\uC544",desc:"\uBC24\uB9C8\uB2E4 \uB3D9\uB8CC\uC640 \uD568\uAED8 \uD55C \uBA85\uC744 \uC81C\uAC70\uD574\uC694. \uC0B4\uC544\uB0A8\uC740 \uC2DC\uBBFC \uC218\uB9CC\uD07C \uB0A8\uC73C\uBA74 \uC2B9\uB9AC\uC608\uC694."},doctor:{name:"\uC758\uC0AC",desc:"\uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC744 \uACE8\uB77C \uB9C8\uD53C\uC544\uC758 \uACF5\uACA9\uC5D0\uC11C \uC0B4\uB824\uC694. \uC790\uAE30 \uC790\uC2E0\uB3C4 \uACE0\uB97C \uC218 \uC788\uC5B4\uC694."},police:{name:"\uACBD\uCC30",desc:"\uBC24\uB9C8\uB2E4 \uD55C \uBA85\uC744 \uC870\uC0AC\uD574\uC11C \uB9C8\uD53C\uC544\uC778\uC9C0 \uC54C\uC544\uB0B4\uC694. \uACB0\uACFC\uB294 \uB098\uB9CC \uBD10\uC694."},citizen:{name:"\uC2DC\uBBFC",desc:"\uB0AE \uD1A0\uB860\uACFC \uD22C\uD45C\uB85C \uB9C8\uD53C\uC544\uB97C \uBAA8\uB450 \uCC3E\uC544\uB0B4\uBA74 \uC2B9\uB9AC\uC608\uC694."}};function $l(n){return n>=9?3:n>=6?2:1}function Di(n,e){let t=Tm((e^1540483477)>>>0),r=n.slice();for(let a=r.length-1;a>0;a--){let c=Math.floor(t()*(a+1)),h=r[a];r[a]=r[c],r[c]=h}let i=$l(r.length),s={};return r.forEach(function(a,c){s[a]=c<i?"mafia":c===i?"doctor":c===i+1?"police":"citizen"}),s}function hE(n,e){let t=e.filter(function(r){return n[r]==="mafia"}).length;return t?t>=e.length-t?"mafia":null:"citizen"}function je(n,e,t){n.set(me(Me(B,"rooms",P.roomId,"msgs")),{uid:xn(),memberId:null,nick:"\uBCF8\uBD80",text:t,kind:"sys",game:e.game||0,createdAt:qe()})}function Bo(n,e,t,r,i,s){let a=hE(t,r);a?(je(n,e,a==="citizen"?"\u{1F389} \uB9C8\uD53C\uC544\uAC00 \uBAA8\uB450 \uC7A1\uD614\uC5B4\uC694. \uC2DC\uBBFC \uC2B9\uB9AC!":"\u{1FA78} \uB9C8\uD53C\uC544\uAC00 \uC2DC\uBBFC \uC218\uB9CC\uD07C \uB0A8\uC558\uC5B4\uC694. \uB9C8\uD53C\uC544 \uC2B9\uB9AC!"),n.update(G(),we(e,{status:"result",alive:r,winner:a}))):(s&&je(n,e,s),n.update(G(),we(e,Object.assign({alive:r},i))))}function zl(n){return{status:"night",day:(n.day||1)+1,night:{},votes:{},verdict:{},accused:null,readyVote:[]}}async function dE(){try{await ve(B,async function(n){let t=(await n.get(G())).data();if(!t||t.status!=="lobby")throw{code:"phase"};let r=(t.players||[]).filter(function(s){return!!et(s)}).slice().sort();if(r.length<4)throw{code:"few"};let i=(t.game||0)+1;je(n,{game:i},"\u{1F319} \uCCAB \uBC88\uC9F8 \uBC24\uC774 \uB418\uC5C8\uC5B4\uC694. \uB9C8\uD53C\uC544\uB294 \uC870\uC6A9\uD788 \uC6C0\uC9C1\uC774\uC138\uC694."),n.update(G(),we(t,{status:"night",lineup:r,seed:Math.floor(Math.random()*2147483647),alive:r,day:1,night:{},checks:[],votes:{},verdict:{},accused:null,winner:null,readyVote:[],game:i,startedAt:qe()}))})}catch(n){n&&n.code==="few"?j("4\uBA85 \uC774\uC0C1 \uBAA8\uC5EC\uC57C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."):n&&n.code==="phase"?j("\uC774\uBBF8 \uAC8C\uC784\uC774 \uC2DC\uC791\uB410\uC5B4\uC694."):j(se(n))}}async function Ml(n,e){let t=pe();if(t)try{await ve(B,async function(r){let s=(await r.get(G())).data();if(!s||s.status!=="night")throw{code:"phase"};let a=Di(s.lineup,s.seed),c=s.alive||[];if(a[t.id]!==n||c.indexOf(t.id)<0||c.indexOf(e)<0)throw{code:"role"};let h=Object.assign({},s.night||{}),f={};if(n==="police"){if(h.police)throw{code:"done"};f.checks=(s.checks||[]).concat([{day:s.day||1,target:e}])}h[n]=e,f.night=h,r.update(G(),f)}),await km(!1)}catch(r){j(r&&r.code==="done"?"\uC624\uB298 \uBC24 \uC870\uC0AC\uB294 \uC774\uBBF8 \uD588\uC5B4\uC694.":r&&r.code==="phase"?"\uBC24\uC774 \uB05D\uB0AC\uC5B4\uC694.":se(r))}}async function km(n,e){await ve(B,async function(t){let i=(await t.get(G())).data();if(!i||i.status!=="night"||e!=null&&i.phase!==e)return;let s=Di(i.lineup,i.seed),a=i.alive||[],c=i.night||{},h=function(y){return a.some(function(_){return s[_]===y})};if(!n&&(h("mafia")&&!c.mafia||h("doctor")&&!c.doctor||h("police")&&!c.police))return;let f=a.slice(),p;c.mafia&&c.mafia!==c.doctor?(f=f.filter(function(y){return y!==c.mafia}),p="\u2600\uFE0F "+(i.day||1)+"\uC77C\uCC28 \uC544\uCE68. \uC9C0\uB09C \uBC24 "+Y(c.mafia)+"\uB2D8\uC774 \uB9C8\uD53C\uC544\uC5D0\uAC8C \uB2F9\uD588\uC5B4\uC694."):c.mafia?p="\u2600\uFE0F "+(i.day||1)+"\uC77C\uCC28 \uC544\uCE68. \uB9C8\uD53C\uC544\uAC00 \uB204\uAD70\uAC00\uB97C \uB178\uB838\uC9C0\uB9CC \uC758\uC0AC\uAC00 \uC0B4\uB824\uB0C8\uC5B4\uC694!":p="\u2600\uFE0F "+(i.day||1)+"\uC77C\uCC28 \uC544\uCE68. \uC870\uC6A9\uD55C \uBC24\uC774\uC5C8\uC5B4\uC694.",je(t,i,p),Bo(t,i,s,f,{status:"day",readyVote:[]})})}async function fE(n){await ve(B,async function(e){let r=(await e.get(G())).data();!r||r.status!=="day"||n!=null&&r.phase!==n||e.update(G(),we(r,{status:"vote",votes:{}}))})}async function pE(){let n=pe();if(n)try{await Pn(G(),{readyVote:xo(n.id)}),await ve(B,async function(e){let r=(await e.get(G())).data();if(!r||r.status!=="day")return;let i=r.alive||[];(r.readyVote||[]).filter(function(a){return i.indexOf(a)>=0}).length>=Math.ceil(i.length/2)&&e.update(G(),we(r,{status:"vote",votes:{}}))})}catch(e){j(se(e))}}async function mm(n){let e=pe();if(e)try{await Pn(G(),{["votes."+e.id]:n}),await Cm(!1)}catch(t){j(se(t))}}async function Cm(n,e){await ve(B,async function(t){let i=(await t.get(G())).data();if(!i||i.status!=="vote"||e!=null&&i.phase!==e)return;let s=i.alive||[],a=i.votes||{},c=s.filter(function(_){return a[_]});if(!n&&c.length<s.length)return;let h={};c.forEach(function(_){let S=a[_];S!=="skip"&&s.indexOf(S)>=0&&(h[S]=(h[S]||0)+1)});let f=0;Object.keys(h).forEach(function(_){h[_]>f&&(f=h[_])});let p=Object.keys(h).filter(function(_){return h[_]===f}),y=Di(i.lineup,i.seed);p.length!==1?(je(t,i,p.length?"\uD45C\uAC00 \uB611\uAC19\uC774 \uAC08\uB824\uC11C \uC544\uBB34\uB3C4 \uCC98\uD615\uB418\uC9C0 \uC54A\uC558\uC5B4\uC694.":"\uC544\uBB34\uB3C4 \uC9C0\uBAA9\uB418\uC9C0 \uC54A\uC558\uC5B4\uC694."),Bo(t,i,y,s,zl(i),"\u{1F319} "+((i.day||1)+1)+"\uBC88\uC9F8 \uBC24\uC774 \uB418\uC5C8\uC5B4\uC694.")):(je(t,i,Y(p[0])+"\uB2D8\uC774 "+f+"\uD45C\uB85C \uCD5C\uB2E4 \uB4DD\uD45C! \uCD5C\uD6C4\uC758 \uBCC0\uB860\uC744 \uB4E4\uC5B4\uBCF4\uC138\uC694."),t.update(G(),we(i,{status:"defense",accused:p[0]})))})}async function xm(n){await ve(B,async function(e){let r=(await e.get(G())).data();!r||r.status!=="defense"||n!=null&&r.phase!==n||e.update(G(),we(r,{status:"verdict",verdict:{}}))})}async function gm(n){let e=pe();if(e)try{await Pn(G(),{["verdict."+e.id]:n?"yes":"no"}),await Dm(!1)}catch(t){j(se(t))}}async function Dm(n,e){await ve(B,async function(t){let i=(await t.get(G())).data();if(!i||i.status!=="verdict"||e!=null&&i.phase!==e)return;let s=i.alive||[],a=i.verdict||{},c=s.filter(function(S){return S!==i.accused}),h=c.filter(function(S){return a[S]});if(!n&&h.length<c.length)return;let f=h.filter(function(S){return a[S]==="yes"}).length,p=h.length-f,y=Di(i.lineup,i.seed),_="\u{1F319} "+((i.day||1)+1)+"\uBC88\uC9F8 \uBC24\uC774 \uB418\uC5C8\uC5B4\uC694.";f>p?(je(t,i,"\u2696\uFE0F "+Y(i.accused)+"\uB2D8\uC774 \uCC98\uD615\uB410\uC5B4\uC694. (\uCC2C\uC131 "+f+" \xB7 \uBC18\uB300 "+p+")"),Bo(t,i,y,s.filter(function(S){return S!==i.accused}),zl(i),_)):(je(t,i,"\u2696\uFE0F "+Y(i.accused)+"\uB2D8\uC774 \uC0B4\uC544\uB0A8\uC558\uC5B4\uC694. (\uCC2C\uC131 "+f+" \xB7 \uBC18\uB300 "+p+")"),Bo(t,i,y,s,zl(i),_))})}function mE(n){if(n.status==="night")return km(!0,n.phase);if(n.status==="day")return fE(n.phase);if(n.status==="vote")return Cm(!0,n.phase);if(n.status==="defense")return xm(n.phase);if(n.status==="verdict")return Dm(!0,n.phase)}function gE(){let n=pe(),e=P.rooms.filter(function(r){return r.status&&r.status!=="closed"&&r.type==="mafia"}),t=e.length?u("ul",{class:"room-list"},e.map(function(r){let i=n&&(r.players||[]).indexOf(n.id)>=0,s=r.status==="lobby"?"\uB300\uAE30 \uC911":r.status==="result"?"\uAC8C\uC784 \uB05D":"\uAC8C\uC784 \uC911";return u("li",null,u("button",{type:"button",class:"room-item",onclick:function(){le("room-"+r.id)}},u("span",{class:"ri-main"},u("b",{text:Y(r.createdBy)+"\uC758 \uBC29"}),u("span",{class:"ri-sub",text:(r.players||[]).map(Y).join(", ")||"\uC544\uC9C1 \uC544\uBB34\uB3C4 \uC5C6\uC5B4\uC694"})),u("span",{class:"ri-side"},u("span",{class:"status-chip"+(r.status==="lobby"?" open":""),text:s}),u("span",{class:"ri-sub",text:(r.players||[]).length+"\uBA85"+(i?" \xB7 \uCC38\uAC00 \uC911":"")}))))})):u("div",{class:"empty",text:P.roomsReady?"\uC5F4\uB9B0 \uBC29\uC774 \uC5C6\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC870\uC9C1\uC6D0\uC744 \uBD88\uB7EC \uBAA8\uC73C\uC138\uC694.":"\uBC29 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return u("section",{class:"screen"},u("button",{class:"back",type:"button",onclick:function(){le("games")},text:"\uAC8C\uC784\uBC29\uC73C\uB85C"}),u("div",{class:"sec-head"},u("div",null,u("span",{class:"eyebrow",text:"G-02"}),u("h2",{text:"\uB9C8\uD53C\uC544"}),u("p",{text:"\uC870\uC9C1 \uC548\uC5D0 \uC228\uC740 \uB9C8\uD53C\uC544\uB97C \uCC3E\uC544\uB77C. 4\uBA85\uBD80\uD130 \uD560 \uC218 \uC788\uC5B4\uC694."}))),u("button",{type:"button",class:"save",disabled:!n||!P.user,onclick:function(){Wl("mafia")}},n?"\uC0C8 \uBC29 \uB9CC\uB4E4\uAE30":"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uBC29\uC744 \uB9CC\uB4E4 \uC218 \uC788\uC5B4\uC694"),u("div",{class:"field"},u("div",{class:"field-label",text:"\uC5F4\uB9B0 \uBC29"}),t),yE())}function yE(){return u("details",{class:"guide"},u("summary",{text:"\uB9C8\uD53C\uC544 \uAC8C\uC784 \uADDC\uCE59"}),u("div",{class:"guide-body"},u("p",{class:"note",text:"\uC9C1\uC5C5: \uB9C8\uD53C\uC544, \uC758\uC0AC, \uACBD\uCC30, \uC2DC\uBBFC. \uB9C8\uD53C\uC544\uB294 4~5\uBA85\uC774\uBA74 1\uBA85, 6~8\uBA85\uC774\uBA74 2\uBA85, 9\uBA85 \uC774\uC0C1\uC774\uBA74 3\uBA85\uC774\uC5D0\uC694."}),u("ol",null,u("li",{text:"\uBC24 (30\uCD08): \uB9C8\uD53C\uC544\uB294 \uC81C\uAC70\uD560 \uC0AC\uB78C\uC744, \uC758\uC0AC\uB294 \uC0B4\uB9B4 \uC0AC\uB78C\uC744, \uACBD\uCC30\uC740 \uC870\uC0AC\uD560 \uC0AC\uB78C\uC744 \uACE8\uB77C\uC694. \uBC24\uC5D0\uB294 \uB9C8\uD53C\uC544\uB07C\uB9AC\uB9CC \uB300\uD654\uD560 \uC218 \uC788\uC5B4\uC694."}),u("li",{text:"\uC544\uCE68: \uC9C0\uB09C \uBC24 \uACB0\uACFC\uAC00 \uBC1C\uD45C\uB3FC\uC694. \uC758\uC0AC\uAC00 \uB9C8\uD53C\uC544\uAC00 \uB178\uB9B0 \uC0AC\uB78C\uC744 \uACE0\uB974\uBA74 \uC0B4\uC544\uB098\uC694."}),u("li",{text:"\uB0AE \uD1A0\uB860 (2\uBD84): \uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C \uBAA8\uB450 \uB300\uD654\uD574\uC694. \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uC77C\uCC0D \uB05D\uB098\uC694."}),u("li",{text:"\uCC98\uD615 \uD22C\uD45C (20\uCD08): \uB9C8\uD53C\uC544\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC5D0\uAC8C \uD22C\uD45C\uD574\uC694. \uAE30\uAD8C\uB3C4 \uD560 \uC218 \uC788\uC5B4\uC694."}),u("li",{text:"\uCD5C\uD6C4\uC758 \uBCC0\uB860 (20\uCD08): \uCD5C\uB2E4 \uB4DD\uD45C\uC790\uAC00 \uBCC0\uB860\uD574\uC694. \uB3D9\uC810\uC774\uBA74 \uC544\uBB34\uB3C4 \uCC98\uD615\uB418\uC9C0 \uC54A\uACE0 \uBC24\uC774 \uB3FC\uC694."}),u("li",{text:"\uCC2C\uBC18 \uD22C\uD45C (15\uCD08): \uCC2C\uC131\uC774 \uB354 \uB9CE\uC73C\uBA74 \uCC98\uD615\uB3FC\uC694. \uCC98\uD615\uB41C \uC0AC\uB78C\uC758 \uC9C1\uC5C5\uC740 \uAC8C\uC784\uC774 \uB05D\uB0A0 \uB54C \uACF5\uAC1C\uB3FC\uC694."})),u("p",{class:"note",text:"\uB9C8\uD53C\uC544\uB97C \uBAA8\uB450 \uC7A1\uC73C\uBA74 \uC2DC\uBBFC \uC2B9\uB9AC, \uB9C8\uD53C\uC544\uAC00 \uB098\uBA38\uC9C0 \uC0AC\uB78C \uC218\uB9CC\uD07C \uB0A8\uC73C\uBA74 \uB9C8\uD53C\uC544 \uC2B9\uB9AC\uC608\uC694. \uC8FD\uC740 \uC0AC\uB78C\uC740 \uAD00\uC804\uD558\uBA74\uC11C \uC8FD\uC740 \uC0AC\uB78C\uB07C\uB9AC\uB9CC \uBCF4\uC774\uB294 \uC800\uC2B9 \uCC44\uD305\uC744 \uD560 \uC218 \uC788\uC5B4\uC694."})))}function _E(n){let e=u("button",{class:"back",type:"button",onclick:function(){le("game-mafia")},text:"\uB9C8\uD53C\uC544 \uBC29 \uBAA9\uB85D"}),t=pe(),r=n.players||[],i=t&&r.indexOf(t.id)>=0,s=n.status!=="lobby",a=s?n.lineup||[]:r,c=s&&n.lineup&&n.lineup.length?Di(n.lineup,n.seed):null;if(s&&!c)return u("section",{class:"screen"},e,u("div",{class:"empty",text:"\uAC8C\uC784 \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694."}),u("button",{type:"button",class:"ghost wide",onclick:yr,text:"\uB300\uAE30\uC2E4\uB85C \uB3CC\uB9AC\uAE30"}));let h=n.alive||[],f=!!(t&&a.indexOf(t.id)>=0),p=f&&c?c[t.id]:null,y=f&&h.indexOf(t.id)>=0,_=n.status==="result",S=_||f&&s&&!y,C={me:t,roles:c,isPlayer:f,iAlive:y,myRole:p,over:_,seeAll:S},O=n.status==="night"?(n.day||1)+"\uBC88\uC9F8 \uBC24":n.status==="day"?(n.day||1)+"\uC77C\uCC28 \uB0AE":lE[n.status]||"",x=u("div",{class:"room-head"},u("div",null,u("span",{class:"eyebrow",text:"\uB9C8\uD53C\uC544 \xB7 "+Y(n.createdBy)+"\uC758 \uBC29"}),u("h2",{text:O})),u("span",{class:"mode-chip",text:"\uB9C8\uD53C\uC544 "+$l(a.length||4)+"\uBA85"})),z=u("div",{class:"chips"},a.map(function(K){let re=s&&h.indexOf(K)<0,Te="";c&&(S||p==="mafia"&&c[K]==="mafia")&&(Te=" \xB7 "+Jl[c[K]].name);let Z="";return n.status==="vote"&&n.votes&&n.votes[K]&&(Z=" \u2713"),n.status==="verdict"&&n.verdict&&n.verdict[K]&&(Z=" \u2713"),u("span",{class:"chip static"+(t&&K===t.id?" me":"")+(re?" dead":"")+(Z?" done":"")},(re?"\u2620 ":"")+Y(K)+Te+Z)})),W;return n.status==="lobby"?W=wE(n,t,i,r):n.status==="night"?W=IE(n,C):n.status==="day"?W=EE(n,C):n.status==="vote"?W=bE(n,C):n.status==="defense"?W=TE(n,C):n.status==="verdict"?W=AE(n,C):W=SE(n,C),u("section",{class:"screen room"+(n.status==="night"?" is-night":"")},e,x,u("div",{class:"field"},u("div",{class:"field-label",text:s?"\uCC38\uAC00\uC790 "+h.length+"/"+a.length+"\uBA85 \uC0DD\uC874":"\uBAA8\uC778 \uC0AC\uB78C "+a.length+"\uBA85"}),z),s&&f&&!_?vE(n,C):null,W,RE(n,C))}function vE(n,e){let t=e.myRole,r=Jl[t],i=t==="mafia"?n.lineup.filter(function(a){return a!==e.me.id&&e.roles[a]==="mafia"}).map(Y):[],s=t==="police"?(n.checks||[]).map(function(a){return a.day+"\uC77C\uCC28 \uBC24 \xB7 "+Y(a.target)+(e.roles[a.target]==="mafia"?" \u2192 \uB9C8\uD53C\uC544!":" \u2192 \uB9C8\uD53C\uC544 \uC544\uB2D8")}):[];return u("div",{class:"role-card "+t+(e.iAlive?"":" dead")},u("span",{class:"sc-eyebrow",text:e.iAlive?"\uB0B4 \uC9C1\uC5C5 \xB7 \uB098\uB9CC \uBCF4\uC5EC\uC694":"\u2620 \uC0AC\uB9DD \xB7 \uAD00\uC804 \uC911"}),u("span",{class:"sc-big",text:r.name}),u("span",{class:"sc-hint",text:r.desc}),i.length?u("p",{class:"rc-extra",text:"\uB3D9\uB8CC \uB9C8\uD53C\uC544: "+i.join(", ")}):null,s.length?u("ul",{class:"rc-checks"},s.map(function(a){return u("li",{text:a})})):null)}function Vo(n,e,t){return u("div",{class:"vote-grid"},n.map(function(r){return u("button",{type:"button",class:"vote-btn","aria-pressed":e===r?"true":"false",onclick:function(){t(r)}},u("div",{class:"vp"},tn(et(r)||{})),u("span",{text:Y(r)}))}))}function wE(n,e,t,r){let i=r.length,s=i>=4,a=$l(Math.max(i,4));return u("div",{class:"panel"},u("div",{class:"field-label",text:"\uC9C1\uC5C5 \uAD6C\uC131"}),u("p",{text:s?"\uB9C8\uD53C\uC544 "+a+" \xB7 \uC758\uC0AC 1 \xB7 \uACBD\uCC30 1 \xB7 \uC2DC\uBBFC "+(i-a-2):"4\uBA85\uBD80\uD130 \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694. \uC9C0\uAE08 "+i+"\uBA85\uC774\uC5D0\uC694."}),e?t?u("div",{class:"op-row"},u("button",{type:"button",onclick:Ql,text:"\uBC29 \uB098\uAC00\uAE30"}),u("button",{type:"button",class:"go",disabled:!s,onclick:dE,text:s?"\uAC8C\uC784 \uC2DC\uC791":"4\uBA85\uBD80\uD130 \uC2DC\uC791"})):u("button",{type:"button",class:"save",onclick:Hl,text:"\uC774 \uBC29\uC5D0 \uCC38\uAC00\uD558\uAE30"}):u("p",{class:"note",text:"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uCC38\uAC00\uD560 \uC218 \uC788\uC5B4\uC694."}),u("p",{class:"hint",text:"\uB2E8\uD1A1\uBC29\uC5D0 \u2018\uAC8C\uC784\uBC29 \u2192 \uB9C8\uD53C\uC544\uC5D0 \uBC29 \uC5F4\uC5C8\uC5B4\u2019\uB77C\uACE0 \uC54C\uB824\uC8FC\uC138\uC694."}))}function IE(n,e){let t=n.night||{},r=n.alive||[],i=e.myRole,s=u("div",{class:"panel turn night"},u("div",{class:"field-label",text:(n.day||1)+"\uBC88\uC9F8 \uBC24"}),Ye(n,"\uBC24 \uB0A8\uC740 \uC2DC\uAC04"));if(!e.isPlayer)return Qe(s,u("p",{text:"\uBC24\uC774\uC5D0\uC694. \uAD6C\uACBD\uD558\uBA70 \uC544\uCE68\uC744 \uAE30\uB2E4\uB824 \uC8FC\uC138\uC694."})),s;if(!e.iAlive)return Qe(s,u("p",{text:"\uAD00\uC804 \uC911\uC774\uC5D0\uC694. \uC544\uB798 \uC800\uC2B9 \uCC44\uD305\uC73C\uB85C \uC8FD\uC740 \uC0AC\uB78C\uB07C\uB9AC \uC774\uC57C\uAE30\uD560 \uC218 \uC788\uC5B4\uC694."})),s;if(i==="citizen")return Qe(s,u("p",{text:"\uBC24\uC774\uC5D0\uC694. \uC2DC\uBBFC\uC740 \uC544\uCE68\uC774 \uC62C \uB54C\uAE4C\uC9C0 \uC870\uC6A9\uD788 \uAE30\uB2E4\uB824\uC694."})),s;if(i==="mafia")Qe(s,u("p",{text:"\uC81C\uAC70\uD560 \uC0AC\uB78C\uC744 \uACE0\uB974\uC138\uC694. \uB3D9\uB8CC \uB9C8\uD53C\uC544\uC640 \uB300\uD654\uCC3D\uC5D0\uC11C \uC758\uB17C\uD574\uC694."}),Vo(r.filter(function(a){return e.roles[a]!=="mafia"}),t.mafia,function(a){Ml("mafia",a)}),t.mafia?u("p",{class:"hint",text:"\uC9C0\uAE08 \uC9C0\uBAA9: "+Y(t.mafia)+" \xB7 \uB3D9\uB8CC\uAC00 \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uB00C\uC5B4\uC694."}):null);else if(i==="doctor")Qe(s,u("p",{text:"\uC624\uB298 \uBC24 \uC0B4\uB9B4 \uC0AC\uB78C\uC744 \uACE0\uB974\uC138\uC694."}),Vo(r,t.doctor,function(a){Ml("doctor",a)}),t.doctor?u("p",{class:"hint",text:Y(t.doctor)+"\uB2D8\uC744 \uC9C0\uD0A4\uAE30\uB85C \uD588\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB204\uB974\uBA74 \uBC14\uB00C\uC5B4\uC694."}):null);else if(i==="police")if(t.police){let a=e.roles[t.police]==="mafia";Qe(s,u("div",{class:"check-result"+(a?" bad":"")},Y(t.police)+"\uB2D8\uC740 ",u("b",{text:a?"\uB9C8\uD53C\uC544\uC608\uC694!":"\uB9C8\uD53C\uC544\uAC00 \uC544\uB2C8\uC5D0\uC694."})))}else Qe(s,u("p",{text:"\uC870\uC0AC\uD560 \uC0AC\uB78C\uC744 \uACE0\uB974\uC138\uC694. \uD55C \uBC88 \uACE0\uB974\uBA74 \uBC14\uAFC0 \uC218 \uC5C6\uC5B4\uC694."}),Vo(r.filter(function(a){return a!==e.me.id}),null,function(a){Ml("police",a)}));return s}function EE(n,e){let t=n.alive||[],r=Math.ceil(t.length/2),i=(n.readyVote||[]).filter(function(a){return t.indexOf(a)>=0}),s=e.me&&i.indexOf(e.me.id)>=0;return u("div",{class:"panel turn"},u("div",{class:"field-label",text:(n.day||1)+"\uC77C\uCC28 \uB0AE \uD1A0\uB860"}),Ye(n,"\uD1A0\uB860 \uB0A8\uC740 \uC2DC\uAC04"),u("p",{text:"\uB204\uAC00 \uB9C8\uD53C\uC544\uC778\uC9C0 \uB300\uD654\uCC3D\uC5D0\uC11C \uC774\uC57C\uAE30\uD574\uC694."}),e.iAlive?u("button",{type:"button",class:s?"ghost wide":"save",disabled:s,onclick:pE},(s?"\uBC14\uB85C \uD22C\uD45C\uC5D0 \uCC2C\uC131\uD588\uC5B4\uC694 ":"\uBC14\uB85C \uD22C\uD45C\uD558\uAE30 ")+"("+i.length+"/"+r+")"):null,u("p",{class:"hint",text:"\uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C \uC808\uBC18 \uC774\uC0C1\uC774 \u2018\uBC14\uB85C \uD22C\uD45C\uD558\uAE30\u2019\uB97C \uB204\uB974\uBA74 \uD1A0\uB860\uC774 \uC77C\uCC0D \uB05D\uB098\uC694."}))}function bE(n,e){let t=n.alive||[],r=n.votes||{},i=t.filter(function(c){return r[c]}).length,s=e.me?r[e.me.id]:null,a=u("div",{class:"panel"},u("div",{class:"field-label",text:"\uCC98\uD615 \uD22C\uD45C \xB7 "+i+" / "+t.length+"\uBA85 \uC644\uB8CC"}),Ye(n,"\uD22C\uD45C \uB0A8\uC740 \uC2DC\uAC04"));return e.iAlive?Qe(a,Vo(t.filter(function(c){return c!==e.me.id}),s,mm),u("button",{type:"button",class:"ghost wide","aria-pressed":s==="skip"?"true":"false",onclick:function(){mm("skip")}},s==="skip"?"\uAE30\uAD8C\uD588\uC5B4\uC694":"\uAE30\uAD8C\uD558\uAE30"),u("p",{class:"hint",text:s?(s==="skip"?"\uAE30\uAD8C\uD588\uC5B4\uC694.":"\u2018"+Y(s)+"\u2019\uC5D0\uAC8C \uD22C\uD45C\uD588\uC5B4\uC694.")+" \uB2E4\uB978 \uAC78 \uB204\uB974\uBA74 \uBC14\uB00C\uC5B4\uC694.":"\uB9C8\uD53C\uC544\uB85C \uC758\uC2EC\uB418\uB294 \uC0AC\uB78C\uC744 \uB204\uB974\uC138\uC694."})):Qe(a,u("p",{class:"note",text:"\uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C\uB4E4\uC774 \uD22C\uD45C\uD558\uACE0 \uC788\uC5B4\uC694."})),a}function TE(n,e){let t=e.me&&e.me.id===n.accused;return u("div",{class:"panel turn"+(t?" mine":"")},u("div",{class:"field-label",text:"\uCD5C\uD6C4\uC758 \uBCC0\uB860"}),Ye(n,Y(n.accused)+" \uBCC0\uB860 \uB0A8\uC740 \uC2DC\uAC04"),u("p",{text:t?"\uB2F9\uC2E0\uC774 \uCD5C\uB2E4 \uB4DD\uD45C\uC790\uC608\uC694! \uC544\uB798 \uB300\uD654\uCC3D\uC5D0 \uBCC0\uB860\uC744 \uB0A8\uAE30\uC138\uC694.":Y(n.accused)+"\uB2D8\uC758 \uCD5C\uD6C4\uC758 \uBCC0\uB860\uC744 \uB4E4\uC5B4\uBCF4\uC138\uC694."}),t?u("button",{type:"button",class:"ghost wide",onclick:function(){xm(null)},text:"\uBCC0\uB860 \uB9C8\uCE58\uAE30"}):null)}function AE(n,e){let t=n.alive||[],r=n.verdict||{},i=t.filter(function(h){return h!==n.accused}),s=i.filter(function(h){return r[h]}).length,a=e.iAlive&&e.me.id!==n.accused,c=e.me?r[e.me.id]:null;return u("div",{class:"panel"},u("div",{class:"field-label",text:"\uCC2C\uBC18 \uD22C\uD45C \xB7 "+s+" / "+i.length+"\uBA85 \uC644\uB8CC"}),Ye(n,"\uCC2C\uBC18 \uB0A8\uC740 \uC2DC\uAC04"),u("p",null,u("b",{text:Y(n.accused)}),"\uB2D8\uC744 \uCC98\uD615\uD560\uAE4C\uC694?"),a?u("div",{class:"op-row"},u("button",{type:"button",class:c==="yes"?"go":"","aria-pressed":c==="yes"?"true":"false",onclick:function(){gm(!0)},text:"\uCC2C\uC131 (\uCC98\uD615)"}),u("button",{type:"button",class:c==="no"?"go":"","aria-pressed":c==="no"?"true":"false",onclick:function(){gm(!1)},text:"\uBC18\uB300 (\uC0B4\uB9AC\uAE30)"})):u("p",{class:"note",text:e.me&&e.me.id===n.accused?"\uB2E4\uB978 \uC0AC\uB78C\uB4E4\uC774 \uCC2C\uBC18 \uD22C\uD45C\uB97C \uD558\uACE0 \uC788\uC5B4\uC694.":"\uC0B4\uC544 \uC788\uB294 \uC0AC\uB78C\uB4E4\uC774 \uCC2C\uBC18 \uD22C\uD45C\uB97C \uD558\uACE0 \uC788\uC5B4\uC694."}),a?u("p",{class:"hint",text:"\uCC2C\uC131\uC774 \uBC18\uB300\uBCF4\uB2E4 \uB9CE\uC73C\uBA74 \uCC98\uD615\uB3FC\uC694. \uC2DC\uAC04\uC774 \uB05D\uB098\uBA74 \uADF8\uB54C\uAE4C\uC9C0\uC758 \uD45C\uB85C \uC815\uD574\uC694."}):null)}function SE(n,e){let t=n.winner==="citizen",r=n.alive||[];return u("div",{class:"answer"+(t?" team":"")},u("div",{class:"result-title",text:t?"\uC2DC\uBBFC \uC2B9\uB9AC":"\uB9C8\uD53C\uC544 \uC2B9\uB9AC"}),u("ul",{class:"role-list"},(n.lineup||[]).map(function(i){return u("li",{class:r.indexOf(i)<0?"dead":""},u("span",{text:(r.indexOf(i)<0?"\u2620 ":"")+Y(i)}),u("b",{text:Jl[e.roles[i]].name}))})),u("div",{class:"op-row"},u("button",{type:"button",onclick:function(){le("game-mafia")},text:"\uBC29 \uBAA9\uB85D"}),u("button",{type:"button",class:"go",onclick:yr,text:"\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354"})))}function RE(n,e){let t=n.game||0,r=e.over||e.myRole==="mafia"||e.isPlayer&&!e.iAlive,i=e.over||e.isPlayer&&!e.iAlive&&n.status!=="lobby",s=P.msgs.filter(function(_){return(_.game||0)!==t?!1:_.kind==="mafia"?r:_.kind==="dead"?i:!0}),a=null,c;n.status==="lobby"||e.over?(a="chat",c="\uB300\uD654 \uBCF4\uB0B4\uAE30"):e.isPlayer?e.iAlive?n.status==="night"?e.myRole==="mafia"?(a="mafia",c="\uB9C8\uD53C\uC544\uB07C\uB9AC \uB300\uD654"):c="\uBC24\uC5D0\uB294 \uB9C8\uD53C\uC544\uB9CC \uB300\uD654\uD560 \uC218 \uC788\uC5B4\uC694":n.status==="defense"?e.me.id===n.accused?(a="defense",c="\uCD5C\uD6C4\uC758 \uBCC0\uB860 \uC4F0\uAE30"):c="\uCD5C\uD6C4\uC758 \uBCC0\uB860\uC744 \uB4E3\uB294 \uC911\uC774\uC5D0\uC694":(a="chat",c="\uB300\uD654 \uBCF4\uB0B4\uAE30"):(a="dead",c="\uC800\uC2B9 \uCC44\uD305 (\uC8FD\uC740 \uC0AC\uB78C\uB07C\uB9AC\uB9CC \uBCF4\uC5EC\uC694)"):c="\uAC8C\uC784 \uC911\uC5D0\uB294 \uCC38\uAC00\uC790\uB9CC \uB300\uD654\uD560 \uC218 \uC788\uC5B4\uC694";let h={mafia:"\uB9C8\uD53C\uC544 \uB300\uD654",dead:"\uC800\uC2B9",defense:"\uCD5C\uD6C4\uC758 \uBCC0\uB860"},f=u("div",{class:"log",role:"log","aria-live":"polite"},s.length?s.map(function(_){if(_.kind==="sys"||_.kind==="skip")return u("div",{class:"msg-sys strong",text:_.text});let S=e.me&&_.memberId===e.me.id;return u("div",{class:"bubble "+(_.kind||"chat")+(S?" mine":"")},u("div",{class:"b-meta"},u("b",{text:_.nick||"\uC190\uB2D8"}),h[_.kind]?u("span",{class:"b-tag",text:h[_.kind]}):null),u("div",{class:"b-text",text:_.text}))}):u("div",{class:"msg-sys",text:"\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694."})),p=Dn("input","chat-text",{type:"text",class:"text-in",maxlength:"120",placeholder:c,autocomplete:"off",disabled:!a}),y=u("form",{class:"send-row",novalidate:!0},p,u("button",{type:"submit",class:"btn-sm",disabled:!a,text:"\uBCF4\uB0B4\uAE30"}));return y.addEventListener("submit",async function(_){_.preventDefault();let S=p.value.trim();if(!(!S||!P.user||!a))try{await Yl(a,S),P.drafts["chat-text"]="",X()}catch(C){j(se(C))}}),u("div",{class:"field"},u("div",{class:"field-label",text:e.myRole==="mafia"&&n.status==="night"&&e.iAlive?"\uB300\uD654 \xB7 \uC9C0\uAE08\uC740 \uB9C8\uD53C\uC544\uB07C\uB9AC\uB9CC \uBCF4\uC5EC\uC694":"\uB300\uD654"}),f,y)}var Ci={draw:60,reveal:5};mr&&Object.keys(Ci).forEach(function(n){Ci[n]=Math.max(2,Math.round(Ci[n]/mr))});var PE=["\uC0AC\uACFC","\uBC14\uB098\uB098","\uC218\uBC15","\uD3EC\uB3C4","\uB2F9\uADFC","\uBC84\uC12F","\uACE0\uC591\uC774","\uAC15\uC544\uC9C0","\uAE30\uB9B0","\uCF54\uB07C\uB9AC","\uBB38\uC5B4","\uC0C1\uC5B4","\uAC70\uBD81\uC774","\uD1A0\uB07C","\uD3AD\uADC4","\uACF5\uB8E1","\uC790\uB3D9\uCC28","\uBE44\uD589\uAE30","\uC790\uC804\uAC70","\uB85C\uCF13","\uC6B0\uC0B0","\uC548\uACBD","\uC2DC\uACC4","\uD53C\uC790","\uD584\uBC84\uAC70","\uC544\uC774\uC2A4\uD06C\uB9BC","\uCF00\uC774\uD06C","\uB208\uC0AC\uB78C","\uD574\uBC14\uB77C\uAE30","\uC120\uC778\uC7A5","\uBB34\uC9C0\uAC1C","\uD654\uC0B0","\uB4F1\uB300","\uC131","\uAE30\uD0C0","\uD53C\uC544\uB178","\uCD95\uAD6C\uACF5","\uC655\uAD00","\uCE6B\uC194","\uB0C9\uC7A5\uACE0","\uD150\uD2B8","\uC120\uD48D\uAE30","\uB9DD\uC6D0\uACBD","\uB2E4\uC774\uC544\uBAAC\uB4DC","\uC5F4\uC1E0","\uCD1B\uBD88","\uC720\uB839","\uD574\uC801","\uC778\uC5B4","\uC0B0\uD0C0","\uCE58\uD0A8","\uB77C\uBA74","\uC0BC\uACB9\uC0B4","\uBAA8\uC790","\uC2E0\uBC1C","\uBB3C\uACE0\uAE30","\uB2EC\uD33D\uC774","\uB098\uBE44","\uBC88\uAC1C","\uB208\uC0AC\uD0DC"],Nm="#f3f1ec",Om=["#1b1b1d","#d2382f","#2f6fd2","#2f9e57","#e2a21b","#8a4fc9","#8b5a2b"],L={canvas:null,ctx:null,turnKey:null,unsub:null,strokes:[],drawing:!1,pendingRender:!1,cur:null,color:Om[0],size:8,eraser:!1,flushT:null},Xl=["\uC8FC\uBA39\uC774"],kE=.2;function CE(){let n={},e=[];function t(r){r=String(r||"").trim(),r&&!n[r]&&(n[r]=1,e.push(r))}return P.members.forEach(function(r){t(r.nick)}),(P.sketchNames||Xl).forEach(t),e}function Zl(n,e){let t=CE(),r=PE,i=t.length&&Math.random()<kE?t:r,s=i.filter(function(a){return(e||[]).indexOf(a)<0});return s.length||(s=i),s[Math.floor(Math.random()*s.length)]}function xE(n){let e=[n],t=/^(.*?)\((.*?)\)$/.exec(n||"");return t&&(e.push(t[1]),e.push(t[2])),e.map(pr).filter(Boolean)}function DE(n,e){return xE(e).indexOf(pr(n))>=0}var NE="\u3131\u3132\u3134\u3137\u3138\u3139\u3141\u3142\u3143\u3145\u3146\u3147\u3148\u3149\u314A\u314B\u314C\u314D\u314E";function OE(n,e){return Array.from(n||"").map(function(t){let r=t.charCodeAt(0);return t===" "?" ":r>=44032&&r<=55203?e?NE.charAt(Math.floor((r-44032)/588)):"\u25CB":/[()]/.test(t)?t:"\u25CB"}).join("")}function xi(n){return n.order[n.turn%n.order.length]}function Vm(n){return n.order.length*(n.rounds||1)}function VE(n){return(n.game||0)*1e3+(n.turn||0)}async function ME(){try{await ve(B,async function(n){let t=(await n.get(G())).data();if(!t||t.status!=="lobby")throw{code:"phase"};let r=(t.players||[]).filter(function(c){return!!et(c)}).slice().sort();if(r.length<2)throw{code:"few"};let i=r.slice();for(let c=i.length-1;c>0;c--){let h=Math.floor(Math.random()*(c+1)),f=i[c];i[c]=i[h],i[h]=f}let s=Zl(t.wordMode||"mix",[]),a=(t.game||0)+1;je(n,{game:a},"\u{1F3A8} \uB4DC\uB85C\uC789\uD034\uC988 \uC2DC\uC791! \uCCAB \uBC88\uC9F8 \uD654\uAC00\uB294 "+Y(i[0])+"\uB2D8\uC774\uC5D0\uC694."),n.update(G(),we(t,{status:"draw",lineup:r,order:i,turn:0,word:s,used:[s],guessed:[],scores:{},skipUsed:!1,game:a,startedAt:qe()}))})}catch(n){n&&n.code==="few"?j("2\uBA85 \uC774\uC0C1 \uBAA8\uC5EC\uC57C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."):n&&n.code==="phase"?j("\uC774\uBBF8 \uAC8C\uC784\uC774 \uC2DC\uC791\uB410\uC5B4\uC694."):j(se(n))}}async function LE(n,e){await ve(B,async function(t){let i=(await t.get(G())).data();!i||i.status!=="draw"||n!=null&&i.phase!==n||(je(t,i,(e||"\u23F0 \uC2DC\uAC04 \uB05D!")+" \uC815\uB2F5\uC740 \u2018"+i.word+"\u2019"),t.update(G(),we(i,{status:"reveal"})))})}async function FE(n){await ve(B,async function(e){let r=(await e.get(G())).data();if(!r||r.status!=="reveal"||n!=null&&r.phase!==n)return;let i=(r.turn||0)+1;if(i>=Vm(r)){je(e,r,"\u{1F3C1} \uB4DC\uB85C\uC789\uD034\uC988 \uB05D! \uC810\uC218\uB97C \uD655\uC778\uD558\uC138\uC694."),e.update(G(),we(r,{status:"result"}));return}let s=Zl(r.wordMode||"mix",r.used||[]),a=r.order[i%r.order.length];je(e,r,"\u{1F3A8} "+(i+1)+"\uBC88\uC9F8 \uADF8\uB9BC \xB7 \uD654\uAC00\uB294 "+Y(a)+"\uB2D8"),e.update(G(),we(r,{status:"draw",turn:i,word:s,used:(r.used||[]).concat([s]),guessed:[],skipUsed:!1}))})}function UE(n){if(n.status==="draw")return LE(n.phase);if(n.status==="reveal")return FE(n.phase)}async function BE(){let n=pe();if(n)try{await ve(B,async function(e){let r=(await e.get(G())).data();if(!r||r.status!=="draw"||xi(r)!==n.id||r.skipUsed||(r.guessed||[]).length)throw{code:"no"};let i=Zl(r.wordMode||"mix",(r.used||[]).concat([r.word]));e.update(G(),{word:i,used:(r.used||[]).concat([i]),skipUsed:!0})}),await qm()}catch(e){j(e&&e.code==="no"?"\uB2E8\uC5B4\uB294 \uD55C \uBC88\uB9CC \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.":se(e))}}async function qE(n){let e=pe(),t=P.room;if(!e||!t)return;t.status==="draw"&&t.lineup.indexOf(e.id)>=0&&xi(t)!==e.id&&(t.guessed||[]).indexOf(e.id)<0&&DE(n,t.word)?await ve(B,async function(i){let a=(await i.get(G())).data();if(!a||a.status!=="draw"||a.turn!==t.turn||a.game!==t.game)throw{code:"late"};let c=a.guessed||[];if(c.indexOf(e.id)>=0)return;let h=c.length===0?3:c.length===1?2:1,f=xi(a),p=Object.assign({},a.scores||{});p[e.id]=(p[e.id]||0)+h,p[f]=(p[f]||0)+1;let y=c.concat([e.id]);je(i,a,"\u{1F3AF} "+e.nick+"\uB2D8 \uC815\uB2F5! (+"+h+"\uC810)"),y.length>=a.lineup.length-1?(je(i,a,"\uBAA8\uB450 \uB9DE\uD614\uC5B4\uC694! \uC815\uB2F5\uC740 \u2018"+a.word+"\u2019"),i.update(G(),we(a,{guessed:y,scores:p,status:"reveal"}))):i.update(G(),{guessed:y,scores:p})}):await Yl("chat",n)}function jE(){if(L.canvas)return L.canvas;let n=document.createElement("canvas");return n.className="sk-canvas",n.setAttribute("aria-label","\uADF8\uB9BC\uD310"),n.addEventListener("pointerdown",GE),n.addEventListener("pointermove",KE),["pointerup","pointercancel"].forEach(function(e){n.addEventListener(e,WE)}),L.canvas=n,L.ctx=n.getContext("2d"),window.ResizeObserver&&new ResizeObserver(Mm).observe(n),n}function Mm(){let n=L.canvas,e=n&&n.clientWidth;if(!e)return;let t=Math.round(e*Math.min(2,window.devicePixelRatio||1));n.width!==t&&(n.width=t,n.height=t,qo())}function ym(n,e,t){let r=t.pts;if(!(!r||r.length<2)){n.strokeStyle=t.color,n.lineWidth=t.size*e,n.beginPath(),n.moveTo(r[0]*e,r[1]*e),r.length===2&&n.lineTo(r[0]*e+.1,r[1]*e+.1);for(let i=2;i<r.length;i+=2)n.lineTo(r[i]*e,r[i+1]*e);n.stroke()}}function qo(){let n=L.canvas,e=L.ctx;if(!n||!n.width)return;e.setTransform(1,0,0,1,0,0),e.fillStyle=Nm,e.fillRect(0,0,n.width,n.height),e.lineCap="round",e.lineJoin="round";let t=n.width/1e3,r=0;L.strokes.forEach(function(i,s){i.clear&&(r=s+1)}),L.strokes.slice(r).forEach(function(i){ym(e,t,i)}),L.cur&&ym(e,t,L.cur)}function Lm(n){L.turnKey!==n&&(L.unsub&&(L.unsub(),L.unsub=null),L.turnKey=n,L.strokes=[],L.cur=null,qo(),!(n==null||!P.roomId)&&(L.unsub=gt(Ri(Me(B,"rooms",P.roomId,"strokes"),Dl("turn","==",n)),function(e){L.strokes=e.docs.map(function(t){return t.data()}).sort(function(t,r){return(t.t||0)-(r.t||0)}),qo()})))}function zE(){let n=P.room,e=pe();return!!(n&&n.type==="sketch"&&n.status==="draw"&&e&&xi(n)===e.id)}function Fm(n){let e=L.canvas.getBoundingClientRect(),t=Math.round(Math.max(0,Math.min(1,(n.clientX-e.left)/e.width))*1e3),r=Math.round(Math.max(0,Math.min(1,(n.clientY-e.top)/e.height))*1e3);return[t,r]}var Um=0;function Bm(n){let e=L.cur;if(!e||e.pts.length<2||!n&&e.pts.length<4)return;let t={uid:xn(),turn:L.turnKey,color:e.color,size:e.size,pts:e.pts.slice(0,600),t:Date.now()*1e3+Um++%1e3,createdAt:qe()};L.strokes.push(t),kn(Me(B,"rooms",P.roomId,"strokes"),t).catch(function(i){j(se(i))});let r=e.pts.slice(-2);L.cur=n?null:{color:e.color,size:e.size,pts:r}}function GE(n){if(zE()){n.preventDefault();try{L.canvas.setPointerCapture(n.pointerId)}catch{}L.drawing=!0,L.cur={color:L.eraser?Nm:L.color,size:L.eraser?28:L.size,pts:Fm(n)},qo(),clearInterval(L.flushT),L.flushT=setInterval(function(){Bm(!1)},250)}}function KE(n){if(!L.drawing||!L.cur)return;n.preventDefault();let e=Fm(n),t=L.cur.pts,r=t[t.length-2],i=t[t.length-1];if(Math.abs(e[0]-r)+Math.abs(e[1]-i)<4)return;t.push(e[0],e[1]);let s=L.ctx,a=L.canvas.width/1e3;s.lineCap="round",s.lineJoin="round",s.strokeStyle=L.cur.color,s.lineWidth=L.cur.size*a,s.beginPath(),s.moveTo(r*a,i*a),s.lineTo(e[0]*a,e[1]*a),s.stroke()}function WE(){L.drawing&&(clearInterval(L.flushT),Bm(!0),L.drawing=!1,L.cur=null,L.pendingRender&&(L.pendingRender=!1,X()))}async function qm(){try{await kn(Me(B,"rooms",P.roomId,"strokes"),{uid:xn(),turn:L.turnKey,clear:!0,pts:[],t:Date.now()*1e3+Um++%1e3,createdAt:qe()})}catch(n){j(se(n))}}function HE(){let n=Om.map(function(e){return u("button",{type:"button",class:"sk-ink",style:"background:"+e,"aria-label":"\uC0C9 "+e,"aria-pressed":!L.eraser&&L.color===e?"true":"false",onclick:function(){L.color=e,L.eraser=!1,X()}})});return u("div",{class:"sk-tools"},u("div",{class:"sk-row"},n),u("div",{class:"sk-row"},[["\uAC00\uB298\uAC8C",4],["\uBCF4\uD1B5",8],["\uAD75\uAC8C",16]].map(function(e){return u("button",{type:"button",class:"sk-btn","aria-pressed":!L.eraser&&L.size===e[1]?"true":"false",onclick:function(){L.size=e[1],L.eraser=!1,X()},text:e[0]})}),u("button",{type:"button",class:"sk-btn","aria-pressed":L.eraser?"true":"false",onclick:function(){L.eraser=!0,X()},text:"\uC9C0\uC6B0\uAC1C"}),u("button",{type:"button",class:"sk-btn danger",onclick:qm,text:"\uC804\uCCB4 \uC9C0\uC6B0\uAE30"})))}function QE(){let n=pe(),e=P.rooms.filter(function(r){return r.status&&r.status!=="closed"&&r.type==="sketch"}),t=e.length?u("ul",{class:"room-list"},e.map(function(r){let i=n&&(r.players||[]).indexOf(n.id)>=0,s=r.status==="lobby"?"\uB300\uAE30 \uC911":r.status==="result"?"\uAC8C\uC784 \uB05D":"\uAC8C\uC784 \uC911";return u("li",null,u("button",{type:"button",class:"room-item",onclick:function(){le("room-"+r.id)}},u("span",{class:"ri-main"},u("b",{text:Y(r.createdBy)+"\uC758 \uBC29"}),u("span",{class:"ri-sub",text:(r.players||[]).map(Y).join(", ")||"\uC544\uC9C1 \uC544\uBB34\uB3C4 \uC5C6\uC5B4\uC694"})),u("span",{class:"ri-side"},u("span",{class:"status-chip"+(r.status==="lobby"?" open":""),text:s}),u("span",{class:"ri-sub",text:(r.players||[]).length+"\uBA85"+(i?" \xB7 \uCC38\uAC00 \uC911":"")}))))})):u("div",{class:"empty",text:P.roomsReady?"\uC5F4\uB9B0 \uBC29\uC774 \uC5C6\uC5B4\uC694. \uC0C8 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uC870\uC9C1\uC6D0\uC744 \uBD88\uB7EC \uBAA8\uC73C\uC138\uC694.":"\uBC29 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return u("section",{class:"screen"},u("button",{class:"back",type:"button",onclick:function(){le("games")},text:"\uAC8C\uC784\uBC29\uC73C\uB85C"}),u("div",{class:"sec-head"},u("div",null,u("span",{class:"eyebrow",text:"G-05"}),u("h2",{text:"\uB4DC\uB85C\uC789\uD034\uC988"}),u("p",{text:"\uD55C \uBA85\uC774 \uADF8\uB9AC\uACE0 \uB098\uBA38\uC9C0\uAC00 \uB9DE\uD600\uC694. \uBA3C\uC800 \uB9DE\uD790\uC218\uB85D \uC810\uC218\uAC00 \uB192\uC544\uC694."}))),u("button",{type:"button",class:"save",disabled:!n||!P.user,onclick:function(){Wl("sketch")}},n?"\uC0C8 \uBC29 \uB9CC\uB4E4\uAE30":"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uBC29\uC744 \uB9CC\uB4E4 \uC218 \uC788\uC5B4\uC694"),u("div",{class:"field"},u("div",{class:"field-label",text:"\uC5F4\uB9B0 \uBC29"}),t),u("details",{class:"guide"},u("summary",{text:"\uB4DC\uB85C\uC789\uD034\uC988 \uADDC\uCE59"}),u("div",{class:"guide-body"},u("ol",null,u("li",{text:"\uCC38\uAC00\uC790\uAC00 \uB3CC\uC544\uAC00\uBA74\uC11C \uD55C \uBC88\uC529 \uD654\uAC00\uAC00 \uB3FC\uC694. \uD654\uAC00\uC5D0\uAC8C\uB9CC \uC81C\uC2DC\uC5B4\uAC00 \uBCF4\uC5EC\uC694."}),u("li",{text:"\uD654\uAC00\uB294 60\uCD08 \uB3D9\uC548 \uADF8\uB824\uC694. \uAE00\uC790\uB098 \uC22B\uC790\uB97C \uC4F0\uBA74 \uBC18\uCE59\uC774\uC5D0\uC694. \uB2E8\uC5B4\uAC00 \uB108\uBB34 \uC5B4\uB824\uC6B0\uBA74 \uD55C \uBC88 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694."}),u("li",{text:"\uB098\uBA38\uC9C0\uB294 \uB300\uD654\uCC3D\uC5D0 \uC815\uB2F5\uC744 \uC785\uB825\uD574\uC694. \uD2C0\uB9B0 \uB2F5\uC740 \uBAA8\uB450\uC5D0\uAC8C \uBCF4\uC774\uACE0, \uB9DE\uD78C \uB2F5\uC740 \uC228\uACA8\uC838\uC694."}),u("li",{text:"\uBA3C\uC800 \uB9DE\uD78C \uC21C\uC11C\uB300\uB85C 3\uC810, 2\uC810, 1\uC810. \uD654\uAC00\uB294 \uB9DE\uD78C \uC0AC\uB78C \uD55C \uBA85\uB2F9 1\uC810\uC744 \uBC1B\uC544\uC694."}),u("li",{text:"\uC2DC\uAC04\uC774 \uBC18\uCBE4 \uC9C0\uB098\uBA74 \uC815\uB2F5\uC758 \uCD08\uC131 \uD78C\uD2B8\uAC00 \uB098\uC640\uC694."})))),en()?YE():null)}function YE(){let n=Dn("textarea","sk-names",{class:"gb-in",placeholder:"\uD55C \uC904\uC5D0 \uD558\uB098\uC529, \uB610\uB294 \uC27C\uD45C\uB85C \uAD6C\uBD84"});return P.drafts["sk-names"]==null&&(n.value=(P.sketchNames||Xl).join(`
`)),u("details",{class:"guide"},u("summary",{text:"\uAE5C\uC9DD \uC81C\uC2DC\uC5B4 \uC774\uB984 \xB7 \uB450\uBAA9\uB9CC \uBCF4\uC5EC\uC694"}),u("div",{class:"guide-body"},u("p",{class:"note",text:"\uB2E4\uC12F \uD310\uC5D0 \uD55C \uBC88\uAF34\uB85C \uC870\uC9C1\uC6D0 \uB2C9\uB124\uC784\uC774\uB098 \uC544\uB798 \uC774\uB984\uC774 \uC81C\uC2DC\uC5B4\uB85C \uB098\uC640\uC694. \uC870\uC9C1\uC6D0 \uB2C9\uB124\uC784\uC740 \uBA85\uBD80\uC5D0\uC11C \uC790\uB3D9\uC73C\uB85C \uB4E4\uC5B4\uAC00\uC694. \uC870\uC9C1\uC6D0\uB4E4\uC5D0\uAC8C\uB294 \uBE44\uBC00\uC774\uC5D0\uC694."}),u("p",{class:"sub-label",text:"\uCD94\uAC00\uB85C \uB123\uC744 \uC774\uB984"}),n,u("button",{type:"button",class:"save",onclick:async function(){let e={},t=(P.drafts["sk-names"]!=null?P.drafts["sk-names"]:n.value).split(/[\n,]/).map(function(r){return r.trim()}).filter(function(r){return!r||e[r]?!1:(e[r]=1,!0)}).slice(0,80);try{await Rn(me(B,"config","sketch"),{names:t}),delete P.drafts["sk-names"],j("\uAE5C\uC9DD \uC774\uB984\uC744 \uC800\uC7A5\uD588\uC5B4\uC694.")}catch(r){j(se(r))}},text:"\uC800\uC7A5"})))}async function JE(){if(P.migrated||!en()||!P.sketchKnown)return;let n=P.topics.find(function(e){return e.name==="\uC6B0\uB9AC\uB07C\uB9AC \uC774\uB984"});if(n){P.migrated=!0;try{P.sketchNames||await Rn(me(B,"config","sketch"),{names:Xl}),await hr(me(B,"liarTopics",n.id))}catch{P.migrated=!1}}}function $E(n){let e=u("button",{class:"back",type:"button",onclick:function(){le("game-sketch")},text:"\uB4DC\uB85C\uC789\uD034\uC988 \uBC29 \uBAA9\uB85D"}),t=pe(),r=n.players||[],i=t&&r.indexOf(t.id)>=0,s=n.status!=="lobby",a=s?n.lineup||[]:r;if(s&&(!n.order||!n.order.length))return u("section",{class:"screen"},e,u("div",{class:"empty",text:"\uAC8C\uC784 \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694."}),u("button",{type:"button",class:"ghost wide",onclick:yr,text:"\uB300\uAE30\uC2E4\uB85C \uB3CC\uB9AC\uAE30"}));Lm(n.status==="draw"||n.status==="reveal"?VE(n):null);let c=n.scores||{},h=s&&n.order?xi(n):null,f=!!(t&&h===t.id&&n.status==="draw"),p=n.guessed||[],y=n.status==="lobby"?"\uB300\uAE30 \uC911":n.status==="result"?"\uAC8C\uC784 \uB05D":n.turn+1+" / "+Vm(n)+"\uBC88\uC9F8 \uADF8\uB9BC",_=u("div",{class:"room-head"},u("div",null,u("span",{class:"eyebrow",text:"\uB4DC\uB85C\uC789\uD034\uC988 \xB7 "+Y(n.createdBy)+"\uC758 \uBC29"}),u("h2",{text:y})),u("span",{class:"mode-chip",text:(n.rounds||1)+"\uBC14\uD034"})),S=u("div",{class:"chips"},a.slice().sort(function(x,z){return(c[z]||0)-(c[x]||0)}).map(function(x){let z=p.indexOf(x)>=0;return u("span",{class:"chip static"+(t&&x===t.id?" me":"")+(z?" done":"")},(x===h&&n.status!=="result"?"\u{1F58C} ":"")+Y(x)+(s?" "+(c[x]||0)+"\uC810":"")+(z?" \u2713":""))})),C;if(n.status==="lobby")C=XE(n,t,i,r);else if(n.status==="result")C=ZE(n);else{let x=n.status==="draw"&&Uo(n)!=null&&Uo(n)-Date.now()<Ci.draw*500;C=[n.status==="reveal"?u("div",{class:"panel turn"},u("div",{class:"field-label",text:"\uC815\uB2F5 \uACF5\uAC1C"}),Ye(n,"\uB2E4\uC74C \uADF8\uB9BC\uAE4C\uC9C0"),u("p",{class:"sk-answer"},"\uC815\uB2F5 ",u("b",{text:n.word})),u("p",{class:"note",text:p.length?"\uB9DE\uD78C \uC0AC\uB78C: "+p.map(Y).join(", "):"\uC544\uBB34\uB3C4 \uBABB \uB9DE\uD614\uC5B4\uC694."})):f?u("div",{class:"panel turn mine"},u("div",{class:"field-label",text:"\uB0B4\uAC00 \uD654\uAC00\uC608\uC694"}),Ye(n,"\uADF8\uB9AC\uAE30 \uB0A8\uC740 \uC2DC\uAC04"),u("p",{class:"sk-answer"},"\uADF8\uB9B4 \uAC83 ",u("b",{text:n.word})),!n.skipUsed&&!p.length?u("button",{type:"button",class:"link-btn",onclick:BE,text:"\uB2E4\uB978 \uB2E8\uC5B4\uB85C \uBC14\uAFB8\uAE30 (1\uBC88)"}):null):u("div",{class:"panel turn"},u("div",{class:"field-label",text:"\uD654\uAC00 "+Y(h)}),Ye(n,"\uB0A8\uC740 \uC2DC\uAC04"),u("p",{class:"sk-answer"},"\uC815\uB2F5 \uD78C\uD2B8 ",u("b",{class:"sk-hint",text:OE(n.word,x)})),u("p",{class:"note",text:t&&p.indexOf(t.id)>=0?"\uC815\uB2F5\uC744 \uB9DE\uD614\uC5B4\uC694! \uB2E4\uB978 \uC0AC\uB78C\uC744 \uAE30\uB2E4\uB824\uC694.":x?"\uCD08\uC131 \uD78C\uD2B8\uAC00 \uC5F4\uB838\uC5B4\uC694.":Array.from(n.word||"").length+"\uAE00\uC790\uC608\uC694. \uC2DC\uAC04\uC774 \uBC18\uCBE4 \uC9C0\uB098\uBA74 \uCD08\uC131\uC774 \uBCF4\uC5EC\uC694."})),u("div",{class:"sk-stage"+(f?" drawing":"")},jE(),f?HE():null)]}let O=u("section",{class:"screen room"},e,_,u("div",{class:"field"},u("div",{class:"field-label",text:s?"\uC810\uC218":"\uBAA8\uC778 \uC0AC\uB78C "+a.length+"\uBA85"}),S),C,eb(n,t,f));return requestAnimationFrame(Mm),O}function XE(n,e,t,r){function i(c,h,f,p){return u("button",{type:"button","aria-pressed":(n[c]||p)===h?"true":"false",onclick:function(){let y={};y[c]=h,gr(y)}},f)}let s=r.length,a=s>=2;return u("div",{class:"panel"},u("div",{class:"field-label",text:"\uAC8C\uC784 \uC124\uC815 \xB7 \uCC38\uAC00\uC790 \uB204\uAD6C\uB098 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694"}),u("div",{class:"seg"},i("rounds",1,"1\uBC14\uD034",1),i("rounds",2,"2\uBC14\uD034",1)),e?t?u("div",{class:"op-row"},u("button",{type:"button",onclick:Ql,text:"\uBC29 \uB098\uAC00\uAE30"}),u("button",{type:"button",class:"go",disabled:!a,onclick:ME,text:a?"\uAC8C\uC784 \uC2DC\uC791":"2\uBA85\uBD80\uD130 \uC2DC\uC791"})):u("button",{type:"button",class:"save",onclick:Hl,text:"\uC774 \uBC29\uC5D0 \uCC38\uAC00\uD558\uAE30"}):u("p",{class:"note",text:"\uC2E0\uC6D0\uC744 \uACE0\uB978 \uC870\uC9C1\uC6D0\uB9CC \uCC38\uAC00\uD560 \uC218 \uC788\uC5B4\uC694."}),u("p",{class:"hint",text:"\uB2E8\uD1A1\uBC29\uC5D0 \u2018\uAC8C\uC784\uBC29 \u2192 \uB4DC\uB85C\uC789\uD034\uC988\uC5D0 \uBC29 \uC5F4\uC5C8\uC5B4\u2019\uB77C\uACE0 \uC54C\uB824\uC8FC\uC138\uC694."}))}function ZE(n){let e=n.scores||{},t=(n.lineup||[]).slice().sort(function(i,s){return(e[s]||0)-(e[i]||0)}),r=["\u{1F947}","\u{1F948}","\u{1F949}"];return u("div",{class:"answer team"},u("div",{class:"result-title",text:Y(t[0])+" \uC6B0\uC2B9!"}),u("ul",{class:"role-list"},t.map(function(i,s){return u("li",null,u("span",{text:(r[s]||s+1+"\uB4F1")+" "+Y(i)}),u("b",{text:(e[i]||0)+"\uC810"}))})),u("div",{class:"op-row"},u("button",{type:"button",onclick:function(){le("game-sketch")},text:"\uBC29 \uBAA9\uB85D"}),u("button",{type:"button",class:"go",onclick:yr,text:"\uAC19\uC740 \uBC29\uC5D0\uC11C \uD55C \uD310 \uB354"})))}function eb(n,e,t){let r=n.game||0,i=P.msgs.filter(function(_){return(_.game||0)===r}),s=e&&(n.lineup||[]).indexOf(e.id)>=0,a=e&&(n.guessed||[]).indexOf(e.id)>=0,c="\uB300\uD654 \uBCF4\uB0B4\uAE30",h=!0;n.status==="draw"&&(t?(c="\uD654\uAC00\uB294 \uADF8\uB9BC\uC73C\uB85C\uB9CC \uB9D0\uD574\uC694",h=!1):s?a?(c="\uC815\uB2F5\uC744 \uB9DE\uD614\uC5B4\uC694! \uB2E4\uC74C \uADF8\uB9BC\uC744 \uAE30\uB2E4\uB824\uC694",h=!1):c="\uC815\uB2F5 \uC785\uB825":(c="\uAC8C\uC784 \uC911\uC5D0\uB294 \uCC38\uAC00\uC790\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC5B4\uC694",h=!1));let f=u("div",{class:"log",role:"log","aria-live":"polite"},i.length?i.map(function(_){if(_.kind==="sys"||_.kind==="skip")return u("div",{class:"msg-sys strong",text:_.text});let S=e&&_.memberId===e.id;return u("div",{class:"bubble chat"+(S?" mine":"")},u("div",{class:"b-meta"},u("b",{text:_.nick||"\uC190\uB2D8"})),u("div",{class:"b-text",text:_.text}))}):u("div",{class:"msg-sys",text:"\uC544\uC9C1 \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694."})),p=Dn("input","chat-text",{type:"text",class:"text-in",maxlength:"60",placeholder:c,autocomplete:"off",disabled:!h}),y=u("form",{class:"send-row",novalidate:!0},p,u("button",{type:"submit",class:"btn-sm"+(n.status==="draw"&&h?" go":""),disabled:!h,text:n.status==="draw"?"\uC81C\uCD9C":"\uBCF4\uB0B4\uAE30"}));return y.addEventListener("submit",async function(_){_.preventDefault();let S=p.value.trim();if(!(!S||!P.user||!h)){P.drafts["chat-text"]="",p.value="";try{await qE(S),X()}catch(C){j(C&&C.code==="late"?"\uC544\uC27D\uAC8C \uC2DC\uAC04\uC774 \uC9C0\uB0AC\uC5B4\uC694.":se(C))}}}),u("div",{class:"field"},u("div",{class:"field-label",text:n.status==="draw"?"\uC815\uB2F5 \uB9DE\uD788\uAE30":"\uB300\uD654"}),f,y)}function tb(){return u("div",{class:"panel"},u("div",{class:"field-label",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C \xB7 \uB450\uBAA9 \uC804\uC6A9"}),P.topics.length?u("ul",{class:"topic-list"},P.topics.map(function(n){return u("li",null,u("span",null,u("b",{text:n.name})," \xB7 "+(n.words||[]).length+"\uAC1C"),u("button",{type:"button",class:"btn-sm",onclick:function(){_m(n)},text:"\uC218\uC815"}))})):u("p",{class:"note",text:"\uC544\uC9C1 \uC5C6\uC5B4\uC694. \uC6B0\uB9AC\uB07C\uB9AC\uB9CC \uC544\uB294 \uB2E8\uC5B4\uB85C \uC8FC\uC81C\uB97C \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694."}),u("button",{type:"button",class:"add-btn",onclick:function(){_m(null)},text:"\uC8FC\uC81C \uCD94\uAC00"}),u("p",{class:"hint",text:"\uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C\uB294 \uBC29 \uC124\uC815\uC5D0\uC11C \u2018\uB79C\uB364\u2019\uC77C \uB54C \uB2E4\uB978 \uC8FC\uC81C\uB4E4 \uC0AC\uC774\uC5D0 \uC11E\uC5EC \uB098\uC640\uC694."}))}function nb(){let n=pe(),e=n?n.nick:"\uC190\uB2D8",t=Dn("textarea","gb-text",{class:"gb-in",maxlength:"300",placeholder:"\uBCF8\uBD80\uC5D0 \uD55C\uB9C8\uB514 \uB0A8\uAE30\uAE30"}),r=u("form",{class:"panel",novalidate:!0},u("div",{class:"field-label",text:e+"(\uC73C)\uB85C \uB0A8\uAE30\uAE30"}),t,u("button",{type:"submit",class:"save",disabled:!P.user,text:"\uB0A8\uAE30\uAE30"}));r.addEventListener("submit",async function(s){s.preventDefault();let a=t.value.trim();if(!a){j("\uB0B4\uC6A9\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}try{await kn(Me(B,"guestbook"),{uid:xn(),memberId:n?n.id:null,nick:e,text:a,createdAt:qe()}),P.drafts["gb-text"]="",X(),j("\uBC29\uBA85\uB85D\uC5D0 \uB0A8\uACBC\uC5B4\uC694.")}catch(c){j(se(c))}});let i=P.guest.length?u("ul",{class:"gb-list"},P.guest.map(function(s){let a=s.memberId?et(s.memberId):null,c=en()||P.user&&s.uid===P.user.uid;return u("li",{class:"gb-item"},u("div",{class:"gb-photo"},tn(a||{nick:s.nick})),u("div",{class:"gb-body"},u("div",{class:"gb-meta"},u("b",{text:a?a.nick:s.nick||"\uC190\uB2D8"}),a&&a.rank?u("span",{class:"gb-rank",text:a.rank}):null,u("span",{class:"gb-time",text:kI(s.createdAt)})),u("p",{class:"gb-text",text:s.text}),c?P.gbConfirm===s.id?u("div",{class:"gb-del"},u("span",{text:"\uC9C0\uC6B8\uAE4C\uC694?"}),u("button",{type:"button",class:"link-btn",onclick:function(){P.gbConfirm=null,X()},text:"\uCDE8\uC18C"}),u("button",{type:"button",class:"link-btn danger",onclick:async function(){try{await hr(me(B,"guestbook",s.id)),P.gbConfirm=null}catch(h){j(se(h))}},text:"\uC9C0\uC6B0\uAE30"})):u("button",{type:"button",class:"link-btn quiet",onclick:function(){P.gbConfirm=s.id,X()},text:"\uC9C0\uC6B0\uAE30"}):null))})):u("div",{class:"empty",text:P.guestReady?"\uCCAB \uBC29\uBA85\uB85D\uC744 \uB0A8\uACA8 \uC8FC\uC138\uC694.":"\uBC29\uBA85\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"});return u("section",{class:"screen"},u("div",{class:"sec-head"},u("div",null,u("span",{class:"eyebrow",text:"\uBCF8\uBD80 \uCD9C\uC785 \uAE30\uB85D"}),u("h2",{text:"\uBC29\uBA85\uB85D"}),u("p",{text:"\uC870\uC9C1\uC6D0 \uB204\uAD6C\uB098 \uB0A8\uAE38 \uC218 \uC788\uC5B4\uC694. \uB0B4\uAC00 \uC4F4 \uAE00\uC740 \uB0B4\uAC00 \uC9C0\uC6B8 \uC218 \uC788\uC5B4\uC694."}))),r,i)}function rb(n){return new Promise(function(e,t){let r=URL.createObjectURL(n),i=new Image;i.onload=function(){let a=i.naturalWidth,c=i.naturalHeight,h=Math.min(1,640/Math.max(a,c)),f=document.createElement("canvas");f.width=Math.round(a*h),f.height=Math.round(c*h);let p=f.getContext("2d");p.fillStyle="#1c1d20",p.fillRect(0,0,f.width,f.height),p.drawImage(i,0,0,f.width,f.height),URL.revokeObjectURL(r),e(f.toDataURL("image/jpeg",.8))},i.onerror=function(){URL.revokeObjectURL(r),t(new Error("bad image"))},i.src=r})}var dr=null;function Cn(){dr&&(dr.remove(),dr=null,document.body.style.overflow="")}function jm(n,e,t){Cn(),dr=u("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e,onclick:function(r){r.target===dr&&Cn()}},u("div",{class:"sheet-panel"},u("div",{class:"sheet-head"},u("div",null,u("span",{class:"eyebrow",text:n}),u("h2",{text:e})),u("button",{type:"button",class:"x","aria-label":"\uB2EB\uAE30",onclick:Cn,text:"\u2715"})),t)),document.body.appendChild(dr),document.body.style.overflow="hidden"}function zm(n){let e=!n,t={photo:n?Im(n.photo):""},r=u("input",{type:"text",id:"f-nick",maxlength:"20",value:n?n.nick:"",autocomplete:"off"}),i=u("input",{type:"text",id:"f-rank",maxlength:"10",value:n&&n.rank||"",autocomplete:"off",placeholder:"\uBE44\uC6CC\uB450\uBA74 \uC77C\uBC18 \uC870\uC9C1\uC6D0 (\uC608: \uB450\uBAA9, \uBD80\uB450\uBAA9)"}),s=u("input",{type:"text",id:"f-alias",maxlength:"30",value:n&&n.alias||"",autocomplete:"off",placeholder:"\uC608: \uBCFC\uC8FC\uBA38\uB2C8 \uAE08\uACE0"}),a=u("input",{type:"text",id:"f-intro",maxlength:"80",value:n&&n.intro||"",autocomplete:"off",placeholder:"\uBCF8\uC778 \uC9C4\uC220 \uD55C \uC904"}),c=u("textarea",{id:"f-charges",placeholder:`\uD55C \uC904\uC5D0 \uD610\uC758 \uD558\uB098\uC529
\uC608: \uD68C\uC758 \uC911 \uBAB0\uB798 \uAC04\uC2DD \uBA39\uC740 \uD610\uC758`});c.value=n?(n.charges||[]).join(`
`):"";let h=u("div",{class:"thumb"}),f=u("p",{class:"msg",role:"status"}),p=u("button",{type:"button",class:"ghost",onclick:function(){t.photo="",y()},text:"\uC0AC\uC9C4 \uBE7C\uAE30"});function y(){h.replaceChildren(tn({nick:r.value||"?",photo:t.photo})),p.hidden=!t.photo}let _=u("input",{type:"file",id:"f-photo",accept:"image/*"});_.addEventListener("change",function(){let O=_.files&&_.files[0];O&&(f.className="msg",f.textContent="\uC0AC\uC9C4 \uC815\uB9AC \uC911\u2026",rb(O).then(function(x){t.photo=x,y(),f.textContent="\uC0AC\uC9C4\uC744 \uBD99\uC600\uC5B4\uC694. \uC800\uC7A5\uD558\uBA74 \uBAA8\uB450\uC5D0\uAC8C \uBCF4\uC785\uB2C8\uB2E4."},function(){f.className="msg err",f.textContent="\uC774 \uC0AC\uC9C4\uC740 \uC5F4 \uC218 \uC5C6\uC5B4\uC694. \uB2E4\uB978 \uC0AC\uC9C4(JPG, PNG)\uC744 \uACE8\uB77C\uC8FC\uC138\uC694."}),_.value="")});let S=u("button",{type:"submit",class:"save",text:e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5"}),C=u("form",{class:"form",novalidate:!0},u("div",{class:"photo-edit"},h,u("div",{class:"photo-btns"},u("label",{class:"file-btn"},"\uC0AC\uC9C4 \uACE0\uB974\uAE30",_),p,u("span",{class:"hint",text:"\uC790\uB3D9\uC73C\uB85C \uC791\uAC8C \uC904\uC5EC\uC11C \uC800\uC7A5\uB3FC\uC694."}))),u("label",null,u("b",{text:"\uB2C9\uB124\uC784 (\uD544\uC218)"}),r),u("label",null,u("b",{text:"\uC9C1\uC704"}),i),u("label",null,u("b",{text:"\uBCC4\uBA85"}),s),u("label",null,u("b",{text:"\uD55C \uC904 \uC18C\uAC1C"}),a),u("label",null,u("b",{text:"\uD610\uC758"}),c),f,S);C.addEventListener("submit",async function(O){O.preventDefault();let x=r.value.trim();if(!x){f.className="msg err",f.textContent="\uB2C9\uB124\uC784\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.",r.focus();return}let z={nick:x,rank:i.value.trim(),alias:s.value.trim(),intro:a.value.trim(),charges:c.value.split(`
`).map(function(K){return K.trim()}).filter(Boolean).slice(0,8),photo:t.photo,sample:!1},W=e?"m"+Date.now().toString(36)+Math.random().toString(36).slice(2,6):n.id;z.no=e?P.members.reduce(function(K,re){return Math.max(K,re.no||0)},0)+1:n.no,S.disabled=!0,S.textContent="\uC800\uC7A5 \uC911\u2026";try{await Rn(me(B,"members",W),z),Cn(),le("m-"+W),j(e?"\uC0C8 \uC218\uBC30\uC11C\uB97C \uB4F1\uB85D\uD588\uC5B4\uC694.":"\uC218\uBC30\uC11C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.")}catch(K){S.disabled=!1,S.textContent=e?"\uC218\uBC30\uC11C \uB4F1\uB85D":"\uC218\uC815 \uB0B4\uC6A9 \uC800\uC7A5",f.className="msg err",f.textContent=se(K)}}),r.addEventListener("input",function(){t.photo||y()}),jm(e?"\uC2E0\uADDC \uB4F1\uB85D":jo(n),e?"\uC870\uC9C1\uC6D0 \uB4F1\uB85D":"\uC218\uBC30\uC11C \uC218\uC815",C),y()}function _m(n){let e=u("input",{type:"text",id:"t-name",maxlength:"16",value:n?n.name:"",autocomplete:"off",placeholder:"\uC608: \uAC8C\uC784 \uC544\uC774\uD15C"}),t=u("textarea",{id:"t-words",placeholder:`\uD55C \uC904\uC5D0 \uD558\uB098\uC529, \uB610\uB294 \uC27C\uD45C\uB85C \uAD6C\uBD84
\uC608: \uBE68\uAC04 \uD3EC\uC158, \uADC0\uD658 \uC8FC\uBB38\uC11C, \uC5D8\uB9AD\uC11C, \uC21C\uAC04\uC774\uB3D9 \uC2A4\uD06C\uB864`});t.value=n?(n.words||[]).join(`
`):"";let r=u("p",{class:"msg",role:"status"}),i=u("button",{type:"submit",class:"save",text:n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00"}),s=u("div");function a(f){i.disabled=!1,i.textContent=n?"\uC8FC\uC81C \uC800\uC7A5":"\uC8FC\uC81C \uCD94\uAC00",r.className="msg err",r.textContent=f}function c(f){n&&s.replaceChildren(f?u("div",{class:"confirm"},u("p",{text:"\u2018"+n.name+"\u2019 \uC8FC\uC81C\uB97C \uC9C0\uC6B8\uAE4C\uC694?"}),u("div",{class:"op-row"},u("button",{type:"button",onclick:function(){c(!1)},text:"\uCDE8\uC18C"}),u("button",{type:"button",class:"danger",onclick:async function(){try{await hr(me(B,"liarTopics",n.id)),Cn(),j("\uC8FC\uC81C\uB97C \uC9C0\uC6E0\uC5B4\uC694.")}catch(p){a(se(p))}},text:"\uC9C0\uC6B0\uAE30"}))):u("button",{type:"button",class:"ghost",onclick:function(){c(!0)},text:"\uC774 \uC8FC\uC81C \uC9C0\uC6B0\uAE30"}))}let h=u("form",{class:"form",novalidate:!0},u("label",null,u("b",{text:"\uC8FC\uC81C \uC774\uB984"}),e),u("label",null,u("b",{text:"\uB2E8\uC5B4 (4\uAC1C \uC774\uC0C1)"}),t),r,i,s);h.addEventListener("submit",async function(f){f.preventDefault();let p=e.value.trim(),y={},_=t.value.split(/[\n,]/).map(function(S){return S.trim()}).filter(function(S){return!S||y[S]?!1:(y[S]=!0,!0)}).slice(0,60);if(!p){a("\uC8FC\uC81C \uC774\uB984\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.");return}if(_.length<4){a("\uB2E8\uC5B4\uB97C 4\uAC1C \uC774\uC0C1 \uC801\uC5B4\uC8FC\uC138\uC694. \uC9C0\uAE08 "+_.length+"\uAC1C\uC608\uC694.");return}i.disabled=!0,i.textContent="\uC800\uC7A5 \uC911\u2026";try{n?await Rn(me(B,"liarTopics",n.id),{name:p,words:_,order:n.order||0}):await kn(Me(B,"liarTopics"),{name:p,words:_,order:Date.now()}),Cn(),j(n?"\uC8FC\uC81C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694.":"\uC8FC\uC81C\uB97C \uCD94\uAC00\uD588\uC5B4\uC694.")}catch(S){a(se(S))}}),jm("\uB77C\uC774\uC5B4 \xB7 \uC6B0\uB9AC\uB07C\uB9AC \uC8FC\uC81C",n?"\uC8FC\uC81C \uC218\uC815":"\uC8FC\uC81C \uCD94\uAC00",h),c(!1)}document.addEventListener("keydown",function(n){n.key==="Escape"&&Cn()});var ib=document.getElementById("bf-root"),ki=u("main",{class:"wrap"}),Gm=u("span",{class:"op-chip",text:"\uB450\uBAA9",hidden:!0}),sb=u("div",{class:"filebar wrap"},u("span",{class:"brand"},Kl("logo-s"),u("span",null,u("b",{text:"\uBD88\uC8FC\uBA39\uC870\uC9C1"})," \xB7 \uBE44\uBC00\uBCF8\uBD80")),u("span",{class:"fb-right"},Gm,u("span",{class:"lvl",text:"\uAE30\uBC00 \uB4F1\uAE09 A"}))),ob=[["hq","\uBCF8\uBD80"],["members","\uC870\uC9C1\uC6D0"],["games","\uAC8C\uC784\uBC29"],["guestbook","\uBC29\uBA85\uB85D"]],Mo={},Km=u("nav",{class:"tabbar","aria-label":"\uC8FC \uBA54\uB274"},u("div",{class:"tabbar-in"},ob.map(function(n){let e=u("button",{class:"tab",type:"button",onclick:function(){le(n[0])}},NI(n[0]),u("span",{text:n[1]}));return Mo[n[0]]=e,e})));ib.replaceChildren(sb,ki,Km);var Ll=null,Fl=!1,vm=0;function X(){Fl||(Fl=!0,requestAnimationFrame(function(){Fl=!1,ab()}))}function ab(){if(L.drawing){L.pendingRender=!0;return}JE();let n=document.activeElement,e=n&&n.id&&ki.contains(n)?n.id:null,t=e&&typeof n.selectionStart=="number"?[n.selectionStart,n.selectionEnd]:null,r=ki.querySelector(".log"),i=r?{top:r.scrollTop,pinned:r.scrollHeight-r.scrollTop-r.clientHeight<60}:null,s=Em(),a="hq",c;P.membersReady?fm()?c=jI():s==="members"?(a="members",c=zI()):s.indexOf("m-")===0?(a="members",c=GI(s.slice(2))):s==="games"?(a="games",c=WI()):s==="game-liar"?(a="games",c=HI()):s==="game-mafia"?(a="games",c=gE()):s==="game-sketch"?(a="games",c=QE()):s.indexOf("room-")===0?(a="games",c=tE(s.slice(5))):s==="guestbook"?(a="guestbook",c=nb()):c=BI():c=u("section",{class:"screen"},u("div",{class:"empty",text:"\uBCF8\uBD80 \uBB38\uC744 \uC5EC\uB294 \uC911\u2026"})),s.indexOf("room-")!==0&&(Am(null),Lm(null)),s!==Ll&&(P.confirmDelete=!1);let h=P.membersReady&&fm();if(Km.hidden=h,ki.replaceChildren(c),Object.keys(Mo).forEach(function(p){p===a&&!h?Mo[p].setAttribute("aria-current","page"):Mo[p].removeAttribute("aria-current")}),Gm.hidden=!en(),e){let p=document.getElementById(e);if(p&&(p.focus({preventScroll:!0}),t&&p.setSelectionRange))try{p.setSelectionRange(t[0],t[1])}catch{}}let f=ki.querySelector(".log");if(f){let p=P.msgs.length!==vm;!i||i.pinned||p?f.scrollTop=f.scrollHeight:f.scrollTop=i.top}vm=P.msgs.length,s!==Ll&&window.scrollTo(0,0),Ll=s}window.addEventListener("hashchange",X);MI();X();
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
