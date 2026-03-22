<template>
  <div class="web-product-add">
    <div class="page-header">
      <h1>新增产品</h1>
      <el-button @click="router.back()">返回</el-button>
    </div>
    
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-card>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入产品名称" />
        </el-form-item>
        
        <el-form-item label="产品分类" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择产品分类">
            <el-option 
              v-for="category in categories" 
              :key="category.id" 
              :label="category.name" 
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="产品价格" prop="price">
          <el-input-number 
            v-model="formData.price" 
            :min="0" 
            :step="0.01" 
            :precision="2" 
            placeholder="请输入产品价格"
          />
        </el-form-item>
        
        <el-form-item label="库存数量" prop="stock">
          <el-input-number 
            v-model="formData.stock" 
            :min="0" 
            :step="1" 
            placeholder="请输入库存数量"
          />
        </el-form-item>
        
        <el-form-item label="产品状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="产品描述">
          <el-input 
            v-model="formData.description" 
            type="textarea" 
            rows="4" 
            placeholder="请输入产品描述"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { productApi } from '@/api/product'

const router = useRouter()
const formRef = ref(null)

// 表单数据
const formData = reactive({
  name: '',
  categoryId: '',
  price: 0,
  stock: 0,
  status: 1,
  description: ''
})

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择产品分类', trigger: 'change' }],
  price: [{ required: true, message: '请输入产品价格', trigger: 'blur' }],
  stock: [{ required: true, message: '请输入库存数量', trigger: 'blur' }]
}

// 分类列表
const categories = ref([])

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    // 模拟提交
    const res = await productApi.add(formData)
    
    ElMessage.success('产品添加成功')
    router.push('/web/product/list')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('产品添加失败，请重试')
    }
  }
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 获取分类列表
const getCategories = async () => {
  try {
    const res = await productApi.getCategories()
    categories.value = res.data
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

onMounted(() => {
  getCategories()
})
</script>

<style scoped>
.web-product-add {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

el-card {
  margin-bottom: 20px;
}
</style>