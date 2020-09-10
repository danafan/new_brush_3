import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/utils/rem'
import VueClipboards from 'vue-clipboards';

Vue.use(MintUI)
Vue.use(VueClipboards);

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
