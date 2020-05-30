<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true"><block slot="content">活动详情</block></cu-custom>
		<scroll-view>
			<view class="cu-card article no-card">
				<view class="cu-item bg-white">
					<view class="content margin-top-sm">
						<view class="desc" style="color: rgba(0,0,0,0.85); line-height: 1.8em;">
							<rich-text :nodes="activity.content"></rich-text>
						</view>
					</view>
				</view>
				<view class="cu-tabbar-height margin-bottom-sm"></view>
				<view class="cu-bar bg-white tabbar border shop foot">
					<button class="action text-red">
						<view class="cuIcon-appreciatefill"></view>
						点赞
					</button>
					<view class="action">
						<view class="cuIcon-favor"></view>
						收藏
					</view>
					<view class="action">
						<view class="cuIcon-share"></view>
						分享
					</view>
					<view class="bg-gradual-red submit" @click="activityRegister(activity.activityId)">立即报名</view>
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
			activity: {}
		}
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
				})
			}
		}
	},
	onLoad(params) {
		const activityId = params.activityId;
		this.loadActivityInfo(activityId);
	}
}
</script>

<style>
</style>
