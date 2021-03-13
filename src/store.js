import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  strict: debug,
  state: {
    files: [],
	mode: "modeNone",
	src: null,
  },
  getters: {
    getFiles(state){
      return state.files;
    },
    getMode(state){
      return state.mode;
    },
    getSrc(state){
      return state.src;
    },
  },
  mutations: {
    setFilesState(state, value) {
      state.files = value;
    },
    setModeState(state, value) {
      state.mode = value;
    },
    setSrcState(state, value) {
      state.src = value;
    },
  },
  actions: {
    setFiles: ({ commit }, value) => {
	  commit('setFilesState', value);
    },
    setMode: ({ commit }, value) => {
	  commit('setModeState', value);
    },
    setSrc: ({ commit }, value) => {
	  commit('setSrcState', value);
    },
  },
  // modules: {}
});
