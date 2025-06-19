const Budget = require('../models/Budget');

// Add new budget
exports.addBudget = async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update budget by ID
exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
