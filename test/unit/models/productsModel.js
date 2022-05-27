const { expect } = require("chai");
const sinon = require('sinon');
const connection = require("../../../db/connection");
const ProductsModel = require('../../../models/ProductsModel')

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
