(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[6187],{"./.yarn/__virtual__/@emotion-css-virtual-15ef12e38d/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js":(e,t,n)=>{"use strict";n.d(t,{iv:()=>h,cx:()=>p,F4:()=>u});var r=n("./.yarn/cache/@emotion-cache-npm-11.7.1-82b45442ee-cf7aa8fe3b.zip/node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js"),s=n("./.yarn/cache/@emotion-serialize-npm-1.0.2-a692afdb82-ff84fbe09e.zip/node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js"),a=n("./.yarn/cache/@emotion-utils-npm-1.0.0-7f9809289c-3ce8048441.zip/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");function i(e,t){if(void 0===e.inserted[t.name])return e.insert("",t,e.sheet,!0)}function o(e,t,n){var r=[],s=(0,a.f)(e,r,n);return r.length<2?n:s+t(r)}var l=function e(t){for(var n="",r=0;r<t.length;r++){var s=t[r];if(null!=s){var a=void 0;switch(typeof s){case"boolean":break;case"object":if(Array.isArray(s))a=e(s);else for(var i in a="",s)s[i]&&i&&(a&&(a+=" "),a+=i);break;default:a=s}a&&(n&&(n+=" "),n+=a)}}return n};const c=function(e){var t=(0,r.Z)(e);t.sheet.speedy=function(e){this.isSpeedy=e},t.compat=!0;var n=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=(0,s.O)(n,t.registered,void 0);return(0,a.M)(t,i,!1),t.key+"-"+i.name};return{css:n,cx:function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return o(t.registered,n,l(r))},injectGlobal:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=(0,s.O)(n,t.registered);i(t,a)},keyframes:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=(0,s.O)(n,t.registered),o="animation-"+a.name;return i(t,{name:a.name,styles:"@keyframes "+o+"{"+a.styles+"}"}),o},hydrate:function(e){e.forEach((function(e){t.inserted[e]=!0}))},flush:function(){t.registered={},t.inserted={},t.sheet.flush()},sheet:t.sheet,cache:t,getRegisteredStyles:a.f.bind(null,t.registered),merge:o.bind(null,t.registered,n)}};var d=c({key:"css"}),p=(d.flush,d.hydrate,d.cx),u=(d.merge,d.getRegisteredStyles,d.injectGlobal,d.keyframes),h=d.css;d.sheet,d.cache},"./packages/jaeger-ui-components/src/index.ts":(e,t,n)=>{"use strict";n.d(t,{kt:()=>Nr,T2:()=>Dr,Ox:()=>fn,h2:()=>l,rZ:()=>is,R1:()=>as});var r=n("./.yarn/__virtual__/@emotion-css-virtual-15ef12e38d/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a=n("./packages/grafana-ui/src/index.ts"),i=n("./.yarn/cache/tinycolor2-npm-1.4.2-462ba30c26-57ed262e08.zip/node_modules/tinycolor2/tinycolor.js"),o=n.n(i);function l(e,t,n){if(e.isLight)return t;{if(n){const e=o()(t);return o().mostReadable(n,[e.clone().lighten(25),e.clone().lighten(10),e,e.clone().darken(10),e.clone().darken(25)],{includeFallbackColors:!1}).toHex8String()}const e=o()(t).toHsl();e.l=1-e.l;const r=o()(e);return r.isLight()?r.darken(5).toHex8String():r.lighten(5).toHex8String()}}var c=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/index.js"),d=n.n(c);const p={scrollPageDown:{binding:"s",label:"Scroll down"},scrollPageUp:{binding:"w",label:"Scroll up"},scrollToNextVisibleSpan:{binding:"f",label:"Scroll to the next visible span"},scrollToPrevVisibleSpan:{binding:"b",label:"Scroll to the previous visible span"},panLeft:{binding:["a","left"],label:"Pan left"},panLeftFast:{binding:["shift+a","shift+left"],label:"Pan left — Large"},panRight:{binding:["d","right"],label:"Pan right"},panRightFast:{binding:["shift+d","shift+right"],label:"Pan right — Large"},zoomIn:{binding:"up",label:"Zoom in"},zoomInFast:{binding:"shift+up",label:"Zoom in — Large"},zoomOut:{binding:"down",label:"Zoom out"},zoomOutFast:{binding:"shift+down",label:"Zoom out — Large"},collapseAll:{binding:"]",label:"Collapse All"},expandAll:{binding:"[",label:"Expand All"},collapseOne:{binding:"p",label:"Collapse One Level"},expandOne:{binding:"o",label:"Expand One Level"},searchSpans:{binding:"ctrl+b",label:"Search Spans"},clearSearch:{binding:"escape",label:"Clear Search"}};let u;function h(){if(u)return u;const e=new(d())(document.body);return u=e,e}const m=s.createContext(void 0);m.displayName="ExternalLinkContext";const g=m;var f=n("./.yarn/cache/classnames-npm-2.3.1-f2ae0a8d3c-14db8889d5.zip/node_modules/classnames/index.js"),b=n.n(f),v=n("./packages/jaeger-ui-components/src/uberUtilityStyles.ts"),y=n("./.yarn/cache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),x=n("./.yarn/cache/moment-timezone-npm-0.5.34-e4fe2d01f6-12a1d3d52e.zip/node_modules/moment-timezone/index.js"),w=n.n(x);const _=1e3,k=1e6,T=6e7,j=36e8,I=Math.log10(_),S=[{unit:"d",microseconds:864e8,ofPrevious:24},{unit:"h",microseconds:j,ofPrevious:60},{unit:"m",microseconds:T,ofPrevious:60},{unit:"s",microseconds:k,ofPrevious:1e3},{unit:"ms",microseconds:_,ofPrevious:1e3},{unit:"μs",microseconds:1,ofPrevious:1e3}];const D=(e,t,n)=>function(e,t){const n=t+(Math.floor(Math.log10(Math.abs(e)))+1);return n<=0?Math.trunc(e):Number(e.toPrecision(n))}(e/n,t)*n;function C(e){const[t,n]=(0,y.dropWhile)(S,((t,n)=>{let{microseconds:r}=t;return n<S.length-1&&r>e}));if(1e3===t.ofPrevious)return`${(0,y.round)(e/t.microseconds,2)}${t.unit}`;const r=`${Math.floor(e/t.microseconds)}${t.unit}`,s=Math.round(e/n.microseconds%t.ofPrevious),a=`${s}${n.unit}`;return 0===s?r:`${r} ${a}`}function N(e,t,n){return!(!Array.isArray(n.tags)||!n.tags.length)&&n.tags.some((n=>n.key===e&&n.value===t))}const L=N.bind(null,"span.kind","client"),E=N.bind(null,"span.kind","server"),M=N.bind(null,"error",!0),R=N.bind(null,"error","true"),O=e=>M(e)||R(e);var z=n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const P=e=>({Ticks:r.iv`
      label: Ticks;
      pointer-events: none;
    `,TicksTick:r.iv`
      label: TicksTick;
      position: absolute;
      height: 100%;
      width: 1px;
      background: ${l(e,"#d8d8d8")};
      &:last-child {
        width: 0;
      }
    `,TicksTickLabel:r.iv`
      label: TicksTickLabel;
      left: 0.25rem;
      position: absolute;
    `,TicksTickLabelEndAnchor:r.iv`
      label: TicksTickLabelEndAnchor;
      left: initial;
      right: 0.25rem;
    `});function $(e){const{endTime:t,numTicks:n,showLabels:r,startTime:s}=e;let i;if(r){i=[];const e=(t||0)-(s||0);for(let t=0;t<n;t++){const r=(s||0)+t/(n-1)*e;i.push(C(r))}}const o=(0,a.useStyles2)(P),l=[];for(let e=0;e<n;e++){const t=e/(n-1);l.push((0,z.jsx)("div",{className:o.TicksTick,style:{left:100*t+"%"},children:i&&(0,z.jsx)("span",{className:b()(o.TicksTickLabel,{[o.TicksTickLabelEndAnchor]:t>=1}),children:i[e]})},t))}return(0,z.jsx)("div",{className:o.Ticks,children:l})}$.defaultProps={endTime:null,showLabels:null,startTime:null};const H=["children","className"],V=["children","className","width","style"];function F(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}const A=()=>({flexRow:r.iv`
      display: flex;
      flex: 0 1 auto;
      flex-direction: row;
    `});function B(e){const{children:t,className:n=""}=e,r=F(e,H),s=(0,a.useStyles2)(A);return(0,z.jsx)("div",Object.assign({className:b()(s.flexRow,n)},r,{children:t}))}function W(e){const{children:t,className:n="",width:r,style:s}=e,a=F(e,V),i=100*r+"%",o=Object.assign({},s,{flexBasis:i,maxWidth:i});return(0,z.jsx)("div",Object.assign({className:b()(v.WW,n),style:o},a,{children:t}))}B.defaultProps={className:""},W.defaultProps={className:"",style:{}},B.Cell=W;const G=()=>({TimelineCollapser:r.iv`
      align-items: center;
      display: flex;
      flex: none;
      justify-content: center;
      margin-right: 0.5rem;
    `});function K(e){const{onExpandAll:t,onExpandOne:n,onCollapseAll:r,onCollapseOne:s}=e,i=(0,a.useStyles2)(G);return(0,z.jsxs)("div",{className:i.TimelineCollapser,"data-test-id":"TimelineCollapser",children:[(0,z.jsx)(a.IconButton,{tooltip:"Expand +1",size:"xl",tooltipPlacement:"top",name:"angle-down",onClick:n}),(0,z.jsx)(a.IconButton,{tooltip:"Collapse +1",size:"xl",tooltipPlacement:"top",name:"angle-right",onClick:s}),(0,z.jsx)(a.IconButton,{tooltip:"Expand All",size:"xl",tooltipPlacement:"top",name:"angle-double-down",onClick:t}),(0,z.jsx)(a.IconButton,{tooltip:"Collapse All",size:"xl",tooltipPlacement:"top",name:"angle-double-right",onClick:r})]})}var U;!function(e){e.DragEnd="DragEnd",e.DragMove="DragMove",e.DragStart="DragStart",e.MouseEnter="MouseEnter",e.MouseLeave="MouseLeave",e.MouseMove="MouseMove"}(U||(U={}));const q=U,Z=["getBounds","tag","resetBoundsOnResize"];function X(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class Y{constructor(e){let{getBounds:t,tag:n,resetBoundsOnResize:r=!0}=e,s=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,Z);X(this,"_bounds",void 0),X(this,"_isDragging",void 0),X(this,"_onMouseEnter",void 0),X(this,"_onMouseLeave",void 0),X(this,"_onMouseMove",void 0),X(this,"_onDragStart",void 0),X(this,"_onDragMove",void 0),X(this,"_onDragEnd",void 0),X(this,"_resetBoundsOnResize",void 0),X(this,"getBounds",void 0),X(this,"tag",void 0),X(this,"handleMouseEnter",void 0),X(this,"handleMouseMove",void 0),X(this,"handleMouseLeave",void 0),X(this,"handleMouseDown",void 0),X(this,"resetBounds",(()=>{this._bounds=void 0})),X(this,"_handleMinorMouseEvent",(e=>{const{button:t,clientX:n,type:r}=e;if(this._isDragging||0!==t)return;let s,a=null;if("mouseenter"===r)a=q.MouseEnter,s=this._onMouseEnter;else if("mouseleave"===r)a=q.MouseLeave,s=this._onMouseLeave;else{if("mousemove"!==r)throw new Error(`invalid event type: ${r}`);a=q.MouseMove,s=this._onMouseMove}if(!s)return;const{value:i,x:o}=this._getPosition(n);s({event:e,type:a,value:i,x:o,manager:this,tag:this.tag})})),X(this,"_handleDragEvent",(e=>{const{button:t,clientX:n,type:r}=e;let s,a=null;if("mousedown"===r){if(this._isDragging||0!==t)return;window.addEventListener("mousemove",this._handleDragEvent),window.addEventListener("mouseup",this._handleDragEvent);const e=(0,y.get)(document,"body.style");e&&(e.userSelect="none"),this._isDragging=!0,a=q.DragStart,s=this._onDragStart}else if("mousemove"===r){if(!this._isDragging)return;a=q.DragMove,s=this._onDragMove}else{if("mouseup"!==r)throw new Error(`invalid event type: ${r}`);if(!this._isDragging)return;this._stopDragging(),a=q.DragEnd,s=this._onDragEnd}if(!s)return;const{value:i,x:o}=this._getPosition(n);s({event:e,type:a,value:i,x:o,manager:this,tag:this.tag})})),this.handleMouseDown=this._handleDragEvent,this.handleMouseEnter=this._handleMinorMouseEvent,this.handleMouseMove=this._handleMinorMouseEvent,this.handleMouseLeave=this._handleMinorMouseEvent,this.getBounds=t,this.tag=n,this._isDragging=!1,this._bounds=void 0,this._resetBoundsOnResize=Boolean(r),this._resetBoundsOnResize&&window.addEventListener("resize",this.resetBounds),this._onMouseEnter=s.onMouseEnter,this._onMouseLeave=s.onMouseLeave,this._onMouseMove=s.onMouseMove,this._onDragStart=s.onDragStart,this._onDragMove=s.onDragMove,this._onDragEnd=s.onDragEnd}_getBounds(){return this._bounds||(this._bounds=this.getBounds(this.tag)),this._bounds}_getPosition(e){const{clientXLeft:t,maxValue:n,minValue:r,width:s}=this._getBounds();let a=e-t,i=a/s;return null!=r&&i<r?(i=r,a=r*s):null!=n&&i>n&&(i=n,a=n*s),{value:i,x:a}}_stopDragging(){window.removeEventListener("mousemove",this._handleDragEvent),window.removeEventListener("mouseup",this._handleDragEvent);const e=(0,y.get)(document,"body.style");e&&(e.userSelect=null),this._isDragging=!1}isDragging(){return this._isDragging}dispose(){this._isDragging&&this._stopDragging(),this._resetBoundsOnResize&&window.removeEventListener("resize",this.resetBounds),this._bounds=void 0,this._onMouseEnter=void 0,this._onMouseLeave=void 0,this._onMouseMove=void 0,this._onDragStart=void 0,this._onDragMove=void 0,this._onDragEnd=void 0}}function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const Q=(0,a.stylesFactory)((()=>({TimelineColumnResizer:r.iv`
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    `,wrapper:r.iv`
      bottom: 0;
      position: absolute;
      top: 0;
    `,dragger:r.iv`
      border-left: 2px solid transparent;
      cursor: col-resize;
      height: 5000px;
      margin-left: -1px;
      position: absolute;
      top: 0;
      width: 1px;
      z-index: 10;
      &:hover {
        border-left: 2px solid rgba(0, 0, 0, 0.3);
      }
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -8px;
        right: 0;
        content: ' ';
      }
    `,draggerDragging:r.iv`
      background: rgba(136, 0, 136, 0.05);
      width: unset;
      &::before {
        left: -2000px;
        right: -2000px;
      }
    `,draggerDraggingLeft:r.iv`
      border-left: 2px solid #808;
      border-right: 1px solid #999;
    `,draggerDraggingRight:r.iv`
      border-left: 1px solid #999;
      border-right: 2px solid #808;
    `,gripIcon:r.iv`
      position: absolute;
      top: 0;
      bottom: 0;
      &::before,
      &::after {
        border-right: 1px solid #ccc;
        content: ' ';
        height: 9px;
        position: absolute;
        right: 9px;
        top: 25px;
      }
      &::after {
        right: 5px;
      }
    `,gripIconDragging:r.iv`
      &::before,
      &::after {
        border-right: 1px solid rgba(136, 0, 136, 0.5);
      }
    `})));class ee extends s.PureComponent{constructor(e){super(e),J(this,"state",void 0),J(this,"_dragManager",void 0),J(this,"_rootElm",void 0),J(this,"_setRootElm",(e=>{this._rootElm=e})),J(this,"_getDraggingBounds",(()=>{if(!this._rootElm)throw new Error("invalid state");const{left:e,width:t}=this._rootElm.getBoundingClientRect(),{min:n,max:r}=this.props;return{clientXLeft:e,width:t,maxValue:r,minValue:n}})),J(this,"_handleDragUpdate",(e=>{let{value:t}=e;this.setState({dragPosition:t})})),J(this,"_handleDragEnd",(e=>{let{manager:t,value:n}=e;t.resetBounds(),this.setState({dragPosition:null}),this.props.onChange(n)})),this._dragManager=new Y({getBounds:this._getDraggingBounds,onDragEnd:this._handleDragEnd,onDragMove:this._handleDragUpdate,onDragStart:this._handleDragUpdate}),this._rootElm=void 0,this.state={dragPosition:null}}componentWillUnmount(){this._dragManager.dispose()}render(){let e,t;const{position:n,columnResizeHandleHeight:r}=this.props,{dragPosition:s}=this.state;e=100*n+"%";const a={left:e};let i=!1,o=!1;const l=Q();if(this._dragManager.isDragging()&&this._rootElm&&null!=s){i=s<n,o=s>n,e=100*s+"%";t={left:100*Math.min(n,s)+"%",right:`calc(${100*(1-Math.max(n,s))}% - 1px)`}}else t=a;t.height=r;const c=i||o;return(0,z.jsxs)("div",{className:l.TimelineColumnResizer,ref:this._setRootElm,"data-test-id":"TimelineColumnResizer",children:[(0,z.jsx)("div",{className:b()(l.gripIcon,c&&l.gripIconDragging),style:a,"data-test-id":"TimelineColumnResizer--gripIcon"}),(0,z.jsx)("div",{"aria-hidden":!0,className:b()(l.dragger,c&&l.draggerDragging,o&&l.draggerDraggingRight,i&&l.draggerDraggingLeft),onMouseDown:this._dragManager.handleMouseDown,style:t,"data-test-id":"TimelineColumnResizer--dragger"})]})}}function te(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const ne=(0,a.stylesFactory)((()=>({TimelineViewingLayer:r.iv`
      label: TimelineViewingLayer;
      bottom: 0;
      cursor: vertical-text;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    `,TimelineViewingLayerCursorGuide:r.iv`
      label: TimelineViewingLayerCursorGuide;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 1px;
      background-color: red;
    `,TimelineViewingLayerDragged:r.iv`
      label: TimelineViewingLayerDragged;
      position: absolute;
      top: 0;
      bottom: 0;
    `,TimelineViewingLayerDraggedDraggingLeft:r.iv`
      label: TimelineViewingLayerDraggedDraggingLeft;
      border-left: 1px solid;
    `,TimelineViewingLayerDraggedDraggingRight:r.iv`
      label: TimelineViewingLayerDraggedDraggingRight;
      border-right: 1px solid;
    `,TimelineViewingLayerDraggedShiftDrag:r.iv`
      label: TimelineViewingLayerDraggedShiftDrag;
      background-color: rgba(68, 68, 255, 0.2);
      border-color: #44f;
    `,TimelineViewingLayerDraggedReframeDrag:r.iv`
      label: TimelineViewingLayerDraggedReframeDrag;
      background-color: rgba(255, 68, 68, 0.2);
      border-color: #f44;
    `,TimelineViewingLayerFullOverlay:r.iv`
      label: TimelineViewingLayerFullOverlay;
      bottom: 0;
      cursor: col-resize;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      user-select: none;
    `})));function re(e,t,n){return e+n*(t-e)}function se(e,t,n){return(n-e)/(t-e)}function ae(e,t,n,s,a){const i=function(e,t){let[n,r]=e<t?[e,t]:[t,e];return n>=1||r<=0?{isOutOfView:!0}:(n<0&&(n=0),r>1&&(r=1),{isDraggingLeft:e>t,left:100*n+"%",width:100*(r-n)+"%"})}(se(e,t,n),se(e,t,s));if(function(e){return Reflect.has(e,"isOutOfView")}(i))return null;const{isDraggingLeft:o,left:l,width:c}=i,d=ne(),p=(0,r.cx)({[d.TimelineViewingLayerDraggedDraggingRight]:!o,[d.TimelineViewingLayerDraggedReframeDrag]:!a,[d.TimelineViewingLayerDraggedShiftDrag]:a});return(0,z.jsx)("div",{className:(0,r.cx)(d.TimelineViewingLayerDragged,d.TimelineViewingLayerDraggedDraggingLeft,p),style:{left:l,width:c},"data-test-id":"Dragged"})}class ie extends s.PureComponent{constructor(e){super(e),te(this,"_draggerReframe",void 0),te(this,"_root",void 0),te(this,"_setRoot",(e=>{this._root=e})),te(this,"_getDraggingBounds",(()=>{if(!this._root)throw new Error("invalid state");const{left:e,width:t}=this._root.getBoundingClientRect();return{clientXLeft:e,width:t}})),te(this,"_handleReframeMouseMove",(e=>{let{value:t}=e;const[n,r]=this.props.viewRangeTime.current,s=re(n,r,t);this.props.updateNextViewRangeTime({cursor:s})})),te(this,"_handleReframeMouseLeave",(()=>{this.props.updateNextViewRangeTime({cursor:void 0})})),te(this,"_handleReframeDragUpdate",(e=>{let{value:t}=e;const{current:n,reframe:r}=this.props.viewRangeTime,[s,a]=n,i=re(s,a,t),o={reframe:{anchor:r?r.anchor:i,shift:i}};this.props.updateNextViewRangeTime(o)})),te(this,"_handleReframeDragEnd",(e=>{let{manager:t,value:n}=e;const{current:r,reframe:s}=this.props.viewRangeTime,[a,i]=r,o=re(a,i,n),l=s?s.anchor:o,[c,d]=o<l?[o,l]:[l,o];t.resetBounds(),this.props.updateViewRangeTime(c,d,"timeline-header")})),this._draggerReframe=new Y({getBounds:this._getDraggingBounds,onDragEnd:this._handleReframeDragEnd,onDragMove:this._handleReframeDragUpdate,onDragStart:this._handleReframeDragUpdate,onMouseLeave:this._handleReframeMouseLeave,onMouseMove:this._handleReframeMouseMove}),this._root=void 0}UNSAFE_componentWillReceiveProps(e){const{boundsInvalidator:t}=this.props;t!==e.boundsInvalidator&&this._draggerReframe.resetBounds()}componentWillUnmount(){this._draggerReframe.dispose()}render(){const{viewRangeTime:e}=this.props,{current:t,cursor:n,reframe:r,shiftEnd:s,shiftStart:a}=e,[i,o]=t;let l;!(null!=r||null!=s||null!=a)&&null!=n&&n>=i&&n<=o&&(l=100*se(i,o,n)+"%");const c=ne();return(0,z.jsxs)("div",{"aria-hidden":!0,className:c.TimelineViewingLayer,ref:this._setRoot,onMouseDown:this._draggerReframe.handleMouseDown,onMouseLeave:this._draggerReframe.handleMouseLeave,onMouseMove:this._draggerReframe.handleMouseMove,"data-test-id":"TimelineViewingLayer",children:[null!=l&&(0,z.jsx)("div",{className:c.TimelineViewingLayerCursorGuide,style:{left:l},"data-test-id":"TimelineViewingLayer--cursorGuide"}),null!=r&&ae(i,o,r.anchor,r.shift,!1),null!=s&&ae(i,o,o,s,!0),null!=a&&ae(i,o,i,a,!0)]})}}const oe=e=>({TimelineHeaderRow:r.iv`
      label: TimelineHeaderRow;
      background: ${l(e,"#ececec")};
      border-bottom: 1px solid ${l(e,"#ccc")};
      height: 38px;
      line-height: 38px;
      width: 100%;
      z-index: 4;
      position: relative;
    `,TimelineHeaderRowTitle:r.iv`
      label: TimelineHeaderRowTitle;
      flex: 1;
      overflow: hidden;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,TimelineHeaderWrapper:r.iv`
      label: TimelineHeaderWrapper;
      align-items: center;
    `});function le(e){const{duration:t,nameColumnWidth:n,numTicks:r,onCollapseAll:s,onCollapseOne:i,onColummWidthChange:o,onExpandAll:l,onExpandOne:c,updateViewRangeTime:d,updateNextViewRangeTime:p,viewRangeTime:u,columnResizeHandleHeight:h}=e,[m,g]=u.current,f=(0,a.useStyles2)(oe);return(0,z.jsxs)(B,{className:f.TimelineHeaderRow,"data-test-id":"TimelineHeaderRow",children:[(0,z.jsxs)(B.Cell,{className:b()(v.oD,v.H3,f.TimelineHeaderWrapper),width:n,children:[(0,z.jsx)("h4",{className:f.TimelineHeaderRowTitle,children:"Service & Operation"}),(0,z.jsx)(K,{onCollapseAll:s,onExpandAll:l,onCollapseOne:i,onExpandOne:c})]}),(0,z.jsxs)(B.Cell,{width:1-n,children:[(0,z.jsx)(ie,{boundsInvalidator:n,updateNextViewRangeTime:p,updateViewRangeTime:d,viewRangeTime:u}),(0,z.jsx)($,{numTicks:r,startTime:m*t,endTime:g*t,showLabels:!0})]}),(0,z.jsx)(ee,{columnResizeHandleHeight:h,position:n,onChange:o,min:.2,max:.85})]})}var ce=n("./.yarn/cache/memoize-one-npm-6.0.0-8b2a2cd020-f185ea69f7.zip/node_modules/memoize-one/dist/memoize-one.esm.js");function de(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function pe(e){if(7!==e.length)return[0,0,0];const t=e.slice(1,3),n=e.slice(3,5),r=e.slice(5);return[parseInt(t,16),parseInt(n,16),parseInt(r,16)]}class ue{constructor(e){de(this,"colorsHex",void 0),de(this,"colorsRgb",void 0),de(this,"cache",void 0),de(this,"currentIdx",void 0),this.colorsHex=e,this.colorsRgb=e.map(pe),this.cache=new Map,this.currentIdx=0}_getColorIndex(e){let t=this.cache.get(e);return null==t&&(t=this.currentIdx,this.cache.set(e,this.currentIdx),this.currentIdx=++this.currentIdx%this.colorsHex.length),t}getColorByKey(e){const t=this._getColorIndex(e);return this.colorsHex[t]}getRgbColorByKey(e){const t=this._getColorIndex(e);return this.colorsRgb[t]}clear(){this.cache.clear(),this.currentIdx=0}}const he=(0,ce.Z)((e=>new ue(e)));function me(e,t){return he(a.colors).getColorByKey(e)}function ge(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class fe{constructor(e){ge(this,"bufferLen",void 0),ge(this,"dataLen",void 0),ge(this,"heights",void 0),ge(this,"lastI",void 0),ge(this,"ys",void 0),this.ys=[],this.heights=[],this.bufferLen=e,this.dataLen=-1,this.lastI=-1}profileData(e){e!==this.dataLen&&(this.dataLen=e,this.ys.length=e,this.heights.length=e,this.lastI>=e&&(this.lastI=e-1))}calcHeights(e,t,n){null!=n&&(this.lastI=n);let r=e+this.bufferLen;if(r<=this.lastI)return;r>=this.heights.length&&(r=this.heights.length-1);let s=this.lastI;for(-1===this.lastI&&(s=0,this.ys[0]=0);s<=r;){const e=this.heights[s]=t(s);this.ys[s+1]=this.ys[s]+e,s++}this.lastI=r}calcYs(e,t){for(;(null==this.ys[this.lastI]||e>this.ys[this.lastI])&&this.lastI<this.dataLen-1;)this.calcHeights(this.lastI,t)}confirmHeight(e,t){let n=e;if(n>this.lastI)return void this.calcHeights(n,t);const r=t(n);if(r===this.heights[n])return;const s=r-this.heights[n];for(this.heights[n]=r;++n<=this.lastI;)this.ys[n]+=s;null!=this.ys[this.lastI+1]&&(this.ys[this.lastI+1]+=s)}findFloorIndex(e,t){this.calcYs(e,t);let n,r=0,s=this.lastI;if(this.ys.length<2||e<this.ys[1])return 0;if(e>this.ys[s])return s;for(;r<s;)if(n=r+.5*(s-r)|0,e>this.ys[n]){if(e<=this.ys[n+1])return n;r=n}else{if(!(e<this.ys[n]))return n;if(e>=this.ys[n-1])return n-1;s=n}throw new Error(`unable to find floor index for y=${e}`)}getRowPosition(e,t){return this.confirmHeight(e,t),{height:this.heights[e],y:this.ys[e]}}getEstimatedHeight(){const e=this.ys[this.lastI]+this.heights[this.lastI];return this.lastI>=this.dataLen-1?0|e:e/(this.lastI+1)*this.heights.length|0}}function be(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const ve=100;class ye extends s.Component{constructor(e){super(e),be(this,"_yPositions",void 0),be(this,"_knownHeights",void 0),be(this,"_startIndexDrawn",void 0),be(this,"_endIndexDrawn",void 0),be(this,"_startIndex",void 0),be(this,"_endIndex",void 0),be(this,"_viewHeight",void 0),be(this,"_scrollTop",void 0),be(this,"_isScrolledOrResized",void 0),be(this,"_htmlTopOffset",void 0),be(this,"_windowScrollListenerAdded",void 0),be(this,"_htmlElm",void 0),be(this,"_wrapperElm",void 0),be(this,"_itemHolderElm",void 0),be(this,"getViewHeight",(()=>this._viewHeight)),be(this,"getBottomVisibleIndex",(()=>{const e=this._scrollTop+this._viewHeight;return this._yPositions.findFloorIndex(e,this._getHeight)})),be(this,"getTopVisibleIndex",(()=>this._yPositions.findFloorIndex(this._scrollTop,this._getHeight))),be(this,"getRowPosition",(e=>this._yPositions.getRowPosition(e,this._getHeight))),be(this,"scrollToIndex",(e=>{var t,n;const{scrollElement:r}=this.props,s=(null==r?void 0:r.getBoundingClientRect().top)||0,a=((null==r?void 0:r.scrollTop)||0)+((null===(t=this._itemHolderElm)||void 0===t?void 0:t.getBoundingClientRect().top)||0)-s,i=this.getRowPosition(e).y;null===(n=this.props.scrollElement)||void 0===n||n.scrollTo({top:i+a-80})})),be(this,"_onScroll",(()=>{this._isScrolledOrResized||(this._isScrolledOrResized=!0,window.requestAnimationFrame(this._positionList))})),be(this,"_positionList",(()=>{if(this._isScrolledOrResized=!1,!this._wrapperElm)return;this._calcViewIndexes();const e=this.props.viewBufferMin>this._startIndex?0:this._startIndex-this.props.viewBufferMin,t=this.props.viewBufferMin<this.props.dataLength-this._endIndex?this._endIndex+this.props.viewBufferMin:this.props.dataLength-1;(e<this._startIndexDrawn||t>this._endIndexDrawn)&&this.forceUpdate()})),be(this,"_initWrapper",(e=>{this.props.windowScroller&&(this._wrapperElm=e,e&&(this._viewHeight=e.clientHeight))})),be(this,"_initItemHolder",(e=>{this._itemHolderElm=e,this._scanItemHeights()})),be(this,"_scanItemHeights",(()=>{const e=this.props.getIndexFromKey;if(!this._itemHolderElm)return;let t=null,n=null,r=!1;const s=this._itemHolderElm.childNodes,a=s.length;for(let e=0;e<a;e++){const a=s[e],i=a.getAttribute("data-item-key");if(!i){console.warn("itemKey not found");continue}const o=(a.firstElementChild||a).clientHeight;o!==this._knownHeights.get(i)&&(this._knownHeights.set(i,o),r?n=i:(r=!0,t=n=i))}if(null!=t&&null!=n){const r=e(t),s=n===t?r:e(n);this._yPositions.calcHeights(s,this._getHeight,r),this.forceUpdate()}})),be(this,"_getHeight",(e=>{const t=this.props.getKeyFromIndex(e),n=this._knownHeights.get(t);return null!=n&&n==n?n:this.props.itemHeightGetter(e,t)})),this._yPositions=new fe(200),this._knownHeights=new Map,this._startIndexDrawn=2**20,this._endIndexDrawn=-1048576,this._startIndex=0,this._endIndex=0,this._viewHeight=-1,this._scrollTop=-1,this._isScrolledOrResized=!1,this._htmlTopOffset=-1,this._windowScrollListenerAdded=!1,this._htmlElm=document.documentElement,this._wrapperElm=void 0,this._itemHolderElm=void 0}componentDidMount(){if(this.props.windowScroller){if(this._wrapperElm){const{top:e}=this._wrapperElm.getBoundingClientRect();this._htmlTopOffset=e+this._htmlElm.scrollTop}window.addEventListener("scroll",this._onScroll),this._windowScrollListenerAdded=!0}else{var e;this._wrapperElm=this.props.scrollElement,null===(e=this._wrapperElm)||void 0===e||e.addEventListener("scroll",this._onScroll)}}componentDidUpdate(){this._itemHolderElm&&this._scanItemHeights()}componentWillUnmount(){var e;this._windowScrollListenerAdded?window.removeEventListener("scroll",this._onScroll):null===(e=this._wrapperElm)||void 0===e||e.removeEventListener("scroll",this._onScroll)}_isViewChanged(){if(!this._wrapperElm)return!1;const e=this.props.windowScroller,t=e?this._htmlElm.clientHeight:this._wrapperElm.clientHeight,n=e?this._htmlElm.scrollTop:this._wrapperElm.scrollTop;return t!==this._viewHeight||n!==this._scrollTop}_calcViewIndexes(){if(this.props.windowScroller)this._viewHeight=window.innerHeight-this._htmlTopOffset,this._scrollTop=window.scrollY;else{if(!this._wrapperElm)return this._viewHeight=-1,this._startIndex=0,void(this._endIndex=0);this._viewHeight=this._wrapperElm.clientHeight,this._scrollTop=this._wrapperElm.scrollTop}const e=this._scrollTop,t=this._scrollTop+this._viewHeight;this._startIndex=this._yPositions.findFloorIndex(e,this._getHeight),this._endIndex=this._yPositions.findFloorIndex(t,this._getHeight)}render(){const{dataLength:e,getKeyFromIndex:t,initialDraw:n=ve,itemRenderer:r,viewBuffer:s,viewBufferMin:a}=this.props,i=this._getHeight,o=[];let l,c;if(this._yPositions.profileData(e),this._wrapperElm){this._isViewChanged()&&this._calcViewIndexes();const t=a>this._startIndex?0:this._startIndex-a,n=a<e-this._endIndex?this._endIndex+a:e-1;t<this._startIndexDrawn||n>this._endIndexDrawn?(l=s>this._startIndex?0:this._startIndex-s,c=this._endIndex+s,c>=e&&(c=e-1)):(l=this._startIndexDrawn,c=this._endIndexDrawn>e-1?e-1:this._endIndexDrawn)}else l=0,c=(n<e?n:e)-1;this._yPositions.calcHeights(c,i,l||-1),this._startIndexDrawn=l,this._endIndexDrawn=c,o.length=c-l+1;for(let e=l;e<=c;e++){const{y:n,height:s}=this._yPositions.getRowPosition(e,i),a={height:s,top:n,position:"absolute"},l=t(e),c={"data-item-key":l};o.push(r(l,a,e,c))}const d={style:{position:"relative"},ref:this._initWrapper};this.props.windowScroller||(d.onScroll=this._onScroll,d.style.height="100%",d.style.overflowY="auto");const p={position:"relative",height:this._yPositions.getEstimatedHeight()};return(0,z.jsx)("div",Object.assign({},d,{children:(0,z.jsx)("div",{style:p,children:(0,z.jsx)("div",{style:{position:"absolute",top:0,margin:0,padding:0},className:this.props.itemsWrapperClassName,ref:this._initItemHolder,children:o})})}))}}be(ye,"defaultProps",{initialDraw:ve,itemsWrapperClassName:"",windowScroller:!1});var xe=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/alert.js"),we=n.n(xe),_e=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/arrow-right-a.js"),ke=n.n(_e),Te=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/md/file-upload.js"),je=n.n(Te);const Ie=["reference","children","className","focusSpan"];function Se(e){const{reference:t,children:n,className:r,focusSpan:s}=e,a=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,Ie);return delete a.onClick,t.span?(0,z.jsx)("a",Object.assign({role:"button",onClick:()=>s(t.spanID),className:r},a,{children:n})):(0,z.jsx)(g.Consumer,{children:e=>{if(!e)throw new Error("ExternalLinkContext does not have a value, you probably forgot to setup it's provider");return(0,z.jsx)("a",Object.assign({href:e(t.traceID,t.spanID),target:"_blank",rel:"noopener noreferrer",className:r},a,{children:n}))}})}const De=()=>({MultiParent:r.iv`
      padding: 0 5px;
      & ~ & {
        margin-left: 5px;
      }
    `,TraceRefLink:r.iv`
      display: flex;
      justify-content: space-between;
    `,NewWindowIcon:r.iv`
      margin: 0.2em 0 0;
    `,tooltip:r.iv`
      max-width: none;
    `}),Ce=e=>{const{references:t,children:n,tooltipText:r,focusSpan:s}=e,i=(0,a.useStyles2)(De),o=t[0];return(0,z.jsx)(a.Tooltip,{content:r,children:(0,z.jsx)(Se,{reference:o,focusSpan:s,className:i.MultiParent,children:n})})};function Ne(e){let{children:t,content:n,overlayClassName:r}=e;const i=(0,s.useRef)(null);return(0,z.jsx)(a.PopoverController,{content:n,hideAfter:300,children:(e,n,o)=>(0,z.jsxs)(z.Fragment,{children:[i.current&&(0,z.jsx)(a.Popover,Object.assign({},o,{referenceElement:i.current,wrapperClassName:r,onMouseLeave:n,onMouseEnter:e})),s.cloneElement(t,{ref:i,onMouseEnter:e,onMouseLeave:n})]})})}var Le=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/ios-arrow-down.js"),Ee=n.n(Le),Me=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/ios-arrow-right.js"),Re=n.n(Me);var Oe=n("./.yarn/cache/json-markup-npm-1.1.3-2762e9da70-aa4e1935fc.zip/node_modules/json-markup/index.js"),ze=n.n(Oe),Pe=n("./.yarn/cache/copy-to-clipboard-npm-3.3.1-18029bce99-3c7b1c333d.zip/node_modules/copy-to-clipboard/index.js"),$e=n.n(Pe);function He(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const Ve=(0,a.stylesFactory)((()=>({CopyIcon:r.iv`
      background-color: transparent;
      border: none;
      color: inherit;
      height: 100%;
      overflow: hidden;
      padding: 0px;
      &:focus {
        background-color: rgba(255, 255, 255, 0.25);
        color: inherit;
      }
    `})));class Fe extends s.PureComponent{constructor(){super(...arguments),He(this,"state",{hasCopied:!1}),He(this,"handleClick",(()=>{this.setState({hasCopied:!0}),$e()(this.props.copyText)})),He(this,"handleTooltipVisibilityChange",(e=>{!e&&this.state.hasCopied&&this.setState({hasCopied:!1})}))}render(){const e=Ve();return(0,z.jsx)(a.Tooltip,{content:this.state.hasCopied?"Copied":this.props.tooltipTitle,children:(0,z.jsx)(a.Button,{className:b()(e.CopyIcon,this.props.className),type:"button",icon:this.props.icon,onClick:this.handleClick})})}}var Ae;He(Fe,"defaultProps",{className:void 0,icon:"copy"});const Be="copyIcon",We=e=>({KeyValueTable:r.iv`
      label: KeyValueTable;
      background: ${l(e,"#fff")};
      border: 1px solid ${l(e,"#ddd")};
      margin-bottom: 0.5rem;
      max-height: 450px;
      overflow: auto;
    `,body:r.iv`
      label: body;
      vertical-align: baseline;
    `,row:r.iv`
      label: row;
      & > td {
        padding: 0rem 0.5rem;
      }
      &:nth-child(2n) > td {
        background: ${l(e,"#f5f5f5")};
      }
      &:not(:hover) .${Be} {
        visibility: hidden;
      }
    `,keyColumn:r.iv`
      label: keyColumn;
      color: ${l(e,"#888")};
      white-space: pre;
      width: 125px;
    `,copyColumn:r.iv`
      label: copyColumn;
      text-align: right;
    `,linkIcon:r.iv`
      label: linkIcon;
      vertical-align: middle;
      font-weight: bold;
    `}),Ge=/^(\[|\{)/;function Ke(e){if("string"==typeof e&&Ge.test(e))try{return JSON.parse(e)}catch(e){}return e}const Ue=e=>(0,z.jsxs)("a",{href:e.href,title:e.title,target:"_blank",rel:"noopener noreferrer",children:[e.children," ",Ae||(Ae=(0,z.jsx)(a.Icon,{name:"external-link-alt"}))]});function qe(e){const{data:t,linksGetter:n}=e,r=(0,a.useStyles2)(We);return(0,z.jsx)("div",{className:b()(r.KeyValueTable),"data-test-id":"KeyValueTable",children:(0,z.jsx)("table",{className:v.K9,children:(0,z.jsx)("tbody",{className:r.body,children:t.map(((e,s)=>{const a={__html:ze()(Ke(e.value))},i=(0,z.jsx)("div",{className:v.b$,dangerouslySetInnerHTML:a}),o=n?n(t,s):null;let l;return l=o&&o.length?(0,z.jsx)("div",{children:(0,z.jsx)(Ue,{href:o[0].url,title:o[0].text,children:i})}):i,(0,z.jsxs)("tr",{className:r.row,children:[(0,z.jsx)("td",{className:r.keyColumn,"data-test-id":"KeyValueTable--keyColumn",children:e.key}),(0,z.jsx)("td",{children:l}),(0,z.jsx)("td",{className:r.copyColumn,children:(0,z.jsx)(Fe,{className:Be,copyText:JSON.stringify(e,null,2),tooltipTitle:"Copy JSON"})})]},`${e.key}-${s}`)}))})})})}Ue.defaultProps={title:""};const Ze=e=>({header:r.iv`
      label: header;
      cursor: pointer;
      overflow: hidden;
      padding: 0.25em 0.1em;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: ${l(e,"#e8e8e8")};
      }
    `,headerEmpty:r.iv`
      label: headerEmpty;
      background: none;
      cursor: initial;
    `,headerHighContrast:r.iv`
      label: headerHighContrast;
      &:hover {
        background: ${l(e,"#ddd")};
      }
    `,emptyIcon:r.iv`
      label: emptyIcon;
      color: ${l(e,"#aaa")};
    `,summary:r.iv`
      label: summary;
      display: inline;
      list-style: none;
      padding: 0;
    `,summaryItem:r.iv`
      label: summaryItem;
      display: inline;
      margin-left: 0.7em;
      padding-right: 0.5rem;
      border-right: 1px solid ${l(e,"#ddd")};
      &:last-child {
        padding-right: 0;
        border-right: none;
      }
    `,summaryLabel:r.iv`
      label: summaryLabel;
      color: ${l(e,"#777")};
    `,summaryDelim:r.iv`
      label: summaryDelim;
      color: ${l(e,"#bbb")};
      padding: 0 0.2em;
    `});function Xe(e){const{data:t}=e,n=(0,a.useStyles2)(Ze);return Array.isArray(t)&&t.length?(0,z.jsx)("ul",{className:n.summary,children:t.map(((e,t)=>(0,z.jsxs)("li",{className:n.summaryItem,children:[(0,z.jsx)("span",{className:n.summaryLabel,children:e.key}),(0,z.jsx)("span",{className:n.summaryDelim,children:"="}),String(e.value)]},`${e.key}-${t}`)))}):null}function Ye(e){const{className:t,data:n,highContrast:r,interactive:s,isOpen:i,label:o,linksGetter:l,onToggle:c}=e,d=!Array.isArray(n)||!n.length,p=(0,a.useStyles2)(Ze),u=b()(v.Im,{[p.emptyIcon]:d});let h=null,m=null;return s&&(h=i?(0,z.jsx)(Ee(),{className:u}):(0,z.jsx)(Re(),{className:u}),m={"aria-checked":i,onClick:d?null:c,role:"switch"}),(0,z.jsxs)("div",{className:b()(t,v.ty),children:[(0,z.jsxs)("div",Object.assign({className:b()(p.header,{[p.headerEmpty]:d,[p.headerHighContrast]:r&&!d})},m,{"data-test-id":"AccordianKeyValues--header",children:[h,(0,z.jsxs)("strong",{"data-test":"label",children:[o,i||":"]}),!i&&(0,z.jsx)(Xe,{data:n})]})),i&&(0,z.jsx)(qe,{data:n,linksGetter:l})]})}var Je,Qe,et;Xe.defaultProps={data:null},Ye.defaultProps={className:null,highContrast:!1,interactive:!0,onToggle:null};const tt=e=>({AccordianLogs:r.iv`
      label: AccordianLogs;
      border: 1px solid ${l(e,"#d8d8d8")};
      position: relative;
      margin-bottom: 0.25rem;
    `,AccordianLogsHeader:r.iv`
      label: AccordianLogsHeader;
      background: ${l(e,"#e4e4e4")};
      color: inherit;
      display: block;
      padding: 0.25rem 0.5rem;
      &:hover {
        background: ${l(e,"#dadada")};
      }
    `,AccordianLogsContent:r.iv`
      label: AccordianLogsContent;
      background: ${l(e,"#f0f0f0")};
      border-top: 1px solid ${l(e,"#d8d8d8")};
      padding: 0.5rem 0.5rem 0.25rem 0.5rem;
    `,AccordianLogsFooter:r.iv`
      label: AccordianLogsFooter;
      color: ${l(e,"#999")};
    `});function nt(e){const{interactive:t,isOpen:n,linksGetter:r,logs:s,openedItems:i,onItemToggle:o,onToggle:l,timestamp:c}=e;let d=null,p="span",u=null;t&&(d=n?Je||(Je=(0,z.jsx)(Ee(),{className:v.Im})):Qe||(Qe=(0,z.jsx)(Re(),{className:"u-align-icon"})),p="a",u={"aria-checked":n,onClick:l,role:"switch"});const h=(0,a.useStyles2)(tt);return(0,z.jsxs)("div",{className:h.AccordianLogs,children:[(0,z.jsxs)(p,Object.assign({className:h.AccordianLogsHeader},u,{children:[d," ",et||(et=(0,z.jsx)("strong",{children:"Logs"}))," (",s.length,")"]})),n&&(0,z.jsxs)("div",{className:h.AccordianLogsContent,children:[(0,y.sortBy)(s,"timestamp").map(((e,n)=>(0,z.jsx)(Ye,{className:n<s.length-1?v.bi:null,data:e.fields||[],highContrast:!0,interactive:t,isOpen:!!i&&i.has(e),label:`${C(e.timestamp-c)}`,linksGetter:r,onToggle:t&&o?()=>o(e):null},`${e.timestamp}-${n}`))),(0,z.jsx)("small",{className:h.AccordianLogsFooter,children:"Log timestamps are relative to the start time of the full trace."})]})]})}nt.defaultProps={interactive:!0,linksGetter:void 0,onItemToggle:void 0,onToggle:void 0,openedItems:void 0};const rt=e=>({wrapper:r.iv`
      label: wrapper;
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      overflow: hidden;
      z-index: 0;
    `,bar:r.iv`
      label: bar;
      border-radius: 3px;
      min-width: 2px;
      position: absolute;
      height: 36%;
      top: 32%;
    `,rpc:r.iv`
      label: rpc;
      position: absolute;
      top: 35%;
      bottom: 35%;
      z-index: 1;
    `,label:r.iv`
      label: label;
      color: #aaa;
      font-size: 12px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1em;
      white-space: nowrap;
      padding: 0 0.5em;
      position: absolute;
    `,logMarker:r.iv`
      label: logMarker;
      background-color: ${l(e,"#2c3235")};
      cursor: pointer;
      height: 60%;
      min-width: 1px;
      position: absolute;
      top: 20%;
      &:hover {
        background-color: ${l(e,"#464c54")};
      }
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        border: 1px solid transparent;
      }
      &::after {
        left: 0;
      }
    `});function st(e){return`${(100*e).toFixed(1)}%`}function at(e){let{viewEnd:t,viewStart:n,getViewedBounds:r,color:i,shortLabel:o,longLabel:l,onClick:c,rpc:d,traceStartTime:p,span:u,className:h,labelClassName:m}=e;const[g,f]=(0,s.useState)(o),v=(0,y.groupBy)(u.logs,(e=>{const t=r(e.timestamp,e.timestamp).start;return st(Math.round(500*t)/500)})),x=(0,a.useStyles2)(rt);return(0,z.jsxs)("div",{className:b()(x.wrapper,h),onClick:c,onMouseLeave:()=>f(o),onMouseOver:()=>f(l),"aria-hidden":!0,"data-test-id":"SpanBar--wrapper",children:[(0,z.jsx)("div",{"aria-label":g,className:x.bar,style:{background:i,left:st(n),width:st(t-n)},children:(0,z.jsx)("div",{className:b()(x.label,m),"data-test-id":"SpanBar--label",children:g})}),(0,z.jsx)("div",{children:Object.keys(v).map((e=>(0,z.jsx)(Ne,{content:(0,z.jsx)(nt,{interactive:!1,isOpen:!0,logs:v[e],timestamp:p}),children:(0,z.jsx)("div",{className:x.logMarker,style:{left:e}})},e)))}),d&&(0,z.jsx)("div",{className:x.rpc,style:{background:d.color,left:st(d.viewStart),width:st(d.viewEnd-d.viewStart)}})]})}const it=s.memo(at);var ot,lt,ct=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/chevron-right.js"),dt=n.n(ct);function pt(e){return(0,y.get)((0,y.find)(e.references,(e=>{let{span:t,refType:n}=e;return t&&t.spanID&&("CHILD_OF"===n||"FOLLOWS_FROM"===n)})),"span")}function ut(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const ht=(0,a.stylesFactory)((e=>({SpanTreeOffset:r.iv`
      label: SpanTreeOffset;
      color: ${l(e,"#000")};
      position: relative;
    `,SpanTreeOffsetParent:r.iv`
      label: SpanTreeOffsetParent;
      &:hover {
        cursor: pointer;
      }
    `,indentGuide:r.iv`
      label: indentGuide;
      /* The size of the indentGuide is based off of the iconWrapper */
      padding-right: calc(0.5rem + 12px);
      height: 100%;
      border-left: 3px solid transparent;
      display: inline-flex;
      &::before {
        content: '';
        padding-left: 1px;
        background-color: ${l(e,"lightgrey")};
      }
    `,indentGuideActive:r.iv`
      label: indentGuideActive;
      border-color: ${l(e,"darkgrey")};
      &::before {
        background-color: transparent;
      }
    `,iconWrapper:r.iv`
      label: iconWrapper;
      position: absolute;
      right: 0.25rem;
    `})));class mt extends s.PureComponent{constructor(e){super(e),ut(this,"ancestorIds",void 0),ut(this,"handleMouseLeave",((e,t)=>{e.relatedTarget instanceof HTMLSpanElement&&(0,y.get)(e,"relatedTarget.dataset.ancestorId")===t||this.props.removeHoverIndentGuideId(t)})),ut(this,"handleMouseEnter",((e,t)=>{e.relatedTarget instanceof HTMLSpanElement&&(0,y.get)(e,"relatedTarget.dataset.ancestorId")===t||this.props.addHoverIndentGuideId(t)})),this.ancestorIds=function(e){const t=[];if(!e)return t;let n=pt(e);for(;n;)t.push(n.spanID),n=pt(n);return t}(e.span),this.ancestorIds.push("root"),this.ancestorIds.reverse()}render(){const{childrenVisible:e,onClick:t,showChildrenIcon:n,span:r,theme:s}=this.props,{hasChildren:a,spanID:i}=r,o=a?{onClick:t,role:"switch","aria-checked":e}:null,l=n&&a&&(e?ot||(ot=(0,z.jsx)(Ee(),{})):lt||(lt=(0,z.jsx)(dt(),{}))),c=ht(s);return(0,z.jsxs)("span",Object.assign({className:b()(c.SpanTreeOffset,{[c.SpanTreeOffsetParent]:a})},o,{children:[this.ancestorIds.map((e=>(0,z.jsx)("span",{className:b()(c.indentGuide,{[c.indentGuideActive]:this.props.hoverIndentGuideIds.has(e)}),"data-ancestor-id":e,"data-test-id":"SpanTreeOffset--indentGuide",onMouseEnter:t=>this.handleMouseEnter(t,e),onMouseLeave:t=>this.handleMouseLeave(t,e)},e))),l&&(0,z.jsx)("span",{className:c.iconWrapper,onMouseEnter:e=>this.handleMouseEnter(e,i),onMouseLeave:e=>this.handleMouseLeave(e,i),"data-test-id":"icon-wrapper",children:l})]}))}}ut(mt,"displayName","UnthemedSpanTreeOffset"),ut(mt,"defaultProps",{childrenVisible:!1,showChildrenIcon:!0});const gt=(0,a.withTheme2)(mt);var ft,bt,vt,yt;function xt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const wt="spanBar",_t="spanBarLabel",kt="nameWrapper",Tt="nameWrapperMatchingFilter",jt="jaegerView",It="nameColumn",St=(0,a.stylesFactory)((e=>{const t=r.F4`
    label: flash;
    from {
      background-color: ${l(e,"#68b9ff")};
    }
    to {
      background-color: default;
    }
  `;return{nameWrapper:r.iv`
      label: nameWrapper;
      line-height: 27px;
      overflow: hidden;
      display: flex;
    `,nameWrapperMatchingFilter:r.iv`
      label: nameWrapperMatchingFilter;
      background-color: ${l(e,"#fffce4")};
    `,nameColumn:r.iv`
      label: nameColumn;
      position: relative;
      white-space: nowrap;
      z-index: 1;
      &:hover {
        z-index: 1;
      }
    `,endpointName:r.iv`
      label: endpointName;
      color: ${l(e,"#808080")};
    `,view:r.iv`
      label: view;
      position: relative;
    `,viewExpanded:r.iv`
      label: viewExpanded;
      background: ${l(e,"#f8f8f8")};
      outline: 1px solid ${l(e,"#ddd")};
    `,viewExpandedAndMatchingFilter:r.iv`
      label: viewExpandedAndMatchingFilter;
      background: ${l(e,"#fff3d7")};
      outline: 1px solid ${l(e,"#ddd")};
    `,row:r.iv`
      label: row;
      &:hover .${wt} {
        opacity: 1;
      }
      &:hover .${_t} {
        color: ${l(e,"#000")};
      }
      &:hover .${kt} {
        background: #f8f8f8;
        background: linear-gradient(
          90deg,
          ${l(e,"#fafafa")},
          ${l(e,"#f8f8f8")} 75%,
          ${l(e,"#eee")}
        );
      }
      &:hover .${jt} {
        background-color: ${l(e,"#f5f5f5")};
        outline: 1px solid ${l(e,"#ddd")};
      }
    `,rowClippingLeft:r.iv`
      label: rowClippingLeft;
      & .${It}::before {
        content: ' ';
        height: 100%;
        position: absolute;
        width: 6px;
        background-image: linear-gradient(
          to right,
          ${l(e,"rgba(25, 25, 25, 0.25)")},
          ${l(e,"rgba(32, 32, 32, 0)")}
        );
        left: 100%;
        z-index: -1;
      }
    `,rowClippingRight:r.iv`
      label: rowClippingRight;
      & .${jt}::before {
        content: ' ';
        height: 100%;
        position: absolute;
        width: 6px;
        background-image: linear-gradient(
          to left,
          ${l(e,"rgba(25, 25, 25, 0.25)")},
          ${l(e,"rgba(25, 25, 25, 0.25)")}
        );
        right: 0%;
        z-index: 1;
      }
    `,rowExpanded:r.iv`
      label: rowExpanded;
      & .${wt} {
        opacity: 1;
      }
      & .${_t} {
        color: ${l(e,"#000")};
      }
      & .${kt}, &:hover .${kt} {
        background: ${l(e,"#f0f0f0")};
        box-shadow: 0 1px 0 ${l(e,"#ddd")};
      }
      & .${Tt} {
        background: ${l(e,"#fff3d7")};
      }
      &:hover .${jt} {
        background: ${l(e,"#eee")};
      }
    `,rowMatchingFilter:r.iv`
      label: rowMatchingFilter;
      background-color: ${l(e,"#fffbde")};
      &:hover .${kt} {
        background: linear-gradient(
          90deg,
          ${l(e,"#fffbde")},
          ${l(e,"#fffbde")} 75%,
          ${l(e,"#f7f1c6")}
        );
      }
      &:hover .${jt} {
        background-color: ${l(e,"#f7f1c6")};
        outline: 1px solid ${l(e,"#ddd")};
      }
    `,rowFocused:r.iv`
      label: rowFocused;
      background-color: ${l(e,"#cbe7ff")};
      animation: ${t} 1s cubic-bezier(0.12, 0, 0.39, 0);
      & .${kt}, .${jt}, .${Tt} {
        background-color: ${l(e,"#cbe7ff")};
        animation: ${t} 1s cubic-bezier(0.12, 0, 0.39, 0);
      }
      & .${wt} {
        opacity: 1;
      }
      & .${_t} {
        color: ${l(e,"#000")};
      }
      &:hover .${kt}, :hover .${jt} {
        background: ${l(e,"#d5ebff")};
        box-shadow: 0 1px 0 ${l(e,"#ddd")};
      }
    `,rowExpandedAndMatchingFilter:r.iv`
      label: rowExpandedAndMatchingFilter;
      &:hover .${jt} {
        background: ${l(e,"#ffeccf")};
      }
    `,name:r.iv`
      label: name;
      color: ${l(e,"#000")};
      cursor: pointer;
      flex: 1 1 auto;
      outline: none;
      overflow: hidden;
      padding-left: 4px;
      padding-right: 0.25em;
      position: relative;
      text-overflow: ellipsis;
      &::before {
        content: ' ';
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 0;
        border-left: 4px solid;
        border-left-color: inherit;
      }

      /* This is so the hit area of the span-name extends the rest of the width of the span-name column */
      &::after {
        background: transparent;
        bottom: 0;
        content: ' ';
        left: 0;
        position: absolute;
        top: 0;
        width: 1000px;
      }
      &:focus {
        text-decoration: none;
      }
      &:hover > small {
        color: ${l(e,"#000")};
      }
    `,nameDetailExpanded:r.iv`
      label: nameDetailExpanded;
      &::before {
        bottom: 0;
      }
    `,svcName:r.iv`
      label: svcName;
      padding: 0 0.25rem 0 0.5rem;
      font-size: 1.05em;
    `,svcNameChildrenCollapsed:r.iv`
      label: svcNameChildrenCollapsed;
      font-weight: bold;
      font-style: italic;
    `,errorIcon:r.iv`
      label: errorIcon;
      border-radius: 6.5px;
      color: ${l(e,"#fff")};
      font-size: 0.85em;
      margin-right: 0.25rem;
      padding: 1px;
    `,rpcColorMarker:r.iv`
      label: rpcColorMarker;
      border-radius: 6.5px;
      display: inline-block;
      font-size: 0.85em;
      height: 1em;
      margin-right: 0.25rem;
      padding: 1px;
      width: 1em;
      vertical-align: middle;
    `,labelRight:r.iv`
      label: labelRight;
      left: 100%;
    `,labelLeft:r.iv`
      label: labelLeft;
      right: 100%;
    `}}));class Dt extends s.PureComponent{constructor(){super(...arguments),xt(this,"_detailToggle",(()=>{this.props.onDetailToggled(this.props.span.spanID)})),xt(this,"_childrenToggle",(()=>{this.props.onChildrenToggled(this.props.span.spanID)}))}render(){const{className:e,color:t,columnDivision:n,isChildrenExpanded:r,isDetailExpanded:s,isMatchingFilter:i,isFocused:o,numTicks:c,rpc:d,noInstrumentedServer:p,showErrorIcon:u,getViewedBounds:h,traceStartTime:m,span:g,focusSpan:f,hoverIndentGuideIds:v,addHoverIndentGuideId:y,removeHoverIndentGuideId:x,clippingLeft:w,clippingRight:_,theme:k,createSpanLink:T}=this.props,{duration:j,hasChildren:I,operationName:S,process:{serviceName:D}}=g,N=C(j),L=h(g.startTime,g.startTime+g.duration),E=L.start,M=L.end,R=St(k),O=`${D}::${S}`;let P,H;return E>1-M?(P=`${O} | ${N}`,H=R.labelLeft):(P=`${N} | ${O}`,H=R.labelRight),(0,z.jsxs)(B,{className:b()(R.row,{[R.rowExpanded]:s,[R.rowMatchingFilter]:i,[R.rowExpandedAndMatchingFilter]:i&&s,[R.rowFocused]:o,[R.rowClippingLeft]:w,[R.rowClippingRight]:_},e),children:[(0,z.jsx)(B.Cell,{className:b()(R.nameColumn,It),width:n,children:(0,z.jsxs)("div",{className:b()(R.nameWrapper,kt,{[R.nameWrapperMatchingFilter]:i,nameWrapperMatchingFilter:i}),children:[(0,z.jsx)(gt,{childrenVisible:r,span:g,onClick:I?this._childrenToggle:void 0,hoverIndentGuideIds:v,addHoverIndentGuideId:y,removeHoverIndentGuideId:x}),(0,z.jsxs)("a",{className:b()(R.name,{[R.nameDetailExpanded]:s}),"aria-checked":s,title:O,onClick:this._detailToggle,role:"switch",style:{borderColor:t},tabIndex:0,children:[(0,z.jsxs)("span",{className:b()(R.svcName,{[R.svcNameChildrenCollapsed]:I&&!r}),children:[u&&(0,z.jsx)(we(),{style:{backgroundColor:g.errorIconColor?l(k,g.errorIconColor):l(k,"#db2828")},className:R.errorIcon}),D," ",d&&(0,z.jsxs)("span",{children:[ft||(ft=(0,z.jsx)(ke(),{}))," ",(0,z.jsx)("i",{className:R.rpcColorMarker,style:{background:d.color}}),d.serviceName]}),p&&(0,z.jsxs)("span",{children:[bt||(bt=(0,z.jsx)(ke(),{}))," ",(0,z.jsx)("i",{className:R.rpcColorMarker,style:{background:p.color}}),p.serviceName]})]}),(0,z.jsx)("small",{className:R.endpointName,children:d?d.operationName:S}),(0,z.jsxs)("small",{className:R.endpointName,children:[" | ",N]})]}),T&&(()=>{const e=T(g);return e?(0,z.jsx)("a",{href:e.href,target:"_blank",style:{marginRight:"5px"},rel:"noopener noreferrer",onClick:e.onClick?t=>{t.ctrlKey||t.metaKey||t.shiftKey||!e.onClick||(t.preventDefault(),e.onClick(t))}:void 0,children:e.content}):null})(),g.references&&g.references.length>1&&(0,z.jsx)(Ce,{references:g.references,tooltipText:"Contains multiple references",focusSpan:f,children:vt||(vt=(0,z.jsx)(a.Icon,{name:"link"}))}),g.subsidiarilyReferencedBy&&g.subsidiarilyReferencedBy.length>0&&(0,z.jsx)(Ce,{references:g.subsidiarilyReferencedBy,tooltipText:"This span is referenced by "+(1===g.subsidiarilyReferencedBy.length?"another span":"multiple other spans"),focusSpan:f,children:yt||(yt=(0,z.jsx)(je(),{}))})]})}),(0,z.jsxs)(B.Cell,{className:b()(R.view,jt,{[R.viewExpanded]:s,[R.viewExpandedAndMatchingFilter]:i&&s}),"data-test-id":"span-view",style:{cursor:"pointer"},width:1-n,onClick:this._detailToggle,children:[(0,z.jsx)($,{numTicks:c}),(0,z.jsx)(it,{rpc:d,viewStart:E,viewEnd:M,getViewedBounds:h,color:t,shortLabel:N,longLabel:P,traceStartTime:m,span:g,labelClassName:`spanBarLabel ${H}`,className:wt})]})]})}}xt(Dt,"displayName","UnthemedSpanBarRow"),xt(Dt,"defaultProps",{className:"",rpc:null});const Ct=(0,a.withTheme2)(Dt);var Nt=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/link.js"),Lt=n.n(Nt);const Et=e=>({Divider:r.iv`
      background: ${l(e,"#ddd")};
    `,DividerVertical:r.iv`
      label: DividerVertical;
      display: inline-block;
      width: 1px;
      height: 0.9em;
      margin: 0 8px;
      vertical-align: middle;
    `,DividerHorizontal:r.iv`
      label: DividerHorizontal;
      display: block;
      height: 1px;
      width: 100%;
      margin: 24px 0;
      clear: both;
      vertical-align: middle;
      position: relative;
      top: -0.06em;
    `});function Mt(e){let{className:t,style:n,type:s}=e;const i=(0,a.useStyles2)(Et);return(0,z.jsx)("div",{style:n,className:(0,r.cx)(i.Divider,"horizontal"===s?i.DividerHorizontal:i.DividerVertical,t)})}function Rt(e){const{className:t,divider:n=!1,items:s}=e,i=(0,a.useStyles2)((e=>t=>({LabeledList:r.iv`
      label: LabeledList;
      list-style: none;
      margin: 0;
      padding: 0;
      ${!0===e&&"\n        margin-right: -8px;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: flex-end;\n      "}
    `,LabeledListItem:r.iv`
      label: LabeledListItem;
      display: inline-block;
      ${!0===e&&`\n        border-right: 1px solid ${l(t,"#ddd")};\n        padding: 0 8px;\n      `}
    `,LabeledListLabel:r.iv`
      label: LabeledListLabel;
      color: ${t.isLight?"#999":"#666"};
      margin-right: 0.25rem;
    `,LabeledListValue:r.iv`
      label: LabeledListValue;
      margin-right: 0.55rem;
    `}))(n));return(0,z.jsx)("ul",{className:b()(i.LabeledList,t),children:s.map((e=>{let{key:t,label:n,value:r}=e;return(0,z.jsxs)("li",{className:i.LabeledListItem,children:[(0,z.jsx)("span",{className:i.LabeledListLabel,children:n}),(0,z.jsx)("strong",{className:i.LabeledListValue,children:r})]},`${t}`)}))})}var Ot,zt,Pt,$t;const Ht=e=>({AccordianReferenceItem:r.iv`
      border-bottom: 1px solid ${l(e,"#d8d8d8")};
    `,AccordianKeyValues:r.iv`
      margin-left: 10px;
    `,AccordianReferences:r.iv`
      label: AccordianReferences;
      border: 1px solid ${l(e,"#d8d8d8")};
      position: relative;
      margin-bottom: 0.25rem;
    `,AccordianReferencesHeader:r.iv`
      label: AccordianReferencesHeader;
      background: ${l(e,"#e4e4e4")};
      color: inherit;
      display: block;
      padding: 0.25rem 0.5rem;
      &:hover {
        background: ${l(e,"#dadada")};
      }
    `,AccordianReferencesContent:r.iv`
      label: AccordianReferencesContent;
      background: ${l(e,"#f0f0f0")};
      border-top: 1px solid ${l(e,"#d8d8d8")};
      padding: 0.5rem 0.5rem 0.25rem 0.5rem;
    `,AccordianReferencesFooter:r.iv`
      label: AccordianReferencesFooter;
      color: ${l(e,"#999")};
    `,ReferencesList:r.iv`
      background: #fff;
      border: 1px solid #ddd;
      margin-bottom: 0.7em;
      max-height: 450px;
      overflow: auto;
    `,list:r.iv`
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
      background: #fff;
    `,itemContent:r.iv`
      padding: 0.25rem 0.5rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
    `,item:r.iv`
      &:nth-child(2n) {
        background: #f5f5f5;
      }
    `,debugInfo:r.iv`
      letter-spacing: 0.25px;
      margin: 0.5em 0 0;
      flex-wrap: wrap;
      display: flex;
      justify-content: flex-end;
    `,debugLabel:r.iv`
      margin: 0 5px 0 5px;
      &::before {
        color: #bbb;
        content: attr(data-label);
      }
    `,serviceName:r.iv`
      margin-right: 8px;
    `});function Vt(e){const{data:t,focusSpan:n,openedItems:s,onItemToggle:i,interactive:o}=e,l=(0,a.useStyles2)(Ht);return(0,z.jsx)("div",{className:l.AccordianReferencesContent,children:t.map(((e,c)=>{var d;return(0,z.jsxs)("div",{className:c<t.length-1?l.AccordianReferenceItem:void 0,children:[(0,z.jsx)("div",{className:l.item,children:(0,z.jsx)(Se,{reference:e,focusSpan:n,children:(0,z.jsxs)("span",{className:l.itemContent,children:[e.span?(0,z.jsxs)("span",{children:[(0,z.jsx)("span",{className:(0,r.cx)("span-svc-name",l.serviceName),children:e.span.process.serviceName}),(0,z.jsx)("small",{className:"endpoint-name",children:e.span.operationName})]}):Ot||(Ot=(0,z.jsxs)("span",{className:"span-svc-name",children:["View Linked Span ",(0,z.jsx)(a.Icon,{name:"external-link-alt"})]})),(0,z.jsxs)("small",{className:l.debugInfo,children:[(0,z.jsx)("span",{className:l.debugLabel,"data-label":"TraceID:",children:e.traceID}),(0,z.jsx)("span",{className:l.debugLabel,"data-label":"SpanID:",children:e.spanID})]})]})})},`${e.spanID}`),!(null===(d=e.tags)||void 0===d||!d.length)&&(0,z.jsx)("div",{className:l.AccordianKeyValues,children:(0,z.jsx)(Ye,{className:c<t.length-1?v.bi:null,data:e.tags||[],highContrast:!0,interactive:o,isOpen:!!s&&s.has(e),label:"attributes",linksGetter:null,onToggle:o&&i?()=>i(e):null})})]},e.spanID)}))})}const Ft=e=>{let{data:t,interactive:n=!0,isOpen:r,onToggle:s,onItemToggle:i,openedItems:o,focusSpan:l}=e;const c=!Array.isArray(t)||!t.length;let d=null,p="span",u=null;n&&(d=r?zt||(zt=(0,z.jsx)(Ee(),{className:v.Im})):Pt||(Pt=(0,z.jsx)(Re(),{className:v.Im})),p="a",u={"aria-checked":r,onClick:c?null:s,role:"switch"});const h=(0,a.useStyles2)(Ht);return(0,z.jsxs)("div",{className:h.AccordianReferences,children:[(0,z.jsxs)(p,Object.assign({className:h.AccordianReferencesHeader},u,{children:[d,$t||($t=(0,z.jsx)("strong",{children:(0,z.jsx)("span",{children:"References"})}))," ","(",t.length,")"]})),r&&(0,z.jsx)(Vt,{data:t,openedItems:o,focusSpan:l,onItemToggle:i,interactive:n})]})},At=s.memo(Ft),Bt=()=>({TextList:r.iv`
      max-height: 450px;
      overflow: auto;
    `,List:r.iv`
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
    `,item:r.iv`
      padding: 0.25rem 0.5rem;
      vertical-align: top;
      &:nth-child(2n) {
        background: #f5f5f5;
      }
    `});function Wt(e){const{data:t}=e,n=(0,a.useStyles2)(Bt);return(0,z.jsx)("div",{className:b()(n.TextList),"data-test-id":"TextList",children:(0,z.jsx)("ul",{className:n.List,children:t.map(((e,t)=>(0,z.jsx)("li",{className:n.item,children:e},`${t}`)))})})}const Gt=e=>({header:r.iv`
      cursor: pointer;
      overflow: hidden;
      padding: 0.25em 0.1em;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: ${l(e,"#e8e8e8")};
      }
    `});function Kt(e){let{data:t}=e;return(0,z.jsx)(Wt,{data:t})}function Ut(e){const{className:t,data:n,headerClassName:r,interactive:s,isOpen:i,label:o,onToggle:l,TextComponent:c=Kt}=e,d=!Array.isArray(n)||!n.length,p=(0,a.useStyles2)(Ze),u=b()(v.Im,{[p.emptyIcon]:d});let h=null,m=null;s&&(h=i?(0,z.jsx)(Ee(),{className:u}):(0,z.jsx)(Re(),{className:u}),m={"aria-checked":i,onClick:d?null:l,role:"switch"});const g=(0,a.useStyles2)(Gt);return(0,z.jsxs)("div",{className:t||"",children:[(0,z.jsxs)("div",Object.assign({className:b()(g.header,r)},m,{"data-test-id":"AccordianText--header",children:[h,(0,z.jsx)("strong",{children:o})," (",n.length,")"]})),i&&(0,z.jsx)(c,{data:n})]})}var qt;Ut.defaultProps={className:null,highContrast:!1,interactive:!0,onToggle:null};const Zt=e=>({header:r.iv`
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0 1rem;
      margin-bottom: 0.25rem;
    `,listWrapper:r.iv`
      overflow: hidden;
    `,debugInfo:r.iv`
      label: debugInfo;
      display: block;
      letter-spacing: 0.25px;
      margin: 0.5em 0 -0.75em;
      text-align: right;
    `,debugLabel:r.iv`
      label: debugLabel;
      &::before {
        color: ${l(e,"#bbb")};
        content: attr(data-label);
      }
    `,debugValue:r.iv`
      label: debugValue;
      background-color: inherit;
      border: none;
      color: ${l(e,"#888")};
      cursor: pointer;
      &:hover {
        color: ${l(e,"#333")};
      }
    `,AccordianWarnings:r.iv`
      label: AccordianWarnings;
      background: ${l(e,"#fafafa")};
      border: 1px solid ${l(e,"#e4e4e4")};
      margin-bottom: 0.25rem;
    `,AccordianWarningsHeader:r.iv`
      label: AccordianWarningsHeader;
      background: ${l(e,"#fff7e6")};
      padding: 0.25rem 0.5rem;
      &:hover {
        background: ${l(e,"#ffe7ba")};
      }
    `,AccordianWarningsHeaderOpen:r.iv`
      label: AccordianWarningsHeaderOpen;
      border-bottom: 1px solid ${l(e,"#e8e8e8")};
    `,AccordianWarningsLabel:r.iv`
      label: AccordianWarningsLabel;
      color: ${l(e,"#d36c08")};
    `,Textarea:r.iv`
      word-break: break-all;
      white-space: pre;
    `,LinkIcon:r.iv`
      font-size: 1.5em;
    `});function Xt(e){const{detailState:t,linksGetter:n,logItemToggle:r,logsToggle:s,processToggle:i,span:o,tagsToggle:l,traceStartTime:c,warningsToggle:d,stackTracesToggle:p,referencesToggle:u,referenceItemToggle:h,focusSpan:m,createSpanLink:g,createFocusSpanLink:f}=e,{isTagsOpen:y,isProcessOpen:x,logs:w,isWarningsOpen:_,references:k,isStackTracesOpen:T}=t,{operationName:j,process:I,duration:S,relativeStartTime:D,traceID:N,spanID:L,logs:E,tags:M,warnings:R,references:O,stackTraces:P}=o,$=[{key:"svc",label:"Service:",value:I.serviceName},{key:"duration",label:"Duration:",value:C(S)},{key:"start",label:"Start Time:",value:C(D)},...o.childSpanCount>0?[{key:"child_count",label:"Child Count:",value:o.childSpanCount}]:[]],H=(0,a.useStyles2)(Zt),V=null==g?void 0:g(o),F=f(N,L);return(0,z.jsxs)("div",{children:[(0,z.jsxs)("div",{className:H.header,children:[(0,z.jsx)("h2",{className:b()(v.h2),children:j}),(0,z.jsx)("div",{className:H.listWrapper,children:(0,z.jsx)(Rt,{className:v.xb,divider:!0,items:$})})]}),V?(0,z.jsx)(a.DataLinkButton,{link:Object.assign({},V,{title:"Logs for this span"}),buttonProps:{icon:"gf-logs"}}):null,qt||(qt=(0,z.jsx)(Mt,{className:v.im,type:"horizontal"})),(0,z.jsxs)("div",{children:[(0,z.jsxs)("div",{children:[(0,z.jsx)(Ye,{data:M,label:"Tags",linksGetter:n,isOpen:y,onToggle:()=>l(L)}),I.tags&&(0,z.jsx)(Ye,{className:v.bi,data:I.tags,label:"Process",linksGetter:n,isOpen:x,onToggle:()=>i(L)})]}),E&&E.length>0&&(0,z.jsx)(nt,{linksGetter:n,logs:E,isOpen:w.isOpen,openedItems:w.openedItems,onToggle:()=>s(L),onItemToggle:e=>r(L,e),timestamp:c}),R&&R.length>0&&(0,z.jsx)(Ut,{className:H.AccordianWarnings,headerClassName:H.AccordianWarningsHeader,label:(0,z.jsx)("span",{className:H.AccordianWarningsLabel,children:"Warnings"}),data:R,isOpen:_,onToggle:()=>d(L)}),P&&P.length&&(0,z.jsx)(Ut,{label:"Stack trace",data:P,isOpen:T,TextComponent:e=>{var t;let n;var r;(null===(t=e.data)||void 0===t?void 0:t.length)>1?n=e.data.map(((e,t)=>`StackTrace ${t+1}:\n${e}`)).join("\n"):n=null===(r=e.data)||void 0===r?void 0:r[0];return(0,z.jsx)(a.TextArea,{className:H.Textarea,style:{cursor:"unset"},readOnly:!0,cols:10,rows:10,value:n})},onToggle:()=>p(L)}),O&&O.length>0&&(O.length>1||"CHILD_OF"!==O[0].refType)&&(0,z.jsx)(At,{data:O,isOpen:k.isOpen,openedItems:k.openedItems,onToggle:()=>u(L),onItemToggle:e=>h(L,e),focusSpan:m}),(0,z.jsxs)("small",{className:H.debugInfo,children:[(0,z.jsx)("a",Object.assign({},F,{onClick:e=>{!F.onClick||0!==e.button||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.metaKey||e.altKey||e.ctrlKey||e.shiftKey||(e.preventDefault(),F.onClick(e))},children:(0,z.jsx)(Lt(),{className:b()(v.Im,H.LinkIcon)})})),(0,z.jsx)("span",{className:H.debugLabel,"data-label":"SpanID:"})," ",L]})]})]})}function Yt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const Jt=(0,a.stylesFactory)((e=>({expandedAccent:r.iv`
      cursor: pointer;
      height: 100%;
      overflow: hidden;
      position: absolute;
      width: 100%;
      &::before {
        border-left: 4px solid;
        pointer-events: none;
        width: 1000px;
      }
      &::after {
        border-right: 1000px solid;
        border-color: inherit;
        cursor: pointer;
        opacity: 0.2;
      }

      /* border-color inherit must come AFTER other border declarations for accent */
      &::before,
      &::after {
        border-color: inherit;
        content: ' ';
        position: absolute;
        height: 100%;
      }

      &:hover::after {
        opacity: 0.35;
      }
    `,infoWrapper:r.iv`
      label: infoWrapper;
      border: 1px solid ${l(e,"#d3d3d3")};
      border-top: 3px solid;
      padding: 0.75rem;
    `})));class Qt extends s.PureComponent{constructor(){super(...arguments),Yt(this,"_detailToggle",(()=>{this.props.onDetailToggled(this.props.span.spanID)})),Yt(this,"_linksGetter",((e,t)=>{const{linksGetter:n,span:r}=this.props;return n(r,e,t)}))}render(){const{color:e,columnDivision:t,detailState:n,logItemToggle:r,logsToggle:s,processToggle:a,referenceItemToggle:i,referencesToggle:o,warningsToggle:l,stackTracesToggle:c,span:d,tagsToggle:p,traceStartTime:u,focusSpan:h,hoverIndentGuideIds:m,addHoverIndentGuideId:g,removeHoverIndentGuideId:f,theme:b,createSpanLink:v,focusedSpanId:y,createFocusSpanLink:x}=this.props,w=Jt(b);return(0,z.jsxs)(B,{children:[(0,z.jsxs)(B.Cell,{width:t,style:{overflow:"hidden"},children:[(0,z.jsx)(gt,{span:d,showChildrenIcon:!1,hoverIndentGuideIds:m,addHoverIndentGuideId:g,removeHoverIndentGuideId:f}),(0,z.jsx)("span",{children:(0,z.jsx)("span",{className:w.expandedAccent,"aria-checked":"true",onClick:this._detailToggle,role:"switch",style:{borderColor:e},"data-test-id":"detail-row-expanded-accent"})})]}),(0,z.jsx)(B.Cell,{width:1-t,children:(0,z.jsx)("div",{className:w.infoWrapper,style:{borderTopColor:e},children:(0,z.jsx)(Xt,{detailState:n,linksGetter:this._linksGetter,logItemToggle:r,logsToggle:s,processToggle:a,referenceItemToggle:i,referencesToggle:o,warningsToggle:l,stackTracesToggle:c,span:d,tagsToggle:p,traceStartTime:u,focusSpan:h,createSpanLink:v,focusedSpanId:y,createFocusSpanLink:x})})})]})}}const en=(0,a.withTheme2)(Qt);function tn(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const nn=(0,a.stylesFactory)((()=>({rowsWrapper:r.iv`
      width: 100%;
    `,row:r.iv`
      width: 100%;
    `,scrollToTopButton:r.iv`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1;
    `}))),rn=28,sn=161,an=197;const on=(0,ce.Z)((function(e,t,n){return e?function(e,t,n){if(!e)return[];let r=null;const s=[];for(let a=0;a<e.length;a++){const i=e[a],{spanID:o,depth:l}=i;let c=!1;null!=r&&(l>=r?c=!0:r=null),c||(t.has(o)&&(r=l+1),s.push({span:i,isDetail:!1,spanIndex:a}),n.has(o)&&s.push({span:i,isDetail:!0,spanIndex:a}))}return s}(e.spans,t,n):[]})),ln=(0,ce.Z)((function(e){const{min:t,max:n,viewStart:r,viewEnd:s}=e,a=n-t,i=t+r*a,o=n-(1-s)*a-i;return(e,t)=>({start:(e-i)/o,end:(t-i)/o})}),y.isEqual),cn=(0,ce.Z)((function(e){const[t,n]=e;return{left:t>0,right:n<1}}),y.isEqual);class dn extends s.Component{constructor(e){super(e),tn(this,"listView",void 0),tn(this,"topTraceViewRef",(0,s.createRef)()),tn(this,"getViewRange",(()=>this.props.currentViewRangeTime)),tn(this,"getSearchedSpanIDs",(()=>this.props.findMatchesIDs)),tn(this,"getCollapsedChildren",(()=>this.props.childrenHiddenIDs)),tn(this,"mapRowIndexToSpanIndex",(e=>this.getRowStates()[e].spanIndex)),tn(this,"mapSpanIndexToRowIndex",(e=>{const t=this.getRowStates().length;for(let n=0;n<t;n++){const{spanIndex:t}=this.getRowStates()[n];if(t===e)return n}throw new Error(`unable to find row for span index: ${e}`)})),tn(this,"setListView",(e=>{const t=this.listView!==e;this.listView=e,e&&t&&this.props.registerAccessors(this.getAccessors())})),tn(this,"getKeyFromIndex",(e=>{const{isDetail:t,span:n}=this.getRowStates()[e];return`${n.traceID}--${n.spanID}--${t?"detail":"bar"}`})),tn(this,"getIndexFromKey",(e=>{const t=e.split("--"),n=t[0],r=t[1],s="detail"===t[2],a=this.getRowStates().length;for(let e=0;e<a;e++){const{span:t,isDetail:a}=this.getRowStates()[e];if(t.spanID===r&&t.traceID===n&&a===s)return e}return-1})),tn(this,"getRowHeight",(e=>{const{span:t,isDetail:n}=this.getRowStates()[e];return n?Array.isArray(t.logs)&&t.logs.length?an:sn:rn})),tn(this,"renderRow",((e,t,n,r)=>{const{isDetail:s,span:a,spanIndex:i}=this.getRowStates()[n];return s?this.renderSpanDetailRow(a,e,t,r):this.renderSpanBarRow(a,i,e,t,r)})),tn(this,"scrollToSpan",(e=>{if(null==e)return;const t=this.getRowStates().findIndex((t=>t.span.spanID===e));var n;t>=0&&(null===(n=this.listView)||void 0===n||n.scrollToIndex(t))})),tn(this,"scrollToTop",(()=>{var e;const{topOfExploreViewRef:t}=this.props;null==t||null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}));const{setTrace:t,trace:n,uiFind:r}=e;t(n,r)}componentDidMount(){this.scrollToSpan(this.props.focusedSpanId)}shouldComponentUpdate(e){const t=Object.keys(e);for(let n=0;n<t.length;n+=1)if(e[t[n]]!==this.props[t[n]]){if("shouldScrollToFirstUiFindMatch"!==t[n])return!0;if(e[t[n]])return!0}return!1}componentDidUpdate(e){const{registerAccessors:t,trace:n}=e,{shouldScrollToFirstUiFindMatch:r,clearShouldScrollToFirstUiFindMatch:s,scrollToFirstVisibleSpan:a,registerAccessors:i,setTrace:o,trace:l,uiFind:c,focusedSpanId:d,focusedSpanIdForSearch:p}=this.props;n!==l&&o(l,c),this.listView&&t!==i&&i(this.getAccessors()),r&&(a(),s()),d!==e.focusedSpanId&&this.scrollToSpan(d),p!==e.focusedSpanIdForSearch&&this.scrollToSpan(p)}getRowStates(){const{childrenHiddenIDs:e,detailStates:t,trace:n}=this.props;return on(n,e,t)}getClipping(){const{currentViewRangeTime:e}=this.props;return cn(e)}getViewedBounds(){const{currentViewRangeTime:e,trace:t}=this.props,[n,r]=e;return ln({min:t.startTime,max:t.endTime,viewStart:n,viewEnd:r})}getAccessors(){const e=this.listView;if(!e)throw new Error("ListView unavailable");return{getViewRange:this.getViewRange,getSearchedSpanIDs:this.getSearchedSpanIDs,getCollapsedChildren:this.getCollapsedChildren,getViewHeight:e.getViewHeight,getBottomRowIndexVisible:e.getBottomVisibleIndex,getTopRowIndexVisible:e.getTopVisibleIndex,getRowPosition:e.getRowPosition,mapRowIndexToSpanIndex:this.mapRowIndexToSpanIndex,mapSpanIndexToRowIndex:this.mapSpanIndexToRowIndex}}renderSpanBarRow(e,t,n,r,s){const{spanID:a}=e,{serviceName:i}=e.process,{childrenHiddenIDs:o,childrenToggle:l,detailStates:c,detailToggle:d,findMatchesIDs:p,spanNameColumnWidth:u,trace:h,focusSpan:m,hoverIndentGuideIds:g,addHoverIndentGuideId:f,removeHoverIndentGuideId:b,theme:v,createSpanLink:y,focusedSpanId:x,focusedSpanIdForSearch:w}=this.props;if(!h)return null;const _=me(i),k=o.has(a),T=c.has(a),j=!!p&&p.has(a),I=a===x||a===w,S=O(e)||k&&function(e,t){const{depth:n}=e[t];let r=t+1;for(;r<e.length&&e[r].depth>n;r++)if(O(e[r]))return!0;return!1}(h.spans,t);let D=null;if(k){const e=function(e){if(e.length<=1||!L(e[0]))return!1;const t=e[0].depth+1;let n=1;for(;n<e.length&&e[n].depth===t;){if(E(e[n]))return e[n];n++}return null}(h.spans.slice(t));if(e){const t=this.getViewedBounds()(e.startTime,e.startTime+e.duration);D={color:me(e.process.serviceName),operationName:e.operationName,serviceName:e.process.serviceName,viewEnd:t.end,viewStart:t.start}}}const C=e.tags.find((e=>"peer.service"===e.key));let N=null;!e.hasChildren&&C&&(e=>e.tags.some((e=>{let{key:t,value:n}=e;return"span.kind"===t&&"client"===n})))(e)&&(N={serviceName:C.value,color:me(C.value)});const M=nn();return(0,z.jsx)("div",Object.assign({className:M.row,style:r},s,{children:(0,z.jsx)(Ct,{clippingLeft:this.getClipping().left,clippingRight:this.getClipping().right,color:_,columnDivision:u,isChildrenExpanded:!k,isDetailExpanded:T,isMatchingFilter:j,isFocused:I,numTicks:5,onDetailToggled:d,onChildrenToggled:l,rpc:D,noInstrumentedServer:N,showErrorIcon:S,getViewedBounds:this.getViewedBounds(),traceStartTime:h.startTime,span:e,focusSpan:m,hoverIndentGuideIds:g,addHoverIndentGuideId:f,removeHoverIndentGuideId:b,createSpanLink:y})}),n)}renderSpanDetailRow(e,t,n,r){const{spanID:s}=e,{serviceName:a}=e.process,{detailLogItemToggle:i,detailLogsToggle:o,detailProcessToggle:l,detailReferencesToggle:c,detailReferenceItemToggle:d,detailWarningsToggle:p,detailStackTracesToggle:u,detailStates:h,detailTagsToggle:m,detailToggle:g,spanNameColumnWidth:f,trace:b,focusSpan:v,hoverIndentGuideIds:y,addHoverIndentGuideId:x,removeHoverIndentGuideId:w,linksGetter:_,theme:k,createSpanLink:T,focusedSpanId:j,createFocusSpanLink:I}=this.props,S=h.get(s);if(!b||!S)return null;const D=me(a),C=nn();return(0,z.jsx)("div",Object.assign({className:C.row,style:Object.assign({},n,{zIndex:1})},r,{children:(0,z.jsx)(en,{color:D,columnDivision:f,onDetailToggled:g,detailState:S,linksGetter:_,logItemToggle:i,logsToggle:o,processToggle:l,referenceItemToggle:d,referencesToggle:c,warningsToggle:p,stackTracesToggle:u,span:e,tagsToggle:m,traceStartTime:b.startTime,focusSpan:v,hoverIndentGuideIds:y,addHoverIndentGuideId:x,removeHoverIndentGuideId:w,createSpanLink:T,focusedSpanId:j,createFocusSpanLink:I})}),t)}render(){const e=nn(),{scrollElement:t}=this.props;return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(ye,{ref:this.setListView,dataLength:this.getRowStates().length,itemHeightGetter:this.getRowHeight,itemRenderer:this.renderRow,viewBuffer:50,viewBufferMin:50,itemsWrapperClassName:e.rowsWrapper,getKeyFromIndex:this.getKeyFromIndex,getIndexFromKey:this.getIndexFromKey,windowScroller:!1,scrollElement:t}),(0,z.jsx)(a.ToolbarButton,{className:e.scrollToTopButton,onClick:this.scrollToTop,title:"Scroll to top",icon:"arrow-up"})]})}}const pn=(0,a.withTheme2)(dn),un=["setSpanNameColumnWidth","updateNextViewRangeTime","updateViewRangeTime","viewRange","createLinkToExternalSpan","traceTimeline","theme","topOfExploreViewRef","focusedSpanIdForSearch"];function hn(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const mn=(0,a.stylesFactory)((e=>({TraceTimelineViewer:r.iv`
      label: TraceTimelineViewer;
      border-bottom: 1px solid ${l(e,"#bbb")};

      & .json-markup {
        line-height: 17px;
        font-size: 13px;
        font-family: monospace;
        white-space: pre-wrap;
      }

      & .json-markup-key {
        font-weight: bold;
      }

      & .json-markup-bool {
        color: ${l(e,"firebrick")};
      }

      & .json-markup-string {
        color: ${l(e,"teal")};
      }

      & .json-markup-null {
        color: ${l(e,"teal")};
      }

      & .json-markup-number {
        color: ${l(e,"blue","black")};
      }
    `})));class gn extends s.PureComponent{constructor(e){super(e),hn(this,"collapseAll",(()=>{this.props.collapseAll(this.props.trace.spans)})),hn(this,"collapseOne",(()=>{this.props.collapseOne(this.props.trace.spans)})),hn(this,"expandAll",(()=>{this.props.expandAll()})),hn(this,"expandOne",(()=>{this.props.expandOne(this.props.trace.spans)})),this.state={height:0}}componentDidMount(){!function(e){const t=h();Object.keys(e).forEach((n=>{const r=e[n];r&&t.bind(p[n].binding,r)}))}({collapseAll:this.collapseAll,expandAll:this.expandAll,collapseOne:this.collapseOne,expandOne:this.expandOne})}render(){const e=this.props,{setSpanNameColumnWidth:t,updateNextViewRangeTime:n,updateViewRangeTime:r,viewRange:s,createLinkToExternalSpan:a,traceTimeline:i,theme:o,topOfExploreViewRef:l,focusedSpanIdForSearch:c}=e,d=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,un),{trace:p}=d,u=mn(o);return(0,z.jsx)(g.Provider,{value:a,children:(0,z.jsxs)("div",{className:u.TraceTimelineViewer,ref:e=>e&&this.setState({height:e.getBoundingClientRect().height}),children:[(0,z.jsx)(le,{duration:p.duration,nameColumnWidth:i.spanNameColumnWidth,numTicks:5,onCollapseAll:this.collapseAll,onCollapseOne:this.collapseOne,onColummWidthChange:t,onExpandAll:this.expandAll,onExpandOne:this.expandOne,viewRangeTime:s.time,updateNextViewRangeTime:n,updateViewRangeTime:r,columnResizeHandleHeight:this.state.height}),(0,z.jsx)(pn,Object.assign({},d,i,{setSpanNameColumnWidth:t,currentViewRangeTime:s.time.current,topOfExploreViewRef:l,focusedSpanIdForSearch:c}))]})})}}const fn=(0,a.withTheme2)(gn);var bn=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/md/keyboard-arrow-right.js"),vn=n.n(bn),yn=n("./packages/grafana-data/src/index.ts"),xn=n("./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/android-open.js"),wn=n.n(xn);const _n=["isLarge","className"];const kn=()=>({NewWindowIconLarge:r.iv`
      label: NewWindowIconLarge;
      font-size: 1.5em;
    `});function Tn(e){const{isLarge:t,className:n}=e,r=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,_n),s=(0,a.useStyles2)(kn),i=b()({[s.NewWindowIconLarge]:t},n);return(0,z.jsx)(wn(),Object.assign({className:i},r))}var jn;Tn.defaultProps={isLarge:!1};const In=e=>(0,z.jsxs)("a",{href:e.href,title:e.title,target:"_blank",rel:"noopener noreferrer",className:e.className,children:[e.children," ",jn||(jn=(0,z.jsx)(Tn,{}))]});function Sn(e){const{links:t}=e;return(0,z.jsx)(In,{href:t[0].url,title:t[0].text,className:e.className})}const Dn=()=>({BreakableText:r.iv`
      label: BreakableText;
      display: inline-block;
      white-space: pre;
    `}),Cn=/\W*\w+\W*/g;function Nn(e){const{className:t,text:n,wordRegexp:r=Cn}=e,s=(0,a.useStyles2)(Dn);if(!n)return"string"==typeof n?n:null;const i=[];r.exec("");let o=r.exec(n)||[n];for(;o;)i.push((0,z.jsx)("span",{className:t||s.BreakableText,children:o[0]},`${n}-${i.length}`)),o=r.exec(n);return i}Nn.defaultProps={wordRegexp:Cn};const Ln=e=>({TraceName:r.iv`
      label: TraceName;
      font-size: ${e.typography.size.lg};
    `});function En(e){const{className:t,traceName:n}=e,r=(0,a.useStyles2)(Ln),s=String(n||"<trace-without-root-span>"),i=(0,z.jsx)(Nn,{text:s});return(0,z.jsx)("span",{className:b()(r.TraceName,t),children:i})}var Mn=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};function Rn(e,t){return 1===e?function(e){var t;return{get:function(n){if(t&&e(n,t.key))return t.value},put:function(e,n){t={key:e,value:n}}}}(t):function(e,t){var n=[];function r(e){var r=function(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n;return-1}(n,(function(n){return t(e,n.key)}));if(r>-1){var s=n[r];return r>0&&(n.splice(r,1),n.unshift(s)),s.value}}return{get:r,put:function(t,s){r(t)||(n.unshift({key:t,value:s}),n.length>e&&n.pop())}}}(e,t)}function On(e,t){var n=t?function(e,t){return function n(r,s){if(e(r,s))return!0;if(Array.isArray(r))return!(!Array.isArray(s)||r.length!==s.length||!r.every((function(e,t){return n(e,s[t])})));if(Array.isArray(s))return!1;if("object"==typeof r){if("object"!=typeof s)return!1;var a=null===r,i=null===s;if(a||i)return a===i;var o=Object.keys(r),l=Object.keys(s);if(o.length!==l.length)return!1;var c=t?n:e;return!!o.every((function(e){return Mn(r,e)&&Mn(s,e)&&c(r[e],s[e])}))}return!1}}(e,t):e;return function(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r+=1)if(!n(e[r],t[r]))return!1;return!0}}const zn=function(){for(var e=1,t=function(e,t){return e===t},n=!1,r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];"number"==typeof s[0]&&(e=s.shift()),"function"==typeof s[0]?t=s.shift():void 0===s[0]&&s.shift(),"boolean"==typeof s[0]&&(n=s[0]);var i=Rn(e,On(t,n));return function(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var s=i.get(n);return void 0===s&&(s=e.apply(e,n),i.put(n,s)),s}}};var Pn=n("./.yarn/cache/deep-freeze-npm-0.0.1-12d684fc1a-1e43c98e44.zip/node_modules/deep-freeze/index.js");const $n=n.n(Pn)()(Object.defineProperty({archiveEnabled:!1,dependencies:{dagMaxNumServices:100,menuEnabled:!0},linkPatterns:[],menu:[{label:"About Jaeger",items:[{label:"GitHub",url:"https://github.com/uber/jaeger"},{label:"Docs",url:"http://jaeger.readthedocs.io/en/latest/"},{label:"Twitter",url:"https://twitter.com/JaegerTracing"},{label:"Discussion Group",url:"https://groups.google.com/forum/#!forum/jaeger-tracing"},{label:"Gitter.im",url:"https://gitter.im/jaegertracing/Lobby"},{label:"Blog",url:"https://medium.com/jaegertracing/"}]}],search:{maxLookback:{label:"2 Days",value:"2d"},maxLimit:1500},tracking:{gaID:null,trackErrors:!0}},"__mergeFields",{value:["dependencies","search","tracking"]}));function Hn(e){return(0,y.get)($n,e)}function Vn(e){const t=e.references?e.references.find((e=>"CHILD_OF"===e.refType)):null;return t?t.span:null}const Fn=/#\{([^{}]*)\}/g;function An(e){const t=new Set;return e.replace(Fn,((e,n)=>(t.add(n),e))),Array.from(t)}function Bn(e,t,n){return e.replace(Fn,((e,r)=>{const s=n[r];return null==s?"":t(s)}))}function Wn(e,t){if("string"!=typeof e)throw new Error("Invalid template");return{parameters:An(e),template:Bn.bind(null,e,t)}}function Gn(e){if("string"==typeof e)return t=>t===e;if(Array.isArray(e))return t=>e.indexOf(t)>-1;if(null==e)return()=>!0;throw new Error(`Invalid value: ${e}`)}const Kn=e=>e;function Un(e,t){if(t)return t.find((t=>t.key===e))}function qn(e,t){return e.template(t)}function Zn(e,t,n,r){const s=n[r];let a="logs";const i=t.process.tags===n;i&&(a="process");t.tags===n&&(a="tags");const o=[];return e.forEach((e=>{if(e.type(a)&&e.key(s.key)&&e.value(s.value)){const r={},l=e.parameters.every((o=>{let l=Un(o,n);return l||i||(l=function(e,t){let n=t;for(;n;){const t=Un(e,n.tags)||Un(e,n.process.tags);if(t)return t;n=Vn(n)}}(o,t)),l?(r[o]=l.value,!0):(console.warn(`Skipping link pattern, missing parameter ${o} for key ${s.key} in ${a}.`,e.object),!1)}));l&&o.push({url:qn(e.url,r),text:qn(e.text,r)})}})),o}const Xn=(Hn("linkPatterns")||[]).map((function(e){try{const t=Wn(e.url,encodeURIComponent),n=Wn(e.text,Kn);return{object:e,type:Gn(e.type),key:Gn(e.key),value:Gn(e.value),url:t,text:n,parameters:(0,y.uniq)(t.parameters.concat(n.parameters))}}catch(t){return console.error(`Ignoring invalid link pattern: ${t}`,e),null}})).filter(Boolean),Yn=zn(10)((e=>{const t=[];return e?function(e,t){const n=[],r=Object.keys(t).filter((e=>"string"==typeof t[e]||"number"===t[e]));return e.filter((e=>e.type("traces"))).forEach((e=>{const s={};e.parameters.every((e=>{const n=e;return!!r.includes(n)&&(s[e]=t[n],!0)}))&&n.push({url:qn(e.url,s),text:qn(e.text,s)})})),n}(Xn,e):t}));Jn=Xn,Qn=new WeakMap;var Jn,Qn;const er=(0,y.memoize)((function(e){let t;const n=new Set(e.map((e=>{let{spanID:t}=e;return t})));for(let r=0;r<e.length;r++){if(e[r].references&&e[r].references.some((t=>{let{traceID:s,spanID:a}=t;return s===e[r].traceID&&n.has(a)})))continue;if(!t){t=e[r];continue}const s=e[r].references&&e[r].references.length||0,a=t.references&&t.references.length||0;(s<a||s===a&&e[r].startTime<t.startTime)&&(t=e[r])}return t?`${t.process.serviceName}: ${t.operationName}`:""}),(e=>e.length?e[0].traceID:0));function tr(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const nr=(0,a.stylesFactory)((e=>({CanvasSpanGraph:r.iv`
      label: CanvasSpanGraph;
      background: ${l(e,"#fafafa")};
      height: 60px;
      position: absolute;
      width: 100%;
    `})));class rr extends s.PureComponent{constructor(e){super(e),tr(this,"_canvasElm",void 0),tr(this,"getColor",(e=>function(e,t){return he(a.colors).getRgbColorByKey(e)}(e,this.props.theme))),tr(this,"_setCanvasRef",(e=>{this._canvasElm=e})),this._canvasElm=void 0}componentDidMount(){this._draw()}componentDidUpdate(){this._draw()}_draw(){if(this._canvasElm){const{valueWidth:e,items:t}=this.props;!function(e,t,n,r,s){const a=new Map,i=t.length<60?60:Math.min(t.length,200),o=2*window.innerWidth;e.width=o,e.height=i;const l=Math.min(6,Math.max(2,i/t.length)),c=i/t.length,d=e.getContext("2d",{alpha:!1});d.fillStyle=s,d.fillRect(0,0,o,i);for(let e=0;e<t.length;e++){const{valueWidth:s,valueOffset:i,serviceName:p}=t[e],u=i/n*o;let h=s/n*o;h<10&&(h=10);let m=a.get(p);m||(m=`rgba(${r(p).concat(.8).join()})`,a.set(p,m)),d.fillStyle=m,d.fillRect(u,e*c,h,l)}}(this._canvasElm,t,e,this.getColor,l(this.props.theme,"#fff"))}}render(){return(0,z.jsx)("canvas",{className:nr(this.props.theme).CanvasSpanGraph,ref:this._setCanvasRef})}}const sr=(0,a.withTheme2)(rr),ar=()=>({TickLabels:r.iv`
      label: TickLabels;
      height: 1rem;
      position: relative;
    `,TickLabelsLabel:r.iv`
      label: TickLabelsLabel;
      color: #717171;
      font-size: 0.7rem;
      position: absolute;
      user-select: none;
    `});function ir(e){const{numTicks:t,duration:n}=e,r=(0,a.useStyles2)(ar),s=[];for(let e=0;e<t+1;e++){const a=e/t,i=1===a?{right:"0%"}:{left:100*a+"%"};s.push((0,z.jsx)("div",{className:r.TickLabelsLabel,style:i,"data-test":"tick",children:C(n*a)},a))}return(0,z.jsx)("div",{className:r.TickLabels,children:s})}const or=()=>({GraphTick:r.iv`
      label: GraphTick;
      stroke: #aaa;
      stroke-width: 1px;
    `});function lr(e){const{numTicks:t}=e,n=(0,a.useStyles2)(or),r=[];for(let e=1;e<t;e++){const s=e/t*100+"%";r.push((0,z.jsx)("line",{className:n.GraphTick,x1:s,y1:"0%",x2:s,y2:"100%"},e/t))}return(0,z.jsx)("g",{"data-test":"ticks","aria-hidden":"true",children:r})}const cr=()=>({ScrubberHandleExpansion:b()(r.iv`
        label: ScrubberHandleExpansion;
        cursor: col-resize;
        fill-opacity: 0;
        fill: #44f;
      `,"scrubber-handle-expansion"),ScrubberHandle:b()(r.iv`
        label: ScrubberHandle;
        cursor: col-resize;
        fill: #555;
      `,"scrubber-handle"),ScrubberLine:b()(r.iv`
        label: ScrubberLine;
        pointer-events: none;
        stroke: #555;
      `,"scrubber-line"),ScrubberDragging:r.iv`
      label: ScrubberDragging;
      & .scrubber-handle-expansion {
        fill-opacity: 1;
      }
      & .scrubber-handle {
        fill: #44f;
      }
      & > .scrubber-line {
        stroke: #44f;
      }
    `,ScrubberHandles:r.iv`
      label: ScrubberHandles;
      &:hover > .scrubber-handle-expansion {
        fill-opacity: 1;
      }
      &:hover > .scrubber-handle {
        fill: #44f;
      }
      &:hover + .scrubber.line {
        stroke: #44f;
      }
    `});function dr(e){let{isDragging:t,onMouseDown:n,onMouseEnter:r,onMouseLeave:s,position:i}=e;const o=100*i+"%",l=(0,a.useStyles2)(cr),c=b()({[l.ScrubberDragging]:t});return(0,z.jsxs)("g",{className:c,children:[(0,z.jsxs)("g",{className:l.ScrubberHandles,onMouseDown:n,onMouseEnter:r,onMouseLeave:s,children:[(0,z.jsx)("rect",{x:o,className:l.ScrubberHandleExpansion,style:{transform:"translate(-4.5px)"},width:"9",height:"20"}),(0,z.jsx)("rect",{x:o,className:l.ScrubberHandle,style:{transform:"translate(-1.5px)"},width:"3",height:"20"})]}),(0,z.jsx)("line",{className:l.ScrubberLine,y2:"100%",x1:o,x2:o})]})}function pr(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const ur=(0,a.stylesFactory)((e=>{const t="JaegerUiComponents__ViewingLayerResetZoomHoverClassName",n=r.iv`
    label: ViewingLayerResetZoom;
    display: none;
    position: absolute;
    right: 1%;
    top: 10%;
    z-index: 1;
  `;return{ViewingLayer:r.iv`
      label: ViewingLayer;
      cursor: vertical-text;
      position: relative;
      z-index: 1;
      &:hover > .${t} {
        display: unset;
      }
    `,ViewingLayerGraph:r.iv`
      label: ViewingLayerGraph;
      border: 1px solid ${l(e,"#999")};
      /* need !important here to overcome something from semantic UI */
      overflow: visible !important;
      position: relative;
      transform-origin: 0 0;
      width: 100%;
    `,ViewingLayerInactive:r.iv`
      label: ViewingLayerInactive;
      fill: ${l(e,"rgba(214, 214, 214, 0.5)")};
    `,ViewingLayerCursorGuide:r.iv`
      label: ViewingLayerCursorGuide;
      stroke: ${l(e,"#f44")};
      stroke-width: 1;
    `,ViewingLayerDraggedShift:r.iv`
      label: ViewingLayerDraggedShift;
      fill-opacity: 0.2;
    `,ViewingLayerDrag:r.iv`
      label: ViewingLayerDrag;
      fill: ${l(e,"#44f")};
    `,ViewingLayerFullOverlay:r.iv`
      label: ViewingLayerFullOverlay;
      bottom: 0;
      cursor: col-resize;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      user-select: none;
    `,ViewingLayerResetZoom:n,ViewingLayerResetZoomHoverClassName:t}})),hr="SHIFT_END",mr="SHIFT_START",gr="REFRAME";class fr extends s.PureComponent{constructor(e){super(e),pr(this,"state",void 0),pr(this,"_root",void 0),pr(this,"_draggerReframe",void 0),pr(this,"_draggerStart",void 0),pr(this,"_draggerEnd",void 0),pr(this,"_setRoot",(e=>{this._root=e})),pr(this,"_getDraggingBounds",(e=>{if(!this._root)throw new Error("invalid state");const{left:t,width:n}=this._root.getBoundingClientRect(),[r,s]=this.props.viewRange.time.current;let a=1,i=0;return e===mr?a=s:e===hr&&(i=r),{clientXLeft:t,maxValue:a,minValue:i,width:n}})),pr(this,"_handleReframeMouseMove",(e=>{let{value:t}=e;this.props.updateNextViewRangeTime({cursor:t})})),pr(this,"_handleReframeMouseLeave",(()=>{this.props.updateNextViewRangeTime({cursor:null})})),pr(this,"_handleReframeDragUpdate",(e=>{let{value:t}=e;const n=t,{time:r}=this.props.viewRange,s={reframe:{anchor:r.reframe?r.reframe.anchor:n,shift:n}};this.props.updateNextViewRangeTime(s)})),pr(this,"_handleReframeDragEnd",(e=>{let{manager:t,value:n}=e;const{time:r}=this.props.viewRange,s=r.reframe?r.reframe.anchor:n,[a,i]=n<s?[n,s]:[s,n];t.resetBounds(),this.props.updateViewRangeTime(a,i,"minimap")})),pr(this,"_handleScrubberEnterLeave",(e=>{let{type:t}=e;const n=t===q.MouseEnter;this.setState({preventCursorLine:n})})),pr(this,"_handleScrubberDragUpdate",(e=>{let{event:t,tag:n,type:r,value:s}=e;r===q.DragStart&&t.stopPropagation(),n===mr?this.props.updateNextViewRangeTime({shiftStart:s}):n===hr&&this.props.updateNextViewRangeTime({shiftEnd:s})})),pr(this,"_handleScrubberDragEnd",(e=>{let{manager:t,tag:n,value:r}=e;const[s,a]=this.props.viewRange.time.current;let i;if(n===mr)i=[r,a];else{if(n!==hr)throw new Error("bad state");i=[s,r]}t.resetBounds(),this.setState({preventCursorLine:!1}),this.props.updateViewRangeTime(i[0],i[1],"minimap")})),pr(this,"_resetTimeZoomClickHandler",(()=>{this.props.updateViewRangeTime(0,1)})),this._draggerReframe=new Y({getBounds:this._getDraggingBounds,onDragEnd:this._handleReframeDragEnd,onDragMove:this._handleReframeDragUpdate,onDragStart:this._handleReframeDragUpdate,onMouseMove:this._handleReframeMouseMove,onMouseLeave:this._handleReframeMouseLeave,tag:gr}),this._draggerStart=new Y({getBounds:this._getDraggingBounds,onDragEnd:this._handleScrubberDragEnd,onDragMove:this._handleScrubberDragUpdate,onDragStart:this._handleScrubberDragUpdate,onMouseEnter:this._handleScrubberEnterLeave,onMouseLeave:this._handleScrubberEnterLeave,tag:mr}),this._draggerEnd=new Y({getBounds:this._getDraggingBounds,onDragEnd:this._handleScrubberDragEnd,onDragMove:this._handleScrubberDragUpdate,onDragStart:this._handleScrubberDragUpdate,onMouseEnter:this._handleScrubberEnterLeave,onMouseLeave:this._handleScrubberEnterLeave,tag:hr}),this._root=void 0,this.state={preventCursorLine:!1}}componentWillUnmount(){this._draggerReframe.dispose(),this._draggerEnd.dispose(),this._draggerStart.dispose()}_getMarkers(e,t){const n=ur(this.props.theme),r=function(e,t){const[n,r]=e<t?[e,t]:[t,e];return{x:100*n+"%",width:100*(r-n)+"%",leadingX:100*t+"%"}}(e,t);return[(0,z.jsx)("rect",{className:b()(n.ViewingLayerDraggedShift,n.ViewingLayerDrag),x:r.x,y:"0",width:r.width,height:this.props.height-2},"fill"),(0,z.jsx)("rect",{className:b()(n.ViewingLayerDrag),x:r.leadingX,y:"0",width:"1",height:this.props.height-2},"edge")]}render(){const{height:e,viewRange:t,numTicks:n,theme:r}=this.props,{preventCursorLine:s}=this.state,{current:i,cursor:o,shiftStart:l,shiftEnd:c,reframe:d}=t.time,p=null!=l||null!=c||null!=d,[u,h]=i;let m=0;u&&(m=100*u);let g,f=100;h&&(f=100-100*h),p||null==o||s||(g=100*o+"%");const v=ur(r);return(0,z.jsxs)("div",{"aria-hidden":!0,className:v.ViewingLayer,style:{height:e},children:[(0!==u||1!==h)&&(0,z.jsx)(a.Button,{onClick:this._resetTimeZoomClickHandler,className:b()(v.ViewingLayerResetZoom,v.ViewingLayerResetZoomHoverClassName),type:"button",variant:"secondary",children:"Reset Selection"}),(0,z.jsxs)("svg",{height:e,className:v.ViewingLayerGraph,ref:this._setRoot,onMouseDown:this._draggerReframe.handleMouseDown,onMouseLeave:this._draggerReframe.handleMouseLeave,onMouseMove:this._draggerReframe.handleMouseMove,children:[m>0&&(0,z.jsx)("rect",{x:0,y:0,height:"100%",width:`${m}%`,className:v.ViewingLayerInactive}),f>0&&(0,z.jsx)("rect",{x:100-f+"%",y:0,height:"100%",width:`${f}%`,className:v.ViewingLayerInactive}),(0,z.jsx)(lr,{numTicks:n}),g&&(0,z.jsx)("line",{className:v.ViewingLayerCursorGuide,x1:g,y1:"0",x2:g,y2:e-2,strokeWidth:"1"}),null!=l&&this._getMarkers(u,l),null!=c&&this._getMarkers(h,c),(0,z.jsx)(dr,{isDragging:null!=l,onMouseDown:this._draggerStart.handleMouseDown,onMouseEnter:this._draggerStart.handleMouseEnter,onMouseLeave:this._draggerStart.handleMouseLeave,position:u||0}),(0,z.jsx)(dr,{isDragging:null!=c,position:h||1,onMouseDown:this._draggerEnd.handleMouseDown,onMouseEnter:this._draggerEnd.handleMouseEnter,onMouseLeave:this._draggerEnd.handleMouseLeave}),null!=d&&this._getMarkers(d.anchor,d.shift)]}),p&&(0,z.jsx)("div",{className:v.ViewingLayerFullOverlay})]})}}const br=(0,a.withTheme2)(fr);var vr;function yr(e){return{valueOffset:e.relativeStartTime,valueWidth:e.duration,serviceName:e.process.serviceName}}const xr=(0,ce.Z)((function(e){return e.spans.map(yr)}));class wr extends s.PureComponent{render(){const{height:e,trace:t,viewRange:n,updateNextViewRangeTime:r,updateViewRangeTime:s}=this.props;if(!t)return vr||(vr=(0,z.jsx)("div",{}));const a=xr(t);return(0,z.jsxs)("div",{className:b()(v.GL,v.H3),children:[(0,z.jsx)(ir,{numTicks:4,duration:t.duration}),(0,z.jsxs)("div",{className:v.WW,children:[(0,z.jsx)(sr,{valueWidth:t.duration,items:a}),(0,z.jsx)(br,{viewRange:n,numTicks:4,height:e||60,updateViewRangeTime:s,updateNextViewRangeTime:r})]})]})}}var _r,kr,Tr;Tr={height:60},(kr="defaultProps")in(_r=wr)?Object.defineProperty(_r,kr,{value:Tr,enumerable:!0,configurable:!0,writable:!0}):_r[kr]=Tr;const jr=["renderer"];const Ir=e=>({TracePageHeader:r.iv`
      label: TracePageHeader;
      & > :first-child {
        border-bottom: 1px solid ${l(e,"#e8e8e8")};
      }
      & > :nth-child(2) {
        background-color: ${l(e,"#eee")};
        border-bottom: 1px solid ${l(e,"#e4e4e4")};
      }
      & > :last-child {
        border-bottom: 1px solid ${l(e,"#ccc")};
      }
    `,TracePageHeaderTitleRow:r.iv`
      label: TracePageHeaderTitleRow;
      align-items: center;
      display: flex;
    `,TracePageHeaderBack:r.iv`
      label: TracePageHeaderBack;
      align-items: center;
      align-self: stretch;
      background-color: #fafafa;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      color: inherit;
      display: flex;
      font-size: 1.4rem;
      padding: 0 1rem;
      margin-bottom: -1px;
      &:hover {
        background-color: #f0f0f0;
        border-color: #ccc;
      }
    `,TracePageHeaderTitleLink:r.iv`
      label: TracePageHeaderTitleLink;
      align-items: center;
      display: flex;
      flex: 1;

      &:hover * {
        text-decoration: underline;
      }
      &:hover > *,
      &:hover small {
        text-decoration: none;
      }
    `,TracePageHeaderDetailToggle:r.iv`
      label: TracePageHeaderDetailToggle;
      font-size: 2.5rem;
      transition: transform 0.07s ease-out;
    `,TracePageHeaderDetailToggleExpanded:r.iv`
      label: TracePageHeaderDetailToggleExpanded;
      transform: rotate(90deg);
    `,TracePageHeaderTitle:r.iv`
      label: TracePageHeaderTitle;
      color: inherit;
      flex: 1;
      font-size: 1.7em;
      line-height: 1em;
      margin: 0 0 0 0.5em;
      padding-bottom: 0.5em;
    `,TracePageHeaderTitleCollapsible:r.iv`
      label: TracePageHeaderTitleCollapsible;
      margin-left: 0;
    `,TracePageHeaderOverviewItems:r.iv`
      label: TracePageHeaderOverviewItems;
      border-bottom: 1px solid #e4e4e4;
      padding: 0.25rem 0.5rem !important;
    `,TracePageHeaderOverviewItemValueDetail:b()(r.iv`
        label: TracePageHeaderOverviewItemValueDetail;
        color: #aaa;
      `,"trace-item-value-detail"),TracePageHeaderOverviewItemValue:r.iv`
      label: TracePageHeaderOverviewItemValue;
      &:hover > .trace-item-value-detail {
        color: unset;
      }
    `,TracePageHeaderArchiveIcon:r.iv`
      label: TracePageHeaderArchiveIcon;
      font-size: 1.78em;
      margin-right: 0.15em;
    `,TracePageHeaderTraceId:r.iv`
      label: TracePageHeaderTraceId;
      white-space: nowrap;
    `}),Sr=[{key:"timestamp",label:"Trace Start:",renderer(e,t,n){const r=(0,yn.dateTimeFormat)(e.startTime/1e3,{timeZone:t,defaultWithMS:!0}),s=r.match(/^(.+)(:\d\d\.\d+)$/);return s?(0,z.jsxs)("span",{className:n.TracePageHeaderOverviewItemValue,children:[s[1],(0,z.jsx)("span",{className:n.TracePageHeaderOverviewItemValueDetail,children:s[2]})]}):r}},{key:"duration",label:"Duration:",renderer:e=>C(e.duration)},{key:"service-count",label:"Services:",renderer:e=>new Set((0,y.values)(e.processes).map((e=>e.serviceName))).size},{key:"depth",label:"Depth:",renderer:e=>(0,y.get)((0,y.maxBy)(e.spans,"depth"),"depth",0)+1},{key:"span-count",label:"Total Spans:",renderer:e=>e.spans.length}];function Dr(e){const{canCollapse:t,hideMap:n,hideSummary:r,onSlimViewClicked:i,slimView:o,trace:l,updateNextViewRangeTime:c,updateViewRangeTime:d,viewRange:p,timeZone:u}=e,h=(0,a.useStyles2)(Ir),m=s.useMemo((()=>l?Yn(l):[]),[l]);if(!l)return null;const g=!r&&!o&&Sr.map((e=>{const{renderer:t}=e,n=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,jr);return Object.assign({},n,{value:t(l,u,h)})})),f=(0,z.jsxs)("h1",{className:b()(h.TracePageHeaderTitle,t&&h.TracePageHeaderTitleCollapsible),children:[(0,z.jsx)(En,{traceName:er(l.spans)})," ",(0,z.jsx)("small",{className:b()(h.TracePageHeaderTraceId,v.pQ),children:l.traceID})]});return(0,z.jsxs)("header",{className:h.TracePageHeader,children:[(0,z.jsxs)("div",{className:h.TracePageHeaderTitleRow,children:[m&&m.length>0&&(0,z.jsx)(Sn,{links:m,className:h.TracePageHeaderBack}),t?(0,z.jsxs)("a",{className:h.TracePageHeaderTitleLink,onClick:i,role:"switch","aria-checked":!o,children:[(0,z.jsx)(vn(),{className:b()(h.TracePageHeaderDetailToggle,!o&&h.TracePageHeaderDetailToggleExpanded)}),f]}):f]}),g&&(0,z.jsx)(Rt,{className:h.TracePageHeaderOverviewItems,items:g}),!n&&!o&&(0,z.jsx)(wr,{trace:l,viewRange:p,updateNextViewRangeTime:c,updateViewRangeTime:d})]})}function Cr(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class Nr{constructor(e){Cr(this,"isTagsOpen",void 0),Cr(this,"isProcessOpen",void 0),Cr(this,"logs",void 0),Cr(this,"references",void 0),Cr(this,"isWarningsOpen",void 0),Cr(this,"isStackTracesOpen",void 0),Cr(this,"isReferencesOpen",void 0);const{isTagsOpen:t,isProcessOpen:n,isReferencesOpen:r,isWarningsOpen:s,isStackTracesOpen:a,logs:i,references:o}=e||{};this.isTagsOpen=Boolean(t),this.isProcessOpen=Boolean(n),this.isReferencesOpen=Boolean(r),this.isWarningsOpen=Boolean(s),this.isStackTracesOpen=Boolean(a),this.logs={isOpen:Boolean(i&&i.isOpen),openedItems:i&&i.openedItems?new Set(i.openedItems):new Set},this.references={isOpen:Boolean(o&&o.isOpen),openedItems:o&&o.openedItems?new Set(o.openedItems):new Set}}toggleTags(){const e=new Nr(this);return e.isTagsOpen=!this.isTagsOpen,e}toggleProcess(){const e=new Nr(this);return e.isProcessOpen=!this.isProcessOpen,e}toggleReferences(){const e=new Nr(this);return e.references.isOpen=!this.references.isOpen,e}toggleReferenceItem(e){const t=new Nr(this);return t.references.openedItems.has(e)?t.references.openedItems.delete(e):t.references.openedItems.add(e),t}toggleWarnings(){const e=new Nr(this);return e.isWarningsOpen=!this.isWarningsOpen,e}toggleStackTraces(){const e=new Nr(this);return e.isStackTracesOpen=!this.isStackTracesOpen,e}toggleLogs(){const e=new Nr(this);return e.logs.isOpen=!this.logs.isOpen,e}toggleLogItem(e){const t=new Nr(this);return t.logs.openedItems.has(e)?t.logs.openedItems.delete(e):t.logs.openedItems.add(e),t}}var Lr=n("./.yarn/cache/reselect-npm-4.1.5-bc046e41ae-54c13c1e79.zip/node_modules/reselect/es/index.js");class Er{static iterFunction(e,t=0){return n=>e(n.value,n,t)}static searchFunction(e){return"function"==typeof e?e:(t,n)=>e instanceof Er?n===e:t===e}constructor(e,t=[]){this.value=e,this.children=t}get depth(){return this.children.reduce(((e,t)=>Math.max(t.depth+1,e)),1)}get size(){let e=0;return this.walk((()=>e++)),e}addChild(e){return this.children.push(e instanceof Er?e:new Er(e)),this}find(e){if(Er.iterFunction(Er.searchFunction(e))(this))return this;for(let t=0;t<this.children.length;t++){const n=this.children[t].find(e);if(n)return n}return null}getPath(e){const t=Er.iterFunction(Er.searchFunction(e)),n=(e,r)=>{const s=r.concat([e]);if(t(e))return s;for(let t=0;t<e.children.length;t++){const r=e.children[t],a=n(r,s);if(a)return a}return null};return n(this,[])}walk(e,t=0){const n=[];let r=t;for(n.push({node:this,depth:r});n.length;){const{node:t,depth:s}=n.pop();e(t.value,t,s),r=s+1;let a=t.children.length-1;for(;a>=0;)n.push({node:t.children[a],depth:r}),a--}}}const Mr=e=>e.serviceName;var Rr=n("./.yarn/cache/fuzzy-npm-0.1.3-a0dfe08bd0-acc09c6173.zip/node_modules/fuzzy/lib/fuzzy.js"),Or=n.n(Rr);const zr=e=>e.spanID,Pr=e=>e.operationName,$r=e=>e.duration,Hr=e=>e.startTime,Vr=e=>e.processID,Fr=(0,Lr.P1)((0,Lr.P1)((({span:e})=>e),(e=>e.references||[])),(({type:e})=>e),((e,t)=>e.find((e=>e.refType===t)))),Ar=((0,Lr.P1)((e=>Fr({span:e,type:"CHILD_OF"})),(e=>e?e.spanID:null)),(0,Lr.P1)((e=>{if(!e.process)throw new Error("\n      you must hydrate the spans with the processes, perhaps\n      using hydrateSpansWithProcesses(), before accessing a span's process\n    ");return e.process}),Mr)),Br=((0,Lr.P1)((({spans:e})=>e),(({leftBound:e})=>e),(({rightBound:e})=>e),((e,t,n)=>e.filter((e=>Hr(e)>=t&&Hr(e)<=n)))),(0,Lr.P1)((({spans:e})=>e),(({text:e})=>e),((e,t)=>Or().filter(t,e,{extract:e=>`${Ar(e)} ${Pr(e)}`}).map((({original:e})=>e))))),Wr=(0,Lr.P1)(Br,(e=>e.reduce(((e,t)=>({...e,[zr(t)]:t})),{}))),Gr=((0,Lr.P1)((({spans:e})=>e),Wr,((e,t)=>e.map((e=>({...e,muted:!t[zr(e)]}))))),e=>e.spans),Kr=e=>e.processes,Ur=(0,Lr.P1)((e=>e.span),(e=>e.processes),((e,t)=>({...e,process:t[Vr(e)]}))),qr=(0,Lr.P1)(Gr,(e=>e.reduce(((e,t)=>e.set(zr(t),t)),new Map)));function Zr(e){const t=new Map(e.spans.map((e=>[e.spanID,new Er(e.spanID)]))),n=new Map(e.spans.map((e=>[e.spanID,e]))),r=new Er("__root__");e.spans.forEach((e=>{const n=t.get(e.spanID);if(Array.isArray(e.references)&&e.references.length){const{refType:s,spanID:a}=e.references[0];if("CHILD_OF"!==s&&"FOLLOWS_FROM"!==s)throw new Error(`Unrecognized ref type: ${s}`);(t.get(a)||r).children.push(n)}else r.children.push(n)}));const s=(e,t)=>{const r=n.get(e.value),s=n.get(t.value);return+(r.startTime>s.startTime)||+(r.startTime===s.startTime)-1};return e.spans.forEach((e=>{const n=t.get(e.spanID);n.children.length>1&&n.children.sort(s)})),r.children.sort(s),r}(0,Lr.P1)(Gr,(e=>e.length));const Xr=(0,Lr.P1)(Gr,(e=>e.reduce(((e,t)=>e?Math.min(e,Hr(t)):Hr(t)),null))),Yr=(0,Lr.P1)(Gr,Xr,((e,t)=>e.reduce(((e,n)=>e?Math.max(Hr(n)-t+$r(n),e):$r(n)),null))),Jr=((0,Lr.P1)(Xr,Yr,((e,t)=>e+t)),(0,Lr.P1)(Zr,qr,((e,t)=>e.children.map((e=>t.get(e.value))).sort(((e,t)=>{return n=Hr(e),r=Hr(t),n-r;var n,r}))[0]))),Qr=((0,Lr.P1)(Zr,(e=>e.depth-1)),(0,Lr.P1)((0,Lr.P1)((e=>e.trace),Zr),(0,Lr.P1)((e=>e.span),zr),((e,t)=>e.getPath(t).length-1)),(0,Lr.P1)(Kr,(e=>Object.keys(e).reduce(((t,n)=>t.add(Mr(e[n]))),new Set)))),es=((0,Lr.P1)(Qr,(e=>e.size)),{ms:function(e){const t=D(e,I,_);return`${w().duration(t/_).asMilliseconds()}ms`},s:function(e){const t=D(e,I,k);return`${w().duration(t/_).asSeconds()}s`}}),ts=(0,Lr.P1)(Yr,(e=>e>=k?es.s:es.ms)),ns=((0,Lr.P1)((({duration:e})=>e),(({unit:e})=>es[e]),((e,t)=>t(e))),(0,Lr.P1)((({duration:e})=>e),(0,Lr.P1)((({trace:e})=>e),ts),((e,t)=>t(e))),(0,Lr.P1)((({trace:e})=>e),(({spans:e})=>e),(({sort:e})=>e),((e,t,{dir:n,comparator:r,selector:s})=>[...t].sort(((t,a)=>n*r(s(t,e),s(a,e)))))),(0,Lr.P1)(Zr,(e=>{const t=new Map;let n=0;return e.walk((e=>t.set(e,n++))),t})));(0,Lr.P1)((0,Lr.P1)((e=>e.trace),Zr),(0,Lr.P1)((e=>e.span),zr),((e,t)=>{const n=e.find(t);return n?n.size-1:-1})),(0,Lr.P1)((0,Lr.P1)((({trace:e})=>e),ns),(({span:e})=>e),((e,t)=>e.get(zr(t)))),(0,Lr.P1)((0,Lr.P1)((0,Lr.P1)((e=>{const t=Gr(e),n=Kr(e);return{...e,spans:t.map((e=>Ur({span:e,processes:n})))}}),Jr),(0,Lr.zB)({name:Pr,serviceName:Ar})),(({name:e,serviceName:t})=>`${t}: ${e}`)),(0,Lr.P1)((({spans:e})=>e),(0,Lr.P1)((({trace:e})=>e),Zr),(({collapsed:e})=>e),((e,t,n)=>{const r=n.reduce(((e,n)=>(t.find(n).walk((t=>t!==n&&e.add(t))),e)),new Set);return r.size>0?e.filter((e=>!r.has(zr(e)))):e})),(0,Lr.P1)((({trace:e})=>e),(({interval:e=4})=>e),(({width:e=3})=>e),((e,t,n)=>[...Array(t+1).keys()].map((r=>({timestamp:Xr(e)+Yr(e)*(r/t),width:n}))))),(0,Lr.P1)((e=>e),Gr,((e,t)=>{const n=new Map;return{...e,spans:t.reduce(((e,t)=>{const r=n.has(zr(t))?`${zr(t)}_${n.get(zr(t))}`:zr(t),s={...t,spanID:r};return r!==zr(t)&&console.warn("duplicate spanID in trace replaced",zr(t),"new:",r),n.set(zr(t),(n.get(zr(t))||0)+1),e.concat([s])}),[])}})),(0,Lr.P1)((e=>e),Gr,((e,t)=>({...e,spans:t.filter((e=>!!Hr(e)))})));function rs(e){const t=new Map;return{tags:e.reduce(((e,n)=>(e.some((e=>e.key===n.key&&e.value===n.value))?t.set(`${n.key}:${n.value}`,`Duplicate tag "${n.key}:${n.value}"`):e.push(n),e)),[]),warnings:Array.from(t.values())}}function ss(e,t){const n=e.slice(),r=(t||[]).map((e=>e.toLowerCase()));return n.sort(((e,t)=>{const n=e.key.toLowerCase(),s=t.key.toLowerCase();for(let e=0;e<r.length;e++){const t=r[e];if(n.startsWith(t)&&!s.startsWith(t))return-1;if(!n.startsWith(t)&&s.startsWith(t))return 1}return n>s?1:n<s?-1:0})),n}function as(e){if(null==e||!e.traceID)return null;const t=e.traceID.toLowerCase();let n=0,r=Number.MAX_SAFE_INTEGER;const s=new Map,a=new Map;e.spans=e.spans.filter((e=>Boolean(e.startTime)));const i=e.spans.length;for(let t=0;t<i;t++){const i=e.spans[t],{startTime:o,duration:l,processID:c}=i;let d=i.spanID;o<r&&(r=o),o+l>n&&(n=o+l);const p=s.get(d);null!=p?(console.warn(`Dupe spanID, ${p+1} x ${d}`,i,a.get(d)),(0,y.isEqual)(i,a.get(d))&&console.warn("\t two spans with same ID have `isEqual(...) === true`"),s.set(d,p+1),d=`${d}_${p}`,i.spanID=d):s.set(d,1),i.process=e.processes[c],a.set(d,i)}const o=Zr(e),l=[],c={};o.walk((function(e,n){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if("__root__"===e)return;const i=a.get(e);if(!i)return;const{serviceName:o}=i.process;c[o]=(c[o]||0)+1,i.relativeStartTime=i.startTime-r,i.depth=s-1,i.hasChildren=n.children.length>0,i.childSpanCount=n.children.length,i.warnings=i.warnings||[],i.tags=i.tags||[],i.references=i.references||[];const d=rs(i.tags);i.tags=ss(d.tags,Hn("topTagPrefixes")),i.warnings=i.warnings.concat(d.warnings),i.references.forEach(((n,r)=>{const s=a.get(n.spanID);s&&(n.span=s,r>0&&(s.subsidiarilyReferencedBy=s.subsidiarilyReferencedBy||[],s.subsidiarilyReferencedBy.push({spanID:e,traceID:t,span:i,refType:n.refType})))})),l.push(i)}));const d=er(l);return{services:Object.keys(c).map((e=>({name:e,numberOfSpans:c[e]}))),spans:l,traceID:t,traceName:d,processes:e.processes,duration:n-r,startTime:r,endTime:n}}function is(e,t){if(!t)return;const n=[],r=[];e.split(/\s+/).filter(Boolean).forEach((e=>{"-"===e[0]?r.push(e.slice(1).toLowerCase()):n.push(e.toLowerCase())}));const s=(e,t)=>e.some((e=>t.toLowerCase().includes(e))),a=e=>!!e&&e.some((e=>!s(r,e.key)&&(s(n,e.key)||s(n,e.value.toString()))));return new Set(t.filter((e=>s(n,e.operationName)||s(n,e.process.serviceName)||a(e.tags)||null!==e.logs&&e.logs.some((e=>a(e.fields)))||a(e.process.tags)||n.some((t=>t===e.spanID)))).map((e=>e.spanID)))}},"./packages/jaeger-ui-components/src/uberUtilityStyles.ts":(e,t,n)=>{"use strict";n.d(t,{A4:()=>p,GL:()=>c,H3:()=>l,Im:()=>m,K9:()=>f,NY:()=>v,WW:()=>s,b$:()=>h,bi:()=>a,h2:()=>o,im:()=>i,oD:()=>d,pQ:()=>b,ty:()=>g,xb:()=>u});var r=n("./.yarn/__virtual__/@emotion-css-virtual-15ef12e38d/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");const s=r.iv`
  position: relative;
