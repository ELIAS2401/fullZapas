/**
 * app.js – Full Zapas
 * Lógica principal: filtros, renderizado, modal, WhatsApp
 */

const WA_NUMBER = "541164681220";
let productoActivo = null;
let talleSeleccionado = null;

/* ── NAVBAR SCROLL ── */
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

/* ── FORMATEO DE PRECIO ── */
function formatPrecio(precio, moneda = "ARS") {
  return `$${precio.toLocaleString("es-AR")}`;
}

/* ── ETIQUETA DE CATEGORÍA ── */
const categoriasLabel = {
  botines: "⚽ Botines",
  hombre: "👨 Hombre",
  mujer: "👩 Mujer",
  ninos: "👦 Niños",
};

/* ── RENDER CARDS ── */
function renderProductos(filtro = "todos") {
  const grid = document.getElementById("productosGrid");
  const noResults = document.getElementById("noResults");
  grid.innerHTML = "";

  const lista = filtro === "todos"
    ? PRODUCTOS
    : PRODUCTOS.filter(p => p.categoria === filtro);

  if (lista.length === 0) {
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  lista.forEach((p, i) => {
    const tallesDisponibles = p.talles.filter(t => !t.agotado);
    const previewTalles = tallesDisponibles.slice(0, 4);
    const masCount = tallesDisponibles.length - 4;

    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4 col-xl-3";
    col.style.animationDelay = `${i * 0.05}s`;

    col.innerHTML = `
      <div class="producto-card h-100" data-id="${p.id}">
        <div class="card-img-wrap">
          <img src="${p.imagenes[0]}" alt="${p.titulo}" loading="lazy" />
          <span class="card-categoria-badge">${categoriasLabel[p.categoria] || p.categoria}</span>
          <div class="card-overlay">
            <button class="btn-ver-mas" data-id="${p.id}">Ver más</button>
          </div>
        </div>
        <div class="card-body-custom">
          <div class="card-titulo">${p.titulo}</div>
          <div class="card-desc">${p.descripcion}</div>
          <div class="card-footer-custom">
            <span class="card-precio">${formatPrecio(p.precio, p.moneda)}</span>
            <div class="card-talles-preview">
              ${previewTalles.map(t => `<span class="talle-chip-small">${t.talle}</span>`).join("")}
              ${masCount > 0 ? `<span class="talle-chip-small">+${masCount}</span>` : ""}
            </div>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });

  // Eventos en cards
  document.querySelectorAll(".producto-card, .btn-ver-mas").forEach(el => {
    el.addEventListener("click", (e) => {
      const id = parseInt(el.dataset.id || el.closest("[data-id]")?.dataset.id);
      if (!isNaN(id)) abrirModal(id);
    });
  });
}

/* ── FILTROS ── */
document.querySelectorAll(".filtro-btn:not(:disabled)").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProductos(btn.dataset.filtro);
  });
});

/* ── MODAL ── */
function abrirModal(id) {
  const p = PRODUCTOS.find(x => x.id === id);
  if (!p) return;

  productoActivo = p;
  talleSeleccionado = null;

  // Imagen principal
  const imgPrincipal = document.getElementById("modalImgPrincipal");
  imgPrincipal.src = p.imagenes[0];
  imgPrincipal.alt = p.titulo;

  // Thumbnails
  const thumbsEl = document.getElementById("modalThumbs");
  thumbsEl.innerHTML = "";
  if (p.imagenes.length > 1) {
    p.imagenes.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = p.titulo;
      img.className = `modal-thumb ${i === 0 ? "active" : ""}`;
      img.addEventListener("click", () => {
        imgPrincipal.src = src;
        document.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
        img.classList.add("active");
      });
      thumbsEl.appendChild(img);
    });
  }

  // Info
  document.getElementById("modalCategoria").textContent = categoriasLabel[p.categoria] || p.categoria;
  document.getElementById("modalTitulo").textContent = p.titulo;
  document.getElementById("modalDescripcion").textContent = p.descripcion;
  document.getElementById("modalPrecio").textContent = formatPrecio(p.precio, p.moneda);

  // Talles
  const tallesEl = document.getElementById("modalTalles");
  tallesEl.innerHTML = "";
  p.talles.forEach(t => {
    const chip = document.createElement("div");
    chip.className = `talle-chip${t.agotado ? " agotado" : ""}`;
    chip.textContent = t.talle;
    if (!t.agotado) {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".talle-chip:not(.agotado)").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
        talleSeleccionado = t.talle;
      });
    }
    tallesEl.appendChild(chip);
  });

  // Info extra
  const extraEl = document.getElementById("modalInfoExtra");
  if (p.infoExtra) {
    const items = [];
    if (p.infoExtra.material) items.push(`<span><i class="fas fa-tshirt"></i> Material: ${p.infoExtra.material}</span>`);
    if (p.infoExtra.suela) items.push(`<span><i class="fas fa-shoe-prints"></i> Suela: ${p.infoExtra.suela}</span>`);
    if (p.infoExtra.sistema_talle) items.push(`<span><i class="fas fa-ruler"></i> Sistema de talle: ${p.infoExtra.sistema_talle}</span>`);
    extraEl.innerHTML = items.join("");
  } else {
    extraEl.innerHTML = "";
  }

  // Botón pedir
  document.getElementById("btnPedirModal").onclick = enviarWhatsApp;

  // Abrir modal Bootstrap
  const modal = new bootstrap.Modal(document.getElementById("productoModal"));
  modal.show();
}

/* ── WHATSAPP ── */
function enviarWhatsApp() {
  if (!productoActivo) return;

  if (!talleSeleccionado) {
    // Animar sección de talles
    const tallesSection = document.querySelector(".modal-talles-section");
    tallesSection.style.animation = "none";
    tallesSection.offsetHeight; // reflow
    tallesSection.style.animation = "shake 0.4s ease";
    
    // Agregar estilos de shake si no existen
    if (!document.getElementById("shakeStyle")) {
      const style = document.createElement("style");
      style.id = "shakeStyle";
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `;
      document.head.appendChild(style);
    }

    // Mensaje de talle requerido
    const label = document.querySelector(".talles-label");
    const original = label.textContent;
    label.textContent = "⚠️ Seleccioná un talle primero";
    label.style.color = "#ff6b6b";
    setTimeout(() => {
      label.textContent = original;
      label.style.color = "";
    }, 2000);
    return;
  }

  const p = productoActivo;
  const msg = `Hola, me interesó el producto: *${p.titulo}* talle *${talleSeleccionado} EUR*. ¿Está disponible?`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  // Toast feedback
  const toastEl = document.getElementById("toastMsg");
  const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();

  setTimeout(() => {
    window.open(url, "_blank");
  }, 600);
}

/* ── SMOOTH SCROLL para nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      // Cerrar navbar mobile si está abierto
      const navMenu = document.getElementById("navMenu");
      if (navMenu.classList.contains("show")) {
        bootstrap.Collapse.getInstance(navMenu)?.hide();
      }
    }
  });
});

/* ── INIT ── */
cargarProductosDesdeSheets();
