(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jyf-parser/libs/trees"],{"0868":function(t,e,r){"use strict";r.r(e);var i=r("7c7d"),s=r.n(i);for(var n in i)"default"!==n&&function(t){r.d(e,t,(function(){return i[t]}))}(n);e["default"]=s.a},"2ecc":function(t,e,r){"use strict";var i=r("ed82"),s=r.n(i);s.a},"7c7d":function(t,e,r){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t.Parser={};var s=function(){Promise.resolve().then(function(){return resolve(r("f8e5"))}.bind(null,r)).catch(r.oe)},n=r("99e5").errorImg,a={components:{trees:s},name:"trees",data:function(){return{controls:[],placeholder:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="225"/>',errorImg:n,loadVideo:!0}},props:{nodes:Array,lazyLoad:Boolean,loading:String},mounted:function(){var t=this.$parent;while("parser"!=t.$options.name){if(t.top){t=t.top;break}t=t.$parent}this.top=t;for(var e,r=this.nodes.length;e=this.nodes[--r];)if(!e.c)if("img"==e.name)t.imgList.setItem(e.attrs.i,e.attrs.src);else if("video"==e.name||"audio"==e.name){var s;"video"==e.name?s=i.createVideoContext(e.attrs.id,this):this.$refs[e.attrs.id]&&(s=this.$refs[e.attrs.id][0]),s&&(s.id=e.attrs.id,t.videoContexts.push(s))}},methods:{play:function(t){var e=this.top.videoContexts;if(e.length>1&&this.top.autopause)for(var r=e.length;r--;)e[r].id!=t.currentTarget.dataset.id&&e[r].pause()},imgtap:function(e){var r=e.currentTarget.dataset.attrs;if(!r.ignore){var s=!0,n={id:e.target.id,src:r.src,ignore:function(){return s=!1}};if(t.Parser.onImgtap&&t.Parser.onImgtap(n),this.top.$emit("imgtap",n),s){var a=this.top.imgList,o=a[r.i]?parseInt(r.i):(a=[r.src],0);i.previewImage({current:o,urls:a})}}},loadImg:function(t){var e=t.currentTarget.dataset.i;this.lazyLoad&&!this.controls[e]?this.$set(this.controls,e,1):this.loading&&2!=this.controls[e]&&this.$set(this.controls,e,2)},linkpress:function(e){var r=!0,s=e.currentTarget.dataset.attrs;if(s.ignore=function(){return r=!1},t.Parser.onLinkpress&&t.Parser.onLinkpress(s),this.top.$emit("linkpress",s),r){if(s["app-id"])return i.navigateToMiniProgram({appId:s["app-id"],path:s.path});s.href&&("#"==s.href[0]?this.top.useAnchor&&this.top.navigateTo({id:s.href.substring(1)}):0==s.href.indexOf("http")||0==s.href.indexOf("//")?i.setClipboardData({data:s.href,success:function(){return i.showToast({title:"链接已复制"})}}):i.navigateTo({url:s.href,fail:function(){i.switchTab({url:s.href})}}))}},error:function(t){var e=t.currentTarget,r=e.dataset.source,i=e.dataset.i;if("video"==r||"audio"==r){var s=this.controls[i]?this.controls[i].i+1:1;s<this.nodes[i].attrs.source.length&&this.$set(this.controls,i,s),t.detail.__args__&&(t.detail=t.detail.__args__[0])}else n&&"img"==r&&(this.top.imgList.setItem(e.dataset.index,n),this.$set(this.controls,i,3));this.top&&this.top.$emit("error",{source:r,target:e,errMsg:t.detail.errMsg})},_loadVideo:function(t){this.$set(this.controls,t.target.dataset.i,0)}}};e.default=a}).call(this,r("c8ba"),r("543d")["default"])},a4c5:function(t,e,r){"use strict";var i;r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return n})),r.d(e,"a",(function(){return i}));var s=function(){var t=this,e=t.$createElement;t._self._c},n=[]},df09:function(t,e,r){"use strict";var i=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=i},ed82:function(t,e,r){},f8e5:function(t,e,r){"use strict";r.r(e);var i=r("a4c5"),s=r("0868");for(var n in s)"default"!==n&&function(t){r.d(e,t,(function(){return s[t]}))}(n);r("2ecc");var a,o=r("f0c5"),c=r("df09"),u=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);"function"===typeof c["a"]&&Object(c["a"])(u),e["default"]=u.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jyf-parser/libs/trees-create-component',
    {
        'components/jyf-parser/libs/trees-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f8e5"))
        })
    },
    [['components/jyf-parser/libs/trees-create-component']]
]);
