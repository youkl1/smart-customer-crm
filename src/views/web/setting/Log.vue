<template>
  <div class="log-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>系统日志管理</span>
          <div class="search-box">
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入关键词"
              style="width: 200px"
              clearable
            />
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px; margin-left: 10px"
            />
            <el-select
              v-model="searchForm.type"
              placeholder="日志类型"
              style="width: 120px; margin-left: 10px"
            >
              <el-option label="全部" value="" />
              <el-option label="登录" value="login" />
              <el-option label="操作" value="operation" />
              <el-option label="异常" value="error" />
            </el-select>
            <el-button type="primary" size="small" style="margin-left: 10px" @click="handleSearch">
              查询
            </el-button>
          </div>
        </div>
      </template>
      <el-table :data="logs" style="width: 100%">
        <el-table-column prop="id" label="日志ID" width="80" />
        <el-table-column prop="type" label="日志类型" width="100">
          <template #default="scope">
            <el-tag :type="getTypeTagType(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="操作用户" />
        <el-table-column prop="ip" label="IP地址" width="150" />
        <el-table-column prop="action" label="操作内容" />
        <el-table-column prop="createTime" label="操作时间" width="180" />
        <el-table-column label="详情" width="80">
          <template #default="scope">
            <el-button size="small" @click="handleDetail(scope.row)">查看</el-button>
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

    <!-- 日志详情对话框 -->
    <el-dialog v-model="detailVisible" title="日志详情" width="600px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="日志ID">{{ currentLog?.id }}</el-descriptions-item>
        <el-descriptions-item label="日志类型">{{ getTypeText(currentLog?.type) }}</el-descriptions-item>
        <el-descriptions-item label="操作用户">{{ currentLog?.userName }}</el-descriptions-item>
        <el-descriptions-item label="IP地址">{{ currentLog?.ip }}</el-descriptions-item>
        <el-descriptions-item label="操作内容">{{ currentLog?.action }}</el-descriptions-item>
        <el-descriptions-item label="操作时间">{{ currentLog?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="详细信息" v-if="currentLog?.detail">
          <pre style="margin: 0; white-space: pre-wrap;">{{ currentLog?.detail }}</pre>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 表格数据
const logs = ref([
  { id: 1, type: 'login', userName: 'admin', ip: '127.0.0.1', action: '用户登录', createTime: '2024-01-01 10:00:00', detail: '用户admin登录系统' },
  { id: 2, type: 'operation', userName: 'admin', ip: '127.0.0.1', action: '新增客户', createTime: '2024-01-01 10:05:00', detail: '新增客户：张三' },
  { id: 3, type: 'operation', userName: 'admin', ip: '127.0.0.1', action: '编辑商机', createTime: '2024-01-01 10:10:00', detail: '编辑商机：项目A' },
  { id: 4, type: 'error', userName: 'admin', ip: '127.0.0.1', action: '操作失败', createTime: '2024-01-01 10:15:00', detail: '删除客户失败：客户不存在' },
  { id: 5, type: 'login', userName: 'user1', ip: '192.168.1.100', action: '用户登录', createTime: '2024-01-01 10:20:00', detail: '用户user1登录系统' }
])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(5)

// 搜索表单
const searchForm = ref({
  keyword: '',
  dateRange: [],
  type: ''
})

// 详情对话框
const detailVisible = ref(false)
const currentLog = ref(null)

// 生命周期
onMounted(() => {
  // 这里可以添加实际的API调用
})

// 方法
const getTypeTagType = (type) => {
  switch (type) {
    case 'login': return 'info'
    case 'operation': return 'success'
    case 'error': return 'danger'
    default: return 'info'
  }
}

const getTypeText = (type) => {
  switch (type) {
    case 'login': return '登录'
    case 'operation': return '操作'
    case 'error': return '异常'
    default: return '未知'
  }
}

const handleSearch = () => {
  // 这里可以添加实际的API调用
  ElMessage.success('查询成功')
}

const handleDetail = (row) => {
  currentLog.value = row
  detailVisible.value = true
}

const handleSizeChange = (size) => {
  pageSize.value = size
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}
</script>

<style scoped>
.log-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.search-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
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

pre {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>