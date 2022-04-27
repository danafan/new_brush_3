<template>
	<div class="index_container">
		<div class="title_box">
			<div class="service" @click="$router.push('/service')">反馈问题</div>
			<div class="title_text">接单</div>
			<div class="route_title" v-if="userInfo.user_type == 1" @click="$router.push('/disciple')">徒弟列表</div>
		</div>
		<div class="announcement">
			<div class="left">
				<img class="announcement_icon" src="../assets/announcement.png">
				<div class="swiper_box">
					<mt-swipe :showIndicators="false">
						<mt-swipe-item v-for="item in announcement_list">
							<div class="announcement_text" @click="getAnnouncement(item.content)">{{item.content}}</div>
						</mt-swipe-item>
					</mt-swipe>
				</div>
			</div>
			<img class="right_icon" src="../assets/right.png">
		</div>
		<div class="banner" v-if="banner_list.length > 0">
			<mt-swipe>
				<mt-swipe-item v-for="item in banner_list" :key="item.banner_id">
					<img :src="item.img_url" @click="routeUrl(item)">
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="tab">
			<div class="tab_item tb" :class="{'active_item':tab_active == '1'}" @click="checkTab('1')">淘宝</div>
			<div class="tab_item pdd" :class="{'active_item':tab_active == '2'}" @click="checkTab('2')">拼多多</div>
			<!-- <div class="tab_item dw" :class="{'active_item':tab_active == '3'}" @click="checkTab('3')">得物退款</div> -->
			<div class="tab_item dw" :class="{'active_item':tab_active == '4'}" @click="checkTab('4')">抖音</div>
		</div>
		<div class="empty" v-if="(tab_active == '2' || tab_active == '3' || tab_active == '4') && userInfo.phone == ''">
			<img class="empty_icon" src="../assets/empty_icon.png">
			<div class="empty_text">请前往填写资料填写手机号绑定</div>
		</div>
		<div class="list_content" v-else>
			<div class="wang_box" v-if="(tab_active == '1' && userInfo.ww != '') || (tab_active == '2' && userInfo.phone != '') || (tab_active == '3' && userInfo.phone != '') || (tab_active == '4' && userInfo.phone != '')">
				<div class="left">
					<div class="tag_img"></div>
					<div class="wang_code">{{tab_active=='1'?userInfo.ww:userInfo.phone}}</div>
				</div>
				<div class="order_but" v-if="userInfo.task_status == 0" @click="applyTask">接单</div>
				<div class="countdown" v-if="userInfo.task_status == 1">结束时间：{{userInfo.apply_expiration_time}}</div>
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
					超过{{confirm_wait_time}}分钟不确认将取消该任务订单</div>
					<div class="countdown">{{countdown}}</div>
				</div>
				<div class="buts">
					<div class="but" @click="noConfirmTask">取消接单</div>
					<div class="line"></div>
					<div class="but" @click="confirmTask">确认接单</div>
				</div>
			</div>
		</div>
		<!-- 填写资料 -->
		<img class="info_icon" v-if="userInfo.openid == '' || userInfo.phone == '' || userInfo.bank_card_number == '' || userInfo.alipay_acount == ''" src="../assets/info_icon.png" @click="editInfo">
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
			flex:1;
			display: flex;
			align-items: center;
			.announcement_icon{
				margin-right: .1rem;
				width: .36rem;
				height: .36rem;
			}
			.swiper_box{
				flex:1;
				height: .58rem;
				.announcement_text{
					height: .58rem;
					line-height: .58rem;
					font-size: .24rem;
					color: #333333;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.right_icon{
			margin-left: .1rem;
			width: .36rem;
			height: .36rem;
		}
	}
	.banner{
		width: 100%;
		height: 2.35rem;
		.mint-swipe-items-wrap{
			width: 100%;
			height: 100%;
			.mint-swipe-item{
				width: 100%;
				height: 100%; 
				img{
					width: 100%;
					height: 100%;
				}
			}
			.swiper-pagination{
				height: .001rem;
				bottom: 70px;
			}
		}
	}
	.tab{
		padding-top: .28rem;
		width:100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.tab_item{
			height: .64rem;
			width:30%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size:.28rem;
		}
		.tb{
			border:1px solid #00C693;
			border-radius:.32rem 0 0 .32rem;
		}
		.pdd{
			border:1px solid #00C693;
		}
		.dw{
			border:1px solid #00C693;
			border-radius:0 .32rem .32rem 0;
		}
		.active_item{
			background:#00C693;
			color: #fff;
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
	.empty{
		flex: 1;
		display: flex;
		flex-direction:column;
		align-items: center;
		justify-content: center;
		.empty_icon{
			margin-bottom: .56rem;
			width:3.88rem;
			height: 3rem;
		}
		.empty_text{
			font-size:.3rem;
			color: #666666;
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
	.info_icon{
		position: absolute;
		right: .14rem;
		bottom: .88rem;
		width: 1.36rem;
		height: 1.36rem;
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
	import { Swipe, SwipeItem } from 'mint-ui'
	export default{
		data(){
			return{
				userInfo:{},		//用户信息
				banner_list:[],		//banner列表
				copy_value:"qweqwe",		//复制内容
				taskList:[],		//任务列表
				settimeout:null,	//刷新用户信息
				setinterval:null,	//倒计时
				confirm_wait_time:"",
				showAnnouncement:false,
				announcement:"",
				checkOrder:false,
				announcement_list:[],
				countdown:"",
				tab_active:'1',			//
			}
		},
		created(){
			//获取用户信息
			this.getUserInfo();
			//获取用户任务
			this.getUserTask();
			//获取公告
			this.getLatestNotice();
			//获取banner列表
			this.bannerList();
		},
		beforeDestroy(){
			clearTimeout(this.settimeout);
		},
		methods:{
			//获取公告
			getLatestNotice(){
				resource.getLatestNotice().then(res => {
					if(res.data.code == 1){
						this.announcement_list = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//查看公告
			getAnnouncement(content){
				this.showAnnouncement = true;
				this.announcement = content;
			},
			//获取banner列表
			bannerList(){
				resource.bannerList().then(res => {
					if(res.data.code == 1){
						this.banner_list = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//点击图片
			routeUrl(item){
				if(item.type == 2){
					window.open(item.jump_url);
				}
			},
			//切换导航
			checkTab(type){
				this.tab_active = type;
				//获取用户任务
				this.getUserTask();
			},
			//获取用户信息
			getUserInfo(){
				resource.getUserStatus().then(res => {
					if(res.data.code == 1){
						this.userInfo = res.data.data;
						this.copy_value = this.userInfo.copy_text.value;
						if(this.userInfo.task_status == 1){
							this.settimeout = setTimeout(() => {
								//获取用户信息
								this.getUserInfo();
							},10000)
						}else if(this.userInfo.task_status == 2){
							this.tab_active = this.userInfo.shop_type;
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
				resource.getUserTask({shop_type:this.tab_active}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						if(data.wait_confirm == '1'){	//有未确定的任务
							this.confirm_wait_time = data.confirm_wait_time;
							this.checkOrder = true;
							//倒计时
							this.countDown(data.confirm_end_time);
						}else{
							clearInterval(this.setinterval);
							this.checkOrder = false;
							this.taskList = data.usertasks;
						}
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			checkTime(i){
				if (i <10) {
					i = "0" + i;
				}
				return i;
			},
			countDown(endTime){
				this.setinterval = setInterval(() => {
					let startTime = Date.parse(new Date())/1000;
        			let ts = endTime - startTime;//计算剩余的毫秒数
        			if(ts <= 0){
        				this.countdown = "00：00";
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数
        				var ss = parseInt(ts  % 60, 10);//计算剩余的秒数
        				mm = this.checkTime(mm);
        				ss = this.checkTime(ss);
        				this.countdown = mm + "：" + ss;
        			}
        		},1000);
			},
			//首页取消
			noConfirmTask(){
				resource.noConfirmTask({shop_type:this.tab_active}).then(res => {
					if(res.data.code == 1){
						clearInterval(this.setinterval);
						this.checkOrder = false;
						//获取用户信息
						this.getUserInfo();
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				this.$toast(res.data.msg);
        			}
        		})
			},
			//首页确定
			confirmTask(){
				resource.confirmTask({shop_type:this.tab_active}).then(res => {
					if(res.data.code == 1){
						clearInterval(this.setinterval);
						this.checkOrder = false;
						//获取用户信息
						this.getUserInfo();
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				this.$toast(res.data.msg);
        			}
        		})
			},
			//申请任务
			applyTask(){
				this.$copyText( this.copy_value );
				resource.applyTask({shop_type:this.tab_active}).then(res => {
					if(res.data.code == 1){
						//获取用户信息
						this.getUserInfo();
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//取消申请
			cancelApply(){
				MessageBox.confirm('确定取消?').then(action => {
					if(action == 'confirm'){
						resource.cancelApply().then(res => {
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
				this.$copyText( this.copy_value );
				if(status == 0){
					this.$router.push(`/toast?task_id=${task_id}&shop_type=${this.tab_active}`);
				}else if(status == 1){
					this.$toast('任务正在审核中,请耐心等待...');
				}else if(status == 3){
					this.$toast('任务已取消');
				}
			},
			//点击跳转页面
			editInfo(){
				if(this.userInfo.bind_wx_verify == 1){
					this.$router.push('/fill_info');
				}else{
					this.$router.push('/get_code');
				}
			}
		},
		components:{
			Swipe,
			SwipeItem
		}
	}
</script>

