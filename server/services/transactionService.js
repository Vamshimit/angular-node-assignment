const Transaction = require('../models/transactionModel');

// Define status
const statusArray = [
    { name: 'COMPLETED', value: 1 },
    { name: 'IN PROGRESS', value: 2 },
    { name: 'REJECTED', value: 3 }
  ];

async function getTransactions() {
    try {
      const transactions = await Transaction.find().sort({ date: 1 }).lean();
      return transactions.map(transaction => ({
        id: transaction.id,
        date: formatDate(transaction.date),
        comments: transaction.comments,
        status: transaction.status,
    }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

async function filterTransactionByDate(startDateStr, endDateStr){
  try {
    const transactionsList = await this.getTransactions();
    const transactionByDate = transactionsList.filter(transaction => {
        const transactionDate = (transaction.date);
        return transactionDate >= startDateStr && transactionDate <= endDateStr;
    });

    return transactionByDate;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
}

async function filterTransactionByStatus(status){  
    const transactionsList = await Transaction.find().sort({ date: 1 }).lean();
    const filteredAndFormattedTransactions = transactionsList
        .filter(transaction => transaction.status.toLowerCase() === status.toLowerCase())
        .map(transaction => ({
            id: transaction.id,
            date: formatDate(transaction.date),
            comments: transaction.comments,
            status: transaction.status,
        }));
    return filteredAndFormattedTransactions;

}

async function updateByTransaction(transaction) {
  try {
    const updatedTransaction = await Transaction.updateByTransaction(parseInt(transaction.id), transaction, { new: true });
    console.log('updated transaction');
    if (!updatedTransaction) {
      throw new Error(`Transaction with ID ${transaction.id} not found`);
    }
    return updatedTransaction;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
}

function formatDate(timestamp) {
    const seconds = Math.floor(timestamp / 1000);
    const date = new Date(seconds * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = {
    filterTransactionByDate, getTransactions, filterTransactionByStatus, updateByTransaction
};
