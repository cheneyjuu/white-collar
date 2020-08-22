<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="content">排行</block></cu-custom>
		<scroll-view class="container bg-blue" style="position: relative;">
			
			<view class="nav-box">
				<view class="left-arrow" @click="viewClick('manRanking')" style="position: fixed; top: 55%; left: 0;"><text class="cuIcon-back"></text></view>
				<view class="right-arrow" @click="viewClick('womanRanking')" style="position: fixed; top: 55%; right: 0;"><text class="cuIcon-right"></text></view>
			</view>
			
			<view class="user-box flex margin">
				<view class="avatar-container flex justify-end margin-right align-center">
					<view class="avatar-box">
						<image src="../../static/ranking/avatar.png" mode="widthFix"></image>
						<view
							class="cu-avatar round"
							:style="'background-image:url(' + userInfo.avatarUrl + ')'"
						></view>
						<text class="text-yellow rank-text" v-if="rankTitle">{{rankTitle}}</text>
						<text class="text-yellow rank-text" v-if="!rankTitle">暂无排名</text>
						
					</view>
				</view>
				<view class="user-info margin-left flex align-center">
					<view class="flex flex-direction justify-center">
						<view class="text-bold">{{currentUserInfo.userName}}</view>
						<view class="">{{rankTitle}}</view>
					</view>
				</view>
			</view>
			
			<view class="rank-container">
				<!-- <scroll-view style="height:100vh;" :scroll-into-view="toView" scroll-y="true"> -->
					<scroll-view id="manRanking" v-if="toView==='manRanking'">
						<view class="content" v-if="manData && manData.length > 0">
							<view class="rank-item" v-for="(item, index) in manData" :key="index">
								<view class="flex flex-direction justify-center">
									<image src="../../static/ranking/no1.png" mode="widthFix" v-if="index === 0" style="width: 60rpx; height: 60rpx;"></image>
									<image src="../../static/ranking/no2.png" mode="widthFix" v-else-if="index === 1" style="width: 60rpx; height: 60rpx;"></image>
									<image src="../../static/ranking/no3.png" mode="widthFix" v-else-if="index === 2" style="width: 60rpx; height: 60rpx;"></image>
									<view class="cu-avatar round" v-else>{{index + 1}}</view>
								</view>
								<view class="user-info-box flex align-center">
									<view
										class="cu-avatar round"
										:style="'background-image:url(' + item.avatar + ')'"
									></view>
									<view class="flex flex-direction margin-left padding-top-sm padding-bottom-sm">
										<view class="text-black padding-bottom-xs">{{item.userName}}</view>
										<!-- <view class="text-gray text-sm">{{item.completeDate}}</view> -->
									</view>
								</view>
								<view class="flex align-center justify-end text-gray text-sm">{{item.spendTime}}</view>
							</view>
						</view>
						<view v-if="!manData || manData.length === 0" class="flex justify-center padding">暂无排名</view>
					</scroll-view>
					<scroll-view id="womanRanking" v-if="toView === 'womanRanking'">
						<view class="content" v-if="womanData && womanData.length > 0">
							<view class="rank-item" v-for="(item, index) in womanData" :key="index">
								<view class="flex flex-direction justify-center">
									<image src="../../static/ranking/no1.png" mode="widthFix" v-if="index === 0" style="width: 60rpx; height: 60rpx;"></image>
									<image src="../../static/ranking/no2.png" mode="widthFix" v-else-if="index === 1" style="width: 60rpx; height: 60rpx;"></image>
									<image src="../../static/ranking/no3.png" mode="widthFix" v-else-if="index === 2" style="width: 60rpx; height: 60rpx;"></image>
									<view class="cu-avatar round" v-else>{{index + 1}}</view>
								</view>
								<view class="user-info-box flex align-center">
									<view
										class="cu-avatar round"
										:style="'background-image:url(' + item.avatar + ')'"
									></view>
									<view class="flex flex-direction margin-left padding-top-sm padding-bottom-sm">
										<view class="text-black padding-bottom-xs">{{item.userName}}</view>
										<!-- <view class="text-gray text-sm">{{item.completeDate}}</view> -->
									</view>
								</view>
								<!-- <view class="flex align-center justify-end text-gray text-sm">{{item.spendTime}}</view> -->
							</view>
						</view>
						<view v-if="!womanData || womanData.length === 0" class="flex justify-center padding">暂无排名</view>
					</scroll-view>
				<!-- </scroll-view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	data() {
		return {
			winHeight: '100%',
			toView: 'manRanking',
			manData: [],
			womanData: [],
			rankTitle: '',
			currentUserInfo: {},
			isRegisted: false,
			userInfo: uni.getStorageSync('userInfo')
		};
	},
	methods: {
		viewClick(e) {
			this.toView = e;
		},
		loadData(itemId) {
			const that = this;
			const token = uni.getStorageSync('id_token');
			const userInfo = uni.getStorageSync('userInfo');
			uni.showLoading({
				title: '统计中，请稍后...'
			})
			uni.request({
				url: `${constants.baseUrl}/races/items/${itemId}/ranking`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					const flag = false;
					uni.hideLoading();
					if (data) {
						that.manData = data['男'];
						if (that.manData) {
							
							that.manData.forEach((item, index) => {
								console.log('item', item);
								
								if (item.login === userInfo.openId) {
									if (index === 0) {
										that.rankTitle = '冠军';
									} else if (index === 1) {
										that.rankTitle = '亚军';
									}  else if (index === 2) {
										that.rankTitle = '季军';
									} else {
										that.rankTitle = '第 ' + (index + 1) + ' 名';
									}
									return;
								}
							});
						}
						that.womanData = data['女'];
						if (that.womanData) {
							that.womanData.forEach((item, index) => {
								console.log('item', item);
								
								if (item.login === userInfo.openId) {
									if (index === 0) {
										that.rankTitle = '冠军';
									} else if (index === 1) {
										that.rankTitle = '亚军';
									}  else if (index === 2) {
										that.rankTitle = '季军';
									} else {
										that.rankTitle = '第 ' + (index + 1) + ' 名';
									}
									return;
								}
							});
						}
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		secondToDate(result) {
			var h = Math.floor(result / 3600);
			var m = Math.floor((result / 60 % 60));
			var s = Math.floor((result % 60));
			return result = h + "时" + m + "分" + s + "秒";
		},
		loadCurrentUserInfo() {
			const that = this;
			const token = uni.getStorageSync('id_token');
			uni.request({
				url: `${constants.baseUrl}/account/current`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					that.currentUserInfo = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		loadCurrentUserPlayInfo(itemId) {
			const that = this;
			const token = uni.getStorageSync('id_token');
			uni.request({
				url: `${constants.baseUrl}/races/items/${itemId}/users/current`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					that.currentUserInfo = data;
					that.isRegisted = data === null ? false : true;
					console.log('registed', that.isRegisted);
					if (!data) {
						that.loadCurrentUserInfo();
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onLoad(param) {
		const {itemId} = param;
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo.gender === 1) {
			this.toView = 'manRanking';
		} else {
			this.toView = 'womanRanking';
		}
		// 先加载用户的报名信息，如果用户没有报名，再调用loadCurrentUserInfo()方法从账户表里加载用户的基本信息
		this.loadCurrentUserPlayInfo(itemId);
		this.loadData(itemId);
	}
};
</script>

<style>
page {
	height: 100%;
}
.container {
	min-height: 100vh;
	position: relative;
}
.user-box {
	margin-top: 60rpx;
}
.avatar-container {
	flex: 1;
}
.user-info {
	flex: 2;
}
.avatar-box {
	position: relative;
}
.avatar-box .rank-text {
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 12rpx;
	z-index: 2;
	font-size: 20rpx;
	font-weight: 500;
	color: #bb8b23;
	display: flex;
	justify-content: center;
}
.avatar-box image {
	position: relative;
	width: 120rpx;
	height: auto;
	z-index: 1;
}
.avatar-box view {
	position: absolute;
	width: 84rpx;
	height: 84rpx;
	top: 15rpx;
	left: 18rpx;
}
.rank-container {
	position: relative;
	min-height: 100vh;
	width: 100vw;
}
.nav-box view[class$='arrow']:nth-of-type(2) {
	right: 0;
}
.nav-box view[class$='arrow'] {
	position: absolute;
	top: 45%;
	font-size: 48rpx;
	margin: 0 15upx;
}
.rank-container {
	width: calc(100vw - 120upx);
	margin-left: 63rpx;
}

#manRanking {
	width: 100%;
	height: 100%;
	border-radius: 8rpx;
	padding: 10rpx;
	background: #54b2ff;
}
#womanRanking {
	width: 100%;
	height: 100%;
	border-radius: 8rpx;
	padding: 10rpx;
	background: #fda7df;
}

#manRanking .content, #womanRanking .content {
	border-radius: 8rpx;
	background: #ffffff;
	padding: 10upx;
}
.rank-item {
	display: flex;
	/* height: 80rpx; */
	margin: 10rpx 0;
}
.rank-item .user-info-box {
	padding-left: 30rpx;
}
.rank-item .user-info-box > view:first-child {
	width: 70rpx;
	height: 70rpx;
}
.rank-item > view {
	border-bottom: 1rpx solid #dddddd;
}
.rank-item:last-child > view {
	border-bottom: none;
}
.rank-item > view:nth-of-type(1) {
	flex: 1;
}
.rank-item > view:nth-of-type(2) {
	flex: 6;
}
.rank-item > view:nth-of-type(3) {
	flex: 3;
}
</style>
