<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="number"
					maxlength="11"
					placeholder="手机号"
					:focus="isFocus"
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-shoujihao"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="20"
					placeholder="密码"
					isShowPass
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-mima"
				></wInput>
			</view>
			<wButton 
				class="wbutton"
				text="登 录"
				:rotate="isRotate" 
				@click="startLogin"
				bgColor="rgb(255, 58, 58)"
			></wButton>
						
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate" style="font-size: 1em;">忘记密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate" style="font-size: 1em;">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '@/component/WatchLogin/WatchInput.vue' //input
	import wButton from '@/component/WatchLogin/WatchButton.vue' //button
	import logo from '@/static/logo.png'
	import user from '../../model/user.js'
	import $repeater from '../../utils/repeater.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: logo,
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
				isFocus: true // 是否聚焦
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			login(phone,password){
				$repeater.user.check_phone(phone,(res)=>{
					console.log(res);
					if (res.exist == 1||res.exist ==2 ) {
						console.log('账号存在');
						$repeater.user.login(phone,password,(res)=>{
							console.log("登录返回的数据为")
							console.log(res)
							if (res){
								let uid = res.profile.userId;
								this.$store.commit('login', uid);
								$repeater.storage.setPhone(phone);
								$repeater.storage.setPassword(password);
								$repeater.helper.toast('none', '登录成功', 3000, false, 'bottom');
								uni.redirectTo({
									url: '../index/index',
								});
							}else {
								$repeater.helper.toast('none', '登录失败,请重试', 3000, false, 'bottom');
							}
						})
					} else if (res.exist == -1) {
						console.log('账号不存在');
						$repeater.helper.toast('none', '手机号还未注册', 3000, false, 'bottom');
						$repeater.helper.to('./register?phone='+phone)
					} else {
						setTimeout(function() {
							$repeater.helper.toast('none', res.msg, 2000, false, 'bottom');
						}, 0);
					}
				})
			},
		    startLogin(e){
                console.log(e)
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.passData.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				console.log("发送登录和检查请求")
				
				this.login(this.phoneData.trim(),this.passData.trim());
		    }
		}
	}
</script>

<style scoped>
	.login{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
		/* margin-top: 128rpx; */
	}
	
	/* 头部 logo */
	.header {
		width:161rpx;
		height:161rpx;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		border-radius:50%;
		background-color: #f02a25; 
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161rpx;
		height:161rpx;
		border-radius:50%;
	}
	
	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}
	.tips {
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}
	
	/* 登录按钮 */
	.wbutton{
		margin-top: 96rpx;
	}
	
	/* 其他登录方式 */
	.other_login{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 256rpx;
		text-align: center;
	}
	.login_icon{
		border: none;
		font-size: 64rpx;
		margin: 0 64rpx 0 64rpx;
		color: rgba(0,0,0,0.7)
	}
	.wechat_color{
		color: #83DC42;
	}
	.weibo_color{
		color: #F9221D;
	}
	.github_color{
		color: #24292E;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-bottom: 20%;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}
	.footer text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
