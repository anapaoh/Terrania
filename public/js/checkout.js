document.addEventListener('DOMContentLoaded', async () => {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const resumen = document.getElementById('resumen-carrito');
  const totalResumen = document.getElementById('total-resumen');
  const hiddenInput = document.getElementById('carritoJSON');

  // --- Mostrar productos en el resumen ---
  if (carrito.length === 0) {
    resumen.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
  } else {
    let total = 0;
    carrito.forEach(item => {
      total += item.precio * item.cantidad;

      const productDiv = document.createElement('div');
      productDiv.classList.add('basket_product');
      productDiv.innerHTML = `
        <div class="producto-img" style="${item.imagen}"></div>
        <div>
          <h6 class="mb-0">${item.nombre}</h6>
          <small class="text-muted d-block">x${item.cantidad}</small>
          <p class="mb-0 fw-bold">$${(item.precio * item.cantidad).toFixed(2)}</p>
        </div>
      `;
      resumen.appendChild(productDiv);
    });

    totalResumen.textContent = `$${total.toFixed(2)}`;
  }

  // Guardar carrito al enviar datos del cliente
  document.getElementById('form-checkout').addEventListener('submit', () => {
    hiddenInput.value = JSON.stringify(carrito);
  });

  // --- STRIPE PAYMENT ELEMENT ---
  const totalCompra = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // 1. Crear PaymentIntent en el backend
  const res = await fetch('/crear-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ total: totalCompra })
  });

  const { clientSecret } = await res.json();

  // 2. Inicializar Stripe
  stripe = Stripe('pk_live_51RoF3e1B3Lv0IoJsqXak7JkhZu8gbzYiFLZlly7hNOfpQgZM9MW7W7dgs2pu5uHCwHOOpsG2I0lrhQHZ4aHo9GF200ilGjphLk'); // <-- cambia por tu clave pública
  elements = stripe.elements({ clientSecret });

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  // 3. Manejo del formulario de pago
  const formPago = document.getElementById('payment-form');
  const message = document.getElementById('payment-message');

  formPago.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/pago-exitoso"
      }
    });

    if (error) {
      message.textContent = error.message;
      message.style.color = 'red';
      message.style.display = 'block';
    } else {
      message.textContent = "Procesando pago...";
      message.style.color = 'green';
      message.style.display = 'block';
    }
  });
});


// --- PAYPAL BUTTON ---
paypal.Buttons({
  createOrder: async () => {
    const res = await fetch('/crear-pedido-paypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total: totalCompra })
    });

    const data = await res.json();
    return data.id;
  },
  onApprove: async (data, actions) => {
    const capture = await actions.order.capture();
    window.location.href = "/pago-exitoso";
  },
  onCancel: () => {
    alert("Pago cancelado");
  },
  onError: err => {
    console.error(err);
    alert("Hubo un problema con PayPal");
  }
}).render('#paypal-button-container');
