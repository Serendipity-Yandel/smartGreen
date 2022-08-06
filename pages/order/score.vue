<template>
<view class="container">
        <view class="peopleStyle">
            <view class="people">
                <view class="peopleInfo">
                    张师傅
                </view>
                <view class="peopleInfo">
                    已回收715单
                </view>
            </view>
            <view style="margin-left: 20px;">接单时间{{orderDtl.pickupTime}}</view>
            <view style="margin-left: 20px;">所属店家{{orderDtl.companyName}}</view>
            <view style="margin-left: 20px;">总体</view>
        </view>
        <view class="score">
            <view class="scoreHead">
                <text>服务评分：</text>
                <u-rate :count="5" v-model="service" :gutter="20" :size="46" active-color="#ffc71c" @change="serviceChange"></u-rate>
                <text>{{serviceState}}</text>
            </view>
            <u-input v-model="serviceText" type="textarea" placeholder="您可以从回收员的专业知识、服务态度、服务效果等方面说说自己的感受~" :height="200" :auto-height="true" />
        </view>
        <view class="score">
            <view class="scoreHead">
                <text>店家评分：</text>
                <u-rate :count="5" v-model="store" :gutter="20" :size="46" active-color="#ffc71c" @change="storeChange"></u-rate>
                <text>{{storeState}}</text>
            </view>
            <u-input v-model="storeText" type="textarea" placeholder="我们将会对您的信息进行隐藏，店家不会看到您的信息" :height="200" :auto-height="true" />
        </view>
        <view class="button">
            <u-button hover-class="none" @click="submitScore" :custom-style="cusButton" type="primary">发布评价
            </u-button>
        </view>
        <u-toast ref="uToast"></u-toast>
    </view>

</template>

<script>
import api from '../../common/apiUtil.js'
    export default {
        data() {
            return {
                cusButton: {
                    height: '40px',
                    width: '70%',
                    backgroundColor: 'rgb(0,194,151)'
                },
                orderId: null,
                orderDtl: {},
                employeeId: null,//骑手Id
                service: 0,
                serviceState: '评分',
                serviceText: '',
                store: 0,
                storeState: '评分',
                storeText: '',
            }
        },
        onLoad(options) {
            this.orderId = options.id;
            this.getOrderDtl(options.id);
        },
        methods: {
            getOrderDtl(id) {
                this.$u.get(api.ADD_ORDER+'/'+id).then(res => {
                    if(res.code == 200) {
                        this.orderDtl = res.data;
                        this.employeeId = res.data.employeeId;
                        // this.getRiderInfo(res.data.employeeId);
                    }
                })
            },
            getRiderInfo(id) {
                this.$u.get(api.GET_USER+'/'+id).then(res => {
                    
                })
            },
            submitScore() {
                let userName = uni.getStorageSync('info').nickName;
                this.$u.post(api.SYSTEM_SCORE,{
                    orderId: this.orderId,
                    employee: 3,
                    createBy: userName,
                    serviceScore: this.service,
                    serviceRemark: this.serviceText,
                    storeScore: this.store,
                    remark: this.storeText
                }).then(res => {
                    if(res.code == 200) {
                        this.$refs.uToast.show({
                            type: 'success',
                            isTab: true,
                            title: '评价成功！',
                            url: '/pages/order'
                        })
                    } else {
                        this.$refs.uToast.show({
                            type: 'error',
                            title: '操作失败，请重试！'
                        })
                    }
                })
            },
            serviceChange(e) {
                switch (e){
                    case 1:
                        this.serviceState = '非常差';
                        break;
                    case 2:
                        this.serviceState = '差';
                        break;
                    case 3:
                        this.serviceState = '一般';
                        break;
                    case 4:
                        this.serviceState = '好';
                        break;
                    default:
                        this.serviceState = '非常好';
                }
            },
            storeChange(e) {
                switch (e){
                    case 1:
                        this.storeState = '非常差';
                        break;
                    case 2:
                        this.storeState = '差';
                        break;
                    case 3:
                        this.storeState = '一般';
                        break;
                    case 4:
                        this.storeState = '好';
                        break;
                    default:
                        this.storeState = '非常好';
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
.peopleStyle {
        color: white;
        margin-top: 20px;
        background-color: rgb(0, 194, 151);
        border-radius: 10px;
        line-height: 20px;
        font-size: 15px;
        padding-bottom: 20px;
        .people {
            margin: 20px;
            display: flex;
            justify-content: space-between;

        }

        .peopleInfo {
            margin-top: 20px;
        }

        .peopleFoot {
            display: flex;
            margin-top: 20px;

            height: 100%;

            .language {
                flex: 1;
                padding-left: 10px;
                border-right-style: solid;
                border-top-style: solid;
                text-align: center;
                padding-top: 2%;
            }

            .language1 {
                flex: 1;
                padding-top: 2%;
                text-align: center;
                padding-left: 10px;
                border-top-style: solid;
            }

        }
    }
    .score{
        margin-top: 8px;
        .scoreHead{
            display: flex;
            align-items: center;
            border-bottom: 1px #e6e6e6 solid;
            padding: 10px 0;
            text{
                font-size: 16px;
            }
        }
    }
    .content {
        font-size: 15px;
        line-height: 30px;
        margin-top: 20px;
        color: #C0C0C0;
    }

    .introduce {
        width: 100%;
        height: 130px;
        margin-top: 20px;
        border-radius: 20px;
        background-color: rgb(0, 194, 151);
        color: white;
        display: flex;
        flex-wrap: wrap;

        .imageStyle {
            margin: 20px;
        }

        .attribute {
            margin: 15px;

            .attributeA {
                margin-top: 10px;
            }
        }
    }

    .button {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        border-top: 1px #e6e6e6 solid;
        text-align: center;
        padding: 10px 0;
    }

    .container {
        margin: 15px;
        // height: 800px;
    }

    .state {
        margin-left: 50%;
        font-size: 15px;
        color: red;
    }

    .header {
        display: flex;
        flex-wrap: wrap;
        font-size: 15px;

        .title {
            margin-left: 15px;
        }
    }

    .server {
        width: 5px;
        height: 20px;
        background-color: rgb(0, 194, 151);
    }

</style>
