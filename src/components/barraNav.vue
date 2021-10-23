<template>
  <div class="container-fluid m-0 p-0">
    <div id="navbar">
      <b-navbar class="header" type="dark" fixed="top" toggleable="md">
        <b-navbar-brand href="/">EYES ON</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <router-link to="/" custom v-slot="{ navigate }">
                <span @click="navigate" @keypress.enter="navigate" role="link"
                  >HOME</span
                >
              </router-link>
            </b-nav-item>

            <b-nav-item v-if="is_logged == false">
              <router-link to="/login" custom v-slot="{ navigate }">
                <span @click="navigate" @keypress.enter="navigate" role="link"
                  >LOGIN</span
                >
              </router-link>
            </b-nav-item>

            <b-nav-item>
              <router-link to="/estadisticas" custom v-slot="{ navigate }">
                <span @click="navigate" @keypress.enter="navigate" role="link"
                  >ESTADÍSTICAS</span
                >
              </router-link>
            </b-nav-item>

            <b-nav-item v-if="is_logged == false">
              <router-link to="/registro" custom v-slot="{ navigate }">
                <span @click="navigate" @keypress.enter="navigate" role="link"
                  >REGÍSTRATE</span
                >
              </router-link>
            </b-nav-item>
          </b-navbar-nav>

          <div v-if="is_logged">
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>@{{ username }}</em>
                </template>
                <b-dropdown-item
                  href="#"
                  v-if="is_usuaria"
                  @click="menuUsuaria()"
                  >Usuaria</b-dropdown-item
                >
                <b-dropdown-item
                  href="#"
                  v-if="is_contacto"
                  @click="menuContacto()"
                  >Contacto de Confianza</b-dropdown-item
                >
                <b-dropdown-item href="#" @click="infoPersona()"
                  >Mi Configuración</b-dropdown-item
                >
                <b-dropdown-item href="#" @click="logout()">
                  Cerrar sesión</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </div>
        </b-collapse>
      </b-navbar>
      <router-view />
    </div>
    <div></div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      is_logged: false,
      username: null,
      is_usuaria: null,
      is_contacto: null,
    };
  },
  mounted() {
    this.validarInicioSesion();
  },
  methods: {
    validarInicioSesion() {
      if (localStorage.getItem("token") == null) {
      } else {
        this.is_logged = localStorage.getItem("islogged");
        this.username = localStorage.getItem("username");
        this.is_usuaria = JSON.parse(localStorage["is_usuaria"]);
        this.is_contacto = JSON.parse(localStorage["is_contacto"]);
      }
    },
    logout() {
      this.$store.dispatch("logoutAction");
      localStorage.clear();

      //Redireccionar
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "Home" }), 500);
      }, 500);

      //this.$router.go();
    },
    menuContacto() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuContacto" }), 1000);
      }, 1000);
    },
    menuUsuaria() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "MenuUsuaria" }), 1000);
      }, 1000);
    },
    infoPersona() {
      setTimeout(() => {
        setTimeout(() => this.$router.push({ name: "Perfil" }), 1000);
      }, 1000);
    },
  },
};
</script>

<style>
.header {
  background-color: var(--grisoscuro);
  font-family: var(--fontsecondary);
}

.navBar {
  position: sticky;
  top: 0;
}
</style>
