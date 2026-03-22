<template>
  <div class="customer-sea">
    <!-- 搜索框 -->
    <div class="search-bar">
      <van-search
        v-model="searchKey"
        placeholder="搜索客户名称或电话"
        @search="handleSearch"
        shape="round"
        background="var(--background-color)"
      />
    </div>
    
    <!-- 客户列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多数据了"
      @load="loadData"
    >
      <div
        v-for="customer in customerList"
        :key="customer.id"
        class="customer-item"
      >
        <div class="customer-info">
          <div class="customer-name">{{ customer.name }}</div>
          <div class="customer-company">{{ customer.company }}</div>
          <div class="customer-phone">{{ customer.phone }}</div>
          <div class="customer-time">进入公海时间：{{ customer.enterTime }}</div>
        </div>
        <van-button
          type="primary"
          size="small"
          class="claim-btn"
          @click="claimCustomer(customer.id)"
        >
          领取
        </van-button>
      </div>
    </van-list>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'

// 搜索关键词
const searchKey = ref('')

// 加载状态
const loading = ref(false)
const finished = ref(false)

// 客户列表
const customerList = ref([
  {
    id: 1,
    name: '赵六',
    company: 'DEF科技有限公司',
    phone: '13600136000',
    enterTime: '2024-01-01'
  },
  {
    id: 2,
    name: '孙七',
    company: 'GHI科技有限公司',
    phone: '13500135000',
    enterTime: '2024-01-02'
  },
  {
    id: 3,
    name: '周八',
    company: 'JKL科技有限公司',
    phone: '13400134000',
    enterTime: '2024-01-03'
  }
])

// 加载数据
const loadData = () => {
  // 模拟加载数据
  setTimeout(() => {
    // 模拟没有更多数据
    finished.value = true
    loading.value = false
  }, 1000)
}

// 搜索客户
const handleSearch = (value) => {
  console.log('搜索客户:', value)
  // 这里可以实现搜索逻辑
}

// 领取客户
const claimCustomer = (id) => {
  console.log('领取客户:', id)
  // 模拟领取操作
  showToast({
    message: '客户领取成功',
    type: 'success',
    duration: 2000
  })
  
  // 从列表中移除领取的客户
  customerList.value = customerList.value.filter(item => item.id !== id)
}
</script>

<style scoped>
.customer-sea {
  padding: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

.search-bar {
  margin-bottom: var(--spacing-sm);
}

.customer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm);
  background-color: var(--card-background);
  margin-bottom: var(--spacing-xs);
  border-radius: var(--border-radius-md);
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
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
}

.customer-company {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  margin-bottom: var(--spacing-xs);
}

.customer-phone {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  margin-bottom: var(--spacing-xs);
}

.customer-time {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.claim-btn {
  margin-left: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: var(--primary-color);
}
</style>