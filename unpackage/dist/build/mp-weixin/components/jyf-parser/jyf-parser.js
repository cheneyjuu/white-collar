(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jyf-parser/jyf-parser"],{6657:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"67c6":function(t,e,n){"use strict";n.r(e);var i=n("e2cd"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"7cc1":function(t,e,n){"use strict";var i=n("e1c0"),o=n.n(i);o.a},a02c:function(t,e,n){"use strict";n.r(e);var i=n("6657"),o=n("67c6");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("7cc1");var a,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=c.exports},e1c0:function(t,e,n){},e2cd:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i,o=function(){n.e("components/jyf-parser/libs/trees").then(function(){return resolve(n("f8e5"))}.bind(null,n)).catch(n.oe)},r={},a=t.getFileSystemManager?t.getFileSystemManager():null,s=n("3baf");function c(t){for(var e=t.length,n=5381;e--;)n+=(n<<5)+t.charCodeAt(e);return n}var l={name:"parser",data:function(){return{showAm:"",nodes:[]}},components:{trees:o},props:{html:null,autopause:{type:Boolean,default:!0},autoscroll:Boolean,autosetTitle:{type:Boolean,default:!0},compress:Number,loadingImg:String,useCache:Boolean,domain:String,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean},watch:{html:function(t){this.setContent(t)}},mounted:function(){this.imgList=[],this.imgList.each=function(t){for(var e=0,n=this.length;e<n;e++)this.setItem(e,t(this[e],e,this))},this.imgList.setItem=function(t,e){var n=this;if(void 0!=t&&e){if(0==e.indexOf("http")&&this.includes(e)){for(var i,o="",r=0;i=e[r];r++){if("/"==i&&"/"!=e[r-1]&&"/"!=e[r+1])break;o+=Math.random()>.5?i.toUpperCase():i}return o+=e.substr(r),this[t]=o}if(this[t]=e,e.includes("data:image")){var s,c=e.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!c)return;s="".concat(wx.env.USER_DATA_PATH,"/").concat(Date.now(),".").concat(c[1]),a&&a.writeFile({filePath:s,data:c[3],encoding:c[2],success:function(){return n[t]=s}})}}},i&&(this.document=new i(this)),this.html&&this.setContent(this.html)},beforeDestroy:function(){this.imgList.each((function(e){e&&e.includes(t.env.USER_DATA_PATH)&&a&&a.unlink({filePath:e})})),clearInterval(this._timer)},methods:{setContent:function(e,n){var i,o,a=this;if(!e)return this.nodes=[];if("string"==typeof e){var l=new s(e,this);if(this.useCache){var u=c(e);r[u]?i=r[u]:(i=l.parse(),r[u]=i)}else i=l.parse();this.$emit("parse",i)}else if("[object Array]"==Object.prototype.toString.call(e)){if(e.length&&"Parser"!=e[0].PoweredBy){var h=new s(e,this);(function t(e){for(var n,i=0;n=e[i];i++)if("text"!=n.type){for(var o in n.attrs=n.attrs||{},n.attrs)"string"!=typeof n.attrs[o]&&(n.attrs[o]=n.attrs[o].toString());h.matchAttr(n,h),n.children&&n.children.length?(h.STACK.push(n),t(n.children),h.popNode(h.STACK.pop())):n.children=void 0}})(e)}i=e}else{if("object"!=typeof e||!e.nodes)return console.warn("错误的 html 类型："+typeof e);i=e.nodes,console.warn("错误的 html 类型：object 类型已废弃")}this.nodes=n?this.nodes.concat(i):i,i.length&&i[0].title&&this.autosetTitle&&t.setNavigationBarTitle({title:i[0].title}),this.imgList&&(this.imgList.length=0),this.videoContexts=[],this.$nextTick((function(){a.$emit("load")})),clearInterval(this._timer),this._timer=setInterval((function(){a.createSelectorQuery().select("#top").boundingClientRect().exec((function(t){t&&(a.rect=t[0],a.rect.height==o&&(a.$emit("ready",a.rect),clearInterval(a._timer)),o=a.rect.height)}))}),350),this.showWithAnimation&&!n&&(this.showAm="animation:show .5s")},getText:function(){for(var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.nodes,n="",i=0;t=e[i++];)if("text"==t.type)n+=t.text.replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");else if("br"==t.type)n+="\n";else{var o="p"==t.name||"div"==t.name||"tr"==t.name||"li"==t.name||"h"==t.name[0]&&t.name[1]>"0"&&t.name[1]<"7";o&&n&&"\n"!=n[n.length-1]&&(n+="\n"),t.children&&(n+=this.getText(t.children)),o&&"\n"!=n[n.length-1]?n+="\n":"td"!=t.name&&"th"!=t.name||(n+="\t")}return n},navigateTo:function(e){var n=this;if(!this.useAnchor)return e.fail&&e.fail({errMsg:"Anchor is disabled"});var i=function(i,o){t.createSelectorQuery().in(o||n).select(i).boundingClientRect().selectViewport().scrollOffset().exec((function(n){if(!n||!n[0])return e.fail&&e.fail({errMsg:"Label not found"});e.scrollTop=n[1].scrollTop+n[0].top+(e.offset||0),t.pageScrollTo(e)}))};e.id?i("#top >>> #"+e.id+", #top >>> ."+e.id):i("#top")},getVideoContext:function(t){if(!t)return this.videoContexts;for(var e=this.videoContexts.length;e--;)if(this.videoContexts[e].id==t)return this.videoContexts[e]}}};e.default=l}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jyf-parser/jyf-parser-create-component',
    {
        'components/jyf-parser/jyf-parser-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a02c"))
        })
    },
    [['components/jyf-parser/jyf-parser-create-component']]
]);
