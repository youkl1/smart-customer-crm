<template>
  <div class="mobile-report">
    <van-nav-bar title="报表看板" />
    
    <!-- 业绩概览卡片 -->
    <div class="overview-cards">
      <van-card class="overview-card">
        <div class="card-content">
          <div class="card-title">本月新增客户</div>
          <div class="card-value">{{ overview.newCustomers }}</div>
        </div>
      </van-card>
      
      <van-card class="overview-card">
        <div class="card-content">
          <div class="card-title">本月商机数</div>
          <div class="card-value">{{ overview.businessCount }}</div>
        </div>
      </van-card>
      
      <van-card class="overview-card">
        <div class="card-content">
          <div class="card-title">本月成交金额</div>
          <div class="card-value">¥{{ overview.dealAmount }}</div>
        </div>
      </van-card>
    </div>
    
    <!-- 跟进趋势图表 -->
    <div class="chart-container">
      <div class="chart-title">近7天跟进趋势</div>
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { reportApi } from '@/api/report'

const chartRef = ref(null)
let chart = null

// 业绩概览数据
const overview = ref({
  newCustomers: 0,
  businessCount: 0,
  dealAmount: 0
})

// 跟进趋势数据
const followTrend = ref([])

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
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
        data: followTrend.value.map(item => item.date)
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [
        {
          name: '跟进次数',
          type: 'line',
          stack: 'Total',
          areaStyle: {
            color: 'rgba(46, 160, 231, 0.1)'
          },
          lineStyle: {
            color: '#2ea0e7'
          },
          emphasis: {
            focus: 'series'
          },
          data: followTrend.value.map(item => item.count)
        }
      ]
    }
    
    chart.setOption(option)
  }
}

// 窗口大小变化时重新调整图表
const handleResize = () => {
  if (chart) {
    chart.resize()
  }
}

// 获取报表数据
const getReportData = async () => {
  try {
    const [overviewRes, trendRes] = await Promise.all([
      reportApi.getOverview(),
      reportApi.getFollowTrend()
    ])
    
    overview.value = overviewRes.data
    followTrend.value = trendRes.data
    
    // 初始化图表
    initChart()
  } catch (error) {
    console.error('获取报表数据失败:', error)
  }
}

onMounted(() => {
  getReportData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.mobile-report {
  padding-bottom: 60px;
}

.overview-cards {
  display: flex;
  padding: 16px;
  gap: 12px;
}

.overview-card {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  overflow: hidden;
}

.card-content {
  padding: 16px;
  text-align: center;
}

.card-title {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.card-value {
  font-size: 20px;
  font-weight: bold;
}

.chart-container {
  margin: 0 16px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.chart {
  width: 100%;
  height: 200px;
}
</style>