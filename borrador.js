const axios = require('axios')

let token = 'Token ' + '2854f08856dc36a4cd0f72a560c50ff781987a13';

let json = {
  descripcion: "Gatito",
  nombre_sena_particular: "Cicatriz",
  nombre_ubicacion_corporal: "Pierna"
}

axios({
  url: "http://127.0.0.1:8000/senas/",
   method: "post",
   data:json,  
   headers:{
       'Authorization' : token
   },   

}).then((data) => {
//   if (data.status == 201) {
       console.log(data.status);
  //   }
   })
   .catch((error) => {
       let errores =error.response.data.non_field_errors;
       let mensajeError= errores.toString(); 
       console.log(mensajeError);
   });