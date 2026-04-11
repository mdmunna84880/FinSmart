import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "../config/env.js";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

/** Build the system prompt for the AI financial assistant. */
const buildSystemPrompt = (financialContext) => {
    const userName = financialContext.user.name.split(" ")[0];

    return `
You are FinSmart AI, ${userName}'s dedicated financial co-pilot. You analyze personal financial data and provide actionable, data-driven insights.

ROLE & BEHAVIOR:
1. Be concise and direct. Lead with the answer, then add brief context if needed.
2. Always ground responses in the provided data. Never fabricate, estimate, or guess numbers.
3. If the data doesn't contain what's needed, say so clearly and suggest what to track going forward.
4. Proactively surface patterns: rising trends, anomalies, seasonal spending, or savings opportunities.
5. When spending is high in a category, suggest specific, realistic, and actionable cost-saving strategies.
6. Use natural language with precise figures — bold all dollar amounts (e.g., **$1,240**).
7. Structure responses with markdown: bullet points for lists, bold for key figures, short paragraphs.

CONTEXT USAGE:
- Reference the user's actual name: ${userName}.
- Use only the provided 12-month financial window. Do not reference data outside this period.
- Leverage monthly trends, category breakdowns, budget limits, and recent transactions for nuanced answers.
- When comparing periods, use actual month names (e.g., "March" not "month 3").

SAFETY & SCOPE:
- Focus strictly on personal finance, budgeting, and spending optimization.
- Do not provide investment advice, legal guidance, or tax recommendations.
- If asked about topics outside personal finance, politely redirect to budgeting insights available in the data.

FINANCIAL CONTEXT:
${JSON.stringify(financialContext, null, 2)}
`.trim();
};

/** Generate an AI response using Gemini for the given user message and financial context. */
export const generateGeminiResponse = async (userMessage, financialContext, conversationHistory = []) => {
    const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const systemPrompt = buildSystemPrompt(financialContext);

    const chatSession = geminiModel.startChat({
        history: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: `Hello ${financialContext.user.name.split(" ")[0]}! I've analyzed your financial data and I'm ready to help. Ask me about your income, expenses, budgets, or spending trends — or I can proactively share insights if you'd like.` }] },
            ...conversationHistory.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }]
            }))
        ]
    });

    const aiResponse = await chatSession.sendMessage(userMessage);
    return aiResponse.response.text();
};

/** Generate a concise, descriptive title from the user's first message using AI. */
export const generateChatTitle = async (userMessage) => {
    const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a title generator. Given a user message, generate a SHORT, DESCRIPTIVE title (max 50 characters) that captures the intent.

RULES:
- Max 3-5 words, concise and meaningful
- Remove filler words like "show me", "my", "the", "I want to", etc.
- Capitalize appropriately
- No quotes, no punctuation at the end
- Focus on the core topic/question
- Return ONLY the title, nothing else

EXAMPLES:
"Show me my expenses by category last month" → Expenses by Category Last Month
"How much did I spend on groceries in March?" → Grocery Spending in March
"Analyze my income trends for the past year" → Income Trends Past Year
"Compare my spending between Q1 and Q2" → Q1 vs Q2 Spending Comparison
"Where is most of my money going?" → Top Spending Categories

USER MESSAGE: "${userMessage}"

TITLE:
`.trim();

    try {
        const result = await geminiModel.generateContent(prompt);
        let title = result.response.text().trim();

        // Clean up: remove quotes if AI adds them
        title = title.replace(/^["']|["']$/g, '');

        // Ensure max length
        if (title.length > 50) {
            title = title.slice(0, 47) + '...';
        }

        // Capitalize first letter if not already
        return title.charAt(0).toUpperCase() + title.slice(1);
    } catch (error) {
        console.error('Error generating AI title:', error);
        // Fallback to a simple title
        const words = userMessage.trim().split(/\s+/).slice(0, 6).join(' ');
        return words.charAt(0).toUpperCase() + words.slice(1) + '...';
    }
};
