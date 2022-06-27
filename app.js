require('express-async-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger.json');
const { errorMiddleware } = require('./middlewares');
const { productsRoutes, salesRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

app.use('/sales', salesRoutes);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
