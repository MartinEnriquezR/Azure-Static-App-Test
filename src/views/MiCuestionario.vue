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
          En este apartado podrás observar el Cuestionario relacionado a tu
          <router-link to="/sobre-eyes-on"> Usuaria</router-link>
        </p>

        <hr />

        <h5 class="titularPregunta">1. Antecedentes de la Usuaria.</h5>

        <!--Habia violencia-->
        <h5 class="preguntas">
          En caso de tener una relación, ¿la Usuaria sufría de violencia?
        </h5>
        <p class="respuestas">{{ usuaria.habiaViolencia }}</p>

        <h5 class="preguntas">
          ¿La Usuaria realizó una denuncia por violencia o acoso?
        </h5>
        <p class="respuestas">{{ usuaria.denunciaPrevia }}</p>

        <h5 class="titularPregunta">2. Hechos.</h5>
        <!--Circunstancia-->
        <h5 class="preguntas">
          Circunstancia de la desaparición
        </h5>
        <p class="respuestas">{{ usuaria.circunstancia }}</p>

        <!--Manejaba?-->
        <h5 class="preguntas">
          ¿Supone que la Usuaria se encontraba manejando o estaba dentro de un
          auto?
        </h5>
        <p class="respuestas">{{ usuaria.manejaba }}</p>

        <!--Modelo auto-->
        <h5 class="preguntas">
          Si supone que la Usuaria se encontraba en un auto al momento de su
          desaparición, ¿cuál es el modelo/color/número de placas?
        </h5>
        <p class="respuestas">{{ usuaria.auto }}</p>

        <!--Descripción de los hechos-->
        <h5 class="preguntas">
          Descripción de los hechos
        </h5>
        <p class="respuestas">{{ usuaria.descripcion }}</p>

        <!--Acompañaba a la victima-->
        <h5 class="preguntas">
          ¿Acompañaba a la Usuaria al momento de los hechos?
        </h5>
        <p class="respuestas">{{ usuaria.acompanaba }}</p>

        <!--Lazo con usuaria-->

        <h5 class="preguntas">
          ¿Qué relación tiene con la Usuaria?
        </h5>
        <p class="respuestas">{{ contacto.lazo.lazo }}</p>

        <h5 class="titularPregunta">3. Datos de la denuncia.</h5>

        <!--Autoridad que recibió la denuncia-->
        <h5 class="preguntas">
          ¿Qué autoridad recibió la denuncia?
        </h5>
        <p class="respuestas">{{ usuaria.autoridad }}</p>

        <!--Fecha denuncia-->
        <h5 class="preguntas">
          Fecha de la denuncia
        </h5>
        <p class="respuestas">{{ usuaria.fecha }}</p>

        <!--Entidad donde se recibió denuncia-->
        <h5 class="preguntas">
          ¿En qué entidad se recibió la denuncia?
        </h5>
        <p class="respuestas">{{ usuaria.entidad }}</p>

        <h5 class="titularPregunta">4. Estado de la Usuaria.</h5>
        <h5 class="preguntas">
          ¿Cuál es el estado de la Usuaria?
        </h5>
        <p class="respuestas">{{ usuaria.estado }}</p>

        <!--Titulo prueba
          <b-card class="mt-3" header="Datos a enviar">
            <pre class="m-0 p-0">{{ usuaria }}</pre>
          </b-card>-->

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
      titulo: "Mi Cuestionario | Eyes On",
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

          //Condicionales
          if (data.data.cuestionario.violencia == "") {
            this.usuaria.habiaViolencia = "No especificado";
          }
          if (data.data.cuestionario.denuncia_previa == "") {
            this.usuaria.denunciaPrevia = "No especificado";
          }
          if (data.data.cuestionario.circunstancia.tipo_circunstancia == "") {
            this.usuaria.circunstancia = "No especificado";
          }
          if (data.data.cuestionario.descripcion == "") {
            this.usuaria.descripcion = "No especificado";
          }
          if (data.data.cuestionario.acompanar == "") {
            this.usuaria.acompanaba = "No especificado";
          }
          if (data.data.cuestionario.modelo_vehiculo == "") {
            this.usuaria.auto = "No especificado";
          }
          if (data.data.cuestionario.manejaba_auto == "") {
            this.usuaria.manejaba = "No especificado";
          }
          if (data.data.cuestionario.autoridad_denuncia == "") {
            this.usuaria.autoridad = "No especificado";
          }
          if (data.data.cuestionario.fecha_denuncia == null) {
            this.usuaria.fecha = "No especificado";
          }
          if (data.data.cuestionario.entidad_denuncia == "") {
            this.usuaria.entidad = "No especificado";
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getLazos() {
      axios.get(this.url_lazo).then((res) => {
        if (res.status == 200) {
          this.lazos = res.data;
        } else {
          alert("No se pudo contectar a Lazos");
        }
      });
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
  font-size: 1.4em;
  color: var(--morado);
}
.preguntas {
  font-family: var(--fontmain);
  margin-top: 10px;
  font-weight: 500;
  font-size: 1.2em;
  color: var(--gris);
  text-align: justify;
}

.respuestas {
  font-family: var(--fontsecondary);
  margin-top: 10px;
  font-weight: 300;
  font-size: 1em;
  color: var(--gris);
  text-align: justify;
  margin-left: 5%;
}

@media only screen and (min-width: 768px) {
  .espacioFormUsuaria {
    width: 60%;
    margin-top: 55px;
    min-height: 60vh;
  }
}
</style>
