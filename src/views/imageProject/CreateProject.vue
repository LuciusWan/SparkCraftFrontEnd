<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <i class="fas fa-palette text-blue-600 mr-2"></i>
              SparkCraft
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">欢迎回来</span>
            <button @click="handleLogout" class="text-gray-500 hover:text-gray-700 transition-colors">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          创建你的AI创作项目
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          通过简单的描述，让AI帮你生成精美的创意作品
        </p>
      </div>

      <!-- 创建表单 -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- 表单头部 -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 class="text-2xl font-semibold text-white flex items-center">
            <i class="fas fa-magic mr-3"></i>
            开始你的创作之旅
          </h2>
          <p class="text-blue-100 mt-2">填写项目信息，开启AI创作体验</p>
        </div>

        <!-- 表单内容 -->
        <div class="p-8">
          <el-form
            ref="createFormRef"
            :model="formData"
            :rules="formRules"
            label-position="top"
            class="space-y-8"
          >
            <!-- 项目名称 -->
            <el-form-item label="项目名称" prop="projectName" class="mb-8">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  给你的项目起个名字
                </label>
                <el-input
                  v-model="formData.projectName"
                  placeholder="例如：我的第一个AI作品"
                  size="large"
                  class="w-full"
                  maxlength="50"
                  show-word-limit
                >
                  <template #prefix>
                    <i class="fas fa-tag text-gray-400"></i>
                  </template>
                </el-input>
                <p class="text-sm text-gray-500">
                  项目名称将帮助你更好地管理和识别你的创作
                </p>
              </div>
            </el-form-item>

            <!-- 初始提示词 -->
            <el-form-item label="创作描述" prop="projectDesc" class="mb-8">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  描述你想要创作的内容
                </label>
                <el-input
                  v-model="formData.projectDesc"
                  type="textarea"
                  :rows="6"
                  placeholder="例如：一只可爱的猫咪，戴着一顶小帽子，坐在草地上，背景是樱花飞舞的春天..."
                  maxlength="500"
                  show-word-limit
                  class="w-full"
                />
                <div class="flex items-start space-x-2 text-sm text-gray-500">
                  <i class="fas fa-lightbulb text-yellow-500 mt-0.5"></i>
                  <div>
                    <p class="font-medium">创作提示：</p>
                    <ul class="list-disc list-inside space-y-1 mt-1">
                      <li>详细描述主体对象（人物、动物、物品等）</li>
                      <li>添加环境背景和氛围描述</li>
                      <li>指定艺术风格（水彩、油画、卡通等）</li>
                      <li>描述色彩搭配和光线效果</li>
                    </ul>
                  </div>
                </div>
              </div>
            </el-form-item>

            <!-- 示例卡片 -->
            <div class="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-star text-yellow-500 mr-2"></i>
                创作示例
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="example in examples" 
                  :key="example.id"
                  @click="useExample(example)"
                  class="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {{ example.name }}
                  </h4>
                  <p class="text-sm text-gray-600 mt-2 line-clamp-3">
                    {{ example.desc }}
                  </p>
                  <div class="mt-3 flex items-center text-xs text-blue-600">
                    <i class="fas fa-mouse-pointer mr-1"></i>
                    点击使用此示例
                  </div>
                </div>
              </div>
            </div>

            <!-- 提交按钮 -->
            <div class="flex justify-center pt-6">
              <el-button
                type="primary"
                size="large"
                @click="handleSubmit"
                :loading="loading"
                class="px-12 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:from-blue-700 hover:to-purple-700"
              >
                <i class="fas fa-rocket mr-2"></i>
                {{ loading ? '创建中...' : '开始创作' }}
              </el-button>
            </div>
          </el-form>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="text-center mt-12 text-gray-500">
        <p class="text-sm">
          创建项目后，你将进入AI对话界面，可以进一步完善你的创作想法
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { createImageProject } from '@/api/imageProject'

const router = useRouter()
const store = useStore()

// 表单数据
const formData = reactive({
  projectName: '',
  projectDesc: ''
})

// 表单验证规则
const formRules = {
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 2, max: 50, message: '项目名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  projectDesc: [
    { required: true, message: '请输入创作描述', trigger: 'blur' },
    { min: 10, max: 500, message: '创作描述长度在 10 到 500 个字符', trigger: 'blur' }
  ]
}

// 表单引用
const createFormRef = ref()

// 使用 Vuex store 的 loading 状态
const loading = computed(() => store.state.app.loading)

// 示例数据
const examples = [
  {
    id: 1,
    name: '可爱动物插画',
    desc: '一只穿着小裙子的兔子，在花园里采花，水彩画风格，温暖的阳光透过树叶洒下来，色彩柔和清新'
  },
  {
    id: 2,
    name: '未来科技场景',
    desc: '未来城市的夜景，霓虹灯闪烁，飞行汽车在空中穿梭，赛博朋克风格，蓝紫色调为主'
  },
  {
    id: 3,
    name: '中国风山水',
    desc: '水墨画风格的山水画，远山如黛，近水如镜，一叶扁舟在湖心，意境深远，黑白灰色调'
  },
  {
    id: 4,
    name: '梦幻星空',
    desc: '璀璨的星空下，一个小女孩坐在山顶看星星，银河清晰可见，流星划过天际，梦幻唯美风格'
  }
]

// 使用示例
const useExample = (example) => {
  formData.projectName = example.name
  formData.projectDesc = example.desc
  ElMessage.success('已应用示例内容')
}

// 提交表单
const handleSubmit = async () => {
  try {
    // 表单验证
    await createFormRef.value.validate()
    
    // 调用创建项目API
    const projectId = await createImageProject({
      projectName: formData.projectName,
      projectDesc: formData.projectDesc
    })
    
    ElMessage.success('项目创建成功！')
    
    // 跳转到聊天界面，传递项目ID
    router.push({
      name: 'ai-chat',
      params: {
        projectId: projectId
      },
      query: {
        projectName: formData.projectName,
        initialPrompt: formData.projectDesc
      }
    })
  } catch (error) {
    console.error('创建项目失败:', error)
    ElMessage.error('创建失败，请检查网络连接')
  }
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
</script>

<style scoped>
/* 自定义样式 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Element Plus 组件样式覆盖 */
:deep(.el-form-item__label) {
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  border-color: #3b82f6;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.el-textarea__inner) {
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  resize: vertical;
}

:deep(.el-textarea__inner:hover) {
  border-color: #3b82f6;
}

:deep(.el-textarea__inner:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.el-button--primary) {
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

:deep(.el-button--primary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}
</style>