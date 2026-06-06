import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenseTracker = create(
  persist(
    (set, get) => ({
      expenses: [],

      addExpenses: (expense) =>
        set((state) => ({
          expenses: [...state.expense, expense],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expense.filter((expense) => expense.id !== id),
        })),

      getTotalExpenses: () =>
        get().expenses.reduce((sum, expense) => sum + expense.amount, 0),
    }),

    {
      name: "expense-tracker", //localstorage key
    },
  ),
);
