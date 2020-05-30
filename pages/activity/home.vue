<template name="activity">
	<view>
		<cu-custom bgColor="bg-white"><block slot="content">活动</block></cu-custom>
		
		<scroll-view class="bg-red nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-activity padding-lr-sm"></text> 活动
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-discover padding-lr-sm"></text> 话题
			</view>
		</scroll-view>
		<view class="page">
			<block v-if="TabCur==0">
				<view class="cu-card case no-card">
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="cu-tag bg-red light sm round margin-right-sm">官方</view>
							<view class="text-cut text-xl">想不到 | 费德勒竟是从这里起步的？</view>
						</view>
						<view class="image" @click="viewActivity1"><image src="https://s1.ax1x.com/2020/05/22/YXghwt.png" mode="widthFix"></image></view>
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
								<view class="activity-action"><button class="cu-btn round bg-gradual-red" @click="viewActivity1">查看详情</button></view>
							</view>
						</view>
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
				
				<view class="cu-card case margin-top-sm no-card">
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="cu-tag bg-green light sm round margin-right-sm">自发</view>
							<view class="text-cut text-xl">教育改变未来：我们一起去支教</view>
						</view>
						<view class="image" @click="viewActivityDetails"><image src="http://photocdn.sohu.com/20110721/Img314111793.jpg" mode="widthFix"></image></view>
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
								<view class="activity-action"><button class="cu-btn round bg-gradual-red" @click="viewActivityDetails">查看详情</button></view>
							</view>
						</view>
					</view>
				</view>
			</block>
			
			<!-- 话题 -->
			<block v-if="TabCur == 1">
				<view class="cu-card article case no-card solid-bottom">
					<view class="cu-item shadow">
						<view class="content margin-top-sm">
							<text class="text-content">
								Java世界中“几乎”所有的对象都在堆中分配，但是，随着JIT编译期的发展与逃逸分析技术逐渐成熟，栈上分配、标量替换优化技术将会导致一些微妙的变化，所有的对象都分配到堆上也渐渐变得不那么“绝对”了。从jdk 1.7开始已经默认开启逃逸分析，如果某些方法中的对象引用没有被返回或者未被外面使用（也就是未逃逸出去），那么对象可以直接在栈上分配内存。
							</text>
						</view>
						<view class="image"><image src="http://n.sinaimg.cn/sinacn15/753/w500h253/20180624/b808-heirxyf0833730.jpg" mode="widthFix"></image></view>
						<view class="flex text-gray text-lg justify-between margin-lr margin-top-sm">
							<view class="text-red"><text class="cuIcon-appreciatefill padding-lr-sm"></text>25</view>
							<view><text class="cuIcon-message padding-lr-sm"></text>25</view>
							<view><text class="cuIcon-favor padding-lr-sm"></text>30</view>
							<view><text class="cuIcon-share padding-lr-sm"></text>30</view>
						</view>
					</view>
				</view>
				
				<view class="cu-card article case no-card solid-bottom margin-top-sm">
					<view class="cu-item shadow">
						<view class="content margin-top-sm">
							<text class="text-content">
								Java世界中“几乎”所有的对象都在堆中分配，但是，随着JIT编译期的发展与逃逸分析技术逐渐成熟，栈上分配、标量替换优化技术将会导致一些微妙的变化，所有的对象都分配到堆上也渐渐变得不那么“绝对”了。从jdk 1.7开始已经默认开启逃逸分析，如果某些方法中的对象引用没有被返回或者未被外面使用（也就是未逃逸出去），那么对象可以直接在栈上分配内存。
							</text>
						</view>
						<view class="image"><image src="http://n.sinaimg.cn/sinacn15/753/w500h253/20180624/b808-heirxyf0833730.jpg" mode="widthFix"></image></view>
						<view class="flex text-gray text-lg justify-between margin-lr margin-top-sm">
							<view class="text-red"><text class="cuIcon-appreciatefill padding-lr-sm"></text>25</view>
							<view><text class="cuIcon-message padding-lr-sm"></text>25</view>
							<view><text class="cuIcon-favor padding-lr-sm"></text>30</view>
							<view><text class="cuIcon-share padding-lr-sm"></text>30</view>
						</view>
					</view>
				</view>
			</block>
			<view class="cu-tabbar-height margin-bottom-sm"></view>
		</view>
		
	</view>
</template>

<script>
export default {
	name: 'activity',
	data() {
		return {
			CustomBar: this.CustomBar,
			TabCur: 0
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
		viewActivityDetails(e) {
			uni.navigateTo({
				url: '../activity/details'
			});
		},
		viewActivity1() {
			uni.navigateTo({
				url: '../activity/view1'
			});
		},
		viewActivity2() {
			uni.navigateTo({
				url: '../activity/view2'
			});
		},
		// 对接后台
		loadActivityData() {
			uni.request({
				url: `${constants.baseUrl}/activities`,
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
					console.log(data);
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style>
.page {
	padding-top: 45px;
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
</style>
