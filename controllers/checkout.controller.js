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
