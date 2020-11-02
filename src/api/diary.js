import request from '@/utils/request'

// 日志分类接口
	export function dcdelete(data) {
	    return request({
	      	url: '/manage/diaryCategory/delete',
	      	method: 'delete',
	      	params:data
	    })
	}

	export function dclist(data) {
	    return request({
	      	url: '/manage/diaryCategory/list',
	      	method: 'get',
	      	params:data
	    })
	}
	export function dcmodify(data) {
	    return request({
	      	url: '/manage/diaryCategory/modify',
	      	method: 'post',
	      	params:data
	    })
	}
	export function dcpage(data) {
	    return request({
	      	url: '/manage/diaryCategory/page',
	      	method: 'get',
	      	params:data
	    })
	}
	export function dcpublish(data) {
	    return request({
	      	url: '/manage/diaryCategory/publish',
	      	method: 'post',
	      	params:data
	    })
	}


// 日志接口
	export function dpage(data) {
	    return request({
	      	url: '/manage/diary/page',
	      	method: 'get',
	      	params:data
	    })
	}

	export function dapprove(data) {
	    return request({
	      	url: '/manage/diary/approve',
	      	method: 'post',
	      	params:data
	    })
	}