<template>
  <div class="profile-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
        </div>
      </template>
      <div class="profile-content">
        <div class="profile-avatar">
          <el-avatar :size="120" :src="userInfo.avatar || defaultAvatar">
            {{ userInfo.name?.charAt(0) || '用' }}
          </el-avatar>
          <h3>{{ userInfo.name }}</h3>
          <p>{{ userInfo.position }}</p>
        </div>
        <el-divider direction="vertical" style="height: 200px" />
        <div class="profile-info">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户ID">{{ userInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ userInfo.phone }}</el-descriptions-item>
            <el-descriptions-item label="所属部门">{{ userInfo.department }}</el-descriptions-item>
            <el-descriptions-item label="角色">{{ userInfo.role }}</el-descriptions-item>
            <el-descriptions-item label="入职时间">{{ userInfo.joinTime }}</el-descriptions-item>
            <el-descriptions-item label="最后登录">{{ userInfo.lastLogin }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div class="profile-actions">
        <el-button type="primary" @click="handleEdit">
          <el-icon><Edit /></el-icon>
          编辑个人信息
        </el-button>
        <el-button type="warning" @click="handleChangePassword">
          <el-icon><Lock /></el-icon>
          修改密码
        </el-button>
      </div>
    </el-card>

    <el-card shadow="hover" style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>最近活动</span>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in recentActivities"
          :key="index"
          :timestamp="activity.time"
          :type="activity.type"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Edit, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 用户信息
const userInfo = ref({
  id: 1,
  name: '管理员',
  username: 'admin',
  email: 'admin@example.com',
  phone: '13800138000',
  position: '系统管理员',
  department: '总经办',
  role: '超级管理员',
  joinTime: '2024-01-01',
  lastLogin: '2024-01-01 10:00:00',
  avatar: ''
})

const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

// 最近活动
const recentActivities = ref([
  { time: '2024-01-01 10:00:00', type: 'primary', content: '登录系统' },
  { time: '2024-01-01 09:30:00', type: 'success', content: '新增客户' },
  { time: '2024-01-01 09:00:00', type: 'info', content: '编辑商机' },
  { time: '2023-12-31 18:00:00', type: 'warning', content: '修改密码' },
  { time: '2023-12-31 15:00:00', type: 'danger', content: '操作失败' }
])

// 生命周期
onMounted(() => {
  // 这里可以添加实际的API调用
})

// 方法
const handleEdit = () => {
  router.push('/web/profile/edit')
}

const handleChangePassword = () => {
  router.push('/web/profile/password')
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-content {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
}

.profile-avatar h3 {
  margin: 15px 0 5px 0;
  font-size: 18px;
  font-weight: 600;
}

.profile-avatar p {
  margin: 0;
  color: #606266;
}

.profile-info {
  flex: 1;
  padding: 0 40px;
}

.profile-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>