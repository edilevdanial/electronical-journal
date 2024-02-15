import { createApp } from 'vue'
import App from '@/App.vue'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './style.css'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import { router } from '@/router/main'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(PrimeVue, {
  ripple: true,
})
app.use(DialogService)
app.use(ToastService)
app.use(ConfirmationService)
app.use(router)
app.use(createPinia())
app.mount('#admin-intc')

export { app }
