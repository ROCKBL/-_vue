import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/hospital',
    component: Layout,
    // redirect: '/dashboard',
    children: [
      {
        path: '',
        name: '医院管理',
        component: () => import('@/views/hospital/hospitalList'),
        meta: { title: '医院管理', icon: 'el-icon-office-building' }
      },
      {
        path: 'addHospital',
        name: '新建医院',
        component: () => import('@/views/hospital/addHospital'),
        meta: { title: '新建医院', },
        hidden: true
      },
      {
        path: 'editeHospital',
        name: '修改医院',
        component: () => import('@/views/hospital/addHospital'),
        meta: { title: '修改医院',},
        hidden: true
      },
    ]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project',
    meta: { title: '项目管理', icon: 'el-icon-files' },
    children: [
      {
        path: 'sort',
        name: '项目分类',
        component: () => import('@/views/project/sort'),
        meta: { title: '项目分类', }
      },
      {
        path: 'addSort',
        name: '新建项目分类',
        component: () => import('@/views/project/addSort'),
        meta: { title: '新建项目分类', },
        hidden: true
      },
      {
        path: 'editeSort',
        name: '修改项目分类',
        component: () => import('@/views/project/addSort'),
        meta: { title: '修改项目分类',},
        hidden: true
      },

      {
        path: 'list',
        name: '项目列表',
        component: () => import('@/views/project/list'),
        meta: { title: '项目列表',  }
      },
      {
        path: 'addProject',
        name: '新建项目',
        component: () => import('@/views/project/addProject'),
        meta: { title: '新建项目', },
        hidden: true
      },
      {
        path: 'editeProject',
        name: '修改项目',
        component: () => import('@/views/project/addProject'),
        meta: { title: '修改项目',},
        hidden: true
      },

    ]
  },

  {
    path: '/projectOrder',
    component: Layout,

    // redirect: '/dashboard',
    children: [
      {
        path: '',
        name: '项目预约订单管理',
        component: () => import('@/views/projectOrder/projectOrderList'),
        meta: { title: '项目预约订单管理', icon: 'el-icon-s-order' }
      },
    ]
  },


  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    name: 'goods',
    meta: { title: '商品管理', icon: 'el-icon-s-cooperation' },

    children: [
      {
        path: 'list',
        name: '商品列表',
        component: () => import('@/views/goods/goodsList'),
        meta: { title: '商品列表', }
      },
      {
        path: 'sort',
        name: '商品分类',
        component: () => import('@/views/goods/sort'),
        meta: { title: '商品分类管理', }
      },
      {
        path: 'addGoods',
        name: '添加商品',
        component: () => import('@/views/goods/addGoods'),
        meta: { title: '添加商品', },
        hidden: true
      },
      {
        path: 'editGoods',
        name: '修改商品',
        component: () => import('@/views/goods/addGoods'),
        meta: { title: '修改商品', },
        hidden: true
      },
      {
        path: 'addSort',
        name: '添加商品分类',
        component: () => import('@/views/goods/addSort'),
        meta: { title: '添加商品分类', },
        hidden: true
      },
      {
        path: 'editSort',
        name: '修改商品分类',
        component: () => import('@/views/goods/addSort'),
        meta: { title: '修改商品分类', },
        hidden: true
      },

      // 商品参数
      {
        path: 'goodsParamList',
        name: '商品参数管理',
        component: () => import('@/views/goods/goodsParamList'),
        meta: { title: '商品参数管理', },
      },
      {
        path: 'addgoodsParam',
        name: '添加商品参数',
        component: () => import('@/views/goods/addParam'),
        meta: { title: '添加商品参数', },
        hidden: true
      },
      {
        path: 'editgoodsParam',
        name: '修改商品参数',
        component: () => import('@/views/goods/addParam'),
        meta: { title: '修改商品参数', },
        hidden: true
      },

      // 商品规格
      // 商品规格值
      {
        path: 'goodsAttrList',
        name: '商品规格管理',
        component: () => import('@/views/goods/goodsAttrList'),
        meta: { title: '商品规格管理', },
      },
      {
        path: 'addgoodsAttr',
        name: '添加商品规格',
        component: () => import('@/views/goods/addAttr'),
        meta: { title: '添加商品规格', },
        hidden: true
      },
      {
        path: 'editgoodsAttr',
        name: '修改商品规格',
        component: () => import('@/views/goods/addAttr'),
        meta: { title: '修改商品规格', },
        hidden: true
      },
    ]
  },

  {
    path: '/diary',
    component: Layout,
    redirect: '/diary/list',
    name: 'diary',
    meta: { title: '日志管理', icon: 'el-icon-notebook-1' },

    children: [
      {
        path: 'list',
        name: '日志列表',
        component: () => import('@/views/diary/diarylist'),
        meta: { title: '日志列表', }
      },
      {
        path: 'sort',
        name: '日志分类',
        component: () => import('@/views/diary/sort'),
        meta: { title: '日志分类', }
      },
      {
        path: 'addSort',
        name: '新增日志分类',
        component: () => import('@/views/diary/addsort'),
        meta: { title: '新增日志分类', },
        hidden: true
      },
      {
        path: 'editeSort',
        name: '编辑日志分类',
        component: () => import('@/views/diary/addsort'),
        meta: { title: '编辑日志分类', },
        hidden: true
      },
    ]
  },

  {
    path: '/coupon',
    component: Layout,
    redirect: '/coupon/list',
    name: 'coupon',
    meta: { title: '优惠券管理', icon: 'el-icon-s-ticket' },

    children: [
      {
        path: 'list',
        name: '优惠券列表',
        component: () => import('@/views/coupon/couponlist'),
        meta: { title: '优惠券列表', }
      },
      {
        path: 'adCoupon',
        name: '新增优惠券',
        component: () => import('@/views/coupon/addcoupon'),
        meta: { title: '新增优惠券', },
        hidden: true
      },
      {
        path: 'editeCoupon',
        name: '编辑优惠券',
        component: () => import('@/views/coupon/addcoupon'),
        meta: { title: '编辑优惠券', },
        hidden: true
      },

      {
        path: 'usedList',
        name: '领取的优惠券',
        component: () => import('@/views/coupon/usedcoupon'),
        meta: { title: '领取的优惠券', }
      },

    ]
  },



  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/list',
    name: 'orders',
    meta: { title: '订单管理', icon: 'el-icon-s-order' },

    children: [
      {
        path: 'list',
        name: '订单列表',
        component: () => import('@/views/order/orderList'),
        meta: { title: '订单列表', }
      },
      {
        path: 'selfRaising',
        name: '自提订单',
        component: () => import('@/views/order/orderList'),
        meta: { title: '自提订单', }
      },
      {
        path: 'postSale',
        name: '售后订单',
        component: () => import('@/views/order/postSaleList'),
        meta: { title: '售后订单', }
      },
      {
        path: 'assess',
        name: '评价管理',
        component: () => import('@/views/order/assessList'),
        meta: { title: '评价管理', }
      },
      {
        path: 'orderInfo',
        name: '订单详情',
        component: () => import('@/views/order/orderInfo'),
        meta: { title: '订单详情', },
        hidden: true
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/list',
    name: 'users',
    meta: { title: '用户管理', icon: 'user' },

    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/user/userList'),
        meta: { title: '用户列表', }
      },
      {
        path: 'verificationOfficer',
        name: '核销员',
        component: () => import('@/views/user/verificationOfficer'),
        meta: { title: '核销员', }
      },
      {
        path: 'memberLevel',
        name: '会员等级',
        component: () => import('@/views/user/memberLevel'),
        meta: { title: '会员等级', }
      },
      {
        path: 'memberLevelSetting',
        name: '会员设置',
        component: () => import('@/views/user/memberLevelSetting'),
        meta: { title: '会员设置', },
        hidden: true
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
