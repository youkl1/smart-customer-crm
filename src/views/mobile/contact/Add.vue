<template>
  <div class="contact-add">
    <!-- 表单 -->
    <van-form @submit="saveContact">
      <van-field
        v-model="contactForm.name"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="contactForm.company"
        name="company"
        label="公司"
        placeholder="请输入公司名称"
        :rules="[{ required: true, message: '请输入公司名称' }]"
      />
      <van-field
        v-model="contactForm.phone"
        name="phone"
        label="电话"
        placeholder="请输入联系电话"
        :rules="[
          { required: true, message: '请输入联系电话' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
        ]"
      />
      <van-field
        v-model="contactForm.email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[
          { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱地址' }
        ]"
      />
      <van-field
        v-model="contactForm.position"
        name="position"
        label="职位"
        placeholder="请输入职位"
      />
      <van-field
        v-model="contactForm.remark"
        name="remark"
        label="备注"
        placeholder="请输入备注"
        type="textarea"
      />
    </van-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 表单数据
const contactForm = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
  position: '',
  remark: ''
})

// 保存联系人信息
const saveContact = () => {
  // 模拟保存操作
  console.log('保存联系人信息:', contactForm.value)
  
  // 显示保存成功提示
  showToast({
    message: '联系人创建成功',
    type: 'success',
    duration: 2000
  })
  
  // 跳转到联系人列表
  setTimeout(() => {
    router.push('/mobile/contact')
  }, 2000)
}
</script>

<style scoped>
.contact-add {
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

/* 自定义表单样式 */
:deep(.van-form) {
  background-color: var(--card-background);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-sm);
}

:deep(.van-field) {
  margin-bottom: var(--spacing-sm);
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
</style>