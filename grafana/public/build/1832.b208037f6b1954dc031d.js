"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[1832],{"./public/app/core/components/PanelTypeFilter/PanelTypeFilter.tsx":(e,a,n)=>{n.d(a,{j:()=>c});var s,t=n("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),i=n("./packages/grafana-ui/src/index.ts"),o=n("./public/app/features/panel/state/util.ts"),l=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const c=e=>{let{onChange:a,maxMenuHeight:n}=e;const t=(0,r.useMemo)((()=>(0,o.x)()),[]),c=(0,r.useMemo)((()=>t.map((e=>({label:e.name,imgUrl:e.info.logos.small,value:e}))).sort(((e,a)=>{var n;return null===(n=e.label)||void 0===n?void 0:n.localeCompare(a.label)}))),[t]),[p,u]=(0,r.useState)([]),m=(0,r.useCallback)((e=>{const n=[];for(const a of e)a.value&&n.push(a.value);a(n),u(e)}),[a]),g=(0,i.useStyles2)(d),b={defaultOptions:!0,getOptionLabel:e=>e.label,getOptionValue:e=>e.value,noOptionsMessage:"No Panel types found",placeholder:"Filter by type",maxMenuHeight:n,options:c,value:p,onChange:m};return(0,l.jsxs)("div",{className:g.container,children:[p.length>0&&(0,l.jsx)(i.Button,{size:"xs",icon:"trash-alt",variant:"link",className:g.clear,onClick:()=>m([]),"aria-label":"Clear types",children:"Clear types"}),(0,l.jsx)(i.MultiSelect,Object.assign({menuShouldPortal:!0},b,{prefix:s||(s=(0,l.jsx)(i.Icon,{name:"filter"})),"aria-label":"Panel Type filter"}))]})};function d(e){return{container:t.css`
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
    `}}},"./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx":(e,a,n)=>{n.d(a,{p:()=>z});var s=n("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),t=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),r=n("./packages/grafana-runtime/src/index.ts"),i=n("./packages/grafana-ui/src/index.ts"),o=n("./public/app/features/panel/components/PanelPluginError.tsx"),l=n("./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx"),c=n("./packages/grafana-data/src/index.ts"),d=n("./public/app/features/library-panels/styles.ts"),p=n("./public/app/features/library-panels/components/LibraryPanelsView/actions.ts"),u=n("./public/app/features/library-panels/state/api.ts"),m=n("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/3/opt/drone/yarncache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");const g={loadingState:c.LoadingState.Loading,dashboardTitles:[]},b=(0,m.PH)("libraryPanels/delete/searchCompleted"),h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,a=arguments.length>1?arguments[1]:void 0;return b.match(a)?Object.assign({},e,{dashboardTitles:a.payload.dashboards.map((e=>e.title)),loadingState:c.LoadingState.Done}):e};var f,x,y,j,P=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const v=e=>{let{libraryPanel:a,onDismiss:n,onConfirm:s}=e;const r=(0,i.useStyles)(d.J),[{dashboardTitles:o,loadingState:l},m]=(0,t.useReducer)(h,g),y=(0,t.useMemo)((()=>(0,p.tb)(m)),[m]);(0,t.useEffect)((()=>{y(function(e){return async function(a){const n=await(0,u.E8)(e.uid);a(b({dashboards:n}))}}(a))}),[y,a]);const j=Boolean(o.length),v=l===c.LoadingState.Done;return(0,P.jsxs)(i.Modal,{className:r.modal,title:"Delete library panel",icon:"trash-alt",onDismiss:n,isOpen:!0,children:[v?null:f||(f=(0,P.jsx)(w,{})),v?(0,P.jsxs)("div",{children:[j?(0,P.jsx)(_,{dashboardTitles:o}):null,j?null:x||(x=(0,P.jsx)(S,{})),(0,P.jsxs)(i.Modal.ButtonRow,{children:[(0,P.jsx)(i.Button,{variant:"secondary",onClick:n,fill:"outline",children:"Cancel"}),(0,P.jsx)(i.Button,{variant:"destructive",onClick:s,disabled:j,children:"Delete"})]})]}):null]})},w=()=>y||(y=(0,P.jsx)("span",{children:"Loading library panel..."})),S=()=>{const e=(0,i.useStyles)(d.J);return(0,P.jsx)("div",{className:e.modalText,children:"Do you want to delete this panel?"})},_=e=>{let{dashboardTitles:a}=e;const n=(0,i.useStyles)(d.J),s=1===a.length?"dashboard.":"dashboards.",t=`${a.length} ${s}`;return 0===a.length?null:(0,P.jsxs)("div",{children:[(0,P.jsxs)("p",{className:n.textInfo,children:["This library panel can not be deleted because it is connected to ",(0,P.jsx)("strong",{children:t})," Remove the library panel from the dashboards listed below and retry."]}),(0,P.jsxs)("table",{className:n.myTable,children:[j||(j=(0,P.jsx)("thead",{children:(0,P.jsx)("tr",{children:(0,P.jsx)("th",{children:"Dashboard name"})})})),(0,P.jsx)("tbody",{children:a.map(((e,a)=>(0,P.jsx)("tr",{children:(0,P.jsx)("td",{children:e})},`dash-title-${a}`)))})]})]})};var k,C;const z=e=>{var a;let{libraryPanel:n,onClick:s,onDelete:i,showSecondaryActions:c}=e;const[d,p]=(0,t.useState)(!1),u=null!==(a=r.config.panels[n.model.type])&&void 0!==a?a:(0,o.X)(n.model.type).meta;return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(l.X,{isCurrent:!1,title:n.name,description:n.description,plugin:u,onClick:()=>null==s?void 0:s(n),onDelete:c?()=>p(!0):void 0,children:(0,P.jsx)($,{libraryPanel:n})}),d&&(0,P.jsx)(v,{libraryPanel:n,onConfirm:()=>{null==i||i(n),p(!1)},onDismiss:()=>p(!1)})]})};function $(e){let{libraryPanel:a}=e;const n=(0,i.useStyles2)(F);return a.meta.folderUid||a.meta.folderName?a.meta.folderUid?(0,P.jsx)("span",{className:n.metaContainer,children:(0,P.jsxs)(i.Link,{href:`/dashboards/f/${a.meta.folderUid}`,children:[C||(C=(0,P.jsx)(i.Icon,{name:"folder-upload",size:"sm"})),(0,P.jsx)("span",{children:a.meta.folderName})]})}):(0,P.jsxs)("span",{className:n.metaContainer,children:[k||(k=(0,P.jsx)(i.Icon,{name:"folder",size:"sm"})),(0,P.jsx)("span",{children:a.meta.folderName})]}):null}function F(e){return{metaContainer:s.css`
      display: flex;
      align-items: center;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      padding-top: ${e.spacing(.5)};

      svg {
        margin-right: ${e.spacing(.5)};
        margin-bottom: 3px;
      }
    `}}},"./public/app/features/library-panels/components/LibraryPanelsSearch/LibraryPanelsSearch.tsx":(e,a,n)=>{n.d(a,{N:()=>k,e:()=>_});var s,t=n("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),i=n("./packages/grafana-ui/src/index.ts"),o=n("../../opt/drone/yarncache/debounce-promise-npm-3.1.2-3c185da0c7-29bac4524c.zip/node_modules/debounce-promise/dist/index.js"),l=n.n(o),c=n("./public/app/core/services/backend_srv.ts"),d=n("./public/app/types/index.ts"),p=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function u(e){let{onChange:a,maxMenuHeight:n}=e;const t=(0,i.useStyles2)(m),[o,u]=(0,r.useState)(!1),g=(0,r.useCallback)((e=>async function(e,a){a(!0);const n={query:e,type:"dash-folder",permission:d.bf.View},s=(await(0,c.i)().search(n)).map((e=>({label:e.title,value:{id:e.id,title:e.title}})));e&&!"general".includes(e.toLowerCase())||s.unshift({label:"General",value:{id:0,title:"General"}});return a(!1),s}(e,u)),[]),b=(0,r.useMemo)((()=>l()(g,300)),[g]),[h,f]=(0,r.useState)([]),x=(0,r.useCallback)((e=>{const n=[];for(const a of e)a.value&&n.push(a.value);a(n),f(e)}),[a]),y={defaultOptions:!0,isMulti:!0,noOptionsMessage:"No folders found",placeholder:"Filter by folder",maxMenuHeight:n,value:h,onChange:x};return(0,p.jsxs)("div",{className:t.container,children:[h.length>0&&(0,p.jsx)(i.Button,{size:"xs",icon:"trash-alt",variant:"link",className:t.clear,onClick:()=>x([]),"aria-label":"Clear folders",children:"Clear folders"}),(0,p.jsx)(i.AsyncMultiSelect,Object.assign({menuShouldPortal:!0},y,{isLoading:o,loadOptions:b,prefix:s||(s=(0,p.jsx)(i.Icon,{name:"filter"})),"aria-label":"Folder filter"}))]})}function m(e){return{container:t.css`
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
    `}}var g=n("./public/app/core/components/PanelTypeFilter/PanelTypeFilter.tsx"),b=n("./public/app/core/components/Select/SortPicker.tsx"),h=n("./public/app/core/constants.ts"),f=n("./public/app/features/library-panels/components/LibraryPanelsView/LibraryPanelsView.tsx"),x=n("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/3/opt/drone/yarncache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");const y={searchQuery:"",panelFilter:[],folderFilter:[],sortDirection:void 0},j=(0,x.PH)("libraryPanels/search/searchChanged"),P=(0,x.PH)("libraryPanels/search/sortChanged"),v=(0,x.PH)("libraryPanels/search/panelFilterChanged"),w=(0,x.PH)("libraryPanels/search/folderFilterChanged"),S=(e,a)=>j.match(a)?Object.assign({},e,{searchQuery:a.payload}):P.match(a)?Object.assign({},e,{sortDirection:a.payload.value}):v.match(a)?Object.assign({},e,{panelFilter:a.payload.map((e=>e.id))}):w.match(a)?Object.assign({},e,{folderFilter:a.payload.map((e=>String(e.id)))}):e;let _;!function(e){e.Tight="tight",e.Spacious="spacious"}(_||(_={}));const k=e=>{var a,n;let{onClick:s,variant:t=_.Spacious,currentPanelId:o,currentFolderId:l,perPage:c=h.gN,showPanelFilter:d=!1,showFolderFilter:m=!1,showSort:x=!1,showSecondaryActions:k=!1}=e;const z=(0,i.useStyles2)(C),[{sortDirection:$,panelFilter:F,folderFilter:N,searchQuery:L},O]=(0,r.useReducer)(S,Object.assign({},y,{folderFilter:l?[l.toString(10)]:[]})),D=e=>O(j(e)),T=e=>O(P(e)),I=e=>O(w(e)),M=e=>O(v(e));return t===_.Spacious?(0,p.jsx)("div",{className:z.container,children:(0,p.jsxs)(i.VerticalGroup,{spacing:"lg",children:[a||(a=(0,p.jsx)(i.FilterInput,{value:L,onChange:D,placeholder:"Search by name or description",width:0})),(0,p.jsx)("div",{className:z.buttonRow,children:(0,p.jsxs)(i.HorizontalGroup,{spacing:"sm",justify:x&&d||m?"space-between":"flex-end",children:[x&&(0,p.jsx)(b.P,{value:$,onChange:T,filter:["alpha-asc","alpha-desc"]}),(0,p.jsxs)(i.HorizontalGroup,{spacing:"sm",justify:m&&d?"space-between":"flex-end",children:[m&&(0,p.jsx)(u,{onChange:I}),d&&(0,p.jsx)(g.j,{onChange:M})]})]})}),(0,p.jsx)("div",{className:z.libraryPanelsView,children:n||(n=(0,p.jsx)(f.u,{onClickCard:s,searchString:L,sortDirection:$,panelFilter:F,folderFilter:N,currentPanelId:o,showSecondaryActions:k,perPage:c}))})]})}):(0,p.jsx)("div",{className:z.container,children:(0,p.jsxs)(i.VerticalGroup,{spacing:"xs",children:[(0,p.jsxs)("div",{className:z.tightButtonRow,children:[(0,p.jsx)("div",{className:z.tightFilter,children:(0,p.jsx)(i.FilterInput,{value:L,onChange:D,placeholder:"Search by name",width:0})}),(0,p.jsxs)("div",{className:z.tightSortFilter,children:[x&&(0,p.jsx)(b.P,{value:$,onChange:T}),m&&(0,p.jsx)(u,{onChange:I,maxMenuHeight:200}),d&&(0,p.jsx)(g.j,{onChange:M,maxMenuHeight:200})]})]}),(0,p.jsx)("div",{className:z.libraryPanelsView,children:(0,p.jsx)(f.u,{onClickCard:s,searchString:L,sortDirection:$,panelFilter:F,folderFilter:N,currentPanelId:o,showSecondaryActions:k,perPage:c})})]})})};function C(e){return{container:t.css`
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
    `}}},"./public/app/features/library-panels/components/LibraryPanelsView/LibraryPanelsView.tsx":(e,a,n)=>{n.d(a,{u:()=>m});var s,t=n("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),r=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),i=n("./.yarn/__virtual__/react-use-virtual-00326e70ba/3/opt/drone/yarncache/react-use-npm-17.3.2-a032cbeb01-7379460f51.zip/node_modules/react-use/esm/useDebounce.js"),o=n("./packages/grafana-data/src/index.ts"),l=n("./packages/grafana-ui/src/index.ts"),c=n("./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx"),d=n("./public/app/features/library-panels/components/LibraryPanelsView/actions.ts"),p=n("./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts"),u=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const m=e=>{let{className:a,onClickCard:n,searchString:m,sortDirection:b,panelFilter:h,folderFilter:f,showSecondaryActions:x,currentPanelId:y,perPage:j=40}=e;const P=(0,l.useStyles)(g),[{libraryPanels:v,page:w,perPage:S,numberOfPages:_,loadingState:k,currentPanelId:C},z]=(0,r.useReducer)(p._p,Object.assign({},p.p$,{currentPanelId:y,perPage:j})),$=(0,r.useMemo)((()=>(0,d.tb)(z)),[z]);(0,i.Z)((()=>$((0,d.Xu)({searchString:m,sortDirection:b,panelFilter:h,folderFilter:f,page:w,perPage:S,currentPanelId:C}))),300,[m,b,h,f,w,$]);const F=e=>{let{uid:a}=e;return $((0,d.UO)(a,{searchString:m,page:w,perPage:S}))};return(0,u.jsxs)("div",{className:(0,t.cx)(P.container,a),children:[(0,u.jsx)("div",{className:P.libraryPanelList,children:k===o.LoadingState.Loading?s||(s=(0,u.jsx)("p",{children:"Loading library panels..."})):v.length<1?(0,u.jsx)("p",{className:P.noPanelsFound,children:"No library panels found."}):null==v?void 0:v.map(((e,a)=>(0,u.jsx)(c.p,{libraryPanel:e,onDelete:F,onClick:n,showSecondaryActions:x},`library-panel=${a}`)))}),v.length?(0,u.jsx)("div",{className:P.pagination,children:(0,u.jsx)(l.Pagination,{currentPage:w,numberOfPages:_,onNavigate:e=>$((0,p.oO)({page:e})),hideWhenSinglePage:!0})}):null]})},g=e=>({container:t.css`
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
    `})},"./public/app/features/library-panels/components/LibraryPanelsView/actions.ts":(e,a,n)=>{n.d(a,{UO:()=>f,Xu:()=>h,tb:()=>x});var s=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/Subscription.js"),t=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/from.js"),r=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),i=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/merge.js"),o=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/timer.js"),l=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),c=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),d=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),p=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/share.js"),u=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),m=n("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),g=n("./public/app/features/library-panels/state/api.ts"),b=n("./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts");function h(e){return function(a){const n=new s.w0,h=(0,t.D)((0,g.Pq)({searchString:e.searchString,perPage:e.perPage,page:e.page,excludeUid:e.currentPanelId,sortDirection:e.sortDirection,typeFilter:e.panelFilter,folderFilter:e.folderFilter})).pipe((0,l.z)((e=>{let{perPage:a,elements:n,page:s,totalCount:t}=e;return(0,r.of)((0,b.zK)({libraryPanels:n,page:s,perPage:a,totalCount:t}))})),(0,c.K)((a=>(console.error(a),(0,r.of)((0,b.zK)(Object.assign({},b.p$,{page:e.page,perPage:e.perPage})))))),(0,d.x)((()=>n.unsubscribe())),(0,p.B)());n.add((0,i.T)((0,o.H)(50).pipe((0,u.h)((0,b.xU)()),(0,m.R)(h)),h).subscribe(a))}}function f(e,a){return async function(n){try{await(0,g.UO)(e),h(a)(n)}catch(e){console.error(e)}}}function x(e){return function(a){return a instanceof Function?a(e):e(a)}}},"./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts":(e,a,n)=>{n.d(a,{_p:()=>c,oO:()=>l,p$:()=>r,xU:()=>i,zK:()=>o});var s=n("./.yarn/__virtual__/@reduxjs-toolkit-virtual-7692db070f/3/opt/drone/yarncache/@reduxjs-toolkit-npm-1.7.2-7ced4ba4dc-41c17c660f.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),t=n("./packages/grafana-data/src/index.ts");const r={loadingState:t.LoadingState.Loading,libraryPanels:[],totalCount:0,perPage:40,page:1,numberOfPages:0,currentPanelId:void 0},i=(0,s.PH)("libraryPanels/view/initSearch"),o=(0,s.PH)("libraryPanels/view/searchCompleted"),l=(0,s.PH)("libraryPanels/view/changePage"),c=(e,a)=>{if(i.match(a))return Object.assign({},e,{loadingState:t.LoadingState.Loading});if(o.match(a)){const{libraryPanels:n,page:s,perPage:r,totalCount:i}=a.payload,o=Math.ceil(i/r);return Object.assign({},e,{libraryPanels:n,perPage:r,totalCount:i,loadingState:t.LoadingState.Done,numberOfPages:o,page:s>o?s-1:s})}return l.match(a)?Object.assign({},e,{page:a.payload.page}):e}},"./public/app/features/library-panels/styles.ts":(e,a,n)=>{n.d(a,{J:()=>t});var s=n("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");function t(e){return{myTable:s.css`
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
    `,noteTextbox:s.css`
      margin-bottom: ${e.spacing.xl};
    `,textInfo:s.css`
      color: ${e.colors.textSemiWeak};
      font-size: ${e.typography.size.sm};
    `,dashboardSearch:s.css`
      margin-top: ${e.spacing.md};
    `,modal:s.css`
      width: 500px;
    `,modalText:s.css`
      font-size: ${e.typography.heading.h4};
      color: ${e.colors.link};
      margin-bottom: calc(${e.spacing.d} * 2);
      padding-top: ${e.spacing.d};
    `}}},"./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx":(e,a,n)=>{n.d(a,{X:()=>c});var s=n("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),t=(n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),n("./packages/grafana-data/src/index.ts")),r=n("./packages/grafana-e2e-selectors/src/index.ts"),i=n("./packages/grafana-ui/src/index.ts"),o=n("./public/app/features/plugins/components/PluginStateInfo.tsx"),l=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const c=e=>{let{isCurrent:a,title:n,plugin:o,onClick:c,onDelete:u,disabled:m,showBadge:g,description:b,children:h}=e;const f=(0,i.useStyles2)(d),x=(0,s.cx)({[f.item]:!0,[f.disabled]:m||o.state===t.PluginState.deprecated,[f.current]:a});return(0,l.jsxs)("div",{className:x,"aria-label":r.wl.components.PluginVisualization.item(o.name),onClick:m?void 0:c,title:a?"Click again to close this section":o.name,children:[(0,l.jsx)("img",{className:f.img,src:o.info.logos.small,alt:""}),(0,l.jsxs)("div",{className:f.itemContent,children:[(0,l.jsx)("div",{className:f.name,children:n}),b?(0,l.jsx)("span",{className:f.description,children:b}):null,h]}),g&&(0,l.jsx)("div",{className:(0,s.cx)(f.badge,m&&f.disabled),children:(0,l.jsx)(p,{plugin:o})}),u&&(0,l.jsx)(i.IconButton,{name:"trash-alt",onClick:e=>{e.stopPropagation(),u()},className:f.deleteButton,"aria-label":"Delete button on panel type card"})]})};c.displayName="PanelTypeCard";const d=e=>({item:s.css`
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
    `,itemContent:s.css`
      overflow: hidden;
      position: relative;
      padding: ${e.spacing(0,1)};
    `,current:s.css`
      label: currentVisualizationItem;
      border: 1px solid ${e.colors.primary.border};
      background: ${e.colors.action.selected};
    `,disabled:s.css`
      opacity: 0.2;
      filter: grayscale(1);
      cursor: default;
      pointer-events: none;
    `,name:s.css`
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: ${e.typography.size.sm};
      font-weight: ${e.typography.fontWeightMedium};
      width: 100%;
    `,description:s.css`
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      font-weight: ${e.typography.fontWeightLight};
      width: 100%;
      max-height: 4.5em;
    `,img:s.css`
      max-height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
    `,badge:s.css`
      background: ${e.colors.background.primary};
    `,deleteButton:s.css`
      margin-left: auto;
    `}),p=e=>{let{plugin:a}=e;return(0,t.isUnsignedPluginSignature)(a.signature)?(0,l.jsx)(i.PluginSignatureBadge,{status:a.signature}):(0,l.jsx)(o.u,{state:a.state})};p.displayName="PanelPluginBadge"},"./public/app/features/panel/state/util.ts":(e,a,n)=>{n.d(a,{r:()=>i,x:()=>r});var s=n("./packages/grafana-data/src/index.ts"),t=n("./public/app/core/config.ts");function r(){const e=t.vc.panels;return Object.keys(e).filter((a=>!1===e[a].hideFromList)).map((a=>e[a])).sort(((e,a)=>e.sort-a.sort))}function i(e,a,n){if(!a.length)return e.filter((e=>e.state!==s.PluginState.deprecated||n.id===e.id));const t=(0,s.unEscapeStringFromRegex)(a).toLowerCase(),r=[],i=[],o="graph".startsWith(t);for(const a of e){if(a.state===s.PluginState.deprecated&&n.id!==a.id)continue;const e=a.name.toLowerCase().indexOf(t);0===e?r.push(a):e>0?i.push(a):o&&"timeseries"===a.id&&r.push(a)}return r.concat(i)}},"./public/app/features/plugins/components/PluginStateInfo.tsx":(e,a,n)=>{n.d(a,{u:()=>i});n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var s=n("./packages/grafana-data/src/index.ts"),t=n("./packages/grafana-ui/src/index.ts"),r=n("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const i=e=>{const a=function(e){switch(e){case s.PluginState.deprecated:return{text:"Deprecated",color:"red",tooltip:"This feature is deprecated and will be removed in a future release"};case s.PluginState.alpha:return{text:"Alpha",color:"blue",tooltip:"This feature is experimental and future updates might not be backward compatible"};case s.PluginState.beta:return{text:"Beta",color:"blue",tooltip:"This feature is close to complete but not fully tested"};default:return null}}(e.state);return a?(0,r.jsx)(t.Badge,{color:a.color,title:a.tooltip,text:a.text,icon:a.icon}):null}}}]);
//# sourceMappingURL=1832.b208037f6b1954dc031d.js.map