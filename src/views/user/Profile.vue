<template>
  <div class="min-h-screen bg-color-bg-cream">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-800">个人中心</h1>
          <el-button
            type="primary"
            @click="handleLogout"
            class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>
            退出登录
          </el-button>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 用户信息卡片 -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
              <!-- 头像区域 -->
              <div class="text-center">
                <el-avatar
                  :src="userInfo.userAvatar"
                  :size="120"
                  class="mx-auto mb-4"
                >
                  <i class="fas fa-user text-4xl"></i>
                </el-avatar>
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                  {{ userInfo.userName || userInfo.userAccount }}
                </h2>
                <el-tag
                  :type="userInfo.userRole === 'admin' ? 'danger' : 'primary'"
                  class="mb-4"
                >
                  {{ userInfo.userRole === 'admin' ? '管理员' : '普通用户' }}
                </el-tag>
              </div>

              <!-- 基本信息 -->
              <div class="space-y-3">
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-user-circle w-5 text-center mr-3"></i>
                  <span>账号：{{ userInfo.userAccount }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-calendar-alt w-5 text-center mr-3"></i>
                  <span>注册时间：{{ formatDate(userInfo.createTime) }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-clock w-5 text-center mr-3"></i>
                  <span>最后更新：{{ formatDate(userInfo.updateTime) }}</span>
                </div>
              </div>

              <!-- 编辑按钮 -->
              <el-button
                type="primary"
                class="w-full bg-red-500 hover:bg-red-600 border-none"
                @click="showEditDialog = true"
              >
                <i class="fas fa-edit mr-2"></i>
                编辑资料
              </el-button>
            </div>
          </div>

          <!-- 详细信息区域 -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-info-circle mr-2 text-red-500"></i>
                详细信息
              </h3>

              <div class="space-y-6">
                <!-- 个人简介 -->
                <div>
                  <label class="block text-sm font-medium text-color-text-dark mb-2">
                    个人简介
                  </label>
                  <div class="bg-gray-50 rounded-lg p-4 min-h-[100px]">
                    <p class="text-gray-700 leading-relaxed">
                      {{ userInfo.userProfile || '暂无个人简介' }}
                    </p>
                  </div>
                </div>

                <!-- 账户统计 -->
                <div>
                  <label class="block text-sm font-medium text-color-text-dark mb-4">
                    账户统计
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-blue-600 mb-1">{{ userInfo.id }}</div>
                      <div class="text-sm text-blue-500">用户ID</div>
                    </div>
                    <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-green-600 mb-1">
                        {{ calculateDays(userInfo.createTime) }}
                      </div>
                      <div class="text-sm text-green-500">注册天数</div>
                    </div>
                    <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-purple-600 mb-1">
                        {{ userInfo.userRole === 'admin' ? '管理员' : '用户' }}
                      </div>
                      <div class="text-sm text-purple-500">用户角色</div>
                    </div>
                  </div>
                </div>

                <!-- 安全设置 -->
                <div>
                  <label class="block text-sm font-medium text-color-text-dark mb-4">
                    安全设置
                  </label>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div class="flex items-center">
                        <i class="fas fa-lock text-color-accent-crimson mr-3"></i>
                        <div>
                          <div class="font-medium text-color-text-dark">修改密码</div>
                          <div class="text-sm text-gray-500">定期更新密码以保护账户安全</div>
                        </div>
                      </div>
                      <el-button
                        type="primary"
                        size="small"
                        class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
                        @click="showPasswordDialog = true"
                      >
                        修改
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑资料弹窗 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑个人资料"
      width="90%"
      :style="{ maxWidth: '600px' }"
      center
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        label-width="100px"
        class="space-y-4"
      >
        <el-form-item label="用户昵称" prop="userName">
          <el-input
            v-model="editForm.userName"
            placeholder="请输入用户昵称"
            clearable
          />
        </el-form-item>

        <el-form-item label="头像地址" prop="userAvatar">
          <div class="w-full space-y-3">
            <el-input
              v-model="editForm.userAvatar"
              placeholder="请输入头像URL地址"
              clearable
            />
            <div v-if="editForm.userAvatar" class="flex justify-center">
              <el-avatar
                :src="editForm.userAvatar"
                :size="80"
              >
                <i class="fas fa-user text-2xl"></i>
              </el-avatar>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="个人简介" prop="userProfile">
          <el-input
            v-model="editForm.userProfile"
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button
            type="primary"
            :loading="editLoading"
            @click="handleUpdateProfile"
            class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
          >
            {{ editLoading ? '保存中...' : '保存' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog
      v-model="showPasswordDialog"
      title="修改密码"
      width="90%"
      :style="{ maxWidth: '500px' }"
      center
    >
      <el-alert
        title="密码修改说明"
        type="info"
        :closable="false"
        class="mb-4"
      >
        <template #default>
          <p class="text-sm">当前系统暂不支持在线修改密码功能</p>
          <p class="text-sm text-gray-600">如需修改密码，请联系系统管理员</p>
        </template>
      </el-alert>

      <template #footer>
        <div class="flex justify-end">
          <el-button @click="showPasswordDialog = false">知道了</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

// 组合式 API
const store = useStore()
const router = useRouter()

// 响应式数据
const showEditDialog = ref(false)
const showPasswordDialog = ref(false)
const editLoading = ref(false)
const editFormRef = ref(null)

// 编辑表单数据
const editForm = reactive({
  userName: '',
  userAvatar: '',
  userProfile: ''
})

// 表单验证规则
const editFormRules = {
  userName: [
    { max: 50, message: '用户昵称长度不能超过50个字符', trigger: 'blur' }
  ],
  userAvatar: [
    { type: 'url', message: '请输入有效的URL地址', trigger: 'blur' }
  ],
  userProfile: [
    { max: 500, message: '个人简介长度不能超过500个字符', trigger: 'blur' }
  ]
}

// 计算属性
const userInfo = computed(() => store.getters['user/userInfo'])

// 方法
const formatDate = (dateString) => {
  if (!dateString) return '未知'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateDays = (createTime) => {
  if (!createTime) return 0
  const now = new Date()
  const created = new Date(createTime)
  const diffTime = Math.abs(now - created)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const initEditForm = () => {
  editForm.userName = userInfo.value.userName || ''
  editForm.userAvatar = userInfo.value.userAvatar || ''
  editForm.userProfile = userInfo.value.userProfile || ''
}

const handleUpdateProfile = async () => {
  if (!editFormRef.value) return

  try {
    const valid = await editFormRef.value.validate()
    if (!valid) return

    editLoading.value = true

    // 准备更新数据
    const updateData = {
      userName: editForm.userName || null,
      userAvatar: editForm.userAvatar || null,
      userProfile: editForm.userProfile || null
    }

    await store.dispatch('user/updateUserInfo', updateData)
    ElMessage.success('个人资料更新成功')
    showEditDialog.value = false

  } catch (error) {
    console.error('更新个人资料失败:', error)
    ElMessage.error('更新个人资料失败')
  } finally {
    editLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '退出确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    await store.dispatch('user/logout')
    ElMessage.success('退出登录成功')
    router.push({ name: 'home' })

  } catch (error) {
    if (error !== 'cancel') {
      console.error('退出登录失败:', error)
      ElMessage.error('退出登录失败')
    }
  }
}

// 生命周期
onMounted(() => {
  // 确保用户信息已加载
  if (!userInfo.value.id) {
    store.dispatch('user/getCurrentUser').catch(() => {
      ElMessage.error('获取用户信息失败')
      router.push({ name: 'login' })
    })
  }

  // 监听编辑弹窗打开，初始化表单数据
  const unwatch = store.watch(
    () => showEditDialog.value,
    (newVal) => {
      if (newVal) {
        initEditForm()
      }
    }
  )

  // 组件卸载时清理监听器
  onUnmounted(() => {
    unwatch()
  })
})
</script>

<style scoped>
/* 自定义样式 */
:deep(.el-form-item__label) {
  @apply text-color-text-dark font-medium;
}

:deep(.el-input__wrapper) {
  @apply border-color-primary-charcoal/20;
}

:deep(.el-input__wrapper:hover) {
  @apply border-color-accent-crimson/50;
}

:deep(.el-input__wrapper.is-focus) {
  @apply border-color-accent-crimson;
  box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.1);
}

:deep(.el-textarea__inner) {
  @apply border-color-primary-charcoal/20;
}

:deep(.el-textarea__inner:hover) {
  @apply border-color-accent-crimson/50;
}

:deep(.el-textarea__inner:focus) {
  @apply border-color-accent-crimson;
  box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.1);
}

/* 移动端适配 */
@media (max-width: 640px) {
  :deep(.el-form-item__label) {
    width: 80px !important;
  }
}

/* 渐变背景动画 */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>