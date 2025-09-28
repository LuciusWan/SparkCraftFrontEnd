<template>
  <el-dialog
    v-model="visible"
    title="用户详情"
    width="90%"
    :style="{ maxWidth: '600px' }"
    center
    @close="handleClose"
  >
    <div v-if="user" class="user-detail">
      <!-- 用户基本信息 -->
      <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
        <el-avatar
          :src="user.userAvatar"
          :size="80"
          class="flex-shrink-0"
        >
          <i class="fas fa-user text-2xl"></i>
        </el-avatar>
        
        <div class="flex-1 text-center sm:text-left">
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            {{ user.userName || user.userAccount }}
          </h2>
          <el-tag
            :type="user.userRole === 'admin' ? 'danger' : 'primary'"
            size="large"
          >
            {{ user.userRole === 'admin' ? '管理员' : '普通用户' }}
          </el-tag>
        </div>
      </div>

      <!-- 详细信息 -->
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="info-item">
            <label class="info-label">用户ID</label>
            <div class="info-value">{{ user.id }}</div>
          </div>

          <div class="info-item">
            <label class="info-label">用户账号</label>
            <div class="info-value">{{ user.userAccount }}</div>
          </div>

          <div class="info-item">
            <label class="info-label">用户昵称</label>
            <div class="info-value">{{ user.userName || '-' }}</div>
          </div>

          <div class="info-item">
            <label class="info-label">用户角色</label>
            <div class="info-value">
              <el-tag
                :type="user.userRole === 'admin' ? 'danger' : 'primary'"
                size="small"
              >
                {{ user.userRole === 'admin' ? '管理员' : '普通用户' }}
              </el-tag>
            </div>
          </div>

          <div class="info-item">
            <label class="info-label">创建时间</label>
            <div class="info-value">{{ formatDate(user.createTime) }}</div>
          </div>

          <div class="info-item">
            <label class="info-label">更新时间</label>
            <div class="info-value">{{ formatDate(user.updateTime) }}</div>
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">用户简介</label>
          <div class="info-value">
            {{ user.userProfile || '暂无简介' }}
          </div>
        </div>

        <div class="info-item">
          <label class="info-label">头像地址</label>
          <div class="info-value break-all">
            {{ user.userAvatar || '暂无头像' }}
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="handleClose">关闭</el-button>
        <el-button
          type="primary"
          @click="handleEdit"
          class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
        >
          编辑用户
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

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
const emit = defineEmits(['update:modelValue', 'edit'])

// 计算属性
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 方法
const handleClose = () => {
  visible.value = false
}

const handleEdit = () => {
  emit('edit', props.user)
  handleClose()
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<style scoped>
.info-item {
  @apply bg-gray-50 rounded-lg p-4;
}

.info-label {
  @apply block text-sm font-medium text-gray-600 mb-2;
}

.info-value {
  @apply text-gray-800 font-medium;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>