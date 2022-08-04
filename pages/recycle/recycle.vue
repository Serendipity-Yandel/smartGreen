<template>
	<view id="companyRecycle">
		<view class="cpHead">
			<view class="title">
				<image src="../../static/app_logo.png" mode="widthFix"></image>
				<view style="margin-left: 20px;">公司回收</view>
			</view>
			<view>
				<view class="search">
			<u-search placeholder="请输入搜索内容" :animation="true"
			height="80" shape="square" v-model="keyword"
			 input-align="center"
			@custom="search"  @search="search"></u-search>
				</view>
			</view>
		</view>
<!-- 公司列表 -->
		<view class="companylist">
			<view class="company-item" v-for="item in cpnlist" :key="item.id" @click="gotoDetail(item.id)">
				<view class="item-title">{{item.name}}</view>
				<view class="item-cont">
					<view class="item-img">
						<image :src="$api.SERVER_BASE+item.coverUrl"></image>
					</view>
					<view class="cont-right">
						<view class="right-info">{{item.address}}</view>
						<view class="right-info">营业时间:8:00-16:00</view>
						<view class="right-info">联系电话:{{item.contact}}</view>
					</view>
				</view>
<!-- 跳转上门回收 -->
				<view class="placeOrder">
						<u-button  :customStyle="customStyle"  
						type="primary" @click="gotoFillIn(item.id)">立即下单</u-button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle:{
					backgroundColor:"#36ab60",
					color:'white',
					height:'32px',
					fontsize:'14px',
					borderradius:'16px'
					
				},
				cpnlist:[],
				keyword:'',
				
			}
		},
		onLoad() {
			this.getCompaylist()
			
		},
		methods: {
			
			search(e){//传入搜索内容
				console.log(e)
				uni.navigateTo({
					url:"./searchRes?text="+e//跳转到搜索结果页面
				})
			},
			//查询公司列表
			getCompaylist(){
				this.$u.get(this.$api.GET_COMPANY_LIST).then(res =>{
					if(res.code==200){
						this.cpnlist=res.rows;
					}
				})
			},
			//根据id跳转详情公司
			gotoDetail(id){
				console.log(id)
				uni.navigateTo({
					url:'../company/detail?id='+id
				})
			},
			//跳转公司上门回收
			gotoFillIn(id){
				uni.navigateTo({
					url:"../childPages/fillIn?id="+id
				})
			},
		
		}
	}
</script>

<style scoped>
	#companyRecycle{
		background-color: #F7fafb
	}
	.search{
		width: 100%;
		box-sizing: border-box;
		padding: 30px 20px 15px 20px;
		background-color: rgb(0,194,151);
	}
	.cpHead{
		box-sizing: border-box;
		padding: 20px;
		background-color:  rgb(0,194,151);
	}
	.cpHead	.title{
		font-size: 20px;
		color: #fff;
		display: flex;
		align-items: center;
	}
	
	.cpHead	.title image {
		width: 60px;
	}
	.companylist{
		box-sizing:border-box;
		padding: 0 20px;
		
	}
	.company-item{
		box-sizing: border-box;
		padding: 10px;
		margin: 15px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 1px 8px rgb(14,197,156,0.4);
	}
	.company-item::after{
		content:'';
		display: block;
		clear: both;
	}
	.item-title{
		font-size: 18px;
		border-bottom: 1 rpx #e6e6e6 solid;
		line-height: 36px;
	}
	.item-cont{
		display: flex;
		padding: 5px 0;
		
	}
	.item-img{
		flex: .8;
	}
	.item-img image{
		width: 100%;
		height: 80px;
	}
	.cont-right{
		flex: 2;
		margin-left: 10px;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	}
	.placeOrder{
		width: 30%;
		float: right;
		margin-top: 5px;
		
	}
</style>
