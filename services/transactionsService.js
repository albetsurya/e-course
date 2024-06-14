const fs = require("fs");
const path = require("path");
const transactionsFilePath = path.join(__dirname, "../data/transactions.json");

const readTransactionsFile = () => {
  const data = fs.readFileSync(transactionsFilePath, "utf8");
  return JSON.parse(data);
};

const writeTransactionsFile = (data) => {
  fs.writeFileSync(transactionsFilePath, JSON.stringify(data, null, 2));
};

const getAllTransactions = () => {
  return readTransactionsFile();
};

const createTransaction = (newTransaction) => {
  const transactions = readTransactionsFile();
  transactions.push(newTransaction);
  writeTransactionsFile(transactions);
  return newTransaction;
};

const updateTransaction = (id, updatedTransaction) => {
  const transactions = readTransactionsFile();
  const index = transactions.findIndex((t) => t.id == id);
  if (index !== -1) {
    transactions[index] = updatedTransaction;
    writeTransactionsFile(transactions);
    return updatedTransaction;
  }
  return null;
};

const deleteTransaction = (id) => {
  const transactions = readTransactionsFile();
  const index = transactions.findIndex((t) => t.id == id);
  if (index !== -1) {
    const deletedTransaction = transactions.splice(index, 1);
    writeTransactionsFile(transactions);
    return deletedTransaction;
  }
  return null;
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
