import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { ValidationProvider, extend } from "vee-validate";
import { email, numeric, max_value, min_value } from "vee-validate/dist/rules";

extend("email", {
  ...email,
  message: "請輸入正確的mail格式"
});

extend("numeric", {
  ...numeric,
  message: "請輸入數字!!!"
});

extend("max_value", {
  ...max_value,
  message: "數字必須小於100"
});

extend("min_value", {
  ...min_value,
  message: "數字必須大於1"
});
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
