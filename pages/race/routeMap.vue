<template>
	<view>
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
				style="width: 100%; height: 70vh;"
			>
				<view class="cover-view" v-if="showDialog">
					<view class="triangle"></view>
					<view class="container padding">
						<view class="flex-wrp flex-direction bg-white">
							<view class="flex-item flex flex-direction">
								<view class="title padding-sm text-black text-bold">{{ currentPoint.title }}</view>
								<view class="desc padding-left-sm">地址：{{ currentPoint.address }}</view>
							</view>
							<view class="flex justify-center margin-top">
								<button class="cu-btn round bg-orange text-white shadow margin-bottom-sm" @click="checkin"><text class="padding-lr-sm">我要签到</text></button>
							</view>
						</view>
					</view>
				</view>
			</map>
		</view>
		<view class="info-box flex align-center">
			<scroll-view scroll-x class="response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll" scroll-with-animation>
				<view class="cu-item padding-lr-xl" :class="index > scroll ? 'text-gray' : 'text-blue'" v-for="(item, index) in pointTitles" :key="index" :id="'scroll-' + index">
					{{ item }}
					<text class="num" :data-index="index + 1"></text>
				</view>
			</scroll-view>
		</view>

		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">您已完成比赛</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action"><button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button></view>
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
			isDebug: false
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
			const that = this;
			const token = uni.getStorageSync('id_token');
			const userInfo = uni.getStorageSync('userInfo');
			uni.request({
				url: `${constants.baseUrl}/races/items/${itemId}/routes`,
				method: 'GET',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				success: res => {
					const { data } = res.data;
					console.log(data);
					that.data = data;
					data.forEach((item, index) => {
						that.pointTitles.push(item.title);
						let iconPath = `/static/map/${index}.png`;
						let width = 32;
						let height = 32;
						if (index === 0) {
							iconPath = '/static/map/start.png';
							width = 48;
							height = 48;
						}
						const mark = {
							iconPath: iconPath,
							id: index,
							longitude: item.lng,
							latitude: item.lat,
							width: width,
							height: height
						};
						that.markers.push(mark);
					});
					console.log(that.markers);

					// if (that.currentIndex === data.length - 1) {
					// 	clearInterval(that.myInterval);
					// 	return;
					// }
					that.currentPoint = that.data[that.currentIndex];
					
					that.myInterval = setInterval(() => {
						const { lng, lat } = that.currentPoint;
						console.log('经纬度');
						console.log(lng, lat);
						// 实时获取当前位置
						wx.getLocation({
							type: 'gcj02',
							success(res) {
								// 绘制路线
								let latitude;
								let longitude
								if (that.isDebug) {
									latitude = 31.493672;
									longitude = 120.488069;
								} else {
									latitude = res.latitude;
									longitude = res.longitude;
								}
								const speed = res.speed;
								if (speed > 0) {
									that.speed = speed.toFixed(2);
								}
								const point = {
									longitude,
									latitude
								};
								that.drawline(point);

								that.currentPointStr = latitude + ',' + longitude;

								const distance = that.getDistance(latitude, longitude, lat, lng);
								const checkinedIndex = that.currentIndex;
								console.log(distance, checkinedIndex, that.checkinIndexList.findIndex(value => value === checkinedIndex) === -1);
								if (distance <= 150 && that.checkinIndexList.findIndex(value => value === checkinedIndex) === -1) {
									console.log('11111');
									that.enableScroll = false;
									that.showDialog = true;
									that.lng = lng;
									that.lat = lat;
								}
							}
						});
					}, 2000);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		checkin() {
			const that = this;
			const token = uni.getStorageSync('id_token');
			const userInfo = uni.getStorageSync('userInfo');
			const itemId = that.itemId;
			that.countTime();
			that.checkinIndexList.push(that.currentIndex);
			that.scroll = that.currentIndex;

			const payload = {
				itemId: { id: itemId },
				title: that.currentPoint.title,
				checkInPoint: that.currentPointStr,
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
					console.log(data);
				},
				fail: () => {},
				complete: () => {}
			});
			
			// uni.navigateTo({
			// 	url: `/pages/race/intro?itemId=${itemId}&index=${that.currentIndex}`
			// })
			
			if (that.currentIndex === that.data.length - 1) {
				this.modalName = 'DialogModal1';
				that.showDialog = false;
				that.enableScroll = true;
				clearInterval(that.myInterval);
				clearInterval(that.timer);
				return;
			}
			that.currentIndex += 1;
			console.log('currentIndex', that.currentIndex);
			that.showDialog = false;
			that.enableScroll = true;
			that.currentPoint = that.data[that.currentIndex];
		},
		hideModal(e) {
			this.modalName = null;
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
						// that.info = JSON.stringify(res);
						const latitude = res.latitude;
						const longitude = res.longitude;
						const speed = res.speed;
						if (speed > 0) {
							that.speed = speed.toFixed(2);
						}
						const point = {
							longitude,
							latitude
						};

						// 计算距离
						let newCover = {
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: '/static/location.png'
						};
						let oriCovers = that.covers;
						let len = oriCovers.length;
						let lastCover;
						if (len == 0) {
							oriCovers.push(newCover);
						}
						len = oriCovers.length;
						lastCover = oriCovers[len - 1];

						console.log('oriCovers----------');
						console.log(oriCovers, len);
						// if ((lastCover.latitude!==res.latitude) && (lastCover.longitude!==res.longitude)) {
						// }
						let newMeters = that.getDistance(lastCover.latitude, lastCover.longitude, res.latitude, res.longitude) / 1000;
						if (newMeters < 0.0015) {
							newMeters = 0.0;
						}
						that.oriMeters = that.oriMeters + newMeters;
						console.log('newMeters----------');
						console.log(newMeters);
						console.log('oriMeters:', that.oriMeters);
						let meters = new Number(that.oriMeters);
						let showMeters = meters.toFixed(2);
						console.log('showMeters:', showMeters);
						that.meters = showMeters;
						oriCovers.push(newCover);
						that.drawline(point);
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
		const that = this;
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
</style>
