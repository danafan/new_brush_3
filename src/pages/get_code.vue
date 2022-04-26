<template>
	<div class="container">
		<div class="content_box">
			<div class="login_title">验证码将发送给师父，请联系师父获取</div>
			<div class="code_box">
				<input class="code" type="number" placeholder="短信验证码" v-model="sms_code">
				<div class="but_text" :class="{'but_text_active':!notBut}" @click="getCode">{{but_text}}</div>
			</div>
			<div class="login_but" @click="login">确定</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.content_box{
		margin-top: .26rem;
		width: 100%;
		height: 100%;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		.login_title{
			margin-top: .48rem;
			margin-bottom: .36rem;
			font-size: .36rem;
			color: #000;
			font-weight: 500;
		}
		.code_box{
			margin-top: .26rem;
			border-radius: .08rem;
			background: #F7FFFD;
			width: 6.58rem;
			height: .92rem;
			padding-left: .6rem;
			padding-right: .42rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.code{
				border: none;
				outline: none;
				font-size: .32rem;
			}
			.but_text{
				font-size: .32rem;
				color:#00C693;
			}
			.but_text_active{
				color:#666666;
			}
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
		.login_but{
			margin-top: .8rem;
			margin-bottom: .4rem;
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
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				sms_code:"",
				but_text:"发送验证码",
				notBut: true,                   	//默认获取验证码按钮可点击
      			time:0,                        	//默认倒数60秒
      		}
      	},
      	methods:{
			//获取验证码
			getCode(){
				if(this.notBut == true){//如果按钮可以点击
					resource.getSmsCodeForbindwx().then(res => {
            			if(res.data.code == 1){ //发送成功
            				this.$toast("发送成功...");
            				this.time = res.data.data.interval_time;
            				this.timeDown();
            			}else{
            				this.$toast(res.data.msg);
            			}
            		});
				}else{
					this.$toast("操作频繁");
				}
			},
			// 倒计时
			timeDown () {
				var _this = this;
				if (_this.time > 0) {
        			_this.notBut = false;   //按钮不可点击
        			_this.time --;
        			_this.but_text = "重新发送" + _this.time + "秒";
        			setTimeout(_this.timeDown, 1000);
        		} else {
        			_this.notBut = true;    //按钮可以点击
        			_this.time = 600;
        			_this.but_text = "获取验证码";
        		}
        	},
			// 绑定
			login(){
				if(this.sms_code == ''){
					this.$toast("请输入验证码");
				}else{
					let req = {
						sms_code:this.sms_code
					}
					resource.masterSmsVerify(req).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							//获取用户信息
							this.$router.push('/fill_info');
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			}
		}
	}
</script>