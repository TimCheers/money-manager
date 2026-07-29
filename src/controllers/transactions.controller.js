import Transaction from "../models/transaction.model.js";

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transaction.find().populate("category");
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

async function updateTransaction(req, res) {
    try {
        const { id } = req.params;
        const { amount, category } = req.body;

        const updated = await Transaction.findByIdAndUpdate(
            id,
            { amount, category },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Transaction.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted", deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getAllTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};