// API请求封装

/**
 * 模拟API请求
 * @param {object|string} config - 请求配置对象或URL
 * @param {object} mockData - 模拟数据（可选）
 * @returns {Promise} 请求结果
 */
export function request(config, mockData = {}) {
  // 模拟网络延迟
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 如果提供了模拟数据，直接返回
      if (mockData.data) {
        resolve({
          code: 200,
          message: 'success',
          data: mockData.data
        })
        return
      }
      
      // 提取URL
      const url = typeof config === 'string' ? config : config.url
      
      // 模拟成功响应
      if (url.includes('/login')) {
        resolve({
          code: 200,
          message: 'success',
          data: {
            token: 'mock-token-' + Date.now(),
            userInfo: {
              id: '1',
              username: 'admin',
              name: '管理员',
              role: 'admin',
              avatar: ''
            }
          }
        })
      } else if (url.includes('/customers')) {
        resolve({
          code: 200,
          message: 'success',
          data: {
            list: [
              {
                id: '1',
                name: '阿里巴巴集团',
                phone: '13800138000',
                email: 'contact@alibaba.com',
                status: '成交',
                createTime: '2026-03-01 10:00:00'
              },
              {
                id: '2',
                name: '腾讯科技',
                phone: '13900139000',
                email: 'contact@tencent.com',
                status: '意向客户',
                createTime: '2026-03-02 14:00:00'
              },
              {
                id: '3',
                name: '百度在线',
                phone: '13700137000',
                email: 'contact@baidu.com',
                status: '潜在客户',
                createTime: '2026-03-03 09:00:00'
              }
            ],
            total: 3,
            page: 1,
            pageSize: 10
          }
        })
      } else if (url.includes('/business')) {
        resolve({
          code: 200,
          message: 'success',
          data: {
            list: [
              {
                id: '1',
                name: '阿里云服务器采购',
                customerId: '1',
                customerName: '阿里巴巴集团',
                stage: '商务谈判',
                amount: 1000000,
                expectedDate: '2026-04-01',
                createTime: '2026-03-01 10:00:00'
              },
              {
                id: '2',
                name: '腾讯云服务合作',
                customerId: '2',
                customerName: '腾讯科技',
                stage: '方案报价',
                amount: 500000,
                expectedDate: '2026-04-15',
                createTime: '2026-03-02 14:00:00'
              }
            ],
            total: 2,
            page: 1,
            pageSize: 10
          }
        })
      } else if (url.includes('/tasks')) {
        resolve({
          code: 200,
          message: 'success',
          data: {
            list: [
              {
                id: '1',
                title: '跟进阿里巴巴客户',
                content: '与客户沟通阿里云服务器采购细节',
                status: '待办',
                priority: '高',
                dueDate: '2026-03-25 18:00:00',
                createTime: '2026-03-20 10:00:00'
              },
              {
                id: '2',
                title: '准备腾讯云方案',
                content: '为腾讯科技准备云服务方案',
                status: '进行中',
                priority: '中',
                dueDate: '2026-03-28 18:00:00',
                createTime: '2026-03-21 14:00:00'
              }
            ],
            total: 2,
            page: 1,
            pageSize: 10
          }
        })
      } else if (url.includes('/reports')) {
        resolve({
          code: 200,
          message: 'success',
          data: {
            performance: {
              newCustomers: 10,
              newBusiness: 5,
              dealAmount: 2000000
            },
            trend: [
              { date: '2026-03-16', count: 2 },
              { date: '2026-03-17', count: 3 },
              { date: '2026-03-18', count: 1 },
              { date: '2026-03-19', count: 4 },
              { date: '2026-03-20', count: 2 },
              { date: '2026-03-21', count: 3 },
              { date: '2026-03-22', count: 2 }
            ]
          }
        })
      } else if (url.includes('/messages')) {
        resolve({
          code: 200,
          message: 'success',
          data: {
            system: [
              {
                id: '1',
                title: '系统更新通知',
                content: '智客通CRM系统将于2026年3月25日进行系统更新',
                createTime: '2026-03-20 09:00:00'
              }
            ],
            approval: [
              {
                id: '1',
                title: '合同审批',
                content: '阿里巴巴集团的服务器采购合同待审批',
                createTime: '2026-03-21 10:00:00'
              }
            ]
          }
        })
      } else {
        resolve({
          code: 200,
          message: 'success',
          data: {}
        })
      }
    }, 300)
  })
}

// 导出常用的请求方法
export const get = (url, params) => {
  return request(url, {
    method: 'GET',
    params
  })
}

export const post = (url, data) => {
  return request(url, {
    method: 'POST',
    data
  })
}

export const put = (url, data) => {
  return request(url, {
    method: 'PUT',
    data
  })
}

export const del = (url) => {
  return request(url, {
    method: 'DELETE'
  })
}

export default request