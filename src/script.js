const productosFallback = [
  {
    id: 1,
    nombre: "Laptop Gamer RTX 4060",
    precio: 1450,
    detalle: "Intel Core i7, 16GB RAM, SSD 1TB"
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico Pro",
    precio: 28,
    detalle: "Sensor óptico, 6 botones, batería recargable"
  },
  {
    id: 3,
    nombre: "Audífonos RGB",
    precio: 65,
    detalle: "Sonido envolvente, micrófono integrado"
  },
  {
    id: 4,
    nombre: "Tarjeta de Video RTX 4070",
    precio: 720,
    detalle: "12GB GDDR6X, DLSS, Ray Tracing"
  }
];

const categoriasFallback = [
  { id: 1, nombre: "Computadoras" },
  { id: 2, nombre: "Periféricos" },
  { id: 3, nombre: "Componentes" },
  { id: 4, nombre: "Audio" }
];

async function consultar(endpoint, fallback) {
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch {
    return fallback;
  }
}

function renderProductos(items) {
  const contenedor = document.getElementById("productos-grid");
  contenedor.innerHTML = items.map(item => `
    <article class="card">
      <h3>${item.nombre}</h3>
      <p>${item.detalle || "Sin detalle adicional"}</p>
      <span class="precio">$${item.precio}</span>
    </article>
  `).join("");
}

function renderCategorias(items) {
  const contenedor = document.getElementById("categorias-grid");
  contenedor.innerHTML = items.map(item => `
    <article class="card">
      <h3 class="categoria">${item.nombre}</h3>
    </article>
  `).join("");
}

async function init() {
  const productos = await consultar("productos", productosFallback);
  const categorias = await consultar("categorias", categoriasFallback);
  renderProductos(productos);
  renderCategorias(categorias);
}

init();