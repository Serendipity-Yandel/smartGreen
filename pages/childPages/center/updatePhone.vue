<template>
	<view class="container">
	        <view style="margin-top: 30px;">
	            新的手机号码:
	            <view style="background-color: rgb(242,247,251); border-radius: 5px; margin-top: 20px;" >
	                <u-input v-model="phoneNum" placeholder="+ 86 | 请输入您要修改的手机号"/>
	            </view>
	        </view>
	        <view style="margin-top: 30px;">
	            验证码:
	            <view style="background-color: rgb(242,247,251); border-radius: 5px; margin-top: 20px; z-index: 1;" >
	                <u-input v-model="codeNum" placeholder="   请输入验证码"/> 
	                
	            </view>
	            
	        </view>
	        <text  style="float: right; margin-top: -9%; color: #2B85E4; margin-right: 10px; z-index: 9999;" >
	            <u-button size="mini" @click="getCode">获取验证码</u-button></text>
	        <u-button  class="custom" @click="confirm">确定</u-button>
	        <u-toast ref="uToast" />
	    </view>

</template>

<script>
	import api from '../../../common/apiUtil.js'
	    
	    export default {
	        data() {
	            return {
	                phoneNum: '',
	                codeNum: '',
	            }
	        },
	        
	        methods: {
	            
	            confirm() {
	                let userObj = uni.getStorageSync('info');
	                
	                this.$u.put(api.UPDATEPHONE,{
	                    otp:this.codeNum,
	                    phonenumber:this.phoneNum,
	                    userId: userObj.userId,
	                }).then(res => {
	                    if(res.code == 200) {
	                        this.$refs.uToast.show({
	                            title: '修改成功',
	                            type: 'success',
	                            url: '/pages/login'
	                        });
	                    } else {
	                        this.$refs.uToast.show({
	                            title: res.msg,
	                            type: 'error',
	                        });
	                    }
	                });
	            },
	            getCode() {
	                if(this.phoneNum.length==11) {
	                    this.$u.get(api.GET_CODE,{
	                        mobile:this.phoneNum,
	                    }).then(res => {
	                        if(res.code == 200) {
	                            this.codeNum = res.data.otp;
	                        }
	                        
	                    });
	                } else {
	                    this.$refs.uToast.show({
	                        title: '请先输入正确手机号',
	                        type: 'warning',
	                    });
	                }
	            }
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
