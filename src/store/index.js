import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    autorizacao: 'ROLE_USER',
    usuario: null
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setAutorizacao(state, autorizacao) {
      state.autorizacao = autorizacao;
    },
    setUsuario (state, usuario) {
      state.usuario = usuario
    },
    logout(state) {
      state.token = null;
      state.autorizacao = 'ROLE_USER';
      state.usuario = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
