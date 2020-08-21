<template>
	<div class="container">
		<div class="order_item">
			<div class="item_left">
				<div class="goods_name">商品名称</div>
				<div class="goods_code">商品编号</div>
			</div>
			<div class="goods_money">商品金额(元)：6</div>
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
	export default{

	}
</script>