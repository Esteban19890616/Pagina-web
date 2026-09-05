/* =========================================================
   SER INTEGRAL CONSULTORÍA S.A.S — Lógica del sitio
   ========================================================= */

/* -------------------------------------------------------
   CONFIGURACIÓN CENTRALIZADA
   Cambia aquí los valores clave sin tocar el resto del código.
   ------------------------------------------------------- */
const CONFIG = {
  // URL del aplicativo de inventarios. Cámbiala cuando esté disponible.
  inventoryAppUrl: "https://app.serintegral.com",

  // Número de WhatsApp de la empresa, formato internacional sin "+" ni espacios.
  whatsappNumber: "573015743688",
  whatsappMessage: "Hola, estoy interesado en conocer los servicios de Ser Integral Consultoría S.A.S.",

  // Correo de contacto mostrado en el sitio.
  companyEmail: "serintegralconsultor@gmail.com",
};

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initSmoothScrollAndActiveLink();
  initScrollReveal();
  initBackToTop();
  initWhatsappButton();
  initInventoryAppLinks();
  initQuoteForm();
  initContactForm();
  initFooterYear();
});

/* -------------------------------------------------------
   Header: sombra y altura reducida al hacer scroll
   ------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* -------------------------------------------------------
   Menú móvil (hamburguesa)
   ------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a.nav-link, a.nav-app-btn").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* -------------------------------------------------------
   Scroll suave + resaltado del enlace activo según sección
   ------------------------------------------------------- */
function initSmoothScrollAndActiveLink() {
  const navLinks = Array.from(document.querySelectorAll(".main-nav a.nav-link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -------------------------------------------------------
   Animaciones al hacer scroll (fade-in / slide-up)
   ------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

/* -------------------------------------------------------
   Botón "volver arriba"
   ------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 480),
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* -------------------------------------------------------
   Botón flotante de WhatsApp
   ------------------------------------------------------- */
function initWhatsappButton() {
  const button = document.querySelector(".whatsapp-float");
  if (!button) return;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  button.setAttribute("href", url);
  button.setAttribute("target", "_blank");
  button.setAttribute("rel", "noopener noreferrer");
}

/* -------------------------------------------------------
   Enlaces al aplicativo de inventarios
   ------------------------------------------------------- */
function initInventoryAppLinks() {
  document.querySelectorAll("[data-inventory-link]").forEach((link) => {
    link.setAttribute("href", CONFIG.inventoryAppUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

/* -------------------------------------------------------
   Validación genérica de un formulario
   ------------------------------------------------------- */
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    field.classList.remove("field-error");
    const value = field.type === "checkbox" ? field.checked : field.value.trim();
    if (!value) {
      isValid = false;
      field.classList.add("field-error");
    }
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      isValid = false;
      field.classList.add("field-error");
    }
  });

  return isValid;
}

function showFormMessage(messageEl, text, type) {
  messageEl.textContent = text;
  messageEl.classList.remove("success", "error", "show");
  messageEl.classList.add(type, "show");
}

/* -------------------------------------------------------
   Formulario de cotización
   Función separada para facilitar la futura conexión a una API/backend.
   ------------------------------------------------------- */
function initQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;
  const messageEl = form.querySelector(".form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(form)) {
      showFormMessage(messageEl, "Por favor complete los campos obligatorios.", "error");
      return;
    }
    submitQuoteForm(form, messageEl);
  });
}

// Punto de integración futura con backend / API de cotizaciones.
function submitQuoteForm(form, messageEl) {
  const data = Object.fromEntries(new FormData(form).entries());

  // TODO (fase backend): reemplazar por una llamada real, por ejemplo:
  // fetch("/api/cotizaciones", { method: "POST", body: JSON.stringify(data) })
  console.log("Solicitud de cotización (pendiente de conectar a backend):", data);

  showFormMessage(messageEl, "Solicitud enviada correctamente.", "success");
  form.reset();
}

/* -------------------------------------------------------
   Formulario de contacto
   ------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const messageEl = form.querySelector(".form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(form)) {
      showFormMessage(messageEl, "Por favor complete los campos obligatorios.", "error");
      return;
    }
    submitContactForm(form, messageEl);
  });
}

// Punto de integración futura con backend / API de contacto.
function submitContactForm(form, messageEl) {
  const data = Object.fromEntries(new FormData(form).entries());

  // TODO (fase backend): reemplazar por una llamada real a la API de contacto.
  console.log("Mensaje de contacto (pendiente de conectar a backend):", data);

  showFormMessage(messageEl, "Solicitud enviada correctamente.", "success");
  form.reset();
}

/* -------------------------------------------------------
   Año automático en el footer
   ------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
