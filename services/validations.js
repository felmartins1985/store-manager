const ModelProduct = require('../models/ModelProduct');

const validateQuantity = (quantity) => {
  if (quantity < 1) {
    return {
      error: {
        code: 422,
        message: '"quantity" must be greater than or equal to 1',
      },
    };
  }
  if (quantity === undefined || !quantity) {
    return {
      error: {
        code: 400,
        message: '"quantity" is required',
      },
    };
  }
  return {};// <---
};

const validateProduct = (productId) => {
  // console.log(productId, 'productId');
  if (!productId || productId === undefined) {
    return {
      error: {
        code: 400,
        message: '"productId" is required',
      },
    };
  }
  return {};
};

const validateIfIdExists = async (id) => {
  const product = await ModelProduct.getById(id);
  if (!product || product === undefined) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }
  return {};
}; 

const validateQuantityAndProduct = async (itemsSold) => Promise
.all(itemsSold.map(async ({ quantity, productId }) => {
  const response1 = validateQuantity(quantity);
  if (response1.error) return response1;
  const response2 = validateProduct(productId);
  if (response2.error) return response2;
  const response3 = await validateIfIdExists(productId);
  if (response3.error) return response3;
})).then((data) => data.find((item) => item));
//
function validatyName(name) {
  if (!name || name === undefined) return { code: 400, message: '"name" is required' };
  if (name.length < 5) { 
    return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
  } 
  return true;
}

module.exports = {
  validateQuantityAndProduct,
  validatyName,
};
