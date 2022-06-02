"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[4679],{"./public/app/features/alerting/unified/RuleViewer.tsx":(e,t,s)=>{s.r(t),s.d(t,{RuleViewer:()=>Z,default:()=>J});var r=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),a=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=s("./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useObservable.js"),i=s("./packages/grafana-data/src/index.ts"),c=s("./packages/grafana-ui/src/index.ts"),u=s("./public/app/features/alerting/unified/components/AlertLabels.tsx"),o=s("./public/app/features/alerting/unified/components/DetailsField.tsx"),l=s("./public/app/features/alerting/unified/components/rule-viewer/RuleViewerLayout.tsx"),d=s("./.yarn/__virtual__/react-virtualized-auto-sizer-virtual-b5ab366cb0/0/cache/react-virtualized-auto-sizer-npm-1.0.6-50869b8392-81270e9d32.zip/node_modules/react-virtualized-auto-sizer/dist/index.esm.js"),p=s("./packages/grafana-runtime/src/index.ts"),f=s("./public/app/features/expressions/guards.ts"),m=s("./public/app/types/index.ts"),g=s("./public/app/features/alerting/unified/utils/constants.ts"),h=s("./public/app/features/alerting/unified/components/Authorize.tsx"),b=s("./public/app/features/alerting/unified/components/PanelPluginsButtonGroup.tsx"),x=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const j=["refId"];var v;function y(e){var t;const s=(0,c.useTheme2)(),r=(0,c.useStyles2)(_),{data:n,query:u,onChangeQuery:o}=e,l=(0,f.j)(u.model)?g.Fe:g.GC,[j,y]=(0,a.useState)(l),w=(0,p.getDataSourceSrv)().getInstanceSettings(u.datasourceUid),R=u.relativeTimeRange,[k,z]=(0,a.useState)({frameIndex:0,showHeader:!0}),C=(0,a.useCallback)((e=>{const t=(0,i.dateTime)().unix()-e.unix();if(R){const e=R.from-R.to;o(Object.assign({},u,{relativeTimeRange:{from:t+e,to:t}}))}}),[o,u,R]),$=(0,a.useCallback)((e=>0===e?(0,i.dateTime)():(0,i.dateTime)().subtract(e,"seconds")),[]);return n?w?(0,x.jsx)("div",{className:r.content,children:(0,x.jsx)(d.Z,{children:e=>{let{width:a,height:i}=e;return(0,x.jsxs)("div",{style:{width:a,height:i},children:[(0,x.jsxs)("div",{className:r.header,children:[(0,x.jsxs)("div",{children:[`Query ${u.refId}`,(0,x.jsxs)("span",{className:r.dataSource,children:["(",w.name,")"]})]}),(0,x.jsxs)("div",{className:r.actions,children:[!(0,f.j)(u.model)&&R?(0,x.jsx)(c.DateTimePicker,{date:$(R.to),onChange:C,maxDate:new Date}):null,t||(t=(0,x.jsx)(b.j,{onChange:y,value:j,size:"md"})),(0,x.jsx)(h.q,{actions:[m.bW.DataSourcesExplore],children:!(0,f.j)(u.model)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{className:r.spacing}),(0,x.jsx)(c.LinkButton,{size:"md",variant:"secondary",icon:"compass",target:"_blank",href:S(w,u),children:"View in Explore"})]})})]})]}),(0,x.jsx)(p.PanelRenderer,{height:i-4*s.spacing.gridSize,width:a,data:n,pluginId:j,title:"",onOptionsChange:z,options:k})]})}})}):(0,x.jsxs)("div",{className:r.content,children:[v||(v=(0,x.jsx)(c.Alert,{title:"Could not find datasource for query"})),(0,x.jsx)(c.CodeEditor,{width:"100%",height:"250px",language:"json",showLineNumbers:!1,showMiniMap:!1,value:JSON.stringify(u,null,"\t"),readOnly:!0})]}):null}function S(e,t){const{name:s}=e,r=function(e,t){if(null==e)return{};var s,r,a={},n=Object.keys(e);for(r=0;r<n.length;r++)s=n[r],t.indexOf(s)>=0||(a[s]=e[s]);return a}(t.model,j),a=Object.assign({},r,{datasource:s});return i.urlUtil.renderUrl(`${p.config.appSubUrl}/explore`,{left:JSON.stringify(["now-1h","now",s,a])})}const _=e=>({content:r.css`
      width: 100%;
      height: 250px;
    `,header:r.css`
      height: ${e.spacing(4)};
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
    `,refId:r.css`
      font-weight: ${e.typography.fontWeightMedium};
      color: ${e.colors.text.link};
      overflow: hidden;
    `,dataSource:r.css`
      margin-left: ${e.spacing(1)};
      font-style: italic;
      color: ${e.colors.text.secondary};
    `,actions:r.css`
      display: flex;
      align-items: center;
    `,spacing:r.css`
      padding: ${e.spacing(0,1,0,0)};
    `,errorMessage:r.css`
      white-space: pre-wrap;
    `});var w=s("./public/app/features/alerting/unified/components/rules/RuleDetailsActionButtons.tsx"),R=s("./public/app/features/alerting/unified/components/rules/RuleDetailsAnnotations.tsx"),k=s("./public/app/features/alerting/unified/components/rules/RuleDetailsDataSources.tsx"),z=s("./public/app/features/alerting/unified/components/rules/RuleDetailsExpression.tsx");const C=e=>{var t;let{group:s}=e;const r=null!==(t=s.source_tenants)&&void 0!==t?t:[];return(0,x.jsx)(o.C,{label:"Tenant sources",children:(0,x.jsx)(x.Fragment,{children:r.map((e=>(0,x.jsx)("div",{children:e},e)))})})};var $=s("./public/app/features/alerting/unified/components/rules/RuleDetailsMatchingInstances.tsx"),q=s("./public/app/features/alerting/unified/components/rules/RuleHealth.tsx"),I=s("./public/app/features/alerting/unified/components/rules/RuleState.tsx"),O=s("./public/app/features/alerting/unified/hooks/useAlertQueriesStatus.ts"),T=s("./public/app/features/alerting/unified/hooks/useCombinedRule.ts"),D=s("./public/app/features/alerting/unified/state/AlertingQueryRunner.ts"),N=s("./public/app/features/alerting/unified/utils/datasource.ts"),L=s("./public/app/features/alerting/unified/utils/rules.ts");function A(e){if(!e)return[];const{namespace:t,rulerRule:s}=e,{rulesSource:r}=t;if((0,N.HY)(r)&&(0,L.Pc)(s))return s.grafana_alert.data;if((0,N.jq)(r)){const t=function(e,t){const s="A";switch(e.type){case"prometheus":return{refId:s,expr:t.query};case"loki":return{refId:s,expr:t.query};default:throw new Error(`Query for datasource type ${e.type} is currently not supported by cloud alert rules.`)}}(r,e);return[{refId:t.refId,datasourceUid:r.uid,queryType:"",model:t,relativeTimeRange:{from:360,to:0}}]}return[]}var M,U,P,Q,E,B=s("./public/app/features/alerting/unified/utils/rule-id.ts");const F="Could not find data source for rule",V="Could not view rule",G="Alerting / View rule";function Z(e){let{match:t}=e;const s=(0,c.useStyles2)(W),{id:r,sourceName:i}=t.params,d=B.OA(r,!0),{loading:p,error:f,result:m}=(0,T.H)(d,i),g=(0,a.useMemo)((()=>new D.v),[]),h=(0,n.Z)(g.get()),b=(0,a.useMemo)((()=>A(m)),[m]),[j,v]=(0,a.useState)([]),{allDataSourcesAvailable:S}=(0,O.S)(b),_=(0,a.useCallback)((()=>{j.length>0&&S&&g.run(j)}),[j,g,S]);(0,a.useEffect)((()=>{v(b)}),[b]),(0,a.useEffect)((()=>{S&&_()}),[_,S]),(0,a.useEffect)((()=>()=>g.destroy()),[g]);const Z=(0,a.useCallback)((e=>{v((t=>t.map((t=>t.refId===e.refId?e:t))))}),[]);if(!i)return(0,x.jsx)(l.$,{title:G,children:(0,x.jsx)(c.Alert,{title:V,children:(0,x.jsx)("details",{className:s.errorMessage,children:F})})});const J=(0,N.o_)(i);if(p)return M||(M=(0,x.jsx)(l.$,{title:G,children:(0,x.jsx)(c.LoadingPlaceholder,{text:"Loading rule..."})}));var K;if(f||!J)return(0,x.jsx)(l.$,{title:G,children:(0,x.jsx)(c.Alert,{title:V,children:(0,x.jsxs)("details",{className:s.errorMessage,children:[null!==(K=null==f?void 0:f.message)&&void 0!==K?K:F,U||(U=(0,x.jsx)("br",{})),!(null==f||!f.stack)&&f.stack]})})});if(!m)return P||(P=(0,x.jsx)(l.$,{title:G,children:(0,x.jsx)("span",{children:"Rule could not be found."})}));const Y=Object.entries(m.annotations).filter((e=>{let[t,s]=e;return!!s.trim()})),X=(0,L.Jq)(m.group);return(0,x.jsxs)(l.$,{wrapInContent:!1,title:G,children:[X&&(Q||(Q=(0,x.jsx)(c.Alert,{severity:"info",title:"This rule is part of a federated rule group.",children:(0,x.jsxs)(c.VerticalGroup,{children:["Federated rule groups are currently an experimental feature.",(0,x.jsx)(c.Button,{fill:"text",icon:"book",children:(0,x.jsx)("a",{href:"https://grafana.com/docs/metrics-enterprise/latest/tenant-management/tenant-federation/#cross-tenant-alerting-and-recording-rule-federation",children:"Read documentation"})})]})}))),(0,x.jsxs)(l.l,{children:[(0,x.jsxs)("div",{children:[(0,x.jsxs)("h4",{children:[E||(E=(0,x.jsx)(c.Icon,{name:"bell",size:"lg"}))," ",m.name]}),(0,x.jsx)(I.p,{rule:m,isCreating:!1,isDeleting:!1}),(0,x.jsx)(w.f,{rule:m,rulesSource:J})]}),(0,x.jsxs)("div",{className:s.details,children:[(0,x.jsxs)("div",{className:s.leftSide,children:[m.promRule&&(0,x.jsx)(o.C,{label:"Health",horizontal:!0,children:(0,x.jsx)(q.V,{rule:m.promRule})}),!!m.labels&&!!Object.keys(m.labels).length&&(0,x.jsx)(o.C,{label:"Labels",horizontal:!0,children:(0,x.jsx)(u.s,{labels:m.labels})}),(0,x.jsx)(z.C,{rulesSource:J,rule:m,annotations:Y}),(0,x.jsx)(R.J,{annotations:Y})]}),(0,x.jsxs)("div",{className:s.rightSide,children:[(0,x.jsx)(k.C,{rule:m,rulesSource:J}),X&&(0,x.jsx)(C,{group:m.group}),(0,x.jsx)(o.C,{label:"Namespace / Group",children:`${m.namespace.name} / ${m.group.name}`})]})]}),(0,x.jsx)("div",{children:(0,x.jsx)($.M,{promRule:m.promRule})})]}),!X&&h&&Object.keys(h).length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:s.queriesTitle,children:["Query results ",(0,x.jsx)(c.PanelChromeLoadingIndicator,{loading:H(h),onCancel:()=>g.cancel()})]}),(0,x.jsx)(l.l,{padding:0,children:(0,x.jsx)("div",{className:s.queries,children:j.map((e=>(0,x.jsx)("div",{className:s.query,children:(0,x.jsx)(y,{query:e,data:h&&h[e.refId],onChangeQuery:Z})},e.refId)))})})]}),!X&&!S&&(0,x.jsx)(c.Alert,{title:"Query not available",severity:"warning",className:s.queryWarning,children:"Cannot display the query preview. Some of the data sources used in the queries are not available."})]})}function H(e){return!!Object.values(e).find((e=>e.state===i.LoadingState.Loading))}const W=e=>({errorMessage:r.css`
      white-space: pre-wrap;
    `,queries:r.css`
      height: 100%;
      width: 100%;
    `,queriesTitle:r.css`
      padding: ${e.spacing(2,.5)};
      font-size: ${e.typography.h5.fontSize};
      font-weight: ${e.typography.fontWeightBold};
      font-family: ${e.typography.h5.fontFamily};
    `,query:r.css`
      border-bottom: 1px solid ${e.colors.border.medium};
      padding: ${e.spacing(2)};
    `,queryWarning:r.css`
      margin: ${e.spacing(4,0)};
    `,details:r.css`
      display: flex;
      flex-direction: row;
    `,leftSide:r.css`
      flex: 1;
    `,rightSide:r.css`
      padding-left: 90px;
      width: 300px;
    `}),J=(0,c.withErrorBoundary)(Z,{style:"page"})},"./public/app/features/alerting/unified/components/Authorize.tsx":(e,t,s)=>{s.d(t,{q:()=>n});s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var r=s("./public/app/core/services/context_srv.ts"),a=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const n=e=>{let{actions:t,children:s,fallback:n=!0}=e;return t.some((e=>r.Vt.hasAccess(e,n)))?(0,a.jsx)(a.Fragment,{children:s}):null}},"./public/app/features/alerting/unified/components/PanelPluginsButtonGroup.tsx":(e,t,s)=>{s.d(t,{j:()=>u});var r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a=s("./packages/grafana-runtime/src/index.ts"),n=s("./packages/grafana-ui/src/index.ts"),i=s("./public/app/features/alerting/unified/utils/constants.ts"),c=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function u(e){const{value:t,onChange:s,size:u="md"}=e,o=(0,r.useMemo)((()=>Object.values(a.config.panels).reduce(((e,t)=>(function(e){switch(e){case i.GC:case i.Fe:case i.Kd:return!0;default:return!1}}(t.id)&&e.push({value:t.id,label:t.name,imgUrl:t.info.logos.small}),e)),[])),[]);return(0,c.jsx)(n.RadioButtonGroup,{options:o,value:t,onChange:s,size:u})}},"./public/app/features/alerting/unified/components/rule-viewer/RuleViewerLayout.tsx":(e,t,s)=>{s.d(t,{$:()=>u,l:()=>o});var r=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),a=(s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s("./packages/grafana-runtime/src/index.ts")),n=s("./packages/grafana-ui/src/index.ts"),i=s("./public/app/core/components/Page/Page.tsx"),c=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function u(e){const{wrapInContent:t=!0,children:s,title:r}=e,u=(0,n.useStyles2)(l);return(0,c.jsxs)(i.T,{children:[(0,c.jsx)(n.PageToolbar,{title:r,pageIcon:"bell",onGoBack:()=>a.locationService.push("/alerting/list")}),(0,c.jsx)("div",{className:u.content,children:t?(0,c.jsx)(o,Object.assign({},e)):s})]})}function o(e){let{children:t,padding:s=2}=e;const r=(0,n.useStyles2)(d(s));return(0,c.jsx)("div",{className:r.wrapper,children:t})}const l=e=>({content:r.css`
      margin: ${e.spacing(0,2,2)};
      max-width: ${e.breakpoints.values.xxl}px;
    `}),d=e=>t=>({wrapper:r.css`
      background: ${t.colors.background.primary};
      border: 1px solid ${t.colors.border.weak};
      border-radius: ${t.shape.borderRadius()};
      padding: ${t.spacing(e)};
    `})},"./public/app/features/alerting/unified/hooks/useAlertQueriesStatus.ts":(e,t,s)=>{s.d(t,{S:()=>n});var r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a=s("./packages/grafana-runtime/src/index.ts");function n(e){return{allDataSourcesAvailable:(0,r.useMemo)((()=>e.every((e=>Boolean((0,a.getDataSourceSrv)().getInstanceSettings(e.datasourceUid))))),[e])}}},"./public/app/features/alerting/unified/hooks/useCombinedRule.ts":(e,t,s)=>{s.d(t,{H:()=>p,X:()=>f});var r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a=s("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/0/cache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),n=s("./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useAsync.js"),i=s("./public/app/features/alerting/unified/state/actions.ts"),c=s("./public/app/features/alerting/unified/utils/redux.ts"),u=s("./public/app/features/alerting/unified/utils/rule-id.ts"),o=s("./public/app/features/alerting/unified/utils/rules.ts"),l=s("./public/app/features/alerting/unified/hooks/useCombinedRuleNamespaces.ts"),d=s("./public/app/features/alerting/unified/hooks/useUnifiedAlertingSelector.ts");function p(e,t){const s=m(t),a=(0,l.Zo)(t),n=(0,r.useMemo)((()=>{if(e&&t&&0!==a.length)for(const s of a)for(const r of s.groups)for(const s of r.rules){const r=u.Yd(t,s);if(u.Dg(r,e))return s}}),[e,t,a]);return Object.assign({},s,{result:n})}function f(e,t){const s=m(t),a=(0,l.Zo)(t),n=(0,r.useMemo)((()=>{if(!e||!t||0===a.length)return[];const s=[];for(const t of a)for(const r of t.groups)for(const t of r.rules)t.name===e&&s.push(t);return s}),[e,t,a]);return Object.assign({},s,{result:n})}function m(e){var t;const s=(0,a.useDispatch)(),r=(0,d._)((e=>e.promRules)),c=g(e,r),u=(0,d._)((e=>e.rulerRules)),l=g(e,u),{loading:p}=(0,n.Z)((async()=>{e&&await s((0,i.dn)({rulesSourceName:e}))}),[s,e]);return{loading:p,error:(null!==(t=c.error)&&void 0!==t?t:(0,o.m$)(l))?void 0:l.error,dispatched:c.dispatched&&l.dispatched}}function g(e,t){if(!e)return c.oq;const s=t[e];return s||c.oq}},"./public/app/features/alerting/unified/state/AlertingQueryRunner.ts":(e,t,s)=>{s.d(t,{v:()=>w});var r=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),a=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),n=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),i=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/share.js"),c=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js"),u=s("./.yarn/cache/uuid-npm-8.3.2-eca0baba53-5575a8a75c.zip/node_modules/uuid/dist/esm-browser/v4.js"),o=s("./packages/grafana-data/src/index.ts"),l=s("./packages/grafana-runtime/src/index.ts"),d=s("./public/app/core/services/backend_srv.ts"),p=s("./public/app/features/expressions/guards.ts"),f=s("./public/app/features/query/state/processing/canceler.ts"),m=s("./public/app/features/query/state/processing/revision.ts"),g=s("./public/app/features/query/state/runRequest.ts"),h=s("./public/app/features/expressions/types.ts");const b={from:21600,to:0},x=(e,t)=>{switch(e.type){case h.Us.classic:return j(e);case h.Us.math:return y(e,t);case h.Us.resample:case h.Us.reduce:return S(e)}},j=e=>{var t;return null===(t=e.conditions)||void 0===t?void 0:t.map((e=>e.query.params[0]))},v=(e,t)=>{let s=[],r=[b.to];for(const a of e){const e=t.find((e=>e.refId===a));e&&e.relativeTimeRange&&(s.push(e.relativeTimeRange.from),r.push(e.relativeTimeRange.to))}return{from:s,to:r}},y=(e,t)=>t.filter((t=>{var s;return"query"===t.queryType&&(null===(s=e.expression)||void 0===s?void 0:s.includes(t.refId))})).map((e=>e.refId)),S=e=>e.expression?[e.expression]:void 0;function _(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class w{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,d.i)(),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,l.getDataSourceSrv)();_(this,"subject",void 0),_(this,"subscription",void 0),_(this,"lastResult",void 0),this.backendSrv=e,this.dataSourceSrv=t,this.backendSrv=e,this.dataSourceSrv=t,this.subject=new r.t(1),this.lastResult={}}get(){return this.subject.asObservable()}async run(e){if(0===e.length){const t=k(e,o.LoadingState.Done);return this.subject.next(t)}for(const t of e)if(!(0,p.j)(t.model)){const s=await this.dataSourceSrv.get(t.datasourceUid);if(s.filterQuery&&!s.filterQuery(t.model)){const t=k(e,o.LoadingState.Done);return this.subject.next(t)}}this.subscription=R(this.backendSrv,e).subscribe({next:e=>{const t=q(e,((e,t)=>{const s=this.lastResult[e],r=(0,g.zR)(t,s);return(0,m.C)(r,s)}));this.lastResult=t,this.subject.next(this.lastResult)},error:e=>{this.lastResult=$(this.lastResult,e),this.subject.next(this.lastResult)}})}cancel(){if(!this.subscription)return;this.subscription.unsubscribe();let e=!1;const t=q(this.lastResult,((t,s)=>(s.state===o.LoadingState.Loading&&(e=!0),Object.assign({},s,{state:o.LoadingState.Done}))));e&&this.subject.next(t)}destroy(){this.subject&&this.subject.complete(),this.cancel()}}const R=(e,t)=>{const s=k(t,o.LoadingState.Loading),r={data:{data:t},url:"/api/v1/eval",method:"POST",requestId:(0,u.Z)()};return(0,o.withLoadingIndicator)({whileLoading:s,source:e.fetch(r).pipe(C(s),(0,n.K)((e=>(0,a.of)($(s,e)))),(0,f.V)(e,r.requestId),(0,i.B)())})},k=(e,t)=>e.reduce(((s,r)=>(s[r.refId]={state:t,series:[],timeRange:z(r,e)},s)),{}),z=(e,t)=>{if((0,p.j)(e.model)){const s=((e,t)=>{const s=x(e,t);if(!s)return b;const{from:r,to:a}=v(s,t);return r.length||a.length?{from:Math.max(...r),to:Math.min(...a)}:b})(e.model,t);return o.rangeUtil.relativeToTimeRange(s)}return e.relativeTimeRange?o.rangeUtil.relativeToTimeRange(e.relativeTimeRange):(console.warn(`Query with refId: ${e.refId} did not have any relative time range, using default.`),(0,o.getDefaultTimeRange)())},C=e=>(0,c.U)((t=>{const{data:s}=t,r={};for(const[t,a]of Object.entries(s.results))r[t]={timeRange:e[t].timeRange,state:o.LoadingState.Done,series:a.frames.map(o.dataFrameFromJSON)};return r})),$=(e,t)=>{const s=(0,l.toDataQueryError)(t);return q(e,((e,t)=>Object.assign({},t,{state:o.LoadingState.Error,error:s})))},q=(e,t)=>{const s={};for(const[r,a]of Object.entries(e))s[r]=t(r,a);return s}},"./public/app/features/expressions/guards.ts":(e,t,s)=>{s.d(t,{j:()=>n});var r=s("./packages/grafana-runtime/src/utils/DataSourceWithBackend.ts"),a=s("./public/app/features/expressions/types.ts");const n=e=>{if(!e)return!1;if((0,r.Pr)(e.datasource))return!0;const t=e;return"string"==typeof t.type&&Object.values(a.Us).includes(t.type)}},"./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useObservable.js":(e,t,s)=>{s.d(t,{Z:()=>n});var r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),a=s("./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useIsomorphicLayoutEffect.js");const n=function(e,t){var s=(0,r.useState)(t),n=s[0],i=s[1];return(0,a.Z)((function(){var t=e.subscribe(i);return function(){return t.unsubscribe()}}),[e]),n}}}]);
//# sourceMappingURL=AlertingRule.a87fd0ce1ff28bec28a3.js.map