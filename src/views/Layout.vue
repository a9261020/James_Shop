<template>
  <div class="container">
    <Loading :active.sync="isLoading"></Loading>
    <AlertMessage />
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent px-0">
      <router-link class="navbar-brand logo" to="/">Kingsman</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse toggle-menu" id="navbarSupportedContent">
        <ul class="navbar-nav align-items-center w-100">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/productslist"
              :class="{
                active: $route.name === 'ProductsList' && 'router-link-active'
              }"
            >Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/coupongame">Coupons</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/order">Order</router-link>
          </li>

          <li class="nav-item ml-lg-auto pt-1" v-if="!getisLogin">
            <router-link class="nav-link" to="/login">
              <i class="fas fa-user-circle fa-lg"></i>
            </router-link>
          </li>
          <li class="nav-item pt-1 ml-lg-auto mr-1" v-if="isLogin">{{ getUser.name }}</li>
          <li class="nav-item pt-1" v-if="isLogin && getUser.isAdmin">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item pt-1" @click="logout" v-if="isLogin">
            <router-link class="nav-link" to="/">
              <i class="fas fa-sign-out-alt fa-lg"></i>
            </router-link>
          </li>
        </ul>

        <div class="cart">
          <button type="button" class="btn cart-btn" data-toggle="dropdown">
            <i class="fas fa-shopping-cart fa-lg"></i>
            <!-- 計算現在購物車的長度 -->
            <span class="badge badge-pill badge-danger">{{ cartsLength }}</span>
          </button>

          <div class="dropdown-menu dropdown-menu-right" :class="{ show: isCartShow }">
            <div class="p-2 px-sm-3">
              <h5 class="text-center">購物車清單</h5>
              <table class="table mb-2">
                <tbody>
                  <tr v-for="cart in carts.carts" :key="cart._id">
                    <td class="px-1">
                      <a href="#" class="text-danger" @click="removeCartItem(cart.id)">
                        <i class="fas fa-trash-alt"></i>
                      </a>
                    </td>
                    <td class="px-1 cartTitle">
                      <router-link
                        class="titleText"
                        :to="`/productslist/${cart.product._id}`"
                      >{{ cart.product.title }}</router-link>
                    </td>
                    <td class="px-1">{{ cart.qty }} {{ cart.product.unit }}</td>
                    <td class="text-right px-1">${{ cart.total }}</td>
                  </tr>
                  <!-- 判斷購物車是不是空的 -->
                  <tr v-if="!carts.total">
                    <td class="text-center">購物車是空的</td>
                  </tr>
                </tbody>
              </table>
              <router-link
                to="/createorder"
                class="btn bnt-primary d-block mb-2"
                v-if="carts.total"
              >
                <i class="fas fa-cart-arrow-down"></i> 結帳去
              </router-link>
            </div>
          </div>
        </div>

        <div class="favorite">
          <button type="button" class="btn favorite-btn" data-toggle="dropdown">
            <i class="fas fa-heart fa-lg"></i>
            <span class="badge badge-pill badge-danger">
              {{
              favoritesLength
              }}
            </span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <div class="pt-2 px-3">
              <h5 class="text-center">我的最愛</h5>
              <table class="table mb-2">
                <tbody>
                  <tr class="favorite-list" v-for="favorite in favorites" :key="favorite._id">
                    <td class="py-2" width="30">
                      <a
                        href="#"
                        class="text-danger favorite-list-delbtn"
                        @click.prevent="removeFavorite(favorite, false)"
                      >
                        <i class="fas fa-times"></i>
                      </a>
                    </td>
                    <td class="py-2">
                      <router-link
                        :to="`/productslist/${favorite._id}`"
                        class="d-block"
                      >{{ favorite.title }}</router-link>
                    </td>
                  </tr>
                  <tr :class="{ 'd-none': favorites.length }">
                    <td class="text-center">我的最愛是空的</td>
                  </tr>
                </tbody>
              </table>
              <button
                class="btn btn-outline-danger btn-block"
                :class="{ 'd-none': !favorites.length }"
                data-toggle="modal"
                data-target="#delFavoriteModal"
              >刪除全部</button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>

    <!-- footer -->
    <div class="footer">
      <div class="bg-light">
        <ul class="d-md-flex footer">
          <li class="px-4">
            <h5 class="footer-title">James's Shop</h5>
            <p class="text-muted">Manners Maketh Man</p>
          </li>
          <li>
            <h5 class="footer-title">Contact Us</h5>
            <ul>
              <li>
                <a href="tel:+0913089xxx" class="text-muted">TEL： 0913-089-xxx</a>
              </li>
              <li>
                <a href="mailto:Kingsman@mail.com" class="text-muted">Mail： Kingsman@mail.com</a>
              </li>
              <li class="text-muted">地址：Savile Row</li>
            </ul>
          </li>
          <li>
            <h5 class="footer-title">Follow Us</h5>
            <ul>
              <li>
                <span class="fa-stack fa-lg">
                  <a href="https://www.facebook.com/profile.php?id=100002492866957" target="_blank">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                  </a>
                </span>
                <span class="fa-stack fa-lg">
                  <a href="https://github.com/a9261020" target="_blank">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fab fa-github fa-stack-1x fa-inverse"></i>
                  </a>
                </span>
              </li>
              <li>
                <span class="fa-stack fa-lg">
                  <a href="https://www.instagram.com/fish840212/?hl=zh-tw" target="_blank">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                  </a>
                </span>
                <a href="#" class="text-primary">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-line fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div class="copyright">ⓒ 2020 James's Shop by James</div>
      </div>

      <!-- delFavoriteModal -->
      <div
        class="modal fade"
        id="delFavoriteModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="delFavoriteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-danger text-light">
              <h5 class="modal-title" id="delFavoriteModalLabel">刪除 全部我的最愛</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否
              <strong class="text-danger">刪除 全部我的最愛</strong>
              (刪除後將無法回復)
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button
                type="button"
                class="btn btn-outline-danger"
                data-dismiss="modal"
                @click.prevent="removeFavorite('', true)"
              >確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlertMessage from "../components/AlertMessage";

