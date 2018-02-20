const budgetRoutes = require('./budget_routes');

module.exports = function(app, db) {
    budgetRoutes(app, db);
};