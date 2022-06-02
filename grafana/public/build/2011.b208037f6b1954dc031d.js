(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2011],{"./public/app/core/components/NodeGraphSettings.tsx":(e,t,a)=>{"use strict";a.d(t,{n:()=>l});var n,o=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=(a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a("./packages/grafana-data/src/index.ts")),r=a("./packages/grafana-ui/src/index.ts"),i=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function l(e){var t;let{options:a,onOptionsChange:o}=e;const l=(0,r.useStyles)(c);return(0,i.jsxs)("div",{className:l.container,children:[n||(n=(0,i.jsx)("h3",{className:"page-heading",children:"Node Graph"})),(0,i.jsx)(r.InlineFieldRow,{className:l.row,children:(0,i.jsx)(r.InlineField,{tooltip:"Enables the Node Graph visualization in the trace viewer.",label:"Enable Node Graph",labelWidth:26,children:(0,i.jsx)(r.InlineSwitch,{id:"enableNodeGraph",value:null===(t=a.jsonData.nodeGraph)||void 0===t?void 0:t.enabled,onChange:e=>(0,s.updateDatasourcePluginJsonDataOption)({onOptionsChange:o,options:a},"nodeGraph",Object.assign({},a.jsonData.nodeGraph,{enabled:e.currentTarget.checked}))})})})]})}const c=e=>({container:o.css`
    label: container;
    width: 100%;
  `,row:o.css`
    label: row;
    align-items: baseline;
  `})},"./public/app/core/components/TraceToLogs/TraceToLogsSettings.tsx":(e,t,a)=>{"use strict";a.d(t,{Z:()=>m});var n,o,s,r=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),i=(a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a("./packages/grafana-data/src/index.ts")),l=a("./packages/grafana-runtime/src/index.ts"),c=a("./packages/grafana-ui/src/index.ts"),d=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const u=e=>{let{values:t,onChange:a,id:r,keyPlaceholder:i="Key",valuePlaceholder:l="Value (optional)"}=e;const u=(0,c.useStyles)(p);return(0,d.jsx)("div",{className:u.wrapper,children:t.length?t.map(((e,s)=>(0,d.jsxs)("div",{className:u.pair,children:[(0,d.jsx)(c.SegmentInput,{id:`${r}-key-${s}`,placeholder:i,value:e.key,onChange:e=>{a(t.map(((t,a)=>(a===s&&(t.key=String(e)),t))))}}),(0,d.jsx)(c.InlineLabel,{"aria-label":"equals",className:u.operator,width:3,children:"="}),(0,d.jsx)(c.SegmentInput,{id:`${r}-value-${s}`,placeholder:l,value:e.value,onChange:e=>{a(t.map(((t,a)=>(a===s&&(t.value=String(e)),t))))}}),(0,d.jsx)("button",{onClick:()=>a([...t.slice(0,s),...t.slice(s+1)]),className:"gf-form-label query-part","aria-label":"Remove tag",children:n||(n=(0,d.jsx)(c.Icon,{name:"times"}))}),s===t.length-1?(0,d.jsx)("button",{onClick:()=>a([...t,{key:"",value:""}]),className:"gf-form-label query-part","aria-label":"Add tag",children:o||(o=(0,d.jsx)(c.Icon,{name:"plus"}))}):null]},s))):(0,d.jsx)("button",{onClick:()=>a([...t,{key:"",value:""}]),className:"gf-form-label query-part","aria-label":"Add tag",children:s||(s=(0,d.jsx)(c.Icon,{name:"plus"}))})})},p=e=>({wrapper:r.css`
    display: flex;
    flex-direction: column;
    gap: ${e.spacing.xs} 0;
  `,pair:r.css`
    display: flex;
    justify-content: start;
    align-items: center;
  `,operator:r.css`
    color: ${e.palette.orange};
  `});var g;function m(e){var t,a,n,o,s,p,m,f,b,v,y,j,x,D;let{options:T,onOptionsChange:I}=e;const w=(0,c.useStyles)(h);return(0,d.jsxs)("div",{className:(0,r.css)({width:"100%"}),children:[g||(g=(0,d.jsx)("h3",{className:"page-heading",children:"Trace to logs"})),(0,d.jsx)("div",{className:w.infoText,children:"Trace to logs lets you navigate from a trace span to the selected data source's log."}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{tooltip:"The data source the trace is going to navigate to",label:"Data source",labelWidth:26,children:(0,d.jsx)(l.DataSourcePicker,{inputId:"trace-to-logs-data-source-picker",logs:!0,current:null===(t=T.jsonData.tracesToLogs)||void 0===t?void 0:t.datasourceUid,noDefault:!0,width:40,onChange:e=>{var t;return(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{datasourceUid:e.uid,tags:null===(t=T.jsonData.tracesToLogs)||void 0===t?void 0:t.tags}))}})})}),null!==(a=T.jsonData.tracesToLogs)&&void 0!==a&&a.mapTagNamesEnabled?(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{tooltip:"Tags that will be used in the Loki query. Default tags: 'cluster', 'hostname', 'namespace', 'pod'",label:"Tags",labelWidth:26,children:(0,d.jsx)(u,{keyPlaceholder:"Tag",values:null!==(n=null!==(o=null===(s=T.jsonData.tracesToLogs)||void 0===s?void 0:s.mappedTags)&&void 0!==o?o:null===(p=T.jsonData.tracesToLogs)||void 0===p||null===(m=p.tags)||void 0===m?void 0:m.map((e=>({key:e}))))&&void 0!==n?n:[],onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{mappedTags:e}))})})}):(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{tooltip:"Tags that will be used in the Loki query. Default tags: 'cluster', 'hostname', 'namespace', 'pod'",label:"Tags",labelWidth:26,children:(0,d.jsx)(c.TagsInput,{tags:null===(f=T.jsonData.tracesToLogs)||void 0===f?void 0:f.tags,width:40,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{tags:e}))})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Map tag names",labelWidth:26,grow:!0,tooltip:"Map trace tag names to log label names. Ex: k8s.pod.name -> pod",children:(0,d.jsx)(c.InlineSwitch,{id:"mapTagNames",value:null!==(b=null===(v=T.jsonData.tracesToLogs)||void 0===v?void 0:v.mapTagNamesEnabled)&&void 0!==b&&b,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{mapTagNamesEnabled:e.currentTarget.checked}))})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Span start time shift",labelWidth:26,grow:!0,tooltip:"Shifts the start time of the span. Default 0 (Time units can be used here, for example: 5s, 1m, 3h)",children:(0,d.jsx)(c.Input,{type:"text",placeholder:"1h",width:40,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{spanStartTimeShift:e.currentTarget.value})),value:(null===(y=T.jsonData.tracesToLogs)||void 0===y?void 0:y.spanStartTimeShift)||""})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Span end time shift",labelWidth:26,grow:!0,tooltip:"Shifts the end time of the span. Default 0 Time units can be used here, for example: 5s, 1m, 3h",children:(0,d.jsx)(c.Input,{type:"text",placeholder:"1h",width:40,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{spanEndTimeShift:e.currentTarget.value})),value:(null===(j=T.jsonData.tracesToLogs)||void 0===j?void 0:j.spanEndTimeShift)||""})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Filter by Trace ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Trace ID. Appends '|=<trace id>' to the query.",children:(0,d.jsx)(c.InlineSwitch,{id:"filterByTraceID",value:null===(x=T.jsonData.tracesToLogs)||void 0===x?void 0:x.filterByTraceID,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{filterByTraceID:e.currentTarget.checked}))})})}),(0,d.jsx)(c.InlineFieldRow,{children:(0,d.jsx)(c.InlineField,{label:"Filter by Span ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Span ID. Appends '|=<span id>' to the query.",children:(0,d.jsx)(c.InlineSwitch,{id:"filterBySpanID",value:null===(D=T.jsonData.tracesToLogs)||void 0===D?void 0:D.filterBySpanID,onChange:e=>(0,i.updateDatasourcePluginJsonDataOption)({onOptionsChange:I,options:T},"tracesToLogs",Object.assign({},T.jsonData.tracesToLogs,{filterBySpanID:e.currentTarget.checked}))})})})]})}const h=e=>({infoText:r.css`
    padding-bottom: ${e.spacing.md};
    color: ${e.colors.textSemiWeak};
  `})},"./public/app/plugins/datasource/jaeger/module.ts":(e,t,a)=>{"use strict";a.r(t),a.d(t,{plugin:()=>$});var n=a("./packages/grafana-data/src/index.ts"),o=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s=a("./packages/grafana-ui/src/index.ts"),r=a("./public/app/core/components/NodeGraphSettings.tsx"),i=a("./public/app/core/components/TraceToLogs/TraceToLogsSettings.tsx"),l=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");var c=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),d=a("./public/app/core/actions/index.ts"),u=a("./public/app/core/copy/appNotification.ts"),p=a("./public/app/store/store.ts"),g=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js"),m=a.n(g);function h(e){if(!e)return"";const t=m().parse(e);return Object.keys(t).forEach((e=>{const a=t[e];"string"!=typeof a&&(t[e]=String(a))})),JSON.stringify(t)}function f(e){if(!e)return"";try{return m().stringify(JSON.parse(e))}catch{return e}}var b=a("./.yarn/__virtual__/react-transition-group-virtual-8df824fae8/3/opt/drone/yarncache/react-transition-group-npm-4.4.2-5052c30656-b67bf5b3e8.zip/node_modules/react-transition-group/esm/CSSTransition.js");const v="e.g. 1.2s, 100ms, 500us";function y(e){let{query:t,onChange:a}=e;const[n,r]=(0,o.useState)(!1),i=(0,s.useStyles)(j);return(0,l.jsxs)("div",{children:[(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)("div",{className:i.advancedOptionsContainer,onClick:()=>r(!n),children:(0,l.jsxs)(s.InlineLabel,{as:"div",children:["Advanced options"," ",(0,l.jsx)(s.Icon,{className:n?i.angleUp:i.angleDown,name:"angle-down"})]})})}),(0,l.jsx)(b.Z,{in:n,mountOnEnter:!0,unmountOnExit:!0,timeout:300,classNames:i,children:(0,l.jsxs)("div",{children:[(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Min Duration",labelWidth:21,grow:!0,children:(0,l.jsx)(s.Input,{id:"minDuration",name:"minDuration",value:t.minDuration||"",placeholder:v,onChange:e=>a(Object.assign({},t,{minDuration:e.currentTarget.value}))})})}),(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Max Duration",labelWidth:21,grow:!0,children:(0,l.jsx)(s.Input,{id:"maxDuration",name:"maxDuration",value:t.maxDuration||"",placeholder:v,onChange:e=>a(Object.assign({},t,{maxDuration:e.currentTarget.value}))})})}),(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Limit",labelWidth:21,grow:!0,tooltip:"Maximum numbers of returned results",children:(0,l.jsx)(s.Input,{id:"limit",name:"limit",value:t.limit||"",type:"number",onChange:e=>a(Object.assign({},t,{limit:e.currentTarget.value?parseInt(e.currentTarget.value,10):void 0}))})})})]})})]})}function j(e){return{advancedOptionsContainer:c.css`
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
    `}}const x={label:"All",value:void 0};function D(e){let{datasource:t,query:a,onChange:n}=e;const[r,i]=(0,o.useState)(),[g,m]=(0,o.useState)(),[h,b]=(0,o.useState)({services:!1,operations:!1}),v=(0,o.useCallback)((async(e,a)=>{b((e=>Object.assign({},e,{[a]:!0})));try{const n=await t.metadataRequest(e);if(!n)return[{label:`No ${a} found`,value:`No ${a} found`}];return n.sort().map((e=>({label:e,value:e})))}catch(e){return(0,p.WI)((0,d.$l)((0,u.t_)("Error",e))),[]}finally{b((e=>Object.assign({},e,{[a]:!1})))}}),[t]);return(0,o.useEffect)((()=>{(async()=>{const e=await v("/api/services","services");i(e)})()}),[t,v]),(0,o.useEffect)((()=>{a.service&&(async()=>{const e=await v(`/api/services/${encodeURIComponent(a.service)}/operations`,"operations");m([x,...e])})()}),[t,a.service,v]),(0,l.jsxs)("div",{className:(0,c.css)({maxWidth:"500px"}),children:[(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Service",labelWidth:14,grow:!0,children:(0,l.jsx)(s.AsyncSelect,{inputId:"service",menuShouldPortal:!0,cacheOptions:!1,loadOptions:()=>v("/api/services","services"),onOpenMenu:()=>v("/api/services","services"),isLoading:h.services,value:(null==r?void 0:r.find((e=>(null==e?void 0:e.value)===a.service)))||void 0,onChange:e=>n(Object.assign({},a,{service:null==e?void 0:e.value,operation:a.service!==(null==e?void 0:e.value)?void 0:a.operation})),menuPlacement:"bottom",isClearable:!0,defaultOptions:!0,"aria-label":"select-service-name"})})}),(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Operation",labelWidth:14,grow:!0,disabled:!a.service,children:(0,l.jsx)(s.AsyncSelect,{inputId:"operation",menuShouldPortal:!0,cacheOptions:!1,loadOptions:()=>v(`/api/services/${encodeURIComponent(a.service)}/operations`,"operations"),onOpenMenu:()=>v(`/api/services/${encodeURIComponent(a.service)}/operations`,"operations"),isLoading:h.operations,value:(null==g?void 0:g.find((e=>e.value===a.operation)))||null,onChange:e=>n(Object.assign({},a,{operation:(null==e?void 0:e.value)||void 0})),menuPlacement:"bottom",isClearable:!0,defaultOptions:!0,"aria-label":"select-operation-name"})})}),(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Tags",labelWidth:14,grow:!0,children:(0,l.jsx)(s.Input,{id:"tags",value:f(a.tags),placeholder:"http.status_code=200 error=true",onChange:e=>n(Object.assign({},a,{tags:e.currentTarget.value}))})})}),(0,l.jsx)(y,{query:a,onChange:n})]})}var T=a("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),I=a("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"),w=a("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),O=a("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js"),S=a("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),_=a("./packages/grafana-runtime/src/index.ts"),F=a("./public/app/core/utils/fetch.ts"),C=a("./public/app/features/dashboard/services/TimeSrv.ts"),N=a("./public/app/core/utils/tracing.ts");function k(e){const{nodes:t,edges:a}=function(e){const t=[],a=[],o=function(e){let t=0,a=1/0;for(const n of e)n.startTime<a&&(a=n.startTime),n.startTime+n.duration>t&&(t=n.startTime+n.duration);return t-a}(e.spans),s=(0,N.nO)((t=>{var a;if(t>=e.spans.length)return;const n=e.spans[t];return{span:n,id:n.spanID,parentIds:(null===(a=n.references)||void 0===a?void 0:a.filter((e=>"CHILD_OF"===e.refType)).map((e=>e.spanID)))||[]}}));for(const c of e.spans){var r,i,l;const d=e.processes[c.processID],u=s[c.spanID].children.map((e=>{const t=s[e].span;return[t.startTime,t.startTime+t.duration]})),p=(0,N.et)(u),g=c.duration-p,m=(0,N.fy)(c.duration/1e3,o/1e3,g/1e3);t.push({[n.NodeGraphDataFrameFieldNames.id]:c.spanID,[n.NodeGraphDataFrameFieldNames.title]:null!==(r=null==d?void 0:d.serviceName)&&void 0!==r?r:"",[n.NodeGraphDataFrameFieldNames.subTitle]:c.operationName,[n.NodeGraphDataFrameFieldNames.mainStat]:m.main,[n.NodeGraphDataFrameFieldNames.secondaryStat]:m.secondary,[n.NodeGraphDataFrameFieldNames.color]:g/o});const h=null===(i=c.references)||void 0===i||null===(l=i.find((e=>"CHILD_OF"===e.refType)))||void 0===l?void 0:l.spanID;h&&s[h].span&&a.push({[n.NodeGraphDataFrameFieldNames.id]:h+"--"+c.spanID,[n.NodeGraphDataFrameFieldNames.target]:c.spanID,[n.NodeGraphDataFrameFieldNames.source]:h})}return{nodes:t,edges:a}}(e),[o,s]=(0,N.np)();for(const e of t)o.add(e);for(const e of a)s.add(e);return[o,s]}var q=a("./public/app/plugins/datasource/jaeger/responseTransform.ts");function L(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class z extends n.DataSourceApi{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,C.$t)();super(e),L(this,"uploadedJson",null),L(this,"nodeGraph",void 0),this.instanceSettings=e,this.timeSrv=t,this.instanceSettings=e,this.timeSrv=t,this.nodeGraph=e.jsonData.nodeGraph}async metadataRequest(e,t){return(await(0,I.n)(this._request(e,t,{hideFromInspector:!0}))).data.data}query(e){const t=e.targets[0];if(!t)return(0,w.of)({data:[P]});if("search"!==t.queryType&&t.query)return this._request(`/api/traces/${encodeURIComponent((0,_.getTemplateSrv)().replace(t.query,e.scopedVars))}`).pipe((0,O.U)((e=>{var t,a,n;const o=null==e||null===(t=e.data)||void 0===t||null===(a=t.data)||void 0===a?void 0:a[0];if(!o)return{data:[P]};let s=[(0,q.xM)(o)];return null!==(n=this.nodeGraph)&&void 0!==n&&n.enabled&&s.push(...k(o)),{data:s}})));if("upload"===t.queryType){if(!this.uploadedJson)return(0,w.of)({data:[]});try{var a;const e=JSON.parse(this.uploadedJson).data[0];let t=[(0,q.xM)(e)];return null!==(a=this.nodeGraph)&&void 0!==a&&a.enabled&&t.push(...k(e)),(0,w.of)({data:t})}catch(e){return(0,w.of)({error:{message:"JSON is not valid Jaeger format"},data:[]})}}let n=(0,T.pick)(t,["operation","service","tags","minDuration","maxDuration","limit"]);return n=(0,T.pickBy)(n,T.identity),n.tags&&(n=Object.assign({},n,{tags:h((0,_.getTemplateSrv)().replace(n.tags,e.scopedVars))})),"All"===n.operation&&(n=(0,T.omit)(n,"operation")),this._request("/api/traces",Object.assign({},n,this.getTimeRange(),{lookback:"custom"})).pipe((0,O.U)((e=>({data:[(0,q.Wp)(e.data.data,this.instanceSettings)]}))))}async testDatasource(){return(0,I.n)(this._request("/api/services").pipe((0,O.U)((e=>{var t;return((null==e||null===(t=e.data)||void 0===t?void 0:t.data)||[]).length>0?{status:"success",message:"Data source connected and services found."}:{status:"error",message:"Data source connected, but no services received. Verify that Jaeger is configured properly."}})),(0,S.K)((e=>{let t="Jaeger: ";return e.statusText?t+=e.statusText:t+="Cannot connect to Jaeger",e.status&&(t+=`. ${e.status}`),e.data&&e.data.message?t+=`. ${e.data.message}`:e.data&&(t+=`. ${JSON.stringify(e.data)}`),(0,w.of)({status:"error",message:t})}))))}getTimeRange(){const e=this.timeSrv.timeRange();return{start:R(e.from,!1),end:R(e.to,!0)}}getQueryDisplayText(e){return e.query||""}_request(e,t,a){const n=t?(0,F.tW)(t):"",o=`${this.instanceSettings.url}${e}${n.length?`?${n}`:""}`,s=Object.assign({},a,{url:o});return(0,_.getBackendSrv)().fetch(s)}}function R(e,t){return"string"==typeof e&&(e=n.dateMath.parse(e,t)),1e3*e.valueOf()}const P=new n.MutableDataFrame({fields:[{name:"trace",type:n.FieldType.trace,values:[]}],meta:{preferredVisualisationType:"trace",custom:{traceFormat:"jaeger"}}}),$=new n.DataSourcePlugin(z).setConfigEditor((e=>{let{options:t,onOptionsChange:a}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.DataSourceHttpSettings,{defaultUrl:"http://localhost:16686",dataSourceConfig:t,showAccessOptions:!1,onChange:a}),(0,l.jsx)("div",{className:"gf-form-group",children:(0,l.jsx)(i.Z,{options:t,onOptionsChange:a})}),(0,l.jsx)("div",{className:"gf-form-group",children:(0,l.jsx)(r.n,{options:t,onOptionsChange:a})})]})})).setQueryEditor((function(e){var t;let{datasource:a,query:n,onChange:o,onRunQuery:r}=e;const i=(0,s.useTheme2)(),d=e=>{const t=Object.assign({},n,{query:e});o(t)};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:(0,c.css)({width:"100%"}),children:[(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Query type",children:(0,l.jsx)(s.RadioButtonGroup,{options:[{value:"search",label:"Search"},{value:void 0,label:"TraceID"},{value:"upload",label:"JSON file"}],value:n.queryType,onChange:e=>o(Object.assign({},n,{queryType:e})),size:"md"})})}),(()=>{switch(n.queryType){case"search":return t||(t=(0,l.jsx)(D,{datasource:a,query:n,onChange:o}));case"upload":return(0,l.jsx)("div",{className:(0,c.css)({padding:i.spacing(2)}),children:(0,l.jsx)(s.FileDropzone,{options:{multiple:!1},onLoad:e=>{a.uploadedJson=e,r()}})});default:return(0,l.jsx)(s.InlineFieldRow,{children:(0,l.jsx)(s.InlineField,{label:"Trace ID",labelWidth:14,grow:!0,children:(0,l.jsx)(s.QueryField,{query:n.query,onChange:d,onRunQuery:r,onBlur:()=>{},placeholder:"Enter a Trace ID (run with Shift+Enter)",portalOrigin:"jaeger"})})})}})()]})})}))},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser.js":(e,t)=>{e.exports=function(e){return null==e&&(e={}),function(t,a,n){return t._body?n():t.header("content-type")===e.contentType?(t._body=!0,t.body=t.body||{},o="",t.setEncoding("utf8"),t.on("data",(function(e){return o+=e})),void t.on("end",(function(){try{var a=[];o.trim().split("\n").forEach((function(t){a.push(e.parser(t))})),t.body=a}catch(e){return e.body=o,e.status=400,n(e)}return n()}))):n();var o}}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser_stream.js":(e,t,a)=>{a("../../opt/drone/yarncache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js"),a("../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),a("?4917").Readable;var n=a("?4917").PassThrough,o=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js");e.exports=function(e){null==e&&(e={});var t=e.contentType||"application/logplex-1";return function(e,a,s){return e._body?s():e.header("content-type")===t?(e._body=!0,e.body=new n({objectMode:!0}),e.pipe(o.streamParser()).pipe(e.body),s()):s()}}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logfmt_parser.js":(e,t)=>{t.debug=!1,t.parse=function(e){var a="",n="",o=!1,s=!1,r=!1,i=!1,l={},c=t.debug;"\n"==e[e.length-1]&&(e=e.slice(0,e.length-1));for(var d=0;d<=e.length;d++){if(" "==e[d]&&!r||d==e.length){if(o&&a.length>0?l[a]=!0:s&&("true"==n?n=!0:"false"==n?n=!1:""!==n||i||(n=null),l[a]=n,n=""),d==e.length)break;o=!1,s=!1,r=!1,i=!1}"="!=e[d]||r?"\\"==e[d]?(n+=e[++d],c&&console.log("escape: "+e[d])):'"'==e[d]?(i=!0,r=!r,c&&console.log("in quote: "+r)):" "==e[d]||s||o?o?(c&&console.log("add to key: "+e[d]),a+=e[d]):s&&(c&&console.log("add to value: "+e[d]),n+=e[d]):(c&&console.log("start key with: "+e[d]),o=!0,a=e[d]):(c&&console.log("split"),o=!1,s=!0)}return l}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logger.js":(e,t,a)=>{t.log=function(e,t){this.stream=this.stream||process.stdout,null==t&&(t=this.stream);var a=Object.assign({},this.defaultData,e);if(this.timers)for(var n in this.timers){var o=(new Date).getTime();a[n]=(o-this.timers[n]).toString()+"ms"}t.write(this.stringify(a)+"\n")},t.time=function(e){var t=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js"),n=(new Date).getTime(),o=(e=e||"elapsed",new t);return o.stream=this.stream,o.defaultData=this.defaultData,o.timers=Object.assign({},this.timers),o.timers[e]=n,o},t.namespace=function(e){var t=new(a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js")),n=Object.assign({},this.defaultData,e);return t.stream=this.stream,t.defaultData=n,t.timers=this.timers,t},t.error=function(e,t){this.maxErrorLines=this.maxErrorLines||10,void 0===t&&(t=Math.random().toString().slice(2,12));var a=this.namespace({error:!0,id:t,now:(new Date).toISOString()});if(a.log({message:e.message}),e.stack){var n=e.stack.split("\n");for(var o in n){if(o>=this.maxErrorLines)break;a.log({line:o,trace:n[o]})}}}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/request_logger.js":(e,t)=>{var a=function(e,t){if("function"==typeof e.path)var a=e.path();else a=e.originalUrl||e.path||e.url;var n=e.header&&e.header("x-forwarded-for"),o=e.header&&e.header("x-request-id"),s={ip:e.ip||n||e.connection.remoteAddress,time:(new Date).toISOString(),method:e.method,path:a,status:t.statusCode};return o&&(s.request_id=o),t.get&&(s.content_length=t.get("content-length"),s.content_type=t.get("content-type")),s};t.init=function(e,t,n){return this.logger=e,n||t?n||("function"==typeof t?(n=t,t={}):n=a):(n=a,t={}),(t=t||{}).immediate?function(e,t,a){return function(t,n,o){var s=a(t,n);e.log(s),o()}}(e,0,n):function(e,t,a){return function(n,o,s){var r=t.elapsed||"elapsed",i=e.time(r),l=o.end;o.end=function(e,t){var s=a(n,o);o.end=l,o.end(e,t),i.log(s)},s()}}(e,t,n)},t.commonFormatter=a},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/streaming.js":(e,t,a)=>{var n=a("../../opt/drone/yarncache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js"),o=a("../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),s=a("?4917").PassThrough;t.streamParser=function(e){var t=new s,a=this,r=o((function(e){""!==e&&this.queue(a.parse(e))}));return t.on("pipe",(function(e){e.unpipe&&e.unpipe(this),this.transformStream=e.pipe(n()).pipe(r)})),t.pipe=function(e,t){return this.transformStream.pipe(e,t)},t},t.streamStringify=function(e){var t=this;if((e=e||{}).hasOwnProperty("delimiter"))var a=e.delimiter;else a="\n";return o((function(e){this.queue(t.stringify(e)+a)}),(function(){this.queue(null)}))}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/stringify.js":(e,t)=>{t.stringify=function(e){var t="";for(var a in e){var n=e[a],o=!1;null==n?(o=!0,n=""):n=n.toString();var s=n.indexOf(" ")>-1||n.indexOf("=")>-1;(n.indexOf('"')>-1||n.indexOf("\\")>-1)&&(n=n.replace(/["\\]/g,"\\$&")),s&&(n='"'+n+'"'),""!==n||o||(n='""'),t+=a+"="+n+" "}return t.substring(0,t.length-1)}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js":(e,t,a)=>{function n(){}e.exports=n;var o=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/streaming.js"),s=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser.js"),r=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser_stream.js"),i=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logfmt_parser.js"),l=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logger.js"),c=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/request_logger.js"),d=a("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/stringify.js");Object.assign(n.prototype,l),Object.assign(n.prototype,o),n.prototype.stringify=d.stringify,n.prototype.parse=i.parse,n.prototype.bodyParser=function(e){e||(e={});var t=e.contentType||"application/logplex-1";return s({contentType:t,parser:this.parse})},n.prototype.bodyParserStream=function(e){e||(e={});var t=e.contentType||"application/logplex-1";return r({contentType:t})},n.prototype.requestLogger=function(e,t){return c.init(this,e,t)},n.prototype.requestLogger.commonFormatter=c.commonFormatter,Object.assign(n,n.prototype)},"../../opt/drone/yarncache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js":(e,t,a)=>{var n=a("../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),o=a("?03f3").StringDecoder;e.exports=function(e,t){var a=new o,s="";"function"==typeof e&&(t=e,e=null);e||(e=/\r?\n/);function r(e,a){if(t){try{a=t(a)}catch(t){return e.emit("error",t)}void 0!==a&&e.queue(a)}else e.queue(a)}function i(t,a){var n=(s+a).split(e);s=n.pop();for(var o=0;o<n.length;o++){r(t,n[o])}}return n((function(e){i(this,a.write(e))}),(function(){a.end&&i(this,a.end()),null!=s&&r(this,s),this.queue(null)}))}},"../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js":(e,t,a)=>{var n=a("?0e0d");function o(e,t,a){e=e||function(e){this.queue(e)},t=t||function(){this.queue(null)};var o=!1,s=!1,r=[],i=!1,l=new n;function c(){for(;r.length&&!l.paused;){var e=r.shift();if(null===e)return l.emit("end");l.emit("data",e)}}function d(){l.writable=!1,t.call(l),!l.readable&&l.autoDestroy&&l.destroy()}return l.readable=l.writable=!0,l.paused=!1,l.autoDestroy=!(a&&!1===a.autoDestroy),l.write=function(t){return e.call(this,t),!l.paused},l.queue=l.push=function(e){return i||(null===e&&(i=!0),r.push(e),c()),l},l.on("end",(function(){l.readable=!1,!l.writable&&l.autoDestroy&&process.nextTick((function(){l.destroy()}))})),l.end=function(e){if(!o)return o=!0,arguments.length&&l.write(e),d(),l},l.destroy=function(){if(!s)return s=!0,o=!0,r.length=0,l.writable=l.readable=!1,l.emit("close"),l},l.pause=function(){if(!l.paused)return l.paused=!0,l},l.resume=function(){return l.paused&&(l.paused=!1,l.emit("resume")),c(),l.paused||l.emit("drain"),l},l}e.exports=o,o.through=o}}]);
//# sourceMappingURL=2011.b208037f6b1954dc031d.js.map