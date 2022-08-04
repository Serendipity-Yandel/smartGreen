<template>
	<view class="container">
	        <view style="margin-top: 30px;">
	            旧密码
	            <view style="background-color: rgb(242,247,251); border-radius: 5px; margin-top: 20px;" >
	                <u-input v-model="oldPsw" type="password" :password-icon="true" placeholder="   请输入旧密码"/>
	            </view>
	        </view>
	        <view style="margin-top: 30px;">
	            新密码
	            <view style="background-color: rgb(242,247,251); border-radius: 5px; margin-top: 20px;" >
	                <u-input v-model="psw" type="password" :password-icon="true" placeholder="   请输入新密码"/>
	            </view>
	        </view>
	        <view style="margin-top: 30px;">
	            再次输入
	            <view style="background-color: rgb(242,247,251); border-radius: 5px; margin-top: 20px; z-index: 1;" >
	                <u-input v-model="confirmPsw" type="password" :password-icon="true" placeholder="   请再次输入密码"/> 
	                
	            </view>
	            
	        </view>
	        <u-button  class="custom" @click="confirm">确定</u-button>
	        <u-toast ref="uToast" />
	    </view>

</template>

<script>
	import api from '../../../common/apiUtil.js'
	    
	    export default {
	        data() {
	            return {
	                confirmPsw: '',
	                psw: '',
	                oldPsw: '',
	            }
	        },
	        
	        methods: {
	            
	            confirm() {
	                if(this.psw == this.confirmPsw) {
	                    let userId = uni.getStorageSync('info').userId;
	   this.$u.put(api.UPDATEPSW + '?oldPassword='+ this.oldPsw + '&newPassword=' + this.psw + '&userId=' + userId).then(res => {
	                        if(res.code == 200) {  
	                            this.$refs.uToast.show({
	                                title: '修改成功',
	                                type: 'success',
	                                url: '/pages/auth/login'
	                            });
	                            
	                        }else {
	                            this.$refs.uToast.show({
	                                title: res.msg,
	                                type: 'error',
	                            });
	                        }
	                    });
	                } else {
	                    this.$refs.uToast.show({
	                        title: '两次密码不一致请重新输入',
	                        type: 'error',
	                    });
	                }
	            },
	        
	        }
	    }

</script>

<style>
.custom {
        margin-top: 30px;
        color: white;
        background-color: rgb(41, 132, 248);
        width: 95%;
    }
    
    .container {
        margin: 0 12px 0 12px;
        font-size: 14px;
        line-height: 24px;
    }

</style>
