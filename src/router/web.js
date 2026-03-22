// WEB端路由配置
const WebRoutes = [
  {
    path: '/web',
    name: 'Web',
    redirect: '/web/dashboard',
    component: () => import('../views/web/Layout.vue'),
    children: [
      // 工作台
      {
        path: 'dashboard',
        name: 'WebDashboard',
        component: () => import('../views/web/dashboard/Index.vue'),
        meta: { title: '工作台' }
      },
      
      // 客户管理
      {
        path: 'customer',
        name: 'WebCustomer',
        component: () => import('../views/web/customer/List.vue'),
        meta: { title: '客户管理' }
      },
      {
        path: 'customer/detail/:id',
        name: 'WebCustomerDetail',
        component: () => import('../views/web/customer/Detail.vue'),
        meta: { title: '客户详情' }
      },
      {
        path: 'customer/add',
        name: 'WebCustomerAdd',
        component: () => import('../views/web/customer/Add.vue'),
        meta: { title: '新增客户' }
      },
      {
        path: 'customer/edit/:id',
        name: 'WebCustomerEdit',
        component: () => import('../views/web/customer/Edit.vue'),
        meta: { title: '编辑客户' }
      },
      {
        path: 'customer/sea',
        name: 'WebCustomerSea',
        component: () => import('../views/web/customer/Sea.vue'),
        meta: { title: '客户公海池' }
      },
      
      // 联系人管理
      {
        path: 'contact',
        name: 'WebContact',
        component: () => import('../views/web/contact/List.vue'),
        meta: { title: '联系人管理' }
      },
      {
        path: 'contact/add',
        name: 'WebContactAdd',
        component: () => import('../views/web/contact/Add.vue'),
        meta: { title: '新增联系人' }
      },
      {
        path: 'contact/edit/:id',
        name: 'WebContactEdit',
        component: () => import('../views/web/contact/Edit.vue'),
        meta: { title: '编辑联系人' }
      },
      
      // 商机管理
      {
        path: 'business',
        name: 'WebBusiness',
        component: () => import('../views/web/business/List.vue'),
        meta: { title: '商机管理' }
      },
      {
        path: 'business/add',
        name: 'WebBusinessAdd',
        component: () => import('../views/web/business/Add.vue'),
        meta: { title: '新增商机' }
      },
      {
        path: 'business/edit/:id',
        name: 'WebBusinessEdit',
        component: () => import('../views/web/business/Edit.vue'),
        meta: { title: '编辑商机' }
      },
      
      // 合同管理
      {
        path: 'contract',
        name: 'WebContract',
        component: () => import('../views/web/contract/List.vue'),
        meta: { title: '合同管理' }
      },
      {
        path: 'contract/add',
        name: 'WebContractAdd',
        component: () => import('../views/web/contract/Add.vue'),
        meta: { title: '新建合同' }
      },
      {
        path: 'contract/edit/:id',
        name: 'WebContractEdit',
        component: () => import('../views/web/contract/Edit.vue'),
        meta: { title: '编辑合同' }
      },
      
      // 产品管理
      {
        path: 'product',
        name: 'WebProduct',
        component: () => import('../views/web/product/List.vue'),
        meta: { title: '产品管理' }
      },
      {
        path: 'product/add',
        name: 'WebProductAdd',
        component: () => import('../views/web/product/Add.vue'),
        meta: { title: '新增产品' }
      },
      {
        path: 'product/edit/:id',
        name: 'WebProductEdit',
        component: () => import('../views/web/product/Edit.vue'),
        meta: { title: '编辑产品' }
      },
      {
        path: 'product/category',
        name: 'WebProductCategory',
        component: () => import('../views/web/product/Category.vue'),
        meta: { title: '产品分类' }
      },
      
      // 订单管理
      {
        path: 'order',
        name: 'WebOrder',
        component: () => import('../views/web/order/List.vue'),
        meta: { title: '订单管理' }
      },
      {
        path: 'order/add',
        name: 'WebOrderAdd',
        component: () => import('../views/web/order/Add.vue'),
        meta: { title: '新建订单' }
      },
      {
        path: 'order/edit/:id',
        name: 'WebOrderEdit',
        component: () => import('../views/web/order/Edit.vue'),
        meta: { title: '编辑订单' }
      },
      
      // 回款管理
      {
        path: 'payment',
        name: 'WebPayment',
        component: () => import('../views/web/receivable/List.vue'),
        meta: { title: '回款管理' }
      },
      {
        path: 'payment/add',
        name: 'WebPaymentAdd',
        component: () => import('../views/web/receivable/Add.vue'),
        meta: { title: '新建回款' }
      },
      {
        path: 'payment/edit/:id',
        name: 'WebPaymentEdit',
        component: () => import('../views/web/receivable/Edit.vue'),
        meta: { title: '编辑回款' }
      },
      {
        path: 'payment/plan',
        name: 'WebPaymentPlan',
        component: () => import('../views/web/receivable/Plan.vue'),
        meta: { title: '回款计划' }
      },
      
      // 报表中心
      {
        path: 'report',
        name: 'WebReport',
        component: () => import('../views/web/report/Index.vue'),
        meta: { title: '报表中心' }
      },
      
      // 系统设置
      {
        path: 'setting',
        name: 'WebSetting',
        redirect: '/web/setting/organization',
        meta: { title: '系统设置' },
        children: [
          {
            path: 'organization',
            name: 'WebSettingOrganization',
            component: () => import('../views/web/setting/Organization.vue'),
            meta: { title: '组织架构' }
          },
          {
            path: 'role',
            name: 'WebSettingRole',
            component: () => import('../views/web/setting/Role.vue'),
            meta: { title: '角色权限' }
          },
          {
            path: 'dictionary',
            name: 'WebSettingDictionary',
            component: () => import('../views/web/setting/Dictionary.vue'),
            meta: { title: '字典管理' }
          },
          {
            path: 'log',
            name: 'WebSettingLog',
            component: () => import('../views/web/setting/Log.vue'),
            meta: { title: '系统日志' }
          }
        ]
      },
      
      // 个人中心
      {
        path: 'profile',
        name: 'WebProfile',
        component: () => import('../views/web/profile/Index.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: 'profile/edit',
        name: 'WebProfileEdit',
        component: () => import('../views/web/profile/Edit.vue'),
        meta: { title: '编辑个人信息' }
      },
      {
        path: 'profile/password',
        name: 'WebProfilePassword',
        component: () => import('../views/web/profile/Password.vue'),
        meta: { title: '修改密码' }
      }
    ]
  }
]

export default WebRoutes