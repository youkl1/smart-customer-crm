<template>
  <div class="customer-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>客户管理</span>
          <el-button type="primary" @click="handleAddCustomer">新增客户</el-button>
        </div>
      </template>
      <div class="search-bar">
        <el-input
          v-model="keyword"
          placeholder="搜索客户姓名/电话"
          style="width: 300px"
          prefix-icon="i-ep-search"
          @keyup.enter="handleSearch"
        />
        <el-select
          v-model="status"
          placeholder="客户状态"
          style="width: 120px; margin-left: 12px"
          @change="handleSearch"
        >
          <el-option label="全部" value="" />
          <el-option label="潜在客户" value="潜在客户" />
          <el-option label="意向客户" value="意向客户" />
          <el-option label="成交" value="成交" />
          <el-option label="流失客户" value="流失客户" />
        </el-select>
        <el-button type="primary" @click="handleSearch" style="margin-left: 12px">搜索</el-button>
      </div>
      <el-table :data="customers" style="width: 100%">
        <el-table-column prop="name" label="客户名称" width="180" />
        <el-table-column prop="phone" label="联系电话" width="150" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleCustomerDetail(scope.row.id)">
              查看
            </el-button>
            <el-button size="small" @click="handleCustomerEdit(scope.row.id)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleCustomerDelete(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../../utils/request'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 搜索关键词
const keyword = ref('')

// 状态筛选
const status = ref('')

// 客户列表数据
const customers = ref([])

// 分页参数
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 获取状态对应的标签类型
const getStatusType = (status) => {
  switch (status) {
    case '潜在客户':
      return 'info'
    case '意向客户':
      return 'success'
    case '成交':
      return 'warning'
    case '流失客户':
      return 'danger'
    default:
      return ''
  }
}

// 加载客户列表
const loadCustomers = async () => {
  try {
    const response = await get('/api/customers', {
      page: page.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      status: status.value
    })
    
    if (response.code === 200) {
      customers.value = response.data.list
      total.value = response.data.total
    }
  } catch (error) {
    ElMessage.error('加载失败，请重试')
  }
}

// 处理搜索
const handleSearch = () => {
  page.value = 1
  loadCustomers()
}

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size
  page.value = 1
  loadCustomers()
}

// 处理页码变化
const handleCurrentChange = (current) => {
  page.value = current
  loadCustomers()
}

// 处理客户详情
const handleCustomerDetail = (id) => {
  router.push(`/web/customer/detail/${id}`)
}

// 处理客户编辑
const handleCustomerEdit = (id) => {
  router.push(`/web/customer/edit/${id}`)
}

// 处理客户删除
const handleCustomerDelete = (id) => {
  ElMessage.confirm('确定要删除这个客户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
    loadCustomers()
  }).catch(() => {
    // 取消删除
  })
}

// 处理新增客户
const handleAddCustomer = () => {
  router.push('/web/customer/add')
}

// 组件挂载时加载数据
onMounted(() => {
  loadCustomers()
})
</script>

<style scoped>
.customer-list {
  padding: 20px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>