<template>
	<view class="page">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">绑定信息</block></cu-custom>
		<view class="bg-white padding-bottom-sm">
			<form class="margin-top-sm">
				<view class="cu-form-group">
					<view class="title required">联系电话</view>
					<input placeholder="报名人联系电话" name="input" @input="phoneNumberInput"></input>
				</view>
			</form>
			<view class="solid-top margin-bottom-sm margin-top-sm"></view>
			
			<button class="cu-btn bg-gradual-red block margin-sm lg" @click="bindInfo">
				确定绑定
			</button>
		</view>
		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">个人信息</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">
					<text>恭喜，您已绑定成功！</text>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn" @tap="hideModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="gotoPrev()">确定</button>
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
				raceId: null,
				modalName: null,
				payload: {},
				index: -1,
				picker: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
				genderIndex: -1,
				genderPicker: ['男', '女'],
				gender: '',
				streetPicker: ["南京东路街道","外滩街道","半淞园路街道","小东门街道","豫园街道","老西门街道","五里桥街道","打浦桥街道","淮海中路街道","瑞金二路街道"],
				streetIndex: -1,
				radio: '',
				agree: false,
				offLineFlag: false
			};
		},
		methods: {
			phoneNumberInput(e) {
				const phoneNumber = e.detail.value;
				this.payload.phoneNumber = phoneNumber;
			},
			bindInfo() {
				const that = this;
				const token = uni.getStorageSync('id_token');
				const userInfo = uni.getStorageSync('userInfo');
				const openId = userInfo.openId;
				const phoneRegex = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
				const idCardRegex = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
				const { userName, phoneNumber, idCard, contactAddress, clothesSize, inviteCode } = this.payload;
				if (!phoneRegex.test(phoneNumber)) {
					uni.showToast({
						icon: 'none',
						title: '输入的手机号码有误!'
					})
					return;
				}
				
				const data = {
					raceId: that.raceId,
					openId: openId,
					phoneNumber: that.payload.phoneNumber
				};
				
				console.log({data});
				
				uni.request({
					url: `${constants.baseUrl}/races/bind`,
					method: 'PUT',
					header: {
						'content-type': 'application/json',
						Authorization: 'Bearer ' + token
					},
					data: data,
					success: res => {
						console.log(res);
						const data = res.data;
						if (data.code !== 200) {
							uni.showToast({
								icon: 'none',
								title: data.message,
								duration: 2000
							})
							return;
						} else {
							console.log('绑定成功');
							// this.modalName = 'DialogModal1';
							// uni.showToast({
							// 	title: '报名成功',
							// 	duration: 2000,
							// 	success() {
							// 		that.gotoPrev();
							// 	}
							// })
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
			console.log('parmas');
			console.log(params);
			const raceId = params.raceId;
			this.raceId = raceId;
		}
	};
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
.required::before {
	content: "*";
	color: red;
	padding-right: 8rpx;
}
.disclaimer-box navigator {
	display: inline-block;
}
</style>
