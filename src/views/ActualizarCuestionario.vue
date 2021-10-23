<!--FALTA
  Metodo POST-->
<template>
  <div class="registroCuestionario">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormUsuaria  p-3 text-left">
        <div class="icono text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-file-alert"
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
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path
              d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
            />
            <line x1="12" y1="17" x2="12.01" y2="17" />
            <line x1="12" y1="11" x2="12" y2="14" />
          </svg>
        </div>

        <p class="indicacionesRegistro">
          Si la
          <router-link to="/sobre-eyes-on"> Usuaria</router-link> ha activado su
          dispositivo y la alerta no ha sido apagada, podrás añadir más
          información sobre su situación en este cuestionario. <br />
          Recuerda que puedes visitar nuesto
          <router-link to="/aviso-privacidad"> Aviso de Privacidad</router-link>
          si te preocupa la integridad de tus datos.
        </p>

        <hr />

        <b-form name="form" id="form" v-on:submit.prevent="procesar()">
          <h5 class="titularPregunta">1. Antecedentes de la Usuaria.</h5>
          <!--Habia violencia-->
          <b-form-group
            id="input-habiaViolencia"
            label="En caso de tener una relación, ¿la Usuaria sufría de violencia?"
            label-for="inputhabiaViolencia"
          >
            <b-form-select
              id="inputhabiaViolencia"
              v-model="usuaria.habiaViolencia"
              :options="sufriaViolencia"
            ></b-form-select>
          </b-form-group>

          <!--Había denuncia-->
          <b-form-group
            id="input-habiaDenuncia"
            label="¿La Usuaria realizó una denuncia por violencia o acoso?"
            label-for="inputhabiaDenuncia"
          >
            <b-form-select
              id="inputhabiaDenuncia"
              v-model="usuaria.denunciaPrevia"
              :options="habiaUnaDenuncia"
            ></b-form-select>
          </b-form-group>

          <h5 class="titularPregunta">2. Hechos.</h5>
          <!--Circunstancia-->
          <b-form-group
            id="input-circunstancia"
            label="Circunstancia de la desaparición"
            label-for="inputcircunstancia"
          >
            <b-form-select
              id="inputcircunstancia"
              v-model="usuaria.circunstancia"
              :options="circunstancias"
            ></b-form-select>
          </b-form-group>

          <!--Manejaba?-->
          <b-form-group
            id="input-dentroAuto"
            label="¿Supone que la Usuaria se encontraba manejando o estaba dentro de un auto?"
            label-for="inputdentroAuto"
          >
            <b-form-select
              id="inputdentroAuto"
              v-model="usuaria.manejaba"
              :options="manejaba_auto"
            ></b-form-select>
          </b-form-group>

          <!--Modelo auto-->
          <b-form-group
            id="input-auto"
            label="Si supone que la Usuaria se encontraba en un auto al momento de su desaparición, ¿cuál es el modelo/color/número de placas? "
            label-for="inputauto"
          >
            <b-form-textarea
              id="inputauto"
              v-model="usuaria.auto"
              placeholder="Dejar vacío si se respondió 'Sí' a la pregunta anterior. "
              rows="2"
              max-rows="6"
              autocomplete="off"
            ></b-form-textarea>
          </b-form-group>

          <!--Descripción de los hechos-->
          <b-form-group
            id="input-descripcion"
            label="Descripción de los hechos"
            label-for="inputdescripcion"
          >
            <b-form-textarea
              id="inputdescripcion"
              v-model="usuaria.descripcion"
              placeholder=""
              rows="3"
              max-rows="6"
              autocomplete="off"
            ></b-form-textarea>
          </b-form-group>

          <!--Acompañaba a la victima-->
          <b-form-group
            id="input-acompanaba"
            label="¿Acompañaba a la Usuaria al momento de los hechos?"
            label-for="inputacompanaba"
          >
            <b-form-select
              id="inputacompanaba"
              v-model="usuaria.acompanaba"
              :options="acompanar"
            ></b-form-select>
          </b-form-group>

          <!--Lazo con usuaria-->
          <b-form-group
            id="input-lazo"
            label="¿Qué relación tiene con la Usuaria?"
            label-for="inputlazo"
          >
            <b-select id="inputlazo" v-model="contacto.lazo.lazo">
              <option
                v-for="(item, index) in lazos"
                :key="index"
                :value="item.lazo"
                >{{ item.lazo }}
              </option>
            </b-select>
          </b-form-group>

          <h5 class="titularPregunta">3. Datos de la denuncia.</h5>
          <h6 class="subtituloTitularPregunta text-center">
            Si aún no hay denuncia, puede dejar estos campos en blanco y
            actualizar en cuanto se tenga información.
          </h6>
          <!--Autoridad que recibió la denuncia-->
          <b-form-group
            id="input-autoridad"
            label="¿Qué autoridad recibió la denuncia?"
            label-for="inputautoridad"
          >
            <b-form-input
              id="inputautoridad"
              v-model="usuaria.autoridad"
              autocomplete="off"
            ></b-form-input>
          </b-form-group>

          <!--Fecha denuncia-->
          <div id="input-fecha">
            <label for="example-datepicker">Fecha de la denuncia</label>
            <b-form-datepicker
              id="idfecha"
              placeholder="YYYY-MM-DD"
              v-model="usuaria.fecha"
              class="mb-2"
            ></b-form-datepicker>
          </div>

          <!--Entidad donde se recibió denuncia-->
          <b-form-group
            id="input-entidad"
            label="¿En qué entidad se recibió la denuncia?"
            label-for="inputentidad"
          >
            <b-form-input
              id="inputentidad"
              v-model="usuaria.entidad"
              autocomplete="off"
            ></b-form-input>
          </b-form-group>

          <h5 class="titularPregunta">4. Estado de la Usuaria.</h5>
          <!--Estado-->
          <b-form-group
            id="input-estado"
            label="¿Cuál es el estado de la Usuaria?"
            label-for="inputestado"
          >
            <b-form-select
              id="inputestado"
              v-model="usuaria.estado"
              :options="estados"
            ></b-form-select>
          </b-form-group>

          <div class="botonSubirCuestionario text-center">
            <b-button class="btnSubirCuestionario" type="submit"
              >Registrar Cuestionario</b-button
            >
          </div>

          <!--Titulo prueba
          <b-card class="mt-3" header="Datos a enviar">
            <pre class="m-0 p-0">{{ usuaria }}</pre>
          </b-card>-->
        </b-form>

        <!--Cuestionario registrado-->
        <div
          class="cuestionarioRegistrado text-center"
          role="alert"
          v-if="mensaje_redireccionar == true"
        >
          <h6>
            Cuestionario registrado correctamente. Te redireccionaremos al menú
            de tu Grupo de Confianza.
          </h6>
        </div>

        <!--Error registrar cuestionario-->
        <div
          class="errorRegistroCuestionario text-center"
          role="alert"
          v-if="error == true"
        >
          <h6>
            Hubo un error en el registro de tu Cuestionario. Intentar de nuevo
            en unos minutos.
          </h6>
        </div>
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
      titulo: "Actualizar Cuestionario | Eyes On",
      submited: false,
      usuaria: {
        habiaViolencia: "",
        denunciaPrevia: "",
        circunstancia: "",
        descripcion: "",
        acompanaba: "",
        auto: "",
        manejaba: "",
        autoridad: "",
        fecha: "",
        entidad: "",
        estado: "",
      },
      contacto: {
        lazo: {
          lazo: null,
        },
      },
      // Declarar vectores vacíos para recibir datos
      lazos: [],
      //Declarar opciones
      sufriaViolencia: ["Si", "No", "No se", "No tenia una relacion"],
      habiaUnaDenuncia: ["Si", "No"],
      circunstancias: [
        "Iba rumbo a su trabajo",
        "Salio de casa a realizar alguna actividad y ya no regreso",
        "Se encontraba en el trayecto de una comunidad o ciudad a otra",
        "Se encontraba en su trabajo",
        "Se le privo de su libertad por personas armadas en la calle",
        "Se le privo de su libertad por personas armadas en su domicilio",
        "Se le privo de su libertad por una corporacion policiana o militar",
        "Se le vio en el domicilio de un familiar o conocido",
        "Se le vio en una agencia del ministerio publico",
        "Se trasladaba a su domicilio",
        "Se vio en su domicilio",
        "Tenia problemas familiares antes de desaparecer",
        "Ultimo contacto via telefonica o mensaje de texto",
        "Victima de secuestro",
        "Se desconoce",
        "Otro",
      ],
      acompanar: ["Si", "No", "Otra persona. Explicar en la descripcion"],
      manejaba_auto: ["Si", "No", "No se"],
      estados: ["Localizada", "No localizada"],

      // Declarar URLs
      url_lazo: "https://backend-upiita.herokuapp.com/lazos/",

      //Mensaje de error
      error: false,
      mensaje_error: "",

      //Mensaje exito cuestionario
      mensaje_redireccionar: false,
      titulo_msj: "",
      cuerpo_msj: "",
    };
  },
  mounted() {
    this.getLazos();
    this.obtenerCuestionario();
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
    getLazos() {
      axios.get(this.url_lazo).then((res) => {
        if (res.status == 200) {
          this.lazos = res.data;
        } else {
          alert("No se pudo contectar a Lazos");
        }
      });
    },
    obtenerCuestionario() {
      let token = "Token " + localStorage.getItem("token");

      let json = {
        username_usuaria: this.$store.getters.dameUsernameGrupo,
        nombre_alerta: this.$store.getters.dameNombreAlerta,
      };

      axios({
        url:
          "https://backend-upiita.herokuapp.com/cuestionario/mi-cuestionario/",
        method: "post",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.usuaria.habiaViolencia = data.data.cuestionario.violencia;
          this.usuaria.denunciaPrevia = data.data.cuestionario.denuncia_previa;
          this.usuaria.circunstancia =
            data.data.cuestionario.circunstancia.tipo_circunstancia;
          this.usuaria.descripcion = data.data.cuestionario.descripcion;
          this.usuaria.acompanaba = data.data.cuestionario.acompanar;
          this.usuaria.auto = data.data.cuestionario.modelo_vehiculo;
          this.usuaria.manejaba = data.data.cuestionario.manejaba_auto;
          this.usuaria.autoridad = data.data.cuestionario.autoridad_denuncia;
          this.usuaria.fecha = data.data.cuestionario.fecha_denuncia;
          this.usuaria.entidad = data.data.cuestionario.entidad_denuncia;
          this.usuaria.estado = data.data.cuestionario.estado_usuaria;
          this.contacto.lazo.lazo = data.data.cuestionario.lazo.lazo;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    procesar() {
      let json = {
        descripcion: this.usuaria.descripcion,
        autoridad_denuncia: this.usuaria.autoridad,
        modelo_vehiculo: this.usuaria.auto,
        violencia: this.usuaria.habiaViolencia,
        acompanar: this.usuaria.acompanaba,
        denuncia_previa: this.usuaria.denunciaPrevia,
        manejaba_auto: this.usuaria.manejaba,
        tipo_circunstancia: this.usuaria.circunstancia,
        lazo: this.contacto.lazo.lazo,
        username_usuaria: this.$store.getters.dameUsernameGrupo,
        nombre_alerta: this.$store.getters.dameNombreAlerta,
        estado_usuaria: this.usuaria.estado,
        fecha_denuncia: this.usuaria.fecha,
        entidad_denuncia: this.usuaria.entidad,
      };

      console.log(json);

      let token = "Token " + localStorage.getItem("token");
      axios({
        url: "https://backend-upiita.herokuapp.com/cuestionario/actualizar/",
        method: "put",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          // Activar mensaje de redirección
          //this.mensaje_redireccionar = true;
          this.error = false;
          Swal.fire({
            icon: "success",
            title: "Cuestionario actualizado con éxito",
            text: "Puedes visualizarlo en Mi Cuestionario",
            confirmButtonColor: "#a5b232",
          });
          this.redireccionar();

          console.log(data.data);
        })
        .catch((error) => {
          this.error = true;
          this.mensaje_redireccionar = false;
          Swal.fire({
            icon: "error",
            title: "Error en actualización de Cuestionario",
            text: "Intentalo de nuevo en unos minutos",
            confirmButtonColor: "#a5b232",
          });
          console.log(error);
        });
    },
    redireccionar() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuGrupo" }), 1000);
      }, 2000);
    },
  },
};
</script>

