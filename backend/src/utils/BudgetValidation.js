import Joi from "joi";

export const setBudgetSchema = Joi.object({
    year: Joi.number().integer().min(2000).required().messages({
        "number.base": "Year must be a number",
        "number.min": "Year must be 2000 or later",
        "any.required": "Year is required"
    }),
    month: Joi.number().integer().min(1).max(12).required().messages({
        "number.base": "Month must be a number",
        "number.min": "Month must be between 1 and 12",
        "number.max": "Month must be between 1 and 12",
        "any.required": "Month is required"
    }),
    monthlyBudget: Joi.number().positive().required().messages({
        "number.base": "Monthly Budget must be a number",
        "number.positive": "Monthly Budget must be greater than 0",
        "any.required": "Monthly Budget is required"
    }),
    savingsTarget: Joi.number().positive().optional(),
    categoryLimits: Joi.array().items(
        Joi.object({
            category: Joi.string().required(),
            limit: Joi.number().positive().required()
        })
    ).optional()
});
