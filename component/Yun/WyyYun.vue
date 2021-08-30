<template>
	<scroll-view scroll-y class="yun-scrollview">
		<block v-for="(items,i) in recommendVideoList">
			<view class="yun-items test-border">
				<block v-for="(item,index) in items">
					<view class="yun-item test-border">
						<view>
							<image :src="item.cover" mode="widthFix"></image>
							<view class="flex-hv-center">
								<view class="icon iconfont icon-play"></view>
							</view>
						</view>
						<view>
							<text style="font-size: 1.1em;">{{item.name}}</text>
						</view>
						<view>
							<view>
								<view class="icon iconfont icon-bofang"></view>
								<text style="font-size: 0.9em;">{{item.playCount}}</text>
							</view>
							<view>
								<text style="font-size: 0.9em;">{{item.artistName}}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</block>
		<seize-view style="margin-top: 150upx;"></seize-view>
	</scroll-view>
</template>

<script>
	import seizeView from '../SeizeView.vue'
	import $repeater from '../../utils/repeater.js'
	export default {
		components:{
			seizeView,
		},
		data() {
			return {
				recommendVideoList:[],
				//定义下拉逻辑
				triggered: false, 
				_freshing: false,
			}
		},
		computed:{
		},
		onLoad() {
		},
		created() {
			this.get_recommend_video()
		},
		methods: {
			get_recommend_video() {
				console.log('获取推荐视频')
				$repeater.video.recommendList(30,(data)=> {
					console.log('获取到的视频数据')
					this.recommendVideoList=this.spArr(data.data,2)
					console.log(this.recommendVideoList)
				});
			},
			//数组每n个分割
			spArr(arr, num) {
				let newArr = []
				for (let i = 0; i < arr.length;) {
					newArr.push(arr.slice(i, i += num));
				}
				return newArr
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
			},
		}
	}
</script>

<style>
	.yun-scrollview{
		width: 100%;
		height: 100%;
	}
	.yun-items{
		width: 95%;
		display: flex;
		margin: 20upx auto;
	}
	.yun-item{
		width: 48%;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 30upx;
	}
	.yun-item>view:nth-child(1){
		position: relative;
	}
	.yun-item>view:nth-child(1)>view:nth-child(2){
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	},
	.yun-item>view:nth-child(1)>view:nth-child(2)>view{
		font-size: 55upx;
		color: #FFFFFF;
		font-weight: bold;
	}
	.yun-item>view:nth-child(1)>image{
		width: 100%;
		border-radius: 30upx 30upx 0 0;
	}
	.yun-item>view:nth-child(2){
		width: 95%;
		margin: 10upx auto;
	}
	.yun-item>view:nth-child(2)>text{
		color: rgb(70,70,70);
		font-weight: 500;
		margin-left: 20upx;
		font-size: 27upx;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		word-break:break-all;
		overflow: hidden;
		height: 85upx;
		word-break: break-all;
		width: 80%;
	}
	.yun-item>view:nth-child(3){
		width: 90%;
		display: flex;
		align-items: center;
		margin: 15upx auto;
		justify-content: space-between;
	}
	.yun-item>view:nth-child(3)>view:nth-child(1){
		display: flex;
	}
	.yun-item>view:nth-child(3)>view:nth-child(1)>view{
		font-size: 24upx;
		color: rgb(169,169,169);
		margin-right: 5upx;
	}
	.yun-item>view:nth-child(3)>view:nth-child(1)>text{
		font-size: 24upx;
		color: rgb(169,169,169);
	}
	.yun-item>view:nth-child(3)>view:nth-child(2){
		font-size: 24upx;
		color: rgb(169,169,169);
		width: 70%;
		display: flex;
		justify-content: flex-end;
	}
	.yun-item>view:nth-child(3)>view:nth-child(2)>text{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		word-break:break-all;
		-webkit-box-orient: vertical;
	}
</style>
