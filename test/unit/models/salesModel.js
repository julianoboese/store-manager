const { expect } = require("chai");
const sinon = require('sinon');
const connection = require("../../../db/connection");
const SalesModel = require('../../../models/SalesModel')

describe('The getProducts Model function', () => {
  const salesData = [[
    {
      saleId: 1,
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2
    },
    {
      saleId: 1,
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 2
    }
  ]];

  before(() => {
    sinon.stub(connection, 'execute').resolves(salesData);
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns an array', async () => {
    const sales = await SalesModel.getSales();

    expect(sales).to.be.an('array')
  })

  it('returns all sales', async () => {
    const sales = await SalesModel.getSales();

    expect(sales).to.equal(salesData[0])
  })
})