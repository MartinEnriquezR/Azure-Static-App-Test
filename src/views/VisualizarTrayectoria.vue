<template>
  <div class="perfilView">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioTrayectoria m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioMapa  p-3 text-left " v-if="sinAlerta == false">
        <h3 class="tituloMapa">Trayectoria de {{ usu }}</h3>

        <l-map class="mapa" style="height: 350px" :zoom="zoom" :center="center">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-polyline
            :lat-lngs="trayectorias.puntos"
            :color="polyline.color"
          ></l-polyline>
          <!--Punto y coordenadas iniciales-->
          <l-marker
            v-for="(punto, index) in trayectorias.puntos"
            :key="index"
            :lat-lng="punto"
            @click="verInfo(index)"
          >
          </l-marker>
        </l-map>

        <h4 class="infoAlertaActivada">
          La alerta fue activada el: {{ fechaInicio }} en el punto
          {{ puntoInicio }}.
        </h4>

        <div class="puntoSeleccionado">
          <h4>Selecciona un punto para obtener más información</h4>
          <h5 v-if="verInformacion == true">Ubicación: {{ alerta }}</h5>
          <h5 v-if="verInformacion == true">Hora: {{ hora }}</h5>
        </div>

        <div class="refrescar text-right">
          <b-button
            pill
            class="btnrefrescar"
            type="button"
            @click="seguimiento()"
            >Actualizar mapa</b-button
          >
          <h6>
            Recuerda que el Disposito Rastreador manda su ubicación cada uno a
            cinco minutos.
          </h6>
        </div>
      </div>
      <div class="noHayAlerta p-3 text-left" v-if="sinAlerta == true">
        <div class="icono text-center m-b-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-bell-x"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#b15050"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
            />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            <path d="M10.5 9.5l3 3m0 -3l-3 3" />
          </svg>
        </div>
        <h4>
          La Usuaria ha desactivado su alerta. Dirígete al Menú de Contacto
        </h4>
        <div class="espacioBtnLogin text-center">
          <b-button
            class="btnVerAlerta"
            type="submit"
            @click="regresarMenuContacto"
            >Menú de Contacto de Confianza</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LPolyline,
  LMarker,
  LPopup,
  LTooltip,
} from "vue2-leaflet";
import axios from "axios";
import barraNav from "../components/barraNav";
import vueHeadful from "vue-headful";
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/messaging";
import Swal from "sweetalert2";

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LPopup,
    LTooltip,
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      titulo:
        "Trayectoria de " + localStorage.getItem("usuaria") + " | Eyes On",
      usu: localStorage.getItem("usuaria"),
      sinAlerta: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 14,
      center: [19.568301, -99.047354], //Por defecto
      polyline: {
        color: "#a5b232",
      },
      trayectorias: {
        puntos: [],
        horas: [],
      },
      mensaje: [],
      puntoInicial: [19.568301, -99.047354], //Por defectohhhhh
      mensajePuntoInicial: "Punto inicial",
      alerta: "",
      hora: "",
      fechaInicio: "",
      puntoInicio: "",
      verInformacion: false,

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
  mounted() {
    this.obtenerPrimeraTrayectoria();
    /*setInterval(function() {
      }, 1000);*/
  },
  methods: {
    obtenerPrimeraTrayectoria() {
      //let usuaria = this.$store.getters.dameUsernameGrupo;
      //let alerta = this.$store.getters.dameNombreAlerta;
      let usuaria = localStorage.getItem("usuaria");
      let alerta = localStorage.getItem("nombre_alerta");
      let token = "Token " + localStorage.getItem("token");

      let json = {
        username: usuaria,
        nombre_alerta: alerta,
      };

      let posiciones = [];
      /*setInterval(function() {
        console.log(json);
      }, 1000);*/

      axios({
        url: "https://backend-upiita.herokuapp.com/alerta/trayectoria/",
        method: "post",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.sinAlerta = false;
          //Inicializando variables
          this.trayectorias.puntos = [];
          this.trayectorias.horas = [];

          //Crea la trayectoria del dispositivo
          posiciones = data.data;
          for (let index = 0; index < posiciones.length; index++) {
            var posicion = [
              posiciones[index].latitud,
              posiciones[index].longitud,
            ];
            this.trayectorias.puntos.push(posicion);

            var mensajePunto = posiciones[index].fecha_hora;
            this.trayectorias.horas.push(mensajePunto.substring(11, 19));
          }
          console.log("seguimiento");
          //console.log(this.trayectorias.puntos);
          //console.log(this.trayectorias.horas);

          //Marca el punto central
          let latitud = parseFloat(posiciones[0].latitud);
          let longitud = parseFloat(posiciones[0].longitud);
          let inicio = [latitud, longitud];
          let ptoInicio = latitud + " , " + longitud;
          this.puntoInicial = inicio;
          this.puntoInicio = ptoInicio;
          this.center = inicio;

          //Declarando mensaje de punto inicial
          let fecha = posiciones[0].fecha_hora;
          this.fechaInicio =
            fecha.substring(0, 10) + " a las " + fecha.substring(11, 19);
        })
        .catch((error) => {
          this.sinAlerta = true;
          console.log(error);
        });
    },
    seguimiento() {
      this.obtenerPrimeraTrayectoria();
    },
    verInfo(index) {
      this.verInformacion = true;
      this.alerta = this.trayectorias.puntos[index].toString();
      this.hora = this.trayectorias.horas[index];
      this.obtenerPrimeraTrayectoria();
    },
    regresarMenuContacto() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuContacto" }), 500);
      }, 500);
    },
  },
};
</script>

