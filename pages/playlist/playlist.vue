<template>
	<view class="parent">
		<view class="top test-border">
			<status-bar></status-bar>
			<view class="topBar test-border">
				<view @tap="backTo()">
					<view class="icon iconfont icon-sdf"></view>
					<text style="font-size: 1em;">歌单</text>
				</view>
				<view>
					<view class="icon iconfont icon-search"></view>
					<view class="icon iconfont icon-gengduo1"></view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y style="width: 100%;height: 90%;">
			<view class="scroll-top test-border">
				<view class="test-border">
					<view class="flex-hv-center test-border">
						<image :src="tmp_image" mode="widthFix"></image>
					</view>
					<view class="test-border">
						<view>
							<text>{{tmp_name}}</text>
						</view>
						<view>
							<image :src="playlist.creator.avatarUrl" mode="widthFix"></image>
							<text>{{playlist.creator.nickname}}</text>
							<view class="icon iconfont icon-you"></view>
						</view>
						<view>
							<text>{{playlist.creator.signature}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="test-border scroll-collection">
				<view>
					<view class="icon iconfont icon-shoucang"></view>
					<text>{{playlist.subscribedCount}}</text>
				</view>
				<text>|</text>
				<view>
					<view class="icon iconfont icon-xiaoxi"></view>
					<text>{{playlist.trackCount}}</text>
				</view>
				<text>|</text>
				<view>
					<view class="icon iconfont icon-remen"></view>
					<text>{{playlist.playCount}}</text>
				</view>
			</view>
			<view class="play-list test-border">
				<view class="play-header test-border">
					<view class="icon iconfont icon-bofang"></view>
					<text style="font-size: 1.1em;">播放全部</text>
					<text style="font-size: 1em;">({{songList.length}}首)</text>
				</view>
				<view class="play-list-items test-border">
					<block v-for="(item,index) in songList">
						<view class="play-list-item test-border" @tap="toPlay(item,songList)">
							<view class="test-border flex-hv-center">
								<template v-if="item.id==played.id">
									<view class="icon iconfont icon-paixingbang1"></view>
								</template>
								<template v-else>
									<text>{{index+1}}</text>
								</template>
							</view>
							<view class="test-border">
								<view>
									<text style="font-size: 1.1em;">{{item.name}}</text>
								</view>
								<view>
									<text style="font-size: 1em;">
										{{format_songer_name(item.ar)}}-{{item.al.name}}
									</text>
								</view>
							</view>
							<view class="test-border flex-hv-center">
								<view class="icon iconfont icon-gengduo1"></view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<seize-view style="margin-top: 150upx;"></seize-view>
		</scroll-view>
		<play-record></play-record>
	</view>
</template>

<script>
	import statusBar from '../../component/StatusBar.vue'
	import playRecord from '../../component/PlayRecord.vue'
	import seizeView from '../../component/SeizeView.vue'
	import $repeater from '../../utils/repeater.js'
	export default {
		components: {
			statusBar,
			playRecord,
			seizeView,
		},
		data() {
			return {
				show_play: false,
				playlist_id: '',
				tmp_name: '',
				tmp_image: '',
				currentSong:{},
				playlist: {
					creator: {
						
					},
					tracks:[],
					trackIds:[],
				},
				songList:[],
			}
		},
		computed: {
		},
		onLoad(option) {
			this.playlist_id = option.playlist_id;
			this.tmp_name = option.name;
			this.tmp_image = option.cover_image;
			this.get_playlist_detail();
		},
		onReady() {
			
		},
		onShow() {
			
		},
		computed:{
			played: function() {
				return this.$store.state.played;
			}
		},
		methods: {
			get_playlist_detail() {
				let playlist_id = this.playlist_id;
				$repeater.playlist.get_playlist_detail(playlist_id, (data)=> {
					let playlist = data.playlist;
					this.playlist = playlist;
					this.get_songList_detail();
				});
			},
			get_songList_detail(){
				let song_ids = this.format_songId(this.playlist.trackIds)
				console.log(song_ids)
				$repeater.song.get_song_detail(song_ids, (data)=>{
					this.songList = data.songs;
				});
			},
			format_songer_name(data){
				let arr=[]
				data.forEach(i=>{
					arr.push(i.name)
				})
				return arr.join(' ')
			},
			format_songId(data){
				let arr=[]
				data.forEach(i=>{
					arr.push(i.id)
				})
				return arr.join(',')
			},
			backTo(){
				uni.navigateBack({
				    animationType: 'fade-out'
				});
			},
			toPlay(item,songList){
				// 播放
				let song_id = item.id;
				$repeater.player.start(song_id, (played)=> {
					played && this.$store.commit('set_played', played);
				})
				this.$store.commit('set_current_playlist',songList);
			}
		}
	}
</script>

<style scoped>
	.parent{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.top{
		height: 12%;
		width: 100%;
		background-color: rgb(86, 78, 75);
	}
	.topBar{
		margin: 0 auto;
		width: 92%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 15upx;
	}
	.topBar>view{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 20%;
	}
	.topBar>view>view{
		font-size: 36upx;
		color: #FFFFFF;
		font-weight: bold;
	}
	.topBar>view>text{
		margin-left: 20upx;
		font-size: 37upx;
		color: #FFFFFF;
		font-weight: 500;
	}
	.scroll-top{
		background-color:rgb(86, 78, 75);
		width: 100%;
		padding: 100upx 0;
		padding-top: 60upx;
	}
	.scroll-top>view{
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.scroll-top>view>view:nth-child(1)>image{
		width: 250upx;
		height: 250upx;
		border-radius: 20upx;
		box-shadow: 0 -10upx 5upx rgb(101, 95, 92);
	}
	.scroll-top>view>view:nth-child(2){
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 40upx;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(1){
		margin-bottom: 20upx;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(1)>text:nth-child(1){
		color: #FFFFFF;
		font-size: 34upx;
		font-weight: 500;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(2){
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20upx;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(2)>image{
		border-radius: 50%;
		width: 65upx;
		margin-right: 20upx;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(2)>view{
		color: rgb(152, 148, 146);
		font-size: 28upx;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(2)>text{
		color: rgb(152, 148, 146);
		font-size: 28upx;
		font-weight: bold;
		margin-right: 10upx;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(3){
		color: #FFFFFF;
		font-size: 30upx;
	}
	.scroll-top>view>view:nth-child(2)>view:nth-child(3)>text{
		-webkit-line-clamp: 2;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
	}
	
	.scroll-collection{
		width: 60%;
		margin: 30upx auto;
		margin-top: -40upx;
		border-radius: 40upx;
		padding: 15upx 30upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
		box-shadow: 0 2upx 5upx #d3d3d3;
	}
	.scroll-collection>view{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.scroll-collection>text{
		color: rgb(226, 226, 226);
		font-size: 35upx;
		font-weight: bold;
	}
	.scroll-collection>view>view{
		font-size: 40upx;
		color: rgb(51, 51, 51);
		margin-right: 10upx;
		font-weight: 500;
	}
	.scroll-collection>view>text{
		font-size: 30upx;
		color: rgb(51, 51, 51);
		margin-right: 10upx;
		font-weight: 500;
	}
	
	.play-list{
		width: 100%;
	}
	.play-header{
		width: 90%;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}
	.play-header>view:nth-child(1){
		color: rgb(255, 57, 44);
		font-size: 50upx;
		margin-right: 20upx;
	}
	.play-header>text:nth-child(2){
		font-weight: bold;
		font-size: 30upx;
		margin-right: 20upx;
	}
	.play-header>text:nth-child(3){
		color: rgb(153, 153, 153);
	}
	
	.play-list-items{
		width: 100%;
		margin-top: 20upx;
	}
	.play-list-item{
		width: 95%;
		margin: 20upx auto;
		display: flex;
		align-items: center;
		padding: 10upx 0;
	}
	.play-list-item:active{
		background-color: #D3D3D3;
	}
	.play-list-item>view:nth-child(1){
		width: 10%;
	}
	.play-list-item>view:nth-child(1)>text{
		font-size: 35upx;
		font-weight: bold;
		color: rgb(153, 153, 153);
	}
	.play-list-item>view:nth-child(1)>view{
		color: rgb(255, 58, 58);
		font-size: 40upx;
	}
	.play-list-item>view:nth-child(2){
		width: 80%;
		margin-left: 20upx;
	}
	.play-list-item>view:nth-child(2)>view:nth-child(1){
		color: rgb(51, 51, 51);
		font-size: 34upx;
	}
	.play-list-item>view:nth-child(2)>view:nth-child(1)>text{
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.play-list-item>view:nth-child(2)>view:nth-child(2){
		color: rgb(128, 128, 128);
		font-size: 27upx;
	}
	.play-list-item>view:nth-child(2)>view:nth-child(2)>text{
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.play-list-item>view:nth-child(3){
		width: 10%;
	}
	.play-list-item>view:nth-child(3)>view{
		font-size: 36upx;
		font-weight: bold;
		color: rgb(153, 153, 153);
	}
</style>
