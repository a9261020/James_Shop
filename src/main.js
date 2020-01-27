import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { ValidationProvider, extend } from "vee-validate";
import { email } from "vee-validate/dist/rules";
extend("email", {
  ...email,
  message: "Hey fill in you email"
});
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
