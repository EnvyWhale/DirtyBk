import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false
import { Toast } from 'vant';
import { AddressEdit } from "vant";
Vue.use(AddressEdit);
Vue.prototype.$toast = Toast
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
