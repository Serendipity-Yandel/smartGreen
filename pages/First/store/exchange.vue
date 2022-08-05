<template>
<view class="container">
	<view class="title">
	    <view class="server"></view>
	    <view>商品详情</view>
	</view>
	
	<view class="imageStyle" >
	    <u-image mode="widthFix" :src="$api.SERVER_BASE+goodDtl.coverUrl"></u-image>
	</view>
        <!-- <view>
            <u-swiper height="400" :list="list"></u-swiper>
        </view> -->

        <view class="introduce">
            <view class="storeName">{{goodDtl.name}}</view>
            <view class="storeRecycler">{{goodDtl.point}}积分</view>
        </view>
        <view class="button"  >
            <u-button hover-class="none" size="medium" @click="goto()" :custom-style="cusButton" type="primary">兑换</u-button>
        </view>
        <view class="title">
            <view class="server"></view>
            <view>服务详情</view>

        </view>
        <view class="serverContent">服务：{{goodDtl.serviceDetail}}</view>
        <view class="serverContent">详情：{{goodDtl.serviceRemark}}</view>

    </view>

</template>

<script>
	import api from '@/common/apiUtil.js'
	    export default {
	        data() {
	            return {
	                goodDtl: {},
	                cusButton: {
	                    height: '40px',
	                    width: '100%',
	                    backgroundColor: 'rgb(0,194,151)'
	                },
	                src: '',
	            }
	        },
	        onLoad(options) {
	            this.getGoodsDtl(options.id);
	        },
	        methods: {
	            getGoodsDtl(id) {
	                this.$u.get(api.REWARD_DETAIL+id).then(res => {
	                    if(res.code == 200) {
	                        this.goodDtl = res.data;
	                    }
	                })
	            },
	            goto() {
	                uni.navigateTo({
	                    url: './exChangedefault?id=' + this.goodDtl.id

	                })
	            }
	        }
	    }

</script>

<style>
.button {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10%;
        position: fixed;
        z-index: 99;
        left: 0;
        bottom: 30px;
    }

    .serverContent {
        margin: 15px;
        font-size: 15px;
    }

    .introduce {
        margin: 15px;

        .storeName {
            font-size: 15px;
        }

        .storeRecycler {
            margin-top: 10px;
            font-size: 15px;
            color: orange;
        }
    }

    .title {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        font-size: 15px;
        margin-left: 15px;
    }

    .server {
        width: 5px;
        margin-right: 15px;
        height: 20px;
        background-color: rgb(0,194,151);
    }

    .imageStyle {
        z-index: 1;
        margin: 20px;

    }

</style>
