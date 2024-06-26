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

syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
