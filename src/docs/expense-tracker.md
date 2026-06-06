Expense Tracker App - ReactJS Project Documentation
Project Overview

The Expense Tracker is a ReactJS application that helps users manage their daily expenses, categorize spending, and track financial habits.

## This project is excellent for practicing:

React State Management
Forms Handling
CRUD Operations
Array Methods (map, filter, reduce)
Data Filtering
Statistics & Calculations
Local Storage
Features
1. Add Expense

## Users can add a new expense by entering:

Expense Title
Amount
Category
Date
Example
{
  id: 1,
  title: "Lunch",
  amount: 250,
  category: "Food",
  date: "2026-06-05"
}
2. Delete Expense

Users can remove an expense from the list.

Logic
const handleDeleteExpense = (id) => {
  setExpenses((prev) => prev.filter((expense) => expense.id !== id));
};
Concepts Practiced
filter()
State Updates
3. Display All Expenses

Render expenses using:

expenses.map((expense) => (
  <ExpenseCard key={expense.id} expense={expense} />
));
Concepts Practiced
map()
Component Reusability
4. Calculate Total Expenses

Display the total amount spent.

Logic
const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);
Example
Food      ₹250
Travel    ₹500
Shopping  ₹750

Total = ₹1500
Concepts Practiced
reduce()
Aggregation
5. Category Wise Expenses

Show total spending for each category.

Example
Food       ₹2000
Travel     ₹1500
Shopping   ₹3000
Logic
const categoryTotals = expenses.reduce((acc, expense) => {
  const category = expense.category;

  acc[category] = (acc[category] || 0) + expense.amount;

  return acc;
}, {});
Output
{
  Food: 2000,
  Travel: 1500,
  Shopping: 3000
}
Concepts Practiced
reduce()
Object Manipulation
6. Filter Expenses

Users can filter expenses by category.

Example
All
Food
Travel
Shopping
Bills
Logic
const filteredExpenses =
  selectedCategory === "All"
    ? expenses
    : expenses.filter(
        (expense) => expense.category === selectedCategory
      );
Concepts Practiced
filter()
Conditional Rendering
7. Monthly Summary

Calculate expenses for a selected month.

Logic
const monthlyExpenses = expenses.filter((expense) => {
  const expenseDate = new Date(expense.date);

  return (
    expenseDate.getMonth() === selectedMonth &&
    expenseDate.getFullYear() === selectedYear
  );
});
Monthly Total
const monthlyTotal = monthlyExpenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);
Example
June 2026

Food      ₹3000
Travel    ₹2500
Bills     ₹1500

Total     ₹7000
Folder Structure
src/
│
├── components/
│   ├── ExpenseForm.jsx
│   ├── ExpenseCard.jsx
│   ├── ExpenseList.jsx
│   ├── SummaryCard.jsx
│   ├── CategoryFilter.jsx
│
├── hooks/
│   └── useLocalStorage.js
│
├── pages/
│   └── ExpenseTracker.jsx
│
├── data/
│   └── categories.js
│
├── types/
│   └── ExpenseType.ts
│
├── utils/
│   └── calculations.js
│
└── App.jsx
Expense Data Structure
{
  id: Date.now(),
  title: "Movie Ticket",
  amount: 300,
  category: "Entertainment",
  date: "2026-06-05"
}
Statistics Dashboard

Show:

Total Expenses

₹15,250
Total Transactions

35
Highest Expense

₹2,500
Average Expense

₹435
Average Expense Logic
const averageExpense =
  expenses.length > 0
    ? totalExpenses / expenses.length
    : 0;
Local Storage Support

Save expenses automatically.

Save Data
useEffect(() => {
  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );
}, [expenses]);
Load Data
const [expenses, setExpenses] = useState(() => {
  const storedExpenses =
    localStorage.getItem("expenses");

  return storedExpenses
    ? JSON.parse(storedExpenses)
    : [];
});
Bonus Features
Intermediate
Edit Expense
Search Expense
Date Range Filter
Sort by Amount
Sort by Date
Advanced
Charts

Using:

Recharts

Display:

Monthly Expense Trend
Category Distribution
Expense Analytics
Budget Planner
Monthly Budget = ₹20,000

Spent = ₹15,000

Remaining = ₹5,000
Logic
const remainingBudget =
  budget - totalExpenses;
Concepts Covered
React
useState
useEffect
Props
Component Reusability
Controlled Forms
JavaScript
map()
filter()
reduce()
find()
sort()
Logic Building
Expense Calculations
Category Grouping
Monthly Analytics
Statistics Dashboard
Local Storage Management
Project Difficulty

⭐ Beginner to Intermediate

Why build it?

This project simulates a real-world finance application and gives strong practice with form handling, calculations, filtering, reporting, and data management—skills that are commonly tested in React developer interviews.