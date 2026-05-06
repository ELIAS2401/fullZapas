/**
 * productos.js – Full Zapas
 * 
 * CÓMO AGREGAR PRODUCTOS:
 * Simplemente añadí un nuevo objeto al array siguiendo la misma estructura.
 * Esto simula los datos que vendría de tu Google Sheet "botines".
 * 
 * CAMPOS:
 *   id         → número único
 *   titulo     → nombre del producto
 *   categoria  → "botines" | "hombre" | "mujer" | "ninos"
 *   marca      → marca del producto
 *   descripcion→ descripción larga
 *   precio     → precio en ARS (solo número)
 *   moneda     → "ARS" | "USD"
 *   talles     → array de talles disponibles (vacío = agotado)
 *                Formato: { talle: "41", agotado: false }
 *   imagenes   → array de URLs de imágenes (primera = principal)
 *   destacado  → true si aparece en "destacados"
 *   infoExtra  → objeto con detalles adicionales
 */

const PRODUCTOS = [
  {
    id: 1,
    titulo: "Nike Air Force 1 Low",
    categoria: "hombre",
    marca: "Nike",
    descripcion: "Clásico atemporal. La Nike Air Force 1 Low en colorway blanco total, con suela Air para máxima comodidad. Cuero premium, construcción robusta. Un must-have para cualquier colección.",
    precio: 85000,
    moneda: "ARS",
    talles: [
      { talle: "38", agotado: false },
      { talle: "39", agotado: false },
      { talle: "40", agotado: false },
      { talle: "41", agotado: false },
      { talle: "42", agotado: true },
      { talle: "43", agotado: false },
      { talle: "44", agotado: false },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    ],
    destacado: true,
    infoExtra: {
      material: "Cuero premium",
      suela: "Air cushioning",
      sistema_talle: "EUR",
    }
  },
  {
    id: 2,
    titulo: "Adidas Predator Elite FG",
    categoria: "botines",
    marca: "Adidas",
    descripcion: "Botines de élite para cancha natural. Zona de control Control Frame, zonas de agarre PRECISIONZONE y suela FG para máxima tracción. El arma de los que dominan el partido.",
    precio: 120000,
    moneda: "ARS",
    talles: [
      { talle: "39", agotado: false },
      { talle: "40", agotado: false },
      { talle: "41", agotado: false },
      { talle: "42", agotado: false },
      { talle: "43", agotado: false },
      { talle: "44", agotado: true },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&q=80",
      "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
    ],
    destacado: true,
    infoExtra: {
      material: "Microfibra tejida",
      suela: "FG – Cancha natural",
      sistema_talle: "EUR",
    }
  },
  {
    id: 3,
    titulo: "Nike React Infinity Run",
    categoria: "mujer",
    marca: "Nike",
    descripcion: "Zapatilla de running diseñada para la mujer que no para. Foam React de alta resiliencia, upper de malla transpirable y soporte superior para largas distancias. Corre más, sufras menos.",
    precio: 95000,
    moneda: "ARS",
    talles: [
      { talle: "35", agotado: false },
      { talle: "36", agotado: false },
      { talle: "37", agotado: false },
      { talle: "38", agotado: true },
      { talle: "39", agotado: false },
      { talle: "40", agotado: false },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1562183241-840b8af0721e?w=600&q=80",
    ],
    destacado: true,
    infoExtra: {
      material: "Malla transpirable",
      suela: "React foam + rubber",
      sistema_talle: "EUR",
    }
  },
  {
    id: 4,
    titulo: "Puma Future 7 Match FG",
    categoria: "botines",
    marca: "Puma",
    descripcion: "Botines con sistema de cordones FUZIONFIT+ para un ajuste de manga. Corte bajo, suela FG multitaco. Ideales para cancha natural y semisintética. Velocidad y control en un solo par.",
    precio: 78000,
    moneda: "ARS",
    talles: [
      { talle: "38", agotado: false },
      { talle: "39", agotado: false },
      { talle: "40", agotado: false },
      { talle: "41", agotado: false },
      { talle: "42", agotado: false },
      { talle: "43", agotado: false },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    ],
    destacado: false,
    infoExtra: {
      material: "Sintético liviano",
      suela: "FG – Multitaco",
      sistema_talle: "EUR",
    }
  },
  {
    id: 5,
    titulo: "Nike Air Max 90 Kids",
    categoria: "ninos",
    marca: "Nike",
    descripcion: "El ícono de los 90 ahora en talles para los más chicos. Mismo estilo legendario, misma tecnología Air visible en el talón. Cómoda, durable y con el estilo que los nenes van a amar.",
    precio: 62000,
    moneda: "ARS",
    talles: [
      { talle: "28", agotado: false },
      { talle: "29", agotado: false },
      { talle: "30", agotado: false },
      { talle: "31", agotado: false },
      { talle: "32", agotado: true },
      { talle: "33", agotado: false },
      { talle: "34", agotado: false },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    ],
    destacado: true,
    infoExtra: {
      material: "Cuero y malla",
      suela: "Air Max cushioning",
      sistema_talle: "EUR",
    }
  },
  {
    id: 6,
    titulo: "Adidas Samba OG",
    categoria: "hombre",
    marca: "Adidas",
    descripcion: "Un clásico de la cultura. La Adidas Samba Original vuelve con todo. Upper de cuero, parche suede en el toe y suela de goma. Para la calle, el skate o el partido informal.",
    precio: 92000,
    moneda: "ARS",
    talles: [
      { talle: "38", agotado: false },
      { talle: "39", agotado: false },
      { talle: "40", agotado: true },
      { talle: "41", agotado: false },
      { talle: "42", agotado: false },
      { talle: "43", agotado: false },
      { talle: "44", agotado: false },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600&q=80",
    ],
    destacado: true,
    infoExtra: {
      material: "Cuero + Suede",
      suela: "Goma duradera",
      sistema_talle: "EUR",
    }
  },
  {
    id: 7,
    titulo: "New Balance 574 Mujer",
    categoria: "mujer",
    marca: "New Balance",
    descripcion: "Comodidad sin concesiones. La New Balance 574 en colorway femenino, con encapsulado ENCAP en la suela para soporte y amortiguación durante todo el día. Estilo casual en su máxima expresión.",
    precio: 88000,
    moneda: "ARS",
    talles: [
      { talle: "35", agotado: false },
      { talle: "36", agotado: false },
      { talle: "37", agotado: false },
      { talle: "38", agotado: false },
      { talle: "39", agotado: true },
      { talle: "40", agotado: false },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    ],
    destacado: false,
    infoExtra: {
      material: "Nobuk y malla",
      suela: "ENCAP midsole",
      sistema_talle: "EUR",
    }
  },
  {
    id: 8,
    titulo: "Nike Mercurial Vapor 16",
    categoria: "botines",
    marca: "Nike",
    descripcion: "La bota más rápida de Nike. Upper ACC (All Conditions Control) para máximo control con lluvia o sin ella. Plato de carbono liviano y suela FG para velocidad pura en cada zancada.",
    precio: 145000,
    moneda: "ARS",
    talles: [
      { talle: "38", agotado: true },
      { talle: "39", agotado: false },
      { talle: "40", agotado: false },
      { talle: "41", agotado: false },
      { talle: "42", agotado: false },
      { talle: "43", agotado: false },
      { talle: "44", agotado: false },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80",
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&q=80",
    ],
    destacado: true,
    infoExtra: {
      material: "Vaporposite+ ACC",
      suela: "FG – 12 tacos fijos",
      sistema_talle: "EUR",
    }
  },
];
