"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[7537],{"./public/app/plugins/datasource/grafana/module.ts":(e,a,t)=>{t.r(a),t.d(a,{plugin:()=>k});var n,s=t("./packages/grafana-data/src/index.ts"),r=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),l=t("./packages/grafana-runtime/src/index.ts"),i=t("./packages/grafana-ui/src/index.ts"),o=t("./public/app/plugins/datasource/grafana/types.ts"),d=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function u(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}class c extends r.PureComponent{constructor(e){super(e),u(this,"state",{channels:[],channelFields:{}}),u(this,"queryTypes",[{label:"Random Walk",value:o.hR.RandomWalk,description:"Random signal within the selected time range"},{label:"Live Measurements",value:o.hR.LiveMeasurements,description:"Stream real-time measurements from Grafana"},{label:"List public files",value:o.hR.List,description:"Show directory listings for public resources"}]),u(this,"onQueryTypeChange",(e=>{const{onChange:a,query:t,onRunQuery:n}=this.props;a(Object.assign({},t,{queryType:e.value})),n(),this.loadChannelInfo()})),u(this,"onChannelChange",(e=>{const{onChange:a,query:t,onRunQuery:n}=this.props;a(Object.assign({},t,{channel:null==e?void 0:e.value})),n()})),u(this,"onFieldNamesChange",(e=>{var a,t;const{onChange:n,query:s,onRunQuery:r}=this.props;let l=[];if(Array.isArray(e)?l=e.map((e=>e.value)):e.value&&(l=[e.value]),1===l.length&&(null===(a=s.filter)||void 0===a||null===(t=a.fields)||void 0===t||!t.length)&&s.channel){var i;const e=(null!==(i=this.state.channelFields[s.channel])&&void 0!==i?i:[]).find((e=>"time"===e.value||"Time"===e.value));e&&e.value&&e.value!==l[0]&&(l=[e.value,...l])}n(Object.assign({},s,{filter:Object.assign({},s.filter,{fields:l})})),r()})),u(this,"checkAndUpdateValue",((e,a)=>{const{onChange:t,query:n,onRunQuery:r}=this.props;if("buffer"===e){let e;if(a)try{e=1e3*s.rangeUtil.intervalToSeconds(a)}catch(e){console.warn("ERROR",e)}t(Object.assign({},n,{buffer:e}))}else t(Object.assign({},n,{[e]:a}));r()})),u(this,"handleEnterKey",(e=>{"Enter"===e.key&&this.checkAndUpdateValue("buffer",e.target.value)})),u(this,"handleBlur",(e=>{this.checkAndUpdateValue("buffer",e.target.value)})),u(this,"onFolderChanged",(e=>{const{onChange:a,query:t,onRunQuery:n}=this.props;a(Object.assign({},t,{path:null==e?void 0:e.value})),n()})),u(this,"handleSearchEnterKey",(e=>{"Enter"===e.key&&this.checkAndUpdateValue("query",e.target.value)})),u(this,"handleSearchBlur",(e=>{this.checkAndUpdateValue("query",e.target.value)})),l.config.featureToggles.panelTitleSearch&&this.queryTypes.push({label:"Search",value:o.hR.Search,description:"Search for grafana resources"})}loadChannelInfo(){(0,l.getBackendSrv)().fetch({url:"api/live/list"}).subscribe({next:e=>{var a;const t=null===(a=e.data)||void 0===a?void 0:a.channels;if(null!=t&&t.length){const e={},a=t.map((a=>{if(a.data){const t=new Set,n=(0,s.dataFrameFromJSON)(a.data);for(const e of n.fields)t.add(e.name);e[a.channel]=Array.from(t).map((e=>({value:e,label:e})))}return{value:a.channel,label:a.channel+" ["+a.minute_rate+" msg/min]"}}));this.setState({channelFields:e,channels:a})}}})}loadFolderInfo(){const e={targets:[{queryType:o.hR.List,refId:"A"}]};(0,l.getDataSourceSrv)().get("-- Grafana --").then((a=>{a.query(e).subscribe({next:e=>{if(e.data.length){const a=e.data[0].fields[0].values.toArray().map((e=>({value:e,label:e})));this.setState({folders:a})}}})}))}componentDidMount(){this.loadChannelInfo()}renderMeasurementsQuery(){var e;let{channel:a,filter:t,buffer:r}=this.props.query,{channels:l,channelFields:o}=this.state,u=l.find((e=>e.value===a));a&&!u&&(u={value:a,label:a,description:`Connected to ${a}`},l=[u,...l]);const c=new Set,h=a&&null!==(e=o[a])&&void 0!==e?e:[];if(null!=t&&t.fields)for(const e of t.fields)c.has(e)||(h.push({value:e,label:`${e} (not loaded)`,description:"Configured, but not found in the query results"}),c.add(e));let p="";return r&&(p=s.rangeUtil.secondsToHms(r/1e3)),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"gf-form",children:(0,d.jsx)(i.InlineField,{label:"Channel",grow:!0,labelWidth:12,children:(0,d.jsx)(i.Select,{menuShouldPortal:!0,options:l,value:u||"",onChange:this.onChannelChange,allowCustomValue:!0,backspaceRemovesValue:!0,placeholder:"Select measurements channel",isClearable:!0,noOptionsMessage:"Enter channel name",formatCreateLabel:e=>`Connect to: ${e}`})})}),a&&(0,d.jsxs)("div",{className:"gf-form",children:[(0,d.jsx)(i.InlineField,{label:"Fields",grow:!0,labelWidth:12,children:(0,d.jsx)(i.Select,{menuShouldPortal:!0,options:h,value:(null==t?void 0:t.fields)||[],onChange:this.onFieldNamesChange,allowCustomValue:!0,backspaceRemovesValue:!0,placeholder:"All fields",isClearable:!0,noOptionsMessage:"Unable to list all fields",formatCreateLabel:e=>`Field: ${e}`,isSearchable:!0,isMulti:!0})}),(0,d.jsx)(i.InlineField,{label:"Buffer",children:(0,d.jsx)(i.Input,{placeholder:"Auto",width:12,defaultValue:p,onKeyDown:this.handleEnterKey,onBlur:this.handleBlur,spellCheck:!1})})]}),n||(n=(0,d.jsx)(i.Alert,{title:"Grafana Live - Measurements",severity:"info",children:"This supports real-time event streams in Grafana core. This feature is under heavy development. Expect the interfaces and structures to change as this becomes more production ready."}))]})}renderListPublicFiles(){let{path:e}=this.props.query,{folders:a}=this.state;a||(a=[],this.loadFolderInfo());const t=a.find((a=>a.value===e));return e&&!t&&(a=[...a,{value:e,label:e}]),(0,d.jsx)(i.InlineFieldRow,{children:(0,d.jsx)(i.InlineField,{label:"Path",grow:!0,labelWidth:12,children:(0,d.jsx)(i.Select,{menuShouldPortal:!0,options:a,value:t||"",onChange:this.onFolderChanged,allowCustomValue:!0,backspaceRemovesValue:!0,placeholder:"Select folder",isClearable:!0,formatCreateLabel:e=>`Folder: ${e}`})})})}renderSearch(){let{query:e}=this.props.query;return(0,d.jsx)(i.InlineFieldRow,{children:(0,d.jsx)(i.InlineField,{label:"Query",grow:!0,labelWidth:12,children:(0,d.jsx)(i.Input,{placeholder:"Everything",defaultValue:null!=e?e:"",onKeyDown:this.handleSearchEnterKey,onBlur:this.handleSearchBlur,spellCheck:!1})})})}render(){const e=Object.assign({},o.wi,this.props.query);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.InlineFieldRow,{children:(0,d.jsx)(i.InlineField,{label:"Query type",grow:!0,labelWidth:12,children:(0,d.jsx)(i.Select,{menuShouldPortal:!0,options:this.queryTypes,value:this.queryTypes.find((a=>a.value===e.queryType))||this.queryTypes[0],onChange:this.onQueryTypeChange})})}),e.queryType===o.hR.LiveMeasurements&&this.renderMeasurementsQuery(),e.queryType===o.hR.List&&this.renderListPublicFiles(),e.queryType===o.hR.Search&&this.renderSearch()]})}}var h=t("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),p=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/from.js"),g=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/merge.js"),f=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),m=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js"),y=t("./public/app/features/dashboard/state/DashboardMigrator.ts"),b=t("./public/app/features/dashboard/services/DashboardSrv.ts"),v=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),j=t("./public/app/core/components/TagFilter/TagFilter.tsx"),x=t("./public/app/features/annotations/api.ts");const S=(0,d.jsx)("div",{children:"Specify a list of tags to match. To specify a key and value tag use `key:value` syntax."}),C=[{label:"Dashboard",value:o._$.Dashboard,description:"Query for events created on this dashboard and show them in the panels where they where created"},{label:"Tags",value:o._$.Tags,description:"This will fetch any annotation events that match the tags filter"}],w=[10,50,100,200,300,500,1e3,2e3].map((e=>({label:String(e),value:e})));function F(e){let{query:a,onChange:t}=e;const n=a,{limit:s,matchAny:r,tags:l,type:u}=n,c=T();return(0,d.jsxs)(i.FieldSet,{className:c.container,children:[(0,d.jsx)(i.Field,{label:"Filter by",children:(0,d.jsx)(i.Select,{menuShouldPortal:!0,inputId:"grafana-annotations__filter-by",options:C,value:u,onChange:e=>t(Object.assign({},n,{type:e.value}))})}),(0,d.jsx)(i.Field,{label:"Max limit",children:(0,d.jsx)(i.Select,{menuShouldPortal:!0,inputId:"grafana-annotations__limit",width:16,options:w,value:s,onChange:e=>t(Object.assign({},n,{limit:e.value}))})}),u===o._$.Tags&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.Field,{label:"Match any",description:"Enabling this returns annotations that match any of the tags specified below",children:(0,d.jsx)(i.Switch,{id:"grafana-annotations__match-any",value:r,onChange:e=>t(Object.assign({},n,{matchAny:e.target.checked}))})}),(0,d.jsx)(i.Field,{label:"Tags",description:S,children:(0,d.jsx)(j.D,{allowCustomValue:!0,formatCreateLabel:e=>`Use custom value: ${e}`,inputId:"grafana-annotations__tags",onChange:e=>t(Object.assign({},n,{tags:e})),tagOptions:x.lK,tags:null!=l?l:[]})})]})]})}const T=()=>({container:v.css`
      max-width: 600px;
    `});let q=100;class R extends l.DataSourceWithBackend{constructor(e){super(e),this.annotations={QueryEditor:F,prepareAnnotation(e){var a,t,n,s,r;return e.target=null!==(a=e.target)&&void 0!==a?a:{type:null!==(t=e.type)&&void 0!==t?t:o._$.Dashboard,limit:null!==(n=e.limit)&&void 0!==n?n:100,tags:null!==(s=e.tags)&&void 0!==s?s:[],matchAny:null!==(r=e.matchAny)&&void 0!==r&&r},e},prepareQuery(e){let a;if((0,h.isString)(e.datasource)){const t=(0,y.p)(e.datasource,{returnDefaultAsNull:!1});t&&(a=t)}else a=e.datasource;return Object.assign({},e,{refId:e.name,queryType:o.hR.Annotations,datasource:a})}}}query(e){const a=[],t=[],n=(0,l.getTemplateSrv)();for(const d of e.targets){if(d.queryType===o.hR.Annotations)return(0,p.D)(this.getAnnotations({range:e.range,rangeRaw:e.range.raw,annotation:d,dashboard:(0,b.h4)().getCurrent()}));if(!d.hide)if(d.queryType===o.hR.LiveMeasurements){var r,i;let t=n.replace(d.channel,e.scopedVars);const{filter:o}=d;t&&t.startsWith("telegraf/")&&(t="stream/"+t,d.channel=t);const u=(0,s.parseLiveChannelAddress)(t);if(!(0,s.isValidLiveChannelAddress)(u))continue;const c={maxLength:null!==(r=e.maxDataPoints)&&void 0!==r?r:500};d.buffer?(c.maxDelta=d.buffer,c.maxLength=2*c.maxLength):"now"===(null===(i=e.rangeRaw)||void 0===i?void 0:i.to)&&(c.maxDelta=e.range.to.valueOf()-e.range.from.valueOf()),a.push((0,l.getGrafanaLiveSrv)().getDataStream({key:`${e.requestId}.${q++}`,addr:u,filter:o,buffer:c}))}else d.queryType||(d.queryType=o.hR.RandomWalk),t.push(d)}return t.length&&a.push(super.query(Object.assign({},e,{targets:t}))),a.length?1===a.length?a[0]:(0,g.T)(...a):(0,f.of)()}listFiles(e){return this.query({targets:[{refId:"A",queryType:o.hR.List,path:e}]}).pipe((0,m.U)((e=>{var a;const t=null!==(a=e.data[0])&&void 0!==a?a:new s.MutableDataFrame;return new s.DataFrameView(t)})))}metricFindQuery(e){return Promise.resolve([])}async getAnnotations(e){var a;const t=(0,l.getTemplateSrv)(),n=e.annotation,r=n.target,i={from:e.range.from.valueOf(),to:e.range.to.valueOf(),limit:r.limit,tags:r.tags,matchAny:r.matchAny};if(r.type===o._$.Dashboard){if(!e.dashboard.id)return Promise.resolve({data:[]});i.dashboardId=e.dashboard.id,delete i.tags}else{if(!Array.isArray(r.tags)||0===r.tags.length)return Promise.resolve({data:[]});const e="__delimiter__",a=[];for(const n of i.tags){const s=t.replace(n,{},(a=>"string"==typeof a?a:a.join(e)));for(const t of s.split(e))a.push(t)}i.tags=a}const d=await(0,l.getBackendSrv)().get("/api/annotations",i,`grafana-data-source-annotations-${n.name}-${null===(a=e.dashboard)||void 0===a?void 0:a.id}`);return{data:[(0,s.toDataFrame)(d)]}}testDatasource(){return Promise.resolve()}}const k=new s.DataSourcePlugin(R).setQueryEditor(c)},"./public/app/plugins/datasource/grafana/types.ts":(e,a,t)=>{let n;t.d(a,{_$:()=>r,hR:()=>n,wi:()=>s}),function(e){e.LiveMeasurements="measurements",e.Annotations="annotations",e.RandomWalk="randomWalk",e.List="list",e.Read="read",e.Search="search"}(n||(n={}));const s={refId:"A",queryType:n.RandomWalk};let r;!function(e){e.Dashboard="dashboard",e.Tags="tags"}(r||(r={}))}}]);
//# sourceMappingURL=grafanaPlugin.b208037f6b1954dc031d.js.map