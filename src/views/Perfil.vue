<template>
  <div class="perfilView">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioUsuario m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioPerfil  p-3 text-left ">
        <!--Container-->
        <div class="container-fluid h-100">
          <b-row>
            <b-col class="perfil" cols="12" md="4">
              <div class="usuario ">
                <b-row class="m-l-0 m-r-0">
                  <b-col>
                    <div class="usuario-block text-center">
                      <!--Img perfil si Femenino-->
                      <div class="perfilGenero" v-if="genero == 'Femenino'">
                        <img
                          src="../assets/perfil_mujer_md.png"
                          class="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <!--Img perfil si Masculino-->
                      <div class="perfilGenero" v-if="genero == 'Masculino'">
                        <img
                          src="../assets/perfil_hombre_md.png"
                          class="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <hr />
                    </div>

                    <div class="presentacion">
                      <h1>{{ persona.nombre }}</h1>
                      <h4 v-if="persona.genero == 'Femenino'">
                        Estás registrada como:
                      </h4>
                      <h4 v-if="persona.genero == 'Masculino'">
                        Estás registrado como:
                      </h4>
                      <h3 v-if="persona.is_usuaria == 'Sí'">Usuaria</h3>
                      <h3 v-if="persona.is_contacto == 'Sí'">
                        Contacto de Confianza
                      </h3>
                    </div>

                    <div
                      class="verInfoUsuario"
                      v-if="persona.genero == 'Masculino'"
                    >
                      <b-link class="verInfP" @click="verInfoPersonal"
                        >Ver información personal</b-link
                      >
                    </div>

                    <div
                      class="verInfoUsuario"
                      v-if="persona.genero == 'Femenino'"
                    >
                      <b-link class="verInfP" @click="verInfoPersonal"
                        >Ver información personal</b-link
                      >
                      <br />
                      <b-link
                        class="verInfP"
                        @click="verInfoUsuaria"
                        v-if="persona.is_usuaria == 'Sí'"
                        >Ver información de Usuaria</b-link
                      >
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>

            <!--Información del usuario-->
            <b-col class="info" cols="12" md="8">
              <!--MENÚ INFORMACION PERSONA-->
              <div class="info-usuario" v-if="esUsuaria == false">
                <h6 class="infoLegend b-b-default f-w-600">
                  Información de persona
                </h6>
                <b-row class="informacionPersona">
                  <b-col cols="12" md="6">
                    <p>Email</p>
                    <h6>{{ persona.email }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Username</p>
                    <h6 class="username">{{ persona.username }}</h6>
                  </b-col>
                  <b-col cols="12" md="4">
                    <p>Nombre</p>
                    <h6>{{ persona.nombre }}</h6>
                  </b-col>
                  <b-col cols="12" md="4">
                    <p>Apellido paterno</p>
                    <h6>{{ persona.ap_pa }}</h6>
                  </b-col>
                  <b-col cols="12" md="4">
                    <p>Apellido materno</p>
                    <h6>{{ persona.ap_ma }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Género</p>
                    <h6>{{ persona.genero }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Fecha de nacimiento</p>
                    <h6>{{ persona.fecha_nac }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>¿Es usuaria?</p>
                    <h6>{{ persona.is_usuaria }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>¿Es contacto de confianza?</p>
                    <h6>
                      {{ persona.is_contacto }}
                    </h6>
                  </b-col>
                </b-row>
                <div class="botonActualizarPersona text-center">
                  <b-button
                    class="btnActualizarPersona"
                    type="submit"
                    @click="actualizarDP"
                    >Actualizar Datos Personales</b-button
                  >
                </div>
                <div class="botonActualizarContrasena text-center">
                  <b-button
                    class="btnActualizarContrasena"
                    type="submit"
                    @click="actualizarContrasena"
                    >Actualizar contraseña</b-button
                  >
                </div>
                <div
                  class="botonCrearUsuaria text-center"
                  v-if="
                    persona.genero == 'Femenino' && persona.is_usuaria == 'No'
                  "
                >
                  <b-button
                    class="btnCrearUsuaria"
                    type="submit"
                    @click="crearCuentaUsuaria"
                    >Crear cuenta de Usuaria</b-button
                  >
                </div>
                <div
                  class="botonActivarNotificaciones text-center"
                  v-if="persona.is_contacto == 'Sí'"
                >
                  <b-button
                    class="btnActivarNotificaciones"
                    type="submit"
                    @click="activarNotificaciones"
                    >Activar Notificaciones</b-button
                  >
                </div>
                <div class="botonEliminarPersona text-center">
                  <b-button
                    class="btnEliminarPersona"
                    type="submit"
                    @click="eliminarCuenta"
                    >Eliminar cuenta</b-button
                  >
                </div>
              </div>

              <!--MENÚ INFORMACION USUARIA-->
              <div class="info-usuario" v-if="esUsuaria == true">
                <h6 class="infoLegend b-b-default f-w-600">
                  Información de Usuaria
                </h6>
                <b-row class="informacionPersona">
                  <b-col cols="12" md="6">
                    <p>Estatura</p>
                    <h6>{{ usuaria.estatura }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Estado Civil</p>
                    <h6>{{ usuaria.estado_c }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Escolaridad</p>
                    <h6>
                      {{ usuaria.escolaridad }}
                    </h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Tipo de Nariz</p>
                    <h6>{{ usuaria.tipo_n }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Complexión</p>
                    <h6>{{ usuaria.complexion }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Color de Ojos</p>
                    <h6>{{ usuaria.color_o }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Forma de Rostro</p>
                    <h6>{{ usuaria.forma_r }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Color de Cabello</p>
                    <h6>{{ usuaria.color_c }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Color de Piel</p>
                    <h6>{{ usuaria.color_p }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Tipo de Ceja</p>
                    <h6>{{ usuaria.tipo_c }}</h6>
                  </b-col>
                  <b-col cols="12" md="6">
                    <p>Textura de Cabello</p>
                    <h6>{{ usuaria.textura_c }}</h6>
                  </b-col>
                  <b-col class="enfermedades" cols="12" md="6">
                    <h4>Enfermedades</h4>
                    <p
                      v-for="(item, index) in usuaria.enfermedades"
                      :key="index"
                      :value="item.nombre_enfermedad"
                    >
                      {{ item.nombre_enfermedad }}
                    </p>
                  </b-col>

                  <b-col class="senasP" cols="12" md="6">
                    <h4 class="mt-3">Señas particulares</h4>

                    <blockquote
                      v-for="(item, index) in usuaria.senas_p"
                      :key="index"
                    >
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
                  </b-col>

                  <b-col class="senasP" cols="12" md="6">
                    <h4>Dispositivos asociados</h4>

                    <blockquote
                      v-for="(item, index) in usuaria.dispositivos"
                      :key="index"
                    >
                      <p>
                        Número de serie:
                        {{ item.numero_serie }}
                      </p>

                      <p></p>
                      <p>
                        PIN desactivador:
                        {{ item.pin_desactivador }}
                      </p>
                    </blockquote>
                  </b-col>
                </b-row>

                <div class="botonActualizarUsuaria text-center">
                  <b-button
                    class="btnActualizarUsuaria"
                    type="submit"
                    @click="actualizarDU"
                    >Actualizar datos de Usuaria</b-button
                  >
                </div>
                <div class="botonEliminarUsuaria text-center">
                  <b-button
                    class="btnEliminarUsuaria"
                    type="submit"
                    @click="eliminarUsuaria"
                    >Eliminar cuenta de Usuaria</b-button
                  >
                </div>
              </div>

              <!--EDITAR INFORMACION-->
              <div class="info-usuario" v-if="verActualizarDP == true">
                <h6 class="infoLegend b-b-default f-w-600">
                  Actualizar datos personales
                </h6>

                <b-row class="infoP">
                  <b-col cols="12">
                    <h5 class="text-center">
                      Solo puedes realizar modificaciones en los siguientes
                      campos:
                    </h5>
                    <b-form
                      name="form"
                      id="form"
                      v-on:submit.prevent="actualizarDatosPersonales()"
                    >
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
                          v-model="persona.ap_pa"
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
                          v-model="persona.ap_ma"
                          placeholder="Ingresa solo el apellido materno."
                          autocomplete="off"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <!--Fecha nacimiento-->
                      <div id="input-fechanac">
                        <label for="example-datepicker"
                          >Fecha de nacimiento</label
                        >
                        <b-form-datepicker
                          id="idfechanac"
                          placeholder="YYYY-MM-DD"
                          v-model="persona.fecha_nac"
                          class="mb-2"
                        ></b-form-datepicker>
                      </div>

                      <!--Correo-->
                      <b-form-group
                        id="input-email"
                        label="Correo"
                        label-for="inputemail"
                      >
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

                      <!--ESPACIO PARA NOTIFICACIONES-->
                      <!--no falló-->
                      <div
                        class="actualizarPersonaExito text-center"
                        role="alert"
                        v-if="mensajeActualizarExito == true"
                      >
                        <h6>
                          Tus datos se han actualizado correctamente. Ahora ve
                          la información de persona.
                        </h6>
                      </div>

                      <!--Si hay error-->
                      <div
                        class="actualizarPersonaError text-center"
                        role="alert"
                        v-if="mensajeActualizarError == true"
                      >
                        <h6>
                          Hubo un error en tu petición, intentar de nuevo.
                        </h6>
                      </div>

                      <div class="botonActualizarUsuaria text-center">
                        <b-button class="btnActualizarUsuaria" type="submit"
                          >Actualizar datos personales</b-button
                        >
                      </div>
                    </b-form>
                  </b-col>
                </b-row>
              </div>

              <!--EDITAR INFORMACION USIARIA-->
              <div class="info-usuario" v-if="verActualizarUsuaria == true">
                <h6 class="infoLegend b-b-default f-w-600">
                  Modificar datos de Usuaria
                </h6>

                <b-row class="infoP">
                  <b-col cols="12">
                    <h5 class="text-center">
                      Selecciona la acción que quieras realizar
                    </h5>
                    <div class="espacioBtn text-center mt-3">
                      <b-button
                        pill
                        class="menuUsuaria1"
                        type="submit"
                        @click="modificarDatosUsuaria"
                        >Modificar datos de Usuaria</b-button
                      >
                      <b-button
                        pill
                        class="menuUsuaria1"
                        type="submit"
                        @click="actualizarEnfermedad"
                        >Actualizar enfermedades</b-button
                      >
                      <b-button
                        pill
                        class="menuUsuaria2"
                        type="submit"
                        @click="redirigirSenaP"
                        >Agregar seña particular</b-button
                      >
                      <b-button
                        pill
                        class="menuUsuaria2"
                        type="submit"
                        @click="redirigirModificarSenaP"
                        >Modificar descripción de señas particulares</b-button
                      >
                      <b-button
                        pill
                        class="menuUsuaria2"
                        type="submit"
                        @click="borrarSena"
                        >Borrar seña particular</b-button
                      >
                      <b-button
                        pill
                        class="menuUsuaria3"
                        type="submit"
                        @click="redirigirDispositivo"
                        >Asociar dispositivo</b-button
                      >
                      <b-button
                        pill
                        class="menuUsuaria3"
                        type="submit"
                        @click="cambiarPINDispositivo"
                        >Cambiar PIN de desactivación</b-button
                      >
                      <b-button
                        pill
                        class="menuUsuaria3"
                        type="submit"
                        @click="quitarDispositivo"
                        >Desasociar dispositivo</b-button
                      >
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import { setTimeout } from "timers";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/messaging";
import Swal from "sweetalert2";

export default {
  name: "Login",
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      submited: false,
      titulo: "Perfil | Eyes On",
      esUsuaria: false,
      verActualizarDP: false,
      verActualizarUsuaria: false,
      persona: {
        email: "",
        username: "",
        nombre: "",
        ap_pa: "",
        ap_ma: "",
        genero: "",
        fecha_nac: "",
        contrasena: "",
        contrasena_conf: "",
        is_usuaria: "",
        is_contacto: "",
      },
      genero: localStorage.getItem("genero"),
      usuaria: {
        estatura: "",
        estado_c: "",
        escolaridad: "",
        nacionalidad: "",
        tipo_n: "",
        complexion: "",
        color_o: "",
        forma_r: "",
        color_c: "",
        color_p: "",
        tipo_c: "",
        textura_c: "",
        enfermedades: "",
        senas_p: "",
        dispositivos: "",
      },
      // MENSAJES PARA NOTIFICACIONES DE ACTUALIZACIÓN
      mensajeActualizarExito: "",
      mensajeActualizarError: "",

      titulo_msj: "",
      cuerpo_msj: "",
    };
  },
  mounted() {
    this.obtenerInfoPersona();
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
    //

    const messaging = this.$messaging;

    messaging
      .requestPermission()
      .then(() => firebase.messaging().getToken())
      .then((tokenNotificacion) => {
        console.log(tokenNotificacion); // Receiver Token to use in the notification
        this.salvarTokenNotificacion(tokenNotificacion);
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });

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
    verInfoPersonal() {
      this.esUsuaria = false;
      this.verActualizarDP = false;
      this.verActualizarUsuaria = false;
    },
    verInfoUsuaria() {
      this.esUsuaria = true;
      this.verActualizarDP = false;
      this.verActualizarUsuaria = false;
      this.obtenerInfoUsuaria();
      this.obtenerSenasParticulares();
      this.obtenerDispositivos();
    },
    actualizarDP() {
      this.esUsuaria = null;
      this.verActualizarDP = true;
    },
    actualizarContrasena() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "ActualizarContrasena" }),
          500
        );
      }, 500);
    },
    activarNotificaciones() {
      var config = {
        apiKey: "AIzaSyCBlCCyd5wBFkLgn7E-hQfLqRLxj9NtB8o",
        authDomain: "notificaciones-1784b.firebaseapp.com",
        projectId: "notificaciones-1784b",
        storageBucket: "notificaciones-1784b.appspot.com",
        messagingSenderId: "84796054027",
        appId: "1:84796054027:web:ee8f55a92bea6c2706450e",
        measurementId: "G-0L90RNQKYY",
      };

      //if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
      //}

      const messaging = firebase.messaging();
      messaging.usePublicVapidKey(
        "BNB347r3tkMxI7GXmg2DKQhmvV6PaK5A90JCrddIr9SlALWcV7WLumTOCQmSMd9CfoprZpWcheES1PNkxMp5MoE"
      );

      messaging
        .requestPermission()
        .then(() => {
          console.log("Notification permission granted.");
          messaging.getToken().then((tokenNotificacion) => {
            console.log("New token created: ", tokenNotificacion);
            this.salvarTokenNotificacion(tokenNotificacion);
          });
        })
        .catch((err) => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    salvarTokenNotificacion(tokenNotificacion) {
      console.log("salvando");
      let token_autorizacion = localStorage.getItem("token");
      const registrar_token_url =
        "https://backend-upiita.herokuapp.com/registrar-notificacion-token/";
      const payload = {
        registration_id: tokenNotificacion,
        type: "web",
      };
      //uso de axios
      axios
        .post(registrar_token_url, payload, {
          headers: {
            Authorization: `Token ${token_autorizacion}`,
          },
        })
        .then((response) => {
          console.log(
            "Token de notificacion guardado de manera satisfactoria."
          );
          console.log(response.data);
        })
        .catch((error) => {
          console.log("No se pudo salvar el token");
        });
    },

    eliminarCuenta() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "BorrarPersona" }), 500);
      }, 500);
    },
    eliminarUsuaria() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "BorrarUsuaria" }), 500);
      }, 500);
    },
    crearCuentaUsuaria() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "RegistroUsuaria" }), 500);
      }, 500);
    },
    borrarSena() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "BorrarSena" }), 500);
      }, 500);
    },
    actualizarEnfermedad() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "ActualizarEnfermedad" }),
          500
        );
      }, 500);
    },
    redirigirModificarSenaP() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "ModificarSena" }), 500);
      }, 500);
    },
    modificarDatosUsuaria() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "ModificarDatosUsuaria" }),
          500
        );
      }, 500);
    },
    actualizarDU() {
      this.esUsuaria = null;
      this.verActualizarDP = false;
      this.verActualizarUsuaria = true;
    },
    obtenerInfoPersona() {
      let token = "Token " + localStorage.getItem("token");
      let username = localStorage.getItem("username");
      console.log(token);

      axios({
        url: "https://backend-upiita.herokuapp.com/persona/" + username + "/",
        method: "get",
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.persona.nombre = data.data.nombre;
          this.persona.email = data.data.email;
          this.persona.username = data.data.username;
          this.persona.ap_pa = data.data.apellido_paterno;
          this.persona.ap_ma = data.data.apellido_materno;
          this.persona.genero = data.data.genero;
          this.persona.fecha_nac = data.data.fecha_nacimiento;
          if (data.data.is_usuaria == true) {
            this.persona.is_usuaria = "Sí";
          } else {
            this.persona.is_usuaria = "No";
          }

          if (data.data.is_contacto_confianza == true) {
            this.persona.is_contacto = "Sí";
          } else {
            this.persona.is_contacto = "No";
          }
        })
        .catch((error) => {
          console.error(error);
        });
      this.obtenerInfoUsuaria;
    },
    actualizarDatosPersonales() {
      let token = "Token " + localStorage.getItem("token");
      let username = localStorage.getItem("username");

      let json = {
        email: this.persona.email,
        username: this.persona.username,
        nombre: this.persona.nombre,
        apellido_paterno: this.persona.ap_pa,
        apellido_materno: this.persona.ap_ma,
        fecha_nacimiento: this.persona.fecha_nac,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/persona/" + username + "/",
        method: "patch",
        data: json,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.mensajeActualizarExito = true;
          this.mensajeActualizarError = false;
          this.$store.state.username = data.data.username;
          this.$store.dispatch("obtenerUsernameAction");
        })
        .catch((error) => {
          this.mensajeActualizarExito = false;
          this.mensajeActualizarError = true;
        });
    },
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
          this.usuaria.estado_c = data.data.estado_civil.estado_civil;
          this.usuaria.escolaridad = data.data.escolaridad;
          this.usuaria.nacionalidad = data.data.pais.nacionalidad;
          this.usuaria.tipo_n = data.data.tipo_nariz.tipo_nariz;
          this.usuaria.complexion = data.data.complexion.complexion;
          this.usuaria.color_o = data.data.color_ojo.color_ojo;
          this.usuaria.forma_r = data.data.forma_rostro.forma_rostro;
          this.usuaria.color_c = data.data.color_cabello.color_cabello;
          this.usuaria.color_p = data.data.color_piel.color_piel;
          this.usuaria.tipo_c = data.data.tipo_ceja.tipo_ceja;
          this.usuaria.textura_c = data.data.textura_cabello.textura_cabello;

          //Obtener enfermedades
          this.usuaria.enfermedades = data.data.enfermedades;
          /*let enfermedadUsuaria = data.data.enfermedades;
            this.usuaria.enfermedades = "";
            for (var key in enfermedadUsuaria) {
              let espacio = "\n";
              this.usuaria.enfermedades +=
                enfermedadUsuaria[key].nombre_enfermedad + espacio;
            }*/
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
    obtenerDispositivos() {
      let token = "Token " + localStorage.getItem("token");

      axios({
        url:
          "https://backend-upiita.herokuapp.com/dispositivo/mis-dispositivos",
        method: "get",
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {
          this.usuaria.dispositivos = data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    redirigirDispositivo() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "RegistroDispositivo" }),
          500
        );
      }, 500);
    },
    redirigirSenaP() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "RegistroSenasParticulares" }),
          500
        );
      }, 500);
    },
    quitarDispositivo() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "EliminarDispositivo" }),
          500
        );
      }, 500);
    },
    cambiarPINDispositivo() {
      setTimeout(() => {
        setTimeout(
          () => this.$router.push({ name: "ModificarPINDispositivo" }),
          500
        );
      }, 500);
    },
  },
};
</script>

