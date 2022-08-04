<template>
	<view class="content">
		<!-- 搜索 -->
		<view style="margin-bottom: 8px; margin-top: 5px;" >
			<u-search
			placeholder="请输入搜索内容" 
			shape="round"  @search="search"
			@custom="search"  :animation="true"
			height="90" v-model="keyword"  input-align="center"
			search-icon-color="green"
		></u-search>
		</view>
		<!-- 公司 -->
		<view class="companylist" v-if="cpnlist.length>0">
			<view class="company-item" v-for="item in cpnlist" :key="item.id" @click="gotoDetail(item.id)" >
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
				<view class="placeOrder">
						<u-button  :customStyle="customStyle"  
						type="primary">立即下单</u-button>
				</view>
			</view>	
		</view>
		<view class="emptyBox" v-else>
		<u-empty text="暂无搜索数据" mode="data"></u-empty>
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
		//获得之前页面参数
		onLoad(options) {
			console.log(options.text)
			this.getCompanylist(options.text)//通过接收获得前页面搜索内容，并调用函数实现搜索
			
		},
		methods: {
			//本页面实现搜索
			search(e){//e--------->表示该页面键盘获得搜索内容
				this.getCompanylist(e)//通过键盘内容调用该函数实现搜索
			},
			//根据搜索内容获取公司全部数据
			getCompanylist(str){
				this.$u.get(this.$api.GET_COMPANY_LIST,{
					name:str
				}).then( res =>{
					if(res.code==200){
						this.cpnlist=res.rows;
					}
				})
			},
			//通过id跳转到公司详情页
			gotoDetail(id){
				uni.navigateTo({
					url:"../company/detail?id="+id
				})	
			}
		}
	}
</script>

<style scoped>
	.content{
		border-top: 1px #BBB solid;

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
	.emptyBox{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%,-50%,0);
	}
</style>
