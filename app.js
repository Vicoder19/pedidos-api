// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { syncDatabase } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

/*SyncDatabase deve ser chamado caso necessite sincronizar alterações feitas
nas classes para o banco de dados, ou para criar o banco novamente*/
// syncDatabase().then(() => {
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});