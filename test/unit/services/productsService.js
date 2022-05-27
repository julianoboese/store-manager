const chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const ProductsModel = require('../../../models/ProductsModel')
const ProductsService = require('../../../services/ProductsService')

chai.use(chaiAsPromised);
const expect = chai.expect;
const should = chai.should();

describe('The getProducts Service function', () => {
  const productsData = [
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
  ];

  before(() => {
    sinon.stub(ProductsModel, 'getProducts').resolves(productsData);
  })

  after(() => {
    ProductsModel.getProducts.restore();
  });

  it('returns an array', async () => {
    const products = await ProductsService.getProducts();

    expect(products).to.be.an('array')
  })

  it('returns all products', async () => {
    const products = await ProductsService.getProducts();

    expect(products).to.equal(productsData)
  })
})

describe('The getProduct Service function', () => {

  describe('when there is a product with the selected id', () => {
    const productData = {
      id: 1,
      name: 'product A',
      quantity: 10
    }

    const id = 1;
  
    before(() => {
      sinon.stub(ProductsModel, 'getProduct').resolves(productData);
    })
  
    after(() => {
      ProductsModel.getProduct.restore();
    });
  
    it('returns an object', async () => {
      const product = await ProductsService.getProduct(id);
  
      expect(product).to.be.an('object');
      expect(Object.keys(product)).to.have.lengthOf(3);
      expect(product).to.have.property('id').that.is.a('number');
      expect(product).to.have.property('name').that.is.a('string');
      expect(product).to.have.property('quantity').that.is.a('number');
    })
  
    it('returns the product with the selected id', async () => {
      const product = await ProductsService.getProduct(id);
  
      expect(product).to.equal(productData)
    })
  })

  describe('when there is no product with the selected id', () => {
    const productData = undefined;

    const id = 4;
  
    before(() => {
      sinon.stub(ProductsModel, 'getProduct').resolves(productData);
    })
  
    after(() => {
      ProductsModel.getProduct.restore();
    });
  
    it('throws a "Product not found" error', async () => {
      await ProductsService.getProduct(id).should.be.rejectedWith('Product not found');
    })
  })
})
