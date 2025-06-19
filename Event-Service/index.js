const express = require('express');
const connectDB = require('./db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/events', eventRoutes);

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`✅ Event Service running on port ${PORT}`);
});
