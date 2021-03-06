const { expect } = require("chai");
const sinon = require('sinon');
const connection = require("../../../db/connection");
const SalesModel = require('../../../models/SalesModel')

describe('The getSales Model function', () => {
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

    expect(sales).to.be.an('array');
  })

  it('returns all sales', async () => {
    const sales = await SalesModel.getSales();

    expect(sales).to.equal(salesData[0]);
  })
})

describe('The getSale Model function', () => {

  describe('when there is a sale with the selected id', () => {
    const saleData = [[
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
    ]];
  
    const id = 1;
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(saleData);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('returns an object', async () => {
      const sale = await SalesModel.getSale(id);
  
      expect(sale).to.be.an('array');
      expect(Object.keys(sale[0])).to.have.lengthOf(3);
      expect(sale[0]).to.have.property('date').that.is.a('string');
      expect(sale[0]).to.have.property('productId').that.is.a('number');
      expect(sale[0]).to.have.property('quantity').that.is.a('number');
    })
  
    it('returns the sale with the selected id', async () => {
      const sale = await SalesModel.getSale(id);
  
      expect(sale).to.equal(saleData[0]);
    })
  })

  describe('when there is no sale with the selected id', () => {
    const saleData = [[]];
  
    const id = 4;
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(saleData);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('returns an empty array', async () => {
      const sale = await SalesModel.getSale(id);
  
      expect(sale).to.be.an('array').that.is.empty;
    })
  })
})

describe('The postSaleProduct Model function', () => {
  const id = 4;
  const newSaleProductData = {
    productId: 1,
    quantity: 3
  };

  before(() => {
    sinon.stub(connection, 'execute').resolves();
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns undefined', async () => {
    const newSaleProduct = await SalesModel.postSaleProduct(id, newSaleProductData);

    expect(newSaleProduct).to.be.undefined;
  })
})

describe('The postSale Model function', () => {
  const newId = [{ insertId: 4 }];

  before(() => {
    sinon.stub(connection, 'execute').resolves(newId);
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns an object', async () => {
    const newIdObject = await SalesModel.postSale();

    expect(newIdObject).to.be.an('object');
    expect(Object.keys(newIdObject)).to.have.lengthOf(1);
    expect(newIdObject).to.have.property('id').that.is.a('number');
  })

  it('returns the new id', async () => {
    const newIdObject = await SalesModel.postSale();

    expect(newIdObject.id).to.equal(newId[0].insertId);
  })
})

describe('The putSale Model function', () => {
  const affectedRowsObject = [{ affectedRows: 1 }] ;

  const updatedSaleData = {
    id: 1,
    productId: 1,
    quantity: 40
  }

  before(() => {
    sinon.stub(connection, 'execute').resolves(affectedRowsObject);
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns an object', async () => {
    const updateAffectedRows = await SalesModel.putSale(updatedSaleData);

    expect(updateAffectedRows).to.be.an('object');
    expect(Object.keys(updateAffectedRows)).to.have.lengthOf(1);
    expect(updateAffectedRows).to.have.property('affectedRows').that.is.a('number');
  })

  it('affects one row', async () => {
    const updateAffectedRows = await SalesModel.putSale(updatedSaleData);

    expect(updateAffectedRows).to.deep.equal(affectedRowsObject[0])
  })
})

describe('The deleteSaleProduct Model function', () => {
  const id = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves();
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns undefined', async () => {
    const newSaleProduct = await SalesModel.deleteSaleProduct(id);

    expect(newSaleProduct).to.be.undefined;
  })
})

describe('The deleteSale Model function', () => {
  const affectedRowsObject = [{ affectedRows: 1 }];

  const id = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves(affectedRowsObject);
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns an object', async () => {
    const deleteAffectedRows = await SalesModel.deleteSale(id);

    expect(deleteAffectedRows).to.be.an('object');
    expect(Object.keys(deleteAffectedRows)).to.have.lengthOf(1);
    expect(deleteAffectedRows).to.have.property('affectedRows').that.is.a('number');
  })

  it('affects one row', async () => {
    const deleteAffectedRows = await SalesModel.deleteSale(id);

    expect(deleteAffectedRows).to.deep.equal(affectedRowsObject[0])
  })
})
