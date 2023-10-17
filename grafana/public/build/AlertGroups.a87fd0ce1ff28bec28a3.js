"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2415],{"./public/app/features/alerting/unified/AlertGroups.tsx":(e,a,s)=>{s.r(a),s.d(a,{default:()=>J});var t=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=s("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/0/cache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),i=s("./packages/grafana-ui/src/index.ts"),l=s("./public/app/core/hooks/useQueryParams.ts"),c=s("./public/app/features/alerting/unified/components/AlertingPageWrapper.tsx"),o=s("./public/app/plugins/datasource/alertmanager/types.ts"),u=s("./public/app/features/alerting/unified/components/AlertLabels.tsx"),p=s("./public/app/features/alerting/unified/components/CollapseToggle.tsx"),d=s("./packages/grafana-data/src/index.ts"),g=s("./public/app/features/alerting/unified/components/DynamicTableWithGuidelines.tsx"),m=s("./public/app/features/alerting/unified/components/silences/AmAlertStateTag.tsx"),b=s("./public/app/core/services/context_srv.ts"),f=s("./public/app/types/index.ts"),x=s("./public/app/features/alerting/unified/utils/access-control.ts"),h=s("./public/app/features/alerting/unified/utils/datasource.ts"),j=s("./public/app/features/alerting/unified/utils/misc.ts"),y=s("./public/app/features/alerting/unified/components/AnnotationDetailsField.tsx"),v=s("./public/app/features/alerting/unified/components/Authorize.tsx"),S=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const _=e=>{let{alert:a,alertManagerSourceName:s}=e;const t=(0,i.useStyles2)(N),r=(0,x.QX)(s),n=!(0,h.HY)(s)||b.Vt.hasPermission(f.bW.AlertingRuleRead);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)("div",{className:t.actionsRow,children:[(0,S.jsxs)(v.q,{actions:[r.update,r.create],fallback:b.Vt.isEditor,children:[a.status.state===o.Z9.Suppressed&&(0,S.jsx)(i.LinkButton,{href:`${(0,j.eQ)("/alerting/silences",s)}&silenceIds=${a.status.silencedBy.join(",")}`,className:t.button,icon:"bell",size:"sm",children:"Manage silences"}),a.status.state===o.Z9.Active&&(0,S.jsx)(i.LinkButton,{href:(0,j.VN)(s,a.labels),className:t.button,icon:"bell-slash",size:"sm",children:"Silence"})]}),n&&a.generatorURL&&(0,S.jsx)(i.LinkButton,{className:t.button,href:a.generatorURL,icon:"chart-line",size:"sm",children:"See source"})]}),Object.entries(a.annotations).map((e=>{let[a,s]=e;return(0,S.jsx)(y.a,{annotationKey:a,value:s},a)})),(0,S.jsxs)("div",{className:t.receivers,children:["Receivers:"," ",a.receivers.map((e=>{let{name:a}=e;return a})).filter((e=>!!e)).join(", ")]})]})},N=e=>({button:t.css`
    & + & {
      margin-left: ${e.spacing(1)};
    }
  `,actionsRow:t.css`
    padding: ${e.spacing(2,0)} !important;
    border-bottom: 1px solid ${e.colors.border.medium};
  `,receivers:t.css`
    padding: ${e.spacing(1,0)};
  `}),k=e=>{let{alerts:a,alertManagerSourceName:s}=e;const t=(0,i.useStyles2)($),n=(0,r.useMemo)((()=>[{id:"state",label:"State",renderCell:e=>{let{data:a}=e;return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(m.G,{state:a.status.state}),(0,S.jsxs)("span",{className:t.duration,children:["for"," ",(0,d.intervalToAbbreviatedDurationString)({start:new Date(a.startsAt),end:new Date(a.endsAt)})]})]})},size:"220px"},{id:"labels",label:"Labels",renderCell:e=>{let{data:{labels:a}}=e;return(0,S.jsx)(u.s,{className:t.labels,labels:a})},size:1}]),[t]),l=(0,r.useMemo)((()=>a.map((e=>({id:e.fingerprint,data:e})))),[a]);return(0,S.jsx)("div",{className:t.tableWrapper,"data-testid":"alert-group-table",children:(0,S.jsx)(g.F,{cols:n,items:l,isExpandable:!0,renderExpandedContent:e=>{let{data:a}=e;return(0,S.jsx)(_,{alert:a,alertManagerSourceName:s})}})})},$=e=>({tableWrapper:t.css`
    margin-top: ${e.spacing(3)};
    ${e.breakpoints.up("md")} {
      margin-left: ${e.spacing(4.5)};
    }
  `,duration:t.css`
    margin-left: ${e.spacing(1)};
    font-size: ${e.typography.bodySmall.fontSize};
  `,labels:t.css`
    padding-bottom: 0;
  `});var C,z=s("./public/app/features/alerting/unified/components/alert-groups/AlertGroupHeader.tsx");const A=e=>{let{alertManagerSourceName:a,group:s}=e;const[t,n]=(0,r.useState)(!0),l=(0,i.useStyles2)(w);return(0,S.jsxs)("div",{className:l.wrapper,children:[(0,S.jsxs)("div",{className:l.header,children:[(0,S.jsxs)("div",{className:l.group,"data-testid":"alert-group",children:[(0,S.jsx)(p.U,{isCollapsed:t,onToggle:()=>n(!t),"data-testid":"alert-group-collapse-toggle"}),Object.keys(s.labels).length?(0,S.jsx)(u.s,{className:l.headerLabels,labels:s.labels}):C||(C=(0,S.jsx)("span",{children:"No grouping"}))]}),(0,S.jsx)(z.Z,{group:s})]}),!t&&(0,S.jsx)(k,{alertManagerSourceName:a,alerts:s.alerts})]})},w=e=>({wrapper:t.css`
    & + & {
      margin-top: ${e.spacing(2)};
    }
  `,headerLabels:t.css`
    padding-bottom: 0 !important;
    margin-bottom: -${e.spacing(.5)};
  `,header:t.css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: ${e.spacing(1,1,1,0)};
    background-color: ${e.colors.background.secondary};
    width: 100%;
  `,group:t.css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,summary:t.css``,spanElement:t.css`
    margin-left: ${e.spacing(.5)};
  `,[o.Z9.Active]:t.css`
    color: ${e.colors.error.main};
  `,[o.Z9.Suppressed]:t.css`
    color: ${e.colors.primary.main};
  `,[o.Z9.Unprocessed]:t.css`
    color: ${e.colors.secondary.main};
  `});var M,G=s("./public/app/features/alerting/unified/hooks/useAlertManagerSourceName.ts"),O=s("./public/app/features/alerting/unified/components/AlertManagerPicker.tsx");const F=e=>{let{onStateFilterChange:a,stateFilter:s}=e;const t=(0,i.useStyles2)(B),r=Object.entries(o.Z9).sort(((e,a)=>{let[s]=e,[t]=a;return s<t?-1:1})).map((e=>{let[a,s]=e;return{label:a,value:s}}));return(0,S.jsxs)("div",{className:t.wrapper,children:[M||(M=(0,S.jsx)(i.Label,{children:"State"})),(0,S.jsx)(i.RadioButtonGroup,{options:r,value:s,onChange:a})]})},B=e=>({wrapper:t.css`
    margin-left: ${e.spacing(1)};
  `});var L,Z,I=s("./.yarn/cache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js");const P=e=>{let{className:a,groups:s,groupBy:t,onGroupingChange:r}=e;const n=(0,I.uniq)(s.flatMap((e=>e.alerts)).flatMap((e=>{let{labels:a}=e;return Object.keys(a)}))).filter((e=>!(e.startsWith("__")&&e.endsWith("__")))).map((e=>({label:e,value:e})));return(0,S.jsxs)("div",{"data-testid":"group-by-container",className:a,children:[L||(L=(0,S.jsx)(i.Label,{children:"Custom group by"})),(0,S.jsx)(i.MultiSelect,{"aria-label":"group by label keys",value:t,placeholder:"Group by",prefix:Z||(Z=(0,S.jsx)(i.Icon,{name:"tag-alt"})),onChange:e=>{r(e.map((e=>{let{value:a}=e;return a})))},options:n,menuShouldPortal:!0})]})};var q=s("./public/app/features/alerting/unified/components/alert-groups/MatcherFilter.tsx");const E=e=>{let{groups:a}=e;const[s,t]=(0,r.useState)(Math.floor(100*Math.random())),[n,c]=(0,l.K)(),{groupBy:o=[],queryString:u,alertState:p}=(0,j.lC)(n),d=`matcher-${s}`,[g,m]=(0,G.k)(),b=(0,i.useStyles2)(T),f=!!(o.length>0||u||p);return(0,S.jsxs)("div",{className:b.wrapper,children:[(0,S.jsx)(O.P,{current:g,onChange:m}),(0,S.jsxs)("div",{className:b.filterSection,children:[(0,S.jsx)(q.F,{className:b.filterInput,defaultQueryString:u,onFilterChange:e=>c({queryString:e||null})},d),(0,S.jsx)(P,{className:b.filterInput,groups:a,groupBy:o,onGroupingChange:e=>c({groupBy:e.length?e.join(","):null})}),(0,S.jsx)(F,{stateFilter:p,onStateFilterChange:e=>c({alertState:e||null})}),f&&(0,S.jsx)(i.Button,{className:b.clearButton,variant:"secondary",icon:"times",onClick:()=>{c({groupBy:null,queryString:null,alertState:null}),setTimeout((()=>t(s+1)),100)},children:"Clear filters"})]})]})},T=e=>({wrapper:t.css`
    border-bottom: 1px solid ${e.colors.border.medium};
    margin-bottom: ${e.spacing(3)};
  `,filterSection:t.css`
    display: flex;
    flex-direction: row;
    margin-bottom: ${e.spacing(3)};
  `,filterInput:t.css`
    width: 340px;
    & + & {
      margin-left: ${e.spacing(1)};
    }
  `,clearButton:t.css`
    margin-left: ${e.spacing(1)};
    margin-top: 19px;
  `});var W=s("./public/app/features/alerting/unified/utils/alertmanager.ts");var D,R,U=s("./public/app/features/alerting/unified/hooks/useUnifiedAlertingSelector.ts"),Q=s("./public/app/features/alerting/unified/state/actions.ts"),K=s("./public/app/features/alerting/unified/utils/constants.ts"),V=s("./public/app/features/alerting/unified/utils/redux.ts");const H=e=>({groupingBanner:t.css`
    margin: ${e.spacing(2,0)};
  `}),J=()=>{var e;const[a]=(0,G.k)(),s=(0,n.useDispatch)(),[t]=(0,l.K)(),{groupBy:o=[]}=(0,j.lC)(t),u=(0,i.useStyles2)(H),p=(0,U._)((e=>e.amAlertGroups)),{loading:d,error:g,result:m=[]}=null!==(e=p[a||""])&&void 0!==e?e:V.oq,b=((e,a)=>(0,r.useMemo)((()=>0===a.length?e.filter((e=>0===Object.keys(e.labels).length)).length>1?e.reduce(((e,a)=>{if(0===Object.keys(a.labels).length){const s=e.find((e=>{let{labels:a}=e;return Object.keys(a)}));s?s.alerts=(0,I.uniqBy)([...s.alerts,...a.alerts],"labels"):e.push({alerts:a.alerts,labels:{},receiver:{name:"NONE"}})}else e.push(a);return e}),[]):e:e.flatMap((e=>{let{alerts:a}=e;return a})).reduce(((e,s)=>{if(a.every((e=>Object.keys(s.labels).includes(e)))){const t=e.find((e=>a.every((a=>e.labels[a]===s.labels[a]))));if(t)t.alerts.push(s);else{const t=a.reduce(((e,a)=>Object.assign({},e,{[a]:s.labels[a]})),{});e.push({alerts:[s],labels:t,receiver:{name:"NONE"}})}}else{const a=e.find((e=>0===Object.keys(e.labels).length));a?a.alerts.push(s):e.push({alerts:[s],labels:{},receiver:{name:"NONE"}})}return e}),[])),[e,a]))(m,o),f=(e=>{const[a]=(0,l.K)(),s=(0,j.lC)(a),t=(0,W.Zh)(s.queryString||"");return(0,r.useMemo)((()=>e.reduce(((e,a)=>{const r=a.alerts.filter((e=>{let{labels:a,status:r}=e;const n=(0,W.eD)(a,t),i=!s.alertState||r.state===s.alertState;return n&&i}));return r.length>0&&(0===Object.keys(a.labels).length?e.unshift(Object.assign({},a,{alerts:r})):e.push(Object.assign({},a,{alerts:r}))),e}),[])),[e,s,t])})(b);return(0,r.useEffect)((()=>{function e(){a&&s((0,Q.mS)(a))}e();const t=setInterval(e,K.iF);return()=>{clearInterval(t)}}),[s,a]),(0,S.jsxs)(c.J,{pageId:"groups",children:[(0,S.jsx)(E,{groups:m}),d&&(D||(D=(0,S.jsx)(i.LoadingPlaceholder,{text:"Loading notifications"}))),g&&!d&&(0,S.jsx)(i.Alert,{title:"Error loading notifications",severity:"error",children:g.message||"Unknown error"}),m&&f.map(((e,s)=>(0,S.jsxs)(r.Fragment,{children:[(1===s&&0===Object.keys(f[0].labels).length||0===s&&Object.keys(e.labels).length>0)&&(0,S.jsxs)("p",{className:u.groupingBanner,children:["Grouped by: ",Object.keys(e.labels).join(", ")]}),(0,S.jsx)(A,{alertManagerSourceName:a||"",group:e})]},`${JSON.stringify(e.labels)}-group-${s}`))),m&&!f.length&&(R||(R=(0,S.jsx)("p",{children:"No results."})))]})}},"./public/app/features/alerting/unified/components/AlertingPageWrapper.tsx":(e,a,s)=>{s.d(a,{J:()=>l});s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var t=s("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/0/cache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),r=s("./public/app/core/components/Page/Page.tsx"),n=s("./public/app/core/selectors/navModel.ts"),i=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const l=e=>{let{children:a,pageId:s,isLoading:l}=e;const c=(0,n.h)((0,t.useSelector)((e=>e.navIndex)),s);return(0,i.jsx)(r.Z,{navModel:c,children:(0,i.jsx)(r.Z.Contents,{isLoading:l,children:a})})}},"./public/app/features/alerting/unified/components/Authorize.tsx":(e,a,s)=>{s.d(a,{q:()=>n});s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var t=s("./public/app/core/services/context_srv.ts"),r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const n=e=>{let{actions:a,children:s,fallback:n=!0}=e;return a.some((e=>t.Vt.hasAccess(e,n)))?(0,r.jsx)(r.Fragment,{children:s}):null}},"./public/app/features/alerting/unified/components/DynamicTableWithGuidelines.tsx":(e,a,s)=>{s.d(a,{F:()=>c});var t=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=(s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s("./packages/grafana-ui/src/index.ts")),n=s("./public/app/features/alerting/unified/components/DynamicTable.tsx"),i=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const l=["renderExpandedContent"];const c=e=>{let{renderExpandedContent:a}=e,s=function(e,a){if(null==e)return{};var s,t,r={},n=Object.keys(e);for(t=0;t<n.length;t++)s=n[t],a.indexOf(s)>=0||(r[s]=e[s]);return r}(e,l);const c=(0,r.useStyles2)(o);return(0,i.jsx)(n.t,Object.assign({renderExpandedContent:a?(e,s,r)=>(0,i.jsxs)(i.Fragment,{children:[!(s===r.length-1)&&(0,i.jsx)("div",{className:(0,t.cx)(c.contentGuideline,c.guideline)}),a(e,s,r)]}):void 0,renderPrefixHeader:()=>(0,i.jsx)("div",{className:c.relative,children:(0,i.jsx)("div",{className:(0,t.cx)(c.headerGuideline,c.guideline)})}),renderPrefixCell:(e,a,s)=>(0,i.jsxs)("div",{className:c.relative,children:[(0,i.jsx)("div",{className:(0,t.cx)(c.topGuideline,c.guideline)}),!(a===s.length-1)&&(0,i.jsx)("div",{className:(0,t.cx)(c.bottomGuideline,c.guideline)})]})},s))},o=e=>({relative:t.css`
    position: relative;
    height: 100%;
  `,guideline:t.css`
    left: -19px;
    border-left: 1px solid ${e.colors.border.medium};
    position: absolute;

    ${e.breakpoints.down("md")} {
      display: none;
    }
  `,topGuideline:t.css`
    width: 18px;
    border-bottom: 1px solid ${e.colors.border.medium};
    top: 0;
    bottom: 50%;
  `,bottomGuideline:t.css`
    top: 50%;
    bottom: 0;
  `,contentGuideline:t.css`
    top: 0;
    bottom: 0;
    left: -49px !important;
  `,headerGuideline:t.css`
    top: -25px;
    bottom: 0;
  `})},"./public/app/features/alerting/unified/components/alert-groups/MatcherFilter.tsx":(e,a,s)=>{s.d(a,{F:()=>u});var t,r,n,i=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),l=(s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s("./.yarn/__virtual__/@grafana-experimental-virtual-920bad95a1/0/cache/@grafana-experimental-npm-0.0.2-canary.22-45d2c4f135-b9a64c0abc.zip/node_modules/@grafana/experimental/index.js")),c=s("./packages/grafana-ui/src/index.ts"),o=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const u=e=>{let{className:a,onFilterChange:s,defaultQueryString:i,queryString:u}=e;const d=(0,c.useStyles2)(p),g=t||(t=(0,o.jsx)(c.Icon,{name:"search"}));return(0,o.jsxs)("div",{className:a,children:[(0,o.jsx)(c.Label,{children:(0,o.jsxs)(l.Stack,{gap:.5,children:[r||(r=(0,o.jsx)("span",{children:"Search by label"})),(0,o.jsx)(c.Tooltip,{content:n||(n=(0,o.jsxs)("div",{children:["Filter alerts using label querying, ex:",(0,o.jsx)("pre",{children:'{severity="critical", instance=~"cluster-us-.+"}'})]})),children:(0,o.jsx)(c.Icon,{className:d.icon,name:"info-circle",size:"sm"})})]})}),(0,o.jsx)(c.Input,{placeholder:"Search",defaultValue:i,value:u,onChange:e=>{const a=e.target;s(a.value)},"data-testid":"search-query-input",prefix:g,className:d.inputWidth})]})},p=e=>({icon:i.css`
    margin-right: ${e.spacing(.5)};
  `,inputWidth:i.css`
    width: 340px;
    flex-grow: 0;
  `})},"./public/app/features/alerting/unified/components/silences/AmAlertStateTag.tsx":(e,a,s)=>{s.d(a,{G:()=>l});s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var t=s("./public/app/plugins/datasource/alertmanager/types.ts"),r=s("./public/app/features/alerting/unified/components/StateTag.tsx"),n=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const i={[t.Z9.Active]:"bad",[t.Z9.Unprocessed]:"neutral",[t.Z9.Suppressed]:"info"},l=e=>{let{state:a}=e;return(0,n.jsx)(r.i,{state:i[a],children:a})}},"./public/app/features/alerting/unified/hooks/useAlertManagerSourceName.ts":(e,a,s)=>{s.d(a,{k:()=>o});var t=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),r=s("./public/app/core/hooks/useQueryParams.ts"),n=s("./public/app/core/store.ts"),i=s("./public/app/features/alerting/unified/utils/constants.ts"),l=s("./public/app/features/alerting/unified/utils/datasource.ts");function c(e){return e===l.GC||!!(0,l.aM)().find((a=>a.name===e))}function o(){const[e,a]=(0,r.K)(),s=(0,t.useCallback)((e=>{c(e)&&(e===l.GC?(n.Z.delete(i.de),a({[i.c4]:null})):(n.Z.set(i.de,e),a({[i.c4]:e})))}),[a]),o=e[i.c4];if(o&&"string"==typeof o)return c(o)?[o,s]:[void 0,s];const u=n.Z.get(i.de);return u&&"string"==typeof u&&c(u)?(s(u),[u,s]):[l.GC,s]}}}]);
//# sourceMappingURL=AlertGroups.a87fd0ce1ff28bec28a3.js.map