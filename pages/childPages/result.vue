<template>
	<view class="page-view">

		<view class="class-item">
			<view class="item-container" v-if="childlist.length>0">
				<view class="thumb-box" v-for="item in childlist">
					<image mode="widthFix" :src="$api.SERVER_BASE+item.icon"></image>
					<view class="item-menu-image">{{item.name}}</view>
				</view>
			</view>
<!-- 无搜索结果 -->
			<view class="emptyBox" v-else>
			<u-empty text="暂无搜索数据" mode="data"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				childlist:[],
			}
		},
		onLoad(options){//options接收First页面传来的e值
			console.log(options.text)//打印搜索内容
			this.getTypelist(options.text);
			
		},
		methods: {
			//获取搜索内容
			getTypelist(str){
				this.$u.get(this.$api.TYPE_LIST,{
					name:str//商品属性名称
				}).then(res=>{//返回搜索商品数据
					console.log(res)
					if(res.code==200&&res.rows.length>0){
						//如果成功则获取该商品的parentId,如搜索的衬衫:parentI=1
						// this.getChildlist(res.rows[0].parentId);//调用函数,传值给id
						if(res.rows[0].parentId==0){
							this.getChildlist(res.rows[0].id)	
						}else{
							this.childlist =res.rows;
						}
					
					}
					
				})
			},
			//获得搜索parentId类的全部商品列表
			getChildlist(id){
				this.$u.get(this.$api.TYPE_LIST,{
					parentId:id
				}).then(res=>{//返回parentId=(1,2,3...)的全部商品的值
					if(res.code==200){
						this.childlist =res.rows;//该将parentId值赋给childlist数组
					}
				})
			}
		}
	}
</script>

<style scoped>
	.page-view{
		padding: 10px;
		border-top: 1px #BBB solid;
	}
	.class-item{
		margin-bottom: 15px;
		background-color: #fff;
		padding: 8px;
		border-radius: 4px;
	}
	.item-container{
		display: flex;
		flex-wrap: wrap;
	}
	.thumb-box{
		width: 33.33%;
		text-align: center;
	}
	.thumb-box image{
		width: 70%;
		
	}
	.emptyBox{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%,-50%,0);
	}
</style>
