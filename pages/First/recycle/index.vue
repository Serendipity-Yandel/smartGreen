<template>
	<view class="storeWrapper">
	        <view class="mapContent">
			<map class="map" @markertap="tapShops" :latitude="latitude" :longitude="longitude" :markers="cover" scale="12">
				<cover-view v-show="popup" class="storePopup"></cover-view>
				<cover-image v-show="popup" class="closeBtn" src="../../../static/clear.png" @click="popup=false"></cover-image>
				<cover-view v-show="popup" class="HeadIcon">￥</cover-view>
				<cover-view v-show="popup" class="storeName">{{storeSelect.name}}</cover-view>
				<cover-image v-show="popup" class="storePic" :src="storeSelect.coverUrl?storeSelect.coverUrl:''"></cover-image>
				<cover-view v-show="popup" class="storeAddress">{{storeSelect.address}}</cover-view>
				<!-- <cover-view v-show="popup" class="storeTel">{{storeSelect.tel}}</cover-view>
				<cover-view v-show="popup" class="contact">{{storeSelect.nickName}}</cover-view> -->
				<cover-view v-show="popup && !rest" @click="gotoBooking(storeSelect.id)" class="placeOrder">手机导航</cover-view>
			</map>
	        </view>
	        <view class="storeSection">
	            <view class="listHead">
	                <h4>附近共 {{storeData.length}} 台回收机</h4>
	            </view>
	            <view class="storelist">
	                <view class="storeItem" v-for="item in storeData" @click="selectItem(item)">
	                    <view class="storePic">
	                        <image mode="widthFix" :src="item.coverUrl"></image>
	                        <image mode="widthFix" :src="$api.SERVER_BASE+item.coverUrl"></image>
	                    </view>
	                    <view class="storeInfo">
	                        <view class="itemTop">
	                            <text class="itemName">{{item.name}}</text>
	                        </view>
	                        <view class="address">{{item.address}}</view>
	                        <view class="address">营业时间：</view>
	                        <view class="address">回收量：</view>
	                        <view class="address">营业时间：{{item.createTime}}</view>
	                        <view class="address">回收量：{{item.remark}}</view>
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
	                latitude: 39.909,
	                longitude: 116.39742,
	                covers: [{
	                    latitude: 39.909,
	                    longitude: 116.39742,
	                    iconPath: '../../../static/qt4.png',
	                    width: 60,
	                    height: 50
	                }],
	                popup: false,
	                storeSelect: {},
	                rest: false,
	                storeData: [],
	                navTimer: null
	            }
	        },
	        mounted() {
	            this.getLocation();
	        },
	        computed:{
	            cover(){
	                return this.covers.slice(0);
	            }
	        },
	        methods: {
	            getLocation() {
	                let that = this;
	                //#ifdef APP-PLUS
	                uni.getLocation({
	                    type: 'wgs84',
	                    geocode: true,
	                    success: function (res) {
	                        that.latitude = res.latitude;
	                        that.longitude = res.longitude;
	                        that.getStorelist();
	                    },
	                    fail: function(e) {
	                        uni.showToast({
	                            title: e,
	                            duration: 8000
	                        })
	                    }
	                });
	                //#endif
	                
	                //#ifdef H5 || MP-WEIXIN
	                this.getStorelist();
	                //#endif
	            },
	            getStorelist() {
	                this.$u.get(api.RECLAIMER_LIST).then(res => {
	                    if(res.code == 200) {
	                        console.log(res.rows)
	                        this.storeData = res.rows;
	                        this.storeData.forEach(item => {
	                            item.latitude = this.latlog(this.latitude,this.longitude).lat;
	                            item.longitude = this.latlog(this.latitude,this.longitude).log;
	                            item.width = 50;
	                            item.height = 50;
	                            item.iconPath = '../../static/tabBar_icon01_active.png';
	                        });
	                        
	                        this.covers.push.apply(this.covers, this.storeData);
	                    }
	                })
	            },
	            tapShops(e) {
	                let id = e.detail.markerId;
	                let filterArr = [];
	                filterArr = this.storeData.filter(item => {
	                    return item.id == id;
	                });
	                this.storeSelect = filterArr[0];
	                this.popup = true;
	            },
	            selectItem(item) {
	                this.storeSelect = item;
	                this.popup = true;
	            },
	            phoneCall() {
	                let tel = this.storeSelect.tel;
	                uni.makePhoneCall({
	                    phoneNumber: tel
	                });
	            },
	            gotoBooking(id) {
	                clearTimeout(this.navTimer);
	                let that = this;
	                this.storeSelect.oldLat = this.latitude;
	                this.storeSelect.oldLog = this.longitude;
	                this.navTimer = setTimeout(function(){
	                    uni.$emit('storeInfo',{data: that.storeSelect});
	                    that.storeSelect = {};
	                    that.popup = false;
	                },300);
	                
	                uni.navigateTo({
	                    url: 'detail?id='+id
	                })
	            },
	            latlog(lat,log,d=1,d2=3) {
	                let angle = Math.random(1,360);
	                let nd = Math.random(d,d2);
	                let suiji = parseInt(Math.random()*(45-(-45)+1)+(-45));
	                
	                log = (log+(nd * Math.cos(angle * Math.PI/180)) / (suiji * Math.cos(lat*Math.PI/180)));
	                lat = (lat+(nd * Math.cos(angle * Math.PI/180)) / suiji);
	                return {lat,log};
	            }
	        },
	        destroyed() {
	            clearTimeout(this.navTimer);
	        },
	        onBackPress() {
	            uni.switchTab({
	                url: '../../First/First'
	            })
	            return true;
	        }
	    }

