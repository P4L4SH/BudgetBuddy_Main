// Tests for TransactionList component

var React = require('react');
var render = require('@testing-library/react').render;
var TransactionList = require('../TransactionList').default;

describe('TransactionList', function () {

  it('should show empty state when there are no transactions', function () {
    var { getByText } = render(
      React.createElement(TransactionList, {
        transactions: [],
        onEdit: function () {},
        onDelete: function () {}
      })
    );

    expect(getByText('No transactions yet')).toBeTruthy();
  });

  it('should render a list of transactions', function () {
    var transactions = [
      { id: 1, text: 'Salary', amount: 5000, type: 'income', created_at: '2026-05-21' },
      { id: 2, text: 'Rent', amount: 1000, type: 'expense', created_at: '2026-05-20' }
    ];

    var { getByText } = render(
      React.createElement(TransactionList, {
        transactions: transactions,
        onEdit: function () {},
        onDelete: function () {}
      })
    );

    expect(getByText('Salary')).toBeTruthy();
    expect(getByText('Rent')).toBeTruthy();
  });

  it('should show income amount with a plus sign', function () {
    var transactions = [
      { id: 1, text: 'Salary', amount: 5000, type: 'income', created_at: '2026-05-21' }
    ];

    var { getByText } = render(
      React.createElement(TransactionList, {
        transactions: transactions,
        onEdit: function () {},
        onDelete: function () {}
      })
    );

    expect(getByText('+$5000.00')).toBeTruthy();
  });

  it('should show expense amount with a minus sign', function () {
    var transactions = [
      { id: 1, text: 'Rent', amount: 1000, type: 'expense', created_at: '2026-05-20' }
    ];

    var { getByText } = render(
      React.createElement(TransactionList, {
        transactions: transactions,
        onEdit: function () {},
        onDelete: function () {}
      })
    );

    expect(getByText('-$1000.00')).toBeTruthy();
  });
});
