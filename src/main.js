import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCalendar from 'v-calendar'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/all.scss'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VCalendar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
