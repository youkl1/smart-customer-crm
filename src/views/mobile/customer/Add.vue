<template>
  <div class="customer-add">
    <!-- 表单 -->
    <van-form @submit="saveCustomer">
      <van-field
        v-model="customerForm.name"
        name="name"
        label="联系人姓名"
        placeholder="请输入联系人姓名"
        :rules="[{ required: true, message: '请输入联系人姓名' }]"
      />
      <van-field
        v-model="customerForm.company"
        name="company"
        label="公司名称"
        placeholder="请输入公司名称"
        :rules="[{ required: true, message: '请输入公司名称' }]"
      />
      <van-field
        v-model="customerForm.phone"
        name="phone"
        label="联系电话"
        placeholder="请输入联系电话"
        :rules="[
          { required: true, message: '请输入联系电话' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
        ]"
      />
      <van-field
        v-model="customerForm.email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[
          { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱地址' }
        ]"
      />
      <van-field
        v-model="customerForm.address"
        name="address"
        label="地址"
        placeholder="请输入地址"
        type="textarea"
      />
      <van-field
        name="status"
        label="客户状态"
        :value="statusMap[customerForm.status]"
        @click="showStatusPicker = true"
      />
      <van-popup
        v-model:show="showStatusPicker"
        position="bottom"
      >
        <van-picker
          :columns="statusOptions"
          @confirm="(value, index) => {
            customerForm.status = Object.keys(statusMap)[index];
            showStatusPicker = false;
          }"
          @cancel="showStatusPicker = false"
        />
      </van-popup>
      
      <!-- 拍照上传名片 -->
      <div class="upload-section">
        <div class="upload-title">上传名片</div>
        <van-uploader
          :after-read="afterRead"
          :max-count="1"
          accept="image/*"
          capture="camera"
        />
        <div class="upload-tip">支持拍照上传，自动识别信息</div>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const setSaveCallback = inject('setSaveCallback')

// 客户状态映射
const statusMap = {
  'active': '活跃',
  'inactive': '不活跃',
  'potential': '潜在'
}

// 状态选择选项
const statusOptions = Object.values(statusMap)

// 表单数据
const customerForm = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
  address: '',
  status: 'potential'
})

// 状态选择器显示状态
const showStatusPicker = ref(false)

// 保存客户信息
const saveCustomer = () => {
  // 模拟保存操作
  console.log('保存客户信息:', customerForm.value)
  
  // 显示保存成功提示
  showToast({
    message: '客户创建成功',
    type: 'success',
    duration: 2000
  })
  
  // 跳转到客户列表
  setTimeout(() => {
    router.push('/mobile/home')
  }, 2000)
}

// 上传名片后的处理
const afterRead = (file) => {
  // 模拟名片识别
  console.log('上传名片:', file)
  
  // 模拟识别结果，自动填充表单
  showToast({
    message: '名片识别成功，已自动填充信息',
    type: 'success',
    duration: 2000
  })
  
  // 模拟填充数据
  customerForm.value = {
    ...customerForm.value,
    name: '王五',
    company: 'XYZ科技有限公司',
    phone: '13700137000',
    email: 'wangwu@example.com',
    address: '上海市浦东新区'
  }
}

// 组件挂载时注册保存回调
onMounted(() => {
  if (setSaveCallback) {
    setSaveCallback(saveCustomer)
  }
})
</script>

<style scoped>
.customer-add {
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  min-height: 100vh;
}

.upload-section {
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.upload-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-sm);
}

.upload-tip {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  margin-top: var(--spacing-xs);
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