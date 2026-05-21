// Backend API tests — tests all CRUD endpoints using a mock database

var request = require('supertest');

// Mock the database module before requiring the server
var mockDb = {
  transactions: [],
  nextId: 1,

  getAll: function () {
    return Promise.resolve([...this.transactions]);
  },

  add: function (text, amount, type, date) {
    var newTransaction = {
      id: this.nextId++,
      text: text,
      amount: amount,
      type: type,
      created_at: date
    };
    this.transactions.push(newTransaction);
    return Promise.resolve(newTransaction);
  },

  update: function (id, text, amount, type, date) {
    var index = this.transactions.findIndex(function (t) {
      return t.id == id;
    });
    if (index === -1) return Promise.resolve(null);
    this.transactions[index].text = text;
    this.transactions[index].amount = amount;
    this.transactions[index].type = type;
    this.transactions[index].created_at = date;
    return Promise.resolve(this.transactions[index]);
  },

  delete: function (id) {
    var index = this.transactions.findIndex(function (t) {
      return t.id == id;
    });
    if (index !== -1) this.transactions.splice(index, 1);
    return Promise.resolve();
  },

  init: function () {
    return Promise.resolve();
  }
};

jest.mock('../database', function () {
  return mockDb;
});

var app = require('../server');

// Clear mock data before each test
beforeEach(function () {
  mockDb.transactions = [];
  mockDb.nextId = 1;
});

// ============================================ */
// Test: GET /api/transactions
// ============================================ */

describe('GET /api/transactions', function () {

  it('should return an empty array when there are no transactions', async function () {
    var response = await request(app).get('/api/transactions');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return all transactions', async function () {
    await mockDb.add('Salary', 5000, 'income', '2026-05-21');
    await mockDb.add('Rent', 1000, 'expense', '2026-05-20');

    var response = await request(app).get('/api/transactions');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].text).toBe('Salary');
    expect(response.body[1].text).toBe('Rent');
  });
});

// ============================================ */
// Test: POST /api/transactions
// ============================================ */

describe('POST /api/transactions', function () {

  it('should create a new transaction', async function () {
    var newTransaction = {
      text: 'Freelance Work',
      amount: 2500,
      type: 'income',
      date: '2026-05-21'
    };

    var response = await request(app)
      .post('/api/transactions')
      .send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body.text).toBe('Freelance Work');
    expect(response.body.amount).toBe(2500);
    expect(response.body.type).toBe('income');
  });

  it('should return 400 if required fields are missing', async function () {
    var response = await request(app)
      .post('/api/transactions')
      .send({ text: 'Test' });

    expect(response.status).toBe(400);
  });

  it('should return 400 if amount is null', async function () {
    var response = await request(app)
      .post('/api/transactions')
      .send({ text: 'Test', amount: null, type: 'income', date: '2026-05-21' });

    expect(response.status).toBe(400);
  });

  it('should return 400 if type is missing', async function () {
    var response = await request(app)
      .post('/api/transactions')
      .send({ text: 'Test', amount: 100, date: '2026-05-21' });

    expect(response.status).toBe(400);
  });
});

// ============================================ */
// Test: PUT /api/transactions/:id
// ============================================ */

describe('PUT /api/transactions/:id', function () {

  it('should update an existing transaction', async function () {
    var created = await mockDb.add('Old Name', 500, 'expense', '2026-05-21');

    var response = await request(app)
      .put('/api/transactions/' + created.id)
      .send({ text: 'New Name', amount: 600, type: 'income', date: '2026-05-22' });

    expect(response.status).toBe(200);
    expect(response.body.text).toBe('New Name');
    expect(response.body.amount).toBe(600);
    expect(response.body.type).toBe('income');
  });

  it('should return 404 if transaction does not exist', async function () {
    var response = await request(app)
      .put('/api/transactions/999')
      .send({ text: 'Test', amount: 100, type: 'income', date: '2026-05-21' });

    expect(response.status).toBe(404);
  });
});

// ============================================ */
// Test: DELETE /api/transactions/:id
// ============================================ */

describe('DELETE /api/transactions/:id', function () {

  it('should delete an existing transaction', async function () {
    var created = await mockDb.add('To Delete', 200, 'expense', '2026-05-21');

    var response = await request(app).delete('/api/transactions/' + created.id);
    expect(response.status).toBe(200);

    // Verify it was deleted
    var allTransactions = await mockDb.getAll();
    expect(allTransactions.length).toBe(0);
  });

  it('should return 200 even if transaction does not exist', async function () {
    var response = await request(app).delete('/api/transactions/999');
    expect(response.status).toBe(200);
  });
});
