# Dólar Hoy

Aplicación web estática para consultar cotizaciones del dólar en pesos argentinos (ARS) y convertir importes entre ARS y USD. Los valores se obtienen en tiempo real desde una API REST pública. El sitio es informativo y no constituye asesoramiento financiero.

## Funcionalidades

- Consulta las cotizaciones al abrir la página y permite volver a consultarlas con **Actualizar**.
- Muestra cada tipo de cotización con sus valores de compra y venta.
- Indica el estado de la API con un punto visual: gris mientras consulta, verde si la respuesta es válida y rojo si falla. El tooltip muestra el estado o el detalle del error.
- Permite convertir pesos a dólares y dólares a pesos usando el tipo de cotización seleccionado.
- Muestra la fecha y hora de la última carga exitosa en la zona horaria de Buenos Aires.

## Requisitos y ejecución

No se requiere instalación de dependencias ni un proceso de compilación. El sitio utiliza HTML, CSS y JavaScript del navegador, además de recursos externos cargados desde CDN.

Para ejecutarlo, sirve la carpeta del proyecto desde un servidor web estático. Por ejemplo, desde la raíz del proyecto:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador. También se puede utilizar una extensión como Live Server en Visual Studio Code. Se requiere conexión a Internet para consultar la API y cargar los recursos externos.

## Estructura

```text
index.html       Estructura de la página e inclusión de dependencias y scripts
css/styles.css   Estilos, diseño adaptable y estados visuales
js/api.js        URL y solicitud HTTP a la API
js/app.js        Carga, renderizado de cotizaciones y estado de la API
js/conversor.js  Selección de cotización, validaciones y cálculos
```

## Funcionamiento

### Carga de cotizaciones y estado de la API

Al iniciar la página, `js/app.js` ejecuta `cargarCotizaciones()`. La misma función se ejecuta al presionar **Actualizar** y solicita los datos mediante `obtenerCotizaciones()` en `js/api.js`.

La aplicación consulta:

```text
GET https://monedapi.ar/api/v2/usd
```

Se espera una respuesta JSON con una lista de cotizaciones. Cada elemento debe incluir:

| Campo | Uso |
| --- | --- |
| `name` | Nombre del tipo de cotización |
| `buy` | Valor de compra en ARS |
| `sell` | Valor de venta en ARS |

Si la solicitud y la lectura del JSON tienen éxito, la aplicación marca la API como disponible, genera una tarjeta por cotización y actualiza la hora de consulta. Si la conexión falla, el servidor responde con un estado HTTP no exitoso o el cuerpo no contiene JSON válido, el indicador se marca como error y el motivo se muestra en el tooltip. También aparece un mensaje de error junto a las cotizaciones.

El indicador reutiliza la solicitud necesaria para cargar las cotizaciones; no realiza una consulta de comprobación adicional. El navegador debe poder acceder a la API y esta debe permitir solicitudes desde el origen del sitio.

### Conversor

Cuando se cargan las cotizaciones, `js/conversor.js` llena el selector de tipos de dólar. Para convertir, el usuario elige la operación, el tipo de cotización e ingresa un importe mayor que cero.

- **Pesos a dólares:** importe en ARS dividido por el valor de `sell`.
- **Dólares a pesos:** importe en USD multiplicado por el valor de `buy`.

El resultado se formatea según la moneda de destino. Si el importe, la selección o los valores de compra/venta no son válidos, el conversor muestra un mensaje en el área de resultado. **Limpiar** restablece los campos y el resultado.

### Presentación y dependencias externas

`index.html` define las secciones de presentación, conversor y cotizaciones. `css/styles.css` contiene los estilos del sitio y sus ajustes responsivos. La interfaz utiliza Bootstrap 5 para componentes y grilla, Bootstrap Icons, Animate.css y la fuente DM Sans, cargados desde CDN.

## Consideraciones

- La disponibilidad de cotizaciones depende del servicio externo y de la conexión del usuario.
- Las cotizaciones se solicitan al entrar al sitio y cuando el usuario las actualiza; no hay actualización automática periódica.
- La aplicación presenta valores proporcionados por la API y no valida su vigencia ni reemplaza una fuente financiera oficial.