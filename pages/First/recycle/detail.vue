<template>
	<view class="received">
	<map class="mapBox" :latitude="workerData.latitude" :longitude="workerData.longitude" :markers="markers" :polyline="polyline">
	            <cover-view class="storePopup"></cover-view>
	            <cover-view class="storeName">距离{{distance}}米</cover-view>
	            <cover-image class="storePic" :src="baseUrl+workerData.coverUrl"></cover-image>
	            <cover-view class="storeAddress">{{workerData.address}}</cover-view>
	        </map>
	        <view class="BookingFooter">
	            <u-button :custom-style="scanSty" @click="saCode" type="primary">扫码回收</u-button>
	        </view>
	    </view>

</template>

<script>
	import api from '../../../common/apiUtil.js';
	    import Amap from '../../../common/lyn4ever-gaode.js';
	    export default {
	        data() {
	            return {
	                baseUrl: api.SERVER_BASE,
	                scanSty: {
	                    width: '70%',
	                    height: '40px',
	                    marginTop: '10px',
	                    backgroundColor: '#15d6ba'
	                },
	                markers: [],
	                polyline: [],
	                workerData: {},
	                deviceId: '',
	                distance: 0,
	                machineId: null
	            }
	        }, 
	        onLoad(options) {
	            this.machineId = options.id;
	            uni.$on('storeInfo',res => {
	                this.getOrderInfo(res.data)
	            })
	        },
	        methods: {
	            getOrderInfo(data) {
	                let that = this;
	                this.workerData = data;
	                this.getDistance(data.latitude,data.longitude,data.oldLat,data.oldLog);
	                //当前线路起点
	                let startPoi = this.workerData.longitude+','+this.workerData.latitude;
	                //当前线路的过程(不用一条一条写，写入就会有一个'经'的小小图标显示)
	                let wayPoi = "";
	                //当前线路结束
	                let endPoi = this.workerData.oldLog+','+this.workerData.oldLat;
	                
	                Amap.line(startPoi, endPoi, wayPoi,function(res){
	                    that.polyline.push(res)
	                });
	                        
	                Amap.markers(startPoi,endPoi,wayPoi,function(res){
	                    that.markers.push.apply(that.markers,res)
	                });
	            },
	            getDistance( lat1,  lng1,  lat2,  lng2){
	                var radLat1 = lat1*Math.PI / 180.0;
	                var radLat2 = lat2*Math.PI / 180.0;
	                var a = radLat1 - radLat2;
	                var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
	                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
	                Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	                s = s *6378.137 ;// EARTH_RADIUS;
	                s = Math.round(s * 10000) / 10000;
	                this.distance = (s*1000).toFixed(1);
	            },
	            saCode(){
	                //#ifdef APP-PLUS
	                var vm = this;
	                uni.scanCode({
	                    success: function (res) {
	                        uni.navigateTo({
	                            url: 'machine?num='+res.result+'&id='+vm.machineId
	                        })
	                    }
	                });
	                //#endif
	                
	                //#ifdef H5 || MP-WEIXIN
	                uni.navigateTo({
	                    url: 'machine?id='+this.machineId+'&num='+2345
	                })
	                //#endif
	            }
	        }
	    }

</script>

<style scoped>
.received{
        width: 100%;
        position: relative;
        .mapBox{
            width: 100%;
            height: calc(100vh - 60px);
            .storePopup{
                width: calc(100% - 40px);
                height: 160px;
                background-color: #fff;
                border-radius: 20px;
                position: absolute;
                left: 20px;
                bottom: 55px;
            }
            .storeName{
                display: flex;
                font-size: 18px;
                font-weight: 600;
                line-height: 34px;
                color: #333;
                position: absolute;
                left: 40px;
                bottom: 175px;
                .distance{
                    color: #ff5e81;
                    line-height: 34px;
                }
            }
            .storePic{
                width: 90px;
                height: 90px;
                border-radius: 8px;
                position: absolute;
                left: 40px;
                bottom: 75px;
            }
            .clock{
                display: flex;
                position: absolute;
                right: 40px;
                bottom: 180px;
                .text{
                    font-size: 14px;
                    color: #999;
                }
                .timeNum{
                    color: #ff5e81;
                }
            }
            .storeAddress,.storeTel,.contact{
                font-size: 16px;
                line-height: 30px;
                color: #000;
                white-space: normal;
                position: absolute;
                left: 144px;
                bottom: 90px;
                &.storeAddress{
                    width: 200px;
                }
                &.storeTel{
                    bottom: 105px;
                }
                &.contact{
                    bottom: 71px;
                    font-size: 14px;
                    color: #ff5e81;
                }
            }
            .orderNum{
                font-size: 14px;
                line-height: 30px;
                color: #999;
                position: absolute;
                right: 40px;
                bottom: 139px;
            }
            .starlevel{
                display: flex;
                position: absolute;
                right: 40px;
                bottom: 78px;
                .starIcon{
                    width: 22px;
                    height: 16px;
                }
                .starNum{
                    font-size: 14px;
                    line-height: 16px;
                    color: #999;
                }
            }
            .prompt{
                width: calc(100% - 40px);
                height: 40px;
                background-color: #fff;
                border-radius: 6px;
                font-size: 14px;
                line-height: 40px;
                color: #999;
                text-indent: 1em;
                position: absolute;
                left: 20px;
                bottom: 7px;
                /* #ifdef APP-PLUS */
                left: 10px;
                padding-left: 10px;
                /* #endif */
            }
        }
        .BookingFooter{
            width: 100%;
            height: 60px;
            background-color: #fff;
            border-top: 1upx #e6e6e6 solid;
        }
    }

</style>
