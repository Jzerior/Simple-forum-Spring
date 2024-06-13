const mongoose = require("mongoose")

const db = mongoose.connect("mongodb://root:root@192.168.0.109:27017/"
//const db = mongoose.connect("mongodb://root:root@localhost:27017/"
, { useNewUrlParser: true })
    .then((result) => {
    console.log("Połączono z bazą")
    }).catch((err) => {
    console.log("Nie można połączyć się z MongoDB. Błąd: " + err)
   })

   module.exports = mongoose;