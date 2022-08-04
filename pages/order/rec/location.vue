<template>
<view class="received">
        <map v-if="covers.length>0" class="mapBox" :latitude="latitude" :longitude="longitude" :markers="covers" scale="12"></map>
    </view>

</template>

<script>
import api from '@/common/apiUtil.js'
    export default {
        data() {
            return {
                latitude: 0,
                longitude: 0,
                scanSty: {
                    width: '70%',
                    height: '40px',
                    marginTop: '10px',
                    backgroundColor: '#15d6ba'
                },
                covers: [],
            }
        }, 
        onLoad(options) {
            this.getLocation(options.id)
        },
        methods: {
            getLocation(id) {
                this.$u.get(api.ADD_ORDER+'/'+id).then(res => {
                    if(res.code == 200) {
                        this.longitude = parseFloat(res.data.consumerLocation.split(',')[0]);
                        this.latitude = parseFloat(res.data.consumerLocation.split(',')[1]);
                        this.covers.push({
                            latitude: this.latitude,
                            longitude: this.longitude,
                            iconPath: '../../../static/qt4.png',
                            width: 40,
                            height: 30
                        });
                        
                        this.covers.push({
                            latitude: parseFloat(res.data.location.split(',')[0]),
                            longitude: parseFloat(res.data.location.split(',')[1]),
                            iconPath: '../../../static/tabBar_icon01_active.png',
                            width: 40,
                            height: 40
                        });
                        
                        console.log(this.covers)
                    }
                })
            },
        }
    }

</script>

<style>
.received{
        width: 100%;
        position: relative;
        .mapBox{
            width: 100%;
            height: 100vh;
        }
    }

</style>
