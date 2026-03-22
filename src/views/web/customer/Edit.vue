<template>
  <div class="customer-edit">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>编辑客户</span>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 获取客户ID
const customerId = route.params.id

// 表单数据
const form = ref({
  name: '阿里巴巴集团',
  phone: '13800138000',
  email: 'contact@alibaba.com',
  status: '成交',
  address: '杭州市余杭区文一西路969号',
  ownerId: '1'
})

// 处理提交
const handleSubmit = () => {
  ElMessage.success('编辑成功')
  router.push(`/web/customer/detail/${customerId}`)
}

// 处理取消
const handleCancel = () => {
  router.push(`/web/customer/detail/${customerId}`)
}

// 组件挂载时加载客户数据
onMounted(() => {
  // 这里可以加载客户的详细数据
  // 由于是模拟环境，我们直接使用默认值
})
</script>

<style scoped>
.customer-edit {
  padding: 20px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>