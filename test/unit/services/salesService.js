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

    expect(sales).to.be.an('array');
  })

  it('returns all sales', async () => {
    const sales = await SalesService.getSales();

    expect(sales).to.equal(salesData);
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
  
      expect(sale).to.equal(saleData);
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

describe('The postSale Service function', () => {
  const newIdObject = { id: 4 }

  const saleData = [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 5
    }
  ]

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

  before(() => {
    sinon.stub(SalesModel, 'postSale').resolves(newIdObject);
    sinon.stub(SalesModel, 'postSaleProduct').resolves();
  })

  after(() => {
    SalesModel.postSale.restore();
    SalesModel.postSaleProduct.restore();
  });

  it('returns an object', async () => {
    const newSale = await SalesService.postSale(saleData);

    expect(newSale).to.be.an('object');
    expect(Object.keys(newSale)).to.have.lengthOf(2);
    expect(newSale).to.have.property('id').that.is.a('number');
    expect(newSale).to.have.property('itemsSold').that.is.an('array');
  })

  it('returns the new sale', async () => {
    const newSale = await SalesService.postSale(saleData);

    expect(newSale).to.deep.equal(newSaleData)
  })
})

describe('The putSale Service function', () => {

  describe('when there is a sale with the selected id', () => {
    const sale = [
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

    const saleData = [
      {
        productId: 1,
        quantity: 6
      }
    ]

    const updatedSaleData = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 6
        }
      ]
    }

    before(() => {
      sinon.stub(SalesModel, 'getSale').resolves(sale);
      sinon.stub(SalesModel, 'putSale').resolves();
    })
  
    after(() => {
      SalesModel.getSale.restore();
      SalesModel.putSale.restore();
    });
  
    it('returns an object', async () => {
      const updatedSale = await SalesService.putSale({ id, saleData });
  
      expect(updatedSale).to.be.an('object');
      expect(Object.keys(updatedSale)).to.have.lengthOf(2);
      expect(updatedSale).to.have.property('saleId').that.is.a('number');
      expect(updatedSale).to.have.property('itemUpdated').that.is.an('array');
    })
  
    it('returns the updated data from the sale', async () => {
      const updatedSale = await SalesService.putSale({ id, saleData });
  
      expect(updatedSale).to.deep.equal(updatedSaleData);
    })
  })

  describe('when there is no sale with the selected id', () => {
    const sale = [];

    const id = 4;

    const saleData = [
      {
        productId: 1,
        quantity: 6
      }
    ]
  
    before(() => {
      sinon.stub(SalesModel, 'getSale').resolves(sale);
      sinon.stub(SalesModel, 'putSale').resolves();
    })
  
    after(() => {
      SalesModel.getSale.restore();
      SalesModel.putSale.restore();
    });
  
    it('throws a "Sale not found" error', async () => {
      await SalesService.putSale({ id, saleData }).should.be.rejectedWith('Sale not found');
    })
  })
})
