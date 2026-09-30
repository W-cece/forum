import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { watchKeyboard } from './utils/keyboard'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

// 全局启动键盘监听
watchKeyboard()
