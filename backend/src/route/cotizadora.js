const express = require('express');
const router = express.Router();

const pool = require('../database');

//Obtener países: funciona para detallar tarifa para el cotizador
router.get('/paisesDestino', async(req, res) => {
    const paises = await pool.query('select * from pais', (err, paises) => {
        if(err){
            return res.status(500).send({mensaje: "Hubo un error en la petición"})
        }else if(!paises){
            return res.status(500).send({mensaje: "No se pudieron obtener los paises"})
        }else{
            return res.status(200).send({paises})
        }
    });
});

//Función para cotizar
router.post('/cotizar', async(req, res) => {
    const {peso, alto, largo, ancho, pais_origen, pais_destino, region, rol, descuento} = req.body;
    const newCotizador = {
        peso,
        alto,
        largo,
        ancho,
        pais_origen,
        pais_destino,
        region: 0,
        rol,
        descuento: 0
    }
    console.log(newCotizador);
    //Consulta para mostrar la región de la entrega.
    const datoRegion = await pool.query('select * from pais where id = ?', newCotizador.pais_destino);
    //Se le asigna la región para almacenarla en la base de datos.
    newCotizador.region = await datoRegion[0].id;
    //Se extrae la tarifa por región para crear el descuento.
    const tarifaRegion = await pool.query('select * from region where id = ?', datoRegion[0].id);

    //Se crea una condicional dependiento el rol de 0 a 5 para el beneficio en el descuento al cliente al cotizar
    if(newCotizador.rol === '0'){
        console.log("0");
        newCotizador.descuento = await (newCotizador.peso*tarifaRegion[0].tarifa)+1.66*(newCotizador.alto*newCotizador.largo*newCotizador.ancho);
        await pool.query('insert into cotizador set ?', [newCotizador]);
        console.log("Guardado");
    }else if(newCotizador.rol === '1'){
        console.log("1");
        newCotizador.descuento = await (newCotizador.peso*tarifaRegion[0].tarifa)+1.66*(newCotizador.alto*newCotizador.largo*newCotizador.ancho)-(100*0.5*10);
        await pool.query('insert into cotizador set ?', [newCotizador]);
        console.log("Guardado");
    }else if(newCotizador.rol === '2'){
        console.log("2");
        newCotizador.descuento = await (newCotizador.peso*tarifaRegion[0].tarifa)+1.66*(newCotizador.alto*newCotizador.largo*newCotizador.ancho)-(150*0.5*10);
        await pool.query('insert into cotizador set ?', [newCotizador]);
        console.log("Guardado");
    }else if(newCotizador.rol === '3'){
        console.log("3");
        newCotizador.descuento = await (newCotizador.peso*tarifaRegion[0].tarifa)+1.66*(newCotizador.alto*newCotizador.largo*newCotizador.ancho)-(200*0.5*10);
        await pool.query('insert into cotizador set ?', [newCotizador]);
        console.log("Guardado");
    }else if(newCotizador.rol === '4'){
        console.log("4");
        newCotizador.descuento = await (newCotizador.peso*tarifaRegion[0].tarifa)+1.66*(newCotizador.alto*newCotizador.largo*newCotizador.ancho)-(225*0.5*10);
        await pool.query('insert into cotizador set ?', [newCotizador]);
        console.log("Guardado");
    }else if(newCotizador.rol === '5'){
        console.log("5");
        newCotizador.descuento = await (newCotizador.peso*tarifaRegion[0].tarifa)+1.66*(newCotizador.alto*newCotizador.largo*newCotizador.ancho)-(250*0.5*10);
        await pool.query('insert into cotizador set ?', [newCotizador]);
        console.log("Guardado");
    }
    console.log(newCotizador);
    return res.status(200).send({descuento: newCotizador.descuento})
});

module.exports = router;