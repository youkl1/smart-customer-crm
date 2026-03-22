<template>
  <div class="customer-detail">
    <!-- 基本信息 -->
    <van-card class="info-card" :style="{ margin: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }">
      <template #title>
        <div class="customer-header">
          <div class="customer-name">{{ customer.name }}</div>
          <div class="customer-status" :class="`status-${customer.status}`">
            {{ statusMap[customer.status] }}
          </div>
        </div>
        <div class="customer-company">{{ customer.company }}</div>
      </template>
      <div class="info-grid">
        <div class="info-row">
          <div class="info-item">
            <div class="label">联系人</div>
            <div class="value">{{ customer.contactName }}</div>
          </div>
          <div class="info-item">
            <div class="label">联系电话</div>
            <div class="value">{{ customer.phone }}</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item">
            <div class="label">邮箱</div>
            <div class="value">{{ customer.email }}</div>
          </div>
          <div class="info-item">
            <div class="label">行业</div>
            <div class="value">{{ customer.industry }}</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item full-width">
            <div class="label">地址</div>
            <div class="value">{{ customer.address }}</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item">
            <div class="label">创建时间</div>
            <div class="value">{{ customer.createdAt }}</div>
          </div>
          <div class="info-item">
            <div class="label">负责人</div>
            <div class="value">{{ customer.owner }}</div>
          </div>
        </div>
      </div>
    </van-card>
    
    <!-- 统计信息卡片 -->
    <div class="stats-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ customer.stats.contacts }}</div>
          <div class="stat-label">联系人</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ customer.stats.follows }}</div>
          <div class="stat-label">跟进记录</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ customer.stats.businesses }}</div>
          <div class="stat-label">商机</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ customer.stats.tasks }}</div>
          <div class="stat-label">任务</div>
        </div>
      </div>
    </div>
    
    <!-- 联系人列表 -->
    <van-card class="contact-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }">
      <template #title>
        <div class="card-title">
          <span class="card-title-text">联系人</span>
          <van-button 
            type="primary" 
            size="small" 
            :style="{ backgroundColor: 'var(--primary-color)' }"
            @click="addContact"
          >
            添加
          </van-button>
        </div>
      </template>
      <div v-if="contacts.length === 0" class="empty-text">
        暂无联系人
      </div>
      <div v-else class="contact-list">
        <div 
          v-for="contact in contacts" 
          :key="contact.id" 
          class="contact-item"
        >
          <div class="contact-avatar">{{ contact.name.charAt(0) }}</div>
          <div class="contact-info">
            <div class="contact-name">{{ contact.name }}</div>
            <div class="contact-position">{{ contact.position }}</div>
            <div class="contact-phone">{{ contact.phone }}</div>
          </div>
          <div class="contact-actions">
            <van-icon name="phone" class="action-icon" @click="callPhone(contact.phone)" />
            <van-icon name="message" class="action-icon" @click="sendMessage(contact.phone)" />
          </div>
        </div>
      </div>
    </van-card>
    
    <!-- 跟进记录 -->
    <van-card class="follow-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }">
      <template #title>
        <div class="card-title">
          <span class="card-title-text">跟进记录</span>
          <van-button 
            type="primary" 
            size="small" 
            :style="{ backgroundColor: 'var(--primary-color)' }"
            @click="addFollow"
          >
            添加
          </van-button>
        </div>
      </template>
      <div v-if="follows.length === 0" class="empty-text">
        暂无跟进记录
      </div>
      <div v-else class="follow-list">
        <div 
          v-for="follow in follows" 
          :key="follow.id" 
          class="follow-item"
        >
          <div class="follow-header">
            <div class="follow-time">{{ follow.time }}</div>
            <div class="follow-user">{{ follow.user }}</div>
          </div>
          <div class="follow-content">{{ follow.content }}</div>
          <div v-if="follow.remark" class="follow-remark">{{ follow.remark }}</div>
        </div>
      </div>
    </van-card>
    
    <!-- 商机列表 -->
    <van-card class="business-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }">
      <template #title>
        <div class="card-title">
          <span class="card-title-text">商机</span>
          <van-button 
            type="primary" 
            size="small" 
            :style="{ backgroundColor: 'var(--primary-color)' }"
            @click="addBusiness"
          >
            添加
          </van-button>
        </div>
      </template>
      <div v-if="businesses.length === 0" class="empty-text">
        暂无商机
      </div>
      <div v-else class="business-list">
        <div 
          v-for="business in businesses" 
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
            <div class="business-amount">¥{{ business.amount.toLocaleString() }}</div>
            <div class="business-date">预计成交: {{ business.expectedDate }}</div>
          </div>
        </div>
      </div>
    </van-card>
    
    <!-- 任务列表 -->
    <van-card class="task-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }">
      <template #title>
        <div class="card-title">
          <span class="card-title-text">任务</span>
          <van-button 
            type="primary" 
            size="small" 
            :style="{ backgroundColor: 'var(--primary-color)' }"
            @click="addTask"
          >
            添加
          </van-button>
        </div>
      </template>
      <div v-if="tasks.length === 0" class="empty-text">
        暂无任务
      </div>
      <div v-else class="task-list">
        <div 
          v-for="task in tasks" 
          :key="task.id" 
          class="task-item"
          :class="{ 'overdue': task.overdue }"
        >
          <div class="task-content">
            <div class="task-title">{{ task.title }}</div>
            <div class="task-info">
              <span class="task-time">截止时间：{{ task.deadline }}</span>
              <span class="task-status" :class="`status-${task.status}`">{{ task.status === 'pending' ? '待完成' : '已完成' }}</span>
            </div>
            <div class="task-description">{{ task.description }}</div>
          </div>
        </div>
      </div>
    </van-card>
    
    <!-- 底部操作按钮 -->
    <div class="bottom-actions">
      <van-button 
        type="default" 
        class="action-btn" 
        :style="{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }"
        @click="editCustomer"
      >
        编辑
      </van-button>
      <van-button 
        type="primary" 
        class="action-btn" 
        :style="{ backgroundColor: 'var(--primary-color)' }"
        @click="addTask"
      >
        新建任务
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 客户状态映射
const statusMap = {
  'active': '活跃',
  'inactive': '不活跃',
  'potential': '潜在'
}

