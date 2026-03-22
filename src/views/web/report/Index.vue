<template>
  <div class="web-report-index">
    <div class="page-header">
      <h1>报表中心</h1>
    </div>
    
    <!-- 数据概览卡片 -->
    <div class="overview-cards">
      <el-card class="overview-card">
        <div class="card-content">
          <div class="card-title">本月新增客户</div>
          <div class="card-value">{{ overview.newCustomers }}</div>
        </div>
      </el-card>
      
      <el-card class="overview-card">
        <div class="card-content">
          <div class="card-title">本月商机数</div>
          <div class="card-value">{{ overview.businessCount }}</div>
        </div>
      </el-card>
      
      <el-card class="overview-card">
        <div class="card-content">
          <div class="card-title">本月成交金额</div>
          <div class="card-value">¥{{ overview.dealAmount }}</div>
        </div>
      </el-card>
      
      <el-card class="overview-card">
        <div class="card-content">
          <div class="card-title">本月回款金额</div>
          <div class="card-value">¥{{ overview.receivableAmount }}</div>
        </div>
      </el-card>
    </div>
    
    <!-- 图表区域 -->
    <div class="chart-container">
      <!-- 销售漏斗图 -->
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>销售漏斗</span>
          </div>
        </template>
        <div ref="funnelChartRef" class="chart"></div>
      </el-card>
      
      <!-- 业绩趋势图 -->
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>近30天业绩趋势</span>
          </div>
        </template>
        <div ref="trendChartRef" class="chart"></div>
      </el-card>
    </div>
    
    <!-- 客户分析 -->
    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <span>客户分析</span>
        </div>
      </template>
      <div ref="customerChartRef" class="chart"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 概览数据
const overview = ref({
  newCustomers: 28,
  businessCount: 15,
  dealAmount: 125000,
  receivableAmount: 105000
})

// 图表引用
const funnelChartRef = ref(null)
const trendChartRef = ref(null)
const customerChartRef = ref(null)

// 图表实例
let funnelChart = null
let trendChart = null
let customerChart = null

// 初始化销售漏斗图
const initFunnelChart = () => {
  if (funnelChartRef.value) {
    funnelChart = echarts.init(funnelChartRef.value)
    
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      legend: {
        data: ['初步接触', '需求分析', '方案报价', '商务谈判', '成交']
      },
      series: [
        {
          name: '销售漏斗',
          type: 'funnel',
          left: '10%',
          width: '80%',
          sort: 'descending',
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 100, name: '初步接触' },
            { value: 80, name: '需求分析' },
            { value: 60, name: '方案报价' },
            { value: 40, name: '商务谈判' },
            { value: 25, name: '成交' }
          ]
        }
      ]
    }
    
    funnelChart.setOption(option)
  }
}

// 初始化业绩趋势图
const initTrendChart = () => {
  if (trendChartRef.value) {
    trendChart = echarts.init(trendChartRef.value)
    
    // 生成近30天的日期
    const dates = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      dates.push(date.getMonth() + 1 + '/' + date.getDate())
    }
    
    // 生成随机数据
    const data = dates.map(() => Math.floor(Math.random() * 50000) + 10000)
    
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '业绩',
          type: 'line',
          stack: 'Total',
          areaStyle: {
            color: 'rgba(46, 160, 231, 0.1)'
          },
          lineStyle: {
            color: '#2ea0e7'
          },
          data: data
        }
      ]
    }
    
    trendChart.setOption(option)
  }
}

// 初始化客户分析图
const initCustomerChart = () => {
  if (customerChartRef.value) {
    customerChart = echarts.init(customerChartRef.value)
    
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '客户类型',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 30, name: '企业客户' },
            { value: 25, name: '政府客户' },
            { value: 20, name: '个人客户' },
            { value: 15, name: '教育客户' },
            { value: 10, name: '其他客户' }
          ]
        }
      ]
    }
    
    customerChart.setOption(option)
  }
}

// 窗口大小变化时重新调整图表
const handleResize = () => {
  if (funnelChart) funnelChart.resize()
  if (trendChart) trendChart.resize()
  if (customerChart) customerChart.resize()
}

onMounted(() => {
  initFunnelChart()
  initTrendChart()
  initCustomerChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (funnelChart) funnelChart.dispose()
  if (trendChart) trendChart.dispose()
  if (customerChart) customerChart.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.web-report-index {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.overview-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  overflow: hidden;
}

.card-content {
  padding: 20px;
  text-align: center;
}

.card-title {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
}

.chart-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart {
  width: 100%;
  height: 300px;
}

@media (max-width: 768px) {
  .chart-container {
    grid-template-columns: 1fr;
  }
  
  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>