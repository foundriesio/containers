"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[94],{"./public/app/features/plugins/admin/components/Badges/index.ts":(e,a,s)=>{s.d(a,{SX:()=>i,IF:()=>p,oZ:()=>c,xh:()=>g});s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var r=s("./packages/grafana-data/src/index.ts"),n=s("./packages/grafana-ui/src/index.ts"),t=s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function i(e){let{error:a}=e;const s=function(e){switch(e){case r.PluginErrorCode.modifiedSignature:return"Plugin disabled due to modified content";case r.PluginErrorCode.invalidSignature:return"Plugin disabled due to invalid plugin signature";case r.PluginErrorCode.missingSignature:return"Plugin disabled due to missing plugin signature";default:return`Plugin disabled due to unkown error: ${e}`}}(a);return(0,t.jsx)(n.Badge,{icon:"exclamation-triangle",text:"Disabled",color:"red",tooltip:s})}var o=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");const l=e=>o.css`
  background: ${e.colors.background.primary};
  border-color: ${e.colors.border.strong};
  color: ${e.colors.text.secondary};
`;function c(){const e=(0,n.useStyles2)(l);return(0,t.jsx)(n.Badge,{text:"Installed",color:"orange",className:e})}var d,u=s("./packages/grafana-runtime/src/index.ts");function p(e){let{plugin:a}=e;const s=(0,n.useStyles2)(l);return(0,u.featureEnabled)("enterprise.plugins")?d||(d=(0,t.jsx)(n.Badge,{text:"Enterprise",color:"blue"})):(0,t.jsxs)(n.HorizontalGroup,{children:[(0,t.jsx)(n.PluginSignatureBadge,{status:a.signature}),(0,t.jsx)(n.Badge,{icon:"lock","aria-label":"lock icon",text:"Enterprise",color:"blue",className:s}),(0,t.jsx)(n.Button,{size:"sm",fill:"text",icon:"external-link-alt",onClick:e=>{e.preventDefault(),window.open(`https://grafana.com/grafana/plugins/${a.id}?utm_source=grafana_catalog_learn_more`,"_blank","noopener,noreferrer")},children:"Learn more"})]})}function g(e){let{plugin:a}=e;const s=(0,n.useStyles2)(m);return a.hasUpdate&&!a.isCore&&a.type!==r.PluginType.renderer?(0,t.jsx)("p",{className:s.hasUpdate,children:"Update available!"}):null}const m=e=>({hasUpdate:o.css`
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      margin-bottom: 0;
    `})},"./public/app/features/plugins/admin/components/Page.tsx":(e,a,s)=>{s.d(a,{T:()=>i});var r=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),n=(s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s("./packages/grafana-ui/src/index.ts")),t=s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const i=e=>{let{children:a}=e;const s=(0,n.useStyles2)(o);return(0,t.jsx)("div",{className:"page-container",children:(0,t.jsx)("div",{className:s,children:a})})},o=e=>r.css`
    margin-bottom: ${e.spacing(3)};
  `},"./public/app/features/plugins/admin/components/PluginLogo.tsx":(e,a,s)=>{s.d(a,{E:()=>n});s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var r=s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function n(e){let{alt:a,className:s,src:n,height:t}=e;return(0,r.jsx)("img",{src:n,className:s,alt:a,loading:"lazy",height:t})}},"./public/app/features/plugins/admin/pages/Browse.tsx":(e,a,s)=>{s.r(a),s.d(a,{default:()=>$});var r=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),n=s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),t=s("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/3/opt/drone/yarncache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),i=s("./.yarn/__virtual__/react-router-virtual-31642fe47a/3/opt/drone/yarncache/react-router-npm-5.2.1-ea754d7473-7daae084bf.zip/node_modules/react-router/esm/react-router.js"),o=s("./packages/grafana-runtime/src/index.ts"),l=s("./packages/grafana-ui/src/index.ts"),c=s("./public/app/core/components/Page/Page.tsx"),d=s("./public/app/core/selectors/navModel.ts"),u=s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const p=e=>{let{children:a,wrap:s,className:n}=e;const t=(0,l.useTheme2)(),i=g(t,s);return(0,u.jsx)("div",{className:(0,r.cx)(i.container,n),children:a})},g=(e,a)=>({container:r.css`
    display: flex;
    flex-direction: row;
    flex-wrap: ${a?"wrap":"no-wrap"};
    & > * {
      margin-bottom: ${e.spacing()};
      margin-right: ${e.spacing()};
    }
    & > *:last-child {
      margin-right: 0;
    }
  `});var m,h=s("./public/app/features/plugins/admin/components/Page.tsx"),x=s("./public/app/features/plugins/admin/types.ts"),y=s("./public/app/features/plugins/admin/components/Badges/index.ts");function f(e){var a,s;let{plugin:r}=e;return r.isEnterprise?(0,u.jsxs)(l.HorizontalGroup,{height:"auto",wrap:!0,children:[a||(a=(0,u.jsx)(y.IF,{plugin:r})),r.isDisabled&&(0,u.jsx)(y.SX,{error:r.error}),s||(s=(0,u.jsx)(y.xh,{plugin:r}))]}):(0,u.jsxs)(l.HorizontalGroup,{height:"auto",wrap:!0,children:[(0,u.jsx)(l.PluginSignatureBadge,{status:r.signature}),r.isDisabled&&(0,u.jsx)(y.SX,{error:r.error}),r.isInstalled&&(m||(m=(0,u.jsx)(y.oZ,{}))),(0,u.jsx)(y.xh,{plugin:r})]})}var b=s("./public/app/features/plugins/admin/components/PluginLogo.tsx");const v="48px";function j(e){let{plugin:a,pathName:s,displayMode:n=x.lL.Grid}=e;const t=(0,l.useStyles2)(S),i=n===x.lL.List;return(0,u.jsxs)("a",{href:`${s}/${a.id}`,className:(0,r.cx)(t.container,{[t.list]:i}),children:[(0,u.jsx)(b.E,{src:a.info.logos.small,className:t.pluginLogo,height:v,alt:""}),(0,u.jsx)("h2",{className:(0,r.cx)(t.name,"plugin-name"),children:a.name}),(0,u.jsxs)("div",{className:(0,r.cx)(t.content,"plugin-content"),children:[(0,u.jsxs)("p",{children:["By ",a.orgName]}),(0,u.jsx)(f,{plugin:a})]}),(0,u.jsx)("div",{className:t.pluginType,children:a.type&&(0,u.jsx)(l.Icon,{name:x.Co[a.type],title:`${a.type} plugin`})})]})}const S=e=>({container:r.css`
      display: grid;
      grid-template-columns: ${v} 1fr ${e.spacing(3)};
      grid-template-rows: auto;
      gap: ${e.spacing(2)};
      grid-auto-flow: row;
      background: ${e.colors.background.secondary};
      border-radius: ${e.shape.borderRadius()};
      padding: ${e.spacing(3)};
      transition: ${e.transitions.create(["background-color","box-shadow","border-color","color"],{duration:e.transitions.duration.short})};

      &:hover {
        background: ${e.colors.emphasize(e.colors.background.secondary,.03)};
      }
    `,list:r.css`
      row-gap: 0px;

      > img {
        align-self: start;
      }

      > .plugin-content {
        min-height: 0px;
        grid-area: 2 / 2 / 4 / 3;

        > p {
          margin: ${e.spacing(0,0,.5,0)};
        }
      }

      > .plugin-name {
        align-self: center;
        grid-area: 1 / 2 / 2 / 3;
      }
    `,pluginType:r.css`
      grid-area: 1 / 3 / 2 / 4;
      color: ${e.colors.text.secondary};
    `,pluginLogo:r.css`
      grid-area: 1 / 1 / 3 / 2;
      max-width: 100%;
      align-self: center;
      object-fit: contain;
    `,content:r.css`
      grid-area: 3 / 1 / 4 / 3;
      color: ${e.colors.text.secondary};
    `,name:r.css`
      grid-area: 1 / 2 / 3 / 3;
      align-self: center;
      font-size: ${e.typography.h4.fontSize};
      color: ${e.colors.text.primary};
      margin: 0;
    `}),_=e=>{let{plugins:a,displayMode:s}=e;const n=s===x.lL.List,t=(0,l.useStyles2)(P),o=(0,i.TH)();return(0,u.jsx)("div",{className:(0,r.cx)(t.container,{[t.list]:n}),"data-testid":"plugin-list",children:a.map((e=>(0,u.jsx)(j,{plugin:e,pathName:o.pathname,displayMode:s},e.id)))})},P=e=>({container:r.css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
      gap: ${e.spacing(3)};
    `,list:r.css`
      grid-template-columns: 1fr;
    `});var B=s("./.yarn/__virtual__/react-use-virtual-00326e70ba/3/opt/drone/yarncache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useDebounce.js");const w=e=>{let{value:a,onSearch:s}=e;const[r,t]=(0,n.useState)(a);return function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const r=(0,n.useRef)(!0),t=[...s,r];(0,B.Z)((()=>{if(!r.current)return e();r.current=!1}),a,t)}((()=>s(null!=r?r:"")),500,[r]),(0,u.jsx)(l.FilterInput,{value:r,onKeyDown:e=>{"Enter"!==e.key&&13!==e.keyCode||s(e.currentTarget.value)},placeholder:"Search Grafana plugins",onChange:e=>{t(e)},width:46})};var z=s("./public/app/features/plugins/admin/helpers.ts");var N=s("./public/app/features/plugins/admin/state/hooks.ts");function $(e){let{route:a}=e;const s=(0,i.TH)(),n=(0,o.locationSearchToObject)(s.search),g=D(a.routeName),m=(0,t.useSelector)((e=>(0,d.h)(e.navIndex,g))),{displayMode:y,setDisplayMode:f}=(0,N.iY)(),b=(0,l.useStyles2)(k),v={push:e=>{let{query:a}=e;o.locationService.partial(a)}},j=(0,N.y9)(),S=n.q||"",P=n.filterBy||"installed",B=n.filterByType||"all",$=n.sortBy||z.Nh.nameAsc,{isLoading:L,error:C,plugins:T}=(0,N.GE)({query:S,filterBy:P,filterByType:B,sortBy:$}),E=[{value:"all",label:"All"},{value:"installed",label:"Installed"}],A=e=>{v.push({query:{filterBy:e}})};return C?(console.error(C.message),null):(0,u.jsx)(c.T,{navModel:m,children:(0,u.jsx)(c.T.Contents,{children:(0,u.jsxs)(h.T,{children:[(0,u.jsxs)(p,{wrap:!0,children:[(0,u.jsx)(w,{value:S,onSearch:e=>{v.push({query:{filterBy:"all",filterByType:"all",q:e}})}}),(0,u.jsxs)(p,{wrap:!0,className:b.actionBar,children:[(0,u.jsx)("div",{children:(0,u.jsx)(l.RadioButtonGroup,{value:B,onChange:e=>{v.push({query:{filterByType:e}})},options:[{value:"all",label:"All"},{value:"datasource",label:"Data sources"},{value:"panel",label:"Panels"},{value:"app",label:"Applications"}]})}),j?(0,u.jsx)("div",{children:(0,u.jsx)(l.RadioButtonGroup,{value:P,onChange:A,options:E})}):(0,u.jsx)(l.Tooltip,{content:"This filter has been disabled because the Grafana server cannot access grafana.com",placement:"top",children:(0,u.jsx)("div",{children:(0,u.jsx)(l.RadioButtonGroup,{disabled:!0,value:P,onChange:A,options:E})})}),(0,u.jsx)("div",{children:(0,u.jsx)(l.Select,{menuShouldPortal:!0,"aria-label":"Sort Plugins List",width:24,value:$,onChange:e=>{v.push({query:{sortBy:e.value}})},options:[{value:"nameAsc",label:"Sort by name (A-Z)"},{value:"nameDesc",label:"Sort by name (Z-A)"},{value:"updated",label:"Sort by updated date"},{value:"published",label:"Sort by published date"},{value:"downloads",label:"Sort by downloads"}]})}),(0,u.jsx)("div",{children:(0,u.jsx)(l.RadioButtonGroup,{className:b.displayAs,value:y,onChange:f,options:[{value:x.lL.Grid,icon:"table",description:"Display plugins in a grid layout"},{value:x.lL.List,icon:"list-ul",description:"Display plugins in list"}]})})]})]}),(0,u.jsx)("div",{className:b.listWrap,children:L?(0,u.jsx)(l.LoadingPlaceholder,{className:r.css`
                  margin-bottom: 0;
                `,text:"Loading results"}):(0,u.jsx)(_,{plugins:T,displayMode:y})})]})})})}const k=e=>({actionBar:r.css`
    ${e.breakpoints.up("xl")} {
      margin-left: auto;
    }
  `,listWrap:r.css`
    margin-top: ${e.spacing(2)};
  `,displayAs:r.css`
    svg {
      margin-right: 0;
    }
  `}),D=e=>e===x.cd.HomeAdmin||e===x.cd.BrowseAdmin?"admin-plugins":"plugins"},"./public/app/features/plugins/admin/state/hooks.ts":(e,a,s)=>{s.d(a,{iY:()=>C,bt:()=>N,ZV:()=>z,GE:()=>j,UQ:()=>_,bJ:()=>S,x3:()=>P,IS:()=>$,y9:()=>w,S1:()=>B,wq:()=>k});var r=s("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n=s("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/3/opt/drone/yarncache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),t=s("./public/app/features/plugins/admin/helpers.ts"),i=s("./public/app/features/plugins/admin/state/actions.ts"),o=s("./public/app/features/plugins/admin/state/reducer.ts"),l=s("../../opt/drone/yarncache/reselect-npm-4.1.5-bc046e41ae-54c13c1e79.zip/node_modules/reselect/es/index.js"),c=s("./public/app/features/plugins/admin/types.ts");const d=e=>e.plugins,u=(0,l.P1)(d,(e=>{let{items:a}=e;return a})),p=(0,l.P1)(d,(e=>{let{settings:a}=e;return a.displayMode})),{selectAll:g,selectById:m}=o.CD.getSelectors(u),h=(e,a)=>(0,l.P1)((e=>(0,l.P1)(g,(a=>a.filter((a=>"installed"===e?a.isInstalled:!a.isCore)))))(e),(e=>e.filter((e=>"all"===a||e.type===a)))),x=(e,a,s)=>(0,l.P1)(h(a,s),(e=>(0,l.P1)(g,(a=>""===e?[]:a.filter((a=>{const s=[];return a.name&&s.push(a.name.toLowerCase()),a.orgName&&s.push(a.orgName.toLowerCase()),s.some((a=>a.includes(e.toLowerCase())))})))))(e),((a,s)=>""===e?a:s)),y=(0,l.P1)(g,(e=>e?e.filter((e=>Boolean(e.error))).map((e=>({pluginId:e.id,errorCode:e.error}))):[])),f=e=>(0,l.P1)(d,(a=>{let{requests:s={}}=a;return s[e]})),b=e=>(0,l.P1)(f(e),(e=>(null==e?void 0:e.status)===c.eE.Pending)),v=e=>(0,l.P1)(f(e),(e=>(null==e?void 0:e.status)===c.eE.Rejected?null==e?void 0:e.error:null)),j=e=>{let{query:a="",filterBy:s="installed",filterByType:r="all",sortBy:i=t.Nh.nameAsc}=e;D();const o=(0,n.useSelector)(x(a,s,r)),{isLoading:l,error:c}=z();return{isLoading:l,error:c,plugins:(0,t.AA)(o,i)}},S=e=>(D(),L(e),(0,n.useSelector)((a=>m(a,e)))),_=()=>(D(),(0,n.useSelector)(y)),P=()=>{const e=(0,n.useDispatch)();return(a,s,r)=>e((0,i.N9)({id:a,version:s,isUpdating:r}))},B=()=>{const e=(0,n.useDispatch)();return a=>e((0,i.Tz)(a))},w=()=>null===(0,n.useSelector)(v(i.tQ.typePrefix)),z=()=>({isLoading:(0,n.useSelector)(b(i.Qd.typePrefix)),error:(0,n.useSelector)(v(i.Qd.typePrefix))}),N=()=>({isLoading:(0,n.useSelector)(b(i.DD.typePrefix)),error:(0,n.useSelector)(v(i.DD.typePrefix))}),$=()=>({isInstalling:(0,n.useSelector)(b(i.N9.typePrefix)),error:(0,n.useSelector)(v(i.N9.typePrefix))}),k=()=>({isUninstalling:(0,n.useSelector)(b(i.Tz.typePrefix)),error:(0,n.useSelector)(v(i.Tz.typePrefix))}),D=()=>{const e=(0,n.useDispatch)(),a=(0,n.useSelector)((s=i.Qd.typePrefix,(0,l.P1)(f(s),(e=>void 0===e))));var s;(0,r.useEffect)((()=>{a&&e((0,i.Qd)())}),[])},L=e=>{const a=(0,n.useDispatch)(),s=(0,n.useSelector)((a=>m(a,e))),t=!(0,n.useSelector)(b(i.DD.typePrefix))&&s&&!s.details;(0,r.useEffect)((()=>{t&&a((0,i.DD)(e))}),[s])},C=()=>{const e=(0,n.useDispatch)();return{displayMode:(0,n.useSelector)(p),setDisplayMode:a=>e((0,o.UC)(a))}}}}]);
//# sourceMappingURL=PluginListPage.b208037f6b1954dc031d.js.map