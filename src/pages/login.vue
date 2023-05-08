<template>
	<div class="container">
		<div class="login_title">密码登录</div>
		<input class="input_element" type="text" placeholder="请输入旺旺号" v-model="wangwang">
		<input class="input_element password" type="password" placeholder="请输入密码" v-model="password">
		<input class="input_element mt26" placeholder="请输入验证码" v-model="img_code">
		<img class="code_img mt26" :src="codeUrl" @click="getImgCode">
		<div class="toast_text">第一次登录为设置密码</div>
		<div class="login_but" @click="login">登录</div>
		<div class="dialog_box" v-if="show_dialog">
			<div class="code_box">
				<img class="close" src="../assets/close.png" @click="show_dialog = false">
				<div class="toast">需要向{{phone}}发送一条验证码</div>
				<div class="code_row">
					<input class="input_element" type="number" placeholder="请输入验证码" v-model="sms_code">
					<div class="but_text" :class="{'but_text_active':!notBut}" @click="getCode">{{but_text}}</div>
				</div>
				<div class="login_but" @click="commit">确认</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.flex{
	display: flex;
}
.ac{
	align-items:center;
}
.mt26{
	margin-top: .26rem;
}
.code_img{
	height: 1.8rem;
	// width: 50%;
}
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
		flex:1;
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
	.dialog_box{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,.8);
		display:flex;
		align-items: center;
		justify-content: center;
		padding-left: .3rem;
		padding-right: .3rem;
		.code_box{
			background:#fff;
			width: 100%;
			padding: 1rem .5rem;
			display:flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			.close{
				position: absolute;
				top: 0;
				right: 0;
				width: .4rem;
			}
			.toast{
				margin-top: .6rem;
				font-size: .26rem;
				color: red;
			}
			.code_row{
				width: 100%;
				display:flex;
				align-items: center;
				.but_text{
					font-size: .3rem;
					color:#00C693;
				}
				.but_text_active{
					font-size: .3rem;
					color:#666666;
				}
			}
			
		}
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
				show_dialog:false,
				user_id:"",
				phone:"",
				but_text:"发送验证码",
				notBut: true,                   	//默认获取验证码按钮可点击
      			time:60,                        	//默认倒数60秒
      			sms_code:"",
      			img_code:"",						//输入的验证码
      			codeUrl:"",							//图片验证码
      		}
      	},
      	created(){
      		localStorage.clear();
      		//获取验证码
      		this.getImgCode();
      	},
      	methods:{
      		//获取验证码
      		getImgCode(){
      			let timestamp = new Date().getTime() + Math.random();
      			this.codeUrl = `${location.origin}/mobile/user/captcha?key=${timestamp}`;	
      		},
			// 登录
			login(){
				if(this.wangwang == ''){
					this.$toast("请输入旺旺号");
				}else if(this.password == ''){
					this.$toast("请输入密码");
				}else{
					let req = {
						ww:this.wangwang,
						pwd:this.password,
						captcha:this.img_code
					}
					resource.login(req).then(res => {
						if(res.data.code == 1){
							localStorage.setItem('secret_key',res.data.data.secret_key);
							this.$toast(res.data.msg);
							this.$router.replace('/index');
						}else if(res.data.code == -1){
							this.show_dialog = true;
							this.user_id = res.data.data.user_id;
							this.phone = res.data.data.phone;
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			},	
			//获取验证码
			getCode(){
      			if(this.notBut == true){//如果按钮可以点击
      				let arg = {
      					user_id:this.user_id
      				}
      				resource.loginverifyGet(arg).then(res => {
            			if(res.data.code == 1){ //发送成功
            				this.$toast("发送成功...");
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
        			_this.time = 60;
        			_this.but_text = "获取验证码";
        		}
        	},
        	commit(){
        		if(this.sms_code == ""){
        			this.$toast("请输入验证码");
        		}else{
        			let arg = {
        				user_id:this.user_id,
        				sms_code:this.sms_code
        			}
        			resource.loginverifyPost(arg).then(res => {
        				if(res.data.code == 1){ 
        					localStorage.setItem('secret_key',res.data.data.secret_key);
        					this.show_dialog = false;
        					this.$toast(res.data.msg);
        					this.$router.replace('/index');
        				}else{
        					this.$toast(res.data.msg);
        				}
        			});
        		}
        	}
        }
    }
</script>










