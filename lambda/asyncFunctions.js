const axios = require('axios');

async function buscarLigaFutbol(nombreLiga) {
    try {
        const url = `https://solf.onrender.com/api/ligas/nombre/${nombreLiga}?limite=1`;
        const response = await axios.get(url);
        
        if (response.data.ok && response.data.ligas.length > 0) {
        const liga = response.data.ligas[0];
        console.log(liga);
        return liga;
        } else {
        return null;
        }
    } catch (error) {
        console.error('Error al realizar la búsqueda de la liga:', error);
        return null;
    }
}

async function buscarJugador(nomJugador){
    try{
        const url = `https://solf.onrender.com/api/jugadores/nombre/${nomJugador}`;
        const response = await axios.get(url);
        
        if (response.data.ok && response.data.jugador.length > 0){
            const jugador = response.data.jugador[0];
            return jugador;
        }else{
            return null;
        }
    }catch(error){
        return null;
    }
}

async function buscarEquipo(nomEquipo){
    try{
        const url = `https://solf.onrender.com/api/equipos/nombre/${nomEquipo}`;
        const response = await axios.get(url);
        
        if (response.data.ok && response.data.equipos.length > 0){
            const equipo = response.data.equipos[0];
            return equipo;
        }else{
            return null;
        }
    }catch(error){
        return null;
    }
}

async function buscarTablaPosiciones(nombreLiga) {
    try {
        const url = `https://solf.onrender.com/api/posiciones/nombre/${nombreLiga}`;
        const response = await axios.get(url);

        if (response.data.ok) {
        const tablaPosiciones = response.data.tablaPosiciones;
        return tablaPosiciones;
        } else {
        return null;
        }
    } catch (error) {
        console.error('Error al realizar la búsqueda de la tabla de posiciones:', error);
        return null;
    }
}

module.exports = {
    buscarLigaFutbol,
    buscarEquipo,
    buscarJugador,
    buscarTablaPosiciones
}