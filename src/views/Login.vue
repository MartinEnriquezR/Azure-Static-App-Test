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
            class="icon icon-tabler icon-tabler-user"
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
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>
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

          <b-form-group
            id="input-contrasena"
            label="Ingresa tu contraseña"
            label-for="inputcontrasena"
          >
            <b-form-input
              id="inputcontrasena"
              v-model="persona.contrasena"
              placeholder="Ingresa una contraseña"
              type="password"
              aria-describedby="password-help-block"
              autocomplete="off"
              required
            >
            </b-form-input>
          </b-form-group>

          <p class="contrasenaOlvidada">
            <router-link to="/recuperar-contrasena"
              >¿Olvidaste la contraseña?</router-link
            >
          </p>

          <div class="espacioBtnLogin text-center">
            <b-button pill class="submit" type="submit"
              >Iniciar Sesión</b-button
            >
          </div>
        </b-form>
        <!--Si no hay error-->
        <div
          class="accesoConcedido text-center"
          role="alert"
          v-if="error == false"
        >
          Bienvenido(a). Redireccionando a Home...
        </div>

        <!--Si hay error-->
        <div class="accesoNegado text-center" role="alert" v-if="error == true">
          Credenciales inválidas.
        </div>

        <p class="registrarPersona text-right mt-3 mb-1">
          ¿No tienes cuenta?
          <router-link to="/registro"> Regístrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import { required, email } from "vuelidate/lib/validators";
import { setTimeout } from "timers";
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
      titulo: "Iniciar Sesión | Eyes On",
      persona: {
        email: "",
        contrasena: "",
      },
      error: null,
      error_msg: "",
      show: true,
      loggeado: null,
    };
  },

  methods: {
    procesar() {
      let json = {
        email: this.persona.email,
        password: this.persona.contrasena,
      };
      axios({
        url: "https://backend-upiita.herokuapp.com/persona/login/",
        method: "post",
        data: json,
      })
        .then((data) => {
          if (data.status == 201) {
            //Activar alert de éxito
            //this.error = false;
            //this.loggeado = true;

            //Variables Local Storage
            localStorage.setItem("token", data.data.access_token);
            localStorage.setItem("islogged", "true");
            localStorage.setItem("is_usuaria", data.data.persona.is_usuaria);
            localStorage.setItem(
              "is_contacto",
              data.data.persona.is_contacto_confianza
            );
            localStorage.setItem("username", data.data.persona.username);
            localStorage.setItem("genero", data.data.persona.genero);

            this.$store.dispatch("loginAction");

            Swal.fire({
              icon: "success",
              title: "Bienvenido(a)",
              text: "Serás redireccionado(a) al menú principal.",
              confirmButtonColor: "#a5b232",
            });

            //Redireccionar
            setTimeout(() => {
              setTimeout(() => this.$router.push({ name: "Home" }), 1000);
            }, 2000);
          }
        })
        .catch((error) => {
          //this.error = true;
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Credenciales incorrectas.",
            confirmButtonColor: "#a5b232",
          });
        });
    },
  },
  validations: {
    persona: {
      email: { required, email },
      contrasena: { required },
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
  width: 50%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
}
.submit:hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
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

#input-email {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-contrasena {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

.accesoConcedido {
  background-color: #cdecaf;
  height: 45px;
  font-family: var(--fontmain);
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid var(--verdeclaro);
}

.accesoNegado {
  background-color: #ecbdaf;
  height: 30px;
  font-family: var(--fontmain);
  font-size: 0.9em;
  padding: 5px;
  border-radius: 5px;
  border: 0.5px solid #eea58f;
}

@media only screen and (min-width: 768px) {
  .espacioFormLogin {
    width: 50%;
  }
  .accesoConcedido {
    height: 30px;
  }
}
</style>
