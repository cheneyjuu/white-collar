<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">金融政策</block></cu-custom>
		
		<view class="cu-card case no-card">
			<view class="cu-item shadow">
				<view class="image" @click="viewForm">
					<image src="http://p8.itc.cn/images03/20200523/c5ff5f37f7a74e04b668cb409b8261c0.jpeg" mode="widthFix"></image>
					<view class="cu-bar bg-shadeBottom text-lg">
						<text class="cuIcon-rankfill text-white"><text style="padding-left: 16rpx;">500人</text></text>
					</view>
				</view>
		
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cus-title flex">
							<view class="title margin-top-xs"><text class="text-black text-xl text-cut">「两会」上的金融提案</text></view>
							<view class="sub-action text-gray margin-top-sm text-df margin-bottom-xs">
								<view class="author text-cut">
									<text>作者：新浪财经</text>
								</view>
								<text class="cuIcon-appreciatefill padding-lr-sm text-red"></text>
								25
								<text class="cuIcon-messagefill padding-lr-sm"></text>
								30
								<text class="cuIcon-favorfill padding-lr-sm text-red"></text>
								30
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-card case no-card margin-top-sm">
			<view class="cu-item shadow">
				<view class="image" @click="viewForm">
					<image src="http://www.dehua.net/file/upload/201907/18/162703952427.png" mode="widthFix"></image>
					<view class="cu-bar bg-shadeBottom text-lg">
						<text class="cuIcon-rankfill text-white"><text style="padding-left: 16rpx;">500人</text></text>
					</view>
				</view>
		
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cus-title flex">
							<view class="title margin-top-xs"><text class="text-black text-xl text-cut">关于做好疫情防控期间本市稳就业工作有关事项的通知</text></view>
							<view class="sub-action text-gray margin-top-sm text-df margin-bottom-xs">
								<view class="author text-cut">
									<text>作者：上海市人力资源和社会保障局</text>
								</view>
								<text class="cuIcon-appreciatefill padding-lr-sm text-red"></text>
								25
								<text class="cuIcon-messagefill padding-lr-sm"></text>
								30
								<text class="cuIcon-favorfill padding-lr-sm"></text>
								30
							</view>
						</view>
					</view>
				</view>
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
.content.flex-sub {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.cu-content {
	width: 100%;
	display: flex;
	padding: 0 28rpx;
	justify-content: space-between;
}
.cus-title {
	flex-direction: column;
	width: 100%;
	padding: 0 28rpx;
}
.title {
	display: flex;
	align-items: center;
}
.cus-title .title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.cus-title .sub-action {
	display: flex;
	justify-content: space-between;
}
.cus-title .sub-action .author {
	flex: 4;
}
.cus-activity {
	width: 100%;
	justify-content: space-between;
}
.activity-info {
	display: flex;
	flex-direction: column;
	flex: 7;
	padding-left: 28rpx;
}

.activity-action {
	display: flex;
	flex: 3;
	justify-content: flex-end;
	padding-right: 28rpx;
}
.cu-item .course {
	justify-content: flex-start;
}
.course-title {
	align-content: flex-start;
}
</style>
