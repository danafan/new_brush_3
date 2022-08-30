import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>System.import('@/pages/login')
const tab_menu = resolve=>System.import('@/pages/tab_menu')
const index = resolve=>System.import('@/pages/index')
const mjx = resolve=>System.import('@/pages/mjx')
const mjx_detail = resolve=>System.import('@/pages/mjx_detail')
const service = resolve=>System.import('@/pages/service')
const associated_task = resolve=>System.import('@/pages/associated_task')
const create_problem = resolve=>System.import('@/pages/create_problem')
const order_detail = resolve=>System.import('@/pages/order_detail')
const disciple = resolve=>System.import('@/pages/disciple')
const disciple_order = resolve=>System.import('@/pages/disciple_order')
const toast = resolve=>System.import('@/pages/toast')
const get_code = resolve=>System.import('@/pages/get_code')
const fill_info = resolve=>System.import('@/pages/fill_info')
const bind_wx = resolve=>System.import('@/pages/bind_wx')


Vue.use(Router);

const router = new Router({
	routes: [
	{
		path: '/login',
		name:"登录",
		component: login
	},
	{
		path: '/tab_menu',
		name:"导航页",
		component: tab_menu,
		children:[
		{
			path: '/index',
			name:"接单",
			component: index
		},
		{
			path: '/mjx',
			name:"买家秀",
			component: mjx
		}
		]
	},
	{
		path: '/mjx_detail',
		name:"买家秀",
		component: mjx_detail
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
	{
		path: '/toast',
		name:"提示",
		component: toast
	},
	{
		path: '/get_code',
		name:"填写资料",
		component: get_code
	},
	{
		path: '/fill_info',
		name:"填写资料",
		component: fill_info
	},
	{
		path: '/bind_wx',
		name:"填写资料",
		component: bind_wx
	},
	]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
	document.title = to.name;
	next();
})

export default router;
