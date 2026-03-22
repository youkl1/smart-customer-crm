<template>
  <div class="business-add">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>新增商机</h2>
      <el-button type="primary" @click="saveBusiness" :loading="loading">保存</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </div>
    
    <!-- 表单 -->
    <el-form
      :model="businessForm"
      :rules="rules"
      ref="formRef"
      label-width="120px"
    >
      <el-form-item label="商机名称" prop="name">
        <el-input v-model="businessForm.name" placeholder="请输入商机名称" />
      </el-form-item>
      <el-form-item label="客户" prop="customer">
        <el-select v-model="businessForm.customer" placeholder="请选择客户">
          <el-option
            v-for="customer in customerOptions"
            :key="customer.value"
            :label="customer.text"
            :value="customer.text"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="预估金额" prop="amount">
        <el-input v-model="businessForm.amount" type="number" placeholder="请输入预估金额" />
      </el-form-item>
      <el-form-item label="预计成交日" prop="expectedDate">
        <el-date-picker
          v-model="businessForm.expectedDate"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="阶段" prop="stage">
        <el-select v-model="businessForm.stage" placeholder="请选择阶段">
          <el-option
            v-for="(label, value) in stageMap"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" prop="owner">
        <el-select v-model="businessForm.owner" placeholder="请选择负责人">
          <el-option
            v-for="user in userOptions"
            :key="user.value"
            :label="user.text"
            :value="user.text"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="businessForm.remark"
          type="textarea"
          :rows="3"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

// 客户选项
const customerOptions = [
  { text: 'ABC科技有限公司', value: '1' },
  { text: 'XYZ科技有限公司', value: '2' },
  { text: 'DEF科技有限公司', value: '3' }
]

// 用户选项
const userOptions = [
  { text: '张三', value: '1' },
  { text: '李四', value: '2' },
  { text: '王五', value: '3' }
]

// 表单引用
const formRef = ref(null)

// 加载状态
const loading = ref(false)

// 表单数据
const businessForm = ref({
  name: '',
  customer: '',
  amount: '',
  expectedDate: '',
  stage: 'initial',
  owner: '',
  remark: ''
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入商机名称', trigger: 'blur' }
  ],
  customer: [
    { required: true, message: '请选择客户', trigger: 'blur' }
  ],
  amount: [
    { required: true, message: '请输入预估金额', trigger: 'blur' },
    { type: 'number', message: '请输入正确的金额', trigger: 'blur' }
  ],
  expectedDate: [
    { required: true, message: '请选择预计成交日', trigger: 'blur' }
  ],
  owner: [
    { required: true, message: '请选择负责人', trigger: 'blur' }
  ]
}

// 保存商机信息
const saveBusiness = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟保存操作
    console.log('保存商机信息:', businessForm.value)
    
    // 模拟保存成功
    setTimeout(() => {
      loading.value = false
      alert('商机创建成功')
      router.push('/web/business')
    }, 1000)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<style scoped>
.business-add {
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