"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[4827],{"./public/app/features/folders/FolderSettingsPage.tsx":(e,t,s)=>{s.r(t),s.d(t,{FolderSettingsPage:()=>j,default:()=>y});var a,r,n=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),o=s("./.yarn/__virtual__/react-redux-virtual-7ad20a440e/0/cache/react-redux-npm-7.2.6-134f5ed64d-0bf142ce0d.zip/node_modules/react-redux/es/index.js"),i=s("./packages/grafana-ui/src/index.ts"),l=s("./public/app/core/app_events.ts"),d=s("./public/app/core/components/Page/Page.tsx"),c=s("./public/app/core/selectors/navModel.ts"),p=s("./public/app/types/events.ts"),u=s("./public/app/features/folders/state/actions.ts"),h=s("./public/app/features/folders/state/navModel.ts"),f=s("./public/app/features/folders/state/reducers.ts"),g=s("./.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");function m(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const{Input:b}=i.LegacyForms,v={getFolderByUid:u.Pb,saveFolder:u.OD,setFolderTitle:f.Ss,deleteFolder:u.Go},x=(0,o.connect)(((e,t)=>{const s=t.match.params.uid;return{navModel:(0,c.h)(e.navIndex,`folder-settings-${s}`,(0,h._)(2)),folderUid:s,folder:e.folder}}),v);class j extends n.PureComponent{constructor(e){super(e),m(this,"onTitleChange",(e=>{this.props.setFolderTitle(e.target.value)})),m(this,"onSave",(async e=>{e.preventDefault(),e.stopPropagation(),this.setState({isLoading:!0}),await this.props.saveFolder(this.props.folder),this.setState({isLoading:!1})})),m(this,"onDelete",(e=>{e.stopPropagation(),e.preventDefault();l.Z.publish(new p.VJ({title:"Delete",text:"Do you want to delete this folder and all its dashboards and alerts?",icon:"trash-alt",yesText:"Delete",onConfirm:()=>{this.props.deleteFolder(this.props.folder.uid)}}))})),this.state={isLoading:!1}}componentDidMount(){this.props.getFolderByUid(this.props.folderUid)}render(){const{navModel:e,folder:t}=this.props;return(0,g.jsx)(d.Z,{navModel:e,children:(0,g.jsxs)(d.Z.Contents,{isLoading:this.state.isLoading,children:[a||(a=(0,g.jsx)("h3",{className:"page-sub-heading",children:"Folder settings"})),(0,g.jsx)("div",{className:"section gf-form-group",children:(0,g.jsxs)("form",{name:"folderSettingsForm",onSubmit:this.onSave,children:[(0,g.jsxs)("div",{className:"gf-form",children:[r||(r=(0,g.jsx)("label",{className:"gf-form-label width-7",children:"Name"})),(0,g.jsx)(b,{type:"text",className:"gf-form-input width-30",value:t.title,onChange:this.onTitleChange})]}),(0,g.jsxs)("div",{className:"gf-form-button-row",children:[(0,g.jsx)(i.Button,{type:"submit",disabled:!t.canSave||!t.hasChanged,children:"Save"}),(0,g.jsx)(i.Button,{variant:"destructive",onClick:this.onDelete,disabled:!t.canDelete,children:"Delete"})]})]})})]})})}}const y=x(j)}}]);
//# sourceMappingURL=FolderSettingsPage.a87fd0ce1ff28bec28a3.js.map