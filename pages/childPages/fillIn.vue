<template>
	<view class="formWrap">
		<u-form :model="form" ref="uForm" label-width="160">
<!-- 表单 -->
			<u-form-item label="物品类别" prop="type">
				<u-input type="select" v-model="form.type" @click="typeshow=true" placeholder="请选择物品类别"></u-input>
				<u-picker mode="selector" v-model="typeshow"  @confirm="typeCfm" :default-selector="[0]" :range="typelist"></u-picker>
			</u-form-item>
			
			<u-form-item label="联系人" prop="name">
				<u-input v-model="form.name" placeholder="请输入"></u-input>
			</u-form-item>
			
			<u-form-item label="电话号码" prop="phone">
				<u-input v-model="form.phone" placeholder="请输入"></u-input>
			</u-form-item>
			
			<u-form-item label="上门地址" prop="address">
				<u-input v-model="form.address" placeholder="请输入"></u-input>
			</u-form-item>
			
			<u-form-item label="上门时间" prop="time">
				<u-input type="select" v-model="form.time" @click="timeshow=true" placeholder="请选择上门时间"></u-input>
				<u-picker mode="selector" v-model="timeshow" @confirm="timeCfm"  :default-selector="[0]" :range="timelist"></u-picker>
			</u-form-item>
			
			<u-form-item label="物品重量" prop="weight">
				<u-input v-model="form.weight" placeholder="请输入"></u-input>
			</u-form-item>
			
			<u-form-item label="物品件数" prop="number">
				<u-input v-model="form.number" placeholder="请输入"></u-input>
			</u-form-item>
		</u-form>
	<!-- 上传图片 -->
		<view style="margin: 15px auto;">
			<u-upload :action="$api.UPLOAD" :max-count="1" @on-success="uploadSuccess" :show-upload-list="true"></u-upload>
		</view>
	<!-- 文本框输入其他信息 -->		
		<view class="details">
			<textarea v-model="content" placeholder="请输入其他信息"></textarea>
		</view>
		
		<view class="appointBtn">
			<u-button  type="primary" :customStyle="customStyle" @click="oppointment">立即预约</u-button>
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
				//经纬度
				latitude:39.909,
				longitude:116.3974,
				
				//form和rules要一起使用
				form:{//整个表单属性集合
					type:'',
					name:"",
					phone:'',
					address:'',
					time:'',
					weight:'',
					number:'',
					
				},
				rules: {
					type:[{required: true,message:'请选择物品类别',trigger:['blur']}],
					name:[{required: true,message:'请输入联系人',trigger:['blur']}],
					phone:[{required: true,message:'请输入电话号码',trigger:['blur']}],
					address:[{required: true,message:'请输入上门地址',trigger:['blur']}],
					time:[{required: true,message:'请选择上门时间',trigger:['blur']}],
					weight:[{required:true,message:'请输入物品重量',trigger:['blur']}],
					number:[{required:true,message:'请输入物品件数',trigger:['blur']}],
				},
				typeshow:false,
				timeshow:false,
				typelist:[],
				typeData:[],
				typeId:null,
				unitPrice:null,
				
				timelist:['8:00-10:00','10:00-12:00','14:00-16:00','16:00-18:00'],
				photoUrl:'',
				content:"",
				companyId:null
				
				
			}
		},
		onReady() {
			//校验
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			this.companyId=options.id
			this.getTypelist()
			this.getLocation()
		},
		methods: {
			//获取位置
			getLocation(){
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
						success: function (res) {
							console.log('当前位置的经度：' + res.longitude);
							console.log('当前位置的纬度：' + res.latitude);
							this.latitude=res.altitude;
							this.longitude=res.longitude;
						}
				})
			},
			//查询分类表单列表
			getTypelist(){
				this.$u.get(this.$api.TYPE_LIST).then( res =>{
					console.log(res)
					if(res.code==200){
						this.typeData=res.rows;
						res.rows.forEach(item =>{//通过foreach遍历rows 把name属性添加到typelist数组中
							this.typelist.push(item.name)
						})
					}
				})
			},
			//选择物品列表
			typeCfm(e){
				this.form.type =this.typelist[e[0]];
				this.typeId =this.typeData[e[0]].id;
				this.unitPrice=this.typeData[e[0]].goodUnitPrice;
			},
			//选择时间列表
			timeCfm(e){
				this.form.time =this.timelist[e[0]];
			},
			//上传头像
			uploadSuccess(data){
				uni.showToast({
					title:'图片上传成功！',
					icon:"success"
				})
				console.log(data)
				this.photoUrl=data.fileName;
			},
			//下单数据获取
			oppointment(){ 
				let userId=uni.getStorageSync('info').userId;//获取用户id
				//校验
				this.$refs.uForm.validate(valid =>{
					if(valid){
						this.$u.post(this.$api.ADD_ORDER,{
							channel:1,//订单来源
							consumerLoaction:this.longitude+','+this.latitude,//经纬度
							companyId:this.companyId,//公司ID
							pickupAddress:this.form.address,//取货地址
							pickupTime:this.form.time,//取货时间
							contact:this.form.phone,//联系电话
							createBy:this.form.name,//联系人
							goodTypeId:this.typeId ,//回收类型ID
							goodTyprName:this.form.type,//回收类型名称
							goodUnitPrice:this.unitPrice ,//回收物品单位价格
							coverUrl:this.photoUrl,//回收物品图片-订单封面
							pkgs:this.form.number,//件数
							remark:this.content,//备注
							goodNumber:this.form.weight,//重量
							state:1,
							userId:userId
						}).then( res =>{
							if(res.code==200){
								uni.showToast({
									title:'预约成功',
									icon:"success"
								})
							}else{
								uni.showToast({
									title:"预约失败，请重试",
									icon:"error"
								})
							}
						})
					}
				})
			}
			
},
}
</script>
<style lang="scss" scoped >
	.formWrap{
		box-sizing: border-box;
		padding: 0 15px 70px 15px;
	}
	.details{
		border: 1px #BBBBBB solid;
		border-radius: 5px;
		padding: 10px 0 0 10px;
	}
	.appointBtn{
		width: calc(100%,-40%);
		position: fixed;
		left: 20px;
		right: 20px;
		bottom: 20px;
		
	}
</style>
