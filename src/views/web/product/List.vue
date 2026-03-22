<template>
  <div class="web-product-list">
    <div class="page-header">
      <h1>产品管理</h1>
      <el-button type="primary" @click="navigateToAdd">
        <el-icon><Plus /></el-icon>
        新增产品
      </el-button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-filter">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.name" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品分类">
          <el-select v-model="searchForm.categoryId" placeholder="请选择分类">
            <el-option 
              v-for="category in categories" 
              :key="category.id" 
              :label="category.name" 
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 产品列表 -->
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="id" label="产品ID" width="80" />
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="categoryName" label="产品分类" />
      <el-table-column prop="price" label="价格" width="100">
        <template #default="scope">
          ¥{{ scope.row.price.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="100">
        <template #default="scope">
          <span :class="{ 'stock-warning': scope.row.stock <= 10 }">
            {{ scope.row.stock }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="navigateToEdit(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteProduct(scope.row.id)">删除</el-button>
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
import { ElMessage } from 'element-plus'
import { productApi } from '@/api/product'

const router = useRouter()

// 搜索表单
const searchForm = ref({
  name: '',
  categoryId: ''
})

// 分类列表
const categories = ref([])

// 产品列表
const products = ref([])

// 分页
const pagination = ref({
  current: 1,
  size: 10,
  total: 0
})

// 导航到新增页面
const navigateToAdd = () => {
  router.push('/web/product/add')
}

// 导航到编辑页面
const navigateToEdit = (id) => {
  router.push(`/web/product/edit/${id}`)
}

// 删除产品
const deleteProduct = (id) => {
  ElMessage.confirm('确定要删除该产品吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await productApi.delete(id)
      ElMessage.success('删除成功')
      getProducts()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  })
}

// 搜索
const handleSearch = () => {
  pagination.value.current = 1
  getProducts()
}

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    name: '',
    categoryId: ''
  }
  pagination.value.current = 1
  getProducts()
}

// 分页大小变化
const handleSizeChange = (size) => {
  pagination.value.size = size
  getProducts()
}

// 页码变化
const handleCurrentChange = (current) => {
  pagination.value.current = current
  getProducts()
}

// 获取产品列表
const getProducts = async () => {
  try {
    const params = {
      page: pagination.value.current,
      pageSize: pagination.value.size,
      ...searchForm.value
    }
    const res = await productApi.getList(params)
    products.value = res.data.list
    pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取产品列表失败:', error)
  }
}

// 获取分类列表
const getCategories = async () => {
  try {
    const res = await productApi.getCategories()
    categories.value = res.data
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

onMounted(() => {
  getProducts()
  getCategories()
})
</script>

<style scoped>
.web-product-list {
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

.stock-warning {
  color: #f56c6c;
  font-weight: bold;
}
</style>