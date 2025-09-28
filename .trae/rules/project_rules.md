# 通用前端开发 Cursor Rules

## 项目概述
- 专注于现代化前端开发，使用 Vue 3 生态系统
- 采用组件化架构，注重用户体验和代码可维护性
- 支持多角色权限系统和响应式设计

## 技术栈偏好

### 核心框架
- **Vue 3** - 使用 Composition API 作为主要开发模式
- **Vite** - 作为构建工具和开发服务器
- **Vue Router** - 用于单页应用路由管理
- **Vuex** - 状态管理（简单状态结构）

### UI 框架与样式
- **Element Plus** - 主要 UI 组件库
- **Tailwind CSS** - 原子化 CSS 框架，用于快速样式开发
- **Font Awesome** - 图标库
- 支持响应式设计（mobile-first 方法）

### 开发工具
- **Axios** - HTTP 请求库
- **Mock.js** - 开发阶段数据模拟
- **ESLint** - 代码质量检查

## 代码风格规范

### Vue 组件结构
```vue
<template>
  <!-- 使用语义化的 HTML 结构 -->
  <!-- 优先使用 Tailwind CSS 类名 -->
  <!-- Element Plus 组件采用 el- 前缀 -->
</template>

<script setup>
// 优先使用 Composition API
// 导入顺序：Vue -> 第三方库 -> 本地模块
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

// 响应式数据定义
const loading = ref(false)
const formData = reactive({})

// 方法定义
const handleSubmit = async () => {
  // 异步操作使用 async/await
}

// 生命周期
onMounted(() => {
  // 组件挂载后的逻辑
})
</script>

<style scoped>
/* 优先使用 Tailwind，必要时添加自定义样式 */
</style>
```

### 命名规范
- **文件名**: kebab-case (如: `course-selection.vue`)
- **组件名**: PascalCase (如: `CourseSelection`)
- **变量/函数**: camelCase (如: `loadStudentData`)
- **常量**: UPPER_SNAKE_CASE (如: `API_BASE_URL`)
- **CSS类名**: kebab-case 或 Tailwind 原子类

### 函数与方法
- 优先使用箭头函数
- 异步操作使用 `async/await` 而非 Promise.then()
- 函数名使用动词开头，描述性强 (如: `loadData`, `handleSubmit`, `formatDate`)
- 工具函数使用 PascalCase (如: `HaveStringPropertiesEmpty`)

### 状态管理
- 简单状态使用 `ref()` 和 `reactive()`
- 复杂状态使用 Vuex store
- Store 结构保持简洁，避免过度嵌套

### HTTP 请求
- 统一使用封装的 request 实例
- 请求拦截器处理 token 和通用配置
- 响应拦截器统一处理错误和消息提示

### 错误处理
- 使用 `try-catch` 包装异步操作
- 用户友好的错误提示使用 `ElMessage.error()`
- 控制台输出详细错误信息用于调试

### 路由组织
- 按功能模块分组路由
- 使用嵌套路由配合 Layout 组件
- 路由名称采用 `模块-页面` 格式 (如: `student-course-selection`)
- 懒加载所有页面组件

## 开发规范

### 组件开发
- 单一职责原则，组件功能明确
- 合理使用 props 和 emit 进行父子组件通信
- 使用 `<script setup>` 语法糖
- 样式优先使用 Tailwind CSS 原子类

### 数据处理
- 表单数据使用 `reactive()` 包装
- 列表数据使用 `ref([])` 
- 加载状态使用 `loading` 变量控制
- 数据格式化函数独立定义

### UI/UX 设计

#### 整体设计理念
- **项目定位**：中国风文创平台，展示中国艺术，弘扬国风文化
- **目标用户**：对文创、中国艺术和传统中式美学感兴趣的用户
- **设计目标**：提供现代化、艺术化的用户体验，唤起对中华文化的敬畏与探索欲

#### 视觉风格规范

##### 1. 整体美学风格
- **设计风格**：手绘水彩风格，配合水墨背景，模拟传统中国画笔触
- **布局理念**：简洁的模块化网格，呼应竹节的韵律感
- **视觉效果**：使用微妙的滚动视差效果，营造纸页翻动的感觉
- **材质纹理**：
  - 背景使用高分辨率纸质纹理（宣纸、羊皮纸）
  - 添加淡雅的竹纹或丝绸纹理叠加，增加层次感
  - 所有纹理素材使用版权免费资源

