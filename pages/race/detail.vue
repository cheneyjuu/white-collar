<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">赛事详情</block></cu-custom>
		<view class="container">
			<view class="cover-image">
				<image :src="raceInfo.coverImage" mode="widthFix" style="width: 100vw; height: 80vw;"></image>
			</view>
			<view class="item-header">
				<view class="title text-xl">{{ raceInfo.title }}</view>
				<view class="flex justify-between text-gray text-sm margin-top-sm">
					<view class="cu-tag bg-red sm" v-if="raceInfo.type === 0">官方活动</view>
					<view class="cu-tag bg-green sm" v-if="raceInfo.type === 1">自发活动</view>
					<text>{{peopleCount}}人参赛</text>
				</view>
				<view class="flex text-gray text-sm margin-top-sm">
					<text class="cuIcon cuIcon-time padding-right-xs"></text>
					{{ raceInfo.matchStartDate }} ~ {{ raceInfo.matchEndDate }}
				</view>
				<view class="flex text-gray text-sm margin-top-sm">
					<text class="cuIcon cuIcon-location padding-right-xs" style="padding-top: 4rpx;"></text>
					{{ raceInfo.address }}
				</view>
			</view>
			<view class="item-body" style="margin-top: 80rpx;">
				<view class="title padding-sm">
					<view class="">
						<text class="cuIcon-titles text-red"></text>赛事项目
					</view>
					<view v-if="raceInfo.offLineFlag" class="text-gray">选择一条线路报名</view>
				</view>
				<view class="item" v-for="(item, index) in itemList" :key="index">
					<view>
						<view class="item-title"><text class="text-xl padding-right-xs">{{ item.title }}</text></view>
						<view class="sub-title text-sm text-gray">{{ item.description }}</view>
					</view>
					<view class="flex justify-between margin-top-xs padding-bottom-sm">
						<view class="amount text-red text-lg" v-if="item.freeFlag === true">免费</view>
						<view class="amount text-red text-lg" v-if="item.freeFlag === false">{{ item.amounts }}/人</view>
						
						<view class="" v-if="!raceInfo.offLineFlag">
							<button class="cu-btn round bg-orange sm margin-right-sm" @click="toViewRanking(item)" v-if="raceInfo.status >= 1 && item.registerFlag">查看排行</button>
							<button class="cu-btn round bg-red" @click="toRegister(item)" v-if="!item.registerFlag && raceInfo.status === 0">立即报名</button>
							<button class="cu-btn round bg-blue" v-if="item.isRegistered === true && raceInfo.status === 0">尚未开始</button>
							<button class="cu-btn round bg-blue" @click="startRace(item)" v-if="item.registerFlag === true && raceInfo.status === 1 && item.completeFlag === false">开始比赛</button>
							<button class="cu-btn round bg-gray" v-if="item.completeFlag === true">比赛完成</button>
						</view>
						<view v-if="raceInfo.offLineFlag">
							<button class="cu-btn round bg-gradual-red" @click="toRegister(item)" v-if="!item.registerFlag && raceInfo.status === 0 && globalRegisterFlag === false">立即报名</button>
							<button class="cu-btn round bg-gradual-blue" @click="toRegister(item)" v-if="item.registerFlag" style="letter-spacing: 8rpx;">已报名</button>
						</view>
					</view>
				</view>
			</view>
			<view class="item-body margin-top-sm margin-bottom">
				<view class="title padding-sm"><text class="cuIcon-titles text-red"></text>赛事详情</view>
				<view class="desc">
					<jyf-parser :html="raceInfo.content" ref="article"></jyf-parser>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">赛事信息</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">
					<text>{{itemInfo.description}}</text>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn" @tap="hideModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="startRace(itemInfo)">去比赛</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName2 == 'DialogModal2' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">您还未授权，请授权登录！</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal2">取消</button>
						<button class="cu-btn bg-green margin-left" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import jyfParser from '@/components/jyf-parser/jyf-parser';