// 商机阶段映射
const stageMap = {
  'initial': '初步接触',
  'analysis': '需求分析',
  'quotation': '方案报价',
  'negotiation': '商务谈判',
  'closed': '成交',
  'lost': '失败'
}

// 客户信息
const customer = ref({
  id: route.params.id,
  name: '张三',
  company: 'ABC科技有限公司',
  contactName: '张三',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  address: '北京市朝阳区建国路88号SOHO现代城',
  industry: '信息技术',
  status: 'active',
  createdAt: '2024-01-01',
  owner: '李四',
  stats: {
    contacts: 3,
    follows: 5,
    businesses: 2,
    tasks: 4
  }
})

// 联系人列表
const contacts = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    position: '总经理'
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    position: '技术总监'
  },
  {
    id: 3,
    name: '王五',
    phone: '13700137000',
    position: '市场经理'
  }
])

// 跟进记录
const follows = ref([
  {
    id: 1,
    time: '2024-01-01 10:00',
    content: '初次接触，了解客户需求',
    user: '李四',
    remark: '客户对我们的产品很感兴趣，希望进一步了解'
  },
  {
    id: 2,
    time: '2024-01-02 14:00',
    content: '发送产品方案',
    user: '李四',
    remark: '已发送详细的产品方案和报价单'
  },
  {
    id: 3,
    time: '2024-01-05 11:00',
    content: '电话跟进，解答疑问',
    user: '李四',
    remark: '客户对方案中的一些细节提出了疑问，已详细解答'
  },
  {
    id: 4,
    time: '2024-01-10 15:00',
    content: '安排产品演示',
    user: '李四',
    remark: '客户希望安排产品演示，已确认时间'
  },
  {
    id: 5,
    time: '2024-01-15 14:00',
    content: '产品演示',
    user: '李四',
    remark: '产品演示成功，客户表示满意'
  }
])

// 商机列表
const businesses = ref([
  {
    id: 1,
    name: '企业管理系统',
    amount: 100000,
    stage: 'quotation',
    expectedDate: '2024-03-31'
  },
  {
    id: 2,
    name: '数据分析平台',
    amount: 50000,
    stage: 'analysis',
    expectedDate: '2024-04-15'
  }
])

// 任务列表
const tasks = ref([
  {
    id: 1,
    title: '跟进客户需求',
    description: '与ABC科技有限公司讨论企业管理系统的具体需求',
    deadline: '2024-01-15',
    status: 'pending',
    overdue: false
  },
  {
    id: 2,
    title: '发送产品方案',
    description: '向ABC科技有限公司发送企业管理系统的详细方案',
    deadline: '2024-01-10',
    status: 'pending',
    overdue: true
  },
  {
    id: 3,
    title: '安排产品演示',
    description: '为ABC科技有限公司安排产品演示',
    deadline: '2024-01-20',
    status: 'pending',
    overdue: false
  },
  {
    id: 4,
    title: '初次接触客户',
    description: '与ABC科技有限公司初次接触，了解基本需求',
    deadline: '2023-12-20',
    status: 'completed',
    overdue: false
  }
])

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

// 查看商机详情
const viewBusinessDetail = (id) => {
  router.push(`/mobile/business/detail/${id}`)
}

// 添加联系人
const addContact = () => {
  router.push('/mobile/contact/add')
}

// 添加跟进记录
const addFollow = () => {
  // 跳转到添加跟进记录页面
  router.push('/mobile/follow/add')
}

