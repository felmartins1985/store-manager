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

module.exports = {
  createSaleProduct,
};