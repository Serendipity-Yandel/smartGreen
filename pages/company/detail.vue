<template>
	<view>
		<view class="cpHead">
			<view class="company-item">
				<view class="item-title">{{companyDetail.name}}</view>
					<view class="item-cont">
						<view class="item-img">
							<image :src="$api.SERVER_BASE+companyDetail.coverUrl"></image>
						</view>
						<view class="cont-right">
							<view class="right-info">地址:{{companyDetail.address}}</view>							
							<view class="right-info">联系电话:{{companyDetail.contact}}</view>
							<view class="right-info">评价:{{companyDetail.score}}</view>
						</view>
					</view>
			
		</view>
	</view>
	<view  class="introduce">
		<view>
			{{companyDetail.introduction}}
		</view>
	</view>
	<view class="appointBtn">
		<u-button @click="gotoFillIn(companyDetail.id)" :customStyle="customStyle" type="primary">上门预约回收</u-button>
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
				},
				companyDetail:{},
			}
		},
		onLoad(options) {
			console.log(options)//接收recycle页面的{id:'1'}
			console.log(options.id)//取出id值
			this.getcompanyDel(options.id)//传取出的值到函数中
			
		},
		methods: {
			//获取某id公司详细信息
			getcompanyDel(id){
				this.$u.get(this.$api.GET_COMPANY_DETAIL+id).then(res =>{
					if(res.code==200){
						this.companyDetail=res.data;
					}
				})
			},
			//跳转上门预约回收id公司
			gotoFillIn(id){
				uni.navigateTo({
					url:"../childPages/fillIn?id="+id
				})
			}
		}
	}
</script>

<style scoped>
	.cpHead{
		box-sizing: border-box;
		padding: 20px;
		background-color: rgb(0,194,151);
	}

	.item-title{
		font-size: 18px;
		color: #fff;
		line-height: 36px;
	}
	.item-cont{
		display: flex;
		padding: 5px 0;
		margin-top: 10px;
		
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
		color: #fff;
	}
	.introduce{
		box-sizing: border-box;
		padding: 20px;
		
	}
	.appointBtn{
		width: calc(100%,-40%);
		position: fixed;
		left: 20px;
		right: 20px;
		bottom: 20px;
		
	}
</style>
