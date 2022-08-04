<template>
	<view class="userCenter">
		
		<view class="userCard">
			<view class=" u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
<!-- 上传头像 -->				
				<view class="u-m-r-10" @click="uploadAvatar">
					<u-avatar :src="pic" size="140" ></u-avatar>
					<!-- <u-upload :action="$api.UPLOAD" :max-count="1" @on-success="uploadSuccess" :show-upload-list="true"></u-upload> -->
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">{{userName}}</view>
					<view class="u-font-14 ">手机号:{{phone}}</view>
				</view>
				<view class="u-m-l-10 u-p-10" @click="gotosignIn">
					<text>签到</text>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#fff" size="28"></u-icon>
				</view> 
			</view>
		
		
			<view class="overview">
				   <view class="view-item">
					   <view>{{revenue}}</view>
					   <view>累计收益</view>
				   </view>
				   <view class="view-item">
				   	    <view>{{orderTimes}}</view>
				   	    <view>回收次数</view>
				   </view>
				   <view class="view-item">
				   	    <view>{{totalScore}}</view>
				   	    <view>积分</view>
				   </view>
			</view>
		</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="star" title="积分记录"  @click="gotoInteral"></u-cell-item>
					<u-cell-item icon="photo" title="兑换记录" @click="gotoexchange"></u-cell-item>
					<u-cell-item  icon="coupon" title="我的贡献" @click="gotocontribute"></u-cell-item>
					<u-cell-item icon="heart" title="收入记录" @click="gotoincomRcd"></u-cell-item>
					<u-cell-item icon="setting" title="设置" @click="gotomySeting"></u-cell-item>
				</u-cell-group>
			</view>

			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'',
				show:true,
				userName:'',
				phone:'',
				orderTimes:0,
				revenue:0,
				totalScore:0,
				
			}
		},
		onLoad() {
		  this.userName=uni.getStorageSync('info').nickName;
		  this.phone=uni.getStorageSync('info').phoneNumber;
// this.pic=uni.getStorageSync("info").avatar !="" ? uni.getStorageSync("info").avatar : 'https://uviewui.com/common/logo.png';
		  // this.pic=uni.getStorageSync("info").avatar =="" ? 'https://uviewui.com/common/logo.png' : uni.getStorageSync("info").avatar
		  this.pic=uni.getStorageSync("avatar")
		
		  // this.pic=uni.getStorageSync("avatar")
		this.pic=uni.getStorageSync("info").avatar==""?uni.getStorageSync("avatar") : uni.getStorageSync("info").avatar
		  this.getOrderSum();
		  this.getTotalScore();
		  
		},
		methods: {
			//获得积分数量
			getOrderSum(){
				let userId=uni.getStorageSync('info').userId;
				this.$u.get(this.$api.GET_ORDER_SUM+userId).then(res =>{
					console.log(res)
					if(res.code=200){
						this.orderTimes=res.data[0].count
						this.revenue=res.data[0].good_number_sum;
					}
				})
			},
			//查询用户总积分
			getTotalScore(){
				let userId=uni.getStorageSync('info').userId;
				console.log(userId)
				this.$u.get(this.$api.GET_USER_SCORE+userId).then(res =>{
					console.log(res)
					if(res.code=200){
						this.totalScore=res.data[0].sum;
					}
				})
			},
			//上传头像

			// uploadAvatar(){
			// uni.chooseImage({
			// 	count: 1, //最多可以选择的图片张数，默认9
			// 	sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			// 	sizeType: ['original'],//original 原图，compressed 压缩图，默认二者都有
			// 	success(res) {
			// 		console.log('选择图片完成', res)
			// 		// 调用上传图片的接口
			// 		this.uploadPhoto(res.tempFilePaths);
			// 	},
			// 	fail() {
			// 		console.log('失败', err);
			// 	},
			// 	complete() {
			// 		console.log('结束');
			// 			},
			// 	})
			// },
					uploadAvatar() {
						uni.chooseImage({
							sourceType: ['album'], //从相册选择
							sizeType: ['original'],//original 原图，compressed 压缩图，默认二者都有
							success: chooseImageRes => {
								console.log('成功', chooseImageRes);
								const tempFilePaths = chooseImageRes.tempFilePaths;
								uni.uploadFile({
									url: 'http://env.cloudsheng.com:5504/common/upload', //仅为示例，非真实的接口地址
									filePath: tempFilePaths[0],
									name: 'file',
									header: {
										accessToken: uni.getStorageSync('token'),
										platform: 2,
										type: 1
									},
									formData: {
										category: 3
									},
									success: res => {
										// console.log('上传成功', JSON.parse(res.data));
										// uploadFile上传成功后，根据和后台的约定msgCode判断接口调用状态
										let data = JSON.parse(res.data);
										console.log(data)
										this.pic=data.url
										uni.setStorage({
											key:'avatar',
											data:data.url
										})
										
										// // 成功：获取到头像
										// if (data.msgCode == 200) {
										// 	this.updateParams.headImg = JSON.parse(res.data).data;
										// 	// 更新当前页面数据
										// 	this.updateUserInfo();
										// }
										// // 失败报错
										// if (data.msgCode == 500) {
										// 	this.myToast(data.msgContent, 'none');
										// }
										// // 登陆过期
										// if (data.msgCode == 311 || data.msgCode == 312) {
										// 	myToast(
										// 		data.msgContent,
										// 		'none',
										// 		() => {
										// 			const res = uni.getStorageInfoSync();
										// 			for (let s of res.keys) {
										// 				// 保留账号密码
										// 				if (s === 'pwd' || s === 'lang') {
										// 					// console.log('保留账号密码', s)
										// 				} else {
										// 					uni.removeStorageSync(s);
										// 				}
										// 			}
										// 			uni.reLaunch({
										// 				url: '/pages/group/index'
										// 			});
										// 		},
										// 		1000
										// 	);
										// }
									}
								});
							},
							
						});
					},
			//上传头像
			uploadAvatar() {
				uni.chooseImage({
					sourceType: ['album'], //从相册选择
					sizeType: ['original'],//original 原图，compressed 压缩图，默认二者都有
					success: chooseImageRes => {
						console.log('成功', chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						//上传
						uni.uploadFile({
							url: 'http://env.cloudsheng.com:5504/common/upload', //上传接口
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								accessToken: uni.getStorageSync('token'),
							},
							success: res => {//返回成功的参数
								console.log(res)
								// console.log('上传成功', JSON.parse(res.data));
								// uploadFile上传成功后，根据和后台的约定msgCode判断接口调用状态
								let data = JSON.parse(res.data);
								console.log(data)
								this.pic=data.url
								uni.setStorageSync("avatar",data.url)
								this.UpdataUser()
							}
						});
					},
					
				});
			},
			//更新用户信息(有点问题)
			UpdataUser(){
				const userId=uni.getStorageSync("info").userId
				this.$u.put(this.$api.UPUSER_DATA+"?avatar="+this.pic+"&userId="+userId).then(res =>{
					if(res.code==200){
						console.log(res)
					}
				})
			},

			//跳转签到
			gotosignIn(){
				uni.navigateTo({
					url:"../childPages/center/signIn"
				})
			},
			//跳转积分记录
			gotoInteral(){
				uni.navigateTo({
					url:"../childPages/center/IntegralRcd"
				})
			},
			//跳转兑换记录
			gotoexchange(){
				uni.navigateTo({
					url:"../childPages/center/exchange"
				})
			},
			//跳转我的贡献度
			gotocontribute(){
				uni.navigateTo({
					url:"../childPages/center/contribute"
				})
			},
			//跳转收入记录
			gotoincomRcd(){
				uni.navigateTo({
					url:"../childPages/center/incomeRcd"
				})
			},
			//跳转设置
			gotomySeting(){
				uni.navigateTo({
					url:"../childPages/center/mySeting"
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	padding-top: 10px;
	color: #fff;
}
.userCenter{
	box-sizing: border-box;
	padding: 0 15px;
	background-color: #fff;
	overflow: hidden;
}

.userCard{
	margin: 15px auto;
	background-color: #71d9ca;
	border-radius: 10px;
	padding-bottom: 10px;
}
.overview{
	display: flex;
	align-items: center;
	padding-top: 15px;
}
.view-item{
	flex: 1;
	font-size: 16px;
	text-align: center;
	color: #fff;
	line-height: 24px;
}



</style>
