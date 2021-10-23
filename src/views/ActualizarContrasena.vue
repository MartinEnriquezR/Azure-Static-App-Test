<!--FALTA
  Metodo POST-->
<template>
  <div class="registro">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormRegistroContrasena  p-3 text-left">
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
          Llena este formulario para poder actualizar tu contraseña.
        </p>
        <hr />

        <b-form name="form" id="form" v-on:submit.prevent="procesar()">
          <!--Contraseña-->
          <b-form-group
            id="input-password"
            label="Ingresa tu nueva contraseña"
            label-for="inputpassword"
          >
            <b-form-input
              id="inputpassword"
              v-model="persona.password"
              placeholder="Ingresa una contraseña"
              type="password"
              aria-describedby="password-help-block"
              autocomplete="off"
              required
            >
            </b-form-input>
          </b-form-group>

          <!--Repetir contraseña-->
          <b-form-group
            id="input-password_confirmation"
            label="Confirma tu nueva contraseña"
            label-for="inputpassword_confirmation"
          >
            <b-form-input
              id="inputpassword_confirmation"
              v-model="persona.password_confirmation"
              placeholder="Repite tu contraseña."
              type="password"
              aria-describedby="password-help-block"
              autocomplete="off"
              required
            >
            </b-form-input>
          </b-form-group>

          <!--Errores-->
          <div class="errores">
            <div v-if="submited && !$v.persona.password.minLength">
              La contraseña debe tener al menor 4 caracteres.
            </div>
            <div
              v-if="
                submited && !$v.persona.password_confirmation.sameAsPassword
              "
            >
              Las contraseñas deben ser iguales.
            </div>
            <!--<div v-if="error">
              {{ mensaje_error }}
            </div>-->
          </div>

          <!--Boton-->
          <div class="espacioBtnLogin text-center">
            <b-button pill class="submit" type="submit">Regístrate</b-button>
          </div>

          <!--Mensaje registro exitoso-->
          <div
            class="exitoPeticion text-center"
            role="alert"
            v-if="error == false"
          >
            <h6>
              Contraseña cambiada exitosamente. Te redirigiremos a tu menú
              principal.
            </h6>
          </div>

          <!--Mensaje error registro-->
          <div
            class="errorPeticion text-center"
            role="alert"
            v-if="error == true"
          >
            <h6>
              Tu contraseña debe tener al menos 8 caracteres. No debe ser común
              ni enteramente numérica.
            </h6>
          </div>
        </b-form>
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
      titulo: "Actualizar contraseña | Eyes On",
      submited: false,
      persona: {
        password: "",
        password_confirmation: "",
        genero: null,
        is_usuaria: null,
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

  methods: {
    procesar() {
      this.submited = true;
      if (this.$v.$invalid) {
        return false;
      }

      let json = {
        password: this.persona.password,
        password_confirmation: this.persona.password_confirmation,
      };

      let token = "Token " + localStorage.getItem("token");
      let genero = localStorage.getItem("genero");
      let isUsuaria = localStorage.getItem("is_usuaria");

      axios({
        url: "https://backend-upiita.herokuapp.com/persona/cambiar-password/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.persona.genero = genero;
          this.persona.is_usuaria = isUsuaria;
          Swal.fire({
            icon: "success",
            title: "Contraseña actualizada",
            text:
              "Si cierras sesión, deberás ingresar con la nueva contraseña.",
            confirmButtonColor: "#a5b232",
          });
          this.redireccionar();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al actualizar la contraseña",
            text:
              "Tu contraseña debe tener al menos 8 caracteres. No debe ser común ni enteramente numérica.",
            confirmButtonColor: "#a5b232",
          });
        });
    },

    redireccionar() {
      if (this.persona.genero == "Masculino") {
        setTimeout(() => {
          setTimeout(() => this.$router.push({ name: "MenuContacto" }), 1000);
        }, 2000);
      }
      if (
        this.persona.genero == "Femenino" &&
        this.persona.is_usuaria == true
      ) {
        this.mensaje_creacion_usuaria = true;
        setTimeout(() => {
          setTimeout(
            () => this.$router.push({ name: "RegistroUsuaria" }),
            2000
          );
        }, 2000);
      }
      if (
        this.persona.genero == "Femenino" &&
        this.persona.is_usuaria == false
      ) {
        setTimeout(() => {
          setTimeout(() => this.$router.push({ name: "MenuContacto" }), 1000);
        }, 2000);
      }
    },
  },
  validations: {
    persona: {
      password: { required, minLength: minLength(4) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
    },
  },
};
</script>

<style>
.registro {
  margin-top: 0px;
}

.espacioFormRegistroContrasena {
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
  .espacioFormRegistroContrasena {
    width: 50%;
    margin-top: 55px;
  }
}
</style>
