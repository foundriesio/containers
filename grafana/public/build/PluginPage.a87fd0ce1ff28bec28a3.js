"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2417],{"./public/app/features/datasources/DashboardsTable.tsx":(e,n,a)=>{a.d(n,{Z:()=>r});a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var t,s=a("./packages/grafana-ui/src/index.ts"),i=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const r=e=>{let{dashboards:n,onImport:a,onRemove:r}=e;function l(e){return e.revision!==e.importedRevision?"Update":"Re-import"}return(0,i.jsx)("table",{className:"filter-table",children:(0,i.jsx)("tbody",{children:n.map(((e,n)=>(0,i.jsxs)("tr",{children:[t||(t=(0,i.jsx)("td",{className:"width-1",children:(0,i.jsx)(s.Icon,{name:"apps"})})),(0,i.jsx)("td",{children:e.imported?(0,i.jsx)("a",{href:e.importedUrl,children:e.title}):(0,i.jsx)("span",{children:e.title})}),(0,i.jsxs)("td",{style:{textAlign:"right"},children:[e.imported?(0,i.jsx)(s.Button,{variant:"secondary",size:"sm",onClick:()=>a(e,!0),children:l(e)}):(0,i.jsx)(s.Button,{variant:"secondary",size:"sm",onClick:()=>a(e,!1),children:"Import"}),e.imported&&(0,i.jsx)(s.Button,{icon:"trash-alt",variant:"destructive",size:"sm",onClick:()=>r(e)})]})]},`${e.dashboardId}-${n}`)))})})}},"./public/app/features/plugins/admin/components/Badges/index.ts":(e,n,a)=>{a.d(n,{SX:()=>r,IF:()=>p,oZ:()=>c,xh:()=>g});a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var t=a("./packages/grafana-data/src/index.ts"),s=a("./packages/grafana-ui/src/index.ts"),i=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function r(e){let{error:n}=e;const a=function(e){switch(e){case t.PluginErrorCode.modifiedSignature:return"Plugin disabled due to modified content";case t.PluginErrorCode.invalidSignature:return"Plugin disabled due to invalid plugin signature";case t.PluginErrorCode.missingSignature:return"Plugin disabled due to missing plugin signature";default:return`Plugin disabled due to unkown error: ${e}`}}(n);return(0,i.jsx)(s.Badge,{icon:"exclamation-triangle",text:"Disabled",color:"red",tooltip:a})}var l=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");const o=e=>l.css`
  background: ${e.colors.background.primary};
  border-color: ${e.colors.border.strong};
  color: ${e.colors.text.secondary};
`;function c(){const e=(0,s.useStyles2)(o);return(0,i.jsx)(s.Badge,{text:"Installed",color:"orange",className:e})}var d,u=a("./packages/grafana-runtime/src/index.ts");function p(e){let{plugin:n}=e;const a=(0,s.useStyles2)(o);return(0,u.featureEnabled)("enterprise.plugins")?d||(d=(0,i.jsx)(s.Badge,{text:"Enterprise",color:"blue"})):(0,i.jsxs)(s.HorizontalGroup,{children:[(0,i.jsx)(s.PluginSignatureBadge,{status:n.signature}),(0,i.jsx)(s.Badge,{icon:"lock","aria-label":"lock icon",text:"Enterprise",color:"blue",className:a}),(0,i.jsx)(s.Button,{size:"sm",fill:"text",icon:"external-link-alt",onClick:e=>{e.preventDefault(),window.open(`https://grafana.com/grafana/plugins/${n.id}?utm_source=grafana_catalog_learn_more`,"_blank","noopener,noreferrer")},children:"Learn more"})]})}function g(e){let{plugin:n}=e;const a=(0,s.useStyles2)(h);return n.hasUpdate&&!n.isCore&&n.type!==t.PluginType.renderer?(0,i.jsx)("p",{className:a.hasUpdate,children:"Update available!"}):null}const h=e=>({hasUpdate:l.css`
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      margin-bottom: 0;
    `})},"./public/app/features/plugins/admin/components/Loader.tsx":(e,n,a)=>{a.d(n,{a:()=>r});a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var t=a("./packages/grafana-ui/src/index.ts"),s=a("./public/app/features/plugins/admin/components/Page.tsx"),i=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const r=e=>{let{text:n="Loading..."}=e;return(0,i.jsx)(s.T,{children:(0,i.jsx)("div",{className:"page-loader-wrapper",children:(0,i.jsx)(t.LoadingPlaceholder,{text:n})})})}},"./public/app/features/plugins/admin/components/Page.tsx":(e,n,a)=>{a.d(n,{T:()=>r});var t=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=(a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a("./packages/grafana-ui/src/index.ts")),i=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const r=e=>{let{children:n}=e;const a=(0,s.useStyles2)(l);return(0,i.jsx)("div",{className:"page-container",children:(0,i.jsx)("div",{className:a,children:n})})},l=e=>t.css`
    margin-bottom: ${e.spacing(3)};
  `},"./public/app/features/plugins/admin/components/PluginLogo.tsx":(e,n,a)=>{a.d(n,{E:()=>s});a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var t=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function s(e){let{alt:n,className:a,src:s,height:i}=e;return(0,t.jsx)("img",{src:s,className:a,alt:n,loading:"lazy",height:i})}},"./public/app/features/plugins/admin/pages/PluginDetails.tsx":(e,n,a)=>{a.r(n),a.d(n,{default:()=>De,getStyles:()=>Ee});var t,s,i=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),l=a("./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/usePrevious.js"),o=a("./packages/grafana-runtime/src/index.ts"),c=a("./packages/grafana-ui/src/index.ts"),d=a("./packages/grafana-ui/src/components/Layout/Layout.tsx"),u=a("./public/app/core/components/Page/Page.tsx"),p=a("./public/app/types/index.ts"),g=a("./public/app/features/plugins/admin/components/Loader.tsx"),h=a("./public/app/features/plugins/admin/components/Page.tsx"),m=a("./packages/grafana-data/src/index.ts"),f=a("./public/app/features/plugins/admin/helpers.ts"),x=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const b=e=>{let{versions:n=[],installedVersion:a}=e;const i=(0,c.useStyles2)(v),r=(0,f.RU)(n);return 0===n.length?t||(t=(0,x.jsx)("p",{children:"No version history was found."})):(0,x.jsxs)("table",{className:i.table,children:[s||(s=(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)("th",{children:"Version"}),(0,x.jsx)("th",{children:"Last updated"})]})})),(0,x.jsx)("tbody",{children:n.map((e=>{const n=a===e.version;return(0,x.jsxs)("tr",{children:[n?(0,x.jsxs)("td",{className:i.currentVersion,children:[e.version," (installed version)"]}):e.version===(null==r?void 0:r.version)?(0,x.jsxs)("td",{children:[e.version," (latest compatible version)"]}):(0,x.jsx)("td",{children:e.version}),(0,x.jsx)("td",{className:n?i.currentVersion:"",children:(0,m.dateTimeFormatTimeAgo)(e.createdAt)})]},e.version)}))})]})},v=e=>({container:i.css`
    padding: ${e.spacing(2,4,3)};
  `,table:i.css`
    table-layout: fixed;
    width: 100%;
    td,
    th {
      padding: ${e.spacing()} 0;
    }
    th {
      font-size: ${e.typography.h5.fontSize};
    }
  `,currentVersion:i.css`
    font-weight: ${e.typography.fontWeightBold};
  `});var j=a("./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useAsync.js"),y=a("./public/app/features/plugins/importPanelPlugin.ts"),S=a("./public/app/features/plugins/pluginSettings.ts"),P=a("./public/app/features/plugins/plugin_loader.ts");const N=e=>(0,j.Z)((async()=>e&&e.isInstalled&&!e.isDisabled?async function(e){const n=await(0,S.a)(e);let a;n.type===m.PluginType.app&&(a=await(0,P.Av)(n)),n.type===m.PluginType.datasource&&(a=await(0,P.nL)(n)),n.type===m.PluginType.panel&&(a=await(0,y._)(n));if(n.type===m.PluginType.renderer&&(a={meta:n}),!a)throw new Error("Unknown Plugin type: "+n.type);return a}(e.id):null),[null==e?void 0:e.id,null==e?void 0:e.isInstalled,null==e?void 0:e.isDisabled]);var k,_,w=a("./public/app/features/plugins/admin/types.ts"),I=a("./.yarn/cache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js");function $(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}class C extends r.PureComponent{constructor(e){super(e),$(this,"element",null),$(this,"model",void 0),$(this,"preUpdateHook",(()=>Promise.resolve())),$(this,"postUpdateHook",(()=>Promise.resolve())),$(this,"update",(()=>{const e=this.model.id;this.preUpdateHook().then((()=>{const n=(0,I.extend)({enabled:this.model.enabled,pinned:this.model.pinned,jsonData:this.model.jsonData,secureJsonData:this.model.secureJsonData},{});return(0,o.getBackendSrv)().post(`/api/plugins/${e}/settings`,n)})).then(this.postUpdateHook).then((e=>{window.location.href=window.location.href}))})),$(this,"setPreUpdateHook",(e=>{this.preUpdateHook=e})),$(this,"setPostUpdateHook",(e=>{this.postUpdateHook=e})),$(this,"importDashboards",(()=>((0,m.deprecationWarning)("AppConfig","importDashboards()"),Promise.resolve()))),$(this,"enable",(()=>{this.model.enabled=!0,this.model.pinned=!0,this.update()})),$(this,"disable",(()=>{this.model.enabled=!1,this.model.pinned=!1,this.update()})),this.state={angularCtrl:null,refresh:0}}componentDidMount(){setTimeout((()=>{this.setState({refresh:this.state.refresh+1})}),5)}componentDidUpdate(e){if(!this.element||this.state.angularCtrl)return;this.model=(0,I.cloneDeep)(this.props.app.meta);const n={ctrl:this,isAppConfigCtrl:!0},a=(0,o.getAngularLoader)().load(this.element,n,'<plugin-component type="app-config-ctrl"></plugin-component>');this.setState({angularCtrl:a})}render(){const e=this.model,n=(0,i.css)({marginRight:"8px"});return(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{ref:e=>this.element=e}),k||(k=(0,x.jsx)("br",{})),_||(_=(0,x.jsx)("br",{})),e&&(0,x.jsxs)("div",{className:"gf-form",children:[!e.enabled&&(0,x.jsx)(c.Button,{variant:"primary",onClick:this.enable,className:n,children:"Enable"}),e.enabled&&(0,x.jsx)(c.Button,{variant:"primary",onClick:this.update,className:n,children:"Update"}),e.enabled&&(0,x.jsx)(c.Button,{variant:"destructive",onClick:this.disable,className:n,children:"Disable"})]})]})}}var D,E,T,z=a("./public/app/core/core.ts"),U=a("./public/app/features/datasources/DashboardsTable.tsx");function B(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}class L extends r.PureComponent{constructor(e){super(e),B(this,"importAll",(()=>{this.importNext(0)})),B(this,"importNext",(e=>{const{dashboards:n}=this.state;return this.import(n[e],!0).then((()=>e+1<n.length?new Promise((n=>{setTimeout((()=>{this.importNext(e+1).then((()=>{n()}))}),500)})):Promise.resolve()))})),B(this,"import",((e,n)=>{const{plugin:a,datasource:t}=this.props,s={pluginId:a.id,path:e.path,overwrite:n,inputs:[]};return t&&s.inputs.push({name:"*",type:"datasource",pluginId:t.meta.id,value:t.name}),(0,o.getBackendSrv)().post("/api/dashboards/import",s).then((n=>{z.h$.emit(m.AppEvents.alertSuccess,["Dashboard Imported",e.title]),(0,I.extend)(e,n),this.setState({dashboards:[...this.state.dashboards]})}))})),B(this,"remove",(e=>{(0,o.getBackendSrv)().delete("/api/dashboards/uid/"+e.uid).then((()=>{e.imported=!1,this.setState({dashboards:[...this.state.dashboards]})}))})),this.state={loading:!0,dashboards:[]}}async componentDidMount(){const e=this.props.plugin.id;(0,o.getBackendSrv)().get(`/api/plugins/${e}/dashboards`).then((e=>{this.setState({dashboards:e,loading:!1})}))}render(){const{loading:e,dashboards:n}=this.state;return e?D||(D=(0,x.jsx)("div",{children:"loading..."})):n&&n.length?(0,x.jsx)("div",{className:"gf-form-group",children:(0,x.jsx)(U.Z,{dashboards:n,onImport:this.import,onRemove:this.remove})}):E||(E=(0,x.jsx)("div",{children:"No dashboards are included with this plugin"}))}}function A(e){let{plugin:n,queryParams:a,pageId:t}=e;const s=(0,c.useStyles2)(V),{value:r}=N(n);var l,o,d;if(t===w.tu.OVERVIEW)return(0,x.jsx)("div",{className:(0,i.cx)(s.readme,s.container),dangerouslySetInnerHTML:{__html:null!==(l=null===(o=n.details)||void 0===o?void 0:o.readme)&&void 0!==l?l:"No plugin help or readme markdown file was found"}});if(t===w.tu.VERSIONS)return(0,x.jsx)("div",{className:s.container,children:(0,x.jsx)(b,{versions:null===(d=n.details)||void 0===d?void 0:d.versions,installedVersion:n.installedVersion})});if(t===w.tu.CONFIG&&null!=r&&r.angularConfigCtrl)return(0,x.jsx)("div",{className:s.container,children:(0,x.jsx)(C,{app:r})});if(null!=r&&r.configPages)for(const e of r.configPages){var u;if(t===e.id)return(0,x.jsx)("div",{className:s.container,children:u||(u=(0,x.jsx)(e.body,{plugin:r,query:a}))})}return t===w.tu.DASHBOARDS&&r?(0,x.jsx)("div",{className:s.container,children:(0,x.jsx)(L,{plugin:null==r?void 0:r.meta})}):(0,x.jsx)("div",{className:s.container,children:T||(T=(0,x.jsx)("p",{children:"Page not found."}))})}const V=e=>({container:i.css`
    padding: ${e.spacing(3,4)};
  `,readme:i.css`
    & img {
      max-width: 100%;
    }

    h1,
    h2,
    h3 {
      margin-top: ${e.spacing(3)};
      margin-bottom: ${e.spacing(2)};
    }

    *:first-child {
      margin-top: 0;
    }

    li {
      margin-left: ${e.spacing(2)};
      & > p {
        margin: ${e.spacing()} 0;
      }
    }

    a {
      color: ${e.colors.text.link};

      &:hover {
        color: ${e.colors.text.link};
        text-decoration: underline;
      }
    }
  `});var R,O,W,G,F,H,Z=a("./packages/grafana-e2e-selectors/src/index.ts");function q(e){let{className:n,plugin:a}=e;return a.isDisabled?(0,x.jsxs)(c.Alert,{severity:"error",title:"Plugin disabled",className:n,"aria-label":Z.wl.pages.PluginPage.disabledInfo,children:[M(a.error),R||(R=(0,x.jsx)("p",{children:"Please contact your server administrator to get this resolved."})),O||(O=(0,x.jsx)("a",{href:"https://grafana.com/docs/grafana/latest/administration/cli/#plugins-commands",className:"external-link",target:"_blank",rel:"noreferrer",children:"Read more about managing plugins"}))]}):null}function M(e){switch(e){case m.PluginErrorCode.modifiedSignature:return W||(W=(0,x.jsx)("p",{children:"Grafana Labs checks each plugin to verify that it has a valid digital signature. While doing this, we discovered that the content of this plugin does not match its signature. We can not guarantee the trustworthy of this plugin and have therefore disabled it. We recommend you to reinstall the plugin to make sure you are running a verified version of this plugin."}));case m.PluginErrorCode.invalidSignature:return G||(G=(0,x.jsx)("p",{children:"Grafana Labs checks each plugin to verify that it has a valid digital signature. While doing this, we discovered that it was invalid. We can not guarantee the trustworthy of this plugin and have therefore disabled it. We recommend you to reinstall the plugin to make sure you are running a verified version of this plugin."}));case m.PluginErrorCode.missingSignature:return F||(F=(0,x.jsx)("p",{children:"Grafana Labs checks each plugin to verify that it has a valid digital signature. While doing this, we discovered that there is no signature for this plugin. We can not guarantee the trustworthy of this plugin and have therefore disabled it. We recommend you to reinstall the plugin to make sure you are running a verified version of this plugin."}));default:return H||(H=(0,x.jsx)("p",{children:"We failed to run this plugin due to an unkown reason and have therefor disabled it. We recommend you to reinstall the plugin to make sure you are running a working version of this plugin."}))}}var Q=a("./public/app/features/plugins/admin/components/Badges/index.ts"),J=a("./public/app/features/plugins/admin/api.ts");function X(e){let{plugin:n}=e;const{value:a}=N(n);if(!a)return null;const{enabled:t,jsonData:s}=null==a?void 0:a.meta;return(0,x.jsxs)(x.Fragment,{children:[!t&&(0,x.jsx)(c.Button,{variant:"primary",onClick:()=>Y(n.id,{enabled:!0,pinned:!0,jsonData:s}),children:"Enable"}),t&&(0,x.jsx)(c.Button,{variant:"destructive",onClick:()=>{Y(n.id,{enabled:!1,pinned:!1,jsonData:s})},children:"Disable"})]})}const Y=async(e,n)=>{try{await(0,J.P6)(e,n),window.location.reload()}catch(e){console.error("Error while updating the plugin",e)}};var K=a("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/0/cache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),ee=a("./public/app/features/datasources/state/actions.ts"),ne=a("./public/app/features/plugins/admin/permissions.ts");function ae(e){let{plugin:n}=e;const a=(0,K.useDispatch)(),t=(0,r.useCallback)((()=>{const e={name:n.name,id:n.id};a((0,ee.J_)(e))}),[a,n]);return(0,ne.Gg)()?(0,x.jsxs)(c.Button,{variant:"primary",onClick:t,children:["Create a ",n.name," data source"]}):null}function te(e){let{plugin:n}=e;if(!n.isInstalled||n.isDisabled)return null;switch(n.type){case m.PluginType.datasource:return(0,x.jsx)(ae,{plugin:n});case m.PluginType.app:return(0,x.jsx)(X,{plugin:n});default:return null}}var se=a("./public/app/features/plugins/admin/state/hooks.ts");function ie(e){let{pluginId:n,pluginStatus:a}=e;const t=`${(0,f.Uj)(n)}/?tab=installation`;return a===w.vF.UPDATE?(0,x.jsxs)(c.HorizontalGroup,{height:"auto",children:[(0,x.jsx)(c.LinkButton,{href:t,target:"_blank",rel:"noopener noreferrer",children:"Update via grafana.com"}),(0,x.jsx)(c.LinkButton,{variant:"destructive",href:t,target:"_blank",rel:"noopener noreferrer",children:"Uninstall via grafana.com"})]}):a===w.vF.UNINSTALL?(0,x.jsx)(c.LinkButton,{variant:"destructive",href:t,target:"_blank",rel:"noopener noreferrer",children:"Uninstall via grafana.com"}):(0,x.jsx)(c.LinkButton,{href:t,target:"_blank",rel:"noopener noreferrer",children:"Install via grafana.com"})}var re,le,oe,ce=a("./public/app/core/app_events.ts");function de(e){var n;let{plugin:a,pluginStatus:t,latestCompatibleVersion:s}=e;const{isInstalling:i,error:l}=(0,se.IS)(),{isUninstalling:o,error:d}=(0,se.wq)(),u=(0,se.x3)(),p=(0,se.S1)(),[g,h]=(0,r.useState)(!1),f=()=>h(!0),b=()=>h(!1),v=o?"Uninstalling":"Uninstall",j=async()=>{b(),await p(a.id),d||ce.Z.emit(m.AppEvents.alertSuccess,[`Uninstalled ${a.name}`])},y=async()=>{await u(a.id,null==s?void 0:s.version,!0),l||ce.Z.emit(m.AppEvents.alertSuccess,[`Updated ${a.name}`])};return t===w.vF.UNINSTALL?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.ConfirmModal,{isOpen:g,title:`Uninstall ${a.name}`,body:"Are you sure you want to uninstall this plugin?",confirmText:"Confirm",icon:"exclamation-triangle",onConfirm:j,onDismiss:b}),(0,x.jsx)(c.HorizontalGroup,{height:"auto",children:(0,x.jsx)(c.Button,{variant:"destructive",disabled:o,onClick:f,children:v})})]}):t===w.vF.UPDATE?(0,x.jsxs)(c.HorizontalGroup,{height:"auto",children:[(0,x.jsx)(c.Button,{disabled:i,onClick:y,children:i?"Updating":"Update"}),n||(n=(0,x.jsx)(c.Button,{variant:"destructive",disabled:o,onClick:j,children:v}))]}):(0,x.jsx)(c.Button,{disabled:i,onClick:async()=>{await u(a.id,null==s?void 0:s.version),l||ce.Z.emit(m.AppEvents.alertSuccess,[`Installed ${a.name}`])},children:i?"Installing":"Install"})}const ue=e=>{let{plugin:n,latestCompatibleVersion:a}=e;const t=(0,c.useStyles2)(pe),s=o.config.pluginAdminExternalManageEnabled,i=(0,ne.bO)(),r=(0,se.y9)(),l=Boolean(a),d=n.isCore||n.isDisabled||!(0,f.fG)(),u=n.isInstalled?n.hasUpdate?w.vF.UPDATE:w.vF.UNINSTALL:w.vF.INSTALL;if(d)return null;if(n.type===m.PluginType.renderer)return(0,x.jsx)("div",{className:t.message,children:"Renderer plugins cannot be managed by the Plugin Catalog."});if(n.isEnterprise&&!(0,o.featureEnabled)("enterprise.plugins"))return(0,x.jsxs)(c.HorizontalGroup,{height:"auto",align:"center",children:[(0,x.jsx)("span",{className:t.message,children:"No valid Grafana Enterprise license detected."}),(0,x.jsx)(c.LinkButton,{href:`${(0,f.Uj)(n.id)}?utm_source=grafana_catalog_learn_more`,target:"_blank",rel:"noopener noreferrer",size:"sm",fill:"text",icon:"external-link-alt",children:"Learn more"})]});if(n.isDev)return(0,x.jsx)("div",{className:t.message,children:"This is a development build of the plugin and can't be uninstalled."});if(!i&&!s){const e=`You do not have permission to ${u} this plugin.`;return(0,x.jsx)("div",{className:t.message,children:e})}return n.isPublished?l?s?(0,x.jsx)(ie,{pluginId:n.id,pluginStatus:u}):r?(0,x.jsx)(de,{plugin:n,pluginStatus:u,latestCompatibleVersion:a}):(0,x.jsx)("div",{className:t.message,children:"The install controls have been disabled because the Grafana server cannot access grafana.com."}):(0,x.jsxs)("div",{className:t.message,children:[oe||(oe=(0,x.jsx)(c.Icon,{name:"exclamation-triangle"}))," This plugin doesn't support your version of Grafana."]}):(0,x.jsxs)("div",{className:t.message,children:[re||(re=(0,x.jsx)(c.Icon,{name:"exclamation-triangle"}))," This plugin is not published to"," ",le||(le=(0,x.jsx)("a",{href:"https://www.grafana.com/plugins",target:"__blank",rel:"noreferrer",children:"grafana.com/plugins"}))," ","and can't be managed via the catalog."]})},pe=e=>({message:i.css`
      color: ${e.colors.text.secondary};
    `});function ge(e){var n,a,t;let{plugin:s,latestCompatibleVersion:i,className:r}=e;const l=(0,c.useStyles2)(he),o=null===(n=s.details)||void 0===n?void 0:n.pluginDependencies,d=s.isInstalled?null===(a=s.details)||void 0===a?void 0:a.grafanaDependency:(null==i?void 0:i.grafanaDependency)||(null===(t=s.details)||void 0===t?void 0:t.grafanaDependency);return!(d||o&&o.length)?null:(0,x.jsxs)("div",{className:r,children:[(0,x.jsx)("div",{className:l.dependencyTitle,children:"Dependencies:"}),Boolean(d)&&(0,x.jsxs)("div",{children:[(0,x.jsx)(c.Icon,{name:"grafana",className:l.icon}),"Grafana ",d]}),o&&o.length>0&&(0,x.jsx)("div",{children:o.map((e=>(0,x.jsxs)("span",{children:[(0,x.jsx)(c.Icon,{name:w.Co[e.type],className:l.icon}),e.name," ",e.version]},e.name)))})]})}const he=e=>({dependencyTitle:i.css`
      font-weight: ${e.typography.fontWeightBold};
      margin-right: ${e.spacing(.5)};

      &::after {
        content: '';
        padding: 0;
      }
    `,icon:i.css`
      color: ${e.colors.text.secondary};
      margin-right: ${e.spacing(.5)};
    `}),me={[m.PluginSignatureType.grafana]:"grafana",[m.PluginSignatureType.commercial]:"shield",[m.PluginSignatureType.community]:"shield",DEFAULT:"shield-exclamation"};function fe(e){let{signatureType:n,signatureOrg:a=""}=e;const t=(0,c.useStyles2)(be);if(!n&&!a)return null;const s=n===m.PluginSignatureType.grafana?"Grafana Labs":(0,I.capitalize)(n),i=me[n||""]||me.DEFAULT;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(xe,{children:[(0,x.jsx)("strong",{className:t.strong,children:"Level: "}),(0,x.jsx)(c.Icon,{size:"xs",name:i})," ",s]}),(0,x.jsxs)(xe,{children:[(0,x.jsx)("strong",{className:t.strong,children:"Signed by:"})," ",a]})]})}const xe=e=>{let{children:n}=e;const a=(0,c.useStyles2)(be);return(0,x.jsx)(c.Badge,{color:"green",className:a.badge,text:(0,x.jsx)(x.Fragment,{children:n})})},be=e=>({badge:i.css`
    background-color: ${e.colors.background.canvas};
    border-color: ${e.colors.border.strong};
    color: ${e.colors.text.secondary};
    margin-left: ${e.spacing()};
  `,strong:i.css`
    color: ${e.colors.text.primary};
  `,icon:i.css`
    margin-right: ${e.spacing(.5)};
  `});function ve(e){let{plugin:n}=e;const a=(0,c.useStyles2)(je),t=n.signature===m.PluginSignatureStatus.valid;return(0,x.jsxs)("div",{className:a.container,children:[(0,x.jsx)("a",{href:"https://grafana.com/docs/grafana/latest/plugins/plugin-signatures/",target:"_blank",rel:"noreferrer",className:a.link,children:(0,x.jsx)(c.PluginSignatureBadge,{status:n.signature})}),t&&(0,x.jsx)(fe,{signatureType:n.signatureType,signatureOrg:n.signatureOrg})]})}const je=e=>({container:i.css`
      display: flex;
    `,link:i.css`
      display: inline-flex;
      align-items: center;
    `});var ye,Se=a("./public/app/features/plugins/admin/components/PluginLogo.tsx");function Pe(e){var n,a;let{plugin:t,currentUrl:s,parentUrl:r}=e;const l=(0,c.useStyles2)(Ne),o=(0,f.RU)(null===(n=t.details)||void 0===n?void 0:n.versions),d=t.installedVersion||(null==o?void 0:o.version);return(0,x.jsxs)("div",{className:l.headerContainer,children:[(0,x.jsx)(Se.E,{alt:`${t.name} logo`,src:t.info.logos.small,className:i.css`
          object-fit: contain;
          width: 100%;
          height: 68px;
          max-width: 68px;
        `}),(0,x.jsxs)("div",{className:l.headerWrapper,children:[(0,x.jsx)("nav",{className:l.breadcrumb,"aria-label":"Breadcrumb",children:(0,x.jsxs)("ol",{children:[(0,x.jsx)("li",{children:(0,x.jsx)("a",{className:l.textUnderline,href:r,children:"Plugins"})}),(0,x.jsx)("li",{children:(0,x.jsx)("a",{href:s,"aria-current":"page",children:t.name})})]})}),(0,x.jsxs)("div",{className:l.headerInformationRow,children:[(0,x.jsx)("span",{children:t.orgName}),null===(a=t.details)||void 0===a?void 0:a.links.map((e=>(0,x.jsx)("a",{href:e.url,children:e.name},e.name))),t.downloads>0&&(0,x.jsxs)("span",{children:[ye||(ye=(0,x.jsx)(c.Icon,{name:"cloud-download"})),` ${(new Intl.NumberFormat).format(t.downloads)}`," "]}),Boolean(d)&&(0,x.jsx)("span",{children:d}),(0,x.jsx)(ve,{plugin:t}),t.isDisabled&&(0,x.jsx)(Q.SX,{error:t.error})]}),(0,x.jsx)(ge,{plugin:t,latestCompatibleVersion:o,className:(0,i.cx)(l.headerInformationRow,l.headerInformationRowSecondary)}),(0,x.jsx)("p",{children:t.description}),(0,x.jsxs)(c.HorizontalGroup,{height:"auto",children:[(0,x.jsx)(ue,{plugin:t,latestCompatibleVersion:o}),(0,x.jsx)(te,{plugin:t})]})]})]})}const Ne=e=>({headerContainer:i.css`
      display: flex;
      margin-bottom: ${e.spacing(3)};
      margin-top: ${e.spacing(3)};
      min-height: 120px;
    `,headerWrapper:i.css`
      margin-left: ${e.spacing(3)};
    `,breadcrumb:i.css`
      font-size: ${e.typography.h2.fontSize};
      li {
        display: inline;
        list-style: none;
        &::after {
          content: '/';
          padding: 0 0.25ch;
        }
        &:last-child::after {
          content: '';
        }
      }
    `,headerInformationRow:i.css`
      display: flex;
      align-items: center;
      margin-top: ${e.spacing()};
      margin-bottom: ${e.spacing()};
      flex-flow: wrap;
      & > * {
        &::after {
          content: '|';
          padding: 0 ${e.spacing()};
        }
        &:last-child::after {
          content: '';
          padding-right: 0;
        }
      }
      font-size: ${e.typography.h4.fontSize};

      a {
        &:hover {
          text-decoration: underline;
        }
      }
    `,headerInformationRowSecondary:i.css`
      font-size: ${e.typography.body.fontSize};
    `,headerOrgName:i.css`
      font-size: ${e.typography.h4.fontSize};
    `,signature:i.css`
      margin: ${e.spacing(3)};
      margin-bottom: 0;
    `,textUnderline:i.css`
      text-decoration: underline;
    `});var ke,_e;function we(e){let{className:n,plugin:a}=e;const t=a.signature===m.PluginSignatureStatus.valid,s=a.signature===m.PluginSignatureStatus.internal,i=a.isDisabled&&function(e){switch(e){case m.PluginErrorCode.invalidSignature:case m.PluginErrorCode.missingSignature:case m.PluginErrorCode.modifiedSignature:return!0;default:return!1}}(a.error);return t||s||i?null:(0,x.jsxs)(c.Alert,{severity:"warning",title:"Invalid plugin signature","aria-label":Z.wl.pages.PluginPage.signatureInfo,className:n,children:[ke||(ke=(0,x.jsx)("p",{children:"Grafana Labs checks each plugin to verify that it has a valid digital signature. Plugin signature verification is part of our security measures to ensure plugins are safe and trustworthy. Grafana Labs can’t guarantee the integrity of this unsigned plugin. Ask the plugin author to request it to be signed."})),_e||(_e=(0,x.jsx)("a",{href:"https://grafana.com/docs/grafana/latest/plugins/plugin-signatures/",className:"external-link",target:"_blank",rel:"noreferrer",children:"Read more about plugins signing."}))]})}var Ie=a("./.yarn/__virtual__/react-router-virtual-31642fe47a/0/cache/react-router-npm-5.2.1-ea754d7473-7daae084bf.zip/node_modules/react-router/esm/react-router.js");var $e,Ce;function De(e){var n;let{match:a,queryParams:t}=e;const{params:{pluginId:s=""},url:i}=a,f=i.substring(0,i.lastIndexOf("/")),b=[{label:w.xc.OVERVIEW,icon:"file-alt",id:w.tu.OVERVIEW,href:`${i}?page=${w.tu.OVERVIEW}`}],v=(0,se.bJ)(s),{tabs:j,defaultTab:y}=function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];const{loading:a,error:t,value:s}=N(e),i=Boolean(null==e?void 0:e.isPublished),{pathname:l}=(0,Ie.TH)(),[o,c]=(0,r.useMemo)((()=>{const e=(0,ne.RN)(),a=[...n];let t;if(i&&a.push({label:w.xc.VERSIONS,icon:"history",id:w.tu.VERSIONS,href:`${l}?page=${w.tu.VERSIONS}`}),!s)return t=w.tu.OVERVIEW,[a,t];if(e&&s.meta.type===m.PluginType.app){var r;if(s.angularConfigCtrl&&(a.push({label:"Config",icon:"cog",id:w.tu.CONFIG,href:`${l}?page=${w.tu.CONFIG}`}),t=w.tu.CONFIG),s.configPages)for(const e of s.configPages)a.push({label:e.title,icon:e.icon,id:e.id,href:`${l}?page=${e.id}`}),t||(t=e.id);null!==(r=s.meta.includes)&&void 0!==r&&r.find((e=>e.type===m.PluginIncludeType.dashboard))&&a.push({label:"Dashboards",icon:"apps",id:w.tu.DASHBOARDS,href:`${l}?page=${w.tu.DASHBOARDS}`})}return t||(t=w.tu.OVERVIEW),[a,t]}),[s,n,l,i]);return{error:t,loading:a,tabs:o,defaultTab:c}}(v,b),{isLoading:S}=(0,se.ZV)(),{isLoading:P}=(0,se.bt)(),k=(0,c.useStyles2)(Ee),_=(0,l.Z)(j),I=t.page||y;return(0,r.useEffect)((()=>{const e=_&&_.length>j.length,n=I!==w.tu.OVERVIEW&&I!==w.tu.VERSIONS;e&&n&&o.locationService.replace(`${i}?page=${w.tu.OVERVIEW}`)}),[I,i,j,_]),S||P?$e||($e=(0,x.jsx)(u.T,{children:(0,x.jsx)(g.a,{})})):v?(0,x.jsx)(u.T,{children:(0,x.jsxs)(h.T,{children:[(0,x.jsx)(Pe,{currentUrl:`${i}?page=${I}`,parentUrl:f,plugin:v}),(0,x.jsx)(c.TabsBar,{children:j.map((e=>(0,x.jsx)(c.Tab,{label:e.label,href:e.href,icon:e.icon,active:e.id===I},e.label)))}),(0,x.jsxs)(c.TabContent,{className:k.tabContent,children:[(0,x.jsx)(we,{plugin:v,className:k.alert}),(0,x.jsx)(q,{plugin:v,className:k.alert}),(0,x.jsx)(A,{queryParams:t,plugin:v,pageId:I})]})]})}):(0,x.jsx)(d.Ar,{justify:"center",align:"center",children:(0,x.jsxs)(c.Alert,{severity:p.F1.Warning,title:"Plugin not found",children:["That plugin cannot be found. Please check the url is correct or ",Ce||(Ce=(0,x.jsx)("br",{})),"go to the ",n||(n=(0,x.jsx)("a",{href:f,children:"plugin catalog"})),"."]})})}const Ee=e=>({alert:i.css`
      margin: ${e.spacing(3)};
      margin-bottom: 0;
    `,tabContent:i.css`
      overflow: auto;
    `})},"./public/app/features/plugins/admin/state/hooks.ts":(e,n,a)=>{a.d(n,{iY:()=>T,bt:()=>I,ZV:()=>w,GE:()=>y,UQ:()=>P,bJ:()=>S,x3:()=>N,IS:()=>$,y9:()=>_,S1:()=>k,wq:()=>C});var t=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s=a("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/0/cache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),i=a("./public/app/features/plugins/admin/helpers.ts"),r=a("./public/app/features/plugins/admin/state/actions.ts"),l=a("./public/app/features/plugins/admin/state/reducer.ts"),o=a("./.yarn/cache/reselect-npm-4.1.5-bc046e41ae-54c13c1e79.zip/node_modules/reselect/es/index.js"),c=a("./public/app/features/plugins/admin/types.ts");const d=e=>e.plugins,u=(0,o.P1)(d,(e=>{let{items:n}=e;return n})),p=(0,o.P1)(d,(e=>{let{settings:n}=e;return n.displayMode})),{selectAll:g,selectById:h}=l.CD.getSelectors(u),m=(e,n)=>(0,o.P1)((e=>(0,o.P1)(g,(n=>n.filter((n=>"installed"===e?n.isInstalled:!n.isCore)))))(e),(e=>e.filter((e=>"all"===n||e.type===n)))),f=(e,n,a)=>(0,o.P1)(m(n,a),(e=>(0,o.P1)(g,(n=>""===e?[]:n.filter((n=>{const a=[];return n.name&&a.push(n.name.toLowerCase()),n.orgName&&a.push(n.orgName.toLowerCase()),a.some((n=>n.includes(e.toLowerCase())))})))))(e),((n,a)=>""===e?n:a)),x=(0,o.P1)(g,(e=>e?e.filter((e=>Boolean(e.error))).map((e=>({pluginId:e.id,errorCode:e.error}))):[])),b=e=>(0,o.P1)(d,(n=>{let{requests:a={}}=n;return a[e]})),v=e=>(0,o.P1)(b(e),(e=>(null==e?void 0:e.status)===c.eE.Pending)),j=e=>(0,o.P1)(b(e),(e=>(null==e?void 0:e.status)===c.eE.Rejected?null==e?void 0:e.error:null)),y=e=>{let{query:n="",filterBy:a="installed",filterByType:t="all",sortBy:r=i.Nh.nameAsc}=e;D();const l=(0,s.useSelector)(f(n,a,t)),{isLoading:o,error:c}=w();return{isLoading:o,error:c,plugins:(0,i.AA)(l,r)}},S=e=>(D(),E(e),(0,s.useSelector)((n=>h(n,e)))),P=()=>(D(),(0,s.useSelector)(x)),N=()=>{const e=(0,s.useDispatch)();return(n,a,t)=>e((0,r.N9)({id:n,version:a,isUpdating:t}))},k=()=>{const e=(0,s.useDispatch)();return n=>e((0,r.Tz)(n))},_=()=>null===(0,s.useSelector)(j(r.tQ.typePrefix)),w=()=>({isLoading:(0,s.useSelector)(v(r.Qd.typePrefix)),error:(0,s.useSelector)(j(r.Qd.typePrefix))}),I=()=>({isLoading:(0,s.useSelector)(v(r.DD.typePrefix)),error:(0,s.useSelector)(j(r.DD.typePrefix))}),$=()=>({isInstalling:(0,s.useSelector)(v(r.N9.typePrefix)),error:(0,s.useSelector)(j(r.N9.typePrefix))}),C=()=>({isUninstalling:(0,s.useSelector)(v(r.Tz.typePrefix)),error:(0,s.useSelector)(j(r.Tz.typePrefix))}),D=()=>{const e=(0,s.useDispatch)(),n=(0,s.useSelector)((a=r.Qd.typePrefix,(0,o.P1)(b(a),(e=>void 0===e))));var a;(0,t.useEffect)((()=>{n&&e((0,r.Qd)())}),[])},E=e=>{const n=(0,s.useDispatch)(),a=(0,s.useSelector)((n=>h(n,e))),i=!(0,s.useSelector)(v(r.DD.typePrefix))&&a&&!a.details;(0,t.useEffect)((()=>{i&&n((0,r.DD)(e))}),[a])},T=()=>{const e=(0,s.useDispatch)();return{displayMode:(0,s.useSelector)(p),setDisplayMode:n=>e((0,l.UC)(n))}}},"./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/usePrevious.js":(e,n,a)=>{a.d(n,{Z:()=>s});var t=a("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");function s(e){var n=(0,t.useRef)();return(0,t.useEffect)((function(){n.current=e})),n.current}}}]);
//# sourceMappingURL=PluginPage.a87fd0ce1ff28bec28a3.js.map