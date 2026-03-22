<template>
  <div class="web-receivable-list">
    <div class="page-header">
      <h1>回款管理</h1>
      <el-button type="primary" @click="navigateToAdd">
        <el-icon><Plus /></el-icon>
        新建回款
      </el-button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-filter">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="回款编号">
          <el-input v-model="searchForm.receivableNo" placeholder="请输入回款编号" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="回款状态">
          <el-select v-model="searchForm.status" placeholder="请选择回款状态">
            <el-option label="全部" value="" />
            <el-option label="待审批" value="1" />
            <el-option label="已审批" value="2" />
            <el-option label="已拒绝" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 回款列表 -->
    <el-table :data="receivables" style="width: 100%">
      <el-table-column prop="receivableNo" label="回款编号" width="180" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="amount" label="回款金额" width="120">
        <template #default="scope">
          ¥{{ scope.row.amount.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="receivableDate" label="回款日期" width="180" />
      <el-table-column prop="status" label="回款状态" width="120">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="navigateToEdit(scope.row.id)">编辑</el-button>
          <el-button 
            v-if="scope.row.status === 1" 
            size="small" 
            type="primary" 
            @click="handleApprove(scope.row.id, true)"
          >
            审批通过
          </el-button>
          <el-button 
            v-if="scope.row.status === 1" 
            size="small" 
            type="danger" 
            @click="handleApprove(scope.row.id, false)"
          >
            审批拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.size"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { receivableApi } from '@/api/receivable'

const router = useRouter()

// 搜索表单
const searchForm = ref({
  receivableNo: '',
  customerName: '',
  status: ''
})

// 回款列表
const receivables = ref([])

// 分页
const pagination = ref({
  current: 1,
  size: 10,
  total: 0
})

// 导航到新增页面
const navigateToAdd = () => {
  router.push('/web/payment/add')
}

// 导航到编辑页面
const navigateToEdit = (id) => {
  router.push(`/web/payment/edit/${id}`)
}

// 处理审批
const handleApprove = (id, approved) => {
  const message = approved ? '确定要审批通过吗？' : '确定要审批拒绝吗？'
  ElMessageBox.confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await receivableApi.approve(id, { approved })
      ElMessage.success(approved ? '审批通过成功' : '审批拒绝成功')
      getReceivables()
    } catch (error) {
      ElMessage.error('审批操作失败')
    }
  })
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    1: '待审批',
    2: '已审批',
    3: '已拒绝'
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

// 搜索
const handleSearch = () => {
  pagination.value.current = 1
  getReceivables()
}

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    receivableNo: '',
    customerName: '',
    status: ''
  }
  pagination.value.current = 1
  getReceivables()
}

// 分页大小变化
const handleSizeChange = (size) => {
  pagination.value.size = size
  getReceivables()
}

// 页码变化
const handleCurrentChange = (current) => {
  pagination.value.current = current
  getReceivables()
}

// 获取回款列表
const getReceivables = async () => {
  try {
    const params = {
      page: pagination.value.current,
      pageSize: pagination.value.size,
      ...searchForm.value
    }
    const res = await receivableApi.getList(params)
    receivables.value = res.data.list
    pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取回款列表失败:', error)
  }
}

onMounted(() => {
  getReceivables()
})
</script>

<style scoped>
.web-receivable-list {
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

.search-filter {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>