const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [product] = await connection.query(query);
  if (!product || product.length === 0) {
    return null;
  }
  return product;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.query(query, [id]);
  if (!product || product.length === 0) {
    return null;
  }
  return product[0];
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES(?)';
  const [product] = await connection.query(query, [name]);
  return {
    id: product.insertId,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
