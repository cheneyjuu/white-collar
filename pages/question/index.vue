<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">投票</block></cu-custom>
		<view class="flex flex-direction ">
			<view class="flex title text-xl padding justify-center bg-white">{{ data.title }}</view>
			<view class="solid-bottom"></view>
			<view class="desc bg-white padding" v-if="data.content">
				{{data.content}}
			</view>
			<radio-group class="block" v-if="data.mode === 0" @change="RadioChange">
				<view class="cu-form-group" v-for="(item, index) in data.optionList" :key="index">
					<view class="title">{{ item.title }}</view>
					<view><radio class="red margin-left-sm" :value="item.id"></radio></view>
				</view>
			</radio-group>
			<checkbox-group class="block" v-if="data.mode === 1" @change="CheckboxChange">
				<view class="cu-form-group" v-for="(item, index) in data.optionList" :key="index">
					<view class="title">{{ item.title }}</view>
					<checkbox :value="item.id"></checkbox>
				</view>
			</checkbox-group>
			<view class="flex bg-white justify-center" style="width: 100%;">
				<button v-if="!disable" class="cu-btn bg-blue lg margin-top-sm margin-bottom-sm" style="width: 50%;" @click="vote()">提交投票</button>
				<button v-if="disable" class="cu-btn bg-blue light lg margin-top-sm margin-bottom-sm" style="width: 50%;" @click="vote()">投票成功</button>
			</view>
		</view>

		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">您还未登录，是否现在去登录？</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="gotoLogin">确定</button>
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
			data: {},
			optionIdList: [],
			radioValue: 0,
			disable: false,
			modalName: ''
		};
	},
	methods: {
		loadData(quesId) {
			const token = uni.getStorageSync('id_token');
			uni.request({
				url: `${constants.baseUrl}/questionnaire/${quesId}`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					this.data = data;
					console.log(data);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		hideModal(e) {
			this.modalName = null;
		},
		gotoLogin() {
			this.modalName = null;
			uni.reLaunch({
				url: '../mine/home'
			});
		},
		RadioChange(e) {
			this.radioValue = e.detail.value;
		},
		CheckboxChange(e) {
			const values = e.detail.value;
			console.log(values);
			if (values.length > 0) {
				values.forEach(id => {
					this.optionIdList.push(parseInt(id, 10));
				});
			}
		},
		vote() {
			const token = uni.getStorageSync('id_token');
			if (!token) {
				this.modalName = 'DialogModal1';
				return;
			}
			
			if (this.data.mode === 0) {
				this.optionIdList = [];
				this.optionIdList.push(this.radioValue);
				this.optionIdList = this.optionIdList[0];
			}
			
			if (this.optionIdList.length === 0) {
				uni.showToast({
					title: '请选择',
					duration: 2000
				});
				return;
			}
			let ids = '';
			for (var i = 0; i < this.optionIdList.length; i++) {
				const id = this.optionIdList[i];
				ids += id + ',';
			}
			console.log(ids);
			uni.request({
				url: `${constants.baseUrl}/questionnaire/vote?ids=${ids}`,
				method: 'PUT',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					console.log(res);
					if (res.data.code === 200) {
						this.disable = true;
					}
				}
			});
		}
	},
	onLoad(param) {
		const token = uni.getStorageSync('id_token');
		if (!token) {
			this.modalName = 'DialogModal1';
		}
		console.log(param);
		const quesId = param.quesId;
		this.loadData(quesId);
	}
};
</script>

<style></style>
