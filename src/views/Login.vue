<template>
  <div>
    <Alert />
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal text-center">會員登入</h1>
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
        <li class="h3 text-center">
          使用臉書登入
          <facebook-login
            appId="2520743858163811"
            @login="onLogin"
            @logout="onLogout"
            @sdk-loaded="sdkLoaded"
          ></facebook-login>
        </li>
        <li class="mb-3">
          <h5>
            <router-link class="text-muted" to="/signup">立即註冊</router-link>
          </h5>
        </li>
        <li>
          <h5>
            <router-link class="text-muted" to="/"
              >＜－ 回到 James Shop 購物去</router-link
            >
          </h5>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "@/components/AlertMessage.vue";
import facebookLogin from "facebook-login-vuejs";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    Alert,
    facebookLogin
  },
  methods: {
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        {
          fields: "id,name,gender,email"
        },
        userInformation => {
          this.user = userInformation;
          this.loginByFB();
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
    login() {
      const url = "api/login";
      axios.post(url, this.user).then(
        res => {
          if (res.status === 200) {
            const user = res.data.user;
            const userId = res.data.userId;
            const token = res.data.token;
            this.$store.dispatch("login", { token, userId, user });
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
            this.$router.push("/");
          }
        },
        err => {
          if (err) {
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: err.response.data.message,
              status: "danger"
            });
          }
        }
      );
    },
    loginByFB() {
      const url = "api/login/loginByFB";
      this.$store.dispatch("updateLoading", true);
      axios
        .post(url, this.user)
        .then(res => {
          if (res.data.success) {
            this.$store.dispatch("updateLoading", false);
            const user = res.data.user;
            const userId = res.data.userId;
            const token = res.data.token;
            this.$store.dispatch("login", { token, userId, user });
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
            this.$router.push("/");
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
