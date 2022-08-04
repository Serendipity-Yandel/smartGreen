<template>
	<view>
	        <view class="wrap">
	            <view class="u-tabs-box">
	                <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
	            </view>
	            <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
	                
	                <swiper-item class="swiper-item">
	                    <scroll-view scroll-y style="height: 100%;width: 100%;">
	                        <view class="page-box">
	                            <template v-if="dataList.length>0">
	                            <view class="order" v-for="(res, index) in dataList" :key="res.id">
	                                <view class="top">
	                                    <view class="left">
	                                        <view class="store">{{ res.create_by }} &nbsp;&nbsp;{{res.contact}}</view>
	                                        <view class="address">收获地址：{{res.address}}</view>
	                                    </view>
	                                    <view class="right">{{ $u.timeFormat(res.create_time, 'yyyy年mm月dd日') }}</view>
	                                </view>
	                                <view class="item">
	                                    <view class="left"><image :src="baseUrl+res.cover_url" mode="aspectFill"></image></view>
	                                    <view class="content">
	                                        <view class="title u-line-2">{{ res.name }}</view>
	                                        <!-- <view class="type">{{ res.type }}</view> -->
	                                        <view class="delivery-time">消耗 {{ res.point }} 积分</view>
	                                    </view>
	                                    <view class="right">
	                                        <view class="number">x{{ res.good_sum }}</view>
	                                    </view>
	                                </view>
	                                <view class="bottom">
	                                    <view class="evaluate btn" @click="cfmGoods(res.id)">确认收货</view>
	                                </view>
	                            </view>
	                            </template>
	                            <template v-else>
	                                <view class="centre">
	                                    <image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
	                                    </image>
	                                    <view class="explain">
	                                        您还没有相关的记录
	                                        <!-- <view class="tips">可以去看看有那些想买的</view> -->
	                                    </view>
	                                    <!-- <view class="btn">随便逛逛</view> -->
	                                </view>
	                            </template>
	                        </view>
	                    </scroll-view>
	                </swiper-item>
	                <swiper-item class="swiper-item">
	                    <scroll-view scroll-y style="height: 100%;width: 100%;">
	                        <view class="page-box">
	                            <template v-if="dataList.length>0">
	                            <view class="order" v-for="(res, index) in dataList" :key="res.id">
	                                <view class="top">
	                                    <view class="left">
	                                        <view class="store">{{ res.create_by }} &nbsp;&nbsp;{{res.contact}}</view>
	                                        <view class="address">{{res.address}}</view>
	                                    </view>
	                                    <view class="right">{{ $u.timeFormat(res.create_time, 'yyyy/mm/dd') }}</view>
	                                </view>
	                                <view class="item">
	                                    <view class="left"><image :src="baseUrl+res.cover_url" mode="aspectFill"></image></view>
	                                    <view class="content">
	                                        <view class="title u-line-2">{{ res.name }}</view>
	                                        <!-- <view class="type">{{ res.type }}</view> -->
	                                        <view class="delivery-time">消耗 {{ res.point }} 积分</view>
	                                    </view>
	                                    <view class="right">
	                                        <view class="number">x{{ res.good_sum }}</view>
	                                    </view>
	                                </view>
	                            </view>
	                            </template>
	                            <template v-else>
	                                <view class="centre">
	                                    <image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
	                                    </image>
	                                    <view class="explain">
	                                        您还没有相关的记录
	                                        <!-- <view class="tips">可以去看看有那些想买的</view> -->
	                                    </view>
	                                    <!-- <view class="btn">随便逛逛</view> -->
	                                </view>
	                            </template>
	                        </view>
	                    </scroll-view>
	                </swiper-item>
	            </swiper>
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
            dataList: [],
            list: [
                {
                    name: '待收货'
                },
                {
                    name: '已完成'
                }
            ],
            current: 0,
            swiperCurrent: 0,
            tabsHeight: 0,
            dx: 0
        };
    },
    created() {
        this.getExchangelist(1)
    },
    methods: {
        getExchangelist(state) {
            let userId = uni.getStorageSync('info').userId;
            this.$u.get(api.GET_EXCHANGE_LIST,{
                userId: userId,
                state: state,
                channel: 2
            }).then(res => {
                if(res.code == 200) {
                    this.dataList = res.rows;
                }
            })
        },
        // tab栏切换
        change(index) {
            this.getExchangelist(index+1);
            this.swiperCurrent = index;
        },
        transition({ detail: { dx } }) {
            this.$refs.tabs.setDx(dx);
        },
        animationfinish({ detail: { current } }) {
            this.$refs.tabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
        },
        cfmGoods(id) {
            this.$u.put(api.ADD_INTEGRAL,{
                id: id,
                state: 2
            }).then(res => {
                if(res.code == 200) {
                    this.$refs.uToast.show({
                        type: 'success',
                        title: '操作成功！'
                    });
                    this.change(1);
                }
            })
        }
    }
};

</script>

<!-- 
/* #ifndef H5 */
page {
    height: 100%;
    background-color: #f2f2f2;
}
/* #endif */ -->


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
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 6px;
        .left {
            .store {
                margin: 0 10rpx;
                font-size: 32rpx;
            }
            .address{
                margin: 0 10rpx;
                font-size: 28rpx;
                padding-top: 5px;
                color: #999;
            }
        }
        .right {
            color: #999;
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
        justify-content: flex-end;
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
