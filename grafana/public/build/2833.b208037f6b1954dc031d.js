"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2833],{"./public/app/features/admin/utils.ts":(a,e,t)=>{t.d(e,{d:()=>n});var i=t("./packages/grafana-runtime/src/index.ts");const n=()=>function(){var a;const e=null===(a=i.config.licenseInfo)||void 0===a?void 0:a.trialExpiry;return!!(e&&e>0)}()&&i.config.featureToggles.featureHighlights},"./public/app/features/datasources/state/actions.ts":(a,e,t)=>{t.d(e,{J_:()=>D,xU:()=>I,M9:()=>v,gv:()=>k,Kj:()=>U,bZ:()=>w,kY:()=>S,oe:()=>$});var i=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"),n=t("./packages/grafana-data/src/index.ts"),s=t("./packages/grafana-runtime/src/index.ts"),r=t("./public/app/core/actions/index.ts"),o=t("./public/app/core/services/backend_srv.ts"),c=t("./public/app/core/utils/accessControl.ts"),u=t("./public/app/features/plugins/datasource_srv.ts"),d=t("./public/app/features/plugins/pluginSettings.ts"),l=t("./public/app/features/plugins/plugin_loader.ts"),p=t("./public/app/core/services/context_srv.ts");function g(a){const e=[{id:"tsdb",title:"Time series databases",plugins:[]},{id:"logging",title:"Logging & document databases",plugins:[]},{id:"tracing",title:"Distributed tracing",plugins:[]},{id:"sql",title:"SQL",plugins:[]},{id:"cloud",title:"Cloud",plugins:[]},{id:"enterprise",title:"Enterprise plugins",plugins:[]},{id:"iot",title:"Industrial & IoT",plugins:[]},{id:"other",title:"Others",plugins:[]}].filter((a=>a)),t={},i={},r=[m({id:"grafana-splunk-datasource",name:"Splunk",description:"Visualize and explore Splunk logs",imgUrl:"public/img/plugins/splunk_logo_128.png"}),m({id:"grafana-oracle-datasource",name:"Oracle",description:"Visualize and explore Oracle SQL",imgUrl:"public/img/plugins/oracle.png"}),m({id:"grafana-dynatrace-datasource",name:"Dynatrace",description:"Visualize and explore Dynatrace data",imgUrl:"public/img/plugins/dynatrace.png"}),m({id:"grafana-servicenow-datasource",description:"ServiceNow integration and data source",name:"ServiceNow",imgUrl:"public/img/plugins/servicenow.svg"}),m({id:"grafana-datadog-datasource",description:"DataDog integration and data source",name:"DataDog",imgUrl:"public/img/plugins/datadog.png"}),m({id:"grafana-newrelic-datasource",description:"New Relic integration and data source",name:"New Relic",imgUrl:"public/img/plugins/newrelic.svg"}),m({id:"grafana-mongodb-datasource",description:"MongoDB integration and data source",name:"MongoDB",imgUrl:"public/img/plugins/mongodb.svg"}),m({id:"grafana-snowflake-datasource",description:"Snowflake integration and data source",name:"Snowflake",imgUrl:"public/img/plugins/snowflake.svg"}),m({id:"grafana-wavefront-datasource",description:"Wavefront integration and data source",name:"Wavefront",imgUrl:"public/img/plugins/wavefront.svg"}),m({id:"dlopes7-appdynamics-datasource",description:"AppDynamics integration and data source",name:"AppDynamics",imgUrl:"public/img/plugins/appdynamics.svg"}),m({id:"grafana-saphana-datasource",description:"SAP HANA® integration and data source",name:"SAP HANA®",imgUrl:"public/img/plugins/sap_hana.png"}),m({id:"grafana-honeycomb-datasource",description:"Honeycomb integration and datasource",name:"Honeycomb",imgUrl:"public/img/plugins/honeycomb.png"}),m({id:"grafana-salesforce-datasource",description:"Salesforce integration and datasource",name:"Salesforce",imgUrl:"public/img/plugins/salesforce.svg"}),m({id:"grafana-jira-datasource",description:"Jira integration and datasource",name:"Jira",imgUrl:"public/img/plugins/jira_logo.png"}),m({id:"grafana-gitlab-datasource",description:"GitLab integration and datasource",name:"GitLab",imgUrl:"public/img/plugins/gitlab.svg"}),m({id:"grafana-splunk-monitoring-datasource",description:"SignalFx integration and datasource",name:"Splunk Infrastructure Monitoring",imgUrl:"public/img/plugins/signalfx-logo.svg"})];for(const a of e)t[a.id]=a;for(const n of a){const a=r.find((a=>a.id===n.id));var o;if(n.enterprise||a)n.category="enterprise",n.unlicensed=!(0,s.featureEnabled)("enterprise.plugins"),n.info.links=(null==a||null===(o=a.info)||void 0===o?void 0:o.links)||n.info.links;if(n.info.links)for(const a of n.info.links)a.name="Learn more";(e.find((a=>a.id===n.category))||t.other).plugins.push(n),i[n.id]=n}for(const a of e){if("cloud"===a.id&&a.plugins.push({id:"gcloud",name:"Grafana Cloud",type:n.PluginType.datasource,module:"phantom",baseUrl:"",info:{description:"Hosted Graphite, Prometheus, and Loki",logos:{small:"public/img/grafana_icon.svg",large:"asd"},author:{name:"Grafana Labs"},links:[{url:"https://grafana.com/products/cloud/",name:"Learn more"}],screenshots:[],updated:"2019-05-10",version:"1.0.0"}}),"enterprise"===a.id)for(const e of r)i[e.id]||a.plugins.push(e);f(a.plugins)}return e.filter((a=>a.plugins.length>0))}function f(a){const e={prometheus:100,graphite:95,loki:90,mysql:80,jaeger:100,postgres:79,gcloud:-1};a.sort(((a,t)=>{const i=e[a.id]||0,n=e[t.id]||0;return i>n?-1:i<n?1:a.name>t.name?-1:1}))}function m(a){return{id:a.id,name:a.name,type:n.PluginType.datasource,module:"phantom",baseUrl:"",info:{description:a.description,logos:{small:a.imgUrl,large:a.imgUrl},author:{name:"Grafana Labs"},links:[{url:s.config.pluginCatalogURL+a.id,name:"Install now"}],screenshots:[],updated:"2019-05-10",version:"1.0.0"}}}var h=t("./public/app/features/datasources/state/navModel.ts"),b=t("./public/app/features/datasources/state/reducers.ts"),y=t("./public/app/features/datasources/state/selectors.ts");const v=function(a){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{loadDataSource:k,loadDataSourceMeta:x,getDataSource:y.f6,getDataSourceMeta:y.G4,importDataSourcePlugin:l.nL};return async(t,i)=>{if(a)try{const n=await t(e.loadDataSource(a));if(await t(e.loadDataSourceMeta(n)),i().dataSourceSettings.plugin)return;const s=e.getDataSource(i().dataSources,a),r=e.getDataSourceMeta(i().dataSources,s.type),o=await e.importDataSourcePlugin(r);t((0,b.iZ)(o))}catch(a){t((0,b.CT)(a))}else t((0,b.CT)(new Error("Invalid ID")))}},S=function(a){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{getDatasourceSrv:u.ak,getBackendSrv:o.i};return async(t,i)=>{const n=await e.getDatasourceSrv().get(a);n.testDatasource&&(t((0,b.j_)()),e.getBackendSrv().withNoBackendCache((async()=>{try{const a=await n.testDatasource();t((0,b.ng)(a))}catch(a){const{statusText:e,message:i,details:n,data:s}=a,r=i||(null==s?void 0:s.message)||"HTTP error "+e;t((0,b.Aq)({message:r,details:n}))}})))}};function w(){return async a=>{const e=await(0,o.i)().get("/api/datasources");a((0,b.be)(e))}}function k(a){return async e=>{const t=await async function(a){try{const e=await(0,i.n)((0,o.i)().fetch({method:"GET",url:`/api/datasources/uid/${a}`,params:(0,c.y)(),showErrorAlert:!1}));if(e.ok)return e.data}catch(a){console.log("Failed to lookup data source by uid",a)}const e="string"==typeof a?parseInt(a,10):a;if(!Number.isNaN(e)){const t=await(0,i.n)((0,o.i)().fetch({method:"GET",url:`/api/datasources/${e}`,params:(0,c.y)(),showErrorAlert:!1}));if(t.ok&&"number"==typeof a&&t.data.id===a)return t.data;if(t.ok&&t.data.id.toString()===a)return window.location.href=n.locationUtil.assureBaseUrl(`/datasources/edit/${t.data.uid}`),{}}throw Error("Could not find data source")}(a);return e((0,b.rl)(t)),t}}function x(a){return async e=>{const t=await(0,d.a)(a.type),i=await(0,l.nL)(t),n=i.DataSourceClass.prototype instanceof s.DataSourceWithBackend,o=Object.assign({},t,{isBackend:t.backend||n});e((0,b.jS)(o)),i.meta=o,e((0,r.RL)((0,h.B1)(a,i)))}}function D(a){return async(e,t)=>{await e(w());const i=t().dataSources.dataSources,n={name:a.name,type:a.id,access:"proxy",isDefault:0===i.length};L(i,n.name)&&(n.name=function(a,e){for(;L(a,e);)e=P(e)?`${A(e)}${C(T(e))}`:`${e}-1`;return e}(i,n.name));const r=await(0,o.i)().post("/api/datasources",n);await(0,u.ak)().reload(),await p.Vt.fetchUserPermissions(),s.locationService.push(`/datasources/edit/${r.datasource.uid}`)}}function U(){return async a=>{a((0,b.Ww)());const e=await(0,o.i)().get("/api/plugins",{enabled:1,type:"datasource"}),t=g(e);a((0,b.wZ)({plugins:e,categories:t}))}}function $(a){return async e=>(await(0,o.i)().put(`/api/datasources/${a.id}`,a),await(0,u.ak)().reload(),e(k(a.uid)))}function I(){return async(a,e)=>{const t=e().dataSources.dataSource;await(0,o.i)().delete(`/api/datasources/${t.id}`),await(0,u.ak)().reload(),s.locationService.push("/datasources")}}function L(a,e){return a.filter((a=>a.name.toLowerCase()===e.toLowerCase())).length>0}function P(a){return a.endsWith("-",a.length-1)}function T(a){return parseInt(a.slice(-1),10)}function C(a){return isNaN(a)?1:a+1}function A(a){return a.slice(0,a.length-1)}},"./public/app/features/datasources/state/navModel.ts":(a,e,t)=>{t.d(e,{B1:()=>l,nI:()=>p,xG:()=>g});var i=t("./packages/grafana-data/src/index.ts"),n=t("./packages/grafana-runtime/src/index.ts"),s=t("./public/app/core/components/Upgrade/ProBadge.tsx"),r=t("./public/app/core/config.ts"),o=t("./public/app/core/core.ts"),c=t("./public/app/types/index.ts"),u=t("./public/app/features/admin/utils.ts");const d="Loading";function l(a,e){const t=e.meta,i=r.ZP.featureToggles.featureHighlights,l={img:t.info.logos.large,id:"datasource-"+a.uid,subTitle:`Type: ${t.name}`,url:"",text:a.name,breadcrumbs:[{title:"Data Sources",url:"datasources"}],children:[{active:!1,icon:"sliders-v-alt",id:`datasource-settings-${a.uid}`,text:"Settings",url:`datasources/edit/${a.uid}/`}]};if(e.configPages)for(const t of e.configPages)l.children.push({active:!1,text:t.title,icon:t.icon,url:`datasources/edit/${a.uid}/?page=${t.id}`,id:`datasource-page-${t.id}`});t.includes&&void 0!==t.includes.find((a=>"dashboard"===a.type))&&o.Vt.hasRole("Admin")&&l.children.push({active:!1,icon:"apps",id:`datasource-dashboards-${a.uid}`,text:"Dashboards",url:`datasources/edit/${a.uid}/dashboards`});const p=a.type===d,g="feature-highlights-data-source-permissions-badge",f={active:!1,icon:"lock",id:`datasource-permissions-${a.uid}`,text:"Permissions",url:`datasources/edit/${a.uid}/permissions`};(0,u.d)()&&!p&&(f.tabSuffix=()=>(0,s.Z)({experimentId:g,eventVariant:"trial"})),(0,n.featureEnabled)("dspermissions")?o.Vt.hasPermission(c.bW.DataSourcesPermissionsRead)&&l.children.push(f):i&&!p&&l.children.push(Object.assign({},f,{url:f.url+"/upgrade",tabSuffix:()=>(0,s.Z)({experimentId:g})}));const m="feature-highlights-data-source-insights-badge",h={active:!1,icon:"info-circle",id:`datasource-insights-${a.uid}`,text:"Insights",url:`datasources/edit/${a.uid}/insights`};(0,u.d)()&&!p&&(h.tabSuffix=()=>(0,s.Z)({experimentId:m,eventVariant:"trial"})),(0,n.featureEnabled)("analytics")?l.children.push(h):i&&!p&&l.children.push(Object.assign({},h,{url:h.url+"/upgrade",tabSuffix:()=>(0,s.Z)({experimentId:m})}));const b="feature-highlights-query-caching-badge",y={active:!1,icon:"database",id:`datasource-cache-${a.uid}`,text:"Cache",url:`datasources/edit/${a.uid}/cache`,hideFromTabs:!t.isBackend||!r.ZP.caching.enabled};return(0,u.d)()&&!p&&(y.tabSuffix=()=>(0,s.Z)({experimentId:b,eventVariant:"trial"})),(0,n.featureEnabled)("caching")?l.children.push(y):i&&!p&&l.children.push(Object.assign({},y,{url:y.url+"/upgrade",tabSuffix:()=>(0,s.Z)({experimentId:b})})),l}function p(a,e){let t={text:""};for(const i of a.children)if(i.id.indexOf(e)>0){i.active=!0,t=i;break}return{main:a,node:t}}function g(a){return p(l({access:"",basicAuth:!1,basicAuthUser:"",basicAuthPassword:"",withCredentials:!1,database:"",id:1,uid:"x",isDefault:!1,jsonData:{authType:"credentials",defaultRegion:"eu-west-2"},name:"Loading",orgId:1,password:"",readOnly:!1,type:d,typeName:d,typeLogoUrl:"public/img/icn-datasource.svg",url:"",user:"",secureJsonFields:{}},{meta:{id:"1",type:i.PluginType.datasource,name:"",info:{author:{name:"",url:""},description:"",links:[{name:"",url:""}],logos:{large:"",small:""},screenshots:[],updated:"",version:""},includes:[],module:"",baseUrl:""}}),a)}},"./public/app/features/datasources/state/selectors.ts":(a,e,t)=>{t.d(e,{G4:()=>r,IO:()=>o,f6:()=>s,mt:()=>i,pc:()=>c,r7:()=>u,xo:()=>n});const i=a=>{const e=new RegExp(a.searchQuery,"i");return a.dataSources.filter((a=>e.test(a.name)||e.test(a.database)||e.test(a.type)))},n=a=>{const e=new RegExp(a.dataSourceTypeSearchQuery,"i");return a.plugins.filter((a=>e.test(a.name)))},s=(a,e)=>a.dataSource.uid===e?a.dataSource:{},r=(a,e)=>a.dataSourceMeta.id===e?a.dataSourceMeta:{},o=a=>a.searchQuery,c=a=>a.layoutMode,u=a=>a.dataSourcesCount}}]);
//# sourceMappingURL=2833.b208037f6b1954dc031d.js.map