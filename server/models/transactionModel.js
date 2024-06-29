const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: String,
  date: Date,
  comments: String,
  status: String
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transaction');

module.exports = Transaction;
