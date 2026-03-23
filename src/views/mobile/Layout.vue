<template>
  <div class="mobile-layout">
    <!-- 顶部标题栏 -->
    <div class="header" :style="{ backgroundColor: 'var(--primary-color)', color: '#fff', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }">
      <div class="header-left" v-if="showBack" @click="handleBack">
        返回
      </div>
      <div class="header-center">
        {{ currentTitle }}
      </div>
      <div class="header-right" @click="handleHeaderRightClick">
        {{ showSave ? '保存' : showAdd ? '新增' : showEdit ? '编辑' : '' }}
      </div>
    </div>
    
    <!-- 内容区域 -->
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    
    <!-- 底部导航栏 -->
    <div class="tabbar-container">
      <div class="tabbar">
        <div 
          class="tabbar-item" 
          :class="{ active: activeTab === '/mobile/home' }"
          @click="handleTabClick('/mobile/home')"
        >
          <span class="tabbar-icon">👥</span>
          <span class="tabbar-text">客户</span>
        </div>
        <div 
          class="tabbar-item" 
          :class="{ active: activeTab === '/mobile/business' }"
          @click="handleTabClick('/mobile/business')"
        >
          <span class="tabbar-icon">⭐</span>
          <span class="tabbar-text">商机</span>
        </div>
        <div 
          class="tabbar-item" 
          :class="{ active: activeTab === '/mobile/task' }"
          @click="handleTabClick('/mobile/task')"
        >
          <span class="tabbar-icon">📋</span>
          <span class="tabbar-text">任务</span>
        </div>
        <div 
          class="tabbar-item" 
          :class="{ active: activeTab === '/mobile/profile' }"
          @click="handleTabClick('/mobile/profile')"
        >
          <span class="tabbar-icon">👤</span>
          <span class="tabbar-text">我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
const router = useRouter()

// 当前激活的标签
const activeTab = ref('/mobile/home')

// 当前页面标题
const currentTitle = ref('客户管理')

// 是否显示返回按钮
const showBack = ref(false)

// 是否显示保存按钮
const showSave = ref(false)

// 是否显示新增按钮
const showAdd = ref(false)

// 是否显示编辑按钮
const showEdit = ref(false)

// 保存回调函数
const saveCallback = ref(null)

// 提供保存方法给子组件
provide('setSaveCallback', (callback) => {
  saveCallback.value = callback
})

// 页面标题映射
const titleMap = {
  '/mobile/home': '客户管理',
  '/mobile/contact': '联系人管理',
  '/mobile/business': '商机管理',
  '/mobile/task': '任务中心',
  '/mobile/report': '报表看板',
  '/mobile/message': '消息通知',
  '/mobile/profile': '个人中心'
}

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    // 重置保存回调
    saveCallback.value = null
    
    // 更新激活的标签
    if (newPath.startsWith('/mobile/home')) {
      activeTab.value = '/mobile/home'
    } else if (newPath.startsWith('/mobile/business')) {
      activeTab.value = '/mobile/business'
    } else if (newPath.startsWith('/mobile/task')) {
      activeTab.value = '/mobile/task'
    } else if (newPath.startsWith('/mobile/profile')) {
      activeTab.value = '/mobile/profile'
    }
    
    // 更新页面标题
    if (newPath.startsWith('/mobile/customer/detail')) {
      currentTitle.value = '客户详情'
    } else if (newPath.startsWith('/mobile/customer/edit')) {
      currentTitle.value = '编辑客户'
    } else if (newPath.startsWith('/mobile/customer/add')) {
      currentTitle.value = '新增客户'
    } else if (newPath.startsWith('/mobile/customer/sea')) {
      currentTitle.value = '客户公海池'
    } else if (newPath.startsWith('/mobile/business/detail')) {
      currentTitle.value = '商机详情'
    } else if (newPath.startsWith('/mobile/business/edit')) {
      currentTitle.value = '编辑商机'
    } else if (newPath.startsWith('/mobile/business/add')) {
      currentTitle.value = '新增商机'
    } else if (newPath.startsWith('/mobile/contact/detail')) {
      currentTitle.value = '联系人详情'
    } else if (newPath.startsWith('/mobile/contact/edit')) {
      currentTitle.value = '编辑联系人'
    } else if (newPath.startsWith('/mobile/contact/add')) {
      currentTitle.value = '新增联系人'
    } else if (newPath.startsWith('/mobile/task/detail')) {
      currentTitle.value = '任务详情'
    } else if (newPath.startsWith('/mobile/task/edit')) {
      currentTitle.value = '编辑任务'
    } else if (newPath.startsWith('/mobile/task/add')) {
      currentTitle.value = '新增任务'
    } else if (newPath.startsWith('/mobile/follow/add')) {
      currentTitle.value = '添加跟进记录'
    } else if (newPath.startsWith('/mobile/profile/edit')) {
      currentTitle.value = '编辑个人信息'
    } else if (newPath.startsWith('/mobile/profile/password')) {
      currentTitle.value = '修改密码'
    } else {
      for (const [path, title] of Object.entries(titleMap)) {
        if (newPath.startsWith(path)) {
          currentTitle.value = title
          break
        }
      }
    }
    
    // 更新返回按钮显示状态
    showBack.value = !['/mobile/home', '/mobile/business', '/mobile/task', '/mobile/profile', '/mobile/contact', '/mobile/report', '/mobile/message'].includes(newPath)
    
    // 更新保存按钮显示状态
    showSave.value = newPath.includes('/add') || newPath.includes('/edit')
    
    // 更新新增按钮显示状态
    showAdd.value = ['/mobile/home', '/mobile/business', '/mobile/contact', '/mobile/task', '/mobile/report', '/mobile/message'].includes(newPath)
    
    // 更新编辑按钮显示状态
    showEdit.value = newPath.includes('/detail/')
  },
  { immediate: true }
)

