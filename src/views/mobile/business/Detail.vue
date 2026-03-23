<template>
  <div class="business-detail">
    <!-- 基本信息 -->
    <div class="info-card" :style="{ margin: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--card-background)', padding: 'var(--spacing-sm)' }">
      <div class="business-header">
        <div class="business-name">{{ business.name }}</div>
        <div class="business-stage" :class="`stage-${business.stage}`">
          {{ stageMap[business.stage] }}
        </div>
      </div>
      <div class="info-item">
        <span class="label">客户：</span>
        <span class="value">{{ business.customer }}</span>
      </div>
      <div class="info-item">
        <span class="label">预估金额：</span>
        <span class="value amount">¥{{ business.amount }}</span>
      </div>
      <div class="info-item">
        <span class="label">预计成交日：</span>
        <span class="value">{{ business.expectedDate }}</span>
      </div>
      <div class="info-item">
        <span class="label">负责人：</span>
        <span class="value">{{ business.owner }}</span>
      </div>
      <div class="info-item">
        <span class="label">创建时间：</span>
        <span class="value">{{ business.createdAt }}</span>
      </div>
      <div class="info-item">
        <span class="label">成交概率：</span>
        <span class="value">{{ business.probability }}%</span>
      </div>
      <div class="info-item full-width">
        <span class="label">商机描述：</span>
        <span class="value">{{ business.description }}</span>
      </div>
    </div>
    
    <!-- 产品列表 -->
    <div class="products-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--card-background)', padding: 'var(--spacing-sm)' }">
      <div class="card-title">
        <span class="card-title-text">产品明细</span>
      </div>
      <div class="products-list">
        <div 
          v-for="(product, index) in business.products" 
          :key="index"
          class="product-item"
        >
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">¥{{ product.price.toLocaleString() }}</div>
        </div>
        <div class="product-total">
          <div class="total-label">总计</div>
          <div class="total-price">¥{{ business.amount.toLocaleString() }}</div>
        </div>
      </div>
    </div>
    
    <!-- 销售漏斗 -->
    <div class="funnel-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--card-background)', padding: 'var(--spacing-sm)' }">
      <div class="card-title">
        <span class="card-title-text">销售漏斗</span>
      </div>
      <div class="funnel-container">
        <div 
          v-for="(stage, index) in stages" 
          :key="stage.value"
          class="funnel-stage"
          :class="{
            'active': business.stage === stage.value,
            'completed': index < stageIndex
          }"
        >
          <div class="stage-name">{{ stage.label }}</div>
          <div class="stage-line"></div>
        </div>
      </div>
    </div>
    
    <!-- 跟进记录 -->
    <div class="follow-card" :style="{ margin: '0 var(--spacing-sm) var(--spacing-sm)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--card-background)', padding: 'var(--spacing-sm)' }">
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
      <div v-if="follows.length === 0" class="empty-text">
        暂无跟进记录
      </div>
      <div v-else class="follow-list">
        <div 
          v-for="follow in follows" 
          :key="follow.id" 
          class="follow-item"
        >
          <div class="follow-time">{{ follow.time }}</div>
          <div class="follow-content">{{ follow.content }}</div>
          <div v-if="follow.remark" class="follow-remark">{{ follow.remark }}</div>
          <div class="follow-user">{{ follow.user }}</div>
        </div>
      </div>
    </div>
    
    <!-- 底部操作按钮 -->
    <div class="bottom-actions">
      <van-button 
        type="default" 
        class="action-btn" 
        @click="advanceStage"
        :disabled="business.stage === 'closed' || business.stage === 'lost'"
      >
        推进阶段
      </van-button>
      <van-button 
        type="primary" 
        class="action-btn" 
        @click="addTask"
      >
        新建任务
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
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

// 阶段顺序
const stages = [
  { value: 'initial', label: '初步接触' },
  { value: 'analysis', label: '需求分析' },
  { value: 'quotation', label: '方案报价' },
  { value: 'negotiation', label: '商务谈判' },
  { value: 'closed', label: '成交' },
  { value: 'lost', label: '失败' }
]

// 商机信息
const business = ref({
  id: route.params.id,
  name: '企业管理系统',
  customer: 'ABC科技有限公司',
  amount: 100000,
  stage: 'quotation',
  expectedDate: '2024-02-01',
  owner: '李四',
  createdAt: '2024-01-01',
  description: '为ABC科技有限公司开发一套完整的企业管理系统，包括客户管理、项目管理、财务管理等模块',
  products: [
    { name: '客户管理模块', price: 30000 },
    { name: '项目管理模块', price: 25000 },
    { name: '财务管理模块', price: 20000 },
    { name: '系统集成服务', price: 25000 }
  ],
  probability: 75
})

// 当前阶段索引
const stageIndex = computed(() => {
  return stages.findIndex(stage => stage.value === business.value.stage)
})

