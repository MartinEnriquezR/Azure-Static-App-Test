<template>
  <div class="aviso">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormSobreEyesOn  p-3 text-left">
        <h1 class="m-b-3">
          Sistema de Alerta y Ubicación para Mujeres en Riesgo de Desaparición
        </h1>
        <h4>
          Antes de realizar el registro para tener acceso al sistema, es
          recomendable leer la siguiente información.
        </h4>
        <h2>¿Qué es EYES ON?</h2>
        <h3>
          EYES ON es la Progressive Web App del Sistema de Alerta y Ubicación
          para Mujeres en Riesgo de Desaparición. Está diseñada para ser
          utilizada por tres tipos de usuarios:
        </h3>
        <ul>
          <li>Usuarias</li>
          <li>Contactos de Confianza</li>
          <li>Usuarios generales</li>
        </ul>
        <h2>¿Quiénes son las Usuarias?</h2>
        <h3>
          Son aquellas personas de género femenino, con edad comprendida entre
          los 15 y 50 años, las cuales desean ser localizadas por Contactos de
          Confianza en caso de estar en una situación de riesgo. Para que esto
          sea posible, deben realizar su registro en el sistema, esto incluye
          sus datos personales, enfermedades que pueda tener y señas
          particulares. Si tiene dudas sobre el uso que le daremos a sus datos,
          puede visitar nuestro
          <router-link to="/aviso-privacidad"> Aviso de Privacidad</router-link
          >. Entendemos que las señas particulares o enfermedades que posea
          pueden cambiar con el tiempo, por eso las Usuarias pueden también
          actualizar su información en la sección de Configuración.
        </h3>
        <h3>
          Adicionalmente, las Usuarias pueden crear un Grupo de Confianza y
          obtener así un código de invitación, el cual deben compartir con sus
          Contactos de Confianza para que ingresen a su grupo y así éstos puedan
          localizarlas en caso de ser necesario.
        </h3>
        <h2>¿Qué es un Dispositivo Rastreador?</h2>
        <h3>
          Es un dispositivo electrónico que las Usuarias deben tener previo a su
          resgistro en el sistema, este al ser activado mediante un botón en su
          superficie, enviará su ubicación cada determinado tiempo al servidor.
        </h3>
        <h2>¿Quiénes son los Contactos de Confianza?</h2>
        <h3>
          Son personas de 15 a 50 años de edad que, independientemente de su
          género se registran en el sistema para entrar a los Grupos de
          Confianza de las Usuarias y así poder localizarlas cuando éstas se
          encuentren en riesgo.
        </h3>
        <h3>
          Si las Usuarias activan su Dispostivo Rastreador, los Contactos de
          Confianza recibirán una notificación en su dispositivo, con el nombre
          de la Usuaria y la fecha de activación de alerta. Los Contactos de
          Confianza podrán visualizar su ubicación, la cual podrán actualizar, y
          así visualizar los puntos por los que han pasado.
        </h3>
        <h3>
          Si la Usuaria no ha desactivado su alerta y han pasado diez minutos
          desde su activación, los Contactos de Confianza podrán contestar un
          Cuestionario, para recabar más información sobre lo sucedido. Parte de
          la información ingresada, alimenta las gráficas y cifras que se pueden
          encontrar en la sección de
          <router-link to="/estadisticas"> Estadísticas</router-link>.
        </h3>
        <h2>¿Quiénes son los Usuarios Generales?</h2>
        <h3>
          Son aquellos usuarios que no tienen registro en el sistema, pero que
          desean interactuar con la sección de<router-link to="/estadisticas">
            Estadísticas</router-link
          >.
        </h3>
        <h2>¿Qué información puedo encontrar en las Estadísticas?</h2>
        <h3>
          En esta sección podrás hacer una búsqueda según un mes y año y así
          obtener más información sobre la cantidad de alertas activadas en ese
          periodo Se tienen entonces las siguientes gráficas:
        </h3>
        <ul>
          <li><i> Alertas registradas en ese año de Enero a Diciembre.</i></li>
          <li><i>Mapa de puntos de activación de alertas.</i></li>
          <li><i>Número de alertas por año.</i></li>
          <li>
            <i>Relación entre alertas y denuncias previas por violencia.</i>
          </li>
          <li><i>Número de alertas en ese mes.</i></li>
          <li>
            <i
              >Rango de edad de las Usuarias contra la cantidad de alertas en el
              mes.</i
            >
          </li>
          <li><i>Alertas por hora y mes.</i></li>
          <li><i>Alertas por nacionalidad de las Usuarias.</i></li>
          <li><i>Alertas por complexión de las Usuarias.</i></li>
          <li><i>Alertas por color de ojos de las Usuarias.</i></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import { required, email } from "vuelidate/lib/validators";
import { setTimeout } from "timers";
import axios from "axios";
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
      titulo: "Sobre Eyes On | Eyes On",
      persona: {
        email: "",
        contrasena: "",
      },
      error: null,
      error_msg: "",
      show: true,
      loggeado: null,
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

  methods: {},
};
</script>

<style>
.aviso {
  padding-top: 55px;
  padding-bottom: 80px;
  padding: 0px;
  margin: 0px;
}

.espacioFormSobreEyesOn {
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
}

.espacioFormSobreEyesOn h1 {
  font-family: var(--fontmain);
  color: var(--gris);
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
}

.espacioFormSobreEyesOn h2 {
  font-family: var(--fontmain);
  color: var(--verdeoscuro);
  font-size: 1.4em;
}

.espacioFormSobreEyesOn h3 {
  font-family: var(--fontsecondary);
  color: var(--gris);
  font-size: 1.2em;
  font-weight: 400;
  text-align: justify;
}

.espacioFormSobreEyesOn h4 {
  font-family: var(--fontsecondary);
  color: var(--morado);
  font-size: 1em;
  font-weight: 400;
  text-align: center;
  margin-bottom: 30px;
}

.espacioFormSobreEyesOn ul {
  font-family: var(--fontmain);
  color: var(--gris);
}
.espacioFormSobreEyesOn ol {
  font-family: var(--fontmain);
  color: var(--gris);
}

.espacioFormSobreEyesOn a {
  font-family: var(--fontmain);
  color: var(--verdeoscuro);
  font-weight: 400;
  font-size: 1.2em;
}

.espacioFormSobreEyesOn a:hover {
  color: var(--verdeclaro);
  text-decoration: none;
}
@media only screen and (min-width: 768px) {
  .espacioFormSobreEyesOn {
    width: 90%;
  }
  .accesoConcedido {
    height: 30px;
  }
}
</style>
