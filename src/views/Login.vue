<template>
  <div>
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal text-center">請輸入資料登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control mb-3"
        v-model="user.email"
        placeholder="Email address"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mb-3"
        v-model="user.password"
        placeholder="Password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Login
      </button>
      <ul>
        <li>
          <router-link class="text-muted" to="/signup">尚未註冊</router-link>
        </li>
        <li>
          <router-link class="text-muted" to="/"
            >＜－ 回到 James Shop 購物去</router-link
          >
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      axios.post("http://localhost:5000/api/login", this.user).then(
        res => {
          if (res.status === 200) {
            const userId = res.data.userId;
            const token = res.data.token;
            this.$store.dispatch("login", { token, userId });
            this.$router.push("/dashboard");
          }
        },
        err => {
          console.log(err.response);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 20px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}

.footer {
  margin: 0;
  padding: 2rem 2rem 0;
  line-height: 1.5rem;
}
</style>
