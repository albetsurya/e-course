const transactionsService = require("../services/transactionsService");

const getAllTransactions = (req, res) => {
  const transactions = transactionsService.getAllTransactions();
  res.json(transactions);
};

const createTransaction = (req, res) => {
  const newTransaction = req.body;
  const createdTransaction =
    transactionsService.createTransaction(newTransaction);
  res.status(201).json(createdTransaction);
};

const updateTransaction = (req, res) => {
  const id = req.params.id;
  const updatedTransaction = req.body;
  const result = transactionsService.updateTransaction(id, updatedTransaction);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("Transaction not found");
  }
};

const deleteTransaction = (req, res) => {
  const id = req.params.id;
  const result = transactionsService.deleteTransaction(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("Transaction not found");
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
