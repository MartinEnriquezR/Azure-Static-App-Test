<!--FALTA
  Metodo POST-->
<template>
  <div class="registro">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormRegistro  p-3 text-left">
        <div class="icono text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-list-check"
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
            <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
            <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
            <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
            <line x1="11" y1="6" x2="20" y2="6" />
            <line x1="11" y1="12" x2="20" y2="12" />
            <line x1="11" y1="18" x2="20" y2="18" />
          </svg>
        </div>
        <p class="indicacionesRegistro">
          Asegúrate de llenar el formulario correctamente. Si tienes dudas,
          puedes revisar nuestro
          <router-link to="/aviso-privacidad"> Aviso de Privacidad</router-link
          >.
        </p>
        <hr />

        <b-form name="form" id="form" v-on:submit.prevent="procesar()">
          <!--Nombre-->
          <b-form-group
            id="input-nombre"
            label="Nombre"
            label-for="inputnombre"
          >
            <b-form-input
              id="inputnombre"
              v-model="persona.nombre"
              placeholder="Si tienes dos nombres, inclúyelos."
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <!--Apellido paterno-->
          <b-form-group
            id="input-ap_pa"
            label="Apellido paterno"
            label-for="input-appa"
          >
            <b-form-input
              id="input-appa"
              v-model="persona.apellido_paterno"
              placeholder="Ingresa solo el apellido paterno."
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <!--Apellido materno-->
          <b-form-group
            id="input-ap_ma"
            label="Apellido materno"
            label-for="input-apma"
          >
            <b-form-input
              id="input-apma"
              v-model="persona.apellido_materno"
              placeholder="Ingresa solo el apellido materno."
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <!--Fecha nacimiento-->
          <div id="input-fechanac">
            <label for="example-datepicker">Fecha de nacimiento</label>
            <b-form-datepicker
              id="idfechanac"
              placeholder="YYYY-MM-DD"
              v-model="persona.fecha_nacimiento"
              class="mb-2"
            ></b-form-datepicker>
          </div>

          <!--Genero-->
          <b-form-group
            id="input-genero"
            label="Género"
            label-for="inputgenero"
          >
            <b-form-select
              id="inputgenero"
              v-model="persona.genero"
              :options="generos"
              required
            ></b-form-select>
          </b-form-group>

          <!--Is usuaria?-->
          <div class="usuariaOContacto" v-if="persona.genero == 'Femenino'">
            <p>
              ¿Cómo usarás el sistema? (Selecciona al menos una opción.)
            </p>
            <b-form-checkbox
              v-model="persona.is_usuaria"
              name="check-button"
              switch
            >
              Soy Usuaria.
            </b-form-checkbox>
            <b-form-checkbox
              v-model="persona.is_contacto_confianza"
              name="check-button"
              switch
            >
              Soy Contacto de Confianza.
            </b-form-checkbox>
          </div>
          <!--Es Masculino?-->
          <div
            class="usuariaOContacto"
            v-else-if="persona.genero == 'Masculino'"
          >
            <p>
              Dada la naturaleza del sistema, sólo puedes ser Contacto de
              Confianza.
            </p>
          </div>

          <!--Correo-->
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

          <!--Username-->
          <b-form-group
            id="input-username"
            label="Username"
            label-for="inputusername"
          >
            <b-form-input
              id="inputusername"
              v-model="persona.username"
              placeholder="username"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <!--Contraseña-->
          <b-form-group
            id="input-password"
            label="Ingresa tu contraseña"
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
            label="Confirma tu contraseña."
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

          <div v-if="submited && !$v.persona.nombre.minLength">
            <div class="mensaje_errores text-center">
              <h6>El nombre debe tener al menos 2 caracteres.</h6>
            </div>
          </div>
          <div v-if="submited && !$v.persona.apellido_paterno.minLength">
            <div class="mensaje_errores text-center">
              <h6>El apellido debe tener al menos 2 caracteres.</h6>
            </div>
          </div>
          <div v-if="submited && !$v.persona.apellido_materno.minLength">
            <div class="mensaje_errores text-center">
              <h6>El apellido debe tener al menos 2 caracteres.</h6>
            </div>
          </div>
          <div v-if="submited && !$v.persona.password.minLength">
            <div class="mensaje_errores text-center">
              <h6>La contraseña debe tener al menos 8 caracteres.</h6>
            </div>
          </div>
          <div
            v-if="submited && !$v.persona.password_confirmation.sameAsPassword"
          >
            <div class="mensaje_errores text-center">
              <h6>Las contraseñas deben ser iguales.</h6>
            </div>
          </div>

          <div class="mensaje_errores text-center" v-if="error">
            <h6>{{ mensaje_error }}</h6>
          </div>

          <!--Redireccionar registro usuaria-->
          <div
            class="redireccionarUsuaria text-center"
            role="alert"
            v-if="mensaje_creacion_usuaria == true"
          >
            Seleccionaste registrarte como Usuaria, deberás ingresar más
            información.
          </div>

          <!--Redireccionar registro contacto-->
          <div
            class="redireccionarContacto text-center"
            role="alert"
            v-if="mensaje_creacion_contacto == true"
          >
            Seleccionaste registrarte como Contacto de Confianza, a continuación
            te redireccionaremos a tu menú.
          </div>

          <!--Boton-->
          <div class="espacioBtnRegistro text-center">
            <b-button pill class="submit" type="submit">Regístrate</b-button>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      titulo: "Registro | Eyes On",
      submited: false,
      persona: {
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        username: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        genero: null,
        fecha_nacimiento: "",
        is_usuaria: false,
        is_contacto_confianza: true,
      },
      generos: ["Femenino", "Masculino"],
      error: false,
      mensaje_error: null,
      mensaje_creacion_usuaria: false,
      mensaje_creacion_contacto: false,
    };
  },

  methods: {
    procesar() {
      this.submited = true;
      if (this.$v.$invalid) {
        return false;
      }

      this.generoMasculino();

      let json = {
        email: this.persona.email,
        username: this.persona.username,
        password: this.persona.password,
        password_confirmation: this.persona.password_confirmation,
        nombre: this.persona.nombre,
        apellido_paterno: this.persona.apellido_paterno,
        apellido_materno: this.persona.apellido_materno,
        genero: this.persona.genero,
        fecha_nacimiento: this.persona.fecha_nacimiento,
        is_usuaria: this.persona.is_usuaria,
        is_contacto_confianza: this.persona.is_contacto_confianza,
      };

      console.log(json);

      axios({
        url: "https://backend-upiita.herokuapp.com/persona/signup/",
        method: "post",
        data: json,
      })
        .then((data) => {
          if (data.status == 201) {
            // Activar mensaje de redirección
            //this.error = false;
            Swal.fire({
              icon: "success",
              title: "Registro de persona realizado con éxito",
              text: "Se han ingresado tus datos al sistema.",
              confirmButtonColor: "#a5b232",
            });
            //console.log(data.data.access_token);
            //console.log(data);

            //Ingreso de datos a la Store
            this.$store.state.is_usuaria = data.data.persona.is_usuaria;
            this.$store.state.is_contacto =
              data.data.persona.is_contacto_confianza;
            this.$store.state.username = data.data.persona.username;
            this.$store.state.token = data.data.access_token;
            this.$store.state.genero = data.data.persona.genero;

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

            this.redireccionar();
          }
        })
        .catch((error) => {
          //this.error = true;

          //console.log(error.response.data);
          let errores = Object.keys(error.response.data);
          //Pasando de objeto a String
          let mensaje = errores.toString();
          let mensajeError = "Los siguientes campos deben ser únicos: ";
          console.log(mensajeError + mensaje.replace(/,/g, ", "));
          this.mensaje_error = mensajeError + mensaje.replace(/,/g, ", ") + ".";
          Swal.fire({
            icon: "error",
            title: "Error al registrar persona",
            text: mensajeError + mensaje.replace(/,/g, ", ") + ".",
            confirmButtonColor: "#a5b232",
          });
        });
    },

    generoMasculino() {
      if (this.persona.genero == "Masculino") {
        this.persona.is_usuaria = false;
        this.persona.is_contacto_confianza = true;
      }
    },

    redireccionar() {
      if (this.persona.genero == "Masculino") {
        this.mensaje_creacion_contacto = true;
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
        this.mensaje_creacion_contacto = true;
        setTimeout(() => {
          setTimeout(() => this.$router.push({ name: "MenuContacto" }), 1000);
        }, 2000);
      }
    },
  },
  validations: {
    persona: {
      nombre: { required, minLength: minLength(2) },
      apellido_paterno: { required, minLength: minLength(2) },
      apellido_materno: { required, minLength: minLength(2) },
      password: { required, minLength: minLength(8) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
    },
  },
};
</script>

<style>
.registro {
  padding-top: 55px;
  padding-bottom: 80px;
  padding: 0px;
  margin: 0px;
}

.espacioFormRegistro {
  margin-top: 58px;
  min-height: 100vh;
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

.mensaje_errores {
  font-family: var(--fontmain);
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.mensaje_errores h6 {
  color: #e44848;
}

.espacioBtnRegistro {
  padding-top: 10px;
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
  font-family: var(--fontmain);
  color: white;
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid var(--morado);
  margin-bottom: 20px;
}

.redireccionarContacto {
  background-color: #b286b8;
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
  .espacioFormRegistro {
    width: 60%;
    margin-top: 55px;
    min-height: 60vh;
  }
}
</style>
