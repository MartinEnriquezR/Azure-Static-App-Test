const axios = require('axios')

axios({
    url: "http://127.0.0.1:8000/persona/signup/",
    method: "post",
    data: 
        {
            email:"mauricio@gmail.com",
            username: "mauricio",
            password:".:Mauricio:.",
            password_confirmation: ".:Mauricio:.",
            nombre: "Mauricio",
            apellido_paterno: "Oliva",
            apellido_materno:"Oliva",
            genero: "Masculino",
            fecha_nacimiento:"1997-09-02",
            is_usuaria: "False",
            is_contacto_confianza: "True"
        }
}).then((data) => {
    console.log(data);
  }).catch(error => {
    console.error(error)
})
