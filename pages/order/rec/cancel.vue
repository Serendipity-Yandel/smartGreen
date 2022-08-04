<template>
	<view class="container">
	        <view class="header">
	            <view class="server"></view>
	            <view class="title">订单详情</view>
	            <view class="state">已取消</view>
	        </view>
	
	        <view class="introduce">
	            <view class="imageStyle">
	                <u-image width="80px" border-radius="30" height="80px" :src="baseUrl+orderDtl.coverUrl"></u-image>
	            </view>
	            <view class="attribute">
	                <view class="attributeA">回收类型：{{orderDtl.goodTypeName}}</view>
	                <view class="attributeA">重量：{{orderDtl.goodNumber}}KG</view>
	                <view class="attributeA">预计收入金额：${{orderDtl.orderPrice}}</view>
	            </view>
	        </view>
	        <view class="content">
	            <view>订单编号：{{orderId}}</view>
	            <view>取货方式：上门取货</view>
	            <view>取货时间：{{orderDtl.pickupTime}}</view>
	            <view>取货地址：{{orderDtl.pickupAddress}}</view>
	            <view>备注：{{orderDtl.remark!=null?orderDtl.remark:'暂无'}}</view>
	        </view>
	        
	        <view class="button" >
	            <u-button hover-class="none" @click="gotoFill" :custom-style="cusButton" type="primary">重新下单</u-button>
	        </view>
	    </view>

</template>

<script>
import api from '../../../common/apiUtil.js'
    export default {
        data() {
            return {
                baseUrl: api.SERVER_BASE,
                cusButton: {
                    height: '40px',
                    width: '70%',
                    backgroundColor: 'rgb(0,194,151)'
                },
                orderDtl: {},
                orderId: ''
            }
        },
        onLoad(options) {
            this.getDetails(options.id);
        },
        methods: {
            getDetails(id) {
                this.$u.get(api.ADD_ORDER+'/'+id).then(res => {
                    if(res.code == 200) {
                        let sup_lth = 8 - (res.data.id+'').length;
                        let num_text = res.data.id;
                        this.orderDtl = res.data;
                        for(let i=0;i<sup_lth;i++) {
                            num_text = '0'+num_text
                        }
                        this.orderId = num_text;
                    }
                })
            },
            gotoFill() {
                uni.navigateTo({
                    url: '../../childPages/fillIn'

                })
            }
        }
    }

</script>

<style lang="scss" scoped>

.content {
        font-size: 15px;
        line-height: 30px;
        margin-top: 20px;
        color: #C0C0C0;
    }

    .introduce {
        width: 100%;
        height: 130px;
        margin-top: 20px;
        border-radius: 20px;
        background-color: rgb(0, 194, 151);
        color: white;
        display: flex;
        flex-wrap: wrap;

        .imageStyle {
            margin: 20px;
        }

        .attribute {
            margin: 15px;

            .attributeA {
                margin-top: 10px;
            }
        }
    }
    
    .button {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        border-top: 1px #e6e6e6 solid;
        text-align: center;
        padding: 10px 0;
    }

    .container {
        margin: 15px;
    }

    .state {
        margin-left: 50%;
        font-size: 15px;
        color: red;
    }

    .header {
        display: flex;
        flex-wrap: wrap;
        font-size: 15px;

        .title {
            margin-left: 15px;
        }
    }

    .server {
        width: 5px;
        height: 20px;
        background-color: rgb(0, 194, 151);
    }

</style>
