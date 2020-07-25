<template>
	<view class="page">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">赛事报名</block></cu-custom>
		<view class="bg-white padding-bottom-sm">
			<form class="margin-top-sm">
				<view class="cu-form-group">
					<view class="title required">姓名</view>
					<input placeholder="报名人姓名" name="input" @input="userNameInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title required">联系电话</view>
					<input placeholder="报名人联系电话" name="input" @input="phoneNumberInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title required">身份证</view>
					<input placeholder="报名人身份证号码" name="input" @input="idCardInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title required">性别</view>
					<picker @change="genderPickerChange" :value="index" :range="genderPicker">
						<view class="picker">
							{{genderIndex>-1?genderPicker[genderIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title required">街道</view>
					<picker @change="streetPickerChange" :value="index" :range="streetPicker">
						<view class="picker">
							{{streetIndex>-1?streetPicker[streetIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title padding-left-sm">企业</view>
					<input placeholder="企业" name="input" @input="companyInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title required">联系地址</view>
					<input placeholder="联系地址" name="input" @input="addressInput"></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title required">衣服尺码</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'请选择'}}
						</view>
					</picker>
				</view>
			</form>
			<view class="solid-top margin-bottom-sm margin-top-sm"></view>
			<view class="disclaimer-box text-gray margin">
				<!-- <radio-group class="block flex align-center" @change="RadioChange">
					<radio style="transform:scale(0.8)" class='red sm margin-right-sm' :class="agree?'checked':''" :checked="agree" value="agree"></radio>
					<view class="title">免责声明</view>
				</radio-group> -->
				点击报名即表示您已阅读并同意
				<navigator class="text-blue" url="/pages/race/disclaimer">《免责声明》</navigator>。
				如您不同意上述协议的任何条款，您应立即停止使用本软件及服务。
			</view>
			
			<button class="cu-btn bg-gradual-red block margin-sm lg" @click="activityRegister">
				确定报名
			</button>
		</view>
		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">赛事报名</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">
					<text>恭喜，您已报名成功！</text>
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
				agree: false
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
				const idCard = e.detail.value;
				let lastNum = '';
				// if (idCard.length === 15) {
				// 	lastNum = idCard.substring(14, 15);
				// }
				if (idCard.length === 18) {
					lastNum = idCard.substring(16, 17);
				}
				let gender = '';
				if (lastNum === 'x' || lastNum === 'X') {
					gender = '女';
				}
				if (lastNum) {
					if (parseInt(lastNum, 10) %2 === 0) {
						this.genderIndex = 1;
						this.payload.gender = '女';
					} else {
						this.genderIndex = 0;
						this.payload.gender = '男';
					}
				}
			},
			companyInput(e) {
				this.payload.company = e.detail.value;
			},
			addressInput(e) {
				this.payload.contactAddress = e.detail.value;
			},
			PickerChange(e) {
				this.index = e.detail.value
				console.log(this.picker[this.index]);
				this.payload.clothesSize = this.picker[this.index];
			},
			genderPickerChange(e) {
				this.genderIndex = e.detail.value;
				this.payload.gender = this.genderPicker[this.genderIndex];
			},
			streetPickerChange(e) {
				this.streetIndex = e.detail.value;
				this.payload.street = this.streetPicker[this.streetIndex];
			},
			RadioChange(e) {
				console.log(this.agree);
				this.agree = !this.agree;
			},
			hideModal(e) {
				this.modalName = null;
			},
			gotoPrev() {
				uni.navigateBack({
					delta: 1
				})
			},
			activityRegister() {
				const that = this;
				const token = uni.getStorageSync('id_token');
				const phoneRegex = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
				const idCardRegex = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
				const { userName, phoneNumber, idCard, contactAddress, clothesSize } = this.payload;
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
				if (!contactAddress || contactAddress.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入联系地址!'
					})
					return;
				}
				if (!clothesSize) {
					uni.showToast({
						icon: 'none',
						title: '请选择衣服尺码!'
					})
					return;
				}
				// 15位身份证号码：第7、8位为出生年份(两位数)，第9、10位为出生月份，第11、12位代表出生日期，第15位代表性别，奇数为男，偶数为女。
				// 18位身份证号码：第7、8、9、10位为出生年份(四位数)，第11、第12位为出生月份，第13、14位代表出生日期，第17位代表性别，奇数为男，偶数为女。
				let lastNum = '';
				if (idCard.length === 15) {
					lastNum = idCard.substring(14, 15);
				}
				if (idCard.length === 18) {
					lastNum = idCard.substring(16, 17);
				}
				let gender = '';
				if (lastNum === 'x' || lastNum === 'X') {
					gender = '女';
				}
				if (parseInt(lastNum, 10) %2 === 0) {
					gender = '女';
				} else {
					gender = '男';
				}
				if (this.payload.gender !== gender) {
					uni.showToast({
						icon: 'none',
						title: '身份证和性别不符!'
					})
					return;
				}
				
				uni.request({
					url: `${constants.baseUrl}/races/items/register`,
					method: 'POST',
					header: {
						'content-type': 'application/json',
						Authorization: 'Bearer ' + token
					},
					data: this.payload,
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
							this.modalName = 'DialogModal1';
							// uni.showToast({
							// 	title: '报名成功',
							// 	duration: 2000,
							// 	success() {
							// 		that.gotoPrev();
							// 	}
							// })
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(params) {
			console.log(params);
			const raceId = params.raceId;
			const itemId = params.itemId;
			this.payload.raceId = {id: raceId};
			this.payload.itemId = {id: itemId};
			console.log(raceId, itemId, this.payload);
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
