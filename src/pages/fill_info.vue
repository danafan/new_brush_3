<template>
	<div class="container">
		<div class="content_box" v-if="userInfo.phone == ''">
			<div class="login_title">绑定手机号</div>
			<input class="input_element" type="text" placeholder="手机号码" v-model="phone">
			<div class="code_box">
				<input class="code" type="number" placeholder="短信验证码" v-model="sms_code">
				<div class="but_text" :class="{'but_text_active':!notBut}" @click="getCode">{{but_text}}</div>
			</div>
			<div class="login_but" @click="login">绑定</div>
		</div>
		<div class="content_box" v-if="userInfo.openid == ''">
			<div class="er_code_title">长按或截屏保存二维码，到微信扫一扫绑定微信</div>
			<img class="er_code_img" :src= "img_url + 'user/getwxgranturl'">
		</div>
		<div class="content_box" v-if="userInfo.alipay_acount == ''">
			<div class="login_title">绑定支付宝账号</div>
			<input class="input_element" type="text" placeholder="输入支付宝账号" v-model="zfb">
			<input class="input_element" type="text" placeholder="输入姓名" v-model="alipay_name">
			<div class="login_but" @click="bindaliPayAcount">绑定</div>
		</div>
		<div class="content_box" v-if="userInfo.bank_card_number == ''">
			<div class="login_title">绑定银行卡号</div>
			<input class="input_element" type="text" placeholder="输入银行名称" v-model="open_account_bank">
			<input class="input_element" type="number" placeholder="输入银行卡号" v-model="bank_card_number">
			<input class="input_element" type="text" placeholder="输入姓名" v-model="name">
			<div class="login_but" @click="bindBank">绑定</div>
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
	overflow-y: scroll;
	.content_box{
		margin-top: .26rem;
		width: 100%;
		height: 5.26rem;
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
		.er_code_title{
			margin-top: .36rem;
			margin-bottom: .36rem;
			font-size: .32rem;
			color:#000000;
			font-weight: 500;
		}
		.er_code_img{
			width: 3.6rem;
			height: 3.6rem;
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
				userInfo:{},
				img_url:`${location.origin}/mobile/`,
				phone:"",
				sms_code:"",
				but_text:"发送验证码",
				notBut: true,                   	//默认获取验证码按钮可点击
      			time:60,                        	//默认倒数60秒
      			zfb:"",
				alipay_name:"",
				open_account_bank:"",
				bank_card_number:"",
				name:"",
      		}
      	},
      	created(){
      		//获取用户信息
      		this.getUserInfo();
      	},
      	methods:{
      		//获取用户信息
      		getUserInfo(){
      			resource.getUserStatus().then(res => {
      				if(res.data.code == 1){
      					this.userInfo = res.data.data;
      				}else{
      					this.$toast(res.data.msg);
      				}
      			})
      		},
			//获取验证码
			getCode(){
				if(!this.judgmentPhone.test(this.phone)){
					this.$toast("请输入正确的手机号");
				}else{
        			if(this.notBut == true){//如果按钮可以点击
        				let obj = {
        					phone: this.phone,
        				}
        				resource.getSmsCode(obj).then(res => {
            				if(res.data.code == 1){ //发送成功
            					this.$toast("发送成功...");
            					this.time = res.data.data;
            					this.timeDown();
            				}else{
            					this.$toast(res.data.msg);
            				}
            			});
        			}else{
        				this.$toast("操作频繁");
        			}
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
			// 绑定
			login(){
				if(!this.judgmentPhone.test(this.phone)){
					this.$toast("请输入正确的手机号");
				}else if(this.sms_code == ''){
					this.$toast("请输入验证码");
				}else{
					let req = {
						phone:this.phone,
						sms_code:this.sms_code
					}
					resource.bindPhone(req).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							//获取用户信息
							this.getUserInfo();
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			},
			//绑定支付宝
			bindaliPayAcount(){
				if(this.zfb == ""){
					this.$toast("请输入支付宝账号");
				}else if(this.alipay_name == ""){
					this.$toast("请输入姓名");
				}else{
					resource.bindaliPayAcount({alipay_acount:this.zfb,alipay_name:this.alipay_name}).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							//获取用户信息
							this.getUserInfo();
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			},
			//绑定银行卡
			bindBank(){
				if(this.open_account_bank == ""){
					this.$toast("请输入银行名称");
				}else if(this.bank_card_number == ""){
					this.$toast("请输入银行卡号");
				}else if(this.name == ""){
					this.$toast("请输入姓名");
				}else{
					resource.bindBank({open_account_bank:this.open_account_bank,bank_card_number:this.bank_card_number,name:this.name}).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							//获取用户信息
							this.getUserInfo();
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			},
		}
	}
</script>