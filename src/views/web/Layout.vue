<template>
  <div class="web-layout">
    <!-- 左侧导航栏 -->
    <div class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="logo">
        <div class="logo-icon">📊</div>
        <div class="logo-text" v-if="!sidebarCollapsed">智客通CRM</div>
      </div>
      <div class="sidebar-content">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          :collapse="sidebarCollapsed"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#1890FF"
          router
          :sub-menu-width="200"
        >
          <!-- 工作台 -->
          <el-menu-item index="/web/dashboard">
            <el-icon><i-ep-home /></el-icon>
            <template #title>工作台</template>
          </el-menu-item>
          
          <!-- 客户管理 -->
          <el-sub-menu index="/web/customer">
            <template #title>
              <el-icon><i-ep-user /></el-icon>
              <span>客户管理</span>
            </template>
            <el-menu-item index="/web/customer">客户列表</el-menu-item>
            <el-menu-item index="/web/customer/sea">客户公海池</el-menu-item>
          </el-sub-menu>
          
          <!-- 联系人管理 -->
          <el-menu-item index="/web/contact">
            <el-icon><i-ep-chat-dot-round /></el-icon>
            <template #title>联系人管理</template>
          </el-menu-item>
          
          <!-- 商机管理 -->
          <el-menu-item index="/web/business">
            <el-icon><i-ep-sunny /></el-icon>
            <template #title>商机管理</template>
          </el-menu-item>
          
          <!-- 合同管理 -->
          <el-menu-item index="/web/contract">
            <el-icon><i-ep-document /></el-icon>
            <template #title>合同管理</template>
          </el-menu-item>
          
          <!-- 产品管理 -->
          <el-sub-menu index="/web/product">
            <template #title>
              <el-icon><i-ep-goods /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item index="/web/product">产品列表</el-menu-item>
            <el-menu-item index="/web/product/category">产品分类</el-menu-item>
          </el-sub-menu>
          
          <!-- 订单管理 -->
          <el-menu-item index="/web/order">
            <el-icon><i-ep-order /></el-icon>
            <template #title>订单管理</template>
          </el-menu-item>
          
          <!-- 回款管理 -->
          <el-sub-menu index="/web/payment">
            <template #title>
              <el-icon><i-ep-money /></el-icon>
              <span>回款管理</span>
            </template>
            <el-menu-item index="/web/payment">回款记录</el-menu-item>
            <el-menu-item index="/web/payment/plan">回款计划</el-menu-item>
          </el-sub-menu>
          
          <!-- 报表中心 -->
          <el-menu-item index="/web/report">
            <el-icon><i-ep-data-analysis /></el-icon>
            <template #title>报表中心</template>
          </el-menu-item>
          
          <!-- 系统设置 -->
          <el-sub-menu index="/web/setting">
            <template #title>
              <el-icon><i-ep-setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/web/setting/organization">组织架构</el-menu-item>
            <el-menu-item index="/web/setting/role">角色权限</el-menu-item>
            <el-menu-item index="/web/setting/dictionary">字典管理</el-menu-item>
            <el-menu-item index="/web/setting/log">系统日志</el-menu-item>
          </el-sub-menu>
          
          <!-- 个人中心 -->
          <el-menu-item index="/web/profile">
            <el-icon><i-ep-user-filled /></el-icon>
            <template #title>个人中心</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    
    <!-- 右侧内容区 -->
    <div class="main-content">
      <!-- 顶部Header -->
      <header class="header">
        <div class="header-left">
          <el-button
            type="text"
            class="menu-toggle"
            @click="toggleSidebar"
          >
            <el-icon v-if="!sidebarCollapsed"><i-ep-menu /></el-icon>
            <el-icon v-else><i-ep-menu /></el-icon>
          </el-button>
        </div>
        <div class="header-right">
          <el-dropdown>
            <el-button type="text" class="header-btn">
              <el-icon><i-ep-bell /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>消息1</el-dropdown-item>
                <el-dropdown-item>消息2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown>
            <el-button type="text" class="header-btn">
              <el-avatar size="small">
                {{ userInfo?.name?.charAt(0) || '管' }}
              </el-avatar>
              <span class="user-name">{{ userInfo?.name || '管理员' }}</span>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleProfile">个人中心</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      
      <!-- 内容区域 -->
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'
import { useUserStore } from '../../stores/user'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

// 侧边栏折叠状态
const sidebarCollapsed = computed(() => appStore.getSidebarCollapsed)

// 当前激活的菜单
const activeMenu = ref('/web/dashboard')

// 用户信息
const userInfo = computed(() => userStore.getUserInfo)

// 监听路由变化，更新激活的菜单
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  },
  { immediate: true }
)

// 切换侧边栏
const toggleSidebar = () => {
  appStore.toggleSidebar()
}

// 处理个人中心
const handleProfile = () => {
  router.push('/web/profile')
}

// 处理退出登录
const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.web-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #f0f2f5;
}

.sidebar {
  width: 200px;
  height: 100%;
  background-color: #001529;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-content {
  height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
}

/* 滚动条样式 */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.sidebar.collapsed {
  width: 80px;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #001f3f;
}

.logo-icon {
  font-size: 24px;
  margin-right: 12px;
}

.logo-text {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
}

.sidebar-menu {
  border-right: none;
  width: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  font-size: 20px;
  margin-right: 20px;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-btn {
  margin-left: 16px;
  font-size: 18px;
}

.user-name {
  margin-left: 8px;
  font-size: 14px;
  color: #333;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>