<template>
  <div class="contract-edit">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>编辑合同</h2>
      <el-button type="primary" @click="saveContract" :loading="loading">保存</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </div>
    
    <!-- 表单 -->
    <el-form
      :model="contractForm"
      :rules="rules"
      ref="formRef"
      label-width="120px"
    >
      <el-form-item label="合同名称" prop="name">
        <el-input v-model="contractForm.name" placeholder="请输入合同名称" />
      </el-form-item>
      <el-form-item label="客户" prop="customer">
        <el-select v-model="contractForm.customer" placeholder="请选择客户">
          <el-option
            v-for="customer in customerOptions"
            :key="customer.value"
            :label="customer.text"
            :value="customer.text"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合同金额" prop="amount">
        <el-input v-model="contractForm.amount" type="number" placeholder="请输入合同金额" />
      </el-form-item>
      <el-form-item label="开始日期" prop="startDate">
        <el-date-picker
          v-model="contractForm.startDate"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="结束日期" prop="endDate">
        <el-date-picker
          v-model="contractForm.endDate"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="contractForm.status" placeholder="请选择状态">
          <el-option
            v-for="(label, value) in statusMap"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="contractForm.remark"
          type="textarea"
          :rows="3"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 合同状态映射
const statusMap = {
  'draft': '草稿',
  'pending': '待审批',
  'approved': '已审批',
  'active': '生效中',
  'expired': '已过期',
  'canceled': '已作废'
}

// 客户选项
const customerOptions = [
  { text: 'ABC科技有限公司', value: '1' },
  { text: 'XYZ科技有限公司', value: '2' },
  { text: 'DEF科技有限公司', value: '3' }
]

// 表单引用
const formRef = ref(null)

// 加载状态
const loading = ref(false)

// 表单数据
const contractForm = ref({
  name: '',
  customer: '',
  amount: '',
  startDate: '',
  endDate: '',
  status: 'draft',
  remark: ''
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入合同名称', trigger: 'blur' }
  ],
  customer: [
    { required: true, message: '请选择客户', trigger: 'blur' }
  ],
  amount: [
    { required: true, message: '请输入合同金额', trigger: 'blur' },
    { type: 'number', message: '请输入正确的金额', trigger: 'blur' }
  ],
  startDate: [
    { required: true, message: '请选择开始日期', trigger: 'blur' }
  ],
  endDate: [
    { required: true, message: '请选择结束日期', trigger: 'blur' }
  ]
}

// 保存合同信息
const saveContract = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟保存操作
    console.log('保存合同信息:', contractForm.value)
    
    // 模拟保存成功
    setTimeout(() => {
      loading.value = false
      alert('合同更新成功')
      router.push('/web/contract')
    }, 1000)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 页面加载时获取合同数据
onMounted(() => {
  // 模拟获取合同数据
  console.log('获取合同数据:', route.params.id)
  
  // 模拟数据
  contractForm.value = {
    name: '企业管理系统合同',
    customer: 'ABC科技有限公司',
    amount: 100000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2025-01-01'),
    status: 'active',
    remark: '重要合同'
  }
})
</script>

<style scoped>
.contract-edit {
  padding: 20px;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  flex: 1;
  margin: 0;
}

.page-header button {
  margin-left: 10px;
}

.el-form {
  max-width: 800px;
}
</style>