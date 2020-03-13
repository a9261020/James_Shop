<template>
  <div>
    <BannerSider />

    <ul class="row m-0 mb-4 category">
      <li
        class="col-lg-2 col-md-4 col-6"
        v-for="(category, index) in categories"
        :key="index"
        @click.prevent="categoryBtn(category.title)"
      >
        <i :class="category.icon"></i>
        <ul class="ml-3">
          <li>{{ category.name }}</li>
          <li>{{ category.title }}</li>
        </ul>
      </li>
    </ul>

    <div class="bg-light discount">
      <div class="mr-2">
        <h5>有緣人將會得到折扣。</h5>
        <small class="text-secondary">A guy is a gentleman by choice</small>
      </div>
      <router-link to="/coupongame" class="btn btn-primary">Be a gentleman</router-link>
    </div>

    <CardSider />

    <!-- news -->
    <div class="row news">
      <div class="col-md-6">
        <div class="mb-4 news-img news-img-1">
          <h3 class="mb-3">MODEL</h3>
        </div>
        <div class="mb-4 news-content">
          <div class="news-border">
            <h3 class="mb-3">Hot Sale</h3>
            <p>Popular Products</p>
            <router-link to="/productslist" class="btn btn-primary">Go Shop</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6 news-reverse">
        <div class="mb-4 news-content">
          <div class="news-border">
            <h3 class="mb-3">New Arrival</h3>
            <p>Summer Clothing</p>
            <router-link to="/productslist" class="btn btn-primary">Shop Now</router-link>
          </div>
        </div>
        <div class="mb-4 news-img news-img-2">
          <h3 class="mb-3">MODEL</h3>
        </div>
      </div>
    </div>

    <!-- joinus -->
    <div class="mb-4 joinus">
      <div class="joinus-content">
        <h3 class="mb-4">Join our mailing list for updates</h3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(joinusBtn)">
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <input
                :class="{ 'is-invalid': errors[0] }"
                class="form-control"
                type="text"
                v-model="email"
              />
              <span>{{ errors[0] }}</span>
              <button class="form-control btn btn-primary mt-3">Subscribe Now</button>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSider from "@/components/BannerSider";
import CardSider from "@/components/CardSider";

export default {
  data() {
    return {
      categories: [
        { name: "ALL", title: "全部商品", icon: "fas fa-gift fa-2x" },
        { name: "TOP", title: "上半身", icon: "fas fa-tshirt fa-2x" },
        { name: "BOTTOM", title: "下半身", icon: "fas fa-socks fa-2x" },
        { name: "SHOES", title: "鞋", icon: "fas fa-shoe-prints fa-2x" },
        { name: "ACCESSORY", title: "飾品", icon: "fas fa-democrat fa-2x" },
        { name: "LIFE", title: "配件", icon: "fas fa-shopping-bag fa-2x" }
      ],
      email: ""
    };
  },
  components: {
    BannerSider,
    CardSider
  },
  methods: {
    categoryBtn(categoryTitle) {
      this.$router.push({
        path: "/productslist",
        query: { category: categoryTitle }
      });
    },
    joinusBtn() {
      this.$store.dispatch("updateLoading", true);

      setTimeout(() => {
        this.$store.dispatch("updateLoading", false);
        this.$store.dispatch("alertMessageModules/updateMessage", {
          message: "訂閱成功",
          status: "success"
        });
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/_custom.scss";

// category
.category {
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    cursor: pointer;
    text-align: center;
    color: $secondary-color;
    transition: all 0.15s ease;
    &:hover {
      background-color: $hot-color;
      color: $primary-color;
    }
  }
  > li:not(:last-child) {
    border-right: rgba(160, 144, 144, 0.5) solid 1px;
    @media (max-width: 992px) {
      border: none;
    }
  }
}

// discount
.discount {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  @media (max-width: 569px) {
    flex-direction: column;
    text-align: center;
    > div {
      margin-bottom: 1rem;
    }
  }
  .btn {
    width: 20%;
    @media (max-width: 569px) {
      width: 100%;
    }
  }
}

//news
.news {
  text-align: center;
  h3 {
    font-family: $font-family-title;
  }
  p {
    font-family: $font-family-text;
  }
}
.news-img {
  padding: 10rem 0;
  color: $white-color;
  text-shadow: 1px 1px 1px $primary-color;
  @media (max-width: 414px) {
    padding: 5rem 0;
  }
}
.news-img-1 {
  background: url("https://images.unsplash.com/photo-1548454782-15b189d129ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80")
    center center no-repeat;
  background-size: cover;
}
.news-img-2 {
  background: url("https://images.unsplash.com/photo-1541758996662-2c3ed5f5675c?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80")
    center center no-repeat;
  background-size: cover;
}
.news-content {
  padding: 2rem;
  background-color: $hot-color;
}
.news-border {
  padding: 2.5rem 0;
  border: 2.5px $white-color solid;
}
@media (max-width: 767px) {
  .news-reverse {
    display: flex;
    flex-direction: column-reverse;
  }
}

//joinus
.joinus {
  padding: 5rem;
  background: url("https://images.unsplash.com/photo-1482954363933-4bed6bbea570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80")
    center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  text-align: center;
  @media (max-width: 767px) {
    padding: 5rem 1rem;
  }
  h3 {
    font-family: $font-family-title;
    color: $white-color;
    text-shadow: 1px 1px 1px $primary-color;
  }
}
.joinus-content {
  padding: 3rem 2rem;
  background: rgba($hot-color, 0.8);
  border-radius: 10px;
}
</style>
