"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[7641],{"./public/app/features/admin/ServerStats.tsx":(e,s,a)=>{a.r(s),a.d(s,{ServerStats:()=>N});var n=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),t=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),r=a("./packages/grafana-runtime/src/index.ts"),c=a("./packages/grafana-ui/src/index.ts"),i=a("./public/app/types/index.ts"),o=a("./public/app/core/services/context_srv.ts"),d=a("./public/app/features/plugins/admin/components/Loader.tsx"),l=a("./packages/grafana-data/src/index.ts"),p=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const u=()=>{var e;const s=m((0,c.useTheme2)()),[a,n]=(0,t.useState)(!1),[i,o]=(0,t.useState)({mode:"thumbs",theme:r.config.theme2.isLight?"light":"dark"}),d=()=>n(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(c.Modal,{title:"Start crawler",isOpen:a,onDismiss:d,children:[(0,p.jsx)("div",{className:s.wrap,children:(0,p.jsx)(c.CodeEditor,{height:200,value:null!==(e=JSON.stringify(i,null,2))&&void 0!==e?e:"",showLineNumbers:!1,readOnly:!1,language:"json",showMiniMap:!1,onBlur:e=>{o(JSON.parse(e))}})}),(0,p.jsxs)(c.Modal.ButtonRow,{children:[(0,p.jsx)(c.Button,{onClick:()=>{(0,r.getBackendSrv)().post("/api/admin/crawler/start",i).then((e=>{console.log("GOT",e),d()}))},children:"Start"}),(0,p.jsx)(c.Button,{variant:"secondary",onClick:d,children:"Cancel"})]})]}),(0,p.jsx)(c.Button,{onClick:()=>n(!0),variant:"primary",children:"Start"})]})},m=e=>({wrap:n.css`
      border: 2px solid #111;
    `});var h,x,g;const v=()=>{const e=f((0,c.useTheme2)()),[s,a]=(0,t.useState)();return(0,t.useEffect)((()=>{const e=(0,r.getGrafanaLiveSrv)().getStream({scope:l.LiveChannelScope.Grafana,namespace:"broadcast",path:"crawler"}).subscribe({next:e=>{((0,l.isLiveChannelMessageEvent)(e)||(0,l.isLiveChannelStatusEvent)(e))&&a(e.message)}});return()=>{e.unsubscribe()}}),[]),s?(0,p.jsxs)("div",{className:e.wrap,children:[(0,p.jsx)("pre",{children:JSON.stringify(s,null,2)}),"running"!==s.state&&(g||(g=(0,p.jsx)(u,{}))),"stopped"!==s.state&&(0,p.jsx)(c.Button,{variant:"secondary",onClick:()=>{(0,r.getBackendSrv)().post("/api/admin/crawler/stop")},children:"Stop"})]}):(0,p.jsxs)("div",{className:e.wrap,children:["No status (never run)",h||(h=(0,p.jsx)("br",{})),x||(x=(0,p.jsx)(u,{}))]})},f=e=>({wrap:n.css`
      border: 4px solid red;
    `,running:n.css`
      border: 4px solid green;
    `});var j,b,y,S,w,k;const N=()=>{const[e,s]=(0,t.useState)(null),[a,n]=(0,t.useState)(!1),l=(0,c.useStyles2)(_),u=o.Vt.hasAccess(i.bW.DataSourcesRead,o.Vt.isGrafanaAdmin),m=o.Vt.hasAccess(i.bW.UsersRead,o.Vt.isGrafanaAdmin);return(0,t.useEffect)((()=>{o.Vt.hasAccess(i.bW.ActionServerStatsRead,o.Vt.isGrafanaAdmin)&&(n(!0),(async()=>(0,r.getBackendSrv)().get("api/admin/stats").catch((e=>(console.error(e),null))))().then((e=>{s(e),n(!1)})))}),[]),o.Vt.hasAccess(i.bW.ActionServerStatsRead,o.Vt.isGrafanaAdmin)?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("h2",{className:l.title,children:"Instance statistics"}),a?(0,p.jsx)("div",{className:l.loader,children:j||(j=(0,p.jsx)(d.a,{text:"Loading instance stats..."}))}):e?(0,p.jsxs)("div",{className:l.row,children:[(0,p.jsx)(A,{content:[{name:"Dashboards (starred)",value:`${e.dashboards} (${e.stars})`},{name:"Tags",value:e.tags},{name:"Playlists",value:e.playlists},{name:"Snapshots",value:e.snapshots}],footer:b||(b=(0,p.jsx)(c.LinkButton,{href:"/dashboards",variant:"secondary",children:"Manage dashboards"}))}),(0,p.jsxs)("div",{className:l.doubleRow,children:[(0,p.jsx)(A,{content:[{name:"Data sources",value:e.datasources}],footer:u&&(y||(y=(0,p.jsx)(c.LinkButton,{href:"/datasources",variant:"secondary",children:"Manage data sources"})))}),(0,p.jsx)(A,{content:[{name:"Alerts",value:e.alerts}],footer:S||(S=(0,p.jsx)(c.LinkButton,{href:"/alerting/list",variant:"secondary",children:"Alerts"}))})]}),(0,p.jsx)(A,{content:[{name:"Organisations",value:e.orgs},{name:"Users total",value:e.users},{name:"Active users in last 30 days",value:e.activeUsers},{name:"Active sessions",value:e.activeSessions}],footer:m&&(w||(w=(0,p.jsx)(c.LinkButton,{href:"/admin/users",variant:"secondary",children:"Manage users"})))})]}):(0,p.jsx)("p",{className:l.notFound,children:"No stats found."}),r.config.featureToggles.dashboardPreviews&&r.config.featureToggles.dashboardPreviewsAdmin&&(k||(k=(0,p.jsx)(v,{})))]}):null},_=e=>({title:n.css`
      margin-bottom: ${e.spacing(4)};
    `,row:n.css`
      display: flex;
      justify-content: space-between;
      width: 100%;

      & > div:not(:last-of-type) {
        margin-right: ${e.spacing(2)};
      }

      & > div {
        width: 33.3%;
      }
    `,doubleRow:n.css`
      display: flex;
      flex-direction: column;

      & > div:first-of-type {
        margin-bottom: ${e.spacing(2)};
      }
    `,loader:n.css`
      height: 290px;
    `,notFound:n.css`
      font-size: ${e.typography.h6.fontSize};
      text-align: center;
      height: 290px;
    `}),A=e=>{let{content:s,footer:a}=e;const n=(0,c.useStyles2)(L);return(0,p.jsx)(c.CardContainer,{className:n.container,disableHover:!0,children:(0,p.jsxs)("div",{className:n.inner,children:[(0,p.jsx)("div",{className:n.content,children:s.map((e=>(0,p.jsxs)("div",{className:n.row,children:[(0,p.jsx)("span",{children:e.name}),(0,p.jsx)("span",{children:e.value})]},e.name)))}),a&&(0,p.jsx)("div",{children:a})]})})},L=e=>({container:n.css`
      padding: ${e.spacing(2)};
    `,inner:n.css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `,content:n.css`
      flex: 1 0 auto;
    `,row:n.css`
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: ${e.spacing(2)};
      align-items: center;
    `})},"./public/app/features/plugins/admin/components/Loader.tsx":(e,s,a)=>{a.d(s,{a:()=>c});a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var n=a("./packages/grafana-ui/src/index.ts"),t=a("./public/app/features/plugins/admin/components/Page.tsx"),r=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const c=e=>{let{text:s="Loading..."}=e;return(0,r.jsx)(t.T,{children:(0,r.jsx)("div",{className:"page-loader-wrapper",children:(0,r.jsx)(n.LoadingPlaceholder,{text:s})})})}},"./public/app/features/plugins/admin/components/Page.tsx":(e,s,a)=>{a.d(s,{T:()=>c});var n=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),t=(a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a("./packages/grafana-ui/src/index.ts")),r=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const c=e=>{let{children:s}=e;const a=(0,t.useStyles2)(i);return(0,r.jsx)("div",{className:"page-container",children:(0,r.jsx)("div",{className:a,children:s})})},i=e=>n.css`
    margin-bottom: ${e.spacing(3)};
  `}}]);
//# sourceMappingURL=ServerStats.b208037f6b1954dc031d.js.map