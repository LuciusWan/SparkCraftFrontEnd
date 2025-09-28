<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient mb-4">关于 SparkCraft</h1>
        <p class="text-gray-600">了解我们的项目和技术理念</p>
      </div>
      
      <!-- 项目介绍 -->
      <div class="glass-effect rounded-2xl p-8 card-shadow mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">项目介绍</h2>
        <div class="prose prose-gray max-w-none">
          <p class="text-gray-600 leading-relaxed mb-4">
            SparkCraft 是一个基于 Vue 3 生态系统构建的现代化前端开发框架。
            我们专注于提供优秀的开发体验和用户体验，采用最新的前端技术栈和最佳实践。
          </p>
          <p class="text-gray-600 leading-relaxed mb-4">
            项目采用组件化架构设计，注重代码的可维护性和可扩展性。
            支持多角色权限系统和完全响应式的设计，能够适配各种设备和屏幕尺寸。
          </p>
        </div>
      </div>
      
      <!-- 技术特性 -->
      <div class="glass-effect rounded-2xl p-8 card-shadow mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">技术特性</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                <i class="fas fa-check text-primary-600 text-xs"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Vue 3 Composition API</h3>
                <p class="text-gray-600 text-sm">使用最新的 Composition API 进行开发</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                <i class="fas fa-check text-primary-600 text-xs"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Vite 构建工具</h3>
                <p class="text-gray-600 text-sm">极速的开发服务器和构建性能</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                <i class="fas fa-check text-primary-600 text-xs"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Element Plus UI</h3>
                <p class="text-gray-600 text-sm">丰富的企业级 UI 组件库</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                <i class="fas fa-check text-primary-600 text-xs"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Tailwind CSS</h3>
                <p class="text-gray-600 text-sm">原子化 CSS 框架，快速样式开发</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                <i class="fas fa-check text-primary-600 text-xs"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">响应式设计</h3>
                <p class="text-gray-600 text-sm">Mobile-first 的响应式设计理念</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                <i class="fas fa-check text-primary-600 text-xs"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">代码质量</h3>
                <p class="text-gray-600 text-sm">ESLint + Prettier 代码规范</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 版本信息 -->
      <div class="glass-effect rounded-2xl p-8 card-shadow">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">版本信息</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-4 bg-white/30 rounded-lg">
            <div class="text-lg font-semibold text-gray-800">当前版本</div>
            <div class="text-2xl font-bold text-primary-600 mt-2">v1.0.0</div>
          </div>
          <div class="text-center p-4 bg-white/30 rounded-lg">
            <div class="text-lg font-semibold text-gray-800">发布日期</div>
            <div class="text-gray-600 mt-2">{{ releaseDate }}</div>
          </div>
          <div class="text-center p-4 bg-white/30 rounded-lg">
            <div class="text-lg font-semibold text-gray-800">许可证</div>
            <div class="text-gray-600 mt-2">MIT License</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatDate } from '@/utils'

// 发布日期
const releaseDate = ref(formatDate(new Date(), 'YYYY-MM-DD'))
</script>

<style scoped>
/* 使用 Tailwind CSS 原子类，必要时添加自定义样式 */
</style>