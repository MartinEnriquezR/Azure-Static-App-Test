<template>
  <div class="login">
    <vue-headful :title="titulo" />
    <barraNav />
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h3>Página no encontrada</h3>
          <h1><span>4</span><span>0</span><span>4</span></h1>
        </div>
        <h2>Esta ruta no se encuentra en el sistema</h2>
      </div>
    </div>
    <!--<div
      class="espacioLogin m-0 vh-100 row justify-content-around align-items-center"
    >
      <div class="espacioFormLogin  p-3 text-left"></div>
    </div>-->
  </div>
</template>

<script>
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";

export default {
  name: "Login",
  components: {
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      submited: false,
      titulo: "Página no encontrada | Eyes On",
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
};
</script>

<style>
.login {
  font-size: 16px;
  margin-top: 0px;
}

.espacioLogin {
  background-color: #ffffff;
}
/*Colores*/

.espacioFormLogin {
  border-radius: 10px;
  color: var(--gris);
  width: 80%;
  -webkit-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 10px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
}

#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 520px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
}

.notfound .notfound-404 {
  position: relative;
  height: 240px;
}

.notfound .notfound-404 h1 {
  font-family: "Montserrat", sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 252px;
  font-weight: 900;
  margin: 0px;
  color: var(--morado);
  text-transform: uppercase;
  letter-spacing: -40px;
  margin-left: -20px;
}

.notfound .notfound-404 h1 > span {
  text-shadow: -8px 0px 0px #fff;
}

.notfound .notfound-404 h3 {
  font-family: var(--fontsecondary);
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--gris);
  margin: 0px;
  letter-spacing: 3px;
  padding-left: 6px;
}

.notfound h2 {
  font-family: var(--fontsecondary);
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--verdeoscuro);
  margin-top: 0px;
  margin-bottom: 25px;
}

@media only screen and (min-width: 768px) {
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 200px;
  }
  .notfound .notfound-404 h1 {
    font-size: 200px;
  }
}

@media only screen and (max-width: 480px) {
  .notfound .notfound-404 {
    height: 162px;
  }
  .notfound .notfound-404 h1 {
    font-size: 162px;
    height: 150px;
    line-height: 162px;
  }
  .notfound h2 {
    font-size: 16px;
  }
}
</style>
