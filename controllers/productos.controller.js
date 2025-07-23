const pool = require('../util/database');

class ProductosController {
  static async listarProductos(req, res) {
    try {
      const alimentosResult = await pool.query(
        `SELECT id_producto, nombre, descripcion, precio 
         FROM productos
         WHERE tipo = 'Alimentos'
         ORDER BY created_at DESC`
      );
  
      const bebidasResult = await pool.query(
        `SELECT id_producto, nombre, descripcion, precio 
         FROM productos
         WHERE tipo = 'Bebidas'
         ORDER BY created_at DESC`
      );

      const herbolariaResult = await pool.query(
        `SELECT id_producto, nombre, descripcion, precio 
         FROM productos
         WHERE tipo = 'Herbolaria'
         ORDER BY created_at DESC`
      );


      const ecotecniasResult = await pool.query(
        `SELECT id_producto, nombre, descripcion, precio 
         FROM productos
         WHERE tipo = 'Ecotecnias'
         ORDER BY created_at DESC`
      );

      const textilesResult = await pool.query(
        `SELECT id_producto, nombre, descripcion, precio 
         FROM productos
         WHERE tipo = 'Textiles'
         ORDER BY created_at DESC`
      );
  
      res.render('productos', {
        title: 'Productos',
        alimentos: alimentosResult.rows,
        bebidas: bebidasResult.rows,
        herbolaria: herbolariaResult.rows,
        ecotecnias: ecotecniasResult.rows,
        textiles: textilesResult.rows
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).send('Error al obtener productos');
    }
  }  
}

module.exports = ProductosController;
