import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useFavoriteStore } from '@/stores/favoriteStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const favoriteStore = useFavoriteStore()
favoriteStore.initStore()

app.mount('#app')
