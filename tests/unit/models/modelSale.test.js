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