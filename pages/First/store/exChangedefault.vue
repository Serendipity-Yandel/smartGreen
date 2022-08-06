<template>
	<view class="container">
	        <view>
	            <u-cell-item 
	                :title="address.hasOwnProperty('contactName')?address.contactName+address.contact: '请选择地址'" 
	                :label="address.area+address.address" 
	                arrow-direction="right"
	                @click="chooseAddress">
	            </u-cell-item>
	            <view class="sku">
	                <view style="margin-top: 15px;">
	                    <u-image width="200rpx" height="200rpx" :src="$api.SERVER_BASE+goodDtl.coverUrl"></u-image>
	                </view>
	                <view class="sku1" style="">
	                    <view>{{goodDtl.name}}</view>
	                    <view class="sku2">
	                        <view>{{goodDtl.point}}积分</view>
	                        <view style="margin-top: 15px;">
	                            <u-number-box v-model="vModelValue" @change="changeValue"></u-number-box>
	                        </view>
	                    </view>
	                </view>
	            </view>
	
	            <view>
	                <view style="margin-top: 15px; font-size: 15px;">
	                    <text>下单备注</text>
	                </view>
	                <view style="border: 1px #000000 solid; margin-top: 20px;">
	                    <u-field label-width="0" type="textarea" v-model="text" placeholder="填写备注,例如:请尽快发货">
	                    </u-field>
	                </view>
	            </view>
	
	            <view style="margin-top: 15px; font-size: 15px;">
	                <text>商品总额 </text>
	                <text style="float: right;">{{moneyValue }}</text>
	            </view>
	
	            <view class="foot">
	                <view >实付积分：{{moneyValue }}</view>
	                <view class="button">
	                    <u-button size="default" @click="exchange" :custom-style="cusButton" type="primary">兑换</u-button>
	                </view>
	            </view>
	        </view>
	        <u-toast ref="uToast"></u-toast>
	    </view>

</template>

<script>
	import api from '@/common/apiUtil.js'
	    export default {
	        data() {
	            return {
	                goodDtl: {},
	                address: {},
	                money: 100,
	                moneyValue: 1,
	                text: '',
	                cusButton: {
	                    backgroundColor: 'rgb(0,194,151)'
	                },
	                src: '',
	                vModelValue: 1,
	            }
	        },
	        onLoad(options) {
	            this.getGoodsDtl(options.id);
	            if(options.hasOwnProperty('addId')) {
	                this.getChooseAds(options.addId)
	            } else {
	                this.getAddress();
	            }
	        },
	        methods: {
	            getGoodsDtl(id) {
	                this.$u.get(api.REWARD_DETAIL+id).then(res => {
	                    if(res.code == 200) {
	                        this.goodDtl = res.data;
	                    }
	                })
	            },
	            getAddress() {
	                this.$u.get(api.ADDRESS_LIST).then(res => {
	                    if(res.code == 200) {
	                        res.rows.forEach(item => {
	                            if(item.state == 3) {
	                                this.address = item;
	                            }
	                        })
	                    }
	                })
	            },
	            getChooseAds(id) {
	                this.$u.get(api.ADDRESS_ADD+'/'+id).then(res => {
	                    if(res.code == 200) {
	                        this.address = res.data;
	                    }
	                })
	            },
	            changeValue(e) {
	                this.vModelValue = e.value;
	                this.moneyValue = this.goodDtl.point * e.value
	            },
	            exchange() {
	                let userId = uni.getStorageSync('info').userId;
	                this.$u.post(api.ADD_INTEGRAL,{
	                    "channel": 2,
	                    "createBy": this.address.contactName,
	                    "address": this.address.area+this.address.address,
	                    "contact": this.address.contact,
	                    "goodSum": this.vModelValue,
	                    "originalId": this.goodDtl.id,
	                    "point": this.moneyValue,
	                    "state": '1',
	                    "userId": userId
	                }).then(res => {
	                    if(res.code == 200) {
	                        this.$refs.uToast.show({
	                            title: '兑换成功！',
	                            type: 'success',
	                            isTab: true,
	                            url: '/pages/home'
	                        })
	                    }
	                })
	            },
	            chooseAddress() {
	                uni.navigateTo({
	                    url: '../center/address?choose=1&goodsId='+this.goodDtl.id
	                })
	            }
	        }
	    }

</script>

<style lang="scss" scoped>
.foot {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
        position: absolute;
        bottom: 0;
        width: 90%;
        height: 60px;
    }

    .userInfo {
        font-size: 15px;
    }

    .address {
        font-size: 15px;
        margin-top: 10px;
        color: #AAAA;
    }

    .container {
        margin: 0 15px 0 15px;
    }

    .sku {
        display: flex;
        flex-wrap: wrap;
    }

    .sku1 {
        margin: 15px 0 0 20px;
        font-size: 15px;
    }

    .sku2 {
        margin: 15px 0 0 0px;
        font-size: 15px;
    }

    page {
        background-color: rgb(247, 250, 253);
    }

</style>
