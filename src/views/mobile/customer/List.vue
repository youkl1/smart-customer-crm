<template>
  <div class="customer-list">
    <!-- 搜索和筛选 -->
    <div class="search-bar">
      <van-search
        v-model="keyword"
        placeholder="搜索客户姓名/电话"
        @search="handleSearch"
        shape="round"
        background="#f5f5f5"
      />
      <van-dropdown-menu class="filter-menu">
        <van-dropdown-item v-model="status" :options="statusOptions" />
      </van-dropdown-menu>
    </div>
    
    <!-- 客户列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多数据了"
        @load="handleLoad"
        class="customer-list-container"
      >
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
          <van-icon name="arrow" class="customer-arrow" />
        </div>
      </van-list>
    </van-pull-refresh>
    
    <!-- 公海池入口 -->
    <div class="sea-pool-entry" @click="handleSeaPool">
      <van-icon name="water" class="sea-pool-icon" />
      <span>客户公海池</span>
      <van-icon name="arrow" />
    </div>
    
    <!-- 新增客户按钮 -->
    <van-button
      type="primary"
      round
      class="add-button"
      @click="handleAddCustomer"
      size="large"
    >
      <van-icon name="plus" /> 新增客户
    </van-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../../utils/request'
import { showToast } from 'vant'

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

// 客户列表数据
const customers = ref([])

// 加载状态
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// 分页参数
const page = ref(1)
const pageSize = ref(10)

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
}

.search-bar {
  margin-bottom: var(--spacing-sm);
}

.filter-menu {
  margin-top: var(--spacing-xs);
}

.customer-list-container {
  background-color: transparent;
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
}

.sea-pool-entry span {
  flex: 1;
  margin-left: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  font-weight: var(--font-weight-medium);
}

.add-button {
  position: fixed;
  bottom: 70px;
  right: var(--spacing-sm);
  width: 120px;
  height: 44px;
  box-shadow: var(--shadow-md);
  z-index: 99;
  background-color: var(--primary-color);
  border-radius: 22px;
  font-size: var(--font-size-sm);
}
</style>