const { expect } = require("chai");
const sinon = require('sinon');
const ProductsService = require('../../../services/ProductsService')
const ProductsController = require('../../../controllers/ProductsController');
const createError = require("http-errors");

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

    expect(response.status.calledOnce).to.be.true;
    expect(response.status.calledWith(200)).to.be.true;
  })

  it('responds with all products', async () => {
    await ProductsController.getProducts(request, response);

    expect(response.json.calledTwice).to.be.true;
    expect(response.json.calledWith(sinon.match.array)).to.be.true;
    expect(response.json.calledWith(productsData)).to.be.true;
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
  
      expect(response.status.calledOnce).to.be.true;
      expect(response.status.calledWith(200)).to.be.true;
    })
  
    it('responds with with the selected product', async () => {
      await ProductsController.getProduct(request, response);

      expect(response.json.calledTwice).to.be.true;
      expect(response.json.calledWith(sinon.match.object)).to.be.true;
      expect(response.json.calledWith(productData)).to.be.true;
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
  
      expect(response.status.calledOnce).to.be.true;
      expect(response.status.calledWith(404)).to.be.true;
    })
  
    it('responds with an error message "Product not found"', async () => {
      await ProductsController.getProduct(request, response);

      expect(response.json.calledTwice).to.be.true;
      expect(response.json.calledWith(sinon.match.object)).to.be.true;
      expect(response.json.calledWith(errorMessage)).to.be.true;
    })
  })
})
