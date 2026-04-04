import Joi from 'joi';

export const transactionSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be greater than 0',
    'any.required': 'Amount is required'
  }),
  type: Joi.string().valid('Expense', 'Income').required().messages({
    'string.base': 'Type must be a string',
    'any.only': 'Type must be either Expense or Income',
    'any.required': 'Type is required'
  }),
  category: Joi.string().min(1).required().messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required'
  }),
  date: Joi.date().required().messages({
    'date.base': 'Invalid date format',
    'any.required': 'Date is required'
  }),
  desc: Joi.string().min(3).max(200).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 3 characters long',
    'string.max': 'Description must be less than 200 characters',
    'any.required': 'Description is required'
  })
});
