(()=>{"use strict";var t={value:()=>{}};function n(){for(var t,n=0,e=arguments.length,i={};n<e;++n){if(!(t=arguments[n]+"")||t in i||/[\s.]/.test(t))throw new Error("illegal type: "+t);i[t]=[]}return new r(i)}function r(t){this._=t}function e(t,n){return t.trim().split(/^|\s+/).map((function(t){var r="",e=t.indexOf(".");if(e>=0&&(r=t.slice(e+1),t=t.slice(0,e)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:r}}))}function i(t,n){for(var r,e=0,i=t.length;e<i;++e)if((r=t[e]).name===n)return r.value}function o(n,r,e){for(var i=0,o=n.length;i<o;++i)if(n[i].name===r){n[i]=t,n=n.slice(0,i).concat(n.slice(i+1));break}return null!=e&&n.push({name:r,value:e}),n}r.prototype=n.prototype={constructor:r,on:function(t,n){var r,u=this._,a=e(t+"",u),f=-1,s=a.length;if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++f<s;)if(r=(t=a[f]).type)u[r]=o(u[r],t.name,n);else if(null==n)for(r in u)u[r]=o(u[r],t.name,null);return this}for(;++f<s;)if((r=(t=a[f]).type)&&(r=i(u[r],t.name)))return r},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new r(t)},call:function(t,n){if((r=arguments.length-2)>0)for(var r,e,i=new Array(r),o=0;o<r;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=0,r=(e=this._[t]).length;o<r;++o)e[o].value.apply(n,i)},apply:function(t,n,r){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var e=this._[t],i=0,o=e.length;i<o;++i)e[i].value.apply(n,r)}};const u=n;var a,f,s=0,l=0,h=0,c=0,y=0,x=0,v="object"==typeof performance&&performance.now?performance:Date,_="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function g(){return y||(_(p),y=v.now()+x)}function p(){y=0}function d(){this._call=this._time=this._next=null}function w(t,n,r){var e=new d;return e.restart(t,n,r),e}function m(){y=(c=v.now())+x,s=l=0;try{!function(){g(),++s;for(var t,n=a;n;)(t=y-n._time)>=0&&n._call.call(null,t),n=n._next;--s}()}finally{s=0,function(){var t,n,r=a,e=1/0;for(;r;)r._call?(e>r._time&&(e=r._time),t=r,r=r._next):(n=r._next,r._next=null,r=t?t._next=n:a=n);f=t,A(e)}(),y=0}}function N(){var t=v.now(),n=t-c;n>1e3&&(x-=n,c=t)}function A(t){s||(l&&(l=clearTimeout(l)),t-y>24?(t<1/0&&(l=setTimeout(m,t-v.now()-x)),h&&(h=clearInterval(h))):(h||(c=v.now(),h=setInterval(N,1e3)),s=1,_(m)))}d.prototype=w.prototype={constructor:d,restart:function(t,n,r){if("function"!=typeof t)throw new TypeError("callback is not a function");r=(null==r?g():+r)+(null==n?0:+n),this._next||f===this||(f?f._next=this:a=this,f=this),this._call=t,this._time=r,A()},stop:function(){this._call&&(this._call=null,this._time=1/0,A())}};const k=4294967296;var b=Math.PI*(3-Math.sqrt(5));function M(t){var n,r=1,e=.001,i=1-Math.pow(e,1/300),o=0,a=.6,f=new Map,s=w(c),l=u("tick","end"),h=function(){let t=1;return()=>(t=(1664525*t+1013904223)%k)/k}();function c(){y(),l.call("tick",n),r<e&&(s.stop(),l.call("end",n))}function y(e){var u,s,l=t.length;void 0===e&&(e=1);for(var h=0;h<e;++h)for(r+=(o-r)*i,f.forEach((function(t){t(r)})),u=0;u<l;++u)null==(s=t[u]).fx?s.x+=s.vx*=a:(s.x=s.fx,s.vx=0),null==s.fy?s.y+=s.vy*=a:(s.y=s.fy,s.vy=0);return n}function x(){for(var n,r=0,e=t.length;r<e;++r){if((n=t[r]).index=r,null!=n.fx&&(n.x=n.fx),null!=n.fy&&(n.y=n.fy),isNaN(n.x)||isNaN(n.y)){var i=10*Math.sqrt(.5+r),o=r*b;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}function v(n){return n.initialize&&n.initialize(t,h),n}return null==t&&(t=[]),x(),n={tick:y,restart:function(){return s.restart(c),n},stop:function(){return s.stop(),n},nodes:function(r){return arguments.length?(t=r,x(),f.forEach(v),n):t},alpha:function(t){return arguments.length?(r=+t,n):r},alphaMin:function(t){return arguments.length?(e=+t,n):e},alphaDecay:function(t){return arguments.length?(i=+t,n):+i},alphaTarget:function(t){return arguments.length?(o=+t,n):o},velocityDecay:function(t){return arguments.length?(a=1-t,n):1-a},randomSource:function(t){return arguments.length?(h=t,f.forEach(v),n):h},force:function(t,r){return arguments.length>1?(null==r?f.delete(t):f.set(t,v(r)),n):f.get(t)},find:function(n,r,e){var i,o,u,a,f,s=0,l=t.length;for(null==e?e=1/0:e*=e,s=0;s<l;++s)(u=(i=n-(a=t[s]).x)*i+(o=r-a.y)*o)<e&&(f=a,e=u);return f},on:function(t,r){return arguments.length>1?(l.on(t,r),n):l.on(t)}}}function E(t){return function(){return t}}function q(t){return 1e-6*(t()-.5)}function z(t){return t.index}function T(t,n){var r=t.get(n);if(!r)throw new Error("node not found: "+n);return r}function j(t,n,r,e){if(isNaN(n)||isNaN(r))return t;var i,o,u,a,f,s,l,h,c,y=t._root,x={data:e},v=t._x0,_=t._y0,g=t._x1,p=t._y1;if(!y)return t._root=x,t;for(;y.length;)if((s=n>=(o=(v+g)/2))?v=o:g=o,(l=r>=(u=(_+p)/2))?_=u:p=u,i=y,!(y=y[h=l<<1|s]))return i[h]=x,t;if(a=+t._x.call(null,y.data),f=+t._y.call(null,y.data),n===a&&r===f)return x.next=y,i?i[h]=x:t._root=x,t;do{i=i?i[h]=new Array(4):t._root=new Array(4),(s=n>=(o=(v+g)/2))?v=o:g=o,(l=r>=(u=(_+p)/2))?_=u:p=u}while((h=l<<1|s)==(c=(f>=u)<<1|a>=o));return i[c]=y,i[h]=x,t}function D(t,n,r,e,i){this.node=t,this.x0=n,this.y0=r,this.x1=e,this.y1=i}function O(t){return t[0]}function P(t){return t[1]}function I(t,n,r){var e=new L(null==n?O:n,null==r?P:r,NaN,NaN,NaN,NaN);return null==t?e:e.addAll(t)}function L(t,n,r,e,i,o){this._x=t,this._y=n,this._x0=r,this._y0=e,this._x1=i,this._y1=o,this._root=void 0}function S(t){for(var n={data:t.data},r=n;t=t.next;)r=r.next={data:t.data};return n}var F=I.prototype=L.prototype;function R(t){return t.x+t.vx}function X(t){return t.y+t.vy}F.copy=function(){var t,n,r=new L(this._x,this._y,this._x0,this._y0,this._x1,this._y1),e=this._root;if(!e)return r;if(!e.length)return r._root=S(e),r;for(t=[{source:e,target:r._root=new Array(4)}];e=t.pop();)for(var i=0;i<4;++i)(n=e.source[i])&&(n.length?t.push({source:n,target:e.target[i]=new Array(4)}):e.target[i]=S(n));return r},F.add=function(t){const n=+this._x.call(null,t),r=+this._y.call(null,t);return j(this.cover(n,r),n,r,t)},F.addAll=function(t){var n,r,e,i,o=t.length,u=new Array(o),a=new Array(o),f=1/0,s=1/0,l=-1/0,h=-1/0;for(r=0;r<o;++r)isNaN(e=+this._x.call(null,n=t[r]))||isNaN(i=+this._y.call(null,n))||(u[r]=e,a[r]=i,e<f&&(f=e),e>l&&(l=e),i<s&&(s=i),i>h&&(h=i));if(f>l||s>h)return this;for(this.cover(f,s).cover(l,h),r=0;r<o;++r)j(this,u[r],a[r],t[r]);return this},F.cover=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var r=this._x0,e=this._y0,i=this._x1,o=this._y1;if(isNaN(r))i=(r=Math.floor(t))+1,o=(e=Math.floor(n))+1;else{for(var u,a,f=i-r||1,s=this._root;r>t||t>=i||e>n||n>=o;)switch(a=(n<e)<<1|t<r,(u=new Array(4))[a]=s,s=u,f*=2,a){case 0:i=r+f,o=e+f;break;case 1:r=i-f,o=e+f;break;case 2:i=r+f,e=o-f;break;case 3:r=i-f,e=o-f}this._root&&this._root.length&&(this._root=s)}return this._x0=r,this._y0=e,this._x1=i,this._y1=o,this},F.data=function(){var t=[];return this.visit((function(n){if(!n.length)do{t.push(n.data)}while(n=n.next)})),t},F.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},F.find=function(t,n,r){var e,i,o,u,a,f,s,l=this._x0,h=this._y0,c=this._x1,y=this._y1,x=[],v=this._root;for(v&&x.push(new D(v,l,h,c,y)),null==r?r=1/0:(l=t-r,h=n-r,c=t+r,y=n+r,r*=r);f=x.pop();)if(!(!(v=f.node)||(i=f.x0)>c||(o=f.y0)>y||(u=f.x1)<l||(a=f.y1)<h))if(v.length){var _=(i+u)/2,g=(o+a)/2;x.push(new D(v[3],_,g,u,a),new D(v[2],i,g,_,a),new D(v[1],_,o,u,g),new D(v[0],i,o,_,g)),(s=(n>=g)<<1|t>=_)&&(f=x[x.length-1],x[x.length-1]=x[x.length-1-s],x[x.length-1-s]=f)}else{var p=t-+this._x.call(null,v.data),d=n-+this._y.call(null,v.data),w=p*p+d*d;if(w<r){var m=Math.sqrt(r=w);l=t-m,h=n-m,c=t+m,y=n+m,e=v.data}}return e},F.remove=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(u=+this._y.call(null,t)))return this;var n,r,e,i,o,u,a,f,s,l,h,c,y=this._root,x=this._x0,v=this._y0,_=this._x1,g=this._y1;if(!y)return this;if(y.length)for(;;){if((s=o>=(a=(x+_)/2))?x=a:_=a,(l=u>=(f=(v+g)/2))?v=f:g=f,n=y,!(y=y[h=l<<1|s]))return this;if(!y.length)break;(n[h+1&3]||n[h+2&3]||n[h+3&3])&&(r=n,c=h)}for(;y.data!==t;)if(e=y,!(y=y.next))return this;return(i=y.next)&&delete y.next,e?(i?e.next=i:delete e.next,this):n?(i?n[h]=i:delete n[h],(y=n[0]||n[1]||n[2]||n[3])&&y===(n[3]||n[2]||n[1]||n[0])&&!y.length&&(r?r[c]=y:this._root=y),this):(this._root=i,this)},F.removeAll=function(t){for(var n=0,r=t.length;n<r;++n)this.remove(t[n]);return this},F.root=function(){return this._root},F.size=function(){var t=0;return this.visit((function(n){if(!n.length)do{++t}while(n=n.next)})),t},F.visit=function(t){var n,r,e,i,o,u,a=[],f=this._root;for(f&&a.push(new D(f,this._x0,this._y0,this._x1,this._y1));n=a.pop();)if(!t(f=n.node,e=n.x0,i=n.y0,o=n.x1,u=n.y1)&&f.length){var s=(e+o)/2,l=(i+u)/2;(r=f[3])&&a.push(new D(r,s,l,o,u)),(r=f[2])&&a.push(new D(r,e,l,s,u)),(r=f[1])&&a.push(new D(r,s,i,o,l)),(r=f[0])&&a.push(new D(r,e,i,s,l))}return this},F.visitAfter=function(t){var n,r=[],e=[];for(this._root&&r.push(new D(this._root,this._x0,this._y0,this._x1,this._y1));n=r.pop();){var i=n.node;if(i.length){var o,u=n.x0,a=n.y0,f=n.x1,s=n.y1,l=(u+f)/2,h=(a+s)/2;(o=i[0])&&r.push(new D(o,u,a,l,h)),(o=i[1])&&r.push(new D(o,l,a,f,h)),(o=i[2])&&r.push(new D(o,u,h,l,s)),(o=i[3])&&r.push(new D(o,l,h,f,s))}e.push(n)}for(;n=e.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this},F.x=function(t){return arguments.length?(this._x=t,this):this._x},F.y=function(t){return arguments.length?(this._y=t,this):this._y},addEventListener("message",(t=>{const{nodes:n,edges:r,config:e}=t.data;!function(t,n,r){let{roots:e,secondLevelRoots:i}=function(t,n){const r={},e=t.reduce(((t,n)=>(t[n.id]=n,t)),{}),i=n.reduce(((t,n)=>{const r=n.source;return t[r]=[...t[r]||[],n],t}),{});let o=t.filter((t=>0===t.incoming));o.length||(o=[t[0]]);let u=o.reduce(((t,n)=>(t.push(...i[n.id]?i[n.id].map((t=>e[t.target])):[]),t)),[]);const a=300,f=200,s=200;let l=0;for(const t of o){let n=[t],o=0;for(;n.length>0;){const t=[];let u=l;for(const a of n)r[a.id]||(a.x=o,a.y=u,r[a.id]=!0,u+=f,i[a.id]&&t.push(...i[a.id].map((t=>e[t.target]))));n=t,o+=s,u=l}l+=a}return{roots:o,secondLevelRoots:u}}(t,n);[...e,...i].forEach(((t,n)=>{t.fx=t.x}));const o=M(t).force("link",function(t){var n,r,e,i,o,u,a=z,f=function(t){return 1/Math.min(i[t.source.index],i[t.target.index])},s=E(30),l=1;function h(e){for(var i=0,a=t.length;i<l;++i)for(var f,s,h,c,y,x,v,_=0;_<a;++_)s=(f=t[_]).source,c=(h=f.target).x+h.vx-s.x-s.vx||q(u),y=h.y+h.vy-s.y-s.vy||q(u),c*=x=((x=Math.sqrt(c*c+y*y))-r[_])/x*e*n[_],y*=x,h.vx-=c*(v=o[_]),h.vy-=y*v,s.vx+=c*(v=1-v),s.vy+=y*v}function c(){if(e){var u,f,s=e.length,l=t.length,h=new Map(e.map(((t,n)=>[a(t,n,e),t])));for(u=0,i=new Array(s);u<l;++u)(f=t[u]).index=u,"object"!=typeof f.source&&(f.source=T(h,f.source)),"object"!=typeof f.target&&(f.target=T(h,f.target)),i[f.source.index]=(i[f.source.index]||0)+1,i[f.target.index]=(i[f.target.index]||0)+1;for(u=0,o=new Array(l);u<l;++u)f=t[u],o[u]=i[f.source.index]/(i[f.source.index]+i[f.target.index]);n=new Array(l),y(),r=new Array(l),x()}}function y(){if(e)for(var r=0,i=t.length;r<i;++r)n[r]=+f(t[r],r,t)}function x(){if(e)for(var n=0,i=t.length;n<i;++n)r[n]=+s(t[n],n,t)}return null==t&&(t=[]),h.initialize=function(t,n){e=t,u=n,c()},h.links=function(n){return arguments.length?(t=n,c(),h):t},h.id=function(t){return arguments.length?(a=t,h):a},h.iterations=function(t){return arguments.length?(l=+t,h):l},h.strength=function(t){return arguments.length?(f="function"==typeof t?t:E(+t),y(),h):f},h.distance=function(t){return arguments.length?(s="function"==typeof t?t:E(+t),x(),h):s},h}(n).id((t=>t.id)).distance(r.linkDistance).strength(r.linkStrength)).force("x",function(t){var n,r,e,i=E(.1);function o(t){for(var i,o=0,u=n.length;o<u;++o)(i=n[o]).vx+=(e[o]-i.x)*r[o]*t}function u(){if(n){var o,u=n.length;for(r=new Array(u),e=new Array(u),o=0;o<u;++o)r[o]=isNaN(e[o]=+t(n[o],o,n))?0:+i(n[o],o,n)}}return"function"!=typeof t&&(t=E(null==t?0:+t)),o.initialize=function(t){n=t,u()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:E(+t),u(),o):i},o.x=function(n){return arguments.length?(t="function"==typeof n?n:E(+n),u(),o):t},o}(r.forceX).strength(r.forceXStrength)).force("collide",function(t){var n,r,e,i=1,o=1;function u(){for(var t,u,f,s,l,h,c,y=n.length,x=0;x<o;++x)for(u=I(n,R,X).visitAfter(a),t=0;t<y;++t)f=n[t],h=r[f.index],c=h*h,s=f.x+f.vx,l=f.y+f.vy,u.visit(v);function v(t,n,r,o,u){var a=t.data,y=t.r,x=h+y;if(!a)return n>s+x||o<s-x||r>l+x||u<l-x;if(a.index>f.index){var v=s-a.x-a.vx,_=l-a.y-a.vy,g=v*v+_*_;g<x*x&&(0===v&&(g+=(v=q(e))*v),0===_&&(g+=(_=q(e))*_),g=(x-(g=Math.sqrt(g)))/g*i,f.vx+=(v*=g)*(x=(y*=y)/(c+y)),f.vy+=(_*=g)*x,a.vx-=v*(x=1-x),a.vy-=_*x)}}}function a(t){if(t.data)return t.r=r[t.data.index];for(var n=t.r=0;n<4;++n)t[n]&&t[n].r>t.r&&(t.r=t[n].r)}function f(){if(n){var e,i,o=n.length;for(r=new Array(o),e=0;e<o;++e)i=n[e],r[i.index]=+t(i,e,n)}}return"function"!=typeof t&&(t=E(null==t?1:+t)),u.initialize=function(t,r){n=t,e=r,f()},u.iterations=function(t){return arguments.length?(o=+t,u):o},u.strength=function(t){return arguments.length?(i=+t,u):i},u.radius=function(n){return arguments.length?(t="function"==typeof n?n:E(+n),f(),u):t},u}(r.forceCollide));o.tick(r.tick),o.stop(),function(t){const n=function(t){if(0===t.length)return{top:0,right:0,bottom:0,left:0,center:{x:0,y:0}};const n=t.reduce(((t,n)=>(n.x>t.right&&(t.right=n.x),n.x<t.left&&(t.left=n.x),n.y>t.bottom&&(t.bottom=n.y),n.y<t.top&&(t.top=n.y),t)),{top:1/0,right:-1/0,bottom:-1/0,left:1/0}),r=n.top+(n.bottom-n.top)/2,e=n.left+(n.right-n.left)/2;return{...n,center:{x:e,y:r}}}(t);for(let r of t)r.x=r.x-n.center.x,r.y=r.y-n.center.y}(t)}(n,r,e),postMessage({nodes:n,edges:r})}))})();
//# sourceMappingURL=7190.b208037f6b1954dc031d.js.map