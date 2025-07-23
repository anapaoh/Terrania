const pool = require('../util/database');

class Company {
  static async getCompanyInfo() {
    try {
      const result = await pool.query(`
        SELECT * FROM company_info WHERE id = 1
      `);
      return result.rows[0];
    } catch (error) {
      console.error('Error al obtener información de la empresa:', error);
      return null;
    }
  }

  static async getBrands() {
    try {
      const result = await pool.query(`
        SELECT * FROM brands ORDER BY name ASC
      `);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener marcas:', error);
      return [];
    }
  }

  static async getGeographicData() {
    try {
      const result = await pool.query(`
        SELECT * FROM geographic_data ORDER BY region ASC
      `);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener datos geográficos:', error);
      return [];
    }
  }
}

module.exports = Company;