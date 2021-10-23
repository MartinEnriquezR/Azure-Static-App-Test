<!--FALTA
  Metodo POST-->
<template>
  <div class="registro">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormUsuaria  p-3 text-left">
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
          <router-link to="/aviso-privacidad"> Aviso de Privacidad</router-link
          >. <br />
          Recuerda que puedes actualizar tu información siempre y cuando no
          tengas una alerta activa.
        </p>

        <hr />

        <b-form name="form" id="form" v-on:submit.prevent="procesar()">
          <!--Estatura-->
          <b-form-group
            id="input-estatura"
            label="Estatura"
            label-for="inputestatura"
          >
            <b-form-input
              id="inputestatura"
              v-model="usuaria.estatura"
              placeholder="Estatura en cms."
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <!--Estado civil-->
          <b-form-group
            id="input-estadocivil"
            label="Estado civil"
            label-for="inputestadocivil"
          >
            <b-select
              id="inputestadocivil"
              placeholder="Estado civil"
              v-model="usuaria.estado_civil.estado_civil"
              required
            >
              <option
                v-for="(item, index) in estados_civiles"
                :key="index"
                :value="item.estado_civil"
                >{{ item.estado_civil }}
              </option>
            </b-select>
          </b-form-group>

          <!--Escolaridad-->
          <b-form-group
            id="input-escolaridad"
            label="Escolaridad "
            label-for="inputescolaridad"
          >
            <b-form-select
              id="inputescolaridad"
              v-model="usuaria.escolaridad"
              :options="escolaridades"
              required
            ></b-form-select>
          </b-form-group>

          <!--Nacionalidad-->
          <b-form-group
            id="input-nacionalidad"
            label="Nacionalidad"
            label-for="inputnacionalidad"
          >
            <b-select
              id="inputnacionalidad"
              placeholder="Estado civil"
              v-model="usuaria.pais.nacionalidad"
              required
            >
              <option
                v-for="(item, index) in paises"
                :key="index"
                :value="item.nacionalidad"
                >{{ item.nacionalidad }}
              </option>
            </b-select>
          </b-form-group>

          <!--Tipo Nariz-->
          <b-form-group
            id="input-tiponariz"
            label="Tipo de nariz"
            label-for="inputtiponariz"
          >
            <b-select
              id="inputtiponariz"
              placeholder="Estado civil"
              v-model="usuaria.tipo_nariz.tipo_nariz"
              required
            >
              <option
                v-for="(item, index) in tipo_narices"
                :key="index"
                :value="item.tipo_nariz"
                >{{ item.tipo_nariz }}
              </option>
            </b-select>
          </b-form-group>

          <!--Complexiones-->
          <b-form-group
            id="input-complexion"
            label="Complexión"
            label-for="inputcomplexion"
          >
            <b-select
              id="inputcomplexion"
              placeholder="Estado civil"
              v-model="usuaria.complexion.complexion"
              required
            >
              <option
                v-for="(item, index) in complexiones"
                :key="index"
                :value="item.complexion"
                >{{ item.complexion }}
              </option>
            </b-select>
          </b-form-group>

          <!--Colores Ojo-->
          <b-form-group
            id="input-colorojo"
            label="Color de ojos "
            label-for="inputcolorojo"
          >
            <b-select
              id="inputcolorojo"
              v-model="usuaria.color_ojo.color_ojo"
              required
            >
              <option
                v-for="(item, index) in colores_ojo"
                :key="index"
                :value="item.color_ojo"
                >{{ item.color_ojo }}
              </option>
            </b-select>
          </b-form-group>

          <!--Forma rostro-->
          <b-form-group
            id="input-formarostro"
            label="Forma de rostro"
            label-for="inputformarostro"
          >
            <b-select
              id="inputformarostro"
              v-model="usuaria.forma_rostro.forma_rostro"
              required
            >
              <option
                v-for="(item, index) in formas_rostro"
                :key="index"
                :value="item.forma_rostro"
                >{{ item.forma_rostro }}
              </option>
            </b-select>
          </b-form-group>

          <!--Color cabello-->
          <b-form-group
            id="input-colorcabello"
            label="Color de cabello"
            label-for="inputcolorcabello"
          >
            <b-select
              id="inputcolorcabello"
              placeholder="Seleccione color de cabello"
              v-model="usuaria.color_cabello.color_cabello"
              required
            >
              <option
                v-for="(item, index) in colores_cabello"
                :key="index"
                :value="item.color_cabello"
                >{{ item.color_cabello }}
              </option>
            </b-select>
          </b-form-group>

          <!--Color piel-->
          <b-form-group
            id="input-colorpiel"
            label="Color de piel"
            label-for="inputcolorpiel"
          >
            <b-select
              id="inputcolorpiel"
              v-model="usuaria.color_piel.color_piel"
              required
            >
              <option
                v-for="(item, index) in colores_piel"
                :key="index"
                :value="item.color_piel"
                >{{ item.color_piel }}
              </option>
            </b-select>
          </b-form-group>

          <!--Tipos de Ceja-->
          <b-form-group
            id="input-tipoceja"
            label="Tipo de ceja"
            label-for="inputtipoceja"
          >
            <b-select
              id="inputtipoceja"
              v-model="usuaria.tipo_ceja.tipo_ceja"
              required
            >
              <option
                v-for="(item, index) in tipos_ceja"
                :key="index"
                :value="item.tipo_ceja"
                >{{ item.tipo_ceja }}
              </option>
            </b-select>
          </b-form-group>

          <!--Textura de Cabello-->
          <b-form-group
            id="input-texturacabello"
            label="Textura de Cabello"
            label-for="inputtexturacabello"
          >
            <b-select
              id="inputtexturacabello"
              v-model="usuaria.textura_cabello.textura_cabello"
              required
            >
              <option
                v-for="(item, index) in texturas_cabello"
                :key="index"
                :value="item.textura_cabello"
                >{{ item.textura_cabello }}
              </option>
            </b-select>
          </b-form-group>

          <!--Enfermedades-->
          <b-form-group
            id="input-enfermedades"
            label="Enfermades"
            label-for="inputenfermedades"
          >
            <b-select
              id="inputenfermedades"
              v-model="usuaria.enfermedades.enfermedades"
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

          <!--Si hay error en el registro-->
          <div
            class="errorRegistroUsuaria text-center"
            role="alert"
            v-if="error == true"
          >
            <h6>{{ mensaje_error }}</h6>
          </div>

          <!--Si hay redireccionamiento-->
          <div
            class="redireccionarUsuaria text-center"
            role="alert"
            v-if="mensaje_redireccionar == true"
          >
            <h6>Registro exitoso, ahora registra tu Dispositivo Rastreador.</h6>
          </div>

          <div class="espacioBtnLogin text-center">
            <b-button pill class="submit" type="submit">Regístrate</b-button>
          </div>

          <!--Titulo prueba
          <b-card class="mt-3" header="Datos a enviar">
            <pre class="m-0 p-0">{{ usuaria }}</pre>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      titulo: "Registro de Usuaria | Eyes On",
      submited: false,
      usuaria: {
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
        enfermedades: {
          enfermedades: null,
        },
      },
      escolaridades: [
        "Primaria",
        "Secundaria",
        "Bachillerato",
        "Educación profesional técnica",
        "Licenciatura",
        "Ingeniería",
        "Estudios de especialidad",
        "Maestría",
        "Doctorado",
        "No especificada",
      ],
      // Declarar vectores vacíos para recibir datos
      estados_civiles: [],
      paises: [],
      tipo_narices: [],
      complexiones: [],
      colores_ojo: [],
      formas_rostro: [],
      colores_cabello: [],
      colores_piel: [],
      tipos_ceja: [],
      texturas_cabello: [],
      enfermedades_: [],
      // Declarar URLs
      url_estadoCivil: "https://backend-upiita.herokuapp.com/estados-civiles/",
      url_colorCabello: "https://backend-upiita.herokuapp.com/colores-cabello/",
      url_formaRostro: "https://backend-upiita.herokuapp.com/formas-rostro/",
      url_coloresPiel: "https://backend-upiita.herokuapp.com/colores-piel/",
      url_tiposCejas: "https://backend-upiita.herokuapp.com/tipos-cejas/",
      url_paises: "https://backend-upiita.herokuapp.com/paises/",
      url_tiposNariz: "https://backend-upiita.herokuapp.com/tipos-nariz/",
      url_complexiones: "https://backend-upiita.herokuapp.com/complexiones/",
      url_coloresOjos: "https://backend-upiita.herokuapp.com/colores-ojos/",
      url_texturaCabello:
        "https://backend-upiita.herokuapp.com/textura-cabello/",
      url_enfermedades: "https://backend-upiita.herokuapp.com/enfermedades/",

      //Mensaje de error
      error: false,
      mensaje_error: "",

      //Mensaje exito
      mensaje_redireccionar: false,
    };
  },
  mounted() {
    this.getEstadoCivil();
    this.getColorCabello();
    this.getPaises();
    this.getNarices();
    this.getComplexiones();
    this.getColorOjos();
    this.getFormaRostro();
    this.getColorPiel();
    this.getTipoCeja();
    this.getTexturaCabello();
    this.getEnfermedades();
    this.getFormaRostro();
  },
  methods: {
    procesar() {
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
        enfermedades: [
          { nombre_enfermedad: this.usuaria.enfermedades.enfermedades },
        ],
      };

      let token = "Token " + localStorage.getItem("token");
      axios({
        url:
          "https://backend-upiita.herokuapp.com/persona/convertirme-usuaria/",
        method: "post",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          if (data.status == 201) {
            Swal.fire({
              icon: "success",
              title: "Datos de Usuaria registrados con éxito",
              text: "Los podrás visualizar en tu Configuración.",
              confirmButtonColor: "#a5b232",
            });
            //this.mensaje_redireccionar = true;
            this.redireccionar();
          }
        })
        .catch((error) => {
          //this.error = true;
          let errores = error.response.data.non_field_errors;
          let mensajeError = errores.toString();
          this.mensaje_error = mensajeError;
          console.log(mensajeError);

          Swal.fire({
            icon: "error",
            title: "Error al registrar datos de Usuaria",
            text: this.mensaje_error,
            confirmButtonColor: "#a5b232",
          });
        });
    },
    redireccionar() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "RegistroDispositivo" }),
          1000
        );
      }, 2000);
    },
    getEstadoCivil() {
      axios.get(this.url_estadoCivil).then((res) => {
        if (res.status == 200) {
          this.estados_civiles = res.data;
        } else {
          alert("No se pudo contectar a Estado Civil");
        }
      });
    },
    getPaises() {
      axios.get(this.url_paises).then((res) => {
        if (res.status == 200) {
          this.paises = res.data;
        } else {
          alert("No se pudo contectar a Paises");
        }
      });
    },
    getNarices() {
      axios.get(this.url_tiposNariz).then((res) => {
        if (res.status == 200) {
          this.tipo_narices = res.data;
        } else {
          alert("No se pudo contectar a Tipos de Narices");
        }
      });
    },
    getComplexiones() {
      axios.get(this.url_complexiones).then((res) => {
        if (res.status == 200) {
          this.complexiones = res.data;
        } else {
          alert("No se pudo contectar a Complexiones");
        }
      });
    },
    getColorOjos() {
      axios.get(this.url_coloresOjos).then((res) => {
        if (res.status == 200) {
          this.colores_ojo = res.data;
        } else {
          alert("No se pudo contectar a Complexiones");
        }
      });
    },
    getFormaRostro() {
      axios.get(this.url_formaRostro).then((res) => {
        if (res.status == 200) {
          this.formas_rostro = res.data;
        } else {
          alert("No se pudo contectar a Forma Rostro");
        }
      });
    },
    getColorCabello() {
      axios.get(this.url_colorCabello).then((res) => {
        if (res.status == 200) {
          this.colores_cabello = res.data;
        } else {
          alert("No se pudo contectar a Color de Cabello");
        }
      });
    },
    getColorPiel() {
      axios.get(this.url_coloresPiel).then((res) => {
        if (res.status == 200) {
          this.colores_piel = res.data;
          //console.log(this.colores_piel);
        } else {
          alert("No se pudo contectar a Color de Piel");
        }
      });
    },
    getTipoCeja() {
      axios.get(this.url_tiposCejas).then((res) => {
        if (res.status == 200) {
          this.tipos_ceja = res.data;
        } else {
          alert("No se pudo contectar a Tipo de Ceja");
        }
      });
    },
    getTexturaCabello() {
      axios.get(this.url_texturaCabello).then((res) => {
        if (res.status == 200) {
          this.texturas_cabello = res.data;
          //console.log(this.texturas_cabello);
        } else {
          alert("No se pudo contectar a Textura de Cabello");
        }
      });
    },
    getEnfermedades() {
      axios.get(this.url_enfermedades).then((res) => {
        if (res.status == 200) {
          this.enfermedades_ = res.data;
          //console.log(this.enfermedades_);
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
  padding-top: 55px;
  padding-bottom: 80px;
  padding: 0px;
  margin: 0px;
}

.espacioFormUsuaria {
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

#input-persona {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-username {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-estatura {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-estadocivil {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
.inputestadocivil {
  color: var(--verdeoscuro);
  font-family: var(--fontsecondary);
}
#input-escolaridad {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-nacionalidad {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-tiponariz {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-complexion {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-colorojo {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-formarostro {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-colorcabello {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-colorpiel {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-tipoceja {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-texturacabello {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-enfermedades {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
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
  margin-top: 20px;
  margin-bottom: 20px;
}

.errorRegistroUsuaria {
  background-color: #ecbdaf;
  height: 45px;
  font-family: var(--fontmain);
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid #d47f66;
  margin-top: 20px;
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
  .espacioFormUsuaria {
    width: 60%;
    margin-top: 55px;
    min-height: 60vh;
  }
}
</style>
