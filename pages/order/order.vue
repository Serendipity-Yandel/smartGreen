<template>
<view>
    <view class="wrap">
        <view class="u-tabs-box">
            <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change"
                :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
        </view>
        <swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
            @animationfinish="animationfinish">
            <swiper-item class="swiper-item">
                <scroll-view scroll-y style="height: 100%;width: 100%;">
                    <view class="page-box">
                        <template v-if="dataList.length>0">
				<view class="order" v-for="(res, index) in dataList" 
				:key="res.id" @click="gotoDetail('/childPages/order/rec/waiting?id=',res.id)">
                            <view class="top" @click="gotowaiting">
                                <view class="left">
                <view class="store">已等待：{{$u.timeFrom(getUnixTime(res.createTime), 'hh时MM分ss秒')}}</view>
                                </view>
                                <view class="right">待接单</view>
                            </view>
                            <view class="item">
                                <view class="left">
                                    <image :src="baseUrl+res.coverUrl" mode="aspectFill"></image>
                                </view>
                                <view class="content">
                                    <view class="title u-line-2">回收类型：{{res.goodTypeName}}</view>
                                    <view class="type">重量：{{res.goodNumber}}kg</view>
                                    <view class="type">预计收入金额：￥ {{res.goodNumber*res.goodUnitPrice}}</view>
                                    <view class="type">取货方式：上门取货 {{res.pickupTime}}</view>
                                </view>
                            </view>
                            <view class="bottom">
                                <view class="more">
                                    <u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
                                </view>
                                <view class="evaluate btn" @click.stop="cancelOrder(res.id)">取消订单</view>
                            </view>
                        </view>
                        </template>
                        <template v-else>
                            <view class="centre">
                                <image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
                                </image>
                                <view class="explain">
                                    您还没有相关的订单
                                </view>
                            </view>
                        </template>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view scroll-y style="height: 100%;width: 100%;">
                    <view class="page-box">
                        <template v-if="dataList.length>0">
                        <view class="order" v-for="(res, index) in  dataList" :key="res.id" @click="gotoDetail('/childPages/order/rec/offsettle?id=',res.id)">
                        <view class="top">
                            <view class="left">
                                <view class="store">{{ res.companyName }}</view>
                                <view class="address">{{res.pickupAddress}}</view>
                            </view>
                            <view class="right">待结算</view>
                        </view>
                        <view class="item">
                            <view class="left">
                                <image :src="baseUrl+res.coverUrl" mode="aspectFill"></image>
                            </view>
                            <view class="content">
                                <view class="title u-line-2">回收类型：{{res.goodTypeName}}</view>
                                <view class="type">重量：{{res.goodNumber}}kg</view>
                                <view class="type">预计收入金额：￥ {{res.goodNumber*res.goodUnitPrice}}</view>
                                <view class="type">取货方式：上门取货{{res.pickupTime}}</view>
                            </view>
                        </view>
                        <view class="bottom">
                            <view class="more" @click.stop="call(res.contact)">
                                <u-icon name="phone-fill" color="rgb(203,203,203)"></u-icon>
                                <text>联系店家</text>
                            </view>
                            <view class="evaluate btn" @click.stop="cancelOrder(res.id)">取消订单</view>
                        </view>
                    </view>
                    </template>
                    <template v-else>
                        <view class="centre">
                            <image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
                            </image>
                            <view class="explain">
                                您还没有相关的订单
                            </view>
                        </view>
                    </template>
                </view>
            </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
            <scroll-view scroll-y style="height: 100%;width: 100%;">
                <view class="page-box">
                    <template v-if="dataList.length>0">
                    <view class="order" v-for="(res, index) in  dataList" :key="res.id" @click="gotoDetail('/childPages/order/rec/finish?id=',res.id)">
                           <view class="top">
                               <view class="left">
                                   <view class="store">{{ res.companyName }}</view>
                                   <view class="address">{{res.pickupAddress}}</view>
                               </view>
                               <view class="right">已完成</view>
                           </view>
                           <view class="item">
                               <view class="left">
                                   <image :src="baseUrl+res.coverUrl" mode="aspectFill"></image>
                               </view>
                               <view class="content">
                                   <view class="title u-line-2">回收类型：{{res.goodTypeName}}</view>
                                   <view class="type">重量：{{res.goodNumber}}kg</view>
                                   <view class="type">收入金额：￥ {{res.orderPrice}}</view>
                                   <view class="type" v-if="res.channel==1">取货方式：上门取货{{res.pickupTime}}</view>
                                   <view class="type" v-else>完成时间：{{res.createTime}}</view>
                               </view>
                           </view>
                           <view class="bottom" v-if="res.channel==1">
                               <view class="more" @click.stop="call(res.contact)">
                                   <u-icon name="phone-fill" color="rgb(203,203,203)"></u-icon>
                                   <text>联系店家</text>
                               </view>
                               <view v-if="res.isScore" class="btn">已评价</view>
                               <view v-else class="evaluate btn" @click.stop="evaluate(res.id)">评价</view>
                           </view>
                       </view>
                       </template>
                       <template v-else>
                           <view class="centre">
                               <image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="widthFix">
                               </image>
                               <view class="explain">
                                   您还没有相关的订单
                               </view>
                           </view>
                       </template>
                   </view>
               </scroll-view>
           </swiper-item>
           <swiper-item class="swiper-item">
               <scroll-view scroll-y style="height: 100%;width: 100%;">
                   <view class="page-box">
                       <template v-if="dataList.length>0">
                       <view class="order" v-for="(res, index) in  dataList" :key="res.id" @click="gotoDetail('/childPages/order/rec/cancel?id=',res.id)">
                                <view class="top">
                                    <view class="left"></view>
                                    <view class="right">已取消</view>
                                </view>
                                <view class="item">
                                    <view class="left">
                                        <image :src="baseUrl+res.coverUrl" mode="aspectFill"></image>
                                    </view>
                                    <view class="content">
                                        <view class="title u-line-2">回收类型：{{res.goodTypeName}}</view>
                                        <view class="type">重量：{{res.goodNumber}}kg</view>
                                        <view class="type">预计收入金额：￥ {{res.goodNumber*res.goodUnitPrice}}</view>
                                        <view class="type">取货方式：上门取货{{res.pickupTime}}</view>
                                    </view>
                                </view>
                                <view class="bottom">
                                    <view class="more"></view>
                                    <view @click.stop="gotoFill" class="evaluate btn">重新下单</view>
                                </view>
                            </view>
                            </template>
                            <template v-else>
                                <view class="centre">
                                    <image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
                                    </image>
                                    <view class="explain">
                                        您还没有相关的订单
                                    </view>
                                </view>
                            </template>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
        <u-action-sheet :list="listOrder" v-model="show"></u-action-sheet>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>
