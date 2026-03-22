<template>
  <div class="mobile-profile-edit">
    <van-form @submit="onSubmit">
      <!-- 头像上传 -->
      <div class="avatar-section">
        <div class="avatar-label">头像</div>
        <div class="avatar-upload">
          <img :src="formData.avatar || defaultAvatar" alt="头像" class="avatar-img" />
          <div class="avatar-upload-btn" @click="showImagePicker = true">
            <van-icon name="camera" />
          </div>
        </div>
      </div>
      
      <!-- 表单字段 -->
      <van-cell-group class="form-group">
        <van-field 
          v-model="formData.name" 
          label="姓名" 
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field 
          v-model="formData.phone" 
          label="手机号" 
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]"
        />
        <van-field 
          v-model="formData.email" 
          label="邮箱" 
          placeholder="请输入邮箱"
          :rules="[{ pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '请输入正确的邮箱地址' }]"
        />
        <van-field 
          v-model="formData.department" 
          label="部门" 
          placeholder="请输入部门"
        />
        <van-field 
          v-model="formData.position" 
          label="职位" 
          placeholder="请输入职位"
        />
      </van-cell-group>
      
      <!-- 提交按钮 -->
      <div class="submit-container">
        <van-button type="primary" block native-type="submit">保存修改</van-button>
      </div>
    </van-form>
    
    <!-- 图片选择器 -->
    <van-action-sheet v-model:show="showImagePicker" title="选择图片">
      <van-action-sheet-item @click="selectImage('camera')">拍照</van-action-sheet-item>
      <van-action-sheet-item @click="selectImage('album')">从相册选择</van-action-sheet-item>
      <van-action-sheet-item type="danger" @click="showImagePicker = false">取消</van-action-sheet-item>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { showToast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

const showImagePicker = ref(false)
const defaultAvatar = 'https://img.yzcdn.cn/vant/user.png'

// 表单数据
const formData = reactive({
  name: userStore.userInfo?.name || '',
  phone: userStore.userInfo?.phone || '',
  email: userStore.userInfo?.email || '',
  department: userStore.userInfo?.department || '',
  position: userStore.userInfo?.position || '',
  avatar: userStore.userInfo?.avatar || ''
})

// 选择图片
const selectImage = (type) => {
  showImagePicker.value = false
  // 模拟选择图片
  setTimeout(() => {
    // 模拟头像URL
    formData.avatar = 'https://randomuser.me/api/portraits/men/32.jpg'
    showToast('头像上传成功')
  }, 500)
}

// 提交表单
const onSubmit = async () => {
  try {
    // 模拟更新个人信息
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 更新用户信息
    userStore.updateUserInfo(formData)
    
    showToast('保存成功')
    router.back()
  } catch (error) {
    console.error('更新个人信息失败:', error)
    showToast('保存失败，请重试')
  }
}
</script>

<style scoped>
.mobile-profile-edit {
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

.avatar-section {
  padding: var(--spacing-md);
  background: var(--card-background);
  margin-bottom: var(--spacing-sm);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.avatar-label {
  font-size: var(--font-size-sm);
  color: var(--text-color-regular);
  margin-bottom: var(--spacing-sm);
}

.avatar-upload {
  position: relative;
  display: inline-block;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid white;
}

.form-group {
  margin-bottom: var(--spacing-md);
  background-color: var(--card-background);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.submit-container {
  padding: var(--spacing-sm) 0;
}

:deep(.van-field) {
  margin-bottom: 0;
  border-bottom: 1px solid var(--border-color-light);
}

:deep(.van-field:last-child) {
  border-bottom: none;
}

:deep(.van-field__label) {
  color: var(--text-color-regular);
  font-size: var(--font-size-sm);
}

:deep(.van-field__input) {
  color: var(--text-color-primary);
  font-size: var(--font-size-base);
}

:deep(.van-field__placeholder) {
  color: var(--text-color-placeholder);
}

:deep(.van-button--primary) {
  background-color: var(--primary-color);
  border-radius: var(--border-radius-md);
  height: 44px;
  font-weight: var(--font-weight-medium);
}
</style>