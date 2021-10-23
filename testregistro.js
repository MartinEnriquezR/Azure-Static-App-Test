const axios = require('axios')

let token = 'Token ' + '703b7e908125ecf7b08ddaefc946469d53400ce5';

axios({
    url: "http://127.0.0.1:8000/dispositivo/mis-dispositivos",
     method: "get",  
     headers:{
         'Authorization' : token
     },   
 }).then((data) => {
     //console.log(data.data);
     let dispositivos = data.data;
     for (let i=0; i<dispositivos.length ; i++){
        console.log(dispositivos[i].numero_serie);
        console.log(dispositivos[i].pin_desactivador);
    }
     /*
        let senas = data.data.senas_particulares;
        //console.log(senas[0].sena_particular.nombre_sena_particular);
        for (let i=0; i<senas.length ; i++){
            console.log(senas[i].descripcion);
            console.log(senas[i].sena_particular.nombre_sena_particular);
            console.log(senas[i].ubicacion_corporal.nombre_ubicacion_corporal);
            console.log('-')
        }
        //console.log(senas);*/
       }).catch((error) => {
           console.log(error.response.data);
       });

/*let json = {
    estatura: "120" ,
    estado_civil: "Soltero",
    escolaridad: "Ingenieria",
    nacionalidad: "Mexicana",
    tipo_nariz: "Griega",
    complexion: "Endomorfo",
    color_ojo: "Negros",
    forma_rostro: "Diamante",
    color_cabello: "Cafe",
    color_piel: "Negra",
    tipo_ceja: "Recta",
    textura_cabello: "Lacio",
    enfermedades: [
        {nombre_enfermedad : "Ninguna"}
    ]
        
    
}

//console.log(json);

axios({
   url: "http://127.0.0.1:8000/persona/convertirme-usuaria/",
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
        //console.log("Hay error");
        let errores =error.response.data.non_field_errors;
        let mensajeError= errores.toString(); 
        console.log(mensajeError);
    });

*/