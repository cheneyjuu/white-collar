<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				webviewStyles: {
					body: {
						'margin-top': '45rpx'
					}
				}
			}
		},
		methods: {},
		onLoad: function(e) {
			console.log(e);
			this.url = e.url;
			console.log(this.url);
			// this.url = 'https://mp.weixin.qq.com/s/jBo35vkftPu3mxQkfSxiUA';
		}
	}
</script>

<style>
</style>