// 处理返回按钮点击
const handleBack = () => {
  router.back()
}

// 处理标签切换
const handleTabChange = (value) => {
  // 检查value是否为数字索引
  if (typeof value === 'number') {
    // 定义标签索引到路径的映射
    const tabPaths = ['/mobile/home', '/mobile/business', '/mobile/task', '/mobile/profile']
    if (value >= 0 && value < tabPaths.length) {
      router.push(tabPaths[value])
    }
  } else {
    // 如果是路径字符串，直接使用
    router.push(value)
  }
}

// 处理底部导航栏点击
const handleTabClick = (path) => {
  activeTab.value = path
  router.push(path)
}

// 处理保存按钮点击
const handleSave = () => {
  if (saveCallback.value) {
    saveCallback.value()
  } else {
    showToast({
      message: '保存功能未实现',
      type: 'warning',
      duration: 2000
    })
  }
}

// 处理新增按钮点击
const handleAdd = () => {
  // 根据当前路径跳转到对应的新增页面
  const currentPath = route.path
  if (currentPath === '/mobile/home') {
    router.push('/mobile/customer/add')
  } else if (currentPath === '/mobile/business') {
    router.push('/mobile/business/add')
  } else if (currentPath === '/mobile/contact') {
    router.push('/mobile/contact/add')
  } else if (currentPath === '/mobile/task') {
    router.push('/mobile/task/add')
  } else if (currentPath === '/mobile/report') {
    // 报表看板页面可以跳转到新增客户或新增商机
    router.push('/mobile/customer/add')
  } else if (currentPath === '/mobile/message') {
    // 消息通知页面可以跳转到个人中心
    router.push('/mobile/profile')
  }
}

// 处理编辑按钮点击
const handleEdit = () => {
  // 根据当前路径跳转到对应的编辑页面
  const currentPath = route.path
  if (currentPath.includes('/customer/detail/')) {
    const id = currentPath.split('/').pop()
    router.push(`/mobile/customer/edit/${id}`)
  } else if (currentPath.includes('/business/detail/')) {
    const id = currentPath.split('/').pop()
    router.push(`/mobile/business/edit/${id}`)
  } else if (currentPath.includes('/contact/detail/')) {
    const id = currentPath.split('/').pop()
    router.push(`/mobile/contact/edit/${id}`)
  } else if (currentPath.includes('/task/detail/')) {
    const id = currentPath.split('/').pop()
    router.push(`/mobile/task/edit/${id}`)
  }
}

// 处理顶部右侧按钮点击
const handleHeaderRightClick = () => {
  if (showSave.value) {
    handleSave()
  } else if (showAdd.value) {
    handleAdd()
  } else if (showEdit.value) {
    handleEdit()
  }
}
</script>

<style scoped>
.mobile-layout {
  width: 100%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 var(--spacing-sm);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.header-left {
  width: 60px;
  text-align: left;
  cursor: pointer;
}

.header-center {
  flex: 1;
  text-align: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.header-right {
  width: 60px;
  text-align: right;
  cursor: pointer;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px; /* 为底部导航栏留出空间 */
}

.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background-color: var(--card-background);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.tabbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tabbar-item:active {
  background-color: var(--border-color-light);
}

.tabbar-item.active {
  color: var(--primary-color);
}

.tabbar-icon {
  font-size: var(--font-size-lg);
  margin-bottom: 2px;
}

.tabbar-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
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