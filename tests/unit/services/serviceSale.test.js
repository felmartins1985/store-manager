 const { expect } = require('chai');
const sinon = require('sinon');
const ModelSale = require('../../../models/ModelSale');
const ServiceSale = require('../../../services/ServiceSale');

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
      const response = await ServiceSale.createSaleProduct([{ productId: 1, quantity: -1 }]);
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(422);
      expect(response.error.message).to.be.equal('"quantity" must be greater than or equal to 1');
    })
    it('a quantidade nao informada', async () => {
      const response = await ServiceSale.createSaleProduct([{ productId: 1 }])
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(400);
      expect(response.error.message).to.be.equal('"quantity" is required');
    })
    it('o produto nao informado', async () => {
      const response = await ServiceSale.createSaleProduct([{ quantity: 1 }])
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(400);
      expect(response.error.message).to.be.equal('"productId" is required');
    })
    it('o Id do produto nao existe', async () => {
      const response = await ServiceSale.createSaleProduct([{ productId: 9999, quantity: 1 }])
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
      sinon.stub(ModelSale, 'createIdSale').resolves({ id: 2 })
      sinon.stub(ModelSale, 'createSaleProduct').resolves([]);
    })
    after(async () => {
      ModelProduct.getById.restore();
      ModelSale.createIdSale.restore();
      ModelSale.createSaleProduct.restore();
    })
    it('retorna um objeto com id, productId e quantity', async () => {
      const response = await ServiceSale.createSaleProduct([{ productId: 1, quantity: 1 }]);
      expect(response).to.be.an('object');
      expect(response).includes.all.keys('id', 'itemsSold');
    })
  })
});
//
describe('Service - Ao testar a funcao getAll', () => {
  describe('quando a funcao esta valida', () => {
    const payload = [
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
    ];
    before(async () => {
      sinon.stub(ModelSale, 'getAll').resolves(payload);
    })
    after(async () => {
      ModelSale.getAll.restore();
    })
    it('deve retonar um array', async () => {
      const response = await ServiceSale.getAll();
      expect(response).to.be.an('array');
    })
    it('retorna nao vazio', async () => {
      const response = await ServiceSale.getAll();
      expect(response).to.not.be.empty;
    }) 
    it('retorna com propriedades "saleId","date", "productId","quantity"', async () => {
      const response = await ServiceSale.getAll();
      expect(response[0]).includes.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(response[0]).to.be.equal(payload[0])
    })
  })
})
describe('Ao testar a funcao getById', () => {
  describe('quando a funcao esta invalida', () => {
    before(async () => {
      sinon.stub(ModelSale, 'getById').resolves(null);
    })
    after(async () => {
      ModelSale.getById.restore();
    })
  
    it('deve retonar com chaves "code" e "message"', async () => {
      const response = await ServiceSale.getById();
      expect(response).to.be.an('object');
      expect(response.error).includes.all.keys('code', 'message');
      expect(response.error.code).to.be.equal(404);
      expect(response.error.message).to.be.equal('Sale not found');
    })
  })
  describe('quando a funcao esta valida', () => {
    const payload =  [
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
    before(async () => {
      sinon.stub(ModelSale, 'getById').resolves(payload);
    })
    after(async () => {
      ModelSale.getById.restore();
    })
    it('deve retonar um array', async () => {
      const response = await ServiceSale.getById(1);
      expect(response).to.be.an('array');
    })
    it('retorna nao vazio', async () => {
      const response = await ServiceSale.getById(1);
      expect(response).to.not.be.empty;
    })
    it('retorna com propriedades "date","productID","quantity"', async () => {
      const response = await ServiceSale.getById(1);
      expect(response[0]).includes.all.keys('date', 'productId', 'quantity');
      expect(response).to.be.equal(payload)
    })
  })
})