import Tag from "../models/tag.model.js";

async function getAllTags(req, res) {
    try {
        const tags = await Tag.find({ user: req.user.userId });
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createTag(req, res) {
    try {
        const { title, color } = req.body;
        const tag = await Tag.create({ title, color, user: req.user.userId });
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateTag(req, res) {
    try {
        const { id } = req.params;
        const { title, color } = req.body;
        const updated = await Tag.findOneAndUpdate(
            { _id: id, user: req.user.userId },
            { title, color },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(400).json({ error: "Tag not found" });
        }
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteTag(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Tag.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!deleted) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.json({ message: "Tag deleted", deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getAllTags,
    createTag,
    updateTag,
    deleteTag,
};
