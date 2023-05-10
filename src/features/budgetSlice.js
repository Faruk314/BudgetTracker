import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgets: JSON.parse(localStorage.getItem("budgets")) || [],
  totalExpenses: JSON.parse(localStorage.getItem("totalExpense")) || 0,
  totalBudget: JSON.parse(localStorage.getItem("totalBudget")) || 0,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    AddBudget(state, action) {
      const budget = action.payload;

      state.totalBudget += parseInt(budget.maxSpending);
      state.budgets.push(budget);

      localStorage.setItem("totalBudget", JSON.stringify(state.totalBudget));
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
    },
    deleteBudget(state, action) {
      let filtered = state.budgets.filter(
        (budget) => budget.id !== action.payload.id
      );

      console.log(action.payload);

      state.budgets = filtered;
      state.totalBudget -= action.payload.maxSpending;
      state.totalExpenses -= action.payload.cardTotal;

      localStorage.setItem("totalBudget", JSON.stringify(state.totalBudget));
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
      localStorage.setItem("totalExpense", JSON.stringify(state.totalExpenses));
    },

    addExpense(state, action) {
      let expense = action.payload;

      let currentCardIndex = state.budgets.findIndex(
        (card) => card.id === action.payload.budgetId
      );

      let expenses = state.budgets[currentCardIndex].expenses;

      state.totalExpenses += expense.amount;
      localStorage.setItem("totalExpense", JSON.stringify(state.totalExpenses));

      state.budgets[currentCardIndex].cardTotal += expense.amount;

      expenses.push(expense);

      localStorage.setItem("budgets", JSON.stringify(state.budgets));
    },

    deleteExpense(state, action) {
      let id = action.payload.id;

      let currentCardIndex = state.budgets.findIndex(
        (card) => card.id === action.payload.budgetId
      );

      let expenses = state.budgets[currentCardIndex].expenses;
      let expenseAmount = expenses.find((expense) => expense.id === id).amount;
      let expenseIndex = expenses.findIndex((expense) => expense.id === id);

      expenses.splice(expenseIndex, 1);
      state.budgets[currentCardIndex].cardTotal -= expenseAmount;
      state.totalExpenses -= expenseAmount;

      localStorage.setItem("totalExpense", JSON.stringify(state.totalExpenses));
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
      localStorage.setItem("totalBudget", JSON.stringify(state.totalBudget));
    },

    clearExpenses(state, action) {
      let currentCardIndex = state.budgets.findIndex(
        (card) => card.id === action.payload.id
      );

      state.totalExpenses -= state.budgets[currentCardIndex].cardTotal;

      state.budgets[currentCardIndex].cardTotal = 0;
      state.budgets[currentCardIndex].expenses = [];

      localStorage.setItem("totalExpense", JSON.stringify(state.totalExpenses));
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
    },
  },
});

export const budgetActions = budgetSlice.actions;
export default budgetSlice.reducer;
