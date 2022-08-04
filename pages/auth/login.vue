	<template>
		
		<view class="registerWrap">
			
		<view class="loginCont">
			<view class="logo">
			<image src="../../static/logo.png" mode="widthFix" style="width: 100px; height: 100px;"></image>
			</view>
		 </view>    
			  
			<view class="title">
				<h3>注册</h3>
				<h4>欢迎使用智慧环保</h4>
			</view>
			
			<view class="formWrap">
				
				<u-radio-group v-model="roleVal" style="margin-bottom:5px;">
					<u-radio name="普通用户">普通用户</u-radio>
					<u-radio name="企业用户">企业用户</u-radio>
				</u-radio-group>
				
				<view class="formItem">
					<view class="label">手机号:</view>
					<view class="inputBox">
						<input type="text" v-model="phoneNum" />
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
				<button type="primary" @click="submitReg">登录</button>
			</view>
			
			<view style="margin-top: 20px;">
				<text style="float: right;" @click="registerGoto()">注册新用户</text>
			</view>

			
		</view>
	</template>
	
	<script>
import api from "../../common/apiUtil.js"	
		export default {
			data(){
				return {
					phoneNum:'',
					nickName:'',
					password:'',
					roleVal:'普通用户'
					
				}
			},
				methods: {
					registerGoto(){
						uni.reLaunch({
							url:'./register'
						})
					},
					submitReg(){
						if(this.phoneNum.length==0){
							uni.showToast({
								title:'请您输入手机号码！',
								icon:'error'
							})
						}else if(this.password.length==0){
							uni.showToast({
								title:'请输入密码！',
								icon:'error'
							})
						}else{
							this.$u.post(api.USER_LOGIN,{
								phoneNum:this.phoneNum,
								password:this.password,
								deptId:this.roleVal=="普通用户"?1:2
							}).then( res =>{
								console.log(res)
									//缓存token
									uni.setStorageSync('token',res.token)
									//获取用户数据
									uni.setStorage({
										key:'token',
										data:res.token,
										success: () => {
										this.getUserInfo();	
										}
									})
							})
						}	
						},
					
					getUserInfo(){
						this.$u.get(api.GET_USER_INFO).then( res =>{
							if(res.code==200){
								uni.setStorageSync('info', res.user);
								console.log(res.user)

								if(this.roleVal=='普通用户'){
										uni.showToast({
											title:'登录成功'
										})
										setTimeout(()=>{
											uni.reLaunch({
												url:'../First/First'
											})
										},1500)
										
								}
							}else{
								uni.showToast({
									title:'res.msg',
									icon:'error'
								})
							}
							
						})
							
				},
		}
	}
				
	</script>
	
	<style lang="scss" scoped>            
		.registerWrap{
			width: 100%;
			box-sizing: border-box;
			padding: 0 40rpx;
			 .loginCont {
			        width: 100%;
			        background-color: #fff;
			        margin-bottom: 20px;
			        overflow: hidden;//清除浮动
			    }
			
			    .logo {
			        width: 30%;
			        margin: 0 auto;
			    }

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
	