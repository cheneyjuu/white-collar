<template name="coupon">
	<view>
		<cu-custom bgColor="bg-white"><block slot="content">领券中心</block></cu-custom>
		<view class="page">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" :top="85">
				<view class="flex" v-for="(item, index) in dataList" :key="index" style="position: relative;">
					<view class="cu-card case bg-white padding margin-top-sm" style="width: 100%; padding-right: 2em;">
						<view class="flex">
							<view class="flex" style="flex: 3;"><image class="radius" style="width: 100%; height: auto;" :src="item.coverImage" mode="aspectFill"></image></view>
							<view class="flex padding-left" style="flex: 7;" @click="viewDetails(item.couponId.id)">
								<view class="flex flex-direction" style="width: 100%;">
									<view class="title block">
										<view class="text-bold text-lg" style="display: flex; flex-wrap: wrap;">{{ item.title }}</view>
									</view>
									<view class="flex padding-top-sm">
										<view class="flex flex-direction" style="flex: 6;">
											<view class="padding-top-xs">
												<text>剩余：{{ item.remainDays }}天</text>
											</view>
											<view class="padding-top-xs">
												<text>数量：{{ item.count }}张</text>
											</view>
										</view>
									</view>
								</view>

								<view class="flex flex-direction justify-center align-center padding-right" style="font-size: 48rpx;">
									<text class="text-price text-red">{{ item.price }}</text>
								</view>
							</view>
						</view>
						<view class="padding-top-sm flex dashed-top margin-top-sm">
							<view class="text-gray flex flex-direction justify-center" style="flex: 7">有效期：{{ item.startDate }} - {{ item.endDate }}</view>
							<view class="" style="display: flex; flex: 3; justify-content: flex-end;">
								<button v-if="!item.receivedFlag" class="cu-btn round bg-gradual-red" @click="receiveCoupon(item.couponId.id)">立即领取</button>
								<button v-if="item.receivedFlag" class="cu-btn round bg-gray">
									<text class="cuIcon-roundcheck margin-lr-xs"></text>
									已领取
								</button>
							</view>
						</view>
					</view>

					<view
						class="bg-gradual-red flex justify-center align-center text-center"
						style="width: 1.5em; height: 94%; position: absolute; right: 0.25em; top: 20upx; float: right;"
						@click="viewDetails(item.couponId.id)"
					>
						查看详情
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
		<view class="cu-tabbar-height margin-bottom-sm"></view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
export default {
	name: 'coupon',
	mixins: [MescrollMixin], // 使用mixin
	components: {
		MescrollUni
	},
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			modalName: null,
			list: [
				{
					title: '优惠券',
					img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
					url: '../coupon/list'
				}
			],
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
	onShow() {
		const token = uni.getStorageSync('id_token');
		if (!token) {
			this.modalName = 'DialogModal1';
			return;
		}
	},
	methods: {
		downCallback() {
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				url: `${constants.baseUrl}/welfare/coupons?page=${pageNum}&size=${pageSize}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					console.log(res);
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
		receiveCoupon(couponId) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			uni.request({
				url: `${constants.baseUrl}/welfare/coupons/${couponId}/receive`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const data = res.data;
					if (data.code !== 200) {
						uni.showToast({
							icon: 'none',
							title: '请稍后再试',
							duration: 2000
						});
						return;
					} else {
						uni.showToast({
							title: '领取成功',
							duration: 2000
						});
						this.downCallback();
					}
					console.log(res);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		viewDetails(couponId) {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			uni.navigateTo({
				url: '/pages/coupon/details?couponId=' + couponId
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
	}
};
</script>

<style>
/* .cu-card:not(:first-child) {
	margin-top: 20upx;
} */
.coupon-img {
	display: flex;
	flex: 3;
}
.coupon-content {
	flex: 7;
	display: flex;
	flex-direction: column;
}
.coupon-detail {
	display: flex;
	justify-content: space-between;
}
.coupon-detail-text {
	display: flex;
	flex-direction: column;
}
</style>
