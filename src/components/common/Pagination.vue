<template>
  <div class="pagination-container">
    <!-- 移动端分页 -->
    <div class="block sm:hidden">
      <div class="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-lg">
        <div class="flex items-center text-sm text-gray-700">
          <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        </div>
        <div class="flex items-center space-x-2">
          <el-button
            size="small"
            :disabled="currentPage <= 1"
            @click="handlePrevPage"
            class="min-w-[60px]"
          >
            <i class="fas fa-chevron-left mr-1"></i>
            上一页
          </el-button>
          <el-button
            size="small"
            :disabled="currentPage >= totalPages"
            @click="handleNextPage"
            class="min-w-[60px]"
          >
            下一页
            <i class="fas fa-chevron-right ml-1"></i>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 桌面端分页 -->
    <div class="hidden sm:block">
      <div class="flex items-center justify-between bg-white px-6 py-4 border border-gray-200 rounded-lg">
        <!-- 左侧信息 -->
        <div class="flex items-center text-sm text-gray-700">
          <span>
            显示第 {{ startItem }} - {{ endItem }} 条，共 {{ total }} 条记录
          </span>
          <div class="ml-6 flex items-center space-x-2">
            <span>每页显示：</span>
            <el-select
              :model-value="pageSize"
              @update:model-value="handlePageSizeChange"
              size="small"
              class="w-20"
            >
              <el-option
                v-for="size in pageSizeOptions"
                :key="size"
                :label="size"
                :value="size"
              />
            </el-select>
            <span>条</span>
          </div>
        </div>

        <!-- 右侧分页器 -->
        <div class="flex items-center space-x-2">
          <!-- 首页 -->
          <el-button
            size="small"
            :disabled="currentPage <= 1"
            @click="handlePageChange(1)"
            class="min-w-[36px] h-9"
          >
            <i class="fas fa-angle-double-left"></i>
          </el-button>

          <!-- 上一页 -->
          <el-button
            size="small"
            :disabled="currentPage <= 1"
            @click="handlePrevPage"
            class="min-w-[36px] h-9"
          >
            <i class="fas fa-chevron-left"></i>
          </el-button>

          <!-- 页码 -->
          <div class="flex items-center space-x-1">
            <!-- 第一页 -->
            <button
              v-if="showFirstPage"
              @click="handlePageChange(1)"
              :class="[
                'min-w-[36px] h-9 px-3 text-sm border rounded-md transition-colors',
                currentPage === 1
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              ]"
            >
              1
            </button>

            <!-- 左侧省略号 -->
            <span v-if="showLeftEllipsis" class="px-2 text-gray-500">...</span>

            <!-- 中间页码 -->
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="handlePageChange(page)"
              :class="[
                'min-w-[36px] h-9 px-3 text-sm border rounded-md transition-colors',
                currentPage === page
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>

            <!-- 右侧省略号 -->
            <span v-if="showRightEllipsis" class="px-2 text-gray-500">...</span>

            <!-- 最后一页 -->
            <button
              v-if="showLastPage"
              @click="handlePageChange(totalPages)"
              :class="[
                'min-w-[36px] h-9 px-3 text-sm border rounded-md transition-colors',
                currentPage === totalPages
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ totalPages }}
            </button>
          </div>

          <!-- 下一页 -->
          <el-button
            size="small"
            :disabled="currentPage >= totalPages"
            @click="handleNextPage"
            class="min-w-[36px] h-9"
          >
            <i class="fas fa-chevron-right"></i>
          </el-button>

          <!-- 末页 -->
          <el-button
            size="small"
            :disabled="currentPage >= totalPages"
            @click="handlePageChange(totalPages)"
            class="min-w-[36px] h-9"
          >
            <i class="fas fa-angle-double-right"></i>
          </el-button>

          <!-- 跳转到指定页 -->
          <div class="flex items-center space-x-2 ml-4">
            <span class="text-sm text-gray-700">跳转到</span>
            <el-input
              v-model="jumpPage"
              size="small"
              class="w-16"
              @keyup.enter="handleJumpPage"
              @blur="handleJumpPage"
            />
            <span class="text-sm text-gray-700">页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  // 当前页码
  currentPage: {
    type: Number,
    default: 1
  },
  // 每页显示条数
  pageSize: {
    type: Number,
    default: 10
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  // 每页显示条数选项
  pageSizeOptions: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  // 显示的页码按钮数量
  pagerCount: {
    type: Number,
    default: 7
  }
})

// Emits
const emit = defineEmits(['update:currentPage', 'update:pageSize', 'change'])

// 响应式数据
const jumpPage = ref('')

// 计算属性
const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

const startItem = computed(() => {
  return props.total === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1
})

const endItem = computed(() => {
  const end = props.currentPage * props.pageSize
  return end > props.total ? props.total : end
})

// 计算可见的页码
const visiblePages = computed(() => {
  const current = props.currentPage
  const total = totalPages.value
  const pagerCount = props.pagerCount
  
  if (total <= pagerCount) {
    // 总页数小于等于显示页数，显示所有页码
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  const half = Math.floor(pagerCount / 2)
  let start = current - half
  let end = current + half
  
  if (start < 1) {
    start = 1
    end = pagerCount
  }
  
  if (end > total) {
    end = total
    start = total - pagerCount + 1
  }
  
  // 如果显示第一页，则从第二页开始
  if (start === 1) {
    start = 2
  }
  
  // 如果显示最后一页，则到倒数第二页结束
  if (end === total) {
    end = total - 1
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const showFirstPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(1)
})

const showLastPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(totalPages.value)
})

const showLeftEllipsis = computed(() => {
  return showFirstPage.value && visiblePages.value[0] > 2
})

const showRightEllipsis = computed(() => {
  return showLastPage.value && visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1
})

// 方法
const handlePageChange = (page) => {
  if (page < 1 || page > totalPages.value || page === props.currentPage) {
    return
  }
  
  emit('update:currentPage', page)
  emit('change', {
    currentPage: page,
    pageSize: props.pageSize
  })
}

const handlePrevPage = () => {
  handlePageChange(props.currentPage - 1)
}

const handleNextPage = () => {
  handlePageChange(props.currentPage + 1)
}

const handlePageSizeChange = (newPageSize) => {
  emit('update:pageSize', newPageSize)
  emit('change', {
    currentPage: 1, // 改变页面大小时重置到第一页
    pageSize: newPageSize
  })
}

const handleJumpPage = () => {
  const page = parseInt(jumpPage.value)
  if (isNaN(page) || page < 1 || page > totalPages.value) {
    jumpPage.value = ''
    return
  }
  
  handlePageChange(page)
  jumpPage.value = ''
}

// 监听当前页变化，清空跳转输入框
watch(() => props.currentPage, () => {
  jumpPage.value = ''
})
</script>

<style scoped>
/* 自定义样式 */
.pagination-container {
  @apply mt-6;
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

/* 自定义输入框样式 */
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

/* 按钮悬停效果 */
button:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

button:active {
  transform: translateY(0);
}

/* 移动端优化 */
@media (max-width: 640px) {
  .pagination-container {
    @apply mt-4;
  }
}
</style>