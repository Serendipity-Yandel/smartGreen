<template>
	<view class="rcdlist">
	        <view class="total">累计收益：<text>{{totalNum}}元</text></view>
	        <u-cell-group v-if="rcdlist.length>0">
	            <u-cell-item 
	                v-for="item in rcdlist"
	                title="物品回收" 
	                :title-style="{fontSize: '18px'}" 
	                :value="'+'+item.orderPrice+'元'" 
	                :value-style="{fontSize: '18px'}" 
	                :label="item.updateTime" 
	                :arrow="false">
	            </u-cell-item>
	        </u-cell-group>
	        <u-empty v-else text="暂无积分记录" mode="list"></u-empty>
	    </view>

</template>

<script>
	import api from '../../../common/apiUtil.js'
	    export default {
	        data() {
	            return {
	                totalNum: 0,
	                rcdlist: []
	            }
	        },
	        created() {
	            this.getRecdlist();
	        },
	        methods: {
	            getRecdlist() {
	                this.$u.get(api.GET_ORDER_LIST,{
	                    state: 3
	                }).then(res => {
	                    if(res.code == 200) {
	                        this.rcdlist = res.rows;
	                        let allNum = 0;
	                        res.rows.forEach(item => {
	                            allNum += item.orderPrice;
	                        });
	                        this.totalNum = allNum.toFixed(2);
	                    }
	                })
	            }
	        }
	    }

</script>

<style>
.rcdlist{
        box-sizing: border-box;
        padding: 0 15px;
        .total{
            font-size: 22px;
            padding: 5px 0 0 15px;
            text{
                color: #FF0000;
            }
        }
    }

</style>
