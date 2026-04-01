import { Schema, model, Types } from "mongoose";

const budgetSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        year: {
            type: Number,
            required: true
        },

        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },

        monthlyBudget: {
            type: Number,
            required: true,
            default: 0
        },

        savingsTarget: {
            type: Number,
            default: 0
        },

        categoryLimits: [
            {
                category: {
                    type: String,
                    required: true
                },
                limit: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

// Constraint and compond index
budgetSchema.index(
    { userId: 1, year: 1, month: 1 },
    { unique: true }
);

export const Budget = model("Budget", budgetSchema);