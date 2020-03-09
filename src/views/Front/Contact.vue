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
                <span class="font-weight-bold text-danger">
                  {{ errors[0] }}
                </span>
              </div>
            </ValidationProvider>
            <div class="submitBtn">
              <button class="mr-5 btn btn-primary">送出留言</button>
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
          <div
            class="card mb-3"
            v-for="message in thisPageShow"
            :key="message._id"
          >
            <div class="card-header">
              <a
                class="card-link"
                data-toggle="collapse"
                :href="`#message-${message._id}`"
              >
                <blockquote class="blockquote">
                  <p class="mb-1">{{ message.context }}</p>
                  <footer class="blockquote-footer">
                    {{ message.userName }} &
                    {{ message.createDate.substring(0, 19).replace("T", " ") }}
                    <div v-if="!message.is_reply" class="text-danger mt-1">
                      尚未回覆
                    </div>
                    <div v-else class="text-success">已回覆</div>
                  </footer>
                </blockquote>
              </a>
            </div>
            <div :id="`message-${message._id}`" class="collapse">
              <div class="card-body">{{ message.reply }}</div>
            </div>
          </div>

          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-if="nowPage != 1">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click="changePage(nowPage - 1)"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li
                class="page-item"
                v-for="page in pageNumber"
                :key="page"
                :class="[page == nowPage ? 'active' : undefined]"
              >
                <a class="page-link" href="#" @click="changePage(page)">
                  {{ page }}
                </a>
              </li>
              <li class="page-item" v-if="nowPage != totalPage">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  @click="changePage(nowPage + 1)"
                >
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
        userName: this.$store.getters.getUser.name || "",
        context: ""
      },
      messages: {},
      messagesAfterCut: [],
      thisPageShow: [],
      totalPage: 0,
      perPage: 3,
      nowPage: 1,
      firstPage: 1,
      lastPage: 10
    };
  },
  methods: {
    createNewMessageBtn() {
      const url = "api/messages/addMessage";
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
      this.newMessage.context = "";
    },
    getMessages() {
      const url = "api/messages/getMessages";
      this.$store.dispatch("updateLoading", true);
      axios.get(url).then(res => {
        if (res.data.success) {
          this.$store.dispatch("updateLoading", false);
          this.messages = res.data.messages;
          this.cutMessagesArray();
        } else {
          this.$store.dispatch("updsateLoading", false);
        }
      });
    },
    cutMessagesArray() {
      const vm = this;
      const messagesBack = vm.messages.slice(0);

      vm.totalPage = Math.ceil(vm.messages.length / vm.perPage);
      for (let i = 0; i < vm.totalPage; i++) {
        vm.messagesAfterCut[i] = [];
        for (let j = 0; j < vm.perPage; j++) {
          vm.messagesAfterCut[i].push(messagesBack[j]);
        }
        messagesBack.splice(0, vm.perPage);
      }

      vm.messagesAfterCut[vm.messagesAfterCut.length - 1] = vm.messagesAfterCut[
        vm.messagesAfterCut.length - 1
      ].filter(item => item);

      this.lastPage = this.messagesAfterCut.length;

      this.thisPageShow = this.messagesAfterCut[0];
    },
    changePage(page) {
      this.nowPage = page;
      this.thisPageShow = this.messagesAfterCut[page - 1];
    }
  },

  computed: {
    pageNumber() {
      let arr = [];
      for (let i = this.firstPage; i <= this.lastPage; i++) {
        arr.push(i);
      }
      return arr;
    },
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
