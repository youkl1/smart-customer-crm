<template>
  <div class="customer-list">
    <!-- 搜索和筛选 -->
    <div class="search-bar">
      <div class="search-input">
        <input 
          type="text" 
          v-model="keyword" 
          placeholder="搜索客户姓名/电话"
          class="search-input-field"
          @keyup.enter="handleSearch"
        />
        <span class="search-icon">🔍</span>
      </div>
      <div class="filter-menu">
        <div class="filter-dropdown">
          <div class="filter-label" @click="toggleFilter">
            {{ getStatusText() }}
            <span class="filter-arrow">▼</span>
          </div>
          <div class="filter-options" v-if="showFilter">
            <div 
              v-for="option in statusOptions" 
              :key="option.value"
              class="filter-option"
              @click="selectStatus(option.value)"
            >
              {{ option.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 客户列表 -->
    <div class="customer-list-container" 
         @touchstart="handleTouchStart" 
         @touchmove="handleTouchMove" 
         @touchend="handleTouchEnd"
         ref="listContainer"
    >
      <!-- 下拉刷新提示 -->
      <div class="refresh-tip" v-if="refreshing">
        刷新中...
      </div>
      
      <!-- 客户列表 -->
      <div class="customer-items">
        <div 
          v-for="customer in customers" 
          :key="customer.id"
          class="customer-item"
          @click="handleCustomerClick(customer.id)"
        >
          <div class="customer-info">
            <div class="customer-name">{{ customer.name }}</div>
            <div class="customer-meta">
              <span class="customer-phone">{{ customer.phone }}</span>
              <span :class="['customer-status', getStatusClass(customer.status)]">
                {{ customer.status }}
              </span>
            </div>
          </div>
          <span class="customer-arrow">›</span>
        </div>
      </div>
      
      <!-- 加载更多提示 -->
      <div class="load-more" v-if="loading">
        加载中...
      </div>
      
      <!-- 没有更多数据提示 -->
      <div class="no-more" v-if="finished && customers.length > 0">
        没有更多数据了
      </div>
      
      <!-- 空状态提示 -->
      <div class="empty-state" v-if="customers.length === 0 && !loading">
        暂无客户数据
      </div>
    </div>
    
    <!-- 公海池入口 -->
    <div class="sea-pool-entry" @click="handleSeaPool">
      <span class="sea-pool-icon">🌊</span>
      <span>客户公海池</span>
      <span class="arrow-icon">›</span>
    </div>
    
    <!-- 新增客户按钮 -->
    <div class="add-button" @click="handleAddCustomer">
      <span class="add-icon">+</span>
      <span class="add-text">新增客户</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../../utils/request'

const router = useRouter()

// 搜索关键词
const keyword = ref('')

// 状态筛选
const status = ref('')
const statusOptions = [
  { text: '全部', value: '' },
  { text: '潜在客户', value: '潜在客户' },
  { text: '意向客户', value: '意向客户' },
  { text: '成交', value: '成交' },
  { text: '流失客户', value: '流失客户' }
]

// 筛选菜单显示状态
const showFilter = ref(false)

// 客户列表数据
const customers = ref([])

// 加载状态
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// 分页参数
const page = ref(1)
const pageSize = ref(10)

// 下拉刷新相关
const listContainer = ref(null)
const startY = ref(0)
const scrollTop = ref(0)
const isPulling = ref(false)

// 筛选相关方法
const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const selectStatus = (value) => {
  status.value = value
  showFilter.value = false
  page.value = 1
  finished.value = false
  loadCustomers()
}

const getStatusText = () => {
  const option = statusOptions.find(opt => opt.value === status.value)
  return option ? option.text : '全部'
}

// 下拉刷新相关方法
const handleTouchStart = (e) => {
  startY.value = e.touches[0].clientY
  scrollTop.value = listContainer.value.scrollTop
}

const handleTouchMove = (e) => {
  if (scrollTop.value <= 0 && !refreshing.value) {
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.value
    if (diff > 50) {
      isPulling.value = true
      e.preventDefault()
    }
  }
}

const handleTouchEnd = () => {
  if (isPulling.value) {
    refreshing.value = true
    isPulling.value = false
    handleRefresh()
  }
}

// 加载客户列表
const loadCustomers = async () => {
  try {
    const response = await get('/api/customers', {
      page: page.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      status: status.value
    })
    
    if (response.code === 200) {
      if (page.value === 1) {
        customers.value = response.data.list
      } else {
        customers.value = [...customers.value, ...response.data.list]
      }
      
      // 判断是否还有更多数据
      if (response.data.list.length < pageSize.value) {
        finished.value = true
      }
    }
  } catch (error) {
    showToast('加载失败，请重试')
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

// 处理搜索
const handleSearch = () => {
  page.value = 1
  finished.value = false
  loadCustomers()
}

// 处理下拉刷新
const handleRefresh = () => {
  page.value = 1
  finished.value = false
  loadCustomers()
}

// 处理上拉加载
const handleLoad = () => {
  page.value++
  loadCustomers()
}

// 处理客户点击
const handleCustomerClick = (id) => {
  router.push(`/mobile/customer/detail/${id}`)
}

// 处理新增客户
const handleAddCustomer = () => {
  router.push('/mobile/customer/add')
}

// 处理公海池
const handleSeaPool = () => {
  router.push('/mobile/customer/sea')
}

// 获取状态样式类
const getStatusClass = (status) => {
  switch (status) {
    case '潜在客户': return 'status-potential'
    case '意向客户': return 'status-intent'
    case '成交': return 'status-deal'
    case '流失客户': return 'status-lost'
    default: return ''
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadCustomers()
})
</script>

<style scoped>
.customer-list {
  padding: var(--spacing-sm);
  min-height: 100%;
  background-color: var(--background-color);
  position: relative;
}

.search-bar {
  margin-bottom: var(--spacing-sm);
}

.search-input {
  position: relative;
  margin-bottom: var(--spacing-xs);
}

.search-input-field {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: #f5f5f5;
  font-size: var(--font-size-sm);
  outline: none;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color-secondary);
}

.filter-menu {
  position: relative;
}

.filter-dropdown {
  position: relative;
}

.filter-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  background-color: var(--card-background);
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  cursor: pointer;
}

.filter-arrow {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.filter-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  box-shadow: var(--shadow-md);
  z-index: 100;
  margin-top: -1px;
}

.filter-option {
  padding: 12px 15px;
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  border-bottom: 1px solid var(--border-color-light);
  cursor: pointer;
}

.filter-option:last-child {
  border-bottom: none;
}

.filter-option:active {
  background-color: var(--border-color-light);
}

.customer-list-container {
  background-color: transparent;
  margin-bottom: var(--spacing-sm);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.customer-items {
  margin-bottom: var(--spacing-sm);
}

.customer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm);
  background-color: var(--card-background);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-xs);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.customer-item:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-xs);
}

