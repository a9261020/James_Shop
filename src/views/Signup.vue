<template>
  <div>
    <form class="form-signin" @submit.prevent="signup">
      <h1 class="h3 mb-3 font-weight-normal text-center">會員註冊</h1>
      <h3>請輸入信箱</h3>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="text"
        id="inputEmail"
        class="form-control mb-3"
        v-model="user.email"
        placeholder="Email address"
        required
      />
      <h3>請輸入密碼</h3>
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mb-3"
        v-model="user.password"
        placeholder="Password"
        required
      />
      <h3>請輸入名稱</h3>
      <label for="inputName" class="sr-only">Name</label>
      <input
        type="text"
        id="inputName"
        class="form-control mb-3"
        v-model="user.name"
        placeholder="Name"
        required
      />
      <h3>請輸入性別</h3>
      <select class="form-control mb-3" id="inputGender" v-model="user.gender">
        <option>男</option>
        <option>女</option>
      </select>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Sign in
      </button>
      <ul>
        <li>
          <router-link class="text-muted" to="/login">會員登入</router-link>
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
        name: "",
        password: "",
        gender: "",
        createDate: new Date(),
        isAdmin: false
      }
    };
  },
  methods: {
    signup() {
      const url = "api/signup";
      axios
        .post(url, this.user)
        .then(res => {
          if (res) {
            this.$router.push("/login");
          }
        })
        .catch(err => {
          err;
        });
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
