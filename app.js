//para utilizar a apikey
require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/produtoRoutes');
const classeRoutes = require('./routes/classeRoutes');
const { default: rateLimit } = require('express-rate-limit');
//const { syncDatabase } = require('./models');

const app = express();
const port = 3000;

//limitando requisições por período
const limiter = rateLimit({
  windowMs: process.env.REQUEST_LIMIT_INTERVAL * 60 * 1000, 
  max: process.env.REQUEST_LIMIT,
  message: 'Too many requests, please try again later.'
});

//desativando cabeçalho x-powered-by para evitar problemas de segurança
app.disable('x-powered-by');

//limitador aplicado a todas as rotas
app.use('/', limiter);

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/classe', classeRoutes);

/*SyncDatabase deve ser chamado caso necessite sincronizar alterações feitas
nas classes para o banco de dados, ou para criar a estrutura do banco*/
// syncDatabase().then(() => {
//    app.listen(port, () => {
//      console.log('Database synchronized');
//    });
//  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});