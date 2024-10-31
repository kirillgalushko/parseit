import { createPinia } from 'pinia'
import App from 'src/web/App.vue'
import { createApp } from 'vue'
import 'gui/dist/style.css'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
