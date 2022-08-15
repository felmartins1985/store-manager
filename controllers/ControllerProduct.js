const rescue = require('express-rescue');
const ServiceProduct = require('../services/ServiceProduct');
 
const getAll = rescue(async (req, res) => {
  const products = await ServiceProduct.getAll();
  if (products.error) {
    return res.status(products.error.code).json({ message: products.error.message });
  }
  return res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ServiceProduct.getById(id);
  if (product.error) {
    return res.status(product.error.code).json({ message: product.error.message });
  }
  return res.status(200).json(product);
});

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const product = await ServiceProduct.create(name);
  if (product.error) {
    return res.status(product.error.code).json({ message: product.error.message });
  }
  res.status(201).json(product);
});

async function putProductById(req, res) {
  const product = await ServiceProduct.putProductById(req.params.id, req.body.name);
  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  return res.status(200).json(product);
}
module.exports = {
  getAll,
  getById,
  create,
  putProductById
};