<template>
  <div class="recuperarContrasena">
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
        <p class="indicaciones">
          Ingresa el correo con el que realizaste tu registro, te enviaremos un
          link para ingresar una nueva contraseña.
        </p>
        <hr />

        <b-form name="form" id="form" v-on:submit.prevent="procesar()">
          <b-form-group id="input-email" label="Correo" label-for="inputemail">
            <b-form-input
              id="inputemail"
              v-model="persona.email"
              type="email"
              placeholder="correo@dominio.com"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <div class="espacioBtnLogin text-center">
            <b-button pill class="submit" type="submit"
              >Recuperar Contraseña</b-button
            >
          </div>
        </b-form>
        <!--Mensaje registro exitoso-->
        <div
          class="exitoPeticion text-center"
          role="alert"
          v-if="exito == true"
        >
          <h6>
            {{ mensaje_exito }}
          </h6>
        </div>

        <!--Mensaje error registro-->
        <div
          class="errorPeticion text-center"
          role="alert"
          v-if="error == true"
        >
          <h6>{{ mensaje_error }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      submited: false,
      titulo: "Recuperar Contraseña | Eyes On",
      persona: {
        email: "",
      },
      //Mensaje de error
      error: null,
      mensaje_error: "",

      //Mensaje exito
      exito: null,
      mensaje_exito: null,
    };
  },

  methods: {
    procesar() {
      this.enviarCorreoRecuperacion();
    },
    enviarCorreoRecuperacion() {
      let json = {
        email: this.persona.email,
      };

      axios({
        url:
          "https://backend-upiita.herokuapp.com/persona/correo-recuperacion/",
        method: "post",
        data: json,
      })
        .then((data) => {
          console.log(data.data);
          this.exito = true;
          this.error = false;
          let exito = data.data;
          let mensajeExito = exito.toString();
          this.mensaje_exito = mensajeExito;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.exito = false;
          let errores = error.response.data.non_field_errors;
          let mensajeError = errores.toString();
          this.mensaje_error = mensajeError;
        });

      console.log(json);
    },
  },
  validations: {
    persona: {
      email: { required, email },
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

.submit {
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 80%;
  transition-duration: 0.4s;
}
.submit:hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
}
/*Fuentes*/
.indicaciones {
  padding-top: 5px;
  font-family: var(--fontsecondary);
  font-weight: 300;
  color: var(--gris);
  text-align: center;
}
.registrarPersona {
  font-family: var(--fontsecondary);
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

#input-email {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
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

  .submit {
    width: 50%;
  }
}
</style>
