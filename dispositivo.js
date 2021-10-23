const axios = require('axios')

let token = 'Token ' + '703b7e908125ecf7b08ddaefc946469d53400ce5';
let tipo = typeof token;
//console.log(tipo);

let json = {
    numero_serie: "1",
    pin_desactivador: "1234"
}

axios({
    url: "http://127.0.0.1:8000/dispositivo/asociar/",
     method: "patch",
     data:json,  
     headers:{
         'Authorization' : token
     },   
 
 }).then((data) => {

         console.log(data.status);
      
     })
     .catch((error) => {
         let errores =error.response.data.non_field_errors;
         let mensajeError= errores.toString(); 
         console.log(mensajeError);
     });
 
 