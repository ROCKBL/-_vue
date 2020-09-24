import request from '@/utils/request'


export function hospitaldelete(data) {
  return request({
    url: '/manage/hospital/delete',
    method: 'delete',
    params:data
  })
}

export function detail(data) {

  var params={
    account:data.username,
    password:data.password
  }
  return request({
    url: '/manage/hospital/detail',
    method: 'get',
    params:params
  })
}

export function list(data) {
  return request({
    url: '/manage/hospital/list',
    method: 'get',
    // params:data
  })
}



export function modify(data) {

  return request({

    url: '/manage/hospital/modify',
    method: 'post',
    params:data
  })
}


export function page(data) {

  	return request({
    	url: '/manage/hospital/page',
    	method: 'get',
    	params:data
  	})
}


export function publish(data) {
  return request({
    url: '/manage/hospital/publish',
    method: 'post',
    // data:data,
    params:data
  })
}

export function upload(data) {

  return request({

    url: '/manage/hospital/upload',
    method: 'post',
    data:data
  })
}


// const uploadUrl="/manage/hospital/upload";

export var uploadUrl="/manage/hospital/upload"