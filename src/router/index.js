import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>System.import('@/pages/login')
const index = resolve=>System.import('@/pages/index')
const order_detail = resolve=>System.import('@/pages/order_detail')
const disciple = resolve=>System.import('@/pages/disciple')
const disciple_order = resolve=>System.import('@/pages/disciple_order')


Vue.use(Router);

const router = new Router({
	routes: [
	{
		path: '/login',
		name:"登录",
		component: login
	},
	{
		path: '/index',
		name:"首页",
		component: index
	},
	{
		path: '/order_detail',
		name:"任务详情",
		component: order_detail
	},
	{
		path: '/disciple',
		name:"徒弟列表",
		component: disciple
	},
	{
		path: '/disciple_order',
		name:"徒弟订单",
		component: disciple_order
	},
	]
})
// 路由跳转前的钩子
// router.beforeEach( (to, from, next) => {
// 	document.title = to.name
// 	next()
// })

export default router;
