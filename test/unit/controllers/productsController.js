const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const ProductsService = require('../../../services/ProductsService')
const ProductsController = require('../../../controllers/ProductsController');
const createError = require("http-errors");

chai.use(sinonChai);
const expect = chai.expect;

describe('The getProducts Controller function', () => {
  const productsData = [
    {
      id: 1,
      name: 'product A',
      quantity: 10
    },
    {
      id: 2,
      name: 'product B',
      quantity: 20
    }
  ];

  const request = {};
  const response = {};

  before(() => {
    sinon.stub(ProductsService, 'getProducts').resolves(productsData);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  })

  after(() => {
    ProductsService.getProducts.restore();
  });

  it('responds with the status code 200', async () => {
    await ProductsController.getProducts(request, response);

    expect(response.status).to.have.been.calledOnce;
    expect(response.status).to.have.been.calledWith(200);
  })

  it('responds with all products', async () => {
    await ProductsController.getProducts(request, response);

    expect(response.json).to.have.been.calledTwice;
    expect(response.json).to.have.been.calledWith(sinon.match.array);
    expect(response.json).to.have.been.calledWith(productsData);
  })
})

describe('The getProduct Controller function', () => {

  describe('when there is a product with the selected id', () => {
    const productData = {
      id: 1,
      name: 'product A',
      quantity: 10
    }

    const request = { params: { id: 1 }};
    const response = {};
  
    before(() => {
      sinon.stub(ProductsService, 'getProduct').resolves(productData);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    after(() => {
      ProductsService.getProduct.restore();
    });
  
    it('responds with the status code 200', async () => {
      await ProductsController.getProduct(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(200);
    })
  
    it('responds with with the selected product', async () => {
      await ProductsController.getProduct(request, response);

      expect(response.json).to.have.been.calledTwice;
      expect(response.json).to.have.been.calledWith(sinon.match.object);
      expect(response.json).to.have.been.calledWith(productData);
    })
  })

  describe('when there is no product with the selected id', () => {
    const error = new createError.NotFound('Product not found');
    const errorMessage = { message: error.message };

    const request = { params: { id: 1 }};
    const response = {};

    before(() => {
      sinon.stub(ProductsService, 'getProduct').rejects(error);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    after(() => {
      ProductsService.getProduct.restore();
    });
  
    it('responds with the status code 404', async () => {
      await ProductsController.getProduct(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(404);
    })
  
    it('responds with an error message "Product not found"', async () => {
      await ProductsController.getProduct(request, response);

      expect(response.json).to.have.been.calledTwice;
      expect(response.json).to.have.been.calledWith(sinon.match.object);
      expect(response.json).to.have.been.calledWith(errorMessage);
    })
  })
})
