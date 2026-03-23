<template>
  <div class="business-list">
    <!-- 筛选器 -->
    <div class="filter-bar">
      <div class="filter-dropdown">
        <div class="filter-label" @click="toggleFilter">
          {{ getFilterText() }}
          <span class="filter-arrow">▼</span>
        </div>
        <div class="filter-options" v-if="showFilter">
          <div 
            v-for="option in stageOptions" 
            :key="option.value"
            class="filter-option"
            @click="selectStage(option.value)"
          >
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 商机列表 -->
    <div class="business-list-container">
      <!-- 商机列表 -->
      <div class="business-items">
        <div
          v-for="business in businessList"
          :key="business.id"
          class="business-item"
          @click="viewBusinessDetail(business.id)"
        >
          <div class="business-header">
            <div class="business-name">{{ business.name }}</div>
            <div class="business-stage" :class="`stage-${business.stage}`">
              {{ stageMap[business.stage] }}
            </div>
          </div>
          <div class="business-info">
            <div class="business-amount">¥{{ business.amount }}</div>
            <div class="business-date">预计成交：{{ business.expectedDate }}</div>
          </div>
          <div class="business-customer">客户：{{ business.customer }}</div>
        </div>
      </div>
      
      <!-- 加载更多提示 -->
      <div class="load-more" v-if="loading">
        加载中...
      </div>
      
      <!-- 没有更多数据提示 -->
      <div class="no-more" v-if="finished && businessList.length > 0">
        没有更多数据了
      </div>
      
      <!-- 空状态提示 -->
      <div class="empty-state" v-if="businessList.length === 0 && !loading">
        暂无商机数据
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 商机阶段映射
const stageMap = {
  'initial': '初步接触',
  'analysis': '需求分析',
  'quotation': '方案报价',
  'negotiation': '商务谈判',
  'closed': '成交',
  'lost': '失败'
}

// 阶段筛选选项
const stageOptions = Object.values(stageMap).map((value, index) => ({
  text: value,
  value: Object.keys(stageMap)[index]
}))

// 阶段筛选
const stageFilter = ref('')

// 筛选菜单显示状态
const showFilter = ref(false)

// 加载状态
const loading = ref(false)
const finished = ref(false)

// 商机列表
const businessList = ref([
  {
    id: 1,
    name: '企业管理系统',
    amount: 100000,
    stage: 'quotation',
    expectedDate: '2024-02-01',
    customer: 'ABC科技有限公司'
  },
  {
    id: 2,
    name: '数据分析平台',
    amount: 50000,
    stage: 'analysis',
    expectedDate: '2024-02-15',
    customer: 'XYZ科技有限公司'
  },
  {
    id: 3,
    name: 'CRM系统',
    amount: 80000,
    stage: 'negotiation',
    expectedDate: '2024-01-30',
    customer: 'DEF科技有限公司'
  }
])

// 筛选相关方法
const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const selectStage = (value) => {
  stageFilter.value = value
  showFilter.value = false
  // 这里可以添加筛选逻辑
}

const getFilterText = () => {
  if (!stageFilter.value) {
    return '按阶段筛选'
  }
  const option = stageOptions.find(opt => opt.value === stageFilter.value)
  return option ? option.text : '按阶段筛选'
}

// 加载数据
const loadData = () => {
  // 模拟加载数据
  setTimeout(() => {
    // 模拟没有更多数据
    finished.value = true
    loading.value = false
  }, 1000)
}

// 查看商机详情
const viewBusinessDetail = (id) => {
  router.push(`/mobile/business/detail/${id}`)
}

// 新增商机
const addBusiness = () => {
  router.push('/mobile/business/add')
}
</script>

<style scoped>
.business-list {
  padding: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

.filter-bar {
  margin-bottom: var(--spacing-sm);
  background-color: var(--card-background);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-sm);
}

.business-item {
  padding: var(--spacing-sm);
  background-color: var(--card-background);
  margin-bottom: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.business-item:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-xs);
}

.business-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.business-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
  flex: 1;
  margin-right: var(--spacing-sm);
}

.business-stage {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.stage-initial {
  background-color: rgba(0, 180, 42, 0.1);
  color: var(--success-color);
}

.stage-analysis {
  background-color: rgba(22, 93, 255, 0.1);
  color: var(--primary-color);
}

.stage-quotation {
  background-color: rgba(255, 125, 0, 0.1);
  color: var(--warning-color);
}

.stage-negotiation {
  background-color: rgba(245, 63, 63, 0.1);
  color: var(--danger-color);
}

.stage-closed {
  background-color: rgba(0, 180, 42, 0.1);
  color: var(--success-color);
}

.stage-lost {
  background-color: rgba(134, 144, 156, 0.1);
  color: var(--info-color);
}

.business-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.business-amount {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--danger-color);
}

.business-date {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.business-customer {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
}
</style>