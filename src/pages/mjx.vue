<template>
	<div class="mjx_container">
		<div class="tab_row">
			<div class="tab_item" v-for="(item,index) in tab_list" @click="active_index = index">
				<div class="num_yuan" v-if="index == 0 && evaluate_order_num > 0">{{evaluate_order_num}}</div>
				<img class="tab_img" :src="item.active_img" v-if="active_index == index">
				<img class="tab_img" :src="item.img" v-else>
				<div class="tab_name">{{item.name}}</div>
			</div>
		</div>
		<div class="task_list">
			<div class="task_item" v-for="item in task_list" @click="$router.push('/mjx_detail?order_id=' + item.order_id)">
				<div class="row">
					<div class="name">{{item.shop_name}}</div>
					<div class="time">{{item.invitation_time}}</div>
				</div>
				<div class="row">
					<div class="ww_code">{{item.invitation_time}}</div>
					<div class="button">查看任务</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				tab_list:[{
					img:require('../assets/dcl_icon.png'),
					active_img:require('../assets/dcl_icon_active.png'),
					name:'待处理',
					status:2
				},{
					img:require('../assets/tjz_icon.png'),
					active_img:require('../assets/tjz_icon_active.png'),
					name:'提交中',
					status:3
				},{
					img:require('../assets/yjj_icon.png'),
					active_img:require('../assets/yjj_icon_active.png'),
					name:'已拒绝',
					status:5
				},{
					img:require('../assets/ywc_icon.png'),
					active_img:require('../assets/ywc_icon_active.png'),
					name:'已完成',
					status:4
				}],
				active_index:0,			//当前选中的下标
				status:2,
				task_list:[],	//任务列表
				evaluate_order_num:0,	//待处理的买家秀任务数量
			}
		},
		watch:{
			active_index:function(n,o){
				this.status = this.tab_list[n].status;
				//获取买家秀任务
				this.getEvaluateTask();
			}
		},
		created(){
			//获取买家秀任务
			this.getEvaluateTask();
			//获取待处理的买家秀任务数量
			this.getEvaluateNum();
		},
		methods:{
			//获取待处理的买家秀任务数量
			getEvaluateNum(){
				resource.getEvaluateNum().then(res => {
					if(res.data.code == 1){
						this.evaluate_order_num = res.data.data.evaluate_order_num;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//获取买家秀任务
			getEvaluateTask(){
				let arg = {
					status:this.status
				}
				resource.getEvaluateTask(arg).then(res => {
					if(res.data.code == 1){
						this.task_list = res.data.data.evaluate_orders;
					}else{
						this.$toast(res.data.msg);
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
.mjx_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.tab_row{
	width: 100%;
	height: 2.3rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tab_item{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		.num_yuan{
			position: absolute;
			top: -0.1rem;
			right: 0;
			background: #F22E00;
			border-radius: 50%;
			width: .28rem;
			text-align: center;
			height: .28rem;
			line-height: .28rem;
			font-size: .24rem;
			color: #ffffff;
		}
		.tab_img{
			width: .7rem;
			height: .7rem;
		}
		.tab_name{
			margin-top: .24rem;
			font-size: .28rem;
			color: #333333;
		}
	}
}
.task_list{
	width: 100%;
	flex:1;
	padding-left: .2rem;
	padding-right: .2rem;
	overflow-y: scroll;
	.task_item{
		margin-bottom: .2rem;
		border-radius: .12rem;
		background: #ffffff;
		width: 100%;
		height: 1.56rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: .3rem;
		padding-right: .3rem;
		.row{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.name{
				font-size: .28rem;
				color: #333333;
			}
			.time{
				font-size: .24rem;
				color:#999999;
			}
			.ww_code{
				font-size: .24rem;
				color:#333333;
			}
			.button{
				border-radius:.24rem;
				background: #00C693;
				width: 1.4rem;
				text-align: center;
				height: .48rem;
				line-height: .48rem;
				font-size: .24rem;
				color: #ffffff;
			}
		}
	}
}
</style>