import { L } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {Chart} from 'chart.js'
import Chartkick from 'vue-chartkick'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import firebase from 'firebase/app'
import 'firebase/firebase-messaging'
 
Vue.use(VueAxios, axios);

Vue.use(Vuelidate);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Agregar la URL de la API
//axios.defaults.baseURL = 'http://localhost:8000/';

var config = {
  apiKey: "AIzaSyCBlCCyd5wBFkLgn7E-hQfLqRLxj9NtB8o",
  authDomain: "notificaciones-1784b.firebaseapp.com",
  projectId: "notificaciones-1784b",
  storageBucket: "notificaciones-1784b.appspot.com",
  messagingSenderId: "84796054027",
  appId: "1:84796054027:web:ee8f55a92bea6c2706450e",
  measurementId: "G-0L90RNQKYY"
}
//
firebase.initializeApp(config);

Vue.prototype.$messaging = firebase.messaging()

navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then((registration) => {
    Vue.prototype.$messaging.useServiceWorker(registration)
  }).catch(err => {
    console.log(err)
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
