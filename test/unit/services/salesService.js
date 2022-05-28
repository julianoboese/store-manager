const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const SalesModel = require('../../../models/SalesModel')
const SalesService = require('../../../services/SalesService')

chai.use(chaiAsPromised);
const expect = chai.expect;
const should = chai.should();

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

describe('The getSale Service function', () => {

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

    const id = 1;
  
    before(() => {
      sinon.stub(SalesModel, 'getSale').resolves(saleData);
    })
  
    after(() => {
      SalesModel.getSale.restore();
    });
  
    it('returns an array', async () => {
      const sale = await SalesService.getSale(id);
  
      expect(sale).to.be.an('array');
      expect(Object.keys(sale[0])).to.have.lengthOf(3);
      expect(sale[0]).to.have.property('date').that.is.a('string');
      expect(sale[0]).to.have.property('productId').that.is.a('number');
      expect(sale[0]).to.have.property('quantity').that.is.a('number');
    })
  
    it('returns the sale with the selected id', async () => {
      const sale = await SalesService.getSale(id);
  
      expect(sale).to.equal(saleData)
    })
  })

  describe('when there is no sale with the selected id', () => {
    const saleData = [];

    const id = 4;
  
    before(() => {
      sinon.stub(SalesModel, 'getSale').resolves(saleData);
    })
  
    after(() => {
      SalesModel.getSale.restore();
    });
  
    it('throws a "Sale not found" error', async () => {
      await SalesService.getSale(id).should.be.rejectedWith('Sale not found');
    })
  })
})