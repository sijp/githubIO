import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPage: ""
  },
  mutations: {
    SET_PAGE(state, newPage) {
      state.currentPage = newPage;
    }
  },
  actions: {
    setPage(context, newPage) {
      context.commit("SET_PAGE", newPage);
    }
  },
  getters: {
    currentPage: state => state.currentPage
  }
});
