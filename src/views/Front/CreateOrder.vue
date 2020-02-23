<template>
  <div>
    <ul class="mb-4 step">
      <li class="bg-light" :class="{ 'bg-dark text-light active': step === 1 }">
        <strong>STEP</strong>
        <h3>
          <strong>01</strong>
        </h3>
        <p class="h6">確認購物清單</p>
      </li>
      <li class="bg-light" :class="{ 'bg-dark text-light active': step === 2 }">
        <strong>STEP</strong>
        <h3>
          <strong>02</strong>
        </h3>
        <p class="h6">填寫訂購資料</p>
      </li>
      <li class="bg-light" :class="{ 'bg-dark text-light active': step === 3 }">
        <strong>STEP</strong>
        <h3>
          <strong>03</strong>
        </h3>
        <p class="h6">付款/完成訂單</p>
      </li>
    </ul>

    <!-- step1：確認購物清單 -->
    <div class="table-responsive" v-if="step === 1">
      <table class="table mb-4">
        <thead>
          <tr>
            <th class="d-md-table-cell d-none text-center" width="20%">縮圖</th>
            <th class="text-center">商品名稱</th>
            <th class="d-sm-table-cell d-none text-center" width="20%">數量</th>
            <th class="text-center" width="15%">價格</th>
            <th class="text-center" width="15%">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td class="d-md-table-cell d-none text-center">
              <div
                class="thumbnail"
                :style="{ backgroundImage: `url(${cart.product.imageUrl})` }"
              ></div>
            </td>
            <td>
              {{ cart.product.title }}
              <div class="text-success mt-2" v-if="cart.coupon">
                已套用折價卷 - [{{ cart.coupon.code }}]
              </div>
            </td>
            <td class="d-sm-table-cell d-none text-center">
              {{ cart.qty }} / {{ cart.product.unit }}
            </td>
            <td class="text-right">
              <div v-if="!cart.coupon">
                {{ cart.total }}
              </div>
              <div v-else>
                <del>{{ cart.total }}</del>
                <div class="text-success mt-2">
                  {{ cart.final_total }}
                </div>
              </div>
            </td>
            <td class="text-center">
              <a
                href="#"
                class="text-danger"
                @click.prevent="removeCartItem(cart.id)"
              >
                <i class="fas fa-trash-alt"></i>
              </a>
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-light table-borderless border-top">
          <tr>
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td class="text-right">共 {{ cartsLength }} 件</td>
            <td class="text-right">
              運費
            </td>
            <td class="text-right">
              $0
            </td>
          </tr>
          <tr>
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td colspan="2" class="text-right">
              總計
            </td>
            <td class="text-right">
              {{ carts.total }}
            </td>
          </tr>
          <tr class="text-success" v-if="carts.total !== carts.final_total">
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td colspan="2" class="text-right">
              折扣後金額
            </td>
            <td class="text-right">
              {{ carts.final_total }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="請輸入折價卷代碼"
          v-model="couponCode"
        />
        <div class="input-group-append" @click.prevent="addCouponCode">
          <button class="btn btn-success" type="button">套用折價卷</button>
        </div>
      </div>
      <div class="mb-4 stepBtn">
        <router-link to="/productslist" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i>
          繼續購買
        </router-link>
        <a
          href="#"
          class="btn btn-danger d-inline-block"
          @click.prevent="step = 2"
        >
          下一步，填寫訂購資料
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      step: 1,
      couponCode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      orderId: "",
      order: {
        user: {
          email: "",
          name: "",
          tel: "",
          address: ""
        }
      }
    };
  },
  methods: {
    addCouponCode() {
      const url = "http://localhost:5000/api/getCoupons/useCoupon";
      axios.post(url, { couponCode: this.couponCode }).then(
        res => {
          if (res) {
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
          }
        },
        err => {
          if (err.response) {
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: err.response.data.message,
              status: "danger"
            });
          }
        }
      );
    },
    removeCartItem(id) {
      this.$store.dispatch("cartsModules/removeCartItem", id);
    }
  },
  computed: {
    ...mapGetters("cartsModules", ["carts", "cartsLength"])
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/_custom.scss";

.step {
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: center;
  li {
    padding: 0.25rem 3rem;
    @media (max-width: 767px) {
      display: none;
    }
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
  }
  @media (max-width: 767px) {
    .active {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
.thumbnail {
  margin: auto;
  background-size: cover;
  width: 80px;
  height: 80px;
}
.stepBtn {
  display: flex;
  justify-content: space-between;
  @media (max-width: 414px) {
    flex-direction: column;
    a:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
