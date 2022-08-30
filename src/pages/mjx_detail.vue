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
					<div class="title_text">评价返图（最少一张）</div>
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
			<div class="bottom_emo">
				<img class="emo_icon" src="../assets/emo_icon.png">
				<div class="emo_text">不允许超过五张图片</div>
			</div>
		</div>
		<div class="bottom_set">
			<div class="but give" @click="show_dialog = true">放弃任务</div>
			<div class="but commit" @click="commitFn">提交任务</div>
		</div>
		<div class="announcement_box" v-if="show_dialog" @click.self="show_dialog = false">
			<div class="announcement_content">
				<div class="top">
					<textarea class="input_box" v-model="give_remark"  placeholder="小主人请您输入放弃具体原因～"></textarea>
				</div>
				<div class="ok" @click="commitGive">提交</div>
			</div>
		</div>
	</div>
</template>
<script>
	import UploadFile from '../components/UploadFile.vue'
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				file_list:[],		//文件列表
				show_dialog:false,	//放弃任务弹窗
				give_remark:"",
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
			//提交拒绝
			commitGive(){
				if(this.give_remark == ''){
					this.$toast('请输入拒绝原因!');
				}else{

				}
			},
			//点击提交
			commitFn(){
				if(this.file_list.length == 0){
					this.$toast('至少上传一张图片!');
				}else{
					MessageBox.confirm('确认提交?').then(action => {
						if(action == 'confirm'){
							consoel.log(this.file_list);
						}
					});
				}
			}
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
		.bottom_emo{
			display: flex;
			align-items: center;
			justify-content: center;
			.emo_icon{
				margin-right:.08rem;
				width: .48rem;
				height: .48rem;
			}
			.emo_text{
				font-size: .28rem;
				color: #333333;
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
				.input_box{
					box-sizing: border-box;
					outline: none;
					border:none;
					border-radius:.08rem;
					background: #F4F4F4;
					width: 100%;
					height: 2.12rem;
					padding:.3rem .2rem;
				}
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
}
</style>