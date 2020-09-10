<template>
	<div class="container">
		<div class="select_task" v-if="type == '1'">
			<div class="label">关联任务</div>
			<div class="val" @click="$router.push('/associated_task')" v-if="usertask_id == ''">
				请选择 <img class="right_icon" src="../assets/right.png">
			</div>
			<div class="value" v-else @click="$router.push('/associated_task')">{{usertask_id}}</div>
		</div>
		<textarea class="problem_value" maxlength='50' placeholder="请输入具体问题（不超过50字）" v-model="content"></textarea>
		<div class="upload_title">上传凭证（不超过三张）</div>
		<div class="img_list">
			<div class="img_box" v-for="(item,index) in file_list">
				<img class="image" :src="item.domain + item.filename">
				<img class="close" src="../assets/close.png" @click="deleteFile(index)">
			</div>
			<upload-file @callbackFn="callbackFn" v-if="file_list.length < 3"></upload-file>
		</div>
		<div class="save" @click="save">保存</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	padding-top: .28rem;
}
.select_task{
	margin-bottom: .28rem;
	background: #fff;
	width: 100%;
	height: .92rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: .44rem;
	padding-right: .44rem;
	.label{
		font-size: .28rem;
		color: #333333;
		font-weight: 500;
	}
	.val{
		display: flex;
		align-items: center;
		font-size: .28rem;
		color: #999999;
		.right_icon{
			width: .36rem;
			height: .36rem;
		}
	}
	.value{
		font-size: .28rem;
		color: #333333;
	}
}
.problem_value{
	background: #fff;
	width: 100%;
	height: 4rem;
	padding: .22rem;
	font-size: .28rem;
	outline: none;
	border: none;
}
.upload_title{
	padding-left:.24rem;
	margin-bottom: .26rem;
	font-size: .28rem;
	color:#333333;
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
.save{
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
	import UploadFile from '../components/UploadFile.vue'
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				type:"",
				file_list:[],		//文件列表
				content:"",
				usertask_id:""
			}
		},
		created(){
			this.type = this.$route.query.type;
			document.title = this.type == '1'?'任务问题':'其他问题';
			let usertask_id = this.$route.query.usertask_id;
			this.usertask_id = usertask_id?usertask_id:"";
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
			save(){
				if(this.type == '1' && this.usertask_id == ''){
					this.$toast('请选择关联任务');
				}else if(this.content == ''){
					this.$toast('请输入问题描述');
				}else{
					let req = {
						type:this.type,
						usertask_id:this.usertask_id,
						content:this.content
					}
					var img_arr = [];
					this.file_list.map(item => {
						img_arr.push(item.filename);
					})
					req.imgs = img_arr.join(',');
					resource.createFeedBack(req).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							this.$router.push('/service');
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			}
		},
		components:{
			UploadFile
		}
	}
</script>