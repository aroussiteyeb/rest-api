const express = require('express')
const bodyParser=require('body-parser');
const app = express()
const api = require('./restApi')
 // Middleware
 app.use(express.json())
 

app.listen(8000, () => {
    console.log('Serveur à l"écoute')
  })


  app.use('/api', api);
