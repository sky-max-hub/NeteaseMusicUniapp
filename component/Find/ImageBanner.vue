<template>
	<view class="find-banner flex-hv-center">
		<swiper-dot style="width: 100%;height: 100%;"
		:current="bannerIndex" :info="banners" :dotsStyles="donSytle">
			<swiper style="width: 100%;height: 100%" @change="changeBannerIndex" :autoplay="true" interval="6000" :circular="true">
				<block v-for="(item,index) in banners">
					<swiper-item>
						<view class="flex-hv-center banner-container">
							<image :src="item.pic" mode="aspectFills"/>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</swiper-dot>
	</view>
</template>

<script>
	import swiperDot from './SwiperDot.vue'
	export default{
		props:{
			banners: Array
		},
		components:{
			swiperDot,
		},
		created() {
			// this.banners.map((i)=>{
			// 	console.log('............'+i.imageUrl)
			// })
		},
		data(){
			return{
				bannerIndex: 0,
				donSytle:{
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 255, 255, 0.9)',
					selectedBorder: '1px rgba(255, 255, 255, 0.9) solid'
				},
			}
		},
		methods:{
			changeBannerIndex(event){
				this.bannerIndex=event.detail.current
			}
		}
	}
</script>

<style>
	.find-banner{
		width: 100%;
		height: 30%;
		background-image: linear-gradient(to bottom,#f5f5f5,#ffffff);
		margin-bottom: 30upx;
	}
	.banner-container{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.banner-container>image{
		border-radius: 25upx;
		height: 95%;
		width: 95%;
		will-change: transform
	}
</style>
