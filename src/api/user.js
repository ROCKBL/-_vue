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
    id:token.__userid__
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


  // 获取用户列表
  export function ugetConsumerList(data) {
      return request({
          url: '/manage/consumerList/getConsumerList',
          method: 'get',
          params:data
      })
  }

  // 修改用户秘密
  export function uupdatePassWord(data) {
      return request({
          url: '/manage/member/updatePassWord',
          method: 'get',
          params:data
      })
  }