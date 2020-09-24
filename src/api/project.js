import request from '@/utils/request'

// 项目分类接口
export function sortdelete(data) {
  return request({
    url: '/manage/projectCategory/delete',
    method: 'delete',
    params:data
  })
}

export function sortdetail(data) {

  var params={
    account:data.username,
    password:data.password
  }
  return request({
    url: '/manage/projectCategory/detail',
    method: 'get',
    params:params
  })
}

export function sortlist(data) {

  return request({
    url: '/manage/projectCategory/list',
    method: 'get',
    // params:params
  })
}



export function sortmodify(data) {
  return request({
    url: '/manage/projectCategory/modify',
    method: 'post',
    params:data
  })
}


export function sortpage(data) {

  	return request({
    	url: '/manage/projectCategory/page',
    	method: 'get',
    	params:data
  	})
}


export function sortpublish(data) {
  return request({
    url: '/manage/projectCategory/publish',
    method: 'post',
    // data:data,
    params:data
  })
}

export function sortupload(data) {

  var params={
    account:data.username,
    password:data.password
  }
  return request({

    url: '/manage/projectCategory/upload',
    method: 'post',
    params:params
  })
}

export var sortuploadUrl="/manage/projectCategory/upload"


// 项目接口

export function projectdelete(data) {
  return request({
    url: '/manage/project/delete',
    method: 'delete',
    params:data
  })
}

export function projectdetail(data) {

  var params={
    account:data.username,
    password:data.password
  }
  return request({
    url: '/manage/project/detail',
    method: 'get',
    params:params
  })
}


export function projectmodify(data) {
  return request({
    url: '/manage/project/modify',
    method: 'post',
    params:data
  })
}


export function projectpage(data) {

    return request({
      url: '/manage/project/page',
      method: 'get',
      params:data
    })
}


export function projectpublish(data) {
  return request({
    url: '/manage/project/publish',
    method: 'post',
    // data:data,
    params:data
  })
}

export function projectupload(data) {
  return request({

    url: '/manage/project/upload',
    method: 'post',
    data:data
  })
}

export var projectuploadUrl="/manage/project/upload"