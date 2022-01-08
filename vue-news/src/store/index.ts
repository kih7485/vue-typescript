import Vue from "vue";
import Vuex, { mapActions, StoreOptions } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { RootState, state } from "./state";
Vue.use(Vuex);
const store: StoreOptions<RootState> = {
  //StoreOptions<RootState> is a type of Vuex.StoreOptions<RootState>
  state: state,
  mutations: mutations,
  actions: actions,
};

export default new Vuex.Store(store);
// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== 'production',
//   state: {
//     news: [],
//     ask: [],
//     jobs: [],
//     user: {},
//     item: {},
//     list: [],
//   },
//   getters,
//   mutations,
//   actions,
// })
