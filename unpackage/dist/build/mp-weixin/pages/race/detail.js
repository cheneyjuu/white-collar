(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/race/detail"],{"03cf":function(t,e,n){"use strict";n.r(e);var a=n("87aa"),o=n("9416");for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n("f240");var r,i=n("f0c5"),s=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=s.exports},"1d2a":function(t,e,n){},8770:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=c(n("277c"));function o(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return o=function(){return t},t}function c(t){if(t&&t.__esModule)return t;if(null===t||"object"!==typeof t&&"function"!==typeof t)return{default:t};var e=o();if(e&&e.has(t))return e.get(t);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in t)if(Object.prototype.hasOwnProperty.call(t,c)){var r=a?Object.getOwnPropertyDescriptor(t,c):null;r&&(r.get||r.set)?Object.defineProperty(n,c,r):n[c]=t[c]}return n.default=t,e&&e.set(t,n),n}var r=function(){Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(function(){return resolve(n("a02c"))}.bind(null,n)).catch(n.oe)},i={components:{jyfParser:r},data:function(){return{raceId:"",raceInfo:{},itemList:{},modalName:null,modalName2:null,itemInfo:{},itemId:"",entryStartDate:null,entryEndDate:null,matchStartDate:null,matchEndDate:null,status:null,globalRegisterFlag:!1,peopleCount:0}},methods:{hideModal2:function(t){this.modalName2=null},wxGetUserInfo:function(){var e=this;t.getUserInfo({provider:"weixin",success:function(n){console.log({userinfo:n}),e.loginInfo=n,e.nickName=n.userInfo.nickName,e.avatarUrl=n.userInfo.avatarUrl;try{t.setStorageSync("isCanUse",!1),e.login()}catch(a){}},fail:function(t){}})},login:function(){t.removeStorageSync("sessionId");var e=this,n=t.getStorageSync("isCanUse");!1===n&&(t.showLoading({title:"登录中..."}),t.login({provider:"weixin",success:function(n){e.isCanUse||t.getUserInfo({provider:"weixin",success:function(t){console.log({getUserInfo:t}),e.loginInfo=t}}),e.exchangeInfo(n.code)},fail:function(){},complete:function(){}}))},exchangeInfo:function(e){var n=this,o=this;t.request({url:"".concat(a.baseUrl,"/global/login/app"),method:"GET",header:{"content-type":"application/json"},data:{code:e,encryptedData:this.loginInfo.encryptedData,iv:this.loginInfo.iv},success:function(t){var e=t.data;500!==t.statusCode?(console.dir(e),o.updateAccount(e)):n.wxGetUserInfo()},fail:function(){},complete:function(){}})},updateAccount:function(e){console.log("update account"),console.log(e);var n=this;t.request({url:"".concat(a.baseUrl,"/global/account"),method:"POST",data:e,success:function(t){console.log(t),n.userInfo=e,n.authentication(e.openId)},fail:function(){},complete:function(){}})},authentication:function(e){var n=this;t.request({url:"".concat(a.baseUrl,"/authenticate"),data:{username:e,password:e},method:"POST",header:{"content-type":"application/json"},success:function(e){n.token=e.data.id_token,n.userInfo.avatarStyle="background-image:url(".concat(n.userInfo.avatarUrl,")"),console.log(n.userInfo.avatarStyle),t.setStorage({key:"userInfo",data:n.userInfo}),t.setStorage({key:"id_token",data:n.token,success:function(){t.hideLoading()}}),n.modalName2=null,console.log("raceId",n.raceId),t.navigateTo({url:"/pages/race/bindInfo/bindInfo?raceId="+n.raceId})}})},loadData:function(e){var n=this,o=t.getStorageSync("id_token");t.request({url:"".concat(a.baseUrl,"/races/").concat(e),method:"GET",header:{"content-type":"application/json",Authorization:"Bearer "+o},success:function(t){var e=t.data.data;e.matchStartDate=e.matchStartDate.substring(0,16),e.matchEndDate=e.matchEndDate.substring(0,16),n.matchStartDate=e.matchStartDate,n.matchEndDate=e.matchEndDate,n.entryStartDate=e.entryStartDate,n.entryEndDate=e.entryEndDate,n.raceInfo=e},fail:function(){},complete:function(){}})},loadItemData:function(e){var n=this,o=this,c=t.getStorageSync("id_token"),r=t.getStorageSync("userInfo");t.request({url:"".concat(a.baseUrl,"/races/").concat(e,"/items/").concat(r.openId),method:"GET",header:{"content-type":"application/json",Authorization:"Bearer "+c},success:function(t){var e=t.data.data,a=new Date,c=(a.getFullYear(),a.getMonth()+1);c=c>10?c:"0"+c,console.log(c);var r=a.getDate();r=r>10?r:"0"+r;console.log("load item data"),n.itemList=e,o.peopleCount=n.itemList[0].userCount},fail:function(){},complete:function(){}})},toRegister:function(e){var n=e.itemId,a=this.raceInfo,o=a.raceId,c=a.offLineFlag;this.itemId=n;var r=t.getStorageSync("userInfo"),i=!1;r&&e.playerInfoList.forEach((function(t){t.login===r.openId&&(console.log(t),i=!0)})),i?t.showToast({icon:"none",title:"请勿重复报名!"}):t.navigateTo({url:"/pages/race/register?raceId=".concat(o.id,"&itemId=").concat(n.id,"&offLineFlag=").concat(c)})},startRace:function(e){var n=this;wx.getSetting({success:function(a){if(!1===a.authSetting["scope.userLocation"])wx.showModal({title:"您未开启地理位置授权",content:"授权后才能开始比赛",success:function(t){t.confirm&&wx.openSetting()}});else{var o=e.itemId,c=(t.getStorageSync("userInfo"),n.raceInfo),r=c.lng,i=c.lat,s=c.raceId;n.modalName=null;var u=n.raceInfo.checkInType?n.raceInfo.checkInType:"IN_ORDER";"IN_ORDER"===u?t.navigateTo({url:"/pages/race/raceMap?lng=".concat(r,"&lat=").concat(i,"&raceId=").concat(s.id,"&itemId=").concat(o.id)}):t.navigateTo({url:"/pages/race/randomMap?lng=".concat(r,"&lat=").concat(i,"&raceId=").concat(s.id,"&itemId=").concat(o.id)})}}})},viewItem:function(t){this.itemInfo=t,this.modalName="DialogModal1"},hideModal:function(t){this.modalName=null},getDistance:function(t,e,n,a){var o=0,c=u(t),r=u(n),i=c-r,s=u(e)-u(a);o=2*Math.asin(Math.sqrt(Math.pow(Math.sin(i/2),2)+Math.cos(c)*Math.cos(r)*Math.pow(Math.sin(s/2),2)));return 6378137*o;function u(t){return t*Math.PI/180}},toViewRanking:function(e){t.navigateTo({url:"/pages/race/ranking?itemId=".concat(e.itemId.id)})}},onLoad:function(t){var e=t.raceId;this.raceId=e},onShow:function(e){this.raceId&&(this.peopleCount=0,this.loadData(this.raceId),this.loadItemData(this.raceId));var n=t.getStorageSync("id_token");n?wx.getLocation({type:"gcj02",success:function(){console.log("地理位置获取成功")}}):this.modalName2="DialogModal2"},onShareAppMessage:function(){return{title:this.raceInfo.title,path:"/pages/race/detail?raceId="+this.raceId,imageUrl:this.raceInfo.coverImage}}};e.default=i}).call(this,n("543d")["default"])},"87aa":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var a={jyfParser:function(){return Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(n.bind(null,"a02c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},c=[]},"939a":function(t,e,n){"use strict";(function(t){n("18a1");a(n("66fd"));var e=a(n("03cf"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},9416:function(t,e,n){"use strict";n.r(e);var a=n("8770"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=o.a},f240:function(t,e,n){"use strict";var a=n("1d2a"),o=n.n(a);o.a}},[["939a","common/runtime","common/vendor"]]]);