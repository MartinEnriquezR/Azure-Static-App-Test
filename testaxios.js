const axios = require('axios')

axios({
    url: "http://127.0.0.1:8000/persona/login/",
    method: "post",
    data: 
        {
            email:"mauricio@gmail.com",
            password:".:Mauricio:."
        }
}).then(({data}) => {
    const {persona, access_token: token} = data
    const {username, email, is_usuaria, is_contacto_confianza} = persona
    console.log(`a persona se llama ${username} y su correo es ${email}`)
    console.log("Este es su token", token)
    console.log(`Es usuaria? ${is_usuaria}`)
    console.log(`Es contacto? ${is_contacto_confianza}`)
}).catch(error => {
    console.error(error)
})

