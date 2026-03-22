<template>
  <div class="web-receivable-edit">
    <div class="page-header">
      <h1>编辑回款</h1>
      <el-button @click="router.back()">返回</el-button>
    </div>
    
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-card>
        <el-form-item label="回款编号">
          <el-input v-model="formData.receivableNo" disabled />
        </el-form-item>
        
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="formData.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        
        <el-form-item label="回款金额" prop="amount">
          <el-input-number 
            v-model="formData.amount" 
            :min="0" 
            :step="0.01" 
            :precision="2" 
            placeholder="请输入回款金额"
          />
        </el-form-item>
        
        <el-form-item label="回款日期" prop="receivableDate">
          <el-date-picker
            v-model="formData.receivableDate"
            type="datetime"
            placeholder="选择日期时间"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="回款状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">待审批</el-radio>
            <el-radio :label="2">已审批</el-radio>
            <el-radio :label="3">已拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="回款备注">
          <el-input 
            v-model="formData.remark" 
            type="textarea" 
            rows="4" 
            placeholder="请输入回款备注"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { receivableApi } from '@/api/receivable'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const receivableId = route.params.id

// 表单数据
const formData = reactive({
  receivableNo: '',
  customerName: '',
  amount: 0,
  receivableDate: new Date(),
  status: 1,
  remark: ''
})

// 表单验证规则
const rules = {
  customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入回款金额', trigger: 'blur' }],
  receivableDate: [{ required: true, message: '请选择回款日期', trigger: 'change' }]
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    // 模拟提交
    await receivableApi.update(receivableId, formData)
    
    ElMessage.success('回款更新成功')
    router.push('/web/payment')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('回款更新失败，请重试')
    }
  }
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 获取回款详情
const getReceivableDetail = async () => {
  try {
    const res = await receivableApi.getDetail(receivableId)
    const receivable = res.data
    
    formData.receivableNo = receivable.receivableNo
    formData.customerName = receivable.customerName
    formData.amount = receivable.amount
    formData.receivableDate = new Date(receivable.receivableDate)
    formData.status = receivable.status
    formData.remark = receivable.remark || ''
  } catch (error) {
    console.error('获取回款详情失败:', error)
    ElMessage.error('获取回款详情失败')
  }
}

onMounted(() => {
  getReceivableDetail()
})
</script>

<style scoped>
.web-receivable-edit {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

el-card {
  margin-bottom: 20px;
}
</style>