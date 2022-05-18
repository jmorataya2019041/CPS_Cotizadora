const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// initializations
const app = express();

//Cabeceras
app.use(cors());

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Importación de rutas
const cotizadora_routes = require('./route/cotizadora');

//Routes
app.use('/cps_cotizadora', cotizadora_routes);

//Starting the server
app.listen(app.get('port'),  () => {
    console.log("Server on port", app.get('port'));
})