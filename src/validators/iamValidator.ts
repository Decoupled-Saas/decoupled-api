import { body } from 'express-validator';

export const checkName = body('name').trim().escape();
export const checkDescription = body('description').trim().escape();
