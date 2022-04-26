import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/utils/rem'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(MintUI)
Vue.prototype.judgmentPhone = /^1[3456789]\d{9}$/;		//手机号正则

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
