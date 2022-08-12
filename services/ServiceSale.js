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
module.exports = {
  createSaleProduct,
};