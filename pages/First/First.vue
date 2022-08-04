<template>
<!-- 总大容器 -->
	<view class="container">
<!-- 导航栏 -->		
	<u-navbar title="首页":is-back="false"  :background="background" 
	style="border-bottom: #BBBCBE ; margin-bottom: 5px;"></u-navbar>
<!-- 搜索 -->
		<view style="margin-bottom: 8px;" >
			<u-search
			placeholder="请输入搜索内容" 
			shape="round"  @search="search"
			@custom="search" v-model="keyword"
			height="90"  :animation="true" input-align="center" 
			search-icon-color="green"
		></u-search>
		</view>
<!--轮播图-->	
	<view class="swiper">
		<u-swiper :list="list" :effect3d="true"></u-swiper>
<!-- 中间模块部分 -->		
	<view class="char">
		<view class="char_item" @click="gotorecylingMenu">
			<image mode="widthFix" src="../../static/icons/Recycling_classification.png"></image>
			<view>回收分类</view>
		</view>
		<view class="char_item" @click="gotoindex">
			<image mode="widthFix" src="../../static/icons/Old_things.png"></image>
			<view>旧物去向</view>
		</view>
		<view class="char_item" @click="gotorecycle">
			<image mode="widthFix" src="../../static/icons/Recycling_machine.png"></image>
			<view>附近回收机</view>
		</view>
		<view class="char_item" @click="gotoStore">
			<image mode="widthFix" src="../../static/icons/Shopping_Mall.png"></image>
			<view>积分商城</view>
		</view>
	</view>
	</view>
	
	<view class="buttonWarp">
		<u-button type="primary" size="default" 
		:custom-style="customStyle" @click="gotoFillIn()"
		shape="circle">预约上门收</u-button>
<!-- 预约上门具体实现 -->		
	<view class="char">
		<view>
			<u-icon name="bell" size="40" label="在线预约" label-pos="right" margin-top="20"></u-icon>
			<view class="text">
				<text>第一步</text>
			</view>
		</view>
		<view>
			<u-icon name="car" size="40" label="免费上门" margin-top="20" label-pos="right"></u-icon>
			<view class="text">
				<text>第二步</text>
			</view>
		</view>
		<view>
			<u-icon name="coupon" size="40" label="订单完成" margin-top="20" label-pos="right"></u-icon>
			<view class="text">
				<text>第三步</text>
			</view>
		</view>
		<view>
			<u-icon name="gift" size="40" label="用户福利" margin-top="20" label-pos="right"></u-icon>
			<view class="text">
				<text>第四步</text>
			</view>
		</view>
	</view>
<!-- 爱心活动 -->	
		<view class="activeWrap" >
	 	<view class="actTitle">爱心活动</view>
			<view class="actlist">
				<view class="act_item" v-for="item in activelist" :key="item.id" @click="gotosport(item.id)">
		<u-image width="100%" height="150px"  border-radius="15px" :src="$api.SERVER_BASE+item.coverUrl"></u-image>
				<view>{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
import api from "../../common/apiUtil.js"
	export default {
		data() {
			return {
				keyword:'',
				activelist:[],
				customStyle:{
					backgroundColor:"#36ab60",
					color:'white'
				},
				
				background: {
				//设置默认颜色			
				backgroundColor: '#fff',		
				},
				list:['../../static/swt1.jpg','../../static/swt2.jpg','../../static/swt3.jpg']
			}
		},
		onLoad() {
			this.getActivelist();
		},
		methods: {
			//搜索跳转结果页
			search(e){//e表示搜索的内容
				uni.navigateTo({
					url:'../childPages/result?text='+ e
				})
			},
			//获取活动数据列表
			getActivelist(){
				this.$u.get(api.GET_EVENT_LIST).then(res =>{
					console.log(res)
					
					if(res.code==200){
						this.activelist=res.rows;
					}
				})
			},
			//跳转到上门收货
			gotoFillIn(){
				uni.navigateTo({
					url:'../childPages/fillIn'
				})
			},
			//跳转回收分类
			gotorecylingMenu(){
				uni.navigateTo({
					url:"../First/menu/recyclingMenu"
				})
			},
			//跳转旧物去向
			gotoindex(){
				uni.navigateTo({
					url:"../First/goto/index"
				})
			},
			//跳转附近回收机
			gotorecycle(){
				uni.navigateTo({
					url:"../First/recycle/index"
				})
			},
			//跳转积分商城
			gotoStore(){
				uni.navigateTo({
					url:"../First/store/index"
				})
			},
			//跳转活动详情
			gotosport(id){
				uni.navigateTo({
					url:"../First/sport/detail?id="+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.swiper {
        padding: 20px;
        background-color: #F4F4F5;
    }

.char{
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
}
.char_item{
	flex: 1;
	width: 60%;
	text-align: center;
	font-size: 14px;
	color: #888;
}
.char_item image{
	width: 60%;
}
.buttonWarp{
	margin: 20px;
}
.char .text{
	text-align: center;
}
.activeWrap{
	padding: 0 15px;
}
.actTitle{
	margin-top: 15px;
	font-size: 16px;
	line-height: 24px;
	margin-bottom: 15px;
	text-indent: .5em;
}
.actTitle::before{
	content: '';
	display: flex;
	width: 4px;
	height: 24px;
	border-left: 3px rgb(0,194,151) solid;
	float: left;
}
.act_item{
	margin-bottom: 10px;
}
</style>
