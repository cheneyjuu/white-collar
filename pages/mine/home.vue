<template name="mine">
	<view>
		<cu-custom bgColor="bg-white"><block slot="content">个人中心</block></cu-custom>
		<scroll-view scroll-y class="page">
			<view class="cu-card case bg-gradual-orange" :class="'no-card'">
				<view class="user-box flex justify-center align-center">
					
					<view class="flex flex-direction align-center"  v-if="!token">
						<view
							class="cu-avatar xl radius"
							style="background-image:url(http://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png);"
						></view>
						<view class="margin-top-sm text-df">
							<button class="cu-btn round shadow shadow-blur" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
								点击授权
							</button>
						</view>
					</view>
					
					
					<view class="flex flex-direction align-center" v-else-if="token">
						<view class="cu-avatar xl radius" :style="userInfo.avatarStyle"></view>
						<view class="margin-top-sm text-df">
							{{userInfo.nickName}}
						</view>
					</view>
				</view>
			</view>
			

			<!-- list -->
			<view class="cu-list menu margin-top-lg text-lg">
				<view class="cu-item" :class="'arrow'">
					<view class="content">
						<text class="cuIcon-footprint text-orange"></text>
						<text class="text-grey">我的足迹</text>
					</view>
				</view>
				<view class="cu-item" :class="'arrow'">
					<view class="content">
						<text class="cuIcon-favor text-orange"></text>
						<text class="text-grey">我的收藏</text>
					</view>
				</view>
				<view class="cu-item" :class="'arrow'">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-activity text-orange"></text>
						<text class="text-grey">我的活动</text>
					</button>
				</view>
				<view class="cu-item" :class="'arrow'">
					<navigator class="content" hover-class="none">
						<text class="cuIcon-notice text-orange"></text>
						<text class="text-grey">消息通知</text>
					</navigator>
				</view>
				<view class="cu-item" :class="'arrow'">
					<navigator class="content" hover-class="none">
						<text class="cuIcon-ticket text-orange"></text>
						<text class="text-grey">我的优惠券</text>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	name: 'mine',
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			token: uni.getStorageSync('id_token'),
			loginInfo: {},
			userInfo: uni.getStorageSync('userInfo'),
			activityId: ''
		};
	},
	methods: {
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
					// 活动报名，如果没有登录，会调整到本页面，并携带活动 ID 参数，在授权完成后，再跳转回原报名页面
					if (this.activityId) {
						uni.navigateTo({
							url: '/pages/activity/details?activityId=' + this.activityId
						})
					}
				}
			});
		}
	},
	onLoad(param) {
		if (param) {
			this.activityId = param.activityId;
		}
	}
};
</script>

<style>
.user-box {
	height: 260rpx;
}
</style>
