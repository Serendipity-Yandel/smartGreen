<template>
	<view class="registerWrap">
		
		<view class="title">
			<h3>注册</h3>
			<h4>欢迎使用智慧环保</h4>
		</view>
		
		<view class="formWrap">
			
			<view class="formItem">
				<view class="label">手机号:</view>
				<view class="inputBox">
					<input type="text" v-model="phoneNum" />
				</view>
				
			</view>
			<view class="formItem">
				<view class="label">昵称:</view>
				<view class="inputBox">
					<input type="text" v-model="nickName"/>
				</view>
				
			</view>
			<view class="formItem">
				<view class="label">密码:</view>
				<view class="inputBox">
					<input password="true" v-model="password"/>
				</view>
				
			</view>
		</view>
		<view >
			<button type="primary" @click="submitReg">注册</button>
		</view>
		<navigator>
			<u-toast ref="uToast" />
			<view class="registTips" @click="gotoLogin">已有账号，立即登录</view>
		</navigator>
		
	</view>
</template>

<script>

	export default {
		data(){
			return {
				phoneNum:'',
				nickName:'',
				password:'',
				
				
			}
		},
			methods: {
				gotoLogin(){
					uni.navigateTo({
						url:'./login'
					})
				},
				submitReg(){
					console.log(this.$api.USER_REGISTER)//直接拿api接口地址
					if(this.phoneNum.length==0){
						uni.showToast({
							title:'请您输入手机号码！',
							icon:'error'
						})
					}
					else if(this.nickName.length==0){
						uni.showToast({
							title:'请输入昵称！',
							icon:'error'
						})
						
					}
					else if(this.password.length==0){
						uni.showToast({
							title:'请输入密码！',
							icon:'error'
						})
					}else{
						this.$u.post(this.$api.USER_REGISTER,{
							userName:this.phoneNum,
							password:this.password,
							nickName:this.nickName,
							deptId:1
						}).then( res =>{
							console.log(res)
							if(res.code==200) {
								uni.showToast({
									title:'注册成功'
								})
								setTimeout(()=>{
									this.$u.route({
									type:'reLaunch',
									url:'pages/auth/login',
									})
								},1500)
							}
							
						})
					}
				}
			}
			
		
	}
</script>

<style lang="scss" scoped>
	.registerWrap{
		width: 100%;
		box-sizing: border-box;
		padding: 0 40rpx;
	}
	.title{
		padding-top: 60rpx;
	}
	.title h3{
		font-size: 24px;
		line-height: 40px;
		color: #333;
	}
	.title h4{
		font-size: 18px;
		color: #888;
	}
	.formWrap{
		margin-top: 20px;
	}
	.formItem{
		padding-bottom: 15px;
		.label{
			
			font-size: 14px;
			color: #333;
		}
		.inputBox{
			margin-top: 5px;
			border: 1px #c3c3c3 solid;
			border-radius: 8px;
			
		}
		.inputBox input {
				height: 38px;
				line-height: 38px;
				text-indent: 1em ;
			
		}
	}
	.registTips{
		padding-top: 20px;
		text-align: center;
	}
	
</style>
