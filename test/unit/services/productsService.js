const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
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

describe('The postProduct Service function', () => {

  describe('when there is no product with the same name on database', () => {
    const productData = undefined;

    const newId = { id: 4 };

    const newProductData = {
      name: 'product D',
      quantity: 30
    }
  
    before(() => {
      sinon.stub(ProductsModel, 'getProductByName').resolves(productData);
      sinon.stub(ProductsModel, 'postProduct').resolves(newId);
    })
  
    after(() => {
      ProductsModel.getProductByName.restore();
      ProductsModel.postProduct.restore();
    });
  
    it('returns an object', async () => {
      const newProduct = await ProductsService.postProduct(newProductData);
  
      expect(newProduct).to.be.an('object');
      expect(Object.keys(newProduct)).to.have.lengthOf(3);
      expect(newProduct).to.have.property('id').that.is.a('number');
      expect(newProduct).to.have.property('name').that.is.a('string');
      expect(newProduct).to.have.property('quantity').that.is.a('number');
    })
  
    it('returns the product with the new id', async () => {
      const newProduct = await ProductsService.postProduct(newProductData);

      expect(newProduct).to.deep.equal({ ...newId, ...newProductData })
    })
  })

  describe('when there is already a product with the same name on database', () => {
    const productData = {
      id: 1,
      name: 'product A',
      quantity: 10
    }

    const newProductData = {
      name: 'product A',
      quantity: 10
    }
  
    before(() => {
      sinon.stub(ProductsModel, 'getProductByName').resolves(productData);
    })
  
    after(() => {
      ProductsModel.getProductByName.restore();
    });
  
    it('throws a "Product already exists" error', async () => {
      await ProductsService.postProduct(newProductData).should.be.rejectedWith('Product already exists');
    })
  })
})

describe('The putProduct Service function', () => {

  describe('when there is a product with the selected id', () => {
    const productData = {
      id: 1,
      name: 'product A',
      quantity: 10
    };

    const updatedProductData = {
      id: 1,
      name: 'product E',
      quantity: 40
    }
  
    before(() => {
      sinon.stub(ProductsModel, 'getProduct').resolves(productData);
      sinon.stub(ProductsModel, 'putProduct').resolves();
    })
  
    after(() => {
      ProductsModel.getProduct.restore();
      ProductsModel.putProduct.restore();
    });
  
    it('returns an object', async () => {
      const newProduct = await ProductsService.putProduct(updatedProductData);
  
      expect(newProduct).to.be.an('object');
      expect(Object.keys(newProduct)).to.have.lengthOf(3);
      expect(newProduct).to.have.property('id').that.is.a('number');
      expect(newProduct).to.have.property('name').that.is.a('string');
      expect(newProduct).to.have.property('quantity').that.is.a('number');
    })
  
    it('returns the product with the updated data', async () => {
      const updatedProduct = await ProductsService.putProduct(updatedProductData);

      expect(updatedProduct).to.deep.equal(updatedProductData);
    })
  })

  describe('when there is no product with the selected id', () => {
    const productData = undefined;

    const updatedProductData = {
      id: 1,
      name: 'product E',
      quantity: 40
    }
  
    before(() => {
      sinon.stub(ProductsModel, 'getProduct').resolves(productData);
    })
  
    after(() => {
      ProductsModel.getProduct.restore();
    });
  
    it('throws a "Product not found" error', async () => {
      await ProductsService.putProduct(updatedProductData).should.be.rejectedWith('Product not found');
    })
  })
})

describe('The deleteProduct Service function', () => {

  describe('when there is a product with the selected id', () => {
    const productData = {
      id: 1,
      name: 'product A',
      quantity: 10
    };

    const id = 1;
  
    before(() => {
      sinon.stub(ProductsModel, 'getProduct').resolves(productData);
      sinon.stub(ProductsModel, 'deleteProduct').resolves();
    })
  
    after(() => {
      ProductsModel.getProduct.restore();
      ProductsModel.deleteProduct.restore();
    });
  
    it('return undefined', async () => {
      const response = await ProductsService.deleteProduct(id);
  
      expect(response).to.be.undefined;
    })
  })
  
  describe('when there is no product with the selected id', () => {
    const productData = undefined;

    const id = 1;
  
    before(() => {
      sinon.stub(ProductsModel, 'getProduct').resolves(productData);
    })
  
    after(() => {
      ProductsModel.getProduct.restore();
    });
  
    it('throws a "Product not found" error', async () => {
      await ProductsService.deleteProduct(id).should.be.rejectedWith('Product not found');
    })
  })
})
