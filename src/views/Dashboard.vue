<template>
  <div>
    <div v-if="!isLogin">
      尚未登入
      <button @click="login">登入</button>
    </div>
    <div v-else>
      <Loading :active.sync="isLoading"></Loading>
      <Navbar />
      <AlertMessage />
      <div class="container-fluid">
        <div class="row">
          <Siderbar />
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Siderbar from "@/components/Siderbar";
import AlertMessage from "@/components/AlertMessage";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Siderbar,
    AlertMessage
  },
  methods: {
    login() {
      this.$router.push("/login");
    }
  },
  computed: {
    // 重新整理時判斷是否登入過
    // 監聽sessionStorage是否有token & userId 資料，如果有的話就將值丟回vuex，讓isLogin = true
    // 參考網站：https://www.jianshu.com/p/b2b634c77502
    isLogin() {
      if (sessionStorage.getItem("token") && sessionStorage.getItem("userId")) {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.$store.dispatch("login", { token, userId, user });
      }
      return this.$store.getters.getisLogin;
    },
    ...mapGetters(["isLoading"])
  }
};
</script>
