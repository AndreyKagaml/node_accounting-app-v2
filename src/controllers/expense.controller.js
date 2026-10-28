import { expenseService } from '../services/expense.service.js';
import { userService } from '../services/user.service.js';

export const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expenseService.getAll({
    userId: +userId,
    categories,
    from,
    to,
  });

  return res.json(expenses);
};

export const getById = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.status(200).json(expense);
};

export const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const data = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (!Object.values(data).every((value) => Boolean(value))) {
    return res.sendStatus(400);
  }

  const expensesUser = await userService.getById(+userId);

  if (!expensesUser) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.create(data);

  return res.status(201).json(expense);
};

export const update = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expenseService.update(id, req.body);

  return res.json(updatedExpense);
};

export const deleteOne = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  const deletedExpense = await expenseService.deleteById(id);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
};

export const expenseController = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
