const Company = require('../models/company');

class HomeController {
  static async index(req, res) {
    try {
      const companyInfo = await Company.getCompanyInfo();
      const brands = await Company.getBrands();
      
      res.render('home', {
        title: 'Terranía - Productos Naturales de Hidalgo',
        companyInfo: companyInfo || {
          mission: 'Impulsar el consumo de productos naturales y artesanales elaborados en el estado de Hidalgo, los cuales contribuyan a la creación de una sola salud, promoviendo la producción limpia, así como la comercialización con responsabilidad y precios justos.',
          vision: 'Consolidarse como una empresa Hidalguense comprometida con el desarrollo social equitativo, a través del cuidado de la salud de nuestros consumidores, productores y estando en armonía con un ambiente sano; impulsando la conservación de la cultura y raíces mexicanas.'
        },
        brands: brands.slice(0, 6), // Mostrar solo las primeras 6 marcas en home
        showHero: true
      });
    } catch (error) {
      console.error('Error en HomeController:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error interno del servidor' 
      });
    }
  }
}

module.exports = HomeController;