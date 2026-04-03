import Joi from 'joi';

// Enforcing standard Joi configurations
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'The passwords do not match',
    'any.required': 'Please confirm password'
  })
});
