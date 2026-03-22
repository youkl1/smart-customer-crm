<template>
  <div class="contact-list">
    <!-- 搜索框 -->
    <div class="search-bar">
      <van-search
        v-model="searchKey"
        placeholder="搜索联系人姓名或电话"
        @search="handleSearch"
      />
    </div>
    
    <!-- 联系人列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多数据了"
      @load="loadData"
    >
      <div
        v-for="contact in contactList"
        :key="contact.id"
        class="contact-item"
      >
        <div class="contact-info">
          <div class="contact-name">{{ contact.name }}</div>
          <div class="contact-company">{{ contact.company }}</div>
          <div class="contact-phone">{{ contact.phone }}</div>
          <div class="contact-position">{{ contact.position }}</div>
        </div>
        <div class="contact-actions">
          <van-icon name="phone" class="action-icon" @click="callPhone(contact.phone)" />
          <van-icon name="message" class="action-icon" @click="sendMessage(contact.phone)" />
          <van-icon name="edit" class="action-icon" @click="editContact(contact.id)" />
          <van-icon name="delete" class="action-icon delete-icon" @click="deleteContact(contact.id)" />
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 搜索关键词
const searchKey = ref('')

// 加载状态
const loading = ref(false)
const finished = ref(false)

// 联系人列表
const contactList = ref([
  {
    id: 1,
    name: '张三',
    company: 'ABC科技有限公司',
    phone: '13800138000',
    position: '总经理'
  },
  {
    id: 2,
    name: '李四',
    company: 'ABC科技有限公司',
    phone: '13900139000',
    position: '技术总监'
  },
  {
    id: 3,
    name: '王五',
    company: 'XYZ科技有限公司',
    phone: '13700137000',
    position: '销售经理'
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

// 搜索联系人
const handleSearch = (value) => {
  console.log('搜索联系人:', value)
  // 这里可以实现搜索逻辑
}

// 拨打电话
const callPhone = (phone) => {
  // 模拟拨打电话
  console.log('拨打电话:', phone)
  alert(`拨打电话: ${phone}`)
}

// 发送短信
const sendMessage = (phone) => {
  // 模拟发送短信
  console.log('发送短信:', phone)
  alert(`发送短信: ${phone}`)
}

// 编辑联系人
const editContact = (id) => {
  router.push(`/mobile/contact/edit/${id}`)
}

// 删除联系人
const deleteContact = (id) => {
  // 模拟删除操作
  console.log('删除联系人:', id)
  alert('联系人删除成功')
  
  // 从列表中移除删除的联系人
  contactList.value = contactList.value.filter(item => item.id !== id)
}

// 新增联系人
const addContact = () => {
  router.push('/mobile/contact/add')
}
</script>

<style scoped>
.contact-list {
  padding: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

.search-bar {
  margin-bottom: var(--spacing-sm);
}

.contact-item {
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

.contact-item:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-xs);
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
}

.contact-company {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  margin-bottom: var(--spacing-xs);
}

.contact-phone {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  margin-bottom: var(--spacing-xs);
}

.contact-position {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.contact-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-icon {
  font-size: 20px;
  margin-bottom: var(--spacing-sm);
  color: var(--primary-color);
  cursor: pointer;
}

.delete-icon {
  color: var(--danger-color);
}

:deep(.van-search) {
  background-color: var(--card-background);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

:deep(.van-search__input) {
  background-color: var(--background-color);
  border-radius: var(--border-radius-sm);
}
</style>