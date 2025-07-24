const cart = document.querySelector('.cart');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const offcanvasCompra = new bootstrap.Offcanvas(document.getElementById('offcanvasCompra'));

/* ---------- GUARDAR EN LOCALSTORAGE ---------- */
function guardarCarritoLocalStorage() {
  const productos = [];
  listaCarrito.querySelectorAll('.basket_product').forEach(prod => {
    productos.push({
      nombre: prod.querySelector('h6').textContent,
      descripcion: prod.querySelector('small').textContent,
      precio: parseFloat(prod.dataset.precio),
      cantidad: parseInt(prod.querySelector('.cantidad').textContent),
      imagen: prod.querySelector('.producto-img').getAttribute('style')
    });
  });
  localStorage.setItem('carrito', JSON.stringify(productos));
}

/* ---------- CARGAR DESDE LOCALSTORAGE (AL ENTRAR A CUALQUIER RUTA) ---------- */
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
  carritoGuardado.forEach(({ nombre, descripcion, precio, cantidad, imagen }) => {
    const productoCarrito = document.createElement('div');
    productoCarrito.classList.add('basket_product', 'd-flex', 'align-items-center', 'mb-3');
    productoCarrito.dataset.precio = precio;

    productoCarrito.innerHTML = `
      <div class="d-flex align-items-center flex-grow-1">
        <div class="producto-img" 
            style="width:95px; height:95px; border-radius:5px;
                    background-size:cover; background-position:center; 
                    ${imagen};">
        </div>
        <div class="ms-2">
          <h6 class="mb-0">${nombre}</h6>
          <small class="text-muted d-block">${descripcion}</small>
          <p class="mb-0 fw-bold">$${precio.toFixed(2)}</p>
        </div>
      </div>

      <div class="d-flex align-items-center ms-2">
        <i class="bi bi-dash-square btn-restar" style="cursor:pointer; font-size:1.2rem;"></i>
        <span class="cantidad mx-2">${cantidad}</span>
        <i class="bi bi-plus-square btn-sumar" style="cursor:pointer; font-size:1.2rem;"></i>
      </div>

      <button class="btn btn-sm btn-danger ms-2 btn-eliminar" aria-label="Eliminar producto">&times;</button>
    `;
    listaCarrito.appendChild(productoCarrito);
  });

  actualizarEstadoCarrito();
}

/* ---------- ACTUALIZAR CARRITO Y TOTAL ---------- */
function actualizarEstadoCarrito() {
  let total = 0;
  listaCarrito.querySelectorAll('.basket_product').forEach(prod => {
    const cantidad = parseInt(prod.querySelector('.cantidad').textContent);
    const precioUnitario = parseFloat(prod.dataset.precio);
    total += cantidad * precioUnitario;
  });

  totalCarrito.textContent = `$${total.toFixed(2)}`;
  const empty = listaCarrito.children.length === 0;
  cart.setAttribute('data-empty', empty);
}

/* ---------- CARGAR CARRITO AL INICIAR ---------- */
window.addEventListener('DOMContentLoaded', () => {
  cargarCarritoDesdeLocalStorage();
});

/* ---------- AGREGAR PRODUCTO ---------- */
document.querySelectorAll('.btn-agregar').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.card');
    const nombre = card.querySelector('.contenido-producto h5').textContent;
    const descripcion = card.querySelector('.contenido-producto p').textContent;
    const precioTexto = card.querySelector('.contenido-producto p:nth-of-type(2)').textContent;
    const precio = parseFloat(precioTexto.replace('$', ''));

    const productoExistente = Array.from(listaCarrito.querySelectorAll('.basket_product'))
      .find(prod => prod.querySelector('h6').textContent === nombre);

    if (productoExistente) {
      const cantidadEl = productoExistente.querySelector('.cantidad');
      cantidadEl.textContent = parseInt(cantidadEl.textContent) + 1;
      actualizarEstadoCarrito();
      guardarCarritoLocalStorage();
      offcanvasCompra.show();
      return;
    }

    const productoCarrito = document.createElement('div');
    productoCarrito.classList.add('basket_product', 'd-flex', 'align-items-center', 'mb-3');
    productoCarrito.dataset.precio = precio;

    productoCarrito.innerHTML = `
      <div class="d-flex align-items-center flex-grow-1">
        <div class="producto-img" 
            style="width:95px; height:95px; border-radius:5px;
                    background-size:cover; background-position:center; 
                    ${card.querySelector('.producto-img').getAttribute('style')};">
        </div>
        <div class="ms-2">
          <h6 class="mb-0">${nombre}</h6>
          <small class="text-muted d-block">${descripcion}</small>
          <p class="mb-0 fw-bold">$${precio.toFixed(2)}</p>
        </div>
      </div>

      <div class="d-flex align-items-center ms-2">
        <i class="bi bi-dash-square btn-restar" style="cursor:pointer; font-size:1.2rem;"></i>
        <span class="cantidad mx-2">1</span>
        <i class="bi bi-plus-square btn-sumar" style="cursor:pointer; font-size:1.2rem;"></i>
      </div>

      <button class="btn btn-sm btn-danger ms-2 btn-eliminar" aria-label="Eliminar producto">&times;</button>
    `;
    listaCarrito.appendChild(productoCarrito);

    actualizarEstadoCarrito();
    guardarCarritoLocalStorage();
    offcanvasCompra.show();
  });
});

/* ---------- EVENTOS DE SUMAR/RESTAR/ELIMINAR ---------- */
listaCarrito.addEventListener('click', e => {
  const productoCarrito = e.target.closest('.basket_product');
  if (!productoCarrito) return;

  if (e.target.classList.contains('btn-sumar')) {
    const cantidadEl = productoCarrito.querySelector('.cantidad');
    cantidadEl.textContent = parseInt(cantidadEl.textContent) + 1;
    actualizarEstadoCarrito();
    guardarCarritoLocalStorage();
  }

  if (e.target.classList.contains('btn-restar')) {
    const cantidadEl = productoCarrito.querySelector('.cantidad');
    let cantidad = parseInt(cantidadEl.textContent);
    if (cantidad > 1) {
      cantidad--;
      cantidadEl.textContent = cantidad;
      actualizarEstadoCarrito();
      guardarCarritoLocalStorage();
    }
  }

  if (e.target.classList.contains('btn-eliminar')) {
    productoCarrito.remove();
    actualizarEstadoCarrito();
    guardarCarritoLocalStorage();
  }
});

/* ---------- FINALIZAR COMPRA ---------- */
document.getElementById('btn-finalizar-compra').addEventListener('click', () => {
  window.location.href = '/checkout';
});
