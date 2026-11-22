
const contenedor = document.getElementById("cotizaciones");
const mensajeError = document.getElementById("mensajeError");
const ultimaActualizacion = document.getElementById("ultimaActualizacion");
const btnActualizar = document.getElementById("btnActualizar");

// Formatear importes en pesos argentinos
function formatearMoneda(valor) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 2
    }).format(valor);
}

// Mostrar cotizaciones
function mostrarCotizaciones(cotizaciones) {

    contenedor.innerHTML = "";

    cotizaciones.forEach(cotizacion => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("quote-card");

        tarjeta.innerHTML = `
            <h3>${cotizacion.name}</h3>

            <div class="quote-values">
                <div>
                    <span>Compra</span>
                    <strong>${formatearMoneda(cotizacion.buy)}</strong>
                </div>

                <div>
                    <span>Venta</span>
                    <strong>${formatearMoneda(cotizacion.sell)}</strong>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });

    ultimaActualizacion.textContent =
        "Última actualización: " +
        new Date().toLocaleString("es-AR");

        iniciarConversor(cotizaciones);
}

// Consultar la API
async function cargarCotizaciones() {

    mensajeError.textContent = "";
    contenedor.innerHTML = "<p>Cargando cotizaciones...</p>";

    try {

        const datos = await obtenerCotizaciones();

        mostrarCotizaciones(datos);

    } catch (error) {

        console.error("Error:", error);

        contenedor.innerHTML = "";
        mensajeError.textContent =
            "No se pudieron cargar las cotizaciones. Intentá nuevamente.";

    }
}

// Botón para actualizar
btnActualizar.addEventListener("click", cargarCotizaciones);

// Cargar al iniciar la página
cargarCotizaciones();
