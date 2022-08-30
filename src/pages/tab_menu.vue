<template>
	<div class="menu_container">
		<div class="title_box">
			<div class="service" @click="$router.push('/service')">反馈问题</div>
			<div class="title_text">{{title}}</div>
			<div class="route_title" v-if="userInfo.user_type == 1" @click="$router.push('/disciple')">徒弟列表</div>
		</div>
		<div class="announcement">
			<div class="left">
				<img class="announcement_icon" src="../assets/announcement.png">
				<div class="swiper_box">
					<mt-swipe :showIndicators="false">
						<mt-swipe-item v-for="item in announcement_list">
							<div class="announcement_text" @click="getAnnouncement(item.content)">{{item.content}}</div>
						</mt-swipe-item>
					</mt-swipe>
				</div>
			</div>
			<img class="right_icon" src="../assets/right.png">
		</div>
		<!-- 公告内容 -->
		<div class="announcement_box" v-if="showAnnouncement" @click="showAnnouncement = false">
			<div class="announcement_content">
				<div class="top">{{announcement}}</div>
				<div class="ok">确认</div>
			</div>
		</div>
		<div class="page_content">
			<router-view></router-view>
		</div>
		<div class="menu_row">
			<div class="menu_item" @click="active_index = '/index'">
				<img class="menu_icon" src="../assets/index_icon_active.png" v-if="active_index == '/index'">
				<img class="menu_icon" src="../assets/index_icon.png" v-else>
				<div class="menu_text" :class="{'active_text':active_index == '/index'}">接单</div>
			</div>
			<div class="menu_item" @click="active_index = '/mjx'">
				<img class="menu_icon" src="../assets/mjx_icon_active.png" v-if="active_index == '/mjx'">
				<img class="menu_icon" src="../assets/mjx_icon.png" v-else>
				<div class="menu_text" :class="{'active_text':active_index == '/mjx'}">买家秀</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.menu_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.title_box{
		background: #fff;
		width: 100%;
		height: .88rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: .2rem;
		position: relative;
		.title_text{
			font-size: .32rem;
			color: #38393A;
			font-weight:500;
		}
		.service{
			position: absolute;
			left: .2rem;
			font-size: .28rem;
			color: #000000;
		}
		.route_title{
			position: absolute;
			right: .2rem;
			font-size: .28rem;
			color: #000000;
		}
	}
	.announcement{
		border-top:1px solid #E8E8E8;
		background: #fff;
		width: 100%;
		height: .64rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: .22rem;
		padding-right: .22rem;
		.left{
			flex:1;
			display: flex;
			align-items: center;
			.announcement_icon{
				margin-right: .1rem;
				width: .36rem;
				height: .36rem;
			}
			.swiper_box{
				flex:1;
				height: .58rem;
				.announcement_text{
					height: .58rem;
					line-height: .58rem;
					font-size: .24rem;
					color: #333333;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.right_icon{
			margin-left: .1rem;
			width: .36rem;
			height: .36rem;
		}
	}
	.announcement_box{
		background: rgba(0, 0, 0, 0.5);;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.announcement_content{
			border-radius: .12rem;
			background: #fff;
			width: 5.8rem;
			.top{
				padding:.3rem .24rem;
				font-size: .24rem;
				color:#333333;
			}
			.ok{
				border-top: 1px solid #F2F2F2;
				width: 100%;
				text-align: center;
				height: .86rem;
				line-height: .86rem;
				color:#333333;
				font-size: .3rem;
				font-weight:600;
			}
		}
	}
	.page_content{
		border:1px solid red;
		width: 100%;
		flex:1;
		position: relative;
	}
	.menu_row{
		background: #ffffff;
		width: 100%;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.menu_item{
			display: flex;
			flex-direction: column;
			align-items: center;
			.menu_icon{
				width: .48rem;
				height: .48rem;
			}
			.menu_text{
				font-size: .24rem;
				color: #999999;
			}
			.active_text{
				color: #333333;
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
				userInfo:{},
				announcement_list:[],
				active_index:'/mjx',
				showAnnouncement:false,
				announcement:"",
				title:"接单",
			}
		},
		created(){
			//获取用户信息
			this.getUserInfo();
			//获取公告
			this.getLatestNotice();
			this.$router.push('/mjx');
		},
		watch:{
			active_index:function(n,o){
				this.active_index = n;
				if(n == '/index'){
					this.title = '接单';
				}else if(n == '/mjx'){
					this.title = '买家秀';
				}
				this.$router.push(n)
			}
		},
		methods:{
			//获取公告
			getLatestNotice(){
				resource.getLatestNotice().then(res => {
					if(res.data.code == 1){
						this.announcement_list = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//查看公告
			getAnnouncement(content){
				this.showAnnouncement = true;
				this.announcement = content;
			},
			//获取用户信息
			getUserInfo(){
				resource.getUserStatus().then(res => {
					if(res.data.code == 1){
						this.userInfo = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			}
		}
	}
</script>