<style>
.espacioUsuario {
  background-color: #ffffff;
  padding: 0px;
  margin: 0px;
}
/*Colores*/

.espacioPerfil {
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

.perfil {
  align-content: center;
  align-items: center;
  padding: 1px;
}

.presentacion h1 {
  font-family: var(--fontmain);
  font-weight: 600;
}

.presentacion h4 {
  font-family: var(--fontsecondary);
  font-size: 1.7rem;
}

.presentacion h3 {
  font-family: var(--fontsecondary);
  font-size: 1.3rem;
}

.verInfoUsuario {
  font-family: var(--fontmain);
}

.verInfP:link {
  color: var(--morado);
  background-color: transparent;
  text-decoration: none;
}

.verInfP:hover {
  color: var(--verdeoscuro);
  background-color: transparent;
  text-decoration: unset;
}

.username {
  font-style: italic;
}

.usuario-block {
  margin: 1px;
  padding: 1px;
}

.usuario {
  text-align: center;
  /*background-color: maroon;*/
}

.perfilGenero {
  margin: 10px;
}

.espacioFormLogin h3 {
  margin-top: 8px;
  font-family: var(--fontmain);
  font-weight: 400;
  text-align: center;
}

.infoLegend {
  margin-bottom: 20px;
  padding-bottom: 5px;
  font-weight: 600;
  font-family: var(--fontmain);
  font-size: 1.5em;
  text-align: center;
  color: var(--verdeoscuro);
}

.informacionPersona {
  margin-bottom: 20px;
  margin-top: 0px;
  font-weight: 600;

  font-family: var(--fontsecondary);
}

.informacionPersona p {
  margin-bottom: 0px;
}

.informacionPersona h6 {
  margin-bottom: 20px;
  font-weight: 300;
}

.infoP h6 {
  font-family: var(--fontsecondary);
  margin-bottom: 0px;
  margin-top: 0px;
  padding: 0px;
  padding-top: 0px;
  font-weight: 300;
}
.info-usuario {
  margin-top: 10px;
}

.info-usuario li {
  font-family: var(--fontsecondary);
}

.senasP h4 {
  font-weight: 600;
  font-size: 1em;
  font-family: var(--fontsecondary);
}

.senasP p {
  font-weight: 400;
}

.enfermedades h4 {
  font-weight: 600;
  font-size: 1em;
  font-family: var(--fontsecondary);
}

.enfermedades p {
  font-weight: 400;
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
#input-fechanac {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}
/* BOTONES */
.btnActualizarPersona {
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 80%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  padding: 3px;
}

.btnEliminarPersona {
  background-color: rgb(233, 103, 103);
  align-items: center;
  border: 2px solid rgb(155, 67, 67);
  width: 80%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  padding: 3px;
}
.btnActivarNotificaciones {
  background-color: rgb(94, 94, 94);
  align-items: center;
  border: 2px solid rgb(44, 44, 44);
  width: 80%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  padding: 3px;
}
.btnCrearUsuaria {
  background-color: rgb(183, 91, 206);
  align-items: center;
  border: 2px solid rgb(125, 59, 141);
  width: 80%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  padding: 3px;
}

.btnActualizarContrasena {
  background-color: #532a42;
  align-items: center;
  border: 2px solid #391f2d;
  width: 80%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  padding: 3px;
}

.btnActualizarUsuaria {
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 80%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  padding: 3px;
}

.btnEliminarUsuaria {
  background-color: rgb(233, 103, 103);
  align-items: center;
  border: 2px solid rgb(155, 67, 67);
  width: 80%;
  transition-duration: 0.4s;
  margin-bottom: 15px;
  padding: 3px;
}

.menuUsuaria1 {
  background-color: var(--verdeclaro);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 70%;
  transition-duration: 0.4s;
  margin-top: 5px;
  margin-bottom: 5px;
}

.menuUsuaria2 {
  background-color: var(--gris);
  align-items: center;
  border: 2px solid #525151;
  width: 70%;
  transition-duration: 0.4s;
  margin-top: 5px;
  margin-bottom: 5px;
}

.menuUsuaria3 {
  background-color: #532a42;
  align-items: center;
  border: 2px solid #391f2d;
  width: 70%;
  transition-duration: 0.4s;
  margin-top: 5px;
  margin-bottom: 5px;
}

/* MENSAJES */
.actualizarPersonaExito {
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

.actualizarPersonaError {
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

@media only screen and (min-width: 768px) {
  .espacioPerfil {
    width: 90%;
    margin-top: 58px;
    min-height: 60vh;
  }
  .infoLegend {
    text-align: left;
  }

  .botonActualizarPersona {
    text-align: left !important;
  }
  .botonEliminarPersona {
    text-align: left !important;
  }
  .botonActivarNotificaciones {
    text-align: left !important;
  }
  .botonCrearUsuaria {
    text-align: left !important;
  }

  .botonActualizarUsuaria {
    text-align: left !important;
  }
  .botonEliminarUsuaria {
    text-align: left !important;
  }
  .botonActualizarContrasena {
    text-align: left !important;
  }
  .btnActualizarPersona {
    width: 35%;
  }
  .btnEliminarPersona {
    width: 35%;
  }
  .btnActivarNotificaciones {
    width: 35%;
  }
  .btnCrearUsuaria {
    width: 35%;
  }
  .btnActualizarUsuaria {
    width: 40%;
  }
  .btnEliminarUsuaria {
    width: 40%;
  }
  .btnActualizarContrasena {
    width: 35%;
  }
  .menuUsuaria1 {
    width: 55%;
  }
  .menuUsuaria2 {
    width: 55%;
  }
  .menuUsuaria3 {
    width: 55%;
  }
}
</style>
