<template>
  <div class="aviso">
    <vue-headful :title="titulo" />
    <barraNav />
    <div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormAvisoPrivacidad  p-3 text-left">
        <h1 class="m-b-3">
          AVISO DE PRIVACIDAD DEL SISTEMA DE ALERTA Y UBICACIÓN PARA MUJERES EN
          RIESGO DE DESAPARICIÓN (EYES ON)
        </h1>
        <h4>Vigente a partir del 1 de Agosto del 2021</h4>
        <h2>¿Quién dará tratamiento a tus datos personales?</h2>
        <h3>
          Los datos personales proporcionados por usted serán utilizados por el
          SISTEMA DE ALERTA Y LOCALIZACIÓN PARA MUJERES EN RIESGO DE
          DESAPARICIÓN (EYES ON), sus filiales y/o subsidiarias con domicilio en
          Avenida Instituto Politécnico Nacional 2580, La Laguna Ticoman,
          Gustavo A. Madero, 07340 Ciudad de México, CDMX.
        </h3>
        <h2>¿Qué información vamos a recabar?</h2>
        <h3>
          A continuación, señalamos expresa y limitativamente los datos que
          podremos recabar de usted como usuario posible usuario: Datos
          Personales de identificación y contacto:
        </h3>
        <ul>
          <li>
            Nombre.
          </li>
          <li>
            Apellidos paterno y materno.
          </li>
          <li>
            Género.
          </li>
          <li>
            Edad.
          </li>
          <li>
            Fecha de nacimiento.
          </li>
          <li>
            Correo electrónico.
          </li>
        </ul>
        <h3>Datos sensibles como:</h3>
        <b-row class="mt-3">
          <b-col cols="12" md="6">
            <ul>
              <li>
                Estatura.
              </li>
              <li>
                Estado civil.
              </li>
              <li>
                Escolaridad.
              </li>
              <li>
                Nacionalidad.
              </li>
              <li>
                Tipo de nariz.
              </li>
              <li>
                Complexión.
              </li>
              <li>Color de ojos.</li>
              <li>Forma de rostro.</li>
            </ul>
          </b-col>
          <b-col cols="12" md="6">
            <ul>
              <li>Color de cabello.</li>
              <li>Color de piel.</li>
              <li>Tipo de ceja.</li>
              <li>Textura de cabello.</li>
              <li>Enfermedades.</li>
              <li>Señas particulares.</li>
              <li>
                Parentesco.
              </li>
            </ul>
          </b-col>
        </b-row>
        <h2>¿Para qué fines usamos tu información?</h2>
        <h3>
          Los datos personales que nos ha proporcionado serán utilizados para
          las siguientes actividades primarias y necesarias: (i) identificarle,
          (ii) dar seguimiento, actualización y confirmación en cuanto a
          acciones propias del sistema, (iii) mantener actualizados nuestros
          registros, (iv) alimentar la base de datos de la sección de
          Estadísticas del sistema.
        </h3>
        <h3>
          En caso de que no desee que sus datos personales sean tratados para
          alguna o todas las finalidades adicionales, desde este momento usted
          nos puede comunicar lo anterior a la dirección:
          tt2_upiita_eyeson@gmail.com
        </h3>
        <h2>¿A qué terceros podemos transferir tu información?</h2>
        <h3>
          El SISTEMA DE ALERTA Y LOCALIZACIÓN PARA MUJERES EN RIESGO DE
          DESAPARICIÓN (EYES ON) para cumplir las finalidades necesarias
          anteriormente descritas u otras aquellas exigidas legalmente o por las
          autoridades competentes, podrá transferir los datos personales a:
        </h3>
        <ol>
          <li>
            Autoridades laborales y/ o a otras autoridades competentes para dar
            cumplimiento a disposiciones legales.
          </li>
          <li>
            A empresas matrices, subsidiarias y/o filiales del el SISTEMA DE
            ALERTA Y LOCALIZACIÓN PARA MUJERES EN RIESGO DE DESAPARICIÓN (EYES
            ON).
          </li>
          <li>A autoridades competentes en los casos legalmente previstos.</li>
        </ol>
        <h3>
          Para el efecto, le informamos que el consentimiento para la
          transferencia de sus datos personales no es requerido.
        </h3>
        <h2>
          ¿Cómo te notificaremos de los cambios que efectuemos al presente Aviso
          de Privacidad?
        </h2>
        <h3>
          El SISTEMA DE ALERTA Y LOCALIZACIÓN PARA MUJERES EN RIESGO DE
          DESAPARICIÓN (EYES ON) le notificará de cualquier cambio a su aviso de
          privacidad a través de nuestra página de internet:
          https://eyes-on-pt-upiita.web.app/, por lo cual le pedimos revise la
          misma de manera periódica.
        </h3>
        <h2>
          ¿Cómo puedes hacernos llegar tus dudas?
        </h2>
        <h3>
          Nuestro Departamento de Protección de Datos Personales queda a sus
          órdenes para proporcionarle cualquier información adicional que
          requiera o, en su caso, para resolver cualquier duda que pudiera
          surgirle en materia de privacidad y protección de datos personales,
          para lo que podrá contactarnos a través del correo electrónico
          tt2_upiita_eyeson@gmail.com .
        </h3>
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
      titulo: "Iniciar Sesión | Eyes On",
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

.espacioFormAvisoPrivacidad {
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

.espacioFormAvisoPrivacidad h1 {
  font-family: var(--fontmain);
  color: var(--gris);
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
}

.espacioFormAvisoPrivacidad h2 {
  font-family: var(--fontmain);
  color: var(--verdeoscuro);
  font-size: 1.4em;
}

.espacioFormAvisoPrivacidad h3 {
  font-family: var(--fontsecondary);
  color: var(--gris);
  font-size: 1.2em;
  font-weight: 400;
  text-align: justify;
}

.espacioFormAvisoPrivacidad h4 {
  font-family: var(--fontsecondary);
  color: var(--morado);
  font-size: 1em;
  font-weight: 400;
  text-align: center;
  margin-bottom: 30px;
}

.espacioFormAvisoPrivacidad ul {
  font-family: var(--fontmain);
  color: var(--gris);
}
.espacioFormAvisoPrivacidad ol {
  font-family: var(--fontmain);
  color: var(--gris);
}
@media only screen and (min-width: 768px) {
  .espacioFormAvisoPrivacidad {
    width: 90%;
  }
  .accesoConcedido {
    height: 30px;
  }
}
</style>
