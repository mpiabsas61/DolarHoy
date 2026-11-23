
const API_URL = "https://monedapi.ar/api/v2/usd";

// Función para obtener las cotizaciones
async function obtenerCotizaciones() {

    let respuesta;

    try {
        respuesta = await fetch(API_URL);
    } catch (error) {
        throw new Error("No se pudo conectar con la API. Verificá la URL o tu conexión.");
    }

    if (!respuesta.ok) {
        throw new Error(`La API respondió con un error (HTTP ${respuesta.status}).`);
    }

    let datos;
    try {
        datos = await respuesta.json();
    } catch (error) {
        throw new Error("La API respondió con datos inválidos.");
    }

    return datos;
}
