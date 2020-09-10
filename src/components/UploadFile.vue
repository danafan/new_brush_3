<template>
	<div>
		<div class="imgBox">
			<img class="upload_icon" src="../assets/add.png">
			<input type="file" ref="imgUpload" class="upload_file" accept="image/*" @change="uploadFn">
		</div>
	</div>
</template>
<style lang="less" scoped>
.imgBox{
	background: #fff;
	display: flex;
	align-items:center;
	justify-content:center;
	width: 2.08rem;
	height: 2.08rem;
	position: relative;
	.upload_icon{
		width: .6rem;
		height: .6rem;
	}
	.upload_file {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		methods:{
			// 上传图片
			uploadFn(){
				if (this.$refs.imgUpload.files.length > 0) {
					var file = this.$refs.imgUpload.files[0];
					resource.uploadFile({file:file}).then(res => {
						if(res.data.code == 1){
							this.$emit('callbackFn',res.data.data);
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			}

		}


	}
</script>