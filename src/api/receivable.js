import request from '@/utils/request'

// 模拟回款数据
const mockReceivables = [
  { id: 1, receivableNo: 'REC20240101001', customerName: '北京科技有限公司', amount: 19999, receivableDate: '2024-01-01 10:00:00', status: 1 },
  { id: 2, receivableNo: 'REC20240102002', customerName: '上海创新科技', amount: 9999, receivableDate: '2024-01-02 11:00:00', status: 2 },
  { id: 3, receivableNo: 'REC20240103003', customerName: '广州未来科技', amount: 29999, receivableDate: '2024-01-03 14:00:00', status: 2 },
  { id: 4, receivableNo: 'REC20240104004', customerName: '深圳互联网公司', amount: 5999, receivableDate: '2024-01-04 09:00:00', status: 1 },
  { id: 5, receivableNo: 'REC20240105005', customerName: '杭州科技企业', amount: 2000, receivableDate: '2024-01-05 16:00:00', status: 3 },
  { id: 6, receivableNo: 'REC20240106006', customerName: '成都软件公司', amount: 5000, receivableDate: '2024-01-06 10:00:00', status: 2 },
  { id: 7, receivableNo: 'REC20240107007', customerName: '武汉科技有限公司', amount: 8999, receivableDate: '2024-01-07 14:00:00', status: 1 },
  { id: 8, receivableNo: 'REC20240108008', customerName: '西安科技企业', amount: 1299, receivableDate: '2024-01-08 11:00:00', status: 1 }
]

export const receivableApi = {
  // 获取回款列表
  getList(params) {
    const { page = 1, pageSize = 10, receivableNo = '', customerName = '', status = '' } = params
    
    // 模拟筛选
    let filteredReceivables = [...mockReceivables]
    if (receivableNo) {
      filteredReceivables = filteredReceivables.filter(r => r.receivableNo.includes(receivableNo))
    }
    if (customerName) {
      filteredReceivables = filteredReceivables.filter(r => r.customerName.includes(customerName))
    }
    if (status) {
      filteredReceivables = filteredReceivables.filter(r => r.status === parseInt(status))
    }
    
    // 模拟分页
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedReceivables = filteredReceivables.slice(start, end)
    
    return request({
      url: '/api/receivable/list',
      method: 'get',
      params
    }, {
      data: {
        list: paginatedReceivables,
        total: filteredReceivables.length
      }
    })
  },
  
  // 获取回款详情
  getDetail(id) {
    const receivable = mockReceivables.find(r => r.id === parseInt(id))
    return request({
      url: `/api/receivable/${id}`,
      method: 'get'
    }, {
      data: receivable
    })
  },
  
  // 新增回款
  add(data) {
    return request({
      url: '/api/receivable/add',
      method: 'post',
      data
    }, {
      data: { id: Date.now(), receivableNo: `REC${Date.now()}` }
    })
  },
  
  // 更新回款
  update(id, data) {
    return request({
      url: `/api/receivable/${id}`,
      method: 'put',
      data
    }, {
      data: { success: true }
    })
  },
  
  // 审批回款
  approve(id, data) {
    return request({
      url: `/api/receivable/${id}/approve`,
      method: 'put',
      data
    }, {
      data: { success: true }
    })
  }
}