"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[7036],{"./public/app/core/components/PanelTypeFilter/PanelTypeFilter.tsx":(e,a,s)=>{s.d(a,{j:()=>c});var n,t=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),i=s("./packages/grafana-ui/src/index.ts"),o=s("./public/app/features/panel/state/util.ts"),l=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const c=e=>{let{onChange:a,maxMenuHeight:s}=e;const t=(0,r.useMemo)((()=>(0,o.x)()),[]),c=(0,r.useMemo)((()=>t.map((e=>({label:e.name,imgUrl:e.info.logos.small,value:e}))).sort(((e,a)=>{var s;return null===(s=e.label)||void 0===s?void 0:s.localeCompare(a.label)}))),[t]),[p,u]=(0,r.useState)([]),m=(0,r.useCallback)((e=>{const s=[];for(const a of e)a.value&&s.push(a.value);a(s),u(e)}),[a]),g=(0,i.useStyles2)(d),b={defaultOptions:!0,getOptionLabel:e=>e.label,getOptionValue:e=>e.value,noOptionsMessage:"No Panel types found",placeholder:"Filter by type",maxMenuHeight:s,options:c,value:p,onChange:m};return(0,l.jsxs)("div",{className:g.container,children:[p.length>0&&(0,l.jsx)(i.Button,{size:"xs",icon:"trash-alt",variant:"link",className:g.clear,onClick:()=>m([]),"aria-label":"Clear types",children:"Clear types"}),(0,l.jsx)(i.MultiSelect,Object.assign({menuShouldPortal:!0},b,{prefix:n||(n=(0,l.jsx)(i.Icon,{name:"filter"})),"aria-label":"Panel Type filter"}))]})};function d(e){return{container:t.css`
      label: container;
      position: relative;
      min-width: 180px;
      flex-grow: 1;
    `,clear:t.css`
      label: clear;
      font-size: ${e.spacing(1.5)};
      position: absolute;
      top: -${e.spacing(4.5)};
      right: 0;
    `}}},"./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx":(e,a,s)=>{s.d(a,{p:()=>z});var n=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),t=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),r=s("./packages/grafana-runtime/src/index.ts"),i=s("./packages/grafana-ui/src/index.ts"),o=s("./public/app/features/panel/components/PanelPluginError.tsx"),l=s("./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx"),c=s("./packages/grafana-data/src/index.ts"),d=s("./public/app/features/library-panels/styles.ts"),p=s("./public/app/features/library-panels/components/LibraryPanelsView/actions.ts"),u=s("./public/app/features/library-panels/state/api.ts"),m=s("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/0/cache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");const g={loadingState:c.LoadingState.Loading,dashboardTitles:[]},b=(0,m.PH)("libraryPanels/delete/searchCompleted"),h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,a=arguments.length>1?arguments[1]:void 0;return b.match(a)?Object.assign({},e,{dashboardTitles:a.payload.dashboards.map((e=>e.title)),loadingState:c.LoadingState.Done}):e};var f,x,y,j,P=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const v=e=>{let{libraryPanel:a,onDismiss:s,onConfirm:n}=e;const r=(0,i.useStyles)(d.J),[{dashboardTitles:o,loadingState:l},m]=(0,t.useReducer)(h,g),y=(0,t.useMemo)((()=>(0,p.tb)(m)),[m]);(0,t.useEffect)((()=>{y(function(e){return async function(a){const s=await(0,u.E8)(e.uid);a(b({dashboards:s}))}}(a))}),[y,a]);const j=Boolean(o.length),v=l===c.LoadingState.Done;return(0,P.jsxs)(i.Modal,{className:r.modal,title:"Delete library panel",icon:"trash-alt",onDismiss:s,isOpen:!0,children:[v?null:f||(f=(0,P.jsx)(w,{})),v?(0,P.jsxs)("div",{children:[j?(0,P.jsx)(_,{dashboardTitles:o}):null,j?null:x||(x=(0,P.jsx)(S,{})),(0,P.jsxs)(i.Modal.ButtonRow,{children:[(0,P.jsx)(i.Button,{variant:"secondary",onClick:s,fill:"outline",children:"Cancel"}),(0,P.jsx)(i.Button,{variant:"destructive",onClick:n,disabled:j,children:"Delete"})]})]}):null]})},w=()=>y||(y=(0,P.jsx)("span",{children:"Loading library panel..."})),S=()=>{const e=(0,i.useStyles)(d.J);return(0,P.jsx)("div",{className:e.modalText,children:"Do you want to delete this panel?"})},_=e=>{let{dashboardTitles:a}=e;const s=(0,i.useStyles)(d.J),n=1===a.length?"dashboard.":"dashboards.",t=`${a.length} ${n}`;return 0===a.length?null:(0,P.jsxs)("div",{children:[(0,P.jsxs)("p",{className:s.textInfo,children:["This library panel can not be deleted because it is connected to ",(0,P.jsx)("strong",{children:t})," Remove the library panel from the dashboards listed below and retry."]}),(0,P.jsxs)("table",{className:s.myTable,children:[j||(j=(0,P.jsx)("thead",{children:(0,P.jsx)("tr",{children:(0,P.jsx)("th",{children:"Dashboard name"})})})),(0,P.jsx)("tbody",{children:a.map(((e,a)=>(0,P.jsx)("tr",{children:(0,P.jsx)("td",{children:e})},`dash-title-${a}`)))})]})]})};var k,C;const z=e=>{var a;let{libraryPanel:s,onClick:n,onDelete:i,showSecondaryActions:c}=e;const[d,p]=(0,t.useState)(!1),u=null!==(a=r.config.panels[s.model.type])&&void 0!==a?a:(0,o.X)(s.model.type).meta;return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(l.X,{isCurrent:!1,title:s.name,description:s.description,plugin:u,onClick:()=>null==n?void 0:n(s),onDelete:c?()=>p(!0):void 0,children:(0,P.jsx)($,{libraryPanel:s})}),d&&(0,P.jsx)(v,{libraryPanel:s,onConfirm:()=>{null==i||i(s),p(!1)},onDismiss:()=>p(!1)})]})};function $(e){let{libraryPanel:a}=e;const s=(0,i.useStyles2)(F);return a.meta.folderUid||a.meta.folderName?a.meta.folderUid?(0,P.jsx)("span",{className:s.metaContainer,children:(0,P.jsxs)(i.Link,{href:`/dashboards/f/${a.meta.folderUid}`,children:[C||(C=(0,P.jsx)(i.Icon,{name:"folder-upload",size:"sm"})),(0,P.jsx)("span",{children:a.meta.folderName})]})}):(0,P.jsxs)("span",{className:s.metaContainer,children:[k||(k=(0,P.jsx)(i.Icon,{name:"folder",size:"sm"})),(0,P.jsx)("span",{children:a.meta.folderName})]}):null}function F(e){return{metaContainer:n.css`
      display: flex;
      align-items: center;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      padding-top: ${e.spacing(.5)};

      svg {
        margin-right: ${e.spacing(.5)};
        margin-bottom: 3px;
      }
    `}}},"./public/app/features/library-panels/components/LibraryPanelsSearch/LibraryPanelsSearch.tsx":(e,a,s)=>{s.d(a,{N:()=>k,e:()=>_});var n,t=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),i=s("./packages/grafana-ui/src/index.ts"),o=s("./.yarn/cache/debounce-promise-npm-3.1.2-3c185da0c7-29bac4524c.zip/node_modules/debounce-promise/dist/index.js"),l=s.n(o),c=s("./public/app/core/services/backend_srv.ts"),d=s("./public/app/types/index.ts"),p=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function u(e){let{onChange:a,maxMenuHeight:s}=e;const t=(0,i.useStyles2)(m),[o,u]=(0,r.useState)(!1),g=(0,r.useCallback)((e=>async function(e,a){a(!0);const s={query:e,type:"dash-folder",permission:d.bf.View},n=(await(0,c.i)().search(s)).map((e=>({label:e.title,value:{id:e.id,title:e.title}})));e&&!"general".includes(e.toLowerCase())||n.unshift({label:"General",value:{id:0,title:"General"}});return a(!1),n}(e,u)),[]),b=(0,r.useMemo)((()=>l()(g,300)),[g]),[h,f]=(0,r.useState)([]),x=(0,r.useCallback)((e=>{const s=[];for(const a of e)a.value&&s.push(a.value);a(s),f(e)}),[a]),y={defaultOptions:!0,isMulti:!0,noOptionsMessage:"No folders found",placeholder:"Filter by folder",maxMenuHeight:s,value:h,onChange:x};return(0,p.jsxs)("div",{className:t.container,children:[h.length>0&&(0,p.jsx)(i.Button,{size:"xs",icon:"trash-alt",variant:"link",className:t.clear,onClick:()=>x([]),"aria-label":"Clear folders",children:"Clear folders"}),(0,p.jsx)(i.AsyncMultiSelect,Object.assign({menuShouldPortal:!0},y,{isLoading:o,loadOptions:b,prefix:n||(n=(0,p.jsx)(i.Icon,{name:"filter"})),"aria-label":"Folder filter"}))]})}function m(e){return{container:t.css`
      label: container;
      position: relative;
      min-width: 180px;
      flex-grow: 1;
    `,clear:t.css`
      label: clear;
      font-size: ${e.spacing(1.5)};
      position: absolute;
      top: -${e.spacing(4.5)};
      right: 0;
    `}}var g=s("./public/app/core/components/PanelTypeFilter/PanelTypeFilter.tsx"),b=s("./public/app/core/components/Select/SortPicker.tsx"),h=s("./public/app/core/constants.ts"),f=s("./public/app/features/library-panels/components/LibraryPanelsView/LibraryPanelsView.tsx"),x=s("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/0/cache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");const y={searchQuery:"",panelFilter:[],folderFilter:[],sortDirection:void 0},j=(0,x.PH)("libraryPanels/search/searchChanged"),P=(0,x.PH)("libraryPanels/search/sortChanged"),v=(0,x.PH)("libraryPanels/search/panelFilterChanged"),w=(0,x.PH)("libraryPanels/search/folderFilterChanged"),S=(e,a)=>j.match(a)?Object.assign({},e,{searchQuery:a.payload}):P.match(a)?Object.assign({},e,{sortDirection:a.payload.value}):v.match(a)?Object.assign({},e,{panelFilter:a.payload.map((e=>e.id))}):w.match(a)?Object.assign({},e,{folderFilter:a.payload.map((e=>String(e.id)))}):e;let _;!function(e){e.Tight="tight",e.Spacious="spacious"}(_||(_={}));const k=e=>{var a,s;let{onClick:n,variant:t=_.Spacious,currentPanelId:o,currentFolderId:l,perPage:c=h.gN,showPanelFilter:d=!1,showFolderFilter:m=!1,showSort:x=!1,showSecondaryActions:k=!1}=e;const z=(0,i.useStyles2)(C),[{sortDirection:$,panelFilter:F,folderFilter:N,searchQuery:L},O]=(0,r.useReducer)(S,Object.assign({},y,{folderFilter:l?[l.toString(10)]:[]})),D=e=>O(j(e)),T=e=>O(P(e)),I=e=>O(w(e)),M=e=>O(v(e));return t===_.Spacious?(0,p.jsx)("div",{className:z.container,children:(0,p.jsxs)(i.VerticalGroup,{spacing:"lg",children:[a||(a=(0,p.jsx)(i.FilterInput,{value:L,onChange:D,placeholder:"Search by name or description",width:0})),(0,p.jsx)("div",{className:z.buttonRow,children:(0,p.jsxs)(i.HorizontalGroup,{spacing:"sm",justify:x&&d||m?"space-between":"flex-end",children:[x&&(0,p.jsx)(b.P,{value:$,onChange:T,filter:["alpha-asc","alpha-desc"]}),(0,p.jsxs)(i.HorizontalGroup,{spacing:"sm",justify:m&&d?"space-between":"flex-end",children:[m&&(0,p.jsx)(u,{onChange:I}),d&&(0,p.jsx)(g.j,{onChange:M})]})]})}),(0,p.jsx)("div",{className:z.libraryPanelsView,children:s||(s=(0,p.jsx)(f.u,{onClickCard:n,searchString:L,sortDirection:$,panelFilter:F,folderFilter:N,currentPanelId:o,showSecondaryActions:k,perPage:c}))})]})}):(0,p.jsx)("div",{className:z.container,children:(0,p.jsxs)(i.VerticalGroup,{spacing:"xs",children:[(0,p.jsxs)("div",{className:z.tightButtonRow,children:[(0,p.jsx)("div",{className:z.tightFilter,children:(0,p.jsx)(i.FilterInput,{value:L,onChange:D,placeholder:"Search by name",width:0})}),(0,p.jsxs)("div",{className:z.tightSortFilter,children:[x&&(0,p.jsx)(b.P,{value:$,onChange:T}),m&&(0,p.jsx)(u,{onChange:I,maxMenuHeight:200}),d&&(0,p.jsx)(g.j,{onChange:M,maxMenuHeight:200})]})]}),(0,p.jsx)("div",{className:z.libraryPanelsView,children:(0,p.jsx)(f.u,{onClickCard:n,searchString:L,sortDirection:$,panelFilter:F,folderFilter:N,currentPanelId:o,showSecondaryActions:k,perPage:c})})]})})};function C(e){return{container:t.css`
      width: 100%;
      overflow-y: auto;
      padding: ${e.spacing(1)};
    `,buttonRow:t.css`
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: ${e.spacing(2)}; // Clear types link
    `,tightButtonRow:t.css`
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: ${e.spacing(4)}; // Clear types link
    `,tightFilter:t.css`
      flex-grow: 1;
    `,tightSortFilter:t.css`
      flex-grow: 1;
      padding: ${e.spacing(0,0,0,.5)};
    `,libraryPanelsView:t.css`
      width: 100%;
    `}}},"./public/app/features/library-panels/components/LibraryPanelsView/LibraryPanelsView.tsx":(e,a,s)=>{s.d(a,{u:()=>m});var n,t=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),i=s("./.yarn/__virtual__/react-use-virtual-00326e70ba/0/cache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useDebounce.js"),o=s("./packages/grafana-data/src/index.ts"),l=s("./packages/grafana-ui/src/index.ts"),c=s("./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx"),d=s("./public/app/features/library-panels/components/LibraryPanelsView/actions.ts"),p=s("./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts"),u=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const m=e=>{let{className:a,onClickCard:s,searchString:m,sortDirection:b,panelFilter:h,folderFilter:f,showSecondaryActions:x,currentPanelId:y,perPage:j=40}=e;const P=(0,l.useStyles)(g),[{libraryPanels:v,page:w,perPage:S,numberOfPages:_,loadingState:k,currentPanelId:C},z]=(0,r.useReducer)(p._p,Object.assign({},p.p$,{currentPanelId:y,perPage:j})),$=(0,r.useMemo)((()=>(0,d.tb)(z)),[z]);(0,i.Z)((()=>$((0,d.Xu)({searchString:m,sortDirection:b,panelFilter:h,folderFilter:f,page:w,perPage:S,currentPanelId:C}))),300,[m,b,h,f,w,$]);const F=e=>{let{uid:a}=e;return $((0,d.UO)(a,{searchString:m,page:w,perPage:S}))};return(0,u.jsxs)("div",{className:(0,t.cx)(P.container,a),children:[(0,u.jsx)("div",{className:P.libraryPanelList,children:k===o.LoadingState.Loading?n||(n=(0,u.jsx)("p",{children:"Loading library panels..."})):v.length<1?(0,u.jsx)("p",{className:P.noPanelsFound,children:"No library panels found."}):null==v?void 0:v.map(((e,a)=>(0,u.jsx)(c.p,{libraryPanel:e,onDelete:F,onClick:s,showSecondaryActions:x},`library-panel=${a}`)))}),v.length?(0,u.jsx)("div",{className:P.pagination,children:(0,u.jsx)(l.Pagination,{currentPage:w,numberOfPages:_,onNavigate:e=>$((0,p.oO)({page:e})),hideWhenSinglePage:!0})}):null]})},g=e=>({container:t.css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    `,libraryPanelList:t.css`
      max-width: 100%;
      display: grid;
      grid-gap: ${e.spacing.sm};
    `,searchHeader:t.css`
      display: flex;
    `,newPanelButton:t.css`
      margin-top: 10px;
      align-self: flex-start;
    `,pagination:t.css`
      align-self: center;
      margin-top: ${e.spacing.sm};
    `,noPanelsFound:t.css`
      label: noPanelsFound;
      min-height: 200px;
    `})},"./public/app/features/library-panels/components/LibraryPanelsView/actions.ts":(e,a,s)=>{s.d(a,{UO:()=>f,Xu:()=>h,tb:()=>x});var n=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/Subscription.js"),t=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/from.js"),r=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),i=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/merge.js"),o=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/timer.js"),l=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),c=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),d=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),p=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/share.js"),u=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),m=s("./.yarn/cache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),g=s("./public/app/features/library-panels/state/api.ts"),b=s("./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts");function h(e){return function(a){const s=new n.w0,h=(0,t.D)((0,g.Pq)({searchString:e.searchString,perPage:e.perPage,page:e.page,excludeUid:e.currentPanelId,sortDirection:e.sortDirection,typeFilter:e.panelFilter,folderFilter:e.folderFilter})).pipe((0,l.z)((e=>{let{perPage:a,elements:s,page:n,totalCount:t}=e;return(0,r.of)((0,b.zK)({libraryPanels:s,page:n,perPage:a,totalCount:t}))})),(0,c.K)((a=>(console.error(a),(0,r.of)((0,b.zK)(Object.assign({},b.p$,{page:e.page,perPage:e.perPage})))))),(0,d.x)((()=>s.unsubscribe())),(0,p.B)());s.add((0,i.T)((0,o.H)(50).pipe((0,u.h)((0,b.xU)()),(0,m.R)(h)),h).subscribe(a))}}function f(e,a){return async function(s){try{await(0,g.UO)(e),h(a)(s)}catch(e){console.error(e)}}}function x(e){return function(a){return a instanceof Function?a(e):e(a)}}},"./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts":(e,a,s)=>{s.d(a,{_p:()=>c,oO:()=>l,p$:()=>r,xU:()=>i,zK:()=>o});var n=s("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/0/cache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),t=s("./packages/grafana-data/src/index.ts");const r={loadingState:t.LoadingState.Loading,libraryPanels:[],totalCount:0,perPage:40,page:1,numberOfPages:0,currentPanelId:void 0},i=(0,n.PH)("libraryPanels/view/initSearch"),o=(0,n.PH)("libraryPanels/view/searchCompleted"),l=(0,n.PH)("libraryPanels/view/changePage"),c=(e,a)=>{if(i.match(a))return Object.assign({},e,{loadingState:t.LoadingState.Loading});if(o.match(a)){const{libraryPanels:s,page:n,perPage:r,totalCount:i}=a.payload,o=Math.ceil(i/r);return Object.assign({},e,{libraryPanels:s,perPage:r,totalCount:i,loadingState:t.LoadingState.Done,numberOfPages:o,page:n>o?n-1:n})}return l.match(a)?Object.assign({},e,{page:a.payload.page}):e}},"./public/app/features/library-panels/styles.ts":(e,a,s)=>{s.d(a,{J:()=>t});var n=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");function t(e){return{myTable:n.css`
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
    `,noteTextbox:n.css`
      margin-bottom: ${e.spacing.xl};
    `,textInfo:n.css`
      color: ${e.colors.textSemiWeak};
      font-size: ${e.typography.size.sm};
    `,dashboardSearch:n.css`
      margin-top: ${e.spacing.md};
    `,modal:n.css`
      width: 500px;
    `,modalText:n.css`
      font-size: ${e.typography.heading.h4};
      color: ${e.colors.link};
      margin-bottom: calc(${e.spacing.d} * 2);
      padding-top: ${e.spacing.d};
    `}}},"./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx":(e,a,s)=>{s.d(a,{X:()=>c});var n=s("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/0/cache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),t=(s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),s("./packages/grafana-data/src/index.ts")),r=s("./packages/grafana-e2e-selectors/src/index.ts"),i=s("./packages/grafana-ui/src/index.ts"),o=s("./public/app/features/plugins/components/PluginStateInfo.tsx"),l=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const c=e=>{let{isCurrent:a,title:s,plugin:o,onClick:c,onDelete:u,disabled:m,showBadge:g,description:b,children:h}=e;const f=(0,i.useStyles2)(d),x=(0,n.cx)({[f.item]:!0,[f.disabled]:m||o.state===t.PluginState.deprecated,[f.current]:a});return(0,l.jsxs)("div",{className:x,"aria-label":r.wl.components.PluginVisualization.item(o.name),onClick:m?void 0:c,title:a?"Click again to close this section":o.name,children:[(0,l.jsx)("img",{className:f.img,src:o.info.logos.small,alt:""}),(0,l.jsxs)("div",{className:f.itemContent,children:[(0,l.jsx)("div",{className:f.name,children:s}),b?(0,l.jsx)("span",{className:f.description,children:b}):null,h]}),g&&(0,l.jsx)("div",{className:(0,n.cx)(f.badge,m&&f.disabled),children:(0,l.jsx)(p,{plugin:o})}),u&&(0,l.jsx)(i.IconButton,{name:"trash-alt",onClick:e=>{e.stopPropagation(),u()},className:f.deleteButton,"aria-label":"Delete button on panel type card"})]})};c.displayName="PanelTypeCard";const d=e=>({item:n.css`
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
    `,itemContent:n.css`
      overflow: hidden;
      position: relative;
      padding: ${e.spacing(0,1)};
    `,current:n.css`
      label: currentVisualizationItem;
      border: 1px solid ${e.colors.primary.border};
      background: ${e.colors.action.selected};
    `,disabled:n.css`
      opacity: 0.2;
      filter: grayscale(1);
      cursor: default;
      pointer-events: none;
    `,name:n.css`
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: ${e.typography.size.sm};
      font-weight: ${e.typography.fontWeightMedium};
      width: 100%;
    `,description:n.css`
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      font-weight: ${e.typography.fontWeightLight};
      width: 100%;
      max-height: 4.5em;
    `,img:n.css`
      max-height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
    `,badge:n.css`
      background: ${e.colors.background.primary};
    `,deleteButton:n.css`
      margin-left: auto;
    `}),p=e=>{let{plugin:a}=e;return(0,t.isUnsignedPluginSignature)(a.signature)?(0,l.jsx)(i.PluginSignatureBadge,{status:a.signature}):(0,l.jsx)(o.u,{state:a.state})};p.displayName="PanelPluginBadge"},"./public/app/features/panel/state/util.ts":(e,a,s)=>{s.d(a,{r:()=>i,x:()=>r});var n=s("./packages/grafana-data/src/index.ts"),t=s("./public/app/core/config.ts");function r(){const e=t.vc.panels;return Object.keys(e).filter((a=>!1===e[a].hideFromList)).map((a=>e[a])).sort(((e,a)=>e.sort-a.sort))}function i(e,a,s){if(!a.length)return e.filter((e=>e.state!==n.PluginState.deprecated||s.id===e.id));const t=(0,n.unEscapeStringFromRegex)(a).toLowerCase(),r=[],i=[],o="graph".startsWith(t);for(const a of e){if(a.state===n.PluginState.deprecated&&s.id!==a.id)continue;const e=a.name.toLowerCase().indexOf(t);0===e?r.push(a):e>0?i.push(a):o&&"timeseries"===a.id&&r.push(a)}return r.concat(i)}},"./public/app/features/plugins/components/PluginStateInfo.tsx":(e,a,s)=>{s.d(a,{u:()=>i});s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var n=s("./packages/grafana-data/src/index.ts"),t=s("./packages/grafana-ui/src/index.ts"),r=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const i=e=>{const a=function(e){switch(e){case n.PluginState.deprecated:return{text:"Deprecated",color:"red",tooltip:"This feature is deprecated and will be removed in a future release"};case n.PluginState.alpha:return{text:"Alpha",color:"blue",tooltip:"This feature is experimental and future updates might not be backward compatible"};case n.PluginState.beta:return{text:"Beta",color:"blue",tooltip:"This feature is close to complete but not fully tested"};default:return null}}(e.state);return a?(0,r.jsx)(t.Badge,{color:a.color,title:a.tooltip,text:a.text,icon:a.icon}):null}}}]);
//# sourceMappingURL=7036.a87fd0ce1ff28bec28a3.js.map