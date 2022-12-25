const express = require('express');
const app = express();
let bodyParser = require('body-parser');

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

const routes = require('./routes.js')

//initialise express router
const router = express.Router();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// use express router
app.use('/api',router);

routes(router);

const PORT = 8000;

app.listen(PORT, () => {
   console.log(`App is active at ${PORT}!`); 
});