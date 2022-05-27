const { expect } = require("chai");
const sinon = require('sinon');
const ProductsModel = require('../../../models/ProductsModel')
const ProductsService = require('../../../services/ProductsService')

describe('The getProducts Service function', () => {
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

  before(() => {
    sinon.stub(ProductsModel, 'getProducts').resolves(productsData);
  })

  after(() => {
    ProductsModel.getProducts.restore();
  });

  it('returns an array', async () => {
    const products = await ProductsService.getProducts();

    expect(products).to.be.an('array')
  })

  it('returns all products', async () => {
    const products = await ProductsService.getProducts();

    expect(products).to.equal(productsData)
  })
})
