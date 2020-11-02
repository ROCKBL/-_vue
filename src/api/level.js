import request from '@/utils/request'

	export function llist(data) {
	    return request({
	        url: '/manage/level/list',
	        method: 'get',
	        params:data
	    })
	}

	export function lupdate(data) {
	    return request({
	        url: '/manage/level/update',
	        method: 'get',
	        params:data
	    })
	}

	export function lupdateMoney(data) {
	    return request({
	        url: '/manage/level/updateMoney',
	        method: 'get',
	        params:data
	    })
	}