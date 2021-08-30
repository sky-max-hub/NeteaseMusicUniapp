<template>
	<view class="player_record flex-v-center">
		<view class="flex-hv-center" @tap="to_play_page()">
			<view class="flex-hv-center" :class="{'record ':playing,
			'record-stop':!playing}">
				<image class="record-image" :src="played.cover_image"></image>
				<view class="overlay"></view>
			</view>	
			<view class="test-border">
				<text style="font-size: 1.1em;">{{played.name}}-{{played.creator}}</text>
			</view>
		</view>
		<view class="flex-hv-center">
			<view class="icon iconfont" :class="{'icon-zanting':playing,
			'icon-bofang':!playing}" @tap="turn($event)"></view>
			<view class="icon iconfont icon-liebiao"></view>
		</view>
	</view>
</template>

<script>
	import $repeater from '../utils/repeater.js'
	export default{
		data() {
			return {
			}
		},
		computed: {
			playing() {
				return this.$store.state.playing;
			},
			played() {
				return this.$store.state.played;
			}
		},
		methods:{
			to_play_page() {
				console.log('跳转到播放器页面')
				$repeater.helper.to('/pages/playlist/play');
			},
			turn(event) {
				//切换播放暂停状态
				event.stopPropagation();
				$repeater.player.turn();
			},
		}
	}
</script>

<style scoped>
	.player_record{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		justify-content: space-between;
		padding: 20upx;
		border-top: 1upx solid rgb(245,245,245);
	}
	.player_record>view:nth-child(1)>view:nth-child(2){
		width: 350upx;
	}
	/* 设置文字的缩略显示 */
	.player_record>view:nth-child(1)>view:nth-child(2)>text{
		color: rgb(70,70,70);
		font-weight: 500;
		margin-left: 20upx;
		font-size: 27upx;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
		width: 80%;
	}
	.player_record>view:nth-child(2)>view:nth-child(1){
		margin-right: 25upx;
		font-size: 60upx;
	}
	.player_record>view:nth-child(2)>view{
		font-size: 50upx;
	}
	.record{
		margin: 20upx;
		background: black;
		border-radius: 50%;
		position: relative;
		animation: spin 10s infinite linear;
	}
	.record-stop{
		margin: 20upx;
		background: black;
		border-radius: 50%;
		position: relative;
	}
	.record-stop::before{
		content: '';
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		width: 100upx;
		height: 100upx;
		background: repeating-radial-gradient(black, black 5px, #1C1C1C 6px, #1C1C1C 7px);
		border-radius: 50%;
	}
	.record::before {
	  content: '';
	  left: 50%;
	  top: 50%;
	  transform: translate(-50%, -50%);
	  position: absolute;
	  width: 100upx;
	  height: 100upx;
	  background: repeating-radial-gradient(black, black 5px, #1C1C1C 6px, #1C1C1C 7px);
	  border-radius: 50%;
	}
	.record-image{
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
	}
	@keyframes spin {
	  0% {
	    transform: none;
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
	.overlay{
	  content: '';
	  position: absolute;
	  width: 100upx;
	  height: 100upx;
	  background: linear-gradient(45deg, transparent, 40%, rgba(255,255,255,0.35), 60%, transparent);
	  border-radius: 50%;
	}
</style>