// 跟进记录
const follows = ref([
  {
    id: 1,
    time: '2024-01-01 10:00',
    content: '初次接触，了解客户需求',
    user: '李四',
    remark: '客户对企业管理系统有明确需求，希望能够整合现有业务流程'
  },
  {
    id: 2,
    time: '2024-01-02 14:00',
    content: '发送产品方案',
    user: '李四',
    remark: '根据客户需求定制了详细的产品方案，包括系统架构、功能模块和实施计划'
  },
  {
    id: 3,
    time: '2024-01-05 10:00',
    content: '讨论方案细节',
    user: '李四',
    remark: '与客户技术团队讨论了系统集成和数据迁移方案'
  },
  {
    id: 4,
    time: '2024-01-10 15:00',
    content: '提交报价单',
    user: '李四',
    remark: '根据最终方案提交了详细的报价单，包含各模块价格和实施费用'
  },
  {
    id: 5,
    time: '2024-01-15 11:00',
    content: '跟进报价反馈',
    user: '李四',
    remark: '客户对报价基本认可，正在内部审批中，预计下周有结果'
  }
])

// 推进阶段
const advanceStage = () => {
  // 模拟推进阶段操作
  console.log('推进阶段:', business.value.stage)
  
  // 显示推进成功提示
  showToast({
    message: '阶段推进成功',
    type: 'success',
    duration: 2000
  })
  
  // 更新阶段
  const currentIndex = stageIndex.value
  if (currentIndex < stages.length - 2) { // 排除成交和失败
    business.value.stage = stages[currentIndex + 1].value
  }
}

// 添加跟进记录
const addFollow = () => {
  // 跳转到添加跟进记录页面
  router.push('/mobile/follow/add')
}

// 编辑商机
const editBusiness = () => {
  router.push(`/mobile/business/edit/${business.value.id}`)
}

// 新建任务
const addTask = () => {
  router.push('/mobile/task/add')
}

// 页面加载时获取数据
onMounted(() => {
  // 模拟获取商机详情数据
  console.log('获取商机详情:', business.value.id)
  console.log('产品明细:', business.value.products)
  console.log('跟进记录:', follows.value)
  console.log('销售漏斗阶段:', stages)
  
  // 确保数据正确显示
  console.log('商机数据:', business.value)
  console.log('跟进记录数据:', follows.value)
  console.log('产品数据:', business.value.products)
})
</script>

<style scoped>
.business-detail {
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
  display: block !important;
}

.info-card {
  margin-bottom: var(--spacing-sm);
}

.business-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.business-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-color-primary);
  margin-right: var(--spacing-sm);
  flex: 1;
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

.info-item {
  display: flex;
  margin-bottom: var(--spacing-sm);
}

.label {
  width: 80px;
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
}

.value {
  flex: 1;
  color: var(--text-color-primary);
  font-size: var(--font-size-base);
}

.amount {
  font-weight: var(--font-weight-bold);
  color: var(--danger-color);
}

.funnel-card {
  margin-bottom: var(--spacing-sm);
}

.funnel-container {
  padding: var(--spacing-md) 0;
}

.funnel-stage {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  position: relative;
}

.stage-name {
  width: 100px;
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
}

.stage-line {
  flex: 1;
  height: 4px;
  background-color: var(--border-color-light);
  border-radius: 2px;
  margin-left: var(--spacing-sm);
}

.funnel-stage.active .stage-name {
  color: var(--primary-color);
  font-weight: var(--font-weight-semibold);
}

.funnel-stage.active .stage-line {
  background-color: var(--primary-color);
}

.funnel-stage.completed .stage-name {
  color: var(--success-color);
  font-weight: var(--font-weight-medium);
}

.funnel-stage.completed .stage-line {
  background-color: var(--success-color);
}

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

.empty-text {
  text-align: center;
  color: var(--text-color-secondary);
  padding: var(--spacing-md) 0;
  font-size: var(--font-size-sm);
}

.follow-item {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color-light);
}

.follow-time {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  margin-bottom: var(--spacing-xs);
}

.follow-content {
  color: var(--text-color-primary);
  line-height: var(--line-height-text);
  margin-bottom: var(--spacing-xs);
}

.follow-user {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  text-align: right;
  font-weight: var(--font-weight-medium);
}

.follow-remark {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  background-color: var(--border-color-light);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--spacing-xs);
  line-height: var(--line-height-text);
}

.products-card {
  margin-bottom: var(--spacing-sm);
}

.products-list {
  padding: var(--spacing-xs) 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--border-color-light);
}

.product-name {
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
}

.product-price {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  font-weight: var(--font-weight-medium);
}

.product-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  margin-top: var(--spacing-xs);
  border-top: 1px solid var(--border-color);
}

.total-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
}

.total-price {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--danger-color);
}

.info-item.full-width {
  flex-direction: column;
  align-items: flex-start;
}

.info-item.full-width .label {
  width: 100%;
  margin-bottom: var(--spacing-xs);
}

.info-item.full-width .value {
  width: 100%;
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
  border-radius: var(--border-radius-md);
}

:deep(.van-button--primary) {
  background-color: var(--primary-color);
}

:deep(.van-button--default) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
</style>