import Transaction from "../models/transaction.model.js";
import Category from "../models/category.model.js";
import Account from "../models/account.model.js";

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transaction.find({ user: req.user.userId }).populate("category").populate("account").populate("tags");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllTransactionsAdmin(req, res) {
    try {
        const transactions = await Transaction.find().populate("category").populate("account").populate("tags").populate("user", "-password");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createTransaction(req, res) {
    try {
        const { amount, category, account, tags } = req.body;
        const categoryDoc = await Category.findById(category);
        let delta;
        if (categoryDoc.type === "Expense") {
            delta = -1 * amount;
        }
        else {
            delta = amount;
        }
        const transaction = await Transaction.create({ amount, category, account, tags, user: req.user.userId });
        await Account.findByIdAndUpdate(account, { $inc: { balance: delta } });
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
            { _id: id, user: req.user.userId },
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
        const deleted = await Transaction.findOneAndDelete({ _id: id, user: req.user.userId });

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
    getAllTransactionsAdmin,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};