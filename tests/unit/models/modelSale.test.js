 const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ModelSale = require('../../../models/ModelSale');

describe('Model- ao testar a funcao createID', () => {
  describe('Ocorre sucesso', () => {
    before(async () => {
      sinon.stub(connection,'query').resolves([{ insertId: 1 }])
      0
    })
    after(async () => {
      connection.query.restore();
    })
    it('tem a propriedade id e e um objeto', async () => { 
      const response = await ModelSale.createIdSale();
      expect(response).to.have.property('id');
      expect(response).to.be.an('object');
    })
  })
})
describe('Model- Ao testar a funcao createSaleProduct', () => {
  describe('Ocorre sucesso', () => {
    before(async () => {
      sinon.stub(connection,'query').resolves([])
    })
    after(async () => { 
      connection.query.restore();
    })
    it("retorna um array", async () => {
    const response = await ModelSale.createSaleProduct(1, {
      productId: 1,
      quantity: 1,
    });
    expect(response).to.be.an('array');
    });
   })
})
 //
 describe('Model- Ao testar a funcao GetAll', () => {
  describe('Quando a funcao esta invalida', () => {
      before(async () => {
      const query = [[]]
      sinon.stub(connection, 'query').resolves(query);
      })
      after(() => {
      connection.query.restore();
      })
      it('deve retornar null', async () => {
      const response = await ModelSale.getAll();
      expect(response).to.be.equal(null);
      })
  
  })
   describe('Quando a funcao esta valida', () => {
      const payload = [ [
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
  ]]
      before(async () => { 
        sinon.stub(connection,'query').resolves(payload);
      })
      after(async () => {
        connection.query.restore();
      })
      it('deve retornar um array', async () => {
        const response = await ModelSale.getAll();
        expect(response).to.be.an('array');
      })
      it('retorna nao vazio', async () => { 
        const response = await ModelSale.getAll();
        expect(response).to.not.be.empty;
      })
      it('retorna com propriedades "saleId","date","productId", e "quantity"', async () => {
        const response = await ModelSale.getAll();
        expect(response[0]).includes.all.keys('saleId','date','productId','quantity');
      })
    })
  })

describe('Ao testar a funcao GetById', () => {
  describe('Quando a funcao esta invalida', () => {
    before(async () => {
      const query = [[]]
      sinon.stub(connection, 'query').resolves(query);
    })
    after(() => {
      connection.query.restore();
    })
    it('deve retornar null', async () => {
      const response = await ModelSale.getById();
      expect(response).to.be.equal(null);
    })
  })
  describe('Quando a funcao esta valida', () => {
    const payload = [[
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
  ]]
     before(async () => { 
        sinon.stub(connection,'query').resolves(payload);
      })
      after(async () => {
        connection.query.restore();
      })
       it('deve retornar um objeto', async () => {
        const response = await ModelSale.getById(1);
        expect(response).to.be.an('array');
      })
      it('retorna nao vazio', async () => { 
        const response = await ModelSale.getById(1);
        expect(response).to.not.be.empty;
      })
      it('retorna com propriedades "date","productId e "quantity"', async () => {
        const response = await ModelSale.getById(1);
        expect(response[0]).includes.all.keys('date','productId','quantity');
      })
  })
})