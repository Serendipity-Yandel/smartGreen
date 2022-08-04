<template>
	<view class="center">
	        <view class="content">
	            <view class="calendar">
	               <calendar 
	                :insert="true"
	                :selected="signRcd"
	                :showMonth="false"
	                @change="selected"
	                 />
	            </view>
	        </view>
	        <view class="signBox">
	            <button class="signIn" @click="signIn">点击签到</button>
	            <view class="statusText">{{todaySign ? '今日已签到' : '今日未签到'}}</view>
	        </view>
	    </view>
</template>

<script>
import api from '@/common/apiUtil.js'
    import calendar from '@/components/uni-calendar/uni-calendar.vue'
    export default {
        components: {
            calendar
        },
        data() {
            return {
                signRcd: [],//签到历史列表
                sign: true,//区分投放和签到页面
                todaySign: false,//今日签到状态
                disposal: []
            }
        },
        created() {
            this.loadSignData();
        },
        methods: {
            selected(e) {
                console.log(e)
            },
            loadSignData() {//获取签到历史
                this.$u.get(api.GET_INTEGRAL_RECORD).then(res => {
                    if(res.code == 200) {
                        res.rows.forEach(item => {
                            this.signRcd.push({date: item.time});
                            if(this.getToday() == item.time){
                                this.todaySign = true;
                            }
                        })
                    }
                })
            },
            getToday() {
                let time = new Date();
                let year = time.getFullYear();
                let month = this.zeroFill(time.getMonth()+1);
                let day = this.zeroFill(time.getDate());
                let today = year+'-'+month+'-'+day;
                return today;
            },
            zeroFill(num) {
                return num > 9 ? num : '0'+num;
            },
            signIn() {//签到
                if(this.todaySign){
                    uni.showToast({
                        icon: 'none',
                        title: '今日已签到！'
                    })
                } else {
                    let userId = uni.getStorageSync('info').userId;
                    this.$u.post(api.ADD_INTEGRAL_RECORD,{
                        channel: 1,
                        point: 1,
                        state: '1',
                        userId: userId,
                        time: this.getToday()
                    }).then(res => {
                        if(res.code ==200) {
                            this.loadSignData();
                        }
                        uni.showToast({
                            icon: 'success',
                            title: '签到成功！'
                        })
                    })
                }
            }
        }
    }
</script>
<style>
<style lang="scss" scoped>
    .center{
        width: 100%;
        overflow: hidden;
        .content{
            width: calc(100% - 40px);
            position: absolute;
            left: 20px; top: 30px;
            .calendar{
                width: 100%;
                box-sizing: border-box;
                padding: 0 5px;
                background-color: #fff;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 0 6px 3px rgba(0,194,151,.7);
            }
        }
        .signBox{
            width: 100%;
            position: absolute;
            left: 0; bottom: 20px;
            text-align: center;
            .signIn{
                width: 110px;
                height: 110px;
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                line-height: 110px;
                text-align: center;
                background-color: #00c297;
                border-radius: 50%;
                margin-bottom: 18px;
                box-shadow: 0 0 6px #999;
            }
            .statusText{
                width: 140px;
                font-size: 14px;
                line-height: 34px;
                color: #fff;
                text-align: center;
                background-color: #ff5e81;
                border-radius: 17px;
                position: absolute;
                left: 50%; bottom: 0;
                margin-left: -70px;
                box-shadow: 0 0 6px #999;
            }
        }
    }
</style>

<style scoped>
    .calendar >>> .uni-calendar-item__weeks-box-item{
        width: auto;
    }
    .calendar >>> .uni-calendar-item--isDay{
        color: #00c297;
        font-weight: 600;
        opacity: 1;
        background-color: #fff;
    }
    .calendar >>> .uni-calendar-item--checked{
        background-color: #00c297;
        border-radius: 50%;
        opacity: 1;
    }
</style>


