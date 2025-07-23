const pool = require('../util/database');

class HomeController {
  static async index(req, res) {
    try {
      const companyInfo = { 
        mission: 'Impulsar el consumo de productos naturales y artesanales elaborados en Hidalgo.',
        vision: 'Ser referente nacional en productos naturales de calidad.'
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
      console.error('Error en HomeController.index:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error interno del servidor. Por favor, intenta más tarde.'
      });
    }
  }

  static marcas(req, res) {
    res.render('marcas', { title: 'Terranía - Marcas' });
  }

  static contacto(req, res) {
    res.render('contacto', { title: 'Terranía - Contacto' });
  }
}

module.exports = HomeController;