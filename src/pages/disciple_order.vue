<template>
	<div class="container">
		<div class="order_item" v-for="item in task_list">
			<div class="item_left">
				<div class="goods_name">{{item.shop_name}}</div>
				<div class="goods_code">{{item.goods_id}}</div>
			</div>
			<div class="goods_money">付款金额(元)：{{item.payment_amount}}</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	padding-top: .28rem;
	.order_item{
		border-bottom: 1px solid #F5F5F5;
		background: #fff;
		width: 100%;
		height: 1.44rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: .44rem;
		padding-right: .44rem;
		.item_left{
			.goods_name{
				margin-bottom: .14rem;
				font-size: .28rem;
				color: #333333;
				font-weight:500;
			}
			.goods_code{
				font-size: .24rem;
				color:#333333;
			}
		}
		.goods_money{
			font-size: .32rem;
			color:#00C693;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				task_list:[]
			}
		},
		created(){
			let query = this.$route.query;
			let req = {
				prentice_ww:query.prentice_ww,
				query_date:query.query_date
			}
			resource.getPrenticeTask(req).then(res => {
				if(res.data.code == 1){
					this.task_list = res.data.data;
				}else{
					this.$toast(res.data.msg);
					this.$router.go(-1);
				}
			})
		}
	}
</script>