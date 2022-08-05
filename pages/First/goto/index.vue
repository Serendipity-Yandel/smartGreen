<template>
	<view class="container">
	        <view class="content" v-for="item in purpose" @click="gotoDetail(item.id)">
	            <view class="icon">
	                <u-icon name="file-text" size="70"></u-icon>
	            </view>
	            <view class="font">
	                <text>{{item.title}}</text>
	            </view>
	            <view class="decorate">
	                <view></view>
	            </view>
	       </view>
	    </view>

</template>

<script>
import api from '../../../common/apiUtil.js'
    export default {
        data() {
            return {
                purpose: []
            }
        },
        created() {
            this.getPpslist();
        },
        methods: {
            getPpslist() {
                this.$u.get(api.PURPOSE_LIST).then(res => {
                    if(res.code == 200) {
                        this.purpose = res.rows;
                    }
                })
            },
            gotoDetail(id) {
                uni.navigateTo({
                    url: 'detail?id=' + id
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
 .container {
        margin: 20px;
    }

    page {
        background-color: #F4F4F5;
    }

    .decorate {
        width: 50px;
        height: 25px;
        background-image: linear-gradient(to right, rgb(77, 228, 71), white);
        border-radius: 100px 0 0 100px;
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 40px;
        height: 80px;
        background-color: white;
        border-radius: 20px;

        .icon {
            padding-left: 40px;
        }

        .font {
            font-size: 18px;
        }

    }

</style>
