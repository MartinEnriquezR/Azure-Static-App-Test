<template>
  <div class="registro">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormSena  p-3 text-left">
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
          En este apartado solo puedes modificar la descripción de tus señas
          particulares. Si quieres cambiar la ubicación y/o descripción, te
          recomendamos que mejor
          <router-link to="/borrar-sena"> borres tu seña particular</router-link
          >.
        </p>

        <hr />
        <div class="info-usuario">
          <b-row class="informacionPersona">
            <b-col class="senasP" cols="12">
              <h4 class="text-center">Señas particulares registradas</h4>

              <blockquote v-for="(item, index) in usuaria.senas_p" :key="index">
                <div id="seleccion">
                  <span
                    class="float-right text-danger"
                    style="cursor:pointer"
                    @click="seleccionarSenaP(index)"
                  >
                    X
                  </span>
                </div>

                <p>
                  Número:
                  {{ index + 1 }}
                </p>

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
              <p v-if="on == true">
                Seleccionaste la seña: {{ seleccionado + 1 }}
              </p>
            </b-col>
          </b-row>
        </div>
        <b-form name="form" id="form" v-on:submit.prevent="modificarSenaP()">
          <!--Descripcion-->
          <b-form-group
            id="input-descripcion"
            label="Descripción"
            label-for="inputdescripcion"
          >
            <b-form-input
              id="inputdescripcion"
              v-model="senasParticulares.descripcion"
              placeholder="Edita la descripción"
              autocomplete="off"
              required
            ></b-form-input>

            <!--Boton-->
            <div class="espacioBtnSena text-center">
              <b-button pill class="registrarSenaP" type="submit"
                >Modificar seña particular</b-button
              >
            </div>

            <!--Mensaje registro exitoso-->
            <div
              class="exitoPeticion text-center"
              role="alert"
              v-if="error == false"
            >
              <h6>
                Se ha modificado tu seña particular correctamente.
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
          </b-form-group>

          <!--Titulo prueba
            <b-card class="mt-3" header="Datos a enviar">
              <pre class="m-0 p-0">{{ senasParticulares }}</pre>
            </b-card>-->
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import axios from "axios";
import { setTimeout } from "timers";
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
      titulo: "Modificar Señas Particulares | Eyes On",
      senasParticulares: {
        descripcion: "",
      },
      usuaria: {
        senas_p: "",
      },
      descripcion: "",
      lugar: "",
      tipo_sena: "",
      seleccionado: "",
      on: false,
      //Mensaje de error
      error: null,
      mensaje_error: "",

      //Mensaje exito
      mensaje_redireccionar: false,

      // Declarar vectores vacíos para recibir datos
      ubicaciones_corporales: [],
      senas_particulares: [],
      // Declarar URLs
      url_ubicacionCorporal:
        "https://backend-upiita.herokuapp.com/ubicaciones-corporales/",
      url_senaParticular:
        "https://backend-upiita.herokuapp.com/senas-particulares/",

      titulo_msj: "",
      cuerpo_msj: "",
    };
  },
  mounted() {
    this.obtenerSenasParticulares();
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
    //Métodos necesarios para obtener información
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
    //Métodos para modificar señales
    procesar() {
      this.modificarSena();
    },
    seleccionarSenaP(index) {
      this.tipo_sena = this.usuaria.senas_p[
        index
      ].sena_particular.nombre_sena_particular;
      this.lugar = this.usuaria.senas_p[
        index
      ].ubicacion_corporal.nombre_ubicacion_corporal;

      this.on = true;
      this.seleccionado = index;
      this.error = null;
    },
    modificarSenaP() {
      let desc = this.senasParticulares.descripcion;

      let json = {
        descripcion: desc,
        nombre_sena_particular: this.tipo_sena,
        nombre_ubicacion_corporal: this.lugar,
      };

      let token = "Token " + localStorage.getItem("token");
      let username = localStorage.getItem("username");

      axios({
        url: "https://backend-upiita.herokuapp.com/senas/" + username + "/",
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
            title: "Seña particular modificada con éxito",
            text: "Se ha actualizado su descripción.",
            confirmButtonColor: "#a5b232",
          });
          this.obtenerSenasParticulares();
        })
        .catch((error) => {
          //this.error = true;
          Swal.fire({
            icon: "error",
            title: "Error al modificar seña particular",
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
        setTimeout(() => this.$router.push({ name: "MenuUsuaria" }), 1000);
      }, 2000);
    },
  },
};
</script>

<style>
.registroSenas {
  padding-top: 55px;
  padding-bottom: 80px;
  padding: 0px;
  margin: 0px;
}
.espacioFormSena {
  margin-top: 58px;
  border-radius: 10px;
  color: var(--gris);
  width: 90%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  padding: 0px;
  margin-bottom: 30px;
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
#input-senaparticular {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-ubicacioncorporal {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-descripcion {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
.registrarSenaP {
  background-color: var(--verdeclaro);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 70%;
  transition-duration: 0.4s;
  margin-top: 15px;
  margin-bottom: 15px;
}
.registrarSenaP:hover {
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
  .espacioFormSena {
    width: 60%;
    margin-top: 55px;
    min-height: 60vh;
  }
}
</style>
