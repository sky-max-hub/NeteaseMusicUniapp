<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-shoujihao"
					v-model="phoneData"
					type="number"
					maxlength="11"
					placeholder="手机号"
					:focus="isFocus"
				></wInput>
				<wInput
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-mima"
					v-model="passData"
					type="password"
					maxlength="20"
					placeholder="登录密码"
					isShowPass
				></wInput>
				<wInput
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-yanzhengma"
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="验证码"
					isShowCode
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
					
			</view>
				
			<wButton 
				class="wbutton"
				text="注 册"
				:rotate="isRotate" 
				@click.native="startReg()"
				bgColor="rgb(255, 58, 58)"
			></wButton>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '@/component/WatchLogin/WatchInput.vue' //input
	import wButton from '@/component/WatchLogin/WatchButton.vue' //button
	import $repeater from '@/utils/repeater.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '/static/logo.png',
				phoneData:'', // 用户/电话
				passData:'', //密码
				verCode: '', //验证码
				isRotate: false, //是否加载旋转
				isFocus: true
			}
		},
		components:{
			wInput,
			wButton,
		},
		onLoad(options) {
			this.phoneData = options.phone || '';
		},
		mounted() {
			_this= this;
		},
		methods: {
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				console.log("获取验证码")
				let phone = this.phoneData
				$repeater.user.send_captcha(phone,(res)=>{
					console.log(res)
					if(res.code==200){
						$repeater.helper.toast('none', '发送验证码成功', 3000, false, 'bottom');
						_this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
					}else{
						$repeater.helper.toast('none', res.message, 3000, false, 'bottom');
					}
				})
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
				},60000)
			},
		    startReg() {
				//注册
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length !=11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
		        if (this.passData.length < 6) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return false;
		        }
				if (this.verCode.length != 4) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				console.log("发送注册请求")
				let phone = this.phoneData
				let password = this.passData
				let verCodes = this.verCode
				$repeater.user.reg(phone,password,verCodes,(res)=>{
					console.log(res)
					if(res.code==200){
						$repeater.helper.toast('none', '注册成功', 3000, false, 'bottom');
					}else{
						$repeater.helper.toast('none', '注册失败,', 3000, false, 'bottom');
					}
				})
		    }
		}
	}
</script>

<style scoped>
	.register{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
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
		margin-top: 60rpx;
		margin-bottom: 25%;
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