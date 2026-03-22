<template>
  <div class="organization-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>组织架构管理</span>
          <el-button type="primary" size="small" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增部门
          </el-button>
        </div>
      </template>
      <el-table :data="departments" style="width: 100%">
        <el-table-column prop="id" label="部门ID" width="80" />
        <el-table-column prop="name" label="部门名称" />
        <el-table-column prop="parentName" label="上级部门" />
        <el-table-column prop="manager" label="部门经理" />
        <el-table-column prop="description" label="部门描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑部门对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="部门名称" required>
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="上级部门">
          <el-select v-model="form.parentId" placeholder="请选择上级部门">
            <el-option label="无" value="0" />
            <el-option 
              v-for="dept in departments" 
              :key="dept.id" 
              :label="dept.name" 
              :value="dept.id" 
              :disabled="form.id && dept.id === form.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门经理">
          <el-input v-model="form.manager" placeholder="请输入部门经理" />
        </el-form-item>
        <el-form-item label="部门描述">
          <el-input v-model="form.description" type="textarea" placeholder="请输入部门描述" />
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
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'

// 表格数据
const departments = ref([
  { id: 1, name: '总经办', parentName: '无', manager: '张三', description: '公司最高管理部门', createTime: '2024-01-01 00:00:00' },
  { id: 2, name: '销售部', parentName: '总经办', manager: '李四', description: '负责产品销售', createTime: '2024-01-01 00:00:00' },
  { id: 3, name: '市场部', parentName: '总经办', manager: '王五', description: '负责市场推广', createTime: '2024-01-01 00:00:00' },
  { id: 4, name: '技术部', parentName: '总经办', manager: '赵六', description: '负责技术开发', createTime: '2024-01-01 00:00:00' },
  { id: 5, name: '财务部', parentName: '总经办', manager: '孙七', description: '负责财务管理', createTime: '2024-01-01 00:00:00' }
])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(5)

// 对话框数据
const dialogVisible = ref(false)
const dialogTitle = ref('新增部门')
const form = ref({
  id: '',
  name: '',
  parentId: '0',
  manager: '',
  description: ''
})

// 生命周期
onMounted(() => {
  // 这里可以添加实际的API调用
})

// 方法
const handleAdd = () => {
  dialogTitle.value = '新增部门'
  form.value = {
    id: '',
    name: '',
    parentId: '0',
    manager: '',
    description: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑部门'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这个部门吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里可以添加实际的API调用
    departments.value = departments.value.filter(item => item.id !== id)
    total.value = departments.value.length
    ElMessage.success('删除成功')
  }).catch(() => {})
}

const handleSubmit = () => {
  if (!form.value.name) {
    ElMessage.error('请输入部门名称')
    return
  }
  
  // 这里可以添加实际的API调用
  if (form.value.id) {
    // 编辑
    const index = departments.value.findIndex(item => item.id === form.value.id)
    if (index !== -1) {
      departments.value[index] = { ...form.value }
      ElMessage.success('编辑成功')
    }
  } else {
    // 新增
    const newId = Math.max(...departments.value.map(item => item.id)) + 1
    const newDepartment = {
      ...form.value,
      id: newId,
      parentName: form.value.parentId === '0' ? '无' : departments.value.find(item => item.id === parseInt(form.value.parentId))?.name || '无',
      createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    departments.value.push(newDepartment)
    total.value = departments.value.length
    ElMessage.success('新增成功')
  }
  
  dialogVisible.value = false
}

const handleSizeChange = (size) => {
  pageSize.value = size
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}
</script>

<style scoped>
.organization-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>