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
              <div v-if="!cart.coupon">{{ cart.total }}</div>
              <div v-else>
                <del>{{ cart.total }}</del>
                <div class="text-success mt-2">{{ cart.final_total }}</div>
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
            <td class="text-right">運費</td>
            <td class="text-right">$0</td>
          </tr>
          <tr>
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ carts.total }}</td>
          </tr>
          <tr class="text-success" v-if="carts.total !== carts.final_total">
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td colspan="2" class="text-right">折扣後金額</td>
            <td class="text-right">{{ carts.final_total }}</td>
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
        <div class="input-group-append">
          <button
            v-if="carts.total === carts.final_total"
            class="btn btn-success"
            type="button"
            @click.prevent="addCouponCode"
          >
            套用折價卷
          </button>

          <div v-else>
            <button
              class="btn btn-danger"
              type="button"
              @click.prevent="resetCouponBtn"
            >
              重新輸入折扣碼
            </button>
            <button disabled class="btn btn-success" type="button">
              已套用折價卷
            </button>
          </div>
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

    <!-- step2：填寫訂購資料 -->
    <div v-if="step === 2" class="mb-4">
      <div id="accordion">
        <div class="card mb-4">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                購物車清單
                <i class="fas fa-caret-down"></i>
              </button>
            </h5>
          </div>
          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div class="card-body">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <td>商品</td>
                    <td width="25%">數量</td>
                    <td width="15%">價格</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in carts.carts" :key="cart.id">
                    <td>{{ cart.product.title }}</td>
                    <td>{{ cart.qty }} / {{ cart.product.unit }}</td>
                    <td class="text-right">{{ cart.final_total }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>總計</td>
                    <td class="text-right">{{ carts.final_total }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h5 class="text-center">訂購資料</h5>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrder)">
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="mb-3">
                <h5>Email</h5>
                <input
                  :disabled="getisLogin"
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors[0] }"
                  placeholder="請輸入 Email"
                  v-model="form.user.email"
                />
                <span>{{ errors[0] }} </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="name"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="mb-3">
                <h5>收件人姓名</h5>
                <input
                  :disabled="getisLogin"
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  :class="{ 'is-invalid': errors[0] }"
                  placeholder="請輸入 收件人姓名"
                  v-model="form.user.name"
                />
                <span>{{ errors[0] }} </span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="tel" rules="required" v-slot="{ errors }">
              <div class="mb-3">
                <h5>收件人電話</h5>
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors[0] }"
                  placeholder="請輸入 收件人電話"
                  v-model="form.user.tel"
                />
                <span>{{ errors[0] }} </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="address"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="mb-3">
                <h5>收件人地址</h5>
                <input
                  type="text"
                  name="address"
                  id="address"
                  class="form-control"
                  :class="{ 'is-invalid': errors[0] }"
                  placeholder="請輸入 收件人地址"
                  v-model="form.user.address"
                />
                <span>{{ errors[0] }} </span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="message">
              <div class="mb-3">
                <h5>留言</h5>
                <textarea
                  name="message"
                  id="message"
                  class="form-control"
                  cols="20"
                  rows="5"
                  v-model="form.message"
                ></textarea>
              </div>
            </ValidationProvider>
            <div class="stepBtn">
              <a href="#" class="btn btn-success" @click.prevent="step = 1">
                <i class="fas fa-arrow-left"></i>
                回上一步
              </a>
              <button class="btn btn-danger float-right">
                確認訂購
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <!-- step3：付款/完成訂單 -->
    <div v-if="step === 3" class="mb-4">
      <form @submit.prevent="openPayModal">
        <table class="table mb-3">
          <thead>
            <tr>
              <th>商品</th>
              <th width="25%">數量</th>
              <th width="15%">價格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="orderItem in order.products.carts" :key="orderItem.id">
              <td>{{ orderItem.product.title }}</td>
              <td>{{ orderItem.qty }} / {{ orderItem.product.unit }}</td>
              <td class="text-right">{{ orderItem.total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-success">
              <td></td>
              <td>總計</td>
              <td class="text-right">{{ order.price }}</td>
            </tr>
          </tfoot>
        </table>
        <table class="table mb-3">
          <tr>
            <th width="150">訂購編號</th>
            <td>{{ order.orderNo }}</td>
          </tr>
          <tr>
            <th width="150">訂購人Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>訂購人姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>訂購人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>留言</th>
            <td>{{ order.message }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td v-if="!order.is_paid">尚未付款</td>
            <td class="text-success" v-else>付款成功</td>
          </tr>
        </table>

        <div class="text-right" v-if="!order.is_paid">
          <button class="btn btn-danger" @click="openPayModal">付款去</button>
        </div>
      </form>
    </div>

    <!-- 信用卡付款提示 -->
    <div class="modal fade" id="payModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light">
              確認付款
            </h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="pl-4 col-md-3 right">
                <ul>
                  <li>信用卡卡號</li>
                  <li>信用卡有效月年</li>
                  <li>信用卡末三碼</li>
                </ul>
              </div>
              <div class="col-md left">
                <ul>
                  <li>
                    <div class="form-group row creditCard">
                      <input
                        value="4311"
                        class="form-control col-md-2"
                        disabled
                      />
                      <input
                        value="9522"
                        class="form-control col-md-2"
                        disabled
                      />
                      <input
                        value="2222"
                        class="form-control col-md-2"
                        disabled
                      />
                      <input
                        value="2222"
                        class="form-control col-md-2"
                        disabled
                      />
                    </div>
                  </li>
                  <li>
                    <div class="form-group row creditCard">
                      <select class="form-control col-md-2">
                        <option>3</option>
                      </select>
                      <h5 class="pt-1 mr-1 ml-1">
                        月
                      </h5>
                      <select class="form-control col-md-2">
                        <option>25</option>
                      </select>
                      <h5 class="pt-1 mr-1 ml-1">
                        年
                      </h5>
                    </div>
                  </li>
                  <li>
                    <div class="form-group row creditCard">
                      <input
                        value="222"
                        class="form-control col-md-2"
                        disabled
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="payOrder">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import $ from "jquery";

export default {
  data() {
    return {
      step: 1,
      couponCode: "",
      form: {
        user: {
          userId: "",
          name: this.$store.getters.getUser.name || "",
          email: this.$store.getters.getUser.email || "",
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
      this.$store.dispatch("updateLoading", true);
      const url = "api/getCoupons/useCoupon";
      axios
        .post(url, { couponCode: this.couponCode, cartId: this.carts._id })
        .then(
          res => {
            if (res.data.success) {
              this.$store.dispatch("updateLoading", false);
              this.$store.dispatch("cartsModules/getCart");
              this.$store.dispatch("alertMessageModules/updateMessage", {
                message: res.data.message,
                status: "success"
              });
            }
          },
          err => {
            if (err.response) {
              this.$store.dispatch("updateLoading", false);
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
    },
    resetCouponBtn() {
      this.couponCode = "";
      this.carts.final_total = this.carts.total;
    },
    createOrder() {
      const url = "api/getOrders/createOrder";
      this.form.user.userId = sessionStorage.getItem("userId");
      this.order = this.form;

      this.$store.dispatch("updateLoading", true);

      axios.post(url, { order: this.order, cart: this.carts }).then(
        res => {
          if (res.data.success) {
            this.$store.dispatch("updateLoading", false);

            this.step++;
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
            this.$store.dispatch("cartsModules/getCart");
            this.order = res.data.order;
            this.order.products = JSON.parse(this.order.products);
          }
        },
        err => {
          if (err.response) {
            this.$store.dispatch("updateLoading", false);
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: err.response.data.message,
              status: "danger"
            });
          }
        }
      );
    },
    openPayModal() {
      $("#payModal").modal("show");
    },
    payOrder() {
      const url = `api/getOrders/pay/${this.order._id}`;
      this.$store.dispatch("updateLoading", true);
      axios.post(url, { _id: this.order._id }).then(
        res => {
          if (res.data.success) {
            this.$store.dispatch("updateLoading", false);
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
            this.order.is_paid = true;
            $("#payModal").modal("hide");
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
    }
  },
  computed: {
    ...mapGetters(["getUser", "getisLogin"]),
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

.modal-body {
  .right {
    li {
      margin-bottom: 2rem;
    }
  }

  .left {
    li {
      margin-bottom: 1rem;
    }
    .creditCard {
      input {
        margin-right: 1.25rem;
      }
    }
  }
}
</style>
