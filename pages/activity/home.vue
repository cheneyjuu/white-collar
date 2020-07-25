<template name="activity">
	<view>
		<cu-custom bgColor="bg-white"><block slot="content">活动</block></cu-custom>

		<!-- <scroll-view class="bg-red nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-activity padding-lr-sm"></text> 活动
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-discover padding-lr-sm"></text> 话题
			</view>
		</scroll-view> -->
		<view class="page">
			<!-- <block v-if="TabCur==0">
				
			</block> -->

			<!-- 话题 -->
			<!-- <block v-if="TabCur == 1">
				<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" :top="90">
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
				</mescroll-uni>
			</block> -->
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" :top="70">
				<view class="cu-card case no-card" v-for="(item, index) in dataList" :key="index">
					<view class="cu-item shadow">
						<view class="flex align-center padding-left padding-top">
							<view class="cu-tag bg-red light sm round margin-right-sm" v-if="item.type === 0">官方</view>
							<view class="cu-tag bg-green light sm round margin-right-sm" v-if="item.type === 1">自发</view>
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
			</mescroll-uni>
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
			<view class="cu-tabbar-height margin-bottom-sm"></view>
		</view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
export default {
	name: 'activity',
	mixins: [MescrollMixin], // 使用mixin
	components: {
		MescrollUni
	},
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			CustomBar: this.CustomBar,
			modalName: null,
			TabCur: 0,
			upOption: {
				page: {
					num: -1,
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			// 列表数据
			dataList: []
		};
	},
	methods: {
		// 对接后台
		downCallback() {
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				url: `${constants.baseUrl}/activities?page=${pageNum}&size=${pageSize}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const data = res.data;
					const totalCount = res.header['X-Total-Count'];
					// 接口返回的当前页数据列表 (数组)
					let curPageData = data;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = data.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = totalCount / 10;
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = totalCount;
					// 接口返回的是否有下一页 (true/false)
					let hasNext = data.length > 0;
					//设置列表数据
					if (page.num == 0) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(curPageData); //追加新数据
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(curPageLen, totalPage);
				},
				fail: () => {
					this.mescroll.endErr();
				},
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
		hideModal(e) {
			this.modalName = null;
		},
		gotoLogin() {
			this.modalName = null;
			uni.reLaunch({
				url: '/pages/mine/home'
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
	padding-top: 45px;
}
.cu-card:not(:first-child) {
	margin-top: 20upx;
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
