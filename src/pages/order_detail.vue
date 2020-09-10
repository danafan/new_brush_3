<template>
	<div class="container">
		<div class="content">
			<div class="content_title">
				<div class="tag_img"></div>
				<div class="title_text">任务要求</div>
			</div>
			<div class="content_box requirements">{{task_info.remark}}</div>
		</div>
		<div class="cancel" @click="cancelOrder">取消任务</div>
		<div class="content">
			<div class="content_title">
				<div class="tag_img"></div>
				<div class="title_text">搜索关键字</div>
			</div>
			<div class="content_box keyword">
				<div class="keyword_text">{{task_info.keyword}}</div>
				<img class="goods_img" :src="task_info.goods_img">
			</div>
		</div>
		<div class="content">
			<div class="content_title">
				<div class="tag_img"></div>
				<div class="title_text">按任务要求操作后验证</div>
			</div>
			<div class="content_box submit">
				<input class="input_box" type="text" placeholder="请输入店铺名称" v-model="store_name">
				<div class="submit_but" @click="checkTask">验证</div>
			</div>
		</div>
		<div class="content" v-if="checkSuccess">
			<div class="content_title">
				<div class="tag_img"></div>
				<div class="title_text">提交</div>
			</div>
			<div class="content_box submit">
				<div class="goods_price">拍下价格为{{goods_price}}元的商品后提交</div>
				<div class="submit_but" @click="submitTask">提交</div>
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
				word-wrap:break-word;
				-webkit-touch-callout:none;  
				-webkit-user-select:none;  
				-khtml-user-select:none;  
				-moz-user-select:none;  
				-ms-user-select:none;  
				user-select:none;  
			}
			.goods_img{
				border-radius:.08rem;
				width: 4.6rem;
				height: 4.6rem;
			}
		}
		.goods_price{
			font-size: .3rem;
			color: #333333;
		}
		.submit{
			display: flex;
			align-items: center;
			justify-content: space-between;
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
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				task_id:"",
				task_info:{},
				store_name:"",
				goods_price:'',
				checkSuccess:false
			}
		},
		created(){
			this.task_id = this.$route.query.task_id;
			//获取任务详情
			this.getTaskDetail();
		},
		methods:{
			//获取任务详情
			getTaskDetail(){
				resource.taskDetail({usertask_id:this.task_id}).then(res => {
					if(res.data.code == 1){
						this.task_info = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//取消任务
			cancelOrder(){
				MessageBox.confirm('确定执行此操作?').then(action => {
					if(action == 'confirm'){
						resource.abandonTask({usertask_id:this.task_id}).then(res => {
							if(res.data.code == 1){
								this.$toast(res.data.msg);
								this.$router.go(-1);
							}else{
								this.$toast(res.data.msg);
							}
						})
					}
				});
			},
			//验证
			checkTask(){
				if(this.store_name == ''){
					this.$toast("请输入店铺名称");
				}else{
					let req = {
						usertask_id:this.task_id,
						shop_name:this.store_name
					}
					resource.checkTask(req).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							this.goods_price = res.data.data;
							this.checkSuccess = true;
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			},
			//提交
			submitTask(){
				resource.commitTask({usertask_id:this.task_id,}).then(res => {
					if(res.data.code == 1){
						this.$toast(res.data.msg);
						this.$router.go(-1);
					}else{
						this.$toast(res.data.msg);
					}
				})
			}
		}
	}
</script>




