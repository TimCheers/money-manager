import Transaction from "../models/transaction.model.js";

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createTransaction(req, res) {
    try {
        const { amount, category } = req.body;
        const transaction = await Transaction.create({ amount, category });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default { getAllTransactions, createTransaction };