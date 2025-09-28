<template>
  <div 
    class="markdown-content prose prose-sm max-w-none"
    v-html="renderedContent"
  ></div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// Props
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

// 配置 markdown-it
const md = new MarkdownIt({
  html: true,        // 启用HTML标签
  linkify: true,     // 自动转换URL为链接
  typographer: true, // 启用一些语言中性的替换 + 引号美化
  breaks: true,      // 转换段落里的 '\n' 到 <br>
  highlight: function (str, lang) {
    // 代码高亮处理
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

// 渲染Markdown内容
const renderedContent = computed(() => {
  if (!props.content) return ''
  
  try {
    return md.render(props.content)
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    return md.utils.escapeHtml(props.content)
  }
})

// 组件挂载时初始化代码高亮
onMounted(() => {
  // 确保highlight.js样式已加载
  if (!document.querySelector('link[href*="highlight.js"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
    document.head.appendChild(link)
  }
})
</script>

<style scoped>
/* Markdown内容样式 */
.markdown-content {
  @apply text-gray-800 leading-relaxed;
}

/* 标题样式 */
.markdown-content :deep(h1) {
  @apply text-2xl font-bold text-gray-900 mt-6 mb-4 pb-2 border-b border-gray-200;
}

.markdown-content :deep(h2) {
  @apply text-xl font-bold text-gray-900 mt-5 mb-3 pb-1 border-b border-gray-100;
}

.markdown-content :deep(h3) {
  @apply text-lg font-semibold text-gray-900 mt-4 mb-2;
}

.markdown-content :deep(h4) {
  @apply text-base font-semibold text-gray-900 mt-3 mb-2;
}

.markdown-content :deep(h5) {
  @apply text-sm font-semibold text-gray-900 mt-2 mb-1;
}

.markdown-content :deep(h6) {
  @apply text-xs font-semibold text-gray-700 mt-2 mb-1;
}

/* 段落样式 */
.markdown-content :deep(p) {
  @apply mb-4 text-gray-700;
}

/* 强调样式 */
.markdown-content :deep(strong) {
  @apply font-semibold text-gray-900;
}

.markdown-content :deep(em) {
  @apply italic text-gray-700;
}

/* 链接样式 */
.markdown-content :deep(a) {
  @apply text-blue-600 hover:text-blue-800 underline;
}

/* 列表样式 */
.markdown-content :deep(ul) {
  @apply list-disc list-inside mb-4 ml-4 space-y-1;
}

.markdown-content :deep(ol) {
  @apply list-decimal list-inside mb-4 ml-4 space-y-1;
}

.markdown-content :deep(li) {
  @apply text-gray-700;
}

/* 代码样式 */
.markdown-content :deep(code) {
  @apply bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono;
}

.markdown-content :deep(pre) {
  @apply bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto;
}

.markdown-content :deep(pre code) {
  @apply bg-transparent p-0 text-sm;
}

/* 引用样式 */
.markdown-content :deep(blockquote) {
  @apply border-l-4 border-gray-300 pl-4 py-2 mb-4 bg-gray-50 text-gray-700 italic;
}

/* 表格样式 */
.markdown-content :deep(table) {
  @apply w-full border-collapse border border-gray-300 mb-4;
}

.markdown-content :deep(th) {
  @apply bg-gray-100 border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900;
}

.markdown-content :deep(td) {
  @apply border border-gray-300 px-4 py-2 text-gray-700;
}

/* 水平分割线 */
.markdown-content :deep(hr) {
  @apply border-0 border-t border-gray-300 my-6;
}

/* 代码高亮样式覆盖 */
.markdown-content :deep(.hljs) {
  @apply bg-gray-50 text-gray-800;
}
</style>