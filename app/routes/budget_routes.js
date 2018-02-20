let budgets = require('./../budgets/budgets');

module.exports = function (app, db) {

    app.get('/', (req, res) => {
        res.send('Hello')
    });

    // Budget routes
    app.get('/budgets', budgets.getBudgets);
    app.post('/budget', budgets.getBudget);
    app.post('/budgets', budgets.postBudget);
    app.put('/budgets/:id', budgets.editBudget);
    app.delete('/budgets/:id', budgets.deleteBudget);
};
