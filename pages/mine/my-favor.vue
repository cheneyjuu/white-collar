<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">我的收藏</block></cu-custom>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" :top="70">
			<view class="cu-card case no-card margin-top-sm" v-for="(item, index) in dataList" :key="index">
				<view class="cu-item shadow">
					<view class="flex align-center padding-left padding-top" v-if="item.activityType !== null">
						<view class="cu-tag bg-red light sm round margin-right-sm" v-if="item.activityType === 0">官方</view>
						<view class="cu-tag bg-green light sm round margin-right-sm" v-if="item.activityType === 1">自发</view>
						<view class="text-cut text-xl">{{item.title}}</view>
					</view>
					<view class="flex align-center padding-left padding-top" v-if="!item.activityType">
						<view class="text-cut text-xl">{{item.title}}</view>
					</view>
					<view class="image" @click="viewActivityDetails(item.recordId)" v-if="item.recordType === 'ACTIVITY'">
						<image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image>
					</view>
					<view class="image" @click="viewPolicyDetails(item.recordId)" v-else-if="item.recordType === 'FINANCIAL_POLICY'">
						<image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image>
					</view>
					<view class="image" @click="viewTopicDetails(item.recordId)" v-else-if="item.recordType === 'WHITE_COLLAR_CREATOR'">
						<image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image>
					</view>
					<view class="image" @click="viewBuildingDetails(item.recordId)" v-else-if="item.recordType === 'BUILDING'">
						<image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image>
					</view>
					<view class="cu-list menu-avatar" v-if="item.recordType === 'ACTIVITY'">
						<view class="cu-item cus-activity">
							<view class="activity-info solid-bottom padding">
								<!-- <view class="text-gray">
									<text class="cuIcon-peoplelist margin-lr-xs"></text><text class="text-lg text-red">{{item.registeredCount}}</text>/{{item.peopleLimitFlag ? item.peopleLimit : '不限'}}
								</view> -->
								<view class="text-gray padding-top-xs">
									<text class="cuIcon-calendar margin-lr-xs"></text>{{item.createdDate}}
								</view>
							</view>
							<view class="activity-action"><button class="cu-btn round bg-gradual-red" @click="viewActivityDetails(item.recordId)">查看详情</button></view>
						</view>
					</view>
					<view class="cu-list menu-avatar padding" v-else>
						{{item.summary}}
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
			CustomBar: this.CustomBar,
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
				url: `${constants.baseUrl}/interactive/favors?page=${pageNum}&size=${pageSize}`,
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
				url: `/pages/policy/details?topicId=${topicId}`
			});
		},
		viewTopicDetails(topicId) {
			uni.navigateTo({
				url: `/pages/topic/details?topicId=${topicId}`
			});
		},
		viewBuildingDetails(topicId) {
			uni.navigateTo({
				url: `/pages/building/details?topicId=${topicId}`
			});
		}
	}
}
</script>

<style>
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
