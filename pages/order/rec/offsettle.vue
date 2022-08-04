<template>
	<view class="container">
	        <view class="header">
	            <view class="server"></view>
	            <view class="title">订单详情</view>
	            <view class="state">待结算</view>
	        </view>
	
	        <view class="introduce">
	            <view class="imageStyle">
	                <u-image width="80px" border-radius="30" height="80px" :src="baseUrl+orderDtl.coverUrl"></u-image>
	            </view>
	            <view class="attribute">
	                <view class="attributeA">回收类型：{{orderDtl.goodTypeName}}</view>
	                <view class="attributeA">重量：{{orderDtl.goodNumber}}kg</view>
	                <view class="attributeA">预计收入金额：${{orderDtl.goodUnitPrice*orderDtl.goodNumber}}</view>
	            </view>
	        </view>
	        <view class="content">
	            <view>订单编号：{{orderId}}</view>
	            <view>取货方式：上门取货</view>
	            <view>取货时间：{{orderDtl.updateTime}}</view>
	            <view>取货地址：{{orderDtl.pickupAddress}}</view>
	            <view>备注：{{orderDtl.remark}}</view>
	        </view>
	
	        <view class="button">
	            <u-button hover-class="none" @click="cancelOrder" :custom-style="cusButton" type="primary">取消订单
	            </u-button>
	        </view>
	
	        <view class="header" style="margin-top: 20px;">
	            <view class="server"></view>
	            <view class="title">回收员信息</view>
	        </view>
	        <view class="peopleStyle">
	            <view class="people">
	                <view class="peopleInfo">
	                    {{riderInfo.nickName}}
	                </view>
	                <view class="peopleInfo">
	                    已回收{{riderOrderTimes}}单
	                </view>
	            </view>
	            <view style="margin-left: 20px;">接单时间：{{orderDtl.updateTime}}</view>
	            <view style="margin-left: 20px;">所属店家：{{orderDtl.companyName}}</view>
	            <view class="peopleFoot">
	                <view class="language" @click="lookLocation">查看位置</view>
	                <view class="language1" @click="call">联系回收员</view>
	            </view>
	        </view>
	        <u-toast ref="uToast"></u-toast>
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
                orderId: '',
                riderInfo: {},
                riderOrderTimes: 0
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
                        this.getRiderInfo(res.data.employeeId);
                        this.getOrderSum(res.data.employeeId);
                    }
                })
            },
            getRiderInfo(id) {
                this.$u.get(api.GET_USER+'/'+id).then(res => {
                    if(res.code == 200) {
                        this.riderInfo = res.data;
                    }
                })
            },
            getOrderSum(id) {
                this.$u.get(api.GET_EMPLOYEE_SUM+id).then(res => {
                    if(res.code == 200) {
                        this.riderOrderTimes = res.data[0].count;
                    }
                })
            },
            cancelOrder() {
                this.$u.put(api.ADD_ORDER,{
                    id: this.orderDtl.id,
                    state: 4
                }).then(res => {
                    if(res.code == 200) {
                        this.$refs.uToast.show({
                            title: '取消成功！',
                            type: 'success',
                            isTab: true,
                            url: '/pages/order'
                        })
                    } else {
                        this.$refs.uToast.show({
                            title: '操作失败！',
                            type: 'error'
                        })
                    }
                })
            },
            lookLocation() {
                uni.navigateTo({
                    url: '/childPages/order/rec/location?id='+this.orderDtl.id
                })
            },
            call() {
                uni.makePhoneCall({
                    phoneNumber: this.riderInfo.phoneNumber
                });
            }
        }
    }

</script>



<style lang="scss" scoped>

.peopleStyle {
        color: white;
        margin-top: 20px;
        background-color: rgb(0, 194, 151);
        border-radius: 20px;
        line-height: 20px;
        font-size: 15px;

        .people {
            margin: 20px;
            display: flex;
            justify-content: space-between;

        }

        .peopleInfo {
            margin-top: 20px;
        }

        .peopleFoot {
            display: flex;
            margin-top: 20px;

            height: 100%;

            .language {
                flex: 1;
                padding-left: 10px;
                border-right-style: solid;
                border-top-style: solid;
                text-align: center;
                padding-top: 2%;
                padding-bottom: 10px;
            }

            .language1 {
                flex: 1;
                padding-top: 2%;
                text-align: center;
                padding-left: 10px;
                border-top-style: solid;
                padding-bottom: 10px;
            }

        }
    }

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
        height: 800px;
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
