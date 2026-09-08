# Portal de Aplicativos — Ser Integral Consultoría S.A.S.

Página independiente para el subdominio **aplicativos.serintegral.com.co**. Comparte la identidad visual (colores, tipografía, logo) del sitio principal, pero es un proyecto aparte pensado como punto de entrada a los distintos aplicativos internos de la empresa.

## Cómo ejecutar localmente

Abre `index.html` directamente en el navegador, o sirve la carpeta con un servidor estático:

```bash
python -m http.server 5500
```

## Cómo subir a Hostinger

Este proyecto va en el subdominio `aplicativos.serintegral.com.co`, **no** en `public_html/` raíz. Sube el contenido de esta carpeta (`index.html`, `css/`, `js/`, `assets/`) a la carpeta que Hostinger creó para ese subdominio (por ejemplo `public_html/aplicativos/`).

## Cómo agregar un nuevo aplicativo

Edita el arreglo `APPS` en [js/script.js](js/script.js). Cada aplicativo es un objeto:

```javascript
{
  id: "identificador-unico",
  name: "Nombre visible",
  description: "Descripción corta.",
  url: "https://subdominio.serintegral.com.co", // vacío si aún no existe
  status: "available", // o "coming-soon"
  icon: "box", // una de las claves definidas en ICONS
}
```

- `status: "available"` muestra el botón **Ingresar** enlazado a `url` (se abre en pestaña nueva).
- `status: "coming-soon"` muestra el botón deshabilitado **Próximamente** y un aviso emergente al hacer clic.

Si necesitas un ícono nuevo, agrégalo al objeto `ICONS` (SVG en línea) y referencia su clave desde `icon`.

## Notas

- El botón de WhatsApp usa la misma configuración (`CONFIG.whatsappNumber`) que el sitio principal.
- El archivo tiene `<meta name="robots" content="noindex">` porque es una plataforma interna, no una página que deba indexarse en buscadores.
