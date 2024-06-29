const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes');


const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors()); 
mongoose.connect('mongodb://localhost:27017/transaction-db');

// Database Connecttion
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});
 
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
