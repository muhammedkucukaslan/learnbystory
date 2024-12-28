import { body } from 'express-validator';

export const signupValidation = [
    body('username')
        .notEmpty()
        .withMessage('Missed username')
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters'),
    body('email').notEmpty().isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .isString()
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters'),
];

export const loginValidation = [
    body('email').notEmpty().isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .isString()
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters'),
];
