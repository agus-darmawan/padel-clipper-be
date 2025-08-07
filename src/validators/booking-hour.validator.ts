import { body } from 'express-validator';
import { Court } from '@/database/models/index.js';

const checkCourtExists = async (value: number): Promise<boolean> => {
  const court = await Court.findByPk(value);
  if (!court) {
    throw new Error('Court not found');
  }
  return true;
};

export const createBookingHourValidators = [
  body('courtId')
    .notEmpty()
    .withMessage('Court ID is required')
    .isInt()
    .withMessage('Court ID must be a number')
    .custom(checkCourtExists),

  body('dateStart')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),

  body('dateEnd')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.dateStart)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
];

export const updateBookingHourValidators = [
  body('dateStart')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),

  body('dateEnd')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.dateStart)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
];
