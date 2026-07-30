import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;