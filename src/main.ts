import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import Mock from './mock/mock'

import App from './App.vue'
import router from './router'
import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)
const axiosClient = axios.create({})
Mock.mocked(axiosClient)

app.provide('$client', axiosClient)
app.provide('emitter', emitter)

app.use(createPinia())
app.use(router)

app.mount('#app')
