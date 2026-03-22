<template>
  <div class="web-order-list">
    <div class="page-header">
      <h1>订单管理</h1>
      <el-button type="primary" @click="navigateToAdd">
        <el-icon><Plus /></el-icon>
        新建订单
      </el-button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-filter">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" placeholder="请选择订单状态">
            <el-option label="全部" value="" />
            <el-option label="待处理" value="1" />
            <el-option label="已发货" value="2" />
            <el-option label="已完成" value="3" />
            <el-option label="已取消" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 订单列表 -->
    <el-table :data="orders" style="width: 100%">
      <el-table-column prop="orderNo" label="订单编号" width="180" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="totalAmount" label="订单金额" width="120">
        <template #default="scope">
          ¥{{ scope.row.totalAmount.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180" />
      <el-table-column prop="status" label="订单状态" width="120">
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
            @click="handleShip(scope.row.id)"
          >
            发货
          </el-button>
          <el-button 
            v-if="scope.row.status === 1" 
            size="small" 
            type="danger" 
            @click="handleCancel(scope.row.id)"
          >
            取消
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
import { orderApi } from '@/api/order'

const router = useRouter()

// 搜索表单
const searchForm = ref({
  orderNo: '',
  customerName: '',
  status: ''
})

// 订单列表
const orders = ref([])

// 分页
const pagination = ref({
  current: 1,
  size: 10,
  total: 0
})

// 导航到新增页面
const navigateToAdd = () => {
  router.push('/web/order/add')
}

// 导航到编辑页面
const navigateToEdit = (id) => {
  router.push(`/web/order/edit/${id}`)
}

// 处理发货
const handleShip = (id) => {
  ElMessageBox.confirm('确定要发货吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await orderApi.ship(id)
      ElMessage.success('发货成功')
      getOrders()
    } catch (error) {
      ElMessage.error('发货失败')
    }
  })
}

// 处理取消订单
const handleCancel = (id) => {
  ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await orderApi.cancel(id)
      ElMessage.success('订单取消成功')
      getOrders()
    } catch (error) {
      ElMessage.error('订单取消失败')
    }
  })
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    1: '待处理',
    2: '已发货',
    3: '已完成',
    4: '已取消'
  }
  return statusMap[status] || '未知'
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    1: 'info',
    2: 'warning',
    3: 'success',
    4: 'danger'
  }
  return typeMap[status] || 'info'
}

// 搜索
const handleSearch = () => {
  pagination.value.current = 1
  getOrders()
}

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    orderNo: '',
    customerName: '',
    status: ''
  }
  pagination.value.current = 1
  getOrders()
}

// 分页大小变化
const handleSizeChange = (size) => {
  pagination.value.size = size
  getOrders()
}

// 页码变化
const handleCurrentChange = (current) => {
  pagination.value.current = current
  getOrders()
}

// 获取订单列表
const getOrders = async () => {
  try {
    const params = {
      page: pagination.value.current,
      pageSize: pagination.value.size,
      ...searchForm.value
    }
    const res = await orderApi.getList(params)
    orders.value = res.data.list
    pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取订单列表失败:', error)
  }
}

onMounted(() => {
  getOrders()
})
</script>

<style scoped>
.web-order-list {
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