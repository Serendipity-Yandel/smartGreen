<template>
	<view class="container">
	        <view class="header">
	            <view class="server"></view>
	            <view class="title">订单详情</view>
	            <view class="state">已完成</view>
	        </view>
	
	        <view class="introduce">
	            <view class="imageStyle">
	                <u-image width="80px" border-radius="30" height="80px" :src="baseUrl+orderDtl.coverUrl"></u-image>
	            </view>
	            <view class="attribute">
	                <view class="attributeA">回收类型：{{orderDtl.goodTypeName}}</view>
	                <view class="attributeA">重量：{{orderDtl.goodNumber}}kg</view>
	                <view class="attributeA">收入金额：￥{{orderDtl.orderPrice}}</view>
	            </view>
	        </view>
	        <view class="content">
	            <view>订单编号：{{orderId}}</view>
	            <view v-if="orderDtl.channel==1">取货方式：上门取货</view>
	            <view v-if="orderDtl.channel==1">取货时间：{{orderDtl.updateTime}}</view>
	            <view v-if="orderDtl.channel==1">取货地址：{{orderDtl.pickupAddress}}</view>
	            <view v-if="orderDtl.channel==1">备注：{{orderDtl.remark!=null?orderDtl.remark:'暂无'}}</view>
	        </view>
	
	        <view class="button" v-if="orderDtl.channel==1">
	            <u-button :disabled="Boolean(orderDtl.isScore)" hover-class="none" @click="evaluate" :custom-style="cusButton" type="primary">{{orderDtl.isScore?'已评价':'评价'}}</u-button>
	        </view>
	
	        <view class="header" style="margin-top: 20px;">
	            <view class="server"></view>
	            <view class="title">回收{{orderDtl.channel==1?'员':'机'}}信息</view>
	        </view>
	        <view class="peopleStyle" v-if="orderDtl.channel==1">
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
	        <view class="storelist" v-else>
	            <view class="storeItem">
	                <view class="storeInfo">
	                    <view class="itemTop">
	                        <text class="itemName">{{orderDtl.companyName}}</text>
	                    </view>
	                    <view class="address">{{orderDtl.pickupAddress}}</view>
	                </view>
	            </view>
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
                src: 'https://imgnews.gmw.cn/attachement/jpg/site2/20200704/f44d305ea0d82069d85212.jpg',
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
                        if(res.data.channel==1) {
                            this.getRiderInfo(res.data.employeeId);
                            this.getOrderSum(res.data.employeeId);
                        }
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
            evaluate() {
                if(this.orderDtl.isScore) {
                    return false
                } else {
                    this.$u.route({
                        url: '/childPages/order/score?id='+this.orderDtl.id
                    })
                }
            },
            lookLocation() {
                uni.navigateTo({
                    url: '/childPages/order/rec/location'
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

<style>
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
    
    .storelist{
        max-height: calc(35vh - 50px);
        margin: 0 auto;
        overflow-y: auto;
        .storeItem{
            width: 100%;
            padding-top: 10px;
            margin-bottom: 20px;
            border-bottom: 1upx #e6e6e6 solid;
            display: flex;
            &:last-child{
                margin-bottom: 0;
            }
            .storePic{
                flex: 1.2;
                image{
                    width: 100%;
                    border-radius: 5px;
                }
            }
            .storeInfo{
                // margin-left: 10px;
                // width: calc(100% - 100px);
                .itemTop{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .itemName{
                        width: 66%;
                        font-size: 16px;
                        font-weight: 600;
                        color: #333;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .distance{
                        color: $uni-text-color-grey;
                        font-size: 12px;
                    }
                }
                .address{
                    width: 100%;
                    font-size: 14px;
                    color: #333;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    text-overflow: ellipsis;
                    padding-top: 8px;
                }
                .business{
                    width: 60px;
                    .uni-tag{
                        padding: 0 6px;
                        height: 24px;
                        font-size: 14px;
                        line-height: 24px;
                    }
                }
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
