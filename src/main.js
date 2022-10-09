import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import axios from 'axios'

import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(router).use(ElementPlus).use(VueAxios, axios)
app.provide('axios',app.config.globalProperties.axios)

app.mount('#app')