<style>
.registroCuestionario {
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

.titularPregunta {
  font-family: var(--fontmain);
  margin-top: 10px;
  font-weight: 700;
  color: var(--morado);
}
#input-habiaViolencia {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-habiaDenuncia {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-descripcion {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-circunstancia {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-dentroAuto {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-auto {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
  text-align: justify;
}
#input-habiaViolencia {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-acompanaba {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-lazo {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-autoridad {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-fecha {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-entidad {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
#input-estado {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

.cuestionarioRegistrado {
  background-color: #b286b8;
  height: 65px;
  font-family: var(--fontmain);
  color: white;
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid var(--morado);
  margin-top: 20px;
  margin-bottom: 20px;
}

.errorRegistroCuestionario {
  background-color: #ecbdaf;
  height: 65px;
  font-family: var(--fontmain);
  font-size: 0.9em;
  padding: 2px;
  border-radius: 5px;
  border: 0.5px solid #d47f66;
  margin-top: 20px;
  margin-bottom: 20px;
}

.btnSubirCuestionario {
  background-color: var(--verde);
  align-items: center !important;
  border: 2px solid var(--verdeoscuro);
  width: 60%;
  transition-duration: 0.4s;
  margin-bottom: 10px;
  margin-top: 15px;
  padding: 3px;
}

.btnSubirCuestionario:hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
}

@media only screen and (min-width: 768px) {
  .espacioFormUsuaria {
    width: 60%;
    margin-top: 55px;
    min-height: 60vh;
  }
  .btnSubirCuestionario {
    width: 50%;
  }
  .cuestionarioRegistrado {
    height: 30px;
  }
  .errorRegistroCuestionario {
    height: 30px;
  }
}
</style>
