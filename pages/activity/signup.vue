<template>
	<view class="page">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">活动报名</block></cu-custom>
		<view class="bg-white padding-bottom-sm">
			<form class="margin-top-sm">
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input placeholder="报名人姓名" name="input" @input="userNameInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="报名人手机号码" name="input" @input="phoneNumberInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">身份证</view>
					<input placeholder="报名人身份证号码" name="input" @input="idCardInput"></input>
				</view>
			</form>
			
			<button class="cu-btn bg-gradual-red block margin-sm lg" @click="activityRegister">
				确定报名
			</button>
		</view>
		
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
	export default {
		data() {
			return {
				token: uni.getStorageSync('id_token'),
				payload: {}
			};
		},
		methods: {
			userNameInput(e) {
				this.payload.userName = e.detail.value;
				
			},
			phoneNumberInput(e) {
				const phoneNumber = e.detail.value;
				this.payload.phoneNumber = phoneNumber;
			},
			idCardInput(e) {
				this.payload.idCard = e.detail.value;
			},
			activityRegister() {
				const token = uni.getStorageSync('id_token');
				const phoneRegex = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
				const idCardRegex = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
				const { userName, phoneNumber, idCard } = this.payload;
				if (!phoneRegex.test(phoneNumber)) {
					uni.showToast({
						icon: 'none',
						title: '输入的手机号码有误!'
					})
					return;
				}
				if (!idCardRegex.test(idCard)) {
					uni.showToast({
						icon: 'none',
						title: '输入的身份证有误!'
					})
					return;
				}
				if (!userName || userName.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名!'
					})
					return;
				}
				uni.request({
					url: `${constants.baseUrl}/activities/register`,
					method: 'POST',
					header: {
						'content-type': 'application/json',
						Authorization: 'Bearer ' + token
					},
					data: this.payload,
					success: res => {
						console.log(res);
						const data = res.data;
						if (data.errCode) {
							uni.showToast({
								title: data.errMsg,
								duration: 2000
							})
							return;
						} else {
							uni.navigateBack({
								delta: 1
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(params) {
			const id = params.activityId;
			const activityId = {
				id
			};
			this.payload.activityId = activityId;
			console.log('报名页面', activityId);
		}
	};
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
