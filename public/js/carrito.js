const cart = document.querySelector('.cart');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const offcanvasCompra = new bootstrap.Offcanvas(document.getElementById('offcanvasCompra'));

/* ---------- GUARDAR EN LOCALSTORAGE ---------- */
function guardarCarritoLocalStorage() {
  const productos = [];
  listaCarrito.querySelectorAll('.basket_product').forEach(prod => {
    productos.push({
      idproducto: prod.dataset.idproducto || null,
      idvariante: prod.dataset.idvariante || null,
      nombre: prod.querySelector('h6').textContent,
      descripcion: prod.querySelector('.variante-descripcion') 
                    ? prod.querySelector('.variante-descripcion').textContent 
                    : prod.querySelector('small').textContent,
      precio: parseFloat(prod.dataset.precio),
      cantidad: parseInt(prod.querySelector('.cantidad').textContent),
      imagen: prod.querySelector('.producto-img').getAttribute('style'),
      variantes: prod.dataset.variantes ? JSON.parse(prod.dataset.variantes) : []
    });
  });
  localStorage.setItem('carrito', JSON.stringify(productos));
}

/* ---------- CARGAR DESDE LOCALSTORAGE ---------- */
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
  carritoGuardado.forEach(({ idproducto, idvariante, nombre, descripcion, precio, cantidad, imagen, variantes }) => {
    const productoCarrito = document.createElement('div');
    productoCarrito.classList.add('basket_product', 'd-flex', 'align-items-center', 'mb-3');

    const precioSeguro = parseFloat(precio);
    productoCarrito.dataset.precio = isNaN(precioSeguro) ? 0 : precioSeguro;
    if (idvariante) productoCarrito.dataset.idvariante = idvariante;
    if (idproducto) productoCarrito.dataset.idproducto = idproducto;

    // Guardamos variantes como string en dataset para que el selector pueda accederlas
    productoCarrito.dataset.variantes = variantes ? JSON.stringify(variantes) : '[]';

    let detalleExtra = '';
    if (variantes && variantes.length > 0) {
      // Buscar índice variante actual para el select
      let selectedIndex = variantes.findIndex(v => `${v.atributo}: ${v.valor}` === descripcion);
      if (selectedIndex === -1) selectedIndex = 0;

      detalleExtra = `
        <select class="form-select form-select-sm select-variante" data-idproducto="${idproducto}" data-variantes='${JSON.stringify(variantes)}' style="max-width: 220px;">
          ${variantes.map((v, i) => `
            <option value="${i}" ${i === selectedIndex ? 'selected' : ''}>
              ${v.atributo}: ${v.valor} ($${parseFloat(v.precio).toFixed(2)})
            </option>
          `).join('')}
        </select>
        <small class="text-muted variante-descripcion mt-1 d-block">${descripcion}</small>
      `;
    } else {
      detalleExtra = `<small class="text-muted d-block">${descripcion}</small>`;
    }

    productoCarrito.innerHTML = `
      <div class="d-flex align-items-center flex-grow-1">
        <div class="producto-img" 
             style="width:95px; height:95px; border-radius:5px;
                    background-size:cover; background-position:center; 
                    ${imagen};">
        </div>
        <div class="ms-2">
          <h6 class="mb-0">${nombre}</h6>
          ${detalleExtra}
          <p class="mb-0 fw-bold precio-producto">$${(isNaN(precioSeguro) ? 0 : precioSeguro).toFixed(2)}</p>
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

/* ---------- CALCULAR TOTAL Y ESTADO ---------- */
function actualizarEstadoCarrito() {
  let total = 0;
  listaCarrito.querySelectorAll('.basket_product').forEach(prod => {
    const cantidad = parseInt(prod.querySelector('.cantidad').textContent);
    const precioUnitario = parseFloat(prod.dataset.precio);
    total += cantidad * (isNaN(precioUnitario) ? 0 : precioUnitario);
  });
  totalCarrito.textContent = `$${total.toFixed(2)}`;
  cart.setAttribute('data-empty', listaCarrito.children.length === 0);
}

/* ---------- AGREGAR PRODUCTO AL CARRITO ---------- */
function agregarProductoAlCarrito(producto) {
  // Buscar producto existente por idproducto + idvariante
  const productoExistente = Array.from(listaCarrito.querySelectorAll('.basket_product')).find(prod =>
    prod.dataset.idproducto === producto.id &&
    (prod.dataset.idvariante || '') === (producto.idvariante || '')
  );

  if (productoExistente) {
    const cantidadEl = productoExistente.querySelector('.cantidad');
    cantidadEl.textContent = parseInt(cantidadEl.textContent) + producto.cantidad;
  } else {
    const productoCarrito = document.createElement('div');
    productoCarrito.classList.add('basket_product', 'd-flex', 'align-items-center', 'mb-3');
    productoCarrito.dataset.precio = producto.precio;
    productoCarrito.dataset.idproducto = producto.id;
    if (producto.idvariante) productoCarrito.dataset.idvariante = producto.idvariante;

    productoCarrito.dataset.variantes = producto.variantes ? JSON.stringify(producto.variantes) : '[]';

    let detalleExtra = '';
    if (producto.variantes && producto.variantes.length > 0) {
      detalleExtra = `
        <select class="form-select form-select-sm select-variante" data-idproducto="${producto.id}" data-variantes='${JSON.stringify(producto.variantes)}' style="max-width: 220px;">
          ${producto.variantes.map((v, i) => `
            <option value="${i}" ${producto.variante === `${v.atributo}: ${v.valor}` ? 'selected' : ''}>
              ${v.atributo}: ${v.valor} ($${parseFloat(v.precio).toFixed(2)})
            </option>
          `).join('')}
        </select>
        <small class="text-muted variante-descripcion mt-1 d-block">${producto.variante || producto.descripcion}</small>
      `;
    } else {
      detalleExtra = `<small class="text-muted d-block">${producto.descripcion}</small>`;
    }

    productoCarrito.innerHTML = `
      <div class="d-flex align-items-center flex-grow-1">
        <div class="producto-img" 
             style="width:95px; height:95px; border-radius:5px;
                    background-size:cover; background-position:center;
                    ${producto.imagen};">
        </div>
        <div class="ms-2">
          <h6 class="mb-0">${producto.nombre}</h6>
          ${detalleExtra}
          <p class="mb-0 fw-bold precio-producto">$${producto.precio.toFixed(2)}</p>
        </div>
      </div>
      <div class="d-flex align-items-center ms-2">
        <i class="bi bi-dash-square btn-restar" style="cursor:pointer; font-size:1.2rem;"></i>
        <span class="cantidad mx-2">${producto.cantidad}</span>
        <i class="bi bi-plus-square btn-sumar" style="cursor:pointer; font-size:1.2rem;"></i>
      </div>
      <button class="btn btn-sm btn-danger ms-2 btn-eliminar" aria-label="Eliminar producto">&times;</button>
    `;

    listaCarrito.appendChild(productoCarrito);
  }
  actualizarEstadoCarrito();
  guardarCarritoLocalStorage();
  offcanvasCompra.show();
}

/* ---------- EVENTOS AL CARGAR ---------- */
window.addEventListener('DOMContentLoaded', () => {
  cargarCarritoDesdeLocalStorage();

  // Botones para agregar al carrito
  document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const descripcion = btn.dataset.descripcion || '';
      const imagen = btn.dataset.imagen || '';
      const tieneVariante = btn.dataset.tienevariante === 'true';
      let variantes = [];
      if (tieneVariante && btn.dataset.variantes) {
        try {
          variantes = JSON.parse(btn.dataset.variantes);
        } catch {
          variantes = [];
        }
      }

      let precioBase = parseFloat(btn.dataset.precio);
      let precioFinal = isNaN(precioBase) ? 0 : precioBase;

      agregarProductoAlCarrito({
        id,
        nombre,
        descripcion,
        precio: precioFinal,
        cantidad: 1,
        variante: null,
        imagen,
        idvariante: null,
        variantes: variantes
      });
    });
  });

  // Eventos para sumar, restar, eliminar productos
  listaCarrito.addEventListener('click', e => {
    const productoCarrito = e.target.closest('.basket_product');
    if (!productoCarrito) return;

    if (e.target.classList.contains('btn-sumar')) {
      const cantidadEl = productoCarrito.querySelector('.cantidad');
      cantidadEl.textContent = parseInt(cantidadEl.textContent) + 1;
    }
    if (e.target.classList.contains('btn-restar')) {
      const cantidadEl = productoCarrito.querySelector('.cantidad');
      const cantidadActual = parseInt(cantidadEl.textContent);
      if (cantidadActual > 1) {
        cantidadEl.textContent = cantidadActual - 1;
      }
    }
    if (e.target.classList.contains('btn-eliminar')) {
      productoCarrito.remove();
    }

    actualizarEstadoCarrito();
    guardarCarritoLocalStorage();
  });

  // Evento para cambio de variante en carrito
  listaCarrito.addEventListener('change', e => {
    if (e.target.classList.contains('select-variante')) {
      const select = e.target;
      const productoCarrito = select.closest('.basket_product');
      const index = parseInt(select.value);
      if (!productoCarrito || isNaN(index)) return;

      let variantes = [];
      try {
        variantes = JSON.parse(select.dataset.variantes || '[]');
      } catch {
        variantes = [];
      }
      if (variantes.length === 0) return;

      const varianteSeleccionada = variantes[index];
      if (varianteSeleccionada) {
        productoCarrito.dataset.precio = parseFloat(varianteSeleccionada.precio);
        productoCarrito.dataset.idvariante = `var_${productoCarrito.dataset.idproducto}_${varianteSeleccionada.atributo}_${varianteSeleccionada.valor}`;

        const descripcionVarianteEl = productoCarrito.querySelector('.variante-descripcion');
        if (descripcionVarianteEl) {
          descripcionVarianteEl.textContent = `${varianteSeleccionada.atributo}: ${varianteSeleccionada.valor}`;
        }

        const precioUI = productoCarrito.querySelector('.precio-producto');
        if (precioUI) {
          precioUI.textContent = `$${parseFloat(varianteSeleccionada.precio).toFixed(2)}`;
        }

        actualizarEstadoCarrito();
        guardarCarritoLocalStorage();
      }
    }
  });

  // Botón finalizar compra (si existe)
  const btnFinalizar = document.getElementById('btn-finalizar-compra');
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
      window.location.href = '/checkout';
    });
  }
});