<template name="square">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-white"><block slot="content">首页</block></cu-custom>
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in firstBannerList" :key="index" @click="viewBanner(item)"><image :src="item.coverImage" mode="aspectFill"></image></swiper-item>
			</swiper>

			<view class="cu-list grid" :class="['col-4', 'no-border']">
				<view class="cu-item" v-for="(item, index) in cuIconList" :key="index" v-if="index < gridCol * 2">
					<view :class="['cuIcon-' + item.cuIcon, 'text-' + item.color]" style="font-size: 64rpx;" @click="viewSubMenu(index)">
						<view class="cu-tag badge" v-if="item.badge != 0">
							<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
						</view>
					</view>
					<text class="text-black text-bold">{{ item.name }}</text>
				</view>
			</view>

			<swiper
				class="card-swiper square-dot"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				interval="6000"
				duration="500"
				@change="cardSwiper"
				indicator-color="#8799a3"
				indicator-active-color="#dc3633"
			>
				<swiper-item v-for="(item, index) in secondBannerList" :key="index" :class="adCardCur == index ? 'cur' : ''">
					<view class="swiper-item" @click="viewBanner(item)"><image :src="item.coverImage" mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>

			<view class="cu-bar solid-bottom text-red no-card" style="margin-bottom: -20upx;">
				<view class="action">
					<text class="cuIcon-activity" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">白领活动</text>
				</view>
			</view>
			<view class="cu-card case no-card activity-list" v-for="(item, index) in activityData" :key="index">
				<view class="cu-item shadow">
					<view class="title padding-left padding-top">
						<view class="cu-tag bg-red light sm round margin-right-sm" v-if="item.type === 0">{{ item.typeStr }}</view>
						<view class="cu-tag bg-green light sm round margin-right-sm" v-if="item.type === 1">{{ item.typeStr }}</view>
						<view class="text-cut text-xl">{{ item.title }}</view>
					</view>
					<view class="image" @click="viewActivityDetails(item.activityId)"><image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image></view>
					<view class="cu-list menu-avatar">
						<view class="cu-item cus-activity">
							<view class="activity-info solid-bottom padding">
								<view class="text-gray">
									<text class="cuIcon-peoplelist margin-lr-xs"></text>
									<text class="text-lg text-red">{{ item.registeredCount }}</text>
									/{{ item.peopleLimitFlag ? item.peopleLimit : '不限' }}
								</view>
								<view class="text-gray padding-top-xs">
									<text class="cuIcon-calendar margin-lr-xs"></text>
									{{ item.startDate }}
								</view>
							</view>
							<view class="activity-action"><button class="cu-btn round bg-gradual-red" @click="viewActivityDetails(item.activityId)">查看详情</button></view>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-bar solid-bottom text-red no-card margin-top" style="margin-bottom: -20upx;">
				<view class="action">
					<text class="cuIcon-newsfill" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">政策信息</text>
				</view>
			</view>
			<view v-for="(item, index) in policyList" :key="index">
				<view class="cu-card case no-card">
					<view class="cu-item shadow">
						<view class="title margin">
							<text class="text-black text-xl text-cut">{{ item.title }}</text>
						</view>
						<view class="image" @click="viewPolicyDetails(item.topicId)">
							<image :src="item.coverImage" mode="widthFix"></image>
							<!-- <view class="cu-bar bg-shadeBottom text-lg">
								<text class="cuIcon-rankfill text-white"><text style="padding-left: 16rpx;">500人</text></text>
							</view> -->
						</view>

						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cus-title flex">
									<view class="sub-action text-gray margin text-df">
										<!-- <view class="author text-cut"><text>作者：新浪财经</text></view> -->
										<view class="flex justify-around" style="width: 100%;">
											<view class="">
												<text
													class="cuIcon-appreciatefill padding-lr-sm"
													:class="item.userLikeFlag === true ? 'text-red' : ''"
													@click="onInteractive(item, 'LIKE')"
												></text>
												{{ item.likeCount }}
											</view>
											<view class="">
												<text class="cuIcon-messagefill padding-lr-sm"></text>
												30
											</view>
											<view class="">
												<text
													class="cuIcon-favorfill padding-lr-sm"
													:class="item.userFavorFlag === true ? 'text-red' : ''"
													@click="onInteractive(item, 'FAVOR')"
												></text>
												{{ item.favorCount }}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-bar solid-bottom text-red no-card margin-top" style="margin-bottom: -20upx;">
				<view class="action">
					<text class="cuIcon-discover" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">白领创潮</text>
				</view>
			</view>
			<view class="cu-card case no-card" v-for="(item, index) in topicList" :key="index">
				<view class="cu-item shadow">
					<view class="flex align-center padding-left padding-top">
						<!-- <view class="cu-tag bg-green light sm round margin-right-sm">自发</view> -->
						<view class="text-cut text-xl">{{ item.title }}</view>
					</view>
					<view class="image" @click="viewTopicDetails(item.topicId)"><image :src="item.coverImage"></image></view>
					<view class="cu-list menu-avatar">
						<view class="cu-item cus-activity">
							<view class="activity-info solid-bottom padding">
								<!-- <view class="text-gray">
									<text class="cuIcon-peoplelist margin-lr-xs"></text>
									<text class="text-lg text-red">31</text>
									/50
								</view> -->
								<view class="text-gray padding-top-xs">
									<text class="cuIcon-calendar margin-lr-xs"></text>
									{{ item.createdDate }}
								</view>
							</view>
							<view class="activity-action"><button class="cu-btn round bg-gradual-red" @click="viewTopicDetails(item.topicId)">查看详情</button></view>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-bar solid-bottom text-red no-card margin-top" style="margin-bottom: -20upx;">
				<view class="action">
					<text class="cuIcon-discover" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">楼宇联盟</text>
				</view>
			</view>
			<view class="cu-card article case no-card " v-for="(item, index) in buildingList" :key="index">
				<view class="cu-item shadow" @click="viewBuildingDetails(item.topicId)">
					<view class="content margin-top-sm flex flex-direction">
						<view class="text-cut text-xl">{{ item.title }}</view>
						<!-- <view class="text-gray text-sm padding-top-sm">{{item.summary}}</view> -->
					</view>
					<view class="image"><image :src="item.coverImage" mode="widthFix"></image></view>
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
			<!-- <view class="cu-tabbar-height margin-bottom-sm"></view> -->
		</scroll-view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	name: 'square',
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			activityData: [],
			cardCur: 0,
			adCardCur: 0,
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: 'https://s1.ax1x.com/2020/05/24/Yztohd.jpg'
				},
				{
					id: 1,
					type: 'image',
					url: 'https://s1.ax1x.com/2020/05/24/Yzt5Ae.jpg'
				},
				{
					id: 2,
					type: 'image',
					url: 'https://s1.ax1x.com/2020/05/23/Yxngvd.jpg'
				},
				{
					id: 3,
					type: 'image',
					url: 'https://s1.ax1x.com/2020/05/23/YvVQ4H.jpg'
				},
				{
					id: 4,
					type: 'image',
					url: 'https://bkimg.cdn.bcebos.com/pic/023b5bb5c9ea15ce36d3e190bd492df33a87e950145b?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U5Mg==,xp_5,yp_5'
				}
			],
			adSwiperList: [
				// 直播
				{
					id: 0,
					type: 'image',
					url: 'https://s1.ax1x.com/2020/05/24/YzNvKx.png'
				},
				// 问卷调查
				{
					id: 1,
					type: 'image',
					url: 'http://img1.imgtn.bdimg.com/it/u=203303443,3834206322&fm=26&gp=0.jpg'
				},
				// 企业服务
				{
					id: 2,
					type: 'image',
					url: 'http://5b0988e595225.cdn.sohucs.com/images/20180119/fabd2cf216114be0b460c7f4a0d0563c.jpeg'
				}
			],
			dotStyle: false,
			towerStart: 0,
			direction: '',
			cuIconList: [
				{
					cuIcon: 'newsfill',
					color: 'yellow',
					badge: 0,
					name: '政策信息'
				},
				{
					cuIcon: 'creativefill',
					color: 'blue',
					badge: 0,
					name: '白领创潮'
				},
				{
					cuIcon: 'shopfill',
					color: 'red',
					badge: 0,
					name: '楼宇联盟'
				},
				{
					cuIcon: 'upstagefill',
					color: 'orange',
					badge: 0,
					name: '白领赛事'
				}
			],
			modalName: null,
			gridCol: 4,
			gridBorder: false,
			menuBorder: false,
			menuArrow: false,
			menuCard: false,
			skin: false,
			listTouchStart: 0,
			listTouchDirection: null,
			firstBannerList: [],
			secondBannerList: [],
			policyList: [],
			topicList: [],
			buildingList: []
		};
	},
	methods: {
		viewForm: function() {
			uni.navigateTo({
				url: '../square/form'
			});
		},
		cardSwiper(e) {
			this.adCardCur = e.detail.current;
		},
		viewH5Page(url) {
			uni.navigateTo({
				url: '/pages/activity/h5view?url=' + url
			});
		},
		viewQuestionnaire() {
			uni.navigateTo({
				url: '/pages/square/questionnaire'
			});
		},
		viewBanner(item) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			if (item.channel === 'ACTIVITY') {
				uni.navigateTo({
					url: `/pages/activity/details?activityId=${item.uniId}`
				});
			}
			if (item.channel === 'TOPIC') {
				if (item.articleType === 'FINANCIAL_POLICY') {
					uni.navigateTo({
						url: `/pages/policy/details?topicId=${item.uniId}`
					});
				}
				if (item.articleType === 'WHITE_COLLAR_CREATOR') {
					uni.navigateTo({
						url: `/pages/topic/details?topicId=${item.uniId}`
					});
				}
				if (item.articleType === 'BUILDING') {
					uni.navigateTo({
						url: `/pages/building/details?topicId=${item.uniId}`
					});
				}
				if (item.articleType === 'VOTE') {
					uni.navigateTo({
						url: `/pages/vote/home?voteId=${item.uniId}`
					});
				}
			}
			if (item.channel === 'VOTE') {
				uni.navigateTo({
					url: `/pages/vote/home?voteId=${item.uniId}`
				});
			}
			if (item.channel === 'RACE') {
				uni.navigateTo({
					url: `/pages/race/detail?raceId=${item.uniId}`
				});
			}
		},
		adImgClicked(index) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			if (index === 0) {
				// 直播
				uni.navigateTo({
					url: '/pages/activity/h5view?url=https://mp.weixin.qq.com/s/Z7i2EotzhnObWzNOVZERnA'
				});
			} else if (index === 1) {
				// 调查问卷
				uni.navigateTo({
					url: '/pages/square/questionnaire'
				});
			}
			// else if (index === 2) {
			// 	// 企业服务
			// 	uni.navigateTo({
			// 		url: '../activity/h5view?url=https://mp.weixin.qq.com/s/7vA5McVtg0COvAlLzNe9bQ'
			// 	});
			// }
		},
		viewSubMenu(index) {
			console.log(index);
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/policy/index?articleType=0'
				});
			}
			if (index === 1) {
				uni.navigateTo({
					url: '/pages/topic/home'
				});
			}
			if (index === 2) {
				uni.navigateTo({
					url: '/pages/building/index'
				});
			}
			if (index === 3) {
				uni.navigateTo({
					url: '/pages/race/race'
				});
			}
		},
		// 对接后台
		loadActivity() {
			uni.request({
				url: `${constants.baseUrl}/activities/index`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					if (data) {
						data.forEach(item => {
							item.typeStr = item.type === 0 ? '官方' : '自发';
						});
					}
					this.activityData = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		viewActivityDetails(activityId) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			uni.navigateTo({
				url: `/pages/activity/details?activityId=${activityId.id}`
			});
		},
		// 获取一级 Banner
		loadBanners() {
			uni.request({
				url: `${constants.baseUrl}/banners`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					console.log(data);
					this.firstBannerList = data['firstBannerList'];
					this.secondBannerList = data['secondBannerList'];
				},
				fail: () => {},
				complete: () => {}
			});
		},
		loadPolicyData() {
			uni.request({
				url: `${constants.baseUrl}/topic/index?articleType=0`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					this.policyList = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		loadTopicData() {
			uni.request({
				url: `${constants.baseUrl}/topic/index?articleType=1`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					this.topicList = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		loadBuildingData() {
			uni.request({
				url: `${constants.baseUrl}/topic/index?articleType=2`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					this.buildingList = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		viewPolicyDetails(topicId) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			uni.navigateTo({
				url: `/pages/policy/details?topicId=${topicId.id}`
			});
		},
		viewTopicDetails(topicId) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			uni.navigateTo({
				url: `/pages/topic/details?topicId=${topicId.id}`
			});
		},
		viewBuildingDetails(topicId) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			uni.navigateTo({
				url: `/pages/building/details?topicId=${topicId.id}`
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
				recordId: item.topicId.id,
				recordType: item.articleType,
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
								item.likeCount += 1;
							} else {
								item.userLikeFlag = false;
								item.likeCount -= 1;
							}
						}
						if (type === 'FAVOR') {
							if (data.data !== null) {
								item.userFavorFlag = true;
								item.favorCount += 1;
							} else {
								item.userFavorFlag = false;
								item.favorCount -= 1;
							}
						}
					}
				}
			});
		},
		hideModal(e) {
			this.modalName = null;
		},
		gotoLogin() {
			this.modalName = null;
			uni.reLaunch({
				url: '/pages/mine/home'
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
					uni.setStorage({
						key: 'id_token',
						data: that.token,
						success: () => {
							
						}
					});
				}
			});
		}
	},
	onShow: function() {
		const userInfo = uni.getStorageSync('userInfo');
		const token = uni.getStorageSync('id_token');
		if (!token) {
			this.modalName = 'DialogModal1';
		}
		this.loadActivity();
		this.loadBanners();
		this.loadPolicyData();
		this.loadTopicData();
		this.loadBuildingData();
		if (userInfo) {
			const openId = userInfo.openId;
			this.authentication(openId);
		}
	}
};
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
.cu-card {
	margin-top: 20upx;
}
</style>
