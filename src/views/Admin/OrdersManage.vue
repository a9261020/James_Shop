<template>
  <div>
    <div class="table-responsive-xl">
      <table class="table nowrap">
        <thead>
          <tr>
            <th class="text-center">購買時間</th>
            <th class="d-sm-table-cell d-none text-center">Email</th>
            <th class="d-lg-table-cell d-none text-center">購買款項</th>
            <th class="text-center">應付金額</th>
            <th class="d-sm-table-cell d-none text-center">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{ 'bg-light': order.is_paid }"
            v-for="order in orders"
            :key="order.id"
          >
            <td class="text-center">{{ order.createDate }}</td>
            <td class="d-sm-table-cell d-none" v-if="order.user">
              {{ order.user.email }}
            </td>

            <td class="d-lg-table-cell d-none">
              <ul class="list-unstyled">
                <li v-for="(item, index) in orders" :key="index">
                  {{ item.products.title }}:{{ item.products.qty
                  }}{{ item.products.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ order.total }}</td>
            <td class="d-sm-table-cell d-none text-center">
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
