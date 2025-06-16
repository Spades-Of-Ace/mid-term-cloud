const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const BudgetModel = require('./budget_schema.js');

/*
localhost:5004/addbudget
{
  "eventId": "E001",
  "amount": 300,
  "description": "Food and Drinks"
}
*/
app.post('/addbudget', (req, res) => {
  console.log("INSIDE ADD BUDGET API");
  const newBudget = new BudgetModel({
    eventId: req.body.eventId,
    amount: req.body.amount,
    description: req.body.description
  });

  newBudget.save()
    .then(() => res.status(200).send('Budget added successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5004/viewbudget
*/
app.get('/viewbudget', (req, res) => {
  console.log("INSIDE VIEW BUDGET API");
  BudgetModel.find()
    .then(budgets => res.status(200).send(budgets))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5004/updatebudget/BUDGETID
{
  "amount": 500,
  "description": "Updated cost"
}
*/
app.put('/updatebudget/:id', (req, res) => {
  console.log("INSIDE UPDATE BUDGET API");
  BudgetModel.findByIdAndUpdate(req.params.id, {
    $set: {
      amount: req.body.amount,
      description: req.body.description
    }
  }, { new: true })
    .then(() => res.status(200).send('Budget updated successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

app.listen(5004, () => {
  console.log('Budget Service running on port 5004');
});
