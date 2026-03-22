<template>
  <div class="customer-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>客户详情</span>
          <el-button type="primary" @click="handleEditCustomer">编辑</el-button>
        </div>
      </template>
      <div class="detail-info">
        <el-descriptions title="基本信息" :column="2">
          <el-descriptions-item label="客户名称">阿里巴巴集团</el-descriptions-item>
          <el-descriptions-item label="联系电话">13800138000</el-descriptions-item>
          <el-descriptions-item label="邮箱">contact@alibaba.com</el-descriptions-item>
          <el-descriptions-item label="客户状态">
            <el-tag type="warning">成交</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="地址" :span="2">杭州市余杭区文一西路969号</el-descriptions-item>
          <el-descriptions-item label="创建时间">2026-03-01 10:00:00</el-descriptions-item>
          <el-descriptions-item label="负责人">张三</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="detail-tabs">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="联系人" name="contacts">
            <el-button type="primary" size="small" @click="handleAddContact" style="margin-bottom: 16px">
              新增联系人
            </el-button>
            <el-table :data="contacts" style="width: 100%">
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="phone" label="电话" width="150" />
              <el-table-column prop="email" label="邮箱" width="200" />
              <el-table-column prop="position" label="职位" width="120" />
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button size="small" @click="handleEditContact(scope.row.id)">
                    编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="handleDeleteContact(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="跟进记录" name="follow">
            <el-button type="primary" size="small" @click="handleAddFollow" style="margin-bottom: 16px">
              新增跟进记录
            </el-button>
            <el-timeline>
              <el-timeline-item timestamp="2026-03-20 14:00:00">
                <div>
                  <h4>电话沟通</h4>
                  <p>与客户沟通了阿里云服务器采购的具体需求，客户对我们的方案表示满意，约定下周进行现场演示。</p>
                </div>
              </el-timeline-item>
              <el-timeline-item timestamp="2026-03-15 10:00:00">
                <div>
                  <h4>邮件跟进</h4>
                  <p>发送了详细的产品方案和报价，等待客户反馈。</p>
                </div>
              </el-timeline-item>
              <el-timeline-item timestamp="2026-03-01 10:00:00">
                <div>
                  <h4>首次接触</h4>
                  <p>通过展会认识客户，初步了解了客户的需求。</p>
                </div>
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
          <el-tab-pane label="商机" name="business">
            <el-button type="primary" size="small" @click="handleAddBusiness" style="margin-bottom: 16px">
              新增商机
            </el-button>
            <el-table :data="businessList" style="width: 100%">
              <el-table-column prop="name" label="商机名称" width="200" />
              <el-table-column prop="stage" label="阶段" width="120">
                <template #default="scope">
                  <el-tag :type="getStageType(scope.row.stage)">
                    {{ scope.row.stage }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="预估金额" width="120" />
              <el-table-column prop="expectedDate" label="预计成交日" width="150" />
              <el-table-column label="操作" width="100">
                <template #default="scope">
                  <el-button size="small" @click="handleViewBusiness(scope.row.id)">
                    查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 获取客户ID
const customerId = route.params.id

// 当前激活的标签
const activeTab = ref('contacts')

// 联系人列表
const contacts = ref([
  {
    id: '1',
    name: '李四',
    phone: '13900139000',
    email: 'lisi@alibaba.com',
    position: '技术总监'
  },
  {
    id: '2',
    name: '王五',
    phone: '13700137000',
    email: 'wangwu@alibaba.com',
    position: '采购经理'
  }
])

// 商机列表
const businessList = ref([
  {
    id: '1',
    name: '阿里云服务器采购',
    stage: '商务谈判',
    amount: 1000000,
    expectedDate: '2026-04-01'
  }
])

// 获取阶段对应的标签类型
const getStageType = (stage) => {
  switch (stage) {
    case '初步接触':
      return 'info'
    case '需求分析':
      return 'primary'
    case '方案报价':
      return 'success'
    case '商务谈判':
      return 'warning'
    case '成交':
      return 'danger'
    case '失败':
      return 'info'
    default:
      return ''
  }
}

// 处理编辑客户
const handleEditCustomer = () => {
  router.push(`/web/customer/edit/${customerId}`)
}

// 处理新增联系人
const handleAddContact = () => {
  ElMessage.info('新增联系人功能开发中')
}

// 处理编辑联系人
const handleEditContact = (id) => {
  ElMessage.info('编辑联系人功能开发中')
}

// 处理删除联系人
const handleDeleteContact = (id) => {
  ElMessage.confirm('确定要删除这个联系人吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}

// 处理新增跟进记录
const handleAddFollow = () => {
  ElMessage.info('新增跟进记录功能开发中')
}

// 处理新增商机
const handleAddBusiness = () => {
  router.push('/web/business/add')
}

// 处理查看商机
const handleViewBusiness = (id) => {
  router.push(`/web/business/detail/${id}`)
}
</script>

<style scoped>
.customer-detail {
  padding: 20px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-info {
  margin-bottom: 20px;
}

.detail-tabs {
  margin-top: 20px;
}
</style>