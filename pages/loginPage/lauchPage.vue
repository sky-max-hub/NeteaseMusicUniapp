<template>
	<view class="login-container">
		<view class="test-border">
			<view class="test-border">
				<view class="test-border flex-hv-center">
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<template v-if="!isLogin">
			<view class="test-border animated fadeInUp">
				<view class="test-border">
					<button @tap="toLogin()">手机登录</button>
					<button @tap="toRegister()">注册账号</button>
				</view>
				<view class="test-border">
					<view @tap="info()"  class="icon iconfont icon-weixin"></view>
					<view @tap="info()" class="icon iconfont icon-qq"></view>
					<view @tap="info()" class="icon iconfont icon-xinlangweibo"></view>
					<view @tap="info()" class="icon iconfont icon-youxiang"></view>
				</view>
				<view class="test-border">
					<checkbox color="#f8d6d3" @tap="changeBox()" :checked="isReader" value="用户协议" /><text style="font-size: 1.1em;">同意</text>
					<text style="font-size: 1.1em;">《用户协议》</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import $repeater from '../../utils/repeater.js'
	export default {
		data() {
			return {
				isLogin:false,
				isReader: false,
			}
		},
		created(){
			this.check_login();
		},
		methods: {
			info(){
				$repeater.helper.toast('none', '目前只支持手机号登陆', 3000, false, 'bottom');
			},
			changeBox(value){
				console.log('点击')
				this.isReader = !this.isReader
			},
			toLogin(){
				console.log(this.isReader)
				if(!this.isReader){
					$repeater.helper.toast('none', '请先点击确认用户协议', 3000, false, 'bottom');
					return;
				}
				uni.navigateTo({
					url: '/pages/loginPage/login',
				});
				
			},
			toRegister(){
				console.log(this.isReader)
				if(!this.isReader){
					$repeater.helper.toast('none', '请先点击确认用户协议', 3000, false, 'bottom');
					return;
				}
				uni.navigateTo({
					url: '/pages/loginPage/register',
				});
			},
			check_login() {
				if($repeater.storage.is_login()){
					//之前有登陆过再次进行登陆
					let phone=$repeater.storage.getPhone();
					let password=$repeater.storage.getPassword();
					$repeater.user.login(phone,password,(res)=>{
						console.log("登录返回的数据为")
						console.log(res)
						if (res){
							let uid = res.profile.userId;
							this.$store.commit('login', uid);
							$repeater.helper.toast('none', '登录成功', 3000, false, 'bottom');
							uni.redirectTo({
								url: '../index/index',
							});
						}else {
							$repeater.helper.toast('none', '登录失败,请重试', 3000, false, 'bottom');
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.login-container{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgb(219,44,31);
	}
	.login-container>view:nth-child(1){
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.login-container>view:nth-child(1)>view:nth-child(1){
		border: 1upx solid rgb(233, 128, 121);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5%;
		animation: logo-image 3s infinite;
	}
	.login-container>view:nth-child(1)>view:nth-child(1)>view{
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		background-color: #f02a25;
		border: 1upx solid rgb(240, 42, 37);
/* 		box-shadow: 10upx 0upx 2upx rgb(166, 56, 34,0.3),0upx 10upx 2upx rgb(166, 56, 34,0.3),
		-10upx 0upx 2upx rgb(166, 56, 34,0.3),0upx -10upx 2upx rgb(166, 56, 34,0.3); */
	}
	.login-container>view:nth-child(1)>view:nth-child(1)>view>image{
		width: 180upx;
		height: 180upx;
	}
	.login-container>view:nth-child(2){
		margin-top: 25upx;
		width: 100%;
		height: 35%;
	}
	.login-container>view:nth-child(2)>view:nth-child(1){
		width: 75%;
		margin: 0 auto;
	}
	.login-container>view:nth-child(2)>view:nth-child(1)>button:nth-child(1){
		color: rgb(219,44,31);
		background-color: #FFFFFF;
		padding: 10upx 0;
		border-radius: 40upx;
		font-size: 30upx;
	}
	.login-container>view:nth-child(2)>view:nth-child(1)>button:nth-child(2){
		color: #FFFFFF;
		font-size: 30upx;
		margin-top: 5%;
		padding: 10upx 0;
		background-color: rgb(219,44,31);
		border-radius: 40upx;
		border: 1upx solid rgb(248, 214, 211);
	}
	.login-container>view:nth-child(2)>view:nth-child(2){
		width: 75%;
		justify-content: space-between;
		margin: 8% auto;
		margin-bottom: 5%;
		display: flex;
	}
	.login-container>view:nth-child(2)>view:nth-child(2)>view{
		border: 1upx solid rgb(233, 128, 121);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(248, 214, 211);
		font-size: 40upx;
		width: 80upx;
		height: 80upx;
	}
	.login-container>view:nth-child(2)>view:nth-child(3){
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login-container>view:nth-child(2)>view:nth-child(3)>checkbox{
		transform: scale(0.38);
	}
	.login-container>view:nth-child(2)>view:nth-child(3)>text:nth-child(2){
		font-size: 10upx;
		color: rgb(233, 128, 121);
	}
	.login-container>view:nth-child(2)>view:nth-child(3)>text:nth-child(3){
		font-size: 10upx;
		color: rgb(248, 214, 211);
	} 
	@keyframes logo-image{
	    0%{
	        padding: 5%;
			border: 1upx solid rgb(233, 128, 121,0.8);
	    }
		100%{
			padding: 30%;
			border: 1upx solid rgb(233, 128, 121,0);
		}
	 }
</style>
