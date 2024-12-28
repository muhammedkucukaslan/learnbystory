import { body } from "express-validator";

export const userValidation = [
    body('username')
        .notEmpty()
        .withMessage('Missed username')
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters'),
]