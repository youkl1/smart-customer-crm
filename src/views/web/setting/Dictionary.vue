<template>
  <div class="dictionary-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>字典管理</span>
          <el-button type="primary" size="small" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增字典
          </el-button>
        </div>
      </template>
      <el-table :data="dictionaries" style="width: 100%">
        <el-table-column prop="id" label="字典ID" width="80" />
        <el-table-column prop="code" label="字典编码" />
        <el-table-column prop="name" label="字典名称" />
        <el-table-column prop="description" label="字典描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="primary" @click="handleItems(scope.row)">字典项</el-button>
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

    <!-- 新增/编辑字典对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="字典编码" required>
          <el-input v-model="form.code" placeholder="请输入字典编码" />
        </el-form-item>
        <el-form-item label="字典名称" required>
          <el-input v-model="form.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典描述">
          <el-input v-model="form.description" type="textarea" placeholder="请输入字典描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 字典项管理对话框 -->
    <el-dialog v-model="itemsVisible" :title="`${currentDictionary?.name} - 字典项管理`" width="600px">
      <div class="items-header">
        <el-button type="primary" size="small" @click="handleAddItem">
          <el-icon><Plus /></el-icon>
          新增字典项
        </el-button>
      </div>
      <el-table :data="dictionaryItems" style="width: 100%">
        <el-table-column prop="id" label="项ID" width="80" />
        <el-table-column prop="code" label="项编码" />
        <el-table-column prop="value" label="项值" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">
              {{ scope.row.status === '1' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEditItem(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDeleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="itemsVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增/编辑字典项对话框 -->
    <el-dialog v-model="itemDialogVisible" :title="itemDialogTitle" width="400px">
      <el-form :model="itemForm" label-width="80px">
        <el-form-item label="项编码" required>
          <el-input v-model="itemForm.code" placeholder="请输入项编码" />
        </el-form-item>
        <el-form-item label="项值" required>
          <el-input v-model="itemForm.value" placeholder="请输入项值" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="itemForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="itemForm.status" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="itemDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleItemSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'

// 表格数据
const dictionaries = ref([
  { id: 1, code: 'customer_type', name: '客户类型', description: '客户分类', createTime: '2024-01-01 00:00:00' },
  { id: 2, code: 'business_stage', name: '商机阶段', description: '商机状态', createTime: '2024-01-01 00:00:00' },
  { id: 3, code: 'contract_status', name: '合同状态', description: '合同状态', createTime: '2024-01-01 00:00:00' },
  { id: 4, code: 'payment_status', name: '回款状态', description: '回款状态', createTime: '2024-01-01 00:00:00' }
])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(4)

// 对话框数据
const dialogVisible = ref(false)
const dialogTitle = ref('新增字典')
const form = ref({
  id: '',
  code: '',
  name: '',
  description: ''
})

// 字典项管理
const itemsVisible = ref(false)
const currentDictionary = ref(null)
const dictionaryItems = ref([
  { id: 1, code: '1', value: '个人客户', sort: 1, status: '1' },
  { id: 2, code: '2', value: '企业客户', sort: 2, status: '1' },
  { id: 3, code: '3', value: '政府客户', sort: 3, status: '1' }
])

// 字典项对话框
const itemDialogVisible = ref(false)
const itemDialogTitle = ref('新增字典项')
const itemForm = ref({
  id: '',
  code: '',
  value: '',
  sort: 0,
  status: '1'
})

// 生命周期
onMounted(() => {
  // 这里可以添加实际的API调用
})

// 方法
const handleAdd = () => {
  dialogTitle.value = '新增字典'
  form.value = {
    id: '',
    code: '',
    name: '',
    description: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑字典'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这个字典吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里可以添加实际的API调用
    dictionaries.value = dictionaries.value.filter(item => item.id !== id)
    total.value = dictionaries.value.length
    ElMessage.success('删除成功')
  }).catch(() => {})
}

const handleSubmit = () => {
  if (!form.value.code || !form.value.name) {
    ElMessage.error('请输入字典编码和名称')
    return
  }
  
  // 这里可以添加实际的API调用
  if (form.value.id) {
    // 编辑
    const index = dictionaries.value.findIndex(item => item.id === form.value.id)
    if (index !== -1) {
      dictionaries.value[index] = { ...form.value }
      ElMessage.success('编辑成功')
    }
  } else {
    // 新增
    const newId = Math.max(...dictionaries.value.map(item => item.id)) + 1
    const newDictionary = {
      ...form.value,
      id: newId,
      createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    dictionaries.value.push(newDictionary)
    total.value = dictionaries.value.length
    ElMessage.success('新增成功')
  }
  
  dialogVisible.value = false
}

const handleItems = (row) => {
  currentDictionary.value = row
  // 模拟字典项数据
  if (row.code === 'customer_type') {
    dictionaryItems.value = [
      { id: 1, code: '1', value: '个人客户', sort: 1, status: '1' },
      { id: 2, code: '2', value: '企业客户', sort: 2, status: '1' },
      { id: 3, code: '3', value: '政府客户', sort: 3, status: '1' }
    ]
  } else if (row.code === 'business_stage') {
    dictionaryItems.value = [
      { id: 1, code: '1', value: '初步接触', sort: 1, status: '1' },
      { id: 2, code: '2', value: '需求分析', sort: 2, status: '1' },
      { id: 3, code: '3', value: '方案制定', sort: 3, status: '1' },
      { id: 4, code: '4', value: '商务谈判', sort: 4, status: '1' },
      { id: 5, code: '5', value: '成交', sort: 5, status: '1' },
      { id: 6, code: '6', value: '失败', sort: 6, status: '1' }
    ]
  } else {
    dictionaryItems.value = [
      { id: 1, code: '1', value: '选项1', sort: 1, status: '1' },
      { id: 2, code: '2', value: '选项2', sort: 2, status: '1' }
    ]
  }
  itemsVisible.value = true
}

const handleAddItem = () => {
  itemDialogTitle.value = '新增字典项'
  itemForm.value = {
    id: '',
    code: '',
    value: '',
    sort: 0,
    status: '1'
  }
  itemDialogVisible.value = true
}

const handleEditItem = (row) => {
  itemDialogTitle.value = '编辑字典项'
  itemForm.value = { ...row }
  itemDialogVisible.value = true
}

const handleDeleteItem = (id) => {
  ElMessageBox.confirm('确定要删除这个字典项吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里可以添加实际的API调用
    dictionaryItems.value = dictionaryItems.value.filter(item => item.id !== id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}

const handleItemSubmit = () => {
  if (!itemForm.value.code || !itemForm.value.value) {
    ElMessage.error('请输入项编码和值')
    return
  }
  
  // 这里可以添加实际的API调用
  if (itemForm.value.id) {
    // 编辑
    const index = dictionaryItems.value.findIndex(item => item.id === itemForm.value.id)
    if (index !== -1) {
      dictionaryItems.value[index] = { ...itemForm.value }
      ElMessage.success('编辑成功')
    }
  } else {
    // 新增
    const newId = Math.max(...dictionaryItems.value.map(item => item.id)) + 1
    const newItem = {
      ...itemForm.value,
      id: newId
    }
    dictionaryItems.value.push(newItem)
    ElMessage.success('新增成功')
  }
  
  itemDialogVisible.value = false
}

const handleSizeChange = (size) => {
  pageSize.value = size
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}
</script>

<style scoped>
.dictionary-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.items-header {
  margin-bottom: 15px;
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