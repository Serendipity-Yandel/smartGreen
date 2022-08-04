<template>
	<view class="container">
	        <view>
	            <u-button hover-class="none" :custom-style="buttonStyle" type="primary" @click="buttonClick">捐献积分</u-button>
	        </view>
<nodeCom v-if="content.length>0" :content="content" :auth="auth" :title="title" :imageUrl="$api.SERVER_BASE+imageUrl"></nodeCom>
	        
	        
	        <view>
	            <u-modal v-model="show" :show-cancel-button="true" @confirm="confirm">
	                <u-field v-model="contentModal" placeholder="请输入捐献的积分"></u-field>
	            </u-modal>
	        </view>
	    </view>

</template>

<script>
	import api from '../../../common/apiUtil.js';
	    import nodeCom from '../../../components/nodeComponent.vue'
	    export default {
	        components: {
	            nodeCom
	        },
	        data() {
	            return {
	                show: false,
	                contentModal: '',
	                content: '',
	                imageUrl: '',
	                title: '111',
	                auth: '小明',
	                dtl_id: 0,
	                buttonStyle: {
	                    left:0,
	                    right:0,
	                    bottom:'30px',
	                    position: 'fixed',
	                    height: '40px',
	                    width: '200px',
	                    backgroundColor: 'rgb(0,194,151)',
	                    'z-index': '999999',
	                },
	            }
	        },
	        onLoad(options) {
	            this.dtl_id = options.id;
	            this.getDetails(options.id)
	        },
	        methods: {
	            getDetails(id) {
	                this.$u.get(api.GET_EVENT_DETAIL+id).then(res => {
						// console.log(res)
	                    if(res.code == 200) {
	                        this.title = res.data.title;
	                        this.auth = res.data.author;
	                        this.content = res.data.content;
	                        this.imageUrl = res.data.coverUrl;
	                    }
	                })
	            },
	            confirm() {
	                let userId = uni.getStorageSync('info').userId;
	                if(this.contentModal.length>0) {
	                    this.$u.post(api.ADD_INTEGRAL,{
	                        "channel": 3,
	                        "originalId": this.dtl_id,
	                        "point": this.contentModal,
	                        "state": '1',
	                        "userId": userId
	                    }).then(res => {
	                        if(res.code == 200) {
	                            this.contentModal = '';
	                            uni.showToast({
	                                icon: 'success',
	                                title: '捐献成功！'
	                            })
	                        } else {
	                            uni.showToast({
	                                icon: 'error',
	                                title: '捐献失败！'
	                            })
	                        }
	                    })
	                } else {
	                    uni.showToast({
	                        icon: 'none',
	                        title: '请先输入捐献数额！'
	                    })
	                }
	            },
	
	            buttonClick() {
	                this.show = true;
	            },
	            more() {
	                this.bookContentSub += this.bookContent.substring(99, this.bookContent.length);
	            },
	        }
	    }

</script>

<style>
.buttonWarp {
        color: #B3B3B3;
        text-align: center;
        font-size: 15px;
        margin-top: 20px;
        padding-bottom: 20px;
    }

    .u-body-item image {
        width: 120rpx;
        flex: 0 0 120rpx;
        height: 120rpx;
        border-radius: 8rpx;
        margin-left: 12rpx;
    }

    .container {
        margin: 0 12px 0 12px;
        font-size: 14px;
        line-height: 24px;
    }

</style>
