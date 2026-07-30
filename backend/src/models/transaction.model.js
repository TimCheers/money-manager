import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
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

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;