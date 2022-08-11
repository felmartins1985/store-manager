
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ModelProduct = require('../../../models/ModelProduct');

describe('Ao testar a funcao GetAll', () => {
  describe('Quando a funcao esta invalida', () => {
      before(async () => {
      const query = [[]]
      sinon.stub(connection, 'query').resolves(query);
      })
      after(() => {
      connection.query.restore();
      })
      it('deve retornar null', async () => {
      const response = await ModelProduct.getAll();
      expect(response).to.be.equal(null);
      })
 
  })
   describe('Quando a funcao esta valida', () => {
      const payload = [[{
        id: 1,
        name: 'Martelo de Thor',
      }]]
      before(async () => { 
        sinon.stub(connection,'query').resolves(payload);
      })
      after(async () => {
        connection.query.restore();
      })
      it('deve retornar um array', async () => {
        const response = await ModelProduct.getAll();
        console.log(response)
        expect(response).to.be.an('array');
      })
      it('retorna nao vazio', async () => { 
        const response = await ModelProduct.getAll();
        expect(response).to.not.be.empty;
      })
      it('retorna com propriedades "id" e "name"', async () => {
        const response = await ModelProduct.getAll();
        expect(response[0]).includes.all.keys('id','name');
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
      const response = await ModelProduct.getById();
      expect(response).to.be.equal(null);
    })
  })
  describe('Quando a funcao esta valida', () => {
    const payload = [[{
        id: 1,
        name: 'Martelo de Thor',
    }]]
     before(async () => { 
        sinon.stub(connection,'query').resolves(payload);
      })
      after(async () => {
        connection.query.restore();
      })
       it('deve retornar um objeto', async () => {
        const response = await ModelProduct.getById(1);
        console.log(response)
        expect(response).to.be.an('object');
      })
      it('retorna nao vazio', async () => { 
        const response = await ModelProduct.getById(1);
        expect(response).to.not.be.empty;
      })
      it('retorna com propriedades "id" e "name"', async () => {
        const response = await ModelProduct.getById(1);
        expect(response).includes.all.keys('id','name');
      })
  })
})