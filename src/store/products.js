import axios from "axios";

export default {
  // namespaced 用了，才能在其他vue中使用
  namespaced: true,
  state: {
    products: []
  },
  actions: {
    getProducts(context) {
      const url = "api/getProducts";
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(res => {
        if (res.data) {
          context.commit("LOADING", false, { root: true });
          context.commit("GETPRODUCTS", res.data);
          // 如果我的最愛有值，就將那個商品加入is_favorite的屬性
          if (context.rootState.favoritesModules.favoritesLength) {
            // products 跟 favorites 去做比對，一樣_ID的就加入is_favorite的屬性
            context.state.products.forEach((productItem, index) => {
              context.rootState.favoritesModules.favorites.forEach(favItem => {
                if (productItem._id === favItem._id) {
                  context.commit("UPDATEPRODUCTS", { index, isFavorite: true });
                }
              });
            });
          }
        }
      });
    }
  },
  mutations: {
    GETPRODUCTS(state, data) {
      state.products = data;
    },
    UPDATEPRODUCTS(state, { index, isFavorite }) {
      // 在物件中新增key和value的方法
      // https://blog.xuite.net/dizzy03/murmur/457116295-%5B%E8%BD%89%5D%5BJavascript%5D+%E5%A6%82%E4%BD%95%E5%9C%A8Javascript%E4%B8%AD%E7%89%A9%E4%BB%B6%E5%A2%9E%E5%8A%A0key%E5%92%8Cvalue%3F%28How+can+I+add+a+key%2Fvalue+pair+to+a+JavaScript+object%3F%29
      //   var obj = {
      //     key1: value1,
      //     key2: value2
      // };
      // Using dot notation:
      // obj.key3 = "value3";
      state.products[index].is_favorite = isFavorite;
    }
  },
  getters: {
    products: state => state.products
  }
};
