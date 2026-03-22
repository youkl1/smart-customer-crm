<template>
  <div class="contract-list">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>合同管理</h2>
      <el-button type="primary" @click="addContract">新建合同</el-button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-filter">
      <el-input
        v-model="searchKey"
        placeholder="搜索合同名称或客户"
        prefix-icon="el-icon-search"
        style="width: 300px; margin-right: 10px"
      />
      <el-select
        v-model="statusFilter"
        placeholder="按状态筛选"
        style="width: 150px; margin-right: 10px"
      >
        <el-option
          v-for="(label, value) in statusMap"
          :key="value"
          :label="label"
          :value="value"
        />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="default" @click="resetSearch">重置</el-button>
    </div>
    
    <!-- 批量操作 -->
    <div class="batch-operations">
      <el-button type="default" @click="batchDelete" :disabled="selectedContracts.length === 0">
        批量删除
      </el-button>
      <el-button type="default" @click="exportContracts">导出</el-button>
    </div>
    
    <!-- 合同表格 -->
    <el-table
      v-loading="loading"
      :data="contractList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="id"
        label="ID"
        width="80"
      />
      <el-table-column
        prop="name"
        label="合同名称"
        min-width="150"
      />
      <el-table-column
        prop="customer"
        label="客户"
        min-width="150"
      />
      <el-table-column
        prop="amount"
        label="合同金额"
        min-width="120"
      >
        <template #default="scope">
          ¥{{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="120"
      >
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ statusMap[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="开始日期"
        min-width="150"
      />
      <el-table-column
        prop="endDate"
        label="结束日期"
        min-width="150"
      />
      <el-table-column
        prop="createdAt"
        label="创建时间"
        min-width="150"
      />
      <el-table-column
        label="操作"
        width="250"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="viewContract(scope.row.id)"
          >
            查看
          </el-button>
          <el-button
            size="small"
            @click="editContract(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteContract(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

// 状态类型映射
const getStatusType = (status) => {
  const typeMap = {
    'draft': 'info',
    'pending': 'warning',
    'approved': 'primary',
    'active': 'success',
    'expired': 'info',
    'canceled': 'danger'
  }
  return typeMap[status] || 'info'
}

// 搜索关键词
const searchKey = ref('')
const statusFilter = ref('')

// 加载状态
const loading = ref(false)

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的合同
const selectedContracts = ref([])

// 合同列表
const contractList = ref([
  {
    id: 1,
    name: '企业管理系统合同',
    customer: 'ABC科技有限公司',
    amount: 100000,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    createdAt: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    name: '数据分析平台合同',
    customer: 'XYZ科技有限公司',
    amount: 50000,
    status: 'pending',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    createdAt: '2024-01-02 14:00:00'
  },
  {
    id: 3,
    name: 'CRM系统合同',
    customer: 'DEF科技有限公司',
    amount: 80000,
    status: 'approved',
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    createdAt: '2024-01-03 09:00:00'
  }
])

// 搜索合同
const handleSearch = () => {
  console.log('搜索合同:', searchKey.value, statusFilter.value)
  // 这里可以实现搜索逻辑
}

// 重置搜索
const resetSearch = () => {
  searchKey.value = ''
  statusFilter.value = ''
  // 这里可以实现重置逻辑
}

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedContracts.value = selection
}

// 批量删除
const batchDelete = () => {
  console.log('批量删除合同:', selectedContracts.value)
  // 模拟批量删除操作
  alert('合同删除成功')
  selectedContracts.value = []
}

// 导出合同
const exportContracts = () => {
  console.log('导出合同')
  // 模拟导出操作
  alert('合同导出成功')
}

// 查看合同
const viewContract = (id) => {
  router.push(`/web/contract/detail/${id}`)
}

// 编辑合同
const editContract = (id) => {
  router.push(`/web/contract/edit/${id}`)
}

// 删除合同
const deleteContract = (id) => {
  console.log('删除合同:', id)
  // 模拟删除操作
  alert('合同删除成功')
}

// 新增合同
const addContract = () => {
  router.push('/web/contract/add')
}

// 处理页码变化
const handleSizeChange = (size) => {
  pageSize.value = size
  // 这里可以实现分页逻辑
}

// 处理当前页码变化
const handleCurrentChange = (current) => {
  currentPage.value = current
  // 这里可以实现分页逻辑
}
</script>

<style scoped>
.contract-list {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.batch-operations {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.batch-operations button {
  margin-right: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>