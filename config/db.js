const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // MongoDB কানেকশন সেটআপ
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mediconnect');

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // সার্ভার বন্ধ করে দেবে যদি MongoDB কানেক্ট না হয়
  }
};

module.exports = connectDB;
