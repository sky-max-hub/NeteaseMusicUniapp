<template>
	<view class="parent">
		<top-tab-bar @showSideDrawer="showSideDrawer" @topTabBar="topTabBar" :topTabIndex="topTabIndex"></top-tab-bar>
		
		<scroll-view class="test-border content-item">
			<swiper style="height: 100%;" :current="swiperItemIndex" @change="changeSwiperItem">
				<swiper-item>
					<wyy-mine :user_info="user_info"></wyy-mine>
				</swiper-item>
				<swiper-item>
					<wyy-find></wyy-find>
				</swiper-item>
				<swiper-item>
					<wyyYun></wyyYun>
				</swiper-item>
			</swiper>
		</scroll-view>
		<uni-drawer ref="sideDrawer" :width="drawerWidth" mode="left">
			<side-drawer-bar :user_info="user_info" @closeLeft="closeLeft"></side-drawer-bar>
		</uni-drawer>
		
		<play-record></play-record>
	</view>
</template>

<script>
	import topTabBar from '@/component/TopTabBar.vue'
	import uniDrawer from '@/component/Uni/UniDrawer.vue'
	import sideDrawerBar from '@/component/SideDrawerBar.vue'
	import wyyMine from '@/component/Mine/WyyMine.vue'
	import playRecord from '@/component/PlayRecord.vue'
	import wyyFind from '@/component/Find/WyyFind.vue'
	import wyyYun from '@/component/Yun/WyyYun.vue'
	import $repeater from '@/utils/repeater.js'
	export default {
		components:{
			topTabBar,
			uniDrawer,
			sideDrawerBar,
			wyyMine,
			playRecord,
			wyyFind,
			wyyYun,
		},
		data() {
			return {
				drawerWidth: 300,
				topTabIndex: 0,
				swiperItemIndex: 0,
				user_info:{
					profile:{}
				}
			}
		},
		created() {
			this.init_user()
		},
		onLoad() {
		},
		onShow(){
			// this.$refs.sideDrawer.open() 
		},
		onBackPress() {
			$repeater.helper.backgrounder();
		},
		methods: {
			//获取用户的基本信息和歌单内容
			init_user() {
				console.log('获取用户资料')
				let uid = this.$store.state.uid;
				console.log('uid:'+uid)
				$repeater.user.get_user_detail(uid, (user_info)=> {
					console.log(user_info)
					this.$store.commit('set_user_info', user_info)
					this.user_info=user_info
				});
				console.log('获取用户各类计数')
				$repeater.user.get_subcount((data)=> {
					console.log(data)
					this.$store.commit('set_subcount', data);
				});
				console.log('获取用户所有喜欢歌曲')
				$repeater.user.get_likelist(uid, (data)=> {
					console.log(data)
					this.$store.commit('set_likelist', data.ids);
				});
			},
			topTabBar(index){
				//console.log(index)
				this.topTabIndex=index
				this.swiperItemIndex=index
			},
			changeSwiperItem(event){
				this.topTabIndex=event.detail.current
				this.swiperItemIndex=event.detail.current
			},
			closeSideDrawer(){
				this.$refs.sideDrawer.close()
			},
			showSideDrawer(){
				this.$refs.sideDrawer.open()
			},
			closeLeft(){
				this.$refs.sideDrawer.close()
			},
		}
	}
</script>

<style scoped>
.parent{
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	background-color: rgb(245,245,245);
}
.content-item{
	width: 100%;
	height: 88%;
}
</style>
