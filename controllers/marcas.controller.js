const pool = require('../util/database');

exports.listarMarcas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM marcas ORDER BY id_marca');
    const marcas = result.rows;
    res.render('marcas', { marcas });
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).send('Error al obtener marcas');
  }
};