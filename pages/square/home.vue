<template name="square">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-white"><block slot="content">广场</block></cu-custom>
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in swiperList" :key="index" @click="viewBigBanner(index)">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
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
			
			<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="6000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			 indicator-active-color="#dc3633">
				<swiper-item v-for="(item,index) in adSwiperList" :key="index" :class="adCardCur==index?'cur':''">
					<view class="swiper-item" @click="adImgClicked(index)">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					</view>
				</swiper-item>
			</swiper>
			
			<view class="cu-bar solid-bottom bg-red light" :class="'no-card'">
				<view class="action">
					<text class="cuIcon-activity" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">最新活动</text>
				</view>
			</view>
			<view class="cu-card case no-card" v-for="(item, index) in activityData" :key="index">
				<view class="cu-item shadow">
					<view class="title padding-left padding-top">
						<view class="cu-tag bg-red light sm round margin-right-sm" v-if="item.type === 0">{{item.typeStr}}</view>
						<view class="cu-tag bg-green light sm round margin-right-sm" v-if="item.type === 1">{{item.typeStr}}</view>
						<view class="text-cut text-xl">{{item.title}}</view>
					</view>
					<view class="image" @click="viewActivityDetails(item.activityId)">
						<image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item cus-activity">
							<view class="activity-info solid-bottom padding">
								<view class="text-gray">
									<text class="cuIcon-peoplelist margin-lr-xs"></text><text class="text-lg text-red">{{item.registeredCount}}</text>/{{item.peopleLimitFlag ? item.peopleLimit : '不限'}}
								</view>
								<view class="text-gray padding-top-xs">
									<text class="cuIcon-calendar margin-lr-xs"></text>{{item.startDate}}
								</view>
							</view>
							<view class="activity-action"><button class="cu-btn round bg-gradual-red" @click="viewActivityDetails(item.activityId)">查看详情</button></view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-bar solid-bottom bg-red light no-card">
				<view class="action">
					<text class="cuIcon-newsfill" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">金融政策</text>
				</view>
			</view>
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
									<text class="cuIcon-favorfill padding-lr-sm"></text>
									30
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			
			<view class="cu-bar solid-bottom bg-red light no-card">
				<view class="action">
					<text class="cuIcon-discover" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">白领创潮</text>
				</view>
			</view>
			<view class="cu-card case margin-top-sm no-card">
				<view class="cu-item shadow">
					<view class="flex align-center padding-left padding-top">
						<view class="cu-tag bg-green light sm round margin-right-sm">自发</view>
						<view class="text-cut text-xl">这个周末，思南夜派对！</view>
					</view>
					<view class="image" @click="viewActivity2"><image src="https://s1.ax1x.com/2020/05/22/YXWnQe.jpg" mode="widthFix"></image></view>
					<view class="cu-list menu-avatar">
						<view class="cu-item cus-activity">
							<view class="activity-info solid-bottom padding">
								<view class="text-gray">
									<text class="cuIcon-peoplelist margin-lr-xs"></text><text class="text-lg text-red">31</text>/50
								</view>
								<view class="text-gray padding-top-xs">
									<text class="cuIcon-calendar margin-lr-xs"></text>2020年6月1日 上午9:30
								</view>
							</view>
							<view class="activity-action"><button class="cu-btn round bg-gradual-red" @click="viewActivity2">查看详情</button></view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-card case no-card margin-top-sm">
				<view class="cu-item shadow">
					<view class="image"><image src="http://n.sinaimg.cn/sinacn/w640h317/20180129/eaa7-fyqzcxh7180621.jpg" mode="widthFix"></image></view>
					<view class="cu-list menu-avatar">
						<view class="flex flex-direction course-title padding-left padding-bottom">
							<view class="text-lg padding-top-xs">现代白领缓解焦虑的救命药：王阳明心学</view>
							<view class="text-gray padding-top-xs">千古万人王阳明，教我们如何面对焦虑</view>
							<view class="text-gray padding-top-xs">50000人参加 | 全31课</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-card article case no-card margin-top-sm">
				<view class="cu-item shadow">
					<view class="content margin-top-sm">
						<text class="text-content">
							Java世界中“几乎”所有的对象都在堆中分配，但是，随着JIT编译期的发展与逃逸分析技术逐渐成熟，栈上分配、标量替换优化技术将会导致一些微妙的变化，所有的对象都分配到堆上也渐渐变得不那么“绝对”了。从jdk 1.7开始已经默认开启逃逸分析，如果某些方法中的对象引用没有被返回或者未被外面使用（也就是未逃逸出去），那么对象可以直接在栈上分配内存。
						</text>
					</view>
					<view class="image"><image src="https://s1.ax1x.com/2020/05/23/YxuGZt.jpg" mode="widthFix"></image></view>
					<view class="flex text-gray text-lg justify-between margin-lr margin-top-sm">
						<view class="text-red"><text class="cuIcon-appreciatefill padding-lr-sm"></text>25</view>
						<view><text class="cuIcon-message padding-lr-sm"></text>25</view>
						<view><text class="cuIcon-favor padding-lr-sm"></text>30</view>
						<view><text class="cuIcon-share padding-lr-sm"></text>30</view>
					</view>
				</view>
			</view>
			
			<view class="cu-bar solid-bottom bg-red light no-card">
				<view class="action">
					<text class="cuIcon-discover" style="font-size: 40rpx;"></text>
					<text class="text-lg text-bold">楼宇联盟</text>
				</view>
			</view>
			<view class="cu-card article case no-card">
				<view class="cu-item shadow">
					<view class="content margin-top-sm">
						<text class="text-content" style="height: 2.8em;">
							日前，我区楼宇联盟成立仪式暨楼宇联盟首次交流活动在外滩金融中心举行。
						</text>
					</view>
					<view class="image"><image src="https://s1.ax1x.com/2020/05/23/YvVQ4H.jpg" mode="widthFix"></image></view>
					<view class="flex text-gray text-lg justify-between margin-lr margin-top-sm">
						<view class="text-red"><text class="cuIcon-appreciatefill padding-lr-sm"></text>25</view>
						<view><text class="cuIcon-message padding-lr-sm"></text>25</view>
						<view class="text-red"><text class="cuIcon-favorfill padding-lr-sm"></text>30</view>
						<view><text class="cuIcon-share padding-lr-sm"></text>30</view>
					</view>
				</view>
			</view>
			
			<view class="cu-tabbar-height margin-bottom-sm"></view>
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
					name: '金融政策'
				},
				{
					cuIcon: 'creativefill',
					color: 'cyan',
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
					name: '白领运动'
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
			listTouchDirection: null
		};
	},
	onShow: function() {
		console.log(123);
		this.loadActivity();
	},
	methods: {
		viewForm: function() {
			uni.navigateTo({
				url: '../square/form'
			});
		},
		cardSwiper(e) {
			this.adCardCur = e.detail.current
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
		viewBigBanner(index) {
			console.log(index);
			if (index === 1) {
				uni.navigateTo({
					url: '../activity/h5view?url=https://mp.weixin.qq.com/s/7vA5McVtg0COvAlLzNe9bQ'
				});
			}
		},
		adImgClicked(index) {
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
					url: '/pages/policy/index'
				});
			}
			if (index === 1) {
				uni.navigateTo({
					url: '/pages/course/index'
				});
			}
			if (index === 2) {
				uni.navigateTo({
					url: '/pages/building/index'
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
			uni.navigateTo({
				url: `/pages/activity/details?activityId=${activityId.id}`
			})
		}
	},

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
</style>
