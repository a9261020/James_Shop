<template>
  <div>
    <div class="table-responsive-xl mt-4">
      <table class="table nowrap">
        <thead>
          <tr>
            <th>客戶名稱</th>
            <th class="d-sm-table-cell d-none">留言內容</th>
            <th class="d-sm-table-cell d-none">留言日期</th>
            <th class="d-sm-table-cell d-none">回覆內容</th>
            <th class="d-sm-table-cell d-none">回覆日期</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(message, index) in messages" :key="index">
            <td>{{ message.userName }}</td>
            <td>{{ message.context }}</td>
            <td>
              {{ message.createDate.substring(0, 19).replace("T", " ") }}
            </td>
            <td>{{ message.reply }}</td>
            <td v-if="!message.is_reply">尚未回覆</td>
            <td v-else>
              {{ message.replyDate.substring(0, 19).replace("T", " ") }}
            </td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm mr-3"
                @click="openMessageModal(message)"
              >
                回覆
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="removeMessage(message)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- messageModal -->
    <div
      class="modal fade"
      id="messageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="messageModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="messageModalLabel">回覆留言</h5>
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
              <label for="userName">使用者名稱</label>
              <input
                disabled
                type="text"
                id="userName"
                class="form-control"
                placeholder="使用者名稱"
                v-model="tempMessage.userName"
              />
            </div>
            <div class="form-group">
              <label for="context">使用者留言</label>
              <textarea
                disabled
                name="context"
                class="form-control"
                cols="30"
                rows="10"
                placeholder="使用者留言"
                v-model="tempMessage.context"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="reply">回覆內容</label>
              <textarea
                v-model="tempMessage.reply"
                class="form-control"
                cols="30"
                rows="10"
              ></textarea>
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
            <button
              type="button"
              class="btn btn-primary"
              @click="replyMessageBtn"
            >
              回覆
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- deleteModal -->
    <div
      class="modal fade"
      id="delMessageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delMessageModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="delMessageModalLabel">刪除留言</h5>
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
            <strong class="text-danger"> {{ tempMessage.userName }}</strong>
            的留言 (刪除後將無法回復)
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
              @click="delMessage"
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
import axios from "axios";
import $ from "jquery";

export default {
  data() {
    return {
      messages: {},
      tempMessage: {}
    };
  },
  methods: {
    getMessages() {
      const url = "http://localhost:5000/api/messages/getMessages";
      this.$store.dispatch("updateLoading", true);
      axios.get(url).then(res => {
        this.$store.dispatch("updateLoading", false);
        this.messages = res.data.messages;
      });
    },
    openMessageModal(message) {
      $("#messageModal").modal("show");
      this.tempMessage = Object.assign({}, message);
    },
    replyMessageBtn() {
      const url = "http://localhost:5000/api/messages/replyMessage";
      this.$store.dispatch("updateLoading", true);
      axios.post(url, this.tempMessage).then(
        res => {
          if (res.data.success) {
            this.$store.dispatch("updateLoading", false);
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
            $("#messageModal").modal("hide");
            this.tempMessage = {};
            this.getMessages();
          }
        },
        err => {
          if (err) {
            this.$store.dispatch("updateLoading", false);
          }
        }
      );
    },
    removeMessage(message) {
      $("#delMessageModal").modal("show");
      this.tempMessage = Object.assign({}, message);
    },
    delMessage() {
      const url = `http://localhost:5000/api/messages/deleteMessage/${this.tempMessage._id}`;
      this.$store.dispatch("updateLoading", true);
      axios.delete(url).then(
        res => {
          if (res.data.success) {
            this.$store.dispatch("updateLoading", false);
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: res.data.message,
              status: "success"
            });
            $("#delMessageModal").modal("hide");
            this.getMessages();
          }
        },
        err => {
          if (err) {
            this.$store.dispatch("updateLoading", false);
            this.$store.dispatch("alertMessageModules/updateMessage", {
              message: err.response.data.message,
              status: "danger"
            });
            this.getMessages();
          }
        }
      );
    }
  },
  created() {
    this.getMessages();
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
