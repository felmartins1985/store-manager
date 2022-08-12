 const { expect } = require('chai');
const sinon = require('sinon');
const ModelSales = require('../../../models/ModelSale');
const ServiceSales = require('../../../services/ServiceSale');
const ModelProduct = require('../../../models/ModelProduct');

describe('Service-Ao testar a funcao createSaleProduct', () => {
  describe('Ao dar erro', () => {
    before(async () => {
      sinon.stub(ModelProduct, 'getById').resolves(null);
    })
    after(async () => {
      ModelProduct.getById.restore();
    })
    it('a quantidade menor que 1', async () => {
      const response = await ServiceSales.createSaleProduct([{ productId: 1, quantity: -1 }]);
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(422);
      expect(response.error.message).to.be.equal('"quantity" must be greater than or equal to 1');
    })
    it('a quantidade nao informada', async () => {
      const response = await ServiceSales.createSaleProduct([{ productId: 1 }])
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(400);
      expect(response.error.message).to.be.equal('"quantity" is required');
    })
    it('o produto nao informado', async () => {
      const response = await ServiceSales.createSaleProduct([{ quantity: 1 }])
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(400);
      expect(response.error.message).to.be.equal('"productId" is required');
    })
    it('o Id do produto nao existe', async () => {
      const response = await ServiceSales.createSaleProduct([{ productId: 9999, quantity: 1 }])
      console.log(response)
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(404);
      expect(response.error.message).to.be.equal('Product not found');
    })
  })
  describe('Ao dar sucesso', () => {
    before(async () => {
      sinon.stub(ModelProduct, 'getById').resolves([[{
        id: 1,
        name: 'Martelo de Thor',
      }]]);
      sinon.stub(ModelSales, 'createIdSale').resolves({ id: 2 })
      sinon.stub(ModelSales, 'createSaleProduct').resolves([]);
    })
    after(async () => {
      ModelProduct.getById.restore();
      ModelSales.createIdSale.restore();
      ModelSales.createSaleProduct.restore();
    })
    it('retorna um objeto com id, productId e quantity', async () => {
      const response = await ServiceSales.createSaleProduct([{ productId: 1, quantity: 1 }]);
      expect(response).to.be.an('object');
      expect(response).includes.all.keys('id', 'itemsSold');
    })
  })
});