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
    expect(response.json).to.have.been.calledWith(sinon.match.array);
    expect(response.json).to.have.been.calledWith(salesData);
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

    const request = { params: { id: 4 }};
    const response = {};
    const next = sinon.spy();

    before(() => {
      sinon.stub(SalesService, 'getSale').rejects(error);
    })
  
    after(() => {
      SalesService.getSale.restore();
    });
  
    it('responds with an error message "Sale not found"', async () => {
      await SalesController.getSale(request, response, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(error);
    })
  })
})

describe('The postSale Controller function', () => {
  const newSaleData = {
    id: 4,
    itemsSold: [
      {
        productId: 1,
        quantity: 2
      },
      {
        productId: 2,
        quantity: 5
      }
    ]
  };

  const request = {};
  const response = {};

  before(() => {
    sinon.stub(SalesService, 'postSale').resolves(newSaleData);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  })

  after(() => {
    SalesService.postSale.restore();
  });

  it('responds with the status code 201', async () => {
    await SalesController.postSale(request, response);

    expect(response.status).to.have.been.calledOnce;
    expect(response.status).to.have.been.calledWith(201);
  })

  it('responds with all sales', async () => {
    await SalesController.postSale(request, response);

    expect(response.json).to.have.been.calledTwice;
    expect(response.json).to.have.been.calledWith(sinon.match.object);
    expect(response.json).to.have.been.calledWith(newSaleData);
  })
})
