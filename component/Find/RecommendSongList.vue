<template>
	<view class="recommend-song-list test-border">
		<view class="recommend-headers">
			<text>推荐歌单</text>
	</view>
		<block v-for="(items,index) in recommend_playlists">
			<view class="recommend-items">
				<block v-for="(item,i) in items">
					<view @tap="toPlayList(item.id,item.name,item.picUrl)"
					class="recommend-item flex-hv-center test-border">
						<view>
							<image :src="item.picUrl" mode="widthFix"></image>
							<view>
								<view class="icon iconfont icon-play"></view>
								<text style="font-size: 0.9em;">{{numForm(item.playCount)}}</text>
							</view>
						</view>
						<view class="test-border">
							<text style="font-size: 1em;">{{item.name}}</text>
						</view>
					</view>
				</block>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		props:{
			recommend_playlists: Array
		},
		data(){
			return{
				
			}
		},
		methods:{
			toPlayList(id,name,coverImgUrl){
				console.log('传入的ID是'+id)
				uni.navigateTo({
				    url: '/pages/playlist/playlist?playlist_id='+ id + '&cover_image=' + coverImgUrl+ '&name=' + name,
					animationType: 'fade-in'
				})
			},
			numForm(arg){
				if(arg.toString().length>=13){
					// return arg/1000000000000+"万亿"
					const moneys = arg/1000000000000
					const realVal = parseFloat(moneys).toFixed(1);
					return realVal+"万亿"
					
				}else if(arg.toString().length>=9){
					const moneys = arg/100000000
					const realVal = parseFloat(moneys).toFixed(1);
					return realVal+"亿"
				}else if(arg.toString().length>=4){
					const moneys = arg/10000
					const realVal = parseFloat(moneys).toFixed(1);
					return realVal+"万"
				}
			}
		}
	}
</script>

<style>
	.recommend-song-list{
		margin-top: 40upx;
		width: 100%;
		padding: 25upx 0;
		display: flex;
		flex-direction: column;
		border-top: 1upx solid rgb(240, 240, 240);
	}
	.recommend-headers{
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		width: 90%;
		align-items: center;
		margin-bottom: 20upx;
	}
	.recommend-headers>text{
		font-size: 40upx;
		font-weight: bold;
		color: rgb(51,51,51);
	}
	.recommend-headers>view{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 30upx;
		border: 1upx solid rgb(231,231,231);
		padding: 0 20upx;
	}
	.recommend-headers>view>view{
		font-size: 25upx;
		color: rgb(51,51,51);
	}
	.recommend-headers>view>text{
		font-size: 25upx;
		color: rgb(51,51,51);
	}
	
	.recommend-items{
		display: flex;
		justify-content: space-between;
		width: 95%;
		margin: 10upx auto;
	}
	.recommend-item{
		flex-direction: column;
		width: 31%;
	}
	.recommend-item>view:nth-child(1){
		width: 100%;
		position: relative;
	}
	.recommend-item>view:nth-child(1)>image{
		width: 100%;
		border-radius: 25upx;
		box-shadow: 0upx -10upx 5upx rgb(242, 242, 242);
	}
	.recommend-item>view:nth-child(1)>view{
		position: absolute;
		top: 10upx;
		right: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(0,0,0,0.3);
		border-radius: 20upx;
		color: #FFFFFF;
		font-size: 15upx;
		padding: 0 15upx;
		font-weight: 520;
	}
	.recommend-item>view:nth-child(1)>view>view{
		font-size: 15upx;
		font-weight: 520;
	}
	.recommend-item>view:nth-child(2){
		width: 100%;
		height: 85upx;
	}
	.recommend-item>view:nth-child(2)>text{
		color: rgb(51,51,51);
		font-weight: 500;
		margin-left: 20upx;
		font-size: 23upx;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
		width: 80%;
		white-space:pre-wrap
	}
</style>
