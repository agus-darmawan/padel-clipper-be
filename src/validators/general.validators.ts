import { param, type ValidationChain } from 'express-validator';

export const idParamValidator: ValidationChain[] = [
  param('id').isInt({ min: 1 }).withMessage('Valid ID is required'),
];

export const uuidParamValidator = [
  param('id').isUUID().withMessage('Valid UUID is required'),
];
