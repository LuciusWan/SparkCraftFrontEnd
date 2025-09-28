<template>
  <el-dialog
    v-model="visible"
    title="新增用户"
    width="90%"
    :style="{ maxWidth: '600px' }"
    center
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      class="space-y-4"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <el-form-item label="用户账号" prop="userAccount" class="sm:col-span-2">
          <el-input
            v-model="formData.userAccount"
            placeholder="请输入用户账号（至少4位）"
            clearable
          />
        </el-form-item>

        <el-form-item label="用户昵称" prop="userName">
          <el-input
            v-model="formData.userName"
            placeholder="请输入用户昵称"
            clearable
          />
        </el-form-item>

        <el-form-item label="用户角色" prop="userRole">
          <el-select
            v-model="formData.userRole"
            placeholder="请选择用户角色"
            class="w-full"
          >
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="头像地址" prop="userAvatar">
        <div class="w-full space-y-3">
          <el-input
            v-model="formData.userAvatar"
            placeholder="请输入头像URL地址（可选）"
            clearable
          />
          <div v-if="formData.userAvatar" class="flex justify-center">
            <el-avatar
              :src="formData.userAvatar"
              :size="80"
              @error="handleAvatarError"
            >
              <i class="fas fa-user text-2xl"></i>
            </el-avatar>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="用户简介" prop="userProfile">
        <el-input
          v-model="formData.userProfile"
          type="textarea"
          :rows="4"
          placeholder="请输入用户简介（可选）"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <!-- 密码提示 -->
      <el-alert
        title="密码说明"
        type="info"
        :closable="false"
        class="mb-4"
      >
        <template #default>
          <p class="text-sm">新用户将使用默认密码：<strong>12345678</strong></p>
          <p class="text-sm text-gray-600">用户首次登录后建议修改密码</p>
        </template>
      </el-alert>
    </el-form>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleSubmit"
          class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
        >
          {{ loading ? '创建中...' : '创建用户' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { createUser } from '@/api/user'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'success'])

// 响应式数据
const loading = ref(false)
const formRef = ref(null)

// 表单数据
const formData = reactive({
  userAccount: '',
  userName: '',
  userAvatar: '',
  userProfile: '',
  userRole: 'user'
})

// 自定义验证器
const validateUserAccount = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入用户账号'))
  } else if (value.length < 4) {
    callback(new Error('用户账号长度不能少于4位'))
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    callback(new Error('用户账号只能包含字母、数字和下划线'))
  } else {
    callback()
  }
}

// 表单验证规则
const formRules = {
  userAccount: [
    { validator: validateUserAccount, trigger: 'blur' }
  ],
  userName: [
    { max: 50, message: '用户昵称长度不能超过50个字符', trigger: 'blur' }
  ],
  userAvatar: [
    { type: 'url', message: '请输入有效的URL地址', trigger: 'blur' }
  ],
  userProfile: [
    { max: 500, message: '用户简介长度不能超过500个字符', trigger: 'blur' }
  ],
  userRole: [
    { required: true, message: '请选择用户角色', trigger: 'change' }
  ]
}

// 计算属性
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 方法
const handleClose = () => {
  visible.value = false
  resetForm()
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  Object.assign(formData, {
    userAccount: '',
    userName: '',
    userAvatar: '',
    userProfile: '',
    userRole: 'user'
  })
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    loading.value = true

    // 准备提交数据
    const submitData = {
      userAccount: formData.userAccount,
      userName: formData.userName || null,
      userAvatar: formData.userAvatar || null,
      userProfile: formData.userProfile || null,
      userRole: formData.userRole
    }

    const userId = await createUser(submitData)
    ElMessage.success(`用户创建成功，用户ID：${userId}`)
    emit('success')

  } catch (error) {
    console.error('创建用户失败:', error)
    ElMessage.error('创建用户失败')
  } finally {
    loading.value = false
  }
}

const handleAvatarError = () => {
  ElMessage.warning('头像加载失败，请检查URL地址是否正确')
}
</script>

<style scoped>
/* 自定义表单样式 */
:deep(.el-form-item__label) {
  @apply text-gray-800 font-medium;
}

:deep(.el-input__wrapper) {
  @apply border-gray-300;
}

:deep(.el-input__wrapper:hover) {
  @apply border-red-400;
}

:deep(.el-input__wrapper.is-focus) {
  @apply border-red-500;
  box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.1);
}

:deep(.el-textarea__inner) {
  @apply border-gray-300;
}

:deep(.el-textarea__inner:hover) {
  @apply border-red-400;
}

:deep(.el-textarea__inner:focus) {
  @apply border-red-500;
  box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.1);
}

/* 自定义选择器样式 */
:deep(.el-select .el-input__wrapper) {
  @apply border-gray-300;
}

:deep(.el-select .el-input__wrapper:hover) {
  @apply border-red-400;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  @apply border-red-500;
  box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.1);
}

/* 移动端适配 */
@media (max-width: 640px) {
  :deep(.el-form-item__label) {
    width: 80px !important;
  }
  
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>