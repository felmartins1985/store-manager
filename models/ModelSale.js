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
//

const getAll = async () => {
  const query = `SELECT sale_id AS saleId, date, product_id AS productId, quantity
  FROM StoreManager.sales_products AS sp 
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  ORDER BY saleId, productId`;
  const [product] = await connection.query(query);
  if (!product || product.length === 0) {
    return null;
  }
  return product;
}; 

const getById = async (id) => {
  const query = `SELECT date,product_id AS productId, quantity
  FROM StoreManager.sales_products AS sp 
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?`;
  const [product] = await connection.query(query, [id]);
  if (!product || product.length === 0) {
    return null;
  }
  return product;
};
const deleteSaleById = async (id) => {
   const [product] = await connection.query(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  if (!product || product.length === 0 || product === undefined) {
    return null;
  }
  await connection.query('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};
module.exports = {
  createIdSale,
  createSaleProduct,
  getAll,
  getById,
  deleteSaleById,
};  