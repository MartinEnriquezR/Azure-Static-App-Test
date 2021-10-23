const axios = require('axios')

axios({
    url: "http://localhost:8000/paises",
    method: "get",
}).then((data) => {
    console.log(data.data);
  }).catch(error => {
    console.error(error)
})

axios({
    url: "http://localhost:8000/colores-cabello",
    method: "get",
}).then((data) => {
    console.log(data.data);
  }).catch(error => {
    console.error(error)
})
