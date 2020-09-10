<template>
	<div class="container">
		<div class="task_item" v-for="(item,index) in task_list" @click="checkIndex(index)">
			<div class="task_left">
				<img class="selected_active" src="../assets/selected.png" v-if="index == active_index">
				<div class="selected" v-else></div>
				<div class="task_content">
					<div class="shop_name">{{item.tb_shop_name}}</div>
					<div class="task_code">{{item.usertask_id}}</div>
				</div>
			</div>
			<div class="money">商品金额(元)：{{item.goods_price}}</div>
		</div>
		<div class="ok" @click="ok">确定</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	padding-top: .28rem;
}
.task_item{
	margin-bottom: .08rem;
	background: #fff;
	width: 100%;
	height: 1.44rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: .22rem;
	padding-right: .22rem;
	.task_left{
		display: flex;
		align-items: center;
		.selected_active{
			width: .4rem;
			height: .4rem;
		}
		.selected{
			border:1px solid #999999;
			border-radius: 50%;
			width: .4rem;
			height: .4rem;
		}
		.task_content{
			margin-left: .28rem;
			.shop_name{
				margin-bottom: .14rem;
				font-weight: 500;
				font-size: .28rem;
				color: #333333;
			}
			.task_code{
				font-size: .24rem;
				color:#333333;
			}
		}
		
	}
	.money{
		font-size: .28rem;
		color:#00C693;
		font-weight: 500;
	}
}
.ok{
	margin: 1.5rem auto;
	background: #00C693;
	border-radius:.45rem;
	width: 6.2rem;
	height: .9rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: .32rem;
	color:#fff;
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				task_list:[],
				active_index:null
			}
		},
		created(){
			//获取当日任务
			this.todayUserTask();
		},
		methods:{
			//获取当日任务
			todayUserTask(){
				resource.todayUserTask().then(res => {
					if(res.data.code == 1){
						this.task_list = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//切换选中任务
			checkIndex(index){
				this.active_index = index != this.active_index?index:null;
			},
			ok(){
				if(this.active_index === null){
					this.$toast('请选择任务');
				}else{
					let usertask_id = this.task_list[this.active_index].usertask_id;
					this.$router.push('/create_problem?usertask_id=' + usertask_id + '&type=1');
				}
			}
		}
	}
</script>



