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
            class="icon icon-tabler icon-tabler-stethoscope"
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
              d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1"
            />
            <path d="M8 15a6 6 0 1 0 12 0v-3" />
            <path d="M11 3v2" />
            <path d="M6 3v2" />
            <circle cx="20" cy="10" r="2" />
          </svg>
        </div>
        <p class="indicacionesRegistro">
          A continuación, se te mostrarán las enfermedades que tienes
          registradas, puedes agregar o borrar las que desées.
        </p>
        <hr />

        <div class="info-usuario">
          <b-row class="informacionPersona">
            <b-col class="senasP" cols="12">
              <h4 class="text-center">Elimina enfermedades</h4>

              <blockquote
                v-for="(item, index) in usuaria.enfermedades"
                :key="index"
              >
                <div>
                  <span
                    class="float-right text-danger"
                    style="cursor:pointer"
                    @click="borrarEnfermedad(index)"
                  >
                    X
                  </span>
                </div>

                <p>
                  Enfermedad {{ index + 1 }}:
                  {{ item.nombre_enfermedad }}
                </p>

                <p></p>
              </blockquote>
              <b-form
                name="form"
                id="form"
                v-on:submit.prevent="agregarEnfermedades()"
              >
                <!--Enfermedades-->
                <b-form-group
                  class="text-center"
                  id="input-enfermedades"
                  label="Agrega enfermedades"
                  label-for="inputenfermedades"
                >
                  <b-select
                    id="inputenfermedades"
                    v-model="enfermedad.enfermedades"
                    required
                  >
                    <option
                      v-for="(item, index) in enfermedades_"
                      :key="index"
                      :value="item.nombre_enfermedad"
                      >{{ item.nombre_enfermedad }}
                    </option>
                  </b-select>
                </b-form-group>

                <!--Titulo prueba
                <b-card class="mt-3" header="Datos a enviar">
                  <pre class="m-0 p-0">{{ enfermedad }}</pre>
                </b-card>-->

                <div class="espacioBtnLogin text-center">
                  <b-button pill class="submit" type="submit"
                    >Actualizar</b-button
                  >
                </div>
              </b-form>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
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
      titulo: "Modificar Enfermedades | Eyes On",
      submited: false,
      usuaria: {
        enfermedades: "",
        estatura: "",
        escolaridad: "",
        estado_civil: {
          estado_civil: null,
        },
        pais: {
          nacionalidad: null,
        },
        tipo_nariz: {
          tipo_nariz: null,
        },
        complexion: {
          complexion: null,
        },
        color_ojo: {
          color_ojo: null,
        },
        forma_rostro: {
          forma_rostro: null,
        },
        color_cabello: {
          color_cabello: null,
        },
        color_piel: {
          color_piel: null,
        },
        tipo_ceja: {
          tipo_ceja: null,
        },
        textura_cabello: {
          textura_cabello: null,
        },
      },
      enfermedad: {
        enfermedades: null,
      },

      error: null,
      mensaje_error: null,
      mensaje_creacion_usuaria: false,

      //Declarando vector
      enfermedades_: [],

      //Declarando URL para catalog
      url_enfermedades: "https://backend-upiita.herokuapp.com/enfermedades/",
      titulo_msj: "",
      cuerpo_msj: "",
    };
  },
  mounted() {
    this.obtenerInfoUsuaria();
    this.getEnfermedades();
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
    obtenerInfoUsuaria() {
      let token = "Token " + localStorage.getItem("token");
      axios({
        url: "https://backend-upiita.herokuapp.com/usuaria/informacion/",
        method: "get",
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.usuaria.estatura = data.data.estatura;
          this.usuaria.estado_civil.estado_civil =
            data.data.estado_civil.estado_civil;
          this.usuaria.escolaridad = data.data.escolaridad;
          this.usuaria.pais.nacionalidad = data.data.pais.nacionalidad;
          this.usuaria.tipo_nariz.tipo_nariz = data.data.tipo_nariz.tipo_nariz;
          this.usuaria.complexion.complexion = data.data.complexion.complexion;
          this.usuaria.color_ojo.color_ojo = data.data.color_ojo.color_ojo;
          this.usuaria.forma_rostro.forma_rostro =
            data.data.forma_rostro.forma_rostro;
          this.usuaria.color_cabello.color_cabello =
            data.data.color_cabello.color_cabello;
          this.usuaria.color_piel.color_piel = data.data.color_piel.color_piel;
          this.usuaria.tipo_ceja.tipo_ceja = data.data.tipo_ceja.tipo_ceja;
          this.usuaria.textura_cabello.textura_cabello =
            data.data.textura_cabello.textura_cabello;

          //Obtener enfermedades
          this.usuaria.enfermedades = data.data.enfermedades;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    borrarEnfermedad(index) {
      let desc = this.usuaria.enfermedades[index].nombre_enfermedad;
      let json = {
        nombre_enfermedad: desc,
      };
      let token = "Token " + localStorage.getItem("token");

      axios({
        url: "https://backend-upiita.herokuapp.com/usuaria/borrar-enfermedad/",
        method: "delete",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //console.log(data.status);
          this.obtenerInfoUsuaria();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    agregarEnfermedades() {
      let json = {
        estatura: this.usuaria.estatura,
        estado_civil: this.usuaria.estado_civil.estado_civil,
        escolaridad: this.usuaria.escolaridad,
        nacionalidad: this.usuaria.pais.nacionalidad,
        tipo_nariz: this.usuaria.tipo_nariz.tipo_nariz,
        complexion: this.usuaria.complexion.complexion,
        color_ojo: this.usuaria.color_ojo.color_ojo,
        forma_rostro: this.usuaria.forma_rostro.forma_rostro,
        color_cabello: this.usuaria.color_cabello.color_cabello,
        color_piel: this.usuaria.color_piel.color_piel,
        tipo_ceja: this.usuaria.tipo_ceja.tipo_ceja,
        textura_cabello: this.usuaria.textura_cabello.textura_cabello,
        enfermedades: [{ nombre_enfermedad: this.enfermedad.enfermedades }],
      };

      //console.log(json);

      let token = "Token " + localStorage.getItem("token");

      axios({
        url: "https://backend-upiita.herokuapp.com/usuaria/actualizar/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.obtenerInfoUsuaria();
        })
        .catch((error) => {
          this.error = true;
          let errores = error.response.data.non_field_errors;
          let mensajeError = errores.toString();
          this.mensaje_error = mensajeError;
          console.log(mensajeError);
        });
    },
    getEnfermedades() {
      axios.get(this.url_enfermedades).then((res) => {
        if (res.status == 200) {
          this.enfermedades_ = res.data;
          //console.log(this.enfermedades_)
        } else {
          alert("No se pudo contectar a Textura de Cabello");
        }
      });
    },
  },
};
</script>

<style>
.registro {
  margin-top: 0px;
}

.espacioFormRegistro {
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
  .espacioFormRegistro {
    width: 50%;
    margin-top: 55px;
    min-height: 60vh;
  }
}
</style>
