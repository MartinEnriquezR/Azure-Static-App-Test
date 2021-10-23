<template>
  <div class="MenuUsuaria">
    <vue-headful :title="titulo" />
    <barraNav />

    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormLogin  p-3 text-left">
        <!--Hay alerta-->
        <div class="menuConGrupo" v-if="hayAlerta == true">
          <div class="icono text-center m-b-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-users"
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
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
          </div>
          <h4 class="nombreGrupo m-0">{{ nombreGrupo }}</h4>
          <h5 class="usuariaUsername m-t-0 m-b-3 text-center">
            Usuaria: {{ usuaria }}
          </h5>
          <hr />
          <div class="espacioBtnLogin text-center">
            <b-button
              class="btnVerAlerta"
              type="submit"
              @click="verOpcionesAlerta"
              v-if="opcionesAlerta == false"
              >Alerta</b-button
            >
          </div>

          <!--Ver opciones para alerta-->
          <div
            class="espacioBtnLogin text-center"
            v-if="opcionesAlerta == true"
          >
            <b-row class="infoP">
              <b-col cols="12">
                <b-button
                  class="btnVerAlerta"
                  type="submit"
                  @click="verUltimaAlerta"
                  >Ver última alerta del grupo</b-button
                >
              </b-col>
              <b-col cols="12" v-if="verInfoAlerta == true">
                <div class="divInfoAlerta text-center">
                  <p class="infoAlerta m-0">
                    Fue activada el: {{ alerta.fecha }}
                  </p>
                  <p class="infoAlerta m-0">
                    A las:
                    {{ alerta.hora }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12">
                <b-button
                  class="btnVerAlerta"
                  type="submit"
                  @click="visualizarTrayectoria"
                  >Visualizar trayectoria</b-button
                >
              </b-col>
            </b-row>
          </div>

          <div
            class="espacioBtnLogin text-center"
            v-if="opcionesCuestionario == false"
          >
            <b-button
              class="btnResponderCuestionario"
              type="submit"
              @click="verOpcionesCuestionario"
              >Cuestionario</b-button
            >
          </div>

          <!--Ver opciones para cuestionario-->
          <div
            class="espacioBtnLogin text-center"
            v-if="opcionesCuestionario == true"
          >
            <b-row class="infoP">
              <b-col cols="12">
                <b-button
                  class="btnResponderCuestionario"
                  type="submit"
                  @click="responderCuestionario"
                  >Responder Cuestionario</b-button
                >
              </b-col>
              <b-col cols="12">
                <b-button
                  class="btnResponderCuestionario"
                  type="submit"
                  @click="verCuestionario"
                  >Ver mi Cuestionario</b-button
                >
              </b-col>
              <b-col cols="12">
                <b-button
                  class="btnResponderCuestionario"
                  type="submit"
                  @click="actualizarCuestionario"
                  >Actualizar Cuestionario</b-button
                >
              </b-col>
            </b-row>
          </div>
        </div>

        <!--No hay alerta-->
        <div class="menuConGrupo" v-if="hayAlerta == false">
          <div class="icono text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-users"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#525151"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
          </div>
          <p class="indicacionesGrupo">
            Por el momento, no hay alguna alerta asociada al Grupo de Confianza
            {{ nombreGrupo }}.
          </p>

          <div class="espacioBtnLogin text-center">
            <b-button
              class="btnVerAlerta"
              type="submit"
              @click="regresarMenuContacto"
              >Regresar al menú de Contacto de Confianza</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import barraNav from "../components/barraNav";
import vueHeadful from "vue-headful";
import axios from "axios";
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
      titulo: this.$store.getters.dameNombreGrupo + " | Eyes On",
      hayGrupo: null,
      nombreGrupo: this.$store.getters.dameNombreGrupo,
      usuaria: this.$store.getters.dameUsernameGrupo,
      informacion_grupo: {
        nombre: null,
        clave_acceso: null,
        integrantes: "",
      },
      alerta: {
        fecha: "",
        hora: "",
      },
      contactoC: "",
      verEditarNombre: false,
      nuevoNombre: "",
      noIntegrantes: false,
      btnNuevoNombre: true,
      error: null,
      mensaje_error: "",
      hayAlerta: null,
      opcionesCuestionario: false,
      opcionesAlerta: false,
      verInfoAlerta: false,
      titulo_msj: "",
      cuerpo_msj: "",
    };
  },
  mounted() {
    this.obtenerInfoGrupo();
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
    obtenerInfoGrupo() {
      let token = "Token " + localStorage.getItem("token");
      let username = this.usuaria;
      let json = {
        username_usuaria: username,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/alerta/ultima-alerta/",
        method: "post",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //Mandar el nombre de alerta a la tienda
          if (data.data.nombre_alerta == null) {
            console.log("No hay alerta");
          }
          this.$store.state.nombre_alerta = data.data.nombre_alerta;
          localStorage.setItem("nombre_alerta", data.data.nombre_alerta);

          this.$store.dispatch("nombreAlertaAction");
          this.hayAlerta = true;

          let respuesta = data.data.nombre_alerta;
          let fecha = respuesta.substring(0, 8);
          this.alerta.fecha = fecha;

          let hora = respuesta.substring(9, 17);
          this.alerta.hora = hora;
        })
        .catch((error) => {
          this.hayAlerta = false;
        });
    },
    verAlerta() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "AlertaContacto" }), 500);
      }, 500);
    },
    responderCuestionario() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "ResponderCuestionario" }),
          500
        );
      }, 500);
    },
    actualizarCuestionario() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "ActualizarCuestionario" }),
          500
        );
      }, 500);
    },
    verCuestionario() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MiCuestionario" }), 500);
      }, 500);
    },
    regresarMenuContacto() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuContacto" }), 500);
      }, 500);
    },
    verOpcionesCuestionario() {
      this.opcionesCuestionario = true;
      this.opcionesAlerta = false;
      this.verInfoAlerta = false;
    },
    verOpcionesAlerta() {
      this.opcionesCuestionario = false;
      this.opcionesAlerta = true;
    },
    hayCuestionario() {},
    verUltimaAlerta() {
      this.verInfoAlerta = true;
    },
    visualizarTrayectoria() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "VisualizarTrayectoria" }),
          500
        );
      }, 500);
    },
  },
};
</script>