##### 2. 字体规范
- **中文标题字体**：免费中文书法字体（如"ZYSong"）用于标题和重要文字
- **英文/数字字体**：现代无衬线字体（如"Inter"）用于正文内容
- **字体加载**：确保所有字体从免费字体服务加载
- **字体层级**：
  ```css
  /* 主标题 */
  .title-primary { font-family: 'ZYSong', serif; font-size: 2.5rem; }
  /* 副标题 */
  .title-secondary { font-family: 'ZYSong', serif; font-size: 1.8rem; }
  /* 正文 */
  .text-body { font-family: 'Inter', sans-serif; font-size: 1rem; }
  ```

##### 3. 配色方案
- **主色调**：柔和的大地色系
  - 哑光赤陶色 `#D2B48C`
  - 鼠尾草绿 `#9CAF88`
  - 浅炭灰色 `#708090`
- **强调色**：用于交互元素、悬停状态和行动按钮
  - 深红色 `#DC143C`
  - 金色 `#FFD700`
- **对比色**：确保符合WCAG AA无障碍标准
  - 深炭灰文字 `#2F4F4F` 配合奶白色背景 `#FFF8DC`
  - 白色文字 `#FFFFFF` 配合深色强调背景
- **色彩变量定义**：
  ```css
  :root {
    --color-primary-terracotta: #D2B48C;
    --color-primary-sage: #9CAF88;
    --color-primary-charcoal: #708090;
    --color-accent-crimson: #DC143C;
    --color-accent-gold: #FFD700;
    --color-text-dark: #2F4F4F;
    --color-text-light: #FFFFFF;
    --color-bg-cream: #FFF8DC;
  }
  ```

#### UI组件设计规范

##### 1. 导航组件
- **顶部导航栏**：粘性定位，包含logo（风格化中文字符）和菜单链接
- **菜单项**：Home、About、Gallery、Shop、Contact
- **悬停效果**：显示微妙的毛笔描边下划线动画
- **移动端**：底部导航栏，包含图标（首页、搜索、购物车、个人、设置）

##### 2. 英雄区域
- **布局**：全宽横幅，使用中国风景或艺术作品高分辨率图片
- **图片来源**：Unsplash/Pexels等免费图片服务
- **叠加效果**：半透明渐变叠加，突出书法风格标题
- **响应式**：桌面端1440×1024，移动端iPhone 15 Pro尺寸(390×844px)

##### 3. 画廊组件
- **缩略图网格**：悬停时"放大"效果
- **模态窗口**：点击打开大图，包含中文描述和竹卷轴风格的"上一张/下一张"按钮
- **筛选器**：侧边栏筛选，包含"媒介"（绘画、雕塑、陶艺）和"时期"（古代、明清、现代）
- **切换开关**：羊皮纸剪切风格

##### 4. 产品卡片
- **商店区域**：每张卡片显示艺术品图片、标题、价格和"加入购物车"按钮
- **按钮样式**：使用金色强调色，点击时轻微摆动效果
- **卡片布局**：圆角阴影，符合卡片式设计理念

##### 5. 页脚组件
- **内容**：社交链接（FontAwesome图标）、版权声明
- **回到顶部**：小型卷轴图标，带纸张波纹效果

#### 交互与动画规范

##### 1. 悬停效果
- **墨水稀释淡化**：元素悬停时的淡入淡出效果
- **毛笔描边下划线**：菜单项和链接的悬停效果
- **按钮轻微波纹**：点击按钮时的反馈效果

##### 2. 滚动动画
- **元素进入**：从左右滑入，使用模拟纸张移动的缓动效果
- **视差滚动**：背景元素的微妙移动，营造层次感

##### 3. 微交互
- **购物车动画**：添加商品时，小卷轴图标滑入购物车图标徽章
- **页面转换**：桌面和移动端布局间的平滑过渡

