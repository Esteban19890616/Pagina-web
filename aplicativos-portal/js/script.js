/* =========================================================
   SER INTEGRAL CONSULTORÍA S.A.S — Portal de Aplicativos
   ========================================================= */

/* -------------------------------------------------------
   CATÁLOGO DE APLICATIVOS
   Para agregar un aplicativo nuevo, añade un objeto aquí.
   status: "available" (enlaza a `url`) o "coming-soon" (sin enlace).
   ------------------------------------------------------- */
const APPS = [
  {
    id: "inventarios",
    name: "Aplicativo de Inventarios",
    description: "Control y seguimiento de existencias, reportes e indicadores en tiempo real.",
    url: "https://inventarios.serintegral.com.co",
    status: "available",
    icon: "box",
  },
  {
    id: "inspecciones",
    name: "Aplicativo para Inspecciones",
    description: "Registro y seguimiento de inspecciones técnicas y de seguridad en campo.",
    url: "",
    status: "coming-soon",
    icon: "clipboard-check",
  },
  {
    id: "control-abejas",
    name: "Aplicativo para Control de Abejas",
    description: "Gestión de reportes y atención de casos relacionados con control de abejas.",
    url: "",
    status: "coming-soon",
    icon: "hexagon",
  },
  {
    id: "incidentes",
    name: "Aplicativo para Registro de Incidentes",
    description: "Registro, clasificación y trazabilidad de incidentes y eventos.",
    url: "",
    status: "coming-soon",
    icon: "alert-triangle",
  },
  {
    id: "contratacion",
    name: "Aplicativo para Gestión de la Contratación",
    description: "Seguimiento de procesos de contratación estatal y privada.",
    url: "",
    status: "coming-soon",
    icon: "file-text",
  },
  {
    id: "cobros",
    name: "Aplicativo para Gestión de Cobros",
    description: "Control de cartera, cuentas por cobrar y seguimiento de pagos.",
    url: "",
    status: "coming-soon",
    icon: "credit-card",
  },
];

const ICONS = {
  box: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z" stroke-linejoin="round"/><path d="M3 8v8l9 5 9-5V8" stroke-linejoin="round"/><path d="M12 13v8" /></svg>',
  "clipboard-check": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" /><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  hexagon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4.6v10.8L12 22l-8-4.6V6.6z" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.6"/></svg>',
  "alert-triangle": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l10 18H2z" stroke-linejoin="round"/><path d="M12 10v4" stroke-linecap="round"/><circle cx="12" cy="17.5" r="0.6" fill="currentColor" stroke="none"/></svg>',
  "file-text": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-linejoin="round"/><path d="M14 2v6h6" stroke-linejoin="round"/><path d="M9 13h6M9 17h6" stroke-linecap="round"/></svg>',
  "credit-card": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20" /></svg>',
};

const CONFIG = {
  whatsappNumber: "573015743688",
  whatsappMessage: "Hola, tengo una consulta sobre el portal de aplicativos de Ser Integral Consultoría S.A.S.",
};

document.addEventListener("DOMContentLoaded", () => {
  renderApps();
  initWhatsappButton();
  initFooterYear();
});

function renderApps() {
  const grid = document.getElementById("apps-grid");
  if (!grid) return;

  const available = APPS.filter((app) => app.status === "available").length;
  const statsEl = document.getElementById("hub-stats");
  if (statsEl) {
    statsEl.innerHTML = `
      <span class="hub-stat-pill"><strong>${APPS.length}</strong> aplicativos en la plataforma</span>
      <span class="hub-stat-pill"><strong>${available}</strong> disponible${available === 1 ? "" : "s"} ahora</span>
    `;
  }

  grid.innerHTML = APPS.map((app, index) => {
    const isAvailable = app.status === "available";
    const icon = ICONS[app.icon] || ICONS.box;
    const statusLabel = isAvailable ? "Disponible" : "Próximamente";
    const statusClass = isAvailable ? "available" : "coming-soon";
    const cardClass = isAvailable ? "is-available" : "is-coming-soon";
    const delay = (index * 0.06).toFixed(2);

    const action = isAvailable
      ? `<a class="btn" href="${app.url}" target="_blank" rel="noopener noreferrer">Ingresar</a>`
      : `<button class="btn" type="button" data-app-name="${app.name}">Próximamente</button>`;

    return `
      <article class="app-card ${cardClass}" style="animation-delay:${delay}s">
        <div class="app-card-top">
          <div class="app-icon">${icon}</div>
          <span class="app-status ${statusClass}">${statusLabel}</span>
        </div>
        <h3>${app.name}</h3>
        <p>${app.description}</p>
        ${action}
      </article>
    `;
  }).join("");

  grid.querySelectorAll("button[data-app-name]").forEach((button) => {
    button.addEventListener("click", () => showToast(`${button.dataset.appName} estará disponible próximamente.`));
  });
}

let toastTimeout;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

function initWhatsappButton() {
  const button = document.querySelector(".whatsapp-float");
  if (!button) return;
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  button.setAttribute("href", url);
  button.setAttribute("target", "_blank");
  button.setAttribute("rel", "noopener noreferrer");
}

function initFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
