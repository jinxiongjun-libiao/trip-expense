'use strict';

/**
 * Creates a new expense entry.
 * @param {string} description - Description of the expense.
 * @param {number} amount - Amount spent.
 * @param {string} currency - Currency code (e.g. 'USD').
 * @param {string} category - Category of expense (e.g. 'transport', 'food').
 * @returns {{ description: string, amount: number, currency: string, category: string }}
 */
function createExpense(description, amount, currency, category) {
  if (typeof description !== 'string' || description.trim() === '') {
    throw new Error('description must be a non-empty string');
  }
  if (typeof amount !== 'number' || amount < 0) {
    throw new Error('amount must be a non-negative number');
  }
  if (typeof currency !== 'string' || currency.trim() === '') {
    throw new Error('currency must be a non-empty string');
  }
  if (typeof category !== 'string' || category.trim() === '') {
    throw new Error('category must be a non-empty string');
  }
  return { description: description.trim(), amount, currency: currency.trim().toUpperCase(), category: category.trim() };
}

/**
 * Calculates the total amount for a list of expenses.
 * @param {Array<{ amount: number }>} expenses
 * @returns {number}
 */
function totalAmount(expenses) {
  if (!Array.isArray(expenses)) {
    throw new Error('expenses must be an array');
  }
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

/**
 * Groups expenses by category.
 * @param {Array<{ category: string, amount: number }>} expenses
 * @returns {Object.<string, number>}
 */
function groupByCategory(expenses) {
  if (!Array.isArray(expenses)) {
    throw new Error('expenses must be an array');
  }
  return expenses.reduce((groups, expense) => {
    const key = expense.category;
    groups[key] = (groups[key] || 0) + expense.amount;
    return groups;
  }, {});
}

module.exports = { createExpense, totalAmount, groupByCategory };
