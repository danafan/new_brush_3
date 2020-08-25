import http from './request.js'
let path = {	
	getUserStatus:'user/getuserinfo',					//获取用户信息
	login:'user/login',									//登录
	applyTask:'task/applytask',							//申请任务
	cancelApply:'task/cancelapply',						//取消申请
	getUserTask:'task/getusertask',						//获取用户任务
	taskDetail:'task/getdetail',						//任务详情
	abandonTask:'task/abandontask',						//取消任务
	checkTask:'task/taskcheck',							//任务检查
	getPrenticeTask:'task/getprenticetask',				//土地任务
		
}
export default{
	//获取用户信息
	getUserStatus(params){
		return http.get(path.getUserStatus, params)
	},
	//登录
	login(params){
		return http.post(path.login, params)
	},
	//申请任务
	applyTask(params){
		return http.get(path.applyTask, params)
	},
	//取消申请
	cancelApply(params){
		return http.post(path.cancelApply, params)
	},
	//获取用户任务
	getUserTask(params){
		return http.get(path.getUserTask, params)
	},
	//获取任务详情
	taskDetail(params){
		return http.get(path.taskDetail, params)
	},
	//取消任务
	abandonTask(params){
		return http.post(path.abandonTask, params)
	},
	//任务检查
	checkTask(params){
		return http.post(path.checkTask, params)
	},
	//查询徒弟任务
	getPrenticeTask(params){
		return http.get(path.getPrenticeTask, params)
	},

}