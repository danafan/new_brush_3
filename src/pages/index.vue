<template>
	<div class="index_container">
		<div class="title_box">
			<div class="service" @click="$router.push('/service')">反馈问题</div>
			<div class="title_text">接单</div>
			<div class="route_title" v-if="userInfo.user_type == 1" @click="$router.push('/disciple')">徒弟列表</div>
		</div>
		<div class="announcement" v-if="announcement != ''" @click="showAnnouncement = true">
			<div class="left">
				<img class="announcement_icon" src="../assets/announcement.png">
				<div class="announcement_text">{{announcement}}</div>
			</div>
			<img class="right_icon" src="../assets/right.png">
		</div>
		<div class="list_content">
			<div class="wang_box">
				<div class="left">
					<div class="tag_img"></div>
					<div class="wang_code">{{userInfo.ww}}</div>
				</div>
				<div class="countdown" v-if="userInfo.task_status == 1">结束时间：{{userInfo.apply_expiration_time}}</div>
				<div class="order_but" v-if="userInfo.task_status == 0" v-clipboard="copy_value" @click="applyTask">接单</div>
				<div class="order_but has_order_but" v-if="userInfo.task_status == 1" @click="cancelApply">取消</div>
				<div class="order_but hui_order_but" v-if="userInfo.task_status == 2" @click="$toast('您有未完成订单');">已接单</div>
			</div>
			<div class="order_item" v-for="item in taskList" @click="taskDetail(item.usertask_id,item.status)">
				<img class="goods_img" :src="item.goods_img">
				<div class="goods_content">
					<div class="content_row">
						<div class="keyword">{{item.keyword}}</div>
						<div class="order_status" v-if="item.status == 0">已接</div>
						<div class="order_status" v-if="item.status == 1">待审核</div>
						<div class="order_status" v-if="item.status == 3">已取消</div>
					</div>
					<div class="content_row">
						<div class="keyword">任务编号：{{item.usertask_id}}</div>
						<div class="create_time">{{item.apply_time}}</div>
					</div>
					<div class="content_row">
						<div class="toast">{{item.msg}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 公告内容 -->
		<div class="announcement_box" v-if="showAnnouncement" @click="showAnnouncement = false">
			<div class="announcement_content">
				<div class="top">{{announcement}}</div>
				<div class="ok">确认</div>
			</div>
		</div>
		<!-- 已经接到任务 -->
		<div class="check_order" v-if="checkOrder">
			<div class="order_content">
				<div class="content_info">
					<div class="info_text">您接到一个新的任务订单，确认要开始吗？
					超过10分钟不确认将取消该任务订单</div>
					<div class="countdown">{{countdown}}</div>
				</div>
				<div class="buts">
					<div class="but" @click="noConfirmTask">取消接单</div>
					<div class="line"></div>
					<div class="but" @click="confirmTask">确认接单</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.index_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.title_box{
		background: #fff;
		width: 100%;
		height: .88rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: .2rem;
		position: relative;
		.title_text{
			font-size: .32rem;
			color: #38393A;
			font-weight:500;
		}
		.service{
			position: absolute;
			left: .2rem;
			font-size: .28rem;
			color: #000000;
		}
		.route_title{
			position: absolute;
			right: .2rem;
			font-size: .28rem;
			color: #000000;
		}
	}
	.announcement{
		border-top:1px solid #E8E8E8;
		background: #fff;
		width: 100%;
		height: .64rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: .22rem;
		padding-right: .22rem;
		.left{
			display: flex;
			align-items: center;
			.announcement_icon{
				margin-right: .1rem;
				width: .36rem;
				height: .36rem;
			}
			.announcement_text{
				flex:1;
				font-size: .24rem;
				color: #333333;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.right_icon{
			margin-left: .1rem;
			width: .36rem;
			height: .36rem;
		}
	}
	.list_content{
		flex:1;
		overflow-y: scroll;
		width: 100%;
		padding: .28rem .2rem;
		.wang_box{
			background: #fff;
			border-radius:.16rem;
			width: 100%;
			height: 1rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				.tag_img{
					margin-right: .14rem;
					border-radius: .06rem;
					background: #00C693;
					width: .1rem;
					height: .34rem;
				}
				.wang_code{
					font-size: .28rem;
					color:#333333;
					font-weight:500;
				}
			}
			.countdown{
				font-weight:500;
				font-size: .28rem;
				color:#006D51;
			}
			.order_but{
				border-radius:0 .16rem .16rem 0;
				background: #00C693;
				width: 1rem;
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: .28rem;
				color:#FFFFFF;
			}
			.has_order_but{
				background: #0C8F6D;
			}
			.hui_order_but{
				background: #8a8a8a;
			}
		}
		.order_item{
			padding: .16rem;
			margin-top: .2rem;
			background: #fff;
			border-radius:.12rem;
			width: 100%;
			display: flex;
			.goods_img{
				margin-right: .16rem;
				border-radius:50%;
				height: .88rem;
				width: .88rem;
			}
			.goods_content{
				flex:1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.content_row{
					margin-bottom: .1rem;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.keyword{
						font-size: .24rem;
						color:#333333;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.order_status{
						margin-left: .2rem;
						border-radius:.18rem;
						background: #00C693;
						width: 1.2rem;
						height: .36rem;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: .2rem;
						color:#fff;
					}
					.create_time{
						font-size: .24rem;
						color:#999999;
					}
					.toast{
						font-size: .24rem;
						color:#ff5858;
					}
				}
			}
		}
	}
	.announcement_box{
		background: rgba(0, 0, 0, 0.5);;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.announcement_content{
			border-radius: .12rem;
			background: #fff;
			width: 5.8rem;
			.top{
				padding:.3rem .24rem;
				font-size: .24rem;
				color:#333333;
			}
			.ok{
				border-top: 1px solid #F2F2F2;
				width: 100%;
				text-align: center;
				height: .86rem;
				line-height: .86rem;
				color:#333333;
				font-size: .3rem;
				font-weight:600;
			}
		}
	}
}
.check_order{
	background: rgba(0,0,0,.5);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.order_content{
		border-radius: .12rem;
		background: #fff;
		width: 5.8rem;
		height: 3.26rem;
		.content_info{
			padding: .26rem .24rem 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			.info_text{
				font-size: .28rem;
				color:#333333;
			}
			.countdown{
				margin-bottom: .2rem;
				margin-top: .2rem;
				font-weight: 600;
				font-size: .64rem;
				color:#00C693;
			}
		}
		.buts{
			border-top: .02rem solid #F2F2F2;
			height: .86rem;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			font-size: .3rem;
			color:#333333;
			font-weight: 600;
			.line{
				border-left: .02rem solid #F2F2F2;
				height: .86rem;
			}
		}
	}
}
</style>
<script>
	import { MessageBox } from 'mint-ui';
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				userInfo:{},		//用户信息
				copy_value:"",		//复制内容
				taskList:[],		//任务列表
				settimeout:null,	//刷新用户信息
				setinterval:null,	//倒计时
				showAnnouncement:false,
				checkOrder:false,
				announcement:"",
				countdown:""
			}
		},
		created(){
			//获取用户信息
			this.getUserInfo();
			//获取用户任务
			this.getUserTask();
			//获取公告
			this.getLatestNotice();
		},
		beforeDestroy(){
			clearTimeout(this.settimeout);
		},
		methods:{
			//获取公告
			getLatestNotice(){
				resource.getLatestNotice().then(res => {
					if(res.data.code == 1){
						this.announcement = res.data.data.content;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//获取用户信息
			getUserInfo(){
				resource.getUserStatus().then(res => {
					if(res.data.code == 1){
						this.userInfo = res.data.data;
						this.copy_value = res.data.data.copy_text.value;
						if(this.userInfo.task_status == 1){
							this.settimeout = setTimeout(() => {
								//获取用户信息
								this.getUserInfo();
							},10000)
						}else if(this.userInfo.task_status == 2){
							//获取用户任务
							this.getUserTask();
						}
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//获取用户任务
			getUserTask(){
				resource.getUserTask({ww:this.userInfo.ww}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						if(data.wait_confirm == '1'){	//有未确定的任务
							this.checkOrder = true;
							let startTime = new Date().getTime();
							let endTime = data.confirm_wait_time;
							this.setinterval = setInterval(() => {
        						var ts = endTime - startTime;//计算剩余的毫秒数
        						if(ts == 0){
        							clearInterval(this.setinterval);
        							this.checkOrder = false;
        							//获取用户任务
        							this.getUserTask();
        						}
        						var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数
        						var ss = parseInt(ts  % 60, 10);//计算剩余的秒数
        						mm = checkTime(mm);
        						ss = checkTime(ss);
        						this.countdown = mm + "：" + ss;
        					},1000);
						}else{
							this.taskList = data.usertasks;
						}
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			checkTime(i){
				if (i <=10) {
					i = "0" + i;
				}
				return i;
			},
			//首页取消
			noConfirmTask(){
				resource.noConfirmTask({ww:this.userInfo.ww}).then(res => {
					if(res.data.code == 1){
						clearInterval(this.setinterval);
						this.checkOrder = false;
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				this.$toast(res.data.msg);
        			}
        		})
			},
			//首页确定
			confirmTask(){
				resource.confirmTask({ww:this.userInfo.ww}).then(res => {
					if(res.data.code == 1){
						clearInterval(this.setinterval);
						this.checkOrder = false;
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				this.$toast(res.data.msg);
        			}
        		})
			},
			//申请任务
			applyTask(){
				resource.applyTask({ww:this.userInfo.ww}).then(res => {
					if(res.data.code == 1){
						//获取用户信息
						this.getUserInfo();
						//倒计时方法
						this.setTimeoutFun();
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//取消申请
			cancelApply(){
				MessageBox.confirm('确定取消?').then(action => {
					if(action == 'confirm'){
						resource.cancelApply({ww:this.userInfo.ww}).then(res => {
							if(res.data.code == 1){
								this.$toast(res.data.msg);
								//获取用户信息
								this.getUserInfo();
							}else{
								this.$toast(res.data.msg);
							}
						})
					}
				});
			},
			//任务详情
			taskDetail(task_id,status){
				if(status == 0){
					this.$router.push('/order_detail?task_id=' + task_id);
				}else if(status == 1){
					this.$toast('任务正在审核中,请耐心等待...');
				}else if(status == 3){
					this.$toast('任务已取消');
				}
			}
		}
	}
</script>

