<template>
  <div class="contact-list">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>联系人管理</h2>
      <el-button type="primary" @click="addContact">新增联系人</el-button>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="search-filter">
      <el-input
        v-model="searchKey"
        placeholder="搜索联系人姓名或电话"
        prefix-icon="el-icon-search"
        style="width: 300px; margin-right: 10px"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="default" @click="resetSearch">重置</el-button>
    </div>
    
    <!-- 批量操作 -->
    <div class="batch-operations">
      <el-button type="default" @click="batchDelete" :disabled="selectedContacts.length === 0">
        批量删除
      </el-button>
      <el-button type="default" @click="importContacts">导入</el-button>
      <el-button type="default" @click="exportContacts">导出</el-button>
    </div>
    
    <!-- 联系人表格 -->
    <el-table
      v-loading="loading"
      :data="contactList"
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
        label="姓名"
        min-width="120"
      />
      <el-table-column
        prop="company"
        label="公司"
        min-width="150"
      />
      <el-table-column
        prop="phone"
        label="电话"
        min-width="120"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="150"
      />
      <el-table-column
        prop="position"
        label="职位"
        min-width="120"
      />
      <el-table-column
        prop="createdAt"
        label="创建时间"
        min-width="150"
      />
      <el-table-column
        label="操作"
        width="150"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="viewContact(scope.row.id)"
          >
            查看
          </el-button>
          <el-button
            size="small"
            @click="editContact(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteContact(scope.row.id)"
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

// 搜索关键词
const searchKey = ref('')

// 加载状态
const loading = ref(false)

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的联系人
const selectedContacts = ref([])

// 联系人列表
const contactList = ref([
  {
    id: 1,
    name: '张三',
    company: 'ABC科技有限公司',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    position: '总经理',
    createdAt: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    name: '李四',
    company: 'ABC科技有限公司',
    phone: '13900139000',
    email: 'lisi@example.com',
    position: '技术总监',
    createdAt: '2024-01-02 14:00:00'
  },
  {
    id: 3,
    name: '王五',
    company: 'XYZ科技有限公司',
    phone: '13700137000',
    email: 'wangwu@example.com',
    position: '销售经理',
    createdAt: '2024-01-03 09:00:00'
  }
])

// 搜索联系人
const handleSearch = () => {
  console.log('搜索联系人:', searchKey.value)
  // 这里可以实现搜索逻辑
}

// 重置搜索
const resetSearch = () => {
  searchKey.value = ''
  // 这里可以实现重置逻辑
}

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedContacts.value = selection
}

// 批量删除
const batchDelete = () => {
  console.log('批量删除联系人:', selectedContacts.value)
  // 模拟批量删除操作
  alert('联系人删除成功')
  selectedContacts.value = []
}

// 导入联系人
const importContacts = () => {
  console.log('导入联系人')
  // 模拟导入操作
  alert('联系人导入成功')
}

// 导出联系人
const exportContacts = () => {
  console.log('导出联系人')
  // 模拟导出操作
  alert('联系人导出成功')
}

// 查看联系人
const viewContact = (id) => {
  router.push(`/web/contact/detail/${id}`)
}

// 编辑联系人
const editContact = (id) => {
  router.push(`/web/contact/edit/${id}`)
}

// 删除联系人
const deleteContact = (id) => {
  console.log('删除联系人:', id)
  // 模拟删除操作
  alert('联系人删除成功')
}

// 新增联系人
const addContact = () => {
  router.push('/web/contact/add')
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
.contact-list {
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