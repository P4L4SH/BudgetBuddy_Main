// Transaction form — used for both adding and editing

import { useState, useEffect } from 'react';

export default function TransactionForm(props) {
  var onAdd = props.onAdd;
  var onUpdate = props.onUpdate;
  var editTransaction = props.editTransaction;
  var onCancelEdit = props.onCancelEdit;

  // Form state
  var [text, setText] = useState('');
  var [amount, setAmount] = useState('');
  var [type, setType] = useState('income');
  var [date, setDate] = useState('');

  // Fill form fields when editing an existing transaction

  useEffect(function() {
    if (editTransaction) {
      setText(editTransaction.text);
      setAmount(String(editTransaction.amount));
      setType(editTransaction.type);
      setDate(editTransaction.created_at);
    } else {
      setText('');
      setAmount('');
      setType('income');
      setDate('');
    }
  }, [editTransaction]);

  // Handle form submission

  function handleSubmit(event) {
    event.preventDefault();

    // Don't submit if fields are empty
    if (!text || !amount || !date) {
      return;
    }

    var transactionData = {
      text: text,
      amount: parseFloat(amount),
      type: type,
      date: date
    };

    if (editTransaction) {
      onUpdate(editTransaction.id, transactionData);
    } else {
      onAdd(transactionData);
    }

    // Reset form after submit
    setText('');
    setAmount('');
    setType('income');
    setDate('');
  }

  // Get today's date for the max attribute
  var today = new Date();
  var todayStr = today.toISOString().split('T')[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 h-full">
      {/* Section heading */}
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Description and Amount row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary font-medium">
              Description
            </label>
            <input
              type="text"
              value={text}
              onChange={function(e) { setText(e.target.value); }}
              placeholder="e.g. Salary"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary font-medium">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={function(e) { setAmount(e.target.value); }}
              placeholder="0.00"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>
        </div>

        {/* Type, Date, and Submit row */}
        <div className="grid grid-cols-4 gap-2 items-end">
          <div>
            <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary font-medium">
              Type
            </label>
            <select
              value={type}
              onChange={function(e) { setType(e.target.value); }}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white cursor-pointer"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary font-medium">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={function(e) { setDate(e.target.value); }}
              max={todayStr}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Submit and Cancel buttons */}
          <div className="col-span-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 font-semibold text-sm px-4 py-2 rounded-lg"
            >
              {editTransaction ? 'Update' : 'Add'}
            </button>

            {/* Cancel button — only shows when editing */}
            {editTransaction && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium text-sm px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}