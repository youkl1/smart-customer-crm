<template>
  <div class="contact-add">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>新增联系人</h2>
      <el-button type="primary" @click="saveContact" :loading="loading">保存</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </div>
    
    <!-- 表单 -->
    <el-form
      :model="contactForm"
      :rules="rules"
      ref="formRef"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="contactForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="公司" prop="company">
        <el-input v-model="contactForm.company" placeholder="请输入公司名称" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="contactForm.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="contactForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="contactForm.position" placeholder="请输入职位" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="contactForm.remark"
          type="textarea"
          :rows="3"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单引用
const formRef = ref(null)

// 加载状态
const loading = ref(false)

// 表单数据
const contactForm = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
  position: '',
  remark: ''
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  company: [
    { required: true, message: '请输入公司名称', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

// 保存联系人信息
const saveContact = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟保存操作
    console.log('保存联系人信息:', contactForm.value)
    
    // 模拟保存成功
    setTimeout(() => {
      loading.value = false
      alert('联系人创建成功')
      router.push('/web/contact')
    }, 1000)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<style scoped>
.contact-add {
  padding: 20px;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  flex: 1;
  margin: 0;
}

.page-header button {
  margin-left: 10px;
}

.el-form {
  max-width: 800px;
}
</style>