<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-32 h-32 bg-red-200/30 rounded-full blur-xl"></div>
      <div class="absolute top-1/3 right-20 w-24 h-24 bg-orange-200/30 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-200/30 rounded-full blur-xl"></div>
    </div>

    <div class="relative max-w-md w-full">
      <!-- 主卡片 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
        <!-- Logo 和标题 -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i class="fas fa-fire text-white text-2xl"></i>
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
            SparkCraft
          </h1>
          <p class="text-gray-600 text-sm">
            中国风文创平台
          </p>
        </div>

        <!-- 登录注册选择 -->
        <div class="space-y-4">
          <!-- 登录按钮 -->
          <el-button 
            type="primary" 
            size="large" 
            class="w-full h-12 text-base font-medium"
            @click="goToLogin"
          >
            <i class="fas fa-sign-in-alt mr-2"></i>
            登录账号
          </el-button>

          <!-- 注册按钮 -->
          <el-button 
            size="large" 
            class="w-full h-12 text-base font-medium border-2 border-gray-300 hover:border-orange-400 hover:text-orange-600"
            @click="goToRegister"
          >
            <i class="fas fa-user-plus mr-2"></i>
            注册新账号
          </el-button>
        </div>

        <!-- 分割线 -->
        <div class="flex items-center my-6">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span class="px-4 text-sm text-gray-500">或</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <!-- 游客访问 -->
        <div class="text-center">
          <el-button 
            text 
            class="text-gray-500 hover:text-orange-600"
            @click="guestVisit"
          >
            <i class="fas fa-eye mr-2"></i>
            游客浏览
          </el-button>
        </div>

        <!-- 底部装饰 -->
        <div class="mt-8 text-center">
          <div class="flex justify-center space-x-4 text-gray-400 text-sm">
            <span>传承文化</span>
            <span>•</span>
            <span>创新设计</span>
            <span>•</span>
            <span>匠心工艺</span>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="text-center mt-6 text-gray-500 text-sm">
        © 2024 SparkCraft. 用心传承中华文化
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 跳转到登录页面
const goToLogin = () => {
  router.push('/auth/login')
}

// 跳转到注册页面
const goToRegister = () => {
  router.push('/auth/register')
}

// 游客访问
const guestVisit = () => {
  ElMessage.info('游客模式：您可以浏览部分内容，登录后享受完整功能')
  router.push('/about')
}
</script>

<style scoped>
/* 使用 Tailwind CSS 原子类，必要时添加自定义样式 */
</style>