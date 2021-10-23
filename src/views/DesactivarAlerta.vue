<template>
  <div class="login">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormLogin  p-3 text-left">
        <div class="icono text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-lock"
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
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
          </svg>
        </div>
        <p class="indicacionesRegistro">
          Ingresa tu PIN para desactivar tu
          <router-link to="/sobre-eyes-on"> Dispositivo Rastreador</router-link
          >.
        </p>
        <hr />

        <b-form name="form" id="form" v-on:submit.prevent="desactivarAlerta()">
          <b-form-group id="input-PIN" label="PIN" label-for="inputPIN">
            <b-form-input
              id="inputPIN"
              v-model="alerta.pin"
              type="password"
              inputmode="numeric"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <div class="espacioBtnLogin text-center mt-4">
            <b-button class="btnUniralerta" type="submit"
              >Desactivar alerta</b-button
            >
          </div>
        </b-form>
        <!--Mensaje registro exitoso-->
        <div
          class="exitoPeticion text-center"
          role="alert"
          v-if="desactivado == true"
        >
          <h6>
            Alerta desactivada correctamente. Serás redirigida al menú de
            Usuaria.
          </h6>
        </div>

        <!--Mensaje error registro-->
        <div
          class="errorPeticion text-center"
          role="alert"
          v-if="error == true"
        >
          <h6>
            No ha sido posible desactivar la alerta. Intentar en unos minutos.
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";

import { setTimeout } from "timers";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/messaging";
import Swal from "sweetalert2";

export default {
  name: "Login",
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      submited: false,
      titulo: "Desactivar alerta | Eyes On",

      alerta: {
        pin: "",
      },
      desactivado: false,
      error: false,
      error_msg: "",
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
  methods: {
    desactivarAlerta() {
      let token = "Token " + localStorage.getItem("token");
      let json = {
        nombre_alerta: this.$store.getters.dameNombreAlertaUsuaria,
        pin_desactivador: this.alerta.pin,
      };

      console.log(json);

      axios({
        url: "https://backend-upiita.herokuapp.com/alerta/desactivar/",
        method: "delete",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //this.desactivado = true;
          //this.error = false;
          Swal.fire({
            icon: "success",
            title: "Alerta desactivada con éxito",
            text: "Se notificará a tus Contactos de Confianza.",
            confirmButtonColor: "#a5b232",
          });
          this.redireccionar();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al desactivar alerta",
            text: "PIN incorrecto.",
            confirmButtonColor: "#a5b232",
          });
          //this.error = true;
          //this.desactivado = false;
        });
    },
    redireccionar() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuUsuaria" }), 1000);
      }, 1000);
    },
  },
};
</script>

<style>
.login {
  font-size: 16px;
  margin-top: 0px;
}

.espacioLogin {
  background-color: #ffffff;
}
/*Colores*/

.espacioFormLogin {
  border-radius: 10px;
  color: var(--gris);
  width: 80%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
}

.btnUniralerta {
  font-family: var(--fontmain);
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 90%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  border-radius: 10px;
}
.btnUniralerta:hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
}

.exitoPeticion {
  background-color: #b286b8;
  font-family: var(--fontmain);
  color: white;
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid var(--morado);
  margin-top: 10px;
  margin-bottom: 10px;
}

.errorPeticion {
  background-color: #ecbdaf;
  font-family: var(--fontmain);
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid #d47f66;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*Fuentes*/

.registrarPersona {
  font-family: var(--fontsecondary);
  color: var(--gris);
}
.registrarPersona a {
  font-size: 1em;
  font-weight: 300;
  color: var(--gris);
}

.contrasenaOlvidada a {
  font-family: var(--fontsecondary);
  font-size: 0.9em;
  color: var(--gris);
}

.espacioFormLogin h3 {
  margin-top: 8px;
  font-family: var(--fontmain);
  font-weight: 400;
  text-align: center;
}

#input-PIN {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
}

.inputPIN {
  width: 80%;
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
@media only screen and (min-width: 768px) {
  .espacioFormLogin {
    width: 50%;
  }
  .accesoConcedido {
    height: 30px;
  }

  .btnUniralerta {
    width: 50%;
  }
}
</style>
