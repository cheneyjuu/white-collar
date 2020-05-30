<template name="coupon">
	<view>
		<cu-custom bgColor="bg-gradual-red"><block slot="content">领券中心</block></cu-custom>
		<block>
			<view class="cu-card no-card bg-white padding" style="height: 260rpx;">
				<view class="flex">
					<view class="flex" style="flex: 3;">
						<image class="radius" style="width: 100%; height: auto;" src="http://p1.meituan.net/dpdeal/9a3c909a4bab0bc0368d688f48045382564542.jpg" mode="aspectFill"></image>
					</view>
					<view class="flex padding-left" style="flex: 7">
						<view class="flex flex-direction" style="width: 100%;">
							<view class="title block">
								<view class="text-cut text-bold text-lg">Dora 精剪造型优惠券</view>
							</view>
							<view class="flex padding-top-sm">
								<view class="flex flex-direction" style="flex: 6;">
									<view class="padding-top-xs">
										<text>价格：</text>
										<text class="text-price text-red">158</text>
									</view>
									<view class="padding-top-xs">
										<text>有效期：15天</text>
									</view>
									<view class="padding-top-xs">
										<text>数量：200张</text>
									</view>
								</view>
								<view class="flex" style="flex: 4; align-items: flex-end;">
									<button class="cu-btn round bg-gradual-red">立即领取</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-card no-card bg-white padding margin-top-sm" style="height: 260rpx;">
				<view class="flex">
					<view class="flex" style="flex: 3;">
						<image class="radius" style="width: 100%; height: auto;" src="http://qcloud.dpfile.com/pc/21dMEQ_8zHLk_CGoc392MbFodsgPvN-vO5cZIkykmFVxllMigM3xkOBwUgizytEnTYGVDmosZWTLal1WbWRW3A.jpg" mode="aspectFill"></image>
					</view>
					<view class="flex padding-left" style="flex: 7">
						<view class="flex flex-direction" style="width: 100%;">
							<view class="title block">
								<view class="text-cut text-bold text-lg">华尔道夫Spa体验券</view>
							</view>
							<view class="flex padding-top-sm">
								<view class="flex flex-direction" style="flex: 6;">
									<view class="padding-top-xs">
										<text>价格：</text>
										<text class="text-price text-red">288</text>
									</view>
									<view class="padding-top-xs">
										<text>有效期：15天</text>
									</view>
									<view class="padding-top-xs">
										<text>数量：319张</text>
									</view>
								</view>
								<view class="flex" style="flex: 4; align-items: flex-end;">
									<button class="cu-btn round bg-gradual-red">立即领取</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	name: 'coupon',
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			list: [
				{
					title: '优惠券',
					img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
					url: '../coupon/list'
				}
			]
		};
	},
	onShow() {
		console.log('coupon loaded');
	},
	methods: {}
};
</script>

<style>
.coupon-img {
	display: flex;
	flex: 3;
}
.coupon-content {
	flex: 7;
	display: flex;
	flex-direction: column;
}
.coupon-detail {
	display: flex;
	justify-content: space-between;
}
.coupon-detail-text {
	display: flex;
	flex-direction: column;
}
</style>
