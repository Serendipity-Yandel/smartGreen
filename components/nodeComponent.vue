<template>

	<view class="container">
		<view style="font-size: 20px; font-weight: 700; margin-top: 10px;">{{title}}</view>
		<view>作者：{{auth}}</view>
		<view style="color: #AAAAAA;">{{$u.timeFormat(nodeData.updateTime,'yyyy-mm-dd')}}</view>
		<view v-if="imageUrl != null && imageUrl != undefined && imageUrl != ''">
			<!-- <image style="width: 100%;" height="300rpx" :src="imageApi + imageUrl"></image> -->
			<image style="width: 100%;" height="300rpx" :src="imageUrl"></image>
		</view>
		
		<view style='word-break:break-all; margin-top: 20px;'>
			{{bookContentSub}}
		</view>
		<view v-if="content != null && content.length > 100 && content.length !=bookContentSub.length">
			<view class="buttonWarp" @click="more"> <text>查看更多</text> </view>
		</view>
	</view>
</template>

<script>
	import api from '../common/apiUtil.js'
	export default {
		
		props: {
			imageUrl: {
				type: String,
				default:'',
			},
			id: {
				type:Number,
				default:0,
			},
			title: {
				type:String,
				default:''
			},
			auth: {
				type:String,
				default:''
			},
			content: {
				type:String,
				default:'',
			}
		},
		
		data() {
			return {
				imageApi: api.SERVER_BASE,
				nodeData: {},
				buttonStyle:{
					marginTop: '30%',
				},
				bookContentSub: '',
				end: '',
				start: '',
			}
		},
	
		created() {
			this.end = 98;
			this.start = 0;
			this.bookContentSub = this.content.substring(this.start,this.end);
		},
	
		methods: {
			goEdit() {
				uni.navigateTo({
					url: '/childPages/node/nodeEdit?id=' + this.nodeData.id
				})
			},
			more() {
				this.end+=98;
				this.start +=98;
				this.bookContentSub += this.content.substring(this.start,this.end);
			},
			filterTags(str) {
				if (str.length > 20) {
					str = str.substring(0, 15);
					str = str + "..."
				}
				return str.replace(/\<p>/g, '');
			},
		},
		
	}
</script>

<style lang='scss' scoped>
	
	.buttonWarp {
		color: #B3B3B3; 
		text-align: center; 
		font-size: 15px; 
		margin-top: 20px; 
		padding-bottom: 20px;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}


	.container {
		margin: 0 12px 0 12px;
		font-size: 14px;
		line-height: 24px;
		height: 700px;
	}

	
</style>
