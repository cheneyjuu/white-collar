(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/mescroll-uni/mescroll-uni"],{"075d":function(t,o,e){"use strict";var n=e("511e"),i=e.n(n);i.a},"20e1":function(t,o,e){"use strict";e.r(o);var n=e("2d90"),i=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(o,t,(function(){return n[t]}))}(s);o["default"]=i.a},"2d90":function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=s(e("e0b4")),i=s(e("5b74"));function s(t){return t&&t.__esModule?t:{default:t}}var r=function(){e.e("components/mescroll-uni/components/mescroll-empty").then(function(){return resolve(e("d30f"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("components/mescroll-uni/components/mescroll-top").then(function(){return resolve(e("ac6c"))}.bind(null,e)).catch(e.oe)},u={components:{MescrollEmpty:r,MescrollTop:c},data:function(){return{mescroll:{optDown:{},optUp:{}},viewId:"id_"+Math.random().toString(36).substr(2),downHight:0,downRate:0,downLoadType:4,upLoadType:0,isShowEmpty:!1,isShowToTop:!1,scrollTop:0,scrollAnim:!1,windowTop:0,windowBottom:0,windowHeight:0,statusBarHeight:0,isSafearea:!1,scrollToViewId:""}},props:{down:Object,up:Object,top:[String,Number],topbar:Boolean,bottom:[String,Number],safearea:Boolean,fixed:{type:Boolean,default:function(){return!0}},height:[String,Number]},computed:{isFixed:function(){return!this.height&&this.fixed},scrollHeight:function(){return this.isFixed?"auto":this.height?this.toPx(this.height)+"px":"100%"},numTop:function(){return this.toPx(this.top)+(this.topbar?this.statusBarHeight:0)},fixedTop:function(){return this.isFixed?this.numTop+this.windowTop+"px":0},padTop:function(){return this.isFixed?0:this.numTop+"px"},numBottom:function(){return this.toPx(this.bottom)},fixedBottom:function(){return this.isFixed?this.numBottom+this.windowBottom+"px":0},fixedBottomConstant:function(){return this.isSafearea?"calc("+this.fixedBottom+" + constant(safe-area-inset-bottom))":this.fixedBottom},fixedBottomEnv:function(){return this.isSafearea?"calc("+this.fixedBottom+" + env(safe-area-inset-bottom))":this.fixedBottom},padBottom:function(){return this.isFixed?0:this.numBottom+"px"},padBottomConstant:function(){return this.isSafearea?"calc("+this.padBottom+" + constant(safe-area-inset-bottom))":this.padBottom},padBottomEnv:function(){return this.isSafearea?"calc("+this.padBottom+" + env(safe-area-inset-bottom))":this.padBottom},isDownReset:function(){return 3===this.downLoadType||4===this.downLoadType},transition:function(){return this.isDownReset?"transform 300ms":""},translateY:function(){return this.downHight>0?"translateY("+this.downHight+"px)":""},isDownLoading:function(){return 3===this.downLoadType},downRotate:function(){return"rotate("+360*this.downRate+"deg)"},downText:function(){switch(this.downLoadType){case 1:return this.mescroll.optDown.textInOffset;case 2:return this.mescroll.optDown.textOutOffset;case 3:return this.mescroll.optDown.textLoading;case 4:return this.mescroll.optDown.textLoading;default:return this.mescroll.optDown.textInOffset}}},methods:{toPx:function(o){if("string"===typeof o)if(-1!==o.indexOf("px"))if(-1!==o.indexOf("rpx"))o=o.replace("rpx","");else{if(-1===o.indexOf("upx"))return Number(o.replace("px",""));o=o.replace("upx","")}else if(-1!==o.indexOf("%")){var e=Number(o.replace("%",""))/100;return this.windowHeight*e}return o?t.upx2px(Number(o)):0},scroll:function(t){var o=this;this.mescroll.scroll(t.detail,(function(){o.$emit("scroll",o.mescroll)}))},touchstartEvent:function(t){this.mescroll.touchstartEvent(t)},touchmoveEvent:function(t){this.mescroll.touchmoveEvent(t)},touchendEvent:function(t){this.mescroll.touchendEvent(t)},emptyClick:function(){this.$emit("emptyclick",this.mescroll)},toTopClick:function(){this.mescroll.scrollTo(0,this.mescroll.optUp.toTop.duration),this.$emit("topclick",this.mescroll)},setClientHeight:function(){var o=this;0!==this.mescroll.getClientHeight(!0)||this.isExec||(this.isExec=!0,this.$nextTick((function(){var e=t.createSelectorQuery().in(o).select("#"+o.viewId);e.boundingClientRect((function(t){o.isExec=!1,t?o.mescroll.setClientHeight(t.height):3!=o.clientNum&&(o.clientNum=null==o.clientNum?1:o.clientNum+1,setTimeout((function(){o.setClientHeight()}),100*o.clientNum))})).exec()})))}},created:function(){var o=this,e={down:{inOffset:function(t){o.downLoadType=1},outOffset:function(t){o.downLoadType=2},onMoving:function(t,e,n){o.downHight=n,o.downRate=e},showLoading:function(t,e){o.downLoadType=3,o.downHight=e},endDownScroll:function(t){o.downLoadType=4,o.downHight=0},callback:function(t){o.$emit("down",t)}},up:{showLoading:function(){o.upLoadType=1},showNoMore:function(){o.upLoadType=2},hideUpScroll:function(){o.upLoadType=0},empty:{onShow:function(t){o.isShowEmpty=t}},toTop:{onShow:function(t){o.isShowToTop=t}},callback:function(t){o.$emit("up",t),o.setClientHeight()}}};n.default.extend(e,i.default);var s=JSON.parse(JSON.stringify({down:o.down,up:o.up}));n.default.extend(s,e),o.mescroll=new n.default(s),o.mescroll.viewId=o.viewId,o.$emit("init",o.mescroll);var r=t.getSystemInfoSync();r.windowTop&&(o.windowTop=r.windowTop),r.windowBottom&&(o.windowBottom=r.windowBottom),r.windowHeight&&(o.windowHeight=r.windowHeight),r.statusBarHeight&&(o.statusBarHeight=r.statusBarHeight),o.mescroll.setBodyHeight(r.windowHeight),o.mescroll.resetScrollTo((function(t,e){if(o.scrollAnim=0!==e,"string"!==typeof t){var n=o.mescroll.getScrollTop();0===e||300===e?(o.scrollTop=n,o.$nextTick((function(){o.scrollTop=t}))):o.mescroll.getStep(n,t,(function(t){o.scrollTop=t}),e)}else o.scrollToViewId=t})),"ios"==r.platform?(o.isSafearea=o.safearea,o.up&&o.up.toTop&&null!=o.up.toTop.safearea||(o.mescroll.optUp.toTop.safearea=o.safearea)):(o.isSafearea=!1,o.mescroll.optUp.toTop.safearea=!1)},mounted:function(){this.setClientHeight()}};o.default=u}).call(this,e("543d")["default"])},"511e":function(t,o,e){},"8f6c":function(t,o,e){"use strict";e.r(o);var n=e("af12"),i=e("20e1");for(var s in i)"default"!==s&&function(t){e.d(o,t,(function(){return i[t]}))}(s);e("075d");var r,c=e("f0c5"),u=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);o["default"]=u.exports},af12:function(t,o,e){"use strict";var n;e.d(o,"b",(function(){return i})),e.d(o,"c",(function(){return s})),e.d(o,"a",(function(){return n}));var i=function(){var t=this,o=t.$createElement;t._self._c},s=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/mescroll-uni/mescroll-uni-create-component',
    {
        'components/mescroll-uni/mescroll-uni-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8f6c"))
        })
    },
    [['components/mescroll-uni/mescroll-uni-create-component']]
]);
