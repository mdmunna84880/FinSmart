import AppError from "../utils/AppError.js";

// Intercepts the request and checks req.body against a Joi schema.
export const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    // If validation fails, create an AppError and pass it to the error-handling middleware.
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        const validationError = new AppError(errorMessages.join(", "), 400);
        return next(validationError);
    }

    next();
};
