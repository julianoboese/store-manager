const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');
const createError = require("http-errors");

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

describe('The getSale Controller function', () => {

  describe('when there is a sale with the selected id', () => {
    const saleData = [
      {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2
      },
      {
        date: '2021-09-09T04:54:54.000Z',
        productId: 2,
        quantity: 2
      }
    ]

    const request = { params: { id: 1 }};
    const response = {};
  
    before(() => {
      sinon.stub(SalesService, 'getSale').resolves(saleData);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    after(() => {
      SalesService.getSale.restore();
    });
  
    it('responds with the status code 200', async () => {
      await SalesController.getSale(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(200);
    })
  
    it('responds with with the selected sale', async () => {
      await SalesController.getSale(request, response);

      expect(response.json).to.have.been.calledTwice;
      expect(response.json).to.have.been.calledWith(sinon.match.array);
      expect(response.json).to.have.been.calledWith(saleData);
    })
  })

  describe('when there is no sale with the selected id', () => {
    const error = new createError.NotFound('Sale not found');
    const errorMessage = { message: error.message };

    const request = { params: { id: 4 }};
    const response = {};

    before(() => {
      sinon.stub(SalesService, 'getSale').rejects(error);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    after(() => {
      SalesService.getSale.restore();
    });
  
    it('responds with the status code 404', async () => {
      await SalesController.getSale(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(404);
    })
  
    it('responds with an error message "Sale not found"', async () => {
      await SalesController.getSale(request, response);

      expect(response.json).to.have.been.calledTwice;
      expect(response.json).to.have.been.calledWith(sinon.match.object);
      expect(response.json).to.have.been.calledWith(errorMessage);
    })
  })
})
