<template>
	<view class="top">
		<status-bar></status-bar>
		<view class="top-tab-bar test-border">
			<view class="test-border" @tap="showSideDrawer">
				<view class="icon iconfont icon-gengduo"></view>
			</view>
			<view class="test-border">
				<block v-for="(tab,index) in topTabBar" :key="index">
					<view style="font-size: 1.1em;" class="test-border" :class="{'topTabActive' :topTabIndex==index}"
					@tap="topTabTap(index)">
						{{tab}}
						<template v-if="topTabIndex==index">
							<view class="top-tab-underline"></view>
						</template>
					</view>
				</block>
			</view>
			<view class="test-border">
				<view class="icon iconfont icon-search"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import statusBar from './StatusBar.vue'
	export default {
		components:{
	 		statusBar
		},
		props:{
			topTabIndex: Number,
		},
		data() {
			return {
				topTabBar: ['我的','发现','云村'],
			}
		},
		onLoad() {
	
		},
		methods: {
			topTabTap(index){
				this.$emit("topTabBar",index)
			},
			showSideDrawer(){
				this.$emit("showSideDrawer")
			}
		}
	}
</script>

<style scoped>
	.top{
		height: 12%;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		/* border: 10upx solid #0A98D5; */
	}
	.top-tab-bar{
		display: flex;
		align-items: center;
		padding: 10upx;
		padding-bottom: 5upx;
		/* border: 10upx solid #0A98D5; */
		margin-top: 15upx;
		position: absolute;
		top: 20%;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.top-tab-bar>view:nth-child(1){
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top-tab-bar>view:nth-child(1)>view{
		font-size: 40upx;
		font-weight: bold;
		color: rgb(49,49,49);
	}
	
	.top-tab-bar>view:nth-child(2){
		width: 70%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.top-tab-bar>view:nth-child(2)>view{
		font-size: 36upx;
		font-weight: 550;
		color: rgb(99,99,99);
	}
	.top-tab-bar>view:nth-child(3){
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top-tab-bar>view:nth-child(3)>view{
		font-size: 40upx;
		font-weight: bold;
		color: rgb(49,49,49);
	}
	.topTabActive{
		color: rgb(49,49,49) !important;
	}
	.top-tab-underline{
		background-image: linear-gradient(45deg,rgb(255,58,58),rgb(255,58,58),rgb(255,58,58),#FFFFFF);
		height: 15upx;
		border-radius: 20upx;
		margin-top: -20upx;
	}
</style>
