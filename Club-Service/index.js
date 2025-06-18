const express = require('express');
const connectDB = require('./dbconnect');
const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Club Service is live');
});

app.listen(5002, () => {
  console.log('Server running on port 5002');
});
