export default {
  namespaced: true,
  state: {
    favorites: [],
    favoritesLength: 0
  },
  actions: {
    getFavorite(context) {
      const favoriteData =
        JSON.parse(sessionStorage.getItem("favoritesData")) || [];
      context.commit("FAVORITES", favoriteData);
      context.commit("FAVORITES_LENGTH", favoriteData.length);
      context.dispatch("productsModules/getProducts", {}, { root: true });
    },
    addToFavorite(context, product) {
      const favoriteData = {
        _id: product._id,
        title: product.title
      };
      context.commit("PUSH_FAVORITE", favoriteData);
      sessionStorage.setItem(
        "favoritesData",
        JSON.stringify(context.state.favorites)
      );
      // getFavorite 新增到我的最愛之後，讓這個商品本身的屬性有is_favorite
      // 更新products
      context.dispatch("getFavorite");
      context.dispatch(
        "alertMessageModules/updateMessage",
        {
          message: "已加入我的最愛",
          status: "success"
        },
        // 如果是要呼叫其他modules的就要加這個參數
        { root: true }
      );
    },
    removeFavorite(context, { favoriteItem, delall }) {
      if (delall) {
        sessionStorage.removeItem("favoritesData");
      } else {
        context.commit("REMOVE_FAVORITE", favoriteItem);
        sessionStorage.setItem(
          "favoritesData",
          JSON.stringify(context.state.favorites)
        );
      }
      // 更新products
      context.dispatch("getFavorite");
      context.dispatch(
        "alertMessageModules/updateMessage",
        {
          message: "已刪除我的最愛",
          status: "warning"
        },
        // 如果是要呼叫其他modules的就要加這個參數
        { root: true }
      );
    }
  },
  mutations: {
    PUSH_FAVORITE(state, favoriteData) {
      state.favorites.push(favoriteData);
    },
    FAVORITES(state, favoriteData) {
      state.favorites = favoriteData;
    },
    FAVORITES_LENGTH(state, favoriteData) {
      state.favoritesLength = favoriteData;
    },
    REMOVE_FAVORITE(state, favoriteItem) {
      state.favorites.forEach((item, index) => {
        if (item._id === favoriteItem._id) {
          state.favorites.splice(index, 1);
        }
      });
    }
  },
  getters: {
    favorites(state) {
      return state.favorites;
    },
    favoritesLength(state) {
      return state.favorites.length;
    }
  }
};
