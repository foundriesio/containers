"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[8808],{"./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx":(e,a,t)=>{t.d(a,{p:()=>z});var r=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=t("./packages/grafana-runtime/src/index.ts"),o=t("./packages/grafana-ui/src/index.ts"),i=t("./public/app/features/panel/components/PanelPluginError.tsx"),d=t("./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx"),l=t("./packages/grafana-data/src/index.ts"),c=t("./public/app/features/library-panels/styles.ts"),p=t("./public/app/features/library-panels/components/LibraryPanelsView/actions.ts"),u=t("./public/app/features/library-panels/state/api.ts"),m=t("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/3/opt/drone/yarncache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");const b={loadingState:l.LoadingState.Loading,dashboardTitles:[]},h=(0,m.PH)("libraryPanels/delete/searchCompleted"),g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,a=arguments.length>1?arguments[1]:void 0;return h.match(a)?Object.assign({},e,{dashboardTitles:a.payload.dashboards.map((e=>e.title)),loadingState:l.LoadingState.Done}):e};var f,x,j,y,v=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const S=e=>{let{libraryPanel:a,onDismiss:t,onConfirm:r}=e;const n=(0,o.useStyles)(c.J),[{dashboardTitles:i,loadingState:d},m]=(0,s.useReducer)(g,b),j=(0,s.useMemo)((()=>(0,p.tb)(m)),[m]);(0,s.useEffect)((()=>{j(function(e){return async function(a){const t=await(0,u.E8)(e.uid);a(h({dashboards:t}))}}(a))}),[j,a]);const y=Boolean(i.length),S=d===l.LoadingState.Done;return(0,v.jsxs)(o.Modal,{className:n.modal,title:"Delete library panel",icon:"trash-alt",onDismiss:t,isOpen:!0,children:[S?null:f||(f=(0,v.jsx)(P,{})),S?(0,v.jsxs)("div",{children:[y?(0,v.jsx)(_,{dashboardTitles:i}):null,y?null:x||(x=(0,v.jsx)(k,{})),(0,v.jsxs)(o.Modal.ButtonRow,{children:[(0,v.jsx)(o.Button,{variant:"secondary",onClick:t,fill:"outline",children:"Cancel"}),(0,v.jsx)(o.Button,{variant:"destructive",onClick:r,disabled:y,children:"Delete"})]})]}):null]})},P=()=>j||(j=(0,v.jsx)("span",{children:"Loading library panel..."})),k=()=>{const e=(0,o.useStyles)(c.J);return(0,v.jsx)("div",{className:e.modalText,children:"Do you want to delete this panel?"})},_=e=>{let{dashboardTitles:a}=e;const t=(0,o.useStyles)(c.J),r=1===a.length?"dashboard.":"dashboards.",s=`${a.length} ${r}`;return 0===a.length?null:(0,v.jsxs)("div",{children:[(0,v.jsxs)("p",{className:t.textInfo,children:["This library panel can not be deleted because it is connected to ",(0,v.jsx)("strong",{children:s})," Remove the library panel from the dashboards listed below and retry."]}),(0,v.jsxs)("table",{className:t.myTable,children:[y||(y=(0,v.jsx)("thead",{children:(0,v.jsx)("tr",{children:(0,v.jsx)("th",{children:"Dashboard name"})})})),(0,v.jsx)("tbody",{children:a.map(((e,a)=>(0,v.jsx)("tr",{children:(0,v.jsx)("td",{children:e})},`dash-title-${a}`)))})]})]})};var w,D;const z=e=>{var a;let{libraryPanel:t,onClick:r,onDelete:o,showSecondaryActions:l}=e;const[c,p]=(0,s.useState)(!1),u=null!==(a=n.config.panels[t.model.type])&&void 0!==a?a:(0,i.X)(t.model.type).meta;return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(d.X,{isCurrent:!1,title:t.name,description:t.description,plugin:u,onClick:()=>null==r?void 0:r(t),onDelete:l?()=>p(!0):void 0,children:(0,v.jsx)(I,{libraryPanel:t})}),c&&(0,v.jsx)(S,{libraryPanel:t,onConfirm:()=>{null==o||o(t),p(!1)},onDismiss:()=>p(!1)})]})};function I(e){let{libraryPanel:a}=e;const t=(0,o.useStyles2)($);return a.meta.folderUid||a.meta.folderName?a.meta.folderUid?(0,v.jsx)("span",{className:t.metaContainer,children:(0,v.jsxs)(o.Link,{href:`/dashboards/f/${a.meta.folderUid}`,children:[D||(D=(0,v.jsx)(o.Icon,{name:"folder-upload",size:"sm"})),(0,v.jsx)("span",{children:a.meta.folderName})]})}):(0,v.jsxs)("span",{className:t.metaContainer,children:[w||(w=(0,v.jsx)(o.Icon,{name:"folder",size:"sm"})),(0,v.jsx)("span",{children:a.meta.folderName})]}):null}function $(e){return{metaContainer:r.css`
      display: flex;
      align-items: center;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      padding-top: ${e.spacing(.5)};

      svg {
        margin-right: ${e.spacing(.5)};
        margin-bottom: 3px;
      }
    `}}},"./public/app/features/library-panels/components/LibraryPanelsView/actions.ts":(e,a,t)=>{t.d(a,{UO:()=>f,Xu:()=>g,tb:()=>x});var r=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/Subscription.js"),s=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/from.js"),n=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),o=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/merge.js"),i=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/timer.js"),d=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),l=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),c=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),p=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/share.js"),u=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),m=t("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),b=t("./public/app/features/library-panels/state/api.ts"),h=t("./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts");function g(e){return function(a){const t=new r.w0,g=(0,s.D)((0,b.Pq)({searchString:e.searchString,perPage:e.perPage,page:e.page,excludeUid:e.currentPanelId,sortDirection:e.sortDirection,typeFilter:e.panelFilter,folderFilter:e.folderFilter})).pipe((0,d.z)((e=>{let{perPage:a,elements:t,page:r,totalCount:s}=e;return(0,n.of)((0,h.zK)({libraryPanels:t,page:r,perPage:a,totalCount:s}))})),(0,l.K)((a=>(console.error(a),(0,n.of)((0,h.zK)(Object.assign({},h.p$,{page:e.page,perPage:e.perPage})))))),(0,c.x)((()=>t.unsubscribe())),(0,p.B)());t.add((0,o.T)((0,i.H)(50).pipe((0,u.h)((0,h.xU)()),(0,m.R)(g)),g).subscribe(a))}}function f(e,a){return async function(t){try{await(0,b.UO)(e),g(a)(t)}catch(e){console.error(e)}}}function x(e){return function(a){return a instanceof Function?a(e):e(a)}}},"./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts":(e,a,t)=>{t.d(a,{_p:()=>l,oO:()=>d,p$:()=>n,xU:()=>o,zK:()=>i});var r=t("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/3/opt/drone/yarncache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),s=t("./packages/grafana-data/src/index.ts");const n={loadingState:s.LoadingState.Loading,libraryPanels:[],totalCount:0,perPage:40,page:1,numberOfPages:0,currentPanelId:void 0},o=(0,r.PH)("libraryPanels/view/initSearch"),i=(0,r.PH)("libraryPanels/view/searchCompleted"),d=(0,r.PH)("libraryPanels/view/changePage"),l=(e,a)=>{if(o.match(a))return Object.assign({},e,{loadingState:s.LoadingState.Loading});if(i.match(a)){const{libraryPanels:t,page:r,perPage:n,totalCount:o}=a.payload,i=Math.ceil(o/n);return Object.assign({},e,{libraryPanels:t,perPage:n,totalCount:o,loadingState:s.LoadingState.Done,numberOfPages:i,page:r>i?r-1:r})}return d.match(a)?Object.assign({},e,{page:a.payload.page}):e}},"./public/app/features/library-panels/styles.ts":(e,a,t)=>{t.d(a,{J:()=>s});var r=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");function s(e){return{myTable:r.css`
      max-height: 204px;
      overflow-y: auto;
      margin-top: 11px;
      margin-bottom: 28px;
      border-radius: ${e.border.radius.sm};
      border: 1px solid ${e.colors.bg3};
      background: ${e.colors.bg1};
      color: ${e.colors.textSemiWeak};
      font-size: ${e.typography.size.md};
      width: 100%;

      thead {
        color: #538ade;
        font-size: ${e.typography.size.sm};
      }

      th,
      td {
        padding: 6px 13px;
        height: ${e.spacing.xl};
      }

      tbody > tr:nth-child(odd) {
        background: ${e.colors.bg2};
      }
    `,noteTextbox:r.css`
      margin-bottom: ${e.spacing.xl};
    `,textInfo:r.css`
      color: ${e.colors.textSemiWeak};
      font-size: ${e.typography.size.sm};
    `,dashboardSearch:r.css`
      margin-top: ${e.spacing.md};
    `,modal:r.css`
      width: 500px;
    `,modalText:r.css`
      font-size: ${e.typography.heading.h4};
      color: ${e.colors.link};
      margin-bottom: calc(${e.spacing.d} * 2);
      padding-top: ${e.spacing.d};
    `}}},"./public/app/features/manage-dashboards/DashboardImportPage.tsx":(e,a,t)=>{t.r(a),t.d(a,{default:()=>W});var r=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=t("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/3/opt/drone/yarncache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),o=t("./packages/grafana-data/src/index.ts"),i=t("./packages/grafana-e2e-selectors/src/index.ts"),d=t("./packages/grafana-runtime/src/index.ts"),l=t("./packages/grafana-ui/src/index.ts"),c=t("./public/app/core/app_events.ts"),p=t("./public/app/core/components/Page/Page.tsx"),u=t("./public/app/core/selectors/navModel.ts"),m=t("./public/app/core/actions/cleanUp.ts"),b=t("./public/app/features/manage-dashboards/state/actions.ts"),h=t("./public/app/features/manage-dashboards/state/reducers.ts"),g=t("./packages/grafana-runtime/src/utils/DataSourceWithBackend.ts"),f=t("./public/app/core/components/Select/FolderPicker.tsx"),x=t("./public/app/features/manage-dashboards/services/ValidationSrv.ts");const j=e=>{try{return JSON.parse(e),!0}catch(e){return"Not valid JSON"}},y=e=>{const a=/(^\d+$)|dashboards\/(\d+)/.exec(e);return!(!a||!a[1]&&!a[2])||"Could not find a valid Grafana.com ID"},v=e=>(0,d.getBackendSrv)().get(`/api/dashboards/uid/${e}`).then((e=>`Dashboard named '${null==e?void 0:e.dashboard.title}' in folder '${null==e?void 0:e.meta.folderTitle}' has the same UID`)).catch((e=>(e.isHandled=!0,!0)));var S=t("./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx"),P=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function k(e){let{inputs:a,label:t,description:r,folderName:s}=e;const n=(0,l.useStyles2)(_);return Boolean(null==a?void 0:a.length)?(0,P.jsx)("div",{className:n.spacer,children:(0,P.jsx)(l.Field,{label:t,description:r,children:(0,P.jsx)(P.Fragment,{children:a.map(((e,a)=>{const t=`elements[${a}]`,r=e.state===h.KQ.New?Object.assign({},e.model,{meta:Object.assign({},e.model.meta,{folderName:null!=s?s:"General"})}):Object.assign({},e.model);return(0,P.jsx)("div",{className:n.item,children:(0,P.jsx)(S.p,{libraryPanel:r,onClick:()=>{}})},t)}))})})}):null}function _(e){return{spacer:r.css`
      margin-bottom: ${e.spacing(2)};
    `,item:r.css`
      margin-bottom: ${e.spacing(1)};
    `}}const w=["ref"],D=["ref"];var z;function I(e,a){if(null==e)return{};var t,r,s={},n=Object.keys(e);for(r=0;r<n.length;r++)t=n[r],a.indexOf(t)>=0||(s[t]=e[t]);return s}const $=e=>{var a,t,r,n;let{register:o,errors:c,control:p,getValues:u,uidReset:m,inputs:b,initialFolderId:j,onUidReset:y,onCancel:S,onSubmit:_,watch:$}=e;const[F,O]=(0,s.useState)(!1),L=$("dataSources"),T=$("folder");(0,s.useEffect)((()=>{F&&(c.title||c.uid)&&_(u(),{})}),[c,u,F,_]);const U=null!==(a=null==b||null===(t=b.libraryPanels)||void 0===t?void 0:t.filter((e=>e.state===h.KQ.New)))&&void 0!==a?a:[],J=null!==(r=null==b||null===(n=b.libraryPanels)||void 0===n?void 0:n.filter((e=>e.state===h.KQ.Exits)))&&void 0!==r?r:[];return(0,P.jsxs)(P.Fragment,{children:[z||(z=(0,P.jsx)(l.Legend,{children:"Options"})),(0,P.jsx)(l.Field,{label:"Name",invalid:!!c.title,error:c.title&&c.title.message,children:(0,P.jsx)(l.Input,Object.assign({},o("title",{required:"Name is required",validate:async e=>{return await(a=e,t=u().folder.id,x.t.validateNewDashboardName(t,a).then((()=>!0)).catch((e=>{if("EXISTING"===e.type)return e.message})));var a,t}}),{type:"text","data-testid":i.wl.components.ImportDashboardForm.name}))}),(0,P.jsx)(l.Field,{label:"Folder",children:(0,P.jsx)(l.InputControl,{render:e=>{let{}=e,a=I(e.field,w);return(0,P.jsx)(f.E,Object.assign({},a,{enableCreateNew:!0,initialFolderId:j}))},name:"folder",control:p})}),(0,P.jsx)(l.Field,{label:"Unique identifier (UID)",description:"The unique identifier (UID) of a dashboard can be used for uniquely identify a dashboard between multiple Grafana installs. The UID allows having consistent URLs for accessing dashboards so changing the title of a dashboard will not break any bookmarked links to that dashboard.",invalid:!!c.uid,error:c.uid&&c.uid.message,children:(0,P.jsx)(P.Fragment,{children:m?(0,P.jsx)(l.Input,Object.assign({},o("uid",{required:!0,validate:async e=>await v(e)}))):(0,P.jsx)(l.Input,Object.assign({disabled:!0},o("uid",{validate:async e=>await v(e)}),{addonAfter:!m&&(0,P.jsx)(l.Button,{onClick:y,children:"Change uid"})}))})}),b.dataSources&&b.dataSources.map(((e,a)=>{if(e.pluginId===g.hr.type)return null;const t=`dataSources[${a}]`,r=null!=L?L:[];return(0,P.jsx)(l.Field,{label:e.label,invalid:c.dataSources&&!!c.dataSources[a],error:c.dataSources&&c.dataSources[a]&&"A data source is required",children:(0,P.jsx)(l.InputControl,{name:t,render:t=>{var s;let{}=t,n=I(t.field,D);return(0,P.jsx)(d.DataSourcePicker,Object.assign({},n,{noDefault:!0,placeholder:e.info,pluginId:e.pluginId,current:null===(s=r[a])||void 0===s?void 0:s.uid}))},control:p,rules:{required:!0}})},t)})),b.constants&&b.constants.map(((e,a)=>{const t=`constants[${a}]`;return(0,P.jsx)(l.Field,{label:e.label,error:c.constants&&c.constants[a]&&`${e.label} needs a value`,invalid:c.constants&&!!c.constants[a],children:(0,P.jsx)(l.Input,Object.assign({},o(t,{required:!0}),{defaultValue:e.value}))},t)})),(0,P.jsx)(k,{inputs:U,label:"New library panels",description:"List of new library panels that will get imported.",folderName:T.title}),(0,P.jsx)(k,{inputs:J,label:"Existing library panels",description:"List of existing library panels. These panels are not affected by the import.",folderName:T.title}),(0,P.jsxs)(l.HorizontalGroup,{children:[(0,P.jsx)(l.Button,{type:"submit","data-testid":i.wl.components.ImportDashboardForm.submit,variant:C(c),onClick:()=>{O(!0)},children:N(c)}),(0,P.jsx)(l.Button,{type:"reset",variant:"secondary",onClick:S,children:"Cancel"})]})]})};function C(e){return e&&(e.title||e.uid)?"destructive":"primary"}function N(e){return e&&(e.title||e.uid)?"Import (Overwrite)":"Import"}var F,O;function L(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}const T={clearLoadedDashboard:b.ys,importDashboard:b.$j},U=(0,n.connect)((e=>{const a=d.locationService.getSearchObject();return{dashboard:e.importDashboard.dashboard,meta:e.importDashboard.meta,source:e.importDashboard.source,inputs:e.importDashboard.inputs,folder:a.folderId?{id:Number(a.folderId)}:{id:0}}}),T);class J extends s.PureComponent{constructor(){super(...arguments),L(this,"state",{uidReset:!1}),L(this,"onSubmit",(e=>{(0,d.reportInteraction)("dashboard_import_imported"),this.props.importDashboard(e)})),L(this,"onCancel",(()=>{this.props.clearLoadedDashboard()})),L(this,"onUidReset",(()=>{this.setState({uidReset:!0})}))}render(){const{dashboard:e,inputs:a,meta:t,source:r,folder:s}=this.props,{uidReset:n}=this.state;return(0,P.jsxs)(P.Fragment,{children:[r===h.G7.Gcom&&(0,P.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,P.jsx)("div",{children:(0,P.jsxs)(l.Legend,{children:["Importing dashboard from"," ",(0,P.jsx)("a",{href:`https://grafana.com/dashboards/${e.gnetId}`,className:"external-link",target:"_blank",rel:"noreferrer",children:"Grafana.com"})]})}),(0,P.jsx)("table",{className:"filter-table form-inline",children:(0,P.jsxs)("tbody",{children:[(0,P.jsxs)("tr",{children:[F||(F=(0,P.jsx)("td",{children:"Published by"})),(0,P.jsx)("td",{children:t.orgName})]}),(0,P.jsxs)("tr",{children:[O||(O=(0,P.jsx)("td",{children:"Updated on"})),(0,P.jsx)("td",{children:(0,o.dateTimeFormat)(t.updatedAt)})]})]})})]}),(0,P.jsx)(l.Form,{onSubmit:this.onSubmit,defaultValues:Object.assign({},e,{constants:[],dataSources:[],elements:[],folder:s}),validateOnMount:!0,validateFieldsOnMount:["title","uid"],validateOn:"onChange",children:e=>{let{register:t,errors:r,control:o,watch:i,getValues:d}=e;return(0,P.jsx)($,{register:t,errors:r,control:o,getValues:d,uidReset:n,inputs:a,onCancel:this.onCancel,onUidReset:this.onUidReset,onSubmit:this.onSubmit,watch:i,initialFolderId:s.id})}})]})}}const B=U(J);var R,G,V;function q(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}B.displayName="ImportDashboardOverview";const A="dashboard_import_loaded",E={fetchGcomDashboard:b.q_,importDashboardJson:b.nQ,cleanUpAction:m.e},M=(0,n.connect)((e=>({navModel:(0,u.h)(e.navIndex,"import",void 0,!0),loadingState:e.importDashboard.state})),E);class H extends s.PureComponent{constructor(e){super(e),q(this,"onFileUpload",(e=>{(0,d.reportInteraction)(A,{import_source:"json_uploaded"});const{importDashboardJson:a}=this.props,t=e.currentTarget.files&&e.currentTarget.files.length>0&&e.currentTarget.files[0];if(t){const e=new FileReader,r=()=>e=>{let t;try{t=JSON.parse(e.target.result)}catch(e){return void c.Z.emit(o.AppEvents.alertError,["Import failed","JSON -> JS Serialization failed: "+e.message])}a(t)};e.onload=r(),e.readAsText(t)}})),q(this,"getDashboardFromJson",(e=>{(0,d.reportInteraction)(A,{import_source:"json_pasted"}),this.props.importDashboardJson(JSON.parse(e.dashboardJson))})),q(this,"getGcomDashboard",(e=>{let a;(0,d.reportInteraction)(A,{import_source:"gcom"});const t=/(^\d+$)|dashboards\/(\d+)/.exec(e.gcomDashboard);t&&t[1]?a=t[1]:t&&t[2]&&(a=t[2]),a&&this.props.fetchGcomDashboard(a)}));const{gcomDashboardId:a}=this.props.queryParams;a&&this.getGcomDashboard({gcomDashboard:a})}componentWillUnmount(){this.props.cleanUpAction({stateSelector:e=>e.importDashboard})}renderImportForm(){const e=X(this.props.theme);return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)("div",{className:e.option,children:(0,P.jsx)(l.FileUpload,{accept:"application/json",onFileUpload:this.onFileUpload,children:"Upload JSON file"})}),(0,P.jsx)("div",{className:e.option,children:(0,P.jsx)(l.Form,{onSubmit:this.getGcomDashboard,defaultValues:{gcomDashboard:""},children:e=>{let{register:a,errors:t}=e;return(0,P.jsx)(l.Field,{label:"Import via grafana.com",invalid:!!t.gcomDashboard,error:t.gcomDashboard&&t.gcomDashboard.message,children:(0,P.jsx)(l.Input,Object.assign({id:"url-input",placeholder:"Grafana.com dashboard URL or ID",type:"text"},a("gcomDashboard",{required:"A Grafana dashboard URL or ID is required",validate:y}),{addonAfter:R||(R=(0,P.jsx)(l.Button,{type:"submit",children:"Load"}))}))})}})}),(0,P.jsx)("div",{className:e.option,children:(0,P.jsx)(l.Form,{onSubmit:this.getDashboardFromJson,defaultValues:{dashboardJson:""},children:e=>{let{register:a,errors:t}=e;return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(l.Field,{label:"Import via panel json",invalid:!!t.dashboardJson,error:t.dashboardJson&&t.dashboardJson.message,children:(0,P.jsx)(l.TextArea,Object.assign({},a("dashboardJson",{required:"Need a dashboard JSON model",validate:j}),{"data-testid":i.wl.components.DashboardImportPage.textarea,id:"dashboard-json-textarea",rows:10}))}),(0,P.jsx)(l.Button,{type:"submit","data-testid":i.wl.components.DashboardImportPage.submit,children:"Load"})]})}})})]})}render(){const{loadingState:e,navModel:a}=this.props;return(0,P.jsx)(p.Z,{navModel:a,children:(0,P.jsxs)(p.Z.Contents,{children:[e===o.LoadingState.Loading&&(G||(G=(0,P.jsx)(l.VerticalGroup,{justify:"center",children:(0,P.jsx)(l.HorizontalGroup,{justify:"center",children:(0,P.jsx)(l.Spinner,{size:32})})}))),[o.LoadingState.Error,o.LoadingState.NotStarted].includes(e)&&this.renderImportForm(),e===o.LoadingState.Done&&(V||(V=(0,P.jsx)(B,{})))]})})}}const K=M((0,l.withTheme2)(H));K.displayName="DashboardImport";const W=K,X=(0,l.stylesFactory)((e=>({option:r.css`
      margin-bottom: ${e.spacing(4)};
    `})))},"./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx":(e,a,t)=>{t.d(a,{X:()=>l});var r=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=(t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),t("./packages/grafana-data/src/index.ts")),n=t("./packages/grafana-e2e-selectors/src/index.ts"),o=t("./packages/grafana-ui/src/index.ts"),i=t("./public/app/features/plugins/components/PluginStateInfo.tsx"),d=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const l=e=>{let{isCurrent:a,title:t,plugin:i,onClick:l,onDelete:u,disabled:m,showBadge:b,description:h,children:g}=e;const f=(0,o.useStyles2)(c),x=(0,r.cx)({[f.item]:!0,[f.disabled]:m||i.state===s.PluginState.deprecated,[f.current]:a});return(0,d.jsxs)("div",{className:x,"aria-label":n.wl.components.PluginVisualization.item(i.name),onClick:m?void 0:l,title:a?"Click again to close this section":i.name,children:[(0,d.jsx)("img",{className:f.img,src:i.info.logos.small,alt:""}),(0,d.jsxs)("div",{className:f.itemContent,children:[(0,d.jsx)("div",{className:f.name,children:t}),h?(0,d.jsx)("span",{className:f.description,children:h}):null,g]}),b&&(0,d.jsx)("div",{className:(0,r.cx)(f.badge,m&&f.disabled),children:(0,d.jsx)(p,{plugin:i})}),u&&(0,d.jsx)(o.IconButton,{name:"trash-alt",onClick:e=>{e.stopPropagation(),u()},className:f.deleteButton,"aria-label":"Delete button on panel type card"})]})};l.displayName="PanelTypeCard";const c=e=>({item:r.css`
      position: relative;
      display: flex;
      flex-shrink: 0;
      cursor: pointer;
      background: ${e.colors.background.secondary};
      border-radius: ${e.shape.borderRadius()};
      box-shadow: ${e.shadows.z1};
      border: 1px solid ${e.colors.background.secondary};
      align-items: center;
      padding: 8px;
      width: 100%;
      position: relative;
      overflow: hidden;
      transition: ${e.transitions.create(["background"],{duration:e.transitions.duration.short})};

      &:hover {
        background: ${e.colors.emphasize(e.colors.background.secondary,.03)};
      }
    `,itemContent:r.css`
      overflow: hidden;
      position: relative;
      padding: ${e.spacing(0,1)};
    `,current:r.css`
      label: currentVisualizationItem;
      border: 1px solid ${e.colors.primary.border};
      background: ${e.colors.action.selected};
    `,disabled:r.css`
      opacity: 0.2;
      filter: grayscale(1);
      cursor: default;
      pointer-events: none;
    `,name:r.css`
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: ${e.typography.size.sm};
      font-weight: ${e.typography.fontWeightMedium};
      width: 100%;
    `,description:r.css`
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      font-weight: ${e.typography.fontWeightLight};
      width: 100%;
      max-height: 4.5em;
    `,img:r.css`
      max-height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
    `,badge:r.css`
      background: ${e.colors.background.primary};
    `,deleteButton:r.css`
      margin-left: auto;
    `}),p=e=>{let{plugin:a}=e;return(0,s.isUnsignedPluginSignature)(a.signature)?(0,d.jsx)(o.PluginSignatureBadge,{status:a.signature}):(0,d.jsx)(i.u,{state:a.state})};p.displayName="PanelPluginBadge"},"./public/app/features/plugins/components/PluginStateInfo.tsx":(e,a,t)=>{t.d(a,{u:()=>o});t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var r=t("./packages/grafana-data/src/index.ts"),s=t("./packages/grafana-ui/src/index.ts"),n=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const o=e=>{const a=function(e){switch(e){case r.PluginState.deprecated:return{text:"Deprecated",color:"red",tooltip:"This feature is deprecated and will be removed in a future release"};case r.PluginState.alpha:return{text:"Alpha",color:"blue",tooltip:"This feature is experimental and future updates might not be backward compatible"};case r.PluginState.beta:return{text:"Beta",color:"blue",tooltip:"This feature is close to complete but not fully tested"};default:return null}}(e.state);return a?(0,n.jsx)(s.Badge,{color:a.color,title:a.tooltip,text:a.text,icon:a.icon}):null}}}]);
//# sourceMappingURL=DashboardImport.b208037f6b1954dc031d.js.map