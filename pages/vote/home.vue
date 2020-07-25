<template name="vote">
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">投票中心</block></cu-custom>
		<view class="page bg-red light flex align-center flex-direction">
			<view class="margin-top flex flex-direction align-center" style="flex: 6;">
				<view class="image" style="flex: 8;">
					<image :src="vote.coverImage" mode="aspectFill"></image>
				</view>
				<view class="" style="flex: 2;">
					<button class="cu-btn round lg bg-gradual-red" @click="viewTop(vote.voteId)">
						<text class="cuIcon cuIcon-rankfill padding-right-xs"></text>查看排行榜
					</button>
				</view>
			</view>
			<view class="count-down" style="flex: 2;">
				投票倒计时：{{vote.countDownTime}}
			</view>
			<view class="vote-count" style="flex: 2;">
				<view class="flex text-xl text-blue">
					<text class="padding-right">投票人数：{{vote.userCount}}</text>
					<text>累积投票：{{vote.voteSum}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	name: 'vote',
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			token: uni.getStorageSync('id_token'),
			voteId: '',
			vote: {}
		};
	},
	methods: {
		loadVoteActivity(voteId) {
			uni.request({
				url: `${constants.baseUrl}/votes/activity?stringId=${voteId}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					this.vote = data;
					console.log(data);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		viewTop(voteId) {
			uni.navigateTo({
				url: `/pages/vote/top?voteId=${voteId.id}`
			});
		}
	},
	onLoad(param) {
		if (param) {
			this.voteId = param.voteId;
		}
		this.loadVoteActivity('340261603402752');
	}
};
</script>

<style>
.page {
	height: 100vh;
	position: relative;
}
.user-box {
	height: 260rpx;
}
</style>
