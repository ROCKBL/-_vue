import request from '@/utils/request'
	
	export function cidelete(data) {
	    return request({
	      	url: '/manage/carouselImage/delete',
	      	method: 'delete',
	      	params:data
	    })
	}

	export function cimodify(data) {
	    return request({
	      	url: '/manage/carouselImage/modify',
	      	method: 'post',
	      	params:data
	    })
	}

	export function cipage(data) {
	    return request({
	      	url: '/manage/carouselImage/page',
	      	method: 'get',
	      	params:data
	    })
	}

	export function cipublish(data) {
	    return request({
	      	url: '/manage/carouselImage/publish',
	      	method: 'post',
	      	params:data
	    })
	}

	export function ciupload(data) {
	    return request({
	      	url: '/manage/carouselImage/upload',
	      	method: 'post',
	      	params:data
	    })
	}


	export var uploadUrl="/manage/carouselImage/upload"