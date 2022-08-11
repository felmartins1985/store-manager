const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();

const ControllerProduct = require('./controllers/ControllerProduct');

app.use(bodyParser.json());

app.get('/products', ControllerProduct.getAll);
app.get('/products/:id', ControllerProduct.getById);
app.post('/products', ControllerProduct.create);
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
