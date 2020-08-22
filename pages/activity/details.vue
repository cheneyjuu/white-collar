<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">活动详情</block></cu-custom>
		<scroll-view>
			<view class="cu-card article no-card">
				<view class="cu-item bg-white">
					<view class="content margin-top-sm">
						<view class="desc" style="color: rgba(0,0,0,0.85); line-height: 1.8em;"><rich-text :nodes="activity.content"></rich-text></view>
					</view>
				</view>
				<view class="cu-tabbar-height margin-bottom-sm"></view>
				<view class="cu-bar bg-white tabbar border shop foot">
					<button class="action" :class="activity.userLikeFlag === true ? 'text-red' : ''" @click="onInteractive(activity, 'LIKE')">
						<view :class="activity.userLikeFlag === true ? 'cuIcon-appreciatefill' : 'cuIcon-appreciate'"></view>
						点赞
					</button>
					<button class="action" :class="activity.userFavorFlag === true ? 'text-red' : ''" @click="onInteractive(activity, 'FAVOR')">
						<view :class="activity.userFavorFlag === true ? 'cuIcon-favorfill' : 'cuIcon-favor'"></view>
						收藏
					</button>
					<button class="action" open-type="share">
						<view class="cuIcon-share"></view>
						分享
					</button>
					<!-- <view class="bg-gradual-red submit" @click="activityRegister(activity.activityId)" v-if="activity.outOfDateFlag === false">立即报名</view>
					<view class="bg-gray submit" v-if="activity.outOfDateFlag === true">已过期</view> -->
					<view class="bg-gradual-red submit" @click="toRegister()" v-if="(activity.registerFlag === false && !activity.outOfDateFlag) || activity.activityId.id === '395550105019392'">立即报名</view>
					<view class="bg-gradual-blue submit" v-if="activity.registerFlag === true && !activity.outOfDateFlag && activity.activityId.id !== '395550105019392'">已报名</view>
					<view class="bg-gray submit" v-if="activity.outOfDateFlag === true">已过期</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			activity: {},
			payload: {}
		};
	},
	methods: {
		loadActivityInfo(activityId) {
			uni.request({
				url: `${constants.baseUrl}/activities/${activityId}/details`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					this.activity = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		activityRegister(activityId) {
			const token = this.token;
			if (!token) {
				uni.reLaunch({
					url: `/pages/mine/home?activityId=` + activityId.id
				});
				return;
			} else {
				uni.navigateTo({
					url: '/pages/activity/signup?activityId=' + activityId.id
				});
			}
		},
		onShare() {
			uni.showShareMenu({
				success() {
					console.log('share success');
				}
			});
		},
		onInteractive(item, type) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				uni.showToast({
					icon: 'none',
					title: '您还未登录'
				});
				return;
			}
			const param = {
				recordId: item.activityId.id,
				recordType: 'ACTIVITY',
				interactiveType: type
			};
			uni.request({
				url: `${constants.baseUrl}/interactive`,
				data: param,
				method: 'POST',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const data = res.data;
					if (data.code === 200) {
						if (type === 'LIKE') {
							if (data.data !== null) {
								item.userLikeFlag = true;
							} else {
								item.userLikeFlag = false;
							}
						}
						if (type === 'FAVOR') {
							if (data.data !== null) {
								item.userFavorFlag = true;
							} else {
								item.userFavorFlag = false;
							}
						}
					}
				}
			});
		},
		toRegister() {
			const that = this;
			const token = uni.getStorageSync('id_token');
			if (!token) {
				uni.showToast({
					icon: 'none',
					title: '您还未登录'
				});
				return;
			}
			if (that.activity.activityId && that.activity.activityId.id === '395550105019392') {
				this.recordPresonInfo();
				wx.navigateToMiniProgram({
				  appId: 'wxc364791141684366',
				  path: '/pages/match/detail/index?matchid=7665',
				  extraData: {},
				  envVersion: 'release',
				  success(res) {
					console.log('跳转成功');
					console.log(res);
				  }
				})
			} else {
				uni.navigateTo({
					url: '/pages/activity/signup?activityId=' + that.activity.activityId.id,
				})
			}
		},
		recordPresonInfo() {
			const token = uni.getStorageSync('id_token');
			this.payload.activityId = this.activity.activityId;
			uni.request({
				url: `${constants.baseUrl}/activities/register`,
				method: 'POST',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				data: this.payload,
				success: res => {
					console.log(res);
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onLoad(params) {
		const activityId = params.activityId;
		this.loadActivityInfo(activityId);
	},
	onShareAppMessage() {
		return {
			title: this.activity.title,
			path: '/pages/activity/details?activityId=' + this.activity.activityId.id,
			imageUrl: this.activity.coverImage
		};
	}
};
</script>

<style></style>
