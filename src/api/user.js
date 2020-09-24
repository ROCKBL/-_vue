import request from '@/utils/request'

export function login(data) {

  var params={
    account:data.username,
    password:data.password
  }
  return request({
    // url: '/vue-admin-template/user/login',
    // url: '/login',
    // method: 'post',
    url: '/manage/member/login',
    method: 'get',
    // data
    params:params
  })
}

export function getInfo(token) {
  console.log(token)
  var token=JSON.parse(token);
  var params={
    id:token._userid__
  }
  return request({
    // url: '/vue-admin-template/user/info',
    // url: '/user/info',
    url: '/manage/member/info',
    
    method: 'get',
    params:params
    // params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/user/logout',
    method: 'post'
  })
}
