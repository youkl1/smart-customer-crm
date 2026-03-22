<template>
  <div class="business-edit">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="编辑商机"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      right-text="保存"
      @click-right="saveBusiness"
    />
    
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
  alert('商机更新成功')
  
  // 跳转到商机详情
  router.push(`/mobile/business/detail/${route.params.id}`)
}

// 页面加载时获取商机数据
onMounted(() => {
  // 模拟获取商机数据
  console.log('获取商机数据:', route.params.id)
  
  // 模拟数据
  businessForm.value = {
    name: '企业管理系统',
    customer: 'ABC科技有限公司',
    amount: '100000',
    expectedDate: '2024-02-01',
    stage: 'quotation',
    remark: '重要商机'
  }
  
  // 设置日期选择器值
  dateValue.value = new Date(businessForm.value.expectedDate)
})
</script>

<style scoped>
.business-edit {
  padding: 10px;
}
</style>