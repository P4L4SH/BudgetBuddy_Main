// Dashboard — main component that manages all state
// Handles CRUD operations, theme, and filter logic

import { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryCards from './SummaryCards';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import IncomeExpenseChart from './IncomeExpenseChart';

export default function Dashboard() {
  // App state
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [filter, setFilter] = useState('all');

  // Theme state — read from localStorage or default to dark

  const [darkMode, setDarkMode] = useState(() => {
    var saved = localStorage.getItem('budgetbuddy-theme');
    if (saved === 'light') return false;
    return true;
  });

  // Apply 'dark' class to <html> when theme changes

  useEffect(function() {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('budgetbuddy-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Toggle between light and dark
  function toggleTheme() {
    setDarkMode(function(prev) {
      return !prev;
    });
  }

  // Fetch all transactions on mount

  useEffect(function() {
    fetchTransactions();
  }, []);

  // GET /api/transactions — load from the server

  async function fetchTransactions() {
    try {
      var result = await axios.get('/api/transactions');
      setTransactions(result.data);
    } catch (err) {
      console.log('Failed to load transactions');
    }
  }

  // POST /api/transactions — add a new transaction

  async function handleAdd(transaction) {
    try {
      await axios.post('/api/transactions', transaction);
      setEditTransaction(null);
      fetchTransactions();
    } catch (err) {
      console.log('Failed to add transaction');
    }
  }

  // PUT /api/transactions/:id — update existing

  async function handleUpdate(id, transaction) {
    try {
      await axios.put('/api/transactions/' + id, transaction);
      setEditTransaction(null);
      fetchTransactions();
    } catch (err) {
      console.log('Failed to update transaction');
    }
  }

  // DELETE /api/transactions/:id — remove after confirmation

  async function handleDelete(id) {
    var confirmDelete = window.confirm('Delete this transaction?');
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete('/api/transactions/' + id);
      fetchTransactions();
    } catch (err) {
      console.log('Failed to delete transaction');
    }
  }

  // Helper functions for edit
  function handleEdit(transaction) {
    setEditTransaction(transaction);
  }

  function handleCancelEdit() {
    setEditTransaction(null);
  }

  // Filter transactions by type

  var filteredTransactions = [];

  for (var i = 0; i < transactions.length; i++) {
    var t = transactions[i];
    if (filter === 'all') {
      filteredTransactions.push(t);
    } else if (filter === 'income' && t.type === 'income') {
      filteredTransactions.push(t);
    } else if (filter === 'expense' && t.type === 'expense') {
      filteredTransactions.push(t);
    }
  }

  // Calculate totals

  var totalIncome = 0;
  var totalExpense = 0;

  for (var j = 0; j < transactions.length; j++) {
    var tr = transactions[j];
    if (tr.type === 'income') {
      totalIncome = totalIncome + tr.amount;
    } else if (tr.type === 'expense') {
      totalExpense = totalExpense + tr.amount;
    }
  }

  var balance = totalIncome - totalExpense;

  // Filter button options
  var filterBtns = [
    { id: 'all', label: 'All' },
    { id: 'income', label: 'Income' },
    { id: 'expense', label: 'Expense' },
  ];

  return (
    <div className="h-screen overflow-hidden p-5 sm:p-6 flex flex-col max-w-6xl mx-auto">
      {/* Header — title, theme toggle, and live indicator */}

      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BudgetBuddy</h1>

        <div className="flex items-center gap-3">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            {darkMode ? (
              /* Sun icon for light mode */
              <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              /* Moon icon for dark mode */
              <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-secondary">Live</span>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <SummaryCards balance={balance} income={totalIncome} expense={totalExpense} />

      {/* Chart and form — side by side on desktop */}
      <div className="grid grid-cols-5 gap-3 mb-3 flex-shrink-0">
        <div className="col-span-2">
          <IncomeExpenseChart income={totalIncome} expense={totalExpense} />
        </div>
        <div className="col-span-3">
          <TransactionForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editTransaction={editTransaction}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      </div>

      {/* Filter buttons — All / Income / Expense */}
      <div className="flex gap-2 mb-2 flex-shrink-0">
        {filterBtns.map(function(btn) {
          var isActive = filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={function() { setFilter(btn.id); }}
              className={
                'px-3.5 py-1.5 rounded-lg text-[11px] font-medium font-secondary ' +
                (isActive
                  ? 'bg-gray-800 dark:bg-white text-white dark:text-gray-900 font-semibold'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700')
              }
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable transaction list */}
      <div className="flex-1 min-h-0">
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}