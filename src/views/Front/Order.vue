<template>
  <div>
    <!-- 沒登入的話 -->
    <div v-if="!getisLogin">
      <Login />
    </div>
    <div class="container p-5" v-else>
      <div v-if="this.orders.length == 0">
        <h1 class="text-center">目前沒有購買紀錄</h1>
      </div>
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
            <li class="text-secondary">{{ order.createDate.substring(0, 19).replace("T", " ") }}</li>
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
        <div class="col-md-3 col-12 border-left text-center pt-4">
          <button
            class="btn btn-info mr-2"
            data-toggle="collapse"
            :data-target="`#collapse-${order.orderNo}`"
          >查看明細</button>
          <button class="btn btn-warning">前往付款</button>
        </div>
        <div class="collapse bg-white col-md-12" :id="`collapse-${order.orderNo}`">
          <table class="table">
            <thead>
              <tr>
                <th>圖片</th>
                <th>名稱</th>
                <th>數量</th>
                <th v-if="order.products.total === order.products.final_total">金額</th>
                <th v-else>使用優惠券</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in order.products.carts" :key="index">
                <td>{{ cart.product.imgUrl }}</td>
                <td>{{ cart.product.title }}</td>
                <td>{{ cart.qty }} {{ cart.product.unit }}</td>
                <td v-if="order.products.total === order.products.final_total">$ {{ cart.total }}</td>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "../Login";
import axios from "axios";

export default {
  data() {
    return {
      orders: {}
    };
  },
  components: {
    Login
  },
  methods: {
    getOrders() {
      const url = `http://localhost:5000/api/getOrders/${this.getUser._id}`;
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
