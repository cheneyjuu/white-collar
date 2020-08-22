<template>
	<view class="page">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">赛事轨迹</block></cu-custom>
		<view class="">
			<map
				id="map"
				:longitude="lng"
				:latitude="lat"
				scale="16"
				:markers="markers"
				@markertap="markertap"
				:polyline="polyline"
				:enable-scroll="enableScroll"
				@regionchange="regionchange"
				show-location
				style="width: 100%; height: 78vh;"
			>
				<view class="cover-view" v-if="showDialog">
					<view class="triangle"></view>
					<view class="container padding">
						<view class="flex-wrp flex-direction bg-white">
							<view class="flex-item flex flex-direction">
								<view class="title padding-sm text-black text-bold">{{ currentPoint.title }} <text class="cuIcon cuIcon-check padding-lr-sm text-green">已签到</text></view>
								<view class="desc padding-left-sm">地址：{{ currentPoint.address }}</view>
							</view>
							<view class="solid-bottom margin-top-sm"></view>
							<!-- <view class="flex justify-center margin-top margin-bottom text-bold text-white bg-gradual-green"> -->
								<!-- <button class="cu-btn round bg-orange text-white shadow margin-bottom-sm" @click="checkin"><text class="padding-lr-sm">我要签到</text></button> -->
								<!-- <text class="cuIcon cuIcon-check padding-lr-sm"></text>已签到 -->
							<!-- </view> -->
						</view>
					</view>
				</view>
			</map>
		</view>

		
		<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" :scroll-into-view="'scroll-' + currentIndex"
		 scroll-with-animation>
			<view class="cu-item padding-lr-xl" :class="item.checked?'text-green':'text-red'" v-for="(item,index) in pointTitles" :key="index" :id="'scroll-' + index">
				{{ item.title }} <text class="num" :data-index="index + 1"></text>
			</view>
		</scroll-view>

		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">您已完成比赛</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action"><button class="cu-btn bg-green margin-left" @tap="completeRace">确定</button></view>
				</view>
			</view>
		</view>
		
		<!-- <view class="info-box">
			<view class="detail-info flex justify-around margin-top">
				<view class="flex flex-direction align-center margin" style="flex: 1">
					<view class="text-xl text-bold text-number padding-bottom-sm">{{meters ? meters : '00:00'}}</view>
					<view class="text-gray">里程(km)</view>
				</view>
				<view class="flex flex-direction align-center margin" style="flex: 2">
					<view class="text-xl text-bold text-number padding-bottom-sm">{{nums ? nums : '0时0分0秒'}}</view>
					<view class="text-gray">运动时间</view>
				</view>
				<view class="flex flex-direction align-center margin" style="flex: 1">
					<view class="text-xl text-bold text-number padding-bottom-sm">{{speed ? speed : "00'00"}}</view>
					<view class="text-gray">平均配速</view>
				</view>
			</view>
			<view class="btn-box">
				<button class="bg-blue cu-round" @click="startRace()" v-if="isStart === false">开始</button>
				<button class="bg-red cu-round" @click="endRace()" v-if="isStart === true">结束</button>
			</view>
		</view> -->
	</view>
</template>

