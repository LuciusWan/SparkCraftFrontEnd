<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <button 
              @click="goBack" 
              class="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <i class="fas fa-arrow-left text-lg"></i>
            </button>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">
                {{ projectName || '创作项目' }}
              </h1>
              <p class="text-sm text-gray-500">AI创作助手</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AI助手在线</span>
            </div>
            <button @click="handleLogout" class="text-gray-500 hover:text-gray-700 transition-colors">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 聊天内容区域 -->
    <div class="flex-1 flex overflow-hidden">
      <!-- 主聊天区域 -->
      <div class="flex-1 flex flex-col">
        <!-- 消息列表 -->
        <div 
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <!-- 欢迎消息 -->
          <div v-if="messages.length === 0" class="text-center py-12">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-robot text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                欢迎来到AI创作助手
              </h3>
              <p class="text-gray-600 mb-4">
                我是你的专属AI创作助手，可以帮你完善创作想法、提供灵感建议
              </p>
              <div class="bg-blue-50 rounded-xl p-4 text-left">
                <p class="text-sm font-medium text-blue-900 mb-2">你的初始创作想法：</p>
                <p class="text-blue-800 italic">{{ initialPrompt }}</p>
              </div>
              <p class="text-sm text-gray-500 mt-4">
                开始对话，让我们一起完善你的创作吧！
              </p>
            </div>
          </div>

          <!-- 消息列表 -->
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="flex"
            :class="message.type === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- AI消息 -->
            <div 
              v-if="message.type === 'ai'"
              class="flex items-start space-x-3 max-w-4xl"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-white text-sm"></i>
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md shadow-sm border border-gray-100 p-4 flex-1">
                <MarkdownRenderer :content="message.content" />
                <div class="text-xs text-gray-400 mt-2">
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>
            </div>

            <!-- 工作流结果消息 -->
            <div 
              v-else-if="message.type === 'workflow'"
              class="flex items-start space-x-3 max-w-full"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-cogs text-white text-sm"></i>
              </div>
              <div class="flex-1">
                <WorkflowResult :result="message.content" />
                <div class="text-xs text-gray-400 mt-2 ml-2">
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>
            </div>

            <!-- 用户消息 -->
            <div 
              v-else
              class="flex items-start space-x-3 max-w-2xl"
            >
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rounded-tr-md shadow-sm p-4 text-white">
                <div>{{ message.content }}</div>
                <div class="text-xs text-blue-100 mt-2">
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-user text-gray-600 text-sm"></i>
              </div>
            </div>
          </div>

          <!-- AI正在输入指示器 -->
          <div 
            v-if="isAITyping"
            class="flex items-start space-x-3 max-w-4xl"
          >
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-robot text-white text-sm"></i>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-md shadow-sm border border-gray-100 p-4">
              <div class="flex items-center space-x-2">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <span class="text-sm text-gray-500">AI正在思考...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="bg-white border-t border-gray-200 p-4 flex-shrink-0">
          <div class="max-w-4xl mx-auto">
            <div class="flex items-end space-x-4">
              <div class="flex-1">
                <el-input
                  v-model="inputMessage"
                  type="textarea"
                  :rows="1"
                  :autosize="{ minRows: 1, maxRows: 4 }"
                  placeholder="输入你的想法或问题..."
                  @keydown.enter.exact.prevent="handleSendMessage"
                  @keydown.enter.shift.exact="handleNewLine"
                  :disabled="isAITyping"
                  class="w-full"
                />
                <div class="flex justify-between items-center mt-2">
                  <div class="text-xs text-gray-400">
                    按 Enter 发送，Shift + Enter 换行
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ inputMessage.length }}/500
                  </div>
                </div>
              </div>
              <div class="flex space-x-3">
                <el-button
                  type="success"
                  @click="handleStartWorkflow"
                  :disabled="isWorkflowRunning"
                  :loading="isWorkflowRunning"
                  size="large"
                  class="px-6 bg-gradient-to-r from-green-500 to-emerald-600 border-0 hover:from-green-600 hover:to-emerald-700"
                >
                  <i class="fas fa-play mr-2"></i>
                  开始工作
                </el-button>
                <el-button
                  type="primary"
                  @click="handleSendMessage"
                  :disabled="!inputMessage.trim() || isAITyping"
                  :loading="isAITyping"
                  size="large"
                  class="px-6"
                >
                  <i class="fas fa-paper-plane mr-2"></i>
                  发送
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧信息面板 -->
      <div class="w-80 bg-white border-l border-gray-200 flex-shrink-0 hidden lg:block">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">项目信息</h3>
          
          <!-- 项目详情 -->
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-xl p-4">
              <h4 class="font-medium text-gray-900 mb-2">项目名称</h4>
              <p class="text-gray-700">{{ projectName }}</p>
            </div>
            
            <div class="bg-gray-50 rounded-xl p-4">
              <h4 class="font-medium text-gray-900 mb-2">初始创作想法</h4>
              <p class="text-gray-700 text-sm leading-relaxed">{{ initialPrompt }}</p>
            </div>
            
            <div class="bg-gray-50 rounded-xl p-4">
              <h4 class="font-medium text-gray-900 mb-2">对话统计</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">消息数量</span>
                  <span class="font-medium">{{ messages.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">创建时间</span>
                  <span class="font-medium">{{ formatTime(Date.now()) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 快捷操作 -->
          <div class="mt-6">
            <h4 class="font-medium text-gray-900 mb-3">快捷操作</h4>
            <div class="space-y-2">
              <button 
                @click="addQuickMessage('请帮我完善这个创作想法')"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i class="fas fa-lightbulb mr-2 text-yellow-500"></i>
                完善创作想法
              </button>
              <button 
                @click="addQuickMessage('这个创作可以用什么艺术风格？')"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i class="fas fa-palette mr-2 text-blue-500"></i>
                推荐艺术风格
              </button>
              <button 
                @click="addQuickMessage('请给我一些色彩搭配建议')"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i class="fas fa-fill-drip mr-2 text-purple-500"></i>
                色彩搭配建议
              </button>
              <button 
                @click="addQuickMessage('这个创作适合什么尺寸和比例？')"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i class="fas fa-expand-arrows-alt mr-2 text-green-500"></i>
                尺寸比例建议
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { createAIChatStream, executeWorkflow } from '@/api/imageProject'
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue'
import WorkflowResult from '@/components/common/WorkflowResult.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

// 页面数据
const projectId = ref(route.params.projectId)
const projectName = ref(route.query.projectName || '创作项目')
const initialPrompt = ref(route.query.initialPrompt || '')

// 消息相关
const messages = reactive([])
const inputMessage = ref('')
const isAITyping = ref(false)
const messagesContainer = ref()
const currentEventSource = ref(null)

// 当前AI消息（用于流式接收）
const currentAIMessage = ref('')

// 工作流相关
const isWorkflowRunning = ref(false)
const workflowResult = ref(null)



// 格式化时间
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 添加快捷消息
const addQuickMessage = (message) => {
  inputMessage.value = message
}

// 处理换行
const handleNewLine = () => {
  inputMessage.value += '\n'
}

// 发送消息的通用函数
const sendMessage = async (message) => {
  if (!message || isAITyping.value) return

  // 添加用户消息
  messages.push({
    type: 'user',
    content: message,
    timestamp: Date.now()
  })
  
  // 滚动到底部
  scrollToBottom()

  // 开始AI回复
  isAITyping.value = true
  currentAIMessage.value = ''

  try {
    // 创建SSE连接
    currentEventSource.value = createAIChatStream(
      {
        imageProjectId: projectId.value,
        message: message
      },
      // onMessage 回调
      (content) => {
        currentAIMessage.value += content
        
        // AI开始输出文本时立即隐藏"正在思考"状态
        if (isAITyping.value) {
          isAITyping.value = false
        }
        
        // 更新或添加AI消息
        const lastMessage = messages[messages.length - 1]
        if (lastMessage && lastMessage.type === 'ai' && lastMessage.isStreaming) {
          lastMessage.content = currentAIMessage.value
        } else {
          messages.push({
            type: 'ai',
            content: currentAIMessage.value,
            timestamp: Date.now(),
            isStreaming: true
          })
        }
        
        scrollToBottom()
      },
      // onEnd 回调
      () => {
        // 标记消息流式接收完成
        const lastMessage = messages[messages.length - 1]
        if (lastMessage && lastMessage.type === 'ai') {
          lastMessage.isStreaming = false
        }
        
        currentAIMessage.value = ''
        scrollToBottom()
      },
      // onError 回调
      (error) => {
        console.error('AI对话出错:', error)
        isAITyping.value = false
        ElMessage.error('AI对话出现问题，请重试')
        
        // 移除可能的不完整消息
        const lastMessage = messages[messages.length - 1]
        if (lastMessage && lastMessage.type === 'ai' && lastMessage.isStreaming) {
          messages.pop()
        }
      }
    )
  } catch (error) {
    console.error('发送消息失败:', error)
    isAITyping.value = false
    ElMessage.error('发送消息失败，请重试')
  }
}

// 发送用户输入的消息
const handleSendMessage = async () => {
  const message = inputMessage.value.trim()
  if (!message) return

  // 清空输入框
  inputMessage.value = ''
  
  // 发送消息
  await sendMessage(message)
}

// 发送初始创作想法
const sendInitialPrompt = async () => {
  if (!initialPrompt.value || !initialPrompt.value.trim()) return
  
  // 发送初始创作想法
  await sendMessage(initialPrompt.value.trim())
}

// 开始工作流执行
const handleStartWorkflow = async () => {
  if (isWorkflowRunning.value) return
  
  try {
    isWorkflowRunning.value = true
    ElMessage.info('正在启动工作流，请稍候...')
    
    // 准备请求数据
    const requestData = {
      imageProjectId: projectId.value,
      originalPrompt: messages.length > 0 
        ? messages.filter(msg => msg.type === 'user').slice(-1)[0]?.content || '请根据我们的对话内容设计文创产品'
        : '请设计一款文创产品',
      async: false
    }
    
    // 显示处理中的提示
    ElMessage({
      message: '工作流正在处理中，这可能需要几分钟时间，请耐心等待...',
      type: 'info',
      duration: 0, // 不自动关闭
      showClose: true
    })
    
    // 调用工作流执行API
    const data = await executeWorkflow(requestData)
    
    // 关闭所有消息提示
    ElMessage.closeAll()
    
    // 响应拦截器已经处理了状态码，直接使用返回的数据
    workflowResult.value = data
    ElMessage.success('工作流执行成功！')
    
    // 将工作流结果添加到消息列表中
    messages.push({
      id: Date.now(),
      type: 'workflow',
      content: data,
      timestamp: new Date().toLocaleTimeString()
    })
    
    // 滚动到底部
    await nextTick()
    scrollToBottom()
  } catch (error) {
    console.error('工作流执行失败:', error)
    
    // 根据错误类型提供不同的提示信息
    let errorMessage = '工作流执行失败，请重试'
    
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      errorMessage = '工作流处理时间较长，请稍后查看结果或重新尝试'
    } else if (error.response) {
      // 服务器响应错误
      errorMessage = error.response.data?.message || `服务器错误 (${error.response.status})`
    } else if (error.request) {
      // 网络错误
      errorMessage = '网络连接失败，请检查网络后重试'
    } else {
      // 其他错误
      errorMessage = error.message || '未知错误，请重试'
    }
    
    ElMessage.error(errorMessage)
  } finally {
    isWorkflowRunning.value = false
  }
}

// 返回上一页
const goBack = () => {
  router.push('/imageProject/create')
}

// 退出登录
const handleLogout = async () => {
  try {
    await store.dispatch('user/logout')
    router.push('/auth/login')
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}

// 组件挂载
onMounted(() => {
  // 验证项目ID
  if (!projectId.value) {
    ElMessage.error('项目ID不存在，请重新创建项目')
    router.push('/imageProject/create')
    return
  }
  
  console.log('AI聊天界面已加载，项目ID:', projectId.value)
  
  // 如果有初始创作想法，自动发送给AI
  if (initialPrompt.value && initialPrompt.value.trim()) {
    // 延迟一下确保界面完全加载
    setTimeout(() => {
      sendInitialPrompt()
    }, 500)
  }
})

// 组件卸载时清理资源
onUnmounted(() => {
  if (currentEventSource.value) {
    currentEventSource.value.close()
  }
})
</script>

<style scoped>
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 消息动画 */
.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* Element Plus 样式覆盖 */
:deep(.el-textarea__inner) {
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  resize: none;
}

:deep(.el-textarea__inner:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.el-button--primary) {
  border-radius: 12px;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .w-80 {
    display: none;
  }
}
</style>