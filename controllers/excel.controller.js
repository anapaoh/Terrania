const Producto = require('../models/producto.model');

exports.sincronizarProductoDesdeExcel = async (req, res) => {
  try {
    const { id_producto, id_marca, nombre, descripcion, cantidad, precio, tipo } = req.body;

    if (!id_marca || !nombre || !cantidad || !precio || !tipo) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const existe = await Producto.buscarPorId(id_producto);

    if (existe) {
      await Producto.actualizarProducto({ id_producto, id_marca, nombre, descripcion, cantidad, precio, tipo });
    } else {
      await Producto.insertarProducto({ id_marca, nombre, descripcion, cantidad, precio, tipo });
    }

    res.status(200).json({ mensaje: 'Producto sincronizado correctamente' });
  } catch (error) {
    console.error('Error al sincronizar producto:', error);
    res.status(500).json({ error: 'Error al sincronizar producto' });
  }
};