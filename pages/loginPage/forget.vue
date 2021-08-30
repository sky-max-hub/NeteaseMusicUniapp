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
					v-model="passData1"
					type="password"
					maxlength="20"
					placeholder="修改密码"
					isShowPass
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-mima"
				></wInput>
				<wInput
					v-model="passData2"
					type="password"
					maxlength="20"
					placeholder="确认密码"
					isShowPass
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-mima"
				></wInput>
				<wInput
					:isShowLeftIcon="true"
					iconClass="icon iconfont icon-yanzhengma"
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					isShowCode
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			<wButton 
				class="wbutton"
				text="修改密码"
				:rotate="isRotate" 
				@click="startLogin"
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
				logoImage: '../../static/logo.png',
				phoneData:'', //用户/电话
				passData1:'', //修改密码
				passData2: '',//确认密码
				verCode:'',
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
		    startLogin(e){
				if (this.phoneData.length !=11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return;
				}
		        if (this.passData1.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				if(this.passData1!=this.passData2){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '两次输入的密码不一致'
					});
					return;
				}
				if(this.verCode.length!=4){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '验证码不正确'
					});
					return;
				}
				console.log("发去修改密码请求")
				let phone = this.phoneData
				let password = this.passData1
				let verCodes = this.verCode
				$repeater.user.reg(phone,password,verCodes,(res)=>{
					console.log(res)
					if(res.code==200){
						$repeater.helper.toast('none', '修改密码成功', 3000, false, 'bottom');
					}else{
						$repeater.helper.toast('none', '修改失败', 3000, false, 'bottom');
					}
				})
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
		margin-top: 16rpx;
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
