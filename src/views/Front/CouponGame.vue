<template>
  <div class="coupongame">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7 text-center">
          <div class="box my-4 py-4">
            <h2 class="col mb-4">歡迎來到終極密碼</h2>
            <img
              class="img-fluid"
              src="../../../public/static/bannerImg.jpg"
              alt="BannerImg"
            />
            <div class="col">
              若在三次內猜中我心裡所想的數字(介於1~100之間)，將會得到精美小禮物。
            </div>
            <div class="w-100"></div>
            <div class="col">
              總共有三次機會，越快答對，越快答對禮物越好喔。
            </div>
            <button class="btn btn-primary" @click="gameStart" v-if="!inGame">
              Game Start
            </button>
            <!-- game start  -->
            <div
              class="card shadow d-block mx-auto my-2 text-center"
              style="max-width: 18rem;"
              v-else
            >
              <div class="card-header bg-info h4">
                <b>見證奇蹟的時刻!</b>
              </div>
              <div class="card-body">
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(submit)">
                    <ValidationProvider
                      rules="required|numeric|minmax:1,100"
                      v-slot="{ errors }"
                    >
                      <input
                        class="form-control"
                        :class="{ 'is-invalid': errors[0] }"
                        type="text"
                        v-model.number="guess"
                      />
                      <span>{{ errors[0] }}</span>
                      <br />
                    </ValidationProvider>
                    <button class="btn btn-outline-warning mt-3">
                      一猜入魂
                    </button>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import { numeric, required } from "vee-validate/dist/rules";
import { ValidationProvider, extend } from "vee-validate";

extend("required", {
  ...required,
  message: "輸入一個1~100之間的數字"
});

extend("numeric", {
  ...numeric,
  message: "請輸入數字!!!"
});

extend("minmax", {
  validate(number, { min, max }) {
    Math.abs(number);
    return number >= min && number <= max;
  },
  params: ["min", "max"],
  message: "數字必須介於1~100之間"
});

export default {
  data() {
    return {
      inGame: false,
      secretNumber: 0,
      guess: 1,
      times: 0
    };
  },
  components: {
    ValidationProvider
  },
  methods: {
    gameStart() {
      this.inGame = true;
      this.secretNumber = Math.floor(Math.random() * 100);
    },
    submit() {
      // 答對了
      if (this.guess === this.secretNumber) {
        this.inGame = false;
        this.getCoupon();
      } else {
        // 答錯了
        this.times++;
        // 超過次數
        if (this.times >= 3) {
          this.getCoupon();
        }
        // 還有機會
        else {
          swal({
            title: `答錯囉 還有 ${3 - this.times} 次機會`,
            icon: "error"
          });
        }
      }
    },
    getCoupon() {
      switch (this.times) {
        case 0:
          swal({
            title: `恭喜你一次答對`,
            text: "你的折扣碼是 Welcome50% 將會得到50%折扣",
            icon: "success",
            button: "購物去"
          }).then(() => {
            this.$router.push("productslist");
          });
          break;

        case 1:
          swal({
            title: `差了一點點呢`,
            text: "你的折扣碼是 Welcome70% 將會得到70%折扣",
            icon: "success",
            button: "購物去"
          }).then(() => {
            this.$router.push("productslist");
          });
          break;

        case 2:
          swal({
            title: `千鈞一髮`,
            text: "你的折扣碼是 Welcome80% 將會得到80%折扣",
            icon: "warning",
            button: "購物去"
          }).then(() => {
            this.$router.push("productslist");
          });
          break;

        default:
          swal({
            title: `太可惜了，但我還是會給你折扣`,
            text: "你的折扣碼是 Welcome90% 將會得到90%折扣",
            icon: "error",
            button: "購物去"
          }).then(() => {
            this.$router.push("productslist");
          });
      }
    }
  }
};
</script>

<style scoped>
.box {
  line-height: 28px;
  box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.6);
  background-color: rgba(256, 256, 256, 0.9);
  border-radius: 20px;
}

.coupongame {
  background-image: url("../../../public/static/couponBACK.jpg");
  background-size: cover;
  background-position: 50%;
  position: relative;
}
.coupongame::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(201, 186, 186, 0.7);
}
</style>
