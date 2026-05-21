// Tests for SummaryCards component

var React = require('react');
var render = require('@testing-library/react').render;
var SummaryCards = require('../SummaryCards').default;

describe('SummaryCards', function () {

  it('should show balance, income, and expense values', function () {
    var { getByText } = render(
      React.createElement(SummaryCards, {
        balance: 4000,
        income: 5000,
        expense: 1000
      })
    );

    expect(getByText('$4000.00')).toBeTruthy();
    expect(getByText('+$5000.00')).toBeTruthy();
    expect(getByText('-$1000.00')).toBeTruthy();
  });

  it('should show negative balance in red', function () {
    var { container } = render(
      React.createElement(SummaryCards, {
        balance: -500,
        income: 0,
        expense: 500
      })
    );

    var balanceElement = container.querySelector('.text-red-500');
    expect(balanceElement).toBeTruthy();
    // The minus sign appears inside the dollar sign: $-500.00
    expect(balanceElement.textContent).toBe('$-500.00');
  });
});
