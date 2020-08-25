<template>
	<div class="container">
		<div class="login_title">密码登录</div>
		<input class="input_element" type="type" placeholder="请输入旺旺号" v-model="wangwang">
		<input class="input_element password" type="password" placeholder="请输入密码" v-model="password">
		<div class="toast_text">第一次登录为设置密码</div>
		<div class="login_but" @click="login">登录</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	padding-left: .44rem;
	padding-right: .44rem;
	.login_title{
		margin-top: 1.34rem;
		margin-bottom: .84rem;
		font-size: .44rem;
		color: #000;
		font-weight: 500;
	}
	.input_element{
		border-radius: .08rem;
		background: #F7FFFD;
		width: 6.58rem;
		height: .92rem;
		padding-left: .6rem;
		display: flex;
		align-items: center;
		border: none;
		outline: none;
		font-size: .32rem;
		box-sizing: border-box;
	}
	input::-webkit-input-placeholder {
		color: #B9C0D4;
	}
	input:-moz-placeholder {
		color: #B9C0D4;
	}
	input:-ms-input-placeholder {
		color: #B9C0D4;
	}
	.password{
		margin-top: .26rem;
	}
	.toast_text{
		margin-top: .4rem;
		font-size: .24rem;
		color:#AEB5CA;
	}
	.login_but{
		margin-top: .8rem;
		background: #00C693;
		border-radius:.45rem;
		width: 100%;
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .32rem;
		color:#fff;
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				wangwang:"",
				password:"",
			}
		},
		methods:{
			// 登录
			login(){
				if(this.wangwang == ''){
					this.$toast("请输入旺旺号");
				}else if(this.password == ''){
					this.$toast("请输入密码");
				}else{
					let req = {
						ww:this.wangwang,
						pwd:this.password
					}
					resource.login(req).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							this.$router.replace('/index');
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
				
			}
		}
	}
</script>










