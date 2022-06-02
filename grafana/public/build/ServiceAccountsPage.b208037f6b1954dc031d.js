"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[1337],{"./public/app/features/serviceaccounts/ServiceAccountsListPage.tsx":(e,s,t)=>{t.r(s),t.d(s,{default:()=>D,getStyles:()=>O});var n,i=t("./.yarn/__virtual__/@emotion-css-virtual-72c314ddb1/3/opt/drone/yarncache/@emotion-css-npm-11.7.1-25ff8755a7-ac1f56656f.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),a=t("../../opt/drone/yarncache/pluralize-npm-8.0.0-f5f044ed52-08931d4a6a.zip/node_modules/pluralize/pluralize.js"),c=t.n(a),o=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),r=t("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/3/opt/drone/yarncache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),l=t("./packages/grafana-ui/src/index.ts"),d=t("./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx"),u=t("./public/app/core/components/Page/Page.tsx"),p=t("./public/app/core/components/PageLoader/PageLoader.tsx"),m=t("./public/app/core/core.ts"),h=t("./public/app/core/selectors/navModel.ts"),x=t("./public/app/types/index.ts"),v=t("./public/app/core/components/RolePicker/UserRolePicker.tsx"),b=t("./public/app/features/admin/OrgRolePicker.tsx"),g=t("../../opt/drone/yarncache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const j=e=>`Edit service account's ${e} details`,f=e=>e?"Disabled":"Enabled",k=(0,o.memo)((e=>{let{serviceAccount:s,onRoleChange:t,roleOptions:a,builtInRoles:c,onSetToRemove:o}=e;const r=`org/serviceaccounts/${s.id}`,d=(0,l.useStyles2)(O),u=m.Vt.hasPermissionInMetadata(x.bW.ServiceAccountsWrite,s),p=m.Vt.hasPermission(x.bW.ActionRolesList)&&m.Vt.hasPermission(x.bW.ActionUserRolesList),h=m.Vt.hasPermission(x.bW.OrgUsersRoleUpdate)&&u;return(0,g.jsxs)("tr",{children:[(0,g.jsx)("td",{className:"width-4 text-center link-td",children:(0,g.jsx)("a",{href:r,"aria-label":j(s.name),children:(0,g.jsx)("img",{className:"filter-table__avatar",src:s.avatarUrl,alt:`Avatar for user ${s.name}`})})}),(0,g.jsx)("td",{className:"link-td max-width-10",children:(0,g.jsx)("a",{className:"ellipsis",href:r,title:s.name,"aria-label":j(s.name),children:s.name})}),(0,g.jsx)("td",{className:"link-td max-width-10",children:(0,g.jsx)("a",{className:"ellipsis",href:r,title:s.login,"aria-label":j(s.name),children:s.login})}),m.Vt.licensedAccessControlEnabled()?(0,g.jsx)("td",{className:(0,i.cx)("link-td",d.iconRow),children:p&&(0,g.jsx)(v.R,{userId:s.id,orgId:s.orgId,builtInRole:s.role,onBuiltinRoleChange:e=>t(e,s),roleOptions:a,builtInRoles:c,disabled:!h})}):(0,g.jsx)("td",{className:(0,i.cx)("link-td",d.iconRow),children:(0,g.jsx)(b.A,{"aria-label":"Role",value:s.role,disabled:!u,onChange:e=>t(e,s)})}),(0,g.jsx)("td",{className:"link-td max-width-10",children:(0,g.jsx)("a",{className:"ellipsis",href:r,title:f(s.isDisabled),"aria-label":j(s.name),children:f(s.isDisabled)})}),(0,g.jsx)("td",{className:"link-td max-width-10",children:(0,g.jsxs)("a",{className:"ellipsis",href:r,title:"Tokens","aria-label":j(s.name),children:[n||(n=(0,g.jsx)("span",{children:(0,g.jsx)(l.Icon,{name:"key-skeleton-alt"})}))," ",s.tokens]})}),m.Vt.hasPermissionInMetadata(x.bW.ServiceAccountsDelete,s)&&(0,g.jsx)("td",{children:(0,g.jsx)(l.Button,{size:"sm",variant:"destructive",onClick:()=>{o(s)},icon:"times","aria-label":"Delete service account"})})]},s.id)}));k.displayName="ServiceAccountListItem";const A=k;var y,R,S,C,T,I,N,P,_,L=t("./public/app/features/serviceaccounts/state/actions.ts");const w={fetchServiceAccounts:L.Xd,fetchACOptions:L.bX,updateServiceAccount:L.TL,removeServiceAccount:L.IR,setServiceAccountToRemove:L.cl,changeFilter:L.M6,changeQuery:L.R5},$=(0,r.connect)((function(e){return Object.assign({navModel:(0,h.h)(e.navIndex,"serviceaccounts")},e.serviceAccounts)}),w),O=e=>({table:i.css`
      margin-top: ${e.spacing(3)};
    `,filter:i.css`
      margin: 0 ${e.spacing(1)};
    `,iconRow:i.css`
      svg {
        margin-left: ${e.spacing(.5)};
      }
    `,row:i.css`
      display: flex;
      align-items: center;
      height: 100% !important;

      a {
        padding: ${e.spacing(.5)} 0 !important;
      }
    `,unitTooltip:i.css`
      display: flex;
      flex-direction: column;
    `,unitItem:i.css`
      cursor: pointer;
      padding: ${e.spacing(.5)} 0;
      margin-right: ${e.spacing(1)};
    `,disabled:i.css`
      color: ${e.colors.text.disabled};
    `,link:i.css`
      color: inherit;
      cursor: pointer;
      text-decoration: underline;
    `}),D=$((e=>{var s;let{fetchServiceAccounts:t,removeServiceAccount:n,fetchACOptions:a,updateServiceAccount:r,setServiceAccountToRemove:h,navModel:v,serviceAccounts:b,isLoading:j,roleOptions:f,builtInRoles:k,changeFilter:L,changeQuery:w,query:$,filters:D,serviceAccountToRemove:z}=e;const V=(0,l.useStyles2)(O);(0,o.useEffect)((()=>{t(),m.Vt.licensedAccessControlEnabled()&&a()}),[t,a]);const E=(e,s)=>{const t=Object.assign({},s,{role:e});r(t)};return(0,g.jsx)(u.Z,{navModel:v,children:(0,g.jsxs)(u.Z.Contents,{children:[y||(y=(0,g.jsx)("h2",{children:"Service accounts"})),(0,g.jsxs)("div",{className:"page-action-bar",style:{justifyContent:"flex-end"},children:[(0,g.jsx)(l.FilterInput,{placeholder:"Search service account by name.",autoFocus:!0,value:$,onChange:w}),(0,g.jsx)(l.RadioButtonGroup,{options:[{label:"All service accounts",value:!1},{label:"Expired tokens",value:!0}],onChange:e=>L({name:"expiredTokens",value:e}),value:null===(s=D.find((e=>"expiredTokens"===e.name)))||void 0===s?void 0:s.value,className:V.filter}),0!==b.length&&m.Vt.hasPermission(x.bW.ServiceAccountsCreate)&&(R||(R=(0,g.jsx)(l.LinkButton,{href:"org/serviceaccounts/create",variant:"primary",children:"Add service account"})))]}),j&&(S||(S=(0,g.jsx)(p.Z,{}))),!j&&0===b.length&&(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(d.Z,{title:"You haven't created any service accounts yet.",buttonIcon:"key-skeleton-alt",buttonLink:"org/serviceaccounts/create",buttonTitle:"Add service account",buttonDisabled:!m.Vt.hasPermission(x.bW.ServiceAccountsCreate),proTip:"Remember, you can provide specific permissions for API access to other applications.",proTipLink:"",proTipLinkTitle:"",proTipTarget:"_blank"})}),!j&&0!==b.length&&(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("div",{className:(0,i.cx)(V.table,"admin-list-table"),children:(0,g.jsxs)("table",{className:"filter-table form-inline filter-table--hover",children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{children:[C||(C=(0,g.jsx)("th",{})),T||(T=(0,g.jsx)("th",{children:"Account"})),I||(I=(0,g.jsx)("th",{children:"ID"})),N||(N=(0,g.jsx)("th",{children:"Roles"})),P||(P=(0,g.jsx)("th",{children:"Status"})),_||(_=(0,g.jsx)("th",{children:"Tokens"})),(0,g.jsx)("th",{style:{width:"34px"}})]})}),(0,g.jsx)("tbody",{children:b.map((e=>(0,g.jsx)(A,{serviceAccount:e,builtInRoles:k,roleOptions:f,onRoleChange:E,onSetToRemove:h},e.id)))})]})})}),z&&(0,g.jsx)(l.ConfirmModal,{body:(0,g.jsxs)("div",{children:["Are you sure you want to delete '",z.name,"'",Boolean(z.tokens)&&` and ${z.tokens} accompanying ${c()("token",z.tokens)}`,"?"]}),confirmText:"Delete",title:"Delete service account",onDismiss:()=>{h(null)},isOpen:!0,onConfirm:()=>{n(z.id),h(null)}})]})})}))}}]);
//# sourceMappingURL=ServiceAccountsPage.b208037f6b1954dc031d.js.map