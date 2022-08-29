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
describe('Controller-Ao testar a funcao create', () => {
  describe('quando a funcao nao funciona', () => {
    describe('quando o nome do produto nao esta preenchido', () => {
      const response = {};
      const request = {};
      let next = () => { };
      before(async () => {
        request.body = {};
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        next = sinon.stub().returns();
        sinon.stub(ServiceProduct, 'create').resolves({
          error: {
            code: 400,
            message: '"name" is required',
          },
        })
      })
      after(() => {
        ServiceProduct.create.restore();
      })
      it('quando e chamado o codigo 400', async () => {
        await ControllerProduct.create(request, response, next);
        expect(response.status.calledWith(400)).to.be.equal(true);
        expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
      })
    })
    describe('quando o nome do produto tem menos de 5 caracter', () => {
      const response = {};
      const request = {};
      let next = () => { };
      before(async () => {
        request.body = { name: 'abc' };
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        next = sinon.stub().returns();
        sinon.stub(ServiceProduct, 'create').resolves({
          error: {
            code: 422,
            message: '"name" length must be at least 5 characters long',
          },
        })
      })
      after(() => {
        ServiceProduct.create.restore();
      })
      it('quando e chamado o codigo 400', async () => {
        await ControllerProduct.create(request, response, next);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
      })
    })
  })
  describe('quando a funcao funciona', () => {
    const response = {};
    const request = {};
    let next = () => { };
    before(async () => {
      request.body = { name: 'O mundo fantastico de Guilherme' }
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub().returns();
      sinon.stub(ServiceProduct, 'create').resolves({
        id: 1,
        name: 'O mundo fantastico de Guilherme',
      })
    })
    after(async () => {
      ServiceProduct.create.restore();
    })
    it('quando e chamado o codigo 201', async () => {
      await ControllerProduct.create(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith({ id: 1, name: 'O mundo fantastico de Guilherme' })).to.be.equal(true);
    })
  })
})
//
describe("Controllers- Atualizando um produto pelo id 'Controllers'", () => {
  describe("quando o produto nao existe", async () => {
    const req = {};
    const res = {};
    before(() => {
      req.params = { id: 1 };
      req.body = { name: "Joia do infinito" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(ServiceProduct, "putProductById")
        .resolves({ code: 404, message: "Product not found" });
    });
    after(() => {
      ServiceProduct.putProductById.restore();
    });

    it("deve retornar null", async () => {
      await ControllerProduct.putProductById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(
        true
      );
    });
  });

  describe("quando é atualizado com sucesso", async () => {
    const products = {
      id: 1,
      name: "Joia do infinito",
    };
    const req = {};
    const res = {};
    before(() => {
      req.params = { id: 1 };
      req.body = { name: "Joia do infinito" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ServiceProduct, "putProductById").resolves(products);
    });
    after(() => {
      ServiceProduct.putProductById.restore();
    });

    it("Retorna um produto atualizado", async () => {
      await ControllerProduct.putProductById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(products)).to.be.equal(true);
    });
  });
});