<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">楼宇联盟</block></cu-custom>
		<scroll-view style="background-color: #FFFFFF;">
			<view class="image">
				<image :src="topic.coverImage" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="article padding">
				<view class="title text-xl">{{topic.title}}</view>
				<view class="flex text-gray justify-between padding-top-sm">
					<text>{{topic.createdDate}}</text>
					<text>{{topic.browserCount ? topic.browserCount : 0}} 浏览</text>
				</view>
			</view>
			<view class="solid-bottom margin-bottom-sm"></view>
			<view class="cu-card article no-card">
				<view class="cu-item bg-white">
					<view class="content margin-top-sm">
						<view class="desc">
							<!-- <rich-text :nodes="topic.content"></rich-text> -->
							<view class="flex justify-center flex-direction" v-if="topic.voteFlag">
								<view class="flex justify-center margin-bottom-sm text-lg">{{topic.voteTitle}}</view>
								<navigator :url="'/pages/question/index?quesId=' + topic.quesId" class="flex justify-center" style="width: 100%;">
									<button class="cu-btn lg lines-blue" style="width: 80%;">去投票</button>
								</navigator>
								<view class="solid margin-top margin-bottom"></view>
							</view>
							<jyf-parser :html="topic.content" ref="article"></jyf-parser>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
	components: {
	    jyfParser
	  },
	data() {
		return {
			token: uni.getStorageSync('id_token'),
			topic: {},
			outLink: ''
		}
	},
	methods: {
		loadTopicInfo(topicId) {
			uni.request({
				url: `${constants.baseUrl}/topic/${topicId}/details`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + this.token
				},
				success: res => {
					const { data } = res.data;
					data.content = data.content.replace(/<table[^>]*>/gi, function (match, capture) {
					  return match.replace(/width=\"(.*)\"/gi, '');
					});
					this.topic = data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onShare() {
			uni.showShareMenu({
				success() {
					console.log('share success');
				}
			})
		}
	},
	onLoad(params) {
		const topicId = params.topicId;
		this.loadTopicInfo(topicId);
	},
	onShareAppMessage() {
		return {
			title: this.topic.title,
			path: '/pages/topic/details?topicId=' + this.topic.topicId.id,
			imageUrl: this.topic.coverImage
		}
	}
}
</script>

<style>
</style>
