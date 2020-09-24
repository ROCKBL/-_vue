import request from '@/utils/request'

// 优惠券接口
	export function cdelete(data) {
	    return request({
	      	url: '/manage/coupon/delete',
	      	method: 'delete',
	      	params:data
	    })
	}

	export function cmodify(data) {
	    return request({
	      	url: '/manage/coupon/modify',
	      	method: 'post',
	      	data:data
	    })
	}

	export function cpage(data) {
	    return request({
	      	url: '/manage/coupon/page',
	      	method: 'get',
	      	params:data
	    })
	}

	export function cpublish(data) {
	    return request({
	      	url: '/manage/coupon/publish',
	      	method: 'post',
	      	data:data
	    })
	}

	export function cupload(data) {
	    return request({
	      	url: '/manage/coupon/upload',
	      	method: 'post',
	      	params:data
	    })
	}


// 已使用优惠券接口
	export function cudelete(data) {
	    return request({
	      	url: '/manage/coupon/use/delete',
	      	method: 'post',
	      	params:data
	    })
	}

	export function cupage(data) {
	    return request({
	      	url: '/manage/coupon/use/page',
	      	method: 'get',
	      	params:data
	    })
	}

	export function cuupload(data) {
	    return request({
	      	url: '/manage/coupon/use/upload',
	      	method: 'post',
	      	params:data
	    })
	}