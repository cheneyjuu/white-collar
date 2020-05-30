<template>
	<view class="page bg-white">
		<cu-custom bgColor="bg-gradual-red" :isBack="true"><block slot="content"></block></cu-custom>
		<view class="flex bg-gradual-red message-box align-center justify-center text-xxl text-bold">
			<text class="cuIcon-evaluate padding-lr-sm"></text> 恭喜，您已报名成功
		</view>
		<view class="image flex justify-center margin-top-lg">
			<image class="radius bg-img" src="http://image1.askci.com/images/2016/11/15/22e771d3-ebd7-4807-9de3-8e780792f316.jpg" mode="widthFix"></image>
		</view>
		<view class="flex justify-between margin">
			<view class="flex flex-direction padding-right" style="flex: 6;">
				<view class="text-xxl text-black">
					<text>华为2020春季新品发布会</text>
				</view>
				<view class="margin-top-sm">
					[下午2:51:59]华为宣布在中国上市三款不同的Mate9，分别为Mate9/Pro，保时捷设计版本，给消费者更多选择
				</view>
			</view>
			<view class="image flex flex-direction" style="flex: 4;">
				<image style="width: 100%; height: auto;" src="https://wx1.sbimg.cn/2020/05/20/oiCWC4pDTm9Ea5nRrAVcYrTz2s4E.jpg" mode="widthFix"></image>
				<text class="text-gray text-center">长按识别二维码</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
.page {
	height: 100vh;
}
.message-box {
	height: 200rpx;
}
.bg-img {
	width: 690rpx;
}
</style>
