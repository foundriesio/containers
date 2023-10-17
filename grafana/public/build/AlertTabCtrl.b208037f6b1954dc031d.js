"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[5718],{"./public/app/angular/core_module.ts":(e,t,a)=>{a.d(t,{ZP:()=>o,hF:()=>s,rb:()=>n});var i=a("../../opt/drone/yarncache/angular-npm-1.8.2-307000482b-35ea81a23b.zip/node_modules/angular/index.js"),r=a.n(i);const s=r().module("grafana.core",["ngRoute"]),n=[s,r().module("grafana.controllers",[]),r().module("grafana.directives",[]),r().module("grafana.factories",[]),r().module("grafana.services",[]),r().module("grafana.filters",[]),r().module("grafana.routes",[])],o=s},"./public/app/angular/promiseToDigest.ts":(e,t,a)=>{a.d(t,{E:()=>i});const i=e=>t=>t.finally(e.$evalAsync)},"./public/app/features/alerting/AlertTabCtrl.ts":(e,t,a)=>{a.r(t),a.d(t,{AlertTabCtrl:()=>m,alertTab:()=>b});var i=a("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),r=a("./packages/grafana-data/src/index.ts"),s=a("./packages/grafana-runtime/src/index.ts"),n=a("./public/app/angular/core_module.ts"),o=a("./public/app/angular/promiseToDigest.ts"),l=a("./public/app/core/app_events.ts"),d=a("./public/app/core/config.ts"),h=a("./public/app/features/alerting/state/query_part.ts"),c=a("./public/app/types/index.ts"),u=a("./public/app/types/events.ts"),p=a("./public/app/features/alerting/getAlertingValidationMessage.ts"),f=a("./public/app/features/alerting/state/ThresholdMapper.ts"),v=a("./public/app/features/alerting/state/alertDef.ts");function g(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class m{constructor(e,t,a,i){g(this,"panel",void 0),g(this,"panelCtrl",void 0),g(this,"subTabIndex",void 0),g(this,"conditionTypes",void 0),g(this,"alert",void 0),g(this,"conditionModels",void 0),g(this,"evalFunctions",void 0),g(this,"evalOperators",void 0),g(this,"noDataModes",void 0),g(this,"executionErrorModes",void 0),g(this,"addNotificationSegment",void 0),g(this,"notifications",void 0),g(this,"alertNotifications",void 0),g(this,"error",void 0),g(this,"appSubUrl",void 0),g(this,"alertHistory",void 0),g(this,"newAlertRuleTag",void 0),g(this,"alertingMinIntervalSecs",void 0),g(this,"alertingMinInterval",void 0),g(this,"frequencyWarning",void 0),g(this,"enable",(()=>{this.panel.alert={},this.initModel(),this.panel.alert.for="5m"})),this.$scope=e,this.dashboardSrv=t,this.uiSegmentSrv=a,this.datasourceSrv=i,this.$scope=e,this.dashboardSrv=t,this.uiSegmentSrv=a,this.datasourceSrv=i,this.panelCtrl=e.ctrl,this.panel=this.panelCtrl.panel,this.$scope.ctrl=this,this.subTabIndex=0,this.evalFunctions=v.Z.evalFunctions,this.evalOperators=v.Z.evalOperators,this.conditionTypes=v.Z.conditionTypes,this.noDataModes=v.Z.noDataModes,this.executionErrorModes=v.Z.executionErrorModes,this.appSubUrl=d.ZP.appSubUrl,this.panelCtrl._enableAlert=this.enable,this.alertingMinIntervalSecs=d.ZP.alertingMinInterval,this.alertingMinInterval=r.rangeUtil.secondsToHms(d.ZP.alertingMinInterval)}$onInit(){this.addNotificationSegment=this.uiSegmentSrv.newPlusButton();const e=this.graphThresholdChanged.bind(this);return this.panelCtrl.events.on(c.RW.GL,e),this.$scope.$on("$destroy",(()=>{this.panelCtrl.events.off(c.RW.GL,e),this.panelCtrl.editingThresholds=!1,this.panelCtrl.render()})),this.notifications=[],this.alertNotifications=[],this.alertHistory=[],(0,o.E)(this.$scope)((0,s.getBackendSrv)().get("/api/alert-notifications/lookup").then((e=>{this.notifications=e,this.initModel(),this.validateModel()})))}getAlertHistory(){(0,o.E)(this.$scope)((0,s.getBackendSrv)().get(`/api/annotations?dashboardId=${this.panelCtrl.dashboard.id}&panelId=${this.panel.id}&limit=50&type=alert`).then((e=>{this.alertHistory=(0,i.map)(e,(e=>{var t;return e.time=null===(t=this.dashboardSrv.getCurrent())||void 0===t?void 0:t.formatDate(e.time,"MMM D, YYYY HH:mm:ss"),e.stateModel=v.Z.getStateDisplayModel(e.newState),e.info=v.Z.getAlertAnnotationInfo(e),e}))})))}getNotificationIcon(e){switch(e){case"email":return"envelope";case"slack":return"slack";case"victorops":return"fa fa-pagelines";case"webhook":return"cube";case"pagerduty":return"fa fa-bullhorn";case"opsgenie":return"bell";case"hipchat":return"fa fa-mail-forward";case"pushover":return"mobile-android";case"kafka":return"arrow-random";case"teams":return"fa fa-windows"}return"bell"}getNotifications(){return Promise.resolve(this.notifications.map((e=>this.uiSegmentSrv.newSegment(e.name))))}notificationAdded(){const e=(0,i.find)(this.notifications,{name:this.addNotificationSegment.value});e&&(this.alertNotifications.push({name:e.name,iconClass:this.getNotificationIcon(e.type),isDefault:!1,uid:e.uid}),(0,i.find)(this.alert.notifications,(t=>t.id===e.id||t.uid===e.uid))||this.alert.notifications.push({uid:e.uid}),this.addNotificationSegment.value=this.uiSegmentSrv.newPlusButton().value,this.addNotificationSegment.html=this.uiSegmentSrv.newPlusButton().html,this.addNotificationSegment.fake=!0)}removeNotification(e){(0,i.remove)(this.alert.notifications,(t=>t.uid===e.uid||t.id===e.id)),(0,i.remove)(this.alertNotifications,(t=>t.uid===e.uid||t.id===e.id))}addAlertRuleTag(){this.newAlertRuleTag.name&&(this.alert.alertRuleTags[this.newAlertRuleTag.name]=this.newAlertRuleTag.value),this.newAlertRuleTag.name="",this.newAlertRuleTag.value=""}removeAlertRuleTag(e){delete this.alert.alertRuleTags[e]}initModel(){const e=this.alert=this.panel.alert;if(!e)return;this.checkFrequency(),e.conditions=e.conditions||[],0===e.conditions.length&&e.conditions.push((0,p.z)()),e.noDataState=e.noDataState||d.ZP.alertingNoDataOrNullValues,e.executionErrorState=e.executionErrorState||d.ZP.alertingErrorOrTimeout,e.frequency=e.frequency||"1m",e.handler=e.handler||1,e.notifications=e.notifications||[],e.for=e.for||"0m",e.alertRuleTags=e.alertRuleTags||{};const t=this.panel.title+" alert";e.name=e.name||t,this.conditionModels=(0,i.reduce)(e.conditions,((e,t)=>(e.push(this.buildConditionModel(t)),e)),[]),f.X.alertToGraphThresholds(this.panel);for(const t of e.notifications){let e=t.uid,a=(0,i.find)(this.notifications,{uid:e});!a&&t.id&&(e=t.id,a=(0,i.find)(this.notifications,{id:e})),a||l.Z.publish(new u.VJ({title:"Notifier with invalid identifier is detected",text:`Do you want to delete notifier with invalid identifier: ${e} from the dashboard JSON?`,text2:"After successful deletion, make sure to save the dashboard for storing the update JSON.",icon:"trash-alt",confirmText:"Delete",yesText:"Delete",onConfirm:async()=>{this.removeNotification(t)}})),a&&!1===a.isDefault&&(a.iconClass=this.getNotificationIcon(a.type),this.alertNotifications.push(a))}for(const e of this.notifications)e.isDefault&&(e.iconClass=this.getNotificationIcon(e.type),this.alertNotifications.push(e));this.panelCtrl.editingThresholds=!0,this.panelCtrl.render()}checkFrequency(){if(this.frequencyWarning="",this.alert.frequency)if(this.alert.frequency.match(/^\d+([dhms])$/))try{r.rangeUtil.intervalToSeconds(this.alert.frequency)<this.alertingMinIntervalSecs&&(this.frequencyWarning="A minimum evaluation interval of "+this.alertingMinInterval+" have been configured in Grafana and will be used for this alert rule. Please contact the administrator to configure a lower interval.")}catch(e){this.frequencyWarning=e}else this.frequencyWarning='Invalid frequency, has to be numeric followed by one of the following units: "d, h, m, s"'}graphThresholdChanged(e){for(const t of this.alert.conditions)if("query"===t.type){t.evaluator.params[e.handleIndex]=e.threshold.value,this.evaluatorParamsChanged();break}}validateModel(){if(!this.alert)return;let e,t=null;const a=[];for(const i of this.alert.conditions){if("query"!==i.type)continue;for(const a of this.panel.targets)if(e||(e=a),i.query.params[0]===a.refId){t=a;break}if(!t){if(!e)return void(this.error="Could not find any metric queries");i.query.params[0]=e.refId,t=e}const r=t.datasource||this.panel.datasource;a.push(this.datasourceSrv.get(r).then((e=>t=>t.meta.alerting?t.targetContainsTemplate&&t.targetContainsTemplate(e)?Promise.reject("Template variables are not supported in alert queries"):Promise.resolve():Promise.reject("The datasource does not support alerting queries"))(t)))}Promise.all(a).then((()=>{this.error="",this.$scope.$apply()}),(e=>{this.error=e,this.$scope.$apply()}))}buildConditionModel(e){const t={source:e,type:e.type};return t.queryPart=new h.XN(e.query,v.Z.alertQueryDef),t.reducerPart=v.Z.createReducerPart(e.reducer),t.evaluator=e.evaluator,t.operator=e.operator,t}handleQueryPartEvent(e,t){switch(t.name){case"action-remove-part":break;case"get-part-actions":return Promise.resolve([]);case"part-param-changed":this.validateModel();case"get-param-options":{const e=this.panel.targets.map((e=>this.uiSegmentSrv.newSegment({value:e.refId})));return Promise.resolve(e)}default:return Promise.resolve()}return Promise.resolve()}handleReducerPartEvent(e,t){switch(t.name){case"action":e.source.reducer.type=t.action.value,e.reducerPart=v.Z.createReducerPart(e.source.reducer),this.evaluatorParamsChanged();break;case"get-part-actions":{const t=[];for(const a of v.Z.reducerTypes)a.value!==e.source.reducer.type&&t.push(a);return Promise.resolve(t)}}return Promise.resolve()}addCondition(e){const t=(0,p.z)();this.alert.conditions.push(t),this.conditionModels.push(this.buildConditionModel(t))}removeCondition(e){this.alert.conditions.splice(e,1),this.conditionModels.splice(e,1)}delete(){l.Z.publish(new u.VJ({title:"Delete Alert",text:"Are you sure you want to delete this alert rule?",text2:"You need to save dashboard for the delete to take effect",icon:"trash-alt",yesText:"Delete",onConfirm:()=>{delete this.panel.alert,this.alert=null,this.panel.thresholds=[],this.conditionModels=[],this.panelCtrl.alertState=null,this.panelCtrl.render()}}))}evaluatorParamsChanged(){f.X.alertToGraphThresholds(this.panel),this.panelCtrl.render()}evaluatorTypeChanged(e){switch(e.type){case"lt":case"gt":e.params=[e.params[0]];break;case"within_range":case"outside_range":e.params=[e.params[0],e.params[1]];break;case"no_value":e.params=[]}this.evaluatorParamsChanged()}clearHistory(){l.Z.publish(new u.VJ({title:"Delete Alert History",text:"Are you sure you want to remove all history & annotations for this alert?",icon:"trash-alt",yesText:"Yes",onConfirm:()=>{(0,o.E)(this.$scope)((0,s.getBackendSrv)().post("/api/annotations/mass-delete",{dashboardId:this.panelCtrl.dashboard.id,panelId:this.panel.id}).then((()=>{this.alertHistory=[],this.panelCtrl.refresh()})))}}))}}function b(){return{restrict:"E",scope:!0,templateUrl:"public/app/features/alerting/partials/alert_tab.html",controller:m}}m.$inject=["$scope","dashboardSrv","uiSegmentSrv","datasourceSrv"],n.ZP.directive("alertTab",b)},"./public/app/features/alerting/state/ThresholdMapper.ts":(e,t,a)=>{a.d(t,{X:()=>s});var i=a("./public/app/core/config.ts");const r=["percent_diff","percent_diff_abs"];class s{static alertToGraphThresholds(e){if(!e.alert||i.vc.unifiedAlertingEnabled)return!1;for(let a=0;a<e.alert.conditions.length;a++){var t;const i=e.alert.conditions[a];if("query"!==i.type)continue;const s=i.evaluator,n=e.thresholds=[],o=-1===r.indexOf(null===(t=i.reducer)||void 0===t?void 0:t.type);switch(s.type){case"gt":{const e=s.params[0];n.push({value:e,op:"gt",visible:o});break}case"lt":{const e=s.params[0];n.push({value:e,op:"lt",visible:o});break}case"outside_range":{const e=s.params[0],t=s.params[1];e>t?(n.push({value:e,op:"gt",visible:o}),n.push({value:t,op:"lt",visible:o})):(n.push({value:e,op:"lt",visible:o}),n.push({value:t,op:"gt",visible:o}));break}case"within_range":{const e=s.params[0],t=s.params[1];e>t?(n.push({value:e,op:"lt",visible:o}),n.push({value:t,op:"gt",visible:o})):(n.push({value:e,op:"gt",visible:o}),n.push({value:t,op:"lt",visible:o}));break}}break}for(const t of e.thresholds)t.fill=e.options.alertThreshold,t.line=e.options.alertThreshold,t.colorMode="critical";return!0}}}}]);
//# sourceMappingURL=AlertTabCtrl.b208037f6b1954dc031d.js.map