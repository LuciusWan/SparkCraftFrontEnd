import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Tailwind CSS
import './style/index.css'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')