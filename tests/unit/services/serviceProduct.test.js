const { expect } = require('chai');
const sinon = require('sinon');
const ModelProduct = require('../../../models/ModelProduct');
const ServiceProduct = require('../../../services/ServiceProduct');

describe('Service - Ao testar a funcao getAll', () => {
  describe('quando a funcao esta invalida', () => {
    before(async () => {
      sinon.stub(ModelProduct, 'getAll').resolves(null);
    })
    after(async () => {
      ModelProduct.getAll.restore();
    })
  
    it('deve retonar com chaves "code" e "message"', async () => {
      const response = await ServiceProduct.getAll();
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
      sinon.stub(ModelProduct, 'getAll').resolves(payload);
    })
    after(async () => {
      ModelProduct.getAll.restore();
    })
    it('deve retonar um array', async () => {
      const response = await ServiceProduct.getAll();
      expect(response).to.be.an('array');
    })
    it('retorna nao vazio', async () => {
      const response = await ServiceProduct.getAll();
      expect(response).to.not.be.empty;
    }) 
    it('retorna com propriedades "id" e "name"', async () => {
      const response = await ServiceProduct.getAll();
      expect(response[0]).includes.all.keys('id', 'name');
      expect(response[0]).to.be.equal(payload[0])
    })
  })
})
describe('Ao testar a funcao getById', () => {
  describe('quando a funcao esta invalida', () => {
    before(async () => {
      sinon.stub(ModelProduct, 'getById').resolves(null);
    })
    after(async () => {
      ModelProduct.getById.restore();
    })
  
    it('deve retonar com chaves "id" e "name"', async () => {
      const response = await ServiceProduct.getById();
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
      sinon.stub(ModelProduct, 'getById').resolves(payload);
    })
    after(async () => {
      ModelProduct.getById.restore();
    })
    it('deve retonar um array', async () => {
      const response = await ServiceProduct.getById();
      expect(response).to.be.an('object');
    })
    it('retorna nao vazio', async () => {
      const response = await ServiceProduct.getById();
      expect(response).to.not.be.empty;
    })
    it('retorna com propriedades "id" e "name"', async () => {
      const response = await ServiceProduct.getById();
      expect(response).includes.all.keys('id', 'name');
      expect(response).to.be.equal(payload)
    })
  })
})
describe('Service-Ao testar a funcao create', () => {
  describe('quando a funcao esta invalida', () => {
    describe('quando o "name" esta vazio', () => { 
      const payload = undefined;
      it('retorna um objeto', async () => {
      const response = await ServiceProduct.create(payload);
        expect(response).to.be.an('object');
        expect(response.error).includes.all.keys('code', 'message');
        expect(response.error.code).to.be.equal(400);
        expect(response.error.message).to.be.equal('"name" is required');
    });
    })
    describe('quando o name tem menos de 5 letras', () => {
      const payload = 'abc';
       it('retorna um objeto', async () => {
      const response = await ServiceProduct.create(payload);
        expect(response).to.be.an('object');
        expect(response.error).includes.all.keys('code', 'message');
        expect(response.error.code).to.be.equal(422);
        expect(response.error.message).to.be.equal('"name" length must be at least 5 characters long');
    });
     })
  })
  describe('quando a funcao esta valida', () => {
    const payload = {
      id:1,
      name: 'O mundo fantastico de Guilherme',
    }
    before(async () => {
      sinon.stub(ModelProduct, 'create').resolves(payload);
    })
    after(async () => {
      ModelProduct.create.restore();
    })
    it('deve retonar um objeto que possua chaves id e name', async () => {
      const response = await ServiceProduct.create('O mundo fantastico de Guilherme');
      expect(response).to.be.an('object');
      expect(response).includes.all.keys('id', 'name');
    })
     })
   })

