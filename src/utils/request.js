import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import router from '@/router'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true // 支持跨域携带cookie（用于Session）
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 显示加载状态
    store.dispatch('app/setLoading', true)
    
    // 添加 token
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    store.dispatch('app/setLoading', false)
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    store.dispatch('app/setLoading', false)
    
    const { code, data, message } = response.data
    
    // 根据后端约定的状态码处理响应
    if (code === 200 || code === 0) {
      return data
    } else if (code === 401) {
      // 未授权，清除用户数据并跳转到登录页
      ElMessage.error('登录已过期，请重新登录')
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error(message || '未授权'))
    } else if (code === 403) {
      ElMessage.error('权限不足')
      return Promise.reject(new Error(message || '权限不足'))
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || '请求失败'))
    }
  },
  error => {
    store.dispatch('app/setLoading', false)
    
    console.error('Response error:', error)
    
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          ElMessage.error(data.message || '请求参数错误')
          break
        case 401:
          ElMessage.error('登录已过期，请重新登录')
          store.dispatch('user/logout')
          router.push('/login')
          break
        case 403:
          ElMessage.error('权限不足')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(data.message || '网络错误')
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请稍后重试')
    } else {
      ElMessage.error('网络连接失败，请检查网络设置')
    }
    
    return Promise.reject(error)
  }
)

// 封装常用的请求方法
export const http = {
  get(url, params = {}) {
    return request.get(url, { params })
  },
  
  post(url, data = {}) {
    return request.post(url, data)
  },
  
  put(url, data = {}) {
    return request.put(url, data)
  },
  
  delete(url, params = {}) {
    return request.delete(url, { params })
  },
  
  upload(url, formData) {
    return request.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default request