import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import "./assets/theme-overrides.css";

import router from "./Router";

Vue.use(VueRouter);
Vue.use(VueMaterial);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
