<template>
  <div class="business-list">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>商机管理</h2>
      <el-button type="primary" @click="addBusiness">新增商机</el-button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-filter">
      <el-input
        v-model="searchKey"
        placeholder="搜索商机名称或客户"
        prefix-icon="el-icon-search"
        style="width: 300px; margin-right: 10px"
      />
      <el-select
        v-model="stageFilter"
        placeholder="按阶段筛选"
        style="width: 150px; margin-right: 10px"
      >
        <el-option
          v-for="(label, value) in stageMap"
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
      <el-button type="default" @click="batchDelete" :disabled="selectedBusinesses.length === 0">
        批量删除
      </el-button>
      <el-button type="default" @click="exportBusinesses">导出</el-button>
    </div>
    
    <!-- 商机表格 -->
    <el-table
      v-loading="loading"
      :data="businessList"
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
        label="商机名称"
        min-width="150"
      />
      <el-table-column
        prop="customer"
        label="客户"
        min-width="150"
      />
      <el-table-column
        prop="amount"
        label="预估金额"
        min-width="120"
      >
        <template #default="scope">
          ¥{{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column
        prop="stage"
        label="阶段"
        min-width="120"
      >
        <template #default="scope">
          <el-tag :type="getStageType(scope.row.stage)">
            {{ stageMap[scope.row.stage] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="expectedDate"
        label="预计成交日"
        min-width="150"
      />
      <el-table-column
        prop="owner"
        label="负责人"
        min-width="100"
      />
      <el-table-column
        prop="createdAt"
        label="创建时间"
        min-width="150"
      />
      <el-table-column
        label="操作"
        width="200"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="viewBusiness(scope.row.id)"
          >
            查看
          </el-button>
          <el-button
            size="small"
            @click="editBusiness(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteBusiness(scope.row.id)"
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

// 商机阶段映射
const stageMap = {
  'initial': '初步接触',
  'analysis': '需求分析',
  'quotation': '方案报价',
  'negotiation': '商务谈判',
  'closed': '成交',
  'lost': '失败'
}

// 阶段类型映射
const getStageType = (stage) => {
  const typeMap = {
    'initial': 'info',
    'analysis': 'primary',
    'quotation': 'warning',
    'negotiation': 'danger',
    'closed': 'success',
    'lost': 'info'
  }
  return typeMap[stage] || 'info'
}

// 搜索关键词
const searchKey = ref('')
const stageFilter = ref('')

// 加载状态
const loading = ref(false)

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的商机
const selectedBusinesses = ref([])

// 商机列表
const businessList = ref([
  {
    id: 1,
    name: '企业管理系统',
    customer: 'ABC科技有限公司',
    amount: 100000,
    stage: 'quotation',
    expectedDate: '2024-02-01',
    owner: '李四',
    createdAt: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    name: '数据分析平台',
    customer: 'XYZ科技有限公司',
    amount: 50000,
    stage: 'analysis',
    expectedDate: '2024-02-15',
    owner: '张三',
    createdAt: '2024-01-02 14:00:00'
  },
  {
    id: 3,
    name: 'CRM系统',
    customer: 'DEF科技有限公司',
    amount: 80000,
    stage: 'negotiation',
    expectedDate: '2024-01-30',
    owner: '王五',
    createdAt: '2024-01-03 09:00:00'
  }
])

// 搜索商机
const handleSearch = () => {
  console.log('搜索商机:', searchKey.value, stageFilter.value)
  // 这里可以实现搜索逻辑
}

// 重置搜索
const resetSearch = () => {
  searchKey.value = ''
  stageFilter.value = ''
  // 这里可以实现重置逻辑
}

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedBusinesses.value = selection
}

// 批量删除
const batchDelete = () => {
  console.log('批量删除商机:', selectedBusinesses.value)
  // 模拟批量删除操作
  alert('商机删除成功')
  selectedBusinesses.value = []
}

// 导出商机
const exportBusinesses = () => {
  console.log('导出商机')
  // 模拟导出操作
  alert('商机导出成功')
}

// 查看商机
const viewBusiness = (id) => {
  router.push(`/web/business/detail/${id}`)
}

// 编辑商机
const editBusiness = (id) => {
  router.push(`/web/business/edit/${id}`)
}

// 删除商机
const deleteBusiness = (id) => {
  console.log('删除商机:', id)
  // 模拟删除操作
  alert('商机删除成功')
}

// 新增商机
const addBusiness = () => {
  router.push('/web/business/add')
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
.business-list {
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