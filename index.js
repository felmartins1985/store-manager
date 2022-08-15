const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();

const ControllerProduct = require('./controllers/ControllerProduct');
const ControllerSale = require('./controllers/ControllerSale');

app.use(bodyParser.json());

app.get('/products', ControllerProduct.getAll);
app.get('/products/:id', ControllerProduct.getById);
app.post('/products', ControllerProduct.create);
app.post('/sales', ControllerSale.createSaleProduct);
app.get('/sales', ControllerSale.getAll);
app.get('/sales/:id', ControllerSale.getById);
app.put('/products/:id', ControllerProduct.putProductById);
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
