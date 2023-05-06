import http from './request.js'
let path = {	
	getUserStatus:'user/getuserinfo',					//获取用户信息
	getTips:'usernotice/gettips',						//获取提示内容
	loginverify:'user/loginverify',						//发送验证码
	login:'user/loginnew',									//登录
	applyTask:'task/applytask',							//申请任务
	cancelApply:'task/cancelapply',						//取消申请
	noConfirmTask:'task/noconfirmtask',					//首页取消
	confirmTask:'task/confirmtask',						//首页确定
	getUserTask:'task/getusertask',						//获取用户任务
	taskDetail:'task/getdetail',						//任务详情
	abandonTask:'task/abandontask',						//取消任务
	checkTask:'task/taskcheck',							//任务检查
	taskOrderCommit:'task/taskordercommit',				//得物提交
	commitTask:'task/taskcommit',						//提交任务
	getPrenticeTask:'task/getprenticetask',				//徒弟任务
	feedbackList:'userfeedback/list',					//反馈列表
	uploadFile:'file/upload',							//上传文件
	delFile:'file/del',									//删除文件
	createFeedBack:'userfeedback/add',					//新增问题
	todayUserTask:'task/gettodayusertask',				//用户当天任务
	getLatestNotice:'usernotice/getnotices',			//获取公告
	bannerList:'banner/getbanners',						//获取banner列表
	getSmsCode:'user/getsmscode',						//获取绑定验证码
	bindPhone:'user/bindphone',							//绑定手机号
	getWxWranturl:'user/getwxgranturl',					//获取微信二维码
	getSmsCodeForbindwx:'user/getsmscodeforbindwx',		//给师傅发送短信验证码
	masterSmsVerify:'user/mastersmsverify',				//师傅验证码验证
	bindaliPayAcount:'user/bindalipay',					//绑定支付宝
	bindBank:'user/bindbank',							//绑定银行卡
	getEvaluateTask:'evaluate/getevaluatetask',			//获取买家秀任务
	getEvaluateDetail:'evaluate/getevaluatedetail',		//买家秀任务详情
	cancelEvaluate:'evaluate/cancelevaluate',			//取消任务
	submitEvaluate:'evaluate/submitevaluate',			//提交任务
	getEvaluateNum:'user/getuserstatus',				//获取待处理买家秀任务数量
	checkTkl:'task/taskchecktkl',						//验证淘口令
	getTaskTip:'task/gettasktip',						//获取任务提示

}
export default{
	//获取用户信息
	getUserStatus(params){
		return http.get(path.getUserStatus, params)
	},
	//获取提示内容
	getTips(params){
		return http.get(path.getTips, params)
	},
	//发送验证码
	loginverifyGet(params){
		return http.get(path.loginverify, params)
	},
	//提交验证码
	loginverifyPost(params){
		return http.post(path.loginverify, params)
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
	//得物提交
	taskOrderCommit(params){
		return http.post(path.taskOrderCommit, params)
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
	//获取banner列表
	bannerList(params){
		return http.get(path.bannerList, params)
	},
	//获取绑定验证码
	getSmsCode(params){
		return http.get(path.getSmsCode, params)
	},
	//绑定手机号
	bindPhone(params){
		return http.post(path.bindPhone, params)
	},
	//获取微信二维码
	getWxWranturl(params){
		return http.get(path.getWxWranturl, params)
	},
	//给师傅发送短信验证码
	getSmsCodeForbindwx(params){
		return http.get(path.getSmsCodeForbindwx, params)
	},
	//师傅验证码验证
	masterSmsVerify(params){
		return http.post(path.masterSmsVerify, params)
	},
	//绑定支付宝
	bindaliPayAcount(params){
		return http.post(path.bindaliPayAcount, params)
	},
	//绑定银行卡
	bindBank(params){
		return http.post(path.bindBank, params)
	},
	//获取买家秀任务
	getEvaluateTask(params){
		return http.get(path.getEvaluateTask, params)
	},
	//买家秀任务详情
	getEvaluateDetail(params){
		return http.get(path.getEvaluateDetail, params)
	},
	//取消任务
	cancelEvaluate(params){
		return http.post(path.cancelEvaluate, params)
	},
	//提交任务
	submitEvaluate(params){
		return http.post(path.submitEvaluate, params)
	},
	//获取待处理买家秀任务数量
	getEvaluateNum(params){
		return http.get(path.getEvaluateNum, params)
	},
	//验证淘口令
	checkTkl(params){
		return http.post(path.checkTkl, params)
	},
	//获取任务提示
	getTaskTip(params){
		return http.get(path.getTaskTip, params)
	},

}