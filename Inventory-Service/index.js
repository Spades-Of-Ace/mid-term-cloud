const express = require('express');
const app = express();
const mongoose = require('./config/dbconnect');
const inventoryRoutes = require('./routes/InventoryRoutes');

app.use(express.json());
app.use('/inventory', inventoryRoutes);

const PORT = 5005;
app.listen(PORT, () => {
    console.log(`Inventory Service running on port ${PORT}`);
});
