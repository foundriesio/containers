"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[6795],{"./public/app/plugins/datasource/alertmanager/module.ts":(e,t,a)=>{a.r(t),a.d(t,{plugin:()=>m});var s,n,i=a("./packages/grafana-data/src/index.ts"),r=(a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a("./packages/grafana-ui/src/index.ts")),o=a("./public/app/plugins/datasource/alertmanager/types.ts"),c=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const l=[{value:o.sK.cortex,label:"Cortex",description:"https://cortexmetrics.io/"},{value:o.sK.prometheus,label:"Prometheus",description:"https://prometheus.io/. Does not support editing configuration via API, so contact points and notification policies are read-only."}];var u=a("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),d=a("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"),p=a("./packages/grafana-runtime/src/index.ts");class h extends i.DataSourceApi{constructor(e){super(e),this.instanceSettings=e,this.instanceSettings=e}query(){return(0,u.of)({data:[]})}_request(e){const t={headers:{},method:"GET",url:this.instanceSettings.url+e};return(this.instanceSettings.basicAuth||this.instanceSettings.withCredentials)&&(this.instanceSettings.withCredentials=!0),this.instanceSettings.basicAuth&&(t.headers.Authorization=this.instanceSettings.basicAuth),(0,d.n)((0,p.getBackendSrv)().fetch(t))}async testDatasource(){var e;let t;if(this.instanceSettings.jsonData.implementation===o.sK.prometheus){try{var a;if(t=await this._request("/alertmanager/api/v2/status"),t&&200===(null===(a=t)||void 0===a?void 0:a.status))return{status:"error",message:"It looks like you have chosen Prometheus implementation, but detected a Cortex endpoint. Please update implementation selection and try again."}}catch(e){}try{t=await this._request("/api/v2/status")}catch(e){}}else{try{var s;if(t=await this._request("/api/v2/status"),t&&200===(null===(s=t)||void 0===s?void 0:s.status))return{status:"error",message:"It looks like you have chosen Cortex implementation, but detected a Prometheus endpoint. Please update implementation selection and try again."}}catch(e){}try{t=await this._request("/alertmanager/api/v2/status")}catch(e){}}return 200===(null===(e=t)||void 0===e?void 0:e.status)?{status:"success",message:"Health check passed."}:{status:"error",message:"Health check failed."}}}const m=new i.DataSourcePlugin(h).setConfigEditor((e=>{let{options:t,onOptionsChange:a}=e;return(0,c.jsxs)(c.Fragment,{children:[s||(s=(0,c.jsx)("h3",{className:"page-heading",children:"Alertmanager"})),(0,c.jsx)("div",{className:"gf-form-group",children:(0,c.jsx)("div",{className:"gf-form-inline",children:(0,c.jsxs)("div",{className:"gf-form",children:[n||(n=(0,c.jsx)(r.InlineFormLabel,{width:13,children:"Implementation"})),(0,c.jsx)(r.Select,{width:40,options:l,value:t.jsonData.implementation||o.sK.cortex,onChange:e=>a(Object.assign({},t,{jsonData:Object.assign({},t.jsonData,{implementation:e.value})}))})]})})}),(0,c.jsx)(r.DataSourceHttpSettings,{defaultUrl:"",dataSourceConfig:t,showAccessOptions:!0,onChange:a})]})}))}}]);
//# sourceMappingURL=alertmanagerPlugin.b208037f6b1954dc031d.js.map