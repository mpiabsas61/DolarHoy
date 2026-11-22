
const API_URL = "https://monedapi.ar/api/v2/usd";

// Función para obtener las cotizaciones
async function obtenerCotizaciones() {

    const respuesta = await fetch(API_URL);

    // Verificar si la respuesta fue exitosa
    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las cotizaciones");
    }

    // Convertir la respuesta a formato JSON
    const datos = await respuesta.json();

    return datos;
}
