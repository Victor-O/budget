const array = require('lodash/array');
let fs = require('fs');
const util = require('util');
const fs_writeFile = util.promisify(fs.writeFile);

exports.getBudgets = (req, res) => {
    fs.readFile('app/budgets/budgets.json', function (err, content) {
        if (err) throw err;
        let parseJson = JSON.parse(content);

        if (parseJson) {
            res.format({
                json: () => {
                    res.status(200).json(parseJson.budgets);
                }
            })
        } else {
            res.format({
                json: () => {
                    res.status(404).json({"error": "Budgets not found"});
                }
            })
        }
    })
};

exports.getBudget = (req, res) => {
    fs.readFile('app/budgets/budgets.json', function (err, content) {
        if (err) throw err;
        let parseJson = JSON.parse(content);

        let theRequestedBudget = parseJson.budgets.find(budget => budget.id === req.body.id);

        if (theRequestedBudget) {
            res.format({
                json: () => {
                    res.status(200).json(theRequestedBudget);
                }
            })
        } else {
            res.format({
                json: () => {
                    res.status(404).json({"error": "Budget not found"});
                }
            })
        }
    })
}

exports.postBudget = (req, res) => {

    fs.readFile('app/budgets/budgets.json', function (err, content) {
        if (err) throw err;
        let parseJson = JSON.parse(content);

        if (parseJson.budgets.filter(budget => budget.city === req.body.city) <= 0) {
            let maxId = 0;
            parseJson.budgets.forEach(budget => {
                maxId =  maxId >= budget.id ? maxId : budget.id;
            });
            req.body.id = maxId + 1;

            parseJson.budgets.push(req.body);

            fs_writeFile('app/budgets/budgets.json', JSON.stringify(parseJson), function (err) {
                if (err) throw err;
            }).then(() => {
                res.format({
                    json: () => {
                        res.status(201).json(parseJson.budgets);
                    }
                })
            })
        } else {
            res.format({
                json: () => {
                    res.status(409).json({"error": "Budget already exists"});
                }
            })
        }
    })
};

exports.editBudget = (req, res) => {

    fs.readFile('app/budgets/budgets.json', function (err, content) {
        if (err) throw err;
        let parseJson = JSON.parse(content);

        let theEditedBudget = parseJson.budgets.find(budget => budget.id === req.body.id);

        if (theEditedBudget) {
            array.remove(parseJson.budgets, (budget) => {
                return budget.id === req.body.id;
            });
            parseJson.budgets.push(req.body);

            fs_writeFile('app/budgets/budgets.json', JSON.stringify(parseJson), function (err) {
                if (err) throw err;
            }).then(() => {
                res.format({
                    json: () => {
                        res.status(200).json(req.body);
                    }
                })
            })
        } else {
            res.format({
                json: () => {
                    res.status(404).json({"error": "Budget not found"});
                }
            })
        }
    })
};

exports.deleteBudget = (req, res) => {

    fs.readFile('app/budgets/budgets.json', function (err, content) {
        if (err) throw err;
        let parseJson = JSON.parse(content);

        let theEditedBudget = parseJson.budgets.find(budget => budget.id === +req.params.id);

        if (theEditedBudget) {
            array.remove(parseJson.budgets, (budget) => {
                return budget.id === +req.params.id;
            });

            fs_writeFile('app/budgets/budgets.json', JSON.stringify(parseJson), function (err) {
                if (err) throw err;
            }).then(() => {
                res.format({
                    json: () => {
                        res.status(200).json(parseJson.budgets);
                    }
                })
            })
        } else {
            res.format({
                json: () => {
                    res.status(404).json({"error": "Budget not found"});
                }
            })
        }
    })
};
