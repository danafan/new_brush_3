<template>
	<div>
		<div class="add_problem" @click="sheetVisible = true">+新增问题</div>
		<div class="problem_item" v-for="item in feekList">
			<div class="label">{{item.type == 1 ? '任务问题':'其他问题'}}</div>
			<div class="val">反馈时间：{{item.add_time}}</div>
		</div>
		<mt-actionsheet
		:actions="actions"
		v-model="sheetVisible">
	</mt-actionsheet>
</div>
</template>
<style lang="less" scoped>
.add_problem{
	margin: .28rem auto;
	border:1px solid #00C693;
	border-radius: .1rem;
	background: #fff;
	width: 6.22rem;
	height: .9rem;
	text-align: center;
	line-height: .9rem;
	font-size: .3rem;
	font-weight: 600;
	color: #00C693;
}
.problem_item{
	margin-bottom: .01rem;
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
		color:#333333;
		font-weight: 500;
	}
	.val{
		font-size: .32rem;
		color:#999999;
	}
}
</style>
<script>
	import { Actionsheet } from 'mint-ui';
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				sheetVisible:false,
				actions:[{
					name:'任务问题',
					method:() => {
						this.checkType("1");
					}
				},{
					name:'其他问题',
					method:() => {
						this.checkType("2");
					}
				}],
				feekList:[],	//反馈列表
			}
		},
		created(){
			// 获取反馈列表
			this.getFeekList();
		},
		methods:{
			// 获取反馈列表
			getFeekList(){
				resource.feedbackList().then(res => {
					if(res.data.code == 1){
						this.feekList = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//切换问题类型
			checkType(type){
				this.$router.push('/create_problem?type=' + type)
			}
		},
		components:{
			Actionsheet
		}
	}
</script>