#### 响应式设计标准
- 响应式设计，支持移动端
- 使用渐变背景和毛玻璃效果
- 卡片式布局，圆角和阴影
- 图标 + 文字的按钮设计
- 状态标签使用不同颜色区分
- **设备适配**：
  - 桌面端：1440×1024视图，带有微妙阴影的"桌面框架"
  - 移动端：iPhone 15 Pro框架，包含刘海和状态栏
  - 确保所有元素在设备框架内绝对定位

#### 用户体验目标
- **文化共鸣**：唤起对中华文化的敬畏和探索欲望
- **触觉感受**：提供直观的触觉感，如同探索水墨画廊
- **交互鼓励**：通过模拟传统纸张和毛笔工艺的交互元素鼓励探索

#### 资源使用规范
- **图片资源**：使用FontAwesome、Unsplash、Pexels等免费服务
- **字体资源**：仅使用免费字体服务
- **版权合规**：确保所有素材均为版权免费资源

### 移动端适配规范
- **必须采用 Mobile-First 设计理念**，优先考虑移动端体验
- **断点设计**：使用 Tailwind CSS 标准断点（sm: 640px, md: 768px, lg: 1024px, xl: 1280px）
- **触摸友好**：所有可点击元素最小尺寸 44px × 44px（符合苹果和谷歌设计规范）
- **手势支持**：支持滑动、长按等移动端手势操作
- **安全区域**：适配 iPhone 刘海屏等异形屏幕的安全区域
- **横竖屏适配**：确保在横屏和竖屏模式下都能正常显示和操作

### 环境配置
- 使用 `.env` 文件管理环境变量
- 开发、测试、生产环境分离
- 环境变量以 `VITE_` 前缀命名

### 性能优化
- 路由懒加载
- 图片懒加载
- 合理使用 `v-if` 和 `v-show`
- 避免不必要的响应式数据

## 代码质量

### 注释规范
- 复杂逻辑添加注释说明
- 函数功能注释
- TODO 标记待完成功能

### 代码复用
- 通用工具函数提取到 `utils/`
- 通用组件提取到 `components/`
- 通用样式使用 Tailwind 配置

### 测试考虑
- 关键业务逻辑编写单元测试
- 用户交互流程编写 E2E 测试

## 最佳实践

1. **渐进式开发**: 先实现核心功能，再优化体验
2. **移动优先**: 响应式设计从移动端开始
3. **用户体验**: 加载状态、错误提示、成功反馈
4. **代码可读性**: 清晰的命名和结构
5. **性能意识**: 避免不必要的重渲染和请求
6. **安全考虑**: 输入验证、XSS 防护、权限控制

## 常用代码片段

### 页面加载模式
```javascript
const loading = ref(false)
const data = ref([])

const loadData = async () => {
  loading.value = true
  try {
    const res = await request.get('/api/data')
    data.value = res
  } catch (error) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
```

### 表单提交模式
```javascript
const formData = reactive({
  name: '',
  email: ''
})

const handleSubmit = async () => {
  if (HaveStringPropertiesEmpty(formData)) {
    ElMessage.warning('请填写完整信息')
    return
  }
  
  try {
    await request.post('/api/submit', formData)
    ElMessage.success('提交成功')
  } catch (error) {
    ElMessage.error('提交失败')
  }
}
```

## 移动端适配开发规范

### 响应式布局要求

#### 1. 容器和间距
```vue
<template>
  <!-- 移动端优先的容器设计 -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 内容区域 -->
    <div class="space-y-4 sm:space-y-6 lg:space-y-8">
      <!-- 卡片布局 -->
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <!-- 卡片内容 -->
      </div>
    </div>
  </div>
</template>
```

#### 2. 网格系统
```vue
<template>
  <!-- 响应式网格布局 -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    <div class="col-span-1">项目1</div>
    <div class="col-span-1">项目2</div>
    <!-- 移动端占满宽度，桌面端多列显示 -->
  </div>
</template>
```

#### 3. 导航菜单适配
```vue
<template>
  <nav class="bg-white shadow-lg">
    <!-- 移动端汉堡菜单 -->
    <div class="md:hidden">
      <button @click="toggleMobileMenu" class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
    
    <!-- 桌面端水平菜单 -->
    <div class="hidden md:flex md:items-center md:space-x-8">
      <router-link to="/" class="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
        首页
      </router-link>
    </div>
    
    <!-- 移动端下拉菜单 -->
    <div v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link to="/" class="text-gray-900 hover:text-indigo-600 block px-3 py-2 text-base font-medium">
          首页
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
```

