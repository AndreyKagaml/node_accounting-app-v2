import { Router } from 'express';
import { expenseController } from '../controllers/expense.controller';

export const expenseRouter = Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:id', expenseController.getById);
expenseRouter.post('/', expenseController.create);
expenseRouter.patch('/:id', expenseController.update);
expenseRouter.delete('/:id', expenseController.deleteOne);
