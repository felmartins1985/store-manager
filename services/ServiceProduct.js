const ModelProduct = require('../models/ModelProduct');
const Validations = require('./validations');

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
  if (!name || name.length === 0) {
    return {
      error: {
        code: 400,
        message: '"name" is required',
      },
    };
  }
  if (name.length < 5) {
    return {
      error: {
        code: 422,
        message: '"name" length must be at least 5 characters long',
      },
    };
   }
  const product = await ModelProduct.create(name);
  return product;
};
async function putProductById(id, name) {
  const validaty = Validations.validatyName(name);
  if (validaty !== true) return validaty;
  const product = await ModelProduct.putProductById(id, name);
  if (product === null) {
    return { code: 404, message: 'Product not found' };
  }
  return product;
}
const deleteProductById = async (id) => {
  const product = await ModelProduct.deleteProductById(id);
  if (product === null) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }
  return {};
};
module.exports = {
  getAll,
  getById,
  create,
  putProductById,
  deleteProductById,
}; 