import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import Bootstrap CSS và JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

import ConfirmPopup from './components/common/ConfirmPopup.vue'
import SearchPopup from './components/common/SearchPopup.vue'
import ErrorPopup from './components/common/ErrorPopup.vue'
import WarningPopup from './components/common/WarningPopup.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register global components
app.component('ConfirmPopup', ConfirmPopup)
app.component('SearchPopup', SearchPopup)
app.component('ErrorPopup', ErrorPopup)
app.component('WarningPopup', WarningPopup)

app.mount('#app')
