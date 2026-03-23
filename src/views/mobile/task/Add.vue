<template>
  <div class="task-add">
    <!-- 表单 -->
    <van-form @submit="saveTask">
      <van-field
        v-model="taskForm.title"
        name="title"
        label="任务标题"
        placeholder="请输入任务标题"
        :rules="[{ required: true, message: '请输入任务标题' }]"
      />
      <van-field
        v-model="taskForm.customer"
        name="customer"
        label="关联客户"
        placeholder="请选择客户"
        @click="showCustomerPicker = true"
      />
      <van-popup
        v-model:show="showCustomerPicker"
        position="bottom"
      >
        <van-picker
          :columns="customerOptions"
          @confirm="(value, index) => {
            taskForm.customer = customerOptions[index].text;
            showCustomerPicker = false;
          }"
          @cancel="showCustomerPicker = false"
        />
      </van-popup>
      <van-field
        v-model="taskForm.deadline"
        name="deadline"
        label="截止时间"
        placeholder="请选择截止时间"
        @click="showDatePicker = true"
      />
      <van-popup
        v-model:show="showDatePicker"
        position="bottom"
      >
        <van-datetime-picker
          type="date"
          v-model="dateValue"
          @confirm="(value) => {
            taskForm.deadline = value.format('YYYY-MM-DD');
            showDatePicker = false;
          }"
          @cancel="showDatePicker = false"
        />
      </van-popup>
      <van-field
        v-model="taskForm.description"
        name="description"
        label="任务描述"
        placeholder="请输入任务描述"
        type="textarea"
      />
      <van-field
        name="reminder"
        label="提醒设置"
        :value="reminderMap[taskForm.reminder]"
        @click="showReminderPicker = true"
      />
      <van-popup
        v-model:show="showReminderPicker"
        position="bottom"
      >
        <van-picker
          :columns="reminderOptions"
          @confirm="(value, index) => {
            taskForm.reminder = Object.keys(reminderMap)[index];
            showReminderPicker = false;
          }"
          @cancel="showReminderPicker = false"
        />
      </van-popup>
    </van-form>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const setSaveCallback = inject('setSaveCallback')

// 客户选项
const customerOptions = [
  { text: 'ABC科技有限公司', value: '1' },
  { text: 'XYZ科技有限公司', value: '2' },
  { text: 'DEF科技有限公司', value: '3' }
]

// 提醒设置映射
const reminderMap = {
  'none': '不提醒',
  '30min': '提前30分钟',
  '1h': '提前1小时',
  '1d': '提前1天'
}

// 提醒选项
const reminderOptions = Object.values(reminderMap)

// 表单数据
const taskForm = ref({
  title: '',
  customer: '',
  deadline: '',
  description: '',
  reminder: 'none'
})

// 选择器显示状态
const showCustomerPicker = ref(false)
const showDatePicker = ref(false)
const showReminderPicker = ref(false)

// 日期选择值
const dateValue = ref(new Date())

// 保存任务信息
const saveTask = () => {
  // 模拟保存操作
  console.log('保存任务信息:', taskForm.value)
  
  // 显示保存成功提示
  showToast({
    message: '任务创建成功',
    type: 'success',
    duration: 2000
  })
  
  // 跳转到任务列表
  setTimeout(() => {
    router.push('/mobile/task')
  }, 2000)
}

// 组件挂载时注册保存回调
onMounted(() => {
  if (setSaveCallback) {
    setSaveCallback(saveTask)
  }
})
</script>

<style scoped>
.task-add {
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

/* 自定义表单样式 */
:deep(.van-form) {
  background-color: var(--card-background);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-sm);
}

:deep(.van-field) {
  margin-bottom: var(--spacing-sm);
}

:deep(.van-field__label) {
  color: var(--text-color-regular);
  font-size: var(--font-size-sm);
}

:deep(.van-field__input) {
  color: var(--text-color-primary);
  font-size: var(--font-size-base);
}

:deep(.van-field__placeholder) {
  color: var(--text-color-placeholder);
}
</style>