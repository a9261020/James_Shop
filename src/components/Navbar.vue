<template>
  <div class="navbar-wrap">
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#/">James Shop</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="logout">
            <i class="fas fa-sign-out-alt fa-lg "></i> 登出</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
