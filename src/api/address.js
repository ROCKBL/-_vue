import request from '@/utils/request'


	export function apage(data) {
	    return request({
	      	url: '/manage/address/page',
	      	method: 'get',
	      	params:data
	    })
	}