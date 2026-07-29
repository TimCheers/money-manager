import Account from "../models/account.model.js";

async function getAllAccounts(req, res) {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createAccount(req, res) {
    try {
        const { title, balance } = req.body;
        const account = await Account.create({ title, balance });
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateAccount(req, res) {
    try {
        const { id } = req.params;
        const { title, balance } = req.body;
        const updated = await Account.findByIdAndUpdate(
            id,
            { title, balance },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteAccount(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Account.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json({ message: "Account deleted", deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
};