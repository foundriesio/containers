"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2001],{"./public/app/plugins/datasource/mixed/module.ts":(e,r,s)=>{s.r(r),s.d(r,{Datasource:()=>g,MixedDatasource:()=>g});var a=s("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),t=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),o=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/from.js"),n=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js"),d=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),c=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js"),i=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/toArray.js"),p=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),u=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js"),l=s("../../opt/drone/yarncache/rxjs-npm-7.5.5-d0546b1ccb-e034f60805.zip/node_modules/rxjs/dist/esm5/internal/operators/reduce.js"),m=s("./packages/grafana-data/src/index.ts"),b=s("./packages/grafana-runtime/src/index.ts");class g extends m.DataSourceApi{constructor(e){super(e)}query(e){const r=e.targets.filter((e=>{var r;return"-- Mixed --"!==(null===(r=e.datasource)||void 0===r?void 0:r.uid)}));if(!r.length)return(0,t.of)({data:[]});const s=(0,a.groupBy)(r,"datasource.uid"),o=[];for(const r in s){const a=s[r];o.push({datasource:(0,b.getDataSourceSrv)().get(a[0].datasource,e.scopedVars),targets:a})}return o.length?this.batchQueries(o,e):(0,t.of)({data:[]})}batchQueries(e,r){const s=e.filter(this.isQueryable).map(((e,s)=>(0,o.D)(e.datasource).pipe((0,d.z)((n=>{const d=(0,a.cloneDeep)(r);return d.requestId=`mixed-${s}-${d.requestId||""}`,d.targets=e.targets,(0,o.D)(n.query(d)).pipe((0,c.U)((e=>Object.assign({},e,{data:e.data||[],state:m.LoadingState.Loading,key:`mixed-${s}-${e.key||""}`}))),(0,i.q)(),(0,p.K)((e=>((e=(0,b.toDataQueryError)(e)).message=`${n.name}: ${e.message}`,(0,t.of)([{data:[],state:m.LoadingState.Error,error:e,key:`mixed-${s}-${d.requestId||""}`}])))))})))));return(0,n.D)(s).pipe((0,l.u)(((e,r)=>r.reduce(((e,r)=>(e.push.apply(e,r),e)),e)),[]),(0,c.U)(this.finalizeResponses),(0,u.J)())}testDatasource(){return Promise.resolve({})}isQueryable(e){return e&&Array.isArray(e.targets)&&e.targets.length>0}finalizeResponses(e){const{length:r}=e;if(0===r)return e;const s=e.find((e=>e.state===m.LoadingState.Error));return s?e.push(s):e[r-1].state=m.LoadingState.Done,e}}}}]);
//# sourceMappingURL=mixedPlugin.b208037f6b1954dc031d.js.map