<template>
	<view class="parent" :style="{'background-image': 'url('+played.cover_image+')'}">
		<view class="top test-border">
			<status-bar></status-bar>
			<view class="topBar test-border">
				<view class="test-border flex-hv-center" @tap="backTo()">
					<view class="icon iconfont icon-sdf"></view>
				</view>
				<view class="test-border">
					<text style="font-size: 1.3em;">{{played.name}}</text>
				</view>
				<view class="test-border flex-hv-center">
					<view class="icon iconfont icon-fenxiang"></view>
				</view>
			</view>
		</view>
		<template v-if="!show_lyric">
			<view class="content1 flex-v-center animated fadeInLeft">
				<view @tap="change_container()" class="test-border flex-hv-center">
					<image :src="played.cover_image"></image>
				</view>
				<view class="song-choice test-border">
					<template v-if="islike">
						<view class="icon iconfont icon-aixin" style="color: red;"  @tap="like($event)"></view>
					</template>
					<template v-else>
						<view class="icon iconfont icon-aixin"  @tap="like($event)"></view>
					</template>
					<view class="icon iconfont icon-xiazai"></view>
					<view class="icon iconfont icon-pinglun"></view>
					<view class="icon iconfont icon-gengduo1"></view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="content2 animated fadeInRight">
				<view class="volume test-border">
					<view class="icon iconfont icon-volume_icon"></view>
					<slider class="slider" @change="volume_change" @changing="volume_changing"
					:min="0" :max="1" :value="current_volume" activeColor="rgba(255,255,255,0.5)" 
					backgroundColor="rgba(126,121,125,0.5)" :step="0.05"
					block-color="#FFFFFF" block-size="8"/>
				</view>
				<view class="lyrics test-border" @tap="change_container()">
					<!-- :scroll-top="scroll_top" @scroll="scroll_lyrics" :scroll-into-view="scroll_row" -->
					<scroll-view 
					scroll-y class="lyrics-scroll" 
					style="width: 100%;height: 100%;">
						<view style="width: 100%; height: 30%;">
							
						</view>
						<template v-if="nolyric">
							<view class="lyric-item lyric-item-light">
								<text>纯音乐, 请欣赏</text>
							</view>
						</template>
						<template v-else>
							<block v-for="(row, index) in lyric" :key="index">
								<view v-if="row.content" :id="row.id" class="lyric-item"
								:class="active_lyric_row_index == row.index ? 'lyric-item-light' : ''">
									<text>{{row.content}}</text>
								</view>
							</block>
						</template>
						<view style="width: 100%; height: 20%;">
							
						</view>
					</scroll-view>
				</view>
			</view>
		</template>
		<view class="footer test-border">
			<view class="progess-bar test-border">
				<view class="test-border flex-hv-center">
					<text>{{position_show}}</text>
				</view>
				<slider class="slider" :value="current_position" 
				@change="slider_change" @changing="slider_changing"
				:min="0" :max="duration" activeColor="rgba(255,255,255,0.5)" 
				backgroundColor="rgba(126,121,125,0.5)" 
				block-color="#FFFFFF" block-size="8"/>
				<view class="test-border flex-hv-center">
					<text>{{duration_show}}</text>
				</view>
			</view>
			<view class="player test-border">
				<view v-if="play_mode == 'sequence'" class="icon iconfont icon-hanhan-01-011" @tap="change_play_mode"></view>
				<view v-if="play_mode == 'random'" class="icon iconfont icon-hanhan-01-012" @tap="change_play_mode"></view>
				<view v-if="play_mode == 'single'" class="icon iconfont icon-hanhan-01-01" @tap="change_play_mode"></view>
				<view class="flex-hv-center">
					<view class="icon iconfont icon-48shangyishou" @tap="prev()"></view>
					<view class="flex-hv-center" @tap="turn()">
						<view class="icon iconfont" :class="{'icon-47zanting':playing,'icon-46bofang':!playing}"></view>
					</view>
					<view class="icon iconfont icon-49xiayishou" @tap="next()"></view>
				</view>
				<view class="icon iconfont icon-gengduo"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import statusBar from '@/component/StatusBar.vue'
	import headerImage from '../../static/header.jpg'
	import $repeater from '../../utils/repeater.js'
	
	export default{
		components:{
			statusBar
		},
		data(){
			return {
				headerImage,
				duration: $repeater.player.get_duration().toFixed(0), //音频总长度单位s
				current_position: $repeater.player.get_position().toFixed(0), //当前播放位置
				
				timer: '', //计时器
				animation_timer: '',
				deg: 0,
				dragging: false, //
				show_lyric: false, //是否显示歌词
				nolyric: false,
				lyric: [],
				active_lyric_row_index: 0,
				// scroll_row: 'id0',
				// scroll_top: 0,
				current_volume: 0,
			}
		},
		computed: {
			position_show() {
				let minute = parseInt(this.current_position / 60);
				let second = this.current_position % 60;
				if (minute < 10) {
					minute = '0' + minute;
				}
				if (second < 10) {
					second = '0' + second;
				}
				return minute + ':' + second;
			},
			duration_show() {
				let minute = parseInt(this.duration / 60);
				let second = this.duration % 60;
				if (minute < 10) {
					minute = '0' + minute;
				}
				if (second < 10) {
					second = '0' + second;
				}
				return minute + ':' + second;
			},
			playing() {
				return this.$store.state.playing;
			},
			played() {
				return this.$store.state.played;
			},
			islike() {
				return this.$store.state.likelist.includes(this.played.id);
			},
			play_mode() {
				return this.$store.state.play_mode;
			}
		},
		watch: {
			//#ifdef APP-PLUS
			played(value) {
				console.log(value);
				this.init();
			}
			//#endif
		},
		onReady() {
			//#ifdef APP-PLUS
			this.init();
			this.current_volume = plus.device.getVolume()
			//#endif
		},
		methods:{
			// scroll_lyrics(e){
			// 	this.scroll_top=e.target.scrollHeight-200
			// 	console.log(e)
			// },
			volume_change(e){
				let position = e.detail.value;
				console.log("change")
				plus.device.setVolume(position)
				console.log(plus.device.getVolume())
			},
			volume_changing(e){
				console.log("changeing");
				this.current_volume = e.detail.value;
				console.log(e.detail.value);
			},
			init() {
				this.get_lyric();
				this.init_timer();
				this.init_slider()
			},
			init_slider() {
				setTimeout(()=> {
					this.duration = $repeater.player.get_duration().toFixed(0);
					this.current_position =  $repeater.player.get_position().toFixed(0);
				}, 1000);
			},
			open_playlist() {
				this.$refs.playlist_drawer.open_playlist();
			},
			change_play_mode() {
				let mode_list = ['single', 'sequence', 'random'];
				let current_mode = this.play_mode;
				let index = mode_list.indexOf(current_mode);
				let next_index = index + 1 > 2 ? 0 : index + 1;
				let next_mode = mode_list[next_index];
				this.$store.commit('set_play_mode', next_mode);
			},
			like(event) {
				event.stopPropagation();
				console.log(this.played.id);
				
				$repeater.user.like(this.played.id, !this.islike, (res)=> {
					console.log(res);
					let playlist = this.$store.state.likelist;
					if (this.islike) {
						let index = playlist.indexOf(this.played.id);
						playlist.splice(index, 1);
						console.log(index);
					}else {
						playlist.push(this.played.id);
					}
					console.log(playlist);
					this.$store.commit('set_likelist', playlist);
				})
			},
			set_active_lyric_row_index() {
				if (this.nolyric) {
					return;
				}
				var active_lyric_rows = this.lyric.filter((obj)=> {
				    return parseInt(obj.second) <= parseInt(this.current_position) && obj.content;
				});
				
				let current_row = active_lyric_rows.pop();
				
				if (this.active_lyric_row_index == current_row.index) { //在一行歌词停留时, 就不滚动了
					return;
				}
				
				
				this.active_lyric_row_index = current_row.index;
				
				let to_index = 0;
				if (active_lyric_rows.length > 8) {
					to_index = active_lyric_rows.slice(-8)[0].index;
					
					console.log(active_lyric_rows.slice(-8)[0]);
				}
				
				// if (current_row.content && to_index > 0) {
				// 	this.scroll_row = 'id'+to_index
				// }
				
			},
			get_lyric() {
				$repeater.song.get_lyric(this.played.id, (data)=> {
					
					if (data.nolyric || !data.lrc.lyric) {
						console.log('暂无歌词');
						this.nolyric = true;
						return;
					}
					let lyric = data.lrc.lyric;
					
					let lines = lyric.split('\n');
					
					let new_lyric = [];
					lines.forEach((line, index)=> {
						let new_line = {};
						if (!line) {
							return
						}	
						let pattern =/\[\S*\]/g;
						let time = line.match(pattern)[0];
						let line_lyric = line.replace(time, '');
						
						time = time.replace(/\[/, '');
						time = time.replace(/\]/, '');
						new_line.index = index;
						new_line.id = 'id'+index;
						// console.log(index)
						new_line.time = time;
						new_line.content = line_lyric.trim();
						new_line.second = (time.split(":")[0] * 60 + parseFloat(time.split(":")[1])).toFixed(0);
						new_lyric.push(new_line);
					})
					
					this.lyric = new_lyric;
					console.log(this.lyric[0]);
				});
			},
			change_container() {
				this.show_lyric = !this.show_lyric;
			},
			slider_changing(e) {
				this.dragging = true;
				this.current_position = e.detail.value;
			},
			slider_change(e) {
				console.log(e);
				let position = e.detail.value;
				$repeater.player.seek_to(position);
				this.dragging = false;
			},
			turn() {
				//切换播放暂停状态
				$repeater.player.turn();
			},
			stop_rotate() {
				
			},
			init_timer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = '';
				}
				this.timer = setInterval(()=> {
					// console.log(this.lyric[this.active_row_lyric][2]);
					if (!this.dragging) {
						this.current_position = $repeater.player.get_position().toFixed(0);
						
						if (this.show_lyric) {
							this.set_active_lyric_row_index();
						}
						
					}
				}, 1000);
			},
			next() {
				$repeater.player.next((played)=> {
					played && this.$store.commit('set_played', played);
				})
			},
			prev() {
				$repeater.player.prev((played)=> {
					played && this.$store.commit('set_played', played);
				})
			},
			backTo(){
				uni.navigateBack({
				    animationType: 'fade-out'
				});
			}
		},
	}
