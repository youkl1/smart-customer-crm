<template>
  <div class="contact-edit">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="编辑联系人"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      right-text="保存"
      @click-right="saveContact"
    />
    
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
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
  alert('联系人更新成功')
  
  // 跳转到联系人列表
  router.push('/mobile/contact')
}

// 页面加载时获取联系人数据
onMounted(() => {
  // 模拟获取联系人数据
  console.log('获取联系人数据:', route.params.id)
  
  // 模拟数据
  contactForm.value = {
    name: '张三',
    company: 'ABC科技有限公司',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    position: '总经理',
    remark: '重要客户'
  }
})
</script>

<style scoped>
.contact-edit {
  padding: 10px;
}
</style>