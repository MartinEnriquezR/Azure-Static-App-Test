<template>
  <div class="estadisticas">
    <vue-headful :title="titulo" />
    <barraNav />
    <div class="presentacionGraficas">
      <h3>
        REPORTE DE DESAPARICIÓN DE MUJERES EN EL ESTADO DE MÉXICO
      </h3>
    </div>

    <div class="ingresarParametros text-center">
      <b-form name="form" id="form" v-on:submit.prevent="obtenerGraficas()">
        <h5 class="titularPregunta">
          Ingresa el año y mes de las estadísticas que deseas visualizar
        </h5>
        <b-row class="informacionPersona m-0">
          <b-col cols="6">
            <!--Mes-->
            <b-form-group id="input-mes" label="Mes" label-for="inputmes">
              <b-form-select
                id="inputmes"
                v-model="grafica.mes"
                :options="meses"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
          <!--Año-->
          <b-col cols="6">
            <b-form-group id="input-ano" label="Año" label-for="inputano">
              <b-form-select
                id="inputano"
                v-model="grafica.ano"
                :options="anos"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Boton obtener graficas-->
        <div class="espacioBtnLogin text-center">
          <b-button class="consultar" type="submit">Consultar</b-button>
        </div>
      </b-form>
    </div>

    <div class="menuSinGraficas text-center" v-if="ver_graficas == false">
      <h3>
        Las gráficas están alimentadas por la información recolectada de las
        alertas provenientes de los Dispositivos Rastreadores, por lo que
        podrían no representar en su totalidad al número de mujeres
        desaparecidas.
      </h3>
    </div>
    <div v-if="ver_graficas == true">
      <b-row class="graficas m-0">
        <!--Introducción a estadisticas anuales-->
        <b-col cols="12">
          <div class="espacioTitularAnual">
            <h4 class="titularAnual">Cifras del {{ grafica.ano }}</h4>
          </div>
        </b-col>

        <!--Linear, alertas al año-->
        <b-col cols="12" v-if="error_horavsmes == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Alertas registradas en el {{ grafica.ano }} de Enero a Diciembre
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>
        <b-col cols="12" v-if="error_horavsmes == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Alertas registradas en el {{ grafica.ano }} de Enero a Diciembre
            </h4>
            <line-chart
              :data="datosAlertaPorMeses"
              ytitle="No. alertas"
              xtitle="Meses"
              :colors="['#5b2e48', '#a5b232']"
              label="Alertas"
              :download="true"
            ></line-chart>
          </div>
        </b-col>

        <!--Mapa con puntos de activacion-->
        <b-col cols="12" v-if="error_puntos_incidencia == false">
          <div class="espacioMapa">
            <h4 class="graficas">
              Puntos de activación de alertas en el {{ grafica.ano }}
            </h4>
            <div>
              <l-map
                class="mapa"
                style="height: 350px"
                :zoom="zoom"
                :center="center"
              >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker
                  v-for="(punto, index) in trayectorias.puntos"
                  :key="index"
                  :lat-lng="punto"
                  @click="verInfo(index)"
                >
                </l-marker>
              </l-map>
            </div>

            <div class="puntoSeleccionadoEstadisticas">
              <h4>Selecciona un punto para obtener más información</h4>
              <h5 v-if="verInformacion == true">Ubicación: {{ alerta }}</h5>
              <h5 v-if="verInformacion == true">Fecha: {{ fecha }}</h5>
              <h5 v-if="verInformacion == true">Hora: {{ hora }}</h5>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_puntos_incidencia == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Puntos de activación de alertas en el {{ grafica.ano }}
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>

        <!--Alertas al año-->
        <b-col cols="12" md="6" v-if="error_ano == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Número de alertas por año
            </h4>
            <div class="alertaanomes alert text-center" role="alert">
              <h3>Alertas en {{ grafica.ano }}: {{ totalAlertasAno }}</h3>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_ano == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Número de alertas por año
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>

        <!--Denuncias totalses-->
        <b-col cols="12" md="6" v-if="error_mes == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              ¿Había denuncias previas por violencia?
            </h4>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_denuncia == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              ¿Había denuncias previas por violencia?
            </h4>
            <h6>En el año {{ grafica.ano }}</h6>
            <pie-chart
              :data="habiaDenuncia"
              :donut="true"
              :colors="['#5b2e48', '#a5b232']"
              :download="true"
            ></pie-chart>
          </div>
        </b-col>

        <!--Introducción a estadisticas mensuales-->
        <b-col cols="12">
          <div class="espacioTitularMensual">
            <h4 class="titularMensual">
              Cifras de {{ grafica.mes }} de {{ grafica.ano }}
            </h4>
          </div>
        </b-col>

        <!--Alertas al mes-->
        <b-col cols="12" md="6" v-if="error_mes == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Alertas mensuales
            </h4>
            <div class="alertaanomesverde alert text-center" role="alert">
              <h3>Alertas en {{ grafica.mes }}: {{ totalAlertasMes }}</h3>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_mes == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Número de alertas por mes
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>

        <!--Edad vs no. alertas-->
        <b-col cols="12" md="6" v-if="error_edadvsalerta == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Número de alertas por mes
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_edadvsalerta == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Rango de edad vs la cantidad de alertas en el mes
            </h4>
            <column-chart
              :data="datosEdadAlerta"
              :colors="['#a5b232']"
              :discrete="true"
              ytitle="No. alertas"
              xtitle="Edad Usuarias"
              :round="2"
              :download="true"
            ></column-chart>
          </div>
        </b-col>

        <!--Alertas por hora y mes-->
        <b-col cols="12" md="6" v-if="error_horavsmes == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Alertas por hora y mes
            </h4>
            <bar-chart
              :data="datosFrecuenciaHora"
              :colors="['#a5b232']"
              :discrete="true"
              xtitle="No. alertas"
              ytitle="Hora (24h)"
              :round="2"
              :download="true"
            ></bar-chart>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_horavsmes == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Alertas por hora y mes
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>

        <!--Alertas por nacionalidad-->
        <b-col cols="12" md="6" v-if="error_nacionalidad == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Alertas por nacionalidad de las Usuarias
            </h4>
            <bar-chart
              :data="datosNacionalidad"
              :colors="['#a5b232']"
              :discrete="true"
              xtitle="No. alertas"
              :download="true"
            ></bar-chart>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_nacionalidad == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Alertas según nacionalidad de las Usuarias
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>

        <!--Alertas por complexion-->
        <b-col cols="12" md="6" v-if="error_complexion == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Alertas por complexión
            </h4>
            <column-chart
              :data="datosComplexion"
              :colors="['#a5b232']"
              :discrete="true"
              ytitle="No. alertas"
              :download="true"
            ></column-chart>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_complexion == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Alertas según complexión
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>

        <!--Alertas por color de ojos-->
        <b-col cols="12" md="6" v-if="error_ojos == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Alertas por color de ojos
            </h4>
            <column-chart
              :data="datosOjos"
              :colors="['#a5b232']"
              :discrete="true"
              ytitle="No. alertas"
              xtitle="Color de ojos"
              :download="true"
            ></column-chart>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_ojos == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Alertas por color de ojos
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>

        <!--Alertas por color de piel-->
        <b-col cols="12" v-if="error_piel == false">
          <div class="espacioGrafica">
            <h4 class="graficas">
              Alertas por color de piel
            </h4>
            <column-chart
              :data="datosPiel"
              :colors="['#a5b232']"
              :discrete="true"
              ytitle="No. alertas"
              :download="true"
            ></column-chart>
          </div>
        </b-col>
        <b-col cols="12" md="6" v-if="error_piel == true">
          <div class="errorGrafica">
            <h4 class="graficas">
              Alertas según color de piel
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-octagon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#b15050"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"
              />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>No se tienen registros de alertas según tu selección</h3>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import barraNav from "../components/barraNav";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/messaging";
