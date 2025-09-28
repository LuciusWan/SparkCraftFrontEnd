# SparkCraft - 中国风文创平台前端

<div align="center">
  <h1>🎨 SparkCraft</h1>
  <p>一个融合传统中国艺术与现代技术的文创平台前端项目</p>
  
  ![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=flat-square&logo=vite&logoColor=white)
  ![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-409EFF?style=flat-square&logo=element&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
</div>

## 📖 项目简介

SparkCraft 是一个专注于中国传统文化与现代文创相结合的平台前端项目。项目采用现代化的前端技术栈，融入中国风设计元素，为用户提供优雅的文创体验。

### ✨ 特色功能

- 🎨 **中国风设计**: 融合传统水墨、书法等中国艺术元素
- 📱 **响应式设计**: 完美适配桌面端、平板端和移动端
- 🔐 **用户认证**: 完整的用户注册、登录、权限管理系统
- 👥 **用户管理**: 强大的后台用户管理功能
- 🎯 **权限控制**: 基于角色的访问控制 (RBAC)
- 🚀 **现代技术栈**: Vue 3 + Vite + Element Plus + Tailwind CSS

## 🛠️ 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架，使用 Composition API
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js 官方路由管理器
- **Vuex** - Vue.js 状态管理模式

### UI 框架与样式
- **Element Plus** - 基于 Vue 3 的组件库
- **Tailwind CSS** - 原子化 CSS 框架
- **Font Awesome** - 图标库

### 开发工具
- **Axios** - HTTP 客户端
- **ESLint** - 代码质量检查工具
- **Prettier** - 代码格式化工具

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/sparkcraft-frontend.git

# 进入项目目录
cd sparkcraft-frontend

# 安装依赖
npm install
```

### 开发环境

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── api/                    # API 接口
│   └── user.js            # 用户相关 API
├── components/             # 组件
│   ├── common/            # 通用组件
│   │   ├── Pagination.vue # 分页组件
│   │   └── SearchBox.vue  # 搜索组件
│   └── user/              # 用户相关组件
│       ├── UserAddDialog.vue     # 新增用户弹窗
│       ├── UserDetailDialog.vue  # 用户详情弹窗
│       └── UserEditDialog.vue    # 用户编辑弹窗
├── router/                 # 路由配置
│   └── index.js           # 路由定义
├── store/                  # 状态管理
│   ├── index.js           # Vuex 主文件
│   └── modules/           # Vuex 模块
│       └── user.js        # 用户状态模块
├── style/                  # 样式文件
│   └── index.css          # 全局样式
├── utils/                  # 工具函数
│   ├── index.js           # 通用工具
│   └── request.js         # HTTP 请求封装
├── views/                  # 页面组件
│   ├── admin/             # 管理员页面
│   │   └── UserManagement.vue  # 用户管理
│   ├── auth/              # 认证页面
│   │   ├── Login.vue      # 登录页面
│   │   └── Register.vue   # 注册页面
│   ├── user/              # 用户页面
│   │   └── Profile.vue    # 个人中心
│   ├── About.vue          # 关于页面
│   ├── Home.vue           # 首页
│   └── NotFound.vue       # 404 页面
├── App.vue                 # 根组件
└── main.js                # 入口文件
```

## 🎨 设计规范

### 视觉风格
- **设计理念**: 手绘水彩风格，配合水墨背景
- **色彩方案**: 柔和的大地色系，融入中国传统色彩
- **字体选择**: 中文书法字体 + 现代无衬线字体
- **布局风格**: 简洁的模块化网格，呼应竹节韵律

### 响应式设计
- **桌面端**: 1440×1024 及以上分辨率
- **平板端**: 768×1024 分辨率
- **移动端**: 390×844 (iPhone 15 Pro) 及类似尺寸

## 🔧 配置说明

### 环境变量

#### 开发环境 (.env.development)
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK=false
VITE_APP_TITLE=SparkCraft - 开发环境
```

#### 生产环境 (.env.production)
```env
VITE_API_BASE_URL=https://api.sparkcraft.com
VITE_USE_MOCK=false
VITE_APP_TITLE=SparkCraft - 中国风文创平台
```

### 代理配置

开发环境 API 代理配置在 `vite.config.js` 中：

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## 👥 用户角色

### 游客 (Guest)
- 浏览首页和关于页面
- 访问登录和注册页面

### 普通用户 (User)
- 查看和编辑个人信息
- 访问个人中心

### 管理员 (Admin)
- 用户管理 (查看、编辑、删除、新增用户)
- 访问管理后台
- 所有普通用户权限

## 🔐 权限控制

项目实现了基于角色的访问控制 (RBAC)：

- **路由守卫**: 在 `router/index.js` 中实现
- **权限检查**: 基于用户角色和登录状态
- **页面保护**: 未授权访问自动重定向

## 📱 移动端适配

### 设计原则
- **Mobile-First**: 优先考虑移动端体验
- **触摸友好**: 所有可点击元素最小 44px × 44px
- **手势支持**: 支持滑动、长按等移动端手势
- **安全区域**: 适配 iPhone 刘海屏等异形屏幕

### 适配特性
- 响应式导航菜单
- 移动端优化的表单输入
- 触摸优化的交互元素
- 移动端友好的弹窗和对话框

## 🧪 测试

### 功能测试
详细的功能测试指南请参考 [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### 测试账号
```
管理员账号：
- 账号：admin
- 密码：12345678

普通用户账号：
- 账号：user
- 密码：12345678
```

## 🚀 部署

详细的部署指南请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### 快速部署

```bash
# 构建项目
npm run build

# 部署到 Nginx
sudo cp -r dist/* /var/www/html/

# 或部署到其他静态文件服务器
```

## 📊 性能优化

- **代码分割**: 路由级别的懒加载
- **资源压缩**: Gzip 压缩和资源优化
- **缓存策略**: 合理的浏览器缓存配置
- **图片优化**: 懒加载和响应式图片

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 代码规范

- 使用 ESLint 和 Prettier 保持代码风格一致
- 遵循 Vue 3 Composition API 最佳实践
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

## 📞 联系我们

- 项目主页: [https://github.com/your-username/sparkcraft-frontend](https://github.com/your-username/sparkcraft-frontend)
- 问题反馈: [Issues](https://github.com/your-username/sparkcraft-frontend/issues)
- 邮箱: contact@sparkcraft.com

---

<div align="center">
  <p>用 ❤️ 和 ☕ 制作</p>
  <p>© 2024 SparkCraft. All rights reserved.</p>
</div>

## 环境变量

项目支持多环境配置：

- \`.env\` - 所有环境的默认配置
- \`.env.development\` - 开发环境配置
- \`.env.production\` - 生产环境配置

环境变量必须以 \`VITE_\` 前缀命名。

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交你的修改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 打开一个 Pull Request#   S p a r k C r a f t F r o n t E n d  
 