const Stripe = require('stripe');
const stripe = Stripe('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'); // clave secreta de Stripe

exports.crearPaymentIntent = async (req, res) => {
  try {
    const { total } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // en centavos
      currency: 'mxn',
      automatic_payment_methods: { enabled: true }, // Stripe elige el método
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creando PaymentIntent:", error);
    res.status(500).json({ error: "Error creando el pago" });
  }
};

const paypalClient = require('../public/js/paypal');

exports.crearPedidoPayPal = async (req, res) => {
  const { total } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'MXN',
        value: total.toFixed(2)
      }
    }],
    application_context: {
      return_url: 'https://tuweb.com/pago-exitoso',
      cancel_url: 'https://tuweb.com/checkout'
    }
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando pedido PayPal' });
  }
};
