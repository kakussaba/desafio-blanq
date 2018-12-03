import Vue from 'vue'
import Vuex from 'vuex'
import Login from '../components/Login/store'
import Empresa from '../components/Empresa/store'
import Contato from '../components/Contato/store'
import '../css/main.styl'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Login,
    Empresa,
    Contato
  }
})

export default store
