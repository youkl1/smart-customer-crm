// 全局配置状态管理
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // WEB端导航栏折叠状态
    sidebarCollapsed: false,
    // 系统版本号
    version: '1.0.0',
    // 主题配置
    theme: {
      primaryColor: '#1890FF'
    },
    // 语言设置
    language: 'zh-CN'
  }),
  
  getters: {
    getSidebarCollapsed: (state) => state.sidebarCollapsed,
    getVersion: (state) => state.version,
    getTheme: (state) => state.theme,
    getLanguage: (state) => state.language
  },
  
  actions: {
    // 切换导航栏折叠状态
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    
    // 设置导航栏折叠状态
    setSidebarCollapsed(collapsed) {
      this.sidebarCollapsed = collapsed
    },
    
    // 设置主题
    setTheme(theme) {
      this.theme = { ...this.theme, ...theme }
    },
    
    // 设置语言
    setLanguage(language) {
      this.language = language
    }
  }
})