import Swal from "sweetalert2";

export default {
  name: "Estadisticas",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    vueHeadful,
    barraNav,
  },
  data() {
    return {
      titulo: "Estadísticas | Eyes On",
      grafica: {
        mes: "",
        ano: "",
      },
      mesEnviar: "",
      anoEnviar: "",
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      anos: ["2021"],

      //Variables para mapas
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 8,
      center: [19.568301, -99.047354], //Por defecto
      trayectorias: {
        puntos: [],
        horas: [],
        fechas: [],
      },
      mensaje: [],
      alerta: "",
      hora: "",
      fecha: "",
      verInformacion: false,

      //Variables para graficas
      datosEdadAlerta: {},
      datosFrecuenciaHora: {},
      totalAlertasMes: "",
      totalAlertasAno: "",
      datosAlertaPorMeses: {},
      habiaDenuncia: [],
      datosNacionalidad: {},
      datosComplexion: {},
      datosOjos: {},
      datosPiel: {},

      //Ver graficas
      ver_graficas: false,
      error_ano: false,
      error_mes: false,
      error_alertas_ano: false,
      error_denuncia: false,
      error_puntos_incidencia: false,
      error_edadvsalerta: false,
      error_horavsmes: false,
      error_nacionalidad: false,
      error_complexion: false,
      error_ojos: false,
      error_piel: false,
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
  methods: {
    convertirMes() {
      if (this.grafica.mes == "Enero") {
        this.mesEnviar = "01";
      } else if (this.grafica.mes == "Febrero") {
        this.mesEnviar = "02";
      } else if (this.grafica.mes == "Marzo") {
        this.mesEnviar = "03";
      } else if (this.grafica.mes == "Abril") {
        this.mesEnviar = "04";
      } else if (this.grafica.mes == "Mayo") {
        this.mesEnviar = "05";
      } else if (this.grafica.mes == "Junio") {
        this.mesEnviar = "06";
      } else if (this.grafica.mes == "Julio") {
        this.mesEnviar = "07";
      } else if (this.grafica.mes == "Agosto") {
        this.mesEnviar = "08";
      } else if (this.grafica.mes == "Septiembre") {
        this.mesEnviar = "09";
      } else if (this.grafica.mes == "Octubre") {
        this.mesEnviar = "10";
      } else if (this.grafica.mes == "Noviembre") {
        this.mesEnviar = "11";
      } else if (this.grafica.mes == "Diciembre") {
        this.mesEnviar = "12";
      }
    },
    obtenerGraficas() {
      this.ver_graficas = true;
      this.rangoEdad();
      this.alertasPorHora();
      this.alertasAlMes();
      this.habiaDenunciaGrafica();
      this.alertasNacionalidad();
      this.alertasComplexion();
      this.alertasOjos();
      this.alertasPiel();
      this.alertasPorMesEnAno();
      this.obtenerPuntosActivacion();
    },
    rangoEdad() {
      this.convertirMes();

      let json = {
        ano: this.grafica.ano,
        mes: this.mesEnviar,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/graficas/edad-alertas/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.datosEdadAlerta = data.data;
          this.error_edadvsalerta = false;
        })
        .catch((error) => {
          this.error_edadvsalerta = true;
        });
    },
    alertasPorHora() {
      this.convertirMes();

      let json = {
        ano: this.grafica.ano,
        mes: this.mesEnviar,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/graficas/horas-alertas-mes/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.datosFrecuenciaHora = data.data;
          this.error_horavsmes = false;
        })
        .catch((error) => {
          this.error_horavsmes = true;
        });
    },

    alertasAlMes() {
      this.convertirMes();

      let json = {
        ano: this.grafica.ano,
        mes: this.mesEnviar,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/graficas/alertas-mes/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.totalAlertasMes = data.data.total_alertas_mes;
          this.error_mes = false;
        })
        .catch((error) => {
          this.error_mes = true;
        });
    },
    alertasPorMesEnAno() {
      let json = {
        ano: this.grafica.ano,
      };
      axios({
        url:
          "https://backend-upiita.herokuapp.com/graficas/incidencias-totales/",
        method: "post",
        data: json,
      })
        .then((data) => {
          let mesesObtenidos = data.data;
          this.datosAlertaPorMeses = data.data;
          this.error_alertas_ano = false;
        })
        .catch((error) => {
          this.error_alertas_ano = true;
        });
    },
    obtenerPuntosActivacion() {
      let json = {
        ano: this.grafica.ano,
      };

      let posiciones = [];

      axios({
        url:
          "https://backend-upiita.herokuapp.com/graficas/puntos-incidencias/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.error_puntos_incidencia = false;
          console.log(data.data);
          posiciones = data.data;

          for (var key in posiciones) {
            var posicion = [
              JSON.stringify(posiciones[key].latitud),
              JSON.stringify(posiciones[key].longitud),
            ];
            this.trayectorias.puntos.push(posicion);
            var mensajePunto = JSON.stringify(posiciones[key].fecha_hora);
            this.trayectorias.horas.push(mensajePunto.substring(12, 20));
            this.trayectorias.fechas.push(mensajePunto.substring(1, 11));
          }
        })
        .catch((error) => {
          this.error_puntos_incidencia = true;
        });
    },
    verInfo(index) {
      this.verInformacion = true;
      this.alerta = this.trayectorias.puntos[index].toString();
      this.hora = this.trayectorias.horas[index];
      this.fecha = this.trayectorias.fechas[index];
    },
    habiaDenunciaGrafica() {
      let json = {
        ano: this.grafica.ano,
      };

      axios({
        url: "https://backend-upiita.herokuapp.com/graficas/denuncias-previas/",
        method: "post",
        data: json,
      })
        .then((data) => {
          console.log(data.data);
          this.error_denuncia = false;
          this.error_ano = false;
          this.totalAlertasAno = data.data.total_cuestionarios;
          this.habiaDenuncia = [
            [
              "Sin registro de denuncia",
              data.data.total_cuestionarios - data.data.denuncias_previas,
            ],
            ["Con registro de denuncia", data.data.denuncias_previas],
          ];
        })
        .catch((error) => {
          this.error_denuncia = true;
          this.error_ano = true;
        });
    },
    alertasNacionalidad() {
      this.convertirMes();

      let json = {
        ano: this.grafica.ano,
        mes: this.mesEnviar,
      };

      axios({
        url:
          "https://backend-upiita.herokuapp.com/graficas/alertas-nacionalidad/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.datosNacionalidad = data.data;
          this.error_nacionalidad = false;
        })
        .catch((error) => {
          this.error_nacionalidad = true;
        });
    },
    alertasComplexion() {
      this.convertirMes();

      let json = {
        ano: this.grafica.ano,
        mes: this.mesEnviar,
      };

      axios({
        url:
          "https://backend-upiita.herokuapp.com/graficas/alertas-complexion/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.datosComplexion = data.data;
          this.error_complexion = false;
        })
        .catch((error) => {
          this.error_complexion = true;
        });
    },
    alertasOjos() {
      this.convertirMes();

      let json = {
        ano: this.grafica.ano,
        mes: this.mesEnviar,
      };

      axios({
        url:
          "https://backend-upiita.herokuapp.com/graficas/alertas-color-ojos/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.datosOjos = data.data;
          this.error_ojos = false;
        })
        .catch((error) => {
          this.error_ojos = true;
        });
    },
    alertasPiel() {
      this.convertirMes();

      let json = {
        ano: this.grafica.ano,
        mes: this.mesEnviar,
      };

      axios({
        url:
          "https://backend-upiita.herokuapp.com/graficas/alertas-color-piel/",
        method: "post",
        data: json,
      })
        .then((data) => {
          this.datosPiel = data.data;
          this.error_piel = false;
        })
        .catch((error) => {
          this.error_piel = true;
        });
    },
  },
};
</script>

