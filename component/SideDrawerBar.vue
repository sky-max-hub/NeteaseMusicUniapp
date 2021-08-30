<template>
	<view class="side-drawer-bar">
		<view class="test-border">
			<view class="test-border">
				<view>
					<image :src="user_info.profile.avatarUrl"></image>
					<text style="font-size: 1.2em;">{{user_info.profile.nickname}}</text>
					<view class="icon iconfont icon-you"></view>
				</view>
				<view @tap="scanCode">
					<view class="icon iconfont icon-saoma"></view>
				</view>
			</view>
		</view>
		<scroll-view class="scroll-side-bar test-border" scroll-y>
			<view class="scroll-side-bar-item">
				<view>
					<text style="font-size: 1.2em;">音乐服务</text>
				</view>
				<view>
					<block v-for="(item,index) in sideBarService">
						<view class="flex-v-center">
							<view class="flex-v-center">
								<view :class="item.itemClass"></view>
								<text style="font-size: 1.3em;">{{item.itemName}}</text>
							</view>
							<view>
								<view class="icon iconfont icon-you"></view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="scroll-side-bar-item">
				<view>
					<text style="font-size: 1.2em;">其他</text>
				</view>
				<view>
					<block v-for="(item,i) in sideBarOther">
						<view class="flex-v-center">
							<view class="flex-v-center">
								<view :class="item.itemClass"></view>
								<text style="font-size: 1.3em;">{{item.itemName}}</text>
							</view>
							<view>
								<view class="icon iconfont icon-you"></view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view @tap="logout()" style="font-size: 1.3em;" class="flex-hv-center side-drawer-exit">退出云音乐登录</view>
			<seize-view></seize-view>
		</scroll-view>
	</view>
</template>

<script>
	import seizeView from './SeizeView.vue'
	import $repeater from '../utils/repeater.js'
	export default {
		props:{
			user_info: Object
		},
		components:{
			seizeView,
		},
		data() {
			return {
				lastX: 0,
				lastY: 0,
				flag: 0,
				sideBarService:[
					{
						itemName:'应用设置',
						itemClass:'icon iconfont icon-shezhi'
					},
					{
						itemName:'夜间模式',
						itemClass:'icon iconfont icon-dark'
					},
					{
						itemName:'定时关闭',
						itemClass:'icon iconfont icon-dingshirenwu'
					},
					// {
					// 	itemName:'个性装扮',
					// 	itemClass:'icon iconfont icon-yifupifu'
					// },
					// {
					// 	itemName:'音乐黑名单',
					// 	itemClass:'icon iconfont icon-icon_xinyong_xianxing_jijin-'
					// },
					// {
					// 	itemName:'青少年模式',
					// 	itemClass:'icon iconfont icon-anquanzhuye'
					// },
					// {
					// 	itemName:'音乐闹钟',
					// 	itemClass:'icon iconfont icon-icon-test'
					// }
				],
				sideBarOther:[
					{
						itemName:'帮助与反馈',
						itemClass:'icon iconfont icon-bangzhu'
					},
					{
						itemName:'分享网易云',
						itemClass:'icon iconfont icon-fenxiang'
					},
					{
						itemName:'关于',
						itemClass:'icon iconfont icon-guanyu'
					}
				]
			}
		},
		onLoad() {
		},
		methods: {
			scanCode(){
				uni.scanCode({
					success: function (res) {
					    console.log('条码类型：' + res.scanType);
					    console.log('条码内容：' + res.result);
					}
				})
			},
			logout() {
				console.log('logout');
				$repeater.user.logout((res)=> {
					console.log(res);
					if (res.code == 200) {
						this.$store.commit('logout');
						uni.redirectTo({
							url: '/pages/loginPage/login',
						});
					}
				})
			},
		}
	}
</script>

<style scoped>
	.side-drawer-bar{
		height: 100%;
		margin: 0;
		display: flex;
		flex-direction: column;
		background-color: rgb(245,245,245);
	}
	.side-drawer-bar>view:nth-child(1){
		display: flex;
		justify-content: center;
		width: 100%;
		height: 15%;
	}
	.side-drawer-bar>view:nth-child(1)>view:nth-child(1){
		width: 85%;
		margin: 0 auto;
		margin-top: 90upx;
		margin-bottom: 40upx;
		display: flex;
		justify-content: space-between;
	}
	.side-drawer-bar>view:nth-child(1)>view:nth-child(1)>view:nth-child(1){
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.side-drawer-bar>view:nth-child(1)>view:nth-child(1)>view:nth-child(1)>image{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.side-drawer-bar>view:nth-child(1)>view:nth-child(1)>view:nth-child(1)>text{
		color: rgb(49,49,49);
		font-size: 35upx;
		margin-right: 10upx;
		font-weight: 500;
	}
	.side-drawer-bar>view:nth-child(1)>view:nth-child(1)>view:nth-child(1)>view{
		color: rgb(49,49,49);
		font-size: 35upx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.side-drawer-bar>view:nth-child(1)>view:nth-child(1)>view:nth-child(2){
		display: flex;
		align-items: center;
	}
	.side-drawer-bar>view:nth-child(1)>view:nth-child(1)>view:nth-child(2)>view{
		color: rgb(49,49,49);
		font-size: 40upx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.scroll-side-bar{
		height: 85%;
		width: 100%;
	}
	.scroll-side-bar-item{
		width: 85%;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 20upx auto;
		margin-bottom: 40upx;
	}
	.scroll-side-bar-item>view:nth-child(1){
		padding: 25upx 40upx;
		color: rgb(153,153,153);
		font-size: 28upx;
		border-bottom: 1upx solid rgb(245,245,245);
	}
	.scroll-side-bar-item>view:nth-child(2)>view{
		padding: 25upx 40upx;
		justify-content: space-between;
	}
	.scroll-side-bar-item>view:nth-child(2)>view:active{
		background-color: #D3D3D3;
	}
	.scroll-side-bar-item>view:nth-child(2)>view>view:nth-child(1)>view{
		color: rgb(51,51,51);
		font-weight: bold;
		font-size: 35upx;
		margin-right: 20upx;
	}
	.scroll-side-bar-item>view:nth-child(2)>view>view:nth-child(1)>text{
		font-size: 35upx;
		color: rgb(51,51,51);
		font-weight: 500;
	}
	.scroll-side-bar-item>view:nth-child(2)>view>view:nth-child(2)>view{
		color: rgb(204,204,204);
		font-size: 35upx;
		font-weight: bold;
	}
	.side-drawer-exit{
		width: 85%;
		font-size: 33upx;
		color: rgb(255,58,58);
		font-weight: 400;
		margin: 40upx auto;
		padding: 15upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}
	.side-drawer-exit:active{
		background-color: #D3D3D3;
	}
</style>
