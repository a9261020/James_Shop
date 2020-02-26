<template>
  <div>
    <div class="table-responsive-xl">
      <table class="table nowrap">
        <thead>
          <tr>
            <th>購買時間</th>
            <th class="d-sm-table-cell d-none ">Email</th>
            <th class="d-lg-table-cell d-none ">購買款項</th>
            <th class="text-right">應付金額</th>
            <th class="d-sm-table-cell d-none ">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{ 'bg-light': order.is_paid }"
            v-for="order in orders"
            :key="order._id"
          >
            <td>{{ order.createDate }}</td>
            <td class="d-sm-table-cell d-none" v-if="order.user">
              {{ order.user.email }}
            </td>

            <td class="d-lg-table-cell d-none">
              <ul class="list-unstyled">
                <li v-for="(item, index) in order.products.carts" :key="index">
                  {{ item.product.title }}:{{ item.qty }}{{ item.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ order.price }}</td>
            <td class="d-sm-table-cell d-none ">
              <strong class="text-success" v-if="order.is_paid">已付款</strong>
              <span class="text-muted" v-else>尚未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: {}
    };
  },
  methods: {
    getOrder() {
      const url = "http://localhost:5000/api/getOrders";
      axios.get(url).then(res => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.orders.forEach(item => {
            item.products = JSON.parse(item.products);
          });
        }
      });
    }
  },
  created() {
    this.getOrder();
  }
};
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
}
</style>
