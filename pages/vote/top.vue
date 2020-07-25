<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true"><block slot="content">排行榜</block></cu-custom>
		<view class="page">
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item, index) in voteItemList" :key="index">
					<view class="cu-avatar round lg" :style="item.avatar"></view>
					<view class="content">
						<view class="text-grey">{{item.item}}</view>
						<!-- <view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								{{item.summary}}
							</view>
						</view> -->
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.voteNum}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			voteItemList: []
		};
	},
	methods: {
		loadItems(voteId) {
			uni.request({
				url: `${constants.baseUrl}/votes/items?stringId=${voteId}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					data.forEach(item => {
						item.avatar = `background-image:url(${item.coverImage})`;
					});
					this.voteItemList = data;
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onLoad(param) {
		const voteId = param.voteId;
		this.loadItems(voteId);
	}
};
</script>

<style></style>
