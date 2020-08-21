<template>
	<div class="container">
		<div class="content">
			<div class="content_title">
				<div class="tag_img"></div>
				<div class="title_text">任务要求</div>
			</div>
			<div class="content_box requirements">
				店家要求是还是呢么十多号尽快尽快靠的就是大家店
				都是动画的旧爱就送全家都IQ积分哦假发票等我大风
				等我大青蛙多群地区的违法的房都忘得群多若群翁多
				程序是否成都市
			</div>
		</div>
		<div class="cancel" @click="cancelOrder">取消任务</div>
		<div class="content">
			<div class="content_title">
				<div class="tag_img"></div>
				<div class="title_text">搜索关键字</div>
			</div>
			<div class="content_box keyword">
				<div class="keyword_text">桌子</div>
				<img class="goods_img" src="../assets/mangguo.png">
			</div>
		</div>
		<div class="content">
			<div class="content_title">
				<div class="tag_img"></div>
				<div class="title_text">按任务要求操作后提交</div>
			</div>
			<div class="content_box submit">
				<input class="input_box" type="text" placeholder="请输入店铺名称" v-model="store_name">
				<div class="submit_but">提交</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	padding: .28rem .2rem;
	.content{
		margin-bottom: .28rem;
		border-radius: .16rem;
		background: #fff;
		width: 100%;
		.content_title{
			border-bottom: 1px solid #F8F8F8;
			width: 100%;
			display: flex;
			align-items: center;
			height: .78rem;
			.tag_img{
				margin-right: .2rem;
				border-radius:.06rem;
				background: #00C693;
				width: .1rem;
				height: .34rem;
			}
			.title_text{
				font-size: .3rem;
				color: #333333;
				font-weight:500;
			}
		}
		.content_box{
			padding: .14rem .28rem;
		}
		.requirements{
			font-size: .28rem;
			color:#333333;
		}
		.keyword{
			display: flex;
			flex-direction: column;
			align-items: center;
			.keyword_text{
				margin-bottom: .2rem;
				font-size: .32rem;
				color:#00C693;
				font-weight:500;
			}
			.goods_img{
				border-radius:.08rem;
				width: 1.8rem;
				height: 1.8rem;
			}
		}
		.submit{
			display: flex;
			align-items: center;
			.input_box{
				border:1px solid #F1F1F1;
				border-radius: .08rem;
				background: #f8f8f8;
				width: 5.1rem;
				height: .8rem;
				padding-left: .26rem;
				border: none;
				outline: none;
				font-size: .28rem;
				box-sizing: border-box;
			}
			input::-webkit-input-placeholder {
				color: #666666;
			}
			input:-moz-placeholder {
				color: #666666;
			}
			input:-ms-input-placeholder {
				color: #666666;
			}
			.submit_but{
				margin-left: .3rem;
				border-radius:.06rem;
				background: #00C693;
				width: 1.2rem;
				text-align: center;
				height: .6rem;
				line-height: .6rem;
				font-size: .28rem;
				color:#fff;
			}
		}
	}
	.cancel{
		margin-bottom: .28rem;
		border:1px solid #00C693;
		border-radius:.1rem;
		background: #fff;
		width: 100%;
		text-align: center;
		height: .9rem;
		line-height: .9rem;
		font-size: .3rem;
		color:#00C693;
	}
}
</style>
<script>
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				store_name:""
			}
		},
		methods:{
			cancelOrder(){
				MessageBox.confirm('确定执行此操作?').then(action => {
					if(action == 'confirm'){
						console.log("取消")
					}
				});
			}
		}
	}
</script>




