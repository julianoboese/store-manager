const { expect } = require("chai");
const sinon = require('sinon');
const SalesModel = require('../../../models/SalesModel')
const SalesService = require('../../../services/SalesService')

describe('The getSales Service function', () => {
  const salesData = [
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
  ];

  before(() => {
    sinon.stub(SalesModel, 'getSales').resolves(salesData);
  })

  after(() => {
    SalesModel.getSales.restore();
  });

  it('returns an array', async () => {
    const sales = await SalesService.getSales();

    expect(sales).to.be.an('array')
  })

  it('returns all sales', async () => {
    const sales = await SalesService.getSales();

    expect(sales).to.equal(salesData)
  })
})
