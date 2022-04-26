<template>
	<div>
		<div class="er_code_box">
			<div class="toast">手机号已绑定，如需更改请联系管理员！</div>
			<div class="er_code_title">长按或截屏保存二维码，到微信扫一扫绑定微信</div>
			<img class="er_code_img" src="../assets/announcement.png">
		</div>
	</div>
</template>
<style lang="less" scoped>
.er_code_box{
	margin-top: .28rem;
	background: #fff;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.toast{
		margin-top: .41rem;
		font-size: .32rem;
		color:#666666;
	}
	.er_code_title{
		margin-top: .28rem;
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
</style>
<script>
	export default{

	}
</script>