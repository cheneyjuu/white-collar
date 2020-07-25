<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">我的足迹</block></cu-custom>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" :top="70">
			<view class="cu-card case no-card" v-for="(item, index) in dataList" :key="index">
				<view class="cu-item shadow" @click="viewPolicyDetails(item.topicId)" v-if="item.articleType === 'FINANCIAL_POLICY'">
					<view class="image"><image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image></view>
					<view class="cu-list menu-avatar">
						<view class="flex flex-direction course-title padding-left padding-bottom">
							<view class="text-lg padding-top-xs">{{item.title}}</view>
							<view class="text-gray padding-top-xs text-cut">{{item.summary}}</view>
							<!-- <view class="text-gray padding-top-xs">31人参加 | 全12课</view> -->
						</view>
					</view>
				</view>
				<view class="cu-item shadow" @click="viewTopicDetails(item.topicId)" v-else-if="item.articleType === 'WHITE_COLLAR_CREATOR'">
					<view class="image"><image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image></view>
					<view class="cu-list menu-avatar">
						<view class="flex flex-direction course-title padding-left padding-bottom">
							<view class="text-lg padding-top-xs">{{item.title}}</view>
							<view class="text-gray padding-top-xs text-cut">{{item.summary}}</view>
							<!-- <view class="text-gray padding-top-xs">31人参加 | 全12课</view> -->
						</view>
					</view>
				</view>
				<view class="cu-item shadow" @click="viewBuildingDetails(item.topicId)" v-else-if="item.articleType === 'BUILDING'">
					<view class="image"><image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image></view>
					<view class="cu-list menu-avatar">
						<view class="flex flex-direction course-title padding-left padding-bottom">
							<view class="text-lg padding-top-xs">{{item.title}}</view>
							<view class="text-gray padding-top-xs text-cut">{{item.summary}}</view>
							<!-- <view class="text-gray padding-top-xs">31人参加 | 全12课</view> -->
						</view>
					</view>
				</view>
				<view class="cu-item shadow" @click="viewActivityDetails(item.topicId)" v-else-if="item.articleType === 'ACTIVITY'">
					<view class="image"><image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image></view>
					<view class="cu-list menu-avatar">
						<view class="flex flex-direction course-title padding-left padding-bottom">
							<view class="text-lg padding-top-xs">{{item.title}}</view>
							<view class="text-gray padding-top-xs text-cut">{{item.summary}}</view>
							<!-- <view class="text-gray padding-top-xs">31人参加 | 全12课</view> -->
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: {
		MescrollUni
	},
	data() {
		return {
			token: uni.getStorageSync('id_token'),
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
		}
	},
	methods: {
		downCallback(){
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				url: `${constants.baseUrl}/topic/histories?page=${pageNum}&size=${pageSize}`,
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
					if(page.num == 0) this.dataList = []; //如果是第一页需手动置空列表
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
			uni.navigateTo({
				url: `/pages/activity/details?activityId=${activityId}`
			})
		},
		viewPolicyDetails(topicId) {
			uni.navigateTo({
				url: `/pages/policy/details?topicId=${topicId.id}`
			});
		},
		viewTopicDetails(topicId) {
			uni.navigateTo({
				url: `/pages/topic/details?topicId=${topicId.id}`
			});
		},
		viewBuildingDetails(topicId) {
			uni.navigateTo({
				url: `/pages/building/details?topicId=${topicId.id}`
			});
		}
	}
}
</script>

<style>
.cu-card:not(:first-child) {
	margin-top: 20upx;
}
</style>
