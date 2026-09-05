# SER INTEGRAL CONSULTORÍA S.A.S. — Sitio Web Corporativo

Sitio web corporativo de **Ser Integral Consultoría S.A.S.**, firma de consultoría en Sistemas Integrados de Gestión, Seguridad y Cumplimiento Normativo (Medellín, Colombia).

Primera versión construida en **HTML5, CSS3 y JavaScript Vanilla**, sin dependencias ni proceso de build, pensada para migrar después a un backend (PHP/Node.js) y base de datos MySQL.

## Estructura del proyecto

```
Pagina-web/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── img/
│   ├── icons/
│   └── logos/
│       └── logo-sic.jpeg
└── README.md
```

## Cómo ejecutar el proyecto localmente

No requiere instalación. Simplemente abre `index.html` con doble clic o arrástralo a tu navegador. Para evitar problemas de rutas relativas en algunos navegadores, también puedes servirlo con un servidor estático simple:

```bash
# Con Python instalado
python -m http.server 5500
```

Luego visita `http://localhost:5500`.

## Guía rápida de personalización

| Qué cambiar | Dónde |
|---|---|
| Logo | Reemplaza `assets/logos/logo-sic.jpeg` (mantén el mismo nombre o actualiza las referencias en `index.html`) |
| Colores corporativos | Variables `:root` al inicio de `css/styles.css` (`--primary`, `--secondary`, `--accent`, etc.) |
| Textos de Misión y Visión | Sección `#mision-vision` en `index.html` (actualmente placeholders `[Texto provisional editable]`) |
| Servicios del portafolio | Sección `#servicios` en `index.html` — cada servicio es una tarjeta `<article class="service-card">`; agrega o elimina tarjetas copiando el bloque |
| WhatsApp | Constante `CONFIG.whatsappNumber` y `CONFIG.whatsappMessage` en `js/script.js` |
| Correo de contacto mostrado | Constante `CONFIG.companyEmail` en `js/script.js` y el texto en la sección `#contacto` de `index.html` |
| Enlace al aplicativo de inventarios | Constante `CONFIG.inventoryAppUrl` en `js/script.js` (todos los botones `data-inventory-link` la usan automáticamente) |
| Dirección exacta y horario de atención | Sección `#contacto` en `index.html` (placeholders `[HORARIO]`) |

## Conectar los formularios a una API (fase 2)

Los formularios de cotización (`#quote-form`) y contacto (`#contact-form`) ya están validados en el frontend y aislados en funciones dedicadas dentro de `js/script.js`:

- `submitQuoteForm(form, messageEl)`
- `submitContactForm(form, messageEl)`

Para conectarlos a un backend, reemplaza el `console.log(...)` de cada función por una llamada real, por ejemplo:

```javascript
fetch("/api/cotizaciones", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then((res) => res.json())
  .then(() => showFormMessage(messageEl, "Solicitud enviada correctamente.", "success"))
  .catch(() => showFormMessage(messageEl, "Ocurrió un error. Intente nuevamente.", "error"));
```

## Cómo migrar posteriormente a un servidor

1. Sube el contenido del proyecto (`index.html`, `css/`, `js/`, `assets/`) a tu hosting o servidor web (Apache/Nginx).
2. Si necesitas rutas amigables o procesamiento en servidor, agrega un backend en PHP o Node.js que reciba las peticiones de los formularios.
3. Configura HTTPS en el hosting antes de conectar formularios reales (los datos de los formularios no deben viajar sin cifrar).

## Cómo conectarlo a MySQL mediante un backend

Arquitectura sugerida para la fase 2:

```
WEB CORPORATIVA (este proyecto)
│
├── FORMULARIO DE CONTACTO      → API REST → tabla `contactos`
├── FORMULARIO DE COTIZACIÓN    → API REST → tabla `cotizaciones`
│
└── APLICATIVO DE INVENTARIOS (proyecto independiente)
    ├── LOGIN
    ├── USUARIOS
    ├── INVENTARIOS
    ├── REPORTES
    └── BASE DE DATOS MYSQL
```

Pasos generales:

1. Crea un backend (PHP con `mysqli`/`PDO`, o Node.js con `mysql2`/Prisma) que exponga endpoints como `POST /api/cotizaciones` y `POST /api/contactos`.
2. Valida y sanitiza cada campo recibido en el servidor (no confíes solo en la validación del frontend).
3. Crea las tablas correspondientes en MySQL con los mismos campos de los formularios.
4. Actualiza las funciones `submitQuoteForm` y `submitContactForm` en `js/script.js` para apuntar a esos endpoints (ver ejemplo de `fetch` arriba).
5. El botón "Ingresar al aplicativo" ya está preparado para enlazar a la plataforma de inventarios como un sistema independiente (`CONFIG.inventoryAppUrl`); no requiere cambios adicionales en este sitio.

## Notas de seguridad

- Este frontend no almacena contraseñas ni información sensible en `localStorage`.
- No hay claves API ni credenciales embebidas en el código.
- Al conectar los formularios a un backend, sanitiza y valida cada entrada en el servidor y sirve el sitio bajo HTTPS.
