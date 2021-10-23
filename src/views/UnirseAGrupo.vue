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
            class="icon icon-tabler icon-tabler-edit"
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
            <path
              d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
            />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </div>
        <p class="indicacionesRegistro">
          Ingresa la Clave de Acceso que debió brindarte tu
          <router-link to="/sobre-eyes-on"> Usuaria</router-link>.
        </p>
        <hr />

        <b-form
          name="form"
          id="form"
          v-on:submit.prevent="unirGrupoConfianza()"
        >
          <b-form-group
            id="input-nombreGpo"
            label="Clave de acceso"
            label-for="inputnombreGpo"
          >
            <b-form-input
              id="inputnombreGpo"
              v-model="grupo.clave"
              type="number"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <div class="espacioBtnLogin text-center mt-4">
            <b-button class="btnUnirGrupo" type="submit"
              >Unirme a Grupo de Confianza</b-button
            >
          </div>
        </b-form>
        <!--Mensaje registro exitoso-->
        <div
          class="exitoPeticion text-center"
          role="alert"
          v-if="creado == true"
        >
          <h6>
            Te has unido al Grupo de Confianza correctamente. Te redigiremos al
            menú de Contacto de Confianza.
          </h6>
        </div>

        <!--Mensaje error registro-->
        <div
          class="errorPeticion text-center"
          role="alert"
          v-if="error == true"
        >
          <h6>
            No ha sido posible unirte al Grupo de Confianza en este momento.
            Intentalo más tarde.
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
      titulo: "Unirse a un Grupo de Confianza | Eyes On",

      grupo: {
        clave: "",
      },
      creado: false,
      error: false,
      error_msg: "",
      show: true,
      loggeado: null,

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
    unirGrupoConfianza() {
      let token = "Token " + localStorage.getItem("token");
      let json = {
        clave_acceso: this.grupo.clave,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/grupo/unirme/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //this.creado = true;
          //this.error = false;
          Swal.fire({
            icon: "success",
            title: "Unión a Grupo de Confianza exitosa",
            text: "Podrás visualizarlo en tu menú de Contacto de Confianza.",
            confirmButtonColor: "#a5b232",
          });
          this.redireccionar();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al unirse a Grupo de Confianza",
            text: "El código ingresado no existe o es incorrecto.",
            confirmButtonColor: "#a5b232",
          });
          //this.error = true;
          //this.creado = false;
        });
    },
    redireccionar() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuContacto" }), 1000);
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

.btnUnirGrupo {
  font-family: var(--fontmain);
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 90%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  border-radius: 10px;
}
.btnUnirGrupo:hover {
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

#input-nombreGpo {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
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

  .btnUnirGrupo {
    width: 50%;
  }
}
</style>
