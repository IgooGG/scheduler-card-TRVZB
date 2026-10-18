!function(){"use strict";function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var d;const l=window,h=l.trustedTypes,c=h?h.emptyScript:"",u=l.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},g="finalized";let f=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const r=this[t];this[e]=s,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=m){var s;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,r=s._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=s.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var $;f[g]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:f}),(null!==(d=l.reactiveElementVersions)&&void 0!==d?d:l.reactiveElementVersions=[]).push("1.6.3");const y=window,b=y.trustedTypes,_=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,E=`<${A}>`,S=document,C=()=>S.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,M="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,P=/>/g,D=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,U=/"/g,O=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),I=new WeakMap,L=S.createTreeWalker(S,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":"",o=z;for(let e=0;e<i;e++){const i=t[e];let a,d,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,d=o.exec(i),null!==d);)h=o.lastIndex,o===z?"!--"===d[1]?o=R:void 0!==d[1]?o=P:void 0!==d[2]?(O.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=D):void 0!==d[3]&&(o=D):o===D?">"===d[0]?(o=null!=r?r:z,l=-1):void 0===d[1]?l=-2:(l=o.lastIndex-d[2].length,a=d[1],o=void 0===d[3]?D:'"'===d[3]?U:N):o===U||o===N?o=D:o===R||o===P?o=z:(o=D,r=void 0);const c=o===D&&t[e+1].startsWith("/>")?" ":"";n+=o===z?i+E:l>=0?(s.push(a),i.slice(0,l)+x+i.slice(l)+w+c):i+w+(-2===l?(s.push(void 0),e):c)}return[V(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[d,l]=Z(t,e);if(this.el=W.createElement(d,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=L.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(x)||e.startsWith(w)){const i=l[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+x).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?X:"@"===e[1]?Y:K})}else a.push({type:6,index:r})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),L.nextNode(),a.push({type:2,index:++r});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)a.push({type:7,index:r}),t+=w.length-1}r++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){var r,n,o,a;if(e===H)return e;let d=void 0!==s?null===(r=i._$Co)||void 0===r?void 0:r[s]:i._$Cl;const l=k(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===l?d=void 0:(d=new l(t),d._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=d:i._$Cl=d),void 0!==d&&(e=F(t,d._$AS(t,e.values),d,s)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);L.currentNode=r;let n=L.nextNode(),o=0,a=0,d=s[0];for(;void 0!==d;){if(o===d.index){let e;2===d.type?e=new G(n,n.nextSibling,this,t):1===d.type?e=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(e=new tt(n,this,t)),this._$AV.push(e),d=s[++a]}o!==(null==d?void 0:d.index)&&(n=L.nextNode(),o++)}return L.currentNode=S,r}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{constructor(t,e,i,s){var r;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),k(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==B&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=W.createElement(V(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.v(i);else{const t=new q(r,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new W(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new G(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,s,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=F(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=F(this,s[i+o],e,o),a===H&&(a=this._$AH[o]),n||(n=!k(a)||a!==this._$AH[o]),a===B?t=B:t!==B&&(t+=(null!=a?a:"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}const Q=b?b.emptyScript:"";class X extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==B?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends K{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:B)===H)return;const s=this._$AH,r=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==B&&(s===B||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(W,G),(null!==($=y.litHtmlVersions)&&void 0!==$?$:y.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var it,st;class rt extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,r;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new G(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return H}}rt.finalized=!0,rt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:rt});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:rt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ot=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e),at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function dt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function lt(t){return dt({...t,state:!0})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var ht;null===(ht=window.HTMLSlotElement)||void 0===ht||ht.prototype.assignedElements;const ct=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],ut=new Set(["","unknown","unavailable","none","null","n/a"]),pt=/^(\d{2}):(\d{2})\/(\d{1,2}(?:\.\d+)?)$/,vt=t=>{const e=/^(\d{2}):(\d{2})$/.exec(t);return e?60*Number(e[1])+Number(e[2]):Number.NaN},mt=t=>{const e=Math.max(0,Math.min(1439,Math.round(t)));return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`};function gt(t){var e;const i=[];Array.isArray(t)&&t.length||i.push("A day needs at least a 00:00 transition."),t.length>6&&i.push("A day can contain at most 6 transitions."),"00:00"!==(null===(e=t[0])||void 0===e?void 0:e.time)&&i.push("The first transition must be at 00:00.");let s=-1;return t.forEach((t,e)=>{const r=vt(t.time);(!Number.isInteger(r)||r<0||r>=1440)&&i.push(`Transition ${e+1} has an invalid time.`),r<=s&&i.push("Transition times must be strictly increasing and unique."),s=r,(!Number.isFinite(t.temperature)||t.temperature<4||t.temperature>35)&&i.push(`Transition ${e+1} must be between 4 and 35 °C.`),Math.abs(t.temperature/.5-Math.round(t.temperature/.5))>1e-5&&i.push(`Transition ${e+1} must use 0.5 °C steps.`)}),i}function ft(t){if("string"!=typeof t||!t.trim())return{errors:["The cached schedule is empty."],normalizedDuplicates:0};const e=[];for(const i of t.trim().split(/\s+/)){const t=pt.exec(i);if(!t)return{errors:[`Invalid schedule token: ${i}`],normalizedDuplicates:0};const s=Number(t[1]),r=Number(t[2]);if(s>23||r>59)return{errors:[`Invalid time: ${t[1]}:${t[2]}`],normalizedDuplicates:0};e.push({time:`${t[1]}:${t[2]}`,temperature:Number(t[3])})}const i=e.filter((t,i)=>{const s=e[i-1];return!s||s.time!==t.time||s.temperature!==t.temperature}),s=e.length-i.length,r=gt(i);return r.length?{errors:r,normalizedDuplicates:s}:{schedule:i,errors:[],normalizedDuplicates:s}}function $t(t){const e=gt(t);if(e.length)throw new Error(e.join(" "));return t.map(({time:t,temperature:e})=>`${t}/${Number.isInteger(e)?e:e.toFixed(1)}`).join(" ")}function yt(t){return Object.fromEntries(ct.map(e=>[e,t[e].map(t=>Object.assign({},t))]))}function bt(t,e){return ct.filter(i=>$t(t[i])!==$t(e[i]))}function _t(t,e,i,s=24){const r=function(t,e,i){const s=e.replace(/^climate\./,""),r=Object.assign({},i);for(const e of ct){if(r[e])continue;const i=`_weekly_schedule_${e}`,n=`text.${s}${i}`;if(t.states[n]){r[e]=n;continue}const o=Object.keys(t.states).filter(t=>t.startsWith("text.")&&t.endsWith(i)&&t.includes(s));1===o.length&&(r[e]=o[0])}return r}(t,e,i),n=ct.filter(t=>!r[t]);if(n.length)return{status:"missing",entities:r,message:`Schedule entities were not found for ${n.join(", ")}. Configure schedule_entities explicitly.`};const o=r,a=ct.filter(e=>{var i;return ut.has(((null===(i=t.states[o[e]])||void 0===i?void 0:i.state)||"").toLowerCase())});if(a.length)return{status:"unavailable",entities:r,message:`Cached schedule values are unavailable for ${a.join(", ")}. Zigbee2MQTT cannot read these schedules on demand.`};const d={},l=[];for(const e of ct){const i=ft(t.states[o[e]].state);if(!i.schedule)return{status:"malformed",entities:r,message:`${e}: ${i.errors.join(" ")}`};d[e]=i.schedule,i.normalizedDuplicates&&l.push(e)}const h=ct.map(e=>t.states[o[e]].last_updated||t.states[o[e]].last_changed).filter(t=>Boolean(t)),c=h.sort()[0],u=!!c&&Date.now()-new Date(c).getTime()>36e5*s;return{status:"loaded",schedule:d,entities:o,cachedAt:c,stale:u,normalizedDuplicateDays:l}}const xt="0.1.0+debug.20261018.2115",wt={monday:"Mon",tuesday:"Tue",wednesday:"Wed",thursday:"Thu",friday:"Fri",saturday:"Sat",sunday:"Sun"},At=t=>new Promise(e=>window.setTimeout(e,t)),Et=t=>Number.isInteger(t)?String(t):t.toFixed(1);let St=class extends rt{constructor(){super(...arguments),this.config={},this.selected=0,this.day="monday",this.message="",this.saving=!1,this.configCompleted=!1,this.beforeUnload=t=>{this.dirty&&(t.preventDefault(),t.returnValue="")}}static getConfigElement(){return document.createElement("trvzb-internal-scheduler-card-editor")}static getStubConfig(){return{type:"custom:trvzb-internal-scheduler-card",thermostats:[]}}setConfig(t){var e;if(!t||!t.entity&&!(null===(e=t.thermostats)||void 0===e?void 0:e.length))throw new Error("Provide entity or thermostats.");this.config=t,this.selected=0,this.configCompleted=!0,this.reportDiagnostic("setConfig completed"),this.reload()}connectedCallback(){super.connectedCallback(),window.addEventListener("beforeunload",this.beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this.beforeUnload)}updated(t){var e;t.has("hass")&&(this.config.entity||(null===(e=this.config.thermostats)||void 0===e?void 0:e.length))&&!this.saving&&(this.reportDiagnostic("hass assigned or updated"),this.reload(!1))}get thermostats(){return(this.config.thermostats||(this.config.entity?[{entity:this.config.entity,schedule_entities:this.config.schedule_entities}]:[])).map(t=>"string"==typeof t?{entity:t}:t)}get thermostat(){return this.thermostats[this.selected]}get dirty(){return Boolean(this.original&&this.draft&&bt(this.original,this.draft).length)}get timeoutMs(){var t;return 1e3*Math.max(5,null!==(t=this.config.confirmation_timeout)&&void 0!==t?t:30)}get showWarnings(){return!1!==this.config.show_warnings}get editorGate(){return this.hass?this.configCompleted?this.thermostat?this.lastLoadError?`blocked: schedule load exception: ${this.lastLoadError}`:this.loaded?"loaded"!==this.loaded.status?`blocked: schedule load status is ${this.loaded.status}`:this.original?this.draft?"rendering editor":"blocked: draft schedule was not initialized":"blocked: original schedule was not initialized":"blocked: no cached schedule load result yet":"blocked: no thermostat is configured":"blocked: setConfig has not completed":"blocked: hass has not been assigned"}reportDiagnostic(t){var e;if(!this.config.debug)return;const i=this.loaded?ct.filter(t=>Boolean(this.loaded.entities[t])):[];console.info("[TRVZB Internal Scheduler Card]",{build:xt,event:t,hassAssigned:Boolean(this.hass),setConfigCompleted:this.configCompleted,resolvedScheduleDays:i,loadStatus:(null===(e=this.loaded)||void 0===e?void 0:e.status)||"not loaded",originalInitialized:Boolean(this.original),draftInitialized:Boolean(this.draft),editorGate:this.editorGate,loadError:this.lastLoadError||"none",renderError:this.lastRenderError||"none"})}renderDebugPanel(){var t,e;if(!this.config.debug)return B;const i=this.loaded?ct.filter(t=>Boolean(this.loaded.entities[t])):[],s=ct.filter(t=>!i.includes(t)),r="loaded"===(null===(t=this.loaded)||void 0===t?void 0:t.status)?"succeeded for all resolved weekdays":(null===(e=this.loaded)||void 0===e?void 0:e.status)||"not attempted";return j`<details class="debug" open>
      <summary>TRVZB scheduler debug · build ${xt}</summary>
      <dl>
        <dt>hass assigned</dt>
        <dd>${Boolean(this.hass)}</dd>
        <dt>setConfig completed</dt>
        <dd>${this.configCompleted}</dd>
        <dt>schedule entities</dt>
        <dd>${i.length}/7 resolved${s.length?`; missing: ${s.join(", ")}`:""}</dd>
        <dt>parsing / validation</dt>
        <dd>${r}</dd>
        <dt>original initialized</dt>
        <dd>${Boolean(this.original)}</dd>
        <dt>draft initialized</dt>
        <dd>${Boolean(this.draft)}</dd>
        <dt>editor condition</dt>
        <dd>${this.editorGate}</dd>
        <dt>load exception</dt>
        <dd>${this.lastLoadError||"none"}</dd>
        <dt>render exception</dt>
        <dd>${this.lastRenderError||"none"}</dd>
      </dl>
    </details>`}reload(t=!0){var e;const i=this.thermostat;if(!i||!this.hass)return;let s;try{s=_t(this.hass,i.entity,i.schedule_entities,null!==(e=this.config.stale_after_hours)&&void 0!==e?e:24),this.lastLoadError=void 0}catch(t){return this.lastLoadError=t instanceof Error?t.message:String(t),this.loaded=void 0,void this.reportDiagnostic("schedule load failed")}this.loaded=s;const r=!this.original||!this.draft;"loaded"===s.status&&(r||t&&!this.dirty)&&(this.original=yt(s.schedule),this.draft=yt(s.schedule),this.message=""),this.reportDiagnostic("schedule load completed")}selectThermostat(t){const e=Number(t.target.value);e!==this.selected&&(!this.dirty||window.confirm("Discard unsaved schedule changes?")?(this.selected=e,this.original=void 0,this.draft=void 0,this.message="",this.reload()):t.target.value=String(this.selected))}setDay(t){this.day=t}updateTransition(t,e){if(!this.draft)return;const i=this.day,s=yt(this.draft);s[i][t]=Object.assign(Object.assign({},s[i][t]),e),s[i].sort((t,e)=>vt(t.time)-vt(e.time)),this.draft=s}addTransition(){if(!this.draft||this.draft[this.day].length>=6)return;const t=this.draft[this.day],e=vt(t[t.length-1].time),i=Math.min(1439,e+Math.max(30,Math.floor((1439-e)/2)));if(i<=e)return;const s=yt(this.draft);s[this.day].push({time:mt(i),temperature:t[t.length-1].temperature}),this.draft=s}removeTransition(t){if(!this.draft||0===t)return;const e=yt(this.draft);e[this.day].splice(t,1),this.draft=e}copyTo(t){if(!this.draft)return;const e=Array.from(this.renderRoot.querySelectorAll("input[data-copy-day]:checked")).map(t=>t.dataset.copyDay);if(!e.length)return;const i=yt(this.draft);e.forEach(t=>i[t]=i[this.day].map(t=>Object.assign({},t))),this.draft=i,this.message=`Copied ${wt[this.day]} to ${e.map(t=>wt[t]).join(", ")}.`,t.currentTarget.blur()}cancel(){this.original&&(this.draft=yt(this.original),this.message="Edits discarded.")}pointerDown(t,e){0===e||this.saving||(this.dragIndex=e,t.currentTarget.setPointerCapture(t.pointerId))}pointerMove(t){if(void 0===this.dragIndex||!this.draft)return;const e=t.currentTarget.getBoundingClientRect(),i=5*Math.round((t.clientX-e.left)/e.width*24*60/5),s=this.draft[this.day],r=vt(s[this.dragIndex-1].time)+5,n=this.dragIndex<s.length-1?vt(s[this.dragIndex+1].time)-5:1439;this.updateTransition(this.dragIndex,{time:mt(Math.max(r,Math.min(n,i)))})}pointerUp(){this.dragIndex=void 0}async setMode(t){const e=this.thermostat;if(e){this.message="Requesting mode change…";try{await this.hass.callService("climate","set_hvac_mode",{entity_id:e.entity,hvac_mode:t}),this.message=`Mode request sent: ${t}. Auto is the only mode that follows the TRV schedule.`}catch(t){this.message=`Could not change mode: ${t instanceof Error?t.message:String(t)}`}}}async waitFor(t,e){var i;const s=Date.now()+this.timeoutMs;for(;Date.now()<s;){if((null===(i=this.hass.states[t])||void 0===i?void 0:i.state)===e)return!0;await At(250)}return!1}async save(){var t;if(!this.original||!this.draft||!this.thermostat||"loaded"!==(null===(t=this.loaded)||void 0===t?void 0:t.status))return;const e=ct.flatMap(t=>gt(this.draft[t]).map(e=>`${wt[t]}: ${e}`));if(e.length)return void(this.message=e.join(" "));if(bt(this.original,this.draft).length){this.saving=!0,this.message="Saving changed days; waiting for Home Assistant state confirmation…";try{const t=await async function(t,e,i,s,r){const n=bt(i,s),o=[];for(const i of n){const a=$t(s[i]);try{if(await t.callService("text","set_value",{entity_id:e[i],value:a}),!await r(e[i],a))return{confirmed:o,pending:n.filter(t=>!o.includes(t)),error:`${i} was not confirmed by an observed schedule state.`};o.push(i)}catch(t){return{confirmed:o,pending:n.filter(t=>!o.includes(t)),error:t instanceof Error?t.message:String(t)}}}return{confirmed:o,pending:[]}}(this.hass,this.loaded.entities,this.original,this.draft,(t,e)=>this.waitFor(t,e));t.confirmed.forEach(t=>{this.original[t]=this.draft[t].map(t=>Object.assign({},t))}),this.message=t.error?`${t.confirmed.length?`Confirmed ${t.confirmed.map(t=>wt[t]).join(", ")}. `:""}Save incomplete: ${t.error} Existing unsaved days were kept for retry.`:`Confirmed on device state: ${t.confirmed.map(t=>wt[t]).join(", ")}.`}finally{this.saving=!1,this.original=this.original?yt(this.original):void 0}}else this.message="No changes to save."}render(){this.lastRenderError=void 0;try{return this.renderCard()}catch(t){return this.lastRenderError=t instanceof Error?t.message:String(t),this.reportDiagnostic("render failed"),console.error("[TRVZB Internal Scheduler Card] render failed",{build:xt,error:t}),j`<ha-card
        ><div class="body">
          <div class="notice error">
            TRVZB scheduler render error. Enable <code>debug: true</code> and inspect this panel.
          </div>
          ${this.renderDebugPanel()}
        </div></ha-card
      >`}}renderCard(){var t,e,i,s,r;const n=this.thermostat,o=n&&(null===(t=this.hass)||void 0===t?void 0:t.states[n.entity]),a="°F"===(null==o?void 0:o.attributes.temperature_unit)||"F"===(null==o?void 0:o.attributes.temperature_unit),d=(null===(e=this.draft)||void 0===e?void 0:e[this.day])||[],l=this.draft?gt(d):[];return j`<ha-card
      ><div class="header">
        <h1>${this.config.title||"TRVZB internal schedule"}</h1>
        ${this.thermostats.length>1?j`<select @change=${this.selectThermostat} .value=${String(this.selected)} aria-label="Thermostat">
                ${this.thermostats.map((t,e)=>{var i,s;return j`<option value=${e}>${t.name||(null===(s=null===(i=this.hass)||void 0===i?void 0:i.states[t.entity])||void 0===s?void 0:s.attributes.friendly_name)||t.entity}</option>`})}
              </select>`:B}
      </div>
      <div class="body">
        ${this.renderDebugPanel()}
        ${o?B:j`<div class="notice error">Configured climate entity is unavailable: ${(null==n?void 0:n.entity)||"none"}.</div>`}
        ${this.loaded&&"loaded"!==this.loaded.status?j`<div class="notice error">${this.loaded.message}</div>`:B}
        ${this.showWarnings&&"loaded"===(null===(i=this.loaded)||void 0===i?void 0:i.status)?j`<div class="notice">Schedule values are cached Home Assistant/Zigbee2MQTT state${this.loaded.cachedAt?` (oldest cached ${new Date(this.loaded.cachedAt).toLocaleString()})`:""}; TRVZB does not support on-demand schedule reads.</div>`:B}
        ${"loaded"===(null===(s=this.loaded)||void 0===s?void 0:s.status)&&this.loaded.stale?j`<div class="notice error">Schedule cache is stale. Review the current entity values before making or saving edits.</div>`:B}
        ${this.showWarnings&&"loaded"===(null===(r=this.loaded)||void 0===r?void 0:r.status)&&this.loaded.normalizedDuplicateDays.length?j`<div class="notice info">Exact duplicate final transitions were normalized for editing on ${this.loaded.normalizedDuplicateDays.map(t=>wt[t]).join(", ")}. The cached thermostat values have not been changed; they are rewritten only if you explicitly save edits.</div>`:B}
        ${a?j`<div class="notice info">Home Assistant reports this climate entity in °F. TRVZB schedule values are always displayed, validated, and sent as °C; no conversion is applied.</div>`:B}
        <div class="toolbar">
          <div class="mode">
            <span class="status">Mode:</span
            >${["off","auto","heat"].map(t=>j`<button ?disabled=${!o||this.saving} class=${(null==o?void 0:o.state)===t?"active":""} @click=${()=>this.setMode(t)}>${t}</button>`)}
          </div>
          <span class="status">Auto follows the locally stored TRV schedule. Heat is manual.</span>
        </div>
        ${this.draft?j`<div class="day-tabs">
                  ${ct.map(t=>j`<button class=${t===this.day?"active":""} @click=${()=>this.setDay(t)}>${wt[t]}</button>`)}
                </div>
                <div
                  class="timeline"
                  @pointermove=${this.pointerMove}
                  @pointerup=${this.pointerUp}
                  @pointercancel=${this.pointerUp}
                >
                  ${d.map((t,e)=>j`<div class="segment" title=${`${Et(t.temperature)} °C from ${t.time}`} style=${`left:${vt(t.time)/14.4}%;width:${((e<d.length-1?vt(d[e+1].time):1440)-vt(t.time))/14.4}%`}><span class="temperature">${Et(t.temperature)} °C</span></div>`)}
                  ${d.map((t,e)=>j`<button class="marker" style=${`left:${vt(t.time)/14.4}%`} @pointerdown=${t=>this.pointerDown(t,e)} aria-label=${`Move ${t.time}`}><span>${t.time}</span></button>`)}
                  <div class="axis">
                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
                  </div>
                </div>
                <div class="transitions">
                  ${d.map((t,e)=>j`<div class="transition">
                        <input
                          type="time"
                          step="60"
                          .value=${t.time}
                          ?disabled=${0===e||this.saving}
                          @change=${t=>this.updateTransition(e,{time:t.target.value})}
                        />
                        <div class="temperature-control">
                          <input
                            type="number"
                            min=${4}
                            max=${35}
                            step="0.5"
                            .value=${Et(t.temperature)}
                            ?disabled=${this.saving}
                            aria-label="Temperature in °C"
                            title="Temperature in °C"
                            @change=${t=>this.updateTransition(e,{temperature:Number(t.target.value)})}
                          /><span aria-hidden="true">°C</span>
                        </div>
                        <button
                          ?disabled=${0===e||this.saving}
                          @click=${()=>this.removeTransition(e)}
                          aria-label="Remove transition"
                        >
                          −
                        </button>
                      </div>`)}
                </div>
                <div class="copy">
                  <button
                    ?disabled=${d.length>=6||this.saving}
                    @click=${this.addTransition}
                  >
                    + Add transition</button
                  ><span class="status">Copy ${wt[this.day]} to:</span
                  >${ct.filter(t=>t!==this.day).map(t=>j`<label><input type="checkbox" data-copy-day=${t} ?disabled=${this.saving} /> ${wt[t]}</label>`)}<button
                    ?disabled=${this.saving}
                    @click=${this.copyTo}
                  >
                    Copy
                  </button>
                </div>
                ${l.length?j`<div class="notice error">${l.join(" ")}</div>`:B}
                <div class="actions">
                  <button
                    class="primary"
                    ?disabled=${!this.dirty||this.saving||l.length>0}
                    @click=${this.save}
                  >
                    ${this.saving?"Saving…":"Save"}</button
                  ><button ?disabled=${!this.dirty||this.saving} @click=${this.cancel}>Cancel</button
                  >${this.dirty?j`<span class="unsaved">Unsaved changes</span>`:j`<span class="status">No pending changes</span>`}
                </div>`:B}
        ${this.message?j`<div class="notice ${this.message.includes("incomplete")||this.message.includes("Could not")?"error":""}">${this.message}</div>`:B}
      </div></ha-card
    >`}};St.styles=o`
    :host {
      display: block;
      --trvzb-accent: var(--primary-color);
    }
    ha-card {
      overflow: hidden;
    }
    .header {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 16px 16px 8px;
    }
    .header h1 {
      flex: 1;
      margin: 0;
      font-size: var(--ha-font-size-xl, 22px);
      font-weight: 500;
    }
    select,
    input,
    button {
      font: inherit;
      color: var(--primary-text-color);
    }
    select,
    input {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 8px;
    }
    button {
      border: 0;
      border-radius: 8px;
      padding: 9px 12px;
      background: var(--secondary-background-color);
      cursor: pointer;
    }
    button.primary,
    button.active {
      background: var(--trvzb-accent);
      color: var(--text-primary-color, white);
    }
    button:disabled {
      opacity: 0.52;
      cursor: not-allowed;
    }
    .body {
      padding: 8px 16px 16px;
    }
    .notice {
      margin: 8px 0 14px;
      padding: 10px 12px;
      background: var(--secondary-background-color);
      border-left: 4px solid var(--warning-color, #f6b51d);
      border-radius: 4px;
      white-space: normal;
    }
    .notice.error {
      border-left-color: var(--error-color, #db4437);
    }
    .notice.info {
      border-left-color: var(--info-color, var(--primary-color));
    }
    .debug {
      margin: 8px 0 14px;
      padding: 8px 10px;
      border: 1px dashed var(--divider-color);
      border-radius: 6px;
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 0.78em;
    }
    .debug summary {
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .debug dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 4px 12px;
      margin: 8px 0 0;
    }
    .debug dt {
      font-weight: 600;
    }
    .debug dd {
      min-width: 0;
      margin: 0;
      overflow-wrap: anywhere;
    }
    .toolbar,
    .actions,
    .day-tabs,
    .mode {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .toolbar {
      justify-content: space-between;
      margin: 8px 0 14px;
    }
    .mode button {
      text-transform: capitalize;
    }
    .day-tabs {
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: 8px;
    }
    .day-tabs button {
      min-width: 52px;
    }
    .timeline {
      position: relative;
      height: 145px;
      margin: 24px 10px 14px;
      border-radius: 10px;
      background: linear-gradient(90deg, var(--secondary-background-color), var(--card-background-color));
      border: 1px solid var(--divider-color);
      overflow: visible;
      touch-action: none;
    }
    .axis {
      position: absolute;
      inset: auto 0 -22px;
      display: flex;
      justify-content: space-between;
      color: var(--secondary-text-color);
      font-size: 0.78em;
    }
    .segment {
      position: absolute;
      top: 0;
      bottom: 0;
      background: color-mix(in srgb, var(--trvzb-accent) 12%, transparent);
      border-right: 1px solid color-mix(in srgb, var(--trvzb-accent) 45%, transparent);
    }
    .marker {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      margin-left: -10px;
      background: transparent;
      border: 0;
      padding: 0;
      touch-action: none;
    }
    .marker::before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 4px;
      height: 100%;
      background: var(--trvzb-accent);
      border-radius: 4px;
    }
    .marker span {
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      color: var(--primary-text-color);
      font-size: 0.78em;
    }
    .marker:first-of-type {
      cursor: default;
    }
    .temperature {
      position: absolute;
      left: 8px;
      bottom: 8px;
      font-size: 1.15em;
      font-weight: 500;
    }
    .transitions {
      margin-top: 35px;
      display: grid;
      gap: 8px;
    }
    .transition {
      display: grid;
      grid-template-columns: minmax(94px, 1fr) minmax(88px, 1fr) auto;
      gap: 8px;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .transition input {
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
    }
    .temperature-control {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .temperature-control input {
      flex: 1;
    }
    .copy {
      margin-top: 14px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .unsaved {
      color: var(--warning-color, #f6b51d);
      font-weight: 600;
    }
    @media (max-width: 540px) {
      .header {
        align-items: flex-start;
        flex-direction: column;
      }
      .header select {
        width: 100%;
      }
      .toolbar {
        align-items: flex-start;
        flex-direction: column;
      }
      .transition {
        grid-template-columns: 1fr 1fr auto;
      }
      .timeline {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  `,t([dt({attribute:!1})],St.prototype,"hass",void 0),t([lt()],St.prototype,"config",void 0),t([lt()],St.prototype,"selected",void 0),t([lt()],St.prototype,"day",void 0),t([lt()],St.prototype,"loaded",void 0),t([lt()],St.prototype,"original",void 0),t([lt()],St.prototype,"draft",void 0),t([lt()],St.prototype,"message",void 0),t([lt()],St.prototype,"saving",void 0),St=t([ot("trvzb-internal-scheduler-card")],St);let Ct=class extends rt{constructor(){super(...arguments),this.value={}}setConfig(t){this.value=t}change(t){const e=t.target.value;try{const t=e.split("\n").map(t=>t.trim()).filter(Boolean);this.value=Object.assign(Object.assign({},this.value),{type:"custom:trvzb-internal-scheduler-card",thermostats:t}),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.value},bubbles:!0,composed:!0}))}catch(t){}}render(){return j`<p>
        TRVZB climate entity IDs, one per line. The card auto-detects matching
        <code>text.*_weekly_schedule_*</code> entities; use YAML <code>schedule_entities</code> if names differ.
      </p>
      <textarea @change=${this.change}>
${(this.value.thermostats||(this.value.entity?[this.value.entity]:[])).map(t=>"string"==typeof t?t:t.entity).join("\n")}</textarea>`}};Ct.styles=o`
    :host {
      display: block;
      padding: 16px;
    }
    textarea {
      width: 100%;
      min-height: 120px;
      box-sizing: border-box;
      font: inherit;
    }
  `,t([dt({attribute:!1})],Ct.prototype,"hass",void 0),t([dt({attribute:!1})],Ct.prototype,"value",void 0),Ct=t([ot("trvzb-internal-scheduler-card-editor")],Ct),window.customCards=window.customCards||[],window.customCards.push({type:"trvzb-internal-scheduler-card",name:"TRVZB Internal Scheduler Card",description:"Edit the weekly schedule stored in Sonoff TRVZB valves.",preview:!0})}();
