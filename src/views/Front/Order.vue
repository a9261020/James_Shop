<template>
  <div>
    <!-- 沒登入的話 -->
    <!-- <div v-if="!getisLogin">
      <Login />
    </div> -->
    {{ getUser }}
    <div class="container p-5">
      <div class="row">
        <div class="col-12 mb-4">
          <button class="btn btn-primary">
            歷史訂單
          </button>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-2 ">圖片</div>
        <div class="col-4 ">
          <ul>
            <li class="mb-2">1</li>
            <li class="mb-2">2</li>
          </ul>
        </div>
        <div class="col-3 ">
          <ul>
            <li class="mb-2">1</li>
            <li class="mb-2">2</li>
          </ul>
        </div>
        <div class="col-3 border-left text-center pt-3">
          <button class="btn btn-info ">查看明細</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Login from "../Login";
import axios from "axios";

export default {
  components: {
    // Login
  },
  methods: {
    getOrders() {
      const url = `http://localhost:5000/api/getOrders/${this.getUser._id}`;
      axios.get(url).then(res => console.log(res));
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