<script>
import api from "../../common/apiUtil.js"
    export default {
        data() {
            return {
                baseUrl: api.SERVER_BASE,
                show: false,
                listOrder: [{
                    text: '确定'
                }, {
                    text: '取消'
                }],
                orderList: [
                    [],
                    [],
                    [],
                    []
                ],
                dataList: [],
                list: [{
                        name: '待接单'
                    },
                    {
                        name: '待结算'
                    },
                    {
                        name: '已完成'
                    },{
                        name: '已取消'
                    },
                ],
                current: 0,
                swiperCurrent: 0,
                tabsHeight: 0,
                dx: 0
            };
        },
        onLoad() {
            this.getOrderList(0);
        },
        methods: {
            gotoDetail(url,id) {
                uni.navigateTo({
                    url:url + id
                })
            },
            // 页面数据
            getOrderList(idx) {
                let userId = uni.getStorageSync('info').userId;
                this.$u.get(api.GET_ORDER_LIST,{
                    state: idx+1,
                    userId: userId
                }).then(res => {
                    if(res.code == 200) {
                        this.dataList = res.rows;
                    }
                })
                
            },
            // tab栏切换
            change(index) {
                this.swiperCurrent = index;
                this.getOrderList(index);
            },
            transition({
                detail: {
                    dx
                }
            }) {
                this.$refs.tabs.setDx(dx);
            },
            animationfinish({
                detail: {
                    current
                }
            }) {
                this.$refs.tabs.setFinishCurrent(current);
                this.swiperCurrent = current;
                this.current = current;
            },
            call(num) {
                uni.makePhoneCall({
                    phoneNumber: num
                });
            },
            evaluate(id) {
                console.log(id)
                this.$u.route({
                    // url: '/childPages/order/score?id='+id
					url:'score?id='+id
                })
            },

			//取消订单请求接口

            cancelOrder(id) {
                this.$u.put(api.ADD_ORDER,{
                    id: id,
                    state: 4
                }).then(res => {
                    if(res.code == 200) {
                        this.$refs.uToast.show({
                            title: '取消成功！',
                            type: 'success'
                        });
                        this.getOrderList(this.swiperCurrent);
                    } else {
                        this.$refs.uToast.show({
                            title: '操作失败！',
                            type: 'error'
                        })
                    }
                })
            },

			//待结单
			gotowaiting(id){
				uni.navigateTo({
					url:"../order/rec/waiting"
				})
			},
			//取消订单
			cancelOrder(id){
				uni.navigateTo({
					url:'../order/rec/cancel'
				})
			},

            gotoFill() {
                uni.navigateTo({
                    url: '../childPages/company/fillIn'
                })
            },
            getUnixTime(dateStr){
                let newstr = dateStr.replace(/-/g,'/'); 
                let date =  new Date(newstr); 
                let time_str = date.getTime().toString();
                return time_str.substr(0, 10);
            }
        }
    };
