!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3-selection"),require("d3-dispatch"),require("d3-transition"),require("d3-timer"),require("d3-interpolate"),require("d3-zoom"),require("viz.js"),require("d3-format")):"function"==typeof define&&define.amd?define(["exports","d3-selection","d3-dispatch","d3-transition","d3-timer","d3-interpolate","d3-zoom","viz.js","d3-format"],e):e(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.d3,t.d3,t.Viz,t.d3)}(this,function(t,e,n,i,r,a,o,s,l){"use strict";function h(){var t=this._selection,n=e.select(t.node().querySelector("svg"));if(0==n.size())return this;this._zoomSelection=n;var i=o.zoom().scaleExtent([.1,10]).interpolate(e.interpolate).on("zoom",function(){r.attr("transform",e.event.transform)});this._zoomBehavior=i;var r=e.select(n.node().querySelector("g"));return n.call(i),this._active||u.call(this,r),this._originalTransform=o.zoomTransform(n.node()),this}function c(t){var e=this._translation,n=t.datum().translation,i=n.x-e.x,r=n.y-e.y;return o.zoomTransform(this._zoomSelection.node()).translate(i,r)}function u(t){this._zoomBehavior.transform(this._zoomSelection,c.call(this,t)),this._translation=t.datum().translation,this._originalTransform=o.zoomIdentity.translate(t.datum().translation.x,t.datum().translation.y)}function d(t){var e={},n=t.node().nodeName;e.tag=n,e.attributes={};var i=t.node().attributes;if(i)for(var r=0;r<i.length;r++){var a=i[r],o=a.name,s=a.value;e.attributes[o]=s}if(t.node().transform){var l=function(t){var e=t.node().transform;if(e&&0!=e.baseVal.numberOfItems){var n=e.baseVal.consolidate().matrix;return{x:n.e,y:n.f}}return{x:0,y:0}}(t);0==l.x&&0==l.y||(e.translation=l)}if("ellipse"==n&&e.attributes.cx&&(e.center={x:e.attributes.cx,y:e.attributes.cy}),"polygon"==n&&e.attributes.points){var h=t.attr("points").split(" "),c=h.map(function(t){return t.split(",")[0]}),u=h.map(function(t){return t.split(",")[1]}),d=Math.min.apply(null,c),f=Math.max.apply(null,c),p=Math.min.apply(null,u),g=Math.max.apply(null,u),v={x:d,y:p,width:f-d,height:g-p};e.bbox=v,e.center={x:(d+f)/2,y:(p+g)/2}}return"path"==n&&(t.node().getTotalLength?e.totalLength=t.node().getTotalLength():e.totalLength=100),"#text"==n?e.text=t.text():"#comment"==n&&(e.comment=t.text()),e}function f(t){return"#text"==t.tag?document.createTextNode(""):"#comment"==t.tag?document.createComment(t.comment):document.createElementNS("http://www.w3.org/2000/svg",t.tag)}function p(t){var n=f(t),i=e.select(n),r=t.attributes;if(r)for(var a of Object.keys(r)){var o=r[a];i.attr(a,o)}return n}function g(t,n){var i=e.select(t.node().parentNode),r=p(n),a=i.insert(function(){return r},function(){return t.node()});return t.remove(),a}function v(t){return Object.assign({},t)}function y(t,e){return function(){var n=t.map(function(t){return a.interpolate([t[0][0],t[0][1]],[t[1][0],t[1][1]])});return function(t){return t<1?"M"+n.map(function(e){return e(t)}).join("L"):e}}}function m(t){return"edge"==t.attributes.class||"a"==t.tag&&"g"==t.parent.tag&&"edge"==t.parent.parent.attributes.class}function _(t){return t.parent&&m(t.parent)}function x(t){var n=this._transition,i=this._fade&&null!=n,r=this._tweenPaths,s=this._tweenShapes,l=this._convertEqualSidedPolygons,p=(this._tweenPrecision,this._growEnteringEdges&&null!=n),v=this._attributer,x=this;function w(t){var h=e.select(this);v&&h.each(v);var b=t.tag,E=t.attributes,k=!1;if(s&&n&&t.alternativeOld){if("polygon"==this.nodeName||"ellipse"==this.nodeName){k=!0;var z=d(h);if("polygon"==this.nodeName&&"polygon"==b){var M=z.attributes.points;if(null==M)k=!1;else if(!l){var P=M.split(" ").length;(W=t.attributes.points).split(" ").length==P&&(k=!1)}}else"ellipse"==this.nodeName&&"ellipse"==b&&(k=!1)}if(k){var S=t.alternativeOld,L=g(h,S);L.data([t],function(){return t.key});var q=t.alternativeNew;h=L,b="path",E=q.attributes}}var T=h;n&&(T=T.transition(n),i&&T.filter(function(t){return"#"==t.tag[0]?null:this}).style("opacity",1),T.filter(function(t){return"#"==t.tag[0]?null:this}).on("end",function(){e.select(this).attr("style",null)}));if(p&&"path"==b&&t.offset){var j=t.totalLength;h.attr("stroke-dasharray",j+" "+j).attr("stroke-dashoffset",j).attr("transform","translate("+t.offset.x+","+t.offset.y+")"),T.attr("stroke-dashoffset",0).attr("transform","translate(0,0)").on("start",function(){e.select(this).style("opacity",null)}).on("end",function(){e.select(this).attr("stroke-dashoffset",null).attr("stroke-dasharray",null).attr("transform",null)})}if(p&&"polygon"==b&&_(t)&&t.offset){var N=e.select(h.node().parentNode.querySelector("path"));if(N.node().getPointAtLength)var O=N.node().getPointAtLength(0),A=N.node().getPointAtLength(t.totalLength),B=N.node().getPointAtLength(t.totalLength-1),D=180*Math.atan2(A.y-B.y,A.x-B.x)/Math.PI;else O={x:0,y:0},A={x:100,y:100},D=0;var U=O.x-A.x+t.offset.x,I=O.y-A.y+t.offset.y;h.attr("transform","translate("+U+","+I+")"),T.attrTween("transform",function(){return function(e){if(N.node().getPointAtLength)var n=N.node().getPointAtLength(t.totalLength*e),i=N.node().getPointAtLength(t.totalLength*e+1),r=180*Math.atan2(i.y-n.y,i.x-n.x)/Math.PI-D;else n={x:100*e,y:100*e},r=0;return U=n.x-A.x+t.offset.x*(1-e),I=n.y-A.y+t.offset.y*(1-e),"translate("+U+","+I+") rotate("+r+" "+A.x+" "+A.y+")"}}).on("start",function(){e.select(this).style("opacity",null)}).on("end",function(){e.select(this).attr("transform",null)})}var R=r&&n&&"path"==b&&null!=h.attr("d");for(var V of Object.keys(E)){var F=E[V];if(R&&"d"==V){var W;(W=(t.alternativeOld||t).points)&&T.attrTween("d",y(W,F))}else"transform"==V&&t.translation&&T.on("start",function(){x._zoomBehavior&&T.tween("attr.transform",function(){var t=this;return function(e){t.setAttribute("transform",a.interpolateTransformSvg(o.zoomTransform(x._zoomSelection.node()).toString(),c.call(x,h).toString())(e))}})}).on("end",function(){x._zoomBehavior&&u.call(x,h)}),T.attr(V,F)}k&&T.on("end",function(t,n,i){if(this.nodeName!=t.tag){g(L=e.select(this),t).data([t],function(){return t.key})}}),t.text&&T.text(t.text),function(t){var r=t.selectAll(function(){return t.node().childNodes}),a=(r=r.data(function(t){return t.children},function(t){return t.key})).enter().append(function(t){var e=f(t);return"#text"==t.tag&&i&&(e.nodeValue=t.text),e});(i||p&&m(t.datum()))&&a.filter(function(t){return"#"==t.tag[0]?null:this}).each(function(t){var n=e.select(this);for(var i of Object.keys(t.attributes)){var r=t.attributes[i];n.attr(i,r)}}).filter(function(t){return"svg"==t.tag||"g"==t.tag?null:this}).style("opacity",0);var o=r.exit();v&&o.each(v),n&&(o=o.transition(n),i&&o.filter(function(t){return"#"==t.tag[0]?null:this}).style("opacity",0)),o=o.remove(),(r=a.merge(r)).each(w)}(h)}var b=this._selection;if(null!=n){var E=this._jobs;if(x._active)return E.push(null),this;b.transition(n).transition().duration(0).on("end",function(){x._active=!1,0!=E.length&&(E.shift(),x.render())}),this._active=!0}null!=n&&b.transition(n).on("start",function(){x._dispatch.call("transitionStart",x)}).on("end",function(){x._dispatch.call("transitionEnd",x)}).transition().duration(0).on("start",function(){x._dispatch.call("restoreEnd",x),x._dispatch.call("end",x),t&&t.call(x)});var k=this._data,z=b.selectAll("svg").data([k],function(t){return t.key});return z=z.enter().append("svg").merge(z),w.call(z.node(),k),this._zoom&&!this._zoomBehavior&&h.call(this),x._dispatch.call("renderEnd",x),null==n&&(this._dispatch.call("end",this),t&&t.call(this)),this}function w(t,e){if("polygon"==t.tag){(S=v(t)).tag="path";var n=v(u=t.attributes);if(null!=u.points){var i=u.points;if("polygon"==e.tag){(d=t.bbox).cx=d.x+d.width/2,d.cy=d.y+d.height/2;for(var r=u.points.split(" "),a=r.map(function(t){var e=t.split(",");return[e[0]-d.cx,e[1]-d.cy]}),o=a[a.length-1][0],s=a[a.length-1][1],l=0;l<a.length;l++,o=m,s=_){var h=(m=a[l][0])-o;if(0!=(k=(_=a[l][1])-s)){if(0<=(x=o-s*h/k)&&x<1/0&&(o<=x&&x<=m||m<=x&&x<=o))break}}var c=[[d.cx+x,d.cy+0].join(",")];i=(c=(c=c.concat(r.slice(l))).concat(r.slice(0,l))).join(" ")}n.d="M"+i+"z",delete n.points}S.attributes=n}else if("ellipse"==t.tag){(S=v(t)).tag="path";var u;n=v(u=t.attributes);if(null!=u.cx){var d,f=u.cx,p=u.cy,g=u.rx,y=u.ry;(d=e.bbox).cx=d.x+d.width/2,d.cy=d.y+d.height/2;var m,_,x,w=e.attributes.points.split(" ")[0].split(","),b=w[0],E=w[1],k=(h=b-d.cx,E-d.cy),z=Math.sqrt(Math.pow(h,2)+Math.pow(k,2)),M=h/z,P=-k/z;h=(x=g*-M)-(m=g*M),k=-y*-P-(_=-y*P);n.d="M "+f+" "+p+" m "+m+","+_+" a "+g+","+y+" 0 1,0 "+h+","+k+" a "+g+","+y+" 0 1,0 "+-h+","+-k+"z",delete n.cx,delete n.cy,delete n.rx,delete n.ry}S.attributes=n}else var S=t;return S}function b(t){if("undefined"!=typeof Worker){var i=new Blob(['\n            onmessage = function(event) {\n                if (event.data.vizURL) {\n                    importScripts(event.data.vizURL);\n                }\n                try {\n                    var svg = Viz(event.data.dot, event.data.options);\n                }\n                catch(error) {\n                    postMessage({\n                        type: "error",\n                        error: error.message,\n                    });\n                    return;\n                }\n                if (svg) {\n                    postMessage({\n                        type: "done",\n                        svg: svg,\n                    });\n                } else {\n                    postMessage({\n                        type: "skip",\n                    });\n                }\n            }\n        ']),r=window.URL.createObjectURL(i);this._worker=new Worker(r)}this._selection=t,this._active=!1,this._busy=!1,this._jobs=[],this._queue=[],this._keyModes=new Set(["title","id","tag-index","index"]),this._engine="dot",this._images=[],this._totalMemory=void 0,this._keyMode="title",this._fade=!0,this._tweenPaths=!0,this._tweenShapes=!0,this._convertEqualSidedPolygons=!0,this._tweenPrecision=1,this._growEnteringEdges=!0,this._translation={x:0,y:0},this._zoom=!0,this._eventTypes=["initEnd","start","layoutStart","layoutEnd","dataExtractEnd","dataProcessEnd","renderStart","renderEnd","transitionStart","transitionEnd","restoreEnd","end"],this._dispatch=n.dispatch(...this._eventTypes),function(){if(null==this._worker)s(""),this._dispatch.call("initEnd",this);else{var t=e.selectAll("script").filter(function(){return"javascript/worker"==e.select(this).attr("type")}).attr("src"),n=this;this._worker.onmessage=function(t){n._dispatch.call("initEnd",this)},t.match(/^https?:\/\/|^\/\//i)||(t=document.location.protocol+"//"+document.location.host+"/"+t),this._worker.postMessage({dot:"",vizURL:t})}}.call(this)}function E(t){return new b(e.select(t))}b.prototype=E.prototype={constructor:b,engine:function(t){if(t!=this._engine&&null!=this._data)throw Error("Too late to change engine");return this._engine=t,this},addImage:function(t,e,n){return this._images.push({path:t,width:e,height:n}),this},totalMemory:function(t){return this._totalMemory=t,this},keyMode:function(t){if(!this._keyModes.has(t))throw Error("Illegal keyMode: "+t);if(t!=this._keyMode&&null!=this._data)throw Error("Too late to change keyMode");return this._keyMode=t,this},fade:function(t){return this._fade=t,this},tweenPaths:function(t){return this._tweenPaths=t,this},tweenShapes:function(t){return this._tweenShapes=t,t&&(this._tweenPaths=!0),this},convertEqualSidedPolygons:function(t){return this._convertEqualSidedPolygons=t,this},tweenPrecision:function(t){return this._tweenPrecision=t,this},growEnteringEdges:function(t){return this._growEnteringEdges=t,this},zoom:function(t){return this._zoom=t,this._zoom&&!this._zoomBehavior&&h.call(this),this},resetZoom:function(t){var e=this._zoomSelection;return t&&(e=e.transition(t)),e.call(this._zoomBehavior.transform,this._originalTransform),this},render:function(t){return this._busy?(this._queue.push(this.render),this):(this._dispatch.call("renderStart",this),this._transitionFactory?r.timeout(function(){this._transition=i.transition(this._transitionFactory()),x.call(this,t)}.bind(this),0):x.call(this,t),this)},dot:function(t,n){var i=this,r=this._worker,a=this._engine,o=this._images,l=this._totalMemory,h=this._keyMode,c=this._tweenPaths,u=this._tweenShapes,f=this._tweenPrecision,g=this._growEnteringEdges,v={},y=this._dictionary||{},m={},x=this._nodeDictionary||{};function b(t,n=0,i){var r=d(t);r.parent=i,r.children=[];var a=r.tag;"#text"==a?r.text=t.text():"#comment"==a&&(r.comment=t.text());var o=e.selectAll(t.node().childNodes);"index"==h?r.key=n:"#"!=a[0]&&("id"==h?r.key=t.attr("id"):"title"==h&&(t.select("title"),t.select("title").empty()||(r.key=t.select("title").text()))),null==r.key&&(u&&("ellipse"!=a&&"polygon"!=a||(a="path")),r.key=a+"-"+n);var s=(i?i.id+".":"")+r.key;r.id=s,v[s]=r;var l=y[s];if(u&&s in y&&("polygon"!=l.tag&&"ellipse"!=l.tag||l.tag==r.tag&&"polygon"!=r.tag||(r.alternativeOld=w(l,r),r.alternativeNew=w(r,l))),c&&l&&("path"==l.tag||r.alternativeOld&&"path"==r.alternativeOld.tag)){var g=(r.alternativeNew||r).attributes.d;if(r.alternativeOld)var m=p(r.alternativeOld);else m=p(l);(r.alternativeOld||(r.alternativeOld={})).points=function(t,e,n){var i=t,r=i.cloneNode();if(t.getTotalLength)var a=i.getTotalLength(),o=(r.setAttribute("d",e),r).getTotalLength();else a=100,o=50;for(var s=[0],l=0,h=n/Math.max(a,o);(l+=h)<1;)s.push(l);return s.push(1),s.map(function(e){if(t.getPointAtLength)var n=i.getPointAtLength(e*a),s=r.getPointAtLength(e*o);else n={x:e*a,y:e*a},s={x:e*o,y:e*o};return[[n.x,n.y],[s.x,s.y]]})}(m,g,f)}var _={};return o.each(function(){if(null!==this){var t=this.nodeName;"ellipse"!=t&&"polygon"!=t||(t="path"),null==_[t]&&(_[t]=0);var n=_[t]++,i=b(e.select(this),n,r);i&&r.children.push(i)}}),r}this._dispatch.call("start",this),this._busy=!0,this._dispatch.call("layoutStart",this);var E={format:"svg",engine:a,images:o,totalMemory:l};this._worker?(r.postMessage({dot:t,options:E}),r.onmessage=function(t){switch(t.data.type){case"done":return k.call(i,t.data.svg);case"error":if(!i._onerror)throw t.data.error;i._onerror(t.data.error)}}):k.call(this,s(t,E));function k(t){this._dispatch.call("layoutEnd",this);var i=e.selection().append("div").attr("display","none");i.html(t);var r=b(i.select("svg"));this._dispatch.call("dataExtractEnd",this),r=function t(e){var n=e.id,i=e.tag,r=y[n];if(g&&e.parent&&"node"==e.parent.attributes.class&&"title"==i){var a=(s=e.children[0]).text;m[a]=e.parent}if(g&&!r&&e.parent&&_(e)&&("path"==i||"polygon"==i)){if("polygon"==i){var o=e.parent.children.find(function(t){return"path"==t.tag});e.totalLength=o.totalLength}var s,l=(s=function(t){return(e=t,"edge"==e.parent.attributes.class?e.parent:e.parent.parent.parent).children.find(function(t){return"title"==t.tag});var e}(e).children[0]).text.split("->");2!=l.length&&(l=s.text.split("--"));var h=l[0],c=m[h],u=x[h];if(u){if(!c)return;"g"==c.children[3].tag&&"a"==c.children[3].children[0].tag&&(c=c.children[3].children[0]),"g"==u.children[3].tag&&"a"==u.children[3].children[0].tag&&(u=u.children[3].children[0]);for(var d=c.children,f=0;f<d.length;f++)if("polygon"==d[f].tag||"ellipse"==d[f].tag){var p=d[f];break}if(void 0===p)throw Error("Unsupported start shape of node "+h+".\nPlease file an issue at https://github.com/magjac/d3-graphviz/issues");var v=u.children;for(f=0;f<v.length;f++)if("polygon"==v[f].tag||"ellipse"==v[f].tag){var w=v[f];break}if(void 0===w)throw Error("Unsupported previuous start shape of node "+h+".\nPlease file an issue at https://github.com/magjac/d3-graphviz/issues");e.offset={x:w.center.x-p.center.x,y:w.center.y-p.center.y}}}return e.children.forEach(function(e){t(e)}),e}(r),this._data=r,this._dictionary=v,this._nodeDictionary=m,i.remove(),this._extractData=b,this._busy=!1,this._dispatch.call("dataProcessEnd",this),n&&n.call(this),this._queue.length>0&&this._queue.shift().call(this)}return this},renderDot:function(t,e){var n=this;return this.dot(t,function(){n.render(e)}),this},transition:function(t){return t instanceof Function?this._transitionFactory=t:this._transition=i.transition(t),this},active:function(t){var e=this._selection.selectWithoutDataPropagation("svg");return 0!=e.size()?i.active(e.node(),t):null},attributer:function(t){return this._attributer=t,this},on:function(t,e){return this._dispatch.on(t,e),this},onerror:function(t){return this._onerror=t,this},logEvents:function(t){var e=Date.now(),n={},i=this._eventTypes,r=Math.max(...i.map(t=>t.length));for(let h in i){let c=i[h];n[c]=[];var a,o,s=this;this.on(c+".log",t?function(){var t=Date.now(),i=n[c].length;n[c].push(t);var u="";if(u+="Event ",u+=l.format(" >2")(h)+" ",u+=(c+"             ").slice(0,r+1)+" ",u+=l.format(" >5")(t-e)+" ","initEnd"!=c&&(u+=l.format(" >5")(t-n.start[i])),"dataProcessEnd"==c&&(u+=" prepare                 "+l.format(" >5")(t-n.layoutEnd[i])),"renderEnd"==c&&(u+=" transition start margin "+l.format(" >5")(s._transition.delay()-(t-n.renderStart[i])),a=s._transition.delay(),o=s._transition.duration()),"transitionStart"==c){var d=t-n.renderStart[i];u+=" transition delay        "+l.format(" >5")(t-n.renderStart[i]),u+=" expected "+l.format(" >5")(a),u+=" diff "+l.format(" >5")(d-a)}if("transitionEnd"==c){var f=t-n.transitionStart[i];u+=" transition duration     "+l.format(" >5")(f),u+=" expected "+l.format(" >5")(o),u+=" diff "+l.format(" >5")(f-o)}console.log(u),e=t}:null)}return this}};e.selection.prototype.graphviz=function(){return new b(this)},e.selection.prototype.selectWithoutDataPropagation=function(t){return e.select(this.node().querySelector(t))},t.graphviz=E,Object.defineProperty(t,"__esModule",{value:!0})});