<style>
.estadisticas {
  font-size: 16px;
  margin-top: 50px;
}

.ingresarParametros {
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 5px;

  color: var(--gris);

  border: 2px solid rgba(161, 161, 161, 0.75);
}
.titularPregunta {
  font-family: var(--fontsecondary);
  color: gray;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 1.2em;
}
.menuSinGraficas {
  font-family: var(--fontsecondary);
  padding: 12vh 5vh 5vh 5vh;
}
.menuSinGraficas h3 {
  font-size: 1.3em;
}
.presentacionGraficas {
  background-color: var(--grisoscuro);
  height: 13vh;
}

.presentacionGraficas h3 {
  font-family: var(--fontmain);
  font-weight: 600;
  text-align: center;
  color: white;
  font-size: 1.5em;
  padding: 3%;
}
#input-mes {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

#input-ano {
  font-family: var(--fontsecondary);
  margin-bottom: 10px;
  font-weight: 700;
}

.consultar {
  background-color: var(--verde);
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  width: 50%;
  transition-duration: 0.4s;
  margin-bottom: 10px;
  margin-top: 6px;
}
.consultar:hover {
  background-color: var(--verdeclaro);
  border: 2px solid var(--verdeoscuro);
}
.graficas {
  text-align: center;
  background-color: #ffffff;
}

