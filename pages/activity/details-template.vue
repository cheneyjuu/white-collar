<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true"><block slot="content">活动详情</block></cu-custom>
		<view class="box">
			<view class="cu-card case" :class="'no-card'">
				<view class="cu-item shadow">
					<view class="image"><image src="http://px.thea.cn/Public/Upload/Uploadfiles/image/20190104/20190104135707_26297.jpg" mode="widthFix"></image></view>
					<view class="text-xl padding">华为新品发布会(让我们一起见证国货的崛起)</view>
					<view class="cu-list menu-avatar">
						<view class="text-gray padding-left">
							<text class="cuIcon-appreciatefill margin-lr-xs"></text>
							25
							<text class="cuIcon-favorfill margin-lr-xs"></text>
							30
						</view>
						<view class="padding">
							<view class="margin-lr-xs flex justify-between">
								<text class="text-xl text-green">免费</text>
								<view>
									<button class="cu-btn round bg-gradual-red" @click="signup">立即报名</button>
								</view>
							</view>
							<view class="padding-top-sm text-gray">
								<text class="cuIcon-calendar margin-lr-xs"></text>
								2020.06.01 09:30 - 2020.06.03 17:30
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-card article margin-top-sm" :class="'no-card'">
				<view class="cu-item shadow">
					<view class="title">
						<view class="flex justify-between">
							<view class="flex align-center">								
								<view class="cu-tag bg-red light sm round margin-right-sm">官方</view>
								<view class="text-cut">IT高管会</view>
							</view>
							<view class="text-red text-shadow">
								<text class="cuIcon-add margin-lr-xs"></text>关注
							</view>
						</view>
					</view>
					<view class="content">
						<view class="cu-avatar xl round" style="background-image:url(http://px.thea.cn/Public/Upload/Uploadfiles/image/20190104/20190104135707_26297.jpg);"></view>
						<view class="desc padding-left">
							<view class="text-content">IT高管会由5000多名活跃的会员和30万注册用户组成，采用实名制、推荐制。</view>
							<!-- <view class="cu-item flex justify-end">
								<button class="cu-btn round bg-gradual-red">
									<text class="cuIcon-add margin-lr-xs"></text>
									关注
								</button>
							</view> -->
						</view>
					</view>
				</view>
			</view>
			
			<!-- 活动详情 -->
			<view class="cu-bar bg-white">
				<view class="action sub-title">
					<text class="text-xl text-bold text-red">活动详情</text>
					<text class="text-ABC text-red">detail</text>
					<!-- last-child选择器-->
				</view>
			</view>
			<view class="cu-card article" :class="'no-card'">
				<view class="cu-item">
					<view class="content">
						<view class="desc" style="color: rgba(0,0,0,0.65); line-height: 1.8em;">
							IT之家2月25日消息 在今天晚上举行的华为终端与战略布局线上发布会上，华为发布了全新的HUAWEI
							AppGallery应用商店，其服务全球170+国家及地区的6亿华为终端用户。在发布会上，华为消费者业务CEO余承东还隆重介绍了HMS Core 4.0。
							<view class="image margin-top-sm matin-bottom-sm"><image src="http://img.mp.itc.cn/upload/20161114/b7fc0682387b48a39ee75eee1f685dc7_th.jpg" mode="widthFix"></image></view>
							<text class="text-lg text-bold padding-bottom-sm">什么是HMS Core？</text>
							华为HMS
							Core是华为终端云服务开放能力合集，这些能力和服务将会帮助应用获得更多的用户、更高的活跃度，和更高效的商业成功，实现一点接入、全球全场景全终端的智慧分发，让开发者专注于创新，为华为终端用户带来更多、更好的全场景智慧生活体验。会议现场，余承东介绍了HMS
							Core 4.0提供多个服务与能力。 华为机器学习服务(ML
							Kit）可以组合使用人脸检测、文本识别、对象检测与跟踪、图像标记标签、地标识别等能力。其中，人脸检测已支持7种表情、3大特征和845点人脸轮廓。手机应用有了机器学习服务（ML
							Kit）的加持，可以智慧连接各种生活场景，如办理业务证录入、旅游地标导航分享、美颜特效拍照等。
						</view>
					</view>
				</view>
			</view>
			
			<!-- 操作条 -->
			<view class="cu-bar bg-white tabbar border shop">
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
				<view class="bg-gradual-red submit" @click="signup">立即报名</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		signup: function() {
			uni.navigateTo({
				url: '../activity/signup'
			});
		}
	}
};
</script>

<style>
.padding-left-0 {
	padding-left: 0;
}
.box view.cu-bar {
	margin-top: 20upx;
}
</style>
