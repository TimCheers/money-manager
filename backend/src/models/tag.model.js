import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, //скопировал из category, напомни что это
    }
);

const Tag = mongoose.model("Tag", tagSchema);

export default Tag; //напомни, что значит default