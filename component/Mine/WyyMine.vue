<template>
	<scroll-view scroll-y class="mine_scroll_view test-border2">
		<view class="flex-v-center mine_header test-border">
			<view class="flex-hv-center">
				<view class="flex-hv-center">
					<image :src="user_info.profile.avatarUrl"></image>
				</view>
				<view class="flex-hv-center">
					<text style="font-size: 1.1em;">{{user_info.profile.nickname}}</text>
					<view style="font-size: 1em;">
						Lv.{{user_info.level}}
					</view>
				</view>
			</view>
			<view class="flex-hv-center">
				<view class="icon iconfont icon-you"></view>
			</view>
		</view>
		<!--collection-->
		<view class="mine_collection flex-hv-center test-border">
			<block v-for="(items,i) in collectionItem">
				<view class="flex-hv-center">
					<block v-for="(item,index) in items">
						<view>
							<view :class="item.itemClass"></view>
							<text style="font-size: 1.1em;">{{item.itemName}}</text>
						</view>
					</block>
				</view>
			</block>
		</view>
		
		<view @tap="toPlayList(favor.id,favor.name,favor.coverImgUrl)" class="mine_favourite flex-v-center test-border">
			<view class="flex-v-center">
				<view class="test-border flex-hv-center">
					<image :src="favor.coverImgUrl" mode="widthFix"></image>
				</view>
				<view>
					<text style="font-size: 1.1em;">我喜欢的音乐</text>
					<text style="font-size: 1.1em;">{{favor.trackCount}}首</text>
				</view>
			</view>
			<view class="flex-hv-center">
				<image src="../../static/heart_break.png"></image>
				<text style="font-size: 1em;">心动模式</text>
			</view>
		</view>
		<view class="mine_list">
			<view class="flex-v-center" @tap="changeCreateListState">
				<text style="font-size: 1em;">创建歌单({{created_list.length}}个)</text>
				<view class="icon iconfont" :class="{'icon-icon3': createListState,
				'icon-icon4': !createListState}"></view>
			</view>
			<template v-if="createListState">
				<view class="list-header">
					<block v-for="(item,i) in created_list">
						<view @tap="toPlayList(item.id,item.name,item.coverImgUrl)"
						 class="list-item flex-v-center test-border">
							<image :src="item.coverImgUrl"></image>
							<view class="flex-h-center test-border">
								<text style="font-size: 1.1em;">{{item.name}}</text>
								<text style="font-size: 1.1em;">{{item.trackCount}}首</text>
							</view>
						</view>
					</block>
				</view>
			</template>
		</view>
		
		<view class="mine_list">
			<view class="flex-v-center" @tap="changeCollectionListState">
				<text style="font-size: 1em;">收藏歌单({{collect_list.length}}个)</text>
				<view class="icon iconfont" :class="{'icon-icon3': collectionListState,
				'icon-icon4': !collectionListState}"></view>
			</view>
			<template v-if="collectionListState">
				<view class="list-header">
					<block v-for="(item,i) in collect_list">
						<view @tap="toPlayList(item.id,item.name,item.coverImgUrl)"
						class="list-item flex-v-center test-border">
							<image :src="item.coverImgUrl"></image>
							<view class="flex-h-center test-border">
								<text style="font-size: 1.1em;">{{item.name}}</text>
								<text style="font-size: 1.1em;">{{item.trackCount}}首</text>
							</view>
						</view>
					</block>
				</view>
			</template>
		</view>
		<seize-view style="margin-top: 150upx;"></seize-view>
	</scroll-view>
</template>

<script>
	import seizeView from '../SeizeView.vue'
	import $repeater from '../../utils/repeater.js'
	export default {
		props:{
			user_info:Object,
		},
		components:{
			seizeView,
		},
		data() {
			return {
				createListState: true,
				collectionListState: true,
				collectionItem:[
					[
						{
							itemName:'本地/下载',
							itemClass:'icon iconfont icon-yinlegedanyinfu'
						},
						{
							itemName:'云盘',
							itemClass:'icon iconfont icon-shangchuanyunpan'
						},
						{
							itemName:'已购',
							itemClass:'icon iconfont icon-shangchengshounaxiang'
						},
						{
							itemName:'最近播放',
							itemClass:'icon iconfont icon-bofang'
						},
					],
					[
						{
							itemName:'我的好友',
							itemClass:'icon iconfont icon-shouyediqiu'
						},
						{
							itemName:'收藏和赞',
							itemClass:'icon iconfont icon-shoucangwujiaoxing'
						},
						{
							itemName:'我的博客',
							itemClass:'icon iconfont icon-lianmaiyinleermai'
						},
						{
							itemName:'通知',
							itemClass:'icon iconfont icon-tongzhi'
						},
					]
				],
				created_list:[],
				collect_list:[],
				favor:{},
			}
		},
		computed:{
			subcount: function() {
				return this.$store.state.subcount;
			},
			uid: function() {
				return this.$store.state.uid;
			},
		},
		onLoad() {
		},
		created() {
			console.log(this.uid)
			this.get_playlist()
		},
		methods: {
			changeCreateListState(){
				this.createListState=!this.createListState
			},
			changeCollectionListState(){
				this.collectionListState=!this.collectionListState
			},
			get_playlist() {
				console.log('获取用户的歌单情况')
				$repeater.user.get_playlist(this.uid, (data)=> {
					let playlist = data.playlist;
					let created_list = [], favor_list = [];
					console.log('获取到的歌单数据')
					console.log(playlist)
					playlist.forEach((item)=> {
						item.subscribed && favor_list.push(item) || created_list.push(item)
					})
					this.created_list = created_list;
					this.collect_list = favor_list;
					this.favor=created_list[0]
					this.created_list.splice(0,1)
					console.log(this.created_list)
					console.log(this.favor)
					console.log(this.collect_list)
				});
			},
			toPlayList(id,name,coverImgUrl){
				console.log('传入的ID是'+id)
				uni.navigateTo({
				    url: '/pages/playlist/playlist?playlist_id='+ id + '&cover_image=' + coverImgUrl+ '&name=' + name,
					animationType: 'fade-in'
				})
			},
		}
	}
