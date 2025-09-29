# 🎨 SparkCraftFrontEnd

<div align="center">
  
  **融合中国传统艺术与现代前端技术的文创平台**
  
  [![Vue 3](https://img.shields.io/badge/Vue-3.4.0-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![Element Plus](https://img.shields.io/badge/Element%20Plus-2.4.4-409EFF?style=flat-square)](https://element-plus.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
  
</div>

## ✨ 项目概述

SparkCraftFrontEnd 是一个专注于展现中国传统文化之美的现代化前端项目。通过精心设计的中国风界面，为用户提供优雅的交互体验，支持多角色权限管理和AI图像项目创建功能。

### 🎯 核心特性

- 🎨 **中国风设计语言** - 融合水墨书法风格的现代化UI设计
- 📱 **响应式适配** - 支持桌面端、平板和移动端完美显示
- 🔐 **多角色权限** - 游客、用户、管理员分级权限管理
- 🤖 **AI图像生成** - 集成AI聊天和图像项目创建功能
- ⚡ **现代化架构** - Vue 3 Composition API + Vite 构建
- 🚀 **性能优化** - 路由懒加载、代码分割、资源压缩

## 🛠️ 技术栈

### 核心框架
- **Vue 3.4.0** - 渐进式 JavaScript 框架，使用 Composition API
- **Vite 5.0.8** - 下一代前端构建工具
- **Vue Router 4.2.5** - Vue.js 官方路由管理器
- **Vuex 4.1.0** - Vue.js 状态管理模式

### UI 框架与样式
- **Element Plus 2.4.4** - 基于 Vue 3 的组件库
- **TailwindCSS 3.4.0** - 原子化 CSS 框架
- **Font Awesome 6.5.1** - 图标库
- **PostCSS & Autoprefixer** - CSS后处理器

### 开发工具
- **Axios 1.6.2** - HTTP客户端
- **ESLint 8.56.0** - 代码质量检查
- **Prettier 3.1.1** - 代码格式化
- **MockJS 1.1.0** - 模拟数据生成

### 特殊功能
- **Markdown-it 14.1.0** - Markdown渲染
- **Highlight.js 11.11.1** - 代码高亮

## 🚀 快速开始

### 环境要求

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0
- **现代浏览器** (Chrome >= 87, Firefox >= 78, Safari >= 14, Edge >= 88)

### 安装步骤

```bash
# 1. 克隆项目
git clone <your-repository-url>
cd SparkCraftFrontEnd

# 2. 安装依赖
npm install
# 或使用 yarn
yarn install

# 3. 启动开发服务器
npm run dev
# 项目将在 http://localhost:3000 启动

# 4. 构建生产环境
npm run build

# 5. 预览生产构建
npm run preview
```

### 开发命令

```bash
# 开发模式（热重载）
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview

# 代码检查和修复
npm run lint
```

## 📁 项目结构

```
SparkCraftFrontEnd/
├── src/
│   ├── api/                 # API接口封装
│   │   ├── user.js         # 用户相关接口
│   │   └── imageProject.js # AI图像项目接口
│   ├── components/         # 组件库
│   │   ├── common/         # 通用组件
│   │   │   ├── MarkdownRenderer.vue
│   │   │   ├── Pagination.vue
│   │   │   ├── SearchBox.vue
│   │   │   └── WorkflowResult.vue
│   │   └── user/           # 用户相关组件
│   │       ├── UserAddDialog.vue
│   │       ├── UserDetailDialog.vue
│   │       └── UserEditDialog.vue
│   ├── views/              # 页面视图
│   │   ├── auth/           # 认证页面
│   │   ├── admin/          # 管理员页面
│   │   ├── user/           # 用户页面
│   │   └── imageProject/   # AI图像项目页面
│   ├── router/             # 路由配置
│   ├── store/              # 状态管理
│   │   └── modules/        # Vuex模块
│   ├── utils/              # 工具函数
│   └── style/              # 样式文件
├── public/                 # 静态资源
├── docs/                   # 文档目录
└── dist/                   # 构建输出
```

## 🎯 核心功能

### 用户系统
- ✅ 用户注册和登录
- ✅ 个人信息管理
- ✅ 权限角色控制
- ✅ 密码找回功能

### 管理功能
- ✅ 用户管理（增删改查）
- ✅ 权限分配
- ✅ 系统监控面板

### AI图像项目
- ✅ AI聊天交互
- ✅ 图像项目创建
- ✅ 工作流结果展示
- ✅ Markdown内容渲染

### 界面特性
- ✅ 中国风视觉设计
- ✅ 响应式布局适配
- ✅ 深色/浅色主题
- ✅ 动画过渡效果

## 🎨 设计系统

项目采用定制化的中国风设计语言：

- **色彩体系**: 基于传统中国色彩调色板
- **字体选择**: 优雅的中文字体搭配
- **动画效果**: 水墨渐变和毛笔笔触动画
- **布局风格**: 现代简约与传统元素结合

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件配置环境变量：

```bash
# API基础URL
VITE_API_BASE_URL=http://localhost:8080

# 应用标题
VITE_APP_TITLE=SparkCraft文创平台

# 开启Mock数据
VITE_USE_MOCK=false
```

### 代理配置

开发环境API代理配置（`vite.config.js`）：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

## 🚀 部署指南

### 生产构建

```bash
npm run build
```

### 静态部署

```bash
# Nginx配置示例
sudo cp -r dist/* /var/www/html/

# Apache配置
sudo cp -r dist/* /var/www/html/
```

### Docker部署

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔍 开发规范

### 代码风格
- 使用 ESLint + Prettier 进行代码格式化
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case
- 遵循 Vue 3 Composition API 最佳实践

### Git提交规范
```bash
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建过程或辅助工具的变动
```

## 🧪 测试

详细的测试指南请查看 [TESTING_GUIDE.md](./TESTING_GUIDE.md)

```bash
# 运行单元测试
npm run test

# 运行端到端测试
npm run test:e2e

# 测试覆盖率
npm run test:coverage
```

## 📚 文档

- [API文档](./api-doc.md) - 后端接口文档
- [UI设计规范](./ui.md) - 界面设计指南
- [部署指南](./DEPLOYMENT_GUIDE.md) - 生产环境部署
- [测试指南](./TESTING_GUIDE.md) - 测试最佳实践

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. **Fork** 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 **Pull Request**

### 开发流程

1. 在 Issues 中讨论新功能或改进
2. 按照代码规范编写代码
3. 确保所有测试通过
4. 提交 Pull Request 并等待代码审查

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新详情。

## ❓ 常见问题

### Q: 开发服务器启动失败？
A: 请检查 Node.js 版本是否 >= 16.0.0，并确保端口3000未被占用。

### Q: 构建后页面空白？
A: 检查路由配置和基础路径设置，确保资源路径正确。

### Q: API请求失败？
A: 确认后端服务正常运行，检查代理配置和API地址。

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Element Plus](https://element-plus.org/) - Vue 3组件库
- [TailwindCSS](https://tailwindcss.com/) - CSS框架
- [Vite](https://vitejs.dev/) - 新一代构建工具

---

<div align="center">
  
  **如果这个项目对您有帮助，请给一个 ⭐️ Star！**
  
  Made with ❤️ by SparkCraft Team
  
</div>