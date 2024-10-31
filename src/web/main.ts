import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'gui/dist/style.css'
import './style.css'
import App from 'src/web/App.vue'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia)
app.mount('#app')
