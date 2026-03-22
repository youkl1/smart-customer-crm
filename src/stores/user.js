// 用户状态管理
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: (() => {
      try {
        const userInfoStr = localStorage.getItem('userInfo')
        return userInfoStr ? JSON.parse(userInfoStr) : null
      } catch (error) {
        return null
      }
    })(),
    isLoggedIn: !!localStorage.getItem('token'),
    clientType: localStorage.getItem('clientType') || ''
  }),
  
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getClientType: (state) => state.clientType
  },
  
  actions: {
    // 登录
    login(userInfo, token, clientType) {
      this.userInfo = userInfo
      this.token = token
      this.isLoggedIn = true
      this.clientType = clientType
      
      // 持久化存储
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      localStorage.setItem('token', token)
      localStorage.setItem('clientType', clientType)
    },
    
    // 登出
    logout() {
      this.userInfo = null
      this.token = ''
      this.isLoggedIn = false
      this.clientType = ''
      
      // 清除本地存储
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      localStorage.removeItem('clientType')
    },
    
    // 更新用户信息
    updateUserInfo(userInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    
    // 清除Token（用于Token过期）
    clearToken() {
      this.token = ''
      this.isLoggedIn = false
      localStorage.removeItem('token')
    }
  }
})