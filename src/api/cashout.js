import request from '@/utils/request'
	// 分佣提现设置
	export function sinfo(data) {
	    return request({
	      	url: '/manage/sysConfiguration/info',
	      	method: 'get',
	      	params:data
	    })
	}

	export function smodify(data) {
	    return request({
	      	url: '/manage/sysConfiguration/modify',
	      	method: 'get',
	      	params:data
	    })
	}


	// 提现申请
	export function bwapprove(data) {
	    return request({
	      	url: '/manage/bankWithdraw/approve',
	      	method: 'post',
	      	params:data
	    })
	}
	export function bwpage(data) {
	    return request({
	      	url: '/manage/bankWithdraw/page',
	      	method: 'get',
	      	params:data
	    })
	}
