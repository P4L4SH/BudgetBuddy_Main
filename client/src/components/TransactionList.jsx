// Transaction list — shows all transactions with edit/delete

export default function TransactionList(props) {
  var transactions = props.transactions;
  var onEdit = props.onEdit;
  var onDelete = props.onDelete;

  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center h-full flex flex-col items-center justify-center">
        <p className="text-3xl mb-2">📭</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">No transactions yet</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1 font-secondary">Add your first one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      {/* Scrollable table */}
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm">
          {/* Table header */}
          <thead>
            <tr className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900 font-secondary">
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Description</th>
              <th className="text-right px-4 py-3 font-medium">Amount</th>
              <th className="text-center px-4 py-3 font-medium">Type</th>
              <th className="text-center px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {transactions.map(function(t) {
              return (
                <tr key={t.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap font-secondary">
                    {t.created_at}
                  </td>
                  <td className="px-4 py-2.5 text-gray-900 dark:text-white font-medium">
                    {t.text}
                  </td>
                  <td className={
                    'px-4 py-2.5 text-right text-sm font-semibold whitespace-nowrap ' +
                    (t.type === 'income' ? 'text-green-500' : 'text-red-500')
                  }>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={
                      'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider font-secondary ' +
                      (t.type === 'income'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-300 dark:border-green-700'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700')
                    }>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <div className="flex gap-1.5 justify-center">
                      <button
                        onClick={function() { onEdit(t); }}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={function() { onDelete(t.id); }}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 font-secondary"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}