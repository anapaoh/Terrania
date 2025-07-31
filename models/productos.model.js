const pool = require('../util/database');

exports.buscarPorId = async (id_producto) => {
  const res = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id_producto]);
  return res.rows[0];
};

exports.insertarProducto = async ({ id_marca, nombre, descripcion, cantidad, precio, tipo }) => {
  await pool.query(`
    INSERT INTO productos (id_marca, nombre, descripcion, cantidad, precio, tipo)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [id_marca, nombre, descripcion, cantidad, precio, tipo]);
};

exports.actualizarProducto = async ({ id_producto, id_marca, nombre, descripcion, cantidad, precio, tipo }) => {
  await pool.query(`
    UPDATE productos
    SET id_marca = $1,
        nombre = $2,
        descripcion = $3,
        cantidad = $4,
        precio = $5,
        tipo = $6,
        updated_at = now()
    WHERE id_producto = $7
  `, [id_marca, nombre, descripcion, cantidad, precio, tipo, id_producto]);
};