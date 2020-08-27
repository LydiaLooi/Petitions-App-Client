import Vue from 'vue'
import App from './App.vue'
import * as routing from "./router"
import 'bulma/css/bulma.css'

import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);


import VueRouter from 'vue-router'
Vue.use(VueRouter);

let router = routing.routerSetup();



new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
