<template>
  <div class="login-container">
    <div class="login-content">
      <div class="logo">
        <div class="logo-icon">📊</div>
        <h2 class="system-name">智客通CRM</h2>
      </div>
      <van-form @submit="handleSubmit" class="login-form">
        <van-field
          v-model="form.username"
          name="username"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <van-field
          v-model="form.captcha"
          name="captcha"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #button>
            <div class="captcha-image" @click="refreshCaptcha">
              {{ captcha }}
            </div>
          </template>
        </van-field>
        <div class="login-options">
          <van-checkbox v-model="form.remember">记住密码</van-checkbox>
          <van-checkbox v-model="form.autoLogin">自动登录</van-checkbox>
        </div>
        <div class="forgot-password">
          <a href="javascript:;" @click="handleForgotPassword">忘记密码？</a>
        </div>
        <van-button type="primary" block native-type="submit" class="login-button">
          登录
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { post } from '../../utils/request'
import { showToast } from 'vant'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 获取端类型
const clientType = route.params.clientType || 'web'

// 表单数据
const form = ref({
  username: 'admin',
  password: '123456',
  captcha: '1234',
  remember: false,
  autoLogin: false
})

// 验证码
const captcha = ref('')

// 生成验证码
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captcha.value = result
}

// 刷新验证码
const refreshCaptcha = () => {
  generateCaptcha()
}

// 处理忘记密码
const handleForgotPassword = () => {
  showToast('请联系管理员重置密码')
}

// 处理登录提交
const handleSubmit = async () => {
  try {
    // 模拟登录请求
    const response = await post('/api/login', {
      username: form.value.username,
      password: form.value.password,
      captcha: form.value.captcha,
      remember: form.value.remember,
      autoLogin: form.value.autoLogin,
      clientType: clientType
    })

    if (response.code === 200) {
      // 存储登录状态
      userStore.login(response.data.userInfo, response.data.token, clientType)
      
      // 跳转到对应端的首页
      if (clientType === 'web') {
        router.push('/web/dashboard')
      } else {
        router.push('/mobile/home')
      }
    } else {
      showToast(response.message || '登录失败')
    }
  } catch (error) {
    showToast('登录失败，请重试')
  }
}

// 组件挂载时生成验证码
onMounted(() => {
  generateCaptcha()
})
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-content {
  width: 100%;
  max-width: 400px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 60px;
  margin-bottom: 16px;
}

.system-name {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.login-form {
  width: 100%;
  max-width: 300px;
}

.captcha-image {
  width: 100px;
  height: 40px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  font-size: 12px;
}

.forgot-password {
  text-align: right;
  margin-bottom: 20px;
  font-size: 12px;
}

.forgot-password a {
  color: #1890FF;
  text-decoration: none;
}

.login-button {
  height: 40px;
  font-size: 16px;
}
</style>