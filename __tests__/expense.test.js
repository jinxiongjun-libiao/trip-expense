'use strict';

const { createExpense, totalAmount, groupByCategory } = require('../src/expense');

describe('createExpense', () => {
  test('creates a valid expense object', () => {
    const expense = createExpense('Hotel stay', 120.5, 'usd', 'accommodation');
    expect(expense).toEqual({
      description: 'Hotel stay',
      amount: 120.5,
      currency: 'USD',
      category: 'accommodation',
    });
  });

  test('trims whitespace from description and category', () => {
    const expense = createExpense('  Taxi  ', 15, 'EUR', '  transport  ');
    expect(expense.description).toBe('Taxi');
    expect(expense.category).toBe('transport');
  });

  test('normalises currency to uppercase', () => {
    const expense = createExpense('Lunch', 20, 'eur', 'food');
    expect(expense.currency).toBe('EUR');
  });

  test('throws when description is empty', () => {
    expect(() => createExpense('', 10, 'USD', 'food')).toThrow('description must be a non-empty string');
  });

  test('throws when amount is negative', () => {
    expect(() => createExpense('Dinner', -5, 'USD', 'food')).toThrow('amount must be a non-negative number');
  });

  test('throws when currency is missing', () => {
    expect(() => createExpense('Dinner', 10, '', 'food')).toThrow('currency must be a non-empty string');
  });

  test('throws when category is missing', () => {
    expect(() => createExpense('Dinner', 10, 'USD', '')).toThrow('category must be a non-empty string');
  });

  test('allows zero amount', () => {
    const expense = createExpense('Free entry', 0, 'USD', 'entertainment');
    expect(expense.amount).toBe(0);
  });
});

describe('totalAmount', () => {
  test('returns 0 for an empty list', () => {
    expect(totalAmount([])).toBe(0);
  });

  test('sums amounts across multiple expenses', () => {
    const expenses = [
      createExpense('Flight', 300, 'USD', 'transport'),
      createExpense('Hotel', 200, 'USD', 'accommodation'),
      createExpense('Dinner', 50, 'USD', 'food'),
    ];
    expect(totalAmount(expenses)).toBe(550);
  });

  test('throws when given a non-array', () => {
    expect(() => totalAmount(null)).toThrow('expenses must be an array');
  });
});

describe('groupByCategory', () => {
  test('returns empty object for empty list', () => {
    expect(groupByCategory([])).toEqual({});
  });

  test('groups and sums expenses by category', () => {
    const expenses = [
      createExpense('Flight', 300, 'USD', 'transport'),
      createExpense('Bus', 20, 'USD', 'transport'),
      createExpense('Hotel', 200, 'USD', 'accommodation'),
      createExpense('Lunch', 30, 'USD', 'food'),
    ];
    expect(groupByCategory(expenses)).toEqual({
      transport: 320,
      accommodation: 200,
      food: 30,
    });
  });

  test('throws when given a non-array', () => {
    expect(() => groupByCategory('not an array')).toThrow('expenses must be an array');
  });
});
