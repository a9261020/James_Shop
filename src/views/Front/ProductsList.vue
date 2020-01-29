<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item active">產品列表</li>
        <li class="breadcrumb-item active">{{ select }}</li>
        <li class="breadcrumb-item active" v-if="filterText">搜尋 {{ filterText }}</li>
      </ol>
    </nav>

    <div class="row mb-2">
      <div class="col-lg-2 col-md-3 mb-3">
        <div class="sticky-top">
          <ul class="list-group mb-3 category">
            <li
              class="list-group-item list-group-item-action h6"
              v-for="(category, index) in categories"
              :key="index"
              :class="{'active': select == category.title}"
              @click="getCategory(category.title)"
            >
              <i :class="category.icon"></i>
              {{ category.title }}
            </li>
          </ul>
          <form class="input-group mb-3" @submit.prevent="search">
            <input type="search" class="form-control" placeholder="search" v-model="searchText" />
            <div class="input-group-append">
              <button class="input-group-text bg-light">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-10 col-md-9">
        <div
          class="mb-2 text-left text-muted"
          v-if="filterText"
        >we found {{ filterProducts.length }} result for "{{ filterText }}"</div>

        <div class="card-columns">
          <div class="card text-primary product-card" v-for="product in 8" :key="product">
            <div
              :style="{background: `url(${product}) center center no-repeat`,
            backgroundSize: 'cover', height:'200px'}"
            ></div>
            <div class="favorite">
              <a class="text-danger" v-if="product" @click.prevent="removeFavorite(product, false)">
                <i class="fas fa-heart fa-lg"></i>
              </a>
              <a class="text-danger" v-else @click.prevent="addFavorite(product)">
                <i class="far fa-heart fa-lg"></i>
              </a>
            </div>
            <div class="card-body py-2">
              <h5 class="card-title mb-0">{{ product }}</h5>
              <div class="d-flex align-items-baseline">
                <p class="card-text text-secondary mb-0" v-if="product">
                  <del>{{ product }}</del>
                </p>
                <p class="card-text ml-auto h5" :class="{'text-danger': product}">NT {{ product }}</p>
              </div>
            </div>
            <div class="product-more">
              <router-link :to="`/productslist/${product}`">查看更多</router-link>
              <a href="#" @click.prevent="addToCart(product)">加到購物車</a>
            </div>
            <div class="product-soldout" v-if="!product">
              <button class="btn btn-danger border" disabled>Sold Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: "全部商品",
      filterText: "",
      searchText: "",
      categories: [
        { title: "全部商品", icon: "fas fa-gift" },
        { title: "上半身", icon: "fas fa-tshirt" },
        { title: "下半身", icon: "fas fa-socks" },
        { title: "鞋", icon: "fas fa-shoe-prints" },
        { title: "飾品", icon: "fas fa-democrat" },
        { title: "配件", icon: "fas fa-shopping-bag" }
      ]
    };
  },
  methods: {
    getCategory(category) {
      this.select = category;
      if (this.filterText) {
        this.filterText = "";
      }
      if (this.$route.query.category) {
        this.$router.push("/productslist");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_custom.scss";

// category
.category {
  cursor: pointer;
}

// favorite
.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  a {
    cursor: pointer;
    font-size: 1rem;
  }
}

.product-more {
  display: flex;
  padding-top: 0.2rem;
  text-align: center;
  a {
    flex: 1;
    padding: 0.5rem 0;
    border-top: 1px solid $hot-color;
    &:first-child {
      border-right: 1px solid $hot-color;
    }
    &:hover {
      background: $hot-color;
    }
  }
}
.product-soldout {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $font-family-title;
  background-color: rgba($secondary-color, 0.3);
}
@media (max-width: 991px) {
  .card-columns {
    column-count: 2;
  }
}
@media (max-width: 767px) {
  .card-columns {
    column-count: 1;
  }
}
</style>