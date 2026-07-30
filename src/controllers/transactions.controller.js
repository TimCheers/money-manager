import Transaction from "../models/transaction.model.js";

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transaction.find({ user: req.user.userId }).populate("category").populate("account");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createTransaction(req, res) {
    try {
        const { amount, category, account } = req.body;
        const transaction = await Transaction.create({ amount, category, account, user: req.user.userId  });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateTransaction(req, res) {
    try {
        const { id } = req.params;
        const { amount, category, account } = req.body;

        const updated = await Transaction.findOneAndUpdate(
            {_id: id, user: req.user.userId },
            { amount, category, account },
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
        const deleted = await Transaction.findOneAndDelete({_id: id, user: req.user.userId });

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