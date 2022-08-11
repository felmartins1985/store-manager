const sinon = require('sinon');
const { expect } = require('chai');
const ServiceProduct = require('../../../services/ServiceProduct');
const ControllerProduct = require('../../../controllers/ControllerProduct');

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
      sinon.stub(ServiceProduct, 'getAll').resolves({
        error: {
          code: 404,
          message: 'Product not found',
        },
      });
    })
    after(() => {
      ServiceProduct.getAll.restore();
    });
    it('deve retornar com chaves "code" e "message"', async () => { 
      await ControllerProduct.getAll(request, response, next);
      console.log(response.status(),"aqui");
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    })
  })
  describe('quando a funcao esta valida', () => {
    const response = {};
    const request = {};
    const payload = [{
      id: 1,
      name: 'Martelo de Thor',
    }];
    let next = ()=>{};
    before(async () => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    next= sinon.stub().returns();
      sinon.stub(ServiceProduct, 'getAll').resolves(payload);
    })
    after(async () => {
      ServiceProduct.getAll.restore();
    })
    it('deve retonar um array, o status 200 e o array de objetos', async () => {
      await ControllerProduct.getAll(request, response,next);
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
      sinon.stub(ServiceProduct, 'getById').resolves({
        error: {
          code: 404,
          message: 'Product not found',
        },
      });
    })
    after(() => {
      ServiceProduct.getById.restore();
    });
    it('deve retornar com chaves "code" e "message"', async () => {
      await ControllerProduct.getById(request, response,next);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    })
  })
  describe('quando a funcao esta valida', () => {
    const response = {};
    const request = {};
    let next = ()=>{};
    const payload = {
      id: 1,
      name: 'Martelo de Thor',
    }
    before(() => {
      request.params = { id: 1 }
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub().returns();
      sinon.stub(ServiceProduct, 'getById').resolves(payload);
    })
    after(() => {
      ServiceProduct.getById.restore();
    })
    it('deve retonar um array, o status 200 e o array de objetos', async () => {
      await ControllerProduct.getById(request, response,next);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(payload)).to.be.equal(true);
    })
  })
})