const { expect } = require("chai");
const sinon = require('sinon');
const connection = require("../../../db/connection");
const ProductsModel = require('../../../models/ProductsModel')

const productsData = [[
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
]];

describe('The getProducts Model function', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(productsData);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('returns an array', async () => {
    const products = await ProductsModel.getProducts();

    expect(products).to.be.an('array')
  })

  it('returns all products', async () => {
    const products = await ProductsModel.getProducts();

    expect(products).to.equal(productsData[0])
  })
})
