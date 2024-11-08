import { createPinia } from 'pinia'
import App from 'src/web/App.vue'
import { isDesktopApp } from 'src/web/utils/isDesktopApp'
import { mockElectronApi } from 'src/web/utils/mockElectronApi'

import { createApp } from 'vue'
import './style.css'

if (!isDesktopApp()) {
  mockElectronApi()
}

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