.espacioGrafica {
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
  color: var(--gris);
  -webkit-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  margin: 10px;
  padding-bottom: 1%;
  padding-top: 1%;
}

.espacioMapa {
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
  color: var(--gris);
  -webkit-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  margin: 10px;
  padding-bottom: 1%;
  padding-top: 1%;
}
.espacioTitularAnual {
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
  background-color: #532a42;
  color: var(--gris);
  -webkit-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  margin: 10px;
  padding-bottom: 1%;
  padding-top: 1%;
}
.titularAnual {
  text-align: center;
  background-color: #532a42;
  font-family: var(--fontsecondary);
  color: white;
}

.espacioTitularMensual {
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
  background-color: #909b2e;
  color: var(--gris);
  -webkit-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  margin: 10px;
  padding-bottom: 1%;
  padding-top: 1%;
}
.titularMensual {
  text-align: center;
  background-color: #909b2e;
  font-family: var(--fontsecondary);
  color: white;
}

.alertaanomes {
  background-color: #5b2e48ad;
  align-items: center;
  border: 2px solid var(--morado);
  border-radius: 50px;
  height: 5vh;
  margin: 6%;
}

.alertaanomes h3 {
  font-family: var(--fontmain);
  color: #ececec;
  font-size: 1.2em;
  text-align: center;
  vertical-align: middle;
  line-height: 2vh;
}

