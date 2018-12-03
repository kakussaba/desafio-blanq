import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

const app = {
  router,
  store,
  render: h => h(App)
}

new Vue(app).$mount('#app')
