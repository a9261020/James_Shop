<template>
  <div class="mb-4 silder-wrap">
    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="sider sider-1">
          <div class="sider-rect"></div>
          <div class="sider-content">
            <h3 class="h5 mb-3">James Shop</h3>
            <p class="mb-0">James Shop 應有盡有，歡迎您來買</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sider sider-left sider-2">
          <div class="sider-rect"></div>
          <div class="sider-content">
            <h3 class="h5 mb-3">情人節特賣會</h3>
            <p class="mb-0">精選情人節禮物，等你來挑</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sider sider-3">
          <div class="sider-rect"></div>
          <div class="sider-content">
            <h3 class="h5 mb-3">2020，新年快樂</h3>
            <p class="mb-0">新的一年，給自己最好的</p>
          </div>
        </div>
      </swiper-slide>
      <div
        class="swiper-pagination swiper-pagination-white"
        slot="pagination"
      ></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 4500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/_custom.scss";
.silder-wrap {
  position: relative;
}

.swiper-container {
  width: 100%;
  height: 500px;
  @media (max-width: 767px) {
    height: 400px;
  }
}

.sider {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media (max-width: 767px) {
    flex-direction: column;
  }
}

.sider-left {
  flex-direction: row-reverse;
  @media (max-width: 767px) {
    flex-direction: column;
  }
}

.sider-rect {
  flex: 1.5;
  margin: 2.5rem;
  border: solid $hot-color 3px;
}

.sider-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: rgba($hot-color, 0.9);
}

.sider-1 {
  background-image: url("https://images.unsplash.com/photo-1515678916313-2263ebfad5cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
}
.sider-2 {
  background-image: url("https://images.unsplash.com/photo-1509803992307-5ed1ac32efda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
}
.sider-3 {
  background-image: url("https://images.unsplash.com/photo-1456769965965-63334afeaeb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
}
</style>
