<template>
	<view class="rcdlist">
	        <u-cell-group v-if="rcdlist.length>0">
	            <u-cell-item 
	                v-for="item in rcdlist"
	                :title="item.channel==1?'签到':'回收'" 
	                :title-style="{fontSize: '18px'}" 
	                :value="'+'+item.point" 
	                :value-style="{fontSize: '18px'}" 
	                :label="item.time" 
	                :arrow="false">
	            </u-cell-item>
	        </u-cell-group>
	        <view class="noData" v-else>
	            <u-empty text="暂无积分记录" mode="list"></u-empty>
	        </view>
	    </view>

</template>

<script>
	import api from '../../../common/apiUtil.js'
	    export default {
	        data() {
	            return {
	                rcdlist: []
	            }
	        },
	        created() {
	            this.getIntergralRcd();
	        },
	        methods: {
	            getIntergralRcd() {
	                let userId = uni.getStorageSync('info').userId;
	                this.$u.get(api.GET_INTEGRAL_RECORD,{
	                    userId: userId
	                }).then(res => {
	                    if(res.code == 200) {
	                        this.rcdlist = res.rows;
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
    }
    .noData{
        width: 100%;
        position: absolute;
        left: 0;
        top: 46%;
        transform: translateY(-50%);
    }

</style>
