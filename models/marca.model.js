const pool = require('../util/database');

const Marca = {
  obtenerTodas: async () => {
    const res = await pool.query('SELECT * FROM marcas ORDER BY nombre');
    return res.rows;
  },
  
  obtenerPorId: async (id_marca) => {
    const res = await pool.query('SELECT * FROM marcas WHERE id_marca = $1', [id_marca]);
    return res.rows[0];
  }
};

module.exports = Marca;