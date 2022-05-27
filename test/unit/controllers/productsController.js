const { expect } = require("chai");
const sinon = require('sinon');
const ProductsService = require('../../../services/ProductsService')
const ProductsController = require('../../../controllers/ProductsController');

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
