<template>
  <div class="entry-container">
    <div class="entry-content">
      <div class="logo">
        <div class="logo-icon">📊</div>
        <h1 class="system-name">智客通CRM</h1>
      </div>
      <div class="button-group">
        <van-button 
          type="primary" 
          size="large" 
          class="entry-button" 
          @click="handleWebClick"
        >
          电脑端（WEB后台管理）
        </van-button>
        <van-button 
          type="default" 
          size="large" 
          class="entry-button" 
          @click="handleMobileClick"
        >
          移动端（小程序）
        </van-button>
      </div>
      <div class="footer">
        <p class="version">版本号：v1.0.0</p>
        <p class="copyright">© 2026 智客通CRM 版权所有</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 处理WEB端点击
const handleWebClick = () => {
  router.push('/login/web')
}

// 处理移动端点击
const handleMobileClick = () => {
  router.push('/login/mobile')
}
</script>

<style scoped>
.entry-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.entry-content {
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
  margin-bottom: 40px;
}

.logo-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.system-name {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.button-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.entry-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
}

.footer {
  text-align: center;
  width: 100%;
}

.version {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px 0;
}

.copyright {
  font-size: 12px;
  color: #999;
  margin: 0;
}
</style>