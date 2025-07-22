const Company = require('../models/company');

class BrandsController {
  static async index(req, res) {
    try {
      const brands = await Company.getBrands();
      
      res.render('brands', {
        title: 'Marcas Colaboradoras - Terranía',
        brands
      });
    } catch (error) {
      console.error('Error en BrandsController:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error interno del servidor' 
      });
    }
  }
}

module.exports = BrandsController;