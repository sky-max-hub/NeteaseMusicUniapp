<template>
	<scroll-view scroll-y class="find-scrollview">
		<image-banner :banners="banners"></image-banner>
		<fun-list-item></fun-list-item>
		<recommend-song-list :recommend_playlists="recommend_playlists"></recommend-song-list>
		<seize-view style="margin-top: 150upx;"></seize-view>
	</scroll-view>
</template>

<script>
	import imageBanner from './ImageBanner.vue'
	import funListItem from './FunListItem.vue'
	import seizeView from '../SeizeView.vue'
	import recommendSongList from './RecommendSongList.vue'
	import $repeater from '../../utils/repeater.js'
	export default{
		components:{
			imageBanner,
			funListItem,
			seizeView,
			recommendSongList,
		},
		data(){
			return{
				banners:[],
				recommend_playlists:[],
				//定义下拉逻辑
				triggered: false, 
				_freshing: false,
				//从获取到的歌单中获取的数目
				recommend_count: 0,
			}
		},
		onLoad() {
			this._freshing=false
		},
		created() {
			this.init_banner();
			this.get_recommend_playlists();
		},
		methods:{
			//获取播放的轮播图
			init_banner() {
				$repeater.other.banner((res) => {
					this.banners = res.banners;
					console.log(res.banners)
				});
			},
			//获取推荐的歌单
			get_recommend_playlists() {
				$repeater.personalized.playlist((res)=> {
					console.log('获取到的推荐歌单')
					console.log(res.result)
					let list=[res.result.slice(0,3),res.result.slice(3,6),res.result.slice(6,9),
					res.result.slice(9,12)]
					this.recommend_playlists=list
					console.log(this.recommend_playlists)
				}, 12)
			}
		}
	}
</script>

<style>
	.find-scrollview{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	/* .private-recommend{
		width: 100%;
		border-top: 15upx solid rgb(245,245,245);
	} */
</style>
