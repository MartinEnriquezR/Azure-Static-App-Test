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
            class="icon icon-tabler icon-tabler-trash"
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
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
          <p class="indicacionesRegistro">
            Estás a punto de eliminar tu cuenta de Usuaria, si aceptas serás
            redirigida al menú de Inicio. Si estás registrada como Contacto de
            Confianza deberás iniciar sesión de nuevo. ¿Estás de acuerdo?
          </p>

          <hr />
          <b-form name="form" id="form" v-on:submit.prevent="eliminarUsuaria()">
            <!--Boton enviar-->
            <div class="espacioBtnLogin text-center">
              <b-button pill class="submit " type="submit"
                >Eliminar Usuaria</b-button
              >
            </div>

            <!--Mensaje registro exitoso-->
            <div
              class="exitoPeticion text-center"
              role="alert"
              v-if="error == false"
            >
              <h6>
                Se ha eliminado tu cuenta de Usuaria exitosamente. Serás
                redirigida al Inicio.
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
                Es posible que este número de serie ya se encuentre registrado o
                no exista.
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
      titulo: "Eliminar Cuenta Usuaria | Eyes On",
      submited: false,
      //Mensaje de error
      error: null,
      mensaje_error: "",

      //Mensaje exito
      mensaje_redireccionar: "",
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
    eliminarUsuaria() {
      let token = "Token " + localStorage.getItem("token");

      axios({
        url: "https://backend-upiita.herokuapp.com/usuaria/borrar/",
        method: "delete",
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Usuaria eliminada con éxito.",
            text: "Se te redirigirá al menú principal.",
            confirmButtonColor: "#a5b232",
          });
          this.$store.dispatch("logoutAction");
          localStorage.clear();
          //this.error = false;

          this.redireccionar();
          console.log(data);
        })
        .catch((error) => {
          //this.error = true;
          Swal.fire({
            icon: "error",
            title: "Error al eliminar Usuaria.",
            text: "Inténtalo de nuevo en unos minutos.",
            confirmButtonColor: "#a5b232",
          });
          let errores = error.response.data.non_field_errors;
          let mensajeError = errores.toString();
          this.mensaje_error = mensajeError;
          console.log(mensajeError);
        });
    },
    redireccionar() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "Home" }), 1000);
      }, 2000);
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

.submit {
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 60%;
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
  .espacioFormLogin {
    width: 50%;
  }
}
</style>
