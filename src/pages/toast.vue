<template>
	<div>
		<!-- 淘宝 -->
		<!-- <div class="toast_content" v-if="shop_type == '1'">
			<div class="toast_title">请先浏览以下注意事项，浏览完成后开始任务</div>
			<div class="toast_item">
				禁止点直通车（左上角有hot）进入，点直通车的扣除佣金。
			</div>
			<div class="toast_item">
				禁止搜索店铺名进店，一定要搜索关键词搜索进入。
			</div>
			<div class="toast_item">
				禁止使用淘金币，红包。淘金币红包部分不返款。
			</div>
			<div class="toast_item">
				禁止使用红包天猫积分，优享礼金。月卡，返利，等等。
			</div>
			<div class="toast_item">
				以下图例为直通车HOT标，见此标的不能点。
			</div>
			<div class="img_content">
				<img class="toast_img" src="http://upload.gxk8090.com/toast_img.png">
			</div>
		</div> -->
		<!-- 拼多多 -->
		<!-- <div class="toast_content" v-if="shop_type == '2'">
			<div class="toast_title">拼多多任务下单付款注意事项</div>
			<div class="toast_item">
				收货人手机号一定要和系统绑定的手机号完全一致；
			</div>
			<div class="toast_item">
				禁止使用平台红包、月卡、返利等任何优惠；
			</div>
			<div class="toast_item">
				不要【单独购买】和【发起拼单】，只能通过【去拼单】方式下单；
			</div>
			<div class="toast_item">
				拼多多APP搜索浏览、收藏宝贝、关注店铺、浏览2-3分钟后下单。
			</div>
			<div class="toast_item">
				不按照要求做的审核不通过，多次不通过的禁止接单一个月。
			</div>
			<div class="img_content">
				<img class="toast_img" src="../static/pdd_toast_icon.png">
			</div>
		</div> -->
		<!-- 得物 -->
		<!-- <div class="toast_content" v-if="shop_type == '3'">
			<div class="toast_title">得物退款任务注意事项</div>
			<div class="toast_item">
				此任务为得物退款任务，提交/审核成功后请申请退款。
			</div>
		</div> -->
		<!-- 抖音 -->
		<!-- <div class="toast_content" v-if="shop_type == '4'">
			<div class="toast_title">抖音任务注意事项</div>
			<div class="toast_item">
				收藏，加购，然后下单付款。
			</div>
			<div class="img_content">
				<div class="sort_num">1、</div>
				<img class="toast_img" src="http://upload.gxk8090.com/dy_toast_01.jpg">
			</div>
			<div class="img_content">
				<div class="sort_num">2、</div>
				<img class="toast_img" src="http://upload.gxk8090.com/dy_toast_02.jpg">
			</div>
		</div> -->
		<div class="toast_content">
			<div class="toast_title" v-if="shop_type == '1'">请先浏览以下注意事项，浏览完成后开始任务</div>
			<div class="toast_title" v-if="shop_type == '2'">拼多多任务下单付款注意事项</div>
			<div class="toast_title" v-if="shop_type == '3'">得物退款任务注意事项</div>
			<div class="toast_title" v-if="shop_type == '4'">抖音任务注意事项</div>
			<div class="toast_item" v-html="content">
			</div>
			<div class="img_content">
				<img class="toast_img" :src="item" v-for="item in imgs">
			</div>
		</div>
		<div class="but_box">
			<div class="next" @click="next">确定</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.toast_content{
	margin-top: .28rem;
	margin-bottom: 1.44rem;
	background: #fff;
	padding: .36rem .26rem;
	.toast_title{
		font-weight: 500;
		margin-bottom: .6rem;
		font-size: .3rem;
		color:#FA6400;
	}
	.toast_item{
		font-weight: 500;
		font-size: .3rem;
		color:#333333;
	}
	.img_content{
		margin-top: .5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.sort_num{
			color:#FA6400;
			width: 100%;
			font-size: .3rem;
		}
		.toast_img{
			width: 6.28rem;
		}
	}
}
.but_box{
	position: fixed;
	left: 0;
	bottom: 0;
	background: #fff;
	width: 100%;
	height: 1.44rem;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	.next{
		width: 6.2rem;
		text-align: center;
		height: .9rem;
		line-height: .9rem;
		background: #00C693;
		border-radius: .45rem;
		font-size: .32rem;
		color: #FFFFFF;
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				task_id:"",
				shop_type:"",
				content:"",
				imgs:[]
			}
		},
		created(){
			this.task_id = this.$route.query.task_id;
			this.shop_type = this.$route.query.shop_type;
			//获取任务提示
			this.getTaskTip();
		},
		methods:{
			//获取任务提示
			getTaskTip(){
				resource.getTaskTip({shop_type:this.shop_type}).then(res => {
					if(res.data.code == 1){
						this.content = res.data.data.content;
						this.imgs = res.data.data.imgs;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			next(){
				this.$router.push('/order_detail?task_id=' + this.task_id);
			}
		}
	}
</script>