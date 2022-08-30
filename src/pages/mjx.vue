<template>
	<div class="mjx_container">
		<div class="tab_row">
			<div class="tab_item" v-for="(item,index) in tab_list" @click="active_index = index">
				<img class="tab_img" :src="item.active_img" v-if="active_index == index">
				<img class="tab_img" :src="item.img" v-else>
				<div class="tab_name">{{item.name}}</div>
			</div>
		</div>
		<div class="task_list" v-infinite-scroll="loadMore">
			<div class="task_item" v-for="item in task_list" @click="$router.push('/mjx_detail')">
				<div class="row">
					<div class="name">一条文艺男</div>
					<div class="time">2019-07-21 12:45:44</div>
				</div>
				<div class="row">
					<div class="ww_code">hksajdh23</div>
					<div class="button">查看任务</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				tab_list:[{
					img:require('../assets/dcl_icon.png'),
					active_img:require('../assets/dcl_icon_active.png'),
					name:'待处理'
				},{
					img:require('../assets/tjz_icon.png'),
					active_img:require('../assets/tjz_icon_active.png'),
					name:'提交中'
				},{
					img:require('../assets/yjj_icon.png'),
					active_img:require('../assets/yjj_icon_active.png'),
					name:'已拒绝'
				},{
					img:require('../assets/ywc_icon.png'),
					active_img:require('../assets/ywc_icon_active.png'),
					name:'已完成'
				}],
				active_index:0,			//当前选中的下标
				task_list:[{},{},{},{},{},{},{},{},{}],	//任务列表
				loading:false,
			}
		},
		methods:{
			loadMore(){
				console.log("asd")
			}
		}
	}
</script>
<style lang="less" scoped>
.mjx_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.tab_row{
	width: 100%;
	height: 2.3rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tab_item{
		display: flex;
		flex-direction: column;
		align-items: center;
		.tab_img{
			width: .7rem;
			height: .7rem;
		}
		.tab_name{
			margin-top: .24rem;
			font-size: .28rem;
			color: #333333;
		}
	}
}
.task_list{
	width: 100%;
	flex:1;
	padding-left: .2rem;
	padding-right: .2rem;
	overflow-y: scroll;
	.task_item{
		margin-bottom: .2rem;
		border-radius: .12rem;
		background: #ffffff;
		width: 100%;
		height: 1.56rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: .3rem;
		padding-right: .3rem;
		.row{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.name{
				font-size: .28rem;
				color: #333333;
			}
			.time{
				font-size: .24rem;
				color:#999999;
			}
			.ww_code{
				font-size: .24rem;
				color:#333333;
			}
			.button{
				border-radius:.24rem;
				background: #00C693;
				width: 1.4rem;
				text-align: center;
				height: .48rem;
				line-height: .48rem;
				font-size: .24rem;
				color: #ffffff;
			}
		}
	}
}
</style>