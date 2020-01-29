export default {
  namespaced: true,
  state: {
    message: []
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit("PUSH_MESSAGE", {
        message,
        status,
        timestamp
      });
      context.dispatch("removeMessageWithTiming", timestamp);
    },
    removeMessage(context) {
      context.commit("REMOVE_MESSAGE");
    },
    removeMessageWithTiming(context, timestamp) {
      const msg = [...context.state.message];
      setTimeout(() => {
        msg.forEach((item, index) => {
          if (item.timestamp === timestamp) {
            context.commit("REMOVE_MESSAGE", index);
          }
        });
      }, 1500);
    }
  },
  mutations: {
    PUSH_MESSAGE(state, msg) {
      state.message.push(msg);
    },
    REMOVE_MESSAGE(state, num) {
      state.message.splice(num, 1);
    }
  },
  getters: {
    message(state) {
      return state.message;
    }
  }
};
