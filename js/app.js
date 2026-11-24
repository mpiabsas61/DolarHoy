
const contenedor = document.getElementById("cotizaciones");
const mensajeError = document.getElementById("mensajeError");
const ultimaActualizacion = document.getElementById("ultimaActualizacion");
const btnActualizar = document.getElementById("btnActualizar");
const indicadorApi = document.getElementById("estadoApi");
const messageStatusBtn = document.getElementById("market-status")
const tooltipApi = bootstrap.Tooltip.getOrCreateInstance(indicadorApi);
const tooltipApi_2 = bootstrap.Tooltip.getOrCreateInstance(messageStatusBtn);

function actualizarEstadoApi(disponible, detalle) {
    indicadorApi.classList.toggle("status-dot-ok", disponible);
    indicadorApi.classList.toggle("status-dot-error", !disponible);
    indicadorApi.classList.remove("status-dot-pending");
    messageStatusBtn.setAttribute(
        "aria-label",
        disponible ? "API disponible" : `Error de API: ${detalle}`
    );
    // console.log(disponible,detalle)
    messageStatusBtn.setAttribute("data-bs-title",detalle);
    tooltipApi.setContent({ ".tooltip-inner": detalle });
    tooltipApi_2.setContent({ ".tooltip-inner": detalle });
}

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
        new Date().toLocaleString("es-AR",{ timeZone: 'America/Buenos_Aires', hour12: false });

        iniciarConversor(cotizaciones);
}

// Consultar la API
async function cargarCotizaciones() {

    mensajeError.textContent = "";
    contenedor.innerHTML = "<p>Cargando cotizaciones...</p>";

    let datos;
    try {
        datos = await obtenerCotizaciones();
    } catch (error) {
        console.error("Error:", error);
        const detalle = error instanceof Error
            ? error.message
            : "No se pudo conectar con la API. Verificá la URL o tu conexión.";
        actualizarEstadoApi(false, detalle);
        contenedor.innerHTML = "";
        mensajeError.textContent =
            "No se pudieron cargar las cotizaciones. Intentá nuevamente.";
        return;
    }

    actualizarEstadoApi(true, "API disponible");
    try {
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


// animacion logo
const elemento = document.getElementById('logo');
  const animacion = 'animate__bounceInDown'; // Cambia por la animación que quieras
  setInterval(() => {
    elemento.classList.add(animacion);
    elemento.addEventListener('animationend', () => {
      elemento.classList.remove(animacion);
    }, { once: true });
  }, 10000); 
