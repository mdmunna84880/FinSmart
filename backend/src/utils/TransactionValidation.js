import Joi from "joi";

export const addTransactionSchema = Joi.object({
    amount: Joi.number().positive().required().messages({
        "number.base": "Amount must be a number",
        "number.positive": "Amount must be greater than 0",
        "any.required": "Amount is required"
    }),
    type: Joi.string().valid("Income", "Expense").required().messages({
        "any.only": "Type must be either Income or Expense",
        "any.required": "Type is required"
    }),
    category: Joi.string().required().messages({
        "string.empty": "Category is required",
        "any.required": "Category is required"
    }),
    date: Joi.date().iso().messages({
        "date.format": "Date must be in ISO format"
    }),
    desc: Joi.string().allow("").optional()
});

export const updateTransactionSchema = Joi.object({
    amount: Joi.number().positive().optional().messages({
        "number.base": "Amount must be a number",
        "number.positive": "Amount must be greater than 0"
    }),
    type: Joi.string().valid("Income", "Expense").optional().messages({
        "any.only": "Type must be either Income or Expense"
    }),
    category: Joi.string().optional(),
    date: Joi.date().iso().optional().messages({
        "date.format": "Date must be in ISO format"
    }),
    desc: Joi.string().allow("").optional()
}).min(1).messages({
    "object.min": "At least one field must be provided for update"
});
