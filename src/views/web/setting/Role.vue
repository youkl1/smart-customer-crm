<template>
  <div class="role-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>角色权限管理</span>
          <el-button type="primary" size="small" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增角色
          </el-button>
        </div>
      </template>
      <el-table :data="roles" style="width: 100%">
        <el-table-column prop="id" label="角色ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="primary" @click="handlePermission(scope.row)">权限设置</el-button>
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

    <!-- 新增/编辑角色对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="角色名称" required>
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.description" type="textarea" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 权限设置对话框 -->
    <el-dialog v-model="permissionVisible" title="权限设置" width="800px">
      <el-tree
        :data="permissionTree"
        show-checkbox
        node-key="id"
        default-expand-all
        :checked-keys="checkedPermissions"
        @check-change="handleCheckChange"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'

// 表格数据
const roles = ref([
  { id: 1, name: '超级管理员', description: '拥有所有权限', createTime: '2024-01-01 00:00:00' },
  { id: 2, name: '销售经理', description: '销售相关权限', createTime: '2024-01-01 00:00:00' },
  { id: 3, name: '销售顾问', description: '基础销售权限', createTime: '2024-01-01 00:00:00' },
  { id: 4, name: '财务人员', description: '财务相关权限', createTime: '2024-01-01 00:00:00' }
])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(4)

// 对话框数据
const dialogVisible = ref(false)
const dialogTitle = ref('新增角色')
const form = ref({
  id: '',
  name: '',
  description: ''
})

// 权限设置
const permissionVisible = ref(false)
const currentRole = ref(null)
const checkedPermissions = ref([])
const permissionTree = ref([
  {
    id: 'dashboard',
    label: '工作台',
    children: [
      { id: 'dashboard:view', label: '查看' }
    ]
  },
  {
    id: 'customer',
    label: '客户管理',
    children: [
      { id: 'customer:view', label: '查看' },
      { id: 'customer:add', label: '新增' },
      { id: 'customer:edit', label: '编辑' },
      { id: 'customer:delete', label: '删除' }
    ]
  },
  {
    id: 'business',
    label: '商机管理',
    children: [
      { id: 'business:view', label: '查看' },
      { id: 'business:add', label: '新增' },
      { id: 'business:edit', label: '编辑' },
      { id: 'business:delete', label: '删除' }
    ]
  },
  {
    id: 'contract',
    label: '合同管理',
    children: [
      { id: 'contract:view', label: '查看' },
      { id: 'contract:add', label: '新增' },
      { id: 'contract:edit', label: '编辑' },
      { id: 'contract:delete', label: '删除' }
    ]
  },
  {
    id: 'product',
    label: '产品管理',
    children: [
      { id: 'product:view', label: '查看' },
      { id: 'product:add', label: '新增' },
      { id: 'product:edit', label: '编辑' },
      { id: 'product:delete', label: '删除' },
      { id: 'product:category', label: '分类管理' }
    ]
  },
  {
    id: 'order',
    label: '订单管理',
    children: [
      { id: 'order:view', label: '查看' },
      { id: 'order:add', label: '新增' },
      { id: 'order:edit', label: '编辑' },
      { id: 'order:delete', label: '删除' }
    ]
  },
  {
    id: 'payment',
    label: '回款管理',
    children: [
      { id: 'payment:view', label: '查看' },
      { id: 'payment:add', label: '新增' },
      { id: 'payment:edit', label: '编辑' },
      { id: 'payment:delete', label: '删除' },
      { id: 'payment:plan', label: '计划管理' }
    ]
  },
  {
    id: 'report',
    label: '报表中心',
    children: [
      { id: 'report:view', label: '查看' }
    ]
  },
  {
    id: 'setting',
    label: '系统设置',
    children: [
      { id: 'setting:organization', label: '组织架构' },
      { id: 'setting:role', label: '角色权限' },
      { id: 'setting:dictionary', label: '字典管理' },
      { id: 'setting:log', label: '系统日志' }
    ]
  },
  {
    id: 'profile',
    label: '个人中心',
    children: [
      { id: 'profile:view', label: '查看' },
      { id: 'profile:edit', label: '编辑' },
      { id: 'profile:password', label: '修改密码' }
    ]
  }
])

// 生命周期
onMounted(() => {
  // 这里可以添加实际的API调用
})

// 方法
const handleAdd = () => {
  dialogTitle.value = '新增角色'
  form.value = {
    id: '',
    name: '',
    description: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑角色'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这个角色吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里可以添加实际的API调用
    roles.value = roles.value.filter(item => item.id !== id)
    total.value = roles.value.length
    ElMessage.success('删除成功')
  }).catch(() => {})
}

const handleSubmit = () => {
  if (!form.value.name) {
    ElMessage.error('请输入角色名称')
    return
  }
  
  // 这里可以添加实际的API调用
  if (form.value.id) {
    // 编辑
    const index = roles.value.findIndex(item => item.id === form.value.id)
    if (index !== -1) {
      roles.value[index] = { ...form.value }
      ElMessage.success('编辑成功')
    }
  } else {
    // 新增
    const newId = Math.max(...roles.value.map(item => item.id)) + 1
    const newRole = {
      ...form.value,
      id: newId,
      createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    roles.value.push(newRole)
    total.value = roles.value.length
    ElMessage.success('新增成功')
  }
  
  dialogVisible.value = false
}

const handlePermission = (row) => {
  currentRole.value = row
  // 模拟权限数据
  checkedPermissions.value = row.id === 1 ? 
    permissionTree.value.flatMap(item => [item.id, ...item.children.map(child => child.id)]) :
    permissionTree.value.slice(0, 5).flatMap(item => [item.id, ...item.children.map(child => child.id)])
  permissionVisible.value = true
}

const handleCheckChange = (data, checked, indeterminate) => {
  // 处理权限选择变化
}

const handlePermissionSubmit = () => {
  // 这里可以添加实际的API调用
  ElMessage.success('权限设置成功')
  permissionVisible.value = false
}

const handleSizeChange = (size) => {
  pageSize.value = size
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}
</script>

<style scoped>
.role-container {
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