<style>
.espacioTrayectoria {
  background-color: #ffffff;
  padding: 0px;
  margin: 0px;
}
.espacioMapa {
  margin-top: 58px;
  border-radius: 10px;
  color: var(--gris);
  width: 98%;

  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  padding: 0px;
  margin-bottom: 30px;
}

.noHayAlerta {
  margin-top: 58px;
  border-radius: 10px;
  color: var(--gris);
  width: 98%;

  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  padding: 0px;
  margin-bottom: 30px;
}

.noHayAlerta h4 {
  font-size: 1.3em;
  padding: 5px;
  font-family: var(--fontmain);
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.tituloMapa {
  font-family: var(--fontmain);
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 5%;
  font-weight: 600;
}

.infoAlertaActivada {
  font-family: var(--fontsecondary);
  text-align: center;
  font-size: 1rem;
  color: var(--morado);
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 5%;
}

.mapa {
  margin-top: 5%;
  margin-bottom: 5%;
}

.puntoSeleccionado {
  background-color: #a5b23270;
  border: 1px solid #a5b23270;
  border-radius: 10px;
  text-align: center;
  padding: 3%;
  margin-left: 5%;
  margin-right: 5%;
}

.puntoSeleccionado h4 {
  font-family: var(--fontmain);
  font-size: 1rem;
  font-weight: 600;
}

.puntoSeleccionado h5 {
  font-family: var(--fontsecondary);
  font-size: 1rem;
}

.refrescar {
  margin: 5%;
}

.btnrefrescar {
  background-color: #532a42;
  align-items: right !important;
  border: 2px solid #391f2d;
  width: 50%;
  transition-duration: 0.4s;
  margin-top: 3px;
  margin-bottom: 4px;
}

.btnrefrescar:hover {
  background-color: var(--verdeoscuro);
  border: 2px solid #435e39;
}
.btnVerAlerta {
  font-family: var(--fontmain);
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 100%;
  transition-duration: 0.4s;
  border-radius: 5px;
}

.btnVerAlerta:hover {
  background-color: var(--verdeoscuro);
}
.refrescar h6 {
  margin-top: 2%;
  font-family: var(--fontmain);
  font-size: 0.8rem;
}

@media only screen and (min-width: 768px) {
  .tituloMapa {
    margin-bottom: 1%;
  }

  .mapa {
    margin-top: 2%;
    margin-bottom: 1%;
  }
  .infoAlertaActivada {
    margin-bottom: 3%;
  }
  .puntoSeleccionado {
    padding: 1%;
    margin-left: 30%;
    margin-right: 30%;
  }
  .refrescar {
    margin: 1%;
  }
  .btnrefrescar {
    width: 20%;
  }
}
</style>
