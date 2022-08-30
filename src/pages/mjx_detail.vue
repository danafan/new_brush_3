<template>
	<div class="mjx_detail">
		<div class="top_content">
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">按任务要求操作后验证</div>
				</div>
				<div class="content_box">
					<div class="content_row">
						<div class="lable">店铺名：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">旺旺号：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">订单号：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">商品ID：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">订单日期：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">邀请时间：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">提交时间：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">完成时间：</div>
						<div class="value">一条文艺男</div>
					</div>
					<div class="content_row">
						<div class="lable">当前状态：</div>
						<div class="value">一条文艺男</div>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">评价内容</div>
				</div>
				<div class="content_box">
					评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
				</div>
			</div>
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">图片</div>
				</div>
				<div class="content_box">
					<img class="view_file" src="../static/pdd_toast_icon.png">
				</div>
			</div>
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">视频</div>
				</div>
				<div class="content_box">
					<img class="view_file" src="../static/pdd_toast_icon.png">
				</div>
			</div>
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">追加内容</div>
				</div>
				<div class="content_box">
					评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
				</div>
			</div>
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">追加图片</div>
				</div>
				<div class="content_box">
					<img class="view_file" src="../static/pdd_toast_icon.png">
				</div>
			</div>
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">评价返图</div>
				</div>
				<div class="content_box">
					<div class="img_list">
						<div class="img_box" v-for="(item,index) in file_list">
							<img class="image" :src="item.domain + item.filename">
							<img class="close" src="../assets/close.png" @click="deleteFile(index)">
						</div>
						<upload-file @callbackFn="callbackFn" v-if="file_list.length < 5"></upload-file>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom_set">
			<div class="but give">放弃任务</div>
			<div class="but commit">提交任务</div>
		</div>
	</div>
</template>
<script>
	import UploadFile from '../components/UploadFile.vue'
	export default{
		data(){
			return{
				file_list:[],		//文件列表
			}
		},
		methods:{
			//上传文件
			callbackFn(v){
				this.file_list.push(v);
			},
			//删除文件
			deleteFile(index){
				let filename = this.file_list[index].filename;
				resource.delFile({filename:filename}).then(res => {
					if(res.data.code == 1){
						this.file_list.splice(index,1);
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
		},
		components:{
			UploadFile
		}
	}
</script>
<style lang="less" scoped>
.mjx_detail{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.top_content{
		padding: .2rem;
		flex:1;
		width: 100%;
		overflow-y: scroll;
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
				font-size: .28rem;
				color: #333333;
				.content_row{
					display: flex;
					margin-bottom: .2rem;
					.lable{
						color: #666666;
					}
				}
				.view_file{
					border-radius:.08rem;
					width: 2rem;
					height: 2rem;
				}
				.img_list{
					width: 100%;
					display: flex;
					padding-left:.24rem;
					padding-right:.24rem;
					.img_box{
						margin-right: .24rem;
						width: 2.08rem;
						height: 2.08rem;
						position: relative;
						.image{
							position: absolute;
							top: 0;
							right: 0;
							width: 100%;
							height: 100%;
						}
						.close{
							position: absolute;
							top: 0;
							right: 0;
							width: .42rem;
							height: .42rem;
							z-index: 1;
						}
					}
				}
			}
		}
	}
	.bottom_set{
		background: #ffffff;
		width: 100%;
		height: 1.4rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.but{
			border:1px solid #00C693;
			border-radius: .4rem;
			width: 3.2rem;
			text-align: center;
			height: .8rem;
			line-height: .8rem;
			font-size: .28rem;
			font-weight: 500;
		}
		.give{
			color: #00C693;
		}
		.commit{
			background: #00C693;
			color: #ffffff;
		}
	}
}
</style>