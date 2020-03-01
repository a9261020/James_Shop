<template>
  <div class="container">
    <div class="row p-4">
      <!-- 左 -->
      <div class="col-md-6 mb-3">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createNewMessageBtn)">
            <div class="mb-3">
              <input
                :disabled="getisLogin"
                class="form-control"
                type="text"
                placeholder="請輸入名稱"
                v-model="newMessage.userName"
              />
            </div>

            <ValidationProvider
              name="newMessage"
              rules="max:50|required"
              v-slot="{ errors }"
            >
              <div class="mb-3">
                <textarea
                  placeholder="最多只能輸入50個字"
                  :class="{ 'is-invalid': errors[0] }"
                  class="form-control"
                  rows="10"
                  v-model="newMessage.context"
                ></textarea>
                <span class="font-weight-bold text-danger "
                  >{{ errors[0] }}
                </span>
              </div>
            </ValidationProvider>
            <div class="submitBtn ">
              <button class="mr-5 btn btn-primary">
                送出留言
              </button>
              <a href="#" class="btn btn-danger" @click="resetMessageBtn"
                >清除留言</a
              >
            </div>
          </form>
        </ValidationObserver>
      </div>

      <!-- 右 -->
      <div class="col-md-6">
        <!-- 卡片 -->
        <div id="card">
          <div class="card mb-3" v-for="message in messages" :key="message._id">
            <div class="card-header">
              <a
                class="card-link"
                data-toggle="collapse"
                :href="`#message-${message._id}`"
              >
                <blockquote class="blockquote">
                  <p class="mb-1">
                    {{ message.context }}
                  </p>
                  <footer class="blockquote-footer">
                    {{ message.userName }} & {{ message.createDate }}
                    <div v-if="!message.is_reply" class="text-danger mt-1">
                      尚未回覆
                    </div>
                    <div v-else class="text-success">已回覆</div>
                  </footer>
                </blockquote>
              </a>
            </div>
            <div :id="`message-${message._id}`" class="collapse">
              <div class="card-body">
                {{ message.reply }}
              </div>
            </div>
          </div>

          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      newMessage: {
        userName: this.$store.getters.getUser.name,
        context: ""
      },
      messages: {},
      created: "Hello"
    };
  },
  methods: {
    createNewMessageBtn() {
      const url = "http://localhost:5000/api/messages/addMessage";
      this.$store.dispatch("updateLoading", true);
      axios.post(url, this.newMessage).then(res => {
        if (res.data.success) {
          this.$store.dispatch("alertMessageModules/updateMessage", {
            message: res.data.message,
            status: "success"
          });
          this.$store.dispatch("updateLoading", false);
          if (!this.getisLogin) {
            this.newMessage.userName = "";
          }
          this.newMessage.context = "";
          this.getMessages();
        }
      });
    },
    resetMessageBtn() {
      this.context = "";
    },
    getMessages() {
      const url = "http://localhost:5000/api/messages/getMessages";
      this.$store.dispatch("updateLoading", true);
      axios.get(url).then(res => {
        if (res.data.success) {
          this.$store.dispatch("updateLoading", false);
          this.messages = res.data.messages;
        } else {
          this.$store.dispatch("updateLoading", false);
        }
      });
    }
    // messagesAfterCut() {
    //   const messagesAfterCut = [];
    //   const messageBackup = this.messages;
    //   const backupLen = this.messages.length;
    //   for (let first = 0; first < backupLen; first++) {
    //     messagesAfterCut[first] = [];
    //     for (let second = 0; second < 3; second++) {
    //       messagesAfterCut[first].push(messageBackup[second]);
    //     }
    //     if (messageBackup.length == 0) {
    //       messageBackup[messageBackup.length - 1].filter(item => item);
    //       break;
    //     }
    //   }
    // }
  },
  computed: {
    ...mapGetters(["getUser", "getisLogin"])
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
