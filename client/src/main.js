import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(router);
Vue.use(BootstrapVue)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
