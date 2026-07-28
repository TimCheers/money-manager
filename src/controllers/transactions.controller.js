import transactionModel from "../models/transaction.model.js";

function getAllTransactions(req, res) {
    res.json(transactionModel.getAll());
}

function createTransaction(req, res) {
    const { amount, category } = req.body;
    const transaction = transactionModel.create({ amount, category });
    res.status(201).json(transaction);
}

export default { getAllTransactions, createTransaction };