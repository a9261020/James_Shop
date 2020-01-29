<template>
  <div>
    <div v-if="!getisLogin">
      尚未登入
      <button @click="login">登入</button>
    </div>
    <div v-else>
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
    ...mapGetters(["getisLogin"])
  }
};
</script>
