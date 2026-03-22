<template>
  <div class="task-list">
    <!-- 任务状态切换 -->
    <van-tabs v-model="activeTab">
      <van-tab title="待办任务">
        <!-- 待办任务列表 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多数据了"
          @load="loadData"
        >
          <div
            v-for="task in todoTasks"
            :key="task.id"
            class="task-item"
            :class="{ 'overdue': task.overdue }"
          >
            <div class="task-content">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-info">
                <span class="task-time">截止时间：{{ task.deadline }}</span>
                <span class="task-customer">客户：{{ task.customer }}</span>
              </div>
              <div class="task-description">{{ task.description }}</div>
            </div>
            <div class="task-actions">
              <van-button
                type="primary"
                size="small"
                @click="completeTask(task.id)"
              >
                完成
              </van-button>
              <van-button
                size="small"
                @click="editTask(task.id)"
              >
                编辑
              </van-button>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="已办任务">
        <!-- 已办任务列表 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多数据了"
          @load="loadData"
        >
          <div
            v-for="task in doneTasks"
            :key="task.id"
            class="task-item done"
          >
            <div class="task-content">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-info">
                <span class="task-time">完成时间：{{ task.completedAt }}</span>
                <span class="task-customer">客户：{{ task.customer }}</span>
              </div>
              <div class="task-description">{{ task.description }}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 当前激活的标签
const activeTab = ref(0)

// 加载状态
const loading = ref(false)
const finished = ref(false)

// 待办任务列表
const todoTasks = ref([
  {
    id: 1,
    title: '跟进客户需求',
    description: '与ABC科技有限公司讨论企业管理系统的具体需求',
    deadline: '2024-01-15',
    customer: 'ABC科技有限公司',
    overdue: false
  },
  {
    id: 2,
    title: '发送产品方案',
    description: '向XYZ科技有限公司发送数据分析平台的产品方案',
    deadline: '2024-01-10',
    customer: 'XYZ科技有限公司',
    overdue: true
  },
  {
    id: 3,
    title: '合同审批',
    description: '审批DEF科技有限公司的CRM系统合同',
    deadline: '2024-01-20',
    customer: 'DEF科技有限公司',
    overdue: false
  }
])

// 已办任务列表
const doneTasks = ref([
  {
    id: 4,
    title: '初次接触客户',
    description: '与ABC科技有限公司初次接触，了解基本需求',
    completedAt: '2024-01-01',
    customer: 'ABC科技有限公司'
  },
  {
    id: 5,
    title: '需求分析',
    description: '分析XYZ科技有限公司的数据分析平台需求',
    completedAt: '2024-01-05',
    customer: 'XYZ科技有限公司'
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

// 完成任务
const completeTask = (id) => {
  console.log('完成任务:', id)
  // 模拟完成任务操作
  showToast({
    message: '任务已完成',
    type: 'success',
    duration: 2000
  })
  
  // 从待办任务中移除，添加到已办任务
  const task = todoTasks.value.find(item => item.id === id)
  if (task) {
    todoTasks.value = todoTasks.value.filter(item => item.id !== id)
    doneTasks.value.unshift({
      ...task,
      completedAt: new Date().toISOString().split('T')[0]
    })
  }
}

// 编辑任务
const editTask = (id) => {
  router.push(`/mobile/task/edit/${id}`)
}

// 新增任务
const addTask = () => {
  router.push('/mobile/task/add')
}
</script>

<style scoped>
.task-list {
  padding: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

:deep(.van-tabs) {
  background-color: var(--card-background);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

:deep(.van-tab) {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

:deep(.van-tab--active) {
  color: var(--primary-color);
}

:deep(.van-tabs__line) {
  background-color: var(--primary-color);
}

.task-item {
  padding: var(--spacing-sm);
  background-color: var(--card-background);
  margin: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.task-item:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-xs);
}

.task-item.overdue {
  border-left: 4px solid var(--danger-color);
}

.task-item.done {
  opacity: 0.7;
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

.task-description {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  margin-bottom: var(--spacing-sm);
  line-height: var(--line-height-text);
}

.task-actions {
  display: flex;
  justify-content: flex-end;
}

.task-actions button {
  margin-left: var(--spacing-xs);
  border-radius: var(--border-radius-sm);
}

:deep(.van-button--primary) {
  background-color: var(--primary-color);
}

:deep(.van-button--default) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
</style>