import Vue from 'vue'
import App from './App'

// import square from './pages/square/home.vue'
// Vue.component('square',square)

// import activity from './pages/activity/home.vue'
// Vue.component('activity',activity)

// import topic from './pages/topic/home.vue'
// Vue.component('topic',topic)

// import coupon from './pages/coupon/home.vue'
// Vue.component('coupon',coupon)

// import mine from './pages/mine/home.vue'
// Vue.component('mine',mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
