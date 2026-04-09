import { ChatSession } from "../models/ChatSession.js";
import { aggregateUserFinancialData } from "../repositories/chatRepository.js";
import { generateGeminiResponse, generateChatTitle } from "../services/chatService.js";
import AppError from "../utils/AppError.js";

/** Send a message to the AI and receive a contextual reply. */
export const sendMessage = async (req, res, next) => {
    const { message, sessionId } = req.body;
    if (!message?.trim()) {
        throw new AppError("Please provide a message", 400);
    }

    let chatSession = null;
    let financialContext = null;

    if (sessionId) {
        chatSession = await ChatSession.findOne({ _id: sessionId, userId: req.user._id });
        if (!chatSession) {
            throw new AppError("Conversation not found", 404);
        }
        financialContext = chatSession.contextSnapshot;
    }

    if (!financialContext) {
        financialContext = await aggregateUserFinancialData(req.user);
    }

    if (!chatSession) {
        const sessionTitle = generateChatTitle(message);
        chatSession = await ChatSession.create({
            userId: req.user._id,
            title: sessionTitle,
            messages: [],
            contextSnapshot: financialContext,
        });
    }

    const aiReply = await generateGeminiResponse(message, financialContext, chatSession.messages);

    chatSession.messages.push({ role: "user", content: message });
    chatSession.messages.push({ role: "model", content: aiReply });
    await chatSession.save();

    return res.status(200).json({
        success: true,
        sessionId: chatSession._id,
        title: chatSession.title,
        updatedAt: chatSession.updatedAt,
        reply: aiReply,
    });
};

/** Retrieve all chat sessions for the authenticated user. */
export const getSessions = async (req, res, next) => {
    const sessions = await ChatSession.find({ userId: req.user._id })
        .select("title createdAt updatedAt")
        .sort({ updatedAt: -1 })
        .lean();

    return res.status(200).json({ success: true, data: sessions });
};

/** Load a specific conversation by ID for the authenticated user. */
export const getSession = async (req, res, next) => {
    const chatSession = await ChatSession.findOne({
        _id: req.params.id,
        userId: req.user._id
    }).lean();
    if (!chatSession) {
        throw new AppError("Session not found", 404);
    }

    return res.status(200).json({ success: true, data: chatSession });
};

/** Permanently delete a conversation for the authenticated user. */
export const deleteSession = async (req, res, next) => {
    const chatSession = await ChatSession.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id
    });
    if (!chatSession) {
        throw new AppError("Session not found", 404);
    }

    return res.status(200).json({ success: true, message: "Conversation deleted successfully" });
};
