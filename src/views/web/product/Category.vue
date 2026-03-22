<template>
  <div class="web-product-category">
    <div class="page-header">
      <h1>产品分类</h1>
      <el-button type="primary" @click="dialogVisible = true">
        <el-icon><Plus /></el-icon>
        新增分类
      </el-button>
    </div>
    
    <!-- 分类列表 -->
    <el-table :data="categories" style="width: 100%">
      <el-table-column prop="id" label="分类ID" width="80" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
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
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入分类名称" />
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

// 分类列表
const categories = ref([
  { id: 1, name: '软件产品', createTime: '2024-01-01 10:00:00' },
  { id: 2, name: '硬件产品', createTime: '2024-01-01 10:00:00' },
  { id: 3, name: '服务产品', createTime: '2024-01-01 10:00:00' },
  { id: 4, name: '配件产品', createTime: '2024-01-01 10:00:00' }
])

// 对话框
const dialogVisible = ref(false)
const dialogTitle = ref('新增分类')
const formRef = ref(null)

// 表单数据
const formData = reactive({
  id: '',
  name: ''
})

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}

// 编辑分类
const handleEdit = (row) => {
  dialogTitle.value = '编辑分类'
  formData.id = row.id
  formData.name = row.name
  dialogVisible.value = true
}

// 删除分类
const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除该分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 模拟删除
    categories.value = categories.value.filter(item => item.id !== id)
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
      const index = categories.value.findIndex(item => item.id === formData.id)
      if (index !== -1) {
        categories.value[index] = { ...formData, createTime: categories.value[index].createTime }
      }
      ElMessage.success('编辑成功')
    } else {
      // 新增
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      categories.value.push(newCategory)
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
  formData.name = ''
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
.web-product-category {
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