### 触摸交互规范

#### 1. 按钮和可点击元素
```vue
<template>
  <!-- 移动端友好的按钮设计 -->
  <button class="min-h-[44px] min-w-[44px] px-4 py-2 bg-blue-600 text-white rounded-lg font-medium touch-manipulation active:scale-95 transition-transform">
    点击按钮
  </button>
  
  <!-- 列表项点击区域 -->
  <div class="min-h-[48px] flex items-center px-4 py-3 border-b border-gray-200 active:bg-gray-50 cursor-pointer">
    <span>列表项内容</span>
  </div>
</template>

<style scoped>
/* 禁用移动端点击高亮 */
.touch-manipulation {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
</style>
```

#### 2. 表单输入适配
```vue
<template>
  <form class="space-y-4">
    <!-- 移动端优化的输入框 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        手机号码
      </label>
      <input 
        type="tel" 
        inputmode="numeric"
        class="w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        placeholder="请输入手机号码"
      />
    </div>
    
    <!-- 邮箱输入 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        邮箱地址
      </label>
      <input 
        type="email" 
        inputmode="email"
        class="w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        placeholder="请输入邮箱地址"
      />
    </div>
    
    <!-- 数字输入 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        数量
      </label>
      <input 
        type="number" 
        inputmode="decimal"
        class="w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        placeholder="请输入数量"
      />
    </div>
  </form>
</template>
```

### 手势操作支持

#### 1. 滑动操作
```vue
<template>
  <div 
    class="overflow-hidden"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div 
      class="flex transition-transform duration-300 ease-out"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <!-- 滑动内容 -->
      <div class="flex-shrink-0 w-full">内容1</div>
      <div class="flex-shrink-0 w-full">内容2</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const translateX = ref(0)
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)

const handleTouchStart = (e) => {
  startX.value = e.touches[0].clientX
  isDragging.value = true
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  
  currentX.value = e.touches[0].clientX
  const deltaX = currentX.value - startX.value
  translateX.value = deltaX
}

const handleTouchEnd = () => {
  isDragging.value = false
  
  // 根据滑动距离决定是否切换
  if (Math.abs(translateX.value) > 100) {
    // 执行切换逻辑
    console.log('滑动切换')
  }
  
  // 重置位置
  translateX.value = 0
}
</script>
```

#### 2. 长按操作
```vue
<template>
  <div 
    class="p-4 bg-white rounded-lg shadow-md cursor-pointer select-none"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchCancel"
    @contextmenu.prevent
  >
    长按我试试
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const longPressTimer = ref(null)
const isLongPressed = ref(false)

const handleTouchStart = () => {
  isLongPressed.value = false
  longPressTimer.value = setTimeout(() => {
    isLongPressed.value = true
    ElMessage.success('长按触发')
    // 触发长按事件
    handleLongPress()
  }, 500) // 500ms 长按时间
}

const handleTouchEnd = () => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }
  
  if (!isLongPressed.value) {
    // 普通点击事件
    handleClick()
  }
}

const handleTouchCancel = () => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }
}

const handleClick = () => {
  console.log('普通点击')
}

const handleLongPress = () => {
  console.log('长按操作')
}
</script>
```

### 安全区域适配

#### 1. iPhone 刘海屏适配
```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部安全区域 -->
    <div class="pt-safe-top">
      <header class="bg-white shadow-sm px-4 py-3">
        <h1 class="text-lg font-semibold">页面标题</h1>
      </header>
    </div>
    
    <!-- 主要内容区域 -->
    <main class="flex-1 px-4 py-6">
      <!-- 页面内容 -->
    </main>
    
    <!-- 底部安全区域 -->
    <footer class="bg-white border-t border-gray-200 px-4 py-3 pb-safe-bottom">
      <div class="flex justify-center space-x-4">
        <button class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
          确认
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 安全区域适配 */
.pt-safe-top {
  padding-top: env(safe-area-inset-top);
}

.pb-safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.pl-safe-left {
  padding-left: env(safe-area-inset-left);
}

.pr-safe-right {
  padding-right: env(safe-area-inset-right);
}
</style>
```

