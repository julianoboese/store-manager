const { expect } = require("chai");
const sinon = require('sinon');
const ProductsModel = require('../../../models/ProductsModel')

const ProductsService = {
  getProducts: () => {}
}

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

describe('The getProducts Service function', () => {
  before(async () => {
    sinon.stub(ProductsModel, 'getProducts').resolves(productsData);
  })

  after(async () => {
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
