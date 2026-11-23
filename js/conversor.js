
function convertirMoneda(importe, operacion, cotizacion) {

    if (operacion === "pesosDolares") {

        // Para comprar dólares utilizamos el precio de venta
        return importe / Number(cotizacion.sell);

    } else {

        // Para vender dólares utilizamos el precio de compra
        return importe * Number(cotizacion.buy);

    }
}

function iniciarConversor(cotizaciones) {

    const selectDolar = document.getElementById("tipoDolar");
    const selectOperacion = document.getElementById("operacion");
    const inputImporte = document.getElementById("importe");
    const btnConvertir = document.getElementById("btnConvertir");
    const resultado = document.getElementById("resultado");
    const detalle = document.getElementById("detalleConversion");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const valorDefault = "$ 0,00";

    // Cargar los tipos de dólar disponibles
    selectDolar.innerHTML =
        '<option value="">Seleccioná el tipo de dólar...</option>';

    cotizaciones.forEach(cotizacion => {

        const opcion = document.createElement("option");

        opcion.value = cotizacion.name;
        opcion.textContent = cotizacion.name;

        selectDolar.appendChild(opcion);
    });

    btnConvertir.onclick = () => {

        const importe = Number(inputImporte.value);
        const operacion = selectOperacion.value;
        const tipoDolar = selectDolar.value;

        if (!inputImporte.value || !Number.isFinite(importe) || importe <= 0) {
            resultado.textContent = valorDefault;
            detalle.textContent = "Ingresá un importe mayor a cero.";
            detalle.style="color:red;";
            return;
        }

        if (!tipoDolar) {
            resultado.textContent = valorDefault;
            detalle.textContent = "Debés elegir un tipo de cotización.";
            detalle.style="color:red;";
            return;
        }

        const cotizacion = cotizaciones.find(
            item => item.name === tipoDolar
        );

        if (!cotizacion || Number(cotizacion.buy) <= 0 ||
            Number(cotizacion.sell) <= 0) {

            resultado.textContent = "No disponible";
            detalle.textContent = "La cotización no es válida.";
            return;
        }

        const valorConvertido = convertirMoneda(
            importe,
            operacion,
            cotizacion
        );

        if (operacion === "pesosDolares") {

            resultado.textContent =
                new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "USD"
                }).format(valorConvertido);

            detalle.textContent =
                `Cotización de venta: ${formatearMoneda(cotizacion.sell)}`;
            detalle.style="";

        } else {

            resultado.textContent = formatearMoneda(valorConvertido);

            detalle.textContent =
                `Cotización de compra: ${formatearMoneda(cotizacion.buy)}`;
        }

    };
    btnLimpiar.addEventListener("click", () => {

    inputImporte.value = "";
    selectDolar.value = "";
    selectOperacion.value = "pesosDolares";

    resultado.textContent = "$ 0,00";

    detalle.textContent ="Ingresá un importe para comenzar.";

}); 
}
