import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './index.css'
import 'leaflet/dist/leaflet.css';
import 'vue-map-ui/dist/normalize.css';
import 'vue-map-ui/dist/style.css';
import 'vue-map-ui/dist/theme-all.css';

const app = createApp(App)
app.use(router)

app.mount('#app')
