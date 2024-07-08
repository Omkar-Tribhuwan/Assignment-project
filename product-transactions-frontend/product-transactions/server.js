const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();

mongoose.connect('mongodb://localhost:27017/productTransactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const initRoute = require('./routes/init');
app.use('/api', initRoute);

const transactionsRoute = require('./routes/transactions');
app.use('/api', transactionsRoute);
