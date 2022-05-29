const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const connection = require("../../../db/connection");
const ProductsModel = require('../../../models/ProductsModel')

chai.use(sinonChai);
const expect = chai.expect;

describe('The getProducts Model function', () => {
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

  before(() => {
    sinon.stub(connection, 'execute').resolves(productsData);
  })

  after(() => {
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

describe('The getProduct Model function', () => {

  describe('when there is a product with the selected id', () => {
    const productData = [[
      {
        id: 1,
        name: 'product A',
        quantity: 10
      },
    ]];
  
    const id = 1;
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(productData);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('returns an object', async () => {
      const product = await ProductsModel.getProduct(id);
  
      expect(product).to.be.an('object');
      expect(Object.keys(product)).to.have.lengthOf(3);
      expect(product).to.have.property('id').that.is.a('number');
      expect(product).to.have.property('name').that.is.a('string');
      expect(product).to.have.property('quantity').that.is.a('number');
    })
  
    it('returns the product with the selected id', async () => {
      const product = await ProductsModel.getProduct(id);
  
      expect(product).to.equal(productData[0][0])
    })
  })

  describe('when there is no product with the selected id', () => {
    const productData = [[]];
  
    const id = 4;
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(productData);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('returns undefined', async () => {
      const product = await ProductsModel.getProduct(id);
  
      expect(product).to.be.undefined;
    })
  })
})

describe('The getProductByName Model function', () => {

  describe('when there is no product with the same name on database', () => {
    const productData = [[]];
  
    const name = 'product D';
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(productData);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('returns undefined', async () => {
      const product = await ProductsModel.getProductByName(name);
  
      expect(product).to.be.undefined;
    })
  })

  describe('when there is already a product with the same name on database', () => {
    const productData = [[
      {
        id: 1,
        name: 'product A',
        quantity: 10
      },
    ]];
  
    const name = 'product A';
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(productData);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('returns an object', async () => {
      const product = await ProductsModel.getProductByName(name);
  
      expect(product).to.be.an('object');
      expect(Object.keys(product)).to.have.lengthOf(3);
      expect(product).to.have.property('id').that.is.a('number');
      expect(product).to.have.property('name').that.is.a('string');
      expect(product).to.have.property('quantity').that.is.a('number');
    })

    it('returns the product with the selected name', async () => {
      const product = await ProductsModel.getProductByName(name);
  
      expect(product).to.equal(productData[0][0])
    })
  })
})

describe('The postProduct Model function', () => {
  const newId = [{ insertId: 4 }];

  const newProductData = {
    name: 'product D',
    quantity: 30
  }

  before(() => {
    sinon.stub(connection, 'execute').resolves(newId);
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns an object', async () => {
    const newIdObject = await ProductsModel.postProduct(newProductData);

    expect(newIdObject).to.be.an('object');
    expect(Object.keys(newIdObject)).to.have.lengthOf(1);
    expect(newIdObject).to.have.property('id').that.is.a('number');
  })

  it('returns the new id', async () => {
    const newIdObject = await ProductsModel.postProduct(newProductData);

    expect(newIdObject.id).to.equal(newId[0].insertId);
  })
})

describe('The putProduct Model function', () => {
  const affectedRowsObject = [{ affectedRows: 1 }] ;

  const updatedProductData = {
    id: 1,
    name: 'product E',
    quantity: 40
  }

  before(() => {
    sinon.stub(connection, 'execute').resolves(affectedRowsObject);
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns an object', async () => {
    const updateAffectedRows = await ProductsModel.putProduct(updatedProductData);

    expect(updateAffectedRows).to.be.an('object');
    expect(Object.keys(updateAffectedRows)).to.have.lengthOf(1);
    expect(updateAffectedRows).to.have.property('affectedRows').that.is.a('number');
  })

  it('affects one row', async () => {
    const updateAffectedRows = await ProductsModel.putProduct(updatedProductData);

    expect(updateAffectedRows).to.deep.equal(affectedRowsObject[0])
  })
})

describe('The deleteProduct Model function', () => {
  const affectedRowsObject = [{ affectedRows: 1 }] ;

  const id = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves(affectedRowsObject);
  })

  after(() => {
    connection.execute.restore();
  });

  it('returns an object', async () => {
    const updateAffectedRows = await ProductsModel.deleteProduct(id);

    expect(updateAffectedRows).to.be.an('object');
    expect(Object.keys(updateAffectedRows)).to.have.lengthOf(1);
    expect(updateAffectedRows).to.have.property('affectedRows').that.is.a('number');
  })

  it('affects one row', async () => {
    const updateAffectedRows = await ProductsModel.deleteProduct(id);

    expect(updateAffectedRows).to.deep.equal(affectedRowsObject[0])
  })
})