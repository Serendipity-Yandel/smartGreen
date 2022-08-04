<template>
	<view class="contribute">
	        <view class="myCard">
	            <view class="logo">
	                <u-image mode="widthFix" src="/static/contribt.png"></u-image>
	            </view>
	            <view class="ctlist">
	                <view class="item" v-for="item in ctlist">
	                    <view class="label">{{item.title}}</view>
	                    <view class="number">{{item.num}}</view>
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
	                ctlist: [
	                    {title: '爱心活动',num: '7次'},{title: '自助回收次数',num: '7次'},{title: '总回收数量',num: '119千克'},{title: '减少碳排放',num: '119千克'},
	                    {title: '减少森林污染',num: '1014平方米'},{title: '减少土地污染',num: '1014平方米'},{title: '减少湿地污染',num: '1014平方米'},
	                    {title: '保护水资源',num: '1.89吨'}
	                ],
	                eventSum: 0
	            }
	        },
	        created() {
	            this.getEventSum();
	            this.getOrderSum();
	        },
	        methods: {
	            getEventSum() {
	                let userId = uni.getStorageSync('info').userId;
	                this.$u.get(api.GET_INTEGRAL_SUM+userId).then(res => {
	                    if(res.code == 200) {
	                        this.ctlist[0].num = res.data[0].count+'次';
	                    }
	                })
	            },
	            getOrderSum() {
	                let userId = uni.getStorageSync('info').userId;
	                this.$u.get(api.GET_ORDER_SUM+userId).then(res => {
	                    if(res.code == 200) {
	                        this.ctlist[1].num = res.data[0].count+'次';
	                        this.ctlist[2].num = res.data[0].good_number_sum+'千克';
	                        this.getContribute(res.data[0].good_number_sum);
	                    }
	                })
	            },
	            getContribute(num) {
	                this.$u.get(api.GET_CONTRIBUTE).then(res => {
	                    if(res.code == 200) {
	                        this.ctlist[3].num = res.rows[0].carbonEmission*num+'千克';
	                        this.ctlist[4].num = res.rows[0].forestArea*num+'平方米';
	                        this.ctlist[5].num = res.rows[0].landArea*num+'平方米';
	                        this.ctlist[6].num = res.rows[0].wetlandArea*num+'平方米';
	                        this.ctlist[7].num = res.rows[0].waterSource*num+'平方米';
	                    }
	                })
	            }
	        }
	    }

</script>

<style>
.myCard{
        width: calc(100% - 40px);
        margin: 80px auto 0;
        box-sizing: border-box;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 5px 2px rgba(255,0,0,0.1);
        position: relative;
        .logo{
            width: 40%;
            position: absolute;
            left: 30%;
            top: 0;
            transform: translateY(-35%);
        }
        .ctlist{
            padding-top: 80px;
            .item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 15px;
                .label{
                    border-left: 3px #0ec59c solid;
                    font-size: 16px;
                    line-height: 16px;
                    padding-left: 5px;
                }
                .number{
                    font-size: 16px;
                }
            }
        }
    }

</style>