</script>

<style scoped>
	.mine_scroll_view{
		width: 100%;
		height: 100%;
	}
	.mine_header{
		justify-content: space-between;
		width: 90%;
		margin: 0 auto;
		padding: 0 20upx;
	}
/* 	.mine_header:active{
		background-color: #d3d3d3;
	} */
	.mine_header>view:nth-child(1)>view:nth-child(1)>image{
		width: 110upx;
		height: 110upx;
		border-radius: 50%;
		border: #FFFFFF 5upx solid;
		margin: 20upx;
	}
	.mine_header>view:nth-child(1)>view:nth-child(2){
		flex-direction: column;
	}
	.mine_header>view:nth-child(1)>view:nth-child(2)>text{
		font-size: 35upx;
		font-weight: bold;
	}
	.mine_header>view:nth-child(1)>view:nth-child(2)>view{
		border-radius: 30%;
		background-color: #FFFFFF;
		padding: 5upx 15upx;
		font-size: 20upx;
		color: rgb(26,26,26);
	}
	.mine_header>view:nth-child(2)>view:nth-child(1){
		color: rgb(26,26,26);
		font-size: 35upx;
		margin: 10upx;
		font-weight: bold;
	}
	.mine_collection{
		width: 90%;
		margin: 20upx auto;
		padding: 20upx;
		background-color: #FFFFFF;
		border-radius: 25upx;
		flex-direction: column;
	}
	.mine_collection>view{
		width: 100%;
		margin-bottom: 10upx;
	}
	.mine_collection>view>view{
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
/* 	.mine_collection>view>view:active{
		background-color: #d3d3d3;
	} */
	.mine_collection>view>view>view{
		font-size: 66upx;
		background-image: linear-gradient(45deg,rgb(255,58,58),rgb(255,69,69),rgb(255,75,75),rgb(255,125,125),rgb(255,141,141),rgb(255,255,255));
		-webkit-background-clip: text;
		color:transparent;
	}
	.mine_collection>view>view>text{
		color: rgb(106,106,106);
		margin-top: -15upx;
		font-size: 28upx;
	}
	.mine_favourite{
		justify-content: space-between;
		width: 90%;
		margin: 30upx auto;
		background-color: #FFFFFF;
		padding: 20upx;
		border-radius: 25upx;
	}
	.mine_favourite:active{
		background-color: #d3d3d3;
	}
	.mine_favourite>view:nth-child(1)>view:nth-child(1){
		position: relative;
		margin: 10upx;
	}
	.mine_favourite>view:nth-child(1)>view:nth-child(1)>image{
		width: 105upx;
		height: 105upx;
		border-radius: 20upx;
		box-shadow: 0upx -10upx 5upx rgb(242, 242, 242);
	}
	.mine_favourite>view:nth-child(1)>view:nth-child(1)>view:nth-child(2){
		border-radius: 30upx;
		position: absolute;
		bottom: 0;
		top: 0;
		right: 0;
		left: 0;
		background-color: rgb(0,0,0,0.5);
	}
	.mine_favourite>view:nth-child(1)>view:nth-child(1)>view:nth-child(2)>view{
		color: #FFFFFF;
		font-size: 45upx;
		
	}
	.mine_favourite>view:nth-child(1)>view:nth-child(2){
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-left: 20upx;
	}
	.mine_favourite>view:nth-child(1)>view:nth-child(2)>text:nth-child(1){
		font-size: 28upx;
		color: rgb(49,49,49);
		font-weight: 450;
	}
	.mine_favourite>view:nth-child(1)>view:nth-child(2)>text:nth-child(2){
		font-size: 24upx;
		color: rgb(153,153,153);
	}
	.mine_favourite>view:nth-child(2){
		border: rgb(231,231,231) 1upx solid;
		border-radius: 40upx;
		padding: 10upx 20upx;
	}
	.mine_favourite>view:nth-child(2)>image{
		width: 50upx;
		height: 50upx;
		margin-right: 10upx;
	}
	.mine_favourite>view:nth-child(2)>text{
		color: rgb(51,51,51);
		font-size: 23upx;
		font-weight: 400;
	}
	.mine_list{
		background-color: #FFFFFF;
		border-radius: 25upx;
		padding: 20upx;
		width: 90%;
		margin: 30upx auto;
	}
	.mine_list>view:nth-child(1){
		justify-content: space-between;
		padding: 10upx 20upx;
		font-size: 28upx;
		color: rgb(153,153,153);
	}
	.list-item{
		padding: 10upx;
	}
	.list-item:active{
		background-color: #d3d3d3;
	}
	.list-item>image{
		width: 105upx;
		height: 105upx;
		border-radius: 20upx;
		margin-right: 20upx;
		box-shadow: 0upx -10upx 5upx rgb(242, 242, 242);
	}
	.list-item>view{
		flex-direction: column;
		align-items: flex-start;
		margin-left: 10upx;
	}
	.list-item>view>text:nth-child(1){
		font-size: 28upx;
		color: rgb(49,49,49);
		font-weight: 600;
	}
	.list-item>view>text:nth-child(2){
		font-size: 24upx;
		font-weight: 400;
		color: rgb(153,153,153);
	}
</style>
