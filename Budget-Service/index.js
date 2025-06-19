const express = require('express');
const connectDB = require('./db');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/budgets', budgetRoutes);

const PORT = 5004;
app.listen(PORT, () => {
  console.log(`✅ Budget Service running on port ${PORT}`);
});
