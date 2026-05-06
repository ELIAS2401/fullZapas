# 👟 Full Zapas – Página de Ventas

Tienda online estática para venta de zapatillas. Desarrollada para subir a **GitHub Pages**.

---

## 📁 Estructura de archivos

```
fullzapas/
├── index.html       → estructura principal de la página
├── style.css        → todos los estilos (paleta violeta + negro)
├── productos.js     → BASE DE DATOS de productos (editá acá)
├── app.js           → lógica: filtros, modal, WhatsApp
└── README.md        → esta guía
```

---

## 🛍️ Cómo agregar productos

Abrí `productos.js` y agregá un nuevo objeto al array `PRODUCTOS`:

```js
{
  id: 9,                        // ← número único, no repetir
  titulo: "Nike Dunk Low",
  categoria: "hombre",          // "botines" | "hombre" | "mujer" | "ninos"
  marca: "Nike",
  descripcion: "Descripción del producto...",
  precio: 90000,                // número sin puntos ni $
  moneda: "ARS",
  talles: [
    { talle: "40", agotado: false },
    { talle: "41", agotado: false },
    { talle: "42", agotado: true },   // true = talle agotado (aparece tachado)
  ],
  imagenes: [
    "URL_IMAGEN_PRINCIPAL",
    "URL_IMAGEN_SECUNDARIA",    // opcional, podés poner más
  ],
  destacado: true,              // true = aparece primero
  infoExtra: {
    material: "Cuero",
    suela: "Rubber outsole",
    sistema_talle: "EUR",
  }
}
```

### Tips para imágenes:
- Subí las fotos a [Cloudinary](https://cloudinary.com) (gratis) o [ImgBB](https://imgbb.com)
- O usá Google Drive → clic derecho → Compartir → copiá el link de vista previa
- También podés poner las imágenes en una carpeta `/img` del proyecto

---

## 🚀 Publicar en GitHub Pages

1. Creá un repositorio en GitHub (ej: `fullzapas`)
2. Subí todos los archivos al repo
3. Ir a **Settings → Pages**
4. En "Source" elegí `main branch / root`
5. ¡Listo! Tu página estará en `https://tuusuario.github.io/fullzapas`

---

## 📱 WhatsApp

El número está en `app.js`, línea 1:
```js
const WA_NUMBER = "541164681220";
```
Cambialo si querés redirigir a otro número.

El mensaje que se envía al hacer un pedido es:
```
Hola, me interesó el producto: *Nike Air Force 1 Low* talle *41 EUR*. ¿Está disponible?
```

---

## ➕ Agregar categoría "Ropa" (Próximamente)

Cuando quieras activar ropa (remeras, camperas, etc.):

1. En `index.html`, buscá el botón de "Ropa" y eliminá el atributo `disabled`
2. En `productos.js`, agregá productos con `categoria: "ropa"`
3. En `app.js`, agregá `ropa: "👕 Ropa"` al objeto `categoriasLabel`

---

Desarrollado por **Elias** 💜
