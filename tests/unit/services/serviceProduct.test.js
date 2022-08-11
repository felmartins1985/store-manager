const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../models/ModelProduct');
const ProductService = require('../../../services/ServiceProduct');

describe('Service - Ao testar a funcao getAll', () => {
  describe('quando a funcao esta invalida', () => {
    before(async () => {
      sinon.stub(ProductModel, 'getAll').resolves(null);
    })
    after(async () => {
      ProductModel.getAll.restore();
    })
  
    it('deve retonar com chaves "code" e "message"', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(404);
      expect(response.error.message).to.be.equal('Product not found');
    })
  })
  describe('quando a funcao esta valida', () => {
    const payload = [{
      id: 1,
      name: 'Martelo de Thor',
    }]
    before(async () => {
      sinon.stub(ProductModel, 'getAll').resolves(payload);
    })
    after(async () => {
      ProductModel.getAll.restore();
    })
    it('deve retonar um array', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.an('array');
    })
    it('retorna nao vazio', async () => {
      const response = await ProductService.getAll();
      expect(response).to.not.be.empty;
    })
    it('retorna com propriedades "id" e "name"', async () => {
      const response = await ProductService.getAll();
      expect(response[0]).includes.all.keys('id', 'name');
      expect(response[0]).to.be.equal(payload[0])
    })
  })
})
describe('Ao testar a funcao getById', () => {
  describe('quando a funcao esta invalida', () => {
    before(async () => {
      sinon.stub(ProductModel, 'getById').resolves(null);
    })
    after(async () => {
      ProductModel.getById.restore();
    })
  
    it('deve retonar com chaves "id" e "name"', async () => {
      const response = await ProductService.getById();
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(404);
      expect(response.error.message).to.be.equal('Product not found');
    })
  })
  describe('quando a funcao esta valida', () => {
    const payload = {
      id: 1,
      name: 'Martelo de Thor',
    }
    before(async () => {
      sinon.stub(ProductModel, 'getById').resolves(payload);
    })
    after(async () => {
      ProductModel.getById.restore();
    })
    it('deve retonar um array', async () => {
      const response = await ProductService.getById();
      expect(response).to.be.an('object');
    })
    it('retorna nao vazio', async () => {
      const response = await ProductService.getById();
      expect(response).to.not.be.empty;
    })
    it('retorna com propriedades "id" e "name"', async () => {
      const response = await ProductService.getById();
      expect(response).includes.all.keys('id', 'name');
      expect(response).to.be.equal(payload)
    })
  })
})

