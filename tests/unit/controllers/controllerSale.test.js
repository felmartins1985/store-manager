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

//
describe('Controller- Ao testar a funcao getAll', () => {
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
      sinon.stub(ServiceSale, 'getAll').resolves({
        error: {
          code: 404,
          message: 'Sale not found',
        },
      });
    })
    after(() => {
      ServiceSale.getAll.restore();
    });
    it('deve retornar com chaves "code" e "message"', async () => { 
      await ControllerSale.getAll(request, response, next);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    })
  })
  describe('quando a funcao esta valida', () => {
    const response = {};
    const request = {};
    const payload =[[
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]];
    let next = ()=>{};
    before(async () => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    next= sinon.stub().returns();
      sinon.stub(ServiceSale, 'getAll').resolves(payload);
    })
    after(async () => {
      ServiceSale.getAll.restore();
    })
    it('deve retonar um array, o status 200 e o array de objetos', async () => {
      await ControllerSale.getAll(request, response,next);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    })
  })
})
describe('Controller-Ao testar a funcao getById', () => {
  describe('quando a funcao esta invalida', () => {
    const response = {};
    const request = {};
    let next = ()=>{};
    before(() => {
      request.params = { id: 1 }
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub().returns();
      sinon.stub(ServiceSale, 'getById').resolves({
        error: {
          code: 404,
          message: 'Sale not found',
        },
      });
    })
    after(() => {
      ServiceSale.getById.restore();
    });
    it('deve retornar com chaves "code" e "message"', async () => {
      await ControllerSale.getById(request, response,next);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    })
  })
  describe('quando a funcao esta valida', () => {
    const response = {};
    const request = {};
    let next = ()=>{};
    const payload =   [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }

  ]
    before(() => {
      request.params = { id: 1 }
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub().returns();
      sinon.stub(ServiceSale, 'getById').resolves(payload);
    })
    after(() => {
      ServiceSale.getById.restore();
    })
    it('deve retonar um array, o status 200 e o array de objetos', async () => {
      await ControllerSale.getById(request, response,next);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    })
  })
})