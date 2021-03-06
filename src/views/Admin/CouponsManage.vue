<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠卷
      </button>
    </div>

    <div class="table-responsive-xl mt-4">
      <table class="table nowrap">
        <thead>
          <tr>
            <th>名稱</th>
            <th class="d-sm-table-cell d-none">折扣百分比</th>
            <th class="d-sm-table-cell d-none">到期日</th>
            <th class="d-sm-table-cell d-none">是否啟用</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td class="d-sm-table-cell d-none">{{ item.percent }} %</td>
            <td class="d-sm-table-cell d-none">
              {{ item.due_date.substring(0, 10) }}
            </td>
            <td class="d-sm-table-cell d-none">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span class="text-muted" v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm mr-3"
                  @click="openCouponModal(false, item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="openDelCouponModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- couponModal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="couponModalLabel">優惠卷</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                id="title"
                class="form-control"
                placeholder="請輸入標題"
                v-model="tempCoupon.title"
              />
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input
                type="text"
                id="code"
                class="form-control"
                placeholder="請輸入優惠碼"
                v-model="tempCoupon.code"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="date"
                id="due_date"
                class="form-control"
                placeholder="請輸入到期日"
                v-model="due_date"
              />
            </div>
            <div class="form-group">
              <label for="percent">打折百分比</label>
              <input
                type="number"
                id="percent"
                class="form-control"
                placeholder="請輸入打折百分比"
                v-model="tempCoupon.percent"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="is_enabled"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                />
                <label class="form-check-label" for="is_enabled"
                  >是否啟用</label
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              更新優惠卷
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delCouponModal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delCouponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="delCouponModalLabel">刪除優惠卷</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷
            (刪除後將無法回復)
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="delCoupon"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: "",
        code: ""
      },
      due_date: "",
      isNew: false,
      pagination: {}
    };
  },
  watch: {
    due_date() {
      this.tempCoupon.due_date = this.due_date;
    }
  },
  methods: {
    getCoupons() {
      const url = "/api/getCoupons";
      this.$store.dispatch("updateLoading", true);
      axios.get(url).then(res => {
        if (res.data.success) {
          this.coupons = res.data.data;
          this.$store.dispatch("updateLoading", false);
        } else {
          this.$store.dispatch("alertMessageModules/updateMessage", {
            message: res.data.message,
            status: "danger"
          });
        }
        this.$store.dispatch("updateLoading", false);
      });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      $("#couponModal").modal("show");
      if (this.isNew) {
        this.tempCoupon = {};
        this.due_date = "";
      } else {
        // 複製item
        this.tempCoupon = Object.assign({}, item);
        // 回存的類型不是字串，所以只截前面十個字，才有辦法在更新的時候完整顯示日期
        this.due_date = this.tempCoupon.due_date.substring(0, 10);
      }
    },
    updateCoupon() {
      if (this.isNew) {
        const url = "/api/getCoupons/addNewCoupon";
        axios.post(url, { data: this.tempCoupon }).then(res => {
          if (res) {
            this.getCoupons();
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
          }
        });
      } else {
        const url = "/api/getCoupons/";
        axios.post(url, this.tempCoupon).then(res => {
          if (res) {
            this.getCoupons();
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
          }
        });
      }
      $("#couponModal").modal("hide");
    },
    openDelCouponModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $("#delCouponModal").modal("show");
    },
    delCoupon() {
      axios
        .delete(`/api/getCoupons/deleteCoupon/${this.tempCoupon._id}`)
        .then(res => {
          if (res) {
            $("#delCouponModal").modal("hide");
            this.getCoupons();
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "danger"
            });
          }
        });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>
