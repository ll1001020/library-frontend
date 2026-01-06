import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router.js'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'nprogress/nprogress.css'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, 
})
app.config.globalProperties.$icons = []
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.mount('#app')
