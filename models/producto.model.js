const pool = require('../util/database');

const Producto = {
  async buscarPorId(id_producto) {
    const res = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id_producto]);
    return res.rows[0];
  },

  async insertarProducto({ id_marca, nombre, descripcion, cantidad, precio, tipo }) {
    await pool.query(`
      INSERT INTO productos (id_marca, nombre, descripcion, cantidad, precio_base, tipo)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [id_marca, nombre, descripcion, cantidad, precio, tipo]);
  },

  async actualizarProducto({ id_producto, id_marca, nombre, descripcion, cantidad, precio, tipo }) {
    await pool.query(`
      UPDATE productos
      SET id_marca = $1,
          nombre = $2,
          descripcion = $3,
          cantidad = $4,
          precio_base = $5,
          tipo = $6,
          updated_at = now()
      WHERE id_producto = $7
    `, [id_marca, nombre, descripcion, cantidad, precio, tipo, id_producto]);
  },

  async obtenerPorMarca(id_marca) {
    const res = await pool.query(`
      SELECT * FROM productos
      WHERE id_marca = $1
      ORDER BY nombre
    `, [id_marca]);

    const productos = res.rows;

    const ids = productos.map(p => p.id_producto);
    let variantes = [];

    if (ids.length > 0) {
      const variantesRes = await pool.query(`
        SELECT * FROM variantes_producto
        WHERE id_producto = ANY($1)
      `, [ids]);

      variantes = variantesRes.rows;
    }

    productos.forEach(p => {
      p.variantes = variantes.filter(v => v.id_producto === p.id_producto);
    });

    return productos;
  }
};

module.exports = Producto;