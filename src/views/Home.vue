<template>
  <div class="home">
    <vue-headful :title="titulo" />
    <div>
      <barraNav />
    </div>

    <header>
      <div class="overlay">
        <div class="overlay"></div>
        <video
          playsinline="playsinline"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source src="../assets/videoHome.mp4" type="video/mp4" />
        </video>
        <div class="container h-100">
          <div class="titulo d-flex h-100 text-center align-items-center">
            <div class="espacio w-100 text-white">
              <h1 class="display-3">EYES ON</h1>
              <p class="lead mb-0">
                Comparte tu ubicación con tus Grupos de Confianza
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="informacion mt-3 mb-3 p-2 h-100 text-center align-items-center">
      <div class="container h-100">
        <b-row class="mt-3">
          <b-col cols="12" md="4">
            <div>
              <router-link to="/sobre-eyes-on"> Usuarias</router-link>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-woman"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#5b2e48"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="5" r="2" />
              <path
                d="M10 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4"
              />
            </svg>

            <p class="mt-2">
              Si te sientes en riesgo, comparte tu ubicación con tus Grupos de
              Confianza. Activa tu dispositivo rastreador, tus Contactos de
              Confianza recibirán tu ubicación sin importar qué le pase a tu
              móvil.
            </p>
          </b-col>

          <b-col cols="12" md="4">
            <div>
              <router-link to="/sobre-eyes-on">
                Contactos de Confianza</router-link
              >
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-message-report"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#5b2e48"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"
              />
              <line x1="12" y1="8" x2="12" y2="11" />
              <line x1="12" y1="14" x2="12" y2="14.01" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-map-pin"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#5b2e48"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="11" r="3" />
              <path
                d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
              />
            </svg>

            <p class="mt-2">
              Únete a los Grupos de Confianza de tus Usuarias, si ellas activan
              su dispositivo rastreador podrás observar en el mapa el sitio
              donde activó su alerta y su desplazamiento.
            </p>
          </b-col>
          <b-col cols="12" md="4">
            <div>
              <router-link to="/sobre-eyes-on"> Estadísticas</router-link>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chart-line"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#5b2e48"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="19" x2="20" y2="19" />
              <polyline points="4 15 8 9 12 11 16 6 20 10" />
            </svg>

            <p class="mt-2">
              Infórmate sobre los sitios de activación, número de alertas y
              horas en las que han sido activadas en el Estado de México. Puedes
              observar también algunos de los datos en común de las Usuarias que
              activaron estas alertas.
            </p>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/messaging";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    barraNav,
    vueHeadful,
  },
  data() {
    return {
      titulo: "Home | Eyes On",
      titulo_msj: "",
      cuerpo_msj: "",
    };
  },
  created() {
    var config = {
      apiKey: "AIzaSyCBlCCyd5wBFkLgn7E-hQfLqRLxj9NtB8o",
      authDomain: "notificaciones-1784b.firebaseapp.com",
      projectId: "notificaciones-1784b",
      storageBucket: "notificaciones-1784b.appspot.com",
      messagingSenderId: "84796054027",
      appId: "1:84796054027:web:ee8f55a92bea6c2706450e",
      measurementId: "G-0L90RNQKYY",
    };

    const messaging = this.$messaging;

    messaging.onMessage(function(payload) {
      this.titulo_msj = payload.notification.title;
      this.cuerpo_msj = payload.notification.body;

      Swal.fire({
        icon: "warning",
        title: this.titulo_msj,
        text: this.cuerpo_msj,
        confirmButtonColor: "#a5b232",
      });
    });
  },
};
</script>

<style scoped>
.home {
  padding-top: 50px;
}

header {
  position: relative;
  height: 50vh;
  min-height: 20rem;
  width: 100%;
  overflow: hidden;
}

header video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

header .container {
  position: relative;
  z-index: 2;
}

header .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.6;
  z-index: 1;
}

header .container .titulo .espacio h1 {
  font-family: var(--fontsecondary);
  font-weight: 400;
  font-size: 3em;
}

header .container .titulo .espacio p {
  font-family: var(--fontsecondary);
  font-size: 1em;
}

.informacion {
  height: 100%;
}

.informacion p {
  margin-top: 3;
  text-align: justify;
  align-items: center;
  font-family: var(--fontsecondary);
  color: var(--gris);
  font-weight: 300;
}

.informacion a {
  font-family: var(--fontmain);
  color: var(--gris);
  font-weight: 400;
  font-size: 2em;
}

.informacion a:hover {
  color: var(--verdeoscuro);
  text-decoration: none;
  font-weight: 400;
  font-size: 2em;
}

@media only screen and (min-width: 768px) {
  header .container .titulo .espacio h1 {
    font-family: var(--fontsecondary);
    font-weight: 400;
    font-size: 3em;
  }

  header .container .titulo .espacio p {
    font-family: var(--fontsecondary);
    font-size: 2em;
  }
}
</style>
