<!--FALTA:
    Hacer validaciones con PIN solamente numeros enteros.<template>
    Desactivar boton Enviar hasta que se haga la validación
    Realizar validación-->
<template>
  <div class="registrarDispositivo">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormLogin  p-3 text-left">
        <div class="icono text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-router"
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
            <rect x="3" y="13" width="18" height="8" rx="2" />
            <line x1="17" y1="17" x2="17" y2="17.01" />
            <line x1="13" y1="17" x2="13" y2="17.01" />
            <line x1="15" y1="13" x2="15" y2="11" />
            <path d="M11.75 8.75a4 4 0 0 1 6.5 0" />
            <path d="M8.5 6.5a8 8 0 0 1 13 0" />
          </svg>

          <p class="indicacionesRegistro">
            Si ya no tienes un
            <router-link to="/sobre-eyes-on">
              Dispositivo Rastreador</router-link
            >
            contigo o lo has extraviado, puedes desasociarlo de tu cuenta
            llenando este formulario.
          </p>

          <hr />
          <b-form name="form" id="form" v-on:submit.prevent="procesar()">
            <!--NUMERO DE SERIE-->
            <b-form-group
              id="input-numeroserie"
              label="Número de serie"
              label-for="inputnumeroserie"
            >
              <b-form-input
                id="inputnumeroserie"
                v-model="dispositivo.numero_serie"
                placeholder="Ingresa el número de serie de tu dispositivo."
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>

            <!--ERRORES-->
            <div class="mostrarErrores">
              <p
                class="errores text-danger"
                v-if="!$v.dispositivo.numero_serie.numeric"
              >
                El número de serie es numerico.
              </p>
            </div>

            <!--Boton enviar-->
            <div class="espacioBtnLogin text-center">
              <b-button pill class="submit " type="submit">Desasociar</b-button>
            </div>

            <!--Mensaje registro exitoso-->
            <div
              class="exitoPeticion text-center"
              role="alert"
              v-if="error == false"
            >
              <h6>
                Se ha desasociado tu dispositivo correctamente. Se te redirigirá
                al menú de Usuaria.
              </h6>
            </div>

            <!--Mensaje error registro-->
            <div
              class="errorPeticion text-center"
              role="alert"
              v-if="error == true"
            >
              <h6>{{ mensaje_error }}</h6>
              <h6>
                Es posible que este número de serie no exista.
              </h6>
            </div>
          </b-form>
          <!--<b-card class="mt-3" header="Datos a enviar">
            <pre class="m-0 p-0">{{ dispositivo }}</pre>
          </b-card>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import barraNav from "../components/barraNav";
import vueHeadful from "vue-headful";
import axios from "axios";
import { required, numeric } from "vuelidate/lib/validators";
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
      titulo: "Desasociar Dispositivo Rastreador | Eyes On",
      submited: false,
      dispositivo: {
        numero_serie: "",
      },
      //Mensaje de error
      error: null,
      mensaje_error: "",

      //Mensaje exito
      mensaje_redireccionar: false,
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
    procesar() {
      //Se valida que las entradas sean correctas
      this.validarFormato();

      this.peticion();
    },
    validarFormato() {
      this.submited = true;
      if (this.$v.$invalid) {
        return false;
      }
    },
    peticion() {
      let token = "Token " + localStorage.getItem("token");

      let json = {
        numero_serie: this.dispositivo.numero_serie,
      };
      console.log(json);
      axios({
        url: "https://backend-upiita.herokuapp.com/dispositivo/desasociar/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //this.error = false;
          Swal.fire({
            icon: "success",
            title: "Dispositivo desasociado correctamente",
            text: "Se borrará de tu listado de Dispositivos Rastreadores",
            confirmButtonColor: "#a5b232",
          });
          this.redireccionar();
        })
        .catch((error) => {
          //this.error = true;
          let errores = error.response.data.non_field_errors;
          let mensajeError = errores.toString();
          this.mensaje_error = mensajeError;
          console.log(mensajeError);
          Swal.fire({
            icon: "error",
            title: "Error al desasociar Dispositivo",
            text: "Inténtalo en unos minutos.",
            confirmButtonColor: "#a5b232",
          });
        });
    },
    redireccionar() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "Perfil" }), 1000);
      }, 2000);
    },
  },
  validations: {
    dispositivo: {
      numero_serie: { required, numeric },
    },
  },
};
</script>

<style>
.registrarDispositivo {
  margin-top: 0px;
}

.mostrarErrores {
  margin-bottom: 10px;
}

.errores {
  color: var(--verdeoscuro);
  font-family: var(--fontsecondary);
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
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

.espacioFormLogin {
  border-radius: 10px;
  color: var(--gris);
  width: 80%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
}
#input-numeroserie {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-PIN {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
.espacioBtnValidar {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: right;
}

.validarDisp {
  background-color: var(--verde);
  border: 2px solid var(--verdeoscuro);
  width: 50%;
  height: 10%;
  transition-duration: 0.4s;
}
.validarDisp:hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
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

@media only screen and (min-width: 768px) {
  .validarDisp {
    width: 30%;
  }
  .submit {
    width: 30%;
  }
}
</style>
