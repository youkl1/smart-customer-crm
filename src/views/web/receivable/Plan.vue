<template>
  <div class="web-receivable-plan">
    <div class="page-header">
      <h1>回款计划</h1>
      <el-button type="primary" @click="dialogVisible = true">
        <el-icon><Plus /></el-icon>
        新增计划
      </el-button>
    </div>
    
    <!-- 计划列表 -->
    <el-table :data="plans" style="width: 100%">
      <el-table-column prop="id" label="计划ID" width="80" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="amount" label="计划金额" width="120">
        <template #default="scope">
          ¥{{ scope.row.amount.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="planDate" label="计划日期" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="formData.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="计划金额" prop="amount">
          <el-input-number 
            v-model="formData.amount" 
            :min="0" 
            :step="0.01" 
            :precision="2" 
            placeholder="请输入计划金额"
          />
        </el-form-item>
        <el-form-item label="计划日期" prop="planDate">
          <el-date-picker
            v-model="formData.planDate"
            type="date"
            placeholder="选择计划日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">待回款</el-radio>
            <el-radio :label="2">已回款</el-radio>
            <el-radio :label="3">逾期</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 计划列表
const plans = ref([
  { id: 1, customerName: '北京科技有限公司', amount: 19999, planDate: '2024-01-15', status: 1 },
  { id: 2, customerName: '上海创新科技', amount: 9999, planDate: '2024-01-20', status: 2 },
  { id: 3, customerName: '广州未来科技', amount: 29999, planDate: '2024-01-25', status: 1 },
  { id: 4, customerName: '深圳互联网公司', amount: 5999, planDate: '2024-01-10', status: 3 }
])

// 对话框
const dialogVisible = ref(false)
const dialogTitle = ref('新增计划')
const formRef = ref(null)

// 表单数据
const formData = reactive({
  id: '',
  customerName: '',
  amount: 0,
  planDate: '',
  status: 1
})

// 表单验证规则
const rules = {
  customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入计划金额', trigger: 'blur' }],
  planDate: [{ required: true, message: '请选择计划日期', trigger: 'change' }]
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    1: '待回款',
    2: '已回款',
    3: '逾期'
  }
  return statusMap[status] || '未知'
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    1: 'info',
    2: 'success',
    3: 'danger'
  }
  return typeMap[status] || 'info'
}

// 编辑计划
const handleEdit = (row) => {
  dialogTitle.value = '编辑计划'
  formData.id = row.id
  formData.customerName = row.customerName
  formData.amount = row.amount
  formData.planDate = row.planDate
  formData.status = row.status
  dialogVisible.value = true
}

// 删除计划
const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除该计划吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 模拟删除
    plans.value = plans.value.filter(item => item.id !== id)
    ElMessage.success('删除成功')
  })
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    if (formData.id) {
      // 编辑
      const index = plans.value.findIndex(item => item.id === formData.id)
      if (index !== -1) {
        plans.value[index] = { ...formData }
      }
      ElMessage.success('编辑成功')
    } else {
      // 新增
      const newPlan = {
        id: Date.now(),
        ...formData
      }
      plans.value.push(newPlan)
      ElMessage.success('新增成功')
    }
    
    dialogVisible.value = false
    resetForm()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('操作失败，请重试')
    }
  }
}

// 重置表单
const resetForm = () => {
  formData.id = ''
  formData.customerName = ''
  formData.amount = 0
  formData.planDate = ''
  formData.status = 1
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
.web-receivable-plan {
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

.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>