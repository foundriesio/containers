"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2415],{"./public/app/features/alerting/unified/AlertGroups.tsx":(e,t,a)=>{a.r(t),a.d(t,{default:()=>J});var s=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=a("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/3/opt/drone/yarncache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),i=a("./packages/grafana-ui/src/index.ts"),l=a("./public/app/core/hooks/useQueryParams.ts"),c=a("./public/app/features/alerting/unified/components/AlertingPageWrapper.tsx"),o=a("./public/app/plugins/datasource/alertmanager/types.ts"),p=a("./public/app/features/alerting/unified/components/AlertLabels.tsx"),u=a("./public/app/features/alerting/unified/components/CollapseToggle.tsx"),d=a("./packages/grafana-data/src/index.ts"),g=a("./public/app/features/alerting/unified/components/DynamicTableWithGuidelines.tsx"),m=a("./public/app/features/alerting/unified/components/silences/AmAlertStateTag.tsx"),b=a("./public/app/core/services/context_srv.ts"),f=a("./public/app/types/index.ts"),x=a("./public/app/features/alerting/unified/utils/access-control.ts"),h=a("./public/app/features/alerting/unified/utils/datasource.ts"),j=a("./public/app/features/alerting/unified/utils/misc.ts"),y=a("./public/app/features/alerting/unified/components/AnnotationDetailsField.tsx"),v=a("./public/app/features/alerting/unified/components/Authorize.tsx"),S=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const _=e=>{let{alert:t,alertManagerSourceName:a}=e;const s=(0,i.useStyles2)(N),r=(0,x.QX)(a),n=!(0,h.HY)(a)||b.Vt.hasPermission(f.bW.AlertingRuleRead);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)("div",{className:s.actionsRow,children:[(0,S.jsxs)(v.q,{actions:[r.update,r.create],fallback:b.Vt.isEditor,children:[t.status.state===o.Z9.Suppressed&&(0,S.jsx)(i.LinkButton,{href:`${(0,j.eQ)("/alerting/silences",a)}&silenceIds=${t.status.silencedBy.join(",")}`,className:s.button,icon:"bell",size:"sm",children:"Manage silences"}),t.status.state===o.Z9.Active&&(0,S.jsx)(i.LinkButton,{href:(0,j.VN)(a,t.labels),className:s.button,icon:"bell-slash",size:"sm",children:"Silence"})]}),n&&t.generatorURL&&(0,S.jsx)(i.LinkButton,{className:s.button,href:t.generatorURL,icon:"chart-line",size:"sm",children:"See source"})]}),Object.entries(t.annotations).map((e=>{let[t,a]=e;return(0,S.jsx)(y.a,{annotationKey:t,value:a},t)})),(0,S.jsxs)("div",{className:s.receivers,children:["Receivers:"," ",t.receivers.map((e=>{let{name:t}=e;return t})).filter((e=>!!e)).join(", ")]})]})},N=e=>({button:s.css`
    & + & {
      margin-left: ${e.spacing(1)};
    }
  `,actionsRow:s.css`
    padding: ${e.spacing(2,0)} !important;
    border-bottom: 1px solid ${e.colors.border.medium};
  `,receivers:s.css`
    padding: ${e.spacing(1,0)};
  `}),k=e=>{let{alerts:t,alertManagerSourceName:a}=e;const s=(0,i.useStyles2)($),n=(0,r.useMemo)((()=>[{id:"state",label:"State",renderCell:e=>{let{data:t}=e;return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(m.G,{state:t.status.state}),(0,S.jsxs)("span",{className:s.duration,children:["for"," ",(0,d.intervalToAbbreviatedDurationString)({start:new Date(t.startsAt),end:new Date(t.endsAt)})]})]})},size:"220px"},{id:"labels",label:"Labels",renderCell:e=>{let{data:{labels:t}}=e;return(0,S.jsx)(p.s,{className:s.labels,labels:t})},size:1}]),[s]),l=(0,r.useMemo)((()=>t.map((e=>({id:e.fingerprint,data:e})))),[t]);return(0,S.jsx)("div",{className:s.tableWrapper,"data-testid":"alert-group-table",children:(0,S.jsx)(g.F,{cols:n,items:l,isExpandable:!0,renderExpandedContent:e=>{let{data:t}=e;return(0,S.jsx)(_,{alert:t,alertManagerSourceName:a})}})})},$=e=>({tableWrapper:s.css`
    margin-top: ${e.spacing(3)};
    ${e.breakpoints.up("md")} {
      margin-left: ${e.spacing(4.5)};
    }
  `,duration:s.css`
    margin-left: ${e.spacing(1)};
    font-size: ${e.typography.bodySmall.fontSize};
  `,labels:s.css`
    padding-bottom: 0;
  `});var C,z=a("./public/app/features/alerting/unified/components/alert-groups/AlertGroupHeader.tsx");const A=e=>{let{alertManagerSourceName:t,group:a}=e;const[s,n]=(0,r.useState)(!0),l=(0,i.useStyles2)(w);return(0,S.jsxs)("div",{className:l.wrapper,children:[(0,S.jsxs)("div",{className:l.header,children:[(0,S.jsxs)("div",{className:l.group,"data-testid":"alert-group",children:[(0,S.jsx)(u.U,{isCollapsed:s,onToggle:()=>n(!s),"data-testid":"alert-group-collapse-toggle"}),Object.keys(a.labels).length?(0,S.jsx)(p.s,{className:l.headerLabels,labels:a.labels}):C||(C=(0,S.jsx)("span",{children:"No grouping"}))]}),(0,S.jsx)(z.Z,{group:a})]}),!s&&(0,S.jsx)(k,{alertManagerSourceName:t,alerts:a.alerts})]})},w=e=>({wrapper:s.css`
    & + & {
      margin-top: ${e.spacing(2)};
    }
  `,headerLabels:s.css`
    padding-bottom: 0 !important;
    margin-bottom: -${e.spacing(.5)};
  `,header:s.css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: ${e.spacing(1,1,1,0)};
    background-color: ${e.colors.background.secondary};
    width: 100%;
  `,group:s.css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,summary:s.css``,spanElement:s.css`
    margin-left: ${e.spacing(.5)};
  `,[o.Z9.Active]:s.css`
    color: ${e.colors.error.main};
  `,[o.Z9.Suppressed]:s.css`
    color: ${e.colors.primary.main};
  `,[o.Z9.Unprocessed]:s.css`
    color: ${e.colors.secondary.main};
  `});var M,G=a("./public/app/features/alerting/unified/hooks/useAlertManagerSourceName.ts"),O=a("./public/app/features/alerting/unified/components/AlertManagerPicker.tsx");const F=e=>{let{onStateFilterChange:t,stateFilter:a}=e;const s=(0,i.useStyles2)(B),r=Object.entries(o.Z9).sort(((e,t)=>{let[a]=e,[s]=t;return a<s?-1:1})).map((e=>{let[t,a]=e;return{label:t,value:a}}));return(0,S.jsxs)("div",{className:s.wrapper,children:[M||(M=(0,S.jsx)(i.Label,{children:"State"})),(0,S.jsx)(i.RadioButtonGroup,{options:r,value:a,onChange:t})]})},B=e=>({wrapper:s.css`
    margin-left: ${e.spacing(1)};
  `});var L,Z,I=a("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js");const P=e=>{let{className:t,groups:a,groupBy:s,onGroupingChange:r}=e;const n=(0,I.uniq)(a.flatMap((e=>e.alerts)).flatMap((e=>{let{labels:t}=e;return Object.keys(t)}))).filter((e=>!(e.startsWith("__")&&e.endsWith("__")))).map((e=>({label:e,value:e})));return(0,S.jsxs)("div",{"data-testid":"group-by-container",className:t,children:[L||(L=(0,S.jsx)(i.Label,{children:"Custom group by"})),(0,S.jsx)(i.MultiSelect,{"aria-label":"group by label keys",value:s,placeholder:"Group by",prefix:Z||(Z=(0,S.jsx)(i.Icon,{name:"tag-alt"})),onChange:e=>{r(e.map((e=>{let{value:t}=e;return t})))},options:n,menuShouldPortal:!0})]})};var q=a("./public/app/features/alerting/unified/components/alert-groups/MatcherFilter.tsx");const E=e=>{let{groups:t}=e;const[a,s]=(0,r.useState)(Math.floor(100*Math.random())),[n,c]=(0,l.K)(),{groupBy:o=[],queryString:p,alertState:u}=(0,j.lC)(n),d=`matcher-${a}`,[g,m]=(0,G.k)(),b=(0,i.useStyles2)(T),f=!!(o.length>0||p||u);return(0,S.jsxs)("div",{className:b.wrapper,children:[(0,S.jsx)(O.P,{current:g,onChange:m}),(0,S.jsxs)("div",{className:b.filterSection,children:[(0,S.jsx)(q.F,{className:b.filterInput,defaultQueryString:p,onFilterChange:e=>c({queryString:e||null})},d),(0,S.jsx)(P,{className:b.filterInput,groups:t,groupBy:o,onGroupingChange:e=>c({groupBy:e.length?e.join(","):null})}),(0,S.jsx)(F,{stateFilter:u,onStateFilterChange:e=>c({alertState:e||null})}),f&&(0,S.jsx)(i.Button,{className:b.clearButton,variant:"secondary",icon:"times",onClick:()=>{c({groupBy:null,queryString:null,alertState:null}),setTimeout((()=>s(a+1)),100)},children:"Clear filters"})]})]})},T=e=>({wrapper:s.css`
    border-bottom: 1px solid ${e.colors.border.medium};
    margin-bottom: ${e.spacing(3)};
  `,filterSection:s.css`
    display: flex;
    flex-direction: row;
    margin-bottom: ${e.spacing(3)};
  `,filterInput:s.css`
    width: 340px;
    & + & {
      margin-left: ${e.spacing(1)};
    }
  `,clearButton:s.css`
    margin-left: ${e.spacing(1)};
    margin-top: 19px;
  `});var W=a("./public/app/features/alerting/unified/utils/alertmanager.ts");var D,R,U=a("./public/app/features/alerting/unified/hooks/useUnifiedAlertingSelector.ts"),Q=a("./public/app/features/alerting/unified/state/actions.ts"),K=a("./public/app/features/alerting/unified/utils/constants.ts"),V=a("./public/app/features/alerting/unified/utils/redux.ts");const H=e=>({groupingBanner:s.css`
    margin: ${e.spacing(2,0)};
  `}),J=()=>{var e;const[t]=(0,G.k)(),a=(0,n.useDispatch)(),[s]=(0,l.K)(),{groupBy:o=[]}=(0,j.lC)(s),p=(0,i.useStyles2)(H),u=(0,U._)((e=>e.amAlertGroups)),{loading:d,error:g,result:m=[]}=null!==(e=u[t||""])&&void 0!==e?e:V.oq,b=((e,t)=>(0,r.useMemo)((()=>0===t.length?e.filter((e=>0===Object.keys(e.labels).length)).length>1?e.reduce(((e,t)=>{if(0===Object.keys(t.labels).length){const a=e.find((e=>{let{labels:t}=e;return Object.keys(t)}));a?a.alerts=(0,I.uniqBy)([...a.alerts,...t.alerts],"labels"):e.push({alerts:t.alerts,labels:{},receiver:{name:"NONE"}})}else e.push(t);return e}),[]):e:e.flatMap((e=>{let{alerts:t}=e;return t})).reduce(((e,a)=>{if(t.every((e=>Object.keys(a.labels).includes(e)))){const s=e.find((e=>t.every((t=>e.labels[t]===a.labels[t]))));if(s)s.alerts.push(a);else{const s=t.reduce(((e,t)=>Object.assign({},e,{[t]:a.labels[t]})),{});e.push({alerts:[a],labels:s,receiver:{name:"NONE"}})}}else{const t=e.find((e=>0===Object.keys(e.labels).length));t?t.alerts.push(a):e.push({alerts:[a],labels:{},receiver:{name:"NONE"}})}return e}),[])),[e,t]))(m,o),f=(e=>{const[t]=(0,l.K)(),a=(0,j.lC)(t),s=(0,W.Zh)(a.queryString||"");return(0,r.useMemo)((()=>e.reduce(((e,t)=>{const r=t.alerts.filter((e=>{let{labels:t,status:r}=e;const n=(0,W.eD)(t,s),i=!a.alertState||r.state===a.alertState;return n&&i}));return r.length>0&&(0===Object.keys(t.labels).length?e.unshift(Object.assign({},t,{alerts:r})):e.push(Object.assign({},t,{alerts:r}))),e}),[])),[e,a,s])})(b);return(0,r.useEffect)((()=>{function e(){t&&a((0,Q.mS)(t))}e();const s=setInterval(e,K.iF);return()=>{clearInterval(s)}}),[a,t]),(0,S.jsxs)(c.J,{pageId:"groups",children:[(0,S.jsx)(E,{groups:m}),d&&(D||(D=(0,S.jsx)(i.LoadingPlaceholder,{text:"Loading notifications"}))),g&&!d&&(0,S.jsx)(i.Alert,{title:"Error loading notifications",severity:"error",children:g.message||"Unknown error"}),m&&f.map(((e,a)=>(0,S.jsxs)(r.Fragment,{children:[(1===a&&0===Object.keys(f[0].labels).length||0===a&&Object.keys(e.labels).length>0)&&(0,S.jsxs)("p",{className:p.groupingBanner,children:["Grouped by: ",Object.keys(e.labels).join(", ")]}),(0,S.jsx)(A,{alertManagerSourceName:t||"",group:e})]},`${JSON.stringify(e.labels)}-group-${a}`))),m&&!f.length&&(R||(R=(0,S.jsx)("p",{children:"No results."})))]})}},"./public/app/features/alerting/unified/components/AlertingPageWrapper.tsx":(e,t,a)=>{a.d(t,{J:()=>l});a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var s=a("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/3/opt/drone/yarncache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),r=a("./public/app/core/components/Page/Page.tsx"),n=a("./public/app/core/selectors/navModel.ts"),i=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const l=e=>{let{children:t,pageId:a,isLoading:l}=e;const c=(0,n.h)((0,s.useSelector)((e=>e.navIndex)),a);return(0,i.jsx)(r.Z,{navModel:c,children:(0,i.jsx)(r.Z.Contents,{isLoading:l,children:t})})}},"./public/app/features/alerting/unified/components/Authorize.tsx":(e,t,a)=>{a.d(t,{q:()=>n});a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var s=a("./public/app/core/services/context_srv.ts"),r=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const n=e=>{let{actions:t,children:a,fallback:n=!0}=e;return t.some((e=>s.Vt.hasAccess(e,n)))?(0,r.jsx)(r.Fragment,{children:a}):null}},"./public/app/features/alerting/unified/components/DynamicTableWithGuidelines.tsx":(e,t,a)=>{a.d(t,{F:()=>c});var s=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=(a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a("./packages/grafana-ui/src/index.ts")),n=a("./public/app/features/alerting/unified/components/DynamicTable.tsx"),i=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const l=["renderExpandedContent"];const c=e=>{let{renderExpandedContent:t}=e,a=function(e,t){if(null==e)return{};var a,s,r={},n=Object.keys(e);for(s=0;s<n.length;s++)a=n[s],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,l);const c=(0,r.useStyles2)(o);return(0,i.jsx)(n.t,Object.assign({renderExpandedContent:t?(e,a,r)=>(0,i.jsxs)(i.Fragment,{children:[!(a===r.length-1)&&(0,i.jsx)("div",{className:(0,s.cx)(c.contentGuideline,c.guideline)}),t(e,a,r)]}):void 0,renderPrefixHeader:()=>(0,i.jsx)("div",{className:c.relative,children:(0,i.jsx)("div",{className:(0,s.cx)(c.headerGuideline,c.guideline)})}),renderPrefixCell:(e,t,a)=>(0,i.jsxs)("div",{className:c.relative,children:[(0,i.jsx)("div",{className:(0,s.cx)(c.topGuideline,c.guideline)}),!(t===a.length-1)&&(0,i.jsx)("div",{className:(0,s.cx)(c.bottomGuideline,c.guideline)})]})},a))},o=e=>({relative:s.css`
    position: relative;
    height: 100%;
  `,guideline:s.css`
    left: -19px;
    border-left: 1px solid ${e.colors.border.medium};
    position: absolute;

    ${e.breakpoints.down("md")} {
      display: none;
    }
  `,topGuideline:s.css`
    width: 18px;
    border-bottom: 1px solid ${e.colors.border.medium};
    top: 0;
    bottom: 50%;
  `,bottomGuideline:s.css`
    top: 50%;
    bottom: 0;
  `,contentGuideline:s.css`
    top: 0;
    bottom: 0;
    left: -49px !important;
  `,headerGuideline:s.css`
    top: -25px;
    bottom: 0;
  `})},"./public/app/features/alerting/unified/components/alert-groups/MatcherFilter.tsx":(e,t,a)=>{a.d(t,{F:()=>p});var s,r,n,i=a("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),l=(a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a("./.yarn/__virtual__/@grafana-experimental-virtual-920bad95a1/3/opt/drone/yarncache/@grafana-experimental-npm-0.0.2-canary.22-45d2c4f135-b9a64c0abc.zip/node_modules/@grafana/experimental/index.js")),c=a("./packages/grafana-ui/src/index.ts"),o=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const p=e=>{let{className:t,onFilterChange:a,defaultQueryString:i,queryString:p}=e;const d=(0,c.useStyles2)(u),g=s||(s=(0,o.jsx)(c.Icon,{name:"search"}));return(0,o.jsxs)("div",{className:t,children:[(0,o.jsx)(c.Label,{children:(0,o.jsxs)(l.Stack,{gap:.5,children:[r||(r=(0,o.jsx)("span",{children:"Search by label"})),(0,o.jsx)(c.Tooltip,{content:n||(n=(0,o.jsxs)("div",{children:["Filter alerts using label querying, ex:",(0,o.jsx)("pre",{children:'{severity="critical", instance=~"cluster-us-.+"}'})]})),children:(0,o.jsx)(c.Icon,{className:d.icon,name:"info-circle",size:"sm"})})]})}),(0,o.jsx)(c.Input,{placeholder:"Search",defaultValue:i,value:p,onChange:e=>{const t=e.target;a(t.value)},"data-testid":"search-query-input",prefix:g,className:d.inputWidth})]})},u=e=>({icon:i.css`
    margin-right: ${e.spacing(.5)};
  `,inputWidth:i.css`
    width: 340px;
    flex-grow: 0;
  `})},"./public/app/features/alerting/unified/components/silences/AmAlertStateTag.tsx":(e,t,a)=>{a.d(t,{G:()=>l});a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var s=a("./public/app/plugins/datasource/alertmanager/types.ts"),r=a("./public/app/features/alerting/unified/components/StateTag.tsx"),n=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const i={[s.Z9.Active]:"bad",[s.Z9.Unprocessed]:"neutral",[s.Z9.Suppressed]:"info"},l=e=>{let{state:t}=e;return(0,n.jsx)(r.i,{state:i[t],children:t})}},"./public/app/features/alerting/unified/hooks/useAlertManagerSourceName.ts":(e,t,a)=>{a.d(t,{k:()=>o});var s=a("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),r=a("./public/app/core/hooks/useQueryParams.ts"),n=a("./public/app/core/store.ts"),i=a("./public/app/features/alerting/unified/utils/constants.ts"),l=a("./public/app/features/alerting/unified/utils/datasource.ts");function c(e){return e===l.GC||!!(0,l.aM)().find((t=>t.name===e))}function o(){const[e,t]=(0,r.K)(),a=(0,s.useCallback)((e=>{c(e)&&(e===l.GC?(n.Z.delete(i.de),t({[i.c4]:null})):(n.Z.set(i.de,e),t({[i.c4]:e})))}),[t]),o=e[i.c4];if(o&&"string"==typeof o)return c(o)?[o,a]:[void 0,a];const p=n.Z.get(i.de);return p&&"string"==typeof p&&c(p)?(a(p),[p,a]):[l.GC,a]}}}]);
//# sourceMappingURL=AlertGroups.b208037f6b1954dc031d.js.map