</script>
<style lang="scss" scoped>
.order {
        width: 710rpx;
        background-color: #ffffff;
        margin: 20rpx auto;
        border-radius: 20rpx;
        box-sizing: border-box;
        padding: 20rpx;
        font-size: 28rpx;

        .top {
            display: flex;
            justify-content: space-between;

            .left {
                // display: flex;
                // align-items: center;

                .store {
                    margin: 0 10rpx;
                    font-size: 32rpx;
                    // font-weight: bold;
                }
                .address{
                    margin: 0 10rpx;
                    font-size: 28rpx;
                    padding-top: 5px;
                    color: #999;
                }
            }

            .right {
                color: $u-type-warning-dark;
            }
        }

        .item {
            display: flex;
            margin: 20rpx 0 0;

            .left {
                margin-right: 20rpx;

                image {
                    width: 200rpx;
                    height: 200rpx;
                    border-radius: 10rpx;
                }
            }

            .content {
                .title {
                    font-size: 28rpx;
                    line-height: 50rpx;
                }

                .type {
                    margin: 10rpx 0;
                    font-size: 24rpx;
                    color: $u-tips-color;
                }

                .delivery-time {
                    color: #e5d001;
                    font-size: 24rpx;
                }
            }

            .right {
                margin-left: 10rpx;
                padding-top: 20rpx;
                text-align: right;

                .decimal {
                    font-size: 24rpx;
                    margin-top: 4rpx;
                }

                .number {
                    color: $u-tips-color;
                    font-size: 24rpx;
                }
            }
        }

        .total {
            margin-top: 20rpx;
            text-align: right;
            font-size: 24rpx;

            .total-price {
                font-size: 32rpx;
            }
        }

        .bottom {
            display: flex;
            margin-top: 40rpx;
            padding: 0 10rpx;
            justify-content: space-between;
            align-items: center;

            .btn {
                line-height: 52rpx;
                width: 160rpx;
                border-radius: 26rpx;
                border: 2rpx solid $u-border-color;
                font-size: 26rpx;
                text-align: center;
                color: $u-type-info-dark;
            }

            .evaluate {
                color: $u-type-warning-dark;
                border-color: $u-type-warning-dark;
            }
        }
    }

    .centre {
        text-align: center;
        margin: 200rpx auto;
        font-size: 32rpx;

        image {
            width: 164rpx;
            height: 164rpx;
            border-radius: 50%;
            margin-bottom: 20rpx;
        }

        .tips {
            font-size: 24rpx;
            color: #999999;
            margin-top: 20rpx;
        }

        .btn {
            margin: 80rpx auto;
            width: 200rpx;
            border-radius: 32rpx;
            line-height: 64rpx;
            color: #ffffff;
            font-size: 26rpx;
            background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
        }
    }

    .wrap {
        display: flex;
        flex-direction: column;
        height: calc(100vh - var(--window-top));
        width: 100%;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        height: 100%;
    }
</style>
