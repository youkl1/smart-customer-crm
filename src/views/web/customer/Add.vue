<template>
  <div class="customer-add">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>新增客户</span>
        </div>
      </template>
      <el-form :model="form" label-width="120px" style="max-width: 600px">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="客户状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择客户状态">
            <el-option label="潜在客户" value="潜在客户" />
            <el-option label="意向客户" value="意向客户" />
            <el-option label="成交" value="成交" />
            <el-option label="流失客户" value="流失客户" />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" type="textarea" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="负责人" prop="ownerId">
          <el-select v-model="form.ownerId" placeholder="请选择负责人">
            <el-option label="张三" value="1" />
            <el-option label="李四" value="2" />
            <el-option label="王五" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 表单数据
const form = ref({
  name: '',
  phone: '',
  email: '',
  status: '潜在客户',
  address: '',
  ownerId: '1'
})

// 处理提交
const handleSubmit = () => {
  if (!form.value.name) {
    ElMessage.error('请输入客户名称')
    return
  }
  ElMessage.success('新增成功')
  router.push('/web/customer')
}

// 处理取消
const handleCancel = () => {
  router.push('/web/customer')
}
</script>

<style scoped>
.customer-add {
  padding: 20px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>