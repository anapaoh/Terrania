const Marca = require('../models/marca.model.js');
const Producto = require('../models/producto.model.js');

exports.listarMarcas = async (req, res) => {
  try {
    const marcas = await Marca.obtenerTodas();
    res.render('marcas', { marcas });
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).send('Error al obtener marcas');
  }
};

exports.listarProductosPorMarca = async (req, res) => {
  const idMarca = req.params.id;
  try {
    const marca = await Marca.obtenerPorId(idMarca);
    if (!marca) {
      return res.status(404).send('Marca no encontrada');
    }
    const productos = await Producto.obtenerPorMarca(idMarca);
    res.render('productos_por_marca', { marca, productos });
  } catch (error) {
    console.error('Error al obtener productos por marca:', error);
    res.status(500).send('Error al obtener productos por marca');
  }
};

exports.obtenerProductosPorMarca = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const marca = await Marca.obtenerPorId(id);

    if (!marca) {
      return res.status(404).send('Marca no encontrada');
    }

    const productos = await Producto.obtenerPorMarca(id);
    res.render('marca_detalle', { marca, productos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener productos por marca');
  }
};
