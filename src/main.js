import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import "./assets/theme-overrides.css";

Vue.use(VueRouter);
Vue.use(VueMaterial);

import router from "./Router";

import store from "./Store";

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
