import request from '@/utils/request'

	export function cpage(data) {
	    return request({
	        url: '/manage/commissionRecord/page',
	        method: 'get',
	        params:data
	    })
	}