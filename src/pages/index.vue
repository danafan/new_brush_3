<template>
	<div class="index_container">
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

				<div class="countdown" v-if="tab_active == '1' && tb_status === 1">结束时间：{{apply_expiration_time_tb}}</div>
				<div class="countdown" v-if="tab_active == '2' && pdd_status === 1">结束时间：{{apply_expiration_time_pdd}}</div>
				<div class="countdown" v-if="tab_active == '4' && dy_status === 1">结束时间：{{apply_expiration_time_dy}}</div>

				<div class="order_but" v-if="(tab_active == '1' && tb_status === 0) || (tab_active == '2' && pdd_status === 0) || (tab_active == '4' && dy_status === 0)" @click="applyTask">接单</div>
				<div class="order_but has_order_but" v-if="(tab_active == '1' && tb_status === 1) || (tab_active == '2' && pdd_status === 1) || (tab_active == '4' && dy_status === 1)" @click="cancelApply">取消</div>
				<div class="order_but hui_order_but" v-if="(tab_active == '1' && tb_status === 2) || (tab_active == '2' && pdd_status === 2) || (tab_active == '4' && dy_status === 2)" @click="$toast('您有未完成订单');">已接单</div>
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
		overflow-y: scroll;
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
				checkOrder:false,
				announcement_list:[],
				countdown:"",
				tab_active:'1',					//当前选中的类型
				tb_status:0,					//淘宝接单按钮状态
				pdd_status:0,					//拼多多接单按钮状态
				dy_status:0,					//抖音接单按钮状态
				apply_expiration_time_tb:"",		//淘宝结束时间
				apply_expiration_time_pdd:"",		//拼多多结束时间
				apply_expiration_time_dy:"",		//抖音结束时间
			}
		},
		created(){
			//获取提示
			this.getTips();
			//获取banner列表
			this.bannerList();
			//获取用户信息
			this.getUserInfo();
			//获取用户任务状态
			this.getUserTaskStatus();
			//获取用户任务
			this.getUserTask();
		},
		beforeDestroy(){
			clearTimeout(this.settimeout);
		},
		methods:{
			//获取提示
			getTips(){
				resource.getTips().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						let tip_id = sessionStorage.getItem('tip_id');
						if(data.id && data.id != tip_id){
							sessionStorage.setItem('tip_id',data.id);
							MessageBox({
								title: '公告',
								message: data.content
							});
						}

					}else{
						this.$toast(res.data.msg);
					}
				})
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
			getUserInfo(is_timer){
				resource.getUserInfo().then(res => {
					if(res.data.code == 1){
						this.userInfo = res.data.data;
						this.copy_value = this.userInfo.copy_text.value;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//获取用户任务状态
			getUserTaskStatus(){
				resource.getUserTaskStatus().then(res => {
					if(res.data.code == 1){
						let data = [];
						for(let k in res.data.data){
							let obj = {
								type:k,
								value:res.data.data[k]
							}
							data.push(obj)
						}
						//接单状态
						this.tb_status = data[0].value.task_status;
						this.pdd_status = data[1].value.task_status;
						this.dy_status = data[3].value.task_status;
						//接单中结束时间
						this.apply_expiration_time_tb = data[0].value.apply_expiration_time;
						this.apply_expiration_time_pdd = data[1].value.apply_expiration_time;
						this.apply_expiration_time_dy = data[3].value.apply_expiration_time;
						if(this.findIndex(data,2) > -1){		//有已接单
							this.tab_active = data[this.findIndex(data,2)].type;
							//获取用户任务
							this.getUserTask();
						}else if(this.findIndex(data,1) > -1){	//有排队中
							this.apply_expiration_time = data[this.findIndex(data,1)].value.apply_expiration_time;
							if(this.settimeout){
								clearInterval(this.settimeout);
								this.settimeout = null;
							}
							this.settimeout = setTimeout(() => {
								//获取用户信息
								this.getUserTaskStatus(1);
							},10000)
						}
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//获取符合条件的第一个元素下标
			findIndex(list,e){
				let index = list.findIndex(item => {
					return item.value.task_status == e;
				})
				return index;
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
        			}else{
        				var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数
        				var ss = parseInt(ts  % 60, 10);//计算剩余的秒数
        				mm = this.checkTime(mm);
        				ss = this.checkTime(ss);
        				this.countdown = mm + "：" + ss;
        			}
        		},1000);
			},
			//弹窗取消
			noConfirmTask(){
				resource.noConfirmTask({shop_type:this.tab_active}).then(res => {
					if(res.data.code == 1){
						clearInterval(this.setinterval);
						this.checkOrder = false;
						//获取用户任务状态
						this.getUserTaskStatus();
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
						//获取用户任务状态
						this.getUserTaskStatus();
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
						//获取用户任务状态
						this.getUserTaskStatus();
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//接单取消
			cancelApply(){
				MessageBox.confirm('确定取消?').then(action => {
					if(action == 'confirm'){
						resource.cancelApply({shop_type:this.tab_active}).then(res => {
							if(res.data.code == 1){
								this.$toast(res.data.msg);
								//获取用户任务状态
								this.getUserTaskStatus();
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

