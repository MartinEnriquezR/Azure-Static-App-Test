import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/estadisticas',
    name: 'Estadisticas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Estadisticas.vue')
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecuperarContraseña',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecuperarContrasena.vue')
  },
  {
    path: '/registro',
    name: 'Registrate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registrate.vue')
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notas.vue')
  },
  {
    path: '/registro-usuaria',
    name: 'RegistroUsuaria',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistroUsuaria.vue')
  },
  {
    path: '/registro-senas',
    name: 'RegistroSenasParticulares',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistrarSenasParticulares.vue')
  },
  {
    path: '/registro-dispositivo',
    name: 'RegistroDispositivo',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistrarDispositivo.vue')
  },
  {
    path: '/eliminar-dispositivo',
    name: 'EliminarDispositivo',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesasociarDisp.vue')
  },
  {
    path: '/PIN-dispositivo',
    name: 'ModificarPINDispositivo',
    component: () => import(/* webpackChunkName: "about" */ '../views/CambiarPINDisp.vue')
  },
  {
    path: '/modificar-usuaria',
    name: 'ModificarDatosUsuaria',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModificarDatosUsuaria.vue')
  },
  {
    path: '/actualizar-contrasena',
    name: 'ActualizarContrasena',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActualizarContrasena.vue')
  },
  {
    path: '/borrar-sena',
    name: 'BorrarSena',
    component: () => import(/* webpackChunkName: "about" */ '../views/BorrarSena.vue')
  },
  {
    path: '/modificar-sena',
    name: 'ModificarSena',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModificarSena.vue')
  },
  {
    path: '/actualizar-enfermedades',
    name: 'ActualizarEnfermedad',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActualizarEnfermedad.vue')
  },
  {
    path: '/menu-usuaria',
    name: 'MenuUsuaria',
    component: () => import(/* webpackChunkName: "about" */ '../views/MenuUsuaria.vue')
  },
  {
    path: '/menu-contacto',
    name: 'MenuContacto',
    component: () => import(/* webpackChunkName: "about" */ '../views/MenuContacto.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Perfil.vue')
  },
  {
    path: '/borrar-usuaria',
    name: 'BorrarUsuaria',
    component: () => import(/* webpackChunkName: "about" */ '../views/BorrarUsuaria.vue')
  },
  {
    path: '/borrar-persona',
    name: 'BorrarPersona',
    component: () => import(/* webpackChunkName: "about" */ '../views/BorrarPersona.vue')
  },
  {
    path: '/crear-grupo',
    name: 'CrearGrupoConfianza',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrearGrupoConfianza.vue')
  },
  {
    path: '/desactivar-alerta',
    name: 'DesactivarAlerta',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesactivarAlerta.vue')
  },
  {
    path: '/unir-grupo',
    name: 'UnirseAGrupo',
    component: () => import(/* webpackChunkName: "about" */ '../views/UnirseAGrupo.vue')
  },
  {
    path: '/menu-grupo',
    name: 'MenuGrupo',
    component: () => import(/* webpackChunkName: "about" */ '../views/MenuGrupo.vue')
  },
  {
    path: '/alerta-contacto',
    name: 'AlertaContacto',
    component: () => import(/* webpackChunkName: "about" */ '../views/AlertaContacto.vue')
  },
  {
    path: '/responder-cuestionario',
    name: 'ResponderCuestionario',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResponderCuestionario.vue')
  },
  {
    path: '/mi-cuestionario',
    name: 'MiCuestionario',
    component: () => import(/* webpackChunkName: "about" */ '../views/MiCuestionario.vue')
  },
  {
    path: '/actualizar-cuestionario',
    name: 'ActualizarCuestionario',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActualizarCuestionario.vue')
  },
  {
    path: '/visualizar-trayectoria',
    name: 'VisualizarTrayectoria',
    component: () => import(/* webpackChunkName: "about" */ '../views/VisualizarTrayectoria.vue')
  },
  {
    path: '/aviso-privacidad',
    name: 'AvisoPrivacidad',
    component: () => import(/* webpackChunkName: "about" */ '../views/AvisoPrivacidad.vue')
  },
  {
    path: '/sobre-eyes-on',
    name: 'SobreEyesOn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SobreEyesOn.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
