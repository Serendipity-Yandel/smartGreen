var baseUrl = 'http://env.cloudsheng.com:5504';

export default {
	SERVER_BASE: baseUrl,
	
	TEST: baseUrl + '/system/news/list',
	
	USER_EXT: baseUrl + '/system/ext',
	// 更新密码
	MOBILEPSW: baseUrl + '/mobileLogin',
	
	//注册
	USER_REGISTER: baseUrl + '/system/user/register',
	
	//登录
	USER_LOGIN: baseUrl + '/loginWithoutCode',
	
	// 获取登录用户
	GET_USER_INFO: baseUrl + '/getInfo',
	
	//获取用户信息
	GET_USER: baseUrl + '/system/user',
	
	// 获取验证码
	GET_CODE: baseUrl + '/system/otp/generate',
	
	// 更新密码
	UPDATEPSW: baseUrl + '/system/user/profile/updatePwd',
	
	//更新用户
	UPUSER_DATA:baseUrl+'/test/user/update',
	
	// 更新手机
	UPDATEPHONE: baseUrl + '/system/user/profile/updateMobile',
	
	//上传
	UPLOAD: baseUrl + '/common/upload',
	//查询公司列表
	GET_COMPANY_LIST: baseUrl + '/system/company/list',
	//查询公司详情
	GET_COMPANY_DETAIL: baseUrl + '/system/company/',
	//查询新闻列表
	GET_NEWS_LIST: baseUrl+'/system/news/list',
	//查询新闻详情
	GET_NEWS_DETAIL: baseUrl+'/system/news/',
	//新增预约单
	ADD_APPOINTMENT: baseUrl+'/system/appointment',
	//新增订单记录
	ADD_ORDER: baseUrl+'/system/order',
	//查询支付记录列表
	GET_ORDER_LIST: baseUrl+'/system/order/list',
	//查询用户下单统计
	GET_ORDER_SUM: baseUrl+'/system/order/sum/',
	//查询骑手订单统计
	GET_EMPLOYEE_SUM: baseUrl+'/system/order/employeeSum/',
	//查询活动列表
	GET_EVENT_LIST: baseUrl+'/system/events/list',
	//查询活动详情
	GET_EVENT_DETAIL: baseUrl+'/system/events/',
	//新增地址
	ADDRESS_ADD: baseUrl+'/system/address',
	//查询地址列表
	ADDRESS_LIST: baseUrl+'/system/address/list',
	//默认地址
	DEFAULT_ADDRESS: baseUrl+'/system/address/defadd',
	//查询回收分类列表
	TYPE_LIST: baseUrl+'/system/type/list',
	//查询兑换列表
	REWARD_LIST: baseUrl+'/system/reward/list',
	//查询兑换详情
	REWARD_DETAIL: baseUrl+'/system/reward/',
	//查询旧物去向列表
	PURPOSE_LIST: baseUrl+'/system/purpose/list',
	//查询旧物去向详情
	PURPOSE_DETAIL: baseUrl+'/system/purpose/',
	//查询回收机列表
	RECLAIMER_LIST: baseUrl+'/system/reclaimer/list',
	//查询回收机详情
	RECLAIMER_DETAIL: baseUrl+'/system/reclaimer/',
	//新增积分使用记录
	ADD_INTEGRAL: baseUrl+'/system/integral',
	//查询积分兑换记录
	GET_EXCHANGE_LIST: baseUrl+'/system/integral/listDetail',
	//查询用户参加几次活动
	GET_INTEGRAL_SUM: baseUrl+'/system/integral/sum/',
	//新增积分
	ADD_INTEGRAL_RECORD: baseUrl+'/system/record',
	//获得积分记录列表
	GET_INTEGRAL_RECORD: baseUrl+'/system/record/list',
	//查询用户总积分
	GET_USER_SCORE: baseUrl+'/system/record/sum/',
	//评价
	SYSTEM_SCORE: baseUrl+'/system/score',
	//贡献
	GET_CONTRIBUTE: baseUrl+'/system/cfg/list'
}