</script>

<style>
.storeWrapper{
        width: 100%;
        height: 100vh;
        position: relative;
        overflow: hidden;
        .mapContent{
            width: 100%;
            .map{
                width: 100%;
                height: 65vh;
                position: relative;
                .storePopup{
                    width: calc(100% - 40px);
                    height: 250px;
                    background-color: #fff;
                    border-radius: 20px;
                    position: absolute;
                    left: 20px;
                    top: 100px;
                }
                .closeBtn{
                    width: 30px;
                    height: 30px;
                    position: absolute;
                    left: 50%;
                    top: 370px;
                    margin-left: -15px;
                }
                .HeadIcon{
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background-color: #15d6ba;
                    font-size: 24px;
                    line-height: 34px;
                    text-align: center;
                    color: #fff;
                    font-weight: 600;
                    position: absolute;
                    left: 40px;
                    top: 120px;
                    /*  #ifdef APP-PLUS  */
                        &.HeadIcon{
                            line-height: 26px;
                        }
                    /*  #endif  */
                }
                .storeName{
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 34px;
                    color: #333;
                    position: absolute;
                    left: 84px;
                    top: 120px;
                    /*  #ifdef APP-PLUS  */
                        &.storeName{
                            top: 116px;
                        }
                    /*  #endif  */
                }
                .storePic{
                    width: 100px;
                    height: 100px;
                    border-radius: 8px;
                    position: absolute;
                    left: 40px;
                    top: 180px;
                }
                .storeAddress,.storeTel,.contact{
                    width: calc(100% - 180px);
                    font-size: 16px;
                    line-height: 30px;
                    color: #000;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: absolute;
                    left: 150px;
                    top: 180px;
                    &.storeTel{
                        top: 215px;
                    }
                    &.contact{
                        top: 250px;
                    }
                }
                .callStore{
                    width: calc(50% - 20px);
                    height: 50px;
                    border-top: 1upx #e6e6e6 solid;
                    font-size: 16px;
                    line-height: 50px;
                    font-weight: 600;
                    text-align: center;
                    color: #333;
                    position: absolute;
                    left: 20px;
                    top: 299px;
                }
                .placeOrder{
                    width: 30%;
                    height: 40px;
                    border-top: 1upx #e6e6e6 solid;
                    border-radius: 25px;
                    font-size: 14px;
                    line-height: 40px;
                    font-weight: 600;
                    text-align: center;
                    color: #fff;
                    background-color: #15d6ba;
                    position: absolute;
                    left: 35%;
                    top: 299px;
                    /*  #ifdef APP-PLUS  */
                        &.placeOrder{
                            border-radius: 20px;
                        }
                    /*  #endif  */
                }
                /* #ifdef APP-PLUS */
                .orderBg{
                    width: calc(50% - 100px);
                    height: 50px;
                    background-color: #15d6ba;
                    position: absolute;
                    left: 50%;
                    top: 300px;
                }
                /* #endif */
                .restTips{
                    width: calc(100% - 40px);
                    height: 50px;
                    border-top: 1upx #e6e6e6 solid;
                    position: absolute;
                    left: 20px;
                    top: 300px;
                    font-size: 16px;
                    line-height: 50px;
                    color: #faa62f;
                    text-align: center;
                }
            }
        }
        .storeSection{
            width: 100%;
            background-color: #fff;
            .listHead{
                width: calc(100% - 30px);
                margin: 15px auto;
                h4{
                    font-size: 16px;
                    color: #333;
                    text-indent: 1em;
                    line-height: 20px;
                    position: relative;
                    &::before{
                        content: '';
                        display: block;
                        width: 4px;
                        height: 20px;
                        border-radius: 2px;
                        background-color: #ff5e81;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
            }
            .storelist{
                width: calc(100% - 30px);
                max-height: calc(35vh - 50px);
                margin: 0 auto;
                overflow-y: auto;
                .storeItem{
                    width: 100%;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    border-bottom: 1upx #e6e6e6 solid;
                    display: flex;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    .storePic{
                        flex: 1.2;
                        image{
                            width: 100%;
                            border-radius: 5px;
                        }
                    }
                    .storeInfo{
                        margin-left: 10px;
                        width: calc(100% - 100px);
                        .itemTop{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .itemName{
                                width: 66%;
                                font-size: 16px;
                                font-weight: 600;
                                color: #333;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .distance{
                                color: $uni-text-color-grey;
                                font-size: 12px;
                            }
                        }
                        .address{
                            width: 100%;
                            font-size: 14px;
                            color: #333;
                            overflow: hidden;
                            -webkit-line-clamp: 2;
                            text-overflow: ellipsis;
                            padding-top: 8px;
                        }
                        .business{
                            width: 60px;
                            .uni-tag{
                                padding: 0 6px;
                                height: 24px;
                                font-size: 14px;
                                line-height: 24px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