export default {
	components: {
		jyfParser
	},
	data() {
		return {
			raceId: '',
			raceInfo: {},
			itemList: {},
			modalName: null,
			modalName2: null,
			itemInfo: {},
			itemId: '',
			entryStartDate: null,
			entryEndDate: null,
			matchStartDate: null,
			matchEndDate: null,
			status: null,
			globalRegisterFlag: false,
			peopleCount: 0
		};
	},
	methods: {
		hideModal2(e) {
			this.modalName2 = null;
		},
		wxGetUserInfo() {
			let that = this;
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					console.log({
						userinfo: infoRes
					});
					that.loginInfo = infoRes;
					that.nickName = infoRes.userInfo.nickName;
					that.avatarUrl = infoRes.userInfo.avatarUrl;
					try {
						uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
						that.login();
					} catch (e) {}
				},
				fail(res) {}
			});
		},
		login() {
			uni.removeStorageSync('sessionId');
			let that = this;
			const isCanUse = uni.getStorageSync('isCanUse');
			if (isCanUse === false) {
				uni.showLoading({
					title: '登录中...'
				});
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						if (!that.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									console.log({
										getUserInfo: infoRes
									});
									that.loginInfo = infoRes;
								}
							});
						}
						that.exchangeInfo(loginRes.code);
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		exchangeInfo(code) {
			const that = this;
			uni.request({
				url: `${constants.baseUrl}/global/login/app`,
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				data: {
					code: code,
					encryptedData: this.loginInfo.encryptedData,
					iv: this.loginInfo.iv
				},
				success: res => {
					const data = res.data;
					// retry
					if (res.statusCode === 500) {
						this.wxGetUserInfo();
						return;
					}
					console.dir(data);
					that.updateAccount(data);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		updateAccount(payload) {
			console.log('update account');
			console.log(payload);
			const that = this;
			uni.request({
				url: `${constants.baseUrl}/global/account`,
				method: 'POST',
				data: payload,
				success: res => {
					console.log(res);
					that.userInfo = payload;
					that.authentication(payload.openId);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		authentication(openId) {
			const that = this;
			uni.request({
				url: `${constants.baseUrl}/authenticate`,
				data: {
					username: openId,
					password: openId
				},
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					that.token = res.data.id_token;
					that.userInfo.avatarStyle = `background-image:url(${that.userInfo.avatarUrl})`;
					console.log(that.userInfo.avatarStyle);
					uni.setStorage({
						key: 'userInfo',
						data: that.userInfo
					})
					uni.setStorage({
						key: 'id_token',
						data: that.token,
						success: () => {
							uni.hideLoading();
						}
					});
					that.modalName2 = null;
					console.log('raceId', that.raceId);
					uni.navigateTo({
						url: '/pages/race/bindInfo/bindInfo?raceId=' + that.raceId
					})
				}
			});
		},
		loadData(raceId) {
			const token = uni.getStorageSync('id_token');
			uni.request({
				url: `${constants.baseUrl}/races/${raceId}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					data.matchStartDate = data.matchStartDate.substring(0, 16);
					data.matchEndDate = data.matchEndDate.substring(0, 16);
					this.matchStartDate = data.matchStartDate;
					this.matchEndDate = data.matchEndDate;
					this.entryStartDate = data.entryStartDate;
					this.entryEndDate = data.entryEndDate;
					this.raceInfo = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		loadItemData(raceId) {
			const that = this;
			const token = uni.getStorageSync('id_token');
			const userInfo = uni.getStorageSync('userInfo');
			uni.request({
				url: `${constants.baseUrl}/races/${raceId}/items/${userInfo.openId}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					const today = new Date();
					const year = today.getFullYear();
					let month = today.getMonth() + 1;
					month = month > 10 ? month : '0' + month;
					console.log(month);
					let day = today.getDate();
					day = day > 10 ? day : '0' + day;
					const todayStr = year + '-' + month + '-' + day;
					
					console.log('load item data');
					this.itemList = data;
					this.itemList.forEach(item => {
						console.log('item info');
						console.log(item);
						item.isRegistered = false;
						item.playerInfoList.forEach(user => {
							if (user.login === userInfo.openId) {
								item.isRegistered = true;
								that.globalRegisterFlag = true;
								// item.complete = user.completeFlag;
								return;
							}
						});
						
						const entryStart = new Date(that.entryStartDate).getTime();
						const entryEnd = new Date(that.entryEndDate).getTime();
						const matchStart = new Date(that.matchStartDate).getTime();
						const matchEnd = new Date(that.matchEndDate).getTime();
						console.log(todayStr, that.entryStartDate, that.entryEndDate, todayStr >=that.entryStartDate, todayStr <= that.entryEndDate );
						// 报名中
						// if (todayStr >= that.entryStartDate && todayStr <= that.entryEndDate) {
						// 	that.raceInfo.status = 0;
						// } else if (todayStr > that.entryEndDate && todayStr <= that.matchEndDate) {
						// 	that.raceInfo.status = 1;
						// } else if (todayStr > that.matchEndDate) {
						// 	that.raceInfo.status = 2;
						// }
					});
					console.log(data);
		
					for (let item of this.itemList) {
						if (item.playerInfoList && item.playerInfoList.length > 0) {
							that.peopleCount += item.playerInfoList.length;
						}
					}
					
					console.log(this.itemList);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		toRegister(item) {
			const {itemId} = item;
			const {raceId, offLineFlag} = this.raceInfo;
			this.itemId = itemId;
			const userInfo = uni.getStorageSync('userInfo');
			let isJoined = false;
			if (userInfo) {				
				item.playerInfoList.forEach(function(user) {
					if (user.login === userInfo.openId) {
						console.log(user);
						isJoined = true;
					}
				});
			}
			if (isJoined) {
				uni.showToast({
					icon: 'none',
					title: '请勿重复报名!'
				})
				return;
			}
			uni.navigateTo({
				url: `/pages/race/register?raceId=${raceId.id}&itemId=${itemId.id}&offLineFlag=${offLineFlag}`
			})
		},
		startRace(item) {
			const that = this;
			wx.getSetting({
				success:function(res){
					if (res.authSetting['scope.userLocation'] === false) {
						wx.showModal({
						title: '您未开启地理位置授权',
						content: '授权后才能开始比赛',
						success: res => {
						  if (res.confirm) {
							wx.openSetting();
						  }
						}
					  })
					} else {
						const {itemId} = item;
						const userInfo = uni.getStorageSync('userInfo');
						let isJoined = false;
						if (userInfo) {
							const playerInfoList = item.playerInfoList;
							playerInfoList.forEach(function(user) {
								if (user.login === userInfo.openId) {
									console.log(user);
									isJoined = true;
								}
							});
						}
						
						const {lng, lat, raceId} = that.raceInfo;
						that.modalName = null;
						const checkInType = that.raceInfo.checkInType ? that.raceInfo.checkInType : 'IN_ORDER';
						if (checkInType === 'IN_ORDER') {
							uni.navigateTo({
								url: `/pages/race/raceMap?lng=${lng}&lat=${lat}&raceId=${raceId.id}&itemId=${itemId.id}`
							})
						} else {
							uni.navigateTo({
								url: `/pages/race/randomMap?lng=${lng}&lat=${lat}&raceId=${raceId.id}&itemId=${itemId.id}`
							})
						}
					}
				}
			});
		},
		viewItem(item) {
			this.itemInfo = item;
			this.modalName = 'DialogModal1';
		},
		hideModal(e) {
			this.modalName = null;
		},
		getDistance(lat1, lng1, lat2, lng2) {
			var dis = 0;
			var radLat1 = toRadians(lat1);
			var radLat2 = toRadians(lat2);
			var deltaLat = radLat1 - radLat2;
			var deltaLng = toRadians(lng1) - toRadians(lng2);
			var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
			return dis * 6378137;
			function toRadians(d) {  return d * Math.PI / 180;}
		},
		toViewRanking(item) {
			uni.navigateTo({
				url: `/pages/race/ranking?itemId=${item.itemId.id}`
			})
		}
	},
	onLoad(param) {
		const raceId = param.raceId;
		this.raceId = raceId;
		
	},
	onShow(param) {
		if (this.raceId) {
			this.peopleCount = 0;
			this.loadData(this.raceId);
			this.loadItemData(this.raceId);
		}
		const token = uni.getStorageSync('id_token');
		if (!token) {
			this.modalName2 = 'DialogModal2';
		} else {
			wx.getLocation({
				type: 'gcj02',
				success:function(){
					console.log('地理位置获取成功');
				}
			});
		}
	},
	onShareAppMessage() {
		return {
			title: this.raceInfo.title,
			path: '/pages/race/detail?raceId=' + this.raceId,
			imageUrl: this.raceInfo.coverImage
		}
	}
};
</script>

<style>
.container {
	height: 100vh;
	width: 100vw;
	position: relative;
}
.item-header {
	position: absolute;
	width: 100%;
	top: 20%;
	border-top-left-radius: 10rpx;
	border-top-right-radius: 10rpx;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 30upx;
}
.amount {
	line-height: 72rpx;
}
.item-body {
	position: relative;
	top: 3%;
	/* padding: 30upx; */
	background-color: #ffffff;
}
.item-body .item:not(:first-child) {
	padding-top: 20rpx;
}
.item-body .item:not(:last-child) {
	border-bottom: 1rpx solid #efefef;
}
.item-body .item > view {
	padding-left: 20rpx;
	padding-right: 20rpx;
}
.item-body > .title {
	line-height: 2.25em;
	border-bottom: 1rpx solid #efefef;
	margin-bottom: 20upx;
}
.solid-line {
	border: 1rpx solid #efefef;
	margin: 10rpx 0;
}
</style>
