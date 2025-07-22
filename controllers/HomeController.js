const pool = require('../util/database');

class HomeController {
  static async index(req, res) {
    try {
      const companyInfo = { 
        mission: '...',
        vision: '...'
      };
      
      const result = await pool.query('SELECT * FROM marcas ORDER BY id_marca');
      const marcas = result.rows;

      res.render('home', {
        title: 'Terranía - Productos Naturales de Hidalgo',
        companyInfo,
        marcas,
        showHero: true
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error interno del servidor'
      });
    }
  }
}

module.exports = HomeController;
