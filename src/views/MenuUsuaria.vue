<template>
  <div class="MenuUsuaria">
    <vue-headful :title="titulo" />
    <barraNav />

    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormLogin  p-3 text-left">
        <!--SI TIENE GRUPO-->
        <div class="menuConGrupo" v-if="hayGrupo == true">
          <div class="icono text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shield-check"
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
              <path d="M9 12l2 2l4 -4" />
              <path
                d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"
              />
            </svg>
          </div>
          <h4 class=" mt-2 mb-2">{{ nombreGrupo }}</h4>

          <h4 class="text-center m-1">Clave de Acceso</h4>
          <h5 class="clave text-center mt-0">
            {{ informacion_grupo.clave_acceso }}
          </h5>
          <div class="informacionGrupo mr-3 ml-3">
            <b-row class="infoP">
              <b-col cols="12">
                <h4 class="text-center m-1">Integrantes</h4>
                <div class="integrantes" v-if="noIntegrantes == true">
                  <p>
                    Parece que no tienes Contactos de Confianza. Comparte tu
                    Clave de Acceso con ellos.
                  </p>
                </div>
                <blockquote
                  v-for="(item, index) in informacion_grupo.integrantes"
                  :key="index"
                >
                  <div>
                    <span
                      class="eliminar float-right text-danger"
                      style="cursor:pointer"
                      @click="expulsarContacto(index)"
                    >
                      X
                    </span>

                    <p class="m-0">{{ item.username }}</p>
                  </div>
                </blockquote>
              </b-col>
            </b-row>
          </div>
          <div class="espacioBtnUsuaria text-center ">
            <b-button
              class="configGrupo"
              type="submit"
              v-if="btnNuevoNombre == true"
              @click="actualizarNombreGrupo"
              >Editar nombre de Grupo de Confianza</b-button
            >
            <!--Formulario para nuevo nombre-->
            <b-form
              name="form"
              id="form"
              v-if="verEditarNombre == true"
              v-on:submit.prevent="cambiarNombreGrupo()"
            >
              <!--Nuevo nombre grupo-->
              <b-form-group
                id="input-nuevoNombre"
                label="Nombre de Grupo de Confianza"
                label-for="inputestatura"
              >
                <b-form-input
                  id="inputnuevoNombre"
                  v-model="nuevoNombre"
                  placeholder="Ingresa el nuevo nombre."
                  autocomplete="off"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button
                class="configGrupo"
                type="submit"
                v-if="btnNuevoNombre == false"
                @click="actualizarNombreGrupo"
                >Editar nombre de Grupo de Confianza</b-button
              >
            </b-form>
          </div>
          <div class="espacioBtnUsuaria text-center ">
            <b-button class="configGrupo" type="submit" @click="eliminarGrupo"
              >Eliminar {{ nombreGrupo }}</b-button
            >
          </div>
          <div class="espacioBtnUsuaria text-right">
            <b-button
              class="desactivarAlerta"
              type="submit"
              @click="desactivarAlerta"
              v-if="verBtnDesactivarAlerta == true"
              >Desactivar alerta</b-button
            >
          </div>
        </div>

        <!--NO TIENE GRUPO-->
        <div class="menuSinGrupo" v-if="hayGrupo == false">
          <div class="icono text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-mood-empty"
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
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="10" x2="9.01" y2="10" />
              <line x1="15" y1="10" x2="15.01" y2="10" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h4>Parece que aún no tienes Grupo de Confianza, debes crear uno.</h4>
          <div class="espacioBtnLogin text-center">
            <b-button
              pill
              class="btnCrearGrupo"
              type="submit"
              @click="crearGrupoConfianza"
              >Crear Grupo de Confianza</b-button
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
      titulo: "Menú Usuaria | Eyes On",
      hayGrupo: null,
      nombreGrupo: "",
      informacion_grupo: {
        nombre: null,
        clave_acceso: null,
        integrantes: "",
      },
      contactoC: "",
      verEditarNombre: false,
      nuevoNombre: "",
      noIntegrantes: false,
      btnNuevoNombre: true,
      verBtnDesactivarAlerta: false,
      error: null,
      mensaje_error: "",
      titulo_msj: "",
      cuerpo_msj: "",
    };
  },
  mounted() {
    this.obtenerInfoGrupo();
    this.obtenerInfoAlerta();
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
      let username = localStorage.getItem("username");

      axios({
        url: "https://backend-upiita.herokuapp.com/grupo/" + username + "/",
        method: "get",
        headers: {
          Authorization: token,
        },
      }) ///
        .then((data) => {
          this.hayGrupo = true;

          //Llenado de información
          this.nombreGrupo = data.data.informacion_grupo.nombre;
          this.informacion_grupo.integrantes =
            data.data.informacion_grupo.integrantes;

          this.informacion_grupo.clave_acceso =
            data.data.informacion_grupo.clave_acceso;

          if (data.data.informacion_grupo.integrantes == "") {
            this.noIntegrantes = true;
          }
        })
        .catch((error) => {
          this.hayGrupo = false;
          console.error(error);
          //this.$store.state.tiene_grupo = false;
          //this.$store.dispatch("grupoUsuariaAction");
          //console.log("hay grupo? ", this.$store.getters.dameGrupoUsuaria);
        });
    },
    actualizarNombreGrupo() {
      this.verEditarNombre = true;
      this.btnNuevoNombre = false;
    },
    cambiarNombreGrupo() {
      let token = "Token " + localStorage.getItem("token");

      let json = {
        nombre: this.nuevoNombre,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/grupo/cambiar-nombre/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.verEditarNombre = false;
          this.btnNuevoNombre = true;
          this.obtenerInfoGrupo();
        })
        .catch((error) => {
          //this.error = true;
          //let errores = error.response.data.non_field_errors;
          //let mensajeError = errores.toString();
          //this.mensaje_error = mensajeError;
          console.log(error);
        });
    },
    expulsarContacto(index) {
      let contacto = this.informacion_grupo.integrantes[index].username;
      let json = {
        username_persona: contacto,
      };

      let token = "Token " + localStorage.getItem("token");

      axios({
        url: "https://backend-upiita.herokuapp.com/grupo/expulsar-miembro/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.obtenerInfoGrupo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminarGrupo() {
      let token = "Token " + localStorage.getItem("token");
      let username = localStorage.getItem("username");

      axios({
        url: "https://backend-upiita.herokuapp.com/grupo/" + username + "/",
        method: "delete",
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.$store.state.tiene_grupo = false;
          this.$store.dispatch("grupoUsuariaAction");
          this.obtenerInfoGrupo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    desactivarAlerta() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "DesactivarAlerta" }), 500);
      }, 500);
    },
    crearGrupoConfianza() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "CrearGrupoConfianza" }),
          500
        );
      }, 500);
    },
    obtenerInfoAlerta() {
      let token = "Token " + localStorage.getItem("token");

      axios({
        url: "https://backend-upiita.herokuapp.com/alerta/mi-alerta/",
        method: "get",
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          //Mandar el nombre de alerta a la tienda
          if (data.data.fecha_hora == null) {
            this.verBtnDesactivarAlerta = false;
          } else {
            this.$store.state.nombre_alerta_usuaria = data.data.nombre_alerta;
            this.$store.dispatch("nombreAlertaUsuariaAction");

            //Activar boton
            this.verBtnDesactivarAlerta = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
.clave {
  font-family: var(--fontsecondary);
  color: var(--morado);
  font-weight: 600;
}
.informacionGrupo p {
  font-family: var(--fontsecondary);
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid rgba(206, 206, 206, 0.75);
  padding: 5px;
  margin: 0px;
}

.integrantes p {
  padding: 10px;
  font-family: var(--fontsecondary);
  color: var(--gris);
  text-align: center;
  font-weight: 500;
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

.btnCrearGrupo {
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
@media only screen and (min-width: 768px) {
  .espacioFormLogin {
    width: 60%;
  }

  .submit {
    width: 40%;
  }

  .configGrupo {
    width: 60%;
  }

  .eliminar {
    width: 5%;
  }
  .btnCrearGrupo {
    width: 40%;
  }
  .desactivarAlerta {
    width: 40%;
  }
  .configGrupo {
    width: 40%;
  }
}
</style>
