import request from '@/utils/request'

// 模拟订单数据
const mockOrders = [
  { id: 1, orderNo: 'ORD20240101001', customerName: '北京科技有限公司', totalAmount: 19999, orderTime: '2024-01-01 10:00:00', status: 1 },
  { id: 2, orderNo: 'ORD20240102002', customerName: '上海创新科技', totalAmount: 9999, orderTime: '2024-01-02 11:00:00', status: 2 },
  { id: 3, orderNo: 'ORD20240103003', customerName: '广州未来科技', totalAmount: 29999, orderTime: '2024-01-03 14:00:00', status: 3 },
  { id: 4, orderNo: 'ORD20240104004', customerName: '深圳互联网公司', totalAmount: 5999, orderTime: '2024-01-04 09:00:00', status: 1 },
  { id: 5, orderNo: 'ORD20240105005', customerName: '杭州科技企业', totalAmount: 2000, orderTime: '2024-01-05 16:00:00', status: 4 },
  { id: 6, orderNo: 'ORD20240106006', customerName: '成都软件公司', totalAmount: 5000, orderTime: '2024-01-06 10:00:00', status: 2 },
  { id: 7, orderNo: 'ORD20240107007', customerName: '武汉科技有限公司', totalAmount: 8999, orderTime: '2024-01-07 14:00:00', status: 3 },
  { id: 8, orderNo: 'ORD20240108008', customerName: '西安科技企业', totalAmount: 1299, orderTime: '2024-01-08 11:00:00', status: 1 }
]

export const orderApi = {
  // 获取订单列表
  getList(params) {
    const { page = 1, pageSize = 10, orderNo = '', customerName = '', status = '' } = params
    
    // 模拟筛选
    let filteredOrders = [...mockOrders]
    if (orderNo) {
      filteredOrders = filteredOrders.filter(o => o.orderNo.includes(orderNo))
    }
    if (customerName) {
      filteredOrders = filteredOrders.filter(o => o.customerName.includes(customerName))
    }
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === parseInt(status))
    }
    
    // 模拟分页
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedOrders = filteredOrders.slice(start, end)
    
    return request({
      url: '/api/order/list',
      method: 'get',
      params
    }, {
      data: {
        list: paginatedOrders,
        total: filteredOrders.length
      }
    })
  },
  
  // 获取订单详情
  getDetail(id) {
    const order = mockOrders.find(o => o.id === parseInt(id))
    return request({
      url: `/api/order/${id}`,
      method: 'get'
    }, {
      data: order
    })
  },
  
  // 新增订单
  add(data) {
    return request({
      url: '/api/order/add',
      method: 'post',
      data
    }, {
      data: { id: Date.now(), orderNo: `ORD${Date.now()}` }
    })
  },
  
  // 更新订单
  update(id, data) {
    return request({
      url: `/api/order/${id}`,
      method: 'put',
      data
    }, {
      data: { success: true }
    })
  },
  
  // 发货
  ship(id) {
    return request({
      url: `/api/order/${id}/ship`,
      method: 'put'
    }, {
      data: { success: true }
    })
  },
  
  // 取消订单
  cancel(id) {
    return request({
      url: `/api/order/${id}/cancel`,
      method: 'put'
    }, {
      data: { success: true }
    })
  }
}