import http from './request.js'
let path = {	
	getUserStatus:'user/getuserinfo',					//获取用户信息
	login:'user/login',									//登录
	applyTask:'task/applytask',							//申请任务
	cancelApply:'task/cancelapply',						//取消申请
	noConfirmTask:'task/noconfirmtask',					//首页取消
	confirmTask:'task/confirmtask',						//首页确定
	getUserTask:'task/getusertask',						//获取用户任务
	taskDetail:'task/getdetail',						//任务详情
	abandonTask:'task/abandontask',						//取消任务
	checkTask:'task/taskcheck',							//任务检查
	commitTask:'task/taskcommit',						//提交任务
	getPrenticeTask:'task/getprenticetask',				//徒弟任务
	feedbackList:'userfeedback/list',					//反馈列表
	uploadFile:'file/upload',							//上传文件
	delFile:'file/del',									//删除文件
	createFeedBack:'userfeedback/add',					//新增问题
	todayUserTask:'task/gettodayusertask',				//用户当天任务
	getLatestNotice:'usernotice/getlatestnotice',		//获取公告
		
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
	//首页取消
	noConfirmTask(params){
		return http.post(path.noConfirmTask, params)
	},
	//首页确定
	confirmTask(params){
		return http.post(path.confirmTask, params)
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
	//提交任务
	commitTask(params){
		return http.post(path.commitTask, params)
	},
	//查询徒弟任务
	getPrenticeTask(params){
		return http.get(path.getPrenticeTask, params)
	},
	//反馈列表
	feedbackList(params){
		return http.get(path.feedbackList, params)
	},
	//上传文件
	uploadFile(params){
		return http.post(path.uploadFile, params)
	},
	//删除文件
	delFile(params){
		return http.get(path.delFile, params)
	},
	//新增问题
	createFeedBack(params){
		return http.post(path.createFeedBack, params)
	},
	//用户当天任务
	todayUserTask(params){
		return http.get(path.todayUserTask, params)
	},
	//获取公告
	getLatestNotice(params){
		return http.get(path.getLatestNotice, params)
	},

}