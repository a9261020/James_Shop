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
        <h5>限時 counpon 大放送</h5>
        <small class="text-secondary">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis animi
          molestias aliquam dignissimos minima fugit officiis labore dolore
          aliquid, vero, soluta est quibusdam. Adipisci voluptas aut unde
          aliquid numquam vero!
        </small>
      </div>
      <router-link to="/coupongame" class="btn btn-primary"
        >立即領取</router-link
      >
    </div>

    <CardSider />

    <!-- news -->
    <div class="row news">
      <div class="col-md-6">
        <div class="mb-4 news-img news-img-1">
          <h3 class="mb-3">MODEL</h3>
          <h3>I'm Sophia</h3>
        </div>
        <div class="mb-4 news-content">
          <div class="news-border">
            <h3 class="mb-3">Hot Sale</h3>
            <p>Popular Products</p>
            <router-link to="/productslist" class="btn btn-primary"
              >Go Shop</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-md-6 news-reverse">
        <div class="mb-4 news-content">
          <div class="news-border">
            <h3 class="mb-3">New Arrival</h3>
            <p>Summer Clothing</p>
            <router-link to="/productslist" class="btn btn-primary"
              >Shop Now</router-link
            >
          </div>
        </div>
        <div class="mb-4 news-img news-img-2">
          <h3 class="mb-3">MODEL</h3>
          <h3>I'm Jessica</h3>
        </div>
      </div>
    </div>

    <!-- joinus -->
    <div class="mb-4 joinus">
      <div class="joinus-content">
        <h3 class="mb-4">Join our mailing list for updates</h3>
        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <input
            :class="{ 'is-invalid': errors[0] }"
            class="form-control"
            type="email"
            v-model="email"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <button
          type="button"
          class="form-control btn btn-primary mt-3"
          @click="joinusBtn"
        >
          Subscribe Now
        </button>
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
    joinusBtn() {}
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
  background: url("https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=642&q=80")
    center center no-repeat;
  background-size: cover;
}
.news-img-2 {
  background: url("https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=630&q=80")
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
  background: url("https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")
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
