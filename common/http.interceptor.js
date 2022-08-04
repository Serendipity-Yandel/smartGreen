
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://env.cloudsheng.com:5504',
		// method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 是否在拦截器中返回服务端的原始数据                  (ture返回原始数据，则可以看到data数据)
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透

	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		
		vm.token= uni.getStorageSync('token');
		config.header.Authorization=vm.token;
		

		return config; 
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.data.code==200){
			return res.data
		}else if(res.data.code==500){
			vm.$u.toast(res.data.msg)
			
		}else if(res.data.code==401){
			vm.$u.toast(res.data.msg)
		
		}else{
			vm.$u.toast(res.data.msg)
			return false
		}
		
	}
}

export default {
	install
}