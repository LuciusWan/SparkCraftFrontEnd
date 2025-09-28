<template>
  <div class="min-h-screen bg-gradient-to-br from-[var(--color-bg-cream)] via-[var(--color-primary-sage)]/20 to-[var(--color-primary-terracotta)]/30 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- 传统纹样背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 云纹装饰 -->
      <div class="absolute top-10 left-10 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" class="w-full h-full text-[var(--color-primary-charcoal)]">
          <path d="M20,50 Q30,30 50,50 Q70,30 80,50 Q70,70 50,50 Q30,70 20,50 Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="absolute bottom-20 right-20 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" class="w-full h-full text-[var(--color-accent-crimson)]">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M35,35 Q50,20 65,35 Q50,50 35,35 Z" fill="currentColor"/>
        </svg>
      </div>
      <!-- 渐变光晕 -->
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary-terracotta)]/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-primary-sage)]/10 rounded-full blur-3xl"></div>
    </div>

    <!-- 登录卡片 -->
    <div class="relative w-full max-w-md z-10">
      <div class="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 border border-white/20 relative">
        <!-- 传统边框装饰 -->
        <div class="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent-gold)]/20 pointer-events-none"></div>
        
        <!-- 头部 -->
        <div class="text-center mb-8">
          <div class="mb-4">
            <!-- 印章风格logo -->
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--color-accent-crimson)] to-[var(--color-accent-crimson)]/80 rounded-lg flex items-center justify-center shadow-lg">
              <span class="text-white text-xl font-bold" style="font-family: 'ZYSong', serif;">火</span>
            </div>
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-text-dark)] mb-2" style="font-family: 'ZYSong', serif;">
            欢迎回来
          </h1>
          <p class="text-[var(--color-primary-charcoal)] text-sm sm:text-base">
            登录您的 SparkCraft 账户
          </p>
        </div>

        <!-- 登录表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          @submit.prevent="handleLogin"
          class="space-y-6"
        >
          <el-form-item prop="userAccount">
            <el-input
              v-model="loginForm.userAccount"
              placeholder="请输入用户账号"
              size="large"
              class="login-input"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item prop="userPassword">
            <el-input
              v-model="loginForm.userPassword"
              type="password"
              placeholder="请输入密码"
              size="large"
              class="login-input"
              :prefix-icon="Lock"
              show-password
              clearable
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              @click="handleLogin"
              class="w-full h-12 text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cultural-button"
            >
              {{ loading ? '登录中...' : '登录账号' }}
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 底部链接 -->
        <div class="text-center space-y-3">
          <div class="text-sm text-gray-600">
            还没有账号？
            <router-link
              to="/auth/register"
              class="text-[var(--color-accent-crimson)] hover:text-[var(--color-accent-crimson)]/80 transition-colors duration-200 ml-1 font-medium"
            >
              注册新账号
            </router-link>
          </div>
          <div>
            <button
              @click="handleForgotPassword"
              class="text-sm text-[var(--color-primary-charcoal)] hover:text-[var(--color-accent-crimson)] transition-colors duration-200"
            >
              忘记密码？
            </button>
          </div>
        </div>

        <!-- 测试账号提示 -->
        <div class="mt-6 p-3 bg-[var(--color-primary-sage)]/10 rounded-lg border border-[var(--color-primary-sage)]/20">
          <p class="text-xs text-[var(--color-primary-charcoal)] text-center">
            测试账号：test / 12345678
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const store = useStore()

// 响应式数据
const loading = ref(false)
const loginFormRef = ref(null)

// 登录表单数据
const loginForm = reactive({
  userAccount: '',
  userPassword: ''
})

// 表单验证规则
const loginRules = {
  userAccount: [
    { required: true, message: '请输入用户账号', trigger: 'blur' },
    { min: 4, message: '账号长度不能少于4位', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码长度不能少于8位', trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) {
    ElMessage.warning('表单引用不存在')
    return
  }

  try {
    const valid = await loginFormRef.value.validate()
    if (!valid) return

    loading.value = true

    // 调用登录接口
    await store.dispatch('user/login', loginForm)

    // 登录成功后跳转
    ElMessage.success('登录成功！')
    const redirect = router.currentRoute.value.query.redirect || '/imageProject/create'
    router.push(redirect)

  } catch (error) {
    console.error('登录失败:', error)
    // 只显示一次错误消息
    ElMessage.error(error.message || '登录失败，请重试')
  } finally {
    loading.value = false
  }
}

// 处理忘记密码
const handleForgotPassword = () => {
  ElMessage.info('忘记密码功能开发中...')
}

// 页面挂载时检查登录状态
onMounted(() => {

})
</script>

<style scoped>
/* 自定义输入框样式 */
:deep(.login-input .el-input__wrapper) {
  @apply bg-white/80 border-gray-300 rounded-lg;
  min-height: 48px;
  transition: all 0.3s ease;
  border: 2px solid var(--color-primary-charcoal)/20;
}

:deep(.login-input .el-input__wrapper:hover) {
  border-color: var(--color-accent-crimson)/60;
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 20, 60, 0.1);
}

:deep(.login-input .el-input__wrapper.is-focus) {
  border-color: var(--color-accent-crimson);
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(220, 20, 60, 0.1), 0 4px 20px rgba(220, 20, 60, 0.15);
  transform: translateY(-2px);
}

:deep(.login-input .el-input__inner) {
  @apply text-gray-800;
  font-size: 16px; /* 防止iOS缩放 */
  transition: all 0.2s ease;
}

:deep(.login-input .el-input__inner::placeholder) {
  color: var(--color-primary-charcoal)/60;
  transition: color 0.2s ease;
}

:deep(.login-input .el-input__wrapper:hover .el-input__inner::placeholder) {
  color: var(--color-accent-crimson)/70;
}

/* 移动端适配 */
@media (max-width: 640px) {
  :deep(.login-input .el-input__wrapper) {
    min-height: 44px;
  }
}

/* 自定义按钮样式 */
:deep(.el-button--primary) {
  background: var(--color-accent-crimson);
  border-color: var(--color-accent-crimson);
}

:deep(.el-button--primary:hover) {
  background: rgba(220, 20, 60, 0.9);
  border-color: rgba(220, 20, 60, 0.9);
}

/* 响应式字体 */
@media (max-width: 640px) {
  .text-3xl {
    font-size: 1.875rem;
  }
}

/* 安全区域适配 */
@supports (padding: env(safe-area-inset-top)) {
  .min-h-screen {
    min-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>