<template>
	<div class="index_container">
		<div class="title_box">
			<div class="title_text">接单</div>
			<div class="route_title">徒弟列表</div>
		</div>
		<div class="list_content">
			<div class="wang_box">
				<div class="left">
					<div class="tag_img"></div>
					<div class="wang_code">shdeasdkhkasdd</div>
				</div>
				<div class="countdown">倒计时：12:12:12</div>
				<div class="order_but" :class="{'has_order_but':has_order}">接单</div>
			</div>
			<div class="order_item">
				<img class="goods_img" src="../assets/mangguo.png">
				<div class="goods_content">
					<div class="content_row">
						<div class="keyword">关键词</div>
						<div class="order_status">待审核</div>
					</div>
					<div class="content_row">
						<div class="keyword">任务编号：123123</div>
						<div class="create_time">2019-07-21 12:45:44</div>
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
	export default{
		data(){
			return{
				has_order:false,	//默认没有接单
			}
		}
	}
</script>

