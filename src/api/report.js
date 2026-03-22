import request from '@/utils/request'

// 生成近7天的日期数组
const generateRecentDays = (days = 7) => {
  const dates = []
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date.getMonth() + 1 + '/' + date.getDate())
  }
  
  return dates
}

// 生成随机跟进数据
const generateFollowTrend = () => {
  const dates = generateRecentDays()
  return dates.map(date => ({
    date,
    count: Math.floor(Math.random() * 10) + 1
  }))
}

export const reportApi = {
  // 获取业绩概览
  getOverview() {
    return request({
      url: '/api/report/overview',
      method: 'get'
    }, {
      // 模拟数据
      data: {
        newCustomers: 28,
        businessCount: 15,
        dealAmount: 125000
      }
    })
  },
  
  // 获取跟进趋势
  getFollowTrend() {
    return request({
      url: '/api/report/follow-trend',
      method: 'get'
    }, {
      // 模拟数据
      data: generateFollowTrend()
    })
  }
}