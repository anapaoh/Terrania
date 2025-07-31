const pool = require('../util/database');

class ProductosController {
  static async listarProductos(req, res) {
    try {
      const consultaProductos = async (tipo) => {
        const result = await pool.query(`
          SELECT 
            p.id_producto,
            p.nombre,
            p.descripcion,
            COALESCE(
              CASE 
                WHEN p.usa_variante_precio THEN (
                  SELECT MIN(v.precio) 
                  FROM variantes_producto v 
                  WHERE v.id_producto = p.id_producto
                )
                ELSE p.precio_base
              END,
              0
            ) AS precio
          FROM productos p
          WHERE p.tipo = $1
          ORDER BY p.created_at DESC
        `, [tipo]);

        return result.rows;
      };

      const [
        alimentos,
        bebidas,
        herbolaria,
        ecotecnias,
        textiles
      ] = await Promise.all([
        consultaProductos('Alimentos'),
        consultaProductos('Bebidas'),
        consultaProductos('Herbolaria'),
        consultaProductos('Ecotecnias'),
        consultaProductos('Textiles')
      ]);

      res.render('productos', {
        title: 'Productos',
        alimentos,
        bebidas,
        herbolaria,
        ecotecnias,
        textiles
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).send('Error al obtener productos');
    }
  }
}

module.exports = ProductosController;