export default {
  components: {
    AlertMessage
  },
  methods: {
    removeFavorite(productItem, delall) {
      this.$store.dispatch("favoritesModules/removeFavorite", {
        favoriteItem: productItem,
        delall
      });
    },
    removeCartItem(id) {
      this.$store.dispatch("cartsModules/removeCartItem", id);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$store.dispatch("updateLoading", true);
      setTimeout(() => {
        this.$store.dispatch("alertMessageModules/updateMessage", {
          message: "已登出",
          status: "warning"
        });
        this.$store.dispatch("updateLoading", false);
      }, 2000);
    }
  },
  computed: {
    isLogin() {
      if (sessionStorage.getItem("token") && sessionStorage.getItem("userId")) {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.$store.dispatch("login", { token, userId, user });
      }
      return this.$store.getters.getisLogin;
    },
    ...mapGetters("cartsModules", ["carts", "cartsLength", "isCartShow"]),
    ...mapGetters("favoritesModules", ["favorites", "favoritesLength"]),
    ...mapGetters(["isLoading", "getisLogin", "getUser"])
  },
  created() {
    this.$store.dispatch("cartsModules/getCart");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_custom.scss";

// navbar
.logo {
  background-color: transparent;
  box-shadow: none;
  font-size: 1.25rem;
  font-weight: bold;
}
.dropdown-menu {
  z-index: 9999;
}

.cart,
.favorite {
  float: right;
  margin-left: 0.25rem;
}

.cartTitle {
  .titleText {
    color: $primary-color;
  }
  :hover {
    text-decoration: none;
    color: $secondary-color;
  }
}

.cart-btn,
.favorite-btn {
  float: right;
  position: relative;
  background-color: transparent;
  text-align: right;
  font-size: inherit;
  .badge {
    position: absolute;
    top: auto;
    bottom: 2px;
    right: -1px;
  }
}

.favorite-list {
  &:hover,
  &:active {
    background-color: $muted-color;
    text-decoration: underline;
  }
  .favorite-list-delbtn:hover,
  .favorite-list-delbtn:active {
    i {
      font-size: 1.25rem;
    }
  }
}

// footer
.footer {
  margin: 0;
  padding: 2rem 2rem 0;
  line-height: 1.5rem;
  > li {
    flex: 1 1 0;
    margin-bottom: 2rem;
    text-align: center;
  }
}
.footer-title {
  margin-bottom: 1.25rem;
  font-weight: bold;
}
.copyright {
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  text-align: center;
}
</style>
