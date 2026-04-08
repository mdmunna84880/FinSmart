import { Schema, model, Types } from "mongoose";

/** Schema for a single message within a chat session. */
const messageSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["user", "model"],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { _id: false, timestamps: true }
);

/** Schema for storing user chat sessions with AI financial assistant. */
const chatSessionSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            default: "New Chat",
            trim: true,
        },
        messages: [messageSchema],
        contextSnapshot: {
            type: Schema.Types.Mixed,
            default: null,
        },
    },
    { timestamps: true }
);

/** Compound index for listing user history sorted by most recent. */
chatSessionSchema.index({ userId: 1, updatedAt: -1 });

export const ChatSession = model("ChatSession", chatSessionSchema);
