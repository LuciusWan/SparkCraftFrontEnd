<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="text-center">
      <div class="glass-effect rounded-2xl p-12 card-shadow max-w-md mx-auto">
        <!-- 404 图标 -->
        <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
        </div>
        
        <!-- 错误信息 -->
        <h1 class="text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">页面未找到</h2>
        <p class="text-gray-600 mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        
        <!-- 操作按钮 -->
        <div class="space-y-4">
          <el-button type="primary" size="large" @click="goHome" class="w-full">
            <i class="fas fa-home mr-2"></i>
            返回首页
          </el-button>
          <el-button size="large" @click="goBack" class="w-full">
            <i class="fas fa-arrow-left mr-2"></i>
            返回上一页
          </el-button>
        </div>
      </div>
      
      <!-- 建议链接 -->
      <div class="mt-8 text-center">
        <p class="text-gray-500 mb-4">您可能在寻找：</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link 
            to="/" 
            class="text-primary-600 hover:text-primary-700 transition-colors"
          >
            首页
          </router-link>
          <router-link 
            to="/about" 
            class="text-primary-600 hover:text-primary-700 transition-colors"
          >
            关于我们
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
/* 使用 Tailwind CSS 原子类，必要时添加自定义样式 */
</style>