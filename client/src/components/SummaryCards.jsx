// Summary cards — shows Balance, Income, and Expense totals

export default function SummaryCards(props) {
  var balance = props.balance;
  var income = props.income;
  var expense = props.expense;

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">

      {/* Balance card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary">
          Balance
        </p>
        <p className={
          'text-2xl font-bold tracking-tight ' +
          (balance >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-500')
        }>
          ${balance.toFixed(2)}
        </p>
      </div>

      {/* Income card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary">
          Income
        </p>
        <p className="text-2xl font-bold tracking-tight text-green-500">
          +${income.toFixed(2)}
        </p>
      </div>

      {/* Expense card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary">
          Expense
        </p>
        <p className="text-2xl font-bold tracking-tight text-red-500">
          -${expense.toFixed(2)}
        </p>
      </div>
    </div>
  );
}