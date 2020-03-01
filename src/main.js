import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { email, required, max } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "必填欄位"
});

extend("email", {
  ...email,
  message: "請輸入正確的mail格式"
});

extend("max", {
  ...max,
  message: "已超過字數限制"
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("Loading", Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
