/* --- Navbar scroll shadow --- */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

/* --- Hamburger toggle --- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
});

// Close mobile menu on link click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

/* --- Countdown timer --- */
const target = new Date("2026-06-27T17:00:00"); // local device time

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      "<p style=\"font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-style:italic;opacity:.9;\">¡Nos Casamos Hoy!</p>";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  document.getElementById("cd-days").textContent = pad(days);
  document.getElementById("cd-hours").textContent = pad(hours);
  document.getElementById("cd-mins").textContent = pad(mins);
  document.getElementById("cd-secs").textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* --- Smooth scroll offset for fixed nav --- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
      ) || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* --- Packery Gallery with equalized bottom edge --- */
(function () {
  const galleryEl = document.getElementById("wedding-gallery");
  if (!galleryEl) return;

  // Lista de imágenes
  const images = [
    { src: "img/fotoHorizontal1.avif", orientation: "h" },
    { src: "img/fotoVertical1.avif", orientation: "v" },
    { src: "img/fotoHorizontal2.avif", orientation: "h" },
    { src: "img/fotoVertical2.avif", orientation: "v" },
    { src: "img/fotoHorizontal3.avif", orientation: "h" },
    { src: "img/fotoHorizontal4.avif", orientation: "h" },
    { src: "img/fotoVertical3.avif", orientation: "v" },
    { src: "img/fotoVertical4.avif", orientation: "v" },
    { src: "img/fotoHorizontal5.avif", orientation: "h" },
    { src: "img/fotoHorizontal6.avif", orientation: "h" },
    { src: "img/fotoHorizontal7.avif", orientation: "h" },
    { src: "img/fotoHorizontal8.avif", orientation: "h" },
  ];

  // Construir items
  images.forEach((imgData) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = "Boda Alina & Gilbran";
    img.loading = "eager";
    item.appendChild(img);
    galleryEl.appendChild(item);
  });

  // Inicializar Packery después de que las imágenes se hayan cargado
  const packeryOptions = {
    itemSelector: ".gallery-item",
    columnWidth: ".gallery-item",
    gutter: 0,
    percentPosition: true,
    transitionDuration: 0,
  };

  let pckry;
  let maxColHeight = 0;

  // Función para igualar altura de columnas añadiendo margen al último elemento de cada columna
  function equalizeColumnHeights() {
    if (!pckry) return;

    // Obtener posiciones de columnas
    const colYs = pckry.getColYs();
    const cols = colYs.length;
    if (cols === 0) return;

    // Altura máxima de columna
    const heights = colYs.map((y) => y + pckry.columnHeight);
    maxColHeight = Math.max(...heights);

    // Quitar márgenes previos de todos los items
    const items = pckry.getItemElements();
    items.forEach((item) => (item.style.marginBottom = ""));

    // Agrupar items por columna (basado en su posición left)
    const colItems = Array.from({ length: cols }, () => []);
    items.forEach((item) => {
      const left = parseFloat(item.style.left);
      if (isNaN(left)) return;
      // Encontrar la columna más cercana
      let colIndex = 0;
      let minDiff = Infinity;
      colYs.forEach((y, idx) => {
        const diff = Math.abs(left - pckry.columnWidth * idx);
        if (diff < minDiff) {
          minDiff = diff;
          colIndex = idx;
        }
      });
      colItems[colIndex].push(item);
    });

    // Para cada columna, añadir margen al último elemento si es necesario
    colItems.forEach((col, idx) => {
      if (col.length === 0) return;
      const lastItem = col[col.length - 1];
      const colHeight = pckry.getColYs()[idx] + pckry.columnHeight;
      const diff = maxColHeight - colHeight;
      if (diff > 0.5) {
        lastItem.style.marginBottom = diff + "px";
      }
    });

    // Re-aplicar layout para que Packery tenga en cuenta los nuevos márgenes
    pckry.layout();
  }

  // Cargar imágenes y luego inicializar Packery
  imagesLoaded(galleryEl, function () {
    pckry = new Packery(galleryEl, packeryOptions);

    // Pequeño retraso para asegurar que el layout esté listo
    setTimeout(() => {
      equalizeColumnHeights();
    }, 50);

    // Re-igualar cuando se complete un layout (útil al redimensionar)
    pckry.on("layoutComplete", function () {
      equalizeColumnHeights();
    });
  });

  // Re-igualar al cambiar tamaño de ventana (debounce)
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (pckry) {
        pckry.layout();
        // layoutComplete se encargará de equalize
      }
    }, 150);
  });
})();

// LIGHTBOX: abrir imagen al hacer clic en cualquier .gallery-item img
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(imgSrc) {
  lightboxImg.src = imgSrc;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; // evitar scroll detrás
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// Delegación de eventos: como las imágenes se agregan dinámicamente
document.addEventListener("click", function (e) {
  const img = e.target.closest(".gallery-item img");
  if (img) {
    e.preventDefault();
    openLightbox(img.src);
  }
});

// Cerrar al hacer clic en el fondo o en la X
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox || e.target === lightboxClose) {
    closeLightbox();
  }
});

// Cerrar con tecla Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});