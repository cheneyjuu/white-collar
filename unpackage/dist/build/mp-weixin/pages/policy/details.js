(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/policy/details"],{"3e68":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=c(n("277c"));function r(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return r=function(){return t},t}function c(t){if(t&&t.__esModule)return t;if(null===t||"object"!==typeof t&&"function"!==typeof t)return{default:t};var e=r();if(e&&e.has(t))return e.get(t);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in t)if(Object.prototype.hasOwnProperty.call(t,c)){var a=o?Object.getOwnPropertyDescriptor(t,c):null;a&&(a.get||a.set)?Object.defineProperty(n,c,a):n[c]=t[c]}return n.default=t,e&&e.set(t,n),n}var a={data:function(){return{token:t.getStorageSync("id_token"),topic:{}}},methods:{loadTopicInfo:function(e){var n=this;t.request({url:"".concat(o.baseUrl,"/topic/").concat(e,"/details"),method:"GET",header:{"content-type":"application/json",Authorization:"Bearer "+this.token},success:function(t){var e=t.data.data;e.content=e.content.replace(/<table[^>]*>/gi,(function(t,e){return t.replace(/width=\"(.*)\"/gi,"")})),n.topic=e},fail:function(){},complete:function(){}})},onShare:function(){t.showShareMenu({success:function(){console.log("share success")}})}},onLoad:function(t){var e=t.topicId;this.loadTopicInfo(e)},onShareAppMessage:function(){return{title:this.topic.title,path:"/pages/topic/details?topicId="+this.topic.topicId.id,imageUrl:this.topic.coverImage}}};e.default=a}).call(this,n("543d")["default"])},4093:function(t,e,n){"use strict";(function(t){n("18a1");o(n("66fd"));var e=o(n("a9db"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"4e23":function(t,e,n){"use strict";n.r(e);var o=n("3e68"),r=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e["default"]=r.a},a9db:function(t,e,n){"use strict";n.r(e);var o=n("edce"),r=n("4e23");for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);var a,i=n("f0c5"),u=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=u.exports},edce:function(t,e,n){"use strict";var o,r=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o}))}},[["4093","common/runtime","common/vendor"]]]);