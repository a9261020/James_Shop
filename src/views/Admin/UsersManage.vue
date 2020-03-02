<template>
  <div>
    <div class="table-responsive-xl mt-4">
      <table class="table nowrap">
        <thead>
          <tr>
            <th>使用者信箱</th>
            <th class="d-sm-table-cell d-none">使用者名稱</th>
            <th class="d-sm-table-cell d-none">性別</th>
            <th class="d-sm-table-cell d-none">註冊時間</th>
            <th class="d-sm-table-cell d-none">管理員</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.createDate.substring(0, 19).replace("T", " ") }}</td>
            <td class="text-info" v-if="user.isAdmin">{{ user.isAdmin }}</td>
            <td class="text-danger" v-else>{{ user.isAdmin }}</td>
            <td v-if="loginUser.isAdmin">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openUpdateModalBtn(user)"
              >
                調整為管理者
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="updateUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateUserLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-light">
            <h5 class="modal-title" id="updateUserLabel">調整權限</h5>
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
            是否調整
            <strong class="text-danger">{{ this.tempUser.name }}</strong>
            為管理者
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
              @click="updateIsAdminBtn"
            >
              調整
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import $ from "jquery";

export default {
  data() {
    return {
      users: {},
      tempUser: {},
      loginUser: {}
    };
  },
  methods: {
    getUsers() {
      const url = "http://localhost:5000/api/users/getUsers";
      this.$store.dispatch("updateLoading", true);
      axios.get(url).then(res => {
        if (res.data.success) {
          this.$store.dispatch("updateLoading", false);
          this.users = res.data.users;
        }
      });
      this.loginUser = this.getUser;
    },
    openUpdateModalBtn(user) {
      $("#updateUserModal").modal("show");
      this.tempUser = Object.assign({}, user);
    },
    updateIsAdminBtn() {
      const url = "http://localhost:5000/api/users/updateIsAdmin";
      this.$store.dispatch("updateLoading", true);
      axios.post(url, { _id: this.tempUser._id }).then(res => {
        if (res.data.success) {
          this.$store.dispatch("updateLoading", false);
          this.$store.dispatch("alertMessageModules/updateMessage", {
            message: res.data.message,
            status: "success"
          });
          this.getUsers();
          $("#updateUserModal").modal("hide");
        }
      });
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  created() {
    this.getUsers();
  }
};
</script>
