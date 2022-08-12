const sinon = require('sinon');
const { expect } = require('chai');
const ServiceSale = require('../../../services/ServiceSale');
const ControllerSale = require('../../../controllers/ControllerSale');

describe('Controller- Ao testar a funcao createSaleProduct', () => {
  describe('quando a funcao esta invalida', () => {
    const response = {};
    const request = {};
    let next = ()=>{};
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub().returns();
      sinon.stub(ServiceSale, 'createSaleProduct').resolves({
        error: {
          code: 404,
          message: 'Product not found',
        },
      });
    })
    after(() => {
      ServiceSale.createSaleProduct.restore();
    });
    it('deve retornar com chaves "code" e "message"', async () => { 
      await ControllerSale.createSaleProduct(request, response, next);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    })
  })
  describe('quando a funcao esta valida', () => {
    const response = {};
    const request = {};
    const payload = {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
    };
    let next = ()=>{};
    before(async () => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    next= sinon.stub().returns();
      sinon.stub(ServiceSale, 'createSaleProduct').resolves(payload);
    })
    after(async () => {
      ServiceSale.createSaleProduct.restore();
    })
    it('deve retonar um array, o status 200 e o array de objetos', async () => {
      await ControllerSale.createSaleProduct(request, response,next);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    })
  })
})
