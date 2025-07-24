const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
const homeRoutes = require('./routes/home.routes');
const aboutRoutes = require('./routes/aboutRoutes');
const productosRoutes = require('./routes/productos.routes');
const checkoutRoutes = require('./routes/checkout.routes');


app.use('/', homeRoutes);
app.use('/nosotros', aboutRoutes);
app.use('/', productosRoutes);
app.use('/', checkoutRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});