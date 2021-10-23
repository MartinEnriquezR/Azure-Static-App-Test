import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Variables
    is_logged_v: false,
    is_usuaria_v: null,
    is_contacto_v: null,
    nombre_v: null,
    username_v: null,
    token_v: null,
    genero_v: null,

    //Variables
    is_logged: false,
    is_usuaria: null,
    is_contacto: null,
    nombre: null,
    username: null,
    token: null,
    genero: null,

    //Variables usuaria
    tiene_grupo: null,
    tiene_grupo_v: false,

    nombre_alerta_usuaria : null,
    nombre_alerta_usuaria_v : null,

    //Variables contacto de confianza
    username_grupo: null,
    username_grupo_v: null,

    nombre_grupo: null,
    nombre_grupo_v: null,

    nombre_alerta: null,
    nombre_alerta_v: null,

  },
  mutations: {
    esContacto( state ){
      state.is_contacto_v = state.is_contacto
    },
    esUsuaria( state ){
      state.is_usuaria_v = state.is_usuaria
    },
    obtenerUsername( state ){
      state.username_v = state.username
    },
    obtenerToken( state ){
      state.token_v = state.token
    },
    obtenerGenero( state ){
      state.genero_v = state.genero
    },
    login( state ){
      state.is_logged_v = true;
    },
    logout (state){
      state.is_logged_v = false; 
      state.is_contacto_v= null;
      state.is_usuaria_v= null;
      state.username_v = null;
      state.token_v = null;
    },
    usuariaEliminada (state){
      state.is_usuaria_v= false;
    },
 
    // si es usuaria
    grupoUsuaria (state){
      state.tiene_grupo_v = state.tiene_grupo;
    },
    nombreAlertaUsuaria(state){
      state.nombre_alerta_usuaria_v = state.nombre_alerta_usuaria;
    },

    //Si es contacto
    usernameGrupo (state){
      state.username_grupo_v = state.username_grupo;
    },
    nombreGrupo(state){
      state.nombre_grupo_v = state.nombre_grupo;
    },
    nombreAlerta(state){
      state.nombre_alerta_v = state.nombre_alerta;
    }
  },
  actions: {
    esContactoAction( context ){
      context.commit('esContacto')
    },
    esUsuariaAction( context ){
      context.commit('esUsuaria')
    },
    obtenerUsernameAction( context ){
      context.commit('obtenerUsername')
    },
    obtenerTokenAction(context){
      context.commit('obtenerToken')
    },
    obtenerGeneroAction( context ){
      context.commit('obtenerGenero')
    },
    loginAction( context ){
      context.commit('login')
    },
    logoutAction( context ){
      context.commit('logout')
    },
    usuariaEliminadaAction( context ){
      context.commit('usuariaEliminada')
    },

    // Usuaria
    grupoUsuariaAction(context){
      context.commit('grupoUsuaria')
    },
    nombreAlertaUsuariaAction(context){
      context.commit("nombreAlertaUsuaria")
    },

    // Contacto de Confianza
    usernameGrupoAction(context){
      context.commit('usernameGrupo')
    },
    nombreGrupoAction(context){
      context.commit('nombreGrupo')
    },
    nombreAlertaAction(context){
      context.commit("nombreAlerta")
    },
  },
  modules: {
  },
  getters:{
    estaLoggeado ( state ){
      return state.is_logged_v;
    },
    dameUsername ( state ){
      return state.username_v;
    },
    dameUsuaria( state ){
      return state.is_usuaria_v;
    },
    dameContacto( state ){
      return state.is_contacto_v;
    },
    dameToken(state){
      return state.token_v;
    },
    dameGenero(state){
      return state.genero_v;
    },
    dameGrupoUsuaria(state){
      return state.tiene_grupo_v;
    },
    dameUsernameGrupo(state){
      return state.username_grupo_v;
    },
    dameNombreGrupo(state){
      return state.nombre_grupo_v;
    },
    dameNombreAlerta(state){
      return state.nombre_alerta_v;
    },
    dameNombreAlertaUsuaria(state){
      return state.nombre_alerta_usuaria_v;
    }
  }
})
