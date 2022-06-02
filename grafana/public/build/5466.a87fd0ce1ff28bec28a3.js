(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[5466],{"./public/app/core/components/NodeGraphSettings.tsx":(e,a,t)=>{"use strict";t.d(a,{n:()=>l});var n,s=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),o=(t("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),t("./packages/grafana-data/src/index.ts")),r=t("./packages/grafana-ui/src/index.ts"),i=t("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function l(e){var a;let{options:t,onOptionsChange:s}=e;const l=(0,r.useStyles)(c);return(0,i.jsxs)("div",{className:l.container,children:[n||(n=(0,i.jsx)("h3",{className:"page-heading",children:"Node Graph"})),(0,i.jsx)(r.InlineFieldRow,{className:l.row,children:(0,i.jsx)(r.InlineField,{tooltip:"Enables the Node Graph visualization in the trace viewer.",label:"Enable Node Graph",labelWidth:26,children:(0,i.jsx)(r.InlineSwitch,{id:"enableNodeGraph",value:null===(a=t.jsonData.nodeGraph)||void 0===a?void 0:a.enabled,onChange:e=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:s,options:t},"nodeGraph",Object.assign({},t.jsonData.nodeGraph,{enabled:e.currentTarget.checked}))})})})]})}const c=e=>({container:s.css`
    label: container;
    width: 100%;
  `,row:s.css`
    label: row;
    align-items: baseline;
  `})},"./public/app/core/components/TraceToLogs/TraceToLogsSettings.tsx":(e,a,t)=>{"use strict";t.d(a,{Z:()=>m});var n,s,o,r=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),i=(t("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),t("./packages/grafana-data/src/index.ts")),l=t("./packages/grafana-runtime/src/index.ts"),c=t("./packages/grafana-ui/src/index.ts"),d=t("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const u=e=>{let{values:a,onChange:t,id:r,keyPlaceholder:i="Key",valuePlaceholder:l="Value (optional)"}=e;const u=(0,c.useStyles)(p);return(0,d.jsx)("div",{className:u.wrapper,children:a.length?a.map(((e,o)=>(0,d.jsxs)("div",{className:u.pair,children:[(0,d.jsx)(c.SegmentInput,{id:`${r}-key-${o}`,placeholder:i,value:e.key,onChange:e=>{t(a.map(((a,t)=>(t===o&&(a.key=String(e)),a))))}}),(0,d.jsx)(c.InlineLabel,{"aria-label":"equals",className:u.operator,width:3,children:"="}),(0,d.jsx)(c.SegmentInput,{id:`${r}-value-${o}`,placeholder:l,value:e.value,onChange:e=>{t(a.map(((a,t)=>(t===o&&(a.value=String(e)),a))))}}),(0,d.jsx)("button",{onClick:()=>t([...a.slice(0,o),...a.slice(o+1)]),className:"gf-form-label query-part","aria-label":"Remove tag",children:n||(n=(0,d.jsx)(c.Icon,{name:"times"}))}),o===a.length-1?(0,d.jsx)("button",{onClick:()=>t([...a,{key:"",value:""}]),className:"gf-form-label query-part","aria-label":"Add tag",children:s||(s=(0,d.jsx)(c.Icon,{name:"plus"}))}):null]},o))):(0,d.jsx)("button",{onClick:()=>t([...a,{key:"",value:""}]),className:"gf-form-label query-part","aria-label":"Add tag",children:o||(o=(0,d.jsx)(c.Icon,{name:"plus"}))})})},p=e=>({wrapper:r.css`
    display: flex;
    flex-direction: column;
    gap: ${e.spacing.xs} 0;
  `,pair:r.css`
    display: flex;
    justify-content: start;
    align-items: center;
  `,operator:r.css`
    color: ${e.palette.orange};
  `});var g;function m(e){var a,t,n,s,o,p,m,f,b,v,y,j,x,D;let{options:T,onOptionsChange:I}=e;const w=(0,c.useStyles)(h);return(0,d.jsxs)("div",{className:(0,r.css)({width:"100%"}),children:[g||(g=(0,d.jsx)("h3",{className:"page-heading",children:"Trace to logs"})),(0,d.jsx)("div",{className:w.infoText,children:"Trace to logs lets you navigate from a trace span to the selected data source's log."}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{tooltip:"The data source the trace is going to navigate to",label:"Data source",labelWidth:26,children:(0,d.jsx)(l.DataSourcePicker,{inputId:"trace-to-logs-data-source-picker",logs:!0,current:null===(a=T.jsonData.tracesToLogs)||void 0===a?void 0:a.datasourceUid,noDefault:!0,width:40,onChange:e=>{var a;return(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{datasourceUid:e.uid,tags:null===(a=T.jsonData.tracesToLogs)||void 0===a?void 0:a.tags}))}})})}),null!==(t=T.jsonData.tracesToLogs)&&void 0!==t&&t.mapTagNamesEnabled?(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{tooltip:"Tags that will be used in the Loki query. Default tags: 'cluster', 'hostname', 'namespace', 'pod'",label:"Tags",labelWidth:26,children:(0,d.jsx)(u,{keyPlaceholder:"Tag",values:null!==(n=null!==(s=null===(o=T.jsonData.tracesToLogs)||void 0===o?void 0:o.mappedTags)&&void 0!==s?s:null===(p=T.jsonData.tracesToLogs)||void 0===p||null===(m=p.tags)||void 0===m?void 0:m.map((e=>({key:e}))))&&void 0!==n?n:[],onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{mappedTags:e}))})})}):(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{tooltip:"Tags that will be used in the Loki query. Default tags: 'cluster', 'hostname', 'namespace', 'pod'",label:"Tags",labelWidth:26,children:(0,d.jsx)(c.TagsInput,{tags:null===(f=T.jsonData.tracesToLogs)||void 0===f?void 0:f.tags,width:40,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{tags:e}))})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Map tag names",labelWidth:26,grow:!0,tooltip:"Map trace tag names to log label names. Ex: k8s.pod.name -> pod",children:(0,d.jsx)(c.InlineSwitch,{id:"mapTagNames",value:null!==(b=null===(v=T.jsonData.tracesToLogs)||void 0===v?void 0:v.mapTagNamesEnabled)&&void 0!==b&&b,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{mapTagNamesEnabled:e.currentTarget.checked}))})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Span start time shift",labelWidth:26,grow:!0,tooltip:"Shifts the start time of the span. Default 0 (Time units can be used here, for example: 5s, 1m, 3h)",children:(0,d.jsx)(c.Input,{type:"text",placeholder:"1h",width:40,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{spanStartTimeShift:e.currentTarget.value})),value:(null===(y=T.jsonData.tracesToLogs)||void 0===y?void 0:y.spanStartTimeShift)||""})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Span end time shift",labelWidth:26,grow:!0,tooltip:"Shifts the end time of the span. Default 0 Time units can be used here, for example: 5s, 1m, 3h",children:(0,d.jsx)(c.Input,{type:"text",placeholder:"1h",width:40,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{spanEndTimeShift:e.currentTarget.value})),value:(null===(j=T.jsonData.tracesToLogs)||void 0===j?void 0:j.spanEndTimeShift)||""})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Filter by Trace ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Trace ID. Appends '|=<trace id>' to the query.",children:(0,d.jsx)(c.InlineSwitch,{id:"filterByTraceID",value:null===(x=T.jsonData.tracesToLogs)||void 0===x?void 0:x.filterByTraceID,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{filterByTraceID:e.currentTarget.checked}))})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Filter by Span ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Span ID. Appends '|=<span id>' to the query.",children:(0,d.jsx)(c.InlineSwitch,{id:"filterBySpanID",value:null===(D=T.jsonData.tracesToLogs)||void 0===D?void 0:D.filterBySpanID,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{filterBySpanID:e.currentTarget.checked}))})})})]})}const h=e=>({infoText:r.css`
    padding-bottom: ${e.spacing.md};
    color: ${e.colors.textSemiWeak};
  `})},"./public/app/plugins/datasource/jaeger/module.ts":(e,a,t)=>{"use strict";t.r(a),t.d(a,{plugin:()=>$});var n=t("./packages/grafana-data/src/index.ts"),s=t("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),o=t("./packages/grafana-ui/src/index.ts"),r=t("./public/app/core/components/NodeGraphSettings.tsx"),i=t("./public/app/core/components/TraceToLogs/TraceToLogsSettings.tsx"),l=t("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");var c=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),d=t("./public/app/core/actions/index.ts"),u=t("./public/app/core/copy/appNotification.ts"),p=t("./public/app/store/store.ts"),g=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js"),m=t.n(g);function h(e){if(!e)return"";const a=m().parse(e);return Object.keys(a).forEach((e=>{const t=a[e];"string"!=typeof t&&(a[e]=String(t))})),JSON.stringify(a)}function f(e){if(!e)return"";try{return m().stringify(JSON.parse(e))}catch{return e}}var b=t("./.yarn/__virtual__/react-transition-group-virtual-8df824fae8/0/cache/react-transition-group-npm-4.4.2-5052c30656-b67bf5b3e8.zip/node_modules/react-transition-group/esm/CSSTransition.js");const v="e.g. 1.2s, 100ms, 500us";function y(e){let{query:a,onChange:t}=e;const[n,r]=(0,s.useState)(!1),i=(0,o.useStyles)(j);return(0,l.jsxs)("div",{children:[(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)("div",{className:i.advancedOptionsContainer,onClick:()=>r(!n),children:(0,l.jsxs)(o.InlineLabel,{as:"div",children:["Advanced options"," ",(0,l.jsx)(o.Icon,{className:n?i.angleUp:i.angleDown,name:"angle-down"})]})})}),(0,l.jsx)(b.Z,{in:n,mountOnEnter:!0,unmountOnExit:!0,timeout:300,classNames:i,children:(0,l.jsxs)("div",{children:[(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Min Duration",labelWidth:21,grow:!0,children:(0,l.jsx)(o.Input,{id:"minDuration",name:"minDuration",value:a.minDuration||"",placeholder:v,onChange:e=>t(Object.assign({},a,{minDuration:e.currentTarget.value}))})})}),(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Max Duration",labelWidth:21,grow:!0,children:(0,l.jsx)(o.Input,{id:"maxDuration",name:"maxDuration",value:a.maxDuration||"",placeholder:v,onChange:e=>t(Object.assign({},a,{maxDuration:e.currentTarget.value}))})})}),(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Limit",labelWidth:21,grow:!0,tooltip:"Maximum numbers of returned results",children:(0,l.jsx)(o.Input,{id:"limit",name:"limit",value:a.limit||"",type:"number",onChange:e=>t(Object.assign({},a,{limit:e.currentTarget.value?parseInt(e.currentTarget.value,10):void 0}))})})})]})})]})}function j(e){return{advancedOptionsContainer:c.css`
      margin: 0 ${e.spacing.xs} ${e.spacing.xs} 0;
      width: 100%;
      cursor: pointer;
    `,enter:c.css`
      label: enter;
      height: 0;
      opacity: 0;
    `,enterActive:c.css`
      label: enterActive;
      height: 108px;
      opacity: 1;
      transition: height 300ms ease, opacity 300ms ease;
    `,exit:c.css`
      label: exit;
      height: 108px;
      opacity: 1;
    `,exitActive:c.css`
      label: exitActive;
      height: 0;
      opacity: 0;
      transition: height 300ms ease, opacity 300ms ease;
    `,angleUp:c.css`
      transform: rotate(-180deg);
      transition: transform 300ms;
    `,angleDown:c.css`
      transform: rotate(0deg);
      transition: transform 300ms;
    `}}const x={label:"All",value:void 0};function D(e){let{datasource:a,query:t,onChange:n}=e;const[r,i]=(0,s.useState)(),[g,m]=(0,s.useState)(),[h,b]=(0,s.useState)({services:!1,operations:!1}),v=(0,s.useCallback)((async(e,t)=>{b((e=>Object.assign({},e,{[t]:!0})));try{const n=await a.metadataRequest(e);if(!n)return[{label:`No ${t} found`,value:`No ${t} found`}];return n.sort().map((e=>({label:e,value:e})))}catch(e){return(0,p.WI)((0,d.$l)((0,u.t_)("Error",e))),[]}finally{b((e=>Object.assign({},e,{[t]:!1})))}}),[a]);return(0,s.useEffect)((()=>{(async()=>{const e=await v("/api/services","services");i(e)})()}),[a,v]),(0,s.useEffect)((()=>{t.service&&(async()=>{const e=await v(`/api/services/${encodeURIComponent(t.service)}/operations`,"operations");m([x,...e])})()}),[a,t.service,v]),(0,l.jsxs)("div",{className:(0,c.css)({maxWidth:"500px"}),children:[(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Service",labelWidth:14,grow:!0,children:(0,l.jsx)(o.AsyncSelect,{inputId:"service",menuShouldPortal:!0,cacheOptions:!1,loadOptions:()=>v("/api/services","services"),onOpenMenu:()=>v("/api/services","services"),isLoading:h.services,value:(null==r?void 0:r.find((e=>(null==e?void 0:e.value)===t.service)))||void 0,onChange:e=>n(Object.assign({},t,{service:null==e?void 0:e.value,operation:t.service!==(null==e?void 0:e.value)?void 0:t.operation})),menuPlacement:"bottom",isClearable:!0,defaultOptions:!0,"aria-label":"select-service-name"})})}),(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Operation",labelWidth:14,grow:!0,disabled:!t.service,children:(0,l.jsx)(o.AsyncSelect,{inputId:"operation",menuShouldPortal:!0,cacheOptions:!1,loadOptions:()=>v(`/api/services/${encodeURIComponent(t.service)}/operations`,"operations"),onOpenMenu:()=>v(`/api/services/${encodeURIComponent(t.service)}/operations`,"operations"),isLoading:h.operations,value:(null==g?void 0:g.find((e=>e.value===t.operation)))||null,onChange:e=>n(Object.assign({},t,{operation:(null==e?void 0:e.value)||void 0})),menuPlacement:"bottom",isClearable:!0,defaultOptions:!0,"aria-label":"select-operation-name"})})}),(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Tags",labelWidth:14,grow:!0,children:(0,l.jsx)(o.Input,{id:"tags",value:f(t.tags),placeholder:"http.status_code=200 error=true",onChange:e=>n(Object.assign({},t,{tags:e.currentTarget.value}))})})}),(0,l.jsx)(y,{query:t,onChange:n})]})}var T=t("./.yarn/cache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),I=t("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"),w=t("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),O=t("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js"),S=t("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),_=t("./packages/grafana-runtime/src/index.ts"),F=t("./public/app/core/utils/fetch.ts"),C=t("./public/app/features/dashboard/services/TimeSrv.ts"),N=t("./public/app/core/utils/tracing.ts");function k(e){const{nodes:a,edges:t}=function(e){const a=[],t=[],s=function(e){let a=0,t=1/0;for(const n of e)n.startTime<t&&(t=n.startTime),n.startTime+n.duration>a&&(a=n.startTime+n.duration);return a-t}(e.spans),o=(0,N.nO)((a=>{var t;if(a>=e.spans.length)return;const n=e.spans[a];return{span:n,id:n.spanID,parentIds:(null===(t=n.references)||void 0===t?void 0:t.filter((e=>"CHILD_OF"===e.refType)).map((e=>e.spanID)))||[]}}));for(const c of e.spans){var r,i,l;const d=e.processes[c.processID],u=o[c.spanID].children.map((e=>{const a=o[e].span;return[a.startTime,a.startTime+a.duration]})),p=(0,N.et)(u),g=c.duration-p,m=(0,N.fy)(c.duration/1e3,s/1e3,g/1e3);a.push({[n.NodeGraphDataFrameFieldNames.id]:c.spanID,[n.NodeGraphDataFrameFieldNames.title]:null!==(r=null==d?void 0:d.serviceName)&&void 0!==r?r:"",[n.NodeGraphDataFrameFieldNames.subTitle]:c.operationName,[n.NodeGraphDataFrameFieldNames.mainStat]:m.main,[n.NodeGraphDataFrameFieldNames.secondaryStat]:m.secondary,[n.NodeGraphDataFrameFieldNames.color]:g/s});const h=null===(i=c.references)||void 0===i||null===(l=i.find((e=>"CHILD_OF"===e.refType)))||void 0===l?void 0:l.spanID;h&&o[h].span&&t.push({[n.NodeGraphDataFrameFieldNames.id]:h+"--"+c.spanID,[n.NodeGraphDataFrameFieldNames.target]:c.spanID,[n.NodeGraphDataFrameFieldNames.source]:h})}return{nodes:a,edges:t}}(e),[s,o]=(0,N.np)();for(const e of a)s.add(e);for(const e of t)o.add(e);return[s,o]}var q=t("./public/app/plugins/datasource/jaeger/responseTransform.ts");function L(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}class z extends n.DataSourceApi{constructor(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,C.$t)();super(e),L(this,"uploadedJson",null),L(this,"nodeGraph",void 0),this.instanceSettings=e,this.timeSrv=a,this.instanceSettings=e,this.timeSrv=a,this.nodeGraph=e.jsonData.nodeGraph}async metadataRequest(e,a){return(await(0,I.n)(this._request(e,a,{hideFromInspector:!0}))).data.data}query(e){const a=e.targets[0];if(!a)return(0,w.of)({data:[P]});if("search"!==a.queryType&&a.query)return this._request(`/api/traces/${encodeURIComponent((0,_.getTemplateSrv)().replace(a.query,e.scopedVars))}`).pipe((0,O.U)((e=>{var a,t,n;const s=null==e||null===(a=e.data)||void 0===a||null===(t=a.data)||void 0===t?void 0:t[0];if(!s)return{data:[P]};let o=[(0,q.xM)(s)];return null!==(n=this.nodeGraph)&&void 0!==n&&n.enabled&&o.push(...k(s)),{data:o}})));if("upload"===a.queryType){if(!this.uploadedJson)return(0,w.of)({data:[]});try{var t;const e=JSON.parse(this.uploadedJson).data[0];let a=[(0,q.xM)(e)];return null!==(t=this.nodeGraph)&&void 0!==t&&t.enabled&&a.push(...k(e)),(0,w.of)({data:a})}catch(e){return(0,w.of)({error:{message:"JSON is not valid Jaeger format"},data:[]})}}let n=(0,T.pick)(a,["operation","service","tags","minDuration","maxDuration","limit"]);return n=(0,T.pickBy)(n,T.identity),n.tags&&(n=Object.assign({},n,{tags:h((0,_.getTemplateSrv)().replace(n.tags,e.scopedVars))})),"All"===n.operation&&(n=(0,T.omit)(n,"operation")),this._request("/api/traces",Object.assign({},n,this.getTimeRange(),{lookback:"custom"})).pipe((0,O.U)((e=>({data:[(0,q.Wp)(e.data.data,this.instanceSettings)]}))))}async testDatasource(){return(0,I.n)(this._request("/api/services").pipe((0,O.U)((e=>{var a;return((null==e||null===(a=e.data)||void 0===a?void 0:a.data)||[]).length>0?{status:"success",message:"Data source connected and services found."}:{status:"error",message:"Data source connected, but no services received. Verify that Jaeger is configured properly."}})),(0,S.K)((e=>{let a="Jaeger: ";return e.statusText?a+=e.statusText:a+="Cannot connect to Jaeger",e.status&&(a+=`. ${e.status}`),e.data&&e.data.message?a+=`. ${e.data.message}`:e.data&&(a+=`. ${JSON.stringify(e.data)}`),(0,w.of)({status:"error",message:a})}))))}getTimeRange(){const e=this.timeSrv.timeRange();return{start:R(e.from,!1),end:R(e.to,!0)}}getQueryDisplayText(e){return e.query||""}_request(e,a,t){const n=a?(0,F.tW)(a):"",s=`${this.instanceSettings.url}${e}${n.length?`?${n}`:""}`,o=Object.assign({},t,{url:s});return(0,_.getBackendSrv)().fetch(o)}}function R(e,a){return"string"==typeof e&&(e=n.dateMath.parse(e,a)),1e3*e.valueOf()}const P=new n.MutableDataFrame({fields:[{name:"trace",type:n.FieldType.trace,values:[]}],meta:{preferredVisualisationType:"trace",custom:{traceFormat:"jaeger"}}}),$=new n.DataSourcePlugin(z).setConfigEditor((e=>{let{options:a,onOptionsChange:t}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o.DataSourceHttpSettings,{defaultUrl:"http://localhost:16686",dataSourceConfig:a,showAccessOptions:!1,onChange:t}),(0,l.jsx)("div",{className:"gf-form-group",children:(0,l.jsx)(i.Z,{options:a,onOptionsChange:t})}),(0,l.jsx)("div",{className:"gf-form-group",children:(0,l.jsx)(r.n,{options:a,onOptionsChange:t})})]})})).setQueryEditor((function(e){var a;let{datasource:t,query:n,onChange:s,onRunQuery:r}=e;const i=(0,o.useTheme2)(),d=e=>{const a=Object.assign({},n,{query:e});s(a)};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:(0,c.css)({width:"100%"}),children:[(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Query type",children:(0,l.jsx)(o.RadioButtonGroup,{options:[{value:"search",label:"Search"},{value:void 0,label:"TraceID"},{value:"upload",label:"JSON file"}],value:n.queryType,onChange:e=>s(Object.assign({},n,{queryType:e})),size:"md"})})}),(()=>{switch(n.queryType){case"search":return a||(a=(0,l.jsx)(D,{datasource:t,query:n,onChange:s}));case"upload":return(0,l.jsx)("div",{className:(0,c.css)({padding:i.spacing(2)}),children:(0,l.jsx)(o.FileDropzone,{options:{multiple:!1},onLoad:e=>{t.uploadedJson=e,r()}})});default:return(0,l.jsx)(o.InlineFieldRow,{children:(0,l.jsx)(o.InlineField,{label:"Trace ID",labelWidth:14,grow:!0,children:(0,l.jsx)(o.QueryField,{query:n.query,onChange:d,onRunQuery:r,onBlur:()=>{},placeholder:"Enter a Trace ID (run with Shift+Enter)",portalOrigin:"jaeger"})})})}})()]})})}))},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser.js":(e,a)=>{e.exports=function(e){return null==e&&(e={}),function(a,t,n){return a._body?n():a.header("content-type")===e.contentType?(a._body=!0,a.body=a.body||{},s="",a.setEncoding("utf8"),a.on("data",(function(e){return s+=e})),void a.on("end",(function(){try{var t=[];s.trim().split("\n").forEach((function(a){t.push(e.parser(a))})),a.body=t}catch(e){return e.body=s,e.status=400,n(e)}return n()}))):n();var s}}},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser_stream.js":(e,a,t)=>{t("./.yarn/cache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js"),t("./.yarn/cache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),t("?7db0").Readable;var n=t("?7db0").PassThrough,s=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js");e.exports=function(e){null==e&&(e={});var a=e.contentType||"application/logplex-1";return function(e,t,o){return e._body?o():e.header("content-type")===a?(e._body=!0,e.body=new n({objectMode:!0}),e.pipe(s.streamParser()).pipe(e.body),o()):o()}}},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logfmt_parser.js":(e,a)=>{a.debug=!1,a.parse=function(e){var t="",n="",s=!1,o=!1,r=!1,i=!1,l={},c=a.debug;"\n"==e[e.length-1]&&(e=e.slice(0,e.length-1));for(var d=0;d<=e.length;d++){if(" "==e[d]&&!r||d==e.length){if(s&&t.length>0?l[t]=!0:o&&("true"==n?n=!0:"false"==n?n=!1:""!==n||i||(n=null),l[t]=n,n=""),d==e.length)break;s=!1,o=!1,r=!1,i=!1}"="!=e[d]||r?"\\"==e[d]?(n+=e[++d],c&&console.log("escape: "+e[d])):'"'==e[d]?(i=!0,r=!r,c&&console.log("in quote: "+r)):" "==e[d]||o||s?s?(c&&console.log("add to key: "+e[d]),t+=e[d]):o&&(c&&console.log("add to value: "+e[d]),n+=e[d]):(c&&console.log("start key with: "+e[d]),s=!0,t=e[d]):(c&&console.log("split"),s=!1,o=!0)}return l}},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logger.js":(e,a,t)=>{a.log=function(e,a){this.stream=this.stream||process.stdout,null==a&&(a=this.stream);var t=Object.assign({},this.defaultData,e);if(this.timers)for(var n in this.timers){var s=(new Date).getTime();t[n]=(s-this.timers[n]).toString()+"ms"}a.write(this.stringify(t)+"\n")},a.time=function(e){var a=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js"),n=(new Date).getTime(),s=(e=e||"elapsed",new a);return s.stream=this.stream,s.defaultData=this.defaultData,s.timers=Object.assign({},this.timers),s.timers[e]=n,s},a.namespace=function(e){var a=new(t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js")),n=Object.assign({},this.defaultData,e);return a.stream=this.stream,a.defaultData=n,a.timers=this.timers,a},a.error=function(e,a){this.maxErrorLines=this.maxErrorLines||10,void 0===a&&(a=Math.random().toString().slice(2,12));var t=this.namespace({error:!0,id:a,now:(new Date).toISOString()});if(t.log({message:e.message}),e.stack){var n=e.stack.split("\n");for(var s in n){if(s>=this.maxErrorLines)break;t.log({line:s,trace:n[s]})}}}},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/request_logger.js":(e,a)=>{var t=function(e,a){if("function"==typeof e.path)var t=e.path();else t=e.originalUrl||e.path||e.url;var n=e.header&&e.header("x-forwarded-for"),s=e.header&&e.header("x-request-id"),o={ip:e.ip||n||e.connection.remoteAddress,time:(new Date).toISOString(),method:e.method,path:t,status:a.statusCode};return s&&(o.request_id=s),a.get&&(o.content_length=a.get("content-length"),o.content_type=a.get("content-type")),o};a.init=function(e,a,n){return this.logger=e,n||a?n||("function"==typeof a?(n=a,a={}):n=t):(n=t,a={}),(a=a||{}).immediate?function(e,a,t){return function(a,n,s){var o=t(a,n);e.log(o),s()}}(e,0,n):function(e,a,t){return function(n,s,o){var r=a.elapsed||"elapsed",i=e.time(r),l=s.end;s.end=function(e,a){var o=t(n,s);s.end=l,s.end(e,a),i.log(o)},o()}}(e,a,n)},a.commonFormatter=t},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/streaming.js":(e,a,t)=>{var n=t("./.yarn/cache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js"),s=t("./.yarn/cache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),o=t("?7db0").PassThrough;a.streamParser=function(e){var a=new o,t=this,r=s((function(e){""!==e&&this.queue(t.parse(e))}));return a.on("pipe",(function(e){e.unpipe&&e.unpipe(this),this.transformStream=e.pipe(n()).pipe(r)})),a.pipe=function(e,a){return this.transformStream.pipe(e,a)},a},a.streamStringify=function(e){var a=this;if((e=e||{}).hasOwnProperty("delimiter"))var t=e.delimiter;else t="\n";return s((function(e){this.queue(a.stringify(e)+t)}),(function(){this.queue(null)}))}},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/stringify.js":(e,a)=>{a.stringify=function(e){var a="";for(var t in e){var n=e[t],s=!1;null==n?(s=!0,n=""):n=n.toString();var o=n.indexOf(" ")>-1||n.indexOf("=")>-1;(n.indexOf('"')>-1||n.indexOf("\\")>-1)&&(n=n.replace(/["\\]/g,"\\$&")),o&&(n='"'+n+'"'),""!==n||s||(n='""'),a+=t+"="+n+" "}return a.substring(0,a.length-1)}},"./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js":(e,a,t)=>{function n(){}e.exports=n;var s=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/streaming.js"),o=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser.js"),r=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser_stream.js"),i=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logfmt_parser.js"),l=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logger.js"),c=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/request_logger.js"),d=t("./.yarn/cache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/stringify.js");Object.assign(n.prototype,l),Object.assign(n.prototype,s),n.prototype.stringify=d.stringify,n.prototype.parse=i.parse,n.prototype.bodyParser=function(e){e||(e={});var a=e.contentType||"application/logplex-1";return o({contentType:a,parser:this.parse})},n.prototype.bodyParserStream=function(e){e||(e={});var a=e.contentType||"application/logplex-1";return r({contentType:a})},n.prototype.requestLogger=function(e,a){return c.init(this,e,a)},n.prototype.requestLogger.commonFormatter=c.commonFormatter,Object.assign(n,n.prototype)},"./.yarn/cache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js":(e,a,t)=>{var n=t("./.yarn/cache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),s=t("?1a5c").StringDecoder;e.exports=function(e,a){var t=new s,o="";"function"==typeof e&&(a=e,e=null);e||(e=/\r?\n/);function r(e,t){if(a){try{t=a(t)}catch(a){return e.emit("error",a)}void 0!==t&&e.queue(t)}else e.queue(t)}function i(a,t){var n=(o+t).split(e);o=n.pop();for(var s=0;s<n.length;s++){r(a,n[s])}}return n((function(e){i(this,t.write(e))}),(function(){t.end&&i(this,t.end()),null!=o&&r(this,o),this.queue(null)}))}},"./.yarn/cache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js":(e,a,t)=>{var n=t("?dcf2");function s(e,a,t){e=e||function(e){this.queue(e)},a=a||function(){this.queue(null)};var s=!1,o=!1,r=[],i=!1,l=new n;function c(){for(;r.length&&!l.paused;){var e=r.shift();if(null===e)return l.emit("end");l.emit("data",e)}}function d(){l.writable=!1,a.call(l),!l.readable&&l.autoDestroy&&l.destroy()}return l.readable=l.writable=!0,l.paused=!1,l.autoDestroy=!(t&&!1===t.autoDestroy),l.write=function(a){return e.call(this,a),!l.paused},l.queue=l.push=function(e){return i||(null===e&&(i=!0),r.push(e),c()),l},l.on("end",(function(){l.readable=!1,!l.writable&&l.autoDestroy&&process.nextTick((function(){l.destroy()}))})),l.end=function(e){if(!s)return s=!0,arguments.length&&l.write(e),d(),l},l.destroy=function(){if(!o)return o=!0,s=!0,r.length=0,l.writable=l.readable=!1,l.emit("close"),l},l.pause=function(){if(!l.paused)return l.paused=!0,l},l.resume=function(){return l.paused&&(l.paused=!1,l.emit("resume")),c(),l.paused||l.emit("drain"),l},l}e.exports=s,s.through=s}}]);
//# sourceMappingURL=5466.a87fd0ce1ff28bec28a3.js.map