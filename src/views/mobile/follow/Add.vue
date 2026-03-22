<template>
  <div class="follow-add">
    <!-- 表单 -->
    <van-form @submit="saveFollow">
      <van-field
        v-model="followForm.content"
        name="content"
        label="跟进内容"
        placeholder="请输入跟进内容"
        type="textarea"
        rows="4"
        :rules="[{ required: true, message: '请输入跟进内容' }]"
      />
      <van-field
        v-model="followForm.remark"
        name="remark"
        label="备注"
        placeholder="请输入备注信息"
        type="textarea"
        rows="2"
      />
    </van-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const route = useRoute()

// 表单数据
const followForm = ref({
  content: '',
  remark: ''
})

// 保存跟进记录
const saveFollow = () => {
  // 模拟保存操作
  console.log('保存跟进记录:', followForm.value)
  
  // 显示保存成功提示
  showToast({
    message: '跟进记录添加成功',
    type: 'success',
    duration: 2000
  })
  
  // 跳转到上一页
  setTimeout(() => {
    router.back()
  }, 2000)
}
</script>

<style scoped>
.follow-add {
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