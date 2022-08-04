<template>
	
	<view class="container">
	        <view class="header">
	            <view style="margin-top: 20px; padding-left: 15px; font-size: 20px; color: #AAAA;">
	                <text>为你推荐</text>
	            </view>
	            <view style="margin-top: 25px; padding-right: 15px; color: #FF9900; font-size: 15px;">
	                <text>可用积分：{{integral}}</text>
	            </view>
	        </view>
			
	        <view class="content">
	            <view class="item" v-for="(item, index) in list">
	                <view @click="gotoDetail(item.id)">
<u-image width="300rpx" height="300rpx" src="https://imgnews.gmw.cn/attachement/jpg/site2/20200704/f44d305ea0d82069d85212.jpg"></u-image>
	                </view>
	                <view class="title"><text>{{item.name}}</text></view>
	                <view class="title">{{item.point}}积分</view>
	        <view class="content">
	            <view class="item" v-for="(items, index) in list">
	                <view @click="gotoDetail(items.id)">
				<u-image width="300rpx" height="300rpx" :src="$api.SERVER_BASE+items.coverUrl"></u-image>
	                </view>
	                <view class="title"><text>{{items.name}}</text></view>
	                <view class="title">{{items.point}}积分</view>
	            </view>
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
	                list: [],
	                integral: '333'
	            }
	        },
	        created() {
	            this.getRewardlist();
	        },
	        methods: {
	            gotoDetail(id) {
	                uni.navigateTo({
	                    url: './exchange?id=' + id

	                })
	            },
	            getRewardlist() {
	                this.$u.get(api.REWARD_LIST).then(res => {
	                    if(res.code == 200) {
	                        this.list = res.rows;
	                    }
	                })
	            }
	        }
	    }

</script>

<style lang="scss" scoped>
.header {
        display: flex;
        justify-content: space-between;
    }
    
    .content {
        margin: 10px;
        display: flex;
        flex-wrap: wrap;
        .item {
            margin: 10px; background-color: white;
        }
        .title {
            text-align: center;
        }
    }
    .page {
        background-color: #F4F4F5;
    }

</style>
