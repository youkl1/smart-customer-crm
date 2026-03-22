<template>
  <div class="mobile-profile">
    <van-nav-bar title="个人中心" />
    
    <!-- 个人信息卡片 -->
    <div class="profile-card" @click="navigateToEdit">
      <div class="avatar">
        <img :src="userInfo.avatar || defaultAvatar" alt="头像" />
      </div>
      <div class="user-info">
        <div class="user-name">{{ userInfo.name }}</div>
        <div class="user-role">{{ userInfo.role }}</div>
      </div>
      <van-icon name="arrow" />
    </div>
    
    <!-- 功能列表 -->
    <van-cell-group class="function-list">
      <van-cell 
        title="个人信息编辑" 
        is-link 
        @click="navigateToEdit"
        :left-icon="'user-o'"
      />
      <van-cell 
        title="修改密码" 
        is-link 
        @click="navigateToPassword"
        :left-icon="'lock-o'"
      />
      <van-cell 
        title="关于系统" 
        is-link 
        @click="showAbout"
        :left-icon="'info-o'"
      />
    </van-cell-group>
    
    <!-- 退出登录按钮 -->
    <div class="logout-container">
      <van-button 
        type="danger" 
        block 
        @click="logout"
      >
        退出登录
      </van-button>
    </div>
    
    <!-- 关于系统弹窗 -->
    <van-popup v-model:show="aboutVisible" position="bottom">
      <div class="about-content">
        <h3>关于智客通CRM</h3>
        <div class="about-item">
          <span class="label">版本号：</span>
          <span class="value">v1.0.0</span>
        </div>
        <div class="about-item">
          <span class="label">系统名称：</span>
          <span class="value">智客通CRM</span>
        </div>
        <div class="about-item">
          <span class="label">版权所有：</span>
          <span class="value">SmartCustomer Inc.</span>
        </div>
        <van-button type="primary" block @click="aboutVisible = false">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { showToast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

const userInfo = ref({
  name: userStore.userInfo?.name || '用户',
  role: userStore.userInfo?.role || '销售顾问',
  avatar: userStore.userInfo?.avatar
})

const defaultAvatar = 'https://img.yzcdn.cn/vant/user.png'
const aboutVisible = ref(false)

// 导航到个人信息编辑页
const navigateToEdit = () => {
  router.push('/mobile/profile/edit')
}

// 导航到修改密码页
const navigateToPassword = () => {
  router.push('/mobile/profile/password')
}

// 显示关于系统弹窗
const showAbout = () => {
  aboutVisible.value = true
}

// 退出登录
const logout = () => {
  userStore.logout()
  showToast('退出登录成功')
  router.push('/entry')
}
</script>

<style scoped>
.mobile-profile {
  padding-bottom: 60px;
}

.profile-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  margin-bottom: 12px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #333;
}

.user-role {
  font-size: 14px;
  color: #666;
}

.function-list {
  margin-bottom: 24px;
}

.logout-container {
  padding: 0 16px;
}

.about-content {
  padding: 24px;
  background: white;
  border-radius: 12px 12px 0 0;
}

.about-content h3 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
  font-size: 18px;
}

.about-item {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
}

.about-item .label {
  color: #666;
  font-size: 14px;
}

.about-item .value {
  color: #333;
  font-size: 14px;
}

.about-content .van-button {
  margin-top: 16px;
}
</style>