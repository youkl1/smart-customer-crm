<template>
  <div class="customer-sea">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>客户公海池</span>
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
        <el-button type="primary" @click="handleSearch" style="margin-left: 12px">搜索</el-button>
      </div>
      <el-table :data="customers" style="width: 100%">
        <el-table-column prop="name" label="客户名称" width="180" />
        <el-table-column prop="phone" label="联系电话" width="150" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleReceiveCustomer(scope.row.id)">
              领取
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
import { ElMessage } from 'element-plus'

// 搜索关键词
const keyword = ref('')

// 客户列表数据
const customers = ref([
  {
    id: '1',
    name: '百度在线',
    phone: '13700137000',
    email: 'contact@baidu.com',
    createTime: '2026-03-03 09:00:00'
  },
  {
    id: '2',
    name: '京东集团',
    phone: '13600136000',
    email: 'contact@jd.com',
    createTime: '2026-03-04 10:00:00'
  },
  {
    id: '3',
    name: '美团点评',
    phone: '13500135000',
    email: 'contact@meituan.com',
    createTime: '2026-03-05 11:00:00'
  }
])

// 分页参数
const page = ref(1)
const pageSize = ref(10)
const total = ref(3)

// 处理搜索
const handleSearch = () => {
  // 这里可以根据关键词筛选客户
  ElMessage.info('搜索功能开发中')
}

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size
  page.value = 1
}

// 处理页码变化
const handleCurrentChange = (current) => {
  page.value = current
}

// 处理领取客户
const handleReceiveCustomer = (id) => {
  ElMessage.confirm('确定要领取这个客户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('领取成功')
  }).catch(() => {
    // 取消领取
  })
}

// 组件挂载时加载数据
onMounted(() => {
  // 这里可以加载公海池客户数据
  // 由于是模拟环境，我们直接使用默认值
})
</script>

<style scoped>
.customer-sea {
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