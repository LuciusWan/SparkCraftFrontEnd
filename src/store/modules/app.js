const state = () => ({
  loading: false,
  sidebarCollapsed: false,
  theme: localStorage.getItem('theme') || 'light',
  language: localStorage.getItem('language') || 'zh-CN'
})

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  
  TOGGLE_SIDEBAR(state) {
    state.sidebarCollapsed = !state.sidebarCollapsed
  },
  
  SET_SIDEBAR_COLLAPSED(state, collapsed) {
    state.sidebarCollapsed = collapsed
  },
  
  SET_THEME(state, theme) {
    state.theme = theme
    localStorage.setItem('theme', theme)
  },
  
  SET_LANGUAGE(state, language) {
    state.language = language
    localStorage.setItem('language', language)
  }
}

const actions = {
  setLoading({ commit }, loading) {
    commit('SET_LOADING', loading)
  },
  
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  
  setSidebarCollapsed({ commit }, collapsed) {
    commit('SET_SIDEBAR_COLLAPSED', collapsed)
  },
  
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
  
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

const getters = {
  loading: state => state.loading,
  sidebarCollapsed: state => state.sidebarCollapsed,
  theme: state => state.theme,
  language: state => state.language
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}