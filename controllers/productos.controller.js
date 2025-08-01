const pool = require('../util/database');
const Producto = require('../models/producto.model');
const Marca = require('../models/marca.model');


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

  static async obtenerProductosPorMarca(req, res) {
    try {
      const id_marca = parseInt(req.params.id);
      if (isNaN(id_marca)) {
        return res.status(400).send('ID de marca inválido');
      }
  
      const marca = await Marca.obtenerPorId(id_marca);
      if (!marca) {
        return res.status(404).send('Marca no encontrada');
      }
  
      // Consulta productos con variantes
      const result = await pool.query(`
        SELECT 
          p.id_producto, p.nombre, p.descripcion, p.precio_base, p.usa_variante_precio, p.tipo,
          v.id_variante, v.atributo, v.valor, v.precio AS precio_variante
        FROM productos p
        LEFT JOIN variantes_producto v ON v.id_producto = p.id_producto
        WHERE p.id_marca = $1
        ORDER BY p.id_producto, v.id_variante
      `, [id_marca]);
  
      // Agrupar productos y sus variantes
      const productosMap = new Map();
  
      for (const row of result.rows) {
        let producto = productosMap.get(row.id_producto);
        if (!producto) {
          producto = {
            id_producto: row.id_producto,
            nombre: row.nombre,
            descripcion: row.descripcion,
            precio_base: row.precio_base,
            usa_variante_precio: row.usa_variante_precio,
            tipo: row.tipo,
            variantes: []
          };
          productosMap.set(row.id_producto, producto);
        }
  
        if (row.id_variante) {
          producto.variantes.push({
            id_variante: row.id_variante,
            atributo: row.atributo,
            valor: row.valor,
            precio: row.precio_variante
          });
        }
      }
  
      const productos = Array.from(productosMap.values());
  
      res.render('productos_por_marca', { marca, productos });
    } catch (error) {
      console.error('Error al obtener productos por marca:', error);
      res.status(500).send('Error del servidor');
    }
  }
  
}

module.exports = ProductosController; 