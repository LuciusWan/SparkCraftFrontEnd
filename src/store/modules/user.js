import { userLogin, userRegister, getCurrentUser, userLogout } from '@/api/user'
import { ElMessage } from 'element-plus'

// 用户相关状态管理
const state = {
  token: localStorage.getItem('token') || '',
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  isLoggedIn: !!localStorage.getItem('userInfo')
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
  
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    state.isLoggedIn = !!userInfo && !!userInfo.id
    if (userInfo && userInfo.id) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    } else {
      localStorage.removeItem('userInfo')
    }
  },
  
  CLEAR_USER_DATA(state) {
    state.token = ''
    state.userInfo = {}
    state.isLoggedIn = false
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }
}

const actions = {
  // 用户注册
  async register({ commit }, registerData) {
    try {
      const userId = await userRegister(registerData)
      // 成功消息由页面组件处理，这里不重复显示
      return userId
    } catch (error) {
      // 错误消息由页面组件处理，这里只抛出错误
      throw error
    }
  },

  // 用户登录
  async login({ commit }, loginData) {
    try {
      const userInfo = await userLogin(loginData)
      commit('SET_USER_INFO', userInfo)
      // 成功消息由页面组件处理，这里不重复显示
      return userInfo
    } catch (error) {
      // 错误消息由页面组件处理，这里只抛出错误
      throw error
    }
  },
  
  // 获取当前用户信息
  async getCurrentUser({ commit }) {
    try {
      const userInfo = await getCurrentUser()
      commit('SET_USER_INFO', userInfo)
      return userInfo
    } catch (error) {
      // 如果获取用户信息失败，清除本地数据
      commit('CLEAR_USER_DATA')
      throw error
    }
  },
  
  // 用户登出
  async logout({ commit }) {
    try {
      await userLogout()
      commit('CLEAR_USER_DATA')
      ElMessage.success('退出登录成功')
    } catch (error) {
      // 即使后端登出失败，也要清除前端数据
      commit('CLEAR_USER_DATA')
      ElMessage.warning('退出登录')
    }
  },
  
  // 更新用户信息
  updateUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
  },

  // 清除用户数据（用于强制登出）
  clearUserData({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userInfo: state => state.userInfo,
  token: state => state.token,
  userId: state => state.userInfo.id,
  userName: state => state.userInfo.userName || state.userInfo.userAccount,
  userAccount: state => state.userInfo.userAccount,
  userAvatar: state => state.userInfo.userAvatar,
  userProfile: state => state.userInfo.userProfile,
  userRole: state => state.userInfo.userRole,
  isAdmin: state => state.userInfo.userRole === 'admin',
  createTime: state => state.userInfo.createTime,
  updateTime: state => state.userInfo.updateTime
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}