<script>
import * as constants from '@/utils/constant.js';
export default {
	data() {
		return {
			raceId: '',
			itemId: '',
			lng: 0,
			lat: 0,
			isStart: false,
			raceInterval: null,
			markers: [],
			polyline: [
				{
					points: [],
					color: '#12aa9cDD',
					width: 2,
					dottedLine: false
				}
			],
			enableScroll: true,
			nums: '00:00:00',
			timer: null,
			myInterval: null,
			drawInterval: null,
			checkInterval: null,
			speed: 0,
			covers: [],
			meters: 0.0,
			info: '',
			minute: 0,
			hour: 0,
			oriMeters: 0.0,
			showMeters: 0.0,
			pointTitles: [],
			scroll: -1,
			currentPoint: {},
			currentIndex: 0,
			currentPointStr: null,
			showDialog: false,
			checkinIndexList: [],
			data: [],
			modalName: null,
			complete: false,
			raceInfo: uni.getStorageSync('raceInfo') ? uni.getStorageSync('raceInfo') : {itemId:null, index: 0, complete: false},
			userCheckedIndexList: [], // 用户打卡后，将对应的数组下标存储到此数组
			isDebug: true
		};
	},
	methods: {
		regionchange(e) {
			
		},
		markertap(e) {
			// console.log(e.detail.markerId);
		},
		controltap(e) {
			// console.log(e.detail.controlId);
		},
		loadRouteData(itemId) {
			// 1. 用户进入地图，获取当前项目的路线信息
			// 2. 同时获取用户的打卡历史数据（能进入这个页面，说明用户还未完成比赛）
			// 3. 将用户已经打过卡的路线标记为 true
			// 4. 定时获取用户当前位置，并循环判断与未打卡点的距离，如果当前位置<=未打卡点，则自动打卡
			// 5. 根据自动打卡返回的状态码判断是否打卡成功，如果没有成功，则把未成功的点放入补偿列表，然后循环打卡
			// 6. 每次打完卡，判断一下是不是所有的标记都是 true，如果是，则将全局标记变量改为 true
			const that = this;
			const token = uni.getStorageSync('id_token');
			const userInfo = uni.getStorageSync('userInfo');
			const currentItem = uni.getStorageSync('raceInfo');
			
			uni.request({
				url: `${constants.baseUrl}/races/items/${itemId}/routes`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					that.data = data;
					
					that.data.forEach((item, index) => {
						that.pointTitles.push({
							title: item.title,
							checked: item.checkedFlag
						});
						let iconPath = `/static/map/location.png`;
						const mark = {
							iconPath: iconPath,
							id: index,
							longitude: item.lng,
							latitude: item.lat,
							width: 32,
							height: 32
						};
						that.markers.push(mark);
					});
					
					
					// if (that.raceInfo.itemId === that.itemId) {
					// 	// 检查userCheckedIndexList，排除已签到的点
					// 	if (that.userCheckedIndexList) {
					// 		that.userCheckedIndexList.forEach(item => {
					// 			that.pointTitles[item].checked = true;
					// 		});
					// 	}
					// }
					
					that.myInterval = setInterval(() => {
						wx.getLocation({
							type: 'gcj02',
							success(res) {
								let latitude= res.latitude;
								let longitude = res.longitude;
								// 持续获取当前位置信息，在 routes 中对比距离，如果距离小于等于150m，则弹出签到卡片，签到成功后，将此 route 数据标记为已签到,并添加到 userCheckedIndexList
								that.data.forEach((item, index) => {
		
									if (!item.checkedFlag) {
										const latData = item.lat;
										const lngData = item.lng;
										const distance = that.getDistance(latitude, longitude, latData, lngData);
										if (distance <= 120) {
											that.currentPoint = item;
											console.log('currentIndex', index);
											// 获取当前要签到的点的下标
											that.currentIndex = index;
											that.showDialog = true;
											// 将用户已签到的点存储起来
											const isExist = that.userCheckedIndexList.findIndex(element => element === index);
											if (isExist === -1) {
												that.userCheckedIndexList.push(index);
												console.log('用户已签到数据');
												console.log(that.userCheckedIndexList);
											}
										}	
									}
								});
							}
						});
					}, 2000);
					
					// 自动打卡
					console.log('自动打卡', that.userCheckedIndexList);
					that.checkInterval = setInterval(() => {
						that.userCheckedIndexList.forEach(index => {
							const item = that.data[index];
							console.log(currentItem.itemId, item.itemId.id);
							if ((currentItem.itemId === item.itemId.id) || !currentItem) {
								if (!item.isChecked) {
									wx.getLocation({
										type: 'gcj02',
										success: function(res) {
											let latitude = res.latitude;
											let longitude = res.longitude;
											if (that.isDebug) {
												latitude = 31.493489;
												longitude = 120.487983;
											}
											const payload = {
												itemId: { id: that.itemId },
												title: item.title,
												checkInPoint: latitude + ',' + longitude,
												spendTime: that.nums
											};
											uni.request({
												url: `${constants.baseUrl}/races/items/routes/checkin`,
												method: 'POST',
												header: {
													'content-type': 'application/json',
													Authorization: 'Bearer ' + token
												},
												data: payload,
												success: res => {
													const { data } = res.data;
													item.isChecked = true;
													that.userCheckedIndexList.forEach(value => {
														that.pointTitles[value].checked = true;
													});
													uni.setStorageSync('userCheckedIndexList', that.userCheckedIndexList);
												},
												fail: () => {},
												complete: () => {}
											});
											if (that.userCheckedIndexList.length === that.data.length) {
												that.modalName = 'DialogModal1';
												that.complete = true;
												that.showDialog = false;
												that.enableScroll = true;
												
												that.raceInfo.itemId = that.itemId;
												that.raceInfo.complete = true;
												that.raceInfo.index = 0;
												uni.setStorageSync('raceInfo', that.raceInfo);
												clearInterval(that.myInterval);
												clearInterval(that.timer);
												clearInterval(that.drawInterval);
												clearInterval(that.checkInterval);
												return;
											}
											
											that.raceInfo.index = parseInt(that.raceInfo.index, 10) + 1;
											uni.setStorageSync('raceInfo', that.raceInfo);
											
											that.showDialog = false;
											that.enableScroll = true;
										}
									})
								}
							}
						})
					}, 5000);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		autoCheckIn: function(item, lat, lng) {},
		checkin() {
			const that = this;
			const token = uni.getStorageSync('id_token');
			const userInfo = uni.getStorageSync('userInfo');
			const itemId = that.itemId;
			that.countTime();
			
			that.drawInterval = setInterval(() => {
				wx.getLocation({
					type: 'gcj02',
					success: function(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
											
						// 计算距离
						let newCover = {
							latitude,
							longitude
						};
						that.drawline(newCover);
					}
				})
			}, 1000);
			
			// 要签到的点的数据
			const checkInData = that.data[that.currentIndex];
			const checkInPoint = checkInData.latitude + ',' + checkInData.longitude;
			console.log('checkInPoint', checkInPoint);
			
			const payload = {
				itemId: { id: itemId },
				title: checkInData.title,
				checkInPoint,
				spendTime: that.nums
			};
			wx.getLocation({
				type: 'gcj02',
				success: function(res) {
					payload.checkInPoint = res.latitude + ',' + res.longitude;
					uni.request({
						url: `${constants.baseUrl}/races/items/routes/checkin`,
						method: 'POST',
						header: {
							'content-type': 'application/json',
							Authorization: 'Bearer ' + token
						},
						data: payload,
						success: res => {
							const { data } = res.data;
							checkInData.isChecked = true;
							that.userCheckedIndexList.forEach(item => {
								that.pointTitles[item].checked = true;
							});
							uni.setStorageSync('userCheckedIndexList', that.userCheckedIndexList);
						},
						fail: () => {},
						complete: () => {}
					});
				}
			});
			
		
			
			if (that.userCheckedIndexList.length === that.data.length) {
				that.modalName = 'DialogModal1';
				that.complete = true;
				that.showDialog = false;
				that.enableScroll = true;
				
				that.raceInfo.itemId = that.itemId;
				that.raceInfo.complete = true;
				that.raceInfo.index = 0;
				uni.setStorageSync('raceInfo', that.raceInfo);
				clearInterval(that.myInterval);
				clearInterval(that.timer);
				return;
			}
			
			that.raceInfo.index = parseInt(that.raceInfo.index, 10) + 1;
			uni.setStorageSync('raceInfo', that.raceInfo);
			
			that.showDialog = false;
			that.enableScroll = true;
		},
		hideModal(e) {
			this.modalName = null;
		},
		completeRace() {
			this.modalName = null;
			uni.removeStorageSync('raceInfo');
			uni.removeStorageSync('userCheckedIndexList');
			uni.navigateBack({
				delta: 1
			})
		},
		getDistance(lat1, lng1, lat2, lng2) {
			var dis = 0;
			var radLat1 = toRadians(lat1);
			var radLat2 = toRadians(lat2);
			var deltaLat = radLat1 - radLat2;
			var deltaLng = toRadians(lng1) - toRadians(lng2);
			var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
			return dis * 6378137;
			function toRadians(d) {
				return (d * Math.PI) / 180;
			}
		},
		countTime() {
			let that = this;
			let hour, minute, second;
			hour = minute = second = 0; //初始化
			let millisecond = 0; //毫秒
			that.timer = setInterval(function() {
				millisecond = millisecond + 50;
				if (millisecond >= 1000) {
					millisecond = 0;
					second = second + 1;
				}
				if (second >= 60) {
					second = 0;
					minute = minute + 1;
					that.minute = minute;
				}
				if (minute >= 60) {
					minute = 0;
					hour = hour + 1;
					that.hour = hour;
				}
				that.nums = hour + ':' + minute + ':' + second;
			}, 50);
		},
		startRace() {
			const that = this;
			this.polyline[0].points = [];
			that.raceInterval = setInterval(function() {
				wx.getLocation({
					type: 'gcj02',
					success(res) {
						console.log(res);
						const latitude = res.latitude;
						const longitude = res.longitude;
					
						// 计算距离
						let newCover = {
							latitude,
							longitude
						};
						let oriCovers = that.covers;
						let len = oriCovers.length;
						let lastCover;
						if (len == 0) {
							oriCovers.push(newCover);
						}
						len = oriCovers.length;
						lastCover = oriCovers[len - 1];

						let newMeters = that.getDistance(lastCover.latitude, lastCover.longitude, res.latitude, res.longitude) / 1000;
						if (newMeters < 0.0015) {
							newMeters = 0.0;
						}
						
						oriCovers.push(newCover);
						that.drawline(newCover);
					}
				});
				console.log(that.polyline[0]);
			}, 2000);
			that.isStart = true;
			that.countTime();
			// that.mapUpdate();
		},
		drawline(point) {
			this.polyline[0].points.push(point);
		},
		endRace() {
			const token = uni.getStorageSync('id_token');
			clearInterval(this.raceInterval);
			clearInterval(this.timer);
			this.isStart = false;
			const payload = {
				points: this.polyline[0].points,
				raceId: { id: this.raceId },
				itemId: { id: this.itemId },
				spendTime: this.nums,
				score: this.meters
			};
			uni.request({
				url: `${constants.baseUrl}/races/items/scores`,
				method: 'PUT',
				data: payload,
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					console.log(data);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		mapUpdate() {
			wx.startLocationUpdate({
				success(res) {
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(res)
					});
				},
				complete(res) {
					console.log('获取位置');
					console.log(res);
				}
			});
		}
	},
	onLoad(param) {
		this.raceId = param.raceId;
		this.itemId = param.itemId;
		const raceInfo = uni.getStorageSync('raceInfo');
		console.log('race info');
		console.log(raceInfo);
		if (!raceInfo) {
			this.raceInfo.itemId = param.itemId;
		}
		
		const that = this;
		
		const userCheckedIndexList = uni.getStorageSync('userCheckedIndexList');
		if (userCheckedIndexList) {
			that.userCheckedIndexList = userCheckedIndexList;
		}
		
		wx.startLocationUpdateBackground({
			success(res) {
				console.log(res);
			}
		});

		if (that.isDebug) {
			this.lng = 120.488069;
			this.lat = 31.493672;
		} else {
			wx.getLocation({
				type: 'gcj02',
				isHighAccuracy: true,
				success(res) {
					console.log(res);
					that.lat = res.latitude;
					that.lng = res.longitude;
				}
			});
		}
		this.loadRouteData(this.itemId);
	},
	onUnload() {
		clearInterval(this.myInterval);
		clearInterval(this.timer);
		clearInterval(this.drawInterval);
		clearInterval(this.checkInterval);
	}
};
</script>

<style>
map {
	position: relative;
}
.btn-box {
	position: absolute;
	bottom: 30rpx;
	left: 38%;
}
.cu-round {
	position: relative;
	width: 180rpx;
	height: 180rpx;
	border-radius: 90rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 40upx;
	line-height: 180rpx;
	text-align: center;
	text-decoration: none;
	margin-left: initial;
	margin-right: initial;
}
.cu-round::after {
	border: 0upx;
}
.info-box {
	width: 100vw;
	height: 20%;
	background-color: rgba(255, 255, 255, 1);
	/* background: linear-gradient(#f43f3bfb, #ec008c6b 20%, #f43f3bfb); */
	position: absolute;
	bottom: 0;
}
.text-number {
	/* font-family: "Courier New", Courier, monospace; */
}

.cover-view {
	position: absolute;
	bottom: calc(50% + 100rpx);
	left: calc(50% - 230rpx);
	z-index: 99;
	box-reflect: below 5px linear-gradient(transparent 60%, rgba(0,0,0,.3));
}

.flex-wrp {
	position: relative;
	display: flex;
	/* border: 1px solid #555; */
	border-radius: 8rpx;
	box-shadow: 1rpx 1rpx 8rpx #888;
	box-reflect: below 5px linear-gradient(transparent 60%, rgba(0,0,0,.3));
}

.triangle::after {
	position: absolute;
	left: 180rpx;
	bottom: 20rpx;
	content: '';
	width: 100rpx;
	height: 100rpx;
	border-radius: 8rpx;
	background-color: #FFFFFF;
	box-shadow: 1rpx 1rpx 8rpx #888;
	transform: rotate(45deg);
	z-index: 0;
}

.flex-item {
	width: 400rpx;
	height: 100rpx;
	font-size: 26rpx;
}

.cu-steps .cu-item:nth-of-type(2):before {
	content: "";
	display: block;
	position: absolute;
	height: 0px;
	width: calc(100%);
	border-bottom: none;
	left: calc(0px - (100%) / 2);
	top: 40rpx;
	z-index: 0;
}

.cu-steps .cu-item:nth-of-type(2):after {
	width: calc(100%);
	left: calc(0px - (100%) / 2);
}

</style>
