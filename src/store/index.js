import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    start: [],
    inProgress: [],
    done: [],
    user: null,
    islogged: false,
  },

  mutations: {
    user: (state, user) => {
      state.user = user;
    },
    islogged: (state, islogged) => {
      state.islogged = islogged;
    },

    START: (state, todos) => {
      state.start = todos;
    },
    PROGRESS: (state, todos) => {
      state.inProgress = todos;
    },
    DONE: (state, todos) => {
      state.done = todos;
    },
    DELETE: (state, payload) => {
      if (payload.state === "start") {
        state.start = state.start.filter((todo) => todo.id !== payload.id);
      } else if (payload.state === "inProgress") {
        state.inProgress = state.inProgress.filter(
          (todo) => todo.id !== payload.id
        );
      } else if (payload.state === "done") {
        state.done = state.done.filter((todo) => todo.id !== payload.id);
      }
    },
  },

  actions: {
    user({ commit }, user) {
      commit("user", user);
    },
    islogged({ commit }, islogged) {
      commit("islogged", islogged);
    },

    async getTodos({ commit }) {
      const response = await axios.get(
        "https://app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/users/getUserTodos"
      );
      const start = [],
        inProgress = [],
        done = [];
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].state === "start") {
          start.push(response.data[i]);
        } else if (response.data[i].state === "in progress") {
          inProgress.push(response.data[i]);
        } else if (response.data[i].state === "done") {
          done.push(response.data[i]);
        }
      }
      commit("START", start);
      commit("PROGRESS", inProgress);
      commit("DONE", done);
    },
    async del({ commit }, payload) {
      console.log(payload.id);
      await axios.delete(
        `https://app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/users/${payload.id}`
      );
      commit("DELETE", payload);
    },
  },
  getters: {
    start: (state) => {
      return state.start;
    },
    inProgress: (state) => {
      return state.inProgress;
    },
    done: (state) => {
      return state.done;
    },
    user: (state) => {
      return state.user;
    },
    islogged: (state) => {
      return state.islogged;
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
