const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');

chai.use(sinonChai);
const expect = chai.expect;

describe('The getSales Controller function', () => {
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

  const request = {};
  const response = {};

  before(() => {
    sinon.stub(SalesService, 'getSales').resolves(salesData);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  })

  after(() => {
    SalesService.getSales.restore();
  });

  it('responds with the status code 200', async () => {
    await SalesController.getSales(request, response);

    expect(response.status).to.have.been.calledOnce;
    expect(response.status).to.have.been.calledWith(200);
  })

  it('responds with all sales', async () => {
    await SalesController.getSales(request, response);

    expect(response.json).to.have.been.calledTwice;
    expect(response.json).to.have.been.calledWith(salesData);
    expect(response.json.calledWith(sinon.match.array)).to.be.true;
  })
})