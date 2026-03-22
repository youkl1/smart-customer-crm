<template>
  <div class="dashboard">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>工作台</span>
        </div>
      </template>
      <div class="stats-grid">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-number">10</div>
            <div class="stat-label">今日新增客户</div>
          </div>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-number">5</div>
            <div class="stat-label">今日新增商机</div>
          </div>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-number">8</div>
            <div class="stat-label">待办任务</div>
          </div>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-number">3</div>
            <div class="stat-label">待审批合同</div>
          </div>
        </el-card>
      </div>
      <div class="charts-container">
        <el-card class="chart-card">
          <template #header>
            <span>销售漏斗</span>
          </template>
          <div class="chart" ref="funnelChart"></div>
        </el-card>
        <el-card class="chart-card">
          <template #header>
            <span>近30天业绩趋势</span>
          </template>
          <div class="chart" ref="trendChart"></div>
        </el-card>
      </div>
      <div class="quick-actions">
        <el-card>
          <template #header>
            <span>快捷操作</span>
          </template>
          <div class="action-buttons">
            <el-button type="primary" @click="handleAddCustomer">
              <el-icon><i-ep-plus /></el-icon> 新增客户
            </el-button>
            <el-button @click="handleAddBusiness">
              <el-icon><i-ep-sunny /></el-icon> 新增商机
            </el-button>
            <el-button @click="handleAddTask">
              <el-icon><i-ep-todo-list /></el-icon> 新增任务
            </el-button>
            <el-button @click="handleViewReports">
              <el-icon><i-ep-data-analysis /></el-icon> 查看报表
            </el-button>
          </div>
        </el-card>
      </div>
      <div class="announcement">
        <el-card>
          <template #header>
            <span>公告栏</span>
          </template>
          <el-timeline>
            <el-timeline-item timestamp="2026-03-22">
              系统将于2026年3月25日进行系统更新，请提前做好准备
            </el-timeline-item>
            <el-timeline-item timestamp="2026-03-20">
              本月销售目标已更新，请查看个人业绩看板
            </el-timeline-item>
            <el-timeline-item timestamp="2026-03-15">
              新功能上线：客户360°视图已正式启用
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const router = useRouter()

// 图表引用
const funnelChart = ref(null)
const trendChart = ref(null)

// 初始化漏斗图
const initFunnelChart = () => {
  if (!funnelChart.value) return
  const chart = echarts.init(funnelChart.value)
  const option = {
    title: {
      text: '销售漏斗',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      data: ['初步接触', '需求分析', '方案报价', '商务谈判', '成交'],
      bottom: 0
    },
    series: [
      {
        name: '销售漏斗',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
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
          { value: 20, name: '成交' }
        ]
      }
    ]
  }
  chart.setOption(option)
  
  // 响应式调整
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

// 初始化趋势图
const initTrendChart = () => {
  if (!trendChart.value) return
  const chart = echarts.init(trendChart.value)
  const option = {
    title: {
      text: '近30天业绩趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['成交金额'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 30 }, (_, i) => `3/${i + 1}`)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '成交金额',
        type: 'line',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100000) + 50000),
        smooth: true,
        areaStyle: {}
      }
    ]
  }
  chart.setOption(option)
  
  // 响应式调整
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

// 处理新增客户
const handleAddCustomer = () => {
  router.push('/web/customer/add')
}

// 处理新增商机
const handleAddBusiness = () => {
  router.push('/web/business/add')
}

// 处理新增任务
const handleAddTask = () => {
  router.push('/web/task/add')
}

// 处理查看报表
const handleViewReports = () => {
  router.push('/web/report')
}

// 组件挂载时初始化图表
onMounted(() => {
  initFunnelChart()
  initTrendChart()
})
</script>

<style scoped>
.dashboard {
  padding: 20px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  height: 120px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #1890FF;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  height: 300px;
}

.chart {
  width: 100%;
  height: 240px;
}

.quick-actions {
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.announcement {
  margin-top: 20px;
}
</style>