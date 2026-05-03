import { createStore } from "vuex";
import login from './login/login'

export default createStore({
  state() {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  getters: {},
  mutations: {
  },
  actions: {},
  modules: {
    login
  },
});
