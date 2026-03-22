import request from '@/utils/request'

// 模拟产品分类数据
const mockCategories = [
  { id: 1, name: '软件产品' },
  { id: 2, name: '硬件产品' },
  { id: 3, name: '服务产品' },
  { id: 4, name: '配件产品' }
]

// 模拟产品数据
const mockProducts = [
  { id: 1, name: '智客通CRM基础版', categoryId: 1, categoryName: '软件产品', price: 9999, stock: 50, status: 1, createTime: '2024-01-01 10:00:00' },
  { id: 2, name: '智客通CRM专业版', categoryId: 1, categoryName: '软件产品', price: 19999, stock: 30, status: 1, createTime: '2024-01-02 11:00:00' },
  { id: 3, name: '智客通CRM企业版', categoryId: 1, categoryName: '软件产品', price: 29999, stock: 20, status: 1, createTime: '2024-01-03 14:00:00' },
  { id: 4, name: '智能办公设备', categoryId: 2, categoryName: '硬件产品', price: 5999, stock: 15, status: 1, createTime: '2024-01-04 09:00:00' },
  { id: 5, name: '技术支持服务', categoryId: 3, categoryName: '服务产品', price: 2000, stock: 100, status: 1, createTime: '2024-01-05 16:00:00' },
  { id: 6, name: '系统集成服务', categoryId: 3, categoryName: '服务产品', price: 5000, stock: 50, status: 1, createTime: '2024-01-06 10:00:00' },
  { id: 7, name: 'CRM专用服务器', categoryId: 2, categoryName: '硬件产品', price: 8999, stock: 5, status: 1, createTime: '2024-01-07 14:00:00' },
  { id: 8, name: '网络配件套装', categoryId: 4, categoryName: '配件产品', price: 1299, stock: 8, status: 1, createTime: '2024-01-08 11:00:00' }
]

export const productApi = {
  // 获取产品列表
  getList(params) {
    const { page = 1, pageSize = 10, name = '', categoryId = '' } = params
    
    // 模拟筛选
    let filteredProducts = [...mockProducts]
    if (name) {
      filteredProducts = filteredProducts.filter(p => p.name.includes(name))
    }
    if (categoryId) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === parseInt(categoryId))
    }
    
    // 模拟分页
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedProducts = filteredProducts.slice(start, end)
    
    return request({
      url: '/api/product/list',
      method: 'get',
      params
    }, {
      data: {
        list: paginatedProducts,
        total: filteredProducts.length
      }
    })
  },
  
  // 获取产品详情
  getDetail(id) {
    const product = mockProducts.find(p => p.id === parseInt(id))
    return request({
      url: `/api/product/${id}`,
      method: 'get'
    }, {
      data: product
    })
  },
  
  // 新增产品
  add(data) {
    return request({
      url: '/api/product/add',
      method: 'post',
      data
    }, {
      data: { id: Date.now() }
    })
  },
  
  // 更新产品
  update(id, data) {
    return request({
      url: `/api/product/${id}`,
      method: 'put',
      data
    }, {
      data: { success: true }
    })
  },
  
  // 删除产品
  delete(id) {
    return request({
      url: `/api/product/${id}`,
      method: 'delete'
    }, {
      data: { success: true }
    })
  },
  
  // 获取分类列表
  getCategories() {
    return request({
      url: '/api/product/categories',
      method: 'get'
    }, {
      data: mockCategories
    })
  }
}