### 性能优化

#### 1. 图片懒加载和响应式
```vue
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="item in items" :key="item.id" class="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        :src="item.thumbnail"
        :alt="item.title"
        class="w-full h-48 object-cover"
        loading="lazy"
        :srcset="`
          ${item.thumbnail} 300w,
          ${item.image_md} 600w,
          ${item.image_lg} 1200w
        `"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h3>
        <p class="text-gray-600 text-sm">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>
```

#### 2. 虚拟滚动（长列表优化）
```vue
<template>
  <div class="h-96 overflow-auto" ref="scrollContainer">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div 
        v-for="item in visibleItems" 
        :key="item.id"
        class="absolute w-full h-16 flex items-center px-4 border-b border-gray-200"
        :style="{ top: item.top + 'px' }"
      >
        {{ item.data.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: Array,
  itemHeight: { type: Number, default: 64 }
})

const scrollContainer = ref(null)
const scrollTop = ref(0)
const containerHeight = ref(0)

const totalHeight = computed(() => props.items.length * props.itemHeight)

const visibleItems = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight)
  const end = Math.min(
    start + Math.ceil(containerHeight.value / props.itemHeight) + 1,
    props.items.length
  )
  
  return props.items.slice(start, end).map((item, index) => ({
    id: item.id,
    data: item,
    top: (start + index) * props.itemHeight
  }))
})

const handleScroll = () => {
  scrollTop.value = scrollContainer.value.scrollTop
}

onMounted(() => {
  containerHeight.value = scrollContainer.value.clientHeight
  scrollContainer.value.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
})
</script>
```

### 移动端调试和测试

#### 1. 设备检测工具函数
```javascript
// utils/device.js
export const deviceDetection = {
  // 检测是否为移动设备
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },
  
  // 检测是否为 iOS
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  },
  
  // 检测是否为 Android
  isAndroid() {
    return /Android/.test(navigator.userAgent)
  },
  
  // 获取屏幕尺寸
  getScreenSize() {
    return {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight
    }
  },
  
  // 检测是否支持触摸
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },
  
  // 获取设备像素比
  getDevicePixelRatio() {
    return window.devicePixelRatio || 1
  }
}
```

#### 2. 响应式断点检测
```javascript
// composables/useBreakpoints.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useBreakpoints() {
  const windowWidth = ref(0)
  
  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }
  
  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })
  
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
  
  const isSm = computed(() => windowWidth.value >= breakpoints.sm)
  const isMd = computed(() => windowWidth.value >= breakpoints.md)
  const isLg = computed(() => windowWidth.value >= breakpoints.lg)
  const isXl = computed(() => windowWidth.value >= breakpoints.xl)
  const is2xl = computed(() => windowWidth.value >= breakpoints['2xl'])
  
  const isMobile = computed(() => windowWidth.value < breakpoints.md)
  const isTablet = computed(() => windowWidth.value >= breakpoints.md && windowWidth.value < breakpoints.lg)
  const isDesktop = computed(() => windowWidth.value >= breakpoints.lg)
  
  return {
    windowWidth,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isMobile,
    isTablet,
    isDesktop
  }
}
```

### 移动端最佳实践总结

1. **设计原则**
   - 始终采用 Mobile-First 设计方法
   - 确保所有交互元素符合最小触摸尺寸要求
   - 优化加载性能，减少首屏加载时间

2. **交互体验**
   - 提供清晰的视觉反馈（点击、加载状态）
   - 支持常见的移动端手势操作
   - 合理使用动画和过渡效果

3. **性能优化**
   - 实现图片懒加载和响应式图片
   - 对长列表使用虚拟滚动
   - 合理使用缓存策略

4. **兼容性测试**
   - 在真实设备上进行测试
   - 使用浏览器开发者工具模拟不同设备
   - 测试横竖屏切换和不同分辨率

5. **无障碍访问**
   - 确保足够的颜色对比度
   - 提供合适的焦点指示器
   - 支持屏幕阅读器访问