.alertaanomesverde {
  background-color: #909b2ed3;
  align-items: center;
  border: 2px solid var(--verdeoscuro);
  border-radius: 50px;
  height: 5vh;
  margin: 6%;
}

.alertaanomesverde h3 {
  font-family: var(--fontmain);
  color: #ececec;
  font-size: 1.2em;
  text-align: center;
  vertical-align: middle;
  line-height: 2vh;
}

.puntoSeleccionadoEstadisticas {
  background-color: #5b2e48ad;
  border: 1px solid #5b2e48e1;
  border-radius: 10px;
  text-align: center;
  padding: 3%;
  margin: 5%;
}

.puntoSeleccionadoEstadisticas h4 {
  font-family: var(--fontmain);
  font-size: 1rem;
  font-weight: 600;
  color: whitesmoke;
}

.puntoSeleccionadoEstadisticas h5 {
  font-family: var(--fontsecondary);
  font-size: 1rem;
  color: whitesmoke;
}
.errorGrafica {
  text-align: center;
  vertical-align: middle;
  line-height: 6vh;
  border-radius: 10px;
  color: var(--gris);
  -webkit-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  -moz-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
  border: 1px solid rgba(161, 161, 161, 0.75);
  margin: 10px;
}
.errorGrafica h3 {
  font-family: var(--fontmain);
  color: #b15050;
  font-size: 1.1em;
  line-height: 1.5em;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 7%; /* Height of the footer */
}
.footer h6 {
  text-align: right;
  padding: 10px;
  font-size: 0.6em;
  font-family: var(--fontsecondary);
}
@media only screen and (min-width: 768px) {
  .presentacionGraficas {
    height: 10vh;
  }
  .presentacionGraficas h3 {
    text-align: center;
    vertical-align: middle;
    line-height: 0vh;
  }
  .espacioMapa {
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
    -webkit-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
    -moz-box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
    box-shadow: 11px 9px 23px -5px rgba(161, 161, 161, 0.75);
    border: 1px solid rgba(161, 161, 161, 0.75);
    margin: 10px;
    padding: 2%;
  }
  .consultar {
    width: 30%;
  }
  .puntoSeleccionadoEstadisticas {
    padding: 1%;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  #inputmes {
    max-width: 80%;
  }
  #inputano {
    max-width: 80%;
  }
  .menuSinGraficas {
    padding: 10vh 0;
    padding: 9%;
  }
  .menuSinGraficas h3 {
    font-size: 1.3em;
  }
}
</style>
