const rescue = require('express-rescue');
const ServiceSale = require('../services/ServiceSale');
 
const createSaleProduct = rescue(async (req, res) => {
    const data = await ServiceSale.createSaleProduct(
    req.body,
    );
  if (data.error) {
    const { code, message } = data.error;
    return res.status(code).json({ message });
}
  return res.status(201).json(data);
});
const getAll = rescue(async (req, res) => {
  const products = await ServiceSale.getAll();
  if (products.error) {
    return res.status(products.error.code).json({ message: products.error.message });
  } 
  return res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ServiceSale.getById(id);
  if (product.error) {
    return res.status(product.error.code).json({ message: product.error.message });
  }
  return res.status(200).json(product);
});
const deleteSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ServiceSale.deleteSaleById(id);
  // console.log(product);
  if (product.error) {
    // console.log('teste');
    return res.status(product.error.code).json({ message: product.error.message });
  }
  return res.status(204).json();
});

module.exports = {
  createSaleProduct,
  getAll,
  getById,
  deleteSaleById,
};