import request from '@/utils/request'

	export function fdelete(data) {
	    return request({
	      	url: '/manage/freight/delete',
	      	method: 'post',
	      	params:data
	    })
	}

	export function fdetails(data) {
	    return request({
	      	url: '/manage/freight/details',
	      	method: 'post',
	      	params:data
	    })
	}

	export function fpage(data) {
	    return request({
	      	url: '/manage/freight/page',
	      	method: 'post',
	      	params:data
	    })
	}

	export function fsave(data) {
	    return request({
	      	url: '/manage/freight/save',
	      	method: 'post',
	      	data:data
	    })
	}