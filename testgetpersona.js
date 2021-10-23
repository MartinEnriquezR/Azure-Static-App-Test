const axios = require('axios')

let json = { "mes": "01", "ano": "2021" }

console.log(json);

axios({
  url:
  "http://api-upiita-pt.us-east-1.elasticbeanstalk.com/graficas/edad-alertas/",
  method: "get",
  data: json,

})
  .then((data) => {
    console.log("Exito");
    //console.log(data.data);
  })
  .catch((error) => {
    console.log("Error");
    console.log(error.request.data.non_field_error);
  });