`,a=r.iv`
  margin-bottom: 0.25rem;
`,i=r.iv`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`,o=r.iv`
  margin: 0;
`,l=r.iv`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`,c=r.iv`
  padding-bottom: 0.5rem;
`,d=r.iv`
  display: flex;
`,p=(r.iv`
  align-items: center;
`,r.iv`
  align-items: start;
`,r.iv`
  flex: 1 1 auto;
  min-width: 0; /* 1 */
  min-height: 0; /* 1 */
`),u=r.iv`
  text-align: right;
`,h=r.iv`
  display: inline-block;
`,m=r.iv`
  margin: -0.2rem 0.25rem 0 0;
`,g=r.iv`
  text-overflow: ellipsis;
`,f=r.iv`
  width: 100%;
`,b=r.iv`
  color: #aaa;
`,v=r.iv`
  justify-content: flex-end;
`},"./public/app/core/utils/tracing.ts":(e,t,n)=>{"use strict";n.d(t,{et:()=>s,fy:()=>i,nO:()=>a,np:()=>l});var r=n("./packages/grafana-data/src/index.ts");function s(e){e.sort(((e,t)=>e[0]-t[0]));return e.reduce(((e,t)=>{if(!e.length)return[t];const n=e.slice(-1)[0],[r,s]=n,[a,i]=t;return i<s?e:a>s?[...e,t]:[...e.slice(0,-1),[r,i]]}),[]).reduce(((e,t)=>e+(t[1]-t[0])),0)}function a(e){const t={};let n;for(let r=0;n=e(r),n;r++){t[n.id]?t[n.id].span=n.span:t[n.id]={span:n.span,children:[]};for(const e of n.parentIds)e&&(t[e]?t[e].children.push(n.id):t[e]={span:void 0,children:[n.id]})}return t}function i(e,t,n){return{main:`${o(e)}ms (${o(e/t*100)}%)`,secondary:`${o(n)}ms (${o(n/e*100)}%)`}}function o(e){return parseFloat(e.toFixed(2))}function l(){return[new r.MutableDataFrame({fields:[{name:r.NodeGraphDataFrameFieldNames.id,type:r.FieldType.string},{name:r.NodeGraphDataFrameFieldNames.title,type:r.FieldType.string},{name:r.NodeGraphDataFrameFieldNames.subTitle,type:r.FieldType.string},{name:r.NodeGraphDataFrameFieldNames.mainStat,type:r.FieldType.string,config:{displayName:"Total time (% of trace)"}},{name:r.NodeGraphDataFrameFieldNames.secondaryStat,type:r.FieldType.string,config:{displayName:"Self time (% of total)"}},{name:r.NodeGraphDataFrameFieldNames.color,type:r.FieldType.number,config:{color:{mode:"continuous-GrYlRd"},displayName:"Self time / Trace duration"}}],meta:{preferredVisualisationType:"nodeGraph"}}),new r.MutableDataFrame({fields:[{name:r.NodeGraphDataFrameFieldNames.id,type:r.FieldType.string},{name:r.NodeGraphDataFrameFieldNames.target,type:r.FieldType.string},{name:r.NodeGraphDataFrameFieldNames.source,type:r.FieldType.string}],meta:{preferredVisualisationType:"nodeGraph"}})]}},"./public/app/plugins/datasource/jaeger/responseTransform.ts":(e,t,n)=>{"use strict";n.d(t,{Wp:()=>i,c6:()=>l,xM:()=>a});var r=n("./packages/grafana-data/src/index.ts"),s=n("./packages/jaeger-ui-components/src/index.ts");function a(e){const t=e.spans.map((t=>{return n=t,r=e.processes,{spanID:n.spanID,traceID:n.traceID,parentSpanID:null===(s=n.references)||void 0===s||null===(a=s.find((e=>"CHILD_OF"===e.refType)))||void 0===a?void 0:a.spanID,operationName:n.operationName,startTime:n.startTime/1e3,duration:n.duration/1e3,logs:n.logs.map((e=>Object.assign({},e,{timestamp:e.timestamp/1e3}))),tags:n.tags,warnings:null!==(i=n.warnings)&&void 0!==i?i:void 0,stackTraces:n.stackTraces,serviceName:r[n.processID].serviceName,serviceTags:r[n.processID].tags};var n,r,s,a,i})),n=new r.MutableDataFrame({fields:[{name:"traceID",type:r.FieldType.string},{name:"spanID",type:r.FieldType.string},{name:"parentSpanID",type:r.FieldType.string},{name:"operationName",type:r.FieldType.string},{name:"serviceName",type:r.FieldType.string},{name:"serviceTags",type:r.FieldType.other},{name:"startTime",type:r.FieldType.number},{name:"duration",type:r.FieldType.number},{name:"logs",type:r.FieldType.other},{name:"tags",type:r.FieldType.other},{name:"warnings",type:r.FieldType.other},{name:"stackTraces",type:r.FieldType.other}],meta:{preferredVisualisationType:"trace",custom:{traceFormat:"jaeger"}}});for(const e of t)n.add(e);return n}function i(e,t){const n=new r.MutableDataFrame({fields:[{name:"traceID",type:r.FieldType.string,config:{unit:"string",displayNameFromDS:"Trace ID",links:[{title:"Trace: ${__value.raw}",url:"",internal:{datasourceUid:t.uid,datasourceName:t.name,query:{query:"${__value.raw}"}}}]}},{name:"traceName",type:r.FieldType.string,config:{displayNameFromDS:"Trace name"}},{name:"startTime",type:r.FieldType.time,config:{displayNameFromDS:"Start time"}},{name:"duration",type:r.FieldType.number,config:{displayNameFromDS:"Duration",unit:"µs"}}],meta:{preferredVisualisationType:"table"}}),s=e.map(o).sort(((e,t)=>(null==t?void 0:t.startTime)-(null==e?void 0:e.startTime)));for(const e of s)n.add(e);return n}function o(e){const t=(0,s.R1)(e);if(t)return{traceID:t.traceID,startTime:t.startTime/1e3,duration:t.duration,traceName:t.traceName}}function l(e){let t={traceID:"",spans:[],processes:{},warnings:null},n=[];for(let r=0;r<e.length;r++){const s=e.get(r);t.traceID||(t.traceID=s.traceID),n.find((e=>e===s.serviceName))||(n.push(s.serviceName),t.processes[`p${n.length}`]={serviceName:s.serviceName,tags:s.serviceTags}),t.spans.push({traceID:s.traceID,spanID:s.spanID,duration:1e3*s.duration,references:s.parentSpanID?[{refType:"CHILD_OF",spanID:s.parentSpanID,traceID:s.traceID}]:[],flags:0,logs:s.logs.map((e=>Object.assign({},e,{timestamp:1e3*e.timestamp}))),operationName:s.operationName,processID:Object.keys(t.processes).find((e=>t.processes[e].serviceName===s.serviceName))||"",startTime:1e3*s.startTime,tags:s.tags,warnings:s.warnings?s.warnings:null})}return{data:[t],total:0,limit:0,offset:0,errors:null}}},"./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/cache/prop-types-npm-15.8.1-17c71ee7ee-c056d3f1c0.zip/node_modules/prop-types/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}var o=function(e,t){var n=e.children,a=e.color,i=e.size,o=e.style,l=e.width,c=e.height,d=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["children","color","size","style","width","height"]),p=t.reactIconBase,u=void 0===p?{}:p,h=i||u.size||"1em";return s.default.createElement("svg",r({children:n,fill:"currentColor",preserveAspectRatio:"xMidYMid meet",height:c||h,width:l||h},u,d,{style:r({verticalAlign:"middle",color:a||u.color},u.style||{},o)}))};o.propTypes={color:a.default.string,size:a.default.oneOfType([a.default.string,a.default.number]),width:a.default.oneOfType([a.default.string,a.default.number]),height:a.default.oneOfType([a.default.string,a.default.number]),style:a.default.object},o.contextTypes={reactIconBase:a.default.shape(o.propTypes)},t.default=o,e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/alert.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m25 37.5h-10v-7.5h10v7.5z m-1.2-12.5h-7.5l-1.3-22.5h10z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/android-open.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m31.6 31.6v-10.3h3.4v10.3c0 1.8-1.6 3.4-3.4 3.4h-23.2c-1.8 0-3.4-1.6-3.4-3.4v-23.2c0-1.8 1.6-3.4 3.4-3.4h10.4v3.4h-10.4v23.2h23.2z m-9.1-26.6h12.5v12.5h-3.4v-6.8l-16.8 16.8-2.3-2.3 16.8-16.8h-6.8v-3.4z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/arrow-right-a.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m35 20l-15 15v-8.7h-15v-12.5h15v-8.8z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/chevron-right.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m23.3 20l-13.1-13.6c-0.3-0.3-0.3-0.9 0-1.2l2.4-2.4c0.3-0.3 0.9-0.4 1.2-0.1l16 16.7c0.1 0.1 0.2 0.4 0.2 0.6s-0.1 0.5-0.2 0.6l-16 16.7c-0.3 0.3-0.9 0.3-1.2 0l-2.4-2.5c-0.3-0.3-0.3-0.9 0-1.2z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/ios-arrow-down.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m31 12.5l1.5 1.6-12.5 13.4-12.5-13.4 1.5-1.6 11 11.7z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/ios-arrow-right.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m12.5 9l1.6-1.5 13.4 12.5-13.4 12.5-1.6-1.5 11.7-11z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/io/link.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m20 16.3z m8.8-3.8c3.4 0 6.2 2.8 6.2 6.3v2.5c0 3.4-2.8 6.2-6.2 6.2h-8.8c-2.6 0-4.7-1.6-5.7-3.7-0.3-0.8-0.5-1.6-0.5-2.5v-2.5h3.7v2.5c0 1.4 1.1 2.5 2.5 2.5h8.8c1.4 0 2.5-1.1 2.5-2.5v-2.5c0-1.5-1.1-2.5-2.5-2.5h-1.3c-0.5-2.5-2.5-3.8-2.5-3.8h3.8z m-3 3.8c0.3 0.7 0.5 1.6 0.5 2.5v2.5h-3.8v-2.5c0-1.5-1.1-2.5-2.5-2.5h-8.7c-1.5 0-2.5 1-2.5 2.5v2.5c0 1.4 1 2.5 2.5 2.5h1.2c0.5 2.4 2.5 3.7 2.5 3.7h-3.7c-3.5 0-6.3-2.8-6.3-6.2v-2.5c0-3.5 2.8-6.3 6.3-6.3h8.7c2.6 0 4.8 1.6 5.8 3.8z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/md/file-upload.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m8.4 30h23.2v3.4h-23.2v-3.4z m6.6-3.4v-10h-6.6l11.6-11.6 11.6 11.6h-6.6v10h-10z"})))},e.exports=t.default},"./.yarn/__virtual__/react-icons-virtual-f314220a93/0/cache/react-icons-npm-2.2.7-c2e0e4d90b-74e692fdd3.zip/node_modules/react-icons/lib/md/keyboard-arrow-right.js":(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=i(n("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js")),a=i(n("./.yarn/__virtual__/react-icon-base-virtual-e209b164a7/0/cache/react-icon-base-npm-2.1.0-caadf8254e-62b6bfe486.zip/node_modules/react-icon-base/lib/index.js"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return s.default.createElement(a.default,r({viewBox:"0 0 40 40"},e),s.default.createElement("g",null,s.default.createElement("path",{d:"m14.3 27.3l7.7-7.7-7.7-7.7 2.3-2.3 10 10-10 10z"})))},e.exports=t.default},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/index.js":(e,t,n)=>{"use strict";e.exports=function(e,t){var n=this,r=n.constructor;return n.options=Object.assign({storeInstancesGlobally:!0},t||{}),n.callbacks={},n.directMap={},n.sequenceLevels={},n.resetTimer=null,n.ignoreNextKeyup=!1,n.ignoreNextKeypress=!1,n.nextExpectedAction=!1,n.element=e,n.addEvents(),n.options.storeInstancesGlobally&&r.instances.push(n),n},e.exports.prototype.bind=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bind.js"),e.exports.prototype.bindMultiple=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bindMultiple.js"),e.exports.prototype.unbind=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/unbind.js"),e.exports.prototype.trigger=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/trigger.js"),e.exports.prototype.reset=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/reset.js"),e.exports.prototype.stopCallback=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/stopCallback.js"),e.exports.prototype.handleKey=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/handleKey.js"),e.exports.prototype.addEvents=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/addEvents.js"),e.exports.prototype.bindSingle=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bindSingle.js"),e.exports.prototype.getKeyInfo=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/getKeyInfo.js"),e.exports.prototype.pickBestAction=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/pickBestAction.js"),e.exports.prototype.getReverseMap=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/getReverseMap.js"),e.exports.prototype.getMatches=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/getMatches.js"),e.exports.prototype.resetSequences=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/resetSequences.js"),e.exports.prototype.fireCallback=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/fireCallback.js"),e.exports.prototype.bindSequence=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bindSequence.js"),e.exports.prototype.resetSequenceTimer=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/resetSequenceTimer.js"),e.exports.prototype.detach=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/detach.js"),e.exports.instances=[],e.exports.reset=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/reset.js"),e.exports.REVERSE_MAP=null},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/addEvents.js":(e,t,n)=>{"use strict";e.exports=function(){var e=this,t=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/dom-event.js"),r=e.element;e.eventHandler=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/handleKeyEvent.js").bind(e),t(r,"keypress",e.eventHandler),t(r,"keydown",e.eventHandler),t(r,"keyup",e.eventHandler)}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bind.js":e=>{"use strict";e.exports=function(e,t,n){return e=e instanceof Array?e:[e],this.bindMultiple(e,t,n),this}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bindMultiple.js":e=>{"use strict";e.exports=function(e,t,n){for(var r=0;r<e.length;++r)this.bindSingle(e[r],t,n)}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bindSequence.js":(e,t,n)=>{"use strict";e.exports=function(e,t,r,s){var a=this;function i(t){return function(){a.nextExpectedAction=t,++a.sequenceLevels[e],a.resetSequenceTimer()}}function o(t){var i;a.fireCallback(r,t,e),"keyup"!==s&&(i=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/characterFromEvent.js"),a.ignoreNextKeyup=i(t)),setTimeout((function(){a.resetSequences()}),10)}a.sequenceLevels[e]=0;for(var l=0;l<t.length;++l){var c=l+1===t.length?o:i(s||a.getKeyInfo(t[l+1]).action);a.bindSingle(t[l],c,s,e,l)}}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/bindSingle.js":e=>{"use strict";e.exports=function(e,t,n,r,s){var a=this;a.directMap[e+":"+n]=t;var i,o=(e=e.replace(/\s+/g," ")).split(" ");o.length>1?a.bindSequence(e,o,t,n):(i=a.getKeyInfo(e,n),a.callbacks[i.key]=a.callbacks[i.key]||[],a.getMatches(i.key,i.modifiers,{type:i.action},r,e,s),a.callbacks[i.key][r?"unshift":"push"]({callback:t,modifiers:i.modifiers,action:i.action,seq:r,level:s,combo:e}))}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/detach.js":(e,t,n)=>{var r=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/dom-event.js").off;e.exports=function(){var e=this,t=e.element;r(t,"keypress",e.eventHandler),r(t,"keydown",e.eventHandler),r(t,"keyup",e.eventHandler)}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/dom-event.js":e=>{function t(e,t,n,r){return!e.addEventListener&&(t="on"+t),(e.addEventListener||e.attachEvent).call(e,t,n,r),n}e.exports=t,e.exports.on=t,e.exports.off=function(e,t,n,r){return!e.removeEventListener&&(t="on"+t),(e.removeEventListener||e.detachEvent).call(e,t,n,r),n}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/fireCallback.js":(e,t,n)=>{"use strict";e.exports=function(e,t,r,s){this.stopCallback(t,t.target||t.srcElement,r,s)||!1===e(t,r)&&(n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/preventDefault.js")(t),n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/stopPropagation.js")(t))}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/getKeyInfo.js":(e,t,n)=>{"use strict";e.exports=function(e,t){var r,s,a,i,o,l,c=[];for(r=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/keysFromString.js")(e),i=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/special-aliases.js"),o=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/shift-map.js"),l=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/isModifier.js"),a=0;a<r.length;++a)i[s=r[a]]&&(s=i[s]),t&&"keypress"!==t&&o[s]&&(s=o[s],c.push("shift")),l(s)&&c.push(s);return{key:s,modifiers:c,action:t=this.pickBestAction(s,c,t)}}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/getMatches.js":(e,t,n)=>{"use strict";e.exports=function(e,t,r,s,a,i){var o,l,c,d,p=this,u=[],h=r.type;"keypress"!==h||r.code&&"Arrow"===r.code.slice(0,5)||(p.callbacks["any-character"]||[]).forEach((function(e){u.push(e)}));if(!p.callbacks[e])return u;for(c=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/isModifier.js"),"keyup"===h&&c(e)&&(t=[e]),o=0;o<p.callbacks[e].length;++o)if(l=p.callbacks[e][o],(s||!l.seq||p.sequenceLevels[l.seq]===l.level)&&h===l.action&&(d=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/modifiersMatch.js"),"keypress"===h&&!r.metaKey&&!r.ctrlKey||d(t,l.modifiers))){var m=!s&&l.combo===a,g=s&&l.seq===s&&l.level===i;(m||g)&&p.callbacks[e].splice(o,1),u.push(l)}return u}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/getReverseMap.js":(e,t,n)=>{"use strict";e.exports=function(){var e,t=this.constructor;if(!t.REVERSE_MAP)for(var r in t.REVERSE_MAP={},e=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/special-keys-map.js"))r>95&&r<112||e.hasOwnProperty(r)&&(t.REVERSE_MAP[e[r]]=r);return t.REVERSE_MAP}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/handleKey.js":(e,t,n)=>{"use strict";e.exports=function(e,t,r){var s,a,i,o,l=this,c={},d=0,p=!1;for(s=l.getMatches(e,t,r),a=0;a<s.length;++a)s[a].seq&&(d=Math.max(d,s[a].level));for(a=0;a<s.length;++a)if(s[a].seq){if(s[a].level!==d)continue;p=!0,c[s[a].seq]=1,l.fireCallback(s[a].callback,r,s[a].combo,s[a].seq)}else p||l.fireCallback(s[a].callback,r,s[a].combo);o="keypress"===r.type&&l.ignoreNextKeypress,i=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/isModifier.js"),r.type!==l.nextExpectedAction||i(e)||o||l.resetSequences(c),l.ignoreNextKeypress=p&&"keydown"===r.type}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/handleKeyEvent.js":(e,t,n)=>{"use strict";e.exports=function(e){var t,r=this;"number"!=typeof e.which&&(e.which=e.keyCode);var s=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/characterFromEvent.js")(e);void 0!==s&&("keyup"!==e.type||r.ignoreNextKeyup!==s?(t=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/eventModifiers.js"),r.handleKey(s,t(e),e)):r.ignoreNextKeyup=!1)}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/modifiersMatch.js":e=>{"use strict";e.exports=function(e,t){return e.sort().join(",")===t.sort().join(",")}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/pickBestAction.js":e=>{"use strict";e.exports=function(e,t,n){return n||(n=this.getReverseMap()[e]?"keydown":"keypress"),"keypress"===n&&t.length&&(n="keydown"),n}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/reset.js":e=>{"use strict";e.exports=function(){return this.callbacks={},this.directMap={},this}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/resetSequenceTimer.js":e=>{"use strict";e.exports=function(){var e=this;clearTimeout(e.resetTimer),e.resetTimer=setTimeout((function(){e.resetSequences()}),1e3)}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/resetSequences.js":e=>{"use strict";e.exports=function(e){var t=this;e=e||{};var n,r=!1;for(n in t.sequenceLevels)e[n]?r=!0:t.sequenceLevels[n]=0;r||(t.nextExpectedAction=!1)}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/stopCallback.js":e=>{"use strict";e.exports=function(e,t){if((" "+t.className+" ").indexOf(" combokeys ")>-1)return!1;var n=t.tagName.toLowerCase();return"input"===n||"select"===n||"textarea"===n||t.isContentEditable}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/trigger.js":e=>{"use strict";e.exports=function(e,t){return this.directMap[e+":"+t]&&this.directMap[e+":"+t]({},e),this}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/prototype/unbind.js":e=>{"use strict";e.exports=function(e,t){return this.bind(e,(function(){}),t)}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/Combokeys/reset.js":e=>{"use strict";e.exports=function(){this.instances.forEach((function(e){e.reset()}))}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/characterFromEvent.js":(e,t,n)=>{"use strict";e.exports=function(e){var t,r;if(t=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/special-keys-map.js"),r=n("./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/special-characters-map.js"),"keypress"===e.type){var s=String.fromCharCode(e.which);return e.shiftKey||(s=s.toLowerCase()),s}return void 0!==t[e.which]?t[e.which]:void 0!==r[e.which]?r[e.which]:String.fromCharCode(e.which).toLowerCase()}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/eventModifiers.js":e=>{"use strict";e.exports=function(e){var t=[];return e.shiftKey&&t.push("shift"),e.altKey&&t.push("alt"),e.ctrlKey&&t.push("ctrl"),e.metaKey&&t.push("meta"),t}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/isModifier.js":e=>{"use strict";e.exports=function(e){return"shift"===e||"ctrl"===e||"alt"===e||"meta"===e}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/keysFromString.js":e=>{"use strict";e.exports=function(e){return"+"===e?["+"]:e.split("+")}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/preventDefault.js":e=>{"use strict";e.exports=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/shift-map.js":e=>{"use strict";e.exports={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/special-aliases.js":e=>{"use strict";e.exports={option:"alt",command:"meta",return:"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/special-characters-map.js":e=>{"use strict";e.exports={106:"*",107:"plus",109:"minus",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"}},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/special-keys-map.js":e=>{"use strict";e.exports={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",173:"minus",187:"plus",189:"minus",224:"meta"};for(var t=1;t<20;++t)e.exports[111+t]="f"+t;for(t=0;t<=9;++t)e.exports[t+96]=t},"./.yarn/cache/combokeys-npm-3.0.1-45601d2e33-37ad8d0257.zip/node_modules/combokeys/helpers/stopPropagation.js":e=>{"use strict";e.exports=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}},"./.yarn/cache/copy-to-clipboard-npm-3.3.1-18029bce99-3c7b1c333d.zip/node_modules/copy-to-clipboard/index.js":(e,t,n)=>{"use strict";var r=n("./.yarn/cache/toggle-selection-npm-1.0.6-c506b73005-a90dc80ed1.zip/node_modules/toggle-selection/index.js"),s={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var n,a,i,o,l,c,d=!1;t||(t={}),n=t.debug||!1;try{if(i=r(),o=document.createRange(),l=document.getSelection(),(c=document.createElement("span")).textContent=e,c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",(function(r){if(r.stopPropagation(),t.format)if(r.preventDefault(),void 0===r.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var a=s[t.format]||s.default;window.clipboardData.setData(a,e)}else r.clipboardData.clearData(),r.clipboardData.setData(t.format,e);t.onCopy&&(r.preventDefault(),t.onCopy(r.clipboardData))})),document.body.appendChild(c),o.selectNodeContents(c),l.addRange(o),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");d=!0}catch(r){n&&console.error("unable to copy using execCommand: ",r),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),d=!0}catch(r){n&&console.error("unable to copy using clipboardData: ",r),n&&console.error("falling back to prompt"),a=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(a,e)}}finally{l&&("function"==typeof l.removeRange?l.removeRange(o):l.removeAllRanges()),c&&document.body.removeChild(c),i()}return d}},"./.yarn/cache/deep-freeze-npm-0.0.1-12d684fc1a-1e43c98e44.zip/node_modules/deep-freeze/index.js":e=>{e.exports=function e(t){return Object.freeze(t),Object.getOwnPropertyNames(t).forEach((function(n){!t.hasOwnProperty(n)||null===t[n]||"object"!=typeof t[n]&&"function"!=typeof t[n]||Object.isFrozen(t[n])||e(t[n])})),t}},"./.yarn/cache/fuzzy-npm-0.1.3-a0dfe08bd0-acc09c6173.zip/node_modules/fuzzy/lib/fuzzy.js":e=>{var t;t={},e.exports=t,t.simpleFilter=function(e,n){return n.filter((function(n){return t.test(e,n)}))},t.test=function(e,n){return null!==t.match(e,n)},t.match=function(e,t,n){n=n||{};var r,s=0,a=[],i=t.length,o=0,l=0,c=n.pre||"",d=n.post||"",p=n.caseSensitive&&t||t.toLowerCase();e=n.caseSensitive&&e||e.toLowerCase();for(var u=0;u<i;u++)r=t[u],p[u]===e[s]?(r=c+r+d,s+=1,l+=1+l):l=0,o+=l,a[a.length]=r;return s===e.length?(o=p===e?1/0:o,{rendered:a.join(""),score:o}):null},t.filter=function(e,n,r){return n&&0!==n.length?"string"!=typeof e?n:(r=r||{},n.reduce((function(n,s,a,i){var o=s;r.extract&&(o=r.extract(s));var l=t.match(e,o,r);return null!=l&&(n[n.length]={string:l.rendered,score:l.score,index:a,original:s}),n}),[]).sort((function(e,t){var n=t.score-e.score;return n||e.index-t.index}))):[]}},"./.yarn/cache/json-markup-npm-1.1.3-2762e9da70-aa4e1935fc.zip/node_modules/json-markup/index.js":e=>{"use strict";var t="    ";function n(e){return e?function(t){return'style="'+(n=e["."+t],r="",n&&Object.keys(n).forEach((function(e){r+=e+":"+n[e]+";"})),r+'"');var n,r}:function(e){return'class="'+e+'"'}}function r(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")}e.exports=function(e,s){var a="",i=n(s),o=function(e,n,r,s){if(!e.length)return n+" "+r;var i=n+"\n";return a+=t,e.forEach((function(t,n){i+=a+s(t)+(n<e.length-1?",":"")+"\n"})),a=a.slice(0,-t.length),i+a+r};return"<div "+i("json-markup")+">"+function e(t){if(void 0===t)return"";switch(function(e){return null===e?"null":Array.isArray(e)?"array":"string"==typeof e&&/^https?:/.test(e)?"link":"object"==typeof e&&"function"==typeof e.toISOString?"date":typeof e}(t)){case"boolean":return"<span "+i("json-markup-bool")+">"+t+"</span>";case"number":return"<span "+i("json-markup-number")+">"+t+"</span>";case"date":return'<span class="json-markup-string">"'+r(t.toISOString())+'"</span>';case"null":return"<span "+i("json-markup-null")+">null</span>";case"string":return"<span "+i("json-markup-string")+'>"'+r(t.replace(/\n/g,"\n"+a))+'"</span>';case"link":return"<span "+i("json-markup-string")+'>"<a href="'+r(t)+'">'+r(t)+'</a>"</span>';case"array":return o(t,"[","]",e);case"object":var n=Object.keys(t).filter((function(e){return void 0!==t[e]}));return o(n,"{","}",(function(n){return"<span "+i("json-markup-key")+'>"'+n+'":</span> '+e(t[n])}))}return""}(e)+"</div>"}},"./.yarn/cache/toggle-selection-npm-1.0.6-c506b73005-a90dc80ed1.zip/node_modules/toggle-selection/index.js":e=>{e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}}}}]);
//# sourceMappingURL=6187.a87fd0ce1ff28bec28a3.js.map