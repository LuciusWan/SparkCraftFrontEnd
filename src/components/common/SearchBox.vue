<template>
  <div class="search-box">
    <!-- 基础搜索框 -->
    <div v-if="!advanced" class="flex items-center space-x-3">
      <div class="flex-1 relative">
        <el-input
          v-model="searchValue"
          :placeholder="placeholder"
          clearable
          @keyup.enter="handleSearch"
          @clear="handleClear"
          class="search-input"
        >
          <template #prefix>
            <i class="fas fa-search text-gray-400"></i>
          </template>
        </el-input>
      </div>
      
      <el-button
        type="primary"
        @click="handleSearch"
        :loading="loading"
        class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none min-w-[80px]"
      >
        <i class="fas fa-search mr-2"></i>
        搜索
      </el-button>
      
      <el-button
        v-if="showAdvancedToggle"
        @click="toggleAdvanced"
        class="min-w-[100px]"
      >
        <i class="fas fa-filter mr-2"></i>
        高级搜索
      </el-button>
    </div>

    <!-- 高级搜索框 -->
    <div v-else class="advanced-search">
      <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <i class="fas fa-filter mr-2 text-color-accent-crimson"></i>
            高级搜索
          </h3>
          <el-button
            @click="toggleAdvanced"
            size="small"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times mr-1"></i>
            收起
          </el-button>
        </div>

        <el-form
          ref="advancedFormRef"
          :model="advancedForm"
          label-width="100px"
          class="space-y-4"
        >
          <!-- 基础搜索字段 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <el-form-item
              v-for="field in searchFields"
              :key="field.key"
              :label="field.label"
              :prop="field.key"
            >
              <!-- 文本输入 -->
              <el-input
                v-if="field.type === 'text'"
                v-model="advancedForm[field.key]"
                :placeholder="field.placeholder"
                clearable
              />
              
              <!-- 选择器 -->
              <el-select
                v-else-if="field.type === 'select'"
                v-model="advancedForm[field.key]"
                :placeholder="field.placeholder"
                clearable
                class="w-full"
              >
                <el-option
                  v-for="option in field.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
              
              <!-- 日期选择器 -->
              <el-date-picker
                v-else-if="field.type === 'date'"
                v-model="advancedForm[field.key]"
                type="date"
                :placeholder="field.placeholder"
                class="w-full"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
              
              <!-- 日期范围选择器 -->
              <el-date-picker
                v-else-if="field.type === 'daterange'"
                v-model="advancedForm[field.key]"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="w-full"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
              
              <!-- 数字输入 -->
              <el-input-number
                v-else-if="field.type === 'number'"
                v-model="advancedForm[field.key]"
                :placeholder="field.placeholder"
                :min="field.min"
                :max="field.max"
                class="w-full"
              />
            </el-form-item>
          </div>

          <!-- 操作按钮 -->
          <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <el-button @click="handleReset">
              <i class="fas fa-undo mr-2"></i>
              重置
            </el-button>
            <el-button
              type="primary"
              @click="handleAdvancedSearch"
              :loading="loading"
              class="bg-color-accent-crimson hover:bg-color-accent-crimson/90 border-none"
            >
              <i class="fas fa-search mr-2"></i>
              {{ loading ? '搜索中...' : '搜索' }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 搜索历史 -->
    <div v-if="showHistory && searchHistory.length > 0" class="mt-4">
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-sm font-medium text-gray-700">搜索历史</h4>
          <el-button
            @click="clearHistory"
            size="small"
            type="text"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-trash mr-1"></i>
            清空
          </el-button>
        </div>
        <div class="flex flex-wrap gap-2">
          <el-tag
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="handleHistoryClick(item)"
            class="cursor-pointer hover:bg-color-accent-crimson hover:text-white transition-colors"
          >
            {{ item }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 搜索建议 -->
    <div v-if="showSuggestions && suggestions.length > 0" class="mt-2">
      <div class="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="handleSuggestionClick(suggestion)"
          class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center"
        >
          <i class="fas fa-search text-gray-400 mr-3"></i>
          <span class="text-gray-700">{{ suggestion }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// Props
const props = defineProps({
  // 搜索占位符
  placeholder: {
    type: String,
    default: '请输入搜索关键词'
  },
  // 是否显示高级搜索切换按钮
  showAdvancedToggle: {
    type: Boolean,
    default: true
  },
  // 高级搜索字段配置
  searchFields: {
    type: Array,
    default: () => []
  },
  // 是否显示搜索历史
  showHistory: {
    type: Boolean,
    default: true
  },
  // 是否显示搜索建议
  showSuggestions: {
    type: Boolean,
    default: false
  },
  // 搜索建议列表
  suggestions: {
    type: Array,
    default: () => []
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 历史记录存储键名
  historyKey: {
    type: String,
    default: 'search_history'
  },
  // 最大历史记录数量
  maxHistory: {
    type: Number,
    default: 10
  }
})

// Emits
const emit = defineEmits(['search', 'clear', 'reset'])

// 响应式数据
const searchValue = ref('')
const advanced = ref(false)
const advancedFormRef = ref(null)
const searchHistory = ref([])

// 高级搜索表单数据
const advancedForm = reactive({})

// 方法
const initAdvancedForm = () => {
  props.searchFields.forEach(field => {
    if (field.type === 'daterange') {
      advancedForm[field.key] = []
    } else {
      advancedForm[field.key] = field.defaultValue || ''
    }
  })
}

const toggleAdvanced = () => {
  advanced.value = !advanced.value
  if (advanced.value) {
    initAdvancedForm()
  }
}

const handleSearch = () => {
  const keyword = searchValue.value.trim()
  if (!keyword) return
  
  // 添加到搜索历史
  addToHistory(keyword)
  
  emit('search', {
    keyword,
    type: 'simple'
  })
}

const handleAdvancedSearch = () => {
  // 过滤空值
  const searchParams = {}
  Object.keys(advancedForm).forEach(key => {
    const value = advancedForm[key]
    if (value !== '' && value !== null && value !== undefined) {
      if (Array.isArray(value) && value.length === 0) {
        return
      }
      searchParams[key] = value
    }
  })
  
  emit('search', {
    params: searchParams,
    type: 'advanced'
  })
}

const handleClear = () => {
  searchValue.value = ''
  emit('clear')
}

const handleReset = () => {
  if (advancedFormRef.value) {
    advancedFormRef.value.resetFields()
  }
  initAdvancedForm()
  emit('reset')
}

const handleHistoryClick = (keyword) => {
  searchValue.value = keyword
  handleSearch()
}

const handleSuggestionClick = (suggestion) => {
  searchValue.value = suggestion
  handleSearch()
}

const addToHistory = (keyword) => {
  if (!props.showHistory) return
  
  // 移除重复项
  const index = searchHistory.value.indexOf(keyword)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  
  // 添加到开头
  searchHistory.value.unshift(keyword)
  
  // 限制数量
  if (searchHistory.value.length > props.maxHistory) {
    searchHistory.value = searchHistory.value.slice(0, props.maxHistory)
  }
  
  // 保存到本地存储
  saveHistory()
}

const loadHistory = () => {
  try {
    const history = localStorage.getItem(props.historyKey)
    if (history) {
      searchHistory.value = JSON.parse(history)
    }
  } catch (error) {
    console.error('加载搜索历史失败:', error)
  }
}

const saveHistory = () => {
  try {
    localStorage.setItem(props.historyKey, JSON.stringify(searchHistory.value))
  } catch (error) {
    console.error('保存搜索历史失败:', error)
  }
}

const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem(props.historyKey)
}

// 生命周期
onMounted(() => {
  loadHistory()
  initAdvancedForm()
})

// 监听搜索字段变化
watch(() => props.searchFields, () => {
  initAdvancedForm()
}, { deep: true })
</script>

<style scoped>
/* 自定义样式 */
.search-box {
  @apply w-full;
}

.advanced-search {
  @apply mt-4;
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

/* 自定义日期选择器样式 */
:deep(.el-date-editor .el-input__wrapper) {
  @apply border-gray-300;
}

:deep(.el-date-editor .el-input__wrapper:hover) {
  @apply border-red-400;
}

:deep(.el-date-editor .el-input__wrapper.is-focus) {
  @apply border-red-500;
  box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.1);
}

/* 自定义数字输入框样式 */
:deep(.el-input-number .el-input__wrapper) {
  @apply border-gray-300;
}

:deep(.el-input-number .el-input__wrapper:hover) {
  @apply border-red-400;
}

:deep(.el-input-number .el-input__wrapper.is-focus) {
  @apply border-red-500;
  box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.1);
}

/* 自定义表单项样式 */
:deep(.el-form-item__label) {
  @apply text-gray-800 font-medium;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .search-box {
    @apply space-y-3;
  }
  
  .flex.items-center.space-x-3 {
    @apply flex-col space-x-0 space-y-3;
  }
  
  .flex-1 {
    @apply w-full;
  }
  
  :deep(.el-form-item__label) {
    width: 80px !important;
  }
}

/* 搜索建议动画 */
.suggestions-enter-active,
.suggestions-leave-active {
  transition: all 0.3s ease;
}

.suggestions-enter-from,
.suggestions-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>