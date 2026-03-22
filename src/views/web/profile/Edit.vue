<template>
  <div class="profile-edit-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>编辑个人信息</span>
        </div>
      </template>
      <el-form :model="form" label-width="100px" style="max-width: 600px;">
        <el-form-item label="姓名" required>
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="form.department" placeholder="请选择所属部门">
            <el-option label="总经办" value="总经办" />
            <el-option label="销售部" value="销售部" />
            <el-option label="市场部" value="市场部" />
            <el-option label="技术部" value="技术部" />
            <el-option label="财务部" value="财务部" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存修改</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const form = ref({
  name: '管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  position: '系统管理员',
  department: '总经办',
  avatar: ''
})

// 生命周期
onMounted(() => {
  // 这里可以添加实际的API调用，获取用户信息
})

// 方法
const handleAvatarChange = (file) => {
  // 模拟上传，实际项目中应该调用上传接口
  form.value.avatar = URL.createObjectURL(file.raw)
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('只能上传JPG/PNG图片！')
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过2MB！')
  }
  return isJPG && isLt2M
}

const handleSubmit = () => {
  if (!form.value.name) {
    ElMessage.error('请输入姓名')
    return
  }
  
  // 这里可以添加实际的API调用
  ElMessage.success('个人信息更新成功')
  router.push('/web/profile')
}

const handleCancel = () => {
  router.push('/web/profile')
}
</script>

<style scoped>
.profile-edit-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>