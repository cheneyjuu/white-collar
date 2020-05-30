<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-red" :isBack="true"><block slot="content">楼宇情况</block></cu-custom>
		<view class="bg-white padding-bottom-sm">
			<form class="margin-top-sm">
				<view class="cu-form-group">
					<view class="title">填报日期</view>
					<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
						<view class="picker">{{ date }}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">楼宇名称</view>
					<input placeholder="楼宇名称" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">楼宇面积</view>
					<input placeholder="楼宇办公部分总面积(平方米)" name="input"></input>
				</view>
				
				<view class="cu-bar bg-white" style="border-top: 1upx solid #eee">
					<view class="action">
						楼宇标准层示意图
					</view>
					<view class="action">
						{{imgList.length}}/4
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				
				<view class="cu-form-group">
					<view class="title">出租面积</view>
					<input placeholder="近期楼内可出租面积(平方米)" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">平均报价</view>
					<input placeholder="平均报价(元/平方米•天)保留一位小数" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">物业标准</view>
					<input placeholder="元/平方米•月" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">填报人</view>
					<input placeholder="填报人姓名" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="填报手机号码" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">情况说明</view>
					<input placeholder="情况说明" name="input"></input>
				</view>
			</form>
			
			<button class="cu-btn bg-gradual-red block margin-sm lg">
				确认提交
			</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '2020-01-20',
				imgList: []
			};
		},
		methods: {
			formatNumber: function(n) {
				n = n.toString()
				return n[1] ? n : '0' + n
			},
			ChooseImage() {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths)
					} else {
						this.imgList = res.tempFilePaths
					}
				}
			});
		},
		ViewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			uni.showModal({
				title: '操作确认',
				content: '确定要删除吗？',
				cancelText: '不删除',
				confirmText: '确定删除',
				success: res => {
					if (res.confirm) {
						this.imgList.splice(e.currentTarget.dataset.index, 1)
					}
				}
			})
		}
		},
		onLoad: function() {
			const date = new Date();
			const year = date.getFullYear();
			const month = this.formatNumber(date.getMonth() + 1);
			const day = date.getDate();
			this.date = year + '-' + month + '-' + day;
		}
	};
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
