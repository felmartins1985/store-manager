const ModelSale = require('../models/ModelSale');
const Validations = require('./validations');

const createSaleProduct = async (itemsSold) => {
  const validation = await Validations.validateQuantityAndProduct(itemsSold);
  // console.log(validation, 'service');
  if (validation !== undefined) return validation;
  const { id } = await ModelSale.createIdSale();
  Promise.all(
    itemsSold.map(async (itemSold) => {
      await ModelSale.createSaleProduct(id, itemSold);
    }),
  );
  return {
    id,
    itemsSold,
  };
}; 
//
const getAll = async () => {
  const products = await ModelSale.getAll();
  return products;
};
 
const getById = async (id) => {
  const product = await ModelSale.getById(id);
  if (!product) {
    return {
      error: {
        code: 404,
        message: 'Sale not found',
      },
    };
  }
  return product;
};
module.exports = {
  createSaleProduct,
  getAll,
  getById,
};