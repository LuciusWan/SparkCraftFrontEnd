<template>
  <div class="min-h-screen bg-gradient-to-br from-[var(--color-bg-cream)] via-[var(--color-primary-sage)]/20 to-[var(--color-primary-terracotta)]/30 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- 传统纹样背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 竹叶装饰 -->
      <div class="absolute top-20 right-10 w-28 h-28 opacity-10">
        <svg viewBox="0 0 100 100" class="w-full h-full text-[var(--color-primary-sage)]">
          <path d="M50,10 Q60,30 50,50 Q40,30 50,10 Z" fill="currentColor"/>
          <path d="M50,50 Q70,60 50,90 Q30,60 50,50 Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="absolute bottom-10 left-20 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" class="w-full h-full text-[var(--color-accent-gold)]">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="3"/>
          <path d="M30,30 L70,70 M70,30 L30,70" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <!-- 渐变光晕 -->
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary-terracotta)]/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-primary-sage)]/10 rounded-full blur-3xl"></div>
    </div>

    <!-- 注册卡片 -->
    <div class="relative w-full max-w-md z-10">
      <div class="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 border border-white/20 relative">
        <!-- 传统边框装饰 -->
        <div class="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent-gold)]/20 pointer-events-none"></div>
        
        <!-- 头部 -->
        <div class="text-center mb-8">
          <div class="mb-4">
            <!-- 印章风格logo -->
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--color-primary-sage)] to-[var(--color-primary-sage)]/80 rounded-lg flex items-center justify-center shadow-lg">
              <span class="text-white text-xl font-bold" style="font-family: 'ZYSong', serif;">创</span>
            </div>
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-text-dark)] mb-2" style="font-family: 'ZYSong', serif;">
            加入 SparkCraft
          </h1>
          <p class="text-[var(--color-primary-charcoal)] text-sm sm:text-base">
            开启您的中华文创之旅
          </p>
        </div>

        <!-- 注册表单 -->
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerRules"
          @submit.prevent="handleRegister"
          class="space-y-6"
        >
          <el-form-item prop="userAccount">
            <el-input
              v-model="registerForm.userAccount"
              placeholder="请输入用户账号（至少4位）"
              size="large"
              class="register-input"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item prop="userPassword">
            <el-input
              v-model="registerForm.userPassword"
              type="password"
              placeholder="请输入密码（至少8位）"
              size="large"
              class="register-input"
              :prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item prop="checkPassword">
            <el-input
              v-model="registerForm.checkPassword"
              type="password"
              placeholder="请确认密码"
              size="large"
              class="register-input"
              :prefix-icon="Lock"
              show-password
              clearable
              @keyup.enter="handleRegister"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              @click="handleRegister"
              class="w-full h-12 text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cultural-button"
            >
              {{ loading ? '注册中...' : '立即注册' }}
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 底部链接 -->
        <div class="text-center">
          <div class="text-sm text-gray-600">
            已有账号？
            <router-link
              to="/auth/login"
              class="text-[var(--color-accent-crimson)] hover:text-[var(--color-accent-crimson)]/80 transition-colors duration-200 ml-1 font-medium"
            >
              立即登录
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const store = useStore()

// 响应式数据
const loading = ref(false)
const registerFormRef = ref(null)

// 注册表单数据
const registerForm = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

// 自定义验证器
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 8) {
    callback(new Error('密码长度不能少于8位'))
  } else {
    if (registerForm.checkPassword !== '') {
      registerFormRef.value.validateField('checkPassword')
    }
    callback()
  }
}

const validateCheckPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== registerForm.userPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}



// 表单验证规则
const registerRules = {
  userAccount: [
    { required: true, message: '请输入用户账号', trigger: 'blur' },
    { min: 4, message: '账号长度不能少于4位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '账号只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  userPassword: [
    { validator: validatePassword, trigger: 'blur' }
  ],
  checkPassword: [
    { validator: validateCheckPassword, trigger: 'blur' }
  ]
}

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) {
    ElMessage.warning('表单引用不存在')
    return
  }

  try {
    const valid = await registerFormRef.value.validate()
    if (!valid) return

    loading.value = true

    // 调用注册接口
    const userId = await store.dispatch('user/register', {
      userAccount: registerForm.userAccount,
      userPassword: registerForm.userPassword,
      checkPassword: registerForm.checkPassword
    })

    console.log('注册成功，用户ID:', userId)

    // 注册成功后跳转到登录页
    ElMessage.success('注册成功！请登录')
    router.push('/auth/login')

  } catch (error) {
    console.error('注册失败:', error)
    // 只显示一次错误消息
    ElMessage.error(error.message || '注册失败，请重试')
  } finally {
    loading.value = false
  }
}


</script>

<style scoped>
/* 自定义输入框样式 */
:deep(.register-input .el-input__wrapper) {
  @apply bg-white/80 border-gray-300 rounded-lg;
  min-height: 48px;
  transition: all 0.3s ease;
  border: 2px solid var(--color-primary-charcoal)/20;
}

:deep(.register-input .el-input__wrapper:hover) {
  border-color: var(--color-primary-sage)/80;
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(156, 175, 136, 0.15);
}

:deep(.register-input .el-input__wrapper.is-focus) {
  border-color: var(--color-primary-sage);
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(156, 175, 136, 0.15), 0 4px 20px rgba(156, 175, 136, 0.2);
  transform: translateY(-2px);
}

:deep(.register-input .el-input__inner) {
  @apply text-gray-800;
  font-size: 16px; /* 防止iOS缩放 */
  transition: all 0.2s ease;
}

:deep(.register-input .el-input__inner::placeholder) {
  color: var(--color-primary-charcoal)/60;
  transition: color 0.2s ease;
}

:deep(.register-input .el-input__wrapper:hover .el-input__inner::placeholder) {
  color: var(--color-primary-sage)/80;
}

/* 移动端适配 */
@media (max-width: 640px) {
  :deep(.register-input .el-input__wrapper) {
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

/* 自定义复选框样式 */
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--color-accent-crimson);
  border-color: var(--color-accent-crimson);
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: var(--color-text-dark);
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