// 移动端路由配置
const MobileRoutes = [
  {
    path: '/mobile',
    name: 'Mobile',
    redirect: '/mobile/home',
    component: () => import('../views/mobile/Layout.vue'),
    children: [
      // 客户管理
      {
        path: 'home',
        name: 'MobileHome',
        component: () => import('../views/mobile/customer/List.vue'),
        meta: { title: '客户管理' }
      },
      {
        path: 'customer/detail/:id',
        name: 'MobileCustomerDetail',
        component: () => import('../views/mobile/customer/Detail.vue'),
        meta: { title: '客户详情' }
      },
      {
        path: 'customer/add',
        name: 'MobileCustomerAdd',
        component: () => import('../views/mobile/customer/Add.vue'),
        meta: { title: '新增客户' }
      },
      {
        path: 'customer/edit/:id',
        name: 'MobileCustomerEdit',
        component: () => import('../views/mobile/customer/Edit.vue'),
        meta: { title: '编辑客户' }
      },
      {
        path: 'customer/sea',
        name: 'MobileCustomerSea',
        component: () => import('../views/mobile/customer/Sea.vue'),
        meta: { title: '客户公海池' }
      },
      
      // 联系人管理
      {
        path: 'contact',
        name: 'MobileContact',
        component: () => import('../views/mobile/contact/List.vue'),
        meta: { title: '联系人管理' }
      },
      {
        path: 'contact/add',
        name: 'MobileContactAdd',
        component: () => import('../views/mobile/contact/Add.vue'),
        meta: { title: '新增联系人' }
      },
      {
        path: 'contact/edit/:id',
        name: 'MobileContactEdit',
        component: () => import('../views/mobile/contact/Edit.vue'),
        meta: { title: '编辑联系人' }
      },
      
      // 商机管理
      {
        path: 'business',
        name: 'MobileBusiness',
        component: () => import('../views/mobile/business/List.vue'),
        meta: { title: '商机管理' }
      },
      {
        path: 'business/detail/:id',
        name: 'MobileBusinessDetail',
        component: () => import('../views/mobile/business/Detail.vue'),
        meta: { title: '商机详情' }
      },
      {
        path: 'business/add',
        name: 'MobileBusinessAdd',
        component: () => import('../views/mobile/business/Add.vue'),
        meta: { title: '新增商机' }
      },
      {
        path: 'business/edit/:id',
        name: 'MobileBusinessEdit',
        component: () => import('../views/mobile/business/Edit.vue'),
        meta: { title: '编辑商机' }
      },
      
      // 任务中心
      {
        path: 'task',
        name: 'MobileTask',
        component: () => import('../views/mobile/task/List.vue'),
        meta: { title: '任务中心' }
      },
      {
        path: 'task/add',
        name: 'MobileTaskAdd',
        component: () => import('../views/mobile/task/Add.vue'),
        meta: { title: '新增任务' }
      },
      {
        path: 'task/edit/:id',
        name: 'MobileTaskEdit',
        component: () => import('../views/mobile/task/Edit.vue'),
        meta: { title: '编辑任务' }
      },
      
      // 跟进记录
      {
        path: 'follow/add',
        name: 'MobileFollowAdd',
        component: () => import('../views/mobile/follow/Add.vue'),
        meta: { title: '添加跟进记录' }
      },
      
      // 报表看板
      {
        path: 'report',
        name: 'MobileReport',
        component: () => import('../views/mobile/report/Index.vue'),
        meta: { title: '报表看板' }
      },
      
      // 消息通知
      {
        path: 'message',
        name: 'MobileMessage',
        component: () => import('../views/mobile/message/Index.vue'),
        meta: { title: '消息通知' }
      },
      
      // 个人中心
      {
        path: 'profile',
        name: 'MobileProfile',
        component: () => import('../views/mobile/profile/Index.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: 'profile/edit',
        name: 'MobileProfileEdit',
        component: () => import('../views/mobile/profile/Edit.vue'),
        meta: { title: '编辑个人信息' }
      },
      {
        path: 'profile/password',
        name: 'MobileProfilePassword',
        component: () => import('../views/mobile/profile/Password.vue'),
        meta: { title: '修改密码' }
      }
    ]
  }
]

export default MobileRoutes