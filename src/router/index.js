import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>System.import('@/pages/login')
const index = resolve=>System.import('@/pages/index')
const service = resolve=>System.import('@/pages/service')
const associated_task = resolve=>System.import('@/pages/associated_task')
const create_problem = resolve=>System.import('@/pages/create_problem')
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
		path: '/service',
		name:"客服",
		component: service
	},
	{
		path: '/associated_task',
		name:"关联任务",
		component: associated_task
	},
	{
		path: '/create_problem',
		name:"新增问题",
		component: create_problem
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
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router;
