<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent px-0">
      <router-link class="navbar-brand logo" to="/">James's Shop</router-link>
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

      <div
        class="collapse navbar-collapse toggle-menu"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav align-items-center w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/productslist"
              :class="{
                active: $route.name === 'ProductsList' && 'router-link-active'
              }"
              >Products</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/coupongame">Coupons</router-link>
          </li>
          <li class="nav-item ml-lg-auto pt-1">
            <router-link class="nav-link" to="/login">
              <i class="fas fa-user-circle fa-lg"></i>
            </router-link>
          </li>
        </ul>

        <div class="btn-group cart">
          <button type="button" class="btn cart-btn" data-toggle="dropdown">
            <i class="fas fa-shopping-cart fa-lg"></i>
            <!-- 計算現在購物車的長度 -->
            <span class="badge badge-pill badge-danger">1</span>
          </button>

          <div class="dropdown-menu dropdown-menu-right">
            <div class="p-2 px-sm-3">
              <h5 class="text-center">購物車清單</h5>
              <table class="table mb-2">
                <tbody>
                  <tr v-for="cart in 4" :key="cart">
                    <td class="px-1">
                      <a href="#" class="text-danger">
                        <i class="fas fa-trash-alt"></i>1
                      </a>
                    </td>
                    <td class="px-1">{{ cart }}</td>
                    <td class="px-1">{{ cart }}</td>
                    <td class="px-1">{{ cart }}</td>
                  </tr>
                  <!-- 判斷購物車是不是空的 -->
                  <!-- <tr v-if="!cart">
                    <td class="text-center">購物車是空的
                      </td>
                  </tr>-->
                </tbody>
              </table>
              <router-link
                to="/createorder"
                class="btn bnt-primary d-block mb-2"
              >
                <i class="fas fa-cart-arrow-down"></i> 結帳去
              </router-link>
            </div>
          </div>
        </div>

        <div class="btn-group favorite">
          <button type="button" class="btn favorite-btn" data-toggle="dropdown">
            <i class="fas fa-heart fa-lg"></i>
            <span class="badge badge-pill badge-danger">1</span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <div class="pt-2 px-3">
              <h5 class="text-center">我的最愛</h5>
              <table class="table mb-2">
                <tbody>
                  <tr
                    class="favorite-list"
                    v-for="favorite in 4"
                    :key="favorite"
                  >
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
                        :to="`/productslist/${favorite}`"
                        class="d-block"
                        >{{ favorite }}</router-link
                      >
                    </td>
                  </tr>
                  <tr :class="{ 'd-none': true }">
                    <td class="text-center">我的最愛是空的</td>
                  </tr>
                </tbody>
              </table>
              <button
                class="btn btn-outline-danger btn-block"
                :class="{ 'd-none': !true }"
                data-toggle="modal"
                data-target="#delFavoriteModal"
              >
                刪除全部
              </button>
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
            <p class="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              recusandae fugiat, nemo harum nobis laborum expedita vero
              repellendus consectetur nostrum.
            </p>
          </li>
          <li>
            <h5 class="footer-title">Contact Us</h5>
            <ul>
              <li>
                <a href="tel:+1234567890" class="text-muted"
                  >TEL： 12345678910</a
                >
              </li>
              <li>
                <a href="mailto:carolshop@mail.com" class="text-muted"
                  >Mail： carolshop@mail.com</a
                >
              </li>
              <li class="text-muted">地址： 地球上的某一個角落</li>
            </ul>
          </li>
          <li>
            <h5 class="footer-title">Follow Us</h5>
            <ul>
              <li>
                <a href="#" class="text-primary">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
                <a href="#" class="text-primary">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" class="text-primary">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/_custom.scss";

.logo {
  background-color: transparent;
  box-shadow: none;
  font-size: 1.25rem;
  font-weight: 600;
}
.dropdown-menu {
  // 永遠在上層的概念
  z-index: 9999;
}

.cart,
.favorite {
  float: right;
  margin-left: 0.25rem;
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
