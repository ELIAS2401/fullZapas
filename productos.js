/**
 * productos.js – Full Zapas
 * Lee los productos desde Google Sheets publicado como CSV.
 *
 * COLUMNAS ESPERADAS EN TU SHEET (fila 1 = encabezados):
 *   id | titulo | categoria | marca | descripcion | precio | talles_disponibles | talles_agotados | imagen_1 | imagen_2 | imagen_3 | destacado | material | suela | sistema_talle
 *
 * CATEGORIAS válidas: botines | hombre | mujer | ninos | ropa
 * talles_disponibles: talles separados por coma → 38,39,40,41
 * talles_agotados:    talles sin stock separados por coma → 42,43  (o vacío)
 * destacado:          SI o vacío
 */

const SHEET_CSV_URL = "https://opensheet.elk.sh/15Q3_Ht49RL8FdgbeOVx2Al1rwxs_t3M6NdWAOqz5fLA/botines";

// Variable global que usará app.js
let PRODUCTOS = [];

/**
 * Parsea el texto CSV respetando campos con comas dentro de comillas.
 */
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = parseLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cols = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = (cols[idx] || "").trim();
    });
    rows.push(obj);
  }
  return rows;
}

function parseLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(cur); cur = "";
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

/**
 * Convierte una fila del sheet al formato que espera app.js
 */
function rowToProducto(row, index) {
  const tallesDisp = (row.talles_disponibles || "")
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const tallesAgot = (row.talles_agotados || "")
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  // Unir todos los talles, sin duplicados, ordenados numéricamente
  const todosLosTalles = [...new Set([...tallesDisp, ...tallesAgot])].sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );

  const talles = todosLosTalles.map(t => ({
    talle: t,
    agotado: tallesAgot.includes(t),
  }));

  const imagenes = [row.imagen_1, row.imagen_2, row.imagen_3]
    .filter(Boolean)
    .map(url => url.trim());

  // Placeholder si no hay imágenes cargadas
  if (imagenes.length === 0) {
    imagenes.push(
      `https://placehold.co/600x600/111111/7B2FFF?text=${encodeURIComponent(row.titulo || "Producto")}`
    );
  }

  return {
    id: parseInt(row.id) || index + 1,
    titulo: row.titulo || "Sin nombre",
    categoria: (row.categoria || "hombre").toLowerCase().replace(/\s/g, ""),
    marca: row.marca || "",
    descripcion: row.descripcion || "",
    precio: parseFloat((row.precio || "0").replace(/[$.]/g, "").replace(",", ".")) || 0,
    moneda: row.moneda || "ARS",
    talles,
    imagenes,
    destacado: (row.destacado || "").toUpperCase() === "SI",
    infoExtra: {
      material: row.material || null,
      suela: row.suela || null,
      sistema_talle: row.sistema_talle || "EUR",
    },
  };
}

/**
 * Carga los productos desde el Sheet y dispara el render.
 * Llamado desde app.js al iniciar.
 */
async function cargarProductosDesdeSheets() {
  const grid = document.getElementById("productosGrid");

  grid.innerHTML = Array(4).fill(`
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton-line wide"></div>
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
    </div>
  `).join("");

  try {
    const res = await fetch(SHEET_CSV_URL);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const rows = await res.json();

    if (rows.length === 0) {
      throw new Error("Sheet vacío o sin datos");
    }

    PRODUCTOS = rows.map(rowToProducto)
      .filter(p => p.talles.some(t => !t.agotado)); // ← solo con stock

    renderProductos("todos");

  } catch (err) {
    console.error("Error cargando productos:", err);

    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        Error cargando productos
      </div>
    `;
  }
}
