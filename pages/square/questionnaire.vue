<template>
	<view>
		<cu-custom bgColor="bg-gradual-purple" :isBack="true"><block slot="content">问卷调查</block></cu-custom>
		<view>
			<view class="text-center text-bold text-lg padding-sm bg-gradual-purple">黄浦区第五届楼宇运动会 问卷调查</view>
			<form>
				<view class="cu-form-group margin-top">
					<view class="title"><text class="text-red padding-right-xs">*</text>您的姓名</view>
					<input name="input" @input="userNameInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red padding-right-xs">*</text>您的年龄</view>
					<picker @change="agePickerChange" :value="ageIndex" :range="agePicker">
						<view class="picker">
							{{ageIndex>-1?agePicker[ageIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red padding-right-xs">*</text>您的性别</view>
					<picker @change="genderPickerChange" :value="genderIndex" :range="genderPicker">
						<view class="picker">
							{{genderIndex>-1?genderPicker[genderIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red padding-right-xs">*</text>您在单位的职位属于</view>
					<picker @change="jobPickerChange" :value="jobIndex" :range="jobPicker">
						<view class="picker">
							{{jobIndex>-1?jobPicker[jobIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red padding-right-xs">*</text>您目前从事的行业</view>
					<picker @change="businessPickerChange" :value="businessIndex" :range="businessPicker">
						<view class="picker">
							{{businessIndex>-1?businessPicker[businessIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group">
					<view class="title">公司名称（选填）</view>
					<input name="input" @input="companyInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text style="letter-spacing: 1em;">手机</text>（选填）</view>
					<input name="input" @input="phoneNumberInput"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">所属楼宇（选填）</view>
					<input name="input" @input="buildingInput"></input>
				</view>
				
				
				<view class="cu-form-group">
					<view class="title"><text class="text-red padding-right-xs">*</text>是否参加过黄浦区楼宇运动会？</view>
					<picker @change="hasJoinPickerChange" :value="hasJoinIndex" :range="hasJoinPicker">
						<view class="picker">
							{{hasJoinIndex>-1?hasJoinPicker[hasJoinIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group" v-if="hasJoin">
					<view class="title"><text class="text-red padding-right-xs">*</text>参加过几届黄浦区楼宇运动会？</view>
					<picker @change="sessionPickerChange" :value="sessionIndex" :range="sessionPicker">
						<view class="picker">
							{{sessionIndex>-1?sessionPicker[sessionIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red padding-right-xs">*</text>信息渠道？</view>
					<picker @change="infoWayPickerChange" :value="infoWayIndex" :range="infoWayPicker">
						<view class="picker">
							{{infoWayIndex>-1?infoWayPicker[infoWayIndex]:'通过什么渠道获取运动会信息'}}
						</view>
					</picker>
				</view>
				
				<view class="cu-bar bg-white padding-bottom-sm">
					<view class="action" style="border-top: 1upx solid #eee">
						<view class="text-black margin-top-sm" style="text-align: justify;padding-right: 30upx;font-size: 30upx;"  @tap="showModal" data-target="ChooseModal">
							希望本届黄浦楼宇运动会提供哪些服务项目？（多选，可选5项）
							<text class="text-sm text-gray">选择您想参加的赛事</text>
						</view>
					</view>
				</view>
				<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop="">
						<view class="cu-bar bg-white">
							<view class="action text-black" @tap="hideModal">取消</view>
							<view class="action text-purple" @tap="hideModal">确定</view>
						</view>
						<view class="grid col-3 padding-sm">
							<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
								<button class="cu-btn block" :class="item.checked?'bg-purple':'line-purple'" @tap="ChooseCheckbox"
								 :data-value="item.value"> {{item.name}}
								</button>
							</view>
						</view>
					</view>
				</view>
				
				<view class="cu-form-group">
					<view class="title">其他项目</view>
					<input name="input" placeholder="填写您想参加的项目（不含以上项目）" @input="otherItemsInput"></input>
				</view>
			</form>
				
			<button class="cu-btn bg-gradual-purple block margin-sm lg margin-bottom" @click="submitForm">
				提交问卷
			</button>
		</view>
	</view>
</template>

<script>
	import * as constants from '@/utils/constant.js';
	export default {
		data() {
			return {
				payload: {},
				ageIndex: -1,
				genderIndex: -1,
				jobIndex: -1,
				businessIndex: -1,
				hasJoinIndex: -1,
				sessionIndex: -1,
				infoWayIndex: -1,
				serveItems: [],
				modalName: null,
				hasJoin: false,
				agePicker: ['25岁及以下', '26~30岁', '31~40岁', '41~50岁', '51~60岁', '61岁及以上'],
				genderPicker: ['男', '女'],
				jobPicker: ['高层领导', '中层骨干', '基层员工'],
				businessPicker: ['IT/软硬件服务/电子商务/因特网运营', '快速消费品（食品/饮料/化枚品）', '批发/零售', '服装/纺织/皮革', '家具/工艺品/玩具', '教育/培训/科研/院校', '家电', '通信/电信运营/网络设备/增值服务', '制造业', '汽车及零配件', '餐饮/娱乐/旅游/酒店/生活服务', '办公用品及设备', '会计/审计', '法律', '银行/保险/证券/投资银行/风险基金', '电子技术/半导体/集成电路', '仪器仪表/工业自动化', '贸易/进出口', '机械/设备/重工', '制药/生物工程/医疔设备/器械', '医疗/护理/保健/卫生', '广告/公关/媒体/艺术', '出版/印刷/包装', '房地产开发/建筑工程/装潢/设计', '物业管理/商业中心', '中介/咨词/猎头/从证', '交通/运输/物流', '航天/航空/能源/化工', '农业/渔业/林业', '其他行业'],
				hasJoinPicker: ['是', '否'],
				sessionPicker: ['一届','二届','三届','四届'],
				infoWayPicker: ['媒体报道','黄浦运动派微信公众号','企业内部宣传','活动现场', '其他'],
				checkbox: [{
					value: 0,
					name: '羽毛球',
					checked: false,
				}, {
					value: 1,
					name: '乒乓球',
					checked: false,
				}, {
					value: 2,
					name: '篮球三对三',
					checked: false,
				}, {
					value: 3,
					name: '篮球五对五',
					checked: false,
				}, {
					value: 4,
					name: '夜跑',
					checked: false,
				}, {
					value: 5,
					name: '家庭亲子团体赛',
					checked: false,
				}, {
					value: 6,
					name: '电子竞技',
					checked: false,
				}, {
					value: 7,
					name: '保龄球',
					checked: false,
				}]
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseCheckbox(e) {
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				if (this.serveItems.length < 5) {					
					for (let i = 0, lenI = items.length; i < lenI; ++i) {
						if (items[i].value == values) {
							items[i].checked = !items[i].checked;
							this.serveItems.push(items[i]);
							break
						}
					}
				}
			},
			userNameInput(e) {
				const value = e.detail.value;
				this.payload.userName = value;
			},
			companyInput(e) {
				const value = e.detail.value;
				this.payload.company = value;
			},
			phoneNumberInput(e) {
				const value = e.detail.value;
				this.payload.phoneNumber = value;
			},
			buildingInput(e) {
				const value = e.detail.value;
				this.payload.buildingName = value;
			},
			otherItemsInput(e) {
				const value = e.detail.value;
				this.payload.otherItems = value;
			},
			genderPickerChange(e) {
				this.genderIndex = e.detail.value
				this.payload.gender = this.genderPicker[this.genderIndex];
			},
			agePickerChange(e) {
				this.ageIndex = e.detail.value
				this.payload.age = this.agePicker[this.ageIndex];
			},
			jobPickerChange(e) {
				this.jobIndex = e.detail.value
				this.payload.job = this.jobPicker[this.jobIndex];
			},
			businessPickerChange(e) {
				this.businessIndex = e.detail.value
				this.payload.business = this.businessPicker[this.businessIndex];
			},
			hasJoinPickerChange(e) {
				const value = e.detail.value == 0 ? true : false;
				this.hasJoin = value;
				this.hasJoinIndex = e.detail.value
				this.payload.hasJoin = this.hasJoin;
			},
			sessionPickerChange(e) {
				this.sessionIndex = e.detail.value
				this.payload.joinName = this.sessionPicker[this.sessionIndex];
			},
			infoWayPickerChange(e) {
				this.infoWayIndex = e.detail.value
				this.payload.infoWay = this.infoWayPicker[this.infoWayIndex];
			},
			submitForm() {
				if (this.serveItems.length > 0) {
					this.payload.serveItems = JSON.stringify(this.serveItems);
				}
				if (this.hasJoin && (!this.payload.joinName || this.payload.joinName.length === 0)) {
					uni.showToast({
						icon: 'none',
						title: '请检查必填项'
					});
					return;
				}
				if (!this.payload.userName || !this.payload.age || !this.payload.gender || !this.payload.job || !this.payload.business || !this.payload.infoWay) {
					uni.showToast({
						icon: 'none',
						title: '请检查必填项'
					});
					return;
				}
				uni.showToast({
					icon: 'success',
					title: '提交成功',
					duration: 2000,
					success: () => {
						uni.reLaunch({
							url: '/pages/square/home'
						});
					}
				});
				// uni.request({
				// 	url: `${constants.baseUrl}/global/questionnaire`,
				// 	method: 'POST',
				// 	data: this.payload,
				// 	success: res => {
				// 		uni.showToast({
				// 			icon: 'success',
				// 			title: '提交成功',
				// 			duration: 2000,
				// 			success: () => {
				// 				uni.reLaunch({
				// 					url: '/pages/square/home'
				// 				});
				// 			}
				// 		});
				// 	},
				// 	fail: () => {
				// 	},
				// 	complete: () => {}
				// });
			}
		}
	}
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
