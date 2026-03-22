<template>
  <div class="mobile-profile-password">
    <van-form @submit="onSubmit">
      <van-cell-group class="form-group">
        <van-field 
          v-model="formData.oldPassword" 
          label="旧密码" 
          placeholder="请输入旧密码"
          type="password"
          :rules="[{ required: true, message: '请输入旧密码' }]"
        />
        <van-field 
          v-model="formData.newPassword" 
          label="新密码" 
          placeholder="请输入新密码" 
          type="password"
          :rules="[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码长度至少6位' }
          ]"
        />
        <van-field 
          v-model="formData.confirmPassword" 
          label="确认密码" 
          placeholder="请确认新密码" 
          type="password"
          :rules="[
            { required: true, message: '请确认新密码' },
            {
              validator: (value) => value === formData.newPassword,
              message: '两次输入的密码不一致'
            }
          ]"
        />
      </van-cell-group>
      
      <!-- 提交按钮 -->
      <div class="submit-container">
        <van-button type="primary" block native-type="submit">修改密码</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 表单数据
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 提交表单
const onSubmit = async () => {
  try {
    // 模拟修改密码
    await new Promise(resolve => setTimeout(resolve, 800))
    
    showToast('密码修改成功，请重新登录')
    
    // 跳转到登录页
    setTimeout(() => {
      router.push('/entry')
    }, 1500)
  } catch (error) {
    console.error('修改密码失败:', error)
    showToast('修改密码失败，请重试')
  }
}
</script>

<style scoped>
.mobile-profile-password {
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
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