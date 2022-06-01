const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const ProductsService = require('../../../services/ProductsService')
const ProductsController = require('../../../controllers/ProductsController');

chai.use(sinonChai);
const expect = chai.expect;

describe('The getProducts Controller function', () => {
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

  const request = {};
  const response = {};

  beforeEach(() => {
    sinon.stub(ProductsService, 'getProducts').resolves(productsData);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  })

  afterEach(() => {
    ProductsService.getProducts.restore();
  });

  it('responds with the status code 200', async () => {
    await ProductsController.getProducts(request, response);

    expect(response.status).to.have.been.calledOnce;
    expect(response.status).to.have.been.calledWith(200);
  })

  it('responds with all products', async () => {
    await ProductsController.getProducts(request, response);

    expect(response.json).to.have.been.calledOnce;
    expect(response.json).to.have.been.calledWith(sinon.match.array);
    expect(response.json).to.have.been.calledWith(productsData);
  })
})

describe('The getProduct Controller function', () => {

  describe('when there is a product with the selected id', () => {
    const productData = {
      id: 1,
      name: 'product A',
      quantity: 10
    }

    const request = { params: { id: 1 }};
    const response = {};
  
    beforeEach(() => {
      sinon.stub(ProductsService, 'getProduct').resolves(productData);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    afterEach(() => {
      ProductsService.getProduct.restore();
    });
  
    it('responds with the status code 200', async () => {
      await ProductsController.getProduct(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(200);
    })
  
    it('responds with with the selected product', async () => {
      await ProductsController.getProduct(request, response);

      expect(response.json).to.have.been.calledOnce;
      expect(response.json).to.have.been.calledWith(sinon.match.object);
      expect(response.json).to.have.been.calledWith(productData);
    })
  })
})

describe('The postProduct Controller function', () => {

  describe('when there is no product with the same name on database', () => {
    const newProductData = {
      id: 4,
      name: 'product D',
      quantity: 30
    }

    const request = {};
    const response = {};
  
    beforeEach(() => {
      sinon.stub(ProductsService, 'postProduct').resolves(newProductData);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    afterEach(() => {
      ProductsService.postProduct.restore();
    });
  
    it('responds with the status code 201', async () => {
      await ProductsController.postProduct(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(201);
    })
  
    it('responds with with the new product', async () => {
      await ProductsController.postProduct(request, response);

      expect(response.json).to.have.been.calledOnce;
      expect(response.json).to.have.been.calledWith(sinon.match.object);
      expect(response.json).to.have.been.calledWith(newProductData);
    })
  })
})

describe('The putProduct Controller function', () => {

  describe('when there is a product with the selected id', () => {
    const updatedProductData = {
      id: 1,
      name: 'product E',
      quantity: 40
    }

    const request = { params: { id: 1 }};
    const response = {};
  
    beforeEach(() => {
      sinon.stub(ProductsService, 'putProduct').resolves(updatedProductData);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })
  
    afterEach(() => {
      ProductsService.putProduct.restore();
    });
  
    it('responds with the status code 200', async () => {
      await ProductsController.putProduct(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(200);
    })
  
    it('responds with with the new product', async () => {
      await ProductsController.putProduct(request, response);

      expect(response.json).to.have.been.calledOnce;
      expect(response.json).to.have.been.calledWith(sinon.match.object);
      expect(response.json).to.have.been.calledWith(updatedProductData);
    })
  })
})

describe('The deleteProduct Controller function', () => {

  describe('when there is a product with the selected id', () => {
    const request = { params: { id: 1 }};
    const response = {};
  
    beforeEach(() => {
      sinon.stub(ProductsService, 'deleteProduct').resolves();

      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
    })
  
    afterEach(() => {
      ProductsService.deleteProduct.restore();
    });
  
    it('responds with the status code 204', async () => {
      await ProductsController.deleteProduct(request, response);
  
      expect(response.status).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(204);
    })
  
    it('responds without a body', async () => {
      await ProductsController.deleteProduct(request, response);

      expect(response.end).to.have.been.calledOnce;
    })
  })
})