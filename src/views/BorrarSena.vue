<!--FALTA
  Metodo POST-->
<template>
  <div class="registro">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioBorrarSena p-3 text-left">
        <div class="icono text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-hand-three-fingers"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#525151"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
            <path
              d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"
            />
            <path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" />
            <path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" />
          </svg>
        </div>
        <p class="indicacionesRegistro">
          A continuación se te mostrarán las señas particulares que tienes
          registradas, puedes borrar las que desées.
        </p>
        <hr />

        <div class="info-usuario">
          <b-row class="informacionPersona">
            <b-col class="senasP" cols="12" md="6">
              <h4 class="text-center">Señas particulares</h4>

              <blockquote v-for="(item, index) in usuaria.senas_p" :key="index">
                <div>
                  <span
                    class="float-right text-danger"
                    style="cursor:pointer"
                    @click="borrarSenaP(index)"
                  >
                    X
                  </span>
                </div>

                <p>
                  Tipo de seña particular:
                  {{ item.sena_particular.nombre_sena_particular }}
                </p>

                <p></p>
                <p>
                  Lugar:
                  {{ item.ubicacion_corporal.nombre_ubicacion_corporal }}
                </p>
                <p>Descripción: {{ item.descripcion }}</p>
              </blockquote>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/messaging";
import Swal from "sweetalert2";

export default {
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      titulo: "Borrar Señas Particulares | Eyes On",
      submited: false,
      usuaria: {
        senas_p: "",
      },
      error: null,
      mensaje_error: null,
      mensaje_creacion_usuaria: false,
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
    this.obtenerSenasParticulares();
  },

  methods: {
    obtenerSenasParticulares() {
      let token = "Token " + localStorage.getItem("token");
      let usuaria = localStorage.getItem("username");

      axios({
        url: "https://backend-upiita.herokuapp.com/senas/" + usuaria + "/",
        method: "get",
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.usuaria.senas_p = data.data.senas_particulares;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    borrarSenaP(index) {
      let desc = this.usuaria.senas_p[index].descripcion;
      let sena_p = this.usuaria.senas_p[index].sena_particular
        .nombre_sena_particular;
      let ubicacion = this.usuaria.senas_p[index].ubicacion_corporal
        .nombre_ubicacion_corporal;

      let json = {
        descripcion: desc,
        nombre_sena_particular: sena_p,
        nombre_ubicacion_corporal: ubicacion,
      };

      let token = "Token " + localStorage.getItem("token");
      let username = localStorage.getItem("username");

      axios({
        url: "https://backend-upiita.herokuapp.com/senas/" + username + "/",
        method: "delete",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.obtenerSenasParticulares();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>

<style>
.registro {
  margin-top: 0px;
}

.espacioBorrarSena {
  border-radius: 10px;
  color: var(--gris);
  width: 80%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
}

.errores {
  margin-top: 10px;
  color: var(--morado);
  font-family: var(--fontsecondary);
  padding-bottom: 20px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 600;
}
.indicacionesRegistro {
  padding-top: 10px;
  font-family: var(--fontsecondary);
  color: var(--gris);
  text-align: center;
}
.indicacionesRegistro a {
  font-size: 1em;
  font-weight: 300;
  color: var(--verdeoscuro);
}

#input-nombre {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-email {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-username {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-password {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-ap_ma {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-ap_pa {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-genero {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-fechanac {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-password_confirmation {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

.usuariaOContacto {
  align-items: center;
  text-align: center;
}

.usuariaOContacto p {
  color: var(--verdeoscuro);
  font-weight: 600;
}

.redireccionarUsuaria {
  background-color: #b286b8;
  height: 45px;
  font-family: var(--fontmain);
  color: white;
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid var(--morado);
  margin-bottom: 20px;
}

.submit {
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 50%;
  transition-duration: 0.4s;
}
.submit:hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
}

@media only screen and (min-width: 768px) {
  .espacioBorrarSena {
    width: 60%;
    margin-top: 55px;
  }
}
</style>
