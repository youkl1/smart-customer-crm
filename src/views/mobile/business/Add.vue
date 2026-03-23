<template>
  <div class="business-add">
    <!-- 表单 -->
    <van-form @submit="saveBusiness">
      <van-field
        v-model="businessForm.name"
        name="name"
        label="商机名称"
        placeholder="请输入商机名称"
        :rules="[{ required: true, message: '请输入商机名称' }]"
      />
      <van-field
        v-model="businessForm.customer"
        name="customer"
        label="客户"
        placeholder="请选择客户"
        :rules="[{ required: true, message: '请选择客户' }]"
        @click="showCustomerPicker = true"
      />
      <van-popup
        v-model:show="showCustomerPicker"
        position="bottom"
      >
        <van-picker
          :columns="customerOptions"
          @confirm="(value, index) => {
            businessForm.customer = customerOptions[index].text;
            showCustomerPicker = false;
          }"
          @cancel="showCustomerPicker = false"
        />
      </van-popup>
      <van-field
        v-model="businessForm.amount"
        name="amount"
        label="预估金额"
        placeholder="请输入预估金额"
        type="number"
        :rules="[{ required: true, message: '请输入预估金额' }]"
      />
      <van-field
        v-model="businessForm.expectedDate"
        name="expectedDate"
        label="预计成交日"
        placeholder="请选择预计成交日"
        :rules="[{ required: true, message: '请选择预计成交日' }]"
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
            businessForm.expectedDate = value.format('YYYY-MM-DD');
            showDatePicker = false;
          }"
          @cancel="showDatePicker = false"
        />
      </van-popup>
      <van-field
        name="stage"
        label="阶段"
        :value="stageMap[businessForm.stage]"
        @click="showStagePicker = true"
      />
      <van-popup
        v-model:show="showStagePicker"
        position="bottom"
      >
        <van-picker
          :columns="stageOptions"
          @confirm="(value, index) => {
            businessForm.stage = Object.keys(stageMap)[index];
            showStagePicker = false;
          }"
          @cancel="showStagePicker = false"
        />
      </van-popup>
      <van-field
        v-model="businessForm.remark"
        name="remark"
        label="备注"
        placeholder="请输入备注"
        type="textarea"
      />
    </van-form>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const setSaveCallback = inject('setSaveCallback')

// 商机阶段映射
const stageMap = {
  'initial': '初步接触',
  'analysis': '需求分析',
  'quotation': '方案报价',
  'negotiation': '商务谈判',
  'closed': '成交',
  'lost': '失败'
}

// 阶段选择选项
const stageOptions = Object.values(stageMap)

// 客户选项
const customerOptions = [
  { text: 'ABC科技有限公司', value: '1' },
  { text: 'XYZ科技有限公司', value: '2' },
  { text: 'DEF科技有限公司', value: '3' }
]

// 表单数据
const businessForm = ref({
  name: '',
  customer: '',
  amount: '',
  expectedDate: '',
  stage: 'initial',
  remark: ''
})

// 选择器显示状态
const showCustomerPicker = ref(false)
const showDatePicker = ref(false)
const showStagePicker = ref(false)

// 日期选择值
const dateValue = ref(new Date())

// 保存商机信息
const saveBusiness = () => {
  // 模拟保存操作
  console.log('保存商机信息:', businessForm.value)
  
  // 显示保存成功提示
  showToast({
    message: '商机创建成功',
    type: 'success',
    duration: 2000
  })
  
  // 跳转到商机列表
  setTimeout(() => {
    router.push('/mobile/business')
  }, 2000)
}

// 组件挂载时注册保存回调
onMounted(() => {
  if (setSaveCallback) {
    setSaveCallback(saveBusiness)
  }
})
</script>

<style scoped>
.business-add {
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