<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-red" :isBack="true"><block slot="content">活动报名</block></cu-custom>
		<view class="bg-white padding-bottom-sm">
			<form class="margin-top-sm">
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input placeholder="报名人姓名" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="报名人手机号码" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">身份证</view>
					<input placeholder="报名人身份证号码" name="input"></input>
				</view>
			</form>
			
			<button class="cu-btn bg-gradual-red block margin-sm lg" @click="signupSuccess">
				确定报名
			</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			signupSuccess: function() {
				uni.navigateTo({
					url: '../activity/signup-success'
				});
			}
		},
		onLoad: function() {
			
		}
	};
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
