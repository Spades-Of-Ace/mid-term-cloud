const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected (Budget Service)');
  } catch (err) {
    console.error('❌ MongoDB connection failed (Budget):', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
