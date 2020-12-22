<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
			}
		},
		methods: {
			
		},
		onLoad:function(param){
			this.url = param.url;
		}
	}
</script>

<style>

</style>