.customer-info {
  flex: 1;
}

.customer-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
}

.customer-meta {
  display: flex;
  align-items: center;
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.customer-phone {
  margin-right: var(--spacing-sm);
}

.customer-status {
  padding: 2px 8px;
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.customer-status.status-potential {
  background-color: #E6F7FF;
  color: var(--primary-color);
}

.customer-status.status-intent {
  background-color: #F6FFED;
  color: var(--success-color);
}

.customer-status.status-deal {
  background-color: #FFF7E6;
  color: var(--warning-color);
}

.customer-status.status-lost {
  background-color: #FFF1F0;
  color: var(--danger-color);
}

.customer-arrow {
  color: var(--text-color-secondary);
  font-size: var(--font-size-lg);
  font-weight: bold;
}

.sea-pool-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm);
  background-color: var(--card-background);
  border-radius: var(--border-radius-md);
  margin-top: var(--spacing-sm);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.sea-pool-entry:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-xs);
}

.sea-pool-icon {
  color: var(--primary-color);
  font-size: var(--font-size-lg);
}

.sea-pool-entry span {
  flex: 1;
  margin-left: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  font-weight: var(--font-weight-medium);
}

.arrow-icon {
  color: var(--text-color-secondary);
  font-size: var(--font-size-lg);
  font-weight: bold;
}

.add-button {
  position: fixed;
  bottom: 70px;
  right: var(--spacing-sm);
  width: 100px;
  height: 36px;
  box-shadow: var(--shadow-md);
  z-index: 99;
  background-color: var(--primary-color);
  border-radius: 18px;
  font-size: var(--font-size-sm);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  max-width: calc(100% - 2 * var(--spacing-sm));
  left: 50%;
  transform: translateX(calc(-50% + (500px / 2) - var(--spacing-sm) - 50px));
}

.add-button:active {
  transform: translateX(calc(-50% + (500px / 2) - var(--spacing-sm) - 50px)) scale(0.98);
  box-shadow: var(--shadow-sm);
}

.add-icon {
  font-size: var(--font-size-lg);
  font-weight: bold;
  margin-right: 4px;
}

.add-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.refresh-tip {
  text-align: center;
  padding: var(--spacing-sm);
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
}

.load-more {
  text-align: center;
  padding: var(--spacing-sm);
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
}

.no-more {
  text-align: center;
  padding: var(--spacing-sm);
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
}
</style>