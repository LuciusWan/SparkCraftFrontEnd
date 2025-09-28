# SparkCraft 前端部署指南

## 项目概述

SparkCraft 是一个基于 Vue 3 的中国风文创平台前端项目，本指南将帮助您将项目部署到生产环境。

## 部署前准备

### 1. 环境要求

- **Node.js**: 16.0+ 
- **npm**: 8.0+ 或 **yarn**: 1.22+
- **Git**: 2.0+

### 2. 项目依赖检查

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 安装项目依赖
npm install
```

### 3. 环境变量配置

#### 开发环境 (.env.development)
```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080

# 是否使用 Mock 数据
VITE_USE_MOCK=false

# 应用标题
VITE_APP_TITLE=SparkCraft - 开发环境
```

#### 生产环境 (.env.production)
```env
# API 基础地址 (替换为实际的生产环境 API 地址)
VITE_API_BASE_URL=https://api.sparkcraft.com

# 是否使用 Mock 数据
VITE_USE_MOCK=false

# 应用标题
VITE_APP_TITLE=SparkCraft - 中国风文创平台

# CDN 地址 (可选)
VITE_CDN_URL=https://cdn.sparkcraft.com
```

## 构建项目

### 1. 生产环境构建

```bash
# 构建生产版本
npm run build

# 构建完成后，dist 目录包含所有静态文件
ls dist/
```

### 2. 构建优化

#### 2.1 代码分割
项目已配置路由懒加载，自动进行代码分割：

```javascript
// router/index.js
{
  path: '/login',
  component: () => import('@/views/auth/Login.vue')
}
```

#### 2.2 资源优化
- 图片压缩和懒加载
- CSS 和 JavaScript 压缩
- Tree-shaking 移除未使用代码

### 3. 构建验证

```bash
# 本地预览构建结果
npm run preview

# 访问 http://localhost:4173 查看构建结果
```

## 部署方案

### 方案一：Nginx 部署

#### 1. 安装 Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 2. Nginx 配置

创建配置文件 `/etc/nginx/sites-available/sparkcraft`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/sparkcraft;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理 (可选)
    location /api/ {
        proxy_pass http://backend-server:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 3. 部署步骤

```bash
# 1. 上传构建文件
sudo cp -r dist/* /var/www/sparkcraft/

# 2. 设置权限
sudo chown -R www-data:www-data /var/www/sparkcraft
sudo chmod -R 755 /var/www/sparkcraft

# 3. 启用站点
sudo ln -s /etc/nginx/sites-available/sparkcraft /etc/nginx/sites-enabled/

# 4. 测试配置
sudo nginx -t

# 5. 重启 Nginx
sudo systemctl restart nginx
```

### 方案二：Apache 部署

#### 1. Apache 配置

创建虚拟主机配置：

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/sparkcraft
    
    # 启用压缩
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
        SetEnvIfNoCase Request_URI \
            \.(?:gif|jpe?g|png)$ no-gzip dont-vary
        SetEnvIfNoCase Request_URI \
            \.(?:exe|t?gz|zip|bz2|sit|rar)$ no-gzip dont-vary
    </Location>
    
    # SPA 路由支持
    <Directory "/var/www/sparkcraft">
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # 静态资源缓存
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </FilesMatch>
</VirtualHost>
```

### 方案三：CDN 部署

#### 1. 阿里云 OSS + CDN

```bash
# 安装阿里云 CLI
npm install -g @alicloud/cli

# 配置访问密钥
aliyun configure

# 上传到 OSS
aliyun oss cp dist/ oss://your-bucket/sparkcraft/ --recursive
```

#### 2. 腾讯云 COS + CDN

```bash
# 安装腾讯云 CLI
npm install -g coscmd

# 配置
coscmd config -a your-secret-id -s your-secret-key -b your-bucket -r your-region

# 上传
coscmd upload -r dist/ /sparkcraft/
```

### 方案四：Docker 部署

#### 1. 创建 Dockerfile

```dockerfile
# 构建阶段
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. 创建 nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    sendfile        on;
    keepalive_timeout  65;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    server {
        listen       80;
        server_name  localhost;
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### 3. 构建和运行

```bash
# 构建镜像
docker build -t sparkcraft-frontend .

# 运行容器
docker run -d -p 80:80 --name sparkcraft-app sparkcraft-frontend
```

### 方案五：Vercel 部署

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 配置 vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### 3. 部署

```bash
# 登录 Vercel
vercel login

# 部署
vercel --prod
```

## HTTPS 配置

### 1. Let's Encrypt 免费证书

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. 更新 Nginx 配置

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # 其他配置...
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## 性能优化

### 1. 资源优化

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vuex'],
          elementPlus: ['element-plus'],
          utils: ['axios', 'lodash']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 2. 缓存策略

```nginx
# 强缓存
location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# 协商缓存
location ~* \.(html)$ {
    expires -1;
    add_header Cache-Control "no-cache";
}
```

### 3. 预加载优化

```html
<!-- index.html -->
<link rel="preload" href="/fonts/chinese-font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="prefetch" href="/api/user/info">
```

## 监控和日志

### 1. 错误监控

```javascript
// main.js
import * as Sentry from '@sentry/vue'

Sentry.init({
  app,
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE
})
```

### 2. 性能监控

```javascript
// 性能监控
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0]
    console.log('页面加载时间:', perfData.loadEventEnd - perfData.fetchStart)
  })
}
```

### 3. 访问日志

```nginx
# Nginx 访问日志
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

access_log /var/log/nginx/sparkcraft.access.log main;
error_log /var/log/nginx/sparkcraft.error.log;
```

## 安全配置

### 1. 安全头设置

```nginx
# 安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### 2. 防火墙配置

```bash
# UFW 防火墙
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 备份和恢复

### 1. 自动备份脚本

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/sparkcraft"
SOURCE_DIR="/var/www/sparkcraft"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份文件
tar -czf $BACKUP_DIR/sparkcraft_$DATE.tar.gz -C $SOURCE_DIR .

# 删除7天前的备份
find $BACKUP_DIR -name "sparkcraft_*.tar.gz" -mtime +7 -delete

echo "备份完成: sparkcraft_$DATE.tar.gz"
```

### 2. 定时备份

```bash
# 添加到 crontab
0 2 * * * /path/to/backup.sh
```

## 故障排查

### 1. 常见问题

#### 页面空白
- 检查构建文件是否完整
- 检查 Nginx 配置是否正确
- 查看浏览器控制台错误

#### 路由 404
- 检查 SPA 路由配置
- 确认 `try_files` 配置正确

#### API 请求失败
- 检查 CORS 配置
- 确认 API 地址正确
- 检查网络连接

### 2. 日志查看

```bash
# Nginx 日志
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# 系统日志
sudo journalctl -u nginx -f
```

## 部署检查清单

- [ ] 环境变量配置正确
- [ ] 构建成功无错误
- [ ] 静态文件上传完成
- [ ] Web 服务器配置正确
- [ ] HTTPS 证书配置
- [ ] 域名解析正确
- [ ] 防火墙规则配置
- [ ] 监控和日志配置
- [ ] 备份策略实施
- [ ] 性能测试通过
- [ ] 安全检查完成

## 总结

本部署指南提供了多种部署方案，您可以根据实际需求选择合适的方案。建议在生产环境中使用 HTTPS、启用缓存、配置监控和备份策略，确保应用的安全性和稳定性。

如有问题，请参考故障排查部分，或联系运维团队获取支持。