<template>
  <el-dialog
    v-model="visible"
    title="编辑用户"
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
        <el-form-item label="用户ID" class="sm:col-span-2">
          <el-input
            v-model="formData.id"
            disabled
            class="bg-gray-50"
          />
        </el-form-item>

        <el-form-item label="用户账号" class="sm:col-span-2">
          <el-input
            v-model="formData.userAccount"
            disabled
            class="bg-gray-50"
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
            placeholder="请输入头像URL地址"
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
          placeholder="请输入用户简介"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
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
          {{ loading ? '保存中...' : '保存' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateUser } from '@/api/user'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'success'])

// 响应式数据
const loading = ref(false)
const formRef = ref(null)

// 表单数据
const formData = reactive({
  id: '',
  userAccount: '',
  userName: '',
  userAvatar: '',
  userProfile: '',
  userRole: 'user'
})

// 表单验证规则
const formRules = {
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

// 监听用户数据变化
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      Object.assign(formData, {
        id: newUser.id,
        userAccount: newUser.userAccount,
        userName: newUser.userName || '',
        userAvatar: newUser.userAvatar || '',
        userProfile: newUser.userProfile || '',
        userRole: newUser.userRole || 'user'
      })
    }
  },
  { immediate: true }
)

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
    id: '',
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
      id: formData.id,
      userName: formData.userName || null,
      userAvatar: formData.userAvatar || null,
      userProfile: formData.userProfile || null,
      userRole: formData.userRole
    }

    await updateUser(submitData)
    ElMessage.success('用户信息更新成功')
    emit('success')

  } catch (error) {
    console.error('更新用户失败:', error)
    ElMessage.error('更新用户失败')
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