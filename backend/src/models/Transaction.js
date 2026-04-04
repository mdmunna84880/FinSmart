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
            required: true,
            index: true
        },
        category: {
            type: String,
            required: true,
            index: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true,
            index: true
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

// Compound indexes to optimize common query patterns
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });
transactionSchema.index({ userId: 1, type: 1 });

export const Transaction = model("Transaction", transactionSchema);
