import { body } from 'express-validator';
import { Court } from '@/database/models/index.js';

const checkCourtNameExists = async (value: string): Promise<boolean> => {
  const existingCourt = await Court.findOne({
    where: { name: value },
  });
  if (existingCourt) {
    throw new Error('Court with this name already exists');
  }
  return true;
};

export const createCourtValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters')
    .custom(checkCourtNameExists),
];

export const updateCourtValidators = [
  body('name')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),
];
