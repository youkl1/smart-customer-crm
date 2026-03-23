<template>
  <div class="customer-edit">
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
    </van-form>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
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
    message: '客户更新成功',
    type: 'success',
    duration: 2000
  })
  
  // 跳转到客户详情
  setTimeout(() => {
    router.push(`/mobile/customer/detail/${route.params.id}`)
  }, 2000)
}

// 页面加载时获取客户数据
onMounted(() => {
  // 模拟获取客户数据
  console.log('获取客户数据:', route.params.id)
  
  // 模拟数据
  customerForm.value = {
    name: '张三',
    company: 'ABC科技有限公司',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    address: '北京市朝阳区',
    status: 'active'
  }
  
  // 注册保存回调
  if (setSaveCallback) {
    setSaveCallback(saveCustomer)
  }
})
</script>

<style scoped>
.customer-edit {
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