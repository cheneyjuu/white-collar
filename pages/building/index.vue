<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">楼宇联盟</block></cu-custom>
		<view class="page">
			<view class="image" style="position: relative;"><image style="width: 100%;" src="https://s1.ax1x.com/2020/05/23/YvVQ4H.jpg" mode="widthFix"></image></view>

			<view class="flex justify-between padding-sm">
				<view class="image" style="width: 46vw; position: relative;">
					<image class="radius" src="https://s1.ax1x.com/2020/05/23/Yxu1sA.jpg" mode="widthFix"></image>
					<view style="position: absolute; bottom: 0.5em; left: 0.5em; font-size: 42rpx; color: #ffb725; font-weight: 500;">楼宇信息</view>
				</view>
				<view class="image" style="width: 46vw; position: relative;">
					<image class="radius" src="https://s1.ax1x.com/2020/05/23/Yxu1sA.jpg" mode="widthFix"></image>
					<view style="position: absolute; bottom: 0.5em; left: 0.5em; font-size: 42rpx; color: #ffb725; font-weight: 500;">企业需求</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">操作提示</view>
						<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
					</view>
					<view class="padding-xl">您还未登录，是否现在去登录？</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="gotoLogin">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			CustomBar: this.CustomBar,
			modalName: null
		};
	},
	methods: {
		hideModal(e) {
			this.modalName = null;
		},
		gotoLogin() {
			this.modalName = null;
			uni.reLaunch({
				url: '../mine/home'
			});
		}
	},
	onLoad() {
		const token = uni.getStorageSync('id_token');
		if (!token) {
			this.modalName = 'DialogModal1';
			return;
		}
	}
};
</script>

<style>
.page {
	/* padding-top: 45px; */
	background-color: #ffffff;
	height: 100vh;
}
</style>
