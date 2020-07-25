<template name="topic">
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">白领创潮</block></cu-custom>
		<view class="page">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" :top="70">
				<view class="cu-card case no-card" v-for="(item, index) in dataList" :key="index">
					<view class="cu-item shadow">
						<view class="image" @click="viewTopicDetails(item.topicId)"><image :src="item.coverImage" mode="widthFix" style="max-height: 440rpx;"></image></view>
						<view class="cu-list menu-avatar" @click="viewTopicDetails(item.topicId)">
							<view class="flex flex-direction course-title padding-left padding-bottom">
								<view class="text-lg padding-top-xs">{{item.title}}</view>
								<view class="text-gray padding-top-xs text-cut">{{item.summary}}</view>
								<!-- <view class="text-gray padding-top-xs">31人参加 | 全12课</view> -->
							</view>
						</view>
						<view class="sub-action text-gray text-df margin">
							<view class="flex justify-around">
								<view class="">
									<text class="cuIcon-messagefill padding-lr-sm"></text>
									30
								</view>
								<view class=""><text class="cuIcon-appreciatefill padding-lr-sm" :class="item.userLikeFlag === true ? 'text-red' : ''" @click="onInteractive(item, 'LIKE')"></text>
								{{item.likeCount}}</view>
								<view class="">
									<text class="cuIcon-favorfill padding-lr-sm" :class="item.userFavorFlag === true ? 'text-red' : ''" @click="onInteractive(item, 'FAVOR')"></text>
									{{item.favorCount}}
								</view>
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
		</view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
	name: 'topic',
	mixins: [MescrollMixin], // 使用mixin
	components: {
		MescrollUni
	},
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			token: uni.getStorageSync('id_token'),
			modalName: '',
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
		downCallback(){
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				url: `${constants.baseUrl}/topic?articleType=1&page=${pageNum}&size=${pageSize}`,
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
		viewTopicDetails(topicId) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			uni.navigateTo({
				url: `/pages/topic/details?topicId=${topicId.id}`
			})
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
		gotoLogin() {
			this.modalName = null;
			uni.reLaunch({
				url: '/pages/mine/home'
			});
		},
		hideModal(e) {
			this.modalName = null;
		}
	},
	onLoad() {
		const token = uni.getStorageSync('id_token');
		if (!token) {
			this.modalName = 'DialogModal1';
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
</style>
