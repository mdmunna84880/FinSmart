import { Schema, model, Types } from "mongoose";

const transactionSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["Income", "Expense"],
            required: true
        },
        category: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        desc: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Transaction = model("Transaction", transactionSchema);
