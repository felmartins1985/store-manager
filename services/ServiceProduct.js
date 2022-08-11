const ModelProduct = require('../models/ModelProduct');

const getAll = async () => {
  const products = await ModelProduct.getAll();
  if (!products) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }
  return products;
};

const getById = async (id) => {
  const product = await ModelProduct.getById(id);
  if (!product) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }
  return product;
};

const create = async (name) => {
  const product = await ModelProduct.create(name);
  return product;
};

module.exports = {
  getAll,
  getById,
  create,
};