import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// You need a specific loader for CSS files
import './assets/css/app.scss'

const options = {
  // You can set your default options here
};

Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 16,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  }
});

Vue.use(Toast, options);

Vue.config.productionTip = false

Vue.use(Datetime)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
