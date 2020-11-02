import request from '@/utils/request'

// 商品分类接口
  export function gsortdelete(data) {
    return request({
      url: '/manage/goodCategory/delete',
      method: 'delete',
      params:data
    })
  }

  export function gsortdetail(data) {

    return request({
      url: '/manage/goodCategory/detail',
      method: 'get',
      params:data
    })
  }

  export function gsortlist(data) {

    return request({
      url: '/manage/goodCategory/list',
      method: 'get',
      params:data
    })
  }


  export function gsortmodify(data) {
    return request({
      url: '/manage/goodCategory/modify',
      method: 'post',
      params:data
    })
  }


  export function gsortpage(data) {

    	return request({
      	url: '/manage/goodCategory/page',
      	method: 'get',
      	params:data
    	})
  }


  export function gsortpublish(data) {
    return request({
      url: '/manage/goodCategory/publish',
      method: 'post',
      // data:data,
      params:data
    })
  }

  export function gsortupload(data) {
    return request({

      url: '/manage/goodCategory/upload',
      method: 'post',
      data:data
    })
  }

  export var gsortuploadUrl="/manage/goodCategory/upload"



// 商品参数接口
  export function gpdelete(data) {
    return request({

      url: '/manage/goodsParam/delete',
      method: 'delete',
      params:data
    })
  }

  export function gplist(data) {
    return request({

      url: '/manage/goodsParam/list',
      method: 'get',
      params:data
    })
  }
  export function gpmodify(data) {
    return request({

      url: '/manage/goodsParam/modify',
      method: 'post',
      params:data
    })
  }

  export function gppage(data) {
    return request({

      url: '/manage/goodsParam/page',
      method: 'get',
      params:data
    })
  }

  export function gppublish(data) {
    return request({

      url: '/manage/goodsParam/publish',
      method: 'post',
      params:data
    })
  }



// 商品属性接口
  export function gadelete(data) {
    return request({

      url: '/manage/goodAttr/delete',
      method: 'delete',
      params:data
    })
  }

  export function galist(data) {
    return request({

      url: '/manage/goodAttr/list',
      method: 'get',
      params:data
    })
  }
  export function gamodify(data) {
    return request({

      url: '/manage/goodAttr/modify',
      method: 'post',
      params:data
    })
  }

  export function gapage(data) {
    return request({

      url: '/manage/goodAttr/page',
      method: 'get',
      params:data
    })
  }

  export function gapublish(data) {
    return request({

      url: '/manage/goodAttr/publish',
      method: 'post',
      params:data
    })
  }



// 商品属性值接口
  export function galdelete(data) {
    return request({

      url: '/manage/goodAttrLine/delete',
      method: 'delete',
      params:data
    })
  }

  export function gallist(data) {
    return request({

      url: '/manage/goodAttrLine/list',
      method: 'get',
      params:data
    })
  }
  export function galmodify(data) {
    return request({

      url: '/manage/goodAttrLine/modify',
      method: 'post',
      params:data
    })
  }
  export function galpage(data) {
    return request({

      url: '/manage/goodAttrLine/page',
      method: 'get',
      params:data
    })
  }

  export function galpublish(data) {
    return request({

      url: '/manage/goodAttrLine/publish',
      method: 'post',
      params:data
    })
  }


// 商品接口
  export function gdelete(data) {
    return request({

      url: '/manage/good/delete',
      method: 'delete',
      params:data
    })
  }

  export function gdetail(data) {
    return request({

      url: '/manage/good/detail',
      method: 'get',
      params:data
    })
  }
  export function gmodify(data) {
    return request({

      url: '/manage/good/modify',
      method: 'post',
      data:data
    })
  }

  export function gpage(data) {
    return request({

      url: '/manage/good/page',
      method: 'get',
      params:data
    })
  }
  export function gpublish(data) {
    return request({

      url: '/manage/good/publish',
      method: 'post',
      // params:data
      data:data
    })
  }
  export function gupload(data) {
    return request({

      url: '/manage/good/upload',
      method: 'post',
      data:data
    })
  }

  export var goodsuploadUrl="/manage/good/upload"


  export function godetail(data) {
    return request({

      url: '/manage/goodsOrder/detail',
      method: 'get',
      params:data
    })
  }
  export function gomodifyState(data) {
    return request({

      url: '/manage/goodsOrder/modifyState',
      method: 'post',
      params:data
    })
  }
  export function gopage(data) {
    return request({

      url: '/manage/goodsOrder/page',
      method: 'get',
      params:data
    })
  }






// export function projectdelete(data) {
//   return request({
//     url: '/manage/project/delete',
//     method: 'delete',
//     params:data
//   })
// }

// export function projectdetail(data) {

//   var params={
//     account:data.username,
//     password:data.password
//   }
//   return request({
//     url: '/manage/project/detail',
//     method: 'get',
//     params:params
//   })
// }


// export function projectmodify(data) {
//   return request({
//     url: '/manage/project/modify',
//     method: 'post',
//     params:data
//   })
// }


// export function projectpage(data) {

//     return request({
//       url: '/manage/project/page',
//       method: 'get',
//       params:data
//     })
// }


// export function projectpublish(data) {
//   return request({
//     url: '/manage/project/publish',
//     method: 'post',
//     // data:data,
//     params:data
//   })
// }

// export function projectupload(data) {
//   return request({

//     url: '/manage/project/upload',
//     method: 'post',
//     data:data
//   })
// }

// export var projectuploadUrl="/manage/project/upload"