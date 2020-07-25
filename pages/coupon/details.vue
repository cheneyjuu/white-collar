<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">优惠券</block></cu-custom>
		<view class="cu-card no-card article">
			<view class="cu-item">
				<view>
					<text class="text-bold text-lg padding" style="display: flex; flex-wrap: wrap;">{{couponInfo.title}}</text>
				</view>
				<view class="padding padding-top-xs text-gray solid-bottom">
					<text>有效期：{{couponInfo.startDate}} - {{couponInfo.endDate}}</text>
				</view>
				
				<view class="content margin-top-sm">
					<rich-text :nodes="couponInfo.content"></rich-text>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			couponInfo: {}
		}
	},
	methods: {
		loadCouponInfo(stringId) {
			const token = uni.getStorageSync('id_token');
			uni.request({
				url: `${constants.baseUrl}/welfare/coupons/${stringId}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const data = res.data.data;
					console.log(data);
					this.couponInfo = data;
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onLoad(param) {
		this.loadCouponInfo(param.couponId);
	}
};
</script>

<style></style>
