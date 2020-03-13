<template>
  <div>
    <!-- 尚未登入 -->
    <div v-if="!getisLogin">
      <Login />
    </div>
    <!-- 登入 -->
    <div class="container p-5" v-else>
      <!-- 還沒購買過 -->
      <div v-if="this.orders.length == 0">
        <h1 class="text-center">目前沒有購買紀錄</h1>
      </div>
      <!-- 訂單 -->
      <div v-else class="row col-md-12 mb-4">
        <button class="btn btn-primary">歷史訂單 ({{ orders.length }})</button>
      </div>
      <div class="row mb-4 bg-light" v-for="order in orders" :key="order._id">
        <div class="col-md-2 col-12 pt-1">圖片</div>
        <div class="col-md-4 col-12 pt-1">
          <ul>
            <li class="mb-3">
              訂單編號
              <h5 class="d-inline-flex">
                <strong class="text-danger">{{ order.orderNo }}</strong>
              </h5>
            </li>
            <li class="text-secondary">
              {{ order.createDate.substring(0, 19).replace("T", " ") }}
            </li>
          </ul>
        </div>
        <div class="col-md-3 col-12 text-right pt-1">
          <ul>
            <li class="mb-3 text-danger" v-if="!order.is_paid">未付款</li>
            <li class="mb-3 text-success" v-else>已付款</li>
            <li class>
              訂單金額
              <h5 class="d-inline-flex">
                <strong class="text-danger">$ {{ order.price }}</strong>
              </h5>
            </li>
          </ul>
        </div>
        <div class="col-md-3 col-12 detailsBtn text-center pt-4">
          <button
            class="btn btn-info mr-4"
            data-toggle="collapse"
            :data-target="`#collapse-${order.orderNo}`"
          >
            查看明細
          </button>
          <button
            class="btn btn-warning"
            @click="openPayModal(order._id)"
            v-if="!order.is_paid"
          >
            前往付款
          </button>
        </div>
        <div
          class="collapse bg-white col-md-12"
          :id="`collapse-${order.orderNo}`"
        >
          <table class="table">
            <thead>
              <tr>
                <th>圖片</th>
                <th>名稱</th>
                <th>數量</th>
                <th v-if="order.products.total === order.products.final_total">
                  金額
                </th>
                <th v-else>使用優惠券</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in order.products.carts" :key="index">
                <td>
                  <img
                    :src="cart.product.imageUrl"
                    :alt="cart.product.title"
                    class="thumbnail"
                  />
                </td>
                <td>{{ cart.product.title }}</td>
                <td>{{ cart.qty }} {{ cart.product.unit }}</td>
                <td v-if="order.products.total === order.products.final_total">
                  $ {{ cart.total }}
                </td>
                <td v-else class="text-success">使用優惠券</td>
              </tr>
            </tbody>
          </table>
          <div class="col-md-12 bg-muted">
            <ul>
              <li class="mb-3">收貨人姓名：{{ order.user.name }}</li>
              <li class="mb-3">收貨人電話：{{ order.user.tel }}</li>
              <li class="mb-3">收貨人地址：{{ order.user.address }}</li>
              <li class="mb-3">留言：{{ order.message }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 信用卡付款提示 -->
    <div class="modal fade" id="payModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light">確認付款</h5>
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
                      <h5 class="pt-1 mr-1 ml-1">月</h5>
                      <select class="form-control col-md-2">
                        <option>25</option>
                      </select>
                      <h5 class="pt-1 mr-1 ml-1">年</h5>
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
            <button type="button" class="btn btn-primary" @click="payOrderBtn">
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
import Login from "../Login";
import axios from "axios";
import $ from "jquery";

export default {
  data() {
    return {
      orders: {},
      tempOrder: ""
    };
  },
  components: {
    Login
  },
  methods: {
    getOrders() {
      const url = `api/getOrders/${this.getUser._id}`;
      axios.get(url).then(res => {
        if (res.data.success) {
          if (res.data.order.length == 1) {
            this.orders = Object.assign({}, res.data.order);
          }

          this.orders = res.data.order;
          this.orders.forEach(item => {
            item.products = JSON.parse(item.products);
          });
        }
      });
    },
    openPayModal(orderId) {
      $("#payModal").modal("show");
      this.tempOrder = orderId;
    },
    payOrderBtn() {
      const url = `api/getOrders/pay/${this.tempOrder}`;
      this.$store.dispatch("updateLoading", true);
      axios.post(url, { _id: this.tempOrder }).then(
        res => {
          if (res.data.success) {
            this.$store.dispatch("updateLoading", false);
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
            this.getOrders();
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
    ...mapGetters(["getisLogin", "getUser"])
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  height: 80px;
  width: 80px;
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

.detailsBtn {
  border-left: 1px rgba(179, 165, 165, 0.5) solid;
  @media (max-width: 480px) {
    padding-left: 10px;
    border-top: 1px rgba(179, 165, 165, 0.5) solid;
    border-left: none;
    margin-bottom: 1.25rem;
  }
}
</style>
