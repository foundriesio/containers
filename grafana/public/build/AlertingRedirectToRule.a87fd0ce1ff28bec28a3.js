"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[7918],{"./public/app/features/alerting/unified/RedirectToRuleViewer.tsx":(e,r,s)=>{s.r(r),s.d(r,{RedirectToRuleViewer:()=>b,default:()=>j});var a,n,t,u,i=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),l=(s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s("./.yarn/__virtual__/react-router-virtual-31642fe47a/0/cache/react-router-npm-5.2.1-ea754d7473-7daae084bf.zip/node_modules/react-router/esm/react-router.js")),o=s("./packages/grafana-ui/src/index.ts"),c=s("./public/app/features/alerting/unified/components/AlertLabels.tsx"),d=s("./public/app/features/alerting/unified/components/rule-viewer/RuleViewerLayout.tsx"),p=s("./public/app/features/alerting/unified/hooks/useCombinedRule.ts"),m=s("./public/app/features/alerting/unified/utils/datasource.ts"),f=s("./public/app/features/alerting/unified/utils/misc.ts"),g=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const h="Alerting / Find rule";function b(e){const{name:r,sourceName:s}=e.match.params,i=(0,o.useStyles2)(x),{error:b,loading:j,result:_,dispatched:v}=(0,p.X)(r,s);if(b)return(0,g.jsx)(d.$,{title:h,children:(0,g.jsx)(o.Alert,{title:`Failed to load rules from ${s}`,children:(0,g.jsxs)("details",{className:i.errorMessage,children:[b.message,a||(a=(0,g.jsx)("br",{})),!(null==b||!b.stack)&&b.stack]})})});if(j||!v||!Array.isArray(_))return n||(n=(0,g.jsx)(d.$,{title:h,children:(0,g.jsx)(o.LoadingPlaceholder,{text:"Loading rule..."})}));if(!r||!s)return t||(t=(0,g.jsx)(l.l_,{to:"/notfound"}));const y=(0,m.o_)(s);if(!y)return(0,g.jsx)(d.$,{title:h,children:(0,g.jsx)(o.Alert,{title:"Could not view rule",children:(0,g.jsx)("details",{className:i.errorMessage,children:`Could not find data source with name: ${s}.`})})});if(1===_.length){const[e]=_;return(0,g.jsx)(l.l_,{to:(0,f.V2)(y,e,"/alerting/list")})}return(0,g.jsxs)(d.$,{title:h,children:[(0,g.jsxs)("div",{children:["Several rules in ",(0,g.jsx)("span",{className:i.param,children:s})," matched the name"," ",(0,g.jsx)("span",{className:i.param,children:r}),", please select the rule you want to view."]}),(0,g.jsx)("div",{className:i.rules,children:_.map(((e,r)=>(0,g.jsxs)(o.Card,{href:(0,f.V2)(y,e,"/alerting/list"),children:[(0,g.jsx)(o.Card.Heading,{children:e.name}),(0,g.jsxs)(o.Card.Meta,{separator:"",children:[u||(u=(0,g.jsx)(o.Icon,{name:"folder"})),(0,g.jsx)("span",{className:i.namespace,children:`${e.namespace.name} / ${e.group.name}`})]}),(0,g.jsx)(o.Card.Tags,{children:(0,g.jsx)(c.s,{labels:e.labels})})]},`${e.name}-${r}`)))})]})}function x(e){return{param:i.css`
      font-style: italic;
      color: ${e.colors.text.secondary};
    `,rules:i.css`
      margin-top: ${e.spacing(2)};
    `,namespace:i.css`
      margin-left: ${e.spacing(1)};
    `,errorMessage:i.css`
      white-space: pre-wrap;
    `}}const j=(0,o.withErrorBoundary)(b,{style:"page"})},"./public/app/features/alerting/unified/components/rule-viewer/RuleViewerLayout.tsx":(e,r,s)=>{s.d(r,{$:()=>l,l:()=>o});var a=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),n=(s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s("./packages/grafana-runtime/src/index.ts")),t=s("./packages/grafana-ui/src/index.ts"),u=s("./public/app/core/components/Page/Page.tsx"),i=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function l(e){const{wrapInContent:r=!0,children:s,title:a}=e,l=(0,t.useStyles2)(c);return(0,i.jsxs)(u.T,{children:[(0,i.jsx)(t.PageToolbar,{title:a,pageIcon:"bell",onGoBack:()=>n.locationService.push("/alerting/list")}),(0,i.jsx)("div",{className:l.content,children:r?(0,i.jsx)(o,Object.assign({},e)):s})]})}function o(e){let{children:r,padding:s=2}=e;const a=(0,t.useStyles2)(d(s));return(0,i.jsx)("div",{className:a.wrapper,children:r})}const c=e=>({content:a.css`
      margin: ${e.spacing(0,2,2)};
      max-width: ${e.breakpoints.values.xxl}px;
    `}),d=e=>r=>({wrapper:a.css`
      background: ${r.colors.background.primary};
      border: 1px solid ${r.colors.border.weak};
      border-radius: ${r.shape.borderRadius()};
      padding: ${r.spacing(e)};
    `})},"./public/app/features/alerting/unified/hooks/useCombinedRule.ts":(e,r,s)=>{s.d(r,{H:()=>p,X:()=>m});var a=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=s("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/0/cache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),t=s("./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useAsync.js"),u=s("./public/app/features/alerting/unified/state/actions.ts"),i=s("./public/app/features/alerting/unified/utils/redux.ts"),l=s("./public/app/features/alerting/unified/utils/rule-id.ts"),o=s("./public/app/features/alerting/unified/utils/rules.ts"),c=s("./public/app/features/alerting/unified/hooks/useCombinedRuleNamespaces.ts"),d=s("./public/app/features/alerting/unified/hooks/useUnifiedAlertingSelector.ts");function p(e,r){const s=f(r),n=(0,c.Zo)(r),t=(0,a.useMemo)((()=>{if(e&&r&&0!==n.length)for(const s of n)for(const a of s.groups)for(const s of a.rules){const a=l.Yd(r,s);if(l.Dg(a,e))return s}}),[e,r,n]);return Object.assign({},s,{result:t})}function m(e,r){const s=f(r),n=(0,c.Zo)(r),t=(0,a.useMemo)((()=>{if(!e||!r||0===n.length)return[];const s=[];for(const r of n)for(const a of r.groups)for(const r of a.rules)r.name===e&&s.push(r);return s}),[e,r,n]);return Object.assign({},s,{result:t})}function f(e){var r;const s=(0,n.useDispatch)(),a=(0,d._)((e=>e.promRules)),i=g(e,a),l=(0,d._)((e=>e.rulerRules)),c=g(e,l),{loading:p}=(0,t.Z)((async()=>{e&&await s((0,u.dn)({rulesSourceName:e}))}),[s,e]);return{loading:p,error:(null!==(r=i.error)&&void 0!==r?r:(0,o.m$)(c))?void 0:c.error,dispatched:i.dispatched&&c.dispatched}}function g(e,r){if(!e)return i.oq;const s=r[e];return s||i.oq}},"./public/app/features/alerting/unified/hooks/useCombinedRuleNamespaces.ts":(e,r,s)=>{s.d(r,{Kd:()=>l,Zo:()=>i});var a=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=s("./public/app/features/alerting/unified/utils/datasource.ts"),t=s("./public/app/features/alerting/unified/utils/rules.ts"),u=s("./public/app/features/alerting/unified/hooks/useUnifiedAlertingSelector.ts");function i(e){const r=(0,u._)((e=>e.promRules)),s=(0,u._)((e=>e.rulerRules)),i=(0,a.useRef)({}),l=(0,a.useMemo)((()=>{if(e){const r=(0,n.o_)(e);if(!r)throw new Error(`Unknown rules source: ${e}`);return[r]}return(0,n.h_)()}),[e]);return(0,a.useMemo)((()=>l.map((e=>{var a,u;const l=(0,n.jq)(e)?e.name:e,c=null===(a=r[l])||void 0===a?void 0:a.result,d=null===(u=s[l])||void 0===u?void 0:u.result,p=i.current[l];if(p&&p.promRules===c&&p.rulerRules===d)return p.result;const m={};Object.entries(d||{}).forEach((r=>{let[s,a]=r;const n={rulesSource:e,name:s,groups:[]};m[s]=n,function(e,r){e.groups=r.map((r=>{const s={name:r.name,interval:r.interval,source_tenants:r.source_tenants,rules:[]};return s.rules=r.rules.map((r=>function(e,r,s){return(0,t.cG)(e)?{name:e.alert,query:e.expr,labels:e.labels||{},annotations:e.annotations||{},rulerRule:e,namespace:r,group:s}:(0,t.yF)(e)?{name:e.record,query:e.expr,labels:e.labels||{},annotations:{},rulerRule:e,namespace:r,group:s}:{name:e.grafana_alert.title,query:"",labels:e.labels||{},annotations:e.annotations||{},rulerRule:e,namespace:r,group:s}}(r,e,s))),s}))}(n,a)})),null==c||c.forEach((r=>{let{name:s,groups:a}=r;!function(e,r){r.forEach((r=>{var s;let a=e.groups.find((e=>e.name===r.name));a||(a={name:r.name,rules:[]},e.groups.push(a)),(null!==(s=r.rules)&&void 0!==s?s:[]).forEach((r=>{const s=function(e,r,s){var a;if((0,n.HY)(s))return r.rules.find((r=>r.name===e.name));return null!==(a=r.rules.find((r=>!r.promRule&&o(r,e,!0))))&&void 0!==a?a:r.rules.find((r=>!r.promRule&&o(r,e,!1)))}(r,a,e.rulesSource);s?s.promRule=r:a.rules.push(function(e,r,s){return{name:e.name,query:e.query,labels:e.labels||{},annotations:(0,t.x_)(e)&&e.annotations||{},promRule:e,namespace:r,group:s}}(r,e,a))}))}))}(m[s]=m[s]||{rulesSource:e,name:s,groups:[]},a)}));const f=Object.values(m);return i.current[l]={promRules:c,rulerRules:d,result:f},f})).flat()),[r,s,l])}function l(e){return e.map((e=>{const r=Object.assign({},e,{groups:[]});var s;return r.groups.push({name:"default",rules:(s=e.groups.flatMap((e=>e.rules)),s.sort(((e,r)=>e.name.localeCompare(r.name))))}),r}))}function o(e,r){let s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return e.name===r.name&&JSON.stringify([s?c(e.query):"",e.labels,e.annotations])===JSON.stringify([s?c(r.query):"",r.labels||{},(0,t.x_)(r)&&r.annotations||{}])}function c(e){return e.length>1&&"("===e[0]&&")"===e[e.length-1]&&(e=e.slice(1,-1)),(e=e.replace(/\s|\n/g,"")).split("").sort().join("")}}}]);
//# sourceMappingURL=AlertingRedirectToRule.a87fd0ce1ff28bec28a3.js.map