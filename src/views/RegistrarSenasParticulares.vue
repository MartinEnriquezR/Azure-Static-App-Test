<template>
  <div class="registroSenas">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormSena  p-3 text-left">
        <div class="icono text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-woman"
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
            <circle cx="12" cy="5" r="2" />
            <path
              d="M10 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4"
            />
          </svg>
        </div>
        <p class="indicacionesRegistro">
          Asegúrate de llenar el formulario correctamente. Si tienes dudas,
          puedes revisar nuestro
          <router-link to="/aviso-privacidad"> Aviso de Privacidad</router-link>
        </p>

        <hr />
        <b-form name="form" id="form" v-on:submit.prevent="procesar()">
          <!--Seña particular-->
          <b-form-group
            id="input-senaparticular"
            label="Seña particular"
            label-for="inputsenaparticular"
          >
            <b-select
              id="inputsenaparticular"
              v-model="senasParticulares.senaPar.nombre_sena_particular"
              required
            >
              <option
                v-for="(item, index) in senas_particulares"
                :key="index"
                :value="item.nombre_sena_particular"
                >{{ item.nombre_sena_particular }}
              </option>
            </b-select>
          </b-form-group>

          <!--Ubicacion Corporal-->
          <b-form-group
            id="input-ubicacioncorporal"
            label="Ubicación corporal"
            label-for="inputubicacioncorporal"
          >
            <b-select
              id="inputubicacioncorporal"
              v-model="
                senasParticulares.ubicacion_corporal.nombre_ubicacion_corporal
              "
              required
            >
              <option
                v-for="(item, index) in ubicaciones_corporales"
                :key="index"
                :value="item.nombre_ubicacion_corporal"
                >{{ item.nombre_ubicacion_corporal }}
              </option>
            </b-select>
          </b-form-group>

          <!--Descripcion-->
          <b-form-group
            id="input-descripcion"
            label="Descripción"
            label-for="inputdescripcion"
          >
            <b-form-input
              id="inputdescripcion"
              v-model="senasParticulares.descripcion"
              placeholder="Descripción de esta seña particular."
              autocomplete="off"
              required
            ></b-form-input>

            <!--Boton-->
            <div class="espacioBtnSena text-center">
              <b-button pill class="registrarSenaP" type="submit"
                >Registrar seña particular</b-button
              >
            </div>

            <!--Mensaje registro exitoso-->
            <div
              class="exitoPeticion text-center"
              role="alert"
              v-if="error == false"
            >
              <h6>
                Se ha registrado tu seña particular correctamente. Serás
                redirigida al menú de Usuaria.
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
import Swal from "sweetalert2";

export default {
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      titulo: "Registro de Señas Particulares | Eyes On",
      senasParticulares: {
        descripcion: "",
        senaPar: {
          nombre_sena_particular: null,
        },
        ubicacion_corporal: {
          nombre_ubicacion_corporal: null,
        },
      },
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
    };
  },
  mounted() {
    this.getUbicacionCorporal();
    this.getSenasParticulares();
  },
  methods: {
    getUbicacionCorporal() {
      axios.get(this.url_ubicacionCorporal).then((res) => {
        if (res.status == 200) {
          this.ubicaciones_corporales = res.data;
        } else {
          console.log("No se pudo contectar a Ubicaciones Corporales");
        }
      });
    },
    getSenasParticulares() {
      axios.get(this.url_senaParticular).then((res) => {
        if (res.status == 200) {
          this.senas_particulares = res.data;
        } else {
          console.log("No se pudo contectar a Senas Particulares");
        }
      });
    },
    procesar() {
      //console.log(this.senasParticulares);
      this.registrarSena();
    },
    registrarSena() {
      let token = "Token " + localStorage.getItem("token");

      let json = {
        descripcion: this.senasParticulares.descripcion,
        nombre_sena_particular: this.senasParticulares.senaPar
          .nombre_sena_particular,
        nombre_ubicacion_corporal: this.senasParticulares.ubicacion_corporal
          .nombre_ubicacion_corporal,
      };

      console.log(json);

      axios({
        url: "https://backend-upiita.herokuapp.com/senas/",
        method: "post",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //this.error = false;
          Swal.fire({
            icon: "success",
            title: "Seña particular registrada con éxito",
            text:
              "La podrás visualizar en tu listado de señas particulares en Configuración.",
            confirmButtonColor: "#a5b232",
          });
          this.redireccionar();
        })
        .catch((error) => {
          //this.error = true;
          Swal.fire({
            icon: "error",
            title: "Error al registrar seña particular",
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
  border-radius: 10px;
  color: var(--gris);
  width: 90%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
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
