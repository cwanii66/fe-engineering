import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/'
import './config/rem'

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')