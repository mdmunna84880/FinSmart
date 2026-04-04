import Joi from 'joi';

export const securitySchema = Joi.object({
  currentPassword: Joi.string().min(1).required().messages({
    'string.empty': 'Current password is required',
    'any.required': 'Current password is required'
  }),
  newPassword: Joi.string().min(8).invalid(Joi.ref('currentPassword')).required().messages({
    'string.empty': 'New password is required',
    'string.min': 'New password must be at least 8 characters long',
    'any.invalid': 'New password must be different from the current password',
    'any.required': 'New password is required'
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'string.empty': 'Please confirm your password',
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your password'
    })
});


