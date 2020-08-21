<template>
	<div>
		<div class="title_box">
			<div class="title_text">接单</div>
			<div class="route_title">徒弟列表</div>
		</div>
		<div class="container">
			<div class="select_date" @click="openPicker">
				<div class="left_text">{{date_time}}</div>
				<img class="right_icon" src="../assets/right_icon.png">
			</div>
			<div class="content">
				<div class="content_title">
					<div class="tag_img"></div>
					<div class="title_text">徒弟旺旺号</div>
				</div>
				<div class="content_box">
					<input class="input_box" type="text" placeholder="请输入徒弟旺旺号" v-model="wang_code">
				</div>
			</div>
			<div class="search" @click="search">搜索</div>
		</div>
		<mt-datetime-picker
		ref="picker"
		type="date"
		:startDate="startDate"
		:endDate="endData"
		@confirm="handleConfirm"
		>
	</mt-datetime-picker>
</div>
</template>
<style lang="less" scoped>
.title_box{
	background: #fff;
	width: 100%;
	height: .88rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding-left: .2rem;
	.title_text{
		font-size: .32rem;
		color: #38393A;
		font-weight:500;
	}
	.route_title{
		position: absolute;
		right: .2rem;
		font-size: .28rem;
		color: #000000;
	}
}
.container{
	padding: .2rem;
	.select_date{
		margin-bottom: .2rem;
		border-radius: .16rem;
		background: #fff;
		width: 100%;
		height: .78rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: .28rem;
		padding-right: .28rem;
		.left_text{
			font-size: .3rem;
			color:#333333;
			font-weight:500;
		}
		.right_icon{
			width: .16rem;
			height: .28rem;
		}
	}
	.content{
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
			.input_box{
				display: block;
				border:1px solid #F1F1F1;
				border-radius: .08rem;
				background: #f8f8f8;
				width: 100%;
				height: .8rem;
				padding-left: .26rem;
				border: none;
				outline: none;
				font-size: .28rem;
				box-sizing: border-box;
			}
			input::-webkit-input-placeholder {
				color: #666666;
			}
			input:-moz-placeholder {
				color: #666666;
			}
			input:-ms-input-placeholder {
				color: #666666;
			}
		}
	}
	.search{
		margin-top: 1.2rem;
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
	import { DatetimePicker,Toast } from 'mint-ui';
	export default{
		data(){
			return{
				startDate:new Date(),
				endData:new Date(Date.parse(new Date) + 1000 * 60 * 60 * 24 * 7),
				date_time:"选择日期",
				wang_code:""
			}
		},
		created(){
			console.log(new Date())
			console.log(new Date(Date.parse(new Date) + 1000 * 60 * 60 * 24 * 7))
		},
		methods:{
			//打开日期选择器
			openPicker() {
				this.$refs.picker.open();
			},
			//选择日期
			handleConfirm(v){
				var d = new Date(v);
				this.date_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			},
			//搜索
			search(){
				if(this.date_time === '选择日期'){
					Toast('请选择日期');
				}else if(this.wang_code == ''){
					Toast('请选择输入徒弟旺旺号');
				}else{
					
				}
			},
		},
		components:{
			DatetimePicker
		}
	}
</script>



