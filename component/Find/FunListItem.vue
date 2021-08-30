<template>
	<view class="fun-list-item   flex-v-center">
		<view>
			<view>
				<image src="../../static/tuijian.jpg" mode="widthFix"></image>
			</view>
			<text>每日推荐</text>
		</view>
		<view>
			<view>
				<image src="../../static/diantai.jpg" mode="widthFix"></image>
			</view>
			<text>私人FM</text>
		</view>
		<view>
			<view>
				<image src="../../static/gedan.jpg" mode="widthFix"></image>
			</view>
			<text>歌单</text>
		</view>
		<view>
			<view>
				<image src="../../static/paihang.jpg" mode="widthFix"></image>
			</view>
			<text>排行榜</text>
		</view>
		<view>
			<view>
				<image src="../../static/zhibo.jpg" mode="widthFix"></image>
			</view>
			<text>直播</text>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.fun-list-item{
		width: 100%;
		background-color: #FFFFFF;
	}
	.fun-list-item>view{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.fun-list-item>view>view{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fun-list-item>view>view>image{
		height: 90upx;
		width: 90upx;
		border-radius: 50%;
		margin-bottom: 10upx;
	}
	.fun-list-item>view>text{
		font-size: 23upx;
		color: rgb(51,51,51);
		font-weight: 520;
	}
</style>
