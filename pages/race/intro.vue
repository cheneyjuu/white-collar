<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">{{routeInfo.title}}</block></cu-custom>
		<view class="bg-white padding container">
			<jyf-parser :html="routeInfo.intro"></jyf-parser>
		</view>
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
				data: [],
				routeInfo: {}
			}
		},
		methods: {
			loadData(itemId, index) {
				const that = this;
				const token = uni.getStorageSync('id_token');
				uni.request({
					url: `${constants.baseUrl}/races/items/${itemId}/routes`,
					method: 'GET',
					header: {
						'content-type': 'application/json',
						Authorization: 'Bearer ' + token
					},
					success: res => {
						const { data } = res.data;
						that.routeInfo = data[index];
						console.log('info');
						console.log(that.routeInfo);
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(param) {
			console.log(param);
			const {itemId, index} = param
			this.loadData(itemId, index);
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
	}
</style>
