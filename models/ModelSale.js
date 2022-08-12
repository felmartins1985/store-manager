const connection = require('./connection');

const createIdSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [sale] = await connection.query(query);
  return {
    id: sale.insertId,
  };
}; 

const createSaleProduct = async (id, { productId, quantity }) => {
  await connection.query(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
  `, [id, productId, quantity]);
  return [];
};

module.exports = {
  createIdSale,
  createSaleProduct,
};  