</script>

<style scoped>
	.parent{
		position: fixed;
		top: 0;bottom: 0;
		left: 0;right: 0;
		display: flex;
		flex-direction: column;
		background-blend-mode: darken;
		background-image: url("https://img.sky123.top/img/test.jpg");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		background-attachment: fixed; 
		overflow: hidden;
	}
	.parent:after{
		content: "";
		position: absolute;
		left: 0;right: 0;
		top: 0;bottom: 0;
		z-index: -1;
		background: inherit; 
		filter: blur(20px) brightness(70%);
		transform: scale(1.2);
		overflow: hidden;
	}
	.top{
		height: 12%;
		width: 100%;
	}
	.topBar{
		margin: 0 auto;
		width: 92%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 15upx;
	}
	.topBar>view:nth-child(1){
		width: 10%;
	}
	.topBar>view:nth-child(2){
		width: 80%;
	}
	.topBar>view:nth-child(3){
		width: 10%;
	}
	.topBar>view>view{
		font-size: 40upx;
		color: #FFFFFF;
		font-weight: bold;
	}
	.topBar>view>text{
		margin-left: 20upx;
		font-size: 37upx;
		color: #FFFFFF;
		font-weight: 500;
		-webkit-line-clamp: 1;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
	}
	
	.content1{
		height: 65%;
		flex-direction: column;
		/* background-color: #007AFF; */
		justify-content: space-around;
	}
	.content1>view:nth-child(1){
		width: 100%;
		height: 70%;
	}
	.content1>view:nth-child(1)>image{
		border-radius: 50%;
		width: 420upx;
		height: 420upx;
	}
	
	.content2{
		height: 65%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.volume{
		width: 90%;
		height: 10%;
		display: flex;
		margin: 0 auto;
		align-items: center;
		justify-content: space-around;
	}
	.volume>view:nth-child(1){
		font-size: 35upx;
		color: #FFFFFF;
		margin-left: 24upx;
	}
	.lyrics{
		width: 90%;
		height: 90%;
	}
	.lyric-item{
		width: 100%;
		padding: 10upx;
		color: rgb(144, 143, 144);
		font-size: 1.4em;
		margin: 20upx auto;
		/* border: #1AAD19 1upx solid; */
		display: flex;
		font-weight: 600;
		text-align: center;
		align-items: center;
		/* word-break: break-all; */
		justify-content: center;
	}
	.lyric-item-light{
		color: #FFFFFF;
		font-size: 1.5em;
	}
	.footer{
		/* background-image: linear-gradient(to top,rgb(247, 247, 247),rgb(23, 22, 22)); */
		position: relative;
		bottom: 0;
		left: 0;
		right: 0;
		height: 23%;
		display: flex;
		flex-direction: column;
	}
	.song-choice{
		width: 80%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.song-choice>view{
		color: #FFFFFF;
		font-size: 48upx;
		font-weight: 600;
	}
	.progess-bar{
		width: 90%;
		margin: 0upx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.slider{
		width: 76%;
	}
	.progess-bar>view:nth-child(1){
		width: 12%;
		color: #FFFFFF;
	}
	.progess-bar>view:nth-child(3){
		width: 12%;
		color: #FFFFFF;
	}
	.player{
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: 40upx;
	}
	.player>view:nth-child(1){
		margin-left: 30upx;
		color: #FFFFFF;
		font-size: 45upx;
	}
	.player>view:nth-child(3){
		margin-right: 30upx;
		color: #FFFFFF;
		font-size: 45upx;
	}
	.player>view:nth-child(2)>view:nth-child(2){
		border: 5upx solid #FFFFFF;
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		margin: 0 45upx;
	}
	.player>view:nth-child(2)>view:nth-child(2)>view{
		color: #FFFFFF;
		font-size: 55upx;
	}
	.player>view:nth-child(2)>view:nth-child(1){
		color: #FFFFFF;
		font-size: 55upx;
	}
	.player>view:nth-child(2)>view:nth-child(3){
		color: #FFFFFF;
		font-size: 55upx;
	}
</style>