// 添加商机
const addBusiness = () => {
  router.push('/mobile/business/add')
}

// 编辑客户
const editCustomer = () => {
  router.push(`/mobile/customer/edit/${customer.value.id}`)
}

// 新建任务
const addTask = () => {
  router.push('/mobile/task/add')
}

// 页面加载时获取数据
onMounted(() => {
  // 模拟获取客户详情数据
  console.log('获取客户详情:', customer.value.id)
})
</script>

<style scoped>
.customer-detail {
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

/* 客户头部信息 */
.customer-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.customer-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-right: var(--spacing-sm);
  color: var(--text-color-primary);
}

.customer-company {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  margin-top: var(--spacing-xs);
}

.customer-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.status-active {
  background-color: rgba(22, 93, 255, 0.1);
  color: var(--primary-color);
}

.status-inactive {
  background-color: rgba(245, 63, 63, 0.1);
  color: var(--danger-color);
}

.status-potential {
  background-color: rgba(0, 180, 42, 0.1);
  color: var(--success-color);
}

/* 信息网格布局 */
.info-grid {
  margin-top: var(--spacing-sm);
}

.info-row {
  display: flex;
  margin-bottom: var(--spacing-sm);
}

.info-item {
  flex: 1;
  padding-right: var(--spacing-sm);
}

.info-item.full-width {
  flex: 100%;
  padding-right: 0;
}

.label {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  margin-bottom: 4px;
}

.value {
  font-size: var(--font-size-base);
  color: var(--text-color-primary);
  font-weight: var(--font-weight-medium);
}

/* 统计卡片 */
.stats-card {
  background-color: var(--card-background);
  padding: var(--spacing-sm);
}

.stats-grid {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

/* 卡片标题 */
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
}

/* 空状态 */
.empty-text {
  text-align: center;
  color: var(--text-color-secondary);
  padding: var(--spacing-md) 0;
  font-size: var(--font-size-sm);
}

/* 联系人列表 */
.contact-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color-light);
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-right: var(--spacing-sm);
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
  margin-bottom: 2px;
}

.contact-position {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  margin-bottom: 2px;
}

.contact-phone {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
}

.contact-actions {
  display: flex;
  align-items: center;
}

.action-icon {
  font-size: 20px;
  margin-left: var(--spacing-sm);
  color: var(--primary-color);
  cursor: pointer;
}

/* 跟进记录 */
.follow-item {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color-light);
}

.follow-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.follow-time {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.follow-user {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  font-weight: var(--font-weight-medium);
}

.follow-content {
  color: var(--text-color-primary);
  line-height: var(--line-height-text);
  margin-bottom: 8px;
}

.follow-remark {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  line-height: var(--line-height-text);
  background-color: var(--border-color-light);
  padding: 8px;
  border-radius: var(--border-radius-sm);
}

/* 商机列表 */
.business-item {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color-light);
  cursor: pointer;
  transition: var(--transition-fast);
}

.business-item:hover {
  background-color: var(--border-color-light);
}

.business-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.business-name {
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
  flex: 1;
  margin-right: var(--spacing-sm);
}

.business-stage {
  font-size: var(--font-size-xs);
  padding: 4px 12px;
  border-radius: var(--border-radius-full);
  font-weight: var(--font-weight-medium);
}

.stage-initial {
  background-color: rgba(134, 144, 156, 0.1);
  color: var(--info-color);
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
  background-color: rgba(134, 144, 156, 0.1);
  color: var(--info-color);
}

.stage-closed {
  background-color: rgba(0, 180, 42, 0.1);
  color: var(--success-color);
}

.stage-lost {
  background-color: rgba(245, 63, 63, 0.1);
  color: var(--danger-color);
}

.business-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.business-amount {
  color: var(--danger-color);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
}

.business-date {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

/* 任务列表 */
.task-item {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color-light);
}

.task-item:last-child {
  border-bottom: none;
}

.task-item.overdue {
  border-left: 4px solid var(--danger-color);
  padding-left: var(--spacing-sm);
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
}

.task-info {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  margin-bottom: var(--spacing-xs);
}

.task-time {
  flex: 1;
}

.task-status {
  padding: 2px 8px;
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.status-pending {
  background-color: rgba(255, 125, 0, 0.1);
  color: var(--warning-color);
}

.status-completed {
  background-color: rgba(0, 180, 42, 0.1);
  color: var(--success-color);
}

.task-description {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  line-height: var(--line-height-text);
}

/* 底部操作按钮 */
.bottom-actions {
  display: flex;
  padding: var(--spacing-sm);
  background-color: var(--card-background);
  border-top: 1px solid var(--border-color);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  margin: 0 var(--spacing-sm) var(--spacing-sm);
  border-radius: var(--border-radius-lg);
}

.action-btn {
  flex: 1;
  margin: 0 4px;
  height: 44px;
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
}
</style>