<style>
.MenuUsuaria {
  padding-top: 0px;
}

.espacioFormLogin {
  border-radius: 10px;
  color: var(--gris);
  width: 80%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
}

.menuSinGrupo h4 {
  font-size: 1.3em;
  padding: 5px;
  font-family: var(--fontmain);
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.menuConGrupo h4 {
  font-size: 1.3em;
  padding: 5px;
  font-family: var(--fontmain);
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.nombreGrupo {
  font-family: var(--fontmain);
  color: var(--morado);
  font-weight: 600;
}

.usuariaUsername {
  font-family: var(--fontsecondary);
  font-weight: 400;
}

.informacionGrupo p {
  font-family: var(--fontsecondary);
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid rgba(206, 206, 206, 0.75);
  padding: 5px;
  margin: 0px;
}

.infoAlerta {
  font-family: var(--fontsecondary);
  color: var(--gris);
  text-align: center;
  font-weight: 500;
  text-align: center !important;
}

.eliminar {
  font-family: var(--fontsecondary);
  font-weight: 600;
  width: 10%;
  padding: 5px;
  margin: 0px;
}
#input-nuevoNombre {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
.configGrupo {
  font-family: var(--fontmain);
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 80%;
  transition-duration: 0.4s;
  border-radius: 5px;
}
.configGrupo :hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
}

.desactivarAlerta {
  font-family: var(--fontmain);
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgb(143, 80, 180);
  align-items: center;
  border: 2px solid rgb(125, 59, 141);
  width: 55%;
  transition-duration: 0.4s;
  border-radius: 5px;
}
.desactivarAlerta :hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
}
.btnVerAlerta {
  font-family: var(--fontmain);
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 100%;
  transition-duration: 0.4s;
  border-radius: 5px;
}

.btnVerAlerta:hover {
  background-color: var(--verdeoscuro);
}

.btnResponderCuestionario {
  font-family: var(--fontmain);
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgb(143, 80, 180);
  align-items: center;
  border: 2px solid rgb(125, 59, 141);
  width: 100%;
  transition-duration: 0.4s;
  border-radius: 5px;
}

.btnResponderCuestionario:hover {
  background-color: rgb(125, 59, 141);
}

@media only screen and (min-width: 768px) {
  .espacioFormLogin {
    width: 60%;
  }

  .btnVerAlerta {
    width: 50%;
  }
  .btnResponderCuestionario {
    width: 50%;
  }
}
</style>
