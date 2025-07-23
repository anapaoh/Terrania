const Company = require('../models/company');

class AboutController {
  static async index(req, res) {
    try {
      const companyInfo = await Company.getCompanyInfo();
      const geographicData = await Company.getGeographicData();
      
      res.render('about', {
        title: 'Sobre Nosotros - Terranía',
        companyInfo: companyInfo || {
          mission: 'Impulsar el consumo de productos naturales y artesanales elaborados en el estado de Hidalgo, los cuales contribuyan a la creación de una sola salud, promoviendo la producción limpia, así como la comercialización con responsabilidad y precios justos.',
          vision: 'Consolidarse como una empresa Hidalguense comprometida con el desarrollo social equitativo, a través del cuidado de la salud de nuestros consumidores, productores y estando en armonía con un ambiente sano; impulsando la conservación de la cultura y raíces mexicanas.'
        },
        geographicData
      });
    } catch (error) {
      console.error('Error en AboutController:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Error interno del servidor' 
      });
    }
  }
}

module.exports = AboutController;