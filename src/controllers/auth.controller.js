import bcrypt from "bcrypt";
import User from "../models/user.model.js";

async function registerUser(req, res) {
    try {
        const { username, email, password, dateOfBirth } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
        });

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    registerUser,
};