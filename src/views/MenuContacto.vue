<template>
  <div class="menuContacto">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioContacto m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioMenuContacto  p-3 text-left">
        <!--SI TIENE GRUPO-->
        <div class="menuConGrupo" v-if="hayGrupo">
          <div class="icono text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-social"
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
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
              <circle cx="12" cy="14" r="3" />
              <line x1="12" y1="7" x2="12" y2="11" />
              <line x1="6.7" y1="17.8" x2="9.5" y2="15.8" />
              <line x1="17.3" y1="17.8" x2="14.5" y2="15.8" />
            </svg>
          </div>
          <p class="indicacionesGrupo">
            Puedes acceder a las alertas y cuestionarios de cada Grupo de
            Confianza, haciendo click en su nombre.
          </p>
          <hr />
          <div>
            <h4 class="text-center">Tus Grupos de Confianza</h4>
            <blockquote
              v-for="(item, index) in informacion_grupo.nombre"
              :key="index"
            >
              <div>
                <span
                  class="eliminar float-right text-danger"
                  style="cursor:pointer"
                  @click="salirGrupo(index)"
                >
                  X
                </span>

                <router-link to="/menu-grupo" custom v-slot="{ navigate }">
                  <span
                    class="nombreGrupoConf"
                    @click="navigate, obtenerUsuaria(index)"
                    @keypress.enter="navigate"
                    style="cursor:pointer"
                    role="link"
                    >{{ item.nombre }}</span
                  >
                </router-link>
                <h6 class="text-muted text-left m-0">
                  Usuaria: {{ item.usuaria.persona.username }}
                </h6>
              </div>
            </blockquote>
            <div class="espacioBtnLogin text-center">
              <b-button
                pill
                class="btnUnirGrupo"
                type="submit"
                @click="unirGrupo"
                >Unirme a un Grupo de Confianza</b-button
              >
            </div>
          </div>
        </div>

        <!--NO TIENE GRUPO-->
        <div class="menuSinGrupo" v-if="hayGrupo == false">
          <div class="icono text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-social"
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
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
              <circle cx="12" cy="14" r="3" />
              <line x1="12" y1="7" x2="12" y2="11" />
              <line x1="6.7" y1="17.8" x2="9.5" y2="15.8" />
              <line x1="17.3" y1="17.8" x2="14.5" y2="15.8" />
            </svg>
          </div>
          <h4>
            Parece que aún no estás inscrito a ningún Grupo de Confianza.
            Ingresa el código que te brinda tu usuaria.
          </h4>
          <div class="espacioBtnLogin text-center">
            <b-button pill class="btnUnirGrupo" type="submit" @click="unirGrupo"
              >Unirme a un Grupo de Confianza</b-button
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
    barraNav,
    vueHeadful,
  },
  data() {
    return {
      titulo: "Menú Contacto de Confianza | Eyes On",
      hayGrupo: null,
      nombreGrupo: "Hay grupo",
      informacion_grupo: {
        nombre: null,
        clave_accesso: null,
      },
      infoGrupo: [],
      titulo_msj: "",
      cuerpo_msj: "",
    };
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
  mounted() {
    this.obtenerInfoGrupo();
  },
  methods: {
    obtenerInfoGrupo() {
      let token = "Token " + localStorage.getItem("token");

      axios({
        url: "https://backend-upiita.herokuapp.com/grupo/mis-grupos/",
        method: "get",
        headers: {
          Authorization: token,
        },
      }) //
        .then((data) => {
          this.informacion_grupo.nombre = data.data;

          //Si el vector respuesta está vacío
          if (data.data.length == 0) {
            this.hayGrupo = false;
          }

          //Si el vector respuesta tiene contenido
          if (data.data.length != 0) {
            this.hayGrupo = true;
          }
        })
        .catch((error) => {
          this.hayGrupo = false;
          console.error(error);
        });
    },
    unirGrupo() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "UnirseAGrupo" }), 500);
      }, 500);
    },
    salirGrupo(index) {
      let usuaria = this.informacion_grupo.nombre[index].usuaria.persona
        .username;

      let json = {
        username_usuaria: usuaria,
      };

      let token = "Token " + localStorage.getItem("token");

      axios({
        url: "https://backend-upiita.herokuapp.com/grupo/salir-grupo/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //console.log(data.status);
          this.obtenerInfoGrupo();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    obtenerUsuaria(index) {
      let usuaria = this.informacion_grupo.nombre[index].usuaria.persona
        .username;
      let nombre = this.informacion_grupo.nombre[index].nombre;

      // Asignando usuaria de ese grupo
      this.$store.state.username_grupo = usuaria;
      this.$store.dispatch("usernameGrupoAction");

      localStorage.setItem("usuaria", usuaria);

      //Asignando nombre de ese grupo
      this.$store.state.nombre_grupo = nombre;
      this.$store.dispatch("nombreGrupoAction");

      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuGrupo" }), 500);
      }, 500);
    },
  },
};
</script>

<style>
.espacioContacto {
  background-color: #ffffff;
}

.espacioMenuContacto {
  border-radius: 10px;
  color: var(--gris);
  width: 80%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
}
.btnUnirGrupo {
  font-family: var(--fontmain);
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 90%;
  transition-duration: 0.4s;
  border-radius: 5px;
}
.btnUnirGrupo:hover {
  background-color: var(--verdeoscuro);
  text-decoration: unset;
}
.indicacionesGrupo {
  padding-top: 10px;
  font-family: var(--fontsecondary);
  color: var(--gris);
  text-align: center;
}

.nombreGrupoConf {
  font-family: var(--fontsecondary);
  color: var(--morado);
  font-size: 1.2em;
  font-weight: 600;
}

.usernameGrupoConf_ {
  font-family: var(--fontmain);
  color: var(--verde);
  margin-left: 5%;
  padding: 0;
  font-weight: 400;
}

@media only screen and (min-width: 768px) {
  .btnUnirGrupo {
    width: 50%;
  }
}
</style>
