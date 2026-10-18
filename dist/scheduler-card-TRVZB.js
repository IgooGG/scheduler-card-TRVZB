!function(){"use strict";function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},f="finalized";let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=m){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var $;g[f]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:g}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const y=window,b=y.trustedTypes,_=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,w="?"+A,E=`<${w}>`,S=document,C=()=>S.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,M="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,P=/>/g,O=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,j=/"/g,H=/^(?:script|style|textarea|title)$/i,z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),B=new WeakMap,L=S.createTreeWalker(S,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=U;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===U?"!--"===l[1]?o=N:void 0!==l[1]?o=P:void 0!==l[2]?(H.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=O):void 0!==l[3]&&(o=O):o===O?">"===l[0]?(o=null!=n?n:U,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?O:'"'===l[3]?j:R):o===j||o===R?o=O:o===N||o===P?o=U:(o=O,n=void 0);const c=o===O&&t[e+1].startsWith("/>")?" ":"";r+=o===U?i+E:d>=0?(s.push(a),i.slice(0,d)+x+i.slice(d)+A+c):i+A+(-2===d?(s.push(void 0),e):c)}return[V(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,d]=W(t,e);if(this.el=Z.createElement(l,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=L.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(x)||e.startsWith(A)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+x).split(A),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?Y:"@"===e[1]?G:J})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(H.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),L.nextNode(),a.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===w)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,s){var n,r,o,a;if(e===D)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const d=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,s)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);L.currentNode=n;let r=L.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new K(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new tt(r,this,t)),this._$AV.push(e),l=s[++a]}o!==(null==l?void 0:l.index)&&(r=L.nextNode(),o++)}return L.currentNode=S,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,s){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),k(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(V(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new F(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new Z(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new K(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,s,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=q(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=q(this,s[i+o],e,o),a===D&&(a=this._$AH[o]),r||(r=!k(a)||a!==this._$AH[o]),a===I?t=I:t!==I&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const X=b?b.emptyScript:"";class Y extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class G extends J{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:I)===D)return;const s=this._$AH,n=t===I&&s!==I||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==I&&(s===I||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(Z,K),(null!==($=y.litHtmlVersions)&&void 0!==$?$:y.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var it,st;class nt extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new K(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return D}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:nt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
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
     */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function dt(t){return lt({...t,state:!0})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var ht;null===(ht=window.HTMLSlotElement)||void 0===ht||ht.prototype.assignedElements;const ct=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],ut=.5,pt=new Set(["","unknown","unavailable","none","null","n/a"]),vt=/^(\d{2}):(\d{2})\/(\d{1,2}(?:\.\d+)?)$/,mt=t=>{const e=/^(\d{2}):(\d{2})$/.exec(t);return e?60*Number(e[1])+Number(e[2]):Number.NaN},ft=t=>{const e=Math.max(0,Math.min(1439,Math.round(t)));return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`};function gt(t){var e;const i=[];Array.isArray(t)&&t.length||i.push("A day needs at least a 00:00 transition."),t.length>6&&i.push("A day can contain at most 6 transitions."),"00:00"!==(null===(e=t[0])||void 0===e?void 0:e.time)&&i.push("The first transition must be at 00:00.");let s=-1;return t.forEach((t,e)=>{const n=mt(t.time);(!Number.isInteger(n)||n<0||n>=1440)&&i.push(`Transition ${e+1} has an invalid time.`),n<=s&&i.push("Transition times must be strictly increasing and unique."),s=n,(!Number.isFinite(t.temperature)||t.temperature<4||t.temperature>35)&&i.push(`Transition ${e+1} must be between 4 and 35 °C.`),Math.abs(t.temperature/ut-Math.round(t.temperature/ut))>1e-5&&i.push(`Transition ${e+1} must use 0.5 °C steps.`)}),i}function $t(t){if("string"!=typeof t||!t.trim())return{errors:["The cached schedule is empty."]};const e=[];for(const i of t.trim().split(/\s+/)){const t=vt.exec(i);if(!t)return{errors:[`Invalid schedule token: ${i}`]};const s=Number(t[1]),n=Number(t[2]);if(s>23||n>59)return{errors:[`Invalid time: ${t[1]}:${t[2]}`]};e.push({time:`${t[1]}:${t[2]}`,temperature:Number(t[3])})}const i=gt(e);return i.length?{errors:i}:{schedule:e,errors:[]}}function yt(t){const e=gt(t);if(e.length)throw new Error(e.join(" "));return t.map(({time:t,temperature:e})=>`${t}/${Number.isInteger(e)?e:e.toFixed(1)}`).join(" ")}function bt(t){return Object.fromEntries(ct.map(e=>[e,t[e].map(t=>Object.assign({},t))]))}function _t(t,e){return ct.filter(i=>yt(t[i])!==yt(e[i]))}function xt(t,e,i,s=24){const n=function(t,e,i){const s=e.replace(/^climate\./,""),n=Object.assign({},i);for(const e of ct){if(n[e])continue;const i=`_weekly_schedule_${e}`,r=`text.${s}${i}`;if(t.states[r]){n[e]=r;continue}const o=Object.keys(t.states).filter(t=>t.startsWith("text.")&&t.endsWith(i)&&t.includes(s));1===o.length&&(n[e]=o[0])}return n}(t,e,i),r=ct.filter(t=>!n[t]);if(r.length)return{status:"missing",entities:n,message:`Schedule entities were not found for ${r.join(", ")}. Configure schedule_entities explicitly.`};const o=n,a=ct.filter(e=>{var i;return pt.has(((null===(i=t.states[o[e]])||void 0===i?void 0:i.state)||"").toLowerCase())});if(a.length)return{status:"unavailable",entities:n,message:`Cached schedule values are unavailable for ${a.join(", ")}. Zigbee2MQTT cannot read these schedules on demand.`};const l={};for(const e of ct){const i=$t(t.states[o[e]].state);if(!i.schedule)return{status:"malformed",entities:n,message:`${e}: ${i.errors.join(" ")}`};l[e]=i.schedule}const d=ct.map(e=>t.states[o[e]].last_updated||t.states[o[e]].last_changed).filter(t=>Boolean(t)),h=d.sort()[0],c=!!h&&Date.now()-new Date(h).getTime()>36e5*s;return{status:"loaded",schedule:l,entities:o,cachedAt:h,stale:c}}const At={monday:"Mon",tuesday:"Tue",wednesday:"Wed",thursday:"Thu",friday:"Fri",saturday:"Sat",sunday:"Sun"},wt=t=>new Promise(e=>window.setTimeout(e,t));let Et=class extends nt{constructor(){super(...arguments),this.config={},this.selected=0,this.day="monday",this.message="",this.saving=!1,this.beforeUnload=t=>{this.dirty&&(t.preventDefault(),t.returnValue="")}}static getConfigElement(){return document.createElement("trvzb-internal-scheduler-card-editor")}static getStubConfig(){return{type:"custom:trvzb-internal-scheduler-card",thermostats:[]}}setConfig(t){var e;if(!t||!t.entity&&!(null===(e=t.thermostats)||void 0===e?void 0:e.length))throw new Error("Provide entity or thermostats.");this.config=t,this.selected=0,this.reload()}connectedCallback(){super.connectedCallback(),window.addEventListener("beforeunload",this.beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this.beforeUnload)}updated(t){var e;t.has("hass")&&(this.config.entity||(null===(e=this.config.thermostats)||void 0===e?void 0:e.length))&&!this.saving&&this.reload(!1)}get thermostats(){return(this.config.thermostats||(this.config.entity?[{entity:this.config.entity,schedule_entities:this.config.schedule_entities}]:[])).map(t=>"string"==typeof t?{entity:t}:t)}get thermostat(){return this.thermostats[this.selected]}get dirty(){return Boolean(this.original&&this.draft&&_t(this.original,this.draft).length)}get timeoutMs(){var t;return 1e3*Math.max(5,null!==(t=this.config.confirmation_timeout)&&void 0!==t?t:30)}reload(t=!0){var e;const i=this.thermostat;if(!i||!this.hass)return;const s=xt(this.hass,i.entity,i.schedule_entities,null!==(e=this.config.stale_after_hours)&&void 0!==e?e:24);this.loaded=s,"loaded"===s.status&&t&&!this.dirty&&(this.original=bt(s.schedule),this.draft=bt(s.schedule),this.message="")}selectThermostat(t){const e=Number(t.target.value);e!==this.selected&&(!this.dirty||window.confirm("Discard unsaved schedule changes?")?(this.selected=e,this.original=void 0,this.draft=void 0,this.message="",this.reload()):t.target.value=String(this.selected))}setDay(t){this.day=t}updateTransition(t,e){if(!this.draft)return;const i=this.day,s=bt(this.draft);s[i][t]=Object.assign(Object.assign({},s[i][t]),e),s[i].sort((t,e)=>mt(t.time)-mt(e.time)),this.draft=s}addTransition(){if(!this.draft||this.draft[this.day].length>=6)return;const t=this.draft[this.day],e=mt(t[t.length-1].time),i=Math.min(1439,e+Math.max(30,Math.floor((1439-e)/2)));if(i<=e)return;const s=bt(this.draft);s[this.day].push({time:ft(i),temperature:t[t.length-1].temperature}),this.draft=s}removeTransition(t){if(!this.draft||0===t)return;const e=bt(this.draft);e[this.day].splice(t,1),this.draft=e}copyTo(t){if(!this.draft)return;const e=Array.from(this.renderRoot.querySelectorAll("input[data-copy-day]:checked")).map(t=>t.dataset.copyDay);if(!e.length)return;const i=bt(this.draft);e.forEach(t=>i[t]=i[this.day].map(t=>Object.assign({},t))),this.draft=i,this.message=`Copied ${At[this.day]} to ${e.map(t=>At[t]).join(", ")}.`,t.currentTarget.blur()}cancel(){this.original&&(this.draft=bt(this.original),this.message="Edits discarded.")}pointerDown(t,e){0===e||this.saving||(this.dragIndex=e,t.currentTarget.setPointerCapture(t.pointerId))}pointerMove(t){if(void 0===this.dragIndex||!this.draft)return;const e=t.currentTarget.getBoundingClientRect(),i=5*Math.round((t.clientX-e.left)/e.width*24*60/5),s=this.draft[this.day],n=mt(s[this.dragIndex-1].time)+5,r=this.dragIndex<s.length-1?mt(s[this.dragIndex+1].time)-5:1439;this.updateTransition(this.dragIndex,{time:ft(Math.max(n,Math.min(r,i)))})}pointerUp(){this.dragIndex=void 0}async setMode(t){const e=this.thermostat;if(e){this.message="Requesting mode change…";try{await this.hass.callService("climate","set_hvac_mode",{entity_id:e.entity,hvac_mode:t}),this.message=`Mode request sent: ${t}. Auto is the only mode that follows the TRV schedule.`}catch(t){this.message=`Could not change mode: ${t instanceof Error?t.message:String(t)}`}}}async waitFor(t,e){var i;const s=Date.now()+this.timeoutMs;for(;Date.now()<s;){if((null===(i=this.hass.states[t])||void 0===i?void 0:i.state)===e)return!0;await wt(250)}return!1}async save(){var t;if(!this.original||!this.draft||!this.thermostat||"loaded"!==(null===(t=this.loaded)||void 0===t?void 0:t.status))return;const e=ct.flatMap(t=>gt(this.draft[t]).map(e=>`${At[t]}: ${e}`));if(e.length)return void(this.message=e.join(" "));if(_t(this.original,this.draft).length){this.saving=!0,this.message="Saving changed days; waiting for Home Assistant state confirmation…";try{const t=await async function(t,e,i,s,n){const r=_t(i,s),o=[];for(const i of r){const a=yt(s[i]);try{if(await t.callService("text","set_value",{entity_id:e[i],value:a}),!await n(e[i],a))return{confirmed:o,pending:r.filter(t=>!o.includes(t)),error:`${i} was not confirmed by an observed schedule state.`};o.push(i)}catch(t){return{confirmed:o,pending:r.filter(t=>!o.includes(t)),error:t instanceof Error?t.message:String(t)}}}return{confirmed:o,pending:[]}}(this.hass,this.loaded.entities,this.original,this.draft,(t,e)=>this.waitFor(t,e));t.confirmed.forEach(t=>{this.original[t]=this.draft[t].map(t=>Object.assign({},t))}),this.message=t.error?`${t.confirmed.length?`Confirmed ${t.confirmed.map(t=>At[t]).join(", ")}. `:""}Save incomplete: ${t.error} Existing unsaved days were kept for retry.`:`Confirmed on device state: ${t.confirmed.map(t=>At[t]).join(", ")}.`}finally{this.saving=!1,this.original=this.original?bt(this.original):void 0}}else this.message="No changes to save."}render(){var t,e,i;const s=this.thermostat,n=s&&(null===(t=this.hass)||void 0===t?void 0:t.states[s.entity]),r=(null===(e=this.draft)||void 0===e?void 0:e[this.day])||[],o=this.draft?gt(r):[];return z`<ha-card
      ><div class="header">
        <h1>${this.config.title||"TRVZB internal schedule"}</h1>
        ${this.thermostats.length>1?z`<select @change=${this.selectThermostat} .value=${String(this.selected)} aria-label="Thermostat">
                ${this.thermostats.map((t,e)=>{var i,s;return z`<option value=${e}>${t.name||(null===(s=null===(i=this.hass)||void 0===i?void 0:i.states[t.entity])||void 0===s?void 0:s.attributes.friendly_name)||t.entity}</option>`})}
              </select>`:I}
      </div>
      <div class="body">
        ${n?I:z`<div class="notice error">Configured climate entity is unavailable: ${(null==s?void 0:s.entity)||"none"}.</div>`}
        ${this.loaded&&"loaded"!==this.loaded.status?z`<div class="notice error">${this.loaded.message}</div>`:I}
        ${"loaded"===(null===(i=this.loaded)||void 0===i?void 0:i.status)?z`<div class="notice">Schedule values are cached Home Assistant/Zigbee2MQTT state${this.loaded.cachedAt?` (oldest cached ${new Date(this.loaded.cachedAt).toLocaleString()})`:""}; TRVZB does not support on-demand schedule reads.${this.loaded.stale?" This cache is marked stale.":""}</div>`:I}
        <div class="toolbar">
          <div class="mode">
            <span class="status">Mode:</span
            >${["off","auto","heat"].map(t=>z`<button ?disabled=${!n||this.saving} class=${(null==n?void 0:n.state)===t?"active":""} @click=${()=>this.setMode(t)}>${t}</button>`)}
          </div>
          <span class="status">Auto follows the locally stored TRV schedule. Heat is manual.</span>
        </div>
        ${this.draft?z`<div class="day-tabs">
                  ${ct.map(t=>z`<button class=${t===this.day?"active":""} @click=${()=>this.setDay(t)}>${At[t]}</button>`)}
                </div>
                <div
                  class="timeline"
                  @pointermove=${this.pointerMove}
                  @pointerup=${this.pointerUp}
                  @pointercancel=${this.pointerUp}
                >
                  ${r.map((t,e)=>z`<div class="segment" style=${`left:${mt(t.time)/14.4}%;width:${((e<r.length-1?mt(r[e+1].time):1440)-mt(t.time))/14.4}%`}><span class="temperature">${t.temperature}°</span></div>`)}
                  ${r.map((t,e)=>z`<button class="marker" style=${`left:${mt(t.time)/14.4}%`} @pointerdown=${t=>this.pointerDown(t,e)} aria-label=${`Move ${t.time}`}><span>${t.time}</span></button>`)}
                  <div class="axis">
                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
                  </div>
                </div>
                <div class="transitions">
                  ${r.map((t,e)=>z`<div class="transition"><input type="time" step="60" .value=${t.time} ?disabled=${0===e||this.saving} @change=${t=>this.updateTransition(e,{time:t.target.value})} /><input type="number" min=${4} max=${35} step=${ut} .value=${String(t.temperature)} ?disabled=${this.saving} aria-label="Temperature" @change=${t=>this.updateTransition(e,{temperature:Number(t.target.value)})} /><button ?disabled=${0===e||this.saving} @click=${()=>this.removeTransition(e)} aria-label="Remove transition">−</button></div>`)}
                </div>
                <div class="copy">
                  <button
                    ?disabled=${r.length>=6||this.saving}
                    @click=${this.addTransition}
                  >
                    + Add transition</button
                  ><span class="status">Copy ${At[this.day]} to:</span
                  >${ct.filter(t=>t!==this.day).map(t=>z`<label><input type="checkbox" data-copy-day=${t} ?disabled=${this.saving} /> ${At[t]}</label>`)}<button
                    ?disabled=${this.saving}
                    @click=${this.copyTo}
                  >
                    Copy
                  </button>
                </div>
                ${o.length?z`<div class="notice error">${o.join(" ")}</div>`:I}
                <div class="actions">
                  <button
                    class="primary"
                    ?disabled=${!this.dirty||this.saving||o.length>0}
                    @click=${this.save}
                  >
                    ${this.saving?"Saving…":"Save"}</button
                  ><button ?disabled=${!this.dirty||this.saving} @click=${this.cancel}>Cancel</button
                  >${this.dirty?z`<span class="unsaved">Unsaved changes</span>`:z`<span class="status">No pending changes</span>`}
                </div>`:I}
        ${this.message?z`<div class="notice ${this.message.includes("incomplete")||this.message.includes("Could not")?"error":""}">${this.message}</div>`:I}
      </div></ha-card
    >`}};Et.styles=o`
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
  `,t([lt({attribute:!1})],Et.prototype,"hass",void 0),t([dt()],Et.prototype,"config",void 0),t([dt()],Et.prototype,"selected",void 0),t([dt()],Et.prototype,"day",void 0),t([dt()],Et.prototype,"loaded",void 0),t([dt()],Et.prototype,"original",void 0),t([dt()],Et.prototype,"draft",void 0),t([dt()],Et.prototype,"message",void 0),t([dt()],Et.prototype,"saving",void 0),Et=t([ot("trvzb-internal-scheduler-card")],Et);let St=class extends nt{constructor(){super(...arguments),this.value={}}setConfig(t){this.value=t}change(t){const e=t.target.value;try{const t=e.split("\n").map(t=>t.trim()).filter(Boolean);this.value=Object.assign(Object.assign({},this.value),{type:"custom:trvzb-internal-scheduler-card",thermostats:t}),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.value},bubbles:!0,composed:!0}))}catch(t){}}render(){return z`<p>
        TRVZB climate entity IDs, one per line. The card auto-detects matching
        <code>text.*_weekly_schedule_*</code> entities; use YAML <code>schedule_entities</code> if names differ.
      </p>
      <textarea @change=${this.change}>
${(this.value.thermostats||(this.value.entity?[this.value.entity]:[])).map(t=>"string"==typeof t?t:t.entity).join("\n")}</textarea>`}};St.styles=o`
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
  `,t([lt({attribute:!1})],St.prototype,"hass",void 0),t([lt({attribute:!1})],St.prototype,"value",void 0),St=t([ot("trvzb-internal-scheduler-card-editor")],St),window.customCards=window.customCards||[],window.customCards.push({type:"trvzb-internal-scheduler-card",name:"TRVZB Internal Scheduler Card",description:"Edit the weekly schedule stored in Sonoff TRVZB valves.",preview:!0})}();
