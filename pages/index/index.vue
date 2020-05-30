<template>
	<view>
		<square v-if="PageCur == 'square'"></square>
		<activity v-if="PageCur == 'activity'"></activity>
		<topic v-if="PageCur == 'topic'"></topic>
		<coupon v-if="PageCur == 'coupon'"></coupon>
		<mine v-if="PageCur == 'mine'"></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="square">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/home' + [PageCur == 'square' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'square' ? 'text-red' : 'text-gray'">广场</view>
			</view>
			<view class="action" @click="NavChange" data-cur="activity">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/activity' + [PageCur == 'activity' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'activity' ? 'text-red' : 'text-gray'">活动</view>
			</view>
			<!-- <view class="action" @click="NavChange" data-cur="topic">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/component' + [PageCur == 'topic' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'topic' ? 'text-red' : 'text-gray'">话题</view>
			</view> -->
			<view class="action" @click="NavChange" data-cur="coupon">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/coupon' + [PageCur == 'coupon' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'coupon' ? 'text-red' : 'text-gray'">福利</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/mine' + [PageCur == 'mine' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'mine' ? 'text-red' : 'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'square'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
			console.log(this.PageCur);
		}
	}
};
</script>

<style>
</style>
