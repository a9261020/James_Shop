<template>
  <div class="mb-4">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in cardsProducts" :key="item._id">
        <ul
          class="sider"
          :style="{ backgroundImage: `url(${item.imageUrl})` }"
          @click.prevent="productBtn(item._id)"
        >
          <li class="sider-tag">
            <div class="sider-triangle"></div>
            <span class="sider-title">{{ item.category }}</span>
          </li>
          <li class="sider-rect">{{ item.title }}</li>
        </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3, // 每一個畫面有幾個swiper-slide
        slidesPerColumn: 2, // 每一個畫面有幾列swiper-slide
        spaceBetween: 15, // swiper-slide間格
        autoplay: {
          // 自動撥放-delay延遲
          delay: 4500
        },
        breakpoints: {
          // 響應式
          991: {
            slidesPerView: 2
          },
          767: {
            slidesPerView: 1
          }
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    productBtn(item_id) {
      this.$router.push({ path: `/productslist/${item_id}` });
    }
  },
  computed: {
    cardsProducts() {
      return this.products.filter(item => item.is_enabled === 1).slice(0, 12);
    },
    ...mapGetters("productsModules", ["products"])
  },
  created() {
    this.$store.dispatch("productsModules/getProducts");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_custom.scss";

.sider {
  position: relative;
  min-height: 250px;
  background-position: center;
  background-size: cover;
  // overflow: hidden 超過視窗也不會出現卷軸
  overflow: hidden;
  border-radius: 0.25rem;
  border: 1px solid $hot-color;
  cursor: pointer;
}

.sider-title {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0.25rem;
  background-color: darken($hot-color, 10%);
  color: #fff;
  text-shadow: 1px 1px 1px #ccc;
}

.sider-rect {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($primary-color, 0.5);
  // 沒被選到時透明度為0
  opacity: 0;
  transition: all 0.2s ease;
  color: $white-color;
  font-size: 1.5rem;
  // letter-spacing 字的間隔
  letter-spacing: 0.2rem;
  &:hover {
    // 滑鼠移過時透明度為1
    opacity: 1;
  }
}
</style>
