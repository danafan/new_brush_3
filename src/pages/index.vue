<template>
	<div class="index_container">
		<div class="title_box">
			<div class="title_text">接单</div>
			<div class="route_title" v-if="userInfo.user_type == 1" @click="$router.push('/disciple')">徒弟列表</div>
		</div>
		<div class="list_content">
			<div class="wang_box">
				<div class="left">
					<div class="tag_img"></div>
					<div class="wang_code">{{userInfo.ww}}</div>
				</div>
				<div class="countdown" v-if="userInfo.task_status == 1">结束时间：{{userInfo.apply_expiration_time}}</div>
				<div class="order_but" v-if="userInfo.task_status == 0" @click="applyTask">接单</div>
				<div class="order_but has_order_but" v-if="userInfo.task_status == 1" @click="cancelApply">取消</div>
				<div class="order_but hui_order_but" v-if="userInfo.task_status == 2" @click="$toast('您有未完成订单');">已接单</div>
			</div>
			<div class="order_item" v-for="item in taskList" @click="taskDetail(item.usertask_id,item.status)">
				<img class="goods_img" :src="item.goods_img">
				<div class="goods_content">
					<div class="content_row">
						<div class="keyword">{{item.keyword}}</div>
						<div class="order_status">{{item.status == 0?'已接':'待审核'}}</div>
					</div>
					<div class="content_row">
						<div class="keyword">任务编号：{{item.goods_id}}</div>
						<div class="create_time">{{item.apply_time}}</div>
					</div>
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
		position: relative;
		padding-left: .2rem;
		.title_text{
			font-size: .32rem;
			color: #38393A;
			font-weight:500;
		}
		.route_title{
			position: absolute;
			right: .2rem;
			font-size: .28rem;
			color: #000000;
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
			padding-left: .16rem;
			padding-right: .16rem;
			margin-top: .2rem;
			background: #fff;
			border-radius:.12rem;
			width: 100%;
			height: 1.56rem;
			display: flex;
			align-items: center;
			.goods_img{
				margin-right: .16rem;
				border-radius:50%;
				height: .88rem;
				width: .88rem;
			}
			.goods_content{
				flex:1;
				height: .88rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.content_row{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.keyword{
						font-size: .24rem;
						color:#333333;
					}
					.order_status{
						border-radius:.18rem;
						background: #00C693;
						padding-left: .16rem;
						padding-right: .16rem;
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
				}
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
				taskList:[],		//任务列表
				setInterval:null
			}
		},
		created(){
			//获取用户信息
			this.getUserInfo();
		},
		methods:{
			//获取用户信息
			getUserInfo(){
				resource.getUserStatus().then(res => {
					if(res.data.code == 1){
						this.userInfo = res.data.data;
						if(this.userInfo.task_status == 1){
							this.setTimeoutFun();
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
						this.taskList = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//倒计时方法
			setTimeoutFun(){
				setTimeout(() => {
					//获取用户信息
					this.getUserInfo();
				},5000)
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
				if(status == 1){
					this.$router.push('/order_detail?task_id=' + task_id);
				}else{
					this.$toast('任务正在审核中,请耐心等待...');
				}
			}
		}
	}
</script>

