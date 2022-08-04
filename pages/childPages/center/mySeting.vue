<template>
	<view class="container">
	        <view class="mylist" @click="goto(1)">
	            <text class="myfont">更改手机号</text><u-icon style="float: right;" name="arrow-right"></u-icon>
	        </view>
	        <u-line color="#E6E6E6" />
	        <view class="mylist" @click="goto(2)">
	            <text class="myfont">修改密码</text><u-icon style="float: right;" name="arrow-right"></u-icon>
	        </view>
	        <u-line color="#E6E6E6" />
	        
	        <u-line color="#E6E6E6" />
	        
	        <u-line color="#E6E6E6" />
	        <u-button :custom-style="cuStyle" @click="logout">退出登录</u-button>
	    </view>

</template>

<script>
	export default {
	        data() {
	            return {
	                cuStyle: {
	                    marginTop: '20px'
	                }
	            }
	        },
	        
	        
	        methods: {
	            
	            logout() {
	                uni.removeStorageSync('info');
	                uni.removeStorageSync('token');
	                // uni.setStorageSync('settingIP', uni.getStorageSync('ipconfig'));
	                // uni.removeStorageSync('ipconfig');
	                uni.navigateTo({
	                    url: '/pages/login'
	                });
	            },
	            
	            goto(id) {
	                switch(id) {
	                    case 1: uni.navigateTo({
	                        url: 'updatePhone'
	                    });break;
	                    case 2: uni.navigateTo({
	                        url: 'updatePsw'
	                    });break;
	                }
	            }
	        }
	    }

</script>

<style>
.container {
        margin: 0 12px 0 12px;
        font-size: 14px;
        line-height: 24px;
    }
    
    .mylist {
        margin: 20px 12px 12px 12px;
        font-size: 16px;
    }

</style>
