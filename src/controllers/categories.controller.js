import Category from "../models/category.model.js";

async function getAllCategories(req, res) {
    try {
        const categories = await Category.find({ user: req.user.userId });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createCategory(req, res) {
    try {
        const { title, type } = req.body;
        const category = await Category.create({ title, type, user: req.user.userId });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { title, type } = req.body;
        const updated = await Category.findOneAndUpdate(
            { _id: id, user: req.user.userId },
            { title, type },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Category.findOneAndDelete({ _id: id, user: req.user.userId });

        if (!deleted) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json({ message: "Category deleted", deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};