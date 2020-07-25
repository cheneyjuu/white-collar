<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">白领赛事</block></cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" @input="searchInputChange" :adjust-position="false" type="text" placeholder="搜索赛事标题" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-blue shadow-blur round" @click="searchRaceInfo()">搜索</button>
			</view>
		</view>
		
		<view class="race-box margin-top-sm bg-white">
			<view class="title text-xl text-black">赛事列表</view>
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" :top="300">
				<view class="shadow race-body">
					<view class="race-item bg-white margin-xs" v-for="(item, index) in dataList" :key="index" @click="viewRaceInfo(item.raceId)">
						<image :src="item.coverImage" mode="aspectFill" style="height: 200rpx;"></image>
						<view class="flex padding-bottom-sm">
							<text class="padding-sm text-cut">{{item.title}}</text>
						</view>
						<view class="info flex justify-between padding-sm">
							<view class="cu-tag line-blue" v-if="item.status === 0">
								报名中
							</view>
							<view class="cu-tag line-red" v-if="item.status === 1">
								比赛中
							</view>
							<view class="cu-tag line-gray" v-if="item.status === 2">
								已结束
							</view>
							<text style="line-height: 1.75em;">{{item.matchStartDate}}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
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
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollUni
		},
		data() {
			return {
				title: '',
				modalName: null,
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
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			searchInputChange(e) {
				this.title = e.detail.value;
			},
			searchRaceInfo() {
				this.dataList = [];
				this.upCallback(this.upOption.page);
			},
			downCallback() {
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				const title = this.title;
				uni.request({
					url: `${constants.baseUrl}/races?title=${title}&page=${pageNum}&size=${pageSize}`,
					method: 'GET',
					header: {
						'content-type': 'application/json',
						Authorization: 'Bearer ' + this.token
					},
					success: res => {
						console.log(res);
						const data = res.data;
						data.forEach(item => {
							item.matchStartDate = item.matchStartDate.substring(0, 10);
						});
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
			viewRaceInfo(raceId) {
				console.log(raceId);
				uni.navigateTo({
					url: `/pages/race/detail?raceId=${raceId.id}`
				})
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
		onLoad(param) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			this.title = '';
		}
	}
</script>

<style>
.race-box {
	width: 100vw;
}
.race-box .title {
	padding: 20upx;
}
.bg-gradual-gray {
	background-image: linear-gradient(180deg, #FFFFFF, #efefef);
}

.race-body {
	/* position: absolute; */
	/* top: 330rpx; */
}
.race-body .race-item {
	display: inline-block;
	width: 355rpx;
	height: 400rpx;
	overflow: hidden;
}
</style>
